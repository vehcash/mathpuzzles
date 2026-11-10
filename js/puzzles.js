/* Puzzle bank. Each puzzle: statement, figure builder, 8 options (0–2 correct), animated solution steps.
   Add more puzzles to PUZZLES and they are picked at random inside their category. */
(function (global) {
  'use strict';

  const CATEGORIES = [
    { id: 'geometry', name: 'Geometry', icon: '△' },
    { id: 'trigonometry', name: 'Trigonometry', icon: '∿' },
    { id: 'algebra', name: 'Algebra', icon: 'x²' },
    { id: 'calculus', name: 'Calculus', icon: '∫' },
    { id: 'probability', name: 'Probability', icon: '⚄' },
    { id: 'number', name: 'Number theory', icon: 'ℕ' }
  ];

  // ------- tiny SVG figure kit -------
  const NS = 'http://www.w3.org/2000/svg';
  function Figure(svg, opts) {
    const s = opts.scale, pad = opts.pad;
    const W = opts.w * s + pad * 2, H = opts.h * s + pad * 2;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';
    const layers = {};
    ['fills', 'base', 'marks', 'over', 'labels'].forEach(n => { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'fig-' + n); svg.appendChild(g); layers[n] = g; });
    const X = x => pad + x * s, Y = y => H - pad - y * s;
    const P = p => [X(p[0]), Y(p[1])];
    function el(tag, attrs, layer = 'base') {
      const e = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
      layers[layer].appendChild(e); return e;
    }
    function draw(e, dur = 900, delay = 0) { // draw-on animation for any stroke
      const len = e.getTotalLength ? e.getTotalLength() : 300;
      e.style.strokeDasharray = len + ' ' + len; e.style.strokeDashoffset = len;
      e.getBoundingClientRect();
      e.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.6,.05,.3,1) ${delay}ms`;
      requestAnimationFrame(() => { e.style.strokeDashoffset = 0; });
      setTimeout(() => { e.style.strokeDasharray = e.dataset.dash || ''; e.style.transition = ''; }, dur + delay + 50);
      return e;
    }
    function fadeIn(e, dur = 600, delay = 0) { e.style.opacity = 0; e.style.transition = `opacity ${dur}ms ease ${delay}ms`; requestAnimationFrame(() => requestAnimationFrame(() => { e.style.opacity = ''; })); return e; }
    const api = {
      svg, X, Y, P, el, draw, fadeIn,
      seg(a, b, cls = '', layer = 'base') { const [x1, y1] = P(a), [x2, y2] = P(b); return el('line', { x1, y1, x2, y2, class: 'seg ' + cls }, layer); },
      path(pts, cls = '', layer = 'base', closed = true) { return el('path', { d: 'M' + pts.map(p => P(p).join(',')).join('L') + (closed ? 'Z' : ''), class: cls }, layer); },
      circle(c, r, cls = '', layer = 'base') { const [cx, cy] = P(c); return el('circle', { cx, cy, r: r * s, class: cls }, layer); },
      dot(c, cls = '', layer = 'labels') { const [cx, cy] = P(c); return el('circle', { cx, cy, r: 3.6, class: 'dot ' + cls }, layer); },
      text(c, str, cls = '', dx = 0, dy = 0, layer = 'labels') { const [x, y] = P(c); const t = el('text', { x: x + dx, y: y + dy, class: 'lbl ' + cls, 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, layer); t.textContent = str; return t; },
      right(at, u, v, size = 0.45, cls = '', layer = 'marks') { // right-angle mark at "at" between directions u and v (unit vectors)
        const a = [at[0] + u[0] * size, at[1] + u[1] * size], b = [a[0] + v[0] * size, a[1] + v[1] * size], c = [at[0] + v[0] * size, at[1] + v[1] * size];
        return api.path([a, b, c], 'ra ' + cls, layer, false);
      },
      rect(x, y, w, h, cls = '', layer = 'base') { const [px, py] = P([x, y + h]); return el('rect', { x: px, y: py, width: w * s, height: h * s, class: cls }, layer); },
      arc(c, r, a0, a1, cls = '', layer = 'marks') { const pts = []; for (let i = 0; i <= 24; i++) { const t = (a0 + (a1 - a0) * i / 24) * Math.PI / 180; pts.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]); } return api.path(pts, 'arc ' + cls, layer, false); },
      curve(pts, cls = '', layer = 'base') { return api.path(pts, cls, layer, false); },
      arrowDefs() { if (svg.querySelector('#arrowhead')) return; const d = document.createElementNS(NS, 'defs'); d.innerHTML = '<marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="arrowhead"/></marker>'; svg.insertBefore(d, svg.firstChild); },
      clear(layer) { layers[layer].innerHTML = ''; },
      layers
    };
    return api;
  }

  // ------- Puzzle 1: incircle of a 6-8-10 right triangle -------
  const A = [0, 6], B = [8, 0], C = [0, 0], I = [2, 2];
  const T1 = [0, 2], T2 = [2, 0], T3 = [3.2, 3.6];
  const unit = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / d, (q[1] - p[1]) / d]; };
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];

  const incircle = {
    id: 'geo-incircle-6-8-10',
    category: 'geometry',
    title: 'The circle inside the right triangle',
    difficulty: 2,
    statement: 'Triangle $ABC$ has a right angle at $C$, with $AC = 6$ and $BC = 8$. A circle with centre $I$ is inscribed in the triangle, touching all three sides. <b>Which of the following equal the radius $r$ of the circle?</b>',
    figureText: 'Right triangle ABC with the right angle at C. Leg AC = 6 is vertical, leg BC = 8 is horizontal, the hypotenuse AB is not given. A circle with centre I is inscribed in the triangle (tangent to all three sides); its radius r is marked from I down to side BC.',
    aiHint: 'Please use a different method from "area = r × semiperimeter" if you can (for example coordinates, tangent lengths, or trigonometry), show every step, then check each option and say which ones are correct.',
    hint: 'Join $I$ to the three vertices: the triangle splits into three triangles whose heights are all $r$.',
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 6, scale: 36, pad: 34 });
      F.path([A, B, C], 'tri');
      F.right(C, [1, 0], [0, 1], 0.5);
      const ic = F.circle(I, 2, 'incircle');
      F.seg(I, T2, 'radius');
      F.dot(I, 'center');
      F.text(A, 'A', 'pt', -14, -6); F.text(B, 'B', 'pt', 12, 8); F.text(C, 'C', 'pt', -13, 9);
      F.text(I, 'I', 'pt small', -12, -8);
      F.text(mid(A, C), '6', 'len', -16, 0); F.text(mid(B, C), '8', 'len', 0, 18);
      F.text(mid(I, T2), 'r', 'len it', 10, 0);
      F.text(mid(A, B), '?', 'len muted', 14, -12);
      return F;
    },
    options: [
      { tex: 'r = 2', correct: true, why: 'This is the inradius.' },
      { tex: 'r = \\dfrac{24}{12}', correct: true, why: 'Area ÷ semiperimeter $=\\tfrac{24}{12}=2$.' },
      { tex: 'r = 2.4', correct: false, why: 'Half of the altitude from $C$ ($4.8 \\div 2$).' },
      { tex: 'r = 4.8', correct: false, why: 'The altitude from $C$ to $AB$: $\\tfrac{6\\cdot 8}{10}$.' },
      { tex: 'r = 5', correct: false, why: 'The circumradius $= \\tfrac{AB}{2}$.' },
      { tex: 'r = 3', correct: false, why: 'Half of $AC$ — not related to the incircle.' },
      { tex: 'r = \\dfrac{12}{7}', correct: false, why: '$\\tfrac{24}{14}$: divides the area by $AC+BC$ instead of the semiperimeter.' },
      { tex: 'r = \\sqrt{5}', correct: false, why: 'The distance from $I$ to the midpoint of $AB$.' }
    ],
    steps: [
      {
        title: 'Find the hypotenuse',
        lines: ['AB = \\sqrt{AC^2 + BC^2}', '= \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10'],
        note: 'Pythagoras, because the right angle is at $C$.',
        fig(F) { F.draw(F.seg(A, B, 'hl yellow', 'over'), 900); F.fadeIn(F.text(mid(A, B), '10', 'len yellow', 16, -12, 'labels'), 400, 700); F.layers.labels.querySelector('.muted')?.remove(); }
      },
      {
        title: 'Area of the triangle',
        lines: ['[ABC] = \\tfrac{1}{2}\\cdot AC \\cdot BC', '= \\tfrac{1}{2}\\cdot 6 \\cdot 8 = 24'],
        note: 'The two legs are perpendicular, so one is the height of the other.',
        fig(F) { F.fadeIn(F.path([A, B, C], 'fill-yellow', 'fills'), 700); F.fadeIn(F.text([5.1, 1.0], 'Area 24', 'len yellow small', 0, 0, 'fills'), 500, 500); }
      },
      {
        title: 'Cut the triangle at the centre $I$',
        lines: ['[ABC] = [IBC] + [ICA] + [IAB]', '= \\tfrac12 r\\cdot BC + \\tfrac12 r\\cdot CA + \\tfrac12 r\\cdot AB', '= r \\cdot \\dfrac{BC + CA + AB}{2} = r\\cdot s'],
        note: 'Each radius meets its side at a right angle, so all three small triangles have height $r$.',
        fig(F) {
          F.clear('fills');
          F.fadeIn(F.path([I, B, C], 'fill-blue', 'fills'), 600);
          F.fadeIn(F.path([I, C, A], 'fill-pink', 'fills'), 600, 250);
          F.fadeIn(F.path([I, A, B], 'fill-green', 'fills'), 600, 500);
          [[I, A], [I, B], [I, C]].forEach(([p, q], i) => F.draw(F.seg(p, q, 'thin', 'over'), 700, 200 * i));
          [T1, T2, T3].forEach((t, i) => F.draw(F.seg(I, t, 'radius strong', 'over'), 600, 700 + 150 * i));
          F.fadeIn(F.right(T1, unit(T1, I), [0, 1], 0.35, 'strong'), 400, 1200);
          F.fadeIn(F.right(T2, unit(T2, I), [1, 0], 0.35, 'strong'), 400, 1250);
          F.fadeIn(F.right(T3, unit(T3, I), unit(T3, B), 0.35, 'strong'), 400, 1300);
        }
      },
      {
        title: 'Semiperimeter',
        lines: ['s = \\dfrac{AC + BC + AB}{2} = \\dfrac{6 + 8 + 10}{2} = 12'],
        note: 'Half of the distance all the way around the triangle.',
        fig(F) { F.draw(F.path([C, B, A], 'hl blue', 'over'), 1300); }
      },
      {
        title: 'Solve for $r$',
        lines: ['r\\cdot s = [ABC]', 'r = \\dfrac{[ABC]}{s} = \\dfrac{24}{12} = \\boxed{2}'],
        note: 'So the circle has radius 2 and its centre is at distance 2 from both legs.',
        fig(F) {
          F.clear('fills');
          const c = F.circle(I, 2, 'incircle solid', 'over'); F.draw(c, 1200);
          F.fadeIn(F.text([2, 2], 'r = 2', 'len yellow', 0, 22), 500, 900);
        }
      },
      {
        title: 'Cross-check with tangent lengths',
        lines: ['CT_1 = CT_2 = r,\\quad AT_1 = AT_3,\\quad BT_2 = BT_3', '(6 - r) + (8 - r) = AB = 10', 'r = \\dfrac{6 + 8 - 10}{2} = 2 \\;\\checkmark'],
        note: 'Two tangent segments from the same point are equal.',
        fig(F) {
          const segs = [[C, T1, 'pink'], [C, T2, 'pink'], [A, T1, 'blue'], [A, T3, 'blue'], [B, T2, 'green'], [B, T3, 'green']];
          segs.forEach(([p, q, col], i) => F.draw(F.seg(p, q, 'hl ' + col, 'over'), 600, i * 160));
          [[mid(C, T1), '2', -14, 0], [mid(C, T2), '2', 0, 16], [mid(A, T1), '4', -14, 0], [mid(A, T3), '4', 14, -10], [mid(B, T2), '6', 0, 16], [mid(B, T3), '6', 14, -6]]
            .forEach(([p, t, dx, dy], i) => F.fadeIn(F.text(p, t, 'len small', dx, dy), 300, 900 + i * 90));
          ['T₁', 'T₂', 'T₃'].forEach((n, i) => F.fadeIn(F.text([T1, T2, T3][i], n, 'pt tiny', [12, 10, -6][i], [0, -10, -14][i]), 300, 1300));
        }
      },
      {
        title: 'Check every option',
        options: true,
        note: 'Exactly two of the eight options equal $r$.'
      }
    ]
  };


  // ------- Trigonometry: height of a tower from two angles of elevation -------
  const tP = [0, 0], tQ = [20, 0], tF = [30, 0], tT = [30, 10 * Math.sqrt(3)];
  const tower = {
    id: 'trig-tower-30-60',
    category: 'trigonometry',
    title: 'The tower seen twice',
    difficulty: 2,
    statement: 'From a point $P$ on flat ground, the top $T$ of a vertical tower is seen at an angle of elevation of $30^\\circ$. After walking $20$ m straight towards the tower, to $Q$, the angle of elevation is $60^\\circ$. <b>Which of the following equal the height $h$ of the tower (in metres)?</b>',
    figureText: 'Flat ground with points P, Q and the foot F of the tower, in that order. PQ = 20 m, QF = x is unknown. The tower FT of height h is vertical. Angle of elevation of T from P is 30°, from Q is 60°.',
    hint: 'Look at the angles of triangle $PQT$ — two of them are equal.',
    aiHint: 'Please solve it with a different method than the isosceles-triangle shortcut if you can (for example two tangent equations, or the law of sines), show every step, then check each option and say which ones are correct.',
    figure(svg) {
      const F = Figure(svg, { w: 30, h: 17.6, scale: 10.6, pad: 30 });
      F.seg([-1.5, 0], [32.5, 0], 'ground');
      for (let x = -1; x < 32; x += 1.6) F.seg([x, 0], [x - 0.9, -0.9], 'hatch');
      F.rect(29.2, 0, 1.6, 10 * Math.sqrt(3), 'towerbody');
      F.seg(tP, tT, 'sight'); F.seg(tQ, tT, 'sight');
      F.arc(tP, 4, 0, 30); F.arc(tQ, 3, 0, 60);
      F.text([5.6, 1.4], '30°', 'len small'); F.text([24.2, 2.3], '60°', 'len small');
      [tP, tQ, tF, tT].forEach(p => F.dot(p));
      F.text(tP, 'P', 'pt', -4, 14); F.text(tQ, 'Q', 'pt', 0, 16); F.text(tF, 'F', 'pt', 8, 16); F.text(tT, 'T', 'pt', -12, -8);
      F.text([10, 0], '20 m', 'len', 0, 16); F.text([25, 0], 'x', 'len it', 0, 16);
      F.text([30, 5 * Math.sqrt(3)], 'h', 'len it', 18, 0);
      return F;
    },
    options: [
      { tex: 'h = 10\\sqrt{3}', correct: true, why: 'The height: $\\approx 17.32$ m.' },
      { tex: 'h = 20\\sin 60^\\circ', correct: true, why: '$QT = 20$, so $h = QT\\sin 60^\\circ = 10\\sqrt3$.' },
      { tex: 'h = 20\\sqrt{3}', correct: false, why: 'Uses $\\tan 60^\\circ$ with $x = 20$ instead of $x = 10$.' },
      { tex: 'h = 10', correct: false, why: 'That is $x = QF$, the distance to the foot.' },
      { tex: 'h = 20', correct: false, why: 'That is $QT$, the slanted line of sight.' },
      { tex: 'h = 20\\tan 30^\\circ', correct: false, why: '$\\approx 11.55$: treats $PQ$ as if it reached the tower.' },
      { tex: 'h = 15', correct: false, why: 'A guess between 10 and 20.' },
      { tex: 'h = 10\\sqrt{2}', correct: false, why: '$\\approx 14.14$: would need a $45^\\circ$ angle.' }
    ],
    steps: [
      {
        title: 'Angles of triangle $PQT$',
        lines: ['\\angle PQT = 180^\\circ - 60^\\circ = 120^\\circ', '\\angle PTQ = 180^\\circ - 30^\\circ - 120^\\circ = 30^\\circ'],
        note: 'The angle at $Q$ inside the triangle is the supplement of the $60^\\circ$ elevation.',
        fig(F) { F.fadeIn(F.path([tP, tQ, tT], 'fill-yellow', 'fills'), 600); F.draw(F.arc(tT, 3.2, 210, 240, 'strong', 'over'), 700, 300); F.fadeIn(F.text([29, 11.6], '30°', 'len yellow small', -14, 0), 400, 800); F.fadeIn(F.text(tQ, '120°', 'len yellow small', -4, -20), 400, 500); }
      },
      {
        title: 'Two equal angles → two equal sides',
        lines: ['\\angle QPT = \\angle PTQ = 30^\\circ', '\\Rightarrow\\ QT = PQ = 20'],
        note: 'Triangle $PQT$ is isosceles, so the sides opposite the equal angles are equal.',
        fig(F) { F.draw(F.seg(tP, tQ, 'hl blue', 'over'), 700); F.draw(F.seg(tQ, tT, 'hl blue', 'over'), 800, 300); F.fadeIn(F.text([25, 8.66], '20', 'len', -14, -6), 400, 900); }
      },
      {
        title: 'The right triangle $QFT$',
        lines: ['h = QT\\cdot\\sin 60^\\circ', '= 20\\cdot\\tfrac{\\sqrt3}{2} = \\boxed{10\\sqrt3} \\approx 17.32'],
        note: 'In the right triangle at $F$, the side opposite the $60^\\circ$ angle is $h$.',
        fig(F) { F.clear('fills'); F.fadeIn(F.path([tQ, tF, tT], 'fill-green', 'fills'), 600); F.fadeIn(F.right(tF, [-1, 0], [0, 1], 1.4, 'strong'), 400, 300); F.draw(F.seg(tF, tT, 'hl green', 'over'), 900, 400); }
      },
      {
        title: 'Cross-check with two tangents',
        lines: ['\\tan 60^\\circ = \\frac{h}{x},\\qquad \\tan 30^\\circ = \\frac{h}{x + 20}', 'x\\sqrt3 = \\frac{x + 20}{\\sqrt3}\\ \\Rightarrow\\ 3x = x + 20\\ \\Rightarrow\\ x = 10', 'h = 10\\tan 60^\\circ = 10\\sqrt3\\ \\checkmark'],
        note: 'Two equations, two unknowns — the same height.',
        fig(F) { F.draw(F.seg(tQ, tF, 'hl pink', 'over'), 700); F.fadeIn(F.text([25, 0], 'x = 10', 'len', 0, -12), 400, 600); }
      },
      { title: 'Check every option', options: true, note: 'Exactly two of the eight options equal $h$.' }
    ]
  };

  // ------- Algebra: a rectangle given by its area -------
  const rect = {
    id: 'alg-rectangle-area-40',
    category: 'algebra',
    title: 'Three metres longer',
    difficulty: 1,
    statement: 'The length of a rectangle is $3$ more than its width $w$, and its area is $40$. <b>Which of the following are equal to $w$?</b>',
    figureText: 'A rectangle with width w (short side) and length w + 3 (long side); the area inside is 40.',
    hint: 'Write the area as $w(w+3)$ and solve the quadratic equation.',
    aiHint: 'Please solve it in a different way if you can (for example completing the square, or a quick guess-and-check of factor pairs of 40), show every step, then check each option and say which ones are correct.',
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 5, scale: 36, pad: 34 });
      F.path([[0, 0], [8, 0], [8, 5], [0, 5]], 'tri');
      F.right([0, 0], [1, 0], [0, 1], 0.4);
      F.text([0, 2.5], 'w', 'len it', -16, 0); F.text([4, 0], 'w + 3', 'len it', 0, 18);
      F.text([4, 2.5], 'Area = 40', 'len big');
      return F;
    },
    options: [
      { tex: 'w = 5', correct: true, why: 'The width: $5\\cdot 8 = 40$.' },
      { tex: 'w = \\tfrac{-3 + \\sqrt{169}}{2}', correct: true, why: 'The quadratic formula: $\\tfrac{-3+13}{2} = 5$.' },
      { tex: 'w = 8', correct: false, why: 'That is the length $w + 3$.' },
      { tex: 'w = -8', correct: false, why: 'The other root of the equation — a width cannot be negative.' },
      { tex: 'w = \\tfrac{-3 - \\sqrt{169}}{2}', correct: false, why: 'Also $-8$, the negative root.' },
      { tex: 'w = \\sqrt{40}', correct: false, why: 'The side of a square with area 40.' },
      { tex: 'w = \\dfrac{40}{3}', correct: false, why: 'Divides the area by 3 — mixes up “3 more” with “3 times”.' },
      { tex: 'w = 4', correct: false, why: '$4 \\cdot 7 = 28 \\neq 40$.' }
    ],
    steps: [
      {
        title: 'Turn the words into an equation',
        lines: ['w\\,(w + 3) = 40', 'w^2 + 3w - 40 = 0'],
        note: 'Area of a rectangle = width × length.',
        fig(F) { F.fadeIn(F.path([[0, 0], [8, 0], [8, 5], [0, 5]], 'fill-yellow', 'fills'), 700); }
      },
      {
        title: 'Factor',
        lines: ['(w + 8)(w - 5) = 0', 'w = -8 \\quad\\text{or}\\quad w = 5'],
        note: 'Look for two numbers that multiply to $-40$ and add to $3$: $8$ and $-5$.'
      },
      {
        title: 'Keep the root that makes sense',
        lines: ['w > 0\\ \\Rightarrow\\ \\boxed{w = 5}', '\\text{check: } 5 \\cdot 8 = 40\\ \\checkmark'],
        note: 'A length cannot be negative, so $-8$ is rejected.',
        fig(F) { F.draw(F.seg([0, 0], [0, 5], 'hl blue', 'over'), 700); F.draw(F.seg([0, 0], [8, 0], 'hl pink', 'over'), 900, 300); F.fadeIn(F.text([0, 2.5], '5', 'len', -32, 0), 400, 600); F.fadeIn(F.text([4, 0], '= 8', 'len', 46, 18), 400, 900); }
      },
      {
        title: 'Same answer with the quadratic formula',
        lines: ['w = \\frac{-3 \\pm \\sqrt{3^2 + 4\\cdot 40}}{2} = \\frac{-3 \\pm \\sqrt{169}}{2}', '= \\frac{-3 \\pm 13}{2} = 5 \\ \\text{or}\\ -8'],
        note: 'So $\\tfrac{-3+\\sqrt{169}}{2}$ is just another way of writing $5$.'
      },
      { title: 'Check every option', options: true, note: 'Two options equal $w$; the others are the length, the negative root or slips.' }
    ]
  };

  // ------- Calculus: the biggest pen against a wall -------
  const penA = x => x * (40 - 2 * x);
  const gx = x => 6.3 + x * 0.17, gy = a => 0.5 + a * 0.024;
  const pen = {
    id: 'calc-pen-wall-40',
    category: 'calculus',
    title: 'The biggest pen against the wall',
    difficulty: 2,
    statement: 'A farmer has $40$ m of fencing to build a rectangular pen against a long straight wall, so only three sides need fencing. <b>What is the largest area the pen can have?</b>',
    figureText: 'A long wall along the top. A rectangular pen touches the wall; the two sides perpendicular to the wall have length x, the side parallel to the wall has length y, and 2x + y = 40 m of fence is used.',
    hint: 'Call the two sides touching the wall $x$; the third side is then $40 - 2x$.',
    aiHint: 'Please solve it with a method other than the derivative if you can (for example completing the square or the AM–GM inequality), show every step, then check each option and say which ones are correct.',
    figure(svg) {
      const F = Figure(svg, { w: 10, h: 6, scale: 34, pad: 26 });
      F.seg([0, 5.6], [5.8, 5.6], 'wall');
      for (let x = 0.1; x < 5.8; x += 0.35) F.seg([x, 5.6], [x + 0.3, 5.95], 'hatch');
      F.text([2.9, 5.6], 'wall', 'len small muted', 0, -18);
      F.path([[0.8, 5.6], [0.8, 3.0], [5, 3.0], [5, 5.6]], 'fence', 'base', false);
      F.text([0.8, 4.3], 'x', 'len it', -12, 0); F.text([5, 4.3], 'x', 'len it', 12, 0); F.text([2.9, 3.0], 'y', 'len it', 0, 16);
      F.text([2.9, 4.3], 'A = ?', 'len');
      // inset: graph of A(x)
      F.seg([gx(0), gy(0)], [gx(21.5), gy(0)], 'axis'); F.seg([gx(0), gy(0)], [gx(0), gy(225)], 'axis');
      F.text([gx(21.5), gy(0)], 'x', 'len it small', 8, 0); F.text([gx(0), gy(225)], 'A', 'len it small', 0, -8);
      F.text([gx(20), gy(0)], '20', 'tick', 0, 12); F.text([gx(0), gy(0)], '0', 'tick', -8, 10);
      return F;
    },
    options: [
      { tex: '200\\ \\text{m}^2', correct: true, why: 'The maximum, at $x = 10$, $y = 20$.' },
      { tex: '100\\ \\text{m}^2', correct: false, why: 'A $10\\times10$ square fenced on all four sides — ignores the wall.' },
      { tex: '400\\ \\text{m}^2', correct: false, why: '$20\\times 20$ would need $60$ m of fence.' },
      { tex: '192\\ \\text{m}^2', correct: false, why: '$x = 12$, $y = 16$ — close, but not the maximum.' },
      { tex: '\\tfrac{400}{3}\\ \\text{m}^2', correct: false, why: 'Three equal sides of $\\tfrac{40}{3}$ — a square pen is not the best here.' },
      { tex: '128\\ \\text{m}^2', correct: false, why: '$x = 4$, $y = 32$.' },
      { tex: '225\\ \\text{m}^2', correct: false, why: 'A $15\\times 15$ square would need $45$ m.' },
      { tex: '800\\ \\text{m}^2', correct: false, why: 'Doubles the real maximum.' }
    ],
    steps: [
      {
        title: 'Build a model',
        lines: ['2x + y = 40\\ \\Rightarrow\\ y = 40 - 2x', 'A(x) = x\\,(40 - 2x) = 40x - 2x^2,\\quad 0 < x < 20'],
        note: 'Only three sides use fence: two of length $x$ and one of length $y$.',
        fig(F) { const pts = []; for (let x = 0; x <= 20.001; x += 0.5) pts.push([gx(x), gy(penA(x))]); F.draw(F.curve(pts, 'graph', 'over'), 1300); }
      },
      {
        title: 'Where the slope is zero',
        lines: ["A'(x) = 40 - 4x = 0", '\\Rightarrow\\ x = 10'],
        note: 'At the top of the curve the tangent is horizontal.',
        fig(F) { F.draw(F.seg([gx(6), gy(200)], [gx(14), gy(200)], 'hl yellow', 'over'), 600); F.fadeIn(F.dot([gx(10), gy(200)], 'center'), 300, 500); F.fadeIn(F.text([gx(10), gy(200)], '(10, 200)', 'len small', 0, -12), 400, 700); }
      },
      {
        title: 'Check it is a maximum',
        lines: ["A''(x) = -4 < 0", 'y = 40 - 2\\cdot 10 = 20'],
        note: 'The parabola opens downward, so the critical point is the highest point.'
      },
      {
        title: 'The largest area',
        lines: ['A(10) = 10 \\cdot 20 = \\boxed{200}\\ \\text{m}^2'],
        note: 'The best pen is twice as long as it is deep.',
        fig(F) { F.fadeIn(F.path([[0.8, 5.6], [0.8, 3.0], [5, 3.0], [5, 5.6]], 'fill-yellow', 'fills'), 600); [...F.layers.labels.querySelectorAll('text')].filter(t => t.textContent === 'A = ?').forEach(t => { t.textContent = 'A = 200'; }); F.fadeIn(F.text([0.8, 3.4], '= 10', 'len', -22, 0), 300, 300); F.fadeIn(F.text([2.9, 3.0], '20', 'len', 18, 16), 300, 500); }
      },
      {
        title: 'Without calculus',
        lines: ['A = -2(x^2 - 20x) = -2(x - 10)^2 + 200 \\le 200'],
        note: 'Completing the square gives the same maximum, reached at $x = 10$.'
      },
      { title: 'Check every option', options: true, note: 'Only one option is the maximum area.' }
    ]
  };

  // ------- Probability: two dice, prime sum -------
  const isPrime = n => [2, 3, 5, 7, 11].includes(n);
  const cellX = i => 1.2 + (i - 1), cellY = j => 5.2 - (j - 1);
  const dice = {
    id: 'prob-two-dice-prime',
    category: 'probability',
    title: 'Prime time with two dice',
    difficulty: 1,
    statement: 'Two fair six-sided dice are rolled and the two numbers are added. <b>Which of the following equal the probability that the sum is a prime number?</b>',
    figureText: 'A 6 × 6 table: columns are the first die (1–6), rows are the second die (1–6), each cell shows the sum.',
    hint: 'Make the $6 \\times 6$ table of all sums: every cell is equally likely.',
    aiHint: 'Please solve it in a different way if you can (for example by listing the number of ways for each sum, or a tree diagram), show every step, then check each option and say which ones are correct.',
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 7.4, scale: 38, pad: 18 });
      for (let i = 1; i <= 6; i++) { F.text([cellX(i) + 0.5, 6.7], String(i), 'pt small'); F.text([0.65, cellY(i) + 0.5], String(i), 'pt small'); }
      F.text([4.2, 7.3], 'first die', 'tick'); F.text([0.2, 3.2], '2nd', 'tick');
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) {
        const r = F.rect(cellX(i), cellY(j), 1, 1, 'cell'); r.dataset.sum = i + j; r.dataset.prime = isPrime(i + j) ? 1 : 0;
        F.text([cellX(i) + 0.5, cellY(j) + 0.5], String(i + j), 'cellnum');
      }
      return F;
    },
    options: [
      { tex: '\\dfrac{5}{12}', correct: true, why: '$\\tfrac{15}{36}$ simplified.' },
      { tex: '\\dfrac{15}{36}', correct: true, why: '15 favourable cells out of 36.' },
      { tex: '\\dfrac{5}{11}', correct: false, why: '5 prime sums out of 11 possible sums — but the sums are not equally likely.' },
      { tex: '\\dfrac{1}{2}', correct: false, why: 'Prime and not-prime are not equally likely.' },
      { tex: '\\dfrac{13}{36}', correct: false, why: 'Forgets the two ways to make $11$.' },
      { tex: '\\dfrac{7}{18}', correct: false, why: '$\\tfrac{14}{36}$: forgets the single way to make $2$.' },
      { tex: '\\dfrac{1}{3}', correct: false, why: '$\\tfrac{12}{36}$.' },
      { tex: '\\dfrac{1}{6}', correct: false, why: 'Only the sum $7$.' }
    ],
    steps: [
      {
        title: 'All outcomes',
        lines: ['6 \\times 6 = 36 \\text{ equally likely outcomes}'],
        note: 'Each cell of the table is one ordered pair (first die, second die).',
        fig(F) { F.svg.querySelectorAll('.cell').forEach((c, k) => { c.style.transition = 'fill .3s ' + (k * 18) + 'ms'; c.classList.add('lit'); }); }
      },
      {
        title: 'Which sums are prime?',
        lines: ['\\text{sums } 2 \\dots 12:\\quad 2,\\ 3,\\ 5,\\ 7,\\ 11', '4, 6, 8, 9, 10, 12 \\text{ are not prime}'],
        note: '1 is not prime, and it cannot appear anyway.',
        fig(F) { F.svg.querySelectorAll('.cell').forEach((c, k) => { c.classList.remove('lit'); if (c.dataset.prime === '1') { c.style.transition = 'fill .35s ' + (k * 25) + 'ms'; c.classList.add('hit'); } }); }
      },
      {
        title: 'Count the favourable cells',
        lines: ['\\underbrace{1}_{2} + \\underbrace{2}_{3} + \\underbrace{4}_{5} + \\underbrace{6}_{7} + \\underbrace{2}_{11} = 15'],
        note: 'Each prime sum appears along one diagonal of the table.'
      },
      {
        title: 'The probability',
        lines: ['P = \\frac{15}{36} = \\boxed{\\frac{5}{12}} \\approx 0.417'],
        note: 'Favourable outcomes over all outcomes.'
      },
      { title: 'Check every option', options: true, note: 'Two options are the same probability written in two ways.' }
    ]
  };

  // ------- Number theory: last digit of a huge power (none of the options is right!) -------
  const nc = [4, 3], nR = 2.1;
  const node = k => { const a = (90 - k * 90) * Math.PI / 180; return [nc[0] + nR * Math.cos(a), nc[1] + nR * Math.sin(a)]; };
  const lastDigit = {
    id: 'nt-last-digit-7-2026',
    category: 'number',
    title: 'The last digit of a giant',
    difficulty: 2,
    statement: '$7^{2026}$ has more than 1700 digits. <b>Which of the following is its last digit?</b>',
    figureText: 'A cycle diagram of the last digits of the powers of 7: 7¹ ends in 7, 7² in 9, 7³ in 3, 7⁴ in 1, then the pattern repeats.',
    hint: 'Write the last digits of $7, 7^2, 7^3, \\dots$ and look for a pattern.',
    aiHint: 'Please solve it with another method if you can (for example modular arithmetic or Euler’s theorem), show every step, then check each option — it is possible that none of them is correct.',
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 6, scale: 36, pad: 20 });
      F.arrowDefs();
      F.circle(nc, nR, 'ring');
      const digits = ['7', '9', '3', '1'], pw = ['7¹', '7²', '7³', '7⁴'];
      for (let k = 0; k < 4; k++) {
        const a0 = 90 - k * 90 - 20, a1 = 90 - k * 90 - 70;
        const arc = F.arc(nc, nR, a0, a1, 'cyc', 'base'); arc.setAttribute('marker-end', 'url(#arrowhead)');
        const p = node(k); const c = F.circle(p, 0.52, 'node'); c.dataset.k = k;
        F.text(p, digits[k], 'nodenum');
        const out = [nc[0] + (nR + 0.95) * Math.cos((90 - k * 90) * Math.PI / 180), nc[1] + (nR + 0.95) * Math.sin((90 - k * 90) * Math.PI / 180)];
        F.text(out, pw[k], 'tick');
      }
      F.text(nc, 'last digit', 'tick');
      F.text([nc[0], nc[1] - 0.45], 'of 7ⁿ', 'tick');
      return F;
    },
    options: [
      { tex: '1', correct: false, why: 'Ends a full cycle: $7^{2024}$ ends in 1, not $7^{2026}$.' },
      { tex: '3', correct: false, why: 'That is $7^3$, $7^{2027}$, …' },
      { tex: '7', correct: false, why: 'That is $7^1$, $7^{2025}$, …' },
      { tex: '0', correct: false, why: 'Powers of 7 are not multiples of 10.' },
      { tex: '2', correct: false, why: 'Powers of 7 are odd.' },
      { tex: '4', correct: false, why: 'Powers of 7 are odd.' },
      { tex: '6', correct: false, why: 'Powers of 7 are odd.' },
      { tex: '8', correct: false, why: 'Powers of 7 are odd.' }
    ],
    steps: [
      {
        title: 'Only the last digit matters',
        lines: ['7^1 = 7,\\quad 7^2 = 49,\\quad 7^3 = 343,\\quad 7^4 = 2401,\\quad 7^5 = 16807'],
        note: 'To get the next last digit, multiply the previous last digit by 7.',
        fig(F) { F.svg.querySelectorAll('.node').forEach((c, k) => { c.style.transition = 'fill .3s ' + (k * 350) + 'ms'; c.classList.add('lit'); }); }
      },
      {
        title: 'The pattern repeats every 4',
        lines: ['7,\\ 9,\\ 3,\\ 1,\\ 7,\\ 9,\\ 3,\\ 1,\\ \\dots'],
        note: 'After $7^4$ ends in 1, multiplying by 7 starts the cycle again.',
        fig(F) { F.svg.querySelectorAll('.cyc').forEach((c, k) => { c.classList.add('strong'); F.draw(c, 500, k * 300); }); }
      },
      {
        title: 'Where 2026 lands in the cycle',
        lines: ['2026 = 4 \\cdot 506 + 2', '7^{2026} \\text{ ends like } 7^2 \\Rightarrow \\boxed{9}'],
        note: 'Remainder 2 → the second digit of the cycle.',
        fig(F) { const c = F.svg.querySelector('.node[data-k="1"]'); c.classList.add('hit'); F.fadeIn(F.circle(node(1), 0.78, 'halo', 'over'), 500, 200); }
      },
      {
        title: 'Check with congruences',
        lines: ['7^4 = 2401 \\equiv 1 \\pmod{10}', '7^{2026} = (7^4)^{506}\\cdot 7^2 \\equiv 1^{506}\\cdot 49 \\equiv 9 \\pmod{10}'],
        note: 'Working modulo 10 keeps only the last digit.'
      },
      { title: 'Check every option', options: true, note: 'The last digit is 9 — it is not among the options, so “None of these is correct” is the right answer.' }
    ]
  };

  const PUZZLES = [incircle, tower, rect, pen, dice, lastDigit];

  global.PuzzleBank = {
    categories: CATEGORIES,
    puzzles: PUZZLES,
    count(cat) { return PUZZLES.filter(p => p.category === cat).length; },
    random(cat, exceptId) {
      const pool = PUZZLES.filter(p => p.category === cat);
      const fresh = pool.filter(p => p.id !== exceptId);
      const from = fresh.length ? fresh : pool;
      return from[Math.floor(Math.random() * from.length)] || null;
    }
  };
})(window);
