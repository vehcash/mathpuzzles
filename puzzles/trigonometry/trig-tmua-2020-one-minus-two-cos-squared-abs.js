/* trigonometry · 1 − 2cos² x = |cos x| on [0°, 180°]
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 18 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2020-one-minus-two-cos-squared-abs",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 18",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 18",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 18",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第18問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 18 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "1 − 2cos² x = |cos x| on [0°, 180°]",
      fr: "1 − 2cos² x = |cos x| sur [0°, 180°]",
      es: "1 − 2cos² x = |cos x| en [0°, 180°]",
      ja: "[0°, 180°] での 1 − 2cos² x = |cos x|",
      zh: "[0°, 180°] 上 1 − 2cos² x = |cos x|"
    },
    statement: {
      en: "Consider $1-2\\cos^2x=|\\cos x|$ for $0^\\circ\\le x\\le180^\\circ$, and let $S$ be the sum of its solutions. <b>Which of the following are true?</b>",
      fr: "On considère $1-2\\cos^2x=|\\cos x|$ pour $0^\\circ\\le x\\le180^\\circ$ ; soit $S$ la somme de ses solutions. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $1-2\\cos^2x=|\\cos x|$ con $0^\\circ\\le x\\le180^\\circ$; sea $S$ la suma de sus soluciones. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0^\\circ\\le x\\le180^\\circ$ で $1-2\\cos^2x=|\\cos x|$ を考え、解の和を $S$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $0^\\circ\\le x\\le180^\\circ$ 时 $1-2\\cos^2x=|\\cos x|$，设其解之和为 $S$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of 1 − 2cos² x and |cos x|.",
      fr: "Les graphes de 1 − 2cos² x et |cos x|.",
      es: "Las gráficas de 1 − 2cos² x y |cos x|.",
      ja: "1 − 2cos² x と |cos x| のグラフ。",
      zh: "1 − 2cos² x 与 |cos x| 的图像。"
    },
    hint: {
      en: "Put $c=|\\cos x|\\ge0$: $2c^2+c-1=0$.",
      fr: "Posez $c=|\\cos x|\\ge0$ : $2c^2+c-1=0$.",
      es: "Pon $c=|\\cos x|\\ge0$: $2c^2+c-1=0$.",
      ja: "$c=|\\cos x|\\ge0$ とおくと $2c^2+c-1=0$。",
      zh: "令 $c=|\\cos x|\\ge0$：$2c^2+c-1=0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.8, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-10)) * 0.02300, 0.2 + (y - (-1.2)) * 1.00000];
      F.seg(S([-10, 0]), S([190, 0]), 'axis'); F.seg(S([0, -1.2]), S([0, 1.2]), 'axis');
      const d = Math.PI / 180; plot(F, S, x => 1 - 2 * Math.cos(x * d) ** 2, 0, 180, 'graph'); plot(F, S, x => Math.abs(Math.cos(x * d)), 0, 180, 'seg'); F.text(S([180, 0]), '180°', 'tick', 0, 14);
      F.reveal = () => {
      F.dot(S([60, 0.5])); F.dot(S([120, 0.5])); F.text(S([60, 0.5]), '60°', 'len small', 0, -12); F.text(S([120, 0.5]), '120°', 'len small', 0, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "180°": {"fr": "180°", "es": "180°", "ja": "180°", "zh": "180°"},
      "60°": {"fr": "60°", "es": "60°", "ja": "60°", "zh": "60°"},
      "120°": {"fr": "120°", "es": "120°", "ja": "120°", "zh": "120°"},
      "at every solution": {"fr": "en toute solution", "es": "en toda solución", "ja": "（すべての解で）", "zh": "在所有解处"},
      "is a solution": {"fr": "est une solution", "es": "es una solución", "ja": "は解", "zh": "是解"}
    },
    options: [
      { tex: "S=180^\\circ", correct: true, why: {
        en: "$60^\\circ+120^\\circ$",
        fr: "$60^\\circ+120^\\circ$",
        es: "$60^\\circ+120^\\circ$",
        ja: "$60^\\circ+120^\\circ$",
        zh: "$60^\\circ+120^\\circ$"
      } },
      { tex: "|\\cos x|=\\tfrac12\\ \\text{at every solution}", correct: true, why: {
        en: "$(2c-1)(c+1)=0$",
        fr: "$(2c-1)(c+1)=0$",
        es: "$(2c-1)(c+1)=0$",
        ja: "$(2c-1)(c+1)=0$",
        zh: "$(2c-1)(c+1)=0$"
      } },
      { tex: "S=60^\\circ", correct: false, why: {
        en: "Drops the absolute value.",
        fr: "Oublie la valeur absolue.",
        es: "Olvida el valor absoluto.",
        ja: "絶対値を外し忘れ。",
        zh: "忽略了绝对值。"
      } },
      { tex: "S=120^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=360^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=240^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=0^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=180^\\circ\\ \\text{is a solution}", correct: false, why: {
        en: "$-1\\ne1$",
        fr: "$-1\\ne1$",
        es: "$-1\\ne1$",
        ja: "$-1\\ne1$",
        zh: "$-1\\ne1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Quadratic in c",
          fr: "Équation en c",
          es: "Cuadrática en c",
          ja: "c の2次方程式",
          zh: "关于 c 的二次方程"
        },
        lines: ["2c^2+c-1=(2c-1)(c+1)=0\\Rightarrow c=\\tfrac12"],
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
          en: "Angles",
          fr: "Angles",
          es: "Ángulos",
          ja: "角",
          zh: "角"
        },
        lines: ["\\cos x=\\pm\\tfrac12\\Rightarrow x=60^\\circ,120^\\circ"],
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
