/* geometry · The crossing tangent of two equal circles
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2020-crossing-common-tangent",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 16",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 16",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 16",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第16問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 16 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "The crossing tangent of two equal circles",
      fr: "La tangente commune intérieure de deux cercles égaux",
      es: "La tangente común interior de dos circunferencias iguales",
      ja: "等しい2円の内側の共通接線",
      zh: "两个等圆的内公切线"
    },
    statement: {
      en: "$C_1:(x+2)^2+(y-1)^2=3$ and $C_2:(x-4)^2+(y-1)^2=3$. A common tangent passes between the circles and has positive gradient; it makes an acute angle $\\theta$ with the $x$-axis. <b>Which of the following are true?</b>",
      fr: "$C_1:(x+2)^2+(y-1)^2=3$ et $C_2:(x-4)^2+(y-1)^2=3$. Une tangente commune passe entre les cercles avec une pente positive ; elle forme un angle aigu $\\theta$ avec l’axe des $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$C_1:(x+2)^2+(y-1)^2=3$ y $C_2:(x-4)^2+(y-1)^2=3$. Una tangente común pasa entre las circunferencias con pendiente positiva; forma un ángulo agudo $\\theta$ con el eje $x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$C_1:(x+2)^2+(y-1)^2=3$、$C_2:(x-4)^2+(y-1)^2=3$。2円の間を通る傾き正の共通接線が $x$ 軸となす鋭角を $\\theta$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$C_1:(x+2)^2+(y-1)^2=3$，$C_2:(x-4)^2+(y-1)^2=3$。一条从两圆之间穿过、斜率为正的公切线与 $x$ 轴成锐角 $\\theta$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two equal circles side by side.",
      fr: "Deux cercles égaux côte à côte.",
      es: "Dos circunferencias iguales lado a lado.",
      ja: "並んだ等しい2円。",
      zh: "并排的两个等圆。"
    },
    hint: {
      en: "By symmetry the tangent passes through the midpoint $(1,1)$ of the centres.",
      fr: "Par symétrie, la tangente passe par le milieu $(1,1)$ des centres.",
      es: "Por simetría la tangente pasa por el punto medio $(1,1)$ de los centros.",
      ja: "対称性より接線は中心の中点 $(1,1)$ を通る。",
      zh: "由对称性，切线过两圆心中点 $(1,1)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 2.6, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-4.5)) * 0.43636, 0.2 + (y - (-1.5)) * 0.44000];
      F.seg(S([-4.5, 0]), S([6.5, 0]), 'axis'); F.seg(S([0, -1.5]), S([0, 3.5]), 'axis');
      F.circle(S([-2, 1]), Math.sqrt(3) * 4.8 / 11, 'graph'); F.circle(S([4, 1]), Math.sqrt(3) * 4.8 / 11, 'graph'); F.dot(S([-2, 1])); F.dot(S([4, 1]));
      F.reveal = () => {
      const t = Math.atan(Math.SQRT1_2); F.seg(S([1 - 4 * Math.cos(t), 1 - 4 * Math.sin(t)]), S([1 + 4 * Math.cos(t), 1 + 4 * Math.sin(t)]), 'hl pink'); F.dot(S([1, 1])); F.seg(S([-2, 1]), S([4, 1]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the tangent passes through": {"fr": "la tangente passe par", "es": "la tangente pasa por", "ja": "接線は次を通る：", "zh": "切线经过"},
      "hypotenuse": {"fr": "hypoténuse", "es": "hipotenusa", "ja": "斜辺", "zh": "斜边"},
      "radius": {"fr": "rayon", "es": "radio", "ja": "半径", "zh": "半径"},
      "tangent length": {"fr": "longueur de tangente", "es": "longitud de tangente", "ja": "接線の長さ", "zh": "切线长"}
    },
    options: [
      { tex: "\\tan\\theta=\\tfrac{\\sqrt2}2", correct: true, why: {
        en: "$\\sin\\theta=\\tfrac{\\sqrt3}3$",
        fr: "$\\sin\\theta=\\tfrac{\\sqrt3}3$",
        es: "$\\sin\\theta=\\tfrac{\\sqrt3}3$",
        ja: "$\\sin\\theta=\\tfrac{\\sqrt3}3$",
        zh: "$\\sin\\theta=\\tfrac{\\sqrt3}3$"
      } },
      { tex: "\\text{the tangent passes through}\\ (1,1)", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "\\tan\\theta=\\tfrac{\\sqrt3}3", correct: false, why: {
        en: "Uses $\\sin\\theta$ as $\\tan\\theta$.",
        fr: "Confond $\\sin\\theta$ et $\\tan\\theta$.",
        es: "Confunde $\\sin\\theta$ y $\\tan\\theta$.",
        ja: "$\\sin\\theta$ と $\\tan\\theta$ の混同。",
        zh: "混淆了 $\\sin\\theta$ 与 $\\tan\\theta$。"
      } },
      { tex: "\\tan\\theta=\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tan\\theta=\\tfrac{\\sqrt3}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tan\\theta=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tan\\theta=\\tfrac{\\sqrt6}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\theta=30^\\circ", correct: false, why: {
        en: "$\\tan30^\\circ=\\tfrac{\\sqrt3}3$",
        fr: "$\\tan30^\\circ=\\tfrac{\\sqrt3}3$",
        es: "$\\tan30^\\circ=\\tfrac{\\sqrt3}3$",
        ja: "$\\tan30^\\circ=\\tfrac{\\sqrt3}3$",
        zh: "$\\tan30^\\circ=\\tfrac{\\sqrt3}3$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Right triangle",
          fr: "Triangle rectangle",
          es: "Triángulo rectángulo",
          ja: "直角三角形",
          zh: "直角三角形"
        },
        lines: ["\\text{hypotenuse}\\ 3,\\ \\text{radius}\\ \\sqrt3\\Rightarrow\\text{tangent length}\\ \\sqrt6"],
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
          en: "Angle",
          fr: "Angle",
          es: "Ángulo",
          ja: "角",
          zh: "角"
        },
        lines: ["\\tan\\theta=\\dfrac{\\sqrt3}{\\sqrt6}=\\dfrac{\\sqrt2}2"],
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
