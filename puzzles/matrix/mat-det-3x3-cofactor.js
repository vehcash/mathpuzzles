/* matrix · A 3×3 determinant
   Cofactor expansion along the column with a zero, checked with the rule of Sarrus. None of the options is right. */
(function (K) {
  'use strict';
  const { Figure, matrix } = K;
  const ROWS = [['2', '1', '3'], ['0', '4', '5'], ['1', '0', '6']];

  PuzzleBank.define({
    id: 'mat-det-3x3-cofactor',
    category: 'matrix',
    difficulty: 2,
    title: { en: 'A 3×3 determinant', fr: 'Un déterminant 3×3', es: 'Un determinante 3×3', ja: '3×3 の行列式', zh: '一个 3×3 行列式' },
    statement: {
      en: 'Let $A = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$. <b>Which of the following is true?</b>',
      fr: 'Soit $A = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$. <b>Laquelle des affirmations suivantes est vraie ?</b>',
      es: 'Sea $A = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$. <b>¿Cuál de las siguientes afirmaciones es verdadera?</b>',
      ja: '$A = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '设 $A = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$。<b>下列哪一项正确？</b>'
    },
    figureText: {
      en: 'The 3×3 matrix A with rows (2, 1, 3), (0, 4, 5) and (1, 0, 6), written between brackets.',
      fr: 'La matrice 3×3 A de lignes (2, 1, 3), (0, 4, 5) et (1, 0, 6), écrite entre parenthèses.',
      es: 'La matriz 3×3 A con filas (2, 1, 3), (0, 4, 5) y (1, 0, 6), escrita entre paréntesis.',
      ja: '行が (2, 1, 3)、(0, 4, 5)、(1, 0, 6) の 3×3 行列 A を括弧で囲んで示しています。',
      zh: '3×3 矩阵 A，各行为 (2, 1, 3)、(0, 4, 5)、(1, 0, 6)，写在括号中。'
    },
    hint: {
      en: 'Expand along the first column: it contains a $0$, so only two $2\\times2$ minors are needed.',
      fr: 'Développez selon la première colonne : elle contient un $0$, il ne faut donc que deux mineurs $2\\times2$.',
      es: 'Desarrolla por la primera columna: tiene un $0$, así que solo hacen falta dos menores $2\\times2$.',
      ja: '第1列で展開しましょう。$0$ を含むので、$2\\times2$ の小行列式は2つで済みます。',
      zh: '按第一列展开：其中有一个 $0$，所以只需要两个 $2\\times2$ 余子式。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example row reduction to a triangular matrix, or the rule of Sarrus), show every step, then check each option — it is possible that none of them is correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en réduisant à une matrice triangulaire, ou avec la règle de Sarrus), montre chaque étape, puis vérifie chaque option — il est possible qu’aucune ne soit correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo reduciendo a una matriz triangular, o con la regla de Sarrus), muestra cada paso y luego comprueba cada opción — es posible que ninguna sea correcta.',
      ja: 'できれば別の方法で解いてください（例えば三角行列への行基本変形、またはサラスの方法）。すべての手順を示し、各選択肢を確認してください — どれも正しくない可能性もあります。',
      zh: '如果可以，请用另一种方法求解（例如通过行变换化为三角矩阵，或用萨吕法则），写出每一步，然后逐项检查选项 —— 有可能没有一个是正确的。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 2.6, scale: 60, pad: 22 });
      F.text([0.35, 1.3], 'A =', 'mx', 0, 1);
      F.mx = matrix(F, [1.1, 2.4], ROWS, { cw: 0.95, ch: 0.75 });
      return F;
    },
    options: [
      { tex: '\\det A = 31', correct: false, why: {
        en: 'Sign slip in the middle cofactor: $-1\\cdot(0\\cdot6 - 5\\cdot1) = +5$, not $-5$.',
        fr: 'Erreur de signe sur le cofacteur du milieu : $-1\\cdot(0\\cdot6 - 5\\cdot1) = +5$, et non $-5$.',
        es: 'Error de signo en el cofactor central: $-1\\cdot(0\\cdot6 - 5\\cdot1) = +5$, no $-5$.',
        ja: '中央の余因子の符号ミス：$-1\\cdot(0\\cdot6 - 5\\cdot1) = +5$ で、$-5$ ではありません。',
        zh: '中间余子式的符号错了：$-1\\cdot(0\\cdot6 - 5\\cdot1) = +5$，而不是 $-5$。'
      } },
      { tex: '\\det A = 65', correct: false, why: {
        en: 'Sign slip in the last term: $3\\cdot(0\\cdot0 - 4\\cdot1) = -12$, not $+12$.',
        fr: 'Erreur de signe sur le dernier terme : $3\\cdot(0\\cdot0 - 4\\cdot1) = -12$, et non $+12$.',
        es: 'Error de signo en el último término: $3\\cdot(0\\cdot0 - 4\\cdot1) = -12$, no $+12$.',
        ja: '最後の項の符号ミス：$3\\cdot(0\\cdot0 - 4\\cdot1) = -12$ で、$+12$ ではありません。',
        zh: '最后一项符号错了：$3\\cdot(0\\cdot0 - 4\\cdot1) = -12$，而不是 $+12$。'
      } },
      { tex: '\\det A = 2\\cdot4\\cdot6 = 48', correct: false, why: {
        en: 'The product of the diagonal is the determinant only for a triangular matrix.',
        fr: 'Le produit de la diagonale n’est le déterminant que pour une matrice triangulaire.',
        es: 'El producto de la diagonal solo es el determinante en una matriz triangular.',
        ja: '対角成分の積が行列式になるのは三角行列のときだけです。',
        zh: '只有三角矩阵的行列式才等于对角线元素之积。'
      } },
      { tex: '\\det A = 12', correct: false, why: {
        en: 'That is the trace $2 + 4 + 6$, the sum of the diagonal.',
        fr: 'C’est la trace $2 + 4 + 6$, la somme de la diagonale.',
        es: 'Eso es la traza $2 + 4 + 6$, la suma de la diagonal.',
        ja: 'それはトレース $2 + 4 + 6$（対角成分の和）です。',
        zh: '那是迹 $2 + 4 + 6$，即对角线之和。'
      } },
      { tex: '\\det A = -41', correct: false, why: {
        en: 'The right size with the wrong sign — what you get after swapping two rows.',
        fr: 'La bonne valeur avec le mauvais signe — ce qu’on obtient après avoir échangé deux lignes.',
        es: 'El valor correcto con el signo equivocado — lo que sale tras intercambiar dos filas.',
        ja: '大きさは合っていますが符号が逆 — 2つの行を入れ替えたときの値です。',
        zh: '大小对了但符号反了 —— 这是交换两行之后的结果。'
      } },
      { tex: '\\det A = 53', correct: false, why: {
        en: 'Sarrus, but the descending product $3\\cdot4\\cdot1 = 12$ was not subtracted.',
        fr: 'Sarrus, mais le produit descendant $3\\cdot4\\cdot1 = 12$ n’a pas été soustrait.',
        es: 'Sarrus, pero no se restó el producto descendente $3\\cdot4\\cdot1 = 12$.',
        ja: 'サラスの方法ですが、右上がりの積 $3\\cdot4\\cdot1 = 12$ を引き忘れています。',
        zh: '用了萨吕法则，但忘了减去反向乘积 $3\\cdot4\\cdot1 = 12$。'
      } },
      { tex: '\\det A = 17', correct: false, why: {
        en: 'Wrong minor for $a_{12}$: it is $0\\cdot6 - 5\\cdot1$, not $4\\cdot6 - 5\\cdot1$.',
        fr: 'Mauvais mineur pour $a_{12}$ : c’est $0\\cdot6 - 5\\cdot1$, et non $4\\cdot6 - 5\\cdot1$.',
        es: 'Menor equivocado para $a_{12}$: es $0\\cdot6 - 5\\cdot1$, no $4\\cdot6 - 5\\cdot1$.',
        ja: '$a_{12}$ の小行列式が違います：$0\\cdot6 - 5\\cdot1$ で、$4\\cdot6 - 5\\cdot1$ ではありません。',
        zh: '$a_{12}$ 的余子式取错了：应为 $0\\cdot6 - 5\\cdot1$，而不是 $4\\cdot6 - 5\\cdot1$。'
      } },
      { tex: '\\det A = 0', correct: false, why: {
        en: 'A determinant is $0$ only when the rows are linearly dependent; these are not.',
        fr: 'Un déterminant n’est nul que si les lignes sont liées ; ce n’est pas le cas ici.',
        es: 'Un determinante es $0$ solo si las filas son linealmente dependientes; estas no lo son.',
        ja: '行列式が $0$ になるのは行が一次従属のときだけで、この行はそうではありません。',
        zh: '只有各行线性相关时行列式才为 $0$；这里并非如此。'
      } }
    ],
    steps: [
      {
        title: { en: 'Expand along the first column', fr: 'Développer selon la première colonne', es: 'Desarrollar por la primera columna', ja: '第1列で展開する', zh: '按第一列展开' },
        lines: ['\\det A = 2\\begin{vmatrix} 4 & 5 \\\\ 0 & 6 \\end{vmatrix} - 0\\begin{vmatrix} 1 & 3 \\\\ 0 & 6 \\end{vmatrix} + 1\\begin{vmatrix} 1 & 3 \\\\ 4 & 5 \\end{vmatrix}'],
        note: {
          en: 'Signs alternate $+\\,-\\,+$ down the column; the $0$ kills the middle term.',
          fr: 'Les signes alternent $+\\,-\\,+$ le long de la colonne ; le $0$ annule le terme du milieu.',
          es: 'Los signos alternan $+\\,-\\,+$ a lo largo de la columna; el $0$ anula el término central.',
          ja: '列に沿って符号は $+\\,-\\,+$ と交互になり、$0$ のおかげで中央の項は消えます。',
          zh: '沿列符号依次为 $+\\,-\\,+$；$0$ 让中间一项消失。'
        },
        fig(F) { F.fadeIn(F.mx.col(0, 'fill-yellow'), 600); }
      },
      {
        title: { en: 'The two minors', fr: 'Les deux mineurs', es: 'Los dos menores', ja: '2つの小行列式', zh: '两个余子式' },
        lines: ['\\begin{vmatrix} 4 & 5 \\\\ 0 & 6 \\end{vmatrix} = 24, \\qquad \\begin{vmatrix} 1 & 3 \\\\ 4 & 5 \\end{vmatrix} = 5 - 12 = -7', '\\det A = 2\\cdot 24 + 1\\cdot(-7) = \\boxed{41}'],
        note: {
          en: 'Each minor is what is left after crossing out the row and the column of its entry.',
          fr: 'Chaque mineur est ce qui reste après avoir barré la ligne et la colonne de son coefficient.',
          es: 'Cada menor es lo que queda al tachar la fila y la columna de su elemento.',
          ja: '各小行列式は、その成分の行と列を消して残った部分です。',
          zh: '每个余子式就是划去该元素所在行和列后剩下的部分。'
        },
        fig(F) { [[1, 1], [1, 2], [2, 1], [2, 2]].forEach(([i, j], n) => F.fadeIn(F.mx.box(i, j, 'fill-blue'), 400, 120 * n)); [[0, 1], [0, 2], [1, 1], [1, 2]].forEach(([i, j], n) => F.fadeIn(F.mx.box(i, j, 'fill-pink'), 400, 900 + 120 * n)); }
      },
      {
        title: { en: 'Check with the rule of Sarrus', fr: 'Vérifier avec la règle de Sarrus', es: 'Comprobar con la regla de Sarrus', ja: 'サラスの方法で確認', zh: '用萨吕法则验证' },
        lines: ['(2\\cdot4\\cdot6 + 1\\cdot5\\cdot1 + 3\\cdot0\\cdot0) - (3\\cdot4\\cdot1 + 2\\cdot5\\cdot0 + 1\\cdot0\\cdot6)', '= (48 + 5 + 0) - (12 + 0 + 0) = 41\\ \\checkmark'],
        note: {
          en: 'Three products down to the right, minus three products down to the left.',
          fr: 'Trois produits descendant vers la droite, moins trois produits descendant vers la gauche.',
          es: 'Tres productos bajando hacia la derecha, menos tres productos bajando hacia la izquierda.',
          ja: '右下がりの3つの積から、左下がりの3つの積を引きます。',
          zh: '三条向右下的乘积，减去三条向左下的乘积。'
        },
        fig(F) { F.clear('fills'); const c = F.mx.c; F.draw(F.seg(c(0, 0), c(2, 2), 'hl green', 'fills'), 700); F.draw(F.seg(c(0, 2), c(2, 0), 'hl pink', 'fills'), 700, 500); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: {
          en: 'The determinant is $41$ — it is not among the options, so “None of these is correct” is the right answer.',
          fr: 'Le déterminant vaut $41$ — il ne figure pas parmi les options, donc « Aucune n’est correcte » est la bonne réponse.',
          es: 'El determinante es $41$ — no está entre las opciones, así que «Ninguna es correcta» es la respuesta correcta.',
          ja: '行列式は $41$ — 選択肢にないので「どれも正しくない」が正解です。',
          zh: '行列式是 $41$ —— 它不在选项中，所以“以上都不正确”是正确答案。'
        }
      }
    ]
  });
})(PuzzleBank.kit);
