/* InkMath — offline handwritten-math recognizer.
   • $P point-cloud recognizer (Vatavu, Anthony & Wobbrock) with a synthesized glyph library.
   • Layout analysis: symbol grouping, fraction bars, square roots, exponents, degree marks,
     decimal points, function names (sin, cos, tan, log, ln).
   Output: ASCII math (fed to MathCore) + per-symbol boxes. */
(function (global) {
  'use strict';
  const N = 40;

  // ---------- glyph library (y grows downward; units are relative, aspect preserved) ----------
  const arc = (cx, cy, rx, ry, a0, a1, n = 14) => {
    const pts = [];
    for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return pts;
  };
  const G = {
    '0': [[arc(0.35, 0.5, 0.35, 0.5, -90, 270)], [arc(0.35, 0.5, 0.33, 0.5, -60, 300)]],
    '1': [[[[0.0, 0], [0.0, 1]]], [[[-0.2, 0.2], [0.0, 0], [0.0, 1]]], [[[-0.2, 0.2], [0.0, 0], [0.0, 1]], [[-0.2, 1], [0.2, 1]]]],
    '2': [[[[0.05, 0.25], [0.2, 0.05], [0.45, 0], [0.7, 0.07], [0.78, 0.27], [0.68, 0.48], [0.4, 0.72], [0.05, 1], [0.8, 1]]],
          [[[0.05, 0.2], [0.35, 0], [0.7, 0.1], [0.72, 0.35], [0.05, 1], [0.8, 0.98]]]],
    '3': [[[[0.05, 0.12], [0.3, 0], [0.6, 0.04], [0.7, 0.2], [0.6, 0.38], [0.35, 0.47], [0.62, 0.55], [0.75, 0.73], [0.65, 0.92], [0.35, 1], [0.05, 0.9]]]],
    '4': [[[[0.55, 0], [0.0, 0.65], [0.8, 0.65]], [[0.6, 0.3], [0.6, 1]]],
          [[[0.1, 0], [0.05, 0.6], [0.8, 0.6]], [[0.62, 0], [0.62, 1]]],
          [[[0.6, 1], [0.6, 0], [0.0, 0.65], [0.8, 0.65]]]],
    '5': [[[[0.75, 0], [0.15, 0], [0.1, 0.45], [0.4, 0.38], [0.68, 0.5], [0.75, 0.73], [0.6, 0.94], [0.3, 1], [0.05, 0.9]]],
          [[[0.15, 0], [0.1, 0.45], [0.4, 0.38], [0.68, 0.5], [0.75, 0.73], [0.6, 0.94], [0.3, 1], [0.05, 0.9]], [[0.15, 0], [0.75, 0]]]],
    '6': [[[[0.6, 0], [0.3, 0.15], [0.1, 0.45], [0.07, 0.75], [0.22, 0.95], [0.45, 1], [0.68, 0.87], [0.7, 0.62], [0.47, 0.48], [0.22, 0.55], [0.09, 0.72]]]],
    '7': [[[[0.0, 0], [0.75, 0], [0.3, 1]]], [[[0.0, 0.05], [0.75, 0], [0.5, 0.5], [0.35, 1]]], [[[0.0, 0], [0.75, 0], [0.3, 1]], [[0.2, 0.5], [0.65, 0.5]]]],
    '8': [[[[0.65, 0.15], [0.4, 0], [0.15, 0.13], [0.2, 0.35], [0.6, 0.6], [0.72, 0.82], [0.4, 1], [0.08, 0.82], [0.2, 0.6], [0.6, 0.35], [0.65, 0.15]]],
          [arc(0.38, 0.25, 0.25, 0.25, 90, 450), arc(0.38, 0.74, 0.32, 0.26, -90, 270)]],
    '9': [[[[0.7, 0.2], [0.5, 0.03], [0.25, 0.02], [0.08, 0.18], [0.1, 0.38], [0.3, 0.5], [0.58, 0.42], [0.7, 0.2], [0.68, 0.6], [0.6, 1]]],
          [arc(0.38, 0.25, 0.32, 0.25, 0, 360), [[0.7, 0.25], [0.65, 1]]]],
    '+': [[[[0.5, 0], [0.5, 1]], [[0, 0.5], [1, 0.5]]]],
    '-': [[[[0, 0], [1, 0]]]],
    '=': [[[[0, 0], [1, 0]], [[0, 0.42], [1, 0.42]]]],
    'x': [[[[0, 0], [0.9, 1]], [[0.9, 0], [0, 1]]],
          [[[0.05, 0.12], [0.3, 0.02], [0.45, 0.5], [0.6, 0.95], [0.9, 0.85]], [[0.85, 0.05], [0.45, 0.5], [0.05, 0.95]]]],
    'y': [[[[0, 0], [0.45, 0.5]], [[0.85, 0], [0.2, 1.4]]],
          [[[0, 0], [0.1, 0.4], [0.35, 0.55], [0.7, 0.42], [0.82, 0], [0.8, 0.95], [0.6, 1.35], [0.3, 1.25]]]],
    'a': [[[[0.75, 0.15], [0.5, 0], [0.22, 0.05], [0.05, 0.4], [0.12, 0.85], [0.38, 1], [0.65, 0.8], [0.75, 0.45], [0.75, 0], [0.75, 0.85], [0.9, 1]]]],
    'b': [[[[0.1, -0.9], [0.1, 1], [0.1, 0.45], [0.35, 0.05], [0.65, 0.1], [0.78, 0.5], [0.65, 0.9], [0.35, 1], [0.1, 0.85]]]],
    'c': [[[[0.75, 0.15], [0.5, 0], [0.18, 0.12], [0.03, 0.5], [0.18, 0.88], [0.5, 1], [0.78, 0.86]]]],
    'n': [[[[0.05, 0.05], [0.05, 1], [0.05, 0.4], [0.3, 0.05], [0.6, 0.05], [0.75, 0.35], [0.75, 1]]]],
    'i': [[[[0, 0.3], [0, 1.3]], [[0, -0.05], [0.02, 0]]]],
    'e': [[[[0.05, 0.5], [0.78, 0.5], [0.72, 0.18], [0.45, 0], [0.15, 0.1], [0.02, 0.5], [0.15, 0.86], [0.45, 1], [0.78, 0.86]]]],
    '(': [[[[0.35, 0], [0.1, 0.25], [0.02, 0.5], [0.1, 0.75], [0.35, 1]]]],
    ')': [[[[0.0, 0], [0.25, 0.25], [0.33, 0.5], [0.25, 0.75], [0.0, 1]]]],
    '/': [[[[0.5, 0], [0, 1]]]],
    'π': [[[[0, 0.1], [1, 0.05]], [[0.3, 0.08], [0.25, 1]], [[0.72, 0.08], [0.78, 1]]],
          [[[0, 0.15], [0.15, 0.05], [1, 0.05]], [[0.3, 0.08], [0.25, 1]], [[0.72, 0.08], [0.8, 0.95], [0.9, 1]]]],
    'θ': [[arc(0.35, 0.5, 0.35, 0.5, -90, 270), [[0.03, 0.5], [0.67, 0.5]]]],
    '√': [[[[0, 0.62], [0.12, 0.52], [0.3, 1], [0.55, 0], [1.6, 0]]]],
    '<': [[[[0.7, 0], [0, 0.5], [0.7, 1]]]],
    '>': [[[[0, 0], [0.7, 0.5], [0, 1]]]],
    'z': [[[[0, 0], [0.8, 0], [0, 1], [0.8, 1]]]],
    '|': [[[[0, -0.15], [0, 1.15]]]],
    's': [[[[0.7, 0.12], [0.45, 0], [0.15, 0.08], [0.1, 0.3], [0.4, 0.5], [0.7, 0.68], [0.68, 0.9], [0.4, 1], [0.05, 0.88]]]],
    'r': [[[[0.05, 0], [0.05, 1], [0.05, 0.4], [0.3, 0.05], [0.65, 0.05]]]],
    't': [[[[0.3, -0.3], [0.3, 0.9], [0.5, 1]], [[0, 0.1], [0.65, 0.1]]]]
  };

  // ---------- $P core ----------
  function pathLen(pts) { let d = 0; for (let i = 1; i < pts.length; i++) if (pts[i].id === pts[i - 1].id) d += dist(pts[i - 1], pts[i]); return d; }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function resample(pts, n) {
    const I = pathLen(pts) / (n - 1); if (I === 0) return new Array(n).fill(0).map(() => ({ ...pts[0] }));
    let D = 0; const out = [{ ...pts[0] }]; pts = pts.map(p => ({ ...p }));
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].id === pts[i - 1].id) {
        const d = dist(pts[i - 1], pts[i]);
        if (D + d >= I) {
          const q = { x: pts[i - 1].x + ((I - D) / d) * (pts[i].x - pts[i - 1].x), y: pts[i - 1].y + ((I - D) / d) * (pts[i].y - pts[i - 1].y), id: pts[i].id };
          out.push(q); pts.splice(i, 0, q); D = 0;
        } else D += d;
      }
    }
    while (out.length < n) out.push({ ...pts[pts.length - 1] });
    return out.slice(0, n);
  }
  function normalize(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); });
    const s = Math.max(maxX - minX, maxY - minY) || 1;
    let pts2 = pts.map(p => ({ x: (p.x - minX) / s, y: (p.y - minY) / s, id: p.id }));
    let cx = 0, cy = 0; pts2.forEach(p => { cx += p.x; cy += p.y; }); cx /= pts2.length; cy /= pts2.length;
    return pts2.map(p => ({ x: p.x - cx, y: p.y - cy, id: p.id }));
  }
  function cloud(strokes) {
    const pts = []; strokes.forEach((s, id) => s.forEach(p => pts.push({ x: p[0] !== undefined ? p[0] : p.x, y: p[1] !== undefined ? p[1] : p.y, id })));
    return normalize(resample(pts, N));
  }
  function cloudDist(a, b, start) {
    const matched = new Array(a.length).fill(false); let sum = 0, i = start;
    do {
      let min = Infinity, idx = -1;
      for (let j = 0; j < matched.length; j++) if (!matched[j]) { const d = dist(a[i], b[j]); if (d < min) { min = d; idx = j; } }
      matched[idx] = true;
      const w = 1 - ((i - start + a.length) % a.length) / a.length;
      sum += w * min; i = (i + 1) % a.length;
    } while (i !== start);
    return sum;
  }
  function greedy(a, b) {
    const step = Math.floor(Math.pow(a.length, 0.5)); let min = Infinity;
    for (let i = 0; i < a.length; i += step) min = Math.min(min, cloudDist(a, b, i), cloudDist(b, a, i));
    return min;
  }

  // templates
  const TEMPLATES = [];
  Object.keys(G).forEach(sym => G[sym].forEach(strokes => {
    TEMPLATES.push({ sym, strokes: strokes.length, cloud: cloud(strokes), aspect: aspectOf(strokes.flat().map(p => ({ x: p[0], y: p[1] }))) });
  }));
  function aspectOf(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); });
    return Math.log((maxX - minX + 0.05) / (maxY - minY + 0.05));
  }

  function classify(strokes, allow) {
    const c = cloud(strokes.map(s => s.pts || s));
    const asp = aspectOf(strokes.flatMap(s => (s.pts || s)));
    const results = [];
    TEMPLATES.forEach(t => {
      if (allow && !allow.includes(t.sym)) return;
      let d = greedy(c, t.cloud);
      d *= 1 + 0.12 * Math.abs(t.strokes - strokes.length);       // stroke-count prior (soft)
      d *= 1 + 0.08 * Math.min(Math.abs(asp - t.aspect), 3);      // aspect prior
      results.push({ sym: t.sym, d });
    });
    results.sort((a, b) => a.d - b.d);
    const seen = new Set(); return results.filter(r => (seen.has(r.sym) ? false : seen.add(r.sym)));
  }

  // ---------- geometry helpers ----------
  function bbox(strokes) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    strokes.forEach(s => (s.pts || s).forEach(p => { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }));
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }
  function straightness(pts) {
    const a = pts[0], b = pts[pts.length - 1], L = dist(a, b) || 1;
    let m = 0; pts.forEach(p => { m = Math.max(m, Math.abs((b.x - a.x) * (a.y - p.y) - (a.x - p.x) * (b.y - a.y)) / L); });
    return m / L;
  }
  const median = arr => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };

  // ---------- layout analysis ----------
  /** strokes: [{pts:[{x,y}], idx}] — returns {ascii, symbols, box} */
  let ALLOW = null;
  function recognize(strokesIn, opts) {
    ALLOW = opts && opts.allow ? opts.allow : null;
    const strokes = strokesIn.map((s, i) => ({ pts: s.pts, idx: s.idx !== undefined ? s.idx : i, bb: bbox([s]) }));
    if (!strokes.length) return null;
    const H = estimateCharHeight(strokes);
    const items = parseRegion(strokes, H);
    const ascii = serialize(items, H);
    return { ascii, items, box: bbox(strokes), H };
  }

  function estimateCharHeight(strokes) {
    const hs = strokes.map(s => Math.max(s.bb.h, s.bb.w * 0.6)).filter(h => h > 4);
    // tall things dominate; use upper median of per-stroke size
    const sorted = hs.sort((a, b) => a - b);
    return Math.max(12, sorted[Math.floor(sorted.length * 0.6)] || 30);
  }

  function isHLine(s, H) { return s.bb.w > 0.35 * H && s.bb.h < Math.max(0.22 * s.bb.w, 6) && straightness(s.pts) < 0.12; }

  function parseRegion(strokes, H) {
    let pool = strokes.slice();
    const composites = [];

    // 1) square roots: a stroke that looks like √ and covers other strokes
    pool.slice().sort((a, b) => b.bb.w - a.bb.w).forEach(s => {
      if (!pool.includes(s) || s.bb.w < 0.9 * H) return;
      const vee = s.pts.reduce((m, q) => (q.y > m.y ? q : m), s.pts[0]);
      const inside = pool.filter(o => o !== s && o.bb.cx > vee.x && o.bb.cx < s.bb.maxX + 0.15 * H && o.bb.cy > s.bb.minY - 0.1 * H && o.bb.cy < s.bb.maxY);
      if (!inside.length) return;
      // radical: starts low-left, dips to a vee, rises and runs right along the top
      const p = s.pts, first = p[0], last = p[p.length - 1];
      if (straightness(p) < 0.15) return;
      const shapeOk = last.x - first.x > 0.6 * s.bb.w && Math.abs(last.y - s.bb.minY) < 0.3 * s.bb.h + 4 && first.y > s.bb.minY + 0.3 * s.bb.h;
      if (!shapeOk) return;
      const top = classify([s]).slice(0, 3).map(r => r.sym);
      if (top.includes('√')) {
        pool = pool.filter(o => o !== s && !inside.includes(o));
        const content = parseRegion(inside, H);
        composites.push({ kind: 'sqrt', content, bb: bbox([s, ...inside]), strokes: [s, ...inside] });
      }
    });

    // 2) fraction bars: widest horizontal line with things above AND below
    for (;;) {
      const bars = pool.filter(s => isHLine(s, H)).sort((a, b) => b.bb.w - a.bb.w);
      let made = false;
      for (const bar of bars) {
        const inX = o => o !== bar && o.bb.cx > bar.bb.minX - 0.1 * H && o.bb.cx < bar.bb.maxX + 0.1 * H;
        const above = pool.filter(o => inX(o) && o.bb.maxY < bar.bb.cy + 0.15 * H && o.bb.cy < bar.bb.cy - 0.1 * H && o.bb.minY > bar.bb.cy - 3 * H);
        const below = pool.filter(o => inX(o) && o.bb.minY > bar.bb.cy - 0.15 * H && o.bb.cy > bar.bb.cy + 0.1 * H && o.bb.maxY < bar.bb.cy + 3 * H);
        // an "=" is two short parallel bars: don't mistake it for a fraction
        const isEq = [...above, ...below].some(o => isHLine(o, H) && Math.abs(o.bb.w - bar.bb.w) < 0.5 * bar.bb.w && Math.abs(o.bb.cy - bar.bb.cy) < 0.6 * H && (above.length + below.length) === 1);
        if (above.length && below.length && !isEq && bar.bb.w > 0.6 * H) {
          pool = pool.filter(o => o !== bar && !above.includes(o) && !below.includes(o));
          composites.push({ kind: 'frac', num: parseRegion(above, H * 0.85), den: parseRegion(below, H * 0.85), bb: bbox([bar, ...above, ...below]), strokes: [bar, ...above, ...below] });
          made = true; break;
        }
      }
      if (!made) break;
    }

    // 3) group remaining strokes into symbols
    const groups = groupSymbols(pool, H);
    const syms = groups.map(g => recognizeSymbol(g, H));
    const all = syms.concat(composites).sort((a, b) => a.bb.minX - b.bb.minX);
    return all;
  }

  function overlapX(a, b) { return Math.max(0, Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX)); }

  function groupSymbols(strokes, H) {
    const sorted = strokes.slice().sort((a, b) => a.bb.minX - b.bb.minX);
    const groups = [];
    sorted.forEach(s => {
      let best = null, bestScore = 0;
      groups.forEach(g => {
        const gb = bbox(g.strokes.map(x => x)), ov = overlapX(gb, s.bb);
        const minW = Math.max(Math.min(gb.w, s.bb.w), 0.12 * H);
        let score = ov / minW;
        const tiny = Math.max(s.bb.w, s.bb.h) < 0.22 * H;
        if (tiny && s.bb.cx > gb.minX - 0.15 * H && s.bb.cx < gb.maxX + 0.15 * H && s.bb.maxY < gb.minY + 0.2 * H) score = Math.max(score, 0.9); // dot of an i
        const consecutive = g.strokes.some(x => Math.abs(x.idx - s.idx) <= 1);
        const xin = (s.bb.cx >= gb.minX && s.bb.cx <= gb.maxX) || (gb.cx >= s.bb.minX && gb.cx <= s.bb.maxX);
        const vGap0 = Math.max(0, Math.max(gb.minY, s.bb.minY) - Math.min(gb.maxY, s.bb.maxY));
        if (xin && vGap0 < 0.25 * H) score = Math.max(score, 0.8);
        const vertGap = Math.max(0, Math.max(gb.minY, s.bb.minY) - Math.min(gb.maxY, s.bb.maxY));
        if (vertGap > 0.9 * H) score = 0;
        const need = consecutive ? 0.3 : 0.6;
        if (score > need && score > bestScore) { best = g; bestScore = score; }
      });
      if (best && best.strokes.length < 4) best.strokes.push(s); else groups.push({ strokes: [s] });
    });
    return groups;
  }

  function recognizeSymbol(g, H) {
    const bb = bbox(g.strokes);
    const size = Math.max(bb.w, bb.h);
    if (size < 0.2 * H && g.strokes.length === 1) return { kind: 'sym', sym: '.', bb, strokes: g.strokes, tiny: true };
    const cands = classify(g.strokes, ALLOW);
    if (!cands.length) return { kind: 'sym', sym: '', bb, strokes: g.strokes };
    let sym = cands[0].sym;
    // disambiguation by context-free geometry
    if (g.strokes.length === 1 && straightness(g.strokes[0].pts) < 0.08) {
      const ang = Math.abs(Math.atan2(bb.h, bb.w)) * 180 / Math.PI; // 0 horizontal, 90 vertical
      if (ang < 25) sym = '-';
      else if (ang > 70) sym = '1';
      else {
        const p = g.strokes[0].pts, a = p[0], b = p[p.length - 1];
        sym = (b.x - a.x) * (b.y - a.y) < 0 ? '/' : '\\';
        if (sym === '\\') sym = (cands.find(c => c.sym !== '-' && c.sym !== '1') || cands[0]).sym;
      }
      if (ALLOW && !ALLOW.includes(sym)) sym = cands[0].sym;
    }
    if (sym === '√') sym = (cands.find(c => c.sym !== '√') || cands[0]).sym; // a lone radical without content
    return { kind: 'sym', sym, alts: cands.slice(0, 4).map(c => c.sym), bb, strokes: g.strokes };
  }

  // ---------- serialization (layout → ASCII math) ----------
  const LETTERS = /^[a-zπθ]$/;
  const WORDS = [
    { name: 'sin', pat: [['s', '5'], ['i', '1', '|'], ['n']] },
    { name: 'cos', pat: [['c', '('], ['0', 'o'], ['s', '5']] },
    { name: 'tan', pat: [['+', 't'], ['a', '9', '0'], ['n']] },
    { name: 'log', pat: [['1', '|', 'i'], ['0', 'o'], ['9', 'y', 'g']] },
    { name: 'ln', pat: [['1', '|', 'i'], ['n']] }
  ];

  function serialize(items, H) {
    if (!items.length) return '';
    // 1) mark superscripts relative to the previous "base" symbol
    const baseOk = it => it.kind !== 'sym' || /[0-9a-zπθ)]/.test(it.sym);
    const out = [];
    let lastBase = null;
    items.forEach(it => {
      const bb = it.bb;
      if (lastBase && baseOk(lastBase) && it.kind === 'sym' && it.sym !== '.') {
        const b = lastBase.bb, bh = Math.max(b.h, 0.5 * H);
        const raised = bb.maxY < b.cy + 0.1 * bh && bb.cy < b.minY + 0.3 * bh;
        const smaller = Math.max(bb.h, bb.w * 0.8) < 1.05 * Math.max(bh, 0.6 * H);
        const near = bb.minX - b.maxX < 0.9 * H;
        const supable = /^[0-9a-zπθ()]$/.test(it.sym) || (it.sym === '-' && bb.maxY < b.minY + 0.2 * bh);
        if (raised && smaller && near && supable) { it.sup = true; out.push(it); return; }
      }
      out.push(it);
      if (!it.sup) lastBase = it;
    });

    // a raised minus only counts as an exponent sign when an exponent follows it
    out.forEach((it, i) => { if (it.sup && it.sym === '-' && !(out[i + 1] && out[i + 1].sup)) it.sup = false; });

    // 2) dots: decimal point vs multiplication
    out.forEach((it, i) => {
      if (it.kind === 'sym' && it.sym === '.') {
        const prev = out[i - 1];
        if (prev && prev.bb && it.bb.cy < prev.bb.maxY - 0.3 * prev.bb.h) it.sym = '*';
        if (prev && prev.sup && it.sym === '.' && it.bb.cy < (prev.bb.maxY)) it.sym = '°';
      }
      if (it.sup && it.kind === 'sym' && (it.sym === '0' || it.sym === 'o') && Math.max(it.bb.w, it.bb.h) < 0.45 * H) { it.sym = '°'; it.deg = true; }
    });

    // 3) function names
    for (let i = 0; i < out.length; i++) {
      for (const w of WORDS) {
        const n = w.pat.length; if (i + n > out.length) continue;
        let ok = true;
        for (let k = 0; k < n; k++) {
          const it = out[i + k];
          if (it.kind !== 'sym' || it.sup) { ok = false; break; }
          const cands = [it.sym].concat(it.alts || []);
          if (!w.pat[k].some(c => cands.includes(c))) { ok = false; break; }
          if (k > 0 && it.bb.minX - out[i + k - 1].bb.maxX > 0.8 * H) { ok = false; break; }
        }
        if (ok) { out.splice(i, n, { kind: 'func', name: w.name, bb: out[i].bb }); break; }
      }
    }

    // 4) emit
    let s = '';
    for (let i = 0; i < out.length; i++) {
      const it = out[i];
      if (it.sup && !it.deg) {
        let grp = '';
        while (i < out.length && out[i].sup && !out[i].deg) { grp += emit(out[i], H); i++; }
        i--;
        s += '^(' + grp + ')';
        continue;
      }
      s += it.deg ? '°' : emit(it, H);
    }
    return s.replace(/\s+/g, ' ').trim();
  }

  function emit(it, H) {
    if (it.kind === 'frac') return '((' + serialize(it.num, H) + ')/(' + serialize(it.den, H) + '))';
    if (it.kind === 'sqrt') return 'sqrt(' + serialize(it.content, H) + ')';
    if (it.kind === 'func') return ' ' + it.name + ' ';
    const m = { 'π': 'π', 'θ': 'θ', '|': '|', '\\': '', 's': '5', 'o': '0', 't': '+' };
    return it.sym in m ? m[it.sym] : it.sym;
  }

  global.InkMath = { recognize, classify, bbox, straightness, glyphs: G, templates: TEMPLATES };
})(typeof window !== 'undefined' ? window : globalThis);
