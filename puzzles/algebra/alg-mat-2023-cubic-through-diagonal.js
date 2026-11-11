/* algebra · A cubic through (0,0), (1,1), (2,2) with a double root
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023-cubic-through-diagonal",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2023 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A cubic through (0,0), (1,1), (2,2) with a double root",
      fr: "Une cubique par (0,0), (1,1), (2,2) avec une racine double",
      es: "Una cúbica por (0,0), (1,1), (2,2) con raíz doble",
      ja: "(0,0), (1,1), (2,2) を通り重解をもつ3次式",
      zh: "过 (0,0)、(1,1)、(2,2) 且有重根的三次式"
    },
    statement: {
      en: "The cubic $p$ satisfies $p(0)=0$, $p(1)=1$, $p(2)=2$ and has a repeated root at $x=M>0$. <b>Which of the following equal $M$?</b>",
      fr: "La cubique $p$ vérifie $p(0)=0$, $p(1)=1$, $p(2)=2$ et a une racine double en $x=M>0$. <b>Lesquelles des valeurs suivantes sont égales à $M$ ?</b>",
      es: "La cúbica $p$ cumple $p(0)=0$, $p(1)=1$, $p(2)=2$ y tiene una raíz doble en $x=M>0$. <b>¿Cuáles de los siguientes valores son iguales a $M$?</b>",
      ja: "3次式 $p$ は $p(0)=0$、$p(1)=1$、$p(2)=2$ を満たし、$x=M>0$ に重解をもちます。<b>$M$ に等しいものはどれですか？</b>",
      zh: "三次多项式 $p$ 满足 $p(0)=0$，$p(1)=1$，$p(2)=2$，且在 $x=M>0$ 处有重根。<b>下列哪些等于 $M$？</b>"
    },
    figureText: {
      en: "The line y = x with the three points (0, 0), (1, 1), (2, 2) on it.",
      fr: "La droite y = x avec les trois points (0, 0), (1, 1), (2, 2).",
      es: "La recta y = x con los tres puntos (0, 0), (1, 1), (2, 2).",
      ja: "直線 y = x 上の3点 (0, 0), (1, 1), (2, 2)。",
      zh: "直线 y = x 上的三点 (0, 0)、(1, 1)、(2, 2)。"
    },
    hint: {
      en: "$p(x)-x$ vanishes at $0,1,2$, so $p(x)=x+kx(x-1)(x-2)$.",
      fr: "$p(x)-x$ s’annule en $0,1,2$, donc $p(x)=x+kx(x-1)(x-2)$.",
      es: "$p(x)-x$ se anula en $0,1,2$, así que $p(x)=x+kx(x-1)(x-2)$.",
      ja: "$p(x)-x$ は $0,1,2$ で $0$ なので $p(x)=x+kx(x-1)(x-2)$。",
      zh: "$p(x)-x$ 在 $0,1,2$ 处为零，故 $p(x)=x+kx(x-1)(x-2)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 64, pad: 16 });
      const T = F.T = axes(F, -0.6, 3.0, -0.6, 3.0);
      F.seg(T([-0.5, -0.5]), T([2.9, 2.9]), 'seg thin dashc'); [0, 1, 2].forEach(x => F.dot(T([x, x])));
      F.reveal = () => {
      plot(F, T, x => x + 4 * x * (x - 1) * (x - 2), -0.15, 2.3, 'graph', 'base', -0.6, 3.0); F.dot(T([1.5, 0])); F.text(T([1.5, 0]), 'M', 'pt', 0, 14);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac32", correct: true, why: {
        en: "$k=4$: $p=x(4x^2-12x+9)=x(2x-3)^2$.",
        fr: "$k=4$ : $p=x(4x^2-12x+9)=x(2x-3)^2$.",
        es: "$k=4$: $p=x(4x^2-12x+9)=x(2x-3)^2$.",
        ja: "$k=4$ で $p=x(2x-3)^2$。",
        zh: "$k=4$：$p=x(2x-3)^2$。"
      } },
      { tex: "1.5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac76", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac65", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac54", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "$0$ is a simple root, and $M>0$ anyway.",
        fr: "$0$ est une racine simple, et $M>0$.",
        es: "$0$ es raíz simple, y además $M>0$.",
        ja: "$0$ は単解で、そもそも $M>0$。",
        zh: "$0$ 是单根，且 $M>0$。"
      } },
      { tex: "3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Shape of p",
          fr: "Forme de p",
          es: "Forma de p",
          ja: "p の形",
          zh: "p 的形式"
        },
        lines: ["p(x)=x+kx(x-1)(x-2)=x\\bigl(kx^2-3kx+2k+1\\bigr)"],
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
          en: "Double root",
          fr: "Racine double",
          es: "Raíz doble",
          ja: "重解",
          zh: "重根"
        },
        lines: ["9k^2-4k(2k+1)=k^2-4k=0\\ \\Rightarrow\\ k=4", "M=\\frac{3k}{2k}=\\boxed{\\tfrac32}"],
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
