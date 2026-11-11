/* calculus · A classic limit at zero
   lim (1 − cos x)/x² = 1/2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => (1 - Math.cos(x)) / (x * x);

  PuzzleBank.define({
    id: "calc-limit-one-minus-cos",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap", "ebau"]
    },
    difficulty: 2,
    title: {
      en: "A classic limit at zero",
      fr: "Une limite classique en zéro",
      es: "Un límite clásico en cero",
      ja: "0 での有名な極限",
      zh: "零点处的经典极限"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\lim_{x\\to0}\\frac{1 - \\cos x}{x^2}$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\lim_{x\\to0}\\frac{1 - \\cos x}{x^2}$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\lim_{x\\to0}\\frac{1 - \\cos x}{x^2}$?</b>",
      ja: "<b>次のうち $\\displaystyle\\lim_{x\\to0}\\frac{1 - \\cos x}{x^2}$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\lim_{x\\to0}\\frac{1 - \\cos x}{x^2}$？</b>"
    },
    figureText: {
      en: "The graph of (1 − cos x)/x² on both sides of x = 0, with a gap at x = 0. The height of the gap is marked in the solution.",
      fr: "La courbe de (1 − cos x)/x² de part et d’autre de x = 0, avec un trou en x = 0. La hauteur du trou est marquée dans la solution.",
      es: "La gráfica de (1 − cos x)/x² a ambos lados de x = 0, con un hueco en x = 0. La altura del hueco se marca en la solución.",
      ja: "x = 0 の両側での (1 − cos x)/x² のグラフ（x = 0 で穴）。穴の高さは解答で示します。",
      zh: "(1 − cos x)/x² 在 x = 0 两侧的图像，x = 0 处有空缺。空缺的高度在解答中标出。"
    },
    hint: {
      en: "$\\cos x \\approx 1 - \\frac{x^2}{2}$ near $0$.",
      fr: "$\\cos x \\approx 1 - \\frac{x^2}{2}$ près de $0$.",
      es: "$\\cos x \\approx 1 - \\frac{x^2}{2}$ cerca de $0$.",
      ja: "$0$ の近くで $\\cos x \\approx 1 - \\frac{x^2}{2}$。",
      zh: "在 $0$ 附近 $\\cos x \\approx 1 - \\frac{x^2}{2}$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example multiplying by (1 + cos x) and using sin x / x → 1), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en multipliant par (1 + cos x) et en utilisant sin x / x → 1), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo multiplicando por (1 + cos x) y usando sen x / x → 1), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば (1 + cos x) をかけて sin x / x → 1 を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如乘以 (1 + cos x) 并利用 sin x / x → 1），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.4, h: 2.8, scale: 36, pad: 18 });
      const T = F.T = axes(F, -4.2, 4.2, -0.4, 2.4);
      const g = x => 4 * f(x);   // vertical scale ×4
      plot(F, T, g, -4.1, -0.02, 'graph'); plot(F, T, g, 0.02, 4.1, 'graph');
      F.reveal = () => {
        F.circle(T([0, 2]), 0.09, 'seg').setAttribute('fill', 'var(--paper)');
        F.text(T([0, 2]), '1/2', 'len small', 24, 16);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$\\frac{1 - (1 - x^2/2 + \\dots)}{x^2} \\to \\tfrac12$.",
        fr: "$\\frac{1 - (1 - x^2/2 + \\dots)}{x^2} \\to \\tfrac12$.",
        es: "$\\frac{1 - (1 - x^2/2 + \\dots)}{x^2} \\to \\tfrac12$.",
        ja: "$\\frac{1 - (1 - x^2/2 + \\dots)}{x^2} \\to \\tfrac12$.",
        zh: "$\\frac{1 - (1 - x^2/2 + \\dots)}{x^2} \\to \\tfrac12$."
      } },
      { tex: "\\lim_{x\\to0}\\frac{\\sin x}{2x}", correct: true, why: {
        en: "One step of L’Hôpital’s rule; this limit is $\\tfrac12$.",
        fr: "Une étape de la règle de L’Hôpital ; cette limite vaut $\\tfrac12$.",
        es: "Un paso de la regla de L’Hôpital; este límite vale $\\tfrac12$.",
        ja: "ロピタルの定理を1回使った形で、値は $\\tfrac12$。",
        zh: "用一次洛必达法则；这个极限为 $\\tfrac12$。"
      } },
      { tex: "0", correct: false, why: {
        en: "$1 - \\cos x$ goes to $0$, but as fast as $x^2$.",
        fr: "$1 - \\cos x$ tend vers $0$, mais aussi vite que $x^2$.",
        es: "$1 - \\cos x$ tiende a $0$, pero tan rápido como $x^2$.",
        ja: "$1 - \\cos x$ は $0$ に近づきますが、$x^2$ と同じ速さです。",
        zh: "$1 - \\cos x$ 趋于 $0$，但与 $x^2$ 同阶。"
      } },
      { tex: "1", correct: false, why: {
        en: "Forgot the $\\tfrac12$ in $\\cos x \\approx 1 - \\tfrac{x^2}{2}$.",
        fr: "Le $\\tfrac12$ de $\\cos x \\approx 1 - \\tfrac{x^2}{2}$ a été oublié.",
        es: "Se olvidó el $\\tfrac12$ de $\\cos x \\approx 1 - \\tfrac{x^2}{2}$.",
        ja: "$\\cos x \\approx 1 - \\tfrac{x^2}{2}$ の $\\tfrac12$ を忘れています。",
        zh: "漏了 $\\cos x \\approx 1 - \\tfrac{x^2}{2}$ 中的 $\\tfrac12$。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "The graph stays bounded near $0$.",
        fr: "Le graphe reste borné près de $0$.",
        es: "La gráfica se mantiene acotada cerca de $0$.",
        ja: "グラフは $0$ の近くで有界です。",
        zh: "图像在 $0$ 附近有界。"
      } },
      { tex: "2", correct: false, why: {
        en: "Upside down: $\\tfrac{x^2}{1 - \\cos x} \\to 2$.",
        fr: "À l’envers : $\\tfrac{x^2}{1 - \\cos x} \\to 2$.",
        es: "Al revés: $\\tfrac{x^2}{1 - \\cos x} \\to 2$.",
        ja: "逆数です：$\\tfrac{x^2}{1 - \\cos x} \\to 2$。",
        zh: "倒过来了：$\\tfrac{x^2}{1 - \\cos x} \\to 2$。"
      } },
      { tex: "-\\tfrac12", correct: false, why: {
        en: "$1 - \\cos x \\ge 0$, so the limit cannot be negative.",
        fr: "$1 - \\cos x \\ge 0$, la limite ne peut pas être négative.",
        es: "$1 - \\cos x \\ge 0$, el límite no puede ser negativo.",
        ja: "$1 - \\cos x \\ge 0$ なので極限は負になりません。",
        zh: "$1 - \\cos x \\ge 0$，极限不可能为负。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "Halved once too often.",
        fr: "Divisé par deux une fois de trop.",
        es: "Dividido por dos una vez de más.",
        ja: "1回余分に半分にしています。",
        zh: "多除了一次 $2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use the expansion of cos",
          fr: "Développer cos",
          es: "Desarrollar cos",
          ja: "cos を展開する",
          zh: "展开 cos"
        },
        lines: ["1 - \\cos x = \\frac{x^2}{2} - \\frac{x^4}{24} + \\dots"],
        note: {
          en: "Near $0$ only the first term matters.",
          fr: "Près de $0$ seul le premier terme compte.",
          es: "Cerca de $0$ solo importa el primer término.",
          ja: "$0$ の近くでは最初の項だけが効きます。",
          zh: "在 $0$ 附近只有第一项起作用。"
        }
      },
      {
        title: {
          en: "Divide by x²",
          fr: "Diviser par x²",
          es: "Dividir entre x²",
          ja: "x² で割る",
          zh: "除以 x²"
        },
        lines: ["\\frac{1 - \\cos x}{x^2} = \\frac12 - \\frac{x^2}{24} + \\dots \\to \\boxed{\\tfrac12}"],
        note: {
          en: "The graph approaches height $\\tfrac12$ at the open circle.",
          fr: "Le graphe s’approche de la hauteur $\\tfrac12$ au point creux.",
          es: "La gráfica se acerca a la altura $\\tfrac12$ en el punto hueco.",
          ja: "グラフは白丸の高さ $\\tfrac12$ に近づきます。",
          zh: "图像在空心点处趋近高度 $\\tfrac12$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.fadeIn(F.circle(F.T([0, 2]), 0.22, 'halo', 'over'), 500); }
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
