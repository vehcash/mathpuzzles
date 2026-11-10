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
      { t: 'Continuous distributions|Lois continues|Distribuciones continuas|連続型の分布|连续型分布', items: [
        ['Density|Densité|Densidad|確率密度関数|概率密度', R`f(x) \ge 0, \qquad \int_{-\infty}^{\infty} f(x)\,dx = 1, \qquad P(a \le X \le b) = \int_a^b f(x)\,dx`],
        ['Distribution function|Fonction de répartition|Función de distribución|分布関数|分布函数', R`F(x) = P(X \le x) = \int_{-\infty}^x f(t)\,dt, \qquad F' = f`],
        ['Expectation and variance|Espérance et variance|Esperanza y varianza|期待値と分散|期望与方差', R`E[X] = \int x f(x)\,dx, \qquad \operatorname{Var}X = \int x^2 f(x)\,dx - E[X]^2`],
        ['Uniform on [a, b]|Uniforme sur [a, b]|Uniforme en [a, b]|[a, b] 上の一様分布|[a, b] 上的均匀分布', R`f = \frac{1}{b - a}, \qquad E = \frac{a + b}{2}, \qquad \operatorname{Var} = \frac{(b - a)^2}{12}`],
        ['Exponential|Exponentielle|Exponencial|指数分布|指数分布', R`f(x) = \lambda e^{-\lambda x}\ (x \ge 0), \qquad P(X > t) = e^{-\lambda t}, \qquad E = \frac1\lambda`]
      ] },
      { t: 'Using the normal distribution|Utiliser la loi normale|Usar la distribución normal|正規分布の使い方|正态分布的应用', items: [
        ['Standardising|Centrer et réduire|Tipificar|標準化|标准化', R`P(a < X < b) = \Phi\left(\frac{b - \mu}{\sigma}\right) - \Phi\left(\frac{a - \mu}{\sigma}\right)`, R`$\Phi$ is the table of $N(0, 1)$: $\Phi(z) = P(Z \le z)$.|$\Phi$ est la table de $N(0, 1)$ : $\Phi(z) = P(Z \le z)$.|$\Phi$ es la tabla de $N(0, 1)$: $\Phi(z) = P(Z \le z)$.|$\Phi$ は $N(0, 1)$ の表：$\Phi(z) = P(Z \le z)$。|$\Phi$ 为 $N(0, 1)$ 的分布表：$\Phi(z) = P(Z \le z)$。`],
        ['Symmetry|Symétrie|Simetría|対称性|对称性', R`\Phi(-z) = 1 - \Phi(z), \qquad P(|Z| \le z) = 2\Phi(z) - 1`],
        ['Key values|Valeurs clés|Valores clave|よく使う値|常用值', R`\Phi(1.645) \approx 0.95, \qquad \Phi(1.96) \approx 0.975, \qquad \Phi(2.576) \approx 0.995`],
        ['Normal approximation to the binomial|Approximation normale de la binomiale|Aproximación normal de la binomial|二項分布の正規近似|二项分布的正态近似', R`B(n, p) \approx N\big(np,\ np(1 - p)\big)`, R`When $np \ge 5$ and $n(1 - p) \ge 5$. Continuity correction: $P(X \le k) \approx \Phi\left(\frac{k + 0.5 - np}{\sqrt{np(1 - p)}}\right)$.|Si $np \ge 5$ et $n(1 - p) \ge 5$. Correction de continuité : $P(X \le k) \approx \Phi\left(\frac{k + 0{,}5 - np}{\sqrt{np(1 - p)}}\right)$.|Si $np \ge 5$ y $n(1 - p) \ge 5$. Corrección por continuidad: $P(X \le k) \approx \Phi\left(\frac{k + 0{,}5 - np}{\sqrt{np(1 - p)}}\right)$.|$np \ge 5$ かつ $n(1 - p) \ge 5$ のとき。連続補正：$P(X \le k) \approx \Phi\left(\frac{k + 0.5 - np}{\sqrt{np(1 - p)}}\right)$。|当 $np \ge 5$ 且 $n(1 - p) \ge 5$ 时。连续性修正：$P(X \le k) \approx \Phi\left(\frac{k + 0.5 - np}{\sqrt{np(1 - p)}}\right)$。`],
        ['Mean of a sample|Moyenne d’un échantillon|Media de una muestra|標本平均|样本均值', R`\bar X \sim N\left(\mu,\ \frac{\sigma^2}{n}\right), \qquad \bar x \pm z_{\alpha/2}\frac{\sigma}{\sqrt n}`, 'The second formula is the confidence interval for μ (z = 1.96 for 95 %).|La seconde formule est l’intervalle de confiance de μ (z = 1,96 pour 95 %).|La segunda fórmula es el intervalo de confianza para μ (z = 1,96 al 95 %).|2つ目は μ の信頼区間（95 % なら z = 1.96）。|第二式为 μ 的置信区间（95% 时 z = 1.96）。']
      ] },
      { t: 'Contingency tables|Tableaux à double entrée|Tablas de contingencia|分割表|列联表', items: [
        { tbl: [['', 'B', R`\bar B`, '~Total|Total|Total|計|合计'], ['A', R`P(A \cap B)`, R`P(A \cap \bar B)`, R`P(A)`], [R`\bar A`, R`P(\bar A \cap B)`, R`P(\bar A \cap \bar B)`, R`P(\bar A)`], ['~Total|Total|Total|計|合计', R`P(B)`, R`P(\bar B)`, '1']], k: 'contingency table two-way double entrée doble entrada 分割表 列联表 joint marginal' },
        ['Reading conditional probabilities|Lire les probabilités conditionnelles|Leer probabilidades condicionadas|条件付き確率の読み取り|读出条件概率', R`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`, 'Inside cell divided by the total of its column (or row, for the other condition).|Case intérieure divisée par le total de sa colonne (ou de sa ligne pour l’autre condition).|Celda interior dividida entre el total de su columna (o fila, para la otra condición).|中のマスを、その列（または行）の合計で割る。|内部格子数除以所在列（或行）的合计。'],
        ['Tree diagrams|Arbres pondérés|Diagramas de árbol|樹形図|树状图', R`P(A \cap B) = P(A)\,P(B \mid A), \qquad P(B) = P(A)P(B \mid A) + P(\bar A)P(B \mid \bar A)`, 'Multiply along a path, add the paths that end in the same event.|Multiplier le long d’un chemin, additionner les chemins menant au même événement.|Multiplicar a lo largo de un camino y sumar los caminos que llevan al mismo suceso.|枝に沿って掛け、同じ事象に至る経路を足す。|沿路径相乘，到达同一事件的路径相加。']
      ] },
      { t: 'Classic facts|Résultats classiques|Resultados clásicos|よく使う事実|常用结论', items: [
        ['Two dice|Deux dés|Dos dados|さいころ2個|两枚骰子', R`P(\Sigma = 7) = \frac{6}{36} = \frac16`, R`Sum $s$ ($2 \le s \le 12$) happens in $6 - \lvert s - 7\rvert$ ways.|La somme $s$ ($2 \le s \le 12$) s’obtient de $6 - \lvert s - 7\rvert$ façons.|La suma $s$ ($2 \le s \le 12$) se obtiene de $6 - \lvert s - 7\rvert$ formas.|和 $s$（$2 \le s \le 12$）は $6 - \lvert s - 7\rvert$ 通り。|和为 $s$（$2 \le s \le 12$）有 $6 - \lvert s - 7\rvert$ 种。`],
        ['Birthday problem|Paradoxe des anniversaires|Problema del cumpleaños|誕生日問題|生日问题', R`1 - \frac{365\cdot364\cdots(365 - n + 1)}{365^n}`, 'Probability that two of n people share a birthday: over 50% from n = 23.|Probabilité que deux des n personnes partagent leur anniversaire : plus de 50 % dès n = 23.|Probabilidad de que dos de n personas cumplan el mismo día: más del 50 % desde n = 23.|n 人のうち誕生日が同じ2人がいる確率。n = 23 で 50% を超えます。|n 人中有两人同一天生日的概率：n = 23 时超过 50%。'],
        ['Drawing without replacement|Tirage sans remise|Extracción sin reemplazo|非復元抽出|不放回抽取', R`P = \frac{\binom{K}{k}\binom{N - K}{n - k}}{\binom Nn}`, R`$k$ special items among $n$ drawn from $N$, of which $K$ are special (hypergeometric).|$k$ objets spéciaux parmi $n$ tirés sur $N$, dont $K$ spéciaux (hypergéométrique).|$k$ objetos especiales entre $n$ extraídos de $N$, con $K$ especiales (hipergeométrica).|$K$ 個の当たりを含む $N$ 個から $n$ 個引いて当たりが $k$ 個（超幾何分布）。|从含 $K$ 个特殊品的 $N$ 个中取 $n$ 个，恰有 $k$ 个特殊（超几何分布）。`]
      ] }
    ]
  });
})();
