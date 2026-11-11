/* matrix · Order matters
   Row-by-column products: AB and BA are different, but their determinants agree. */
(function (K) {
  'use strict';
  const { Figure, matrix } = K;

  PuzzleBank.define({
    id: 'mat-product-order',
    category: 'matrix',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ebau", "alevelfm"]
    },
    difficulty: 1,
    title: { en: 'Order matters', fr: 'L’ordre compte', es: 'El orden importa', ja: '順番が大事', zh: '顺序很重要' },
    statement: {
      en: 'Let $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$. <b>Which of the following are true?</b>',
      fr: 'Soit $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ et $B = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'Sean $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '$A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$、$B = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '设 $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$，$B = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'The matrices A = (1 2; 0 1) and B = (1 0; 3 1) written side by side, ready to be multiplied row by column.',
      fr: 'Les matrices A = (1 2 ; 0 1) et B = (1 0 ; 3 1) côte à côte, prêtes à être multipliées ligne par colonne.',
      es: 'Las matrices A = (1 2; 0 1) y B = (1 0; 3 1) una junto a otra, listas para multiplicarse fila por columna.',
      ja: '行列 A = (1 2; 0 1) と B = (1 0; 3 1) を並べて書き、行×列で掛ける準備をしています。',
      zh: '矩阵 A = (1 2; 0 1) 和 B = (1 0; 3 1) 并排写出，准备按“行乘列”相乘。'
    },
    hint: {
      en: 'Entry $(i, j)$ of $AB$ is row $i$ of $A$ times column $j$ of $B$. Then do $BA$ the same way and compare.',
      fr: 'Le coefficient $(i, j)$ de $AB$ est la ligne $i$ de $A$ fois la colonne $j$ de $B$. Faites ensuite $BA$ de la même façon et comparez.',
      es: 'El elemento $(i, j)$ de $AB$ es la fila $i$ de $A$ por la columna $j$ de $B$. Después haz $BA$ igual y compara.',
      ja: '$AB$ の $(i, j)$ 成分は「$A$ の第 $i$ 行 × $B$ の第 $j$ 列」です。同じように $BA$ も計算して比べましょう。',
      zh: '$AB$ 的 $(i, j)$ 元是 $A$ 的第 $i$ 行乘 $B$ 的第 $j$ 列。再用同样方法算 $BA$ 并比较。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example by seeing A and B as shears and composing the transformations), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en voyant A et B comme des transvections et en composant les transformations), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo viendo A y B como cizallas y componiendo las transformaciones), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば A と B をせん断変換と見て合成する）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如把 A 和 B 看作错切变换并复合），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 2.0, scale: 58, pad: 20 });
      F.text([0.35, 1.0], 'A =', 'mx', 0, 1); F.mA = matrix(F, [0.95, 1.75], [['1', '2'], ['0', '1']]);
      F.text([3.25, 1.0], 'B =', 'mx', 0, 1); F.mB = matrix(F, [3.85, 1.75], [['1', '0'], ['3', '1']]);
      return F;
    },
    options: [
      { tex: 'AB = \\begin{pmatrix} 7 & 2 \\\\ 3 & 1 \\end{pmatrix}', correct: true, why: {
        en: 'Row by column: $1\\cdot1 + 2\\cdot3 = 7$, $1\\cdot0 + 2\\cdot1 = 2$, $0\\cdot1 + 1\\cdot3 = 3$, $0\\cdot0 + 1\\cdot1 = 1$.',
        fr: 'Ligne par colonne : $1\\cdot1 + 2\\cdot3 = 7$, $1\\cdot0 + 2\\cdot1 = 2$, $0\\cdot1 + 1\\cdot3 = 3$, $0\\cdot0 + 1\\cdot1 = 1$.',
        es: 'Fila por columna: $1\\cdot1 + 2\\cdot3 = 7$, $1\\cdot0 + 2\\cdot1 = 2$, $0\\cdot1 + 1\\cdot3 = 3$, $0\\cdot0 + 1\\cdot1 = 1$.',
        ja: '行×列：$1\\cdot1 + 2\\cdot3 = 7$、$1\\cdot0 + 2\\cdot1 = 2$、$0\\cdot1 + 1\\cdot3 = 3$、$0\\cdot0 + 1\\cdot1 = 1$。',
        zh: '行乘列：$1\\cdot1 + 2\\cdot3 = 7$，$1\\cdot0 + 2\\cdot1 = 2$，$0\\cdot1 + 1\\cdot3 = 3$，$0\\cdot0 + 1\\cdot1 = 1$。'
      } },
      { tex: '\\det(AB) = 1', correct: true, why: {
        en: '$7\\cdot1 - 2\\cdot3 = 1$, and also $\\det A\\cdot\\det B = 1\\cdot1$.',
        fr: '$7\\cdot1 - 2\\cdot3 = 1$, et aussi $\\det A\\cdot\\det B = 1\\cdot1$.',
        es: '$7\\cdot1 - 2\\cdot3 = 1$, y también $\\det A\\cdot\\det B = 1\\cdot1$.',
        ja: '$7\\cdot1 - 2\\cdot3 = 1$。また $\\det A\\cdot\\det B = 1\\cdot1$ でもあります。',
        zh: '$7\\cdot1 - 2\\cdot3 = 1$，同时 $\\det A\\cdot\\det B = 1\\cdot1$。'
      } },
      { tex: 'AB = BA', correct: false, why: {
        en: '$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$: matrix multiplication is not commutative.',
        fr: '$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$ : le produit matriciel n’est pas commutatif.',
        es: '$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$: el producto de matrices no es conmutativo.',
        ja: '$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$。行列の積は交換法則を満たしません。',
        zh: '$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$：矩阵乘法不满足交换律。'
      } },
      { tex: 'BA = \\begin{pmatrix} 7 & 2 \\\\ 3 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'That is $AB$; $BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$.',
        fr: 'C’est $AB$ ; $BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$.',
        es: 'Eso es $AB$; $BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$.',
        ja: 'それは $AB$ です。$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$。',
        zh: '那是 $AB$；$BA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$。'
      } },
      { tex: 'AB = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'That is the entry-by-entry product — not how matrices multiply.',
        fr: 'C’est le produit coefficient par coefficient — ce n’est pas ainsi qu’on multiplie des matrices.',
        es: 'Eso es el producto elemento a elemento — no es así como se multiplican matrices.',
        ja: 'それは成分ごとの積です — 行列の掛け算はそうではありません。',
        zh: '那是逐元素相乘 —— 矩阵乘法不是这样算的。'
      } },
      { tex: '\\operatorname{tr}(AB) = 7', correct: false, why: {
        en: 'The trace is the sum of the diagonal: $7 + 1 = 8$.',
        fr: 'La trace est la somme de la diagonale : $7 + 1 = 8$.',
        es: 'La traza es la suma de la diagonal: $7 + 1 = 8$.',
        ja: 'トレースは対角成分の和：$7 + 1 = 8$。',
        zh: '迹是对角线之和：$7 + 1 = 8$。'
      } },
      { tex: '\\det(AB) = 2', correct: false, why: {
        en: 'Determinants multiply, they do not add: $\\det(AB) = \\det A\\cdot\\det B = 1$.',
        fr: 'Les déterminants se multiplient, ils ne s’additionnent pas : $\\det(AB) = \\det A\\cdot\\det B = 1$.',
        es: 'Los determinantes se multiplican, no se suman: $\\det(AB) = \\det A\\cdot\\det B = 1$.',
        ja: '行列式は掛け合わされるもので、足し合わされるのではありません：$\\det(AB) = \\det A\\cdot\\det B = 1$。',
        zh: '行列式是相乘而不是相加：$\\det(AB) = \\det A\\cdot\\det B = 1$。'
      } },
      { tex: '(AB)^{T} = A^{T}B^{T}', correct: false, why: {
        en: 'The order reverses: $(AB)^T = B^TA^T$. Here $A^TB^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 7 \\end{pmatrix} \\ne \\begin{pmatrix} 7 & 3 \\\\ 2 & 1 \\end{pmatrix}$.',
        fr: 'L’ordre s’inverse : $(AB)^T = B^TA^T$. Ici $A^TB^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 7 \\end{pmatrix} \\ne \\begin{pmatrix} 7 & 3 \\\\ 2 & 1 \\end{pmatrix}$.',
        es: 'El orden se invierte: $(AB)^T = B^TA^T$. Aquí $A^TB^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 7 \\end{pmatrix} \\ne \\begin{pmatrix} 7 & 3 \\\\ 2 & 1 \\end{pmatrix}$.',
        ja: '順番が逆になります：$(AB)^T = B^TA^T$。ここでは $A^TB^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 7 \\end{pmatrix} \\ne \\begin{pmatrix} 7 & 3 \\\\ 2 & 1 \\end{pmatrix}$。',
        zh: '顺序要反过来：$(AB)^T = B^TA^T$。这里 $A^TB^T = \\begin{pmatrix} 1 & 3 \\\\ 2 & 7 \\end{pmatrix} \\ne \\begin{pmatrix} 7 & 3 \\\\ 2 & 1 \\end{pmatrix}$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Multiply row by column', fr: 'Multiplier ligne par colonne', es: 'Multiplicar fila por columna', ja: '行×列で掛ける', zh: '行乘列' },
        lines: ['AB = \\begin{pmatrix} 1\\cdot1 + 2\\cdot3 & 1\\cdot0 + 2\\cdot1 \\\\ 0\\cdot1 + 1\\cdot3 & 0\\cdot0 + 1\\cdot1 \\end{pmatrix} = \\begin{pmatrix} 7 & 2 \\\\ 3 & 1 \\end{pmatrix}'],
        note: {
          en: 'The top-left entry uses row 1 of $A$ and column 1 of $B$.',
          fr: 'Le coefficient en haut à gauche utilise la ligne 1 de $A$ et la colonne 1 de $B$.',
          es: 'El elemento de arriba a la izquierda usa la fila 1 de $A$ y la columna 1 de $B$.',
          ja: '左上の成分は $A$ の第1行と $B$ の第1列から計算します。',
          zh: '左上角的元素由 $A$ 的第 1 行和 $B$ 的第 1 列算出。'
        },
        fig(F) { F.fadeIn(F.mA.row(0, 'fill-yellow'), 500); F.fadeIn(F.mB.col(0, 'fill-blue'), 500, 300); }
      },
      {
        title: { en: 'Now the other order', fr: 'Maintenant dans l’autre ordre', es: 'Ahora en el otro orden', ja: '次に逆の順番', zh: '再换个顺序' },
        lines: ['BA = \\begin{pmatrix} 1\\cdot1 + 0\\cdot0 & 1\\cdot2 + 0\\cdot1 \\\\ 3\\cdot1 + 1\\cdot0 & 3\\cdot2 + 1\\cdot1 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}', 'AB \\ne BA'],
        note: {
          en: 'Both products exist, but they are different matrices.',
          fr: 'Les deux produits existent, mais ce sont des matrices différentes.',
          es: 'Los dos productos existen, pero son matrices distintas.',
          ja: 'どちらの積も存在しますが、異なる行列です。',
          zh: '两个乘积都存在，但它们是不同的矩阵。'
        },
        fig(F) { F.clear('fills'); F.fadeIn(F.mB.row(0, 'fill-pink'), 500); F.fadeIn(F.mA.col(0, 'fill-green'), 500, 300); }
      },
      {
        title: { en: 'Determinants agree', fr: 'Les déterminants coïncident', es: 'Los determinantes coinciden', ja: '行列式は一致する', zh: '行列式相同' },
        lines: ['\\det(AB) = 7\\cdot1 - 2\\cdot3 = 1', '\\det(BA) = 1\\cdot7 - 2\\cdot3 = 1 = \\det A\\cdot\\det B'],
        note: {
          en: '$\\det(AB) = \\det A\\cdot\\det B = \\det(BA)$, even though $AB \\ne BA$.',
          fr: '$\\det(AB) = \\det A\\cdot\\det B = \\det(BA)$, même si $AB \\ne BA$.',
          es: '$\\det(AB) = \\det A\\cdot\\det B = \\det(BA)$, aunque $AB \\ne BA$.',
          ja: '$AB \\ne BA$ でも $\\det(AB) = \\det A\\cdot\\det B = \\det(BA)$ です。',
          zh: '尽管 $AB \\ne BA$，仍有 $\\det(AB) = \\det A\\cdot\\det B = \\det(BA)$。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two statements are true.', fr: 'Deux affirmations sont vraies.', es: 'Dos afirmaciones son verdaderas.', ja: '正しい記述は2つです。', zh: '有两个说法正确。' }
      }
    ]
  });
})(PuzzleBank.kit);
