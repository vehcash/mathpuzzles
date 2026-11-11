/* trigonometry · From a trough to a crest
   Gaokao 2024, Beijing paper (北京卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2024-bj-min-gap-max-min",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 6",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 6",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 6",
        ja: "2024年 中国・高考 北京卷 第6問",
        zh: "2024年高考数学北京卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "From a trough to a crest",
      fr: "D’un creux à une crête",
      es: "De un valle a una cresta",
      ja: "谷から山まで",
      zh: "从波谷到波峰"
    },
    statement: {
      en: "$f(x)=\\sin\\omega x$ with $\\omega>0$. $f(x_1)=-1$, $f(x_2)=1$, and the smallest possible $|x_1-x_2|$ is $\\dfrac\\pi2$. <b>Which of the following equal $\\omega$?</b>",
      fr: "$f(x)=\\sin\\omega x$ avec $\\omega>0$. $f(x_1)=-1$, $f(x_2)=1$, et la plus petite valeur possible de $|x_1-x_2|$ est $\\dfrac\\pi2$. <b>Lesquelles des valeurs suivantes sont égales à $\\omega$ ?</b>",
      es: "$f(x)=\\sin\\omega x$ con $\\omega>0$. $f(x_1)=-1$, $f(x_2)=1$, y el menor valor posible de $|x_1-x_2|$ es $\\dfrac\\pi2$. <b>¿Cuáles de los siguientes valores son iguales a $\\omega$?</b>",
      ja: "$f(x)=\\sin\\omega x$（$\\omega>0$）で $f(x_1)=-1$、$f(x_2)=1$、$|x_1-x_2|$ の最小値は $\\dfrac\\pi2$ です。<b>$\\omega$ に等しいものはどれですか？</b>",
      zh: "设 $f(x)=\\sin\\omega x$（$\\omega>0$），$f(x_1)=-1$，$f(x_2)=1$，$|x_1-x_2|$ 的最小值为 $\\dfrac\\pi2$。<b>下列哪些等于 $\\omega$？</b>"
    },
    figureText: {
      en: "Axes with the lines y = 1 and y = −1 dashed and a gap of π/2 marked on the x-axis.",
      fr: "Des axes avec les droites y = 1 et y = −1 en pointillés et un écart de π/2 marqué sur l’axe des x.",
      es: "Ejes con las rectas y = 1 e y = −1 discontinuas y una distancia π/2 marcada en el eje x.",
      ja: "点線 y = 1, y = −1 と x 軸上の幅 π/2。",
      zh: "虚线 y = 1、y = −1，x 轴上标出间距 π/2。"
    },
    hint: {
      en: "A trough and the nearest crest are half a period apart.",
      fr: "Un creux et la crête la plus proche sont à une demi-période.",
      es: "Un valle y la cresta más cercana están a medio periodo.",
      ja: "谷と最も近い山は半周期離れている。",
      zh: "波谷与最近的波峰相距半个周期。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 3.4, scale: 46, pad: 16 });
      const T = F.T = axes(F, -0.3, 6.3, -1.6, 1.8);
      [1, -1].forEach(y => F.seg(T([0, y]), T([6.2, y]), 'seg thin dashc'));
      F.text(T([0, 1]), '1', 'tick', -8, 0); F.text(T([0, -1]), '−1', 'tick', -12, 0);
      F.seg(T([3 * Math.PI / 4, -0.08]), T([3 * Math.PI / 4, 0.08]), 'seg thin'); F.seg(T([5 * Math.PI / 4, -0.08]), T([5 * Math.PI / 4, 0.08]), 'seg thin');
      F.text(T([Math.PI, 0]), 'π/2', 'len small', 0, 16);
      F.reveal = () => {
      plot(F, T, x => Math.sin(2 * x), 0, 6.2, 'graph', 'base', -1.6, 1.8);
      F.dot(T([3 * Math.PI / 4, -1])); F.dot(T([5 * Math.PI / 4, 1]));
      };
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$\\tfrac T2=\\tfrac\\pi\\omega=\\tfrac\\pi2$.",
        fr: "$\\tfrac T2=\\tfrac\\pi\\omega=\\tfrac\\pi2$.",
        es: "$\\tfrac T2=\\tfrac\\pi\\omega=\\tfrac\\pi2$.",
        ja: "$\\tfrac T2=\\tfrac\\pi\\omega=\\tfrac\\pi2$。",
        zh: "$\\tfrac T2=\\tfrac\\pi\\omega=\\tfrac\\pi2$。"
      } },
      { tex: "\\sqrt4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4", correct: false, why: {
        en: "That makes $\\tfrac\\pi2$ a whole period.",
        fr: "Alors $\\tfrac\\pi2$ serait une période entière.",
        es: "Así $\\tfrac\\pi2$ sería un periodo entero.",
        ja: "それだと $\\tfrac\\pi2$ が1周期になる。",
        zh: "那样 $\\tfrac\\pi2$ 是整个周期。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\pi", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "8", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Half a period",
          fr: "Une demi-période",
          es: "Medio periodo",
          ja: "半周期",
          zh: "半个周期"
        },
        lines: ["|x_1-x_2|_{\\min}=\\frac T2=\\frac{\\pi}{\\omega}=\\frac\\pi2\\ \\Rightarrow\\ \\omega=\\boxed{2}"],
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
