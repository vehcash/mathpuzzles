#!/usr/bin/env node
/* The math formula compendium: one static, search-engine friendly page per cheat-sheet topic and language,
   written from the same data as the interactive cheat sheets (cheats/*.js) and their blackboard lessons
   (cheats/tutorials/*.js): every formula and theorem with its name, the formula (KaTeX, already rendered), what the
   symbols mean, the idea and a worked example — readable without JavaScript, linking back to the interactive
   blackboard explanation.
     formulas/index.html, formulas/<topic>.html          English
     formulas/<lang>/index.html, formulas/<lang>/<topic>.html   fr, es, ja, zh
   Run on its own (node tools/build-compendium.js) or through tools/build-pages.js, which also lists the pages in sitemap.xml. */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://dailymathpuzzle.com/';
const NAME = 'Daily Math Puzzle';
const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
const ORDER = ['algebra', 'functions', 'geometry', 'trigonometry', 'analytic', 'space', 'vectors', 'complex', 'limits', 'derivatives', 'integrals', 'combinatorics', 'probability', 'statistics', 'number', 'logic'];
const HTML_LANG = { en: 'en', fr: 'fr', es: 'es', ja: 'ja', zh: 'zh-Hans' };

// ---------- interface words of the static pages ----------
const UI = {
  compendium: 'Math formula compendium|Compendium de formules mathématiques|Compendio de fórmulas matemáticas|数学公式集|数学公式大全',
  sub: 'Formulas, theorems and rules explained step by step — a free reference for university students and entrance exams|Formules, théorèmes et règles expliqués pas à pas — une référence gratuite pour les étudiants et les concours|Fórmulas, teoremas y reglas explicados paso a paso — una referencia gratuita para universitarios y exámenes de acceso|公式・定理・法則をステップごとに解説 — 大学生と入試のための無料リファレンス|公式、定理与法则逐步讲解——面向大学生和升学考试的免费参考',
  titleT: '{topic} formulas and theorems — cheat sheet with explanations|Formules et théorèmes de {topic} — fiche avec explications|Fórmulas y teoremas de {topic} — chuleta con explicaciones|{topic}の公式と定理 — 解説付きまとめ|{topic}公式与定理——带讲解的速查表',
  descT: '{topic} cheat sheet: {n} formulas and theorems with what every symbol means, the idea and a worked example. {blurb} Free reference for university entrance exams and math tests.|Fiche de {topic} : {n} formules et théorèmes, la signification de chaque symbole, l’idée et un exemple résolu. {blurb} Référence gratuite pour les examens et concours.|Chuleta de {topic}: {n} fórmulas y teoremas con el significado de cada símbolo, la idea y un ejemplo resuelto. {blurb} Referencia gratuita para la selectividad (PAU/EBAU) y exámenes de matemáticas.|{topic}のまとめ：{n} 個の公式と定理を記号の意味・考え方・例題つきで。{blurb} 入試・数学の試験のための無料リファレンス。|{topic}速查表：{n} 个公式和定理，附符号含义、思路与例题。{blurb} 面向高考与数学考试的免费参考。',
  idxTitle: 'Math cheat sheets and formula compendium — theorems explained for university and entrance exams|Fiches de maths et compendium de formules — théorèmes expliqués pour l’université et les concours|Chuletas de matemáticas y compendio de fórmulas — teoremas explicados para la universidad y la selectividad|数学チートシートと公式集 — 大学・入試のための定理解説|数学速查表与公式大全——为大学和高考讲解的定理',
  idxDesc: 'Free math cheat sheets: {n} formulas and theorems in algebra, calculus, geometry, trigonometry, vectors and matrices, probability and statistics, each explained with the idea, a worked example and an interactive blackboard tutor.|Fiches de maths gratuites : {n} formules et théorèmes en algèbre, analyse, géométrie, trigonométrie, vecteurs et matrices, probabilités et statistiques, chacun expliqué avec l’idée, un exemple résolu et un tableau interactif.|Chuletas de matemáticas gratis: {n} fórmulas y teoremas de álgebra, cálculo, geometría, trigonometría, vectores y matrices, probabilidad y estadística, cada uno explicado con la idea, un ejemplo resuelto y una pizarra interactiva.|無料の数学チートシート：代数・微積分・幾何・三角法・ベクトルと行列・確率統計の {n} 個の公式と定理を、考え方・例題・インタラクティブ黒板で解説。|免费数学速查表：代数、微积分、几何、三角、向量与矩阵、概率统计共 {n} 个公式和定理，每个都有思路、例题和交互式黑板讲解。',
  idea: 'The idea|L’idée|La idea|考え方|思路',
  example: 'Worked example|Exemple résolu|Ejemplo resuelto|例題|例题',
  symbols: 'Symbols|Symboles|Símbolos|記号|符号',
  explain: 'Explain it step by step on the blackboard →|L’expliquer pas à pas au tableau →|Explicarlo paso a paso en la pizarra →|黒板でステップごとに解説 →|在黑板上逐步讲解 →',
  interactive: 'Open the interactive cheat sheet|Ouvrir la fiche interactive|Abrir la chuleta interactiva|インタラクティブ版を開く|打开交互式速查表',
  practice: 'Practice with exam puzzles|S’entraîner avec des problèmes d’examen|Practicar con problemas de examen|入試問題で練習|用真题练习',
  topics: 'All topics|Tous les thèmes|Todos los temas|すべての分野|全部主题',
  contents: 'Contents|Sommaire|Índice|目次|目录',
  formulas: '{n} formulas|{n} formules|{n} fórmulas|{n} 個の公式|{n} 个公式',
  home: 'Daily math puzzle|Problème du jour|Problema del día|今日の問題|每日一题',
  intro: 'A compendium of the formulas and theorems you need from the last years of school to the first year of university: every card says what the symbols mean, why the formula is true and how to use it in a worked example. Open any formula on the interactive blackboard for an animated, step-by-step explanation with graphs and figures, and an exercise to check yourself — useful to revise for a math test, the SAT, A-levels, the Bac, the Selectividad (EBAU/PAU), the Gaokao, JEE or university exams.|Un compendium des formules et théorèmes nécessaires de la fin du lycée à la première année d’université : chaque fiche explique les symboles, pourquoi la formule est vraie et comment l’utiliser dans un exemple résolu. Ouvrez une formule sur le tableau interactif pour une explication animée pas à pas avec graphiques et figures, et un exercice pour vous tester — idéal pour réviser un contrôle, le Bac, les concours ou les examens d’université.|Un compendio de las fórmulas y teoremas que necesitas desde bachillerato hasta el primer curso de universidad: cada tarjeta dice qué significan los símbolos, por qué la fórmula es cierta y cómo usarla en un ejemplo resuelto. Abre cualquier fórmula en la pizarra interactiva para una explicación animada paso a paso con gráficas y figuras, y un ejercicio para comprobarte — útil para preparar un examen de matemáticas, la selectividad (EBAU/PAU) o los exámenes de la universidad.|高校の終わりから大学 1 年までに必要な公式と定理をまとめました。各カードで記号の意味、なぜ成り立つか、例題での使い方がわかります。インタラクティブ黒板で開けば、グラフや図を使ったアニメーション付きのステップ解説と確認問題も。定期テスト、共通テスト、大学入試、大学の試験の復習に。|从高中后期到大学一年级所需的公式与定理大全：每张卡片说明符号含义、公式为何成立以及如何在例题中使用。在交互式黑板上打开任意公式，可获得带图像和图形的动画逐步讲解及自测练习——适合复习数学考试、高考或大学考试。'
};
const pickS = (s, li) => { const p = String(s == null ? '' : s).split('|'); return (p[li] !== undefined && p[li] !== '' ? p[li] : p[0]).trim(); };
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'f';

