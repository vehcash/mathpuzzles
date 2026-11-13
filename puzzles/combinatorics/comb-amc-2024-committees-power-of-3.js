/* combinatorics · Committees with chairs and secretaries
   AMC 12B 2024 (Mathematical Association of America), Problem 16 (also AMC 10B Problem 22) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2024-committees-power-of-3",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 16 (also AMC 10B Problem 22)",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 16 (aussi AMC 10B, problème 22)",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 16 (también AMC 10B, problema 22)",
        ja: "AMC 12B 2024（アメリカ数学協会）第16問（AMC 10B 第22問と共通）",
        zh: "AMC 12B 2024（美国数学协会）第 16 题（亦为 AMC 10B 第 22 题）"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Committees with chairs and secretaries",
      fr: "Comités avec présidents et secrétaires",
      es: "Comités con presidentes y secretarios",
      ja: "委員長と書記のいる委員会",
      zh: "有主席和秘书的委员会"
    },
    statement: {
      en: "$16$ people are split into $4$ unlabelled committees of $4$, and each committee chooses a chair and a different secretary. The number of ways is $3^r\\cdot M$ with $3\\nmid M$. <b>Which of the following are true?</b>",
      fr: "$16$ personnes sont réparties en $4$ comités non étiquetés de $4$, et chaque comité choisit un président et un secrétaire distinct. Le nombre de façons s’écrit $3^r\\cdot M$ avec $3\\nmid M$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$16$ personas se reparten en $4$ comités sin etiqueta de $4$, y cada comité elige un presidente y un secretario distinto. El número de formas es $3^r\\cdot M$ con $3\\nmid M$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$16$ 人を区別のない4人ずつの委員会4つに分け、各委員会で委員長と別の書記を選びます。方法の数を $3^r\\cdot M$（$3\\nmid M$）とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$16$ 人分成 $4$ 个不加区分的 4 人委员会，每个委员会选一名主席和另一名秘书。方法数为 $3^r\\cdot M$（$3\\nmid M$）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Four groups of four dots, one dot in each marked C and another marked S.",
      fr: "Quatre groupes de quatre points, un marqué C et un autre S dans chacun.",
      es: "Cuatro grupos de cuatro puntos, en cada uno uno marcado C y otro S.",
      ja: "4人ずつ4組。各組に C と S の印。",
      zh: "四组各四个点，每组标一个 C 和一个 S。"
    },
    hint: {
      en: "Total $=\\dfrac{16!}{(4!)^4\\cdot4!}\\cdot12^4$. Count factors of $3$ with Legendre’s formula.",
      fr: "Total $=\\dfrac{16!}{(4!)^4\\cdot4!}\\cdot12^4$. Comptez les facteurs $3$ avec la formule de Legendre.",
      es: "Total $=\\dfrac{16!}{(4!)^4\\cdot4!}\\cdot12^4$. Cuenta los factores $3$ con la fórmula de Legendre.",
      ja: "総数 $=\\dfrac{16!}{(4!)^4\\cdot4!}\\cdot12^4$。ルジャンドルの公式で3の個数。",
      zh: "总数 $=\\dfrac{16!}{(4!)^4\\cdot4!}\\cdot12^4$，用勒让德公式数 3 的个数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 50, pad: 16 });
      for (let g = 0; g < 4; g++) { F.rect(0.25 + g * 1.45, 0.3, 1.25, 1.2, 'fill-blue', 'fills'); for (let k = 0; k < 4; k++) { const c = [0.55 + g * 1.45 + (k % 2) * 0.6, 0.6 + Math.floor(k / 2) * 0.6]; F.circle(c, 0.16, k === 0 ? 'fill-yellow' : (k === 1 ? 'fill-pink' : 'fill-blue')); } }
      F.reveal = () => {
      F.text([3.0, 1.7], '3⁶ / 3⁵ · 3⁴', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "3⁶ / 3⁵ · 3⁴": {"fr": "3⁶ / 3⁵ · 3⁴", "es": "3⁶ / 3⁵ · 3⁴", "ja": "3⁶ / 3⁵ · 3⁴", "zh": "3⁶ / 3⁵ · 3⁴"},
      "contains": {"fr": "contient", "es": "contiene", "ja": "は次を含む：", "zh": "含有"},
      "each committee has": {"fr": "chaque comité a", "es": "cada comité tiene", "ja": "各委員会で", "zh": "每个委员会有"},
      "chair–secretary choices": {"fr": "choix président–secrétaire", "es": "elecciones presidente–secretario", "ja": "通りの委員長・書記の選び方", "zh": "种主席–秘书选法"}
    },
    options: [
      { tex: "r=5", correct: true, why: {
        en: "$6-5+4$",
        fr: "$6-5+4$",
        es: "$6-5+4$",
        ja: "$6-5+4$",
        zh: "$6-5+4$"
      } },
      { tex: "16!\\ \\text{contains}\\ 3^6", correct: true, why: {
        en: "$\\lfloor16/3\\rfloor+\\lfloor16/9\\rfloor=5+1$",
        fr: "$\\lfloor16/3\\rfloor+\\lfloor16/9\\rfloor=5+1$",
        es: "$\\lfloor16/3\\rfloor+\\lfloor16/9\\rfloor=5+1$",
        ja: "$\\lfloor16/3\\rfloor+\\lfloor16/9\\rfloor=5+1$",
        zh: "$\\lfloor16/3\\rfloor+\\lfloor16/9\\rfloor=5+1$"
      } },
      { tex: "r=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r=7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r=9", correct: false, why: {
        en: "That forgets to divide by $4!$ for the unlabelled committees.",
        fr: "Oubli de diviser par $4!$ (comités non étiquetés).",
        es: "Olvida dividir entre $4!$ por los comités sin etiqueta.",
        ja: "区別のない委員会の $4!$ で割り忘れ。",
        zh: "忘了因委员会不加区分而除以 $4!$。"
      } },
      { tex: "r=4", correct: false, why: {
        en: "That treats the committees as labelled in the wrong direction: dividing by $4!$ twice.",
        fr: "Cela divise deux fois par $4!$.",
        es: "Divide dos veces entre $4!$.",
        ja: "$4!$ で2回割っている。",
        zh: "除了两次 $4!$。"
      } },
      { tex: "\\text{each committee has}\\ 6\\ \\text{chair–secretary choices}", correct: false, why: {
        en: "$4\\cdot3=12$",
        fr: "$4\\cdot3=12$",
        es: "$4\\cdot3=12$",
        ja: "$4\\cdot3=12$",
        zh: "$4\\cdot3=12$"
      } },
      { tex: "16!\\ \\text{contains}\\ 3^5", correct: false, why: {
        en: "$5+1=6$",
        fr: "$5+1=6$",
        es: "$5+1=6$",
        ja: "$5+1=6$",
        zh: "$5+1=6$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count",
          fr: "Compter",
          es: "Contar",
          ja: "数える",
          zh: "计数"
        },
        lines: ["\\frac{16!}{(4!)^4\\,4!}\\cdot(4\\cdot3)^4"],
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
          en: "Powers of 3",
          fr: "Puissances de 3",
          es: "Potencias de 3",
          ja: "3 の指数",
          zh: "3 的幂次"
        },
        lines: ["v_3:\\ 6-5\\cdot1+4=5"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
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
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
