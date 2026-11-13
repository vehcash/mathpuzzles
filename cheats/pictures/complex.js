/* Pictures for the complex-number lessons still without one. */
(function () {
  const C = window.CheatPics; if (!C) return;
  const { S2A, SG, V, LB, PT, CI, SEQ } = C;
  const vis = (k, a, cap, o) => C.vis('complex', k, a, cap, o);
  const tag = (x, y, t, c = 'y', s = 15) => LB([x, y], t, c, s);

  vis('Basics/Division', [S2A([1.5, 0], 2.6, { names: ['Re', 'Im', ''] }), ...SEQ([V([0, 0], [2, 1.5], 'b'), PT([2, 1.5], 'w = 2 + 1.5i', 'b'), V([0, 0], [2, -1.5], 'p'), PT([2, -1.5], 'w̄ = 2 − 1.5i', 'p'),
      SG([2, 1.5], [2, -1.5], 'chalk', { w: 1, dash: true }), V([0, 0], [3.125, 0], 'y', { w: 3.4 }), PT([3.125, 0], '', 'y'), tag(3.2, 0.35, 'w·w̄ = |w|² = 6.25', 'y', 14)], 200, 90)],
    'On the board: $w$ and its conjugate $\\bar w$ are mirror images in the real axis; their arguments cancel, so $w\\bar w = |w|^2$ lands on the real axis. Multiplying top and bottom by $\\bar w$ makes the denominator real.|Au tableau : $w$ et son conjugué $\\bar w$ sont symétriques par rapport à l’axe réel ; leurs arguments s’annulent, donc $w\\bar w = |w|^2$ tombe sur l’axe réel. Multiplier en haut et en bas par $\\bar w$ rend le dénominateur réel.|En la pizarra: $w$ y su conjugado $\\bar w$ son simétricos respecto al eje real; sus argumentos se anulan, así que $w\\bar w = |w|^2$ cae en el eje real. Multiplicar arriba y abajo por $\\bar w$ hace real el denominador.|黒板：$w$ と共役 $\\bar w$ は実軸について対称。偏角が打ち消し合い、$w\\bar w = |w|^2$ は実軸上にくる。分子分母に $\\bar w$ を掛けると分母が実数になる。|黑板上：$w$ 与其共轭 $\\bar w$ 关于实轴对称；辐角相互抵消，所以 $w\\bar w = |w|^2$ 落在实轴上。分子分母同乘 $\\bar w$，分母就变成实数。');
  const r = 1.18, th = 45 * Math.PI / 180, Z = k => [Math.pow(r, k) * Math.cos(k * th), Math.pow(r, k) * Math.sin(k * th)];
  const pts = [0, 1, 2, 3, 4, 5, 6];
  vis('Powers and roots/Powers', [S2A([-0.3, 0.3], 2.5, { names: ['Re', 'Im', ''] }), ...SEQ([...pts.slice(1).map(k => SG(Z(k - 1), Z(k), 'b', { w: 1.6 })), ...pts.map(k => V([0, 0], Z(k), k === 6 ? 'y' : 'chalk', { w: k === 6 ? 3 : 1.2 })),
      ...pts.map(k => PT(Z(k), k ? 'z' + '⁰¹²³⁴⁵⁶'[k] : '1', k === 6 ? 'y' : 'b')), CI([0, 0], 1, 'chalk', 0), tag(1.7, 2.1, 'each step: × r, + θ', 'y', 14)], 200, 90)],
    'On the board: the powers $1, z, z^2, \\dots$ of $z = r e^{i\\theta}$ spiral out: every step turns by $\\theta$ and stretches by $r$. So $z^n$ has modulus $r^n$ and argument $n\\theta$.|Au tableau : les puissances $1, z, z^2, \\dots$ de $z = r e^{i\\theta}$ forment une spirale : chaque pas tourne de $\\theta$ et étire de $r$. Donc $z^n$ a pour module $r^n$ et pour argument $n\\theta$.|En la pizarra: las potencias $1, z, z^2, \\dots$ de $z = r e^{i\\theta}$ forman una espiral: cada paso gira $\\theta$ y estira por $r$. Así que $z^n$ tiene módulo $r^n$ y argumento $n\\theta$.|黒板：$z = r e^{i\\theta}$ の累乗 $1, z, z^2, \\dots$ はらせんを描く。1 歩ごとに $\\theta$ 回り $r$ 倍に伸びる。だから $z^n$ の絶対値は $r^n$、偏角は $n\\theta$。|黑板上：$z = r e^{i\\theta}$ 的幂 $1, z, z^2, \\dots$ 盘旋而出：每一步转 $\\theta$、伸长 $r$ 倍。所以 $z^n$ 的模是 $r^n$，辐角是 $n\\theta$。');
})();
