/* complex · i to a large power
   Powers of i repeat every 4 steps: i, −1, −i, 1. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow } = K;
  const PTS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  PuzzleBank.define({
    id: 'cx-power-of-i',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: { en: 'i to a large power', fr: 'i à une grande puissance', es: 'i elevado a una gran potencia', ja: 'i の大きなべき乗', zh: 'i 的高次幂' },
    statement: {
      en: '<b>Which of the following equal $i^{2026}$?</b>',
      fr: '<b>Lesquels des nombres suivants sont égaux à $i^{2026}$ ?</b>',
      es: '<b>¿Cuáles de los siguientes son iguales a $i^{2026}$?</b>',
      ja: '<b>次のうち $i^{2026}$ に等しいものはどれですか？</b>',
      zh: '<b>下列哪些等于 $i^{2026}$？</b>'
    },
    figureText: {
      en: 'The unit circle in the complex plane with the four points 1, i, −1, −i; arrows show that each multiplication by i turns a quarter turn.',
      fr: 'Le cercle unité du plan complexe avec les quatre points 1, i, −1, −i ; des flèches montrent que chaque multiplication par i fait un quart de tour.',
      es: 'La circunferencia unidad del plano complejo con los cuatro puntos 1, i, −1, −i; las flechas muestran que cada multiplicación por i gira un cuarto de vuelta.',
      ja: '複素平面の単位円と4点 1、i、−1、−i。矢印は、i を掛けるたびに4分の1回転することを示しています。',
      zh: '复平面上的单位圆及四个点 1、i、−1、−i；箭头表示每乘一次 i 就转四分之一圈。'
    },
    hint: {
      en: '$i^4 = 1$, so only the remainder of $2026$ divided by $4$ matters.',
      fr: '$i^4 = 1$, seul compte donc le reste de la division de $2026$ par $4$.',
      es: '$i^4 = 1$, así que solo importa el resto de dividir $2026$ entre $4$.',
      ja: '$i^4 = 1$ なので、$2026$ を $4$ で割った余りだけが問題です。',
      zh: '$i^4 = 1$，所以只需看 $2026$ 除以 $4$ 的余数。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example with i = e^{iπ/2}, so i^{2026} = e^{1013 iπ}), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple avec i = e^{iπ/2}, donc i^{2026} = e^{1013 iπ}), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con i = e^{iπ/2}, así que i^{2026} = e^{1013 iπ}), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば i = e^{iπ/2} から i^{2026} = e^{1013 iπ}）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如 i = e^{iπ/2}，所以 i^{2026} = e^{1013 iπ}），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 70, pad: 18 });
      const T = F.T = argand(F, -1.7, 1.7, -1.7, 1.7, { grid: false });
      F.circle(T([0, 0]), 1, 'seg thin').setAttribute('fill', 'none');
      [0, 1, 2, 3].forEach(k => F.arc(T([0, 0]), 1.18, 90 * k + 12, 90 * k + 78, 'dashc', 'marks'));
      F.arrowDefs();
      PTS.forEach(p => F.dot(T(p)));
      F.text(T([1, 0]), '1', 'len', 12, 12); F.text(T([0, 1]), 'i', 'len', 12, -10); F.text(T([-1, 0]), '−1', 'len', -14, 12); F.text(T([0, -1]), '−i', 'len', 14, 12);
      F.text(T([0.95, 0.95]), '×i', 'len small', 0, 0);
      return F;
    },
    options: [
      { tex: '-1', correct: true, why: {
        en: '$2026 = 4\\cdot506 + 2$, so $i^{2026} = i^2 = -1$.',
        fr: '$2026 = 4\\cdot506 + 2$, donc $i^{2026} = i^2 = -1$.',
        es: '$2026 = 4\\cdot506 + 2$, así que $i^{2026} = i^2 = -1$.',
        ja: '$2026 = 4\\cdot506 + 2$ なので $i^{2026} = i^2 = -1$。',
        zh: '$2026 = 4\\cdot506 + 2$，所以 $i^{2026} = i^2 = -1$。'
      } },
      { tex: 'i^2', correct: true, why: {
        en: 'The same value: remainder $2$.',
        fr: 'La même valeur : reste $2$.',
        es: 'El mismo valor: resto $2$.',
        ja: '同じ値です：余りは $2$。',
        zh: '同一个值：余数为 $2$。'
      } },
      { tex: '1', correct: false, why: {
        en: 'An even exponent is not enough: $i^2 = -1$. Only multiples of $4$ give $1$.',
        fr: 'Un exposant pair ne suffit pas : $i^2 = -1$. Seuls les multiples de $4$ donnent $1$.',
        es: 'Un exponente par no basta: $i^2 = -1$. Solo los múltiplos de $4$ dan $1$.',
        ja: '偶数乗だけでは不十分：$i^2 = -1$。$1$ になるのは $4$ の倍数乗だけです。',
        zh: '指数为偶数还不够：$i^2 = -1$。只有 $4$ 的倍数次幂才等于 $1$。'
      } },
      { tex: 'i', correct: false, why: {
        en: 'That is $i^{4k+1}$; $2026$ leaves remainder $2$, not $1$.',
        fr: 'C’est $i^{4k+1}$ ; $2026$ a pour reste $2$, pas $1$.',
        es: 'Eso es $i^{4k+1}$; $2026$ deja resto $2$, no $1$.',
        ja: 'それは $i^{4k+1}$ です。$2026$ の余りは $1$ ではなく $2$。',
        zh: '那是 $i^{4k+1}$；$2026$ 的余数是 $2$ 而不是 $1$。'
      } },
      { tex: '-i', correct: false, why: {
        en: 'That is $i^{4k+3}$.',
        fr: 'C’est $i^{4k+3}$.',
        es: 'Eso es $i^{4k+3}$.',
        ja: 'それは $i^{4k+3}$ です。',
        zh: '那是 $i^{4k+3}$。'
      } },
      { tex: 'i^{2024}', correct: false, why: {
        en: '$2024$ is a multiple of $4$, so $i^{2024} = 1$.',
        fr: '$2024$ est un multiple de $4$, donc $i^{2024} = 1$.',
        es: '$2024$ es múltiplo de $4$, así que $i^{2024} = 1$.',
        ja: '$2024$ は $4$ の倍数なので $i^{2024} = 1$。',
        zh: '$2024$ 是 $4$ 的倍数，所以 $i^{2024} = 1$。'
      } },
      { tex: '-2026', correct: false, why: {
        en: 'Powers multiply, not add: $i^{2026}$ is not $2026\\,i^2$.',
        fr: 'Une puissance n’est pas un produit par l’exposant : $i^{2026}$ n’est pas $2026\\,i^2$.',
        es: 'Una potencia no es multiplicar por el exponente: $i^{2026}$ no es $2026\\,i^2$.',
        ja: 'べき乗は指数を掛けることではありません：$i^{2026}$ は $2026\\,i^2$ ではありません。',
        zh: '幂不是乘以指数：$i^{2026}$ 不等于 $2026\\,i^2$。'
      } },
      { tex: '0', correct: false, why: {
        en: 'Every power of $i$ has modulus $1$, so it is never $0$.',
        fr: 'Toute puissance de $i$ est de module $1$, elle n’est donc jamais nulle.',
        es: 'Toda potencia de $i$ tiene módulo $1$, así que nunca es $0$.',
        ja: '$i$ のべき乗の絶対値は常に $1$ なので、$0$ にはなりません。',
        zh: '$i$ 的任何次幂的模都是 $1$，不可能为 $0$。'
      } }
    ],
    steps: [
      {
        title: { en: 'The first powers', fr: 'Les premières puissances', es: 'Las primeras potencias', ja: '最初のいくつかのべき', zh: '前几次幂' },
        lines: ['i^1 = i, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1'],
        note: {
          en: 'Each multiplication by $i$ is a quarter turn around the origin.',
          fr: 'Chaque multiplication par $i$ est un quart de tour autour de l’origine.',
          es: 'Cada multiplicación por $i$ es un cuarto de vuelta alrededor del origen.',
          ja: '$i$ を掛けるたびに原点の周りを4分の1回転します。',
          zh: '每乘一次 $i$，就绕原点转四分之一圈。'
        },
        fig(F) { PTS.forEach((p, k) => F.fadeIn(F.circle(F.T(p), 0.12, 'halo', 'over'), 300, 250 * k)); }
      },
      {
        title: { en: 'Where 2026 lands in the cycle', fr: 'Où tombe 2026 dans le cycle', es: 'Dónde cae 2026 en el ciclo', ja: '2026 は周期のどこに当たるか', zh: '2026 落在周期的哪个位置' },
        lines: ['2026 = 4\\cdot506 + 2', 'i^{2026} = (i^4)^{506}\\cdot i^2 = 1\\cdot(-1) = \\boxed{-1}'],
        note: {
          en: '$506$ full turns bring us back to $1$, then two more quarter turns reach $-1$.',
          fr: '$506$ tours complets ramènent à $1$, puis deux quarts de tour de plus mènent à $-1$.',
          es: '$506$ vueltas completas nos devuelven a $1$, y dos cuartos de vuelta más llegan a $-1$.',
          ja: '$506$ 回の1回転で $1$ に戻り、さらに4分の1回転を2回で $-1$ に着きます。',
          zh: '转 $506$ 整圈回到 $1$，再转两个四分之一圈到达 $-1$。'
        },
        fig(F) { F.draw(F.seg(F.T([0, 0]), F.T([-1, 0]), 'hl yellow', 'over'), 600); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two options are the same number written differently.', fr: 'Deux options sont le même nombre écrit différemment.', es: 'Dos opciones son el mismo número escrito de forma distinta.', ja: '2つの選択肢は同じ数を別の形で書いたものです。', zh: '有两个选项是同一个数的不同写法。' }
      }
    ]
  });
})(PuzzleBank.kit);
