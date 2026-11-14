/* calculus · Trapezium rule for 2 log₁₀ x
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2021-trapezium-rule-for-two-log",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 10",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 10",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 10",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第10問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 10 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Trapezium rule for 2 log₁₀ x",
      fr: "Méthode des trapèzes pour 2 log₁₀ x",
      es: "Regla del trapecio para 2 log₁₀ x",
      ja: "2 log₁₀ x の台形公式",
      zh: "2 log₁₀ x 的梯形法"
    },
    statement: {
      en: "The trapezium rule with $3$ strips of equal width is used to estimate $\\displaystyle\\int_{1/2}^{2}2\\log_{10}x\\,dx$. Let $E$ be the estimate. <b>Which of the following are true?</b>",
      fr: "On estime $\\displaystyle\\int_{1/2}^{2}2\\log_{10}x\\,dx$ par la méthode des trapèzes avec $3$ bandes de même largeur. Soit $E$ l’estimation. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Se estima $\\displaystyle\\int_{1/2}^{2}2\\log_{10}x\\,dx$ con la regla del trapecio y $3$ franjas iguales. Sea $E$ la estimación. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "等幅 $3$ 区間の台形公式で $\\displaystyle\\int_{1/2}^{2}2\\log_{10}x\\,dx$ を近似し、その値を $E$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "用 $3$ 个等宽梯形估计 $\\displaystyle\\int_{1/2}^{2}2\\log_{10}x\\,dx$，估计值为 $E$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The log curve over [1/2, 2] with three trapezia.",
      fr: "La courbe log sur [1/2, 2] avec trois trapèzes.",
      es: "La curva log en [1/2, 2] con tres trapecios.",
      ja: "[1/2, 2] の対数曲線と3つの台形。",
      zh: "[1/2, 2] 上的对数曲线与三个梯形。"
    },
    hint: {
      en: "$h=\\tfrac12$; use $\\log a+\\log b=\\log ab$.",
      fr: "$h=\\tfrac12$ ; utilisez $\\log a+\\log b=\\log ab$.",
      es: "$h=\\tfrac12$; usa $\\log a+\\log b=\\log ab$.",
      ja: "$h=\\tfrac12$。$\\log a+\\log b=\\log ab$ を使う。",
      zh: "$h=\\tfrac12$，利用 $\\log a+\\log b=\\log ab$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (0)) * 2.00000, 0.2 + (y - (-0.75)) * 2.00000];
      const K = 2.00000;
      F.seg(S([0, 0]), S([2.3, 0]), 'axis'); F.seg(S([0, -0.75]), S([0, 0.75]), 'axis');
      plot(F, S, x => 2 * Math.log10(x), 0.45, 2.2, 'graph', 'base', -0.75, 0.75); [0.5, 1, 1.5, 2].forEach(x => F.seg(S([x, 0]), S([x, 2 * Math.log10(x)]), 'seg thin dashc'));
      F.reveal = () => {
      F.path([0.5, 1, 1.5, 2].map(x => S([x, 2 * Math.log10(x)])), 'hl pink', 'base', false);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is less than the true integral": {"fr": "est inférieure à l’intégrale exacte", "es": "es menor que la integral exacta", "ja": "は真の積分より小さい", "zh": "小于真实积分"},
      "is greater than the true integral": {"fr": "est supérieure à l’intégrale exacte", "es": "es mayor que la integral exacta", "ja": "は真の積分より大きい", "zh": "大于真实积分"}
    },
    options: [
      { tex: "E=\\log_{10}\\tfrac32", correct: true, why: {
        en: "$\\tfrac14\\log_{10}\\!\\left(\\tfrac14\\cdot\\tfrac{81}{16}\\cdot4\\right)\\cdot2$",
        fr: "$\\tfrac14\\log_{10}\\!\\left(\\tfrac14\\cdot\\tfrac{81}{16}\\cdot4\\right)\\cdot2$",
        es: "$\\tfrac14\\log_{10}\\!\\left(\\tfrac14\\cdot\\tfrac{81}{16}\\cdot4\\right)\\cdot2$",
        ja: "$\\tfrac14\\log_{10}\\!\\left(\\tfrac14\\cdot\\tfrac{81}{16}\\cdot4\\right)\\cdot2$",
        zh: "$\\tfrac14\\log_{10}\\!\\left(\\tfrac14\\cdot\\tfrac{81}{16}\\cdot4\\right)\\cdot2$"
      } },
      { tex: "E\\ \\text{is less than the true integral}", correct: true, why: {
        en: "The curve is concave, so chords lie below it.",
        fr: "La courbe est concave : les cordes sont en dessous.",
        es: "La curva es cóncava: las cuerdas quedan debajo.",
        ja: "上に凸なので弦は曲線の下。",
        zh: "曲线上凸，弦在曲线下方。"
      } },
      { tex: "E=\\log_{10}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "E=\\log_{10}\\tfrac94", correct: false, why: {
        en: "Forgets the factor $\\tfrac12$ in the rule.",
        fr: "Oublie le facteur $\\tfrac12$.",
        es: "Olvida el factor $\\tfrac12$.",
        ja: "$\\tfrac12$ を忘れた。",
        zh: "漏了因子 $\\tfrac12$。"
      } },
      { tex: "E=2\\log_{10}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "E=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "E=\\log_{10}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "E\\ \\text{is greater than the true integral}", correct: false, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } }
    ],
    steps: [
      {
        title: {
          en: "Rule",
          fr: "Formule",
          es: "Fórmula",
          ja: "公式",
          zh: "公式"
        },
        lines: ["E=\\tfrac14\\bigl[f(\\tfrac12)+2f(1)+2f(\\tfrac32)+f(2)\\bigr]"],
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
          en: "Logs",
          fr: "Logarithmes",
          es: "Logaritmos",
          ja: "対数",
          zh: "对数"
        },
        lines: ["=\\tfrac14\\bigl[2\\log\\tfrac12+4\\log\\tfrac32+2\\log2\\bigr]=\\log_{10}\\tfrac32"],
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
