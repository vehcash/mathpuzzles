/* complex · Which way does it point?
   The argument of −1 + √3 i is 120°: arctan alone gives the wrong quadrant. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow, S3 } = K;

  PuzzleBank.define({
    id: 'cx-argument-quadrant',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "alevelfm", "ib"]
    },
    difficulty: 2,
    title: { en: 'Which way does it point?', fr: 'Dans quelle direction pointe-t-il ?', es: '¿Hacia dónde apunta?', ja: 'どちらを向いている？', zh: '它指向哪里？' },
    statement: {
      en: '<b>Which of the following are an argument of $z = -1 + \\sqrt3\\, i$?</b> (Angles measured from the positive real axis.)',
      fr: '<b>Lesquels des angles suivants sont un argument de $z = -1 + \\sqrt3\\, i$ ?</b> (Angles mesurés depuis l’axe réel positif.)',
      es: '<b>¿Cuáles de los siguientes son un argumento de $z = -1 + \\sqrt3\\, i$?</b> (Ángulos medidos desde el eje real positivo.)',
      ja: '<b>次のうち $z = -1 + \\sqrt3\\, i$ の偏角はどれですか？</b>（角度は正の実軸から測ります。）',
      zh: '<b>下列哪些是 $z = -1 + \\sqrt3\\, i$ 的辐角？</b>（角度从正实轴量起。）'
    },
    figureText: {
      en: 'The complex plane with z = −1 + √3 i in the second quadrant, at distance 2 from the origin; the angle from the positive real axis is marked.',
      fr: 'Le plan complexe avec z = −1 + √3 i dans le deuxième quadrant, à distance 2 de l’origine ; l’angle depuis l’axe réel positif est marqué.',
      es: 'El plano complejo con z = −1 + √3 i en el segundo cuadrante, a distancia 2 del origen; está marcado el ángulo desde el eje real positivo.',
      ja: '複素平面の第2象限にある z = −1 + √3 i（原点からの距離 2）。正の実軸からの角度が示されています。',
      zh: '复平面第二象限中的 z = −1 + √3 i，到原点距离为 2；标出了从正实轴量起的角。'
    },
    hint: {
      en: 'Draw it: the real part is negative and the imaginary part positive, so the angle is between $90^\\circ$ and $180^\\circ$.',
      fr: 'Faites un dessin : partie réelle négative, partie imaginaire positive, donc l’angle est entre $90^\\circ$ et $180^\\circ$.',
      es: 'Dibújalo: la parte real es negativa y la imaginaria positiva, así que el ángulo está entre $90^\\circ$ y $180^\\circ$.',
      ja: '図を描きましょう：実部は負、虚部は正なので、角度は $90^\\circ$ と $180^\\circ$ の間です。',
      zh: '画个图：实部为负、虚部为正，所以角在 $90^\\circ$ 和 $180^\\circ$ 之间。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example writing z = 2(cos θ + i sin θ) and solving cos θ = −1/2, sin θ = √3/2), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en écrivant z = 2(cos θ + i sin θ) et en résolvant cos θ = −1/2, sin θ = √3/2), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo escribiendo z = 2(cos θ + i sen θ) y resolviendo cos θ = −1/2, sen θ = √3/2), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば z = 2(cos θ + i sin θ) とおいて cos θ = −1/2、sin θ = √3/2 を解く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如写成 z = 2(cos θ + i sin θ)，解 cos θ = −1/2、sin θ = √3/2），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 4.8, scale: 52, pad: 18 });
      const T = F.T = argand(F, -2.6, 2.4, -2.2, 2.6, { grid: false });
      F.circle(T([0, 0]), 2, 'seg thin').setAttribute('fill', 'none');
      arrow(F, T([0, 0]), T([-1, S3]), 'vec two');
      F.seg(T([-1, 0]), T([-1, S3]), 'seg thin');
      F.arc(T([0, 0]), 0.45, 0, 120, 'dashc', 'marks');
      F.text(T([-1, S3]), 'z', 'pt', -10, -10); F.text(T([-1, 0]), '−1', 'len small', 0, 14); F.text(T([-1, S3 / 2]), '√3', 'len small', -14, 0);
      F.text(T([-0.5, S3 / 2]), '2', 'len small', 10, -4);
      return F;
    },
    options: [
      { tex: '\\tfrac{2\\pi}{3}', correct: true, why: {
        en: '$\\cos\\theta = -\\tfrac12$, $\\sin\\theta = \\tfrac{\\sqrt3}{2}$ in the second quadrant.',
        fr: '$\\cos\\theta = -\\tfrac12$, $\\sin\\theta = \\tfrac{\\sqrt3}{2}$ dans le deuxième quadrant.',
        es: '$\\cos\\theta = -\\tfrac12$, $\\sin\\theta = \\tfrac{\\sqrt3}{2}$ en el segundo cuadrante.',
        ja: '第2象限で $\\cos\\theta = -\\tfrac12$、$\\sin\\theta = \\tfrac{\\sqrt3}{2}$。',
        zh: '在第二象限中 $\\cos\\theta = -\\tfrac12$，$\\sin\\theta = \\tfrac{\\sqrt3}{2}$。'
      } },
      { tex: '120^\\circ', correct: true, why: {
        en: 'The same angle in degrees.',
        fr: 'Le même angle en degrés.',
        es: 'El mismo ángulo en grados.',
        ja: '同じ角度を度で表したもの。',
        zh: '同一个角，用度表示。'
      } },
      { tex: '-\\tfrac{\\pi}{3}', correct: false, why: {
        en: '$\\arctan\\tfrac{\\sqrt3}{-1}$ from a calculator — it points into the fourth quadrant, at $1 - \\sqrt3\\,i$.',
        fr: '$\\arctan\\tfrac{\\sqrt3}{-1}$ à la calculatrice — cela pointe vers le quatrième quadrant, vers $1 - \\sqrt3\\,i$.',
        es: '$\\arctan\\tfrac{\\sqrt3}{-1}$ de la calculadora — apunta al cuarto cuadrante, hacia $1 - \\sqrt3\\,i$.',
        ja: '電卓の $\\arctan\\tfrac{\\sqrt3}{-1}$ — これは第4象限の $1 - \\sqrt3\\,i$ の向きです。',
        zh: '计算器算出的 $\\arctan\\tfrac{\\sqrt3}{-1}$ —— 它指向第四象限的 $1 - \\sqrt3\\,i$。'
      } },
      { tex: '\\tfrac{\\pi}{3}', correct: false, why: {
        en: 'The argument of $1 + \\sqrt3\\,i$, in the first quadrant.',
        fr: 'L’argument de $1 + \\sqrt3\\,i$, dans le premier quadrant.',
        es: 'El argumento de $1 + \\sqrt3\\,i$, en el primer cuadrante.',
        ja: '第1象限の $1 + \\sqrt3\\,i$ の偏角です。',
        zh: '这是第一象限中 $1 + \\sqrt3\\,i$ 的辐角。'
      } },
      { tex: '\\tfrac{4\\pi}{3}', correct: false, why: {
        en: 'The argument of $-1 - \\sqrt3\\,i$, in the third quadrant.',
        fr: 'L’argument de $-1 - \\sqrt3\\,i$, dans le troisième quadrant.',
        es: 'El argumento de $-1 - \\sqrt3\\,i$, en el tercer cuadrante.',
        ja: '第3象限の $-1 - \\sqrt3\\,i$ の偏角です。',
        zh: '这是第三象限中 $-1 - \\sqrt3\\,i$ 的辐角。'
      } },
      { tex: '2', correct: false, why: {
        en: 'That is the modulus $|z| = \\sqrt{1 + 3}$, not an angle.',
        fr: 'C’est le module $|z| = \\sqrt{1 + 3}$, pas un angle.',
        es: 'Eso es el módulo $|z| = \\sqrt{1 + 3}$, no un ángulo.',
        ja: 'それは絶対値 $|z| = \\sqrt{1 + 3}$ で、角度ではありません。',
        zh: '那是模 $|z| = \\sqrt{1 + 3}$，不是角。'
      } },
      { tex: '\\tfrac{\\pi}{6}', correct: false, why: {
        en: 'Uses $\\arctan\\tfrac{1}{\\sqrt3}$ — the real and imaginary parts swapped.',
        fr: 'Utilise $\\arctan\\tfrac{1}{\\sqrt3}$ — parties réelle et imaginaire échangées.',
        es: 'Usa $\\arctan\\tfrac{1}{\\sqrt3}$ — partes real e imaginaria intercambiadas.',
        ja: '$\\arctan\\tfrac{1}{\\sqrt3}$ を使っています — 実部と虚部が入れ替わっています。',
        zh: '用了 $\\arctan\\tfrac{1}{\\sqrt3}$ —— 实部和虚部弄反了。'
      } },
      { tex: '\\tfrac{5\\pi}{6}', correct: false, why: {
        en: 'Right quadrant, wrong angle: that is the argument of $-\\sqrt3 + i$.',
        fr: 'Bon quadrant, mauvais angle : c’est l’argument de $-\\sqrt3 + i$.',
        es: 'Cuadrante correcto, ángulo equivocado: es el argumento de $-\\sqrt3 + i$.',
        ja: '象限は合っていますが角度が違います：$-\\sqrt3 + i$ の偏角です。',
        zh: '象限对了但角不对：那是 $-\\sqrt3 + i$ 的辐角。'
      } }
    ],
    steps: [
      {
        title: { en: 'Find the quadrant', fr: 'Trouver le quadrant', es: 'Hallar el cuadrante', ja: '象限を見つける', zh: '确定象限' },
        lines: ['\\mathrm{Re}\\,z = -1 < 0, \\quad \\mathrm{Im}\\,z = \\sqrt3 > 0'],
        note: {
          en: 'Second quadrant: the angle is between $90^\\circ$ and $180^\\circ$.',
          fr: 'Deuxième quadrant : l’angle est entre $90^\\circ$ et $180^\\circ$.',
          es: 'Segundo cuadrante: el ángulo está entre $90^\\circ$ y $180^\\circ$.',
          ja: '第2象限：角度は $90^\\circ$ と $180^\\circ$ の間です。',
          zh: '第二象限：角在 $90^\\circ$ 与 $180^\\circ$ 之间。'
        }
      },
      {
        title: { en: 'Modulus and angle', fr: 'Module et angle', es: 'Módulo y ángulo', ja: '絶対値と角度', zh: '模与角' },
        lines: ['|z| = \\sqrt{1 + 3} = 2', '\\cos\\theta = -\\tfrac12, \\quad \\sin\\theta = \\tfrac{\\sqrt3}{2} \\ \\Rightarrow\\ \\theta = \\boxed{120^\\circ = \\tfrac{2\\pi}{3}}'],
        note: {
          en: 'Divide the parts by the modulus to get the cosine and the sine.',
          fr: 'Divisez les parties par le module pour obtenir le cosinus et le sinus.',
          es: 'Divide las partes entre el módulo para obtener el coseno y el seno.',
          ja: '実部・虚部を絶対値で割ると cos と sin が得られます。',
          zh: '把实部、虚部除以模，得到余弦和正弦。'
        },
        fig(F) { F.draw(F.arc(F.T([0, 0]), 0.45, 0, 120, 'hl yellow', 'over'), 800); }
      },
      {
        title: { en: 'Why the calculator is wrong', fr: 'Pourquoi la calculatrice se trompe', es: 'Por qué se equivoca la calculadora', ja: '電卓が間違う理由', zh: '计算器为什么会错' },
        lines: ['\\arctan\\frac{\\sqrt3}{-1} = -60^\\circ', '-60^\\circ + 180^\\circ = 120^\\circ'],
        note: {
          en: '$\\arctan$ only returns angles between $-90^\\circ$ and $90^\\circ$; in the second quadrant add $180^\\circ$.',
          fr: '$\\arctan$ ne donne que des angles entre $-90^\\circ$ et $90^\\circ$ ; dans le deuxième quadrant on ajoute $180^\\circ$.',
          es: '$\\arctan$ solo da ángulos entre $-90^\\circ$ y $90^\\circ$; en el segundo cuadrante se suman $180^\\circ$.',
          ja: '$\\arctan$ は $-90^\\circ$ から $90^\\circ$ の角しか返しません。第2象限では $180^\\circ$ を足します。',
          zh: '$\\arctan$ 只给出 $-90^\\circ$ 到 $90^\\circ$ 之间的角；在第二象限要加 $180^\\circ$。'
        },
        fig(F) { F.draw(F.seg(F.T([0, 0]), F.T([1, -S3]), 'hl pink', 'over'), 700); F.fadeIn(F.text(F.T([1, -S3]), '−60°', 'len small', 20, 0), 300, 600); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two options are the same angle written differently.', fr: 'Deux options sont le même angle écrit différemment.', es: 'Dos opciones son el mismo ángulo escrito de forma distinta.', ja: '2つの選択肢は同じ角度を別の形で書いたものです。', zh: '有两个选项是同一个角的不同写法。' }
      }
    ]
  });
})(PuzzleBank.kit);
