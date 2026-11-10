/* complex · Dividing by a complex number
   Multiply top and bottom by the conjugate of the denominator. */
(function (K) {
  'use strict';
  const { Figure, argand, arrow } = K;

  PuzzleBank.define({
    id: 'cx-division-conjugate',
    category: 'complex',
    difficulty: 1,
    title: { en: 'Dividing by a complex number', fr: 'Diviser par un nombre complexe', es: 'Dividir entre un número complejo', ja: '複素数で割る', zh: '除以一个复数' },
    statement: {
      en: '<b>Which of the following equals $\\dfrac{5 + 5i}{1 + 2i}$?</b>',
      fr: '<b>Lequel des nombres suivants est égal à $\\dfrac{5 + 5i}{1 + 2i}$ ?</b>',
      es: '<b>¿Cuál de los siguientes es igual a $\\dfrac{5 + 5i}{1 + 2i}$?</b>',
      ja: '<b>次のうち $\\dfrac{5 + 5i}{1 + 2i}$ に等しいものはどれですか？</b>',
      zh: '<b>下列哪一个等于 $\\dfrac{5 + 5i}{1 + 2i}$？</b>'
    },
    figureText: {
      en: 'The complex plane with 5 + 5i, 1 + 2i and the quotient 3 − i, each joined to the origin.',
      fr: 'Le plan complexe avec 5 + 5i, 1 + 2i et le quotient 3 − i, chacun relié à l’origine.',
      es: 'El plano complejo con 5 + 5i, 1 + 2i y el cociente 3 − i, cada uno unido al origen.',
      ja: '複素平面上の 5 + 5i、1 + 2i と商 3 − i。それぞれ原点と結ばれています。',
      zh: '复平面上的 5 + 5i、1 + 2i 以及商 3 − i，各点都与原点相连。'
    },
    hint: {
      en: 'Multiply numerator and denominator by $1 - 2i$: the denominator becomes the real number $1^2 + 2^2$.',
      fr: 'Multipliez le numérateur et le dénominateur par $1 - 2i$ : le dénominateur devient le réel $1^2 + 2^2$.',
      es: 'Multiplica numerador y denominador por $1 - 2i$: el denominador se convierte en el número real $1^2 + 2^2$.',
      ja: '分子と分母に $1 - 2i$ を掛けると、分母は実数 $1^2 + 2^2$ になります。',
      zh: '分子分母同乘 $1 - 2i$：分母变成实数 $1^2 + 2^2$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example writing the answer as a + bi and solving (a + bi)(1 + 2i) = 5 + 5i), show every step, then check each option and say which one is correct.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en écrivant la réponse a + bi et en résolvant (a + bi)(1 + 2i) = 5 + 5i), montre chaque étape, puis vérifie chaque option et dis laquelle est correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo escribiendo la respuesta como a + bi y resolviendo (a + bi)(1 + 2i) = 5 + 5i), muestra cada paso y luego comprueba cada opción y di cuál es correcta.',
      ja: 'できれば別の方法で解いてください（例えば答えを a + bi とおいて (a + bi)(1 + 2i) = 5 + 5i を解く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如设答案为 a + bi，解方程 (a + bi)(1 + 2i) = 5 + 5i），写出每一步，然后逐项检查选项并指出哪一个正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 7.5, scale: 30, pad: 18 });
      const T = F.T = argand(F, -1, 6, -1.8, 5.7);
      arrow(F, T([0, 0]), T([5, 5]), 'vec'); arrow(F, T([0, 0]), T([1, 2]), 'vec');
      arrow(F, T([0, 0]), T([3, -1]), 'vec two');
      F.text(T([5, 5]), '5 + 5i', 'len', -4, -14); F.text(T([1, 2]), '1 + 2i', 'len', -30, -6); F.text(T([3, -1]), '3 − i', 'len', 26, 6);
      return F;
    },
    options: [
      { tex: '3 - i', correct: true, why: {
        en: '$\\dfrac{(5 + 5i)(1 - 2i)}{5} = \\dfrac{15 - 5i}{5}$.',
        fr: '$\\dfrac{(5 + 5i)(1 - 2i)}{5} = \\dfrac{15 - 5i}{5}$.',
        es: '$\\dfrac{(5 + 5i)(1 - 2i)}{5} = \\dfrac{15 - 5i}{5}$.',
        ja: '$\\dfrac{(5 + 5i)(1 - 2i)}{5} = \\dfrac{15 - 5i}{5}$。',
        zh: '$\\dfrac{(5 + 5i)(1 - 2i)}{5} = \\dfrac{15 - 5i}{5}$。'
      } },
      { tex: '5 + \\tfrac52 i', correct: false, why: {
        en: 'Divides real part by real part and imaginary by imaginary — division does not work that way.',
        fr: 'Divise partie réelle par partie réelle et partie imaginaire par partie imaginaire — la division ne marche pas ainsi.',
        es: 'Divide parte real entre parte real e imaginaria entre imaginaria — la división no funciona así.',
        ja: '実部どうし、虚部どうしで割っています — 割り算はそうはなりません。',
        zh: '实部除以实部、虚部除以虚部 —— 除法不是这样做的。'
      } },
      { tex: '3 + i', correct: false, why: {
        en: 'Sign slip: $5i - 10i = -5i$.',
        fr: 'Erreur de signe : $5i - 10i = -5i$.',
        es: 'Error de signo: $5i - 10i = -5i$.',
        ja: '符号ミス：$5i - 10i = -5i$。',
        zh: '符号错误：$5i - 10i = -5i$。'
      } },
      { tex: '-1 + 3i', correct: false, why: {
        en: 'Multiplied by $1 + 2i$ instead of its conjugate $1 - 2i$.',
        fr: 'A multiplié par $1 + 2i$ au lieu de son conjugué $1 - 2i$.',
        es: 'Multiplicó por $1 + 2i$ en lugar de su conjugado $1 - 2i$.',
        ja: '共役の $1 - 2i$ ではなく $1 + 2i$ を掛けています。',
        zh: '乘的是 $1 + 2i$ 而不是它的共轭 $1 - 2i$。'
      } },
      { tex: '15 - 5i', correct: false, why: {
        en: 'Forgot to divide by $(1 + 2i)(1 - 2i) = 5$.',
        fr: 'A oublié de diviser par $(1 + 2i)(1 - 2i) = 5$.',
        es: 'Olvidó dividir entre $(1 + 2i)(1 - 2i) = 5$.',
        ja: '$(1 + 2i)(1 - 2i) = 5$ で割り忘れています。',
        zh: '忘了除以 $(1 + 2i)(1 - 2i) = 5$。'
      } },
      { tex: '\\tfrac{15 - 5i}{\\sqrt5}', correct: false, why: {
        en: 'Divided by $|1 + 2i| = \\sqrt5$ instead of $|1 + 2i|^2 = 5$.',
        fr: 'A divisé par $|1 + 2i| = \\sqrt5$ au lieu de $|1 + 2i|^2 = 5$.',
        es: 'Dividió entre $|1 + 2i| = \\sqrt5$ en lugar de $|1 + 2i|^2 = 5$.',
        ja: '$|1 + 2i|^2 = 5$ ではなく $|1 + 2i| = \\sqrt5$ で割っています。',
        zh: '除以了 $|1 + 2i| = \\sqrt5$，而应除以 $|1 + 2i|^2 = 5$。'
      } },
      { tex: '\\sqrt{10}', correct: false, why: {
        en: 'That is the modulus of the quotient, $\\tfrac{\\sqrt{50}}{\\sqrt5}$, not the quotient itself.',
        fr: 'C’est le module du quotient, $\\tfrac{\\sqrt{50}}{\\sqrt5}$, pas le quotient lui-même.',
        es: 'Eso es el módulo del cociente, $\\tfrac{\\sqrt{50}}{\\sqrt5}$, no el cociente.',
        ja: 'それは商の絶対値 $\\tfrac{\\sqrt{50}}{\\sqrt5}$ で、商そのものではありません。',
        zh: '那是商的模 $\\tfrac{\\sqrt{50}}{\\sqrt5}$，不是商本身。'
      } },
      { tex: '1 - 3i', correct: false, why: {
        en: 'Real and imaginary parts mixed up: check $(1 - 3i)(1 + 2i) = 7 - i$.',
        fr: 'Parties réelle et imaginaire mélangées : $(1 - 3i)(1 + 2i) = 7 - i$.',
        es: 'Partes real e imaginaria mezcladas: $(1 - 3i)(1 + 2i) = 7 - i$.',
        ja: '実部と虚部が混ざっています：$(1 - 3i)(1 + 2i) = 7 - i$。',
        zh: '实部和虚部搞混了：$(1 - 3i)(1 + 2i) = 7 - i$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Multiply by the conjugate', fr: 'Multiplier par le conjugué', es: 'Multiplicar por el conjugado', ja: '共役を掛ける', zh: '乘以共轭' },
        lines: ['\\frac{5 + 5i}{1 + 2i}\\cdot\\frac{1 - 2i}{1 - 2i}', '(1 + 2i)(1 - 2i) = 1 - 4i^2 = 5'],
        note: {
          en: 'A number times its conjugate is real: $(a + bi)(a - bi) = a^2 + b^2$.',
          fr: 'Un nombre fois son conjugué est réel : $(a + bi)(a - bi) = a^2 + b^2$.',
          es: 'Un número por su conjugado es real: $(a + bi)(a - bi) = a^2 + b^2$.',
          ja: '数とその共役の積は実数です：$(a + bi)(a - bi) = a^2 + b^2$。',
          zh: '一个数乘以它的共轭是实数：$(a + bi)(a - bi) = a^2 + b^2$。'
        }
      },
      {
        title: { en: 'Expand the numerator', fr: 'Développer le numérateur', es: 'Desarrollar el numerador', ja: '分子を展開する', zh: '展开分子' },
        lines: ['(5 + 5i)(1 - 2i) = 5 - 10i + 5i - 10i^2 = 15 - 5i', '\\frac{15 - 5i}{5} = \\boxed{3 - i}'],
        note: {
          en: 'Then divide both parts by the real number $5$.',
          fr: 'Puis divisez les deux parties par le réel $5$.',
          es: 'Después divide las dos partes entre el número real $5$.',
          ja: 'そのあと両方の部分を実数 $5$ で割ります。',
          zh: '然后把两部分都除以实数 $5$。'
        },
        fig(F) { F.draw(F.seg(F.T([0, 0]), F.T([3, -1]), 'hl yellow', 'fills'), 700); }
      },
      {
        title: { en: 'Check by multiplying back', fr: 'Vérifier en remultipliant', es: 'Comprobar multiplicando', ja: '掛け戻して確認', zh: '乘回去验证' },
        lines: ['(3 - i)(1 + 2i) = 3 + 6i - i - 2i^2 = 5 + 5i\\ \\checkmark'],
        note: {
          en: 'Lengths divide and angles subtract: $|3 - i| = \\sqrt{10} = \\tfrac{\\sqrt{50}}{\\sqrt5}$.',
          fr: 'Les longueurs se divisent et les angles se soustraient : $|3 - i| = \\sqrt{10} = \\tfrac{\\sqrt{50}}{\\sqrt5}$.',
          es: 'Las longitudes se dividen y los ángulos se restan: $|3 - i| = \\sqrt{10} = \\tfrac{\\sqrt{50}}{\\sqrt5}$.',
          ja: '長さは割り算、角度は引き算になります：$|3 - i| = \\sqrt{10} = \\tfrac{\\sqrt{50}}{\\sqrt5}$。',
          zh: '长度相除，角度相减：$|3 - i| = \\sqrt{10} = \\tfrac{\\sqrt{50}}{\\sqrt5}$。'
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
