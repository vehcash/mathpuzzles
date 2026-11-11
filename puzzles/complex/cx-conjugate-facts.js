/* complex · A number and its mirror image
   Conjugates: z z̄ = |z|² and z + z̄ = 2 Re z. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow } = K;

  PuzzleBank.define({
    id: 'cx-conjugate-facts',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "bac"]
    },
    difficulty: 1,
    title: { en: 'A number and its mirror image', fr: 'Un nombre et son reflet', es: 'Un número y su reflejo', ja: '数とその鏡像', zh: '一个数和它的镜像' },
    statement: {
      en: 'Let $z = 2 - 3i$ and let $\\bar z$ be its conjugate. <b>Which of the following are true?</b>',
      fr: 'Soit $z = 2 - 3i$ et $\\bar z$ son conjugué. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'Sea $z = 2 - 3i$ y $\\bar z$ su conjugado. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '$z = 2 - 3i$ とし、その共役を $\\bar z$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '设 $z = 2 - 3i$，$\\bar z$ 为它的共轭。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'The complex plane with z = 2 − 3i and its conjugate 2 + 3i, mirror images in the real axis.',
      fr: 'Le plan complexe avec z = 2 − 3i et son conjugué 2 + 3i, symétriques par rapport à l’axe réel.',
      es: 'El plano complejo con z = 2 − 3i y su conjugado 2 + 3i, simétricos respecto al eje real.',
      ja: '複素平面上の z = 2 − 3i とその共役 2 + 3i。実軸について対称です。',
      zh: '复平面上的 z = 2 − 3i 及其共轭 2 + 3i，关于实轴对称。'
    },
    hint: {
      en: '$\\bar z = 2 + 3i$: only the sign of the imaginary part changes.',
      fr: '$\\bar z = 2 + 3i$ : seul le signe de la partie imaginaire change.',
      es: '$\\bar z = 2 + 3i$: solo cambia el signo de la parte imaginaria.',
      ja: '$\\bar z = 2 + 3i$：虚部の符号だけが変わります。',
      zh: '$\\bar z = 2 + 3i$：只改变虚部的符号。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example using the general rules z z̄ = |z|², z + z̄ = 2 Re z, z − z̄ = 2i Im z), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d’une autre façon si possible (par exemple avec les règles générales z z̄ = |z|², z + z̄ = 2 Re z, z − z̄ = 2i Im z), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con las reglas generales z z̄ = |z|², z + z̄ = 2 Re z, z − z̄ = 2i Im z), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば一般的な性質 z z̄ = |z|²、z + z̄ = 2 Re z、z − z̄ = 2i Im z を使う）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如利用一般规律 z z̄ = |z|²、z + z̄ = 2 Re z、z − z̄ = 2i Im z），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 9, h: 7.4, scale: 30, pad: 18 });
      const T = F.T = argand(F, -3, 6, -3.7, 3.7);
      arrow(F, T([0, 0]), T([2, -3]), 'vec'); arrow(F, T([0, 0]), T([2, 3]), 'vec two');
      F.seg(T([2, -3]), T([2, 3]), 'seg thin');
      F.text(T([2, -3]), 'z = 2 − 3i', 'len', 10, 14); F.text(T([2, 3]), 'z̄ = 2 + 3i', 'len', 10, -12);
      return F;
    },
    options: [
      { tex: 'z\\,\\bar z = 13', correct: true, why: {
        en: '$(2 - 3i)(2 + 3i) = 4 + 9 = |z|^2$.',
        fr: '$(2 - 3i)(2 + 3i) = 4 + 9 = |z|^2$.',
        es: '$(2 - 3i)(2 + 3i) = 4 + 9 = |z|^2$.',
        ja: '$(2 - 3i)(2 + 3i) = 4 + 9 = |z|^2$。',
        zh: '$(2 - 3i)(2 + 3i) = 4 + 9 = |z|^2$。'
      } },
      { tex: 'z + \\bar z = 4', correct: true, why: {
        en: 'The imaginary parts cancel: $2\\,\\mathrm{Re}\\,z = 4$.',
        fr: 'Les parties imaginaires s’annulent : $2\\,\\mathrm{Re}\\,z = 4$.',
        es: 'Las partes imaginarias se anulan: $2\\,\\mathrm{Re}\\,z = 4$.',
        ja: '虚部が打ち消し合います：$2\\,\\mathrm{Re}\\,z = 4$。',
        zh: '虚部相互抵消：$2\\,\\mathrm{Re}\\,z = 4$。'
      } },
      { tex: 'z - \\bar z = -6', correct: false, why: {
        en: '$z - \\bar z = -6i$ — it is purely imaginary.',
        fr: '$z - \\bar z = -6i$ — c’est un imaginaire pur.',
        es: '$z - \\bar z = -6i$ — es imaginario puro.',
        ja: '$z - \\bar z = -6i$ — 純虚数です。',
        zh: '$z - \\bar z = -6i$ —— 它是纯虚数。'
      } },
      { tex: '\\bar z = -2 + 3i', correct: false, why: {
        en: 'That is $-z$: the conjugate keeps the real part.',
        fr: 'C’est $-z$ : le conjugué garde la partie réelle.',
        es: 'Eso es $-z$: el conjugado conserva la parte real.',
        ja: 'それは $-z$ です。共役では実部はそのままです。',
        zh: '那是 $-z$：共轭保留实部不变。'
      } },
      { tex: '\\dfrac1z = 2 + 3i', correct: false, why: {
        en: '$\\dfrac1z = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{2 + 3i}{13}$ — the division by $13$ is missing.',
        fr: '$\\dfrac1z = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{2 + 3i}{13}$ — il manque la division par $13$.',
        es: '$\\dfrac1z = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{2 + 3i}{13}$ — falta dividir entre $13$.',
        ja: '$\\dfrac1z = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{2 + 3i}{13}$ — $13$ で割るのを忘れています。',
        zh: '$\\dfrac1z = \\dfrac{\\bar z}{z\\bar z} = \\dfrac{2 + 3i}{13}$ —— 少了除以 $13$。'
      } },
      { tex: '|z| = 13', correct: false, why: {
        en: '$|z| = \\sqrt{13}$; $13$ is $|z|^2$.',
        fr: '$|z| = \\sqrt{13}$ ; $13$ est $|z|^2$.',
        es: '$|z| = \\sqrt{13}$; $13$ es $|z|^2$.',
        ja: '$|z| = \\sqrt{13}$ で、$13$ は $|z|^2$ です。',
        zh: '$|z| = \\sqrt{13}$；$13$ 是 $|z|^2$。'
      } },
      { tex: 'z^2 = 13', correct: false, why: {
        en: '$z^2 = 4 - 12i + 9i^2 = -5 - 12i$; it is $z\\bar z$ that equals $13$.',
        fr: '$z^2 = 4 - 12i + 9i^2 = -5 - 12i$ ; c’est $z\\bar z$ qui vaut $13$.',
        es: '$z^2 = 4 - 12i + 9i^2 = -5 - 12i$; es $z\\bar z$ lo que vale $13$.',
        ja: '$z^2 = 4 - 12i + 9i^2 = -5 - 12i$。$13$ になるのは $z\\bar z$ です。',
        zh: '$z^2 = 4 - 12i + 9i^2 = -5 - 12i$；等于 $13$ 的是 $z\\bar z$。'
      } },
      { tex: '\\mathrm{Im}\\,z = -3i', correct: false, why: {
        en: 'The imaginary part is the real number $-3$, without the $i$.',
        fr: 'La partie imaginaire est le réel $-3$, sans le $i$.',
        es: 'La parte imaginaria es el número real $-3$, sin la $i$.',
        ja: '虚部は $i$ を含まない実数 $-3$ です。',
        zh: '虚部是实数 $-3$，不带 $i$。'
      } }
    ],
    steps: [
      {
        title: { en: 'The conjugate', fr: 'Le conjugué', es: 'El conjugado', ja: '共役', zh: '共轭' },
        lines: ['\\bar z = 2 + 3i'],
        note: {
          en: 'Reflect $z$ in the real axis: same real part, opposite imaginary part.',
          fr: 'Symétrique de $z$ par rapport à l’axe réel : même partie réelle, partie imaginaire opposée.',
          es: 'Refleja $z$ en el eje real: misma parte real, parte imaginaria opuesta.',
          ja: '$z$ を実軸で折り返します：実部は同じ、虚部は逆符号。',
          zh: '把 $z$ 关于实轴对称：实部相同，虚部相反。'
        },
        fig(F) { F.draw(F.seg(F.T([2, -3]), F.T([2, 3]), 'hl yellow', 'fills'), 700); }
      },
      {
        title: { en: 'Sum and product', fr: 'Somme et produit', es: 'Suma y producto', ja: '和と積', zh: '和与积' },
        lines: ['z + \\bar z = 4, \\qquad z - \\bar z = -6i', 'z\\,\\bar z = 2^2 + 3^2 = 13 = |z|^2'],
        note: {
          en: 'The sum is real, the difference is purely imaginary, the product is the squared modulus.',
          fr: 'La somme est réelle, la différence imaginaire pure, le produit est le carré du module.',
          es: 'La suma es real, la diferencia imaginaria pura y el producto el módulo al cuadrado.',
          ja: '和は実数、差は純虚数、積は絶対値の2乗です。',
          zh: '和是实数，差是纯虚数，积是模的平方。'
        }
      },
      {
        title: { en: 'Other quantities', fr: 'Autres quantités', es: 'Otras cantidades', ja: 'その他の量', zh: '其他量' },
        lines: ['|z| = \\sqrt{13}, \\qquad \\frac1z = \\frac{2 + 3i}{13}, \\qquad z^2 = -5 - 12i'],
        note: {
          en: '$\\mathrm{Re}\\,z = 2$ and $\\mathrm{Im}\\,z = -3$ are both real numbers.',
          fr: '$\\mathrm{Re}\\,z = 2$ et $\\mathrm{Im}\\,z = -3$ sont tous deux des réels.',
          es: '$\\mathrm{Re}\\,z = 2$ e $\\mathrm{Im}\\,z = -3$ son ambos números reales.',
          ja: '$\\mathrm{Re}\\,z = 2$ と $\\mathrm{Im}\\,z = -3$ はどちらも実数です。',
          zh: '$\\mathrm{Re}\\,z = 2$ 和 $\\mathrm{Im}\\,z = -3$ 都是实数。'
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
