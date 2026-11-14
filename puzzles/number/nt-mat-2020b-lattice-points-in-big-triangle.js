/* number · Lattice points inside a huge equilateral triangle
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2020b-lattice-points-in-big-triangle",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question I",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question I",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta I",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 I",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Lattice points inside a huge equilateral triangle",
      fr: "Points entiers dans un immense triangle équilatéral",
      es: "Puntos enteros dentro de un enorme triángulo equilátero",
      ja: "巨大な正三角形内部の格子点",
      zh: "巨大正三角形内的整点"
    },
    statement: {
      en: "An equilateral triangle has vertices $(0,0)$, $(1000,0)$ and $(500,500\\sqrt3)$. Let $N$ be the number of points with integer coordinates strictly inside it. You may use $\\sqrt3\\approx1.7321$. <b>Which of the following are true?</b>",
      fr: "Un triangle équilatéral a pour sommets $(0,0)$, $(1000,0)$ et $(500,500\\sqrt3)$. Soit $N$ le nombre de points à coordonnées entières strictement à l’intérieur. On peut utiliser $\\sqrt3\\approx1{,}7321$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un triángulo equilátero tiene vértices $(0,0)$, $(1000,0)$ y $(500,500\\sqrt3)$. Sea $N$ el número de puntos de coordenadas enteras estrictamente en su interior. Puedes usar $\\sqrt3\\approx1{,}7321$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "頂点 $(0,0)$、$(1000,0)$、$(500,500\\sqrt3)$ の正三角形の内部（境界を除く）にある格子点の個数を $N$ とします。$\\sqrt3\\approx1.7321$ を用いてよい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "正三角形顶点为 $(0,0)$、$(1000,0)$、$(500,500\\sqrt3)$。设严格位于其内部的整点个数为 $N$。可用 $\\sqrt3\\approx1.7321$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The triangle with a vertical column of lattice points at x = k.",
      fr: "Le triangle avec une colonne de points entiers en x = k.",
      es: "El triángulo con una columna de puntos enteros en x = k.",
      ja: "三角形と x = k の格子点の縦の列。",
      zh: "三角形及 x = k 处的一列整点。"
    },
    hint: {
      en: "In column $x=k$ ($1\\le k\\le500$) the height is $k\\sqrt3$, irrational, so it holds $\\lfloor k\\sqrt3\\rfloor$ points. Use symmetry and $\\sum k=125250$.",
      fr: "Dans la colonne $x=k$ ($1\\le k\\le500$) la hauteur est $k\\sqrt3$, irrationnelle : $\\lfloor k\\sqrt3\\rfloor$ points. Utilisez la symétrie et $\\sum k=125250$.",
      es: "En la columna $x=k$ ($1\\le k\\le500$) la altura es $k\\sqrt3$, irracional: $\\lfloor k\\sqrt3\\rfloor$ puntos. Usa la simetría y $\\sum k=125250$.",
      ja: "列 $x=k$（$1\\le k\\le500$）の高さは無理数 $k\\sqrt3$ なので点は $\\lfloor k\\sqrt3\\rfloor$ 個。対称性と $\\sum k=125250$ を使う。",
      zh: "列 $x=k$（$1\\le k\\le500$）高 $k\\sqrt3$ 为无理数，含 $\\lfloor k\\sqrt3\\rfloor$ 个点。利用对称性及 $\\sum k=125250$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 4.6, scale: 50, pad: 16 });
      const A = [0.2, 0.3], B = [5.2, 0.3], C = [2.7, 0.3 + 2.5 * Math.sqrt(3)];
      F.path([A, B, C], 'seg'); F.text(A, '(0,0)', 'tick', 0, 14); F.text(B, '(1000,0)', 'tick', -10, 14);
      F.seg([1.4, 0.3], [1.4, 0.3 + 1.2 * Math.sqrt(3)], 'seg thin dashc');
      for (let j = 1; j <= 7; j++) F.dot([1.4, 0.3 + j * 0.28]);
      F.text([1.4, 0.3], 'x=k', 'tick', 0, 14);
      F.reveal = () => {
      F.text([2.7, 3.2], 'Σ ⌊k√3⌋', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(0,0)": {"fr": "(0,0)", "es": "(0,0)", "ja": "(0,0)", "zh": "(0,0)"},
      "(1000,0)": {"fr": "(1000,0)", "es": "(1000,0)", "ja": "(1000,0)", "zh": "(1000,0)"},
      "x=k": {"fr": "x=k", "es": "x=k", "ja": "x=k", "zh": "x=k"},
      "Σ ⌊k√3⌋": {"fr": "Σ ⌊k√3⌋", "es": "Σ ⌊k√3⌋", "ja": "Σ ⌊k√3⌋", "zh": "Σ ⌊k√3⌋"},
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "column": {"fr": "la colonne", "es": "la columna", "ja": "列", "zh": "列"},
      "has": {"fr": "contient", "es": "tiene", "ja": "には", "zh": "含"},
      "points for": {"fr": "points pour", "es": "puntos para", "ja": "個の点（次の範囲）", "zh": "个点，当"},
      "points": {"fr": "points", "es": "puntos", "ja": "個の点", "zh": "个点"}
    },
    options: [
      { tex: "N=432\\,512", correct: true, why: {
        en: "Exact count of $2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor$.",
        fr: "Calcul exact de $2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor$.",
        es: "Cálculo exacto de $2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor$.",
        ja: "$2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor$ を正確に数えた値。",
        zh: "$2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor$ 的精确值。"
      } },
      { tex: "N\\approx\\text{area}\\approx433\\,013", correct: false, why: {
        en: "Close, but the boundary and the floors remove about $500$ points.",
        fr: "Proche, mais le bord et les parties entières retirent environ $500$ points.",
        es: "Cerca, pero el borde y las partes enteras quitan unos $500$ puntos.",
        ja: "近いが、境界と切り捨てで約 $500$ 個減る。",
        zh: "接近，但边界和取整去掉约 $500$ 个点。"
      } },
      { tex: "N=432\\,513", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "N=866\\,025", correct: false, why: {
        en: "That is about twice the area: a rectangle, not a triangle.",
        fr: "C’est environ deux fois l’aire : un rectangle, pas un triangle.",
        es: "Es casi el doble del área: un rectángulo, no un triángulo.",
        ja: "面積の約2倍。長方形の数。",
        zh: "约为面积的两倍，是矩形而非三角形。"
      } },
      { tex: "N=866\\,026", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{column}\\ x=k\\ \\text{has}\\ \\lfloor k\\sqrt3\\rfloor\\ \\text{points for}\\ 1\\le k\\le500", correct: true, why: {
        en: "$y$ runs over $1,\\dots,\\lfloor k\\sqrt3\\rfloor$ since $k\\sqrt3$ is never an integer.",
        fr: "$y$ parcourt $1,\\dots,\\lfloor k\\sqrt3\\rfloor$ car $k\\sqrt3$ n’est jamais entier.",
        es: "$y$ recorre $1,\\dots,\\lfloor k\\sqrt3\\rfloor$ porque $k\\sqrt3$ nunca es entero.",
        ja: "$k\\sqrt3$ は整数でないので $y=1,\\dots,\\lfloor k\\sqrt3\\rfloor$。",
        zh: "$k\\sqrt3$ 非整数，$y$ 取 $1,\\dots,\\lfloor k\\sqrt3\\rfloor$。"
      } },
      { tex: "\\text{column}\\ x=k\\ \\text{has}\\ \\lfloor k\\sqrt3\\rfloor-1\\ \\text{points}", correct: false, why: {
        en: "That would be right only if $k\\sqrt3$ were an integer.",
        fr: "Ce serait juste seulement si $k\\sqrt3$ était entier.",
        es: "Solo sería cierto si $k\\sqrt3$ fuera entero.",
        ja: "$k\\sqrt3$ が整数のときだけ正しい。",
        zh: "只有 $k\\sqrt3$ 为整数时才对。"
      } },
      { tex: "N=433\\,013", correct: false, why: {
        en: "That is the area, not the count.",
        fr: "C’est l’aire, pas le nombre de points.",
        es: "Es el área, no el recuento.",
        ja: "面積であって個数ではない。",
        zh: "那是面积，不是个数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Columns",
          fr: "Colonnes",
          es: "Columnas",
          ja: "列ごと",
          zh: "按列"
        },
        lines: ["N=2\\sum_{k=1}^{499}\\lfloor k\\sqrt3\\rfloor+\\lfloor500\\sqrt3\\rfloor"],
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
          en: "Estimate the floors",
          fr: "Estimer les parties entières",
          es: "Estimar las partes enteras",
          ja: "切り捨てを評価",
          zh: "估计取整"
        },
        lines: ["\\sum\\lfloor k\\sqrt3\\rfloor=\\sqrt3\\sum k-\\sum\\{k\\sqrt3\\}\\approx\\sqrt3\\cdot124750-250;\\quad N=432\\,512"],
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
