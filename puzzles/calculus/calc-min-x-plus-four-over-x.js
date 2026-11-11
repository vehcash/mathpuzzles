/* calculus · A number plus four over it
   Minimum of x + 4/x for x > 0: f′ = 1 − 4/x² = 0 at x = 2, value 4. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x + 4 / x;

  PuzzleBank.define({
    id: "calc-min-x-plus-four-over-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "ap"]
    },
    difficulty: 1,
    title: {
      en: "A number plus four over it",
      fr: "Un nombre plus quatre sur lui",
      es: "Un número más cuatro entre él",
      ja: "x と 4/x の和",
      zh: "x 加 4/x"
    },
    statement: {
      en: "Let $f(x) = x + \\dfrac4x$ for $x > 0$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x) = x + \\dfrac4x$ pour $x > 0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x) = x + \\dfrac4x$ para $x > 0$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "$x > 0$ で $f(x) = x + \\dfrac4x$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x) = x + \\dfrac4x$（$x > 0$）。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The graph of x + 4/x for x > 0. Its lowest point is marked in the solution.",
      fr: "La courbe de x + 4/x pour x > 0. Son point le plus bas est marqué dans la solution.",
      es: "La gráfica de x + 4/x para x > 0. Su punto más bajo se marca en la solución.",
      ja: "x > 0 での x + 4/x のグラフ。最低点は解答で示します。",
      zh: "x > 0 时 x + 4/x 的图像。最低点在解答中标出。"
    },
    hint: {
      en: "Solve $f'(x) = 1 - \\dfrac{4}{x^2} = 0$.",
      fr: "Résolvez $f'(x) = 1 - \\dfrac{4}{x^2} = 0$.",
      es: "Resuelve $f'(x) = 1 - \\dfrac{4}{x^2} = 0$.",
      ja: "$f'(x) = 1 - \\dfrac{4}{x^2} = 0$ を解きます。",
      zh: "解 $f'(x) = 1 - \\dfrac{4}{x^2} = 0$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the AM–GM inequality), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec l’inégalité arithmético-géométrique), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con la desigualdad de las medias), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば相加相乗平均の不等式を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用均值不等式），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 4.4, scale: 40, pad: 18 });
      const T = F.T = axes(F, -0.4, 6, -0.4, 4);
      const g = x => f(x) / 2.5;   // vertical scale 1/2.5
      plot(F, T, g, 0.4, 5.8, 'graph', 'base', -0.4, 4);
      F.reveal = () => {
        F.seg(T([2, 0]), T([2, 1.6]), 'seg thin'); F.dot(T([2, 1.6]));
        F.text(T([2, 1.6]), '(2, 4)', 'len small', 28, 16);
      };
      return F;
    },
    options: [
      { tex: "\\text{the minimum value of } f \\text{ is } 4", correct: true, why: {
        en: "$f(2) = 2 + 2 = 4$.",
        fr: "$f(2) = 2 + 2 = 4$.",
        es: "$f(2) = 2 + 2 = 4$.",
        ja: "$f(2) = 2 + 2 = 4$.",
        zh: "$f(2) = 2 + 2 = 4$."
      } },
      { tex: "\\text{the minimum is reached at } x = 2", correct: true, why: {
        en: "$1 - \\tfrac4{x^2} = 0 \\Rightarrow x = 2$ (as $x > 0$).",
        fr: "$1 - \\tfrac4{x^2} = 0 \\Rightarrow x = 2$ (car $x > 0$).",
        es: "$1 - \\tfrac4{x^2} = 0 \\Rightarrow x = 2$ (pues $x > 0$).",
        ja: "$1 - \\tfrac4{x^2} = 0 \\Rightarrow x = 2$（$x > 0$ より）。",
        zh: "$1 - \\tfrac4{x^2} = 0 \\Rightarrow x = 2$（因 $x > 0$）。"
      } },
      { tex: "\\text{the minimum value of } f \\text{ is } 2", correct: false, why: {
        en: "$2$ is where the minimum happens, not its value.",
        fr: "$2$ est l’endroit du minimum, pas sa valeur.",
        es: "$2$ es dónde ocurre el mínimo, no su valor.",
        ja: "$2$ は最小になる場所で、最小値ではありません。",
        zh: "$2$ 是取最小值的位置，不是最小值。"
      } },
      { tex: "\\text{the minimum is reached at } x = 4", correct: false, why: {
        en: "$f(4) = 5 > 4$.",
        fr: "$f(4) = 5 > 4$.",
        es: "$f(4) = 5 > 4$.",
        ja: "$f(4) = 5 > 4$。",
        zh: "$f(4) = 5 > 4$。"
      } },
      { tex: "f \\text{ has no minimum on } (0, \\infty)", correct: false, why: {
        en: "It blows up at both ends but has a lowest point in between.",
        fr: "Elle explose aux deux bouts mais a un point le plus bas entre les deux.",
        es: "Crece sin límite en ambos extremos pero tiene un punto más bajo entre ellos.",
        ja: "両端で発散しますが、その間に最低点があります。",
        zh: "两端发散，但中间有最低点。"
      } },
      { tex: "\\text{the maximum value of } f \\text{ is } 4", correct: false, why: {
        en: "$4$ is the smallest value; $f$ is unbounded above.",
        fr: "$4$ est la plus petite valeur ; $f$ n’est pas majorée.",
        es: "$4$ es el valor más pequeño; $f$ no está acotada superiormente.",
        ja: "$4$ は最小値で、$f$ は上に有界ではありません。",
        zh: "$4$ 是最小值；$f$ 无上界。"
      } },
      { tex: "f'(x) = 1 + \\frac{4}{x^2}", correct: false, why: {
        en: "$\\left(\\tfrac4x\\right)' = -\\tfrac{4}{x^2}$.",
        fr: "$\\left(\\tfrac4x\\right)' = -\\tfrac{4}{x^2}$.",
        es: "$\\left(\\tfrac4x\\right)' = -\\tfrac{4}{x^2}$.",
        ja: "$\\left(\\tfrac4x\\right)' = -\\tfrac{4}{x^2}$。",
        zh: "$\\left(\\tfrac4x\\right)' = -\\tfrac{4}{x^2}$。"
      } },
      { tex: "\\text{the minimum value of } f \\text{ is } 5", correct: false, why: {
        en: "$f(1) = 5$, but $f(2) = 4$ is smaller.",
        fr: "$f(1) = 5$, mais $f(2) = 4$ est plus petit.",
        es: "$f(1) = 5$, pero $f(2) = 4$ es menor.",
        ja: "$f(1) = 5$ ですが $f(2) = 4$ の方が小さい。",
        zh: "$f(1) = 5$，但 $f(2) = 4$ 更小。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Critical point",
          fr: "Point critique",
          es: "Punto crítico",
          ja: "臨界点",
          zh: "临界点"
        },
        lines: ["f'(x) = 1 - \\frac{4}{x^2} = 0 \\ \\Rightarrow\\ x^2 = 4 \\ \\Rightarrow\\ x = 2"],
        note: {
          en: "$f' < 0$ for $x < 2$ and $f' > 0$ for $x > 2$: a minimum.",
          fr: "$f' < 0$ pour $x < 2$ et $f' > 0$ pour $x > 2$ : un minimum.",
          es: "$f' < 0$ para $x < 2$ y $f' > 0$ para $x > 2$: un mínimo.",
          ja: "$x < 2$ で $f' < 0$、$x > 2$ で $f' > 0$：最小。",
          zh: "$x < 2$ 时 $f' < 0$，$x > 2$ 时 $f' > 0$：最小值。"
        }
      },
      {
        title: {
          en: "The minimum value",
          fr: "La valeur minimale",
          es: "El valor mínimo",
          ja: "最小値",
          zh: "最小值"
        },
        lines: ["f(2) = 2 + \\frac42 = \\boxed{4}"],
        note: {
          en: "AM–GM agrees: $x + \\tfrac4x \\ge 2\\sqrt{x\\cdot\\tfrac4x} = 4$.",
          fr: "L’inégalité arithmético-géométrique confirme : $x + \\tfrac4x \\ge 2\\sqrt{x\\cdot\\tfrac4x} = 4$.",
          es: "La desigualdad de las medias lo confirma: $x + \\tfrac4x \\ge 2\\sqrt{x\\cdot\\tfrac4x} = 4$.",
          ja: "相加相乗平均でも：$x + \\tfrac4x \\ge 2\\sqrt{x\\cdot\\tfrac4x} = 4$。",
          zh: "均值不等式也给出：$x + \\tfrac4x \\ge 2\\sqrt{x\\cdot\\tfrac4x} = 4$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.fadeIn(F.circle(F.T([2, 1.6]), 0.2, 'halo', 'over'), 500); }
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
