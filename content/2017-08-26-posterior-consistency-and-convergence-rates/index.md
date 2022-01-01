+++
title = "Posterior Consistency and Posterior Convergence Rates (in Korean)"
description = "비모수 베이지안 관점에서의 사후분포 일치성과 수렴 속도."
+++

베이즈 추론은 사후분포에 의존하므로 사후분포가 얼마나 좋은 성질을 가지느냐에 따라 추정이나 예측, 추론이 얼마나 좋은지가
결정이 된다. 자연스럽게 사후분포가 가져야 할 좋은 성질들이 무엇이고, 그러한 성질들을 갖는 사후분포는 어떠한 조건에서
얻어지는지에 대한 의문을 생각할 수 있다.

<!-- more -->
사전분포가 정의된 모수공간 \\((\Theta,\mathcal{B},\Pi)\\)가 존재하고 모든 \\(\theta\in\Theta\\)에 대해
\\(P\_{\theta}\\)는 \\((X,\mathcal{A})\\) 위에 정의된 확률측도로 모든 \\(A\in\mathcal{A}\\)에 대해
\\(\theta\mapsto P\_{\theta}(A)\\)가 가측함수가 된다고 가정하자. \\(n=1,2,\dots,\infty\\)에 대해
\\(Y\_{1},Y\_{2},\dots,Y\_{n}\sim\_{i.i.d.}P\_{\theta}\\)라 하면 \\((Y\_{1},Y\_{2},\dots,Y\_{n})\\)이 속하는 적당한
곱공간 \\((X^{n},\mathcal{A}^{n}, P\_{\theta}^{n})\\)을 생각할 수 있다. 이로부터
\\((X^{n}\times\Theta,\mathcal{A}^{n}\times\mathcal{B})\\) 위에서 결합확률
\\(\lambda\_{n,\Pi}(A\times B)=\int\_{B}P\_{\theta}^{n}(A)\\,\Pi(d\theta)\\) 및 \\((X^{n},\mathcal{A}^{n})\\) 위에서
주변확률 \\(\lambda\_{n}(A)=\lambda\_{n,\Pi}(A\times\Theta)\\)가 잘 정의된다. 이 때, 사후분포를 다음과 같이 정의한다.

**정의 (사후분포; Posterior).**
다음 조건들을 만족하는 \\(\Pi\_{n}(\cdot\mid\cdot):\mathcal{B}\times X^{n}\to[0,1]\\)를 *사후분포*라 한다:

1. 모든 \\(\omega\in X^{n}\\)에 대해 \\(B\mapsto\Pi\_{n}(B\mid\omega)\\)는 \\((\Theta,\mathcal{B})\\) 위에서의
   확률측도가 되며
2. 모든 \\(B\in\mathcal{B}\\)에 대해 \\(\omega\mapsto\Pi\_{n}(B\mid\omega)\\)는 가측함수이고
3. 모든 \\(A\in\mathcal{A}^{n}\\)과 \\(B\in\mathcal{B}\\)에 대해
   \\[\lambda\_{n,\Pi}(A\times B)=\int\_{A}\Pi\_{n}(B\mid\omega)\\,\lambda\_{n}(d\omega).\\]

*참고.* \\(\Theta\\)가 폴란드 공간이고 \\(\mathcal{B}\\)가 보렐 \\(\sigma\\)-대수이면 사후분포는 항상 존재하며
\\(\lambda\_{n}\\)-a.s. 관점에서 유일하다.

## 사후분포의 일치성

통계적 추정에서, 자료가 많이 주어질수록 추정치가 실제 모수로 수렴하는 성질을 추정치의 일치성이라 한다. 사후분포에도
비슷한 성질을 생각할 수 있는데, 자료가 많이 주어질수록 사후분포가 실제 모수 근처에 집중되는 성질로 사후분포의 일치성을
정의한다.

**정의 (사후분포의 일치성; Posterior consistency).**
\\(\mathcal{F}\_{n}:(Y\_{1},Y\_{2},\dots)\mapsto(Y\_{1},Y\_{2},\dots,Y\_{n})\\)라 하자.
\\(\Omega\subset X^{\infty}\\)이 존재하여 \\(P\_{\theta\_{0}}^{\infty}(\Omega)=1\\)이고, \\(\omega\in\Omega\\)일 때
\\(\theta\_{0}\\)의 모든 이웃 \\(B\\)에 대해 \\(\Pi\_{n}(B\mid\mathcal{F}\_{n}(\omega))\to1\\)이면
*\\(\theta\_{0}\\)에서 사후분포가 일치성을 가진다*고 한다.

### Doob의 정리

**정리 1 (Doob).** \\(X\\), \\(\Theta\\)가 폴란드 공간이고 \\(\mathcal{A}\\), \\(\mathcal{B}\\)가 각각 \\(X\\)와
\\(\Theta\\)의 보렐 \\(\sigma\\)-대수라고 하자. 만일 \\(P\_{\theta}\\)가 식별 가능하면 모든 사전분포 \\(\Pi\\)에 대해
사후분포는 \\(\Pi\\)-a.s. 일치성을 가진다.

