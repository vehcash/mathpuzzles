/* complex · z / (z z̄ − 1) for z = −1 + √3 i
   Gaokao 2022, National Paper A, science (全国甲（理科）卷), Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2022-z-over-z-zbar-minus-one",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, National Paper A, science (全国甲（理科）卷), Question 1",
        fr: "Gaokao 2022, épreuve nationale A, sciences (全国甲（理科）卷), question 1",
        es: "Gaokao 2022, examen nacional A, ciencias (全国甲（理科）卷), pregunta 1",
        ja: "2022年 中国・高考 全国甲（理科）卷 第1問",
        zh: "2022年高考数学全国甲（理科）卷 第1题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "z / (z z̄ − 1) for z = −1 + √3 i",
      fr: "z / (z z̄ − 1) pour z = −1 + √3 i",
      es: "z / (z z̄ − 1) para z = −1 + √3 i",
      ja: "z = −1 + √3 i のとき z / (z z̄ − 1)",
      zh: "z = −1 + √3 i 时的 z / (z z̄ − 1)"
    },
    statement: {
      en: "Let $z=-1+\\sqrt3\\,i$ and $w=\\dfrac{z}{z\\bar z-1}$. <b>Which of the following are true?</b>",
      fr: "Soit $z=-1+\\sqrt3\\,i$ et $w=\\dfrac{z}{z\\bar z-1}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $z=-1+\\sqrt3\\,i$ y $w=\\dfrac{z}{z\\bar z-1}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z=-1+\\sqrt3\\,i$、$w=\\dfrac{z}{z\\bar z-1}$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $z=-1+\\sqrt3\\,i$，$w=\\dfrac{z}{z\\bar z-1}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The point z in the second quadrant.",
      fr: "Le point z dans le deuxième quadrant.",
      es: "El punto z en el segundo cuadrante.",
      ja: "第2象限の点 z。",
      zh: "位于第二象限的点 z。"
    },
    hint: {
      en: "$z\\bar z=|z|^2$.",
      fr: "$z\\bar z=|z|^2$.",
      es: "$z\\bar z=|z|^2$.",
      ja: "$z\\bar z=|z|^2$。",
      zh: "$z\\bar z=|z|^2$。"
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
      F.dot(S([-1, Math.sqrt(3)])); F.text(S([-1, Math.sqrt(3)]), 'z', 'pt', -10, -6);
      F.reveal = () => {
      F.dot(S([-1 / 3, Math.sqrt(3) / 3])); F.text(S([-1 / 3, Math.sqrt(3) / 3]), 'w', 'pt', 12, -4); F.seg(S([0, 0]), S([-1, Math.sqrt(3)]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "w": {"fr": "w", "es": "w", "ja": "w", "zh": "w"}
    },
    options: [
      { tex: "w=-\\tfrac13+\\tfrac{\\sqrt3}3i", correct: true, why: {
        en: "$\\tfrac z3$",
        fr: "$\\tfrac z3$",
        es: "$\\tfrac z3$",
        ja: "$\\tfrac z3$",
        zh: "$\\tfrac z3$"
      } },
      { tex: "z\\bar z=4", correct: true, why: {
        en: "$1+3$",
        fr: "$1+3$",
        es: "$1+3$",
        ja: "$1+3$",
        zh: "$1+3$"
      } },
      { tex: "w=-1+\\sqrt3\\,i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "w=\\tfrac13-\\tfrac{\\sqrt3}3i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "w=-\\tfrac13-\\tfrac{\\sqrt3}3i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "w=-\\tfrac14+\\tfrac{\\sqrt3}4i", correct: false, why: {
        en: "Forgets the $-1$.",
        fr: "Oublie le $-1$.",
        es: "Olvida el $-1$.",
        ja: "$-1$ を忘れた。",
        zh: "漏了 $-1$。"
      } },
      { tex: "|w|=\\tfrac13", correct: false, why: {
        en: "$|w|=\\tfrac23$",
        fr: "$|w|=\\tfrac23$",
        es: "$|w|=\\tfrac23$",
        ja: "$|w|=\\tfrac23$",
        zh: "$|w|=\\tfrac23$"
      } },
      { tex: "z\\bar z=-2", correct: false, why: {
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
          en: "Modulus",
          fr: "Module",
          es: "Módulo",
          ja: "絶対値",
          zh: "模"
        },
        lines: ["z\\bar z=(-1)^2+(\\sqrt3)^2=4"],
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
        lines: ["w=\\tfrac z3=-\\tfrac13+\\tfrac{\\sqrt3}3i"],
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
