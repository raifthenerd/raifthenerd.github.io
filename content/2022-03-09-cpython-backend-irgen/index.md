+++
title = "CPython Internals: IR Generation"
description = "How CPython translate the AST to the control flow graph?"
+++

As mentioned in the [previous post](../cpython-frontend/), there are multiple entrypoints to execute CPython. While
these methods might have different strategy for converting the source code to the AST, they share the same entrypoint
`_PyAST_Compile` defined in `Python/compile.c` to generate the control flow graph (CFG) and the bytecodes.

<!-- more -->
*All codes in this post are based on [CPython v3.10](https://github.com/python/cpython/tree/v3.10.0).*

## Brief Overview of `_PyAST_Compile`

`_PyAST_Compile` makes several passes to build the code object:

1. Checks for future statements (something like `from __future__ import ...`).
2. Optimize the AST, usually folding literals and/or constants.
3. Builds a symbol table.
4. Generate the CFG blocks.
5. Assemble the blocks and generate the bytecodes.

```c
PyCodeObject*
_PyAST_Compile(mod_ty mod, PyObject *filename,
               PyCompilerFlags *flags, int optimize, PyArena *arena) {
    struct compiler c;
    PyCompilerFlags local_flags = _PyCompilerFlags_INIT;
    _PyASTOptimizeState state;
    /* tedious initialization... */

    // check the future statements
    c.c_future = _PyFuture_FromAST(mod, filename);
    if (c.c_future == NULL)
        goto finally;

    // optimize ast
    if (!_PyAST_Optimize(mod, arena, &state)) goto finally;

    // build symbol table
    c.c_st = _PySymtable_Build(mod, filename, c.c_future);
    if (c.c_st == NULL) {
        if (!PyErr_Occurred())
            PyErr_SetString(PyExc_SystemError, "no symtable");
        goto finally;
    }

    PyCodeObject *co = compiler_mod(&c, mod);

 finally:
    compiler_free(&c);
    assert(co || PyErr_Occurred());
    return co;
}

static PyCodeObject* compiler_mod(struct compiler *c, mod_ty mod) {
    /* ... */

    if (!compiler_enter_scope(c, module, COMPILER_SCOPE_MODULE, mod, 1))
        return NULL;

    // generate cfg blocks
    switch (mod->kind) { /* ... */ }

    // assemble the blocks and generate bytecodes
    co = assemble(c, addNone);

    compiler_exit_scope(c);
    return co;
}
```

## Parsing the Future Statements

`_PyFuture_FromAST` is a thin wrapper of `future_parse` defined in `Python/future.c`. `future_parse` finds the
statements in the AST, starting as `from futures import ...`, and updates `PyFutureFeatures` struct by using
`future_check_features`. Note that not all future statements is effective, since the feature might be successfully
merged as the Python language feature. As of CPython version 3.10, the only effective future statement is
`annotations` (see [PEP-563] to find the effect of `from __future__ import annotations`).

[PEP-563]: https://www.python.org/dev/peps/pep-0563/

```c
typedef struct {
    int ff_features;      // flags set by future statements
    int ff_lineno;        // line number of last future statement
} PyFutureFeatures;

#define FUTURE_DIVISION "division"
#define FUTURE_ANNOTATIONS "annotations"
/* ... */

static int
future_check_features(PyFutureFeatures *ff, stmt_ty s, PyObject *filename) {
    assert(s->kind == ImportFrom_kind);
    asdl_alias_seq *names = s->v.ImportFrom.names;
    for (i = 0; i < asdl_seq_LEN(names); i++) {
        alias_ty name = (alias_ty)asdl_seq_GET(names, i);
        const char *feature = PyUnicode_AsUTF8(name->name);
        if (strcmp(feature, FUTURE_DIVISION) == 0) {
            continue;  // do nothing,
                       // since the feature became the part of the language
        } else if (strcmp(feature, FUTURE_ANNOTATIONS) == 0) {
            ff->ff_features |= CO_FUTURE_ANNOTATIONS;
        } /* ...and lot more else-if clauses */ {
        } else {
            PyErr_Format(PyExc_SyntaxError, UNDEFINED_FUTURE_FEATURE, feature);
            PyErr_SyntaxLocationObject(filename, s->lineno, s->col_offset + 1);
            return 0;
        }
    }
    return 1;
}
```

## Optimizing the AST

Usually, the code optimization can be done in both high and low levels. CPython's high-level optimization routines are
defined in `Python/ast_opt.c`, most of which are related to (safely) folding multiple literal/constant nodes into a
single node. Some notable optimizations are:

- Change the literal list into the constant tuple in the iteration.
- Change the set of constants into the frozenset in the iteration.

Both optimization steps are implemented in `fold_iter`.

## Building the Symbol Table

A *symbol table* is a data structure containing information flag about identifiers (*e.g.*, type, location, ...). The
primary goal of symbol tables is to map the identifier to the memory positions. For instance, consider the following
pseudocode:

```rust
let i = 42;        // <- global variable i
let mut acc = 0;
for i in 0..100 {  // <- local variable i; should assign different memory
    acc += i;
}
println!("{i}")    // <- 42
```

As written in the comment, although the variable `i`s have the same character, all of them do not point to same memory.
By analyzing informations stored in the symbol tables, the program can allocate the correct memory address to the
identifiers.

The most common implementation is the hierarchical (or nested) symbol tables with two phases:

1. Collect the raw information via following steps.
   - The symbol table manager creates a global symbol table and walks through the AST to fill the symbol table
     by calling the proper `symtable_visit_xx` function.
   - If the manager enters a new scope (*e.g.*, function, module, class, annotation), the manager creates a new empty
     symbol table and assign it as the child of the current symbol table.
   - The context is updated whenever the scope has been changed.

2. Analyze the collected information and get the actual memory bindings via the CPython name resolution algorithm.

In CPython, the symbol tables and the manager are defined in `Include/internal/pycore_symtable.h`.

```c
typedef struct _symtable_entry {
    PyObject_HEAD
    PyObject *ste_id;          // int: key in ste_table->st_blocks
    PyObject *ste_symbols;     // dict: variable names to flags
    PyObject *ste_name;        // name of current block
    PyObject *ste_varnames;    // list of function parameters
    PyObject *ste_children;    // list of child blocks
    PyObject *ste_directives;  // locations of global and nonlocal stmt
    _Py_block_ty ste_type;     // module, class, or function

    struct symtable *ste_table;
    /* ...and lots of metadata fields */
} PySTEntryObject;

struct symtable {
    struct _symtable_entry *st_cur;  // current symbol table entry
    struct _symtable_entry *st_top;  // symbol table entry for module
    PyObject *st_global;             // borrowed ref to st_top->ste_symbols
    PyObject *st_private;            // name of current class or NULL

    PyObject *st_blocks;  // dict: map AST node address to symbol table entry
    PyObject *st_stack;   // list: stack of namespace info

    PyFutureFeatures *st_future;  // module's future that affect the table
    /* ... */
};
```

The entrypoint for building symbol tables is `_PySymtable_Build`, and the following helper functions are defined:

- `symtable_enter_block`, `symtable_exit_block`: enter/exit the scope.
- `symtable_add_def`, `symtable_lookup`: add/find a symbol in the current symbol table.
- `symtable_record_directive`: record the additional information for the nonlocal/global identifiers.

```c
struct symtable*
_PySymtable_Build(mod_ty mod, PyObject *filename, PyFutureFeatures *future) {
    /* ... */

    /* make the initial symbol table */
    struct symtable *st = symtable_new();
    if (!GET_IDENTIFIER(top) ||
        !symtable_enter_block(st, top, ModuleBlock, (void *)mod, 0, 0, 0, 0)) {
        _PySymtable_Free(st);
        return NULL;
    }

    /* fill the symbol table with definitions */
    st->st_top = st->st_cur;
    switch (mod->kind) { /* ... */ }  // visit nodes

    if (!symtable_exit_block(st)) {
        _PySymtable_Free(st);
        return NULL;
    }

    /* ... */

    if (symtable_analyze(st)) return st;  // phase 2
    _PySymtable_Free(st);
    return NULL;

 error:
    (void) symtable_exit_block(st);
    _PySymtable_Free(st);
    return NULL;
}
```

- `analyze_block`: call `analyze_name` on all symbols, recursively analyze child blocks, update the results in the
  symbol table via `update_symbols`, and update the set of free variables.
- `analyze_name`: decide the correct scope of names.
- `analyze_cells`: if a name is both defined as free and local, then this block provides the bindings for the free
  variable. So, `analyze_cells` mark these names as *cell* and remove from the set of free variables.

```c
static int symtable_analyze(struct symtable *st) {
    PyObject* free = PySet_New(NULL);
    PyObject* global = PySet_New(NULL);
    /* ... */

    int r = analyze_block(st->st_top, NULL, free, global);
    Py_DECREF(free); Py_DECREF(global);
    return r;
}

static int analyze_block(PySTEntryObject *ste, PyObject *bound, PyObject *free,
                         PyObject *global) {
    PyObject *name, *v, *local = NULL, *scopes = NULL, *newbound = NULL;
    PyObject *newglobal = NULL, *newfree = NULL, *allfree = NULL;
    /* initialize... */

    // populate the global and bound sets to be passed to children
    if (ste->ste_type == ClassBlock) {
        PyNumber_InPlaceOr(newglobal, global);
        if (bound) PyNumber_InPlaceOr(newbound, bound);
    }

    // analyze all names
    while (PyDict_Next(ste->ste_symbols, &pos, &name, &v)) {
        long flags = PyLong_AS_LONG(v);
        if (!analyze_name(ste, scopes, name, flags,
                          bound, local, free, global))
            goto error;
    }

    // populate global and bound sets to be passed to children
    if (ste->ste_type != ClassBlock) {
        if (ste->ste_type == FunctionBlock) PyNumber_InPlaceOr(newbound,local);
        if (bound) PyNumber_InPlaceOr(newbound, bound)
        PyNumber_InPlaceOr(newglobal, global);
    } else {
        if (!GET_IDENTIFIER(__class__)) goto error;  // special-case __class__
        if (PySet_Add(newbound, __class__) < 0) goto error;
    }

    // recursively analyze child blocks
    for (i = 0; i < PyList_GET_SIZE(ste->ste_children); ++i) {
        PyObject *c = PyList_GET_ITEM(ste->ste_children, i);
        PySTEntryObject* entry = (PySTEntryObject*)c;
        if (!analyze_child_block(entry, newbound, newfree, newglobal, allfree))
            goto error;
        if (entry->ste_free || entry->ste_child_free) ste->ste_child_free = 1;
    }

    // update the free variable set
    PyNumber_InPlaceOr(newfree, allfree);

    // Check if any local variables must be converted to cell variables
    if (ste->ste_type == FunctionBlock && !analyze_cells(scopes, newfree))
        goto error;
    else if (ste->ste_type == ClassBlock && !drop_class_free(ste, newfree))
        goto error;

    // records the results of the analysis in the symbol table entry
    if (!update_symbols(ste->ste_symbols, scopes, bound, newfree,
                        ste->ste_type == ClassBlock))
        goto error;

    // update the free variable set
    PyNumber_InPlaceOr(free, newfree);

    /* ... */
}
```

## IR Generation

After building the symbol tables, we can now generate blocks of CFG from the AST and the memory locations.
CFG generation is similar to AST parsing; the compiler walks through the AST nodes and applies the conversion rules
(named `compiler_visit_xxx`) for each AST node. The definition of the CFG block is located in `Python/compiler.c`:

```c
typedef struct basicblock_ {
    struct basicblock_ *b_list;  // next basicblock located in the linked list

    struct instr *b_instr;  // instruction array
    int b_ialloc;           // length of instruction array
    int b_iused;            // # of instructions used

    int b_startdepth;    // depth of stack upon entry of block
    int b_offset;        // instruction offset
    int b_predecessors;  // # predecssors that a block has

    struct basicblock_ *b_next;  // next block reached by normal control flow

    /* ... */
} basicblock;
```

One can find the list of available opcodes in `Include/opcode.h`, and the gentle details are available at
the [`dis` module manual](https://docs.python.org/3/library/dis.html).

The basic blocks are merged and optimized by calling `assemble` function, which will be covered in the next post.

## Reference

- Alfred V. Aho and others, *Compilers: Principles, Techniques, and Tools* (2/E).
- Python Software Foundation, [Design of CPython's Compiler]
- Python Software Foundation, [Execution Model].

[Design of CPython's Compiler]: https://devguide.python.org/compiler
[Execution Model]: https://docs.python.org/3/reference/executionmodel.html
