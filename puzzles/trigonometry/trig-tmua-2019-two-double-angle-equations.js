/* trigonometry · Two equations in sin 2x and cos 2x
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2019-two-double-angle-equations",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 14",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 14",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 14",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第14問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 14 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Two equations in sin 2x and cos 2x",
      fr: "Deux équations en sin 2x et cos 2x",
      es: "Dos ecuaciones en sen 2x y cos 2x",
      ja: "sin 2x と cos 2x の連立方程式",
      zh: "关于 sin 2x 与 cos 2x 的方程组"
    },
    statement: {
      en: "For $0^\\circ\\le x\\le360^\\circ$, $\\sin2x+\\sqrt3\\cos2x=-1$ and $\\sqrt3\\sin2x-\\cos2x=\\sqrt3$. Let $T$ be the sum of all such $x$. <b>Which of the following are true?</b>",
      fr: "Pour $0^\\circ\\le x\\le360^\\circ$, $\\sin2x+\\sqrt3\\cos2x=-1$ et $\\sqrt3\\sin2x-\\cos2x=\\sqrt3$. Soit $T$ la somme de tous ces $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $0^\\circ\\le x\\le360^\\circ$, $\\sin2x+\\sqrt3\\cos2x=-1$ y $\\sqrt3\\sin2x-\\cos2x=\\sqrt3$. Sea $T$ la suma de todos esos $x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0^\\circ\\le x\\le360^\\circ$ で $\\sin2x+\\sqrt3\\cos2x=-1$ かつ $\\sqrt3\\sin2x-\\cos2x=\\sqrt3$。そのような $x$ の和を $T$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$0^\\circ\\le x\\le360^\\circ$ 时 $\\sin2x+\\sqrt3\\cos2x=-1$ 且 $\\sqrt3\\sin2x-\\cos2x=\\sqrt3$，设所有满足的 $x$ 之和为 $T$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The unit circle with the angle 2x.",
      fr: "Le cercle unité avec l’angle 2x.",
      es: "La circunferencia unidad con el ángulo 2x.",
      ja: "単位円と角 2x。",
      zh: "单位圆与角 2x。"
    },
    hint: {
      en: "Treat $S=\\sin2x$, $C=\\cos2x$ as unknowns of a linear system.",
      fr: "Traitez $S=\\sin2x$, $C=\\cos2x$ comme inconnues d’un système linéaire.",
      es: "Trata $S=\\sin2x$, $C=\\cos2x$ como incógnitas de un sistema lineal.",
      ja: "$S=\\sin2x$、$C=\\cos2x$ を未知数とする連立1次方程式。",
      zh: "把 $S=\\sin2x$、$C=\\cos2x$ 当作线性方程组的未知数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 46, pad: 16 });
      F.circle([1.7, 1.7], 1.3, 'graph'); F.seg([0.2, 1.7], [3.2, 1.7], 'axis'); F.seg([1.7, 0.2], [1.7, 3.2], 'axis');
      F.reveal = () => {
      const t = 150 * Math.PI / 180; F.seg([1.7, 1.7], [1.7 + 1.3 * Math.cos(t), 1.7 + 1.3 * Math.sin(t)], 'hl pink'); F.text([1.7 + 1.3 * Math.cos(t), 1.7 + 1.3 * Math.sin(t)], '2x = 150°', 'len small', -10, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2x = 150°": {"fr": "2x = 150°", "es": "2x = 150°", "ja": "2x = 150°", "zh": "2x = 150°"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"}
    },
    options: [
      { tex: "T=330^\\circ", correct: true, why: {
        en: "$75^\\circ+255^\\circ$",
        fr: "$75^\\circ+255^\\circ$",
        es: "$75^\\circ+255^\\circ$",
        ja: "$75^\\circ+255^\\circ$",
        zh: "$75^\\circ+255^\\circ$"
      } },
      { tex: "\\sin2x=\\tfrac12\\ \\text{and}\\ \\cos2x=-\\tfrac{\\sqrt3}2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "T=75^\\circ", correct: false, why: {
        en: "Only one solution.",
        fr: "Une seule solution.",
        es: "Solo una solución.",
        ja: "解が1つだけ。",
        zh: "只算了一个解。"
      } },
      { tex: "T=150^\\circ", correct: false, why: {
        en: "That is $2x$, not $x$.",
        fr: "C’est $2x$, pas $x$.",
        es: "Es $2x$, no $x$.",
        ja: "$x$ でなく $2x$。",
        zh: "那是 $2x$。"
      } },
      { tex: "T=660^\\circ", correct: false, why: {
        en: "Sums the values of $2x$.",
        fr: "Somme les valeurs de $2x$.",
        es: "Suma los valores de $2x$.",
        ja: "$2x$ の値を足した。",
        zh: "加的是 $2x$。"
      } },
      { tex: "T=240^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=390^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\cos2x=\\tfrac{\\sqrt3}2", correct: false, why: {
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
          en: "Eliminate",
          fr: "Éliminer",
          es: "Eliminar",
          ja: "消去",
          zh: "消元"
        },
        lines: ["S+\\sqrt3C=-1,\\ \\sqrt3S-C=\\sqrt3\\Rightarrow S=\\tfrac12,\\ C=-\\tfrac{\\sqrt3}2"],
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
          en: "Angles",
          fr: "Angles",
          es: "Ángulos",
          ja: "角",
          zh: "角"
        },
        lines: ["2x=150^\\circ,510^\\circ\\Rightarrow x=75^\\circ,255^\\circ,\\ T=330^\\circ"],
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
