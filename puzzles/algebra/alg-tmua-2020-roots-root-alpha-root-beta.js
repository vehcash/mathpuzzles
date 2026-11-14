/* algebra · A quadratic with roots √α and √β
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-roots-root-alpha-root-beta",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 9",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 9",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 9",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第9問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 9 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "A quadratic with roots √α and √β",
      fr: "Une équation du second degré de racines √α et √β",
      es: "Una cuadrática con raíces √α y √β",
      ja: "根が √α, √β の2次式",
      zh: "以 √α、√β 为根的二次式"
    },
    statement: {
      en: "$\\alpha$ and $\\beta$ are the roots of $x^2-14x+9=0$. We want the monic quadratic with roots $\\sqrt\\alpha$ and $\\sqrt\\beta$. <b>Which of the following are true?</b>",
      fr: "$\\alpha$ et $\\beta$ sont les racines de $x^2-14x+9=0$. On cherche le trinôme unitaire de racines $\\sqrt\\alpha$ et $\\sqrt\\beta$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$\\alpha$ y $\\beta$ son las raíces de $x^2-14x+9=0$. Buscamos la cuadrática mónica con raíces $\\sqrt\\alpha$ y $\\sqrt\\beta$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\alpha,\\beta$ は $x^2-14x+9=0$ の根。根が $\\sqrt\\alpha,\\sqrt\\beta$ で最高次係数 1 の2次式を求めます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$\\alpha,\\beta$ 是 $x^2-14x+9=0$ 的根，求以 $\\sqrt\\alpha,\\sqrt\\beta$ 为根的首一二次式。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y = x² − 14x + 9 crossing the x-axis twice on the positive side.",
      fr: "La parabole y = x² − 14x + 9 coupant deux fois l’axe côté positif.",
      es: "La parábola y = x² − 14x + 9 cortando el eje dos veces en la parte positiva.",
      ja: "正の側で x 軸と2回交わる y = x² − 14x + 9。",
      zh: "y = x² − 14x + 9 在正半轴两次与 x 轴相交。"
    },
    hint: {
      en: "$(\\sqrt\\alpha+\\sqrt\\beta)^2=\\alpha+\\beta+2\\sqrt{\\alpha\\beta}$.",
      fr: "$(\\sqrt\\alpha+\\sqrt\\beta)^2=\\alpha+\\beta+2\\sqrt{\\alpha\\beta}$.",
      es: "$(\\sqrt\\alpha+\\sqrt\\beta)^2=\\alpha+\\beta+2\\sqrt{\\alpha\\beta}$.",
      ja: "$(\\sqrt\\alpha+\\sqrt\\beta)^2=\\alpha+\\beta+2\\sqrt{\\alpha\\beta}$。",
      zh: "$(\\sqrt\\alpha+\\sqrt\\beta)^2=\\alpha+\\beta+2\\sqrt{\\alpha\\beta}$。"
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
      const S = ([x, y]) => [0.2 + (x - (-1)) * 0.28750, 0.2 + (y - (-45)) * 0.05263];
      F.seg(S([-1, 0]), S([15, 0]), 'axis'); F.seg(S([0, -45]), S([0, 12]), 'axis');
      plot(F, S, x => x * x - 14 * x + 9, -0.6, 14.6, 'graph', 'base', -45, 12);
      F.reveal = () => {
      [7 - 2 * Math.sqrt(10), 7 + 2 * Math.sqrt(10)].forEach(r => F.dot(S([r, 0])));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "is negative": {"fr": "est négatif", "es": "es negativo", "ja": "は負", "zh": "为负"}
    },
    options: [
      { tex: "x^2-2\\sqrt5\\,x+3", correct: true, why: {
        en: "$\\sqrt{20}=2\\sqrt5$",
        fr: "$\\sqrt{20}=2\\sqrt5$",
        es: "$\\sqrt{20}=2\\sqrt5$",
        ja: "$\\sqrt{20}=2\\sqrt5$",
        zh: "$\\sqrt{20}=2\\sqrt5$"
      } },
      { tex: "\\sqrt\\alpha\\sqrt\\beta=3", correct: true, why: {
        en: "$\\sqrt9$",
        fr: "$\\sqrt9$",
        es: "$\\sqrt9$",
        ja: "$\\sqrt9$",
        zh: "$\\sqrt9$"
      } },
      { tex: "x^2-\\sqrt{14}\\,x+3", correct: false, why: {
        en: "Takes $\\sqrt\\alpha+\\sqrt\\beta=\\sqrt{\\alpha+\\beta}$.",
        fr: "Prend $\\sqrt\\alpha+\\sqrt\\beta=\\sqrt{\\alpha+\\beta}$.",
        es: "Toma $\\sqrt\\alpha+\\sqrt\\beta=\\sqrt{\\alpha+\\beta}$.",
        ja: "$\\sqrt\\alpha+\\sqrt\\beta=\\sqrt{\\alpha+\\beta}$ と誤認。",
        zh: "误以为 $\\sqrt\\alpha+\\sqrt\\beta=\\sqrt{\\alpha+\\beta}$。"
      } },
      { tex: "x^2-\\sqrt{20}\\,x+9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x^2-\\sqrt{8}\\,x+3", correct: false, why: {
        en: "$14-6\\ne14+6$",
        fr: "$14-6\\ne14+6$",
        es: "$14-6\\ne14+6$",
        ja: "$14-6\\ne14+6$",
        zh: "$14-6\\ne14+6$"
      } },
      { tex: "x^2+2\\sqrt5\\,x+3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x^2-20x+3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\alpha\\ \\text{or}\\ \\beta\\ \\text{is negative}", correct: false, why: {
        en: "$\\alpha+\\beta>0,\\ \\alpha\\beta>0$",
        fr: "$\\alpha+\\beta>0,\\ \\alpha\\beta>0$",
        es: "$\\alpha+\\beta>0,\\ \\alpha\\beta>0$",
        ja: "$\\alpha+\\beta>0,\\ \\alpha\\beta>0$",
        zh: "$\\alpha+\\beta>0,\\ \\alpha\\beta>0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Sum of square roots",
          fr: "Somme des racines carrées",
          es: "Suma de raíces cuadradas",
          ja: "平方根の和",
          zh: "平方根之和"
        },
        lines: ["(\\sqrt\\alpha+\\sqrt\\beta)^2=14+2\\cdot3=20"],
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
          en: "Build the quadratic",
          fr: "Former le trinôme",
          es: "Formar la cuadrática",
          ja: "2次式を作る",
          zh: "写出二次式"
        },
        lines: ["x^2-\\sqrt{20}\\,x+3"],
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