function load() {
  global.window = global;
  global.Cheats = { topics: [], topic(t) { this.topics.push(t); }, tutorials: {}, tutor(id, m) { this.tutorials[id] = m; } };
  for (const id of ORDER) { require(path.join(ROOT, 'cheats', id + '.js')); }
  require(path.join(ROOT, 'cheats', 'symbols.js'));
  for (const id of ORDER) { try { require(path.join(ROOT, 'cheats', 'tutorials', id + '.js')); } catch (e) { console.warn('lessons', id, e.message); } }
  try { require(path.join(ROOT, 'js', 'cheat-figs.js')); } catch (e) { /* figures are optional */ }
  const katex = require(path.join(ROOT, 'lib', 'katex', 'katex.min.js'));
  return { topics: ORDER.map(id => global.Cheats.topics.find(t => t.id === id)).filter(Boolean), katex };
}

function build() {
  const { topics, katex } = load();
  const K = (tex, display) => { try { return katex.renderToString(String(tex), { throwOnError: false, displayMode: !!display, strict: false }); } catch (e) { return esc(tex); } };
  const inline = s => esc(s).replace(/&lt;br&gt;/g, '<br>').replace(/\$([^$]+)\$/g, (_, t) => K(t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')));
  const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/\$([^$]*)\$/g, '$1').replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_\\]/g, '').replace(/\s+/g, ' ').trim();
  const total = topics.reduce((n, tp) => n + tp.sections.reduce((m, s) => m + s.items.length, 0), 0);
  const url = (lang, file) => SITE + 'formulas/' + (lang === 'en' ? '' : lang + '/') + (file === 'index.html' ? '' : file);
  const out = [];
  const page = (lang, file, title, desc, body, ld) => {
    const li = LANGS.indexOf(lang), up = lang === 'en' ? '../' : '../../';
    const alt = LANGS.map(l => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(l, file)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${url('en', file)}">`;
    const langLinks = LANGS.map(l => `<a href="${up}formulas/${l === 'en' ? '' : l + '/'}${file}"${l === lang ? ' aria-current="page"' : ''} lang="${HTML_LANG[l]}">${{ en: 'English', fr: 'Français', es: 'Español', ja: '日本語', zh: '中文' }[l]}</a>`).join(' · ');
    const html = `<!doctype html>
<html lang="${HTML_LANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- GENERATED by tools/build-compendium.js — do not edit by hand. -->
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url(lang, file)}">
${alt}
<meta property="og:type" content="article">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url(lang, file)}">
<meta property="og:image" content="${SITE}og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#17201c">
<link rel="stylesheet" href="${up}lib/fonts.css">
<link rel="stylesheet" href="${up}lib/katex/katex.min.css">
<link rel="stylesheet" href="${up}css/compendium.css?v=20261113e">
<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<header class="cp-top"><a class="cp-brand" href="${up}${lang === 'en' ? '' : '?lang=' + lang}"><span>∑</span> ${NAME}</a><nav class="cp-langs" aria-label="Language">${langLinks}</nav></header>
${body}
<footer class="cp-foot"><a href="${up}${lang === 'en' ? '' : '?lang=' + lang}">${esc(pickS(UI.home, li))}</a> · <a href="${up}list.html${lang === 'en' ? '' : '?lang=' + lang}">${esc(pickS(UI.practice, li))}</a> · <a href="${up}cheatsheets.html${lang === 'en' ? '' : '?lang=' + lang}">${esc(pickS(UI.interactive, li))}</a> · <a href="index.html">${esc(pickS(UI.compendium, li))}</a></footer>
<script>/* shrink any formula wider than its card so nothing needs a scrollbar */(function(){function fit(){document.querySelectorAll('.cp-tex .katex-display, .cp-card p .katex').forEach(function(e){e.style.fontSize='';var w=e.parentElement.clientWidth,k=1;for(var i=0;i<3&&w>0&&e.scrollWidth>w+1&&k>.55;i++){k=Math.max(.55,k*w/e.scrollWidth);e.style.fontSize=k.toFixed(3)+'em';}});}var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(fit,150);});if(document.fonts)document.fonts.ready.then(fit);fit();})();</script>
</body>
</html>
`;
    const dir = path.join(ROOT, 'formulas', lang === 'en' ? '' : lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, file), html);
    out.push({ lang, file, loc: url(lang, file) });
  };

  for (const lang of LANGS) {
    const li = LANGS.indexOf(lang), q = lang === 'en' ? '' : '&lang=' + lang, up = lang === 'en' ? '../' : '../../';
    global.I18N = { lang };   // the figure functions read the language from their argument, the rest from here
    // ---- one page per topic ----
    for (const tp of topics) {
      const T = global.Cheats.tutorials[tp.id] || {}, SYM = (global.Cheats.symbols || {})[tp.id] || {};
      const tname = pickS(tp.name, li), n = tp.sections.reduce((m, s) => m + s.items.length, 0);
      const teaches = [];
      let toc = '', body = '';
      tp.sections.forEach(sec => {
        const st = pickS(sec.t, li), sid = slug(String(sec.t).split('|')[0]);
        toc += `<li><a href="#${sid}">${esc(st)}</a></li>`;
        let cards = '';
        const figs = [].concat(sec.fig || []).map(f => (global.CheatFigs && global.CheatFigs[f] ? `<figure class="cf">${global.CheatFigs[f](lang)}</figure>` : '')).join('');
        sec.items.forEach(it => {
          if (!Array.isArray(it)) {   // a small table
            if (!it.tbl) return;
            const cell = c => (String(c).startsWith('~') ? inline(pickS(String(c).slice(1), li)) : K(c, false));
            cards += `<div class="cp-card cp-tbl"><table>${it.tbl.map((r, i) => '<tr>' + r.map((c, j) => (i === 0 || j === 0 ? `<th>${cell(c)}</th>` : `<td>${cell(c)}</td>`)).join('') + '</tr>').join('')}</table></div>`;
            return;
          }
          const [name, texs, note, opt] = it, o = opt && typeof opt === 'object' && !Array.isArray(opt) ? opt : {};
          const tex = Array.isArray(texs) ? (texs[li] || texs[0]) : texs;
          const nm = pickS(name, li), enName = String(name || '').split('|')[0].trim(), key = String(sec.t).split('|')[0].trim() + '/' + enName;
          if (nm) teaches.push(nm);
          const steps = T[key];
          const idea = steps && steps[0] && steps[0].s ? pickS(steps[0].s, li) : '';
          const ex = steps && steps[1] && steps[1].s ? pickS(steps[1].s, li) : '';
          const sym = SYM[key] ? pickS(SYM[key], li) : '';
          const fig = o.fig && global.CheatFigs && global.CheatFigs[o.fig] ? `<figure class="cf mini">${global.CheatFigs[o.fig](lang)}</figure>` : '';
          cards += `<article class="cp-card" id="${sid}--${slug(enName)}">` +
            (nm ? `<h3>${esc(nm)}</h3>` : '') +
            `<div class="cp-tex">${String(tex).split(/\\qquad/).map(p => K(p.trim().replace(/,$/, ''), true)).join('')}</div>` +
            (note ? `<p class="cp-note">${inline(pickS(note, li))}</p>` : '') +
            (sym ? `<p class="cp-sym"><b>${esc(pickS(UI.symbols, li))}:</b> ${inline(sym)}</p>` : '') + fig +
            (idea ? `<h4>${esc(pickS(UI.idea, li))}</h4><p>${inline(idea)}</p>` : '') +
            (ex ? `<h4>${esc(pickS(UI.example, li))}</h4><p>${inline(ex)}</p>` : '') +
            (o.ex ? `<p class="cp-ex">${inline(pickS(o.ex, li))}</p>` : '') +
            `<p class="cp-go"><a href="${up}cheatsheets.html?t=${tp.id}&amp;q=${encodeURIComponent(nm || enName)}${q.replace('&', '&amp;')}">${esc(pickS(UI.explain, li))}</a></p></article>`;
        });
        body += `<section class="cp-sec" id="${sid}"><h2>${esc(st)}</h2>${figs}<div class="cp-cards">${cards}</div></section>`;
      });
      const others = topics.map(t => `<a href="${t.id}.html"${t === tp ? ' aria-current="page"' : ''}>${esc(pickS(t.name, li))}</a>`).join('');
      const title = fill(pickS(UI.titleT, li), { topic: tname }) + ' | ' + NAME;
      const desc = fill(pickS(UI.descT, li), { topic: tname, n, blurb: strip(pickS(tp.blurb, li)) }).slice(0, 300);
      const ld = { '@context': 'https://schema.org', '@graph': [
        { '@type': 'LearningResource', '@id': url(lang, tp.id + '.html') + '#sheet', name: title.replace(' | ' + NAME, ''), description: desc, inLanguage: HTML_LANG[lang], url: url(lang, tp.id + '.html'),
          learningResourceType: ['Cheat sheet', 'Reference', 'Explanation'], educationalLevel: ['Upper secondary', 'University entrance', 'Undergraduate'], teaches: teaches.slice(0, 60),
          about: { '@type': 'Thing', name: pickS(tp.name, 0) }, isAccessibleForFree: true, audience: { '@type': 'EducationalAudience', educationalRole: 'student' }, isPartOf: { '@type': 'WebSite', name: NAME, url: SITE } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: NAME, item: SITE },
          { '@type': 'ListItem', position: 2, name: pickS(UI.compendium, li), item: url(lang, 'index.html') },
          { '@type': 'ListItem', position: 3, name: tname, item: url(lang, tp.id + '.html') }] }] };
      const html = `<main class="cp-main" style="--c:${tp.color};--cbg:${tp.bg}">
<nav class="cp-crumbs"><a href="index.html">${esc(pickS(UI.compendium, li))}</a> › ${esc(tname)}</nav>
<h1><span class="cp-ico">${tp.icon}</span> ${esc(fill(pickS(UI.titleT, li), { topic: tname }))}</h1>
<p class="cp-lead">${inline(pickS(tp.blurb, li))} <b>${esc(fill(pickS(UI.formulas, li), { n }))}</b>.</p>
<p class="cp-actions"><a class="cp-btn" href="${up}cheatsheets.html?t=${tp.id}${q.replace('&', '&amp;')}">${esc(pickS(UI.interactive, li))}</a>${tp.cat ? ` <a class="cp-btn ghost" href="${up}index.html?cat=${tp.cat}${q.replace('&', '&amp;')}">${esc(pickS(UI.practice, li))}</a>` : ''}</p>
<details class="cp-toc" open><summary>${esc(pickS(UI.contents, li))}</summary><ol>${toc}</ol></details>
${body}
<nav class="cp-topics" aria-label="${esc(pickS(UI.topics, li))}"><h2>${esc(pickS(UI.topics, li))}</h2>${others}</nav>
</main>`;
      page(lang, tp.id + '.html', title, desc, html, ld);
    }
    // ---- the compendium index ----
    const cards = topics.map(tp => { const n = tp.sections.reduce((m, s) => m + s.items.length, 0); return `<a class="cp-topic" href="${tp.id}.html" style="--c:${tp.color};--cbg:${tp.bg}"><span class="cp-ico">${tp.icon}</span><b>${esc(pickS(tp.name, li))}</b><small>${esc(fill(pickS(UI.formulas, li), { n }))}</small><span class="cp-bl">${inline(pickS(tp.blurb, li))}</span></a>`; }).join('');
    const title = pickS(UI.idxTitle, li) + ' | ' + NAME, desc = fill(pickS(UI.idxDesc, li), { n: total });
    const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: pickS(UI.compendium, li), description: desc, url: url(lang, 'index.html'), inLanguage: HTML_LANG[lang],
      hasPart: topics.map(tp => ({ '@type': 'LearningResource', name: pickS(tp.name, li), url: url(lang, tp.id + '.html') })), isPartOf: { '@type': 'WebSite', name: NAME, url: SITE } };
    page(lang, 'index.html', title, desc, `<main class="cp-main"><h1>${esc(pickS(UI.compendium, li))}</h1><p class="cp-lead">${esc(pickS(UI.sub, li))}</p><p>${esc(pickS(UI.intro, li))}</p>
<p class="cp-actions"><a class="cp-btn" href="${up}cheatsheets.html${lang === 'en' ? '' : '?lang=' + lang}">${esc(pickS(UI.interactive, li))}</a> <a class="cp-btn ghost" href="${up}list.html${lang === 'en' ? '' : '?lang=' + lang}">${esc(pickS(UI.practice, li))}</a></p>
<div class="cp-grid">${cards}</div></main>`, ld);
  }
  return out;
}

module.exports = build;
if (require.main === module) { const r = build(); console.log(`formulas/: ${r.length} pages`); }
