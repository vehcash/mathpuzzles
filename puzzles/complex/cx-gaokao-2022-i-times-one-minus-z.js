/* complex · i(1 − z) = 1
   Gaokao 2022, New Curriculum Paper I (新高考Ⅰ卷), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2022-i-times-one-minus-z",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, New Curriculum Paper I (新高考Ⅰ卷), Question 2",
        fr: "Gaokao 2022, épreuve nationale I (新高考Ⅰ卷), question 2",
        es: "Gaokao 2022, examen nacional I (新高考Ⅰ卷), pregunta 2",
        ja: "2022年 中国・高考 新高考Ⅰ卷 第2問",
        zh: "2022年高考数学新高考Ⅰ卷 第2题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "i(1 − z) = 1",
      fr: "i(1 − z) = 1",
      es: "i(1 − z) = 1",
      ja: "i(1 − z) = 1",
      zh: "i(1 − z) = 1"
    },
    statement: {
      en: "The complex number $z$ satisfies $i(1-z)=1$. <b>Which of the following are true?</b>",
      fr: "Le nombre complexe $z$ vérifie $i(1-z)=1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El número complejo $z$ cumple $i(1-z)=1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "複素数 $z$ は $i(1-z)=1$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "复数 $z$ 满足 $i(1-z)=1$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane.",
      fr: "Le plan complexe.",
      es: "El plano complejo.",
      ja: "複素平面。",
      zh: "复平面。"
    },
    hint: {
      en: "$1-z=\\tfrac1i=-i$.",
      fr: "$1-z=\\tfrac1i=-i$.",
      es: "$1-z=\\tfrac1i=-i$.",
      ja: "$1-z=\\tfrac1i=-i$。",
      zh: "$1-z=\\tfrac1i=-i$。"
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
      F.reveal = () => {
      F.dot(S([1, 1])); F.text(S([1, 1]), 'z', 'pt', 10, -6); F.dot(S([1, -1])); F.text(S([1, -1]), 'z̄', 'len small', 14, 10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "z̄": {"fr": "z̄", "es": "z̄", "ja": "z̄", "zh": "z̄"},
      "is real": {"fr": "est réel", "es": "es real", "ja": "は実数", "zh": "是实数"}
    },
    options: [
      { tex: "z+\\bar z=2", correct: true, why: {
        en: "$z=1+i$",
        fr: "$z=1+i$",
        es: "$z=1+i$",
        ja: "$z=1+i$",
        zh: "$z=1+i$"
      } },
      { tex: "|z|=\\sqrt2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "z+\\bar z=-2", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "z+\\bar z=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z+\\bar z=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z=1-i", correct: false, why: {
        en: "Uses $\\tfrac1i=i$.",
        fr: "Prend $\\tfrac1i=i$.",
        es: "Toma $\\tfrac1i=i$.",
        ja: "$\\tfrac1i=i$ とした。",
        zh: "误以为 $\\tfrac1i=i$。"
      } },
      { tex: "z\\bar z=1", correct: false, why: {
        en: "$z\\bar z=2$",
        fr: "$z\\bar z=2$",
        es: "$z\\bar z=2$",
        ja: "$z\\bar z=2$",
        zh: "$z\\bar z=2$"
      } },
      { tex: "z\\ \\text{is real}", correct: false, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } }
    ],
    steps: [
      {
        title: {
          en: "Divide by i",
          fr: "Diviser par i",
          es: "Dividir entre i",
          ja: "i で割る",
          zh: "除以 i"
        },
        lines: ["1-z=-i\\Rightarrow z=1+i"],
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
          en: "Add the conjugate",
          fr: "Ajouter le conjugué",
          es: "Sumar el conjugado",
          ja: "共役を足す",
          zh: "加共轭"
        },
        lines: ["z+\\bar z=2\\operatorname{Re}z=2"],
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
