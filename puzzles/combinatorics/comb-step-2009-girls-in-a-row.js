/* combinatorics · Three girls in a line of children
   STEP Mathematics I 2009 (Cambridge), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-step-2009-girls-in-a-row",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "STEP Mathematics I 2009 (Cambridge), Question 13",
        fr: "STEP Mathématiques I 2009 (Cambridge), question 13",
        es: "STEP Matemáticas I 2009 (Cambridge), pregunta 13",
        ja: "STEP 数学 I 2009（ケンブリッジ大学）第13問",
        zh: "STEP 数学 I 2009（剑桥大学）第 13 题"
      },
      exams: ["step"]
    },
    difficulty: 3,
    title: {
      en: "Three girls in a line of children",
      fr: "Trois filles dans une rangée d’enfants",
      es: "Tres niñas en una fila de niños",
      ja: "子どもの列に並ぶ3人の女の子",
      zh: "一排孩子中的三个女孩"
    },
    statement: {
      en: "$n$ boys and $3$ girls ($n\\ge2$) stand in a line in random order, all orders equally likely. $K$ is the largest number of girls standing next to each other. <b>Which of the following are true?</b>",
      fr: "$n$ garçons et $3$ filles ($n\\ge2$) se placent en ligne dans un ordre aléatoire, tous les ordres étant équiprobables. $K$ est le plus grand nombre de filles côte à côte. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$n$ niños y $3$ niñas ($n\\ge2$) se colocan en fila en orden aleatorio, todos los órdenes equiprobables. $K$ es el mayor número de niñas juntas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "男の子 $n$ 人と女の子 $3$ 人（$n\\ge2$）が無作為な順に1列に並びます（どの順も同様に確からしい）。$K$ は隣り合う女の子の最大人数です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$n$ 个男孩与 $3$ 个女孩（$n\\ge2$）随机排成一排，各种顺序等可能。$K$ 为相邻女孩的最大人数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A row of boys with gaps between and at the ends where girls can stand.",
      fr: "Une rangée de garçons avec les intervalles et les bouts où les filles peuvent se placer.",
      es: "Una fila de niños con los huecos y extremos donde pueden ponerse las niñas.",
      ja: "男の子の列と、女の子が入れる間と両端。",
      zh: "一排男孩及女孩可以站的空隙和两端。"
    },
    hint: {
      en: "Choose the girls’ $3$ positions out of $n+3$: $\\binom{n+3}3$ equally likely sets. $K=3$: a block of $3$ consecutive places; $K=1$: $3$ of the $n+1$ gaps.",
      fr: "Choisissez les $3$ places des filles parmi $n+3$ : $\\binom{n+3}3$ ensembles équiprobables. $K=3$ : un bloc de $3$ places consécutives ; $K=1$ : $3$ des $n+1$ intervalles.",
      es: "Elige las $3$ posiciones de las niñas entre $n+3$: $\\binom{n+3}3$ conjuntos equiprobables. $K=3$: un bloque de $3$ puestos seguidos; $K=1$: $3$ de los $n+1$ huecos.",
      ja: "女の子の位置 $3$ つを $n+3$ から選ぶ：$\\binom{n+3}3$ 通り。$K=3$ は連続3席、$K=1$ は $n+1$ 個の隙間から3つ。",
      zh: "从 $n+3$ 个位置选女孩的 $3$ 个：$\\binom{n+3}3$ 种等可能。$K=3$：连续三个位置；$K=1$：$n+1$ 个空隙选 $3$ 个。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 50, pad: 16 });
      for (let k = 0; k < 5; k++) F.circle([1.0 + k * 1.0, 0.8], 0.28, 'fill-blue');
      for (let k = 0; k <= 5; k++) F.seg([0.5 + k * 1.0, 0.45], [0.5 + k * 1.0, 1.15], 'seg thin dashc');
      F.reveal = () => {
      F.text([3.0, 1.45], 'n + 1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "n + 1": {"fr": "n + 1", "es": "n + 1", "ja": "n + 1", "zh": "n + 1"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "as": {"fr": "quand", "es": "cuando", "ja": "のとき", "zh": "当"},
      "total": {"fr": "total", "es": "total", "ja": "合計", "zh": "总数"}
    },
    options: [
      { tex: "P(K=3)=\\dfrac{6}{(n+3)(n+2)}", correct: true, why: {
        en: "$\\dfrac{n+1}{\\binom{n+3}3}$",
        fr: "$\\dfrac{n+1}{\\binom{n+3}3}$",
        es: "$\\dfrac{n+1}{\\binom{n+3}3}$",
        ja: "$\\dfrac{n+1}{\\binom{n+3}3}$",
        zh: "$\\dfrac{n+1}{\\binom{n+3}3}$"
      } },
      { tex: "E(K)=\\dfrac{n+9}{n+3}", correct: true, why: {
        en: "$P(K=1)=\\dfrac{n(n-1)}{(n+3)(n+2)},\\ P(K=2)=\\dfrac{6n}{(n+3)(n+2)}$",
        fr: "$P(K=1)=\\dfrac{n(n-1)}{(n+3)(n+2)},\\ P(K=2)=\\dfrac{6n}{(n+3)(n+2)}$",
        es: "$P(K=1)=\\dfrac{n(n-1)}{(n+3)(n+2)},\\ P(K=2)=\\dfrac{6n}{(n+3)(n+2)}$",
        ja: "$P(K=1)=\\dfrac{n(n-1)}{(n+3)(n+2)},\\ P(K=2)=\\dfrac{6n}{(n+3)(n+2)}$",
        zh: "$P(K=1)=\\dfrac{n(n-1)}{(n+3)(n+2)},\\ P(K=2)=\\dfrac{6n}{(n+3)(n+2)}$"
      } },
      { tex: "P(K=1)=\\dfrac{6n}{(n+3)(n+2)}", correct: false, why: {
        en: "That is $P(K=2)$.",
        fr: "C’est $P(K=2)$.",
        es: "Es $P(K=2)$.",
        ja: "それは $P(K=2)$。",
        zh: "那是 $P(K=2)$。"
      } },
      { tex: "P(K=3)=\\dfrac{1}{\\binom{n+3}3}", correct: false, why: {
        en: "There are $n+1$ blocks of three consecutive places, not one.",
        fr: "Il y a $n+1$ blocs de trois places consécutives, pas un seul.",
        es: "Hay $n+1$ bloques de tres puestos seguidos, no uno.",
        ja: "連続3席のブロックは $n+1$ 個。",
        zh: "连续三个位置的块有 $n+1$ 个。"
      } },
      { tex: "E(K)=2\\ \\text{for every}\\ n", correct: false, why: {
        en: "$n=4$: $E(K)=\\tfrac{13}7$",
        fr: "$n=4$: $E(K)=\\tfrac{13}7$",
        es: "$n=4$: $E(K)=\\tfrac{13}7$",
        ja: "$n=4$: $E(K)=\\tfrac{13}7$",
        zh: "$n=4$: $E(K)=\\tfrac{13}7$"
      } },
      { tex: "E(K)\\to3\\ \\text{as}\\ n\\to\\infty", correct: false, why: {
        en: "With many boys the girls are usually apart: $E(K)\\to1$.",
        fr: "Avec beaucoup de garçons les filles sont en général séparées : $E(K)\\to1$.",
        es: "Con muchos niños las niñas suelen estar separadas: $E(K)\\to1$.",
        ja: "男の子が多いと女の子はたいてい離れる：$E(K)\\to1$。",
        zh: "男孩很多时女孩通常分开：$E(K)\\to1$。"
      } },
      { tex: "P(K=1)=\\dfrac{n}{n+3}", correct: false, why: {
        en: "$P(K=1)=\\dfrac{\\binom{n+1}3}{\\binom{n+3}3}=\\dfrac{n(n-1)}{(n+3)(n+2)}$",
        fr: "$P(K=1)=\\dfrac{\\binom{n+1}3}{\\binom{n+3}3}=\\dfrac{n(n-1)}{(n+3)(n+2)}$",
        es: "$P(K=1)=\\dfrac{\\binom{n+1}3}{\\binom{n+3}3}=\\dfrac{n(n-1)}{(n+3)(n+2)}$",
        ja: "$P(K=1)=\\dfrac{\\binom{n+1}3}{\\binom{n+3}3}=\\dfrac{n(n-1)}{(n+3)(n+2)}$",
        zh: "$P(K=1)=\\dfrac{\\binom{n+1}3}{\\binom{n+3}3}=\\dfrac{n(n-1)}{(n+3)(n+2)}$"
      } },
      { tex: "P(K=2)>P(K=1)\\ \\text{for every}\\ n", correct: false, why: {
        en: "$6n>n(n-1)\\iff n<7$",
        fr: "$6n>n(n-1)\\iff n<7$",
        es: "$6n>n(n-1)\\iff n<7$",
        ja: "$6n>n(n-1)\\iff n<7$",
        zh: "$6n>n(n-1)\\iff n<7$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count each case",
          fr: "Compter chaque cas",
          es: "Contar cada caso",
          ja: "場合ごとに数える",
          zh: "逐类计数"
        },
        lines: ["K=3:\\ n+1,\\quad K=1:\\ \\binom{n+1}3,\\quad \\text{total}\\ \\binom{n+3}3"],
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
          en: "Expectation",
          fr: "Espérance",
          es: "Esperanza",
          ja: "期待値",
          zh: "期望"
        },
        lines: ["E(K)=\\frac{n(n-1)+2\\cdot6n+3\\cdot6}{(n+3)(n+2)}=\\frac{n^2+11n+18}{(n+3)(n+2)}=\\frac{(n+2)(n+9)}{(n+3)(n+2)}=\\frac{n+9}{n+3}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "STEP asks for proofs; here the results of the question are turned into statements to check.",
          fr: "Le STEP demande des démonstrations ; ici les résultats de la question deviennent des affirmations à vérifier.",
          es: "El STEP pide demostraciones; aquí los resultados de la pregunta se convierten en afirmaciones que comprobar.",
          ja: "STEP は証明問題。ここでは結果を判定する命題にした。",
          zh: "STEP 要求证明，此处把结论改为待判断的命题。"
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
