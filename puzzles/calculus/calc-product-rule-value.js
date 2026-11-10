/* calculus · A product at x = 1
   Product rule: (x² eˣ)′ = (2x + x²) eˣ, equal to 3e at x = 1. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x * x * Math.exp(x), E = Math.E;

  PuzzleBank.define({
    id: "calc-product-rule-value",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "A product at x = 1",
      fr: "Un produit en x = 1",
      es: "Un producto en x = 1",
      ja: "x = 1 での積の微分",
      zh: "x = 1 处的乘积求导"
    },
    statement: {
      en: "Let $f(x) = x^2 e^x$. <b>Which of the following equal $f'(1)$?</b>",
      fr: "Soit $f(x) = x^2 e^x$. <b>Lesquelles des valeurs suivantes sont égales à $f'(1)$ ?</b>",
      es: "Sea $f(x) = x^2 e^x$. <b>¿Cuáles de los siguientes son iguales a $f'(1)$?</b>",
      ja: "$f(x) = x^2 e^x$ とします。<b>次のうち $f'(1)$ に等しいものはどれですか？</b>",
      zh: "设 $f(x) = x^2 e^x$。<b>下列哪些等于 $f'(1)$？</b>"
    },
    figureText: {
      en: "The graph of x² eˣ with its tangent line at x = 1.",
      fr: "Le graphe de x² eˣ et sa tangente en x = 1.",
      es: "La gráfica de x² eˣ con su recta tangente en x = 1.",
      ja: "x² eˣ のグラフと x = 1 での接線。",
      zh: "x² eˣ 的图像及其在 x = 1 处的切线。"
    },
    hint: {
      en: "$(uv)' = u'v + uv'$ with $u = x^2$, $v = e^x$.",
      fr: "$(uv)' = u'v + uv'$ avec $u = x^2$, $v = e^x$.",
      es: "$(uv)' = u'v + uv'$ con $u = x^2$, $v = e^x$.",
      ja: "$u = x^2$、$v = e^x$ として $(uv)' = u'v + uv'$。",
      zh: "$(uv)' = u'v + uv'$，其中 $u = x^2$，$v = e^x$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with logarithmic differentiation), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple par dérivation logarithmique), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con derivación logarítmica), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば対数微分法を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用对数求导法），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 5.6, scale: 44, pad: 18 });
      const T = F.T = axes(F, -3.2, 1.8, -0.6, 5);
      plot(F, T, f, -3.2, 1.6, 'graph', 'base', -0.6, 5);
      plot(F, T, x => E + 3 * E * (x - 1), 0.55, 1.5, 'seg thin', 'base', -0.6, 5);
      F.dot(T([1, E])); F.text(T([1, E]), '(1, e)', 'len small', -24, -4);
      return F;
    },
    options: [
      { tex: "3e", correct: true, why: {
        en: "$(2 + 1)e^1$.",
        fr: "$(2 + 1)e^1$.",
        es: "$(2 + 1)e^1$.",
        ja: "$(2 + 1)e^1$.",
        zh: "$(2 + 1)e^1$."
      } },
      { tex: "(2\\cdot1 + 1^2)\\,e^1", correct: true, why: {
        en: "The product-rule formula evaluated at $1$.",
        fr: "La formule du produit évaluée en $1$.",
        es: "La fórmula del producto evaluada en $1$.",
        ja: "積の微分公式に $1$ を代入したもの。",
        zh: "乘积法则公式在 $1$ 处的值。"
      } },
      { tex: "2e", correct: false, why: {
        en: "Only $u'v$: the term $uv' = x^2e^x$ is missing.",
        fr: "Seulement $u'v$ : il manque $uv' = x^2e^x$.",
        es: "Solo $u'v$: falta $uv' = x^2e^x$.",
        ja: "$u'v$ だけで、$uv' = x^2e^x$ が抜けています。",
        zh: "只有 $u'v$，漏了 $uv' = x^2e^x$。"
      } },
      { tex: "e", correct: false, why: {
        en: "That is $f(1)$, not $f'(1)$.",
        fr: "C’est $f(1)$, pas $f'(1)$.",
        es: "Eso es $f(1)$, no $f'(1)$.",
        ja: "それは $f(1)$ で $f'(1)$ ではありません。",
        zh: "那是 $f(1)$，不是 $f'(1)$。"
      } },
      { tex: "2", correct: false, why: {
        en: "The derivative of a product is not the product of the derivatives.",
        fr: "La dérivée d’un produit n’est pas le produit des dérivées.",
        es: "La derivada de un producto no es el producto de las derivadas.",
        ja: "積の微分は微分の積ではありません。",
        zh: "乘积的导数不是导数的乘积。"
      } },
      { tex: "3", correct: false, why: {
        en: "Forgot the factor $e^1$.",
        fr: "Le facteur $e^1$ a été oublié.",
        es: "Se olvidó el factor $e^1$.",
        ja: "$e^1$ をかけ忘れています。",
        zh: "漏了因子 $e^1$。"
      } },
      { tex: "4e", correct: false, why: {
        en: "$(2x + 2x^2)e^x$ — the second term should be $x^2e^x$.",
        fr: "$(2x + 2x^2)e^x$ — le second terme est $x^2e^x$.",
        es: "$(2x + 2x^2)e^x$ — el segundo término es $x^2e^x$.",
        ja: "$(2x + 2x^2)e^x$ — 2項目は $x^2e^x$ です。",
        zh: "$(2x + 2x^2)e^x$ —— 第二项应是 $x^2e^x$。"
      } },
      { tex: "e^2", correct: false, why: {
        en: "No term of $f'$ gives $e^2$.",
        fr: "Aucun terme de $f'$ ne donne $e^2$.",
        es: "Ningún término de $f'$ da $e^2$.",
        ja: "$f'$ のどの項も $e^2$ になりません。",
        zh: "$f'$ 中没有任何项得到 $e^2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Product rule",
          fr: "Règle du produit",
          es: "Regla del producto",
          ja: "積の微分",
          zh: "乘积法则"
        },
        lines: ["f'(x) = 2x\\,e^x + x^2 e^x = (2x + x^2)\\,e^x"],
        note: {
          en: "$(e^x)' = e^x$.",
          fr: "$(e^x)' = e^x$.",
          es: "$(e^x)' = e^x$.",
          ja: "$(e^x)' = e^x$。",
          zh: "$(e^x)' = e^x$。"
        }
      },
      {
        title: {
          en: "Evaluate at 1",
          fr: "Évaluer en 1",
          es: "Evaluar en 1",
          ja: "1 を代入",
          zh: "代入 1"
        },
        lines: ["f'(1) = (2 + 1)\\,e = \\boxed{3e} \\approx 8.15"],
        note: {
          en: "This is the slope of the tangent line in the figure.",
          fr: "C’est la pente de la tangente sur la figure.",
          es: "Es la pendiente de la tangente de la figura.",
          ja: "図の接線の傾きです。",
          zh: "这就是图中切线的斜率。"
        },
        fig(F) { F.draw(plot(F, F.T, x => Math.E + 3 * Math.E * (x - 1), 0.55, 1.5, 'hl yellow', 'over', -0.6, 5), 700); }
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
