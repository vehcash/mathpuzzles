/* number · 16m has 231 divisors
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-ita-2025-sixteen-m-has-231-divisors",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 12",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 12",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 12",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第12問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 12 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "16m has 231 divisors",
      fr: "16m a 231 diviseurs",
      es: "16m tiene 231 divisores",
      ja: "16m の約数は231個",
      zh: "16m 有 231 个约数"
    },
    statement: {
      en: "A positive integer $m$ is such that $16m$ has exactly $231$ positive divisors. <b>Which of the following are true?</b>",
      fr: "Un entier $m>0$ est tel que $16m$ a exactement $231$ diviseurs positifs. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un entero positivo $m$ cumple que $16m$ tiene exactamente $231$ divisores positivos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "正の整数 $m$ について、$16m$ の正の約数はちょうど $231$ 個です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "正整数 $m$ 使 $16m$ 恰有 $231$ 个正约数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The factorisation 231 = 3 · 7 · 11.",
      fr: "La factorisation 231 = 3 · 7 · 11.",
      es: "La factorización 231 = 3 · 7 · 11.",
      ja: "231 = 3 · 7 · 11 の分解。",
      zh: "分解 231 = 3 · 7 · 11。"
    },
    hint: {
      en: "If $16m=\\prod p_i^{e_i}$ then $\\prod(e_i+1)=231$, which is odd. What does that say about every $e_i$?",
      fr: "Si $16m=\\prod p_i^{e_i}$ alors $\\prod(e_i+1)=231$, qui est impair. Qu’en déduire sur chaque $e_i$ ?",
      es: "Si $16m=\\prod p_i^{e_i}$ entonces $\\prod(e_i+1)=231$, impar. ¿Qué dice eso de cada $e_i$?",
      ja: "$16m=\\prod p_i^{e_i}$ なら $\\prod(e_i+1)=231$（奇数）。各 $e_i$ について何が言える？",
      zh: "若 $16m=\\prod p_i^{e_i}$，则 $\\prod(e_i+1)=231$ 为奇数，各 $e_i$ 有何性质？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.6, scale: 50, pad: 16 });
      F.text([1.0, 0.8], '231 =', 'pt', 0, 0); ['3', '7', '11'].forEach((t, k) => { F.circle([2.2 + k * 1.1, 0.8], 0.38, 'fill-blue'); F.text([2.2 + k * 1.1, 0.8], t, 'pt', 0, 0); });
      F.reveal = () => {
      F.text([3.3, 0.05], 'eᵢ + 1 odd ⇒ eᵢ even', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "231 =": {"fr": "231 =", "es": "231 =", "ja": "231 =", "zh": "231 ="},
      "eᵢ + 1 odd ⇒ eᵢ even": {"fr": "eᵢ + 1 impair ⇒ eᵢ pair", "es": "eᵢ + 1 impar ⇒ eᵢ par", "ja": "eᵢ + 1 が奇数 ⇒ eᵢ は偶数", "zh": "eᵢ + 1 为奇 ⇒ eᵢ 为偶"},
      "is a perfect square": {"fr": "est un carré parfait", "es": "es un cuadrado perfecto", "ja": "は平方数", "zh": "是完全平方数"},
      "is even": {"fr": "est pair", "es": "es par", "ja": "は偶数", "zh": "是偶数"},
      "must have exactly 3 distinct prime factors": {"fr": "a forcément exactement 3 facteurs premiers distincts", "es": "debe tener exactamente 3 factores primos distintos", "ja": "は必ず異なる素因数をちょうど3つもつ", "zh": "必有恰好 3 个不同素因数"},
      "is odd": {"fr": "est impair", "es": "es impar", "ja": "は奇数", "zh": "是奇数"},
      "can be": {"fr": "peut valoir", "es": "puede ser", "ja": "は次になりうる：", "zh": "可以是"},
      "is a perfect cube": {"fr": "est un cube parfait", "es": "es un cubo perfecto", "ja": "は立方数", "zh": "是完全立方数"},
      "has at most 2 prime factors": {"fr": "a au plus 2 facteurs premiers", "es": "tiene a lo sumo 2 factores primos", "ja": "の素因数は高々2つ", "zh": "至多有 2 个素因数"},
      "is prime": {"fr": "est premier", "es": "es primo", "ja": "は素数", "zh": "是素数"},
      "odd": {"fr": "impair", "es": "impar", "ja": "奇数", "zh": "奇数"},
      "every": {"fr": "chaque", "es": "cada", "ja": "すべての", "zh": "每个"},
      "even": {"fr": "pair", "es": "par", "ja": "偶数", "zh": "偶数"},
      "is a square": {"fr": "est un carré", "es": "es un cuadrado", "ja": "は平方数", "zh": "是平方数"},
      "divisors": {"fr": "diviseurs", "es": "divisores", "ja": "個の約数", "zh": "个约数"},
      "— but": {"fr": "— mais", "es": "— pero", "ja": "— ただし", "zh": "— 但"},
      "the exponent of 2 in": {"fr": "l’exposant de 2 dans", "es": "el exponente de 2 en", "ja": "次における2の指数：", "zh": "中 2 的指数"}
    },
    options: [
      { tex: "m\\ \\text{is a perfect square}", correct: true, why: {
        en: "All exponents of $16m$ are even, and $16=2^4$ is a square.",
        fr: "Tous les exposants de $16m$ sont pairs, et $16=2^4$ est un carré.",
        es: "Todos los exponentes de $16m$ son pares y $16=2^4$ es un cuadrado.",
        ja: "$16m$ の指数はすべて偶数で、$16=2^4$ も平方数。",
        zh: "$16m$ 各指数为偶数，且 $16=2^4$ 为平方数。"
      } },
      { tex: "m\\ \\text{is even}", correct: true, why: {
        en: "The exponent of $2$ is $\\ge4$ with $e+1\\mid231$, so $e\\ge6$.",
        fr: "L’exposant de $2$ est $\\ge4$ avec $e+1\\mid231$, donc $e\\ge6$.",
        es: "El exponente de $2$ es $\\ge4$ con $e+1\\mid231$, luego $e\\ge6$.",
        ja: "$2$ の指数は $4$ 以上で $e+1\\mid231$ より $e\\ge6$。",
        zh: "$2$ 的指数 $\\ge4$ 且 $e+1\\mid231$，故 $e\\ge6$。"
      } },
      { tex: "16m\\ \\text{must have exactly 3 distinct prime factors}", correct: false, why: {
        en: "$16m=2^{230}$ also has $231$ divisors.",
        fr: "$16m=2^{230}$ a aussi $231$ diviseurs.",
        es: "$16m=2^{230}$ también tiene $231$ divisores.",
        ja: "$16m=2^{230}$ も約数は $231$ 個。",
        zh: "$16m=2^{230}$ 也有 $231$ 个约数。"
      } },
      { tex: "m\\ \\text{is odd}", correct: false, why: {
        en: "$e_2=4$ is impossible since $5\\nmid231$.",
        fr: "$e_2=4$ est impossible car $5\\nmid231$.",
        es: "$e_2=4$ es imposible pues $5\\nmid231$.",
        ja: "$5\\nmid231$ より $e_2=4$ は不可能。",
        zh: "$5\\nmid231$，故 $e_2=4$ 不可能。"
      } },
      { tex: "m\\ \\text{is a perfect cube}", correct: false, why: {
        en: "$m=2^2\\cdot3^{10}\\cdot5^2$ works and is not a cube.",
        fr: "$m=2^2\\cdot3^{10}\\cdot5^2$ convient et n’est pas un cube.",
        es: "$m=2^2\\cdot3^{10}\\cdot5^2$ sirve y no es un cubo.",
        ja: "$m=2^2\\cdot3^{10}\\cdot5^2$ は条件を満たすが立方数でない。",
        zh: "$m=2^2\\cdot3^{10}\\cdot5^2$ 满足但不是立方数。"
      } },
      { tex: "16m\\ \\text{has at most 2 prime factors}", correct: false, why: {
        en: "$16m=2^{6}\\cdot3^{10}\\cdot5^2$",
        fr: "$16m=2^{6}\\cdot3^{10}\\cdot5^2$",
        es: "$16m=2^{6}\\cdot3^{10}\\cdot5^2$",
        ja: "$16m=2^{6}\\cdot3^{10}\\cdot5^2$",
        zh: "$16m=2^{6}\\cdot3^{10}\\cdot5^2$"
      } },
      { tex: "231\\ \\text{is prime}", correct: false, why: {
        en: "$231=3\\cdot7\\cdot11$",
        fr: "$231=3\\cdot7\\cdot11$",
        es: "$231=3\\cdot7\\cdot11$",
        ja: "$231=3\\cdot7\\cdot11$",
        zh: "$231=3\\cdot7\\cdot11$"
      } },
      { tex: "\\text{the exponent of 2 in}\\ 16m\\ \\text{can be}\\ 4", correct: false, why: {
        en: "$4+1=5\\nmid231$",
        fr: "$4+1=5\\nmid231$",
        es: "$4+1=5\\nmid231$",
        ja: "$4+1=5\\nmid231$",
        zh: "$4+1=5\\nmid231$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Odd divisor count",
          fr: "Nombre impair de diviseurs",
          es: "Número impar de divisores",
          ja: "約数の個数が奇数",
          zh: "约数个数为奇"
        },
        lines: ["\\prod(e_i+1)=231\\ \\text{odd}\\Rightarrow\\ \\text{every}\\ e_i\\ \\text{even}\\Rightarrow16m\\ \\text{is a square}"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "The power of 2",
          fr: "La puissance de 2",
          es: "La potencia de 2",
          ja: "2 の指数",
          zh: "2 的指数"
        },
        lines: ["e_2\\ge4,\\ e_2+1\\in\\{7,11,21,33,77,231\\}\\Rightarrow e_2\\ge6\\Rightarrow4\\mid m"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
