/* cheat sheet · probability — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'probability', icon: '⚄', color: '#b07f00', bg: '#fbf1d6', cat: 'probability',
    name: 'Probability|Probabilités|Probabilidad|確率|概率',
    blurb: 'Events, conditional probability, Bayes, expectation, variance and the common distributions.|Événements, probabilités conditionnelles, Bayes, espérance, variance et lois usuelles.|Sucesos, probabilidad condicionada, Bayes, esperanza, varianza y distribuciones habituales.|事象、条件付き確率、ベイズ、期待値、分散、代表的な分布。|事件、条件概率、贝叶斯、期望、方差与常见分布。',
    sections: [
      { t: 'Basics|Bases|Lo básico|基本|基础', items: [
        ['Equally likely outcomes|Équiprobabilité|Casos equiprobables|同様に確からしい場合|古典概型', R`P(A) = \frac{|A|}{|\Omega|}`, 'Favourable outcomes over all outcomes.|Cas favorables sur cas possibles.|Casos favorables entre casos posibles.|起こる場合の数 ÷ 全体の場合の数。|有利结果数除以全部结果数。'],
        ['Complement|Complémentaire|Complementario|余事象|对立事件', R`P(\bar A) = 1 - P(A)`],
        ['At least one|Au moins un|Al menos uno|少なくとも1回|至少一次', R`P(X \ge 1) = 1 - P(X = 0)`],
        ['Union|Réunion|Unión|和事象|并事件', R`P(A \cup B) = P(A) + P(B) - P(A \cap B)`],
        ['Incompatible events|Événements incompatibles|Sucesos incompatibles|排反事象|互斥事件', R`A \cap B = \varnothing \ \Rightarrow\ P(A \cup B) = P(A) + P(B)`],
        ['Geometric probability|Probabilité géométrique|Probabilidad geométrica|幾何確率|几何概型', R`P = \frac{\ell(A)}{\ell(\Omega)}, \qquad P = \frac{S(A)}{S(\Omega)}`, 'Use lengths or areas instead of counts.|On utilise des longueurs ou des aires au lieu de nombres de cas.|Se usan longitudes o áreas en lugar de recuentos.|個数の代わりに長さや面積を使います。|用长度或面积代替个数。']
      ] },
      { t: 'Conditional probability|Probabilités conditionnelles|Probabilidad condicionada|条件付き確率|条件概率', fig: 'venn', items: [
        ['Definition|Définition|Definición|定義|定义', R`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`],
        ['Multiplication rule|Formule des probabilités composées|Regla del producto|乗法定理|乘法公式', R`P(A \cap B) = P(B)\,P(A \mid B)`],
        ['Independence|Indépendance|Independencia|独立|独立', R`P(A \cap B) = P(A)\,P(B) \iff P(A \mid B) = P(A)`],
        ['Total probability|Probabilités totales|Probabilidad total|全確率の公式|全概率公式', R`P(A) = \sum_i P(A \mid B_i)\,P(B_i)`],
        ['Bayes’ theorem|Formule de Bayes|Teorema de Bayes|ベイズの定理|贝叶斯公式', R`P(B \mid A) = \frac{P(A \mid B)\,P(B)}{P(A)}`]
      ] },
      { t: 'Random variables|Variables aléatoires|Variables aleatorias|確率変数|随机变量', items: [
        ['Expectation|Espérance|Esperanza|期待値|期望', R`E[X] = \sum x_i\,p_i`],
        ['Variance|Variance|Varianza|分散|方差', R`\operatorname{Var}X = E\left[(X - \mu)^2\right] = E[X^2] - E[X]^2, \qquad \sigma = \sqrt{\operatorname{Var}X}`],
        ['Linear change|Changement affine|Cambio lineal|1次変換|线性变换', R`E[aX + b] = aE[X] + b, \qquad \operatorname{Var}(aX + b) = a^2\operatorname{Var}X`],
        ['Sums|Sommes|Sumas|和|和', R`E[X + Y] = E[X] + E[Y]`, R`Always. For independent variables also $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$.|Toujours. Pour des variables indépendantes aussi $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$.|Siempre. Si son independientes también $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$.|常に成り立つ。独立なら $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$ も成立。|总成立；独立时还有 $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$。`],
        ['One fair die|Un dé équilibré|Un dado equilibrado|公正なさいころ1個|一枚均匀骰子', R`E = 3.5, \qquad \operatorname{Var} = \frac{35}{12}`]
      ] },
      { t: 'Distributions|Lois usuelles|Distribuciones|代表的な分布|常见分布', items: [
        ['Binomial B(n, p)|Binomiale B(n, p)|Binomial B(n, p)|二項分布 B(n, p)|二项分布 B(n, p)', R`P(X = k) = \binom nk p^k(1 - p)^{n-k}, \qquad E = np, \quad \operatorname{Var} = np(1 - p)`],
        ['Geometric|Géométrique|Geométrica|幾何分布|几何分布', R`P(X = k) = (1 - p)^{k-1}p, \qquad E = \frac1p`, 'Number of trials until the first success: on average 6 rolls to get a six.|Nombre d’essais jusqu’au premier succès : en moyenne 6 lancers pour obtenir un six.|Número de intentos hasta el primer éxito: de media 6 tiradas para sacar un seis.|最初の成功までの試行回数。6 が出るまで平均 6 回。|首次成功所需次数：平均掷 6 次得到一个六。'],
        ['Uniform on {1, …, n}|Uniforme sur {1, …, n}|Uniforme en {1, …, n}|{1, …, n} 上の一様分布|{1, …, n} 上的均匀分布', R`P(X = k) = \frac1n, \qquad E = \frac{n + 1}{2}`],
        ['Normal N(μ, σ²)|Normale N(μ, σ²)|Normal N(μ, σ²)|正規分布 N(μ, σ²)|正态分布 N(μ, σ²)', R`Z = \frac{X - \mu}{\sigma} \sim N(0, 1)`, R`About $68\%$, $95\%$, $99.7\%$ within $1\sigma$, $2\sigma$, $3\sigma$.|Environ $68\%$, $95\%$, $99{,}7\%$ à moins de $1\sigma$, $2\sigma$, $3\sigma$.|Aproximadamente $68\%$, $95\%$, $99{,}7\%$ a menos de $1\sigma$, $2\sigma$, $3\sigma$.|$1\sigma$、$2\sigma$、$3\sigma$ 以内に約 $68\%$、$95\%$、$99.7\%$。|约 $68\%$、$95\%$、$99.7\%$ 落在 $1\sigma$、$2\sigma$、$3\sigma$ 内。`],
        ['Poisson|Poisson|Poisson|ポアソン分布|泊松分布', R`P(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}, \qquad E = \operatorname{Var} = \lambda`]
      ] },
      { t: 'Classic facts|Résultats classiques|Resultados clásicos|よく使う事実|常用结论', items: [
        ['Two dice|Deux dés|Dos dados|さいころ2個|两枚骰子', R`P(\Sigma = 7) = \frac{6}{36} = \frac16`, R`Sum $s$ ($2 \le s \le 12$) happens in $6 - \lvert s - 7\rvert$ ways.|La somme $s$ ($2 \le s \le 12$) s’obtient de $6 - \lvert s - 7\rvert$ façons.|La suma $s$ ($2 \le s \le 12$) se obtiene de $6 - \lvert s - 7\rvert$ formas.|和 $s$（$2 \le s \le 12$）は $6 - \lvert s - 7\rvert$ 通り。|和为 $s$（$2 \le s \le 12$）有 $6 - \lvert s - 7\rvert$ 种。`],
        ['Birthday problem|Paradoxe des anniversaires|Problema del cumpleaños|誕生日問題|生日问题', R`1 - \frac{365\cdot364\cdots(365 - n + 1)}{365^n}`, 'Probability that two of n people share a birthday: over 50% from n = 23.|Probabilité que deux des n personnes partagent leur anniversaire : plus de 50 % dès n = 23.|Probabilidad de que dos de n personas cumplan el mismo día: más del 50 % desde n = 23.|n 人のうち誕生日が同じ2人がいる確率。n = 23 で 50% を超えます。|n 人中有两人同一天生日的概率：n = 23 时超过 50%。'],
        ['Drawing without replacement|Tirage sans remise|Extracción sin reemplazo|非復元抽出|不放回抽取', R`P = \frac{\binom{K}{k}\binom{N - K}{n - k}}{\binom Nn}`, R`$k$ special items among $n$ drawn from $N$, of which $K$ are special (hypergeometric).|$k$ objets spéciaux parmi $n$ tirés sur $N$, dont $K$ spéciaux (hypergéométrique).|$k$ objetos especiales entre $n$ extraídos de $N$, con $K$ especiales (hipergeométrica).|$K$ 個の当たりを含む $N$ 個から $n$ 個引いて当たりが $k$ 個（超幾何分布）。|从含 $K$ 个特殊品的 $N$ 个中取 $n$ 个，恰有 $k$ 个特殊（超几何分布）。`]
      ] }
    ]
  });
})();
