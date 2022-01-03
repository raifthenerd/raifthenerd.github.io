+++
title = "CPython Internals: Optimization in Garbage Collection"
description = "Several optimization techniques on CPython's GC module."
+++

Without proper optimizations, the basic CPython garbage collector [covered in previous post](../cpython-mem-gc) may
result in quadratic time complexity. Two techniques are currently applied: using generations and untracking some
objects during GC.

<!-- more -->
*All codes in this post are based on [CPython v3.10](https://github.com/python/cpython/tree/v3.10.0).*

## Generations

Most objects have a very short lifespan in reality, implicitly implies that older objects are less likely to become
unreachable. To take advantage of this fact, CPython manages all objects into three *generations*.

Initially, all objects are placed into the generation 0, and each time they survive after GC is applied to the object,
they move on to the next generation. GC is executed separately for each generation, and whenever executed, GC only
scans the objects belonging the younger generations.

```c
typedef struct _gc_runtime_state {
    /* ... */
    // all generations with supplementary info; see below
    struct gc_generation generations[NUM_GENERATIONS];
    // shortcut for the youngest generation
    PyGC_Head *generation0;

    // # of objects survived the last full collection
    Py_ssize_t long_lived_total;
    // # of objects survived all "non-full" collections
    Py_ssize_t long_lived_pending;
} GCState;

static Py_ssize_t gc_collect_main(PyThreadState *tstate,
                                  int generation,
                                  Py_ssize_t *n_collected,
                                  Py_ssize_t *n_uncollectable,
                                  int nofail) {
    // get runtime GC info
    GCState *gcstate = &tstate->interp->gc;

    /* ... */

    // update runtime info; see below.
    if (generation+1 < NUM_GENERATIONS)
        gcstate->generations[generation+1].count += 1;
    for (i = 0; i <= generation; i++)
        gcstate->generations[i].count = 0;

    // merge every younger generations and find older generation
    PyGC_Head *young, *old;
    for (i = 0; i < generation; i++)
        gc_list_merge(GEN_HEAD(gcstate, i), GEN_HEAD(gcstate, generation));
    young = GEN_HEAD(gcstate, generation);
    if (generation < NUM_GENERATIONS-1)
        old = GEN_HEAD(gcstate, generation+1);
    else  // already oldest
        old = young;

    PyGC_Head unreachable;
    deduce_unreachable(young, &unreachable);  // cycle detection on young gen

    untrack_tuples(young);          // untrack tuples; see below
    if (young != old)               // non-full collection
        gc_list_merge(young, old);  // move reachable objects to next gen
    else                            // full collection
        untrack_dicts(young);       // untrack dicts; see below

    // update runtime info; see below.
    if (young != old) {  // non-full collection
        if (generation == NUM_GENERATIONS - 2)
            gcstate->long_lived_pending += gc_list_size(young);
    } else {             // full collection
        gcstate->long_lived_pending = 0;
        gcstate->long_lived_total = gc_list_size(young);
    }

    /* ... */
}
```

The execution schedule is determined by runtime information stored in each generation. Whenver the criteria is met for
each generation, GC is executed. Current criteria are:

- Generation 0:
  allocation count exceeds 700.
- Generation 1:
  GC execution count on generation 0 exceeds 10.
- Generation 2 (*a.k.a.* full collection):
  GC execution count on generation 1 exceeds 10, and `long_lived_pending / long_lived_total > 25%`.

```c
struct gc_generation {
    PyGC_Head head;
    int threshold;
    int count;      // generation 0: # of allocations
                    // generation n: # of collections of younger generation
};

void _PyGC_InitState(GCState *gcstate) {
    struct gc_generation generations[NUM_GENERATIONS] = {
        //                                        PyGC_Head,  threshold,  count
        // youngest
        {{(uintptr_t)_GEN_HEAD(0), (uintptr_t)_GEN_HEAD(0)},  700,        0},
        {{(uintptr_t)_GEN_HEAD(1), (uintptr_t)_GEN_HEAD(1)},  10,         0},
        {{(uintptr_t)_GEN_HEAD(2), (uintptr_t)_GEN_HEAD(2)},  10,         0},
        // oldest
    };

    /* ... */
}

// can be executed while allocation
static Py_ssize_t gc_collect_generations(PyThreadState *tstate) {
    GCState *gcstate = &tstate->interp->gc;
    Py_ssize_t n = 0;
    for (int i = NUM_GENERATIONS-1; i >= 0; i--) {
        // most oldest generation w/ count > threshold
        if (gcstate->generations[i].count > gcstate->generations[i].threshold) {

            // prevents full collection executed frequently; see below
            if (i == NUM_GENERATIONS - 1
                && gcstate->long_lived_pending < gcstate->long_lived_total / 4)
                continue;

            // thin wrapper of `gc_collect_main`
            n = gc_collect_with_callback(tstate, i);
            break;
        }
    }
    return n;
}
```

In CPython, objects of these generations can be examined by using `gc.get_objects(generation=NUM)` and GC can be
manually triggered by calling `gc.collect(generation=NUM)`.

### Collecting the Oldest Generation

It has been remarked that periodically doing a full collection may entail a performance degradation (*e.g.*, quadratic
time complexity). The reason is that cost of a full collection is proportional to the total number of
long-lived objects, which is virtually *unbounded*.

CPython solves this issue by reducing the number of full GC calls, by using another criteria that yields amortized
linear performance in the total number of objects in practice.

More details can be found on the [proposal][Proposal: Run GC less often] from `python-dev` mailing list.

## Delay Tracking Containers

Certain types of containers *cannot* participate in a reference cycle (*e.g.*, primitive objects like integer), so
untracking these objects reduces the cost of GC. Although, determining which objects may be untracked is not free.

As a general rule, instances of atomic types aren't tracked and instances of non-atomic types (*e.g.*, containers,
user-defined objects...) are. Also, some type-specific optimizations are implemented:

