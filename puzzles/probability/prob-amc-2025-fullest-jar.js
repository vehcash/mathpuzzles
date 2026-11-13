/* probability · How full is the fullest jar?
   AMC 10A 2025 (Mathematical Association of America), Problem 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2025-fullest-jar",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10A 2025 (Mathematical Association of America), Problem 16",
        fr: "AMC 10A 2025 (Mathematical Association of America), problème 16",
        es: "AMC 10A 2025 (Mathematical Association of America), problema 16",
        ja: "AMC 10A 2025（アメリカ数学協会）第16問",
        zh: "AMC 10A 2025（美国数学协会）第 16 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "How full is the fullest jar?",
      fr: "Quel remplissage pour le bocal le plus plein ?",
      es: "¿Cuánto tiene el tarro más lleno?",
      ja: "いちばん多い瓶には何枚？",
      zh: "最满的罐子有多少？"
    },
    statement: {
      en: "Three distinct coins are each dropped into one of three distinct jars, independently and with equal probability. Let $M$ be the largest number of coins in a jar. <b>Which of the following are true?</b>",
      fr: "Trois pièces distinctes tombent chacune dans l’un de trois bocaux distincts, indépendamment et de façon équiprobable. Soit $M$ le plus grand nombre de pièces dans un bocal. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Tres monedas distintas caen cada una en uno de tres tarros distintos, de forma independiente y equiprobable. Sea $M$ el mayor número de monedas en un tarro. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "区別できる3枚のコインを、区別できる3つの瓶に独立に等確率で入れます。1つの瓶に入る枚数の最大を $M$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "三枚不同的硬币各自独立、等可能地落入三个不同的罐子之一。设 $M$ 为罐中硬币数的最大值。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Three jars with three coins dropping in.",
      fr: "Trois bocaux et trois pièces qui tombent.",
      es: "Tres tarros y tres monedas cayendo.",
      ja: "3つの瓶と落ちる3枚のコイン。",
      zh: "三个罐子与三枚落下的硬币。"
    },
    hint: {
      en: "There are $3^3=27$ equally likely placements. Count those with all coins in different jars and those with all in one jar.",
      fr: "Il y a $3^3=27$ placements équiprobables. Comptez ceux où les pièces sont toutes séparées et ceux où elles sont toutes ensemble.",
      es: "Hay $3^3=27$ colocaciones equiprobables. Cuenta las que tienen todas separadas y las que tienen todas juntas.",
      ja: "同様に確からしい入れ方は $3^3=27$ 通り。全部別々と全部同じを数える。",
      zh: "共 $3^3=27$ 种等可能放法；数全部分开和全部同罐的情况。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.4, scale: 56, pad: 16 });
      for (let k = 0; k < 3; k++) { const x = 0.6 + k * 1.6; F.path([[x, 1.4], [x, 0.3], [x + 1.0, 0.3], [x + 1.0, 1.4]], 'seg', 'base', false); F.circle([x + 0.5, 2.0], 0.18, 'fill-yellow'); }
      F.reveal = () => {
      F.text([2.5, 0.8], '6·1 + 18·2 + 3·3', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "6·1 + 18·2 + 3·3": {"fr": "6·1 + 18·2 + 3·3", "es": "6·1 + 18·2 + 3·3", "ja": "6·1 + 18·2 + 3·3", "zh": "6·1 + 18·2 + 3·3"}
    },
    options: [
      { tex: "E(M)=\\tfrac{17}9", correct: true, why: {
        en: "$\\dfrac{6+36+9}{27}=\\dfrac{51}{27}$",
        fr: "$\\dfrac{6+36+9}{27}=\\dfrac{51}{27}$",
        es: "$\\dfrac{6+36+9}{27}=\\dfrac{51}{27}$",
        ja: "$\\dfrac{6+36+9}{27}=\\dfrac{51}{27}$",
        zh: "$\\dfrac{6+36+9}{27}=\\dfrac{51}{27}$"
      } },
      { tex: "P(M=2)=\\tfrac23", correct: true, why: {
        en: "$\\dfrac{27-6-3}{27}=\\dfrac{18}{27}$",
        fr: "$\\dfrac{27-6-3}{27}=\\dfrac{18}{27}$",
        es: "$\\dfrac{27-6-3}{27}=\\dfrac{18}{27}$",
        ja: "$\\dfrac{27-6-3}{27}=\\dfrac{18}{27}$",
        zh: "$\\dfrac{27-6-3}{27}=\\dfrac{18}{27}$"
      } },
      { tex: "E(M)=2", correct: false, why: {
        en: "$M=1$ is more likely than $M=3$, so the mean is below $2$.",
        fr: "$M=1$ est plus probable que $M=3$ : la moyenne est sous $2$.",
        es: "$M=1$ es más probable que $M=3$: la media queda por debajo de $2$.",
        ja: "$M=1$ のほうが $M=3$ より起こりやすいので平均は $2$ 未満。",
        zh: "$M=1$ 比 $M=3$ 更可能，均值小于 $2$。"
      } },
      { tex: "E(M)=\\tfrac{13}9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "E(M)=\\tfrac43", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P(M=1)=\\tfrac13", correct: false, why: {
        en: "$\\tfrac{3!}{27}=\\tfrac29$",
        fr: "$\\tfrac{3!}{27}=\\tfrac29$",
        es: "$\\tfrac{3!}{27}=\\tfrac29$",
        ja: "$\\tfrac{3!}{27}=\\tfrac29$",
        zh: "$\\tfrac{3!}{27}=\\tfrac29$"
      } },
      { tex: "P(M=3)=\\tfrac13", correct: false, why: {
        en: "$\\tfrac3{27}=\\tfrac19$",
        fr: "$\\tfrac3{27}=\\tfrac19$",
        es: "$\\tfrac3{27}=\\tfrac19$",
        ja: "$\\tfrac3{27}=\\tfrac19$",
        zh: "$\\tfrac3{27}=\\tfrac19$"
      } },
      { tex: "E(M)=\\tfrac{17}{27}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Distribution",
          fr: "Loi",
          es: "Distribución",
          ja: "分布",
          zh: "分布"
        },
        lines: ["P(M=1)=\\tfrac6{27},\\ P(M=3)=\\tfrac3{27},\\ P(M=2)=\\tfrac{18}{27}"],
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
          en: "Expectation",
          fr: "Espérance",
          es: "Esperanza",
          ja: "期待値",
          zh: "期望"
        },
        lines: ["E(M)=\\frac{6+36+9}{27}=\\frac{17}9"],
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
