/* number · The recurring binary fraction 0.001100110011…
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-tmua-2023-recurring-binary-fraction",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 15",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 2, question 15",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 2, pregunta 15",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 2 第15問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 2 第 15 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "The recurring binary fraction 0.001100110011…",
      fr: "La fraction binaire périodique 0,001100110011…",
      es: "La fracción binaria periódica 0,001100110011…",
      ja: "循環2進小数 0.001100110011…",
      zh: "二进制循环小数 0.001100110011…"
    },
    statement: {
      en: "Let $x=0.\\overline{0011}_2$, the binary number $0.0011\\,0011\\,0011\\ldots$ in which the block $0011$ repeats forever. <b>Which of the following are true?</b>",
      fr: "Soit $x=0{,}\\overline{0011}_2$, le nombre binaire $0{,}0011\\,0011\\,0011\\ldots$ où le bloc $0011$ se répète indéfiniment. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $x=0{,}\\overline{0011}_2$, el número binario $0{,}0011\\,0011\\,0011\\ldots$ en el que el bloque $0011$ se repite sin fin. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x=0.\\overline{0011}_2$ を、ブロック $0011$ が無限に続く2進数 $0.0011\\,0011\\,0011\\ldots$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $x=0.\\overline{0011}_2$，即块 $0011$ 无限重复的二进制数 $0.0011\\,0011\\,0011\\ldots$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Binary place values 1/2, 1/4, 1/8, 1/16, … with the repeating digits marked.",
      fr: "Les poids binaires 1/2, 1/4, 1/8, 1/16, … et les chiffres répétés.",
      es: "Los pesos binarios 1/2, 1/4, 1/8, 1/16, … y las cifras que se repiten.",
      ja: "2進の位 1/2, 1/4, 1/8, 1/16, … と繰り返す数字。",
      zh: "二进制位权 1/2, 1/4, 1/8, 1/16, … 与重复数字。"
    },
    hint: {
      en: "Multiply by $2^4=16$: the block shifts by one period, so $16x-x=0011_2$.",
      fr: "Multipliez par $2^4=16$ : le bloc se décale d’une période, donc $16x-x=0011_2$.",
      es: "Multiplica por $2^4=16$: el bloque se desplaza un periodo, así $16x-x=0011_2$.",
      ja: "$2^4=16$ 倍すると1周期ずれるので $16x-x=0011_2$。",
      zh: "乘以 $2^4=16$ 平移一个周期，故 $16x-x=0011_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 46, pad: 16 });
      const d = '001100110011';
      for (let i = 0; i < 12; i++) { F.rect(0.2 + i * 0.46, 0.4, 0.4, 0.6, d[i] === '1' ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([0.4 + i * 0.46, 0.7], d[i], 'tick', 0, 0); }
      F.text([0.1, 0.7], '0.', 'tick', -6, 0);
      F.reveal = () => {
      F.text([3.0, 1.35], '3/16 + 3/256 + … = 1/5', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0.": {"fr": "0,", "es": "0,", "ja": "0.", "zh": "0."},
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "3/16 + 3/256 + … = 1/5": {"fr": "3/16 + 3/256 + … = 1/5", "es": "3/16 + 3/256 + … = 1/5", "ja": "3/16 + 3/256 + … = 1/5", "zh": "3/16 + 3/256 + … = 1/5"}
    },
    options: [
      { tex: "x=\\tfrac15", correct: true, why: {
        en: "$\\tfrac3{15}$",
        fr: "$\\tfrac3{15}$",
        es: "$\\tfrac3{15}$",
        ja: "$\\tfrac3{15}$",
        zh: "$\\tfrac3{15}$"
      } },
      { tex: "15x=3", correct: true, why: {
        en: "$16x-x=0011_2=3$",
        fr: "$16x-x=0011_2=3$",
        es: "$16x-x=0011_2=3$",
        ja: "$16x-x=0011_2=3$",
        zh: "$16x-x=0011_2=3$"
      } },
      { tex: "x=\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=\\tfrac1{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=\\tfrac2{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=\\tfrac4{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=\\tfrac3{16}", correct: false, why: {
        en: "Only the first block $0.0011_2$.",
        fr: "Seulement le premier bloc $0{,}0011_2$.",
        es: "Solo el primer bloque $0{,}0011_2$.",
        ja: "最初のブロック $0.0011_2$ だけ。",
        zh: "只算了第一块 $0.0011_2$。"
      } },
      { tex: "x=\\tfrac5{16}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Shift one period",
          fr: "Décaler d’une période",
          es: "Desplazar un periodo",
          ja: "1周期ずらす",
          zh: "平移一个周期"
        },
        lines: ["16x=0011.\\overline{0011}_2=3+x"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["15x=3\\Rightarrow x=\\tfrac15"],
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
