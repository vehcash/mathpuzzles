#!/usr/bin/env node
/* Search-engine files for dailymathpuzzle.com, rebuilt by tools/build-index.js (or on its own: node tools/build-pages.js).
   - puzzle/<id>.html  one real page per puzzle: index.html with the puzzle's title, description, statement,
                       canonical link, hreflang links, social cards and structured data already in the HTML,
                       so search engines see the content without running the scripts.
   - sitemap.xml       a sitemap index → sitemaps/pages.xml (home, list, cheat sheets), sitemaps/puzzles.xml (every puzzle
                       page) and sitemaps/formulas.xml (the compendium); five languages as hreflang alternates, and an
                       honest <lastmod> kept in tools/sitemap-state.json.
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
    const exam = e.from ? e.from.replace(/\s*\(.*?\)/g, '').replace(/,.*$/, '').trim() : '';   // e.g. "Gaokao 2023", "Oxford MAT 2019"
    const title = `${s.t} — ${exam ? exam + ' ' : ''}${cat.toLowerCase()} math problem | ${NAME}`;
    const statement = plain(s.s);
    const desc = clip(`${exam ? 'Real ' + exam + ' question. ' : ''}${cat} math problem: ${statement} Step-by-step solution, free for students and teachers.`, 158);
    const ld = {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Quiz', '@id': url + '#quiz', name: s.t, description: statement, url, inLanguage: LANGS, educationalUse: 'practice',
          learningResourceType: ['Math problem', 'Practice question'], about: { '@type': 'Thing', name: cat }, audience: [{ '@type': 'EducationalAudience', educationalRole: 'student' }, { '@type': 'EducationalAudience', educationalRole: 'teacher' }],
          ...(e.from ? { isBasedOn: { '@type': 'CreativeWork', name: e.from } } : {}), educationalLevel: ['Beginner', 'Intermediate', 'Advanced'][Math.max(0, Math.min(2, (e.diff || 1) - 1))],
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
    let html = tpl.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start (generated by tools/build-pages.js) -->\n<base href="/">\n${head}\n<script>window.START = { p: ${JSON.stringify(e.id)} };</script>\n<!-- seo:end -->`);
    // the puzzle text is already in the page (the scripts replace it with the formatted, translated version)
    html = html.replace('<span id="p-cat" class="chip"></span>', `<span id="p-cat" class="chip">${esc(cat)}</span>`)
      .replace('<h1 id="p-title" data-no-i18n></h1>', `<h1 id="p-title" data-no-i18n>${esc(s.t)}</h1>`)
      .replace('<p id="p-statement" data-no-i18n class="statement"></p>', `<p id="p-statement" data-no-i18n class="statement">${esc(statement)}</p>`);
    fs.writeFileSync(path.join(outDir, e.id + '.html'), html);
  }

  // ---- sitemaps ----
  // sitemap.xml is an index of three sitemaps (sitemaps/pages.xml, puzzles.xml, formulas.xml), so Search Console
  // reports coverage per kind of page. Every URL lists its five languages as hreflang alternates.
  // <lastmod> is honest: tools/sitemap-state.json keeps a hash of what each page is made of, and the date only moves
  // when that content really changes (file dates are useless: every copy or deploy resets them).
  const TODAY = new Date().toISOString().slice(0, 10);
  const STATE_F = path.join(ROOT, 'tools', 'sitemap-state.json');
  let state = {}; try { state = JSON.parse(fs.readFileSync(STATE_F, 'utf8')); } catch (err) { /* first run */ }
  const used = {};
  const hash = parts => require('crypto').createHash('sha1').update(parts.map(x => String(x == null ? '' : x).replace(/\?v=[\w.]+/g, '')).join('\u0000')).digest('hex').slice(0, 16);
  const src = f => { try { return read(f); } catch (err) { return ''; } };
  const lastmod = (key, parts) => { const h = hash(parts), old = state[key]; used[key] = old && old.h === h ? old : { h, d: TODAY }; return used[key].d; };
  const xmlEsc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const hl = l => (l === 'zh' ? 'zh-Hans' : l);
  const withLang = (loc, l) => (l === 'en' ? loc : loc + (loc.includes('?') ? '&' : '?') + 'lang=' + l);
  const urlset = entries => ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- GENERATED by tools/build-pages.js — do not edit by hand. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map(e => ['  <url>', `    <loc>${xmlEsc(e.loc)}</loc>`, `    <lastmod>${e.d}</lastmod>`,
      ...e.alt.map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${hl(l)}" href="${xmlEsc(href)}"/>`), '  </url>'].join('\n')),
    '</urlset>', ''].join('\n');
  // one page in five languages → five <url> entries, each listing all five (+ x-default)
  const group = (loc, d) => { const alt = [...LANGS.map(l => [l, withLang(loc, l)]), ['x-default', loc]]; return LANGS.map(l => ({ loc: withLang(loc, l), d, alt })); };

  const topics = fs.existsSync(path.join(ROOT, 'cheats')) ? fs.readdirSync(path.join(ROOT, 'cheats')).filter(f => f.endsWith('.js') && f !== 'symbols.js').map(f => f.slice(0, -3)).sort() : [];
  const pages = [
    ...group(SITE, TODAY),                                               // a new puzzle every day
    ...group(SITE + 'list.html', lastmod('list', [src('list.html'), src('puzzles/index.js')])),
    ...group(SITE + 'cheatsheets.html', lastmod('cheatsheets', [src('cheatsheets.html'), ...topics.map(t => src('cheats/' + t + '.js'))])),
    ...topics.flatMap(t => group(SITE + 'cheatsheets.html?t=' + t, lastmod('cheats:' + t, [src('cheats/' + t + '.js'), src('cheats/tutorials/' + t + '.js'), src('cheats/pictures/' + t + '.js')])))
  ];
  const puzzles = index.flatMap(e => group(SITE + 'puzzle/' + e.id + '.html', lastmod('puzzle:' + e.id, [JSON.stringify(e), JSON.stringify(titles[e.id] || ''), src('puzzles/' + e.file)])));
  // the static formula compendium (tools/build-compendium.js): one real page per language
  try { require('./build-cheats-index')(); } catch (err) { console.warn('cheats index:', err.message); }   // js/cheats-index.js, the topic list cheatsheets.html loads first
  let compendium = [];
  try { compendium = require('./build-compendium')(); } catch (err) { console.warn('compendium:', err.message); }
  const cpLoc = (l, f) => SITE + 'formulas/' + (l === 'en' ? '' : l + '/') + (f === 'index.html' ? '' : f);
  const formulas = compendium.map(c => {
    const file = path.join('formulas', c.lang === 'en' ? '' : c.lang, c.file);
    return { loc: cpLoc(c.lang, c.file), d: lastmod('formulas:' + c.lang + '/' + c.file, [src(file)]), alt: [...LANGS.map(l => [l, cpLoc(l, c.file)]), ['x-default', cpLoc('en', c.file)]] };
  });

  const outMaps = path.join(ROOT, 'sitemaps');
  fs.mkdirSync(outMaps, { recursive: true });
  const maps = [['pages', pages], ['puzzles', puzzles], ['formulas', formulas]];
  for (const [name, list] of maps) fs.writeFileSync(path.join(outMaps, name + '.xml'), urlset(list));
  const newest = list => list.reduce((m, e) => (e.d > m ? e.d : m), '0000-00-00');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- GENERATED by tools/build-pages.js — do not edit by hand. -->',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...maps.map(([name, list]) => `  <sitemap>\n    <loc>${SITE}sitemaps/${name}.xml</loc>\n    <lastmod>${newest(list)}</lastmod>\n  </sitemap>`),
    '</sitemapindex>', ''].join('\n'));
  fs.writeFileSync(STATE_F, JSON.stringify(Object.fromEntries(Object.keys(used).sort().map(k => [k, used[k]])), null, 0).replace(/\},"/g, '},\n"') + '\n');
  return { pages: index.length, urls: pages.length + puzzles.length + formulas.length };
}

module.exports = build;
if (require.main === module) { const r = build(); console.log(`puzzle/: ${r.pages} pages · sitemaps: ${r.urls} URLs`); }
