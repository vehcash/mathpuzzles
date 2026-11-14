/* combinatorics · The constant term of (x + 1/x)⁶(x − 2/x)⁵
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-ita-2025-constant-term-parity",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 3",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 3",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 3",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第3問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 3 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "The constant term of (x + 1/x)⁶(x − 2/x)⁵",
      fr: "Le terme constant de (x + 1/x)⁶(x − 2/x)⁵",
      es: "El término independiente de (x + 1/x)⁶(x − 2/x)⁵",
      ja: "(x + 1/x)⁶(x − 2/x)⁵ の定数項",
      zh: "(x + 1/x)⁶(x − 2/x)⁵ 的常数项"
    },
    statement: {
      en: "Expand $\\left(x+\\dfrac1x\\right)^6\\left(x-\\dfrac2x\\right)^5$. <b>Which of the following are true?</b>",
      fr: "On développe $\\left(x+\\dfrac1x\\right)^6\\left(x-\\dfrac2x\\right)^5$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Se desarrolla $\\left(x+\\dfrac1x\\right)^6\\left(x-\\dfrac2x\\right)^5$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\left(x+\\dfrac1x\\right)^6\\left(x-\\dfrac2x\\right)^5$ を展開します。 <b>次のうち正しいものはどれですか？</b>",
      zh: "展开 $\\left(x+\\dfrac1x\\right)^6\\left(x-\\dfrac2x\\right)^5$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The possible exponents of x in each factor: even ones for the first, odd ones for the second.",
      fr: "Les exposants possibles de x dans chaque facteur : pairs pour le premier, impairs pour le second.",
      es: "Los exponentes posibles de x en cada factor: pares en el primero, impares en el segundo.",
      ja: "各因子の x の指数：前者は偶数、後者は奇数。",
      zh: "各因式中 x 的可能指数：前者为偶数，后者为奇数。"
    },
    hint: {
      en: "Look at the parity of the exponents of $x$ in each factor.",
      fr: "Regardez la parité des exposants de $x$ dans chaque facteur.",
      es: "Mira la paridad de los exponentes de $x$ en cada factor.",
      ja: "各因子の $x$ の指数の偶奇を見る。",
      zh: "看各因式中 $x$ 指数的奇偶性。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.0, scale: 46, pad: 16 });
      [-6, -4, -2, 0, 2, 4, 6].forEach((e, k) => { F.rect(0.2 + k * 0.62, 1.05, 0.54, 0.6, 'fill-blue', 'fills'); F.text([0.47 + k * 0.62, 1.35], String(e).replace('-', '−'), 'len small', 0, 0); });
      [-5, -3, -1, 1, 3, 5].forEach((e, k) => { F.rect(0.5 + k * 0.62, 0.25, 0.54, 0.6, 'fill-yellow', 'fills'); F.text([0.77 + k * 0.62, 0.55], String(e).replace('-', '−'), 'len small', 0, 0); });
      F.reveal = () => {
      F.text([2.4, 1.88], 'even + odd ≠ 0', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "even + odd ≠ 0": {"fr": "pair + impair ≠ 0", "es": "par + impar ≠ 0", "ja": "偶数 + 奇数 ≠ 0", "zh": "偶 + 奇 ≠ 0"},
      "every power of": {"fr": "toute puissance de", "es": "toda potencia de", "ja": "のすべての指数", "zh": "的每个幂"},
      "in the expansion is odd": {"fr": "dans le développement est impaire", "es": "en el desarrollo es impar", "ja": "は展開で奇数", "zh": "在展开式中都是奇数"},
      "the coefficient of": {"fr": "le coefficient de", "es": "el coeficiente de", "ja": "の係数", "zh": "的系数"},
      "is": {"fr": "vaut", "es": "es", "ja": "は", "zh": "为"},
      "the constant term of": {"fr": "le terme constant de", "es": "el término independiente de", "ja": "の定数項", "zh": "的常数项"},
      "is odd": {"fr": "est impair", "es": "es impar", "ja": "は奇数", "zh": "是奇数"}
    },
    options: [
      { tex: "0", correct: true, why: {
        en: "Every exponent is even $+$ odd, which is odd, so never $0$.",
        fr: "Chaque exposant est pair $+$ impair, donc impair, jamais $0$.",
        es: "Cada exponente es par $+$ impar, luego impar, nunca $0$.",
        ja: "指数は偶数＋奇数で奇数、決して $0$ にならない。",
        zh: "每个指数都是偶+奇=奇，不可能为 $0$。"
      } },
      { tex: "\\text{every power of}\\ x\\ \\text{in the expansion is odd}", correct: true, why: {
        en: "$(6-2i)+(5-2j)=11-2(i+j)$",
        fr: "$(6-2i)+(5-2j)=11-2(i+j)$",
        es: "$(6-2i)+(5-2j)=11-2(i+j)$",
        ja: "$(6-2i)+(5-2j)=11-2(i+j)$",
        zh: "$(6-2i)+(5-2j)=11-2(i+j)$"
      } },
      { tex: "-12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the coefficient of}\\ x^{11}\\ \\text{is}\\ 0", correct: false, why: {
        en: "$1\\cdot1=1$",
        fr: "$1\\cdot1=1$",
        es: "$1\\cdot1=1$",
        ja: "$1\\cdot1=1$",
        zh: "$1\\cdot1=1$"
      } },
      { tex: "\\text{the constant term of}\\ \\left(x+\\tfrac1x\\right)^6\\ \\text{is}\\ 0", correct: false, why: {
        en: "$\\binom63=20$",
        fr: "$\\binom63=20$",
        es: "$\\binom63=20$",
        ja: "$\\binom63=20$",
        zh: "$\\binom63=20$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Exponents",
          fr: "Exposants",
          es: "Exponentes",
          ja: "指数",
          zh: "指数"
        },
        lines: ["\\left(x+\\tfrac1x\\right)^6:\\ x^{6-2i}\\quad\\left(x-\\tfrac2x\\right)^5:\\ x^{5-2j}"],
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
          en: "Parity",
          fr: "Parité",
          es: "Paridad",
          ja: "偶奇",
          zh: "奇偶"
        },
        lines: ["11-2(i+j)\\ \\text{is odd}\\ \\Rightarrow\\ 11-2(i+j)\\ne0"],
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
