/* Figures for the cheat sheets: each function returns an SVG string for the current language.
   Classes (css/cheats.css): ln solid line, th dashed helper, ax axis, ac / ac2 accent strokes, fl / fl2 fills,
   dt / dtc dots, text (italic maths), text.tl (small upright label), text.sm (smaller), text.up (upright). */
(function () {
  'use strict';
  const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
  const w = (lang, s) => { const p = s.split('|'); return p[Math.max(0, LANGS.indexOf(lang))] || p[0]; };
  let uid = 0;
  const svg = (W, H, body, cls) => { const id = 'ah' + (++uid); return `<svg viewBox="0 0 ${W} ${H}"${cls ? ` class="${cls}"` : ''} xmlns="http://www.w3.org/2000/svg"><defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="mk"/></marker></defs>${body.replace(/ARROW/g, `url(#${id})`)}</svg>`; };
  const L = (x1, y1, x2, y2, c = 'ln', extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" ${extra}/>`;
  const Pth = (d, c = 'ln') => `<path d="${d}" class="${c}"/>`;
  const T = (x, y, s, c = '') => `<text x="${x}" y="${y}"${c ? ` class="${c}"` : ''}>${s}</text>`;
  const D = (x, y, c = 'dt', r = 3.4) => `<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
  const C = (x, y, r, c = 'ln') => `<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
  const poly = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
  const curve = (f, a, b, n = 80) => { const q = []; for (let k = 0; k <= n; k++) { const x = a + (b - a) * k / n; q.push([x, f(x)]); } return q; };
  const arc = (cx, cy, r, a0, a1) => { const q = []; for (let k = 0; k <= 24; k++) { const t = (a0 + (a1 - a0) * k / 24) * Math.PI / 180; q.push([cx + r * Math.cos(t), cy - r * Math.sin(t)]); } return poly(q); };
  // maps maths coordinates in xr × yr onto a W × H box whose top-left corner is (x0, y0)
  const frame = (x0, y0, W, H, xr, yr) => (x, y) => [x0 + (x - xr[0]) * W / (xr[1] - xr[0]), y0 + (yr[1] - y) * H / (yr[1] - yr[0])];
  // y = fn(x) through P, lifting the pen where it is undefined or leaves [lo, hi]
  const plot = (fn, a, b, P, lo = -1e9, hi = 1e9, n = 160) => { let d = '', pen = false; for (let k = 0; k <= n; k++) { const x = a + (b - a) * k / n, y = fn(x); if (!isFinite(y) || y < lo || y > hi) { pen = false; continue; } const [X, Y] = P(x, y); d += (pen ? 'L' : 'M') + X.toFixed(1) + ',' + Y.toFixed(1); pen = true; } return d; };
  const right = (x, y, dx, dy, s = 11) => Pth(`M${x + dx * s},${y}L${x + dx * s},${y + dy * s}L${x},${y + dy * s}`, 'ln');

  window.CheatFigs = {
    // right triangle: legs a, b, hypotenuse c (Pythagoras)
    right(lang) {
      return svg(260, 150, Pth('M30,130L220,130L220,25Z', 'fl') + Pth('M30,130L220,130L220,25Z') + right(220, 130, -1, -1) + T(125, 143, 'b') + T(234, 78, 'a') + T(116, 66, 'c'));
    },
    // the same triangle with trig names
    righttrig(lang) {
      const hyp = w(lang, 'hypotenuse|hypoténuse|hipotenusa|斜辺|斜边'), opp = w(lang, 'opposite|opposé|opuesto|対辺|对边'), adj = w(lang, 'adjacent|adjacent|contiguo|隣辺|邻边');
      return svg(280, 160, Pth('M30,130L220,130L220,25Z', 'fl') + Pth('M30,130L220,130L220,25Z') + right(220, 130, -1, -1) + Pth(arc(30, 130, 34, 0, 29), 'ac') +
        T(78, 119, 'θ') + T(125, 146, adj, 'tl') + T(252, 78, opp, 'tl') + T(108, 64, hyp, 'tl'));
    },
    // general triangle: vertices A, B, C, opposite sides a, b, c, altitude h
    triangle(lang) {
      const A = [25, 135], B = [245, 135], Cc = [95, 25];
      return svg(270, 155, Pth(`M${A}L${B}L${Cc}Z`, 'fl') + Pth(`M${A}L${B}L${Cc}Z`) + L(95, 25, 95, 135, 'th') + right(95, 135, 1, -1, 9) +
        Pth(arc(25, 135, 24, 0, 57.5), 'ac') + Pth(arc(245, 135, 24, 143.7, 180), 'ac') + Pth(arc(95, 25, 20, 237.5, 323.7), 'ac') +
        T(14, 142, 'A', 'up') + T(256, 142, 'B', 'up') + T(95, 12, 'C', 'up') + T(178, 72, 'a') + T(50, 76, 'b') + T(135, 148, 'c') + T(104, 92, 'h'));
    },
    // circle with a sector: radius r, angle θ, arc s
    sector(lang) {
      const O = [95, 95], r = 72, t = 62 * Math.PI / 180, P1 = [O[0] + r, O[1]], P2 = [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)];
      return svg(260, 180, C(O[0], O[1], r) + `<path d="M${O}L${P1}A${r},${r} 0 0 0 ${P2.map(v => v.toFixed(1))}Z" class="fl"/>` +
        L(...O, ...P1) + L(...O, ...P2) + `<path d="M${P1}A${r},${r} 0 0 0 ${P2.map(v => v.toFixed(1))}" class="ac"/>` + Pth(arc(...O, 18, 0, 62), 'ln') +
        D(...O) + T(128, 106, 'r') + T(124, 78, 'θ', 'sm') + T(168, 44, 's') + T(205, 120, w(lang, 'arc|arc|arco|弧|弧') + ' s = rθ', 'tl'));
    },
    // inscribed angle = half the central angle
    inscribed(lang) {
      const O = [125, 92], r = 66, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
      const A = P(205), B = P(335), Q = P(105);
      return svg(250, 170, C(...O, r) + Pth(`M${A.map(v => v.toFixed(1))}L${Q.map(v => v.toFixed(1))}L${B.map(v => v.toFixed(1))}`, 'ac2') + Pth(`M${A.map(v => v.toFixed(1))}L${O}L${B.map(v => v.toFixed(1))}`, 'ac') +
        Pth(arc(...O, 16, 205, 335), 'ac') + D(...O) + D(...A) + D(...B) + D(...Q) +
        T(O[0], O[1] + 28, '2α', 'sm') + T(Q[0] + 2, Q[1] + 26, 'α', 'sm') + T(A[0] - 10, A[1] + 8, 'A', 'up') + T(B[0] + 10, B[1] + 8, 'B', 'up') + T(O[0] + 10, O[1] - 8, 'O', 'up'));
    },
    // cylinder, cone, sphere
    solids(lang) {
      const e = (cx, cy, rx, ry, c = 'ln') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="${c}"/>`;
      return svg(330, 150,
        e(55, 28, 36, 9) + L(19, 28, 19, 112) + L(91, 28, 91, 112) + `<path d="M19,112A36,9 0 0 0 91,112" class="ln"/>` + `<path d="M19,112A36,9 0 0 1 91,112" class="th"/>` + L(55, 112, 91, 112, 'ac') + L(100, 28, 100, 112, 'th') + T(72, 102, 'r', 'sm') + T(110, 70, 'h', 'sm') +
        L(170, 18, 134, 112) + L(170, 18, 206, 112) + `<path d="M134,112A36,9 0 0 0 206,112" class="ln"/>` + `<path d="M134,112A36,9 0 0 1 206,112" class="th"/>` + L(170, 18, 170, 112, 'th') + L(170, 112, 206, 112, 'ac') + T(188, 102, 'r', 'sm') + T(162, 70, 'h', 'sm') + T(196, 58, 'l', 'sm') +
        C(275, 66, 46) + e(275, 66, 46, 12, 'th') + L(275, 66, 321, 66, 'ac') + D(275, 66, 'dt', 2.6) + T(298, 56, 'r', 'sm') +
        T(55, 138, w(lang, 'cylinder|cylindre|cilindro|円柱|圆柱'), 'tl') + T(170, 138, w(lang, 'cone|cône|cono|円錐|圆锥'), 'tl') + T(275, 138, w(lang, 'sphere|sphère|esfera|球|球'), 'tl'));
    },
    // unit circle: the point (cos θ, sin θ)
    unit(lang) {
      const O = [120, 100], r = 78, t = 50 * Math.PI / 180, P = [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)];
      return svg(250, 195, L(22, 100, 228, 100, 'ax') + L(120, 10, 120, 190, 'ax') + C(...O, r) + L(...O, ...P, 'ac') + L(P[0], P[1], P[0], 100, 'ac2') + L(120, 100, P[0], 100, 'ac2') +
        Pth(arc(...O, 22, 0, 50), 'ln') + D(...P) + T(P[0] + 30, P[1] - 12, '(cos θ, sin θ)', 'sm') + T(150, 88, 'θ', 'sm') + T(140, 112, 'cos θ', 'sm') + T(P[0] + 26, 72, 'sin θ', 'sm') + T(136, 62, '1', 'sm') +
        T(206, 112, '1', 'sm') + T(108, 18, '1', 'sm'));
    },
    // y = A sin(ωx + φ) + D: amplitude and period
    sine(lang) {
      const f = x => 70 - 42 * Math.sin(2 * Math.PI * (x - 30) / 180);
      return svg(320, 150, L(20, 70, 312, 70, 'th') + L(30, 10, 30, 130, 'ax') + Pth(poly(curve(f, 30, 300, 120)), 'ac') +
        `<line x1="75" y1="70" x2="75" y2="30" class="ac2" marker-end="ARROW" marker-start="ARROW"/>` + T(88, 52, 'A') +
        `<line x1="75" y1="122" x2="255" y2="122" class="ln" marker-end="ARROW" marker-start="ARROW"/>` + L(75, 112, 75, 130, 'th') + L(255, 112, 255, 130, 'th') +
        T(165, 140, w(lang, 'period|période|período|周期|周期') + ' 2π/ω', 'tl') + T(290, 80, w(lang, 'midline|axe|eje|中心線|中线') + ' D', 'tl'));
    },
    // two points: Δx, Δy, distance, slope
    points(lang) {
      return svg(270, 165, L(20, 145, 255, 145, 'ax') + L(30, 10, 30, 155, 'ax') + L(60, 125, 225, 35, 'ac') + L(60, 125, 225, 125, 'th') + L(225, 125, 225, 35, 'th') + right(225, 125, -1, -1, 9) +
        D(60, 125) + D(225, 35) + D(142.5, 80, 'dtc') + T(60, 108, '(x₁, y₁)', 'sm') + T(222, 20, '(x₂, y₂)', 'sm') + T(142, 138, 'Δx', 'sm') + T(244, 82, 'Δy', 'sm') + T(126, 66, 'd', 'sm') + T(166, 94, 'M', 'up'));
    },
    // ellipse with foci
    ellipse(lang) {
      const a = 110, b = 58, c = Math.sqrt(a * a - b * b), O = [140, 80], th = 1.0, P = [O[0] + a * Math.cos(th), O[1] - b * Math.sin(th)];
      return svg(280, 160, L(15, 80, 265, 80, 'ax') + L(140, 10, 140, 150, 'ax') + `<ellipse cx="140" cy="80" rx="${a}" ry="${b}" class="ac"/>` + `<ellipse cx="140" cy="80" rx="${a}" ry="${b}" class="fl"/>` +
        L(O[0] - c, 80, ...P, 'ac2') + L(O[0] + c, 80, ...P, 'ac2') + D(O[0] - c, 80) + D(O[0] + c, 80) + D(...P) +
        T(O[0] - c, 94, 'F₁', 'sm') + T(O[0] + c, 94, 'F₂', 'sm') + T(P[0] + 10, P[1] - 12, 'P', 'up') + T(196, 92, 'a', 'sm') + T(131, 52, 'b', 'sm') + T(115, 94, 'c', 'sm') +
        T(140, 152, 'PF₁ + PF₂ = 2a', 'tl'));
    },
    // parabola with focus and directrix
    parabola(lang) {
      const f = x => 125 - (x - 140) * (x - 140) / 120;
      const P = [215, f(215)];
      return svg(280, 175, L(20, 125, 260, 125, 'ax') + L(140, 10, 140, 170, 'ax') + Pth(poly(curve(f, 40, 240)), 'ac') + L(20, 155, 260, 155, 'ac2') +
        L(140, 95, ...P, 'th') + L(P[0], P[1], P[0], 155, 'th') + D(140, 95) + D(...P) + D(140, 125, 'dtc') +
        T(124, 92, 'F', 'up') + T(P[0] + 12, P[1] - 10, 'P', 'up') + T(150, 140, 'p', 'sm') + T(150, 110, 'p', 'sm') + T(62, 166, w(lang, 'directrix|directrice|directriz|準線|准线'), 'tl') + T(212, 20, 'PF = Pd', 'tl'));
    },
    // hyperbola with asymptotes
    hyperbola(lang) {
      const a = 48, b = 34, O = [140, 85], c = Math.sqrt(a * a + b * b);
      const br = s => { const q = []; for (let k = -30; k <= 30; k++) { const t = k / 20; q.push([O[0] + s * a * Math.cosh(t), O[1] - b * Math.sinh(t)]); } return poly(q); };
      return svg(280, 170, L(15, 85, 265, 85, 'ax') + L(140, 8, 140, 162, 'ax') + L(O[0] - 130, O[1] + 130 * b / a, O[0] + 130, O[1] - 130 * b / a, 'th') + L(O[0] - 130, O[1] - 130 * b / a, O[0] + 130, O[1] + 130 * b / a, 'th') +
        Pth(br(1), 'ac') + Pth(br(-1), 'ac') + D(O[0] - c, 85) + D(O[0] + c, 85) + D(O[0] - a, 85, 'dtc') + D(O[0] + a, 85, 'dtc') +
        T(O[0] - c, 99, 'F₁', 'sm') + T(O[0] + c, 99, 'F₂', 'sm') + T(O[0] + a / 2, 74, 'a', 'sm') + T(140, 150, 'y = ±(b/a)x', 'tl'));
    },
    // Heron: a triangle with sides a, b, c and the semi-perimeter as half of the unrolled perimeter
    heron(lang) {
      const A = [30, 100], B = [190, 100], Cc = [80, 22];
      const per = 160 + Math.hypot(50, 78) + Math.hypot(110, 78), k = 240 / per, la = Math.hypot(110, 78) * k, lb = Math.hypot(50, 78) * k, lc = 160 * k, x0 = 20;
      return svg(280, 160, Pth(`M${A}L${B}L${Cc}Z`, 'fl') + L(...A, ...B, 'ac') + L(...B, ...Cc, 'ac2') + L(...Cc, ...A, 'ln') + T(110, 112, 'c', 'up') + T(146, 52, 'a', 'up') + T(44, 56, 'b', 'up') +
        L(x0, 132, x0 + lc, 132, 'ac') + L(x0 + lc, 132, x0 + lc + la, 132, 'ac2') + L(x0 + lc + la, 132, x0 + lc + la + lb, 132, 'ln') + L(x0 + 120, 124, x0 + 120, 140, 'th') +
        T(x0 + 60, 148, 's', 'up') + T(x0 + 180, 148, 's', 'up') + T(236, 40, w(lang, 'perimeter = 2s|périmètre = 2s|perímetro = 2s|周の長さ = 2s|周长 = 2s'), 'tl') + T(236, 60, 'S = √(s(s−a)(s−b)(s−c))', 'tl'));
    },
    // ---------- conics: every figure is drawn from its equation in a maths frame
    // circle (x − a)² + (y − b)² = r² with centre, radius and the tangent at a point
    circle2(lang) {
      const P = frame(10, 8, 260, 150, [-1.5, 6.5], [-0.8, 3.8]), a = 2, b = 1.5, r = 1.6, t = 0.75, T0 = [a + r * Math.cos(t), b + r * Math.sin(t)];
      const tan = s => [T0[0] - s * Math.sin(t), T0[1] + s * Math.cos(t)];
      return svg(280, 166, L(...P(-1.4, 0), ...P(6.4, 0), 'ax') + L(...P(0, -0.7), ...P(0, 3.7), 'ax') + C(...P(a, b), r * 260 / 8, 'fl') + C(...P(a, b), r * 260 / 8, 'ac') +
        L(...P(a, b), ...P(...T0), 'ln') + L(...P(...tan(-1.6)), ...P(...tan(1.6)), 'ac2') + D(...P(a, b)) + D(...P(...T0)) +
        T(...P(a - 0.25, b - 0.25), 'C', 'up') + T(...P(a + 0.55, b + 0.85), 'r', 'sm') + T(...P(T0[0] + 0.3, T0[1] + 0.05), 'T', 'up') +
        T(214, 30, w(lang, 'tangent ⟂ radius|tangente ⟂ rayon|tangente ⟂ radio|接線 ⟂ 半径|切线 ⟂ 半径'), 'tl') + T(214, 140, '(x − a)² + (y − b)² = r²', 'tl'));
    },
    // a line and a circle: secant, tangent, outside, decided by d against r
    linecircle(lang) {
      const one = (x0, d, lab) => C(x0, 70, 30, 'ac') + L(x0 - 42, 70 - d, x0 + 42, 70 - d, 'ac2') + L(x0, 70, x0, 70 - d, 'th') + D(x0, 70) + T(x0, 128, lab, 'tl');
      return svg(280, 140, one(48, 14, 'd < r: 2') + one(140, 30, 'd = r: 1') + one(232, 44, 'd > r: 0') + D(48 - 26.5, 56, 'dtc') + D(48 + 26.5, 56, 'dtc') + D(140, 40, 'dtc'));
    },
    // the slope of a line and a perpendicular line
    lines2(lang) {
      const P = frame(14, 8, 252, 140, [-1, 6], [-0.6, 3.6]);
      return svg(280, 160, L(...P(-0.9, 0), ...P(5.9, 0), 'ax') + L(...P(0, -0.5), ...P(0, 3.5), 'ax') + L(...P(-0.5, 0.25), ...P(5.5, 3.25), 'ac') +
        L(...P(1, 0.75), ...P(3, 0.75), 'th') + L(...P(3, 0.75), ...P(3, 1.75), 'th') + T(...P(2, 0.5), 'Δx', 'sm') + T(...P(3.4, 1.25), 'Δy', 'sm') + Pth(arc(...P(-0.5, 0.25), 26, 0, 26.6), 'ln') + T(...P(0.45, 0.42), 'α', 'sm') +
        L(...P(3.6, 3.4), ...P(5.2, 0.2), 'ac2') + T(...P(5.35, 0.55), 'm₂ = −1/m₁', 'sm') + T(...P(1.4, 2.9), 'm = Δy/Δx = tan α', 'tl'));
    },
    // ellipse: a, b, c and the right triangle b² + c² = a²
    ellfoci(lang) {
      const a = 3, b = 1.8, c = 2.4, P = frame(14, 8, 252, 150, [-3.6, 3.6], [-2.1, 2.1]);
      const E = poly(curve(t => t, 0, 2 * Math.PI, 90).map(([t]) => P(a * Math.cos(t), b * Math.sin(t))));
      return svg(280, 168, L(...P(-3.5, 0), ...P(3.5, 0), 'ax') + L(...P(0, -2), ...P(0, 2), 'ax') + Pth(E, 'fl') + Pth(E, 'ac') +
        L(...P(0, b), ...P(c, 0), 'ac2') + L(...P(0, 0), ...P(c, 0), 'ln') + L(...P(0, 0), ...P(0, b), 'ln') + D(...P(-c, 0)) + D(...P(c, 0)) +
        T(...P(1.5, 1.2), 'a', 'up') + T(...P(-0.25, 0.9), 'b', 'up') + T(...P(1.2, -0.25), 'c', 'up') + T(...P(-c, -0.35), 'F₁', 'sm') + T(...P(c, -0.35), 'F₂', 'sm') + T(...P(0, -1.6), 'c² = a² − b²', 'tl'));
    },
    // the eccentricity: from the circle (e = 0) to flatter and flatter ellipses
    ecc(lang) {
      const P = frame(14, 4, 252, 128, [-5.6, 5.6], [-2.85, 2.85]); let body = L(...P(-5.5, 0), ...P(5.5, 0), 'ax');
      [[0, 'ac'], [0.6, 'ln'], [0.85, 'ac2'], [0.97, 'th']].forEach(([e, c]) => { const a = 2.7, b = a * Math.sqrt(1 - e * e); body += Pth(poly(curve(t => t, 0, 2 * Math.PI, 90).map(([t]) => P(a * Math.cos(t), b * Math.sin(t)))), c); });
      return svg(280, 150, body + T(...P(-3.7, 2.2), 'e = 0', 'sm') + T(...P(3.5, 1.75), 'e = 0.6', 'sm') + T(...P(3.6, 1.0), '0.85', 'sm') + T(...P(3.6, 0.35), '0.97', 'sm') + T(140, 142, w(lang, 'e = c/a: 0 is a circle, near 1 very flat|e = c/a : 0 cercle, près de 1 très aplatie|e = c/a: 0 circunferencia, cerca de 1 muy achatada|e = c/a：0 は円、1 に近いほど扁平|e = c/a：0 为圆，越接近 1 越扁'), 'tl'));
    },
    // the parametrisation (a cos t, b sin t) with the auxiliary circle
    ellparam(lang) {
      const a = 2, b = 1.15, t = 0.9, P = frame(14, 6, 252, 156, [-3.5, 3.5], [-2.17, 2.17]);
      const E = poly(curve(u => u, 0, 2 * Math.PI, 90).map(([u]) => P(a * Math.cos(u), b * Math.sin(u))));
      const Q = [a * Math.cos(t), a * Math.sin(t)], M = [a * Math.cos(t), b * Math.sin(t)];
      return svg(280, 168, L(...P(-3.4, 0), ...P(3.4, 0), 'ax') + L(...P(0, -2.1), ...P(0, 2.1), 'ax') + C(...P(0, 0), a * 252 / 7, 'th') + Pth(E, 'fl') + Pth(E, 'ac') +
        L(...P(0, 0), ...P(...Q), 'ln') + L(...P(...Q), ...P(Q[0], 0), 'th') + D(...P(...M)) + D(...P(...Q), 'dtc') + Pth(arc(...P(0, 0), 18, 0, t * 180 / Math.PI), 'ln') +
        T(...P(0.75, 0.3), 't', 'sm') + T(...P(M[0] + 1.25, M[1] - 0.15), '(a cos t, b sin t)', 'sm') + T(...P(-2.6, -1.85), 'S = πab', 'tl'));
    },
    // parabola y² = 4px opening right and x² = 4py opening up, with foci
    parab2(lang) {
      const P = frame(10, 8, 125, 132, [-1, 4], [-2.8, 2.8]), Q = frame(148, 8, 125, 132, [-2.6, 2.6], [-0.6, 4.4]), p = 0.7;
      return svg(280, 160, L(...P(-0.9, 0), ...P(3.9, 0), 'ax') + L(...P(0, -2.7), ...P(0, 2.7), 'ax') + Pth(poly(curve(y => y, -2.7, 2.7).map(([y]) => P(y * y / (4 * p), y))), 'ac') + D(...P(p, 0)) + L(...P(-p, -2.6), ...P(-p, 2.6), 'ac2') + T(...P(p + 0.2, -0.45), 'F(p, 0)', 'sm') + T(72, 152, 'y² = 4px', 'tl') +
        L(...Q(-2.5, 0), ...Q(2.5, 0), 'ax') + L(...Q(0, -0.5), ...Q(0, 4.3), 'ax') + Pth(poly(curve(x => x * x / (4 * p), -2.4, 2.4).map(([x, y]) => Q(x, y)).filter(q => q[1] > 6)), 'ac') + D(...Q(0, p)) + L(...Q(-2.5, -p), ...Q(2.5, -p), 'ac2') + T(...Q(0.85, p), 'F(0, p)', 'sm') + T(210, 152, 'x² = 4py', 'tl'));
    },
    // vertex form y = a(x − h)² + k: the vertex (h, k) and the axis x = h
    vertexform(lang) {
      const P = frame(14, 8, 252, 140, [-1, 5], [-0.5, 4.2]), h = 2.2, k = 0.8;
      return svg(280, 160, L(...P(-0.9, 0), ...P(4.9, 0), 'ax') + L(...P(0, -0.4), ...P(0, 4.1), 'ax') + Pth(poly(curve(x => 0.8 * (x - h) ** 2 + k, -0.2, 4.6).map(([x, y]) => P(x, y))), 'ac') +
        L(...P(h, -0.3), ...P(h, 4.1), 'th') + D(...P(h, k)) + L(...P(h, k), ...P(h, 0), 'ln') + L(...P(0, k), ...P(h, k), 'th') + T(...P(h + 0.55, k - 0.2), '(h, k)', 'sm') + T(...P(h + 0.45, 3.9), 'x = h', 'sm') + T(...P(-0.4, k), 'k', 'sm') + T(...P(h, -0.3), 'h', 'sm') +
        T(70, 132, 'a > 0: ∪', 'tl'));
    },
    // hyperbola: c² = a² + b², the box a × b and the asymptotes through its corners
    hypfoci(lang) {
      const a = 1.4, b = 1, c = Math.hypot(a, b), P = frame(14, 6, 252, 150, [-3.7, 3.7], [-2.2, 2.2]);
      const br = s => Pth(poly(curve(u => u, -1.6, 1.6).map(([u]) => P(s * a * Math.cosh(u), b * Math.sinh(u)))), 'ac');
      return svg(280, 162, L(...P(-3.6, 0), ...P(3.6, 0), 'ax') + L(...P(0, -2.1), ...P(0, 2.1), 'ax') + Pth('M' + [P(-a, -b), P(a, -b), P(a, b), P(-a, b)].map(q => q.join(',')).join('L') + 'Z', 'fl') + Pth('M' + [P(-a, -b), P(a, -b), P(a, b), P(-a, b)].map(q => q.join(',')).join('L') + 'Z', 'th') +
        L(...P(-3.1, -3.1 * b / a), ...P(3.1, 3.1 * b / a), 'th') + L(...P(-3.1, 3.1 * b / a), ...P(3.1, -3.1 * b / a), 'th') + br(1) + br(-1) + L(...P(0, 0), ...P(a, b), 'ac2') + D(...P(-c, 0)) + D(...P(c, 0)) +
        T(...P(0.5, 0.75), 'c', 'up') + T(...P(a / 2, -1.25), 'a', 'sm') + T(...P(a + 0.25, -0.5), 'b', 'sm') + T(...P(-c, -0.35), 'F₁', 'sm') + T(...P(c, -0.35), 'F₂', 'sm') + T(...P(0, 1.95), 'c² = a² + b²', 'tl'));
    },
    // hyperbola definition |PF₁ − PF₂| = 2a
    hypdef(lang) {
      const a = 1.3, b = 1, c = Math.hypot(a, b), P = frame(14, 6, 252, 150, [-3.7, 3.7], [-2.2, 2.2]), u = 0.9, Q = [a * Math.cosh(u), b * Math.sinh(u)];
      const br = s => Pth(poly(curve(t => t, -1.6, 1.6).map(([t]) => P(s * a * Math.cosh(t), b * Math.sinh(t)))), 'ac');
      return svg(280, 162, L(...P(-3.6, 0), ...P(3.6, 0), 'ax') + br(1) + br(-1) + L(...P(-c, 0), ...P(...Q), 'ac2') + L(...P(c, 0), ...P(...Q), 'ac2') + D(...P(-c, 0)) + D(...P(c, 0)) + D(...P(...Q)) +
        D(...P(-a, 0), 'dtc') + D(...P(a, 0), 'dtc') + T(...P(-c, -0.35), 'F₁', 'sm') + T(...P(c + 0.1, -0.35), 'F₂', 'sm') + T(...P(Q[0] + 0.25, Q[1] + 0.2), 'P', 'up') + T(...P(0, -0.35), '2a', 'sm') + T(140, 154, '|PF₁ − PF₂| = 2a', 'tl'));
    },
    // rectangular hyperbola xy = k (k > 0 and k < 0)
    recthyp(lang) {
      const P = frame(14, 6, 252, 150, [-4, 4], [-2.4, 2.4]), f = x => 1.5 / x;
      return svg(280, 162, L(...P(-3.9, 0), ...P(3.9, 0), 'ax') + L(...P(0, -2.3), ...P(0, 2.3), 'ax') + Pth(plot(f, 0.6, 3.9, P, -2.4, 2.4), 'ac') + Pth(plot(f, -3.9, -0.6, P, -2.4, 2.4), 'ac') +
        Pth(plot(x => -1.5 / x, 0.6, 3.9, P, -2.4, 2.4), 'ac2') + Pth(plot(x => -1.5 / x, -3.9, -0.6, P, -2.4, 2.4), 'ac2') + T(...P(2.6, 1.05), 'xy = k > 0', 'sm') + T(...P(2.6, -1.05), 'k < 0', 'sm') +
        T(70, 152, w(lang, 'asymptotes: the axes|asymptotes : les axes|asíntotas: los ejes|漸近線：座標軸|渐近线：坐标轴'), 'tl'));
    },
    // tangent lines: ellipse at a point, parabola with the reflection property
    conictan(lang) {
      const P = frame(6, 8, 140, 130, [-3.4, 3.4], [-2.6, 3.4]), a = 3, b = 1.8, t = 0.8, T0 = [a * Math.cos(t), b * Math.sin(t)];
      const E = poly(curve(u => u, 0, 2 * Math.PI, 90).map(([u]) => P(a * Math.cos(u), b * Math.sin(u))));
      const tl = x => (1 - x * T0[0] / (a * a)) * b * b / T0[1];
      const Q = frame(150, 8, 128, 130, [-0.5, 4.2], [-2.6, 2.6]), p = 0.8, y0 = 1.6, x0 = y0 * y0 / (4 * p);
      return svg(280, 158, L(...P(-3.3, 0), ...P(3.3, 0), 'ax') + Pth(E, 'ac') + L(...P(0.3, tl(0.3)), ...P(3.4, tl(3.4)), 'ac2') + D(...P(...T0)) + T(...P(T0[0] - 0.45, T0[1] - 0.3), 'P', 'up') + T(76, 150, 'xx₀/a² + yy₀/b² = 1', 'tl') +
        L(...Q(-0.4, 0), ...Q(4.1, 0), 'ax') + Pth(poly(curve(y => y, -2.5, 2.5).map(([y]) => Q(y * y / (4 * p), y))), 'ac') + D(...Q(p, 0)) + L(...Q(p, 0), ...Q(x0, y0), 'th') + L(...Q(x0, y0), ...Q(4.2, y0), 'th') +
        L(...Q(-0.4, (2 * p * (-0.4 + x0)) / y0), ...Q(3.2, (2 * p * (3.2 + x0)) / y0), 'ac2') + D(...Q(x0, y0)) + T(...Q(p, -0.35), 'F', 'up') + T(214, 150, 'yy₀ = 2p(x + x₀)', 'tl'));
    },
    // latus rectum and focal chord of a parabola
    latus(lang) {
      const P = frame(40, 6, 150, 150, [-1.4, 5], [-3.2, 3.2]), p = 1;
      const yA = -1.2, xA = yA * yA / 4, yB = -4 * p * p / yA, xB = yB * yB / 4;
      return svg(280, 162, L(...P(-1.1, 0), ...P(4.9, 0), 'ax') + L(...P(0, -3.1), ...P(0, 3.1), 'ax') + Pth(poly(curve(y => y, -3.1, 3.1).map(([y]) => P(y * y / 4, y))), 'ac') + L(...P(-p, -3.1), ...P(-p, 3.1), 'th') +
        L(...P(p, -2 * p), ...P(p, 2 * p), 'ac2') + L(...P(xA, yA), ...P(xB, yB), 'ln') + D(...P(p, 0)) + D(...P(xA, yA)) + D(...P(xB, yB)) + D(...P(p, 2)) + D(...P(p, -2)) +
        T(...P(p + 0.35, -0.3), 'F', 'up') + T(...P(p + 0.45, 1.2), '4p', 'sm') + T(...P(xA - 0.15, yA - 0.35), 'A', 'up') + T(...P(xB + 0.3, yB), 'B', 'up') + T(236, 70, '|AB| =', 'tl') + T(236, 86, 'x₁ + x₂ + 2p', 'tl') + T(236, 112, w(lang, 'latus rectum: 4p|corde focale ⟂ : 4p|lado recto: 4p|通径：4p|通径：4p'), 'tl'));
    },
    // a chord of an ellipse with its midpoint M
    chordmid(lang) {
      const a = 3, b = 1.8, P = frame(14, 6, 252, 150, [-3.6, 3.6], [-2.1, 2.1]), M = [1.1, 0.6], m = -(b * b * M[0]) / (a * a * M[1]);
      // the chord through M with slope m meets the ellipse where x²/a² + (M₁ + m(x − M₀))²/b² = 1
      const A2 = 1 / (a * a) + m * m / (b * b), B2 = 2 * m * (M[1] - m * M[0]) / (b * b), C2 = (M[1] - m * M[0]) ** 2 / (b * b) - 1, dsc = Math.sqrt(B2 * B2 - 4 * A2 * C2);
      const x1 = (-B2 - dsc) / (2 * A2), x2 = (-B2 + dsc) / (2 * A2), y = x => M[1] + m * (x - M[0]);
      const E = poly(curve(u => u, 0, 2 * Math.PI, 90).map(([u]) => P(a * Math.cos(u), b * Math.sin(u))));
      return svg(280, 162, L(...P(-3.5, 0), ...P(3.5, 0), 'ax') + L(...P(0, -2), ...P(0, 2), 'ax') + Pth(E, 'ac') + L(...P(x1, y(x1)), ...P(x2, y(x2)), 'ac2') + L(...P(0, 0), ...P(...M), 'th') +
        D(...P(x1, y(x1))) + D(...P(x2, y(x2))) + D(...P(...M), 'dtc') + T(...P(M[0] + 0.25, M[1] + 0.3), 'M', 'up') + T(140, 154, 'm_AB · m_OM = −b²/a²', 'tl'));
    },
    // one focus, one directrix, several eccentricities: circle-like, ellipse, parabola, hyperbola
    conicfamily(lang) {
      const P = frame(10, 6, 260, 150, [-3.3, 5.3], [-2.6, 2.6]), pdist = 1.4;
      const conic = (e, c) => { let d = '', pen = false; for (let k = 0; k <= 360; k++) { const th = -Math.PI + 2 * Math.PI * k / 360, den = 1 + e * Math.cos(th); if (den < 0.06) { pen = false; continue; } const r = e * pdist / den, x = r * Math.cos(th), y = r * Math.sin(th);
        if (Math.abs(x) > 5.2 || Math.abs(y) > 2.6) { pen = false; continue; } const [X, Y] = P(x, y); d += (pen ? 'L' : 'M') + X.toFixed(1) + ',' + Y.toFixed(1); pen = true; } return Pth(d, c); };
      return svg(280, 162, L(...P(-3.2, 0), ...P(5.2, 0), 'ax') + L(...P(pdist, -2.5), ...P(pdist, 2.5), 'ac2') + conic(0.5, 'ln') + conic(1, 'ac') + conic(1.8, 'th') + D(...P(0, 0)) + T(...P(-0.2, -0.3), 'F', 'up') +
        T(...P(-1.5, 0.75), 'e = ½', 'sm') + T(...P(-2.6, 2.0), 'e = 1', 'sm') + T(...P(0.7, 2.2), 'e = 1.8', 'sm') + T(...P(pdist + 0.2, -2.3), 'ℓ', 'up') + T(210, 150, 'PF = e · d(P, ℓ)', 'tl'));
    },
    // a line in space: point P₀, direction d, points P₀ + t d (oblique axes)
    line3d(lang) {
      const O = [70, 120], X = [-40, 30], Y = [172, 0], Z = [0, -100];
      const ax = (v, s) => `<line x1="${O[0]}" y1="${O[1]}" x2="${O[0] + v[0]}" y2="${O[1] + v[1]}" class="ax" marker-end="ARROW"/>` + T(O[0] + v[0] * 1.1, O[1] + v[1] * 1.1, s, 'sm');
      const P0 = [120, 92], d = [44, -26];
      const pt = t => [P0[0] + t * d[0], P0[1] + t * d[1]];
      return svg(280, 160, ax(X, 'x') + ax(Y, 'y') + ax(Z, 'z') + L(...pt(-1.6), ...pt(3.1), 'ac') +
        `<line x1="${P0[0]}" y1="${P0[1]}" x2="${pt(1)[0]}" y2="${pt(1)[1]}" class="ac2" marker-end="ARROW"/>` + L(O[0], O[1], P0[0], P0[1], 'th') +
        D(...P0) + D(...pt(2.2), 'dtc') + T(P0[0] - 6, P0[1] + 16, 'P₀', 'up') + T(pt(0.55)[0] + 4, pt(0.55)[1] - 14, 'd', 'up') + T(pt(2.2)[0] + 4, pt(2.2)[1] + 18, 'P₀ + t d', 'sm') + T(250, 18, 'ℓ', 'up'));
    },
    // a plane with its normal, a line crossing it and the distance from a point
    plane3d(lang) {
      const A = [30, 120], B = [180, 120], C = [250, 70], Dd = [100, 70];
      const M = [140, 95], N = [140, 30], Q = [210, 40], H = [210, 92];
      return svg(280, 150, Pth(`M${A}L${B}L${C}L${Dd}Z`, 'fl') + Pth(`M${A}L${B}L${C}L${Dd}Z`) +
        `<line x1="${M[0]}" y1="${M[1]}" x2="${N[0]}" y2="${N[1]}" class="ac" marker-end="ARROW"/>` + T(152, 34, 'n', 'up') +
        L(60, 28, 140, 95, 'ac2') + L(140, 95, 164, 115, 'th') + L(164, 115, 190, 137, 'ac2') + D(140, 95) + T(124, 104, 'P', 'up') + T(60, 18, 'ℓ', 'up') +
        L(...Q, ...H, 'th') + D(...Q) + D(...H, 'dtc') + T(222, 34, 'Q', 'up') + T(222, 66, 'd', 'sm') + T(58, 112, 'π', 'up') +
        T(84, 140, 'Ax + By + Cz + D = 0', 'tl'));
    },
    // angles in space: a line through a plane (θ against its shadow) and two planes with their normals
    angle3d(lang) {
      const pl = (pts, c) => Pth('M' + pts.map(p => p.join(',')).join('L') + 'Z', c);
      return svg(300, 150,
        pl([[10, 120], [120, 120], [150, 90], [40, 90]], 'fl') + pl([[10, 120], [120, 120], [150, 90], [40, 90]], 'ln') +
        L(48, 128, 120, 52, 'ac2') + L(84, 105, 120, 105, 'th') + L(120, 52, 120, 105, 'th') + Pth(arc(84, 105, 18, 0, 47), 'ac') + D(84, 105) + T(108, 100, 'θ', 'sm') + T(126, 50, 'ℓ', 'up') +
        T(80, 142, w(lang, 'sin θ: line with plane|sin θ : droite et plan|sin θ: recta y plano|sin θ：直線と平面|sin θ：线与面'), 'tl') +
        pl([[175, 125], [275, 125], [290, 100], [190, 100]], 'fl') + pl([[175, 125], [275, 125], [290, 100], [190, 100]], 'ln') +
        pl([[190, 112], [280, 112], [250, 40], [160, 40]], 'fl2') + pl([[190, 112], [280, 112], [250, 40], [160, 40]], 'ln') +
        `<line x1="232" y1="112" x2="232" y2="62" class="ac" marker-end="ARROW"/>` + `<line x1="232" y1="112" x2="268" y2="92" class="ac2" marker-end="ARROW"/>` +
        T(220, 60, 'n₁', 'sm') + T(270, 86, 'n₂', 'sm') + T(232, 142, w(lang, 'cos θ: normals|cos θ : normales|cos θ: normales|cos θ：法線|cos θ：法向量'), 'tl'));
    },
    // distances: point to plane (foot H) and skew lines with their common perpendicular
    dist3d(lang) {
      const pl = (pts, c) => Pth('M' + pts.map(p => p.join(',')).join('L') + 'Z', c);
      return svg(300, 150,
        pl([[10, 125], [125, 125], [150, 95], [35, 95]], 'fl') + pl([[10, 125], [125, 125], [150, 95], [35, 95]], 'ln') +
        L(80, 30, 80, 110, 'ac') + D(80, 30) + D(80, 110, 'dtc') + right(80, 110, 1, -1, 8) + T(66, 26, 'Q', 'up') + T(66, 120, 'H', 'up') + T(88, 74, 'd', 'up') + T(18, 112, 'π', 'up') +
        T(80, 143, w(lang, 'point – plane|point – plan|punto – plano|点と平面|点到平面'), 'tl') +
        L(170, 40, 290, 40, 'ac2') + L(190, 128, 280, 84, 'ac2') + L(236, 40, 236, 106, 'ac') + D(236, 40) + D(236, 106) + right(236, 40, 1, 1, 8) +
        T(292, 34, 'ℓ₁', 'sm') + T(282, 80, 'ℓ₂', 'sm') + T(244, 78, 'd', 'up') + T(232, 143, w(lang, 'skew lines: common perpendicular|droites non coplanaires|rectas que se cruzan|ねじれ：共通垂線|异面直线：公垂线'), 'tl'));
    },
    // intersections: a line piercing a plane, two planes meeting in a line
    inter3d(lang) {
      const pl = (pts, c) => Pth('M' + pts.map(p => p.join(',')).join('L') + 'Z', c);
      return svg(300, 150,
        pl([[10, 120], [120, 120], [150, 85], [40, 85]], 'fl') + pl([[10, 120], [120, 120], [150, 85], [40, 85]], 'ln') +
        L(50, 20, 80, 102, 'ac2') + L(80, 102, 86, 118, 'th') + L(86, 118, 92, 136, 'ac2') + D(80, 102) + T(90, 100, 'P', 'up') +
        T(80, 143, w(lang, 'one point: solve for t|un point : trouver t|un punto: hallar t|1 点：t を求める|一个点：解出 t'), 'tl') +
        pl([[170, 120], [290, 120], [270, 80], [150, 80]], 'fl') + pl([[170, 120], [290, 120], [270, 80], [150, 80]], 'ln') +
        pl([[175, 100], [280, 100], [250, 25], [145, 25]], 'fl2') + pl([[175, 100], [280, 100], [250, 25], [145, 25]], 'ln') +
        L(163, 100, 285, 100, 'ac') + T(258, 94, 'n₁ × n₂', 'sm') + T(222, 143, w(lang, 'two planes: a line|deux plans : une droite|dos planos: una recta|2 平面：直線|两平面：一条直线'), 'tl'));
    },
    // relative positions of two lines: meeting, parallel, skew
    pos3d(lang) {
      const lab = (x, s) => T(x + 30, 140, s, 'tl');
      return svg(300, 150,
        L(15, 110, 85, 30, 'ac') + L(10, 50, 90, 100, 'ac2') + D(55, 75) + lab(20, w(lang, 'meet|sécantes|se cortan|交わる|相交')) +
        L(110, 110, 175, 30, 'ac') + L(130, 115, 195, 35, 'ac2') + lab(118, w(lang, 'parallel|parallèles|paralelas|平行|平行')) +
        L(210, 105, 295, 70, 'ac') + L(225, 40, 252.4, 78.9, 'ac2') + L(261.6, 92, 285, 125, 'ac2') +
        lab(226, w(lang, 'skew|non coplanaires|se cruzan|ねじれ|异面')) + T(252, 22, w(lang, 'triple product ≠ 0|produit mixte ≠ 0|producto mixto ≠ 0|三重積 ≠ 0|混合积 ≠ 0'), 'tl'));
    },
    // the foot H of the perpendicular from Q and the reflection Q′
    reflect3d(lang) {
      const pl = (pts, c) => Pth('M' + pts.map(p => p.join(',')).join('L') + 'Z', c);
      return svg(280, 160,
        pl([[20, 95], [200, 95], [250, 60], [70, 60]], 'fl') + pl([[20, 95], [200, 95], [250, 60], [70, 60]], 'ln') +
        L(140, 15, 140, 78, 'ac') + L(140, 78, 140, 140, 'th') + D(140, 15) + D(140, 78, 'dtc') + D(140, 140, 'dt') + right(140, 78, 1, -1, 8) +
        `<line x1="100" y1="78" x2="100" y2="40" class="ac2" marker-end="ARROW"/>` + T(86, 42, 'n', 'up') +
        T(150, 18, 'Q', 'up') + T(150, 82, 'H', 'up') + T(150, 146, 'Q′', 'up') + T(214, 146, 'Q′ = Q − 2λn', 'sm') + T(30, 88, 'π', 'up') + T(160, 50, 'λn', 'sm') +
        T(62, 130, w(lang, 'H: midpoint of QQ′|H : milieu de QQ′|H: punto medio de QQ′|H：QQ′ の中点|H：QQ′ 的中点'), 'tl'));
    },
    // a sphere cut by a plane: distance d, radius r, circle of radius ρ
    sphereplane(lang) {
      const O = [100, 92], r = 62;
      return svg(280, 175, C(O[0], O[1], r, 'ln') + `<ellipse cx="${O[0]}" cy="${O[1]}" rx="${r}" ry="14" class="th"/>` +
        Pth(`M12,60L178,60L212,34L46,34Z`, 'fl') + Pth(`M12,60L178,60L212,34L46,34Z`, 'ln') +
        `<ellipse cx="${O[0]}" cy="47" rx="44" ry="8" class="ac"/>` + D(...O) + L(O[0], O[1], O[0], 47, 'ac2') + L(O[0], 47, O[0] + 44, 47, 'ac2') + L(O[0], O[1], O[0] + 44, 47, 'th') +
        T(O[0] - 10, 74, 'd', 'up') + T(O[0] + 22, 42, 'ρ', 'up') + T(O[0] + 30, 78, 'r', 'up') + T(O[0] - 12, O[1] + 14, 'C', 'up') +
        T(232, 100, 'ρ² = r² − d²', 'tl') + T(232, 120, w(lang, 'd = r: tangent|d = r : tangent|d = r: tangente|d = r：接する|d = r：相切'), 'tl'));
    },
    // Sarrus' rule: copy two columns, ↘ diagonals +, ↙ diagonals −
    sarrus(lang) {
      const E = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']], X = k => 40 + k * 46, Y = r => 28 + r * 40;
      let body = '';
      for (let k = 0; k < 3; k++) body += L(X(k) - 4, Y(0) - 8, X(k + 2) + 4, Y(2) + 8, 'ac') + L(X(k + 2) + 4, Y(0) - 8, X(k) - 4, Y(2) + 8, 'ac2');
      for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) body += T(X(k), Y(r), E[r][k % 3], k > 2 ? 'hb fade' : 'hb');
      body += L(X(0) - 18, Y(0) - 16, X(0) - 18, Y(2) + 16) + L(X(2) + 18, Y(0) - 16, X(2) + 18, Y(2) + 16);
      body += T(X(1), 146, '+ : aei, bfg, cdh', 'tl') + T(X(3) + 20, 146, '− : ceg, afh, bdi', 'tl').replace('class="tl"', 'class="tl" style="fill:#c4542f"');
      return svg(290, 158, body);
    },
    // y = f(x) and y = f(x − h) + k
    transform(lang) {
      const O = [40, 130], S = 28, P = (x, y) => [O[0] + x * S, O[1] - y * S];
      const f = x => 0.5 * x * x, g = x => 0.5 * (x - 3) ** 2 + 1.5;
      const pts = (fn, a, b) => poly(curve(x => 0, a, b).map((_, i, arr) => { const x = a + (b - a) * i / (arr.length - 1); return P(x, fn(x)); }));
      return svg(270, 150, L(10, O[1], 262, O[1], 'ax') + L(O[0], 8, O[0], 146, 'ax') +
        Pth(pts(f, -1.2, 2.4), 'ac') + Pth(pts(g, 1.8, 5.4), 'ac2') +
        `<line x1="${P(0, 0)[0]}" y1="${P(0, 0)[1]}" x2="${P(3, 1.5)[0] - 4}" y2="${P(3, 1.5)[1] + 3}" class="th" marker-end="ARROW"/>` +
        D(...P(0, 0)) + D(...P(3, 1.5)) + `<text x="${P(1.2, 3.4)[0]}" y="${P(1.2, 3.4)[1]}" class="lab">y = f(x)</text>` + `<text x="${P(5.4, 4.4)[0] - 18}" y="${P(5.4, 4.4)[1]}" class="lab">y = f(x − h) + k</text>` +
        `<text x="${P(1.5, 0.75)[0] + 30}" y="${P(1.5, 0.75)[1] + 12}" class="lab">(h, k)</text>`);
    },
    // a^x and log_a x, mirror images in y = x
    explog(lang) {
      const O = [95, 115], S = 26, P = (x, y) => [O[0] + x * S, O[1] - y * S];
      const pts = (fn, a, b) => { const q = []; for (let i = 0; i <= 80; i++) { const x = a + (b - a) * i / 80, y = fn(x); if (isFinite(y) && y > -4.2 && y < 4.4) q.push(P(x, y)); } return poly(q); };
      return svg(270, 230, L(10, O[1], 262, O[1], 'ax') + L(O[0], 4, O[0], 226, 'ax') + Pth(pts(x => x, -3.4, 4.2), 'th') +
        Pth(pts(x => 2 ** x, -3.4, 2.1), 'ac') + Pth(pts(x => Math.log2(x), 0.02, 6), 'ac2') +
        D(...P(0, 1)) + D(...P(1, 0)) +
        `<text x="${P(1.6, 3.6)[0] + 30}" y="${P(1.6, 3.6)[1]}" class="lab">y = aˣ</text>` + `<text x="${P(5.2, 2.9)[0]}" y="${P(5.2, 2.9)[1] + 18}" class="lab">y = logₐ x</text>` +
        `<text x="${P(3.6, 4.1)[0]}" y="${P(3.6, 4.1)[1]}" class="lab">y = x</text>` + `<text x="${P(0, 1)[0] - 24}" y="${P(0, 1)[1] - 6}" class="lab">(0, 1)</text>` + `<text x="${P(1, 0)[0] + 6}" y="${P(1, 0)[1] + 16}" class="lab">(1, 0)</text>`);
    },
    // box plot with min, Q1, median, Q3, max
    boxplot(lang) {
      const y = 52, X = [30, 85, 128, 190, 250];
      const names = ['min', 'Q₁', 'Me', 'Q₃', 'max'];
      let body = L(X[0], y, X[1], y) + L(X[3], y, X[4], y) + `<rect x="${X[1]}" y="${y - 22}" width="${X[3] - X[1]}" height="44" class="fl"/>` + `<rect x="${X[1]}" y="${y - 22}" width="${X[3] - X[1]}" height="44" class="ln"/>` +
        L(X[2], y - 22, X[2], y + 22, 'ac') + L(X[0], y - 12, X[0], y + 12) + L(X[4], y - 12, X[4], y + 12);
      X.forEach((x, i) => { body += L(x, y + 26, x, 92, 'th') + `<text x="${x}" y="104" class="lab">${names[i]}</text>`; });
      body += `<line x1="${X[1]}" y1="124" x2="${X[3]}" y2="124" class="ac2" marker-start="ARROW" marker-end="ARROW"/>` + `<text x="${(X[1] + X[3]) / 2}" y="138" class="lab">IQR = Q₃ − Q₁</text>`;
      return svg(280, 148, body);
    },
    // scatter plot with its regression line through the mean point
    regression(lang) {
      const pts = [[30, 120], [48, 104], [60, 112], [76, 92], [92, 96], [104, 78], [122, 82], [136, 64], [150, 70], [168, 52], [184, 58], [204, 38]];
      const mx = pts.reduce((a, p) => a + p[0], 0) / pts.length, my = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      let sxy = 0, sxx = 0; pts.forEach(([x, yy]) => { sxy += (x - mx) * (yy - my); sxx += (x - mx) ** 2; }); const b = sxy / sxx;
      return svg(260, 150, L(16, 136, 250, 136, 'ax') + L(20, 10, 20, 142, 'ax') + L(22, my + b * (22 - mx), 240, my + b * (240 - mx), 'ac2') +
        pts.map(p => D(p[0], p[1], 'dtc', 3.6)).join('') + L(mx, my, mx, 136, 'th') + L(20, my, mx, my, 'th') + D(mx, my, 'dt', 4.4) +
        `<text x="${mx + 34}" y="${my + 16}" class="lab">(x̄, ȳ)</text>` + `<text x="196" y="22" class="lab">ŷ = â + b̂x</text>`);
    },
    // linear programming: feasible region and the best vertex
    // (a + b)² as tiles: a², b² and two ab strips
    sqsum(lang) {
      const a = 84, b = 42, x = 70, y = 12, R = (x0, y0, w_, h, c, t) => `<rect x="${x0}" y="${y0}" width="${w_}" height="${h}" class="${c}"/><rect x="${x0}" y="${y0}" width="${w_}" height="${h}" class="ln"/>` + T(x0 + w_ / 2, y0 + h / 2, t);
      return svg(260, 162, R(x, y + b, a, a, 'fl', 'a²') + R(x + a, y + b, b, a, 'fl2', 'ab') + R(x, y, a, b, 'fl2', 'ab') + R(x + a, y, b, b, 'fl', 'b²') +
        T(x + a / 2, y + a + b + 10, 'a', 'sm') + T(x + a + b / 2, y + a + b + 10, 'b', 'sm') + T(x - 10, y + b + a / 2, 'a', 'sm') + T(x - 10, y + b / 2, 'b', 'sm'));
    },
    // a² − b²: the L-shape cut and re-glued into (a + b)(a − b)
    diffsq(lang) {
      const a = 66, b = 26, d = a - b, x = 22, y = 18, R = (x0, y0, w_, h, c) => `<rect x="${x0}" y="${y0}" width="${w_}" height="${h}" class="${c}"/><rect x="${x0}" y="${y0}" width="${w_}" height="${h}" class="ln"/>`;
      const X = 138, Y = 18 + b;
      return svg(270, 110, R(x, y + b, a, d, 'fl') + R(x, y, d, b, 'fl2') + `<rect x="${x + d}" y="${y}" width="${b}" height="${b}" class="th"/>` + T(x + d + b / 2, y + b / 2, 'b²', 'sm') +
        L(x + a + 10, y + a / 2, X - 8, Y + d / 2, 'ac', 'marker-end="ARROW"') + R(X, Y, a, d, 'fl') + R(X + a, Y, b, d, 'fl2') +
        T(X + (a + b) / 2, Y + d + 12, 'a + b', 'sm') + T(X + a + b + 24, Y + d / 2, 'a − b', 'sm') + T(x + a / 2, y + a + 12, 'a', 'sm'));
    },
    // AM ≥ GM: in a half-circle of diameter a + b the height √ab never beats the radius
    amgm(lang) {
      const O = [130, 120], r = 96, A = 210 - 34, h = Math.sqrt((A - (O[0] - r)) * (O[0] + r - A));
      return svg(260, 140, `<path d="M${O[0] - r},${O[1]}A${r},${r} 0 0 1 ${O[0] + r},${O[1]}Z" class="fl"/>` + `<path d="M${O[0] - r},${O[1]}A${r},${r} 0 0 1 ${O[0] + r},${O[1]}Z" class="ln"/>` +
        L(A, O[1], A, O[1] - h, 'ac2') + L(O[0], O[1], O[0], O[1] - r, 'ac') + D(...O) + T(A + 22, O[1] - h / 2, '√ab', 'sm') + T(O[0] - 30, O[1] - r / 2, '(a+b)/2', 'sm') +
        T((O[0] - r + A) / 2, O[1] + 12, 'a', 'sm') + T((A + O[0] + r) / 2, O[1] + 12, 'b', 'sm'));
    },
    lp(lang) {
      const O = [34, 136], S = 22, P = (x, y) => [O[0] + x * S, O[1] - y * S];
      const V = [[0, 0], [0, 5], [3, 3], [5, 0]];
      const reg = 'M' + V.map(v => P(...v).join(',')).join('L') + 'Z';
      return svg(270, 150, `<path d="${reg}" class="fl"/>` + `<path d="${reg}" class="ln"/>` + L(10, O[1], 262, O[1], 'ax') + L(O[0], 6, O[0], 146, 'ax') +
        L(...P(-0.5, 6), ...P(4.5, 1.5 + 0.0), 'th') + L(...P(1.5, 4.5), ...P(5.8, -0.5), 'th') +
        L(...P(1, 5.5), ...P(6.2, 0.3), 'ac2') + V.map(v => D(...P(...v))).join('') + D(...P(3, 3), 'dtc', 5) +
        `<text x="${P(1.6, 1.6)[0]}" y="${P(1.6, 1.6)[1]}" class="lab">${w(lang, 'feasible|admissible|factible|実行可能|可行域')}</text>` +
        `<text x="${P(3, 3)[0] + 44}" y="${P(3, 3)[1] - 14}" class="lab">${w(lang, 'optimum|optimum|óptimo|最適|最优解')}</text>` + `<text x="${P(6.2, 0.3)[0] - 8}" y="${P(6.2, 0.3)[1] - 30}" class="lab">z = c</text>`);
    },
    // two vectors and their parallelogram
    vectors(lang) {
      const O = [35, 135], U = [185, 112], V = [90, 42], S = [240, 19];
      return svg(270, 155, Pth(`M${O}L${U}L${S}L${V}Z`, 'fl') + L(...U, ...S, 'th') + L(...V, ...S, 'th') +
        `<line x1="${O[0]}" y1="${O[1]}" x2="${U[0]}" y2="${U[1]}" class="ac" marker-end="ARROW"/>` + `<line x1="${O[0]}" y1="${O[1]}" x2="${V[0]}" y2="${V[1]}" class="ac" marker-end="ARROW"/>` +
        `<line x1="${O[0]}" y1="${O[1]}" x2="${S[0]}" y2="${S[1]}" class="ac2" marker-end="ARROW"/>` + Pth(arc(...O, 28, 8.7, 59.4), 'ln') +
        T(112, 136, 'u', 'up') + T(52, 84, 'v', 'up') + T(214, 52, 'u + v', 'up') + T(70, 118, 'θ', 'sm') + T(150, 80, w(lang, 'area|aire|área|面積|面积') + ' = |u × v|', 'tl'));
    },
    // complex number in polar form
    polar(lang) {
      const O = [40, 140], r = 140, t = 38 * Math.PI / 180, Z = [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)];
      return svg(260, 165, L(20, 140, 250, 140, 'ax') + L(40, 8, 40, 158, 'ax') + T(244, 152, 'Re', 'tl') + T(56, 12, 'Im', 'tl') +
        `<line x1="${O[0]}" y1="${O[1]}" x2="${Z[0].toFixed(1)}" y2="${Z[1].toFixed(1)}" class="ac" marker-end="ARROW"/>` + L(Z[0], Z[1], Z[0], 140, 'th') + L(40, Z[1], Z[0], Z[1], 'th') + Pth(arc(...O, 34, 0, 38), 'ln') +
        D(...Z) + T(Z[0] + 22, Z[1] - 12, 'z = a + bi', 'sm') + T(Z[0], 152, 'a', 'sm') + T(30, Z[1], 'b', 'sm') + T(108, 78, 'r = |z|', 'sm') + T(90, 128, 'θ = arg z', 'sm'));
    },
    // tangent line at a point
    tangent(lang) {
      const f = x => 130 - 0.0028 * (x - 30) * (x - 30), a = 160, fa = f(a), m = -0.0056 * (a - 30);
      return svg(270, 160, L(20, 140, 260, 140, 'ax') + L(30, 10, 30, 150, 'ax') + Pth(poly(curve(f, 30, 245)), 'ac') +
        L(a - 95, fa - m * 95, a + 85, fa + m * 85, 'ac2') + L(a, fa, a, 140, 'th') + D(a, fa) + T(a, 152, 'a', 'sm') + T(a - 58, fa - 26, w(lang, 'slope|pente|pendiente|傾き|斜率') + ' f′(a)', 'tl') + T(238, 26, 'y = f(x)', 'sm'));
    },
    // maximum, minimum and inflection on a cubic — labels sit in empty space, with a leader to the inflection point
    extrema(lang) {
      const u = x => (x - 140) / 58, f = x => 88 - 27 * (u(x) ** 3 - 3 * u(x));
      const mx = 82, mn = 198, ip = [140, f(140)];
      const lab = (x, y, s, anchor = 'middle') => `<text x="${x}" y="${y}" class="lab" text-anchor="${anchor}">${s}</text>`;
      return svg(320, 200, L(20, 88, 300, 88, 'ax') + Pth(poly(curve(f, 32, 252)), 'ac') +
        L(mx - 34, f(mx), mx + 34, f(mx), 'ac2') + L(mn - 34, f(mn), mn + 34, f(mn), 'ac2') + L(ip[0], ip[1], 92, 156, 'th') +
        D(mx, f(mx), 'dt', 4) + D(mn, f(mn), 'dt', 4) + D(...ip, 'dtc', 4.2) +
        lab(122, 22, 'max:  f′ = 0,  f″ < 0', 'start') +
        lab(198, 182, 'min:  f′ = 0,  f″ > 0') +
        lab(92, 168, w(lang, 'inflection|inflexion|inflexión|変曲点|拐点') + ':  f″ = 0'));
    },
    // area under a curve
    area(lang) {
      const f = x => 120 - 60 * Math.sin((x - 20) / 75) - 0.12 * (x - 20);
      const a = 70, b = 210, q = curve(f, a, b);
      return svg(270, 160, Pth(poly([[a, 140], ...q, [b, 140]]) + 'Z', 'fl') + L(20, 140, 260, 140, 'ax') + L(30, 10, 30, 150, 'ax') + Pth(poly(curve(f, 30, 250)), 'ac') +
        L(a, 140, a, f(a), 'th') + L(b, 140, b, f(b), 'th') + T(a, 152, 'a', 'sm') + T(b, 152, 'b', 'sm') + T(140, 110, '∫ f(x) dx', 'sm') + T(236, 40, 'y = f(x)', 'sm'));
    },
    // Venn diagram for two sets / events
    venn(lang) {
      return svg(260, 140, `<rect x="8" y="8" width="244" height="124" rx="10" class="th"/>` + C(100, 72, 52, 'fl') + C(160, 72, 52, 'fl2') + C(100, 72, 52) + C(160, 72, 52) +
        T(76, 72, 'A', 'up') + T(184, 72, 'B', 'up') + T(130, 72, 'A∩B', 'sm') + T(232, 22, 'Ω', 'up'));
    },
    // Pascal's triangle, rows 0–6
    pascal(lang) {
      let body = '', n = 7;
      for (let r = 0; r < n; r++) { let c = 1; for (let k = 0; k <= r; k++) { body += T(150 + (k - r / 2) * 36, 16 + r * 21, String(c), r === 5 && k === 2 ? 'up hi' : (r === 4 && (k === 1 || k === 2)) ? 'up lo' : 'up'); c = c * (r - k) / (k + 1); } }
      return svg(300, 160, body + T(150, 154, 'C(5, 2) = C(4, 1) + C(4, 2) = 4 + 6', 'tl'));
    }    ,
    // ---------- integrals ----------
    // four functions f (accent) with an antiderivative F (red)
    antiders(lang) {
      const panel = (x0, y0, xr, yr, f, F, fs, Fs, extra = () => '') => {
        const P = frame(x0, y0, 146, 84, xr, yr), [ox, oy] = P(0, 0);
        return `<rect x="${x0}" y="${y0}" width="146" height="84" rx="6" class="grid"/>` + L(x0, oy, x0 + 146, oy, 'ax') + L(ox, y0, ox, y0 + 84, 'ax') + extra(P) +
          Pth(plot(f, xr[0], xr[1], P, yr[0], yr[1]), 'ac') + Pth(plot(F, xr[0], xr[1], P, yr[0], yr[1]), 'ac2') +
          `<text x="${x0 + 73}" y="${y0 + 98}" class="lab"><tspan class="a">${fs}</tspan>  →  <tspan class="b">${Fs}</tspan></text>`;
      };
      return svg(310, 256,
        panel(6, 6, [-2.2, 2.2], [-1.6, 2.4], x => x, x => x * x / 2, 'x', 'x²/2') +
        panel(158, 6, [-3.2, 3.2], [-2.6, 2.6], x => 1 / x, x => Math.log(Math.abs(x)), '1/x', 'ln|x|') +
        panel(6, 124, [-3.6, 3.6], [-1.5, 1.5], Math.cos, Math.sin, 'cos x', 'sin x') +
        panel(158, 124, [-4.5, 4.5], [-2, 2], x => 1 / (1 + x * x), Math.atan, '1/(1+x²)', 'arctan x',
          P => L(...P(-4.5, Math.PI / 2), ...P(4.5, Math.PI / 2), 'th') + L(...P(-4.5, -Math.PI / 2), ...P(4.5, -Math.PI / 2), 'th')) +
        `<text x="70" y="248" class="tl"><tspan class="a">━ f</tspan></text><text x="155" y="248" class="tl"><tspan class="b">━ F = ∫ f dx</tspan></text><text x="250" y="248" class="tl">F′ = f</text>`, 'tall');
    },
    // A(x) = ∫ₐˣ f grows by the strip f(x)·dx
    accum(lang) {
      const f = X => 66 - 24 * Math.sin((X - 20) / 40), a = 46, x = 168, dx = 18;
      return svg(270, 134, Pth(poly([[a, 112], ...curve(f, a, x), [x, 112]]) + 'Z', 'fl') +
        Pth(poly([[x, 112], ...curve(f, x, x + dx, 10), [x + dx, 112]]) + 'Z', 'fl2') + Pth(poly([[x, 112], ...curve(f, x, x + dx, 10), [x + dx, 112]]), 'ac2') +
        L(14, 112, 262, 112, 'ax') + Pth(poly(curve(f, 20, 255)), 'ac') + L(a, 112, a, f(a), 'th') +
        T(a, 124, 'a', 'sm') + T(x, 124, 'x', 'sm') + T(x + dx + 12, 124, 'x+dx', 'sm') + T(108, 92, 'A(x)', 'sm') + T(x + dx / 2 + 26, f(x) + 26, 'f(x)', 'sm') +
        `<text x="94" y="16" class="lab">dA = f(x) dx  ⇒  A′(x) = f(x)</text>`);
    },
    // odd: the two halves cancel; even: the two halves are equal
    oddeven(lang) {
      const half = (x0, f, odd) => {
        const P = frame(x0, 6, 140, 80, [-3.7, 3.7], [-1.25, 1.25]), [ox, oy] = P(0, 0), q = (u, v) => curve(f, u, v, 40).map(p => P(...p));
        return Pth(poly([P(-3, 0), ...q(-3, 0), P(0, 0)]) + 'Z', odd ? 'fl2' : 'fl') + Pth(poly([P(0, 0), ...q(0, 3), P(3, 0)]) + 'Z', 'fl') +
          L(x0, oy, x0 + 140, oy, 'ax') + L(ox, 6, ox, 86, 'ax') + Pth(plot(f, -3.7, 3.7, P), 'ac') + L(...P(-3, -1.2), ...P(-3, 1.2), 'th') + L(...P(3, -1.2), ...P(3, 1.2), 'th') +
          T(...P(-3, -1.35), '−a', 'sm') + T(...P(3, -1.35), 'a', 'sm') +
          T(...P(1.5, odd ? 0.4 : 0.17), '+', 'up') + T(...P(-1.5, odd ? -0.4 : 0.17), odd ? '−' : '+', 'up');
      };
      return svg(300, 122, half(6, x => Math.sin(x) * 0.95, true) + half(156, x => Math.exp(-x * x / 2.2) * 1.1 - 0.05, false) +
        `<text x="76" y="114" class="lab">${w(lang, 'odd|impaire|impar|奇関数|奇函数')}: ∫ = 0</text>` + `<text x="226" y="114" class="lab">${w(lang, 'even|paire|par|偶関数|偶函数')}: ∫ = 2∫₀ᵃ</text>`);
    },
    // substitution: the same area seen in x and in u = g(x)
    subst(lang) {
      const A = frame(6, 8, 116, 80, [0, 2.1], [0, 1]), B = frame(196, 8, 116, 80, [0, 2.6], [0, 1]);
      const f1 = x => 2 * x * Math.exp(-x * x), f2 = u => Math.exp(-u), a = 0.4, b = 1.4;
      const sh = (P, f, u, v) => Pth(poly([P(u, 0), ...curve(f, u, v, 40).map(p => P(...p)), P(v, 0)]) + 'Z', 'fl');
      return svg(318, 128, sh(A, f1, a, b) + sh(B, f2, a * a, b * b) +
        L(...A(0, 0), ...A(2.1, 0), 'ax') + L(...A(0, 0), ...A(0, 1), 'ax') + L(...B(0, 0), ...B(2.6, 0), 'ax') + L(...B(0, 0), ...B(0, 1), 'ax') +
        Pth(plot(f1, 0, 2.1, A), 'ac') + Pth(plot(f2, 0, 2.6, B), 'ac') +
        T(A(a, 0)[0], 98, 'a', 'sm') + T(A(b, 0)[0], 98, 'b', 'sm') + T(B(a * a, 0)[0], 98, 'g(a)', 'sm') + T(B(b * b, 0)[0], 98, 'g(b)', 'sm') +
        `<line x1="132" y1="52" x2="186" y2="52" class="arw" marker-end="ARROW"/>` + T(159, 38, 'u = g(x)', 'sm') +
        `<text x="64" y="118" class="lab">f(g(x)) g′(x) dx</text>` + `<text x="254" y="118" class="lab">f(u) du</text>` + `<text x="159" y="72" class="lab">=</text>`);
    },
    // integration by parts: ∫v du + ∫u dv fill the L-shape u₂v₂ − u₁v₁
    parts(lang) {
      const O = [34, 146], U = t => 84 + 140 * t, V = t => 112 - 82 * Math.sqrt(t), q = []; for (let k = 0; k <= 40; k++) q.push([U(k / 40), V(k / 40)]);
      const P1 = q[0], P2 = q[40];
      return svg(260, 166, Pth(poly([[P1[0], O[1]], ...q, [P2[0], O[1]]]) + 'Z', 'fl') + Pth(poly([[O[0], P1[1]], ...q, [O[0], P2[1]]]) + 'Z', 'fl2') +
        L(O[0], O[1], 252, O[1], 'ax') + L(O[0], O[1], O[0], 8, 'ax') + L(P1[0], P1[1], P1[0], O[1], 'th') + L(P2[0], P2[1], P2[0], O[1], 'th') + L(O[0], P1[1], P1[0], P1[1], 'th') + L(O[0], P2[1], P2[0], P2[1], 'th') +
        Pth(poly(q), 'ac') + D(...P1) + D(...P2) + T(P1[0], 157, 'u₁', 'sm') + T(P2[0], 157, 'u₂', 'sm') + T(22, P1[1], 'v₁', 'sm') + T(22, P2[1], 'v₂', 'sm') + T(248, 136, 'u', 'sm') + T(46, 12, 'v', 'sm') +
        `<text x="168" y="118" class="lab">∫ v du</text>` + `<text x="76" y="78" class="lab">∫ u dv</text>` + `<text x="160" y="16" class="lab">u₂v₂ − u₁v₁</text>`);
    },
    // sin² x oscillates around ½, so its integral grows like x/2
    sin2(lang) {
      const P = frame(22, 26, 244, 64, [0, 2 * Math.PI], [0, 1]);
      return svg(280, 116, Pth(poly([P(0, 0), ...curve(x => Math.sin(x) ** 2, 0, 2 * Math.PI).map(p => P(...p)), P(2 * Math.PI, 0)]) + 'Z', 'fl') +
        L(...P(0, 0), ...P(2 * Math.PI, 0), 'ax') + L(...P(0, 0), ...P(0, 1), 'ax') + L(...P(0, 0.5), ...P(2 * Math.PI, 0.5), 'ac2') + Pth(plot(x => Math.sin(x) ** 2, 0, 2 * Math.PI, P), 'ac') +
        T(12, P(0, 0.5)[1], '½', 'up') + T(12, P(0, 1)[1], '1', 'sm') + T(P(Math.PI, 0)[0], 104, 'π', 'sm') + T(P(2 * Math.PI, 0)[0] - 4, 104, '2π', 'sm') +
        `<text x="${P(Math.PI, 0)[0]}" y="11" class="lab">sin² x = ½ − ½ cos 2x</text>`);
    },
    // the three right triangles behind the trigonometric substitutions
    trisub(lang) {
      const tri = (x0, cap, hyp, opp, adj) => {
        const A = [x0, 104], B = [x0 + 74, 104], C = [x0 + 74, 40];
        return Pth(`M${A}L${B}L${C}Z`, 'fl') + Pth(`M${A}L${B}L${C}Z`) + right(B[0], B[1], -1, -1, 9) + Pth(arc(...A, 20, 0, 40.9), 'ac') + T(x0 + 28, 97, 't', 'sm') +
          `<text x="${x0 + 37}" y="117" class="lab">${adj}</text>` + `<text x="${x0 + 80}" y="70" class="lab" text-anchor="start">${opp}</text>` + `<text x="${x0 + 30}" y="62" class="lab" text-anchor="end">${hyp}</text>` +
          `<text x="${x0 + 50}" y="16" class="lab">${cap}</text>`;
      };
      return svg(400, 124, tri(34, 'x = a sin t', 'a', 'x', '√(a² − x²)') + tri(166, 'x = a tan t', '√(a² + x²)', 'x', 'a') + tri(272, 'x = a / cos t', 'x', '√(x² − a²)', 'a'));
    },
    // a quarter of a disc
    quarter(lang) {
      const O = [34, 112], r = 92;
      return svg(250, 124, `<path d="M${O}L${O[0] + r},${O[1]}A${r},${r} 0 0 0 ${O[0]},${O[1] - r}Z" class="fl"/>` + L(20, O[1], 160, O[1], 'ax') + L(O[0], 8, O[0], 120, 'ax') +
        `<path d="M${O[0] + r},${O[1]}A${r},${r} 0 0 0 ${O[0]},${O[1] - r}" class="ac"/>` + T(O[0] + r, 120, 'a', 'sm') + T(24, O[1] - r, 'a', 'sm') + T(72, 82, 'πa²/4', 'sm') +
        `<text x="196" y="40" class="lab">y = √(a² − x²)</text>`);
    },
    // signed area: S₊ above the axis, S₋ below
    signed(lang) {
      const f = X => 74 - 46 * Math.sin((X - 46) / 40), a = 46, z = 46 + 40 * Math.PI, b = 244;
      return svg(280, 150, Pth(poly([[a, 74], ...curve(f, a, z), [z, 74]]) + 'Z', 'fl') + Pth(poly([[z, 74], ...curve(f, z, b), [b, 74]]) + 'Z', 'fl2') +
        L(14, 74, 266, 74, 'ax') + L(26, 8, 26, 124, 'ax') + Pth(poly(curve(f, 30, 262)), 'ac') + L(b, 74, b, f(b), 'th') +
        T(a - 6, 86, 'a', 'sm') + T(b + 8, 64, 'b', 'sm') + T(108, 56, 'S₊', 'up') + T(206, 92, 'S₋', 'up') +
        `<text x="80" y="140" class="lab">∫ₐᵇ f = S₊ − S₋</text><text x="206" y="140" class="lab">${w(lang, 'area|aire|área|面積|面积')} = S₊ + S₋</text>`);
    },
    // area between a parabola and a line, between the crossing points
    between(lang) {
      const P = frame(14, 8, 240, 104, [-0.5, 3.1], [-0.4, 3.5]), f = x => 3 * x - x * x + 1, g = x => 0.5 * x + 1.2;
      const al = (2.5 - Math.sqrt(5.45)) / 2, be = (2.5 + Math.sqrt(5.45)) / 2;
      return svg(270, 132, Pth(poly([...curve(f, al, be, 50).map(p => P(...p)), ...curve(g, be, al, 2).map(p => P(...p))]) + 'Z', 'fl') +
        L(...P(-0.5, 0), ...P(3.1, 0), 'ax') + L(...P(0, -0.4), ...P(0, 3.5), 'ax') + Pth(plot(f, -0.35, 3.1, P, -0.4, 3.5), 'ac') + Pth(plot(g, -0.5, 3.1, P), 'ac2') +
        L(...P(be, 0), ...P(be, g(be)), 'th') + D(...P(al, g(al))) + D(...P(be, g(be))) + T(P(al, 0)[0] + 6, P(0, 0)[1] + 11, 'α', 'sm') + T(P(be, 0)[0], P(0, 0)[1] + 11, 'β', 'sm') +
        T(...P(1.25, 2.25), 'S', 'up') + `<text x="${P(0.35, 0)[0]}" y="${P(0, 3.1)[1]}" class="lab">y = f(x)</text>` + `<text x="${P(2.75, 0)[0]}" y="${P(0, 3.2)[1]}" class="lab">y = g(x)</text>`);
    },
    // volume by discs: slice of radius f(x) and thickness dx
    revolve(lang) {
      const r = X => 12 + 34 * Math.sqrt((X - 40) / 200), y0 = 76, s = 176, e = (cx, rx, ry, c) => `<ellipse cx="${cx}" cy="${y0}" rx="${rx}" ry="${ry}" class="${c}"/>`;
      return svg(280, 150, L(14, y0, 266, y0, 'ax') + Pth(poly(curve(X => y0 - r(X), 40, 240)), 'ac') + Pth(poly(curve(X => y0 + r(X), 40, 240)), 'th') +
        e(40, 4, r(40), 'th') + e(240, 9, r(240), 'th') + e(s, 6, r(s), 'fl') + e(s, 6, r(s), 'ac2') + e(s + 10, 6, r(s + 10), 'ac2') +
        L(s, y0, s, y0 - r(s), 'ln') + T(s - 26, y0 - r(s) / 2, 'f(x)', 'sm') + T(s + 5, y0 + r(s) + 12, 'dx', 'sm') + T(40, y0 + 34, 'a', 'sm') + T(240, y0 + 58, 'b', 'sm') +
        `<text x="122" y="140" class="lab">dV = π f(x)² dx</text>`);
    },
    // Riemann sum with n = 8 rectangles
    riemann(lang) {
      const P = frame(30, 12, 200, 92, [0, 1], [0, 1]), f = x => 0.2 + 0.8 * x * x, n = 8;
      let body = '';
      for (let k = 1; k <= n; k++) { const [x1, y1] = P((k - 1) / n, f(k / n)), [x2] = P(k / n, 0); body += `<rect x="${x1.toFixed(1)}" y="${y1.toFixed(1)}" width="${(x2 - x1).toFixed(1)}" height="${(P(0, 0)[1] - y1).toFixed(1)}" class="bar"/>`; }
      return svg(260, 126, body + L(...P(0, 0), ...P(1.12, 0), 'ax') + L(...P(0, 0), ...P(0, 1.08), 'ax') + Pth(plot(f, 0, 1.06, P), 'ac') +
        T(...P(0, -0.12), '0', 'sm') + T(...P(1, -0.12), '1', 'sm') + T(...P(5.5 / 8, -0.12), '1/n', 'sm') + T(...P(0.74, f(1) - 0.02), 'f(k/n)', 'sm') +
        `<text x="${P(0.3, 0)[0]}" y="${P(0, 0.9)[1]}" class="lab">Σ f(k/n) · 1/n</text>`);
    },
    // average value: the rectangle of height f̄ has the same area
    average(lang) {
      const P = frame(28, 10, 210, 84, [0, 1], [0, 1]), f = x => 0.35 + 0.5 * Math.sin(3.4 * x + 0.3) * 0.9 + 0.15 * x;
      let m = 0; for (let k = 0; k < 200; k++) m += f((k + 0.5) / 200); m /= 200;
      return svg(260, 116, Pth(poly([P(0, 0), ...curve(f, 0, 1).map(p => P(...p)), P(1, 0)]) + 'Z', 'fl') + Pth(poly([P(0, 0), P(0, m), P(1, m), P(1, 0)]), 'ac2') +
        L(...P(0, 0), ...P(1.08, 0), 'ax') + L(...P(0, 0), ...P(0, 1.08), 'ax') + Pth(plot(f, 0, 1, P), 'ac') +
        T(...P(0, -0.14), 'a', 'sm') + T(...P(1, -0.14), 'b', 'sm') + T(P(0, 0)[0] - 10, P(0, m)[1], 'f̄', 'up') + T(...P(1.06, f(1) + 0.02), 'f', 'sm'));
    },
    // ∫₁^∞ dx/x² is finite, ∫₁^∞ dx/x is not
    tail(lang) {
      const P = frame(26, 10, 236, 86, [0, 6.4], [0, 1.3]);
      return svg(270, 120, Pth(poly([P(1, 0), ...curve(x => 1 / (x * x), 1, 6.4).map(p => P(...p)), P(6.4, 0)]) + 'Z', 'fl') +
        L(...P(0, 0), ...P(6.4, 0), 'ax') + L(...P(0, 0), ...P(0, 1.3), 'ax') + L(...P(1, 0), ...P(1, 1), 'th') +
        Pth(plot(x => 1 / x, 0.77, 6.4, P), 'ac2') + Pth(plot(x => 1 / (x * x), 0.88, 6.4, P), 'ac') +
        T(...P(1, -0.14), '1', 'sm') + `<text x="${P(5.6, 0)[0]}" y="${P(0, 0.06)[1] + 14}" class="lab">→ ∞</text>` +
        `<text x="${P(3.6, 0)[0]}" y="${P(0, 0.62)[1]}" class="lab"><tspan class="b">∫₁^∞ dx/x = ∞</tspan></text>` + `<text x="${P(3.6, 0)[0]}" y="${P(0, 0.4)[1]}" class="lab"><tspan class="a">∫₁^∞ dx/x² = 1</tspan></text>`);
    },
    // the Gaussian bell
    gauss(lang) {
      const P = frame(16, 10, 228, 72, [-3.2, 3.2], [0, 1.1]), f = x => Math.exp(-x * x);
      return svg(260, 104, Pth(poly([P(-3.2, 0), ...curve(f, -3.2, 3.2).map(p => P(...p)), P(3.2, 0)]) + 'Z', 'fl') + L(...P(-3.2, 0), ...P(3.2, 0), 'ax') + L(...P(0, 0), ...P(0, 1.1), 'ax') +
        Pth(plot(f, -3.2, 3.2, P), 'ac') + T(...P(0, 0.4), '√π', 'up') + T(...P(0.25, 1.06), '1', 'sm') + `<text x="${P(2.2, 0)[0]}" y="${P(0, 0.7)[1]}" class="lab">y = e<tspan dy="-6" font-size="9">−x²</tspan></text>`);
    },
    // slope field of y′ = ky with solutions y = Ce^(kx)
    slopes(lang) {
      const k = 0.55, P = frame(14, 8, 252, 124, [-3, 3], [-3, 3]), sx = 252 / 6, sy = 124 / 6;
      let body = '';
      for (let i = -3; i <= 3; i += 0.6) for (let j = -2.7; j <= 2.75; j += 0.6) {
        const [X, Y] = P(i, j), m = k * j, dx = 1, dy = m, len = Math.hypot(dx * sx, dy * sy), h = 7 / len;
        body += L((X - dx * sx * h).toFixed(1), (Y + dy * sy * h).toFixed(1), (X + dx * sx * h).toFixed(1), (Y - dy * sy * h).toFixed(1), 'seg');
      }
      [-1.6, -0.5, 0.5, 1.6].forEach(C => { body += Pth(plot(x => C * Math.exp(k * x), -3, 3, P, -3, 3), 'ac'); });
      return svg(280, 160, L(...P(-3, 0), ...P(3, 0), 'ax') + L(...P(0, -3), ...P(0, 3), 'ax') + body +
        `<text x="70" y="20" class="lab">y′ = ky</text>` + `<text x="212" y="150" class="lab">y = Ce<tspan dy="-6" font-size="9">kx</tspan></text>`);
    },
    // which technique? a short decision chart
    choose(lang) {
      const rows = [
        ['In the basic table?|Primitive usuelle ?|¿Primitiva inmediata?|基本公式にある？|在基本公式中？', 'Use it|L’appliquer|Aplicarla|そのまま使う|直接套用'],
        ['f(g(x)) · g′(x) inside?|Forme f(g(x)) · g′(x) ?|¿Aparece f(g(x)) · g′(x)?|f(g(x)) · g′(x) の形？|含 f(g(x)) · g′(x)？', 'Substitution|Changement de variable|Sustitución|置換積分|换元法'],
        ['Like x eˣ, x sin x, ln x?|Comme x eˣ, x sin x, ln x ?|¿Como x eˣ, x sen x, ln x?|x eˣ, x sin x, ln x の型？|形如 x eˣ, x sin x, ln x？', 'By parts|Par parties|Por partes|部分積分|分部积分'],
        ['A fraction P(x)/Q(x)?|Une fraction P(x)/Q(x) ?|¿Una fracción P(x)/Q(x)?|分数式 P(x)/Q(x)？|有理分式 P(x)/Q(x)？', 'Partial fractions|Éléments simples|Fracciones simples|部分分数分解|部分分式'],
        ['A root √(a² ± x²)?|Une racine √(a² ± x²) ?|¿Una raíz √(a² ± x²)?|√(a² ± x²) を含む？|含根式 √(a² ± x²)？', 'Trig substitution|Subst. trigonométrique|Sust. trigonométrica|三角関数で置換|三角换元'],
        ['Powers of sin, cos?|Puissances de sin, cos ?|¿Potencias de sen, cos?|sin, cos の累乗？|sin、cos 的幂？', 'Double angle|Linéariser|Ángulo doble|倍角の公式|倍角公式']
      ];
      const yes = w(lang, 'yes|oui|sí|はい|是'), no = w(lang, 'no|non|no|いいえ|否');
      let body = '';
      rows.forEach(([q, a], i) => {
        const y = 6 + i * 42;
        body += `<rect x="4" y="${y}" width="200" height="28" rx="8" class="bx"/>` + `<text x="104" y="${y + 14}" class="lab">${w(lang, q)}</text>` +
          `<line x1="206" y1="${y + 19}" x2="225" y2="${y + 19}" class="arw" marker-end="ARROW"/>` + T(215, y + 8, yes, 'tl') +
          `<rect x="228" y="${y}" width="138" height="28" rx="14" class="pill"/>` + `<text x="297" y="${y + 14}" class="tl">${w(lang, a)}</text>`;
        body += `<line x1="104" y1="${y + 28}" x2="104" y2="${y + 40}" class="arw" marker-end="ARROW"/>` + T(120, y + 34, no, 'tl');
      });
      body += `<text x="104" y="${6 + 6 * 42 + 6}" class="lab">${w(lang, 'Otherwise: rewrite and try again|Sinon : réécrire et recommencer|Si no: reescribir y volver a probar|だめなら式を変形して再挑戦|否则：先变形再试')}</text>`;
      return svg(370, 272, body, 'tall');
    },
    // ---------- statistics / probability ----------
    // the normal curve with the 68–95–99.7 bands
    normal(lang) {
      const P = frame(14, 12, 272, 104, [-3.6, 3.6], [0, 0.44]), f = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
      const band = (u, cls) => Pth(poly([P(-u, 0), ...curve(f, -u, u, 50).map(p => P(...p)), P(u, 0)]) + 'Z', cls);
      let body = band(3, 'fl') + band(2, 'fl') + band(1, 'fl');
      [-3, -2, -1, 1, 2, 3].forEach(u => { body += L(...P(u, 0), ...P(u, f(u)), 'th'); });
      body += L(...P(-3.6, 0), ...P(3.6, 0), 'ax') + L(...P(0, 0), ...P(0, 0.42), 'th') + Pth(plot(f, -3.6, 3.6, P), 'ac');
      ['μ−3σ', 'μ−2σ', 'μ−σ', 'μ', 'μ+σ', 'μ+2σ', 'μ+3σ'].forEach((s, i) => { body += T(P(i - 3, 0)[0], 128, s, 'sm'); });
      const arrow = (u, y, s) => `<line x1="${P(-u, 0)[0]}" y1="${y}" x2="${P(u, 0)[0]}" y2="${y}" class="arw" marker-start="ARROW" marker-end="ARROW"/>` + `<text x="${P(0, 0)[0]}" y="${y - 1}" class="lab">${s}</text>`;
      body += arrow(1, 92, '68%') + arrow(2, 146, '95%') + arrow(3, 166, '99.7%');
      return svg(300, 176, body + `<text x="${P(2.75, 0)[0]}" y="${P(0, 0.3)[1]}" class="lab">N(μ, σ²)</text>`);
    },
    // Φ(z) = P(Z ≤ z), the area to the left of z
    phi(lang) {
      const P = frame(14, 10, 240, 76, [-3.4, 3.4], [0, 0.43]), f = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI), z = 1.1;
      return svg(268, 108, Pth(poly([P(-3.4, 0), ...curve(f, -3.4, z, 60).map(p => P(...p)), P(z, 0)]) + 'Z', 'fl') + Pth(poly([P(z, 0), ...curve(f, z, 3.4, 30).map(p => P(...p)), P(3.4, 0)]) + 'Z', 'fl2') +
        L(...P(-3.4, 0), ...P(3.4, 0), 'ax') + L(...P(z, 0), ...P(z, f(z)), 'ln') + Pth(plot(f, -3.4, 3.4, P), 'ac') +
        T(P(z, 0)[0], 98, 'z', 'sm') + T(P(0, 0)[0], 98, '0', 'sm') + `<text x="${P(-0.6, 0)[0]}" y="${P(0, 0.14)[1]}" class="lab">Φ(z)</text>` + `<text x="${P(2.3, 0)[0]}" y="${P(0, 0.2)[1]}" class="lab">1 − Φ(z)</text>`);
    },
    // ---------- combinatorics ----------
    // stars and bars: 10 sweets for 4 children = 3 + 2 + 4 + 1
    stars(lang) {
      const seq = '***|**|****|*'; let body = '', x = 22, groups = [], start = 22, cnt = 0;
      for (const ch of seq) {
        if (ch === '*') { body += D(x, 30, 'dtc', 7); cnt++; }
        else { body += L(x, 14, x, 46, 'ac2'); groups.push([start, x - 20, cnt]); start = x + 20; cnt = 0; }
        x += 20;
      }
      groups.push([start, x - 20, cnt]);
      groups.forEach(([a, b, n]) => { body += `<text x="${(a + b) / 2}" y="62" class="lab">${n}</text>`; });
      return svg(300, 72, body + `<text x="${x + 6}" y="30" class="lab" text-anchor="start">= 10</text>`);
    },
    // a monotone lattice path from (0, 0) to (4, 3)
    lattice(lang) {
      const O = [56, 118], s = 34, P = (i, j) => [O[0] + i * s, O[1] - j * s];
      let body = '';
      for (let i = 0; i <= 4; i++) body += L(...P(i, 0), ...P(i, 3), 'grid');
      for (let j = 0; j <= 3; j++) body += L(...P(0, j), ...P(4, j), 'grid');
      const path = [[0, 0], [1, 0], [1, 1], [3, 1], [3, 2], [4, 2], [4, 3]];
      body += Pth(poly(path.map(p => P(...p))), 'ac') + D(...P(0, 0)) + D(...P(4, 3));
      return svg(250, 132, body + T(P(0, 0)[0] - 22, 124, '(0, 0)', 'sm') + T(P(4, 3)[0] + 24, 12, '(4, 3)', 'sm'));
    }
  };
})();
