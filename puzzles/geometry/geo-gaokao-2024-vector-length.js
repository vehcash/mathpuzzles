/* geometry · The length of b
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-vector-length",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 3",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 3",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 3",
        ja: "2024年 中国・高考 新課程標準II卷 第3問",
        zh: "2024年高考数学新课标II卷 第3题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The length of b",
      fr: "La longueur de b",
      es: "La longitud de b",
      ja: "b の長さ",
      zh: "求 |b|"
    },
    statement: {
      en: "Vectors $\\vec a,\\vec b$ satisfy $|\\vec a|=1$, $|\\vec a+2\\vec b|=2$ and $(\\vec b-2\\vec a)\\perp\\vec b$. <b>Which of the following equal $|\\vec b|$?</b>",
      fr: "Les vecteurs $\\vec a,\\vec b$ vérifient $|\\vec a|=1$, $|\\vec a+2\\vec b|=2$ et $(\\vec b-2\\vec a)\\perp\\vec b$. <b>Lesquelles des valeurs suivantes sont égales à $|\\vec b|$ ?</b>",
      es: "Los vectores $\\vec a,\\vec b$ cumplen $|\\vec a|=1$, $|\\vec a+2\\vec b|=2$ y $(\\vec b-2\\vec a)\\perp\\vec b$. <b>¿Cuáles de los siguientes valores son iguales a $|\\vec b|$?</b>",
      ja: "ベクトル $\\vec a,\\vec b$ が $|\\vec a|=1$、$|\\vec a+2\\vec b|=2$、$(\\vec b-2\\vec a)\\perp\\vec b$ を満たします。<b>$|\\vec b|$ に等しいものはどれですか？</b>",
      zh: "向量 $\\vec a,\\vec b$ 满足 $|\\vec a|=1$，$|\\vec a+2\\vec b|=2$，且 $(\\vec b-2\\vec a)\\perp\\vec b$。<b>下列哪些等于 $|\\vec b|$？</b>"
    },
    figureText: {
      en: "The unit vector a and the circle of radius 2 on which the tip of a + 2b must lie.",
      fr: "Le vecteur unitaire a et le cercle de rayon 2 sur lequel se trouve l’extrémité de a + 2b.",
      es: "El vector unitario a y la circunferencia de radio 2 donde está el extremo de a + 2b.",
      ja: "単位ベクトル a と、a + 2b の先端がのる半径 2 の円。",
      zh: "单位向量 a，以及 a + 2b 终点所在的半径为 2 的圆。"
    },
    hint: {
      en: "The perpendicularity gives $\\vec a\\cdot\\vec b$ in terms of $|\\vec b|^2$. Then square $|\\vec a+2\\vec b|=2$.",
      fr: "L’orthogonalité donne $\\vec a\\cdot\\vec b$ en fonction de $|\\vec b|^2$. Élevez ensuite $|\\vec a+2\\vec b|=2$ au carré.",
      es: "La perpendicularidad da $\\vec a\\cdot\\vec b$ en función de $|\\vec b|^2$. Luego eleva al cuadrado $|\\vec a+2\\vec b|=2$.",
      ja: "垂直条件から $\\vec a\\cdot\\vec b$ を $|\\vec b|^2$ で表し、$|\\vec a+2\\vec b|=2$ を2乗する。",
      zh: "由垂直得 $\\vec a\\cdot\\vec b$ 与 $|\\vec b|^2$ 的关系，再把 $|\\vec a+2\\vec b|=2$ 平方。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 5.0, scale: 52, pad: 16 });
      const T = F.T = axes(F, -2.4, 2.6, -2.4, 2.6);
      const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([2 * Math.cos(t), 2 * Math.sin(t)])); } F.path(C, 'seg thin dashc', 'base', true);
      arrow(F, T([0, 0]), T([1, 0]), 'vec'); F.text(T([1, 0]), 'a', 'pt', 2, 14);
      F.text(T([-1.25, 2.4]), '|a + 2b| = 2', 'len small', 0, 0);
      F.reveal = () => {
      const b = [0.25, Math.sqrt(7) / 4];
      arrow(F, T([0, 0]), T(b), 'vec two'); F.text(T(b), 'b', 'pt', -10, -4);
      arrow(F, T([0, 0]), T([1 + 2 * b[0], 2 * b[1]]), 'vec two'); F.text(T([1.5, Math.sqrt(7) / 2]), 'a + 2b', 'len small', 22, -8);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{\\sqrt2}{2}", correct: true, why: {
        en: "$|\\vec b|^2=\\tfrac12$.",
        fr: "$|\\vec b|^2=\\tfrac12$.",
        es: "$|\\vec b|^2=\\tfrac12$.",
        ja: "$|\\vec b|^2=\\tfrac12$.",
        zh: "$|\\vec b|^2=\\tfrac12$."
      } },
      { tex: "\\tfrac{1}{\\sqrt2}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "That is $|\\vec b|^2$; take the square root.",
        fr: "C’est $|\\vec b|^2$ ; prenez la racine.",
        es: "Es $|\\vec b|^2$; saca la raíz.",
        ja: "それは $|\\vec b|^2$。平方根をとる。",
        zh: "那是 $|\\vec b|^2$，还要开方。"
      } },
      { tex: "\\tfrac{\\sqrt3}{2}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "That is $\\vec a\\cdot\\vec b$.",
        fr: "C’est $\\vec a\\cdot\\vec b$.",
        es: "Es $\\vec a\\cdot\\vec b$.",
        ja: "それは $\\vec a\\cdot\\vec b$。",
        zh: "那是 $\\vec a\\cdot\\vec b$。"
      } },
      { tex: "\\tfrac{\\sqrt6}{2}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
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
          en: "Use the right angle",
          fr: "Utiliser l’angle droit",
          es: "Usar el ángulo recto",
          ja: "垂直を使う",
          zh: "利用垂直"
        },
        lines: ["(\\vec b-2\\vec a)\\cdot\\vec b=0\\ \\Rightarrow\\ |\\vec b|^2=2\\,\\vec a\\cdot\\vec b"],
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
          en: "Square the given length",
          fr: "Élever la longueur au carré",
          es: "Elevar la longitud al cuadrado",
          ja: "長さを2乗",
          zh: "平方已知长度"
        },
        lines: ["|\\vec a+2\\vec b|^2=1+4\\,\\vec a\\cdot\\vec b+4|\\vec b|^2=1+2|\\vec b|^2+4|\\vec b|^2=4"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["6|\\vec b|^2=3,\\qquad|\\vec b|=\\boxed{\\tfrac{\\sqrt2}{2}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "One such pair: $\\vec a=(1,0)$, $\\vec b=\\bigl(\\tfrac14,\\tfrac{\\sqrt7}4\\bigr)$.",
          fr: "Un exemple : $\\vec a=(1,0)$, $\\vec b=\\bigl(\\tfrac14,\\tfrac{\\sqrt7}4\\bigr)$.",
          es: "Un ejemplo: $\\vec a=(1,0)$, $\\vec b=\\bigl(\\tfrac14,\\tfrac{\\sqrt7}4\\bigr)$.",
          ja: "例：$\\vec a=(1,0)$、$\\vec b=\\bigl(\\tfrac14,\\tfrac{\\sqrt7}4\\bigr)$。",
          zh: "例如 $\\vec a=(1,0)$，$\\vec b=\\bigl(\\tfrac14,\\tfrac{\\sqrt7}4\\bigr)$。"
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
