/* matrix · QR = RP with a full matrix R
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2025-qr-equals-rp",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.5",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.5",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.5",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "QR = RP with a full matrix R",
      fr: "QR = RP avec une matrice R pleine",
      es: "QR = RP con una matriz R llena",
      ja: "成分がすべて非零の R で QR = RP",
      zh: "所有元素非零的 R 使 QR = RP"
    },
    statement: {
      en: "$P=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ and $Q=\\begin{pmatrix}x&y\\\\z&4\\end{pmatrix}$ with $x,y,z$ non-zero reals. There is a $2\\times2$ matrix $R$ with all entries non-zero such that $QR=RP$. <b>Which of the following are true?</b>",
      fr: "$P=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ et $Q=\\begin{pmatrix}x&y\\\\z&4\\end{pmatrix}$ avec $x,y,z$ réels non nuls. Il existe une matrice $2\\times2$ $R$ à coefficients tous non nuls telle que $QR=RP$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ y $Q=\\begin{pmatrix}x&y\\\\z&4\\end{pmatrix}$ con $x,y,z$ reales no nulos. Existe una matriz $2\\times2$ $R$ con todas sus entradas no nulas tal que $QR=RP$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$、$Q=\\begin{pmatrix}x&y\\\\z&4\\end{pmatrix}$（$x,y,z$ は $0$ でない実数）。成分がすべて $0$ でない $2\\times2$ 行列 $R$ で $QR=RP$ となるものがあります。<b>次のうち正しいものはどれですか？</b>",
      zh: "$P=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$，$Q=\\begin{pmatrix}x&y\\\\z&4\\end{pmatrix}$，$x,y,z$ 为非零实数。存在元素全不为零的 $2\\times2$ 矩阵 $R$ 使 $QR=RP$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The columns r₁ and r₂ of R drawn as two arrows; Q stretches one by 2 and the other by 3.",
      fr: "Les colonnes r₁ et r₂ de R en deux flèches ; Q étire l’une par 2 et l’autre par 3.",
      es: "Las columnas r₁ y r₂ de R como dos flechas; Q estira una por 2 y la otra por 3.",
      ja: "R の列 r₁, r₂ を矢印で。Q は一方を2倍、他方を3倍に伸ばす。",
      zh: "R 的两列 r₁、r₂ 画成箭头；Q 把一个拉伸 2 倍，另一个拉伸 3 倍。"
    },
    hint: {
      en: "Read $QR=RP$ column by column: $Qr_1=2r_1$ and $Qr_2=3r_2$.",
      fr: "Lisez $QR=RP$ colonne par colonne : $Qr_1=2r_1$ et $Qr_2=3r_2$.",
      es: "Lee $QR=RP$ columna a columna: $Qr_1=2r_1$ y $Qr_2=3r_2$.",
      ja: "$QR=RP$ を列ごとに：$Qr_1=2r_1$、$Qr_2=3r_2$。",
      zh: "按列读 $QR=RP$：$Qr_1=2r_1$，$Qr_2=3r_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.0, scale: 70, pad: 16 });
      const T = F.T = axes(F, -0.5, 3.5, -0.5, 2.5);
      arrow(F, T([0, 0]), T([1, 0.4])); arrow(F, T([0, 0]), T([0.5, 0.7]));
      F.text(T([1, 0.4]), 'r₁', 'pt', 10, 0); F.text(T([0.5, 0.7]), 'r₂', 'pt', -10, -6);
      F.reveal = () => {
      F.seg(T([1, 0.4]), T([2, 0.8]), 'hl pink'); F.seg(T([0.5, 0.7]), T([1.5, 2.1]), 'hl pink');
      F.text(T([2, 0.8]), '×2', 'len small', 12, 0); F.text(T([1.5, 2.1]), '×3', 'len small', 12, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "r₁": {"fr": "r₁", "es": "r₁", "ja": "r₁", "zh": "r₁"},
      "r₂": {"fr": "r₂", "es": "r₂", "ja": "r₂", "zh": "r₂"},
      "×2": {"fr": "×2", "es": "×2", "ja": "×2", "zh": "×2"},
      "×3": {"fr": "×3", "es": "×3", "ja": "×3", "zh": "×3"},
      "must be the identity": {"fr": "doit être l’identité", "es": "debe ser la identidad", "ja": "単位行列でなければならない", "zh": "必须是单位矩阵"}
    },
    options: [
      { tex: "\\det(Q-2I)=0", correct: true, why: {
        en: "$2$ is an eigenvalue of $Q$.",
        fr: "$2$ est valeur propre de $Q$.",
        es: "$2$ es valor propio de $Q$.",
        ja: "$2$ は $Q$ の固有値。",
        zh: "$2$ 是 $Q$ 的特征值。"
      } },
      { tex: "\\det(Q-6I)=12", correct: true, why: {
        en: "Eigenvalues $2,3$: $(2-6)(3-6)=12$.",
        fr: "Valeurs propres $2,3$ : $(2-6)(3-6)=12$.",
        es: "Valores propios $2,3$: $(2-6)(3-6)=12$.",
        ja: "固有値 $2,3$ で $(2-6)(3-6)=12$。",
        zh: "特征值 $2,3$：$(2-6)(3-6)=12$。"
      } },
      { tex: "\\det(Q-3I)=15", correct: false, why: {
        en: "$3$ is an eigenvalue, so it is $0$.",
        fr: "$3$ est valeur propre, donc $0$.",
        es: "$3$ es valor propio, así que da $0$.",
        ja: "$3$ も固有値なので $0$。",
        zh: "$3$ 也是特征值，故为 $0$。"
      } },
      { tex: "yz=2", correct: false, why: {
        en: "$\\det Q=4x-yz=6$ with $x=1$ gives $yz=-2$.",
        fr: "$\\det Q=4x-yz=6$ avec $x=1$ donne $yz=-2$.",
        es: "$\\det Q=4x-yz=6$ con $x=1$ da $yz=-2$.",
        ja: "$\\det Q=4x-yz=6$、$x=1$ で $yz=-2$。",
        zh: "$\\det Q=4x-yz=6$，$x=1$，得 $yz=-2$。"
      } },
      { tex: "x=2", correct: false, why: {
        en: "Trace: $x+4=2+3$, so $x=1$.",
        fr: "Trace : $x+4=2+3$, donc $x=1$.",
        es: "Traza: $x+4=2+3$, luego $x=1$.",
        ja: "トレース $x+4=5$ より $x=1$。",
        zh: "迹：$x+4=5$，故 $x=1$。"
      } },
      { tex: "Q=P", correct: false, why: {
        en: "$Q$ has non-zero off-diagonal entries.",
        fr: "$Q$ a des coefficients hors diagonale non nuls.",
        es: "$Q$ tiene entradas no nulas fuera de la diagonal.",
        ja: "$Q$ の非対角成分は $0$ でない。",
        zh: "$Q$ 的非对角元素非零。"
      } },
      { tex: "\\det Q=5", correct: false, why: {
        en: "$\\det Q=2\\cdot3=6$; $5$ is the trace.",
        fr: "$\\det Q=2\\cdot3=6$ ; $5$ est la trace.",
        es: "$\\det Q=2\\cdot3=6$; $5$ es la traza.",
        ja: "$\\det Q=6$。$5$ はトレース。",
        zh: "$\\det Q=6$，$5$ 是迹。"
      } },
      { tex: "R\\ \\text{must be the identity}", correct: false, why: {
        en: "$R$ has all entries non-zero.",
        fr: "$R$ a tous ses coefficients non nuls.",
        es: "$R$ tiene todas sus entradas no nulas.",
        ja: "$R$ の成分はすべて $0$ でない。",
        zh: "$R$ 的元素全不为零。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Columns are eigenvectors",
          fr: "Les colonnes sont propres",
          es: "Las columnas son vectores propios",
          ja: "列は固有ベクトル",
          zh: "列是特征向量"
        },
        lines: ["QR=RP\\iff Qr_1=2r_1,\\ Qr_2=3r_2"],
        note: {
          en: "Non-zero columns, so $2$ and $3$ are the eigenvalues of $Q$.",
          fr: "Colonnes non nulles : $2$ et $3$ sont les valeurs propres de $Q$.",
          es: "Columnas no nulas: $2$ y $3$ son los valores propios de $Q$.",
          ja: "列は $0$ でないので $2,3$ が $Q$ の固有値。",
          zh: "列非零，故 $2,3$ 是 $Q$ 的特征值。"
        }
      },
      {
        title: {
          en: "Trace and determinant",
          fr: "Trace et déterminant",
          es: "Traza y determinante",
          ja: "トレースと行列式",
          zh: "迹与行列式"
        },
        lines: ["x+4=5\\Rightarrow x=1,\\quad 4-yz=6\\Rightarrow yz=-2", "\\det(Q-\\lambda I)=(\\lambda-2)(\\lambda-3)"],
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
