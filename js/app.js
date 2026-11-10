/* App glue: categories, puzzle card, answer selection, confirmation and the animated solution. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const LETTERS = 'ABCDEFGH';

  // render text with $…$ math
  function mathText(el, html) {
    el.innerHTML = html.replace(/\$([^$]+)\$/g, (_, t) => katex.renderToString(t, { throwOnError: false }));
    return el;
  }
  const tex = (t, display) => katex.renderToString(t, { throwOnError: false, displayMode: !!display });

  const state = { cat: 'geometry', puzzle: null, options: [], selected: new Set(), none: false, confirmed: false, fig: null, solTimer: null, stepIdx: -1, auto: true };

  // ---------- board ----------
  const status = $('#board-status');
  let statusT, ui = {};
  let board = null;
  board = new SmartBoard($('#board'), {
    onStatus(msg, actions) {
      status.innerHTML = ''; const t = document.createElement('span'); t.textContent = msg; status.appendChild(t);
      (actions || []).forEach(([label, fn]) => { const btn = document.createElement('button'); btn.textContent = label; btn.onclick = () => { fn(); status.classList.remove('show'); }; status.appendChild(btn); });
      status.classList.add('show'); clearTimeout(statusT); statusT = setTimeout(() => status.classList.remove('show'), actions && actions.length ? 6500 : 3400);
    },
    onChange() { if (!board) return; $('#board-empty').classList.toggle('hide', !board.isEmpty()); ui.graphs && ui.graphs.sync(); },
    onGeo() { ui.geo && ui.geo.sync(); ui.tools && ui.tools.sync(); },
    onSteps(list) { ui.sys.openSteps(list); },
    onEditSystem(m) { ui.sys.open(m.system, m); },
    onCalcSteps(src) { ui.steps.open(src); },
    onModeChange() { ui.ask && ui.ask.render(); }
  });
  ui.eq = BoardUI.EqBar(board, $('#eqbar'));
  ui.sys = BoardUI.SystemPanel(board, $('#sys-panel'));
  ui.graphs = BoardUI.GraphsPanel(board, $('#graphs-panel'));
  ui.geo = BoardUI.GeoPanel(board, $('#geo-panel'));
  ui.ask = BoardUI.AskSettings(board, $('#ask-panel'));
  ui.steps = BoardUI.StepsPanel(board, $('#calc-panel'), ui.eq);
  ui.eq.onSteps = src => ui.steps.open(src);
  ui.tools = BoardUI.Toolbox(board, $('#toolbox'), ui.eq, ui.sys);
  ui.graphs.sync(); ui.geo.sync(); ui.tools.sync();
  I18N.onChange(() => { board.render(); ui.graphs.sync(); ui.geo.sync(); ui.tools.sync(); if (!$('#ask-panel').hidden) ui.ask.render(); ui.eq.set && ui.eq.refresh && ui.eq.refresh(); });
  $('#eq-keys').onclick = () => { ui.tools.toggle(); $('#eq-keys').classList.toggle('on', !$('#toolbox').classList.contains('collapsed')); };

  const selectTool = t => { board.setTool(t); $$('button[data-tool]').forEach(x => x.classList.toggle('on', x.dataset.tool === t)); ui.tools && ui.tools.sync(); };
  $$('button[data-tool]').forEach(b => b.addEventListener('click', () => selectTool(b.dataset.tool)));
  $$('[data-color]').forEach(b => {
    b.style.setProperty('--sw', BOARD_COLORS[b.dataset.color]);
    b.addEventListener('click', () => { board.setColor(b.dataset.color); $$('[data-color]').forEach(x => x.classList.toggle('on', x === b)); if (board.tool === 'eraser' || board.tool === 'move') selectTool('smart'); });
  });
  const showTab = t => {
    $$('.tab').forEach(x => x.classList.toggle('on', x.dataset.tab === t));
    $('#eqbar').hidden = t !== 'eq'; $('#geobar').hidden = t !== 'geo';
    if (t === 'geo' && !board.tool.startsWith('g-')) selectTool('g-select');
    if (t === 'eq' && board.tool.startsWith('g-')) selectTool('smart');
    ui.tools && ui.tools.sync();
  };
  $$('.tab').forEach(b => b.onclick = () => showTab(b.dataset.tab));
  $('#reg-n').addEventListener('input', e => { board.regularN = +e.target.value || 6; });
  $('#reg-n').addEventListener('keydown', e => e.stopPropagation());
  $('#geo-measures').onchange = e => { board.geo.showMeasures = e.target.checked; board.render(); };
  $('#geo-angles').onchange = e => { board.geo.showAngles = e.target.checked; board.render(); };
  $('#eq-system').onclick = () => ui.sys.toggle();
  $('#btn-undo').onclick = () => board.undo();
  $('#btn-redo').onclick = () => board.redo();
  $('#btn-clear').onclick = () => board.clear();
  $('#btn-axes').onclick = () => board.insertAxes();
  $('#btn-ask').onclick = () => ui.ask.toggle();
  $('#ask-panel .as-close').onclick = () => ui.ask.toggle();
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? board.redo() : board.undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); board.redo(); }
    if (board.menu) return;
    const map = { s: 'smart', p: 'pen', e: 'eraser', m: 'move', v: 'g-select' };
    if (!e.ctrlKey && !e.metaKey && !e.altKey && map[e.key]) { if (map[e.key] === 'g-select') showTab('geo'); else if ($('#geobar').hidden === false && map[e.key] !== 'eraser' && map[e.key] !== 'move') showTab('eq'); selectTool(map[e.key]); }
  });
  $('#btn-help').onclick = () => $('#help').classList.toggle('open');
  $('#help').addEventListener('click', e => { if (e.target.id === 'help' || e.target.closest('.close')) $('#help').classList.remove('open'); });

  // ---------- categories ----------
  const tabs = $('#cats');
  PuzzleBank.categories.forEach(c => {
    const n = PuzzleBank.count(c.id);
    const b = document.createElement('button');
    b.className = 'cat'; b.dataset.cat = c.id; b.disabled = !n;
    b.title = c.name;
    b.innerHTML = `<span class="ico">${c.icon}</span><span class="nm">${c.name}</span><span class="sh">${c.short}</span><span class="n">${n ? n : tr('soon')}</span>`;
    b.onclick = () => { state.cat = c.id; show(PuzzleBank.random(c.id)); };
    tabs.appendChild(b);
  });
  $('#btn-random').onclick = () => show(PuzzleBank.random(state.cat, state.base && state.base.id));
  // puzzle files load on demand; only the latest request is shown
  let showSeq = 0;
  function show(promise) { const my = ++showSeq; return Promise.resolve(promise).then(p => { if (my === showSeq && p) load(p); }).catch(err => console.error(err)); }

  // ---------- puzzle ----------
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // the puzzle in the current language (options keep their shuffled order)
  function localize() {
    state.puzzle = PuzzleBank.localize(state.base);
    state.options = state.order.map(i => state.puzzle.options[i]);
  }
  function renderTexts() {
    const p = state.puzzle;
    const cat = PuzzleBank.categories.find(c => c.id === p.category);
    $('#p-cat').textContent = tr(cat.name);
    $('#p-diff').innerHTML = '●'.repeat(p.difficulty) + '<i>' + '●'.repeat(3 - p.difficulty) + '</i>';
    $('#p-title').textContent = p.title;
    mathText($('#p-statement'), p.statement);
    mathText($('#p-hint-text'), p.hint || '');
    $('#p-hint').hidden = !p.hint;
  }
  function load(p) {
    if (!p) return;
    clearTimeout(state.solTimer);
    try { const url = new URL(location.href); url.searchParams.set('p', p.id); url.searchParams.delete('cat'); history.replaceState(null, '', url); } catch (e) { /* file:// in some browsers */ }
    Object.assign(state, { base: p, order: shuffle(p.options.map((_, i) => i)), selected: new Set(), none: false, confirmed: false, answered: false, stepIdx: -1 });
    localize();
    $$('.cat').forEach(b => b.classList.toggle('on', b.dataset.cat === p.category));
    renderTexts();
    $('#p-hint').classList.remove('open');
    state.fig = state.puzzle.figure($('#p-figure'));
    renderOptions();
    $('#result').hidden = true; $('#solution').hidden = true; $('#steps').innerHTML = '';
    $('#answer-zone').classList.remove('locked'); $('#card').classList.remove('solving');
    $('#card').classList.remove('enter'); void $('#card').offsetWidth; $('#card').classList.add('enter');
    board.reset();
    // fresh left panel for the new problem
    const card = $('#card'); card.scrollTop = 0; card.classList.remove('solving');
    $('#steps').innerHTML = ''; $('#step-count').textContent = ''; $('#btn-next').disabled = false; state.auto = true; $('#btn-auto').textContent = tr('❚❚ Pause');
    const aiPop = $('#ai-pop'); if (aiPop) { aiPop.hidden = true; $('#btn-ai').setAttribute('aria-expanded', 'false'); const mine = $('#ai-mine'); if (mine) mine.checked = false; }
    $$('.opt').forEach(b => b.classList.remove('is-correct', 'is-wrong', 'bad', 'missed'));
    $('#opt-none').classList.remove('is-correct', 'is-wrong', 'bad', 'sel'); $('#opt-none').querySelector('.mark').textContent = '';
    updateActions();
  }

  function renderOptions() {
    const g = $('#options'); g.innerHTML = '';
    state.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt'; b.dataset.i = i;
      b.innerHTML = `<span class="letter">${LETTERS[i]}</span><span class="tex">${tex(o.tex)}</span><span class="mark"></span>`;
      b.onclick = () => {
        if (state.confirmed) return;
        state.selected.has(i) ? state.selected.delete(i) : state.selected.add(i);
        state.none = false; updateActions();
      };
      g.appendChild(b);
    });
    fitOptions();
  }
  // two columns when every option fits, one column as soon as any option would be cut off
  function fitOptions() {
    const g = $('#options'); if (!g.children.length) return;
    g.classList.remove('one');
    const cut = [...g.querySelectorAll('.opt .tex')].some(t => t.scrollWidth > t.clientWidth + 1);
    g.classList.toggle('one', cut);
  }
  let fitW = 0;
  new ResizeObserver(en => { const w = Math.round(en[0].contentRect.width); if (w !== fitW) { fitW = w; fitOptions(); } }).observe($('#options'));
  if (document.fonts) document.fonts.ready.then(fitOptions);
  $('#opt-none').onclick = () => { if (state.confirmed) return; state.none = !state.none; if (state.none) state.selected.clear(); updateActions(); };

  function updateActions() {
    $$('.opt').forEach(b => b.classList.toggle('sel', state.selected.has(+b.dataset.i)));
    $('#opt-none').classList.toggle('sel', state.none);
    const has = state.selected.size || state.none;
    $('#btn-confirm').disabled = !has || state.confirmed;
    const list = [...state.selected].sort().map(i => LETTERS[i]);
    $('#sel-summary').textContent = state.confirmed ? '' : state.none ? tr('Your answer: none of them is correct') : list.length ? tr('Your answer: {list}', { list: list.join((' ' + tr('and') + ' ')) }) : tr('Pick every option you think is correct — one, two, or none.');
  }

  $('#btn-hint').onclick = () => $('#p-hint').classList.toggle('open');

  $('#btn-confirm').onclick = () => { if (!$('#btn-confirm').disabled) finish(true); };
  $('#btn-reveal').onclick = () => finish(false);

  function finish(answered) {
    if (state.confirmed) return;
    state.confirmed = true; state.answered = answered;
    markAnswers();
    startSolution();
  }
  function markAnswers() {
    const answered = state.answered;
    $('#answer-zone').classList.add('locked');
    const correct = new Set(state.options.map((o, i) => (o.correct ? i : -1)).filter(i => i >= 0));
    $$('.opt').forEach(b => {
      const i = +b.dataset.i, isC = correct.has(i), sel = state.selected.has(i);
      b.classList.add(isC ? 'is-correct' : 'is-wrong');
      if (sel && !isC) b.classList.add('bad');
      if (!sel && isC && answered) b.classList.add('missed');
      b.querySelector('.mark').textContent = isC ? '✓' : sel ? '✗' : '';
    });
    $('#opt-none').classList.add(correct.size ? 'is-wrong' : 'is-correct');
    if (state.none && correct.size) $('#opt-none').classList.add('bad');

    const r = $('#result'); r.hidden = false; r.className = 'result';
    let msg, kind;
    const hits = [...state.selected].filter(i => correct.has(i)).length, falses = state.selected.size - hits;
    const exact = state.none ? correct.size === 0 : falses === 0 && hits === correct.size;
    const letters = [...correct].sort().map(i => LETTERS[i]).join((' ' + tr('and') + ' '));
    if (!answered) { kind = 'neutral'; msg = '<b>' + tr('Solution revealed.') + '</b> ' + (correct.size > 1 ? tr('The correct options are {list}.', { list: letters }) : correct.size ? tr('The correct option is {list}.', { list: letters }) : tr('None of the options is correct.')); }
    else if (exact) { kind = 'good'; msg = '<b>' + tr('Correct!') + '</b> ' + (correct.size === 2 ? tr('You found both true options.') : correct.size ? tr('Spot on.') : tr('Indeed, none of them is correct.')); }
    else if (hits && !falses) { kind = 'partial'; msg = '<b>' + tr('Almost.') + '</b> ' + tr('You found {hits} of {total} correct options.', { hits, total: correct.size }); }
    else if (hits) { kind = 'partial'; msg = '<b>' + tr('Partly right.') + '</b> ' + (falses > 1 ? tr('{hits} correct, but also {falses} wrong picks.', { hits, falses }) : tr('{hits} correct, but also 1 wrong pick.', { hits })); }
    else { kind = 'bad'; msg = '<b>' + tr('Not this time.') + '</b> ' + tr('Watch the solution below.'); }
    r.classList.add(kind); r.innerHTML = `<span class="r-ico">${{ good: '✓', partial: '◐', bad: '✗', neutral: '◇' }[kind]}</span><span>${msg}</span>`;
    updateActions();
  }

  // ---------- step-by-step solution ----------
  function startSolution() {
    // rebuild a clean figure, then annotate it step by step
    state.fig = state.puzzle.figure($('#p-figure'));
    $('#solution').hidden = false; $('#steps').innerHTML = ''; $('#card').classList.add('solving');
    state.stepIdx = -1; state.auto = true; $('#btn-auto').textContent = tr('❚❚ Pause');
    setTimeout(() => { const c = $('#card'); c.scrollTo({ top: $('#result').offsetTop - $('.figure').offsetHeight - 40, behavior: 'smooth' }); }, 300);
    nextStep();
  }
  function nextStep() {
    clearTimeout(state.solTimer);
    const steps = state.puzzle.steps;
    if (state.stepIdx >= steps.length - 1) { $('#btn-next').disabled = true; return; }
    state.stepIdx++;
    const st = steps[state.stepIdx], n = state.stepIdx + 1;
    const { card, delay } = buildStep(st, n, true);
    $$('.step').forEach(s => s.classList.remove('current')); card.classList.add('current');
    if (st.fig) setTimeout(() => st.fig(state.fig), 200);
    $('#btn-next').disabled = state.stepIdx >= steps.length - 1;
    $('#step-count').textContent = tr('Step {n} / {total}', { n, total: steps.length });
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
    if (state.auto && state.stepIdx < steps.length - 1) state.solTimer = setTimeout(nextStep, delay + 1900);
    if (state.stepIdx >= steps.length - 1) { state.auto = false; $('#btn-auto').textContent = tr('▶ Auto'); }
  }
  function buildStep(st, n, animate) {
    const card = document.createElement('div'); card.className = 'step';
    card.innerHTML = `<div class="step-n">${n}</div><div class="step-body"><h4></h4><div class="lines"></div><p class="note"></p></div>`;
    mathText(card.querySelector('h4'), st.title);
    const lines = card.querySelector('.lines');
    let delay = 250;
    if (st.lines) st.lines.forEach(l => {
      const d = document.createElement('div'); d.className = 'line'; d.innerHTML = tex(l, true);
      const dur = Math.min(1500, 450 + l.length * 14);
      if (animate) d.style.animation = `write ${dur}ms cubic-bezier(.4,.1,.4,1) ${delay}ms both`;
      delay += dur + 120; lines.appendChild(d);
    });
    if (st.options) {
      state.options.forEach((o, i) => {
        const d = document.createElement('div'); d.className = 'chk ' + (o.correct ? 'ok' : 'no');
        d.innerHTML = `<span class="letter">${LETTERS[i]}</span><span class="t">${tex(o.tex)}</span><span class="v">${o.correct ? '✓' : '✗'}</span><span class="why"></span>`;
        mathText(d.querySelector('.why'), o.why);
        if (animate) d.style.animation = `rise 420ms ease ${delay}ms both`; delay += 170; lines.appendChild(d);
      });
    }
    mathText(card.querySelector('.note'), st.note || '');
    card.querySelector('.note').style.animationDelay = animate ? delay + 'ms' : '0ms';
    if (!animate) card.style.animation = 'none';
    $('#steps').appendChild(card);
    // long formulas shrink to fit the card instead of showing scrollbars
    const fit = () => card.querySelectorAll('.line').forEach(d => {
      const disp = d.querySelector('.katex-display'), k = d.querySelector('.katex'); if (!disp || !k) return;
      disp.style.fontSize = ''; const avail = d.clientWidth - 6, w = k.scrollWidth;
      if (w > avail && avail > 0) disp.style.fontSize = Math.max(0.55, avail / w).toFixed(3) + 'em';
    });
    fit(); requestAnimationFrame(fit);
    return { card, delay };
  }
  // ---------- switching language keeps the puzzle, the answers and the solution ----------
  I18N.onChange(() => {
    $$('.cat').forEach(b => { const c = PuzzleBank.categories.find(x => x.id === b.dataset.cat); b.querySelector('.n').textContent = PuzzleBank.count(c.id) || tr('soon'); });
    if (!state.base) return;
    clearTimeout(state.solTimer);
    localize(); renderTexts();
    state.fig = state.puzzle.figure($('#p-figure'));
    renderOptions(); updateActions();
    if (state.confirmed) {
      markAnswers();
      $('#steps').innerHTML = '';
      for (let k = 0; k <= state.stepIdx; k++) { const st = state.puzzle.steps[k]; const { card } = buildStep(st, k + 1, false); if (k === state.stepIdx) card.classList.add('current'); if (st.fig) st.fig(state.fig); }
      $('#step-count').textContent = state.stepIdx >= 0 ? tr('Step {n} / {total}', { n: state.stepIdx + 1, total: state.puzzle.steps.length }) : '';
      state.auto = false; $('#btn-auto').textContent = tr('▶ Auto');
    }
  });
  $('#btn-next').onclick = () => { state.auto = false; $('#btn-auto').textContent = tr('▶ Auto'); nextStep(); };
  $('#btn-auto').onclick = () => {
    if (state.stepIdx >= state.puzzle.steps.length - 1) { startSolution(); return; }
    state.auto = !state.auto; $('#btn-auto').textContent = state.auto ? tr('❚❚ Pause') : tr('▶ Auto');
    if (state.auto) nextStep(); else clearTimeout(state.solTimer);
  };
  $('#btn-replay').onclick = () => startSolution();
  $('#btn-again').onclick = () => load(state.base);

  // ---------- quick search ----------
  (function search() {
    const inp = $('#search'), box = $('#search-results');
    const norm = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const plain = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\$([^$]+)\$/g, (_, m) => ' ' + m.replace(/\^\\circ/g, '°').replace(/\\cdot/g, '·').replace(/\\(sin|cos|tan|log|ln|sqrt)\b/g, ' $1 ').replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_]/g, ' ') + ' ').replace(/\s+/g, ' ').trim();
    // titles, statements and search words come from puzzles/search/<lang>.js (English + current language), loaded on first use
    let index = [], ready = null;
    const buildIndex = () => (ready = Promise.all([PuzzleBank.loadSearch('en'), PuzzleBank.loadSearch(I18N.lang)]).then(([en, cur]) => {
      index = PuzzleBank.index.map(e => {
        const cat = PuzzleBank.categories.find(c => c.id === e.cat), a = en[e.id] || {}, b = cur[e.id] || a;
        const fields = { title: norm(a.t + ' ' + b.t), cat: norm(cat.name + ' ' + cat.id + ' ' + tr(cat.name)), body: norm(a.k + ' ' + (b !== a ? b.k : '')) };
        return { e, cat, title: b.t || e.id, fields, statement: plain(b.s) };
      });
    }));
    I18N.onChange(() => { if (ready) buildIndex().then(() => { if (!box.hidden) render(); }); });
    let hits = [], active = 0;
    const score = (e, words) => {
      let sc = 0;
      for (const w of words) {
        const inT = e.fields.title.includes(w), inC = e.fields.cat.includes(w), inB = e.fields.body.includes(w);
        if (!inT && !inC && !inB) return -1;
        sc += (inT ? 5 : 0) + (inC ? 4 : 0) + (inB ? 1 : 0) + (e.fields.title.split(/\W+/).some(t => t.startsWith(w)) ? 2 : 0);
      }
      return sc;
    };
    const mark = (text, words) => {
      let out = text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      words.forEach(w => { if (w.length < 2) return; out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
      return out;
    };
    const render = () => {
      const q = norm(inp.value).trim();
      const words = q.split(/\s+/).filter(Boolean);
      hits = (words.length ? index.map(e => ({ e, s: score(e, words) })).filter(h => h.s >= 0).sort((a, b) => b.s - a.s) : index.map(e => ({ e, s: 0 }))).map(h => h.e);
      active = Math.min(active, Math.max(0, hits.length - 1));
      box.innerHTML = hits.length ? hits.map((h, i) => {
        let snip = h.statement; if (snip.length > 120) snip = snip.slice(0, 117) + '…';
        return '<button class="sr' + (i === active ? ' on' : '') + '" data-i="' + i + '" role="option"><span class="sr-cat">' + h.cat.icon + ' ' + tr(h.cat.name) + '</span><span class="sr-title">' + mark(h.title, words) + '</span><span class="sr-diff">' + '●'.repeat(h.e.diff) + '</span><span class="sr-snip">' + mark(snip, words) + '</span></button>';
      }).join('') : '<p class="sr-empty">' + tr('No puzzle matches “{q}”. Try a category (geometry, algebra…) or a word like triangle, dice, area.', { q: inp.value.replace(/[<>&]/g, '') }) + '</p>';
      box.hidden = false;
      box.querySelectorAll('.sr').forEach(b => { b.onmousedown = e => e.preventDefault(); b.onclick = () => open(+b.dataset.i); });
    };
    const open = i => { const h = hits[i]; if (!h) return; state.cat = h.e.cat; show(PuzzleBank.load(h.e.id)); inp.value = ''; box.hidden = true; inp.blur(); };
    let hideT;
    const later = () => (ready || buildIndex()).then(render);
    inp.addEventListener('input', () => { clearTimeout(hideT); active = 0; later(); });
    inp.addEventListener('focus', () => { clearTimeout(hideT); later(); });
    inp.addEventListener('blur', () => { clearTimeout(hideT); hideT = setTimeout(() => { box.hidden = true; }, 150); });
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, hits.length - 1); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); render(); }
      if (e.key === 'Enter') { e.preventDefault(); open(active); }
      if (e.key === 'Escape') { inp.value = ''; box.hidden = true; inp.blur(); }
    });
    document.addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) { e.preventDefault(); inp.focus(); } }, true);
  })();

  window.addEventListener('resize', () => $$('.step').forEach(card => card.querySelectorAll('.line').forEach(d => { const disp = d.querySelector('.katex-display'), k = d.querySelector('.katex'); if (!disp || !k) return; disp.style.fontSize = ''; const avail = d.clientWidth - 6, w = k.scrollWidth; if (w > avail && avail > 0) disp.style.fontSize = Math.max(0.55, avail / w).toFixed(3) + 'em'; })));
  // open a specific puzzle from the list page: index.html?p=<id>  (or a category: ?cat=algebra)
  const qs = new URLSearchParams(location.search);
  const want = PuzzleBank.entry(qs.get('p'));
  const wantCat = PuzzleBank.categories.find(c => c.id === qs.get('cat'));
  if (want) { state.cat = want.cat; show(PuzzleBank.load(want.id)); }
  else if (wantCat && PuzzleBank.count(wantCat.id)) { state.cat = wantCat.id; show(PuzzleBank.random(wantCat.id)); }
  else show(PuzzleBank.random('geometry'));
  window.__app = { board, state };
})();

