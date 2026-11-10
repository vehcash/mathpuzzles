/* calculus · The slope of a circle
   Implicit differentiation on x² + y² = 25: dy/dx = −x/y = −3/4 at (3, 4). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-implicit-circle",
    category: "calculus",
    difficulty: 1,
    title: {
      en: "The slope of a circle",
      fr: "La pente d’un cercle",
      es: "La pendiente de una circunferencia",
      ja: "円の接線の傾き",
      zh: "圆的切线斜率"
    },
    statement: {
      en: "On the circle $x^2 + y^2 = 25$, <b>which of the following equal the slope $\\dfrac{dy}{dx}$ at the point $(3, 4)$?</b>",
      fr: "Sur le cercle $x^2 + y^2 = 25$, <b>lesquelles des valeurs suivantes sont égales à la pente $\\dfrac{dy}{dx}$ au point $(3, 4)$ ?</b>",
      es: "En la circunferencia $x^2 + y^2 = 25$, <b>¿cuáles de los siguientes son iguales a la pendiente $\\dfrac{dy}{dx}$ en el punto $(3, 4)$?</b>",
      ja: "円 $x^2 + y^2 = 25$ 上で、<b>点 $(3, 4)$ での傾き $\\dfrac{dy}{dx}$ に等しいものはどれですか？</b>",
      zh: "在圆 $x^2 + y^2 = 25$ 上，<b>下列哪些等于点 $(3, 4)$ 处的斜率 $\\dfrac{dy}{dx}$？</b>"
    },
    figureText: {
      en: "The circle of radius 5 with the radius to (3, 4) and the tangent line there, perpendicular to the radius.",
      fr: "Le cercle de rayon 5 avec le rayon vers (3, 4) et la tangente en ce point, perpendiculaire au rayon.",
      es: "La circunferencia de radio 5 con el radio hasta (3, 4) y la tangente allí, perpendicular al radio.",
      ja: "半径 5 の円、(3, 4) への半径、そこでの半径に垂直な接線。",
      zh: "半径为 5 的圆、到 (3, 4) 的半径以及该点处垂直于半径的切线。"
    },
    hint: {
      en: "Differentiate both sides with respect to $x$; remember $y$ depends on $x$.",
      fr: "Dérivez les deux membres par rapport à $x$ ; $y$ dépend de $x$.",
      es: "Deriva ambos lados respecto de $x$; $y$ depende de $x$.",
      ja: "両辺を $x$ で微分します。$y$ は $x$ の関数です。",
      zh: "两边对 $x$ 求导；注意 $y$ 是 $x$ 的函数。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example writing y = √(25 − x²) and differentiating directly, or using that the tangent is perpendicular to the radius), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en écrivant y = √(25 − x²), ou en utilisant que la tangente est perpendiculaire au rayon), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo escribiendo y = √(25 − x²), o usando que la tangente es perpendicular al radio), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば y = √(25 − x²) として直接微分する、または接線が半径に垂直であることを使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如写成 y = √(25 − x²) 直接求导，或利用切线垂直于半径），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 12.6, h: 12.6, scale: 17, pad: 18 });
      const T = F.T = axes(F, -6, 6.6, -6, 6.6);
      F.circle(T([0, 0]), 5, 'seg').setAttribute('fill', 'none');
      F.seg(T([0, 0]), T([3, 4]), 'seg thin');
      F.seg(T([3 - 4 * 0.75, 4 + 3 * 0.75]), T([3 + 4 * 0.6, 4 - 3 * 0.6]), 'seg');
      F.dot(T([3, 4])); F.text(T([3, 4]), '(3, 4)', 'len small', 22, -8);
      return F;
    },
    options: [
      { tex: "-\\tfrac34", correct: true, why: {
        en: "$-\\tfrac{x}{y} = -\\tfrac34$.",
        fr: "$-\\tfrac{x}{y} = -\\tfrac34$.",
        es: "$-\\tfrac{x}{y} = -\\tfrac34$.",
        ja: "$-\\tfrac{x}{y} = -\\tfrac34$.",
        zh: "$-\\tfrac{x}{y} = -\\tfrac34$."
      } },
      { tex: "-\\left.\\tfrac{x}{y}\\right|_{(3,\\,4)}", correct: true, why: {
        en: "The implicit derivative, evaluated at the point.",
        fr: "La dérivée implicite, évaluée au point.",
        es: "La derivada implícita, evaluada en el punto.",
        ja: "陰関数の微分を点で評価したもの。",
        zh: "隐函数导数在该点的值。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "That is the slope of the radius, not of the tangent.",
        fr: "C’est la pente du rayon, pas de la tangente.",
        es: "Es la pendiente del radio, no de la tangente.",
        ja: "それは半径の傾きで、接線の傾きではありません。",
        zh: "那是半径的斜率，不是切线的斜率。"
      } },
      { tex: "-\\tfrac43", correct: false, why: {
        en: "Inverted: it should be $-\\tfrac{x}{y}$, not $-\\tfrac{y}{x}$.",
        fr: "Inversé : c’est $-\\tfrac{x}{y}$, pas $-\\tfrac{y}{x}$.",
        es: "Invertido: es $-\\tfrac{x}{y}$, no $-\\tfrac{y}{x}$.",
        ja: "逆です：$-\\tfrac{y}{x}$ でなく $-\\tfrac{x}{y}$。",
        zh: "颠倒了：应为 $-\\tfrac{x}{y}$，不是 $-\\tfrac{y}{x}$。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "The tangent goes down to the right: the slope is negative.",
        fr: "La tangente descend vers la droite : la pente est négative.",
        es: "La tangente baja hacia la derecha: la pendiente es negativa.",
        ja: "接線は右下がりなので傾きは負です。",
        zh: "切线向右下倾斜：斜率为负。"
      } },
      { tex: "0", correct: false, why: {
        en: "Horizontal tangents occur only at $(0, \\pm5)$.",
        fr: "Les tangentes horizontales ne sont qu’en $(0, \\pm5)$.",
        es: "Las tangentes horizontales solo están en $(0, \\pm5)$.",
        ja: "水平な接線は $(0, \\pm5)$ だけです。",
        zh: "水平切线只在 $(0, \\pm5)$ 处。"
      } },
      { tex: "-1", correct: false, why: {
        en: "Slope $-1$ happens at $\\left(\\tfrac{5}{\\sqrt2}, \\tfrac{5}{\\sqrt2}\\right)$.",
        fr: "La pente $-1$ est atteinte en $\\left(\\tfrac{5}{\\sqrt2}, \\tfrac{5}{\\sqrt2}\\right)$.",
        es: "La pendiente $-1$ ocurre en $\\left(\\tfrac{5}{\\sqrt2}, \\tfrac{5}{\\sqrt2}\\right)$.",
        ja: "傾き $-1$ は $\\left(\\tfrac{5}{\\sqrt2}, \\tfrac{5}{\\sqrt2}\\right)$ です。",
        zh: "斜率 $-1$ 出现在 $\\left(\\tfrac{5}{\\sqrt2}, \\tfrac{5}{\\sqrt2}\\right)$。"
      } },
      { tex: "-\\tfrac{6}{8}\\cdot 2", correct: false, why: {
        en: "$2x + 2y\\,y' = 0$: the $2$’s cancel, giving $-\\tfrac34$, not $-\\tfrac32$.",
        fr: "$2x + 2y\\,y' = 0$ : les $2$ se simplifient, d’où $-\\tfrac34$.",
        es: "$2x + 2y\\,y' = 0$: los $2$ se cancelan y da $-\\tfrac34$.",
        ja: "$2x + 2y\\,y' = 0$ で $2$ が約分され $-\\tfrac34$。",
        zh: "$2x + 2y\\,y' = 0$ 中 $2$ 约掉，得 $-\\tfrac34$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Differentiate implicitly",
          fr: "Dériver implicitement",
          es: "Derivar implícitamente",
          ja: "陰関数微分",
          zh: "隐函数求导"
        },
        lines: ["2x + 2y\\,\\frac{dy}{dx} = 0 \\ \\Rightarrow\\ \\frac{dy}{dx} = -\\frac{x}{y}"],
        note: {
          en: "By the chain rule, $\\tfrac{d}{dx}y^2 = 2y\\,\\tfrac{dy}{dx}$.",
          fr: "Par dérivation composée, $\\tfrac{d}{dx}y^2 = 2y\\,\\tfrac{dy}{dx}$.",
          es: "Por la regla de la cadena, $\\tfrac{d}{dx}y^2 = 2y\\,\\tfrac{dy}{dx}$.",
          ja: "合成関数の微分で $\\tfrac{d}{dx}y^2 = 2y\\,\\tfrac{dy}{dx}$。",
          zh: "由链式法则 $\\tfrac{d}{dx}y^2 = 2y\\,\\tfrac{dy}{dx}$。"
        }
      },
      {
        title: {
          en: "At the point (3, 4)",
          fr: "Au point (3, 4)",
          es: "En el punto (3, 4)",
          ja: "点 (3, 4) で",
          zh: "在点 (3, 4) 处"
        },
        lines: ["\\frac{dy}{dx} = \\boxed{-\\tfrac34}"],
        note: {
          en: "The radius has slope $\\tfrac43$, and $\\tfrac43\\cdot\\left(-\\tfrac34\\right) = -1$: perpendicular, as it should be.",
          fr: "Le rayon a pour pente $\\tfrac43$, et $\\tfrac43\\cdot\\left(-\\tfrac34\\right) = -1$ : perpendiculaires, comme prévu.",
          es: "El radio tiene pendiente $\\tfrac43$ y $\\tfrac43\\cdot\\left(-\\tfrac34\\right) = -1$: perpendiculares, como debe ser.",
          ja: "半径の傾きは $\\tfrac43$ で、$\\tfrac43\\cdot\\left(-\\tfrac34\\right) = -1$：予想通り垂直です。",
          zh: "半径斜率为 $\\tfrac43$，$\\tfrac43\\cdot\\left(-\\tfrac34\\right) = -1$：两者垂直，正如预期。"
        },
        fig(F) { F.draw(F.seg(F.T([0, 4 + 3 * 0.75]), F.T([5.4, 4 - 3 * 0.6]), 'hl yellow', 'over'), 700); }
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