*증명.*
\\(X\\)가 폴란드 공간이므로 셀 수 있는 기저 \\(\mathcal{A}\_{0}\\)를 찾을 수 있으며
\\(\sigma(\mathcal{A}\_{0})=\mathcal{A}\\)이다. 이 때 \\[
  E\_{\theta}=
  \bigcap\_{A\in\mathcal{A}\_{0}}\left\\{\omega\in X^{\infty}:\frac1n\sum\_{i=1}^{n}\delta\_{Y\_{i}(\omega)}(A)\to P\_{\theta}(A)
  \right\\}
 \\]을 정의하면 \\(E\_{\theta}\\)는 가측집합의 셀 수 있는 교집합이므로 가측이다. 강대수의 법칙에 의해
 \\(P\_{\theta}^{\infty}(E\_{\theta})=1\\)이며 \\(P\_{\theta}\\)가 식별가능하므로
 \\(\theta\neq\theta': E\_{\theta}\cap E\_{\theta'}=\emptyset\\). 이를 정리하면
 \\(\theta\neq\theta': P\_{\theta}^{\infty}(E\_{\theta'})=0\\). 이제
 \\(E=\bigsqcup\_{\theta\in\Theta}E\_{\theta}\\)로 하고 \\(B\in\mathcal{B}\\)에 대해 \\(f\_{B}:X^{\infty}\to[0,1]\\)을
 \\[
   f\_{B}(\omega)
   =\begin{cases}
    \mathbf{1}\_{\bigsqcup\_{\theta\in B}E\_{\theta}}(\omega), & \omega\in E\\\\
    \Pi(B), & o.w.
  \end{cases}
\\]으로 정의하자. 우선 \\(\bigsqcup\_{\theta\in B}E\_{\theta}\\)가 가측임이 알려져 있으므로
\\(\omega\mapsto f\_{B}(\omega)\\)는 가측이다. 또 \\(\omega\in E\\)일 때
\\(E\_{\theta}\cap E\_{\theta'}=\emptyset\\)로부터 \\(f\_{B}\\)의 가산가법성이 성립하고 \\(f\_{\Theta}(\omega)=1\\)므로
\\(f\_{B}(\omega)\\)는 확률측도이고, 따라서 모든 \\(\omega\in X^{\infty}\\)에 대해 \\(B\mapsto f\_{B}(\omega)\\)는
확률측도이다. 간단한 계산으로부터 \\(\lambda\_{\infty}(E)=1\\)이고
\\(\bigsqcup\_{\theta\in B}E\_{\theta}\subset E\\)이므로 모든 \\(A\in\mathcal{A}^{\infty}\\), \\(B\in\mathcal{B}\\)에
대해 \\[
  \begin{aligned}
    \int\_{A}f\_{B}(\omega)\\,\lambda\_{\infty}(d\omega)
    &=\int\_{E\cap A}f\_{B}(\omega)\\,\lambda\_{\infty}(d\omega)\\\\
    &=\lambda\_{\infty}\left(E\cap A\cap\left(\bigsqcup\_{\theta\in B}E\_{\theta}\right)\right)\\\\
    &=\lambda\_{\infty}\left(A\cap\left(\bigsqcup\_{\theta\in B}E\_{\theta}\right)\right)\\\\
    &=\int P\_{\theta}^{\infty}\left(A\cap\left(\bigsqcup\_{\theta\in B}E\_{\theta}\right)\right)\\,\Pi(d\theta)\\\\
    &=\int\_{B} P\_{\theta}^{\infty}(A)\\,\Pi(d\theta)\\\\
    &=\lambda\_{\infty,\Pi}(A\times B).
  \end{aligned}
\\] 즉 \\(f\_{B}\\)는 사후분포가 되며, 마팅게일 수렴 정리에 의해
\\(\Pi\_{n}(B\mid\mathcal{F}\_{n}(\omega))\to f\_{B}(\omega)\\) \\(\lambda\_{\infty}\\)-a.s..

\\(\Theta\\)도 폴란드 공간이므로 셀 수 있는 기저 \\(\mathcal{B}\_{0}\\)가 존재한다. 모든
\\(B\_{i}\in\mathcal{B}\_{0}\\)에 대해 \\(C\_{i}\subset X^{\infty}\\)가 존재하여 \\(\lambda\_{\infty}(C\_{i})=1\\)이고
\\(\omega\in C\_{i}: \Pi\_{n}(B\_{i}\mid\mathcal{F}\_{n}(\omega))\to f\_{B\_{i}}(\omega)\\). 이 때
\\(\lambda\_{\infty}(C\_{i})=\int P\_{\theta}^{\infty}(C\_{i})\\,\Pi(d\theta)=1\\)이고
\\(P\_{\theta}^{\infty}\leq1\\)이므로 \\(P\_{\theta}^{\infty}(C\_{i})=1\\) \\(\Pi\\)-a.s.. 즉,
\\(D\_{i}\subset\Theta\\)가 존재하여 \\(\Pi(D\_{i})=1\\)이고 \\(\theta\in D\_{i}:P\_{\theta}^{\infty}(C\_{i})=1\\)이다.
\\(D=\bigcap\_{i}D\_{i}\\), \\(C=\bigcap\_{i}C\_{i}\\)라 하면 모든 \\(\theta\in D\\)에 대하여
\\(P\_{\theta}^{\infty}(C)=1\\)이 성립한다. 이 때, 모든 \\(\theta\in D\\)에 대해
\\(P\_{\theta}^{\infty}(C\bigcap E\_{\theta})=1\\)이며 \\(\theta\in B\_{i}\in\mathcal{B}\_{0}\\)인 모든 \\(B\_{i}\\)에
대해 \\(\omega\in C\bigcap E\_{\theta}: \lim\_{n}\Pi\_{n}(B\_{i}\mid\mathcal{F}\_{n}(\omega))
=f\_{B\_{i}}(\omega)\geq f\_{\\{\theta\\}}(\omega)=\mathbf{1}\_{E\_{\theta}}(\omega)=1\\). 따라서 \\(\theta\in D\\)에서
사후분포가 일치성을 가지며, \\(\Pi(D)=1\\)이므로 사후분포는 \\(\Pi\\)-a.s. 일치성을 가진다. \\(\Box\\)

Doob의 정리는 모수공간과 자료의 공간이 조건만 만족하면 성립하지만, 일치성이 성립하는 공간의 정확한 정보는 알려주지
않으므로 특정한 모수의 일치성에 대해서 아무런 얘기를 할 수 없다. 뿐만 아니라 부적절한 사전분포가 이용되는 모수적 베이즈
모형에는 적용이 불가능하다. 따라서 이를 보완하기 위한 첫 단계로서 Schwartz 정리를 알아보자.

### Schwartz의 정리

먼저 다음 보조정리가 필요하다.

**보조정리 2.** \\(\theta\_{0}\in B\in\mathcal{B}\\)일 때 다음은 모두 동치이다:

1. \\(\\{\phi\_{n}: X^{n}\to[0,1]\\}\\)이 존재해 \\(\mathbb{E}\_{\theta\_{0}}\phi\_{n}(Y\_{1},\dots,Y\_{n})\to0\\) 및
   \\(\inf\_{\theta\in B^{c}}\mathbb{E}\_{\theta}\phi\_{n}(Y\_{1},\dots,Y\_{n})\to1\\)이 성립한다.
2. \\(\phi\_{m}: X^{m}\to[0,1]\\)이 존재해
   \\(\mathbb{E}\_{\theta\_{0}}\phi\_{m}(Y\_{1},\dots,Y\_{m}) <
      \inf\_{\theta\in B^{c}}\mathbb{E}\_{\theta}\phi\_{m}(Y\_{1},\dots,Y\_{m})\\)이 성립한다.
3. \\(\\{\phi\_{n}: X^{n}\to[0,1]\\}\\)이 존재해 어떤 \\(C,\beta>0\\)에 대해
   \\(\mathbb{E}\_{\theta\_{0}}\phi\_{n}(Y\_{1},\dots,Y\_{n}) < Ce^{-n\beta}\\) 및
   \\(\inf\_{\theta\in B^{c}}\mathbb{E}\_{\theta}\phi\_{n}(Y\_{1},\dots,Y\_{n})>1-Ce^{-n\beta}\\)가 성립한다.

*증명.*
(1)\\(\Rightarrow\\)(2)와 (3)\\(\Rightarrow\\)(1)은 자명하므로 (2)\\(\Rightarrow\\)(3)을 보이자.
\\(\alpha=\mathbb{E}\_{\theta\_{0}}\phi\_{m}<\inf\_{\theta\in B^{c}}\mathbb{E}\_{\theta}\phi\_{m}=\gamma\\)라 하고 \\[
  \begin{aligned}
    A\_{k}
    &=\left\\{
      (y\_{1},\dots,y\_{mk}):
      \frac1k\sum\_{i=1}^{k}\phi\_{m}(y\_{m(i-1)+1},y\_{m(i-1)+2},\dots,y\_{mi})>\frac{\alpha+\gamma}2\right
    \\},\\\\
    C\_{n}
    &=\left\\{(y\_{1},\dots,y\_{n}):(y\_{1},\dots,y\_{mk})\in A\_{k},mk\leq n < m(k+1)\right\\}
  \end{aligned}
\\]를 정의하자 (단, \\(n < m\\)일 때 \\(C\_{n}=X^{n}\\)). \\(\phi\_{n}=\mathbf{1}\_{C\_{n}}\\)라 하면 \\(n\geq m\\)일
때 Hoeffding 부등식으로부터 \\[
  \begin{aligned}
    \mathbb{E}\_{\theta\_{0}}\phi\_{n}
    &=P\_{\theta\_{0}}^{n}(C\_{n})
      =P\_{\theta\_{0}}^{mk}(A\_{k})\\\\
      &=P\_{\theta\_{0}}^{mk}\left(\frac1k\sum\_{i=1}^{k}\phi\_{m}(Y\_{m(i-1)+1},Y\_{m(i-1)+2},\dots,Y\_{mi})-\mathbb{E}\_{\theta\_{0}}\phi\_{m}>\frac{\gamma-\alpha}2\right)\\\\
    &\leq\exp\left(-\frac{(\gamma-\alpha)^{2}}{2}k\right)
      <\exp\left(-\frac{(\gamma-\alpha)^{2}}{2m}n+\frac{(\gamma-\alpha)^{2}}{2}\right),\\\\
    \mathbb{E}\_{\theta}\phi\_{n}
    &=P\_{\theta}^{n}(C\_{n})
      =P\_{\theta}^{mk}(A\_{k})
      =1-P\_{\theta}^{mk}(A\_{k}^{c})\\\\
    &=1-P\_{\theta}^{mk}\left(-\frac1k\sum\_{i=1}^{k}\phi\_{m}(Y\_{m(i-1)+1},Y\_{m(i-1)+2},\dots,Y\_{mi})+\mathbb{E}\_{\theta}\phi\_{m}\geq\frac{\gamma-\alpha}2\right)\\\\
    &\geq1-\exp\left(-\frac{(\gamma-\alpha)^{2}}{2}k\right)>1-\exp\left(-\frac{(\gamma-\alpha)^{2}}{2m}n+\frac{(\gamma-\alpha)^{2}}{2}\right).
  \end{aligned}
\\] 따라서 \\(C,\beta\\)가 존재하여 모든 \\(n\\)에 대해 \\(\mathbb{E}\_{\theta\_{0}}\phi\_{n}\leq Ce^{-n\beta}\\)이고
\\(\inf\_{\theta\in B^{c}}\mathbb{E}\_{\theta}\phi\_{n}\geq1-Ce^{-n\beta}\\)이다. \\(\Box\\)

\\(X\\)는 폴란드 공간, \\(\mathcal{A}\\)는 보렐 \\(\sigma\\)-대수이며 \\((X,\mathcal{A})\\) 위에 \\(\sigma\\)-유한한
측도 \\(\mu\\)가 존재한다고 하자. 이 때, \\(P\ll\mu\\)인 모든 확률측도 \\(P\\)의 밀도함수 \\(dP/d\mu\\)를 모은 집합을
\\(L\_{\mu}\\)로 정의하자. 앞으로 모수공간은 \\(L\_{\mu}\\)이며 \\(\mathcal{B}\\)는 \\(L\_{\mu}\\)위의 보렐
\\(\sigma\\)-대수로 생각한다. 이 때, \\(L\_{\mu}\\) 위에서 \\(KL(f;g)=\int f\log(f/g)\\,d\mu\\) 및
\\(K\_{\epsilon}(f)=\\{g:KL(f;g)<\epsilon\\}\\)를 정의할 수 있으며, \\(\Pi\\)를 \\(L\_{\mu}\\) 위의 사전분포로 했을 때
\\(KL(\Pi)=\\{f: \Pi(K\_{\epsilon}(f))>0, \forall\epsilon>0\\}\\)로 정의하자.

**정리 3 (Schwartz).**
\\(f\_{0}\in B\in\mathcal{B}\\)라 하자. 만일 \\(f\_{0}\in KL(\Pi)\\)이고 검정함수열
\\(\\{\phi\_{n}: X^{n}\to[0,1]\\}\\)이 존재해 \\(\mathbb{E}\_{f\_{0}}\phi\_{n}(Y\_{1},\dots,Y\_{n})\to0\\),
\\(\inf\_{f\in B^{c}}\mathbb{E}\_{f}\phi\_{n}(Y\_{1},\dots,Y\_{n})\to1\\)이면
\\(\Pi\_{n}(B\mid\mathcal{F}\_{n}(\omega))\to1\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.이다.

*증명.*
\\(\Pi\_{n}(B^{c}|\mathcal{F}\_{n}(\omega))\to0\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.을 보여도 충분한데,
\\(\Pi(B^{c})=0\\)이면 자명하므로 \\(\Pi(B^{c})>0\\)일 때를 생각하자. \\(g\_{n}=\prod\_{i=1}^{n}f\_{0}(Y\_{i})\\),
\\(h\_{n}=\int\_{B^{c}}\prod\_{i=1}^{n}f(Y\_{i})\Pi(df)/\Pi(B^{c})\\)로 하면 보조정리 2 및 간단한 계산으로부터 \\[
  \int\sqrt{g\_{n}h\_{n}}\\,d\mu^{n}\leq\sqrt{1-\frac{\|g\_{n}-h\_{n}\|\_{1}^{2}}{4}}\leq 2Ce^{-n\beta}.
\\] 임의의 \\(\delta>0\\)에 대해 \\[
  \begin{aligned}
    \sum\_{n}P\_{f\_{0}}^{n}\left(e^{n\beta}h\_{n}/g\_{n}\geq\delta\right)
    &=\sum\_{n}P\_{f\_{0}}^{n}\left(e^{n\beta/2}\sqrt{h\_{n}/g\_{n}}\geq\sqrt\delta\right)\\\\
    &=\sum\_{n}\int \mathbf{1}(e^{n\beta/2}\sqrt{h\_{n}/g\_{n}}\geq\sqrt\delta)g\_{n}\\,d\mu^{n}\\\\
    &=\frac1{\sqrt{\delta}}\sum\_{n}\int\sqrt{\delta}\mathbf{1}(e^{n\beta/2}\sqrt{h\_{n}/g\_{n}}\geq\sqrt\delta)g\_{n}\\,d\mu^{n}\\\\
    &\leq\frac1{\sqrt{\delta}}\sum\_{n}\int e^{n\beta/2}\sqrt{g\_{n}h\_{n}}\\,d\mu^{n}\\\\
    &\leq\frac{2C}{\sqrt\delta}\sum\_{n}e^{-n\beta/2}<\infty.
  \end{aligned}
\\] 따라서 \\(\Pi(B^{c})>0\\)와 Borel&ndash;Cantelli 보조정리에 의해 \\[
  \lim\_{n}e^{n\beta}\int\_{B^{c}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)=0\quad P\_{f\_0}^\infty\text{-a.s.}.\qquad(1)
\\]

모든 \\(\epsilon>0\\)에 대해 \\(f\_{0}\in KL(\Pi)\\)이므로 \\(\Pi(K\_{\epsilon}(f\_{0}))>0\\)이며, 강대수의 법칙에 의해
\\(\frac1n\sum\_{i=1}^{n}\log(f\_{0}(Y\_{i})/f(Y\_{i}))\to KL(f\_{0};f)\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.이므로 \\[
  \begin{aligned}
    \liminf\_{n}e^{2n\epsilon}\int\_{L\_{\mu}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)
    &\geq\liminf\_{n}\int\_{K\_{\epsilon}(f\_{0})}e^{2n\epsilon}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)\\\\
    &\geq\int\_{K\_{\epsilon}(f\_{0})}\liminf\_{n}\exp\left(2n\epsilon-\sum\_{i=1}^{n}\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\right)\Pi(df)\\\\
    &=\infty\quad P\_{f\_{0}}^{\infty}\text{-a.s.}.
  \end{aligned}
\\] 따라서 모든 \\(r>0\\)에 대해 \\[
  \liminf\_{n}e^{nr}\int\_{L\_{\mu}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)
  =\infty\quad P\_{f\_0}^\infty\text{-a.s.}.\qquad(2)
\\] 식 (1)과 (2)로부터 \\[
  \Pi\_{n}(B^{c}|\mathcal{F}\_{n}(\omega))
  =\frac{\int\_{B^{c}}\prod\_{i=1}^{n}f(Y\_{i})\Pi(df)}{\int\_{L\_{\mu}}\prod\_{i=1}^{n}f(Y\_{i})\Pi(df)}
  =\frac{e^{n\beta}\int\_{B^{c}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)}
        {e^{n\beta}\int\_{L\_{\mu}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)}
  \to0\quad P\_{f\_{0}}^{\infty}\text{-a.s.}
\\] 이므로 \\(\Pi\_{n}(B|\mathcal{F}\_{n}(\omega))\to1\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.. \\(\Box\\)

Doob의 정리와 다르게 Schwartz의 정리는 특정 모수의 일치성을 얘기하기 위해 자주 사용되는 정리이다. 다만 이 정리도
부적절한 사전분포에 대해서는 성립하지 않는데다 \\(KL(\Pi)\\)가 크지 않을 수 있으므로 몇몇 모수적 모형에서는 유용하게
적용되기 힘들다.

### 강한 일치성과 약한 일치성

이제 Schwartz 정리를 이용하여 \\(L\_{\mu}\\) 위에서 일치성이 성립할 조건을 찾고자 한다. 먼저 \\(L\_{\mu}\\) 위에서 여러
일치성을 정의하고자 하는데, 위상에 따라 서로 다른 일치성을 정의할 수 있다.

**정의 (강한 일치성; Strong consistency).**
\\(f,g\in L\_{\mu}\\)에 대해 \\(L\_{1}\\) 거리 \\(\|f-g\|\_{1}\\)로부터 유도되는 위상에 대한 일치성을 *강한 일치성*
혹은 *\\(L\_{1}\\) 일치성*이라 한다.

**정의 (약한 일치성; Weak consistency).**
\\(f\_{n},f\in L\_{\mu}\\)에 대해 거리 \\(d\\)가 \\(d(f\_{n},f)\to0\Leftrightarrow f\_{n}\to\_{w}f\\)를 만족한다고
하자. 거리 \\(d\\)로부터 유도되는 위상을 *약한 위상*이라 하고, 약한 위상에 대한 일치성을 *약한 일치성*이라 한다.

\\(L\_{\mu}\\)에 \\(L\_{1}\\) 거리 위상 혹은 약한 위상이 주어진 경우 폴란드 공간이 됨이 알려져 있므로 사후분포의
존재성이 보장된다. 이제 \\(f\_{0}\in L\_{\mu}\\)가 어떠한 조건에서 일치성이 성립할지 보는데, 약한 일치성의 경우는
\\(KL(\Pi)\\)에 속하기만 해도 성립한다.

**정리 4.** 만일 \\(f\_{0}\in KL(\Pi)\\)이면 사후분포는 \\(f\_{0}\\)에서 약한 일치성을 가진다.

*증명.*
약한 위상에서 \\(f\_{0}\\)의 이웃의 부분기저는 \\[
  \left\\{U\_{\epsilon,\phi}
  =\left\\{f: \lvert\int\phi f\\,d\mu-\int \phi f\_{0}\\,d\mu\rvert<\epsilon\right\\}: \epsilon>0, \phi\in C^{b}(X)\right\\}
\\]이므로 모든 \\(U\_{\epsilon,\phi}\\)에 대해 사후분포가 1로 수렴함을 보이면 충분하다. 이 때 \\(\phi\\)는
유계연속이므로 또다른 유계연속함수 \\(\phi^{\ast}=a\phi+c\\) (\\(a>0\\))를 잡아 \\(0\leq\phi^{\ast}\leq1\\)이 되도록 할
수 있으며 이 경우 \\(\phi^{\ast}\\) 및 \\(1-\phi^{\ast}\\)는 검정함수로 생각할 수 있다.

\\(U\_{1}=\left\\{f: \int\phi^{\ast}f\\,d\mu-\int \phi^{\ast}f\_{0}\\,d\mu < a\epsilon\right\\}\\),
\\(U\_{2}=\left\\{f: \int(1-\phi^{\ast}) f\\,d\mu-\int (1-\phi^{\ast}) f\_{0}\\,d\mu < a\epsilon\right\\}\\)로 하면
\\(U\_{\epsilon,\phi}=U\_{1}\cap U\_{2}\\). 이 때 \\(f\in U\_{1}^{c}\\)이면
\\(\mathbb{E}\_{f\_{0}}\phi^{\ast}+a\epsilon<\mathbb{E}\_{f}\phi^{\ast}\\)이므로 보조정리 2와 Schwartz 정리에서
\\(\Pi\_{n}(U\_{1}\mid\mathcal{F}\_{n}(\omega))\to1\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.. 비슷하게
\\(f\in U\_{2}^{c}\\)이면 \\(\mathbb{E}\_{f\_{0}}(1-\phi^{\ast})+a\epsilon<\mathbb{E}\_{f}(1-\phi^{\ast})\\)이므로
\\(\Pi\_{n}(U\_{2}\mid\mathcal{F}\_{n}(\omega))\to1\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.. 따라서
\\(\Pi\_{n}(U\_{\epsilon,\phi}\mid\mathcal{F}\_{n}(\omega))=\Pi\_{n}(U\_{1}\cap U\_{2}\mid\mathcal{F}\_{n}(\omega))\to
1\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.이므로 사후분포는 \\(f\_{0}\\)에서 약한 일치성을 가진다. \\(\Box\\)

강한 일치성을 보이기 위해서는 더 강한 조건이 필요한데, 이를 증명하기 위해 다음 보조정리가 필요하다.

**보조정리 5.** \\(f\_{0}\in U\\), \\(f\_{0}\in KL(\Pi)\\)이며 어떤 \\(C\_{1},C\_{2},\beta\_{1},\beta\_{2}>0\\) 및
\\(V\_{n},W\_{n},\phi\_{n}\\)이 존재하여

1. \\(U^{c}\subset W\_{n}\cup V\_{n}\\),
2. \\(\Pi(W\_{n})\leq C\_{1}e^{-n\beta\_{1}}\\),
3. \\(P\_{f\_{0}}^{\infty}(\phi\_{n}(\mathcal{F}\_{n}(\omega))>0~i.o.)=0\\),
4. \\(\inf\_{f\in V\_{n}}\mathbb{E}\_{f}\phi\_{n}\geq 1-C\_{2}e^{-n\beta\_{2}}\\)

를 만족하면 어떤 \\(\beta\_{0}>0\\)가 존재하여
\\(P\_{f\_{0}}^{\infty}(\Pi\_{n}(U^{c}\mid\mathcal{F}\_{n}(\omega))>e^{-n\beta\_{0}}~i.o.)=0\\).

*증명.*
\\(\Pi\_{n}(U^{c}|\mathcal{F}\_{n}(\omega))\leq
\Pi\_{n}(W\_{n}|\mathcal{F}\_{n}(\omega))+
\phi\_{n}\Pi\_{n}(V\_{n}|\mathcal{F}\_{n}(\omega))+
(1-\phi\_{n})\Pi\_{n}(V\_{n}|\mathcal{F}\_{n}(\omega))\\). 여기서 \\(P\_{f\_{0}}^{\infty}(\phi\_{n}>0~i.o.)=0\\)이므로
\\(P\_{f\_{0}}^{\infty}(\phi\_{n}\Pi\_{n}(V\_{n}|\mathcal{F}\_{n}(\omega))>0~i.o.)=0\\). 또
\\(g\_{n}=\prod\_{i=1}^{n}f\_{0}(Y\_{i})\\), \\(h\_{n}=\int\_{W\_{n}}\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\)로 하면 \\[
  \begin{aligned}
    &\sum\_{n}P\_{f\_{0}}^{n}\left(h\_{n}/g\_{n}\geq e^{-n\beta\_{1}/2}\right)\\\\
    &=\sum\_{n}e^{n\beta\_{1}/2}\int e^{-n\beta\_{1}/2}\mathbf{1}(h\_{n}/g\_{n}\geq e^{-n\beta\_{1}/2})g\_{n}\\,d\mu^{n}\\\\
    &\leq \sum\_{n}e^{n\beta\_{1}/2}\int h\_{n}\\,d\mu^{n}\\\\
    &=\sum\_{n}e^{n\beta\_{1}/2}\int \int\_{W\_{n}}\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\,d\mu^{n}\\\\
    &=\sum\_{n}e^{n\beta\_{1}/2}\Pi(W\_{n})\\\\
    &\leq\sum\_{n}C\_{1}e^{-n\beta\_{1}/2}<\infty.
  \end{aligned}
\\] 따라서 Borel&ndash;Cantelli 보조정리에 의해 \\[
  P\_{f\_{0}}^{\infty}\left(\int\_{W\_{n}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)\geq e^{-n\beta\_{1}/2}~i.o.\right)
  =0.\qquad(3)
\\] 식 (2)와 (3)에 의해 \\(P\_{f\_{0}}^{\infty}(\Pi\_{n}(W\_{n}|\mathcal{F}\_{n}(\omega))\geq e^{-n\beta\_{1}/2}~i.o.)
=0\\).

비슷하게 \\(g\_{n}=\prod\_{i=1}^{n}f\_{0}(Y\_{i})\\),
\\(h\_{n}=(1-\phi\_{n})\int\_{V\_{n}}\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\)로 하면 \\[
  \begin{aligned}
    &\sum\_{n}P\_{f\_{0}}^{n}\left(h\_{n}/g\_{n}\geq e^{-n\beta\_{2}/2}\right)\\\\
    &\leq \sum\_{n}e^{n\beta\_{2}/2}\int h\_{n}\\,d\mu^{n}\\\\
    &=\sum\_{n}e^{n\beta\_{2}/2}\int \int\_{V\_{n}}(1-\phi\_{n})\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\,d\mu^{n}\\\\
    &=\sum\_{n}e^{n\beta\_{2}/2}\int\_{V\_{n}}\mathbb{E}\_{f}[1-\phi\_{n}]\\,\Pi(df)\\\\
    &\leq\sum\_{n}C\_{2}e^{-n\beta\_{2}/2}<\infty.
  \end{aligned}
\\] Borel&ndash;Cantelli 보조정리로 \\[
  P\_{f\_{0}}^{\infty}\left(
    (1-\phi\_{n})\int\_{V\_{n}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\Pi(df)\geq e^{-n\beta\_{2}/2}~i.o.
  \right)=0.\qquad(4)
\\] 식 (2)와 (4)에 의해 \\(P\_{f\_{0}}^{\infty}(
  (1-\phi\_{n})\Pi\_{n}(V\_{n}|\mathcal{F}\_{n}(\omega))\geq e^{-n\beta\_{2}/2}~i.o.
)=0\\). 결과를 모두 정리하면 \\(e^{-n\beta\_{1}/2}+e^{-n\beta\_{2}/2} < e^{-n\beta\_{0}}\\)인 \\(\beta\_{0}\\)에 대해
\\(P\_{f\_{0}}^{\infty}(\Pi\_{n}(U^{c}|\mathcal{F}\_{n}(\omega))> e^{-n\beta\_{0}}~i.o.)=0\\). \\(\Box\\)

**정리 6.**
\\(\mathcal{G}\subset\bigcup\_{i=1}^{n}\\{f:d(f\_{i},f)<\delta\\}\\)를 만족하는 \\(f\_{1},f\_{2},\dots,f\_{n}\\)이
존재할 최소의 \\(n\\)을 \\(N(\delta,\mathcal{G},d)\\)으로 정의하자. 만일 \\(f\_{0}\in KL(\Pi)\\)이고 모든
\\(\epsilon>0\\)에 대해 \\(\\{\mathcal{G}\_{n}\\}\subset L\_{\mu}\\)가 존재하여 충분히 큰 \\(n\\)에 대해

1. \\(\exists C,\beta>0: \Pi(\mathcal{G}\_{n}^{c}) < Ce^{-n\beta}\\),
2. \\(\exists\delta<\epsilon,\gamma<\epsilon^{2}/8: \log N(\delta,\mathcal{G}\_{n},\|\cdot\|\_{1}) < n\gamma\\)

를 만족하면 사후분포는 \\(f\_{0}\\)에서 강한 일치성을 가진다.

*증명.*
\\(L\_{1}\\) 위상에서 \\(f\_{0}\\)의 이웃의 기저는
\\(\left\\{U\_{\epsilon}=\left\\{f:\|f-f\_{0}\|\_{1}<\epsilon\right\\}: \epsilon>0\right\\}\\)이므로 모든
\\(U\_{\epsilon}\\)에 대해 사후분포가 1로 수렴함을 보이면 충분하며, 이는 보조정리 5의 조건을 만족함을 보임으로서 증명할
수 있다. \\(V\_{n}=\mathcal{G}\_{n}\cap U\_{\epsilon}^{c}\\), \\(W\_{n}=\mathcal{G}\_{n}^{c}\\)로 하면
\\(U\_{\epsilon}^{c}=W\_{n}\cup V\_{n}\\)이고 \\(\Pi(W\_{n}) < Ce^{-n\beta}\\)로 조건 (i)와 (ii)가 성립.
\\(k=N(\delta,\mathcal{G}\_{n},\|\cdot\|\_{1})\\)로 하고 \\(\mathcal{G}\_{n}\subset\bigcup\_{j=1}^{k}G\_{i}\\),
\\(G\_{i}=\\{f:\|f-g\_{i}\|\_{1}<\delta\\}\\)인 \\(g\_{1},\dots,g\_{k}\in L\_{\mu}\\)를 잡고
\\(f\_{i}\in V\_{n}\cap G\_{i}\\)를 잡자. \\(f\_{i}\in V\_{n}\\)이므로 \\(\|f\_{i}-f\_{0}\|\_{1}\geq \epsilon\\)이며
\\(A\_{i}=\\{(y\_{1},\dots,y\_{n}): f\_{i}>f\_{0}\\}\\)로 하면
\\(P\_{f\_{0}}(A\_{i})=\alpha\_{i}, P\_{f\_{i}}(A\_{i})=\gamma\_{i}\geq\alpha\_{i}+\epsilon/2\\). 이제 \\[
  B\_{i}=\left\\{
    (y\_{1},\dots,y\_{n}): \frac1n\sum\_{j=1}^{k}\mathbf{1}\_{A\_{i}}(y\_{j})\geq\frac{\gamma\_{i}+\alpha\_{i}}2
  \right\\}
\\]로 하면 Hoeffding 부등식으로부터 \\(P\_{f\_{0}}^{\infty}(B\_{i})\leq e^{-n(\gamma\_{i}-\alpha\_{i})^{2}/2}\leq
e^{-n\epsilon^{2}/8}\\). 또한 \\(\forall g\in G\_{i}: \|f\_{i}-g\|\_{1}<2\delta\\)로 하면
\\(P\_{g}(A\_{i})>\gamma-\delta\\)이므로 비슷하게 \\[
  \begin{aligned}
    P\_{g}^{\infty}(B\_{i})
    &=P\_{g}^{\infty}\left(\frac1n\sum\_{j=1}^{k}\mathbf{1}\_{A\_{i}}(y\_{j})\geq\frac{\gamma\_{i}+\alpha\_{i}}2\right)\\\\
    &\geq P\_{g}^{\infty}\left(\frac1n\sum\_{j=1}^{k}\mathbf{1}\_{A\_{i}}(y\_{j})-P\_{g}(A\_{i})\geq\frac{\alpha\_{i}-\gamma\_{i}}2+\delta\right)\\\\
    &\geq 1-P\_{g}^{\infty}\left(-\frac1n\sum\_{j=1}^{k}\mathbf{1}\_{A\_{i}}(y\_{j})+P\_{g}(A\_{i})>\frac{\epsilon}4-\delta\right)\\\\
    &\geq 1-\exp\left(-n\times2\left(\frac\epsilon4-\delta\right)^{2}\right)\\\\
    &=1-e^{-n\beta\_{2}}.
  \end{aligned}
\\] \\(\phi\_{n}=\max\_{i\leq k}\mathbf{1}\_{B\_{i}}\\)로 하자. \\(\inf\_{f\in V\_{n}}\mathbb{E}\_{f}\phi\_{n}\geq
P\_{g}^{\infty}(B\_{i})\geq1-e^{-n\beta\_{2}}\\)로 조건 (iv)를 만족. 또한 \\[
  \begin{aligned}
    \sum\_{n}P\_{f\_{0}}(\phi\_{n}>0)
    &=\sum\_{n}P\_{f\_{0}}(\phi\_{n}=1)\\\\
    &\leq\sum\_{n}\sum\_{i=1}^{k}P\_{f\_{0}}(B\_{i})\\\\
    &\leq\sum\_{n}e^{-n\epsilon^{2}/8+\log k}\\\\
    &\leq\sum\_{n}e^{-n(\epsilon^{2}/8-\gamma)}<\infty
  \end{aligned}
\\]으로 \\(P\_{f\_{0}}(\phi\_{n}>0~i.o.)=0\\)로 조건 (iii)을 만족. 따라서 보조정리 5의 조건을 모두 만족한다. \\(\Box\\)

## 사후분포의 수렴 속도

사후분포가 일치성을 가진다면, 다음으로는 사후분포가 수렴하는 속도와 그러한 속도를 얻기 위한 조건을 생각해 볼 수 있다.

**정의 (사후분포의 수렴속도; Posterior convergence rate).**
모수공간 \\(\Theta\\)에 거리 \\(d\\)가 주어져있다고 가정하자. \\(\theta\_{0}\in\Theta\\)이고 \\(\epsilon\_{n}\geq0\\)이
존재하여 모든 \\(M\_{n}\to\infty\\)에 대해
\\(\Pi\_{n}(\theta: d(\theta,\theta\_{0})>M\_{n}\epsilon\_{n}\mid\mathcal{F}\_{n}(\omega))\to0\\) in
\\(P\_{\theta\_{0}}^{\infty}\\)-prob.이면 *사후분포가 \\(\theta\_{0}\\)에서 \\(\epsilon\_{n}\\)의 속도로 수렴한다*라고
한다.

지금까지 중요하게 사용된 테크닉 중 하나는 1종오류 및 2종오류의 확률이 지수적으로 감소하는 검정함수 \\(\phi\\)를 찾는
것이다. 이는 사후분포의 수렴 속도와 관련되어서도 중요하게 사용되며, 그와 관련된 보조정리들을 먼저 정리할 필요성이 있다.

### Exponentially Powerful Tests

\\(L\_{\mu}\\) 위에서 Hellinger 거리 \\(h^{2}(f,g)=\int(\sqrt{f}-\sqrt{g})^{2}\\,d\mu\\)를 정의하고,
\\(\rho(f,g)=\int\sqrt{f}\sqrt{g}\\,d\mu\\)로 정의하자.

**보조정리 7.**
\\(f\in L\_{\mu}\\)이고 \\(\mathcal{G}\subset L\_{\mu}\\)가 볼록집합이며 \\(\forall g\in\mathcal{G}:
h(f,g)>\epsilon\\)라고 하자. 이 때 모든 \\(n\in\mathbb{N}\\)에 대해 검정함수 \\(\phi: X^{n}\to[0,1]\\)이 존재하여
\\(\mathbb{E}\_{f}\phi\leq e^{-n\epsilon^{2}/2}\\) 및
\\(\inf\_{g\in\mathcal{G}}\mathbb{E}\_{g}\phi\geq1-e^{-n\epsilon^{2}/2}\\)가 성립한다.

*증명.*
우선 \\(\mathcal{G}\subset L\_{\mu}\subset L^{1}(X,\mathcal{A},\mu)\\)이므로 \\(\mathcal{G}\\)는 벡터공간에 속하는
볼록집합. \\(L^{\infty}(X,\mathcal{A},\mu)\\)가 국소볼록공간이며
\\(\Phi=\\{\phi: X\to[0,1]\\}\subset L^{\infty}(X,\mathcal{A},\mu)\\)는 당연히 볼록집합. 이 때 Banach&ndash;Alaoglu 정리에
의해 \\(\\{\phi: X\to[-1,1]\\}\\)이 약* 위상에 관하여 컴팩트이므로 \\(\Phi\\) 또한 약* 위상에 관해 컴팩트. 따라서
\\((\phi,g)\mapsto\mathbb{E}\_{f}\phi+\mathbb{E}\_{g}(1-\phi)\\)로 하면 최대최소정리에 의해 어떤 \\(\phi^{\ast}\\)가
존재하여 \\(\mathbb{E}\_{f}\phi^{\ast}+\sup\_{g}\mathbb{E}\_{g}(1-\phi^{\ast})=
\sup\_{g}\inf\_{\phi}(\mathbb{E}\_{f}\phi+\mathbb{E}\_{g}(1-\phi))\\). 여기서 \\[
  \begin{aligned}
    \inf\_{\phi}(\mathbb{E}\_{f}\phi+\mathbb{E}\_{g}(1-\phi))
    &=1+\inf\_{\phi}\int\phi(f-g)\\,d\mu\\\\
    &=1+\int\_{f<g}(f-g)\\,d\mu\\\\
    &=\int\_{f<g}f\\,d\mu+\int\_{f\geq g}g\\,d\mu\\\\
    &\leq\int\_{f<g}\sqrt{f}\sqrt{g}\\,d\mu+\int\_{f\geq g}\sqrt{f}\sqrt{g}\\,d\mu\\\\
    &=\rho(f,g)=1-h^{2}(f,g)\\\\
    &\leq1-\epsilon^{2}/2.
\end{aligned}\\]
따라서 \\(\mathbb{E}\_{f}\phi^{\ast}+\sup\_{g\in\mathcal{G}}\mathbb{E}\_{g}(1-\phi^{\ast})\leq1-\epsilon^{2}/2\\).
이 때 \\(\phi\_{n}(y\_{1},\dots,y\_{n})=\prod\_{i=1}^{n}\phi^{\ast}(y\_{i})\\)로 두면 \\[
  \begin{aligned}
    &\mathbb{E}\_{f}\phi\_{n}+\sup\_{g\in\mathcal{G}}\mathbb{E}\_{g}(1-\phi\_{n})\\\\
    &=\int\phi\_{n}(y\_{1},\dots,y\_{n})\prod\_{i=1}^{n}f(y\_{i})\\,d\mu^{n}
      +\sup\_{g\in\mathcal{G}}\int\phi\_{n}(y\_{1},\dots,y\_{n})\prod\_{i=1}^{n}g(y\_{i})\\,d\mu^{n}\\\\
    &=\int\prod\_{i=1}^{n}\phi^{\ast}(y\_{i})f(y\_{i})\\,d\mu^{n}
      +\sup\_{g\in\mathcal{G}}\int\prod\_{i=1}^{n}\phi^{\ast}(y\_{i})g(y\_{i})\\,d\mu^{n}\\\\
    &=(\mathbb{E}\_{f}\phi^{\ast})^{n}+\sup\_{g\in\mathcal{G}}(\mathbb{E}\_{g}(1-\phi^{\ast}))^{n}\\\\
    &\leq(\mathbb{E}\_{f}\phi^{\ast}+\sup\_{g\in\mathcal{G}}\mathbb{E}\_{g}(1-\phi^{\ast}))^{n}\\\\
    &\leq(1-\epsilon^{2}/2)^{n}\leq e^{-n\epsilon^{2}/2}.
  \end{aligned}
\\] 따라서 \\(\mathbb{E}\_{f}\phi\_{n}\leq e^{-n\epsilon^{2}/2}\\)이며 \\(\sup\_{g\in\mathcal{G}}\mathbb{E}\_{g}(1-\phi\_{n})\leq e^{-n\epsilon^{2}/2}\\)에서 \\(\inf\_{g\in\mathcal{G}}\mathbb{E}\_{g}\phi\_{n}\geq1-e^{-n\epsilon^{2}/2}\\). \\(\Box\\)

**보조정리 8.**
\\(f\in L\_{\mu}\\)이고 \\(\mathcal{G}\subset L\_{\mu}\\)가 볼록집합이며 거리 \\(d\\)는 항상 \\(d(f,g)\leq h(f,g)\\)를
만족한다고 하자. 만일 증가함수 \\(D(\epsilon)\\)이 존재하여 모든 \\(\epsilon>\delta\geq0\\)에 대해
\\(N(\epsilon/4,\mathcal{G},d)\leq D(\epsilon)\\)가 성립하면 모든 \\(\epsilon>\delta\\)에 대해 검정함수
\\(\phi\_{\epsilon}: X^{n}\to[0,1]\\)이 존재하여
\\[
  \mathbb{E}\_{f}\phi\_{\epsilon}\leq D(\epsilon)\frac{e^{-n\epsilon^{2}/8}}{1-e^{-n\epsilon^{2}/8}},
  \quad
  \inf\_{g\in\mathcal{G}:d(f,g)>j\epsilon}\mathbb{E}\_{g}\phi\_{\epsilon}\geq
    1- e^{-n\epsilon^{2}j^{2}/8},~\forall j=1,2,\dots
\\] 가 성립한다.

*증명.*
\\(j\in \mathbb{N}\\)을 고정시키고, \\(\mathcal{G}\_{j}=\\{g\in\mathcal{G}:j\epsilon< d(f,g)<2j\epsilon\\}\\)로 하자.
\\(\mathcal{G}\_{j}\\)에서 \\(\forall k\neq l:d(g\_{jk},g\_{jl})\geq j\epsilon/2\\)이 되도록
\\(g\_{j1},\dots,g\_{jN\_{j}}\\)를 뽑으면 \\(N\_{j}\leq N(j\epsilon/4,\mathcal{G}\_{j},d)\\)이다.
\\(\mathcal{G}\_{j}\\)의 정의로부터 \\(j\epsilon/2<
\inf\_{g\in B\_{j\epsilon/2}(g\_{jk})}d(f,g)\leq
\inf\_{g\in B\_{j\epsilon/2}(g\_{jk})}h(f,g)\\)이 되므로 보조정리 7로부터 검정함수 \\(\phi\_{jk}:X^{n}\to[0,1]\\)이
존재하여 \\(\mathbb{E}\_{f}\phi\_{jk}\leq e^{-n\epsilon^{2}j^{2}/8}\\) 및
\\(\sup\_{g\in B\_{j\epsilon/2}(g\_{jl})}\mathbb{E}\_{g}(1-\phi\_{jk})\leq e^{-n\epsilon^{2}j^{2}/8}\\)가 성립.
\\(\phi\_{\epsilon}(y\_{1},\dots,y\_{n})=\sup\\{\phi\_{jk}(y\_{1},\dots,y\_{n}):j\in\mathbb{N}, k\leq N\_{j}\\}\\)라 하면
\\[
  \begin{aligned}
    \mathbb{E}\_{f}\phi\_{\epsilon}
    &\leq\sum\_{j=1}^{\infty}N\_{j}e^{-n\epsilon^{2}j^{2}/8}\\\\
    &\leq\sum\_{j=1}^{\infty}N(j\epsilon/4,\mathcal{G}\_{j},d)e^{-n\epsilon^{2}j^{2}/8}\\\\
    &\leq\sum\_{j=1}^{\infty}D(\epsilon)e^{-n\epsilon^{2}j^{2}/8}\\\\
    &\leq D(\epsilon)\frac{e^{-n\epsilon^{2}/8}}{1-e^{-n\epsilon^{2}/8}}.
  \end{aligned}
\\] 또한 \\[
  \begin{aligned}
    \sup\_{g\in\mathcal{G}: d(f,g)>j\epsilon}\mathbb{E}\_{g}(1-\phi\_{\epsilon})
    &=\sup\_{i\geq j}\sup\_{g\in\mathcal{G}\_{i}}\mathbb{E}\_{g}(1-\phi\_{\epsilon})\\\\
    &\leq\sup\_{i\geq j}\sup\_{k\leq N\_{i}}\sup\_{g\in B\_{i\epsilon/2}(g\_{ik})}\mathbb{E}\_{g}(1-\phi\_{\epsilon})\\\\
    &\leq\sup\_{i\geq j}\sup\_{k\leq N\_{i}}e^{-n\epsilon^{2}j^{2}/8}\\\\
    &=e^{-n\epsilon^{2}j^{2}/8}
  \end{aligned}
\\]이므로 \\(\inf\_{g\in\mathcal{G}:
d(f,g)>j\epsilon}\mathbb{E}\_{g}\phi\_{\epsilon}\geq 1-e^{-n\epsilon^{2}j^{2}/8}\\). \\(\Box\\)

### Ghosal et al.의 결과: 중요 정리

\\(KL^{2}(f;g)=\int f\left(\log(f/g)\right)^{2}\\,d\mu\\),
\\(B(\epsilon)=\\{f:KL(f\_{0};f)\leq\epsilon^{2}, KL^{2}(f\_{0};f)\leq\epsilon^{2}\\}\\)로 정의하며, 거리 \\(d\\)는
항상 \\(d(f,g)\leq h(f,g)\\)를 만족한다고 하자.

**정리 9.**
수열 \\(\epsilon\_{n}\\)가 존재하여 \\(\epsilon\_{n}\to0\\), \\(n\epsilon\_{n}^{2}\to\infty\\)이고 어떤
\\(C\_{1},C\_{2}>0\\)와 \\(\\{ {\mathcal G}\_{n}\\}\subset L\_{\mu}\\)이 존재하여

1. \\(\log N(\epsilon\_{n},{\mathcal G}\_{n},d)\leq C\_{1}n\epsilon\_{n}^{2}\\),
2. \\(\Pi({\mathcal G}\_{n}^{c})\leq \exp(-n\epsilon\_{n}^{2}(C\_{2}+4))\\),
3. \\(\Pi(B(\epsilon\_{n}))\geq\exp(-n\epsilon\_{n}^{2}C\_{2})\\)

이면 사후분포가 \\(f\_{0}\\)에서 \\(\epsilon\_{n}\\)의 속도로 수렴한다.

*증명.*
\\(\mathbb{E}|X\_{n}-X|\to0\\)이면 \\(X\_{n}\overset{P}{\to}X\\)이고 \\(\Pi\_{n}\geq0\\)이므로
\\(\mathbb{E}\_{f\_{0}}\Pi\_{n}(f: d(f,f\_{0})>M\_{n}\epsilon\_{n}|{\mathcal F}\_{n}(\omega))\to0\\)을 보여도 충분하다.
모든 \\(\epsilon>4\epsilon\_{n}\\)에 대해 \\(N(\epsilon/4,\mathcal{G}\_{n},d)\leq
N(\epsilon\_{n},\mathcal{G}\_{n},d)\leq e^{C\_{1}n\epsilon\_{n}^{2}}\\)이므로 보조정리 8을 적용하면 검정함수
\\(\phi\_{n}:X^{n}\to[0,1]\\)이 존재하여 충분히 큰 \\(M\\)에 대해 \\[
  \mathbb{E}\_{f\_{0}}\phi\_{n}\leq
    e^{C\_{1}n\epsilon\_{n}^{2}}\frac{e^{-nM^{2}\epsilon\_{n}^{2}/8}}{1-e^{-nM^{2}\epsilon\_{n}^{2}/8}},
  \quad
  \inf\_{f\in\mathcal{G}\_{n}:d(f\_{0},f)>M\epsilon\_{n}}\mathbb{E}\_{f}\phi\_{n}\geq1-e^{-nM^{2}\epsilon\_{n}^{2}/8}.
\\] 이 때 \\(A\_{n}=
\\{\omega:\int\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)\geq e^{-(2+C\_{2})n\epsilon\_{n}^{2}}\\}\\)로 하면 \\[
  \begin{aligned}
    &\Pi\_{n}(f;d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega))\\\\
    &=\frac{\int\_{f:d(f,f\_{0})>M\_{n}\epsilon\_{n}}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)}
      {\int\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)}\\\\
    &\leq\phi\_{n}+\frac{\int\_{f:d(f,f\_{0})>M\_{n}\epsilon\_{n}}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)(1-\phi\_{n})}
                        {\int\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)}\\\\
    &\leq\phi\_{n}+
         \mathbf{1}\_{A\_{n}^{c}}+
         e^{(2+C\_{2})n\epsilon\_{n}^{2}}\int\_{f:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
                                         \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
    &\leq\phi\_{n}+
         \mathbf{1}\_{A\_{n}^{c}}+
         e^{(2+C\_{2})n\epsilon\_{n}^{2}}\int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
                                         \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
    &    \qquad+e^{(2+C\_{2})n\epsilon\_{n}^{2}}\int\_{\mathcal{G}\_{n}^{c}}
                                                \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df).
  \end{aligned}
\\] 우선 \\(M\_{n}\to\infty\\) 및 \\(n\epsilon\_{n}^{2}\to\infty\\)에서 \\(\mathbb{E}\_{f\_{0}}\phi\_{n}\to0\\).
\\(D\_{n}=\\{\omega:
1/\Pi(B(\epsilon\_{n}))\times\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)
\geq e^{-2n\epsilon\_{n}^{2}}\\}\\)로 정의하자. \\(D\_{n}\\)의 좌변을 살펴보면 사전분포 \\(\Pi\\)를 영역
\\(B(\epsilon\_{n})\\)로 제한시킨 후 normalizing을 한 것과 같으므로 새 사전분포 \\(\Pi'\\)가 존재해
\\(D\_{n}=\\{\omega:
\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi'(df)\geq e^{-2n\epsilon\_{n}^{2}}\\}\\).
Jensen 부등식으로부터 \\[
  \log\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)
  \geq\sum\_{i=1}^{n}\int\_{B(\epsilon\_{n})}\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df).
\\] 위 식의 우변을 \\(Z\\)라 하면 \\[
  \begin{aligned}
    \mathbb{E}\_{f\_{0}}Z
    &=\sum\_{i=1}^{n}\int
      \left(-\int\_{B(\epsilon\_{n})}\log\frac{f\_{0}(Y\_{i})}{f(Y\_{i})}\\,\Pi'(df)\right)
      \prod\_{j=1}^{n}f\_{0}(Y\_{j})\\,d\mu^{n}\\\\
    &=-n\int\_{B(\epsilon\_{n})} KL(f\_{0};f)\\,\Pi'(df)\geq-n\epsilon\_{n}^{2},\\\\
    \mathbb{E}\_{f\_{0}}Z^{2}
    &=\sum\_{i=1}^{n}\int
      \left(\int\_{B(\epsilon\_{n})}\log\frac{f\_{0}(Y\_{i})}{f(Y\_{i})}\\,\Pi'(df)\right)^{2}
      \prod\_{j=1}^{n}f\_{0}(Y\_{j})\\,d\mu^{n}\\\\
    &\leq\sum\_{i=1}^{n}\int
      \int\_{B(\epsilon\_{n})}\left(\log\frac{f\_{0}(Y\_{i})}{f(Y\_{i})}\right)^{2}\\,\Pi'(df)
      \prod\_{j=1}^{n}f\_{0}(Y\_{j})\\,d\mu^{n}\\\\
    &=n\int\_{B(\epsilon\_{n})} KL^{2}(f\_{0};f)\\,\Pi'(df)\leq n\epsilon\_{n}^{2}.
  \end{aligned}
\\] 조건에 의해 \\(\Pi(B(\epsilon\_{n}))\geq e^{-n\epsilon\_{n}^{2}C\_{2}}\\)이므로 Chebyshev 부등식을 적용하면 \\[
  \begin{aligned}
    P\_{f\_{0}}(A\_{n})
    &\geq P\_{f\_{0}}(D\_{n})\\\\
    &=P\_{f\_{0}}\left(
        \log\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)\geq-2n\epsilon\_{n}^{2}
      \right)\\\\
    &\geq1-P\_{f\_{0}}\left(Z<-2n\epsilon\_{n}^{2}\right)\\\\
    &=1-P\_{f\_{0}}\left(Z-\mathbb{E}Z < -n\epsilon\_{n}^{2}\right)\\\\
    &\geq1-(n\epsilon\_{n}^{2})^{-1}
  \end{aligned}
\\] 따라서 \\(\mathbb{E}\_{f\_{0}}\mathbf{1}\_{A\_{n}^{c}}=P\_{f\_{0}}(A\_{n}^{c})\to0\\). 또한 \\[
  \begin{aligned}
    &e^{(2+C\_{2})n\epsilon\_{n}^{2}}\mathbb{E}\_{f\_{0}}
      \int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
      \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
    &=e^{(2+C\_{2})n\epsilon\_{n}^{2}}
      \int\int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
      (1-\phi\_{n})\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\,d\mu^{n}\\\\
    &=e^{(2+C\_{2})n\epsilon\_{n}^{2}}
      \int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
      \mathbb{E}\_{f}(1-\phi\_{n})\\,\Pi(df)\\\\
    &\leq e^{(2+C\_{2}-M\_{n}^{2}/8)n\epsilon\_{n}^{2}}\to0.
  \end{aligned}
\\] 마지막으로 \\[
  \begin{aligned}
    &e^{(2+C\_{2})n\epsilon\_{n}^{2}}\mathbb{E}\_{f\_{0}}
       \int\_{\mathcal{G}\_{n}^{c}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)\\\\
    &=e^{(2+C\_{2})n\epsilon\_{n}^{2}}
      \int\int\_{\mathcal{G}\_{n}^{c}}\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\,d\mu^{n}\\\\
    &=e^{(2+C\_{2})n\epsilon\_{n}^{2}}\Pi(\mathcal{G}\_{n}^{c})\\\\
    &\leq e^{-2n\epsilon\_{n}^{2}}\to0.
  \end{aligned}
\\] 따라서 \\(\mathbb{E}\_{f\_{0}}\Pi\_{n}(f: d(f,f\_{0})>M\_{n}\epsilon\_{n}|{\mathcal F}\_{n}(\omega))\to0\\)이
되므로 성립한다. \\(\Box\\)

### Ghosal et al.의 결과: 확장

정리 9는 두 가지 측면에서 확장이 가능하다. 우선 사후분포의 수렴 속도를 정의하는데 확률 수렴을 사용했는데, 이를 a.s.
수렴으로 바꾸었을 때 어떠한 조건에서 이를 만족하는지를 생각할 수 있다.

**정리 10.**
수열 \\(\epsilon\_{n}\\)가 존재하여 \\(\epsilon\_{n}\to0\\), \\(n\epsilon\_{n}^{2}\to\infty\\)이고 어떤
\\(C\_{1},C\_{2}>0\\)와 \\(\\{ {\mathcal G}\_{n}\\}\subset L\_{\mu}\\)이 존재하여

1. \\(\log N(\epsilon\_{n},{\mathcal G}\_{n},d)\leq C\_{1}n\epsilon\_{n}^{2}\\),
2. \\(\Pi({\mathcal G}\_{n}^{c})\leq \exp(-n\epsilon\_{n}^{2}(C\_{2}+4))\\),
3. \\(\forall \beta>0: \sum\_{n=1}^{\infty}e^{-\beta n\epsilon\_{n}^{2}}<\infty\\),
4. \\(\Pi\left(f:h^{2}(f,f\_{0})\|f\_{0}/f\|\_{\infty}\leq\epsilon\_{n}^{2}\right)\geq\exp(-n\epsilon\_{n}^{2}C\_{2})\\)

이면 사후분포가 \\(f\_{0}\\)에서 \\(\epsilon\_{n}\\)의 속도로 \\(P\_{f\_{0}}^{\infty}\\)-a.s. 수렴한다.

*증명.*
\\(A\_{n}=
\\{\omega:\int\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)\geq e^{-(3+C\_{2})n\epsilon\_{n}^{2}}\\}\\)로 하자.
임의의 \\(\beta\_{1}>0\\)에 대해 정리 9의 증명과정과 Markov 부등식으로부터 다음이 성립한다: \\[
  \begin{aligned}
    &P\_{f\_{0}}\left(\Pi\_{n}\left(f; d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega)\right)
                                       > e^{-\beta\_{1}n\epsilon\_{n}^{2}}\right)\\\\
    &\leq e^{\beta\_{1}n\epsilon\_{n}^{2}}
        \mathbb{E}\_{f\_{0}}\left[\Pi\_{n}(f; d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega)\right]\\\\
    &\leq e^{\beta\_{1}n\epsilon\_{n}^{2}}
        \left[
          \mathbb{E}\_{f\_{0}}\phi\_{n}+\mathbb{E}\_{f\_{0}}\mathbf{1}\_{A\_{n}^{c}}\right.\\\\
    &\qquad+e^{(3+C\_{2})n\epsilon\_{n}^{2}}
        \mathbb{E}\_{f\_{0}}\int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}
                            \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
    &\qquad\left.+e^{(3+C\_{2})n\epsilon\_{n}^{2}}
        \mathbb{E}\_{f\_{0}}\int\_{\mathcal{G}\_{n}^{c}}
                            \prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)
        \right]\\\\
    &\leq e^{\beta\_{1}n\epsilon\_{n}^{2}}\left[
      P\_{f\_{0}}(A\_{n}^{c})
      +e^{C\_{1}n\epsilon\_{n}^{2}}\frac{e^{-M\_{n}^{2}n\epsilon\_{n}^{2}/8}}{1-e^{-M\_{n}^{2}n\epsilon\_{n}^{2}/8}}
      +e^{(3+C\_{2}-M\_{n}^{2}/8)n\epsilon\_{n}^{2}}
      +e^{-n\epsilon\_{n}^{2}}
      \right].
  \end{aligned}
\\] 이제 어떤 \\(c>0\\)가 존재하여 \\(P\_{f\_{0}}(A\_{n}^{c})\leq e^{-cn\epsilon\_{n}^{2}}\\)가 됨을 보이면 충분한데,
이 경우 \\(\beta\_{1}\\)을 충분히 작게 잡으면 위 식의 우변이 \\(e^{-\beta\_{2}n\epsilon\_{n}^{2}}\\)보다 작게 되는
\\(\beta\_{2}>0\\)가 존재하므로 Borel&ndash;Cantelli 보조정리에 의해
\\(\Pi\_{n}(f;d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega))\to0\\) \\(P\_{f\_{0}}^{\infty}\\)-a.s.가 되기
때문이다.

