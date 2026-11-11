/* Cheat-sheet tutorials: click a formula card → a blackboard explains it step by step, in the page's language.
   A tutorial is a list of steps { t: title, s: text, a: [board actions], fig?: figure name }; texts are 'en|fr|es|ja|zh'.
   Hand-written tutorials live in cheats/tutorials/<topic>.js (Cheats.tutor(topic, { 'Section/Item': steps })),
   keyed by the English section title and item name. Every other card gets an automatic tutorial built from its
   formula, note, example and figure.

   Layout is automatic: formulas and words flow down a text column (the oldest lines are wiped when it is full),
   graphs live in their own panel on the right, so nothing collides; each graph frames the interesting part of its
   functions (zeros, peaks, shaded area, marked points) and the reader can drag / scroll / use + − ⟲ to look elsewhere.

   Board actions:
     ['w', tex, { s: size px, c: colour, d: delay ms, x: >0.1 = indent }]   write a formula (next line of the text column)
     ['t', 'en|fr|es|ja|zh', { …same }]                                    write words
     ['ax', { xw: [x0, x1], yw: [y0, y1], eq: true }]                       a graph; the window is optional (else framed automatically)
     ['p', 'y=x^2', { c, d, dash }]                                        plot on the current graph
     ['sh', a, b]                                                          shade the area under the last plotted curve
     ['tan', a]                                                            tangent to the last plotted curve at x = a
     ['pt', x, y, label, { c, hollow, d }]                                 point on the graph
     ['lbl', x, y, tex, { c }]                                             a formula written next to the point (x, y) of the graph
     ['ln', x1, y1, x2, y2, { c, d }]                                      chalk segment between graph points
     ['clr']                                                               wipe the board
   A step may end with an exercise: ex: { k: 'val' | 'anti', q: tex or 'en|…' text, v: 'pi/4' (value) or f: 'x^2' (integrand), sol: [tex, …] }. */
