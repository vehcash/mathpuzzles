/* calculus · Integrate between the turning points
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2021-integral-between-turning-points",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Integrate between the turning points",
      fr: "Intégrer entre les extremums",
      es: "Integrar entre los puntos de giro",
      ja: "極値点の間で積分",
      zh: "在两个驻点之间积分"
    },
    statement: {
      en: "The curve $y=x^3-6x+3$ has turning points at $x=\\alpha$ and $x=\\beta$ with $\\alpha<\\beta$. Let $I=\\displaystyle\\int_\\alpha^\\beta(x^3-6x+3)\\,dx$. <b>Which of the following are true?</b>",
      fr: "La courbe $y=x^3-6x+3$ a des extremums en $x=\\alpha$ et $x=\\beta$ avec $\\alpha<\\beta$. Soit $I=\\displaystyle\\int_\\alpha^\\beta(x^3-6x+3)\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La curva $y=x^3-6x+3$ tiene puntos de giro en $x=\\alpha$ y $x=\\beta$ con $\\alpha<\\beta$. Sea $I=\\displaystyle\\int_\\alpha^\\beta(x^3-6x+3)\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $y=x^3-6x+3$ の極値点を $x=\\alpha,\\beta$（$\\alpha<\\beta$）とし、$I=\\displaystyle\\int_\\alpha^\\beta(x^3-6x+3)\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "曲线 $y=x^3-6x+3$ 的驻点为 $x=\\alpha,\\beta$（$\\alpha<\\beta$），设 $I=\\displaystyle\\int_\\alpha^\\beta(x^3-6x+3)\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A cubic with a maximum and a minimum.",
      fr: "Une cubique avec un maximum et un minimum.",
      es: "Una cúbica con un máximo y un mínimo.",
      ja: "極大・極小をもつ3次曲線。",
      zh: "有极大值和极小值的三次曲线。"
    },
    hint: {
      en: "The odd part $x^3-6x$ integrates to $0$ over a symmetric interval.",
      fr: "La partie impaire $x^3-6x$ s’intègre en $0$ sur un intervalle symétrique.",
      es: "La parte impar $x^3-6x$ integra $0$ en un intervalo simétrico.",
      ja: "奇関数部分 $x^3-6x$ は対称区間で積分 $0$。",
      zh: "奇函数部分 $x^3-6x$ 在对称区间上积分为 $0$。"
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
      const S = ([x, y]) => [0.2 + (x - (-3)) * 0.76667, 0.2 + (y - (-4)) * 0.21429];
      const K = 0.76667;
      F.seg(S([-3, 0]), S([3, 0]), 'axis'); F.seg(S([0, -4]), S([0, 10]), 'axis');
      plot(F, S, x => x ** 3 - 6 * x + 3, -2.9, 2.9, 'graph', 'base', -4, 10);
      F.reveal = () => {
      const a = Math.SQRT2; const pts = []; for (let k = 0; k <= 40; k++) { const x = -a + 2 * a * k / 40; pts.push(S([x, x ** 3 - 6 * x + 3])); } F.path([S([-a, 0])].concat(pts, [S([a, 0])]), 'fill-yellow', 'fills');
      };
      return F;
    },
    options: [
      { tex: "I=6\\sqrt2", correct: true, why: {
        en: "$3\\cdot2\\sqrt2$",
        fr: "$3\\cdot2\\sqrt2$",
        es: "$3\\cdot2\\sqrt2$",
        ja: "$3\\cdot2\\sqrt2$",
        zh: "$3\\cdot2\\sqrt2$"
      } },
      { tex: "\\alpha=-\\sqrt2,\\ \\beta=\\sqrt2", correct: true, why: {
        en: "$3x^2-6=0$",
        fr: "$3x^2-6=0$",
        es: "$3x^2-6=0$",
        ja: "$3x^2-6=0$",
        zh: "$3x^2-6=0$"
      } },
      { tex: "I=0", correct: false, why: {
        en: "Forgets the constant term $3$.",
        fr: "Oublie la constante $3$.",
        es: "Olvida la constante $3$.",
        ja: "定数項 $3$ を忘れた。",
        zh: "漏了常数项 $3$。"
      } },
      { tex: "I=-6\\sqrt2", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "I=12\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=3\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\alpha=-2,\\ \\beta=2", correct: false, why: {
        en: "$3x^2=6$",
        fr: "$3x^2=6$",
        es: "$3x^2=6$",
        ja: "$3x^2=6$",
        zh: "$3x^2=6$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Turning points",
          fr: "Extremums",
          es: "Puntos de giro",
          ja: "極値点",
          zh: "驻点"
        },
        lines: ["3x^2-6=0\\Rightarrow x=\\pm\\sqrt2"],
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
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分",
          zh: "积分"
        },
        lines: ["\\int_{-\\sqrt2}^{\\sqrt2}3\\,dx=6\\sqrt2"],
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
