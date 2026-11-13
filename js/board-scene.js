/* Scenes on the smart blackboard: flat diagrams (tiles, Venn diagrams, number lines, bar charts) and turnable 3D pictures.
   Used by the cheat-sheet lessons (js/tutor.js actions '3d', 'seg', 'vec', 'line3', 'pl', 'pt3', 'sph', 'circ3', 'lab3', 'poly3')
   and by the local AI tutor (js/local-tutor.js).

     const sc = board.sScene([x0, y0, x1, y1], { flat, axes, c: [cx, cy, cz], r, yaw, pitch, names })
       box in board fractions; c = centre of the picture, r = half its size in maths units; 3D: z is up,
       yaw / pitch in radians (default: the usual view from the first octant).
     board.s3(sc, item)   item.k: 'seg' { a, b, arrow, dash, w } · 'poly' { pts, fill } · 'pt' { p, lab, hollow, dx, dy }
                                  'sph' { o, r, fill } · 'circ' { o, n, r, fill } · 'lab' { p, s, size, dx, dy }
                          common: c (colour), d (delay in ms before it is drawn).
   Drag inside a 3D scene to turn it (a flat one moves), scroll to zoom. The scene keeps `zoom` and `home`
   so the lesson player's + − ⟲ buttons work. Must load after js/board.js. */
