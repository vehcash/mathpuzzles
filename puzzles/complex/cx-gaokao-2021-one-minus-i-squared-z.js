/* complex · (1 − i)² z = 3 + 2i
   Gaokao 2021, National Paper A, science (全国甲（理科）卷), Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2021-one-minus-i-squared-z",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2021, National Paper A, science (全国甲（理科）卷), Question 3",
        fr: "Gaokao 2021, épreuve nationale A, sciences (全国甲（理科）卷), question 3",
        es: "Gaokao 2021, examen nacional A, ciencias (全国甲（理科）卷), pregunta 3",
        ja: "2021年 中国・高考 全国甲（理科）卷 第3問",
        zh: "2021年高考数学全国甲（理科）卷 第3题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "(1 − i)² z = 3 + 2i",
      fr: "(1 − i)² z = 3 + 2i",
      es: "(1 − i)² z = 3 + 2i",
      ja: "(1 − i)² z = 3 + 2i",
      zh: "(1 − i)² z = 3 + 2i"
    },
    statement: {
      en: "The complex number $z$ satisfies $(1-i)^2z=3+2i$. <b>Which of the following are true?</b>",
      fr: "Le nombre complexe $z$ vérifie $(1-i)^2z=3+2i$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El número complejo $z$ cumple $(1-i)^2z=3+2i$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "複素数 $z$ は $(1-i)^2z=3+2i$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "复数 $z$ 满足 $(1-i)^2z=3+2i$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane with 3 + 2i marked.",
      fr: "Le plan complexe avec 3 + 2i.",
      es: "El plano complejo con 3 + 2i.",
      ja: "3 + 2i を示した複素平面。",
      zh: "标出 3 + 2i 的复平面。"
    },
    hint: {
      en: "$(1-i)^2=-2i$.",
      fr: "$(1-i)^2=-2i$.",
      es: "$(1-i)^2=-2i$.",
      ja: "$(1-i)^2=-2i$。",
      zh: "$(1-i)^2=-2i$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 46, pad: 16 });
      const S = ([x, y]) => [1.8 + x * 0.55, 1.8 + y * 0.55];
      F.seg(S([-3, 0]), S([3, 0]), 'axis'); F.seg(S([0, -3]), S([0, 3]), 'axis'); F.text(S([3, 0]), 'Re', 'tick', -8, 14); F.text(S([0, 3]), 'Im', 'tick', 14, 4);
      F.dot(S([3, 2])); F.text(S([3, 2]), '3 + 2i', 'len small', -18, -10);
      F.reveal = () => {
      F.dot(S([-1, 1.5])); F.text(S([-1, 1.5]), 'z', 'pt', -10, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "3 + 2i": {"fr": "3 + 2i", "es": "3 + 2i", "ja": "3 + 2i", "zh": "3 + 2i"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "lies in the fourth quadrant": {"fr": "est dans le quatrième quadrant", "es": "está en el cuarto cuadrante", "ja": "は第4象限にある", "zh": "在第四象限"},
      "second quadrant": {"fr": "deuxième quadrant", "es": "segundo cuadrante", "ja": "第2象限", "zh": "第二象限"}
    },
    options: [
      { tex: "z=-1+\\tfrac32i", correct: true, why: {
        en: "$\\dfrac{3+2i}{-2i}$",
        fr: "$\\dfrac{3+2i}{-2i}$",
        es: "$\\dfrac{3+2i}{-2i}$",
        ja: "$\\dfrac{3+2i}{-2i}$",
        zh: "$\\dfrac{3+2i}{-2i}$"
      } },
      { tex: "(1-i)^2=-2i", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "z=-1-\\tfrac32i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "z=1+\\tfrac32i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "z=\\tfrac32-i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z=-\\tfrac32+i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(1-i)^2=2", correct: false, why: {
        en: "$1-2i+i^2$",
        fr: "$1-2i+i^2$",
        es: "$1-2i+i^2$",
        ja: "$1-2i+i^2$",
        zh: "$1-2i+i^2$"
      } },
      { tex: "z\\ \\text{lies in the fourth quadrant}", correct: false, why: {
        en: "$\\text{second quadrant}$",
        fr: "$\\text{second quadrant}$",
        es: "$\\text{second quadrant}$",
        ja: "$\\text{second quadrant}$",
        zh: "$\\text{second quadrant}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Square",
          fr: "Carré",
          es: "Cuadrado",
          ja: "2乗",
          zh: "平方"
        },
        lines: ["(1-i)^2=1-2i-1=-2i"],
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
          en: "Divide",
          fr: "Diviser",
          es: "Dividir",
          ja: "割る",
          zh: "相除"
        },
        lines: ["z=\\frac{3+2i}{-2i}=\\frac{(3+2i)i}{2}=-1+\\tfrac32i"],
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
