/* probability · The larger of two dice
   E[max of two dice] = Σ k·(2k − 1)/36 = 161/36. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-expected-maximum",
    category: "probability",
    difficulty: 3,
    title: {
      en: "The larger of two dice",
      fr: "Le plus grand de deux dés",
      es: "El mayor de dos dados",
      ja: "2つのさいころの大きい方",
      zh: "两颗骰子中较大的"
    },
    statement: {
      en: "Two fair dice are rolled and $M$ is the larger of the two numbers. <b>Which of the following equal the expected value $E[M]$?</b>",
      fr: "On lance deux dés équilibrés et $M$ est le plus grand des deux nombres. <b>Lesquelles des valeurs suivantes sont égales à l’espérance $E[M]$ ?</b>",
      es: "Se lanzan dos dados equilibrados y $M$ es el mayor de los dos números. <b>¿Cuáles de los siguientes son iguales a la esperanza $E[M]$?</b>",
      ja: "公平なさいころを2つ振り、大きい方の目を $M$ とします。<b>次のうち期待値 $E[M]$ に等しいものはどれですか？</b>",
      zh: "掷两颗均匀骰子，$M$ 为两个点数中较大的。<b>下列哪些等于期望 $E[M]$？</b>"
    },
    figureText: {
      en: "A 6 × 6 grid of outcomes coloured by the maximum: the L-shaped bands for max = 1, 2, …, 6 contain 1, 3, 5, 7, 9, 11 cells.",
      fr: "Une grille 6 × 6 des issues colorée selon le maximum : les bandes en L pour max = 1, 2, …, 6 contiennent 1, 3, 5, 7, 9, 11 cases.",
      es: "Una cuadrícula 6 × 6 de resultados coloreada por el máximo: las bandas en L para máx = 1, 2, …, 6 tienen 1, 3, 5, 7, 9, 11 casillas.",
      ja: "最大値で色分けした 6 × 6 の表。最大値 1、2、…、6 の L 字形の帯にはそれぞれ 1、3、5、7、9、11 マス。",
      zh: "按最大值着色的 6 × 6 结果表：最大值为 1、2、…、6 的 L 形带分别含 1、3、5、7、9、11 格。"
    },
    hint: {
      en: "$P(M = k) = \\dfrac{2k - 1}{36}$: the cells where the larger number is exactly $k$ form an L shape.",
      fr: "$P(M = k) = \\dfrac{2k - 1}{36}$ : les cases où le plus grand vaut $k$ forment un L.",
      es: "$P(M = k) = \\dfrac{2k - 1}{36}$: las casillas donde el mayor es $k$ forman una L.",
      ja: "$P(M = k) = \\dfrac{2k - 1}{36}$：大きい方がちょうど $k$ のマスは L 字形になります。",
      zh: "$P(M = k) = \\dfrac{2k - 1}{36}$：较大数恰为 $k$ 的格子构成 L 形。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example E[M] = Σ P(M ≥ k), or E[max] + E[min] = E[sum] = 7), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple E[M] = Σ P(M ≥ k), ou E[max] + E[min] = E[somme] = 7), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo E[M] = Σ P(M ≥ k), o E[máx] + E[mín] = E[suma] = 7), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば E[M] = Σ P(M ≥ k)、または E[最大] + E[最小] = E[和] = 7 を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如 E[M] = Σ P(M ≥ k)，或 E[最大] + E[最小] = E[和] = 7），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 4.2, scale: 52, pad: 18 });
      const col = ['fill-blue', 'fill-green', 'fill-yellow', 'fill-pink', 'fill-blue', 'fill-yellow'];
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) { const m = Math.max(i, j); F.rect(0.3 + (j - 1) * 0.6, 3.9 - i * 0.6, 0.58, 0.58, col[m - 1], 'fills'); F.text([0.6 + (j - 1) * 0.6, 4.2 - i * 0.6], String(m), 'cellnum', 0, 1); }
      return F;
    },
    options: [
      { tex: "\\tfrac{161}{36}", correct: true, why: {
        en: "$\\tfrac{1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 + 5\\cdot9 + 6\\cdot11}{36}$.",
        fr: "$\\tfrac{1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 + 5\\cdot9 + 6\\cdot11}{36}$.",
        es: "$\\tfrac{1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 + 5\\cdot9 + 6\\cdot11}{36}$.",
        ja: "$\\tfrac{1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 + 5\\cdot9 + 6\\cdot11}{36}$.",
        zh: "$\\tfrac{1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 + 5\\cdot9 + 6\\cdot11}{36}$."
      } },
      { tex: "\\approx 4.47", correct: true, why: {
        en: "The same value as a decimal.",
        fr: "La même valeur en décimal.",
        es: "El mismo valor en decimal.",
        ja: "同じ値を小数で表したもの。",
        zh: "同一个值的小数形式。"
      } },
      { tex: "\\tfrac72", correct: false, why: {
        en: "The expectation of one die — the larger of two is bigger.",
        fr: "L’espérance d’un seul dé — le plus grand des deux est plus grand.",
        es: "La esperanza de un dado — el mayor de dos es más grande.",
        ja: "さいころ1つの期待値 — 2つの大きい方はもっと大きくなります。",
        zh: "一颗骰子的期望 —— 两颗中较大的会更大。"
      } },
      { tex: "7", correct: false, why: {
        en: "That is the expected sum of the two dice.",
        fr: "C’est l’espérance de la somme des deux dés.",
        es: "Es la esperanza de la suma de los dos dados.",
        ja: "それは2つの目の和の期待値です。",
        zh: "那是两颗骰子点数和的期望。"
      } },
      { tex: "\\tfrac{91}{36}", correct: false, why: {
        en: "That is $E[\\min]$; note $E[\\max] + E[\\min] = 7$.",
        fr: "C’est $E[\\min]$ ; on a $E[\\max] + E[\\min] = 7$.",
        es: "Es $E[\\min]$; se cumple $E[\\max] + E[\\min] = 7$.",
        ja: "それは $E[\\min]$ で、$E[\\max] + E[\\min] = 7$ です。",
        zh: "那是 $E[\\min]$；注意 $E[\\max] + E[\\min] = 7$。"
      } },
      { tex: "6", correct: false, why: {
        en: "The largest possible value, not the average.",
        fr: "La plus grande valeur possible, pas la moyenne.",
        es: "El mayor valor posible, no la media.",
        ja: "取りうる最大の値で、平均ではありません。",
        zh: "可能的最大值，而不是平均值。"
      } },
      { tex: "4", correct: false, why: {
        en: "Rounded down — the exact value is $4\\tfrac{17}{36}$.",
        fr: "Arrondi par défaut — la valeur exacte est $4\\tfrac{17}{36}$.",
        es: "Redondeado hacia abajo — el valor exacto es $4\\tfrac{17}{36}$.",
        ja: "切り捨てた値 — 正確には $4\\tfrac{17}{36}$。",
        zh: "向下取整了 —— 精确值是 $4\\tfrac{17}{36}$。"
      } },
      { tex: "5", correct: false, why: {
        en: "Too big: values $1$–$4$ still occur in $16$ of the $36$ cells.",
        fr: "Trop grand : les valeurs $1$–$4$ occupent encore $16$ cases sur $36$.",
        es: "Demasiado grande: los valores $1$–$4$ ocupan $16$ de las $36$ casillas.",
        ja: "大きすぎます：値 $1$〜$4$ が36マス中16マスあります。",
        zh: "太大：值 $1$–$4$ 仍占 $36$ 格中的 $16$ 格。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The distribution of M",
          fr: "La loi de M",
          es: "La distribución de M",
          ja: "M の分布",
          zh: "M 的分布"
        },
        lines: ["P(M = k) = \\frac{k^2 - (k - 1)^2}{36} = \\frac{2k - 1}{36}"],
        note: {
          en: "$M \\le k$ in a $k\\times k$ square; subtracting the $(k-1)\\times(k-1)$ square leaves an L.",
          fr: "$M \\le k$ dans un carré $k\\times k$ ; en retirant le carré $(k-1)\\times(k-1)$ il reste un L.",
          es: "$M \\le k$ en un cuadrado $k\\times k$; al quitar el de $(k-1)\\times(k-1)$ queda una L.",
          ja: "$M \\le k$ は $k\\times k$ の正方形。$(k-1)\\times(k-1)$ を引くと L 字形が残ります。",
          zh: "$M \\le k$ 对应 $k\\times k$ 正方形；减去 $(k-1)\\times(k-1)$ 正方形剩下 L 形。"
        }
      },
      {
        title: {
          en: "Average with these weights",
          fr: "Moyenne avec ces poids",
          es: "Media con estos pesos",
          ja: "この重みで平均する",
          zh: "按这些权重求平均"
        },
        lines: ["E[M] = \\frac{1 + 6 + 15 + 28 + 45 + 66}{36} = \\boxed{\\frac{161}{36}} \\approx 4.47"],
        note: {
          en: "Check: $E[\\min] = \\tfrac{91}{36}$ and $\\tfrac{161 + 91}{36} = 7$, the expected sum.",
          fr: "Vérification : $E[\\min] = \\tfrac{91}{36}$ et $\\tfrac{161 + 91}{36} = 7$.",
          es: "Comprobación: $E[\\min] = \\tfrac{91}{36}$ y $\\tfrac{161 + 91}{36} = 7$.",
          ja: "確認：$E[\\min] = \\tfrac{91}{36}$、$\\tfrac{161 + 91}{36} = 7$。",
          zh: "验证：$E[\\min] = \\tfrac{91}{36}$，$\\tfrac{161 + 91}{36} = 7$。"
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
