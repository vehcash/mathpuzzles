/* Snapping for the geometry tools: a circle snaps to the sides of polygons (and loose segments) it is drawn
   or dragged near, from the inside or the outside.
     • Drawing a circle (○ tool): the radius snaps so the circle touches a nearby side, or passes through a corner;
       starting the circle near a triangle's incentre (or the centre of a regular polygon) gives the inscribed circle.
     • Dragging a circle (or its centre): it snaps against one side, or into a corner so it touches two sides.
     • Changing the radius: it snaps to the nearest side.
   When the mouse is released, every side the circle touches gets a Tangent constraint, so the circle keeps
   touching it when the figure is edited later (undo removes it). Snapped sides glow while dragging.
   board.snap (default on, remembered) turns it off; hold Alt to drag without snapping. Must load after js/board.js. */
(function (global) {
  'use strict';
  const SB = global.SmartBoard; if (!SB || SB.prototype._snapPatched) return;
  SB.prototype._snapPatched = true;
  const TOL = 14;                     // px: how close counts as "touching"
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const KEY = 'cp_geo_snap';
  const store = global.Store || { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* */ } } };

  // the sides a circle can touch: polygon edges and loose segments (not hidden helper lines)
  function sides(G, skip) {
    return G.ents.filter(e => e.type === 'seg' && !e.hiddenAux).map(e => ({ e, a: G.P(e.a), b: G.P(e.b) })).filter(s => s.a && s.b && dist(s.a, s.b) > 4 && !(skip && (skip.has(s.e.a) || skip.has(s.e.b))));
  }
  // distance from C to the side's line, the foot's position t along the side (0..1) and the unit normal pointing at C
  function rel(C, s) {
    const vx = s.b.x - s.a.x, vy = s.b.y - s.a.y, L = Math.hypot(vx, vy), t = ((C.x - s.a.x) * vx + (C.y - s.a.y) * vy) / (L * L);
    let nx = -vy / L, ny = vx / L; const sd = (C.x - s.a.x) * nx + (C.y - s.a.y) * ny; if (sd < 0) { nx = -nx; ny = -ny; }
    return { d: Math.abs(sd), t, nx, ny };
  }
  const touches = (C, r, s, tol = 1.5) => { const q = rel(C, s); return q.t > -0.02 && q.t < 1.02 && Math.abs(q.d - r) < tol; };

  // incircle of a triangle / centre and apothem of a regular polygon
  function inscribed(G) {
    const out = [];
    G.ents.filter(e => e.type === 'poly').forEach(g => {
      const P = g.pts.map(id => G.P(id)); if (P.some(p => !p)) return;
      const E = G.polyEdges(g); if (E.length !== P.length) return;
      if (P.length === 3) {
        const [A, B, C] = P, a = dist(B, C), b = dist(A, C), c = dist(A, B), per = a + b + c;
        const I = { x: (a * A.x + b * B.x + c * C.x) / per, y: (a * A.y + b * B.y + c * C.y) / per };
        const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
        out.push({ c: I, r: area / (per / 2), edges: E });
      } else {
        const M = { x: P.reduce((s, p) => s + p.x, 0) / P.length, y: P.reduce((s, p) => s + p.y, 0) / P.length };
        const ds = E.map(e => rel(M, { a: G.P(e.a), b: G.P(e.b) }).d), lo = Math.min(...ds), hi = Math.max(...ds);
        if (lo > 4 && hi - lo < lo * 0.02) out.push({ c: M, r: lo, edges: E });   // every side equally far: it has an incircle
      }
    });
    return out;
  }

  /** best radius for a circle centred at C near radius r: touching a side, or through a point */
  function snapRadius(G, C, r, skipIds) {
    let best = null;
    sides(G).forEach(s => { const q = rel(C, s); if (q.d < 3 || q.t < -0.02 || q.t > 1.02) return; const err = Math.abs(q.d - r); if (err < TOL && (!best || err < best.err)) best = { err, r: q.d, side: s }; });
    G.points.forEach(p => { if (skipIds && skipIds.has(p.id)) return; const d = dist(C, p); if (d < 4) return; const err = Math.abs(d - r); if (err < TOL * 0.8 && (!best || err < best.err)) best = { err, r: d, through: p }; });
    if (!best) return null;
    const edges = best.side ? sides(G).filter(s => touches(C, best.r, s)).map(s => s.e) : [];
    return { r: best.r, edges, through: best.through };
  }

  /** best centre for a circle of radius r near C: against one side, or in a corner touching two */
  function snapCentre(G, C, r, skip) {
    const S = sides(G, skip).map(s => Object.assign(rel(C, s), { s })).filter(q => q.t > -0.15 && q.t < 1.15 && Math.abs(q.d - r) < TOL);
    if (!S.length) return null;
    S.sort((a, b) => Math.abs(a.d - r) - Math.abs(b.d - r));
    // two sides at once: the centre is where the two lines, pushed r towards C, cross
    for (let i = 0; i < S.length; i++) for (let j = i + 1; j < S.length; j++) {
      const A = S[i], B = S[j];
      const a1 = { x: A.s.a.x + A.nx * r, y: A.s.a.y + A.ny * r }, b1 = { x: B.s.a.x + B.nx * r, y: B.s.a.y + B.ny * r };
      const u = { x: A.s.b.x - A.s.a.x, y: A.s.b.y - A.s.a.y }, v = { x: B.s.b.x - B.s.a.x, y: B.s.b.y - B.s.a.y }, den = u.x * v.y - u.y * v.x;
      if (Math.abs(den) < 1e-6 * Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)) continue;
      const t = ((b1.x - a1.x) * v.y - (b1.y - a1.y) * v.x) / den, X = { x: a1.x + t * u.x, y: a1.y + t * u.y };
      if (dist(X, C) < TOL * 1.6) return { c: X, edges: sides(G, skip).filter(s => touches(X, r, s)).map(s => s.e) };
    }
    const q = S[0], X = { x: C.x + q.nx * (r - q.d), y: C.y + q.ny * (r - q.d) };
    return { c: X, edges: sides(G, skip).filter(s => touches(X, r, s)).map(s => s.e) };
  }

  function addTangents(G, ci, edges) {
    edges.forEach(e => { if (!G.cons.some(k => k.type === 'tangent' && k.refs[0] === e.id && k.refs[1] === ci.id)) G.addCons('tangent', [e.id, ci.id]); });
  }

  const P = SB.prototype;
  Object.defineProperty(P, 'snap', {
    get() { if (this._snapOn === undefined) this._snapOn = store.get(KEY) !== '0'; return this._snapOn; },
    set(v) { this._snapOn = !!v; store.set(KEY, v ? '1' : '0'); },
    configurable: true
  });

  const geoDown = P.geoDown;
  P.geoDown = function (p, e) {
    this._alt = !!(e && e.altKey);
    geoDown.call(this, p, e);
    const G = this.geo, T = G.tmp;
    // dragging a whole circle: remember which one
    if (T && T.kind === 'move' && T.ids.length === 1) {
      const ci = G.ents.find(x => x.type === 'circle' && G.sel.has(x.id) && x.c === T.ids[0]);
      if (ci) T.circle = ci.id;
    }
  };
  const geoMove = P.geoMove;
  P.geoMove = function (p) {
    const G = this.geo, T = G.tmp; this._snapShow = null;
    const on = this.snap && !this._alt;
    if (on && T && T.kind === 'g-circle' && T.start) {
      T.snap = null; if (!T.start0) T.start0 = { x: T.start.x, y: T.start.y }; T.start = { x: T.start0.x, y: T.start0.y };
      const inc = !T.startPt && inscribed(G).find(o => dist(o.c, T.start0) < TOL);
      if (inc) { T.snap = { start: inc.c, cur: { x: inc.c.x + inc.r, y: inc.c.y }, edges: inc.edges }; T.start = { x: inc.c.x, y: inc.c.y }; T.cur = T.snap.cur; this._snapShow = { edges: inc.edges }; this.geoPreview(); this.render(); return; }
      const r0 = dist(T.start, p), s = snapRadius(G, T.start, r0, T.startPt ? new Set([T.startPt.id]) : null);
      if (s) {
        const k = s.r / (r0 || 1), cur = { x: T.start.x + (p.x - T.start.x) * k, y: T.start.y + (p.y - T.start.y) * k };
        T.snap = { cur, edges: s.edges, through: s.through }; T.cur = cur; this._snapShow = { edges: s.edges, pt: s.through };
        this.geoPreview(); this.render(); return;
      }
    }
    geoMove.call(this, p);
    if (!on || !T) return;
    if (T.kind === 'drag') {          // dragging a circle's centre point moves the circle
      const ci = G.ents.find(x => x.type === 'circle' && x.c === T.id); T.snapEdges = null;
      const used = G.ents.some(x => (x.type === 'seg' && (x.a === T.id || x.b === T.id)) || (x.type === 'poly' && x.pts.includes(T.id)));
      if (ci && !used) {
        const s = snapCentre(G, G.P(T.id), ci.r, new Set([T.id]));
        if (s) { G.solve({ id: T.id, x: s.c.x, y: s.c.y }, 18); T.snapEdges = s.edges; T.snapCircle = ci.id; this._snapShow = { edges: s.edges }; this.render(); }
      }
    } else if (T.kind === 'move' && T.circle) {
      const ci = G.E(T.circle), C = G.P(ci.c); T.snapEdges = null;
      const s = snapCentre(G, C, ci.r, new Set([ci.c]));
      if (s) { C.x = s.c.x; C.y = s.c.y; G.solve({ pin: [ci.c] }, 12); T.snapEdges = s.edges; this._snapShow = { edges: s.edges }; this.render(); }
    } else if (T.kind === 'radius') {
      const ci = G.E(T.id), C = G.P(ci.c); T.snapEdges = null;
      const s = snapRadius(G, C, ci.r, new Set([ci.c]));
      if (s && s.edges.length) { G.solve({ circle: T.id, r: s.r, pin: [ci.c] }, 18); T.snapEdges = s.edges; this._snapShow = { edges: s.edges }; this.render(); }
    }
  };
  const geoUp = P.geoUp;
  P.geoUp = function (p) {
    const G = this.geo, T = G.tmp;
    const ci = T && (T.kind === 'move' ? T.circle && G.E(T.circle) : T.kind === 'radius' ? G.E(T.id) : T.kind === 'drag' ? T.snapCircle && G.E(T.snapCircle) : null), edges = T && T.snapEdges;
    if (T && T.kind === 'g-circle' && T.snap) p = T.snap.cur;
    geoUp.call(this, p);
    this._snapShow = null;
    if (ci && edges && edges.length) { addTangents(G, ci, edges); G.solve(); this.geoChanged(); this.onStatus(global.tr ? global.tr('Snapped: tangent') : 'Snapped: tangent'); }
    this.render();
  };
  const geoCommit = P.geoCommit;
  P.geoCommit = function (p) {
    const G = this.geo, T = G.tmp, snap = T && T.kind === 'g-circle' && T.snap;
    if (snap) { p = snap.cur; if (snap.start) T.start = snap.start; }
    geoCommit.call(this, p);
    this._snapShow = null;
    if (snap) {
      const ci = G.ents.find(x => x.type === 'circle' && G.sel.has(x.id));
      if (ci) {
        if (snap.edges && snap.edges.length) addTangents(G, ci, snap.edges);
        if (snap.through) G.addCons('onCircle', [snap.through.id, ci.id]);
        G.solve(); this.geoChanged();
      }
    }
  };
  // snapped sides glow while dragging
  const drawLive = P.drawLive;
  P.drawLive = function () {
    drawLive.call(this);
    const s = this._snapShow; if (!s) return;
    const c = this.lctx, G = this.geo; c.save(); c.strokeStyle = '#7ee0c3'; c.lineWidth = 7; c.globalAlpha = 0.45; c.lineCap = 'round';
    (s.edges || []).forEach(e => { const a = G.P(e.a), b = G.P(e.b); if (!a || !b) return; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); });
    if (s.pt) { c.globalAlpha = 0.8; c.lineWidth = 2.5; c.beginPath(); c.arc(s.pt.x, s.pt.y, 9, 0, Math.PI * 2); c.stroke(); }
    c.restore();
  };
  global.GeoSnap = { snapRadius, snapCentre, inscribed };
})(window);
