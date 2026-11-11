/* calculus · Flat spots on a cubic
   Horizontal tangents of x³ − 12x where f′ = 3x² − 12 = 0: x = ±2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const g = x => (x ** 3 - 12 * x) / 8;   // drawn with vertical scale 1/8

  PuzzleBank.define({
    id: "calc-horizontal-tangents",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["kyotsu", "ap"]
    },
    difficulty: 1,
    title: {
      en: "Flat spots on a cubic",
      fr: "Les points plats d’une cubique",
      es: "Puntos planos de una cúbica",
      ja: "3次関数の水平な点",
      zh: "三次曲线的水平点"
    },
    statement: {
      en: "<b>At which $x$ does the graph of $f(x) = x^3 - 12x$ have a horizontal tangent?</b> Choose every correct value.",
      fr: "<b>En quels $x$ le graphe de $f(x) = x^3 - 12x$ a-t-il une tangente horizontale ?</b> Choisissez toutes les bonnes valeurs.",
      es: "<b>¿En qué $x$ tiene la gráfica de $f(x) = x^3 - 12x$ una tangente horizontal?</b> Elige todos los valores correctos.",
      ja: "<b>$f(x) = x^3 - 12x$ のグラフが水平な接線をもつ $x$ はどれですか？</b> 正しい値をすべて選びます。",
      zh: "<b>$f(x) = x^3 - 12x$ 的图像在哪些 $x$ 处有水平切线？</b>选出所有正确的值。"
    },
    figureText: {
      en: "The graph of x³ − 12x (vertical scale reduced) with a peak at x = −2 and a valley at x = 2, each with a short horizontal tangent.",
      fr: "Le graphe de x³ − 12x (échelle verticale réduite) avec un sommet en x = −2 et un creux en x = 2, chacun avec une petite tangente horizontale.",
      es: "La gráfica de x³ − 12x (escala vertical reducida) con un pico en x = −2 y un valle en x = 2, cada uno con una tangente horizontal corta.",
      ja: "x³ − 12x のグラフ（縦軸は縮小）。x = −2 に山、x = 2 に谷があり、それぞれ短い水平な接線。",
      zh: "x³ − 12x 的图像（纵向缩小），在 x = −2 处有峰、x = 2 处有谷，各有一段水平切线。"
    },
    hint: {
      en: "A horizontal tangent means $f'(x) = 0$.",
      fr: "Une tangente horizontale signifie $f'(x) = 0$.",
      es: "Una tangente horizontal significa $f'(x) = 0$.",
      ja: "水平な接線は $f'(x) = 0$ のことです。",
      zh: "水平切线即 $f'(x) = 0$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example by completing the cube or using symmetry of the odd function), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en utilisant que la fonction est impaire), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo usando que la función es impar), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば奇関数の対称性を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如利用奇函数的对称性），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.4, h: 5, scale: 34, pad: 18 });
      const T = F.T = axes(F, -4.2, 4.2, -2.5, 2.5);
      plot(F, T, g, -4.1, 4.1, 'graph', 'base', -2.5, 2.5);
      F.seg(T([-2.8, 2]), T([-1.2, 2]), 'seg thin'); F.seg(T([1.2, -2]), T([2.8, -2]), 'seg thin');
      F.dot(T([-2, 2])); F.dot(T([2, -2]));
      F.text(T([-2, 2]), '(−2, 16)', 'len small', 0, -14); F.text(T([2, -2]), '(2, −16)', 'len small', 0, 14);
      return F;
    },
    options: [
      { tex: "x = 2", correct: true, why: {
        en: "$f'(2) = 12 - 12 = 0$.",
        fr: "$f'(2) = 12 - 12 = 0$.",
        es: "$f'(2) = 12 - 12 = 0$.",
        ja: "$f'(2) = 12 - 12 = 0$.",
        zh: "$f'(2) = 12 - 12 = 0$."
      } },
      { tex: "x = -2", correct: true, why: {
        en: "$f'(-2) = 12 - 12 = 0$.",
        fr: "$f'(-2) = 12 - 12 = 0$.",
        es: "$f'(-2) = 12 - 12 = 0$.",
        ja: "$f'(-2) = 12 - 12 = 0$.",
        zh: "$f'(-2) = 12 - 12 = 0$."
      } },
      { tex: "x = 0", correct: false, why: {
        en: "$f'(0) = -12$: the graph is steep there.",
        fr: "$f'(0) = -12$ : le graphe y est raide.",
        es: "$f'(0) = -12$: ahí la gráfica es empinada.",
        ja: "$f'(0) = -12$：そこでは急な傾きです。",
        zh: "$f'(0) = -12$：那里很陡。"
      } },
      { tex: "x = 2\\sqrt3", correct: false, why: {
        en: "That is a zero of $f$, not of $f'$.",
        fr: "C’est un zéro de $f$, pas de $f'$.",
        es: "Es un cero de $f$, no de $f'$.",
        ja: "それは $f$ の零点で、$f'$ の零点ではありません。",
        zh: "那是 $f$ 的零点，不是 $f'$ 的。"
      } },
      { tex: "x = -2\\sqrt3", correct: false, why: {
        en: "Also a zero of $f$, where the graph crosses the axis.",
        fr: "Aussi un zéro de $f$, où le graphe coupe l’axe.",
        es: "También un cero de $f$, donde la gráfica corta el eje.",
        ja: "これも $f$ の零点で、グラフが軸と交わる点。",
        zh: "也是 $f$ 的零点，图像与轴相交处。"
      } },
      { tex: "x = 4", correct: false, why: {
        en: "$f'(4) = 48 - 12 = 36$.",
        fr: "$f'(4) = 48 - 12 = 36$.",
        es: "$f'(4) = 48 - 12 = 36$.",
        ja: "$f'(4) = 48 - 12 = 36$.",
        zh: "$f'(4) = 48 - 12 = 36$."
      } },
      { tex: "x = 12", correct: false, why: {
        en: "$3x^2 = 12$ gives $x^2 = 4$, not $x = 12$.",
        fr: "$3x^2 = 12$ donne $x^2 = 4$, pas $x = 12$.",
        es: "$3x^2 = 12$ da $x^2 = 4$, no $x = 12$.",
        ja: "$3x^2 = 12$ から $x^2 = 4$ で、$x = 12$ ではありません。",
        zh: "$3x^2 = 12$ 得 $x^2 = 4$，不是 $x = 12$。"
      } },
      { tex: "x = 1", correct: false, why: {
        en: "$f'(1) = 3 - 12 = -9$.",
        fr: "$f'(1) = 3 - 12 = -9$.",
        es: "$f'(1) = 3 - 12 = -9$.",
        ja: "$f'(1) = 3 - 12 = -9$.",
        zh: "$f'(1) = 3 - 12 = -9$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Set the derivative to zero",
          fr: "Annuler la dérivée",
          es: "Igualar la derivada a cero",
          ja: "導関数を 0 とおく",
          zh: "令导数为零"
        },
        lines: ["f'(x) = 3x^2 - 12 = 0 \\ \\Rightarrow\\ x^2 = 4"],
        note: {
          en: "The tangent is horizontal exactly where the slope is $0$.",
          fr: "La tangente est horizontale exactement où la pente est nulle.",
          es: "La tangente es horizontal justo donde la pendiente es $0$.",
          ja: "傾きが $0$ のところでちょうど接線は水平です。",
          zh: "斜率为 $0$ 处切线恰为水平。"
        }
      },
      {
        title: {
          en: "Both roots",
          fr: "Les deux racines",
          es: "Las dos raíces",
          ja: "2つの解",
          zh: "两个根"
        },
        lines: ["x = \\boxed{\\pm 2}, \\qquad f(-2) = 16, \\quad f(2) = -16"],
        note: {
          en: "A local maximum at $-2$ and a local minimum at $2$.",
          fr: "Un maximum local en $-2$ et un minimum local en $2$.",
          es: "Un máximo local en $-2$ y un mínimo local en $2$.",
          ja: "$-2$ で極大、$2$ で極小。",
          zh: "$-2$ 处极大，$2$ 处极小。"
        },
        fig(F) { F.draw(F.seg(F.T([-2.8, 2]), F.T([-1.2, 2]), 'hl yellow', 'over'), 500); F.draw(F.seg(F.T([1.2, -2]), F.T([2.8, -2]), 'hl yellow', 'over'), 500, 300); }
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
          en: "Exactly two options are correct.",
          fr: "Exactement deux options sont correctes.",
          es: "Exactamente dos opciones son correctas.",
          ja: "正しい選択肢はちょうど2つです。",
          zh: "恰有两个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
