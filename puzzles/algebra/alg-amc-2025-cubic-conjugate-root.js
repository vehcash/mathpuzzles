/* algebra · A cubic with root 4 + √5
   AMC 12B 2025 (Mathematical Association of America), Problem 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-amc-2025-cubic-conjugate-root",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 8",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 8",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 8",
        ja: "AMC 12B 2025（アメリカ数学協会）第8問",
        zh: "AMC 12B 2025（美国数学协会）第 8 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "A cubic with root 4 + √5",
      fr: "Une cubique de racine 4 + √5",
      es: "Una cúbica con raíz 4 + √5",
      ja: "解 4 + √5 をもつ3次式",
      zh: "有根 4 + √5 的三次式"
    },
    statement: {
      en: "$x^3-5x^2+ax+b$ has integer coefficients and $4+\\sqrt5$ is a root. <b>Which of the following are true?</b>",
      fr: "$x^3-5x^2+ax+b$ est à coefficients entiers et $4+\\sqrt5$ en est une racine. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$x^3-5x^2+ax+b$ tiene coeficientes enteros y $4+\\sqrt5$ es raíz. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x^3-5x^2+ax+b$ は整数係数で、$4+\\sqrt5$ を解にもちます。<b>次のうち正しいものはどれですか？</b>",
      zh: "$x^3-5x^2+ax+b$ 为整系数，$4+\\sqrt5$ 是它的根。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line with 4 − √5 and 4 + √5 marked symmetrically about 4.",
      fr: "Une droite graduée avec 4 − √5 et 4 + √5 symétriques par rapport à 4.",
      es: "Una recta numérica con 4 − √5 y 4 + √5 simétricos respecto a 4.",
      ja: "4 に関して対称な 4 − √5 と 4 + √5 の数直線。",
      zh: "数轴上关于 4 对称的 4 − √5 与 4 + √5。"
    },
    hint: {
      en: "With rational coefficients, $4-\\sqrt5$ is a root too. The three roots add to $5$.",
      fr: "Avec des coefficients rationnels, $4-\\sqrt5$ est aussi racine. Les trois racines ont pour somme $5$.",
      es: "Con coeficientes racionales, $4-\\sqrt5$ también es raíz. Las tres raíces suman $5$.",
      ja: "有理係数なので $4-\\sqrt5$ も解。3解の和は $5$。",
      zh: "有理系数时 $4-\\sqrt5$ 也是根；三根之和为 $5$。"
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
      [[0.6, '−3'], [2.0, '0'], [3.2, '4 − √5'], [4.4, '4'], [5.6, '4 + √5']].forEach(([x, t]) => { F.seg([x, 0.6], [x, 0.8], 'seg'); F.text([x, 0.7], t, 'tick', 0, 16); });
      F.dot([5.6, 0.7]);
      F.reveal = () => {
      F.dot([3.2, 0.7]); F.dot([0.6, 0.7]);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "−3": {"fr": "−3", "es": "−3", "ja": "−3", "zh": "−3"},
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "4 − √5": {"fr": "4 − √5", "es": "4 − √5", "ja": "4 − √5", "zh": "4 − √5"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "4 + √5": {"fr": "4 + √5", "es": "4 + √5", "ja": "4 + √5", "zh": "4 + √5"},
      "is a root": {"fr": "est racine", "es": "es raíz", "ja": "は解", "zh": "是根"},
      "the third root is": {"fr": "la troisième racine est", "es": "la tercera raíz es", "ja": "3つ目の解は", "zh": "第三个根为"},
      "roots": {"fr": "racines", "es": "raíces", "ja": "は解", "zh": "是根"}
    },
    options: [
      { tex: "a+b=20", correct: true, why: {
        en: "$(x+3)(x^2-8x+11)=x^3-5x^2-13x+33$",
        fr: "$(x+3)(x^2-8x+11)=x^3-5x^2-13x+33$",
        es: "$(x+3)(x^2-8x+11)=x^3-5x^2-13x+33$",
        ja: "$(x+3)(x^2-8x+11)=x^3-5x^2-13x+33$",
        zh: "$(x+3)(x^2-8x+11)=x^3-5x^2-13x+33$"
      } },
      { tex: "-3\\ \\text{is a root}", correct: true, why: {
        en: "$5-(4+\\sqrt5)-(4-\\sqrt5)=-3$",
        fr: "$5-(4+\\sqrt5)-(4-\\sqrt5)=-3$",
        es: "$5-(4+\\sqrt5)-(4-\\sqrt5)=-3$",
        ja: "$5-(4+\\sqrt5)-(4-\\sqrt5)=-3$",
        zh: "$5-(4+\\sqrt5)-(4-\\sqrt5)=-3$"
      } },
      { tex: "a+b=17", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=68", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=13", correct: false, why: {
        en: "$a=-13$",
        fr: "$a=-13$",
        es: "$a=-13$",
        ja: "$a=-13$",
        zh: "$a=-13$"
      } },
      { tex: "b=-33", correct: false, why: {
        en: "$b=33$",
        fr: "$b=33$",
        es: "$b=33$",
        ja: "$b=33$",
        zh: "$b=33$"
      } },
      { tex: "\\text{the third root is}\\ 3", correct: false, why: {
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
          en: "Conjugate and Vieta",
          fr: "Conjugué et Viète",
          es: "Conjugado y Vieta",
          ja: "共役と解と係数",
          zh: "共轭与韦达"
        },
        lines: ["4\\pm\\sqrt5\\ \\text{roots},\\quad r_3=5-8=-3"],
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
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["(x+3)(x^2-8x+11)=x^3-5x^2-13x+33\\Rightarrow a+b=20"],
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
