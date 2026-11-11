/* trigonometry · Reading a sinusoid
   Period, amplitude and phase shift of 2 sin(2x + π/3). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => 2 * Math.sin(2 * x + Math.PI / 3);

  PuzzleBank.define({
    id: "trig-sinusoid-properties",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Reading a sinusoid",
      fr: "Lire une sinusoïde",
      es: "Leer una sinusoide",
      ja: "正弦曲線を読む",
      zh: "读懂正弦曲线"
    },
    statement: {
      en: "Let $f(x) = 2\\sin\\!\\left(2x + \\tfrac{\\pi}{3}\\right)$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x) = 2\\sin\\!\\left(2x + \\tfrac{\\pi}{3}\\right)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x) = 2\\sin\\!\\left(2x + \\tfrac{\\pi}{3}\\right)$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "$f(x) = 2\\sin\\!\\left(2x + \\tfrac{\\pi}{3}\\right)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x) = 2\\sin\\!\\left(2x + \\tfrac{\\pi}{3}\\right)$。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The graph of f(x) = 2 sin(2x + π/3). Key values are marked in the solution.",
      fr: "La courbe de f(x) = 2 sin(2x + π/3). Les valeurs clés sont marquées dans la solution.",
      es: "La gráfica de f(x) = 2 sen(2x + π/3). Los valores clave se marcan en la solución.",
      ja: "f(x) = 2 sin(2x + π/3) のグラフ。主な値は解答で示します。",
      zh: "f(x) = 2 sin(2x + π/3) 的图像。关键值在解答中标出。"
    },
    hint: {
      en: "For $A\\sin(\\omega x + \\varphi)$: period $\\tfrac{2\\pi}{\\omega}$, amplitude $A$, shift $-\\tfrac{\\varphi}{\\omega}$.",
      fr: "For $A\\sin(\\omega x + \\varphi)$: period $\\tfrac{2\\pi}{\\omega}$, amplitude $A$, shift $-\\tfrac{\\varphi}{\\omega}$.",
      es: "For $A\\sin(\\omega x + \\varphi)$: period $\\tfrac{2\\pi}{\\omega}$, amplitude $A$, shift $-\\tfrac{\\varphi}{\\omega}$.",
      ja: "For $A\\sin(\\omega x + \\varphi)$: period $\\tfrac{2\\pi}{\\omega}$, amplitude $A$, shift $-\\tfrac{\\varphi}{\\omega}$.",
      zh: "For $A\\sin(\\omega x + \\varphi)$: period $\\tfrac{2\\pi}{\\omega}$, amplitude $A$, shift $-\\tfrac{\\varphi}{\\omega}$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example by substituting a few values of x and sketching the graph), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en calculant quelques valeurs de x et en esquissant le graphe), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo sustituyendo algunos valores de x y esbozando la gráfica), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えばいくつかの x の値を代入してグラフを描く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如代入几个 x 值并画出草图），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 5.4, scale: 40, pad: 18 });
      const T = F.T = axes(F, -0.6, 6.8, -2.7, 2.7);
      plot(F, T, f, -0.5, 6.6);
      F.reveal = () => {
        F.seg(T([Math.PI / 12, 0]), T([Math.PI / 12, 2]), 'seg thin');
        F.text(T([0, 2]), '2', 'len small', -10, 0); F.text(T([Math.PI / 12, 0]), 'π/12', 'len small', 6, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the period is": { fr: "la période est", es: "el período es", ja: "周期は", zh: "周期为" },
      "the maximum value is": { fr: "le maximum vaut", es: "el valor máximo es", ja: "最大値は", zh: "最大值为" },
      "the amplitude is": { fr: "l’amplitude est", es: "la amplitud es", ja: "振幅は", zh: "振幅为" },
      "it is": { fr: "c’est", es: "es", ja: "これは", zh: "它是" },
      "shifted left by": { fr: "décalé vers la gauche de", es: "desplazada a la izquierda", ja: "を左へずらしたもの：", zh: "向左平移" },
      "is increasing on": { fr: "est croissante sur", es: "es creciente en", ja: "は増加：", zh: "递增于" }
    },
    options: [
      { tex: "\\text{the period is } \\pi", correct: true, why: {
        en: "$\\tfrac{2\\pi}{2} = \\pi$.",
        fr: "$\\tfrac{2\\pi}{2} = \\pi$.",
        es: "$\\tfrac{2\\pi}{2} = \\pi$.",
        ja: "$\\tfrac{2\\pi}{2} = \\pi$.",
        zh: "$\\tfrac{2\\pi}{2} = \\pi$."
      } },
      { tex: "\\text{the maximum value is } 2", correct: true, why: {
        en: "The amplitude is $2$.",
        fr: "L’amplitude vaut $2$.",
        es: "La amplitud es $2$.",
        ja: "振幅は $2$。",
        zh: "振幅为 $2$。"
      } },
      { tex: "\\text{the period is } 2\\pi", correct: false, why: {
        en: "That is the period of $\\sin x$; the factor $2$ halves it.",
        fr: "C’est la période de $\\sin x$ ; le facteur $2$ la divise par deux.",
        es: "Es el período de $\\sin x$; el factor $2$ lo reduce a la mitad.",
        ja: "それは $\\sin x$ の周期で、係数 $2$ で半分になります。",
        zh: "那是 $\\sin x$ 的周期；因子 $2$ 使它减半。"
      } },
      { tex: "\\text{the amplitude is } 4", correct: false, why: {
        en: "The amplitude is the factor in front, $2$.",
        fr: "L’amplitude est le facteur devant, $2$.",
        es: "La amplitud es el factor de delante, $2$.",
        ja: "振幅は前の係数 $2$ です。",
        zh: "振幅是前面的系数 $2$。"
      } },
      { tex: "f(0) = 1", correct: false, why: {
        en: "$f(0) = 2\\sin\\tfrac{\\pi}{3} = \\sqrt3$.",
        fr: "$f(0) = 2\\sin\\tfrac{\\pi}{3} = \\sqrt3$.",
        es: "$f(0) = 2\\sin\\tfrac{\\pi}{3} = \\sqrt3$.",
        ja: "$f(0) = 2\\sin\\tfrac{\\pi}{3} = \\sqrt3$.",
        zh: "$f(0) = 2\\sin\\tfrac{\\pi}{3} = \\sqrt3$."
      } },
      { tex: "\\text{it is } \\sin 2x \\text{ shifted left by } \\tfrac{\\pi}{3}", correct: false, why: {
        en: "$2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)$: the shift is $\\tfrac{\\pi}{6}$.",
        fr: "$2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)$: the shift is $\\tfrac{\\pi}{6}$.",
        es: "$2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)$: the shift is $\\tfrac{\\pi}{6}$.",
        ja: "$2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)$: the shift is $\\tfrac{\\pi}{6}$.",
        zh: "$2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)$: the shift is $\\tfrac{\\pi}{6}$."
      } },
      { tex: "f \\text{ is increasing on } \\left[0, \\tfrac{\\pi}{2}\\right]", correct: false, why: {
        en: "It peaks at $x = \\tfrac{\\pi}{12}$ and then decreases.",
        fr: "Il atteint son maximum en $x = \\tfrac{\\pi}{12}$ puis décroît.",
        es: "Alcanza el máximo en $x = \\tfrac{\\pi}{12}$ y luego decrece.",
        ja: "$x = \\tfrac{\\pi}{12}$ で最大になり、その後減少します。",
        zh: "在 $x = \\tfrac{\\pi}{12}$ 处达到最大，然后递减。"
      } },
      { tex: "f\\left(\\tfrac{\\pi}{12}\\right) = 0", correct: false, why: {
        en: "$2\\cdot\\tfrac{\\pi}{12} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$, so $f = 2$, a maximum.",
        fr: "$2\\cdot\\tfrac{\\pi}{12} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$, so $f = 2$, a maximum.",
        es: "$2\\cdot\\tfrac{\\pi}{12} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$, so $f = 2$, a maximum.",
        ja: "$2\\cdot\\tfrac{\\pi}{12} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$, so $f = 2$, a maximum.",
        zh: "$2\\cdot\\tfrac{\\pi}{12} + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2}$, so $f = 2$, a maximum."
      } }
    ],
    steps: [
      {
        title: {
          en: "Period and amplitude",
          fr: "Période et amplitude",
          es: "Período y amplitud",
          ja: "周期と振幅",
          zh: "周期与振幅"
        },
        lines: ["T = \\frac{2\\pi}{2} = \\pi, \\qquad A = 2"],
        note: {
          en: "The $2$ inside squeezes the graph; the $2$ in front stretches it.",
          fr: "Le $2$ à l’intérieur comprime le graphe ; le $2$ devant l’étire.",
          es: "El $2$ de dentro comprime la gráfica; el $2$ de delante la estira.",
          ja: "中の $2$ はグラフを縮め、前の $2$ は伸ばします。",
          zh: "里面的 $2$ 压缩图像，前面的 $2$ 拉伸图像。"
        },
        fig(F) { F.draw(F.seg(F.T([Math.PI / 12, 2]), F.T([Math.PI / 12 + Math.PI, 2]), 'hl yellow', 'over'), 800); }
      },
      {
        fig(F) { if (F.reveal) F.reveal(); },
        title: {
          en: "Phase shift and maximum",
          fr: "Déphasage et maximum",
          es: "Desfase y máximo",
          ja: "位相のずれと最大",
          zh: "相移与最大值"
        },
        lines: ["2x + \\tfrac{\\pi}{3} = 2\\left(x + \\tfrac{\\pi}{6}\\right)", "2x + \\tfrac{\\pi}{3} = \\tfrac{\\pi}{2} \\ \\Rightarrow\\ x = \\tfrac{\\pi}{12}"],
        note: {
          en: "Factor out the $2$ before reading the shift.",
          fr: "Mettez le $2$ en facteur avant de lire le déphasage.",
          es: "Saca factor común el $2$ antes de leer el desfase.",
          ja: "位相のずれを読む前に $2$ をくくり出します。",
          zh: "先提出 $2$，再读相移。"
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
          en: "Two statements are true.",
          fr: "Deux affirmations sont vraies.",
          es: "Dos afirmaciones son verdaderas.",
          ja: "正しい記述は2つです。",
          zh: "有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
