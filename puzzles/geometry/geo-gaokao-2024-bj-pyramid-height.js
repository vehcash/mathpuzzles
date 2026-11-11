/* geometry · How tall is the pyramid?
   Gaokao 2024, Beijing paper (北京卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-bj-pyramid-height",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 8",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 8",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 8",
        ja: "2024年 中国・高考 北京卷 第8問",
        zh: "2024年高考数学北京卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "How tall is the pyramid?",
      fr: "Quelle est la hauteur de la pyramide ?",
      es: "¿Qué altura tiene la pirámide?",
      ja: "四角錐の高さは？",
      zh: "棱锥有多高？"
    },
    statement: {
      en: "In the pyramid $P\\text{-}ABCD$ the base $ABCD$ is a square of side $4$, $PA=PB=4$ and $PC=PD=2\\sqrt2$. <b>Which of the following equal the height of the pyramid?</b>",
      fr: "Dans la pyramide $P\\text{-}ABCD$, la base $ABCD$ est un carré de côté $4$, $PA=PB=4$ et $PC=PD=2\\sqrt2$. <b>Lesquelles des valeurs suivantes sont égales à la hauteur de la pyramide ?</b>",
      es: "En la pirámide $P\\text{-}ABCD$ la base $ABCD$ es un cuadrado de lado $4$, $PA=PB=4$ y $PC=PD=2\\sqrt2$. <b>¿Cuáles de los siguientes valores son iguales a la altura de la pirámide?</b>",
      ja: "四角錐 $P\\text{-}ABCD$ の底面 $ABCD$ は1辺 $4$ の正方形で、$PA=PB=4$、$PC=PD=2\\sqrt2$ です。<b>この四角錐の高さに等しいものはどれですか？</b>",
      zh: "四棱锥 $P\\text{-}ABCD$ 的底面 $ABCD$ 是边长为 $4$ 的正方形，$PA=PB=4$，$PC=PD=2\\sqrt2$。<b>下列哪些等于该棱锥的高？</b>"
    },
    figureText: {
      en: "The cross-section through P and the midpoints M of AB and N of CD: a triangle with PM = 2√3, PN = 2 and MN = 4.",
      fr: "La section passant par P et les milieux M de AB et N de CD : un triangle avec PM = 2√3, PN = 2 et MN = 4.",
      es: "La sección por P y los puntos medios M de AB y N de CD: un triángulo con PM = 2√3, PN = 2 y MN = 4.",
      ja: "P と AB の中点 M、CD の中点 N を通る断面：PM = 2√3、PN = 2、MN = 4 の三角形。",
      zh: "过 P 及 AB 中点 M、CD 中点 N 的截面：PM = 2√3，PN = 2，MN = 4 的三角形。"
    },
    hint: {
      en: "By symmetry P lies above the line $MN$ joining the midpoints of $AB$ and $CD$. Find $PM$ and $PN$ from the two isosceles faces.",
      fr: "Par symétrie, $P$ est au-dessus de la droite $MN$ joignant les milieux de $AB$ et $CD$. Calculez $PM$ et $PN$ dans les deux faces isocèles.",
      es: "Por simetría $P$ está sobre la recta $MN$ que une los puntos medios de $AB$ y $CD$. Calcula $PM$ y $PN$ en las dos caras isósceles.",
      ja: "対称性から $P$ は $AB$, $CD$ の中点を結ぶ $MN$ の真上。2つの二等辺三角形の面から $PM$, $PN$ を求める。",
      zh: "由对称性，$P$ 在 $AB$、$CD$ 中点连线 $MN$ 的正上方。由两个等腰面求 $PM$、$PN$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 2.8, scale: 64, pad: 18 });
      const M = [0.5, 0.4], Nn = [4.5, 0.4], P = [0.5 + 3, 0.4 + Math.sqrt(3)];
      F.seg(M, Nn, 'seg'); F.seg(M, P, 'seg'); F.seg(Nn, P, 'seg');
      F.text(M, 'M', 'pt', -10, 10); F.text(Nn, 'N', 'pt', 10, 10); F.text(P, 'P', 'pt', 0, -12);
      F.text([2.5, 0.4], '4', 'len small', 0, 14); F.text([2.0, 0.4 + Math.sqrt(3) / 2], '2√3', 'len small', -16, -6); F.text([4.0, 0.4 + Math.sqrt(3) / 2], '2', 'len small', 12, -4);
      F.reveal = () => {
      F.seg(P, [P[0], 0.4], 'hl pink'); F.text([P[0], 0.4 + Math.sqrt(3) / 2], 'h', 'pt', -10, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "equilateral": {"fr": "équilatéral", "es": "equilátero", "ja": "正三角形", "zh": "正三角形"}
    },
    options: [
      { tex: "\\sqrt3", correct: true, why: {
        en: "$PM^2+PN^2=12+4=16=MN^2$: right angle at $P$, and $h=\\tfrac{PM\\cdot PN}{MN}=\\tfrac{4\\sqrt3}{4}$.",
        fr: "$PM^2+PN^2=12+4=16=MN^2$ : angle droit en $P$, et $h=\\tfrac{PM\\cdot PN}{MN}=\\tfrac{4\\sqrt3}{4}$.",
        es: "$PM^2+PN^2=12+4=16=MN^2$: ángulo recto en $P$, y $h=\\tfrac{PM\\cdot PN}{MN}=\\tfrac{4\\sqrt3}{4}$.",
        ja: "$PM^2+PN^2=12+4=16=MN^2$ で $P$ が直角、$h=\\tfrac{PM\\cdot PN}{MN}=\\tfrac{4\\sqrt3}{4}$。",
        zh: "$PM^2+PN^2=12+4=16=MN^2$，$P$ 处为直角，$h=\\tfrac{PM\\cdot PN}{MN}=\\tfrac{4\\sqrt3}{4}$。"
      } },
      { tex: "\\tfrac{2\\sqrt3\\cdot2}{4}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2\\sqrt3", correct: false, why: {
        en: "That is the slant height $PM$ of the equilateral face.",
        fr: "C’est l’apothème $PM$ de la face équilatérale.",
        es: "Es la apotema $PM$ de la cara equilátera.",
        ja: "正三角形の面の高さ $PM$。",
        zh: "那是正三角形侧面的高 $PM$。"
      } },
      { tex: "\\tfrac{\\sqrt3}{2}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is the horizontal distance from $M$ to the foot of the height.",
        fr: "C’est la distance horizontale de $M$ au pied de la hauteur.",
        es: "Es la distancia horizontal de $M$ al pie de la altura.",
        ja: "$M$ から垂線の足までの水平距離。",
        zh: "那是 $M$ 到垂足的水平距离。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The two faces",
          fr: "Les deux faces",
          es: "Las dos caras",
          ja: "2つの面",
          zh: "两个面"
        },
        lines: ["\\triangle PAB\\ \\text{equilateral}:\\ PM=2\\sqrt3,\\qquad \\triangle PCD:\\ PN=\\sqrt{8-4}=2"],
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
          en: "A right triangle",
          fr: "Un triangle rectangle",
          es: "Un triángulo rectángulo",
          ja: "直角三角形",
          zh: "直角三角形"
        },
        lines: ["PM^2+PN^2=12+4=16=MN^2\\ \\Rightarrow\\ \\angle MPN=90^\\circ"],
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
        lines: ["h=\\frac{PM\\cdot PN}{MN}=\\frac{2\\sqrt3\\cdot2}{4}=\\boxed{\\sqrt3}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The plane $PMN$ is perpendicular to the base because it is the plane of symmetry.",
          fr: "Le plan $PMN$ est perpendiculaire à la base : c’est le plan de symétrie.",
          es: "El plano $PMN$ es perpendicular a la base: es el plano de simetría.",
          ja: "平面 $PMN$ は対称面なので底面に垂直。",
          zh: "平面 $PMN$ 是对称面，故垂直于底面。"
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