\\(S\_{n}=\\{f: h^{2}(f,f\_{0})\|f\_{0}/f\|\_{\infty}\leq\epsilon\_{n}^{2}\\}\\),
\\(D\_{n}=\\{\omega:
  1/\Pi(S\_{n})\times\int\_{S\_{n}}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)\geq e^{-3n\epsilon\_{n}^{2}}
\\}\\)로 정의하자. \\(D\_{n}\\)의 좌변을 살펴보면 사전분포 \\(\Pi\\)를 영역 \\(S\_{n}\\)으로 제한시킨 후 normalizing을
한 것과 같으므로 새 사전분포 \\(\Pi'\\)가 존재해
\(D\_{n}=\\{\omega:\int\_{S\_{n}}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi'(df)\geq e^{-3n\epsilon\_{n}^{2}}\\}\\).
\\(Z\_{i}=\int\_{S\_{n}}\log(f(Y\_{i})/f\_{0}(Y\_{i}))\\,\Pi'(df)\\)로 정의하면 \\(Z\_{i}\\)들은 각각 독립이고
\\(-\int f\_{0}\log(f/f\_{0})\\,d\mu\leq2h^{2}(f,f\_{0})\|f\_{0}/f\|\_{\infty}\\)가 알려져 있으므로 \\[
  \begin{aligned}
    -\mathbb{E}Z\_{i}
    &=\int\int\_{S\_{n}}-\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)f\_{0}(Y\_{i})\\,d\mu\\\\
    &=\int\_{S\_{n}}\int-f\_{0}\log\frac{f}{f\_{0}}\\,d\mu\\,\Pi'(df)
    \leq2\epsilon\_{n}^{2}.
  \end{aligned}
\\] 또한 Jensen 부등식으로부터 \\[
  \begin{aligned}
    &e^{|Z\_{i}|}-1-|Z\_{i}|\\\\
    &=\exp|\int\_{S\_{n}}\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)|
      -1
      -|\int\_{S\_{n}}\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)|\\\\
    &\leq\int\_{S\_{n}}\left(\exp|\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}|
      -1
      -|\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}|\right)\\,\Pi'(df).
  \end{aligned}
