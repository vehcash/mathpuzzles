/* geometry · The cut-off square pyramid
   Gaokao 2023, New Curriculum Paper I (新课标Ⅰ卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-frustum",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标Ⅰ卷), Question 14",
        fr: "Gaokao 2023, épreuve nationale I (新课标Ⅰ卷), question 14",
        es: "Gaokao 2023, examen nacional I (新课标Ⅰ卷), pregunta 14",
        ja: "2023年 中国・高考 新課程標準Ⅰ卷 第14問",
        zh: "2023年高考数学新课标Ⅰ卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The cut-off square pyramid",
      fr: "La pyramide carrée tronquée",
      es: "La pirámide cuadrada truncada",
      ja: "正四角錐台",
      zh: "正四棱台"
    },
    statement: {
      en: "In the regular square frustum $ABCD\\text{-}A_1B_1C_1D_1$ the bottom edge is $AB=2$, the top edge is $A_1B_1=1$ and the lateral edge is $AA_1=2$. <b>Which of the following equal its volume?</b>",
      fr: "Dans le tronc de pyramide régulier à base carrée $ABCD\\text{-}A_1B_1C_1D_1$, l’arête de la base est $AB=2$, celle du dessus $A_1B_1=1$ et l’arête latérale $AA_1=2$. <b>Lesquelles des valeurs suivantes sont égales à son volume ?</b>",
      es: "En el tronco de pirámide cuadrada regular $ABCD\\text{-}A_1B_1C_1D_1$ la arista de la base es $AB=2$, la de arriba $A_1B_1=1$ y la arista lateral $AA_1=2$. <b>¿Cuáles de los siguientes valores son iguales a su volumen?</b>",
      ja: "正四角錐台 $ABCD\\text{-}A_1B_1C_1D_1$ で、下底の辺 $AB=2$、上底の辺 $A_1B_1=1$、側辺 $AA_1=2$ です。<b>体積に等しいものはどれですか？</b>",
      zh: "正四棱台 $ABCD\\text{-}A_1B_1C_1D_1$ 中，$AB=2$，$A_1B_1=1$，$AA_1=2$。<b>下列哪些等于该棱台的体积？</b>"
    },
    figureText: {
      en: "A frustum drawn in perspective: a square base ABCD of side 2, a smaller parallel square top A1B1C1D1 of side 1, and lateral edges of length 2. The height h joins the centres of the two squares.",
      fr: "Un tronc de pyramide en perspective : base carrée ABCD de côté 2, dessus carré parallèle A1B1C1D1 de côté 1, arêtes latérales de longueur 2. La hauteur h relie les centres des deux carrés.",
      es: "Un tronco de pirámide en perspectiva: base cuadrada ABCD de lado 2, cara superior cuadrada paralela A1B1C1D1 de lado 1 y aristas laterales de longitud 2. La altura h une los centros de los dos cuadrados.",
      ja: "透視図の角錐台：1辺 2 の正方形 ABCD を下底、1辺 1 の正方形 A1B1C1D1 を上底とし、側辺の長さは 2。高さ h は2つの正方形の中心を結ぶ。",
      zh: "棱台的立体图：下底是边长 2 的正方形 ABCD，上底是边长 1 的平行正方形 A1B1C1D1，侧棱长 2。高 h 连接两个正方形的中心。"
    },
    hint: {
      en: "Cut along the diagonal plane $AA_1C_1C$: it is an isosceles trapezoid with bases $2\\sqrt2$ and $\\sqrt2$.",
      fr: "Coupez selon le plan diagonal $AA_1C_1C$ : c’est un trapèze isocèle de bases $2\\sqrt2$ et $\\sqrt2$.",
      es: "Corta por el plano diagonal $AA_1C_1C$: es un trapecio isósceles de bases $2\\sqrt2$ y $\\sqrt2$.",
      ja: "対角面 $AA_1C_1C$ で切ると、上底 $\\sqrt2$・下底 $2\\sqrt2$ の等脚台形。",
      zh: "沿对角面 $AA_1C_1C$ 截开：它是上下底为 $\\sqrt2$、$2\\sqrt2$ 的等腰梯形。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.4, scale: 62, pad: 20 });
      const P = (x, y, z) => [1.2 + x + 0.45 * y, 0.3 + z + 0.35 * y];
      const h = Math.sqrt(3.5) * 0.75;
      const A = P(0, 0, 0), B = P(2, 0, 0), C = P(2, 2, 0), D = P(0, 2, 0);
      const A1 = P(0.5, 0.5, h), B1 = P(1.5, 0.5, h), C1 = P(1.5, 1.5, h), D1 = P(0.5, 1.5, h);
      F.seg(A, B, 'seg'); F.seg(B, C, 'seg'); F.seg(C, D, 'seg thin'); F.seg(D, A, 'seg thin');
      F.path([A1, B1, C1, D1], 'tri');
      F.seg(A, A1, 'seg'); F.seg(B, B1, 'seg'); F.seg(C, C1, 'seg'); F.seg(D, D1, 'seg thin');
      const O = P(1, 1, 0), O1 = P(1, 1, h); F.seg(O, O1, 'radius'); F.dot(O, 'center'); F.dot(O1, 'center');
      F.text(A, 'A', 'pt', -10, 10); F.text(B, 'B', 'pt', 10, 10); F.text(C, 'C', 'pt', 12, 0); F.text(D, 'D', 'pt', -12, -4);
      F.text(A1, 'A₁', 'pt small', -14, -4); F.text(B1, 'B₁', 'pt small', 10, -8); F.text(C1, 'C₁', 'pt small', 10, -8); F.text(D1, 'D₁', 'pt small', -10, -10);
      F.text(mid(A, B), '2', 'len', 0, 14); F.text(mid(A, A1), '2', 'len', -12, 0); F.text(mid(O, O1), 'h', 'len it', 10, 0);
      return F;
    },
    options: [
      { tex: "\\tfrac{7\\sqrt{14}}{6}", correct: true, why: {
        en: "$\\tfrac h3(4+1+2)$ with $h=\\tfrac{\\sqrt{14}}{2}$.",
        fr: "$\\tfrac h3(4+1+2)$ avec $h=\\tfrac{\\sqrt{14}}{2}$.",
        es: "$\\tfrac h3(4+1+2)$ con $h=\\tfrac{\\sqrt{14}}{2}$.",
        ja: "$h=\\tfrac{\\sqrt{14}}{2}$ で $\\tfrac h3(4+1+2)$。",
        zh: "$h=\\tfrac{\\sqrt{14}}{2}$，$\\tfrac h3(4+1+2)$。"
      } },
      { tex: "\\tfrac73\\cdot\\tfrac{\\sqrt{14}}{2}", correct: true, why: {
        en: "The same value, before multiplying out.",
        fr: "La même valeur, avant de développer.",
        es: "El mismo valor, sin simplificar.",
        ja: "同じ値を掛け算する前の形で。",
        zh: "同一个值，未化简。"
      } },
      { tex: "\\tfrac{14}{3}", correct: false, why: {
        en: "That takes the lateral edge $2$ as the height.",
        fr: "Cela prend l’arête latérale $2$ pour la hauteur.",
        es: "Toma la arista lateral $2$ como altura.",
        ja: "側辺 $2$ を高さと取り違えています。",
        zh: "把侧棱 $2$ 当成了高。"
      } },
      { tex: "\\tfrac{5\\sqrt{14}}{6}", correct: false, why: {
        en: "The middle term $\\sqrt{S_1S_2}=2$ is missing.",
        fr: "Il manque le terme $\\sqrt{S_1S_2}=2$.",
        es: "Falta el término $\\sqrt{S_1S_2}=2$.",
        ja: "中間の項 $\\sqrt{S_1S_2}=2$ が抜けています。",
        zh: "漏了中间项 $\\sqrt{S_1S_2}=2$。"
      } },
      { tex: "\\tfrac{7\\sqrt{14}}{2}", correct: false, why: {
        en: "The factor $\\tfrac13$ is missing.",
        fr: "Il manque le facteur $\\tfrac13$.",
        es: "Falta el factor $\\tfrac13$.",
        ja: "係数 $\\tfrac13$ が抜けています。",
        zh: "漏了系数 $\\tfrac13$。"
      } },
      { tex: "\\tfrac{7\\sqrt2}{3}", correct: false, why: {
        en: "That uses $h=\\sqrt2$, from the side instead of the diagonal.",
        fr: "Cela utilise $h=\\sqrt2$, avec le côté au lieu de la diagonale.",
        es: "Usa $h=\\sqrt2$, con el lado en vez de la diagonal.",
        ja: "対角線でなく辺で計算した $h=\\sqrt2$。",
        zh: "用的是 $h=\\sqrt2$，用了边而不是对角线。"
      } },
      { tex: "\\tfrac{\\sqrt{14}}{2}", correct: false, why: {
        en: "That is the height, not the volume.",
        fr: "C’est la hauteur, pas le volume.",
        es: "Es la altura, no el volumen.",
        ja: "それは高さで、体積ではない。",
        zh: "那是高，不是体积。"
      } },
      { tex: "\\tfrac{7\\sqrt7}{3}", correct: false, why: {
        en: "Comes from $h=\\sqrt7$, i.e. forgetting the half-difference.",
        fr: "Vient de $h=\\sqrt7$, en oubliant la demi-différence.",
        es: "Sale de $h=\\sqrt7$, olvidando la semidiferencia.",
        ja: "半分の差を忘れた $h=\\sqrt7$ から。",
        zh: "来自 $h=\\sqrt7$，忘了取一半的差。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The height",
          fr: "La hauteur",
          es: "La altura",
          ja: "高さ",
          zh: "高"
        },
        lines: ["AC=2\\sqrt2,\\quad A_1C_1=\\sqrt2,\\quad \\tfrac{AC-A_1C_1}{2}=\\tfrac{\\sqrt2}{2}", "h^2 = AA_1^2-\\left(\\tfrac{\\sqrt2}{2}\\right)^2 = 4-\\tfrac12=\\tfrac72 \\;\\Rightarrow\\; h=\\tfrac{\\sqrt{14}}{2}"],
        note: {
          en: "In the diagonal section the lateral edge, the height and the half-difference of the diagonals form a right triangle.",
          fr: "Dans la section diagonale, l’arête latérale, la hauteur et la demi-différence des diagonales forment un triangle rectangle.",
          es: "En la sección diagonal, la arista lateral, la altura y la semidiferencia de las diagonales forman un triángulo rectángulo.",
          ja: "対角断面で、側辺・高さ・対角線の差の半分が直角三角形をなす。",
          zh: "在对角截面中，侧棱、高和对角线差的一半构成直角三角形。"
        }
      },
      {
        title: {
          en: "Frustum volume",
          fr: "Volume du tronc",
          es: "Volumen del tronco",
          ja: "角錐台の体積",
          zh: "棱台体积"
        },
        lines: ["V=\\tfrac h3\\left(S_1+S_2+\\sqrt{S_1S_2}\\right)=\\tfrac{\\sqrt{14}}{6}(4+1+2)=\\boxed{\\tfrac{7\\sqrt{14}}{6}}"],
        note: {
          en: "$S_1=4$ and $S_2=1$ are the areas of the two squares.",
          fr: "$S_1=4$ et $S_2=1$ sont les aires des deux carrés.",
          es: "$S_1=4$ y $S_2=1$ son las áreas de los dos cuadrados.",
          ja: "$S_1=4$、$S_2=1$ は2つの正方形の面積。",
          zh: "$S_1=4$、$S_2=1$ 是两个正方形的面积。"
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
          en: "Two options are the same value.",
          fr: "Deux options sont la même valeur.",
          es: "Dos opciones son el mismo valor.",
          ja: "2つの選択肢は同じ値です。",
          zh: "有两个选项是同一个值。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
