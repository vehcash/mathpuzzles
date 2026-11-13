/* calculus · A fast sine wave against a slow logarithm
   AMC 12B 2025 (Mathematical Association of America), Problem 24 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-amc-2025-sine-meets-log",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 24",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 24",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 24",
        ja: "AMC 12B 2025（アメリカ数学協会）第24問",
        zh: "AMC 12B 2025（美国数学协会）第 24 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A fast sine wave against a slow logarithm",
      fr: "Une sinusoïde rapide contre un logarithme lent",
      es: "Una senoide rápida contra un logaritmo lento",
      ja: "速いサイン波と遅い対数",
      zh: "快速正弦波与缓慢的对数"
    },
    statement: {
      en: "<b>Which of the following are true about the equation $\\sin(20\\pi x)=\\log_{20}x$?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies pour l’équation $\\sin(20\\pi x)=\\log_{20}x$ ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre la ecuación $\\sin(20\\pi x)=\\log_{20}x$?</b>",
      ja: "<b>方程式 $\\sin(20\\pi x)=\\log_{20}x$ について正しいものはどれですか？</b>",
      zh: "<b>关于方程 $\\sin(20\\pi x)=\\log_{20}x$，下列哪些正确？</b>"
    },
    figureText: {
      en: "A rapidly oscillating sine curve between −1 and 1 and a slowly rising log curve crossing it many times.",
      fr: "Une sinusoïde oscillant vite entre −1 et 1 et une courbe log qui monte lentement en la croisant souvent.",
      es: "Una senoide que oscila rápido entre −1 y 1 y un logaritmo que sube despacio cortándola muchas veces.",
      ja: "−1 と 1 の間で速く振動するサインと、ゆっくり上がる対数曲線が何度も交わる。",
      zh: "在 −1 与 1 之间快速振荡的正弦曲线与缓慢上升的对数曲线多次相交。"
    },
    hint: {
      en: "Solutions need $-1\\le\\log_{20}x\\le1$, so $x\\in[\\tfrac1{20},20]$. The sine has period $\\tfrac1{10}$: count periods and crossings per period, and watch $x=1$.",
      fr: "Il faut $-1\\le\\log_{20}x\\le1$, donc $x\\in[\\tfrac1{20},20]$. Le sinus a pour période $\\tfrac1{10}$ : comptez les périodes et les croisements par période, et regardez $x=1$.",
      es: "Hace falta $-1\\le\\log_{20}x\\le1$, así que $x\\in[\\tfrac1{20},20]$. El seno tiene periodo $\\tfrac1{10}$: cuenta periodos y cruces por periodo, y vigila $x=1$.",
      ja: "$-1\\le\\log_{20}x\\le1$ より $x\\in[\\tfrac1{20},20]$。周期 $\\tfrac1{10}$ の個数と1周期あたりの交点、$x=1$ に注意。",
      zh: "需 $-1\\le\\log_{20}x\\le1$，即 $x\\in[\\tfrac1{20},20]$。正弦周期 $\\tfrac1{10}$：数周期数及每周期交点，注意 $x=1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.0, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.2, 5.8, -1.4, 1.6);
      plot(F, T, x => Math.sin(2 * Math.PI * x * 2.2), 0.05, 5.6, 'conic', 'base', -1.4, 1.6);
      plot(F, T, x => Math.log(x) / Math.log(5.5), 0.19, 5.6, 'graph', 'base', -1.4, 1.6);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "it has": {"fr": "elle a", "es": "tiene", "ja": "解の個数は", "zh": "有"},
      "real solutions": {"fr": "solutions réelles", "es": "soluciones reales", "ja": "個", "zh": "个实数解"},
      "every solution lies in": {"fr": "toute solution est dans", "es": "toda solución está en", "ja": "すべての解は次に含まれる：", "zh": "所有解都在"},
      "is not a solution": {"fr": "n’est pas solution", "es": "no es solución", "ja": "は解でない", "zh": "不是解"},
      "some solution has": {"fr": "une solution vérifie", "es": "alguna solución cumple", "ja": "ある解は", "zh": "某个解满足"},
      "periods": {"fr": "périodes", "es": "periodos", "ja": "周期", "zh": "个周期"},
      "minus the double-counted": {"fr": "moins le double compte en", "es": "menos el contado dos veces en", "ja": "二重に数えた点を引く：", "zh": "减去重复计数的"}
    },
    options: [
      { tex: "\\text{it has}\\ 399\\ \\text{real solutions}", correct: true, why: {
        en: "About $200$ periods with $2$ crossings each, and the crossing at $x=1$ counted once.",
        fr: "Environ $200$ périodes à $2$ croisements, celui en $x=1$ compté une fois.",
        es: "Unos $200$ periodos con $2$ cruces cada uno, y el de $x=1$ contado una vez.",
        ja: "約 $200$ 周期×2回、$x=1$ は1回だけ数える。",
        zh: "约 $200$ 个周期各 $2$ 个交点，$x=1$ 只计一次。"
      } },
      { tex: "\\text{every solution lies in}\\ \\left[\\tfrac1{20},20\\right]", correct: true, why: {
        en: "Elsewhere $|\\log_{20}x|>1\\ge|\\sin|$.",
        fr: "Ailleurs $|\\log_{20}x|>1\\ge|\\sin|$.",
        es: "Fuera de ahí $|\\log_{20}x|>1\\ge|\\sin|$.",
        ja: "それ以外では $|\\log_{20}x|>1\\ge|\\sin|$。",
        zh: "其他地方 $|\\log_{20}x|>1\\ge|\\sin|$。"
      } },
      { tex: "\\text{it has}\\ 400\\ \\text{real solutions}", correct: false, why: {
        en: "The crossing at $x=1$ would be counted twice.",
        fr: "Le croisement en $x=1$ serait compté deux fois.",
        es: "El cruce en $x=1$ se contaría dos veces.",
        ja: "$x=1$ の交点を2回数えている。",
        zh: "$x=1$ 处的交点被算了两次。"
      } },
      { tex: "\\text{it has}\\ 398\\ \\text{real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{it has}\\ 200\\ \\text{real solutions}", correct: false, why: {
        en: "There are two crossings per period, not one.",
        fr: "Il y a deux croisements par période.",
        es: "Hay dos cruces por periodo.",
        ja: "1周期に2回交わる。",
        zh: "每周期两个交点。"
      } },
      { tex: "x=1\\ \\text{is not a solution}", correct: false, why: {
        en: "$\\sin20\\pi=0=\\log_{20}1$",
        fr: "$\\sin20\\pi=0=\\log_{20}1$",
        es: "$\\sin20\\pi=0=\\log_{20}1$",
        ja: "$\\sin20\\pi=0=\\log_{20}1$",
        zh: "$\\sin20\\pi=0=\\log_{20}1$"
      } },
      { tex: "\\text{some solution has}\\ x>20", correct: false, why: {
        en: "$x>20\\Rightarrow\\log_{20}x>1$",
        fr: "$x>20\\Rightarrow\\log_{20}x>1$",
        es: "$x>20\\Rightarrow\\log_{20}x>1$",
        ja: "$x>20\\Rightarrow\\log_{20}x>1$",
        zh: "$x>20\\Rightarrow\\log_{20}x>1$"
      } },
      { tex: "\\text{it has}\\ 199\\ \\text{real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Window",
          fr: "Fenêtre",
          es: "Ventana",
          ja: "範囲",
          zh: "范围"
        },
        lines: ["|\\log_{20}x|\\le1\\iff\\tfrac1{20}\\le x\\le20"],
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
          en: "Count crossings",
          fr: "Compter les croisements",
          es: "Contar cruces",
          ja: "交点を数える",
          zh: "数交点"
        },
        lines: ["\\approx\\frac{20-0.05}{0.1}\\ \\text{periods}\\times2\\approx400,\\ \\text{minus the double-counted}\\ x=1\\Rightarrow399"],
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
