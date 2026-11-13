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
  function describe(ascii, board, at) {
    // points, vectors and names defined on the board (js/vectors.js); at = the line being edited
    const vr = board && board.vecAnalyze ? board.vecAnalyze(ascii, at || null) : null;
    if (vr && !vr.delegate) {
      if (vr.kind === 'error') return { ok: true, vec: true, tex: vr.latex, hint: '\\textcolor{#ff8f8f}{\\text{' + String(tr(vr.error || '?')).replace(/[{}\\^_$&#%~]/g, ' ') + '}}', plottable: false, solvable: false, info: { kind: 'vec' } };
      return { ok: true, vec: true, tex: vr.latex, hint: vr.resultTex.trim(), plottable: !!vr.drawable, solvable: false, info: { kind: 'vec' }, vr };
    }
    if (vr && vr.delegate) { const d = describe(vr.delegate); if (d.ok && vr.latex) d.tex = vr.latex; return d; }
    try {
      const info = MathCore.analyze(ascii);
      let hint = '';
      if (info.kind === 'evaluate' || info.kind === 'value') hint = (/=\s*$/.test(info.latex) ? '' : '= ') + info.resultTex;
      else if (info.kind === 'equation') {
        hint = '\\Rightarrow ' + info.resultTex;
        const cr = !(info.roots && info.roots.length) && window.VecCore && VecCore.complexRoots ? VecCore.complexRoots(ascii, board && board.vecScope ? board.vecScope() : null) : null;
        if (cr) hint = cr.resultTex.replace(/^\\quad/, '');
      }
      else if (info.kind === 'derivative') hint = '= ' + info.resultTex;
      else if (info.kind === 'tangent') hint = info.resultTex;
      const calcPlot = info.kind === 'derivative' ? info.plotVar === 'x' : info.kind === 'tangent' || (info.calc && info.kind === 'evaluate' && /^\s*(int|lim|∫)/.test(ascii));
      return { ok: true, tex: info.latex, hint, calc: !!info.calc, plottable: calcPlot || info.kind === 'function' || info.kind === 'relation' || (info.kind === 'expression' && info.vars.every(v => v === 'x')), solvable: info.kind === 'equation' || (info.calc && info.kind !== 'equation'), info };
    } catch (e) { return { ok: false, err: e.message }; }
  }

  // ======================================================= equation bar
  function EqBar(board, root) {
    const inp = $('#eq-input', root), pv = $('#eq-preview', root), keypad = $('#eq-keypad', root);
    // icon-only action buttons (the name stays for screen readers and in the tooltip)
    const ICONS = {
      'eq-plot': '<path d="M4 4v16h16"/><path d="M7 15c2.5-6 4.5-6 6.5-2.5S17.5 13 20 6"/>',
      'eq-place': '<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M12 8.5v7M8.5 12h7"/>',
      'eq-solve': '<path d="M3 9h9M3 15h9"/><path d="m14 12.5 3 3 5-7"/>',
      'eq-steps': '<path d="M3 20h5v-5h5v-5h5V5h3"/>'
    };
    // visually hidden (inline, so it works even with an older cached style sheet)
    const SR = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
    const keysBtn = $('#eq-keys', root);   // the toolbox toggle: icon only too
    if (keysBtn) {
      const l = keysBtn.querySelector('.lbl'); if (l) { l.classList.add('sr'); l.style.cssText = SR; }
      else [...keysBtn.childNodes].forEach(n => { if (n.nodeType === 3 && n.textContent.trim()) { const sp = document.createElement('span'); sp.className = 'lbl sr'; sp.style.cssText = SR; sp.textContent = n.textContent.replace(/^[^A-Za-z]+/, '').trim(); n.replaceWith(sp); } });
      if (!keysBtn.querySelector('svg')) keysBtn.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 24 24" aria-hidden="true" style="width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h1M11 10h2M16 10h1M7 14h10"/></svg>');
      keysBtn.classList.add('ico'); keysBtn.setAttribute('aria-label', 'Toolbox');
      Object.assign(keysBtn.style, { width: '34px', padding: '0', justifyContent: 'center' });
    }
    Object.keys(ICONS).forEach(id => {
      const b = $('#' + id, root); if (!b) return;
      const name = (b.querySelector('.lbl') || b).textContent.replace(/^[^A-Za-z]+/, '').trim() || id;
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" style="width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round">' + ICONS[id] + '</svg><span class="lbl sr" style="' + SR + '">' + name + '</span>';
      Object.assign(b.style, { width: id === 'eq-plot' ? '40px' : '34px', padding: '0', justifyContent: 'center' });
      b.classList.add('ico'); if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', name);
    });
    KEYS.forEach(([label, text, close]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'key'; b.innerHTML = label; b.onmousedown = e => e.preventDefault(); b.onclick = () => insertAt(inp, text, close); keypad.appendChild(b); });
    const update = () => {
      const v = inp.value.trim();
      if (!v) { pv.innerHTML = '<span class="muted">live preview</span>'; root.classList.remove('can-plot', 'can-solve', 'can-steps'); return; }
      const d = describe(v, board, editing);
      if (!d.ok) { pv.innerHTML = '<span class="err">' + esc(d.err) + '</span>'; root.classList.remove('can-plot', 'can-solve', 'can-steps'); return; }
      pv.innerHTML = K(d.tex) + (d.hint ? ' <span class="hint">' + K(I18N.tex(d.hint)) + '</span>' : '');
      root.classList.toggle('can-plot', d.plottable); root.classList.toggle('can-solve', d.solvable); root.classList.toggle('can-steps', d.calc);
    };
    inp.addEventListener('input', update);
    let recent = Store.getJSON('chalkproof.recent', []) || [];
    const remember = v => { recent = [v].concat(recent.filter(r => r !== v)).slice(0, 8); Store.setJSON('chalkproof.recent', recent); api.onRecent && api.onRecent(); };
    const plot = () => { const v = inp.value.trim(); if (!v) return inp.focus(); try { board.plotEquation(v); remember(v); board.onStatus(tr('Plotted {x} — scroll on the axes to zoom, hover the curve to trace', { x: v })); inp.select(); } catch (e) { board.onStatus(e.message); } };
    const place = (opts = {}) => { const v = inp.value.trim(); if (!v) return inp.focus(); if (!describe(v, board).ok) { board.onStatus('Check the equation first'); return; } board.startPlacing(Object.assign({ ascii: v }, opts)); remember(v); inp.blur(); };
    // ---- editing a formula that is already on the board (double-click / ✎): it is loaded into this field
    let editing = null, saved = '';
    const banner = document.createElement('div'); banner.className = 'eq-editing'; banner.hidden = true;
    banner.innerHTML = '<span class="lbl">Editing the formula on the board</span><button type="button" class="ok">✓ Update</button><button type="button" class="no">✕ Cancel</button>';
    root.querySelector('.eq-field').appendChild(banner);
    banner.onmousedown = e => { if (e.target.closest('button')) e.preventDefault(); };
    const endEdit = () => { editing = null; banner.hidden = true; root.classList.remove('is-editing'); inp.value = saved; update(); };
    const commitEdit = () => { const m = editing; if (!m) return; const v = inp.value.trim(); if (v && !describe(v, board, m).ok) { board.onStatus('Check the equation first'); inp.focus(); return; } board.commitMath(m, v); endEdit(); board.onStatus(v ? tr('Formula updated') : tr('Formula removed')); };
    const cancelEdit = () => { if (!editing) return; board.cancelEditMath(); endEdit(); };
    banner.querySelector('.ok').onclick = commitEdit;
    banner.querySelector('.no').onclick = cancelEdit;
    const startEdit = m => {
      if (!editing) saved = inp.value;
      editing = m; banner.hidden = false; root.classList.add('is-editing');
      inp.value = m.ascii || ''; update(); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
    };
    inp.addEventListener('keydown', e => {
      if (editing && (e.key === 'Enter' || e.key === 'Escape')) { e.stopPropagation(); e.preventDefault(); if (e.key === 'Enter') commitEdit(); else cancelEdit(); return; }
    }, true);
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (editing) return;
      if (e.key === 'Enter') {
        e.preventDefault(); const v = inp.value.trim(), d = describe(v, board);
        // worksheet lines (P1 = (1,1,1), u·v, …) go straight under the previous line, drawn too when they are 2-D
        if (d.ok && d.vec && !e.shiftKey) { board.addTyped(v, d.plottable); remember(v); inp.value = ''; update(); board.onStatus(tr('Added — the next lines can use it')); return; }
        if (e.shiftKey || !d.ok || !d.plottable) place(); else plot();
      }
      if (e.key === 'Escape') inp.blur();
    });
    $('#eq-plot', root).onclick = plot;
    $('#eq-place', root).onclick = () => place();
    $('#eq-solve', root).onclick = () => { const d = describe(inp.value.trim(), board); if (d.ok && (d.solvable || d.info.kind === 'evaluate' || d.info.kind === 'value' || d.calc)) place({ solved: true }); else { board.onStatus(d.ok ? 'Nothing to solve — try an equation with one unknown, or use { System' : 'Check the equation first'); } };
    const solve = () => $('#eq-solve', root).onclick();
    const steps = () => { const v = inp.value.trim(); const d = describe(v, board); if (!d.ok) { board.onStatus('Check the expression first'); return; } if (!d.calc) { board.onStatus('Steps are for calculus: d/dx(…), lim(…), int(…), tangent(…)'); return; } api.onSteps && api.onSteps(v); };
    $('#eq-steps', root).onclick = steps;
    update();
    const api = {
      focus: () => inp.focus(), set: v => { inp.value = v; update(); inp.focus(); },
      insert: (t, close) => insertAt(inp, t, close),
      back: () => { const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a; if (a !== b) { inp.value = inp.value.slice(0, a) + inp.value.slice(b); inp.setSelectionRange(a, a); } else if (a > 0) { inp.value = inp.value.slice(0, a - 1) + inp.value.slice(a); inp.setSelectionRange(a - 1, a - 1); } inp.focus(); update(); },
      clear: () => { inp.value = ''; update(); inp.focus(); },
      left: () => { const a = Math.max(0, (inp.selectionStart ?? 0) - 1); inp.focus(); inp.setSelectionRange(a, a); },
      right: () => { const a = Math.min(inp.value.length, (inp.selectionEnd ?? 0) + 1); inp.focus(); inp.setSelectionRange(a, a); },
      refresh: update, plot, place: () => place(), solve, steps, recent: () => recent, onRecent: null, onSteps: null,
      edit: startEdit, commitEdit, cancelEdit, isEditing: () => !!editing
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
      const up = () => { const d = describe(i.value.trim(), board); r.querySelector('.pv').innerHTML = !i.value.trim() ? '' : d.ok ? K(d.tex) : '<span class="err">?</span>'; preview(); };
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
    $('.gl-zin', el).onclick = () => { const ax = board.targetAxes(); if (ax) board.zoomAxes(ax, 1.25); };
    $('.gl-zout', el).onclick = () => { const ax = board.targetAxes(); if (ax) board.zoomAxes(ax, 0.8); };
    // several axes: choose where new graphs go, and move a graph to other axes
    const target = document.createElement('div'); target.className = 'gl-target'; list.before(target);
    const axSelect = (sel, onPick) => {
      const s = document.createElement('select'); s.className = 'gl-ax'; s.title = tr('Axes');
      board.axesList().forEach((a, i) => { const o = document.createElement('option'); o.value = a.id; o.textContent = '⊹ ' + (i + 1); if (a.id === sel) o.selected = true; s.appendChild(o); });
      s.onchange = () => onPick(+s.value); s.onkeydown = e => e.stopPropagation(); return s;
    };
    let last = '';
    return {
      sync() {
        const gs = board.graphs();
        const axes = board.axesList(), tgt = board.targetAxes();
        const key = gs.map(g => g.id + g.eq + g.color + !!g.hidden + '@' + g.axes).join('|') + I18N.lang + '#' + axes.map(a => a.id).join(',') + '>' + (tgt && tgt.id);
        el.hidden = !gs.length;
        if (key === last) return; last = key;
        list.innerHTML = '';
        target.innerHTML = ''; target.hidden = axes.length < 2;
        if (axes.length > 1) {
          const l = document.createElement('span'); l.textContent = tr('New graphs go on'); target.appendChild(l);
          target.appendChild(axSelect(tgt && tgt.id, id => board.setPlotAxes(id)));
        }
        gs.forEach(g => {
          const r = document.createElement('div'); r.className = 'gl-row' + (g.hidden ? ' off' : '');
          let tex = g.eq; try { tex = MathCore.analyze(g.eq).latex; } catch (e) { /* */ }
          r.innerHTML = '<button class="sw" title="Change colour" style="background:' + g.color + '"></button><span class="eq">' + K(tex) + '</span><button class="eye" title="Show / hide">' + (g.hidden ? '◌' : '◉') + '</button><button class="del" title="Remove">×</button>' +
            (g.mode === 'explicit' ? '<div class="gl-tools"><button data-t="d" title="Plot the derivative f′">f′</button><button data-t="t" title="Tangent line at x = a">⟋ tangent</button><button data-t="a" title="Shade the area / integral from a to b">∫ area</button></div><div class="gl-form" hidden></div>' : '');
          if (axes.length > 1) r.insertBefore(axSelect(g.axes, id => board.moveGraph(g.id, id)), r.querySelector('.eye'));
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
      ['mod', ' mod ', null, null, 'op'], ['%', '%', null, null, 'op'], ['<', '<', null, null, 'op'], ['>', '>', null, null, 'op'],
      // digits, + − × ÷ =, brackets, cursor and delete keys are left to the keyboard
      ['≤', '<=', null, null, 'op'], ['≥', '>=', null, null, 'op']
    ];
    const calcKeys = [
      ['d/dx', 'd/dx(', ')', null, 'calc', 'Derivative: d/dx(x^2 sin(x))'], ['d²/dx²', 'diff(', ', x, 2)', null, 'calc', 'Second derivative'],
      ["f′(a)", 'diff(', ', x=1)', null, 'calc', 'Slope at a point: diff(f, x=a)'], ['⟋ tan', 'tangent(', ', 1)', null, 'calc', 'Tangent line: tangent(f, a)'],
      ['∫ₐᵇ', 'int(', ', 0, 1)', null, 'calc', 'Definite integral: int(f, a, b)'], ['lim', 'lim(', ', x→0)', null, 'calc', 'Limit: lim(f, x→a) — add + or − after a for one side'],
      ['→', '→', null, null, 'op', 'Tends to'], ['∞', '∞', null, null, 'op', 'Infinity'], [',', ', ', null, null, 'op', 'Separate arguments'],
      ['e', 'e', null, null, '', "Euler's number"], ['x→a⁺', '+', null, null, 'op', 'One-sided limit from the right (type after a)'], ['📝 Steps', null, null, 'steps', 'fn wide', 'Show the steps']
    ];
    const vecKeys = [   // points, vectors and named results (js/vectors.js)
      ['A=(,)', 'A = (', ')', null, 'calc', 'A point: P1 = (1, 2, 3) — capital names are points'], ['u=(,)', 'u = (', ')', null, 'calc', 'A vector: u = (2, -1) — lower-case names are vectors'],
      ['AB→', 'AB→', null, null, 'calc', 'Two point names together: the vector from the first to the second (P1P2 = P2 − P1); the arrow is optional'], ['|u|', '|', '|', null, 'calc', 'Length: |u|, |AB|'],
      ['u·v', '·', null, null, 'op', 'Dot product (also u*v)'], ['u×v', '×', null, null, 'op', 'Cross product (3-D)'],
      ['det', 'det(', ')', null, 'calc', 'Determinant of 2 or 3 vectors: det(u, v, w)'], ['∠', 'angle(', ')', null, 'calc', 'Angle between two vectors: angle(u, v)'],
      ['area', 'area(', ')', null, 'calc', 'Area of the triangle ABC: area(A, B, C)'], ['vol', 'volume(', ')', null, 'calc', 'Volume of the tetrahedron ABCD: volume(A, B, C, D)'],
      ['→', '→', null, null, 'op', 'Vector arrow: u→ or AB→ (optional)'], [':=', ' := ', null, null, 'op', 'Define (or redefine) a name: k := 2'], [',', ', ', null, null, 'op', 'Separate coordinates'], ['dist', 'dist(', ')', null, 'calc', 'Distance between two points: dist(A, B)']
    ];
    const cxKeys = [   // complex numbers (js/vectors.js)
      ['i', 'i', null, null, 'calc', 'Imaginary unit: z = 3 + 4i'], ['z̄', 'conj(', ')', null, 'calc', 'Conjugate: conj(z)'], ['|z|', '|', '|', null, 'calc', 'Modulus: |z|'], ['arg', 'arg(', ')', null, 'calc', 'Argument (angle): arg(z)'],
      ['Re', 'Re(', ')', null, 'calc', 'Real part: Re(z)'], ['Im', 'Im(', ')', null, 'calc', 'Imaginary part: Im(z)'], ['cis', 'cis(', ')', null, 'calc', 'cis θ = cos θ + i sin θ: z = 2 cis(pi/3)'], ['eⁱᶿ', 'e^(i*', ')', null, 'calc', 'Polar form: r e^(iθ)']
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
    // line icons for the geometry palette (24 × 24, drawn in the button's colour; .d = filled dot, .f = soft fill, .h = dashed helper)
    const GI = {
      Select: '<path d="M6 3.5 18 12l-5.2 1.1 2.9 5.6-2.2 1.1-2.9-5.6L6.8 18z" class="f"/>',
      Point: '<circle cx="12" cy="12" r="6.5" class="h"/><circle cx="12" cy="12" r="2.6" class="d"/>',
      Segment: '<path d="M5.5 18.5 18.5 5.5"/><circle cx="5.5" cy="18.5" r="2" class="d"/><circle cx="18.5" cy="5.5" r="2" class="d"/>',
      Polygon: '<path d="M6 18 4 9.5l7-5.5 8.5 4-1.5 10z" class="f"/><circle cx="6" cy="18" r="1.6" class="d"/><circle cx="4" cy="9.5" r="1.6" class="d"/><circle cx="11" cy="4" r="1.6" class="d"/><circle cx="19.5" cy="8" r="1.6" class="d"/><circle cx="18" cy="18" r="1.6" class="d"/>',
      Rectangle: '<rect x="3.5" y="6.5" width="17" height="11" rx=".5" class="f"/><circle cx="3.5" cy="6.5" r="1.6" class="d"/><circle cx="20.5" cy="17.5" r="1.6" class="d"/>',
      Circle: '<circle cx="12" cy="12" r="8" class="f"/><path d="M12 12h8"/><circle cx="12" cy="12" r="1.7" class="d"/>',
      Regular: '<path d="m12 3.5 7.4 4.25v8.5L12 20.5l-7.4-4.25v-8.5z" class="f"/>',
      Erase: '<path d="M7.5 20H20"/><path d="M4.6 15.4a2 2 0 0 1 0-2.8l8-8a2 2 0 0 1 2.8 0l4 4a2 2 0 0 1 0 2.8L11 20H8.2a2 2 0 0 1-1.4-.6Z"/><path d="m9 8 7 7"/>',
      Length: '<path d="M4 15h16M4 12v6M20 12v6"/><path d="m7 13 -2 2 2 2M17 13l2 2-2 2"/><path d="M9 8.5h6" class="h"/>',
      Horizontal: '<path d="M4 12h16"/><circle cx="4.5" cy="12" r="1.8" class="d"/><circle cx="19.5" cy="12" r="1.8" class="d"/><path d="M8 17h8" class="h"/>',
      Vertical: '<path d="M12 4v16"/><circle cx="12" cy="4.5" r="1.8" class="d"/><circle cx="12" cy="19.5" r="1.8" class="d"/><path d="M17 8v8" class="h"/>',
      Perpendicular: '<path d="M4 19h16M12 19V5"/><path d="M12 15h4v4"/>',
      Parallel: '<path d="M5 18 13 5M11 19l8-13"/>',
      Equal: '<path d="M4 8.5h16M4 15.5h16"/><path d="M11 6.5v4M13 6.5v4M11 13.5v4M13 13.5v4"/>',
      Angle: '<path d="M4 19h16M4 19 15 6"/><path d="M10 19a6 6 0 0 0-2-4.6"/>',
      Tangent: '<circle cx="11" cy="11" r="6" class="f"/><path d="M3 17h18"/><circle cx="11" cy="17" r="1.6" class="d"/>',
      'On line': '<path d="M3 17 21 7"/><circle cx="12" cy="12" r="2.4" class="d"/><path d="M12 12v-6" class="h"/>',
      Midpoint: '<path d="M3.5 15h17"/><circle cx="3.5" cy="15" r="1.6" class="d"/><circle cx="20.5" cy="15" r="1.6" class="d"/><circle cx="12" cy="15" r="2.4" class="d"/><path d="M7.5 12.5v5M16.5 12.5v5"/>',
      Fix: '<rect x="5" y="10.5" width="14" height="10" rx="2" class="f"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15.5" r="1.4" class="d"/>',
      'Regular ': '<path d="m12 3.5 7.4 4.25v8.5L12 20.5l-7.4-4.25v-8.5z"/><path d="M15.5 4.6l-.9 1.6M20 12h-1.8M15.5 19.4l-.9-1.6M8.5 19.4l.9-1.6M4 12h1.8M8.5 4.6l.9 1.6"/>',
      Incircle: '<path d="M12 3 21 19.5H3z"/><circle cx="12" cy="14" r="4.6" class="f"/>',
      Circumcircle: '<circle cx="12" cy="12" r="8.8" class="f"/><path d="M12 3.2 19.6 16.4H4.4z"/>',
      'Perp. foot': '<path d="M3 19h18"/><path d="M12 5v14" class="h"/><circle cx="12" cy="5" r="2" class="d"/><path d="M12 15.5h3.5V19"/><circle cx="12" cy="19" r="1.8" class="d"/>',
      Bisector: '<path d="M4 15h16"/><circle cx="4" cy="15" r="1.6" class="d"/><circle cx="20" cy="15" r="1.6" class="d"/><path d="M12 3v18" class="h"/><path d="M12 11.5h3.5V15"/>',
      Altitudes: '<path d="M9 4 21 19.5H3z"/><path d="M9 4v15.5" class="h"/><path d="M9 16.5h2.8v3"/>',
      Medians: '<path d="M12 3.5 21 19.5H3z"/><path d="M12 3.5v16M3 19.5l13.5-8M21 19.5l-13.5-8" class="h"/>',
      Join: '<path d="M5 17 19 7"/><circle cx="5" cy="17" r="2.4" class="d"/><circle cx="19" cy="7" r="2.4" class="d"/>',
      Triangle: '<path d="M12 4 20 19H4z" class="f"/><circle cx="12" cy="4" r="1.8" class="d"/><circle cx="20" cy="19" r="1.8" class="d"/><circle cx="4" cy="19" r="1.8" class="d"/>'
    };
    const gicon = (name, fallback) => GI[name] ? '<svg viewBox="0 0 24 24" aria-hidden="true">' + GI[name] + '</svg>' : fallback;
    el.innerHTML = `
      <div class="tb-pane" data-pane="eq">
        <div class="tb-title">Calculator</div>
        <div class="tb-calc"></div>
        <div class="tb-sub">Calculus</div>
        <div class="tb-calc tb-calculus"></div>
        <div class="tb-sub" title="Name points and vectors, then use the names in the lines below">Vectors</div>
        <div class="tb-calc tb-calculus tb-vectors"></div>
        <div class="tb-sub" title="z = 3 + 4i — equations in z are solved over the complex numbers; Plot draws them on the complex plane">Complex numbers</div>
        <div class="tb-calc tb-calculus tb-complex"></div>
        <div class="tb-actions">
          <button class="tb-act plot" data-act="plot" title="Plot (Enter)">📈 Plot</button>
          <button class="tb-act" data-act="place" title="Place on the board (Shift+Enter)">＋ Place</button>
          <button class="tb-act solve" data-act="solve" title="Place with its solution">= Solve</button>
          <button class="tb-act" data-act="system" title="System of equations">{ } System</button>
          <button class="tb-act" data-act="matrix" title="Matrices and determinants">▦ Matrices</button>
        </div>
      </div>
      <div class="tb-pane" data-pane="geo" hidden>
        <div class="tb-title">Draw</div>
        <div class="tb-tools"></div>
        <label class="tb-n">sides <button data-n="-1">−</button><span class="n">6</span><button data-n="1">+</button></label>
        <label class="tb-snap" title="Circles snap to the sides of polygons (tangent) and into corners · hold Alt to drag freely"><input type="checkbox" class="tb-snap-in"> Snap circles to sides</label>
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
    vecKeys.forEach(mkKey(el.querySelector('.tb-vectors')));
    cxKeys.forEach(mkKey(el.querySelector('.tb-complex')));
    el.querySelectorAll('[data-act]').forEach(b => {
      b.onmousedown = e => e.preventDefault();
      b.onclick = () => { const a = b.dataset.act; if (a === 'system') sys.toggle(); else if (a === 'matrix') { global.ui_matrix && global.ui_matrix.toggle(); } else if (a === 'axes') board.insertAxes(); else eq[a](); };
    });

    // geometry palette
    const toolsEl = el.querySelector('.tb-tools');
    GEO_TOOLS.forEach(([t, ic, label, tip]) => {
      const b = document.createElement('button'); b.className = 'tb-tool'; b.dataset.gtool = t; b.title = tip;
      b.innerHTML = '<span class="ic">' + gicon(label, ic) + '</span><span class="lb">' + label + '</span>';
      b.onclick = () => { const btn = document.querySelector('.toolbar button[data-tool="' + t + '"], .geobar button[data-tool="' + t + '"]'); if (btn) btn.click(); else board.setTool(t); sync(); };
      toolsEl.appendChild(b);
    });
    el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { board.regularN = Math.max(3, Math.min(12, (board.regularN || 6) + +b.dataset.n)); el.querySelector('.tb-n .n').textContent = board.regularN; const ri = document.getElementById('reg-n'); if (ri) ri.value = board.regularN; });
    const snapIn = el.querySelector('.tb-snap-in');
    if (snapIn) { snapIn.checked = board.snap !== false; snapIn.onchange = () => { board.snap = snapIn.checked; const g = document.getElementById('geo-snap'); if (g) g.checked = snapIn.checked; }; document.addEventListener('change', e => { if (e.target && e.target.id === 'geo-snap') snapIn.checked = e.target.checked; }); }
    const mkPal = (host, defs) => defs.map(([ic, label, types]) => {
      const b = document.createElement('button'); b.className = 'tb-tool small'; b.innerHTML = '<span class="ic">' + gicon(host.classList.contains('tb-cons') && label === 'Regular' ? 'Regular ' : label, ic) + '</span><span class="lb">' + label + '</span>';
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
