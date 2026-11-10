/* cheatsheets.html — formula sheets by topic.
   Data: cheats/<topic>.js call Cheats.topic({ id, icon, color, bg, cat, name, blurb, sections: [...] }).
   Translatable text is one string 'English|Français|Español|日本語|中文' (missing parts fall back to English).
   A section is { t: title, fig?: figure name (js/cheat-figs.js), items: [...] };
   an item is [name, tex, note?] or { tbl: [[tex, …], …] } for a small table (first row is the header). */
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
  const cell = c => String(c).startsWith('~') ? '<span class="cs-cell">' + inline(pick(String(c).slice(1))) + '</span>' : K(c, true);
  const topics = Cheats.topics;
  const main = $('#cs-main'), side = $('#cs-topics');
  const items = [];   // every rendered formula: { el, card, topic, text }

  // ---------- build every topic once ----------
  topics.forEach(tp => {
    const sec = document.createElement('section');
    sec.className = 'cs-topic'; sec.dataset.topic = tp.id; sec.style.setProperty('--c', tp.color); sec.style.setProperty('--cbg', tp.bg);
    const n = tp.sections.reduce((a, s) => a + s.items.length, 0); tp.count = n;
    const practice = tp.cat ? `<a class="cs-practice" href="index.html?cat=${tp.cat}">${esc(tr('Practice puzzles →'))}</a>` : '';
    sec.innerHTML = `<header class="cs-head"><span class="cs-ico">${tp.icon}</span><div><h1>${esc(pick(tp.name))}</h1><p>${inline(pick(tp.blurb))}</p></div><div class="cs-head-r"><span class="cs-n">${esc(tr(n === 1 ? '1 formula' : '{n} formulas', { n }))}</span>${practice}</div></header><div class="cs-cards"></div>`;
    const cards = sec.querySelector('.cs-cards');
    tp.sections.forEach(s => {
      const card = document.createElement('article'); card.className = 'cs-card' + (s.wide ? ' wide' : '');
      const title = pick(s.t);
      card.innerHTML = `<h2>${esc(title)}</h2>` + (s.fig && CheatFigs[s.fig] ? `<figure class="cf">${CheatFigs[s.fig](I18N.lang)}</figure>` : '');
      card._head = norm(en(s.t) + ' ' + title + ' ' + en(tp.name) + ' ' + pick(tp.name));
      s.items.forEach(it => {
        const el = document.createElement('div');
        let text;
        if (it.tbl) {
          el.className = 'cs-item cs-tblwrap';
          el.innerHTML = '<table class="cs-tbl' + (it.cls ? ' ' + it.cls : '') + '">' + it.tbl.map((r, i) => '<tr>' + r.map((c, j) => (i === 0 || j === 0 ? '<th>' : '<td>') + cell(c) + (i === 0 || j === 0 ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</table>';
          el.dataset.tex = it.tbl.map(r => r.map(c => String(c).startsWith('~') ? '\\text{' + pick(String(c).slice(1)) + '}' : c).join(' & ')).join(' \\\\ ');
          text = norm((it.k || '') + ' ' + it.tbl.flat().join(' ').replace(/[~|]/g, ' ') + ' ' + texWords(el.dataset.tex));
        } else {
          const [name, texs, note] = it;
          const tex = Array.isArray(texs) ? (texs[LANGS.indexOf(I18N.lang)] || texs[0]) : texs;   // a formula with words may come in five versions
          el.className = 'cs-item';
          el.innerHTML = (name ? `<div class="cs-name">${esc(pick(name))}</div>` : '') + `<div class="cs-tex" title="${esc(tr('Click a formula to copy its LaTeX'))}">${tex.split(/\\qquad/).map(part => '<span class="cs-part">' + K(part.trim().replace(/,$/, ''), true) + '</span>').join('')}</div>` + (note ? `<div class="cs-note">${inline(pick(note))}</div>` : '');
          el.dataset.tex = tex;
          text = norm(String(name || '').replace(/\|/g, ' ') + ' ' + String(note || '').replace(/\|/g, ' ') + ' ' + texWords(Array.isArray(texs) ? texs.join(' ') : tex));
        }
        card.appendChild(el);
        items.push({ el, card, topic: tp.id, text });
      });
      cards.appendChild(card);
    });
    main.appendChild(sec);
  });

  // ---------- sidebar ----------
  const mkTopic = (id, icon, label, n, color) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cs-tp'; b.dataset.topic = id;
    if (color) b.style.setProperty('--c', color);
    b.innerHTML = `<span class="ico">${icon}</span><span class="nm">${esc(label)}</span><span class="n">${n}</span>`;
    b.onclick = () => { if (q.value) { q.value = ''; } showAndFit(id); window.scrollTo({ top: 0 }); };
    side.appendChild(b); return b;
  };
  mkTopic('all', '☰', tr('All topics'), items.length);
  topics.forEach(tp => mkTopic(tp.id, tp.icon, pick(tp.name), tp.count, tp.color));

  // ---------- show a topic / search ----------
  const params = new URLSearchParams(location.search);
  let current = topics.some(t => t.id === params.get('t')) ? params.get('t') : 'all';
  const q = $('#cs-q');
  if (params.get('q')) q.value = params.get('q');

  function mark(el, words) {
    el.querySelectorAll('mark').forEach(m => m.replaceWith(...m.childNodes));
    if (!words.length) return;
    const re = new RegExp('(' + words.filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
    if (re.source === '()') return;
    el.querySelectorAll('.cs-name').forEach(n => { n.innerHTML = esc(n.textContent).replace(re, '<mark>$1</mark>'); });
  }

  function show(id) {
    if (id) current = id;
    const words = norm(q.value).trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    if (!words.length) {
      main.querySelectorAll('.cs-topic').forEach(s => { s.hidden = current !== 'all' && s.dataset.topic !== current; });
      main.querySelectorAll('.cs-card').forEach(c => { c.hidden = false; });
      items.forEach(it => { it.el.hidden = false; mark(it.el, []); if (current === 'all' || it.topic === current) shown++; });
      $('#cs-count').textContent = tr(shown === 1 ? '1 formula' : '{n} formulas', { n: shown });
    } else {
      // a formula matches when every word is in its own text or in its card / topic title
      const hitCards = new Set(), hitTopics = new Set();
      items.forEach(it => {
        const ok = words.every(w => it.text.includes(w) || it.card._head.includes(w));
        it.el.hidden = !ok; mark(it.el, ok ? words : []);
        if (ok) { shown++; hitCards.add(it.card); hitTopics.add(it.topic); }
      });
      main.querySelectorAll('.cs-card').forEach(c => { c.hidden = !hitCards.has(c); });
      main.querySelectorAll('.cs-topic').forEach(s => { s.hidden = !hitTopics.has(s.dataset.topic); });
      $('#cs-count').textContent = tr(shown === 1 ? '1 match' : '{n} matches', { n: shown });
    }
    const empty = $('#cs-empty'); empty.hidden = shown > 0;
    if (!shown) empty.textContent = tr('No formula matches “{q}”.', { q: q.value.trim() });
    side.querySelectorAll('.cs-tp').forEach(b => b.classList.toggle('on', !words.length && b.dataset.topic === current));
    document.body.classList.toggle('searching', !!words.length);
    try { const url = new URL(location.href); current !== 'all' ? url.searchParams.set('t', current) : url.searchParams.delete('t'); q.value.trim() ? url.searchParams.set('q', q.value.trim()) : url.searchParams.delete('q'); history.replaceState(null, '', url); } catch (e) { /* file:// */ }
  }

  // the formulas are already on the page, so searching only hides and shows them: instant
  let t;
  q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => showAndFit(), 120); });
  q.addEventListener('keydown', e => { if (e.key === 'Escape') { q.value = ''; showAndFit(); } if (e.key === 'Enter') { e.preventDefault(); clearTimeout(t); showAndFit(); } });
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
  main.addEventListener('click', e => { const f = e.target.closest('.cs-tex, .cs-tbl'); if (!f) return; const it = f.closest('.cs-item'); copy(it.dataset.tex); it.classList.add('copied'); setTimeout(() => it.classList.remove('copied'), 700); });

  // a formula wider than its card is scaled down (to 62% at most); anything wider still scrolls
  function fit() {
    main.querySelectorAll('.cs-topic:not([hidden]) .cs-card:not([hidden]) .cs-item:not([hidden]) .cs-part').forEach(p => {
      p.style.fontSize = '';
      const cs = getComputedStyle(p.parentElement), box = p.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2;
      let k = 1;
      for (let i = 0; i < 3 && box > 0 && p.scrollWidth > box && k > 0.62; i++) { k = Math.max(0.62, k * box / p.scrollWidth); p.style.fontSize = k.toFixed(3) + 'em'; }
    });
  }
  const showAndFit = id => { show(id); requestAnimationFrame(fit); };
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 150); });
  if (document.fonts) document.fonts.ready.then(fit);
  showAndFit();
  window.CheatsUI = { show: showAndFit };
})();