(function (global) {
  'use strict';
  const SB = global.SmartBoard; if (!SB || SB.prototype.sScene) return;
  const CHALK = '#f4f1e8';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const DUR = { seg: 520, poly: 650, pt: 300, sph: 700, circ: 700, lab: 300 };
  let uid = 700000;

  /* Flat scenes fit themselves: measure every shape (maths units) and every label (pixels), then pick the largest
     scale — never larger than the author's r asks for — at which everything fits the box, and centre the content.
     So a picture is never cut at the edges, whatever the board size or the language of its labels. */
  let mctx = null;
  const textW = (txt, size) => { if (!mctx) mctx = document.createElement('canvas').getContext('2d'); mctx.font = Math.round(size * 1.12) + 'px Kalam, cursive'; return mctx.measureText(String(txt)).width; };
  function fitFlat(sc, W, H, s0) {
    const key = sc.items.length + ':' + Math.round(W) + ':' + Math.round(H) + ':' + (document.fonts ? document.fonts.status : '');
    if (sc._fitKey === key) return sc._fit;
    const pts = [], labs = [];
    for (const it of sc.items) {
      if (it.k === 'seg') pts.push(it.a, it.b);
      else if (it.k === 'poly') pts.push(...it.pts);
      else if (it.k === 'circ' || it.k === 'sph') pts.push([it.o[0] - it.r, it.o[1] - it.r], [it.o[0] + it.r, it.o[1] + it.r]);
      else if (it.k === 'pt') {
        pts.push(it.p);
        if (it.lab) { const w = textW(it.lab, 17), h = 22, dx = it.dx !== undefined ? it.dx : 8, dy = it.dy !== undefined ? it.dy : -10; labs.push([it.p[0], it.p[1], dx, dx + w, dy - h / 2, dy + h / 2]); }
      } else if (it.k === 'lab' && it.s) {
        const sz = it.size || 18, w = textW(it.s, sz), h = sz * 1.3, dx = it.dx || 0, dy = it.dy || 0;
        labs.push([it.p[0], it.p[1], dx - w / 2, dx + w / 2, dy - h / 2, dy + h / 2]);
      }
    }
    if (sc.axes) { const r = sc.r * 0.95; pts.push([sc.c[0] - r, sc.c[1] - r], [sc.c[0] + r + 0.3, sc.c[1] + r + 0.3]); }
    if (!pts.length && !labs.length) { sc._fitKey = key; return (sc._fit = null); }
    const ext = k => {
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const p of pts) { const x = p[0] * k, y = -p[1] * k; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      for (const L of labs) { const x = L[0] * k, y = -L[1] * k; x0 = Math.min(x0, x + L[2]); x1 = Math.max(x1, x + L[3]); y0 = Math.min(y0, y + L[4]); y1 = Math.max(y1, y + L[5]); }
      return [x0, x1, y0, y1];
    };
    // shrink the shapes (never below 60% of the author's scale); if a label is still too wide, shrink the labels too
    let fs = 1;
    const ext2 = k => { const e = ext(k); return e; };
    const fits = k => { const e = ext2(k); return e[1] - e[0] <= W - 14 && e[3] - e[2] <= H - 10; };
    const shapes = k => { let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity; for (const p of pts) { x0 = Math.min(x0, p[0] * k); x1 = Math.max(x1, p[0] * k); y0 = Math.min(y0, -p[1] * k); y1 = Math.max(y1, -p[1] * k); } return !pts.length || (x1 - x0 <= W - 14 && y1 - y0 <= H - 10); };
    const search = (lo, hi, ok) => { if (ok(hi)) return hi; for (let i = 0; i < 26; i++) { const m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; } return lo; };
    const kG = search(s0 * 0.02, s0, shapes);                // the shapes always fit
    let k = search(kG * 0.6, kG, fits);                       // then make room for the labels, within reason
    for (let i = 0; i < 6 && !fits(k) && fs > 0.62; i++) { fs *= 0.9; for (const L of labs) { const o = L.o || (L.o = L.slice(2)); L[2] = o[0] * fs; L[3] = o[1] * fs; L[4] = o[2] * fs; L[5] = o[3] * fs; } }
    const e = ext2(k);
    sc._fitKey = key;
    return (sc._fit = { s: k, fs, mx: (e[0] + e[1]) / 2, my: (e[2] + e[3]) / 2 });
  }

  /** a projector for the scene in its current view: maths point → { x, y, z (depth: larger = nearer) } in board px */
  function projector(b, sc) {
    const X0 = sc.box[0] * b.W, Y0 = sc.box[1] * b.H, X1 = sc.box[2] * b.W, Y1 = sc.box[3] * b.H;
    const cx = (X0 + X1) / 2 + sc.px, cy = (Y0 + Y1) / 2 + sc.py;
    const s = Math.min(X1 - X0, Y1 - Y0) / (2 * sc.r) * (sc.flat ? 0.94 : 0.8) * sc.zoom;
    if (sc.flat) {
      const F = sc.fit !== false && fitFlat(sc, X1 - X0, Y1 - Y0, s / sc.zoom);
      if (F) { const k = F.s * sc.zoom; return { s: k, f: p => ({ x: cx + (p[0] * F.s - F.mx) * sc.zoom, y: cy + (-p[1] * F.s - F.my) * sc.zoom, z: 0 }) }; }
      return { s, f: p => ({ x: cx + (p[0] - sc.c[0]) * s, y: cy - (p[1] - sc.c[1]) * s, z: 0 }) };
    }
    const cy_ = Math.cos(sc.yaw), sy = Math.sin(sc.yaw), cp = Math.cos(sc.pitch), sp = Math.sin(sc.pitch);
    return { s, f: p => {
      const x = p[0] - sc.c[0], y = p[1] - sc.c[1], z = (p[2] || 0) - sc.c[2];
      const x1 = x * cy_ - y * sy, y1 = x * sy + y * cy_;            // turned about the z axis; x1 points at the viewer
      return { x: cx + y1 * s, y: cy - (z * cp - x1 * sp) * s, z: x1 * cp + z * sp };
    } };
  }
  const sub = (a, b) => a.map((v, i) => v - b[i]);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };

  Object.assign(SB.prototype, {
    sScene(box, o = {}) {
      const sc = {
        type: 'scene', id: uid++, box: box.slice(), flat: !!o.flat, axes: o.axes !== undefined ? !!o.axes : !o.flat,
        c: (o.c || [0, 0, 0]).slice(), r: o.r || 3, names: o.names || ['x', 'y', 'z'],
        yaw: o.yaw !== undefined ? o.yaw : -0.8, pitch: o.pitch !== undefined ? o.pitch : 0.38, zoom: 1, px: 0, py: 0,
        items: [], anim: { start: performance.now(), dur: 400 }
      };
      sc.home = { yaw: sc.yaw, pitch: sc.pitch, zoom: 1, px: 0, py: 0 };
      this.objects.push(sc); this._sceneInput(); this.requestFrame();
      return sc;
    },
    s3(sc, it) {
      it = Object.assign({}, it); it.t0 = performance.now() + (it.d || 0); it.dur = DUR[it.k] || 400;
      sc.items.push(it); this.requestFrame(); return it;
    },
    drawScene(c, sc, p) {
      const P = projector(this, sc), now = performance.now(); let busy = false;
      const X0 = sc.box[0] * this.W, Y0 = sc.box[1] * this.H, X1 = sc.box[2] * this.W, Y1 = sc.box[3] * this.H;
      c.save(); c.beginPath(); c.rect(X0 - 30, Y0 - 20, X1 - X0 + 60, Y1 - Y0 + 40); c.clip();
      c.globalAlpha *= p;
      if (sc.axes) this._sceneAxes(c, sc, P);
      for (const it of sc.items) {
        let q = (now - it.t0) / it.dur; if (q < 1) busy = true; if (q <= 0) continue; q = ease(clamp(q, 0, 1));
        c.save(); const col = it.c || CHALK; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = it.w || 2.6; c.lineCap = c.lineJoin = 'round';
        try { this._sceneItem(c, sc, P, it, q); } catch (e) { /* a bad item must not stop the board */ }
        c.restore();
      }
      c.restore();
      if (busy) this.requestFrame();
    },
    _sceneAxes(c, sc, P) {
      const r = sc.r * 0.95, o = sc.flat ? [0, 0, 0] : [0, 0, 0];
      const inside = v => v >= -1e9;
      c.save(); c.strokeStyle = 'rgba(244,241,232,.55)'; c.fillStyle = 'rgba(244,241,232,.75)'; c.lineWidth = 1.6;
      c.font = 'italic 17px "Times New Roman", serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      const dims = sc.flat ? 2 : 3;
      for (let k = 0; k < dims; k++) {
        const a = o.slice(), b = o.slice(); a[k] = sc.c[k] - r; b[k] = sc.c[k] + r;
        if (!inside(a[k])) continue;
        const A = P.f(a), B = P.f(b);
        c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke();
        const ang = Math.atan2(B.y - A.y, B.x - A.x);
        c.beginPath(); c.moveTo(B.x - 10 * Math.cos(ang - 0.4), B.y - 10 * Math.sin(ang - 0.4)); c.lineTo(B.x, B.y); c.lineTo(B.x - 10 * Math.cos(ang + 0.4), B.y - 10 * Math.sin(ang + 0.4)); c.stroke();
        const n = sc.names[k]; if (n) c.fillText(n, B.x + 12 * Math.cos(ang), B.y + 12 * Math.sin(ang));
      }
      c.restore();
    },
    _sceneItem(c, sc, P, it, q) {
      const f = P.f;
      const label = (txt, at, dx = 8, dy = -8, size = 17) => {
        if (!txt) return; c.save(); c.globalAlpha *= q; const fs = sc.flat && sc._fit ? sc._fit.fs : 1; size *= fs; dx *= fs; dy *= fs;
        c.font = Math.round(size * 1.12) + 'px Kalam, cursive'; c.textBaseline = 'middle';
        c.textAlign = it.k === 'lab' ? 'center' : 'left'; c.fillText(txt, at.x + dx, at.y + dy); c.restore();
      };
      switch (it.k) {
        case 'seg': {
          const A = f(it.a), B0 = f(it.b), B = { x: A.x + (B0.x - A.x) * q, y: A.y + (B0.y - A.y) * q };
          if (it.dash) c.setLineDash([7, 6]);
          c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke(); c.setLineDash([]);
          if (it.arrow && q > 0.6) {
            const ang = Math.atan2(B.y - A.y, B.x - A.x), s = Math.min(13, Math.hypot(B.x - A.x, B.y - A.y) / 3);
            c.beginPath(); c.moveTo(B.x - s * Math.cos(ang - 0.42), B.y - s * Math.sin(ang - 0.42)); c.lineTo(B.x, B.y); c.lineTo(B.x - s * Math.cos(ang + 0.42), B.y - s * Math.sin(ang + 0.42)); c.stroke();
          }
          break;
        }
        case 'poly': {
          const pts = it.pts.map(f); if (pts.length < 2) return;
          if (it.fill) { c.save(); c.globalAlpha *= it.fill * q; c.beginPath(); pts.forEach((u, i) => (i ? c.lineTo(u.x, u.y) : c.moveTo(u.x, u.y))); c.closePath(); c.fill(); c.restore(); }
          // the outline is drawn on, side after side
          const n = pts.length, tot = n * q; c.beginPath(); c.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i <= n; i++) { const u = pts[i - 1], v = pts[i % n], t = clamp(tot - (i - 1), 0, 1); if (t <= 0) break; c.lineTo(u.x + (v.x - u.x) * t, u.y + (v.y - u.y) * t); }
          if (it.dash) c.setLineDash([7, 6]);
          c.lineWidth = it.w || 2; c.stroke(); break;
        }
        case 'pt': {
          const A = f(it.p); c.globalAlpha *= q;
          c.beginPath(); c.arc(A.x, A.y, 5.2, 0, Math.PI * 2);
          if (it.hollow) { c.fillStyle = '#1f3329'; c.fill(); c.lineWidth = 2.2; c.stroke(); } else { c.fill(); c.lineWidth = 1.4; c.strokeStyle = '#23382f'; c.stroke(); }
          c.globalAlpha /= q; label(it.lab, A, it.dx !== undefined ? it.dx : 8, it.dy !== undefined ? it.dy : -10);
          break;
        }
        case 'lab': { const A = f(it.p); label(it.s, A, it.dx || 0, it.dy || 0, it.size || 18); break; }
        case 'sph': {
          const O = f(it.o), R = it.r * P.s;
          c.beginPath(); c.arc(O.x, O.y, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * q); c.stroke();
          if (it.fill) { c.save(); c.globalAlpha *= it.fill * q; c.beginPath(); c.arc(O.x, O.y, R, 0, Math.PI * 2); c.fill(); c.restore(); }
          if (!sc.flat && q >= 1) {   // the equator, its hidden half dashed
            const eq = []; for (let k = 0; k <= 64; k++) { const t = k / 64 * Math.PI * 2; eq.push(f([it.o[0] + it.r * Math.cos(t), it.o[1] + it.r * Math.sin(t), it.o[2] || 0])); }
            c.lineWidth = 1.3; for (let k = 1; k < eq.length; k++) { c.setLineDash(eq[k].z < f(it.o).z ? [5, 5] : []); c.beginPath(); c.moveTo(eq[k - 1].x, eq[k - 1].y); c.lineTo(eq[k].x, eq[k].y); c.stroke(); }
          }
          break;
        }
        case 'circ': {
          const n = norm(it.n || [0, 0, 1]), h = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0], u = norm(cross(n, h)), v = cross(n, u);
          const pts = []; const N = 72;
          for (let k = 0; k <= N * q; k++) { const t = k / N * Math.PI * 2; pts.push(f(it.o.map((o0, i) => o0 + it.r * (Math.cos(t) * u[i] + Math.sin(t) * v[i])))); }
          if (it.fill && q >= 1) { c.save(); c.globalAlpha *= it.fill; c.beginPath(); pts.forEach((p0, i) => (i ? c.lineTo(p0.x, p0.y) : c.moveTo(p0.x, p0.y))); c.closePath(); c.fill(); c.restore(); }
          c.beginPath(); pts.forEach((p0, i) => (i ? c.lineTo(p0.x, p0.y) : c.moveTo(p0.x, p0.y))); c.stroke();
          break;
        }
      }
    },
    sceneAt(p) {
      for (let i = this.objects.length - 1; i >= 0; i--) {
        const o = this.objects[i]; if (o.type !== 'scene' || o.hidden) continue;
        const X0 = o.box[0] * this.W, Y0 = o.box[1] * this.H, X1 = o.box[2] * this.W, Y1 = o.box[3] * this.H;
        if (p.x > X0 && p.x < X1 && p.y > Y0 && p.y < Y1) return o;
      }
      return null;
    },
    // drag turns a 3D scene (moves a flat one); the wheel zooms. Only with the smart chalk or the move tool,
    // so plain chalk and the eraser still work on top of a picture.
    _sceneInput() {
      if (this._sceneBound) return; this._sceneBound = true;
      const el = this.live; let drag = null;
      el.addEventListener('pointerdown', e => {
        if (!['smart', 'move'].includes(this.tool || 'smart')) return;
        const p = this._pos(e), sc = this.sceneAt(p); if (!sc) return;
        if (sc.flat && this.tool !== 'move' && !sc.items.length) return;
        drag = { sc, x: e.clientX, y: e.clientY, id: e.pointerId };
        e.stopImmediatePropagation(); e.preventDefault(); try { el.setPointerCapture(e.pointerId); } catch (er) { /* */ }
      }, true);
      el.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
        if (drag.sc.flat) { drag.sc.px += dx; drag.sc.py += dy; } else { drag.sc.yaw -= dx * 0.01; drag.sc.pitch = clamp(drag.sc.pitch + dy * 0.01, -1.45, 1.45); }
        e.stopImmediatePropagation(); this.requestFrame();
      }, true);
      const end = e => { if (drag && e.pointerId === drag.id) { drag = null; e.stopImmediatePropagation(); } };
      el.addEventListener('pointerup', end, true); el.addEventListener('pointercancel', end, true);
      el.addEventListener('wheel', e => {
        const sc = this.sceneAt(this._pos(e)); if (!sc) return;
        e.preventDefault(); e.stopImmediatePropagation(); sc.zoom = clamp(sc.zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1), 0.4, 4); this.requestFrame();
      }, { capture: true, passive: false });
    }
  });

  // draw scenes with the other board objects
  const drawObj = SB.prototype.drawObj;
  SB.prototype.drawObj = function (c, o, p) { if (o.type === 'scene') return this.drawScene(c, o, p); return drawObj.call(this, c, o, p); };
})(window);
