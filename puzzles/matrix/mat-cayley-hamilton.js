/* matrix · A matrix obeys its own equation
   Cayley–Hamilton: a 2×2 matrix satisfies A² − (tr A)A + (det A)I = 0. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-cayley-hamilton",
    category: "matrix",
    difficulty: 3,
    title: {
      en: "A matrix obeys its own equation",
      fr: "Une matrice vérifie sa propre équation",
      es: "Una matriz cumple su propia ecuación",
      ja: "行列は自分の方程式を満たす",
      zh: "矩阵满足自己的方程"
    },
    statement: {
      en: "$A$ is a $2\\times2$ matrix with $\\operatorname{tr}A = 5$ and $\\det A = 6$, and $I$ is the identity. <b>Which of the following must be true?</b>",
      fr: "$A$ est une matrice $2\\times2$ avec $\\operatorname{tr}A = 5$ et $\\det A = 6$, et $I$ est l’identité. <b>Lesquelles des affirmations suivantes sont forcément vraies ?</b>",
      es: "$A$ es una matriz $2\\times2$ con $\\operatorname{tr}A = 5$ y $\\det A = 6$, e $I$ es la identidad. <b>¿Cuáles de las siguientes son necesariamente verdaderas?</b>",
      ja: "$A$ は $\\operatorname{tr}A = 5$、$\\det A = 6$ の $2\\times2$ 行列で、$I$ は単位行列です。<b>次のうち必ず正しいものはどれですか？</b>",
      zh: "$A$ 是 $2\\times2$ 矩阵，$\\operatorname{tr}A = 5$，$\\det A = 6$，$I$ 为单位矩阵。<b>下列哪些一定成立？</b>"
    },
    figureText: {
      en: "The graph of the characteristic polynomial λ² − 5λ + 6, crossing the axis at the eigenvalues 2 and 3.",
      fr: "Le graphe du polynôme caractéristique λ² − 5λ + 6, qui coupe l’axe aux valeurs propres 2 et 3.",
      es: "La gráfica del polinomio característico λ² − 5λ + 6, que corta el eje en los valores propios 2 y 3.",
      ja: "固有多項式 λ² − 5λ + 6 のグラフ。固有値 2 と 3 で軸と交わります。",
      zh: "特征多项式 λ² − 5λ + 6 的图像，在特征值 2 和 3 处与轴相交。"
    },
    hint: {
      en: "The characteristic polynomial is $\\lambda^2 - 5\\lambda + 6$, and $A$ itself satisfies it.",
      fr: "Le polynôme caractéristique est $\\lambda^2 - 5\\lambda + 6$, et $A$ le vérifie.",
      es: "El polinomio característico es $\\lambda^2 - 5\\lambda + 6$, y $A$ lo cumple.",
      ja: "固有多項式は $\\lambda^2 - 5\\lambda + 6$ で、$A$ 自身がこれを満たします。",
      zh: "特征多项式为 $\\lambda^2 - 5\\lambda + 6$，$A$ 本身满足它。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example taking the concrete matrix diag(2, 3) and checking each statement), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en prenant la matrice concrète diag(2, 3) et en vérifiant chaque affirmation), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo tomando la matriz concreta diag(2, 3) y comprobando cada afirmación), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば具体的な行列 diag(2, 3) で各記述を確かめる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如取具体矩阵 diag(2, 3) 逐条验证），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 3.4, scale: 50, pad: 18 });
      const T = F.T = axes(F, -0.5, 4.5, -0.8, 2.6, { xl: 'λ', yl: 'p(λ)' });
      plot(F, T, l => l * l - 5 * l + 6, 0.6, 4.4, 'graph', 'base', -0.8, 2.6);
      F.dot(T([2, 0])); F.dot(T([3, 0])); F.text(T([2, 0]), '2', 'len', -6, 16); F.text(T([3, 0]), '3', 'len', 6, 16);
      return F;
    },
    options: [
      { tex: "A^2 = 5A - 6I", correct: true, why: {
        en: "Cayley–Hamilton: $A^2 - 5A + 6I = 0$.",
        fr: "Cayley–Hamilton: $A^2 - 5A + 6I = 0$.",
        es: "Cayley–Hamilton: $A^2 - 5A + 6I = 0$.",
        ja: "Cayley–Hamilton: $A^2 - 5A + 6I = 0$.",
        zh: "Cayley–Hamilton: $A^2 - 5A + 6I = 0$."
      } },
      { tex: "\\det(A^2) = 36", correct: true, why: {
        en: "$(\\det A)^2 = 36$.",
        fr: "$(\\det A)^2 = 36$.",
        es: "$(\\det A)^2 = 36$.",
        ja: "$(\\det A)^2 = 36$.",
        zh: "$(\\det A)^2 = 36$."
      } },
      { tex: "A^2 = 5A + 6I", correct: false, why: {
        en: "Sign slip in the constant term.",
        fr: "Erreur de signe sur le terme constant.",
        es: "Error de signo en el término constante.",
        ja: "定数項の符号ミス。",
        zh: "常数项符号错误。"
      } },
      { tex: "A^2 = 6A - 5I", correct: false, why: {
        en: "Trace and determinant swapped.",
        fr: "Trace et déterminant échangés.",
        es: "Traza y determinante intercambiados.",
        ja: "トレースと行列式が入れ替わっています。",
        zh: "迹和行列式弄反了。"
      } },
      { tex: "\\det(A^2) = 12", correct: false, why: {
        en: "$\\det(A^2) = (\\det A)^2$, not $2\\det A$.",
        fr: "$\\det(A^2) = (\\det A)^2$, pas $2\\det A$.",
        es: "$\\det(A^2) = (\\det A)^2$, no $2\\det A$.",
        ja: "$\\det(A^2) = (\\det A)^2$ で、$2\\det A$ ではありません。",
        zh: "$\\det(A^2) = (\\det A)^2$，不是 $2\\det A$。"
      } },
      { tex: "\\operatorname{tr}(A^2) = 25", correct: false, why: {
        en: "$\\operatorname{tr}(A^2) = 2^2 + 3^2 = 13$, not $(\\operatorname{tr}A)^2$.",
        fr: "$\\operatorname{tr}(A^2) = 2^2 + 3^2 = 13$, not $(\\operatorname{tr}A)^2$.",
        es: "$\\operatorname{tr}(A^2) = 2^2 + 3^2 = 13$, not $(\\operatorname{tr}A)^2$.",
        ja: "$\\operatorname{tr}(A^2) = 2^2 + 3^2 = 13$, not $(\\operatorname{tr}A)^2$.",
        zh: "$\\operatorname{tr}(A^2) = 2^2 + 3^2 = 13$, not $(\\operatorname{tr}A)^2$."
      } },
      { tex: "A^2 = 25I", correct: false, why: {
        en: "Only true if $A = \\pm5I$ — impossible with $\\det A = 6$.",
        fr: "Seulement si $A = \\pm5I$ — impossible avec $\\det A = 6$.",
        es: "Solo si $A = \\pm5I$ — imposible con $\\det A = 6$.",
        ja: "$A = \\pm5I$ のときだけですが、$\\det A = 6$ では不可能です。",
        zh: "只有 $A = \\pm5I$ 才成立 —— 与 $\\det A = 6$ 矛盾。"
      } },
      { tex: "A^2 = I", correct: false, why: {
        en: "The eigenvalues of $A^2$ are $4$ and $9$, not $1$.",
        fr: "Les valeurs propres de $A^2$ sont $4$ et $9$, pas $1$.",
        es: "Los valores propios de $A^2$ son $4$ y $9$, no $1$.",
        ja: "$A^2$ の固有値は $4$ と $9$ で、$1$ ではありません。",
        zh: "$A^2$ 的特征值是 $4$ 和 $9$，不是 $1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The characteristic polynomial",
          fr: "Le polynôme caractéristique",
          es: "El polinomio característico",
          ja: "固有多項式",
          zh: "特征多项式"
        },
        lines: ["p(\\lambda) = \\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = \\lambda^2 - 5\\lambda + 6 = (\\lambda - 2)(\\lambda - 3)"],
        note: {
          en: "So the eigenvalues are $2$ and $3$.",
          fr: "Les valeurs propres sont donc $2$ et $3$.",
          es: "Así que los valores propios son $2$ y $3$.",
          ja: "よって固有値は $2$ と $3$。",
          zh: "所以特征值为 $2$ 和 $3$。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([2, 0]), 0.14, 'halo', 'over'), 300); F.fadeIn(F.circle(F.T([3, 0]), 0.14, 'halo', 'over'), 300, 200); }
      },
      {
        title: {
          en: "Cayley–Hamilton",
          fr: "Cayley–Hamilton",
          es: "Cayley–Hamilton",
          ja: "ケーリー・ハミルトンの定理",
          zh: "凯莱–哈密顿定理"
        },
        lines: ["A^2 - 5A + 6I = 0 \\ \\Rightarrow\\ A^2 = 5A - 6I", "\\det(A^2) = 6^2 = 36, \\qquad \\operatorname{tr}(A^2) = 4 + 9 = 13"],
        note: {
          en: "Every square matrix satisfies its own characteristic equation.",
          fr: "Toute matrice carrée vérifie sa propre équation caractéristique.",
          es: "Toda matriz cuadrada cumple su propia ecuación característica.",
          ja: "すべての正方行列は自分の固有方程式を満たします。",
          zh: "每个方阵都满足自己的特征方程。"
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
          en: "Two statements are true.",
          fr: "Deux affirmations sont vraies.",
          es: "Dos afirmaciones son verdaderas.",
          ja: "正しい記述は2つです。",
          zh: "有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
