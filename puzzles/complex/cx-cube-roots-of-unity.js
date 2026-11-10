/* complex · A cube root of one
   ω³ = 1 and 1 + ω + ω² = 0 for a non-real cube root of unity. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const P = d => [Math.cos(d * Math.PI / 180), Math.sin(d * Math.PI / 180)];

  PuzzleBank.define({
    id: "cx-cube-roots-of-unity",
    category: "complex",
    difficulty: 2,
    title: {
      en: "A cube root of one",
      fr: "Une racine cubique de un",
      es: "Una raíz cúbica de uno",
      ja: "1 の3乗根",
      zh: "一的立方根"
    },
    statement: {
      en: "$\\omega$ is a non-real cube root of $1$ (so $\\omega^3 = 1$, $\\omega \\ne 1$). <b>Which of the following equal $(1 + \\omega)(1 + \\omega^2)$?</b>",
      fr: "$\\omega$ est une racine cubique non réelle de $1$ (donc $\\omega^3 = 1$, $\\omega \\ne 1$). <b>Lesquelles des valeurs suivantes sont égales à $(1 + \\omega)(1 + \\omega^2)$ ?</b>",
      es: "$\\omega$ es una raíz cúbica no real de $1$ (así que $\\omega^3 = 1$, $\\omega \\ne 1$). <b>¿Cuáles de los siguientes son iguales a $(1 + \\omega)(1 + \\omega^2)$?</b>",
      ja: "$\\omega$ は 1 の虚数の3乗根です（$\\omega^3 = 1$、$\\omega \\ne 1$）。<b>次のうち $(1 + \\omega)(1 + \\omega^2)$ に等しいものはどれですか？</b>",
      zh: "$\\omega$ 是 $1$ 的一个虚立方根（即 $\\omega^3 = 1$，$\\omega \\ne 1$）。<b>下列哪些等于 $(1 + \\omega)(1 + \\omega^2)$？</b>"
    },
    figureText: {
      en: "The unit circle with the three cube roots of unity 1, ω and ω² at 0°, 120° and 240°, forming an equilateral triangle.",
      fr: "Le cercle unité avec les trois racines cubiques de l’unité 1, ω et ω² à 0°, 120° et 240°, formant un triangle équilatéral.",
      es: "La circunferencia unidad con las tres raíces cúbicas de la unidad 1, ω y ω² en 0°, 120° y 240°, que forman un triángulo equilátero.",
      ja: "単位円上の 1 の3乗根 1、ω、ω²（0°、120°、240°）。正三角形をなします。",
      zh: "单位圆上的三个单位立方根 1、ω、ω²，分别在 0°、120°、240°，构成等边三角形。"
    },
    hint: {
      en: "Expand and use $1 + \\omega + \\omega^2 = 0$ and $\\omega^3 = 1$.",
      fr: "Développez et utilisez $1 + \\omega + \\omega^2 = 0$ et $\\omega^3 = 1$.",
      es: "Desarrolla y usa $1 + \\omega + \\omega^2 = 0$ y $\\omega^3 = 1$.",
      ja: "展開して $1 + \\omega + \\omega^2 = 0$、$\\omega^3 = 1$ を使います。",
      zh: "展开并利用 $1 + \\omega + \\omega^2 = 0$ 和 $\\omega^3 = 1$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example 1 + ω = −ω² and 1 + ω² = −ω), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple 1 + ω = −ω² et 1 + ω² = −ω), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo 1 + ω = −ω² y 1 + ω² = −ω), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 1 + ω = −ω²、1 + ω² = −ω を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如 1 + ω = −ω²，1 + ω² = −ω），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 66, pad: 16 });
      const T = F.T = argand(F, -1.7, 1.7, -1.7, 1.7, { grid: false });
      F.circle(T([0, 0]), 1, 'seg thin').setAttribute('fill', 'none');
      F.path([T(P(0)), T(P(120)), T(P(240))], 'tri');
      [0, 120, 240].forEach(d => F.dot(T(P(d))));
      F.text(T(P(0)), '1', 'len', 12, 12); F.text(T(P(120)), 'ω', 'pt', -12, -8); F.text(T(P(240)), 'ω²', 'pt', -14, 10);
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1$.",
        fr: "$1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1$.",
        es: "$1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1$.",
        ja: "$1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1$.",
        zh: "$1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1$."
      } },
      { tex: "\\omega^3", correct: true, why: {
        en: "$\\omega^3 = 1$.",
        fr: "$\\omega^3 = 1$.",
        es: "$\\omega^3 = 1$.",
        ja: "$\\omega^3 = 1$.",
        zh: "$\\omega^3 = 1$."
      } },
      { tex: "0", correct: false, why: {
        en: "That is $1 + \\omega + \\omega^2$, before the extra $\\omega^3$.",
        fr: "C’est $1 + \\omega + \\omega^2$, sans le $\\omega^3$ en plus.",
        es: "Eso es $1 + \\omega + \\omega^2$, sin el $\\omega^3$ adicional.",
        ja: "それは $\\omega^3$ を足す前の $1 + \\omega + \\omega^2$ です。",
        zh: "那是 $1 + \\omega + \\omega^2$，少了多出的 $\\omega^3$。"
      } },
      { tex: "-1", correct: false, why: {
        en: "Sign slip: the product of $-\\omega^2$ and $-\\omega$ is $+\\omega^3$.",
        fr: "Erreur de signe : $(-\\omega^2)(-\\omega) = +\\omega^3$.",
        es: "Error de signo: $(-\\omega^2)(-\\omega) = +\\omega^3$.",
        ja: "符号ミス：$(-\\omega^2)(-\\omega) = +\\omega^3$。",
        zh: "符号错误：$(-\\omega^2)(-\\omega) = +\\omega^3$。"
      } },
      { tex: "2", correct: false, why: {
        en: "Treats $\\omega$ as $1$: then it would be $2\\cdot2 = 4$, still not $2$.",
        fr: "Aucun calcul correct ne donne $2$.",
        es: "Ningún cálculo correcto da $2$.",
        ja: "正しい計算で $2$ になることはありません。",
        zh: "没有正确的计算会得到 $2$。"
      } },
      { tex: "4", correct: false, why: {
        en: "Uses $\\omega = 1$, which is excluded.",
        fr: "Prend $\\omega = 1$, ce qui est exclu.",
        es: "Usa $\\omega = 1$, que está excluido.",
        ja: "除外された $\\omega = 1$ を使っています。",
        zh: "用了被排除的 $\\omega = 1$。"
      } },
      { tex: "\\omega", correct: false, why: {
        en: "$\\omega$ is not real, but the product is.",
        fr: "$\\omega$ n’est pas réel, alors que le produit l’est.",
        es: "$\\omega$ no es real, pero el producto sí.",
        ja: "$\\omega$ は実数ではありませんが、積は実数です。",
        zh: "$\\omega$ 不是实数，而乘积是实数。"
      } },
      { tex: "3", correct: false, why: {
        en: "$1 + 1 + 1$: as if every power of $\\omega$ were $1$.",
        fr: "$1 + 1 + 1$ : comme si chaque puissance de $\\omega$ valait $1$.",
        es: "$1 + 1 + 1$: como si toda potencia de $\\omega$ fuera $1$.",
        ja: "$1 + 1 + 1$：ω のべきがすべて $1$ であるかのようです。",
        zh: "$1 + 1 + 1$：好像 $\\omega$ 的每个幂都是 $1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two facts about ω",
          fr: "Deux propriétés de ω",
          es: "Dos propiedades de ω",
          ja: "ω の2つの性質",
          zh: "ω 的两个性质"
        },
        lines: ["\\omega^3 = 1, \\qquad 1 + \\omega + \\omega^2 = \\frac{\\omega^3 - 1}{\\omega - 1} = 0"],
        note: {
          en: "The three roots are evenly spaced, so they add up to $0$.",
          fr: "Les trois racines sont régulièrement espacées : leur somme est nulle.",
          es: "Las tres raíces están equiespaciadas: suman $0$.",
          ja: "3つの根は等間隔に並ぶので、和は $0$。",
          zh: "三个根均匀分布，所以和为 $0$。"
        }
      },
      {
        title: {
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開する",
          zh: "展开"
        },
        lines: ["(1 + \\omega)(1 + \\omega^2) = 1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1 = \\boxed{1}"],
        note: {
          en: "Or: $(1 + \\omega)(1 + \\omega^2) = (-\\omega^2)(-\\omega) = \\omega^3 = 1$.",
          fr: "Ou : $(1 + \\omega)(1 + \\omega^2) = (-\\omega^2)(-\\omega) = \\omega^3 = 1$.",
          es: "O: $(1 + \\omega)(1 + \\omega^2) = (-\\omega^2)(-\\omega) = \\omega^3 = 1$.",
          ja: "または：$(1 + \\omega)(1 + \\omega^2) = (-\\omega^2)(-\\omega) = \\omega^3 = 1$。",
          zh: "或：$(1 + \\omega)(1 + \\omega^2) = (-\\omega^2)(-\\omega) = \\omega^3 = 1$。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([1, 0]), 0.16, 'halo', 'over'), 400); }
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
