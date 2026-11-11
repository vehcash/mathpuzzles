/* complex · A quadratic with no real roots
   z² + 2z + 5 = 0 has the conjugate roots −1 ± 2i. */
(function (K) {
  'use strict';
  const { Figure, argand } = K;

  PuzzleBank.define({
    id: 'cx-quadratic-roots',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["bac", "alevelfm", "ib"]
    },
    difficulty: 1,
    title: { en: 'A quadratic with no real roots', fr: 'Une équation du second degré sans racine réelle', es: 'Una ecuación de segundo grado sin raíces reales', ja: '実数解をもたない2次方程式', zh: '没有实根的二次方程' },
    statement: {
      en: '<b>Which of the following are solutions of $z^2 + 2z + 5 = 0$?</b>',
      fr: '<b>Lesquels des nombres suivants sont solutions de $z^2 + 2z + 5 = 0$ ?</b>',
      es: '<b>¿Cuáles de los siguientes son soluciones de $z^2 + 2z + 5 = 0$?</b>',
      ja: '<b>次のうち $z^2 + 2z + 5 = 0$ の解はどれですか？</b>',
      zh: '<b>下列哪些是 $z^2 + 2z + 5 = 0$ 的解？</b>'
    },
    figureText: {
      en: "The complex plane where the roots will be placed. They are plotted in the solution.",
      fr: "Le plan complexe où seront placées les racines. Elles sont placées dans la solution.",
      es: "El plano complejo donde irán las raíces. Se colocan en la solución.",
      ja: "解を置く複素平面。解は解答で描きます。",
      zh: "将放置根的复平面。根在解答中标出。"
    },
    hint: {
      en: 'Use the quadratic formula; the discriminant is negative, and $\\sqrt{-16} = 4i$.',
      fr: 'Utilisez la formule du second degré ; le discriminant est négatif, et $\\sqrt{-16} = 4i$.',
      es: 'Usa la fórmula cuadrática; el discriminante es negativo, y $\\sqrt{-16} = 4i$.',
      ja: '解の公式を使います。判別式は負で、$\\sqrt{-16} = 4i$ です。',
      zh: '用求根公式；判别式为负，且 $\\sqrt{-16} = 4i$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example completing the square: (z + 1)² = −4), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple sous forme canonique : (z + 1)² = −4), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo completando el cuadrado: (z + 1)² = −4), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば平方完成：(z + 1)² = −4）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如配方：(z + 1)² = −4），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 5.4, scale: 46, pad: 18 });
      const T = F.T = argand(F, -3, 2.4, -2.7, 2.7);
      F.reveal = () => {
        F.circle(T([0, 0]), Math.sqrt(5), 'seg thin').setAttribute('fill', 'none');
        F.seg(T([-1, 2]), T([-1, -2]), 'seg thin');
        F.dot(T([-1, 2])); F.dot(T([-1, -2]));
        F.text(T([-1, 2]), '−1 + 2i', 'len', -36, -10); F.text(T([-1, -2]), '−1 − 2i', 'len', -36, 12);
      };
      return F;
    },
    options: [
      { tex: 'z = -1 + 2i', correct: true, why: {
        en: '$(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$.',
        fr: '$(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$.',
        es: '$(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$.',
        ja: '$(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$。',
        zh: '$(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (-3 - 4i) + (-2 + 4i) + 5 = 0$。'
      } },
      { tex: 'z = -1 - 2i', correct: true, why: {
        en: 'The conjugate root: real coefficients give roots in conjugate pairs.',
        fr: 'La racine conjuguée : des coefficients réels donnent des racines conjuguées deux à deux.',
        es: 'La raíz conjugada: coeficientes reales dan raíces en pares conjugados.',
        ja: '共役な解です：実数係数の方程式の解は共役な組になります。',
        zh: '共轭根：实系数方程的根成共轭对出现。'
      } },
      { tex: 'z = 1 + 2i', correct: false, why: {
        en: 'Sign slip in $-\\tfrac{b}{2a} = -1$.',
        fr: 'Erreur de signe dans $-\\tfrac{b}{2a} = -1$.',
        es: 'Error de signo en $-\\tfrac{b}{2a} = -1$.',
        ja: '$-\\tfrac{b}{2a} = -1$ の符号ミスです。',
        zh: '$-\\tfrac{b}{2a} = -1$ 的符号错了。'
      } },
      { tex: 'z = 1 - 2i', correct: false, why: {
        en: 'The same sign slip with the other root.',
        fr: 'La même erreur de signe avec l’autre racine.',
        es: 'El mismo error de signo con la otra raíz.',
        ja: 'もう1つの解で同じ符号ミスをしています。',
        zh: '另一个根犯了同样的符号错误。'
      } },
      { tex: 'z = -1 + 4i', correct: false, why: {
        en: 'Forgot to divide $\\sqrt{-16} = 4i$ by $2$.',
        fr: 'A oublié de diviser $\\sqrt{-16} = 4i$ par $2$.',
        es: 'Olvidó dividir $\\sqrt{-16} = 4i$ entre $2$.',
        ja: '$\\sqrt{-16} = 4i$ を $2$ で割り忘れています。',
        zh: '忘了把 $\\sqrt{-16} = 4i$ 除以 $2$。'
      } },
      { tex: 'z = -1 + \\sqrt6', correct: false, why: {
        en: 'Used $b^2 + 4ac = 24$ instead of $b^2 - 4ac = -16$.',
        fr: 'A utilisé $b^2 + 4ac = 24$ au lieu de $b^2 - 4ac = -16$.',
        es: 'Usó $b^2 + 4ac = 24$ en lugar de $b^2 - 4ac = -16$.',
        ja: '$b^2 - 4ac = -16$ ではなく $b^2 + 4ac = 24$ を使っています。',
        zh: '用了 $b^2 + 4ac = 24$，而应是 $b^2 - 4ac = -16$。'
      } },
      { tex: 'z = \\sqrt5\\, i', correct: false, why: {
        en: 'Ignores the $2z$ term: that is a root of $z^2 + 5 = 0$.',
        fr: 'Ignore le terme $2z$ : c’est une racine de $z^2 + 5 = 0$.',
        es: 'Ignora el término $2z$: es una raíz de $z^2 + 5 = 0$.',
        ja: '$2z$ の項を無視しています（$z^2 + 5 = 0$ の解）。',
        zh: '忽略了 $2z$ 这一项（这是 $z^2 + 5 = 0$ 的解）。'
      } },
      { tex: 'z = -5', correct: false, why: {
        en: '$5$ is the product of the roots, $|{-1 \\pm 2i}|^2$; $(-5)^2 - 10 + 5 = 20 \\ne 0$.',
        fr: '$5$ est le produit des racines, $|{-1 \\pm 2i}|^2$ ; $(-5)^2 - 10 + 5 = 20 \\ne 0$.',
        es: '$5$ es el producto de las raíces, $|{-1 \\pm 2i}|^2$; $(-5)^2 - 10 + 5 = 20 \\ne 0$.',
        ja: '$5$ は解の積 $|{-1 \\pm 2i}|^2$ です。$(-5)^2 - 10 + 5 = 20 \\ne 0$。',
        zh: '$5$ 是两根之积 $|{-1 \\pm 2i}|^2$；$(-5)^2 - 10 + 5 = 20 \\ne 0$。'
      } }
    ],
    steps: [
      {
        title: { en: 'The discriminant', fr: 'Le discriminant', es: 'El discriminante', ja: '判別式', zh: '判别式' },
        lines: ['\\Delta = b^2 - 4ac = 4 - 20 = -16 < 0', '\\sqrt{-16} = 4i'],
        note: {
          en: 'No real roots — but two complex ones.',
          fr: 'Pas de racine réelle — mais deux racines complexes.',
          es: 'No hay raíces reales — pero sí dos complejas.',
          ja: '実数解はありませんが、複素数解が2つあります。',
          zh: '没有实根 —— 但有两个复根。'
        }
      },
      {
        title: { en: 'The quadratic formula', fr: 'La formule du second degré', es: 'La fórmula cuadrática', ja: '解の公式', zh: '求根公式' },
        lines: ['z = \\frac{-2 \\pm 4i}{2} = \\boxed{-1 \\pm 2i}'],
        note: {
          en: 'The two roots are conjugates, mirror images in the real axis.',
          fr: 'Les deux racines sont conjuguées, symétriques par rapport à l’axe réel.',
          es: 'Las dos raíces son conjugadas, simétricas respecto al eje real.',
          ja: '2つの解は共役で、実軸について対称です。',
          zh: '两个根互为共轭，关于实轴对称。'
        },
        fig(F) { [[-1, 2], [-1, -2]].forEach((p, k) => F.fadeIn(F.circle(F.T(p), 0.18, 'halo', 'over'), 400, 300 * k)); }
      },
      {
        fig(F) { if (F.reveal) F.reveal(); },
        title: { en: 'Check with sum and product', fr: 'Vérifier avec la somme et le produit', es: 'Comprobar con la suma y el producto', ja: '和と積で確認', zh: '用和与积验证' },
        lines: ['(-1 + 2i) + (-1 - 2i) = -2 = -\\tfrac{b}{a}', '(-1 + 2i)(-1 - 2i) = 1 + 4 = 5 = \\tfrac{c}{a}\\ \\checkmark'],
        note: {
          en: 'The product $5 = |z|^2$, which is why both roots lie on the circle of radius $\\sqrt5$.',
          fr: 'Le produit $5 = |z|^2$ : c’est pourquoi les deux racines sont sur le cercle de rayon $\\sqrt5$.',
          es: 'El producto $5 = |z|^2$: por eso las dos raíces están en la circunferencia de radio $\\sqrt5$.',
          ja: '積 $5 = |z|^2$ — だから2つの解は半径 $\\sqrt5$ の円上にあります。',
          zh: '积 $5 = |z|^2$ —— 所以两个根都在半径为 $\\sqrt5$ 的圆上。'
        }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Exactly two options are roots.', fr: 'Exactement deux options sont des racines.', es: 'Exactamente dos opciones son raíces.', ja: 'ちょうど2つの選択肢が解です。', zh: '恰有两个选项是根。' }
      }
    ]
  });
})(PuzzleBank.kit);
