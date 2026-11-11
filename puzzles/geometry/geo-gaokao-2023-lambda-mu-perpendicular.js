/* geometry · Two combinations at right angles
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-lambda-mu-perpendicular",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 3",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 3",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 3",
        ja: "2023年 中国・高考 新課程標準I卷 第3問",
        zh: "2023年高考数学新课标I卷 第3题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Two combinations at right angles",
      fr: "Deux combinaisons orthogonales",
      es: "Dos combinaciones perpendiculares",
      ja: "直交する2つの1次結合",
      zh: "两个互相垂直的组合"
    },
    statement: {
      en: "$\\vec a=(1,1)$ and $\\vec b=(1,-1)$. If $(\\vec a+\\lambda\\vec b)\\perp(\\vec a+\\mu\\vec b)$, <b>which of the following must hold?</b>",
      fr: "$\\vec a=(1,1)$ et $\\vec b=(1,-1)$. Si $(\\vec a+\\lambda\\vec b)\\perp(\\vec a+\\mu\\vec b)$, <b>lesquelles des relations suivantes sont forcément vraies ?</b>",
      es: "$\\vec a=(1,1)$ y $\\vec b=(1,-1)$. Si $(\\vec a+\\lambda\\vec b)\\perp(\\vec a+\\mu\\vec b)$, <b>¿cuáles de las siguientes relaciones se cumplen necesariamente?</b>",
      ja: "$\\vec a=(1,1)$、$\\vec b=(1,-1)$ で $(\\vec a+\\lambda\\vec b)\\perp(\\vec a+\\mu\\vec b)$ のとき、<b>必ず成り立つものはどれですか？</b>",
      zh: "已知 $\\vec a=(1,1)$，$\\vec b=(1,-1)$，若 $(\\vec a+\\lambda\\vec b)\\perp(\\vec a+\\mu\\vec b)$，<b>下列哪些一定成立？</b>"
    },
    figureText: {
      en: "The vectors a = (1, 1) and b = (1, −1) drawn from the origin.",
      fr: "Les vecteurs a = (1, 1) et b = (1, −1) tracés depuis l’origine.",
      es: "Los vectores a = (1, 1) y b = (1, −1) desde el origen.",
      ja: "原点からのベクトル a = (1, 1) と b = (1, −1)。",
      zh: "从原点出发的向量 a = (1, 1) 与 b = (1, −1)。"
    },
    hint: {
      en: "Expand the dot product. What are $|\\vec a|^2$, $|\\vec b|^2$ and $\\vec a\\cdot\\vec b$?",
      fr: "Développez le produit scalaire. Que valent $|\\vec a|^2$, $|\\vec b|^2$ et $\\vec a\\cdot\\vec b$ ?",
      es: "Desarrolla el producto escalar. ¿Cuánto valen $|\\vec a|^2$, $|\\vec b|^2$ y $\\vec a\\cdot\\vec b$?",
      ja: "内積を展開。$|\\vec a|^2$、$|\\vec b|^2$、$\\vec a\\cdot\\vec b$ は？",
      zh: "展开数量积。$|\\vec a|^2$、$|\\vec b|^2$、$\\vec a\\cdot\\vec b$ 各是多少？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -1.0, 4.0, -2.0, 2.6);
      arrow(F, T([0, 0]), T([1, 1])); F.text(T([1, 1]), 'a', 'pt', -4, -12);
      arrow(F, T([0, 0]), T([1, -1])); F.text(T([1, -1]), 'b', 'pt', 10, 8);
      F.reveal = () => {
      arrow(F, T([0, 0]), T([3, -1]), 'vec two'); F.text(T([3, -1]), 'a + 2b', 'len small', 26, 6);
      arrow(F, T([0, 0]), T([0.5, 1.5]), 'vec two'); F.text(T([0.5, 1.5]), 'a − ½b', 'len small', 8, -12);
      };
      return F;
    },
    options: [
      { tex: "\\lambda\\mu=-1", correct: true, why: {
        en: "$2+2\\lambda\\mu=0$.",
        fr: "$2+2\\lambda\\mu=0$.",
        es: "$2+2\\lambda\\mu=0$.",
        ja: "$2+2\\lambda\\mu=0$。",
        zh: "$2+2\\lambda\\mu=0$。"
      } },
      { tex: "\\lambda\\mu+1=0", correct: true, why: {
        en: "The same relation, rearranged.",
        fr: "La même relation, réarrangée.",
        es: "La misma relación, reordenada.",
        ja: "同じ関係式の移項。",
        zh: "同一关系，移项而已。"
      } },
      { tex: "\\lambda\\mu=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda+\\mu=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda+\\mu=-1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda+\\mu=0", correct: false, why: {
        en: "$\\lambda=2,\\ \\mu=-\\tfrac12$ works and $\\lambda+\\mu\\ne0$.",
        fr: "$\\lambda=2,\\ \\mu=-\\tfrac12$ convient et $\\lambda+\\mu\\ne0$.",
        es: "$\\lambda=2,\\ \\mu=-\\tfrac12$ sirve y $\\lambda+\\mu\\ne0$.",
        ja: "$\\lambda=2,\\ \\mu=-\\tfrac12$ で成り立つが $\\lambda+\\mu\\ne0$。",
        zh: "$\\lambda=2,\\ \\mu=-\\tfrac12$ 满足条件但 $\\lambda+\\mu\\ne0$。"
      } },
      { tex: "\\lambda=\\mu", correct: false, why: {
        en: "Then $\\lambda\\mu=\\lambda^2\\ge0$, never $-1$.",
        fr: "Alors $\\lambda\\mu=\\lambda^2\\ge0$, jamais $-1$.",
        es: "Entonces $\\lambda\\mu=\\lambda^2\\ge0$, nunca $-1$.",
        ja: "$\\lambda\\mu=\\lambda^2\\ge0$ で $-1$ にならない。",
        zh: "此时 $\\lambda\\mu=\\lambda^2\\ge0$，不可能为 $-1$。"
      } },
      { tex: "\\lambda^2+\\mu^2=2", correct: false, why: {
        en: "Only for $\\lambda=\\pm1$; $\\lambda=2,\\ \\mu=-\\tfrac12$ also works.",
        fr: "Seulement pour $\\lambda=\\pm1$ ; $\\lambda=2,\\ \\mu=-\\tfrac12$ marche aussi.",
        es: "Solo si $\\lambda=\\pm1$; $\\lambda=2,\\ \\mu=-\\tfrac12$ también vale.",
        ja: "$\\lambda=\\pm1$ のときだけ。$\\lambda=2,\\ \\mu=-\\tfrac12$ も可。",
        zh: "仅当 $\\lambda=\\pm1$；$\\lambda=2,\\ \\mu=-\\tfrac12$ 也满足。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The three dot products",
          fr: "Les trois produits scalaires",
          es: "Los tres productos escalares",
          ja: "3つの内積",
          zh: "三个数量积"
        },
        lines: ["|\\vec a|^2=2,\\quad|\\vec b|^2=2,\\quad\\vec a\\cdot\\vec b=0"],
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
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["(\\vec a+\\lambda\\vec b)\\cdot(\\vec a+\\mu\\vec b)=2+2\\lambda\\mu=0", "\\boxed{\\lambda\\mu=-1}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "E.g. $\\lambda=2,\\ \\mu=-\\tfrac12$: $(3,-1)\\cdot(\\tfrac12,\\tfrac32)=0$.",
          fr: "Ex. $\\lambda=2,\\ \\mu=-\\tfrac12$ : $(3,-1)\\cdot(\\tfrac12,\\tfrac32)=0$.",
          es: "P. ej. $\\lambda=2,\\ \\mu=-\\tfrac12$: $(3,-1)\\cdot(\\tfrac12,\\tfrac32)=0$.",
          ja: "例：$\\lambda=2,\\ \\mu=-\\tfrac12$ で $(3,-1)\\cdot(\\tfrac12,\\tfrac32)=0$。",
          zh: "例如 $\\lambda=2,\\ \\mu=-\\tfrac12$：$(3,-1)\\cdot(\\tfrac12,\\tfrac32)=0$。"
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
          en: "Two options are the same relation.",
          fr: "Deux options sont la même relation.",
          es: "Dos opciones son la misma relación.",
          ja: "2つの選択肢は同じ関係式。",
          zh: "有两个选项是同一个关系。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
