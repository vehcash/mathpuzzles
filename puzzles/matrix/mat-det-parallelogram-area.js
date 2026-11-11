/* matrix · The area hidden in a determinant
   A 2×2 determinant is the (signed) area of the parallelogram spanned by its columns. */
(function (K) {
  'use strict';
  const { Figure, grid, arrow } = K;
  const O = [0, 0], U = [3, 1], V = [1, 2], W = [4, 3];

  PuzzleBank.define({
    id: 'mat-det-parallelogram-area',
    category: 'matrix',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["alevelfm"]
    },
    difficulty: 1,
    title: { en: 'The area hidden in a determinant', fr: 'L’aire cachée dans un déterminant', es: 'El área escondida en un determinante', ja: '行列式に隠れた面積', zh: '藏在行列式里的面积' },
    statement: {
      en: 'The vectors $\\vec u = (3, 1)$ and $\\vec v = (1, 2)$ span a parallelogram. <b>Which of the following equal its area?</b>',
      fr: 'Les vecteurs $\\vec u = (3, 1)$ et $\\vec v = (1, 2)$ engendrent un parallélogramme. <b>Lesquelles des valeurs suivantes sont égales à son aire ?</b>',
      es: 'Los vectores $\\vec u = (3, 1)$ y $\\vec v = (1, 2)$ generan un paralelogramo. <b>¿Cuáles de los siguientes son iguales a su área?</b>',
      ja: 'ベクトル $\\vec u = (3, 1)$ と $\\vec v = (1, 2)$ が平行四辺形をつくります。<b>次のうち、その面積に等しいものはどれですか？</b>',
      zh: '向量 $\\vec u = (3, 1)$ 和 $\\vec v = (1, 2)$ 张成一个平行四边形。<b>下列哪些等于它的面积？</b>'
    },
    figureText: {
      en: 'A unit grid. From the origin O the vector u goes to (3, 1) and the vector v goes to (1, 2); the parallelogram O, (3, 1), (4, 3), (1, 2) is shaded.',
      fr: 'Un quadrillage unité. Depuis l’origine O, le vecteur u va jusqu’en (3, 1) et le vecteur v jusqu’en (1, 2) ; le parallélogramme O, (3, 1), (4, 3), (1, 2) est grisé.',
      es: 'Una cuadrícula unidad. Desde el origen O el vector u llega a (3, 1) y el vector v a (1, 2); el paralelogramo O, (3, 1), (4, 3), (1, 2) está sombreado.',
      ja: '単位方眼。原点 O からベクトル u は (3, 1) へ、ベクトル v は (1, 2) へ向かいます。平行四辺形 O, (3, 1), (4, 3), (1, 2) に色が付いています。',
      zh: '单位方格。从原点 O 出发，向量 u 指向 (3, 1)，向量 v 指向 (1, 2)；平行四边形 O、(3, 1)、(4, 3)、(1, 2) 涂有阴影。'
    },
    hint: {
      en: 'Put $\\vec u$ and $\\vec v$ as the columns of a $2\\times2$ matrix: the area is the absolute value of its determinant.',
      fr: 'Placez $\\vec u$ et $\\vec v$ en colonnes d’une matrice $2\\times2$ : l’aire est la valeur absolue de son déterminant.',
      es: 'Pon $\\vec u$ y $\\vec v$ como columnas de una matriz $2\\times2$: el área es el valor absoluto de su determinante.',
      ja: '$\\vec u$ と $\\vec v$ を $2\\times2$ 行列の列にします。面積はその行列式の絶対値です。',
      zh: '把 $\\vec u$ 和 $\\vec v$ 作为 $2\\times2$ 矩阵的两列：面积就是它的行列式的绝对值。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example the box method: the surrounding rectangle minus the corner triangles and squares), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple la méthode du rectangle englobant moins les triangles et carrés des coins), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo el rectángulo que lo rodea menos los triángulos y cuadrados de las esquinas), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば外側の長方形から角の三角形と正方形を引く方法）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如用外接矩形减去四角的三角形和小正方形），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.4, scale: 56, pad: 26 });
      grid(F, 0, 0, 4, 3);
      F.path([O, U, W, V], 'fill-blue', 'fills');
      F.path([O, U, W, V], 'tri');
      arrow(F, O, U, 'vec'); arrow(F, O, V, 'vec two');
      F.dot(O); F.text(O, 'O', 'pt', -12, 12);
      F.text([1.5, 0.5], 'u', 'pt', 4, 16); F.text([0.5, 1], 'v', 'pt', -14, -4);
      F.text(U, '(3, 1)', 'len small', 26, 6); F.text(V, '(1, 2)', 'len small', -30, -8);
      return F;
    },
    options: [
      { tex: '5', correct: true, why: {
        en: 'The area: $3\\cdot 2 - 1\\cdot 1 = 5$.',
        fr: 'L’aire : $3\\cdot 2 - 1\\cdot 1 = 5$.',
        es: 'El área: $3\\cdot 2 - 1\\cdot 1 = 5$.',
        ja: '面積：$3\\cdot 2 - 1\\cdot 1 = 5$。',
        zh: '面积：$3\\cdot 2 - 1\\cdot 1 = 5$。'
      } },
      { tex: '\\left|\\det\\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}\\right|', correct: true, why: {
        en: 'The same number written as a determinant: $|6 - 1| = 5$.',
        fr: 'Le même nombre écrit comme un déterminant : $|6 - 1| = 5$.',
        es: 'El mismo número escrito como determinante: $|6 - 1| = 5$.',
        ja: '同じ数を行列式で書いたもの：$|6 - 1| = 5$。',
        zh: '同一个数写成行列式：$|6 - 1| = 5$。'
      } },
      { tex: '7', correct: false, why: {
        en: 'Adds instead of subtracting: $3\\cdot2 + 1\\cdot1$ — also what the box method gives if you forget the two corner squares.',
        fr: 'Additionne au lieu de soustraire : $3\\cdot2 + 1\\cdot1$ — c’est aussi ce que donne la méthode du rectangle si l’on oublie les deux petits carrés.',
        es: 'Suma en lugar de restar: $3\\cdot2 + 1\\cdot1$ — también es lo que da el método del rectángulo si se olvidan los dos cuadraditos.',
        ja: '引かずに足しています：$3\\cdot2 + 1\\cdot1$ — 長方形の方法で角の小さな正方形2つを忘れたときの値でもあります。',
        zh: '把减法做成了加法：$3\\cdot2 + 1\\cdot1$ —— 这也是用外接矩形法时漏掉两个角上小正方形得到的结果。'
      } },
      { tex: '\\tfrac52', correct: false, why: {
        en: 'Half of it: the area of the triangle $O$, $\\vec u$, $\\vec v$.',
        fr: 'La moitié : l’aire du triangle $O$, $\\vec u$, $\\vec v$.',
        es: 'La mitad: el área del triángulo $O$, $\\vec u$, $\\vec v$.',
        ja: 'その半分：三角形 $O$, $\\vec u$, $\\vec v$ の面積です。',
        zh: '一半：三角形 $O$、$\\vec u$、$\\vec v$ 的面积。'
      } },
      { tex: '6', correct: false, why: {
        en: 'Only $3\\cdot 2$ — the term $-1\\cdot 1$ is missing.',
        fr: 'Seulement $3\\cdot 2$ — il manque le terme $-1\\cdot 1$.',
        es: 'Solo $3\\cdot 2$ — falta el término $-1\\cdot 1$.',
        ja: '$3\\cdot 2$ だけ — 項 $-1\\cdot 1$ が抜けています。',
        zh: '只算了 $3\\cdot 2$ —— 漏了 $-1\\cdot 1$ 这一项。'
      } },
      { tex: '\\sqrt{10}\\cdot\\sqrt5', correct: false, why: {
        en: '$|\\vec u|\\,|\\vec v|$ is the area only when the vectors are perpendicular; here it is $\\approx 7.07$.',
        fr: '$|\\vec u|\\,|\\vec v|$ n’est l’aire que si les vecteurs sont perpendiculaires ; ici cela vaut $\\approx 7.07$.',
        es: '$|\\vec u|\\,|\\vec v|$ solo es el área si los vectores son perpendiculares; aquí vale $\\approx 7.07$.',
        ja: '$|\\vec u|\\,|\\vec v|$ が面積になるのは2つのベクトルが垂直なときだけです。ここでは $\\approx 7.07$。',
        zh: '只有两向量垂直时，$|\\vec u|\\,|\\vec v|$ 才是面积；这里它约为 $\\approx 7.07$。'
      } },
      { tex: '12', correct: false, why: {
        en: 'The surrounding $4\\times 3$ rectangle, before removing the corners.',
        fr: 'Le rectangle englobant $4\\times 3$, avant de retirer les coins.',
        es: 'El rectángulo $4\\times 3$ que lo rodea, antes de quitar las esquinas.',
        ja: '角を除く前の外側の $4\\times 3$ の長方形です。',
        zh: '外接的 $4\\times 3$ 矩形，还没减去四角。'
      } },
      { tex: '-5', correct: false, why: {
        en: 'The determinant with the columns swapped is $-5$, but an area is never negative.',
        fr: 'Le déterminant avec les colonnes échangées vaut $-5$, mais une aire n’est jamais négative.',
        es: 'El determinante con las columnas intercambiadas es $-5$, pero un área nunca es negativa.',
        ja: '列を入れ替えた行列式は $-5$ ですが、面積は負になりません。',
        zh: '交换两列后的行列式是 $-5$，但面积不可能为负。'
      } }
    ],
    steps: [
      {
        title: { en: 'Vectors as columns', fr: 'Les vecteurs en colonnes', es: 'Los vectores como columnas', ja: 'ベクトルを列に並べる', zh: '把向量作为列' },
        lines: ['M = \\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix} = \\big(\\,\\vec u\\ \\ \\vec v\\,\\big)', 'S = \\left|\\det M\\right|'],
        note: {
          en: 'A $2\\times2$ determinant measures how much the matrix stretches areas: the unit square becomes this parallelogram.',
          fr: 'Un déterminant $2\\times2$ mesure de combien la matrice dilate les aires : le carré unité devient ce parallélogramme.',
          es: 'Un determinante $2\\times2$ mide cuánto estira las áreas la matriz: el cuadrado unidad se convierte en este paralelogramo.',
          ja: '$2\\times2$ の行列式は、行列が面積を何倍にするかを表します。単位正方形がこの平行四辺形に移ります。',
          zh: '$2\\times2$ 行列式衡量矩阵把面积放大多少倍：单位正方形变成了这个平行四边形。'
        },
        fig(F) { F.draw(F.path([[0, 0], [1, 0], [1, 1], [0, 1]], 'hl yellow', 'over'), 900); }
      },
      {
        title: { en: 'Compute the determinant', fr: 'Calculer le déterminant', es: 'Calcular el determinante', ja: '行列式を計算する', zh: '计算行列式' },
        lines: ['\\det M = 3\\cdot 2 - 1\\cdot 1 = 5', 'S = |5| = \\boxed{5}'],
        note: {
          en: 'Main diagonal minus the other diagonal: $ad - bc$.',
          fr: 'Diagonale principale moins l’autre diagonale : $ad - bc$.',
          es: 'Diagonal principal menos la otra diagonal: $ad - bc$.',
          ja: '主対角線の積から、もう一方の対角線の積を引きます：$ad - bc$。',
          zh: '主对角线乘积减去副对角线乘积：$ad - bc$。'
        },
        fig(F) { F.fadeIn(F.path([O, U, W, V], 'fill-yellow', 'fills'), 700); }
      },
      {
        title: { en: 'Check with the box method', fr: 'Vérifier avec le rectangle englobant', es: 'Comprobar con el rectángulo exterior', ja: '外側の長方形で確認', zh: '用外接矩形法验证' },
        lines: ['4\\cdot 3 - 2\\cdot\\tfrac{3\\cdot1}{2} - 2\\cdot\\tfrac{1\\cdot2}{2} - 2\\cdot 1', '= 12 - 3 - 2 - 2 = 5\\ \\checkmark'],
        note: {
          en: 'The $4\\times3$ rectangle minus two pairs of right triangles and two unit squares in the corners.',
          fr: 'Le rectangle $4\\times3$ moins deux paires de triangles rectangles et deux carrés unité dans les coins.',
          es: 'El rectángulo $4\\times3$ menos dos pares de triángulos rectángulos y dos cuadrados unidad en las esquinas.',
          ja: '$4\\times3$ の長方形から、2組の直角三角形と角の単位正方形2つを引きます。',
          zh: '$4\\times3$ 矩形减去两对直角三角形和角上的两个单位正方形。'
        },
        fig(F) {
          F.draw(F.path([[0, 0], [4, 0], [4, 3], [0, 3]], 'hl blue', 'over'), 1000);
          [[[0, 0], [3, 0], [3, 1]], [[1, 2], [4, 3], [1, 3]], [[0, 0], [1, 2], [0, 2]], [[3, 1], [4, 1], [4, 3]]].forEach((t, i) => F.fadeIn(F.path(t, 'fill-pink', 'fills'), 400, 600 + 150 * i));
          [[3, 0], [0, 2]].forEach((c, i) => F.fadeIn(F.rect(c[0], c[1], 1, 1, 'fill-green', 'fills'), 400, 1300 + 150 * i));
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two options are the same area written differently.', fr: 'Deux options sont la même aire écrite différemment.', es: 'Dos opciones son la misma área escrita de forma distinta.', ja: '2つの選択肢は同じ面積を別の形で書いたものです。', zh: '有两个选项是同一面积的不同写法。' }
      }
    ]
  });
})(PuzzleBank.kit);
