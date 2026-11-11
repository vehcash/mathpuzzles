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

  // ---------- loading the board scripts and topic tutorials on first use ----------
  const loaded = {};
  const script = src => loaded[src] || (loaded[src] = new Promise(ok => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ok; document.head.appendChild(s); }));
  const BOARD_JS = ['js/mathcore.js', 'js/recognizer.js', 'js/intent.js', 'js/geometry.js', 'js/board.js'];
  const ready = () => BOARD_JS.reduce((p, src) => p.then(() => script(src)), Promise.resolve());
  const topicTutorials = id => script('cheats/tutorials/' + id + '.js').then(() => (window.Cheats.tutorials || {})[id] || {});

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
    for (let i = a; i <= b; i++) if ((steps[i].a || []).some(x => x[0] === 'ax' || x[0] === 'p')) return true;
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
  // run one step's actions on the board
  function run(steps, k, state) {
    const step = steps[k];
    let acts = step.a || [];
    // a wipe comes first: it must happen before this step's graph is framed and created
    if (acts.some(a => a[0] === 'clr')) {
      board.reset(); Object.assign(state, { ax: null, gr: null, flow: [], y: TOP * board.H, wide: !segmentHasGraph(steps, k) });
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
    for (const a of acts) {
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
    const ax = board.objects.find(o => o.type === 'axes'); t.hidden = !ax;
  }
  function zoom(f) { const ax = board.objects.find(o => o.type === 'axes'); if (!ax) return; board.zoomAxes(ax, f, { x: (ax.x0 + ax.x1) / 2, y: (ax.y0 + ax.y1) / 2 }); }
  function resetView() {
    const ax = board.objects.find(o => o.type === 'axes'); if (!ax || !cur.view) return;
    const { xw, yw } = cur.view, ux = (ax.x1 - ax.x0) / (xw[1] - xw[0]), uy = (ax.y1 - ax.y0) / (yw[1] - yw[0]);
    Object.assign(ax, { unit: ux, uy, ox: ax.x0 - xw[0] * ux, oy: ax.y0 + yw[1] * uy }); board.implicitCache.clear(); board.render();
  }
  function go(i) {
    idx = Math.max(0, Math.min(cur.steps.length - 1, i));
    board.reset();
    const state = { ax: null, gr: null, flow: [], y: TOP * board.H, wide: !segmentHasGraph(cur.steps, 0) };
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
    anti: 'Find an antiderivative of {q}|Trouvez une primitive de {q}|Halla una primitiva de {q}|{q} の原始関数を 1 つ求めよ|求 {q} 的一个原函数',
    helpV: 'A number or an exact value: 2/3, pi/4, e-1, sqrt(3), ln(2)…|Un nombre ou une valeur exacte : 2/3, pi/4, e-1, sqrt(3), ln(2)…|Un número o un valor exacto: 2/3, pi/4, e-1, sqrt(3), ln(2)…|数値または厳密な値：2/3, pi/4, e-1, sqrt(3), ln(2)…|数字或精确值：2/3, pi/4, e-1, sqrt(3), ln(2)…',
    helpA: 'An expression in x, e.g. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C is optional)|Une expression en x, par ex. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C facultatif)|Una expresión en x, p. ej. x^3/3 + 2x, sin(x), ln(x), e^(2x)/2 (+C opcional)|x の式。例：x^3/3 + 2x, sin(x), ln(x), e^(2x)/2（+C は省略可）|关于 x 的表达式，如 x^3/3 + 2x, sin(x), ln(x), e^(2x)/2（+C 可省略）',
    check: 'Check|Vérifier|Comprobar|答え合わせ|检查',
    hint: 'Hint|Indice|Pista|ヒント|提示',
    show: 'Show the solution|Voir la solution|Ver la solución|解答を見る|查看解答',
    ok: 'Correct! ✓|Correct ! ✓|¡Correcto! ✓|正解！✓|正确！✓',
    no: 'Not yet — check your work or ask for a hint.|Pas encore : vérifiez vos calculs ou demandez un indice.|Todavía no: revisa tus cuentas o pide una pista.|まだ違います。計算を見直すかヒントを見ましょう。|还不对——检查一下过程或看提示。',
    bad: 'I can’t read that — use the notation shown below the box.|Je ne peux pas lire cela : utilisez la notation indiquée sous la case.|No puedo leerlo: usa la notación indicada bajo la casilla.|読み取れません。入力欄の下の書き方を使ってください。|无法识别——请按输入框下方的写法输入。'
  };
  const E = k => pick(EXT[k]);
  const norm = s => String(s).toLowerCase().replace(/π/g, 'pi').replace(/\barc(sin|cos|tan)\b/g, 'a$1').replace(/√/g, 'sqrt').replace(/,/g, '.').replace(/^\s*[a-z]\s*\(\s*x\s*\)\s*=|^\s*y\s*=/, '').replace(/\+\s*c\s*$/, '').trim();
  function evalAt(src, x) { const st = MathCore.parse(src); return MathCore.evaluate(st.sides ? st.sides[0] : st, { x }); }
  function checkAnswer(ex, input) {
    const src = norm(input); if (!src) return null;
    try {
      if (ex.k === 'val') { const want = evalAt(ex.v, 0), got = evalAt(src, 0); if (!isFinite(got)) return null; return Math.abs(got - want) <= 1e-3 * Math.max(1, Math.abs(want)); }
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
    const task = ex.k === 'anti' ? E('anti') : E('val');
    box.insertAdjacentHTML('beforeend', `<div class="tu-ex"><div class="tu-ex-h">${esc(E('head'))}</div><div class="tu-ex-q">${String(ex.q).includes('|') ? q : esc(task).replace('{q}', q)}</div>
      <div class="tu-ex-row"><input type="text" class="tu-ex-in" spellcheck="false" autocomplete="off" aria-label="${esc(E('check'))}"><button type="button" class="tu-ex-go">${esc(E('check'))}</button></div>
      <div class="tu-ex-help">${esc(ex.k === 'anti' ? E('helpA') : E('helpV'))}</div><div class="tu-ex-msg" aria-live="polite"></div>
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
  function open(tp, sec, it, from) {
    if (!el) build();
    el.hidden = false; document.body.classList.add('tu-open');
    el.style.setProperty('--c', tp.color); el.style.setProperty('--cbg', tp.bg);
    $('.tu-ico', el).textContent = tp.icon;
    $('.tu-ttl small', el).textContent = pick(tp.name) + ' · ' + pick(sec.t);
    $('.tu-ttl b', el).textContent = it.tbl ? pick(sec.t) : pick(it[0] || sec.t);
    $('.tu-text', el).textContent = T('loading'); $('.tu-st', el).textContent = ''; $('.tu-extra', el).innerHTML = ''; $('.tu-dots', el).innerHTML = ''; $('.tu-count', el).textContent = '';
    $('.tu-hint', el).textContent = T('draw');
    const pr = $('.tu-practice', el); pr.hidden = !tp.cat; if (tp.cat) { pr.href = 'index.html?cat=' + tp.cat; pr.textContent = T('practice'); }
    const tex = from && from.dataset ? from.dataset.tex : '';
    Promise.all([ready(), topicTutorials(tp.id)]).then(([, hand]) => {
      if (!board) { board = new window.SmartBoard($('.tu-board', el), { panAxes: true, onStatus: m => { $('.tu-status', el).textContent = m || ''; } }); board.showKeyPoints = false; }
      board.resize();
      const key = en(sec.t) + '/' + (it.tbl ? '' : en(it[0]));
      const steps = hand[key] || autoTutorial(tp, sec, it);
      cur = { steps, tex, from };
      requestAnimationFrame(() => { board.resize(); go(0); });
      $('.tu-next', el).focus();
    });
  }

  window.Tutor = { open, autoTutorial };
})();
