/* matrix · 0–1 matrices with determinant ±1
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2024-binary-det-plus-minus-1",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.10",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.10",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.10",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.10"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "0–1 matrices with determinant ±1",
      fr: "Matrices 0–1 de déterminant ±1",
      es: "Matrices 0–1 con determinante ±1",
      ja: "行列式が ±1 の 0–1 行列",
      zh: "行列式为 ±1 的 0–1 矩阵"
    },
    statement: {
      en: "$S=\\left\\{A=\\begin{pmatrix}0&1&c\\\\1&a&d\\\\1&b&e\\end{pmatrix}: a,b,c,d,e\\in\\{0,1\\},\\ |A|\\in\\{-1,1\\}\\right\\}$. <b>Which of the following equal the number of elements of $S$?</b>",
      fr: "$S=\\left\\{A=\\begin{pmatrix}0&1&c\\\\1&a&d\\\\1&b&e\\end{pmatrix}: a,b,c,d,e\\in\\{0,1\\},\\ |A|\\in\\{-1,1\\}\\right\\}$. <b>Lesquelles des valeurs suivantes sont égales au nombre d’éléments de $S$ ?</b>",
      es: "$S=\\left\\{A=\\begin{pmatrix}0&1&c\\\\1&a&d\\\\1&b&e\\end{pmatrix}: a,b,c,d,e\\in\\{0,1\\},\\ |A|\\in\\{-1,1\\}\\right\\}$. <b>¿Cuáles de los siguientes valores son iguales al número de elementos de $S$?</b>",
      ja: "$S=\\left\\{A=\\begin{pmatrix}0&1&c\\\\1&a&d\\\\1&b&e\\end{pmatrix}: a,b,c,d,e\\in\\{0,1\\},\\ |A|\\in\\{-1,1\\}\\right\\}$ とします。<b>$S$ の元の個数に等しいものはどれですか？</b>",
      zh: "$S=\\left\\{A=\\begin{pmatrix}0&1&c\\\\1&a&d\\\\1&b&e\\end{pmatrix}: a,b,c,d,e\\in\\{0,1\\},\\ |A|\\in\\{-1,1\\}\\right\\}$。<b>下列哪些等于 $S$ 中元素的个数？</b>"
    },
    figureText: {
      en: "The matrix with the five free entries a, b, c, d, e highlighted.",
      fr: "La matrice avec les cinq entrées libres a, b, c, d, e en surbrillance.",
      es: "La matriz con las cinco entradas libres a, b, c, d, e resaltadas.",
      ja: "自由な5成分 a, b, c, d, e を強調した行列。",
      zh: "突出五个自由元素 a、b、c、d、e 的矩阵。"
    },
    hint: {
      en: "Expand along the first row: $|A|=(d-e)+c(b-a)$.",
      fr: "Développez selon la première ligne : $|A|=(d-e)+c(b-a)$.",
      es: "Desarrolla por la primera fila: $|A|=(d-e)+c(b-a)$.",
      ja: "1行目で展開：$|A|=(d-e)+c(b-a)$。",
      zh: "按第一行展开：$|A|=(d-e)+c(b-a)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 2.6, scale: 64, pad: 16 });
      F.mx = matrix(F, [0.4, 2.4], [['0', '1', 'c'], ['1', 'a', 'd'], ['1', 'b', 'e']], { cw: 0.8, ch: 0.7 });
      [[0, 2], [1, 1], [1, 2], [2, 1], [2, 2]].forEach(([i, j]) => F.mx.box(i, j, 'fill-yellow'));
      F.reveal = () => {
      F.text([1.6, 0.1], '|A| = (d − e) + c(b − a)', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "|A| = (d − e) + c(b − a)": {"fr": "|A| = (d − e) + c(b − a)", "es": "|A| = (d − e) + c(b − a)", "ja": "|A| = (d − e) + c(b − a)", "zh": "|A| = (d − e) + c(b − a)"},
      "ways": {"fr": "façons", "es": "maneras", "ja": "通り", "zh": "种"},
      "free": {"fr": "libres", "es": "libres", "ja": "は自由", "zh": "任意"},
      "one difference is": {"fr": "une différence vaut", "es": "una diferencia vale", "ja": "一方の差は", "zh": "一个差为"},
      "the other": {"fr": "l’autre", "es": "la otra", "ja": "もう一方は", "zh": "另一个为"},
      "total": {"fr": "total", "es": "total", "ja": "合計", "zh": "共"}
    },
    options: [
      { tex: "16", correct: true, why: {
        en: "$c=0$: $d\\ne e$, $4$ choices of $(a,b)$ → $8$. $c=1$: $(d-e)+(b-a)=\\pm1$ → $8$.",
        fr: "$c=0$ : $d\\ne e$, $4$ choix de $(a,b)$ → $8$. $c=1$ : $(d-e)+(b-a)=\\pm1$ → $8$.",
        es: "$c=0$: $d\\ne e$, $4$ opciones de $(a,b)$ → $8$. $c=1$: $(d-e)+(b-a)=\\pm1$ → $8$.",
        ja: "$c=0$：$d\\ne e$ で $(a,b)$ は $4$ 通り → $8$。$c=1$：$(d-e)+(b-a)=\\pm1$ → $8$。",
        zh: "$c=0$：$d\\ne e$，$(a,b)$ 有 $4$ 种 → $8$；$c=1$：$(d-e)+(b-a)=\\pm1$ → $8$。"
      } },
      { tex: "2^4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "32", correct: false, why: {
        en: "That is every choice of the five entries.",
        fr: "C’est le nombre total de choix des cinq entrées.",
        es: "Es el total de elecciones de las cinco entradas.",
        ja: "5成分のすべての選び方。",
        zh: "那是五个元素的全部取法。"
      } },
      { tex: "8", correct: false, why: {
        en: "That counts only $c=0$.",
        fr: "Cela ne compte que $c=0$.",
        es: "Solo cuenta $c=0$.",
        ja: "$c=0$ だけ数えている。",
        zh: "只数了 $c=0$。"
      } },
      { tex: "12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "20", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "24", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "14", correct: false, why: {
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
          en: "Determinant",
          fr: "Déterminant",
          es: "Determinante",
          ja: "行列式",
          zh: "行列式"
        },
        lines: ["|A|=0-1\\cdot(e-d)+c(b-a)=(d-e)+c(b-a)"],
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
          en: "c = 0",
          fr: "c = 0",
          es: "c = 0",
          ja: "c = 0",
          zh: "c = 0"
        },
        lines: ["d-e=\\pm1:\\ 2\\ \\text{ways},\\ a,b\\ \\text{free}:\\ 2\\cdot4=8"],
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
          en: "c = 1",
          fr: "c = 1",
          es: "c = 1",
          ja: "c = 1",
          zh: "c = 1"
        },
        lines: ["(d-e)+(b-a)=\\pm1:\\ \\text{one difference is}\\ \\pm1,\\ \\text{the other}\\ 0:\\ 8\\ \\text{ways}", "\\text{total}\\ \\boxed{16}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Each difference is $0$ in $2$ ways and $\\pm1$ in $1$ way each.",
          fr: "Chaque différence vaut $0$ de $2$ façons et $\\pm1$ d’une façon chacun.",
          es: "Cada diferencia vale $0$ de $2$ maneras y $\\pm1$ de $1$ manera cada uno.",
          ja: "各差は $0$ が $2$ 通り、$\\pm1$ が各 $1$ 通り。",
          zh: "每个差为 $0$ 有 $2$ 种，为 $\\pm1$ 各 $1$ 种。"
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
