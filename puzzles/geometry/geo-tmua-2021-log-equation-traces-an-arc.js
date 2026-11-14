/* geometry · A log equation that draws an arc
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 20 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2021-log-equation-traces-an-arc",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 20",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 20",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 20",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第20問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 20 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "A log equation that draws an arc",
      fr: "Une équation logarithmique qui trace un arc",
      es: "Una ecuación logarítmica que dibuja un arco",
      ja: "弧を描く対数方程式",
      zh: "画出圆弧的对数方程"
    },
    statement: {
      en: "The points $(x,y)$ satisfying $2\\log_{10}(x-y)=\\log_{10}(2-2x)+\\log_{10}(y+5)$ form a curve. Let $\\ell$ be its length. <b>Which of the following are true?</b>",
      fr: "Les points $(x,y)$ vérifiant $2\\log_{10}(x-y)=\\log_{10}(2-2x)+\\log_{10}(y+5)$ forment une courbe. Soit $\\ell$ sa longueur. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los puntos $(x,y)$ que cumplen $2\\log_{10}(x-y)=\\log_{10}(2-2x)+\\log_{10}(y+5)$ forman una curva. Sea $\\ell$ su longitud. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$2\\log_{10}(x-y)=\\log_{10}(2-2x)+\\log_{10}(y+5)$ を満たす点 $(x,y)$ は曲線をなします。その長さを $\\ell$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "满足 $2\\log_{10}(x-y)=\\log_{10}(2-2x)+\\log_{10}(y+5)$ 的点 $(x,y)$ 构成一条曲线，其长度为 $\\ell$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The lines x = 1, y = −5 and y = x.",
      fr: "Les droites x = 1, y = −5 et y = x.",
      es: "Las rectas x = 1, y = −5 e y = x.",
      ja: "直線 x = 1, y = −5, y = x。",
      zh: "直线 x = 1、y = −5、y = x。"
    },
    hint: {
      en: "Remove the logs, then complete the square. Keep $x>y$, $x<1$, $y>-5$.",
      fr: "Enlevez les logarithmes puis complétez le carré. Gardez $x>y$, $x<1$, $y>-5$.",
      es: "Quita los logaritmos y completa el cuadrado. Mantén $x>y$, $x<1$, $y>-5$.",
      ja: "対数を外して平方完成。$x>y$、$x<1$、$y>-5$ を保つ。",
      zh: "去掉对数后配方，保持 $x>y$、$x<1$、$y>-5$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-11.5)) * 0.29630, 0.2 + (y - (-6)) * 0.29630];
      const K = 0.29630;
      F.seg(S([-11.5, 0]), S([2, 0]), 'axis'); F.seg(S([0, -6]), S([0, 7.5]), 'axis');
      F.seg(S([1, -6]), S([1, 7.5]), 'seg thin dashc'); F.seg(S([-11.5, -5]), S([2, -5]), 'seg thin dashc'); F.seg(S([-6, -6]), S([2, 2]), 'seg thin dashc');
      F.reveal = () => {
      F.circle(S([-5, 1]), 6 * K, 'seg thin'); const pts = []; for (let k = 0; k <= 40; k++) { const t = -Math.PI / 2 + Math.PI / 2 * k / 40; pts.push(S([-5 + 6 * Math.cos(t), 1 + 6 * Math.sin(t)])); } F.path(pts, 'hl pink', 'base', false); F.dot(S([-5, 1]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the points lie on a circle with centre": {"fr": "les points sont sur un cercle de centre", "es": "los puntos están en una circunferencia de centro", "ja": "点は円上にある：中心", "zh": "点在圆上：圆心"},
      "and radius": {"fr": "et de rayon", "es": "y radio", "ja": "、半径", "zh": "，半径"},
      "a quarter circle": {"fr": "un quart de cercle", "es": "un cuarto de circunferencia", "ja": "4分の1円", "zh": "四分之一圆"}
    },
    options: [
      { tex: "\\ell=3\\pi", correct: true, why: {
        en: "$\\tfrac14\\cdot2\\pi\\cdot6$",
        fr: "$\\tfrac14\\cdot2\\pi\\cdot6$",
        es: "$\\tfrac14\\cdot2\\pi\\cdot6$",
        ja: "$\\tfrac14\\cdot2\\pi\\cdot6$",
        zh: "$\\tfrac14\\cdot2\\pi\\cdot6$"
      } },
      { tex: "\\text{the points lie on a circle with centre}\\ (-5,1)\\ \\text{and radius}\\ 6", correct: true, why: {
        en: "$(x+5)^2+(y-1)^2=36$",
        fr: "$(x+5)^2+(y-1)^2=36$",
        es: "$(x+5)^2+(y-1)^2=36$",
        ja: "$(x+5)^2+(y-1)^2=36$",
        zh: "$(x+5)^2+(y-1)^2=36$"
      } },
      { tex: "\\ell=12\\pi", correct: false, why: {
        en: "The whole circle.",
        fr: "Le cercle entier.",
        es: "La circunferencia entera.",
        ja: "円全体。",
        zh: "整个圆。"
      } },
      { tex: "\\ell=6\\pi", correct: false, why: {
        en: "Half the circle.",
        fr: "Un demi-cercle.",
        es: "Media circunferencia.",
        ja: "半円。",
        zh: "半圆。"
      } },
      { tex: "\\ell=2\\pi", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\ell=\\tfrac{3\\pi}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\ell=9\\pi", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the points lie on a circle with centre}\\ (5,-1)\\ \\text{and radius}\\ 6", correct: false, why: {
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
          en: "Remove logs",
          fr: "Enlever les logs",
          es: "Quitar logaritmos",
          ja: "対数を外す",
          zh: "去掉对数"
        },
        lines: ["(x-y)^2=(2-2x)(y+5)\\iff(x+5)^2+(y-1)^2=36"],
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
          en: "Which part",
          fr: "Quelle partie",
          es: "Qué parte",
          ja: "どの部分",
          zh: "哪一部分"
        },
        lines: ["x>y,\\ x<1,\\ y>-5\\Rightarrow\\text{a quarter circle}:\\ \\ell=3\\pi"],
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
