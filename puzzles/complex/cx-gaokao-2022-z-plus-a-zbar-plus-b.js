/* complex · z + a z̄ + b = 0 with z = 1 − 2i
   Gaokao 2022, National Paper B, science (全国乙（理科）卷), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2022-z-plus-a-zbar-plus-b",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, National Paper B, science (全国乙（理科）卷), Question 2",
        fr: "Gaokao 2022, épreuve nationale B, sciences (全国乙（理科）卷), question 2",
        es: "Gaokao 2022, examen nacional B, ciencias (全国乙（理科）卷), pregunta 2",
        ja: "2022年 中国・高考 全国乙（理科）卷 第2問",
        zh: "2022年高考数学全国乙（理科）卷 第2题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "z + a z̄ + b = 0 with z = 1 − 2i",
      fr: "z + a z̄ + b = 0 avec z = 1 − 2i",
      es: "z + a z̄ + b = 0 con z = 1 − 2i",
      ja: "z = 1 − 2i で z + a z̄ + b = 0",
      zh: "z = 1 − 2i 时 z + a z̄ + b = 0"
    },
    statement: {
      en: "$z=1-2i$, and real numbers $a,b$ satisfy $z+a\\bar z+b=0$. <b>Which of the following are true?</b>",
      fr: "$z=1-2i$, et des réels $a,b$ vérifient $z+a\\bar z+b=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$z=1-2i$, y los reales $a,b$ cumplen $z+a\\bar z+b=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z=1-2i$ で、実数 $a,b$ は $z+a\\bar z+b=0$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$z=1-2i$，实数 $a,b$ 满足 $z+a\\bar z+b=0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "z and its conjugate, mirror images in the real axis.",
      fr: "z et son conjugué, symétriques par rapport à l’axe réel.",
      es: "z y su conjugado, simétricos respecto al eje real.",
      ja: "実軸に関して対称な z と共役。",
      zh: "关于实轴对称的 z 与其共轭。"
    },
    hint: {
      en: "Real and imaginary parts must both vanish.",
      fr: "Les parties réelle et imaginaire doivent s’annuler.",
      es: "Las partes real e imaginaria deben anularse.",
      ja: "実部と虚部がともに 0。",
      zh: "实部与虚部都须为零。"
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
      F.dot(S([1, -2])); F.text(S([1, -2]), 'z', 'pt', 10, 6); F.dot(S([1, 2])); F.text(S([1, 2]), 'z̄', 'len small', 14, -6);
      F.reveal = () => {
      F.seg(S([1, -2]), S([1, 2]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Re": {"fr": "Re", "es": "Re", "ja": "Re", "zh": "Re"},
      "Im": {"fr": "Im", "es": "Im", "ja": "Im", "zh": "Im"},
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "z̄": {"fr": "z̄", "es": "z̄", "ja": "z̄", "zh": "z̄"}
    },
    options: [
      { tex: "a=1,\\ b=-2", correct: true, why: {
        en: "$(1+a+b)+(2a-2)i=0$",
        fr: "$(1+a+b)+(2a-2)i=0$",
        es: "$(1+a+b)+(2a-2)i=0$",
        ja: "$(1+a+b)+(2a-2)i=0$",
        zh: "$(1+a+b)+(2a-2)i=0$"
      } },
      { tex: "z+\\bar z=2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "a=-1,\\ b=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=1,\\ b=2", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "a=-1,\\ b=-2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=2,\\ b=-3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=1", correct: false, why: {
        en: "$a+b=-1$",
        fr: "$a+b=-1$",
        es: "$a+b=-1$",
        ja: "$a+b=-1$",
        zh: "$a+b=-1$"
      } },
      { tex: "z\\bar z=3", correct: false, why: {
        en: "$z\\bar z=5$",
        fr: "$z\\bar z=5$",
        es: "$z\\bar z=5$",
        ja: "$z\\bar z=5$",
        zh: "$z\\bar z=5$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["1-2i+a(1+2i)+b=(1+a+b)+(2a-2)i"],
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
        lines: ["2a-2=0,\\ 1+a+b=0\\Rightarrow a=1,\\ b=-2"],
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
