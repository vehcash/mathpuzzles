/* SmartBoard — a chalkboard that asks (and learns) what you are drawing.
   Pipeline: strokes → pause → groups → intent (asked via menu, or learned, or guessed) → clean objects.
   Objects: ink, line, circle, ellipse, poly, curve, axes, graph (explicit y=f(x) or implicit F(x,y)=0),
            point, math (typeset equation or system). */
(function (global) {
  'use strict';
  const COLORS = { chalk: '#f4f1e8', yellow: '#f3d36b', pink: '#f4a3bd', blue: '#93d3f5', green: '#a6e39f', orange: '#f7b267' };
  const PLOT_COLORS = [COLORS.yellow, COLORS.blue, COLORS.pink, COLORS.green, COLORS.orange, COLORS.chalk];
  const SMART_DELAY = 800;
  let uid = 1;

  // ---------- geometry helpers ----------
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const UY = a => a.uy || a.unit;   // pixels per unit on y (tutorial plots may stretch y; the board keeps both equal)
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  function bbox(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); });
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }
  function pathLen(pts) { let d = 0; for (let i = 1; i < pts.length; i++) d += dist(pts[i - 1], pts[i]); return d; }
  function resample(pts, n) {
    const L = pathLen(pts); if (L === 0 || pts.length < 2) return pts.slice();
    const I = L / (n - 1), out = [pts[0]]; let D = 0; const p = pts.slice();
    for (let i = 1; i < p.length; i++) {
      const d = dist(p[i - 1], p[i]);
      if (D + d >= I && d > 0) { const q = { x: p[i - 1].x + (I - D) / d * (p[i].x - p[i - 1].x), y: p[i - 1].y + (I - D) / d * (p[i].y - p[i - 1].y) }; out.push(q); p.splice(i, 0, q); D = 0; }
      else D += d;
    }
    if (out.length < n) out.push(pts[pts.length - 1]);
    return out;
  }
  function segDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy;
    const t = L2 ? clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / L2, 0, 1) : 0;
    return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
  }
  function straightness(pts) { const a = pts[0], b = pts[pts.length - 1], L = dist(a, b) || 1; let m = 0; pts.forEach(p => { m = Math.max(m, segDist(p, a, b)); }); return m / L; }
  function douglasPeucker(pts, eps) {
    if (pts.length < 3) return pts.slice();
    let dmax = 0, idx = 0;
    for (let i = 1; i < pts.length - 1; i++) { const d = segDist(pts[i], pts[0], pts[pts.length - 1]); if (d > dmax) { dmax = d; idx = i; } }
    if (dmax > eps) { const a = douglasPeucker(pts.slice(0, idx + 1), eps), b = douglasPeucker(pts.slice(idx), eps); return a.slice(0, -1).concat(b); }
    return [pts[0], pts[pts.length - 1]];
  }
  function hull(points) {
    const p = points.map(q => ({ x: q.x, y: q.y })).sort((a, b) => a.x - b.x || a.y - b.y);
    if (p.length < 3) return p;
    const cr = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lo = [], up = [];
    p.forEach(q => { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
    for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  const triArea = (a, b, c) => Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
  function pca(pts) {
    let cx = 0, cy = 0; pts.forEach(p => { cx += p.x; cy += p.y; }); cx /= pts.length; cy /= pts.length;
    let sxx = 0, syy = 0, sxy = 0; pts.forEach(p => { const dx = p.x - cx, dy = p.y - cy; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; });
    const ang = 0.5 * Math.atan2(2 * sxy, sxx - syy);
    return { c: { x: cx, y: cy }, ang };
  }
  function chaikin(pts, it) {
    for (let k = 0; k < it; k++) {
      const out = [pts[0]];
      for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; out.push({ x: a.x * 0.75 + b.x * 0.25, y: a.y * 0.75 + b.y * 0.25 }, { x: a.x * 0.25 + b.x * 0.75, y: a.y * 0.25 + b.y * 0.75 }); }
      out.push(pts[pts.length - 1]); pts = out;
    }
    return pts;
  }
  function mergeClose(v, r) {
    const out = []; v.forEach(p => { if (!out.length || dist(out[out.length - 1], p) > r) out.push(p); });
    if (out.length > 2 && dist(out[0], out[out.length - 1]) < r) out.pop();
    return out;
  }
  function circleFit(pts) { // Kåsa algebraic fit
    let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0, sxz = 0, syz = 0, sz = 0; const n = pts.length;
    pts.forEach(p => { const z = p.x * p.x + p.y * p.y; sx += p.x; sy += p.y; sxx += p.x * p.x; syy += p.y * p.y; sxy += p.x * p.y; sxz += p.x * z; syz += p.y * z; sz += z; });
    const A = [[sxx, sxy, sx], [sxy, syy, sy], [sx, sy, n]], b = [-sxz, -syz, -sz];
    const s = solve3(A, b); if (!s) return null;
    const cx = -s[0] / 2, cy = -s[1] / 2, r = Math.sqrt(Math.max(0, cx * cx + cy * cy - s[2]));
    return { c: { x: cx, y: cy }, r };
  }
  function solve3(A, b) {
    const M = A.map((r, i) => r.concat([b[i]]));
    for (let i = 0; i < 3; i++) { let p = i; for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r; if (Math.abs(M[p][i]) < 1e-12) return null; [M[i], M[p]] = [M[p], M[i]]; for (let r = 0; r < 3; r++) if (r !== i) { const f = M[r][i] / M[i][i]; for (let c = i; c < 4; c++) M[r][c] -= f * M[i][c]; } }
    return M.map((r, i) => r[3] / r[i]);
  }
  function minAreaRect(h) {
    let best = null;
    for (let i = 0; i < h.length; i++) {
      const a = h[i], b = h[(i + 1) % h.length], ang = Math.atan2(b.y - a.y, b.x - a.x), c = Math.cos(-ang), s = Math.sin(-ang);
      let mnu = Infinity, mxu = -Infinity, mnv = Infinity, mxv = -Infinity;
      h.forEach(p => { const u = p.x * c - p.y * s, v = p.x * s + p.y * c; mnu = Math.min(mnu, u); mxu = Math.max(mxu, u); mnv = Math.min(mnv, v); mxv = Math.max(mxv, v); });
      const area = (mxu - mnu) * (mxv - mnv);
      if (!best || area < best.area) best = { area, ang, mnu, mxu, mnv, mxv };
    }
    return best;
  }
  function rectCorners(r) {
    const c = Math.cos(r.ang), s = Math.sin(r.ang), pt = (u, v) => ({ x: u * c - v * s, y: u * s + v * c });
    return [pt(r.mnu, r.mnv), pt(r.mxu, r.mnv), pt(r.mxu, r.mxv), pt(r.mnu, r.mxv)];
  }
  function snapAngle(a, b, tolDeg = 6) {
    const ang = Math.atan2(b.y - a.y, b.x - a.x), len = dist(a, b);
    for (const s of [0, 45, 90, 135, 180, -45, -90, -135, -180]) {
      if (Math.abs(ang * 180 / Math.PI - s) < tolDeg) { const r = s * Math.PI / 180, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; return [{ x: mx - Math.cos(r) * len / 2, y: my - Math.sin(r) * len / 2 }, { x: mx + Math.cos(r) * len / 2, y: my + Math.sin(r) * len / 2 }]; }
    }
    return [a, b];
  }
  function cornerSharpness(pts) {
    const angs = [];
    for (let i = 2; i < pts.length - 2; i++) {
      const a = Math.atan2(pts[i].y - pts[i - 2].y, pts[i].x - pts[i - 2].x), b = Math.atan2(pts[i + 2].y - pts[i].y, pts[i + 2].x - pts[i].x);
      let d = Math.abs(b - a); if (d > Math.PI) d = 2 * Math.PI - d; angs.push(d);
    }
    const total = angs.reduce((s, v) => s + v, 0) || 1;
    return angs.slice().sort((a, b) => b - a).slice(0, 6).reduce((s, v) => s + v, 0) / total;
  }
  const texEsc = s => s.replace(/[{}\\^_$&#%~]/g, ' ');
  function makeGrain() {
    const c = document.createElement('canvas'); c.width = c.height = 160;
    const g = c.getContext('2d'), img = g.createImageData(160, 160);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random(); img.data[i + 3] = v < 0.82 ? Math.random() * 40 : 140 + Math.random() * 100; }
    g.putImageData(img, 0, 0); return c;
  }
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  /** "P1" → "P₁", "P1P2" → "P₁P₂" (canvas labels) */
  const vecLabel = n => String(n || '').replace(/_?\{?(\d+)\}?/g, (m, d) => [...d].map(x => SUBS[+x]).join(''));
  const niceNum = v => { if (!isFinite(v)) return '—'; const r = Math.round(v * 100) / 100; return (Math.abs(r) < 1e-9 ? 0 : r).toString(); };

  class SmartBoard {
    constructor(root, opts = {}) {
      this.root = root; this.opts = opts;
      this.canvas = root.querySelector('canvas.board-ink');
      this.live = root.querySelector('canvas.board-live');
      this.overlay = root.querySelector('.board-overlay');
      this.ctx = this.canvas.getContext('2d'); this.lctx = this.live.getContext('2d');
      this.objects = []; this.history = []; this.future = [];
      this.tool = 'smart'; this.color = COLORS.chalk; this.width = 3.2;
      this.strokeIdx = 0; this.timer = null; this.drawing = null;
      this.grain = makeGrain(); this.mathEls = new Map(); this.implicitCache = new Map();
      this.learner = new global.IntentLearner();
      this.geo = new global.GeoModel(this); this.regularN = 6;
      this.queue = []; this.menu = null; this.placing = null; this.hover = null;
      this.showKeyPoints = true; this.trace = true;
      this.onStatus = opts.onStatus || (() => {});
      this._bind(); this.resize();
      new ResizeObserver(() => this.resize()).observe(root);
    }

    // =========================================================== setup & input
    resize() {
      const r = this.root.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      this.W = r.width; this.H = r.height;
      [this.canvas, this.live].forEach(c => { c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr); c.style.width = r.width + 'px'; c.style.height = r.height + 'px'; });
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); this.lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.grainPat = this.ctx.createPattern(this.grain, 'repeat');
      this.implicitCache.clear(); this.render();
    }
    _pos(e) { const r = this.canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    _bind() {
      const el = this.live;
      el.addEventListener('pointerdown', e => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        const p = this._pos(e);
        if (this.placing) { this.finishPlacing(p); return; }
        if (this.menu) this.dismissMenu(true);
        el.setPointerCapture(e.pointerId);
        clearTimeout(this.timer);
        if (this.tool === 'eraser') { this.pushHistory(); this.drawing = { mode: 'erase', pts: [p] }; this.eraseAt(p); return; }
        if (this.tool === 'move') {
          const gh = this.geo.hit(p);
          if (gh) { this.tool = 'g-select'; this.geoDown(p, e); this.tool = 'move'; this.drawing = { mode: 'geodrag' }; return; }
          const hit = this.hitTest(p); if (hit) { this.pushHistory(); this.drawing = { mode: 'move', obj: hit, last: p }; } return;
        }
        if (this.tool.startsWith('g-')) { this.geoDown(p, e); return; }
        if (this.opts.panAxes) {   // tutorial boards: dragging inside a graph moves the view
          const ax = this.objects.find(o => o.type === 'axes' && !o.hidden && p.x > o.x0 && p.x < o.x1 && p.y > o.y0 && p.y < o.y1);
          if (ax) { this.drawing = { mode: 'pan', ax, last: p }; this.live.style.cursor = 'grabbing'; return; }
        }
        // with the chalk tools, grabbing an equation, an axes origin or a geometry point moves it
        const grab = this.grabbable(p);
        if (grab) {
          if (grab.geo) { const t = this.tool; this.tool = 'g-select'; this.geoDown(p, e); this.tool = t; this.drawing = { mode: 'geodrag' }; return; }
          this.pushHistory(); this.drawing = { mode: 'move', obj: grab, last: p, start: p }; this.live.style.cursor = 'grabbing'; return;
        }
        this.drawing = { mode: 'ink', pts: [p] };
      });
      el.addEventListener('pointermove', e => {
        const p = this._pos(e);
        if (this.placing) { this.movePlacing(p); return; }
        if (this.tool.startsWith('g-')) { this.geoMove(p, e); return; }
        if (!this.drawing) { this.hoverAt(p); return; }
        const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
        evs.forEach(ev => {
          const q = this._pos(ev), d = this.drawing;
          if (d.mode === 'ink') { const l = d.pts[d.pts.length - 1]; if (dist(l, q) > 0.8) d.pts.push(q); }
          else if (d.mode === 'erase') { d.pts.push(q); this.eraseAt(q); }
          else if (d.mode === 'move') { this.translate(d.obj, q.x - d.last.x, q.y - d.last.y); d.last = q; this.implicitCache.clear(); this.render(); }
          else if (d.mode === 'geodrag') this.geoMove(q);
          else if (d.mode === 'pan') { d.ax.ox += q.x - d.last.x; d.ax.oy += q.y - d.last.y; d.last = q; this.implicitCache.clear(); this.render(); if (this.opts.onView) this.opts.onView(d.ax); }
        });
        this.drawLive();
      });
      const end = e => {
        if (this.tool.startsWith('g-')) { this.geoUp(this._pos(e)); return; }
        if (this.drawing && this.drawing.mode === 'geodrag') { this.drawing = null; this.geoUp(this._pos(e)); this.geo.sel.clear(); this.geoChanged(); return; }
        if (this.drawing && this.drawing.mode === 'move' && this.drawing.start && dist(this.drawing.start, this.drawing.last) < 2) this.history.pop(); // a plain click changes nothing
        const d = this.drawing; this.drawing = null; this.lctx.clearRect(0, 0, this.W, this.H);
        if (!d) return;
        if (d.mode === 'ink' && d.pts.length) {
          // a click or a tiny dot on its own is not drawing: keep a dot only next to other chalk (the dot of an i, a decimal point, ÷)
          const bb = bbox(d.pts);
          if (Math.max(bb.w, bb.h) < 5) {
            const near = this.objects.some(o => o.type === 'ink' && !o.hidden && o.pts.some(q => dist(q, { x: bb.cx, y: bb.cy }) < 46));
            if (!near) { this.render(); return; }
          }
          if (d.pts.length === 1) d.pts.push({ x: d.pts[0].x + 0.6, y: d.pts[0].y + 0.6 });
          this.pushHistory();
          this.objects.push({ type: 'ink', id: uid++, pts: d.pts, color: this.color, w: this.width, idx: this.strokeIdx++, pending: this.tool === 'smart' });
          this.render();
          if (this.tool === 'smart') this.timer = setTimeout(() => this.processPending(), SMART_DELAY);
        }
        if (d.mode === 'erase' || d.mode === 'move' || d.mode === 'pan') { this.implicitCache.clear(); this.render(); this.live.style.cursor = ''; }
      };
      el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
      el.addEventListener('pointerleave', () => { if (!this.drawing) { this.hover = null; this.drawLive(); } });
      el.addEventListener('dblclick', e => { const p = this._pos(e); const m = this.objects.find(o => o.type === 'math' && !o.hidden && this.hitMath(o, p)); if (m) this.editMath(m); });
      el.addEventListener('contextmenu', e => {
        const p = this._pos(e); const hit = this.hitTest(p);
        if (hit && hit.gid && this.objects.some(o => o.type === 'ink' && o.hidden && o.gid === hit.gid)) { e.preventDefault(); this.changeIntent(hit.gid); }
      });
      el.addEventListener('wheel', e => {
        const p = this._pos(e); const ax = this.objects.find(o => o.type === 'axes' && p.x > o.x0 && p.x < o.x1 && p.y > o.y0 && p.y < o.y1);
        if (!ax) return; e.preventDefault(); this.zoomAxes(ax, e.deltaY < 0 ? 1.15 : 1 / 1.15, this.opts.panAxes ? p : null);
      }, { passive: false });
      document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (this.placing && e.key === 'Escape') { this.cancelPlacing(); return; }
        if (this.tool.startsWith('g-')) {
          if (e.key === 'Escape') { this.geo.tmp = null; this.geo.sel.clear(); this.geoChanged(); return; }
          if (e.key === 'Enter' && this.geo.tmp && this.geo.tmp.kind === 'poly') { this.finishPoly(); return; }
          if ((e.key === 'Delete' || e.key === 'Backspace') && this.geo.sel.size) { e.preventDefault(); this.pushHistory(); this.geo.removeIds([...this.geo.sel]); this.cleanupGeo(); this.geo.solve(); this.geoChanged(); return; }
        }
        if (!this.menu) return;
        const items = this.menu.items;
        if (e.key === 'Escape') { e.preventDefault(); this.dismissMenu(false); }
        else if (e.key === 'Enter') { e.preventDefault(); this.chooseFromMenu(items[0].y); }
        else if (/^[0-9]$/.test(e.key)) { const i = e.key === '0' ? 9 : +e.key - 1; if (items[i]) { e.preventDefault(); this.chooseFromMenu(items[i].y); } }
      }, true);
    }

    setTool(t) {
      if (this.tool === 'smart' && t !== 'smart') this.processPending();
      if (this.geo.tmp) this.geo.tmp = null;
      this.tool = t; this.live.style.cursor = t === 'eraser' ? 'cell' : (t === 'move' || t === 'g-select') ? 'default' : 'crosshair'; this.root.dataset.tool = t;
      if (!t.startsWith('g-') && this.geo.sel.size) { this.geo.sel.clear(); }
      this.geoChanged();
    }
    setColor(c) { this.color = COLORS[c] || c; }

    // =========================================================== history
    snapshot() { return JSON.stringify({ o: this.objects.map(o => { const c = { ...o }; delete c.anim; delete c.fade; delete c.asking; return c; }), g: this.geo.toJSON() }); }
    pushHistory() { this.history.push(this.snapshot()); if (this.history.length > 100) this.history.shift(); this.future = []; }
    restore(s) {
      const d = JSON.parse(s); this.objects = d.o; this.geo.load(d.g); this.objects.forEach(o => { o.pending = false; uid = Math.max(uid, o.id + 1); });
      this.implicitCache.clear(); this.render(); this.geoChanged();
    }
    undo() { this.dismissMenu(false, true); clearTimeout(this.timer); if (!this.history.length) return; this.future.push(this.snapshot()); this.restore(this.history.pop()); }
    redo() { if (!this.future.length) return; this.history.push(this.snapshot()); this.restore(this.future.pop()); }
    clear() { this.dismissMenu(false, true); this.pushHistory(); this.objects = []; this.geo.clear(); this.render(); this.geoChanged(); }
    reset() { this.dismissMenu(false, true); this.objects = []; this.geo.clear(); this.history = []; this.future = []; this.render(); this.geoChanged(); }

    // =========================================================== grouping strokes
    processPending() {
      clearTimeout(this.timer);
      if (this.menu) return;
      const inks = this.objects.filter(o => o.type === 'ink' && o.pending && !o.hidden);
      if (!inks.length) return;
      inks.forEach(o => { o.pending = false; o.bb = bbox(o.pts); o.len = pathLen(o.pts); });
      this.queue.push(...this.makeGroups(inks));
      this.nextInQueue();
    }
    makeGroups(inks) {
      const isSmall = o => Math.max(o.bb.w, o.bb.h) < 105 && o.len < 340;
      let small = inks.filter(isSmall), big = inks.filter(o => !isSmall(o));
      const Hs = small.map(o => o.bb.h).sort((a, b) => a - b);
      const H = clamp(Hs.length ? Hs[Math.floor(Hs.length * 0.75)] : 36, 14, 90);
      // fraction bars / radicals belong to the math next to them
      big = big.filter(o => {
        const st = straightness(o.pts), inX = s => s.bb.cx > o.bb.minX - 8 && s.bb.cx < o.bb.maxX + 8;
        if (st < 0.12 && o.bb.h < 0.25 * o.bb.w) {
          const above = small.some(s => inX(s) && s.bb.cy < o.bb.cy && o.bb.cy - s.bb.cy < 2.6 * H);
          const below = small.some(s => inX(s) && s.bb.cy > o.bb.cy && s.bb.cy - o.bb.cy < 2.6 * H);
          if (above && below) { small.push(o); return false; }
        }
        const p = o.pts, f = p[0], l = p[p.length - 1];
        const radical = st > 0.15 && l.x - f.x > 0.6 * o.bb.w && Math.abs(l.y - o.bb.minY) < 0.3 * o.bb.h + 6 && f.y > o.bb.minY + 0.3 * o.bb.h;
        if (radical && small.some(s => s.bb.cx > o.bb.minX + 0.2 * o.bb.w && s.bb.cx < o.bb.maxX && s.bb.cy > o.bb.minY && s.bb.cy < o.bb.maxY)) { small.push(o); return false; }
        return true;
      });
      const union = (items, near) => {
        const groups = [], used = new Set();
        items.slice().sort((a, b) => a.idx - b.idx).forEach(s => {
          if (used.has(s)) return; const g = [s]; used.add(s);
          for (let i = 0; i < g.length; i++) items.forEach(b => { if (!used.has(b) && near(g[i], b)) { g.push(b); used.add(b); } });
          groups.push(g);
        });
        return groups;
      };
      const gap = (a, b) => [Math.max(0, Math.max(a.bb.minX, b.bb.minX) - Math.min(a.bb.maxX, b.bb.maxX)), Math.max(0, Math.max(a.bb.minY, b.bb.minY) - Math.min(a.bb.maxY, b.bb.maxY))];
      const mathGroups = union(small, (a, b) => { const [gx, gy] = gap(a, b); return gx < 1.5 * H && gy < 0.7 * H; })
        .filter(g => !(g.length === 1 && Math.max(g[0].bb.w, g[0].bb.h) < 8));
      // big strokes join when their ends touch (a triangle in 3 strokes is one thing)
      const ends = o => [o.pts[0], o.pts[o.pts.length - 1]];
      const shapeGroups = union(big, (a, b) => ends(a).some(p => ends(b).some(q => dist(p, q) < 26)) || (a.len < 400 && b.len < 400 && (() => { const [gx, gy] = gap(a, b); return gx === 0 && gy === 0; })()));
      return mathGroups.map(g => this.analyzeGroup(g, true, H)).concat(shapeGroups.map(g => this.analyzeGroup(g, false, H)));
    }

    // =========================================================== understanding a group
    analyzeGroup(inks, mathy, H) {
      const all = inks.flatMap(o => o.pts), bb = bbox(all);
      const g = { inks, bb, mathy, H, id: uid++ };
      g.onAxes = !!this.axesAt(bb);
      g.f = global.intentFeatures({ inks, onAxes: g.onAxes });
      // readings
      const strokes = inks.map(o => ({ pts: o.pts, idx: o.idx }));
      try { const r = global.InkMath.recognize(strokes); g.reading = r; g.ascii = r ? r.ascii : ''; } catch (e) { g.ascii = ''; }
      try { const r = global.InkMath.recognize(strokes, { allow: '0123456789.-'.split('') }); g.numAscii = r ? r.ascii.replace(/[^0-9.\-]/g, '') : ''; } catch (e) { g.numAscii = ''; }
      try { g.info = g.ascii ? global.MathCore.analyze(g.ascii) : null; } catch (e) { g.info = null; }
      g.plottable = !!(g.info && (g.info.kind === 'function' || g.info.kind === 'relation'));
      g.prior = this.heuristicPrior(g);
      g.allowed = Object.keys(global.INTENTS).filter(y => (y === 'plot' ? g.plottable : true) && (y === 'number' ? !!g.numAscii : true));
      g.pred = this.learner.predict(g.f, g.prior, g.allowed);
      return g;
    }
    heuristicPrior(g) {
      const P = {}; const set = (y, v) => { P[y] = Math.max(P[y] || 0, v); };
      if (g.mathy) {
        set('math', 0.55);
        if (/^[0-9.\-]+$/.test(g.ascii || '')) set('number', 0.45); else set('number', 0.1);
        if (g.plottable) set('plot', g.onAxes || this.objects.some(o => o.type === 'axes') ? 0.5 : 0.18);
        if (g.inks.length === 1) { set('line', 0.05); set('circle', 0.05); }
      } else {
        const inks = g.inks, o = inks.slice().sort((a, b) => b.len - a.len)[0];
        const pts = resample(o.pts, 64), L = o.len;
        const closed = dist(pts[0], pts[pts.length - 1]) < Math.max(0.17 * L, 18);
        const st = straightness(o.pts);
        if (inks.length === 1) {
          if (g.onAxes && !closed && g.bb.w > 40) { set('graph', 0.6); set('curve', 0.15); set('line', st < 0.08 ? 0.2 : 0.05); }
          else if (!closed && st < 0.075) { set('line', 0.65); set('axes', 0.05); }
          else if (closed) {
            const sharp = cornerSharpness(pts);
            const verts = mergeClose(douglasPeucker(pts, Math.max(0.045 * L, 6)).slice(0, -1), 0.08 * L).length;
            const asp = g.bb.w / (g.bb.h || 1);
            if (sharp < 0.5 || verts > 6) { if (asp > 0.82 && asp < 1.22) { set('circle', 0.6); set('ellipse', 0.2); } else { set('ellipse', 0.6); set('circle', 0.15); } }
            else if (verts === 3) { set('triangle', 0.6); set('polygon', 0.15); }
            else if (verts === 4) { set('rect', 0.55); set('polygon', 0.2); }
            else { set('polygon', 0.55); set('triangle', 0.1); set('rect', 0.1); }
          } else { set('curve', 0.5); set('graph', 0.15); set('polygon', 0.1); }
        } else {
          const straight = inks.filter(s => straightness(s.pts) < 0.08);
          if (inks.length === 2 && straight.length === 2) {
            const ang = s => Math.atan2(s.pts[s.pts.length - 1].y - s.pts[0].y, s.pts[s.pts.length - 1].x - s.pts[0].x);
            let d = Math.abs(ang(inks[0]) - ang(inks[1])) % Math.PI; d = Math.min(d, Math.PI - d);
            if (Math.abs(d - Math.PI / 2) < 0.25) set('axes', 0.55); set('line', 0.15);
          }
          if (inks.length === 3) { set('triangle', 0.5); set('polygon', 0.15); }
          if (inks.length === 4) { set('rect', 0.45); set('polygon', 0.2); }
          set('polygon', 0.2); set('curve', 0.12);
        }
        set('math', 0.04);
      }
      set('ink', 0.04);
      const ys = Object.keys(global.INTENTS); const tot = ys.reduce((s, y) => s + (P[y] || 0.01), 0);
      ys.forEach(y => { P[y] = (P[y] || 0.01) / tot; });
      return P;
    }

    nextInQueue() {
      while (this.queue.length && !this.menu) {
        const g = this.queue.shift();
        if (!g.inks.every(o => this.objects.includes(o))) continue; // erased meanwhile
        const top = g.pred.ranked[0];
        const mode = this.learner.mode;
        if (mode === 'never') this.applyIntent(g, top.y, 'guess');
        else if (mode === 'learn' && g.pred.confident) this.applyIntent(g, top.y, 'auto');
        else this.showMenu(g);
      }
      this.render();
    }

    // =========================================================== the "what is this?" menu
    showMenu(g) {
      const box = document.createElement('div'); box.className = 'intent-menu';
      const ranked = g.pred.ranked.filter(r => g.allowed.includes(r.y));
      // order: best guesses first, but keep the rest visible in a compact grid
      const items = ranked.slice();
      this.menu = { g, box, items };
      const head = document.createElement('div'); head.className = 'im-head';
      const learned = this.learner.samples.length;
      head.innerHTML = '<b>' + global.tr('What is this?') + '</b><span>' + (learned ? global.tr('learning from {n} answers', { n: learned }) : global.tr('your answers teach the board')) + '</span>';
      box.appendChild(head);
      const grid = document.createElement('div'); grid.className = 'im-grid';
      items.forEach((it, i) => {
        const def = global.INTENTS[it.y];
        const b = document.createElement('button'); b.className = 'im-item' + (i === 0 ? ' best' : '') + ' g-' + def.group;
        let preview = '';
        if (it.y === 'math') preview = g.info ? safeTex(g.info.latex) : g.ascii ? '<i>' + escapeHtml(g.ascii) + '</i>' : '';
        if (it.y === 'number') preview = safeTex(g.numAscii);
        if (it.y === 'plot') preview = g.info ? safeTex(g.info.latex) : '';
        if (it.y === 'graph') { const fit = this.previewGraph(g); preview = fit ? safeTex('y=' + fit.tex) : ''; }
        b.innerHTML = '<span class="k">' + (i < 10 ? (i + 1) % 10 : '') + '</span><span class="ic">' + def.icon + '</span><span class="lb">' + global.tr(def.label) + '</span>' +
          (preview ? '<span class="pv">' + preview + '</span>' : '') + '<span class="bar" style="--p:' + Math.round(it.p * 100) + '%"></span>';
        b.title = global.tr('{p}% likely', { p: Math.round(it.p * 100) }) + (it.support > 0.5 ? ' ' + global.tr('(learned from similar drawings)') : '');
        b.onclick = ev => { ev.stopPropagation(); this.chooseFromMenu(it.y); };
        b.onmouseenter = () => this.ghost(g, it.y);
        b.onmouseleave = () => this.ghost(null);
        grid.appendChild(b);
      });
      box.appendChild(grid);
      const foot = document.createElement('div'); foot.className = 'im-foot';
      foot.innerHTML = '<span><kbd>↵</kbd> best · <kbd>1</kbd>–<kbd>9</kbd> pick · <kbd>Esc</kbd> keep chalk</span>';
      const sel = document.createElement('select'); sel.title = 'When should the board ask?';
      [['always', 'Always ask'], ['learn', 'Ask until learned'], ['never', 'Never ask (guess)']].forEach(([v, t]) => { const o = document.createElement('option'); o.value = v; o.textContent = t; sel.appendChild(o); });
      sel.value = this.learner.mode; sel.onchange = () => { this.learner.setMode(sel.value); this.opts.onModeChange && this.opts.onModeChange(sel.value); };
      sel.addEventListener('pointerdown', e => e.stopPropagation());
      foot.appendChild(sel); box.appendChild(foot);
      box.addEventListener('pointerdown', e => e.stopPropagation());
      this.root.appendChild(box);
      // position next to the drawing, inside the board
      const bw = box.offsetWidth, bh = box.offsetHeight;
      let x = g.bb.maxX + 14, y = g.bb.minY - 4;
      if (x + bw > this.W - 8) x = g.bb.minX - bw - 14;
      if (x < 8) { x = clamp(g.bb.cx - bw / 2, 8, this.W - bw - 8); y = g.bb.maxY + 12; if (y + bh > this.H - 8) y = g.bb.minY - bh - 12; }
      box.style.left = clamp(x, 8, Math.max(8, this.W - bw - 8)) + 'px'; box.style.top = clamp(y, 8, Math.max(8, this.H - bh - 8)) + 'px';
      g.inks.forEach(o => { o.asking = true; });
      this.render();
    }
    chooseFromMenu(y) {
      if (!this.menu) return;
      const g = this.menu.g; this.closeMenuEl();
      this.applyIntent(g, y, 'chosen');
      this.nextInQueue();
    }
    closeMenuEl() {
      if (!this.menu) return;
      this.menu.box.remove(); this.menu.g.inks.forEach(o => { delete o.asking; }); this.menu = null; this.ghost(null);
    }
    /** keepPending: the user started drawing again → the strokes go back into the pool */
    dismissMenu(keepPending, silent) {
      if (!this.menu) { if (silent) this.queue = []; return; }
      const g = this.menu.g; this.closeMenuEl();
      if (keepPending) { g.inks.forEach(o => { o.pending = true; }); this.queue.forEach(q => q.inks.forEach(o => { o.pending = true; })); this.queue = []; }
      else if (!silent) { this.nextInQueue(); }
      if (silent) this.queue = [];
      this.render();
    }
    ghost(g, y) {
      this.ghostObjs = null;
      if (g && y && !['math', 'number', 'plot', 'ink'].includes(y)) {
        try { this.ghostObjs = this.build(g, y, true).objs.filter(o => o.type !== 'math'); } catch (e) { this.ghostObjs = null; }
      }
      this.drawLive();
    }
    changeIntent(gid) {
      const src = this.objects.filter(o => o.type === 'ink' && o.hidden && o.gid === gid);
      if (!src.length) return;
      this.pushHistory();
      const sample = this.objects.find(o => o.gid === gid && o.sampleId);
      if (sample) this.learner.forget(sample.sampleId);
      this.objects.filter(o => o.type === 'georef' && o.gid === gid).forEach(r => { this.geo.removeIds(r.ids); this.cleanupGeo(); this.geoChanged(); });
      this.objects = this.objects.filter(o => !(o.gid === gid && !(o.type === 'ink' && o.hidden)));
      src.forEach(o => { o.hidden = false; delete o.gid; o.bb = bbox(o.pts); o.len = pathLen(o.pts); });
      const g = this.analyzeGroup(src, src.every(o => Math.max(o.bb.w, o.bb.h) < 105), 36);
      this.showMenu(g);
    }

    // =========================================================== turning a group into objects
    applyIntent(g, y, how) {
      this.pushHistory();
      const gid = uid++;
      let res;
      try { res = this.build(g, y, false); } catch (e) { console.error(e); res = { objs: [], status: global.tr('Could not convert: {msg}', { msg: global.tr(e.message) }) }; y = 'ink'; }
      if (y === 'ink') { g.inks.forEach(o => { o.pending = false; }); if (how === 'chosen') this.learner.record(g.f, 'ink'); this.render(); return; }
      const now = performance.now();
      g.inks.forEach(o => { o.gid = gid; o.fade = { start: now, dur: 360 }; });
      res.objs.forEach(o => { if (!o.gid) o.gid = gid; if (o.anim === undefined) o.anim = { start: now, dur: 420 }; });
      if (res.geo) { const before = this.geo.nid; res.geo(); const ids = []; for (let i = before; i < this.geo.nid; i++) ids.push(i); res.objs.push({ type: 'georef', id: uid++, gid, ids, hidden: true }); this.geo.solve(); this.geoChanged(); }
      if (res.merged) { /* appended into an existing equation */ g.inks.forEach(o => { o.gid = res.merged; }); }
      this.objects.push(...res.objs);
      if (res.after) res.after();
      let sampleId = null;
      if (how === 'chosen') sampleId = this.learner.record(g.f, y);
      if (how === 'auto') sampleId = this.learner.record(g.f, y, 0.5);
      const first = res.objs[0]; if (first && sampleId) first.sampleId = sampleId;
      const label = global.INTENTS[y].label;
      if (how === 'auto' || how === 'guess') {
        const why = how === 'auto' ? global.tr('learned from {n} similar drawings', { n: g.pred.ranked[0].similar }) : global.tr('guessed');
        this.onStatus((res.status || global.tr(label)) + ' — ' + why, [['Change', () => this.changeIntent(res.merged || gid)], ['Always ask', () => { this.learner.setMode('always'); this.opts.onModeChange && this.opts.onModeChange('always'); }]]);
      } else if (res.status) this.onStatus(res.status);
      this.implicitCache.clear(); this.requestFrame();
    }

    /** Pure-ish builder: returns {objs, status, after}. dry=true → nothing is mutated (used for ghost previews). */
    build(g, y, dry) {
      const inks = g.inks, color = inks[0].color, w = inks[0].w;
      const P = inks.flatMap(o => resample(o.pts, Math.max(16, Math.round(pathLen(o.pts) / 6))));
      const snap = (p, r) => (dry ? p : this.snapPoint(p, r));
      switch (y) {
        case 'math': case 'number': case 'plot': {
          let ascii = y === 'number' ? g.numAscii : g.ascii;
          if (!ascii) throw new Error('nothing readable');
          const H = clamp(g.reading ? g.reading.H : 36, 14, 90);
          if (y === 'math') {
            const prev = this.findContinuation(g.bb, H);
            if (prev) {
              const joined = prev.ascii + ascii; let ok = true; try { global.MathCore.analyze(joined); } catch (e) { ok = false; }
              if (ok || prev.error) {
                return { objs: [], merged: prev.gid || (prev.gid = uid++), status: global.tr('Read: {x}', { x: joined }), after: () => { prev.ascii = joined; prev.error = !ok; prev.solved = false; prev.anim = { start: performance.now(), dur: 300 }; } };
              }
            }
          }
          const m = { type: 'math', id: uid++, x: g.bb.minX, y: g.bb.cy, size: clamp(H * 1.25, 16, 110), color, ascii };
          try { global.MathCore.analyze(ascii); } catch (e) { m.error = !this.readable(ascii); }
          if (y === 'plot') {
            return { objs: [m], status: global.tr('Plotted {x}', { x: ascii }), after: () => { m.plotted = true; this.plotEquation(ascii, { color: color === COLORS.chalk ? null : color, near: m, noLabel: true, gid: m.gid }); } };
          }
          return { objs: [m], status: m.error ? global.tr('Not sure about “{x}” — double-click to fix', { x: ascii }) : global.tr('Read: {x}', { x: ascii }) };
        }
        case 'line': {
          const { c, ang } = pca(P); const u = { x: Math.cos(ang), y: Math.sin(ang) };
          let mn = Infinity, mx = -Infinity; P.forEach(p => { const t = (p.x - c.x) * u.x + (p.y - c.y) * u.y; mn = Math.min(mn, t); mx = Math.max(mx, t); });
          let [a, b] = snapAngle({ x: c.x + u.x * mn, y: c.y + u.y * mn }, { x: c.x + u.x * mx, y: c.y + u.y * mx });
          if (dry) return { objs: [{ type: 'line', id: 0, a, b, color, w }] };
          return { objs: [], geo: () => this.geo.fromShape('line', { a, b }, color === COLORS.chalk ? null : color), status: 'Segment — drag its ends, or pick it with △ Select to add constraints' };
        }
        case 'circle': {
          const f = circleFit(P) || { c: { x: g.bb.cx, y: g.bb.cy }, r: (g.bb.w + g.bb.h) / 4 };
          if (dry) return { objs: [{ type: 'circle', id: 0, c: f.c, r: f.r, color, w }] };
          return { objs: [], geo: () => this.geo.fromShape('circle', f, color === COLORS.chalk ? null : color), status: 'Circle — editable in the geometry tools' };
        }
        case 'ellipse': {
          const { c, ang } = pca(P); const cs = Math.cos(-ang), sn = Math.sin(-ang);
          let mnu = Infinity, mxu = -Infinity, mnv = Infinity, mxv = -Infinity;
          P.forEach(p => { const u = (p.x - c.x) * cs - (p.y - c.y) * sn, v = (p.x - c.x) * sn + (p.y - c.y) * cs; mnu = Math.min(mnu, u); mxu = Math.max(mxu, u); mnv = Math.min(mnv, v); mxv = Math.max(mxv, v); });
          let rot = ang; const snapR = Math.round(rot / (Math.PI / 2)) * (Math.PI / 2); if (Math.abs(rot - snapR) < 0.14) rot = snapR;
          const cc = { x: c.x + ((mnu + mxu) / 2) * Math.cos(ang) - ((mnv + mxv) / 2) * Math.sin(ang), y: c.y + ((mnu + mxu) / 2) * Math.sin(ang) + ((mnv + mxv) / 2) * Math.cos(ang) };
          return { objs: [{ type: 'ellipse', id: uid++, c: cc, rx: (mxu - mnu) / 2, ry: (mxv - mnv) / 2, rot, color, w }] };
        }
        case 'triangle': {
          const h = hull(P); let best = null;
          for (let i = 0; i < h.length; i++) for (let j = i + 1; j < h.length; j++) for (let k = j + 1; k < h.length; k++) { const a = triArea(h[i], h[j], h[k]); if (!best || a > best.a) best = { a, v: [h[i], h[j], h[k]] }; }
          if (!best) throw new Error('too small');
          return this.geoPoly(best.v, color, w, dry, false, 'Triangle');
        }
        case 'rect': {
          const h = hull(P); const r = minAreaRect(h); if (!r) throw new Error('too small');
          const snapR = Math.round(r.ang / (Math.PI / 2)) * (Math.PI / 2);
          if (Math.abs(r.ang - snapR) < 0.14) { const b = g.bb; return this.geoPoly([{ x: b.minX, y: b.minY }, { x: b.maxX, y: b.minY }, { x: b.maxX, y: b.maxY }, { x: b.minX, y: b.maxY }], color, w, dry, true, 'Rectangle'); }
          return this.geoPoly(rectCorners(r), color, w, dry, true, 'Rectangle');
        }
        case 'polygon': {
          let verts;
          if (inks.length === 1) {
            const pts = resample(inks[0].pts, 64), L = pathLen(inks[0].pts);
            verts = mergeClose(douglasPeucker(pts, Math.max(0.045 * L, 6)).slice(0, -1), 0.08 * L);
          } else { const h = hull(P); const per = pathLen(h.concat([h[0]])); verts = mergeClose(douglasPeucker(h.concat([h[0]]), Math.max(0.03 * per, 6)).slice(0, -1), 0.05 * per); }
          if (verts.length < 3) throw new Error('not enough corners');
          return this.geoPoly(verts, color, w, dry, false, 'Polygon');
        }
        case 'curve':
          return { objs: inks.map(o => { const r = resample(o.pts, 48); const closed = dist(r[0], r[r.length - 1]) < 18; return { type: 'curve', id: uid++, pts: chaikin(r, 3), closed, color, w }; }) };
        case 'graph': {
          let ax = this.axesAt(g.bb); const objs = [];
          if (!ax) { ax = this.newAxes({ cx: g.bb.cx, cy: g.bb.cy, hw: Math.max(g.bb.w / 2 + 50, 140), hh: Math.max(g.bb.h / 2 + 50, 110) }); objs.push(ax); }
          const longest = inks.slice().sort((a, b) => pathLen(b.pts) - pathLen(a.pts))[0];
          const fit = this.fitGraph(longest.pts, ax);
          if (!fit) throw new Error('that does not look like the graph of a function');
          const gr = { type: 'graph', id: uid++, axes: ax.id, eq: 'y=' + fit.ascii, mode: 'explicit', rhs: fit.ascii, color: color === COLORS.chalk ? this.nextPlotColor() : color };
          objs.push(gr);
          if (!dry) objs.push(this.makeLabel(ax, gr));
          return { objs, status: global.tr('Graph: y = {x}', { x: fit.ascii }) };
        }
        case 'axes': {
          let x0 = g.bb.minX, x1 = g.bb.maxX, y0 = g.bb.minY, y1 = g.bb.maxY, ox = g.bb.cx, oy = g.bb.cy;
          const straight = inks.filter(o => straightness(o.pts) < 0.1);
          if (straight.length >= 2) {
            const hz = straight.slice().sort((a, b) => (a.bb.h / (a.bb.w + 1)) - (b.bb.h / (b.bb.w + 1)))[0];
            const vt = straight.filter(s => s !== hz).sort((a, b) => (a.bb.w / (a.bb.h + 1)) - (b.bb.w / (b.bb.h + 1)))[0];
            oy = (hz.pts[0].y + hz.pts[hz.pts.length - 1].y) / 2; ox = (vt.pts[0].x + vt.pts[vt.pts.length - 1].x) / 2;
          }
          if (x1 - x0 < 120) { x0 = ox - 120; x1 = ox + 120; } if (y1 - y0 < 100) { y0 = oy - 100; y1 = oy + 100; }
          const span = Math.max(x1 - x0, y1 - y0);
          const ax = { type: 'axes', id: uid++, ox, oy, x0, x1, y0, y1, unit: clamp(Math.round(span / 14), 18, 60), color };
          return { objs: [ax], status: 'Axes ready — type y = … in the equation bar and press Plot, or sketch a curve on them' };
        }
        case 'ink': return { objs: [] };
      }
      throw new Error('unknown intent ' + y);
    }
    geoPoly(pts, color, w, dry, rect, name) {
      if (dry) return { objs: [{ type: 'poly', id: 0, pts, closed: true, color, w }] };
      return { objs: [], geo: () => this.geo.fromShape('poly', { pts, rect }, color === COLORS.chalk ? null : color), status: global.tr('{name} — drag the corners, or select it (△ Select) for constraints and measurements', { name: global.tr(name) }) };
    }
    previewGraph(g) {
      const ax = this.axesAt(g.bb) || { ox: g.bb.cx, oy: g.bb.cy, unit: clamp(Math.round(Math.max(g.bb.w, g.bb.h) / 10), 18, 60) };
      const longest = g.inks.slice().sort((a, b) => pathLen(b.pts) - pathLen(a.pts))[0];
      try { return this.fitGraph(longest.pts, ax); } catch (e) { return null; }
    }
    findContinuation(bb, H) {
      return this.objects.filter(o => o.type === 'math' && !o.isLabel && !o.alignRight && !o.system && !o.hidden).find(o => {
        const el = this.mathEls.get(o.id); if (!el) return false;
        const body = el.querySelector('.ink-math-body') || el;
        const r2 = body.getBoundingClientRect(), c = this.canvas.getBoundingClientRect();
        const right = r2.right - c.left, top = r2.top - c.top, bottom = r2.bottom - c.top;
        return bb.minX > right - 10 && bb.minX - right < Math.max(1.6 * H, 0.9 * o.size) && bb.cy > top - 0.2 * o.size && bb.cy < bottom + 0.2 * o.size;
      });
    }
    snapPoint(p, r = 16) {
      let best = null, bd = r;
      this.objects.forEach(o => {
        if (o.hidden) return;
        const cand = o.type === 'line' ? [o.a, o.b] : o.type === 'poly' ? o.pts : o.type === 'circle' ? [o.c] : [];
        cand.forEach(q => { const d = dist(p, q); if (d < bd) { bd = d; best = q; } });
      });
      return best ? { x: best.x, y: best.y } : p;
    }
    closeLoops(line) {
      const lines = this.objects.filter(o => o.type === 'line' && !o.hidden);
      const key = p => Math.round(p.x) + ',' + Math.round(p.y);
      const adj = new Map();
      lines.forEach(l => { [[l.a, l.b], [l.b, l.a]].forEach(([p, q]) => { if (!adj.has(key(p))) adj.set(key(p), []); adj.get(key(p)).push({ to: q, l }); }); });
      const target = key(line.b);
      const search = (p, path, usedL) => {
        if (path.length > 4) return null;
        for (const e of adj.get(key(p)) || []) {
          if (usedL.has(e.l)) continue;
          if (key(e.to) === target && path.length >= 2) return { pts: path.concat([e.to]), used: [...usedL, e.l] };
          const r = search(e.to, path.concat([e.to]), new Set([...usedL, e.l])); if (r) return r;
        }
        return null;
      };
      const cyc = search(line.a, [line.a], new Set([line]));
      if (cyc) {
        const used = cyc.used.concat([line]);
        this.objects = this.objects.filter(o => !used.includes(o));
        this.objects.push({ type: 'poly', id: uid++, gid: line.gid, pts: cyc.pts.map(p => ({ x: p.x, y: p.y })), closed: true, color: line.color, w: line.w });
        this.onStatus(cyc.pts.length === 3 ? 'Triangle closed' : 'Polygon closed');
      }
    }

    // =========================================================== axes & graphs
    axesAt(bb) { return this.objects.find(o => o.type === 'axes' && !o.hidden && bb.cx > o.x0 - 10 && bb.cx < o.x1 + 10 && bb.cy > o.y0 - 10 && bb.cy < o.y1 + 10); }
    toMath(ax, p) { return { x: (p.x - ax.ox) / ax.unit, y: (ax.oy - p.y) / UY(ax) }; }
    toPx(ax, m) { return { x: ax.ox + m.x * ax.unit, y: ax.oy - m.y * UY(ax) }; }
    newAxes(o = {}) {
      const hw = o.hw || Math.min(this.W * 0.34, 300), hh = o.hh || Math.min(this.H * 0.4, 230);
      const cx = clamp(o.cx !== undefined ? o.cx : this.W * 0.6, hw + 12, this.W - hw - 12), cy = clamp(o.cy !== undefined ? o.cy : this.H * 0.52, hh + 12, this.H - hh - 12);
      return { type: 'axes', id: uid++, ox: cx, oy: cy, x0: cx - hw, x1: cx + hw, y0: cy - hh, y1: cy + hh, unit: o.unit || 30, color: COLORS.chalk };
    }
    getAxes(near) {
      const all = this.objects.filter(o => o.type === 'axes' && !o.hidden);
      const chosen = all.find(a => a.id === this.plotAxes); if (chosen) return chosen;   // picked in the Graphs panel
      if (all.length) return near ? all.sort((a, b) => dist({ x: a.ox, y: a.oy }, near) - dist({ x: b.ox, y: b.oy }, near))[0] : all[all.length - 1];
      const ax = this.newAxes(); ax.anim = { start: performance.now(), dur: 500 }; this.objects.push(ax); return ax;
    }
    /** the visible axes, numbered 1, 2, … in the order they were made */
    axesList() { return this.objects.filter(o => o.type === 'axes' && !o.hidden); }
    /** where new graphs go: the axes picked in the Graphs panel, else the newest */
    targetAxes() { const all = this.axesList(); return all.find(a => a.id === this.plotAxes) || all[all.length - 1] || null; }
    setPlotAxes(id) { this.plotAxes = id; this.render(); }
    /** move a graph (with its label, tangent points and area) onto other axes */
    moveGraph(id, axId) {
      const g = this.objects.find(o => o.id === id), ax = this.objects.find(o => o.id === axId);
      if (!g || !ax || g.axes === axId) return;
      this.pushHistory();
      const label = this.objects.find(o => o.labelOf === id);
      g.axes = axId;
      if (label) { const nl = this.makeLabel(ax, g); delete nl.anim; Object.assign(label, { x: nl.x, y: nl.y, alignRight: nl.alignRight, labelAxes: axId }); }
      this.implicitCache.clear(); this.render();
    }
    insertAxes() {
      this.pushHistory();
      const others = this.axesList();
      let ax = this.newAxes();
      if (others.length) {   // beside the axes already there, not on top of them
        const hw = Math.min(this.W * 0.22, 220), hh = Math.min(this.H * 0.3, 200);
        const cands = [[0.75, 0.5], [0.25, 0.5], [0.75, 0.27], [0.75, 0.73], [0.25, 0.27], [0.25, 0.73], [0.5, 0.5]].map(([fx, fy]) => this.newAxes({ cx: this.W * fx, cy: this.H * fy, hw, hh, unit: 24 }));
        const overlap = a => others.reduce((s, b) => s + Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) * Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0)), 0);
        ax = cands.sort((a, b) => overlap(a) - overlap(b))[0];
      }
      ax.anim = { start: performance.now(), dur: 500 }; this.objects.push(ax);
      this.plotAxes = ax.id;   // new graphs go on the new axes (the Graphs panel can change it)
      this.render();
    }
    zoomAxes(ax, f, at) {   // at: keep this board point fixed (the cursor); default the origin
      const u0 = ax.unit, u = clamp(u0 * f, 4, ax.uy ? 4000 : 240), k = u / u0;
      if (at) { ax.ox = at.x - (at.x - ax.ox) * k; ax.oy = at.y - (at.y - ax.oy) * k; }
      ax.unit = u; if (ax.uy) ax.uy = clamp(ax.uy * k, 0.5, 40000);
      this.implicitCache.clear(); this.render();
    }
    fitGraph(pts, ax) {
      const r = resample(pts, 80).map(p => this.toMath(ax, p));
      let back = 0; const dir = Math.sign(r[r.length - 1].x - r[0].x) || 1;
      for (let i = 1; i < r.length; i++) if ((r[i].x - r[i - 1].x) * dir < -0.02) back++;
      if (back > r.length * 0.12) return null;
      const fit = global.MathCore.fitCurve(r.map(p => p.x), r.map(p => p.y));
      if (!fit) return null;
      return { ascii: fitToAscii(fit), tex: fit.tex };
    }
    nextPlotColor() { const used = this.objects.filter(o => o.type === 'graph').length; return PLOT_COLORS[used % PLOT_COLORS.length]; }

    /** Plot "y = …", "f(x) = …", a bare expression in x, or any relation in x and y (implicit). */
    plotEquation(ascii, opts = {}) {
      let src = ascii.trim(); if (!src) throw new Error('Type an equation first');
      // points, vectors and names defined on the board (js/vectors.js)
      const vr = this.vecAnalyze(src, opts.near && opts.near.type === 'math' ? opts.near : null);
      if (vr && vr.delegate) src = vr.delegate;
      else if (vr) return this.plotVec(vr, opts);
      let info = global.MathCore.analyze(src);
      if (info.kind === 'tangent') return this.plotTangent(info.tangent, opts);
      if (info.kind === 'derivative') { if (info.plotVar !== 'x') throw new Error('Plotting works with x as the variable'); src = 'y=' + info.derivAscii; info = global.MathCore.analyze(src); }
      if (info.calc && info.kind === 'evaluate') return this.plotCalcValue(src, opts);
      if (info.kind === 'expression' || (info.kind === 'function' && !src.includes('='))) { src = 'y=' + src; info = global.MathCore.analyze(src); }
      const vars = info.vars || [];
      let gr;
      const color = opts.color || this.nextPlotColor();
      if (!opts.noHistory) this.pushHistory();
      const ax = opts.axes || this.getAxes(opts.near);
      if (info.kind === 'function') {
        const rhs = src.replace(/^\s*(y|f\s*\(\s*x\s*\))\s*=/, '');
        gr = { type: 'graph', id: uid++, axes: ax.id, eq: src, mode: 'explicit', rhs, color };
      } else if (info.stmt.rels.length === 1 && info.stmt.rels[0] === '=' && vars.length >= 1 && vars.every(v => v === 'x' || v === 'y')) {
        gr = { type: 'graph', id: uid++, axes: ax.id, eq: src, mode: 'implicit', color };
      } else throw new Error('Only equations in x and y can be plotted (e.g. y = 2x + 1, x² + y² = 9)');
      gr.anim = { start: performance.now(), dur: 900 }; if (opts.gid) gr.gid = opts.gid;
      this.objects.push(gr);
      if (!opts.noLabel) this.objects.push(this.makeLabel(ax, gr));
      this.implicitCache.clear(); this.requestFrame();
      return gr;
    }
    // =========================================================== worksheet: points, vectors, named results (js/vectors.js)
    /** the typed lines that make up the worksheet, top to bottom in the order they were placed */
    mathLines() { return this.objects.filter(o => o.type === 'math' && !o.hidden && !o.fixed && !o.system && !o.isLabel && !o.error && o.ascii); }
    /** the definitions on the whole board, wherever they are written; for the line that makes a definition, without
        that one (so it still reads as a definition, and is not an equation about itself) */
    vecScope(m) {
      const L = this.mathLines(), sc = global.VecCore.scope(L.map(o => o.ascii)), i = m ? L.indexOf(m) : -1;
      if (i < 0) return sc;
      // an equation keeps showing its solutions after one of them was written on the board from it (a = 3)
      const drop = [...sc.defs].filter(([n, d]) => n === sc.lineDefs[i] || (L[d.line] && L[d.line].solvedFrom === m.id)).map(([n]) => n);
      if (!drop.length) return sc;
      const defs = new Map(sc.defs); drop.forEach(n => defs.delete(n)); return { defs, lineDefs: sc.lineDefs };
    }
    vecAnalyze(ascii, m) { if (!global.VecCore) return null; try { return global.VecCore.analyze(ascii, this.vecScope(m)); } catch (e) { return null; } }
    /** can either engine read this line? */
    readable(ascii) {
      const vr = this.vecAnalyze(ascii);
      if (vr && !vr.delegate) return true;   // a worksheet line (an error is shown beside it)
      try { global.MathCore.analyze(vr && vr.delegate ? vr.delegate : ascii); return true; } catch (e) { return false; }
    }
    /** draw a 2-D point or vector that a worksheet line gives */
    plotVec(vr, opts = {}) {
      const d = vr.drawable;
      if (!d) throw new Error(vr.kind === 'error' ? vr.error : global.tr('Only 2-D points and vectors can be drawn on the axes'));
      if (!opts.noHistory) this.pushHistory();
      const ax = opts.axes || this.getAxes(opts.near);
      const color = opts.color || this.nextPlotColor(), label = vecLabel(d.label), now = performance.now();
      let o;
      if (d.type === 'point') o = { type: 'point', id: uid++, axes: ax.id, x: d.x, y: d.y, color, label, anim: { start: now, dur: 400 } };
      else o = { type: 'vec', id: uid++, axes: ax.id, x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, color, label, anim: { start: now, dur: 600 } };
      if (opts.near && opts.near.type === 'math') o.from = opts.near.id;
      this.objects.push(o); this.requestFrame(); return o;
    }
    /** f, its tangent line at a, and the point of tangency */
    plotTangent(st, opts = {}) {
      if (!opts.noHistory) this.pushHistory();
      const ax = opts.axes || this.getAxes(opts.near);
      let f = this.sameGraph(ax, st.fAscii);
      if (!f) f = this.plotEquation('y=' + st.fAscii, { axes: ax, noHistory: true });
      const line = { type: 'graph', id: uid++, axes: ax.id, eq: st.lineAscii, mode: 'explicit', rhs: st.lineAscii.replace(/^y=/, ''), color: COLORS.chalk, dashed: true, anim: { start: performance.now() + 300, dur: 700 } };
      this.objects.push(line, this.makeLabel(ax, line));
      this.objects.push({ type: 'point', id: uid++, axes: ax.id, x: st.point.x, y: st.point.y, color: COLORS.chalk, label: global.tr('slope {v}', { v: niceNum(st.slope) }), anim: { start: performance.now() + 800, dur: 400 } });
      this.onStatus(global.tr('Tangent: {x}', { x: st.lineAscii.replace('*', '') }));
      this.requestFrame(); return line;
    }
    /** int(f, a, b) → curve + shaded area; lim(f, x→a) → curve + the limit point */
    plotCalcValue(src, opts = {}) {
      const st = global.MathCore.parse(src); let n = st.sides[0]; while (n && n.k === 'grp') n = n.a;
      if (!n || (n.k !== 'int' && n.k !== 'lim') || n.v !== 'x') throw new Error('Plot integrals and limits written with x, e.g. int(x^2, 0, 3)');
      if (!opts.noHistory) this.pushHistory();
      const fAscii = global.MathCore.toAscii(n.a);
      const ax = opts.axes || this.getAxes(opts.near);
      let g = this.sameGraph(ax, fAscii);
      if (!g) g = this.plotEquation('y=' + fAscii, { axes: ax, noHistory: true });
      if (n.k === 'int') {
        const a = global.MathCore.evaluate(n.lo), b = global.MathCore.evaluate(n.hi);
        g.shade = { a, b, value: global.MathCore.snapValue(global.MathCore.integrate(this.compile(fAscii), a, b)) };
        this.onStatus(global.tr('Area: ∫ = {v}', { v: niceNum(g.shade.value) }));
      } else {
        const r = global.MathCore.limit(this.compile(fAscii), global.MathCore.evaluate(n.to), n.side);
        if (isFinite(r.value)) this.objects.push({ type: 'point', id: uid++, axes: ax.id, x: global.MathCore.evaluate(n.to), y: r.value, color: COLORS.chalk, hollow: true, label: global.tr('limit {v}', { v: niceNum(r.value) }), anim: { start: performance.now() + 600, dur: 400 } });
        this.onStatus(isFinite(r.value) ? global.tr('Limit = {v}', { v: niceNum(r.value) }) : global.tr('The limit does not exist (or is infinite)'));
      }
      this.requestFrame(); return g;
    }
    /** an explicit graph on these axes that is the same function (compared by value, not by spelling) */
    sameGraph(ax, ascii) {
      const f = this.compile(ascii), xs = [-2.3, -0.7, 0.4, 1.1, 2.9];
      return this.graphs().find(g => g.axes === ax.id && g.mode === 'explicit' && !g.dashed && xs.every(x => { const a = f(x), b = this.compile(g.rhs)(x); return (!isFinite(a) && !isFinite(b)) || Math.abs(a - b) < 1e-9 * (1 + Math.abs(a)); }));
    }
    addDerivativeOf(gr) {
      const info = global.MathCore.analyze('d/dx(' + gr.rhs + ')');
      return this.plotEquation('y=' + info.derivAscii, { axes: this.objects.find(a => a.id === gr.axes) });
    }
    addTangentTo(gr, a) {
      const st = global.MathCore.calcSteps('tangent(' + gr.rhs + ', ' + a + ')');
      return this.plotTangent(st, { axes: this.objects.find(x => x.id === gr.axes) });
    }
    shadeArea(gr, a, b) {
      this.pushHistory();
      gr.shade = { a, b, value: global.MathCore.snapValue(global.MathCore.integrate(this.compile(gr.rhs), a, b)) };
      this.render(); return gr.shade.value;
    }
    plotSystem(list, opts = {}) {
      this.pushHistory();
      const ax = this.getAxes();
      const graphs = list.map((e, i) => this.plotEquation(e, { axes: ax, noHistory: true, color: PLOT_COLORS[(this.objects.filter(o => o.type === 'graph').length) % PLOT_COLORS.length] }));
      let sol = null;
      try { sol = global.MathCore.solveSystem(list); } catch (e) { /* plotted anyway */ }
      if (sol && sol.solutions && sol.vars.every(v => v === 'x' || v === 'y') && sol.vars.length === 2) {
        sol.solutions.forEach(s => this.objects.push({ type: 'point', id: uid++, axes: ax.id, x: s.x, y: s.y, color: COLORS.chalk, label: '(' + niceNum(s.x) + ', ' + niceNum(s.y) + ')', anim: { start: performance.now() + 700, dur: 400 } }));
      }
      this.requestFrame();
      return { graphs, sol };
    }
    makeLabel(ax, gr) {
      let lx = ax.x1 - 10, ly = ax.y0 + 20, right = true;
      if (gr.mode === 'explicit') {
        const ff = this.compile(gr.rhs);
        for (let px = ax.x1 - 16; px > ax.x0; px -= 4) {
          const y = ff((px - ax.ox) / ax.unit), py = ax.oy - y * UY(ax);
          if (isFinite(py) && py > ax.y0 + 16 && py < ax.y1 - 16) { if (px + 150 < this.W && px > ax.ox) { lx = px + 14; ly = py; right = false; } else { lx = px - 14; ly = py - 18; } break; }
        }
      } else {
        const n = this.objects.filter(o => o.type === 'math' && o.isLabel && o.labelAxes === ax.id).length;
        lx = ax.x1 - 8; ly = ax.y0 + 18 + n * 30;
      }
      return { type: 'math', id: uid++, x: lx, y: ly, size: 21, color: gr.color, ascii: gr.eq, alignRight: right, isLabel: true, labelOf: gr.id, labelAxes: ax.id, gid: gr.gid, anim: { start: performance.now() + 600, dur: 400 } };
    }
    compile(ascii) {
      const cache = this._fcache || (this._fcache = new Map());
      if (cache.has(ascii)) return cache.get(ascii);
      let f;
      try { const st = global.MathCore.parse(ascii); const e = st.sides[st.sides.length - 1]; f = x => { try { return global.MathCore.evaluate(e, { x }); } catch (er) { return NaN; } }; }
      catch (er) { f = () => NaN; }
      cache.set(ascii, f); return f;
    }
    compileImplicit(eq) {
      const cache = this._icache || (this._icache = new Map());
      if (cache.has(eq)) return cache.get(eq);
      let F; try { const R = global.MathCore.residual(eq); F = (x, y) => { try { return R({ x, y }); } catch (e) { return NaN; } }; } catch (e) { F = () => NaN; }
      cache.set(eq, F); return F;
    }
    implicitSegments(gr, ax) {
      const key = gr.id + '|' + ax.ox + '|' + ax.oy + '|' + ax.unit + '|' + UY(ax) + '|' + ax.x0 + '|' + ax.x1 + '|' + ax.y0 + '|' + ax.y1;
      if (this.implicitCache.has(key)) return this.implicitCache.get(key);
      const F = this.compileImplicit(gr.eq), step = 4, segs = [];
      const nx = Math.ceil((ax.x1 - ax.x0) / step), ny = Math.ceil((ax.y1 - ax.y0) / step);
      const val = []; for (let j = 0; j <= ny; j++) { val.push([]); for (let i = 0; i <= nx; i++) { const px = ax.x0 + i * step, py = ax.y0 + j * step; val[j].push(F((px - ax.ox) / ax.unit, (ax.oy - py) / UY(ax))); } }
      const lerp = (a, b, va, vb) => a + (b - a) * (va / (va - vb));
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const x0 = ax.x0 + i * step, y0 = ax.y0 + j * step, x1 = x0 + step, y1 = y0 + step;
        const a = val[j][i], b = val[j][i + 1], c = val[j + 1][i + 1], d = val[j + 1][i];
        if (![a, b, c, d].every(isFinite)) continue;
        const pts = [];
        if ((a > 0) !== (b > 0)) pts.push({ x: lerp(x0, x1, a, b), y: y0 });
        if ((b > 0) !== (c > 0)) pts.push({ x: x1, y: lerp(y0, y1, b, c) });
        if ((d > 0) !== (c > 0)) pts.push({ x: lerp(x0, x1, d, c), y: y1 });
        if ((a > 0) !== (d > 0)) pts.push({ x: x0, y: lerp(y0, y1, a, d) });
        // reject sign changes across poles (huge jumps)
        if (pts.length >= 2 && Math.max(Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d)) < 1e6) { segs.push([pts[0], pts[1]]); if (pts.length === 4) segs.push([pts[2], pts[3]]); }
      }
      this.implicitCache.set(key, segs); return segs;
    }
    keyPoints(gr, ax) {
      if (gr.mode !== 'explicit') return [];
      const f = this.compile(gr.rhs), out = [];
      const xa = (ax.x0 - ax.ox) / ax.unit, xb = (ax.x1 - ax.ox) / ax.unit, N = 600, h = (xb - xa) / N;
      const inY = y => { const py = ax.oy - y * UY(ax); return py > ax.y0 && py < ax.y1; };
      const y0 = f(0); if (isFinite(y0) && 0 > xa && 0 < xb && inY(y0)) out.push({ x: 0, y: y0, kind: 'y-intercept' });
      let px = xa, py = f(xa), pd = null;
      for (let i = 1; i <= N; i++) {
        const x = xa + i * h, y = f(x);
        if (isFinite(py) && isFinite(y) && Math.abs(y - py) < (ax.y1 - ax.y0) / UY(ax)) {
          if (py === 0 || py * y < 0) { let a = px, b = x, fa = py; for (let k = 0; k < 50; k++) { const m = (a + b) / 2, fm = f(m); if (fa * fm <= 0) b = m; else { a = m; fa = fm; } } const r = (a + b) / 2; if (Math.abs(f(r)) < 1e-6 && !out.some(q => Math.abs(q.x - r) < 1e-4 && q.y === 0)) out.push({ x: r, y: 0, kind: 'root' }); }
          const d = y - py;
          if (pd !== null && pd * d < 0 && Math.abs(d) > 1e-12) { // extremum between
            let a = px - h, b = x; const g = t => f(t);
            for (let k = 0; k < 60; k++) { const m1 = a + (b - a) / 3, m2 = b - (b - a) / 3; if ((g(m1) < g(m2)) === (pd > 0)) a = m1; else b = m2; }
            const m = (a + b) / 2, fm = f(m); if (isFinite(fm) && inY(fm) && !out.some(q => Math.abs(q.x - m) < 1e-3)) out.push({ x: m, y: fm, kind: pd > 0 ? 'max' : 'min' });
          }
          pd = d;
        } else pd = null;
        px = x; py = y;
      }
      return out.filter(q => inY(q.y)).slice(0, 12);
    }
    graphs() { return this.objects.filter(o => o.type === 'graph'); }
    setGraph(id, props) { const g = this.objects.find(o => o.id === id); if (!g) return; this.pushHistory(); Object.assign(g, props); this.objects.filter(o => o.labelOf === id).forEach(l => { if ('hidden' in props) l.hidden = props.hidden; if (props.color) l.color = props.color; }); this.render(); }
    removeGraph(id) { this.pushHistory(); this.objects = this.objects.filter(o => o.id !== id && o.labelOf !== id); this.render(); }

    // =========================================================== placing typed equations
    startPlacing(spec) {
      this.cancelPlacing();
      const el = document.createElement('div'); el.className = 'ink-math placing'; el.style.fontSize = '30px'; el.style.color = this.color;
      el.innerHTML = '<span class="ink-math-body"></span>';
      let tex = spec.tex ? spec.tex : spec.system ? casesOf(spec.system) : null;
      if (!tex) { const vr = this.vecAnalyze(spec.ascii); tex = vr && vr.latex ? vr.latex : global.MathCore.analyze(vr && vr.delegate ? vr.delegate : spec.ascii).latex; }
      global.katex.render(tex, el.firstChild, { throwOnError: false });
      this.overlay.appendChild(el);
      this.placing = { spec, el };
      el.style.left = (this.W * 0.06) + 'px'; el.style.top = (this.H * 0.15) + 'px';
      this.root.classList.add('is-placing');
      this.onStatus('Click on the board to place it · Esc to cancel');
    }
    movePlacing(p) { if (!this.placing) return; const el = this.placing.el; el.style.left = (p.x + 6) + 'px'; el.style.top = p.y + 'px'; el.style.transform = 'translate(0,-50%)'; }
    finishPlacing(p) {
      const { spec } = this.placing; this.cancelPlacing();
      this.pushHistory();
      const m = { type: 'math', id: uid++, x: p.x + 6, y: p.y, size: 30, color: this.color, ascii: spec.ascii || '', anim: { start: performance.now(), dur: 300 } };
      if (spec.tex) { m.tex = spec.tex; m.fixed = true; m.size = 26; }   // ready-made LaTeX (matrix tools)
      else if (spec.system) { m.system = spec.system.slice(); m.ascii = spec.system.join(' ; '); m.solved = !!spec.solved; }
      else { try { const inf = global.MathCore.analyze(m.ascii); if (spec.solved && inf.kind === 'value') m.ascii += '='; } catch (e) { m.error = !this.readable(m.ascii); } m.solved = !!spec.solved; }
      this.objects.push(m); this.render();
      if (spec.plot) { try { if (spec.system) this.plotSystem(spec.system); else { m.plotted = true; this.plotEquation(m.ascii, { near: m, noHistory: true }); } } catch (e) { this.onStatus(e.message); } }
    }
    cancelPlacing() { if (!this.placing) return; this.placing.el.remove(); this.placing = null; this.root.classList.remove('is-placing'); }
    addTyped(ascii, plot) { // place directly below the previous equation (no click needed)
      // below the last line, by its real height (fractions and determinants are tall); a new column when the board is full
      const cr = this.canvas.getBoundingClientRect();
      const box = o => { const el = this.mathEls.get(o.id); if (!el) return { bottom: o.y + 20, right: o.x + 200 }; const r = el.getBoundingClientRect(), rb = (el.firstChild || el).getBoundingClientRect(); return { bottom: r.bottom - cr.top, right: rb.right - cr.left }; };
      const lines = this.objects.filter(o => o.type === 'math' && !o.isLabel && !o.hidden && !o.fixed);
      let x = 34, y = 60;
      if (lines.length) {
        const last = lines[lines.length - 1], col = lines.filter(o => Math.abs(o.x - last.x) < 4);
        x = last.x - 6; y = Math.max(...col.map(o => box(o).bottom)) + 26;
        if (y > this.H - 36) { const nx = Math.max(...col.map(o => box(o).right)) + 34 - 6; if (nx < this.W - 160) { x = nx; y = 60; } else y = this.H - 40; }
      }
      this.startPlacing({ ascii, plot }); this.finishPlacing({ x, y });
    }

    // =========================================================== scripted drawing (cheat-sheet tutorials, js/tutor.js)
    // positions and sizes are fractions of the board (0–1), so a script looks the same at any size; d = delay in ms
    sWrite(tex, o = {}) {
      const m = { type: 'math', id: uid++, x: (o.x !== undefined ? o.x : 0.05) * this.W, y: (o.y !== undefined ? o.y : 0.12) * this.H, size: o.s || 26, color: o.c || COLORS.chalk,
        ascii: '', tex, fixed: true, alignRight: !!o.right, anim: { start: performance.now() + (o.d || 0), dur: o.dur || 500 } };
      this.objects.push(m); this.requestFrame(); return m;
    }
    /** axes filling the box (bx0, by0)–(bx1, by1) (board fractions) and showing exactly xw = [x0, x1], yw = [y0, y1] */
    sWindow(box, xw, yw, o = {}) {
      const X0 = box[0] * this.W, Y0 = box[1] * this.H, X1 = box[2] * this.W, Y1 = box[3] * this.H;
      const ux = (X1 - X0) / (xw[1] - xw[0]), uy = (Y1 - Y0) / (yw[1] - yw[0]);
      const ax = { type: 'axes', id: uid++, x0: X0, x1: X1, y0: Y0, y1: Y1, ox: X0 - xw[0] * ux, oy: Y0 + yw[1] * uy, unit: ux, uy, color: COLORS.chalk, anim: { start: performance.now() + (o.d || 0), dur: 500 } };
      this.objects.push(ax); this.requestFrame(); return ax;
    }
    /** axes centred at (x, y) with half-sizes (w, h); xr = how many units fit from the centre to the right edge */
    sAxes(o = {}) {
      const hw = (o.w || 0.3) * this.W, hh = (o.h || 0.32) * this.H;
      const ax = this.newAxes({ cx: (o.x !== undefined ? o.x : 0.66) * this.W, cy: (o.y !== undefined ? o.y : 0.55) * this.H, hw, hh, unit: o.xr ? hw / o.xr : (o.unit || 30) });
      if (o.ox !== undefined) ax.ox = ax.x0 + o.ox * 2 * hw;            // where the origin sits inside the box: 0 = left edge, 0.5 = centre
      if (o.oy !== undefined) ax.oy = ax.y1 - o.oy * 2 * hh;            // 0 = bottom edge, 0.5 = centre
      ax.anim = { start: performance.now() + (o.d || 0), dur: 500 };
      this.objects.push(ax); this.requestFrame(); return ax;
    }
    sPlot(ax, ascii, o = {}) {
      const gr = this.plotEquation(ascii, { axes: ax, noHistory: true, noLabel: o.lab !== true, color: o.c });   // a script labels its curves itself
      const t = performance.now() + (o.d || 0);
      gr.anim = { start: t, dur: o.dur || 900 }; if (o.dash) gr.dashed = true;
      this.objects.filter(l => l.labelOf === gr.id).forEach(l => { l.anim = { start: t + 600, dur: 400 }; });
      return gr;
    }
    sShade(gr, a, b) { gr.shade = { a, b, value: global.MathCore.snapValue(global.MathCore.integrate(this.compile(gr.rhs), a, b)) }; this.requestFrame(); return gr.shade.value; }
    sPoint(ax, x, y, label, o = {}) { const pt = { type: 'point', id: uid++, axes: ax.id, x, y, color: o.c || COLORS.chalk, hollow: !!o.hollow, label: label || '', anim: { start: performance.now() + (o.d || 0), dur: 400 } }; this.objects.push(pt); this.requestFrame(); return pt; }
    /** a straight chalk line between board fractions, or between maths points of an axes (o.ax) */
    sLine(x1, y1, x2, y2, o = {}) {
      const P = (x, y) => o.ax ? this.toPx(o.ax, { x, y }) : { x: x * this.W, y: y * this.H };
      const ln = { type: 'line', id: uid++, a: P(x1, y1), b: P(x2, y2), color: o.c || COLORS.chalk, w: o.w || 2.4, anim: { start: performance.now() + (o.d || 0), dur: o.dur || 500 } };
      this.objects.push(ln); this.requestFrame(); return ln;
    }
    sTangent(gr, a) { const st = global.MathCore.calcSteps('tangent(' + gr.rhs + ', ' + a + ')'); return this.plotTangent(st, { axes: this.objects.find(x => x.id === gr.axes), noHistory: true }); }
    /** finish every animation now (used when a tutorial jumps to a step) */
    sSettle() { this.objects.forEach(o => { delete o.anim; }); this.render(); }

    // =========================================================== math overlays
    mathContent(m) {
      if (m.fixed) return { tex: m.tex, actions: [] };          // written by a script (cheat-sheet tutorials): shown as given
      if (m.system) {
        let tex = casesOf(m.system); const actions = [];
        let sol = null; try { sol = global.MathCore.solveSystem(m.system); } catch (e) { return { tex: '\\text{' + texEsc(m.ascii) + '}\\;?', actions }; }
        if (m.solved) tex += '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ ' + solutionTex(sol) + '}';
        else actions.push(['Solve', () => { this.pushHistory(); m.solved = true; this.render(); }]);
        if (sol.vars.every(v => v === 'x' || v === 'y') && !m.plotted) actions.push(['Plot', () => { m.plotted = true; this.plotSystem(m.system); this.render(); }]);
        actions.push(['Steps', () => this.opts.onSteps && this.opts.onSteps(m.system)]);
        return { tex, actions };
      }
      if (m.error) return { tex: '\\text{' + texEsc(m.ascii) + '}\\;\\textbf{?}', actions: [] };
      const vr = m.isLabel ? null : this.vecAnalyze(m.ascii, m);
      if (vr && !vr.delegate) return this.vecContent(m, vr);
      const src = vr && vr.delegate ? vr.delegate : m.ascii;   // defined numbers substituted
      let info; try { info = global.MathCore.analyze(src); } catch (e) { return { tex: '\\text{' + texEsc(m.ascii) + '}\\;?', actions: [] }; }
      let tex = (vr && vr.latex) || info.latex; const actions = [];
      if (m.isLabel) return { tex, actions };
      if (info.kind === 'evaluate') tex += '\\,\\textcolor{#f3d36b}{' + info.resultTex + '}';
      if (info.kind === 'derivative') tex += ' = \\textcolor{#f3d36b}{' + info.resultTex + '}';
      if (info.kind === 'tangent') tex += ':\\ \\textcolor{#f3d36b}{' + info.resultTex + '}';
      const steps = () => this.opts.onCalcSteps && this.opts.onCalcSteps(src);
      if (info.calc) {
        const plotable = info.kind === 'derivative' ? info.plotVar === 'x' : info.kind === 'tangent' || (info.kind === 'evaluate' && /^(int|lim|∫)/.test(src.trim()));
        if (plotable && !m.plotted) actions.push(['Plot', () => { try { this.pushHistory(); m.plotted = true; this.plotEquation(m.ascii.replace(/=\s*$/, ''), { near: m, noHistory: true }); } catch (e) { this.onStatus(e.message); } this.render(); }]);
        actions.push(['Steps', steps]);
        return { tex, actions };
      }
      if (info.kind === 'equation') {
        if (m.solved) { tex += '\\quad\\textcolor{#f3d36b}{\\Rightarrow\\ ' + info.resultTex + '}'; if (global.VecCore && info.roots) this.useActions(m, info.roots.map(r => global.VecCore.useLine(info.variable, r, this.vecScope().defs)), actions); }
        else actions.push(['Solve', () => { this.pushHistory(); m.solved = true; this.render(); }]);
      }
      if (info.kind === 'value') actions.push(['= ?', () => { this.pushHistory(); m.ascii += '='; this.render(); }]);
      if ((info.kind === 'function' || info.kind === 'relation') && !m.plotted) actions.push(['Plot', () => { try { this.pushHistory(); m.plotted = true; this.plotEquation(m.ascii, { near: m, noHistory: true }); } catch (e) { this.onStatus(e.message); } this.render(); }]);
      return { tex, actions };
    }
    /** a worksheet line (js/vectors.js): its LaTeX with the result, plus Plot and "use a = 3" buttons */
    vecContent(m, vr) {
      const actions = [];
      if (vr.kind === 'error') return { tex: vr.latex + '\\quad\\textcolor{#ff8f8f}{\\text{' + texEsc(global.tr(vr.error || '?')) + '}}', actions };
      if (vr.drawable && !m.plotted && !this.objects.some(o => o.from === m.id)) actions.push(['Plot', () => { try { this.pushHistory(); m.plotted = true; this.plotVec(vr, { near: m, noHistory: true }); } catch (e) { this.onStatus(e.message); } this.render(); }]);
      if (vr.roots && vr.unknown) { const defs = this.vecScope().defs; this.useActions(m, vr.roots.map(r => global.VecCore.useLine(vr.unknown, r, defs)), actions); }
      return { tex: vr.latex + vr.resultTex, actions };
    }
    /** buttons that write a solution below as a definition (a = 3), so the lines after it can use it */
    useActions(m, lines, actions) {
      const have = new Set(this.mathLines().map(o => o.ascii.replace(/\s+/g, '')));
      lines.slice(0, 4).forEach(line => {
        if (have.has(line.replace(/\s+/g, ''))) return;
        actions.push([line.replace(/\*/g, '·').replace(/sqrt/g, '√'), () => { this.addTyped(line); const made = this.mathLines().pop(); if (made) { made.solvedFrom = m.id; this.render(); } this.onStatus(global.tr('{x} is now defined: the lines you add below use it', { x: line })); }]);
      });
    }
    syncMath(now) {
      const alive = new Set();
      const sheet = global.VecCore ? this.mathLines().map(o => o.ascii).join('\n') : '';   // a definition changed → every line may change
      this.objects.filter(o => o.type === 'math' && !o.hidden).forEach(m => {
        alive.add(m.id);
        let el = this.mathEls.get(m.id);
        const canChange = m.gid && this.objects.some(o => o.type === 'ink' && o.hidden && o.gid === m.gid);
        const key = [m.ascii, m.tex, m.solved, m.plotted, m.size, m.color, m.error, canChange, global.I18N ? global.I18N.lang : '', m.fixed || m.isLabel ? '' : sheet, this.objects.some(o => o.from === m.id)].join('|');
        if (!el) { el = document.createElement('div'); el.className = 'ink-math'; this.overlay.appendChild(el); this.mathEls.set(m.id, el); }
        if (el._key !== key) {
          el._key = key;
          const { tex, actions } = this.mathContent(m);
          el.innerHTML = '<span class="ink-math-body"></span>';
          try { global.katex.render(global.I18N ? global.I18N.tex(tex) : tex, el.firstChild, { throwOnError: false, displayMode: false, trust: true, strict: false }); } catch (e) { el.firstChild.textContent = m.ascii; }
          const bar = document.createElement('span'); bar.className = 'ink-math-actions';
          actions.forEach(([label, fn]) => { const b = document.createElement('button'); b.textContent = label; b.onclick = ev => { ev.stopPropagation(); fn(); }; bar.appendChild(b); });
          if (!m.isLabel && !m.fixed) {
            if (canChange) { const c = document.createElement('button'); c.className = 'edit'; c.title = 'Not an equation? Choose what it is'; c.textContent = '⇄'; c.onclick = ev => { ev.stopPropagation(); this.changeIntent(m.gid); }; bar.appendChild(c); }
            const ed = document.createElement('button'); ed.className = 'edit'; ed.title = 'Edit (or double-click)'; ed.textContent = '✎'; ed.onclick = ev => { ev.stopPropagation(); this.editMath(m); }; bar.appendChild(ed);
          }
          el.appendChild(bar);
          el.classList.toggle('error', !!m.error); el.classList.toggle('label', !!m.isLabel);
          el.style.fontSize = m.size + 'px'; el.style.color = m.color;
        }
        el.style.left = m.x + 'px'; el.style.top = m.y + 'px';
        el.classList.toggle('editing', m === this.editingMath);
        el.style.transform = 'translate(' + (m.alignRight ? '-100%' : '0') + ', -50%)';
        const a = m.anim ? clamp((now - m.anim.start) / m.anim.dur, 0, 1) : 1;
        el.style.opacity = a; el.style.filter = a < 1 ? 'blur(' + (1 - a) * 3 + 'px)' : '';
      });
      for (const [id, el] of this.mathEls) if (!alive.has(id)) { el.remove(); this.mathEls.delete(id); }
    }
    hitMath(m, p) {
      const el = this.mathEls.get(m.id); if (!el) return false;
      const r = el.getBoundingClientRect(), c = this.canvas.getBoundingClientRect();
      return p.x >= r.left - c.left - 6 && p.x <= r.right - c.left + 6 && p.y >= r.top - c.top - 6 && p.y <= r.bottom - c.top + 6;
    }
    editMath(m) {
      if (m.fixed) return;
      if (m.system) { this.opts.onEditSystem && this.opts.onEditSystem(m); return; }
      // edit in the equation bar: the formula goes into the field, the calculator keys keep working, and only
      // Enter (or ✓) changes the board — clicking elsewhere does not lose or revert the edit
      if (this.opts.onEditMath) { this.editingMath = m; this.render(); this.opts.onEditMath(m); return; }
      const el = this.mathEls.get(m.id); if (!el || el.querySelector('input')) return;
      const inp = document.createElement('input'); inp.className = 'ink-math-input'; inp.value = m.ascii; inp.spellcheck = false;
      el.innerHTML = ''; el.appendChild(inp); el._key = null; inp.focus(); inp.select();
      const done = commit => { if (inp._done) return; inp._done = true; if (commit) this.commitMath(m, inp.value); else this.render(); };
      inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') done(true); if (e.key === 'Escape') done(false); });
    }
    /** replace a formula's text (empty text removes it); one undo step */
    commitMath(m, v) {
      v = String(v || '').trim(); this.editingMath = null;
      if (!this.objects.includes(m)) { this.render(); return false; }
      if (v && v !== m.ascii) {
        this.pushHistory(); m.ascii = v; m.error = false; m.solved = false; m.mathKey = null;
        m.error = !this.readable(m.ascii);
        if (m.isLabel && m.labelOf) { const gr = this.objects.find(o => o.id === m.labelOf); if (gr) { gr.eq = v; gr.rhs = v.replace(/^\s*(y|f\s*\(\s*x\s*\))\s*=/, ''); this.implicitCache.clear(); } }
      }
      if (!v) { this.pushHistory(); this.objects = this.objects.filter(o => o !== m); }
      const el = this.mathEls.get(m.id); if (el) el._key = null;
      this.render();
      return true;
    }
    cancelEditMath() { if (!this.editingMath) return; this.editingMath = null; this.render(); }

    // =========================================================== erase / move / hover
    hitTest(p) { for (let i = this.objects.length - 1; i >= 0; i--) { const o = this.objects[i]; if (!o.hidden && this.hits(o, p, 10)) return o; } return null; }
    hits(o, p, r) {
      switch (o.type) {
        case 'ink': case 'curve': for (let i = 1; i < o.pts.length; i++) if (segDist(p, o.pts[i - 1], o.pts[i]) < r) return true; return false;
        case 'line': return segDist(p, o.a, o.b) < r;
        case 'circle': return Math.abs(dist(p, o.c) - o.r) < r;
        case 'ellipse': { const c = Math.cos(-(o.rot || 0)), s = Math.sin(-(o.rot || 0)), dx = p.x - o.c.x, dy = p.y - o.c.y, u = dx * c - dy * s, v = dx * s + dy * c; return Math.abs(Math.hypot(u / o.rx, v / o.ry) - 1) * Math.min(o.rx, o.ry) < r; }
        case 'poly': { const n = o.pts.length, m = o.closed ? n : n - 1; for (let i = 0; i < m; i++) if (segDist(p, o.pts[i], o.pts[(i + 1) % n]) < r) return true; return false; }
        case 'axes': return segDist(p, { x: o.x0, y: o.oy }, { x: o.x1, y: o.oy }) < r || segDist(p, { x: o.ox, y: o.y0 }, { x: o.ox, y: o.y1 }) < r;
        case 'graph': { const ax = this.objects.find(a => a.id === o.axes); if (!ax) return false;
          if (o.mode === 'explicit') { const y = this.compile(o.rhs)((p.x - ax.ox) / ax.unit); return Math.abs(ax.oy - y * UY(ax) - p.y) < r + 2; }
          const F = this.compileImplicit(o.eq), m = this.toMath(ax, p), e = 1e-4; const v = F(m.x, m.y), gx = (F(m.x + e, m.y) - v) / e, gy = (F(m.x, m.y + e) - v) / e; return Math.abs(v) / (Math.hypot(gx, gy) || 1) * ax.unit < r + 2; }
        case 'point': { const ax = this.objects.find(a => a.id === o.axes); return ax && dist(p, this.toPx(ax, o)) < r; }
        case 'vec': { const ax = this.objects.find(a => a.id === o.axes); return ax && segDist(p, this.toPx(ax, { x: o.x1, y: o.y1 }), this.toPx(ax, { x: o.x2, y: o.y2 })) < r; }
        case 'math': return this.hitMath(o, p);
      }
      return false;
    }
    eraseAt(p) {
      const gh = this.geo.hit(p);
      if (gh) { this.geo.removeIds([gh.id]); this.cleanupGeo(); this.geo.solve(); this.render(); this.geoChanged(); return; }
      const gone = this.objects.filter(o => !o.hidden && this.hits(o, p, 12));
      if (!gone.length) return;
      const goneIds = new Set(gone.map(o => o.id));
      this.objects = this.objects.filter(o => !goneIds.has(o.id) && !goneIds.has(o.axes) && !goneIds.has(o.labelOf));
      this.render();
    }
    translate(o, dx, dy) {
      const mv = q => { q.x += dx; q.y += dy; };
      switch (o.type) {
        case 'ink': case 'curve': case 'poly': o.pts.forEach(mv); break;
        case 'line': mv(o.a); mv(o.b); break;
        case 'circle': case 'ellipse': mv(o.c); break;
        case 'axes': o.ox += dx; o.oy += dy; o.x0 += dx; o.x1 += dx; o.y0 += dy; o.y1 += dy; this.objects.filter(l => l.isLabel && l.labelAxes === o.id).forEach(l => { l.x += dx; l.y += dy; }); break;
        case 'graph': case 'point': case 'vec': { const ax = this.objects.find(a => a.id === o.axes); if (ax) this.translate(ax, dx, dy); break; }
        case 'math': o.x += dx; o.y += dy; break;
      }
    }
    grabbable(p) {
      const m = this.objects.slice().reverse().find(o => o.type === 'math' && !o.hidden && this.hitMath(o, p));
      if (m) return m;
      const ax = this.objects.find(o => o.type === 'axes' && !o.hidden && dist(p, { x: clamp(o.ox, o.x0, o.x1), y: clamp(o.oy, o.y0, o.y1) }) < 12);
      if (ax) return ax;
      const gp = this.geo.hitPoint(p, 9); if (gp && !this.geo.isFixed(gp)) return { geo: gp };
      return null;
    }
    hoverAt(p) {
      if (this.tool === 'move') { this.live.style.cursor = (this.hitTest(p) || this.geo.hit(p)) ? 'grab' : 'default'; return; }
      if (this.tool === 'smart' || this.tool === 'pen') this.live.style.cursor = this.grabbable(p) ? 'grab' : 'crosshair';
      this.hover = null;
      if (this.trace) {
        for (const gr of this.graphs()) {
          if (gr.hidden || gr.mode !== 'explicit') continue;
          const ax = this.objects.find(a => a.id === gr.axes); if (!ax || p.x < ax.x0 || p.x > ax.x1) continue;
          const x = (p.x - ax.ox) / ax.unit, y = this.compile(gr.rhs)(x), py = ax.oy - y * UY(ax);
          if (isFinite(py) && Math.abs(py - p.y) < 10 && py > ax.y0 && py < ax.y1) { this.hover = { x: p.x, y: py, label: '(' + niceNum(x) + ', ' + niceNum(y) + ')', color: gr.color }; break; }
        }
      }
      this.drawLive();
    }

    // =========================================================== rendering
    requestFrame() { if (!this._raf) this._raf = requestAnimationFrame(() => { this._raf = null; this.render(); }); }
    drawLive() {
      const d = this.drawing, c = this.lctx; c.clearRect(0, 0, this.W, this.H);
      if (this.ghostObjs) { c.save(); c.setLineDash([7, 6]); c.globalAlpha = 0.9; this.ghostObjs.forEach(o => { c.strokeStyle = '#ffe58a'; c.lineWidth = 2.5; this.drawObj(c, o, 1); }); c.restore(); }
      if (this.menu) { const b = this.menu.g.bb; c.save(); c.strokeStyle = 'rgba(243,211,107,.55)'; c.setLineDash([4, 5]); c.lineWidth = 1.2; c.strokeRect(b.minX - 8, b.minY - 8, b.w + 16, b.h + 16); c.restore(); }
      if (this.hover && !d) {
        const h = this.hover; c.save(); c.fillStyle = h.color; c.beginPath(); c.arc(h.x, h.y, 4.5, 0, Math.PI * 2); c.fill();
        c.font = '15px Kalam, cursive'; c.fillStyle = 'rgba(0,0,0,.55)'; const tw = c.measureText(h.label).width; c.fillRect(h.x + 9, h.y - 28, tw + 12, 22);
        c.fillStyle = h.color; c.fillText(h.label, h.x + 15, h.y - 12); c.restore();
      }
      if (!d) return;
      if (d.mode === 'ink') { c.strokeStyle = this.color; c.lineWidth = this.width; c.lineCap = c.lineJoin = 'round'; c.globalAlpha = 0.95; smoothPath(c, d.pts); c.stroke(); }
      if (d.mode === 'erase') { const p = d.pts[d.pts.length - 1]; c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1; c.beginPath(); c.arc(p.x, p.y, 12, 0, Math.PI * 2); c.stroke(); }
    }
    render() {
      const c = this.ctx, now = performance.now();
      c.clearRect(0, 0, this.W, this.H);
      let animating = false;
      this.objects.forEach(o => { if (o.fade && now - o.fade.start > o.fade.dur) { delete o.fade; if (o.type === 'ink' && o.gid) o.hidden = true; } });
      for (const o of this.objects) {
        if (o.hidden || o.type === 'math') continue;
        let p = 1, alpha = 1;
        if (o.anim) { p = clamp((now - o.anim.start) / o.anim.dur, 0, 1); if (p < 1) animating = true; else delete o.anim; p = ease(p); }
        if (o.fade) { alpha = 1 - clamp((now - o.fade.start) / o.fade.dur, 0, 1); animating = true; }
        c.save(); c.globalAlpha = alpha * (o.asking ? 0.7 : 0.96); c.strokeStyle = o.color || COLORS.chalk; c.fillStyle = o.color || COLORS.chalk;
        c.lineWidth = o.w || 3; c.lineCap = c.lineJoin = 'round';
        this.drawObj(c, o, p);
        c.restore();
      }
      c.save(); c.globalCompositeOperation = 'destination-out'; c.fillStyle = this.grainPat; c.globalAlpha = 0.5; c.fillRect(0, 0, this.W, this.H); c.restore();
      this.drawKeyPoints(c);
      this.geo.draw(c, now);
      this.syncMath(now);
      if (animating || this.objects.some(o => o.type === 'math' && o.anim)) {
        this.objects.forEach(o => { if (o.type === 'math' && o.anim && now - o.anim.start > o.anim.dur) delete o.anim; });
        this.requestFrame();
      }
      this.drawLive();
      if (this.opts.onChange) this.opts.onChange();
    }
    drawObj(c, o, p) {
      switch (o.type) {
        case 'ink': smoothPath(c, o.pts); c.stroke(); break;
        case 'curve': partialPath(c, o.pts, p, o.closed); c.stroke(); break;
        case 'line': c.beginPath(); c.moveTo(o.a.x, o.a.y); c.lineTo(o.a.x + (o.b.x - o.a.x) * p, o.a.y + (o.b.y - o.a.y) * p); c.stroke(); break;
        case 'circle': c.beginPath(); c.arc(o.c.x, o.c.y, o.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); c.stroke(); break;
        case 'ellipse': c.beginPath(); c.ellipse(o.c.x, o.c.y, Math.max(1, o.rx), Math.max(1, o.ry), o.rot || 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); c.stroke(); break;
        case 'poly': partialPath(c, o.pts, p, o.closed); c.stroke(); break;
        case 'axes': this.drawAxes(c, o, p); break;
        case 'graph': this.drawGraph(c, o, p); break;
        case 'point': this.drawPoint(c, o, p); break;
        case 'vec': this.drawVec(c, o, p); break;
      }
    }
    drawAxes(c, a, p) {
      const ux = a.unit, uy = UY(a);
      const all = this.axesList();
      if (all.length > 1 && !a.uy) {   // several axes: number them (the Graphs panel uses the numbers)
        const n = all.indexOf(a) + 1, on = (this.targetAxes() || {}).id === a.id;
        c.save(); c.globalAlpha *= p; c.font = '700 13px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = on ? '#f3d36b' : 'rgba(246,233,214,.25)'; c.beginPath(); c.arc(a.x0 + 12, a.y0 + 12, 10, 0, Math.PI * 2); c.fill();
        c.fillStyle = on ? '#3b2814' : '#f6e9d6'; c.fillText(String(n), a.x0 + 12, a.y0 + 12.5); c.restore();
      }
      // tick and label steps: whole numbers on the normal board, decimals too when a tutorial zooms in
      const NICE = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
      const steps = u => {
        if (u >= 10 && u <= 60 && !a.uy) return { tick: 1, lab: [1, 2, 5, 10].find(s => s * u >= 26) || 10, grid: 1 };
        const lab = NICE.find(s => s * u >= 34) || 5000, tick = NICE.find(s => s * u >= 12 && Math.abs(lab / s - Math.round(lab / s)) < 1e-9) || lab;
        return { tick, lab, grid: NICE.find(s => s * u >= 14) || lab };
      };
      const SX = steps(ux), SY = steps(uy), fmt = v => String(+v.toFixed(4));
      c.lineWidth = 2.2; c.globalAlpha *= 0.9;
      // light grid
      c.save(); c.globalAlpha *= 0.12 * p; c.lineWidth = 1; c.beginPath();
      for (let k = Math.ceil((a.x0 - a.ox) / ux / SX.grid); a.ox + k * SX.grid * ux <= a.x1; k++) { const x = a.ox + k * SX.grid * ux; c.moveTo(x, a.y0); c.lineTo(x, a.y1); }
      for (let k = Math.ceil((a.oy - a.y1) / uy / SY.grid); a.oy - k * SY.grid * uy >= a.y0; k++) { const y = a.oy - k * SY.grid * uy; c.moveTo(a.x0, y); c.lineTo(a.x1, y); }
      c.stroke(); c.restore();
      const xl = a.x0 + (a.x1 - a.x0) * p, yl = a.y1 - (a.y1 - a.y0) * p;
      const oy = clamp(a.oy, a.y0, a.y1), ox = clamp(a.ox, a.x0, a.x1);
      c.beginPath(); c.moveTo(a.x0, oy); c.lineTo(xl, oy); c.moveTo(ox, a.y1); c.lineTo(ox, yl); c.stroke();
      if (p < 1) return;
      c.beginPath(); c.moveTo(a.x1 - 10, oy - 6); c.lineTo(a.x1, oy); c.lineTo(a.x1 - 10, oy + 6); c.moveTo(ox - 6, a.y0 + 10); c.lineTo(ox, a.y0); c.lineTo(ox + 6, a.y0 + 10); c.stroke();
      c.lineWidth = 1.5; c.font = '13px Kalam, cursive'; c.textAlign = 'center'; c.textBaseline = 'top';
      const on = (v, s) => Math.abs(v / s - Math.round(v / s)) < 1e-6;
      for (let k = Math.ceil((a.x0 - a.ox) / ux / SX.tick); a.ox + k * SX.tick * ux <= a.x1 - 14; k++) {
        const v = k * SX.tick; if (Math.abs(v) < 1e-12) continue; const x = a.ox + v * ux; c.beginPath(); c.moveTo(x, oy - 3); c.lineTo(x, oy + 3); c.stroke();
        if (on(v, SX.lab)) { c.globalAlpha = 0.65; c.fillText(fmt(v), x, oy + 6); c.globalAlpha = 0.9; }
      }
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (let k = Math.ceil((a.oy - a.y1) / uy / SY.tick); a.oy - k * SY.tick * uy >= a.y0 + 14; k++) {
        const v = k * SY.tick; if (Math.abs(v) < 1e-12) continue; const y = a.oy - v * uy; c.beginPath(); c.moveTo(ox - 3, y); c.lineTo(ox + 3, y); c.stroke();
        if (on(v, SY.lab)) { c.globalAlpha = 0.65; c.fillText(fmt(v), ox - 7, y); c.globalAlpha = 0.9; }
      }
      c.font = 'italic 18px "Times New Roman", serif'; c.textAlign = 'left'; c.fillText('x', a.x1 + 4, oy + 12); c.fillText('y', ox + 10, a.y0 + 4);
    }
    drawGraph(c, o, p) {
      const a = this.objects.find(x => x.id === o.axes); if (!a || a.hidden) return;
      c.save(); c.beginPath(); c.rect(a.x0, a.y0 - 2, (a.x1 - a.x0) * p, a.y1 - a.y0 + 4); c.clip();
      c.lineWidth = o.dashed ? 2.2 : 3; c.strokeStyle = o.color; if (o.dashed) c.setLineDash([9, 6]);
      if (o.mode === 'explicit' && o.shade && p >= 1) {
        const f = this.compile(o.rhs), sa = Math.min(o.shade.a, o.shade.b), sb = Math.max(o.shade.a, o.shade.b);
        const pa = Math.max(a.x0, a.ox + sa * a.unit), pb = Math.min(a.x1, a.ox + sb * a.unit);
        if (pb > pa) {
          const zy = clamp(a.oy, a.y0, a.y1); c.save(); c.beginPath(); c.moveTo(pa, zy);
          for (let px = pa; px <= pb; px += 1) { const y = f((px - a.ox) / a.unit); c.lineTo(px, clamp(a.oy - (isFinite(y) ? y : 0) * UY(a), a.y0, a.y1)); }
          c.lineTo(pb, zy); c.closePath(); c.globalAlpha *= 0.28; c.fillStyle = o.color; c.fill(); c.restore();
          c.save(); c.setLineDash([3, 4]); c.lineWidth = 1.3; c.beginPath(); [pa, pb].forEach(px => { const y = f((px - a.ox) / a.unit); c.moveTo(px, a.oy); c.lineTo(px, clamp(a.oy - y * UY(a), a.y0, a.y1)); }); c.stroke(); c.restore();
          c.save(); c.font = '16px Kalam, cursive'; c.fillStyle = o.color; c.textAlign = 'center';
          const mid = (pa + pb) / 2, ym = f((mid - a.ox) / a.unit), ty = clamp(a.oy - (isFinite(ym) ? ym : 0) * UY(a) / 2, a.y0 + 16, a.y1 - 8);
          c.fillText('∫ = ' + niceNum(o.shade.value), mid, ty); c.restore();
        }
      }
      if (o.mode === 'explicit') {
        const f = this.compile(o.rhs); c.beginPath();
        let pen = false, prevY = null;
        for (let px = a.x0; px <= a.x1; px += 1) {
          const y = f((px - a.ox) / a.unit), py = a.oy - y * UY(a);
          if (!isFinite(py) || py < a.y0 - 2000 || py > a.y1 + 2000 || (prevY !== null && Math.abs(py - prevY) > (a.y1 - a.y0))) { pen = false; prevY = null; continue; }
          if (!pen) { c.moveTo(px, py); pen = true; } else c.lineTo(px, py);
          prevY = py;
        }
        c.stroke();
      } else {
        const segs = this.implicitSegments(o, a); c.beginPath();
        segs.forEach(([u, v]) => { c.moveTo(u.x, u.y); c.lineTo(v.x, v.y); }); c.stroke();
      }
      c.restore();
    }
    drawPoint(c, o, p) {
      const a = this.objects.find(x => x.id === o.axes); if (!a || a.hidden) return;
      const q = this.toPx(a, o); if (q.x < a.x0 || q.x > a.x1 || q.y < a.y0 || q.y > a.y1) return;
      c.globalAlpha *= p; c.fillStyle = o.hollow ? '#1f3329' : o.color; c.beginPath(); c.arc(q.x, q.y, 5.5, 0, Math.PI * 2); c.fill();
      c.strokeStyle = o.hollow ? o.color : '#23382f'; c.lineWidth = o.hollow ? 2.2 : 1.5; c.stroke();
      if (o.label) { c.font = '15px Kalam, cursive'; c.fillStyle = o.color; c.textAlign = 'left'; c.fillText(o.label, q.x + 9, q.y - 9); }
    }
    drawVec(c, o, p) {
      const a = this.objects.find(x => x.id === o.axes); if (!a || a.hidden) return;
      const A = this.toPx(a, { x: o.x1, y: o.y1 }), B0 = this.toPx(a, { x: o.x2, y: o.y2 });
      const B = { x: A.x + (B0.x - A.x) * p, y: A.y + (B0.y - A.y) * p }, L = dist(A, B);
      c.save(); c.beginPath(); c.rect(a.x0, a.y0, a.x1 - a.x0, a.y1 - a.y0); c.clip();
      c.lineWidth = 2.8; c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke();
      if (L > 2) {
        const ang = Math.atan2(B.y - A.y, B.x - A.x), h = Math.min(13, L * 0.45);
        c.beginPath(); c.moveTo(B.x, B.y); c.lineTo(B.x - h * Math.cos(ang - 0.42), B.y - h * Math.sin(ang - 0.42)); c.lineTo(B.x - h * Math.cos(ang + 0.42), B.y - h * Math.sin(ang + 0.42)); c.closePath(); c.fill();
      }
      if (o.label && p > 0.6) {   // the name beside the middle of the arrow, on its left
        const nx = -(B0.y - A.y) / (dist(A, B0) || 1), ny = (B0.x - A.x) / (dist(A, B0) || 1), mx = (A.x + B0.x) / 2, my = (A.y + B0.y) / 2;
        c.font = 'italic 17px Kalam, cursive'; c.textAlign = 'center'; c.textBaseline = 'middle';
        const tx = mx - nx * 14, ty = my - ny * 14; c.fillText(o.label, tx, ty);
        const w = c.measureText(o.label).width; c.lineWidth = 1.4; c.beginPath(); c.moveTo(tx - w / 2, ty - 11); c.lineTo(tx + w / 2, ty - 11); c.lineTo(tx + w / 2 - 4, ty - 14); c.stroke();
      }
      c.restore();
    }
    drawKeyPoints(c) {
      if (!this.showKeyPoints) return;
      this.graphs().forEach(gr => {
        if (gr.hidden || gr.anim) return;
        const ax = this.objects.find(a => a.id === gr.axes); if (!ax || ax.hidden) return;
        const kps = this.keyPoints(gr, ax), labelled = kps.length <= 6;
        kps.forEach(k => {
          const q = this.toPx(ax, k); c.save(); c.fillStyle = gr.color; c.globalAlpha = 0.9;
          c.beginPath(); c.arc(q.x, q.y, 3.6, 0, Math.PI * 2); c.fill();
          if (labelled) { c.font = '12px Kalam, cursive'; c.globalAlpha = 0.7; c.fillText('(' + niceNum(k.x) + ', ' + niceNum(k.y) + ')', q.x + 6, q.y + (k.kind === 'max' ? -8 : 14)); }
          c.restore();
        });
      });
    }
    isEmpty() { return !this.objects.some(o => !o.hidden) && this.geo.isEmpty(); }

    // =========================================================== geometry tools
    geoChanged() { this.render(); if (this.opts.onGeo) this.opts.onGeo(); }
    cleanupGeo() {
      const used = new Set(); const G = this.geo;
      G.ents.forEach(e => { if (e.type === 'seg') { used.add(e.a); used.add(e.b); } if (e.type === 'circle') used.add(e.c); if (e.type === 'poly') e.pts.forEach(id => used.add(id)); });
      G.cons.forEach(c => c.refs.forEach(r => used.add(r)));
      G.points = G.points.filter(p => used.has(p.id) || p.standalone);
    }
    /** existing point near p, or a new point (attached to the segment / circle it was dropped on) */
    geoPointAt(p, opts = {}) {
      const G = this.geo;
      const hp = G.hitPoint(p, 11); if (hp) return hp;
      const pt = G.addPoint(p.x, p.y, { standalone: opts.standalone });
      if (opts.standalone) pt.standalone = true;
      if (opts.attach !== false) {
        const h = G.hit(p);
        if (h && h.type === 'seg' && !opts.noLine) G.addCons('onLine', [pt.id, h.id]);
        if (h && h.type === 'circle') G.addCons('onCircle', [pt.id, h.id]);
      }
      return pt;
    }
    geoDown(p, e) {
      const G = this.geo, t = this.tool;
      if (t === 'g-select') {
        const h = G.hit(p);
        if (!h) { if (!e.shiftKey) G.sel.clear(); this.geoChanged(); return; }
        if (e.shiftKey || e.ctrlKey || e.metaKey) { G.sel.has(h.id) ? G.sel.delete(h.id) : G.sel.add(h.id); this.geoChanged(); return; }
        if (!G.sel.has(h.id)) { G.sel.clear(); G.sel.add(h.id); }
        this.pushHistory();
        if (h.x !== undefined) { if (G.isFixed(h)) { this.geoChanged(); this.onStatus(global.tr('{name} is fixed — unfix it in the panel to move it', { name: h.name })); return; } G.tmp = { kind: 'drag', id: h.id }; }
        else if (h.type === 'circle' && Math.abs(dist(p, G.P(h.c)) - h.r) < 9) G.tmp = { kind: 'radius', id: h.id };
        else { const ids = h.type === 'seg' ? [h.a, h.b] : h.type === 'circle' ? [h.c] : h.pts; G.tmp = { kind: 'move', ids: ids.filter(id => !G.isFixed(G.P(id))), last: p }; }
        this.geoChanged(); return;
      }
      if (t === 'g-point') { this.pushHistory(); const q = this.geoPointAt(p, { standalone: true }); G.sel.clear(); G.sel.add(q.id); G.solve(); this.geoChanged(); return; }
      if (t === 'g-seg' || t === 'g-circle' || t === 'g-rect' || t === 'g-reg') {
        if (G.tmp && G.tmp.kind === t && G.tmp.start) { this.geoCommit(p); return; }
        G.tmp = { kind: t, start: { x: p.x, y: p.y }, cur: p, down: true };
        const hp = G.hitPoint(p, 11); if (hp && (t === 'g-seg' || t === 'g-circle' || t === 'g-reg')) { G.tmp.start = { x: hp.x, y: hp.y }; G.tmp.startPt = hp; }
        this.geoPreview(); return;
      }
      if (t === 'g-poly') {
        if (!G.tmp || G.tmp.kind !== 'poly') G.tmp = { kind: 'poly', verts: [], cur: p };
        const v = G.tmp.verts, hp = G.hitPoint(p, 11);
        if (v.length >= 3 && dist(p, v[0]) < 14) { this.finishPoly(); return; }
        v.push(hp ? { x: hp.x, y: hp.y, pt: hp } : { x: p.x, y: p.y });
        this.geoPreview(); return;
      }
    }
    geoMove(p) {
      const G = this.geo, T = G.tmp;
      if (!T) { if (this.tool === 'g-select') { this.live.style.cursor = G.hit(p) ? 'grab' : 'default'; } this.geoHover = G.hitPoint(p, 11); this.render(); return; }
      if (T.kind === 'drag') { G.solve({ id: T.id, x: p.x, y: p.y }, 18); this.render(); return; }
      if (T.kind === 'radius') { const ci = G.E(T.id); G.solve({ circle: T.id, r: dist(p, G.P(ci.c)), pin: [ci.c] }, 18); this.render(); return; }
      if (T.kind === 'move') { const dx = p.x - T.last.x, dy = p.y - T.last.y; T.ids.forEach(id => { const q = G.P(id); q.x += dx; q.y += dy; }); T.last = p; G.solve({ pin: T.ids }, 18); this.render(); return; }
      T.cur = p; this.geoPreview();
    }
    geoUp(p) {
      const G = this.geo, T = G.tmp; if (!T) return;
      if (T.kind === 'drag' || T.kind === 'radius' || T.kind === 'move') { G.tmp = null; G.solve(); this.geoChanged(); return; }
      if (T.down && T.start && dist(p, T.start) > 10 && T.kind !== 'poly') { this.geoCommit(p); return; }
      T.down = false;
    }
    geoCommit(p) {
      const G = this.geo, T = G.tmp; G.tmp = null; this.pushHistory();
      const color = this.color === COLORS.chalk ? null : this.color;
      if (T.kind === 'g-seg') {
        const a = T.startPt || this.geoPointAt(T.start), b = this.geoPointAt(p);
        if (a === b) { this.geoChanged(); return; }
        const s = G.addSeg(a.id, b.id, { color }); G.autoHV(s); G.sel.clear(); G.sel.add(s.id);
      }
      if (T.kind === 'g-circle') { const c = T.startPt || this.geoPointAt(T.start); const ci = G.addCircle(c.id, Math.max(8, dist(c, p)), { color }); G.sel.clear(); G.sel.add(ci.id); }
      if (T.kind === 'g-rect') {
        const x0 = Math.min(T.start.x, p.x), x1 = Math.max(T.start.x, p.x), y0 = Math.min(T.start.y, p.y), y1 = Math.max(T.start.y, p.y);
        if (x1 - x0 < 8 || y1 - y0 < 8) { this.geoChanged(); return; }
        const g = G.fromShape('poly', { pts: [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }], rect: true }, color); G.sel.clear(); G.sel.add(g.id);
      }
      if (T.kind === 'g-reg') {
        const n = clamp(this.regularN | 0, 3, 12), c = T.start, r = dist(c, p), a0 = Math.atan2(p.y - c.y, p.x - c.x);
        if (r < 10) { this.geoChanged(); return; }
        const pts = []; for (let i = 0; i < n; i++) pts.push({ x: c.x + r * Math.cos(a0 + 2 * Math.PI * i / n), y: c.y + r * Math.sin(a0 + 2 * Math.PI * i / n) });
        const g = G.fromShape('poly', { pts }, color); G.sel.clear(); G.sel.add(g.id); G.apply({ kind: 'cons', type: 'regular' });
      }
      G.solve(); this.geoChanged();
    }
    finishPoly() {
      const G = this.geo, T = G.tmp; G.tmp = null;
      if (!T || T.verts.length < 3) { this.geoChanged(); return; }
      this.pushHistory();
      const ids = T.verts.map(v => (v.pt ? v.pt : this.geoPointAt(v)).id);
      const g = G.addPoly(ids, { color: this.color === COLORS.chalk ? null : this.color });
      G.polyEdges(g).forEach(e => G.autoHV(e));
      G.sel.clear(); G.sel.add(g.id); G.solve(); this.geoChanged();
    }
    geoPreview() {
      const G = this.geo, T = G.tmp; if (!T) return;
      T.preview = c => {
        c.save(); c.strokeStyle = '#ffe58a'; c.setLineDash([6, 5]); c.lineWidth = 2;
        const cur = T.cur || T.start;
        if (T.kind === 'g-seg') { c.beginPath(); c.moveTo(T.start.x, T.start.y); c.lineTo(cur.x, cur.y); c.stroke(); const L = dist(T.start, cur) / global.GEO_UNIT; c.setLineDash([]); c.fillStyle = '#ffe58a'; c.font = '13px "Source Sans 3"'; c.fillText(global.geoFmt(L), cur.x + 10, cur.y - 10); }
        if (T.kind === 'g-circle') { c.beginPath(); c.arc(T.start.x, T.start.y, dist(T.start, cur), 0, Math.PI * 2); c.stroke(); c.setLineDash([]); c.fillStyle = '#ffe58a'; c.font = '13px "Source Sans 3"'; c.fillText('r = ' + global.geoFmt(dist(T.start, cur) / global.GEO_UNIT), cur.x + 10, cur.y - 10); }
        if (T.kind === 'g-rect') { c.strokeRect(Math.min(T.start.x, cur.x), Math.min(T.start.y, cur.y), Math.abs(cur.x - T.start.x), Math.abs(cur.y - T.start.y)); }
        if (T.kind === 'g-reg') { const n = clamp(this.regularN | 0, 3, 12), r = dist(T.start, cur), a0 = Math.atan2(cur.y - T.start.y, cur.x - T.start.x); c.beginPath(); for (let i = 0; i <= n; i++) { const a = a0 + 2 * Math.PI * i / n; const x = T.start.x + r * Math.cos(a), y = T.start.y + r * Math.sin(a); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
        if (T.kind === 'poly') { c.beginPath(); T.verts.forEach((v, i) => (i ? c.lineTo(v.x, v.y) : c.moveTo(v.x, v.y))); c.lineTo(cur.x, cur.y); c.stroke(); c.setLineDash([]); T.verts.forEach(v => { c.fillStyle = '#ffe58a'; c.beginPath(); c.arc(v.x, v.y, 3.5, 0, Math.PI * 2); c.fill(); }); if (T.verts.length >= 3 && dist(cur, T.verts[0]) < 14) { c.beginPath(); c.arc(T.verts[0].x, T.verts[0].y, 9, 0, Math.PI * 2); c.stroke(); } }
        c.restore();
      };
      this.render();
    }
  }

  // ---------- drawing helpers ----------
  function smoothPath(c, pts) {
    c.beginPath(); if (!pts.length) return;
    c.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; c.quadraticCurveTo(pts[i].x, pts[i].y, mx, my); }
    const l = pts[pts.length - 1]; c.lineTo(l.x, l.y);
  }
  function partialPath(c, pts, p, closed) {
    const P = closed ? pts.concat([pts[0]]) : pts;
    let total = 0; for (let i = 1; i < P.length; i++) total += dist(P[i - 1], P[i]);
    let left = total * p; c.beginPath(); c.moveTo(P[0].x, P[0].y);
    for (let i = 1; i < P.length; i++) {
      const d = dist(P[i - 1], P[i]);
      if (left >= d) { c.lineTo(P[i].x, P[i].y); left -= d; }
      else { const t = d ? left / d : 0; c.lineTo(P[i - 1].x + (P[i].x - P[i - 1].x) * t, P[i - 1].y + (P[i].y - P[i - 1].y) * t); break; }
    }
    if (closed && p >= 1) c.closePath();
  }
  function fitToAscii(fit) {
    const n = v => (+v.toFixed(3)).toString();
    if (fit.kind === 'poly') {
      let s = '';
      for (let k = fit.c.length - 1; k >= 0; k--) {
        const v = fit.c[k]; if (Math.abs(v) < 1e-9) continue;
        const mag = Math.abs(v), sign = v < 0 ? '-' : (s ? '+' : '');
        s += sign + (k > 0 && Math.abs(mag - 1) < 1e-9 ? '' : n(mag)) + (k === 0 ? '' : k === 1 ? 'x' : 'x^' + k);
      }
      return s || '0';
    }
    return fit.tex.replace(/\\sin/g, 'sin').replace(/\\pi/g, 'π').replace(/e\^\{([^}]*)\}/g, 'exp($1)').replace(/[{}]/g, '').replace(/\\/g, '');
  }
  function casesOf(list) {
    return '\\begin{cases}' + list.map(e => { try { return global.MathCore.analyze(e).latex; } catch (er) { return '\\text{' + texEsc(e) + '}'; } }).join(' \\\\ ') + '\\end{cases}';
  }
  function solutionTex(sol) {
    if (sol.status === 'none') return '\\text{no solution}';
    if (sol.status === 'infinite') return '\\text{infinitely many solutions}';
    if (sol.status === 'identity') return '\\text{always true}';
    const s = sol.solutions;
    if (s.length === 1) return sol.vars.map(v => v + '=' + global.MathCore.num(s[0][v])).join(',\\ ');
    return s.map(q => '(' + sol.vars.map(v => global.MathCore.num(q[v])).join(',') + ')').join(',\\ ');
  }
  function escapeHtml(s) { return s.replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch])); }
  function safeTex(t) { try { return global.katex.renderToString(t || '', { throwOnError: false }); } catch (e) { return escapeHtml(t || ''); } }

  global.SmartBoard = SmartBoard;
  global.BOARD_COLORS = COLORS;
  global.BoardUtil = { casesOf, solutionTex, safeTex, PLOT_COLORS };
})(window);
