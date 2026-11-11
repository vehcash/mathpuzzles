#!/usr/bin/env node
/* Search-engine files for dailymathpuzzle.com, rebuilt by tools/build-index.js (or on its own: node tools/build-pages.js).
   - puzzle/<id>.html  one real page per puzzle: index.html with the puzzle's title, description, statement,
                       canonical link, hreflang links, social cards and structured data already in the HTML,
                       so search engines see the content without running the scripts.
   - sitemap.xml       home, list, cheat sheets (each topic) and every puzzle page, with the five languages as alternates.
   index.html is the template: re-run after editing it. */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://dailymathpuzzle.com/';
const NAME = 'Daily Math Puzzle';
const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
const CAT_NAMES = { geometry: 'Geometry', trigonometry: 'Trigonometry', algebra: 'Algebra', matrix: 'Matrices', complex: 'Complex numbers', calculus: 'Calculus', combinatorics: 'Combinatorics', probability: 'Probability', number: 'Number theory' };

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// "$x^2$" and HTML → readable text for descriptions
const SYM = { theta: 'θ', alpha: 'α', beta: 'β', gamma: 'γ', lambda: 'λ', mu: 'μ', sigma: 'σ', omega: 'ω', pi: 'π', angle: '∠', triangle: '△', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', infty: '∞', cdot: '·', times: '×', pm: '±', to: '→', in: '∈', perp: '⊥', parallel: '∥', circ: '°', degree: '°', sqrt: '√', ldots: '…', cdots: '…' };
const SUB = '₀₁₂₃₄₅₆₇₈₉', SUP = { 2: '²', 3: '³', n: 'ⁿ' };
const tex = m => m.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (_, b) => b.split('\\\\').map(x => x.replace(/&/g, ' ').trim()).join(', ')).replace(/\\begin\{[pbv]?matrix\}([\s\S]*?)\\end\{[pbv]?matrix\}/g, (_, b) => '[' + b.replace(/\\\\/g, ';').replace(/&/g, ' ') + ']')
  .replace(/\^\{-1\}/g, '⁻¹').replace(/\\[dt]frac/g, '\\frac').replace(/\\int_\{?([^{}\s^]*)\}?\^\{?([^{}\s]*)\}?/g, '∫ from $1 to $2 of ').replace(/\\int/g, '∫').replace(/\^\\circ/g, '°').replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => (/^[\w^.]+$/.test(a) ? a : '(' + a + ')') + '/' + (/^[\w^.]+$/.test(b) ? b : '(' + b + ')')).replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
  .replace(/\\text\{([^{}]*)\}/g, '$1').replace(/\\(?:left|right|displaystyle|,|;|!|quad|qquad)/g, ' ')
  .replace(/\\([a-zA-Z]+)/g, (w, n) => SYM[n] !== undefined ? SYM[n] : /^(sin|cos|tan|log|ln|lim|max|min|det|arg)$/.test(n) ? n + ' ' : ' ')
  .replace(/_\{?(\d+)\}?/g, (_, d) => [...d].map(c => SUB[c]).join('')).replace(/\^\{?([23n])\}?(?![\d{])/g, (_, d) => SUP[d]).replace(/[{}]/g, '').replace(/_/g, '');
const plain = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\$([^$]+)\$/g, (_, m) => tex(m)).replace(/\s+([.,;:?!])/g, '$1').replace(/\s+/g, ' ').trim();
const clip = (t, n) => (t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
const json = src => { const a = src.indexOf('['), b = src.lastIndexOf(']'); return JSON.parse(src.slice(a, b + 1)); };
const jsonObj = src => { const a = src.indexOf('{', src.indexOf('setSearch')), b = src.lastIndexOf('}'); return JSON.parse(src.slice(a, b + 1)); };

function build() {
  const index = json(read('puzzles/index.js'));
  const titles = jsonObj(read('puzzles/search/en.js'));
  const tpl = read('index.html');
  if (!tpl.includes('<!-- seo:start -->') || !tpl.includes('<!-- seo:end -->')) throw new Error('index.html needs the <!-- seo:start --> … <!-- seo:end --> block');

  const outDir = path.join(ROOT, 'puzzle');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (f.endsWith('.html') && !index.some(e => e.id + '.html' === f)) fs.unlinkSync(path.join(outDir, f));   // removed puzzles

  for (const e of index) {
    const s = titles[e.id] || { t: e.id, s: '' }, cat = CAT_NAMES[e.cat] || e.cat;
    const url = SITE + 'puzzle/' + e.id + '.html';
    const title = `${s.t} — ${cat} puzzle | ${NAME}`;
    const statement = plain(s.s);
    const desc = clip(`${cat} puzzle: ${statement} Pick the true statements, then see the step-by-step solution.`, 158);
    const ld = {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Quiz', '@id': url + '#quiz', name: s.t, description: statement, url, inLanguage: LANGS, educationalUse: 'practice',
          learningResourceType: 'Math puzzle', about: { '@type': 'Thing', name: cat }, educationalLevel: ['Beginner', 'Intermediate', 'Advanced'][Math.max(0, Math.min(2, (e.diff || 1) - 1))],
          isAccessibleForFree: true, isPartOf: { '@type': 'WebSite', name: NAME, url: SITE } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: NAME, item: SITE },
          { '@type': 'ListItem', position: 2, name: 'All puzzles', item: SITE + 'list.html' },
          { '@type': 'ListItem', position: 3, name: s.t, item: url }] }
      ]
    };
    const head = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(desc)}">`,
      `<link rel="canonical" href="${url}">`,
      ...LANGS.map(l => `<link rel="alternate" hreflang="${l === 'zh' ? 'zh-Hans' : l}" href="${url}${l === 'en' ? '' : '?lang=' + l}">`),
      `<link rel="alternate" hreflang="x-default" href="${url}">`,
      `<meta property="og:type" content="article">`, `<meta property="og:site_name" content="${NAME}">`,
      `<meta property="og:title" content="${esc(s.t)}">`, `<meta property="og:description" content="${esc(desc)}">`,
      `<meta property="og:url" content="${url}">`, `<meta property="og:image" content="${SITE}og-image.png">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`
    ].join('\n');
    let html = tpl.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start (generated by tools/build-pages.js) -->\n<base href="../">\n${head}\n<script>window.START = { p: ${JSON.stringify(e.id)} };</script>\n<!-- seo:end -->`);
    // the puzzle text is already in the page (the scripts replace it with the formatted, translated version)
    html = html.replace('<span id="p-cat" class="chip"></span>', `<span id="p-cat" class="chip">${esc(cat)}</span>`)
      .replace('<h1 id="p-title" data-no-i18n></h1>', `<h1 id="p-title" data-no-i18n>${esc(s.t)}</h1>`)
      .replace('<p id="p-statement" data-no-i18n class="statement"></p>', `<p id="p-statement" data-no-i18n class="statement">${esc(statement)}</p>`);
    fs.writeFileSync(path.join(outDir, e.id + '.html'), html);
  }

  // ---- sitemap.xml ----
  const day = f => { try { return fs.statSync(path.join(ROOT, f)).mtime.toISOString().slice(0, 10); } catch (err) { return null; } };
  const topics = fs.existsSync(path.join(ROOT, 'cheats')) ? fs.readdirSync(path.join(ROOT, 'cheats')).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort() : [];
  const urls = [
    { loc: SITE, file: 'index.html', freq: 'daily', pr: '1.0' },
    { loc: SITE + 'list.html', file: 'puzzles/index.js', freq: 'weekly', pr: '0.8' },
    { loc: SITE + 'cheatsheets.html', file: 'cheatsheets.html', freq: 'monthly', pr: '0.7' },
    { loc: SITE + 'mcp.html', file: 'mcp.html', freq: 'monthly', pr: '0.5' },
    ...topics.map(t => ({ loc: SITE + 'cheatsheets.html?t=' + t, file: 'cheats/' + t + '.js', freq: 'monthly', pr: '0.6' })),
    ...index.map(e => ({ loc: SITE + 'puzzle/' + e.id + '.html', file: 'puzzles/' + e.file, freq: 'monthly', pr: '0.7' }))
  ];
  const withLang = (loc, l) => l === 'en' ? loc : loc + (loc.includes('?') ? '&' : '?') + 'lang=' + l;
  const xmlEsc = t => t.replace(/&/g, '&amp;');
  const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- GENERATED by tools/build-pages.js — do not edit by hand. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
  for (const u of urls) for (const l of LANGS) {
    const lm = day(u.file);
    xml.push('  <url>', `    <loc>${xmlEsc(withLang(u.loc, l))}</loc>`, lm ? `    <lastmod>${lm}</lastmod>` : null, `    <changefreq>${u.freq}</changefreq>`, `    <priority>${l === 'en' ? u.pr : (u.pr - 0.1).toFixed(1)}</priority>`,
      ...LANGS.map(a => `    <xhtml:link rel="alternate" hreflang="${a === 'zh' ? 'zh-Hans' : a}" href="${xmlEsc(withLang(u.loc, a))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEsc(u.loc)}"/>`, '  </url>');
  }
  xml.push('</urlset>', '');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml.filter(x => x !== null).join('\n'));
  return { pages: index.length, urls: urls.length * LANGS.length };
}

module.exports = build;
if (require.main === module) { const r = build(); console.log(`puzzle/: ${r.pages} pages · sitemap.xml: ${r.urls} URLs`); }
