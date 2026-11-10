/* calculus · A hump that fades away
   f = x e^{−x}: f′ = (1 − x)e^{−x}; increasing on (−∞, 1), maximum 1/e. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x * Math.exp(-x);

  PuzzleBank.define({
    id: "calc-x-exp-minus-x",
    category: "calculus",
    difficulty: 2,
    title: {
      en: "A hump that fades away",
      fr: "Une bosse qui s’efface",
      es: "Una joroba que se desvanece",
      ja: "消えていく山",
      zh: "逐渐消失的驼峰"
    },
    statement: {
      en: "Let $f(x) = x\\,e^{-x}$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x) = x\\,e^{-x}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x) = x\\,e^{-x}$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "$f(x) = x\\,e^{-x}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x) = x\\,e^{-x}$。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The graph of x e^(−x): it rises to a single peak and then decays towards the x-axis.",
      fr: "Le graphe de x e^(−x) : il monte jusqu’à un unique sommet puis retombe vers l’axe des x.",
      es: "La gráfica de x e^(−x): sube hasta un único pico y luego decae hacia el eje x.",
      ja: "x e^(−x) のグラフ。1つの山まで上がり、その後 x 軸に近づいていきます。",
      zh: "x e^(−x) 的图像：升到唯一的峰值后向 x 轴衰减。"
    },
    hint: {
      en: "$f'(x) = e^{-x} - x e^{-x}$; $e^{-x}$ is always positive.",
      fr: "$f'(x) = e^{-x} - x e^{-x}$ ; $e^{-x}$ est toujours positif.",
      es: "$f'(x) = e^{-x} - x e^{-x}$; $e^{-x}$ siempre es positivo.",
      ja: "$f'(x) = e^{-x} - x e^{-x}$。$e^{-x}$ は常に正です。",
      zh: "$f'(x) = e^{-x} - x e^{-x}$；$e^{-x}$ 恒为正。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example studying ln f for x > 0), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en étudiant ln f pour x > 0), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo estudiando ln f para x > 0), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば x > 0 で ln f を調べる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如在 x > 0 时研究 ln f），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 3.4, scale: 46, pad: 18 });
      const T = F.T = axes(F, -1, 6, -1.3, 2.1);
      const g = x => 4 * f(x);   // vertical scale ×4
      plot(F, T, g, -0.3, 6, 'graph', 'base', -1.3, 2.1);
      F.seg(T([1, 0]), T([1, 4 / Math.E]), 'seg thin'); F.dot(T([1, 4 / Math.E]));
      F.text(T([1, 0]), '1', 'tick', 0, 14); F.text(T([1, 4 / Math.E]), '1/e', 'len small', 0, -14);
      return F;
    },
    options: [
      { tex: "f \\text{ is increasing on } (-\\infty, 1)", correct: true, why: {
        en: "$f'(x) = (1 - x)e^{-x} > 0$ for $x < 1$.",
        fr: "$f'(x) = (1 - x)e^{-x} > 0$ pour $x < 1$.",
        es: "$f'(x) = (1 - x)e^{-x} > 0$ para $x < 1$.",
        ja: "$x < 1$ で $f'(x) = (1 - x)e^{-x} > 0$。",
        zh: "当 $x < 1$ 时 $f'(x) = (1 - x)e^{-x} > 0$。"
      } },
      { tex: "\\text{the maximum value of } f \\text{ is } \\tfrac1e", correct: true, why: {
        en: "$f(1) = e^{-1}$.",
        fr: "$f(1) = e^{-1}$.",
        es: "$f(1) = e^{-1}$.",
        ja: "$f(1) = e^{-1}$.",
        zh: "$f(1) = e^{-1}$."
      } },
      { tex: "f'(x) = (1 + x)e^{-x}", correct: false, why: {
        en: "The derivative of $e^{-x}$ is $-e^{-x}$, giving $1 - x$.",
        fr: "La dérivée de $e^{-x}$ est $-e^{-x}$, d’où $1 - x$.",
        es: "La derivada de $e^{-x}$ es $-e^{-x}$, de ahí $1 - x$.",
        ja: "$e^{-x}$ の導関数は $-e^{-x}$ なので $1 - x$。",
        zh: "$e^{-x}$ 的导数是 $-e^{-x}$，所以是 $1 - x$。"
      } },
      { tex: "f \\text{ has a minimum at } x = 1", correct: false, why: {
        en: "$f'$ changes from $+$ to $-$: a maximum.",
        fr: "$f'$ passe de $+$ à $-$ : un maximum.",
        es: "$f'$ pasa de $+$ a $-$: un máximo.",
        ja: "$f'$ が $+$ から $-$ に変わるので極大。",
        zh: "$f'$ 由正变负：是极大值。"
      } },
      { tex: "\\text{the maximum value of } f \\text{ is } e", correct: false, why: {
        en: "$f(1) = 1\\cdot e^{-1}$, not $e^{1}$.",
        fr: "$f(1) = 1\\cdot e^{-1}$, pas $e^{1}$.",
        es: "$f(1) = 1\\cdot e^{-1}$, no $e^{1}$.",
        ja: "$f(1) = 1\\cdot e^{-1}$ で $e^{1}$ ではありません。",
        zh: "$f(1) = 1\\cdot e^{-1}$，不是 $e^{1}$。"
      } },
      { tex: "f(x) \\to \\infty \\text{ as } x \\to \\infty", correct: false, why: {
        en: "$e^{-x}$ wins: $f(x) \\to 0$.",
        fr: "$e^{-x}$ l’emporte : $f(x) \\to 0$.",
        es: "$e^{-x}$ gana: $f(x) \\to 0$.",
        ja: "$e^{-x}$ の方が強く、$f(x) \\to 0$。",
        zh: "$e^{-x}$ 衰减更快：$f(x) \\to 0$。"
      } },
      { tex: "f \\text{ is decreasing on } (0, \\infty)", correct: false, why: {
        en: "It still increases on $(0, 1)$.",
        fr: "Elle croît encore sur $(0, 1)$.",
        es: "Aún crece en $(0, 1)$.",
        ja: "$(0, 1)$ ではまだ増加しています。",
        zh: "在 $(0, 1)$ 上仍递增。"
      } },
      { tex: "f \\text{ has an inflection point at } x = 1", correct: false, why: {
        en: "$f''(x) = (x - 2)e^{-x}$: the inflection is at $x = 2$.",
        fr: "$f''(x) = (x - 2)e^{-x}$ : l’inflexion est en $x = 2$.",
        es: "$f''(x) = (x - 2)e^{-x}$: la inflexión está en $x = 2$.",
        ja: "$f''(x) = (x - 2)e^{-x}$ なので変曲点は $x = 2$。",
        zh: "$f''(x) = (x - 2)e^{-x}$：拐点在 $x = 2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Differentiate",
          fr: "Dériver",
          es: "Derivar",
          ja: "微分する",
          zh: "求导"
        },
        lines: ["f'(x) = e^{-x} - x e^{-x} = (1 - x)\\,e^{-x}"],
        note: {
          en: "The sign of $f'$ is the sign of $1 - x$.",
          fr: "Le signe de $f'$ est celui de $1 - x$.",
          es: "El signo de $f'$ es el de $1 - x$.",
          ja: "$f'$ の符号は $1 - x$ の符号です。",
          zh: "$f'$ 的符号与 $1 - x$ 相同。"
        }
      },
      {
        title: {
          en: "The peak",
          fr: "Le sommet",
          es: "El pico",
          ja: "山の頂上",
          zh: "峰值"
        },
        lines: ["f(1) = \\frac1e \\approx 0.37, \\qquad f(x) \\to 0 \\ (x \\to \\infty)"],
        note: {
          en: "Increasing before $x = 1$, decreasing after: the only maximum.",
          fr: "Croissante avant $x = 1$, décroissante après : l’unique maximum.",
          es: "Creciente antes de $x = 1$ y decreciente después: el único máximo.",
          ja: "$x = 1$ の前で増加、後で減少：唯一の最大値。",
          zh: "$x = 1$ 前递增、后递减：唯一的最大值。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([1, 4 / Math.E]), 0.18, 'halo', 'over'), 500); }
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
