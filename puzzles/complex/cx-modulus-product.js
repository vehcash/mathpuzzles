/* complex · The length of a product
   |zw| = |z|·|w|: moduli multiply. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow } = K;

  PuzzleBank.define({
    id: 'cx-modulus-product',
    category: 'complex',
    difficulty: 1,
    title: { en: 'The length of a product', fr: 'La longueur d’un produit', es: 'La longitud de un producto', ja: '積の大きさ', zh: '乘积的模' },
    statement: {
      en: 'Let $z = 3 + 4i$ and $w = 1 - i$. <b>Which of the following equal $|zw|$?</b>',
      fr: 'Soit $z = 3 + 4i$ et $w = 1 - i$. <b>Lesquelles des valeurs suivantes sont égales à $|zw|$ ?</b>',
      es: 'Sean $z = 3 + 4i$ y $w = 1 - i$. <b>¿Cuáles de los siguientes son iguales a $|zw|$?</b>',
      ja: '$z = 3 + 4i$、$w = 1 - i$ とします。<b>次のうち $|zw|$ に等しいものはどれですか？</b>',
      zh: '设 $z = 3 + 4i$，$w = 1 - i$。<b>下列哪些等于 $|zw|$？</b>'
    },
    figureText: {
      en: 'The complex plane with the points z = 3 + 4i, w = 1 − i and their product zw = 7 + i, each joined to the origin.',
      fr: 'Le plan complexe avec les points z = 3 + 4i, w = 1 − i et leur produit zw = 7 + i, chacun relié à l’origine.',
      es: 'El plano complejo con los puntos z = 3 + 4i, w = 1 − i y su producto zw = 7 + i, cada uno unido al origen.',
      ja: '複素平面上の点 z = 3 + 4i、w = 1 − i と、その積 zw = 7 + i。それぞれ原点と結ばれています。',
      zh: '复平面上的点 z = 3 + 4i、w = 1 − i 及其乘积 zw = 7 + i，各点都与原点相连。'
    },
    hint: {
      en: 'Either multiply first and take the modulus, or use $|zw| = |z|\\,|w|$.',
      fr: 'Multipliez d’abord puis prenez le module, ou utilisez $|zw| = |z|\\,|w|$.',
      es: 'Multiplica primero y toma el módulo, o usa $|zw| = |z|\\,|w|$.',
      ja: '先に掛けてから絶対値をとるか、$|zw| = |z|\\,|w|$ を使います。',
      zh: '可以先相乘再取模，也可以用 $|zw| = |z|\\,|w|$。'
    },
    aiHint: {
      en: 'Please solve it in two ways if you can (multiplying first, and using |z|·|w|), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le de deux façons si possible (en multipliant d’abord, puis avec |z|·|w|), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de dos formas si puedes (multiplicando primero y usando |z|·|w|), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば2通りで解いてください（先に掛ける方法と |z|·|w| を使う方法）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用两种方法求解（先相乘，以及利用 |z|·|w|），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 9, h: 6.5, scale: 34, pad: 18 });
      const T = F.T = argand(F, -1, 8, -1.8, 4.7);
      arrow(F, T([0, 0]), T([3, 4]), 'vec'); arrow(F, T([0, 0]), T([1, -1]), 'vec');
      arrow(F, T([0, 0]), T([7, 1]), 'vec two');
      F.text(T([3, 4]), 'z', 'pt', 10, -8); F.text(T([1, -1]), 'w', 'pt', 12, 8); F.text(T([7, 1]), 'zw', 'pt', 14, -10);
      return F;
    },
    options: [
      { tex: '5\\sqrt2', correct: true, why: {
        en: '$|z|\\,|w| = 5\\cdot\\sqrt2$.',
        fr: '$|z|\\,|w| = 5\\cdot\\sqrt2$.',
        es: '$|z|\\,|w| = 5\\cdot\\sqrt2$.',
        ja: '$|z|\\,|w| = 5\\cdot\\sqrt2$。',
        zh: '$|z|\\,|w| = 5\\cdot\\sqrt2$。'
      } },
      { tex: '\\sqrt{50}', correct: true, why: {
        en: '$zw = 7 + i$ and $|7 + i| = \\sqrt{49 + 1}$.',
        fr: '$zw = 7 + i$ et $|7 + i| = \\sqrt{49 + 1}$.',
        es: '$zw = 7 + i$ y $|7 + i| = \\sqrt{49 + 1}$.',
        ja: '$zw = 7 + i$ で、$|7 + i| = \\sqrt{49 + 1}$。',
        zh: '$zw = 7 + i$，而 $|7 + i| = \\sqrt{49 + 1}$。'
      } },
      { tex: '5 + \\sqrt2', correct: false, why: {
        en: 'Moduli multiply, they do not add.',
        fr: 'Les modules se multiplient, ils ne s’additionnent pas.',
        es: 'Los módulos se multiplican, no se suman.',
        ja: '絶対値は掛け算になり、足し算にはなりません。',
        zh: '模是相乘，不是相加。'
      } },
      { tex: '50', correct: false, why: {
        en: 'That is $|zw|^2$ — the square root is missing.',
        fr: 'C’est $|zw|^2$ — il manque la racine carrée.',
        es: 'Eso es $|zw|^2$ — falta la raíz cuadrada.',
        ja: 'それは $|zw|^2$ — 平方根を忘れています。',
        zh: '那是 $|zw|^2$ —— 少了开平方。'
      } },
      { tex: '7', correct: false, why: {
        en: 'Only the real part of $zw = 7 + i$.',
        fr: 'Seulement la partie réelle de $zw = 7 + i$.',
        es: 'Solo la parte real de $zw = 7 + i$.',
        ja: '$zw = 7 + i$ の実部だけです。',
        zh: '只是 $zw = 7 + i$ 的实部。'
      } },
      { tex: '\\sqrt{48}', correct: false, why: {
        en: 'Subtracts the squares: the modulus is $\\sqrt{a^2 + b^2}$, a sum.',
        fr: 'Soustrait les carrés : le module est $\\sqrt{a^2 + b^2}$, une somme.',
        es: 'Resta los cuadrados: el módulo es $\\sqrt{a^2 + b^2}$, una suma.',
        ja: '2乗を引いています：絶対値は和の $\\sqrt{a^2 + b^2}$ です。',
        zh: '把平方相减了：模是 $\\sqrt{a^2 + b^2}$，是和。'
      } },
      { tex: '5', correct: false, why: {
        en: 'That is only $|z|$.',
        fr: 'C’est seulement $|z|$.',
        es: 'Eso es solo $|z|$.',
        ja: 'それは $|z|$ だけです。',
        zh: '那只是 $|z|$。'
      } },
      { tex: '8', correct: false, why: {
        en: 'Adds the parts $7 + 1$ instead of taking $\\sqrt{7^2 + 1^2}$.',
        fr: 'Additionne les parties $7 + 1$ au lieu de calculer $\\sqrt{7^2 + 1^2}$.',
        es: 'Suma las partes $7 + 1$ en lugar de calcular $\\sqrt{7^2 + 1^2}$.',
        ja: '$\\sqrt{7^2 + 1^2}$ ではなく、実部と虚部を $7 + 1$ と足しています。',
        zh: '把实部和虚部直接相加 $7 + 1$，而不是 $\\sqrt{7^2 + 1^2}$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Multiply', fr: 'Multiplier', es: 'Multiplicar', ja: '掛ける', zh: '相乘' },
        lines: ['zw = (3 + 4i)(1 - i) = 3 - 3i + 4i - 4i^2', '= 3 + i + 4 = 7 + i'],
        note: {
          en: 'Expand like ordinary brackets and use $i^2 = -1$.',
          fr: 'Développez comme d’habitude et utilisez $i^2 = -1$.',
          es: 'Desarrolla como paréntesis normales y usa $i^2 = -1$.',
          ja: '普通のかっこと同じように展開し、$i^2 = -1$ を使います。',
          zh: '像普通括号一样展开，并用 $i^2 = -1$。'
        },
        fig(F) { F.draw(F.seg(F.T([0, 0]), F.T([7, 1]), 'hl yellow', 'fills'), 700); }
      },
      {
        title: { en: 'Take the modulus', fr: 'Prendre le module', es: 'Tomar el módulo', ja: '絶対値をとる', zh: '取模' },
        lines: ['|zw| = \\sqrt{7^2 + 1^2} = \\sqrt{50} = \\boxed{5\\sqrt2}'],
        note: {
          en: 'The modulus is the distance from the origin (Pythagoras).',
          fr: 'Le module est la distance à l’origine (Pythagore).',
          es: 'El módulo es la distancia al origen (Pitágoras).',
          ja: '絶対値は原点からの距離です（三平方の定理）。',
          zh: '模就是到原点的距离（勾股定理）。'
        },
        fig(F) { F.draw(F.seg(F.T([7, 0]), F.T([7, 1]), 'hl pink', 'over'), 500); F.draw(F.seg(F.T([0, 0]), F.T([7, 0]), 'hl blue', 'over'), 600, 300); }
      },
      {
        title: { en: 'Shortcut: moduli multiply', fr: 'Raccourci : les modules se multiplient', es: 'Atajo: los módulos se multiplican', ja: '近道：絶対値は掛け算', zh: '捷径：模相乘' },
        lines: ['|z| = \\sqrt{9 + 16} = 5, \\qquad |w| = \\sqrt{1 + 1} = \\sqrt2', '|zw| = |z|\\,|w| = 5\\sqrt2\\ \\checkmark'],
        note: {
          en: 'Multiplying by $w$ stretches every length by $|w|$ (and turns by its argument).',
          fr: 'Multiplier par $w$ dilate toutes les longueurs d’un facteur $|w|$ (et fait tourner de son argument).',
          es: 'Multiplicar por $w$ estira todas las longitudes por $|w|$ (y gira según su argumento).',
          ja: '$w$ を掛けると、すべての長さが $|w|$ 倍になります（そして偏角だけ回転します）。',
          zh: '乘以 $w$ 会把所有长度放大 $|w|$ 倍（并旋转其辐角）。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two options are the same number written differently.', fr: 'Deux options sont le même nombre écrit différemment.', es: 'Dos opciones son el mismo número escrito de forma distinta.', ja: '2つの選択肢は同じ数を別の形で書いたものです。', zh: '有两个选项是同一个数的不同写法。' }
      }
    ]
  });
})(PuzzleBank.kit);
