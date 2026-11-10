/* cheat sheet · complex numbers — text is 'en|fr|es|ja|zh' */
(function () {
  const R = String.raw;
  Cheats.topic({
    id: 'complex', icon: 'ℂ', color: '#a0436b', bg: '#f7e4ec', cat: 'complex',
    name: 'Complex numbers|Nombres complexes|Números complejos|複素数|复数',
    blurb: 'Algebraic and polar forms, De Moivre, roots of unity and geometry in the plane.|Formes algébrique et polaire, De Moivre, racines de l’unité et géométrie du plan.|Formas binómica y polar, De Moivre, raíces de la unidad y geometría del plano.|代数形式と極形式、ド・モアブル、1の n 乗根、複素平面の図形。|代数形式与三角形式、棣莫弗定理、单位根与复平面几何。',
    sections: [
      { t: 'Basics|Bases|Lo básico|基本|基础', items: [
        ['The imaginary unit|L’unité imaginaire|La unidad imaginaria|虚数単位|虚数单位', R`i^2 = -1, \qquad i^3 = -i, \qquad i^4 = 1`, R`Powers of $i$ repeat every 4: $i^n = i^{\,n \bmod 4}$.|Les puissances de $i$ se répètent tous les 4 : $i^n = i^{\,n \bmod 4}$.|Las potencias de $i$ se repiten cada 4: $i^n = i^{\,n \bmod 4}$.|$i$ の累乗は4つごとに繰り返す：$i^n = i^{\,n \bmod 4}$。|$i$ 的幂以 4 为周期：$i^n = i^{\,n \bmod 4}$。`],
        ['Algebraic form|Forme algébrique|Forma binómica|代数形式|代数形式', R`z = a + bi, \qquad \operatorname{Re}z = a, \quad \operatorname{Im}z = b`, R`$\operatorname{Im} z$ is the real number $b$, without the $i$.|$\operatorname{Im} z$ est le réel $b$, sans le $i$.|$\operatorname{Im} z$ es el número real $b$, sin la $i$.|$\operatorname{Im} z$ は $i$ を含まない実数 $b$。|$\operatorname{Im} z$ 是实数 $b$，不含 $i$。`],
        ['Conjugate|Conjugué|Conjugado|共役複素数|共轭复数', R`\bar z = a - bi, \qquad z + \bar z = 2a, \qquad z - \bar z = 2bi`],
        ['Modulus|Module|Módulo|絶対値|模', R`|z| = \sqrt{a^2 + b^2}, \qquad z\bar z = |z|^2`],
        ['Division|Division|División|割り算|除法', R`\frac{z}{w} = \frac{z\,\bar w}{|w|^2}`, 'Multiply top and bottom by the conjugate of the denominator.|Multiplier en haut et en bas par le conjugué du dénominateur.|Multiplicar arriba y abajo por el conjugado del denominador.|分母の共役を分子分母にかけます。|分子分母同乘分母的共轭。'],
        ['Rules for the modulus|Règles du module|Reglas del módulo|絶対値の性質|模的性质', R`|zw| = |z||w|, \qquad \left|\frac zw\right| = \frac{|z|}{|w|}, \qquad |z + w| \le |z| + |w|`]
      ] },
      { t: 'Polar form|Forme polaire|Forma polar|極形式|三角形式与指数形式', fig: 'polar', items: [
        ['Polar and exponential form|Forme trigonométrique et exponentielle|Forma trigonométrica y exponencial|極形式と指数形式|三角形式与指数形式', R`z = r(\cos\theta + i\sin\theta) = re^{i\theta}`],
        ['Modulus and argument|Module et argument|Módulo y argumento|絶対値と偏角|模与辐角', R`r = |z|, \qquad \tan\theta = \frac ba`, 'Check the quadrant of (a, b) before choosing θ.|Vérifier le quadrant de (a, b) avant de choisir θ.|Comprobar el cuadrante de (a, b) antes de elegir θ.|θ を決める前に (a, b) の象限を確認します。|确定 θ 前先看 (a, b) 所在象限。'],
        ['Euler’s formula|Formule d’Euler|Fórmula de Euler|オイラーの公式|欧拉公式', R`e^{i\theta} = \cos\theta + i\sin\theta, \qquad e^{i\pi} + 1 = 0`],
        ['Product and quotient|Produit et quotient|Producto y cociente|積と商|乘法与除法', R`r_1e^{i\theta_1}\cdot r_2e^{i\theta_2} = r_1r_2\,e^{i(\theta_1 + \theta_2)}, \qquad \frac{r_1e^{i\theta_1}}{r_2e^{i\theta_2}} = \frac{r_1}{r_2}e^{i(\theta_1 - \theta_2)}`, 'Multiply the moduli, add the arguments.|On multiplie les modules, on additionne les arguments.|Se multiplican los módulos y se suman los argumentos.|絶対値は掛け、偏角は足します。|模相乘，辐角相加。'],
        ['Cosine and sine from exponentials|Cosinus et sinus par exponentielles|Coseno y seno con exponenciales|指数関数で表す cos と sin|用指数表示余弦与正弦', R`\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}, \qquad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}`]
      ] },
      { t: 'Powers and roots|Puissances et racines|Potencias y raíces|累乗と累乗根|乘方与开方', items: [
        ['De Moivre|De Moivre|De Moivre|ド・モアブルの定理|棣莫弗定理', R`(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta`],
        ['Powers|Puissances|Potencias|累乗|乘方', R`z^n = r^n e^{in\theta}`],
        ['n-th roots|Racines n-ièmes|Raíces n-ésimas|n 乗根|n 次方根', R`z_k = \sqrt[n]{r}\;e^{i\frac{\theta + 2k\pi}{n}}, \qquad k = 0, 1, \dots, n - 1`, 'The n roots form a regular polygon around 0.|Les n racines forment un polygone régulier autour de 0.|Las n raíces forman un polígono regular alrededor de 0.|n 個の根は 0 を中心とする正 n 角形をなします。|n 个根构成以 0 为中心的正 n 边形。'],
        ['Roots of unity|Racines de l’unité|Raíces de la unidad|1の n 乗根|单位根', R`\omega_k = e^{2\pi i k/n}, \qquad \sum_{k=0}^{n-1}\omega_k = 0`],
        ['Cube roots of unity|Racines cubiques de l’unité|Raíces cúbicas de la unidad|1の3乗根|三次单位根', R`\omega = -\tfrac12 + \tfrac{\sqrt3}{2}i, \qquad 1 + \omega + \omega^2 = 0, \qquad \omega^3 = 1`]
      ] },
      { t: 'Geometry in the complex plane|Géométrie dans le plan complexe|Geometría en el plano complejo|複素平面の図形|复平面中的几何', items: [
        ['Distance|Distance|Distancia|距離|距离', R`d(z_1, z_2) = |z_1 - z_2|`],
        ['Circle|Cercle|Circunferencia|円|圆', R`|z - z_0| = r`],
        ['Perpendicular bisector|Médiatrice|Mediatriz|垂直二等分線|垂直平分线', R`|z - a| = |z - b|`],
        ['Rotation|Rotation|Giro|回転|旋转', R`z \mapsto e^{i\theta}z`, 'Multiplying by i rotates by 90°.|Multiplier par i fait tourner de 90°.|Multiplicar por i gira 90°.|i を掛けると 90° 回転。|乘以 i 即旋转 90°。'],
        ['Conjugate|Conjugué|Conjugado|共役|共轭', R`z \mapsto \bar z`, 'Reflection in the real axis.|Symétrie par rapport à l’axe réel.|Simetría respecto al eje real.|実軸に関する対称移動。|关于实轴对称。']
      ] },
      { t: 'Polynomials|Polynômes|Polinomios|多項式|多项式', items: [
        ['Quadratic with Δ < 0|Second degré avec Δ < 0|Segundo grado con Δ < 0|Δ < 0 の2次方程式|Δ < 0 的二次方程', R`x = \frac{-b \pm i\sqrt{-\Delta}}{2a}`],
        ['Conjugate roots|Racines conjuguées|Raíces conjugadas|共役な解|共轭根', R`P(z) = 0 \ \Rightarrow\ P(\bar z) = 0`, 'Polynomials with real coefficients have non-real roots in conjugate pairs.|Un polynôme à coefficients réels a ses racines non réelles par paires conjuguées.|Un polinomio de coeficientes reales tiene las raíces no reales en pares conjugados.|実数係数の多項式の虚数解は共役の組で現れます。|实系数多项式的虚根成对共轭出现。'],
        ['Fundamental theorem of algebra|Théorème fondamental de l’algèbre|Teorema fundamental del álgebra|代数学の基本定理|代数基本定理', R`\deg P = n \ \Rightarrow\ P(z) = a_n(z - z_1)\cdots(z - z_n)`, 'Counted with multiplicity.|Comptées avec multiplicité.|Contadas con multiplicidad.|重複も含めて数えます。|计重数。']
      ] }
    ]
  });
})();
