/* cheat sheet · functions and graphs — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'functions', icon: 'ƒ', color: '#2b7a8c', bg: '#dff0f4', cat: 'algebra',
    name: 'Functions and graphs|Fonctions et graphes|Funciones y gráficas|関数とグラフ|函数与图像',
    blurb: 'Domain and range, composition and inverses, symmetry, transformations and the graphs of the basic functions.|Domaine et image, composition et réciproque, symétries, transformations et graphes des fonctions de référence.|Dominio y recorrido, composición e inversa, simetrías, transformaciones y gráficas de las funciones elementales.|定義域と値域、合成関数と逆関数、対称性、グラフの移動、基本関数のグラフ。|定义域与值域、复合函数与反函数、奇偶性、图像变换与基本初等函数的图像。',
    sections: [
      { t: 'Domain and range|Domaine et image|Dominio y recorrido|定義域と値域|定义域与值域', items: [
        ['Fractions|Fractions|Fracciones|分数|分式', R`\frac{p(x)}{q(x)}:\ \ q(x) \ne 0`],
        ['Even roots|Racines paires|Raíces de índice par|偶数乗根|偶次根式', R`\sqrt[2k]{g(x)}:\ \ g(x) \ge 0`],
        ['Logarithms|Logarithmes|Logaritmos|対数|对数', R`\log_a g(x):\ \ g(x) > 0`],
        ['tan and the inverse functions|tan et fonctions réciproques|tan y funciones inversas|tan と逆三角関数|tan 与反三角函数', R`\tan x:\ x \ne \tfrac\pi2 + k\pi, \qquad \arcsin x, \arccos x:\ \ |x| \le 1`],
        ['Ranges to remember|Images à retenir|Recorridos que conviene saber|覚えておく値域|常用值域', R`e^x > 0, \qquad x^2 \ge 0, \qquad -1 \le \sin x, \cos x \le 1, \qquad x + \tfrac1x \ge 2 \ (x > 0)`],
        ['Range by solving for x|Image en résolvant en x|Recorrido despejando x|x について解いて値域を求める|反解求值域', R`y = f(x) \ \Rightarrow\ x = g(y), \quad f(D) = \operatorname{Dom} g`, 'Solve for x and see which values of y are allowed.|Résoudre en x et voir quelles valeurs de y sont permises.|Despejar x y ver qué valores de y son posibles.|x について解き、どの y が可能か調べます。|反解出 x，看哪些 y 可取。']
      ] },
      { t: 'Composition and inverse|Composition et réciproque|Composición e inversa|合成関数と逆関数|复合函数与反函数', items: [
        ['Composition|Composition|Composición|合成|复合', R`(f \circ g)(x) = f\big(g(x)\big), \qquad f \circ g \ne g \circ f`],
        ['Inverse function|Fonction réciproque|Función inversa|逆関数|反函数', R`y = f(x) \iff x = f^{-1}(y), \qquad f\big(f^{-1}(x)\big) = x`, 'Swap x and y and solve for y. It exists when f is one-to-one (strictly monotonic).|Échanger x et y puis résoudre en y. Elle existe si f est injective (strictement monotone).|Intercambiar x e y y despejar y. Existe si f es inyectiva (estrictamente monótona).|x と y を入れ替えて y について解く。f が1対1（狭義単調）なら存在。|互换 x、y 再解出 y。f 为一一对应（严格单调）时存在。'],
        ['Graph of the inverse|Graphe de la réciproque|Gráfica de la inversa|逆関数のグラフ|反函数的图像', R`(a, b) \in f \iff (b, a) \in f^{-1}`, R`Mirror image in the line $y = x$.|Symétrique par rapport à la droite $y = x$.|Simétrica respecto de la recta $y = x$.|直線 $y = x$ について対称。|关于直线 $y = x$ 对称。`],
        ['Domain swaps with range|Domaine et image s’échangent|Dominio y recorrido se intercambian|定義域と値域が入れ替わる|定义域与值域互换', R`\operatorname{Dom} f^{-1} = f(D), \qquad f^{-1}(f(D)) = D`]
      ] },
      { t: 'Symmetry, periodicity, monotonicity|Parité, périodicité, monotonie|Simetría, periodicidad, monotonía|対称性・周期性・単調性|奇偶性、周期性、单调性', items: [
        ['Even function|Fonction paire|Función par|偶関数|偶函数', R`f(-x) = f(x)`, R`Symmetric about the $y$-axis: $x^2$, $\cos x$, $\lvert x\rvert$.|Symétrique par rapport à l’axe des $y$ : $x^2$, $\cos x$, $\lvert x\rvert$.|Simétrica respecto al eje $y$: $x^2$, $\cos x$, $\lvert x\rvert$.|$y$ 軸に関して対称：$x^2$、$\cos x$、$\lvert x\rvert$。|关于 $y$ 轴对称：$x^2$、$\cos x$、$\lvert x\rvert$。`],
        ['Odd function|Fonction impaire|Función impar|奇関数|奇函数', R`f(-x) = -f(x)`, R`Symmetric about the origin: $x^3$, $\sin x$, $\tfrac1x$. If $0$ is in the domain, $f(0) = 0$.|Symétrique par rapport à l’origine : $x^3$, $\sin x$, $\tfrac1x$. Si $0$ est dans le domaine, $f(0) = 0$.|Simétrica respecto al origen: $x^3$, $\sin x$, $\tfrac1x$. Si $0$ está en el dominio, $f(0) = 0$.|原点に関して対称：$x^3$、$\sin x$、$\tfrac1x$。$0$ が定義域にあれば $f(0) = 0$。|关于原点对称：$x^3$、$\sin x$、$\tfrac1x$。若 $0$ 在定义域内，则 $f(0) = 0$。`],
        ['Period|Période|Período|周期|周期', R`f(x + T) = f(x), \qquad f(\omega x):\ \ \frac{T}{|\omega|}`],
        ['Symmetry about a line|Symétrie par rapport à une droite|Simetría respecto a una recta|直線に関する対称|关于直线对称', R`f(a + x) = f(a - x) \iff x = a`, R`And $f(a + x) + f(a - x) = 2b$ means symmetry about the point $(a, b)$.|Et $f(a + x) + f(a - x) = 2b$ signifie une symétrie par rapport au point $(a, b)$.|Y $f(a + x) + f(a - x) = 2b$ significa simetría respecto al punto $(a, b)$.|$f(a + x) + f(a - x) = 2b$ なら点 $(a, b)$ に関して対称。|$f(a + x) + f(a - x) = 2b$ 则关于点 $(a, b)$ 对称。`],
        ['Monotonic|Monotone|Monótona|単調|单调', R`x_1 < x_2 \Rightarrow f(x_1) < f(x_2) \quad (\nearrow)`, R`A strictly monotonic function is one-to-one, so equations $f(x) = c$ have at most one solution.|Une fonction strictement monotone est injective : $f(x) = c$ a au plus une solution.|Una función estrictamente monótona es inyectiva: $f(x) = c$ tiene a lo sumo una solución.|狭義単調なら1対1で、$f(x) = c$ の解は高々1つ。|严格单调函数是一一对应的，$f(x) = c$ 至多一个解。`]
      ] },
      { t: 'Transformations of graphs|Transformations de graphes|Transformaciones de gráficas|グラフの移動と変形|图像变换', fig: 'transform', items: [
        { tbl: [
          ['~Formula|Formule|Fórmula|式|式子', '~Effect on y = f(x)|Effet sur y = f(x)|Efecto sobre y = f(x)|y = f(x) のグラフへの効果|对 y = f(x) 图像的作用'],
          ['f(x) + k', '~up by k|vers le haut de k|k hacia arriba|上へ k|向上平移 k'],
          ['f(x - h)', '~right by h|vers la droite de h|h a la derecha|右へ h|向右平移 h'],
          ['a\\,f(x)', '~vertical stretch × a|dilatation verticale × a|dilatación vertical × a|縦に a 倍|纵向伸缩 a 倍'],
          ['f(bx)', '~horizontal squeeze ÷ b|contraction horizontale ÷ b|compresión horizontal ÷ b|横に 1/b 倍|横向伸缩为 1/b'],
          ['-f(x)', '~mirror in the x-axis|symétrie / axe des x|simetría respecto al eje x|x 軸に関して対称|关于 x 轴对称'],
          ['f(-x)', '~mirror in the y-axis|symétrie / axe des y|simetría respecto al eje y|y 軸に関して対称|关于 y 轴对称'],
          ['|f(x)|', '~flip the parts below the x-axis up|on replie vers le haut ce qui est sous l’axe|se reflejan hacia arriba las partes bajo el eje|x 軸より下の部分を上に折り返す|x 轴下方部分翻折到上方'],
          ['f(|x|)', '~keep x ≥ 0 and mirror it to the left|on garde x ≥ 0 et on le recopie à gauche|se conserva x ≥ 0 y se refleja a la izquierda|x ≥ 0 の部分を残し左に折り返す|保留 x ≥ 0 部分并对称到左边']
        ], cls: 'left', k: 'transformations shift stretch reflect translation graphe gráfica 平行移動 平移 伸缩 对称 absolute' },
        ['Order of operations|Ordre des opérations|Orden de las operaciones|変形の順序|变换顺序', R`y = a\,f\big(b(x - h)\big) + k`, R`From $f$: squeeze by $b$, shift by $h$, stretch by $a$, shift by $k$.|À partir de $f$ : contracter de $b$, translater de $h$, dilater de $a$, translater de $k$.|A partir de $f$: comprimir por $b$, trasladar $h$, dilatar por $a$, trasladar $k$.|$f$ から：横に $b$ で縮め、$h$ 平行移動、縦に $a$ 倍、$k$ 平行移動。|从 $f$ 出发：横向缩 $b$，平移 $h$，纵向伸 $a$，平移 $k$。`]
      ] },
      { t: 'Basic graphs|Graphes de référence|Gráficas elementales|基本的なグラフ|基本函数图像', fig: 'explog', items: [
        ['Linear and quadratic|Affine et du second degré|Lineal y cuadrática|1次関数と2次関数|一次函数与二次函数', R`y = mx + b, \qquad y = a(x - h)^2 + k`, R`Parabola opens up when $a > 0$; vertex $(h, k)$; axis $x = h$.|Parabole tournée vers le haut si $a > 0$ ; sommet $(h, k)$ ; axe $x = h$.|La parábola abre hacia arriba si $a > 0$; vértice $(h, k)$; eje $x = h$.|$a > 0$ なら下に凸。頂点 $(h, k)$、軸 $x = h$。|$a > 0$ 时开口向上；顶点 $(h, k)$；对称轴 $x = h$。`],
        ['Exponential|Exponentielle|Exponencial|指数関数|指数函数', R`y = a^x:\ \ (0, 1)\ \checkmark, \quad y > 0`, R`Increasing when $a > 1$, decreasing when $0 < a < 1$; asymptote $y = 0$.|Croissante si $a > 1$, décroissante si $0 < a < 1$ ; asymptote $y = 0$.|Creciente si $a > 1$, decreciente si $0 < a < 1$; asíntota $y = 0$.|$a > 1$ で増加、$0 < a < 1$ で減少。漸近線 $y = 0$。|$a > 1$ 时递增，$0 < a < 1$ 时递减；渐近线 $y = 0$。`],
        ['Logarithm|Logarithme|Logaritmo|対数関数|对数函数', R`y = \log_a x:\ \ (1, 0)\ \checkmark, \quad x > 0`, R`Inverse of $a^x$ (mirror in $y = x$); asymptote $x = 0$.|Réciproque de $a^x$ (symétrique par rapport à $y = x$) ; asymptote $x = 0$.|Inversa de $a^x$ (simétrica respecto a $y = x$); asíntota $x = 0$.|$a^x$ の逆関数（$y = x$ に関して対称）。漸近線 $x = 0$。|$a^x$ 的反函数（关于 $y = x$ 对称）；渐近线 $x = 0$。`],
        ['Rational (hyperbola)|Fonction homographique|Función racional (hipérbola)|分数関数|反比例型函数', R`y = \frac{ax + b}{cx + d}:\ \ x = -\frac dc,\ \ y = \frac ac`, 'The two asymptotes; the centre of symmetry is where they meet.|Les deux asymptotes ; le centre de symétrie est leur intersection.|Las dos asíntotas; el centro de simetría es su intersección.|2本の漸近線。その交点が対称の中心。|两条渐近线，其交点为对称中心。'],
        ['Power functions|Fonctions puissances|Funciones potencia|累乗関数|幂函数', R`y = x^n,\ \ y = \sqrt x,\ \ y = \frac1x,\ \ y = |x|`],
        ['Piecewise functions|Fonctions définies par morceaux|Funciones a trozos|区分的に定義された関数|分段函数', R`f(x) = \begin{cases} g(x) & x < a\\ h(x) & x \ge a\end{cases}`, R`Continuous at $a$ when $\lim_{x\to a^-} g = h(a)$; check each piece’s own domain.|Continue en $a$ si $\lim_{x\to a^-} g = h(a)$ ; vérifier le domaine de chaque morceau.|Continua en $a$ si $\lim_{x\to a^-} g = h(a)$; comprobar el dominio de cada trozo.|$\lim_{x\to a^-} g = h(a)$ なら $a$ で連続。各部分の定義域に注意。|若 $\lim_{x\to a^-} g = h(a)$ 则在 $a$ 处连续；注意每段的范围。`]
      ] },
      { t: 'Zeros and intersections|Zéros et intersections|Ceros e intersecciones|零点と交点|零点与交点', items: [
        ['Zeros|Zéros|Ceros|零点|零点', R`f(x) = 0\iff (x, 0)`],
        ['Bolzano|Bolzano|Bolzano|中間値の定理|零点存在定理', R`f(a)\,f(b) < 0 \ \Rightarrow\ \exists\,c \in (a, b):\ f(c) = 0`, 'For f continuous on [a, b]; with f monotonic the zero is unique.|Pour f continue sur [a, b] ; si f est monotone, le zéro est unique.|Para f continua en [a, b]; si f es monótona el cero es único.|f が [a, b] で連続のとき。f が単調なら零点は1つ。|f 在 [a, b] 上连续；若 f 单调则零点唯一。'],
        ['Number of solutions|Nombre de solutions|Número de soluciones|解の個数|解的个数', R`f(x) = g(x)\iff y = f \,\cap\, y = g`, 'Count where the two graphs cross; for f(x) = k move the horizontal line y = k.|Compter les points d’intersection des deux graphes ; pour f(x) = k déplacer la droite y = k.|Contar los cortes de las dos gráficas; para f(x) = k mover la recta y = k.|2つのグラフの交点を数える。f(x) = k なら直線 y = k を動かす。|数两图像交点；对 f(x) = k，平移直线 y = k。']
      ] }
    ]
  });
})();
