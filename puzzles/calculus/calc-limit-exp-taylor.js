/* calculus · What is left of eˣ
   lim (eˣ − 1 − x)/x² = 1/2, from the Taylor series or L’Hôpital twice. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => (Math.exp(x) - 1 - x) / (x * x);

  PuzzleBank.define({
    id: "calc-limit-exp-taylor",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ebau", "ap"]
    },
    difficulty: 2,
    title: {
      en: "What is left of eˣ",
      fr: "Ce qui reste de eˣ",
      es: "Lo que queda de eˣ",
      ja: "eˣ に残るもの",
      zh: "eˣ 剩下的部分"
    },
    statement: {
      en: "<b>What is $\\displaystyle\\lim_{x\\to0}\\frac{e^x - 1 - x}{x^2}$?</b>",
      fr: "<b>Que vaut $\\displaystyle\\lim_{x\\to0}\\frac{e^x - 1 - x}{x^2}$ ?</b>",
      es: "<b>¿Cuánto vale $\\displaystyle\\lim_{x\\to0}\\frac{e^x - 1 - x}{x^2}$?</b>",
      ja: "<b>$\\displaystyle\\lim_{x\\to0}\\frac{e^x - 1 - x}{x^2}$ はいくらですか？</b>",
      zh: "<b>$\\displaystyle\\lim_{x\\to0}\\frac{e^x - 1 - x}{x^2}$ 等于多少？</b>"
    },
    figureText: {
      en: "A grid around x = 0. The graph of the expression is drawn in the solution.",
      fr: "Une grille autour de x = 0. La courbe de l’expression est tracée dans la solution.",
      es: "Una cuadrícula alrededor de x = 0. La gráfica de la expresión se dibuja en la solución.",
      ja: "x = 0 付近の方眼。式のグラフは解答で描きます。",
      zh: "x = 0 附近的网格。该式的图像在解答中画出。"
    },
    hint: {
      en: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dots$",
      fr: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dots$",
      es: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dots$",
      ja: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dots$",
      zh: "$e^x = 1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\dots$"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example applying L’Hôpital’s rule twice), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en appliquant deux fois la règle de L’Hôpital), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo aplicando dos veces la regla de L’Hôpital), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えばロピタルの定理を2回使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如两次使用洛必达法则），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 3.4, scale: 46, pad: 18 });
      const T = F.T = axes(F, -3, 3, -0.3, 3.1, { grid: true });
      F.reveal = () => {
        plot(F, T, f, -2.9, -0.02, 'graph', 'base', -0.3, 3.1); plot(F, T, f, 0.02, 1.8, 'graph', 'base', -0.3, 3.1);
        F.seg(T([-3, 0.5]), T([3, 0.5]), 'seg thin');
        F.circle(T([0, 0.5]), 0.08, 'halo'); F.text(T([0, 0.5]), '1/2', 'len small', -18, -8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "does not exist": { fr: "n’existe pas", es: "no existe", ja: "存在しない", zh: "不存在" }
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$\\dfrac{x^2/2 + x^3/6 + \\dots}{x^2} \\to \\tfrac12$.",
        fr: "$\\dfrac{x^2/2 + x^3/6 + \\dots}{x^2} \\to \\tfrac12$.",
        es: "$\\dfrac{x^2/2 + x^3/6 + \\dots}{x^2} \\to \\tfrac12$.",
        ja: "$\\dfrac{x^2/2 + x^3/6 + \\dots}{x^2} \\to \\tfrac12$.",
        zh: "$\\dfrac{x^2/2 + x^3/6 + \\dots}{x^2} \\to \\tfrac12$."
      } },
      { tex: "0", correct: false, why: {
        en: "The numerator tends to $0$, but so does the denominator.",
        fr: "Le numérateur tend vers $0$, mais le dénominateur aussi.",
        es: "El numerador tiende a $0$, pero el denominador también.",
        ja: "分子は $0$ に近づきますが、分母もそうです。",
        zh: "分子趋于 $0$，但分母也趋于 $0$。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $\\lim\\frac{e^x - 1}{x}$, a different limit.",
        fr: "C’est $\\lim\\frac{e^x - 1}{x}$, une autre limite.",
        es: "Eso es $\\lim\\frac{e^x - 1}{x}$, otro límite.",
        ja: "それは別の極限 $\\lim\\frac{e^x - 1}{x}$ です。",
        zh: "那是另一个极限 $\\lim\\frac{e^x - 1}{x}$。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "The $x^2$ term of $e^x$ exactly matches the denominator.",
        fr: "Le terme en $x^2$ de $e^x$ compense exactement le dénominateur.",
        es: "El término $x^2$ de $e^x$ compensa exactamente el denominador.",
        ja: "$e^x$ の $x^2$ の項が分母とちょうど打ち消し合います。",
        zh: "$e^x$ 的 $x^2$ 项正好与分母相抵。"
      } },
      { tex: "2", correct: false, why: {
        en: "The fraction upside down: $\\frac{x^2}{x^2/2}$.",
        fr: "La fraction à l’envers : $\\frac{x^2}{x^2/2}$.",
        es: "La fracción al revés: $\\frac{x^2}{x^2/2}$.",
        ja: "分数が逆さまです：$\\frac{x^2}{x^2/2}$。",
        zh: "分数颠倒了：$\\frac{x^2}{x^2/2}$。"
      } },
      { tex: "-\\tfrac12", correct: false, why: {
        en: "The numerator is positive near $0$: $e^x > 1 + x$.",
        fr: "Le numérateur est positif près de $0$ : $e^x > 1 + x$.",
        es: "El numerador es positivo cerca de $0$: $e^x > 1 + x$.",
        ja: "$0$ の近くで分子は正：$e^x > 1 + x$。",
        zh: "在 $0$ 附近分子为正：$e^x > 1 + x$。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "The coefficient of $x^3$, one term too far.",
        fr: "Le coefficient de $x^3$, un terme trop loin.",
        es: "El coeficiente de $x^3$, un término de más.",
        ja: "1つ先の $x^3$ の係数です。",
        zh: "这是 $x^3$ 的系数，多走了一项。"
      } },
      { tex: "\\text{does not exist}", correct: false, why: {
        en: "The curve has the same height $\\tfrac12$ from both sides.",
        fr: "La courbe tend vers $\\tfrac12$ des deux côtés.",
        es: "La curva se acerca a $\\tfrac12$ por ambos lados.",
        ja: "曲線は両側から高さ $\\tfrac12$ に近づきます。",
        zh: "曲线从两侧都趋于 $\\tfrac12$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Expand eˣ",
          fr: "Développer eˣ",
          es: "Desarrollar eˣ",
          ja: "eˣ を展開する",
          zh: "展开 eˣ"
        },
        lines: ["e^x - 1 - x = \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots"],
        note: {
          en: "The terms $1$ and $x$ cancel, leaving terms of order $x^2$ and higher.",
          fr: "Les termes $1$ et $x$ s’annulent ; il reste des termes d’ordre $x^2$ et plus.",
          es: "Los términos $1$ y $x$ se anulan; quedan términos de orden $x^2$ y superiores.",
          ja: "$1$ と $x$ が消え、$x^2$ 以上の項が残ります。",
          zh: "$1$ 和 $x$ 抵消，剩下 $x^2$ 及更高次的项。"
        }
      },
      {
        title: {
          en: "Divide and let x → 0",
          fr: "Diviser et faire tendre x vers 0",
          es: "Dividir y hacer x → 0",
          ja: "割って x → 0",
          zh: "相除并令 x → 0"
        },
        lines: ["\\frac{e^x - 1 - x}{x^2} = \\frac12 + \\frac{x}{6} + \\dots \\ \\to\\ \\boxed{\\tfrac12}"],
        note: {
          en: "L’Hôpital twice gives the same: $\\frac{e^x - 1}{2x} \\to \\frac{e^x}{2} \\to \\frac12$.",
          fr: "L’Hôpital deux fois donne la même chose : $\\frac{e^x - 1}{2x} \\to \\frac{e^x}{2} \\to \\frac12$.",
          es: "L’Hôpital dos veces da lo mismo: $\\frac{e^x - 1}{2x} \\to \\frac{e^x}{2} \\to \\frac12$.",
          ja: "ロピタルを2回使っても同じ：$\\frac{e^x - 1}{2x} \\to \\frac{e^x}{2} \\to \\frac12$。",
          zh: "两次用洛必达也一样：$\\frac{e^x - 1}{2x} \\to \\frac{e^x}{2} \\to \\frac12$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.draw(F.seg(F.T([-3, 0.5]), F.T([3, 0.5]), 'hl yellow', 'over'), 700); }
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
