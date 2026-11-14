/* trigonometry · The longest interval where a trig square root is defined
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-ita-2025-longest-domain-interval",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 8",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 8",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 8",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第8問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 8 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "The longest interval where a trig square root is defined",
      fr: "Le plus long intervalle où une racine trigonométrique est définie",
      es: "El intervalo más largo donde una raíz trigonométrica está definida",
      ja: "三角関数の平方根が定義される最長区間",
      zh: "三角根式有定义的最长区间"
    },
    statement: {
      en: "Let $f(x)=\\sqrt{\\dfrac{2\\sin2x+2\\sin x-2\\cos x-1}{8(\\cos2x+1)}}$. Let $I=(a,b)$ be the longest open interval inside $[-\\pi,2\\pi]$ on which $f$ is defined. <b>Which of the following are true?</b>",
      fr: "Soit $f(x)=\\sqrt{\\dfrac{2\\sin2x+2\\sin x-2\\cos x-1}{8(\\cos2x+1)}}$. Soit $I=(a,b)$ le plus long intervalle ouvert inclus dans $[-\\pi,2\\pi]$ sur lequel $f$ est définie. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x)=\\sqrt{\\dfrac{2\\sin2x+2\\sin x-2\\cos x-1}{8(\\cos2x+1)}}$. Sea $I=(a,b)$ el intervalo abierto más largo dentro de $[-\\pi,2\\pi]$ donde $f$ está definida. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=\\sqrt{\\dfrac{2\\sin2x+2\\sin x-2\\cos x-1}{8(\\cos2x+1)}}$ とし、$[-\\pi,2\\pi]$ に含まれ $f$ が定義される最長の開区間を $I=(a,b)$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x)=\\sqrt{\\dfrac{2\\sin2x+2\\sin x-2\\cos x-1}{8(\\cos2x+1)}}$，$I=(a,b)$ 为 $[-\\pi,2\\pi]$ 内使 $f$ 有定义的最长开区间。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The unit circle with the lines sin x = 1/2 and cos x = −1/2.",
      fr: "Le cercle unité avec les droites sin x = 1/2 et cos x = −1/2.",
      es: "La circunferencia unidad con las rectas sin x = 1/2 y cos x = −1/2.",
      ja: "単位円と直線 sin x = 1/2、cos x = −1/2。",
      zh: "单位圆与直线 sin x = 1/2、cos x = −1/2。"
    },
    hint: {
      en: "The numerator factors as $(2\\sin x-1)(2\\cos x+1)$ and the denominator is $16\\cos^2x$.",
      fr: "Le numérateur vaut $(2\\sin x-1)(2\\cos x+1)$ et le dénominateur $16\\cos^2x$.",
      es: "El numerador es $(2\\sin x-1)(2\\cos x+1)$ y el denominador $16\\cos^2x$.",
      ja: "分子は $(2\\sin x-1)(2\\cos x+1)$、分母は $16\\cos^2x$。",
      zh: "分子为 $(2\\sin x-1)(2\\cos x+1)$，分母为 $16\\cos^2x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 54, pad: 16 });
      const T = F.T = axes(F, -1.5, 1.5, -1.5, 1.5);
      F.circle(T([0, 0]), 1, 'seg'); F.seg(T([-1.4, 0.5]), T([1.4, 0.5]), 'seg thin dashc'); F.seg(T([-0.5, -1.4]), T([-0.5, 1.4]), 'seg thin dashc');
      F.text(T([1.4, 0.5]), 'sin = ½', 'tick', -16, -8); F.text(T([-0.5, -1.4]), 'cos = −½', 'tick', 24, 0);
      F.reveal = () => {
      F.arc(T([0, 0]), 1, 150, 240, 'hl pink'); F.arc(T([0, 0]), 1, 30, 120, 'hl');
      F.text(T([-0.3, -0.45]), '5π/6 → 4π/3', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "sin = ½": {"fr": "sin = ½", "es": "sen = ½", "ja": "sin = ½", "zh": "sin = ½"},
      "cos = −½": {"fr": "cos = −½", "es": "cos = −½", "ja": "cos = −½", "zh": "cos = −½"},
      "5π/6 → 4π/3": {"fr": "5π/6 → 4π/3", "es": "5π/6 → 4π/3", "ja": "5π/6 → 4π/3", "zh": "5π/6 → 4π/3"}
    },
    options: [
      { tex: "a+b=\\tfrac{13\\pi}{6}", correct: true, why: {
        en: "$I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)$",
        fr: "$I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)$",
        es: "$I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)$",
        ja: "$I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)$",
        zh: "$I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)$"
      } },
      { tex: "b-a=\\tfrac\\pi2", correct: true, why: {
        en: "$\\tfrac{4\\pi}3-\\tfrac{5\\pi}6=\\tfrac\\pi2$",
        fr: "$\\tfrac{4\\pi}3-\\tfrac{5\\pi}6=\\tfrac\\pi2$",
        es: "$\\tfrac{4\\pi}3-\\tfrac{5\\pi}6=\\tfrac\\pi2$",
        ja: "$\\tfrac{4\\pi}3-\\tfrac{5\\pi}6=\\tfrac\\pi2$",
        zh: "$\\tfrac{4\\pi}3-\\tfrac{5\\pi}6=\\tfrac\\pi2$"
      } },
      { tex: "I=\\left(\\tfrac\\pi6,\\tfrac{2\\pi}3\\right)", correct: false, why: {
        en: "$f$ is undefined at $x=\\tfrac\\pi2$, where $\\cos x=0$, so this splits in two.",
        fr: "$f$ n’est pas définie en $x=\\tfrac\\pi2$ ($\\cos x=0$) : l’intervalle se coupe en deux.",
        es: "$f$ no está definida en $x=\\tfrac\\pi2$ ($\\cos x=0$): el intervalo se parte en dos.",
        ja: "$x=\\tfrac\\pi2$ で $\\cos x=0$ となり定義されず、2つに割れる。",
        zh: "$x=\\tfrac\\pi2$ 处 $\\cos x=0$ 无定义，区间被分成两段。"
      } },
      { tex: "a+b=\\tfrac{5\\pi}{6}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=\\tfrac{2\\pi}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2\\sin2x+2\\sin x-2\\cos x-1=(2\\sin x+1)(2\\cos x-1)", correct: false, why: {
        en: "$(2\\sin x-1)(2\\cos x+1)$",
        fr: "$(2\\sin x-1)(2\\cos x+1)$",
        es: "$(2\\sin x-1)(2\\cos x+1)$",
        ja: "$(2\\sin x-1)(2\\cos x+1)$",
        zh: "$(2\\sin x-1)(2\\cos x+1)$"
      } },
      { tex: "8(\\cos2x+1)=16\\sin^2x", correct: false, why: {
        en: "$\\cos2x+1=2\\cos^2x$",
        fr: "$\\cos2x+1=2\\cos^2x$",
        es: "$\\cos2x+1=2\\cos^2x$",
        ja: "$\\cos2x+1=2\\cos^2x$",
        zh: "$\\cos2x+1=2\\cos^2x$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["\\dfrac{(2\\sin x-1)(2\\cos x+1)}{16\\cos^2x}\\ge0,\\quad\\cos x\\ne0"],
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
          en: "Pieces",
          fr: "Morceaux",
          es: "Trozos",
          ja: "区間",
          zh: "区间"
        },
        lines: ["\\left(\\tfrac\\pi6,\\tfrac\\pi2\\right),\\ \\left(\\tfrac\\pi2,\\tfrac{2\\pi}3\\right),\\ \\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right),\\ \\dots\\Rightarrow I=\\left(\\tfrac{5\\pi}6,\\tfrac{4\\pi}3\\right)"],
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
