/* combinatorics · The constant term of (x + 1 + 1/x)⁴
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2022-constant-term",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1E",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1E",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1E",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1E",
        zh: "牛津大学数学入学考试 MAT 2022 第 1E 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The constant term of (x + 1 + 1/x)⁴",
      fr: "Le terme constant de (x + 1 + 1/x)⁴",
      es: "El término independiente de (x + 1 + 1/x)⁴",
      ja: "(x + 1 + 1/x)⁴ の定数項",
      zh: "(x + 1 + 1/x)⁴ 的常数项"
    },
    statement: {
      en: "Expand $\\left(x+1+\\dfrac1x\\right)^4$. <b>Which of the following are true?</b>",
      fr: "On développe $\\left(x+1+\\dfrac1x\\right)^4$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Se desarrolla $\\left(x+1+\\dfrac1x\\right)^4$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\left(x+1+\\dfrac1x\\right)^4$ を展開します。<b>次のうち正しいものはどれですか？</b>",
      zh: "展开 $\\left(x+1+\\dfrac1x\\right)^4$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Four brackets, each giving x, 1 or 1/x.",
      fr: "Quatre parenthèses, chacune donne x, 1 ou 1/x.",
      es: "Cuatro paréntesis, cada uno da x, 1 o 1/x.",
      ja: "4つのかっこから x, 1, 1/x のどれかを選ぶ。",
      zh: "四个括号，每个取 x、1 或 1/x。"
    },
    hint: {
      en: "A constant term needs as many $x$’s as $1/x$’s: choose $0$, $1$ or $2$ of each.",
      fr: "Il faut autant de $x$ que de $1/x$ : $0$, $1$ ou $2$ de chaque.",
      es: "Hacen falta tantas $x$ como $1/x$: $0$, $1$ o $2$ de cada.",
      ja: "$x$ と $1/x$ を同じ個数：各 $0,1,2$ 個。",
      zh: "$x$ 与 $1/x$ 个数相同：各取 $0$、$1$ 或 $2$ 个。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 48, pad: 16 });
      for (let k = 0; k < 4; k++) { F.rect(0.25 + k * 1.55, 0.35, 1.35, 0.8, 'fill-blue', 'fills'); F.text([0.92 + k * 1.55, 0.75], 'x  1  1/x', 'len small', 0, 0); }
      F.reveal = () => {
      F.text([3.2, 1.35], '1 + 12 + 6 = 19', 'len small', 0, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x  1  1/x": {"fr": "x  1  1/x", "es": "x  1  1/x", "ja": "x  1  1/x", "zh": "x  1  1/x"},
      "1 + 12 + 6 = 19": {"fr": "1 + 12 + 6 = 19", "es": "1 + 12 + 6 = 19", "ja": "1 + 12 + 6 = 19", "zh": "1 + 12 + 6 = 19"},
      "the coefficient of": {"fr": "le coefficient de", "es": "el coeficiente de", "ja": "の係数", "zh": "的系数"},
      "is": {"fr": "vaut", "es": "es", "ja": "は", "zh": "为"},
      "pairs": {"fr": "paires", "es": "pares", "ja": "組", "zh": "对"},
      "pair": {"fr": "paire", "es": "par", "ja": "組", "zh": "对"}
    },
    options: [
      { tex: "19", correct: true, why: {
        en: "$1+12+6$",
        fr: "$1+12+6$",
        es: "$1+12+6$",
        ja: "$1+12+6$",
        zh: "$1+12+6$"
      } },
      { tex: "\\text{the coefficient of}\\ x\\ \\text{is}\\ 16", correct: true, why: {
        en: "$4+\\tfrac{4!}{2!\\,1!\\,1!}=4+12=16$",
        fr: "$4+\\tfrac{4!}{2!\\,1!\\,1!}=4+12=16$",
        es: "$4+\\tfrac{4!}{2!\\,1!\\,1!}=4+12=16$",
        ja: "$4+\\tfrac{4!}{2!\\,1!\\,1!}=4+12=16$",
        zh: "$4+\\tfrac{4!}{2!\\,1!\\,1!}=4+12=16$"
      } },
      { tex: "81", correct: false, why: {
        en: "That is the sum of all coefficients, $3^4$.",
        fr: "C’est la somme de tous les coefficients, $3^4$.",
        es: "Es la suma de todos los coeficientes, $3^4$.",
        ja: "全係数の和 $3^4$。",
        zh: "那是全部系数之和 $3^4$。"
      } },
      { tex: "14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "51", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "13", correct: false, why: {
        en: "Forgets the term $1\\cdot1\\cdot1\\cdot1$ and counts $x\\cdot\\tfrac1x$ pairs as $6$.",
        fr: "Oublie $1\\cdot1\\cdot1\\cdot1$ et compte mal les paires.",
        es: "Olvida $1\\cdot1\\cdot1\\cdot1$ y cuenta mal los pares.",
        ja: "$1\\cdot1\\cdot1\\cdot1$ を忘れ、組も数え違い。",
        zh: "漏了 $1\\cdot1\\cdot1\\cdot1$，配对也数错。"
      } },
      { tex: "\\text{the coefficient of}\\ x^4\\ \\text{is}\\ 4", correct: false, why: {
        en: "Only one way: $x$ from every bracket, so it is $1$.",
        fr: "Une seule façon : $x$ dans chaque parenthèse, donc $1$.",
        es: "Una sola forma: $x$ en cada paréntesis, luego $1$.",
        ja: "全部 $x$ を選ぶ1通りなので $1$。",
        zh: "只有每个都取 $x$ 一种，系数为 $1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Balanced choices",
          fr: "Choix équilibrés",
          es: "Elecciones equilibradas",
          ja: "釣り合う選び方",
          zh: "平衡的取法"
        },
        lines: ["0\\ \\text{pairs}:1,\\quad 1\\ \\text{pair}:4\\cdot3=12,\\quad 2\\ \\text{pairs}:\\binom42=6"],
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
          en: "Add",
          fr: "Additionner",
          es: "Sumar",
          ja: "足す",
          zh: "相加"
        },
        lines: ["1+12+6=19"],
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
