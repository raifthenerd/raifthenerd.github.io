+++
title = "Conditional Probability (in Korean)"
description = "측도 기반 확률론에서 조건부확률은 어떻게 정의되는가."
[extra]
lang = "ko"
+++

약 7년반 전에 수강했던 대학원 확률론 수업의 첫 목표를 거칠게 요약하자면, 그 동안 배운 지식(확률,
확률변수, 확률분포, ...)을 측도론의 언어로 재정의하고 이를 바탕으로 큰 수의 법칙과 중심극한정리를
엄밀하게 증명하는데 있는 것으로 보인다.
이 재정의하는 과정들이 (최소한 지금은) 자연스러운 개념으로 받아들여지는데, 아직까지도 전혀 직관적으로 와닿지 않는 내용이 있으니 바로 조건부확률이다.

<!-- more -->
> 확률공간 \\((\Omega,\mathcal{F},P)\\)이 주어졌을 때, 사건공간 \\(\mathcal{F}'\subset\mathcal{F}\\)에 대한 사건 \\(A\in\mathcal{F}\\)의 조건부확률 \\(P(A|\mathcal{F}')\\)는 Radon-Nikodym 도함수 \\(d\nu/dP\\)로 계산되는 확률변수이다. 여기서 \\(\nu: \mathcal{F}'\to\mathbb{R}_{\ge0}\\)은
> \\[\nu(B)=\int_B \mathbb{I}_A dP. \\]

아마 확률론에 대한 배경지식이 없는 독자들은 매우 혼란스럽게 다가올 것으로 생각되는데, 익숙하지 않은 정의들은 차치하더라도 어감들만 봐도 뭔가 반직관적으로 느껴질 것 같다. 뭔지 모르겠지만 도함수면 미분일텐데 그게 왜 나와? 조건부확률이라면서 왜 확률변수가 된다고 해? 등등...

해당 포스트에서는 확률론에 대한 배경지식이 적은 독자들을 대상으로 위 내용을 설명하는 것을 목표로 한다.

## 확률과 확률변수

그 전에 우선, 확률의 정의는 어떻게 될까?

**정의 (확률; probability).**
공집합이 아닌 집합 \\(\Omega\\)에 대해 다음을 만족하는 집합 \\(\mathcal{F}\subset\mathcal{P}(\Omega)\\)을 *\\(\sigma\\)-대수*(\\(\sigma\\)-algebra)라 한다:

1. \\(\Omega\in\mathcal{F}\\)
2. \\(A\in\mathcal{F}\implies A^c\in\mathcal{F}\\)
3. \\(\forall i\in\mathbb{N}: A_i\in\mathcal{F}\implies \bigcup_{i}A_i\in\mathcal{F}\\)

이 때 \\((\Omega,\mathcal{F})\\)를 *가측공간*(measurable space)라 하고, 주어진 가측공간에 대해 함수 \\(P: \mathcal{F}\to\mathbb{R}_{\ge0}\\)가 가산가법성(countable additivity)을 만족하면, 다시 말해
\\[
\forall i,j\in\mathbb{N}: A_i\cap A_j=\emptyset\implies P\left(\bigcup_i A_i\right)=\sum_i P(A_i)
\\]
를 만족하면 \\(P\\)를 *측도*(measure)라 한다.
여기서 \\((\\Omega,\\mathcal{F},P)\\)가 특별히 \\(P(\Omega)=1\\)을 만족하면 *확률공간*(probability space)라 부르며 \\(P\\)를 *확률*이라 하고 \\(\mathcal{F}\\)를 *사건공간*(event space)이라 부른다.

결국 측도는 우리가 관심있어하는 집합의 특정 부분 집합들에 크기를 부여하는 함수로 생각할 수 있다. 요컨대 특정 공간의 길이/넓이/부피는 물론, 밀도가 주어졌을 때 영역의 질량, 더 나아가 사건이 발생할 확률을 측도로 정의할 수 있다. 그런데 왜 \\(\sigma\\)-대수 같은 개념이 추가로 도입되었는가 하냐면, \\(\Omega\\) 모든 부분집합에 대해 측도가 정의되지 않는 경우가 생길 수 있기 때문이다. 일례로 ZFC 하에서는 우리에게 일상적인 길이와 부피조차 \\(\mathbb{R}\\)과 \\(\mathbb{R}^3\\)의 모든 부분집합에 대해 정의할 수 없음이 잘 알려져 있다([Vitali 집합][Vitali set], [Banach-Tarski 역설][Banach-Tarski paradox]). 따라서 우리가 측도를 정의할 수 있는 일부 집합만을 생각하기 위해 도입된 개념이며, 다행히 이렇게 제한된 집합에서도 이론이 잘 전개된다.

[Vitali set]: <https://en.wikipedia.org/wiki/Vitali_set>
[Banach-Tarski paradox]: <https://en.wikipedia.org/wiki/Banach%E2%80%93Tarski_paradox>

이쯤에서 아마 몇몇은 중고등학교 때 배웠던 확률 내용을 떠올릴텐데, 거기서는 사건공간이 매우 구체적으로, 요컨대 "주사위를 던졌을 때 눈" 혹은 "동전을 여러번 던졌을 때 앞/뒤"와 같이 서술하는 것으로 기억한다. 이걸 떠올리며 실제로 수학자/통계학자들이 다루는 사건공간이 어떻게 생겨먹었고 거기에 사건과 확률 등이 잘 정의는지 궁금해할 수 도 있을것 같다. 그러나 [Tao의 얘기처럼][tao], 수학자들이나 통계학자들 대부분은 아무 관심이 없는 것처럼 보인다. 그저 선험적으로 존재하는 무작위성의 근원인 무언가라고 생각할 뿐이다.

> In order to have the freedom to perform extensions every time we need to introduce a new source of randomness, we will try to adhere to the following important dogma: probability theory is only “allowed” to study concepts and perform operations which are preserved with respect to extension of the underlying sample space.

[tao]: https://terrytao.wordpress.com/2010/01/01/254a-notes-0-a-review-of-probability-theory

대신 우리는 확률변수들을 통해 확률을 다룬다.

**정의 (확률변수; random variable).**
두 가측공간 \\((\Omega,\mathcal{F})\\)과 \\((S,\mathcal{S})\\)에 대해 함수 \\(f: \Omega\to S\\)가 다음을 만족하면 *\\(\mathcal{F}\\)-가측함수*(\\(\mathcal{F}\\)-measurable function) 혹은 그냥 *가측함수*(measurable function)이라 한다:
\\[\forall B\in\mathcal{S}: f^{-1}(B)\in\mathcal{F}.\\]
특별히 \\(X\\)가 확률공간 \\((\Omega,\mathcal{F},P)\\)에서 \\((\mathbb{R},\mathcal{B}(\mathbb{R}))\\)로 가는 가측함수라면 \\(X\\)를 *확률변수*라 부른다. 여기서 \\(\mathcal{B}(\mathbb{R})\\)은 Borel \\(\sigma\\)-대수로, \\(\mathbb{R}\\) 위의 모든 열린집합을 포함하는 가장 작은 \\(\sigma\\)-대수이다.

**관찰.** \\(A\in\mathcal{F}\\)에 대해 지시함수(indicator function) \\(\mathbb{I}_A\\)는 가측함수이며 다음이 성립한다:
\\[
P(A)=\int \mathbb{I}_A(\omega) dP(\omega)
\\]

## 참고 문헌

- Durrent, R. (2019). *Probability: Theory and Examples* (5th Ed.). Cambridge University Press.
