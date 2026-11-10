/* calculus · A function inside a function
   Chain rule: (sin x²)′ = 2x cos x². */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-chain-sin-square",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "A function inside a function",
      fr: "Une fonction dans une fonction",
      es: "Una función dentro de otra",
      ja: "関数の中の関数",
      zh: "函数套函数"
    },
    statement: {
      en: "<b>Which of the following equal $\\dfrac{d}{dx}\\sin\\left(x^2\\right)$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\dfrac{d}{dx}\\sin\\left(x^2\\right)$ ?</b>",
      es: "<b>¿Cuáles de las siguientes son iguales a $\\dfrac{d}{dx}\\sin\\left(x^2\\right)$?</b>",
      ja: "<b>次のうち $\\dfrac{d}{dx}\\sin\\left(x^2\\right)$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\dfrac{d}{dx}\\sin\\left(x^2\\right)$？</b>"
    },
    figureText: {
      en: "The graph of sin(x²): its oscillations get faster as x grows.",
      fr: "Le graphe de sin(x²) : ses oscillations s’accélèrent quand x grandit.",
      es: "La gráfica de sen(x²): sus oscilaciones se aceleran al crecer x.",
      ja: "sin(x²) のグラフ。x が大きくなるほど振動が速くなります。",
      zh: "sin(x²) 的图像：x 越大振荡越快。"
    },
    hint: {
      en: "Outer function $\\sin u$, inner function $u = x^2$.",
      fr: "Fonction extérieure $\\sin u$, intérieure $u = x^2$.",
      es: "Función exterior $\\sin u$, interior $u = x^2$.",
      ja: "外側の関数 $\\sin u$、内側の関数 $u = x^2$。",
      zh: "外层函数 $\\sin u$，内层函数 $u = x^2$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example from the definition of the derivative as a limit), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple à partir de la définition de la dérivée comme limite), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo a partir de la definición de derivada como límite), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば極限による導関数の定義から）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如从导数的极限定义出发），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 3, scale: 44, pad: 16 });
      const T = F.T = axes(F, -0.3, 3.6, -1.4, 1.4);
      plot(F, T, x => Math.sin(x * x), 0, 3.5, 'graph', 'base', -1.4, 1.4, 400);
      return F;
    },
    options: [
      { tex: "2x\\cos\\left(x^2\\right)", correct: true, why: {
        en: "$\\cos(u)\\cdot u'$ with $u = x^2$.",
        fr: "$\\cos(u)\\cdot u'$ with $u = x^2$.",
        es: "$\\cos(u)\\cdot u'$ with $u = x^2$.",
        ja: "$\\cos(u)\\cdot u'$ with $u = x^2$.",
        zh: "$\\cos(u)\\cdot u'$ with $u = x^2$."
      } },
      { tex: "\\cos\\left(x^2\\right)\\cdot 2x", correct: true, why: {
        en: "The same product written in the other order.",
        fr: "Le même produit dans l’autre ordre.",
        es: "El mismo producto en el otro orden.",
        ja: "同じ積を逆の順に書いたもの。",
        zh: "同一乘积换个顺序写。"
      } },
      { tex: "\\cos\\left(x^2\\right)", correct: false, why: {
        en: "The inner derivative $2x$ is missing.",
        fr: "Il manque la dérivée intérieure $2x$.",
        es: "Falta la derivada interior $2x$.",
        ja: "内側の微分 $2x$ が抜けています。",
        zh: "漏了内层导数 $2x$。"
      } },
      { tex: "2x\\cos x", correct: false, why: {
        en: "The cosine must keep the argument $x^2$.",
        fr: "Le cosinus garde l’argument $x^2$.",
        es: "El coseno conserva el argumento $x^2$.",
        ja: "cos の中身は $x^2$ のままです。",
        zh: "余弦里应保留 $x^2$。"
      } },
      { tex: "\\cos(2x)", correct: false, why: {
        en: "Differentiated the inside only, and put it inside.",
        fr: "On a dérivé l’intérieur et on l’a laissé dedans.",
        es: "Se derivó solo el interior y se dejó dentro.",
        ja: "内側だけ微分して中に入れています。",
        zh: "只对内层求导并放进去了。"
      } },
      { tex: "2\\sin x\\cos x", correct: false, why: {
        en: "That is the derivative of $\\sin^2 x$, a different function.",
        fr: "C’est la dérivée de $\\sin^2 x$, une autre fonction.",
        es: "Es la derivada de $\\sin^2 x$, otra función.",
        ja: "それは別の関数 $\\sin^2 x$ の導関数です。",
        zh: "那是 $\\sin^2 x$ 的导数，是另一个函数。"
      } },
      { tex: "-2x\\cos\\left(x^2\\right)", correct: false, why: {
        en: "The derivative of $\\sin$ is $+\\cos$.",
        fr: "La dérivée de $\\sin$ est $+\\cos$.",
        es: "La derivada de $\\sin$ es $+\\cos$.",
        ja: "$\\sin$ の導関数は $+\\cos$ です。",
        zh: "$\\sin$ 的导数是 $+\\cos$。"
      } },
      { tex: "2x\\sin\\left(x^2\\right)", correct: false, why: {
        en: "$\\sin$ must become $\\cos$.",
        fr: "$\\sin$ doit devenir $\\cos$.",
        es: "$\\sin$ debe pasar a $\\cos$.",
        ja: "$\\sin$ は $\\cos$ になるはずです。",
        zh: "$\\sin$ 应变为 $\\cos$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Name the inner function",
          fr: "Nommer la fonction intérieure",
          es: "Nombrar la función interior",
          ja: "内側の関数に名前をつける",
          zh: "设出内层函数"
        },
        lines: ["u = x^2, \\qquad \\frac{du}{dx} = 2x"],
        note: {
          en: "Then the function is $\\sin u$.",
          fr: "La fonction est alors $\\sin u$.",
          es: "Entonces la función es $\\sin u$.",
          ja: "すると関数は $\\sin u$。",
          zh: "于是函数为 $\\sin u$。"
        }
      },
      {
        title: {
          en: "Chain rule",
          fr: "Dérivée d’une composée",
          es: "Regla de la cadena",
          ja: "合成関数の微分",
          zh: "链式法则"
        },
        lines: ["\\frac{d}{dx}\\sin u = \\cos u\\cdot\\frac{du}{dx} = \\boxed{2x\\cos\\left(x^2\\right)}"],
        note: {
          en: "The growing factor $2x$ is why the graph wiggles faster and faster.",
          fr: "Le facteur croissant $2x$ explique les oscillations de plus en plus rapides.",
          es: "El factor creciente $2x$ explica que la gráfica oscile cada vez más rápido.",
          ja: "大きくなる係数 $2x$ のため、グラフはどんどん速く振動します。",
          zh: "不断增大的因子 $2x$ 使图像振荡越来越快。"
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
