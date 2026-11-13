/* number · The tens digit of 6 to the 6⁶
   AMC 12B 2025 (Mathematical Association of America), Problem 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2025-tens-digit-tower-of-sixes",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 9",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 9",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 9",
        ja: "AMC 12B 2025（アメリカ数学協会）第9問",
        zh: "AMC 12B 2025（美国数学协会）第 9 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "The tens digit of 6 to the 6⁶",
      fr: "Le chiffre des dizaines de 6 puissance 6⁶",
      es: "La cifra de las decenas de 6 elevado a 6⁶",
      ja: "6 の 6⁶ 乗の十の位",
      zh: "6 的 6⁶ 次方的十位数字"
    },
    statement: {
      en: "<b>Which of the following are true about $6^{6^6}$, where $6^6=46656$?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies pour $6^{6^6}$, où $6^6=46656$ ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre $6^{6^6}$, con $6^6=46656$?</b>",
      ja: "<b>$6^{6^6}$（$6^6=46656$）について正しいものはどれですか？</b>",
      zh: "<b>关于 $6^{6^6}$（$6^6=46656$），下列哪些正确？</b>"
    },
    figureText: {
      en: "The last two digits of 6¹, 6², 6³, … in a cycle.",
      fr: "Les deux derniers chiffres de 6¹, 6², 6³, … en cycle.",
      es: "Las dos últimas cifras de 6¹, 6², 6³, … en un ciclo.",
      ja: "6¹, 6², 6³, … の下2桁の周期。",
      zh: "6¹、6²、6³…末两位的循环。"
    },
    hint: {
      en: "From $6^2$ on, the last two digits repeat with period $5$: $36,16,96,76,56,36,\\dots$",
      fr: "À partir de $6^2$, les deux derniers chiffres se répètent avec période $5$ : $36,16,96,76,56,36,\\dots$",
      es: "Desde $6^2$, las dos últimas cifras se repiten con periodo $5$: $36,16,96,76,56,36,\\dots$",
      ja: "$6^2$ 以降、下2桁は周期 $5$：$36,16,96,76,56,36,\\dots$",
      zh: "从 $6^2$ 起末两位以周期 $5$ 循环：$36,16,96,76,56,36,\\dots$"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 64, pad: 16 });
      ['36', '16', '96', '76', '56'].forEach((t, k) => { const a = Math.PI / 2 - k * 2 * Math.PI / 5; F.circle([1.8 + 1.2 * Math.cos(a), 1.8 + 1.2 * Math.sin(a)], 0.32, 'fill-blue'); F.text([1.8 + 1.2 * Math.cos(a), 1.8 + 1.2 * Math.sin(a)], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([1.8, 1.8], 'n ≡ 1 (mod 5)', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "its tens digit is": {"fr": "son chiffre des dizaines est", "es": "su cifra de las decenas es", "ja": "十の位は", "zh": "其十位数字为"},
      "is false": {"fr": "est faux", "es": "es falso", "ja": "は誤り", "zh": "不成立"},
      "its last digit is": {"fr": "son dernier chiffre est", "es": "su última cifra es", "ja": "一の位は", "zh": "其末位为"},
      "n ≡ 1 (mod 5)": {"fr": "n ≡ 1 (mod 5)", "es": "n ≡ 1 (mod 5)", "ja": "n ≡ 1 (mod 5)", "zh": "n ≡ 1 (mod 5)"},
      "36": {"fr": "36", "es": "36", "ja": "36", "zh": "36"},
      "16": {"fr": "16", "es": "16", "ja": "16", "zh": "16"},
      "96": {"fr": "96", "es": "96", "ja": "96", "zh": "96"},
      "76": {"fr": "76", "es": "76", "ja": "76", "zh": "76"},
      "56": {"fr": "56", "es": "56", "ja": "56", "zh": "56"}
    },
    options: [
      { tex: "6^{6^6}\\equiv56\\pmod{100}", correct: true, why: {
        en: "$6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6\\equiv56$",
        fr: "$6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6\\equiv56$",
        es: "$6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6\\equiv56$",
        ja: "$6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6\\equiv56$",
        zh: "$6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6\\equiv56$"
      } },
      { tex: "\\text{its tens digit is}\\ 5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\text{its tens digit is}\\ 3", correct: false, why: {
        en: "$36$ appears only for exponents $\\equiv2\\pmod5$.",
        fr: "$36$ n’apparaît que pour les exposants $\\equiv2\\pmod5$.",
        es: "$36$ solo aparece con exponentes $\\equiv2\\pmod5$.",
        ja: "$36$ は指数 $\\equiv2\\pmod5$ のときだけ。",
        zh: "$36$ 只在指数 $\\equiv2\\pmod5$ 时出现。"
      } },
      { tex: "\\text{its tens digit is}\\ 9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{its tens digit is}\\ 1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "6^{6^6}\\equiv36\\pmod{100}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "6^{6^6}\\equiv6\\pmod{25}\\ \\text{is false}", correct: false, why: {
        en: "$6^{6^6}\\equiv56\\equiv6\\pmod{25}$",
        fr: "$6^{6^6}\\equiv56\\equiv6\\pmod{25}$",
        es: "$6^{6^6}\\equiv56\\equiv6\\pmod{25}$",
        ja: "$6^{6^6}\\equiv56\\equiv6\\pmod{25}$",
        zh: "$6^{6^6}\\equiv56\\equiv6\\pmod{25}$"
      } },
      { tex: "\\text{its last digit is}\\ 0", correct: false, why: {
        en: "Every power of $6$ ends in $6$.",
        fr: "Toute puissance de $6$ finit par $6$.",
        es: "Toda potencia de $6$ acaba en $6$.",
        ja: "6 の累乗の末尾は常に $6$。",
        zh: "6 的幂末位总是 $6$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Period 5",
          fr: "Période 5",
          es: "Periodo 5",
          ja: "周期5",
          zh: "周期 5"
        },
        lines: ["6^{n+5}\\equiv6^n\\pmod{100}\\ (n\\ge2):\\ 6^5=7776\\equiv76,\\ 76\\cdot36\\equiv36"],
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
          en: "Reduce the exponent",
          fr: "Réduire l’exposant",
          es: "Reducir el exponente",
          ja: "指数を減らす",
          zh: "化简指数"
        },
        lines: ["6^6\\equiv1\\pmod5\\Rightarrow6^{6^6}\\equiv6^6=46656\\equiv56\\pmod{100}"],
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
