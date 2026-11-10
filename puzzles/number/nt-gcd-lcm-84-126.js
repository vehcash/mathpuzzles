/* number · Common factors
   gcd and lcm from prime factorisations: lowest and highest powers. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-gcd-lcm-84-126",
    category: "number",
    difficulty: 1,
    title: {
      en: "Common factors",
      fr: "Facteurs communs",
      es: "Factores comunes",
      ja: "共通の因数",
      zh: "公因数"
    },
    statement: {
      en: "<b>Which of the following are true for $84$ and $126$?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies pour $84$ et $126$ ?</b>",
      es: "<b>¿Cuáles de las siguientes son verdaderas para $84$ y $126$?</b>",
      ja: "<b>$84$ と $126$ について、次のうち正しいものはどれですか？</b>",
      zh: "<b>关于 $84$ 和 $126$，下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The prime factorisations 84 = 2 · 2 · 3 · 7 and 126 = 2 · 3 · 3 · 7 written in two rows, with the shared factors 2, 3 and 7 lined up.",
      fr: "Les décompositions 84 = 2 · 2 · 3 · 7 et 126 = 2 · 3 · 3 · 7 sur deux lignes, les facteurs communs 2, 3 et 7 alignés.",
      es: "Las factorizaciones 84 = 2 · 2 · 3 · 7 y 126 = 2 · 3 · 3 · 7 en dos filas, con los factores comunes 2, 3 y 7 alineados.",
      ja: "素因数分解 84 = 2 · 2 · 3 · 7 と 126 = 2 · 3 · 3 · 7 を2段に書き、共通の 2、3、7 をそろえています。",
      zh: "质因数分解 84 = 2 · 2 · 3 · 7 和 126 = 2 · 3 · 3 · 7 写成两行，公共因数 2、3、7 对齐。"
    },
    hint: {
      en: "$84 = 2^2\\cdot3\\cdot7$ and $126 = 2\\cdot3^2\\cdot7$.",
      fr: "$84 = 2^2\\cdot3\\cdot7$ and $126 = 2\\cdot3^2\\cdot7$.",
      es: "$84 = 2^2\\cdot3\\cdot7$ and $126 = 2\\cdot3^2\\cdot7$.",
      ja: "$84 = 2^2\\cdot3\\cdot7$ and $126 = 2\\cdot3^2\\cdot7$.",
      zh: "$84 = 2^2\\cdot3\\cdot7$ and $126 = 2\\cdot3^2\\cdot7$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the Euclidean algorithm and gcd · lcm = 84 · 126), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple l’algorithme d’Euclide et pgcd · ppcm = 84 · 126), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo el algoritmo de Euclides y mcd · mcm = 84 · 126), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えばユークリッドの互除法と 最大公約数 · 最小公倍数 = 84 · 126）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如辗转相除法以及 最大公约数 · 最小公倍数 = 84 · 126），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 2.4, scale: 50, pad: 16 });
      F.text([0.6, 1.8], '84 =', 'mx', 0, 1); F.text([0.6, 0.6], '126 =', 'mx', 0, 1);
      const A = ['2', '2', '3', '', '7'], B = ['2', '', '3', '3', '7'];
      A.forEach((v, k) => v && F.text([1.8 + k * 0.9, 1.8], v, 'mx', 0, 1)); B.forEach((v, k) => v && F.text([1.8 + k * 0.9, 0.6], v, 'mx', 0, 1));
      F.cols = [0, 2, 4].map(k => F.rect(1.45 + k * 0.9, 0.2, 0.7, 2.0, 'fill-yellow', 'fills'));
      return F;
    },
    options: [
      { tex: "\\gcd(84, 126) = 42", correct: true, why: {
        en: "$2\\cdot3\\cdot7$: the lowest powers.",
        fr: "$2\\cdot3\\cdot7$ : les plus petites puissances.",
        es: "$2\\cdot3\\cdot7$: las potencias menores.",
        ja: "$2\\cdot3\\cdot7$：低い方の指数。",
        zh: "$2\\cdot3\\cdot7$：取较低次幂。"
      } },
      { tex: "\\operatorname{lcm}(84, 126) = 252", correct: true, why: {
        en: "$2^2\\cdot3^2\\cdot7$: the highest powers.",
        fr: "$2^2\\cdot3^2\\cdot7$ : les plus grandes puissances.",
        es: "$2^2\\cdot3^2\\cdot7$: las potencias mayores.",
        ja: "$2^2\\cdot3^2\\cdot7$：高い方の指数。",
        zh: "$2^2\\cdot3^2\\cdot7$：取较高次幂。"
      } },
      { tex: "\\gcd(84, 126) = 21", correct: false, why: {
        en: "Misses the common factor $2$.",
        fr: "Oublie le facteur commun $2$.",
        es: "Olvida el factor común $2$.",
        ja: "共通の因数 $2$ を落としています。",
        zh: "漏了公因数 $2$。"
      } },
      { tex: "\\gcd(84, 126) = 14", correct: false, why: {
        en: "Misses the common factor $3$.",
        fr: "Oublie le facteur commun $3$.",
        es: "Olvida el factor común $3$.",
        ja: "共通の因数 $3$ を落としています。",
        zh: "漏了公因数 $3$。"
      } },
      { tex: "\\operatorname{lcm}(84, 126) = 10584", correct: false, why: {
        en: "That is $84\\cdot126$; it is $\\gcd\\cdot\\operatorname{lcm}$.",
        fr: "C’est $84\\cdot126$, c’est-à-dire pgcd × ppcm.",
        es: "Es $84\\cdot126$, es decir mcd × mcm.",
        ja: "それは $84\\cdot126$、つまり 最大公約数 × 最小公倍数 です。",
        zh: "那是 $84\\cdot126$，即最大公约数 × 最小公倍数。"
      } },
      { tex: "\\operatorname{lcm}(84, 126) = 504", correct: false, why: {
        en: "Takes $2^3$; the highest power of $2$ is $2^2$.",
        fr: "Prend $2^3$ ; la plus grande puissance de $2$ est $2^2$.",
        es: "Toma $2^3$; la mayor potencia de $2$ es $2^2$.",
        ja: "$2^3$ にしています。$2$ の最高指数は $2^2$。",
        zh: "取了 $2^3$；$2$ 的最高次幂是 $2^2$。"
      } },
      { tex: "\\operatorname{lcm}(84, 126) = 126", correct: false, why: {
        en: "$84$ does not divide $126$.",
        fr: "$84$ ne divise pas $126$.",
        es: "$84$ no divide a $126$.",
        ja: "$84$ は $126$ を割り切りません。",
        zh: "$84$ 不整除 $126$。"
      } },
      { tex: "\\gcd(84, 126) = 6", correct: false, why: {
        en: "Misses the common factor $7$.",
        fr: "Oublie le facteur commun $7$.",
        es: "Olvida el factor común $7$.",
        ja: "共通の因数 $7$ を落としています。",
        zh: "漏了公因数 $7$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor into primes",
          fr: "Décomposer en facteurs premiers",
          es: "Factorizar en primos",
          ja: "素因数分解する",
          zh: "分解质因数"
        },
        lines: ["84 = 2^2\\cdot3\\cdot7, \\qquad 126 = 2\\cdot3^2\\cdot7"],
        note: {
          en: "Shared primes: $2$, $3$, $7$.",
          fr: "Premiers communs : $2$, $3$, $7$.",
          es: "Primos comunes: $2$, $3$, $7$.",
          ja: "共通の素数：$2$、$3$、$7$。",
          zh: "公共质数：$2$、$3$、$7$。"
        },
        fig(F) { F.cols.forEach((c, k) => F.fadeIn(c, 400, 150 * k)); }
      },
      {
        title: {
          en: "Lowest and highest powers",
          fr: "Plus petites et plus grandes puissances",
          es: "Potencias menores y mayores",
          ja: "低い指数と高い指数",
          zh: "最低与最高次幂"
        },
        lines: ["\\gcd = 2\\cdot3\\cdot7 = \\boxed{42}, \\qquad \\operatorname{lcm} = 2^2\\cdot3^2\\cdot7 = \\boxed{252}", "42\\cdot252 = 84\\cdot126 = 10584\\ \\checkmark"],
        note: {
          en: "Euclid: $126 = 84 + 42$, $84 = 2\\cdot42$, so the gcd is $42$.",
          fr: "Euclide : $126 = 84 + 42$, $84 = 2\\cdot42$, donc le pgcd vaut $42$.",
          es: "Euclides: $126 = 84 + 42$, $84 = 2\\cdot42$, así que el mcd es $42$.",
          ja: "互除法：$126 = 84 + 42$、$84 = 2\\cdot42$ なので最大公約数は $42$。",
          zh: "辗转相除：$126 = 84 + 42$，$84 = 2\\cdot42$，所以最大公约数是 $42$。"
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
