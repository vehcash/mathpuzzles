/* cheat sheet · algebra — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'algebra', icon: 'x²', color: '#2e8a57', bg: '#e3f3e8', cat: 'algebra',
    name: 'Algebra|Algèbre|Álgebra|代数|代数',
    blurb: 'Powers, logarithms, identities, quadratics, inequalities and sums.|Puissances, logarithmes, identités, équations du second degré, inégalités et sommes.|Potencias, logaritmos, identidades, ecuaciones de segundo grado, desigualdades y sumas.|累乗、対数、恒等式、2次方程式、不等式、和の公式。|幂、对数、恒等式、二次方程、不等式与求和。',
    sections: [
      { t: 'Powers and roots|Puissances et racines|Potencias y raíces|累乗と累乗根|幂与根式', items: [
        ['Product|Produit|Producto|積|乘积', R`a^m\,a^n = a^{m+n}`],
        ['Quotient|Quotient|Cociente|商|商', R`\frac{a^m}{a^n} = a^{m-n}`],
        ['Power of a power|Puissance d’une puissance|Potencia de una potencia|累乗の累乗|幂的幂', R`\left(a^m\right)^n = a^{mn}`],
        ['Power of a product|Puissance d’un produit|Potencia de un producto|積の累乗|积的幂', R`(ab)^n = a^n b^n, \qquad \left(\frac ab\right)^n = \frac{a^n}{b^n}`],
        ['Negative and zero exponents|Exposants négatifs et nul|Exponentes negativos y cero|負の指数と0乗|负指数与零指数', R`a^{-n} = \frac{1}{a^n}, \qquad a^0 = 1 \ (a \ne 0)`],
        ['Fractional exponents|Exposants fractionnaires|Exponentes fraccionarios|分数の指数|分数指数', R`a^{m/n} = \sqrt[n]{a^m} = \left(\sqrt[n]{a}\right)^m`],
        ['Roots|Racines|Raíces|累乗根|根式', R`\sqrt{ab} = \sqrt a\,\sqrt b, \qquad \sqrt{\frac ab} = \frac{\sqrt a}{\sqrt b}`, R`For $a, b \ge 0$.|Pour $a, b \ge 0$.|Para $a, b \ge 0$.|$a, b \ge 0$ のとき。|$a, b \ge 0$ 时成立。`],
        ['Rationalising|Rationaliser|Racionalizar|有理化|分母有理化', R`\frac{1}{\sqrt a + \sqrt b} = \frac{\sqrt a - \sqrt b}{a - b}`],
        ['Square root of a square|Racine d’un carré|Raíz de un cuadrado|2乗の平方根|平方的算术根', R`\sqrt{x^2} = |x|`]
      ] },
      { t: 'Logarithms|Logarithmes|Logaritmos|対数|对数', items: [
        ['Definition|Définition|Definición|定義|定义', R`\log_a x = y \iff a^y = x \qquad (a > 0,\ a \ne 1,\ x > 0)`],
        ['Product and quotient|Produit et quotient|Producto y cociente|積と商|积与商', R`\log(xy) = \log x + \log y, \qquad \log\frac xy = \log x - \log y`],
        ['Power|Puissance|Potencia|累乗|幂', R`\log x^k = k\log x`],
        ['Change of base|Changement de base|Cambio de base|底の変換|换底公式', R`\log_a x = \frac{\ln x}{\ln a} = \frac{\log_b x}{\log_b a}`],
        ['Inverse of the power|Réciproque de la puissance|Inversa de la potencia|累乗の逆|与幂互逆', R`a^{\log_a x} = x, \qquad \log_a a^x = x`],
        ['Special values|Valeurs particulières|Valores especiales|特別な値|特殊值', R`\log_a 1 = 0, \quad \log_a a = 1, \quad \ln e = 1`],
        ['Swap base and argument|Échanger base et argument|Intercambiar base y argumento|底と真数の入れ替え|底数与真数互换', R`\log_a b = \frac{1}{\log_b a}`]
      ] },
      { t: 'Identities|Identités remarquables|Identidades notables|乗法公式|乘法公式', items: [
        ['Square of a sum|Carré d’une somme|Cuadrado de una suma|和の2乗|和的平方', R`(a \pm b)^2 = a^2 \pm 2ab + b^2`],
        ['Difference of squares|Différence de carrés|Diferencia de cuadrados|2乗の差|平方差', R`a^2 - b^2 = (a - b)(a + b)`],
        ['Cube of a sum|Cube d’une somme|Cubo de una suma|和の3乗|和的立方', R`(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3`],
        ['Sum and difference of cubes|Somme et différence de cubes|Suma y diferencia de cubos|3乗の和と差|立方和与立方差', R`a^3 \pm b^3 = (a \pm b)\left(a^2 \mp ab + b^2\right)`],
        ['Three terms|Trois termes|Tres términos|3項の2乗|三项和的平方', R`(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)`],
        ['Difference of powers|Différence de puissances|Diferencia de potencias|累乗の差|幂的差', R`a^n - b^n = (a - b)\left(a^{n-1} + a^{n-2}b + \dots + b^{n-1}\right)`]
      ] },
      { t: 'Quadratic equations|Équations du second degré|Ecuaciones de segundo grado|2次方程式|一元二次方程', items: [
        ['Roots of ax² + bx + c = 0|Racines de ax² + bx + c = 0|Raíces de ax² + bx + c = 0|ax² + bx + c = 0 の解|ax² + bx + c = 0 的根', R`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`],
        ['Discriminant|Discriminant|Discriminante|判別式|判别式', R`\Delta = b^2 - 4ac`, R`$\Delta > 0$: two real roots; $\Delta = 0$: one double root; $\Delta < 0$: two complex roots.|$\Delta > 0$ : deux racines réelles ; $\Delta = 0$ : une racine double ; $\Delta < 0$ : deux racines complexes.|$\Delta > 0$: dos raíces reales; $\Delta = 0$: una raíz doble; $\Delta < 0$: dos raíces complejas.|$\Delta > 0$：異なる2つの実数解、$\Delta = 0$：重解、$\Delta < 0$：2つの虚数解。|$\Delta > 0$：两个不等实根；$\Delta = 0$：一个重根；$\Delta < 0$：两个复根。`],
        ['Vieta’s formulas|Relations de Viète|Fórmulas de Vieta|解と係数の関係|韦达定理', R`x_1 + x_2 = -\frac ba, \qquad x_1 x_2 = \frac ca`],
        ['Vertex form|Forme canonique|Forma canónica|平方完成|顶点式', R`ax^2 + bx + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{\Delta}{4a}`, R`Vertex at $x = -\tfrac{b}{2a}$.|Sommet en $x = -\tfrac{b}{2a}$.|Vértice en $x = -\tfrac{b}{2a}$.|頂点は $x = -\tfrac{b}{2a}$。|顶点在 $x = -\tfrac{b}{2a}$。`],
        ['Factored form|Forme factorisée|Forma factorizada|因数分解形|交点式', R`ax^2 + bx + c = a(x - x_1)(x - x_2)`]
      ] },
      { t: 'Polynomials|Polynômes|Polinomios|多項式|多项式', items: [
        ['Remainder theorem|Théorème du reste|Teorema del resto|剰余の定理|余数定理', R`P(x) = (x - a)\,Q(x) + P(a)`, R`The remainder of $P(x)$ divided by $x - a$ is $P(a)$.|Le reste de la division de $P(x)$ par $x - a$ est $P(a)$.|El resto de dividir $P(x)$ entre $x - a$ es $P(a)$.|$P(x)$ を $x - a$ で割った余りは $P(a)$。|$P(x)$ 除以 $x - a$ 的余数是 $P(a)$。`],
        ['Factor theorem|Théorème du facteur|Teorema del factor|因数定理|因式定理', R`P(a) = 0 \iff (x - a) \mid P(x)`],
        ['Vieta for a cubic|Viète pour une cubique|Vieta para una cúbica|3次方程式の解と係数|三次方程的韦达定理', R`x_1 + x_2 + x_3 = -\frac ba, \qquad x_1x_2 + x_2x_3 + x_3x_1 = \frac ca, \qquad x_1x_2x_3 = -\frac da`],
        ['Rational roots|Racines rationnelles|Raíces racionales|有理数解|有理根', R`x = \frac pq \ \Rightarrow\ p \mid a_0,\ q \mid a_n`, R`Candidates for integer-coefficient polynomials.|Candidats pour un polynôme à coefficients entiers.|Candidatas para polinomios de coeficientes enteros.|整数係数の多項式の解の候補。|整系数多项式有理根的候选。`]
      ] },
      { t: 'Inequalities|Inégalités|Desigualdades|不等式|不等式', items: [
        ['AM–GM|Moyennes arithmétique et géométrique|Medias aritmética y geométrica|相加平均と相乗平均|均值不等式', R`\frac{a + b}{2} \ge \sqrt{ab} \qquad (a, b \ge 0)`, R`Equality when $a = b$. Useful: $x + \frac kx \ge 2\sqrt k$.|Égalité si $a = b$. Utile : $x + \frac kx \ge 2\sqrt k$.|Igualdad si $a = b$. Útil: $x + \frac kx \ge 2\sqrt k$.|等号は $a = b$ のとき。便利：$x + \frac kx \ge 2\sqrt k$。|当 $a = b$ 时取等号。常用：$x + \frac kx \ge 2\sqrt k$。`],
        ['AM–GM for n numbers|Pour n nombres|Para n números|n 個の場合|n 个数的情形', R`\frac{a_1 + \dots + a_n}{n} \ge \sqrt[n]{a_1\cdots a_n}`],
        ['Cauchy–Schwarz|Cauchy–Schwarz|Cauchy–Schwarz|コーシー・シュワルツ|柯西–施瓦茨', R`\left(\textstyle\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)`],
        ['Triangle inequality|Inégalité triangulaire|Desigualdad triangular|三角不等式|三角不等式', R`|a + b| \le |a| + |b|`],
        ['Absolute value|Valeur absolue|Valor absoluto|絶対値|绝对值', R`|x| < a \iff -a < x < a, \qquad |x| > a \iff x < -a \ \lor\ x > a`],
        ['Multiplying by a negative|Multiplier par un négatif|Multiplicar por un negativo|負の数をかける|乘以负数', R`a < b,\ c < 0 \ \Rightarrow\ ac > bc`, R`The inequality sign flips.|Le sens de l’inégalité s’inverse.|El signo de la desigualdad se invierte.|不等号の向きが逆になります。|不等号方向改变。`]
      ] },
      { t: 'Sequences and sums|Suites et sommes|Sucesiones y sumas|数列と和|数列与求和', items: [
        ['Arithmetic sequence|Suite arithmétique|Progresión aritmética|等差数列|等差数列', R`a_n = a_1 + (n - 1)d, \qquad S_n = \frac{n(a_1 + a_n)}{2}`],
        ['Geometric sequence|Suite géométrique|Progresión geométrica|等比数列|等比数列', R`a_n = a_1 r^{\,n-1}, \qquad S_n = a_1\frac{1 - r^n}{1 - r}`],
        ['Infinite geometric series|Série géométrique infinie|Serie geométrica infinita|無限等比級数|无穷等比级数', R`S_\infty = \frac{a_1}{1 - r} \qquad (|r| < 1)`],
        ['Sum of integers|Somme des entiers|Suma de enteros|自然数の和|自然数之和', R`\sum_{k=1}^n k = \frac{n(n + 1)}{2}`],
        ['Sum of squares|Somme des carrés|Suma de cuadrados|平方の和|平方和', R`\sum_{k=1}^n k^2 = \frac{n(n + 1)(2n + 1)}{6}`],
        ['Sum of cubes|Somme des cubes|Suma de cubos|立方の和|立方和', R`\sum_{k=1}^n k^3 = \left(\frac{n(n + 1)}{2}\right)^2`],
        ['Telescoping|Somme télescopique|Suma telescópica|望遠鏡和|裂项相消', R`\sum_{k=1}^n \frac{1}{k(k + 1)} = 1 - \frac{1}{n + 1}`]
      ] },
      { t: 'Solving inequalities|Résolution d’inéquations|Resolución de inecuaciones|不等式の解き方|解不等式', items: [
        ['Quadratic inequality (a > 0)|Inéquation du second degré (a > 0)|Inecuación de segundo grado (a > 0)|2次不等式（a > 0）|一元二次不等式（a > 0）', R`a(x - x_1)(x - x_2) > 0 \iff x < x_1 \lor x > x_2, \qquad < 0 \iff x_1 < x < x_2`, R`Roots $x_1 < x_2$: outside the roots for $> 0$, between them for $< 0$. With $\Delta < 0$ the sign is always that of $a$.|Racines $x_1 < x_2$ : à l’extérieur pour $> 0$, entre elles pour $< 0$. Si $\Delta < 0$, le signe est toujours celui de $a$.|Raíces $x_1 < x_2$: fuera de las raíces para $> 0$, entre ellas para $< 0$. Si $\Delta < 0$, el signo es siempre el de $a$.|解 $x_1 < x_2$：$> 0$ なら解の外側、$< 0$ なら間。$\Delta < 0$ なら常に $a$ の符号。|根 $x_1 < x_2$：$> 0$ 取两根之外，$< 0$ 取两根之间。$\Delta < 0$ 时符号恒与 $a$ 相同。`],
        ['Rational inequality|Inéquation rationnelle|Inecuación racional|分数不等式|分式不等式', R`\frac{P(x)}{Q(x)} \ge 0`, 'Move everything to one side, find the zeros of P and Q, make a sign table. Never multiply by Q if its sign is unknown; zeros of Q are always excluded.|Tout passer d’un côté, chercher les zéros de P et Q, faire un tableau de signes. Ne jamais multiplier par Q si son signe est inconnu ; les zéros de Q sont exclus.|Pasar todo a un lado, hallar los ceros de P y Q y hacer una tabla de signos. No multiplicar por Q si no se conoce su signo; los ceros de Q siempre se excluyen.|すべて片側に移し、P と Q の零点を求めて符号表を作る。符号の分からない Q を掛けない。Q の零点は除く。|移项到一边，求 P、Q 的零点，列符号表。不要乘以符号未知的 Q；Q 的零点总要排除。'],
        { tbl: [[R`x`, R`{<}{-2}`, R`(-2, 1)`, R`(1, 3)`, R`{>}\,3`],
                [R`x + 2`, '-', '+', '+', '+'], [R`x - 1`, '-', '-', '+', '+'], [R`x - 3`, '-', '-', '-', '+'],
                [R`\frac{(x + 2)(x - 1)}{x - 3}`, '-', '+', '-', '+']], cls: 'tight', k: 'sign table signes signos 符号表 符号 rational inequality' },
        ['Absolute values|Valeurs absolues|Valores absolutos|絶対値|绝对值', R`|f| < g \iff -g < f < g, \qquad |f| > g \iff f < -g \ \lor\ f > g`],
        ['Two absolute values|Deux valeurs absolues|Dos valores absolutos|絶対値が2つ|两个绝对值', R`|f| < |g| \iff f^2 < g^2`, 'Or split the line at the points where each expression changes sign.|Ou découper la droite aux points où chaque expression change de signe.|O dividir la recta en los puntos donde cada expresión cambia de signo.|または各式の符号が変わる点で場合分け。|或在各式变号处分段讨论。'],
        ['Square roots|Racines carrées|Raíces cuadradas|平方根を含む不等式|根式不等式', R`\sqrt f < g \iff f \ge 0,\ g > 0,\ f < g^2`]
      ] },
      { t: 'Exponential, logarithmic and irrational equations|Équations exponentielles, logarithmiques et irrationnelles|Ecuaciones exponenciales, logarítmicas e irracionales|指数・対数・無理方程式|指数、对数与无理方程', items: [
        ['Same base|Même base|Misma base|底をそろえる|化为同底', R`a^{f(x)} = a^{g(x)} \iff f(x) = g(x)`, R`E.g. $4^x = 8 \iff 2^{2x} = 2^3 \iff x = \tfrac32$.|Ex. $4^x = 8 \iff 2^{2x} = 2^3 \iff x = \tfrac32$.|P. ej. $4^x = 8 \iff 2^{2x} = 2^3 \iff x = \tfrac32$.|例：$4^x = 8 \iff 2^{2x} = 2^3 \iff x = \tfrac32$。|例：$4^x = 8 \iff 2^{2x} = 2^3 \iff x = \tfrac32$。`],
        ['Taking logarithms|Passer au logarithme|Tomar logaritmos|両辺の対数をとる|两边取对数', R`a^x = b \iff x = \log_a b = \frac{\ln b}{\ln a}`],
        ['Substitution|Changement de variable|Cambio de variable|置き換え|换元', R`a^{2x} + p\,a^x + q = 0:\ \ t = a^x > 0 \ \Rightarrow\ t^2 + pt + q = 0`, R`Keep only the roots $t > 0$.|Ne garder que les racines $t > 0$.|Quedarse solo con las raíces $t > 0$.|$t > 0$ の解だけ残します。|只保留 $t > 0$ 的根。`],
        ['Logarithmic equations|Équations logarithmiques|Ecuaciones logarítmicas|対数方程式|对数方程', R`\log_a f = \log_a g \iff f = g > 0, \qquad \log_a f = c \iff f = a^c`, 'Always check the solutions in the original domain (arguments > 0).|Toujours vérifier les solutions dans le domaine d’origine (arguments > 0).|Comprobar siempre las soluciones en el dominio original (argumentos > 0).|必ず元の定義域（真数 > 0）で解を確認。|务必检验解是否在原定义域内（真数 > 0）。'],
        ['Inequalities and the base|Inéquations et base|Inecuaciones y base|不等式と底|不等式与底数', R`0 < a < 1:\ \ a^f < a^g \iff f > g, \qquad \log_a f < \log_a g \iff f > g > 0`, 'With a base between 0 and 1 the inequality sign flips.|Avec une base entre 0 et 1, le sens de l’inégalité s’inverse.|Con base entre 0 y 1 el sentido de la desigualdad se invierte.|底が 0 と 1 の間なら不等号の向きが逆。|底数在 0 与 1 之间时不等号反向。'],
        ['Irrational equations|Équations irrationnelles|Ecuaciones irracionales|無理方程式|无理方程', R`\sqrt{f} = g \iff f = g^2,\ \ g \ge 0`, 'Isolate the root and square; squaring can add false solutions, so check every one.|Isoler la racine et élever au carré ; cela peut ajouter de fausses solutions, donc toutes les vérifier.|Aislar la raíz y elevar al cuadrado; puede añadir soluciones falsas, así que comprobarlas todas.|根号を孤立させて2乗する。偽の解が出ることがあるので必ず確認。|先把根式单独移到一边再平方；平方可能产生增根，须逐一检验。']
      ] },
      { t: 'More on sequences|Compléments sur les suites|Más sobre sucesiones|数列の補足|数列补充', items: [
        ['Terms from partial sums|Termes à partir des sommes|Términos a partir de las sumas|和から一般項|由前 n 项和求通项', R`a_1 = S_1, \qquad a_n = S_n - S_{n-1} \quad (n \ge 2)`],
        ['Arithmetic and geometric means|Moyennes arithmétique et géométrique|Medias aritmética y geométrica|等差中項と等比中項|等差中项与等比中项', R`a, b, c\ (\text{A}) \iff 2b = a + c, \qquad a, b, c\ (\text{G}) \iff b^2 = ac`, 'A: arithmetic, G: geometric.|A : arithmétique, G : géométrique.|A: aritmética, G: geométrica.|A：等差、G：等比。|A：等差，G：等比。'],
        ['Index properties|Propriétés des indices|Propiedades de los índices|添字の性質|下标性质', R`m + n = p + q \ \Rightarrow\ a_m + a_n = a_p + a_q \ \ (\text{A}), \qquad a_m a_n = a_p a_q \ \ (\text{G})`],
        ['Linear recurrence|Récurrence affine|Recurrencia lineal|漸化式 aₙ₊₁ = p aₙ + q|线性递推', R`a_{n+1} = p\,a_n + q \ \Rightarrow\ a_n - \lambda = p^{\,n-1}(a_1 - \lambda), \quad \lambda = \frac{q}{1 - p}`, R`$\lambda$ is the fixed point; $a_n - \lambda$ is geometric.|$\lambda$ est le point fixe ; $a_n - \lambda$ est géométrique.|$\lambda$ es el punto fijo; $a_n - \lambda$ es geométrica.|$\lambda$ は不動点で、$a_n - \lambda$ は等比数列。|$\lambda$ 为不动点；$a_n - \lambda$ 成等比数列。`],
        ['Arithmetic × geometric|Arithmétique × géométrique|Aritmética × geométrica|等差 × 等比の和|错位相减', R`S = \sum k\,r^k:\ \ S - rS = \sum r^k - n\,r^{n+1}`, 'Subtract r·S from S and the sum becomes geometric.|Soustraire r·S à S : la somme devient géométrique.|Restar r·S a S: la suma se vuelve geométrica.|S − rS を作ると等比数列の和になる。|S 减去 rS，化为等比数列求和。'],
        ['Telescoping fractions|Fractions télescopiques|Fracciones telescópicas|部分分数分解で消去|裂项相消', R`\frac{1}{k(k + d)} = \frac1d\left(\frac1k - \frac{1}{k + d}\right)`]
      ] },
      { t: 'Linear programming|Programmation linéaire|Programación lineal|線形計画法|线性规划', fig: 'lp', items: [
        ['The problem|Le problème|El problema|問題の形|问题形式', R`\max/\min\ z = ax + by \quad :\quad a_ix + b_iy \le c_i`, 'The constraints (inequalities) cut out a polygon: the feasible region.|Les contraintes (inéquations) délimitent un polygone : la région admissible.|Las restricciones (inecuaciones) determinan un polígono: la región factible.|制約条件（不等式）が多角形（実行可能領域）を作る。|约束条件（不等式）围成多边形：可行域。'],
        ['Half-planes|Demi-plans|Semiplanos|半平面|半平面', R`ax + by \le c`, R`Draw the line $ax + by = c$, test a point such as $(0, 0)$ to pick the side.|Tracer la droite $ax + by = c$ et tester un point comme $(0, 0)$ pour choisir le côté.|Dibujar la recta $ax + by = c$ y probar un punto como $(0, 0)$ para elegir el lado.|直線 $ax + by = c$ を引き、$(0, 0)$ などを代入してどちら側か決める。|画直线 $ax + by = c$，代入 $(0, 0)$ 等点判断区域。`],
        ['Optimum at a vertex|Optimum en un sommet|Óptimo en un vértice|最適解は頂点|最优解在顶点', R`z^{*} = \max_{V_i} z(V_i)`, 'Find the vertices (intersections of the boundary lines) and evaluate z at each.|Trouver les sommets (intersections des droites frontières) et calculer z en chacun.|Hallar los vértices (cortes de las rectas frontera) y evaluar z en cada uno.|境界の直線の交点（頂点）を求め、それぞれで z を計算。|求出顶点（边界直线交点），逐一代入计算 z。'],
        ['Level lines|Droites de niveau|Rectas de nivel|等高線（目的関数の直線）|等值线', R`ax + by = c , \quad c \uparrow`, 'Slide the line z = c across the region; the last point it touches is the optimum. A whole edge can be optimal if it is parallel to z.|Faire glisser la droite z = c sur la région ; le dernier point touché est l’optimum. Un côté entier peut être optimal s’il est parallèle à z.|Desplazar la recta z = c por la región; el último punto que toca es el óptimo. Un lado entero puede ser óptimo si es paralelo a z.|直線 z = c を平行移動し、最後に触れる点が最適。z に平行な辺なら辺全体が最適。|平移直线 z = c，最后接触的点即为最优解；若与某边平行，整条边都是最优解。']
      ] },
      { t: 'Binomial theorem|Binôme de Newton|Binomio de Newton|二項定理|二项式定理', items: [
        ['Expansion|Développement|Desarrollo|展開|展开式', R`(a + b)^n = \sum_{k=0}^n \binom nk a^{n-k} b^k`],
        ['General term|Terme général|Término general|一般項|通项', R`T_{k+1} = \binom nk a^{n-k} b^k`],
        ['Sum of coefficients|Somme des coefficients|Suma de coeficientes|係数の和|系数和', R`\sum_{k=0}^n \binom nk = 2^n, \qquad \sum_{k=0}^n (-1)^k\binom nk = 0`]
      ] }
    ]
  });
})();
