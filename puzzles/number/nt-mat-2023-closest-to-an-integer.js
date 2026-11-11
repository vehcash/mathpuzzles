/* number · Which log combination is nearly whole?
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023-closest-to-an-integer",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2023 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Which log combination is nearly whole?",
      fr: "Quelle combinaison de logs est presque entière ?",
      es: "¿Qué combinación de logaritmos es casi entera?",
      ja: "ほぼ整数になる対数の組合せ",
      zh: "哪个对数组合最接近整数？"
    },
    statement: {
      en: "Let $\\alpha=\\log_{10}2$, $\\beta=\\log_{10}3$, $\\gamma=\\log_{10}7$. Each number below is close to an integer. <b>Which of the following is closest to an integer?</b>",
      fr: "Soit $\\alpha=\\log_{10}2$, $\\beta=\\log_{10}3$, $\\gamma=\\log_{10}7$. Chaque nombre ci-dessous est proche d’un entier. <b>Lequel est le plus proche d’un entier ?</b>",
      es: "Sean $\\alpha=\\log_{10}2$, $\\beta=\\log_{10}3$, $\\gamma=\\log_{10}7$. Cada número de abajo está cerca de un entero. <b>¿Cuál está más cerca de un entero?</b>",
      ja: "$\\alpha=\\log_{10}2$、$\\beta=\\log_{10}3$、$\\gamma=\\log_{10}7$ とします。下の数はどれも整数に近い。<b>最も整数に近いのはどれですか？</b>",
      zh: "设 $\\alpha=\\log_{10}2$，$\\beta=\\log_{10}3$，$\\gamma=\\log_{10}7$。下列各数都接近整数，<b>哪个最接近整数？</b>"
    },
    figureText: {
      en: "Each option written as the log of a whole number: 9, 96, 98, 972 and 84.",
      fr: "Chaque option écrite comme log d’un entier : 9, 96, 98, 972 et 84.",
      es: "Cada opción escrita como log de un entero: 9, 96, 98, 972 y 84.",
      ja: "各選択肢を整数の対数で表す：9, 96, 98, 972, 84。",
      zh: "每个选项写成整数的对数：9、96、98、972、84。"
    },
    hint: {
      en: "$m\\alpha+n\\beta+k\\gamma=\\log_{10}(2^m3^n7^k)$. Which product is closest to a power of $10$, in ratio?",
      fr: "$m\\alpha+n\\beta+k\\gamma=\\log_{10}(2^m3^n7^k)$. Quel produit est le plus proche d’une puissance de $10$, en rapport ?",
      es: "$m\\alpha+n\\beta+k\\gamma=\\log_{10}(2^m3^n7^k)$. ¿Qué producto está más cerca, en razón, de una potencia de $10$?",
      ja: "$m\\alpha+n\\beta+k\\gamma=\\log_{10}(2^m3^n7^k)$。比で見て $10$ の累乗に最も近い積は？",
      zh: "$m\\alpha+n\\beta+k\\gamma=\\log_{10}(2^m3^n7^k)$，哪个乘积按比例最接近 $10$ 的幂？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.8, scale: 50, pad: 16 });
      [['9', '10'], ['96', '100'], ['98', '100'], ['972', '1000'], ['84', '100']].forEach(([a, b], k) => { F.rect(0.2 + k * 1.25, 0.5, 1.1, 0.8, 'fill-blue', 'fills'); F.text([0.75 + k * 1.25, 0.9], a, 'pt', 0, 0); F.text([0.75 + k * 1.25, 0.5], '≈ ' + b, 'len small', 0, 14); });
      F.reveal = () => {
      F.rect(0.2 + 2 * 1.25, 0.5, 1.1, 0.8, 'fill-yellow', 'fills'); F.text([3.25, 1.3], '2 %', 'len small', 0, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2 %": {"fr": "2 %", "es": "2 %", "ja": "2 %", "zh": "2 %"},
      "is the smallest in size": {"fr": "est le plus petit en valeur absolue", "es": "es el menor en valor absoluto", "ja": "の絶対値が最小", "zh": "绝对值最小"}
    },
    options: [
      { tex: "\\alpha+2\\gamma", correct: true, why: {
        en: "$\\log_{10}98$: $98$ is only $2\\%$ below $100$.",
        fr: "$\\log_{10}98$ : $98$ n’est qu’à $2\\,\\%$ de $100$.",
        es: "$\\log_{10}98$: $98$ está solo un $2\\,\\%$ por debajo de $100$.",
        ja: "$\\log_{10}98$。$98$ は $100$ より $2\\%$ 小さいだけ。",
        zh: "$\\log_{10}98$：$98$ 只比 $100$ 小 $2\\%$。"
      } },
      { tex: "\\log_{10}98", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "2\\beta", correct: false, why: {
        en: "$\\log_{10}9$: $10\\%$ off.",
        fr: "$\\log_{10}9$ : écart de $10\\,\\%$.",
        es: "$\\log_{10}9$: un $10\\,\\%$ de diferencia.",
        ja: "$\\log_{10}9$ で $10\\%$ ずれる。",
        zh: "$\\log_{10}9$：差 $10\\%$。"
      } },
      { tex: "5\\alpha+\\beta", correct: false, why: {
        en: "$\\log_{10}96$: $4\\%$ off.",
        fr: "$\\log_{10}96$ : écart de $4\\,\\%$.",
        es: "$\\log_{10}96$: un $4\\,\\%$.",
        ja: "$\\log_{10}96$ で $4\\%$。",
        zh: "$\\log_{10}96$：差 $4\\%$。"
      } },
      { tex: "2\\alpha+5\\beta", correct: false, why: {
        en: "$\\log_{10}972$: $2.8\\%$ off.",
        fr: "$\\log_{10}972$ : écart de $2{,}8\\,\\%$.",
        es: "$\\log_{10}972$: un $2{,}8\\,\\%$.",
        ja: "$\\log_{10}972$ で $2.8\\%$。",
        zh: "$\\log_{10}972$：差 $2.8\\%$。"
      } },
      { tex: "2\\alpha+\\beta+\\gamma", correct: false, why: {
        en: "$\\log_{10}84$: $16\\%$ off.",
        fr: "$\\log_{10}84$ : écart de $16\\,\\%$.",
        es: "$\\log_{10}84$: un $16\\,\\%$.",
        ja: "$\\log_{10}84$ で $16\\%$。",
        zh: "$\\log_{10}84$：差 $16\\%$。"
      } },
      { tex: "\\alpha+\\beta", correct: false, why: {
        en: "$\\log_{10}6$ is far from both $0$ and $1$.",
        fr: "$\\log_{10}6$ est loin de $0$ et de $1$.",
        es: "$\\log_{10}6$ está lejos de $0$ y de $1$.",
        ja: "$\\log_{10}6$ は $0$ からも $1$ からも遠い。",
        zh: "$\\log_{10}6$ 离 $0$、$1$ 都远。"
      } },
      { tex: "3\\alpha", correct: false, why: {
        en: "$\\log_{10}8$: $20\\%$ off.",
        fr: "$\\log_{10}8$ : écart de $20\\,\\%$.",
        es: "$\\log_{10}8$: un $20\\,\\%$.",
        ja: "$\\log_{10}8$ で $20\\%$。",
        zh: "$\\log_{10}8$：差 $20\\%$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Turn into products",
          fr: "Passer aux produits",
          es: "Pasar a productos",
          ja: "積に直す",
          zh: "化为乘积"
        },
        lines: ["2\\beta=\\log9,\\ 5\\alpha+\\beta=\\log96,\\ \\alpha+2\\gamma=\\log98,\\ 2\\alpha+5\\beta=\\log972,\\ 2\\alpha+\\beta+\\gamma=\\log84"],
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
          en: "Compare ratios",
          fr: "Comparer les rapports",
          es: "Comparar razones",
          ja: "比を比べる",
          zh: "比较比值"
        },
        lines: ["\\log\\tfrac{98}{100}\\approx-0.0088\\ \\text{is the smallest in size}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "A ratio $1-\\varepsilon$ gives a log distance of about $\\varepsilon\\log_{10}e$.",
          fr: "Un rapport $1-\\varepsilon$ donne un écart de log d’environ $\\varepsilon\\log_{10}e$.",
          es: "Una razón $1-\\varepsilon$ da una distancia logarítmica de unos $\\varepsilon\\log_{10}e$.",
          ja: "比 $1-\\varepsilon$ なら対数のずれは約 $\\varepsilon\\log_{10}e$。",
          zh: "比值 $1-\\varepsilon$ 对应对数偏差约 $\\varepsilon\\log_{10}e$。"
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
