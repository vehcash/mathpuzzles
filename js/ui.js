/* Board UI: equation bar (+ keypad), equation-system panel, graph list, geometry bar & constraint panel,
   "ask me what I'm drawing" settings. Everything talks to a SmartBoard instance. */
(function (global) {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const K = (t, o) => katex.renderToString(t, Object.assign({ throwOnError: false }, o || {}));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const KEYS = [
    ['x', 'x'], ['y', 'y'], ['x²', '^2'], ['xⁿ', '^'], ['√', 'sqrt(', ')'], ['a/b', '/'], ['(', '('], [')', ')'], ['=', '='],
    ['π', 'π'], ['θ', 'θ'], ['°', '°'], ['sin', 'sin('], ['cos', 'cos('], ['tan', 'tan('], ['ln', 'ln('], ['log', 'log('], ['eˣ', 'exp('], ['|x|', 'abs(', ')'], ['≤', '<='], ['≥', '>=']
  ];

  function insertAt(inp, text, close) {
    const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a;
    const mid = inp.value.slice(a, b);
    inp.value = inp.value.slice(0, a) + text + mid + (close || '') + inp.value.slice(b);
    const pos = a + text.length + mid.length; inp.focus(); inp.setSelectionRange(pos, pos);
    inp.dispatchEvent(new Event('input'));
  }
  function describe(ascii) {
    try {
      const info = MathCore.analyze(ascii);
      let hint = '';
      if (info.kind === 'evaluate' || info.kind === 'value') hint = (/=\s*$/.test(info.latex) ? '' : '= ') + info.resultTex;
      else if (info.kind === 'equation') hint = '\\Rightarrow ' + info.resultTex;
      else if (info.kind === 'derivative') hint = '= ' + info.resultTex;
      else if (info.kind === 'tangent') hint = info.resultTex;
      const calcPlot = info.kind === 'derivative' ? info.plotVar === 'x' : info.kind === 'tangent' || (info.calc && info.kind === 'evaluate' && /^\s*(int|lim|∫)/.test(ascii));
      return { ok: true, tex: info.latex, hint, calc: !!info.calc, plottable: calcPlot || info.kind === 'function' || info.kind === 'relation' || (info.kind === 'expression' && info.vars.every(v => v === 'x')), solvable: info.kind === 'equation' || (info.calc && info.kind !== 'equation'), info };
    } catch (e) { return { ok: false, err: e.message }; }
  }

  // ======================================================= equation bar
  function EqBar(board, root) {
    const inp = $('#eq-input', root), pv = $('#eq-preview', root), keypad = $('#eq-keypad', root);
    KEYS.forEach(([label, text, close]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'key'; b.innerHTML = label; b.onmousedown = e => e.preventDefault(); b.onclick = () => insertAt(inp, text, close); keypad.appendChild(b); });
    const update = () => {
      const v = inp.value.trim();
      if (!v) { pv.innerHTML = '<span class="muted">live preview</span>'; root.classList.remove('can-plot', 'can-solve'); return; }
      const d = describe(v);
      if (!d.ok) { pv.innerHTML = '<span class="err">' + esc(d.err) + '</span>'; root.classList.remove('can-plot', 'can-solve'); return; }
      pv.innerHTML = K(d.tex) + (d.hint ? ' <span class="hint">' + K(I18N.tex(d.hint)) + '</span>' : '');
      root.classList.toggle('can-plot', d.plottable); root.classList.toggle('can-solve', d.solvable); root.classList.toggle('can-steps', d.calc);
    };
    inp.addEventListener('input', update);
    let recent = Store.getJSON('chalkproof.recent', []) || [];
    const remember = v => { recent = [v].concat(recent.filter(r => r !== v)).slice(0, 8); Store.setJSON('chalkproof.recent', recent); api.onRecent && api.onRecent(); };
    const plot = () => { const v = inp.value.trim(); if (!v) return inp.focus(); try { board.plotEquation(v); remember(v); board.onStatus(tr('Plotted {x} — scroll on the axes to zoom, hover the curve to trace', { x: v })); inp.select(); } catch (e) { board.onStatus(e.message); } };
    const place = (opts = {}) => { const v = inp.value.trim(); if (!v) return inp.focus(); if (!describe(v).ok) { board.onStatus('Check the equation first'); return; } board.startPlacing(Object.assign({ ascii: v }, opts)); remember(v); inp.blur(); };
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); const d = describe(inp.value.trim()); if (e.shiftKey || !d.ok || !d.plottable) place(); else plot(); }
      if (e.key === 'Escape') inp.blur();
    });
    $('#eq-plot', root).onclick = plot;
    $('#eq-place', root).onclick = () => place();
    $('#eq-solve', root).onclick = () => { const d = describe(inp.value.trim()); if (d.ok && (d.solvable || d.info.kind === 'evaluate' || d.info.kind === 'value' || d.calc)) place({ solved: true }); else { board.onStatus(d.ok ? 'Nothing to solve — try an equation with one unknown, or use { System' : 'Check the equation first'); } };
    const solve = () => $('#eq-solve', root).onclick();
    const steps = () => { const v = inp.value.trim(); const d = describe(v); if (!d.ok) { board.onStatus('Check the expression first'); return; } if (!d.calc) { board.onStatus('Steps are for calculus: d/dx(…), lim(…), int(…), tangent(…)'); return; } api.onSteps && api.onSteps(v); };
    $('#eq-steps', root).onclick = steps;
    update();
    const api = {
      focus: () => inp.focus(), set: v => { inp.value = v; update(); inp.focus(); },
      insert: (t, close) => insertAt(inp, t, close),
      back: () => { const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a; if (a !== b) { inp.value = inp.value.slice(0, a) + inp.value.slice(b); inp.setSelectionRange(a, a); } else if (a > 0) { inp.value = inp.value.slice(0, a - 1) + inp.value.slice(a); inp.setSelectionRange(a - 1, a - 1); } inp.focus(); update(); },
      clear: () => { inp.value = ''; update(); inp.focus(); },
      left: () => { const a = Math.max(0, (inp.selectionStart ?? 0) - 1); inp.focus(); inp.setSelectionRange(a, a); },
      right: () => { const a = Math.min(inp.value.length, (inp.selectionEnd ?? 0) + 1); inp.focus(); inp.setSelectionRange(a, a); },
      refresh: update, plot, place: () => place(), solve, steps, recent: () => recent, onRecent: null, onSteps: null
    };
    return api;
  }

  // ======================================================= system panel
  function SystemPanel(board, el) {
    const rows = $('.sys-rows', el), out = $('.sys-out', el);
    let editing = null;
    const addRow = (val = '') => {
      const r = document.createElement('div'); r.className = 'sys-row';
      r.innerHTML = '<span class="brace"></span><input spellcheck="false" placeholder="e.g. 2x + y = 5"><span class="pv"></span><button class="x" title="Remove">×</button>';
      const i = r.querySelector('input'); i.value = val;
      const up = () => { const d = describe(i.value.trim()); r.querySelector('.pv').innerHTML = !i.value.trim() ? '' : d.ok ? K(d.tex) : '<span class="err">?</span>'; preview(); };
      i.addEventListener('input', up);
      i.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') { e.preventDefault(); const next = r.nextElementSibling; if (next) next.querySelector('input').focus(); else { const nr = addRow(); nr.querySelector('input').focus(); } } });
      r.querySelector('.x').onclick = () => { r.remove(); if (!rows.children.length) addRow(); preview(); };
      rows.appendChild(r); up(); return r;
    };
    const list = () => [...rows.querySelectorAll('input')].map(i => i.value.trim()).filter(Boolean);
    const preview = () => { const l = list(); $('.sys-preview', el).innerHTML = l.length ? K(BoardUtil.casesOf(l), { displayMode: true }) : ''; };
    const solve = () => {
      const l = list(); if (!l.length) return;
      let res; try { res = MathCore.solveSystem(l); } catch (e) { out.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; return; }
      let html = '<div class="sys-answer">' + K(I18N.tex(BoardUtil.solutionTex(res))) + '</div><ol class="sys-steps">';
      res.steps.forEach(s => {
        html += '<li><div class="t">' + esc(s.text) + '</div>' + (s.ops && s.ops.length ? '<div class="ops">' + K(s.ops.join(',\\quad ')) + '</div>' : '') + (s.tex ? '<div class="m">' + K(I18N.tex(s.tex), { displayMode: true }) + '</div>' : '') + '</li>';
      });
      if (res.status === 'unique' || res.status === 'numeric') {
        const s0 = res.solutions[0];
        html += '<li><div class="t">Check: substitute back</div><div class="m">' + l.map(e => { try { const st = MathCore.parse(e); return K(MathCore.toLatex(st) + '\\;\\Rightarrow\\;' + MathCore.fmt(MathCore.evaluate(st.sides[0], s0)) + ' = ' + MathCore.fmt(MathCore.evaluate(st.sides[1], s0)) + '\\ \\checkmark'); } catch (er) { return ''; } }).join('<br>') + '</div></li>';
      }
      html += '</ol>';
      out.innerHTML = html;
      out.querySelectorAll('li').forEach((li, i) => { li.style.animationDelay = (i * 0.35) + 's'; });
      return res;
    };
    $('.sys-add', el).onclick = () => addRow().querySelector('input').focus();
    $('.sys-solve', el).onclick = solve;
    $('.sys-plot', el).onclick = () => { const l = list(); if (!l.length) return; try { const r = board.plotSystem(l); board.onStatus(r.sol && r.sol.solutions && r.sol.solutions.length ? tr('Plotted — intersections marked') : tr('Plotted')); } catch (e) { board.onStatus(e.message); } };
    $('.sys-place', el).onclick = () => {
      const l = list(); if (!l.length) return;
      if (editing && board.objects.includes(editing)) { board.pushHistory(); editing.system = l; editing.ascii = l.join(' ; '); editing.solved = false; editing.plotted = false; board.render(); editing = null; close(); return; }
      board.startPlacing({ system: l, solved: true }); close();
    };
    $('.sys-close', el).onclick = () => close();
    const close = () => { el.hidden = true; editing = null; };
    addRow(); addRow();
    return {
      open(listIn, obj) {
        el.hidden = false; editing = obj || null;
        if (listIn) { rows.innerHTML = ''; listIn.forEach(v => addRow(v)); if (listIn.length < 2) addRow(); out.innerHTML = ''; }
        preview(); $('.sys-place', el).textContent = editing ? 'Update on board' : '＋ Place on board';
        const first = [...rows.querySelectorAll('input')].find(i => !i.value) || rows.querySelector('input'); first && first.focus();
      },
      openSteps(listIn) { this.open(listIn); solve(); },
      toggle() { if (el.hidden) this.open(); else close(); }
    };
  }

  // ======================================================= graph list
  function GraphsPanel(board, el) {
    const list = $('.gl-list', el);
    $('.gl-toggle', el).onclick = () => { el.classList.toggle('collapsed'); $('.gl-toggle', el).textContent = (el.classList.contains('collapsed') ? '▸ ' : '▾ ') + tr('Graphs'); };
    $('.gl-keys', el).onchange = e => { board.showKeyPoints = e.target.checked; board.render(); };
    $('.gl-trace', el).onchange = e => { board.trace = e.target.checked; };
    $('.gl-zin', el).onclick = () => { const ax = board.objects.filter(o => o.type === 'axes' && !o.hidden).pop(); if (ax) board.zoomAxes(ax, 1.25); };
    $('.gl-zout', el).onclick = () => { const ax = board.objects.filter(o => o.type === 'axes' && !o.hidden).pop(); if (ax) board.zoomAxes(ax, 0.8); };
    let last = '';
    return {
      sync() {
        const gs = board.graphs();
        const key = gs.map(g => g.id + g.eq + g.color + !!g.hidden).join('|') + I18N.lang;
        el.hidden = !gs.length;
        if (key === last) return; last = key;
        list.innerHTML = '';
        gs.forEach(g => {
          const r = document.createElement('div'); r.className = 'gl-row' + (g.hidden ? ' off' : '');
          let tex = g.eq; try { tex = MathCore.analyze(g.eq).latex; } catch (e) { /* */ }
          r.innerHTML = '<button class="sw" title="Change colour" style="background:' + g.color + '"></button><span class="eq">' + K(tex) + '</span><button class="eye" title="Show / hide">' + (g.hidden ? '◌' : '◉') + '</button><button class="del" title="Remove">×</button>' +
            (g.mode === 'explicit' ? '<div class="gl-tools"><button data-t="d" title="Plot the derivative f′">f′</button><button data-t="t" title="Tangent line at x = a">⟋ tangent</button><button data-t="a" title="Shade the area / integral from a to b">∫ area</button></div><div class="gl-form" hidden></div>' : '');
          r.querySelector('.sw').onclick = () => { const P = BoardUtil.PLOT_COLORS; board.setGraph(g.id, { color: P[(P.indexOf(g.color) + 1) % P.length] }); };
          r.querySelector('.eye').onclick = () => board.setGraph(g.id, { hidden: !g.hidden });
          r.querySelector('.del').onclick = () => board.removeGraph(g.id);
          if (g.mode === 'explicit') {
            const form = r.querySelector('.gl-form');
            const ask = (fields, go) => {
              form.hidden = false;
              form.innerHTML = fields.map(([n, v]) => '<label>' + n + ' <input value="' + v + '"></label>').join('') + '<button class="ok">OK</button>';
              const ins = [...form.querySelectorAll('input')]; ins[0].focus(); ins[0].select();
              const run = () => { const vals = ins.map(i => { try { return MathCore.evaluate(MathCore.parse(i.value.replace(',', '.')).sides[0]); } catch (e) { return NaN; } }); if (vals.some(v => !isFinite(v))) { ins[0].focus(); return; } form.hidden = true; try { go(...vals); } catch (e) { board.onStatus(e.message); } };
              form.querySelector('.ok').onclick = run;
              ins.forEach(i => i.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') run(); if (e.key === 'Escape') form.hidden = true; }));
            };
            r.querySelector('[data-t="d"]').onclick = () => { try { board.addDerivativeOf(g); board.onStatus('Derivative plotted'); } catch (e) { board.onStatus(e.message); } };
            r.querySelector('[data-t="t"]').onclick = () => ask([['x =', '1']], a => board.addTangentTo(g, a));
            r.querySelector('[data-t="a"]').onclick = () => ask([['from', g.shade ? g.shade.a : '0'], ['to', g.shade ? g.shade.b : '2']], (a, b) => { const v = board.shadeArea(g, a, b); board.onStatus(tr('∫ from {a} to {b} = {v}', { a, b, v: Math.round(v * 1e6) / 1e6 })); });
          }
          list.appendChild(r);
        });
      }
    };
  }

  // ======================================================= geometry panel
  function GeoPanel(board, el) {
    const statusText = (conf, dof) => conf ? '⚠ ' + tr(conf > 1 ? '{n} constraints cannot all hold' : '1 constraint cannot hold', { n: conf }) : dof === 0 ? '✓ ' + tr('Fully determined') : tr(dof > 1 ? '{n} degrees of freedom left' : '1 degree of freedom left', { n: dof });
    // info labels like "Length AB" / "Distance AB": translate the word, keep the names
    const trLabel = k => { const m = k.match(/^(Length|Distance) (\S+)$/); return m ? tr(m[1]) + ' ' + m[2] : tr(k); };
    const G = () => board.geo;
    let lastKey = '';
    const names = s => {
      const g = G(), parts = [];
      s.P.forEach(p => parts.push(tr('point {name}', { name: p.name })));
      s.S.forEach(e => parts.push(tr(e.aux ? 'line {name}' : 'segment {name}', { name: g.P(e.a).name + g.P(e.b).name })));
      s.C.forEach(e => parts.push(tr('circle ({name})', { name: g.P(e.c).name })));
      s.G.forEach(e => parts.push(tr(e.pts.length === 3 ? 'triangle {name}' : e.pts.length === 4 ? 'quadrilateral {name}' : 'polygon {name}', { name: e.pts.map(id => g.P(id).name).join('') })));
      return parts.join(', ');
    };
    const consLabel = c => {
      const g = G(), nm = id => { const p = g.P(id); if (p) return p.name; const e = g.E(id); if (!e) return '?'; if (e.type === 'seg') return g.P(e.a).name + g.P(e.b).name; if (e.type === 'circle') return '○' + g.P(e.c).name; return 'poly'; };
      const d = GEO_CONSTRAINTS[c.type] || { label: c.type };
      return tr(d.label) + ' ' + c.refs.map(nm).join(', ') + (c.val !== undefined ? ' = ' + geoFmt(c.val) + (c.type === 'angle' ? '°' : '') : '');
    };
    return {
      sync() {
        const g = G(), s = g.selection(), any = g.sel.size > 0;
        const hint = document.querySelector('.geo-hint');
        if (hint && !g.tmp) {
          const tips = { 'g-select': 'Click a figure, side or point to measure & constrain it · Shift-click for several · drag points', 'g-point': 'Click to add a point (on a side or circle it stays attached)', 'g-seg': 'Click–click or drag · snaps to points · near-horizontal/vertical locks', 'g-poly': 'Click the corners, click the first one (or Enter) to close', 'g-rect': 'Drag from corner to corner', 'g-circle': 'Click the centre, then the radius', 'g-reg': 'Click the centre, then a corner' };
          let st = '';
          if (!g.isEmpty()) { const conf = g.conflicts().length, dof = g.freedom(); st = ' · ' + (conf ? '⚠ ' + tr('{n} conflicting', { n: conf }) : dof === 0 ? '✓ ' + tr('fully determined') : tr('{n} degrees of freedom', { n: dof })); }
          hint.textContent = tr(tips[board.tool] || '1 unit = 1 grid square') + st;
        }
        el.hidden = !any;
        if (el.hidden) { lastKey = ''; return; }
        const key = I18N.lang + [...g.sel].join(',') + '|' + g.cons.length + '|' + g.ents.length + '|' + (board.geo.tmp ? 1 : 0) + '|' + g.points.map(p => Math.round(p.x) + ',' + Math.round(p.y)).join(';') + g.ents.map(e => e.r ? Math.round(e.r) : '').join(',');
        if (key === lastKey) return; lastKey = key;
        let html = '';
        if (!any) {
          const dof = g.freedom(), conf = g.conflicts().length;
          html = '<div class="gp-title">Geometry</div><p class="gp-hint">Click a shape, a side or a point to measure it and add constraints. <kbd>Shift</kbd>-click to select several (two sides → perpendicular, parallel, equal, angle…).</p>' +
            '<div class="gp-status ' + (conf ? 'bad' : dof === 0 ? 'good' : '') + '">' + statusText(conf, dof) + '</div>';
          el.innerHTML = html; return;
        }
        html += '<div class="gp-title">' + esc(names(s)) + '<button class="gp-x" title="Deselect">×</button></div>';
        const info = g.info();
        if (info.length) html += '<table class="gp-info">' + info.map(([k, v]) => '<tr><td>' + esc(trLabel(k)) + '</td><td>' + esc(v) + '</td></tr>').join('') + '</table>';
        const opts = g.options();
        if (opts.length) {
          html += '<div class="gp-sub">Constrain / construct</div><div class="gp-opts">';
          opts.forEach((o, i) => {
            if (o.val) {
              let cur = '';
              if (o.val === 'length') { if (s.S[0]) cur = geoFmt(g.segLen(s.S[0])); else if (s.C[0]) cur = geoFmt(s.C[0].r / GEO_UNIT); else if (s.P.length === 2) cur = geoFmt(Math.hypot(s.P[0].x - s.P[1].x, s.P[0].y - s.P[1].y) / GEO_UNIT); }
              if (o.val === 'angle') { if (s.S.length === 2) { const [A, V, B] = g.angleTriple(s.S[0].id, s.S[1].id); cur = geoFmt(g.angleAt(A, V, B)); } else if (s.P.length === 3) cur = geoFmt(g.angleAt(s.P[0], s.P[1], s.P[2])); }
              if (o.val === 'vertex') cur = '';
              html += '<div class="gp-val"><button data-i="' + i + '" class="gp-opt ' + o.kind + '">' + esc(o.label) + '</button><input data-i="' + i + '" value="' + esc(cur) + '" placeholder="' + tr(o.val === 'vertex' ? 'vertex, e.g. C' : o.val === 'angle' ? 'degrees' : 'units') + '"><span class="u">' + (o.val === 'angle' ? '°' : o.val === 'length' ? 'u' : '') + '</span></div>';
            } else html += '<button data-i="' + i + '" class="gp-opt ' + o.kind + '">' + esc(o.label) + '</button>';
          });
          html += '</div>';
        }
        const ids = new Set([...g.sel]);
        s.G.forEach(p => g.polyEdges(p).forEach(e => ids.add(e.id)));
        const mine = g.cons.filter(c => c.refs.some(r => ids.has(r)));
        if (mine.length) html += '<div class="gp-sub">Constraints</div><ul class="gp-cons">' + mine.map(c => '<li>' + esc(consLabel(c)) + '<button data-c="' + c.id + '" title="Remove">×</button></li>').join('') + '</ul>';
        const conf = g.conflicts().length, dof = g.freedom();
        html += '<div class="gp-status ' + (conf ? 'bad' : dof === 0 ? 'good' : '') + '">' + statusText(conf, dof) + '</div>';
        if (s.P.length + s.S.length + s.C.length + s.G.length) html += '<div class="gp-foot"><button class="gp-del">Delete selection</button></div>';
        el.innerHTML = html;
        el.querySelector('.gp-x').onclick = () => { g.sel.clear(); board.geoChanged(); };
        el.querySelectorAll('.gp-opt').forEach(b => b.onclick = () => {
          const o = opts[+b.dataset.i]; const inp = el.querySelector('input[data-i="' + b.dataset.i + '"]');
          let v; if (o.val) { v = o.val === 'vertex' ? inp.value : parseFloat(String(inp.value).replace(',', '.')); if (o.val !== 'vertex' && !(v > 0 || (o.val === 'angle' && v >= 0))) { inp.focus(); board.onStatus('Type a value first'); return; } }
          board.pushHistory();
          try { g.apply(o, v); board.onStatus(tr('{name} added', { name: tr(o.label) })); } catch (e) { board.history.pop(); board.onStatus(e.message); }
          lastKey = ''; board.geoChanged();
        });
        el.querySelectorAll('.gp-val input').forEach(inp => inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') el.querySelector('.gp-opt[data-i="' + inp.dataset.i + '"]').click(); }));
        el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { board.pushHistory(); g.cons = g.cons.filter(c => c.id !== +b.dataset.c); lastKey = ''; board.geoChanged(); });
        const del = el.querySelector('.gp-del'); if (del) del.onclick = () => { board.pushHistory(); g.removeIds([...g.sel]); board.cleanupGeo(); g.solve(); lastKey = ''; board.geoChanged(); };
      }
    };
  }

  // ======================================================= ask-mode settings
  function AskSettings(board, el) {
    const L = board.learner;
    const render = () => {
      const c = L.counts(), entries = Object.entries(c).sort((a, b) => b[1] - a[1]);
      el.querySelectorAll('input[name="askmode"]').forEach(r => { r.checked = r.value === L.mode; });
      el.querySelector('.as-stats').innerHTML = entries.length ? tr('Learned from {n} answers:', { n: '<b>' + L.samples.length + '</b>' }) + ' ' + entries.map(([y, n]) => esc(tr((INTENTS[y] || { label: y }).label)) + ' ' + n).join(' · ') : tr('Nothing learned yet — every answer you give in the “What is this?” menu teaches the board.');
    };
    el.querySelectorAll('input[name="askmode"]').forEach(r => r.onchange = () => { L.setMode(r.value); render(); });
    el.querySelector('.as-reset').onclick = () => { L.reset(); render(); board.onStatus('Forgot everything it had learned'); };
    return { render, toggle() { el.hidden = !el.hidden; if (!el.hidden) render(); } };
  }


  // ======================================================= right-hand toolbox (calculator / geometry palette)
  function Toolbox(board, el, eq, sys) {
    const calc = [
      ['x', 'x'], ['y', 'y'], ['π', 'π'], ['θ', 'θ'],
      ['x²', '^2'], ['xʸ', '^'], ['√', 'sqrt(', ')'], ['|x|', 'abs(', ')'],
      ['sin', 'sin('], ['cos', 'cos('], ['tan', 'tan('], ['°', '°'],
      ['ln', 'ln('], ['log', 'log('], ['eˣ', 'exp('], ['n!', '!'],
      ['(', '('], [')', ')'], ['⌫', null, null, 'back', 'fn'], ['C', null, null, 'clear', 'fn danger'],
      ['7', '7', null, null, 'num'], ['8', '8', null, null, 'num'], ['9', '9', null, null, 'num'], ['÷', '/', null, null, 'op'],
      ['4', '4', null, null, 'num'], ['5', '5', null, null, 'num'], ['6', '6', null, null, 'num'], ['×', '*', null, null, 'op'],
      ['1', '1', null, null, 'num'], ['2', '2', null, null, 'num'], ['3', '3', null, null, 'num'], ['−', '-', null, null, 'op'],
      ['0', '0', null, null, 'num'], ['.', '.', null, null, 'num'], ['=', '=', null, null, 'op eq'], ['+', '+', null, null, 'op'],
      ['◀', null, null, 'left', 'fn'], ['▶', null, null, 'right', 'fn'], ['≤', '<=', null, null, 'op'], ['≥', '>=', null, null, 'op']
    ];
    const calcKeys = [
      ['d/dx', 'd/dx(', ')', null, 'calc', 'Derivative: d/dx(x^2 sin(x))'], ['d²/dx²', 'diff(', ', x, 2)', null, 'calc', 'Second derivative'],
      ["f′(a)", 'diff(', ', x=1)', null, 'calc', 'Slope at a point: diff(f, x=a)'], ['⟋ tan', 'tangent(', ', 1)', null, 'calc', 'Tangent line: tangent(f, a)'],
      ['∫ₐᵇ', 'int(', ', 0, 1)', null, 'calc', 'Definite integral: int(f, a, b)'], ['lim', 'lim(', ', x→0)', null, 'calc', 'Limit: lim(f, x→a) — add + or − after a for one side'],
      ['→', '→', null, null, 'op', 'Tends to'], ['∞', '∞', null, null, 'op', 'Infinity'], [',', ', ', null, null, 'op', 'Separate arguments'],
      ['e', 'e', null, null, '', "Euler's number"], ['x→a⁺', '+', null, null, 'op', 'One-sided limit from the right (type after a)'], ['📝 Steps', null, null, 'steps', 'fn wide', 'Show the steps']
    ];
    const GEO_TOOLS = [
      ['g-select', '↖', 'Select', 'Select & drag (V)'], ['g-point', '•', 'Point', 'Point'], ['g-seg', '／', 'Segment', 'Segment'], ['g-poly', '△', 'Polygon', 'Polygon — click corners, click the first to close'],
      ['g-rect', '▭', 'Rectangle', 'Rectangle — drag corner to corner'], ['g-circle', '○', 'Circle', 'Circle — centre then radius'], ['g-reg', '⬡', 'Regular', 'Regular polygon — centre then a corner'], ['eraser', '⌫', 'Erase', 'Eraser']
    ];
    // palette buttons → the options they can trigger (first available wins)
    const GEO_CONS = [
      ['⟷', 'Length', ['length', 'distance', 'radius']], ['━', 'Horizontal', ['horizontal']], ['┃', 'Vertical', ['vertical']], ['⊥', 'Perpendicular', ['perpendicular']],
      ['∥', 'Parallel', ['parallel']], ['=', 'Equal', ['equal', 'equalRadius']], ['∠', 'Angle', ['angle', 'angle3', 'rightAngle']], ['T', 'Tangent', ['tangent']],
      ['⋯', 'On line', ['onLine', 'onCircle']], ['M', 'Midpoint', ['midpoint', 'midpointOf']], ['🔒', 'Fix', ['fix', 'unfix']], ['⬡', 'Regular', ['regular']]
    ];
    const GEO_BUILD = [
      ['◎', 'Incircle', ['incircle']], ['◯', 'Circumcircle', ['circumcircle', 'circleThrough']], ['⊾', 'Perp. foot', ['foot']], ['⊥', 'Bisector', ['perpBisector']],
      ['△', 'Altitudes', ['altitudes']], ['⋀', 'Medians', ['medians']], ['／', 'Join', ['join']], ['▲', 'Triangle', ['triangleOf']]
    ];
    el.innerHTML = `
      <div class="tb-pane" data-pane="eq">
        <div class="tb-title">Calculator</div>
        <div class="tb-calc"></div>
        <div class="tb-sub">Calculus</div>
        <div class="tb-calc tb-calculus"></div>
        <div class="tb-actions">
          <button class="tb-act plot" data-act="plot" title="Plot (Enter)">📈 Plot</button>
          <button class="tb-act" data-act="place" title="Place on the board (Shift+Enter)">＋ Place</button>
          <button class="tb-act solve" data-act="solve" title="Place with its solution">= Solve</button>
          <button class="tb-act" data-act="system" title="System of equations">{ } System</button>
          <button class="tb-act" data-act="axes" title="New coordinate axes">⊹ Axes</button>
          <button class="tb-act" data-act="steps" title="Step-by-step for calculus">📝 Steps</button>
        </div>
        <div class="tb-sub">Recent</div>
        <div class="tb-recent"></div>
      </div>
      <div class="tb-pane" data-pane="geo" hidden>
        <div class="tb-title">Draw</div>
        <div class="tb-tools"></div>
        <label class="tb-n">sides <button data-n="-1">−</button><span class="n">6</span><button data-n="1">+</button></label>
        <div class="tb-title">Constrain</div>
        <div class="tb-cons"></div>
        <div class="tb-title">Construct</div>
        <div class="tb-build"></div>
        <div class="tb-prompt" hidden><span class="lbl"></span><input><span class="u"></span><button class="ok">OK</button></div>
        <div class="tb-sel"></div>
      </div>`;
    const calcEl = el.querySelector('.tb-calc');
    const mkKey = host => ([label, text, close, fn, cls, tip]) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tb-key ' + (cls || ''); b.textContent = label; if (tip) b.title = tip;
      b.onmousedown = e => e.preventDefault();
      b.onclick = () => { if (fn) eq[fn](); else eq.insert(text, close); };
      host.appendChild(b);
    };
    calc.forEach(mkKey(calcEl));
    calcKeys.forEach(mkKey(el.querySelector('.tb-calculus')));
    el.querySelectorAll('[data-act]').forEach(b => {
      b.onmousedown = e => e.preventDefault();
      b.onclick = () => { const a = b.dataset.act; if (a === 'system') sys.toggle(); else if (a === 'axes') board.insertAxes(); else eq[a](); };
    });
    const renderRecent = () => {
      const r = el.querySelector('.tb-recent'), list = eq.recent();
      r.innerHTML = list.length ? '' : '<p class="tb-empty">Equations you plot or place appear here.</p>';
      list.forEach(v => { const b = document.createElement('button'); b.className = 'tb-chip'; b.title = tr('Use again: {x}', { x: v }); try { b.innerHTML = katex.renderToString(MathCore.analyze(v).latex, { throwOnError: false }); } catch (e) { b.textContent = v; } b.onclick = () => eq.set(v); r.appendChild(b); });
    };
    eq.onRecent = renderRecent; renderRecent();

    // geometry palette
    const toolsEl = el.querySelector('.tb-tools');
    GEO_TOOLS.forEach(([t, ic, label, tip]) => {
      const b = document.createElement('button'); b.className = 'tb-tool'; b.dataset.gtool = t; b.title = tip;
      b.innerHTML = '<span class="ic">' + ic + '</span><span class="lb">' + label + '</span>';
      b.onclick = () => { const btn = document.querySelector('.toolbar button[data-tool="' + t + '"], .geobar button[data-tool="' + t + '"]'); if (btn) btn.click(); else board.setTool(t); sync(); };
      toolsEl.appendChild(b);
    });
    el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { board.regularN = Math.max(3, Math.min(12, (board.regularN || 6) + +b.dataset.n)); el.querySelector('.tb-n .n').textContent = board.regularN; const ri = document.getElementById('reg-n'); if (ri) ri.value = board.regularN; });
    const mkPal = (host, defs) => defs.map(([ic, label, types]) => {
      const b = document.createElement('button'); b.className = 'tb-tool small'; b.innerHTML = '<span class="ic">' + ic + '</span><span class="lb">' + label + '</span>';
      b.onclick = () => run(types, label); host.appendChild(b); return { b, types };
    });
    const consBtns = mkPal(el.querySelector('.tb-cons'), GEO_CONS), buildBtns = mkPal(el.querySelector('.tb-build'), GEO_BUILD);
    const prompt = el.querySelector('.tb-prompt'), pIn = prompt.querySelector('input');
    let pending = null;
    const currentValue = o => {
      const g = board.geo, s = g.selection();
      if (o.val === 'length') { if (s.S[0]) return geoFmt(g.segLen(s.S[0])); if (s.C[0]) return geoFmt(s.C[0].r / GEO_UNIT); if (s.P.length === 2) return geoFmt(Math.hypot(s.P[0].x - s.P[1].x, s.P[0].y - s.P[1].y) / GEO_UNIT); }
      if (o.val === 'angle') { if (s.S.length === 2) { const [A, V, B] = g.angleTriple(s.S[0].id, s.S[1].id); return geoFmt(g.angleAt(A, V, B)); } if (s.P.length === 3) return geoFmt(g.angleAt(s.P[0], s.P[1], s.P[2])); }
      return '';
    };
    const apply = (o, v) => {
      board.pushHistory();
      try { board.geo.apply(o, v); board.onStatus(tr(o.label) + ' ✓'); } catch (e) { board.history.pop(); board.onStatus(e.message); }
      board.geoChanged();
    };
    function run(types, label) {
      const opts = board.geo.options(); const o = types.map(t => opts.find(x => x.type === t)).find(Boolean);
      if (!o) { board.onStatus(tr('{name}: select {what}', { name: tr(label), what: tr(hintFor(types)) })); return; }
      if (!o.val) { prompt.hidden = true; apply(o); return; }
      pending = o; prompt.hidden = false;
      prompt.querySelector('.lbl').textContent = o.label;
      prompt.querySelector('.u').textContent = o.val === 'angle' ? '°' : o.val === 'length' ? 'units' : '';
      pIn.value = currentValue(o); pIn.placeholder = o.val === 'vertex' ? 'vertex, e.g. C' : ''; pIn.focus(); pIn.select();
    }
    const okPrompt = () => {
      if (!pending) return; const o = pending; let v = pIn.value;
      if (o.val !== 'vertex') { v = parseFloat(String(v).replace(',', '.')); if (!(v > 0 || (o.val === 'angle' && v >= 0))) { pIn.focus(); return; } }
      prompt.hidden = true; pending = null; apply(o, v);
    };
    prompt.querySelector('.ok').onclick = okPrompt;
    pIn.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') okPrompt(); if (e.key === 'Escape') { prompt.hidden = true; pending = null; } });
    const hintFor = types => {
      const t = types[0];
      const map = { length: 'a side, a circle or two points', horizontal: 'a side', vertical: 'a side', perpendicular: 'two sides (Shift-click)', parallel: 'two sides (Shift-click)', equal: 'two sides or two circles', angle: 'two sides or three points', tangent: 'a side and a circle', onLine: 'a point and a side (or circle)', midpoint: 'a side (or a point and a side)', fix: 'a point', regular: 'a polygon', incircle: 'a triangle', circumcircle: 'a triangle or three points', foot: 'a point and a side', perpBisector: 'a side', altitudes: 'a triangle', medians: 'a triangle', join: 'two points', triangleOf: 'three points' };
      return map[t] || 'something first';
    };

    function sync() {
      const geoMode = !document.getElementById('geobar').hidden;
      el.querySelector('[data-pane="eq"]').hidden = geoMode; el.querySelector('[data-pane="geo"]').hidden = !geoMode;
      el.dataset.mode = geoMode ? 'geo' : 'eq';
      if (!geoMode) return;
      el.querySelectorAll('[data-gtool]').forEach(b => b.classList.toggle('on', b.dataset.gtool === board.tool));
      const opts = board.geo.options().map(o => o.type);
      [...consBtns, ...buildBtns].forEach(({ b, types }) => { const ok = types.some(t => opts.includes(t)); b.classList.toggle('avail', ok); b.setAttribute('aria-disabled', String(!ok)); });
      const s = board.geo.selection(), n = s.P.length + s.S.length + s.C.length + s.G.length;
      el.querySelector('.tb-sel').textContent = n ? tr('{n} selected — lit buttons apply to it', { n }) : tr('Select items to light up what you can do');
      if (pending && !opts.includes(pending.type)) { prompt.hidden = true; pending = null; }
    }
    return { sync, toggle() { el.classList.toggle('collapsed'); board.resize(); } };
  }


  // ======================================================= calculus steps panel
  function StepsPanel(board, el, eq) {
    let cur = '';
    const body = $('.cs-body', el);
    const close = () => { el.hidden = true; };
    $('.cs-close', el).onclick = close;
    $('.cs-plot', el).onclick = () => { try { board.plotEquation(cur.replace(/=\s*$/, '')); } catch (e) { board.onStatus(e.message); } };
    $('.cs-place', el).onclick = () => { board.startPlacing({ ascii: cur, solved: true }); close(); };
    return {
      open(src) {
        cur = src; let st;
        try { st = MathCore.calcSteps(src.replace(/=\s*$/, '')); } catch (e) { body.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; el.hidden = false; return; }
        let head = ''; try { head = K(MathCore.analyze(src).latex.replace(/=\s*$/, ''), { displayMode: true }); } catch (e) { /* */ }
        $('.cs-title', el).textContent = st.title;
        body.innerHTML = '<div class="cs-expr">' + head + '</div><ol class="sys-steps">' + st.steps.map(s => '<li><div class="t">' + esc(s.text) + '</div>' + (s.tex ? '<div class="m">' + K(I18N.tex(s.tex), { displayMode: true }) + '</div>' : '') + '</li>').join('') + '</ol>' +
          '<div class="sys-answer">' + K(I18N.tex((st.title === 'Tangent line' ? '' : '= ') + st.resultTex)) + '</div>';
        body.querySelectorAll('li').forEach((li, i) => { li.style.animationDelay = (i * 0.3) + 's'; });
        let plotable = false; try { const d = describe(src); plotable = d.plottable; } catch (e) { /* */ }
        $('.cs-plot', el).hidden = !plotable;
        el.hidden = false;
      }
    };
  }

  global.BoardUI = { StepsPanel, Toolbox, EqBar, SystemPanel, GraphsPanel, GeoPanel, AskSettings };
})(window);
