/* calculus · One to the power infinity
   lim (1 + 2/x)^x = e² (a 1^∞ form). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => Math.pow(1 + 2 / x, x);

  PuzzleBank.define({
    id: "calc-limit-e-squared",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "classic",
      note: {
        en: "Jacob Bernoulli’s compound-interest question (1683), which led to the number $e$.",
        fr: "La question des intérêts composés de Jacques Bernoulli (1683), à l’origine du nombre $e$.",
        es: "La pregunta del interés compuesto de Jakob Bernoulli (1683), que dio origen al número $e$.",
        ja: "ヤコブ・ベルヌーイの複利の問題（1683年）。ここから数 $e$ が生まれた。",
        zh: "雅各布·伯努利的复利问题（1683年），常数 $e$ 由此而来。"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "One to the power infinity",
      fr: "Un puissance l’infini",
      es: "Uno elevado a infinito",
      ja: "1 の無限大乗",
      zh: "1 的无穷次方"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\lim_{x\\to\\infty}\\left(1 + \\frac{2}{x}\\right)^{x}$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\lim_{x\\to\\infty}\\left(1 + \\frac{2}{x}\\right)^{x}$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\lim_{x\\to\\infty}\\left(1 + \\frac{2}{x}\\right)^{x}$?</b>",
      ja: "<b>次のうち $\\displaystyle\\lim_{x\\to\\infty}\\left(1 + \\frac{2}{x}\\right)^{x}$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\lim_{x\\to\\infty}\\left(1 + \\frac{2}{x}\\right)^{x}$？</b>"
    },
    figureText: {
      en: "The graph of (1 + 2/x)^x rising towards a dashed horizontal line at about 7.39.",
      fr: "Le graphe de (1 + 2/x)^x qui monte vers une droite pointillée à environ 7,39.",
      es: "La gráfica de (1 + 2/x)^x subiendo hacia una recta discontinua en torno a 7,39.",
      ja: "(1 + 2/x)^x のグラフが、約 7.39 の破線に近づいていきます。",
      zh: "(1 + 2/x)^x 的图像逐渐上升趋近约 7.39 处的虚线。"
    },
    hint: {
      en: "Take logarithms: $x\\ln\\left(1 + \\tfrac2x\\right) \\to ?$",
      fr: "Passez au logarithme : $x\\ln\\left(1 + \\tfrac2x\\right) \\to ?$",
      es: "Toma logaritmos: $x\\ln\\left(1 + \\tfrac2x\\right) \\to ?$",
      ja: "対数をとる：$x\\ln\\left(1 + \\tfrac2x\\right) \\to ?$",
      zh: "取对数：$x\\ln\\left(1 + \\tfrac2x\\right) \\to ?$"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example substituting x = 2t to reach the definition of e), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en posant x = 2t pour retrouver la définition de e), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo sustituyendo x = 2t para llegar a la definición de e), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば x = 2t とおいて e の定義に帰着させる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如令 x = 2t 化为 e 的定义），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 4.4, scale: 40, pad: 18 });
      const T = F.T = axes(F, -0.4, 6.2, -0.4, 4);
      const g = x => f(3 * x) / 2;   // horizontal unit 3, vertical unit 2
      F.seg(T([0, Math.E * Math.E / 2]), T([6, Math.E * Math.E / 2]), 'seg thin');
      plot(F, T, g, 0.08, 6, 'graph');
      F.text(T([0, Math.E * Math.E / 2]), 'e²', 'len small', -14, 0);
      return F;
    },
    options: [
      { tex: "e^2", correct: true, why: {
        en: "$\\exp\\left(\\lim x\\ln(1 + \\tfrac2x)\\right) = e^2$.",
        fr: "$\\exp\\left(\\lim x\\ln(1 + \\tfrac2x)\\right) = e^2$.",
        es: "$\\exp\\left(\\lim x\\ln(1 + \\tfrac2x)\\right) = e^2$.",
        ja: "$\\exp\\left(\\lim x\\ln(1 + \\tfrac2x)\\right) = e^2$.",
        zh: "$\\exp\\left(\\lim x\\ln(1 + \\tfrac2x)\\right) = e^2$."
      } },
      { tex: "\\left(\\lim_{t\\to\\infty}\\left(1 + \\tfrac1t\\right)^t\\right)^2", correct: true, why: {
        en: "With $x = 2t$ the expression is $\\left((1 + \\tfrac1t)^t\\right)^2$.",
        fr: "Avec $x = 2t$ l’expression vaut $\\left((1 + \\tfrac1t)^t\\right)^2$.",
        es: "Con $x = 2t$ la expresión es $\\left((1 + \\tfrac1t)^t\\right)^2$.",
        ja: "$x = 2t$ とおくと $\\left((1 + \\tfrac1t)^t\\right)^2$。",
        zh: "令 $x = 2t$，式子变为 $\\left((1 + \\tfrac1t)^t\\right)^2$。"
      } },
      { tex: "1", correct: false, why: {
        en: "“$1^\\infty = 1$” is a trap: the base tends to $1$ while the exponent explodes.",
        fr: "« $1^\\infty = 1$ » est un piège : la base tend vers $1$ mais l’exposant explose.",
        es: "«$1^\\infty = 1$» es una trampa: la base tiende a $1$ mientras el exponente crece sin límite.",
        ja: "「$1^\\infty = 1$」は罠です。底は $1$ に近づき、指数は発散します。",
        zh: "“$1^\\infty = 1$”是陷阱：底趋于 $1$，指数却趋于无穷。"
      } },
      { tex: "e", correct: false, why: {
        en: "That is the limit of $(1 + \\tfrac1x)^x$.",
        fr: "C’est la limite de $(1 + \\tfrac1x)^x$.",
        es: "Es el límite de $(1 + \\tfrac1x)^x$.",
        ja: "それは $(1 + \\tfrac1x)^x$ の極限です。",
        zh: "那是 $(1 + \\tfrac1x)^x$ 的极限。"
      } },
      { tex: "2e", correct: false, why: {
        en: "The $2$ goes into the exponent, not in front.",
        fr: "Le $2$ va dans l’exposant, pas devant.",
        es: "El $2$ va al exponente, no delante.",
        ja: "$2$ は前ではなく指数に入ります。",
        zh: "$2$ 应进入指数，而不是乘在前面。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "The graph levels off; it does not grow without bound.",
        fr: "Le graphe se stabilise ; il ne croît pas indéfiniment.",
        es: "La gráfica se estabiliza; no crece sin límite.",
        ja: "グラフは水平に近づき、限りなく大きくはなりません。",
        zh: "图像趋于水平，并不无限增大。"
      } },
      { tex: "\\sqrt e", correct: false, why: {
        en: "That would be $(1 + \\tfrac{1}{2x})^x$.",
        fr: "Ce serait $(1 + \\tfrac{1}{2x})^x$.",
        es: "Sería $(1 + \\tfrac{1}{2x})^x$.",
        ja: "それは $(1 + \\tfrac{1}{2x})^x$ の極限です。",
        zh: "那是 $(1 + \\tfrac{1}{2x})^x$ 的极限。"
      } },
      { tex: "e^{1/2}", correct: false, why: {
        en: "The same as $\\sqrt e$ — also wrong.",
        fr: "Identique à $\\sqrt e$ — faux aussi.",
        es: "Igual que $\\sqrt e$ — también falso.",
        ja: "$\\sqrt e$ と同じで、これも誤り。",
        zh: "与 $\\sqrt e$ 相同，也是错的。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Take the logarithm",
          fr: "Prendre le logarithme",
          es: "Tomar logaritmos",
          ja: "対数をとる",
          zh: "取对数"
        },
        lines: ["\\ln y = x\\ln\\left(1 + \\tfrac2x\\right) = \\frac{\\ln\\left(1 + \\frac2x\\right)}{1/x} \\to 2"],
        note: {
          en: "$\\ln(1 + h) \\approx h$ for small $h$, here $h = \\tfrac2x$.",
          fr: "$\\ln(1 + h) \\approx h$ pour $h$ petit, ici $h = \\tfrac2x$.",
          es: "$\\ln(1 + h) \\approx h$ para $h$ pequeño, aquí $h = \\tfrac2x$.",
          ja: "小さな $h$ で $\\ln(1 + h) \\approx h$、ここでは $h = \\tfrac2x$。",
          zh: "当 $h$ 很小时 $\\ln(1 + h) \\approx h$，这里 $h = \\tfrac2x$。"
        }
      },
      {
        title: {
          en: "Exponentiate",
          fr: "Revenir à l’exponentielle",
          es: "Aplicar la exponencial",
          ja: "指数に戻す",
          zh: "取指数"
        },
        lines: ["y \\to \\boxed{e^2} \\approx 7.39"],
        note: {
          en: "In general $\\left(1 + \\tfrac{a}{x}\\right)^x \\to e^a$.",
          fr: "En général $\\left(1 + \\tfrac{a}{x}\\right)^x \\to e^a$.",
          es: "En general $\\left(1 + \\tfrac{a}{x}\\right)^x \\to e^a$.",
          ja: "一般に $\\left(1 + \\tfrac{a}{x}\\right)^x \\to e^a$。",
          zh: "一般地 $\\left(1 + \\tfrac{a}{x}\\right)^x \\to e^a$。"
        },
        fig(F) { F.draw(F.seg(F.T([0, Math.E * Math.E / 2]), F.T([6, Math.E * Math.E / 2]), 'hl yellow', 'over'), 700); }
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
