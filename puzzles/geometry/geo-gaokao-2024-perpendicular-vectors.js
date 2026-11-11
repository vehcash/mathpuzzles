/* geometry · b perpendicular to b − 4a
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-perpendicular-vectors",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 3",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 3",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 3",
        ja: "2024年 中国・高考 新課程標準I卷 第3問",
        zh: "2024年高考数学新课标I卷 第3题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "b perpendicular to b − 4a",
      fr: "b orthogonal à b − 4a",
      es: "b perpendicular a b − 4a",
      ja: "b と b − 4a が垂直",
      zh: "b 垂直于 b − 4a"
    },
    statement: {
      en: "Let $\\vec a=(0,1)$ and $\\vec b=(2,x)$. If $\\vec b\\perp(\\vec b-4\\vec a)$, <b>which of the following equal $x$?</b>",
      fr: "Soit $\\vec a=(0,1)$ et $\\vec b=(2,x)$. Si $\\vec b\\perp(\\vec b-4\\vec a)$, <b>lesquelles des valeurs suivantes sont égales à $x$ ?</b>",
      es: "Sean $\\vec a=(0,1)$ y $\\vec b=(2,x)$. Si $\\vec b\\perp(\\vec b-4\\vec a)$, <b>¿cuáles de los siguientes valores son iguales a $x$?</b>",
      ja: "$\\vec a=(0,1)$, $\\vec b=(2,x)$ とし、$\\vec b\\perp(\\vec b-4\\vec a)$ とします。<b>$x$ に等しいものはどれですか？</b>",
      zh: "已知 $\\vec a=(0,1)$，$\\vec b=(2,x)$，且 $\\vec b\\perp(\\vec b-4\\vec a)$。<b>下列哪些等于 $x$？</b>"
    },
    figureText: {
      en: "The vector a from the origin to (0, 1) and the dashed vertical line x = 2, where the tip of b must lie.",
      fr: "Le vecteur a de l’origine à (0, 1) et la droite verticale pointillée x = 2, où se trouve l’extrémité de b.",
      es: "El vector a del origen a (0, 1) y la recta vertical discontinua x = 2, donde está el extremo de b.",
      ja: "原点から (0, 1) へのベクトル a と、b の先端がのる点線 x = 2。",
      zh: "从原点到 (0, 1) 的向量 a，以及 b 的终点所在的虚线 x = 2。"
    },
    hint: {
      en: "$\\vec b-4\\vec a=(2,\\,x-4)$. Set the dot product with $\\vec b$ to zero.",
      fr: "$\\vec b-4\\vec a=(2,\\,x-4)$. Annulez le produit scalaire avec $\\vec b$.",
      es: "$\\vec b-4\\vec a=(2,\\,x-4)$. Iguala a cero el producto escalar con $\\vec b$.",
      ja: "$\\vec b-4\\vec a=(2,\\,x-4)$。$\\vec b$ との内積を $0$ に。",
      zh: "$\\vec b-4\\vec a=(2,\\,x-4)$，令它与 $\\vec b$ 的数量积为 $0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 5.8, scale: 46, pad: 16 });
      const T = F.T = axes(F, -1.0, 3.4, -2.8, 3.0);
      F.seg(T([2, -2.7]), T([2, 2.9]), 'seg thin dashc'); F.text(T([2, -2.4]), 'x = 2', 'len small', 26, 0);
      arrow(F, T([0, 0]), T([0, 1]), 'vec'); F.text(T([0, 1]), 'a', 'pt', -12, 0);
      F.reveal = () => {
      arrow(F, T([0, 0]), T([2, 2]), 'vec two'); F.text(T([2, 2]), 'b', 'pt', 12, -4);
      arrow(F, T([0, 0]), T([2, -2]), 'vec two'); F.text(T([2, -2]), 'b − 4a', 'len small', 32, 8);
      };
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$\\vec b=(2,2)$, $\\vec b-4\\vec a=(2,-2)$, and $(2,2)\\cdot(2,-2)=0$.",
        fr: "$\\vec b=(2,2)$, $\\vec b-4\\vec a=(2,-2)$, and $(2,2)\\cdot(2,-2)=0$.",
        es: "$\\vec b=(2,2)$, $\\vec b-4\\vec a=(2,-2)$, and $(2,2)\\cdot(2,-2)=0$.",
        ja: "$\\vec b=(2,2)$, $\\vec b-4\\vec a=(2,-2)$, and $(2,2)\\cdot(2,-2)=0$.",
        zh: "$\\vec b=(2,2)$, $\\vec b-4\\vec a=(2,-2)$, and $(2,2)\\cdot(2,-2)=0$."
      } },
      { tex: "\\sqrt4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-2", correct: false, why: {
        en: "Then $\\vec b-4\\vec a=(2,-6)$ and the dot product is $4+12\\ne0$.",
        fr: "Alors $\\vec b-4\\vec a=(2,-6)$ et le produit scalaire vaut $4+12\\ne0$.",
        es: "Entonces $\\vec b-4\\vec a=(2,-6)$ y el producto es $4+12\\ne0$.",
        ja: "このとき $\\vec b-4\\vec a=(2,-6)$ で内積は $4+12\\ne0$。",
        zh: "此时 $\\vec b-4\\vec a=(2,-6)$，数量积 $4+12\\ne0$。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4", correct: false, why: {
        en: "$x=4$ makes $\\vec b-4\\vec a=(2,0)$, which is not perpendicular to $(2,4)$.",
        fr: "$x=4$ donne $\\vec b-4\\vec a=(2,0)$, non orthogonal à $(2,4)$.",
        es: "$x=4$ da $\\vec b-4\\vec a=(2,0)$, no perpendicular a $(2,4)$.",
        ja: "$x=4$ だと $\\vec b-4\\vec a=(2,0)$ で $(2,4)$ と垂直でない。",
        zh: "$x=4$ 时 $\\vec b-4\\vec a=(2,0)$，与 $(2,4)$ 不垂直。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The second vector",
          fr: "Le second vecteur",
          es: "El segundo vector",
          ja: "もう1つのベクトル",
          zh: "第二个向量"
        },
        lines: ["\\vec b-4\\vec a=(2,x)-(0,4)=(2,\\,x-4)"],
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
          en: "Dot product zero",
          fr: "Produit scalaire nul",
          es: "Producto escalar cero",
          ja: "内積 0",
          zh: "数量积为零"
        },
        lines: ["2\\cdot2+x(x-4)=x^2-4x+4=(x-2)^2=0", "x=\\boxed{2}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "A double root: there is exactly one value.",
          fr: "Racine double : une seule valeur.",
          es: "Raíz doble: hay un solo valor.",
          ja: "重解なので値は1つ。",
          zh: "二重根：只有一个值。"
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
