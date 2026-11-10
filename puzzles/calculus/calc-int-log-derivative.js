/* calculus · A derivative on top
   ∫₀¹ 2x/(x² + 1) dx = ln 2 (the numerator is the derivative of the denominator). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => 2 * x / (x * x + 1);

  PuzzleBank.define({
    id: "calc-int-log-derivative",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "A derivative on top",
      fr: "Une dérivée au numérateur",
      es: "Una derivada arriba",
      ja: "分子が分母の導関数",
      zh: "分子是分母的导数"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\int_0^1\\frac{2x}{x^2 + 1}\\,dx$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\int_0^1\\frac{2x}{x^2 + 1}\\,dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\int_0^1\\frac{2x}{x^2 + 1}\\,dx$?</b>",
      ja: "<b>次のうち $\\displaystyle\\int_0^1\\frac{2x}{x^2 + 1}\\,dx$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\int_0^1\\frac{2x}{x^2 + 1}\\,dx$？</b>"
    },
    figureText: {
      en: "The graph of 2x/(x² + 1) rising from 0 to 1 on [0, 1], with the region under it shaded.",
      fr: "Le graphe de 2x/(x² + 1) qui monte de 0 à 1 sur [0, 1], la région en dessous étant ombrée.",
      es: "La gráfica de 2x/(x² + 1) que sube de 0 a 1 en [0, 1], con la región bajo ella sombreada.",
      ja: "[0, 1] で 0 から 1 まで増える 2x/(x² + 1) のグラフと、その下の塗られた部分。",
      zh: "2x/(x² + 1) 在 [0, 1] 上从 0 升到 1 的图像及其下方涂色区域。"
    },
    hint: {
      en: "$\\displaystyle\\int\\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$.",
      fr: "$\\displaystyle\\int\\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$.",
      es: "$\\displaystyle\\int\\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$.",
      ja: "$\\displaystyle\\int\\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$。",
      zh: "$\\displaystyle\\int\\frac{g'(x)}{g(x)}\\,dx = \\ln|g(x)| + C$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the substitution u = x² + 1), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec le changement de variable u = x² + 1), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con el cambio u = x² + 1), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば u = x² + 1 と置換する）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如换元 u = x² + 1），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.2, scale: 54, pad: 18 });
      const T = F.T = axes(F, -0.3, 5.1, -0.3, 2.9);
      const g = x => 2.4 * f(x / 3);   // horizontal ×3, vertical ×2.4
      const area = (f, a, b) => { const q = [T([a, 0])]; for (let k = 0; k <= 60; k++) { const x = a + (b - a) * k / 60; q.push(T([x, f(x)])); } q.push(T([b, 0])); return F.path(q, 'fill-yellow', 'fills'); };
      area(g, 0, 3); plot(F, T, g, 0, 4.8, 'graph');
      F.text(T([3, 0]), '1', 'tick', 0, 14); F.seg(T([0, 2.4]), T([3, 2.4]), 'seg thin'); F.text(T([0, 2.4]), '1', 'tick', -10, 0);
      return F;
    },
    options: [
      { tex: "\\ln 2", correct: true, why: {
        en: "$\\left[\\ln(x^2 + 1)\\right]_0^1 = \\ln 2 - \\ln 1$.",
        fr: "$\\left[\\ln(x^2 + 1)\\right]_0^1 = \\ln 2 - \\ln 1$.",
        es: "$\\left[\\ln(x^2 + 1)\\right]_0^1 = \\ln 2 - \\ln 1$.",
        ja: "$\\left[\\ln(x^2 + 1)\\right]_0^1 = \\ln 2 - \\ln 1$.",
        zh: "$\\left[\\ln(x^2 + 1)\\right]_0^1 = \\ln 2 - \\ln 1$."
      } },
      { tex: "\\displaystyle\\int_1^2\\frac{du}{u}", correct: true, why: {
        en: "With $u = x^2 + 1$: $du = 2x\\,dx$ and $u$ runs from $1$ to $2$.",
        fr: "Avec $u = x^2 + 1$ : $du = 2x\\,dx$ et $u$ va de $1$ à $2$.",
        es: "Con $u = x^2 + 1$: $du = 2x\\,dx$ y $u$ va de $1$ a $2$.",
        ja: "$u = x^2 + 1$ とすると $du = 2x\\,dx$、$u$ は $1$ から $2$。",
        zh: "令 $u = x^2 + 1$：$du = 2x\\,dx$，$u$ 从 $1$ 到 $2$。"
      } },
      { tex: "1", correct: false, why: {
        en: "The height of the graph at $x = 1$, not the area.",
        fr: "La hauteur du graphe en $x = 1$, pas l’aire.",
        es: "La altura de la gráfica en $x = 1$, no el área.",
        ja: "$x = 1$ でのグラフの高さで、面積ではありません。",
        zh: "$x = 1$ 处的函数值，不是面积。"
      } },
      { tex: "2\\ln 2", correct: false, why: {
        en: "The $2$ in $2x$ is already $du/dx$; it is not an extra factor.",
        fr: "Le $2$ de $2x$ est déjà $du/dx$ ; ce n’est pas un facteur en plus.",
        es: "El $2$ de $2x$ ya es $du/dx$; no es un factor extra.",
        ja: "$2x$ の $2$ はすでに $du/dx$ で、余分な係数ではありません。",
        zh: "$2x$ 中的 $2$ 已是 $du/dx$，不是额外因子。"
      } },
      { tex: "\\tfrac{\\pi}{4}", correct: false, why: {
        en: "That is $\\int_0^1\\tfrac{dx}{x^2 + 1}$ — without the $2x$.",
        fr: "C’est $\\int_0^1\\tfrac{dx}{x^2 + 1}$ — sans le $2x$.",
        es: "Es $\\int_0^1\\tfrac{dx}{x^2 + 1}$ — sin el $2x$.",
        ja: "$2x$ のない $\\int_0^1\\tfrac{dx}{x^2 + 1}$ です。",
        zh: "那是没有 $2x$ 的 $\\int_0^1\\tfrac{dx}{x^2 + 1}$。"
      } },
      { tex: "\\ln 3", correct: false, why: {
        en: "At $x = 1$, $x^2 + 1 = 2$, not $3$.",
        fr: "En $x = 1$, $x^2 + 1 = 2$, pas $3$.",
        es: "En $x = 1$, $x^2 + 1 = 2$, no $3$.",
        ja: "$x = 1$ で $x^2 + 1 = 2$ で $3$ ではありません。",
        zh: "$x = 1$ 时 $x^2 + 1 = 2$，不是 $3$。"
      } },
      { tex: "0", correct: false, why: {
        en: "The integrand is positive on $(0, 1]$.",
        fr: "L’intégrande est positive sur $(0, 1]$.",
        es: "El integrando es positivo en $(0, 1]$.",
        ja: "被積分関数は $(0, 1]$ で正です。",
        zh: "被积函数在 $(0, 1]$ 上为正。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "Not a $\\ln$-free answer: $\\ln 2 \\approx 0.69$.",
        fr: "La réponse contient un logarithme : $\\ln 2 \\approx 0{,}69$.",
        es: "La respuesta lleva un logaritmo: $\\ln 2 \\approx 0{,}69$.",
        ja: "答えは対数を含みます：$\\ln 2 \\approx 0.69$。",
        zh: "答案含对数：$\\ln 2 \\approx 0.69$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Spot g′/g",
          fr: "Reconnaître g′/g",
          es: "Reconocer g′/g",
          ja: "g′/g を見抜く",
          zh: "识别 g′/g"
        },
        lines: ["\\frac{d}{dx}\\left(x^2 + 1\\right) = 2x"],
        note: {
          en: "The numerator is exactly the derivative of the denominator.",
          fr: "Le numérateur est exactement la dérivée du dénominateur.",
          es: "El numerador es exactamente la derivada del denominador.",
          ja: "分子はちょうど分母の導関数です。",
          zh: "分子恰好是分母的导数。"
        }
      },
      {
        title: {
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分する",
          zh: "积分"
        },
        lines: ["\\int_0^1\\frac{2x}{x^2 + 1}\\,dx = \\left[\\ln\\left(x^2 + 1\\right)\\right]_0^1 = \\boxed{\\ln 2} \\approx 0.69"],
        note: {
          en: "$\\ln 1 = 0$ at the lower limit.",
          fr: "$\\ln 1 = 0$ à la borne inférieure.",
          es: "$\\ln 1 = 0$ en el límite inferior.",
          ja: "下端では $\\ln 1 = 0$。",
          zh: "下限处 $\\ln 1 = 0$。"
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
