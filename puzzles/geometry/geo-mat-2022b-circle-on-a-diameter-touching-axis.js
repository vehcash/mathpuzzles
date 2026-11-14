/* geometry · When does the circle on a diameter touch the x-axis?
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2022b-circle-on-a-diameter-touching-axis",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question E",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question E",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta E",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 E",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 E 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "When does the circle on a diameter touch the x-axis?",
      fr: "Quand le cercle de diamètre donné touche-t-il l’axe des x ?",
      es: "¿Cuándo toca el eje x la circunferencia de diámetro dado?",
      ja: "直径を与えた円が x 軸に接する条件",
      zh: "以给定线段为直径的圆何时与 x 轴相切？"
    },
    statement: {
      en: "The circle $C$ has diameter from $(0,1)$ to $(p,q)$, where $q>-1$. <b>Which of the following are true?</b>",
      fr: "Le cercle $C$ a pour diamètre le segment de $(0,1)$ à $(p,q)$, avec $q>-1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La circunferencia $C$ tiene por diámetro el segmento de $(0,1)$ a $(p,q)$, con $q>-1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "円 $C$ は $(0,1)$ と $(p,q)$（$q>-1$）を結ぶ線分を直径とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "圆 $C$ 以 $(0,1)$ 到 $(p,q)$ 的线段为直径，其中 $q>-1$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A circle with a diameter from (0, 1) to a point (p, q), and the x-axis below.",
      fr: "Un cercle de diamètre de (0, 1) à (p, q), et l’axe des x en dessous.",
      es: "Una circunferencia de diámetro de (0, 1) a (p, q), y el eje x debajo.",
      ja: "(0, 1) から (p, q) への直径をもつ円と、その下の x 軸。",
      zh: "以 (0, 1) 到 (p, q) 为直径的圆，下方为 x 轴。"
    },
    hint: {
      en: "Tangent to the $x$-axis means: the centre’s height equals the radius.",
      fr: "Tangent à l’axe des $x$ : la hauteur du centre égale le rayon.",
      es: "Tangente al eje $x$: la altura del centro es igual al radio.",
      ja: "$x$ 軸に接する ⇔ 中心の高さ＝半径。",
      zh: "与 $x$ 轴相切 ⇔ 圆心高度等于半径。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 4.8, scale: 46, pad: 16 });
      const T = F.T = axes(F, -1.0, 4.4, -0.6, 4.2);
      const A = [0, 1], B = [3.4, 2.89], C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], r = Math.hypot(B[0] - A[0], B[1] - A[1]) / 2;
      F.circle(T(C), r, 'seg'); F.seg(T(A), T(B), 'seg thin'); F.dot(T(A)); F.dot(T(B)); F.text(T(B), '(p, q)', 'len small', 0, -14); F.text(T(A), '(0, 1)', 'len small', -30, 0);
      F.reveal = () => {
      F.seg(T(C), T([C[0], 0]), 'hl pink'); F.dot(T([C[0], 0]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(p, q)": {"fr": "(p, q)", "es": "(p, q)", "ja": "(p, q)", "zh": "(p, q)"},
      "(0, 1)": {"fr": "(0, 1)", "es": "(0, 1)", "ja": "(0, 1)", "zh": "(0, 1)"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "はありうる", "zh": "是可能的"},
      "the touching point is": {"fr": "le point de contact est", "es": "el punto de tangencia es", "ja": "接点は", "zh": "切点为"},
      "centre": {"fr": "centre", "es": "centro", "ja": "中心", "zh": "圆心"}
    },
    options: [
      { tex: "p^2=4q", correct: true, why: {
        en: "$\\left(\\tfrac{1+q}{2}\\right)^2=\\tfrac{p^2+(q-1)^2}{4}$",
        fr: "$\\left(\\tfrac{1+q}{2}\\right)^2=\\tfrac{p^2+(q-1)^2}{4}$",
        es: "$\\left(\\tfrac{1+q}{2}\\right)^2=\\tfrac{p^2+(q-1)^2}{4}$",
        ja: "$\\left(\\tfrac{1+q}{2}\\right)^2=\\tfrac{p^2+(q-1)^2}{4}$",
        zh: "$\\left(\\tfrac{1+q}{2}\\right)^2=\\tfrac{p^2+(q-1)^2}{4}$"
      } },
      { tex: "(p,q)=(2,1)\\ \\text{works}", correct: true, why: {
        en: "$4=4\\cdot1$",
        fr: "$4=4\\cdot1$",
        es: "$4=4\\cdot1$",
        ja: "$4=4\\cdot1$",
        zh: "$4=4\\cdot1$"
      } },
      { tex: "pq=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p=1+q", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p+q=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p^2+(q-1)^2=1", correct: false, why: {
        en: "That says the diameter has length $1$, not tangency.",
        fr: "Cela dit que le diamètre vaut $1$, pas la tangence.",
        es: "Eso dice que el diámetro mide $1$, no la tangencia.",
        ja: "直径が $1$ という条件で、接する条件ではない。",
        zh: "那是直径为 $1$，与相切无关。"
      } },
      { tex: "p^2=4q\\ \\text{and}\\ q<0\\ \\text{is possible}", correct: false, why: {
        en: "$p^2\\ge0$ forces $q\\ge0$.",
        fr: "$p^2\\ge0$ impose $q\\ge0$.",
        es: "$p^2\\ge0$ obliga a $q\\ge0$.",
        ja: "$p^2\\ge0$ より $q\\ge0$。",
        zh: "$p^2\\ge0$ 迫使 $q\\ge0$。"
      } },
      { tex: "\\text{the touching point is}\\ (p,0)", correct: false, why: {
        en: "It is directly below the centre: $\\left(\\tfrac p2,0\\right)$.",
        fr: "Il est sous le centre : $\\left(\\tfrac p2,0\\right)$.",
        es: "Está bajo el centro: $\\left(\\tfrac p2,0\\right)$.",
        ja: "中心の真下 $\\left(\\tfrac p2,0\\right)$。",
        zh: "在圆心正下方 $\\left(\\tfrac p2,0\\right)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Centre and radius",
          fr: "Centre et rayon",
          es: "Centro y radio",
          ja: "中心と半径",
          zh: "圆心与半径"
        },
        lines: ["\\text{centre}\\ \\left(\\tfrac p2,\\tfrac{1+q}2\\right),\\quad r=\\tfrac12\\sqrt{p^2+(q-1)^2}"],
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
          en: "Height = radius",
          fr: "Hauteur = rayon",
          es: "Altura = radio",
          ja: "高さ＝半径",
          zh: "高度 = 半径"
        },
        lines: ["(1+q)^2=p^2+(q-1)^2\\iff 4q=p^2"],
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
