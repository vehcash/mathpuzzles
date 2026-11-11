/* trigonometry · From a difference to a double sum
   Gaokao 2023, New Curriculum Paper I (新课标Ⅰ卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2023-sin-diff",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标Ⅰ卷), Question 8",
        fr: "Gaokao 2023, épreuve nationale I (新课标Ⅰ卷), question 8",
        es: "Gaokao 2023, examen nacional I (新课标Ⅰ卷), pregunta 8",
        ja: "2023年 中国・高考 新課程標準Ⅰ卷 第8問",
        zh: "2023年高考数学新课标Ⅰ卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "From a difference to a double sum",
      fr: "D’une différence à une somme doublée",
      es: "De una diferencia a una suma doble",
      ja: "差から和の2倍角へ",
      zh: "由差到和的二倍角"
    },
    statement: {
      en: "It is known that $\\sin(\\alpha-\\beta)=\\tfrac13$ and $\\cos\\alpha\\sin\\beta=\\tfrac16$. <b>Which of the following equal $\\cos(2\\alpha+2\\beta)$?</b>",
      fr: "On sait que $\\sin(\\alpha-\\beta)=\\tfrac13$ et $\\cos\\alpha\\sin\\beta=\\tfrac16$. <b>Lesquelles des expressions suivantes sont égales à $\\cos(2\\alpha+2\\beta)$ ?</b>",
      es: "Se sabe que $\\sin(\\alpha-\\beta)=\\tfrac13$ y $\\cos\\alpha\\sin\\beta=\\tfrac16$. <b>¿Cuáles de las siguientes son iguales a $\\cos(2\\alpha+2\\beta)$?</b>",
      ja: "$\\sin(\\alpha-\\beta)=\\tfrac13$、$\\cos\\alpha\\sin\\beta=\\tfrac16$ です。<b>$\\cos(2\\alpha+2\\beta)$ に等しいものはどれですか？</b>",
      zh: "已知 $\\sin(\\alpha-\\beta)=\\tfrac13$，$\\cos\\alpha\\sin\\beta=\\tfrac16$。<b>下列哪些等于 $\\cos(2\\alpha+2\\beta)$？</b>"
    },
    figureText: {
      en: "Two bars: sin α cos β (unknown) and cos α sin β = 1/6. Their difference is sin(α − β) = 1/3 and their sum is sin(α + β).",
      fr: "Deux barres : sin α cos β (inconnu) et cos α sin β = 1/6. Leur différence vaut sin(α − β) = 1/3 et leur somme sin(α + β).",
      es: "Dos barras: sen α cos β (desconocido) y cos α sen β = 1/6. Su diferencia es sen(α − β) = 1/3 y su suma sen(α + β).",
      ja: "2本の棒：sin α cos β（未知）と cos α sin β = 1/6。差が sin(α − β) = 1/3、和が sin(α + β)。",
      zh: "两条线段：sin α cos β（未知）和 cos α sin β = 1/6。它们的差是 sin(α − β) = 1/3，和是 sin(α + β)。"
    },
    hint: {
      en: "Write $\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta$ and find $\\sin\\alpha\\cos\\beta$ first.",
      fr: "Écrivez $\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta$ et trouvez d’abord $\\sin\\alpha\\cos\\beta$.",
      es: "Escribe $\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta$ y halla primero $\\sin\\alpha\\cos\\beta$.",
      ja: "$\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta$ と書き、まず $\\sin\\alpha\\cos\\beta$ を求めましょう。",
      zh: "写出 $\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta$，先求 $\\sin\\alpha\\cos\\beta$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 2.6, scale: 56, pad: 18 });
      const u = 7.2, y1 = 1.9, y2 = 1.1, y3 = 0.3;
      F.seg([0, y1], [u / 2, y1], 'hl blue'); F.text([u / 3, y1], 'sin α cos β = ?', 'len small', 0, -14);
      F.seg([0, y2], [u / 6, y2], 'hl pink'); F.text([u / 12, y2], '1/6', 'len small', 0, -14);
      F.seg([u / 6, y3], [u / 2, y3], 'hl yellow'); F.text([u / 3, y3], 'sin(α−β) = 1/3', 'len small', 0, -14);
      F.seg([u / 2, 0], [u / 2, 2.3], 'seg thin'); F.seg([u / 6, 0], [u / 6, 2.3], 'seg thin');
      return F;
    },
    options: [
      { tex: "\\tfrac19", correct: true, why: {
        en: "$1-2\\left(\\tfrac23\\right)^2=\\tfrac19$.",
        fr: "$1-2\\left(\\tfrac23\\right)^2=\\tfrac19$.",
        es: "$1-2\\left(\\tfrac23\\right)^2=\\tfrac19$.",
        ja: "$1-2\\left(\\tfrac23\\right)^2=\\tfrac19$。",
        zh: "$1-2\\left(\\tfrac23\\right)^2=\\tfrac19$。"
      } },
      { tex: "1-2\\sin^2(\\alpha+\\beta)", correct: true, why: {
        en: "The double-angle formula $\\cos 2\\theta = 1-2\\sin^2\\theta$ with $\\theta=\\alpha+\\beta$.",
        fr: "La formule de duplication $\\cos 2\\theta = 1-2\\sin^2\\theta$ avec $\\theta=\\alpha+\\beta$.",
        es: "La fórmula del ángulo doble $\\cos 2\\theta = 1-2\\sin^2\\theta$ con $\\theta=\\alpha+\\beta$.",
        ja: "2倍角の公式 $\\cos 2\\theta = 1-2\\sin^2\\theta$（$\\theta=\\alpha+\\beta$）。",
        zh: "二倍角公式 $\\cos 2\\theta = 1-2\\sin^2\\theta$，$\\theta=\\alpha+\\beta$。"
      } },
      { tex: "\\tfrac79", correct: false, why: {
        en: "That is $1-2\\sin^2(\\alpha-\\beta)=\\cos(2\\alpha-2\\beta)$.",
        fr: "C’est $1-2\\sin^2(\\alpha-\\beta)=\\cos(2\\alpha-2\\beta)$.",
        es: "Es $1-2\\sin^2(\\alpha-\\beta)=\\cos(2\\alpha-2\\beta)$.",
        ja: "それは $1-2\\sin^2(\\alpha-\\beta)=\\cos(2\\alpha-2\\beta)$。",
        zh: "那是 $1-2\\sin^2(\\alpha-\\beta)=\\cos(2\\alpha-2\\beta)$。"
      } },
      { tex: "-\\tfrac19", correct: false, why: {
        en: "Sign slip: $1-\\tfrac89$ is positive.",
        fr: "Erreur de signe : $1-\\tfrac89$ est positif.",
        es: "Error de signo: $1-\\tfrac89$ es positivo.",
        ja: "符号ミス：$1-\\tfrac89$ は正。",
        zh: "符号错误：$1-\\tfrac89$ 为正。"
      } },
      { tex: "-\\tfrac79", correct: false, why: {
        en: "Neither the sign nor the angle is right.",
        fr: "Ni le signe ni l’angle ne conviennent.",
        es: "Ni el signo ni el ángulo son correctos.",
        ja: "符号も角も違います。",
        zh: "符号和角都不对。"
      } },
      { tex: "\\tfrac49", correct: false, why: {
        en: "That is $\\sin^2(\\alpha+\\beta)$.",
        fr: "C’est $\\sin^2(\\alpha+\\beta)$.",
        es: "Es $\\sin^2(\\alpha+\\beta)$.",
        ja: "それは $\\sin^2(\\alpha+\\beta)$。",
        zh: "那是 $\\sin^2(\\alpha+\\beta)$。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "That is $\\sin(\\alpha+\\beta)$ itself.",
        fr: "C’est $\\sin(\\alpha+\\beta)$ lui-même.",
        es: "Es el propio $\\sin(\\alpha+\\beta)$.",
        ja: "それは $\\sin(\\alpha+\\beta)$ そのもの。",
        zh: "那是 $\\sin(\\alpha+\\beta)$ 本身。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "That is $\\sin(\\alpha-\\beta)$, the given value.",
        fr: "C’est $\\sin(\\alpha-\\beta)$, la valeur donnée.",
        es: "Es $\\sin(\\alpha-\\beta)$, el dato.",
        ja: "それは与えられた $\\sin(\\alpha-\\beta)$。",
        zh: "那是已知的 $\\sin(\\alpha-\\beta)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find sin α cos β",
          fr: "Trouver sin α cos β",
          es: "Hallar sen α cos β",
          ja: "sin α cos β を求める",
          zh: "求 sin α cos β"
        },
        lines: ["\\sin\\alpha\\cos\\beta=\\sin(\\alpha-\\beta)+\\cos\\alpha\\sin\\beta=\\tfrac13+\\tfrac16=\\tfrac12"],
        note: {
          en: "Expand $\\sin(\\alpha-\\beta)$ and move the known product across.",
          fr: "Développez $\\sin(\\alpha-\\beta)$ et faites passer le produit connu.",
          es: "Desarrolla $\\sin(\\alpha-\\beta)$ y pasa el producto conocido al otro lado.",
          ja: "$\\sin(\\alpha-\\beta)$ を展開し、既知の積を移項します。",
          zh: "展开 $\\sin(\\alpha-\\beta)$，移项已知乘积。"
        }
      },
      {
        title: {
          en: "Add, then double the angle",
          fr: "Additionner, puis doubler l’angle",
          es: "Sumar y duplicar el ángulo",
          ja: "足してから2倍角",
          zh: "相加，再用二倍角"
        },
        lines: ["\\sin(\\alpha+\\beta)=\\tfrac12+\\tfrac16=\\tfrac23", "\\cos(2\\alpha+2\\beta)=1-2\\sin^2(\\alpha+\\beta)=1-\\tfrac89=\\boxed{\\tfrac19}"],
        note: {
          en: "Only $\\sin(\\alpha+\\beta)$ is needed, not $\\alpha$ and $\\beta$ themselves.",
          fr: "Seul $\\sin(\\alpha+\\beta)$ est nécessaire, pas $\\alpha$ et $\\beta$ eux-mêmes.",
          es: "Solo hace falta $\\sin(\\alpha+\\beta)$, no $\\alpha$ ni $\\beta$.",
          ja: "必要なのは $\\sin(\\alpha+\\beta)$ だけで、$\\alpha$、$\\beta$ 自体は不要。",
          zh: "只需要 $\\sin(\\alpha+\\beta)$，不需要 $\\alpha$、$\\beta$ 本身。"
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
          en: "One option is the value, one is the formula that gives it.",
          fr: "Une option est la valeur, une autre la formule qui la donne.",
          es: "Una opción es el valor y otra la fórmula que lo da.",
          ja: "1つは値、1つはそれを与える式。",
          zh: "一个是数值，一个是得出它的公式。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
