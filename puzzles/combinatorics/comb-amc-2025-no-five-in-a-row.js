/* combinatorics · Avoiding five in a row
   AMC 12A 2025 (Mathematical Association of America), Problem 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2025-no-five-in-a-row",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 13",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 13",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 13",
        ja: "AMC 12A 2025（アメリカ数学協会）第13問",
        zh: "AMC 12A 2025（美国数学协会）第 13 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Avoiding five in a row",
      fr: "Éviter cinq à la suite",
      es: "Evitar cinco seguidos",
      ja: "5つ連続を避ける",
      zh: "避免五个连续"
    },
    statement: {
      en: "$N$ is the largest size of a subset of $\\{1,2,\\dots,13\\}$ containing no five consecutive integers. Now $N$ numbers are chosen at random from $\\{1,\\dots,13\\}$. <b>Which of the following are true?</b>",
      fr: "$N$ est la plus grande taille d’une partie de $\\{1,2,\\dots,13\\}$ sans cinq entiers consécutifs. On choisit maintenant $N$ nombres au hasard dans $\\{1,\\dots,13\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$N$ es el mayor tamaño de un subconjunto de $\\{1,2,\\dots,13\\}$ sin cinco enteros consecutivos. Ahora se eligen al azar $N$ números de $\\{1,\\dots,13\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\{1,2,\\dots,13\\}$ の部分集合で5つの連続整数を含まないものの最大の大きさを $N$ とします。$\\{1,\\dots,13\\}$ から無作為に $N$ 個選びます。<b>次のうち正しいものはどれですか？</b>",
      zh: "$N$ 为 $\\{1,2,\\dots,13\\}$ 中不含五个连续整数的子集的最大元素个数。现从 $\\{1,\\dots,13\\}$ 中随机选 $N$ 个数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The numbers 1 to 13 in a row with two of them crossed out.",
      fr: "Les nombres 1 à 13 en ligne, deux d’entre eux barrés.",
      es: "Los números del 1 al 13 en fila, con dos tachados.",
      ja: "1〜13 を並べ、2つに×。",
      zh: "1 到 13 排成一行，划掉其中两个。"
    },
    hint: {
      en: "Think about which numbers are left out. Each removed number breaks the runs through it; one removal cannot break all runs of five in $13$ numbers.",
      fr: "Pensez aux nombres exclus. Chaque nombre retiré casse les suites qui le contiennent ; un seul ne suffit pas pour $13$ nombres.",
      es: "Piensa en los números que se quitan. Cada uno rompe las rachas que lo contienen; uno solo no basta para $13$ números.",
      ja: "除く数で考える。1つ除くだけでは13個の中の5連続を全部は壊せない。",
      zh: "考虑被去掉的数。去掉一个不足以破坏 13 个数中所有的五连。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.8, h: 1.2, scale: 50, pad: 16 });
      for (let k = 1; k <= 13; k++) { F.text([0.25 + (k - 1) * 0.52, 0.6], String(k), 'len', 0, 0); }
      F.reveal = () => {
      [5, 10].forEach(k => F.seg([0.05 + (k - 1) * 0.52, 0.35], [0.45 + (k - 1) * 0.52, 0.85], 'hl pink'));
      };
      return F;
    },
    options: [
      { tex: "N=11", correct: true, why: {
        en: "Remove $5$ and $10$, for example.",
        fr: "Retirer $5$ et $10$, par exemple.",
        es: "Quitando $5$ y $10$, por ejemplo.",
        ja: "例えば $5$ と $10$ を除く。",
        zh: "例如去掉 $5$ 和 $10$。"
      } },
      { tex: "P=\\tfrac1{26}", correct: true, why: {
        en: "$\\{4,9\\},\\{5,9\\},\\{5,10\\}$: $\\dfrac{3}{\\binom{13}2}=\\dfrac3{78}$",
        fr: "$\\{4,9\\},\\{5,9\\},\\{5,10\\}$: $\\dfrac{3}{\\binom{13}2}=\\dfrac3{78}$",
        es: "$\\{4,9\\},\\{5,9\\},\\{5,10\\}$: $\\dfrac{3}{\\binom{13}2}=\\dfrac3{78}$",
        ja: "$\\{4,9\\},\\{5,9\\},\\{5,10\\}$: $\\dfrac{3}{\\binom{13}2}=\\dfrac3{78}$",
        zh: "$\\{4,9\\},\\{5,9\\},\\{5,10\\}$: $\\dfrac{3}{\\binom{13}2}=\\dfrac3{78}$"
      } },
      { tex: "N=10", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "N=12", correct: false, why: {
        en: "One removed number leaves a run of $5$ on one side.",
        fr: "Un seul retrait laisse une suite de $5$ d’un côté.",
        es: "Una sola retirada deja una racha de $5$ a un lado.",
        ja: "1つ除くだけでは片側に5連続が残る。",
        zh: "只去一个，一侧仍有五连。"
      } },
      { tex: "P=\\tfrac3{143}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac5{78}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac3{130}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac2{78}", correct: false, why: {
        en: "There are three working pairs, not two.",
        fr: "Il y a trois paires qui conviennent, pas deux.",
        es: "Hay tres pares válidos, no dos.",
        ja: "条件を満たすペアは3組。",
        zh: "有三对可行，不是两对。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two gaps needed",
          fr: "Deux trous nécessaires",
          es: "Hacen falta dos huecos",
          ja: "2つ除く必要",
          zh: "需要两个空缺"
        },
        lines: ["N=13-2=11"],
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
          en: "Which pairs work",
          fr: "Quelles paires conviennent",
          es: "Qué pares funcionan",
          ja: "どのペアか",
          zh: "哪些对可行"
        },
        lines: ["\\{a,b\\}:\\ a\\le5,\\ b-a\\le5,\\ b\\ge9\\Rightarrow\\{4,9\\},\\{5,9\\},\\{5,10\\}", "P=\\tfrac3{78}=\\tfrac1{26}"],
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
