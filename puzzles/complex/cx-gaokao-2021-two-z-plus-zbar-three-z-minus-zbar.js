/* complex · 2(z + z̄) + 3(z − z̄) = 4 + 6i
   Gaokao 2021, National Paper B, science (全国乙（理科）卷), Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2021-two-z-plus-zbar-three-z-minus-zbar",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2021, National Paper B, science (全国乙（理科）卷), Question 1",
        fr: "Gaokao 2021, épreuve nationale B, sciences (全国乙（理科）卷), question 1",
        es: "Gaokao 2021, examen nacional B, ciencias (全国乙（理科）卷), pregunta 1",
        ja: "2021年 中国・高考 全国乙（理科）卷 第1問",
        zh: "2021年高考数学全国乙（理科）卷 第1题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "2(z + z̄) + 3(z − z̄) = 4 + 6i",
      fr: "2(z + z̄) + 3(z − z̄) = 4 + 6i",
      es: "2(z + z̄) + 3(z − z̄) = 4 + 6i",
      ja: "2(z + z̄) + 3(z − z̄) = 4 + 6i",
      zh: "2(z + z̄) + 3(z − z̄) = 4 + 6i"
    },
    statement: {
      en: "The complex number $z$ satisfies $2(z+\\bar z)+3(z-\\bar z)=4+6i$. <b>Which of the following are true?</b>",
      fr: "Le nombre complexe $z$ vérifie $2(z+\\bar z)+3(z-\\bar z)=4+6i$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El número complejo $z$ cumple $2(z+\\bar z)+3(z-\\bar z)=4+6i$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "複素数 $z$ は $2(z+\\bar z)+3(z-\\bar z)=4+6i$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "复数 $z$ 满足 $2(z+\\bar z)+3(z-\\bar z)=4+6i$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane.",
      fr: "Le plan complexe.",
      es: "El plano complejo.",
      ja: "複素平面。",
      zh: "复平面。"
    },
    hint: {
      en: "With $z=a+bi$: $z+\\bar z=2a$ and $z-\\bar z=2bi$.",
      fr: "Avec $z=a+bi$ : $z+\\bar z=2a$ et $z-\\bar z=2bi$.",
      es: "Con $z=a+bi$: $z+\\bar z=2a$ y $z-\\bar z=2bi$.",
      ja: "$z=a+bi$ とすると $z+\\bar z=2a$、$z-\\bar z=2bi$。",
      zh: "设 $z=a+bi$，则 $z+\\bar z=2a$，$z-\\bar z=2bi$。"
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
      F.dot(S([1, 1])); F.text(S([1, 1]), 'z', 'pt', 10, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "is real": {"fr": "est réel", "es": "es real", "ja": "は実数", "zh": "是实数"}
    },
    options: [
      { tex: "z=1+i", correct: true, why: {
        en: "$4a=4,\\ 6b=6$",
        fr: "$4a=4,\\ 6b=6$",
        es: "$4a=4,\\ 6b=6$",
        ja: "$4a=4,\\ 6b=6$",
        zh: "$4a=4,\\ 6b=6$"
      } },
      { tex: "|z|=\\sqrt2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "z=1-i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "z=2+3i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z=\\tfrac12+i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z=1+2i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "z=-1+i", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
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
          en: "Write z = a + bi",
          fr: "Écrire z = a + bi",
          es: "Escribir z = a + bi",
          ja: "z = a + bi とおく",
          zh: "设 z = a + bi"
        },
        lines: ["2\\cdot2a+3\\cdot2bi=4a+6bi=4+6i"],
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
          en: "Compare",
          fr: "Identifier",
          es: "Comparar",
          ja: "比較",
          zh: "比较"
        },
        lines: ["a=1,\\ b=1\\Rightarrow z=1+i"],
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
