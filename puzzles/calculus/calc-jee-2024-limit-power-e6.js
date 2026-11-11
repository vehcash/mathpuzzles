/* calculus · A 1^∞ limit equal to e⁶
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-limit-power-e6",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.3",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.3",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.3",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.3",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.3"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A 1^∞ limit equal to e⁶",
      fr: "Une limite 1^∞ égale à e⁶",
      es: "Un límite 1^∞ igual a e⁶",
      ja: "e⁶ になる 1^∞ 型の極限",
      zh: "等于 e⁶ 的 1^∞ 型极限"
    },
    statement: {
      en: "For $k\\in\\mathbb R$, $\\displaystyle\\lim_{x\\to0^+}\\bigl(\\sin(\\sin kx)+\\cos x+x\\bigr)^{2/x}=e^6$. <b>Which of the following equal $k$?</b>",
      fr: "Pour $k\\in\\mathbb R$, $\\displaystyle\\lim_{x\\to0^+}\\bigl(\\sin(\\sin kx)+\\cos x+x\\bigr)^{2/x}=e^6$. <b>Lesquelles des valeurs suivantes sont égales à $k$ ?</b>",
      es: "Para $k\\in\\mathbb R$, $\\displaystyle\\lim_{x\\to0^+}\\bigl(\\sin(\\sin kx)+\\cos x+x\\bigr)^{2/x}=e^6$. <b>¿Cuáles de los siguientes valores son iguales a $k$?</b>",
      ja: "$k\\in\\mathbb R$ で $\\displaystyle\\lim_{x\\to0^+}\\bigl(\\sin(\\sin kx)+\\cos x+x\\bigr)^{2/x}=e^6$ です。<b>$k$ に等しいものはどれですか？</b>",
      zh: "设 $k\\in\\mathbb R$，$\\displaystyle\\lim_{x\\to0^+}\\bigl(\\sin(\\sin kx)+\\cos x+x\\bigr)^{2/x}=e^6$。<b>下列哪些等于 $k$？</b>"
    },
    figureText: {
      en: "Near 0 the base is 1 + (k + 1)x + …, sketched as a line through (0, 1).",
      fr: "Près de 0, la base vaut 1 + (k + 1)x + …, esquissée comme une droite par (0, 1).",
      es: "Cerca de 0 la base es 1 + (k + 1)x + …, dibujada como una recta por (0, 1).",
      ja: "0 の近くで底は 1 + (k + 1)x + …。(0, 1) を通る直線で描く。",
      zh: "在 0 附近底数为 1 + (k + 1)x + …，画成过 (0, 1) 的直线。"
    },
    hint: {
      en: "For a $1^\\infty$ form, $\\lim(1+u)^{v}=e^{\\lim uv}$. Expand the base to first order.",
      fr: "Pour une forme $1^\\infty$, $\\lim(1+u)^{v}=e^{\\lim uv}$. Développez la base au premier ordre.",
      es: "Para la forma $1^\\infty$, $\\lim(1+u)^{v}=e^{\\lim uv}$. Desarrolla la base a primer orden.",
      ja: "$1^\\infty$ 型は $\\lim(1+u)^{v}=e^{\\lim uv}$。底を1次まで展開。",
      zh: "$1^\\infty$ 型：$\\lim(1+u)^{v}=e^{\\lim uv}$。把底数展开到一阶。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.2, scale: 60, pad: 16 });
      const T = F.T = axes(F, -0.5, 3.5, -0.3, 2.9);
      F.dot(T([0, 1])); F.text(T([0, 1]), '1', 'tick', -10, 0);
      F.seg(T([0, 1]), T([1.5, 1]), 'seg thin dashc');
      F.reveal = () => {
      F.seg(T([0, 1]), T([0.6, 2.8]), 'hl pink'); F.text(T([0.6, 2.8]), 'slope k + 1 = 3', 'len small', 56, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "slope k + 1 = 3": {"fr": "pente k + 1 = 3", "es": "pendiente k + 1 = 3", "ja": "傾き k + 1 = 3", "zh": "斜率 k + 1 = 3"},
      "base": {"fr": "base", "es": "base", "ja": "底", "zh": "底数"}
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$2(k+1)=6$.",
        fr: "$2(k+1)=6$.",
        es: "$2(k+1)=6$.",
        ja: "$2(k+1)=6$。",
        zh: "$2(k+1)=6$。"
      } },
      { tex: "\\sqrt4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3", correct: false, why: {
        en: "This forgets the $+x$ term in the base.",
        fr: "Cela oublie le terme $+x$ de la base.",
        es: "Olvida el término $+x$ de la base.",
        ja: "底の $+x$ を忘れている。",
        zh: "漏掉了底数中的 $+x$。"
      } },
      { tex: "4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "6", correct: false, why: {
        en: "This forgets the exponent $2$.",
        fr: "Cela oublie l’exposant $2$.",
        es: "Olvida el exponente $2$.",
        ja: "指数の $2$ を忘れている。",
        zh: "漏掉了指数中的 $2$。"
      } },
      { tex: "5", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac32", correct: false, why: {
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
          en: "Expand the base",
          fr: "Développer la base",
          es: "Desarrollar la base",
          ja: "底の展開",
          zh: "展开底数"
        },
        lines: ["\\sin(\\sin kx)=kx+O(x^3),\\quad\\cos x=1+O(x^2)\\ \\Rightarrow\\ \\text{base}=1+(k+1)x+O(x^2)"],
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
          en: "Exponent of e",
          fr: "Exposant de e",
          es: "Exponente de e",
          ja: "e の指数",
          zh: "e 的指数"
        },
        lines: ["\\lim_{x\\to0^+}\\frac2x\\,(k+1)x=2(k+1)=6\\ \\Rightarrow\\ k=\\boxed{2}"],
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
