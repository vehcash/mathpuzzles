/* combinatorics · Isosceles triangles with longest side 2025
   AMC 10A 2025 (Mathematical Association of America), Problem 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2025-isosceles-longest-2025",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10A 2025 (Mathematical Association of America), Problem 3",
        fr: "AMC 10A 2025 (Mathematical Association of America), problème 3",
        es: "AMC 10A 2025 (Mathematical Association of America), problema 3",
        ja: "AMC 10A 2025（アメリカ数学協会）第3問",
        zh: "AMC 10A 2025（美国数学协会）第 3 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "Isosceles triangles with longest side 2025",
      fr: "Triangles isocèles de plus grand côté 2025",
      es: "Triángulos isósceles de lado mayor 2025",
      ja: "最長辺2025の二等辺三角形",
      zh: "最长边为 2025 的等腰三角形"
    },
    statement: {
      en: "<b>Which of the following equal the number of isosceles triangles with positive area, integer sides and longest side exactly $2025$?</b> (Equilateral triangles count as isosceles.)",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de triangles isocèles d’aire non nulle, à côtés entiers, dont le plus grand côté vaut exactement $2025$ ?</b> (Les triangles équilatéraux comptent comme isocèles.)",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de triángulos isósceles de área positiva, lados enteros y lado mayor exactamente $2025$?</b> (Los equiláteros cuentan como isósceles.)",
      ja: "<b>面積が正で辺の長さが整数、最長辺がちょうど $2025$ の二等辺三角形の個数に等しいものはどれですか？</b>（正三角形も二等辺三角形に含める）",
      zh: "<b>下列哪些等于面积为正、边长为整数、最长边恰为 $2025$ 的等腰三角形的个数？</b>（等边三角形也算等腰三角形。）"
    },
    figureText: {
      en: "Two kinds of isosceles triangle: tall with two sides 2025, and wide with base 2025.",
      fr: "Deux sortes de triangles isocèles : hauts avec deux côtés 2025, larges avec une base 2025.",
      es: "Dos tipos de triángulo isósceles: altos con dos lados de 2025 y anchos con base 2025.",
      ja: "2辺が2025の高い形と、底辺が2025の広い形。",
      zh: "两类等腰三角形：两腰为 2025 的高三角形与底为 2025 的宽三角形。"
    },
    hint: {
      en: "Case 1: the two equal sides are $2025$. Case 2: the base is $2025$ and the equal sides $a<2025$ need $2a>2025$. Don’t forget the equilateral one.",
      fr: "Cas 1 : les côtés égaux valent $2025$. Cas 2 : la base vaut $2025$ et les côtés égaux $a<2025$ vérifient $2a>2025$. N’oubliez pas l’équilatéral.",
      es: "Caso 1: los lados iguales miden $2025$. Caso 2: la base es $2025$ y los lados iguales $a<2025$ cumplen $2a>2025$. No olvides el equilátero.",
      ja: "場合1：等辺が $2025$。場合2：底辺 $2025$、等辺 $a<2025$ は $2a>2025$。正三角形も忘れずに。",
      zh: "情形 1：两腰为 $2025$；情形 2：底为 $2025$，腰 $a<2025$ 需 $2a>2025$。别忘了等边三角形。"
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
      F.path([[0.8, 0.3], [1.8, 0.3], [1.3, 2.1]], 'graph', 'base', true); F.text([1.05, 1.2], '2025', 'len small', -30, 0);
      F.path([[2.0, 0.3], [4.7, 0.3], [3.35, 1.2]], 'conic', 'base', true); F.text([3.35, 0.3], '2025', 'len small', 0, 14);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2025": {"fr": "2025", "es": "2025", "ja": "2025", "zh": "2025"}
    },
    options: [
      { tex: "3037", correct: true, why: {
        en: "$2024+1012+1$",
        fr: "$2024+1012+1$",
        es: "$2024+1012+1$",
        ja: "$2024+1012+1$",
        zh: "$2024+1012+1$"
      } },
      { tex: "2024+1012+1", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "2025", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2026", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3012", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4050", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3036", correct: false, why: {
        en: "That forgets the equilateral triangle.",
        fr: "Oubli du triangle équilatéral.",
        es: "Olvida el equilátero.",
        ja: "正三角形を忘れている。",
        zh: "漏了等边三角形。"
      } },
      { tex: "3038", correct: false, why: {
        en: "That counts the equilateral triangle twice.",
        fr: "Cela compte l’équilatéral deux fois.",
        es: "Cuenta el equilátero dos veces.",
        ja: "正三角形を2回数えている。",
        zh: "等边三角形算了两次。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two cases",
          fr: "Deux cas",
          es: "Dos casos",
          ja: "2つの場合",
          zh: "两种情形"
        },
        lines: ["(2025,2025,b):\\ 1\\le b\\le2024\\ \\to2024;\\quad(a,a,2025):\\ 1013\\le a\\le2024\\ \\to1012"],
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
          en: "Add the equilateral",
          fr: "Ajouter l’équilatéral",
          es: "Sumar el equilátero",
          ja: "正三角形を加える",
          zh: "加上等边"
        },
        lines: ["2024+1012+1=3037"],
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
