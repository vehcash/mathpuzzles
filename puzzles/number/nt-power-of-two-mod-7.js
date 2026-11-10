/* number · A huge power of two
   2³ ≡ 1 (mod 7), so powers of 2 repeat with period 3. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const C = [2, 1.6], R = 1.1, ang = [90, -30, 210], VAL = ['2', '4', '1'];
  const P = d => [C[0] + R * Math.cos(d * Math.PI / 180), C[1] + R * Math.sin(d * Math.PI / 180)];

  PuzzleBank.define({
    id: "nt-power-of-two-mod-7",
    category: "number",
    difficulty: 2,
    title: {
      en: "A huge power of two",
      fr: "Une énorme puissance de deux",
      es: "Una potencia de dos enorme",
      ja: "巨大な2のべき",
      zh: "巨大的 2 的幂"
    },
    statement: {
      en: "<b>What is the remainder when $2^{100}$ is divided by $7$?</b>",
      fr: "<b>Quel est le reste de la division de $2^{100}$ par $7$ ?</b>",
      es: "<b>¿Cuál es el resto de dividir $2^{100}$ entre $7$?</b>",
      ja: "<b>$2^{100}$ を $7$ で割った余りはいくらですか？</b>",
      zh: "<b>$2^{100}$ 除以 $7$ 的余数是多少？</b>"
    },
    figureText: {
      en: "A cycle of the remainders of powers of 2 modulo 7: 2 → 4 → 1 → 2 …, repeating every three steps.",
      fr: "Un cycle des restes des puissances de 2 modulo 7 : 2 → 4 → 1 → 2 …, qui se répète tous les trois pas.",
      es: "Un ciclo de los restos de las potencias de 2 módulo 7: 2 → 4 → 1 → 2 …, que se repite cada tres pasos.",
      ja: "2 のべきを 7 で割った余りの周期：2 → 4 → 1 → 2 …、3つごとに繰り返します。",
      zh: "2 的幂模 7 的余数循环：2 → 4 → 1 → 2 ……，每三步重复一次。"
    },
    hint: {
      en: "$2^3 = 8 \\equiv 1 \\pmod 7$.",
      fr: "$2^3 = 8 \\equiv 1 \\pmod 7$.",
      es: "$2^3 = 8 \\equiv 1 \\pmod 7$.",
      ja: "$2^3 = 8 \\equiv 1 \\pmod 7$.",
      zh: "$2^3 = 8 \\equiv 1 \\pmod 7$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example Fermat’s little theorem 2⁶ ≡ 1 (mod 7)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple le petit théorème de Fermat 2⁶ ≡ 1 (mod 7)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo el pequeño teorema de Fermat 2⁶ ≡ 1 (mod 7)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えばフェルマーの小定理 2⁶ ≡ 1 (mod 7) を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如费马小定理 2⁶ ≡ 1 (mod 7)），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4, h: 3.3, scale: 64, pad: 16 });
      F.arrowDefs();
      ang.forEach((a, k) => { F.circle(P(a), 0.32, 'tri'); F.text(P(a), VAL[k], 'nodenum', 0, 1); const a1 = a - 25, a2 = ang[(k + 1) % 3] + 25; const arc = F.arc(C, R, a1, a2 < a1 ? a2 : a2 - 360, 'dashc', 'marks'); arc.setAttribute('marker-end', 'url(#arrowhead)'); });
      F.text(C, '×2', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$100 = 3\\cdot33 + 1$, so $2^{100} = (2^3)^{33}\\cdot2 \\equiv 2$.",
        fr: "$100 = 3\\cdot33 + 1$, so $2^{100} = (2^3)^{33}\\cdot2 \\equiv 2$.",
        es: "$100 = 3\\cdot33 + 1$, so $2^{100} = (2^3)^{33}\\cdot2 \\equiv 2$.",
        ja: "$100 = 3\\cdot33 + 1$, so $2^{100} = (2^3)^{33}\\cdot2 \\equiv 2$.",
        zh: "$100 = 3\\cdot33 + 1$, so $2^{100} = (2^3)^{33}\\cdot2 \\equiv 2$."
      } },
      { tex: "1", correct: false, why: {
        en: "That would need $3 \\mid 100$; $2^{99} \\equiv 1$.",
        fr: "Il faudrait $3 \\mid 100$ ; c’est $2^{99}$ qui donne $1$.",
        es: "Haría falta $3 \\mid 100$; es $2^{99}$ el que da $1$.",
        ja: "$3 \\mid 100$ が必要です。余り $1$ になるのは $2^{99}$。",
        zh: "需要 $3 \\mid 100$；余数为 $1$ 的是 $2^{99}$。"
      } },
      { tex: "4", correct: false, why: {
        en: "That is $2^{101}$ (or $2^2$): one step too far.",
        fr: "C’est $2^{101}$ (ou $2^2$) : un pas de trop.",
        es: "Es $2^{101}$ (o $2^2$): un paso de más.",
        ja: "それは $2^{101}$（または $2^2$）：1つ進みすぎです。",
        zh: "那是 $2^{101}$（或 $2^2$）：多走了一步。"
      } },
      { tex: "0", correct: false, why: {
        en: "$7$ is prime and does not divide any power of $2$.",
        fr: "$7$ est premier et ne divise aucune puissance de $2$.",
        es: "$7$ es primo y no divide ninguna potencia de $2$.",
        ja: "$7$ は素数で、$2$ のべきを割り切りません。",
        zh: "$7$ 是质数，不整除任何 $2$ 的幂。"
      } },
      { tex: "3", correct: false, why: {
        en: "$3$ never appears: powers of $2$ mod $7$ are only $1$, $2$, $4$.",
        fr: "$3$ n’apparaît jamais : seulement $1$, $2$, $4$.",
        es: "$3$ nunca aparece: solo $1$, $2$, $4$.",
        ja: "$3$ は現れません：余りは $1$、$2$、$4$ だけ。",
        zh: "$3$ 从不出现：只有 $1$、$2$、$4$。"
      } },
      { tex: "5", correct: false, why: {
        en: "Not in the cycle $2, 4, 1$.",
        fr: "Pas dans le cycle $2, 4, 1$.",
        es: "No está en el ciclo $2, 4, 1$.",
        ja: "周期 $2, 4, 1$ にありません。",
        zh: "不在循环 $2, 4, 1$ 中。"
      } },
      { tex: "6", correct: false, why: {
        en: "$100 \\bmod 7 = 2$… but $6 \\equiv -1$ never appears either.",
        fr: "$6 \\equiv -1$ n’apparaît jamais non plus.",
        es: "$6 \\equiv -1$ tampoco aparece nunca.",
        ja: "$6 \\equiv -1$ も現れません。",
        zh: "$6 \\equiv -1$ 也不会出现。"
      } },
      { tex: "16", correct: false, why: {
        en: "$2^4$ is not reduced: a remainder must be less than $7$.",
        fr: "$2^4$ non réduit : un reste est inférieur à $7$.",
        es: "$2^4$ sin reducir: un resto es menor que $7$.",
        ja: "$2^4$ のままです：余りは $7$ 未満です。",
        zh: "$2^4$ 没有约化：余数必须小于 $7$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find the cycle",
          fr: "Trouver le cycle",
          es: "Hallar el ciclo",
          ja: "周期を見つける",
          zh: "找出循环"
        },
        lines: ["2^1 \\equiv 2,\\quad 2^2 \\equiv 4,\\quad 2^3 = 8 \\equiv 1 \\pmod 7"],
        note: {
          en: "After $2^3$ the remainders repeat.",
          fr: "Après $2^3$, les restes se répètent.",
          es: "Tras $2^3$ los restos se repiten.",
          ja: "$2^3$ の後、余りは繰り返します。",
          zh: "$2^3$ 之后余数重复。"
        }
      },
      {
        title: {
          en: "Reduce the exponent mod 3",
          fr: "Réduire l’exposant modulo 3",
          es: "Reducir el exponente módulo 3",
          ja: "指数を 3 で割る",
          zh: "指数模 3"
        },
        lines: ["100 = 3\\cdot33 + 1", "2^{100} = (2^3)^{33}\\cdot 2 \\equiv 1^{33}\\cdot2 = \\boxed{2} \\pmod 7"],
        note: {
          en: "Try it in the calculator: <code>2^100 mod 7</code>.",
          fr: "Essayez dans la calculatrice : <code>2^100 mod 7</code>.",
          es: "Pruébalo en la calculadora: <code>2^100 mod 7</code>.",
          ja: "電卓で <code>2^100 mod 7</code> を試してみましょう。",
          zh: "可以在计算器中试试：<code>2^100 mod 7</code>。"
        },
        fig(F) { F.fadeIn(F.circle(P(ang[0]), 0.42, 'halo', 'over'), 500); }
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
