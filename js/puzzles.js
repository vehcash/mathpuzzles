/* PuzzleBank — the puzzle engine. The puzzles themselves live one per file in puzzles/<category>/<id>.js.
   • puzzles/index.js           small list of every puzzle (id, category, difficulty, file) — always loaded
   • puzzles/search/<lang>.js   title, statement and search words per puzzle, one file per language — loaded on demand
   • puzzles/<category>/<id>.js one puzzle with every language inside — loaded when it is opened (or drawn in the list)
   Files are classic scripts (not .json), so the site also works opened straight from disk (file://).
   After adding or editing a puzzle file run:  node tools/build-index.js */
(function (global) {
  'use strict';

  const CATEGORIES = [
    { id: 'geometry', name: 'Geometry', short: 'Geo', icon: '△' },
    { id: 'trigonometry', name: 'Trigonometry', short: 'Trig', icon: '∿' },
    { id: 'algebra', name: 'Algebra', short: 'Algebra', icon: 'x²' },
    { id: 'matrix', name: 'Matrices', short: 'Matrices', icon: '▦' },
    { id: 'complex', name: 'Complex numbers', short: 'Complex', icon: 'ℂ' },
    { id: 'calculus', name: 'Calculus', short: 'Calculus', icon: '∫' },
    { id: 'combinatorics', name: 'Combinatorics', short: 'Counting', icon: '⁂' },
    { id: 'probability', name: 'Probability', short: 'Prob.', icon: '⚄' },
    { id: 'number', name: 'Number theory', short: 'Numbers', icon: 'ℕ' }
  ];

  // ------- tiny SVG figure kit -------
  const NS = 'http://www.w3.org/2000/svg';
  function Figure(svg, opts) {
    const s = opts.scale, pad = opts.pad;
    const W = opts.w * s + pad * 2, H = opts.h * s + pad * 2;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';
    const layers = {};
    ['fills', 'base', 'marks', 'over', 'labels'].forEach(n => { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'fig-' + n); svg.appendChild(g); layers[n] = g; });
    const X = x => pad + x * s, Y = y => H - pad - y * s;
    const P = p => [X(p[0]), Y(p[1])];
    function el(tag, attrs, layer = 'base') {
      const e = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
      layers[layer].appendChild(e); return e;
    }
    function draw(e, dur = 900, delay = 0) { // draw-on animation for any stroke
      const len = e.getTotalLength ? e.getTotalLength() : 300;
      e.style.strokeDasharray = len + ' ' + len; e.style.strokeDashoffset = len;
      e.getBoundingClientRect();
      e.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.6,.05,.3,1) ${delay}ms`;
      requestAnimationFrame(() => { e.style.strokeDashoffset = 0; });
      setTimeout(() => { e.style.strokeDasharray = e.dataset.dash || ''; e.style.transition = ''; }, dur + delay + 50);
      return e;
    }
    function fadeIn(e, dur = 600, delay = 0) { e.style.opacity = 0; e.style.transition = `opacity ${dur}ms ease ${delay}ms`; requestAnimationFrame(() => requestAnimationFrame(() => { e.style.opacity = ''; })); return e; }
    const api = {
      svg, X, Y, P, el, draw, fadeIn,
      seg(a, b, cls = '', layer = 'base') { const [x1, y1] = P(a), [x2, y2] = P(b); return el('line', { x1, y1, x2, y2, class: 'seg ' + cls }, layer); },
      path(pts, cls = '', layer = 'base', closed = true) { return el('path', { d: 'M' + pts.map(p => P(p).join(',')).join('L') + (closed ? 'Z' : ''), class: cls }, layer); },
      circle(c, r, cls = '', layer = 'base') { const [cx, cy] = P(c); return el('circle', { cx, cy, r: r * s, class: cls }, layer); },
      dot(c, cls = '', layer = 'labels') { const [cx, cy] = P(c); return el('circle', { cx, cy, r: 3.6, class: 'dot ' + cls }, layer); },
      text(c, str, cls = '', dx = 0, dy = 0, layer = 'labels') { const [x, y] = P(c); const t = el('text', { x: x + dx, y: y + dy, class: 'lbl ' + cls, 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, layer); t.textContent = /[a-z]{2}/i.test(str) && global.tr ? global.tr(str) : str; return t; },
      right(at, u, v, size = 0.45, cls = '', layer = 'marks') { // right-angle mark at "at" between directions u and v (unit vectors)
        const a = [at[0] + u[0] * size, at[1] + u[1] * size], b = [a[0] + v[0] * size, a[1] + v[1] * size], c = [at[0] + v[0] * size, at[1] + v[1] * size];
        return api.path([a, b, c], 'ra ' + cls, layer, false);
      },
      rect(x, y, w, h, cls = '', layer = 'base') { const [px, py] = P([x, y + h]); return el('rect', { x: px, y: py, width: w * s, height: h * s, class: cls }, layer); },
      arc(c, r, a0, a1, cls = '', layer = 'marks') { const pts = []; for (let i = 0; i <= 24; i++) { const t = (a0 + (a1 - a0) * i / 24) * Math.PI / 180; pts.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]); } return api.path(pts, 'arc ' + cls, layer, false); },
      curve(pts, cls = '', layer = 'base') { return api.path(pts, cls, layer, false); },
      arrowDefs() { if (svg.querySelector('#arrowhead')) return; const d = document.createElementNS(NS, 'defs'); d.innerHTML = '<marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" class="arrowhead"/></marker>'; svg.insertBefore(d, svg.firstChild); },
      clear(layer) { layers[layer].innerHTML = ''; },
      layers
    };
    return api;
  }

  // ------- small geometry helpers shared by puzzle files -------
  const unit = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / d, (q[1] - p[1]) / d]; };
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  /** draw a matrix (or a determinant with bar: 'vbar') whose top-left corner is at `at` (figure units).
      rows: array of rows of strings. Returns { w, h, c(i, j) centre of a cell, box(i, j, cls, layer), row(i, …), col(j, …) } */
  function matrix(F, at, rows, opts = {}) {
    const cw = opts.cw || 0.9, ch = opts.ch || 0.75, n = rows.length, m = rows[0].length, bar = opts.bar || 'paren';
    const [x0, y0] = at, w = m * cw, h = n * ch, k = 0.22, layer = opts.layer || 'base';
    const c = (i, j) => [x0 + (j + 0.5) * cw, y0 - (i + 0.5) * ch];
    if (bar === 'vbar') { F.seg([x0, y0], [x0, y0 - h], 'mxb', layer); F.seg([x0 + w, y0], [x0 + w, y0 - h], 'mxb', layer); }
    else {
      const side = (x, d) => F.path([[x + d * k, y0], [x, y0 - 0.12], [x, y0 - h + 0.12], [x + d * k, y0 - h]], 'mxb', layer, false);
      side(x0 - 0.05, 1); side(x0 + w + 0.05, -1);
    }
    rows.forEach((r, i) => r.forEach((v, j) => F.text(c(i, j), String(v), 'mx' + (opts.cls ? ' ' + opts.cls : ''), 0, 1, layer)));
    const box = (i, j, cls = 'fill-yellow', ly = 'fills') => F.rect(x0 + j * cw + 0.04, y0 - (i + 1) * ch + 0.04, cw - 0.08, ch - 0.08, 'mxh ' + cls, ly);
    return {
      w, h, c, box,
      row: (i, cls = 'fill-yellow', ly = 'fills') => F.rect(x0 + 0.04, y0 - (i + 1) * ch + 0.04, w - 0.08, ch - 0.08, 'mxh ' + cls, ly),
      col: (j, cls = 'fill-blue', ly = 'fills') => F.rect(x0 + j * cw + 0.04, y0 - h + 0.04, cw - 0.08, h - 0.08, 'mxh ' + cls, ly)
    };
  }
  /** light grid lines every unit from (x0, y0) to (x1, y1) */
  function grid(F, x0, y0, x1, y1) { for (let x = x0; x <= x1; x++) F.seg([x, y0], [x, y1], 'gridl'); for (let y = y0; y <= y1; y++) F.seg([x0, y], [x1, y], 'gridl'); }
  /** arrow from a to b */
  function arrow(F, a, b, cls = 'vec', layer = 'base') { F.arrowDefs(); const e = F.seg(a, b, cls, layer); e.setAttribute('marker-end', 'url(#arrowhead)'); return e; }
  /** complex plane: grid, axes and Re/Im labels over [x0, x1] × [y0, y1]; returns T(z) mapping a point [re, im] to figure units */
  function argand(F, x0, x1, y0, y1, opts = {}) {
    const T = ([x, y]) => [x - x0, y - y0];
    if (opts.grid !== false) grid(F, 0, 0, x1 - x0, y1 - y0);
    F.seg(T([x0, 0]), T([x1, 0]), 'axis'); F.seg(T([0, y0]), T([0, y1]), 'axis');
    F.text(T([x1, 0]), 'Re', 'tick', -10, 12); F.text(T([0, y1]), 'Im', 'tick', 14, 8);
    return T;
  }
  /** x–y axes (with optional grid) over [x0, x1] × [y0, y1]; returns T([x, y]) in figure units */
  function axes(F, x0, x1, y0, y1, opts = {}) {
    const T = ([x, y]) => [x - x0, y - y0];
    if (opts.grid) grid(F, 0, 0, x1 - x0, y1 - y0);
    F.seg(T([x0, 0]), T([x1, 0]), 'axis'); F.seg(T([0, y0]), T([0, y1]), 'axis');
    F.text(T([x1, 0]), opts.xl || 'x', 'tick', -8, 12); F.text(T([0, y1]), opts.yl || 'y', 'tick', 12, 8);
    return T;
  }
  /** graph of f on [a, b] (clipped to [y0, y1] when given); returns the path */
  function plot(F, T, f, a, b, cls = 'graph', layer = 'base', y0 = -Infinity, y1 = Infinity, n = 160) {
    const pts = []; for (let k = 0; k <= n; k++) { const x = a + (b - a) * k / n, y = f(x); if (isFinite(y) && y >= y0 && y <= y1) pts.push(T([x, y])); }
    return F.curve(pts, cls, layer);
  }
  const kit = { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2: Math.SQRT2, S3: Math.sqrt(3) };

  // ------- registry and loading -------
  const BASE = (() => { const s = document.currentScript && document.currentScript.src; return s ? s.replace(/js\/puzzles\.js(\?.*)?$/, 'puzzles/') : 'puzzles/'; })();
  let INDEX = [];
  const byId = new Map(), loaded = new Map(), waiting = new Map(), search = {}, searchWait = {};
  function addScript(src, onerror) { const s = document.createElement('script'); s.src = BASE + src; s.async = true; s.onerror = onerror; document.head.appendChild(s); }

  /** called by puzzles/<category>/<id>.js */
  function define(p) {
    loaded.set(p.id, p);
    // labels drawn in the figure and \text{…} words inside formulas are translated with this puzzle's own words only
    if (p.words && global.I18N) {
      const scoped = f => (typeof f === 'function' ? function () { return I18N.withLocal(p.words, () => f.apply(this, arguments)); } : f);
      p.figure = scoped(p.figure);
      (p.steps || []).forEach(st => { if (st.fig) st.fig = scoped(st.fig); });
    }
    const w = waiting.get(p.id); if (w) { waiting.delete(p.id); w.forEach(f => f.ok(p)); }
  }
  /** Promise of the full puzzle (cached) */
  function load(id) {
    if (loaded.has(id)) return Promise.resolve(loaded.get(id));
    const e = byId.get(id); if (!e) return Promise.reject(new Error('unknown puzzle ' + id));
    return new Promise((ok, fail) => {
      if (waiting.has(id)) { waiting.get(id).push({ ok, fail }); return; }
      waiting.set(id, [{ ok, fail }]);
      addScript(e.file, () => { const w = waiting.get(id) || []; waiting.delete(id); w.forEach(f => f.fail(new Error('could not load ' + e.file))); });
    });
  }
  /** Promise of {id: {t: title, s: statement, k: search words}} in a language (English if that file is missing) */
  function loadSearch(lang) {
    if (search[lang]) return Promise.resolve(search[lang]);
    if (!searchWait[lang]) searchWait[lang] = new Promise(ok => {
      const done = () => ok(search[lang] || (lang === 'en' ? {} : null));
      search['__' + lang] = done;
      addScript('search/' + lang + '.js', () => done());
    }).then(r => r || loadSearch('en'));
    return searchWait[lang];
  }

  // ------- sources -------
  // Exam systems a puzzle's `source.exams` can name. It means "this kind of question is standard there",
  // not that the exact question was set there — for a real past-paper question use `source.from` (see README: Sources).
  const EXAMS = {
    gaokao:   { en: 'Gaokao (China)', fr: 'Gaokao (Chine)', es: 'Gaokao (China)', ja: '高考（中国）', zh: '高考' },
    zhongkao: { en: 'Zhongkao (China)', fr: 'Zhongkao (Chine)', es: 'Zhongkao (China)', ja: '中考（中国）', zh: '中考' },
    kyotsu:   { en: 'Common Test (Japan)', fr: 'Common Test (Japon)', es: 'Common Test (Japón)', ja: '大学入学共通テスト', zh: '日本大学入学共通考试' },
    ebau:     { en: 'EBAU / PAU (Spain)', fr: 'EBAU / PAU (Espagne)', es: 'EBAU / PAU (Selectividad)', ja: 'EBAU（スペイン）', zh: '西班牙高考（EBAU）' },
    bac:      { en: 'Baccalauréat (France)', fr: 'Baccalauréat', es: 'Bachillerato francés (Bac)', ja: 'バカロレア（フランス）', zh: '法国高中会考（Bac）' },
    alevel:   { en: 'A-level (UK)', fr: 'A-level (Royaume-Uni)', es: 'A-level (Reino Unido)', ja: 'Aレベル（英国）', zh: '英国 A-level' },
    alevelfm: { en: 'A-level Further Maths (UK)', fr: 'A-level Further Maths (Royaume-Uni)', es: 'A-level Further Maths (Reino Unido)', ja: 'Aレベル Further Maths（英国）', zh: '英国 A-level 进阶数学' },
    gcse:     { en: 'GCSE (UK)', fr: 'GCSE (Royaume-Uni)', es: 'GCSE (Reino Unido)', ja: 'GCSE（英国）', zh: '英国 GCSE' },
    ib:       { en: 'IB Diploma', fr: 'Baccalauréat international (IB)', es: 'Bachillerato Internacional (IB)', ja: '国際バカロレア（IB）', zh: 'IB 国际文凭' },
    ap:       { en: 'AP Calculus (USA)', fr: 'AP Calculus (États-Unis)', es: 'AP Calculus (EE. UU.)', ja: 'AP Calculus（米国）', zh: '美国 AP 微积分' },
    amc:      { en: 'AMC 8/10 (USA)', fr: 'AMC 8/10 (États-Unis)', es: 'AMC 8/10 (EE. UU.)', ja: 'AMC 8/10（米国）', zh: '美国 AMC 8/10' },
    step:     { en: 'STEP (Cambridge, UK)', fr: 'STEP (Cambridge, Royaume-Uni)', es: 'STEP (Cambridge, Reino Unido)', ja: 'STEP（ケンブリッジ大学）', zh: 'STEP（剑桥大学）' },
    mat:      { en: 'MAT (Oxford, UK)', fr: 'MAT (Oxford, Royaume-Uni)', es: 'MAT (Oxford, Reino Unido)', ja: 'MAT（オックスフォード大学）', zh: 'MAT（牛津大学）' },
    tmua:     { en: 'TMUA (UK universities)', fr: 'TMUA (universités britanniques)', es: 'TMUA (universidades británicas)', ja: 'TMUA（英国の大学）', zh: 'TMUA（英国大学）' },
    jee:      { en: 'JEE Advanced (India)', fr: 'JEE Advanced (Inde)', es: 'JEE Advanced (India)', ja: 'JEE Advanced（インド）', zh: 'JEE Advanced（印度）' },
    ime:      { en: 'IME (Brazil)', fr: 'IME (Brésil)', es: 'IME (Brasil)', ja: 'IME（ブラジル）', zh: 'IME（巴西）' },
    ita:      { en: 'ITA (Brazil)', fr: 'ITA (Brésil)', es: 'ITA (Brasil)', ja: 'ITA（ブラジル）', zh: 'ITA（巴西）' },
    uni:      { en: 'University linear algebra', fr: 'Algèbre linéaire (université)', es: 'Álgebra lineal (universidad)', ja: '大学の線形代数', zh: '大学线性代数' }
  };

  // ------- language -------
  const langOf = () => (global.I18N ? I18N.lang : 'en');
  /** text field: either a plain English string (translated through the site dictionaries) or { en, fr, es, ja, zh } */
  function pick(v, lang = langOf()) {
    if (v === undefined || v === null) return v;
    if (typeof v === 'object') return v[lang] !== undefined ? v[lang] : v.en;
    return global.tr && lang === langOf() ? global.tr(v) : v;
  }
  const tx = s => (s && global.I18N ? I18N.tex(s) : s);
  /** a copy of the puzzle in one language (figures, answers and option order are unchanged) */
  function localize(p, lang = langOf()) {
    if (p.words && global.I18N && I18N.local !== p.words) return I18N.withLocal(p.words, () => localize(p, lang));
    const t = v => pick(v, lang);
    return Object.assign({}, p, {
      title: t(p.title), statement: t(p.statement), hint: t(p.hint), figureText: t(p.figureText), aiHint: t(p.aiHint),
      source: p.source && Object.assign({}, p.source, { note: t(p.source.note), from: t(p.source.from), exams: (p.source.exams || []).map(k => EXAMS[k] ? pick(EXAMS[k], lang) : k) }),
      options: p.options.map(o => Object.assign({}, o, { why: t(o.why), tex: tx(o.tex) })),
      steps: p.steps.map(st => Object.assign({}, st, { title: t(st.title), note: t(st.note), lines: st.lines && st.lines.map(tx) }))
    });
  }

  const SEEN_KEY = 'chalkproof.seen.v1', SEEN_MEM = {};
  const seenOf = cat => { const all = global.Store ? Store.getJSON(SEEN_KEY, {}) : SEEN_MEM; const ids = new Set(INDEX.filter(e => e.cat === cat).map(e => e.id)); return (all[cat] || []).filter(id => ids.has(id)); };

  global.PuzzleBank = {
    categories: CATEGORIES, kit, define, load, loadSearch, localize, text: pick,
    exams: EXAMS,
    /** called by puzzles/index.js */
    setIndex(list) { INDEX = list; byId.clear(); list.forEach(e => byId.set(e.id, e)); },
    /** called by puzzles/search/<lang>.js */
    setSearch(lang, map) { search[lang] = map; const f = search['__' + lang]; if (f) { delete search['__' + lang]; f(); } },
    get index() { return INDEX; },
    entry: id => byId.get(id),
    count: cat => INDEX.filter(e => e.cat === cat).length,
    /** a random index entry of a category. No puzzle repeats until every puzzle of the category has been shown;
        then the round starts again (still avoiding exceptId, the one on screen). The record is kept with Store:
        for this visit only, or across visits if the visitor accepted preference storage. */
    pick(cat, exceptId) {
      const pool = INDEX.filter(e => e.cat === cat); if (!pool.length) return null;
      const seen = seenOf(cat);
      let from = pool.filter(e => !seen.includes(e.id) && e.id !== exceptId);
      if (!from.length) {   // the round is over: start a new one
        seen.length = 0; if (exceptId && pool.some(e => e.id === exceptId)) seen.push(exceptId);
        from = pool.filter(e => e.id !== exceptId); if (!from.length) from = pool;
      }
      const e = from[Math.floor(Math.random() * from.length)];
      PuzzleBank.markSeen(e.id); return e;
    },
    /** remember that a puzzle was shown (random pick, daily puzzle, link or list) */
    markSeen(id) {
      const e = byId.get(id); if (!e) return;
      const seen = seenOf(e.cat); if (!seen.includes(id)) seen.push(id);
      const all = global.Store ? Store.getJSON(SEEN_KEY, {}) : {}; all[e.cat] = seen; if (global.Store) Store.setJSON(SEEN_KEY, all); else SEEN_MEM[e.cat] = seen;
    },
    random(cat, exceptId) { const e = PuzzleBank.pick(cat, exceptId); return e ? load(e.id) : Promise.resolve(null); }
  };
})(window);
