/* number · A square times a cube
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2019-square-times-cube",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1B",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1B",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1B",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1B",
        zh: "牛津大学数学入学考试 MAT 2019 第 1B 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "A square times a cube",
      fr: "Un carré fois un cube",
      es: "Un cuadrado por un cubo",
      ja: "平方数 × 立方数",
      zh: "平方数乘立方数"
    },
    statement: {
      en: "Let $s$ be a perfect square and $c$ a perfect cube, both positive integers, and $N=s\\cdot c$. <b>Which of the following are true?</b>",
      fr: "Soit $s$ un carré parfait et $c$ un cube parfait, entiers positifs, et $N=s\\cdot c$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $s$ un cuadrado perfecto y $c$ un cubo perfecto, enteros positivos, y $N=s\\cdot c$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$s$ を平方数、$c$ を立方数（いずれも正の整数）とし、$N=s\\cdot c$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $s$ 为完全平方数、$c$ 为完全立方数（都是正整数），$N=s\\cdot c$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Prime-exponent bars: a square has even exponents, a cube has exponents divisible by 3; adding them can give anything.",
      fr: "Barres d’exposants premiers : un carré a des exposants pairs, un cube des exposants multiples de 3 ; leur somme peut être n’importe quoi.",
      es: "Barras de exponentes primos: un cuadrado tiene exponentes pares, un cubo múltiplos de 3; su suma puede ser cualquier cosa.",
      ja: "素因数の指数の棒グラフ。平方数は偶数、立方数は 3 の倍数。足すと何にでもなる。",
      zh: "质因数指数条形图：平方数指数为偶数，立方数指数为 3 的倍数；相加后可以是任何情形。"
    },
    hint: {
      en: "Think in prime exponents: try $s=4$, $c=8$, and then $s=c=1$.",
      fr: "Pensez en exposants premiers : essayez $s=4$, $c=8$, puis $s=c=1$.",
      es: "Piensa en exponentes primos: prueba $s=4$, $c=8$ y luego $s=c=1$.",
      ja: "素因数の指数で考える。$s=4$, $c=8$、次に $s=c=1$ を試す。",
      zh: "从质因数指数考虑：试 $s=4$、$c=8$，再试 $s=c=1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 2.6, scale: 50, pad: 14 });
      [['4 = 2²', 2, 'fill-yellow'], ['8 = 2³', 3, 'fill-blue'], ['32 = 2⁵', 5, 'fill-pink']].forEach(([t, k, c], i) => {
        const x = 0.4 + i * 1.8; for (let j = 0; j < k; j++) F.rect(x + j * 0.26, 1.0, 0.22, 0.6, c, 'fills');
        F.text([x + 0.6, 0.55], t, 'len small', 0, 0); });
      F.text([2.2, 1.3], '×', 'pt', 0, 0); F.text([3.95, 1.3], '=', 'pt', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "can be neither a square nor a cube": {"fr": "peut n’être ni un carré ni un cube", "es": "puede no ser ni cuadrado ni cubo", "ja": "は平方数でも立方数でもないことがある", "zh": "可以既不是平方数也不是立方数"},
      "can be both a square and a cube": {"fr": "peut être à la fois un carré et un cube", "es": "puede ser a la vez cuadrado y cubo", "ja": "は平方数かつ立方数のことがある", "zh": "可以既是平方数又是立方数"},
      "is always a square": {"fr": "est toujours un carré", "es": "es siempre un cuadrado", "ja": "は常に平方数", "zh": "总是平方数"},
      "is always a cube": {"fr": "est toujours un cube", "es": "es siempre un cubo", "ja": "は常に立方数", "zh": "总是立方数"},
      "is never a square": {"fr": "n’est jamais un carré", "es": "nunca es un cuadrado", "ja": "は決して平方数でない", "zh": "从不是平方数"},
      "is never a cube": {"fr": "n’est jamais un cube", "es": "nunca es un cubo", "ja": "は決して立方数でない", "zh": "从不是立方数"},
      "is always a sixth power": {"fr": "est toujours une puissance sixième", "es": "es siempre una potencia sexta", "ja": "は常に6乗数", "zh": "总是六次方数"},
      "is a square only when": {"fr": "est un carré seulement si", "es": "es un cuadrado solo si", "ja": "が平方数になるのは次のときだけ：", "zh": "仅当下列情形为平方数："}
    },
    options: [
      { tex: "N \\text{ can be neither a square nor a cube}", correct: true, why: {
        en: "$4\\cdot8=32=2^5$.",
        fr: "$4\\cdot8=32=2^5$.",
        es: "$4\\cdot8=32=2^5$.",
        ja: "$4\\cdot8=32=2^5$.",
        zh: "$4\\cdot8=32=2^5$."
      } },
      { tex: "N \\text{ can be both a square and a cube}", correct: true, why: {
        en: "$1\\cdot1=1$, or $64\\cdot64=2^{12}$.",
        fr: "$1\\cdot1=1$, or $64\\cdot64=2^{12}$.",
        es: "$1\\cdot1=1$, or $64\\cdot64=2^{12}$.",
        ja: "$1\\cdot1=1$, or $64\\cdot64=2^{12}$.",
        zh: "$1\\cdot1=1$, or $64\\cdot64=2^{12}$."
      } },
      { tex: "N \\text{ is always a square}", correct: false, why: {
        en: "$1\\cdot8=8$.",
        fr: "$1\\cdot8=8$.",
        es: "$1\\cdot8=8$.",
        ja: "$1\\cdot8=8$.",
        zh: "$1\\cdot8=8$."
      } },
      { tex: "N \\text{ is always a cube}", correct: false, why: {
        en: "$4\\cdot1=4$.",
        fr: "$4\\cdot1=4$.",
        es: "$4\\cdot1=4$.",
        ja: "$4\\cdot1=4$.",
        zh: "$4\\cdot1=4$."
      } },
      { tex: "N \\text{ is never a square}", correct: false, why: {
        en: "$4\\cdot1=4$.",
        fr: "$4\\cdot1=4$.",
        es: "$4\\cdot1=4$.",
        ja: "$4\\cdot1=4$.",
        zh: "$4\\cdot1=4$."
      } },
      { tex: "N \\text{ is never a cube}", correct: false, why: {
        en: "$1\\cdot8=8$.",
        fr: "$1\\cdot8=8$.",
        es: "$1\\cdot8=8$.",
        ja: "$1\\cdot8=8$.",
        zh: "$1\\cdot8=8$."
      } },
      { tex: "N \\text{ is always a sixth power}", correct: false, why: {
        en: "$32$ is not.",
        fr: "$32$ is not.",
        es: "$32$ is not.",
        ja: "$32$ is not.",
        zh: "$32$ is not."
      } },
      { tex: "N \\text{ is a square only when } c=1", correct: false, why: {
        en: "$4\\cdot64=256=16^2$ with $c=64$.",
        fr: "$4\\cdot64=256=16^2$ with $c=64$.",
        es: "$4\\cdot64=256=16^2$ with $c=64$.",
        ja: "$4\\cdot64=256=16^2$ with $c=64$.",
        zh: "$4\\cdot64=256=16^2$ with $c=64$."
      } }
    ],
    steps: [
      {
        title: {
          en: "A counterexample to “always”",
          fr: "Un contre-exemple à « toujours »",
          es: "Un contraejemplo a «siempre»",
          ja: "「常に」の反例",
          zh: "“总是”的反例"
        },
        lines: ["s=4,\\ c=8:\\quad N=32=2^5"],
        note: {
          en: "$5$ is neither even nor a multiple of $3$.",
          fr: "$5$ n’est ni pair ni multiple de $3$.",
          es: "$5$ no es par ni múltiplo de $3$.",
          ja: "$5$ は偶数でも 3 の倍数でもない。",
          zh: "$5$ 既非偶数也非 3 的倍数。"
        }
      },
      {
        title: {
          en: "A counterexample to “never”",
          fr: "Un contre-exemple à « jamais »",
          es: "Un contraejemplo a «nunca»",
          ja: "「決して」の反例",
          zh: "“从不”的反例"
        },
        lines: ["s=c=1:\\ N=1=1^2=1^3;\\qquad s=4,\\ c=1:\\ N=4"],
        note: {
          en: "So the answer is “sometimes”: it can be a square, a cube, both, or neither.",
          fr: "La réponse est « parfois » : carré, cube, les deux ou aucun.",
          es: "La respuesta es «a veces»: cuadrado, cubo, ambos o ninguno.",
          ja: "答えは「場合による」：平方・立方・両方・どちらでもない、いずれもある。",
          zh: "答案是“有时”：可为平方、立方、两者或都不是。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
