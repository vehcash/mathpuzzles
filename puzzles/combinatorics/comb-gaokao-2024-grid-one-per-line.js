/* combinatorics · One cell in each row and column
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-gaokao-2024-grid-one-per-line",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 14",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 14",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 14",
        ja: "2024年 中国・高考 新課程標準II卷 第14問",
        zh: "2024年高考数学新课标II卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "One cell in each row and column",
      fr: "Une case par ligne et par colonne",
      es: "Una casilla por fila y por columna",
      ja: "各行各列に1マス",
      zh: "每行每列各一格"
    },
    statement: {
      en: "In the $4\\times4$ table below, choose $4$ cells so that each row and each column contains exactly one chosen cell. <b>Which of the following statements are true?</b>",
      fr: "Dans le tableau $4\\times4$ ci-dessous, on choisit $4$ cases de sorte que chaque ligne et chaque colonne contienne exactement une case choisie. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "En la tabla $4\\times4$ de abajo se eligen $4$ casillas de modo que cada fila y cada columna contenga exactamente una casilla elegida. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "下の $4\\times4$ の表から、各行・各列にちょうど1つずつとなるように $4$ マスを選びます。<b>次のうち正しいものはどれですか？</b>",
      zh: "在下面 $4\\times4$ 的方格表中选 $4$ 个方格，要求每行和每列均恰有一个方格被选中。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "The table with rows 11 21 31 40 / 12 22 33 42 / 13 22 33 43 / 15 24 34 44.",
      fr: "Le tableau de lignes 11 21 31 40 / 12 22 33 42 / 13 22 33 43 / 15 24 34 44.",
      es: "La tabla con filas 11 21 31 40 / 12 22 33 42 / 13 22 33 43 / 15 24 34 44.",
      ja: "行が 11 21 31 40 / 12 22 33 42 / 13 22 33 43 / 15 24 34 44 の表。",
      zh: "表格各行为 11 21 31 40 / 12 22 33 42 / 13 22 33 43 / 15 24 34 44。"
    },
    hint: {
      en: "Within a column the numbers barely change, so think about which column each row should use. Compare with the main diagonal, $110$.",
      fr: "Dans une colonne les nombres varient peu : demandez-vous quelle colonne chaque ligne doit prendre. Comparez avec la diagonale, $110$.",
      es: "En una columna los números apenas cambian: piensa qué columna debe usar cada fila. Compara con la diagonal, $110$.",
      ja: "列内の数はあまり変わらない。各行がどの列を使うか考え、対角線の和 $110$ と比べる。",
      zh: "同一列中的数变化很小，想想每行该选哪一列。与主对角线之和 $110$ 比较。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.4, scale: 60, pad: 16 });
      const V = [[11, 21, 31, 40], [12, 22, 33, 42], [13, 22, 33, 43], [15, 24, 34, 44]], x0 = 0.4, y0 = 3.1, cw = 0.9, ch = 0.7;
      for (let k = 0; k <= 4; k++) { F.seg([x0 + k * cw, y0], [x0 + k * cw, y0 - 4 * ch], 'seg thin'); F.seg([x0, y0 - k * ch], [x0 + 4 * cw, y0 - k * ch], 'seg thin'); }
      V.forEach((r, i) => r.forEach((v, j) => F.text([x0 + (j + 0.5) * cw, y0 - (i + 0.5) * ch], String(v), 'mx', 0, 1)));
      F.reveal = () => {
      [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([i, j]) => F.rect(x0 + j * cw + 0.05, y0 - (i + 1) * ch + 0.05, cw - 0.1, ch - 0.1, 'fill-yellow', 'fills'));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there are": {"fr": "il y a", "es": "hay", "ja": "選び方は", "zh": "共有"},
      "valid choices": {"fr": "choix valides", "es": "elecciones válidas", "ja": "通り", "zh": "种选法"},
      "the largest possible sum is": {"fr": "la plus grande somme possible est", "es": "la mayor suma posible es", "ja": "和の最大値は", "zh": "和的最大值为"},
      "column bases": {"fr": "bases des colonnes", "es": "bases de las columnas", "ja": "列の基数", "zh": "各列基数"},
      "every choice gets": {"fr": "chaque choix reçoit", "es": "toda elección recibe", "ja": "どの選び方でも", "zh": "每种选法都得"},
      "extras:": {"fr": "restes :", "es": "restos:", "ja": "余り：", "zh": "余数："}
    },
    options: [
      { tex: "\\text{there are}\\ 24\\ \\text{valid choices}", correct: true, why: {
        en: "$4!=24$: row 1 has $4$ columns to pick, row 2 has $3$, …",
        fr: "$4!=24$ : la ligne 1 a $4$ colonnes possibles, la ligne 2 en a $3$, …",
        es: "$4!=24$: la fila 1 tiene $4$ columnas posibles, la fila 2 tiene $3$, …",
        ja: "$4!=24$：1行目は $4$ 通り、2行目は $3$ 通り…",
        zh: "$4!=24$：第一行有 $4$ 种选法，第二行 $3$ 种……"
      } },
      { tex: "\\text{the largest possible sum is}\\ 112", correct: true, why: {
        en: "$21+33+43+15=112$.",
        fr: "$21+33+43+15=112$.",
        es: "$21+33+43+15=112$.",
        ja: "$21+33+43+15=112$.",
        zh: "$21+33+43+15=112$."
      } },
      { tex: "\\text{there are}\\ 16\\ \\text{valid choices}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{there are}\\ 256\\ \\text{valid choices}", correct: false, why: {
        en: "$4^4$ ignores the one-per-column rule.",
        fr: "$4^4$ oublie la règle d’une case par colonne.",
        es: "$4^4$ olvida la regla de una por columna.",
        ja: "$4^4$ は各列1つの条件を無視。",
        zh: "$4^4$ 忽略了每列一个的要求。"
      } },
      { tex: "\\text{the largest possible sum is}\\ 110", correct: false, why: {
        en: "That is the diagonal; it can be beaten.",
        fr: "C’est la diagonale ; on peut faire mieux.",
        es: "Es la diagonal; se puede superar.",
        ja: "対角線の和で、もっと大きくできる。",
        zh: "那是对角线之和，还能更大。"
      } },
      { tex: "\\text{the largest possible sum is}\\ 113", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{the largest possible sum is}\\ 169", correct: false, why: {
        en: "That takes the last column four times.",
        fr: "Cela prend quatre fois la dernière colonne.",
        es: "Toma cuatro veces la última columna.",
        ja: "最後の列を4回使っている。",
        zh: "这是把最后一列用了四次。"
      } },
      { tex: "\\text{the largest possible sum is}\\ 111", correct: false, why: {
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
          en: "Count",
          fr: "Compter",
          es: "Contar",
          ja: "数える",
          zh: "计数"
        },
        lines: ["4\\cdot3\\cdot2\\cdot1=24"],
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
          en: "Split each entry",
          fr: "Décomposer chaque case",
          es: "Descomponer cada casilla",
          ja: "各数を分ける",
          zh: "拆分每个数"
        },
        lines: ["\\text{column bases}\\ 10,20,30,40:\\ \\text{every choice gets}\\ 100", "\\text{extras:}\\ \\begin{smallmatrix}1&1&1&0\\\\2&2&3&2\\\\3&2&3&3\\\\5&4&4&4\\end{smallmatrix}"],
        note: {
          en: "Now maximise the sum of the extras, one per row and column.",
          fr: "Il reste à maximiser la somme des restes, un par ligne et colonne.",
          es: "Falta maximizar la suma de los restos, uno por fila y columna.",
          ja: "残りの数の和を、各行各列1つで最大化する。",
          zh: "只需让余数之和最大，每行每列各一。"
        }
      },
      {
        title: {
          en: "Best extras",
          fr: "Meilleurs restes",
          es: "Mejores restos",
          ja: "最大の余り",
          zh: "余数最大"
        },
        lines: ["1+3+3+5=12\\ \\Rightarrow\\ \\boxed{112}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Row 4 takes its $5$ in column 1, rows 2 and 3 take the two $3$s in columns 3 and 4, row 1 takes column 2. Each row’s largest extra is $1,3,3,5$, so $12$ is an upper bound, and it is reached.",
          fr: "La ligne 4 prend son $5$ en colonne 1, les lignes 2 et 3 les deux $3$ en colonnes 3 et 4, la ligne 1 la colonne 2. Le plus grand reste de chaque ligne vaut $1,3,3,5$ : $12$ est un majorant, atteint.",
          es: "La fila 4 toma su $5$ en la columna 1, las filas 2 y 3 los dos $3$ en las columnas 3 y 4, la fila 1 la columna 2. El mayor resto de cada fila es $1,3,3,5$: $12$ es una cota que se alcanza.",
          ja: "4行目は1列目の $5$、2・3行目は3・4列目の $3$、1行目は2列目。各行の最大の余りは $1,3,3,5$ なので $12$ が上限で、実際に達成される。",
          zh: "第四行取第一列的 $5$，第二、三行取第三、四列的 $3$，第一行取第二列。各行余数最大值为 $1,3,3,5$，故 $12$ 是上界且能取到。"
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
