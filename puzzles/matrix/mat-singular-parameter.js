/* matrix · When does the inverse disappear?
   A determinant depending on a parameter k: the matrix is singular exactly at the roots of a quadratic. */
(function (K) {
  'use strict';
  const { Figure, matrix } = K;

  PuzzleBank.define({
    id: 'mat-singular-parameter',
    category: 'matrix',
    difficulty: 3,
    title: { en: 'When does the inverse disappear?', fr: 'Quand l’inverse disparaît-il ?', es: '¿Cuándo desaparece la inversa?', ja: '逆行列が消えるのはいつ？', zh: '逆矩阵何时消失？' },
    statement: {
      en: 'For which values of $k$ is $M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 1 & 1 & k \\end{pmatrix}$ <b>not</b> invertible? <b>Which of the following are such values?</b>',
      fr: 'Pour quelles valeurs de $k$ la matrice $M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 1 & 1 & k \\end{pmatrix}$ n’est-elle <b>pas</b> inversible ? <b>Lesquelles des valeurs suivantes conviennent ?</b>',
      es: '¿Para qué valores de $k$ la matriz $M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 1 & 1 & k \\end{pmatrix}$ <b>no</b> es invertible? <b>¿Cuáles de los siguientes son esos valores?</b>',
      ja: '$M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 1 & 1 & k \\end{pmatrix}$ が逆行列を<b>もたない</b>のは $k$ がどんな値のときですか？<b>次のうち、そのような値はどれですか？</b>',
      zh: '当 $k$ 取何值时，$M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 1 & 1 & k \\end{pmatrix}$ <b>不</b>可逆？<b>下列哪些是这样的值？</b>'
    },
    figureText: {
      en: 'The 3×3 matrix M with rows (1, 2, 3), (2, k, 6) and (1, 1, k); the two entries k are highlighted.',
      fr: 'La matrice 3×3 M de lignes (1, 2, 3), (2, k, 6) et (1, 1, k) ; les deux coefficients k sont mis en évidence.',
      es: 'La matriz 3×3 M con filas (1, 2, 3), (2, k, 6) y (1, 1, k); los dos elementos k están resaltados.',
      ja: '行が (1, 2, 3)、(2, k, 6)、(1, 1, k) の 3×3 行列 M。2つの成分 k が強調されています。',
      zh: '3×3 矩阵 M，各行为 (1, 2, 3)、(2, k, 6)、(1, 1, k)；两个 k 被突出显示。'
    },
    hint: {
      en: 'A square matrix is not invertible exactly when its determinant is $0$. Expand along the first row.',
      fr: 'Une matrice carrée n’est pas inversible exactement quand son déterminant est nul. Développez selon la première ligne.',
      es: 'Una matriz cuadrada no es invertible exactamente cuando su determinante es $0$. Desarrolla por la primera fila.',
      ja: '正方行列が逆行列をもたないのは、行列式が $0$ のときに限ります。第1行で展開しましょう。',
      zh: '方阵不可逆当且仅当其行列式为 $0$。按第一行展开。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example row reduction and looking for a zero row, or spotting linear dependence between the rows), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple par pivot de Gauss en cherchant une ligne nulle, ou en repérant une relation linéaire entre les lignes), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con reducción por filas buscando una fila nula, o detectando dependencia lineal entre las filas), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば行基本変形でゼロ行が出る条件を調べる、または行の一次従属を見つける）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如行变换后寻找零行，或找出各行之间的线性关系），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 2.6, scale: 60, pad: 22 });
      F.text([0.35, 1.3], 'M =', 'mx', 0, 1);
      F.mx = matrix(F, [1.1, 2.4], [['1', '2', '3'], ['2', 'k', '6'], ['1', '1', 'k']], { cw: 0.95, ch: 0.75 });
      F.mx.box(1, 1, 'fill-yellow'); F.mx.box(2, 2, 'fill-yellow');
      return F;
    },
    options: [
      { tex: 'k = 3', correct: true, why: {
        en: '$\\det M = 9 - 21 + 12 = 0$; then row 2 = row 1 + row 3.',
        fr: '$\\det M = 9 - 21 + 12 = 0$ ; la ligne 2 est alors la somme des lignes 1 et 3.',
        es: '$\\det M = 9 - 21 + 12 = 0$; entonces fila 2 = fila 1 + fila 3.',
        ja: '$\\det M = 9 - 21 + 12 = 0$。このとき第2行 = 第1行 + 第3行。',
        zh: '$\\det M = 9 - 21 + 12 = 0$；此时第 2 行 = 第 1 行 + 第 3 行。'
      } },
      { tex: 'k = 4', correct: true, why: {
        en: '$\\det M = 16 - 28 + 12 = 0$; then row 2 = $2\\times$ row 1.',
        fr: '$\\det M = 16 - 28 + 12 = 0$ ; la ligne 2 vaut alors $2\\times$ la ligne 1.',
        es: '$\\det M = 16 - 28 + 12 = 0$; entonces fila 2 = $2\\times$ fila 1.',
        ja: '$\\det M = 16 - 28 + 12 = 0$。このとき第2行 = 第1行の $2$ 倍。',
        zh: '$\\det M = 16 - 28 + 12 = 0$；此时第 2 行 = $2\\times$ 第 1 行。'
      } },
      { tex: 'k = 0', correct: false, why: {
        en: '$\\det M = 12 \\ne 0$, so $M$ is invertible.',
        fr: '$\\det M = 12 \\ne 0$, donc $M$ est inversible.',
        es: '$\\det M = 12 \\ne 0$, así que $M$ es invertible.',
        ja: '$\\det M = 12 \\ne 0$ なので $M$ は正則です。',
        zh: '$\\det M = 12 \\ne 0$，所以 $M$ 可逆。'
      } },
      { tex: 'k = -3', correct: false, why: {
        en: 'Sign slip: $-3$ and $-4$ are the roots of $k^2 + 7k + 12$.',
        fr: 'Erreur de signe : $-3$ et $-4$ sont les racines de $k^2 + 7k + 12$.',
        es: 'Error de signo: $-3$ y $-4$ son las raíces de $k^2 + 7k + 12$.',
        ja: '符号ミス：$-3$ と $-4$ は $k^2 + 7k + 12$ の解です。',
        zh: '符号错误：$-3$ 和 $-4$ 是 $k^2 + 7k + 12$ 的根。'
      } },
      { tex: 'k = 7', correct: false, why: {
        en: 'The sum of the two roots, not a root.',
        fr: 'La somme des deux racines, pas une racine.',
        es: 'La suma de las dos raíces, no una raíz.',
        ja: '2つの解の和で、解ではありません。',
        zh: '这是两根之和，不是根。'
      } },
      { tex: 'k = 12', correct: false, why: {
        en: 'The product of the two roots, not a root.',
        fr: 'Le produit des deux racines, pas une racine.',
        es: 'El producto de las dos raíces, no una raíz.',
        ja: '2つの解の積で、解ではありません。',
        zh: '这是两根之积，不是根。'
      } },
      { tex: 'k = 2', correct: false, why: {
        en: '$\\det M = 4 - 14 + 12 = 2 \\ne 0$.',
        fr: '$\\det M = 4 - 14 + 12 = 2 \\ne 0$.',
        es: '$\\det M = 4 - 14 + 12 = 2 \\ne 0$.',
        ja: '$\\det M = 4 - 14 + 12 = 2 \\ne 0$。',
        zh: '$\\det M = 4 - 14 + 12 = 2 \\ne 0$。'
      } },
      { tex: 'k = 6', correct: false, why: '$\\det M = 36 - 42 + 12 = 6 \\ne 0$.' }
    ],
    steps: [
      {
        title: { en: 'Not invertible means determinant zero', fr: 'Non inversible signifie déterminant nul', es: 'No invertible significa determinante cero', ja: '逆行列なし ⇔ 行列式が 0', zh: '不可逆即行列式为零' },
        lines: ['M \\text{ not invertible} \\iff \\det M = 0'],
        note: {
          en: 'So we need $\\det M$ as a function of $k$.',
          fr: 'Il faut donc $\\det M$ en fonction de $k$.',
          es: 'Así que necesitamos $\\det M$ en función de $k$.',
          ja: 'そこで $\\det M$ を $k$ の式で表します。',
          zh: '所以需要把 $\\det M$ 写成 $k$ 的函数。'
        }
      },
      {
        title: { en: 'Expand along the first row', fr: 'Développer selon la première ligne', es: 'Desarrollar por la primera fila', ja: '第1行で展開する', zh: '按第一行展开' },
        lines: ['\\det M = 1\\,(k^2 - 6) - 2\\,(2k - 6) + 3\\,(2 - k)', '= k^2 - 7k + 12'],
        note: {
          en: 'Signs $+\\,-\\,+$ along the first row; each minor is a small $2\\times2$ determinant.',
          fr: 'Signes $+\\,-\\,+$ le long de la première ligne ; chaque mineur est un petit déterminant $2\\times2$.',
          es: 'Signos $+\\,-\\,+$ a lo largo de la primera fila; cada menor es un determinante $2\\times2$.',
          ja: '第1行に沿って符号は $+\\,-\\,+$。各小行列式は $2\\times2$ の行列式です。',
          zh: '沿第一行符号为 $+\\,-\\,+$；每个余子式都是一个 $2\\times2$ 行列式。'
        },
        fig(F) { F.fadeIn(F.mx.row(0, 'fill-blue'), 500); }
      },
      {
        title: { en: 'Find the roots', fr: 'Trouver les racines', es: 'Hallar las raíces', ja: '解を求める', zh: '求根' },
        lines: ['k^2 - 7k + 12 = (k - 3)(k - 4) = 0', 'k = \\boxed{3} \\quad\\text{or}\\quad k = \\boxed{4}'],
        note: {
          en: 'Two numbers with sum $7$ and product $12$.',
          fr: 'Deux nombres de somme $7$ et de produit $12$.',
          es: 'Dos números de suma $7$ y producto $12$.',
          ja: '和が $7$、積が $12$ の2数です。',
          zh: '和为 $7$、积为 $12$ 的两个数。'
        }
      },
      {
        title: { en: 'See the dependent rows', fr: 'Voir les lignes liées', es: 'Ver las filas dependientes', ja: '従属な行を確かめる', zh: '看出线性相关的行' },
        lines: ['k = 4:\\quad (2, 4, 6) = 2\\,(1, 2, 3)', 'k = 3:\\quad (2, 3, 6) = (1, 2, 3) + (1, 1, 3)'],
        note: {
          en: 'A zero determinant always means one row is a combination of the others.',
          fr: 'Un déterminant nul signifie toujours qu’une ligne est combinaison des autres.',
          es: 'Un determinante cero siempre significa que una fila es combinación de las demás.',
          ja: '行列式が 0 なら、いずれかの行が他の行の一次結合になっています。',
          zh: '行列式为零总意味着某一行是其他行的线性组合。'
        },
        fig(F) { F.clear('fills'); F.fadeIn(F.mx.row(1, 'fill-pink'), 500); F.fadeIn(F.mx.row(0, 'fill-green'), 500, 300); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Exactly two values make $M$ singular.', fr: 'Exactement deux valeurs rendent $M$ non inversible.', es: 'Exactamente dos valores hacen $M$ singular.', ja: 'ちょうど2つの値で $M$ は正則でなくなります。', zh: '恰有两个值使 $M$ 奇异。' }
      }
    ],
    words: {  // \text{…} words inside formulas
      'not invertible': { fr: 'non inversible', es: 'no invertible', ja: '逆行列なし', zh: '不可逆' },
      'or': { fr: 'ou', es: 'o', ja: 'または', zh: '或' }
    }
  });
})(PuzzleBank.kit);
