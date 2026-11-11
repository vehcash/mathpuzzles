/* geometry · Two touching circles in opposite corners
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2023-two-circles-in-square",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2023 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Two touching circles in opposite corners",
      fr: "Deux cercles tangents dans des coins opposés",
      es: "Dos círculos tangentes en esquinas opuestas",
      ja: "対角の隅で接する2円",
      zh: "对角上相切的两个圆"
    },
    statement: {
      en: "Inside a unit square $ABCD$, one circle touches $AB$ and $BC$, another touches $CD$ and $DA$, and the circles touch each other. The larger has $10$ times the area of the smaller. <b>Which of the following equal the sum of the radii?</b>",
      fr: "Dans un carré unité $ABCD$, un cercle est tangent à $AB$ et $BC$, un autre à $CD$ et $DA$, et les cercles sont tangents entre eux. Le grand a une aire $10$ fois celle du petit. <b>Lesquelles des valeurs suivantes sont égales à la somme des rayons ?</b>",
      es: "En un cuadrado unidad $ABCD$, un círculo es tangente a $AB$ y $BC$, otro a $CD$ y $DA$, y son tangentes entre sí. El mayor tiene $10$ veces el área del menor. <b>¿Cuáles de los siguientes valores son iguales a la suma de los radios?</b>",
      ja: "単位正方形 $ABCD$ の中に、$AB$ と $BC$ に接する円と $CD$ と $DA$ に接する円があり、互いに接しています。大きい円の面積は小さい円の $10$ 倍です。<b>半径の和に等しいものはどれですか？</b>",
      zh: "单位正方形 $ABCD$ 内，一圆与 $AB$、$BC$ 相切，另一圆与 $CD$、$DA$ 相切，两圆外切，大圆面积是小圆的 $10$ 倍。<b>下列哪些等于两半径之和？</b>"
    },
    figureText: {
      en: "The unit square with its diagonal BD; one circle sits in corner B, a larger one in corner D, touching on the diagonal.",
      fr: "Le carré unité et sa diagonale BD ; un cercle dans le coin B, un plus grand dans le coin D, tangents sur la diagonale.",
      es: "El cuadrado unidad con su diagonal BD; un círculo en la esquina B y otro mayor en la D, tangentes sobre la diagonal.",
      ja: "単位正方形と対角線 BD。隅 B に小円、隅 D に大円があり対角線上で接する。",
      zh: "单位正方形与对角线 BD；角 B 处一小圆，角 D 处一大圆，在对角线上相切。"
    },
    hint: {
      en: "Both centres lie on the diagonal $BD$. A circle of radius $r$ in a corner has its centre $r\\sqrt2$ from that corner.",
      fr: "Les deux centres sont sur la diagonale $BD$. Un cercle de rayon $r$ dans un coin a son centre à $r\\sqrt2$ de ce coin.",
      es: "Ambos centros están en la diagonal $BD$. Un círculo de radio $r$ en una esquina tiene el centro a $r\\sqrt2$ de ella.",
      ja: "2つの中心は対角線 $BD$ 上。隅にある半径 $r$ の円の中心は隅から $r\\sqrt2$。",
      zh: "两圆心都在对角线 $BD$ 上；角落半径为 $r$ 的圆，圆心距角 $r\\sqrt2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 90, pad: 16 });
      const P = ([x, y]) => [0.2 + 3 * x, 0.2 + 3 * y];
      F.path([P([0, 0]), P([1, 0]), P([1, 1]), P([0, 1])], 'seg', 'base', true); F.seg(P([1, 0]), P([0, 1]), 'seg thin dashc');
      const S = 2 - Math.SQRT2, r = S / (1 + Math.sqrt(10)), R = S - r;
      const C = (cx, cy, rr) => { const p = []; for (let k = 0; k <= 60; k++) { const t = k * Math.PI / 30; p.push(P([cx + rr * Math.cos(t), cy + rr * Math.sin(t)])); } F.path(p, 'graph', 'base', true); };
      C(1 - r, r, r); C(R, 1 - R, R);
      [[[0, 0], 'A', -10, 10], [[1, 0], 'B', 10, 10], [[1, 1], 'C', 10, -6], [[0, 1], 'D', -10, -6]].forEach(([Q, t, dx, dy]) => F.text(P(Q), t, 'pt', dx, dy));
      F.reveal = () => {
      F.seg(P([R, 1 - R]), P([0, 1]), 'hl pink'); F.seg(P([1 - r, r]), P([1, 0]), 'hl pink'); F.text(P([R / 2, 1 - R / 2]), 'R√2', 'len small', 20, 8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "R√2": {"fr": "R√2", "es": "R√2", "ja": "R√2", "zh": "R√2"}
    },
    options: [
      { tex: "2-\\sqrt2", correct: true, why: {
        en: "$\\sqrt2=(r+R)(1+\\sqrt2)$, so $r+R=\\tfrac{\\sqrt2}{1+\\sqrt2}=2-\\sqrt2$.",
        fr: "$\\sqrt2=(r+R)(1+\\sqrt2)$, donc $r+R=\\tfrac{\\sqrt2}{1+\\sqrt2}=2-\\sqrt2$.",
        es: "$\\sqrt2=(r+R)(1+\\sqrt2)$, así que $r+R=\\tfrac{\\sqrt2}{1+\\sqrt2}=2-\\sqrt2$.",
        ja: "$\\sqrt2=(r+R)(1+\\sqrt2)$ より $r+R=2-\\sqrt2$。",
        zh: "$\\sqrt2=(r+R)(1+\\sqrt2)$，故 $r+R=2-\\sqrt2$。"
      } },
      { tex: "\\tfrac{\\sqrt2}{1+\\sqrt2}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1+\\tfrac{\\sqrt{10}}8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt2}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt{\\tfrac25}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt{10}-1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt2-1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "1", correct: false, why: {
        en: "Two circles of total radius $1$ would not fit.",
        fr: "Deux cercles de rayons totaux $1$ ne tiendraient pas.",
        es: "Dos círculos con radios que suman $1$ no cabrían.",
        ja: "半径の和 $1$ では入らない。",
        zh: "半径和为 $1$ 放不下。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Along the diagonal",
          fr: "Le long de la diagonale",
          es: "A lo largo de la diagonal",
          ja: "対角線に沿って",
          zh: "沿对角线"
        },
        lines: ["|BD|=\\sqrt2=r\\sqrt2+(r+R)+R\\sqrt2=(r+R)(1+\\sqrt2)"],
        note: {
          en: "The area ratio $10$ is not even needed for the sum.",
          fr: "Le rapport d’aires $10$ n’est même pas nécessaire pour la somme.",
          es: "La razón de áreas $10$ ni siquiera hace falta para la suma.",
          ja: "和を求めるのに面積比 $10$ は不要。",
          zh: "求和甚至不需要面积比 $10$。"
        }
      },
      {
        title: {
          en: "Simplify",
          fr: "Simplifier",
          es: "Simplificar",
          ja: "簡単に",
          zh: "化简"
        },
        lines: ["r+R=\\frac{\\sqrt2}{1+\\sqrt2}=\\frac{\\sqrt2(\\sqrt2-1)}{1}=\\boxed{2-\\sqrt2}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
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
