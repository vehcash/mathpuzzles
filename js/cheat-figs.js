/* Figures for the cheat sheets: each function returns an SVG string for the current language.
   Classes (css/cheats.css): ln solid line, th dashed helper, ax axis, ac / ac2 accent strokes, fl / fl2 fills,
   dt / dtc dots, text (italic maths), text.tl (small upright label), text.sm (smaller), text.up (upright). */
(function () {
  'use strict';
  const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
  const w = (lang, s) => { const p = s.split('|'); return p[Math.max(0, LANGS.indexOf(lang))] || p[0]; };
  let uid = 0;
  const svg = (W, H, body) => { const id = 'ah' + (++uid); return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="mk"/></marker></defs>${body.replace(/ARROW/g, `url(#${id})`)}</svg>`; };
  const L = (x1, y1, x2, y2, c = 'ln', extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" ${extra}/>`;
  const Pth = (d, c = 'ln') => `<path d="${d}" class="${c}"/>`;
  const T = (x, y, s, c = '') => `<text x="${x}" y="${y}"${c ? ` class="${c}"` : ''}>${s}</text>`;
  const D = (x, y, c = 'dt', r = 3.4) => `<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
  const C = (x, y, r, c = 'ln') => `<circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>`;
  const poly = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
  const curve = (f, a, b, n = 80) => { const q = []; for (let k = 0; k <= n; k++) { const x = a + (b - a) * k / n; q.push([x, f(x)]); } return q; };
  const arc = (cx, cy, r, a0, a1) => { const q = []; for (let k = 0; k <= 24; k++) { const t = (a0 + (a1 - a0) * k / 24) * Math.PI / 180; q.push([cx + r * Math.cos(t), cy - r * Math.sin(t)]); } return poly(q); };
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
    }
  };
})();
