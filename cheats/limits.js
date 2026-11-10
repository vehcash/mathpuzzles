/* cheat sheet · limits and series — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'limits', icon: '→', color: '#b8492a', bg: '#fbe6de', cat: 'calculus',
    name: 'Limits and series|Limites et séries|Límites y series|極限と級数|极限与级数',
    blurb: 'Standard limits, indeterminate forms, asymptotes, convergence tests and Taylor series.|Limites usuelles, formes indéterminées, asymptotes, critères de convergence et séries de Taylor.|Límites notables, indeterminaciones, asíntotas, criterios de convergencia y series de Taylor.|基本的な極限、不定形、漸近線、収束判定、テイラー展開。|重要极限、未定式、渐近线、敛散性判别与泰勒级数。',
    sections: [
      { t: 'Standard limits|Limites usuelles|Límites notables|基本的な極限|重要极限', items: [
        ['Sine|Sinus|Seno|sin|正弦', R`\lim_{x\to0}\frac{\sin x}{x} = 1, \qquad \lim_{x\to0}\frac{\tan x}{x} = 1`],
        ['Cosine|Cosinus|Coseno|cos|余弦', R`\lim_{x\to0}\frac{1 - \cos x}{x^2} = \frac12`],
        ['Exponential and logarithm|Exponentielle et logarithme|Exponencial y logaritmo|指数と対数|指数与对数', R`\lim_{x\to0}\frac{e^x - 1}{x} = 1, \qquad \lim_{x\to0}\frac{\ln(1 + x)}{x} = 1`],
        ['The number e|Le nombre e|El número e|ネイピア数 e|自然常数 e', R`\lim_{n\to\infty}\left(1 + \frac1n\right)^n = e, \qquad \lim_{x\to\infty}\left(1 + \frac ax\right)^x = e^a`],
        ['Growth rates|Croissances comparées|Órdenes de crecimiento|増加の速さの比較|增长速度比较', R`\lim_{x\to\infty}\frac{x^k}{e^x} = 0, \qquad \lim_{x\to\infty}\frac{\ln x}{x^k} = 0 \quad (k > 0)`, R`$\ln x \ll x^k \ll a^x \ll x! \ll x^x$.|$\ln x \ll x^k \ll a^x \ll x! \ll x^x$.|$\ln x \ll x^k \ll a^x \ll x! \ll x^x$.|$\ln x \ll x^k \ll a^x \ll x! \ll x^x$。|$\ln x \ll x^k \ll a^x \ll x! \ll x^x$。`],
        ['Powers|Puissances|Potencias|累乗|幂', R`\lim_{x\to0}\frac{(1 + x)^a - 1}{x} = a, \qquad \lim_{n\to\infty}\sqrt[n]{n} = 1`]
      ] },
      { t: 'Indeterminate forms|Formes indéterminées|Indeterminaciones|不定形|未定式', items: [
        ['L’Hôpital’s rule|Règle de L’Hôpital|Regla de L’Hôpital|ロピタルの定理|洛必达法则', R`\lim\frac{f}{g} = \lim\frac{f'}{g'}`, R`For $\tfrac00$ or $\tfrac\infty\infty$, when the right side exists.|Pour $\tfrac00$ ou $\tfrac\infty\infty$, si la limite de droite existe.|Para $\tfrac00$ o $\tfrac\infty\infty$, si existe el límite de la derecha.|$\tfrac00$ か $\tfrac\infty\infty$ で、右辺の極限が存在するとき。|适用于 $\tfrac00$ 或 $\tfrac\infty\infty$，且右边极限存在。`],
        ['Rational functions at ∞|Fonctions rationnelles en ∞|Funciones racionales en ∞|有理関数の ∞ での極限|有理函数在 ∞ 处', R`\lim_{x\to\infty}\frac{a_nx^n + \dots}{b_mx^m + \dots} = \begin{cases}0 & n < m\\ \frac{a_n}{b_m} & n = m\\ \pm\infty & n > m\end{cases}`],
        ['Conjugate trick|Quantité conjuguée|Multiplicar por el conjugado|有理化|分子有理化', R`\sqrt a - \sqrt b = \frac{a - b}{\sqrt a + \sqrt b}`, R`Turns $\infty - \infty$ into a quotient, e.g. $\sqrt{n^2 + n} - n \to \tfrac12$.|Transforme $\infty - \infty$ en quotient, ex. $\sqrt{n^2 + n} - n \to \tfrac12$.|Convierte $\infty - \infty$ en un cociente, p. ej. $\sqrt{n^2 + n} - n \to \tfrac12$.|$\infty - \infty$ を商に変えます。例：$\sqrt{n^2 + n} - n \to \tfrac12$。|把 $\infty - \infty$ 化为商，如 $\sqrt{n^2 + n} - n \to \tfrac12$。`],
        ['Form 1^∞|Forme 1^∞|Forma 1^∞|1^∞ 型|1^∞ 型', R`\lim f^{\,g} = e^{\lim g\,(f - 1)}`, R`When $f \to 1$ and $g \to \infty$.|Quand $f \to 1$ et $g \to \infty$.|Cuando $f \to 1$ y $g \to \infty$.|$f \to 1$、$g \to \infty$ のとき。|当 $f \to 1$、$g \to \infty$ 时。`],
        ['Squeeze theorem|Théorème des gendarmes|Teorema del sándwich|はさみうちの原理|夹逼定理', R`g \le f \le h,\ \ \lim g = \lim h = L \ \Rightarrow\ \lim f = L`]
      ] },
      { t: 'Continuity and asymptotes|Continuité et asymptotes|Continuidad y asíntotas|連続性と漸近線|连续性与渐近线', items: [
        ['Continuity|Continuité|Continuidad|連続|连续', R`\lim_{x\to a} f(x) = f(a)`],
        ['Intermediate value theorem|Théorème des valeurs intermédiaires|Teorema de Bolzano|中間値の定理|介值定理', R`f(a)\,f(b) < 0 \ \Rightarrow\ \exists\,c \in (a, b):\ f(c) = 0`, R`For $f$ continuous on $[a, b]$.|Pour $f$ continue sur $[a, b]$.|Para $f$ continua en $[a, b]$.|$f$ が $[a, b]$ で連続のとき。|$f$ 在 $[a, b]$ 上连续时。`],
        ['Vertical asymptote|Asymptote verticale|Asíntota vertical|垂直漸近線|垂直渐近线', R`\lim_{x\to a} f(x) = \pm\infty \ \Rightarrow\ x = a`],
        ['Horizontal asymptote|Asymptote horizontale|Asíntota horizontal|水平漸近線|水平渐近线', R`\lim_{x\to\pm\infty} f(x) = L \ \Rightarrow\ y = L`],
        ['Oblique asymptote|Asymptote oblique|Asíntota oblicua|斜めの漸近線|斜渐近线', R`y = mx + b, \qquad m = \lim\frac{f(x)}{x}, \quad b = \lim\left(f(x) - mx\right)`]
      ] },
      { t: 'Series|Séries|Series|級数|级数', items: [
        ['Geometric series|Série géométrique|Serie geométrica|等比級数|等比级数', R`\sum_{n=0}^\infty r^n = \frac{1}{1 - r} \qquad (|r| < 1)`],
        ['p-series|Séries de Riemann|Series p|p 級数|p 级数', R`\sum \frac{1}{n^p} < \infty \iff p > 1`, R`The harmonic series $\sum \tfrac1n$ diverges; $\sum \tfrac{1}{n^2} = \tfrac{\pi^2}{6}$.|La série harmonique $\sum \tfrac1n$ diverge ; $\sum \tfrac{1}{n^2} = \tfrac{\pi^2}{6}$.|La serie armónica $\sum \tfrac1n$ diverge; $\sum \tfrac{1}{n^2} = \tfrac{\pi^2}{6}$.|調和級数 $\sum \tfrac1n$ は発散、$\sum \tfrac{1}{n^2} = \tfrac{\pi^2}{6}$。|调和级数 $\sum \tfrac1n$ 发散；$\sum \tfrac{1}{n^2} = \tfrac{\pi^2}{6}$。`],
        ['Divergence test|Condition nécessaire|Condición necesaria|発散の判定|发散判别', R`\sum a_n \ \checkmark \ \Rightarrow\ a_n \to 0`, R`If the terms do not tend to 0, the series diverges (✓ converges, × diverges).|Si les termes ne tendent pas vers 0, la série diverge (✓ converge, × diverge).|Si los términos no tienden a 0, la serie diverge (✓ converge, × diverge).|項が 0 に近づかなければ発散（✓ 収束、× 発散）。|若项不趋于 0，则级数发散（✓ 收敛，× 发散）。`],
        ['Ratio test|Critère de d’Alembert|Criterio del cociente|ダランベールの判定法|比值判别法', R`L = \lim\left|\frac{a_{n+1}}{a_n}\right|: \quad L < 1 \ \checkmark, \quad L > 1 \ \times`],
        ['Alternating series|Séries alternées|Series alternadas|交代級数|交错级数', R`\sum (-1)^n b_n, \quad b_n \downarrow 0 \ \Rightarrow\ \checkmark`, 'Converges when the terms decrease to 0.|Converge si les termes décroissent vers 0.|Converge si los términos decrecen hacia 0.|項が単調に 0 に近づけば収束。|项单调递减趋于 0 时收敛。']
      ] },
      { t: 'Taylor series|Séries de Taylor|Series de Taylor|テイラー展開|泰勒级数', items: [
        ['Taylor formula|Formule de Taylor|Fórmula de Taylor|テイラーの公式|泰勒公式', R`f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!}(x - a)^n`],
        ['Exponential|Exponentielle|Exponencial|指数関数|指数函数', R`e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots`],
        ['Sine and cosine|Sinus et cosinus|Seno y coseno|sin と cos|正弦与余弦', R`\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots, \qquad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots`],
        ['Logarithm|Logarithme|Logaritmo|対数関数|对数函数', R`\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots \qquad (-1 < x \le 1)`],
        ['Geometric and binomial|Géométrique et binomiale|Geométrica y binomial|等比と二項|几何与二项', R`\frac{1}{1 - x} = 1 + x + x^2 + \dots, \qquad (1 + x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha - 1)}{2}x^2 + \dots`],
        ['Arctangent|Arctangente|Arcotangente|arctan|反正切', R`\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \dots`]
      ] }
    ]
  });
})();
