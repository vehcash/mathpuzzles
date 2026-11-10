/* calculus · Sine times cosine
   ∫₀^{π/2} sin x cos x dx = 1/2 by substitution u = sin x. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => Math.sin(x) * Math.cos(x);

  PuzzleBank.define({
    id: "calc-int-sin-cos",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "Sine times cosine",
      fr: "Sinus fois cosinus",
      es: "Seno por coseno",
      ja: "sin と cos の積",
      zh: "正弦乘余弦"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$?</b>",
      ja: "<b>次のうち $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos x\\,dx$？</b>"
    },
    figureText: {
      en: "The hump of y = sin x cos x over [0, π/2], with the region under it shaded.",
      fr: "La bosse de y = sin x cos x sur [0, π/2], la région en dessous étant ombrée.",
      es: "La joroba de y = sen x cos x en [0, π/2], con la región bajo ella sombreada.",
      ja: "[0, π/2] 上の y = sin x cos x の山と、その下の塗られた部分。",
      zh: "y = sin x cos x 在 [0, π/2] 上的拱形及其下方涂色区域。"
    },
    hint: {
      en: "Substitute $u = \\sin x$, so $du = \\cos x\\,dx$.",
      fr: "Posez $u = \\sin x$, donc $du = \\cos x\\,dx$.",
      es: "Sustituye $u = \\sin x$, así $du = \\cos x\\,dx$.",
      ja: "$u = \\sin x$ とおくと $du = \\cos x\\,dx$。",
      zh: "令 $u = \\sin x$，则 $du = \\cos x\\,dx$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the identity sin x cos x = ½ sin 2x), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec l’identité sin x cos x = ½ sin 2x), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con la identidad sen x cos x = ½ sen 2x), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば恒等式 sin x cos x = ½ sin 2x を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用恒等式 sin x cos x = ½ sin 2x），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 2.6, scale: 64, pad: 18 });
      const T = F.T = axes(F, -0.3, 2.1, -0.3, 2.3);
      const g = x => 3 * f(x);   // vertical scale ×3
      const area = (f, a, b) => { const q = [T([a, 0])]; for (let k = 0; k <= 60; k++) { const x = a + (b - a) * k / 60; q.push(T([x, f(x)])); } q.push(T([b, 0])); return F.path(q, 'fill-yellow', 'fills'); };
      area(g, 0, Math.PI / 2); plot(F, T, g, 0, Math.PI / 2, 'graph');
      F.text(T([Math.PI / 2, 0]), 'π/2', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$\\left[\\tfrac{\\sin^2 x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
        fr: "$\\left[\\tfrac{\\sin^2 x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
        es: "$\\left[\\tfrac{\\sin^2 x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
        ja: "$\\left[\\tfrac{\\sin^2 x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
        zh: "$\\left[\\tfrac{\\sin^2 x}{2}\\right]_0^{\\pi/2} = \\tfrac12$."
      } },
      { tex: "\\tfrac12\\displaystyle\\int_0^{\\pi/2}\\sin 2x\\,dx", correct: true, why: {
        en: "$\\sin x\\cos x = \\tfrac12\\sin 2x$; the integral of $\\sin 2x$ over this interval is $1$.",
        fr: "$\\sin x\\cos x = \\tfrac12\\sin 2x$ ; l’intégrale de $\\sin 2x$ sur cet intervalle vaut $1$.",
        es: "$\\sin x\\cos x = \\tfrac12\\sin 2x$; la integral de $\\sin 2x$ en este intervalo vale $1$.",
        ja: "$\\sin x\\cos x = \\tfrac12\\sin 2x$。この区間での $\\sin 2x$ の積分は $1$。",
        zh: "$\\sin x\\cos x = \\tfrac12\\sin 2x$；$\\sin 2x$ 在此区间的积分为 $1$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Forgot the $\\tfrac12$ from $\\tfrac{u^2}{2}$.",
        fr: "Le $\\tfrac12$ de $\\tfrac{u^2}{2}$ a été oublié.",
        es: "Se olvidó el $\\tfrac12$ de $\\tfrac{u^2}{2}$.",
        ja: "$\\tfrac{u^2}{2}$ の $\\tfrac12$ を忘れています。",
        zh: "漏了 $\\tfrac{u^2}{2}$ 中的 $\\tfrac12$。"
      } },
      { tex: "0", correct: false, why: {
        en: "The integrand is positive on $\\left(0, \\tfrac{\\pi}{2}\\right)$.",
        fr: "L’intégrande est positive sur $\\left(0, \\tfrac{\\pi}{2}\\right)$.",
        es: "El integrando es positivo en $\\left(0, \\tfrac{\\pi}{2}\\right)$.",
        ja: "被積分関数は $\\left(0, \\tfrac{\\pi}{2}\\right)$ で正です。",
        zh: "被积函数在 $\\left(0, \\tfrac{\\pi}{2}\\right)$ 上为正。"
      } },
      { tex: "-\\tfrac12", correct: false, why: {
        en: "A positive area cannot be negative; sign error with $-\\tfrac{\\cos^2 x}{2}$.",
        fr: "Une aire positive n’est pas négative ; erreur de signe avec $-\\tfrac{\\cos^2 x}{2}$.",
        es: "Un área positiva no es negativa; error de signo con $-\\tfrac{\\cos^2 x}{2}$.",
        ja: "正の面積は負になりません。$-\\tfrac{\\cos^2 x}{2}$ で符号ミス。",
        zh: "正面积不会为负；$-\\tfrac{\\cos^2 x}{2}$ 符号出错。"
      } },
      { tex: "\\tfrac{\\pi}{4}", correct: false, why: {
        en: "$\\tfrac\\pi4$ is half the width of the interval, not the area.",
        fr: "$\\tfrac\\pi4$ est la moitié de la largeur, pas l’aire.",
        es: "$\\tfrac\\pi4$ es la mitad de la anchura, no el área.",
        ja: "$\\tfrac\\pi4$ は区間の幅の半分で、面積ではありません。",
        zh: "$\\tfrac\\pi4$ 是区间宽度的一半，不是面积。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "Halved twice: $\\tfrac12\\sin 2x$ integrates to $\\tfrac12\\cdot1$.",
        fr: "Divisé deux fois : $\\tfrac12\\sin 2x$ donne $\\tfrac12\\cdot1$.",
        es: "Dividido dos veces: $\\tfrac12\\sin 2x$ da $\\tfrac12\\cdot1$.",
        ja: "2回半分にしています：$\\tfrac12\\sin 2x$ の積分は $\\tfrac12\\cdot1$。",
        zh: "减半了两次：$\\tfrac12\\sin 2x$ 的积分为 $\\tfrac12\\cdot1$。"
      } },
      { tex: "2", correct: false, why: {
        en: "$\\int_0^{\\pi}\\sin x\\,dx = 2$ is a different integral.",
        fr: "$\\int_0^{\\pi}\\sin x\\,dx = 2$ est une autre intégrale.",
        es: "$\\int_0^{\\pi}\\sin x\\,dx = 2$ es otra integral.",
        ja: "$\\int_0^{\\pi}\\sin x\\,dx = 2$ は別の積分です。",
        zh: "$\\int_0^{\\pi}\\sin x\\,dx = 2$ 是另一个积分。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Changer de variable",
          es: "Cambiar de variable",
          ja: "置換する",
          zh: "换元"
        },
        lines: ["u = \\sin x, \\quad du = \\cos x\\,dx, \\quad x: 0 \\to \\tfrac{\\pi}{2} \\ \\Rightarrow\\ u: 0 \\to 1"],
        note: {
          en: "The limits change with the variable.",
          fr: "Les bornes changent avec la variable.",
          es: "Los límites cambian con la variable.",
          ja: "積分区間も変数とともに変わります。",
          zh: "积分限随变量一起改变。"
        }
      },
      {
        title: {
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分する",
          zh: "积分"
        },
        lines: ["\\int_0^1 u\\,du = \\left[\\frac{u^2}{2}\\right]_0^1 = \\boxed{\\tfrac12}"],
        note: {
          en: "Same result from $\\tfrac12\\int_0^{\\pi/2}\\sin 2x\\,dx = \\tfrac12\\left[-\\tfrac{\\cos 2x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
          fr: "Même résultat avec $\\tfrac12\\int_0^{\\pi/2}\\sin 2x\\,dx = \\tfrac12\\left[-\\tfrac{\\cos 2x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
          es: "El mismo resultado con $\\tfrac12\\int_0^{\\pi/2}\\sin 2x\\,dx = \\tfrac12\\left[-\\tfrac{\\cos 2x}{2}\\right]_0^{\\pi/2} = \\tfrac12$.",
          ja: "$\\tfrac12\\int_0^{\\pi/2}\\sin 2x\\,dx = \\tfrac12\\left[-\\tfrac{\\cos 2x}{2}\\right]_0^{\\pi/2} = \\tfrac12$ でも同じ結果。",
          zh: "用 $\\tfrac12\\int_0^{\\pi/2}\\sin 2x\\,dx = \\tfrac12\\left[-\\tfrac{\\cos 2x}{2}\\right]_0^{\\pi/2} = \\tfrac12$ 结果相同。"
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
