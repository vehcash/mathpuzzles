/* combinatorics · Stars and bars
   Non-negative solutions of x + y + z = 10: stars and bars, C(12, 2). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-stars-and-bars",
    category: "combinatorics",
    difficulty: 2,
    title: {
      en: "Stars and bars",
      fr: "Étoiles et barres",
      es: "Estrellas y barras",
      ja: "玉と仕切り",
      zh: "隔板法"
    },
    statement: {
      en: "<b>How many solutions in non-negative integers does $x + y + z = 10$ have?</b> Which of the following equal that number?",
      fr: "<b>Combien de solutions en entiers naturels l’équation $x + y + z = 10$ a-t-elle ?</b> Lesquelles des valeurs suivantes conviennent ?",
      es: "<b>¿Cuántas soluciones en enteros no negativos tiene $x + y + z = 10$?</b> ¿Cuáles de los siguientes son iguales a ese número?",
      ja: "<b>$x + y + z = 10$ の 0 以上の整数解はいくつありますか？</b> 次のうちその数に等しいものはどれですか？",
      zh: "<b>$x + y + z = 10$ 有多少组非负整数解？</b>下列哪些等于这个数？"
    },
    figureText: {
      en: "Ten stars in a row split by two bars, for example ★★★|★★★★★|★★ meaning x = 3, y = 5, z = 2.",
      fr: "Dix étoiles alignées séparées par deux barres, par exemple ★★★|★★★★★|★★ pour x = 3, y = 5, z = 2.",
      es: "Diez estrellas en fila separadas por dos barras, por ejemplo ★★★|★★★★★|★★ para x = 3, y = 5, z = 2.",
      ja: "10個の★を2本の仕切りで分けた例 ★★★|★★★★★|★★（x = 3、y = 5、z = 2）。",
      zh: "十颗星被两根隔板分开，例如 ★★★|★★★★★|★★ 表示 x = 3、y = 5、z = 2。"
    },
    hint: {
      en: "Arrange $10$ stars and $2$ bars in a row.",
      fr: "Alignez $10$ étoiles et $2$ barres.",
      es: "Coloca en fila $10$ estrellas y $2$ barras.",
      ja: "$10$ 個の★と $2$ 本の仕切りを1列に並べます。",
      zh: "把 $10$ 颗星和 $2$ 根隔板排成一行。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example counting, for each value of x, the solutions of y + z = 10 − x), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en comptant, pour chaque x, les solutions de y + z = 10 − x), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo contando, para cada x, las soluciones de y + z = 10 − x), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば各 x について y + z = 10 − x の解を数えて足す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如对每个 x 数 y + z = 10 − x 的解），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.4, scale: 52, pad: 12 });
      const seq = '***|*****|**'; let x = 0.3;
      for (const c of seq) { if (c === '*') F.text([x, 0.7], '★', 'nodenum', 0, 1); else F.seg([x, 0.2], [x, 1.2], 'hl pink'); x += 0.52; }
      return F;
    },
    options: [
      { tex: "66", correct: true, why: {
        en: "$\\binom{12}{2} = \\tfrac{12\\cdot11}{2}$.",
        fr: "$\\binom{12}{2} = \\tfrac{12\\cdot11}{2}$.",
        es: "$\\binom{12}{2} = \\tfrac{12\\cdot11}{2}$.",
        ja: "$\\binom{12}{2} = \\tfrac{12\\cdot11}{2}$.",
        zh: "$\\binom{12}{2} = \\tfrac{12\\cdot11}{2}$."
      } },
      { tex: "\\binom{12}{2}", correct: true, why: {
        en: "Choose the 2 bar positions among 12 places.",
        fr: "Choisir les 2 places des barres parmi 12.",
        es: "Elegir las 2 posiciones de las barras entre 12.",
        ja: "12か所から仕切りの2か所を選ぶ。",
        zh: "从 12 个位置中选 2 个放隔板。"
      } },
      { tex: "36", correct: false, why: {
        en: "$\\binom92$ counts positive solutions only.",
        fr: "$\\binom92$ ne compte que les solutions strictement positives.",
        es: "$\\binom92$ solo cuenta soluciones positivas.",
        ja: "$\\binom92$ は正の整数解だけです。",
        zh: "$\\binom92$ 只数了正整数解。"
      } },
      { tex: "55", correct: false, why: {
        en: "$\\binom{11}{2}$: one place too few.",
        fr: "$\\binom{11}{2}$ : une place de moins.",
        es: "$\\binom{11}{2}$: una posición de menos.",
        ja: "$\\binom{11}{2}$：1か所少ない。",
        zh: "$\\binom{11}{2}$：少了一个位置。"
      } },
      { tex: "120", correct: false, why: {
        en: "$\\binom{10}{3}$ chooses three of the ten stars — not a solution count.",
        fr: "$\\binom{10}{3}$ choisit trois étoiles — ce n’est pas le bon dénombrement.",
        es: "$\\binom{10}{3}$ elige tres estrellas — no es el conteo correcto.",
        ja: "$\\binom{10}{3}$ は★を3つ選ぶ数で、解の数ではありません。",
        zh: "$\\binom{10}{3}$ 是从十颗星中选三颗，不是解的个数。"
      } },
      { tex: "1000", correct: false, why: {
        en: "$10^3$ ignores that the sum must be $10$.",
        fr: "$10^3$ ignore que la somme doit valoir $10$.",
        es: "$10^3$ ignora que la suma debe ser $10$.",
        ja: "$10^3$ は和が $10$ という条件を無視しています。",
        zh: "$10^3$ 忽略了和为 $10$ 的条件。"
      } },
      { tex: "30", correct: false, why: {
        en: "No standard count gives $30$ here.",
        fr: "Aucun dénombrement ne donne $30$ ici.",
        es: "Ningún conteo da $30$ aquí.",
        ja: "ここで $30$ になる数え方はありません。",
        zh: "这里没有任何计数得到 $30$。"
      } },
      { tex: "45", correct: false, why: {
        en: "$\\binom{10}{2}$ puts the bars among the stars only.",
        fr: "$\\binom{10}{2}$ place les barres seulement parmi les étoiles.",
        es: "$\\binom{10}{2}$ coloca las barras solo entre las estrellas.",
        ja: "$\\binom{10}{2}$ は仕切りを★の位置からだけ選んでいます。",
        zh: "$\\binom{10}{2}$ 只在星的位置中放隔板。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Encode a solution",
          fr: "Coder une solution",
          es: "Codificar una solución",
          ja: "解を記号で表す",
          zh: "编码一个解"
        },
        lines: ["(3, 5, 2) \\ \\leftrightarrow\\ \\star\\star\\star\\,|\\,\\star\\star\\star\\star\\star\\,|\\,\\star\\star"],
        note: {
          en: "Stars before the first bar give $x$, between the bars $y$, after the second bar $z$.",
          fr: "Les étoiles avant la première barre donnent $x$, entre les barres $y$, après la seconde $z$.",
          es: "Las estrellas antes de la primera barra dan $x$, entre las barras $y$, tras la segunda $z$.",
          ja: "最初の仕切りの前の★が $x$、間が $y$、後が $z$。",
          zh: "第一根隔板前的星数是 $x$，两板之间是 $y$，第二根之后是 $z$。"
        }
      },
      {
        title: {
          en: "Count the rows of symbols",
          fr: "Compter les rangées de symboles",
          es: "Contar las filas de símbolos",
          ja: "記号の並びを数える",
          zh: "数符号排列"
        },
        lines: ["\\binom{10 + 2}{2} = \\binom{12}{2} = \\boxed{66}"],
        note: {
          en: "Twelve places, two of them bars.",
          fr: "Douze places, dont deux barres.",
          es: "Doce posiciones, dos de ellas barras.",
          ja: "12か所のうち2か所が仕切り。",
          zh: "十二个位置，其中两个是隔板。"
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
