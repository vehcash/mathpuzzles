/* calculus · Touching the cubic
   Tangent line to y = x³ − 3x at x = 2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x * x * x - 3 * x;

  PuzzleBank.define({
    id: "calc-tangent-cubic",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "Touching the cubic",
      fr: "Toucher la cubique",
      es: "Tocar la cúbica",
      ja: "3次曲線に接する",
      zh: "与三次曲线相切"
    },
    statement: {
      en: "<b>What is the equation of the tangent line to $y = x^3 - 3x$ at the point where $x = 2$?</b>",
      fr: "<b>Quelle est l’équation de la tangente à $y = x^3 - 3x$ au point d’abscisse $x = 2$ ?</b>",
      es: "<b>¿Cuál es la ecuación de la recta tangente a $y = x^3 - 3x$ en el punto con $x = 2$?</b>",
      ja: "<b>$y = x^3 - 3x$ の $x = 2$ における接線の方程式は何ですか？</b>",
      zh: "<b>曲线 $y = x^3 - 3x$ 在 $x = 2$ 处的切线方程是什么？</b>"
    },
    figureText: {
      en: "The cubic y = x³ − 3x with the point (2, 2) on it and the tangent line there.",
      fr: "La cubique y = x³ − 3x avec le point (2, 2) et la tangente en ce point.",
      es: "La cúbica y = x³ − 3x con el punto (2, 2) y la tangente en él.",
      ja: "3次曲線 y = x³ − 3x と、その上の点 (2, 2) での接線。",
      zh: "三次曲线 y = x³ − 3x、其上的点 (2, 2) 以及该点处的切线。"
    },
    hint: {
      en: "Slope $= y'(2)$; then $y - y_0 = m(x - x_0)$.",
      fr: "Pente $= y'(2)$ ; puis $y - y_0 = m(x - x_0)$.",
      es: "Pendiente $= y'(2)$; luego $y - y_0 = m(x - x_0)$.",
      ja: "傾き $= y'(2)$。次に $y - y_0 = m(x - x_0)$。",
      zh: "斜率 $= y'(2)$；再用 $y - y_0 = m(x - x_0)$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example writing y = mx + c and requiring x³ − 3x − (mx + c) to have a double root at x = 2), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en posant y = mx + c et en exigeant que x³ − 3x − (mx + c) ait une racine double en x = 2), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo escribiendo y = mx + c y exigiendo que x³ − 3x − (mx + c) tenga una raíz doble en x = 2), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば y = mx + c とおき、x³ − 3x − (mx + c) が x = 2 を重解にもつ条件を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如设 y = mx + c，要求 x³ − 3x − (mx + c) 在 x = 2 处有二重根），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 7, scale: 30, pad: 18 });
      const T = F.T = axes(F, -2.6, 3.4, -3, 4, { grid: true });
      plot(F, T, f, -2.4, 2.35, 'graph', 'base', -3, 4);
      const t = plot(F, T, x => 9 * x - 16, 1.3, 2.2, 'graph', 'base', -3, 4); t.style.stroke = '#3b8fbb';
      F.dot(T([2, 2])); F.text(T([2, 2]), '(2, 2)', 'len small', -28, -6);
      return F;
    },
    options: [
      { tex: "y = 9x - 16", correct: true, why: {
        en: "$y\\,'(2) = 3\\cdot4 - 3 = 9$ and $y - 2 = 9(x - 2)$.",
        fr: "$y\\,'(2) = 3\\cdot4 - 3 = 9$ and $y - 2 = 9(x - 2)$.",
        es: "$y\\,'(2) = 3\\cdot4 - 3 = 9$ and $y - 2 = 9(x - 2)$.",
        ja: "$y\\,'(2) = 3\\cdot4 - 3 = 9$ and $y - 2 = 9(x - 2)$.",
        zh: "$y\\,'(2) = 3\\cdot4 - 3 = 9$ and $y - 2 = 9(x - 2)$."
      } },
      { tex: "y = 9x + 2", correct: false, why: {
        en: "Forgot to shift: wrote $y - 2 = 9x$.",
        fr: "Oubli du décalage : $y - 2 = 9x$.",
        es: "Olvidó desplazar: $y - 2 = 9x$.",
        ja: "ずらし忘れ：$y - 2 = 9x$。",
        zh: "忘了平移：写成 $y - 2 = 9x$。"
      } },
      { tex: "y = 12x - 22", correct: false, why: {
        en: "Slope $3x^2 = 12$: the $-3$ of the derivative is missing.",
        fr: "Pente $3x^2 = 12$ : il manque le $-3$ de la dérivée.",
        es: "Pendiente $3x^2 = 12$: falta el $-3$ de la derivada.",
        ja: "傾き $3x^2 = 12$：導関数の $-3$ が抜けています。",
        zh: "斜率 $3x^2 = 12$：漏了导数中的 $-3$。"
      } },
      { tex: "y = 9x - 20", correct: false, why: {
        en: "Sign slip: $y + 2 = 9(x - 2)$.",
        fr: "Erreur de signe : $y + 2 = 9(x - 2)$.",
        es: "Error de signo: $y + 2 = 9(x - 2)$.",
        ja: "符号ミス：$y + 2 = 9(x - 2)$。",
        zh: "符号错误：$y + 2 = 9(x - 2)$。"
      } },
      { tex: "y = -\\tfrac19 x + \\tfrac{20}{9}", correct: false, why: {
        en: "That is the normal line, perpendicular to the tangent.",
        fr: "C’est la normale, perpendiculaire à la tangente.",
        es: "Es la recta normal, perpendicular a la tangente.",
        ja: "それは接線に垂直な法線です。",
        zh: "那是法线，与切线垂直。"
      } },
      { tex: "y = 3x - 4", correct: false, why: {
        en: "Passes through $(2, 2)$ but with slope $3$ instead of $y'(2) = 9$.",
        fr: "Passe par $(2, 2)$ mais avec la pente $3$ au lieu de $y'(2) = 9$.",
        es: "Pasa por $(2, 2)$ pero con pendiente $3$ en lugar de $y'(2) = 9$.",
        ja: "$(2, 2)$ を通りますが、傾きが $y'(2) = 9$ ではなく $3$ です。",
        zh: "经过 $(2, 2)$，但斜率是 $3$ 而不是 $y'(2) = 9$。"
      } },
      { tex: "y = 2", correct: false, why: {
        en: "The height at $x = 2$; horizontal tangents occur at $x = \\pm1$.",
        fr: "La hauteur en $x = 2$ ; les tangentes horizontales sont en $x = \\pm1$.",
        es: "La altura en $x = 2$; las tangentes horizontales están en $x = \\pm1$.",
        ja: "$x = 2$ での高さです。水平な接線は $x = \\pm1$ にあります。",
        zh: "$x = 2$ 处的高度；水平切线在 $x = \\pm1$ 处。"
      } },
      { tex: "y = 9x", correct: false, why: {
        en: "Passes through the origin, not through $(2, 2)$.",
        fr: "Passe par l’origine, pas par $(2, 2)$.",
        es: "Pasa por el origen, no por $(2, 2)$.",
        ja: "原点を通り、$(2, 2)$ を通りません。",
        zh: "经过原点，而不经过 $(2, 2)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Point and slope",
          fr: "Point et pente",
          es: "Punto y pendiente",
          ja: "点と傾き",
          zh: "点与斜率"
        },
        lines: ["y(2) = 8 - 6 = 2", "y' = 3x^2 - 3 \\ \\Rightarrow\\ y'(2) = 9"],
        note: {
          en: "The derivative at $x = 2$ is the slope of the tangent.",
          fr: "La dérivée en $x = 2$ est la pente de la tangente.",
          es: "La derivada en $x = 2$ es la pendiente de la tangente.",
          ja: "$x = 2$ での微分係数が接線の傾きです。",
          zh: "$x = 2$ 处的导数就是切线斜率。"
        }
      },
      {
        title: {
          en: "Point–slope form",
          fr: "Équation point–pente",
          es: "Forma punto–pendiente",
          ja: "点傾き形",
          zh: "点斜式"
        },
        lines: ["y - 2 = 9(x - 2) \\ \\Rightarrow\\ \\boxed{y = 9x - 16}"],
        note: {
          en: "Check: at $x = 2$, $9\\cdot2 - 16 = 2$.",
          fr: "Vérification : en $x = 2$, $9\\cdot2 - 16 = 2$.",
          es: "Comprobación: en $x = 2$, $9\\cdot2 - 16 = 2$.",
          ja: "確認：$x = 2$ で $9\\cdot2 - 16 = 2$。",
          zh: "验证：$x = 2$ 时 $9\\cdot2 - 16 = 2$。"
        },
        fig(F) { F.draw(plot(F, F.T, x => 9 * x - 16, 1.3, 2.2, 'hl yellow', 'over', -3, 4), 600); }
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
