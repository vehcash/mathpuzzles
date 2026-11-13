/* Pictures for the two geometry lessons still without one. */
(function () {
  const C = window.CheatPics; if (!C) return;
  const { S2, SG, LB, PT, POLY, SEQ, GRID } = C;
  const vis = (k, a, cap, o) => C.vis('geometry', k, a, cap, o);
  const tag = (x, y, t, c = 'y', s = 15) => LB([x, y], t, c, s);
  const u = 0.45;

  vis('Right triangles/Pythagorean triples', [S2([0.4, 0.6], 2.6), ...SEQ([POLY([[0, 0], [4 * u, 0], [0, 3 * u]], 'chalk', 0.15),
      ...GRID(4, 4, 0, 0, u, () => 'b', null), ...GRID(3, 3, -3 * u, 3 * u, u, () => 'p', null),
      POLY([[4 * u, 0], [0, 3 * u], [3 * u, 7 * u], [7 * u, 4 * u]], 'y', 0.25), tag(2 * u, -2 * u, '16', 'chalk', 18), tag(-1.5 * u, 1.5 * u, '9', 'chalk', 18), tag(3.5 * u, 3.5 * u, '25', 'chalk', 18),
      tag(2 * u, -4.6 * u, '9 + 16 = 25', 'y', 16)], 200, 30)],
    'On the board: the 3-4-5 triangle with the squares on its sides. $9 + 16$ unit squares fill exactly the square on the hypotenuse, $25$. Every primitive triple comes from $m > n$: here $m = 2$, $n = 1$.|Au tableau : le triangle 3-4-5 avec les carrés sur ses côtés. $9 + 16$ carrés unités remplissent exactement le carré de l’hypoténuse, $25$. Tout triplet primitif vient de $m > n$ : ici $m = 2$, $n = 1$.|En la pizarra: el triángulo 3-4-5 con los cuadrados sobre sus lados. $9 + 16$ cuadrados unidad llenan justo el cuadrado de la hipotenusa, $25$. Toda terna primitiva sale de $m > n$: aquí $m = 2$, $n = 1$.|黒板：3-4-5 の直角三角形と各辺上の正方形。単位正方形 $9 + 16$ 個が斜辺上の正方形 25 をちょうど埋める。原始ピタゴラス数は $m > n$ から作れる：ここでは $m = 2$, $n = 1$。|黑板上：3-4-5 三角形及其各边上的正方形。$9 + 16$ 个单位正方形恰好填满斜边上的正方形 $25$。每组本原勾股数都由 $m > n$ 生成：这里 $m = 2$，$n = 1$。');
  const A = [0.8, 2.2], B = [0, 0], Cc = [3, 0], M = [1.5, 0], Dd = [B[0] + Cc[0] - A[0], B[1] + Cc[1] - A[1]];
  vis('Centres and special lines/Median length', [S2([1.5, 0.1], 2.0), ...SEQ([POLY([A, B, Cc], 'b', 0.2), POLY([B, Dd, Cc], 'chalk', 0.04, { dash: true }), SG(A, Dd, 'y', { w: 2.4 }), SG(B, Cc, 'p', { w: 2.4 }), PT(M, 'M', 'y'),
      tag(A[0], A[1] + 0.3, 'A', 'chalk', 16), tag(B[0] - 0.25, B[1], 'B', 'chalk', 16), tag(Cc[0] + 0.25, Cc[1], 'C', 'chalk', 16), tag(Dd[0], Dd[1] - 0.3, 'D', 'chalk', 16),
      tag(0.1, 1.25, 'c', 'b', 16), tag(2.15, 1.3, 'b', 'b', 16), tag(1.3, 0.85, 'mₐ', 'y', 15), tag(2.3, -0.25, 'a', 'p', 16),
      tag(1.5, -2.65, '4mₐ² + a² = 2b² + 2c²', 'g', 15)], 200, 70)],
    'On the board: double the median to $D$ and you get a parallelogram $ABDC$ with sides $b, c$ and diagonals $2m_a$ (yellow) and $a$ (pink). The parallelogram law, “sum of the squares of the diagonals = sum of the squares of the sides”, gives the median.|Au tableau : en doublant la médiane jusqu’à $D$ on obtient un parallélogramme $ABDC$ de côtés $b, c$ et de diagonales $2m_a$ (jaune) et $a$ (rose). La loi du parallélogramme, « somme des carrés des diagonales = somme des carrés des côtés », donne la médiane.|En la pizarra: al duplicar la mediana hasta $D$ sale un paralelogramo $ABDC$ de lados $b, c$ y diagonales $2m_a$ (amarilla) y $a$ (rosa). La ley del paralelogramo, «suma de los cuadrados de las diagonales = suma de los cuadrados de los lados», da la mediana.|黒板：中線を $D$ まで 2 倍に延ばすと、辺 $b, c$、対角線 $2m_a$（黄）と $a$（桃）の平行四辺形 $ABDC$ ができる。中線定理「対角線の平方和 = 辺の平方和」から中線の長さが出る。|黑板上：把中线延长一倍到 $D$，得到平行四边形 $ABDC$，边为 $b, c$，对角线为 $2m_a$（黄）和 $a$（粉）。平行四边形定律“对角线平方和 = 各边平方和”给出中线长。');
})();
