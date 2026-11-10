/* matrix · Cramer’s rule
   A 2×2 linear system solved with three determinants, and its picture: two lines crossing at (1, 2). */
(function (K) {
  'use strict';
  const { Figure, grid, matrix } = K;
  const X0 = -2, X1 = 5, Y0 = -1, Y1 = 4;
  const T = ([x, y]) => [x - X0, y - Y0];          // shift so the figure starts at (0, 0)
  const L1 = x => (8 - 2 * x) / 3, L2 = x => x + 1;

  PuzzleBank.define({
    id: 'mat-cramer-2x2',
    category: 'matrix',
    difficulty: 2,
    title: { en: 'Cramer’s rule', fr: 'La règle de Cramer', es: 'La regla de Cramer', ja: 'クラメルの公式', zh: '克拉默法则' },
    statement: {
      en: 'Solve $\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}$ with determinants. Let $D$ be the determinant of the coefficient matrix. <b>Which of the following are true?</b>',
      fr: 'Résolvez $\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}$ à l’aide de déterminants. Soit $D$ le déterminant de la matrice des coefficients. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'Resuelve $\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}$ con determinantes. Sea $D$ el determinante de la matriz de coeficientes. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '$\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}$ を行列式を使って解きます。係数行列の行列式を $D$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '用行列式解方程组 $\\begin{cases} 2x + 3y = 8 \\\\ x - y = -1 \\end{cases}$。设 $D$ 为系数矩阵的行列式。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'Coordinate axes with the lines 2x + 3y = 8 and x − y = −1; they cross at the point (1, 2). The coefficient matrix (2 3; 1 −1) is written in a corner.',
      fr: 'Des axes avec les droites 2x + 3y = 8 et x − y = −1 ; elles se coupent au point (1, 2). La matrice des coefficients (2 3 ; 1 −1) est écrite dans un coin.',
      es: 'Ejes con las rectas 2x + 3y = 8 y x − y = −1; se cortan en el punto (1, 2). La matriz de coeficientes (2 3; 1 −1) está escrita en una esquina.',
      ja: '座標軸と直線 2x + 3y = 8、x − y = −1。2直線は点 (1, 2) で交わります。隅に係数行列 (2 3; 1 −1) が書かれています。',
      zh: '坐标轴上画有直线 2x + 3y = 8 和 x − y = −1，它们交于点 (1, 2)。角落里写着系数矩阵 (2 3; 1 −1)。'
    },
    hint: {
      en: '$x = \\dfrac{D_x}{D}$ and $y = \\dfrac{D_y}{D}$, where $D_x$ ($D_y$) is $D$ with the $x$-column ($y$-column) replaced by the constants $8, -1$.',
      fr: '$x = \\dfrac{D_x}{D}$ et $y = \\dfrac{D_y}{D}$, où $D_x$ ($D_y$) est $D$ dont la colonne de $x$ (de $y$) est remplacée par les constantes $8, -1$.',
      es: '$x = \\dfrac{D_x}{D}$ e $y = \\dfrac{D_y}{D}$, donde $D_x$ ($D_y$) es $D$ con la columna de $x$ (de $y$) sustituida por los términos independientes $8, -1$.',
      ja: '$x = \\dfrac{D_x}{D}$、$y = \\dfrac{D_y}{D}$。$D_x$（$D_y$）は $D$ の $x$ の列（$y$ の列）を定数 $8, -1$ に置き換えたものです。',
      zh: '$x = \\dfrac{D_x}{D}$，$y = \\dfrac{D_y}{D}$，其中 $D_x$（$D_y$）是把 $D$ 中 $x$ 列（$y$ 列）换成常数 $8, -1$ 后的行列式。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example substitution, elimination, or the inverse matrix), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d’une autre façon si possible (par exemple par substitution, par combinaison, ou avec la matrice inverse), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo sustitución, reducción o la matriz inversa), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば代入法、加減法、逆行列）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如代入法、消元法或逆矩阵），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: X1 - X0 + 2.4, h: Y1 - Y0, scale: 40, pad: 20 });
      grid(F, 0, 0, X1 - X0, Y1 - Y0);
      F.seg(T([X0, 0]), T([X1, 0]), 'axis'); F.seg(T([0, Y0]), T([0, Y1]), 'axis');
      F.line1 = F.seg(T([-2, L1(-2)]), T([5, L1(5)]), 'graph');
      F.line2 = F.seg(T([-2, L2(-2)]), T([3, L2(3)]), 'graph');
      F.line2.style.stroke = '#3b8fbb';
      F.text(T([4.2, L1(4.2)]), '2x + 3y = 8', 'len it small', 0, -14);
      F.text(T([2.6, L2(2.6)]), 'x − y = −1', 'len it small', -52, -4);
      matrix(F, [X1 - X0 + 0.55, 3.2], [['2', '3'], ['1', '−1']], { cw: 0.85, ch: 0.62, cls: 'small' });
      return F;
    },
    options: [
      { tex: 'D = \\begin{vmatrix} 2 & 3 \\\\ 1 & -1 \\end{vmatrix} = -5', correct: true, why: {
        en: '$2\\cdot(-1) - 3\\cdot1 = -5$.',
        fr: '$2\\cdot(-1) - 3\\cdot1 = -5$.',
        es: '$2\\cdot(-1) - 3\\cdot1 = -5$.',
        ja: '$2\\cdot(-1) - 3\\cdot1 = -5$。',
        zh: '$2\\cdot(-1) - 3\\cdot1 = -5$。'
      } },
      { tex: '(x, y) = (1, 2)', correct: true, why: {
        en: '$x = \\tfrac{-5}{-5} = 1$, $y = \\tfrac{-10}{-5} = 2$; check: $2 + 6 = 8$ and $1 - 2 = -1$.',
        fr: '$x = \\tfrac{-5}{-5} = 1$, $y = \\tfrac{-10}{-5} = 2$ ; vérification : $2 + 6 = 8$ et $1 - 2 = -1$.',
        es: '$x = \\tfrac{-5}{-5} = 1$, $y = \\tfrac{-10}{-5} = 2$; comprobación: $2 + 6 = 8$ y $1 - 2 = -1$.',
        ja: '$x = \\tfrac{-5}{-5} = 1$、$y = \\tfrac{-10}{-5} = 2$。確認：$2 + 6 = 8$、$1 - 2 = -1$。',
        zh: '$x = \\tfrac{-5}{-5} = 1$，$y = \\tfrac{-10}{-5} = 2$；验证：$2 + 6 = 8$，$1 - 2 = -1$。'
      } },
      { tex: 'D = 5', correct: false, why: {
        en: 'Sign slip: $2\\cdot(-1) - 3\\cdot 1$ is $-5$.',
        fr: 'Erreur de signe : $2\\cdot(-1) - 3\\cdot 1$ vaut $-5$.',
        es: 'Error de signo: $2\\cdot(-1) - 3\\cdot 1$ es $-5$.',
        ja: '符号ミス：$2\\cdot(-1) - 3\\cdot 1$ は $-5$ です。',
        zh: '符号错误：$2\\cdot(-1) - 3\\cdot 1$ 等于 $-5$。'
      } },
      { tex: 'D = 1', correct: false, why: {
        en: 'Adds the second product: $2\\cdot(-1) + 3\\cdot1$.',
        fr: 'Ajoute le second produit : $2\\cdot(-1) + 3\\cdot1$.',
        es: 'Suma el segundo producto: $2\\cdot(-1) + 3\\cdot1$.',
        ja: '2つ目の積を足しています：$2\\cdot(-1) + 3\\cdot1$。',
        zh: '把第二个乘积加上了：$2\\cdot(-1) + 3\\cdot1$。'
      } },
      { tex: 'D_x = \\begin{vmatrix} 2 & 8 \\\\ 1 & -1 \\end{vmatrix}', correct: false, why: {
        en: 'That is $D_y$: in $D_x$ the constants replace the first column (the $x$-column).',
        fr: 'C’est $D_y$ : dans $D_x$, les constantes remplacent la première colonne (celle de $x$).',
        es: 'Eso es $D_y$: en $D_x$ los términos independientes sustituyen a la primera columna (la de $x$).',
        ja: 'それは $D_y$ です。$D_x$ では定数が第1列（$x$ の列）と入れ替わります。',
        zh: '那是 $D_y$：在 $D_x$ 中，常数替换的是第一列（$x$ 列）。'
      } },
      { tex: '(x, y) = (2, 1)', correct: false, why: {
        en: 'Swapped: $2\\cdot2 + 3\\cdot1 = 7 \\ne 8$.',
        fr: 'Inversé : $2\\cdot2 + 3\\cdot1 = 7 \\ne 8$.',
        es: 'Intercambiados: $2\\cdot2 + 3\\cdot1 = 7 \\ne 8$.',
        ja: '入れ替わっています：$2\\cdot2 + 3\\cdot1 = 7 \\ne 8$。',
        zh: '弄反了：$2\\cdot2 + 3\\cdot1 = 7 \\ne 8$。'
      } },
      { tex: 'x = \\dfrac{D}{D_x}', correct: false, why: {
        en: 'Upside down: $x = \\dfrac{D_x}{D}$ (here both are $-5$, but in general they are not).',
        fr: 'À l’envers : $x = \\dfrac{D_x}{D}$ (ici les deux valent $-5$, mais en général non).',
        es: 'Al revés: $x = \\dfrac{D_x}{D}$ (aquí ambos valen $-5$, pero en general no).',
        ja: '逆さまです：$x = \\dfrac{D_x}{D}$（ここではどちらも $-5$ ですが、一般には違います）。',
        zh: '分子分母颠倒了：$x = \\dfrac{D_x}{D}$（这里两者恰好都是 $-5$，但一般并不相等）。'
      } },
      { tex: '(x, y) = (-1, 2)', correct: false, why: {
        en: 'Sign slip in $x$: $2\\cdot(-1) + 3\\cdot2 = 4 \\ne 8$.',
        fr: 'Erreur de signe sur $x$ : $2\\cdot(-1) + 3\\cdot2 = 4 \\ne 8$.',
        es: 'Error de signo en $x$: $2\\cdot(-1) + 3\\cdot2 = 4 \\ne 8$.',
        ja: '$x$ の符号ミス：$2\\cdot(-1) + 3\\cdot2 = 4 \\ne 8$。',
        zh: '$x$ 的符号错了：$2\\cdot(-1) + 3\\cdot2 = 4 \\ne 8$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Write the system as a matrix', fr: 'Écrire le système sous forme matricielle', es: 'Escribir el sistema en forma matricial', ja: '連立方程式を行列で書く', zh: '把方程组写成矩阵形式' },
        lines: ['\\begin{pmatrix} 2 & 3 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -1 \\end{pmatrix}', 'D = 2\\cdot(-1) - 3\\cdot 1 = -5 \\ne 0'],
        note: {
          en: '$D \\ne 0$, so there is exactly one solution: the two lines are not parallel.',
          fr: '$D \\ne 0$, il y a donc exactement une solution : les deux droites ne sont pas parallèles.',
          es: '$D \\ne 0$, así que hay exactamente una solución: las dos rectas no son paralelas.',
          ja: '$D \\ne 0$ なので解はちょうど1つ：2直線は平行ではありません。',
          zh: '$D \\ne 0$，所以恰有一个解：两直线不平行。'
        },
        fig(F) { F.draw(F.seg(T([-2, L1(-2)]), T([5, L1(5)]), 'hl yellow', 'fills'), 900); F.draw(F.seg(T([-2, L2(-2)]), T([3, L2(3)]), 'hl blue', 'fills'), 900, 400); }
      },
      {
        title: { en: 'Replace the x-column', fr: 'Remplacer la colonne de x', es: 'Sustituir la columna de x', ja: 'x の列を置き換える', zh: '替换 x 列' },
        lines: ['D_x = \\begin{vmatrix} 8 & 3 \\\\ -1 & -1 \\end{vmatrix} = -8 + 3 = -5', 'x = \\frac{D_x}{D} = \\frac{-5}{-5} = 1'],
        note: {
          en: 'The constants $8$ and $-1$ take the place of the coefficients of $x$.',
          fr: 'Les constantes $8$ et $-1$ prennent la place des coefficients de $x$.',
          es: 'Los términos independientes $8$ y $-1$ ocupan el lugar de los coeficientes de $x$.',
          ja: '定数 $8$ と $-1$ が $x$ の係数の位置に入ります。',
          zh: '常数 $8$ 和 $-1$ 取代了 $x$ 的系数。'
        },
        fig(F) { F.draw(F.seg(T([1, Y0]), T([1, 2]), 'hl yellow', 'over'), 700); }
      },
      {
        title: { en: 'Replace the y-column', fr: 'Remplacer la colonne de y', es: 'Sustituir la columna de y', ja: 'y の列を置き換える', zh: '替换 y 列' },
        lines: ['D_y = \\begin{vmatrix} 2 & 8 \\\\ 1 & -1 \\end{vmatrix} = -2 - 8 = -10', 'y = \\frac{D_y}{D} = \\frac{-10}{-5} = 2'],
        note: {
          en: 'Same idea with the second column.',
          fr: 'Même idée avec la deuxième colonne.',
          es: 'La misma idea con la segunda columna.',
          ja: '第2列で同じことをします。',
          zh: '对第二列做同样的事。'
        },
        fig(F) { F.draw(F.seg(T([X0, 2]), T([1, 2]), 'hl pink', 'over'), 700); }
      },
      {
        title: { en: 'Check on the graph', fr: 'Vérifier sur le graphique', es: 'Comprobar en la gráfica', ja: 'グラフで確認', zh: '在图上验证' },
        lines: ['2\\cdot1 + 3\\cdot2 = 8\\ \\checkmark \\qquad 1 - 2 = -1\\ \\checkmark', '(x, y) = \\boxed{(1, 2)}'],
        note: {
          en: 'The solution is the point where the two lines cross.',
          fr: 'La solution est le point où les deux droites se coupent.',
          es: 'La solución es el punto donde se cortan las dos rectas.',
          ja: '解は2直線が交わる点です。',
          zh: '解就是两直线的交点。'
        },
        fig(F) { F.fadeIn(F.circle(T([1, 2]), 0.22, 'halo', 'over'), 500); F.fadeIn(F.dot(T([1, 2])), 300, 200); F.fadeIn(F.text(T([1, 2]), '(1, 2)', 'len', -30, -14), 400, 400); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two statements are true.', fr: 'Deux affirmations sont vraies.', es: 'Dos afirmaciones son verdaderas.', ja: '正しい記述は2つです。', zh: '有两个说法正确。' }
      }
    ]
  });
})(PuzzleBank.kit);
