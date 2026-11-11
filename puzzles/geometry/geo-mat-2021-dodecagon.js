/* geometry · Twelve triangles in a circle
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2021-dodecagon",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2021 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "Twelve triangles in a circle",
      fr: "Douze triangles dans un cercle",
      es: "Doce triángulos en un círculo",
      ja: "円の中の12個の三角形",
      zh: "圆中的十二个三角形"
    },
    statement: {
      en: "A regular dodecagon (12 sides) has its vertices on a circle of radius $1$. <b>Which of the following equal its area?</b>",
      fr: "Un dodécagone régulier (12 côtés) a ses sommets sur un cercle de rayon $1$. <b>Lesquelles des valeurs suivantes sont égales à son aire ?</b>",
      es: "Un dodecágono regular (12 lados) tiene sus vértices en una circunferencia de radio $1$. <b>¿Cuáles de los siguientes valores son iguales a su área?</b>",
      ja: "正十二角形の頂点が半径 $1$ の円周上にあります。<b>その面積に等しいものはどれですか？</b>",
      zh: "正十二边形的顶点都在半径为 $1$ 的圆上。<b>下列哪些等于它的面积？</b>"
    },
    figureText: {
      en: "The dodecagon inside the unit circle, split from the centre into 12 equal triangles; one of them, with a 30° angle at the centre, is shaded.",
      fr: "Le dodécagone dans le cercle unité, découpé depuis le centre en 12 triangles égaux ; l’un d’eux, d’angle 30° au centre, est grisé.",
      es: "El dodecágono dentro de la circunferencia unidad, dividido desde el centro en 12 triángulos iguales; uno de ellos, con ángulo de 30° en el centro, está sombreado.",
      ja: "単位円内の正十二角形を中心から12個の合同な三角形に分けた図。中心角30°の1つに色付け。",
      zh: "单位圆内的正十二边形，从中心分成 12 个全等三角形；其中一个（圆心角 30°）涂色。"
    },
    hint: {
      en: "Each of the 12 triangles has two sides $1$ and the angle $30^\\circ$ between them.",
      fr: "Chacun des 12 triangles a deux côtés $1$ et un angle de $30^\\circ$ entre eux.",
      es: "Cada uno de los 12 triángulos tiene dos lados $1$ y un ángulo de $30^\\circ$ entre ellos.",
      ja: "12個の三角形はどれも2辺が $1$ でその間の角が $30^\\circ$。",
      zh: "12 个三角形都有两边为 $1$，夹角 $30^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.6, h: 2.6, scale: 80, pad: 16 });
      const O = [1.3, 1.3], V = k => [1.3 + Math.cos(k * Math.PI / 6), 1.3 + Math.sin(k * Math.PI / 6)];
      F.path([O, V(0), V(1)], 'fill-yellow', 'fills');
      F.circle(O, 1, 'conic');
      F.path([...Array(12).keys()].map(V), 'tri');
      for (let k = 0; k < 12; k++) F.seg(O, V(k), 'seg thin');
      F.dot(O);
      F.text(mid(O, V(0)), '1', 'len small', 0, 12);
      F.text([1.3 + 1.17 * Math.cos(Math.PI / 12), 1.3 + 1.17 * Math.sin(Math.PI / 12)], '30°', 'len small', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "12 triangles": {"fr": "12 triangles", "es": "12 triángulos", "ja": "12個の三角形", "zh": "12 个三角形"}
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$12\\cdot\\tfrac12\\cdot1\\cdot1\\cdot\\sin30^\\circ=3$.",
        fr: "$12\\cdot\\tfrac12\\cdot1\\cdot1\\cdot\\sin30^\\circ=3$.",
        es: "$12\\cdot\\tfrac12\\cdot1\\cdot1\\cdot\\sin30^\\circ=3$.",
        ja: "$12\\cdot\\tfrac12\\cdot1\\cdot1\\cdot\\sin30^\\circ=3$.",
        zh: "$12\\cdot\\tfrac12\\cdot1\\cdot1\\cdot\\sin30^\\circ=3$."
      } },
      { tex: "12\\cdot\\tfrac12\\sin30^\\circ", correct: true, why: {
        en: "The sum of the 12 triangles, before simplifying.",
        fr: "La somme des 12 triangles, avant simplification.",
        es: "La suma de los 12 triángulos, sin simplificar.",
        ja: "12個の三角形の和（簡単にする前）。",
        zh: "12 个三角形之和（化简前）。"
      } },
      { tex: "\\pi", correct: false, why: {
        en: "That is the whole disc; the dodecagon is a little smaller.",
        fr: "C’est le disque entier ; le dodécagone est un peu plus petit.",
        es: "Es el disco entero; el dodecágono es algo menor.",
        ja: "それは円全体。正十二角形は少し小さい。",
        zh: "那是整个圆的面积，十二边形略小。"
      } },
      { tex: "6", correct: false, why: {
        en: "Forgets the factor $\\tfrac12$ in the triangle area.",
        fr: "Oublie le facteur $\\tfrac12$ dans l’aire du triangle.",
        es: "Olvida el factor $\\tfrac12$ del área del triángulo.",
        ja: "三角形の面積の $\\tfrac12$ を忘れている。",
        zh: "漏了三角形面积中的 $\\tfrac12$。"
      } },
      { tex: "\\tfrac{3\\sqrt3}{2}", correct: false, why: {
        en: "That is the regular hexagon in the same circle.",
        fr: "C’est l’hexagone régulier dans le même cercle.",
        es: "Es el hexágono regular en la misma circunferencia.",
        ja: "同じ円に内接する正六角形の面積。",
        zh: "那是同一圆内接正六边形的面积。"
      } },
      { tex: "2\\sqrt2", correct: false, why: {
        en: "That is the regular octagon.",
        fr: "C’est l’octogone régulier.",
        es: "Es el octógono regular.",
        ja: "それは正八角形。",
        zh: "那是正八边形。"
      } },
      { tex: "2+\\sqrt3", correct: false, why: {
        en: "$\\approx3.73>\\pi$, larger than the disc.",
        fr: "$\\approx3{,}73>\\pi$, plus grand que le disque.",
        es: "$\\approx3{,}73>\\pi$, mayor que el disco.",
        ja: "$\\approx3.73>\\pi$ で円より大きい。",
        zh: "$\\approx3.73>\\pi$，比圆还大。"
      } },
      { tex: "12\\sin15^\\circ", correct: false, why: {
        en: "That is half the perimeter, not the area.",
        fr: "C’est le demi-périmètre, pas l’aire.",
        es: "Es el semiperímetro, no el área.",
        ja: "それは周の長さの半分。",
        zh: "那是半周长，不是面积。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cut from the centre",
          fr: "Découper depuis le centre",
          es: "Cortar desde el centro",
          ja: "中心から分ける",
          zh: "从中心分割"
        },
        lines: ["\\text{12 triangles},\\quad \\angle O=\\tfrac{360^\\circ}{12}=30^\\circ"],
        note: {
          en: "All 12 are congruent, with two sides equal to the radius.",
          fr: "Les 12 sont isométriques, avec deux côtés égaux au rayon.",
          es: "Los 12 son iguales, con dos lados iguales al radio.",
          ja: "12個は合同で、2辺は半径。",
          zh: "12 个三角形全等，两边都是半径。"
        }
      },
      {
        title: {
          en: "Add them up",
          fr: "Additionner",
          es: "Sumar",
          ja: "合計する",
          zh: "求和"
        },
        lines: ["12\\cdot\\tfrac12\\cdot1^2\\sin30^\\circ=12\\cdot\\tfrac14=\\boxed{3}"],
        note: {
          en: "A clean answer: just under $\\pi\\approx3.14$.",
          fr: "Un résultat net, juste sous $\\pi\\approx3{,}14$.",
          es: "Un resultado limpio, justo por debajo de $\\pi\\approx3{,}14$.",
          ja: "$\\pi\\approx3.14$ より少し小さいきれいな値。",
          zh: "结果很整齐，略小于 $\\pi\\approx3.14$。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
