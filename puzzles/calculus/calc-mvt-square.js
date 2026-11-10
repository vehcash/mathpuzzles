/* calculus · The mean value theorem
   Mean value theorem for x² on [1, 3]: f′(c) = 4 gives c = 2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mvt-square",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "The mean value theorem",
      fr: "Le théorème des accroissements finis",
      es: "El teorema del valor medio",
      ja: "平均値の定理",
      zh: "拉格朗日中值定理"
    },
    statement: {
      en: "For $f(x) = x^2$ on $[1, 3]$, <b>which values of $c$ satisfy $f'(c) = \\dfrac{f(3) - f(1)}{3 - 1}$?</b>",
      fr: "Pour $f(x) = x^2$ sur $[1, 3]$, <b>quelles valeurs de $c$ vérifient $f'(c) = \\dfrac{f(3) - f(1)}{3 - 1}$ ?</b>",
      es: "Para $f(x) = x^2$ en $[1, 3]$, <b>¿qué valores de $c$ cumplen $f'(c) = \\dfrac{f(3) - f(1)}{3 - 1}$?</b>",
      ja: "$[1, 3]$ 上の $f(x) = x^2$ について、<b>$f'(c) = \\dfrac{f(3) - f(1)}{3 - 1}$ を満たす $c$ はどれですか？</b>",
      zh: "对 $[1, 3]$ 上的 $f(x) = x^2$，<b>哪些 $c$ 满足 $f'(c) = \\dfrac{f(3) - f(1)}{3 - 1}$？</b>"
    },
    figureText: {
      en: "The parabola y = x² with the chord from (1, 1) to (3, 9) and a parallel tangent line touching at x = 2.",
      fr: "La parabole y = x² avec la corde de (1, 1) à (3, 9) et une tangente parallèle touchant en x = 2.",
      es: "La parábola y = x² con la cuerda de (1, 1) a (3, 9) y una tangente paralela que toca en x = 2.",
      ja: "放物線 y = x²、(1, 1) から (3, 9) への弦、x = 2 で接する平行な接線。",
      zh: "抛物线 y = x²，从 (1, 1) 到 (3, 9) 的弦，以及在 x = 2 处相切的平行切线。"
    },
    hint: {
      en: "The chord has slope $\\tfrac{9 - 1}{2}$. Solve $2c = $ that slope.",
      fr: "La corde a pour pente $\\tfrac{9 - 1}{2}$. Résolvez $2c = $ cette pente.",
      es: "La cuerda tiene pendiente $\\tfrac{9 - 1}{2}$. Resuelve $2c = $ esa pendiente.",
      ja: "弦の傾きは $\\tfrac{9 - 1}{2}$。$2c = $（その傾き）を解きます。",
      zh: "弦的斜率是 $\\tfrac{9 - 1}{2}$。解 $2c = $ 该斜率。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example using the fact that for a parabola the point is always the midpoint), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en utilisant que pour une parabole c’est toujours le milieu), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo usando que en una parábola siempre es el punto medio), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば放物線では常に中点になることを使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如利用抛物线中该点总是区间中点），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 5.4, scale: 42, pad: 18 });
      const T = F.T = axes(F, -0.6, 3.8, -0.5, 4.9);
      const g = x => x * x / 2;   // vertical scale ½
      plot(F, T, g, -0.5, 3.1, 'graph', 'base', -0.5, 4.9);
      F.seg(T([1, 0.5]), T([3, 4.5]), 'seg');
      plot(F, T, x => 2 + 2 * (x - 2), 0.9, 3.1, 'seg thin', 'base', -0.5, 4.9);
      F.dot(T([1, 0.5])); F.dot(T([3, 4.5])); F.dot(T([2, 2]));
      F.text(T([1, 0.5]), '(1, 1)', 'len small', 22, 8); F.text(T([3, 4.5]), '(3, 9)', 'len small', -28, 0);
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$2c = 4 \\Rightarrow c = 2$.",
        fr: "$2c = 4 \\Rightarrow c = 2$.",
        es: "$2c = 4 \\Rightarrow c = 2$.",
        ja: "$2c = 4 \\Rightarrow c = 2$.",
        zh: "$2c = 4 \\Rightarrow c = 2$."
      } },
      { tex: "\\tfrac{1 + 3}{2}", correct: true, why: {
        en: "The midpoint of $[1, 3]$ — for a parabola $c$ is always the midpoint.",
        fr: "Le milieu de $[1, 3]$ — pour une parabole, $c$ est toujours le milieu.",
        es: "El punto medio de $[1, 3]$ — en una parábola $c$ siempre es el punto medio.",
        ja: "$[1, 3]$ の中点。放物線では $c$ は常に中点です。",
        zh: "$[1, 3]$ 的中点——对抛物线 $c$ 总是中点。"
      } },
      { tex: "4", correct: false, why: {
        en: "$4$ is the slope $f'(c)$, not $c$.",
        fr: "$4$ est la pente $f'(c)$, pas $c$.",
        es: "$4$ es la pendiente $f'(c)$, no $c$.",
        ja: "$4$ は傾き $f'(c)$ で、$c$ ではありません。",
        zh: "$4$ 是斜率 $f'(c)$，不是 $c$。"
      } },
      { tex: "\\sqrt5", correct: false, why: {
        en: "Solves $c^2 = \\tfrac{1 + 9}{2}$ — the average value of $f$, not of the slope.",
        fr: "Résout $c^2 = \\tfrac{1 + 9}{2}$ — ce n’est pas la bonne équation.",
        es: "Resuelve $c^2 = \\tfrac{1 + 9}{2}$ — no es la ecuación correcta.",
        ja: "$c^2 = \\tfrac{1 + 9}{2}$ を解いており、方程式が違います。",
        zh: "解的是 $c^2 = \\tfrac{1 + 9}{2}$，方程不对。"
      } },
      { tex: "8", correct: false, why: {
        en: "$f(3) - f(1)$ without dividing by $3 - 1$.",
        fr: "$f(3) - f(1)$ sans diviser par $3 - 1$.",
        es: "$f(3) - f(1)$ sin dividir entre $3 - 1$.",
        ja: "$3 - 1$ で割っていません。",
        zh: "没有除以 $3 - 1$。"
      } },
      { tex: "1", correct: false, why: {
        en: "$f'(1) = 2 \\ne 4$.",
        fr: "$f'(1) = 2 \\ne 4$.",
        es: "$f'(1) = 2 \\ne 4$.",
        ja: "$f'(1) = 2 \\ne 4$。",
        zh: "$f'(1) = 2 \\ne 4$。"
      } },
      { tex: "3", correct: false, why: {
        en: "$f'(3) = 6 \\ne 4$.",
        fr: "$f'(3) = 6 \\ne 4$.",
        es: "$f'(3) = 6 \\ne 4$.",
        ja: "$f'(3) = 6 \\ne 4$。",
        zh: "$f'(3) = 6 \\ne 4$。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "$f'(\\sqrt3) = 2\\sqrt3 \\approx 3.46 \\ne 4$.",
        fr: "$f'(\\sqrt3) = 2\\sqrt3 \\approx 3{,}46 \\ne 4$.",
        es: "$f'(\\sqrt3) = 2\\sqrt3 \\approx 3{,}46 \\ne 4$.",
        ja: "$f'(\\sqrt3) = 2\\sqrt3 \\approx 3.46 \\ne 4$。",
        zh: "$f'(\\sqrt3) = 2\\sqrt3 \\approx 3.46 \\ne 4$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Slope of the chord",
          fr: "Pente de la corde",
          es: "Pendiente de la cuerda",
          ja: "弦の傾き",
          zh: "弦的斜率"
        },
        lines: ["\\frac{f(3) - f(1)}{3 - 1} = \\frac{9 - 1}{2} = 4"],
        note: {
          en: "The theorem promises a tangent parallel to this chord.",
          fr: "Le théorème promet une tangente parallèle à cette corde.",
          es: "El teorema asegura una tangente paralela a esta cuerda.",
          ja: "定理は、この弦に平行な接線の存在を保証します。",
          zh: "定理保证存在与该弦平行的切线。"
        }
      },
      {
        title: {
          en: "Find the point",
          fr: "Trouver le point",
          es: "Encontrar el punto",
          ja: "点を求める",
          zh: "求出该点"
        },
        lines: ["f'(c) = 2c = 4 \\ \\Rightarrow\\ c = \\boxed{2}"],
        note: {
          en: "$2$ lies inside $(1, 3)$, as the theorem requires.",
          fr: "$2$ est bien dans $(1, 3)$, comme le veut le théorème.",
          es: "$2$ está dentro de $(1, 3)$, como exige el teorema.",
          ja: "定理の通り $2$ は $(1, 3)$ の内部にあります。",
          zh: "$2$ 确实在 $(1, 3)$ 内，符合定理要求。"
        },
        fig(F) { F.draw(plot(F, F.T, x => 2 + 2 * (x - 2), 0.9, 3.1, 'hl yellow', 'over', -0.5, 4.9), 700); }
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
