#!/usr/bin/env node
/* Rebuilds puzzles/index.js and puzzles/search/<lang>.js from the puzzle files in puzzles/<category>/*.js.
   Run it from the site folder after adding or editing a puzzle (or editing index.html):   node tools/build-index.js
   It also rebuilds the search-engine files: puzzle/<id>.html and sitemap.xml.
   It also checks each puzzle (8 options, 0–2 correct, steps present) and lists missing translations. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..'), DIR = path.join(ROOT, 'puzzles');
const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];

// load the engine in a sandbox (only the kit is needed: figures are not drawn here)
const sandbox = { window: {}, document: { currentScript: null }, console, Math };
sandbox.window = sandbox; vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/puzzles.js'), 'utf8'), sandbox, { filename: 'js/puzzles.js' });
const Bank = sandbox.PuzzleBank;
const cats = Bank.categories.map(c => c.id);

const plain = t => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\$([^$]+)\$/g, (_, m) => ' ' + m.replace(/\^\\circ/g, '°').replace(/\\cdot/g, '·')
  .replace(/\\(sin|cos|tan|log|ln|sqrt|lim|int)\b/g, ' $1 ').replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_]/g, ' ') + ' ').replace(/\s+/g, ' ').trim();
// text made only of formulas needs no translation
const hasWords = t => /\p{L}{2}/u.test(String(t).replace(/\$[^$]*\$/g, '').replace(/<[^>]+>/g, ''));
const pick = (v, l) => (v && typeof v === 'object' ? (v[l] !== undefined ? v[l] : v.en) : v);

const entries = [], search = Object.fromEntries(LANGS.map(l => [l, {}]));
const problems = [], missing = {};
for (const cat of fs.readdirSync(DIR).filter(d => fs.statSync(path.join(DIR, d)).isDirectory() && d !== 'search').sort((a, b) => cats.indexOf(a) - cats.indexOf(b))) {
  for (const f of fs.readdirSync(path.join(DIR, cat)).filter(f => f.endsWith('.js')).sort()) {
    const rel = cat + '/' + f;
    const code = fs.readFileSync(path.join(DIR, rel), 'utf8');
    if (code.startsWith('// REMOVED')) continue;   // withdrawn puzzle left on disk: delete the file
    let got = null; Bank.define = p => { got = p; };
    try { vm.runInContext(code, sandbox, { filename: 'puzzles/' + rel }); }
    catch (e) { problems.push(rel + ': ' + e.message); continue; }
    if (!got) { problems.push(rel + ': no PuzzleBank.define(...)'); continue; }
    const p = got;
    if (!cats.includes(p.category)) problems.push(rel + ': unknown category ' + p.category);
    if (p.category !== cat) problems.push(rel + ': category "' + p.category + '" but stored in ' + cat + '/');
    if (entries.some(e => e.id === p.id)) problems.push(rel + ': duplicate id ' + p.id);
    const nOk = (p.options || []).filter(o => o.correct).length;
    if ((p.options || []).length !== 8) problems.push(rel + ': ' + (p.options || []).length + ' options (expected 8)');
    if (nOk > 2) problems.push(rel + ': ' + nOk + ' correct options (0–2 allowed)');
    if (!(p.steps || []).length) problems.push(rel + ': no solution steps');
    const src = p.source || {};
    if (![1, 2, 3].includes(p.difficulty || 1)) problems.push(rel + ': difficulty must be 1, 2 or 3');
    if (!p.source) problems.push(rel + ': no source (add source: { kind, exams, note | from })');
    (src.exams || []).filter(k => !Bank.exams[k]).forEach(k => problems.push(rel + ': unknown exam "' + k + '" in source.exams (see EXAMS in js/puzzles.js)'));
    // translations
    const fields = [['title', p.title], ['statement', p.statement], ['hint', p.hint], ['figureText', p.figureText], ['aiHint', p.aiHint], ['source note', src.note], ['source', src.from]]
      .concat((p.options || []).map((o, i) => ['option ' + 'ABCDEFGH'[i], o.why]))
      .concat((p.steps || []).flatMap((s, i) => [['step ' + (i + 1) + ' title', s.title], ['step ' + (i + 1) + ' note', s.note]]));
    for (const l of LANGS.slice(1)) {
      const miss = fields.filter(([, v]) => v && !(typeof v === 'object' && v[l] !== undefined) && hasWords(pick(v, 'en'))).map(([n]) => n);
      if (miss.length) (missing[l] = missing[l] || []).push(p.id + ' (' + miss.length + ': ' + miss.slice(0, 4).join(', ') + (miss.length > 4 ? '…' : '') + ')');
    }
    entries.push({ id: p.id, cat: p.category, diff: p.difficulty || 1, file: rel, options: (p.options || []).length, steps: (p.steps || []).length, src: src.from ? 'exam' : (src.kind || 'standard'), ex: src.exams || [], ...(src.from ? { from: typeof src.from === 'object' ? src.from.en : src.from } : {}) });
    for (const l of LANGS) {
      const body = [plain(pick(p.statement, l)), pick(p.figureText, l), plain(pick(p.hint, l)), ...(p.steps || []).map(s => plain(pick(s.title, l))),
        plain(pick(src.from, l)), plain(pick(src.note, l)), ...(src.exams || []).flatMap(k => Bank.exams[k] ? [...new Set([pick(Bank.exams[k], l), Bank.exams[k].en])] : [])].filter(Boolean).join(' ');
      search[l][p.id] = { t: pick(p.title, l), s: pick(p.statement, l), k: body };
    }
  }
}

const head = '/* GENERATED by tools/build-index.js — do not edit by hand. */\n';
fs.writeFileSync(path.join(DIR, 'index.js'), head + 'PuzzleBank.setIndex([\n' + entries.map(e => '  ' + JSON.stringify(e)).join(',\n') + '\n]);\n');
fs.mkdirSync(path.join(DIR, 'search'), { recursive: true });
for (const l of LANGS) fs.writeFileSync(path.join(DIR, 'search', l + '.js'), head + 'PuzzleBank.setSearch(' + JSON.stringify(l) + ', {\n' + Object.entries(search[l]).map(([id, v]) => '  ' + JSON.stringify(id) + ': ' + JSON.stringify(v)).join(',\n') + '\n});\n');

// search-engine files: puzzle/<id>.html pages and sitemap.xml (tools/build-pages.js)
const seo = require('./build-pages.js')();
console.log(`puzzle/: ${seo.pages} pages · sitemap.xml: ${seo.urls} URLs`);

console.log(entries.length + ' puzzles: ' + cats.map(c => c + ' ' + entries.filter(e => e.cat === c).length).join(', '));
Object.entries(missing).forEach(([l, list]) => console.log('missing ' + l + ' text in ' + list.length + ' puzzle(s):\n   ' + list.join('\n   ')));
if (problems.length) { console.log('PROBLEMS:\n   ' + problems.join('\n   ')); process.exitCode = 1; }
