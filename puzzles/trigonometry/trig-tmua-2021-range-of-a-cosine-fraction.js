/* trigonometry · Range of (cos x + 3)/(7 + 5cos x − sin²x)
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2021-range-of-a-cosine-fraction",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 6",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 6",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 6",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第6問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 6 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Range of (cos x + 3)/(7 + 5cos x − sin²x)",
      fr: "Image de (cos x + 3)/(7 + 5cos x − sin²x)",
      es: "Recorrido de (cos x + 3)/(7 + 5cos x − sen²x)",
      ja: "(cos x + 3)/(7 + 5cos x − sin²x) の値域",
      zh: "(cos x + 3)/(7 + 5cos x − sin²x) 的值域"
    },
    statement: {
      en: "Let $f(x)=\\dfrac{\\cos x+3}{7+5\\cos x-\\sin^2x}$ and let $D$ be the difference between the largest and smallest values of $f$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x)=\\dfrac{\\cos x+3}{7+5\\cos x-\\sin^2x}$ et $D$ la différence entre la plus grande et la plus petite valeur de $f$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x)=\\dfrac{\\cos x+3}{7+5\\cos x-\\sin^2x}$ y $D$ la diferencia entre el mayor y el menor valor de $f$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=\\dfrac{\\cos x+3}{7+5\\cos x-\\sin^2x}$ の最大値と最小値の差を $D$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x)=\\dfrac{\\cos x+3}{7+5\\cos x-\\sin^2x}$，$D$ 为其最大值与最小值之差。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of f over one period.",
      fr: "Le graphe de f sur une période.",
      es: "La gráfica de f en un periodo.",
      ja: "1周期の f のグラフ。",
      zh: "f 一个周期的图像。"
    },
    hint: {
      en: "Write $\\sin^2x=1-\\cos^2x$ and factorise the denominator.",
      fr: "Écrivez $\\sin^2x=1-\\cos^2x$ et factorisez le dénominateur.",
      es: "Escribe $\\sin^2x=1-\\cos^2x$ y factoriza el denominador.",
      ja: "$\\sin^2x=1-\\cos^2x$ として分母を因数分解。",
      zh: "把 $\\sin^2x$ 写成 $1-\\cos^2x$ 并分解分母。"
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
      const S = ([x, y]) => [0.2 + (x - (-0.3)) * 0.66667, 0.2 + (y - (-0.1)) * 1.84615];
      const K = 0.66667;
      F.seg(S([-0.3, 0]), S([6.6, 0]), 'axis'); F.seg(S([0, -0.1]), S([0, 1.2]), 'axis');
      plot(F, S, x => 1 / (Math.cos(x) + 2), 0, 2 * Math.PI, 'graph'); F.text(S([2 * Math.PI, 0]), '2π', 'tick', 0, 14);
      F.reveal = () => {
      F.seg(S([0, 1]), S([6.4, 1]), 'seg thin dashc'); F.seg(S([0, 1 / 3]), S([6.4, 1 / 3]), 'seg thin dashc'); F.text(S([6.4, 1]), '1', 'len small', 10, 0); F.text(S([6.4, 1 / 3]), '1/3', 'len small', 14, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2π": {"fr": "2π", "es": "2π", "ja": "2π", "zh": "2π"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "1/3": {"fr": "1/3", "es": "1/3", "ja": "1/3", "zh": "1/3"},
      "the largest value of": {"fr": "la plus grande valeur de", "es": "el mayor valor de", "ja": "", "zh": ""},
      "is": {"fr": "est", "es": "es", "ja": "の最大値は", "zh": "的最大值为"}
    },
    options: [
      { tex: "D=\\tfrac23", correct: true, why: {
        en: "$1-\\tfrac13$",
        fr: "$1-\\tfrac13$",
        es: "$1-\\tfrac13$",
        ja: "$1-\\tfrac13$",
        zh: "$1-\\tfrac13$"
      } },
      { tex: "f(x)=\\dfrac1{\\cos x+2}", correct: true, why: {
        en: "$(\\cos x+2)(\\cos x+3)$",
        fr: "$(\\cos x+2)(\\cos x+3)$",
        es: "$(\\cos x+2)(\\cos x+3)$",
        ja: "$(\\cos x+2)(\\cos x+3)$",
        zh: "$(\\cos x+2)(\\cos x+3)$"
      } },
      { tex: "D=\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "D=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "D=\\tfrac43", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "D=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "D=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the largest value of}\\ f\\ \\text{is}\\ \\tfrac13", correct: false, why: {
        en: "That is the smallest value.",
        fr: "C’est la plus petite valeur.",
        es: "Es el menor valor.",
        ja: "それは最小値。",
        zh: "那是最小值。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factorise",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["7+5c-(1-c^2)=c^2+5c+6=(c+2)(c+3)"],
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
          en: "Range",
          fr: "Image",
          es: "Recorrido",
          ja: "値域",
          zh: "值域"
        },
        lines: ["c\\in[-1,1]\\Rightarrow f\\in\\left[\\tfrac13,1\\right],\\ D=\\tfrac23"],
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
