/* calculus · Area between y = x² − 4|x| − 12 and the x-axis
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2022-area-x2-minus-4-abs-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 7",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 7",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 7",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第7問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 7 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Area between y = x² − 4|x| − 12 and the x-axis",
      fr: "Aire entre y = x² − 4|x| − 12 et l’axe des x",
      es: "Área entre y = x² − 4|x| − 12 y el eje x",
      ja: "y = x² − 4|x| − 12 と x 軸で囲まれた面積",
      zh: "y = x² − 4|x| − 12 与 x 轴围成的面积"
    },
    statement: {
      en: "Let $A$ be the area of the finite region enclosed by the curve $y=x^2-4|x|-12$ and the line $y=0$. <b>Which of the following are true?</b>",
      fr: "Soit $A$ l’aire de la région bornée délimitée par la courbe $y=x^2-4|x|-12$ et la droite $y=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $A$ el área de la región acotada entre la curva $y=x^2-4|x|-12$ y la recta $y=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $y=x^2-4|x|-12$ と直線 $y=0$ で囲まれた有界な領域の面積を $A$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设曲线 $y=x^2-4|x|-12$ 与直线 $y=0$ 围成的有界区域面积为 $A$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A W-shaped curve, symmetric about the y-axis, dipping below the x-axis.",
      fr: "Une courbe en W, symétrique par rapport à l’axe des y, passant sous l’axe des x.",
      es: "Una curva en W, simétrica respecto al eje y, que baja del eje x.",
      ja: "y 軸対称な W 字形の曲線が x 軸の下に沈む。",
      zh: "关于 y 轴对称的 W 形曲线，落在 x 轴下方。"
    },
    hint: {
      en: "Use symmetry: $A=2\\displaystyle\\int_0^{x_0}\\bigl(12+4x-x^2\\bigr)dx$ where $x_0>0$ is the root.",
      fr: "Symétrie : $A=2\\displaystyle\\int_0^{x_0}\\bigl(12+4x-x^2\\bigr)dx$ où $x_0>0$ est la racine.",
      es: "Simetría: $A=2\\displaystyle\\int_0^{x_0}\\bigl(12+4x-x^2\\bigr)dx$ con $x_0>0$ la raíz.",
      ja: "対称性：正の根 $x_0$ で $A=2\\displaystyle\\int_0^{x_0}\\bigl(12+4x-x^2\\bigr)dx$。",
      zh: "由对称性 $A=2\\displaystyle\\int_0^{x_0}\\bigl(12+4x-x^2\\bigr)dx$，$x_0>0$ 为根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 3.6, scale: 46, pad: 16 });
      const S = ([x, y]) => [2.6 + x * 0.34, 2.9 + y * 0.16];
      F.seg(S([-7.4, 0]), S([7.4, 0]), 'axis'); F.seg(S([0, -17]), S([0, 4]), 'axis');
      plot(F, S, x => x * x - 4 * Math.abs(x) - 12, -7.2, 7.2, 'graph', 'base', -17, 4);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 80; k++) { const x = -6 + 12 * k / 80; pts.push(S([x, x * x - 4 * Math.abs(x) - 12])); }
      F.path(pts, 'fill-yellow', 'fills'); F.text(S([6, 0]), '6', 'tick', 0, -10); F.text(S([-6, 0]), '−6', 'tick', 0, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "−6": {"fr": "−6", "es": "−6", "ja": "−6", "zh": "−6"},
      "the region lies between": {"fr": "la région est comprise entre", "es": "la región está entre", "ja": "領域は次の間にある：", "zh": "区域位于"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"}
    },
    options: [
      { tex: "A=144", correct: true, why: {
        en: "$2\\left[12x+2x^2-\\tfrac{x^3}3\\right]_0^6=2\\cdot72$",
        fr: "$2\\left[12x+2x^2-\\tfrac{x^3}3\\right]_0^6=2\\cdot72$",
        es: "$2\\left[12x+2x^2-\\tfrac{x^3}3\\right]_0^6=2\\cdot72$",
        ja: "$2\\left[12x+2x^2-\\tfrac{x^3}3\\right]_0^6=2\\cdot72$",
        zh: "$2\\left[12x+2x^2-\\tfrac{x^3}3\\right]_0^6=2\\cdot72$"
      } },
      { tex: "\\text{the region lies between}\\ x=-6\\ \\text{and}\\ x=6", correct: true, why: {
        en: "$x^2-4x-12=(x-6)(x+2)$",
        fr: "$x^2-4x-12=(x-6)(x+2)$",
        es: "$x^2-4x-12=(x-6)(x+2)$",
        ja: "$x^2-4x-12=(x-6)(x+2)$",
        zh: "$x^2-4x-12=(x-6)(x+2)$"
      } },
      { tex: "A=72", correct: false, why: {
        en: "Only one half of the region.",
        fr: "Seulement une moitié de la région.",
        es: "Solo la mitad de la región.",
        ja: "領域の半分だけ。",
        zh: "只算了一半。"
      } },
      { tex: "A=288", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=108", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=\\tfrac{256}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=\\tfrac{128}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=\\tfrac{176}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Roots for x ≥ 0",
          fr: "Racines pour x ≥ 0",
          es: "Raíces para x ≥ 0",
          ja: "x ≥ 0 での根",
          zh: "x ≥ 0 时的根"
        },
        lines: ["x^2-4x-12=(x-6)(x+2)\\Rightarrow x=6"],
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
          en: "Integrate and double",
          fr: "Intégrer et doubler",
          es: "Integrar y duplicar",
          ja: "積分して2倍",
          zh: "积分后乘 2"
        },
        lines: ["A=2\\int_0^6(12+4x-x^2)dx=2(72+72-72)=144"],
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
