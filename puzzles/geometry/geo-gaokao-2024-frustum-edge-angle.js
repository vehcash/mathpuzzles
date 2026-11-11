/* geometry · The slope of a frustum’s edge
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-frustum-edge-angle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 7",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 7",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 7",
        ja: "2024年 中国・高考 新課程標準II卷 第7問",
        zh: "2024年高考数学新课标II卷 第7题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The slope of a frustum’s edge",
      fr: "La pente d’une arête de tronc",
      es: "La inclinación de una arista del tronco",
      ja: "錐台の側辺の傾き",
      zh: "棱台侧棱的倾斜"
    },
    statement: {
      en: "The regular triangular frustum $ABC\\text{-}A_1B_1C_1$ has volume $\\tfrac{52}{3}$, $AB=6$ and $A_1B_1=2$. <b>Which of the following equal the tangent of the angle between $AA_1$ and the plane $ABC$?</b>",
      fr: "Le tronc de pyramide triangulaire régulier $ABC\\text{-}A_1B_1C_1$ a pour volume $\\tfrac{52}{3}$, avec $AB=6$ et $A_1B_1=2$. <b>Lesquelles des valeurs suivantes sont égales à la tangente de l’angle entre $AA_1$ et le plan $ABC$ ?</b>",
      es: "El tronco de pirámide triangular regular $ABC\\text{-}A_1B_1C_1$ tiene volumen $\\tfrac{52}{3}$, $AB=6$ y $A_1B_1=2$. <b>¿Cuáles de los siguientes valores son iguales a la tangente del ángulo entre $AA_1$ y el plano $ABC$?</b>",
      ja: "正三角錐台 $ABC\\text{-}A_1B_1C_1$ の体積は $\\tfrac{52}{3}$、$AB=6$、$A_1B_1=2$ です。<b>$AA_1$ と平面 $ABC$ のなす角の正接に等しいものはどれですか？</b>",
      zh: "正三棱台 $ABC\\text{-}A_1B_1C_1$ 的体积为 $\\tfrac{52}{3}$，$AB=6$，$A_1B_1=2$。<b>下列哪些等于 $AA_1$ 与平面 $ABC$ 所成角的正切值？</b>"
    },
    figureText: {
      en: "The frustum with the large base ABC (side 6) and the small top A₁B₁C₁ (side 2).",
      fr: "Le tronc avec la grande base ABC (côté 6) et le petit sommet A₁B₁C₁ (côté 2).",
      es: "El tronco con la base grande ABC (lado 6) y la tapa pequeña A₁B₁C₁ (lado 2).",
      ja: "大きい底面 ABC（1辺 6）と小さい上面 A₁B₁C₁（1辺 2）の錐台。",
      zh: "棱台：下底 ABC 边长 6，上底 A₁B₁C₁ 边长 2。"
    },
    hint: {
      en: "Find the height from the frustum formula $V=\\tfrac h3\\bigl(S+S'+\\sqrt{SS'}\\bigr)$, then compare it with the horizontal shift of $A_1$ relative to $A$.",
      fr: "Trouvez la hauteur avec $V=\\tfrac h3\\bigl(S+S'+\\sqrt{SS'}\\bigr)$, puis comparez-la au décalage horizontal de $A_1$ par rapport à $A$.",
      es: "Halla la altura con $V=\\tfrac h3\\bigl(S+S'+\\sqrt{SS'}\\bigr)$ y compárala con el desplazamiento horizontal de $A_1$ respecto de $A$.",
      ja: "$V=\\tfrac h3\\bigl(S+S'+\\sqrt{SS'}\\bigr)$ で高さを求め、$A$ に対する $A_1$ の水平のずれと比べる。",
      zh: "由 $V=\\tfrac h3\\bigl(S+S'+\\sqrt{SS'}\\bigr)$ 求高，再与 $A_1$ 相对 $A$ 的水平偏移比较。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 4.2, scale: 52, pad: 18 });
      const R = 6 / Math.sqrt(3), r = 2 / Math.sqrt(3), h = 4 / Math.sqrt(3);
      const P = ([x, y, z]) => [3.0 + 0.62 * x + 0.30 * y, 0.6 + 0.62 * z + 0.20 * y];
      const ang = [210, 330, 90].map(d => d * Math.PI / 180);
      const B = ang.map(t => [R * Math.cos(t), R * Math.sin(t), 0]), U = ang.map(t => [r * Math.cos(t), r * Math.sin(t), h]);
      [[0, 1], [1, 2], [2, 0]].forEach(([i, j]) => { F.seg(P(B[i]), P(B[j]), i === 2 || j === 2 ? 'seg thin dashc' : 'seg'); F.seg(P(U[i]), P(U[j]), 'seg'); });
      [0, 1, 2].forEach(i => F.seg(P(B[i]), P(U[i]), i === 2 ? 'seg thin dashc' : 'seg'));
      ['A', 'B', 'C'].forEach((n, i) => F.text(P(B[i]), n, 'pt', i === 0 ? -10 : i === 1 ? 10 : 14, i === 2 ? 2 : 12));
      ['A₁', 'B₁', 'C₁'].forEach((n, i) => F.text(P(U[i]), n, 'pt', i === 0 ? -16 : i === 1 ? -12 : -4, i === 0 ? -8 : i === 1 ? 14 : -12));
      F.text(P([0, -R / 2, 0]), '6', 'len small', 0, 14); F.text(P([0, -r / 2, h]), '2', 'len small', 0, 12);
      F.reveal = () => {
      const O = [0, 0, 0], A1p = [U[0][0], U[0][1], 0];
      F.seg(P(U[0]), P(A1p), 'hl pink'); F.seg(P(O), P(B[0]), 'seg thin dashc'); F.seg(P(A1p), P(B[0]), 'hl yellow');
      F.text(P([U[0][0], U[0][1], h / 2]), 'h = 4/√3', 'len small', 38, 0);
      };
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "Height $\\tfrac4{\\sqrt3}$ and horizontal shift $\\tfrac6{\\sqrt3}-\\tfrac2{\\sqrt3}=\\tfrac4{\\sqrt3}$: the angle is $45^\\circ$.",
        fr: "Hauteur $\\tfrac4{\\sqrt3}$ et décalage $\\tfrac6{\\sqrt3}-\\tfrac2{\\sqrt3}=\\tfrac4{\\sqrt3}$ : l’angle vaut $45^\\circ$.",
        es: "Altura $\\tfrac4{\\sqrt3}$ y desplazamiento $\\tfrac6{\\sqrt3}-\\tfrac2{\\sqrt3}=\\tfrac4{\\sqrt3}$: el ángulo es $45^\\circ$.",
        ja: "高さ $\\tfrac4{\\sqrt3}$、水平のずれ $\\tfrac6{\\sqrt3}-\\tfrac2{\\sqrt3}=\\tfrac4{\\sqrt3}$ で $45^\\circ$。",
        zh: "高 $\\tfrac4{\\sqrt3}$，水平偏移 $\\tfrac6{\\sqrt3}-\\tfrac2{\\sqrt3}=\\tfrac4{\\sqrt3}$，角为 $45^\\circ$。"
      } },
      { tex: "\\tan45^\\circ", correct: true, why: {
        en: "The same number.",
        fr: "Le même nombre.",
        es: "El mismo número.",
        ja: "同じ数。",
        zh: "同一个数。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "This uses the inradius difference $\\tfrac{2}{\\sqrt3}$ instead of the circumradius difference.",
        fr: "Cela utilise l’écart des rayons inscrits $\\tfrac{2}{\\sqrt3}$ au lieu des rayons circonscrits.",
        es: "Usa la diferencia de inradios $\\tfrac{2}{\\sqrt3}$ en lugar de la de circunradios.",
        ja: "外接円でなく内接円の半径差 $\\tfrac{2}{\\sqrt3}$ を使っている。",
        zh: "误用了内切圆半径差 $\\tfrac{2}{\\sqrt3}$，应为外接圆半径差。"
      } },
      { tex: "3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{\\sqrt3}{3}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{\\sqrt2}{2}", correct: false, why: {
        en: "That is $\\sin45^\\circ$, not $\\tan45^\\circ$.",
        fr: "C’est $\\sin45^\\circ$, pas $\\tan45^\\circ$.",
        es: "Es $\\sin45^\\circ$, no $\\tan45^\\circ$.",
        ja: "$\\sin45^\\circ$ であり $\\tan45^\\circ$ ではない。",
        zh: "那是 $\\sin45^\\circ$，不是 $\\tan45^\\circ$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The two bases",
          fr: "Les deux bases",
          es: "Las dos bases",
          ja: "2つの底面",
          zh: "两个底面"
        },
        lines: ["S=\\tfrac{\\sqrt3}4\\cdot36=9\\sqrt3,\\quad S'=\\sqrt3,\\quad\\sqrt{SS'}=3\\sqrt3"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Height",
          fr: "Hauteur",
          es: "Altura",
          ja: "高さ",
          zh: "高"
        },
        lines: ["\\tfrac{52}3=\\tfrac h3\\cdot13\\sqrt3\\ \\Rightarrow\\ h=\\tfrac4{\\sqrt3}"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Horizontal shift of the edge",
          fr: "Décalage horizontal de l’arête",
          es: "Desplazamiento horizontal de la arista",
          ja: "側辺の水平のずれ",
          zh: "侧棱的水平偏移"
        },
        lines: ["\\tfrac{6}{\\sqrt3}-\\tfrac{2}{\\sqrt3}=\\tfrac{4}{\\sqrt3}", "\\tan\\theta=\\frac{4/\\sqrt3}{4/\\sqrt3}=\\boxed{1}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Both vertices lie on the same line through the centre, at the circumradii of the two triangles.",
          fr: "Les deux sommets sont sur une même droite par le centre, aux rayons circonscrits des deux triangles.",
          es: "Ambos vértices están en una recta por el centro, a los circunradios de los dos triángulos.",
          ja: "2頂点は中心を通る同じ直線上、各三角形の外接円の半径の位置にある。",
          zh: "两顶点在过中心的同一直线上，分别位于两三角形外接圆半径处。"
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
