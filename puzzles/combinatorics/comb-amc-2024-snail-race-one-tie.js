/* combinatorics · A five-snail race with at most one tie
   AMC 10B 2024 (Mathematical Association of America), Problem 17 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2024-snail-race-one-tie",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10B 2024 (Mathematical Association of America), Problem 17",
        fr: "AMC 10B 2024 (Mathematical Association of America), problème 17",
        es: "AMC 10B 2024 (Mathematical Association of America), problema 17",
        ja: "AMC 10B 2024（アメリカ数学協会）第17問",
        zh: "AMC 10B 2024（美国数学协会）第 17 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A five-snail race with at most one tie",
      fr: "Une course de cinq escargots avec au plus une égalité",
      es: "Una carrera de cinco caracoles con a lo sumo un empate",
      ja: "同着は1回までの5匹のカタツムリ競走",
      zh: "最多一次并列的五只蜗牛赛跑"
    },
    statement: {
      en: "Five snails race. At most one tie happens, but it may involve any number of snails (two up to all five). <b>Which of the following equal the number of possible results?</b>",
      fr: "Cinq escargots font la course. Il y a au plus une égalité, qui peut concerner n’importe quel nombre d’escargots (de deux à cinq). <b>Lesquelles des valeurs suivantes sont égales au nombre de résultats possibles ?</b>",
      es: "Cinco caracoles hacen una carrera. Hay a lo sumo un empate, que puede afectar a cualquier número de caracoles (de dos a los cinco). <b>¿Cuáles de los siguientes valores son iguales al número de resultados posibles?</b>",
      ja: "5匹のカタツムリが競走します。同着は高々1回ですが、その同着には何匹（2〜5匹）が含まれてもよい。<b>結果の数に等しいものはどれですか？</b>",
      zh: "五只蜗牛赛跑，最多出现一次并列，但并列可以涉及任意只（两只到全部五只）。<b>下列哪些等于可能结果的个数？</b>"
    },
    figureText: {
      en: "A podium of finishing places with one place shared by a group.",
      fr: "Un podium de places, l’une partagée par un groupe.",
      es: "Un podio de puestos, uno compartido por un grupo.",
      ja: "順位表で1つの順位を複数が共有。",
      zh: "名次台，其中一个名次由一组共享。"
    },
    hint: {
      en: "Split by the size $k$ of the tied group: choose the group, choose its position among $6-k$ places, and order the rest.",
      fr: "Distinguez selon la taille $k$ du groupe à égalité : choisissez le groupe, sa place parmi $6-k$, puis ordonnez le reste.",
      es: "Separa según el tamaño $k$ del grupo empatado: elige el grupo, su puesto entre $6-k$ y ordena el resto.",
      ja: "同着グループの大きさ $k$ で場合分け：グループ、$6-k$ 個中の位置、残りの順。",
      zh: "按并列组大小 $k$ 分类：选组、在 $6-k$ 个名次中定位，其余排序。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.0, scale: 50, pad: 16 });
      [[0.3, 0.9, '2'], [1.3, 1.5, '1'], [2.3, 0.6, '3'], [3.3, 0.4, '4']].forEach(([x, h, t]) => { F.rect(x, 0.3, 0.9, h, 'fill-blue', 'fills'); F.text([x + 0.45, 0.3 + h / 2], t, 'pt', 0, 0); });
      F.reveal = () => {
      F.text([2.5, 1.95], '120 + 240 + 60 + 10 + 1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "120 + 240 + 60 + 10 + 1": {"fr": "120 + 240 + 60 + 10 + 1", "es": "120 + 240 + 60 + 10 + 1", "ja": "120 + 240 + 60 + 10 + 1", "zh": "120 + 240 + 60 + 10 + 1"}
    },
    options: [
      { tex: "431", correct: true, why: {
        en: "$120+240+60+10+1$",
        fr: "$120+240+60+10+1$",
        es: "$120+240+60+10+1$",
        ja: "$120+240+60+10+1$",
        zh: "$120+240+60+10+1$"
      } },
      { tex: "5!+\\binom52\\cdot4!+\\binom53\\cdot3!+\\binom54\\cdot2!+1", correct: true, why: {
        en: "$120+240+60+10+1$",
        fr: "$120+240+60+10+1$",
        es: "$120+240+60+10+1$",
        ja: "$120+240+60+10+1$",
        zh: "$120+240+60+10+1$"
      } },
      { tex: "180", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "361", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "420", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "720", correct: false, why: {
        en: "That is $6!$, not a count of race results.",
        fr: "C’est $6!$, sans rapport.",
        es: "Es $6!$, no un recuento de resultados.",
        ja: "$6!$ で結果の数ではない。",
        zh: "那是 $6!$，不是结果数。"
      } },
      { tex: "430", correct: false, why: {
        en: "That forgets the five-way tie.",
        fr: "Oubli de l’égalité à cinq.",
        es: "Olvida el empate de los cinco.",
        ja: "5匹同着を忘れている。",
        zh: "漏了五只全并列。"
      } },
      { tex: "541", correct: false, why: {
        en: "That allows two separate ties.",
        fr: "Cela autorise deux égalités distinctes.",
        es: "Permite dos empates separados.",
        ja: "同着を2回許している。",
        zh: "允许了两次并列。"
      } }
    ],
    steps: [
      {
        title: {
          en: "By tie size",
          fr: "Selon la taille de l’égalité",
          es: "Según el tamaño del empate",
          ja: "同着の大きさ別",
          zh: "按并列大小"
        },
        lines: ["k=1:\\ 120,\\ k=2:\\ 10\\cdot24=240,\\ k=3:\\ 10\\cdot6=60,\\ k=4:\\ 5\\cdot2=10,\\ k=5:\\ 1"],
        note: {
          en: "For a tie of size $k$, there are $6-k$ blocks to order: $(6-k)!$.",
          fr: "Pour une égalité de taille $k$, il y a $6-k$ blocs à ordonner : $(6-k)!$.",
          es: "Con un empate de tamaño $k$ hay $6-k$ bloques que ordenar: $(6-k)!$.",
          ja: "大きさ $k$ の同着なら並べるブロックは $6-k$ 個：$(6-k)!$。",
          zh: "并列大小为 $k$ 时有 $6-k$ 个块排序：$(6-k)!$。"
        }
      },
      {
        title: {
          en: "Total",
          fr: "Total",
          es: "Total",
          ja: "合計",
          zh: "总数"
        },
        lines: ["120+240+60+10+1=431"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
