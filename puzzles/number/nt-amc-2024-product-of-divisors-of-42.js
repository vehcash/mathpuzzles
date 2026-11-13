/* number · Multiply all the divisors of 42
   AMC 10B 2024 (Mathematical Association of America), Problem 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2024-product-of-divisors-of-42",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10B 2024 (Mathematical Association of America), Problem 8",
        fr: "AMC 10B 2024 (Mathematical Association of America), problème 8",
        es: "AMC 10B 2024 (Mathematical Association of America), problema 8",
        ja: "AMC 10B 2024（アメリカ数学協会）第8問",
        zh: "AMC 10B 2024（美国数学协会）第 8 题"
      },
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Multiply all the divisors of 42",
      fr: "Multiplier tous les diviseurs de 42",
      es: "Multiplicar todos los divisores de 42",
      ja: "42 の約数をすべて掛ける",
      zh: "把 42 的所有约数相乘"
    },
    statement: {
      en: "Let $N$ be the product of all positive divisors of $42$. <b>Which of the following are true?</b>",
      fr: "Soit $N$ le produit de tous les diviseurs positifs de $42$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $N$ el producto de todos los divisores positivos de $42$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$42$ の正の約数すべての積を $N$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $N$ 为 $42$ 的所有正约数之积。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The eight divisors of 42 arranged in pairs whose products are 42.",
      fr: "Les huit diviseurs de 42 groupés par paires de produit 42.",
      es: "Los ocho divisores de 42 agrupados en pares de producto 42.",
      ja: "積が42になる組に並べた42の約数8個。",
      zh: "42 的八个约数按积为 42 两两配对。"
    },
    hint: {
      en: "Pair each divisor $d$ with $42/d$.",
      fr: "Associez chaque diviseur $d$ à $42/d$.",
      es: "Empareja cada divisor $d$ con $42/d$.",
      ja: "約数 $d$ と $42/d$ を組にする。",
      zh: "把每个约数 $d$ 与 $42/d$ 配对。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 50, pad: 16 });
      [['1', '42'], ['2', '21'], ['3', '14'], ['6', '7']].forEach(([a, b], k) => { F.rect(0.3 + k * 1.45, 0.4, 1.3, 0.8, 'fill-blue', 'fills'); F.text([0.95 + k * 1.45, 0.8], a + ' · ' + b, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([3.0, 1.45], 'N = 42⁴', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1 · 42": {"fr": "1 · 42", "es": "1 · 42", "ja": "1 · 42", "zh": "1 · 42"},
      "2 · 21": {"fr": "2 · 21", "es": "2 · 21", "ja": "2 · 21", "zh": "2 · 21"},
      "3 · 14": {"fr": "3 · 14", "es": "3 · 14", "ja": "3 · 14", "zh": "3 · 14"},
      "6 · 7": {"fr": "6 · 7", "es": "6 · 7", "ja": "6 · 7", "zh": "6 · 7"},
      "N = 42⁴": {"fr": "N = 42⁴", "es": "N = 42⁴", "ja": "N = 42⁴", "zh": "N = 42⁴"},
      "the units digit of": {"fr": "le chiffre des unités de", "es": "la cifra de las unidades de", "ja": "の一の位", "zh": "的个位数字"},
      "is": {"fr": "est", "es": "es", "ja": "は", "zh": "为"},
      "has": {"fr": "a", "es": "tiene", "ja": "の約数は", "zh": "有"},
      "divisors": {"fr": "diviseurs", "es": "divisores", "ja": "個", "zh": "个约数"}
    },
    options: [
      { tex: "N=42^4", correct: true, why: {
        en: "Four pairs, each with product $42$.",
        fr: "Quatre paires de produit $42$.",
        es: "Cuatro pares de producto $42$.",
        ja: "積42の組が4つ。",
        zh: "四对，每对积为 $42$。"
      } },
      { tex: "\\text{the units digit of}\\ N\\ \\text{is}\\ 6", correct: true, why: {
        en: "$2^4=16$",
        fr: "$2^4=16$",
        es: "$2^4=16$",
        ja: "$2^4=16$",
        zh: "$2^4=16$"
      } },
      { tex: "\\text{the units digit of}\\ N\\ \\text{is}\\ 2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the units digit of}\\ N\\ \\text{is}\\ 8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "N=42^8", correct: false, why: {
        en: "That counts each pair twice.",
        fr: "Cela compte chaque paire deux fois.",
        es: "Cuenta cada par dos veces.",
        ja: "各組を2回数えている。",
        zh: "每对算了两次。"
      } },
      { tex: "N=2\\cdot3\\cdot7", correct: false, why: {
        en: "That is only $42$ itself.",
        fr: "C’est juste $42$.",
        es: "Es solo $42$.",
        ja: "42 そのもの。",
        zh: "那只是 $42$。"
      } },
      { tex: "42\\ \\text{has}\\ 6\\ \\text{divisors}", correct: false, why: {
        en: "$(1+1)^3=8$",
        fr: "$(1+1)^3=8$",
        es: "$(1+1)^3=8$",
        ja: "$(1+1)^3=8$",
        zh: "$(1+1)^3=8$"
      } },
      { tex: "\\text{the units digit of}\\ N\\ \\text{is}\\ 0", correct: false, why: {
        en: "$N$ has no factor $5$.",
        fr: "$N$ n’a pas de facteur $5$.",
        es: "$N$ no tiene factor $5$.",
        ja: "$N$ は因数 $5$ をもたない。",
        zh: "$N$ 没有因子 $5$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pair the divisors",
          fr: "Apparier les diviseurs",
          es: "Emparejar divisores",
          ja: "約数を組にする",
          zh: "约数配对"
        },
        lines: ["(1\\cdot42)(2\\cdot21)(3\\cdot14)(6\\cdot7)=42^4"],
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
          en: "Last digit",
          fr: "Dernier chiffre",
          es: "Última cifra",
          ja: "一の位",
          zh: "末位"
        },
        lines: ["42^4\\equiv2^4=16\\equiv6\\pmod{10}"],
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
