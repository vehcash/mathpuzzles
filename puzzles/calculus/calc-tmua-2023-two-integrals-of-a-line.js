/* calculus · Two integrals pin down a line
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2023-two-integrals-of-a-line",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 1",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 1",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 1",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第1問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 1 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "Two integrals pin down a line",
      fr: "Deux intégrales déterminent une droite",
      es: "Dos integrales determinan una recta",
      ja: "2つの積分で直線が決まる",
      zh: "两个积分确定一条直线"
    },
    statement: {
      en: "Constants $a,b$ satisfy $\\displaystyle\\int_0^1(ax+b)\\,dx=1$ and $\\displaystyle\\int_0^1x(ax+b)\\,dx=1$. <b>Which of the following are true?</b>",
      fr: "Les constantes $a,b$ vérifient $\\displaystyle\\int_0^1(ax+b)\\,dx=1$ et $\\displaystyle\\int_0^1x(ax+b)\\,dx=1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las constantes $a,b$ cumplen $\\displaystyle\\int_0^1(ax+b)\\,dx=1$ y $\\displaystyle\\int_0^1x(ax+b)\\,dx=1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "定数 $a,b$ は $\\displaystyle\\int_0^1(ax+b)\\,dx=1$、$\\displaystyle\\int_0^1x(ax+b)\\,dx=1$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "常数 $a,b$ 满足 $\\displaystyle\\int_0^1(ax+b)\\,dx=1$，$\\displaystyle\\int_0^1x(ax+b)\\,dx=1$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A line y = ax + b over [0, 1] with the area under it shaded.",
      fr: "Une droite y = ax + b sur [0, 1] avec l’aire sous elle.",
      es: "Una recta y = ax + b en [0, 1] con el área bajo ella.",
      ja: "[0, 1] 上の直線 y = ax + b とその下の面積。",
      zh: "[0, 1] 上的直线 y = ax + b 及其下方面积。"
    },
    hint: {
      en: "The integrals give $\\tfrac a2+b=1$ and $\\tfrac a3+\\tfrac b2=1$.",
      fr: "Les intégrales donnent $\\tfrac a2+b=1$ et $\\tfrac a3+\\tfrac b2=1$.",
      es: "Las integrales dan $\\tfrac a2+b=1$ y $\\tfrac a3+\\tfrac b2=1$.",
      ja: "積分から $\\tfrac a2+b=1$、$\\tfrac a3+\\tfrac b2=1$。",
      zh: "由积分得 $\\tfrac a2+b=1$，$\\tfrac a3+\\tfrac b2=1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.6, scale: 50, pad: 16 });
      const S = ([x, y]) => [(x + 0.3) * 2.4, (y + 2.4) * 0.5];
      F.seg(S([-0.3, 0]), S([1.5, 0]), 'axis'); F.seg(S([0, -2.4]), S([0, 4.6]), 'axis');
      F.seg(S([1, -0.1]), S([1, 0.1]), 'axis'); F.text(S([1, 0]), '1', 'tick', 0, 14);
      F.seg(S([-0.2, 1.4]), S([1.3, 0.5]), 'graph');
      F.reveal = () => {
      F.seg(S([-0.05, -2.3]), S([1.1, 4.6]), 'hl pink'); F.text(S([1.1, 4.0]), 'y = 6x − 2', 'len small', -20, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "y = 6x − 2": {"fr": "y = 6x − 2", "es": "y = 6x − 2", "ja": "y = 6x − 2", "zh": "y = 6x − 2"},
      "the line passes through": {"fr": "la droite passe par", "es": "la recta pasa por", "ja": "直線は次を通る：", "zh": "直线经过"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"}
    },
    options: [
      { tex: "a+b=4", correct: true, why: {
        en: "$a=6,\\ b=-2$",
        fr: "$a=6,\\ b=-2$",
        es: "$a=6,\\ b=-2$",
        ja: "$a=6,\\ b=-2$",
        zh: "$a=6,\\ b=-2$"
      } },
      { tex: "b<0", correct: true, why: {
        en: "$b=-2$",
        fr: "$b=-2$",
        es: "$b=-2$",
        ja: "$b=-2$",
        zh: "$b=-2$"
      } },
      { tex: "a+b=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=b=1", correct: false, why: {
        en: "$\\int_0^1x(x+1)dx=\\tfrac56\\ne1$",
        fr: "$\\int_0^1x(x+1)dx=\\tfrac56\\ne1$",
        es: "$\\int_0^1x(x+1)dx=\\tfrac56\\ne1$",
        ja: "$\\int_0^1x(x+1)dx=\\tfrac56\\ne1$",
        zh: "$\\int_0^1x(x+1)dx=\\tfrac56\\ne1$"
      } },
      { tex: "\\text{the line passes through}\\ (1,2)\\ \\text{and}\\ (0,1)", correct: false, why: {
        en: "$y(0)=-2$",
        fr: "$y(0)=-2$",
        es: "$y(0)=-2$",
        ja: "$y(0)=-2$",
        zh: "$y(0)=-2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two equations",
          fr: "Deux équations",
          es: "Dos ecuaciones",
          ja: "2つの式",
          zh: "两个方程"
        },
        lines: ["\\tfrac a2+b=1,\\qquad\\tfrac a3+\\tfrac b2=1"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["a=6,\\ b=-2\\Rightarrow a+b=4"],
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
