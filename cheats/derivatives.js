/* cheat sheet · derivatives — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'derivatives', icon: 'f′', color: '#c4542f', bg: '#fbe8e1', cat: 'calculus',
    name: 'Derivatives|Dérivées|Derivadas|微分|导数',
    blurb: 'Rules, a table of derivatives, implicit differentiation, graph sketching and optimisation.|Règles, table des dérivées, dérivation implicite, étude de fonctions et optimisation.|Reglas, tabla de derivadas, derivación implícita, estudio de funciones y optimización.|微分法則、導関数の表、陰関数微分、グラフの概形、最大・最小。|求导法则、导数表、隐函数求导、函数图像分析与最优化。',
    sections: [
      { t: 'Table of derivatives|Table des dérivées|Tabla de derivadas|導関数の表|导数表', wide: true, items: [
        { cls: 'big', k: 'table derivatives power root exponential logarithm chain rule dérivées derivadas 導関数 导数表 幂 指数 对数', tbl: [[R`f(x)`, R`f'(x)`, R`\big(f(u)\big)'`],
          [R`c`, R`0`, R`0`],
          [R`x^n`, R`n\,x^{n-1}`, R`n\,u^{n-1}\,u'`],
          [R`\sqrt x`, R`\frac{1}{2\sqrt x}`, R`\frac{u'}{2\sqrt u}`],
          [R`\sqrt[n]{x}`, R`\frac{1}{n\sqrt[n]{x^{n-1}}}`, R`\frac{u'}{n\sqrt[n]{u^{n-1}}}`],
          [R`\frac1x`, R`-\frac{1}{x^2}`, R`-\frac{u'}{u^2}`],
          [R`e^x`, R`e^x`, R`e^u\,u'`],
          [R`a^x`, R`a^x\ln a`, R`a^u\ln a\cdot u'`],
          [R`\ln x`, R`\frac1x`, R`\frac{u'}{u}`],
          [R`\log_a x`, R`\frac{1}{x\ln a}`, R`\frac{u'}{u\ln a}`],
          [R`\sinh x`, R`\cosh x`, R`\cosh u\cdot u'`],
          [R`\cosh x`, R`\sinh x`, R`\sinh u\cdot u'`]] },
        { cls: 'big', k: 'table derivatives trigonometric inverse sin cos tan cot sec csc arcsin arccos arctan dérivées derivadas 三角 逆三角 导数表', tbl: [[R`f(x)`, R`f'(x)`, R`\big(f(u)\big)'`],
          [R`\sin x`, R`\cos x`, R`\cos u\cdot u'`],
          [R`\cos x`, R`-\sin x`, R`-\sin u\cdot u'`],
          [R`\tan x`, R`\frac{1}{\cos^2 x} = 1 + \tan^2 x`, R`\frac{u'}{\cos^2 u}`],
          [R`\cot x`, R`-\frac{1}{\sin^2 x}`, R`-\frac{u'}{\sin^2 u}`],
          [R`\sec x`, R`\sec x\tan x`, R`\sec u\tan u\cdot u'`],
          [R`\csc x`, R`-\csc x\cot x`, R`-\csc u\cot u\cdot u'`],
          [R`\arcsin x`, R`\frac{1}{\sqrt{1 - x^2}}`, R`\frac{u'}{\sqrt{1 - u^2}}`],
          [R`\arccos x`, R`-\frac{1}{\sqrt{1 - x^2}}`, R`-\frac{u'}{\sqrt{1 - u^2}}`],
          [R`\arctan x`, R`\frac{1}{1 + x^2}`, R`\frac{u'}{1 + u^2}`],
          [R`\operatorname{arccot} x`, R`-\frac{1}{1 + x^2}`, R`-\frac{u'}{1 + u^2}`]] },
        ['The chain-rule column|La colonne de la dérivée composée|La columna de la regla de la cadena|合成関数の列|链式法则一列', R`u = u(x), \qquad u' = \frac{du}{dx}`, R`Example: $\left(\sin x^2\right)' = \cos x^2\cdot 2x$, $\left(e^{3x}\right)' = 3e^{3x}$.|Exemple : $\left(\sin x^2\right)' = \cos x^2\cdot 2x$, $\left(e^{3x}\right)' = 3e^{3x}$.|Ejemplo: $\left(\sin x^2\right)' = \cos x^2\cdot 2x$, $\left(e^{3x}\right)' = 3e^{3x}$.|例：$\left(\sin x^2\right)' = \cos x^2\cdot 2x$、$\left(e^{3x}\right)' = 3e^{3x}$。|例：$\left(\sin x^2\right)' = \cos x^2\cdot 2x$，$\left(e^{3x}\right)' = 3e^{3x}$。`],
        ['Variable base and exponent|Base et exposant variables|Base y exponente variables|底と指数が変数|幂指函数', R`\left(u^v\right)' = u^v\left(v'\ln u + \frac{v\,u'}{u}\right), \qquad \left(x^x\right)' = x^x(\ln x + 1)`]
      ] },
      { t: 'Definition and tangent|Définition et tangente|Definición y tangente|定義と接線|定义与切线', fig: 'tangent', items: [
        ['Definition|Définition|Definición|定義|定义', R`f'(a) = \lim_{h\to0}\frac{f(a + h) - f(a)}{h}`],
        ['Tangent line|Tangente|Recta tangente|接線|切线', R`y = f(a) + f'(a)(x - a)`],
        ['Normal line|Normale|Recta normal|法線|法线', R`y = f(a) - \frac{1}{f'(a)}(x - a)`],
        ['Linear approximation|Approximation affine|Aproximación lineal|1次近似|线性近似', R`f(a + h) \approx f(a) + f'(a)\,h`]
      ] },
      { t: 'Rules|Règles|Reglas|微分法則|求导法则', items: [
        ['Power and constant|Puissance et constante|Potencia y constante|累乗と定数|幂与常数', R`(x^n)' = n x^{n-1}, \qquad (c)' = 0, \qquad (cf)' = cf'`],
        ['Sum|Somme|Suma|和|和', R`(f \pm g)' = f' \pm g'`],
        ['Product rule|Dérivée d’un produit|Regla del producto|積の微分|乘积法则', R`(fg)' = f'g + fg'`],
        ['Quotient rule|Dérivée d’un quotient|Regla del cociente|商の微分|商的法则', R`\left(\frac fg\right)' = \frac{f'g - fg'}{g^2}`],
        ['Chain rule|Dérivée d’une composée|Regla de la cadena|合成関数の微分|链式法则', R`\big(f(g(x))\big)' = f'(g(x))\cdot g'(x), \qquad \frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}`],
        ['Inverse function|Fonction réciproque|Función inversa|逆関数の微分|反函数求导', R`\left(f^{-1}\right)'(y) = \frac{1}{f'(x)}, \qquad y = f(x)`]
      ] },
      { t: 'Implicit, parametric, related rates|Implicite, paramétrique, vitesses liées|Implícita, paramétrica, tasas relacionadas|陰関数・媒介変数・関連変化率|隐函数、参数方程与相关变化率', items: [
        ['Implicit differentiation|Dérivation implicite|Derivación implícita|陰関数の微分|隐函数求导', R`F(x, y) = 0 \ \Rightarrow\ \frac{dy}{dx} = -\frac{F_x}{F_y}`, R`Or differentiate both sides, remembering $\tfrac{d}{dx}y^2 = 2y\,y'$.|Ou dériver les deux membres, avec $\tfrac{d}{dx}y^2 = 2y\,y'$.|O derivar ambos lados, recordando $\tfrac{d}{dx}y^2 = 2y\,y'$.|または両辺を微分：$\tfrac{d}{dx}y^2 = 2y\,y'$。|或两边求导，注意 $\tfrac{d}{dx}y^2 = 2y\,y'$。`],
        ['Parametric curves|Courbes paramétrées|Curvas paramétricas|媒介変数表示|参数方程', R`\frac{dy}{dx} = \frac{dy/dt}{dx/dt}`],
        ['Related rates|Vitesses liées|Tasas relacionadas|関連変化率|相关变化率', R`\frac{dA}{dt} = \frac{dA}{dr}\cdot\frac{dr}{dt}`, R`Circle: $\tfrac{dA}{dt} = 2\pi r\,\tfrac{dr}{dt}$; sphere: $\tfrac{dV}{dt} = 4\pi r^2\tfrac{dr}{dt}$.|Cercle : $\tfrac{dA}{dt} = 2\pi r\,\tfrac{dr}{dt}$ ; sphère : $\tfrac{dV}{dt} = 4\pi r^2\tfrac{dr}{dt}$.|Círculo: $\tfrac{dA}{dt} = 2\pi r\,\tfrac{dr}{dt}$; esfera: $\tfrac{dV}{dt} = 4\pi r^2\tfrac{dr}{dt}$.|円：$\tfrac{dA}{dt} = 2\pi r\,\tfrac{dr}{dt}$、球：$\tfrac{dV}{dt} = 4\pi r^2\tfrac{dr}{dt}$。|圆：$\tfrac{dA}{dt} = 2\pi r\,\tfrac{dr}{dt}$；球：$\tfrac{dV}{dt} = 4\pi r^2\tfrac{dr}{dt}$。`],
        ['Logarithmic differentiation|Dérivée logarithmique|Derivación logarítmica|対数微分法|对数求导法', R`(\ln y)' = \frac{y'}{y}`, R`Handy for $x^x$: $(x^x)' = x^x(\ln x + 1)$.|Pratique pour $x^x$ : $(x^x)' = x^x(\ln x + 1)$.|Útil para $x^x$: $(x^x)' = x^x(\ln x + 1)$.|$x^x$ に便利：$(x^x)' = x^x(\ln x + 1)$。|适用于 $x^x$：$(x^x)' = x^x(\ln x + 1)$。`]
      ] },
      { t: 'Shape of a graph|Allure d’une courbe|Forma de una gráfica|グラフの形|函数图像的形状', fig: 'extrema', items: [
        ['Monotonicity|Monotonie|Monotonía|増減|单调性', R`f' > 0 \Rightarrow f \nearrow, \qquad f' < 0 \Rightarrow f \searrow`],
        ['Critical points|Points critiques|Puntos críticos|臨界点|临界点', R`f'(c) = 0 \ \lor\ \nexists f'(c)`],
        ['Second derivative test|Test de la dérivée seconde|Criterio de la segunda derivada|2階導関数による判定|二阶导数判别法', R`f'(c) = 0:\quad f''(c) < 0 \Rightarrow \max, \qquad f''(c) > 0 \Rightarrow \min`],
        ['Concavity|Convexité|Concavidad|凹凸|凹凸性', R`f'' > 0 \Rightarrow \cup, \qquad f'' < 0 \Rightarrow \cap`],
        ['Inflection point|Point d’inflexion|Punto de inflexión|変曲点|拐点', R`f''(c) = 0, \qquad f''(c^-)\cdot f''(c^+) < 0`],
        ['Global extrema on [a, b]|Extrema globaux sur [a, b]|Extremos absolutos en [a, b]|[a, b] での最大・最小|[a, b] 上的最值', R`\max/\min \in \{f(a),\ f(b),\ f(c_i)\}`, 'Compare the values at the endpoints and at the critical points.|Comparer les valeurs aux bornes et aux points critiques.|Comparar los valores en los extremos y en los puntos críticos.|端点と臨界点での値を比べます。|比较端点与临界点处的函数值。']
      ] },
      { t: 'Theorems|Théorèmes|Teoremas|定理|定理', items: [
        ['Rolle|Rolle|Rolle|ロルの定理|罗尔定理', R`f(a) = f(b) \ \Rightarrow\ \exists\,c \in (a, b):\ f'(c) = 0`],
        ['Mean value theorem|Accroissements finis|Teorema del valor medio|平均値の定理|拉格朗日中值定理', R`\exists\,c \in (a, b):\ f'(c) = \frac{f(b) - f(a)}{b - a}`, 'Some tangent is parallel to the chord.|Une tangente est parallèle à la corde.|Alguna tangente es paralela a la cuerda.|弦に平行な接線が存在します。|存在与弦平行的切线。'],
        ['Newton’s method|Méthode de Newton|Método de Newton|ニュートン法|牛顿法', R`x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}`]
      ] },
      { t: 'Optimisation|Optimisation|Optimización|最適化|最优化', items: [
        ['Method|Méthode|Método|手順|步骤', R`f(x) \ \to\ f'(x) = 0 \ \to\ f''(x)`, 'Write the quantity in one variable using the constraint, set the derivative to 0, check it is a max or min, and check the endpoints.|Exprimer la quantité avec une seule variable grâce à la contrainte, annuler la dérivée, vérifier max ou min, et regarder les bornes.|Expresar la cantidad con una variable usando la restricción, igualar la derivada a 0, comprobar si es máximo o mínimo y revisar los extremos.|条件を使って1変数の式にし、導関数を 0 とおき、最大か最小か確かめ、端点も調べます。|利用约束化为一元函数，令导数为 0，判断极大或极小，并检查端点。'],
        ['AM–GM shortcut|Raccourci par les moyennes|Atajo por las medias|相加相乗平均による近道|均值不等式捷径', R`x + \frac kx \ge 2\sqrt k \quad (x > 0)`, R`Minimum at $x = \sqrt k$.|Minimum en $x = \sqrt k$.|Mínimo en $x = \sqrt k$.|$x = \sqrt k$ で最小。|在 $x = \sqrt k$ 处取最小值。`],
        ['Fixed perimeter|Périmètre fixé|Perímetro fijo|周の長さが一定|周长一定', R`P = 4s \ \Rightarrow\ S_{\max} = s^2`, 'Among rectangles with a given perimeter, the square has the largest area.|Parmi les rectangles de périmètre donné, le carré a la plus grande aire.|Entre los rectángulos de perímetro dado, el cuadrado tiene el área máxima.|周の長さが同じ長方形では正方形の面積が最大。|周长一定的矩形中正方形面积最大。']
      ] }
    ]
  });
})();
