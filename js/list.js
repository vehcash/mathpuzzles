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

  const index = PuzzleBank.puzzles.map((p, i) => {
    const cat = cats.find(c => c.id === p.category);
    return { p, cat, i, title: norm(p.title), catText: norm(cat.name + ' ' + cat.id), body: norm(plain(p.statement) + ' ' + (p.figureText || '') + ' ' + plain(p.hint) + ' ' + (p.steps || []).map(s => plain(s.title) + ' ' + plain(s.note)).join(' ')) };
  });

  // ---- category filter chips
  let catFilter = new URLSearchParams(location.search).get('cat') || '';
  const chips = $('#lfilters');
  const mkChip = (id, label, icon) => {
    const b = document.createElement('button'); b.className = 'lchip'; b.dataset.cat = id;
    b.innerHTML = (icon ? '<span class="ico">' + icon + '</span>' : '') + '<span>' + label + '</span><span class="n"></span>';
    b.onclick = () => { catFilter = catFilter === id ? '' : id; apply(); };
    chips.appendChild(b);
  };
  mkChip('', 'All');
  cats.forEach(c => mkChip(c.id, c.name, c.icon));

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
  function card(e) {
    const p = e.p, a = document.createElement('a');
    a.className = 'pcard'; a.href = 'index.html?p=' + encodeURIComponent(p.id); a.dataset.cat = p.category; a.dataset.idx = e.i;
    a.innerHTML = '<div class="meta"><span class="cat-badge"><span class="ico">' + e.cat.icon + '</span>' + e.cat.name + '</span><span class="diff" title="Difficulty">' + '●'.repeat(p.difficulty) + '<i>' + '●'.repeat(3 - p.difficulty) + '</i></span></div>' +
      '<h3></h3><p class="statement"></p><figure class="figure"><svg role="img" aria-label="Figure"></svg></figure>' +
      '<div class="pc-foot"><span>' + p.options.length + ' options · ' + (p.steps || []).length + ' solution steps</span><span class="go">Solve →</span></div>';
    a.querySelector('h3').innerHTML = mark(escH(p.title), words);
    const st = a.querySelector('.statement'); mathText(st, p.statement); st.innerHTML = mark(st.innerHTML, words);
    figObserver.observe(a);           // figure drawn only when the card scrolls into view
    return a;
  }
  const figObserver = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const a = en.target; figObserver.unobserve(a);
    try { index[+a.dataset.idx].p.figure(a.querySelector('svg')); } catch (err) { const f = a.querySelector('.figure'); if (f) f.remove(); }
    a.classList.add('in');
  }), { rootMargin: '250px' });

  let items = [], shown = 0;
  function fill() {
    const next = items.slice(shown, shown + BATCH);
    next.forEach(e => grid.appendChild(card(e)));
    shown += next.length;
    const more = shown < items.length;
    $('#sentinel').textContent = more ? 'Loading more…' : items.length ? '' : '';
    return more;
  }
  const sentinelNear = () => $('#sentinel').getBoundingClientRect().top < innerHeight + 700;
  const topUp = () => { if (fill() && sentinelNear()) requestAnimationFrame(topUp); };
  new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) topUp(); }, { rootMargin: '700px' }).observe($('#sentinel'));

  // mix categories when browsing everything (round-robin), best matches first when searching
  function roundRobin(list) {
    const by = cats.map(c => list.filter(e => e.p.category === c.id));
    const out = []; for (let i = 0; out.length < list.length; i++) by.forEach(l => { if (l[i]) out.push(l[i]); });
    return out;
  }
  function apply() {
    words = norm($('#lsearch').value).trim().split(/\s+/).filter(Boolean);
    const matching = index.map(e => ({ e, s: words.length ? score(e) : 0 })).filter(h => h.s >= 0);
    // counts per category (for the chips) ignore the category filter itself
    chips.querySelectorAll('.lchip').forEach(b => {
      const n = b.dataset.cat ? matching.filter(h => h.e.p.category === b.dataset.cat).length : matching.length;
      b.querySelector('.n').textContent = n; b.classList.toggle('on', b.dataset.cat === catFilter); b.classList.toggle('zero', !n);
    });
    let list = matching.filter(h => !catFilter || h.e.p.category === catFilter);
    items = words.length ? list.sort((a, b) => b.s - a.s || a.e.i - b.e.i).map(h => h.e) : roundRobin(list.map(h => h.e));
    grid.innerHTML = ''; shown = 0;
    const cat = cats.find(c => c.id === catFilter);
    $('#lcount').textContent = (words.length ? items.length + ' match' + (items.length === 1 ? '' : 'es') : items.length + ' puzzle' + (items.length === 1 ? '' : 's')) + (cat ? ' in ' + cat.name : '');
    $('#lempty').hidden = items.length > 0;
    const url = new URL(location.href); catFilter ? url.searchParams.set('cat', catFilter) : url.searchParams.delete('cat'); history.replaceState(null, '', url);
    window.scrollTo(0, 0); requestAnimationFrame(topUp);
  }

  const inp = $('#lsearch');
  let t; inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(apply, 90); });
  inp.addEventListener('keydown', e => { if (e.key === 'Escape') { inp.value = ''; apply(); } });
  document.addEventListener('keydown', e => { if (e.key === '/' && e.target !== inp) { e.preventDefault(); inp.focus(); } });
  const q = new URLSearchParams(location.search).get('q'); if (q) inp.value = q;
  apply();
})();
