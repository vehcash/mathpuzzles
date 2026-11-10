/* calculus · A hill and a valley
   Local extrema of x³ − 6x² + 9x + 1 from f′(x) = 3(x − 1)(x − 3). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x ** 3 - 6 * x * x + 9 * x + 1;

  PuzzleBank.define({
    id: "calc-cubic-extrema",
    category: "calculus",
    difficulty: 2,
    title: {
      en: "A hill and a valley",
      fr: "Une colline et une vallée",
      es: "Una colina y un valle",
      ja: "山と谷",
      zh: "一座山和一个谷"
    },
    statement: {
      en: "Let $f(x) = x^3 - 6x^2 + 9x + 1$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x) = x^3 - 6x^2 + 9x + 1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x) = x^3 - 6x^2 + 9x + 1$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "$f(x) = x^3 - 6x^2 + 9x + 1$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x) = x^3 - 6x^2 + 9x + 1$。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The graph of f with a local maximum at (1, 5) and a local minimum at (3, 1).",
      fr: "Le graphe de f avec un maximum local en (1, 5) et un minimum local en (3, 1).",
      es: "La gráfica de f con un máximo local en (1, 5) y un mínimo local en (3, 1).",
      ja: "(1, 5) に極大、(3, 1) に極小をもつ f のグラフ。",
      zh: "f 的图像，在 (1, 5) 处有极大值，在 (3, 1) 处有极小值。"
    },
    hint: {
      en: "Factor $f'(x) = 3x^2 - 12x + 9$ and look at its sign.",
      fr: "Factorisez $f'(x) = 3x^2 - 12x + 9$ et étudiez son signe.",
      es: "Factoriza $f'(x) = 3x^2 - 12x + 9$ y estudia su signo.",
      ja: "$f'(x) = 3x^2 - 12x + 9$ を因数分解し、符号を調べます。",
      zh: "把 $f'(x) = 3x^2 - 12x + 9$ 因式分解并看它的符号。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the second-derivative test f″(1) < 0 and f″(3) > 0), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple le test de la dérivée seconde f″(1) < 0 et f″(3) > 0), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo el criterio de la segunda derivada f″(1) < 0 y f″(3) > 0), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば第2次導関数の判定 f″(1) < 0、f″(3) > 0 を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如二阶导数判别 f″(1) < 0，f″(3) > 0），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 7, scale: 30, pad: 18 });
      const T = F.T = axes(F, -0.8, 5.2, -1, 6.4, { grid: true });
      plot(F, T, f, -0.4, 4.4, 'graph', 'base', -1, 6.4);
      F.dot(T([1, 5])); F.dot(T([3, 1]));
      F.text(T([1, 5]), '(1, 5)', 'len small', 0, -14); F.text(T([3, 1]), '(3, 1)', 'len small', 0, 16);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the local maximum value is": { fr: "le maximum local vaut", es: "el máximo local vale", ja: "極大値は", zh: "极大值为" },
      "has a local minimum at": { fr: "a un minimum local en", es: "tiene un mínimo local en", ja: "は極小をとる：", zh: "有极小值于" },
      "has a local maximum at": { fr: "a un maximum local en", es: "tiene un máximo local en", ja: "は極大をとる：", zh: "有极大值于" },
      "the local minimum value is": { fr: "le minimum local vaut", es: "el mínimo local vale", ja: "極小値は", zh: "极小值为" },
      "has no local extrema": { fr: "n’a pas d’extremum local", es: "no tiene extremos locales", ja: "は極値をもたない", zh: "没有极值" },
      "is increasing on": { fr: "est croissante sur", es: "es creciente en", ja: "は増加：", zh: "递增于" },
      "the greatest value of": { fr: "la plus grande valeur de", es: "el mayor valor de", ja: "最大値：", zh: "的最大值：" },
      "on": { fr: "sur", es: "en", ja: "（範囲", zh: "在" },
      "is": { fr: "est", es: "es", ja: "）は", zh: "为" },
      "or": { fr: "ou", es: "o", ja: "または", zh: "或" },
      "max": { fr: "max", es: "máx", ja: "極大", zh: "极大" },
      "min": { fr: "min", es: "mín", ja: "極小", zh: "极小" }
    },
    options: [
      { tex: "\\text{the local maximum value is } 5", correct: true, why: {
        en: "$f(1) = 1 - 6 + 9 + 1 = 5$.",
        fr: "$f(1) = 1 - 6 + 9 + 1 = 5$.",
        es: "$f(1) = 1 - 6 + 9 + 1 = 5$.",
        ja: "$f(1) = 1 - 6 + 9 + 1 = 5$.",
        zh: "$f(1) = 1 - 6 + 9 + 1 = 5$."
      } },
      { tex: "f \\text{ has a local minimum at } x = 3", correct: true, why: {
        en: "$f'$ changes from $-$ to $+$ at $x = 3$.",
        fr: "$f'$ passe de $-$ à $+$ en $x = 3$.",
        es: "$f'$ pasa de $-$ a $+$ en $x = 3$.",
        ja: "$x = 3$ で $f'$ が $-$ から $+$ に変わります。",
        zh: "$f'$ 在 $x = 3$ 处由负变正。"
      } },
      { tex: "f \\text{ has a local maximum at } x = 3", correct: false, why: {
        en: "Swapped: the maximum is at $x = 1$.",
        fr: "Inversé : le maximum est en $x = 1$.",
        es: "Al revés: el máximo está en $x = 1$.",
        ja: "逆です：極大は $x = 1$。",
        zh: "弄反了：极大值在 $x = 1$ 处。"
      } },
      { tex: "\\text{the local minimum value is } 5", correct: false, why: {
        en: "The local minimum value is $f(3) = 1$.",
        fr: "Le minimum local vaut $f(3) = 1$.",
        es: "El mínimo local vale $f(3) = 1$.",
        ja: "極小値は $f(3) = 1$ です。",
        zh: "极小值是 $f(3) = 1$。"
      } },
      { tex: "f \\text{ has no local extrema}", correct: false, why: {
        en: "$f'$ has two simple roots, so it changes sign twice.",
        fr: "$f'$ a deux racines simples, il change donc deux fois de signe.",
        es: "$f'$ tiene dos raíces simples, así que cambia de signo dos veces.",
        ja: "$f'$ は2つの単解をもつので、符号が2回変わります。",
        zh: "$f'$ 有两个单根，所以变号两次。"
      } },
      { tex: "f \\text{ is increasing on } (1, 3)", correct: false, why: {
        en: "$f'(2) = -3 < 0$: it decreases there.",
        fr: "$f'(2) = -3 < 0$ : elle y décroît.",
        es: "$f'(2) = -3 < 0$: ahí decrece.",
        ja: "$f'(2) = -3 < 0$ なので減少しています。",
        zh: "$f'(2) = -3 < 0$：在那里递减。"
      } },
      { tex: "f'(2) = 0", correct: false, why: {
        en: "$f'(2) = 12 - 24 + 9 = -3$.",
        fr: "$f'(2) = 12 - 24 + 9 = -3$.",
        es: "$f'(2) = 12 - 24 + 9 = -3$.",
        ja: "$f'(2) = 12 - 24 + 9 = -3$。",
        zh: "$f'(2) = 12 - 24 + 9 = -3$。"
      } },
      { tex: "\\text{the greatest value of } f \\text{ on } \\mathbb{R} \\text{ is } 5", correct: false, why: {
        en: "A cubic is unbounded: $f(5) = 21 > 5$.",
        fr: "Une cubique n’est pas bornée : $f(5) = 21 > 5$.",
        es: "Una cúbica no está acotada: $f(5) = 21 > 5$.",
        ja: "3次関数は有界ではありません：$f(5) = 21 > 5$。",
        zh: "三次函数无界：$f(5) = 21 > 5$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Critical points",
          fr: "Points critiques",
          es: "Puntos críticos",
          ja: "臨界点",
          zh: "驻点"
        },
        lines: ["f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)", "f' = 0 \\iff x = 1 \\text{ or } x = 3"],
        note: {
          en: "$f' > 0$ before $1$, $< 0$ between $1$ and $3$, $> 0$ after $3$.",
          fr: "$f' > 0$ avant $1$, $< 0$ entre $1$ et $3$, $> 0$ après $3$.",
          es: "$f' > 0$ antes de $1$, $< 0$ entre $1$ y $3$, $> 0$ después de $3$.",
          ja: "$1$ より前で $f' > 0$、$1$ と $3$ の間で $< 0$、$3$ より後で $> 0$。",
          zh: "$1$ 之前 $f' > 0$，$1$ 到 $3$ 之间 $< 0$，$3$ 之后 $> 0$。"
        }
      },
      {
        title: {
          en: "Values at the extrema",
          fr: "Valeurs aux extremums",
          es: "Valores en los extremos",
          ja: "極値",
          zh: "极值"
        },
        lines: ["f(1) = 5 \\ (\\text{max}), \\qquad f(3) = 1 \\ (\\text{min})"],
        note: {
          en: "These are local: the cubic goes to $\\pm\\infty$ at the ends.",
          fr: "Ils sont locaux : la cubique tend vers $\\pm\\infty$ aux extrémités.",
          es: "Son locales: la cúbica tiende a $\\pm\\infty$ en los extremos.",
          ja: "これらは局所的な値で、3次関数は両端で $\\pm\\infty$ に向かいます。",
          zh: "这些是局部值：三次函数在两端趋于 $\\pm\\infty$。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([1, 5]), 0.2, 'halo', 'over'), 400); F.fadeIn(F.circle(F.T([3, 1]), 0.2, 'halo', 'over'), 400, 250); }
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
