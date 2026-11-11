/* number · Adding up everything that is not a power of 3
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023-sum-of-non-powers-of-3",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1E",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1E",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1E",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1E",
        zh: "牛津大学数学入学考试 MAT 2023 第 1E 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Adding up everything that is not a power of 3",
      fr: "Additionner tout ce qui n’est pas une puissance de 3",
      es: "Sumar todo lo que no es potencia de 3",
      ja: "3 の累乗以外をすべて足す",
      zh: "把不是 3 的幂的数都加起来"
    },
    statement: {
      en: "<b>Which of the following equal the sum of all positive whole numbers less than $3^{10}$ that are not powers of $3$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à la somme des entiers positifs inférieurs à $3^{10}$ qui ne sont pas des puissances de $3$ ?</b>",
      es: "<b>¿Cuáles de las siguientes expresiones son iguales a la suma de los enteros positivos menores que $3^{10}$ que no son potencias de $3$?</b>",
      ja: "<b>$3^{10}$ 未満の正の整数のうち、3 の累乗でないものの和に等しいものはどれですか？</b>",
      zh: "<b>小于 $3^{10}$ 且不是 $3$ 的幂的正整数之和等于下列哪些？</b>"
    },
    figureText: {
      en: "The numbers 1, 2, 3, …, 3¹⁰ − 1 in a row with the powers of 3 (1, 3, 9, 27, …) crossed out.",
      fr: "Les nombres 1, 2, 3, …, 3¹⁰ − 1 en ligne, les puissances de 3 (1, 3, 9, 27, …) barrées.",
      es: "Los números 1, 2, 3, …, 3¹⁰ − 1 en fila, con las potencias de 3 (1, 3, 9, 27, …) tachadas.",
      ja: "1, 2, 3, …, 3¹⁰ − 1 を並べ、3 の累乗（1, 3, 9, 27, …）を消す。",
      zh: "把 1, 2, 3, …, 3¹⁰ − 1 排成一行，划掉 3 的幂（1, 3, 9, 27, …）。"
    },
    hint: {
      en: "Sum everything with the triangular-number formula, then subtract $1+3+\\dots+3^9$.",
      fr: "Sommez tout avec la formule des nombres triangulaires, puis retirez $1+3+\\dots+3^9$.",
      es: "Suma todo con la fórmula de los números triangulares y resta $1+3+\\dots+3^9$.",
      ja: "三角数の公式で全部足し、$1+3+\\dots+3^9$ を引く。",
      zh: "用三角形数公式求总和，再减去 $1+3+\\dots+3^9$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.4, scale: 50, pad: 16 });
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '…'].forEach((t, k) => { F.text([0.4 + k * 0.58, 0.7], t, 'len', 0, 0); if (['1', '3', '9'].includes(t)) F.seg([0.2 + k * 0.58, 0.55], [0.6 + k * 0.58, 0.85], 'hl pink'); });
      F.reveal = () => {
      F.text([3.3, 0.1], 'N = 3¹⁰ − 1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "N = 3¹⁰ − 1": {"fr": "N = 3¹⁰ − 1", "es": "N = 3¹⁰ − 1", "ja": "N = 3¹⁰ − 1", "zh": "N = 3¹⁰ − 1"}
    },
    options: [
      { tex: "\\tfrac{(3^{10}-1)^2}{2}", correct: true, why: {
        en: "$\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2$ with $N=3^{10}-1$.",
        fr: "$\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2$ avec $N=3^{10}-1$.",
        es: "$\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2$ con $N=3^{10}-1$.",
        ja: "$N=3^{10}-1$ として $\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2$。",
        zh: "$N=3^{10}-1$，$\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2$。"
      } },
      { tex: "\\tfrac{3^{20}-2\\cdot3^{10}+1}{2}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{(3^{11}-1)^2}{2}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3\\cdot\\tfrac{(3^{10}-1)^2}{2}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(3^{10}-1)^2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(3^{11}-1)^2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{3^{10}(3^{10}-1)}{2}", correct: false, why: {
        en: "That is the sum of everything, before removing the powers of $3$.",
        fr: "C’est la somme de tout, avant de retirer les puissances de $3$.",
        es: "Es la suma de todo, antes de quitar las potencias de $3$.",
        ja: "3 の累乗を除く前の総和。",
        zh: "那是去掉 3 的幂之前的总和。"
      } },
      { tex: "\\tfrac{3^{10}-1}{2}", correct: false, why: {
        en: "That is $1+3+\\dots+3^9$, the part removed.",
        fr: "C’est $1+3+\\dots+3^9$, la partie retirée.",
        es: "Es $1+3+\\dots+3^9$, la parte quitada.",
        ja: "除いた部分 $1+3+\\dots+3^9$。",
        zh: "那是被去掉的 $1+3+\\dots+3^9$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All of them",
          fr: "Tous",
          es: "Todos",
          ja: "全部",
          zh: "全部"
        },
        lines: ["1+2+\\dots+N=\\tfrac{N(N+1)}2,\\quad N=3^{10}-1"],
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
          en: "The powers of 3",
          fr: "Les puissances de 3",
          es: "Las potencias de 3",
          ja: "3 の累乗",
          zh: "3 的幂"
        },
        lines: ["1+3+\\dots+3^9=\\tfrac{3^{10}-1}{2}=\\tfrac N2"],
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
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "引く",
          zh: "相减"
        },
        lines: ["\\tfrac{N(N+1)}2-\\tfrac N2=\\tfrac{N^2}2=\\boxed{\\tfrac{(3^{10}-1)^2}2}"],
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
