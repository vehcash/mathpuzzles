/* matrix · Three turns of 60°
   Powers of a rotation matrix add the angles: R³ is a half turn, −I. */
(function (K) {
  'use strict';
  const { Figure, arrow } = K;
  const C = [1.6, 1.6], R = 1.25;
  const P = deg => [C[0] + R * Math.cos(deg * Math.PI / 180), C[1] + R * Math.sin(deg * Math.PI / 180)];

  PuzzleBank.define({
    id: 'mat-rotation-cube',
    category: 'matrix',
    difficulty: 2,
    title: { en: 'Three turns of 60°', fr: 'Trois rotations de 60°', es: 'Tres giros de 60°', ja: '60° の回転を3回', zh: '转三次 60°' },
    statement: {
      en: '$R = \\begin{pmatrix} \\cos 60^\\circ & -\\sin 60^\\circ \\\\ \\sin 60^\\circ & \\cos 60^\\circ \\end{pmatrix}$ rotates the plane by $60^\\circ$, and $I$ is the identity matrix. <b>Which of the following equal $R^3$?</b>',
      fr: '$R = \\begin{pmatrix} \\cos 60^\\circ & -\\sin 60^\\circ \\\\ \\sin 60^\\circ & \\cos 60^\\circ \\end{pmatrix}$ fait tourner le plan de $60^\\circ$, et $I$ est la matrice identité. <b>Lesquelles des matrices suivantes sont égales à $R^3$ ?</b>',
      es: '$R = \\begin{pmatrix} \\cos 60^\\circ & -\\sin 60^\\circ \\\\ \\sin 60^\\circ & \\cos 60^\\circ \\end{pmatrix}$ gira el plano $60^\\circ$, e $I$ es la matriz identidad. <b>¿Cuáles de las siguientes son iguales a $R^3$?</b>',
      ja: '$R = \\begin{pmatrix} \\cos 60^\\circ & -\\sin 60^\\circ \\\\ \\sin 60^\\circ & \\cos 60^\\circ \\end{pmatrix}$ は平面を $60^\\circ$ 回転させ、$I$ は単位行列です。<b>次のうち $R^3$ に等しいものはどれですか？</b>',
      zh: '$R = \\begin{pmatrix} \\cos 60^\\circ & -\\sin 60^\\circ \\\\ \\sin 60^\\circ & \\cos 60^\\circ \\end{pmatrix}$ 把平面旋转 $60^\\circ$，$I$ 为单位矩阵。<b>下列哪些等于 $R^3$？</b>'
    },
    figureText: {
      en: 'A circle around the origin. The point P = (1, 0) is rotated three times by 60°: to RP at 60°, R²P at 120° and R³P at 180°, which is −P.',
      fr: 'Un cercle centré à l’origine. Le point P = (1, 0) tourne trois fois de 60° : vers RP à 60°, R²P à 120° et R³P à 180°, qui vaut −P.',
      es: 'Una circunferencia centrada en el origen. El punto P = (1, 0) gira tres veces 60°: a RP en 60°, R²P en 120° y R³P en 180°, que es −P.',
      ja: '原点を中心とする円。点 P = (1, 0) を 60° ずつ3回回転させます：60° の RP、120° の R²P、180° の R³P（これは −P）。',
      zh: '以原点为圆心的圆。点 P = (1, 0) 每次旋转 60°，共三次：到 60° 处的 RP、120° 处的 R²P，以及 180° 处的 R³P，即 −P。'
    },
    hint: {
      en: 'Doing a rotation three times rotates by three times the angle.',
      fr: 'Faire trois fois une rotation revient à tourner de trois fois l’angle.',
      es: 'Aplicar un giro tres veces equivale a girar el triple del ángulo.',
      ja: '回転を3回行うと、角度は3倍になります。',
      zh: '连续旋转三次，相当于旋转三倍的角度。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example by multiplying R·R·R explicitly, or with complex numbers e^{iπ/3}), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en calculant R·R·R explicitement, ou avec les nombres complexes e^{iπ/3}), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo multiplicando R·R·R explícitamente, o con números complejos e^{iπ/3}), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば R·R·R を実際に掛ける、または複素数 e^{iπ/3} を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如直接计算 R·R·R，或用复数 e^{iπ/3}），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 72, pad: 20 });
      F.seg([0.1, C[1]], [3.1, C[1]], 'axis'); F.seg([C[0], 0.1], [C[0], 3.1], 'axis');
      F.circle(C, R, 'seg thin').setAttribute('fill', 'none');
      arrow(F, C, P(0), 'vec'); F.dot(P(0)); F.text(P(0), 'P', 'pt', 12, 12);
      F.dot(C); F.text(C, 'O', 'pt', -10, 12);
      F.text([C[0] + 0.32, C[1] + 0.2], '60°', 'len small', 8, 0);
      F.seg(C, P(60), 'seg thin');                 // the second side of the 60° angle
      F.arc(C, 0.3, 0, 60, '', 'marks');
      return F;
    },
    options: [
      { tex: 'R^3 = -I', correct: true, why: {
        en: '$3\\cdot 60^\\circ = 180^\\circ$: a half turn sends every vector $v$ to $-v$.',
        fr: '$3\\cdot 60^\\circ = 180^\\circ$ : un demi-tour envoie chaque vecteur $v$ sur $-v$.',
        es: '$3\\cdot 60^\\circ = 180^\\circ$: media vuelta lleva cada vector $v$ a $-v$.',
        ja: '$3\\cdot 60^\\circ = 180^\\circ$：半回転はすべてのベクトル $v$ を $-v$ に移します。',
        zh: '$3\\cdot 60^\\circ = 180^\\circ$：转半圈把每个向量 $v$ 变成 $-v$。'
      } },
      { tex: 'R^3 = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}', correct: true, why: {
        en: 'The same matrix $-I$, written out: $\\cos180^\\circ = -1$, $\\sin180^\\circ = 0$.',
        fr: 'La même matrice $-I$, écrite en entier : $\\cos180^\\circ = -1$, $\\sin180^\\circ = 0$.',
        es: 'La misma matriz $-I$, escrita entera: $\\cos180^\\circ = -1$, $\\sin180^\\circ = 0$.',
        ja: '同じ行列 $-I$ を成分で書いたもの：$\\cos180^\\circ = -1$、$\\sin180^\\circ = 0$。',
        zh: '同一个矩阵 $-I$ 的展开写法：$\\cos180^\\circ = -1$，$\\sin180^\\circ = 0$。'
      } },
      { tex: 'R^3 = I', correct: false, why: {
        en: 'That is $R^6$, a full turn of $360^\\circ$.',
        fr: 'C’est $R^6$, un tour complet de $360^\\circ$.',
        es: 'Eso es $R^6$, una vuelta completa de $360^\\circ$.',
        ja: 'それは $R^6$（$360^\\circ$ の1回転）です。',
        zh: '那是 $R^6$，转了整整 $360^\\circ$。'
      } },
      { tex: 'R^3 = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}', correct: false, why: {
        en: 'A rotation by $90^\\circ$, not $180^\\circ$.',
        fr: 'Une rotation de $90^\\circ$, pas de $180^\\circ$.',
        es: 'Un giro de $90^\\circ$, no de $180^\\circ$.',
        ja: '$90^\\circ$ の回転で、$180^\\circ$ ではありません。',
        zh: '这是旋转 $90^\\circ$，不是 $180^\\circ$。'
      } },
      { tex: 'R^3 = \\begin{pmatrix} \\tfrac18 & -\\tfrac{3\\sqrt3}{8} \\\\ \\tfrac{3\\sqrt3}{8} & \\tfrac18 \\end{pmatrix}', correct: false, why: {
        en: 'Cubes each entry — powers of a matrix are not taken entry by entry.',
        fr: 'Élève chaque coefficient au cube — les puissances d’une matrice ne se calculent pas coefficient par coefficient.',
        es: 'Eleva cada elemento al cubo — las potencias de una matriz no se calculan elemento a elemento.',
        ja: '各成分を3乗しています — 行列のべき乗は成分ごとには計算しません。',
        zh: '把每个元素都立方了 —— 矩阵的幂不能逐元素计算。'
      } },
      { tex: 'R^3 = 3R', correct: false, why: {
        en: '$R^3$ means $R\\cdot R\\cdot R$, not $3R$ (which stretches lengths by $3$).',
        fr: '$R^3$ signifie $R\\cdot R\\cdot R$, pas $3R$ (qui multiplie les longueurs par $3$).',
        es: '$R^3$ significa $R\\cdot R\\cdot R$, no $3R$ (que multiplica las longitudes por $3$).',
        ja: '$R^3$ は $R\\cdot R\\cdot R$ のことで、$3R$（長さを $3$ 倍する）ではありません。',
        zh: '$R^3$ 表示 $R\\cdot R\\cdot R$，而不是 $3R$（后者把长度放大 $3$ 倍）。'
      } },
      { tex: 'R^3 = \\begin{pmatrix} \\tfrac12 & -\\tfrac{\\sqrt3}{2} \\\\ \\tfrac{\\sqrt3}{2} & \\tfrac12 \\end{pmatrix}', correct: false, why: {
        en: 'That is $R$ itself, the $60^\\circ$ rotation.',
        fr: 'C’est $R$ lui-même, la rotation de $60^\\circ$.',
        es: 'Eso es la propia $R$, el giro de $60^\\circ$.',
        ja: 'それは $R$ 自身（$60^\\circ$ の回転）です。',
        zh: '那就是 $R$ 本身，即旋转 $60^\\circ$。'
      } },
      { tex: 'R^3 = \\begin{pmatrix} -\\tfrac12 & -\\tfrac{\\sqrt3}{2} \\\\ \\tfrac{\\sqrt3}{2} & -\\tfrac12 \\end{pmatrix}', correct: false, why: {
        en: 'That is $R^2$, the $120^\\circ$ rotation.',
        fr: 'C’est $R^2$, la rotation de $120^\\circ$.',
        es: 'Eso es $R^2$, el giro de $120^\\circ$.',
        ja: 'それは $R^2$（$120^\\circ$ の回転）です。',
        zh: '那是 $R^2$，即旋转 $120^\\circ$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Write out R', fr: 'Écrire R', es: 'Escribir R', ja: 'R を書き出す', zh: '写出 R' },
        lines: ['R = \\begin{pmatrix} \\tfrac12 & -\\tfrac{\\sqrt3}{2} \\\\ \\tfrac{\\sqrt3}{2} & \\tfrac12 \\end{pmatrix}'],
        note: {
          en: 'The columns of $R$ are where $(1, 0)$ and $(0, 1)$ go after a $60^\\circ$ turn.',
          fr: 'Les colonnes de $R$ sont les images de $(1, 0)$ et $(0, 1)$ après une rotation de $60^\\circ$.',
          es: 'Las columnas de $R$ son a donde van $(1, 0)$ y $(0, 1)$ tras un giro de $60^\\circ$.',
          ja: '$R$ の列は、$(1, 0)$ と $(0, 1)$ を $60^\\circ$ 回転させた行き先です。',
          zh: '$R$ 的两列分别是 $(1, 0)$ 和 $(0, 1)$ 旋转 $60^\\circ$ 后的位置。'
        },
        fig(F) { F.draw(F.seg(C, P(60), 'vec two', 'over'), 600); F.fadeIn(F.dot(P(60)), 300, 500); F.fadeIn(F.text(P(60), 'RP', 'pt', 14, -6), 300, 600); }
      },
      {
        title: { en: 'Rotations add up', fr: 'Les rotations s’ajoutent', es: 'Los giros se suman', ja: '回転角は足し算', zh: '旋转角相加' },
        lines: ['R^n = \\begin{pmatrix} \\cos(n\\cdot60^\\circ) & -\\sin(n\\cdot60^\\circ) \\\\ \\sin(n\\cdot60^\\circ) & \\cos(n\\cdot60^\\circ) \\end{pmatrix}'],
        note: {
          en: 'Rotating by $60^\\circ$ and then by $60^\\circ$ again is a rotation by $120^\\circ$, and so on.',
          fr: 'Tourner de $60^\\circ$ puis encore de $60^\\circ$, c’est tourner de $120^\\circ$, et ainsi de suite.',
          es: 'Girar $60^\\circ$ y luego otros $60^\\circ$ es girar $120^\\circ$, y así sucesivamente.',
          ja: '$60^\\circ$ 回してさらに $60^\\circ$ 回すと $120^\\circ$ の回転、以下同様です。',
          zh: '先转 $60^\\circ$ 再转 $60^\\circ$，就是转了 $120^\\circ$，依此类推。'
        },
        fig(F) { F.draw(F.arc(C, R, 0, 120, 'dashc', 'over'), 900); F.fadeIn(F.dot(P(120)), 300, 800); F.fadeIn(F.text(P(120), 'R²P', 'pt', -16, -8), 300, 900); }
      },
      {
        title: { en: 'Three turns: a half turn', fr: 'Trois rotations : un demi-tour', es: 'Tres giros: media vuelta', ja: '3回で半回転', zh: '三次即半圈' },
        lines: ['R^3 = \\begin{pmatrix} \\cos180^\\circ & -\\sin180^\\circ \\\\ \\sin180^\\circ & \\cos180^\\circ \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\boxed{-I}'],
        note: {
          en: 'A half turn sends $P$ to the opposite point $-P$.',
          fr: 'Un demi-tour envoie $P$ sur le point opposé $-P$.',
          es: 'Media vuelta lleva $P$ al punto opuesto $-P$.',
          ja: '半回転で $P$ は反対側の点 $-P$ に移ります。',
          zh: '转半圈把 $P$ 送到相对的点 $-P$。'
        },
        fig(F) { F.draw(F.arc(C, R, 120, 180, 'dashc', 'over'), 600); F.draw(F.seg(C, P(180), 'hl yellow', 'over'), 600, 400); F.fadeIn(F.text(P(180), 'R³P = −P', 'pt', 6, -16), 300, 800); }
      },
      {
        title: { en: 'Check by multiplying', fr: 'Vérifier en multipliant', es: 'Comprobar multiplicando', ja: '掛け算で確認', zh: '乘出来验证' },
        lines: ['R^2 = \\begin{pmatrix} -\\tfrac12 & -\\tfrac{\\sqrt3}{2} \\\\ \\tfrac{\\sqrt3}{2} & -\\tfrac12 \\end{pmatrix}, \\qquad R^3 = R^2 R = \\begin{pmatrix} -\\tfrac14 - \\tfrac34 & \\tfrac{\\sqrt3}{4} - \\tfrac{\\sqrt3}{4} \\\\ \\tfrac{\\sqrt3}{4} - \\tfrac{\\sqrt3}{4} & -\\tfrac34 - \\tfrac14 \\end{pmatrix} = -I\\ \\checkmark'],
        note: {
          en: 'Row-by-column multiplication gives the same answer.',
          fr: 'Le produit ligne par colonne donne la même réponse.',
          es: 'La multiplicación fila por columna da la misma respuesta.',
          ja: '行×列の掛け算でも同じ答えになります。',
          zh: '按行乘列计算得到同样的结果。'
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
