/* number · Three consecutive powers of 7 modulo 19
   AMC 10B 2024 (Mathematical Association of America), Problem 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2024-three-powers-of-7-mod-19",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10B 2024 (Mathematical Association of America), Problem 7",
        fr: "AMC 10B 2024 (Mathematical Association of America), problème 7",
        es: "AMC 10B 2024 (Mathematical Association of America), problema 7",
        ja: "AMC 10B 2024（アメリカ数学協会）第7問",
        zh: "AMC 10B 2024（美国数学协会）第 7 题"
      },
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Three consecutive powers of 7 modulo 19",
      fr: "Trois puissances consécutives de 7 modulo 19",
      es: "Tres potencias consecutivas de 7 módulo 19",
      ja: "19 を法とした7の連続する3つの累乗",
      zh: "模 19 的三个连续 7 的幂"
    },
    statement: {
      en: "<b>Which of the following are true about $S=7^{2024}+7^{2025}+7^{2026}$?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies pour $S=7^{2024}+7^{2025}+7^{2026}$ ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre $S=7^{2024}+7^{2025}+7^{2026}$?</b>",
      ja: "<b>$S=7^{2024}+7^{2025}+7^{2026}$ について正しいものはどれですか？</b>",
      zh: "<b>关于 $S=7^{2024}+7^{2025}+7^{2026}$，下列哪些正确？</b>"
    },
    figureText: {
      en: "Three blocks 7²⁰²⁴, 7²⁰²⁵, 7²⁰²⁶ with a common factor pulled out.",
      fr: "Trois blocs 7²⁰²⁴, 7²⁰²⁵, 7²⁰²⁶ dont on extrait un facteur commun.",
      es: "Tres bloques 7²⁰²⁴, 7²⁰²⁵, 7²⁰²⁶ con un factor común extraído.",
      ja: "共通因数をくくり出す 7²⁰²⁴, 7²⁰²⁵, 7²⁰²⁶ の3つの塊。",
      zh: "提取公因式的三块 7²⁰²⁴、7²⁰²⁵、7²⁰²⁶。"
    },
    hint: {
      en: "Factor out $7^{2024}$.",
      fr: "Mettez $7^{2024}$ en facteur.",
      es: "Saca factor común $7^{2024}$.",
      ja: "$7^{2024}$ でくくる。",
      zh: "提出 $7^{2024}$。"
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
      ['7²⁰²⁴', '7²⁰²⁵', '7²⁰²⁶'].forEach((t, k) => { F.rect(0.3 + k * 1.9, 0.35, 1.6, 0.7, 'fill-blue', 'fills'); F.text([0.3 + 0.8 + k * 1.9, 0.7], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([3.0, 1.3], '7²⁰²⁴ · 57', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "7²⁰²⁴": {"fr": "7²⁰²⁴", "es": "7²⁰²⁴", "ja": "7²⁰²⁴", "zh": "7²⁰²⁴"},
      "7²⁰²⁵": {"fr": "7²⁰²⁵", "es": "7²⁰²⁵", "ja": "7²⁰²⁵", "zh": "7²⁰²⁵"},
      "7²⁰²⁶": {"fr": "7²⁰²⁶", "es": "7²⁰²⁶", "ja": "7²⁰²⁶", "zh": "7²⁰²⁶"},
      "7²⁰²⁴ · 57": {"fr": "7²⁰²⁴ · 57", "es": "7²⁰²⁴ · 57", "ja": "7²⁰²⁴ · 57", "zh": "7²⁰²⁴ · 57"}
    },
    options: [
      { tex: "19\\mid S", correct: true, why: {
        en: "$S=7^{2024}(1+7+49)=7^{2024}\\cdot57=7^{2024}\\cdot3\\cdot19$",
        fr: "$S=7^{2024}(1+7+49)=7^{2024}\\cdot57=7^{2024}\\cdot3\\cdot19$",
        es: "$S=7^{2024}(1+7+49)=7^{2024}\\cdot57=7^{2024}\\cdot3\\cdot19$",
        ja: "$S=7^{2024}(1+7+49)=7^{2024}\\cdot57=7^{2024}\\cdot3\\cdot19$",
        zh: "$S=7^{2024}(1+7+49)=7^{2024}\\cdot57=7^{2024}\\cdot3\\cdot19$"
      } },
      { tex: "7^3\\equiv1\\pmod{19}", correct: true, why: {
        en: "$343=18\\cdot19+1$",
        fr: "$343=18\\cdot19+1$",
        es: "$343=18\\cdot19+1$",
        ja: "$343=18\\cdot19+1$",
        zh: "$343=18\\cdot19+1$"
      } },
      { tex: "S\\equiv1\\pmod{19}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\equiv7\\pmod{19}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\equiv11\\pmod{19}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\equiv18\\pmod{19}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "7^{2024}\\equiv1\\pmod{19}", correct: false, why: {
        en: "$2024\\equiv2\\pmod3$: $7^{2024}\\equiv49\\equiv11$",
        fr: "$2024\\equiv2\\pmod3$: $7^{2024}\\equiv49\\equiv11$",
        es: "$2024\\equiv2\\pmod3$: $7^{2024}\\equiv49\\equiv11$",
        ja: "$2024\\equiv2\\pmod3$: $7^{2024}\\equiv49\\equiv11$",
        zh: "$2024\\equiv2\\pmod3$: $7^{2024}\\equiv49\\equiv11$"
      } },
      { tex: "3\\nmid S", correct: false, why: {
        en: "$57=3\\cdot19$",
        fr: "$57=3\\cdot19$",
        es: "$57=3\\cdot19$",
        ja: "$57=3\\cdot19$",
        zh: "$57=3\\cdot19$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "くくる",
          zh: "提公因式"
        },
        lines: ["S=7^{2024}(1+7+7^2)=7^{2024}\\cdot57"],
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
          en: "Conclude",
          fr: "Conclure",
          es: "Concluir",
          ja: "結論",
          zh: "结论"
        },
        lines: ["57=3\\cdot19\\Rightarrow S\\equiv0\\pmod{19}"],
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
