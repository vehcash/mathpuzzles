/* complex · z(z̄ + i) for z = 2 − i
   Gaokao 2021, New Curriculum Paper I (新高考Ⅰ卷), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2021-z-times-zbar-plus-i",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2021, New Curriculum Paper I (新高考Ⅰ卷), Question 2",
        fr: "Gaokao 2021, épreuve nationale I (新高考Ⅰ卷), question 2",
        es: "Gaokao 2021, examen nacional I (新高考Ⅰ卷), pregunta 2",
        ja: "2021年 中国・高考 新高考Ⅰ卷 第2問",
        zh: "2021年高考数学新高考Ⅰ卷 第2题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "z(z̄ + i) for z = 2 − i",
      fr: "z(z̄ + i) pour z = 2 − i",
      es: "z(z̄ + i) para z = 2 − i",
      ja: "z = 2 − i のとき z(z̄ + i)",
      zh: "z = 2 − i 时的 z(z̄ + i)"
    },
    statement: {
      en: "Let $z=2-i$ and $w=z(\\bar z+i)$. <b>Which of the following are true?</b>",
      fr: "Soit $z=2-i$ et $w=z(\\bar z+i)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $z=2-i$ y $w=z(\\bar z+i)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z=2-i$、$w=z(\\bar z+i)$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $z=2-i$，$w=z(\\bar z+i)$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The point z = 2 − i.",
      fr: "Le point z = 2 − i.",
      es: "El punto z = 2 − i.",
      ja: "点 z = 2 − i。",
      zh: "点 z = 2 − i。"
    },
    hint: {
      en: "$\\bar z+i=2+2i$.",
      fr: "$\\bar z+i=2+2i$.",
      es: "$\\bar z+i=2+2i$.",
      ja: "$\\bar z+i=2+2i$。",
      zh: "$\\bar z+i=2+2i$。"
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
      F.dot(S([2, -1])); F.text(S([2, -1]), 'z', 'pt', 10, 6);
      F.reveal = () => {
      F.text(S([0, -2.6]), 'w = 6 + 2i', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "w = 6 + 2i": {"fr": "w = 6 + 2i", "es": "w = 6 + 2i", "ja": "w = 6 + 2i", "zh": "w = 6 + 2i"}
    },
    options: [
      { tex: "w=6+2i", correct: true, why: {
        en: "$(2-i)(2+2i)$",
        fr: "$(2-i)(2+2i)$",
        es: "$(2-i)(2+2i)$",
        ja: "$(2-i)(2+2i)$",
        zh: "$(2-i)(2+2i)$"
      } },
      { tex: "\\operatorname{Re}w=6", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "w=6-2i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "w=4+4i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "w=2+6i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "w=5+i", correct: false, why: {
        en: "Uses $z\\bar z+i$.",
        fr: "Calcule $z\\bar z+i$.",
        es: "Calcula $z\\bar z+i$.",
        ja: "$z\\bar z+i$ を計算。",
        zh: "算成了 $z\\bar z+i$。"
      } },
      { tex: "w=4-2i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "|w|=6", correct: false, why: {
        en: "$|w|=2\\sqrt{10}$",
        fr: "$|w|=2\\sqrt{10}$",
        es: "$|w|=2\\sqrt{10}$",
        ja: "$|w|=2\\sqrt{10}$",
        zh: "$|w|=2\\sqrt{10}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Conjugate",
          fr: "Conjugué",
          es: "Conjugado",
          ja: "共役",
          zh: "共轭"
        },
        lines: ["\\bar z+i=2+i+i=2+2i"],
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
          en: "Multiply",
          fr: "Multiplier",
          es: "Multiplicar",
          ja: "掛ける",
          zh: "相乘"
        },
        lines: ["(2-i)(2+2i)=4+4i-2i+2=6+2i"],
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