\\] \\(c=-\log\|f\_{0}/f\|\\)라고 하자. 그러면 \\(\log(f/f\_{0})\geq c\\)이고 \\(c<0\\)이므로 \\[
  \begin{aligned}
    &\mathbb{E}\_{f\_{0}}\left[e^{|Z\_{i}|}-1-|Z\_{i}|\right]\\\\
    &\leq\int\_{S\_{n}}\mathbb{E}\_{f\_{0}}\left[\exp|\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}|-1-|\log\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}|\right]\\,\Pi'(df)\\\\
    &\leq\int2e^{-c}f\_{0}\left(\exp(\frac12\log\frac{f}{f\_{0}})-1\right)^{2}\\,d\mu\\\\
    &\leq2\|f\_{0}/f\|\int\left(\sqrt{f}-\sqrt{f\_{0}}\right)^{2}\\,d\mu\\\\
    &=2h^{2}(f,f\_{0})\|f\_{0}/f\|\_{\infty}\leq 2\epsilon\_{n}^{2}.
  \end{aligned}
\\] 조건을 만족하므로 Bernstein 부등식을 적용하면 \\[
  \begin{aligned}
    P\_{f\_{0}}(A\_{n}^{c})
    &\leq P\_{f\_{0}}(D\_{n}^{c})\\\\
    &=P\_{f\_{0}}\left(
        \log\int\_{S\_{n}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi'(df)< -3n\epsilon\_{n}^{2}
      \right)\\\\
    &\leq P\_{f\_{0}}\left(\sum\_{i=1}^{n}Z\_{i}< -3n\epsilon\_{n}^{2}\right)\\\\
    &\leq P\_{f\_{0}}\left(\sum\_{i=1}^{n}(Z\_{i}-\mathbb{E}Z\_{i})< -n\epsilon\_{n}^{2}\right)\\\\
    &\leq P\_{f\_{0}}\left(|\sum\_{i=1}^{n}(Z\_{i}-\mathbb{E}Z\_{i})|>n\epsilon\_{n}^{2}\right)\\\\
    &\leq 2\exp\left(-\frac12\frac{n^{2}\epsilon\_{n}^{4}}{1+4n\epsilon\_{n}^{2}}\right).
  \end{aligned}
\\] 따라서 적당한 \\(c>0\\)를 잡아 \\(P\_{f\_{0}}(A\_{n}^{c})\leq e^{-cn\epsilon\_{n}^{2}}\\)가 되도록 할 수 있으므로
성립한다. \\(\Box\\)

또한 \\(n\epsilon\_{n}^{2}\\)가 발산하지 않는 경우를 포함하도록 정리를 확장하는 경우를 생각해 볼 수 있다.

**정리 11.** 수열
\\(\epsilon\_{n}\\)가 존재하여 \\(\epsilon\_{n}\to0\\), \\(n\epsilon\_{n}^{2}\to c>0\\)이고 어떤 \\(C\_{1}>0\\)과
\\(\\{ {\mathcal G}\_{n}\\}\subset L\_{\mu}\\)이 존재하여

1. \\(\sup\_{\epsilon\geq\epsilon\_{n}}\log N(\epsilon/4,\\{f\in\mathcal{G}\_{n}:\epsilon\leq d(f,f\_{0})\leq 2\epsilon\\},d)\leq C\_{1}n\epsilon\_{n}^{2}\\),
2. \\(\Pi({\mathcal G}\_{n}^{c})/\Pi(B(\epsilon\_{n}))=o(e^{-2n\epsilon\_{n}^{2}})\\),
3. \\(\forall j>J: \Pi(f:j\epsilon\_{n}<d(f,f\_{0})\leq2j\epsilon\_{n})/\Pi(B(\epsilon\_{n}))\leq e^{n\epsilon\_{n}^{2}j^{2}/8}\\)

이면 사후분포가 \\(f\_{0}\\)에서 \\(\epsilon\_{n}\\)의 속도로 수렴한다.

*증명.*
\\(\mathbb{E}\_{f\_{0}}\Pi\_{n}(f: d(f,f\_{0})>M\_{n}\epsilon\_{n}|{\mathcal F}\_{n}(\omega))\to0\\)을 보여도 충분하다.
보조정리 8의 증명을 약간 변형하면 검정함수 \\(\phi\_{n}:X^{n}\to[0,1]\\)이 존재하여 충분히 큰 \\(M\_{n}\\)에 대해
다음이 성립함을 알 수 있다: \\[
  \mathbb{E}\_{f\_{0}}\phi\_{n}\leq e^{C\_{1}n\epsilon\_{n}^{2}}\frac{e^{-nM\_{n}^{2}\epsilon\_{n}^{2}/8}}{1-e^{-nM\_{n}^{2}\epsilon\_{n}^{2}/8}},\quad\inf\_{f\in\mathcal{G}\_{n}:d(f\_{0},f)>M\_{n}\epsilon\_{n}j}\mathbb{E}\_{f}\phi\_{n}\geq1-e^{-nM\_{n}^{2}\epsilon\_{n}^{2}j^{2}/8},\forall j = 1,2,\dots.
\\] 이 때 \\(t\geq1\\)에 대해
\\(A\_{n}=\\{\omega:\int\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)\geq e^{-2tn\epsilon\_{n}^{2}}\Pi(B(\epsilon\_{n}))\\}\\)로 하면 \\[
  \begin{aligned}
    &\Pi\_{n}(f;d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega))\\\\
    &\leq\phi\_{n}+\mathbf{1}\_{A\_{n}^{c}}\\\\
    &\qquad+\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
    &\qquad+\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\int\_{\mathcal{G}\_{n}^{c}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df).
  \end{aligned}
