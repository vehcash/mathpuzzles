/* geometry · An obtuse triangle with sides in AP
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.14–15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2023-obtuse-ap-triangle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.14–15",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.14–15",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.14–15",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.14–15",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.14–15"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "An obtuse triangle with sides in AP",
      fr: "Un triangle obtus aux côtés en progression",
      es: "Un triángulo obtuso con lados en progresión",
      ja: "辺が等差数列の鈍角三角形",
      zh: "三边成等差的钝角三角形"
    },
    statement: {
      en: "Triangle $ABC$ is obtuse, the difference between its largest and smallest angles is $\\tfrac{\\pi}{2}$, its sides are in arithmetic progression, and its vertices lie on a circle of radius $1$. Let $a$ be its area and $r$ its inradius. <b>Which of the following are true?</b>",
      fr: "Le triangle $ABC$ est obtus, la différence entre son plus grand et son plus petit angle vaut $\\tfrac{\\pi}{2}$, ses côtés sont en progression arithmétique et ses sommets sont sur un cercle de rayon $1$. Soit $a$ son aire et $r$ son rayon inscrit. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El triángulo $ABC$ es obtusángulo, la diferencia entre su mayor y su menor ángulo es $\\tfrac{\\pi}{2}$, sus lados están en progresión aritmética y sus vértices están en una circunferencia de radio $1$. Sea $a$ su área y $r$ su inradio. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "三角形 $ABC$ は鈍角三角形で、最大角と最小角の差は $\\tfrac{\\pi}{2}$、3辺は等差数列をなし、頂点は半径 $1$ の円周上にあります。面積を $a$、内接円の半径を $r$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$\\triangle ABC$ 为钝角三角形，最大角与最小角之差为 $\\tfrac{\\pi}{2}$，三边成等差数列，顶点在半径为 $1$ 的圆上。设面积为 $a$，内切圆半径为 $r$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The obtuse triangle inscribed in the unit circle, with smallest angle α, middle angle π/2 − 2α and largest angle α + π/2.",
      fr: "Le triangle obtus inscrit dans le cercle unité, d’angles α (le plus petit), π/2 − 2α et α + π/2 (le plus grand).",
      es: "El triángulo obtuso inscrito en la circunferencia unidad, con ángulos α (menor), π/2 − 2α y α + π/2 (mayor).",
      ja: "単位円に内接する鈍角三角形。最小角 α、中間の角 π/2 − 2α、最大角 α + π/2。",
      zh: "内接于单位圆的钝角三角形，最小角 α，中间角 π/2 − 2α，最大角 α + π/2。"
    },
    hint: {
      en: "Sides are $2\\sin$ of the angles. With smallest angle $\\alpha$, the AP condition becomes $2\\cos2\\alpha=\\sin\\alpha+\\cos\\alpha$.",
      fr: "Les côtés valent $2\\sin$ des angles. Avec $\\alpha$ le plus petit angle, la condition devient $2\\cos2\\alpha=\\sin\\alpha+\\cos\\alpha$.",
      es: "Los lados son $2\\sin$ de los ángulos. Con $\\alpha$ el menor, la condición queda $2\\cos2\\alpha=\\sin\\alpha+\\cos\\alpha$.",
      ja: "辺は角の $2\\sin$。最小角を $\\alpha$ とすると条件は $2\\cos2\\alpha=\\sin\\alpha+\\cos\\alpha$。",
      zh: "边长为对应角的 $2\\sin$。设最小角为 $\\alpha$，条件化为 $2\\cos2\\alpha=\\sin\\alpha+\\cos\\alpha$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 80, pad: 18 });
      const O = [1.6, 1.6], al = 0.42403, P = t => [O[0] + 1.3 * Math.cos(t), O[1] + 1.3 * Math.sin(t)];
      const C = P(Math.PI / 2 + 0.25), A = P(Math.PI / 2 + 0.25 + 2 * (Math.PI / 2 - 2 * al)), B = P(Math.PI / 2 + 0.25 - 2 * al);
      F.circle(O, 1.3, 'conic'); F.path([A, B, C], 'tri'); F.dot(O);
      F.text(A, 'A', 'pt', -10, 10); F.text(B, 'B', 'pt', 10, -6); F.text(C, 'C', 'pt', -4, -12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the largest angle is": {"fr": "le plus grand angle vaut", "es": "el mayor ángulo es", "ja": "最大角は", "zh": "最大角为"},
      "the middle side is": {"fr": "le côté du milieu vaut", "es": "el lado medio es", "ja": "中央の辺は", "zh": "中间的边为"},
      "middle side": {"fr": "côté du milieu", "es": "lado medio", "ja": "中央の辺", "zh": "中间边"},
      "sum of sides": {"fr": "somme des côtés", "es": "suma de los lados", "ja": "辺の和", "zh": "三边之和"}
    },
    options: [
      { tex: "(64a)^2=1008", correct: true, why: {
        en: "$a\\approx0.4961$, so $64a\\approx31.75$ and $(64a)^2=1008$.",
        fr: "$a\\approx0.4961$, so $64a\\approx31.75$ and $(64a)^2=1008$.",
        es: "$a\\approx0.4961$, so $64a\\approx31.75$ and $(64a)^2=1008$.",
        ja: "$a\\approx0.4961$, so $64a\\approx31.75$ and $(64a)^2=1008$.",
        zh: "$a\\approx0.4961$, so $64a\\approx31.75$ and $(64a)^2=1008$."
      } },
      { tex: "r=\\tfrac14", correct: true, why: {
        en: "$r=\\tfrac{a}{s}$ with semi-perimeter $s\\approx1.984$.",
        fr: "$r=\\tfrac{a}{s}$ with semi-perimeter $s\\approx1.984$.",
        es: "$r=\\tfrac{a}{s}$ with semi-perimeter $s\\approx1.984$.",
        ja: "$r=\\tfrac{a}{s}$ with semi-perimeter $s\\approx1.984$.",
        zh: "$r=\\tfrac{a}{s}$ with semi-perimeter $s\\approx1.984$."
      } },
      { tex: "(64a)^2=1024", correct: false, why: {
        en: "That would need $a=\\tfrac12$ exactly.",
        fr: "Il faudrait $a=\\tfrac12$ exactement.",
        es: "Haría falta $a=\\tfrac12$ exactamente.",
        ja: "$a=\\tfrac12$ ちょうどが必要。",
        zh: "需要恰好 $a=\\tfrac12$。"
      } },
      { tex: "r=\\tfrac12", correct: false, why: {
        en: "Twice too large.",
        fr: "Deux fois trop grand.",
        es: "El doble de lo correcto.",
        ja: "2倍大きい。",
        zh: "大了一倍。"
      } },
      { tex: "a=\\tfrac{\\sqrt3}{4}", correct: false, why: {
        en: "That is an equilateral triangle of side 1, not this one.",
        fr: "C’est un triangle équilatéral de côté 1, pas celui-ci.",
        es: "Es un equilátero de lado 1, no este.",
        ja: "1辺1の正三角形の面積。",
        zh: "那是边长 1 的正三角形。"
      } },
      { tex: "\\text{the largest angle is } \\tfrac{2\\pi}{3}", correct: false, why: {
        en: "It is $\\alpha+\\tfrac{\\pi}{2}\\approx114.3^\\circ$.",
        fr: "Il vaut $\\alpha+\\tfrac{\\pi}{2}\\approx114{,}3^\\circ$.",
        es: "Vale $\\alpha+\\tfrac{\\pi}{2}\\approx114{,}3^\\circ$.",
        ja: "$\\alpha+\\tfrac{\\pi}{2}\\approx114.3^\\circ$。",
        zh: "它是 $\\alpha+\\tfrac{\\pi}{2}\\approx114.3^\\circ$。"
      } },
      { tex: "\\text{the middle side is } 1", correct: false, why: {
        en: "It is $2\\cos2\\alpha\\approx1.32$.",
        fr: "Il vaut $2\\cos2\\alpha\\approx1{,}32$.",
        es: "Vale $2\\cos2\\alpha\\approx1{,}32$.",
        ja: "$2\\cos2\\alpha\\approx1.32$。",
        zh: "它是 $2\\cos2\\alpha\\approx1.32$。"
      } },
      { tex: "(64a)^2=1000", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Angles",
          fr: "Angles",
          es: "Ángulos",
          ja: "角",
          zh: "角"
        },
        lines: ["\\alpha,\\quad\\tfrac{\\pi}{2}-2\\alpha,\\quad\\alpha+\\tfrac{\\pi}{2}"],
        note: {
          en: "They add to $\\pi$, and the largest minus the smallest is $\\tfrac{\\pi}{2}$.",
          fr: "Leur somme vaut $\\pi$ et l’écart max–min vaut $\\tfrac{\\pi}{2}$.",
          es: "Suman $\\pi$ y la diferencia máx–mín es $\\tfrac{\\pi}{2}$.",
          ja: "和は $\\pi$、最大−最小は $\\tfrac{\\pi}{2}$。",
          zh: "三角和为 $\\pi$，最大减最小为 $\\tfrac{\\pi}{2}$。"
        }
      },
      {
        title: {
          en: "AP of sides",
          fr: "Côtés en progression",
          es: "Lados en progresión",
          ja: "辺の等差条件",
          zh: "边成等差"
        },
        lines: ["2\\cdot2\\cos2\\alpha=2\\sin\\alpha+2\\cos\\alpha\\;\\Rightarrow\\;\\cos\\alpha-\\sin\\alpha=\\tfrac12"],
        note: {
          en: "Divide by $\\cos\\alpha+\\sin\\alpha$, since $\\cos2\\alpha=(\\cos\\alpha-\\sin\\alpha)(\\cos\\alpha+\\sin\\alpha)$.",
          fr: "Divisez par $\\cos\\alpha+\\sin\\alpha$, car $\\cos2\\alpha=(\\cos\\alpha-\\sin\\alpha)(\\cos\\alpha+\\sin\\alpha)$.",
          es: "Divide por $\\cos\\alpha+\\sin\\alpha$, pues $\\cos2\\alpha=(\\cos\\alpha-\\sin\\alpha)(\\cos\\alpha+\\sin\\alpha)$.",
          ja: "$\\cos2\\alpha=(\\cos\\alpha-\\sin\\alpha)(\\cos\\alpha+\\sin\\alpha)$ なので $\\cos\\alpha+\\sin\\alpha$ で割る。",
          zh: "因 $\\cos2\\alpha=(\\cos\\alpha-\\sin\\alpha)(\\cos\\alpha+\\sin\\alpha)$，两边除以 $\\cos\\alpha+\\sin\\alpha$。"
        }
      },
      {
        title: {
          en: "Sides",
          fr: "Côtés",
          es: "Lados",
          ja: "辺",
          zh: "边"
        },
        lines: ["\\sin2\\alpha=\\tfrac34,\\ \\ \\cos\\alpha+\\sin\\alpha=\\tfrac{\\sqrt7}{2},\\ \\ \\text{middle side}=2\\cos2\\alpha=\\tfrac{\\sqrt7}{2}"],
        note: {
          en: "Square $\\cos\\alpha-\\sin\\alpha=\\tfrac12$ to get $\\sin2\\alpha=\\tfrac34$.",
          fr: "Élevez au carré pour obtenir $\\sin2\\alpha=\\tfrac34$.",
          es: "Eleva al cuadrado para obtener $\\sin2\\alpha=\\tfrac34$.",
          ja: "2乗して $\\sin2\\alpha=\\tfrac34$。",
          zh: "两边平方得 $\\sin2\\alpha=\\tfrac34$。"
        }
      },
      {
        title: {
          en: "Area and inradius",
          fr: "Aire et rayon inscrit",
          es: "Área e inradio",
          ja: "面積と内接円の半径",
          zh: "面积与内切圆半径"
        },
        lines: ["a=2\\sin A\\sin B\\sin C=\\tfrac{3\\sqrt7}{16},\\qquad (64a)^2=(12\\sqrt7)^2=\\boxed{1008},\\qquad r=\\frac{a}{s}=\\frac{3\\sqrt7/16}{3\\sqrt7/4}=\\boxed{\\tfrac14}"],
        note: {
          en: "$s=\\tfrac12(\\text{sum of sides})=\\tfrac32\\cdot\\tfrac{\\sqrt7}{2}$, because in an AP the sum is three times the middle side.",
          fr: "$s$ vaut $\\tfrac32$ fois le côté du milieu (somme d’une progression de 3 termes).",
          es: "$s$ es $\\tfrac32$ veces el lado medio (suma de una progresión de 3 términos).",
          ja: "等差3項の和は中央の3倍なので $s=\\tfrac32\\cdot\\tfrac{\\sqrt7}{2}$。",
          zh: "等差三项之和为中项的 3 倍，故 $s=\\tfrac32\\cdot\\tfrac{\\sqrt7}{2}$。"
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
          en: "Both the area and the inradius come out exactly.",
          fr: "L’aire et le rayon inscrit sont exacts.",
          es: "Área e inradio salen exactos.",
          ja: "面積も内接円の半径もきれいに出ます。",
          zh: "面积和内切圆半径都是精确值。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
