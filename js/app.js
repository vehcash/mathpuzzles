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
    onEditMath(m) { ui.eq && ui.eq.edit(m); },
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
  // matrix tools (js/matrix.js). Pages built before it existed (puzzle/*.html) may not include the script or the panel: load / skip them.
  const initMatrix = () => {
    if (!window.BoardMatrix) return;
    if (BoardMatrix.ensureMarkup) BoardMatrix.ensureMarkup();   // older matrix.js builds lack it
    BoardMatrix.draggable($('#sys-panel')); BoardMatrix.draggable($('#calc-panel')); BoardMatrix.draggable($('#graphs-panel'));
    if ($('#mat-panel')) { ui.mat = BoardMatrix.MatrixPanel(board, $('#mat-panel')); window.ui_matrix = ui.mat; }
    const mb = $('#eq-matrix'); if (mb) { mb.hidden = !ui.mat; mb.onclick = () => ui.mat && ui.mat.toggle(); }
  };
  if (window.BoardMatrix) initMatrix();
  else { const s = document.createElement('script'); s.src = 'js/matrix.js?v=20261111e'; s.onload = initMatrix; document.head.appendChild(s); }
  // points, vectors and named results (js/vectors.js): pages built before it existed load it here
  if (!window.VecCore) { const s = document.createElement('script'); s.src = 'js/vectors.js?v=20261112a'; s.onload = () => { board.render(); ui.eq.refresh && ui.eq.refresh(); }; document.head.appendChild(s); }
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
  if ($('#eq-system')) $('#eq-system').onclick = () => ui.sys.toggle();   // older pages; the toolbox has System too
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
  function show(promise) { const my = ++showSeq; return Promise.resolve(promise).then(p => { if (my === showSeq && p) { if (p.id && PuzzleBank.markSeen) PuzzleBank.markSeen(p.id); load(p); } }).catch(err => console.error(err)); }

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
    renderSource(p);
    seo(p, cat);
  }
  // where the problem comes from: a real exam question (source.from), or an original puzzle with its classic origin
  // (source.note) and the exams where this kind of question is standard (source.exams)
  function renderSource(p) {
    const s = p.source || {}, el = $('#p-source');
    const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    let h = '<span class="src-k">' + tr('Source') + '</span> ';
    if (s.from) h += s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + s.from + '</a>' : s.from;
    else h += tr('Original puzzle written for Daily Math Puzzle.');
    if (s.note) h += ' <span class="src-note">' + tr('Based on:') + ' ' + s.note + '</span>';
    if (s.exams && s.exams.length) h += '<span class="src-ex">' + tr('This kind of question is typical of:') + ' ' + s.exams.map(x => '<span class="src-chip">' + esc(x) + '</span>').join(' ') + '</span>';
    mathText(el, h);
  }
  // ---------- addresses and search-engine tags ----------
  // online: puzzle/<id>.html (real pages made by tools/build-pages.js) and ./?daily; from disk: index.html?p=<id>
  const SITE = 'https://dailymathpuzzle.com/';
  const online = /^https?:$/.test(location.protocol);
  function pageURL(p, daily, canonical) {
    const lang = new URLSearchParams(location.search).get('lang');
    let u;
    if (daily) { u = new URL(online ? './' : 'index.html', document.baseURI); if (!daily.today) u.searchParams.set('daily', daily.date); else if (!online) u.searchParams.set('daily', ''); }
    else if (online) u = new URL('puzzle/' + encodeURIComponent(p.id) + '.html', document.baseURI);
    else { u = new URL('index.html', document.baseURI); u.searchParams.set('p', p.id); }
    if (lang && lang !== 'en') u.searchParams.set('lang', lang);
    return u.toString().replace(/([?&]daily)=(?=&|$)/, '$1');
  }
  // "$x^2$" → readable text for the page description (same rules as tools/build-pages.js)
  const SYM = { theta: 'θ', alpha: 'α', beta: 'β', gamma: 'γ', lambda: 'λ', mu: 'μ', sigma: 'σ', omega: 'ω', pi: 'π', angle: '∠', triangle: '△', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', infty: '∞', cdot: '·', times: '×', pm: '±', to: '→', in: '∈', perp: '⊥', parallel: '∥', circ: '°', sqrt: '√', ldots: '…', cdots: '…' };
  const SUB = '₀₁₂₃₄₅₆₇₈₉', SUP = { 2: '²', 3: '³', n: 'ⁿ' };
  const texText = m => m.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, b) => b.split('\\\\').map(x => x.replace(/&/g, ' ').trim()).join(', '))
    .replace(/\\begin\{[pbv]?matrix\}([\s\S]*?)\\end\{[pbv]?matrix\}/g, (_, b) => '[' + b.replace(/\\\\/g, ';').replace(/&/g, ' ') + ']')
    .replace(/\^\{-1\}/g, '⁻¹').replace(/\\[dt]frac/g, '\\frac').replace(/\\int_\{?([^{}\s^]*)\}?\^\{?([^{}\s]*)\}?/g, '∫ $1→$2 ').replace(/\\int/g, '∫').replace(/\^\\circ/g, '°')
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => (/^[\w^.]+$/.test(a) ? a : '(' + a + ')') + '/' + (/^[\w^.]+$/.test(b) ? b : '(' + b + ')')).replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\\(?:left|right|displaystyle|,|;|!|quad|qquad)/g, ' ')
    .replace(/\\([a-zA-Z]+)/g, (w, n) => SYM[n] !== undefined ? SYM[n] : /^(sin|cos|tan|log|ln|lim|max|min|det|arg)$/.test(n) ? n + ' ' : ' ')
    .replace(/_\{?(\d+)\}?/g, (_, d) => [...d].map(c => SUB[c]).join('')).replace(/\^\{?([23n])\}?(?![\d{])/g, (_, d) => SUP[d]).replace(/[{}]/g, '').replace(/_/g, '');
  const plainText = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\$([^$]+)\$/g, (_, m) => texText(m)).replace(/\s+([.,;:?!。？])/g, '$1').replace(/\s+/g, ' ').trim();
  function seo(p, cat) {
    const name = 'Daily Math Puzzle', what = state.daily ? tr('★ Puzzle of the day').replace(/^★\s*/, '') : tr(cat.name);
    document.title = p.title + ' — ' + what + ' | ' + name;
    const desc = plainText(p.statement), d = desc.length > 156 ? desc.slice(0, 155).replace(/\s+\S*$/, '') + '…' : desc;
    const set = (sel, attr, v) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, v); };
    set('meta[name="description"]', 'content', d); set('meta[property="og:description"]', 'content', d); set('meta[property="og:title"]', 'content', p.title);
    if (online) { const c = pageURL(p, state.daily, true).replace(location.origin + '/', SITE); set('link[rel="canonical"]', 'href', c); set('meta[property="og:url"]', 'content', c); }
  }
  function load(p) {
    if (!p) return;
    clearTimeout(state.solTimer);
    if (state.daily && state.daily.id !== p.id) state.daily = null;   // another puzzle: no longer the daily one
    try { history.replaceState(null, '', pageURL(p, state.daily)); } catch (e) { /* file:// in some browsers */ }
    Daily.badge();
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
  // ---------- puzzle of the day: api/daily.php picks one per day on the server and never repeats it ----------
  const Daily = (() => {
    const online = /^https?:$/.test(location.protocol);
    let today = null, past = null;
    const call = q => !online ? Promise.resolve(null) : Promise.race([
      fetch('api/daily.php' + q, { cache: 'no-store' }).then(r => r.ok ? r.json() : null).catch(() => null),
      new Promise(ok => setTimeout(() => ok(null), 2500))              // a slow server must not hold the board back
    ]);
    const loc = () => document.documentElement.lang || 'en';
    const fmt = (d, long) => { try { return new Date(d + 'T12:00:00').toLocaleDateString(loc(), long ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } : { day: 'numeric', month: 'short' }); } catch (e) { return d; } };
    const catOf = id => PuzzleBank.categories.find(c => c.id === id);
    const known = d => d && d.id && PuzzleBank.entry(d.id) ? d : null;   // the puzzle file may have been removed since
    // today's puzzle (cached), or a past day's
    function get(date) {
      if (!date) return today ? Promise.resolve(today) : call('').then(d => (today = known(d) ? Object.assign(d, { today: true }) : null));
      return call('?date=' + encodeURIComponent(date)).then(d => (known(d) ? Object.assign(d, { today: !!(today && today.date === d.date) }) : null));
    }
    function open(d) { state.daily = d; state.cat = d.cat; show(PuzzleBank.load(d.id)); }
    function badge() {
      const b = $('#p-daily'); if (!b) return;
      const d = state.daily;
      b.hidden = !d;
      if (d) b.textContent = tr(d.today ? '★ Puzzle of the day · {date}' : '★ Daily puzzle · {date}', { date: fmt(d.date) });
    }
    function renderPop(pop) {
      if (!past) { pop.innerHTML = '<p class="dp-empty">…</p>'; return; }
      Promise.all([PuzzleBank.loadSearch(I18N.lang)]).then(([titles]) => {
        pop.innerHTML = `<div class="dp-h">${tr('Past daily puzzles')}</div>` + (past.length ? past.map(d => {
          const c = catOf(d.cat), t = (titles[d.id] && titles[d.id].t) || d.id, on = state.daily && state.daily.date === d.date;
          return `<button type="button" class="dp-row${on ? ' on' : ''}" data-date="${d.date}"><span class="dp-date">${d.date === (today && today.date) ? tr('Today') : fmt(d.date, true)}</span><span class="dp-cat">${c ? c.icon + ' ' + tr(c.name) : d.cat}</span><span class="dp-title">${t.replace(/[<&]/g, ch => ch === '<' ? '&lt;' : '&amp;')}</span></button>`;
        }).join('') : `<p class="dp-empty">${tr('No daily puzzles yet.')}</p>`);
      });
    }
    function init() {
      const wrap = $('#daily'); if (!wrap || !online) return;
      get('').then(d => {
        if (!d) return;
        wrap.hidden = false;
        const c = catOf(d.cat);
        $('#btn-daily').title = tr('Today’s puzzle: {cat}', { cat: c ? tr(c.name) : d.cat });
        $('#btn-daily').onclick = () => open(today);
        const pop = $('#daily-pop'), more = $('#btn-daily-more');
        const close = () => { pop.hidden = true; more.setAttribute('aria-expanded', 'false'); };
        more.onclick = e => {
          e.stopPropagation();
          if (!pop.hidden) return close();
          pop.hidden = false; more.setAttribute('aria-expanded', 'true');
          renderPop(pop);
          if (!past) call('?list=1').then(r => { past = r && Array.isArray(r.days) ? r.days.filter(known) : []; renderPop(pop); });
        };
        pop.onclick = e => {
          const row = e.target.closest('.dp-row'); if (!row) return;
          close();
          const d0 = row.dataset.date;
          (today && d0 === today.date ? Promise.resolve(today) : get(d0)).then(x => x && open(x));
        };
        document.addEventListener('click', e => { if (!pop.hidden && !wrap.contains(e.target)) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) close(); });
        I18N.onChange && I18N.onChange(badge);
      });
    }
    return { get, open, badge, init };
  })();

  // open a specific puzzle from the list page: index.html?p=<id>  (or a category: ?cat=algebra)
  const qs = new URLSearchParams(location.search);
  const want = PuzzleBank.entry(qs.get('p') || (window.START && START.p));   // START: set by the generated puzzle/<id>.html pages
  const wantCat = PuzzleBank.categories.find(c => c.id === qs.get('cat'));
  // a random puzzle from a random topic that has puzzles
  const randomStart = () => {
    const cats = PuzzleBank.categories.filter(c => PuzzleBank.count(c.id));
    const c = cats[Math.floor(Math.random() * cats.length)];
    if (c) { state.cat = c.id; show(PuzzleBank.random(c.id)); }
  };
  if (want) { state.cat = want.cat; show(PuzzleBank.load(want.id)); }
  else if (wantCat && PuzzleBank.count(wantCat.id)) { state.cat = wantCat.id; show(PuzzleBank.random(wantCat.id)); }
  else {
    // ?daily = today's puzzle, ?daily=2026-11-10 a past one; with no parameters the home page also opens today's puzzle.
    // No server (opened from disk) or nothing left: a random puzzle instead.
    Daily.get(qs.get('daily') || '').then(d => d ? Daily.open(d) : randomStart());
  }
  Daily.init();
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
