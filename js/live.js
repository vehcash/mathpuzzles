/* live.html — plays a lesson an AI draws through the MCP server (api/mcp.php) on the smart blackboard.
   The page polls api/board.php?b=<id> for new commands and runs them in order with the board's scripting API
   (sWrite, sAxes-like axes, sPlot, sShade, sTangent, sPoint, sLine) and the geometry model.
   Steps: every {"type":"step"} starts a step; the panel lists them, and Back / Next / Replay rebuild the board
   up to a step. Commands the board cannot draw are reported back (POST …&report=1) so the AI can fix them.
   Command reference: board-guide.md. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const tr = (s, v) => (window.tr ? window.tr(s, v) : s);
  const COLORS = window.BOARD_COLORS;
  const UNIT = window.GEO_UNIT || 40;
  const params = new URLSearchParams(location.search);
  const ID = params.get('b') || '';
  const API = 'api/board.php?b=' + encodeURIComponent(ID);

  // ---------- board ----------
  const state = {
    cmds: [], rev: 0, epoch: 0, lastSeq: 0, title: '',
    pos: 0,               // index of the next command to run
    playing: true,        // auto-play: keep going (and follow new commands as they arrive)
    token: 0,             // bumps to cancel a running playback
    busy: false, userPaused: false,
    refs: null, errors: [], reported: new Set()
  };
  const freshRefs = () => ({ axes: {}, graph: {}, pts: {}, geo: null });
  state.refs = freshRefs();

  const status = $('#board-status'); let statusT;
  let board = null;
  board = new SmartBoard($('#board'), {
    onStatus(msg) { status.textContent = msg; status.classList.add('show'); clearTimeout(statusT); statusT = setTimeout(() => status.classList.remove('show'), 3200); },
    onChange() { const e = $('#board-empty'); if (e && board) e.classList.toggle('hide', !board.isEmpty() || state.cmds.length > 0); }
  });
  const G = board.geo;


  // ---------- helpers ----------
  const sleep = ms => new Promise(ok => setTimeout(ok, ms));
  const color = c => COLORS[c || 'chalk'] || COLORS.chalk;
  const texEsc = s => s.replace(/[\\{}#$%&_^~]/g, ch => ({ '\\': '\\backslash ', '{': '\\{', '}': '\\}', '#': '\\#', '$': '\\$', '%': '\\%', '&': '\\&', '_': '\\_', '^': '\\^{}', '~': '\\~{}' }[ch]));
  /** "words $x^2$ words" → LaTeX for the board */
  const textToTex = t => String(t).split('$').map((part, i) => i % 2 ? part : (part ? '\\text{' + texEsc(part) + '}' : '')).join('');
  const mathHtml = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(/\$([^$]+)\$/g, (_, m) => { try { return katex.renderToString(m, { throwOnError: false }); } catch (e) { return m; } });
  const need = (map, k, what) => { const v = map[k]; if (!v) throw new Error('no ' + what + ' called "' + k + '"'); return v; };

  /** board px for a command's position: fractions, a point on axes, or next to a geometry point */
  function where(c) {
    let x, y;
    if (c.axes !== undefined && c.type !== 'plot') { const p = board.toPx(need(state.refs.axes, c.axes, 'axes'), { x: c.x, y: c.y }); x = p.x; y = p.y; }
    else if (c.near) { const p = need(state.refs.pts, c.near, 'geometry point'); x = p.x + 0.015 * board.W; y = p.y - 0.035 * board.H; }
    else { x = (c.x !== undefined ? c.x : 0.05) * board.W; y = (c.y !== undefined ? c.y : 0.1) * board.H; }
    return { x: x + (c.dx || 0) * board.W, y: y + (c.dy || 0) * board.H };
  }
  function push(o) { board.objects.push(o); board.requestFrame(); return o; }
  const anim = (on, dur = 500) => (on ? { start: performance.now(), dur } : undefined);

  function lastAxes() { const a = Object.values(state.refs.axes); return a[a.length - 1] || null; }

  // ---------- one command ----------
  function run(c, animate) {
    const col = color(c.color);
    switch (c.type) {
      case 'step': return;
      case 'wait': return;
      case 'clear': board.reset(); state.refs = freshRefs(); G.showMeasures = true; G.showAngles = true; return;
      case 'write': {
        const p = where(c);
        const m = board.sWrite(c.tex !== undefined ? c.tex : textToTex(c.text), { x: p.x / board.W, y: p.y / board.H, s: c.size || 26, c: col, right: c.align === 'right' });
        if (!animate) delete m.anim; return;
      }
      case 'equation': case 'system': {
        const p = where(c);
        const m = board.sWrite('', { x: p.x / board.W, y: p.y / board.H, s: c.size || 30, c: col });
        delete m.fixed; delete m.tex; if (!animate) delete m.anim;
        if (c.type === 'system') { m.system = c.equations.slice(); m.ascii = m.system.join(' ; '); m.solved = !!c.solve; }
        else {
          m.ascii = c.equation;
          try { const info = MathCore.analyze(m.ascii); if (c.solve && info.kind === 'value' && !/=\s*$/.test(m.ascii)) m.ascii += '='; }
          catch (e) { if (!(board.readable && board.readable(m.ascii))) { m.error = true; throw new Error('cannot read the equation "' + c.equation + '": ' + e.message); } }
          m.solved = !!c.solve;
        }
        if (c.plot) {
          let ax = lastAxes(); if (!ax) { ax = makeAxes({ x_range: [-6, 6], y_range: [-4, 4], box: [0.45, 0.08, 0.52, 0.84] }, animate); state.refs.axes['_auto' + Object.keys(state.refs.axes).length] = ax; }
          const list = c.type === 'system' ? c.equations : [c.equation];
          list.forEach(e => { try { board.sPlot(ax, e, {}); } catch (er) { /* a value equation (2x+3=7) cannot be plotted: the solution is shown instead */ } });
          if (c.type === 'system') { try { const sol = MathCore.solveSystem(list); if (sol && sol.vars.length === 2 && sol.vars.every(v => v === 'x' || v === 'y')) sol.solutions.forEach(s => board.sPoint(ax, s.x, s.y, '(' + nice(s.x) + ', ' + nice(s.y) + ')', {})); } catch (er) { /* no solution to mark */ } }
        }
        board.requestFrame(); return;
      }
      case 'axes': { state.refs.axes[c.id] = makeAxes(c, animate); return; }
      case 'plot': {
        const gr = board.sPlot(need(state.refs.axes, c.axes, 'axes'), c.equation, { c: c.color ? col : undefined, dash: c.dashed, lab: c.label });
        if (!animate) delete gr.anim;
        if (c.id) state.refs.graph[c.id] = gr; return;
      }
      case 'shade': board.sShade(need(state.refs.graph, c.graph, 'graph'), c.from, c.to); return;
      case 'tangent': board.sTangent(need(state.refs.graph, c.graph, 'graph'), c.at); return;
      case 'point': { const pt = board.sPoint(need(state.refs.axes, c.axes, 'axes'), c.x, c.y, c.label || '', { c: col, hollow: c.hollow }); if (!animate) delete pt.anim; return; }
      case 'line': case 'arrow': {
        const ax = c.axes !== undefined ? need(state.refs.axes, c.axes, 'axes') : null;
        const P = (x, y) => (ax ? board.toPx(ax, { x, y }) : { x: x * board.W, y: y * board.H });
        const a = P(c.x1, c.y1), b = P(c.x2, c.y2);
        const ln = push({ type: 'line', id: nextId(), a, b, color: col, w: 2.4, anim: anim(animate) });
        if (c.dashed) ln.dashed = true;
        if (c.type === 'arrow') {
          const L = Math.hypot(b.x - a.x, b.y - a.y) || 1, ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, s = Math.min(14, L / 3);
          [[-uy, ux], [uy, -ux]].forEach(([nx, ny]) => push({ type: 'line', id: nextId(), a: { x: b.x - ux * s + nx * s * 0.55, y: b.y - uy * s + ny * s * 0.55 }, b, color: col, w: 2.4, anim: animate ? { start: performance.now() + 450, dur: 200 } : undefined }));
        }
        return;
      }
      case 'circle': {
        let cpx, r;
        if (c.axes !== undefined) { const ax = need(state.refs.axes, c.axes, 'axes'); cpx = board.toPx(ax, { x: c.x, y: c.y }); r = c.r * ax.unit; }
        else { cpx = { x: c.x * board.W, y: c.y * board.H }; r = c.r * board.W; }
        push({ type: 'circle', id: nextId(), c: cpx, r, color: col, w: 2.4, anim: anim(animate, 700) }); return;
      }
      case 'highlight': {
        const p = where(c), w = c.w * board.W, h = c.h * board.H, y0 = p.y;
        push({ type: 'poly', id: nextId(), pts: [{ x: p.x, y: y0 }, { x: p.x + w, y: y0 }, { x: p.x + w, y: y0 + h }, { x: p.x, y: y0 + h }], closed: true, color: COLORS.yellow, w: 2.2, anim: anim(animate, 600) });
        return;
      }
      case 'geometry': geometry(c, col); return;
      default: throw new Error('unknown command type ' + c.type);
    }
  }
  let localId = 900000; const nextId = () => ++localId;
  const nice = v => { const r = Math.round(v * 100) / 100; return (Math.abs(r) < 1e-9 ? 0 : r).toString(); };

  /** axes that show exactly x_range × y_range with equal units, centred in its box */
  function makeAxes(c, animate) {
    const [bl, bt, bw, bh] = c.box || [0.45, 0.08, 0.52, 0.84];
    const L = bl * board.W, T = bt * board.H, BW = bw * board.W, BH = bh * board.H;
    const [x0, x1] = c.x_range, [y0, y1] = c.y_range;
    const unit = Math.max(2, Math.min(BW / (x1 - x0), BH / (y1 - y0)));
    const w = unit * (x1 - x0), h = unit * (y1 - y0), left = L + (BW - w) / 2, top = T + (BH - h) / 2;
    const ax = board.newAxes({ cx: left + w / 2, cy: top + h / 2, hw: w / 2, hh: h / 2, unit });
    Object.assign(ax, { x0: left, x1: left + w, y0: top, y1: top + h, ox: left - x0 * unit, oy: top + y1 * unit, unit });
    if (animate) ax.anim = { start: performance.now(), dur: 500 };
    board.objects.push(ax); board.requestFrame();
    return ax;
  }

  /** geometry: named points in units (y up), fitted into a box; later commands reuse the same frame */
  function geometry(c, col) {
    const R = state.refs, gcol = c.color ? col : undefined;
    const names = Object.keys(c.points || {});
    if (names.length && (!R.geo || c.box)) {
      const us = names.map(n => c.points[n]);
      const mnx = Math.min(...us.map(u => u[0])), mxx = Math.max(...us.map(u => u[0])), mny = Math.min(...us.map(u => u[1])), mxy = Math.max(...us.map(u => u[1]));
      const [bl, bt, bw, bh] = c.box || [0.45, 0.08, 0.52, 0.84];
      const BW = bw * board.W - 60, BH = bh * board.H - 60;    // room for labels
      const s = Math.min(1, BW / (Math.max(mxx - mnx, 1) * UNIT), BH / (Math.max(mxy - mny, 1) * UNIT));
      R.geo = { cx: (bl + bw / 2) * board.W, cy: (bt + bh / 2) * board.H, mx: (mnx + mxx) / 2, my: (mny + mxy) / 2, k: UNIT * s };
      if (s < 0.999) G.showMeasures = false;     // shown lengths would be wrong at a smaller scale
    }
    if (c.measures !== undefined) G.showMeasures = c.measures && (!R.geo || R.geo.k >= UNIT * 0.999);
    if (c.angles !== undefined) G.showAngles = c.angles;
    const px = u => ({ x: R.geo.cx + (u[0] - R.geo.mx) * R.geo.k, y: R.geo.cy - (u[1] - R.geo.my) * R.geo.k });
    names.forEach(n => {
      const q = px(c.points[n]);
      if (R.pts[n]) { Object.assign(R.pts[n], q); return; }
      R.pts[n] = G.addPoint(q.x, q.y, { name: n, color: gcol });
    });
    const P = n => need(R.pts, n, 'geometry point');
    (c.segments || []).forEach(([a, b]) => G.addSeg(P(a).id, P(b).id, { color: gcol }));
    const polyOf = ns => {
      const ids = ns.map(n => P(n).id);
      return G.ents.find(e => e.type === 'poly' && e.pts.length === ids.length && ids.every(id => e.pts.includes(id))) || G.addPoly(ids, { color: gcol });
    };
    (c.polygons || []).forEach(polyOf);
    (c.circles || []).forEach(ci => {
      if (ci.through) G.construct('circleThrough', { P: ci.through.map(P), S: [], C: [], G: [] });
      else G.addCircle(P(ci.center).id, ci.radius * (R.geo ? R.geo.k : UNIT), { color: gcol });
    });
    (c.construct || []).forEach(k => {
      const s = { P: [], S: [], C: [], G: [] };
      if (['incircle', 'circumcircle', 'altitudes', 'medians'].includes(k.type)) s.G = [polyOf(k.of)];
      else s.S = [G.addSeg(P(k.of[0]).id, P(k.of[1]).id, { color: gcol })];
      if (k.type === 'foot') s.P = [P(k.from)];
      const before = G.points.length;
      G.construct(k.type === 'midpoint' ? 'midpointOf' : k.type, s);
      const added = G.points.slice(before);
      // the point to name first: the centre for incircle/circumcircle, the new point for midpoint/foot
      (k.names || []).forEach((n, i) => { const p = added[i]; if (p) { p.name = n; R.pts[n] = p; } });
      added.forEach(p => { if (!Object.values(R.pts).includes(p)) R.pts[p.name] = p; });
    });
    G.solve(); board.render();
  }

  // ---------- playback ----------
  const stepIdx = () => state.cmds.map((c, i) => (c.type === 'step' ? i : -1)).filter(i => i >= 0);
  function currentStep() { const s = stepIdx(); let k = -1; s.forEach((i, n) => { if (i < state.pos) k = n; }); return k; }
  function delayAfter(c) {
    if (c.type === 'wait') return c.ms;
    const base = { step: Math.min(6000, Math.max(1400, (c.text || '').length * 38)), axes: 600, plot: 1000, equation: 700, system: 900, geometry: 900, write: 450, shade: 700, tangent: 800, clear: 300 }[c.type] || 400;
    return base + (c.pause || 0);
  }
  function exec(c, animate) {
    try { run(c, animate); }
    catch (e) {
      const msg = (e && e.message) || String(e);
      console.warn('command', c.seq, msg);
      report(c.seq, c.type + ': ' + msg);
    }
  }
  /** play forward from state.pos; with stopAtStep, stop before the next step */
  async function play(stopAtStep) {
    const my = ++state.token; state.busy = true; renderSteps();
    while (state.pos < state.cmds.length && my === state.token) {
      const c = state.cmds[state.pos];
      if (stopAtStep && c.type === 'step' && state.pos > stopAtStep.from) break;
      exec(c, true); state.pos++; renderSteps();
      await sleep(delayAfter(c));
    }
    if (my === state.token) { state.busy = false; if (stopAtStep) state.playing = false; renderSteps(); }
  }
  /** rebuild the board instantly up to command index i (exclusive) */
  function rebuildTo(i) {
    ++state.token; state.busy = false;
    board.reset(); state.refs = freshRefs(); G.showMeasures = true; G.showAngles = true;
    for (let k = 0; k < i; k++) exec(state.cmds[k], false);
    board.sSettle(); state.pos = i; renderSteps();
  }
  function goStep(n) {   // show steps 0..n-1 finished, then play step n
    const s = stepIdx(); if (!s.length) return;
    n = Math.max(0, Math.min(s.length - 1, n));
    rebuildTo(s[n]); state.playing = false; play({ from: s[n] });
  }

  // ---------- panel ----------
  function renderSteps() {
    const ol = $('#lv-steps'), s = stepIdx(), cur = currentStep();
    if (ol.children.length !== Math.max(1, s.length) || ol.dataset.rev !== String(state.rev)) {
      ol.innerHTML = ''; ol.dataset.rev = state.rev;
      if (!s.length) { const li = document.createElement('li'); li.className = 'empty'; li.textContent = state.cmds.length ? tr('No step captions in this lesson.') : tr('Waiting for the first step…'); ol.appendChild(li); }
      s.forEach((i, n) => { const c = state.cmds[i], li = document.createElement('li'); li.innerHTML = (c.title ? '<b>' + mathHtml(c.title) + '</b>' : '') + mathHtml(c.text); li.onclick = () => goStep(n); ol.appendChild(li); });
    }
    [...ol.children].forEach((li, n) => { if (li.classList.contains('empty')) return; li.classList.toggle('on', n === cur); li.classList.toggle('todo', n > cur); });
    const on = ol.children[cur]; if (on && on.dataset.shown !== '1') { [...ol.children].forEach(x => { x.dataset.shown = ''; }); on.dataset.shown = '1'; on.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    $('#lv-count').textContent = s.length ? tr('Step {n} of {m}', { n: Math.max(1, cur + 1), m: s.length }) : '';
    $('#lv-play').textContent = state.playing && state.busy ? tr('❚❚ Pause') : tr('▶ Play');
    $('#lv-prev').disabled = cur <= 0; $('#lv-next').disabled = cur >= s.length - 1 && state.pos >= state.cmds.length;
  }
  $('#lv-prev').onclick = () => goStep(currentStep() - 1);
  $('#lv-next').onclick = () => { const s = stepIdx(), cur = currentStep(); if (cur + 1 < s.length) goStep(cur + 1); else { state.playing = false; rebuildTo(state.cmds.length); } };
  $('#lv-play').onclick = () => {
    if (state.playing && state.busy) { state.playing = false; state.userPaused = true; ++state.token; state.busy = false; board.sSettle(); renderSteps(); return; }
    state.playing = true; state.userPaused = false; if (state.pos >= state.cmds.length) { rebuildTo(0); } play();
  };
  $('#lv-replay').onclick = () => { state.playing = true; state.userPaused = false; rebuildTo(0); play(); };

  // ---------- reports back to the AI ----------
  let reportT = null;
  function report(seq, error) {
    const k = seq + '|' + error; if (state.reported.has(k)) return; state.reported.add(k);
    state.errors.push({ seq, error }); clearTimeout(reportT);
    reportT = setTimeout(() => {
      const errors = state.errors.splice(0);
      fetch(API + '&report=1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ errors }) }).catch(() => {});
    }, 800);
  }

  // ---------- polling ----------
  let lastChange = Date.now(), pollT = null;
  function interval() { const idle = Date.now() - lastChange; return document.hidden ? 15000 : idle < 300000 ? 2000 : idle < 1800000 ? 8000 : 30000; }
  async function poll() {
    clearTimeout(pollT);
    try {
      const r = await fetch(API + '&since=' + state.lastSeq + '&rev=' + state.rev, { cache: 'no-store' });
      const d = await r.json();
      if (!r.ok) { fail(d.error || tr('This lesson was not found.')); return; }
      $('#lv-link').hidden = false;
      live(true);
      if (!d.same) {
        if (state.epoch && d.epoch !== state.epoch) {          // the AI started the lesson again
          state.epoch = d.epoch; state.lastSeq = 0; state.cmds = []; state.rev = 0; await poll(); state.playing = true; rebuildTo(0); play(); return;
        }
        state.epoch = d.epoch; state.rev = d.rev;
        if (d.title && d.title !== state.title) { state.title = d.title; $('#lv-title').textContent = d.title; document.title = d.title + ' — ' + tr('live lesson') + ' | Advanced Math Tutor'; }
        if (d.commands && d.commands.length) {
          lastChange = Date.now();
          const atEnd = state.pos >= state.cmds.length, first = !state.cmds.length;
          state.cmds.push(...d.commands); state.lastSeq = d.commands[d.commands.length - 1].seq;
          renderSteps();
          // an older lesson opened later: show it finished (Replay plays it); a fresh one plays as it is drawn
          if (first && d.updated && Date.now() / 1000 - d.updated > 180) { state.playing = false; rebuildTo(state.cmds.length); }
          else if (atEnd && !state.busy && !state.userPaused) { state.playing = true; play(); }
        }
      }
    } catch (e) { live(false); }
    pollT = setTimeout(poll, interval());
  }
  function live(ok) { const el = $('#lv-live'); el.hidden = false; el.classList.toggle('idle', !ok || Date.now() - lastChange > 300000); el.lastChild.textContent = ok ? tr('Live') : tr('Offline'); }
  function fail(msg) { $('#lv-empty-1').textContent = msg; $('#lv-empty-2').textContent = tr('Ask the AI assistant for a new link.'); $('#lv-empty-1').classList.add('lv-error'); renderSteps(); }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { clearTimeout(pollT); poll(); } });

  // a new board size: rebuild what is shown so positions (fractions of the board) stay right
  let lastSize = [board.W, board.H], sizeT = null;
  new ResizeObserver(() => {
    clearTimeout(sizeT);
    sizeT = setTimeout(() => {
      const [w, h] = lastSize; if (Math.abs(board.W - w) / w < 0.04 && Math.abs(board.H - h) / h < 0.04) return;
      lastSize = [board.W, board.H]; const wasPlaying = state.busy && state.playing; rebuildTo(state.pos); if (wasPlaying) play();
    }, 350);
  }).observe($('#board'));

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (er) { /* */ } ta.remove(); return ok;
    }
  }
  $('#lv-link').onclick = async () => { const ok = await copy(location.origin + location.pathname + '?b=' + ID); $('#lv-link').textContent = ok ? tr('Copied ✓') : tr('Copy failed.'); setTimeout(() => { $('#lv-link').textContent = tr('🔗 Copy link'); }, 1600); };

  // ---------- start ----------
  renderSteps();
  const hasBoard = /^[a-z0-9]{12,32}$/.test(ID);
  $('#lv-link').hidden = !hasBoard;
  if (!/^https?:$/.test(location.protocol)) fail(tr('Live lessons need the website (they do not work opened from disk).'));
  else if (!hasBoard) fail(tr('This page shows a lesson an AI assistant draws. Open the link the assistant gave you.'));
  else poll();
})();
