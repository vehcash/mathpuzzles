/* calculus · The average height of a curve
   Average value of x² on [0, 3]: (1/3)∫₀³ x² dx = 3. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-average-value",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap"]
    },
    difficulty: 1,
    title: {
      en: "The average height of a curve",
      fr: "La hauteur moyenne d’une courbe",
      es: "La altura media de una curva",
      ja: "曲線の平均の高さ",
      zh: "曲线的平均高度"
    },
    statement: {
      en: "<b>Which of the following equal the average value of $f(x) = x^2$ on $[0, 3]$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à la valeur moyenne de $f(x) = x^2$ sur $[0, 3]$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al valor medio de $f(x) = x^2$ en $[0, 3]$?</b>",
      ja: "<b>次のうち $[0, 3]$ 上の $f(x) = x^2$ の平均値に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $f(x) = x^2$ 在 $[0, 3]$ 上的平均值？</b>"
    },
    figureText: {
      en: "The parabola y = x² on [0, 3] and a rectangle of the same area, of height 3.",
      fr: "La parabole y = x² sur [0, 3] et un rectangle de même aire, de hauteur 3.",
      es: "La parábola y = x² en [0, 3] y un rectángulo de la misma área, de altura 3.",
      ja: "[0, 3] 上の放物線 y = x² と、同じ面積で高さ 3 の長方形。",
      zh: "[0, 3] 上的抛物线 y = x² 和一个面积相同、高为 3 的矩形。"
    },
    hint: {
      en: "Average value $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.",
      fr: "Valeur moyenne $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.",
      es: "Valor medio $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$.",
      ja: "平均値 $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$。",
      zh: "平均值 $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example as the limit of the average of many sample values), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple comme limite de la moyenne de nombreuses valeurs), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo como límite de la media de muchos valores), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば多数の値の平均の極限として）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如作为许多取样值平均数的极限），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 5.2, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.4, 4, -0.3, 4.9);
      const g = x => x * x / 2;   // vertical scale ½
      F.rect(0.4, 0.3, 3, 1.5, 'fill-yellow', 'fills');
      plot(F, T, g, 0, 3.1, 'graph', 'base', -0.3, 4.9);
      F.seg(T([0, 1.5]), T([3, 1.5]), 'seg thin'); F.seg(T([3, 0]), T([3, 4.5]), 'seg thin');
      F.text(T([0, 1.5]), '3', 'len small', -10, 0); F.text(T([3, 0]), '3', 'tick', 0, 14); F.text(T([3, 4.5]), '9', 'len small', 12, 0);
      return F;
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$\\tfrac13\\cdot 9 = 3$.",
        fr: "$\\tfrac13\\cdot 9 = 3$.",
        es: "$\\tfrac13\\cdot 9 = 3$.",
        ja: "$\\tfrac13\\cdot 9 = 3$.",
        zh: "$\\tfrac13\\cdot 9 = 3$."
      } },
      { tex: "\\tfrac13\\displaystyle\\int_0^3 x^2\\,dx", correct: true, why: {
        en: "The definition of the average value.",
        fr: "La définition de la valeur moyenne.",
        es: "La definición del valor medio.",
        ja: "平均値の定義そのもの。",
        zh: "平均值的定义。"
      } },
      { tex: "9", correct: false, why: {
        en: "That is the integral $\\int_0^3 x^2\\,dx$, not yet divided by the length $3$.",
        fr: "C’est l’intégrale, pas encore divisée par la longueur $3$.",
        es: "Es la integral, aún sin dividir entre la longitud $3$.",
        ja: "積分の値で、まだ長さ $3$ で割っていません。",
        zh: "那是积分值，还没除以长度 $3$。"
      } },
      { tex: "\\tfrac92", correct: false, why: {
        en: "The average of $f(0) = 0$ and $f(3) = 9$ — only right for straight lines.",
        fr: "La moyenne de $f(0)$ et $f(3)$ — juste seulement pour les droites.",
        es: "La media de $f(0)$ y $f(3)$ — solo vale para rectas.",
        ja: "$f(0)$ と $f(3)$ の平均で、直線のときだけ正しい。",
        zh: "$f(0)$ 与 $f(3)$ 的平均，只对直线成立。"
      } },
      { tex: "\\tfrac94", correct: false, why: {
        en: "$f(1.5)$, the value at the midpoint — not the average for a curve.",
        fr: "$f(1{,}5)$, la valeur au milieu — pas la moyenne pour une courbe.",
        es: "$f(1{,}5)$, el valor en el punto medio — no la media de una curva.",
        ja: "中点での値 $f(1.5)$ で、曲線の平均ではありません。",
        zh: "中点处的值 $f(1.5)$，不是曲线的平均值。"
      } },
      { tex: "27", correct: false, why: {
        en: "$3^3$ without dividing by $3$ twice.",
        fr: "$3^3$ sans les divisions par $3$.",
        es: "$3^3$ sin las divisiones entre $3$.",
        ja: "$3^3$ で、$3$ で割っていません。",
        zh: "$3^3$，没除以 $3$。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "The point $c$ where $f(c) = 3$, not the average value.",
        fr: "Le point $c$ où $f(c) = 3$, pas la valeur moyenne.",
        es: "El punto $c$ con $f(c) = 3$, no el valor medio.",
        ja: "$f(c) = 3$ となる点 $c$ で、平均値ではありません。",
        zh: "满足 $f(c) = 3$ 的点 $c$，不是平均值。"
      } },
      { tex: "1", correct: false, why: {
        en: "Divided by $9$ instead of by $3$.",
        fr: "Divisé par $9$ au lieu de $3$.",
        es: "Dividido entre $9$ en vez de $3$.",
        ja: "$3$ ではなく $9$ で割っています。",
        zh: "除以了 $9$ 而不是 $3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Area under the curve",
          fr: "Aire sous la courbe",
          es: "Área bajo la curva",
          ja: "曲線の下の面積",
          zh: "曲线下的面积"
        },
        lines: ["\\int_0^3 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^3 = 9"],
        note: {
          en: "Spread over an interval of length $3$.",
          fr: "Répartie sur un intervalle de longueur $3$.",
          es: "Repartida en un intervalo de longitud $3$.",
          ja: "長さ $3$ の区間にならします。",
          zh: "摊在长度为 $3$ 的区间上。"
        }
      },
      {
        title: {
          en: "Divide by the length",
          fr: "Diviser par la longueur",
          es: "Dividir entre la longitud",
          ja: "長さで割る",
          zh: "除以长度"
        },
        lines: ["\\frac{9}{3} = \\boxed{3}"],
        note: {
          en: "The rectangle of height $3$ has the same area as the region under $x^2$.",
          fr: "Le rectangle de hauteur $3$ a la même aire que la région sous $x^2$.",
          es: "El rectángulo de altura $3$ tiene la misma área que la región bajo $x^2$.",
          ja: "高さ $3$ の長方形は $x^2$ の下の領域と同じ面積です。",
          zh: "高为 $3$ 的矩形与 $x^2$ 下方区域面积相同。"
        },
        fig(F) { F.draw(F.seg(F.T([0, 1.5]), F.T([3, 1.5]), 'hl yellow', 'over'), 600); }
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
