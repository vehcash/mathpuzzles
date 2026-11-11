/* matrix · A matrix built from divisibility
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2023-divisibility-matrix",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.5",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.5",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.5",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A matrix built from divisibility",
      fr: "Une matrice construite par divisibilité",
      es: "Una matriz construida con divisibilidad",
      ja: "割り切れるかで作る行列",
      zh: "由整除构造的矩阵"
    },
    statement: {
      en: "$M=(a_{ij})$ is the $3\\times3$ matrix with $a_{ij}=1$ if $i$ divides $j+1$ and $a_{ij}=0$ otherwise ($i,j\\in\\{1,2,3\\}$). <b>Which of the following are true?</b>",
      fr: "$M=(a_{ij})$ est la matrice $3\\times3$ avec $a_{ij}=1$ si $i$ divise $j+1$, et $a_{ij}=0$ sinon ($i,j\\in\\{1,2,3\\}$). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$M=(a_{ij})$ es la matriz $3\\times3$ con $a_{ij}=1$ si $i$ divide a $j+1$ y $a_{ij}=0$ si no ($i,j\\in\\{1,2,3\\}$). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$M=(a_{ij})$ は、$i$ が $j+1$ を割り切るとき $a_{ij}=1$、そうでなければ $a_{ij}=0$ の $3\\times3$ 行列です（$i,j\\in\\{1,2,3\\}$）。<b>次のうち正しいものはどれですか？</b>",
      zh: "$M=(a_{ij})$ 是 $3\\times3$ 矩阵，当 $i$ 整除 $j+1$ 时 $a_{ij}=1$，否则 $a_{ij}=0$（$i,j\\in\\{1,2,3\\}$）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The matrix M with rows (1, 1, 1), (1, 0, 1), (0, 1, 0); the column headers show j + 1 = 2, 3, 4 and the row headers show i = 1, 2, 3.",
      fr: "La matrice M de lignes (1, 1, 1), (1, 0, 1), (0, 1, 0) ; en tête de colonne j + 1 = 2, 3, 4 et en tête de ligne i = 1, 2, 3.",
      es: "La matriz M de filas (1, 1, 1), (1, 0, 1), (0, 1, 0); en las columnas j + 1 = 2, 3, 4 y en las filas i = 1, 2, 3.",
      ja: "行が (1, 1, 1)、(1, 0, 1)、(0, 1, 0) の行列 M。列の見出しは j + 1 = 2, 3, 4、行の見出しは i = 1, 2, 3。",
      zh: "矩阵 M 的各行为 (1, 1, 1)、(1, 0, 1)、(0, 1, 0)；列标为 j + 1 = 2, 3, 4，行标为 i = 1, 2, 3。"
    },
    hint: {
      en: "Write $M$ out, then find its characteristic polynomial.",
      fr: "Écrivez $M$, puis son polynôme caractéristique.",
      es: "Escribe $M$ y luego su polinomio característico.",
      ja: "$M$ を書き出し、固有多項式を求めましょう。",
      zh: "写出 $M$，再求特征多项式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.2, scale: 64, pad: 16 });
      const mx = matrix(F, [1.2, 2.6], [['1', '1', '1'], ['1', '0', '1'], ['0', '1', '0']], { cw: 0.9, ch: 0.75 });
      ['2', '3', '4'].forEach((t, j) => F.text([1.2 + (j + 0.5) * 0.9, 2.6], t, 'tick', 0, -12));
      ['1', '2', '3'].forEach((t, i) => F.text([1.2, 2.6 - (i + 0.5) * 0.75], t, 'tick', -26, 0));
      mx.row(2, 'fill-pink');
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is invertible": {"fr": "est inversible", "es": "es invertible", "ja": "は正則", "zh": "可逆"}
    },
    options: [
      { tex: "\\exists X\\neq0:\\ MX=-X", correct: true, why: {
        en: "$-1$ is an eigenvalue: $\\det(M+I)=0$.",
        fr: "$-1$ est valeur propre : $\\det(M+I)=0$.",
        es: "$-1$ es valor propio: $\\det(M+I)=0$.",
        ja: "$-1$ は固有値：$\\det(M+I)=0$。",
        zh: "$-1$ 是特征值：$\\det(M+I)=0$。"
      } },
      { tex: "\\exists X\\neq0:\\ MX=0", correct: true, why: {
        en: "$\\det M=0$, e.g. $X=(1,0,-1)^T$.",
        fr: "$\\det M=0$, par exemple $X=(1,0,-1)^T$.",
        es: "$\\det M=0$, por ejemplo $X=(1,0,-1)^T$.",
        ja: "$\\det M=0$。例えば $X=(1,0,-1)^T$。",
        zh: "$\\det M=0$，例如 $X=(1,0,-1)^T$。"
      } },
      { tex: "M \\text{ is invertible}", correct: false, why: {
        en: "$\\det M=1\\cdot(0-1)-1\\cdot(0-0)+1\\cdot(1-0)=0$.",
        fr: "$\\det M=1\\cdot(0-1)-1\\cdot(0-0)+1\\cdot(1-0)=0$.",
        es: "$\\det M=1\\cdot(0-1)-1\\cdot(0-0)+1\\cdot(1-0)=0$.",
        ja: "$\\det M=1\\cdot(0-1)-1\\cdot(0-0)+1\\cdot(1-0)=0$。",
        zh: "$\\det M=1\\cdot(0-1)-1\\cdot(0-0)+1\\cdot(1-0)=0$。"
      } },
      { tex: "M-2I \\text{ is invertible}", correct: false, why: {
        en: "$2$ is also an eigenvalue, so $\\det(M-2I)=0$.",
        fr: "$2$ est aussi valeur propre : $\\det(M-2I)=0$.",
        es: "$2$ también es valor propio: $\\det(M-2I)=0$.",
        ja: "$2$ も固有値なので $\\det(M-2I)=0$。",
        zh: "$2$ 也是特征值，$\\det(M-2I)=0$。"
      } },
      { tex: "\\det M=1", correct: false, why: {
        en: "The two non-zero cofactor terms cancel: $-1+1=0$.",
        fr: "Les deux termes non nuls se compensent : $-1+1=0$.",
        es: "Los dos términos no nulos se anulan: $-1+1=0$.",
        ja: "0 でない2項が打ち消し合う：$-1+1=0$。",
        zh: "两个非零项抵消：$-1+1=0$。"
      } },
      { tex: "\\det(M-I)=0", correct: false, why: {
        en: "The eigenvalues are $0,\\,2,\\,-1$.",
        fr: "Les valeurs propres sont $0,\\,2,\\,-1$.",
        es: "Los valores propios son $0,\\,2,\\,-1$.",
        ja: "固有値は $0,\\,2,\\,-1$。",
        zh: "特征值为 $0,\\,2,\\,-1$。"
      } },
      { tex: "\\operatorname{tr} M=2", correct: false, why: {
        en: "The diagonal is $1,0,0$: trace $1=0+2-1$.",
        fr: "La diagonale est $1,0,0$ : trace $1=0+2-1$.",
        es: "La diagonal es $1,0,0$: traza $1=0+2-1$.",
        ja: "対角成分は $1,0,0$ でトレース $1=0+2-1$。",
        zh: "对角线为 $1,0,0$：迹 $1=0+2-1$。"
      } },
      { tex: "M+I \\text{ is invertible}", correct: false, why: {
        en: "$-1$ is an eigenvalue, so $\\det(M+I)=0$.",
        fr: "$-1$ est valeur propre : $\\det(M+I)=0$.",
        es: "$-1$ es valor propio: $\\det(M+I)=0$.",
        ja: "$-1$ が固有値なので $\\det(M+I)=0$。",
        zh: "$-1$ 是特征值，$\\det(M+I)=0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Build M",
          fr: "Construire M",
          es: "Construir M",
          ja: "M を作る",
          zh: "构造 M"
        },
        lines: ["M=\\begin{pmatrix}1&1&1\\\\1&0&1\\\\0&1&0\\end{pmatrix}"],
        note: {
          en: "Row $1$: $1$ divides everything. Row $2$: $2\\mid2$ and $2\\mid4$. Row $3$: only $3\\mid3$.",
          fr: "Ligne $1$ : $1$ divise tout. Ligne $2$ : $2\\mid2$ et $2\\mid4$. Ligne $3$ : seulement $3\\mid3$.",
          es: "Fila $1$: $1$ divide a todo. Fila $2$: $2\\mid2$ y $2\\mid4$. Fila $3$: solo $3\\mid3$.",
          ja: "1行目：$1$ はすべてを割る。2行目：$2\\mid2$、$2\\mid4$。3行目：$3\\mid3$ のみ。",
          zh: "第 $1$ 行：$1$ 整除一切。第 $2$ 行：$2\\mid2$、$2\\mid4$。第 $3$ 行：只有 $3\\mid3$。"
        }
      },
      {
        title: {
          en: "Eigenvalues",
          fr: "Valeurs propres",
          es: "Valores propios",
          ja: "固有値",
          zh: "特征值"
        },
        lines: ["\\det(M-\\lambda I)=-\\lambda^3+\\lambda^2+2\\lambda=-\\lambda(\\lambda-2)(\\lambda+1)"],
        note: {
          en: "Eigenvalues $0,2,-1$: $M$, $M-2I$ and $M+I$ are all singular.",
          fr: "Valeurs propres $0,2,-1$ : $M$, $M-2I$ et $M+I$ sont toutes singulières.",
          es: "Valores propios $0,2,-1$: $M$, $M-2I$ y $M+I$ son singulares.",
          ja: "固有値 $0,2,-1$：$M$、$M-2I$、$M+I$ はすべて正則でない。",
          zh: "特征值 $0,2,-1$：$M$、$M-2I$、$M+I$ 都奇异。"
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
          en: "Each eigenvalue makes one shifted matrix singular.",
          fr: "Chaque valeur propre rend singulière une matrice décalée.",
          es: "Cada valor propio hace singular una matriz desplazada.",
          ja: "各固有値に対応してずらした行列が正則でなくなる。",
          zh: "每个特征值使一个平移后的矩阵奇异。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
