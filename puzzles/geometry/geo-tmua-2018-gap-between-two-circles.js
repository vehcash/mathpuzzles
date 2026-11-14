/* geometry · The gap between two circles
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2018-gap-between-two-circles",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 3",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 3",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 3",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第3問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 3 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "The gap between two circles",
      fr: "L’écart entre deux cercles",
      es: "La separación entre dos circunferencias",
      ja: "2円の間のすき間",
      zh: "两圆之间的间隙"
    },
    statement: {
      en: "$C_1:(x+2)^2+(y-3)^2=18$ and $C_2:(x-7)^2+(y+6)^2=2$. Let $g$ be the shortest distance from a point of $C_1$ to a point of $C_2$. <b>Which of the following are true?</b>",
      fr: "$C_1:(x+2)^2+(y-3)^2=18$ et $C_2:(x-7)^2+(y+6)^2=2$. Soit $g$ la plus courte distance entre un point de $C_1$ et un point de $C_2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$C_1:(x+2)^2+(y-3)^2=18$ y $C_2:(x-7)^2+(y+6)^2=2$. Sea $g$ la menor distancia entre un punto de $C_1$ y uno de $C_2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$C_1:(x+2)^2+(y-3)^2=18$、$C_2:(x-7)^2+(y+6)^2=2$。$C_1$ 上の点と $C_2$ 上の点の最短距離を $g$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$C_1:(x+2)^2+(y-3)^2=18$，$C_2:(x-7)^2+(y+6)^2=2$，设两圆上点的最短距离为 $g$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A big circle and a small one, apart.",
      fr: "Un grand et un petit cercle, séparés.",
      es: "Una circunferencia grande y una pequeña, separadas.",
      ja: "離れた大小2円。",
      zh: "相离的一大一小两圆。"
    },
    hint: {
      en: "$g=d-r_1-r_2$ where $d$ is the distance between centres.",
      fr: "$g=d-r_1-r_2$ où $d$ est la distance des centres.",
      es: "$g=d-r_1-r_2$ con $d$ la distancia entre centros.",
      ja: "$g=d-r_1-r_2$（$d$ は中心間距離）。",
      zh: "$g=d-r_1-r_2$，$d$ 为圆心距。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 4.2, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-7)) * 0.23030, 0.2 + (y - (-8.5)) * 0.23030];
      const K = 0.23030;
      F.seg(S([-7, 0]), S([9.5, 0]), 'axis'); F.seg(S([0, -8.5]), S([0, 8]), 'axis');
      F.circle(S([-2, 3]), Math.sqrt(18) * K, 'graph'); F.circle(S([7, -6]), Math.SQRT2 * K, 'graph'); F.dot(S([-2, 3])); F.dot(S([7, -6]));
      F.reveal = () => {
      F.seg(S([-2 + 3, 3 - 3]), S([7 - 1, -6 + 1]), 'hl pink'); F.seg(S([-2, 3]), S([7, -6]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the centres are": {"fr": "les centres sont à", "es": "los centros están a", "ja": "中心間の距離は", "zh": "圆心相距"},
      "apart": {"fr": "d’écart", "es": "de distancia", "ja": "の距離", "zh": "的距离"},
      "the circles intersect": {"fr": "les cercles se coupent", "es": "las circunferencias se cortan", "ja": "2円は交わる", "zh": "两圆相交"}
    },
    options: [
      { tex: "g=5\\sqrt2", correct: true, why: {
        en: "$9\\sqrt2-3\\sqrt2-\\sqrt2$",
        fr: "$9\\sqrt2-3\\sqrt2-\\sqrt2$",
        es: "$9\\sqrt2-3\\sqrt2-\\sqrt2$",
        ja: "$9\\sqrt2-3\\sqrt2-\\sqrt2$",
        zh: "$9\\sqrt2-3\\sqrt2-\\sqrt2$"
      } },
      { tex: "\\text{the centres are}\\ 9\\sqrt2\\ \\text{apart}", correct: true, why: {
        en: "$\\sqrt{81+81}$",
        fr: "$\\sqrt{81+81}$",
        es: "$\\sqrt{81+81}$",
        ja: "$\\sqrt{81+81}$",
        zh: "$\\sqrt{81+81}$"
      } },
      { tex: "g=9\\sqrt2", correct: false, why: {
        en: "The distance between centres.",
        fr: "La distance des centres.",
        es: "La distancia entre centros.",
        ja: "中心間距離。",
        zh: "圆心距。"
      } },
      { tex: "g=6\\sqrt2", correct: false, why: {
        en: "Subtracts only the big radius.",
        fr: "Ne retire que le grand rayon.",
        es: "Solo resta el radio grande.",
        ja: "大きい半径だけ引いた。",
        zh: "只减了大半径。"
      } },
      { tex: "g=13\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "g=4\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "g=7\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the circles intersect}", correct: false, why: {
        en: "$9\\sqrt2>4\\sqrt2$",
        fr: "$9\\sqrt2>4\\sqrt2$",
        es: "$9\\sqrt2>4\\sqrt2$",
        ja: "$9\\sqrt2>4\\sqrt2$",
        zh: "$9\\sqrt2>4\\sqrt2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Centres and radii",
          fr: "Centres et rayons",
          es: "Centros y radios",
          ja: "中心と半径",
          zh: "圆心与半径"
        },
        lines: ["(-2,3),\\ 3\\sqrt2;\\quad(7,-6),\\ \\sqrt2;\\quad d=9\\sqrt2"],
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
          en: "Gap",
          fr: "Écart",
          es: "Separación",
          ja: "すき間",
          zh: "间隙"
        },
        lines: ["g=9\\sqrt2-3\\sqrt2-\\sqrt2=5\\sqrt2"],
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
