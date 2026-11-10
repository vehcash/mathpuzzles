/* matrix · Undo the matrix
   The 2×2 inverse: swap the diagonal, change the signs of the other two entries, divide by the determinant. */
(function (K) {
  'use strict';
  const { Figure, matrix } = K;

  PuzzleBank.define({
    id: 'mat-inverse-2x2',
    category: 'matrix',
    difficulty: 1,
    title: { en: 'Undo the matrix', fr: 'Défaire la matrice', es: 'Deshacer la matriz', ja: '行列を元に戻す', zh: '撤销这个矩阵' },
    statement: {
      en: 'Let $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$. <b>Which of the following equal $A^{-1}$?</b>',
      fr: 'Soit $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$. <b>Lesquelles des matrices suivantes sont égales à $A^{-1}$ ?</b>',
      es: 'Sea $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$. <b>¿Cuáles de las siguientes son iguales a $A^{-1}$?</b>',
      ja: '$A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$ とします。<b>次のうち $A^{-1}$ に等しいものはどれですか？</b>',
      zh: '设 $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$。<b>下列哪些等于 $A^{-1}$？</b>'
    },
    figureText: {
      en: 'The matrix A = (4 7; 2 6). Arrows show the recipe for the inverse: swap 4 and 6 on the main diagonal and change the signs of 7 and 2.',
      fr: 'La matrice A = (4 7 ; 2 6). Des flèches montrent la recette de l’inverse : échanger 4 et 6 sur la diagonale et changer les signes de 7 et 2.',
      es: 'La matriz A = (4 7; 2 6). Unas flechas muestran la receta de la inversa: intercambiar 4 y 6 en la diagonal y cambiar el signo de 7 y 2.',
      ja: '行列 A = (4 7; 2 6)。矢印が逆行列の作り方を示します：対角の 4 と 6 を入れ替え、7 と 2 の符号を変えます。',
      zh: '矩阵 A = (4 7; 2 6)。箭头说明求逆的做法：交换主对角线上的 4 和 6，并改变 7 和 2 的符号。'
    },
    hint: {
      en: 'For $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ the inverse is $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
      fr: 'Pour $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, l’inverse est $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
      es: 'Para $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ la inversa es $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
      ja: '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ の逆行列は $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$ です。',
      zh: '对于 $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$，逆矩阵为 $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example Gauss–Jordan elimination on the augmented matrix [A | I]), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple l’élimination de Gauss–Jordan sur la matrice augmentée [A | I]), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con eliminación de Gauss–Jordan sobre la matriz ampliada [A | I]), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば拡大行列 [A | I] にガウス・ジョルダン消去法を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如对增广矩阵 [A | I] 做高斯–若尔当消元），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 2.0, scale: 64, pad: 20 });
      F.text([0.35, 1.0], 'A =', 'mx', 0, 1);
      F.mx = matrix(F, [1.05, 1.75], [['4', '7'], ['2', '6']], { cw: 1.05 });
      return F;
    },
    options: [
      { tex: '\\tfrac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}', correct: true, why: {
        en: 'The formula with $\\det A = 4\\cdot6 - 7\\cdot2 = 10$.',
        fr: 'La formule avec $\\det A = 4\\cdot6 - 7\\cdot2 = 10$.',
        es: 'La fórmula con $\\det A = 4\\cdot6 - 7\\cdot2 = 10$.',
        ja: '$\\det A = 4\\cdot6 - 7\\cdot2 = 10$ を使った公式どおりです。',
        zh: '代入公式，$\\det A = 4\\cdot6 - 7\\cdot2 = 10$。'
      } },
      { tex: '\\begin{pmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{pmatrix}', correct: true, why: {
        en: 'The same matrix with the $\\tfrac{1}{10}$ multiplied in.',
        fr: 'La même matrice, avec le $\\tfrac{1}{10}$ distribué.',
        es: 'La misma matriz con el $\\tfrac{1}{10}$ ya multiplicado.',
        ja: '同じ行列に $\\tfrac{1}{10}$ を掛け込んだものです。',
        zh: '同一个矩阵，把 $\\tfrac{1}{10}$ 乘进去了。'
      } },
      { tex: '\\tfrac{1}{10}\\begin{pmatrix} 6 & 7 \\\\ 2 & 4 \\end{pmatrix}', correct: false, why: {
        en: 'Swaps the diagonal but forgets to change the signs of $7$ and $2$.',
        fr: 'Échange la diagonale mais oublie de changer les signes de $7$ et $2$.',
        es: 'Intercambia la diagonal pero olvida cambiar el signo de $7$ y $2$.',
        ja: '対角は入れ替えていますが、$7$ と $2$ の符号を変え忘れています。',
        zh: '交换了对角线，但忘了改变 $7$ 和 $2$ 的符号。'
      } },
      { tex: '\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}', correct: false, why: {
        en: 'The adjugate — it still has to be divided by $\\det A = 10$.',
        fr: 'La comatrice transposée — il faut encore la diviser par $\\det A = 10$.',
        es: 'La adjunta — todavía hay que dividirla entre $\\det A = 10$.',
        ja: '余因子行列です — さらに $\\det A = 10$ で割る必要があります。',
        zh: '这是伴随矩阵 —— 还要除以 $\\det A = 10$。'
      } },
      { tex: '\\tfrac{1}{10}\\begin{pmatrix} 4 & -7 \\\\ -2 & 6 \\end{pmatrix}', correct: false, why: {
        en: 'Changes the signs but does not swap $4$ and $6$.',
        fr: 'Change les signes mais n’échange pas $4$ et $6$.',
        es: 'Cambia los signos pero no intercambia $4$ y $6$.',
        ja: '符号は変えていますが、$4$ と $6$ を入れ替えていません。',
        zh: '改了符号，却没有交换 $4$ 和 $6$。'
      } },
      { tex: '\\begin{pmatrix} \\tfrac14 & \\tfrac17 \\\\ \\tfrac12 & \\tfrac16 \\end{pmatrix}', correct: false, why: {
        en: 'The reciprocal of each entry is not an inverse matrix.',
        fr: 'L’inverse de chaque coefficient n’est pas une matrice inverse.',
        es: 'El inverso de cada elemento no es una matriz inversa.',
        ja: '各成分の逆数をとっても逆行列にはなりません。',
        zh: '把每个元素取倒数并不能得到逆矩阵。'
      } },
      { tex: '\\tfrac{1}{38}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}', correct: false, why: {
        en: 'Uses $4\\cdot6 + 7\\cdot2 = 38$ as the determinant — it is a difference, not a sum.',
        fr: 'Prend $4\\cdot6 + 7\\cdot2 = 38$ comme déterminant — c’est une différence, pas une somme.',
        es: 'Toma $4\\cdot6 + 7\\cdot2 = 38$ como determinante — es una resta, no una suma.',
        ja: '$4\\cdot6 + 7\\cdot2 = 38$ を行列式にしています — 和ではなく差です。',
        zh: '把 $4\\cdot6 + 7\\cdot2 = 38$ 当成行列式 —— 应该是差而不是和。'
      } },
      { tex: '\\tfrac{1}{10}\\begin{pmatrix} 4 & 2 \\\\ 7 & 6 \\end{pmatrix}', correct: false, why: {
        en: 'The transpose divided by the determinant — the transpose is not the inverse.',
        fr: 'La transposée divisée par le déterminant — la transposée n’est pas l’inverse.',
        es: 'La traspuesta dividida entre el determinante — la traspuesta no es la inversa.',
        ja: '転置行列を行列式で割ったもの — 転置は逆行列ではありません。',
        zh: '转置矩阵除以行列式 —— 转置并不是逆矩阵。'
      } }
    ],
    steps: [
      {
        title: { en: 'Is it invertible?', fr: 'Est-elle inversible ?', es: '¿Es invertible?', ja: '逆行列はある？', zh: '它可逆吗？' },
        lines: ['\\det A = 4\\cdot 6 - 7\\cdot 2 = 24 - 14 = 10 \\ne 0'],
        note: {
          en: 'A square matrix has an inverse exactly when its determinant is not $0$.',
          fr: 'Une matrice carrée est inversible exactement quand son déterminant n’est pas nul.',
          es: 'Una matriz cuadrada tiene inversa exactamente cuando su determinante no es $0$.',
          ja: '正方行列が逆行列をもつのは、行列式が $0$ でないときに限ります。',
          zh: '方阵可逆当且仅当其行列式不为 $0$。'
        },
        fig(F) { F.fadeIn(F.mx.box(0, 0, 'fill-green'), 400); F.fadeIn(F.mx.box(1, 1, 'fill-green'), 400, 150); F.fadeIn(F.mx.box(0, 1, 'fill-pink'), 400, 500); F.fadeIn(F.mx.box(1, 0, 'fill-pink'), 400, 650); }
      },
      {
        title: { en: 'Swap, change signs, divide', fr: 'Échanger, changer les signes, diviser', es: 'Intercambiar, cambiar signos, dividir', ja: '入れ替え、符号を変え、割る', zh: '交换、变号、相除' },
        lines: ['A^{-1} = \\frac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix} = \\begin{pmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{pmatrix}'],
        note: {
          en: 'Swap the two diagonal entries, change the sign of the other two, then divide everything by the determinant.',
          fr: 'Échangez les deux coefficients diagonaux, changez le signe des deux autres, puis divisez tout par le déterminant.',
          es: 'Intercambia los dos elementos de la diagonal, cambia el signo de los otros dos y divide todo entre el determinante.',
          ja: '対角の2成分を入れ替え、残り2成分の符号を変え、全体を行列式で割ります。',
          zh: '交换对角线上的两个元素，把另外两个元素变号，再整体除以行列式。'
        },
        fig(F) { const c = F.mx.c; F.clear('fills'); F.draw(F.seg(c(0, 0), c(1, 1), 'hl yellow', 'fills'), 700); F.draw(F.seg(c(0, 1), c(1, 0), 'hl pink', 'fills'), 700, 400); F.fadeIn(F.text(c(0, 1), '−', 'mx', -16, 1, 'over'), 400, 900); F.fadeIn(F.text(c(1, 0), '−', 'mx', -16, 1, 'over'), 400, 1000); }
      },
      {
        title: { en: 'Check: the product is the identity', fr: 'Vérification : le produit est l’identité', es: 'Comprobación: el producto es la identidad', ja: '確認：積は単位行列', zh: '验证：乘积是单位矩阵' },
        lines: ['A\\,A^{-1} = \\frac{1}{10}\\begin{pmatrix} 4\\cdot6 - 7\\cdot2 & -4\\cdot7 + 7\\cdot4 \\\\ 2\\cdot6 - 6\\cdot2 & -2\\cdot7 + 6\\cdot4 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\\ \\checkmark'],
        note: {
          en: 'Multiplying back is the quickest way to catch a sign mistake.',
          fr: 'Remultiplier est le moyen le plus rapide de repérer une erreur de signe.',
          es: 'Volver a multiplicar es la forma más rápida de detectar un error de signo.',
          ja: '掛け戻すのが符号ミスを見つける一番速い方法です。',
          zh: '乘回去检验是发现符号错误最快的方法。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two options are the same matrix written differently.', fr: 'Deux options sont la même matrice écrite différemment.', es: 'Dos opciones son la misma matriz escrita de forma distinta.', ja: '2つの選択肢は同じ行列を別の形で書いたものです。', zh: '有两个选项是同一矩阵的不同写法。' }
      }
    ]
  });
})(PuzzleBank.kit);