### Tuples

- All tuples except the empty tuple are tracked when created.
- A tuple then can be untracked while collection if all of its contents are already not tracked. Note that it may take
  several cycles to untrack a tuple.

    ```c
    void _PyTuple_MaybeUntrack(PyObject *op) {
        PyTupleObject *t = (PyTupleObject *) op;
        Py_ssize_t i;
        for (i = 0; i < Py_SIZE(t); i++) {
            PyObject *elt = PyTuple_GET_ITEM(t, i);

            /* Tuple with NULL elements aren't fully constructed,
            don't untrack them yet. */
            if (!elt || _PyObject_GC_MAY_BE_TRACKED(elt)) return;
        }
        _PyObject_GC_UNTRACK(op);
    }
    ```

### Dictionaries

- Empty dictionaries are untracked.
- If a tracked item is inserted either as a key or value, the dictionary becomes tracked.
- During a full collection, the collector will untrack any dictionaries whose contents are not tracked. Note that the
  dictionaries can be untracked during the full collection only, to avoid quadratic build-up time.

    ```c
    #define _PyDict_HasSplitTable(d) ((d)->ma_values != NULL)
    void _PyDict_MaybeUntrack(PyObject *op) {
        PyDictObject *mp = (PyDictObject *) op;
        PyDictKeyEntry *ep0;
        PyObject *value;
        Py_ssize_t i, numentries;

        ep0 = DK_ENTRIES(mp->ma_keys);
        numentries = mp->ma_keys->dk_nentries;
        if (_PyDict_HasSplitTable(mp)) {  // key in ma_keys and value in ma_values
            for (i = 0; i < numentries; i++) {
                if ((value = mp->ma_values[i]) == NULL)
                    continue;
                if (_PyObject_GC_MAY_BE_TRACKED(value)) {
                    assert(!_PyObject_GC_MAY_BE_TRACKED(ep0[i].me_key));
                    return;
                }
            }
        } else {  // key and value are in ma_keys
            for (i = 0; i < numentries; i++) {
                if ((value = ep0[i].me_value) == NULL)
                    continue;
                if (_PyObject_GC_MAY_BE_TRACKED(value) ||
                    _PyObject_GC_MAY_BE_TRACKED(ep0[i].me_key))
                    return;
            }
        }
        _PyObject_GC_UNTRACK(op);
    }
    ```

## References

- Pablo Galindo Salgado, [Design of CPython's Garbage Collector]
- Martin von L&ouml;wis, [Proposal: Run GC less often]
- Issue [#4074](https://bugs.python.org/issue4074) and [#14775](https://bugs.python.org/issue14775)

[Design of CPython's Garbage Collector]:
https://devguide.python.org/garbage_collector/
[Proposal: Run GC less often]:
http://mail.python.org/pipermail/python-dev/2008-June/080579.html
