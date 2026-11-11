/* matrix · Directions that do not turn
   Eigenvalues of a 2×2 matrix from the characteristic polynomial, with the two eigenvectors drawn. */
(function (K) {
  'use strict';
  const { Figure, grid, arrow } = K;
  const X0 = -1, X1 = 6, Y0 = -5, Y1 = 6;
  const T = ([x, y]) => [x - X0, y - Y0];

  PuzzleBank.define({
    id: 'mat-eigenvalues-2x2',
    category: 'matrix',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["uni"]
    },
    difficulty: 2,
    title: { en: 'Directions that do not turn', fr: 'Les directions qui ne tournent pas', es: 'Direcciones que no giran', ja: '向きが変わらない方向', zh: '不会转向的方向' },
    statement: {
      en: 'Let $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$. <b>Which of the following are eigenvalues of $A$?</b>',
      fr: 'Soit $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$. <b>Lesquels des nombres suivants sont des valeurs propres de $A$ ?</b>',
      es: 'Sea $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$. <b>¿Cuáles de los siguientes son valores propios de $A$?</b>',
      ja: '$A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$ とします。<b>次のうち $A$ の固有値はどれですか？</b>',
      zh: '设 $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$。<b>下列哪些是 $A$ 的特征值？</b>'
    },
    figureText: {
      en: "A grid with axes. The eigenvectors and their images under A are drawn in the solution.",
      fr: "Une grille avec des axes. Les vecteurs propres et leurs images par A sont tracés dans la solution.",
      es: "Una cuadrícula con ejes. Los vectores propios y sus imágenes por A se dibujan en la solución.",
      ja: "座標軸つきの方眼。固有ベクトルと A による像は解答で描きます。",
      zh: "带坐标轴的网格。特征向量及其在 A 下的像在解答中画出。"
    },
    hint: {
      en: 'Solve $\\det(A - \\lambda I) = 0$, a quadratic equation in $\\lambda$.',
      fr: 'Résolvez $\\det(A - \\lambda I) = 0$, une équation du second degré en $\\lambda$.',
      es: 'Resuelve $\\det(A - \\lambda I) = 0$, una ecuación de segundo grado en $\\lambda$.',
      ja: '$\\lambda$ の2次方程式 $\\det(A - \\lambda I) = 0$ を解きます。',
      zh: '解关于 $\\lambda$ 的二次方程 $\\det(A - \\lambda I) = 0$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example using trace and determinant: the eigenvalues are two numbers with sum 7 and product 10, or by finding vectors with Av = λv directly), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple avec la trace et le déterminant : deux nombres de somme 7 et de produit 10, ou en cherchant directement des vecteurs tels que Av = λv), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con la traza y el determinante: dos números de suma 7 y producto 10, o buscando directamente vectores con Av = λv), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えばトレースと行列式から「和が 7、積が 10 の2数」とする、または Av = λv となるベクトルを直接探す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如利用迹和行列式：特征值是和为 7、积为 10 的两个数，或直接寻找满足 Av = λv 的向量），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: X1 - X0, h: Y1 - Y0, scale: 26, pad: 18 });
      grid(F, 0, 0, X1 - X0, Y1 - Y0);
      F.seg(T([X0, 0]), T([X1, 0]), 'axis'); F.seg(T([0, Y0]), T([0, Y1]), 'axis');
      F.reveal = () => {
        F.seg(T([-1, -1]), T([6, 6]), 'seg thin'); F.seg(T([-0.5, 1]), T([2.6, -5.2]), 'seg thin');
        arrow(F, T([0, 0]), T([5, 5]), 'vec two'); arrow(F, T([0, 0]), T([1, 1]), 'vec');
        arrow(F, T([0, 0]), T([2, -4]), 'vec two'); arrow(F, T([0, 0]), T([1, -2]), 'vec');
        F.text(T([1, 1]), 'v', 'pt', 12, 4); F.text(T([5, 5]), 'Av', 'pt', 16, 6);
        F.text(T([1, -2]), 'w', 'pt', 12, 0); F.text(T([2, -4]), 'Aw', 'pt', 18, 4);
      };
      return F;
    },
    options: [
      { tex: '\\lambda = 2', correct: true, why: {
        en: 'A root of $\\lambda^2 - 7\\lambda + 10$; eigenvector $(1, -2)$.',
        fr: 'Une racine de $\\lambda^2 - 7\\lambda + 10$ ; vecteur propre $(1, -2)$.',
        es: 'Una raíz de $\\lambda^2 - 7\\lambda + 10$; vector propio $(1, -2)$.',
        ja: '$\\lambda^2 - 7\\lambda + 10$ の解。固有ベクトルは $(1, -2)$。',
        zh: '$\\lambda^2 - 7\\lambda + 10$ 的根；特征向量为 $(1, -2)$。'
      } },
      { tex: '\\lambda = 5', correct: true, why: {
        en: 'The other root; eigenvector $(1, 1)$.',
        fr: 'L’autre racine ; vecteur propre $(1, 1)$.',
        es: 'La otra raíz; vector propio $(1, 1)$.',
        ja: 'もう1つの解。固有ベクトルは $(1, 1)$。',
        zh: '另一个根；特征向量为 $(1, 1)$。'
      } },
      { tex: '\\lambda = 4', correct: false, why: {
        en: 'A diagonal entry — eigenvalues sit on the diagonal only for triangular matrices.',
        fr: 'Un coefficient diagonal — les valeurs propres ne sont sur la diagonale que pour une matrice triangulaire.',
        es: 'Un elemento de la diagonal — los valores propios solo están en la diagonal en matrices triangulares.',
        ja: '対角成分です — 固有値が対角に並ぶのは三角行列のときだけです。',
        zh: '这是对角元 —— 只有三角矩阵的特征值才在对角线上。'
      } },
      { tex: '\\lambda = 3', correct: false, why: {
        en: 'The other diagonal entry; $\\det(A - 3I) = 1\\cdot0 - 1\\cdot2 = -2 \\ne 0$.',
        fr: 'L’autre coefficient diagonal ; $\\det(A - 3I) = 1\\cdot0 - 1\\cdot2 = -2 \\ne 0$.',
        es: 'El otro elemento de la diagonal; $\\det(A - 3I) = 1\\cdot0 - 1\\cdot2 = -2 \\ne 0$.',
        ja: 'もう1つの対角成分。$\\det(A - 3I) = 1\\cdot0 - 1\\cdot2 = -2 \\ne 0$。',
        zh: '另一个对角元；$\\det(A - 3I) = 1\\cdot0 - 1\\cdot2 = -2 \\ne 0$。'
      } },
      { tex: '\\lambda = 7', correct: false, why: {
        en: 'The trace — it is the sum of the eigenvalues, $2 + 5$.',
        fr: 'La trace — c’est la somme des valeurs propres, $2 + 5$.',
        es: 'La traza — es la suma de los valores propios, $2 + 5$.',
        ja: 'トレースです — 固有値の和 $2 + 5$ です。',
        zh: '这是迹 —— 它等于特征值之和 $2 + 5$。'
      } },
      { tex: '\\lambda = 10', correct: false, why: {
        en: 'The determinant — it is the product of the eigenvalues, $2\\cdot5$.',
        fr: 'Le déterminant — c’est le produit des valeurs propres, $2\\cdot5$.',
        es: 'El determinante — es el producto de los valores propios, $2\\cdot5$.',
        ja: '行列式です — 固有値の積 $2\\cdot5$ です。',
        zh: '这是行列式 —— 它等于特征值之积 $2\\cdot5$。'
      } },
      { tex: '\\lambda = -2', correct: false, why: {
        en: 'Sign slip: a root of $\\lambda^2 + 7\\lambda + 10$.',
        fr: 'Erreur de signe : une racine de $\\lambda^2 + 7\\lambda + 10$.',
        es: 'Error de signo: una raíz de $\\lambda^2 + 7\\lambda + 10$.',
        ja: '符号ミス：$\\lambda^2 + 7\\lambda + 10$ の解です。',
        zh: '符号错误：这是 $\\lambda^2 + 7\\lambda + 10$ 的根。'
      } },
      { tex: '\\lambda = -5', correct: false, why: {
        en: 'The same sign slip with the other root.',
        fr: 'La même erreur de signe avec l’autre racine.',
        es: 'El mismo error de signo con la otra raíz.',
        ja: 'もう1つの解で同じ符号ミスをしています。',
        zh: '另一个根犯了同样的符号错误。'
      } }
    ],
    steps: [
      {
        title: { en: 'The characteristic equation', fr: 'L’équation caractéristique', es: 'La ecuación característica', ja: '固有方程式', zh: '特征方程' },
        lines: ['\\det(A - \\lambda I) = \\begin{vmatrix} 4 - \\lambda & 1 \\\\ 2 & 3 - \\lambda \\end{vmatrix} = (4 - \\lambda)(3 - \\lambda) - 2', '= \\lambda^2 - 7\\lambda + 10 = 0'],
        note: {
          en: '$Av = \\lambda v$ with $v \\ne 0$ means $A - \\lambda I$ is singular, so its determinant is $0$.',
          fr: '$Av = \\lambda v$ avec $v \\ne 0$ signifie que $A - \\lambda I$ n’est pas inversible, donc son déterminant est nul.',
          es: '$Av = \\lambda v$ con $v \\ne 0$ significa que $A - \\lambda I$ es singular, así que su determinante es $0$.',
          ja: '$v \\ne 0$ で $Av = \\lambda v$ となるのは $A - \\lambda I$ が正則でないとき、つまり行列式が $0$ のときです。',
          zh: '存在 $v \\ne 0$ 使 $Av = \\lambda v$，意味着 $A - \\lambda I$ 奇异，其行列式为 $0$。'
        }
      },
      {
        title: { en: 'Solve the quadratic', fr: 'Résoudre l’équation du second degré', es: 'Resolver la ecuación de segundo grado', ja: '2次方程式を解く', zh: '解二次方程' },
        lines: ['(\\lambda - 2)(\\lambda - 5) = 0', '\\lambda = \\boxed{2} \\quad\\text{or}\\quad \\lambda = \\boxed{5}'],
        note: {
          en: 'Two numbers with sum $7$ and product $10$.',
          fr: 'Deux nombres de somme $7$ et de produit $10$.',
          es: 'Dos números de suma $7$ y producto $10$.',
          ja: '和が $7$、積が $10$ の2数です。',
          zh: '和为 $7$、积为 $10$ 的两个数。'
        }
      },
      {
        title: { en: 'See them on the picture', fr: 'Les voir sur la figure', es: 'Verlos en el dibujo', ja: '図で見る', zh: '在图上看' },
        lines: ['A\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 5 \\end{pmatrix} = 5\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}, \\qquad A\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -4 \\end{pmatrix} = 2\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}'],
        note: {
          en: 'Along these two directions $A$ only stretches — by $5$ and by $2$.',
          fr: 'Selon ces deux directions, $A$ ne fait qu’étirer — d’un facteur $5$ et d’un facteur $2$.',
          es: 'En estas dos direcciones $A$ solo estira — por $5$ y por $2$.',
          ja: 'この2方向では $A$ は伸ばすだけです — $5$ 倍と $2$ 倍。',
          zh: '沿这两个方向，$A$ 只做伸缩 —— 分别放大 $5$ 倍和 $2$ 倍。'
        },
        fig(F) { F.draw(F.seg(T([0, 0]), T([5, 5]), 'hl yellow', 'fills'), 800); F.draw(F.seg(T([0, 0]), T([2, -4]), 'hl pink', 'fills'), 800, 400); F.fadeIn(F.text(T([3, 3]), '×5', 'len', -18, -6), 400, 800); F.fadeIn(F.text(T([1.5, -3]), '×2', 'len', 18, 0), 400, 1100); }
      },
      {
        fig(F) { if (F.reveal) F.reveal(); },
        title: { en: 'Check with trace and determinant', fr: 'Vérifier avec la trace et le déterminant', es: 'Comprobar con la traza y el determinante', ja: 'トレースと行列式で確認', zh: '用迹和行列式验证' },
        lines: ['2 + 5 = 7 = 4 + 3 = \\operatorname{tr} A', '2\\cdot 5 = 10 = 4\\cdot3 - 1\\cdot2 = \\det A'],
        note: {
          en: 'Sum of eigenvalues = trace, product = determinant.',
          fr: 'Somme des valeurs propres = trace, produit = déterminant.',
          es: 'Suma de los valores propios = traza, producto = determinante.',
          ja: '固有値の和 = トレース、積 = 行列式。',
          zh: '特征值之和 = 迹，之积 = 行列式。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Exactly two options are eigenvalues.', fr: 'Exactement deux options sont des valeurs propres.', es: 'Exactamente dos opciones son valores propios.', ja: 'ちょうど2つの選択肢が固有値です。', zh: '恰有两个选项是特征值。' }
      }
    ],
    words: {  // \text{…} words inside formulas
      'or': { fr: 'ou', es: 'o', ja: 'または', zh: '或' }
    }
  });
})(PuzzleBank.kit);
