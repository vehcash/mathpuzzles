/* cheatsheets.html — formula sheets by topic.
   Data: cheats/<topic>.js call Cheats.topic({ id, icon, color, bg, cat, name, blurb, sections: [...] }).
   Translatable text is one string 'English|Français|Español|日本語|中文' (missing parts fall back to English).
   A section is { t: title, fig?: figure name (js/cheat-figs.js), items: [...] };
   an item is [name, tex, note?, { fig?, ex? }?] or { tbl: [[tex, …], …] } for a small table (first row is the header);
   the optional last object adds a small figure under the formula (fig) and a worked example box (ex, translated text with $tex$). */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
  const li = () => Math.max(0, LANGS.indexOf(I18N.lang));
  const pick = s => { if (!s) return ''; const p = String(s).split('|'); return (p[li()] || p[0]).trim(); };
  const en = s => String(s || '').split('|')[0].trim();
  const norm = t => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const K = (tex, display) => { try { return katex.renderToString((display ? '\\displaystyle ' : '') + tex, { throwOnError: false }); } catch (e) { return esc(tex); } };
  const inline = s => esc(s).replace(/\$([^$]+)\$/g, (_, t) => K(t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')));
  // words a formula is known by, so "sin", "integral", "sqrt" also find it
  const texWords = t => String(t).replace(/\\(sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|ln|log|lim|exp|det|gcd|lcm)\b/g, ' $1 ')
    .replace(/\\int/g, ' integral ').replace(/\\sum/g, ' sum ').replace(/\\sqrt/g, ' sqrt root ').replace(/\\binom/g, ' binomial choose ')
    .replace(/\\pi/g, ' pi ').replace(/\\infty/g, ' infinity ').replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_\\]/g, ' ');

  // a table cell is a formula, or translated text when it starts with '~' ('~en|fr|es|ja|zh')
  const EX = 'Example|Exemple|Ejemplo|例|例';
  const SYM = 'Symbols:|Symboles :|Símbolos:|記号：|符号：';
  const fig = (name, cls) => name && window.CheatFigs && CheatFigs[name] ? `<figure class="cf${cls ? ' ' + cls : ''}">${CheatFigs[name](I18N.lang)}</figure>` : '';
  const cell = c => String(c).startsWith('~') ? '<span class="cs-cell">' + inline(pick(String(c).slice(1))) + '</span>' : K(c, true);
  const META = window.CheatsIndex || [];   // every topic without its formulas (js/cheats-index.js, generated)
  const main = $('#cs-main'), side = $('#cs-topics');
  const total = META.reduce((a, t) => a + t.n, 0);
  // a phone held upright has no room for the blackboard: tapping a formula does nothing there (⧉ still copies)
  const phone = matchMedia('(max-width: 760px) and (orientation: portrait)');

  // ---------- loading a topic's formulas on demand ----------
  const V = '20261113f';   // bump when cheats/*.js change
  const loaded = {};
  const script = src => loaded[src] || (loaded[src] = new Promise(ok => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ok; document.head.appendChild(s); }));
  const common = () => Promise.all([script('js/cheat-figs.js?v=' + V), script('cheats/symbols.js?v=' + V)]);
  const model = {};   // topic id → { tp, cards: [{ s, head, items: [{ it, text, el }] }] }, once its file is in
  function load(id) {
    if (model[id]) return Promise.resolve(model[id]);
    return Promise.all([common(), script('cheats/' + id + '.js?v=' + V)]).then(() => {
      const tp = Cheats.topics.find(t => t.id === id);
      if (!tp) return null;
      if (!model[id]) model[id] = index(tp);
      return model[id];
    });
  }
  const loadAll = () => Promise.all(META.map(t => load(t.id)));

  // the words each formula can be found by (no rendering needed, so search works before a topic is drawn)
  function index(tp) {
    const cards = tp.sections.map(s => {
      const head = norm(en(s.t) + ' ' + pick(s.t) + ' ' + en(tp.name) + ' ' + pick(tp.name));
      const items = s.items.map(it => {
        let text;
        if (it.tbl) text = norm((it.k || '') + ' ' + it.tbl.flat().join(' ').replace(/[~|]/g, ' ') + ' ' + texWords(it.tbl.flat().join(' ')));
        else {
          const [name, texs, note, opt] = it;
          const o = opt && typeof opt === 'object' && !Array.isArray(opt) ? opt : {};
          const sym = ((Cheats.symbols || {})[tp.id] || {})[en(s.t) + '/' + en(name || '')];
          const tex = Array.isArray(texs) ? (texs[LANGS.indexOf(I18N.lang)] || texs[0]) : texs;
          text = norm(String(name || '').replace(/\|/g, ' ') + ' ' + String(note || '').replace(/\|/g, ' ') + ' ' + String(sym || '').replace(/\|/g, ' ') + ' ' + String(o.ex || '').replace(/\|/g, ' ') + ' ' + texWords(Array.isArray(texs) ? texs.join(' ') : tex));
        }
        return { it, text, el: null };
      });
      return { s, head, items, el: null };
    });
    return { tp, cards };
  }

  // ---------- one empty section per topic; its cards are drawn when it comes near the screen ----------
  const secs = {};
  META.forEach(m => {
    const sec = document.createElement('section');
    sec.className = 'cs-topic pending'; sec.dataset.topic = m.id; sec.style.setProperty('--c', m.color); sec.style.setProperty('--cbg', m.bg);
    const practice = m.cat ? `<a class="cs-practice" href="index.html?cat=${m.cat}">${esc(tr('Practice puzzles →'))}</a>` : '';
    sec.innerHTML = `<header class="cs-head"><span class="cs-ico">${m.icon}</span><div><h1>${esc(pick(m.name))}</h1><p>${inline(pick(m.blurb))}</p></div><div class="cs-head-r"><span class="cs-n">${esc(tr(m.n === 1 ? '1 formula' : '{n} formulas', { n: m.n }))}</span>${practice}</div></header><div class="cs-cards" style="min-height:${Math.round(m.n * 60)}px"></div>`;
    main.appendChild(sec); secs[m.id] = sec;
  });

  function render(id) {
    const sec = secs[id], md = model[id];
    if (!sec || !md || sec._done) return;
    sec._done = true;
    const { tp } = md, cards = sec.querySelector('.cs-cards');
    const frag = document.createDocumentFragment();
    md.cards.forEach(c => {
      const s = c.s, card = document.createElement('article'); card.className = 'cs-card' + (s.wide ? ' wide' : '');
      card.innerHTML = `<h2>${esc(pick(s.t))}</h2>` + [].concat(s.fig || []).map(f => fig(f)).join('');
      c.items.forEach(x => {
        const it = x.it, el = document.createElement('div');
        if (it.tbl) {
          el.className = 'cs-item cs-tblwrap';
          el.innerHTML = '<table class="cs-tbl' + (it.cls ? ' ' + it.cls : '') + '">' + it.tbl.map((r, i) => '<tr>' + r.map((cc, j) => (i === 0 || j === 0 ? '<th>' : '<td>') + cell(cc) + (i === 0 || j === 0 ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</table>';
          el.dataset.tex = it.tbl.map(r => r.map(cc => String(cc).startsWith('~') ? '\\text{' + pick(String(cc).slice(1)) + '}' : cc).join(' & ')).join(' \\\\ ');
        } else {
          const [name, texs, note, opt] = it;
          const o = opt && typeof opt === 'object' && !Array.isArray(opt) ? opt : {};
          const tex = Array.isArray(texs) ? (texs[LANGS.indexOf(I18N.lang)] || texs[0]) : texs;   // a formula with words may come in five versions
          el.className = 'cs-item';
          const sym = ((Cheats.symbols || {})[tp.id] || {})[en(s.t) + '/' + en(name || '')];   // what the letters stand for (cheats/symbols.js)
          el.innerHTML = (name ? `<div class="cs-name">${esc(pick(name))}</div>` : '') + `<div class="cs-tex"${phone.matches ? '' : ` title="${esc(tr('Click for a step-by-step explanation'))}"`}>${tex.split(/\\qquad/).map(part => '<span class="cs-part">' + K(part.trim().replace(/,$/, ''), true) + '</span>').join('')}</div>` + (note ? `<div class="cs-note">${inline(pick(note))}</div>` : '') +
            (sym ? `<div class="cs-sym"><b>${esc(pick(SYM))}</b> ${inline(pick(sym))}</div>` : '') +
            fig(o.fig, 'mini') + (o.ex ? `<div class="cs-ex"><b>${esc(pick(EX))}</b> ${inline(pick(o.ex))}</div>` : '');
          el.dataset.tex = tex;
        }
        el._tu = { tp, s, it };   // the card's tutorial (js/tutor.js)
        el.tabIndex = 0; el.setAttribute('role', 'button');
        el.insertAdjacentHTML('afterbegin', `<button type="button" class="cs-copy" title="${esc(tr('Copy LaTeX'))}" aria-label="${esc(tr('Copy LaTeX'))}">⧉</button>`);
        card.appendChild(el); x.el = el;
      });
      c.el = card; frag.appendChild(card);
    });
    cards.appendChild(frag); cards.style.minHeight = ''; sec.classList.remove('pending');
    filter(id); fit(sec);
  }

  // draw a topic shortly before it scrolls into view
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.dataset.topic; io.unobserve(e.target);
    load(id).then(() => render(id));
  }), { rootMargin: '800px 0px' }) : null;
  META.forEach(m => io ? io.observe(secs[m.id]) : load(m.id).then(() => render(m.id)));
  addEventListener('beforeprint', () => META.forEach(m => render(m.id)));   // print what is loaded (formulas/ is the full printable version)

  // ---------- sidebar ----------
  const mkTopic = (id, icon, label, n, color) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cs-tp'; b.dataset.topic = id;
    if (color) b.style.setProperty('--c', color);
    b.innerHTML = `<span class="ico">${icon}</span><span class="nm">${esc(label)}</span><span class="n">${n}</span>`;
    b.onclick = () => { if (q.value) { q.value = ''; } show(id); window.scrollTo({ top: 0 }); };
    side.appendChild(b); return b;
  };
  mkTopic('all', '☰', tr('All topics'), total);
  META.forEach(m => mkTopic(m.id, m.icon, pick(m.name), m.n, m.color));

  // ---------- show a topic / search ----------
  const params = new URLSearchParams(location.search);
  let current = META.some(t => t.id === params.get('t')) ? params.get('t') : 'all';
  const q = $('#cs-q');
  if (params.get('q')) q.value = params.get('q');
  const words = () => norm(q.value).trim().split(/\s+/).filter(Boolean);

  function mark(el, ws) {
    el.querySelectorAll('mark').forEach(m => m.replaceWith(...m.childNodes));
    if (!ws.length) return;
    const re = new RegExp('(' + ws.filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
    if (re.source === '()') return;
    el.querySelectorAll('.cs-name').forEach(n => { n.innerHTML = esc(n.textContent).replace(re, '<mark>$1</mark>'); });
  }
  // a formula matches when every word is in its own text or in its card / topic title
  const hit = (c, x, ws) => ws.every(w => x.text.includes(w) || c.head.includes(w));

  // show / hide the drawn cards of one topic for the current search
  function filter(id) {
    const md = model[id]; if (!md) return;
    const ws = words();
    md.cards.forEach(c => {
      let any = false;
      c.items.forEach(x => { const ok = !ws.length || hit(c, x, ws); any = any || ok; if (x.el) { x.el.hidden = !ok; mark(x.el, ok ? ws : []); } });
      if (c.el) c.el.hidden = !any;
    });
  }

  let seq = 0;
  function show(id) {
    if (id) current = id;
    const ws = words(), my = ++seq;
    if (!ws.length) {
      META.forEach(m => { secs[m.id].hidden = current !== 'all' && m.id !== current; filter(m.id); });
      const shown = current === 'all' ? total : (META.find(m => m.id === current) || {}).n || 0;
      $('#cs-count').textContent = tr(shown === 1 ? '1 formula' : '{n} formulas', { n: shown });
      $('#cs-empty').hidden = true;
      after(ws);
      if (current !== 'all') load(current).then(() => render(current));
    } else {
      // searching needs every topic's words (light files), but only the topics with matches get drawn
      document.body.classList.add('searching');
      loadAll().then(() => {
        if (my !== seq) return;
        let shown = 0;
        META.forEach(m => {
          const md = model[m.id]; let n = 0;
          if (md) md.cards.forEach(c => c.items.forEach(x => { if (hit(c, x, ws)) n++; }));
          secs[m.id].hidden = !n; shown += n;
          filter(m.id);
        });
        $('#cs-count').textContent = tr(shown === 1 ? '1 match' : '{n} matches', { n: shown });
        const empty = $('#cs-empty'); empty.hidden = shown > 0;
        if (!shown) empty.textContent = tr('No formula matches “{q}”.', { q: q.value.trim() });
        after(ws);
        requestAnimationFrame(() => fit());
      });
    }
  }
  function after(ws) {
    side.querySelectorAll('.cs-tp').forEach(b => b.classList.toggle('on', !ws.length && b.dataset.topic === current));
    // a title and description per topic, for search engines and browser tabs
    const tp = META.find(t => t.id === current);
    document.title = (tp ? tr('{topic} formulas and theorems', { topic: pick(tp.name) }) + ' — ' : '') + tr('Math cheat sheets') + ' | Daily Math Puzzle';
    const md = document.head.querySelector('meta[name="description"]'); if (md && tp) md.setAttribute('content', esc(pick(tp.blurb)).replace(/\$[^$]*\$/g, '').slice(0, 158));
    const cl = document.head.querySelector('link[rel="canonical"]'); if (cl) { const lang = new URLSearchParams(location.search).get('lang'); cl.setAttribute('href', 'https://dailymathpuzzle.com/cheatsheets.html' + (tp ? '?t=' + tp.id : '') + (lang && lang !== 'en' ? (tp ? '&' : '?') + 'lang=' + lang : '')); }
    document.body.classList.toggle('searching', !!ws.length);
    try { const url = new URL(location.href); current !== 'all' ? url.searchParams.set('t', current) : url.searchParams.delete('t'); q.value.trim() ? url.searchParams.set('q', q.value.trim()) : url.searchParams.delete('q'); history.replaceState(null, '', url); } catch (e) { /* file:// */ }
  }

  let t;
  q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => show(), 150); });
  q.addEventListener('keydown', e => { if (e.key === 'Escape') { q.value = ''; show(); } if (e.key === 'Enter') { e.preventDefault(); clearTimeout(t); show(); } });
  document.addEventListener('keydown', e => { if (e.key === '/' && e.target !== q) { e.preventDefault(); q.focus(); } });

  // ---------- click a formula to copy its LaTeX ----------
  const toast = $('#cs-toast'); let tt;
  const say = msg => { toast.textContent = msg; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 1600); };
  const copy = text => {
    const done = () => say(tr('LaTeX copied'));
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
    fallback(text, done);
  };
  const fallback = (text, done) => { const a = document.createElement('textarea'); a.value = text; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ } a.remove(); };
  // ⧉ copies the LaTeX; anywhere else on a card opens its tutorial on the blackboard
  main.addEventListener('click', e => {
    const it = e.target.closest('.cs-item'); if (!it) return;
    if (e.target.closest('.cs-copy')) { copy(it.dataset.tex); it.classList.add('copied'); setTimeout(() => it.classList.remove('copied'), 700); return; }
    if (e.target.closest('a')) return;
    // in a table, each row (after the header) has its own lesson
    const tr = e.target.closest('.cs-tbl tr'), row = tr ? [...tr.parentNode.children].indexOf(tr) : -1;
    if (phone.matches || !it._tu) return;   // no blackboard on an upright phone
    script('js/tutor.js?v=' + V).then(() => { if (window.Tutor) Tutor.open(it._tu.tp, it._tu.s, it._tu.it, it, row > 0 ? { row } : {}); });
  });
  main.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('cs-item')) { e.preventDefault(); e.target.click(); } });

  // a formula wider than its card is scaled down (to 62% at most); anything wider still scrolls
  function fit(root) {
    (root || main).querySelectorAll(':scope .cs-card:not([hidden]) .cs-item:not([hidden]) .cs-part').forEach(p => {
      if (p.closest('.cs-topic[hidden]')) return;
      p.style.fontSize = '';
      const cs = getComputedStyle(p.parentElement), box = p.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2;
      let k = 1;
      for (let i = 0; i < 3 && box > 0 && p.scrollWidth > box && k > 0.62; i++) { k = Math.max(0.62, k * box / p.scrollWidth); p.style.fontSize = k.toFixed(3) + 'em'; }
    });
  }
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => fit(), 150); });
  if (document.fonts) document.fonts.ready.then(() => fit());
  show();
  // the links to the static compendium pages, in the page's language
  const cpLinks = document.querySelector('.cs-foot [data-no-i18n]');
  if (cpLinks) cpLinks.innerHTML = META.map(tp => `<a href="formulas/${I18N.lang === 'en' ? '' : I18N.lang + '/'}${tp.id}.html">${esc(pick(tp.name))}</a>`).join(' · ');
  window.CheatsUI = { show, copy };
})();