(function () {
  'use strict';
  const LANGS = ['en', 'fr', 'es', 'ja', 'zh'];
  const li = () => Math.max(0, LANGS.indexOf(I18N.lang));
  const pick = s => { if (s == null) return ''; if (Array.isArray(s)) return s[li()] || s[0]; const p = String(s).split('|'); return (p[li()] || p[0]).trim(); };
  const en = s => String(s || '').split('|')[0].trim();
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const K = (tex, display) => { try { return katex.renderToString(tex, { throwOnError: false, displayMode: !!display, strict: false }); } catch (e) { return esc(tex); } };
  const inline = s => esc(s).replace(/\$([^$]+)\$/g, (_, t) => K(t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')));
  const fill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m));
  const $ = (s, r = document) => r.querySelector(s);
  const CH = { chalk: '#f4f1e8', y: '#f3d36b', b: '#93d3f5', p: '#f4a3bd', g: '#a6e39f', o: '#f7b267' };
  const col = c => CH[c] || c;

  // ---------- texts of the player and of automatic tutorials ----------
  const UI = {
    step: 'Step {i} of {n}|Étape {i} sur {n}|Paso {i} de {n}|ステップ {i} / {n}|第 {i} 步，共 {n} 步',
    prev: '◀ Back|◀ Retour|◀ Atrás|◀ 戻る|◀ 上一步',
    next: 'Next ▶|Suivant ▶|Siguiente ▶|次へ ▶|下一步 ▶',
    done: 'Done ✓|Terminé ✓|Hecho ✓|完了 ✓|完成 ✓',
    replay: '⟲ Replay|⟲ Rejouer|⟲ Repetir|⟲ もう一度|⟲ 重播',
    play: '▶ Play|▶ Lecture|▶ Reproducir|▶ 自動再生|▶ 自动播放',
    pause: '❚❚ Pause|❚❚ Pause|❚❚ Pausa|❚❚ 一時停止|❚❚ 暂停',
    copy: '⧉ Copy LaTeX|⧉ Copier le LaTeX|⧉ Copiar LaTeX|⧉ LaTeX をコピー|⧉ 复制 LaTeX',
    copied: 'LaTeX copied|LaTeX copié|LaTeX copiado|LaTeX をコピーしました|已复制 LaTeX',
    practice: 'Practice puzzles →|S’entraîner →|Practicar →|問題で練習 →|做题练习 →',
    close: 'Close|Fermer|Cerrar|閉じる|关闭',
    draw: 'Drag a graph to move it, scroll or use + − to zoom, ⟲ for the best view. You can also write on the board.|Faites glisser un graphique pour le déplacer, molette ou + − pour zoomer, ⟲ pour la meilleure vue. Vous pouvez aussi écrire au tableau.|Arrastra una gráfica para moverla, rueda o + − para ampliar, ⟲ para la mejor vista. También puedes escribir en la pizarra.|グラフはドラッグで移動、ホイールか + − で拡大縮小、⟲ で最適な表示に戻ります。黒板に書くこともできます。|拖动图像可平移，滚轮或 + − 缩放，⟲ 恢复最佳视图。你也可以在黑板上书写。',
    loading: 'Getting the board ready…|Préparation du tableau…|Preparando la pizarra…|黒板を準備しています…|正在准备黑板…',
    // automatic tutorials
    aT1: 'The formula|La formule|La fórmula|公式|公式',
    aS1: '“{name}” — from {section}. Here it is on the board.|« {name} » — {section}. La voici au tableau.|«{name}» — {section}. Aquí la tienes en la pizarra.|「{name}」（{section}）。黒板に書きます。|“{name}”——来自{section}。写在黑板上。',
    aT2: 'Piece by piece|Morceau par morceau|Parte por parte|一つずつ|逐一来看',
    aS2: 'This card holds {n} formulas. Read them one at a time — each line is a separate fact.|Cette fiche contient {n} formules. Lisez-les une à une : chaque ligne est un résultat à part.|Esta tarjeta tiene {n} fórmulas. Léelas de una en una: cada línea es un resultado distinto.|このカードには {n} つの式があります。1 行ずつ読みましょう。それぞれ別の事実です。|这张卡片有 {n} 个公式。逐行阅读——每一行都是独立的结论。',
    aT3: 'What it tells you|Ce qu’elle dit|Qué te dice|この式の意味|它告诉你什么',
    aT4: 'The picture|Le dessin|El dibujo|図で見る|看图理解',
    aS4: 'The drawing shows the idea behind the formula: match each letter of the formula with the picture.|Le dessin montre l’idée de la formule : associez chaque lettre de la formule au dessin.|El dibujo muestra la idea de la fórmula: relaciona cada letra de la fórmula con el dibujo.|図は式の考え方を表しています。式の各文字を図と対応させましょう。|图展示了公式背后的思路：把公式里的每个字母和图对应起来。',
    aT5: 'An example|Un exemple|Un ejemplo|例|例子',
    aT6: 'Your turn|À vous|Te toca|やってみよう|轮到你了',
    aS6: 'Try it: write a value or an equation on the board with the chalk, then pause — the board reads it. Use ⧉ to copy the formula, or practise with real puzzles.|À vous : écrivez une valeur ou une équation à la craie, puis faites une pause — le tableau la lit. ⧉ copie la formule ; ou entraînez-vous sur de vrais problèmes.|Pruébalo: escribe un valor o una ecuación con la tiza y haz una pausa: la pizarra la lee. ⧉ copia la fórmula; o practica con problemas reales.|チョークで値や式を書いて少し待つと、黒板が読み取ります。⧉ で式をコピー、または実際の問題で練習しましょう。|试试看：用粉笔在黑板上写一个数或方程，停一下——黑板会识别它。用 ⧉ 复制公式，或者做真题练习。',
    aTbl: 'Read the table row by row: each line pairs a case with its formula.|Lisez le tableau ligne par ligne : chaque ligne associe un cas à sa formule.|Lee la tabla fila por fila: cada fila une un caso con su fórmula.|表は 1 行ずつ読みます。各行が場合と式の組です。|按行阅读表格：每一行把一种情况和它的公式对应起来。'
  };
  const T = k => pick(UI[k]);

  // ---------- automatic tutorial from a card ----------
  const mathBits = s => { const out = []; String(s || '').replace(/\$([^$]+)\$/g, (_, t) => { out.push(t); return ''; }); return out; };
  function autoTutorial(tp, sec, it) {
    const steps = [];
    if (it.tbl) {
      const rows = it.tbl.map(r => r.map(c => String(c).startsWith('~') ? '\\text{' + pick(String(c).slice(1)).replace(/\$[^$]*\$/g, '').replace(/[{}\\]/g, '') + '}' : c).join(' & ')).join(' \\\\ ');
      steps.push({ t: UI.aT1, s: fill(T('aS1'), { name: pick(sec.t), section: pick(tp.name) }) + ' ' + T('aTbl'), a: [['w', '\\begin{array}{' + 'l'.repeat(it.tbl[0].length) + '}' + rows + '\\end{array}', { x: 0.05, y: 0.45, s: 24 }]], table: it });
      steps.push({ t: UI.aT6, s: UI.aS6, a: [] });
      return steps;
    }
    const [name, texs, note, opt] = it, o = opt && typeof opt === 'object' && !Array.isArray(opt) ? opt : {};
    const tex = Array.isArray(texs) ? (texs[li()] || texs[0]) : texs;
    const parts = tex.split(/\\qquad/).map(x => x.trim().replace(/,$/, '')).filter(Boolean);
    const label = ['t', name || sec.t, { head: true, s: 17, c: CH.y }];
    steps.push({ t: UI.aT1, s: fill(T('aS1'), { name: pick(name || sec.t), section: pick(sec.t) }), a: [label, ['w', '\\displaystyle ' + parts.join('\\qquad '), { x: 0.05, y: 0.32, s: parts.length > 1 ? 26 : 32, d: 250 }]] });
    if (parts.length > 1) steps.push({ t: UI.aT2, s: fill(T('aS2'), { n: parts.length }), a: [['clr'], label, ...parts.map((p, i) => ['w', '\\displaystyle ' + p, { x: 0.07, y: 0.26 + i * Math.min(0.17, 0.62 / parts.length), s: 28, d: 200 + i * 650 }])] });
    const lastY = parts.length > 1 ? 0.26 + parts.length * Math.min(0.17, 0.62 / parts.length) : 0.5;
    if (note) steps.push({ t: UI.aT3, s: note, a: mathBits(pick(note)).slice(0, 3).map((m, i) => ['w', m, { x: 0.07, y: Math.min(0.9, lastY + 0.04 + i * 0.1), s: 22, c: CH.y, d: 200 + i * 500 }]) });
    const fig = o.fig || sec.fig;
    if (fig) steps.push({ t: UI.aT4, s: UI.aS4, a: [], fig: [].concat(fig)[0] });
    if (o.ex) steps.push({ t: UI.aT5, s: o.ex, a: [['clr'], label, ['w', '\\displaystyle ' + parts[0], { x: 0.05, y: 0.28, s: 26 }], ...mathBits(pick(o.ex)).slice(0, 3).map((m, i) => ['w', '\\displaystyle ' + m, { x: 0.07, y: 0.5 + i * 0.14, s: 26, c: CH.y, d: 300 + i * 700 }])] });
    steps.push({ t: UI.aT6, s: UI.aS6, a: [] });
    return steps;
  }

  // automatic lesson for one row of a table: the row's cells, each under its column heading
  function rowTutorial(tp, sec, it, r) {
    const cellTex = c => String(c).startsWith('~') ? '\\text{' + pick(String(c).slice(1)).replace(/\$[^$]*\$/g, '').replace(/[{}\\]/g, '') + '}' : c;
    const head = it.tbl[0], row = it.tbl[r];
    const lines = row.slice(1).map((c, j) => ['w', '\\displaystyle ' + cellTex(head[j + 1]) + ':\\quad ' + cellTex(c), { s: 26, d: 300 + j * 600 }]);
    return [
      { t: UI.aT1, s: fill(T('aS1'), { name: '', section: pick(sec.t) }).replace(/[“«「]\s*[”»」]\s*(—\s*)?/, '').trim() + ' ' + T('aTbl'), a: [['w', '\\displaystyle ' + cellTex(row[0]), { head: true, s: 18, c: CH.y }], ...lines] },
      { t: UI.aT6, s: UI.aS6, a: [] }
    ];
  }

  // ---------- loading the board scripts and topic tutorials on first use ----------
  const loaded = {};
  const script = src => loaded[src] || (loaded[src] = new Promise(ok => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ok; document.head.appendChild(s); }));
  const BOARD_JS = ['js/mathcore.js', 'js/recognizer.js', 'js/intent.js', 'js/geometry.js', 'js/board.js'];
  const ready = () => BOARD_JS.reduce((p, src) => p.then(() => script(src)), Promise.resolve());
  const TUT_V = '20261111b';  // bump when lesson files change, so browsers fetch the new version
  const topicTutorials = id => script('cheats/tutorials/' + id + '.js?v=' + TUT_V).then(() => (window.Cheats.tutorials || {})[id] || {});

  // ---------- the player ----------
  let el = null, board = null, cur = null, idx = 0, timer = null, playing = false;
  function build() {
    el = document.createElement('div'); el.className = 'tu'; el.hidden = true; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = `<div class="tu-box"><header class="tu-head"><span class="tu-ico"></span><div class="tu-ttl"><small></small><b></b></div><button type="button" class="tu-x" aria-label="Close">✕</button></header>
      <div class="tu-body"><div class="tu-boardwrap"><div class="board tu-board" data-tool="smart"><canvas class="board-ink"></canvas><div class="board-overlay"></div><canvas class="board-live"></canvas></div><div class="tu-status"></div><div class="tu-view" hidden><button type="button" data-z="in" title="Zoom in">+</button><button type="button" data-z="out" title="Zoom out">−</button><button type="button" data-z="reset" title="Back to the best view">⟲</button></div></div>
      <aside class="tu-side"><div class="tu-count"></div><h3 class="tu-st"></h3><div class="tu-text"></div><div class="tu-extra"></div><div class="tu-dots"></div>
      <div class="tu-nav"><button type="button" class="tu-prev"></button><button type="button" class="tu-next"></button></div>
      <div class="tu-tools"><button type="button" class="tu-replay"></button><button type="button" class="tu-play"></button><button type="button" class="tu-copy"></button><a class="tu-practice"></a></div>
      <p class="tu-hint"></p></aside></div></div>`;
    document.body.appendChild(el);
    $('.tu-x', el).onclick = close;
    el.addEventListener('click', e => { if (e.target === el) close(); });
    $('.tu-prev', el).onclick = () => go(idx - 1);
    $('.tu-next', el).onclick = () => (idx < cur.steps.length - 1 ? go(idx + 1) : close());
    $('.tu-replay', el).onclick = () => go(idx);
    $('.tu-play', el).onclick = () => { playing = !playing; label(); if (playing) autoNext(); else clearTimeout(timer); };
    $('.tu-copy', el).onclick = () => { if (window.CheatsUI && CheatsUI.copy) CheatsUI.copy(cur.tex); };
    $('.tu-view', el).onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.z === 'in') zoom(1.4); else if (b.dataset.z === 'out') zoom(1 / 1.4); else resetView(); };
    $('.tu-dots', el).onclick = e => { const b = e.target.closest('button[data-i]'); if (b) go(+b.dataset.i); };
    document.addEventListener('keydown', e => {
      if (!el || el.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') { e.preventDefault(); if (idx < cur.steps.length - 1) go(idx + 1); }
      if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') { e.preventDefault(); if (idx > 0) go(idx - 1); }
    });
  }
  function label() {
    $('.tu-prev', el).textContent = T('prev'); $('.tu-replay', el).textContent = T('replay'); $('.tu-copy', el).textContent = T('copy');
    $('.tu-play', el).textContent = playing ? T('pause') : T('play'); $('.tu-x', el).setAttribute('aria-label', T('close'));
    $('.tu-next', el).textContent = cur && idx >= cur.steps.length - 1 ? T('done') : T('next');
  }
  function autoNext() { clearTimeout(timer); if (!playing) return; timer = setTimeout(() => { if (idx < cur.steps.length - 1) go(idx + 1); else { playing = false; label(); } }, 5200); }

  // ---------- layout: a text column on the left, a graph panel on the right ----------
  const TOP = 0.16, BOTTOM = 0.95, GAP = 0.025, GRAPH = [0.53, 0.1, 0.965, 0.9];
    // does the board segment that step k belongs to (between two wipes) show a graph at some point?
  function segmentHasGraph(steps, k) {
    let a = k; while (a > 0 && !(steps[a].a || []).some(x => x[0] === 'clr')) a--;
    let b = k; while (b + 1 < steps.length && !(steps[b + 1].a || []).some(x => x[0] === 'clr')) b++;
    for (let i = a; i <= b; i++) if ((steps[i].a || []).some(x => x[0] === 'ax' || x[0] === 'p' || S3[x[0]])) return true;
    return false;
  }
  function place(state, m, o) {
    board.render();                                            // the formula exists in the page now: measure it
    const elx = board.mathEls.get(m.id); if (!elx) return;
    const W = board.W, H = board.H, left = (o.x && o.x > 0.1 ? 0.1 : 0.04) * W, right = (state.wide ? 0.965 : GRAPH[0] - 0.03) * W;
    let r = elx.getBoundingClientRect();
    if (r.width > right - left) { m.size = Math.max(12, m.size * (right - left) / r.width * 0.98); board.render(); r = elx.getBoundingClientRect(); }
    const h = r.height;
    // full column: wipe the oldest lines and move the rest up
    while (state.flow.length && state.y + h > BOTTOM * H) {
      const old = state.flow.shift(), freed = old.h + GAP * H;
      board.objects = board.objects.filter(x => x !== old.m);
      state.flow.forEach(f => { f.m.y -= freed; }); state.y -= freed;
    }
    m.x = left; m.y = state.y + h / 2;
    state.flow.push({ m, h }); state.y += h + GAP * H;
  }
  function relayout(state) {
    if (!state || !board) return;
    board.render();
    const W = board.W, H = board.H;
    let y = TOP * H;
    state.flow = state.flow.filter(f => board.objects.includes(f.m));
    for (const f of state.flow) {
      const elx = board.mathEls.get(f.m.id); if (!elx) continue;
      const left = f.m.x, right = (state.wide ? 0.965 : GRAPH[0] - 0.03) * W;
      let r = elx.getBoundingClientRect();
      if (r.width > right - left + 1) { f.m.size = Math.max(12, f.m.size * (right - left) / r.width * 0.98); board.render(); r = elx.getBoundingClientRect(); }
      f.h = r.height; f.m.y = y + f.h / 2; y += f.h + GAP * H;
    }
    while (state.flow.length > 1 && y > BOTTOM * H) { const old = state.flow.shift(); board.objects = board.objects.filter(x => x !== old.m); return relayout(state); }
    state.y = y; board.render();
  }
  // ---------- framing: show the interesting part of the functions ----------
  const NUM = (f, x) => { try { const y = f(x); return isFinite(y) ? y : NaN; } catch (e) { return NaN; } };
  function frame(spec) {
    const fns = spec.fns.map(e => board.compile(e.replace(/^\s*y\s*=/, '')));
    let xw = spec.xw;
    if (!xw) {
      const feats = [];
      if (spec.sh) feats.push(spec.sh[0], spec.sh[1]);
      spec.pts.forEach(p => feats.push(p[0]));
      if (!spec.sh) for (const f of fns) {
        let py = NUM(f, -8), pd = NaN;
        for (let x = -8 + 0.01; x <= 8; x += 0.01) {
          const y = NUM(f, x), d = y - py;
          if (isFinite(y) && isFinite(py)) {
            if ((y > 0) !== (py > 0) && Math.abs(y - py) < 5) feats.push(x);          // a zero (not a jump through an asymptote)
            if (isFinite(pd) && (d > 0) !== (pd > 0) && Math.abs(d) < 1) feats.push(x); // a peak or a valley
          }
          py = y; pd = d;
        }
      }
      const near = feats.filter(isFinite).sort((a, b) => Math.abs(a) - Math.abs(b)).slice(0, 6);
      let a = near.length ? Math.min(...near) : -2, b = near.length ? Math.max(...near) : 2;
      if (b - a < 2) { const m = (a + b) / 2; a = m - 1.5; b = m + 1.5; }
      if (a > 0 && a < (b - a) * 0.6) a = 0;                      // keep the y-axis in view when it is close
      if (b < 0 && -b < (b - a) * 0.6) b = 0;
      const pad = (b - a) * 0.18; a -= pad; b += pad;
      // skip where every function is undefined (ln, √ …)
      const ok = x => fns.some(f => isFinite(NUM(f, x)));
      while (a < b && !ok(a + (b - a) * 0.01)) a += (b - a) * 0.02;
      if (a > 0 && a < (b - a) * 0.15) a = -(b - a) * 0.04;
      xw = [a, b];
    }
    let yw = spec.yw;
    if (!yw) {
      const ys = [0];
      for (const f of fns) for (let k = 0; k <= 400; k++) { const y = NUM(f, xw[0] + (xw[1] - xw[0]) * k / 400); if (isFinite(y)) ys.push(y); }
      spec.pts.forEach(p => ys.push(p[1]));
      ys.sort((a, b) => a - b);
      const q = t => ys[Math.min(ys.length - 1, Math.max(0, Math.round(t * (ys.length - 1))))];
      let lo = Math.min(0, q(0.04)), hi = Math.max(0, q(0.96));
      if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
      const pad = (hi - lo) * 0.12; lo -= lo < 0 ? pad : pad * 0.3; hi += pad;
      yw = [lo, hi];
    }
    // the same scale on both axes when it costs little (circles stay round, slopes look right)
    const bw = (GRAPH[2] - GRAPH[0]) * board.W, bh = (GRAPH[3] - GRAPH[1]) * board.H;
    const ux = bw / (xw[1] - xw[0]), uy = bh / (yw[1] - yw[0]);
    if (spec.eq || (uy / ux > 0.7 && uy / ux < 1.45)) {
      if (ux > uy) { const c = (xw[0] + xw[1]) / 2, half = bw / uy / 2; xw = [c - half, c + half]; }
      else { const c = (yw[0] + yw[1]) / 2, half = bh / ux / 2; yw = [c - half, c + half]; }
    }
    return { xw, yw };
  }
  // ---------- 3D scenes (geometry in space): actions '3d', 'seg', 'vec', 'line3', 'pl', 'pt3', 'sph', 'circ3', 'lab3', 'poly3'
  const S3 = { '3d': 1, seg: 1, vec: 1, line3: 1, pl: 1, pt3: 1, sph: 1, circ3: 1, lab3: 1, poly3: 1 };
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  // the part of the line P + t d inside the scene's cube
  function clipLine(sc, P, d, f = 1) {
    let t0 = -1e9, t1 = 1e9;
    for (let k = 0; k < 3; k++) {
      const lo = sc.c[k] - sc.r * f, hi = sc.c[k] + sc.r * f;
      if (Math.abs(d[k]) < 1e-12) { if (P[k] < lo || P[k] > hi) return null; continue; }
      let a = (lo - P[k]) / d[k], b = (hi - P[k]) / d[k]; if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a); t1 = Math.min(t1, b);
    }
    if (t0 >= t1) return null;
    return [P.map((v, k) => v + t0 * d[k]), P.map((v, k) => v + t1 * d[k])];
  }
  // the polygon where the plane n·x + D = 0 cuts the scene's cube (shrunk by f)
  function clipPlane(sc, n, D, f = 0.85) {
    const lo = sc.c.map(v => v - sc.r * f), hi = sc.c.map(v => v + sc.r * f), pts = [];
    for (let k = 0; k < 3; k++) for (const a of [0, 1]) for (const b of [0, 1]) {
      const i = (k + 1) % 3, j = (k + 2) % 3, P = [0, 0, 0]; P[i] = a ? hi[i] : lo[i]; P[j] = b ? hi[j] : lo[j];
      if (Math.abs(n[k]) < 1e-12) continue;
      const v = -(D + n[i] * P[i] + n[j] * P[j]) / n[k];
      if (v >= lo[k] - 1e-9 && v <= hi[k] + 1e-9) { P[k] = v; pts.push(P); }
    }
    if (pts.length < 3) return null;
    const m = [0, 1, 2].map(k => pts.reduce((s, p) => s + p[k], 0) / pts.length);
    const N = n.map(v => v / Math.hypot(...n)), h = Math.abs(N[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
    const cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], u = cr(N, h), w = cr(N, u);
    const ang = p => { const q = p.map((v, k) => v - m[k]); return Math.atan2(dot3(q, w), dot3(q, u)); };
    return pts.sort((a, b) => ang(a) - ang(b));
  }
  function run3(kk, a, o, state, k3) {
    if (!state.sc) state.sc = board.sScene(GRAPH, kk === '3d' ? a[1] : {});
    if (kk === '3d') return;
    const sc = state.sc, it = Object.assign({}, o); if (it.c) it.c = col(it.c);
    if (it.d === undefined) it.d = 300 * k3;
    if (kk === 'seg' || kk === 'vec') Object.assign(it, { k: 'seg', a: a[1], b: a[2], arrow: kk === 'vec' });
    else if (kk === 'line3') { const ab = clipLine(sc, a[1], a[2], it.f || 1); if (!ab) return; Object.assign(it, { k: 'seg', a: ab[0], b: ab[1] }); }
    else if (kk === 'pl') { const pts = clipPlane(sc, a[1], a[2], it.f || 0.7); if (!pts) return; Object.assign(it, { k: 'poly', pts, fill: it.fill !== undefined ? it.fill : 0.16, w: it.w || 1.6 }); }
    else if (kk === 'poly3') Object.assign(it, { k: 'poly', pts: a[1], fill: it.fill !== undefined ? it.fill : 0.14 });
    else if (kk === 'pt3') Object.assign(it, { k: 'pt', p: a[1], lab: a[2] ? pick(a[2]) : '' });
    else if (kk === 'sph') Object.assign(it, { k: 'sph', o: a[1], r: a[2], fill: it.fill !== undefined ? it.fill : 0.08 });
    else if (kk === 'circ3') Object.assign(it, { k: 'circ', o: a[1], n: a[2], r: a[3] });
    else if (kk === 'lab3') Object.assign(it, { k: 'lab', p: a[1], s: pick(a[2]) });
    board.s3(sc, it);
  }
  // run one step's actions on the board
  function run(steps, k, state) {
    const step = steps[k];
    let acts = step.a || [];
    // a wipe comes first: it must happen before this step's graph is framed and created
    if (acts.some(a => a[0] === 'clr')) {
      board.reset(); Object.assign(state, { ax: null, gr: null, sc: null, flow: [], y: TOP * board.H, wide: !segmentHasGraph(steps, k) });
      acts = acts.filter(a => a[0] !== 'clr');
    }
    // the graph of this step: gather its curves, shading and points first, so the window fits all of them
    const axI = acts.findIndex(a => a[0] === 'ax' || a[0] === 'p');
    if (axI >= 0 && !state.ax) {
      const spec = Object.assign({ fns: [], pts: [], sh: null }, acts[axI][0] === 'ax' ? acts[axI][1] : {});
      acts.forEach(a => { if (a[0] === 'p') spec.fns.push(a[1]); if (a[0] === 'sh') spec.sh = [a[1], a[2]]; if (a[0] === 'pt' || a[0] === 'lbl') spec.pts.push([a[1], a[2]]); });
      const w = frame(spec);
      state.ax = board.sWindow(GRAPH, w.xw, w.yw); state.view = { xw: w.xw, yw: w.yw };
    }
    let k3 = 0;
    for (const a of acts) {
      if (S3[a[0]]) { const o = a.length > 1 && a[a.length - 1] && typeof a[a.length - 1] === 'object' && !Array.isArray(a[a.length - 1]) && a[0] !== '3d' ? a[a.length - 1] : {}; try { run3(a[0], a, o, state, k3++); } catch (err) { console.warn('3d action', a, err); } continue; }
      const [kk, x, y, z, w] = a, o = Object.assign({}, kk === 'w' || kk === 't' ? y : kk === 'pt' ? w : kk === 'lbl' ? w : kk === 'ln' ? a[5] : y);
      if (o.c) o.c = col(o.c);
      try {
        if (kk === 'w' || kk === 't') {
          const tex = kk === 't' ? '\\text{' + pick(x).replace(/([{}%#&_$])/g, '\\$1') + '}' : Array.isArray(x) ? pick(x) : x;
          const head = o.head;
          const m = board.sWrite(tex, Object.assign({ s: 26 }, o, head ? { x: 0.04, y: 0.07 } : {}));
          if (!head) place(state, m, o);
        }
        else if (kk === 'p') { if (!state.ax) { const w = frame({ fns: [x], pts: [], sh: null }); state.ax = board.sWindow(GRAPH, w.xw, w.yw); state.view = w; } state.gr = board.sPlot(state.ax, x, o); }
        else if (kk === 'sh') { if (state.gr) board.sShade(state.gr, x, y); }
        else if (kk === 'tan') { if (state.gr) board.sTangent(state.gr, x); }
        else if (kk === 'pt') { board.sPoint(state.ax, x, y, pick(z), o); }
        else if (kk === 'lbl') { const q = board.toPx(state.ax, { x, y }); const m = board.sWrite(z, Object.assign({ s: 18 }, o)); m.x = q.x + 8; m.y = q.y - 14; }
        else if (kk === 'ln') { board.sLine(x, y, z, w, Object.assign(o, { ax: state.ax })); }
      } catch (err) { console.warn('tutorial action', a, err); }
    }
  }
  // zoom / move the graph: + − and ⟲ back to the framed view
  function viewTools() {
    const t = $('.tu-view', el); if (!t) return;
    const ax = board.objects.find(o => o.type === 'axes' || o.type === 'scene'); t.hidden = !ax;
  }
  function zoom(f) { const sc = board.objects.find(o => o.type === 'scene'); if (sc) { sc.zoom = Math.max(0.4, Math.min(4, sc.zoom * f)); board.render(); return; }
    const ax = board.objects.find(o => o.type === 'axes'); if (!ax) return; board.zoomAxes(ax, f, { x: (ax.x0 + ax.x1) / 2, y: (ax.y0 + ax.y1) / 2 }); }
  function resetView() {
    const sc = board.objects.find(o => o.type === 'scene'); if (sc) { Object.assign(sc, sc.home); board.render(); return; }
    const ax = board.objects.find(o => o.type === 'axes'); if (!ax || !cur.view) return;
    const { xw, yw } = cur.view, ux = (ax.x1 - ax.x0) / (xw[1] - xw[0]), uy = (ax.y1 - ax.y0) / (yw[1] - yw[0]);
    Object.assign(ax, { unit: ux, uy, ox: ax.x0 - xw[0] * ux, oy: ax.y0 + yw[1] * uy }); board.implicitCache.clear(); board.render();
  }
  function go(i) {
    idx = Math.max(0, Math.min(cur.steps.length - 1, i));
    board.reset(); { const st = $('.tu-status', el); if (st) st.textContent = ''; }
    const state = { ax: null, gr: null, sc: null, flow: [], y: TOP * board.H, wide: !segmentHasGraph(cur.steps, 0) };
    for (let k = 0; k < idx; k++) run(cur.steps, k, state);   // earlier steps appear at once…
    board.sSettle();
    const step = cur.steps[idx];
    run(cur.steps, idx, state);                               // …this one is drawn live
    cur.view = state.view || cur.view; viewTools();
    cur.state = state; relayout(state);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (cur.state === state) relayout(state); });
    setTimeout(() => { if (cur.state === state) relayout(state); }, 400);
    $('.tu-count', el).textContent = fill(T('step'), { i: idx + 1, n: cur.steps.length });
    $('.tu-st', el).textContent = pick(step.t);
    $('.tu-text', el).innerHTML = inline(pick(step.s));
    const extra = $('.tu-extra', el);
    extra.innerHTML = step.fig && window.CheatFigs && CheatFigs[step.fig] ? `<figure class="cf">${CheatFigs[step.fig](I18N.lang)}</figure>` : '';
    if (step.ex) exercise(step.ex, extra, state);
    $('.tu-dots', el).innerHTML = cur.steps.map((s, k) => `<button type="button" data-i="${k}" class="${k === idx ? 'on' : k < idx ? 'past' : ''}" title="${esc(pick(s.t))}"></button>`).join('');
    $('.tu-prev', el).disabled = idx === 0;
    label(); autoNext();
  }
  // ---------- exercises: the reader types an answer, the page checks it ----------
  const EXT = {
    head: 'Exam-style exercise|Exercice type examen|Ejercicio tipo examen|入試レベルの演習|考试风格练习',
    val: 'Compute: {q}|Calculez : {q}|Calcula: {q}|次を計算せよ：{q}|计算：{q}',
    der: 'Differentiate: {q}|Dérivez : {q}|Deriva: {q}|次を微分せよ：{q}|求导：{q}',
    helpD: 'An expression in x, e.g. 3x^2, 2x*cos(x^2), e^(2x)/x, 1/sqrt(1-x^2)|Une expression en x, par ex. 3x^2, 2x*cos(x^2), e^(2x)/x, 1/sqrt(1-x^2)|Una expresión en x, p. ej. 3x^2, 2x*cos(x^2), e^(2x)/x, 1/sqrt(1-x^2)|x の式。例：3x^2, 2x*cos(x^2), e^(2x)/x, 1/sqrt(1-x^2)|关于 x 的表达式，如 3x^2, 2x*cos(x^2), e^(2x)/x, 1/sqrt(1-x^2)',
    anti: 'Find an antiderivative of {q}|Trouvez une primitive de {q}|Halla una primitiva de {q}|{q} の原始関数を 1 つ求めよ|求 {q} 的一个原函数',
    helpV: 'A number or an exact value: 2/3, pi/4, e-1, sqrt(3), ln(2)…|Un nombre ou une valeur exacte : 2/3, pi/4, e-1, sqrt(3), ln(2)…|Un número o un valor exacto: 2/3, pi/4, e-1, sqrt(3), ln(2)…|数値または厳密な値：2/3, pi/4, e-1, sqrt(3), ln(2)…|数字或精确值：2/3, pi/4, e-1, sqrt(3), ln(2)…',
    helpA: 'An expression in x, e.g. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C is optional)|Une expression en x, par ex. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C facultatif)|Una expresión en x, p. ej. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C opcional)|x の式。例：x^3/3 + 2x, sin(x), ln(x), e^(2x)/2（+C は省略可）|关于 x 的表达式，如 x^3/3 + 2x, sin(x), ln(x), e^(2x)/2（+C 可省略）',
    helpP: 'Three coordinates, e.g. (1, -2, 3) or 1; -2; 3/2|Trois coordonnées, par ex. (1; -2; 3) ou 1; -2; 3/2|Tres coordenadas, p. ej. (1, -2, 3) o 1; -2; 3/2|3 つの座標。例：(1, -2, 3)、1; -2; 3/2|三个坐标，如 (1, -2, 3) 或 1; -2; 3/2',
    helpP2: 'Two numbers, e.g. (2, -1) or x = 2; y = -1|Deux nombres, par ex. (2; -1) ou x = 2; y = -1|Dos números, p. ej. (2, -1) o x = 2; y = -1|2 つの数。例：(2, -1)、x = 2; y = -1|两个数，如 (2, -1) 或 x = 2; y = -1',
    helpN: 'A vector, e.g. (2, -1, 3) — any non-zero multiple is accepted|Un vecteur, par ex. (2; -1; 3) — tout multiple non nul est accepté|Un vector, p. ej. (2, -1, 3): vale cualquier múltiplo no nulo|ベクトル。例：(2, -1, 3)（0 でない定数倍も正解）|一个向量，如 (2, -1, 3)——任意非零倍数都算对',
    helpE: 'An expression in x, e.g. (x - 1)(x + 2), 2sin(x)cos(x), (x+1)/(x-1)|Une expression en x, par ex. (x - 1)(x + 2), 2sin(x)cos(x), (x+1)/(x-1)|Una expresión en x, p. ej. (x - 1)(x + 2), 2sin(x)cos(x), (x+1)/(x-1)|x の式。例：(x - 1)(x + 2), 2sin(x)cos(x), (x+1)/(x-1)|关于 x 的表达式，如 (x - 1)(x + 2), 2sin(x)cos(x), (x+1)/(x-1)',
    helpR: 'All the solutions, separated by ; e.g. 2; -3 or x = 1/2; x = 4|Toutes les solutions, séparées par ; par ex. 2; -3 ou x = 1/2; x = 4|Todas las soluciones, separadas por ; p. ej. 2; -3 o x = 1/2; x = 4|すべての解を ; で区切って。例：2; -3、x = 1/2; x = 4|所有解，用 ; 分隔，如 2; -3 或 x = 1/2; x = 4',
    helpM: 'A matrix, row by row: [[1, 2], [3, 4]] or 1 2; 3 4 (fractions allowed: 1/2)|Une matrice, ligne par ligne : [[1, 2], [3, 4]] ou 1 2; 3 4 (fractions permises : 1/2)|Una matriz, fila a fila: [[1, 2], [3, 4]] o 1 2; 3 4 (se admiten fracciones: 1/2)|行列を行ごとに：[[1, 2], [3, 4]] または 1 2; 3 4（分数可：1/2）|按行输入矩阵：[[1, 2], [3, 4]] 或 1 2; 3 4（可用分数：1/2）',
    helpC: 'A complex number a + bi, e.g. 3 - 2i, 1/2 + (sqrt(3)/2)i|Un nombre complexe a + bi, par ex. 3 - 2i, 1/2 + (sqrt(3)/2)i|Un número complejo a + bi, p. ej. 3 - 2i, 1/2 + (sqrt(3)/2)i|複素数 a + bi。例：3 - 2i, 1/2 + (sqrt(3)/2)i|复数 a + bi，如 3 - 2i, 1/2 + (sqrt(3)/2)i',
    helpPl: 'An equation in x, y, z, e.g. 2x - y + 3z = 5 — any multiple is accepted|Une équation en x, y, z, par ex. 2x - y + 3z = 5 — tout multiple est accepté|Una ecuación en x, y, z, p. ej. 2x - y + 3z = 5: vale cualquier múltiplo|x, y, z の方程式。例：2x - y + 3z = 5（定数倍も正解）|关于 x, y, z 的方程，如 2x - y + 3z = 5——任意倍数都算对',
    check: 'Check|Vérifier|Comprobar|答え合わせ|检查',
    hint: 'Hint|Indice|Pista|ヒント|提示',
    show: 'Show the solution|Voir la solution|Ver la solución|解答を見る|查看解答',
    ok: 'Correct! ✓|Correct ! ✓|¡Correcto! ✓|正解！✓|正确！✓',
    no: 'Not yet — check your work or ask for a hint.|Pas encore : vérifiez vos calculs ou demandez un indice.|Todavía no: revisa tus cuentas o pide una pista.|まだ違います。計算を見直すかヒントを見ましょう。|还不对——检查一下过程或看提示。',
    bad: 'I can’t read that — use the notation shown below the box.|Je ne peux pas lire cela : utilisez la notation indiquée sous la case.|No puedo leerlo: usa la notación indicada bajo la casilla.|読み取れません。入力欄の下の書き方を使ってください。|无法识别——请按输入框下方的写法输入。'
  };
  const E = k => pick(EXT[k]);
  // functions the maths engine does not know, rewritten with ones it does (simple arguments)
  const EXPAND = [[/(?<![a-z])sinh\(([^()]*)\)/g, '((e^($1)-e^(-($1)))/2)'], [/(?<![a-z])cosh\(([^()]*)\)/g, '((e^($1)+e^(-($1)))/2)'], [/(?<![a-z])tanh\(([^()]*)\)/g, '((e^($1)-e^(-($1)))/(e^($1)+e^(-($1))))'],
    [/(?<![a-z])(?:arccot|acot)\(([^()]*)\)/g, '(pi/2-atan($1))'], [/(?<![a-z])sec\(([^()]*)\)/g, '(1/cos($1))'], [/(?<![a-z])(?:csc|cosec)\(([^()]*)\)/g, '(1/sin($1))'], [/(?<![a-z])cot\(([^()]*)\)/g, '(cos($1)/sin($1))'],
    [/(?<![a-z])log_?(\d+)\(([^()]*)\)/g, '(ln($2)/ln($1))']];
  const expand = s => { for (let k = 0; k < 3; k++) for (const [re, to] of EXPAND) s = s.replace(re, to); return s; };
  const norm = s => expand(String(s).toLowerCase().replace(/π/g, 'pi').replace(/\barc(sin|cos|tan)\b/g, 'a$1').replace(/√/g, 'sqrt').replace(/,/g, '.').replace(/^\s*[a-z]\s*\(\s*x\s*\)\s*=|^\s*y\s*=/, '').replace(/\+\s*c\s*$/, '').trim());
  function evalAt(src, x) { const st = MathCore.parse(src); return MathCore.evaluate(st.sides ? st.sides[0] : st, { x }); }
  // answers in space: a point (x, y, z), a direction (any multiple) or a plane Ax + By + Cz + D = 0 (any multiple)
  const lite = s => String(s).toLowerCase().replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/°/g, '').replace(/−/g, '-').trim();
  function tuple(input, n = 3) {
    const raw = lite(input).replace(/^[a-z]\s*'?\s*=\s*/, '').replace(/^[(\[<]|[)\]>]$/g, '');
    const parts = raw.includes(';') ? raw.split(';') : raw.split(',');
    if (parts.length !== n) return null;
    const v = parts.map(t => evalAt(lite(t).replace(/,/g, '.'), 0)); return v.every(isFinite) ? v : null;
  }
  function planeOf(input) {
    const st = MathCore.parse(lite(input).replace(/,/g, '.'));
    const f = (x, y, z) => MathCore.evaluate(st.sides[0], { x, y, z }) - (st.sides[1] ? MathCore.evaluate(st.sides[1], { x, y, z }) : 0);
    const D = f(0, 0, 0), c = [f(1, 0, 0) - D, f(0, 1, 0) - D, f(0, 0, 1) - D, D];
    if (!c.every(isFinite) || Math.abs(f(2.3, -1.7, 0.9) - (2.3 * c[0] - 1.7 * c[1] + 0.9 * c[2] + D)) > 1e-6) return null;   // not linear
    return c;
  }
  const propto = (a, b) => { const l = dot(a, b) / dot(b, b); return dot(b, b) > 1e-12 && Math.abs(l) > 1e-9 && a.every((v, i) => Math.abs(v - l * b[i]) <= 1e-3 * Math.max(1, Math.abs(v))); };
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  function checkAnswer(ex, input) {
    if (!String(input).trim()) return null;
    try {
      if (ex.k === 'pt' || ex.k === 'dir') { const got = tuple(input, ex.v.length); if (!got) return null; const want = ex.v.map(v => typeof v === 'number' ? v : evalAt(v, 0)); return ex.k === 'pt' ? got.every((v, i) => Math.abs(v - want[i]) <= 1e-3 * Math.max(1, Math.abs(want[i]))) : propto(got, want); }
      if (ex.k === 'cx') {   // a complex number a + bi (anything linear in i: 3 - 2i, (1 + i)/2, sqrt(3)i)
        const src = lite(input).replace(/,/g, '.').replace(/(?<![a-z])[ij](?![a-z])/g, 'x');
        const f = t => evalAt(src, t), a = f(0), b = f(1) - a;
        if (![a, b].every(isFinite) || Math.abs(f(2) - (a + 2 * b)) > 1e-9 * Math.max(1, Math.abs(a) + Math.abs(b))) return null;
        const w = ex.v.map(v => typeof v === 'number' ? v : evalAt(v, 0));
        return Math.abs(a - w[0]) <= 1e-3 * Math.max(1, Math.abs(w[0])) && Math.abs(b - w[1]) <= 1e-3 * Math.max(1, Math.abs(w[1]));
      }
      if (ex.k === 'mat') {   // a matrix: rows split by ; or ][ , entries by commas or spaces — [[1, 2], [3, 4]] or 1 2; 3 4
        const raw = lite(input).replace(/^\s*[a-z]\s*(\^\S*)?\s*=\s*/, '');
        const rows = raw.replace(/\]\s*,?\s*\[/g, ';').replace(/[\[\]()]/g, '').split(/;|\n/).map(r => r.trim()).filter(Boolean);
        const got = rows.map(r => (r.includes(',') ? r.split(',') : r.split(/\s+/)).map(t => t.trim()).filter(Boolean).map(t => evalAt(t, 0)));
        if (got.length !== ex.v.length || got.some((r, i) => r.length !== ex.v[i].length || !r.every(isFinite))) return null;
        return got.every((r, i) => r.every((v, j) => { const w = typeof ex.v[i][j] === 'number' ? ex.v[i][j] : evalAt(ex.v[i][j], 0); return Math.abs(v - w) <= 1e-3 * Math.max(1, Math.abs(w)); }));
      }
      if (ex.k === 'roots') {   // a list of numbers in any order: x = 2, x = -3  or  2; -3
        const raw = lite(input).replace(/[{}()\[\]]/g, '').replace(/[a-z]\s*=/g, '').replace(/\b(or|ou|o|y|and|et)\b/g, ';');
        const parts = (raw.includes(';') ? raw.split(';') : raw.split(',')).map(t => t.trim()).filter(Boolean);
        const got = parts.map(t => evalAt(lite(t).replace(/,/g, '.'), 0)); if (!got.length || !got.every(isFinite)) return null;
        const want = ex.v.map(v => typeof v === 'number' ? v : evalAt(v, 0)).sort((a, b) => a - b); got.sort((a, b) => a - b);
        return got.length === want.length && got.every((v, i) => Math.abs(v - want[i]) <= 1e-3 * Math.max(1, Math.abs(want[i])));
      }
      if (ex.k === 'plane') { const got = planeOf(input); if (!got || got.slice(0, 3).every(v => Math.abs(v) < 1e-12)) return null; return propto(got, ex.v); }
    } catch (e) { return null; }
    const src = norm(String(input).replace(/°/g, '')); if (!src) return null;
    try {
      if (ex.k === 'val') {
        const want = evalAt(ex.v, 0), got = evalAt(src, 0); if (!isFinite(got)) return null;
        const dec = /^-?\d*\.(\d+)$/.exec(src), round = dec ? 0.5 * Math.pow(10, -dec[1].length) + 1e-9 : 0;   // a rounded decimal (0.58 for 1/√3) is right to its last digit
        const exact = Math.abs(want) >= 10 && Math.abs(want - Math.round(want)) < 1e-9;   // a count (676 000 codes) must be exact
        return Math.abs(got - want) <= Math.max(exact ? 1e-9 : 1e-4 * Math.max(1, Math.abs(want)), round);
      }
      if (ex.k === 'expr') {   // an expression equal to ex.f for every x where both are defined (simplify, factor, expand…)
        let tested = 0;
        for (const x0 of [0.37, 0.81, 1.23, 1.77, 2.41, -0.63, -1.42, 3.1, 0.13, -2.29]) {
          const want = evalAt(ex.f, x0), got = evalAt(src, x0);
          if (!isFinite(want) || !isFinite(got)) continue;
          if (Math.abs(got - want) > 1e-6 * Math.max(1, Math.abs(want))) return false;
          tested++;
        }
        return tested >= 3 ? true : null;
      }
      if (ex.k === 'der') {   // a derivative: it must match the slope of f wherever both are defined
        let tested = 0;
        for (const x0 of [0.37, 0.81, 1.23, 1.77, 2.41, -0.63, -1.42, 3.1, 0.13, -0.29]) {
          const h = 1e-5, a = evalAt(ex.f, x0 + h), b = evalAt(ex.f, x0 - h), want = (a - b) / (2 * h), got = evalAt(src, x0);
          if (!isFinite(want) || !isFinite(got) || Math.abs(want) > 1e6) continue;
          if (Math.abs(got - want) > 2e-3 * Math.max(1, Math.abs(want))) return false;
          tested++;
        }
        return tested >= 3 ? true : null;
      }
      // an antiderivative: its derivative must match the integrand wherever both are defined (the constant does not matter)
      let tested = 0;
      for (const x0 of [0.37, 0.81, 1.23, 1.77, 2.41, -0.63, -1.42, 3.1]) {
        const f = evalAt(ex.f, x0); if (!isFinite(f)) continue;
        const h = 1e-4, d = (evalAt(src, x0 + h) - evalAt(src, x0 - h)) / (2 * h);
        if (!isFinite(d)) continue;
        if (Math.abs(d - f) > 1e-3 * Math.max(1, Math.abs(f))) return false;
        tested++;
      }
      return tested >= 3 ? true : null;
    } catch (e) { return null; }
  }
  function exercise(ex, box, state) {
    const q = String(ex.q).includes('|') ? inline(pick(ex.q)) : K(ex.q, false);
    const task = ex.k === 'anti' ? E('anti') : ex.k === 'der' ? E('der') : E('val');
    box.insertAdjacentHTML('beforeend', `<div class="tu-ex"><div class="tu-ex-h">${esc(E('head'))}</div><div class="tu-ex-q">${String(ex.q).includes('|') ? q : esc(task).replace('{q}', q)}</div>
      <div class="tu-ex-row"><input type="text" class="tu-ex-in" spellcheck="false" autocomplete="off" aria-label="${esc(E('check'))}"><button type="button" class="tu-ex-go">${esc(E('check'))}</button></div>
      <div class="tu-ex-help">${ex.k === 'pt' && ex.v.length === 2 ? esc(E('helpP2')) : esc(E({ anti: 'helpA', der: 'helpD', pt: 'helpP', dir: 'helpN', plane: 'helpPl', expr: 'helpE', roots: 'helpR', mat: 'helpM', cx: 'helpC' }[ex.k] || 'helpV'))}</div><div class="tu-ex-msg" aria-live="polite"></div>
      <div class="tu-ex-more"><button type="button" class="tu-ex-hint">${esc(E('hint'))}</button><button type="button" class="tu-ex-sol">${esc(E('show'))}</button></div></div>`);
    const inp = $('.tu-ex-in', box), msg = $('.tu-ex-msg', box);
    const solve = (n) => { (ex.sol || []).slice(0, n).forEach((t, i) => { if (state.shown > i) return; state.shown = i + 1; const m = board.sWrite('\\displaystyle ' + t, { s: 24, c: col('y'), d: 0 }); place(state, m, {}); }); relayout(state); };
    state.shown = 0;
    $('.tu-ex-go', box).onclick = () => {
      const r = checkAnswer(ex, inp.value);
      msg.className = 'tu-ex-msg ' + (r === true ? 'ok' : r === false ? 'no' : 'bad');
      msg.textContent = r === true ? E('ok') : r === false ? E('no') : E('bad');
      if (r === true) solve((ex.sol || []).length);
    };
    inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') $('.tu-ex-go', box).click(); });
    $('.tu-ex-hint', box).onclick = () => solve(Math.min((ex.sol || []).length, state.shown + 1));
    $('.tu-ex-sol', box).onclick = () => solve((ex.sol || []).length);
  }
  function close() { if (!el) return; el.hidden = true; clearTimeout(timer); playing = false; document.body.classList.remove('tu-open'); if (cur && cur.from) cur.from.focus && cur.from.focus(); }

  /** open the tutorial of one card: tp = topic, sec = section, it = item, from = the clicked element */
  function open(tp, sec, it, from, opts = {}) {
    if (!el) build();
    el.hidden = false; document.body.classList.add('tu-open');
    el.style.setProperty('--c', tp.color); el.style.setProperty('--cbg', tp.bg);
    $('.tu-ico', el).textContent = tp.icon;
    $('.tu-ttl small', el).textContent = pick(tp.name) + ' · ' + pick(sec.t);
    const row = it.tbl && opts.row ? it.tbl[opts.row] : null;
    if (row) $('.tu-ttl b', el).innerHTML = K(String(row[0]).startsWith('~') ? '\\text{' + pick(String(row[0]).slice(1)) + '}' : row[0], false);
    else $('.tu-ttl b', el).textContent = it.tbl ? pick(sec.t) : pick(it[0] || sec.t);
    $('.tu-text', el).textContent = T('loading'); $('.tu-st', el).textContent = ''; $('.tu-extra', el).innerHTML = ''; $('.tu-dots', el).innerHTML = ''; $('.tu-count', el).textContent = '';
    $('.tu-hint', el).textContent = T('draw');
    const pr = $('.tu-practice', el); pr.hidden = !tp.cat; if (tp.cat) { pr.href = 'index.html?cat=' + tp.cat; pr.textContent = T('practice'); }
    const tex = row ? row.filter(c => !String(c).startsWith('~')).join(' \\quad ') : from && from.dataset ? from.dataset.tex : '';
    Promise.all([ready(), topicTutorials(tp.id)]).then(([, hand]) => {
      if (!board) { board = new window.SmartBoard($('.tu-board', el), { panAxes: true, onStatus: m => { $('.tu-status', el).textContent = m || ''; } }); board.showKeyPoints = false; }
      board.resize();
      const key = en(sec.t) + '/' + (row ? String(row[0]) : it.tbl ? '' : en(it[0]));
      const steps = (row && hand[en(sec.t) + '/#' + opts.row]) || hand[key] || (row ? rowTutorial(tp, sec, it, opts.row) : autoTutorial(tp, sec, it));   // 'Section/#2' names a row by its number (rows whose first cells repeat)
      cur = { steps, tex, from };
      requestAnimationFrame(() => { board.resize(); go(0); });
      $('.tu-next', el).focus();
    });
  }

  window.Tutor = { open, autoTutorial };
})();
