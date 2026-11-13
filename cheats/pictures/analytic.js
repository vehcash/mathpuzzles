/* Picture for the circle in general form. */
(function () {
  const C = window.CheatPics; if (!C) return;
  const { S2A, SG, LB, PT, CI, SEQ } = C;
  const vis = (k, a, cap, o) => C.vis('analytic', k, a, cap, o);
  const tag = (x, y, t, c = 'y', s = 15) => LB([x, y], t, c, s);

  vis('Circles/General form', [S2A([1.5, -0.8], 3.6), ...SEQ([CI([2, -1], 3, 'y', 0.1), PT([2, -1], 'centre (−D/2, −E/2) = (2, −1)', 'b'), SG([2, -1], [5, -1], 'p', { w: 2 }), tag(3.5, -0.7, 'r = 3', 'p', 15),
      tag(1.5, 3.0, 'x² + y² − 4x + 2y − 4 = 0', 'chalk', 15), tag(1.5, -4.7, '(x − 2)² + (y + 1)² = 4 + 1 + 4 = 9', 'y', 15)], 200, 90)],
    'On the board: $x^2 + y^2 - 4x + 2y - 4 = 0$. Completing both squares moves the $-4$ and adds $4 + 1$: $(x - 2)^2 + (y + 1)^2 = 9$ — centre $(2, -1)$, radius $3$.|Au tableau : $x^2 + y^2 - 4x + 2y - 4 = 0$. En complétant les deux carrés on déplace le $-4$ et on ajoute $4 + 1$ : $(x - 2)^2 + (y + 1)^2 = 9$ — centre $(2, -1)$, rayon $3$.|En la pizarra: $x^2 + y^2 - 4x + 2y - 4 = 0$. Al completar los dos cuadrados se pasa el $-4$ y se suma $4 + 1$: $(x - 2)^2 + (y + 1)^2 = 9$, centro $(2, -1)$ y radio $3$.|黒板：$x^2 + y^2 - 4x + 2y - 4 = 0$。両方を平方完成すると $-4$ を移項し $4 + 1$ を足して $(x - 2)^2 + (y + 1)^2 = 9$——中心 $(2, -1)$、半径 3。|黑板上：$x^2 + y^2 - 4x + 2y - 4 = 0$。对两个变量配方，移走 $-4$ 并加上 $4 + 1$：$(x - 2)^2 + (y + 1)^2 = 9$——圆心 $(2, -1)$，半径 $3$。');
})();
