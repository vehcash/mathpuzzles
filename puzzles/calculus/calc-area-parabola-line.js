/* calculus · Between a line and a parabola
   Area between y = 2x and y = x² from 0 to 2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-area-parabola-line",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "classic",
      note: {
        en: "Archimedes, <i>Quadrature of the Parabola</i> (3rd century BC), the first known computation of the area of a parabolic segment.",
        fr: "Archimède, <i>La Quadrature de la parabole</i> (IIIᵉ siècle av. J.-C.), premier calcul connu de l’aire d’un segment de parabole.",
        es: "Arquímedes, <i>La cuadratura de la parábola</i> (siglo III a. C.), el primer cálculo conocido del área de un segmento parabólico.",
        ja: "アルキメデス『放物線の求積』（紀元前3世紀）。放物線の切片の面積を求めた最古の記録。",
        zh: "阿基米德《抛物线求积》（公元前3世纪），已知最早的抛物线弓形面积计算。"
      },
      exams: ["kyotsu", "ap", "ebau", "alevel"]
    },
    difficulty: 2,
    title: {
      en: "Between a line and a parabola",
      fr: "Entre une droite et une parabole",
      es: "Entre una recta y una parábola",
      ja: "直線と放物線の間",
      zh: "直线与抛物线之间"
    },
    statement: {
      en: "<b>Which of the following equal the area of the region enclosed by $y = x^2$ and $y = 2x$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à l’aire du domaine délimité par $y = x^2$ et $y = 2x$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al área de la región encerrada por $y = x^2$ e $y = 2x$?</b>",
      ja: "<b>次のうち $y = x^2$ と $y = 2x$ で囲まれた部分の面積に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $y = x^2$ 与 $y = 2x$ 所围区域的面积？</b>"
    },
    figureText: {
      en: "The parabola y = x² and the line y = 2x meeting at (0, 0) and (2, 4); the region between them is shaded.",
      fr: "La parabole y = x² et la droite y = 2x qui se coupent en (0, 0) et (2, 4) ; la région entre elles est grisée.",
      es: "La parábola y = x² y la recta y = 2x que se cortan en (0, 0) y (2, 4); la región entre ellas está sombreada.",
      ja: "放物線 y = x² と直線 y = 2x は (0, 0) と (2, 4) で交わり、その間の部分に色が付いています。",
      zh: "抛物线 y = x² 与直线 y = 2x 交于 (0, 0) 和 (2, 4)；两者之间的区域涂有阴影。"
    },
    hint: {
      en: "Find where they meet, then integrate (top − bottom).",
      fr: "Trouvez les points d’intersection, puis intégrez (haut − bas).",
      es: "Halla dónde se cortan e integra (arriba − abajo).",
      ja: "交点を求め、（上 − 下）を積分します。",
      zh: "先求交点，再对（上 − 下）积分。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the formula |a|(β − α)³/6 for the area between a parabola and a chord), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple la formule |a|(β − α)³/6 pour l’aire entre une parabole et une corde), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo la fórmula |a|(β − α)³/6 para el área entre una parábola y una cuerda), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば放物線と弦で囲まれた面積の公式 |a|(β − α)³/6 を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如抛物线与弦所围面积公式 |a|(β − α)³/6），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 5.6, scale: 44, pad: 18 });
      const T = F.T = axes(F, -1, 3.6, -0.8, 4.8, { grid: true });
      const pts = []; for (let k = 0; k <= 40; k++) { const x = 2 * k / 40; pts.push(T([x, x * x])); } pts.push(T([2, 4]));
      F.path(pts.concat([T([0, 0])]), 'fill-yellow', 'fills');
      plot(F, T, x => x * x, -0.9, 2.2, 'graph', 'base', -1, 4.8);
      const l = plot(F, T, x => 2 * x, -0.4, 2.3); l.style.stroke = '#3b8fbb';
      F.dot(T([2, 4])); F.text(T([2, 4]), '(2, 4)', 'len small', 28, 4);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": { fr: "ou", es: "o", ja: "または", zh: "或" }
    },
    options: [
      { tex: "\\tfrac43", correct: true, why: {
        en: "$4 - \\tfrac83$.",
        fr: "$4 - \\tfrac83$.",
        es: "$4 - \\tfrac83$.",
        ja: "$4 - \\tfrac83$.",
        zh: "$4 - \\tfrac83$."
      } },
      { tex: "\\int_0^2 (2x - x^2)\\,dx", correct: true, why: {
        en: "The integral of top minus bottom between the intersections.",
        fr: "L’intégrale de (haut − bas) entre les points d’intersection.",
        es: "La integral de (arriba − abajo) entre los cortes.",
        ja: "交点の間での（上 − 下）の積分。",
        zh: "两交点之间（上 − 下）的积分。"
      } },
      { tex: "\\tfrac83", correct: false, why: {
        en: "$\\int_0^2 x^2\\,dx$: the area under the parabola only.",
        fr: "$\\int_0^2 x^2\\,dx$ : l’aire sous la parabole seulement.",
        es: "$\\int_0^2 x^2\\,dx$: solo el área bajo la parábola.",
        ja: "$\\int_0^2 x^2\\,dx$：放物線の下の面積だけです。",
        zh: "$\\int_0^2 x^2\\,dx$：只是抛物线下的面积。"
      } },
      { tex: "4", correct: false, why: {
        en: "$\\int_0^2 2x\\,dx$: the area under the line only.",
        fr: "$\\int_0^2 2x\\,dx$ : l’aire sous la droite seulement.",
        es: "$\\int_0^2 2x\\,dx$: solo el área bajo la recta.",
        ja: "$\\int_0^2 2x\\,dx$：直線の下の面積だけです。",
        zh: "$\\int_0^2 2x\\,dx$：只是直线下的面积。"
      } },
      { tex: "-\\tfrac43", correct: false, why: {
        en: "Bottom minus top: an area is positive.",
        fr: "Bas moins haut : une aire est positive.",
        es: "Abajo menos arriba: un área es positiva.",
        ja: "下 − 上 になっています：面積は正です。",
        zh: "用了下减上：面积是正的。"
      } },
      { tex: "\\tfrac{20}{3}", correct: false, why: {
        en: "Adds the two areas instead of subtracting.",
        fr: "Additionne les deux aires au lieu de soustraire.",
        es: "Suma las dos áreas en lugar de restar.",
        ja: "2つの面積を引かずに足しています。",
        zh: "把两个面积相加而不是相减。"
      } },
      { tex: "2", correct: false, why: {
        en: "Half of the triangle under the line — the parabola is not straight.",
        fr: "La moitié du triangle — la parabole n’est pas droite.",
        es: "La mitad del triángulo — la parábola no es recta.",
        ja: "三角形の半分 — 放物線は直線ではありません。",
        zh: "三角形的一半 —— 抛物线不是直的。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "Integrated over $[0, 1]$ only.",
        fr: "Intégré seulement sur $[0, 1]$.",
        es: "Integró solo en $[0, 1]$.",
        ja: "$[0, 1]$ だけで積分しています。",
        zh: "只在 $[0, 1]$ 上积分了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Intersections",
          fr: "Intersections",
          es: "Cortes",
          ja: "交点",
          zh: "交点"
        },
        lines: ["x^2 = 2x \\iff x(x - 2) = 0 \\iff x = 0 \\text{ or } 2"],
        note: {
          en: "On $[0, 2]$ the line is above the parabola.",
          fr: "Sur $[0, 2]$ la droite est au-dessus de la parabole.",
          es: "En $[0, 2]$ la recta está por encima de la parábola.",
          ja: "$[0, 2]$ では直線が放物線の上にあります。",
          zh: "在 $[0, 2]$ 上直线在抛物线上方。"
        }
      },
      {
        title: {
          en: "Integrate top minus bottom",
          fr: "Intégrer haut moins bas",
          es: "Integrar arriba menos abajo",
          ja: "（上 − 下）を積分",
          zh: "对上减下积分"
        },
        lines: ["\\int_0^2 (2x - x^2)\\,dx = \\Big[x^2 - \\tfrac{x^3}{3}\\Big]_0^2 = 4 - \\tfrac83 = \\boxed{\\tfrac43}"],
        note: {
          en: "Shortcut: $\\tfrac{|a|(\\beta - \\alpha)^3}{6} = \\tfrac{8}{6}$.",
          fr: "Raccourci : $\\tfrac{|a|(\\beta - \\alpha)^3}{6} = \\tfrac{8}{6}$.",
          es: "Atajo: $\\tfrac{|a|(\\beta - \\alpha)^3}{6} = \\tfrac{8}{6}$.",
          ja: "近道：$\\tfrac{|a|(\\beta - \\alpha)^3}{6} = \\tfrac{8}{6}$。",
          zh: "捷径：$\\tfrac{|a|(\\beta - \\alpha)^3}{6} = \\tfrac{8}{6}$。"
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
