/* GeoModel — a small constraint-based geometry editor living on the blackboard.
   Points (x, y in board px), segments, circles (centre point + radius), polygons (point loops).
   Constraints are residual functions; a damped Gauss–Newton (Levenberg–Marquardt) solver keeps them true
   while you drag. 1 unit = UNIT px (lengths are entered and shown in units). */
(function (global) {
  'use strict';
  const UNIT = 40;
  const DEG = Math.PI / 180;
  const W_HARD = 60, W_DRAG = 1, W_STAY = 0.02;
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const fmt = v => { const r = Math.round(v * 100) / 100; return (Math.abs(r) < 1e-9 ? 0 : r).toString(); };
  function segDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy;
    const t = L2 ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2)) : 0;
    return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
  }
  const CONSTRAINTS = {
    length: { label: 'Length', needs: 'S', val: 'length', glyph: '' },
    horizontal: { label: 'Horizontal', needs: 'S', glyph: 'H' },
    vertical: { label: 'Vertical', needs: 'S', glyph: 'V' },
    perpendicular: { label: 'Perpendicular', needs: 'SS', glyph: '⊥' },
    parallel: { label: 'Parallel', needs: 'SS', glyph: '∥' },
    equal: { label: 'Equal length', needs: 'SS', glyph: '=' },
    angle: { label: 'Angle', needs: 'SS', val: 'angle', glyph: '∠' },
    radius: { label: 'Radius', needs: 'C', val: 'length', glyph: 'r' },
    equalRadius: { label: 'Equal radii', needs: 'CC', glyph: '=' },
    tangent: { label: 'Tangent', needs: 'SC', glyph: 'T' },
    onLine: { label: 'Point on line', needs: 'PS', glyph: '·' },
    midpoint: { label: 'Midpoint', needs: 'PS', glyph: 'M' },
    onCircle: { label: 'Point on circle', needs: 'PC', glyph: '·' },
    distance: { label: 'Distance', needs: 'PP', val: 'length', glyph: '' },
    fix: { label: 'Fix in place', needs: 'P', glyph: '🔒' }
  };

  class GeoModel {
    constructor(board) {
      this.board = board;
      this.points = []; this.ents = []; this.cons = [];
      this.sel = new Set(); this.nid = 1;
      this.showMeasures = true; this.showAngles = true;
      this.tmp = null; // in-progress tool state
    }
    // ---------- serialisation (undo) ----------
    toJSON() { return { points: this.points, ents: this.ents, cons: this.cons, nid: this.nid }; }
    load(d) { this.points = d ? JSON.parse(JSON.stringify(d.points)) : []; this.ents = d ? JSON.parse(JSON.stringify(d.ents)) : []; this.cons = d ? JSON.parse(JSON.stringify(d.cons)) : []; this.nid = d ? d.nid : 1; this.sel.clear(); this.tmp = null; }
    clear() { this.load(null); }
    isEmpty() { return !this.points.length; }

    // ---------- lookup ----------
    P(id) { return this.points.find(p => p.id === id); }
    E(id) { return this.ents.find(e => e.id === id); }
    nextName() {
      const used = new Set(this.points.map(p => p.name));
      for (let k = 0; k < 10; k++) for (let i = 0; i < 26; i++) { const n = String.fromCharCode(65 + i) + (k ? k : ''); if (!used.has(n)) return n; }
      return 'P' + this.nid;
    }
    addPoint(x, y, opts = {}) {
      const p = { id: this.nid++, x, y, name: opts.name || this.nextName(), fixed: !!opts.fixed, hidden: !!opts.hidden, color: opts.color };
      this.points.push(p); return p;
    }
    addSeg(a, b, opts = {}) {
      const ex = this.ents.find(e => e.type === 'seg' && ((e.a === a && e.b === b) || (e.a === b && e.b === a)));
      if (ex) { if (opts.poly) ex.poly = opts.poly; return ex; }
      const s = { id: this.nid++, type: 'seg', a, b, aux: !!opts.aux, poly: opts.poly || null, color: opts.color }; this.ents.push(s); return s;
    }
    addCircle(c, r, opts = {}) { const e = { id: this.nid++, type: 'circle', c, r, color: opts.color }; this.ents.push(e); return e; }
    addPoly(ids, opts = {}) {
      const g = { id: this.nid++, type: 'poly', pts: ids.slice(), color: opts.color }; this.ents.push(g);
      ids.forEach((id, i) => this.addSeg(id, ids[(i + 1) % ids.length], { poly: g.id, color: opts.color }));
      return g;
    }
    addCons(type, refs, val) {
      const c = { id: this.nid++, type, refs, val }; this.cons.push(c); return c;
    }
    polyEdges(g) { return g.pts.map((id, i) => this.ents.find(e => e.type === 'seg' && ((e.a === id && e.b === g.pts[(i + 1) % g.pts.length]) || (e.b === id && e.a === g.pts[(i + 1) % g.pts.length])))).filter(Boolean); }
    removeIds(ids) {
      const gone = new Set(ids);
      // removing a point removes everything that uses it
      let changed = true;
      while (changed) {
        changed = false;
        this.ents.forEach(e => {
          if (gone.has(e.id)) return;
          const uses = e.type === 'seg' ? [e.a, e.b] : e.type === 'circle' ? [e.c] : e.pts;
          if (uses.some(u => gone.has(u)) || (e.type === 'seg' && e.poly && gone.has(e.poly))) { gone.add(e.id); changed = true; }
        });
      }
      this.ents.filter(e => e.type === 'poly' && gone.has(e.id)).forEach(g => this.ents.filter(s => s.poly === g.id).forEach(s => { s.poly = null; gone.add(s.id); }));
      this.points = this.points.filter(p => !gone.has(p.id));
      this.ents = this.ents.filter(e => !gone.has(e.id));
      this.cons = this.cons.filter(c => !c.refs.some(r => gone.has(r)));
      // orphan points (not used by anything and auto-created) stay; they are real points
      this.sel.forEach(id => { if (gone.has(id)) this.sel.delete(id); });
    }

    // ---------- residuals ----------
    residuals(c) {
      const P = id => this.P(id), E = id => this.E(id);
      const seg = id => { const s = E(id); return [P(s.a), P(s.b)]; };
      const vec = id => { const [a, b] = seg(id); return { x: b.x - a.x, y: b.y - a.y }; };
      const len = v => Math.hypot(v.x, v.y) || 1e-9;
      switch (c.type) {
        case 'length': { const [a, b] = seg(c.refs[0]); return [dist(a, b) - c.val * UNIT]; }
        case 'distance': { return [dist(P(c.refs[0]), P(c.refs[1])) - c.val * UNIT]; }
        case 'horizontal': { const [a, b] = seg(c.refs[0]); return [a.y - b.y]; }
        case 'vertical': { const [a, b] = seg(c.refs[0]); return [a.x - b.x]; }
        case 'perpendicular': { const u = vec(c.refs[0]), v = vec(c.refs[1]); return [100 * (u.x * v.x + u.y * v.y) / (len(u) * len(v))]; }
        case 'parallel': { const u = vec(c.refs[0]), v = vec(c.refs[1]); return [100 * (u.x * v.y - u.y * v.x) / (len(u) * len(v))]; }
        case 'equal': { return [len(vec(c.refs[0])) - len(vec(c.refs[1]))]; }
        case 'angle': {
          const [A, V, B] = this.angleTriple(c.refs[0], c.refs[1]);
          const u = { x: A.x - V.x, y: A.y - V.y }, v = { x: B.x - V.x, y: B.y - V.y };
          const ang = Math.atan2(Math.abs(u.x * v.y - u.y * v.x), u.x * v.x + u.y * v.y);
          return [100 * (ang - c.val * DEG)];
        }
        case 'radius': return [E(c.refs[0]).r - c.val * UNIT];
        case 'equalRadius': return [E(c.refs[0]).r - E(c.refs[1]).r];
        case 'tangent': { const [a, b] = seg(c.refs[0]), ci = E(c.refs[1]), C = P(ci.c), v = { x: b.x - a.x, y: b.y - a.y }; return [Math.abs(v.x * (C.y - a.y) - v.y * (C.x - a.x)) / len(v) - ci.r]; }
        case 'onLine': { const p = P(c.refs[0]), [a, b] = seg(c.refs[1]), v = { x: b.x - a.x, y: b.y - a.y }; return [(v.x * (p.y - a.y) - v.y * (p.x - a.x)) / len(v)]; }
        case 'midpoint': { const p = P(c.refs[0]), [a, b] = seg(c.refs[1]); return [p.x - (a.x + b.x) / 2, p.y - (a.y + b.y) / 2]; }
        case 'onCircle': { const p = P(c.refs[0]), ci = E(c.refs[1]); return [dist(p, P(ci.c)) - ci.r]; }
        case 'fix': return [];
      }
      return [];
    }
    /** for an angle between two segments: if they share an endpoint use it as vertex */
    angleTriple(s1, s2) {
      const a = this.E(s1), b = this.E(s2);
      const shared = [a.a, a.b].find(x => x === b.a || x === b.b);
      if (shared) { const A = this.P(a.a === shared ? a.b : a.a), V = this.P(shared), B = this.P(b.a === shared ? b.b : b.a); return [A, V, B]; }
      const A = this.P(a.a), V0 = this.P(a.b), B0 = this.P(b.a), B1 = this.P(b.b);
      return [A, V0, { x: V0.x + (B1.x - B0.x), y: V0.y + (B1.y - B0.y) }];
    }
    isFixed(p) { return p.fixed || this.cons.some(c => c.type === 'fix' && c.refs[0] === p.id); }

    // ---------- solver ----------
    /** drag: {id, x, y} soft target for one point; or {circle:id, r} */
    solve(drag, iters = 40) {
      const vars = []; // {get,set}
      this.points.forEach(p => { if (this.isFixed(p) || (drag && drag.pin && drag.pin.includes(p.id))) return; vars.push({ o: p, k: 'x' }, { o: p, k: 'y' }); });
      this.ents.forEach(e => { if (e.type === 'circle' && !(drag && drag.pinR === e.id)) vars.push({ o: e, k: 'r' }); });
      if (!vars.length) return { ok: true };
      const x0 = vars.map(v => v.o[v.k]);
      const cons = this.cons.filter(c => c.type !== 'fix');
      const F = () => {
        const r = [];
        cons.forEach(c => { let res; try { res = this.residuals(c); } catch (e) { res = []; } res.forEach(v => r.push(W_HARD * (isFinite(v) ? v : 0))); });
        if (drag && drag.id) { const p = this.P(drag.id); r.push(W_DRAG * 4 * (p.x - drag.x), W_DRAG * 4 * (p.y - drag.y)); }
        if (drag && drag.circle) { const e = this.E(drag.circle); r.push(W_DRAG * 4 * (e.r - drag.r)); }
        vars.forEach((v, i) => r.push(W_STAY * (v.o[v.k] - x0[i])));
        return r;
      };
      const set = x => vars.forEach((v, i) => { v.o[v.k] = x[i]; });
      let x = x0.slice(), f = F(), cost = f.reduce((s, v) => s + v * v, 0), lambda = 1e-3;
      const n = vars.length;
      for (let it = 0; it < iters; it++) {
        if (cost < 1e-10) break;
        const J = [];
        for (let j = 0; j < n; j++) { const h = 1e-4; const old = x[j]; x[j] = old + h; set(x); const fp = F(); x[j] = old; J.push(fp.map((v, i) => (v - f[i]) / h)); }
        set(x);
        // normal equations (JᵀJ + λ diag) δ = −Jᵀf
        const A = []; const g = [];
        for (let a = 0; a < n; a++) { A.push(new Array(n)); let s = 0; for (let i = 0; i < f.length; i++) s += J[a][i] * f[i]; g.push(-s); for (let b = 0; b <= a; b++) { let t = 0; for (let i = 0; i < f.length; i++) t += J[a][i] * J[b][i]; A[a][b] = t; } }
        for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) A[a][b] = A[b][a];
        let improved = false;
        for (let tries = 0; tries < 8; tries++) {
          const M = A.map((r, i) => r.map((v, j) => v + (i === j ? lambda * (1 + v) : 0)));
          const d = cholSolve(M, g); if (!d) { lambda *= 10; continue; }
          const xn = x.map((v, i) => v + d[i]); set(xn); const fn = F(), cn = fn.reduce((s, v) => s + v * v, 0);
          if (cn < cost) { x = xn; f = fn; cost = cn; lambda = Math.max(lambda / 4, 1e-7); improved = true; break; }
          set(x); lambda *= 6;
        }
        if (!improved) break;
      }
      set(x);
      return { ok: this.conflicts().length === 0 };
    }
    conflicts() { return this.cons.filter(c => c.type !== 'fix' && this.residuals(c).some(v => Math.abs(v) > 0.6)); }
    freedom() {
      // rank of the constraint Jacobian → remaining degrees of freedom
      const vars = []; this.points.forEach(p => { if (!this.isFixed(p)) vars.push({ o: p, k: 'x' }, { o: p, k: 'y' }); });
      this.ents.forEach(e => { if (e.type === 'circle') vars.push({ o: e, k: 'r' }); });
      const cons = this.cons.filter(c => c.type !== 'fix');
      const R = () => cons.flatMap(c => this.residuals(c));
      const f0 = R(); if (!f0.length) return vars.length;
      const J = vars.map(v => { const old = v.o[v.k]; v.o[v.k] = old + 1e-4; const f = R(); v.o[v.k] = old; return f.map((y, i) => (y - f0[i]) / 1e-4); });
      // rank via elimination on J (vars × rows)
      const M = f0.map((_, i) => J.map(col => col[i]));
      let rank = 0; const rows = M.length, cols = vars.length;
      for (let c = 0; c < cols && rank < rows; c++) {
        let p = -1, best = 1e-6; for (let r = rank; r < rows; r++) if (Math.abs(M[r][c]) > best) { best = Math.abs(M[r][c]); p = r; }
        if (p < 0) continue; [M[rank], M[p]] = [M[p], M[rank]];
        for (let r = 0; r < rows; r++) if (r !== rank) { const f = M[r][c] / M[rank][c]; for (let k = c; k < cols; k++) M[r][k] -= f * M[rank][k]; }
        rank++;
      }
      return vars.length - rank;
    }

    // ---------- hit testing ----------
    hitPoint(p, r = 10) { let best = null, bd = r; this.points.forEach(q => { if (q.hidden) return; const d = dist(p, q); if (d < bd) { bd = d; best = q; } }); return best; }
    hit(p) {
      const pt = this.hitPoint(p); if (pt) return pt;
      let best = null, bd = 8;
      this.ents.forEach(e => {
        let d = Infinity;
        if (e.type === 'seg') d = segDist(p, this.P(e.a), this.P(e.b));
        if (e.type === 'circle') d = Math.abs(dist(p, this.P(e.c)) - e.r);
        if (d < bd) { bd = d; best = e; }
      });
      if (best) return best;
      // polygon interior
      for (let i = this.ents.length - 1; i >= 0; i--) { const e = this.ents[i]; if (e.type === 'poly' && inPoly(p, e.pts.map(id => this.P(id)))) return e; }
      return null;
    }
    selection() { const s = { P: [], S: [], C: [], G: [] }; this.sel.forEach(id => { const p = this.P(id); if (p) { s.P.push(p); return; } const e = this.E(id); if (!e) return; if (e.type === 'seg') s.S.push(e); else if (e.type === 'circle') s.C.push(e); else if (e.type === 'poly') s.G.push(e); }); return s; }

    // ---------- measurements ----------
    segLen(s) { return dist(this.P(s.a), this.P(s.b)) / UNIT; }
    angleAt(A, V, B) { const u = { x: A.x - V.x, y: A.y - V.y }, v = { x: B.x - V.x, y: B.y - V.y }; return Math.atan2(Math.abs(u.x * v.y - u.y * v.x), u.x * v.x + u.y * v.y) / DEG; }
    polyInfo(g) {
      const P = g.pts.map(id => this.P(id)), n = P.length;
      let area = 0; for (let i = 0; i < n; i++) area += P[i].x * P[(i + 1) % n].y - P[(i + 1) % n].x * P[i].y;
      const sides = P.map((p, i) => ({ name: p.name + P[(i + 1) % n].name, len: dist(p, P[(i + 1) % n]) / UNIT }));
      const angles = P.map((p, i) => ({ name: p.name, deg: this.angleAt(P[(i + n - 1) % n], p, P[(i + 1) % n]) }));
      return { area: Math.abs(area) / 2 / (UNIT * UNIT), perimeter: sides.reduce((s, x) => s + x.len, 0), sides, angles, P };
    }
    info() {
      const s = this.selection(), out = [];
      s.S.forEach(e => { const a = this.P(e.a), b = this.P(e.b); out.push(['Length ' + a.name + b.name, fmt(this.segLen(e))]); });
      if (s.S.length === 2) { const [A, V, B] = this.angleTriple(s.S[0].id, s.S[1].id); out.push(['Angle between', fmt(this.angleAt(A, V, B)) + '°']); }
      s.C.forEach(e => { const r = e.r / UNIT; out.push(['Radius', fmt(r)], ['Diameter', fmt(2 * r)], ['Circumference', fmt(2 * Math.PI * r)], ['Area', fmt(Math.PI * r * r)]); });
      s.G.forEach(g => {
        const i = this.polyInfo(g);
        i.sides.forEach(x => out.push([x.name, fmt(x.len)]));
        i.angles.forEach(x => out.push(['∠' + x.name, fmt(x.deg) + '°']));
        out.push(['Perimeter', fmt(i.perimeter)], ['Area', fmt(i.area)]);
        if (i.P.length === 3) { const s2 = i.sides.map(x => x.len); const sp = i.perimeter / 2; out.push(['Inradius', fmt(i.area / sp)], ['Circumradius', fmt(s2[0] * s2[1] * s2[2] / (4 * i.area))]); }
      });
      if (s.P.length === 2) out.push(['Distance ' + s.P[0].name + s.P[1].name, fmt(dist(s.P[0], s.P[1]) / UNIT)]);
      if (s.P.length === 3) out.push(['∠' + s.P[0].name + s.P[1].name + s.P[2].name, fmt(this.angleAt(s.P[0], s.P[1], s.P[2])) + '°']);
      return out;
    }
    /** which constraints / constructions make sense for the current selection */
    options() {
      const s = this.selection(), sig = 'P'.repeat(s.P.length) + 'S'.repeat(s.S.length) + 'C'.repeat(s.C.length);
      const opts = [];
      Object.entries(CONSTRAINTS).forEach(([k, d]) => { if (d.needs === sig) opts.push({ kind: 'cons', type: k, label: d.label, val: d.val }); });
      if (s.P.length === 1 && !s.S.length && !s.C.length && !s.G.length) { const p = s.P[0]; if (this.isFixed(p)) { opts.splice(0, opts.length); opts.push({ kind: 'act', type: 'unfix', label: 'Unfix' }); } }
      if (sig === 'S') opts.push({ kind: 'build', type: 'midpointOf', label: 'Add midpoint' }, { kind: 'build', type: 'perpBisector', label: 'Perpendicular bisector' });
      if (sig === 'PS') opts.push({ kind: 'build', type: 'foot', label: 'Drop perpendicular' });
      if (sig === 'PP') opts.push({ kind: 'build', type: 'join', label: 'Join with segment' });
      if (sig === 'PPP') opts.push({ kind: 'build', type: 'triangleOf', label: 'Make triangle' }, { kind: 'build', type: 'circleThrough', label: 'Circle through 3 points' }, { kind: 'cons', type: 'angle3', label: 'Angle', val: 'angle' });
      if (s.G.length === 1 && !s.P.length && !s.S.length && !s.C.length) {
        const n = s.G[0].pts.length;
        if (n === 3) opts.push({ kind: 'build', type: 'incircle', label: 'Inscribed circle' }, { kind: 'build', type: 'circumcircle', label: 'Circumscribed circle' }, { kind: 'build', type: 'altitudes', label: 'Altitudes' }, { kind: 'build', type: 'medians', label: 'Medians' }, { kind: 'cons', type: 'rightAngle', label: 'Right angle at…', val: 'vertex' });
        opts.push({ kind: 'cons', type: 'regular', label: 'Make regular' });
      }
      return opts;
    }
    /** apply a constraint/construction from the panel */
    apply(opt, value) {
      const s = this.selection();
      const add = (type, refs, val) => this.addCons(type, refs, val);
      if (opt.kind === 'act' && opt.type === 'unfix') { const p = s.P[0]; p.fixed = false; this.cons = this.cons.filter(c => !(c.type === 'fix' && c.refs[0] === p.id)); return; }
      if (opt.kind === 'cons') {
        switch (opt.type) {
          case 'length': add('length', [s.S[0].id], value); break;
          case 'distance': { const seg = this.addSeg(s.P[0].id, s.P[1].id, { aux: true }); add('length', [seg.id], value); break; }
          case 'radius': add('radius', [s.C[0].id], value); break;
          case 'angle': add('angle', [s.S[0].id, s.S[1].id], value); break;
          case 'angle3': { const a = this.addSeg(s.P[1].id, s.P[0].id, { aux: true }), b = this.addSeg(s.P[1].id, s.P[2].id, { aux: true }); add('angle', [a.id, b.id], value); break; }
          case 'fix': add('fix', [s.P[0].id]); break;
          case 'rightAngle': { const g = s.G[0], i = g.pts.indexOf(this.points.find(p => p.name === String(value).trim().toUpperCase())?.id); if (i < 0) throw new Error('Type a vertex name, e.g. ' + this.P(g.pts[0]).name); const E = this.polyEdges(g); add('perpendicular', [E[(i + E.length - 1) % E.length].id, E[i].id]); break; }
          case 'regular': { const g = s.G[0], E = this.polyEdges(g); for (let i = 1; i < E.length; i++) add('equal', [E[0].id, E[i].id]); if (E.length > 3) for (let i = 0; i < E.length - 1; i++) { /* equal angles via equal diagonals of consecutive triples */ const a = g.pts[i], c = g.pts[(i + 2) % g.pts.length]; const d = this.addSeg(a, c, { aux: true }); d.hiddenAux = true; if (i) add('equal', [this._firstDiag.id, d.id]); else this._firstDiag = d; } break; }
          case 'onLine': add('onLine', [s.P[0].id, s.S[0].id]); break;
          case 'midpoint': add('midpoint', [s.P[0].id, s.S[0].id]); break;
          case 'onCircle': add('onCircle', [s.P[0].id, s.C[0].id]); break;
          case 'tangent': add('tangent', [s.S[0].id, s.C[0].id]); break;
          default: add(opt.type, [...s.S, ...s.C].map(e => e.id).concat(s.P.map(p => p.id)), value);
        }
      }
      if (opt.kind === 'build') this.construct(opt.type, s);
      this.solve();
    }
    construct(type, s) {
      const pts = id => this.P(id);
      if (type === 'midpointOf') { const e = s.S[0], a = pts(e.a), b = pts(e.b); const m = this.addPoint((a.x + b.x) / 2, (a.y + b.y) / 2); this.addCons('midpoint', [m.id, e.id]); }
      if (type === 'perpBisector') { const e = s.S[0], a = pts(e.a), b = pts(e.b); const m = this.addPoint((a.x + b.x) / 2, (a.y + b.y) / 2); this.addCons('midpoint', [m.id, e.id]); const L = dist(a, b) * 0.6, nx = -(b.y - a.y) / dist(a, b), ny = (b.x - a.x) / dist(a, b); const q = this.addPoint(m.x + nx * L, m.y + ny * L); const sg = this.addSeg(m.id, q.id, { aux: true }); this.addCons('perpendicular', [sg.id, e.id]); }
      if (type === 'foot') { const p = s.P[0], e = s.S[0], a = pts(e.a), b = pts(e.b); const dx = b.x - a.x, dy = b.y - a.y, t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy); const f = this.addPoint(a.x + t * dx, a.y + t * dy); this.addCons('onLine', [f.id, e.id]); const h = this.addSeg(p.id, f.id, { aux: true }); this.addCons('perpendicular', [h.id, e.id]); }
      if (type === 'join') this.addSeg(s.P[0].id, s.P[1].id);
      if (type === 'triangleOf') this.addPoly(s.P.map(p => p.id));
      if (type === 'circleThrough' || type === 'circumcircle') {
        const P = type === 'circumcircle' ? s.G[0].pts.map(pts) : s.P; const [A, B, C] = P;
        const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)); if (Math.abs(d) < 1e-6) throw new Error('The points are on one line');
        const ux = ((A.x ** 2 + A.y ** 2) * (B.y - C.y) + (B.x ** 2 + B.y ** 2) * (C.y - A.y) + (C.x ** 2 + C.y ** 2) * (A.y - B.y)) / d;
        const uy = ((A.x ** 2 + A.y ** 2) * (C.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - C.x) + (C.x ** 2 + C.y ** 2) * (B.x - A.x)) / d;
        const O = this.addPoint(ux, uy, { name: type === 'circumcircle' ? 'O' + (this.points.some(p => p.name === 'O') ? this.nid : '') : undefined });
        const ci = this.addCircle(O.id, dist(O, A)); P.forEach(p => this.addCons('onCircle', [p.id, ci.id]));
      }
      if (type === 'incircle') {
        const g = s.G[0], [A, B, C] = g.pts.map(pts), a = dist(B, C), b = dist(A, C), c = dist(A, B), p = a + b + c;
        const I = this.addPoint((a * A.x + b * B.x + c * C.x) / p, (a * A.y + b * B.y + c * C.y) / p, { name: this.points.some(q => q.name === 'I') ? undefined : 'I' });
        const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
        const ci = this.addCircle(I.id, area / (p / 2));
        this.polyEdges(g).forEach(e => this.addCons('tangent', [e.id, ci.id]));
      }
      if (type === 'altitudes' || type === 'medians') {
        const g = s.G[0], E = this.polyEdges(g);
        g.pts.forEach((vid, i) => {
          const V = pts(vid), opp = E[(i + 1) % 3], a = pts(opp.a), b = pts(opp.b);
          if (type === 'medians') { const m = this.addPoint((a.x + b.x) / 2, (a.y + b.y) / 2); this.addCons('midpoint', [m.id, opp.id]); this.addSeg(vid, m.id, { aux: true }); }
          else { const dx = b.x - a.x, dy = b.y - a.y, t = ((V.x - a.x) * dx + (V.y - a.y) * dy) / (dx * dx + dy * dy); const f = this.addPoint(a.x + t * dx, a.y + t * dy); this.addCons('onLine', [f.id, opp.id]); const h = this.addSeg(vid, f.id, { aux: true }); this.addCons('perpendicular', [h.id, opp.id]); }
        });
      }
    }

    // ---------- creation from recognised strokes ----------
    fromShape(kind, data, color) {
      const mk = p => { const h = this.hitPoint(p, 14); return h ? h : this.addPoint(p.x, p.y); };
      if (kind === 'line') { const a = mk(data.a), b = mk(data.b); const s = this.addSeg(a.id, b.id, { color }); this.autoHV(s); return s; }
      if (kind === 'circle') { const c = mk(data.c); return this.addCircle(c.id, data.r, { color }); }
      if (kind === 'poly') {
        const ids = data.pts.map(mk).map(p => p.id); const g = this.addPoly(ids, { color });
        if (!data.rect) this.polyEdges(g).forEach(e => this.autoHV(e));
        if (data.rect) { const E = this.polyEdges(g); E.forEach(e => this.autoHV(e)); if (!E.some(e => this.cons.some(c => (c.type === 'horizontal' || c.type === 'vertical') && c.refs[0] === e.id))) { this.addCons('perpendicular', [E[0].id, E[1].id]); this.addCons('perpendicular', [E[1].id, E[2].id]); this.addCons('perpendicular', [E[2].id, E[3].id]); } }
        return g;
      }
    }
    autoHV(s, tolDeg = 4) {
      const a = this.P(s.a), b = this.P(s.b), ang = Math.abs(Math.atan2(b.y - a.y, b.x - a.x)) / DEG;
      if (ang < tolDeg || ang > 180 - tolDeg) { this.addCons('horizontal', [s.id]); b.y = a.y = (a.y + b.y) / 2; }
      else if (Math.abs(ang - 90) < tolDeg) { this.addCons('vertical', [s.id]); b.x = a.x = (a.x + b.x) / 2; }
    }

    // ---------- drawing ----------
    draw(c, now) {
      const conflicts = new Set(this.conflicts().map(k => k.id));
      const isSel = id => this.sel.has(id);
      // polygon fills
      this.ents.forEach(e => {
        if (e.type !== 'poly') return;
        c.save(); c.beginPath(); e.pts.forEach((id, i) => { const p = this.P(id); if (i) c.lineTo(p.x, p.y); else c.moveTo(p.x, p.y); }); c.closePath();
        c.fillStyle = isSel(e.id) ? 'rgba(243,211,107,.16)' : 'rgba(244,241,232,.035)'; c.fill(); c.restore();
      });
      this.ents.forEach(e => {
        c.save(); c.lineCap = 'round'; c.strokeStyle = isSel(e.id) ? '#f3d36b' : (e.color || '#f4f1e8'); c.lineWidth = isSel(e.id) ? 3.6 : 2.6;
        if (e.type === 'seg') {
          if (e.hiddenAux) { c.restore(); return; }
          const a = this.P(e.a), b = this.P(e.b);
          if (e.aux) { c.setLineDash([6, 6]); c.lineWidth = isSel(e.id) ? 2.6 : 1.6; c.globalAlpha = 0.8; }
          c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
        }
        if (e.type === 'circle') { const C = this.P(e.c); c.beginPath(); c.arc(C.x, C.y, Math.max(1, e.r), 0, Math.PI * 2); c.stroke(); }
        c.restore();
      });
      // angle arcs at polygon vertices
      if (this.showAngles) this.ents.forEach(e => {
        if (e.type !== 'poly') return;
        const n = e.pts.length;
        e.pts.forEach((id, i) => {
          const V = this.P(id), A = this.P(e.pts[(i + n - 1) % n]), B = this.P(e.pts[(i + 1) % n]);
          const deg = this.angleAt(A, V, B), a1 = Math.atan2(A.y - V.y, A.x - V.x), a2 = Math.atan2(B.y - V.y, B.x - V.x);
          c.save(); c.strokeStyle = 'rgba(147,211,245,.8)'; c.lineWidth = 1.4;
          if (Math.abs(deg - 90) < 0.5) { const r = 11, u = { x: Math.cos(a1), y: Math.sin(a1) }, v = { x: Math.cos(a2), y: Math.sin(a2) }; c.beginPath(); c.moveTo(V.x + u.x * r, V.y + u.y * r); c.lineTo(V.x + (u.x + v.x) * r, V.y + (u.y + v.y) * r); c.lineTo(V.x + v.x * r, V.y + v.y * r); c.stroke(); }
          else { let s = a1, t = a2; let d = t - s; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; c.beginPath(); c.arc(V.x, V.y, 16, s, s + d, d < 0); c.stroke(); }
          if (this.showMeasures) {
            const mid = Math.atan2(Math.sin(a1) + Math.sin(a2), Math.cos(a1) + Math.cos(a2));
            c.font = '12px "Source Sans 3", sans-serif'; c.fillStyle = 'rgba(147,211,245,.95)'; c.textAlign = 'center'; c.textBaseline = 'middle';
            c.fillText(fmt(deg) + '°', V.x + Math.cos(mid) * 32, V.y + Math.sin(mid) * 32);
          }
          c.restore();
        });
      });
      // measurements & constraint glyphs
      c.save(); c.font = '13px "Source Sans 3", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      this.ents.forEach(e => {
        if (e.type === 'seg' && !e.hiddenAux) {
          const a = this.P(e.a), b = this.P(e.b), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, L = dist(a, b) || 1, nx = -(b.y - a.y) / L, ny = (b.x - a.x) / L;
          const lc = this.cons.find(k => k.type === 'length' && k.refs[0] === e.id);
          const glyphs = this.cons.filter(k => k.refs.includes(e.id) && ['horizontal', 'vertical', 'perpendicular', 'parallel', 'equal', 'tangent'].includes(k.type)).map(k => CONSTRAINTS[k.type].glyph);
          let text = '';
          if (lc) text = fmt(lc.val); else if (this.showMeasures && !e.aux) text = fmt(L / UNIT);
          if (glyphs.length) text += (text ? '  ' : '') + [...new Set(glyphs)].join(' ');
          if (text) {
            const tx = mx + nx * 14, ty = my + ny * 14, tw = c.measureText(text).width + 8;
            c.fillStyle = 'rgba(28,46,39,.85)'; c.fillRect(tx - tw / 2, ty - 9, tw, 18);
            c.fillStyle = lc ? '#f3d36b' : (conflicts.size && this.cons.some(k => conflicts.has(k.id) && k.refs.includes(e.id)) ? '#ff9f8f' : 'rgba(244,241,232,.75)');
            c.fillText(text, tx, ty);
          }
        }
        if (e.type === 'circle' && this.showMeasures) {
          const C = this.P(e.c), rc = this.cons.find(k => k.type === 'radius' && k.refs[0] === e.id);
          c.save(); c.setLineDash([3, 4]); c.strokeStyle = 'rgba(244,241,232,.4)'; c.lineWidth = 1; c.beginPath(); c.moveTo(C.x, C.y); c.lineTo(C.x + e.r * 0.707, C.y - e.r * 0.707); c.stroke(); c.restore();
          c.fillStyle = rc ? '#f3d36b' : 'rgba(244,241,232,.75)'; c.fillText('r = ' + fmt(e.r / UNIT), C.x + e.r * 0.36 + 18, C.y - e.r * 0.36 - 6);
        }
      });
      this.ents.forEach(e => {
        if (e.type !== 'poly' || !this.showMeasures || !this.sel.has(e.id)) return;
        const i = this.polyInfo(e); let cx = 0, cy = 0; i.P.forEach(p => { cx += p.x; cy += p.y; }); cx /= i.P.length; cy /= i.P.length;
        c.fillStyle = '#f3d36b'; c.fillText('Area ' + fmt(i.area), cx, cy);
      });
      c.restore();
      // points
      this.points.forEach(p => {
        if (p.hidden) return;
        c.save();
        const fixed = this.isFixed(p);
        c.fillStyle = isSel(p.id) ? '#f3d36b' : fixed ? '#f4a3bd' : '#f4f1e8';
        c.beginPath(); c.arc(p.x, p.y, isSel(p.id) ? 5.5 : 4, 0, Math.PI * 2); c.fill();
        if (fixed) { c.strokeStyle = '#f4a3bd'; c.lineWidth = 1.2; c.strokeRect(p.x - 7, p.y - 7, 14, 14); }
        c.font = 'italic 600 16px "Fraunces", Georgia, serif'; c.fillStyle = 'rgba(244,241,232,.95)';
        const off = this.labelOffset(p); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(p.name, p.x + off.x, p.y + off.y);
        c.restore();
      });
      // tool preview
      if (this.tmp && this.tmp.preview) this.tmp.preview(c);
    }
    labelOffset(p) {
      // push the label away from the neighbours
      let vx = 0, vy = 0;
      this.ents.forEach(e => {
        let other = null;
        if (e.type === 'seg' && !e.hiddenAux) other = e.a === p.id ? this.P(e.b) : e.b === p.id ? this.P(e.a) : null;
        if (other) { const d = dist(p, other) || 1; vx += (other.x - p.x) / d; vy += (other.y - p.y) / d; }
      });
      const L = Math.hypot(vx, vy);
      if (L < 0.2) return { x: 12, y: -12 };
      return { x: -vx / L * 16, y: -vy / L * 16 };
    }
  }
  function cholSolve(A, b) { // symmetric positive (semi)definite; falls back to Gauss
    const n = A.length, M = A.map((r, i) => r.concat([b[i]]));
    for (let i = 0; i < n; i++) {
      let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
      if (Math.abs(M[p][i]) < 1e-12) return null; [M[i], M[p]] = [M[p], M[i]];
      for (let r = i + 1; r < n; r++) { const f = M[r][i] / M[i][i]; if (f) for (let c = i; c <= n; c++) M[r][c] -= f * M[i][c]; }
    }
    const x = new Array(n);
    for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let c = i + 1; c < n; c++) s -= M[i][c] * x[c]; x[i] = s / M[i][i]; }
    return x;
  }
  function inPoly(p, P) {
    let inside = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i].y > p.y) !== (P[j].y > p.y) && p.x < (P[j].x - P[i].x) * (p.y - P[i].y) / (P[j].y - P[i].y) + P[i].x) inside = !inside;
    return inside;
  }

  global.GeoModel = GeoModel;
  global.GEO_CONSTRAINTS = CONSTRAINTS;
  global.GEO_UNIT = UNIT;
  global.geoFmt = fmt;
})(window);