/* ---------- "Ask an AI": open the current problem in a free AI chat, as another way to develop it ---------- */
(function () {
  'use strict';
  const PROVIDERS = [
    { name: 'ChatGPT', url: q => 'https://chatgpt.com/?q=' + q },
    { name: 'Copilot', url: q => 'https://copilot.microsoft.com/?q=' + q },
    { name: 'Claude', url: q => 'https://claude.ai/new?q=' + q },
    { name: 'Perplexity', url: q => 'https://www.perplexity.ai/search?q=' + q },
    { name: 'Le Chat', url: q => 'https://chat.mistral.ai/chat?q=' + q },
    { name: 'Gemini', url: () => 'https://gemini.google.com/app', paste: true },
    { name: 'DeepSeek', url: () => 'https://chat.deepseek.com/', paste: true }
  ];
  const $ = s => document.querySelector(s);
  // LaTeX → readable plain text for chat prompts
  function plain(t) {
    return String(t)
      .replace(/<[^>]+>/g, '')
      .replace(/\$([^$]+)\$/g, (_, m) => plainTex(m))
      .replace(/\s+/g, ' ').trim();
  }
  function plainTex(m) {
    let s = m;
    for (let i = 0; i < 4; i++) s = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)').replace(/\\sqrt\{([^{}]*)\}/g, 'sqrt($1)');
    const SYM = { cdot: '·', times: '×', div: '÷', pi: 'π', theta: 'θ', alpha: 'α', beta: 'β', angle: '∠', le: '≤', leq: '≤', ge: '≥', geq: '≥', pm: '±', ne: '≠', neq: '≠', approx: '≈', infty: '∞', Rightarrow: '⇒', checkmark: '✓', quad: ' ', qquad: ' ' };
    const FN = ['arcsin', 'arccos', 'arctan', 'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'exp', 'max', 'min'];
    return s.replace(/\^\\circ/g, '°').replace(/\\circ/g, '°').replace(/\\(left|right)/g, '').replace(/\\text\{([^{}]*)\}/g, '$1')
      .replace(/\\[ ,;:!]/g, ' ').replace(/\^2\b/g, '²').replace(/\^3\b/g, '³')
      .replace(/\\([a-zA-Z]+)/g, (m, w) => (FN.includes(w) ? ' ' + w + ' ' : SYM[w] !== undefined ? SYM[w] : '')).replace(/[{}]/g, '').replace(/\(([0-9a-z.]+)\)\/\(([0-9a-z.]+)\)/gi, '$1/$2').replace(/\s+/g, ' ').trim();
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (er) { /* */ } ta.remove(); return ok;
    }
  }
  function open(provider, text) {
    copy(text);
    const url = provider.url(encodeURIComponent(text));
    window.open(url, '_blank', 'noopener');
  }
  function renderButtons(box, getText) {
    PROVIDERS.forEach(p => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'ai-btn';
      b.innerHTML = p.name + (p.paste ? ' <small>paste</small>' : '') + ' ↗';
      const setTitle = () => { b.title = p.paste ? tr('Opens {name} — the prompt is copied, paste it with Ctrl+V', { name: p.name }) : tr('Opens {name} in a new tab with the prompt', { name: p.name }); };
      setTitle(); I18N.onChange(setTitle);
      b.onclick = () => open(p, getText());
      box.appendChild(b);
    });
  }

  // ---- puzzle prompt
  const LET = 'ABCDEFGH';
  function puzzlePrompt() {
    const st = window.__app.state, p = st.puzzle; if (!p) return '';
    const lines = [];
    lines.push(tr('Please solve this math puzzle step by step, explaining the reasoning clearly.'));
    lines.push('');
    lines.push(tr('Problem:') + ' ' + plain(p.statement));
    if (p.figureText) lines.push(tr('Figure:') + ' ' + p.figureText);
    lines.push('');
    lines.push(tr('Options (zero, one or two of them can be correct):'));
    st.options.forEach((o, i) => lines.push(LET[i] + ') ' + plainTex(o.tex)));
    lines.push('');
    if ($('#ai-mine') && $('#ai-mine').checked) {
      const sel = [...st.selected].sort().map(i => LET[i]);
      lines.push(tr('My answer: {answer}. Tell me whether it is right and why.', { answer: st.none ? tr('none of them') : sel.length ? sel.join((' ' + tr('and') + ' ')) : tr('(not chosen yet)') }));
    }
    lines.push(p.aiHint || tr('Please solve it in your own way, show every step, then check each option and say which ones are correct.'));
    if (I18N.lang !== 'en') lines.push(tr('Please answer in English.'));
    return lines.join('\n');
  }
  const pop = $('#ai-pop'), ta = $('#ai-prompt');
  const refresh = () => { ta.value = puzzlePrompt(); };
  $('#btn-ai').onclick = () => { pop.hidden = !pop.hidden; $('#btn-ai').setAttribute('aria-expanded', String(!pop.hidden)); if (!pop.hidden) refresh(); };
  $('#ai-mine').onchange = refresh;
  ta.addEventListener('keydown', e => e.stopPropagation());
  renderButtons(pop.querySelector('.ai-providers'), () => ta.value);
  $('#ai-copy').onclick = async () => { const ok = await copy(ta.value); $('#ai-copy').textContent = ok ? 'Copied ✓' : 'Copy failed'; setTimeout(() => { $('#ai-copy').textContent = 'Copy prompt'; }, 1500); };
  // new puzzle → close and refresh
  const card = $('#card');
  new MutationObserver(() => { if (!pop.hidden) refresh(); }).observe($('#p-title'), { childList: true });
  I18N.onChange(() => { if (!pop.hidden) refresh(); });

  // ---- system-of-equations prompt (inside the System panel)
  const sysBox = document.querySelector('.sys-ai');
  if (sysBox) renderButtons(sysBox, () => {
    const eqs = [...document.querySelectorAll('.sys-row input')].map(i => i.value.trim()).filter(Boolean);
    return tr('Solve this system of equations step by step, and if possible show a second method too (substitution, elimination, matrices or a graph):') + '\n' + eqs.map(e => '  ' + e).join('\n') + '\n' + tr('Explain each step and check the solution by substituting back.') + (I18N.lang !== 'en' ? '\n' + tr('Please answer in English.') : '');
  });
})();
