/* number · One divisor, two remainders
   AMC 10A 2025 (Mathematical Association of America), Problem 17 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2025-two-remainders-one-divisor",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10A 2025 (Mathematical Association of America), Problem 17",
        fr: "AMC 10A 2025 (Mathematical Association of America), problème 17",
        es: "AMC 10A 2025 (Mathematical Association of America), problema 17",
        ja: "AMC 10A 2025（アメリカ数学協会）第17問",
        zh: "AMC 10A 2025（美国数学协会）第 17 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "One divisor, two remainders",
      fr: "Un diviseur, deux restes",
      es: "Un divisor, dos restos",
      ja: "1つの割る数と2つの余り",
      zh: "一个除数，两个余数"
    },
    statement: {
      en: "A positive integer $N$ leaves remainder $16$ when it divides $273436$ and remainder $15$ when it divides $272760$. <b>Which of the following are true?</b>",
      fr: "Un entier positif $N$ donne le reste $16$ dans la division de $273436$ et le reste $15$ dans celle de $272760$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un entero positivo $N$ da resto $16$ al dividir $273436$ y resto $15$ al dividir $272760$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "正の整数 $N$ で $273436$ を割ると余り $16$、$272760$ を割ると余り $15$ です。<b>次のうち正しいものはどれですか？</b>",
      zh: "正整数 $N$ 除 $273436$ 余 $16$，除 $272760$ 余 $15$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two long bars split into blocks of length N with leftovers 16 and 15.",
      fr: "Deux longues barres découpées en blocs de longueur N, avec des restes 16 et 15.",
      es: "Dos barras largas divididas en bloques de longitud N con sobrantes 16 y 15.",
      ja: "長さ N のブロックに分けた2本の長い棒と余り 16、15。",
      zh: "两根长条分成长 N 的块，剩余 16 和 15。"
    },
    hint: {
      en: "$N$ divides $273420$ and $272745$, hence their difference $675=3^3\\cdot5^2$. Also $N>16$.",
      fr: "$N$ divise $273420$ et $272745$, donc leur différence $675=3^3\\cdot5^2$. De plus $N>16$.",
      es: "$N$ divide a $273420$ y a $272745$, luego a su diferencia $675=3^3\\cdot5^2$. Además $N>16$.",
      ja: "$N$ は $273420$ と $272745$ を割り、差 $675=3^3\\cdot5^2$ も割る。また $N>16$。",
      zh: "$N$ 整除 $273420$ 与 $272745$，从而整除其差 $675=3^3\\cdot5^2$，且 $N>16$。"
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
      [[1.1, '16'], [0.4, '15']].forEach(([y, r]) => { for (let k = 0; k < 6; k++) F.rect(0.3 + k * 0.85, y, 0.8, 0.35, 'fill-blue', 'fills'); F.rect(5.4, y, 0.3, 0.35, 'fill-pink', 'fills'); F.text([5.55, y + 0.17], r, 'len small', 22, 0); });
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "16": {"fr": "16", "es": "16", "ja": "16", "zh": "16"},
      "15": {"fr": "15", "es": "15", "ja": "15", "zh": "15"},
      "has tens digit": {"fr": "a pour chiffre des dizaines", "es": "tiene cifra de decenas", "ja": "の十の位は", "zh": "的十位数字为"},
      "only": {"fr": "seul", "es": "solo", "ja": "だけ", "zh": "仅有"}
    },
    options: [
      { tex: "N=45", correct: true, why: {
        en: "The only divisor of $675$ above $16$ that also divides $273420$.",
        fr: "Le seul diviseur de $675$ supérieur à $16$ qui divise aussi $273420$.",
        es: "El único divisor de $675$ mayor que $16$ que también divide a $273420$.",
        ja: "$675$ の約数で $16$ より大きく $273420$ も割る唯一のもの。",
        zh: "$675$ 的约数中大于 $16$ 且整除 $273420$ 的唯一一个。"
      } },
      { tex: "N\\mid675", correct: true, why: {
        en: "$273420-272745=675$",
        fr: "$273420-272745=675$",
        es: "$273420-272745=675$",
        ja: "$273420-272745=675$",
        zh: "$273420-272745=675$"
      } },
      { tex: "N=27", correct: false, why: {
        en: "$273420=27\\cdot10126+18$",
        fr: "$273420=27\\cdot10126+18$",
        es: "$273420=27\\cdot10126+18$",
        ja: "$273420=27\\cdot10126+18$",
        zh: "$273420=27\\cdot10126+18$"
      } },
      { tex: "N=75", correct: false, why: {
        en: "$273420\\equiv45\\pmod{75}$",
        fr: "$273420\\equiv45\\pmod{75}$",
        es: "$273420\\equiv45\\pmod{75}$",
        ja: "$273420\\equiv45\\pmod{75}$",
        zh: "$273420\\equiv45\\pmod{75}$"
      } },
      { tex: "N=135", correct: false, why: {
        en: "$273420\\equiv45\\pmod{135}$",
        fr: "$273420\\equiv45\\pmod{135}$",
        es: "$273420\\equiv45\\pmod{135}$",
        ja: "$273420\\equiv45\\pmod{135}$",
        zh: "$273420\\equiv45\\pmod{135}$"
      } },
      { tex: "N=5", correct: false, why: {
        en: "A remainder of $16$ needs $N>16$.",
        fr: "Un reste $16$ exige $N>16$.",
        es: "Un resto $16$ exige $N>16$.",
        ja: "余り $16$ には $N>16$ が必要。",
        zh: "余数 $16$ 要求 $N>16$。"
      } },
      { tex: "N\\ \\text{has tens digit}\\ 2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "N=25", correct: false, why: {
        en: "$273420\\equiv20\\pmod{25}$",
        fr: "$273420\\equiv20\\pmod{25}$",
        es: "$273420\\equiv20\\pmod{25}$",
        ja: "$273420\\equiv20\\pmod{25}$",
        zh: "$273420\\equiv20\\pmod{25}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Remove the remainders",
          fr: "Retirer les restes",
          es: "Quitar los restos",
          ja: "余りを引く",
          zh: "减去余数"
        },
        lines: ["N\\mid273420,\\ N\\mid272745\\Rightarrow N\\mid675"],
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
          en: "Test divisors above 16",
          fr: "Tester les diviseurs > 16",
          es: "Probar divisores > 16",
          ja: "16 より大きい約数を調べる",
          zh: "检验大于 16 的约数"
        },
        lines: ["27,\\ 25,\\ 45,\\ 75,\\ 135,\\ 225,\\ 675:\\ \\text{only}\\ 45\\mid273420"],
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
