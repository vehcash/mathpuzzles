/* calculus · ∫₁⁴ (3 − 2x)/(x√x) dx
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2018-integral-of-three-minus-two-x-over-x-root-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 1",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 1",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 1",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第1問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 1 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "∫₁⁴ (3 − 2x)/(x√x) dx",
      fr: "∫₁⁴ (3 − 2x)/(x√x) dx",
      es: "∫₁⁴ (3 − 2x)/(x√x) dx",
      ja: "∫₁⁴ (3 − 2x)/(x√x) dx",
      zh: "∫₁⁴ (3 − 2x)/(x√x) dx"
    },
    statement: {
      en: "Let $I=\\displaystyle\\int_1^4\\frac{3-2x}{x\\sqrt x}\\,dx$. <b>Which of the following are true?</b>",
      fr: "Soit $I=\\displaystyle\\int_1^4\\frac{3-2x}{x\\sqrt x}\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $I=\\displaystyle\\int_1^4\\frac{3-2x}{x\\sqrt x}\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$I=\\displaystyle\\int_1^4\\frac{3-2x}{x\\sqrt x}\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $I=\\displaystyle\\int_1^4\\frac{3-2x}{x\\sqrt x}\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The integrand over [1, 4], crossing zero at x = 1.5.",
      fr: "L’intégrande sur [1, 4], nulle en x = 1,5.",
      es: "El integrando en [1, 4], nulo en x = 1,5.",
      ja: "[1, 4] の被積分関数（x = 1.5 で 0）。",
      zh: "[1, 4] 上的被积函数，在 x = 1.5 处为零。"
    },
    hint: {
      en: "Split: $3x^{-3/2}-2x^{-1/2}$.",
      fr: "Séparez : $3x^{-3/2}-2x^{-1/2}$.",
      es: "Separa: $3x^{-3/2}-2x^{-1/2}$.",
      ja: "$3x^{-3/2}-2x^{-1/2}$ に分ける。",
      zh: "拆成 $3x^{-3/2}-2x^{-1/2}$。"
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
      const S = ([x, y]) => [0.2 + (x - (0.7)) * 1.27778, 0.2 + (y - (-1.1)) * 1.30435];
      const K = 1.27778;
      F.seg(S([0.7, 0]), S([4.3, 0]), 'axis'); 
      plot(F, S, x => (3 - 2 * x) / (x * Math.sqrt(x)), 0.85, 4.2, 'graph', 'base', -1.1, 1.2); F.text(S([1, 0]), '1', 'tick', 0, 14); F.text(S([4, 0]), '4', 'tick', 0, -10);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 60; k++) { const x = 1 + 3 * k / 60; pts.push(S([x, (3 - 2 * x) / (x * Math.sqrt(x))])); } F.path([S([1, 0])].concat(pts, [S([4, 0])]), 'fill-yellow', 'fills');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "an antiderivative is": {"fr": "une primitive est", "es": "una primitiva es", "ja": "原始関数の1つは", "zh": "一个原函数为"}
    },
    options: [
      { tex: "I=-1", correct: true, why: {
        en: "$[-6x^{-1/2}-4x^{1/2}]_1^4=-11+10$",
        fr: "$[-6x^{-1/2}-4x^{1/2}]_1^4=-11+10$",
        es: "$[-6x^{-1/2}-4x^{1/2}]_1^4=-11+10$",
        ja: "$[-6x^{-1/2}-4x^{1/2}]_1^4=-11+10$",
        zh: "$[-6x^{-1/2}-4x^{1/2}]_1^4=-11+10$"
      } },
      { tex: "\\text{an antiderivative is}\\ -6x^{-1/2}-4x^{1/2}", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "I=1", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "I=-\\tfrac{13}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=-5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=-\\tfrac72", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{an antiderivative is}\\ 6x^{-1/2}-4x^{1/2}", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Split",
          fr: "Séparer",
          es: "Separar",
          ja: "分ける",
          zh: "拆分"
        },
        lines: ["\\frac{3-2x}{x^{3/2}}=3x^{-3/2}-2x^{-1/2}"],
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
          en: "Evaluate",
          fr: "Calculer",
          es: "Calcular",
          ja: "計算",
          zh: "计算"
        },
        lines: ["\\bigl[-6x^{-1/2}-4x^{1/2}\\bigr]_1^4=(-3-8)-(-6-4)=-1"],
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
