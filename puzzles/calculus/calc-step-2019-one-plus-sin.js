/* calculus · One over one plus sine
   STEP Mathematics I 2019 (Cambridge), Question 3 (i) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-step-2019-one-plus-sin",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "STEP Mathematics I 2019 (Cambridge), Question 3 (i)",
        fr: "STEP Mathématiques I 2019 (Cambridge), question 3 (i)",
        es: "STEP Matemáticas I 2019 (Cambridge), pregunta 3 (i)",
        ja: "STEP 数学 I 2019（ケンブリッジ大学）第3問 (i)",
        zh: "STEP 数学 I 2019（剑桥大学）第 3 题 (i)"
      },
      exams: ["step"]
    },
    difficulty: 3,
    title: {
      en: "One over one plus sine",
      fr: "Un sur un plus sinus",
      es: "Uno entre uno más seno",
      ja: "1 + sin x 分の 1",
      zh: "1 除以 1 加正弦"
    },
    statement: {
      en: "<b>Which of the following equal</b> $\\displaystyle I = \\int_0^{\\pi/4} \\frac{dx}{1+\\sin x}$<b>?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à</b> $\\displaystyle I = \\int_0^{\\pi/4} \\frac{dx}{1+\\sin x}$ <b>?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a</b> $\\displaystyle I = \\int_0^{\\pi/4} \\frac{dx}{1+\\sin x}$<b>?</b>",
      ja: "$\\displaystyle I = \\int_0^{\\pi/4} \\frac{dx}{1+\\sin x}$ <b>に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于</b> $\\displaystyle I = \\int_0^{\\pi/4} \\frac{dx}{1+\\sin x}$<b>？</b>"
    },
    figureText: {
      en: "The graph of y = 1/(1 + sin x) for x from 0 to about π/2: it starts at 1 and decreases. The region under it from x = 0 to x = π/4 is shaded.",
      fr: "Le graphe de y = 1/(1 + sin x) pour x de 0 à environ π/2 : il part de 1 et décroît. La région sous la courbe de x = 0 à x = π/4 est grisée.",
      es: "La gráfica de y = 1/(1 + sen x) para x de 0 a aproximadamente π/2: empieza en 1 y decrece. La región bajo ella de x = 0 a x = π/4 está sombreada.",
      ja: "x が 0 から約 π/2 までの y = 1/(1 + sin x) のグラフ：1 から始まり減少します。x = 0 から x = π/4 までの下の部分に色が付いています。",
      zh: "y = 1/(1 + sin x) 在 x 从 0 到约 π/2 上的图像：从 1 开始递减。x = 0 到 x = π/4 之间曲线下方的区域涂色。"
    },
    hint: {
      en: "Multiply top and bottom by $1-\\sin x$.",
      fr: "Multipliez en haut et en bas par $1-\\sin x$.",
      es: "Multiplica arriba y abajo por $1-\\sin x$.",
      ja: "分母・分子に $1-\\sin x$ を掛けましょう。",
      zh: "分子分母同乘 $1-\\sin x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.2, h: 1.5, scale: 150, pad: 22 });
      const T = axes(F, -0.15, 1.9, -0.12, 1.3);
      const f = x => 1 / (1 + Math.sin(x)), q = Math.PI / 4, pts = [T([0, 0])];
      for (let k = 0; k <= 30; k++) { const x = q * k / 30; pts.push(T([x, f(x)])); } pts.push(T([q, 0]));
      F.path(pts, 'fill-yellow', 'fills');
      plot(F, T, f, 0, 1.75);
      F.seg(T([q, 0]), T([q, f(q)]), 'seg thin');
      F.text(T([q, 0]), 'π/4', 'tick', 0, 12); F.text(T([0, 1]), '1', 'tick', -10, 0); F.text(T([0.35, 0.3]), 'I', 'len it', 0, 0);
      return F;
    },
    options: [
      { tex: "2-\\sqrt2", correct: true, why: {
        en: "$[\\tan x - \\sec x]_0^{\\pi/4} = (1-\\sqrt2)-(0-1)$.",
        fr: "$[\\tan x - \\sec x]_0^{\\pi/4} = (1-\\sqrt2)-(0-1)$.",
        es: "$[\\tan x - \\sec x]_0^{\\pi/4} = (1-\\sqrt2)-(0-1)$.",
        ja: "$[\\tan x - \\sec x]_0^{\\pi/4} = (1-\\sqrt2)-(0-1)$。",
        zh: "$[\\tan x - \\sec x]_0^{\\pi/4} = (1-\\sqrt2)-(0-1)$。"
      } },
      { tex: "\\sqrt2\\,\\tan\\tfrac{\\pi}{8}", correct: true, why: {
        en: "$\\tan\\tfrac{\\pi}{8}=\\sqrt2-1$, so this is $2-\\sqrt2$.",
        fr: "$\\tan\\tfrac{\\pi}{8}=\\sqrt2-1$, donc cela vaut $2-\\sqrt2$.",
        es: "$\\tan\\tfrac{\\pi}{8}=\\sqrt2-1$, así que vale $2-\\sqrt2$.",
        ja: "$\\tan\\tfrac{\\pi}{8}=\\sqrt2-1$ なのでこれは $2-\\sqrt2$。",
        zh: "$\\tan\\tfrac{\\pi}{8}=\\sqrt2-1$，所以等于 $2-\\sqrt2$。"
      } },
      { tex: "\\sqrt2-1", correct: false, why: {
        en: "That is $\\tan\\tfrac{\\pi}{8}\\approx0.414$, not $I\\approx0.586$.",
        fr: "C’est $\\tan\\tfrac{\\pi}{8}\\approx0{,}414$, pas $I\\approx0{,}586$.",
        es: "Es $\\tan\\tfrac{\\pi}{8}\\approx0{,}414$, no $I\\approx0{,}586$.",
        ja: "これは $\\tan\\tfrac{\\pi}{8}\\approx0.414$ で、$I\\approx0.586$ ではない。",
        zh: "这是 $\\tan\\tfrac{\\pi}{8}\\approx0.414$，不是 $I\\approx0.586$。"
      } },
      { tex: "2+\\sqrt2", correct: false, why: {
        en: "Sign slip: $\\sec\\tfrac{\\pi}{4}=\\sqrt2$ is subtracted.",
        fr: "Erreur de signe : $\\sec\\tfrac{\\pi}{4}=\\sqrt2$ se soustrait.",
        es: "Error de signo: $\\sec\\tfrac{\\pi}{4}=\\sqrt2$ se resta.",
        ja: "符号ミス：$\\sec\\tfrac{\\pi}{4}=\\sqrt2$ は引きます。",
        zh: "符号错误：$\\sec\\tfrac{\\pi}{4}=\\sqrt2$ 要减去。"
      } },
      { tex: "\\tfrac{\\pi}{4}", correct: false, why: {
        en: "That would need the integrand to be $1$; it is less than $1$ on $(0,\\tfrac{\\pi}{4}]$.",
        fr: "Il faudrait que la fonction vaille $1$ ; elle est inférieure à $1$ sur $(0,\\tfrac{\\pi}{4}]$.",
        es: "Haría falta que la función valiera $1$; es menor que $1$ en $(0,\\tfrac{\\pi}{4}]$.",
        ja: "被積分関数が $1$ なら成り立つが、$(0,\\tfrac{\\pi}{4}]$ では $1$ より小さい。",
        zh: "需要被积函数为 $1$；在 $(0,\\tfrac{\\pi}{4}]$ 上它小于 $1$。"
      } },
      { tex: "\\ln\\!\\left(1+\\tfrac{\\sqrt2}{2}\\right)", correct: false, why: {
        en: "The integrand is not $\\tfrac{g'}{g}$: the derivative of $1+\\sin x$ is $\\cos x$, not $1$.",
        fr: "La fonction n’est pas $\\tfrac{g'}{g}$ : la dérivée de $1+\\sin x$ est $\\cos x$, pas $1$.",
        es: "La función no es $\\tfrac{g'}{g}$: la derivada de $1+\\sin x$ es $\\cos x$, no $1$.",
        ja: "$\\tfrac{g'}{g}$ の形ではない：$1+\\sin x$ の微分は $\\cos x$ で $1$ ではない。",
        zh: "被积函数不是 $\\tfrac{g'}{g}$：$1+\\sin x$ 的导数是 $\\cos x$，不是 $1$。"
      } },
      { tex: "1-\\tfrac{\\sqrt2}{2}", correct: false, why: {
        en: "$\\approx0.29$: too small; the integrand is above $\\tfrac{1}{1+\\sqrt2/2}\\approx0.59$, so $I>0.46$.",
        fr: "$\\approx0{,}29$ : trop petit ; la fonction dépasse $\\tfrac{1}{1+\\sqrt2/2}\\approx0{,}59$, donc $I>0{,}46$.",
        es: "$\\approx0{,}29$: demasiado pequeño; la función supera $\\tfrac{1}{1+\\sqrt2/2}\\approx0{,}59$, así que $I>0{,}46$.",
        ja: "$\\approx0.29$：小さすぎ。被積分関数は $\\tfrac{1}{1+\\sqrt2/2}\\approx0.59$ 以上なので $I>0.46$。",
        zh: "$\\approx0.29$：太小；被积函数大于 $\\tfrac{1}{1+\\sqrt2/2}\\approx0.59$，所以 $I>0.46$。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
        en: "Larger than $\\tfrac{\\pi}{4}$, which is already an upper bound.",
        fr: "Plus grand que $\\tfrac{\\pi}{4}$, qui est déjà un majorant.",
        es: "Mayor que $\\tfrac{\\pi}{4}$, que ya es una cota superior.",
        ja: "上界である $\\tfrac{\\pi}{4}$ より大きい。",
        zh: "比上界 $\\tfrac{\\pi}{4}$ 还大。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use 1 − sin²x = cos²x",
          fr: "Utiliser 1 − sin²x = cos²x",
          es: "Usar 1 − sen²x = cos²x",
          ja: "1 − sin²x = cos²x を使う",
          zh: "利用 1 − sin²x = cos²x"
        },
        lines: ["\\frac{1}{1+\\sin x}=\\frac{1-\\sin x}{1-\\sin^2 x}=\\frac{1-\\sin x}{\\cos^2 x}=\\sec^2 x-\\sec x\\tan x"],
        note: {
          en: "Both pieces are standard derivatives: $(\\tan x)'=\\sec^2x$ and $(\\sec x)'=\\sec x\\tan x$.",
          fr: "Les deux morceaux sont des dérivées usuelles : $(\\tan x)'=\\sec^2x$ et $(\\sec x)'=\\sec x\\tan x$.",
          es: "Ambas partes son derivadas conocidas: $(\\tan x)'=\\sec^2x$ y $(\\sec x)'=\\sec x\\tan x$.",
          ja: "どちらも基本的な導関数：$(\\tan x)'=\\sec^2x$、$(\\sec x)'=\\sec x\\tan x$。",
          zh: "两部分都是基本导数：$(\\tan x)'=\\sec^2x$，$(\\sec x)'=\\sec x\\tan x$。"
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
        lines: ["I=\\Big[\\tan x-\\sec x\\Big]_0^{\\pi/4}=(1-\\sqrt2)-(0-1)=\\boxed{2-\\sqrt2}\\approx0.586"],
        note: {
          en: "Check: the integrand lies between $0.59$ and $1$ on an interval of length $0.785$, so $0.46<I<0.785$.",
          fr: "Vérification : la fonction est entre $0{,}59$ et $1$ sur un intervalle de longueur $0{,}785$, donc $0{,}46<I<0{,}785$.",
          es: "Comprobación: la función está entre $0{,}59$ y $1$ en un intervalo de longitud $0{,}785$, así que $0{,}46<I<0{,}785$.",
          ja: "確認：長さ $0.785$ の区間で被積分関数は $0.59$ と $1$ の間なので $0.46<I<0.785$。",
          zh: "检验：在长度 $0.785$ 的区间上被积函数介于 $0.59$ 与 $1$ 之间，所以 $0.46<I<0.785$。"
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
          en: "Two options are the same number written in two ways.",
          fr: "Deux options sont le même nombre écrit de deux façons.",
          es: "Dos opciones son el mismo número escrito de dos formas.",
          ja: "2つの選択肢は同じ数の別表記です。",
          zh: "有两个选项是同一个数的两种写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
