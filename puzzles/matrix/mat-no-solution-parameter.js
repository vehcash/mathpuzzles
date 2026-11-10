/* matrix · Parallel lines never meet
   A 2×2 system has no solution when the determinant is 0 and the equations contradict. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const X0 = -1, X1 = 4, Y0 = -1, Y1 = 3.6;

  PuzzleBank.define({
    id: "mat-no-solution-parameter",
    category: "matrix",
    difficulty: 2,
    title: {
      en: "Parallel lines never meet",
      fr: "Des droites parallèles ne se coupent pas",
      es: "Las paralelas nunca se cortan",
      ja: "平行線は交わらない",
      zh: "平行线永不相交"
    },
    statement: {
      en: "<b>For which value of $k$ does the system $\\begin{cases} x + y = 2 \\\\ 2x + ky = 5 \\end{cases}$ have no solution?</b>",
      fr: "<b>Pour quelle valeur de $k$ le système $\\begin{cases} x + y = 2 \\\\ 2x + ky = 5 \\end{cases}$ n’a-t-il aucune solution ?</b>",
      es: "<b>¿Para qué valor de $k$ el sistema $\\begin{cases} x + y = 2 \\\\ 2x + ky = 5 \\end{cases}$ no tiene solución?</b>",
      ja: "<b>連立方程式 $\\begin{cases} x + y = 2 \\\\ 2x + ky = 5 \\end{cases}$ が解をもたないのは $k$ がいくつのときですか？</b>",
      zh: "<b>$k$ 取何值时，方程组 $\\begin{cases} x + y = 2 \\\\ 2x + ky = 5 \\end{cases}$ 无解？</b>"
    },
    figureText: {
      en: "The lines x + y = 2 and 2x + 2y = 5 (the case k = 2): two parallel lines that never meet.",
      fr: "Les droites x + y = 2 et 2x + 2y = 5 (cas k = 2) : deux parallèles qui ne se coupent jamais.",
      es: "Las rectas x + y = 2 y 2x + 2y = 5 (caso k = 2): dos paralelas que nunca se cortan.",
      ja: "直線 x + y = 2 と 2x + 2y = 5（k = 2 の場合）：決して交わらない2本の平行線。",
      zh: "直线 x + y = 2 和 2x + 2y = 5（k = 2 时）：两条永不相交的平行线。"
    },
    hint: {
      en: "No unique solution needs $\\det\\begin{pmatrix}1&1\\\\2&k\\end{pmatrix} = 0$; then check the right-hand sides.",
      fr: "Pas de solution unique exige $\\det\\begin{pmatrix}1&1\\\\2&k\\end{pmatrix} = 0$ ; vérifiez ensuite les seconds membres.",
      es: "Sin solución única hace falta $\\det\\begin{pmatrix}1&1\\\\2&k\\end{pmatrix} = 0$; luego mira los términos independientes.",
      ja: "解が1つに決まらないのは $\\det\\begin{pmatrix}1&1\\\\2&k\\end{pmatrix} = 0$ のとき。そのあと右辺を確認します。",
      zh: "没有唯一解需要 $\\det\\begin{pmatrix}1&1\\\\2&k\\end{pmatrix} = 0$；再检查右端。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example elimination: subtract twice the first equation from the second), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple par combinaison : retrancher deux fois la première équation de la seconde), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo por reducción: restar dos veces la primera ecuación a la segunda), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば加減法：2つ目の式から1つ目の式の2倍を引く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如消元：第二个方程减去第一个方程的两倍），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: X1 - X0, h: Y1 - Y0, scale: 46, pad: 18 });
      const T = F.T = axes(F, X0, X1, Y0, Y1, { grid: true });
      plot(F, T, x => 2 - x, -1, 3, 'graph');
      const l = plot(F, T, x => 2.5 - x, -1, 3.5); l.style.stroke = '#3b8fbb';
      F.text(T([2.7, -0.7]), 'x + y = 2', 'len it small', -10, 14); F.text(T([0.4, 2.1]), '2x + 2y = 5', 'len it small', 36, -12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "every": { fr: "pour tout", es: "para todo", ja: "すべての", zh: "任意" },
      "but": { fr: "mais", es: "pero", ja: "しかし", zh: "但" },
      "no solution": { fr: "aucune solution", es: "sin solución", ja: "解なし", zh: "无解" }
    },
    options: [
      { tex: "k = 2", correct: true, why: {
        en: "$\\det = k - 2 = 0$, and then $2x + 2y = 4 \\ne 5$.",
        fr: "$\\det = k - 2 = 0$, and then $2x + 2y = 4 \\ne 5$.",
        es: "$\\det = k - 2 = 0$, and then $2x + 2y = 4 \\ne 5$.",
        ja: "$\\det = k - 2 = 0$, and then $2x + 2y = 4 \\ne 5$.",
        zh: "$\\det = k - 2 = 0$, and then $2x + 2y = 4 \\ne 5$."
      } },
      { tex: "k = 0", correct: false, why: {
        en: "$\\det = -2 \\ne 0$: unique solution $x = \\tfrac52$, $y = -\\tfrac12$.",
        fr: "$\\det = -2 \\ne 0$: unique solution $x = \\tfrac52$, $y = -\\tfrac12$.",
        es: "$\\det = -2 \\ne 0$: unique solution $x = \\tfrac52$, $y = -\\tfrac12$.",
        ja: "$\\det = -2 \\ne 0$: unique solution $x = \\tfrac52$, $y = -\\tfrac12$.",
        zh: "$\\det = -2 \\ne 0$: unique solution $x = \\tfrac52$, $y = -\\tfrac12$."
      } },
      { tex: "k = 1", correct: false, why: {
        en: "$\\det = -1 \\ne 0$: unique solution.",
        fr: "$\\det = -1 \\ne 0$ : solution unique.",
        es: "$\\det = -1 \\ne 0$: solución única.",
        ja: "$\\det = -1 \\ne 0$：解はただ1つ。",
        zh: "$\\det = -1 \\ne 0$：唯一解。"
      } },
      { tex: "k = -2", correct: false, why: {
        en: "Sign slip in $\\det = k - 2$.",
        fr: "Erreur de signe dans $\\det = k - 2$.",
        es: "Error de signo en $\\det = k - 2$.",
        ja: "$\\det = k - 2$ の符号ミス。",
        zh: "$\\det = k - 2$ 的符号错误。"
      } },
      { tex: "k = \\tfrac52", correct: false, why: {
        en: "Compares $5$ with $2$ instead of the coefficients.",
        fr: "Compare $5$ et $2$ au lieu des coefficients.",
        es: "Compara $5$ y $2$ en lugar de los coeficientes.",
        ja: "係数ではなく $5$ と $2$ を比べています。",
        zh: "比较了 $5$ 和 $2$ 而不是系数。"
      } },
      { tex: "k = 4", correct: false, why: {
        en: "$\\det = 2 \\ne 0$.",
        fr: "$\\det = 2 \\ne 0$.",
        es: "$\\det = 2 \\ne 0$.",
        ja: "$\\det = 2 \\ne 0$.",
        zh: "$\\det = 2 \\ne 0$."
      } },
      { tex: "k = 5", correct: false, why: {
        en: "$\\det = 3 \\ne 0$.",
        fr: "$\\det = 3 \\ne 0$.",
        es: "$\\det = 3 \\ne 0$.",
        ja: "$\\det = 3 \\ne 0$.",
        zh: "$\\det = 3 \\ne 0$."
      } },
      { tex: "\\text{every } k", correct: false, why: {
        en: "For $k \\ne 2$ the lines cross at exactly one point.",
        fr: "Pour $k \\ne 2$, les droites se coupent en un seul point.",
        es: "Para $k \\ne 2$ las rectas se cortan en un solo punto.",
        ja: "$k \\ne 2$ なら2直線はちょうど1点で交わります。",
        zh: "$k \\ne 2$ 时两直线恰交于一点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Determinant zero",
          fr: "Déterminant nul",
          es: "Determinante cero",
          ja: "行列式が 0",
          zh: "行列式为零"
        },
        lines: ["\\begin{vmatrix} 1 & 1 \\\\ 2 & k \\end{vmatrix} = k - 2 = 0 \\iff k = 2"],
        note: {
          en: "Otherwise there is exactly one solution.",
          fr: "Sinon il y a exactement une solution.",
          es: "Si no, hay exactamente una solución.",
          ja: "それ以外では解はちょうど1つです。",
          zh: "否则恰有一个解。"
        }
      },
      {
        title: {
          en: "Contradiction",
          fr: "Contradiction",
          es: "Contradicción",
          ja: "矛盾",
          zh: "矛盾"
        },
        lines: ["k = 2:\\quad 2\\cdot(x + y) = 4 \\ \\text{but}\\ 2x + 2y = 5", "\\Rightarrow\\ \\text{no solution}"],
        note: {
          en: "Same direction, different lines: parallel. With $5$ replaced by $4$ there would be infinitely many solutions.",
          fr: "Même direction, droites distinctes : parallèles. Avec $4$ au lieu de $5$, il y aurait une infinité de solutions.",
          es: "Misma dirección, rectas distintas: paralelas. Con $4$ en lugar de $5$ habría infinitas soluciones.",
          ja: "同じ向きで別の直線：平行です。$5$ が $4$ なら解は無数にあります。",
          zh: "方向相同但不重合：平行。若把 $5$ 换成 $4$，就有无穷多解。"
        },
        fig(F) { F.draw(plot(F, F.T, x => 2.5 - x, -1, 3.5, 'hl yellow', 'over'), 700); }
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
