/* calculus · An infinitely long region
   ∫₁^∞ dx/x² = 1 converges, unlike ∫₁^∞ dx/x. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => 1 / (x * x);

  PuzzleBank.define({
    id: "calc-improper-inverse-square",
    category: "calculus",
    difficulty: 2,
    title: {
      en: "An infinitely long region",
      fr: "Une région infiniment longue",
      es: "Una región infinitamente larga",
      ja: "無限に長い領域",
      zh: "无限长的区域"
    },
    statement: {
      en: "<b>What is $\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^2}$?</b>",
      fr: "<b>Que vaut $\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^2}$ ?</b>",
      es: "<b>¿Cuánto vale $\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^2}$?</b>",
      ja: "<b>$\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^2}$ の値は何ですか？</b>",
      zh: "<b>$\\displaystyle\\int_1^{\\infty}\\frac{dx}{x^2}$ 等于多少？</b>"
    },
    figureText: {
      en: "The region under y = 1/x² from x = 1 to the right, shaded; it gets thinner and thinner.",
      fr: "La région sous y = 1/x² à partir de x = 1 vers la droite, ombrée ; elle s’amincit sans fin.",
      es: "La región bajo y = 1/x² desde x = 1 hacia la derecha, sombreada; se hace cada vez más fina.",
      ja: "x = 1 から右の y = 1/x² の下の領域が塗られ、どんどん細くなります。",
      zh: "从 x = 1 向右 y = 1/x² 下方的区域被涂色，越来越细。"
    },
    hint: {
      en: "Integrate to $b$, then let $b \\to \\infty$.",
      fr: "Intégrez jusqu’à $b$, puis faites tendre $b$ vers l’infini.",
      es: "Integra hasta $b$ y luego haz $b \\to \\infty$.",
      ja: "$b$ まで積分してから $b \\to \\infty$ とします。",
      zh: "先积分到 $b$，再令 $b \\to \\infty$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example comparing with the sum of 1/n² or with ∫ dx/x), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en comparant avec la somme des 1/n² ou avec ∫ dx/x), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo comparando con la suma de 1/n² o con ∫ dx/x), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 1/n² の和や ∫ dx/x と比べる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如与 1/n² 的和或 ∫ dx/x 比较），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 3.4, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.4, 6.6, -0.3, 3.1);
      const g = x => 2.5 * f(x);   // vertical scale 2.5
      const area = (f, a, b) => { const q = [T([a, 0])]; for (let k = 0; k <= 60; k++) { const x = a + (b - a) * k / 60; q.push(T([x, f(x)])); } q.push(T([b, 0])); return F.path(q, 'fill-yellow', 'fills'); };
      area(g, 1, 6.4); plot(F, T, g, 0.9, 6.4, 'graph', 'base', -0.3, 3.1);
      F.text(T([1, 0]), '1', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$\\left[-\\tfrac1x\\right]_1^b = 1 - \\tfrac1b \\to 1$.",
        fr: "$\\left[-\\tfrac1x\\right]_1^b = 1 - \\tfrac1b \\to 1$.",
        es: "$\\left[-\\tfrac1x\\right]_1^b = 1 - \\tfrac1b \\to 1$.",
        ja: "$\\left[-\\tfrac1x\\right]_1^b = 1 - \\tfrac1b \\to 1$.",
        zh: "$\\left[-\\tfrac1x\\right]_1^b = 1 - \\tfrac1b \\to 1$."
      } },
      { tex: "\\infty", correct: false, why: {
        en: "That happens for $\\int_1^\\infty \\tfrac{dx}{x}$; $\\tfrac1{x^2}$ decays fast enough.",
        fr: "C’est le cas de $\\int_1^\\infty \\tfrac{dx}{x}$ ; $\\tfrac1{x^2}$ décroît assez vite.",
        es: "Eso ocurre con $\\int_1^\\infty \\tfrac{dx}{x}$; $\\tfrac1{x^2}$ decae lo bastante rápido.",
        ja: "それは $\\int_1^\\infty \\tfrac{dx}{x}$ の場合で、$\\tfrac1{x^2}$ は十分速く減少します。",
        zh: "那是 $\\int_1^\\infty \\tfrac{dx}{x}$ 的情况；$\\tfrac1{x^2}$ 衰减得足够快。"
      } },
      { tex: "\\text{the integral diverges}", correct: false, why: {
        en: "It converges: $1 - \\tfrac1b$ has a finite limit.",
        fr: "Elle converge : $1 - \\tfrac1b$ a une limite finie.",
        es: "Converge: $1 - \\tfrac1b$ tiene límite finito.",
        ja: "収束します：$1 - \\tfrac1b$ は有限の極限をもちます。",
        zh: "它收敛：$1 - \\tfrac1b$ 有有限极限。"
      } },
      { tex: "0", correct: false, why: {
        en: "A positive function cannot have zero area.",
        fr: "Une fonction positive ne peut pas avoir une aire nulle.",
        es: "Una función positiva no puede tener área cero.",
        ja: "正の関数の面積は 0 になりません。",
        zh: "正函数的面积不可能为零。"
      } },
      { tex: "-1", correct: false, why: {
        en: "Sign error with $-\\tfrac1x$.",
        fr: "Erreur de signe avec $-\\tfrac1x$.",
        es: "Error de signo con $-\\tfrac1x$.",
        ja: "$-\\tfrac1x$ の符号ミスです。",
        zh: "$-\\tfrac1x$ 的符号错了。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "Used $\\tfrac{x^{-1}}{2}$ instead of $\\tfrac{x^{-1}}{-1}$.",
        fr: "A utilisé $\\tfrac{x^{-1}}{2}$ au lieu de $\\tfrac{x^{-1}}{-1}$.",
        es: "Usó $\\tfrac{x^{-1}}{2}$ en vez de $\\tfrac{x^{-1}}{-1}$.",
        ja: "$\\tfrac{x^{-1}}{-1}$ でなく $\\tfrac{x^{-1}}{2}$ を使っています。",
        zh: "误用 $\\tfrac{x^{-1}}{2}$ 代替 $\\tfrac{x^{-1}}{-1}$。"
      } },
      { tex: "2", correct: false, why: {
        en: "The antiderivative of $x^{-2}$ is $-x^{-1}$, not $-2x^{-1}$.",
        fr: "La primitive de $x^{-2}$ est $-x^{-1}$.",
        es: "La primitiva de $x^{-2}$ es $-x^{-1}$.",
        ja: "$x^{-2}$ の原始関数は $-x^{-1}$ です。",
        zh: "$x^{-2}$ 的原函数是 $-x^{-1}$。"
      } },
      { tex: "\\tfrac{\\pi^2}{6}", correct: false, why: {
        en: "That is $\\sum_{n\\ge1}\\tfrac1{n^2}$, the sum, not the integral.",
        fr: "C’est $\\sum_{n\\ge1}\\tfrac1{n^2}$, la somme, pas l’intégrale.",
        es: "Es $\\sum_{n\\ge1}\\tfrac1{n^2}$, la suma, no la integral.",
        ja: "それは積分でなく和 $\\sum_{n\\ge1}\\tfrac1{n^2}$ です。",
        zh: "那是和 $\\sum_{n\\ge1}\\tfrac1{n^2}$，不是积分。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Integrate up to b",
          fr: "Intégrer jusqu’à b",
          es: "Integrar hasta b",
          ja: "b まで積分",
          zh: "积分到 b"
        },
        lines: ["\\int_1^b \\frac{dx}{x^2} = \\left[-\\frac1x\\right]_1^b = 1 - \\frac1b"],
        note: {
          en: "An improper integral is the limit of ordinary ones.",
          fr: "Une intégrale impropre est une limite d’intégrales ordinaires.",
          es: "Una integral impropia es el límite de integrales ordinarias.",
          ja: "広義積分は普通の積分の極限です。",
          zh: "反常积分是普通积分的极限。"
        }
      },
      {
        title: {
          en: "Let b grow",
          fr: "Faire grandir b",
          es: "Hacer crecer b",
          ja: "b を大きくする",
          zh: "让 b 增大"
        },
        lines: ["\\lim_{b\\to\\infty}\\left(1 - \\frac1b\\right) = \\boxed{1}"],
        note: {
          en: "An infinitely long region can have a finite area.",
          fr: "Une région infiniment longue peut avoir une aire finie.",
          es: "Una región infinitamente larga puede tener área finita.",
          ja: "無限に長い領域でも面積は有限になり得ます。",
          zh: "无限长的区域也可以有有限面积。"
        }
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
