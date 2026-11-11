/* number · The zeros at the end of 100!
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 49 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-ita-2020-trailing-zeros",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 49",
        fr: "Concours de l’ITA (Institut technologique d’aéronautique, Brésil) 2020, mathématiques, question 49",
        es: "Examen de ingreso del ITA (Instituto Tecnológico de Aeronáutica, Brasil) 2020, matemáticas, pregunta 49",
        ja: "ITA（ブラジル航空技術大学）2020 入試 数学 第49問",
        zh: "巴西航空技术学院 ITA 2020 入学考试 数学第 49 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "The zeros at the end of 100!",
      fr: "Les zéros à la fin de 100!",
      es: "Los ceros al final de 100!",
      ja: "100! の末尾のゼロ",
      zh: "100! 末尾的零"
    },
    statement: {
      en: "Written in base ten, $100! = 1\\cdot2\\cdot3\\cdots100$ ends in a block of zeros. <b>Which of the following equal the number of zeros at the end of $100!$?</b>",
      fr: "Écrit en base dix, $100! = 1\\cdot2\\cdot3\\cdots100$ se termine par un bloc de zéros. <b>Lesquelles des valeurs suivantes sont égales au nombre de zéros à la fin de $100!$ ?</b>",
      es: "Escrito en base diez, $100! = 1\\cdot2\\cdot3\\cdots100$ termina en un bloque de ceros. <b>¿Cuáles de los siguientes valores son iguales al número de ceros al final de $100!$?</b>",
      ja: "10進法で書いた $100! = 1\\cdot2\\cdot3\\cdots100$ は末尾にゼロが並びます。<b>$100!$ の末尾のゼロの個数に等しいものはどれですか？</b>",
      zh: "用十进制写出的 $100! = 1\\cdot2\\cdot3\\cdots100$ 末尾有一串零。<b>下列哪些等于 $100!$ 末尾零的个数？</b>"
    },
    figureText: {
      en: "The numbers 1 to 100 in a 10 × 10 grid. The multiples of 5 are shaded; 25, 50, 75 and 100, which contain 5 twice, are shaded darker.",
      fr: "Les nombres de 1 à 100 dans une grille 10 × 10. Les multiples de 5 sont grisés ; 25, 50, 75 et 100, qui contiennent deux fois 5, sont plus foncés.",
      es: "Los números del 1 al 100 en una cuadrícula de 10 × 10. Los múltiplos de 5 están sombreados; 25, 50, 75 y 100, que contienen el 5 dos veces, más oscuros.",
      ja: "1〜100 を 10 × 10 に並べた表。5 の倍数に色を付け、5 を2回含む 25、50、75、100 は濃い色。",
      zh: "1 到 100 排成 10 × 10 的格子。5 的倍数涂色；含两个因子 5 的 25、50、75、100 颜色更深。"
    },
    hint: {
      en: "Each final zero is a factor $10=2\\cdot5$, and factors $5$ are scarcer than factors $2$.",
      fr: "Chaque zéro final est un facteur $10=2\\cdot5$, et les facteurs $5$ sont plus rares que les facteurs $2$.",
      es: "Cada cero final es un factor $10=2\\cdot5$, y los factores $5$ escasean más que los $2$.",
      ja: "末尾のゼロ1つは因数 $10=2\\cdot5$。因数 $5$ は因数 $2$ より少ない。",
      zh: "末尾每个零对应一个因子 $10=2\\cdot5$，而因子 $5$ 比因子 $2$ 少。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 5.2, scale: 52, pad: 8 });
      for (let n = 1; n <= 100; n++) { const i = (n - 1) % 10, j = Math.floor((n - 1) / 10), x = 0.1 + i * 0.5, y = 4.6 - j * 0.5;
        const cls = n % 25 === 0 ? 'tri fill-pink' : n % 5 === 0 ? 'tri fill-yellow' : 'tri'; F.rect(x, y, 0.48, 0.48, cls); F.text([x + 0.24, y + 0.24], String(n), 'tick', 0, 0); }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "zeros": {"fr": "zéros", "es": "ceros", "ja": "ゼロ", "zh": "零"}
    },
    options: [
      { tex: "24", correct: true, why: {
        en: "$20$ multiples of $5$ plus $4$ multiples of $25$.",
        fr: "$20$ multiples de $5$ plus $4$ multiples de $25$.",
        es: "$20$ múltiplos de $5$ más $4$ múltiplos de $25$.",
        ja: "$5$ の倍数 $20$ 個と $25$ の倍数 $4$ 個。",
        zh: "$20$ 个 $5$ 的倍数加 $4$ 个 $25$ 的倍数。"
      } },
      { tex: "\\left\\lfloor\\tfrac{100}{5}\\right\\rfloor+\\left\\lfloor\\tfrac{100}{25}\\right\\rfloor", correct: true, why: {
        en: "Legendre’s formula for the exponent of $5$: $20+4$.",
        fr: "Formule de Legendre pour l’exposant de $5$ : $20+4$.",
        es: "Fórmula de Legendre para el exponente de $5$: $20+4$.",
        ja: "$5$ の指数のルジャンドルの公式：$20+4$。",
        zh: "$5$ 的指数的勒让德公式：$20+4$。"
      } },
      { tex: "20", correct: false, why: {
        en: "Forgets that $25, 50, 75, 100$ give two fives each.",
        fr: "Oublie que $25, 50, 75, 100$ donnent chacun deux 5.",
        es: "Olvida que $25, 50, 75, 100$ dan dos cincos cada uno.",
        ja: "$25, 50, 75, 100$ が5を2つずつ含むことを忘れている。",
        zh: "忘了 $25, 50, 75, 100$ 各含两个 5。"
      } },
      { tex: "10", correct: false, why: {
        en: "Counting only multiples of $10$ misses $5, 15, 25,\\dots$",
        fr: "Ne compter que les multiples de $10$ oublie $5, 15, 25,\\dots$",
        es: "Contar solo múltiplos de $10$ olvida $5, 15, 25,\\dots$",
        ja: "$10$ の倍数だけでは $5, 15, 25,\\dots$ を見落とす。",
        zh: "只数 $10$ 的倍数会漏掉 $5, 15, 25,\\dots$"
      } },
      { tex: "11", correct: false, why: {
        en: "Multiples of $10$ plus the extra zero of $100$: still too few.",
        fr: "Multiples de $10$ plus le zéro de plus de $100$ : encore trop peu.",
        es: "Múltiplos de $10$ más el cero extra de $100$: aún muy pocos.",
        ja: "$10$ の倍数と $100$ の余分な0：まだ少ない。",
        zh: "$10$ 的倍数加上 $100$ 多出的一个零：仍然太少。"
      } },
      { tex: "97", correct: false, why: {
        en: "That is the exponent of $2$ in $100!$, the larger one.",
        fr: "C’est l’exposant de $2$ dans $100!$, le plus grand.",
        es: "Es el exponente de $2$ en $100!$, el mayor.",
        ja: "それは $100!$ の中の $2$ の指数（多い方）。",
        zh: "那是 $100!$ 中 $2$ 的指数（较大的那个）。"
      } },
      { tex: "25", correct: false, why: {
        en: "Would need a factor $125$, which is above $100$.",
        fr: "Il faudrait un facteur $125$, qui dépasse $100$.",
        es: "Haría falta un factor $125$, que pasa de $100$.",
        ja: "$100$ を超える $125$ が必要になる。",
        zh: "需要因子 $125$，它超过 $100$。"
      } },
      { tex: "22", correct: false, why: {
        en: "Not what the count of fives gives.",
        fr: "Ce n’est pas ce que donne le décompte des 5.",
        es: "No es lo que da el recuento de cincos.",
        ja: "5 の個数の数え上げと合わない。",
        zh: "与因子 5 的计数不符。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Zeros come from 2 · 5",
          fr: "Les zéros viennent de 2 · 5",
          es: "Los ceros vienen de 2 · 5",
          ja: "ゼロは 2 · 5 から",
          zh: "零来自 2 · 5"
        },
        lines: ["\\#\\text{zeros}=\\min(v_2(100!),\\,v_5(100!))=v_5(100!)"],
        note: {
          en: "There are many more even numbers than multiples of $5$, so the fives decide.",
          fr: "Il y a bien plus de nombres pairs que de multiples de $5$ : ce sont les 5 qui décident.",
          es: "Hay muchos más pares que múltiplos de $5$: deciden los cincos.",
          ja: "偶数は $5$ の倍数よりずっと多いので、5 の個数で決まる。",
          zh: "偶数远多于 $5$ 的倍数，所以由因子 5 决定。"
        }
      },
      {
        title: {
          en: "Count the fives",
          fr: "Compter les 5",
          es: "Contar los cincos",
          ja: "5 を数える",
          zh: "数因子 5"
        },
        lines: ["v_5(100!)=\\left\\lfloor\\tfrac{100}{5}\\right\\rfloor+\\left\\lfloor\\tfrac{100}{25}\\right\\rfloor=20+4=\\boxed{24}"],
        note: {
          en: "Each multiple of $25$ contributes a second five.",
          fr: "Chaque multiple de $25$ apporte un deuxième 5.",
          es: "Cada múltiplo de $25$ aporta un segundo cinco.",
          ja: "$25$ の倍数はそれぞれ2つ目の5を加える。",
          zh: "每个 $25$ 的倍数再贡献一个 5。"
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
          en: "Two options are the same count.",
          fr: "Deux options sont le même décompte.",
          es: "Dos opciones son el mismo recuento.",
          ja: "2つの選択肢は同じ個数です。",
          zh: "有两个选项是同一个计数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
