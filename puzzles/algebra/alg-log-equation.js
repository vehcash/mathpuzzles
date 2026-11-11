/* algebra · Two logarithms make eight
   log₂x + log₂(x − 2) = 3: combine the logs, solve, then check the domain. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => Math.log2(x) + Math.log2(x - 2);

  PuzzleBank.define({
    id: "alg-log-equation",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "kyotsu", "alevel", "ib"]
    },
    difficulty: 2,
    title: {
      en: "Two logarithms make eight",
      fr: "Deux logarithmes font huit",
      es: "Dos logaritmos dan ocho",
      ja: "2つの対数で 8",
      zh: "两个对数凑成八"
    },
    statement: {
      en: "<b>Which of the following are solutions of $\\log_2 x + \\log_2(x - 2) = 3$?</b>",
      fr: "<b>Lesquels des nombres suivants sont solutions de $\\log_2 x + \\log_2(x - 2) = 3$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son soluciones de $\\log_2 x + \\log_2(x - 2) = 3$?</b>",
      ja: "<b>次のうち $\\log_2 x + \\log_2(x - 2) = 3$ の解はどれですか？</b>",
      zh: "<b>下列哪些是方程 $\\log_2 x + \\log_2(x - 2) = 3$ 的解？</b>"
    },
    figureText: {
      en: "The graph of y = log₂x + log₂(x − 2), defined only for x > 2, crossing the line y = 3 once, at x = 4.",
      fr: "Le graphe de y = log₂x + log₂(x − 2), défini seulement pour x > 2, qui coupe la droite y = 3 une fois, en x = 4.",
      es: "La gráfica de y = log₂x + log₂(x − 2), definida solo para x > 2, que corta la recta y = 3 una vez, en x = 4.",
      ja: "x > 2 でのみ定義される y = log₂x + log₂(x − 2) のグラフ。直線 y = 3 と x = 4 で1回交わります。",
      zh: "只在 x > 2 时有定义的 y = log₂x + log₂(x − 2) 的图像，与直线 y = 3 交于一点 x = 4。"
    },
    hint: {
      en: "$\\log_2 a + \\log_2 b = \\log_2(ab)$, and both $x$ and $x - 2$ must be positive.",
      fr: "$\\log_2 a + \\log_2 b = \\log_2(ab)$, et $x$ comme $x - 2$ doivent être positifs.",
      es: "$\\log_2 a + \\log_2 b = \\log_2(ab)$, y tanto $x$ como $x - 2$ deben ser positivos.",
      ja: "$\\log_2 a + \\log_2 b = \\log_2(ab)$。また $x$ と $x - 2$ はどちらも正でなければなりません。",
      zh: "$\\log_2 a + \\log_2 b = \\log_2(ab)$，并且 $x$ 和 $x - 2$ 都必须为正。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example testing candidates directly in the original equation), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en testant les candidats directement dans l’équation de départ), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo probando los candidatos directamente en la ecuación original), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば候補を元の方程式に直接代入して調べる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把候选值直接代入原方程检验），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 6, scale: 34, pad: 18 });
      const T = F.T = axes(F, -0.6, 6.4, -2, 4.4, { grid: true });
      F.seg(T([2, -2]), T([2, 4.4]), 'seg thin');
      F.seg(T([-0.6, 3]), T([6.4, 3]), 'seg thin');
      plot(F, T, f, 2.02, 6.3, 'graph', 'base', -2, 4.4);
      F.text(T([2, -2]), 'x = 2', 'len small', 22, -6); F.text(T([0, 3]), '3', 'len small', -10, -6);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "rejected": { fr: "rejeté", es: "se descarta", ja: "は不適", zh: "舍去" }
    },
    options: [
      { tex: "x = 4", correct: true, why: {
        en: "$\\log_2 4 + \\log_2 2 = 2 + 1 = 3$.",
        fr: "$\\log_2 4 + \\log_2 2 = 2 + 1 = 3$.",
        es: "$\\log_2 4 + \\log_2 2 = 2 + 1 = 3$.",
        ja: "$\\log_2 4 + \\log_2 2 = 2 + 1 = 3$.",
        zh: "$\\log_2 4 + \\log_2 2 = 2 + 1 = 3$."
      } },
      { tex: "x = -2", correct: false, why: {
        en: "A root of $x^2 - 2x - 8$, but $\\log_2(-2)$ is undefined.",
        fr: "Racine de $x^2 - 2x - 8$, mais $\\log_2(-2)$ n’existe pas.",
        es: "Raíz de $x^2 - 2x - 8$, pero $\\log_2(-2)$ no existe.",
        ja: "$x^2 - 2x - 8$ の解ですが、$\\log_2(-2)$ は定義されません。",
        zh: "是 $x^2 - 2x - 8$ 的根，但 $\\log_2(-2)$ 无意义。"
      } },
      { tex: "x = 5", correct: false, why: {
        en: "Used $\\log a + \\log b = \\log(a + b)$: $2x - 2 = 8$.",
        fr: "A utilisé $\\log a + \\log b = \\log(a + b)$ : $2x - 2 = 8$.",
        es: "Usó $\\log a + \\log b = \\log(a + b)$: $2x - 2 = 8$.",
        ja: "$\\log a + \\log b = \\log(a + b)$ としています：$2x - 2 = 8$。",
        zh: "误用了 $\\log a + \\log b = \\log(a + b)$：$2x - 2 = 8$。"
      } },
      { tex: "x = 8", correct: false, why: {
        en: "Solves $\\log_2 x = 3$ and forgets the second logarithm.",
        fr: "Résout $\\log_2 x = 3$ en oubliant le second logarithme.",
        es: "Resuelve $\\log_2 x = 3$ y olvida el segundo logaritmo.",
        ja: "$\\log_2 x = 3$ を解いて2つ目の対数を忘れています。",
        zh: "只解了 $\\log_2 x = 3$，漏了第二个对数。"
      } },
      { tex: "x = 3", correct: false, why: {
        en: "$\\log_2 3 + \\log_2 1 = \\log_2 3 \\ne 3$.",
        fr: "$\\log_2 3 + \\log_2 1 = \\log_2 3 \\ne 3$.",
        es: "$\\log_2 3 + \\log_2 1 = \\log_2 3 \\ne 3$.",
        ja: "$\\log_2 3 + \\log_2 1 = \\log_2 3 \\ne 3$.",
        zh: "$\\log_2 3 + \\log_2 1 = \\log_2 3 \\ne 3$."
      } },
      { tex: "x = 2", correct: false, why: {
        en: "$\\log_2 0$ is undefined.",
        fr: "$\\log_2 0$ n’existe pas.",
        es: "$\\log_2 0$ no existe.",
        ja: "$\\log_2 0$ は定義されません。",
        zh: "$\\log_2 0$ 无意义。"
      } },
      { tex: "x = 1 + \\sqrt5", correct: false, why: {
        en: "Solves $x(x - 2) = 4$: used $2^2$ instead of $2^3$.",
        fr: "Résout $x(x - 2) = 4$ : $2^2$ au lieu de $2^3$.",
        es: "Resuelve $x(x - 2) = 4$: $2^2$ en lugar de $2^3$.",
        ja: "$x(x - 2) = 4$ を解いています：$2^3$ ではなく $2^2$。",
        zh: "解的是 $x(x - 2) = 4$：用了 $2^2$ 而不是 $2^3$。"
      } },
      { tex: "x = 6", correct: false, why: {
        en: "$\\log_2 6 + \\log_2 4 = \\log_2 24 \\ne 3$.",
        fr: "$\\log_2 6 + \\log_2 4 = \\log_2 24 \\ne 3$.",
        es: "$\\log_2 6 + \\log_2 4 = \\log_2 24 \\ne 3$.",
        ja: "$\\log_2 6 + \\log_2 4 = \\log_2 24 \\ne 3$.",
        zh: "$\\log_2 6 + \\log_2 4 = \\log_2 24 \\ne 3$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Combine the logarithms",
          fr: "Regrouper les logarithmes",
          es: "Juntar los logaritmos",
          ja: "対数をまとめる",
          zh: "合并对数"
        },
        lines: ["\\log_2\\big(x(x - 2)\\big) = 3 \\ \\Rightarrow\\ x(x - 2) = 2^3 = 8"],
        note: {
          en: "Valid only where both logarithms exist: $x > 2$.",
          fr: "Valable seulement là où les deux logarithmes existent : $x > 2$.",
          es: "Válido solo donde existen los dos logaritmos: $x > 2$.",
          ja: "両方の対数が存在する $x > 2$ でのみ有効です。",
          zh: "只在两个对数都有意义的 $x > 2$ 时成立。"
        }
      },
      {
        title: {
          en: "Solve and check the domain",
          fr: "Résoudre et vérifier le domaine",
          es: "Resolver y comprobar el dominio",
          ja: "解いて定義域を確認",
          zh: "求解并检验定义域"
        },
        lines: ["x^2 - 2x - 8 = (x - 4)(x + 2) = 0", "x = 4 \\ \\checkmark,\\qquad x = -2 \\ \\text{rejected}"],
        note: {
          en: "Only $x = 4$ is in the domain $x > 2$.",
          fr: "Seul $x = 4$ est dans le domaine $x > 2$.",
          es: "Solo $x = 4$ está en el dominio $x > 2$.",
          ja: "定義域 $x > 2$ に入るのは $x = 4$ だけです。",
          zh: "只有 $x = 4$ 在定义域 $x > 2$ 内。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([4, 3]), 0.18, 'halo', 'over'), 400); F.fadeIn(F.dot(F.T([4, 3])), 300, 200); }
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
