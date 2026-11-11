/* calculus · The biggest open box
   Cut squares of side x from a 12 × 12 sheet: V = x(12 − 2x)² is largest at x = 2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-open-box",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap", "alevel"]
    },
    difficulty: 2,
    title: {
      en: "The biggest open box",
      fr: "La plus grande boîte ouverte",
      es: "La caja abierta más grande",
      ja: "一番大きい箱",
      zh: "最大的无盖盒子"
    },
    statement: {
      en: "From a $12\\times12$ square sheet, equal squares of side $x$ are cut from the corners and the sides are folded up into an open box. <b>Which of the following are true for the box of largest volume?</b>",
      fr: "Dans une feuille carrée $12\\times12$, on découpe aux coins des carrés de côté $x$ et on relève les bords pour former une boîte ouverte. <b>Lesquelles des affirmations suivantes sont vraies pour la boîte de volume maximal ?</b>",
      es: "De una hoja cuadrada de $12\\times12$ se cortan en las esquinas cuadrados de lado $x$ y se doblan los lados para formar una caja abierta. <b>¿Cuáles de las siguientes son verdaderas para la caja de mayor volumen?</b>",
      ja: "$12\\times12$ の正方形の紙の四隅から1辺 $x$ の正方形を切り取り、ふちを折り上げてふたのない箱を作ります。<b>体積が最大の箱について、次のうち正しいものはどれですか？</b>",
      zh: "从一张 $12\\times12$ 的正方形纸板四角各剪去边长为 $x$ 的正方形，再把四边折起做成无盖盒子。<b>对于体积最大的盒子，下列说法中正确的是？</b>"
    },
    figureText: {
      en: "A 12 × 12 square with four x × x squares shaded in the corners; the remaining cross folds up into a box with base (12 − 2x) × (12 − 2x) and height x.",
      fr: "Un carré 12 × 12 avec quatre carrés x × x grisés aux coins ; la croix restante se replie en une boîte de base (12 − 2x) × (12 − 2x) et de hauteur x.",
      es: "Un cuadrado de 12 × 12 con cuatro cuadrados x × x sombreados en las esquinas; la cruz restante se dobla en una caja de base (12 − 2x) × (12 − 2x) y altura x.",
      ja: "12 × 12 の正方形の四隅に x × x の正方形が色付けされ、残りの十字形を折ると底面 (12 − 2x) × (12 − 2x)、高さ x の箱になります。",
      zh: "12 × 12 的正方形四角各有一个涂色的 x × x 小正方形；剩下的十字形折起后成为底面 (12 − 2x) × (12 − 2x)、高 x 的盒子。"
    },
    hint: {
      en: "$V(x) = x(12 - 2x)^2$ for $0 < x < 6$; solve $V'(x) = 0$.",
      fr: "$V(x) = x(12 - 2x)^2$ pour $0 < x < 6$ ; résolvez $V'(x) = 0$.",
      es: "$V(x) = x(12 - 2x)^2$ para $0 < x < 6$; resuelve $V'(x) = 0$.",
      ja: "$0 < x < 6$ で $V(x) = x(12 - 2x)^2$。$V'(x) = 0$ を解きます。",
      zh: "$V(x) = x(12 - 2x)^2$，$0 < x < 6$；解 $V'(x) = 0$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the AM–GM inequality applied to 4x, 12 − 2x and 12 − 2x), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple l’inégalité arithmético-géométrique appliquée à 4x, 12 − 2x et 12 − 2x), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo la desigualdad de las medias aplicada a 4x, 12 − 2x y 12 − 2x), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 4x、12 − 2x、12 − 2x に相加相乗平均の不等式を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如对 4x、12 − 2x、12 − 2x 用均值不等式），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 6, scale: 40, pad: 30 });
      F.rect(0, 0, 6, 6, 'tri');
      [[0, 0], [5, 0], [0, 5], [5, 5]].forEach(([x, y]) => F.rect(x, y, 1, 1, 'fill-pink', 'fills'));
      F.seg([1, 1], [5, 1], 'seg thin'); F.seg([1, 5], [5, 5], 'seg thin'); F.seg([1, 1], [1, 5], 'seg thin'); F.seg([5, 1], [5, 5], 'seg thin');
      F.text([0.5, 0.5], 'x', 'len it', 0, 0); F.text([3, 3], '12 − 2x', 'len', 0, 0); F.text([3, 6], '12', 'len', 0, -12);
      return F;
    },
    options: [
      { tex: "x = 2", correct: true, why: {
        en: "$V'(x) = (12 - 2x)(12 - 6x) = 0$ gives $x = 2$ inside $(0, 6)$.",
        fr: "$V'(x) = (12 - 2x)(12 - 6x) = 0$ donne $x = 2$ dans $(0, 6)$.",
        es: "$V'(x) = (12 - 2x)(12 - 6x) = 0$ da $x = 2$ en $(0, 6)$.",
        ja: "$V'(x) = (12 - 2x)(12 - 6x) = 0$ から $(0, 6)$ 内の $x = 2$。",
        zh: "$V'(x) = (12 - 2x)(12 - 6x) = 0$ 在 $(0, 6)$ 内得 $x = 2$。"
      } },
      { tex: "V = 128", correct: true, why: {
        en: "$2\\cdot 8^2 = 128$.",
        fr: "$2\\cdot 8^2 = 128$.",
        es: "$2\\cdot 8^2 = 128$.",
        ja: "$2\\cdot 8^2 = 128$.",
        zh: "$2\\cdot 8^2 = 128$."
      } },
      { tex: "x = 3", correct: false, why: {
        en: "$V(3) = 3\\cdot 36 = 108 < 128$.",
        fr: "$V(3) = 3\\cdot 36 = 108 < 128$.",
        es: "$V(3) = 3\\cdot 36 = 108 < 128$.",
        ja: "$V(3) = 3\\cdot 36 = 108 < 128$.",
        zh: "$V(3) = 3\\cdot 36 = 108 < 128$."
      } },
      { tex: "x = 6", correct: false, why: {
        en: "The other root of $V'$: the base vanishes and $V = 0$.",
        fr: "L’autre racine de $V'$ : la base disparaît et $V = 0$.",
        es: "La otra raíz de $V'$: la base desaparece y $V = 0$.",
        ja: "$V'$ のもう1つの解：底面がなくなり $V = 0$。",
        zh: "$V'$ 的另一个根：底面消失，$V = 0$。"
      } },
      { tex: "V = 144", correct: false, why: {
        en: "No $x$ gives $144$; the maximum is $128$.",
        fr: "Aucun $x$ ne donne $144$ ; le maximum est $128$.",
        es: "Ningún $x$ da $144$; el máximo es $128$.",
        ja: "$144$ になる $x$ はありません。最大は $128$。",
        zh: "没有 $x$ 能得 $144$；最大是 $128$。"
      } },
      { tex: "V = 108", correct: false, why: {
        en: "That is the volume for $x = 3$.",
        fr: "C’est le volume pour $x = 3$.",
        es: "Es el volumen para $x = 3$.",
        ja: "それは $x = 3$ のときの体積です。",
        zh: "那是 $x = 3$ 时的体积。"
      } },
      { tex: "x = 4", correct: false, why: {
        en: "$V(4) = 4\\cdot 16 = 64$.",
        fr: "$V(4) = 4\\cdot 16 = 64$.",
        es: "$V(4) = 4\\cdot 16 = 64$.",
        ja: "$V(4) = 4\\cdot 16 = 64$.",
        zh: "$V(4) = 4\\cdot 16 = 64$."
      } },
      { tex: "V = 216", correct: false, why: {
        en: "$6^3$: a $6\\times6\\times6$ box would need far more cardboard.",
        fr: "$6^3$ : une boîte $6\\times6\\times6$ demanderait bien plus de carton.",
        es: "$6^3$: una caja de $6\\times6\\times6$ necesitaría mucho más cartón.",
        ja: "$6^3$：$6\\times6\\times6$ の箱にはずっと多くの紙が必要です。",
        zh: "$6^3$：$6\\times6\\times6$ 的盒子需要多得多的纸板。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The volume",
          fr: "Le volume",
          es: "El volumen",
          ja: "体積",
          zh: "体积"
        },
        lines: ["V(x) = x\\,(12 - 2x)^2, \\qquad 0 < x < 6"],
        note: {
          en: "Height $x$, square base of side $12 - 2x$.",
          fr: "Hauteur $x$, base carrée de côté $12 - 2x$.",
          es: "Altura $x$, base cuadrada de lado $12 - 2x$.",
          ja: "高さ $x$、底面は1辺 $12 - 2x$ の正方形。",
          zh: "高 $x$，底面是边长 $12 - 2x$ 的正方形。"
        }
      },
      {
        title: {
          en: "Set the derivative to zero",
          fr: "Annuler la dérivée",
          es: "Igualar la derivada a cero",
          ja: "導関数を 0 にする",
          zh: "令导数为零"
        },
        lines: ["V'(x) = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x)", "V' = 0,\\ 0 < x < 6 \\ \\Rightarrow\\ x = 2,\\quad V(2) = 2\\cdot 8^2 = \\boxed{128}"],
        note: {
          en: "$V' > 0$ before $2$ and $< 0$ after, so it is a maximum.",
          fr: "$V' > 0$ avant $2$ et $< 0$ après : c’est un maximum.",
          es: "$V' > 0$ antes de $2$ y $< 0$ después: es un máximo.",
          ja: "$2$ の前で $V' > 0$、後で $< 0$ なので最大です。",
          zh: "$2$ 之前 $V' > 0$，之后 $< 0$，所以是最大值。"
        },
        fig(F) { F.fadeIn(F.rect(1, 1, 4, 4, 'fill-yellow', 'fills'), 600); }
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
          en: "Two statements are true.",
          fr: "Deux affirmations sont vraies.",
          es: "Dos afirmaciones son verdaderas.",
          ja: "正しい記述は2つです。",
          zh: "有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
