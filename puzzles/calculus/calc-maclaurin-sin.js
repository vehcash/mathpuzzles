/* calculus · The cubic term of sine
   Maclaurin series of sin x: the coefficient of x³ is −1/3! = −1/6. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-maclaurin-sin",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "The cubic term of sine",
      fr: "Le terme cubique du sinus",
      es: "El término cúbico del seno",
      ja: "sin の3次の項",
      zh: "正弦的三次项"
    },
    statement: {
      en: "<b>Which of the following equal the coefficient of $x^3$ in the Maclaurin series of $\\sin x$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au coefficient de $x^3$ dans le développement de Maclaurin de $\\sin x$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al coeficiente de $x^3$ en la serie de Maclaurin de $\\sin x$?</b>",
      ja: "<b>次のうち $\\sin x$ のマクローリン展開における $x^3$ の係数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\sin x$ 的麦克劳林级数中 $x^3$ 的系数？</b>"
    },
    figureText: {
      en: "The graphs of sin x, of the line y = x and of the cubic x − x³/6 near the origin; the cubic hugs the sine much longer.",
      fr: "Les graphes de sin x, de la droite y = x et de la cubique x − x³/6 près de l’origine ; la cubique colle au sinus bien plus longtemps.",
      es: "Las gráficas de sen x, de la recta y = x y de la cúbica x − x³/6 cerca del origen; la cúbica se pega al seno mucho más tiempo.",
      ja: "原点付近の sin x、直線 y = x、3次式 x − x³/6 のグラフ。3次式の方がずっと長く sin に沿います。",
      zh: "原点附近 sin x、直线 y = x 和三次式 x − x³/6 的图像；三次式贴合正弦的范围长得多。"
    },
    hint: {
      en: "The coefficient of $x^n$ is $\\dfrac{f^{(n)}(0)}{n!}$.",
      fr: "Le coefficient de $x^n$ est $\\dfrac{f^{(n)}(0)}{n!}$.",
      es: "El coeficiente de $x^n$ es $\\dfrac{f^{(n)}(0)}{n!}$.",
      ja: "$x^n$ の係数は $\\dfrac{f^{(n)}(0)}{n!}$。",
      zh: "$x^n$ 的系数是 $\\dfrac{f^{(n)}(0)}{n!}$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example integrating the series of cos x term by term), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en intégrant terme à terme le développement de cos x), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo integrando término a término la serie de cos x), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば cos x の級数を項別積分する）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如逐项积分 cos x 的级数），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 4.4, scale: 40, pad: 18 });
      const T = F.T = axes(F, -3.7, 3.7, -2.2, 2.2);
      plot(F, T, x => x, -2.2, 2.2, 'seg thin');
      plot(F, T, x => x - x ** 3 / 6, -3.6, 3.6, 'seg', 'base', -2.2, 2.2).setAttribute('fill', 'none');
      plot(F, T, Math.sin, -3.6, 3.6, 'graph');
      F.text(T([2.2, 1.05]), 'sin x', 'len small', 8, -12); F.text(T([2.9, -1.2]), 'x − x³/6', 'len small', -30, 0);
      return F;
    },
    options: [
      { tex: "-\\tfrac16", correct: true, why: {
        en: "$\\sin x = x - \\tfrac{x^3}{6} + \\tfrac{x^5}{120} - \\dots$",
        fr: "$\\sin x = x - \\tfrac{x^3}{6} + \\tfrac{x^5}{120} - \\dots$",
        es: "$\\sin x = x - \\tfrac{x^3}{6} + \\tfrac{x^5}{120} - \\dots$",
        ja: "$\\sin x = x - \\tfrac{x^3}{6} + \\tfrac{x^5}{120} - \\dots$",
        zh: "$\\sin x = x - \\tfrac{x^3}{6} + \\tfrac{x^5}{120} - \\dots$"
      } },
      { tex: "-\\tfrac{1}{3!}", correct: true, why: {
        en: "$f'''(0) = -\\cos 0 = -1$, divided by $3!$.",
        fr: "$f'''(0) = -\\cos 0 = -1$, divisé par $3!$.",
        es: "$f'''(0) = -\\cos 0 = -1$, dividido entre $3!$.",
        ja: "$f'''(0) = -\\cos 0 = -1$ を $3!$ で割ったもの。",
        zh: "$f'''(0) = -\\cos 0 = -1$，再除以 $3!$。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "The sign alternates: the $x^3$ term is negative.",
        fr: "Les signes alternent : le terme en $x^3$ est négatif.",
        es: "Los signos alternan: el término en $x^3$ es negativo.",
        ja: "符号は交互に変わり、$x^3$ の項は負です。",
        zh: "符号交替：$x^3$ 项为负。"
      } },
      { tex: "-\\tfrac13", correct: false, why: {
        en: "Divided by $3$ instead of $3! = 6$.",
        fr: "Divisé par $3$ au lieu de $3! = 6$.",
        es: "Dividido entre $3$ en vez de $3! = 6$.",
        ja: "$3! = 6$ でなく $3$ で割っています。",
        zh: "除以 $3$ 而不是 $3! = 6$。"
      } },
      { tex: "-1", correct: false, why: {
        en: "That is $f'''(0)$ before dividing by $3!$.",
        fr: "C’est $f'''(0)$ avant la division par $3!$.",
        es: "Es $f'''(0)$ antes de dividir entre $3!$.",
        ja: "$3!$ で割る前の $f'''(0)$ です。",
        zh: "那是除以 $3!$ 之前的 $f'''(0)$。"
      } },
      { tex: "0", correct: false, why: {
        en: "Only the even powers vanish for $\\sin x$.",
        fr: "Pour $\\sin x$, seules les puissances paires s’annulent.",
        es: "Para $\\sin x$ solo se anulan las potencias pares.",
        ja: "$\\sin x$ で消えるのは偶数乗だけです。",
        zh: "$\\sin x$ 只有偶次项为零。"
      } },
      { tex: "1", correct: false, why: {
        en: "$1$ is the coefficient of $x$.",
        fr: "$1$ est le coefficient de $x$.",
        es: "$1$ es el coeficiente de $x$.",
        ja: "$1$ は $x$ の係数です。",
        zh: "$1$ 是 $x$ 的系数。"
      } },
      { tex: "-\\tfrac12", correct: false, why: {
        en: "$-\\tfrac12$ belongs to $x^2$ in the series of $\\cos x$.",
        fr: "$-\\tfrac12$ est le coefficient de $x^2$ dans celui de $\\cos x$.",
        es: "$-\\tfrac12$ es el de $x^2$ en la serie de $\\cos x$.",
        ja: "$-\\tfrac12$ は $\\cos x$ の級数の $x^2$ の係数です。",
        zh: "$-\\tfrac12$ 是 $\\cos x$ 级数中 $x^2$ 的系数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Derivatives at 0",
          fr: "Dérivées en 0",
          es: "Derivadas en 0",
          ja: "0 での導関数",
          zh: "0 处的各阶导数"
        },
        lines: ["\\sin 0 = 0, \\quad \\cos 0 = 1, \\quad -\\sin 0 = 0, \\quad -\\cos 0 = -1"],
        note: {
          en: "$f, f', f'', f'''$ at $0$ cycle through $0, 1, 0, -1$.",
          fr: "$f, f', f'', f'''$ en $0$ valent $0, 1, 0, -1$.",
          es: "$f, f', f'', f'''$ en $0$ valen $0, 1, 0, -1$.",
          ja: "$0$ での $f, f', f'', f'''$ は $0, 1, 0, -1$。",
          zh: "$f, f', f'', f'''$ 在 $0$ 处依次为 $0, 1, 0, -1$。"
        }
      },
      {
        title: {
          en: "The coefficient",
          fr: "Le coefficient",
          es: "El coeficiente",
          ja: "係数",
          zh: "系数"
        },
        lines: ["\\frac{f'''(0)}{3!} = \\frac{-1}{6} = \\boxed{-\\tfrac16}"],
        note: {
          en: "With this term, $x - \\tfrac{x^3}{6}$ follows $\\sin x$ much further from $0$ than the line $y = x$.",
          fr: "Avec ce terme, $x - \\tfrac{x^3}{6}$ suit $\\sin x$ bien plus loin que la droite $y = x$.",
          es: "Con este término, $x - \\tfrac{x^3}{6}$ sigue a $\\sin x$ mucho más lejos que la recta $y = x$.",
          ja: "この項を加えた $x - \\tfrac{x^3}{6}$ は直線 $y = x$ よりずっと遠くまで $\\sin x$ に沿います。",
          zh: "加上这一项，$x - \\tfrac{x^3}{6}$ 比直线 $y = x$ 在更大范围内贴合 $\\sin x$。"
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
