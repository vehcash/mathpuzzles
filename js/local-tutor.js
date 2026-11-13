/* Local AI tutor — a small language model running in the browser (WebGPU, via WebLLM in lib/web-llm/) teaches on the
   smart blackboard live: it streams one board command per line and every finished line is drawn at once.
   Nothing is sent to a server: the model is downloaded once (from Hugging Face, its WebGPU code from GitHub), cached by
   the browser, and then runs offline on the student's own graphics card.

   Board language the model writes (one per line; maths in calculator syntax where the board computes it):
     STEP: what the teacher says (shown in the panel, $…$ for maths)   TEX: a LaTeX formula on the board
     TEXT: a few words on the board                                    SOLVE: x^2 - 5x + 6 = 0  (the board solves it)
     EQ: an equation the board typesets                                PLOT: y = x^2 - 3
     POINT: 2, 0, label                                                ANSWER: the final result (LaTeX, highlighted)
     CLEAR
   It knows the puzzle on screen (statement, options, and — once the student has answered or asked for the solution — the
   official solution, so a small model explains instead of guessing) and the equations the student typed on the board. */
(function (global) {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const tr = (s, v) => (global.tr ? global.tr(s, v) : (v ? s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? v[k] : m)) : s));
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const K = t => { try { return katex.renderToString(t, { throwOnError: false }); } catch (e) { return esc(t); } };
  const mathHtml = t => esc(t).replace(/\$([^$]+)\$/g, (_, m) => K(m.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')));
  const sleep = ms => new Promise(ok => setTimeout(ok, ms));
  const WEBLLM_V = '0.2.88';
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { if (!global.Consent || !Consent.allowed || Consent.allowed('prefs')) localStorage.setItem(k, v); } catch (e) { /* */ } } };

  // Qwen3.5 small models: strong in English, French, Spanish, Japanese and Chinese. vram = WebLLM's estimate (GB).
  const MODELS = [
    { id: 'Qwen3.5-2B', vram: 2.3, note: 'Recommended — most laptops' },
    { id: 'Qwen3.5-4B', vram: 3.9, note: 'Better maths — needs a good graphics card' },
    { id: 'Qwen3.5-9B', vram: 6.5, note: 'Best — gaming PC or Apple M Pro / Max' },
    { id: 'Qwen3.5-0.8B', vram: 1.7, note: 'Fastest — weakest maths' }
  ];
  const LANG_NAME = { en: 'English', fr: 'French (français)', es: 'Spanish (español)', ja: 'Japanese (日本語)', zh: 'Simplified Chinese (简体中文)' };

  // ---------- interface texts (English keys, like js/lang/*.js) ----------
  I18N.add('fr', {
    "downloaded": "téléchargé", "Saved in this browser — starts without downloading.": "Enregistré dans ce navigateur — démarre sans téléchargement.", "Start (already downloaded)": "Démarrer (déjà téléchargé)", "Download and start": "Télécharger et démarrer", "Delete this model from the browser": "Supprimer ce modèle du navigateur", "Switch off / change model": "Désactiver / changer de modèle", "{n} model(s) saved in this browser · {used} GB used": "{n} modèle(s) enregistré(s) dans ce navigateur · {used} Go utilisés", "Delete {name} from this browser? It will have to be downloaded again to use it.": "Supprimer {name} de ce navigateur ? Il faudra le télécharger à nouveau pour l’utiliser.",
    'Local AI tutor': 'Tuteur IA local', 'AI tutor': 'Tuteur IA',
    'Local AI tutor — explains on this board, runs in your browser': 'Tuteur IA local — explique sur ce tableau, fonctionne dans votre navigateur',
    'A small AI model runs on your own graphics card (WebGPU) and teaches live on this blackboard, in your language. Nothing you type leaves your computer.': 'Un petit modèle d’IA tourne sur votre propre carte graphique (WebGPU) et explique en direct sur ce tableau, dans votre langue. Rien de ce que vous tapez ne quitte votre ordinateur.',
    'Model': 'Modèle', 'Recommended — most laptops': 'Recommandé — la plupart des portables', 'Better maths — needs a good graphics card': 'Meilleur en maths — demande une bonne carte graphique',
    'Best — gaming PC or Apple M Pro / Max': 'Le meilleur — PC de jeu ou Apple M Pro / Max', 'Fastest — weakest maths': 'Le plus rapide — le plus faible en maths',
    'needs ~{gb} GB of GPU memory': 'demande ~{gb} Go de mémoire graphique',
    'Think before answering (slower, more careful)': 'Réfléchir avant de répondre (plus lent, plus soigné)',
    'Start each answer on a clean board (Ctrl+Z brings your work back)': 'Chaque réponse sur un tableau propre (Ctrl+Z rend votre travail)',
    'Switch on': 'Activer', 'Stop': 'Arrêter', '■ Stop': '■ Arrêter', 'Stopped.': 'Arrêté.', 'The model started repeating itself, so I stopped it. Ask again, or tick “Think before answering”.': 'Le modèle a commencé à se répéter, je l’ai arrêté. Reposez la question ou cochez « Réfléchir avant de répondre ».', 'Stopped — a new puzzle was opened.': 'Arrêté — un nouveau problème a été ouvert.', 'New puzzle: {title}': 'Nouveau problème : {title}', 'Send': 'Envoyer', 'Switch off': 'Désactiver',
    'The first time, the model is downloaded once from Hugging Face (huggingface.co) and its WebGPU code from GitHub; the browser keeps it, so next time it starts offline.': 'La première fois, le modèle est téléchargé une seule fois depuis Hugging Face (huggingface.co) et son code WebGPU depuis GitHub ; le navigateur le garde, la fois suivante il démarre hors ligne.',
    'Your browser has no WebGPU, so the local AI cannot run here. Try a recent Chrome or Edge on a computer, or use “Ask an AI” under the puzzle.': 'Votre navigateur n’a pas WebGPU : l’IA locale ne peut pas tourner ici. Essayez un Chrome ou un Edge récent sur ordinateur, ou « Demander à une IA » sous le problème.',
    'Loading the model…': 'Chargement du modèle…', 'Ready. Ask anything, or pick a button.': 'Prêt. Posez une question ou choisissez un bouton.',
    'Thinking…': 'Réflexion…', 'Writing on the board…': 'J’écris au tableau…',
    'Give me a hint': 'Un indice', 'Explain the solution': 'Expliquer la solution', 'Another way to solve it': 'Une autre méthode', 'Explain what is on my board': 'Expliquer mon tableau',
    'Ask a question about this puzzle or any maths…': 'Posez une question sur ce problème ou sur n’importe quel sujet de maths…',
    'The model could not start: {msg}': 'Le modèle n’a pas pu démarrer : {msg}', 'Small models make mistakes — check each step.': 'Les petits modèles se trompent parfois — vérifiez chaque étape.',
    '🖥️ Explain it on the blackboard with the local AI — free, private, in your browser': '🖥️ L’expliquer au tableau avec l’IA locale — gratuit, privé, dans votre navigateur',
    'You': 'Vous'
  });
  I18N.add('es', {
    "downloaded": "descargado", "Saved in this browser — starts without downloading.": "Guardado en este navegador — arranca sin descargar.", "Start (already downloaded)": "Iniciar (ya descargado)", "Download and start": "Descargar e iniciar", "Delete this model from the browser": "Borrar este modelo del navegador", "Switch off / change model": "Desactivar / cambiar de modelo", "{n} model(s) saved in this browser · {used} GB used": "{n} modelo(s) guardado(s) en este navegador · {used} GB usados", "Delete {name} from this browser? It will have to be downloaded again to use it.": "¿Borrar {name} de este navegador? Habrá que descargarlo de nuevo para usarlo.",
    'Local AI tutor': 'Tutor de IA local', 'AI tutor': 'Tutor IA',
    'Local AI tutor — explains on this board, runs in your browser': 'Tutor de IA local — explica en esta pizarra y funciona en tu navegador',
    'A small AI model runs on your own graphics card (WebGPU) and teaches live on this blackboard, in your language. Nothing you type leaves your computer.': 'Un pequeño modelo de IA funciona en tu propia tarjeta gráfica (WebGPU) y explica en directo en esta pizarra, en tu idioma. Nada de lo que escribes sale de tu ordenador.',
    'Model': 'Modelo', 'Recommended — most laptops': 'Recomendado — la mayoría de portátiles', 'Better maths — needs a good graphics card': 'Mejor en matemáticas — necesita una buena tarjeta gráfica',
    'Best — gaming PC or Apple M Pro / Max': 'El mejor — PC gaming o Apple M Pro / Max', 'Fastest — weakest maths': 'El más rápido — el más flojo en matemáticas',
    'needs ~{gb} GB of GPU memory': 'necesita ~{gb} GB de memoria gráfica',
    'Think before answering (slower, more careful)': 'Pensar antes de responder (más lento, más cuidadoso)',
    'Start each answer on a clean board (Ctrl+Z brings your work back)': 'Cada respuesta en una pizarra limpia (Ctrl+Z recupera tu trabajo)',
    'Switch on': 'Activar', 'Stop': 'Parar', '■ Stop': '■ Parar', 'Stopped.': 'Detenido.', 'The model started repeating itself, so I stopped it. Ask again, or tick “Think before answering”.': 'El modelo empezó a repetirse, así que lo detuve. Pregunta de nuevo o marca «Pensar antes de responder».', 'Stopped — a new puzzle was opened.': 'Detenido — se abrió un problema nuevo.', 'New puzzle: {title}': 'Problema nuevo: {title}', 'Send': 'Enviar', 'Switch off': 'Desactivar',
    'The first time, the model is downloaded once from Hugging Face (huggingface.co) and its WebGPU code from GitHub; the browser keeps it, so next time it starts offline.': 'La primera vez, el modelo se descarga una sola vez de Hugging Face (huggingface.co) y su código WebGPU de GitHub; el navegador lo guarda y la próxima vez arranca sin conexión.',
    'Your browser has no WebGPU, so the local AI cannot run here. Try a recent Chrome or Edge on a computer, or use “Ask an AI” under the puzzle.': 'Tu navegador no tiene WebGPU, así que la IA local no puede funcionar aquí. Prueba un Chrome o Edge reciente en un ordenador, o usa «Pregunta a una IA» bajo el problema.',
    'Loading the model…': 'Cargando el modelo…', 'Ready. Ask anything, or pick a button.': 'Listo. Pregunta lo que quieras o elige un botón.',
    'Thinking…': 'Pensando…', 'Writing on the board…': 'Escribiendo en la pizarra…',
    'Give me a hint': 'Dame una pista', 'Explain the solution': 'Explica la solución', 'Another way to solve it': 'Otra forma de resolverlo', 'Explain what is on my board': 'Explica mi pizarra',
    'Ask a question about this puzzle or any maths…': 'Pregunta sobre este problema o sobre cualquier tema de matemáticas…',
    'The model could not start: {msg}': 'El modelo no pudo arrancar: {msg}', 'Small models make mistakes — check each step.': 'Los modelos pequeños se equivocan — comprueba cada paso.',
    '🖥️ Explain it on the blackboard with the local AI — free, private, in your browser': '🖥️ Explícalo en la pizarra con la IA local — gratis, privado, en tu navegador',
    'You': 'Tú'
  });
  I18N.add('ja', {
    "downloaded": "ダウンロード済み", "Saved in this browser — starts without downloading.": "このブラウザーに保存済み — ダウンロードなしで起動します。", "Start (already downloaded)": "起動（ダウンロード済み）", "Download and start": "ダウンロードして起動", "Delete this model from the browser": "このモデルをブラウザーから削除", "Switch off / change model": "オフにする／モデルを変更", "{n} model(s) saved in this browser · {used} GB used": "このブラウザーに {n} 個のモデルを保存 · {used} GB 使用中", "Delete {name} from this browser? It will have to be downloaded again to use it.": "{name} をこのブラウザーから削除しますか？使うには再度ダウンロードが必要です。",
    'Local AI tutor': 'ローカル AI 先生', 'AI tutor': 'AI 先生',
    'Local AI tutor — explains on this board, runs in your browser': 'ローカル AI 先生 — この黒板で説明し、ブラウザー内で動きます',
    'A small AI model runs on your own graphics card (WebGPU) and teaches live on this blackboard, in your language. Nothing you type leaves your computer.': '小さな AI モデルがあなたのグラフィックカード（WebGPU）で動き、この黒板にリアルタイムで、あなたの言語で説明します。入力した内容はコンピューターの外へ送られません。',
    'Model': 'モデル', 'Recommended — most laptops': 'おすすめ — ほとんどのノート PC', 'Better maths — needs a good graphics card': '数学がより得意 — 高性能なグラフィックカードが必要',
    'Best — gaming PC or Apple M Pro / Max': '最高 — ゲーミング PC または Apple M Pro / Max', 'Fastest — weakest maths': '最速 — 数学は最も苦手',
    'needs ~{gb} GB of GPU memory': 'GPU メモリ約 {gb} GB が必要',
    'Think before answering (slower, more careful)': '答える前に考える（遅いがより丁寧）',
    'Start each answer on a clean board (Ctrl+Z brings your work back)': '毎回きれいな黒板で答える（Ctrl+Z で元に戻せます）',
    'Switch on': 'オンにする', 'Stop': '止める', '■ Stop': '■ 止める', 'Stopped.': '停止しました。', 'The model started repeating itself, so I stopped it. Ask again, or tick “Think before answering”.': 'モデルが同じ内容を繰り返し始めたので止めました。もう一度質問するか、「答える前に考える」をオンにしてください。', 'Stopped — a new puzzle was opened.': '停止しました — 新しい問題が開かれました。', 'New puzzle: {title}': '新しい問題：{title}', 'Send': '送信', 'Switch off': 'オフにする',
    'The first time, the model is downloaded once from Hugging Face (huggingface.co) and its WebGPU code from GitHub; the browser keeps it, so next time it starts offline.': '初回のみモデルを Hugging Face（huggingface.co）から、WebGPU コードを GitHub からダウンロードします。ブラウザーに保存されるので、次回からはオフラインで起動します。',
    'Your browser has no WebGPU, so the local AI cannot run here. Try a recent Chrome or Edge on a computer, or use “Ask an AI” under the puzzle.': 'このブラウザーは WebGPU に対応していないため、ローカル AI は動きません。パソコンの最新の Chrome か Edge を使うか、問題の下の「AI にたずねる」をお使いください。',
    'Loading the model…': 'モデルを読み込み中…', 'Ready. Ask anything, or pick a button.': '準備完了。質問するかボタンを選んでください。',
    'Thinking…': '考え中…', 'Writing on the board…': '黒板に書いています…',
    'Give me a hint': 'ヒントがほしい', 'Explain the solution': '解き方を説明して', 'Another way to solve it': '別の解き方', 'Explain what is on my board': '私の黒板を説明して',
    'Ask a question about this puzzle or any maths…': 'この問題や数学について質問してください…',
    'The model could not start: {msg}': 'モデルを起動できませんでした：{msg}', 'Small models make mistakes — check each step.': '小さなモデルは間違えることがあります。各ステップを確認しましょう。',
    '🖥️ Explain it on the blackboard with the local AI — free, private, in your browser': '🖥️ ローカル AI で黒板に説明させる — 無料・プライベート・ブラウザー内',
    'You': 'あなた'
  });
  I18N.add('zh', {
    "downloaded": "已下载", "Saved in this browser — starts without downloading.": "已保存在此浏览器中——无需下载即可启动。", "Start (already downloaded)": "启动（已下载）", "Download and start": "下载并启动", "Delete this model from the browser": "从浏览器中删除此模型", "Switch off / change model": "关闭 / 更换模型", "{n} model(s) saved in this browser · {used} GB used": "此浏览器已保存 {n} 个模型 · 已用 {used} GB", "Delete {name} from this browser? It will have to be downloaded again to use it.": "要从此浏览器中删除 {name} 吗？再次使用需要重新下载。",
    'Local AI tutor': '本地 AI 老师', 'AI tutor': 'AI 老师',
    'Local AI tutor — explains on this board, runs in your browser': '本地 AI 老师——在这块黑板上讲解，在你的浏览器中运行',
    'A small AI model runs on your own graphics card (WebGPU) and teaches live on this blackboard, in your language. Nothing you type leaves your computer.': '一个小型 AI 模型在你自己的显卡（WebGPU）上运行，用你的语言在这块黑板上实时讲解。你输入的内容不会离开你的电脑。',
    'Model': '模型', 'Recommended — most laptops': '推荐——大多数笔记本', 'Better maths — needs a good graphics card': '数学更强——需要较好的显卡',
    'Best — gaming PC or Apple M Pro / Max': '最强——游戏电脑或 Apple M Pro / Max', 'Fastest — weakest maths': '最快——数学最弱',
    'needs ~{gb} GB of GPU memory': '需要约 {gb} GB 显存',
    'Think before answering (slower, more careful)': '先思考再回答（更慢，更仔细）',
    'Start each answer on a clean board (Ctrl+Z brings your work back)': '每次回答都用干净的黑板（Ctrl+Z 可恢复你的内容）',
    'Switch on': '启用', 'Stop': '停止', '■ Stop': '■ 停止', 'Stopped.': '已停止。', 'The model started repeating itself, so I stopped it. Ask again, or tick “Think before answering”.': '模型开始重复，已为你停止。请重新提问，或勾选“先思考再回答”。', 'Stopped — a new puzzle was opened.': '已停止——打开了新题目。', 'New puzzle: {title}': '新题目：{title}', 'Send': '发送', 'Switch off': '关闭',
    'The first time, the model is downloaded once from Hugging Face (huggingface.co) and its WebGPU code from GitHub; the browser keeps it, so next time it starts offline.': '第一次使用时，会从 Hugging Face（huggingface.co）下载模型、从 GitHub 下载其 WebGPU 代码，仅一次；浏览器会保存它，下次可离线启动。',
    'Your browser has no WebGPU, so the local AI cannot run here. Try a recent Chrome or Edge on a computer, or use “Ask an AI” under the puzzle.': '你的浏览器不支持 WebGPU，本地 AI 无法在此运行。请在电脑上使用新版 Chrome 或 Edge，或使用题目下方的“问问 AI”。',
    'Loading the model…': '正在加载模型…', 'Ready. Ask anything, or pick a button.': '准备好了。随便提问，或选择一个按钮。',
    'Thinking…': '思考中…', 'Writing on the board…': '正在黑板上书写…',
    'Give me a hint': '给我一个提示', 'Explain the solution': '讲解解法', 'Another way to solve it': '另一种解法', 'Explain what is on my board': '讲解我黑板上的内容',
    'Ask a question about this puzzle or any maths…': '就这道题或任何数学问题提问…',
    'The model could not start: {msg}': '模型无法启动：{msg}', 'Small models make mistakes — check each step.': '小模型会出错——请检查每一步。',
    '🖥️ Explain it on the blackboard with the local AI — free, private, in your browser': '🖥️ 用本地 AI 在黑板上讲解——免费、私密、在浏览器中运行',
    'You': '你'
  });

  // ---------- the prompt ----------
  const EXAMPLE_STEPS = {
    en: ['Let’s see where the parabola crosses the x-axis.', 'It crosses at $x = 2$ and $x = 3$.', 'roots'],
    fr: ['Cherchons où la parabole coupe l’axe des x.', 'Elle le coupe en $x = 2$ et $x = 3$.', 'racines'],
    es: ['Veamos dónde corta la parábola al eje x.', 'Lo corta en $x = 2$ y $x = 3$.', 'raíces'],
    ja: ['放物線が x 軸と交わる点を調べましょう。', '$x = 2$ と $x = 3$ で交わります。', '解'],
    zh: ['看看抛物线与 x 轴交于哪里。', '它交于 $x = 2$ 和 $x = 3$。', '根']
  };
  function systemPrompt(lang) {
    const ex = EXAMPLE_STEPS[lang] || EXAMPLE_STEPS.en;
    return [
      'You are a patient, clear maths teacher. You explain to one student on a blackboard, live. You control the board by writing ONE command per line, nothing else.',
      'Commands:',
      'STEP: one or two short sentences you say to the student (maths inside $...$)',
      'TEX: one LaTeX formula to write on the board (no $ signs)',
      'TEXT: a few words to write on the board',
      'SOLVE: an equation in calculator syntax; the board solves it and shows the solution',
      'EQ: an equation in calculator syntax to write on the board',
      'PLOT: y = a function in calculator syntax; the board draws the graph',
      'POINT: x, y, label   (a point on the graph)',
      'ANSWER: the final result in LaTeX',
      'Calculator syntax: ^ for powers, sqrt(x), abs(x), sin(x), ln(x), e^x, pi, implicit products like 2x or 3sin(x).',
      'Rules: start each idea with STEP, then one to three board lines. Keep board lines short. One idea per STEP. Use PLOT when a graph helps. Check your arithmetic. End with ANSWER.',
      'Never repeat a line. Do not think aloud (no "Wait", no "Let me re-check"): work it out first, then write only the final, correct explanation.',
      'Write every STEP and TEXT in ' + LANG_NAME[lang] + '. No markdown, no lists, no headings, no text outside commands.',
      'Example:',
      'STEP: ' + ex[0],
      'PLOT: y = x^2 - 5x + 6',
      'SOLVE: x^2 - 5x + 6 = 0',
      'STEP: ' + ex[1],
      'POINT: 2, 0, x = 2',
      'POINT: 3, 0, x = 3',
      'TEXT: ' + ex[2],
      'ANSWER: x = 2 \\text{ or } x = 3'
    ].join('\n');
  }
  const LET = 'ABCDEFGH';
  const plain = t => String(t || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  function puzzleContext(mode) {
    const app = global.__app; const st = app && app.state, p = st && st.puzzle; if (!p) return { text: '', known: false };
    const known = !!(st.confirmed || st.answered || ($('#result') && !$('#result').hidden));
    const lines = ['PUZZLE: ' + plain(p.statement)];
    if (p.figureText) lines.push('FIGURE: ' + plain(p.figureText));
    lines.push('OPTIONS (zero, one or two of them are true):');
    st.options.forEach((o, i) => lines.push(LET[i] + ') ' + plain(o.tex)));
    const reveal = known || mode === 'explain' || mode === 'another';
    if (reveal) {
      const ok = st.options.map((o, i) => (o.correct ? LET[i] : '')).filter(Boolean);
      lines.push('TRUE OPTIONS: ' + (ok.length ? ok.join(', ') : 'none'));
      let sol = (p.steps || []).map((s, i) => (i + 1) + '. ' + plain(s.title) + (s.note ? ': ' + plain(s.note) : '') + (s.lines && s.lines.length ? ' [' + s.lines.slice(0, 4).join(' ; ') + ']' : '')).join('\n');
      if (sol.length > 1800) sol = sol.slice(0, 1800) + ' …';
      if (sol) lines.push('OFFICIAL SOLUTION (correct; base your explanation on it, in your own words):\n' + sol);
      if (st.selected && st.selected.size && known) lines.push('THE STUDENT CHOSE: ' + [...st.selected].sort().map(i => LET[i]).join(', '));
    } else lines.push('The student has NOT answered yet. Do not say which options are true and do not finish the calculation: guide with hints only.');
    return { text: lines.join('\n'), known };
  }
  function boardContext(board) {
    try {
      const l = (board.mathLines ? board.mathLines() : []).map(m => m.ascii).filter(Boolean).slice(-10);
      return l.length ? 'ON THE STUDENT’S BOARD (typed lines):\n' + l.join('\n') : '';
    } catch (e) { return ''; }
  }
  const ASK = {
    hint: 'Give me one helpful hint for this puzzle, on the board. Do not reveal the answer.',
    explain: 'Explain the solution of this puzzle step by step on the board, then say which options are true.',
    another: 'Solve this puzzle another way than the official solution, step by step on the board.',
    board: 'Explain what I have written on my board and whether it is right.'
  };

  // ---------- the board writer: commands → smart board, with automatic layout ----------
  function Writer(board) {
    const COL = global.BOARD_COLORS || {};
    const L = { x: 0.04, y: 0.1, col: 0, ax: null, page: 0 };
    let started = false;
    const textToTex = t => String(t).split('$').map((part, i) => (i % 2 ? part : (part ? '\\text{' + part.replace(/[\\{}#%&_^~]/g, ' ') + '}' : ''))).join('');
    function fresh() { L.x = 0.04; L.y = 0.1; L.col = 0; L.ax = null; }
    function wipe() { board.pushHistory(); board.dismissMenu && board.dismissMenu(false, true); board.objects = []; board.geo.clear(); board.render(); board.geoChanged && board.geoChanged(); fresh(); }
    function room(h) {
      const right = L.ax ? 0.47 : 0.95;
      if (L.y + h > 0.95) {
        if (L.col === 0 && !L.ax) { L.col = 1; L.x = 0.52; L.y = 0.1; }
        else wipe();
      }
      const at = { x: L.x, y: L.y + h / 2 }; L.y += h; return at;
    }
    function axesFor(expr) {
      let f = null; try { f = board.compile(expr); } catch (e) { /* */ }
      let xw = [-5, 5], ys = [];
      if (f) for (let i = 0; i <= 200; i++) { const x = xw[0] + (xw[1] - xw[0]) * i / 200, y = f(x); if (isFinite(y)) ys.push(y); }
      ys.sort((a, b) => a - b);
      let lo = ys.length ? ys[Math.floor(ys.length * 0.08)] : -4, hi = ys.length ? ys[Math.floor(ys.length * 0.92)] : 4;
      lo = Math.min(lo, 0); hi = Math.max(hi, 0); if (hi - lo < 2) { lo -= 1; hi += 1; }
      const pad = (hi - lo) * 0.12;
      if (L.col === 1) wipe();
      L.ax = board.sWindow([0.52, 0.08, 0.97, 0.92], xw, [lo - pad, hi + pad]);
      return L.ax;
    }
    const color = c => COL[c] || c;
    return {
      begin(clean) { started = true; if (clean && !board.isEmpty()) wipe(); else if (clean) fresh(); else { fresh(); L.y = 0.1; } },
      run(cmd, arg) {
        switch (cmd) {
          case 'TEX': { const p = room(0.1); board.sWrite(arg, { x: p.x, y: p.y, s: 26 }); return; }
          case 'TEXT': { const p = room(0.075); board.sWrite(textToTex(arg), { x: p.x, y: p.y, s: 20, c: color('blue') }); return; }
          case 'ANSWER': {
            const p = room(0.13), m = board.sWrite(arg, { x: p.x + 0.01, y: p.y, s: 30, c: color('yellow') });
            setTimeout(() => {   // a chalk box around the answer
              try {
                const el = board.mathEls && board.mathEls.get(m.id), cr = board.root.getBoundingClientRect(); if (!el) return;
                const r = (el.firstChild || el).getBoundingClientRect(), x0 = r.left - cr.left - 10, y0 = r.top - cr.top - 8, x1 = r.right - cr.left + 10, y1 = r.bottom - cr.top + 8;
                board.objects.push({ type: 'poly', id: 9e8 + Math.random() * 1e6 | 0, pts: [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }], closed: true, color: color('yellow'), w: 2.2, anim: { start: performance.now(), dur: 600 } });
                board.requestFrame();
              } catch (e) { /* */ }
            }, 650);
            return;
          }
          case 'EQ': case 'SOLVE': {
            const solve = cmd === 'SOLVE', p = room(solve ? 0.17 : 0.1);
            const m = board.sWrite('', { x: p.x, y: p.y, s: 28 }); delete m.fixed; delete m.tex;
            m.ascii = arg;
            try { const info = MathCore.analyze(m.ascii); if (solve && info.kind === 'value' && !/=\s*$/.test(m.ascii)) m.ascii += '='; }
            catch (e) { m.tex = arg.replace(/\*/g, '\\cdot '); m.fixed = true; m.ascii = ''; }   // not calculator syntax: show it as written
            m.solved = solve; board.requestFrame(); return;
          }
          case 'PLOT': {
            let eq = arg.replace(/^f\s*\(x\)\s*=/i, 'y ='); if (!/=/.test(eq)) eq = 'y = ' + eq;
            const rhs = eq.split('=').slice(1).join('=');
            const ax = L.ax || axesFor(rhs);
            try { board.sPlot(ax, eq, {}); } catch (e) { /* unreadable function: skip */ }
            return;
          }
          case 'POINT': {
            if (!L.ax) return;
            const m = arg.match(/^\s*\(?\s*(-?[\d.]+(?:\/[\d.]+)?)\s*,\s*(-?[\d.]+(?:\/[\d.]+)?)\s*\)?\s*,?\s*(.*)$/); if (!m) return;
            const num = s => s.includes('/') ? s.split('/').reduce((a, b) => +a / +b) : +s;
            const lab = m[3].replace(/[$\\{}]/g, '').replace(/_(\d+)/g, (q, d) => [...d].map(x => '₀₁₂₃₄₅₆₇₈₉'[+x]).join('')).trim();
            board.sPoint(L.ax, num(m[1]), num(m[2]), lab, { c: color('pink') }); return;
          }
          case 'CLEAR': wipe(); return;
        }
      },
      get started() { return started; }
    };
  }

  // ---------- one line of model output → a command ----------
  const ALIAS = { STEP: 'STEP', SAY: 'STEP', CAPTION: 'STEP', TEX: 'TEX', LATEX: 'TEX', FORMULA: 'TEX', WRITE: 'TEX', MATH: 'TEX', TEXT: 'TEXT', NOTE: 'TEXT', SOLVE: 'SOLVE', EQ: 'EQ', EQUATION: 'EQ', PLOT: 'PLOT', GRAPH: 'PLOT', POINT: 'POINT', ANSWER: 'ANSWER', RESULT: 'ANSWER', CLEAR: 'CLEAR' };
  function parseLine(line) {
    let s = line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '').replace(/\*\*/g, '').replace(/^`+|`+$/g, '').trim();
    if (!s) return null;
    const m = s.match(/^([A-Za-z]+)\s*[:：]\s*(.*)$/);
    if (m && ALIAS[m[1].toUpperCase()]) {
      let arg = m[2].trim(); const cmd = ALIAS[m[1].toUpperCase()];
      if (['TEX', 'ANSWER'].includes(cmd)) arg = arg.replace(/^\$+|\$+$/g, '').replace(/^\\\[|\\\]$/g, '').trim();
      if (['SOLVE', 'EQ', 'PLOT'].includes(cmd)) arg = arg.replace(/\$/g, '').replace(/\\cdot/g, '*').replace(/\\left|\\right/g, '').trim();
      return { cmd, arg };
    }
    if (/^CLEAR$/i.test(s)) return { cmd: 'CLEAR', arg: '' };
    return { cmd: 'STEP', arg: s };   // free prose: the teacher says it
  }

  // ---------- the panel ----------
  function Tutor(board) {
    const root = board.root;
    const el = document.createElement('section'); el.id = 'ait-panel'; el.className = 'float-panel ait-panel'; el.hidden = true;
    el.innerHTML = `<header><b><svg viewBox="0 0 24 24" aria-hidden="true" class="ait-ic"><path d="M12 3v2M12 19v2M5 12H3M21 12h-2"/><rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/><path d="M10 10.5h.01M14 10.5h.01M9.8 14c1.3 1 3.1 1 4.4 0"/></svg> Local AI tutor</b><button class="ait-x" title="Close">×</button></header>
      <div class="ait-setup">
        <p class="ait-intro">A small AI model runs on your own graphics card (WebGPU) and teaches live on this blackboard, in your language. Nothing you type leaves your computer.</p>
        <label class="ait-row"><span>Model</span><select class="ait-model" data-no-i18n></select></label>
        <p class="ait-note ait-mnote"></p>
        <label class="ait-chk"><input type="checkbox" class="ait-think"> <span>Think before answering (slower, more careful)</span></label>
        <p class="ait-cache" data-no-i18n></p>
        <button class="act solve ait-on">Switch on</button>
        <button class="link ait-del" hidden>Delete this model from the browser</button>
        <p class="ait-note">The first time, the model is downloaded once from Hugging Face (huggingface.co) and its WebGPU code from GitHub; the browser keeps it, so next time it starts offline.</p>
        <p class="ait-err" hidden></p>
      </div>
      <div class="ait-load" hidden><div class="ait-bar"><i></i></div><p class="ait-ltext">Loading the model…</p></div>
      <div class="ait-chat" hidden>
        <div class="ait-log" data-no-i18n aria-live="polite"></div>
        <div class="ait-quick"><button data-mode="hint">Give me a hint</button><button data-mode="explain">Explain the solution</button><button data-mode="another">Another way to solve it</button><button data-mode="board">Explain what is on my board</button></div>
        <div class="ait-ask"><textarea rows="2" placeholder="Ask a question about this puzzle or any maths…"></textarea><button class="act solve ait-send">Send</button><button class="act ait-stop" hidden>■ Stop</button></div>
        <div class="ait-foot"><span class="ait-status"></span><label class="ait-chk small"><input type="checkbox" class="ait-clean" checked> <span>Start each answer on a clean board (Ctrl+Z brings your work back)</span></label>
          <span class="ait-warn">Small models make mistakes — check each step.</span><button class="link ait-off">Switch off / change model</button></div>
      </div>`;
    root.appendChild(el);
    if (global.I18N && I18N.translate) I18N.translate(el);
    if (global.BoardMatrix && BoardMatrix.draggable) BoardMatrix.draggable(el);
    el.addEventListener('pointerdown', e => e.stopPropagation());
    el.addEventListener('keydown', e => e.stopPropagation());

    const sel = $('.ait-model', el), think = $('.ait-think', el), log = $('.ait-log', el), ta = $('textarea', el), status = $('.ait-status', el);
    const setupBox = $('.ait-setup', el), loadBox = $('.ait-load', el), chatBox = $('.ait-chat', el), err = $('.ait-err', el);
    let f16 = true, engine = null, busy = false, stopFlag = false, history = [];
    // ---------- downloaded models: kept in the browser's Cache Storage, reused without downloading again ----------
    let lib = null, cached = {};
    const loadLib = () => lib || (lib = import(new URL('lib/web-llm/web-llm.js?v=' + WEBLLM_V, document.baseURI).href));
    const fullId = base => base + (f16 ? '-q4f16_1-MLC' : '-q4f32_1-MLC');
    const gb = b => (b / 1e9).toFixed(b > 1e10 ? 0 : 1);
    const fillModels = () => {
      const cur = sel.value || store.get('cp_ai_model') || MODELS[0].id;
      sel.innerHTML = MODELS.map(m => `<option value="${m.id}">${cached[m.id] ? '✓ ' : '⬇ '}${m.id.replace('-', ' ')} — ${esc(cached[m.id] ? tr('downloaded') : tr(m.note))}</option>`).join(''); sel.value = cur;
      const m = MODELS.find(x => x.id === sel.value) || MODELS[0], have = !!cached[m.id];
      $('.ait-mnote', el).textContent = (have ? tr('Saved in this browser — starts without downloading.') + ' ' : tr(m.note) + ' · ') + tr('needs ~{gb} GB of GPU memory', { gb: m.vram });
      $('.ait-on', el).textContent = have ? tr('Start (already downloaded)') : tr('Download and start');
      $('.ait-del', el).hidden = !have;
    };
    async function refreshCache(pickBest) {
      try {
        await gpu(); const w = await loadLib();
        const res = await Promise.all(MODELS.map(m => w.hasModelInCache(fullId(m.id)).catch(() => false)));
        cached = {}; MODELS.forEach((m, i) => { cached[m.id] = !!res[i]; });
        // already downloaded: use it (the one used last, else the first downloaded one)
        if (pickBest) { const last = store.get('cp_ai_model'); const pick = cached[last] ? last : (MODELS.find(m => cached[m.id]) || {}).id; if (pick) sel.value = pick; }
        fillModels();
        if (navigator.storage && navigator.storage.estimate) {
          const e = await navigator.storage.estimate(), n = MODELS.filter(m => cached[m.id]).length;
          $('.ait-cache', el).textContent = n ? tr('{n} model(s) saved in this browser · {used} GB used', { n, used: gb(e.usage || 0) }) : '';
        }
      } catch (e) { fillModels(); }
      return cached;
    }
    $('.ait-del', el).onclick = async () => {
      const m = sel.value; if (!confirm(tr('Delete {name} from this browser? It will have to be downloaded again to use it.', { name: m.replace('-', ' ') }))) return;
      try { const w = await loadLib(); await w.deleteModelAllInfoInCache(fullId(m)); } catch (e) { /* */ }
      refreshCache();
    };
    fillModels(); sel.onchange = () => { store.set('cp_ai_model', sel.value); fillModels(); };
    think.checked = store.get('cp_ai_think') === '1'; think.onchange = () => store.set('cp_ai_think', think.checked ? '1' : '0');
    I18N.onChange(fillModels);

    const show = which => { setupBox.hidden = which !== 'setup'; loadBox.hidden = which !== 'load'; chatBox.hidden = which !== 'chat'; };
    function say(who, html, cls) { const d = document.createElement('div'); d.className = 'ait-msg ' + (cls || ''); d.innerHTML = (who ? '<b>' + esc(who) + '</b> ' : '') + html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }

    async function gpu() {
      if (!navigator.gpu) return false;
      try { const a = await navigator.gpu.requestAdapter(); if (!a) return false; f16 = a.features.has('shader-f16'); return true; } catch (e) { return false; }
    }
    async function start() {
      err.hidden = true;
      if (!(await gpu())) { err.textContent = tr('Your browser has no WebGPU, so the local AI cannot run here. Try a recent Chrome or Edge on a computer, or use “Ask an AI” under the puzzle.'); err.hidden = false; return; }
      show('load');
      const id = fullId(sel.value);
      const bar = $('.ait-bar i', el), lt = $('.ait-ltext', el);
      try {
        const webllm = await loadLib();
        // ask the browser to keep the downloaded model even when space runs low (no prompt in Chrome/Edge)
        try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* */ }
        const worker = new Worker(new URL('lib/web-llm/worker.js?v=' + WEBLLM_V, document.baseURI), { type: 'module' });
        engine = await webllm.CreateWebWorkerMLCEngine(worker, id, { initProgressCallback: r => { bar.style.width = Math.round((r.progress || 0) * 100) + '%'; lt.textContent = r.text || tr('Loading the model…'); } });
        show('chat'); status.textContent = sel.value; store.set('cp_ai_model', sel.value); store.set('cp_ai_on', '1'); cached[sel.value] = true;
        if (!log.children.length) say('', esc(tr('Ready. Ask anything, or pick a button.')), 'sys');
        if (pendingMode) { const m = pendingMode; pendingMode = null; ask(m); }
      } catch (e) {
        engine = null; show('setup'); err.textContent = tr('The model could not start: {msg}', { msg: (e && e.message) || String(e) }); err.hidden = false;
      }
    }
    $('.ait-on', el).onclick = start;
    $('.ait-off', el).onclick = async () => { if (busy) stop(); try { if (engine) await engine.unload(); } catch (e) { /* */ } engine = null; store.set('cp_ai_on', '0'); show('setup'); refreshCache(); };
    $('.ait-x', el).onclick = () => { el.hidden = true; };

    // ---------- asking ----------
    // Every answer is a "run" with its own number: Stop (or a new puzzle) ends the run at once — the model is
    // interrupted, the lines still waiting are dropped, and nothing more is drawn for it.
    let pendingMode = null, run = 0, current = null;
    const puzzleKey = () => { const st = global.__app && global.__app.state; return (st && st.base && st.base.id) || ''; };
    const puzzleTitle = () => { const st = global.__app && global.__app.state; return (st && st.puzzle && plain(st.puzzle.title)) || ''; };
    const MODE_LABEL = { hint: 'Give me a hint', explain: 'Explain the solution', another: 'Another way to solve it', board: 'Explain what is on my board' };
    function setBusy(on) {
      busy = on; el.classList.toggle('busy', on);
      $('.ait-stop', el).hidden = !on; $('.ait-send', el).hidden = on;
      if (!on) status.textContent = sel.value;
    }
    function stop(reason) {
      const r = current; if (!r || r.stopped) return;
      r.stopped = true; r.queue.length = 0; r.done = true;
      try { engine && engine.interruptGenerate(); } catch (e) { /* */ }
      r.note = reason || tr('Stopped.');
      // the interface is free again right away, even if the model takes a moment to wind down
      setBusy(false);
    }
    async function ask(mode, question) {
      if (!engine) { pendingMode = mode; return; }
      if (busy) return;
      const my = ++run, key = puzzleKey();
      const r = current = { id: my, key, queue: [], done: false, stopped: false, note: '' };
      setBusy(true);
      const lang = I18N.lang || 'en', q = question || ASK[mode] || '';
      const ctx = puzzleContext(mode), bctx = mode === 'board' || mode === 'free' ? boardContext(board) : '';
      say(tr('You'), esc(question || tr(MODE_LABEL[mode] || '')), 'me');
      // earlier questions only about this same puzzle, and only for free questions (the buttons stand alone)
      const prev = mode === 'free' ? history.filter(h => h.key === key).slice(-2).map(h => 'Earlier the student asked: ' + h.q + '\nYou said: ' + h.a).join('\n') : '';
      const user = [ctx.text, bctx, prev, 'STUDENT: ' + q, 'Answer with board commands only, captions in ' + LANG_NAME[lang] + '.'].filter(Boolean).join('\n\n');
      const msgs = [{ role: 'system', content: systemPrompt(lang) }, { role: 'user', content: user }];
      const W = Writer(board); W.begin($('.ait-clean', el).checked);
      let said = [], inThink = false, buf = '', thinkN = 0;
      const out = say('', '<span class="ait-dots">…</span>', 'ai'); let outHtml = '';
      const live = () => !r.stopped && my === run && puzzleKey() === key;
      // drawing runs beside generation, paced so the student can follow
      const pump = (async () => {
        while (live() && (!r.done || r.queue.length)) {
          if (!r.queue.length) { await sleep(60); continue; }
          const c = r.queue.shift();
          if (c.cmd === 'STEP') { said.push(c.arg); outHtml += '<p>' + mathHtml(c.arg) + '</p>'; out.innerHTML = outHtml; log.scrollTop = log.scrollHeight; await sleep(Math.min(2600, 500 + c.arg.length * 22)); continue; }
          try { W.run(c.cmd, c.arg); } catch (e) { console.warn('tutor command', c, e); }
          await sleep({ PLOT: 900, SOLVE: 900, ANSWER: 900 }[c.cmd] || 550);
        }
      })();
      // small models can fall into a loop ("Wait… let's re-evaluate…" over and over): a line already said is
      // dropped, and after a few repeats the run is stopped
      const seen = new Map(); let repeats = 0, inRow = 0;
      const norm = t => String(t).toLowerCase().replace(/[\s$\\{}()*.,;:!?¡¿'"“”«»`-]+/g, '');
      const feedLine = line => {
        if (!live()) return; const c = parseLine(line); if (!c) return;
        const k = c.cmd + ':' + norm(c.arg);
        if (k.length > 6 && seen.has(k)) {
          repeats++; inRow++;
          if (repeats >= 3 || inRow >= 2) stop(tr('The model started repeating itself, so I stopped it. Ask again, or tick “Think before answering”.'));
          return;
        }
        inRow = 0; seen.set(k, 1); r.queue.push(c);
      };
      try {
        const stream = await engine.chat.completions.create({ messages: msgs, stream: true, temperature: 0.6, top_p: 0.9, presence_penalty: 1.0, frequency_penalty: 0.3, max_tokens: think.checked ? 2600 : 1100, extra_body: { enable_thinking: think.checked } });
        for await (const ch of stream) {
          if (!live()) { try { engine.interruptGenerate(); } catch (e) { /* */ } break; }
          let t = (ch.choices[0] && ch.choices[0].delta && ch.choices[0].delta.content) || '';
          // hidden reasoning between <think> … </think>
          while (t) {
            if (inThink) { const k = t.indexOf('</think>'); if (k < 0) { thinkN += t.length; status.textContent = tr('Thinking…') + ' ' + '·'.repeat(1 + (thinkN / 200 | 0) % 6); t = ''; } else { inThink = false; t = t.slice(k + 8); } }
            else { const k = t.indexOf('<think>'); if (k >= 0) { buf += t.slice(0, k); inThink = true; t = t.slice(k + 7); } else { buf += t; t = ''; } }
          }
          if (!inThink) status.textContent = tr('Writing on the board…');
          let nl; while ((nl = buf.indexOf('\n')) >= 0) { feedLine(buf.slice(0, nl)); buf = buf.slice(nl + 1); }
        }
        if (buf.trim()) feedLine(buf);
      } catch (e) { if (!r.stopped) say('', esc(tr('The model could not start: {msg}', { msg: (e && e.message) || String(e) })), 'sys'); }
      r.done = true; await pump;
      if (r.stopped || puzzleKey() !== key) { outHtml += '<p class="ait-stopped">' + esc(r.note || tr('Stopped.')) + '</p>'; out.innerHTML = outHtml; }
      else if (!outHtml) out.remove();
      if (said.length) history.push({ key, q, a: said.join(' ').slice(0, 400) });
      if (my === run) { current = null; setBusy(false); }
    }
    $('.ait-quick', el).addEventListener('click', e => { const b = e.target.closest('button[data-mode]'); if (b) ask(b.dataset.mode); });
    $('.ait-send', el).onclick = () => { if (busy) return; const q = ta.value.trim(); if (!q) return; ta.value = ''; ask('free', q); };
    $('.ait-stop', el).onclick = () => stop();
    ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!busy) $('.ait-send', el).click(); } if (e.key === 'Escape' && busy) stop(); });

    // a new puzzle on screen: stop talking about the old one and forget it
    let lastKey = puzzleKey();
    const onPuzzle = () => {
      const k = puzzleKey(); if (k === lastKey) return; lastKey = k;
      pendingMode = null;
      if (busy) stop(tr('Stopped — a new puzzle was opened.'));
      history = history.filter(h => h.key === k);
      if (!chatBox.hidden && k) say('', '📄 ' + esc(tr('New puzzle: {title}', { title: puzzleTitle() })), 'sys');
    };
    const titleEl = document.getElementById('p-title');
    if (titleEl && global.MutationObserver) new MutationObserver(() => setTimeout(onPuzzle, 0)).observe(titleEl, { childList: true, characterData: true, subtree: true });

    return {
      open(mode) {
        el.hidden = false; draggableFront();
        if (engine) { show('chat'); if (mode) ask(mode); return; }
        show('setup'); if (mode) pendingMode = mode;
        if (loadBox.hidden) refreshCache(true).then(c => { if (!engine && loadBox.hidden && c[sel.value] && (mode || store.get('cp_ai_on') === '1')) start(); });
      },
      toggle() { if (el.hidden) this.open(); else el.hidden = true; },
      parseLine, Writer, systemPrompt, _ask: ask, _setEngine(e) { engine = e; show('chat'); }
    };
    function draggableFront() { el.style.zIndex = (global.BoardMatrix && BoardMatrix.draggable && (BoardMatrix.draggable.z = (BoardMatrix.draggable.z || 20) + 1)) || 30; }
  }

  // ---------- wiring on the puzzle page ----------
  function init() {
    const app = global.__app; if (!app || !app.board) return;
    const T = Tutor(app.board); global.LocalTutor = T;
    const help = $('#btn-help');
    if (help && !$('#btn-tutor')) {
      const b = document.createElement('button'); b.id = 'btn-tutor'; b.className = 'tool svg ait-btn'; b.type = 'button';
      b.title = tr('Local AI tutor — explains on this board, runs in your browser'); b.setAttribute('aria-label', b.title);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v2M12 19v2M5 12H3M21 12h-2"/><rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/><path d="M10 10.5h.01M14 10.5h.01M9.8 14c1.3 1 3.1 1 4.4 0"/></svg><span class="lbl">AI tutor</span>';
      b.onclick = () => T.toggle();
      help.parentNode.insertBefore(b, help);
      I18N.onChange(() => { b.title = tr('Local AI tutor — explains on this board, runs in your browser'); });
    }
    // “Ask an AI” under the puzzle: the local tutor comes first
    const pop = $('#ai-pop');
    if (pop && !$('#ai-local')) {
      const b = document.createElement('button'); b.id = 'ai-local'; b.type = 'button'; b.className = 'btn primary ai-local';
      b.textContent = tr('🖥️ Explain it on the blackboard with the local AI — free, private, in your browser');
      b.onclick = () => { T.open('another'); const bw = $('.board-wrap'); if (bw && bw.scrollIntoView) bw.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      pop.insertBefore(b, pop.firstChild);
      I18N.onChange(() => { b.textContent = tr('🖥️ Explain it on the blackboard with the local AI — free, private, in your browser'); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  global.LocalTutorKit = { parseLine, Writer, systemPrompt, puzzleContext, MODELS };
})(window);
