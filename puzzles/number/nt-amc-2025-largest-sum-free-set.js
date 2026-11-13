/* number · The largest sum-free subset of 1 to 20
   AMC 12A 2025 (Mathematical Association of America), Problem 15 (also AMC 10A Problem 21) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2025-largest-sum-free-set",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 15 (also AMC 10A Problem 21)",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 15 (aussi AMC 10A, problème 21)",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 15 (también AMC 10A, problema 21)",
        ja: "AMC 12A 2025（アメリカ数学協会）第15問（AMC 10A 第21問と共通）",
        zh: "AMC 12A 2025（美国数学协会）第 15 题（亦为 AMC 10A 第 21 题）"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "The largest sum-free subset of 1 to 20",
      fr: "La plus grande partie sans somme de 1 à 20",
      es: "El mayor subconjunto sin sumas de 1 a 20",
      ja: "1〜20 の最大の和なし部分集合",
      zh: "1 到 20 中最大的无和子集"
    },
    statement: {
      en: "A set is <i>sum-free</i> if no sum of two of its elements (the same element may be used twice) is in the set. <b>Which of the following are true about sum-free subsets of $\\{1,\\dots,20\\}$?</b>",
      fr: "Un ensemble est <i>sans somme</i> si aucune somme de deux de ses éléments (éventuellement égaux) n’est dans l’ensemble. <b>Lesquelles des affirmations suivantes sont vraies pour les parties sans somme de $\\{1,\\dots,20\\}$ ?</b>",
      es: "Un conjunto es <i>libre de sumas</i> si ninguna suma de dos de sus elementos (que pueden ser iguales) está en el conjunto. <b>¿Cuáles de las siguientes afirmaciones son verdaderas para los subconjuntos libres de sumas de $\\{1,\\dots,20\\}$?</b>",
      ja: "集合のどの2要素（同じ要素2回も可）の和も集合に入らないとき「和なし」と呼びます。<b>$\\{1,\\dots,20\\}$ の和なし部分集合について正しいものはどれですか？</b>",
      zh: "若集合中任意两个元素（可相同）之和都不在集合中，则称其“无和”。<b>关于 $\\{1,\\dots,20\\}$ 的无和子集，下列哪些正确？</b>"
    },
    figureText: {
      en: "The numbers 1 to 20 with 11 to 20 highlighted.",
      fr: "Les nombres 1 à 20, de 11 à 20 en surbrillance.",
      es: "Los números del 1 al 20 con del 11 al 20 resaltados.",
      ja: "1〜20 のうち 11〜20 を強調。",
      zh: "1 到 20，其中 11 到 20 高亮。"
    },
    hint: {
      en: "Big numbers have sums above $20$; odd numbers have even sums. For the upper bound, look at the differences between the largest element and the others.",
      fr: "Les grands nombres ont des sommes au-delà de $20$ ; les impairs ont des sommes paires. Pour la borne, regardez les différences entre le plus grand élément et les autres.",
      es: "Los números grandes suman más de $20$; los impares suman par. Para la cota, mira las diferencias entre el mayor y los demás.",
      ja: "大きい数の和は $20$ を超え、奇数の和は偶数。上界は最大要素との差を見る。",
      zh: "大数之和超过 $20$；奇数之和为偶数。上界看最大元素与其余元素的差。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.4, scale: 50, pad: 16 });
      for (let k = 1; k <= 20; k++) { const x = 0.25 + ((k - 1) % 10) * 0.62, y = k <= 10 ? 1.0 : 0.4; if (k > 10) F.rect(x - 0.27, y - 0.22, 0.54, 0.44, 'fill-yellow', 'fills'); F.text([x, y], String(k), 'len small', 0, 0); }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the largest size is": {"fr": "la plus grande taille est", "es": "el mayor tamaño es", "ja": "最大の大きさは", "zh": "最大元素个数为"},
      "is sum-free": {"fr": "est sans somme", "es": "es libre de sumas", "ja": "は和なし", "zh": "是无和集"},
      "are disjoint": {"fr": "sont disjoints", "es": "son disjuntos", "ja": "は互いに素", "zh": "互不相交"},
      "fails": {"fr": "impossible", "es": "imposible", "ja": "は不可能", "zh": "不可能"}
    },
    options: [
      { tex: "\\text{the largest size is}\\ 10", correct: true, why: {
        en: "$\\{11,\\dots,20\\}$ works; $11$ elements force a forbidden sum.",
        fr: "$\\{11,\\dots,20\\}$ convient ; $11$ éléments imposent une somme interdite.",
        es: "$\\{11,\\dots,20\\}$ sirve; $11$ elementos fuerzan una suma prohibida.",
        ja: "$\\{11,\\dots,20\\}$ は可。11個では必ず和が入る。",
        zh: "$\\{11,\\dots,20\\}$ 可行；11 个元素必有和在集合中。"
      } },
      { tex: "\\{1,3,5,\\dots,19\\}\\ \\text{is sum-free}", correct: true, why: {
        en: "Odd $+$ odd is even.",
        fr: "Impair $+$ impair est pair.",
        es: "Impar $+$ impar es par.",
        ja: "奇数＋奇数は偶数。",
        zh: "奇数加奇数为偶数。"
      } },
      { tex: "\\text{the largest size is}\\ 11", correct: false, why: {
        en: "If $m$ is the largest of $11$ elements, the $10$ differences $m-a$ must avoid the set: $21$ distinct numbers in $[1,20]$.",
        fr: "Si $m$ est le plus grand de $11$ éléments, les $10$ différences $m-a$ évitent l’ensemble : $21$ nombres distincts dans $[1,20]$.",
        es: "Si $m$ es el mayor de $11$ elementos, las $10$ diferencias $m-a$ evitan el conjunto: $21$ números distintos en $[1,20]$.",
        ja: "11個の最大を $m$ とすると、差 $m-a$ の10個は集合外：$[1,20]$ に21個の相異なる数が必要。",
        zh: "若 11 个元素的最大者为 $m$，10 个差 $m-a$ 都不在集合中：$[1,20]$ 中需 21 个不同的数。"
      } },
      { tex: "\\text{the largest size is}\\ 9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\{10,11,\\dots,20\\}\\ \\text{is sum-free}", correct: false, why: {
        en: "$10+10=20$",
        fr: "$10+10=20$",
        es: "$10+10=20$",
        ja: "$10+10=20$",
        zh: "$10+10=20$"
      } },
      { tex: "\\{1,4,5\\}\\ \\text{is sum-free}", correct: false, why: {
        en: "$1+4=5$",
        fr: "$1+4=5$",
        es: "$1+4=5$",
        ja: "$1+4=5$",
        zh: "$1+4=5$"
      } },
      { tex: "\\{2,4,6,\\dots,20\\}\\ \\text{is sum-free}", correct: false, why: {
        en: "$2+2=4$",
        fr: "$2+2=4$",
        es: "$2+2=4$",
        ja: "$2+2=4$",
        zh: "$2+2=4$"
      } },
      { tex: "\\text{the largest size is}\\ 12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two examples of size 10",
          fr: "Deux exemples de taille 10",
          es: "Dos ejemplos de tamaño 10",
          ja: "大きさ10の2例",
          zh: "两个 10 元例子"
        },
        lines: ["\\{11,\\dots,20\\},\\quad\\{1,3,\\dots,19\\}"],
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
          en: "No room for 11",
          fr: "Pas de place pour 11",
          es: "No caben 11",
          ja: "11個は無理",
          zh: "放不下 11 个"
        },
        lines: ["S\\ \\cup\\ \\{m-a:\\ a\\in S,\\ a<m\\}\\ \\text{are disjoint}\\Rightarrow 11+10\\le20\\ \\text{fails}"],
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