\\] 우선 \\(M\_{n}\to\infty\\)이므로 \\(\mathbb{E}\_{f\_{0}}\phi\_{n}\to0\\). \\(D\_{n}=\\{\omega:1/\Pi(B(\epsilon\_{n}))\times\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi(df)\geq e^{-2tn\epsilon\_{n}^{2}}\\}\\)로 정의하자. \\(D\_{n}\\)의 좌변을 살펴보면 사전분포 \\(\Pi\\)를 영역 \\(B(\epsilon\_{n})\\)로 제한시킨 후 normalizing을 한 것과 같으므로 새 사전분포 \\(\Pi'\\)가 존재해 \\(D\_{n}=\\{\omega:\int\_{B(\epsilon\_{n})}\prod\_{i=1}^{n}f(Y\_{i})/f\_{0}(Y\_{i})\\,\Pi'(df)\geq e^{-2tn\epsilon\_{n}^{2}}\\}\\). 그러면 정리 9의 증명에서 보인것처럼 \\(\mathbb{E}\_{f\_{0}}\mathbf{1}\_{A\_{n}^{c}}=P\_{f\_{0}}(A\_{n}^{c})\leq(t^{2}n\epsilon\_{n}^{2})^{-1}\\).

\\(S\_{nj}=\\{f\in\mathcal{G}\_{n}:j\epsilon\_{n}<d(f,f\_{0})\leq2j\epsilon\_{n}\\}\\)으로 정의하면 \\(\\{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}\\}\subset\bigcup\_{j=\lfloor M\_{n}\rfloor}^{\infty}S\_{nj}\\). \\(M\_{n}\to\infty\\)므로 \\(\forall n>N: M\_{n}>J\\)인 \\(N\\)이 존재하며, 이 때 \\[\begin{aligned}
&\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\mathbb{E}\_{f\_{0}}\int\_{f\in\mathcal{G}\_{n}:d(f,f\_{0})>M\_{n}\epsilon\_{n}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)(1-\phi\_{n})\\\\
&\leq\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\sum\_{j=\lfloor
M\_{n}\rfloor}^{\infty}\int\_{S\_{nj}}\mathbb{E}\_{f}(1-\phi\_{n})\\,\Pi(df)\\\\
&\leq e^{2tn\epsilon\_{n}^{2}}
\sum\_{j=\lfloor M\_{n}\rfloor}^{\infty}\frac{\Pi(S\_{nj})}{\Pi(B(\epsilon\_{n}))}e^{-nM\_{n}^{2}\epsilon\_{n}^{2}j^{2}/8}\\\\
&\leq \sum\_{j=\lfloor M\_{n}\rfloor}^{\infty}e^{-n\epsilon\_{n}^{2}(-2t+(M\_{n}^{2}-1)j^{2}/8)}\to0
\end{aligned}\\] 그리고 \\[
  \begin{aligned}
&\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\mathbb{E}\_{f\_{0}}\int\_{\mathcal{G}\_{n}^{c}}\prod\_{i=1}^{n}\frac{f(Y\_{i})}{f\_{0}(Y\_{i})}\\,\Pi(df)\\\\
&=\frac{e^{2tn\epsilon\_{n}^{2}}}{\Pi(B(\epsilon\_{n}))}\int\int\_{\mathcal{G}\_{n}^{c}}\prod\_{i=1}^{n}f(Y\_{i})\\,\Pi(df)\\,d\mu^{n}\\\\
&=e^{2tn\epsilon\_{n}^{2}}\frac{\Pi(\mathcal{G}\_{n}^{c})}{\Pi(B(\epsilon\_{n}))}\\\\
&=e^{2tn\epsilon\_{n}^{2}}o(e^{-2n\epsilon\_{n}^{2}}).
  \end{aligned}
\\] 따라서 정리하면 \\[
  \begin{aligned}
&\mathbb{E}\_{f\_{0}}\Pi\_{n}(f;d(f,f\_{0})>M\_{n}\epsilon\_{n}|\mathcal{F}\_{n}(\omega))\\\\
&\leq\mathbb{E}\_{f\_{0}}\phi\_{n}
+\sum\_{j=\lfloor M\_{n}\rfloor}^{\infty}e^{-n\epsilon\_{n}^{2}(-2t+(M\_{n}^{2}-1)j^{2}/8)}
+\frac1{t^{2}n\epsilon\_{n}^{2}}
+e^{2tn\epsilon\_{n}^{2}}o(e^{-2n\epsilon\_{n}^{2}}).
  \end{aligned}
\\]
만일 \\(n\epsilon\_{n}^{2}\to\infty\\)이면 \\(t=1\\)일 때 \\(RHS\to0\\). 만일 \\(n\epsilon\_{n}^{2}\to c>0\\)이면 \\(t\geq1\\)에 대해 \\(RHS\to1/t^{2}c\\)인데 임의의 \\(t\geq1\\)에 대해 성립하므로 \\(t\to\infty\\)로 하면 \\(RHS\to0\\)로 성립. \\(\Box\\)

## 참고 문헌

- Ghosh, J. K. and R. V. Ramamoorthi (2003). *Bayesian Nonparametrics*. Springer.
- Kleijn, B., A. van der Vaart, and H. van Zanten (2012). Lectures on nonparametric Bayesian statistics.
- Ghosal, S., J. K. Ghosh, and A. W. van der Vaart (2000). Convergence rates of posterior distributions. *The Annals of Statistics 28*(2), 500–531.
