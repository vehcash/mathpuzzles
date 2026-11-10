/* trigonometry · Only the tangent is known
   Divide by cos θ to turn an expression in sin and cos into one in tan. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const O = [0, 0], X = [2, 0], Y = [2, 4];

  PuzzleBank.define({
    id: "trig-tan-ratio",
    category: "trigonometry",
    difficulty: 1,
    title: {
      en: "Only the tangent is known",
      fr: "On ne connaît que la tangente",
      es: "Solo se conoce la tangente",
      ja: "わかっているのはタンジェントだけ",
      zh: "只知道正切"
    },
    statement: {
      en: "If $\\tan\\theta = 2$, <b>what is $\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$?</b>",
      fr: "Si $\\tan\\theta = 2$, <b>que vaut $\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$ ?</b>",
      es: "Si $\\tan\\theta = 2$, <b>¿cuánto vale $\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$?</b>",
      ja: "$\\tan\\theta = 2$ のとき、<b>$\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$ はいくらですか？</b>",
      zh: "若 $\\tan\\theta = 2$，<b>$\\dfrac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$ 等于多少？</b>"
    },
    figureText: {
      en: "A right triangle with legs 1 and 2 and hypotenuse √5; the angle θ is opposite the leg 2, so tan θ = 2.",
      fr: "Un triangle rectangle de côtés 1 et 2 et d’hypoténuse √5 ; l’angle θ est opposé au côté 2, donc tan θ = 2.",
      es: "Un triángulo rectángulo de catetos 1 y 2 e hipotenusa √5; el ángulo θ es opuesto al cateto 2, así que tan θ = 2.",
      ja: "直角をはさむ辺が 1 と 2、斜辺が √5 の直角三角形。角 θ の対辺が 2 なので tan θ = 2。",
      zh: "两直角边为 1 和 2、斜边为 √5 的直角三角形；角 θ 的对边为 2，所以 tan θ = 2。"
    },
    hint: {
      en: "Divide numerator and denominator by $\\cos\\theta$.",
      fr: "Divisez numérateur et dénominateur par $\\cos\\theta$.",
      es: "Divide numerador y denominador entre $\\cos\\theta$.",
      ja: "分子と分母を $\\cos\\theta$ で割ります。",
      zh: "分子分母同除以 $\\cos\\theta$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example reading sin θ and cos θ from a right triangle with legs 1 and 2), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en lisant sin θ et cos θ sur un triangle rectangle de côtés 1 et 2), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo leyendo sen θ y cos θ en un triángulo rectángulo de catetos 1 y 2), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば直角をはさむ辺が 1 と 2 の直角三角形から sin θ と cos θ を読み取る）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如从直角边为 1 和 2 的直角三角形中读出 sin θ 和 cos θ），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.6, h: 4, scale: 42, pad: 26 });
      F.path([O, X, Y], 'tri'); F.right(X, [-1, 0], [0, 1], 0.3);
      F.arc(O, 0.6, 0, 63.4, '', 'marks'); F.text([0.75, 0.38], 'θ', 'pt', 6, 0);
      F.text([1, 0], '1', 'len', 0, 16); F.text([2, 2], '2', 'len', 14, 0); F.text([1, 2], '√5', 'len', -16, -4);
      return F;
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{3}{1}$.",
        fr: "$\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{3}{1}$.",
        es: "$\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{3}{1}$.",
        ja: "$\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{3}{1}$.",
        zh: "$\\dfrac{\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{3}{1}$."
      } },
      { tex: "-3", correct: false, why: {
        en: "Swaps the denominator: $\\tfrac{2 + 1}{1 - 2}$.",
        fr: "Dénominateur inversé : $\\tfrac{2 + 1}{1 - 2}$.",
        es: "Denominador al revés: $\\tfrac{2 + 1}{1 - 2}$.",
        ja: "分母が逆です：$\\tfrac{2 + 1}{1 - 2}$。",
        zh: "分母弄反了：$\\tfrac{2 + 1}{1 - 2}$。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "The fraction upside down.",
        fr: "La fraction à l’envers.",
        es: "La fracción al revés.",
        ja: "分数が逆さまです。",
        zh: "分数颠倒了。"
      } },
      { tex: "5", correct: false, why: {
        en: "$\\tan^2\\theta + 1 = 5$ is $\\sec^2\\theta$, not this ratio.",
        fr: "$\\tan^2\\theta + 1 = 5$ vaut $\\tfrac1{\\cos^2\\theta}$, pas ce quotient.",
        es: "$\\tan^2\\theta + 1 = 5$ es $\\tfrac1{\\cos^2\\theta}$, no este cociente.",
        ja: "$\\tan^2\\theta + 1 = 5$ は $\\tfrac1{\\cos^2\\theta}$ で、この比ではありません。",
        zh: "$\\tan^2\\theta + 1 = 5$ 是 $\\tfrac1{\\cos^2\\theta}$，不是这个比值。"
      } },
      { tex: "2", correct: false, why: {
        en: "Just $\\tan\\theta$ again.",
        fr: "Simplement $\\tan\\theta$.",
        es: "Solo $\\tan\\theta$ otra vez.",
        ja: "$\\tan\\theta$ そのものです。",
        zh: "只是 $\\tan\\theta$ 本身。"
      } },
      { tex: "1", correct: false, why: {
        en: "Would need $\\cos\\theta = 0$.",
        fr: "Il faudrait $\\cos\\theta = 0$.",
        es: "Haría falta $\\cos\\theta = 0$.",
        ja: "$\\cos\\theta = 0$ が必要になります。",
        zh: "需要 $\\cos\\theta = 0$。"
      } },
      { tex: "\\tfrac{3}{\\sqrt5}", correct: false, why: {
        en: "That is $\\sin\\theta + \\cos\\theta$ for acute $\\theta$, without dividing.",
        fr: "C’est $\\sin\\theta + \\cos\\theta$ pour $\\theta$ aigu, sans la division.",
        es: "Eso es $\\sin\\theta + \\cos\\theta$ con $\\theta$ agudo, sin dividir.",
        ja: "鋭角 $\\theta$ の $\\sin\\theta + \\cos\\theta$ で、割り算をしていません。",
        zh: "这是锐角 $\\theta$ 时的 $\\sin\\theta + \\cos\\theta$，没有做除法。"
      } },
      { tex: "-\\tfrac13", correct: false, why: {
        en: "Both slips at once: upside down and the sign.",
        fr: "Les deux erreurs à la fois : à l’envers et le signe.",
        es: "Los dos errores a la vez: al revés y el signo.",
        ja: "2つのミスが同時に：逆さまで符号も違います。",
        zh: "两处同时出错：颠倒且符号错。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Divide by cos θ",
          fr: "Diviser par cos θ",
          es: "Dividir entre cos θ",
          ja: "cos θ で割る",
          zh: "除以 cos θ"
        },
        lines: ["\\frac{\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta} = \\frac{\\tan\\theta + 1}{\\tan\\theta - 1}", "= \\frac{2 + 1}{2 - 1} = \\boxed{3}"],
        note: {
          en: "$\\cos\\theta \\ne 0$ because $\\tan\\theta$ exists.",
          fr: "$\\cos\\theta \\ne 0$ puisque $\\tan\\theta$ existe.",
          es: "$\\cos\\theta \\ne 0$ porque $\\tan\\theta$ existe.",
          ja: "$\\tan\\theta$ が存在するので $\\cos\\theta \\ne 0$。",
          zh: "因为 $\\tan\\theta$ 存在，所以 $\\cos\\theta \\ne 0$。"
        }
      },
      {
        title: {
          en: "Check with the triangle",
          fr: "Vérifier avec le triangle",
          es: "Comprobar con el triángulo",
          ja: "三角形で確認",
          zh: "用三角形验证"
        },
        lines: ["\\sin\\theta = \\tfrac{2}{\\sqrt5}, \\quad \\cos\\theta = \\tfrac{1}{\\sqrt5}", "\\frac{3/\\sqrt5}{1/\\sqrt5} = 3\\ \\checkmark"],
        note: {
          en: "If $\\theta$ is in the third quadrant both signs flip, and the ratio is still $3$.",
          fr: "Si $\\theta$ est dans le troisième quadrant, les deux signes changent et le quotient vaut encore $3$.",
          es: "Si $\\theta$ está en el tercer cuadrante cambian los dos signos y el cociente sigue siendo $3$.",
          ja: "$\\theta$ が第3象限でも両方の符号が変わるだけで、比は $3$ のままです。",
          zh: "若 $\\theta$ 在第三象限，两个符号同时改变，比值仍为 $3$。"
        },
        fig(F) { F.draw(F.seg(O, Y, 'hl yellow', 'over'), 600); }
      },
      {
        title: {
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
