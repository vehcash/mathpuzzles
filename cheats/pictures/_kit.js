/* CheatPics — pictures added to the cheat-sheet lessons (cheats/tutorials/<topic>.js), one file per topic in
   cheats/pictures/<topic>.js, loaded by js/tutor.js right after the topic's lessons.
     CheatPics.vis(topic, 'Section/Item', actions, 'caption en|fr|es|ja|zh', { replace, step })
   adds the board actions (see js/tutor.js) to the lesson's first step (or `step`) and one sentence to its text.
   Helpers build the usual pictures in maths units: flat scenes (S2), turnable 3D (S3), tiles, measured sides,
   linear maps of the unit square (MAP), matrices as grids of cells (GRID), number lines, bar charts and graphs. */
(function (global) {
  'use strict';
  if (global.CheatPics) return;
  const SCN = new Set(['3d', 'seg', 'vec', 'line3', 'pl', 'pt3', 'sph', 'circ3', 'lab3', 'poly3', 'ax', 'p', 'sh', 'pt', 'lbl', 'ln', 'tan']);
  const Z = (x, y, z = 0) => [x, y, z];
  const K = {
    Z,
    S2: (c, r, o = {}) => ['3d', Object.assign({ flat: true, axes: false, c: [c[0], c[1], 0], r }, o)],
    S2A: (c, r, o = {}) => ['3d', Object.assign({ flat: true, axes: true, names: ['x', 'y', ''], c: [c[0], c[1], 0], r }, o)],
    S3: (c, r, o = {}) => ['3d', Object.assign({ c, r, yaw: -0.75, pitch: 0.42 }, o)],
    SG: (a, b, c = 'chalk', o = {}) => ['seg', a.length === 2 ? Z(...a) : a, b.length === 2 ? Z(...b) : b, Object.assign({ c }, o)],
    V: (a, b, c = 'y', o = {}) => ['vec', a.length === 2 ? Z(...a) : a, b.length === 2 ? Z(...b) : b, Object.assign({ c, w: 3 }, o)],
    LB: (p, t, c = 'chalk', size = 17) => ['lab3', p.length === 2 ? Z(...p) : p, t, { c, size }],
    PT: (p, lab = '', c = 'y', o = {}) => ['pt3', p.length === 2 ? Z(...p) : p, lab, Object.assign({ c }, o)],
    POLY: (pts, c = 'b', fill = 0.25, o = {}) => ['poly3', pts.map(p => (p.length === 2 ? Z(...p) : p)), Object.assign({ c, fill }, o)],
    RECT: (x0, y0, x1, y1, c = 'b', fill = 0.3) => ['poly3', [Z(x0, y0), Z(x1, y0), Z(x1, y1), Z(x0, y1)], { c, fill }],
    CI: (o, r, c = 'b', fill = 0) => ['circ3', o.length === 2 ? Z(...o) : o, [0, 0, 1], r, { c, fill }],
    PL: (n, D, c = 'b', o = {}) => ['pl', n, D, Object.assign({ c }, o)],
    AX: (xw, yw) => ['ax', { xw, yw }],
    P: (eq, c = 'y', o = {}) => ['p', 'y=' + eq, Object.assign({ c }, o)],
    SH: (a, b) => ['sh', a, b],
    PTG: (x, y, lab = '', c = 'o', o = {}) => ['pt', x, y, lab, Object.assign({ c }, o)],
    LN: (x1, y1, x2, y2, c = 'chalk', o = {}) => ['ln', x1, y1, x2, y2, Object.assign({ c }, o)],
    LBL: (x, y, tex, c = 'y') => ['lbl', x, y, tex, { c }],
    // staggered appearance
    SEQ: (items, d0 = 200, step = 90) => items.map((a, i) => { const o = a[a.length - 1]; if (o && typeof o === 'object' && !Array.isArray(o)) o.d = d0 + i * step; return a; }),
    // a cell with a label in its middle
    TILE: (x0, y0, x1, y1, c, lab, fill = 0.3, lc = 'chalk', size) => [K.RECT(x0, y0, x1, y1, c, fill), K.LB([(x0 + x1) / 2, (y0 + y1) / 2], lab, lc, size || 17)],
    // a measured side |— lab —|
    DH: (x0, x1, y, lab, c = 'chalk') => [K.SG([x0, y], [x1, y], c, { w: 1.5 }), K.SG([x0, y - 0.09], [x0, y + 0.09], c, { w: 1.5 }), K.SG([x1, y - 0.09], [x1, y + 0.09], c, { w: 1.5 }), K.LB([(x0 + x1) / 2, y - 0.27], lab, c)],
    DV: (y0, y1, x, lab, c = 'chalk') => [K.SG([x, y0], [x, y1], c, { w: 1.5 }), K.SG([x - 0.09, y0], [x + 0.09, y0], c, { w: 1.5 }), K.SG([x - 0.09, y1], [x + 0.09, y1], c, { w: 1.5 }), K.LB([x - 0.32, (y0 + y1) / 2], lab, c)],
    // the unit square and its image under the 2×2 matrix m = [[a, b], [c, d]], drawn at (ox, oy): columns = images of e₁, e₂
    MAP: (m, ox = 0, oy = 0, o = {}) => {
      const s = o.s || 1, [[a, b], [c, d]] = m, P = (x, y) => Z(ox + s * x, oy + s * y), out = [];
      if (o.grid !== false) for (let k = -1; k <= 2; k++) { out.push(K.SG(P(k * a + -1 * b, k * c + -1 * d), P(k * a + 2 * b, k * c + 2 * d), 'chalk', { w: 0.8, dash: true })); out.push(K.SG(P(-1 * a + k * b, -1 * c + k * d), P(2 * a + k * b, 2 * c + k * d), 'chalk', { w: 0.8, dash: true })); }
      if (o.unit !== false) out.push(['poly3', [P(0, 0), P(1, 0), P(1, 1), P(0, 1)], { c: 'chalk', fill: 0.05, dash: true, w: 1.2 }]);
      out.push(['poly3', [P(0, 0), P(a, c), P(a + b, c + d), P(b, d)], { c: o.c || 'y', fill: o.fill !== undefined ? o.fill : 0.25 }]);
      out.push(K.V(P(0, 0), P(a, c), 'p'), K.V(P(0, 0), P(b, d), 'b'));
      if (o.lab) out.push(K.LB(P((a + b) / 2, (c + d) / 2), o.lab, 'chalk', 17));
      if (o.title) out.push(K.LB(P(o.tx !== undefined ? o.tx : 0.5, o.ty !== undefined ? o.ty : -0.75), o.title, o.tc || 'y', 18));
      return out;
    },
    // a matrix drawn as a grid of cells; color(i, j) → colour or null, text(i, j) → label
    GRID: (n, m, x0, y0, cell, color, text, o = {}) => {
      const out = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) {
        const c = color ? color(i, j) : null, X = x0 + j * cell, Y = y0 - i * cell;
        out.push(K.RECT(X, Y - cell * 0.92, X + cell * 0.92, Y, c || 'chalk', c ? 0.3 : 0.04));
        const t = text ? text(i, j) : ''; if (t !== '' && t != null) out.push(K.LB([X + cell * 0.46, Y - cell * 0.46], String(t), o.tc || 'chalk', o.size || 17));
      }
      return out;
    },
    // bars: values v[k] at x = x0 + k·gap
    BARS: (v, x0 = 0, gap = 1, s = 1, c = 'b', hi = -1) => v.map((y, k) => K.RECT(x0 + k * gap - gap * 0.38, 0, x0 + k * gap + gap * 0.38, y * s, k === hi ? 'y' : c, k === hi ? 0.55 : 0.3)),
    // a number line from a to b at height y, with ticks at the integers
    NL: (a, b, y = 0, c = 'chalk', ticks = true) => { const out = [K.SG([a - 0.3, y], [b + 0.3, y], c, { w: 1.6 })]; if (ticks) for (let k = Math.ceil(a); k <= b; k++) out.push(K.SG([k, y - 0.08], [k, y + 0.08], c, { w: 1.2 })); return out; }
  };
  const pick = (s, i) => { const p = String(s).split('|'); return p[i] || p[0]; };
  function vis(topic, key, acts, cap, o = {}) {
    const T = global.Cheats && global.Cheats.tutorials && global.Cheats.tutorials[topic];
    const steps = T && T[key]; if (!steps) return;
    const st = steps[o.step || 0]; if (!st) return;
    if (st._pic && !o.more) return; st._pic = true;   // once (files may be loaded twice)
    if (o.replace) st.a = (st.a || []).filter(a => !SCN.has(a[0]));
    st.a = (st.a || []).concat(acts);
    if (cap) { const a = String(st.s || '').split('|'); st.s = [0, 1, 2, 3, 4].map(i => ((a[i] || a[0]) + ' ' + pick(cap, i)).trim()).join('|'); }
  }
  global.CheatPics = Object.assign({ vis }, K);
})(window);
