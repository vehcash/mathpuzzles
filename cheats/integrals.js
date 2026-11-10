/* cheat sheet · integrals — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'integrals', icon: '∫', color: '#a35a14', bg: '#f8ead9', cat: 'calculus',
    name: 'Integrals|Intégrales|Integrales|積分|积分',
    blurb: 'Antiderivatives, the fundamental theorem, substitution, parts, areas, volumes and improper integrals.|Primitives, théorème fondamental, changement de variable, intégration par parties, aires, volumes et intégrales impropres.|Primitivas, teorema fundamental, sustitución, partes, áreas, volúmenes e integrales impropias.|原始関数、微積分学の基本定理、置換積分、部分積分、面積、体積、広義積分。|原函数、微积分基本定理、换元、分部积分、面积、体积与反常积分。',
    sections: [
      { t: 'Basic antiderivatives|Primitives usuelles|Primitivas inmediatas|基本的な原始関数|基本积分公式', items: [
        ['Powers|Puissances|Potencias|累乗|幂函数', R`\int x^n\,dx = \frac{x^{n+1}}{n + 1} + C \quad (n \ne -1), \qquad \int\frac{dx}{x} = \ln|x| + C`],
        ['Exponentials|Exponentielles|Exponenciales|指数関数|指数函数', R`\int e^x\,dx = e^x + C, \qquad \int a^x\,dx = \frac{a^x}{\ln a} + C`],
        ['Sine and cosine|Sinus et cosinus|Seno y coseno|sin と cos|正弦与余弦', R`\int\sin x\,dx = -\cos x + C, \qquad \int\cos x\,dx = \sin x + C`],
        ['Tangent|Tangente|Tangente|tan|正切', R`\int\frac{dx}{\cos^2 x} = \tan x + C, \qquad \int\tan x\,dx = -\ln|\cos x| + C`],
        ['Inverse trigonometric|Trigonométriques réciproques|Trigonométricas inversas|逆三角関数になるもの|反三角函数型', R`\int\frac{dx}{1 + x^2} = \arctan x + C, \qquad \int\frac{dx}{\sqrt{1 - x^2}} = \arcsin x + C`],
        ['With a parameter|Avec un paramètre|Con un parámetro|定数を含む形|含参数的形式', R`\int\frac{dx}{x^2 + a^2} = \frac1a\arctan\frac xa + C, \qquad \int e^{kx}\,dx = \frac{e^{kx}}{k} + C`],
        ['Logarithmic derivative|Dérivée logarithmique|Derivada logarítmica|f′/f の積分|f′/f 型', R`\int\frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C`],
        ['Logarithm|Logarithme|Logaritmo|対数|对数', R`\int\ln x\,dx = x\ln x - x + C`]
      ] },
      { t: 'The fundamental theorem|Le théorème fondamental|El teorema fundamental|微積分学の基本定理|微积分基本定理', fig: 'area', items: [
        ['Evaluation|Calcul|Regla de Barrow|定積分の計算|牛顿–莱布尼茨公式', R`\int_a^b f(x)\,dx = F(b) - F(a), \qquad F' = f`],
        ['Derivative of an integral|Dérivée d’une intégrale|Derivada de una integral|積分の微分|变上限积分求导', R`\frac{d}{dx}\int_a^x f(t)\,dt = f(x), \qquad \frac{d}{dx}\int_a^{g(x)} f(t)\,dt = f(g(x))\,g'(x)`],
        ['Properties|Propriétés|Propiedades|性質|性质', R`\int_a^b f = -\int_b^a f, \qquad \int_a^b f + \int_b^c f = \int_a^c f`],
        ['Symmetry|Symétrie|Simetría|対称性|对称性', R`f(-x) = -f(x):\ \int_{-a}^a f = 0, \qquad f(-x) = f(x):\ \int_{-a}^a f = 2\int_0^a f`, ['Odd: f(−x) = −f(x); even: f(−x) = f(x).', 'Impaire : f(−x) = −f(x) ; paire : f(−x) = f(x).', 'Impar: f(−x) = −f(x); par: f(−x) = f(x).', '奇関数：f(−x) = −f(x)、偶関数：f(−x) = f(x)。', '奇函数：f(−x) = −f(x)；偶函数：f(−x) = f(x)。'].join('|')]
      ] },
      { t: 'Techniques|Techniques|Técnicas|積分の技法|积分方法', items: [
        ['Substitution|Changement de variable|Sustitución|置換積分|换元积分', R`\int f(g(x))\,g'(x)\,dx = \int f(u)\,du, \qquad u = g(x)`, 'For definite integrals change the limits too.|Pour une intégrale définie, changer aussi les bornes.|En una integral definida, cambiar también los límites.|定積分では積分区間も変えます。|定积分要同时换限。'],
        ['Integration by parts|Intégration par parties|Integración por partes|部分積分|分部积分', R`\int u\,dv = uv - \int v\,du`, 'Choose u in the order Log, Inverse trig, Algebraic, Trig, Exponential (LIATE).|Choisir u dans l’ordre : log, trigonométrique réciproque, algébrique, trigonométrique, exponentielle.|Elegir u en el orden: logaritmo, trigonométrica inversa, algebraica, trigonométrica, exponencial.|u は 対数 → 逆三角 → 多項式 → 三角 → 指数 の順に選びます。|u 的选择顺序：对数、反三角、幂函数、三角、指数。'],
        ['Partial fractions|Fractions partielles|Fracciones simples|部分分数分解|部分分式', R`\frac{1}{(x - a)(x - b)} = \frac{1}{a - b}\left(\frac{1}{x - a} - \frac{1}{x - b}\right)`],
        ['Powers of sine and cosine|Puissances de sinus et cosinus|Potencias de seno y coseno|sin・cos の累乗|正余弦的幂', R`\int\sin^2 x\,dx = \frac x2 - \frac{\sin 2x}{4} + C, \qquad \int\cos^2 x\,dx = \frac x2 + \frac{\sin 2x}{4} + C`],
        ['sin × cos|sin × cos|sen × cos|sin × cos|sin × cos', R`\int_0^{\pi/2}\sin x\cos x\,dx = \frac12, \qquad \int_0^{\pi}\sin x\,dx = 2`]
      ] },
      { t: 'Applications|Applications|Aplicaciones|応用|应用', items: [
        ['Area between curves|Aire entre deux courbes|Área entre curvas|2曲線間の面積|两曲线间面积', R`S = \int_a^b\left(f(x) - g(x)\right)dx \qquad (f \ge g)`],
        ['Average value|Valeur moyenne|Valor medio|平均値|平均值', R`\bar f = \frac{1}{b - a}\int_a^b f(x)\,dx`],
        ['Volume by discs|Volume par disques|Volumen por discos|円板法による体積|圆盘法体积', R`V = \pi\int_a^b f(x)^2\,dx`, 'Rotation about the x-axis.|Rotation autour de l’axe des x.|Giro alrededor del eje x.|x 軸のまわりの回転。|绕 x 轴旋转。'],
        ['Volume by shells|Volume par coquilles|Volumen por capas|殻の方法|柱壳法', R`V = 2\pi\int_a^b x\,f(x)\,dx`, 'Rotation about the y-axis.|Rotation autour de l’axe des y.|Giro alrededor del eje y.|y 軸のまわりの回転。|绕 y 轴旋转。'],
        ['Arc length|Longueur d’arc|Longitud de arco|曲線の長さ|弧长', R`L = \int_a^b\sqrt{1 + f'(x)^2}\,dx`],
        ['Riemann sums|Sommes de Riemann|Sumas de Riemann|区分求積法|黎曼和', R`\lim_{n\to\infty}\frac1n\sum_{k=1}^n f\!\left(\frac kn\right) = \int_0^1 f(x)\,dx`]
      ] },
      { t: 'Improper integrals|Intégrales impropres|Integrales impropias|広義積分|反常积分', items: [
        ['Infinite interval|Intervalle infini|Intervalo infinito|無限区間|无穷区间', R`\int_1^\infty\frac{dx}{x^p} = \frac{1}{p - 1} \quad (p > 1)`, R`Diverges for $p \le 1$.|Diverge pour $p \le 1$.|Diverge para $p \le 1$.|$p \le 1$ では発散。|$p \le 1$ 时发散。`],
        ['Singularity at 0|Singularité en 0|Singularidad en 0|0 での特異点|0 处的瑕点', R`\int_0^1\frac{dx}{x^p} = \frac{1}{1 - p} \quad (p < 1)`],
        ['Exponential|Exponentielle|Exponencial|指数関数|指数函数', R`\int_0^\infty e^{-kx}\,dx = \frac1k, \qquad \int_0^\infty x^n e^{-x}\,dx = n!`],
        ['Gaussian integral|Intégrale de Gauss|Integral de Gauss|ガウス積分|高斯积分', R`\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt\pi`]
      ] },
      { t: 'Differential equations|Équations différentielles|Ecuaciones diferenciales|微分方程式|微分方程', items: [
        ['Exponential growth|Croissance exponentielle|Crecimiento exponencial|指数的な増加|指数增长', R`y' = ky \ \Rightarrow\ y = Ce^{kx}`],
        ['Separable equations|Variables séparables|Variables separables|変数分離形|可分离变量', R`\frac{dy}{dx} = f(x)g(y) \ \Rightarrow\ \int\frac{dy}{g(y)} = \int f(x)\,dx`],
        ['Linear first order|Linéaire du premier ordre|Lineal de primer orden|1階線形|一阶线性', R`y' + p(x)y = q(x), \qquad \mu = e^{\int p\,dx}, \quad (\mu y)' = \mu q`]
      ] }
    ]
  });
})();
