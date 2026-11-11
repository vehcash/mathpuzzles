/* calculus · An integral of a staircase
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2023-floor-log2-integral",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1J",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1J",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1J",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1J",
        zh: "牛津大学数学入学考试 MAT 2023 第 1J 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "An integral of a staircase",
      fr: "L’intégrale d’un escalier",
      es: "La integral de una escalera",
      ja: "階段関数の積分",
      zh: "阶梯函数的积分"
    },
    statement: {
      en: "For $0<x<2$, $f(x)=\\left(\\tfrac34\\right)^{\\lfloor\\log_2x\\rfloor}$, and $f(x)=0$ otherwise (for example $f\\!\\left(\\tfrac12\\right)=\\tfrac43$). <b>Which of the following equal $\\displaystyle\\int_0^2f(x)\\,dx$?</b>",
      fr: "Pour $0<x<2$, $f(x)=\\left(\\tfrac34\\right)^{\\lfloor\\log_2x\\rfloor}$, et $f(x)=0$ sinon (par exemple $f\\!\\left(\\tfrac12\\right)=\\tfrac43$). <b>Lesquelles des valeurs suivantes sont égales à $\\displaystyle\\int_0^2f(x)\\,dx$ ?</b>",
      es: "Para $0<x<2$, $f(x)=\\left(\\tfrac34\\right)^{\\lfloor\\log_2x\\rfloor}$, y $f(x)=0$ en otro caso (por ejemplo $f\\!\\left(\\tfrac12\\right)=\\tfrac43$). <b>¿Cuáles de los siguientes valores son iguales a $\\displaystyle\\int_0^2f(x)\\,dx$?</b>",
      ja: "$0<x<2$ で $f(x)=\\left(\\tfrac34\\right)^{\\lfloor\\log_2x\\rfloor}$、それ以外で $f(x)=0$ とします（例：$f\\!\\left(\\tfrac12\\right)=\\tfrac43$）。<b>$\\displaystyle\\int_0^2f(x)\\,dx$ に等しいものはどれですか？</b>",
      zh: "当 $0<x<2$ 时 $f(x)=\\left(\\tfrac34\\right)^{\\lfloor\\log_2x\\rfloor}$，否则 $f(x)=0$（例如 $f\\!\\left(\\tfrac12\\right)=\\tfrac43$）。<b>下列哪些等于 $\\displaystyle\\int_0^2f(x)\\,dx$？</b>"
    },
    figureText: {
      en: "A staircase: height 1 on [1, 2), 4/3 on [1/2, 1), 16/9 on [1/4, 1/2), and so on towards 0.",
      fr: "Un escalier : hauteur 1 sur [1, 2), 4/3 sur [1/2, 1), 16/9 sur [1/4, 1/2), et ainsi de suite vers 0.",
      es: "Una escalera: altura 1 en [1, 2), 4/3 en [1/2, 1), 16/9 en [1/4, 1/2), y así hacia 0.",
      ja: "階段：[1, 2) で 1、[1/2, 1) で 4/3、[1/4, 1/2) で 16/9、…と 0 に向かう。",
      zh: "阶梯：[1, 2) 高 1，[1/2, 1) 高 4/3，[1/4, 1/2) 高 16/9，依此向 0。"
    },
    hint: {
      en: "On $[2^{-k},2^{1-k})$ the value is $\\left(\\tfrac43\\right)^k$ and the width is $2^{-k}$. Add the rectangles.",
      fr: "Sur $[2^{-k},2^{1-k})$ la valeur est $\\left(\\tfrac43\\right)^k$ et la largeur $2^{-k}$. Additionnez les rectangles.",
      es: "En $[2^{-k},2^{1-k})$ el valor es $\\left(\\tfrac43\\right)^k$ y el ancho $2^{-k}$. Suma los rectángulos.",
      ja: "$[2^{-k},2^{1-k})$ で値は $\\left(\\tfrac43\\right)^k$、幅は $2^{-k}$。長方形を足す。",
      zh: "在 $[2^{-k},2^{1-k})$ 上值为 $\\left(\\tfrac43\\right)^k$，宽 $2^{-k}$，把矩形相加。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.4, h: 3.2, scale: 90, pad: 16 });
      const T = F.T = axes(F, -0.2, 2.2, -0.2, 3.0);
      for (let k = 0; k <= 7; k++) { const a = 2 ** -k, b = 2 ** (1 - k), h = (4 / 3) ** k; F.rect(T([a, 0])[0], T([0, 0])[1], b - a, Math.min(h, 2.6), 'fill-blue', 'fills'); F.seg(T([a, Math.min(h, 2.6)]), T([b, Math.min(h, 2.6)]), 'graph'); }
      [[1, '1'], [2, '2'], [0.5, '½']].forEach(([x, t]) => F.text(T([x, 0]), t, 'tick', 0, 14));
      F.reveal = () => {
      F.text(T([1.5, 1.5]), '1 + 2/3 + 4/9 + …', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1 + 2/3 + 4/9 + …": {"fr": "1 + 2/3 + 4/9 + …", "es": "1 + 2/3 + 4/9 + …", "ja": "1 + 2/3 + 4/9 + …", "zh": "1 + 2/3 + 4/9 + …"},
      "width": {"fr": "largeur", "es": "ancho", "ja": "幅", "zh": "宽"}
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k2^{-k}=\\sum\\left(\\tfrac23\\right)^k=3$.",
        fr: "$\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k2^{-k}=\\sum\\left(\\tfrac23\\right)^k=3$.",
        es: "$\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k2^{-k}=\\sum\\left(\\tfrac23\\right)^k=3$.",
        ja: "$\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k2^{-k}=\\sum\\left(\\tfrac23\\right)^k=3$。",
        zh: "$\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k2^{-k}=\\sum\\left(\\tfrac23\\right)^k=3$。"
      } },
      { tex: "\\tfrac{1}{1-\\frac23}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is only the step on $[1,2)$.",
        fr: "Seulement la marche sur $[1,2)$.",
        es: "Solo el escalón en $[1,2)$.",
        ja: "$[1,2)$ の段だけ。",
        zh: "只是 $[1,2)$ 上的一级。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "The heights grow, but the widths shrink faster: ratio $\\tfrac23<1$.",
        fr: "Les hauteurs croissent mais les largeurs décroissent plus vite : raison $\\tfrac23<1$.",
        es: "Las alturas crecen pero los anchos menguan más rápido: razón $\\tfrac23<1$.",
        ja: "高さは増えるが幅がより速く減る（比 $\\tfrac23<1$）。",
        zh: "高度增长但宽度缩得更快：公比 $\\tfrac23<1$。"
      } },
      { tex: "\\tfrac53", correct: false, why: {
        en: "That stops after two steps.",
        fr: "Cela s’arrête après deux marches.",
        es: "Se detiene tras dos escalones.",
        ja: "2段で止めている。",
        zh: "只算了两级。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The steps",
          fr: "Les marches",
          es: "Los escalones",
          ja: "段",
          zh: "各级"
        },
        lines: ["x\\in[2^{-k},2^{1-k}):\\ \\lfloor\\log_2x\\rfloor=-k,\\ f=\\left(\\tfrac43\\right)^k,\\ \\text{width}\\ 2^{-k}"],
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
          en: "Geometric series",
          fr: "Série géométrique",
          es: "Serie geométrica",
          ja: "等比級数",
          zh: "等比级数"
        },
        lines: ["\\int_0^2f=\\sum_{k\\ge0}\\left(\\tfrac43\\right)^k\\left(\\tfrac12\\right)^k=\\sum_{k\\ge0}\\left(\\tfrac23\\right)^k=\\boxed{3}"],
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
