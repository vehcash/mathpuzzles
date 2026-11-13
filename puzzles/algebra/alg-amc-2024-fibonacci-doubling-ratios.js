/* algebra · Fibonacci ratios that turn into Lucas numbers
   AMC 12B 2024 (Mathematical Association of America), Problem 18 (also AMC 10B Problem 23) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-amc-2024-fibonacci-doubling-ratios",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 18 (also AMC 10B Problem 23)",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 18 (aussi AMC 10B, problème 23)",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 18 (también AMC 10B, problema 23)",
        ja: "AMC 12B 2024（アメリカ数学協会）第18問（AMC 10B 第23問と共通）",
        zh: "AMC 12B 2024（美国数学协会）第 18 题（亦为 AMC 10B 第 23 题）"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Fibonacci ratios that turn into Lucas numbers",
      fr: "Rapports de Fibonacci qui deviennent des nombres de Lucas",
      es: "Cocientes de Fibonacci que se vuelven números de Lucas",
      ja: "リュカ数になるフィボナッチの比",
      zh: "变成卢卡斯数的斐波那契比值"
    },
    statement: {
      en: "With $F_1=F_2=1$ and $F_{n+2}=F_{n+1}+F_n$, <b>which of the following are true about $\\displaystyle\\sum_{n=1}^{10}\\frac{F_{2n}}{F_n}$?</b>",
      fr: "Avec $F_1=F_2=1$ et $F_{n+2}=F_{n+1}+F_n$, <b>lesquelles des affirmations suivantes sont vraies pour $\\displaystyle\\sum_{n=1}^{10}\\frac{F_{2n}}{F_n}$ ?</b>",
      es: "Con $F_1=F_2=1$ y $F_{n+2}=F_{n+1}+F_n$, <b>¿cuáles de las siguientes afirmaciones son verdaderas sobre $\\displaystyle\\sum_{n=1}^{10}\\frac{F_{2n}}{F_n}$?</b>",
      ja: "$F_1=F_2=1$、$F_{n+2}=F_{n+1}+F_n$ のとき、<b>$\\displaystyle\\sum_{n=1}^{10}\\frac{F_{2n}}{F_n}$ について正しいものはどれですか？</b>",
      zh: "$F_1=F_2=1$，$F_{n+2}=F_{n+1}+F_n$。<b>关于 $\\displaystyle\\sum_{n=1}^{10}\\frac{F_{2n}}{F_n}$，下列哪些正确？</b>"
    },
    figureText: {
      en: "Two rows: Fibonacci numbers and the ratios F₂ₙ/Fₙ below them.",
      fr: "Deux lignes : les nombres de Fibonacci et les rapports F₂ₙ/Fₙ dessous.",
      es: "Dos filas: los números de Fibonacci y debajo los cocientes F₂ₙ/Fₙ.",
      ja: "2行：フィボナッチ数とその下の比 F₂ₙ/Fₙ。",
      zh: "两行：斐波那契数及其下方的比值 F₂ₙ/Fₙ。"
    },
    hint: {
      en: "Compute the first ratios: $1,3,4,7,\\dots$ — what rule do they follow?",
      fr: "Calculez les premiers rapports : $1,3,4,7,\\dots$ — quelle règle suivent-ils ?",
      es: "Calcula los primeros cocientes: $1,3,4,7,\\dots$ — ¿qué regla siguen?",
      ja: "最初の比 $1,3,4,7,\\dots$ はどんな規則？",
      zh: "算出前几个比值 $1,3,4,7,\\dots$，它们遵循什么规律？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 16 });
      ['1', '1', '2', '3', '5', '8', '13', '21', '34', '55'].forEach((t, k) => F.text([0.4 + k * 0.62, 1.2], t, 'len small', 0, 0));
      F.reveal = () => {
      ['1', '3', '4', '7', '11', '18', '29', '47', '76', '123'].forEach((t, k) => F.text([0.4 + k * 0.62, 0.45], t, 'len small', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "5": {"fr": "5", "es": "5", "ja": "5", "zh": "5"},
      "8": {"fr": "8", "es": "8", "ja": "8", "zh": "8"},
      "13": {"fr": "13", "es": "13", "ja": "13", "zh": "13"},
      "21": {"fr": "21", "es": "21", "ja": "21", "zh": "21"},
      "34": {"fr": "34", "es": "34", "ja": "34", "zh": "34"},
      "55": {"fr": "55", "es": "55", "ja": "55", "zh": "55"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "7": {"fr": "7", "es": "7", "ja": "7", "zh": "7"},
      "11": {"fr": "11", "es": "11", "ja": "11", "zh": "11"},
      "18": {"fr": "18", "es": "18", "ja": "18", "zh": "18"},
      "29": {"fr": "29", "es": "29", "ja": "29", "zh": "29"},
      "47": {"fr": "47", "es": "47", "ja": "47", "zh": "47"},
      "76": {"fr": "76", "es": "76", "ja": "76", "zh": "76"},
      "123": {"fr": "123", "es": "123", "ja": "123", "zh": "123"},
      "the sum is": {"fr": "la somme vaut", "es": "la suma es", "ja": "和は", "zh": "和为"},
      "is not always an integer": {"fr": "n’est pas toujours entier", "es": "no siempre es entero", "ja": "は常に整数とは限らない", "zh": "不总是整数"}
    },
    options: [
      { tex: "\\text{the sum is}\\ 319", correct: true, why: {
        en: "$1+3+4+7+11+18+29+47+76+123$",
        fr: "$1+3+4+7+11+18+29+47+76+123$",
        es: "$1+3+4+7+11+18+29+47+76+123$",
        ja: "$1+3+4+7+11+18+29+47+76+123$",
        zh: "$1+3+4+7+11+18+29+47+76+123$"
      } },
      { tex: "\\frac{F_{2n}}{F_n}=F_{n-1}+F_{n+1}", correct: true, why: {
        en: "From $F_{2n}=F_n(F_{n-1}+F_{n+1})$; these are the Lucas numbers.",
        fr: "Car $F_{2n}=F_n(F_{n-1}+F_{n+1})$ : ce sont les nombres de Lucas.",
        es: "Porque $F_{2n}=F_n(F_{n-1}+F_{n+1})$: son los números de Lucas.",
        ja: "$F_{2n}=F_n(F_{n-1}+F_{n+1})$ より。リュカ数。",
        zh: "由 $F_{2n}=F_n(F_{n-1}+F_{n+1})$，即卢卡斯数。"
      } },
      { tex: "\\text{the sum is}\\ 322", correct: false, why: {
        en: "$322=L_{12}$; the sum is $L_{12}-3$.",
        fr: "$322=L_{12}$ ; la somme vaut $L_{12}-3$.",
        es: "$322=L_{12}$; la suma es $L_{12}-3$.",
        ja: "$322=L_{12}$。和は $L_{12}-3$。",
        zh: "$322=L_{12}$，和为 $L_{12}-3$。"
      } },
      { tex: "\\text{the sum is}\\ 318", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the sum is}\\ 320", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\frac{F_{2n}}{F_n}=2F_n", correct: false, why: {
        en: "$n=4$: $\\tfrac{21}{3}=7\\ne2\\cdot3$",
        fr: "$n=4$: $\\tfrac{21}{3}=7\\ne2\\cdot3$",
        es: "$n=4$: $\\tfrac{21}{3}=7\\ne2\\cdot3$",
        ja: "$n=4$: $\\tfrac{21}{3}=7\\ne2\\cdot3$",
        zh: "$n=4$: $\\tfrac{21}{3}=7\\ne2\\cdot3$"
      } },
      { tex: "\\frac{F_{2n}}{F_n}\\ \\text{is not always an integer}", correct: false, why: {
        en: "$F_n$ always divides $F_{2n}$.",
        fr: "$F_n$ divise toujours $F_{2n}$.",
        es: "$F_n$ siempre divide a $F_{2n}$.",
        ja: "$F_n$ は常に $F_{2n}$ を割る。",
        zh: "$F_n$ 总整除 $F_{2n}$。"
      } },
      { tex: "\\text{the sum is}\\ 321", correct: false, why: {
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
          en: "Ratios",
          fr: "Rapports",
          es: "Cocientes",
          ja: "比",
          zh: "比值"
        },
        lines: ["\\frac{F_{2n}}{F_n}=L_n:\\ 1,3,4,7,11,18,29,47,76,123"],
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
          en: "Sum",
          fr: "Somme",
          es: "Suma",
          ja: "和",
          zh: "求和"
        },
        lines: ["\\sum_{n=1}^{10}L_n=L_{12}-3=322-3=319"],
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
