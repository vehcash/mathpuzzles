/* matrix · Scaling a 3×3 matrix
   Rules of determinants: det(kA) = kⁿ det A, det(A⁻¹) = 1 / det A, det(Aᵀ) = det A. */
(function (K) {
  'use strict';
  const { Figure } = K;
  // oblique cube: front square plus a receding copy
  function cube(F, x, y, s, cls) {
    const d = [s * 0.45, s * 0.32];
    const f = [[x, y], [x + s, y], [x + s, y + s], [x, y + s]], b = f.map(p => [p[0] + d[0], p[1] + d[1]]);
    const g = [];
    g.push(F.path(f, cls));
    g.push(F.path([f[3], b[3], b[2], f[2]], cls)); g.push(F.path([f[1], b[1], b[2], f[2]], cls));
    return g;
  }

  PuzzleBank.define({
    id: 'mat-det-properties',
    category: 'matrix',
    difficulty: 2,
    title: { en: 'Scaling a 3×3 matrix', fr: 'Multiplier une matrice 3×3', es: 'Escalar una matriz 3×3', ja: '3×3 行列の拡大', zh: '缩放一个 3×3 矩阵' },
    statement: {
      en: '$A$ is a $3\\times3$ matrix with $\\det A = 2$. <b>Which of the following are true?</b>',
      fr: '$A$ est une matrice $3\\times3$ avec $\\det A = 2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: '$A$ es una matriz $3\\times3$ con $\\det A = 2$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '$A$ は $\\det A = 2$ の $3\\times3$ 行列です。<b>次のうち正しいものはどれですか？</b>',
      zh: '$A$ 是一个 $3\\times3$ 矩阵，$\\det A = 2$。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'A small cube of volume V and a cube three times as wide, of volume 27V: scaling all three directions by 3 multiplies volumes — and 3×3 determinants — by 3³ = 27.',
      fr: 'Un petit cube de volume V et un cube trois fois plus large, de volume 27V : multiplier les trois directions par 3 multiplie les volumes — et les déterminants 3×3 — par 3³ = 27.',
      es: 'Un cubo pequeño de volumen V y otro tres veces más ancho, de volumen 27V: escalar las tres direcciones por 3 multiplica los volúmenes — y los determinantes 3×3 — por 3³ = 27.',
      ja: '体積 V の小さな立方体と、3倍の幅で体積 27V の立方体。3方向すべてを3倍にすると、体積（そして 3×3 の行列式）は 3³ = 27 倍になります。',
      zh: '一个体积为 V 的小正方体和一个宽度为其 3 倍、体积为 27V 的正方体：三个方向都放大 3 倍，体积（以及 3×3 行列式）就乘以 3³ = 27。'
    },
    hint: {
      en: 'Multiplying one row by $3$ multiplies the determinant by $3$. How many rows does $3A$ multiply?',
      fr: 'Multiplier une ligne par $3$ multiplie le déterminant par $3$. Combien de lignes $3A$ multiplie-t-elle ?',
      es: 'Multiplicar una fila por $3$ multiplica el determinante por $3$. ¿Cuántas filas multiplica $3A$?',
      ja: '1つの行を $3$ 倍すると行列式は $3$ 倍になります。$3A$ では何行が $3$ 倍になりますか？',
      zh: '把一行乘以 $3$，行列式就乘以 $3$。$3A$ 把几行都乘了 $3$？'
    },
    aiHint: {
      en: 'Please explain it another way if you can (for example with a concrete diagonal matrix such as diag(2, 1, 1), or with volumes), show every step, then check each statement and say which ones are true.',
      fr: 'Explique-le d’une autre façon si possible (par exemple avec une matrice diagonale concrète comme diag(2, 1, 1), ou avec des volumes), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Explícalo de otra forma si puedes (por ejemplo con una matriz diagonal concreta como diag(2, 1, 1), o con volúmenes), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で説明してください（例えば diag(2, 1, 1) のような具体的な対角行列や、体積を使って）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请换一种方式解释（例如用 diag(2, 1, 1) 这样的具体对角矩阵，或用体积来说明），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 4.2, scale: 44, pad: 22 });
      F.small = cube(F, 0.2, 0.3, 1, 'tri');
      F.big = cube(F, 2.4, 0.3, 3, 'tri');
      F.text([0.7, 0.8], 'V', 'len it', 0, 0);
      F.text([3.9, 1.8], '27V', 'len it big', 0, 0);
      F.text([3.9, 0.3], '3', 'len', 0, 16); F.text([0.7, 0.3], '1', 'len', 0, 16);
      return F;
    },
    options: [
      { tex: '\\det(3A) = 54', correct: true, why: {
        en: 'Each of the $3$ rows is multiplied by $3$: $3^3\\cdot 2 = 54$.',
        fr: 'Chacune des $3$ lignes est multipliée par $3$ : $3^3\\cdot 2 = 54$.',
        es: 'Cada una de las $3$ filas se multiplica por $3$: $3^3\\cdot 2 = 54$.',
        ja: '3つの行それぞれが $3$ 倍：$3^3\\cdot 2 = 54$。',
        zh: '3 行都乘了 $3$：$3^3\\cdot 2 = 54$。'
      } },
      { tex: '\\det(A^{-1}) = \\tfrac12', correct: true, why: {
        en: '$\\det A\\cdot\\det(A^{-1}) = \\det I = 1$.',
        fr: '$\\det A\\cdot\\det(A^{-1}) = \\det I = 1$.',
        es: '$\\det A\\cdot\\det(A^{-1}) = \\det I = 1$.',
        ja: '$\\det A\\cdot\\det(A^{-1}) = \\det I = 1$。',
        zh: '$\\det A\\cdot\\det(A^{-1}) = \\det I = 1$。'
      } },
      { tex: '\\det(3A) = 6', correct: false, why: {
        en: 'Treats $3A$ as if only one row were multiplied by $3$.',
        fr: 'Traite $3A$ comme si une seule ligne était multipliée par $3$.',
        es: 'Trata $3A$ como si solo se multiplicara una fila por $3$.',
        ja: '$3A$ を、1行だけを $3$ 倍したかのように扱っています。',
        zh: '把 $3A$ 当成只有一行乘了 $3$。'
      } },
      { tex: '\\det(3A) = 18', correct: false, why: {
        en: '$3^2\\cdot 2$ would be right for a $2\\times2$ matrix; here $n = 3$.',
        fr: '$3^2\\cdot 2$ serait juste pour une matrice $2\\times2$ ; ici $n = 3$.',
        es: '$3^2\\cdot 2$ sería correcto para una matriz $2\\times2$; aquí $n = 3$.',
        ja: '$3^2\\cdot 2$ は $2\\times2$ 行列なら正しいですが、ここでは $n = 3$。',
        zh: '$3^2\\cdot 2$ 对 $2\\times2$ 矩阵才成立；这里 $n = 3$。'
      } },
      { tex: '\\det(A^{T}) = -2', correct: false, why: {
        en: 'Transposing does not change the determinant: $\\det(A^T) = 2$.',
        fr: 'La transposition ne change pas le déterminant : $\\det(A^T) = 2$.',
        es: 'Trasponer no cambia el determinante: $\\det(A^T) = 2$.',
        ja: '転置しても行列式は変わりません：$\\det(A^T) = 2$。',
        zh: '转置不改变行列式：$\\det(A^T) = 2$。'
      } },
      { tex: '\\det(A^{-1}) = -2', correct: false, why: {
        en: 'The inverse gives the reciprocal $\\tfrac12$, not the opposite.',
        fr: 'L’inverse donne l’inverse $\\tfrac12$, pas l’opposé.',
        es: 'La inversa da el recíproco $\\tfrac12$, no el opuesto.',
        ja: '逆行列の行列式は逆数 $\\tfrac12$ で、符号を変えたものではありません。',
        zh: '逆矩阵给出的是倒数 $\\tfrac12$，而不是相反数。'
      } },
      { tex: '\\det(-A) = 2', correct: false, why: {
        en: 'Three rows change sign: $(-1)^3\\cdot 2 = -2$.',
        fr: 'Trois lignes changent de signe : $(-1)^3\\cdot 2 = -2$.',
        es: 'Tres filas cambian de signo: $(-1)^3\\cdot 2 = -2$.',
        ja: '3つの行の符号が変わります：$(-1)^3\\cdot 2 = -2$。',
        zh: '三行都变号：$(-1)^3\\cdot 2 = -2$。'
      } },
      { tex: '\\det(A + A) = 4', correct: false, why: {
        en: '$A + A = 2A$, so $\\det(2A) = 2^3\\cdot 2 = 16$ — determinants do not add.',
        fr: '$A + A = 2A$, donc $\\det(2A) = 2^3\\cdot 2 = 16$ — les déterminants ne s’additionnent pas.',
        es: '$A + A = 2A$, así que $\\det(2A) = 2^3\\cdot 2 = 16$ — los determinantes no se suman.',
        ja: '$A + A = 2A$ なので $\\det(2A) = 2^3\\cdot 2 = 16$ — 行列式は足し算になりません。',
        zh: '$A + A = 2A$，所以 $\\det(2A) = 2^3\\cdot 2 = 16$ —— 行列式不能相加。'
      } }
    ],
    steps: [
      {
        title: { en: 'One row at a time', fr: 'Une ligne à la fois', es: 'Una fila cada vez', ja: '1行ずつ', zh: '一次一行' },
        lines: ['\\det(3A) = 3\\cdot3\\cdot3\\cdot\\det A = 3^3\\cdot 2 = \\boxed{54}'],
        note: {
          en: 'The determinant is linear in each row, and $3A$ multiplies all three rows by $3$. In general $\\det(kA) = k^n\\det A$.',
          fr: 'Le déterminant est linéaire en chaque ligne, et $3A$ multiplie les trois lignes par $3$. En général $\\det(kA) = k^n\\det A$.',
          es: 'El determinante es lineal en cada fila, y $3A$ multiplica las tres filas por $3$. En general $\\det(kA) = k^n\\det A$.',
          ja: '行列式は各行について線形で、$3A$ は3行すべてを $3$ 倍します。一般に $\\det(kA) = k^n\\det A$。',
          zh: '行列式对每一行都是线性的，而 $3A$ 把三行都乘了 $3$。一般地 $\\det(kA) = k^n\\det A$。'
        },
        fig(F) { F.big.forEach((e, i) => { e.classList.add('fill-yellow'); F.fadeIn(e, 500, 150 * i); }); }
      },
      {
        title: { en: 'The inverse', fr: 'L’inverse', es: 'La inversa', ja: '逆行列', zh: '逆矩阵' },
        lines: ['A\\,A^{-1} = I \\ \\Rightarrow\\ \\det A\\cdot\\det(A^{-1}) = 1', '\\det(A^{-1}) = \\frac{1}{\\det A} = \\boxed{\\tfrac12}'],
        note: {
          en: 'Determinants multiply: $\\det(AB) = \\det A\\cdot\\det B$.',
          fr: 'Les déterminants se multiplient : $\\det(AB) = \\det A\\cdot\\det B$.',
          es: 'Los determinantes se multiplican: $\\det(AB) = \\det A\\cdot\\det B$.',
          ja: '行列式は積を保ちます：$\\det(AB) = \\det A\\cdot\\det B$。',
          zh: '行列式是乘性的：$\\det(AB) = \\det A\\cdot\\det B$。'
        }
      },
      {
        title: { en: 'The other rules', fr: 'Les autres règles', es: 'Las otras reglas', ja: 'その他の性質', zh: '其他规则' },
        lines: ['\\det(A^T) = \\det A = 2', '\\det(-A) = (-1)^3\\det A = -2', '\\det(A + A) = \\det(2A) = 2^3\\cdot 2 = 16'],
        note: {
          en: 'Transposing changes nothing; a sign or a factor comes out once per row.',
          fr: 'Transposer ne change rien ; un signe ou un facteur sort une fois par ligne.',
          es: 'Trasponer no cambia nada; un signo o un factor sale una vez por cada fila.',
          ja: '転置しても変わりません。符号や係数は行ごとに1回ずつ外に出ます。',
          zh: '转置不改变任何东西；符号或因子每一行提出一次。'
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
