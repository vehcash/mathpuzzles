/* matrix · Diagonalising A with a scaled matrix
   EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-evau-2024-bcb-inverse-equals-a",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.1",
        fr: "EvAU 2024 (Madrid, Espagne), Matemáticas II, session ordinaire, question B.1",
        es: "EvAU 2024 (Madrid), Matemáticas II, convocatoria ordinaria, pregunta B.1",
        ja: "スペイン EvAU 2024（マドリード）数学 II 通常日程 問 B.1",
        zh: "西班牙 EvAU 2024（马德里）数学 II 常规考试 第 B.1 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "Diagonalising A with a scaled matrix",
      fr: "Diagonaliser A avec une matrice multipliée",
      es: "Diagonalizar A con una matriz escalada",
      ja: "スカラー倍の行列で A を対角化",
      zh: "用数乘矩阵对角化 A"
    },
    statement: {
      en: "$A=\\begin{pmatrix}3&-1&1\\\\1&1&1\\\\1&-1&3\\end{pmatrix}$, $B=\\begin{pmatrix}b&2b&b\\\\2b&3b&b\\\\b&b&b\\end{pmatrix}$, $C=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$, $b\\ne0$. <b>Which of the following are true?</b>",
      fr: "$A=\\begin{pmatrix}3&-1&1\\\\1&1&1\\\\1&-1&3\\end{pmatrix}$, $B=\\begin{pmatrix}b&2b&b\\\\2b&3b&b\\\\b&b&b\\end{pmatrix}$, $C=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$, $b\\ne0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A=\\begin{pmatrix}3&-1&1\\\\1&1&1\\\\1&-1&3\\end{pmatrix}$, $B=\\begin{pmatrix}b&2b&b\\\\2b&3b&b\\\\b&b&b\\end{pmatrix}$, $C=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$, $b\\ne0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A=\\begin{pmatrix}3&-1&1\\\\1&1&1\\\\1&-1&3\\end{pmatrix}$、$B=\\begin{pmatrix}b&2b&b\\\\2b&3b&b\\\\b&b&b\\end{pmatrix}$、$C=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$（$b\\ne0$）とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$A=\\begin{pmatrix}3&-1&1\\\\1&1&1\\\\1&-1&3\\end{pmatrix}$，$B=\\begin{pmatrix}b&2b&b\\\\2b&3b&b\\\\b&b&b\\end{pmatrix}$，$C=\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$，$b\\ne0$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The matrix B with its three columns (1, 2, 1), (2, 3, 1), (1, 1, 1) times b highlighted.",
      fr: "La matrice B avec ses trois colonnes (1, 2, 1), (2, 3, 1), (1, 1, 1) fois b en surbrillance.",
      es: "La matriz B con sus tres columnas (1, 2, 1), (2, 3, 1), (1, 1, 1) por b resaltadas.",
      ja: "列 (1, 2, 1), (2, 3, 1), (1, 1, 1) の b 倍を強調した行列 B。",
      zh: "突出三列 (1, 2, 1)、(2, 3, 1)、(1, 1, 1) 乘 b 的矩阵 B。"
    },
    hint: {
      en: "$BCB^{-1}=A\\iff AB=BC$: each column of $B$ must be an eigenvector of $A$. And $b$ cancels in $BCB^{-1}$.",
      fr: "$BCB^{-1}=A\\iff AB=BC$ : chaque colonne de $B$ doit être vecteur propre de $A$. Et $b$ se simplifie dans $BCB^{-1}$.",
      es: "$BCB^{-1}=A\\iff AB=BC$: cada columna de $B$ debe ser vector propio de $A$. Y $b$ se cancela en $BCB^{-1}$.",
      ja: "$BCB^{-1}=A\\iff AB=BC$。$B$ の各列は $A$ の固有ベクトル。$BCB^{-1}$ で $b$ は消える。",
      zh: "$BCB^{-1}=A\\iff AB=BC$：$B$ 的每列须为 $A$ 的特征向量；且 $b$ 在 $BCB^{-1}$ 中约去。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 2.6, scale: 62, pad: 16 });
      F.mx = matrix(F, [0.4, 2.4], [['b', '2b', 'b'], ['2b', '3b', 'b'], ['b', 'b', 'b']], { cw: 0.85, ch: 0.7 });
      F.reveal = () => {
      F.mx.col(0, 'fill-yellow'); F.mx.col(1, 'fill-yellow'); F.mx.col(2, 'fill-pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"},
      "only for": {"fr": "seulement pour", "es": "solo para", "ja": "のときのみ", "zh": "仅当"},
      "no": {"fr": "aucun", "es": "ningún", "ja": "どの", "zh": "没有"},
      "gives": {"fr": "ne donne", "es": "da", "ja": "でも成り立たない", "zh": "使"},
      "the eigenvalues of": {"fr": "les valeurs propres de", "es": "los valores propios de", "ja": "固有値：", "zh": "特征值："},
      "are": {"fr": "sont", "es": "son", "ja": "は", "zh": "为"}
    },
    options: [
      { tex: "BCB^{-1}=A\\ \\text{for every}\\ b\\ne0", correct: true, why: {
        en: "$A(1,2,1)=2(1,2,1)$, $A(2,3,1)=2(2,3,1)$, $A(1,1,1)=3(1,1,1)$, and $b$ cancels.",
        fr: "$A(1,2,1)=2(1,2,1)$, $A(2,3,1)=2(2,3,1)$, $A(1,1,1)=3(1,1,1)$, et $b$ se simplifie.",
        es: "$A(1,2,1)=2(1,2,1)$, $A(2,3,1)=2(2,3,1)$, $A(1,1,1)=3(1,1,1)$, y $b$ se cancela.",
        ja: "$A(1,2,1)=2(1,2,1)$、$A(2,3,1)=2(2,3,1)$、$A(1,1,1)=3(1,1,1)$ で $b$ は消える。",
        zh: "$A(1,2,1)=2(1,2,1)$，$A(2,3,1)=2(2,3,1)$，$A(1,1,1)=3(1,1,1)$，$b$ 约去。"
      } },
      { tex: "\\det(AA^{t})=144", correct: true, why: {
        en: "$\\det A=12$ and $\\det(AA^t)=(\\det A)^2$.",
        fr: "$\\det A=12$ et $\\det(AA^t)=(\\det A)^2$.",
        es: "$\\det A=12$ y $\\det(AA^t)=(\\det A)^2$.",
        ja: "$\\det A=12$、$\\det(AA^t)=(\\det A)^2$。",
        zh: "$\\det A=12$，$\\det(AA^t)=(\\det A)^2$。"
      } },
      { tex: "BCB^{-1}=A\\ \\text{only for}\\ b=1", correct: false, why: {
        en: "$B=bM$ gives $BCB^{-1}=MCM^{-1}$ for any $b\\ne0$.",
        fr: "$B=bM$ donne $BCB^{-1}=MCM^{-1}$ pour tout $b\\ne0$.",
        es: "$B=bM$ da $BCB^{-1}=MCM^{-1}$ para todo $b\\ne0$.",
        ja: "$B=bM$ なら任意の $b\\ne0$ で $BCB^{-1}=MCM^{-1}$。",
        zh: "$B=bM$，对任意 $b\\ne0$ 有 $BCB^{-1}=MCM^{-1}$。"
      } },
      { tex: "\\text{no}\\ b\\ne0\\ \\text{gives}\\ BCB^{-1}=A", correct: false, why: {
        en: "All of them do.",
        fr: "Toutes conviennent.",
        es: "Todas valen.",
        ja: "すべて成り立つ。",
        zh: "所有都满足。"
      } },
      { tex: "\\det(AA^{t})=24", correct: false, why: {
        en: "That is $2\\det A$; the determinant of a product multiplies.",
        fr: "C’est $2\\det A$ ; le déterminant d’un produit se multiplie.",
        es: "Es $2\\det A$; el determinante de un producto se multiplica.",
        ja: "$2\\det A$。積の行列式は掛け算。",
        zh: "那是 $2\\det A$；乘积行列式应相乘。"
      } },
      { tex: "\\det A=0", correct: false, why: {
        en: "$\\det A=12$.",
        fr: "$\\det A=12$.",
        es: "$\\det A=12$.",
        ja: "$\\det A=12$。",
        zh: "$\\det A=12$。"
      } },
      { tex: "\\text{the eigenvalues of}\\ A\\ \\text{are}\\ 1,2,3", correct: false, why: {
        en: "They are $2,2,3$, the diagonal of $C$.",
        fr: "Ce sont $2,2,3$, la diagonale de $C$.",
        es: "Son $2,2,3$, la diagonal de $C$.",
        ja: "$C$ の対角成分 $2,2,3$。",
        zh: "是 $C$ 的对角元 $2,2,3$。"
      } },
      { tex: "\\det(AA^{t})=12", correct: false, why: {
        en: "That is $\\det A$ itself.",
        fr: "C’est $\\det A$ lui-même.",
        es: "Es el propio $\\det A$.",
        ja: "$\\det A$ そのもの。",
        zh: "那就是 $\\det A$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Eigenvectors",
          fr: "Vecteurs propres",
          es: "Vectores propios",
          ja: "固有ベクトル",
          zh: "特征向量"
        },
        lines: ["A\\begin{pmatrix}1\\\\2\\\\1\\end{pmatrix}=2\\begin{pmatrix}1\\\\2\\\\1\\end{pmatrix},\\ A\\begin{pmatrix}2\\\\3\\\\1\\end{pmatrix}=2\\begin{pmatrix}2\\\\3\\\\1\\end{pmatrix},\\ A\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}=3\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}"],
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
          en: "b cancels",
          fr: "b se simplifie",
          es: "b se cancela",
          ja: "b は消える",
          zh: "b 约去"
        },
        lines: ["B=bM:\\ BCB^{-1}=bMC\\tfrac1bM^{-1}=MCM^{-1}=A"],
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
          en: "Determinant",
          fr: "Déterminant",
          es: "Determinante",
          ja: "行列式",
          zh: "行列式"
        },
        lines: ["\\det A=3\\cdot4+1\\cdot2+1\\cdot(-2)=12,\\qquad\\det(AA^t)=144"],
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
