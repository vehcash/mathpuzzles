/* algebra · Squares of the roots
   α² + β² = (α + β)² − 2αβ, without solving the equation. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x * x - 5 * x + 3, a = (5 - Math.sqrt(13)) / 2, b = (5 + Math.sqrt(13)) / 2;

  PuzzleBank.define({
    id: "alg-vieta-sum-squares",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["zhongkao", "alevelfm"]
    },
    difficulty: 1,
    title: {
      en: "Squares of the roots",
      fr: "Les carrés des racines",
      es: "Los cuadrados de las raíces",
      ja: "解の2乗の和",
      zh: "两根的平方和"
    },
    statement: {
      en: "$\\alpha$ and $\\beta$ are the roots of $x^2 - 5x + 3 = 0$. <b>Which of the following equal $\\alpha^2 + \\beta^2$?</b>",
      fr: "$\\alpha$ et $\\beta$ sont les racines de $x^2 - 5x + 3 = 0$. <b>Lesquelles des valeurs suivantes sont égales à $\\alpha^2 + \\beta^2$ ?</b>",
      es: "$\\alpha$ y $\\beta$ son las raíces de $x^2 - 5x + 3 = 0$. <b>¿Cuáles de los siguientes son iguales a $\\alpha^2 + \\beta^2$?</b>",
      ja: "$\\alpha$、$\\beta$ は $x^2 - 5x + 3 = 0$ の解です。<b>次のうち $\\alpha^2 + \\beta^2$ に等しいものはどれですか？</b>",
      zh: "$\\alpha$、$\\beta$ 是 $x^2 - 5x + 3 = 0$ 的两根。<b>下列哪些等于 $\\alpha^2 + \\beta^2$？</b>"
    },
    figureText: {
      en: "The parabola y = x² − 5x + 3 crossing the x-axis at α ≈ 0.70 and β ≈ 4.30.",
      fr: "La parabole y = x² − 5x + 3 qui coupe l’axe des abscisses en α ≈ 0,70 et β ≈ 4,30.",
      es: "La parábola y = x² − 5x + 3 que corta el eje x en α ≈ 0,70 y β ≈ 4,30.",
      ja: "放物線 y = x² − 5x + 3 は x 軸と α ≈ 0.70、β ≈ 4.30 で交わります。",
      zh: "抛物线 y = x² − 5x + 3 与 x 轴交于 α ≈ 0.70 和 β ≈ 4.30。"
    },
    hint: {
      en: "Vieta: $\\alpha + \\beta = 5$ and $\\alpha\\beta = 3$.",
      fr: "Viète : $\\alpha + \\beta = 5$ et $\\alpha\\beta = 3$.",
      es: "Vieta: $\\alpha + \\beta = 5$ y $\\alpha\\beta = 3$.",
      ja: "解と係数の関係：$\\alpha + \\beta = 5$、$\\alpha\\beta = 3$。",
      zh: "韦达定理：$\\alpha + \\beta = 5$，$\\alpha\\beta = 3$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example computing the roots (5 ± √13)/2 explicitly and squaring them), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en calculant explicitement les racines (5 ± √13)/2 puis en les élevant au carré), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo calculando las raíces (5 ± √13)/2 y elevándolas al cuadrado), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば解 (5 ± √13)/2 を実際に求めて2乗する）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如直接求出两根 (5 ± √13)/2 再平方），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 8, scale: 30, pad: 18 });
      const T = F.T = axes(F, -1, 6, -3.6, 4.4, { grid: true });
      plot(F, T, f, -0.4, 5.4, 'graph', 'base', -3.6, 4.4);
      F.dot(T([a, 0])); F.dot(T([b, 0]));
      F.text(T([a, 0]), 'α', 'pt', -14, 16); F.text(T([b, 0]), 'β', 'pt', 14, 16);
      return F;
    },
    options: [
      { tex: "19", correct: true, why: {
        en: "$25 - 6$.",
        fr: "$25 - 6$.",
        es: "$25 - 6$.",
        ja: "$25 - 6$.",
        zh: "$25 - 6$."
      } },
      { tex: "5^2 - 2\\cdot 3", correct: true, why: {
        en: "$(\\alpha + \\beta)^2 - 2\\alpha\\beta$ written out.",
        fr: "$(\\alpha + \\beta)^2 - 2\\alpha\\beta$ en détail.",
        es: "$(\\alpha + \\beta)^2 - 2\\alpha\\beta$ desarrollado.",
        ja: "$(\\alpha + \\beta)^2 - 2\\alpha\\beta$ を数で書いたもの。",
        zh: "$(\\alpha + \\beta)^2 - 2\\alpha\\beta$ 的具体写法。"
      } },
      { tex: "25", correct: false, why: {
        en: "$(\\alpha + \\beta)^2$ — the $-2\\alpha\\beta$ is missing.",
        fr: "$(\\alpha + \\beta)^2$ — il manque $-2\\alpha\\beta$.",
        es: "$(\\alpha + \\beta)^2$ — falta $-2\\alpha\\beta$.",
        ja: "$(\\alpha + \\beta)^2$ — $-2\\alpha\\beta$ が抜けています。",
        zh: "$(\\alpha + \\beta)^2$ —— 少了 $-2\\alpha\\beta$。"
      } },
      { tex: "31", correct: false, why: {
        en: "Adds $2\\alpha\\beta$ instead of subtracting it.",
        fr: "Ajoute $2\\alpha\\beta$ au lieu de le soustraire.",
        es: "Suma $2\\alpha\\beta$ en lugar de restarlo.",
        ja: "$2\\alpha\\beta$ を引かずに足しています。",
        zh: "把 $2\\alpha\\beta$ 加上了而不是减去。"
      } },
      { tex: "22", correct: false, why: {
        en: "Subtracts $\\alpha\\beta$ only once.",
        fr: "Ne soustrait $\\alpha\\beta$ qu’une fois.",
        es: "Resta $\\alpha\\beta$ solo una vez.",
        ja: "$\\alpha\\beta$ を1回しか引いていません。",
        zh: "只减了一次 $\\alpha\\beta$。"
      } },
      { tex: "9", correct: false, why: {
        en: "That is $(\\alpha\\beta)^2$.",
        fr: "C’est $(\\alpha\\beta)^2$.",
        es: "Eso es $(\\alpha\\beta)^2$.",
        ja: "それは $(\\alpha\\beta)^2$ です。",
        zh: "那是 $(\\alpha\\beta)^2$。"
      } },
      { tex: "13", correct: false, why: {
        en: "That is $(\\alpha - \\beta)^2 = 25 - 12$.",
        fr: "C’est $(\\alpha - \\beta)^2 = 25 - 12$.",
        es: "Eso es $(\\alpha - \\beta)^2 = 25 - 12$.",
        ja: "それは $(\\alpha - \\beta)^2 = 25 - 12$ です。",
        zh: "那是 $(\\alpha - \\beta)^2 = 25 - 12$。"
      } },
      { tex: "-19", correct: false, why: {
        en: "A sum of squares of real numbers cannot be negative.",
        fr: "Une somme de carrés de réels ne peut pas être négative.",
        es: "Una suma de cuadrados de reales no puede ser negativa.",
        ja: "実数の2乗の和は負になりません。",
        zh: "实数平方和不可能为负。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vieta’s formulas",
          fr: "Les formules de Viète",
          es: "Las fórmulas de Vieta",
          ja: "解と係数の関係",
          zh: "韦达定理"
        },
        lines: ["\\alpha + \\beta = 5, \\qquad \\alpha\\beta = 3"],
        note: {
          en: "For $x^2 + px + q$: sum $-p$, product $q$.",
          fr: "Pour $x^2 + px + q$ : somme $-p$, produit $q$.",
          es: "Para $x^2 + px + q$: suma $-p$, producto $q$.",
          ja: "$x^2 + px + q$ では和 $-p$、積 $q$。",
          zh: "对 $x^2 + px + q$：和为 $-p$，积为 $q$。"
        }
      },
      {
        title: {
          en: "Complete the square",
          fr: "Compléter le carré",
          es: "Completar el cuadrado",
          ja: "平方を作る",
          zh: "配成平方"
        },
        lines: ["\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 25 - 6 = \\boxed{19}"],
        note: {
          en: "No need to find $\\alpha$ and $\\beta$ themselves.",
          fr: "Inutile de calculer $\\alpha$ et $\\beta$.",
          es: "No hace falta hallar $\\alpha$ y $\\beta$.",
          ja: "$\\alpha$ と $\\beta$ そのものを求める必要はありません。",
          zh: "无需求出 $\\alpha$ 和 $\\beta$ 本身。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([a, 0]), 0.2, 'halo', 'over'), 400); F.fadeIn(F.circle(F.T([b, 0]), 0.2, 'halo', 'over'), 400, 200); }
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
