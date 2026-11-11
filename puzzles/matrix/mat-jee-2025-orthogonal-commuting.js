/* matrix · Integer orthogonal matrices that commute with P
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2025-orthogonal-commuting",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.4",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.4",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.4",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Integer orthogonal matrices that commute with P",
      fr: "Matrices orthogonales entières qui commutent avec P",
      es: "Matrices ortogonales enteras que conmutan con P",
      ja: "P と可換な整数直交行列",
      zh: "与 P 可交换的整数正交矩阵"
    },
    statement: {
      en: "$P=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$. <b>Which of the following equal the number of $3\\times3$ integer matrices $Q$ with $Q^{-1}=Q^{T}$ and $PQ=QP$?</b>",
      fr: "$P=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$. <b>Lesquelles des valeurs suivantes sont égales au nombre de matrices entières $3\\times3$ $Q$ telles que $Q^{-1}=Q^{T}$ et $PQ=QP$ ?</b>",
      es: "$P=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$. <b>¿Cuáles de los siguientes valores son iguales al número de matrices enteras $3\\times3$ $Q$ con $Q^{-1}=Q^{T}$ y $PQ=QP$?</b>",
      ja: "$P=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$ とします。<b>$Q^{-1}=Q^{T}$ かつ $PQ=QP$ を満たす $3\\times3$ 整数行列 $Q$ の個数に等しいものはどれですか？</b>",
      zh: "设 $P=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$。<b>满足 $Q^{-1}=Q^{T}$ 且 $PQ=QP$ 的 $3\\times3$ 整数矩阵 $Q$ 的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "The matrix P, with its repeated eigenvalue 2 block highlighted.",
      fr: "La matrice P avec le bloc de la valeur propre double 2 en surbrillance.",
      es: "La matriz P con el bloque del valor propio doble 2 resaltado.",
      ja: "重複固有値 2 のブロックを強調した行列 P。",
      zh: "突出二重特征值 2 所在块的矩阵 P。"
    },
    hint: {
      en: "Commuting with $P$ forces $Q$ to be block diagonal: a $2\\times2$ block and a $1\\times1$ block. Integer orthogonal blocks are signed permutation matrices.",
      fr: "Commuter avec $P$ force $Q$ à être diagonale par blocs : un bloc $2\\times2$ et un bloc $1\\times1$. Les blocs orthogonaux entiers sont des matrices de permutation signées.",
      es: "Conmutar con $P$ obliga a $Q$ a ser diagonal por bloques: un bloque $2\\times2$ y uno $1\\times1$. Los bloques ortogonales enteros son permutaciones con signo.",
      ja: "$P$ と可換なら $Q$ は $2\\times2$ と $1\\times1$ のブロック対角。整数直交ブロックは符号付き置換行列。",
      zh: "与 $P$ 可交换迫使 $Q$ 为 $2\\times2$ 与 $1\\times1$ 的分块对角阵；整数正交块是带符号的置换矩阵。"
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
      F.mx = matrix(F, [0.4, 2.4], [['2', '0', '0'], ['0', '2', '0'], ['0', '0', '3']], { cw: 0.8, ch: 0.7 });
      F.rect(0.44, 2.4 - 1.4 + 0.04, 1.52, 1.32, 'mxh fill-yellow', 'fills');
      F.reveal = () => {
      F.mx.box(2, 2, 'fill-pink');
      };
      return F;
    },
    options: [
      { tex: "16", correct: true, why: {
        en: "$8$ signed $2\\times2$ permutations times $2$ signs for the last entry.",
        fr: "$8$ permutations signées $2\\times2$ fois $2$ signes pour la dernière entrée.",
        es: "$8$ permutaciones con signo $2\\times2$ por $2$ signos de la última entrada.",
        ja: "$2\\times2$ の符号付き置換 $8$ 個 × 最後の成分の符号 $2$。",
        zh: "$8$ 个 $2\\times2$ 带符号置换 × 最后一项 $2$ 种符号。"
      } },
      { tex: "2^4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "32", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "24", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "48", correct: false, why: {
        en: "That counts all $3\\times3$ signed permutations, but most do not commute with $P$.",
        fr: "C’est le nombre de toutes les permutations signées $3\\times3$ ; la plupart ne commutent pas avec $P$.",
        es: "Son todas las permutaciones con signo $3\\times3$; la mayoría no conmuta con $P$.",
        ja: "$3\\times3$ の符号付き置換すべての数。多くは $P$ と可換でない。",
        zh: "那是全部 $3\\times3$ 带符号置换，多数与 $P$ 不可交换。"
      } },
      { tex: "4", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "12", correct: false, why: {
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
          en: "Commuting",
          fr: "Commuter",
          es: "Conmutar",
          ja: "可換性",
          zh: "可交换"
        },
        lines: ["(PQ-QP)_{ij}=(p_i-p_j)q_{ij}=0\\ \\Rightarrow\\ q_{13}=q_{23}=q_{31}=q_{32}=0"],
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
          en: "Integer orthogonal blocks",
          fr: "Blocs orthogonaux entiers",
          es: "Bloques ortogonales enteros",
          ja: "整数直交ブロック",
          zh: "整数正交块"
        },
        lines: ["2\\times2:\\ 2!\\cdot2^2=8,\\qquad1\\times1:\\ \\pm1,\\qquad8\\cdot2=\\boxed{16}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Each row of an integer orthogonal matrix has a single $\\pm1$.",
          fr: "Chaque ligne d’une matrice orthogonale entière a un seul $\\pm1$.",
          es: "Cada fila de una matriz ortogonal entera tiene un único $\\pm1$.",
          ja: "整数直交行列の各行には $\\pm1$ が1つだけ。",
          zh: "整数正交矩阵每行只有一个 $\\pm1$。"
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
