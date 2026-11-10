/* I18N — English, Français, Español, 日本語, 简体中文.
   • Dictionaries are keyed by the English text itself (gettext style): tr('Plot') → 'Tracer'.
   • Static and dynamically created interface text is translated automatically by a MutationObserver
     (text nodes + title / placeholder / aria-label). Areas marked [data-no-i18n] are skipped.
   • Puzzle content and messages built from pieces use tr(english, {vars}) directly.
   • First visit: the browser's preferred languages decide; a click on a flag changes it and (with consent) remembers it. */
(function (global) {
  'use strict';
  const LANGS = [
    { code: 'en', name: 'English', html: 'en', flag: '<rect width="30" height="20" fill="#012169"/><path d="M0 0 30 20M30 0 0 20" stroke="#fff" stroke-width="4"/><path d="M0 0 30 20M30 0 0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/>' },
    { code: 'fr', name: 'Français', html: 'fr', flag: '<rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/>' },
    { code: 'es', name: 'Español', html: 'es', flag: '<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/>' },
    { code: 'ja', name: '日本語', html: 'ja', flag: '<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>' },
    { code: 'zh', name: '简体中文', html: 'zh-CN', flag: '<rect width="30" height="20" fill="#DE2910"/><g fill="#FFDE00"><path d="M5 2.2l1.1 3.3h3.5L6.8 7.6l1.1 3.3L5 8.9l-2.9 2 1.1-3.3L.4 5.5h3.5z"/><circle cx="10.6" cy="2.3" r=".9"/><circle cx="12.4" cy="4.4" r=".9"/><circle cx="12.4" cy="7.2" r=".9"/><circle cx="10.6" cy="9.2" r=".9"/></g>' }
  ];
  const dict = { en: {} };
  const listeners = [];
  const norm = s => s.replace(/\s+/g, ' ').trim();

  function detect() {
    try { const u = new URLSearchParams(location.search).get('lang'); if (u && LANGS.some(l => l.code === u)) return u; } catch (e) { /* */ }
    const saved = global.Store && Store.get('cp_lang');
    if (saved && LANGS.some(l => l.code === saved)) return saved;
    const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']).map(x => String(x).toLowerCase());
    for (const p of prefs) { const base = p.split('-')[0]; if (LANGS.some(l => l.code === base)) return base; }
    return 'en';
  }

  const I18N = {
    LANGS, lang: 'en', local: null,
    /** run fn with a puzzle's own word list active ({ english: { fr, es, ja, zh } }) */
    withLocal(words, fn) { const prev = I18N.local; I18N.local = words || null; try { return fn(); } finally { I18N.local = prev; } },
    add(code, entries) { dict[code] = Object.assign(dict[code] || {}, entries); },
    has(text) { const d = dict[I18N.lang]; return !!(d && d[norm(text)] !== undefined); },
    /** translate an English string; {name} placeholders are filled from vars */
    t(en, vars) {
      if (en === undefined || en === null) return '';
      const key = norm(String(en));
      if (I18N.collect) I18N.collect.add(key);
      const loc = I18N.local && I18N.local[key];   // words of the puzzle being drawn win over the site dictionary
      let out = I18N.lang === 'en' ? String(en) : (loc && loc[I18N.lang] !== undefined) ? loc[I18N.lang] : (dict[I18N.lang] && dict[I18N.lang][key] !== undefined) ? dict[I18N.lang][key] : String(en);
      if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
      return out;
    },
    /** translate the words inside \text{…} of a LaTeX string */
    tex(src) { return I18N.lang === 'en' ? src : String(src).replace(/\\text\{([^{}]*)\}/g, (m, w) => { const lead = w.match(/^\s*/)[0], trail = w.match(/\s*$/)[0]; return '\\text{' + lead + I18N.t(w.trim()) + trail + '}'; }); },
    set(code, persist = true) {
      if (!LANGS.some(l => l.code === code)) code = 'en';
      I18N.lang = code;
      const L = LANGS.find(l => l.code === code);
      document.documentElement.lang = L.html;
      document.documentElement.dataset.lang = code;
      if (persist && global.Store) Store.set('cp_lang', code);
      retranslateAll();
      document.querySelectorAll('.flags .flag').forEach(b => b.classList.toggle('on', b.dataset.lang === code));
      listeners.forEach(fn => { try { fn(code); } catch (e) { console.error(e); } });
    },
    onChange(fn) { listeners.push(fn); },
    /** small flag selector */
    flags(host) {
      const box = document.createElement('div'); box.className = 'flags'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Language'); box.dataset.noI18n = '';
      LANGS.forEach(L => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'flag' + (L.code === I18N.lang ? ' on' : ''); b.dataset.lang = L.code; b.title = L.name; b.setAttribute('aria-label', L.name); b.lang = L.html;
        b.innerHTML = '<svg viewBox="0 0 30 20" aria-hidden="true">' + L.flag + '</svg>';
        // switch language and reload the page so every text (including what scripts built earlier) is in the new language.
        // The choice travels in the address (?lang=) so it also works when preferences may not be stored.
        b.onclick = () => {
          if (L.code === I18N.lang) return;
          if (global.Store) Store.set('cp_lang', L.code);
          const url = new URL(location.href); url.searchParams.set('lang', L.code); location.replace(url.href);
        };
        box.appendChild(b);
      });
      host.appendChild(box); return box;
    }
  };

  // ---------- automatic DOM translation ----------
  const origText = new WeakMap(), origAttr = new WeakMap();
  const SKIP = 'script,style,svg,canvas,textarea,input,select,.katex,.ink-math,[data-no-i18n],[data-i18n-html]';
  const origHtml = new WeakMap();
  // rich text blocks (with <b>, <kbd>…) are translated as a whole: key = their English innerHTML
  function translateHtml(el) {
    let en = origHtml.get(el); if (en === undefined) { en = el.innerHTML; origHtml.set(el, en); }
    const out = I18N.t(en); if (el.innerHTML !== out) el.innerHTML = out;
  }
  const ATTRS = ['title', 'placeholder', 'aria-label'];
  let busy = false;
  function translateTextNode(n) {
    const p = n.parentElement; if (!p || p.closest(SKIP)) return;
    const cur = n.nodeValue; if (!cur || !/[A-Za-z]/.test(cur) && !origText.has(n)) return;
    let en = origText.get(n);
    // if the code changed the text since we translated it, the new text is the new original
    if (en === undefined || (cur !== I18N.t(en) && cur !== en)) { en = cur; origText.set(n, en); }
    const key = norm(en); if (!key) return;
    const tr = I18N.t(key);
    const out = tr === key ? en : en.replace(key, tr);
    if (cur !== out) n.nodeValue = out;
  }
  function translateAttrs(el) {
    if (el.closest && el.closest('[data-no-i18n]') && !el.matches('.flag')) return;
    let saved = origAttr.get(el); if (!saved) { saved = {}; origAttr.set(el, saved); }
    ATTRS.forEach(a => {
      if (!el.hasAttribute(a)) return;
      const cur = el.getAttribute(a);
      if (saved[a] === undefined || (cur !== I18N.t(saved[a]) && cur !== saved[a])) saved[a] = cur;
      const out = I18N.t(saved[a]); if (cur !== out) el.setAttribute(a, out);
    });
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { translateTextNode(root); return; }
    if (root.nodeType !== 1) return;
    if (root.matches('[data-i18n-html]') && !root.closest('[data-no-i18n]')) { translateHtml(root); return; }
    if (root.matches && root.matches(SKIP) && !root.matches('input,textarea')) return;
    if (root.matches && root.matches('input,textarea,button,[title],[aria-label]')) translateAttrs(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: n => (n.nodeType === 1 && n.matches(SKIP) && !n.matches('input,textarea')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let n; while ((n = tw.nextNode())) { if (n.nodeType === 3) translateTextNode(n); else if (n.hasAttribute('title') || n.hasAttribute('placeholder') || n.hasAttribute('aria-label')) translateAttrs(n); }
    root.querySelectorAll('[data-i18n-html]').forEach(el => { if (!el.closest('[data-no-i18n]')) translateHtml(el); });
  }
  function retranslateAll() { busy = true; try { walk(document.body); } finally { busy = false; } }
  const mo = new MutationObserver(muts => {
    if (busy) return; busy = true;
    try {
      muts.forEach(m => {
        if (m.type === 'childList') m.addedNodes.forEach(walk);
        else if (m.type === 'characterData') translateTextNode(m.target);
        else if (m.type === 'attributes' && ATTRS.includes(m.attributeName)) translateAttrs(m.target);
      });
    } finally { busy = false; }
  });

  I18N.start = function () {
    I18N.lang = detect();
    const L = LANGS.find(l => l.code === I18N.lang);
    document.documentElement.lang = L.html; document.documentElement.dataset.lang = I18N.lang;
    retranslateAll();
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  };

  global.I18N = I18N;
  global.tr = I18N.t;
})(window);
