/* geometry · The common chord of two equal circles
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2021-common-chord-of-equal-circles",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 1",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 1",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 1",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第1問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 1 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "The common chord of two equal circles",
      fr: "La corde commune de deux cercles égaux",
      es: "La cuerda común de dos circunferencias iguales",
      ja: "等しい2円の共通弦",
      zh: "两个等圆的公共弦"
    },
    statement: {
      en: "The circles $(x+2)^2+(y-1)^2=r^2$ and $(x-3)^2+(y+2)^2=r^2$ meet at two points. <b>Which of the following are true?</b>",
      fr: "Les cercles $(x+2)^2+(y-1)^2=r^2$ et $(x-3)^2+(y+2)^2=r^2$ se coupent en deux points. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las circunferencias $(x+2)^2+(y-1)^2=r^2$ y $(x-3)^2+(y+2)^2=r^2$ se cortan en dos puntos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "円 $(x+2)^2+(y-1)^2=r^2$ と $(x-3)^2+(y+2)^2=r^2$ は2点で交わります。 <b>次のうち正しいものはどれですか？</b>",
      zh: "圆 $(x+2)^2+(y-1)^2=r^2$ 与 $(x-3)^2+(y+2)^2=r^2$ 交于两点。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two equal overlapping circles.",
      fr: "Deux cercles égaux qui se chevauchent.",
      es: "Dos circunferencias iguales superpuestas.",
      ja: "重なる等しい2円。",
      zh: "两个相交的等圆。"
    },
    hint: {
      en: "Subtract one equation from the other: the $x^2$, $y^2$ and $r^2$ cancel.",
      fr: "Soustrayez les équations : $x^2$, $y^2$ et $r^2$ s’éliminent.",
      es: "Resta las ecuaciones: $x^2$, $y^2$ y $r^2$ se cancelan.",
      ja: "2式を引くと $x^2,y^2,r^2$ が消える。",
      zh: "两式相减，$x^2$、$y^2$、$r^2$ 消去。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.2, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-6.5)) * 0.30000, 0.2 + (y - (-6.5)) * 0.31667];
      const K = 0.30000;
      F.seg(S([-6.5, 0]), S([7.5, 0]), 'axis'); F.seg(S([0, -6.5]), S([0, 5.5]), 'axis');
      F.circle(S([-2, 1]), 4 * K, 'graph'); F.circle(S([3, -2]), 4 * K, 'graph'); F.dot(S([-2, 1])); F.dot(S([3, -2]));
      F.reveal = () => {
      plot(F, S, x => (5 * x - 4) / 3, -1.5, 2.7, 'hl pink', 'base', -6.5, 5.5); F.seg(S([-2, 1]), S([3, -2]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the chord is perpendicular to the line of centres": {"fr": "la corde est perpendiculaire à la droite des centres", "es": "la cuerda es perpendicular a la recta de los centros", "ja": "弦は中心を結ぶ直線に垂直", "zh": "公共弦垂直于连心线"},
      "the line depends on": {"fr": "la droite dépend de", "es": "la recta depende de", "ja": "直線は次に依存：", "zh": "直线依赖于"},
      "cancels": {"fr": "s’élimine", "es": "se cancela", "ja": "は消える", "zh": "被消去"}
    },
    options: [
      { tex: "5x-3y=4", correct: true, why: {
        en: "$10x-6y-8=0$",
        fr: "$10x-6y-8=0$",
        es: "$10x-6y-8=0$",
        ja: "$10x-6y-8=0$",
        zh: "$10x-6y-8=0$"
      } },
      { tex: "\\text{the chord is perpendicular to the line of centres}", correct: true, why: {
        en: "$\\tfrac53\\cdot\\left(-\\tfrac35\\right)=-1$",
        fr: "$\\tfrac53\\cdot\\left(-\\tfrac35\\right)=-1$",
        es: "$\\tfrac53\\cdot\\left(-\\tfrac35\\right)=-1$",
        ja: "$\\tfrac53\\cdot\\left(-\\tfrac35\\right)=-1$",
        zh: "$\\tfrac53\\cdot\\left(-\\tfrac35\\right)=-1$"
      } },
      { tex: "5x+3y=4", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "3x-5y=4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "5x-3y=-4", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "x-y=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10x+6y=8", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "\\text{the line depends on}\\ r", correct: false, why: {
        en: "$r^2\\ \\text{cancels}$",
        fr: "$r^2\\ \\text{cancels}$",
        es: "$r^2\\ \\text{cancels}$",
        ja: "$r^2\\ \\text{cancels}$",
        zh: "$r^2\\ \\text{cancels}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "引く",
          zh: "相减"
        },
        lines: ["(x+2)^2-(x-3)^2+(y-1)^2-(y+2)^2=0"],
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
          en: "Simplify",
          fr: "Simplifier",
          es: "Simplificar",
          ja: "整理",
          zh: "化简"
        },
        lines: ["10x-5-6y-3=0\\iff5x-3y=4"],
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
