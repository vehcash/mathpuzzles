/* number · Counting the divisors of 360
   Number of divisors from the prime factorisation: (a + 1)(b + 1)(c + 1). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const ROW = [1, 2, 4, 8], COL = [1, 3, 9, 5, 15, 45];

  PuzzleBank.define({
    id: "nt-divisors-360",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["amc", "kyotsu"]
    },
    difficulty: 1,
    title: {
      en: "Counting the divisors of 360",
      fr: "Compter les diviseurs de 360",
      es: "Contar los divisores de 360",
      ja: "360 の約数を数える",
      zh: "数 360 的因数"
    },
    statement: {
      en: "<b>Which of the following equal the number of positive divisors of $360$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de diviseurs positifs de $360$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al número de divisores positivos de $360$?</b>",
      ja: "<b>次のうち $360$ の正の約数の個数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $360$ 的正因数个数？</b>"
    },
    figureText: {
      en: "A multiplication table with the divisors 1, 2, 4, 8 of 8 down the side and the divisors of 45 across the top. The cells are filled in during the solution.",
      fr: "Une table avec les diviseurs 1, 2, 4, 8 de 8 en ligne et ceux de 45 en colonne. Les cases sont remplies dans la solution.",
      es: "Una tabla con los divisores 1, 2, 4, 8 de 8 en filas y los de 45 en columnas. Las casillas se rellenan en la solución.",
      ja: "縦に 8 の約数 1, 2, 4, 8、横に 45 の約数を並べた表。マスは解答で埋めます。",
      zh: "表格竖列为 8 的约数 1、2、4、8，横行为 45 的约数。格子在解答中填写。"
    },
    hint: {
      en: "$360 = 2^3\\cdot3^2\\cdot5$. A divisor picks an exponent for each prime.",
      fr: "$360 = 2^3\\cdot3^2\\cdot5$. Un diviseur choisit un exposant pour chaque premier.",
      es: "$360 = 2^3\\cdot3^2\\cdot5$. Un divisor elige un exponente para cada primo.",
      ja: "$360 = 2^3\\cdot3^2\\cdot5$。約数は各素数の指数を選ぶことで決まります。",
      zh: "$360 = 2^3\\cdot3^2\\cdot5$。每个因数由各质数的指数选择决定。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example listing divisor pairs d · (360/d)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en listant les paires de diviseurs d · (360/d)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo enumerando parejas de divisores d · (360/d)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば約数の組 d · (360/d) を書き出す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如列出因数对 d · (360/d)），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.2, scale: 52, pad: 14 });
      COL.forEach((c, j) => F.text([1.3 + j * 0.85, 2.95], String(c), 'tick', 0, 0));
      ROW.forEach((r, i) => F.text([0.35, 2.45 - i * 0.6], String(r), 'tick', 0, 0));
      F.reveal = () => {
        ROW.forEach((r, i) => { F.text([0.35, 2.45 - i * 0.6], String(r), 'tick', 0, 0); COL.forEach((c, j) => { F.rect(0.9 + j * 0.85, 2.15 - i * 0.6, 0.8, 0.56, 'fill-blue', 'fills'); F.text([1.3 + j * 0.85, 2.43 - i * 0.6], String(r * c), 'cellnum', 0, 1); }); });
      };
      return F;
    },
    options: [
      { tex: "24", correct: true, why: {
        en: "$(3 + 1)(2 + 1)(1 + 1)$.",
        fr: "$(3 + 1)(2 + 1)(1 + 1)$.",
        es: "$(3 + 1)(2 + 1)(1 + 1)$.",
        ja: "$(3 + 1)(2 + 1)(1 + 1)$.",
        zh: "$(3 + 1)(2 + 1)(1 + 1)$."
      } },
      { tex: "(3 + 1)(2 + 1)(1 + 1)", correct: true, why: {
        en: "One more than each exponent, multiplied.",
        fr: "Chaque exposant plus un, multipliés.",
        es: "Cada exponente más uno, multiplicados.",
        ja: "各指数に 1 を足して掛けたもの。",
        zh: "每个指数加一后相乘。"
      } },
      { tex: "6", correct: false, why: {
        en: "$3\\cdot2\\cdot1$: forgets the exponent $0$ choice.",
        fr: "$3\\cdot2\\cdot1$ : oublie le choix de l’exposant $0$.",
        es: "$3\\cdot2\\cdot1$: olvida la opción de exponente $0$.",
        ja: "$3\\cdot2\\cdot1$：指数 $0$ を選ぶ場合を忘れています。",
        zh: "$3\\cdot2\\cdot1$：漏了指数取 $0$ 的情况。"
      } },
      { tex: "12", correct: false, why: {
        en: "Half: counts only divisor pairs $d \\le \\sqrt{360}$.",
        fr: "La moitié : ne compte que les paires avec $d \\le \\sqrt{360}$.",
        es: "La mitad: solo cuenta parejas con $d \\le \\sqrt{360}$.",
        ja: "半分：$d \\le \\sqrt{360}$ の組だけを数えています。",
        zh: "一半：只数了 $d \\le \\sqrt{360}$ 的因数对。"
      } },
      { tex: "9", correct: false, why: {
        en: "$(3 + 1) + (2 + 1) + (1 + 1)$: added instead of multiplied.",
        fr: "Additionne au lieu de multiplier.",
        es: "Suma en lugar de multiplicar.",
        ja: "掛けずに足しています。",
        zh: "相加而不是相乘。"
      } },
      { tex: "3", correct: false, why: {
        en: "Only the number of distinct primes.",
        fr: "Seulement le nombre de premiers distincts.",
        es: "Solo el número de primos distintos.",
        ja: "異なる素数の個数だけです。",
        zh: "只是不同质数的个数。"
      } },
      { tex: "22", correct: false, why: {
        en: "Leaves out $1$ and $360$ themselves.",
        fr: "Oublie $1$ et $360$ eux-mêmes.",
        es: "Deja fuera $1$ y $360$.",
        ja: "$1$ と $360$ 自身を数えていません。",
        zh: "漏了 $1$ 和 $360$ 本身。"
      } },
      { tex: "360", correct: false, why: {
        en: "The number itself, not how many divisors it has.",
        fr: "Le nombre lui-même, pas son nombre de diviseurs.",
        es: "El número mismo, no cuántos divisores tiene.",
        ja: "数そのもので、約数の個数ではありません。",
        zh: "那是这个数本身，不是因数个数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Prime factorisation",
          fr: "Décomposition en facteurs premiers",
          es: "Factorización prima",
          ja: "素因数分解",
          zh: "质因数分解"
        },
        lines: ["360 = 2^3\\cdot3^2\\cdot5"],
        note: {
          en: "Every divisor is $2^a3^b5^c$ with $0 \\le a \\le 3$, $0 \\le b \\le 2$, $0 \\le c \\le 1$.",
          fr: "Tout diviseur s’écrit $2^a3^b5^c$ avec $0 \\le a \\le 3$, $0 \\le b \\le 2$, $0 \\le c \\le 1$.",
          es: "Todo divisor es $2^a3^b5^c$ con $0 \\le a \\le 3$, $0 \\le b \\le 2$, $0 \\le c \\le 1$.",
          ja: "約数は $2^a3^b5^c$（$0 \\le a \\le 3$、$0 \\le b \\le 2$、$0 \\le c \\le 1$）。",
          zh: "每个因数都是 $2^a3^b5^c$，$0 \\le a \\le 3$，$0 \\le b \\le 2$，$0 \\le c \\le 1$。"
        }
      },
      {
        title: {
          en: "Multiply the choices",
          fr: "Multiplier les choix",
          es: "Multiplicar las opciones",
          ja: "選び方を掛ける",
          zh: "选择数相乘"
        },
        lines: ["4\\cdot3\\cdot2 = \\boxed{24}"],
        note: {
          en: "The table shows them all: $4$ rows times $6$ columns.",
          fr: "Le tableau les montre tous : $4$ lignes fois $6$ colonnes.",
          es: "La tabla los muestra todos: $4$ filas por $6$ columnas.",
          ja: "表にすべて現れています：4行 × 6列。",
          zh: "表格列出了全部：$4$ 行乘 $6$ 列。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.fadeIn(F.rect(0.88, 0.32, 5.14, 2.42, 'fill-yellow', 'over'), 500); }
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
