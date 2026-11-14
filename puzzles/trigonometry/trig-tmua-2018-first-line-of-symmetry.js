/* trigonometry · The first line of symmetry of y = sin(2x − 4π/3)
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 18 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2018-first-line-of-symmetry",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 18",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 18",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 18",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第18問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 18 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "The first line of symmetry of y = sin(2x − 4π/3)",
      fr: "Le premier axe de symétrie de y = sin(2x − 4π/3)",
      es: "El primer eje de simetría de y = sen(2x − 4π/3)",
      ja: "y = sin(2x − 4π/3) の最初の対称軸",
      zh: "y = sin(2x − 4π/3) 的第一条对称轴"
    },
    statement: {
      en: "Let $x=s$ be the vertical line of symmetry of $y=\\sin\\bigl(2x-\\tfrac{4\\pi}3\\bigr)$ with the smallest positive $s$. <b>Which of the following are true?</b>",
      fr: "Soit $x=s$ l’axe de symétrie vertical de $y=\\sin\\bigl(2x-\\tfrac{4\\pi}3\\bigr)$ de plus petit $s>0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $x=s$ el eje de simetría vertical de $y=\\sin\\bigl(2x-\\tfrac{4\\pi}3\\bigr)$ con el menor $s>0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=\\sin\\bigl(2x-\\tfrac{4\\pi}3\\bigr)$ の縦の対称軸のうち $s>0$ が最小のものを $x=s$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $y=\\sin\\bigl(2x-\\tfrac{4\\pi}3\\bigr)$ 的竖直对称轴中 $s>0$ 最小的为 $x=s$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A sine wave of period π.",
      fr: "Une sinusoïde de période π.",
      es: "Una sinusoide de periodo π.",
      ja: "周期 π の正弦波。",
      zh: "周期为 π 的正弦曲线。"
    },
    hint: {
      en: "Lines of symmetry pass through maxima and minima: $2x-\\tfrac{4\\pi}3=\\tfrac\\pi2+n\\pi$.",
      fr: "Les axes passent par les maximums et minimums : $2x-\\tfrac{4\\pi}3=\\tfrac\\pi2+n\\pi$.",
      es: "Los ejes pasan por máximos y mínimos: $2x-\\tfrac{4\\pi}3=\\tfrac\\pi2+n\\pi$.",
      ja: "対称軸は極大・極小を通る：$2x-\\tfrac{4\\pi}3=\\tfrac\\pi2+n\\pi$。",
      zh: "对称轴过最高、最低点：$2x-\\tfrac{4\\pi}3=\\tfrac\\pi2+n\\pi$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.6, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-0.3)) * 1.21053, 0.2 + (y - (-1.3)) * 0.84615];
      const K = 1.21053;
      F.seg(S([-0.3, 0]), S([3.5, 0]), 'axis'); F.seg(S([0, -1.3]), S([0, 1.3]), 'axis');
      plot(F, S, x => Math.sin(2 * x - 4 * Math.PI / 3), 0, 3.4, 'graph'); F.text(S([Math.PI, 0]), 'π', 'tick', 0, 14);
      F.reveal = () => {
      F.seg(S([5 * Math.PI / 12, -1.2]), S([5 * Math.PI / 12, 1.2]), 'hl pink'); F.text(S([5 * Math.PI / 12, 1.2]), '5π/12', 'len small', 20, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "π": {"fr": "π", "es": "π", "ja": "π", "zh": "π"},
      "5π/12": {"fr": "5π/12", "es": "5π/12", "ja": "5π/12", "zh": "5π/12"},
      "the curve has a minimum at": {"fr": "la courbe a un minimum en", "es": "la curva tiene un mínimo en", "ja": "曲線は次で極小：", "zh": "曲线在下列点取最小值："},
      "the curve has a maximum at": {"fr": "la courbe a un maximum en", "es": "la curva tiene un máximo en", "ja": "曲線は次で極大：", "zh": "曲线在下列点取最大值："}
    },
    options: [
      { tex: "s=\\tfrac{5\\pi}{12}", correct: true, why: {
        en: "$\\sin\\bigl(\\tfrac{5\\pi}6-\\tfrac{4\\pi}3\\bigr)=-1$",
        fr: "$\\sin\\bigl(\\tfrac{5\\pi}6-\\tfrac{4\\pi}3\\bigr)=-1$",
        es: "$\\sin\\bigl(\\tfrac{5\\pi}6-\\tfrac{4\\pi}3\\bigr)=-1$",
        ja: "$\\sin\\bigl(\\tfrac{5\\pi}6-\\tfrac{4\\pi}3\\bigr)=-1$",
        zh: "$\\sin\\bigl(\\tfrac{5\\pi}6-\\tfrac{4\\pi}3\\bigr)=-1$"
      } },
      { tex: "\\text{the curve has a minimum at}\\ x=s", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "s=\\tfrac{11\\pi}{12}", correct: false, why: {
        en: "The first maximum, not the first line.",
        fr: "Le premier maximum, pas le premier axe.",
        es: "El primer máximo, no el primer eje.",
        ja: "最初の極大で最初の軸ではない。",
        zh: "那是第一个最大值点。"
      } },
      { tex: "s=\\tfrac{2\\pi}3", correct: false, why: {
        en: "A zero of the curve.",
        fr: "Un zéro de la courbe.",
        es: "Un cero de la curva.",
        ja: "曲線の零点。",
        zh: "曲线的零点。"
      } },
      { tex: "s=\\tfrac\\pi6", correct: false, why: {
        en: "$\\sin(-\\pi)=0$",
        fr: "$\\sin(-\\pi)=0$",
        es: "$\\sin(-\\pi)=0$",
        ja: "$\\sin(-\\pi)=0$",
        zh: "$\\sin(-\\pi)=0$"
      } },
      { tex: "s=\\tfrac\\pi{12}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "s=\\tfrac{7\\pi}{12}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the curve has a maximum at}\\ x=s", correct: false, why: {
        en: "$y(s)=-1$",
        fr: "$y(s)=-1$",
        es: "$y(s)=-1$",
        ja: "$y(s)=-1$",
        zh: "$y(s)=-1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Extremes",
          fr: "Extremums",
          es: "Extremos",
          ja: "極値",
          zh: "极值"
        },
        lines: ["2x-\\tfrac{4\\pi}3=-\\tfrac\\pi2+2n\\pi\\Rightarrow x=\\tfrac{5\\pi}{12}+n\\pi"],
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
          en: "Smallest positive",
          fr: "Plus petit positif",
          es: "Menor positivo",
          ja: "最小の正の値",
          zh: "最小正值"
        },
        lines: ["\\tfrac{5\\pi}{12}<\\tfrac{11\\pi}{12}\\Rightarrow s=\\tfrac{5\\pi}{12}"],
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
