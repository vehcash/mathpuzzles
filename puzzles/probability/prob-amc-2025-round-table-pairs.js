/* probability · Students together, teachers together
   AMC 12A 2025 (Mathematical Association of America), Problem 6 (also AMC 10A Problem 14) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2025-round-table-pairs",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 6 (also AMC 10A Problem 14)",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 6 (aussi AMC 10A, problème 14)",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 6 (también AMC 10A, problema 14)",
        ja: "AMC 12A 2025（アメリカ数学協会）第6問（AMC 10A 第14問と共通）",
        zh: "AMC 12A 2025（美国数学协会）第 6 题（亦为 AMC 10A 第 14 题）"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "Students together, teachers together",
      fr: "Élèves ensemble, professeurs ensemble",
      es: "Alumnos juntos, profesores juntos",
      ja: "生徒どうし、先生どうし隣に",
      zh: "学生挨着、老师挨着"
    },
    statement: {
      en: "Two students and two teachers sit in random chairs at a round table with $6$ chairs, so two chairs stay empty. <b>Which of the following equal the probability that the students sit next to each other and the teachers sit next to each other?</b>",
      fr: "Deux élèves et deux professeurs s’assoient au hasard autour d’une table ronde de $6$ chaises ; deux chaises restent vides. <b>Lesquelles des valeurs suivantes sont égales à la probabilité que les élèves soient voisins et que les professeurs soient voisins ?</b>",
      es: "Dos alumnos y dos profesores se sientan al azar en una mesa redonda de $6$ sillas; quedan dos vacías. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que los alumnos queden juntos y los profesores también?</b>",
      ja: "6 席の円卓に生徒2人と先生2人が無作為に座り、2席が空きます。<b>生徒どうしが隣り合い、先生どうしも隣り合う確率に等しいものはどれですか？</b>",
      zh: "6 个座位的圆桌，两名学生和两名老师随机就座，空两个座位。<b>下列哪些等于学生相邻且老师也相邻的概率？</b>"
    },
    figureText: {
      en: "Six chairs around a round table.",
      fr: "Six chaises autour d’une table ronde.",
      es: "Seis sillas alrededor de una mesa redonda.",
      ja: "円卓のまわりの6席。",
      zh: "圆桌周围的六个座位。"
    },
    hint: {
      en: "Count seat sets: $\\binom62$ for the students, then $\\binom42$ for the teachers. The students’ adjacent pair can be any of $6$; how many adjacent pairs are left?",
      fr: "Comptez les ensembles de places : $\\binom62$ pour les élèves puis $\\binom42$ pour les professeurs. La paire voisine des élèves est l’une des $6$ ; combien de paires voisines restent ?",
      es: "Cuenta conjuntos de asientos: $\\binom62$ para los alumnos y $\\binom42$ para los profesores. El par contiguo de alumnos es uno de $6$; ¿cuántos pares contiguos quedan?",
      ja: "席の選び方：生徒 $\\binom62$、先生 $\\binom42$。生徒の隣接ペアは $6$ 通り、残る隣接ペアは？",
      zh: "座位组：学生 $\\binom62$，老师 $\\binom42$。学生相邻对有 $6$ 种，剩下的相邻对有几个？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 70, pad: 16 });
      F.circle([1.6, 1.6], 0.8, 'fill-yellow');
      for (let k = 0; k < 6; k++) { const t = k * Math.PI / 3 + Math.PI / 6; F.circle([1.6 + 1.25 * Math.cos(t), 1.6 + 1.25 * Math.sin(t)], 0.22, 'fill-blue'); }
      F.reveal = () => {
      F.text([1.6, 1.6], '18 / 90', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "18 / 90": {"fr": "18 / 90", "es": "18 / 90", "ja": "18 / 90", "zh": "18 / 90"},
      "pairs": {"fr": "paires", "es": "pares", "ja": "組", "zh": "对"}
    },
    options: [
      { tex: "\\tfrac15", correct: true, why: {
        en: "$\\dfrac{6\\cdot3}{\\binom62\\binom42}=\\dfrac{18}{90}$",
        fr: "$\\dfrac{6\\cdot3}{\\binom62\\binom42}=\\dfrac{18}{90}$",
        es: "$\\dfrac{6\\cdot3}{\\binom62\\binom42}=\\dfrac{18}{90}$",
        ja: "$\\dfrac{6\\cdot3}{\\binom62\\binom42}=\\dfrac{18}{90}$",
        zh: "$\\dfrac{6\\cdot3}{\\binom62\\binom42}=\\dfrac{18}{90}$"
      } },
      { tex: "\\tfrac{18}{90}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac29", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac3{13}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac25", correct: false, why: {
        en: "That is only the chance the students are adjacent.",
        fr: "C’est seulement la probabilité que les élèves soient voisins.",
        es: "Es solo la probabilidad de que los alumnos estén juntos.",
        ja: "生徒が隣り合う確率だけ。",
        zh: "只是学生相邻的概率。"
      } },
      { tex: "\\tfrac1{10}", correct: false, why: {
        en: "After the students’ pair, $3$ adjacent pairs remain, not $1.5$.",
        fr: "Après la paire des élèves, il reste $3$ paires voisines.",
        es: "Tras el par de alumnos quedan $3$ pares contiguos.",
        ja: "生徒のペアの後、隣接ペアは $3$ 組残る。",
        zh: "学生占一对后还剩 $3$ 个相邻对。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All outcomes",
          fr: "Toutes les issues",
          es: "Todos los casos",
          ja: "全事象",
          zh: "所有情况"
        },
        lines: ["\\binom62\\binom42=15\\cdot6=90"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Favourable",
          fr: "Cas favorables",
          es: "Casos favorables",
          ja: "条件を満たす場合",
          zh: "有利情况"
        },
        lines: ["6\\ \\text{pairs}\\times3\\ \\text{pairs}=18,\\quad \\tfrac{18}{90}=\\tfrac15"],
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
