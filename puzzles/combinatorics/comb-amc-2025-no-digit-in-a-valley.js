/* combinatorics · Numbers whose digits never dip
   AMC 12A 2025 (Mathematical Association of America), Problem 23 (also AMC 10A Problem 24) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2025-no-digit-in-a-valley",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 23 (also AMC 10A Problem 24)",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 23 (aussi AMC 10A, problème 24)",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 23 (también AMC 10A, problema 24)",
        ja: "AMC 12A 2025（アメリカ数学協会）第23問（AMC 10A 第24問と共通）",
        zh: "AMC 12A 2025（美国数学协会）第 23 题（亦为 AMC 10A 第 24 题）"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Numbers whose digits never dip",
      fr: "Des nombres dont les chiffres ne font jamais de creux",
      es: "Números cuyas cifras nunca hacen valle",
      ja: "数字が谷をつくらない数",
      zh: "数字从不出现“低谷”的数"
    },
    statement: {
      en: "Call a positive integer <i>fair</i> if its digits are distinct and non-zero and no digit is smaller than both of its neighbours (so $196$, $23$, $12463$ are fair; $1546$, $320$, $34321$ are not). <b>Which of the following equal the number of fair integers?</b>",
      fr: "Un entier positif est <i>équitable</i> si ses chiffres sont distincts et non nuls et si aucun chiffre n’est plus petit que ses deux voisins (ainsi $196$, $23$, $12463$ le sont ; $1546$, $320$, $34321$ non). <b>Lesquelles des valeurs suivantes sont égales au nombre d’entiers équitables ?</b>",
      es: "Un entero positivo es <i>justo</i> si sus cifras son distintas y no nulas y ninguna es menor que sus dos vecinas (así $196$, $23$, $12463$ lo son; $1546$, $320$, $34321$ no). <b>¿Cuáles de los siguientes valores son iguales al número de enteros justos?</b>",
      ja: "各桁が相異なる $0$ でない数字で、両隣より小さい桁がない正の整数を「公平」と呼びます（$196$、$23$、$12463$ は公平、$1546$、$320$、$34321$ は違う）。<b>公平な整数の個数に等しいものはどれですか？</b>",
      zh: "若正整数各位数字互不相同且非零，且没有一位比左右两邻都小，则称为“公平数”（如 $196$、$23$、$12463$ 是，$1546$、$320$、$34321$ 不是）。<b>下列哪些等于公平数的个数？</b>"
    },
    figureText: {
      en: "Digit heights of 12463 drawn as bars: they rise and then fall, never dipping.",
      fr: "Les chiffres de 12463 en barres : ils montent puis descendent, sans creux.",
      es: "Las cifras de 12463 como barras: suben y luego bajan, sin valles.",
      ja: "12463 の各桁を棒で：上がって下がり、谷がない。",
      zh: "12463 各位画成条形：先升后降，没有低谷。"
    },
    hint: {
      en: "Place the chosen digits from largest to smallest; each new digit must go at one of the two ends.",
      fr: "Placez les chiffres choisis du plus grand au plus petit ; chaque nouveau chiffre va à l’une des deux extrémités.",
      es: "Coloca las cifras elegidas de mayor a menor; cada nueva va en uno de los dos extremos.",
      ja: "選んだ数字を大きい順に置く。新しい数字は両端のどちらか。",
      zh: "把选出的数字从大到小放，每个新数字只能放在两端之一。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 2.6, scale: 56, pad: 16 });
      [1, 2, 4, 6, 3].forEach((d, k) => { F.rect(0.4 + k * 0.65, 0.4, 0.5, d * 0.3, 'fill-blue', 'fills'); F.text([0.65 + k * 0.65, 0.4], String(d), 'tick', 0, 14); });
      F.reveal = () => {
      F.text([2.0, 2.45], '2ⁿ⁻¹', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2ⁿ⁻¹": {"fr": "2ⁿ⁻¹", "es": "2ⁿ⁻¹", "ja": "2ⁿ⁻¹", "zh": "2ⁿ⁻¹"},
      "digits": {"fr": "chiffres", "es": "cifras", "ja": "桁", "zh": "位数字"},
      "fair orders": {"fr": "ordres équitables", "es": "órdenes justos", "ja": "通りの公平な並び", "zh": "种公平排列"}
    },
    options: [
      { tex: "9841", correct: true, why: {
        en: "$\\sum_{n=1}^9\\binom9n2^{n-1}=\\dfrac{3^9-1}{2}$",
        fr: "$\\sum_{n=1}^9\\binom9n2^{n-1}=\\dfrac{3^9-1}{2}$",
        es: "$\\sum_{n=1}^9\\binom9n2^{n-1}=\\dfrac{3^9-1}{2}$",
        ja: "$\\sum_{n=1}^9\\binom9n2^{n-1}=\\dfrac{3^9-1}{2}$",
        zh: "$\\sum_{n=1}^9\\binom9n2^{n-1}=\\dfrac{3^9-1}{2}$"
      } },
      { tex: "\\tfrac{3^9-1}{2}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "511", correct: false, why: {
        en: "That is $2^9-1$, the number of digit sets.",
        fr: "C’est $2^9-1$, le nombre d’ensembles de chiffres.",
        es: "Es $2^9-1$, el número de conjuntos de cifras.",
        ja: "数字の集合の数 $2^9-1$。",
        zh: "那是数字集合个数 $2^9-1$。"
      } },
      { tex: "2584", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "17711", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "19682", correct: false, why: {
        en: "That is $3^9-1$; it counts each arrangement twice.",
        fr: "C’est $3^9-1$ : chaque arrangement compté deux fois.",
        es: "Es $3^9-1$: cuenta cada disposición dos veces.",
        ja: "$3^9-1$。各並びを2回数えている。",
        zh: "那是 $3^9-1$，每种排列算了两次。"
      } },
      { tex: "3^9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "9841\\cdot2", correct: false, why: {
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
          en: "Per digit set",
          fr: "Par ensemble de chiffres",
          es: "Por conjunto de cifras",
          ja: "数字の集合ごと",
          zh: "每个数字集合"
        },
        lines: ["n\\ \\text{digits}:\\ 2^{n-1}\\ \\text{fair orders}"],
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
          en: "Binomial sum",
          fr: "Somme binomiale",
          es: "Suma binomial",
          ja: "二項和",
          zh: "二项式求和"
        },
        lines: ["\\sum_{n\\ge1}\\binom9n2^{n-1}=\\frac{(1+2)^9-1}{2}=9841"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
