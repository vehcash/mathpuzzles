/* number · How many base-5 digits does 5 × 10¹³ have?
   AMC 12B 2024 (Mathematical Association of America), Problem 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2024-debt-in-base-5",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 6",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 6",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 6",
        ja: "AMC 12B 2024（アメリカ数学協会）第6問",
        zh: "AMC 12B 2024（美国数学协会）第 6 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "How many base-5 digits does 5 × 10¹³ have?",
      fr: "Combien de chiffres en base 5 a 5 × 10¹³ ?",
      es: "¿Cuántas cifras en base 5 tiene 5 × 10¹³?",
      ja: "5 × 10¹³ は5進法で何桁？",
      zh: "5 × 10¹³ 在五进制下有几位？"
    },
    statement: {
      en: "A national debt of $5\\times10^{13}$ dollars is written in base $5$. <b>Which of the following are true?</b>",
      fr: "Une dette nationale de $5\\times10^{13}$ dollars est écrite en base $5$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una deuda nacional de $5\\times10^{13}$ dólares se escribe en base $5$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$5\\times10^{13}$ ドルの国債を5進法で書きます。<b>次のうち正しいものはどれですか？</b>",
      zh: "把 $5\\times10^{13}$ 美元的国债写成五进制。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Powers of 5 on a log scale with the number placed between two of them.",
      fr: "Puissances de 5 sur une échelle log, le nombre placé entre deux d’entre elles.",
      es: "Potencias de 5 en escala logarítmica con el número entre dos de ellas.",
      ja: "対数目盛上の5の累乗と、その間にある数。",
      zh: "对数刻度上的 5 的幂，该数位于其中两个之间。"
    },
    hint: {
      en: "$5\\times10^{13}=2^{13}\\cdot5^{14}$. Compare $2^{13}=8192$ with powers of $5$.",
      fr: "$5\\times10^{13}=2^{13}\\cdot5^{14}$. Comparez $2^{13}=8192$ aux puissances de $5$.",
      es: "$5\\times10^{13}=2^{13}\\cdot5^{14}$. Compara $2^{13}=8192$ con potencias de $5$.",
      ja: "$5\\times10^{13}=2^{13}\\cdot5^{14}$。$2^{13}=8192$ を5の累乗と比べる。",
      zh: "$5\\times10^{13}=2^{13}\\cdot5^{14}$，比较 $2^{13}=8192$ 与 5 的幂。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.4, scale: 50, pad: 16 });
      F.seg([0.2, 0.7], [5.8, 0.7], 'seg');
      [['5¹⁸', 1.0], ['5¹⁹', 2.6], ['5²⁰', 4.2]].forEach(([t, x]) => { F.seg([x, 0.6], [x, 0.8], 'seg'); F.text([x, 0.7], t, 'tick', 0, 16); });
      F.reveal = () => {
      F.dot([3.65, 0.7]); F.text([3.65, 0.7], '5·10¹³', 'len small', 0, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "5¹⁸": {"fr": "5¹⁸", "es": "5¹⁸", "ja": "5¹⁸", "zh": "5¹⁸"},
      "5¹⁹": {"fr": "5¹⁹", "es": "5¹⁹", "ja": "5¹⁹", "zh": "5¹⁹"},
      "5²⁰": {"fr": "5²⁰", "es": "5²⁰", "ja": "5²⁰", "zh": "5²⁰"},
      "5·10¹³": {"fr": "5·10¹³", "es": "5·10¹³", "ja": "5·10¹³", "zh": "5·10¹³"},
      "it has": {"fr": "il a", "es": "tiene", "ja": "桁数は", "zh": "有"},
      "digits in base": {"fr": "chiffres en base", "es": "cifras en base", "ja": "桁（底", "zh": "位（底"},
      "its last base-5 digit is nonzero": {"fr": "son dernier chiffre en base 5 est non nul", "es": "su última cifra en base 5 no es cero", "ja": "5進法の末尾は0でない", "zh": "其五进制末位非零"},
      "digits": {"fr": "chiffres", "es": "cifras", "ja": "桁", "zh": "位"}
    },
    options: [
      { tex: "\\text{it has}\\ 20\\ \\text{digits in base}\\ 5", correct: true, why: {
        en: "$5^{19}\\le N<5^{20}$",
        fr: "$5^{19}\\le N<5^{20}$",
        es: "$5^{19}\\le N<5^{20}$",
        ja: "$5^{19}\\le N<5^{20}$",
        zh: "$5^{19}\\le N<5^{20}$"
      } },
      { tex: "5^{19}<5\\times10^{13}<5^{20}", correct: true, why: {
        en: "$5^5=3125<8192<15625=5^6$",
        fr: "$5^5=3125<8192<15625=5^6$",
        es: "$5^5=3125<8192<15625=5^6$",
        ja: "$5^5=3125<8192<15625=5^6$",
        zh: "$5^5=3125<8192<15625=5^6$"
      } },
      { tex: "\\text{it has}\\ 14\\ \\text{digits in base}\\ 5", correct: false, why: {
        en: "That counts only the factor $5^{14}$ and forgets $2^{13}$.",
        fr: "Cela ne compte que $5^{14}$ et oublie $2^{13}$.",
        es: "Solo cuenta $5^{14}$ y olvida $2^{13}$.",
        ja: "$5^{14}$ だけで $2^{13}$ を忘れている。",
        zh: "只算了 $5^{14}$，漏了 $2^{13}$。"
      } },
      { tex: "\\text{it has}\\ 18\\ \\text{digits in base}\\ 5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{it has}\\ 22\\ \\text{digits in base}\\ 5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{it has}\\ 19\\ \\text{digits in base}\\ 5", correct: false, why: {
        en: "$\\lfloor\\log_5N\\rfloor=19$, so the digit count is $19+1$.",
        fr: "$\\lfloor\\log_5N\\rfloor=19$, donc $19+1$ chiffres.",
        es: "$\\lfloor\\log_5N\\rfloor=19$, luego $19+1$ cifras.",
        ja: "$\\lfloor\\log_5N\\rfloor=19$ なので桁数は $19+1$。",
        zh: "$\\lfloor\\log_5N\\rfloor=19$，位数为 $19+1$。"
      } },
      { tex: "\\text{its last base-5 digit is nonzero}", correct: false, why: {
        en: "$5\\mid N$, so it ends in $0$ in base $5$.",
        fr: "$5\\mid N$ : il finit par $0$ en base $5$.",
        es: "$5\\mid N$: acaba en $0$ en base $5$.",
        ja: "$5\\mid N$ なので5進法で末尾は $0$。",
        zh: "$5\\mid N$，五进制末位为 $0$。"
      } },
      { tex: "5\\times10^{13}=10^{14}/5", correct: false, why: {
        en: "$10^{14}/2$",
        fr: "$10^{14}/2$",
        es: "$10^{14}/2$",
        ja: "$10^{14}/2$",
        zh: "$10^{14}/2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "分解"
        },
        lines: ["5\\times10^{13}=2^{13}\\cdot5^{14},\\quad5^5<2^{13}<5^6"],
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
          en: "Digits",
          fr: "Chiffres",
          es: "Cifras",
          ja: "桁数",
          zh: "位数"
        },
        lines: ["5^{19}<N<5^{20}\\Rightarrow20\\ \\text{digits}"],
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
