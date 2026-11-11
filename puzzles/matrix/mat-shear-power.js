/* matrix · Ten slides of a shear
   Powers of a shear matrix: the corner entry grows by one each time, Aⁿ = (1 n; 0 1). */
(function (K) {
  'use strict';
  const { Figure, grid } = K;
  const S = 1.5;                                          // side of the square that gets sheared
  const sq = n => [[0, 0], [S, 0], [S + n * S, S], [n * S, S]];   // its image under Aⁿ

  PuzzleBank.define({
    id: 'mat-shear-power',
    category: 'matrix',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ebau"]
    },
    difficulty: 1,
    title: { en: 'Ten slides of a shear', fr: 'Dix glissements d’une transvection', es: 'Diez deslizamientos de una cizalla', ja: 'せん断を10回', zh: '错切十次' },
    statement: {
      en: 'Let $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$. <b>Which of the following equals $A^{10}$?</b>',
      fr: 'Soit $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$. <b>Laquelle des matrices suivantes est égale à $A^{10}$ ?</b>',
      es: 'Sea $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$. <b>¿Cuál de las siguientes es igual a $A^{10}$?</b>',
      ja: '$A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ とします。<b>次のうち $A^{10}$ に等しいものはどれですか？</b>',
      zh: '设 $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$。<b>下列哪一个等于 $A^{10}$？</b>'
    },
    figureText: {
      en: 'A square and its images under A and A²: parallelograms with the same base whose top edge slides one side length further to the right each time.',
      fr: 'Un carré et ses images par A et A² : des parallélogrammes de même base dont le côté supérieur glisse à chaque fois d’une longueur de côté de plus vers la droite.',
      es: 'Un cuadrado y sus imágenes por A y A²: paralelogramos con la misma base cuyo lado superior se desliza cada vez una longitud de lado más hacia la derecha.',
      ja: '正方形と、その A、A² による像。底辺は同じで、上の辺が毎回1辺分ずつ右へずれる平行四辺形です。',
      zh: '一个正方形及其在 A 和 A² 下的像：底边相同，上边每次再向右滑动一个边长的平行四边形。'
    },
    hint: {
      en: 'Compute $A^2$ and $A^3$, look for the pattern, then jump to the 10th power.',
      fr: 'Calculez $A^2$ et $A^3$, cherchez le motif, puis passez directement à la puissance 10.',
      es: 'Calcula $A^2$ y $A^3$, busca el patrón y salta a la potencia 10.',
      ja: '$A^2$ と $A^3$ を計算して規則性を見つけ、10乗まで一気に進みましょう。',
      zh: '先算 $A^2$ 和 $A^3$，找出规律，再直接写出 10 次幂。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example writing A = I + N with N² = 0 and using the binomial theorem, or a proof by induction), show every step, then check each option and say which one is correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en écrivant A = I + N avec N² = 0 et en utilisant le binôme de Newton, ou par récurrence), montre chaque étape, puis vérifie chaque option et dis laquelle est correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo escribiendo A = I + N con N² = 0 y usando el binomio de Newton, o por inducción), muestra cada paso y luego comprueba cada opción y di cuál es correcta.',
      ja: 'できれば別の方法で解いてください（例えば A = I + N（N² = 0）と書いて二項定理を使う、または数学的帰納法）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如写成 A = I + N，其中 N² = 0，再用二项式定理，或用数学归纳法），写出每一步，然后逐项检查选项并指出哪一个正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.5, h: 1.75, scale: 84, pad: 24 });
      [2, 1].forEach(n => F.path(sq(n), 'shear shear-' + n, 'fills'));
      F.path(sq(0), 'fill-blue', 'fills'); F.path(sq(0), 'tri');
      F.text([S * 0.85, S * 0.15], 'I', 'pt', 0, 0);
      F.text([S * 1.5, S], 'A', 'pt', 0, -14); F.text([S * 2.5, S], 'A²', 'pt', 0, -14);
      F.seg([0, 0], [4.5, 0], 'seg');
      return F;
    },
    options: [
      { tex: '\\begin{pmatrix} 1 & 10 \\\\ 0 & 1 \\end{pmatrix}', correct: true, why: {
        en: '$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$: each factor $A$ adds $1$ to the corner.',
        fr: '$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$ : chaque facteur $A$ ajoute $1$ dans le coin.',
        es: '$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$: cada factor $A$ suma $1$ en la esquina.',
        ja: '$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$：$A$ を1回掛けるごとに右上の成分が $1$ 増えます。',
        zh: '$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$：每乘一次 $A$，右上角就加 $1$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'Raising every entry to the 10th power leaves $A$ unchanged — but matrix powers are not entry by entry.',
        fr: 'Élever chaque coefficient à la puissance 10 laisse $A$ inchangée — mais les puissances de matrices ne se calculent pas coefficient par coefficient.',
        es: 'Elevar cada elemento a la décima potencia deja $A$ igual — pero las potencias de matrices no van elemento a elemento.',
        ja: '各成分を10乗しても $A$ は変わりません — しかし行列のべき乗は成分ごとではありません。',
        zh: '把每个元素都取 10 次方，$A$ 不变 —— 但矩阵的幂不是逐元素计算的。'
      } },
      { tex: '\\begin{pmatrix} 10 & 10 \\\\ 0 & 10 \\end{pmatrix}', correct: false, why: {
        en: 'That is $10A$, not $A^{10}$.',
        fr: 'C’est $10A$, pas $A^{10}$.',
        es: 'Eso es $10A$, no $A^{10}$.',
        ja: 'それは $10A$ で、$A^{10}$ ではありません。',
        zh: '那是 $10A$，不是 $A^{10}$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 1024 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: '$2^{10}$: as if the corner doubled each time — it only grows by $1$.',
        fr: '$2^{10}$ : comme si le coin doublait à chaque fois — il n’augmente que de $1$.',
        es: '$2^{10}$: como si la esquina se duplicara cada vez — solo aumenta en $1$.',
        ja: '$2^{10}$：右上が毎回2倍になるかのよう — 実際は $1$ ずつ増えるだけです。',
        zh: '$2^{10}$：好像右上角每次翻倍 —— 实际上每次只加 $1$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 45 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: '$1 + 2 + \\dots + 9 = 45$: adds a growing amount, but each step adds exactly $1$.',
        fr: '$1 + 2 + \\dots + 9 = 45$ : ajoute une quantité croissante, alors que chaque étape ajoute exactement $1$.',
        es: '$1 + 2 + \\dots + 9 = 45$: suma una cantidad creciente, pero cada paso suma exactamente $1$.',
        ja: '$1 + 2 + \\dots + 9 = 45$：増える量を足していますが、各段階で足すのはちょうど $1$ です。',
        zh: '$1 + 2 + \\dots + 9 = 45$：加的量越来越大，但实际每一步只加 $1$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 11 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'One too many: that is $A^{11}$.',
        fr: 'Un de trop : c’est $A^{11}$.',
        es: 'Uno de más: eso es $A^{11}$.',
        ja: '1つ多すぎます：それは $A^{11}$ です。',
        zh: '多了一次：那是 $A^{11}$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 10 \\\\ 10 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'The bottom-left $0$ stays $0$: $(0\\ \\ 1)$ times any column of $A^n$ gives $0$ first.',
        fr: 'Le $0$ en bas à gauche reste $0$ : $(0\\ \\ 1)$ fois une colonne de $A^n$ donne d’abord $0$.',
        es: 'El $0$ de abajo a la izquierda sigue siendo $0$: $(0\\ \\ 1)$ por la primera columna de $A^n$ da $0$.',
        ja: '左下の $0$ はずっと $0$ のままです：$(0\\ \\ 1)$ と $A^n$ の第1列の積は $0$ になります。',
        zh: '左下角的 $0$ 一直是 $0$：$(0\\ \\ 1)$ 乘 $A^n$ 的第一列得 $0$。'
      } },
      { tex: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}', correct: false, why: {
        en: 'That is $A^0 = I$; a shear never comes back to the identity.',
        fr: 'C’est $A^0 = I$ ; une transvection ne revient jamais à l’identité.',
        es: 'Eso es $A^0 = I$; una cizalla nunca vuelve a la identidad.',
        ja: 'それは $A^0 = I$ です。せん断は単位行列に戻りません。',
        zh: '那是 $A^0 = I$；错切永远不会回到单位矩阵。'
      } }
    ],
    steps: [
      {
        title: { en: 'The first powers', fr: 'Les premières puissances', es: 'Las primeras potencias', ja: '最初のいくつかのべき', zh: '前几次幂' },
        lines: ['A^2 = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}', 'A^3 = A^2 A = \\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix}'],
        note: {
          en: 'Only the top-right entry changes, and it goes up by $1$ each time.',
          fr: 'Seul le coefficient en haut à droite change, et il augmente de $1$ à chaque fois.',
          es: 'Solo cambia el elemento de arriba a la derecha, y aumenta en $1$ cada vez.',
          ja: '変わるのは右上の成分だけで、毎回 $1$ ずつ増えます。',
          zh: '只有右上角的元素在变，而且每次增加 $1$。'
        },
        fig(F) { [1, 2].forEach((n, i) => F.draw(F.seg([(n - 1) * S, S], [n * S, S], 'hl yellow', 'over'), 500, 400 * i)); F.fadeIn(F.path(sq(2), 'fill-yellow', 'fills'), 600, 900); }
      },
      {
        title: { en: 'The pattern', fr: 'Le motif', es: 'El patrón', ja: '規則性', zh: '规律' },
        lines: ['A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix} \\ \\Rightarrow\\ A^{n+1} = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & n+1 \\\\ 0 & 1 \\end{pmatrix}'],
        note: {
          en: 'If it holds for $n$ it holds for $n + 1$ — so it holds for every $n$ (induction).',
          fr: 'Si c’est vrai pour $n$, c’est vrai pour $n + 1$ — donc pour tout $n$ (récurrence).',
          es: 'Si se cumple para $n$, se cumple para $n + 1$ — así que vale para todo $n$ (inducción).',
          ja: '$n$ で成り立てば $n + 1$ でも成り立つので、すべての $n$ で成り立ちます（帰納法）。',
          zh: '若对 $n$ 成立，则对 $n + 1$ 也成立 —— 因此对所有 $n$ 都成立（归纳法）。'
        }
      },
      {
        title: { en: 'Ten slides', fr: 'Dix glissements', es: 'Diez deslizamientos', ja: '10回ずらす', zh: '滑动十次' },
        lines: ['A^{10} = \\boxed{\\begin{pmatrix} 1 & 10 \\\\ 0 & 1 \\end{pmatrix}}'],
        note: {
          en: 'Geometrically: each application slides the top edge one more unit to the right.',
          fr: 'Géométriquement : chaque application fait glisser le côté supérieur d’une unité de plus vers la droite.',
          es: 'Geométricamente: cada aplicación desliza el lado superior una unidad más hacia la derecha.',
          ja: '図形的には、1回かけるごとに上の辺が右へ1目盛りずつずれます。',
          zh: '几何上：每作用一次，上边就再向右滑动一个单位。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Exactly one option is correct.', fr: 'Une seule option est correcte.', es: 'Exactamente una opción es correcta.', ja: '正しい選択肢はちょうど1つ。', zh: '恰有一个选项正确。' }
      }
    ]
  });
})(PuzzleBank.kit);
