/* geometry · How close do y = x² + 4 and y = 2x − 2 get?
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 18 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2019-closest-approach-of-a-parabola-and-a-line",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 18",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 18",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 18",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第18問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 18 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "How close do y = x² + 4 and y = 2x − 2 get?",
      fr: "À quelle distance minimale sont y = x² + 4 et y = 2x − 2 ?",
      es: "¿Cuánto se acercan y = x² + 4 e y = 2x − 2?",
      ja: "y = x² + 4 と y = 2x − 2 の最短距離",
      zh: "y = x² + 4 与 y = 2x − 2 的最短距离"
    },
    statement: {
      en: "Let $\\delta$ be the shortest distance between a point on the curve $y=x^2+4$ and a point on the line $y=2x-2$. <b>Which of the following are true?</b>",
      fr: "Soit $\\delta$ la plus courte distance entre un point de la courbe $y=x^2+4$ et un point de la droite $y=2x-2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $\\delta$ la menor distancia entre un punto de la curva $y=x^2+4$ y un punto de la recta $y=2x-2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $y=x^2+4$ 上の点と直線 $y=2x-2$ 上の点の最短距離を $\\delta$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设曲线 $y=x^2+4$ 上的点与直线 $y=2x-2$ 上的点之间的最短距离为 $\\delta$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A parabola above a line that never meets it.",
      fr: "Une parabole au-dessus d’une droite qu’elle ne coupe pas.",
      es: "Una parábola sobre una recta que no corta.",
      ja: "交わらない直線の上の放物線。",
      zh: "位于一条不相交直线上方的抛物线。"
    },
    hint: {
      en: "The closest point on the curve has tangent parallel to the line: gradient $2$.",
      fr: "Au point le plus proche, la tangente est parallèle à la droite : pente $2$.",
      es: "En el punto más cercano la tangente es paralela a la recta: pendiente $2$.",
      ja: "最も近い点では接線が直線に平行：傾き $2$。",
      zh: "最近点处切线与直线平行：斜率为 $2$。"
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
      const S = ([x, y]) => [0.2 + (x - (-2.5)) * 0.70769, 0.2 + (y - (-3.5)) * 0.24000];
      const K = 0.70769;
      F.seg(S([-2.5, 0]), S([4, 0]), 'axis'); F.seg(S([0, -3.5]), S([0, 9]), 'axis');
      plot(F, S, x => x * x + 4, -2.2, 2.3, 'graph', 'base', -3.5, 9); plot(F, S, x => 2 * x - 2, -0.8, 4, 'graph', 'base', -3.5, 9);
      F.reveal = () => {
      F.dot(S([1, 5])); F.dot(S([3, 4])); F.seg(S([1, 5]), S([3, 4]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the closest point on the curve is": {"fr": "le point le plus proche sur la courbe est", "es": "el punto más cercano de la curva es", "ja": "曲線上の最も近い点は", "zh": "曲线上的最近点为"}
    },
    options: [
      { tex: "\\delta=\\sqrt5", correct: true, why: {
        en: "$\\tfrac{|2-5-2|}{\\sqrt5}$",
        fr: "$\\tfrac{|2-5-2|}{\\sqrt5}$",
        es: "$\\tfrac{|2-5-2|}{\\sqrt5}$",
        ja: "$\\tfrac{|2-5-2|}{\\sqrt5}$",
        zh: "$\\tfrac{|2-5-2|}{\\sqrt5}$"
      } },
      { tex: "\\text{the closest point on the curve is}\\ (1,5)", correct: true, why: {
        en: "$2x=2$",
        fr: "$2x=2$",
        es: "$2x=2$",
        ja: "$2x=2$",
        zh: "$2x=2$"
      } },
      { tex: "\\delta=5", correct: false, why: {
        en: "Forgets to divide by $\\sqrt5$.",
        fr: "Oublie de diviser par $\\sqrt5$.",
        es: "Olvida dividir entre $\\sqrt5$.",
        ja: "$\\sqrt5$ で割り忘れ。",
        zh: "忘了除以 $\\sqrt5$。"
      } },
      { tex: "\\delta=\\tfrac{6}{\\sqrt5}", correct: false, why: {
        en: "Uses the point $(0,4)$.",
        fr: "Utilise le point $(0,4)$.",
        es: "Usa el punto $(0,4)$.",
        ja: "点 $(0,4)$ を使った。",
        zh: "用了点 $(0,4)$。"
      } },
      { tex: "\\delta=2\\sqrt5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\delta=\\tfrac{\\sqrt5}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\delta=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the closest point on the curve is}\\ (0,4)", correct: false, why: {
        en: "$\\tfrac{6}{\\sqrt5}>\\sqrt5$",
        fr: "$\\tfrac{6}{\\sqrt5}>\\sqrt5$",
        es: "$\\tfrac{6}{\\sqrt5}>\\sqrt5$",
        ja: "$\\tfrac{6}{\\sqrt5}>\\sqrt5$",
        zh: "$\\tfrac{6}{\\sqrt5}>\\sqrt5$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Parallel tangent",
          fr: "Tangente parallèle",
          es: "Tangente paralela",
          ja: "平行な接線",
          zh: "平行切线"
        },
        lines: ["2x=2\\Rightarrow(1,5)"],
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
          en: "Point–line distance",
          fr: "Distance point–droite",
          es: "Distancia punto–recta",
          ja: "点と直線の距離",
          zh: "点到直线距离"
        },
        lines: ["\\frac{|2\\cdot1-5-2|}{\\sqrt{2^2+1}}=\\frac5{\\sqrt5}=\\sqrt5"],
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
