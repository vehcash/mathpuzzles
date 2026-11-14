/* calculus · Where does x^(15/7) − x^(8/7) + x^(1/7) decrease?
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2021-where-a-seventh-root-function-falls",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 11",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 11",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 11",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第11問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 11 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Where does x^(15/7) − x^(8/7) + x^(1/7) decrease?",
      fr: "Où x^(15/7) − x^(8/7) + x^(1/7) décroît-elle ?",
      es: "¿Dónde decrece x^(15/7) − x^(8/7) + x^(1/7)?",
      ja: "x^(15/7) − x^(8/7) + x^(1/7) が減少する範囲",
      zh: "x^(15/7) − x^(8/7) + x^(1/7) 何处递减？"
    },
    statement: {
      en: "$f(x)=x^{15/7}-x^{8/7}+x^{1/7}$ for $0<x<1$. Let $\\lambda$ be the fraction of the interval $(0,1)$ on which $f$ is decreasing. <b>Which of the following are true?</b>",
      fr: "$f(x)=x^{15/7}-x^{8/7}+x^{1/7}$ pour $0<x<1$. Soit $\\lambda$ la proportion de l’intervalle $(0,1)$ où $f$ est décroissante. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=x^{15/7}-x^{8/7}+x^{1/7}$ para $0<x<1$. Sea $\\lambda$ la fracción del intervalo $(0,1)$ en la que $f$ decrece. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0<x<1$ で $f(x)=x^{15/7}-x^{8/7}+x^{1/7}$。$f$ が減少する部分が区間 $(0,1)$ に占める割合を $\\lambda$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$0<x<1$ 时 $f(x)=x^{15/7}-x^{8/7}+x^{1/7}$，设 $f$ 递减的部分占区间 $(0,1)$ 的比例为 $\\lambda$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of f on (0, 1).",
      fr: "Le graphe de f sur (0, 1).",
      es: "La gráfica de f en (0, 1).",
      ja: "(0, 1) での f のグラフ。",
      zh: "(0, 1) 上 f 的图像。"
    },
    hint: {
      en: "Factor out $\\tfrac17x^{-6/7}$ from $f'(x)$.",
      fr: "Factorisez $\\tfrac17x^{-6/7}$ dans $f'(x)$.",
      es: "Saca factor común $\\tfrac17x^{-6/7}$ en $f'(x)$.",
      ja: "$f'(x)$ から $\\tfrac17x^{-6/7}$ をくくり出す。",
      zh: "从 $f'(x)$ 中提出 $\\tfrac17x^{-6/7}$。"
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
      const S = ([x, y]) => [0.2 + (x - (-0.05)) * 4.18182, 0.2 + (y - (-0.05)) * 3.33333];
      const K = 4.18182;
      F.seg(S([-0.05, 0]), S([1.05, 0]), 'axis'); F.seg(S([0, -0.05]), S([0, 0.85]), 'axis');
      plot(F, S, x => x ** (15 / 7) - x ** (8 / 7) + x ** (1 / 7), 0.0005, 1, 'graph', 'base', -0.05, 0.85); F.text(S([1, 0]), '1', 'tick', 0, 14);
      F.reveal = () => {
      plot(F, S, x => x ** (15 / 7) - x ** (8 / 7) + x ** (1 / 7), 0.2, 1 / 3, 'hl pink', 'base', -0.05, 0.85); F.text(S([0.2, 0]), '1/5', 'tick', 0, 14); F.text(S([1 / 3, 0]), '1/3', 'tick', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "1/5": {"fr": "1/5", "es": "1/5", "ja": "1/5", "zh": "1/5"},
      "1/3": {"fr": "1/3", "es": "1/3", "ja": "1/3", "zh": "1/3"},
      "is decreasing on": {"fr": "est décroissante sur", "es": "es decreciente en", "ja": "は次で減少：", "zh": "在下列区间递减："}
    },
    options: [
      { tex: "\\lambda=\\tfrac2{15}", correct: true, why: {
        en: "$\\tfrac13-\\tfrac15$",
        fr: "$\\tfrac13-\\tfrac15$",
        es: "$\\tfrac13-\\tfrac15$",
        ja: "$\\tfrac13-\\tfrac15$",
        zh: "$\\tfrac13-\\tfrac15$"
      } },
      { tex: "f\\ \\text{is decreasing on}\\ \\left(\\tfrac15,\\tfrac13\\right)", correct: true, why: {
        en: "$(5x-1)(3x-1)<0$",
        fr: "$(5x-1)(3x-1)<0$",
        es: "$(5x-1)(3x-1)<0$",
        ja: "$(5x-1)(3x-1)<0$",
        zh: "$(5x-1)(3x-1)<0$"
      } },
      { tex: "\\lambda=\\tfrac{13}{15}", correct: false, why: {
        en: "That is where $f$ increases.",
        fr: "C’est là où $f$ croît.",
        es: "Ahí $f$ crece.",
        ja: "それは増加部分。",
        zh: "那是递增部分。"
      } },
      { tex: "\\lambda=\\tfrac1{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac15", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac8{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f\\ \\text{is decreasing on}\\ \\left(0,\\tfrac15\\right)", correct: false, why: {
        en: "$f'>0$",
        fr: "$f'>0$",
        es: "$f'>0$",
        ja: "$f'>0$",
        zh: "$f'>0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Differentiate",
          fr: "Dériver",
          es: "Derivar",
          ja: "微分",
          zh: "求导"
        },
        lines: ["f'(x)=\\tfrac17x^{-6/7}(15x^2-8x+1)=\\tfrac17x^{-6/7}(5x-1)(3x-1)"],
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
          en: "Sign",
          fr: "Signe",
          es: "Signo",
          ja: "符号",
          zh: "符号"
        },
        lines: ["f'<0\\iff\\tfrac15<x<\\tfrac13\\Rightarrow\\lambda=\\tfrac2{15}"],
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
