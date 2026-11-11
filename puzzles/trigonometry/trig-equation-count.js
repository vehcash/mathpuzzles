/* trigonometry · How many crossings?
   sin 2x = cos x: factor instead of dividing, or solutions are lost. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const PTS = [Math.PI / 6, Math.PI / 2, 5 * Math.PI / 6, 3 * Math.PI / 2];

  PuzzleBank.define({
    id: "trig-equation-count",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "alevel"]
    },
    difficulty: 2,
    title: {
      en: "How many crossings?",
      fr: "Combien de croisements ?",
      es: "¿Cuántos cruces?",
      ja: "交点はいくつ？",
      zh: "有几个交点？"
    },
    statement: {
      en: "<b>How many solutions does $\\sin 2x = \\cos x$ have in $[0, 2\\pi)$?</b>",
      fr: "<b>Combien de solutions l’équation $\\sin 2x = \\cos x$ a-t-elle dans $[0, 2\\pi)$ ?</b>",
      es: "<b>¿Cuántas soluciones tiene $\\sin 2x = \\cos x$ en $[0, 2\\pi)$?</b>",
      ja: "<b>$\\sin 2x = \\cos x$ は $[0, 2\\pi)$ にいくつの解をもちますか？</b>",
      zh: "<b>方程 $\\sin 2x = \\cos x$ 在 $[0, 2\\pi)$ 内有几个解？</b>"
    },
    figureText: {
      en: "The graph of y = cos x on [0, 2π) with π/2, π, 3π/2 and 2π marked. The graph of sin 2x is drawn in the solution.",
      fr: "La courbe de y = cos x sur [0, 2π) avec π/2, π, 3π/2 et 2π marqués. La courbe de sin 2x est tracée dans la solution.",
      es: "La gráfica de y = cos x en [0, 2π) con π/2, π, 3π/2 y 2π marcados. La gráfica de sen 2x se dibuja en la solución.",
      ja: "[0, 2π) の y = cos x のグラフと π/2, π, 3π/2, 2π の目盛り。sin 2x のグラフは解答で描きます。",
      zh: "[0, 2π) 上 y = cos x 的图像，标出 π/2、π、3π/2、2π。sin 2x 的图像在解答中画出。"
    },
    hint: {
      en: "$\\sin 2x = 2\\sin x\\cos x$. Move everything to one side and factor — do not divide by $\\cos x$.",
      fr: "$\\sin 2x = 2\\sin x\\cos x$. Passez tout d’un côté et factorisez — ne divisez pas par $\\cos x$.",
      es: "$\\sin 2x = 2\\sin x\\cos x$. Pasa todo a un lado y factoriza — no dividas entre $\\cos x$.",
      ja: "$\\sin 2x = 2\\sin x\\cos x$。すべて片側に移して因数分解します — $\\cos x$ で割ってはいけません。",
      zh: "$\\sin 2x = 2\\sin x\\cos x$。移项后因式分解 —— 不要除以 $\\cos x$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example sketching both graphs and counting intersections), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en traçant les deux graphes et en comptant les intersections), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo dibujando las dos gráficas y contando los cortes), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば2つのグラフを描いて交点を数える）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如画出两个图像并数交点），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.2, h: 3.4, scale: 46, pad: 18 });
      const T = F.T = axes(F, -0.4, 6.8, -1.5, 1.9);
      const g = plot(F, T, Math.cos, 0, 2 * Math.PI); g.style.stroke = '#3b8fbb';
      F.text(T([6.5, Math.cos(6.5)]), 'cos x', 'len small', 6, -12);
      [[Math.PI / 2, 'π/2'], [Math.PI, 'π'], [1.5 * Math.PI, '3π/2'], [2 * Math.PI, '2π']].forEach(([x, t]) => { F.seg(T([x, -0.08]), T([x, 0.08]), 'seg thin'); F.text(T([x, 0]), t, 'tick', 0, 16); });
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "solutions": { fr: "solutions", es: "soluciones", ja: "個の解", zh: "个解" }
    },
    options: [
      { tex: "4", correct: true, why: {
        en: "$x = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{2}, \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$.",
        fr: "$x = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{2}, \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$.",
        es: "$x = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{2}, \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$.",
        ja: "$x = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{2}, \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$.",
        zh: "$x = \\tfrac{\\pi}{6}, \\tfrac{\\pi}{2}, \\tfrac{5\\pi}{6}, \\tfrac{3\\pi}{2}$."
      } },
      { tex: "2", correct: false, why: {
        en: "Dividing by $\\cos x$ loses $x = \\tfrac{\\pi}{2}$ and $\\tfrac{3\\pi}{2}$.",
        fr: "Diviser par $\\cos x$ fait perdre $x = \\tfrac{\\pi}{2}$ et $\\tfrac{3\\pi}{2}$.",
        es: "Dividir entre $\\cos x$ pierde $x = \\tfrac{\\pi}{2}$ y $\\tfrac{3\\pi}{2}$.",
        ja: "$\\cos x$ で割ると $x = \\tfrac{\\pi}{2}$ と $\\tfrac{3\\pi}{2}$ を失います。",
        zh: "除以 $\\cos x$ 会丢掉 $x = \\tfrac{\\pi}{2}$ 和 $\\tfrac{3\\pi}{2}$。"
      } },
      { tex: "3", correct: false, why: {
        en: "Counts $\\tfrac{\\pi}{2}$ but forgets $\\tfrac{3\\pi}{2}$ (or one of the sine solutions).",
        fr: "Compte $\\tfrac{\\pi}{2}$ mais oublie $\\tfrac{3\\pi}{2}$ (ou une solution du sinus).",
        es: "Cuenta $\\tfrac{\\pi}{2}$ pero olvida $\\tfrac{3\\pi}{2}$ (o una solución del seno).",
        ja: "$\\tfrac{\\pi}{2}$ は数えていますが $\\tfrac{3\\pi}{2}$（または sin の解の1つ）を忘れています。",
        zh: "算了 $\\tfrac{\\pi}{2}$ 却漏了 $\\tfrac{3\\pi}{2}$（或正弦的一个解）。"
      } },
      { tex: "6", correct: false, why: {
        en: "$\\sin x = \\tfrac12$ has only two solutions in one turn.",
        fr: "$\\sin x = \\tfrac12$ n’a que deux solutions sur un tour.",
        es: "$\\sin x = \\tfrac12$ solo tiene dos soluciones en una vuelta.",
        ja: "$\\sin x = \\tfrac12$ の解は1周で2つだけです。",
        zh: "一圈内 $\\sin x = \\tfrac12$ 只有两个解。"
      } },
      { tex: "8", correct: false, why: {
        en: "Double counting, as if the interval were $[0, 4\\pi)$.",
        fr: "Double comptage, comme sur $[0, 4\\pi)$.",
        es: "Cuenta doble, como si el intervalo fuera $[0, 4\\pi)$.",
        ja: "区間が $[0, 4\\pi)$ であるかのように二重に数えています。",
        zh: "重复计数，好像区间是 $[0, 4\\pi)$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Only $x = \\tfrac{\\pi}{6}$.",
        fr: "Seulement $x = \\tfrac{\\pi}{6}$.",
        es: "Solo $x = \\tfrac{\\pi}{6}$.",
        ja: "$x = \\tfrac{\\pi}{6}$ だけです。",
        zh: "只有 $x = \\tfrac{\\pi}{6}$。"
      } },
      { tex: "0", correct: false, why: {
        en: "$x = \\tfrac{\\pi}{2}$ works: both sides are $0$.",
        fr: "$x = \\tfrac{\\pi}{2}$ convient : les deux membres valent $0$.",
        es: "$x = \\tfrac{\\pi}{2}$ funciona: ambos lados valen $0$.",
        ja: "$x = \\tfrac{\\pi}{2}$ で両辺とも $0$ になります。",
        zh: "$x = \\tfrac{\\pi}{2}$ 时两边都为 $0$。"
      } },
      { tex: "5", correct: false, why: {
        en: "No fifth crossing: $x = 0$ gives $0 \\ne 1$.",
        fr: "Pas de cinquième croisement : $x = 0$ donne $0 \\ne 1$.",
        es: "No hay quinto cruce: $x = 0$ da $0 \\ne 1$.",
        ja: "5つ目の交点はありません：$x = 0$ では $0 \\ne 1$。",
        zh: "没有第五个交点：$x = 0$ 时 $0 \\ne 1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["2\\sin x\\cos x - \\cos x = 0", "\\cos x\\,(2\\sin x - 1) = 0"],
        note: {
          en: "A product is zero when one factor is zero.",
          fr: "Un produit est nul quand un facteur est nul.",
          es: "Un producto es cero cuando un factor es cero.",
          ja: "積が 0 になるのは、どちらかの因数が 0 のときです。",
          zh: "乘积为零当且仅当某个因子为零。"
        }
      },
      {
        title: {
          en: "Solve each factor",
          fr: "Résoudre chaque facteur",
          es: "Resolver cada factor",
          ja: "各因数を解く",
          zh: "分别求解"
        },
        lines: ["\\cos x = 0:\\ x = \\tfrac{\\pi}{2},\\ \\tfrac{3\\pi}{2}", "\\sin x = \\tfrac12:\\ x = \\tfrac{\\pi}{6},\\ \\tfrac{5\\pi}{6}", "\\boxed{4} \\text{ solutions}"],
        note: {
          en: "They match the four crossings of the graphs.",
          fr: "Ce sont les quatre croisements des graphes.",
          es: "Coinciden con los cuatro cruces de las gráficas.",
          ja: "グラフの4つの交点と一致します。",
          zh: "正好对应图像的四个交点。"
        },
        fig(F) { F.draw(plot(F, F.T, x => Math.sin(2 * x), 0, 2 * Math.PI, 'graph', 'over'), 900); F.fadeIn(F.text(F.T([0.8, Math.sin(1.6)]), 'sin 2x', 'len small', 0, -14, 'over'), 300, 700); PTS.forEach((x, k) => F.fadeIn(F.circle(F.T([x, Math.cos(x)]), 0.13, 'halo', 'over'), 300, 900 + 200 * k)); }
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
