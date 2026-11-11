/* complex · A spiral of powers
   De Moivre: (1 + i)⁸ = (√2)⁸ (cos 360° + i sin 360°) = 16. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow } = K;
  const POW = [[1, 1], [0, 2], [-2, 2], [-4, 0]];

  PuzzleBank.define({
    id: 'cx-de-moivre-power',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["bac", "alevelfm", "ib"]
    },
    difficulty: 2,
    title: { en: 'A spiral of powers', fr: 'Une spirale de puissances', es: 'Una espiral de potencias', ja: 'べき乗のらせん', zh: '幂的螺旋' },
    statement: {
      en: '<b>Which of the following equal $(1 + i)^8$?</b>',
      fr: '<b>Lesquels des nombres suivants sont égaux à $(1 + i)^8$ ?</b>',
      es: '<b>¿Cuáles de los siguientes son iguales a $(1 + i)^8$?</b>',
      ja: '<b>次のうち $(1 + i)^8$ に等しいものはどれですか？</b>',
      zh: '<b>下列哪些等于 $(1 + i)^8$？</b>'
    },
    figureText: {
      en: "The vector 1 + i in the complex plane. Its powers are drawn in the solution.",
      fr: "Le vecteur 1 + i dans le plan complexe. Ses puissances sont tracées dans la solution.",
      es: "El vector 1 + i en el plano complejo. Sus potencias se dibujan en la solución.",
      ja: "複素平面のベクトル 1 + i。累乗は解答で描きます。",
      zh: "复平面上的向量 1 + i。它的幂在解答中画出。"
    },
    hint: {
      en: 'Write $1 + i$ in polar form: modulus $\\sqrt2$, argument $45^\\circ$. Raising to a power multiplies the angle.',
      fr: 'Écrivez $1 + i$ sous forme trigonométrique : module $\\sqrt2$, argument $45^\\circ$. Élever à une puissance multiplie l’angle.',
      es: 'Escribe $1 + i$ en forma polar: módulo $\\sqrt2$, argumento $45^\\circ$. Elevar a una potencia multiplica el ángulo.',
      ja: '$1 + i$ を極形式にします：絶対値 $\\sqrt2$、偏角 $45^\\circ$。べき乗すると角度は何倍にもなります。',
      zh: '把 $1 + i$ 写成极坐标形式：模 $\\sqrt2$，辐角 $45^\\circ$。求幂会使角度成倍增加。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example (1 + i)² = 2i, so (1 + i)⁸ = (2i)⁴), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple (1 + i)² = 2i, donc (1 + i)⁸ = (2i)⁴), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo (1 + i)² = 2i, así que (1 + i)⁸ = (2i)⁴), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば (1 + i)² = 2i なので (1 + i)⁸ = (2i)⁴）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如 (1 + i)² = 2i，所以 (1 + i)⁸ = (2i)⁴），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 4.6, scale: 40, pad: 18 });
      const T = F.T = argand(F, -5, 2, -1.2, 3.4);
      arrow(F, T([0, 0]), T(POW[0]), 'vec');
      F.text(T([1, 1]), '1 + i', 'len', 26, -6); 
      F.reveal = () => {
        POW.forEach((p, k) => { if (k) arrow(F, T([0, 0]), T(p), 'vec two'); }); F.text(T([0, 2]), '(1+i)²', 'len small', 28, -6); F.text(T([-2, 2]), '(1+i)³', 'len small', -10, -12); F.text(T([-4, 0]), '(1+i)⁴', 'len small', 0, -14);
      };
      return F;
    },
    options: [
      { tex: '16', correct: true, why: {
        en: '$(\\sqrt2)^8 = 16$ and $8\\cdot45^\\circ = 360^\\circ$, a full turn.',
        fr: '$(\\sqrt2)^8 = 16$ et $8\\cdot45^\\circ = 360^\\circ$, un tour complet.',
        es: '$(\\sqrt2)^8 = 16$ y $8\\cdot45^\\circ = 360^\\circ$, una vuelta completa.',
        ja: '$(\\sqrt2)^8 = 16$、$8\\cdot45^\\circ = 360^\\circ$ でちょうど1回転。',
        zh: '$(\\sqrt2)^8 = 16$，而 $8\\cdot45^\\circ = 360^\\circ$，正好一整圈。'
      } },
      { tex: '2^4', correct: true, why: {
        en: '$(1 + i)^8 = \\big((1 + i)^2\\big)^4 = (2i)^4 = 16\\,i^4 = 2^4$.',
        fr: '$(1 + i)^8 = \\big((1 + i)^2\\big)^4 = (2i)^4 = 16\\,i^4 = 2^4$.',
        es: '$(1 + i)^8 = \\big((1 + i)^2\\big)^4 = (2i)^4 = 16\\,i^4 = 2^4$.',
        ja: '$(1 + i)^8 = \\big((1 + i)^2\\big)^4 = (2i)^4 = 16\\,i^4 = 2^4$。',
        zh: '$(1 + i)^8 = \\big((1 + i)^2\\big)^4 = (2i)^4 = 16\\,i^4 = 2^4$。'
      } },
      { tex: '16i', correct: false, why: {
        en: '$360^\\circ$ points along the positive real axis, so there is no $i$.',
        fr: '$360^\\circ$ pointe le long de l’axe réel positif, il n’y a donc pas de $i$.',
        es: '$360^\\circ$ apunta en el eje real positivo, así que no hay $i$.',
        ja: '$360^\\circ$ は正の実軸方向なので $i$ は付きません。',
        zh: '$360^\\circ$ 指向正实轴，所以没有 $i$。'
      } },
      { tex: '-16', correct: false, why: {
        en: 'That would be an angle of $180^\\circ$, as for $(1 + i)^4 = -4$.',
        fr: 'Ce serait un angle de $180^\\circ$, comme pour $(1 + i)^4 = -4$.',
        es: 'Sería un ángulo de $180^\\circ$, como en $(1 + i)^4 = -4$.',
        ja: 'それは角度 $180^\\circ$ の場合で、$(1 + i)^4 = -4$ のときと同じ向きです。',
        zh: '那对应 $180^\\circ$ 的角，就像 $(1 + i)^4 = -4$ 那样。'
      } },
      { tex: '256', correct: false, why: {
        en: 'Uses modulus $2$ instead of $\\sqrt2$: $2^8 = 256$.',
        fr: 'Prend le module $2$ au lieu de $\\sqrt2$ : $2^8 = 256$.',
        es: 'Usa módulo $2$ en lugar de $\\sqrt2$: $2^8 = 256$.',
        ja: '絶対値を $\\sqrt2$ ではなく $2$ としています：$2^8 = 256$。',
        zh: '把模当成 $2$ 而不是 $\\sqrt2$：$2^8 = 256$。'
      } },
      { tex: '8\\sqrt2', correct: false, why: {
        en: 'Multiplies the modulus by $8$ instead of raising it to the 8th power.',
        fr: 'Multiplie le module par $8$ au lieu de l’élever à la puissance $8$.',
        es: 'Multiplica el módulo por $8$ en lugar de elevarlo a la octava.',
        ja: '絶対値を8乗せずに $8$ 倍しています。',
        zh: '把模乘以 $8$，而不是取 $8$ 次方。'
      } },
      { tex: '1 + 8i', correct: false, why: {
        en: 'Only the first two terms of the binomial expansion.',
        fr: 'Seulement les deux premiers termes du binôme.',
        es: 'Solo los dos primeros términos del binomio.',
        ja: '二項展開の最初の2項だけです。',
        zh: '只取了二项式展开的前两项。'
      } },
      { tex: '0', correct: false, why: {
        en: '$|1 + i|^8 = 16 \\ne 0$.',
        fr: '$|1 + i|^8 = 16 \\ne 0$.',
        es: '$|1 + i|^8 = 16 \\ne 0$.',
        ja: '$|1 + i|^8 = 16 \\ne 0$。',
        zh: '$|1 + i|^8 = 16 \\ne 0$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Polar form', fr: 'Forme trigonométrique', es: 'Forma polar', ja: '極形式', zh: '极坐标形式' },
        lines: ['1 + i = \\sqrt2\\,(\\cos45^\\circ + i\\sin45^\\circ)'],
        note: {
          en: 'Modulus $\\sqrt{1^2 + 1^2}$, angle $45^\\circ$ with the real axis.',
          fr: 'Module $\\sqrt{1^2 + 1^2}$, angle de $45^\\circ$ avec l’axe réel.',
          es: 'Módulo $\\sqrt{1^2 + 1^2}$, ángulo de $45^\\circ$ con el eje real.',
          ja: '絶対値 $\\sqrt{1^2 + 1^2}$、実軸とのなす角 $45^\\circ$。',
          zh: '模为 $\\sqrt{1^2 + 1^2}$，与实轴夹角 $45^\\circ$。'
        },
        fig(F) { F.draw(F.arc(F.T([0, 0]), 0.6, 0, 45, 'dashc', 'over'), 500); }
      },
      {
        title: { en: 'De Moivre’s formula', fr: 'La formule de Moivre', es: 'La fórmula de De Moivre', ja: 'ド・モアブルの定理', zh: '棣莫弗公式' },
        lines: ['(1 + i)^8 = (\\sqrt2)^8\\,(\\cos360^\\circ + i\\sin360^\\circ)', '= 16\\,(1 + 0i) = \\boxed{16}'],
        note: {
          en: 'Raise the modulus to the power, multiply the angle by it.',
          fr: 'On élève le module à la puissance, on multiplie l’angle par l’exposant.',
          es: 'Se eleva el módulo a la potencia y se multiplica el ángulo por el exponente.',
          ja: '絶対値はべき乗し、角度は指数倍します。',
          zh: '模取幂，角度乘以指数。'
        },
        fig(F) { POW.forEach((p, k) => F.fadeIn(F.circle(F.T(p), 0.16, 'halo', 'over'), 300, 250 * k)); }
      },
      {
        fig(F) { if (F.reveal) F.reveal(); },
        title: { en: 'Check with squares', fr: 'Vérifier avec les carrés', es: 'Comprobar con cuadrados', ja: '2乗で確認', zh: '用平方验证' },
        lines: ['(1 + i)^2 = 1 + 2i + i^2 = 2i', '(1 + i)^8 = (2i)^4 = 16\\,i^4 = 16\\ \\checkmark'],
        note: {
          en: 'Squaring three times gives the 8th power.',
          fr: 'Trois mises au carré donnent la puissance $8$.',
          es: 'Elevar al cuadrado tres veces da la potencia $8$.',
          ja: '2乗を3回すると8乗になります。',
          zh: '平方三次就得到 8 次幂。'
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
