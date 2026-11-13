/* trigonometry · log sin 3θ + log cos 2θ = 0
   AMC 12A 2024 (Mathematical Association of America), Problem 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-amc-2024-log-sin-plus-log-cos",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 8",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 8",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 8",
        ja: "AMC 12A 2024（アメリカ数学協会）第8問",
        zh: "AMC 12A 2024（美国数学协会）第 8 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "log sin 3θ + log cos 2θ = 0",
      fr: "log sin 3θ + log cos 2θ = 0",
      es: "log sen 3θ + log cos 2θ = 0",
      ja: "log sin 3θ + log cos 2θ = 0",
      zh: "log sin 3θ + log cos 2θ = 0"
    },
    statement: {
      en: "Consider $\\log(\\sin3\\theta)+\\log(\\cos2\\theta)=0$ for $0\\le\\theta\\le2\\pi$ (real logarithms). <b>Which of the following are true?</b>",
      fr: "On considère $\\log(\\sin3\\theta)+\\log(\\cos2\\theta)=0$ pour $0\\le\\theta\\le2\\pi$ (logarithmes réels). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $\\log(\\sin3\\theta)+\\log(\\cos2\\theta)=0$ para $0\\le\\theta\\le2\\pi$ (logaritmos reales). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0\\le\\theta\\le2\\pi$ で $\\log(\\sin3\\theta)+\\log(\\cos2\\theta)=0$（実数の対数）を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $0\\le\\theta\\le2\\pi$ 上的 $\\log(\\sin3\\theta)+\\log(\\cos2\\theta)=0$（实对数）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of sin 3θ and cos 2θ on one period, both between −1 and 1.",
      fr: "Les courbes de sin 3θ et cos 2θ sur une période, entre −1 et 1.",
      es: "Las gráficas de sen 3θ y cos 2θ en un periodo, entre −1 y 1.",
      ja: "1周期分の sin 3θ と cos 2θ のグラフ（−1〜1）。",
      zh: "一个周期内 sin 3θ 与 cos 2θ 的图像，介于 −1 与 1。"
    },
    hint: {
      en: "Both logs must exist, and the product must be $1$. With both factors in $(0,1]$, each must equal $1$.",
      fr: "Les deux logs doivent exister et le produit valoir $1$. Les deux facteurs étant dans $(0,1]$, chacun vaut $1$.",
      es: "Ambos logaritmos deben existir y el producto valer $1$. Con ambos factores en $(0,1]$, cada uno debe ser $1$.",
      ja: "両方の対数が定義され、積が $1$。どちらも $(0,1]$ なので両方 $1$。",
      zh: "两个对数都需有定义且积为 $1$；两因子都在 $(0,1]$，故都等于 $1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 2.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.2, 6.5, -1.3, 1.3);
      plot(F, T, x => Math.sin(3 * x), 0, 6.28, 'graph', 'base', -1.3, 1.3);
      plot(F, T, x => Math.cos(2 * x), 0, 6.28, 'conic', 'base', -1.3, 1.3);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there are no solutions": {"fr": "il n’y a aucune solution", "es": "no hay soluciones", "ja": "解はない", "zh": "无解"},
      "gives": {"fr": "donne", "es": "da", "ja": "で", "zh": "使得"},
      "but is not a solution": {"fr": "mais n’est pas solution", "es": "pero no es solución", "ja": "だが解ではない", "zh": "但不是解"},
      "there is exactly one solution": {"fr": "il y a exactement une solution", "es": "hay exactamente una solución", "ja": "解はちょうど1つ", "zh": "恰有一个解"},
      "there are two solutions": {"fr": "il y a deux solutions", "es": "hay dos soluciones", "ja": "解は2つ", "zh": "有两个解"},
      "there are four solutions": {"fr": "il y a quatre solutions", "es": "hay cuatro soluciones", "ja": "解は4つ", "zh": "有四个解"},
      "is a solution": {"fr": "est solution", "es": "es solución", "ja": "は解", "zh": "是解"},
      "vs": {"fr": "contre", "es": "frente a", "ja": "対", "zh": "对比"},
      "never equal": {"fr": "jamais égaux", "es": "nunca iguales", "ja": "一致しない", "zh": "永不相等"}
    },
    options: [
      { tex: "\\text{there are no solutions}", correct: true, why: {
        en: "$\\sin3\\theta=1$ needs $\\theta=\\tfrac{(4k+1)\\pi}6$, never a multiple of $\\pi$; $\\cos2\\theta=1$ needs $\\theta=m\\pi$.",
        fr: "$\\sin3\\theta=1$ exige $\\theta=\\tfrac{(4k+1)\\pi}6$, jamais multiple de $\\pi$ ; $\\cos2\\theta=1$ exige $\\theta=m\\pi$.",
        es: "$\\sin3\\theta=1$ exige $\\theta=\\tfrac{(4k+1)\\pi}6$, nunca múltiplo de $\\pi$; $\\cos2\\theta=1$ exige $\\theta=m\\pi$.",
        ja: "$\\sin3\\theta=1$ は $\\theta=\\tfrac{(4k+1)\\pi}6$ で $\\pi$ の倍数にならない。",
        zh: "$\\sin3\\theta=1$ 需 $\\theta=\\tfrac{(4k+1)\\pi}6$，从不是 $\\pi$ 的倍数。"
      } },
      { tex: "\\theta=\\tfrac\\pi2\\ \\text{gives}\\ \\sin3\\theta\\cos2\\theta=1\\ \\text{but is not a solution}", correct: true, why: {
        en: "There both factors are $-1$, so the logarithms are undefined.",
        fr: "Les deux facteurs valent $-1$ : les logarithmes ne sont pas définis.",
        es: "Ahí ambos factores valen $-1$: los logaritmos no están definidos.",
        ja: "両因子が $-1$ で対数が定義されない。",
        zh: "两因子都为 $-1$，对数无定义。"
      } },
      { tex: "\\text{there is exactly one solution}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there are two solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there are four solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\theta=\\tfrac\\pi6\\ \\text{is a solution}", correct: false, why: {
        en: "$\\cos\\tfrac\\pi3=\\tfrac12\\ne1$",
        fr: "$\\cos\\tfrac\\pi3=\\tfrac12\\ne1$",
        es: "$\\cos\\tfrac\\pi3=\\tfrac12\\ne1$",
        ja: "$\\cos\\tfrac\\pi3=\\tfrac12\\ne1$",
        zh: "$\\cos\\tfrac\\pi3=\\tfrac12\\ne1$"
      } },
      { tex: "\\theta=0\\ \\text{is a solution}", correct: false, why: {
        en: "$\\sin0=0$",
        fr: "$\\sin0=0$",
        es: "$\\sin0=0$",
        ja: "$\\sin0=0$",
        zh: "$\\sin0=0$"
      } },
      { tex: "\\theta=\\tfrac{3\\pi}2\\ \\text{is a solution}", correct: false, why: {
        en: "$\\sin\\tfrac{9\\pi}2=1,\\ \\cos3\\pi=-1$",
        fr: "$\\sin\\tfrac{9\\pi}2=1,\\ \\cos3\\pi=-1$",
        es: "$\\sin\\tfrac{9\\pi}2=1,\\ \\cos3\\pi=-1$",
        ja: "$\\sin\\tfrac{9\\pi}2=1,\\ \\cos3\\pi=-1$",
        zh: "$\\sin\\tfrac{9\\pi}2=1,\\ \\cos3\\pi=-1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Combine",
          fr: "Combiner",
          es: "Combinar",
          ja: "まとめる",
          zh: "合并"
        },
        lines: ["\\sin3\\theta>0,\\ \\cos2\\theta>0,\\ \\sin3\\theta\\cos2\\theta=1\\Rightarrow\\sin3\\theta=\\cos2\\theta=1"],
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
          en: "Incompatible",
          fr: "Incompatible",
          es: "Incompatible",
          ja: "両立しない",
          zh: "不相容"
        },
        lines: ["\\theta=\\tfrac{(4k+1)\\pi}6\\ \\text{vs}\\ \\theta=m\\pi:\\ \\text{never equal}"],
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
