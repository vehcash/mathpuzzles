/* geometry · Coplanar vectors and a plane
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-coplanar-vectors-plane-l",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.12",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.12",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.12",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.12",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.12"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Coplanar vectors and a plane",
      fr: "Vecteurs coplanaires et un plan",
      es: "Vectores coplanarios y un plano",
      ja: "同一平面上のベクトルと平面",
      zh: "共面向量与平面"
    },
    statement: {
      en: "$\\overrightarrow{OP}=\\tfrac{\\alpha-1}{\\alpha}\\hat i+\\hat j+\\hat k$, $\\overrightarrow{OQ}=\\hat i+\\tfrac{\\beta-1}{\\beta}\\hat j+\\hat k$, $\\overrightarrow{OR}=\\hat i+\\hat j+\\tfrac12\\hat k$ with $\\alpha,\\beta\\ne0$. If $(\\overrightarrow{OP}\\times\\overrightarrow{OQ})\\cdot\\overrightarrow{OR}=0$ and $(\\alpha,\\beta,2)$ lies on $3x+3y-z+l=0$, <b>which of the following equal $l$?</b>",
      fr: "$\\overrightarrow{OP}=\\tfrac{\\alpha-1}{\\alpha}\\hat i+\\hat j+\\hat k$, $\\overrightarrow{OQ}=\\hat i+\\tfrac{\\beta-1}{\\beta}\\hat j+\\hat k$, $\\overrightarrow{OR}=\\hat i+\\hat j+\\tfrac12\\hat k$ avec $\\alpha,\\beta\\ne0$. Si $(\\overrightarrow{OP}\\times\\overrightarrow{OQ})\\cdot\\overrightarrow{OR}=0$ et $(\\alpha,\\beta,2)$ est sur $3x+3y-z+l=0$, <b>lesquelles des valeurs suivantes sont égales à $l$ ?</b>",
      es: "$\\overrightarrow{OP}=\\tfrac{\\alpha-1}{\\alpha}\\hat i+\\hat j+\\hat k$, $\\overrightarrow{OQ}=\\hat i+\\tfrac{\\beta-1}{\\beta}\\hat j+\\hat k$, $\\overrightarrow{OR}=\\hat i+\\hat j+\\tfrac12\\hat k$ con $\\alpha,\\beta\\ne0$. Si $(\\overrightarrow{OP}\\times\\overrightarrow{OQ})\\cdot\\overrightarrow{OR}=0$ y $(\\alpha,\\beta,2)$ está en $3x+3y-z+l=0$, <b>¿cuáles de los siguientes valores son iguales a $l$?</b>",
      ja: "$\\overrightarrow{OP}=\\tfrac{\\alpha-1}{\\alpha}\\hat i+\\hat j+\\hat k$、$\\overrightarrow{OQ}=\\hat i+\\tfrac{\\beta-1}{\\beta}\\hat j+\\hat k$、$\\overrightarrow{OR}=\\hat i+\\hat j+\\tfrac12\\hat k$（$\\alpha,\\beta\\ne0$）で、$(\\overrightarrow{OP}\\times\\overrightarrow{OQ})\\cdot\\overrightarrow{OR}=0$、点 $(\\alpha,\\beta,2)$ は平面 $3x+3y-z+l=0$ 上にあります。<b>$l$ に等しいものはどれですか？</b>",
      zh: "设 $\\overrightarrow{OP}=\\tfrac{\\alpha-1}{\\alpha}\\hat i+\\hat j+\\hat k$，$\\overrightarrow{OQ}=\\hat i+\\tfrac{\\beta-1}{\\beta}\\hat j+\\hat k$，$\\overrightarrow{OR}=\\hat i+\\hat j+\\tfrac12\\hat k$，$\\alpha,\\beta\\ne0$。若 $(\\overrightarrow{OP}\\times\\overrightarrow{OQ})\\cdot\\overrightarrow{OR}=0$，且点 $(\\alpha,\\beta,2)$ 在平面 $3x+3y-z+l=0$ 上，<b>下列哪些等于 $l$？</b>"
    },
    figureText: {
      en: "The 3 × 3 determinant whose rows are OP, OQ and OR.",
      fr: "Le déterminant 3 × 3 dont les lignes sont OP, OQ et OR.",
      es: "El determinante 3 × 3 cuyas filas son OP, OQ y OR.",
      ja: "行が OP, OQ, OR の 3 × 3 行列式。",
      zh: "以 OP、OQ、OR 为行的 3 × 3 行列式。"
    },
    hint: {
      en: "Write $u=1-\\tfrac1\\alpha$, $v=1-\\tfrac1\\beta$ and expand the determinant.",
      fr: "Posez $u=1-\\tfrac1\\alpha$, $v=1-\\tfrac1\\beta$ et développez le déterminant.",
      es: "Pon $u=1-\\tfrac1\\alpha$, $v=1-\\tfrac1\\beta$ y desarrolla el determinante.",
      ja: "$u=1-\\tfrac1\\alpha$、$v=1-\\tfrac1\\beta$ とおいて行列式を展開。",
      zh: "令 $u=1-\\tfrac1\\alpha$，$v=1-\\tfrac1\\beta$，展开行列式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 2.4, scale: 64, pad: 16 });
      matrix(F, [0.4, 2.2], [['u', '1', '1'], ['1', 'v', '1'], ['1', '1', '½']], { cw: 0.85, ch: 0.62, bar: 'vbar' });
      F.reveal = () => {
      F.text([1.7, 0.1], '(u − 2)(v − 2) = 1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(u − 2)(v − 2) = 1": {"fr": "(u − 2)(v − 2) = 1", "es": "(u − 2)(v − 2) = 1", "ja": "(u − 2)(v − 2) = 1", "zh": "(u − 2)(v − 2) = 1"}
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "The coplanarity gives $\\alpha+\\beta=-1$; then $3(-1)-2+l=0$.",
        fr: "La coplanarité donne $\\alpha+\\beta=-1$ ; puis $3(-1)-2+l=0$.",
        es: "La coplanaridad da $\\alpha+\\beta=-1$; luego $3(-1)-2+l=0$.",
        ja: "共面条件より $\\alpha+\\beta=-1$、そして $3(-1)-2+l=0$。",
        zh: "共面得 $\\alpha+\\beta=-1$，再由 $3(-1)-2+l=0$。"
      } },
      { tex: "\\sqrt{25}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-5", correct: false, why: {
        en: "Sign slip with $-z$.",
        fr: "Erreur de signe sur $-z$.",
        es: "Error de signo con $-z$.",
        ja: "$-z$ の符号ミス。",
        zh: "$-z$ 处符号错。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-1", correct: false, why: {
        en: "That is $\\alpha+\\beta$.",
        fr: "C’est $\\alpha+\\beta$.",
        es: "Es $\\alpha+\\beta$.",
        ja: "$\\alpha+\\beta$ の値。",
        zh: "那是 $\\alpha+\\beta$。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-3", correct: false, why: {
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
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["u\\left(\\tfrac v2-1\\right)-\\left(\\tfrac12-1\\right)+(1-v)=0\\ \\Rightarrow\\ uv-2u-2v+3=0\\ \\Rightarrow\\ (u-2)(v-2)=1"],
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
          en: "Back to α, β",
          fr: "Retour à α, β",
          es: "Volver a α, β",
          ja: "α, β に戻す",
          zh: "回到 α、β"
        },
        lines: ["\\left(1+\\tfrac1\\alpha\\right)\\left(1+\\tfrac1\\beta\\right)=1\\ \\Rightarrow\\ \\tfrac1\\alpha+\\tfrac1\\beta+\\tfrac1{\\alpha\\beta}=0\\ \\Rightarrow\\ \\alpha+\\beta=-1"],
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
          en: "The plane",
          fr: "Le plan",
          es: "El plano",
          ja: "平面",
          zh: "平面"
        },
        lines: ["3(\\alpha+\\beta)-2+l=0\\ \\Rightarrow\\ l=\\boxed{5}"],
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
