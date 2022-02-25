+++
title = "Stein Variational Gradient Descent"
description = "SVGD approximates the target distribution via iteratively transporting particles from simple distribution."
+++

The main challenge of the modern Bayesian inferences is about how to handle the intractable posterior. In many
models, especially in deep neural networks, the posterior distribution consists of billions of parameters in a highly
nonlinear and complex relationships. Traditional algorithms such as [Markov chain Monte Carlo (MCMC)][MCMC] and
[variational inference (VI)][VI] are usually not suitable; the former lacks scalability and the latter lacks expressive power.

Stein variational gradient descent (SVGD), suggested by [Liu & Wang][svgd], is a new algorithm for Bayesian models
different from the MCMC and VI.

[MCMC]: https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo
[VI]: https://en.wikipedia.org/wiki/Variational_Bayesian_methods

<!-- more -->
See the [visualization of SVGD][demo], &copy; Chi Feng.

[demo]: https://chi-feng.github.io/mcmc-demo/app.html?algorithm=SVGD&delay=0

## Preliminaries: MCMC and VI

Assume that the target distribution \\(p\\) supported on \\(\mathbb{R}^d\\) is smooth. Roughly speaking, traditional
Bayesian algorithms can be summarized as followed:

- MCMC samples \\(x_i\\) from a certain Markov chain of \\(p\\), and apply Monte Carlo approaches in inferences.
- VI finds \\(q\\) from a well-known family of distribution \\(\mathcal{Q}\\) such that \\(q\simeq p\\), and use
  \\(q\\) in inference instead of \\(p\\).

## Stein's Identity and Kernelized Stein Discrepancy

Consider another smooth distribution \\(q\\) supported on \\(\mathbb{R}^d\\). Before approximating \\(q\\) to \\(p\\),
we must define some *discrepancy* metric between distributions to measure the quality of approximation. As the name
suggest, SVGD use [Stein discrepancy] as the metric.

[Stein discrepancy]: https://en.wikipedia.org/wiki/Stein_discrepancy

Before we move further, note that the following identity holds.

**Proposition.** Let \\(\phi:\mathbb{R}^d\to\mathbb{R}^d\\) is smooth. Define the *Stein operator*
\\(\mathcal{A}_q \phi(x):=\phi(x)\nabla_x\log q(x)^\top + \nabla_x\phi(x)\\). Under some mild conditions, we have
\\(\mathbb{E}\_{x\sim q}\left\[\mathcal{A}_q\phi(x)\right\]=0\\).

This implies that \\(\mathbb{E}\_{x\sim q}\left\[\mathcal{A}_p\phi(x)\right\]=0\\) relates to the discrepancy between
\\(p\\) and \\(q\\), which leads to the following definition.

**Definition.** (Stein discrepancy) For some proper function class \\(\mathcal{F}\\), the *Stein discrepancy* is \\[
    \mathbb{S}(q, p)=\sup\_{\phi\in\mathcal{F}}\left\[\mathbb{E}\_{x\sim q}\text{tr}\mathcal{A}_p\phi(x)\right\]^2.
\\]

The supremum can be evaluated in closed form using a particular choice of \\(\mathcal{F}\\). For a reproducing kernel
\\(\kappa: \mathbb{R}^d\times\mathbb{R}^d\to\mathbb{R}\\) and the corresponding RKHS \\(H\_\kappa\\), define
\\(\mathcal{F}_P=\\{f\in H\_\kappa: \\|f\\|\_{H\_\kappa}\leq 1\\}\\). Then, the optimal solution has been shown to be \\[
    \mathbb{S}(q, p)=\\|\phi^\ast\\|\_{H\_\kappa}^2,
    \quad\text{where }
    \phi^\ast(\cdot)\propto\mathbb{E}\_{x\sim q}\mathcal{A}\_p\kappa(x, \cdot).
\\]

## Stein Variational Gradient Descent

SVGD approximates \\(p\\) using *samples* from arbitrary reference distribution \\(q_0\\), followed by
*series of certain transforms*. In other words, the goal is find \\(T_1,\dots,T_n:\mathbb{R}^d\to\mathbb{R}^d\\) such
that \\(T_n\circ\dots\circ T_1\circ q_0 \simeq p\\).

To make the objective solvable, consider the following types of transforms only; \\[
    T(x)=x+\epsilon\phi(x),
\\] where \\(\epsilon>0\\) is a perturbation magnitude and \\(\phi\\) is a perturbation direction. Furthermore, assume
that \\(T\\) is smooth and invertable, thus one-to-one. Then, the following theorem holds:

**Theorem.** Denote \\(q_{\[T\]}\\) as the pushforward distribution of \\(q\\) through \\(T\\).
Then, \\[
    \nabla_{\epsilon=0}\text{KL}(q_{\[T\]}\|p)=-\mathbb{E}_{x\sim q}\left\[\text{tr}\mathcal{A}_p\phi(x)\right\].
\\]

The theorem suggests that the perturbation direction \\(\phi\\) determines the amount of decrease of KL divergence.
Since the goal is approximate \\(p\\) via \\(q\\) and \\(T\\), one can apply the steepest descent method here by
choosing \\(\phi^\ast(\cdot)=\mathbb{E}\_{x\sim q}\mathcal{A}\_p\kappa(x, \cdot)\\) as mentioned above.

In conclusion, the SVGD algorithm is stated as followed:

\\[\begin{aligned}
    &\textbf{Input:}\text{ A target distribution with density function }p(x)
        \text{ and a set of initial particles }\\{x_i^0\\}\_{i=1}^n\\\\
    &\textbf{for }\text{iteration }\ell\textbf{ do}\\\\
    &\hspace{5mm} x_i^{\ell+1}\gets x_i^\ell + \epsilon_\ell\hat\phi^\ast(x_i^\ell) \\\\
    &\hspace{10mm}\text{where }\hat\phi^\ast(x) = \frac1n\sum\_{j=1}^n\left\[\kappa(x, x\_j^\ell)\nabla\_{x\_j^\ell}\log p(x\_j^\ell)+\nabla\_{x\_j^\ell}\kappa(x, x\_j^\ell)\right\]\\\\
    &\textbf{end for}\\\\
    &\textbf{Output:}\text{ A set of particles }\\{x_i\\}\_{i=1}^n
        \text{ that approximates the target distribution}
\end{aligned}\\]

Intuitively, the update pushes the particles towards the modes of the target distribution via \\(\nabla\log p\\),
while \\(\nabla\kappa(x, x')\\) prevents mode collapsing.

Furthermore, the algorithm can be executed more efficiently by using some techniques such as:

- Approximate \\(\nabla_x\log p(x) \\) from mini-batch.
- Kernel approximation, *e.g.*, using [random Fourier feature][rff].

[rff]: https://people.eecs.berkeley.edu/~brecht/papers/07.rah.rec.nips.pdf

## Reference

- Liu & Wang (NeurIPS 2016).
  [Stein Variational Gradient Descent: A General Purpose Bayesian Inference Algorithm][svgd].
- Liu (NeurIPS 2017).
  [Stein Variational Gradient Descent as Gradient Flow][theory]

[svgd]: https://proceedings.neurips.cc/paper/2016/file/b3ba8f1bee1238a2f37603d90b58898d-Paper.pdf
[theory]: https://proceedings.neurips.cc/paper/2017/file/17ed8abedc255908be746d245e50263a-Paper.pdf
