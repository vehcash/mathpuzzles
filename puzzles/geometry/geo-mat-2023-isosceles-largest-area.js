/* geometry · The isosceles triangle with the most area
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2023-isosceles-largest-area",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1H",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1H",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1H",
        zh: "牛津大学数学入学考试 MAT 2023 第 1H 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The isosceles triangle with the most area",
      fr: "Le triangle isocèle de plus grande aire",
      es: "El triángulo isósceles de mayor área",
      ja: "面積最大の二等辺三角形",
      zh: "面积最大的等腰三角形"
    },
    statement: {
      en: "Isosceles triangles have two sides of length $10$ and a base of $1$, $5$, $10$, $15$ or $19$. <b>Which of the following are true?</b>",
      fr: "Des triangles isocèles ont deux côtés de longueur $10$ et une base de $1$, $5$, $10$, $15$ ou $19$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Unos triángulos isósceles tienen dos lados de longitud $10$ y base $1$, $5$, $10$, $15$ o $19$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "等しい2辺が $10$、底辺が $1$, $5$, $10$, $15$, $19$ の二等辺三角形を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "等腰三角形两腰为 $10$，底边为 $1$、$5$、$10$、$15$ 或 $19$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two sides of length 10 hinged at the apex, opened to different angles.",
      fr: "Deux côtés de longueur 10 articulés au sommet, ouverts selon différents angles.",
      es: "Dos lados de longitud 10 unidos en el vértice, abiertos a distintos ángulos.",
      ja: "頂点でつながった長さ 10 の2辺を開いた様子。",
      zh: "顶点处铰接的两条长 10 的边，张开不同角度。"
    },
    hint: {
      en: "Area $=\\tfrac12\\cdot10\\cdot10\\sin\\theta$, where $\\theta$ is the apex angle. Which base makes $\\theta$ closest to $90^\\circ$?",
      fr: "Aire $=\\tfrac12\\cdot10\\cdot10\\sin\\theta$, $\\theta$ angle au sommet. Quelle base rend $\\theta$ le plus proche de $90^\\circ$ ?",
      es: "Área $=\\tfrac12\\cdot10\\cdot10\\sin\\theta$, con $\\theta$ el ángulo en el vértice. ¿Qué base da $\\theta$ más cercano a $90^\\circ$?",
      ja: "面積 $=\\tfrac12\\cdot10\\cdot10\\sin\\theta$（$\\theta$ は頂角）。$\\theta$ が $90^\\circ$ に最も近い底辺は？",
      zh: "面积 $=\\tfrac12\\cdot10\\cdot10\\sin\\theta$，$\\theta$ 为顶角。哪个底边使 $\\theta$ 最接近 $90^\\circ$？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.8, scale: 50, pad: 16 });
      const A = [2.5, 2.5], r = 2.3;
      [10, 60, 90, 120].forEach((d, k) => { const t = d * Math.PI / 180 / 2; F.seg(A, [A[0] - r * Math.sin(t), A[1] - r * Math.cos(t)], k === 2 ? 'hl pink' : 'seg thin'); F.seg(A, [A[0] + r * Math.sin(t), A[1] - r * Math.cos(t)], k === 2 ? 'hl pink' : 'seg thin'); });
      F.text(A, 'θ', 'pt', 0, -10);
      F.reveal = () => {
      F.text([2.5, 0.3], 'base 10√2 ≈ 14.1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "base 10√2 ≈ 14.1": {"fr": "base 10√2 ≈ 14,1", "es": "base 10√2 ≈ 14,1", "ja": "底辺 10√2 ≈ 14.1", "zh": "底边 10√2 ≈ 14.1"},
      "the base-15 triangle has the largest area": {"fr": "le triangle de base 15 a la plus grande aire", "es": "el triángulo de base 15 tiene el área máxima", "ja": "底辺 15 の三角形の面積が最大", "zh": "底边 15 的三角形面积最大"},
      "the base-10 triangle has more area than the base-19 one": {"fr": "le triangle de base 10 a plus d’aire que celui de base 19", "es": "el de base 10 tiene más área que el de base 19", "ja": "底辺 10 は底辺 19 より面積が大きい", "zh": "底边 10 的比底边 19 的面积大"},
      "the base-19 triangle has the largest area": {"fr": "le triangle de base 19 a la plus grande aire", "es": "el de base 19 tiene el área máxima", "ja": "底辺 19 の三角形の面積が最大", "zh": "底边 19 的面积最大"},
      "the equilateral triangle has the largest area": {"fr": "le triangle équilatéral a la plus grande aire", "es": "el equilátero tiene el área máxima", "ja": "正三角形の面積が最大", "zh": "正三角形面积最大"},
      "the longer the base, the larger the area": {"fr": "plus la base est longue, plus l’aire est grande", "es": "cuanto más larga la base, mayor el área", "ja": "底辺が長いほど面積が大きい", "zh": "底边越长面积越大"},
      "the base-1 and base-19 triangles have equal area": {"fr": "les triangles de base 1 et 19 ont la même aire", "es": "los de base 1 y 19 tienen igual área", "ja": "底辺 1 と 19 の面積は等しい", "zh": "底边 1 与 19 的面积相等"},
      "the maximum possible area is": {"fr": "l’aire maximale possible est", "es": "el área máxima posible es", "ja": "面積の最大値は", "zh": "面积最大可能值为"},
      "the base-5 triangle has the largest area": {"fr": "le triangle de base 5 a la plus grande aire", "es": "el de base 5 tiene el área máxima", "ja": "底辺 5 の三角形の面積が最大", "zh": "底边 5 的面积最大"},
      "is the closest": {"fr": "est la plus proche", "es": "es la más cercana", "ja": "が最も近い", "zh": "最接近"}
    },
    options: [
      { tex: "\\text{the base-15 triangle has the largest area}", correct: true, why: {
        en: "Area $=\\tfrac b4\\sqrt{400-b^2}$, about $49.6$ for $b=15$.",
        fr: "Aire $=\\tfrac b4\\sqrt{400-b^2}$, environ $49{,}6$ pour $b=15$.",
        es: "Área $=\\tfrac b4\\sqrt{400-b^2}$, unos $49{,}6$ para $b=15$.",
        ja: "面積 $=\\tfrac b4\\sqrt{400-b^2}$。$b=15$ で約 $49.6$。",
        zh: "面积 $=\\tfrac b4\\sqrt{400-b^2}$，$b=15$ 时约 $49.6$。"
      } },
      { tex: "\\text{the base-10 triangle has more area than the base-19 one}", correct: true, why: {
        en: "$\\approx43.3$ against $\\approx29.7$.",
        fr: "$\\approx43{,}3$ contre $\\approx29{,}7$.",
        es: "$\\approx43{,}3$ frente a $\\approx29{,}7$.",
        ja: "$\\approx43.3$ 対 $\\approx29.7$。",
        zh: "约 $43.3$ 对约 $29.7$。"
      } },
      { tex: "\\text{the base-19 triangle has the largest area}", correct: false, why: {
        en: "Nearly flat: apex angle about $144^\\circ$.",
        fr: "Presque aplati : angle au sommet d’environ $144^\\circ$.",
        es: "Casi plano: ángulo en el vértice de unos $144^\\circ$.",
        ja: "ほぼつぶれていて頂角は約 $144^\\circ$。",
        zh: "几乎压扁，顶角约 $144^\\circ$。"
      } },
      { tex: "\\text{the equilateral triangle has the largest area}", correct: false, why: {
        en: "Its apex angle is $60^\\circ$, further from $90^\\circ$ than the base-15 one.",
        fr: "Son angle au sommet vaut $60^\\circ$, plus loin de $90^\\circ$.",
        es: "Su ángulo es $60^\\circ$, más lejos de $90^\\circ$.",
        ja: "頂角 $60^\\circ$ は $90^\\circ$ から遠い。",
        zh: "顶角 $60^\\circ$，离 $90^\\circ$ 更远。"
      } },
      { tex: "\\text{the longer the base, the larger the area}", correct: false, why: {
        en: "Area grows only until the base reaches $10\\sqrt2$.",
        fr: "L’aire croît seulement jusqu’à une base de $10\\sqrt2$.",
        es: "El área crece solo hasta una base de $10\\sqrt2$.",
        ja: "底辺が $10\\sqrt2$ までしか増えない。",
        zh: "底边超过 $10\\sqrt2$ 后面积减小。"
      } },
      { tex: "\\text{the base-1 and base-19 triangles have equal area}", correct: false, why: {
        en: "$\\approx5.0$ against $\\approx29.7$.",
        fr: "$\\approx5{,}0$ contre $\\approx29{,}7$.",
        es: "$\\approx5{,}0$ frente a $\\approx29{,}7$.",
        ja: "$\\approx5.0$ 対 $\\approx29.7$。",
        zh: "约 $5.0$ 对约 $29.7$。"
      } },
      { tex: "\\text{the maximum possible area is}\\ 100", correct: false, why: {
        en: "The maximum is $\\tfrac12\\cdot10\\cdot10=50$, at a right angle.",
        fr: "Le maximum est $\\tfrac12\\cdot10\\cdot10=50$, à angle droit.",
        es: "El máximo es $\\tfrac12\\cdot10\\cdot10=50$, con ángulo recto.",
        ja: "最大は直角のとき $50$。",
        zh: "最大值为直角时的 $50$。"
      } },
      { tex: "\\text{the base-5 triangle has the largest area}", correct: false, why: {
        en: "$\\approx24.2$.",
        fr: "$\\approx24{,}2$.",
        es: "$\\approx24{,}2$.",
        ja: "$\\approx24.2$。",
        zh: "约 $24.2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Area by the apex angle",
          fr: "Aire par l’angle au sommet",
          es: "Área por el ángulo del vértice",
          ja: "頂角で面積",
          zh: "用顶角求面积"
        },
        lines: ["S=\\tfrac12\\cdot10\\cdot10\\sin\\theta=50\\sin\\theta\\ \\le50"],
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
          en: "Best base",
          fr: "Meilleure base",
          es: "Mejor base",
          ja: "最良の底辺",
          zh: "最佳底边"
        },
        lines: ["\\theta=90^\\circ\\iff b=10\\sqrt2\\approx14.14;\\quad b=15\\ \\text{is the closest}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Check: $S(b)=\\tfrac b4\\sqrt{400-b^2}$ gives $5.0,\\ 24.2,\\ 43.3,\\ 49.6,\\ 29.7$.",
          fr: "Vérification : $S(b)=\\tfrac b4\\sqrt{400-b^2}$ donne $5{,}0$ ; $24{,}2$ ; $43{,}3$ ; $49{,}6$ ; $29{,}7$.",
          es: "Comprobación: $S(b)=\\tfrac b4\\sqrt{400-b^2}$ da $5{,}0$; $24{,}2$; $43{,}3$; $49{,}6$; $29{,}7$.",
          ja: "確認：$S(b)=\\tfrac b4\\sqrt{400-b^2}$ は $5.0, 24.2, 43.3, 49.6, 29.7$。",
          zh: "验证：$S(b)=\\tfrac b4\\sqrt{400-b^2}$ 依次为 $5.0,24.2,43.3,49.6,29.7$。"
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
