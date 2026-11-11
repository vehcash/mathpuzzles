/* probability · Which events are independent?
   Gaokao 2021, New Curriculum Paper I (新课标I卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2021-independent-draws",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2021, New Curriculum Paper I (新课标I卷), Question 8",
        fr: "Gaokao 2021, épreuve nationale I (新课标I卷), question 8",
        es: "Gaokao 2021, examen nacional I (新课标I卷), pregunta 8",
        ja: "2021年 中国・高考 新課程標準I卷 第8問",
        zh: "2021年高考数学新课标I卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Which events are independent?",
      fr: "Quels événements sont indépendants ?",
      es: "¿Qué sucesos son independientes?",
      ja: "独立な事象はどれ？",
      zh: "哪些事件相互独立？"
    },
    statement: {
      en: "Six balls numbered $1$ to $6$ are in a bag. One is drawn, put back, and a second is drawn. Let $A$: the first ball is $1$; $B$: the second ball is $2$; $C$: the two numbers add up to $8$; $D$: they add up to $7$. <b>Which of the following are true?</b>",
      fr: "Six boules numérotées de $1$ à $6$ sont dans un sac. On en tire une, on la remet, puis on en tire une seconde. Soit $A$ : la première boule est $1$ ; $B$ : la seconde est $2$ ; $C$ : la somme vaut $8$ ; $D$ : la somme vaut $7$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "En una bolsa hay seis bolas numeradas del $1$ al $6$. Se saca una, se devuelve y se saca otra. Sean $A$: la primera es $1$; $B$: la segunda es $2$; $C$: la suma es $8$; $D$: la suma es $7$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "袋に $1$〜$6$ の番号の玉が6個あります。1個取り出して戻し、もう1個取り出します。$A$：1回目が $1$、$B$：2回目が $2$、$C$：和が $8$、$D$：和が $7$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "袋中有标号 $1$ 到 $6$ 的六个球，有放回地取两次。$A$：第一次是 $1$；$B$：第二次是 $2$；$C$：两数之和为 $8$；$D$：两数之和为 $7$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The 6 × 6 grid of outcomes (first draw across, second draw up). The diagonal with sum 7 is highlighted, the shorter diagonal with sum 8 is shaded, and the column 'first = 1' is outlined.",
      fr: "La grille 6 × 6 des issues (premier tirage en abscisse, second en ordonnée). La diagonale de somme 7 est surlignée, la diagonale plus courte de somme 8 est grisée et la colonne « premier = 1 » est encadrée.",
      es: "La cuadrícula 6 × 6 de resultados (primera extracción en horizontal, segunda en vertical). La diagonal de suma 7 está resaltada, la diagonal más corta de suma 8 sombreada y la columna «primera = 1» recuadrada.",
      ja: "6 × 6 の結果の表（横が1回目、縦が2回目）。和が 7 の対角線を強調、和が 8 の短い対角線に色付け、「1回目 = 1」の列を囲む。",
      zh: "6 × 6 的结果表（横为第一次，纵为第二次）。和为 7 的对角线高亮，和为 8 的较短对角线涂色，“第一次 = 1”的那一列加框。"
    },
    hint: {
      en: "Count in the $36$ equally likely outcomes and test $P(X\\cap Y)=P(X)P(Y)$.",
      fr: "Comptez parmi les $36$ issues équiprobables et testez $P(X\\cap Y)=P(X)P(Y)$.",
      es: "Cuenta en los $36$ resultados equiprobables y comprueba $P(X\\cap Y)=P(X)P(Y)$.",
      ja: "同様に確からしい $36$ 通りで数え、$P(X\\cap Y)=P(X)P(Y)$ を調べましょう。",
      zh: "在 $36$ 个等可能结果中计数，检验 $P(X\\cap Y)=P(X)P(Y)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 62, pad: 22 });
      const c = 0.6, X = i => 0.3 + (i - 1) * c, Y = j => 0.3 + (j - 1) * c;
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) {
        const cls = i + j === 7 ? 'tri fill-yellow' : i + j === 8 ? 'tri fill-blue' : 'tri';
        F.rect(X(i), Y(j), c, c, cls); }
      F.rect(X(1), Y(1), c, 6 * c, 'seg hl pink');
      for (let i = 1; i <= 6; i++) { F.text([X(i) + c / 2, Y(1)], String(i), 'tick', 0, 12); F.text([X(1), Y(i) + c / 2], String(i), 'tick', -12, 0); }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "are independent": {"fr": "sont indépendants", "es": "son independientes", "ja": "は独立", "zh": "相互独立"},
      "are not independent": {"fr": "ne sont pas indépendants", "es": "no son independientes", "ja": "は独立でない", "zh": "不独立"}
    },
    options: [
      { tex: "A \\text{ and } D \\text{ are independent}", correct: true, why: {
        en: "$P(A\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        fr: "$P(A\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        es: "$P(A\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        ja: "$P(A\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。",
        zh: "$P(A\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。"
      } },
      { tex: "A \\text{ and } B \\text{ are independent}", correct: true, why: {
        en: "They concern different draws, with replacement: $\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        fr: "Ils portent sur des tirages différents, avec remise : $\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        es: "Se refieren a extracciones distintas, con reposición: $\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        ja: "別々の回の取り出し（戻す）：$\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。",
        zh: "涉及不同的两次（有放回）：$\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。"
      } },
      { tex: "A \\text{ and } C \\text{ are independent}", correct: false, why: {
        en: "With a $1$ first, the sum is at most $7$: $P(A\\cap C)=0$.",
        fr: "Avec un $1$ au départ, la somme vaut au plus $7$ : $P(A\\cap C)=0$.",
        es: "Con un $1$ primero, la suma es como mucho $7$: $P(A\\cap C)=0$.",
        ja: "1回目が $1$ なら和は最大 $7$：$P(A\\cap C)=0$。",
        zh: "第一次为 $1$ 时和至多为 $7$：$P(A\\cap C)=0$。"
      } },
      { tex: "B \\text{ and } C \\text{ are independent}", correct: false, why: {
        en: "$P(B\\cap C)=\\tfrac1{36}$ but $P(B)P(C)=\\tfrac16\\cdot\\tfrac5{36}$.",
        fr: "$P(B\\cap C)=\\tfrac1{36}$ mais $P(B)P(C)=\\tfrac16\\cdot\\tfrac5{36}$.",
        es: "$P(B\\cap C)=\\tfrac1{36}$ pero $P(B)P(C)=\\tfrac16\\cdot\\tfrac5{36}$.",
        ja: "$P(B\\cap C)=\\tfrac1{36}$ だが $P(B)P(C)=\\tfrac16\\cdot\\tfrac5{36}$。",
        zh: "$P(B\\cap C)=\\tfrac1{36}$，但 $P(B)P(C)=\\tfrac16\\cdot\\tfrac5{36}$。"
      } },
      { tex: "C \\text{ and } D \\text{ are independent}", correct: false, why: {
        en: "They cannot both happen, yet each has positive probability.",
        fr: "Ils ne peuvent pas arriver ensemble, et chacun a une probabilité positive.",
        es: "No pueden ocurrir a la vez y cada uno tiene probabilidad positiva.",
        ja: "同時には起こらず、どちらも確率は正。",
        zh: "二者不能同时发生，且各自概率为正。"
      } },
      { tex: "B \\text{ and } D \\text{ are not independent}", correct: false, why: {
        en: "They are independent: $P(B\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        fr: "Ils sont indépendants : $P(B\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        es: "Son independientes: $P(B\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$.",
        ja: "独立：$P(B\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。",
        zh: "它们独立：$P(B\\cap D)=\\tfrac1{36}=\\tfrac16\\cdot\\tfrac16$。"
      } },
      { tex: "P(C)=P(D)", correct: false, why: {
        en: "$P(C)=\\tfrac5{36}$, $P(D)=\\tfrac6{36}$.",
        fr: "$P(C)=\\tfrac5{36}$, $P(D)=\\tfrac6{36}$.",
        es: "$P(C)=\\tfrac5{36}$, $P(D)=\\tfrac6{36}$.",
        ja: "$P(C)=\\tfrac5{36}$、$P(D)=\\tfrac6{36}$。",
        zh: "$P(C)=\\tfrac5{36}$，$P(D)=\\tfrac6{36}$。"
      } },
      { tex: "P(A\\cap D)=\\tfrac16", correct: false, why: {
        en: "Only $(1,6)$ is in both: $\\tfrac1{36}$.",
        fr: "Seul $(1,6)$ est dans les deux : $\\tfrac1{36}$.",
        es: "Solo $(1,6)$ está en ambos: $\\tfrac1{36}$.",
        ja: "両方に入るのは $(1,6)$ だけ：$\\tfrac1{36}$。",
        zh: "同时属于二者的只有 $(1,6)$：$\\tfrac1{36}$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count each event",
          fr: "Compter chaque événement",
          es: "Contar cada suceso",
          ja: "各事象を数える",
          zh: "数出每个事件"
        },
        lines: ["P(A)=P(B)=\\tfrac16,\\quad P(C)=\\tfrac{5}{36},\\quad P(D)=\\tfrac{6}{36}=\\tfrac16"],
        note: {
          en: "Sum $7$ has six outcomes, one for each first draw; sum $8$ has only five.",
          fr: "La somme $7$ a six issues, une par premier tirage ; la somme $8$ n’en a que cinq.",
          es: "La suma $7$ tiene seis resultados, uno por cada primera extracción; la suma $8$, solo cinco.",
          ja: "和 $7$ は1回目ごとに1つずつ6通り、和 $8$ は5通り。",
          zh: "和为 $7$ 有六种，每个首次结果各一种；和为 $8$ 只有五种。"
        }
      },
      {
        title: {
          en: "Test the products",
          fr: "Tester les produits",
          es: "Comprobar los productos",
          ja: "積を確かめる",
          zh: "检验乘积"
        },
        lines: ["P(A\\cap D)=P(\\{(1,6)\\})=\\tfrac1{36}=P(A)P(D)", "P(A\\cap C)=0\\ne P(A)P(C)"],
        note: {
          en: "Whatever the first ball, exactly one second ball makes $7$ — so $D$ ignores the first draw.",
          fr: "Quelle que soit la première boule, exactement une seconde donne $7$ : $D$ ne dépend pas du premier tirage.",
          es: "Sea cual sea la primera bola, exactamente una segunda da $7$: $D$ no depende de la primera.",
          ja: "1回目が何でも、和を $7$ にする2回目はちょうど1つ。$D$ は1回目と無関係。",
          zh: "无论第一个球是几，恰有一个第二球使和为 $7$——$D$ 与第一次无关。"
        }
      },
      {
        title: {
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "Sum 7 is special; sum 8 is not.",
          fr: "La somme 7 est spéciale, pas la somme 8.",
          es: "La suma 7 es especial; la 8 no.",
          ja: "和 7 は特別、和 8 はそうではない。",
          zh: "和为 7 很特殊，和为 8 则不然。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
