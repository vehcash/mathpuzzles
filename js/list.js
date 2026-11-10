/* list.html — all puzzles in one grid (each card shows its category), quick search,
   category filter chips, cards load in batches as you scroll and figures draw when visible. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const BATCH = 12;
  const cats = PuzzleBank.categories;
  const norm = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const plain = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\$([^$]+)\$/g, (_, m) => ' ' + m.replace(/\^\\circ/g, '°').replace(/\\(sin|cos|tan|log|ln|sqrt|lim|int)\b/g, ' $1 ').replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_]/g, ' ') + ' ').replace(/\s+/g, ' ').trim();
  const mathText = (el, html) => { el.innerHTML = html.replace(/\$([^$]+)\$/g, (_, t) => katex.renderToString(t, { throwOnError: false })); return el; };
  const escH = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  // titles, statements and search words come from puzzles/search/<lang>.js; search works in English and in the current language.
  // The full puzzle file (figure, options, solution) is only loaded when its card scrolls into view.
  let index = [];
  function buildIndex() {
    return Promise.all([PuzzleBank.loadSearch('en'), PuzzleBank.loadSearch(I18N.lang)]).then(([en, cur]) => {
      index = PuzzleBank.index.map((e, i) => {
        const cat = cats.find(c => c.id === e.cat), a = en[e.id] || { t: e.id, s: '', k: '' }, b = cur[e.id] || a;
        return { e, cat, i, t: b.t, s: b.s, title: norm(a.t + ' ' + b.t), catText: norm(cat.name + ' ' + cat.id + ' ' + tr(cat.name)), body: norm(a.k + ' ' + (b !== a ? b.k : '')) };
      });
    });
  }

  // ---- category filter chips
  let catFilter = new URLSearchParams(location.search).get('cat') || '';
  const chips = $('#lfilters');
  const mkChip = (id, label, icon, short) => {
    const b = document.createElement('button'); b.className = 'lchip'; b.dataset.cat = id;
    if (short) b.title = label;
    b.innerHTML = (icon ? '<span class="ico">' + icon + '</span>' : '') + '<span' + (short ? ' class="nm"' : '') + '>' + label + '</span>' + (short ? '<span class="sh">' + short + '</span>' : '') + '<span class="n"></span>';
    b.onclick = () => { catFilter = catFilter === id ? '' : id; apply(); };
    chips.appendChild(b);
  };
  mkChip('', 'All');
  cats.forEach(c => mkChip(c.id, c.name, c.icon, c.short));

  // ---- search
  let words = [];
  const score = e => {
    let sc = 0;
    for (const w of words) {
      const t = e.title.includes(w), c = e.catText.includes(w), b = e.body.includes(w);
      if (!t && !c && !b) return -1;
      sc += (t ? 5 : 0) + (c ? 4 : 0) + (b ? 1 : 0);
    }
    return sc;
  };
  const mark = (html, ws) => {
    const live = ws.filter(w => w.length > 1); if (!live.length) return html;
    const re = new RegExp('(' + live.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    const walk = n => {
      if (n.nodeType === 3) { if (!re.test(n.nodeValue)) return; re.lastIndex = 0; const span = document.createElement('span'); span.innerHTML = escH(n.nodeValue).replace(re, '<mark>$1</mark>'); n.replaceWith(...span.childNodes); return; }
      if (n.nodeType === 1 && !n.classList.contains('katex')) [...n.childNodes].forEach(walk);
    };
    walk(tmp); return tmp.innerHTML;
  };

  // ---- cards
  const grid = $('#grid');
  // masonry packing: each card spans as many 4px rows as it is tall (+16px gap); updated whenever a card changes size
  const ROW = 4, GAP = 16;
  grid.classList.add('masonry');
  const fit = el => { el.style.gridRowEnd = 'span ' + Math.ceil((el.getBoundingClientRect().height + GAP) / ROW); };
  const sizer = new ResizeObserver(list => list.forEach(en => fit(en.target)));
  function card(e) {
    const p = e.e, a = document.createElement('a');
    a.className = 'pcard'; a.href = 'index.html?p=' + encodeURIComponent(p.id); a.dataset.cat = p.cat; a.dataset.idx = e.i;
    a.innerHTML = '<div class="meta"><span class="cat-badge"><span class="ico">' + e.cat.icon + '</span>' + tr(e.cat.name) + '</span><span class="diff" title="Difficulty">' + '●'.repeat(p.diff) + '<i>' + '●'.repeat(3 - p.diff) + '</i></span></div>' +
      '<h3></h3><p class="statement"></p><figure class="figure"><svg role="img" aria-label="Figure"></svg></figure>' +
      '<div class="pc-foot"><span>' + tr('{n} options · {m} solution steps', { n: p.options, m: p.steps }) + '</span><span class="go">' + tr('Solve →') + '</span></div>';
    a.querySelector('h3').innerHTML = mark(escH(e.t), words);
    const st = a.querySelector('.statement'); mathText(st, e.s); st.innerHTML = mark(st.innerHTML, words);
    figObserver.observe(a);           // figure drawn only when the card scrolls into view
    sizer.observe(a);
    return a;
  }
  const figObserver = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const a = en.target; figObserver.unobserve(a);
    const drop = () => { const f = a.querySelector('.figure'); if (f) f.remove(); };
    PuzzleBank.load(index[+a.dataset.idx].e.id).then(p => { try { p.figure(a.querySelector('.figure svg')); } catch (err) { drop(); } }, drop);
    a.classList.add('in');
  }), { rootMargin: '250px' });

  let items = [], shown = 0;
  function fill() {
    const next = items.slice(shown, shown + BATCH);
    // size each card right away: an unsized masonry card is only 4px tall and would keep the sentinel in view
    next.forEach(e => { const a = card(e); grid.appendChild(a); fit(a); });
    shown += next.length;
    const more = shown < items.length;
    $('#sentinel').textContent = more ? tr('Loading more…') : '';
    return more;
  }
  // one batch at a time: another is added only while the sentinel is still within ~1 screen of the bottom
  const sentinelNear = () => $('#sentinel').getBoundingClientRect().top < innerHeight + 400;
  let busy = false;
  const topUp = () => {
    if (busy) return; busy = true;
    requestAnimationFrame(() => { busy = false; if (fill() && sentinelNear()) setTimeout(topUp, 60); });
  };
  new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) topUp(); }, { rootMargin: '400px' }).observe($('#sentinel'));

  // mix categories when browsing everything (round-robin), best matches first when searching
  function roundRobin(list) {
    const by = cats.map(c => list.filter(e => e.e.cat === c.id));
    const out = []; for (let i = 0; out.length < list.length; i++) by.forEach(l => { if (l[i]) out.push(l[i]); });
    return out;
  }
  function apply() {
    words = norm($('#lsearch').value).trim().split(/\s+/).filter(Boolean);
    const matching = index.map(e => ({ e, s: words.length ? score(e) : 0 })).filter(h => h.s >= 0);
    // counts per category (for the chips) ignore the category filter itself
    chips.querySelectorAll('.lchip').forEach(b => {
      const n = b.dataset.cat ? matching.filter(h => h.e.e.cat === b.dataset.cat).length : matching.length;
      b.querySelector('.n').textContent = n; b.classList.toggle('on', b.dataset.cat === catFilter); b.classList.toggle('zero', !n);
    });
    let list = matching.filter(h => !catFilter || h.e.e.cat === catFilter);
    items = words.length ? list.sort((a, b) => b.s - a.s || a.e.i - b.e.i).map(h => h.e) : roundRobin(list.map(h => h.e));
    grid.innerHTML = ''; shown = 0;
    const cat = cats.find(c => c.id === catFilter);
    const cnt = words.length ? tr(items.length === 1 ? '1 match' : '{n} matches', { n: items.length }) : tr(items.length === 1 ? '1 puzzle' : '{n} puzzles', { n: items.length });
    $('#lcount').textContent = cat ? tr('{count} in {cat}', { count: cnt, cat: tr(cat.name) }) : cnt;
    $('#lempty').hidden = items.length > 0;
    const url = new URL(location.href); catFilter ? url.searchParams.set('cat', catFilter) : url.searchParams.delete('cat'); history.replaceState(null, '', url);
    window.scrollTo(0, 0); topUp();
  }

  const inp = $('#lsearch');
  // the grid is rebuilt only on Enter, or after 5 s without typing (not on every key)
  let t, last = inp.value;
  const run = () => { clearTimeout(t); if (inp.value === last) return; last = inp.value; apply(); };
  inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 5000); if (!inp.value) run(); });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); run(); } if (e.key === 'Escape') { inp.value = ''; run(); } });
  document.addEventListener('keydown', e => { if (e.key === '/' && e.target !== inp) { e.preventDefault(); inp.focus(); } });
  const q = new URLSearchParams(location.search).get('q'); if (q) inp.value = q; last = inp.value;
  I18N.onChange(() => buildIndex().then(apply));
  buildIndex().then(apply);
})();
