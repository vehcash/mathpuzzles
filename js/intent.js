/* IntentLearner — learns what the user means when they draw something.
   Every group of strokes is summarised as a small feature vector (size, shape, closure, straightness…).
   When the user says "this is an equation" / "this is a triangle", the example is stored (localStorage).
   Prediction = Gaussian-kernel nearest neighbours over the stored examples, blended with a heuristic prior.
   When enough similar examples agree, the board stops asking and applies the learned intent. */
(function (global) {
  'use strict';
  const KEY = 'chalkproof.intents.v1';
  const MODE_KEY = 'chalkproof.askmode.v1';
  const MAX = 600;

  const INTENTS = {
    math: { label: 'Equation', icon: '∑', group: 'math' },
    number: { label: 'Number', icon: '#', group: 'math' },
    plot: { label: 'Equation + plot', icon: '📈', group: 'math' },
    line: { label: 'Line', icon: '／', group: 'shape' },
    circle: { label: 'Circle', icon: '○', group: 'shape' },
    ellipse: { label: 'Ellipse', icon: '⬭', group: 'shape' },
    triangle: { label: 'Triangle', icon: '△', group: 'shape' },
    rect: { label: 'Rectangle', icon: '▭', group: 'shape' },
    polygon: { label: 'Polygon', icon: '⬠', group: 'shape' },
    curve: { label: 'Smooth curve', icon: '∿', group: 'shape' },
    graph: { label: 'Graph of a function', icon: '⤴', group: 'graph' },
    axes: { label: 'Axes', icon: '⊹', group: 'graph' },
    ink: { label: 'Keep as chalk', icon: '✎', group: 'other' }
  };
  // feature weights (how much each dimension matters in similarity)
  const W = [1.0, 1.3, 0.8, 1.2, 1.2, 0.7, 1.4, 0.9, 1.0];
  const SIGMA = 0.55;

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s.slice(-MAX))); } catch (e) { /* storage off */ } }

  class IntentLearner {
    constructor() {
      this.samples = load();
      let m = 'learn'; try { m = localStorage.getItem(MODE_KEY) || 'learn'; } catch (e) { /* */ }
      this.mode = m; // 'always' | 'learn' | 'never'
    }
    setMode(m) { this.mode = m; try { localStorage.setItem(MODE_KEY, m); } catch (e) { /* */ } }
    record(f, y, weight = 1) {
      const id = Math.random().toString(36).slice(2, 9);
      this.samples.push({ id, f: f.map(v => +v.toFixed(3)), y, w: weight, t: Date.now() });
      if (this.samples.length > MAX) this.samples = this.samples.slice(-MAX);
      save(this.samples); return id;
    }
    forget(id) { this.samples = this.samples.filter(s => s.id !== id); save(this.samples); }
    reset() { this.samples = []; save(this.samples); }
    counts() { const c = {}; this.samples.forEach(s => { c[s.y] = (c[s.y] || 0) + 1; }); return c; }

    /** prior: {intent: p} from heuristics. Returns ranked list [{y, p, support}] and confidence info. */
    predict(f, prior, allowed) {
      const score = {}, n = {};
      let total = 0;
      this.samples.forEach(s => {
        if (allowed && !allowed.includes(s.y)) return;
        let d2 = 0; for (let i = 0; i < f.length; i++) { const d = (f[i] - (s.f[i] || 0)) * W[i]; d2 += d * d; }
        const k = Math.exp(-d2 / (2 * SIGMA * SIGMA)) * (s.w || 1);
        if (k < 0.02) return;
        score[s.y] = (score[s.y] || 0) + k; n[s.y] = (n[s.y] || 0) + (k > 0.35 ? 1 : 0); total += k;
      });
      const alpha = 1.2;
      const ys = allowed || Object.keys(INTENTS);
      const ranked = ys.map(y => ({ y, p: ((score[y] || 0) + alpha * (prior[y] || 0.001)) / (total + alpha), support: score[y] || 0, similar: n[y] || 0 }))
        .sort((a, b) => b.p - a.p);
      const top = ranked[0];
      const confident = top.p >= 0.8 && top.support >= 2.4 && top.similar >= 3;
      return { ranked, confident, learnedTotal: total };
    }
  }

  // ---------- features ----------
  function bbox(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); });
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  function pathLen(p) { let d = 0; for (let i = 1; i < p.length; i++) d += dist(p[i - 1], p[i]); return d; }
  function straightness(pts) {
    const a = pts[0], b = pts[pts.length - 1], L = dist(a, b) || 1; let m = 0;
    pts.forEach(p => { m = Math.max(m, Math.abs((b.x - a.x) * (a.y - p.y) - (a.x - p.x) * (b.y - a.y)) / L); });
    return m / L;
  }
  function turning(pts) { // total absolute turning / 2π, and fraction concentrated in corners
    const s = []; for (let i = 0; i < pts.length; i += Math.max(1, Math.floor(pts.length / 40))) s.push(pts[i]);
    let tot = 0; const angs = [];
    for (let i = 1; i < s.length - 1; i++) {
      const a = Math.atan2(s[i].y - s[i - 1].y, s[i].x - s[i - 1].x), b = Math.atan2(s[i + 1].y - s[i].y, s[i + 1].x - s[i].x);
      let d = Math.abs(b - a); if (d > Math.PI) d = 2 * Math.PI - d; angs.push(d); tot += d;
    }
    const sorted = angs.sort((a, b) => b - a), top = sorted.slice(0, 5).reduce((x, y) => x + y, 0);
    return { tot: tot / (2 * Math.PI), corner: tot ? top / tot : 0 };
  }

  /** group: {inks:[{pts}], onAxes:bool, typicalH:number} → feature vector */
  function features(group) {
    const inks = group.inks, all = inks.flatMap(o => o.pts), bb = bbox(all);
    const big = inks.slice().sort((a, b) => pathLen(b.pts) - pathLen(a.pts))[0];
    const L = pathLen(big.pts);
    const closure = 1 - Math.min(1, dist(big.pts[0], big.pts[big.pts.length - 1]) / (0.25 * L + 1));
    const st = Math.min(1, straightness(big.pts) * 3);
    const tr = turning(big.pts);
    const ink = inks.reduce((s, o) => s + pathLen(o.pts), 0) / (bb.w + bb.h + 1);
    const size = Math.max(bb.w, bb.h);
    return [
      Math.log2(1 + inks.length) / 3,                 // 0 stroke count
      Math.log(size + 4) / Math.log(400),             // 1 overall size
      Math.max(-1.5, Math.min(1.5, Math.log((bb.w + 6) / (bb.h + 6)))) / 1.5, // 2 aspect
      closure,                                        // 3 closed?
      st,                                             // 4 how bent
      Math.min(1, ink / 4),                           // 5 ink density
      group.onAxes ? 1 : 0,                           // 6 drawn over axes
      tr.corner,                                      // 7 sharp corners
      Math.min(1, tr.tot / 2)                         // 8 total turning
    ];
  }

  global.IntentLearner = IntentLearner;
  global.INTENTS = INTENTS;
  global.intentFeatures = features;
})(window);
