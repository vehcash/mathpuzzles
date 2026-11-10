/* calculus · A sum that becomes an area
   A Riemann sum as an integral: (1/n)Σ(k/n)² → ∫₀¹ x² dx = 1/3. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-riemann-squares",
    category: "calculus",
    difficulty: 2,
    title: {
      en: "A sum that becomes an area",
      fr: "Une somme qui devient une aire",
      es: "Una suma que se convierte en área",
      ja: "面積になる和",
      zh: "化为面积的和"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\lim_{n\\to\\infty}\\frac{1^2 + 2^2 + \\dots + n^2}{n^3}$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\lim_{n\\to\\infty}\\frac{1^2 + 2^2 + \\dots + n^2}{n^3}$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\lim_{n\\to\\infty}\\frac{1^2 + 2^2 + \\dots + n^2}{n^3}$?</b>",
      ja: "<b>次のうち $\\displaystyle\\lim_{n\\to\\infty}\\frac{1^2 + 2^2 + \\dots + n^2}{n^3}$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\lim_{n\\to\\infty}\\frac{1^2 + 2^2 + \\dots + n^2}{n^3}$？</b>"
    },
    figureText: {
      en: "Eight thin rectangles under y = x² on [0, 1], each of width 1/n and height (k/n)².",
      fr: "Huit rectangles fins sous y = x² sur [0, 1], de largeur 1/n et de hauteur (k/n)².",
      es: "Ocho rectángulos finos bajo y = x² en [0, 1], de anchura 1/n y altura (k/n)².",
      ja: "[0, 1] 上の y = x² の下にある8本の細い長方形。幅 1/n、高さ (k/n)²。",
      zh: "[0, 1] 上 y = x² 下方的八个细长矩形，宽 1/n，高 (k/n)²。"
    },
    hint: {
      en: "Rewrite it as $\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$.",
      fr: "Réécrivez-la $\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$.",
      es: "Reescríbelo como $\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$.",
      ja: "$\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$ と書き直します。",
      zh: "改写成 $\\frac1n\\sum_{k=1}^n\\left(\\frac kn\\right)^2$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the formula 1² + … + n² = n(n + 1)(2n + 1)/6), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec la formule 1² + … + n² = n(n + 1)(2n + 1)/6), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con la fórmula 1² + … + n² = n(n + 1)(2n + 1)/6), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば公式 1² + … + n² = n(n + 1)(2n + 1)/6 を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用公式 1² + … + n² = n(n + 1)(2n + 1)/6），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 4.8, scale: 54, pad: 18 });
      const T = F.T = axes(F, -0.3, 4.5, -0.3, 4.5);
      const n = 8, s = 4;   // the unit square is drawn 4 × 4
      for (let k = 1; k <= n; k++) { const x0 = (k - 1) / n, h = (k / n) ** 2; F.rect(0.3 + s * x0, 0.3, s / n, s * h, 'fill-blue', 'fills'); F.rect(0.3 + s * x0, 0.3, s / n, s * h, 'seg thin').setAttribute('fill', 'none'); }
      plot(F, T, x => s * (x / s) ** 2, 0, 4.2, 'graph', 'base', -0.3, 4.5);
      F.text(T([4, 0]), '1', 'tick', 0, 14); F.text(T([0, 4]), '1', 'tick', -10, 0);
      return F;
    },
    options: [
      { tex: "\\tfrac13", correct: true, why: {
        en: "$\\tfrac{n(n + 1)(2n + 1)}{6n^3} \\to \\tfrac{2}{6}$.",
        fr: "$\\tfrac{n(n + 1)(2n + 1)}{6n^3} \\to \\tfrac{2}{6}$.",
        es: "$\\tfrac{n(n + 1)(2n + 1)}{6n^3} \\to \\tfrac{2}{6}$.",
        ja: "$\\tfrac{n(n + 1)(2n + 1)}{6n^3} \\to \\tfrac{2}{6}$.",
        zh: "$\\tfrac{n(n + 1)(2n + 1)}{6n^3} \\to \\tfrac{2}{6}$."
      } },
      { tex: "\\int_0^1 x^2\\,dx", correct: true, why: {
        en: "The Riemann sum of $x^2$ with $n$ equal pieces.",
        fr: "La somme de Riemann de $x^2$ avec $n$ morceaux égaux.",
        es: "La suma de Riemann de $x^2$ con $n$ trozos iguales.",
        ja: "$n$ 等分した $x^2$ のリーマン和です。",
        zh: "$x^2$ 分成 $n$ 等份的黎曼和。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "That would be $\\int_0^1 x\\,dx$, for $\\frac{1 + 2 + \\dots + n}{n^2}$.",
        fr: "Ce serait $\\int_0^1 x\\,dx$, pour $\\frac{1 + 2 + \\dots + n}{n^2}$.",
        es: "Sería $\\int_0^1 x\\,dx$, para $\\frac{1 + 2 + \\dots + n}{n^2}$.",
        ja: "それは $\\frac{1 + 2 + \\dots + n}{n^2}$ の極限 $\\int_0^1 x\\,dx$ です。",
        zh: "那是 $\\frac{1 + 2 + \\dots + n}{n^2}$ 的极限 $\\int_0^1 x\\,dx$。"
      } },
      { tex: "0", correct: false, why: {
        en: "Each term tends to $0$, but there are $n$ of them.",
        fr: "Chaque terme tend vers $0$, mais il y en a $n$.",
        es: "Cada término tiende a $0$, pero hay $n$.",
        ja: "各項は $0$ に近づきますが、項が $n$ 個あります。",
        zh: "每一项趋于 $0$，但共有 $n$ 项。"
      } },
      { tex: "1", correct: false, why: {
        en: "The area of the whole unit square, not the area under $x^2$.",
        fr: "L’aire du carré unité entier, pas celle sous $x^2$.",
        es: "El área del cuadrado unidad entero, no la de bajo $x^2$.",
        ja: "単位正方形全体の面積で、$x^2$ の下ではありません。",
        zh: "整个单位正方形的面积，不是 $x^2$ 下方的面积。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "The sum grows like $n^3/3$, exactly as fast as the $n^3$ below.",
        fr: "La somme croît comme $n^3/3$, aussi vite que $n^3$.",
        es: "La suma crece como $n^3/3$, tan rápido como $n^3$.",
        ja: "和は $n^3/3$ のように増え、分母 $n^3$ と同じ速さです。",
        zh: "和按 $n^3/3$ 增长，与分母 $n^3$ 同阶。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "Forgot the factor $2$ in $2n + 1$.",
        fr: "Le facteur $2$ de $2n + 1$ a été oublié.",
        es: "Se olvidó el factor $2$ de $2n + 1$.",
        ja: "$2n + 1$ の係数 $2$ を忘れています。",
        zh: "漏了 $2n + 1$ 中的因子 $2$。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "The area above the curve inside the square.",
        fr: "L’aire au-dessus de la courbe dans le carré.",
        es: "El área por encima de la curva dentro del cuadrado.",
        ja: "正方形のうち曲線より上の面積です。",
        zh: "正方形中曲线上方的面积。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Spot the Riemann sum",
          fr: "Reconnaître la somme de Riemann",
          es: "Reconocer la suma de Riemann",
          ja: "リーマン和を見抜く",
          zh: "识别黎曼和"
        },
        lines: ["\\frac{1}{n^3}\\sum_{k=1}^n k^2 = \\sum_{k=1}^n \\left(\\frac kn\\right)^2\\cdot\\frac1n"],
        note: {
          en: "Height $(k/n)^2$, width $1/n$: the rectangles of the figure.",
          fr: "Hauteur $(k/n)^2$, largeur $1/n$ : les rectangles de la figure.",
          es: "Altura $(k/n)^2$, anchura $1/n$: los rectángulos de la figura.",
          ja: "高さ $(k/n)^2$、幅 $1/n$：図の長方形です。",
          zh: "高 $(k/n)^2$、宽 $1/n$：即图中的矩形。"
        }
      },
      {
        title: {
          en: "Take the limit",
          fr: "Passer à la limite",
          es: "Pasar al límite",
          ja: "極限をとる",
          zh: "取极限"
        },
        lines: ["\\to \\int_0^1 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 = \\boxed{\\tfrac13}"],
        note: {
          en: "Check: $\\frac{n(n + 1)(2n + 1)}{6n^3} \\to \\frac{2}{6} = \\frac13$.",
          fr: "Vérification : $\\frac{n(n + 1)(2n + 1)}{6n^3} \\to \\frac{2}{6} = \\frac13$.",
          es: "Comprobación: $\\frac{n(n + 1)(2n + 1)}{6n^3} \\to \\frac{2}{6} = \\frac13$.",
          ja: "確認：$\\frac{n(n + 1)(2n + 1)}{6n^3} \\to \\frac{2}{6} = \\frac13$。",
          zh: "验证：$\\frac{n(n + 1)(2n + 1)}{6n^3} \\to \\frac{2}{6} = \\frac13$。"
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
