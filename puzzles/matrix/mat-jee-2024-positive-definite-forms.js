/* matrix · Quadratic forms that are always positive
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2024-positive-definite-forms",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.6",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.6",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.6",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Quadratic forms that are always positive",
      fr: "Formes quadratiques toujours positives",
      es: "Formas cuadráticas siempre positivas",
      ja: "常に正の2次形式",
      zh: "恒正的二次型"
    },
    statement: {
      en: "$S=\\{(a,b,c)\\in\\mathbb R^3: ax^2+2bxy+cy^2>0\\ \\text{for all}\\ (x,y)\\ne(0,0)\\}$. <b>Which of the following are true?</b>",
      fr: "$S=\\{(a,b,c)\\in\\mathbb R^3: ax^2+2bxy+cy^2>0\\ \\text{pour tout}\\ (x,y)\\ne(0,0)\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S=\\{(a,b,c)\\in\\mathbb R^3: ax^2+2bxy+cy^2>0\\ \\text{para todo}\\ (x,y)\\ne(0,0)\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S=\\{(a,b,c)\\in\\mathbb R^3: (x,y)\\ne(0,0)\\ \\text{のとき常に}\\ ax^2+2bxy+cy^2>0\\}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S=\\{(a,b,c)\\in\\mathbb R^3: \\text{对任意}\\ (x,y)\\ne(0,0)\\ \\text{有}\\ ax^2+2bxy+cy^2>0\\}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The symmetric matrix [[a, b], [b, c]] of the quadratic form.",
      fr: "La matrice symétrique [[a, b], [b, c]] de la forme quadratique.",
      es: "La matriz simétrica [[a, b], [b, c]] de la forma cuadrática.",
      ja: "2次形式の対称行列 [[a, b], [b, c]]。",
      zh: "二次型的对称矩阵 [[a, b], [b, c]]。"
    },
    hint: {
      en: "Positive definite means $a>0$ and $ac-b^2>0$.",
      fr: "Définie positive signifie $a>0$ et $ac-b^2>0$.",
      es: "Definida positiva significa $a>0$ y $ac-b^2>0$.",
      ja: "正定値は $a>0$ かつ $ac-b^2>0$。",
      zh: "正定即 $a>0$ 且 $ac-b^2>0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.6, h: 2.0, scale: 70, pad: 16 });
      matrix(F, [0.5, 1.7], [['a', 'b'], ['b', 'c']], { cw: 0.8, ch: 0.7 });
      F.reveal = () => {
      F.text([1.3, 0.1], 'ac − b² > 0', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "のとき常に", "zh": "对任意"},
      "ac − b² > 0": {"fr": "ac − b² > 0", "es": "ac − b² > 0", "ja": "ac − b² > 0", "zh": "ac − b² > 0"},
      "has a unique solution": {"fr": "a une solution unique", "es": "tiene solución única", "ja": "の解はただ1つ", "zh": "有唯一解"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "もありうる", "zh": "是可能的"}
    },
    options: [
      { tex: "\\left(3,b,\\tfrac1{12}\\right)\\in S\\ \\Rightarrow\\ |2b|<1", correct: true, why: {
        en: "$3\\cdot\\tfrac1{12}-b^2>0$ gives $b^2<\\tfrac14$.",
        fr: "$3\\cdot\\tfrac1{12}-b^2>0$ donne $b^2<\\tfrac14$.",
        es: "$3\\cdot\\tfrac1{12}-b^2>0$ da $b^2<\\tfrac14$.",
        ja: "$3\\cdot\\tfrac1{12}-b^2>0$ より $b^2<\\tfrac14$。",
        zh: "由 $3\\cdot\\tfrac1{12}-b^2>0$ 得 $b^2<\\tfrac14$。"
      } },
      { tex: "(a,b,c)\\in S\\Rightarrow\\ \\begin{cases}(a+1)x+by=0\\\\bx+(c+1)y=0\\end{cases}\\ \\text{has a unique solution}", correct: true, why: {
        en: "Its determinant is $(ac-b^2)+a+c+1>0$.",
        fr: "Son déterminant vaut $(ac-b^2)+a+c+1>0$.",
        es: "Su determinante es $(ac-b^2)+a+c+1>0$.",
        ja: "行列式は $(ac-b^2)+a+c+1>0$。",
        zh: "其行列式为 $(ac-b^2)+a+c+1>0$。"
      } },
      { tex: "\\left(2,\\tfrac72,6\\right)\\in S", correct: false, why: {
        en: "$12-\\tfrac{49}4<0$.",
        fr: "$12-\\tfrac{49}4<0$.",
        es: "$12-\\tfrac{49}4<0$.",
        ja: "$12-\\tfrac{49}4<0$。",
        zh: "$12-\\tfrac{49}4<0$。"
      } },
      { tex: "(1,1,1)\\in S", correct: false, why: {
        en: "$x^2+2xy+y^2=(x+y)^2$ vanishes at $(1,-1)$.",
        fr: "$(x+y)^2$ s’annule en $(1,-1)$.",
        es: "$(x+y)^2$ se anula en $(1,-1)$.",
        ja: "$(x+y)^2$ は $(1,-1)$ で $0$。",
        zh: "$(x+y)^2$ 在 $(1,-1)$ 处为 $0$。"
      } },
      { tex: "(a,b,c)\\in S\\Rightarrow b>0", correct: false, why: {
        en: "$(1,0,1)\\in S$ has $b=0$; $(1,-\\tfrac12,1)$ too.",
        fr: "$(1,0,1)\\in S$ a $b=0$.",
        es: "$(1,0,1)\\in S$ tiene $b=0$.",
        ja: "$(1,0,1)\\in S$ で $b=0$。",
        zh: "$(1,0,1)\\in S$ 而 $b=0$。"
      } },
      { tex: "(a,b,c)\\in S\\Rightarrow c<0\\ \\text{is possible}", correct: false, why: {
        en: "$y=1,\\ x=0$ gives $c>0$.",
        fr: "$x=0,\\ y=1$ donne $c>0$.",
        es: "$x=0,\\ y=1$ da $c>0$.",
        ja: "$x=0,\\ y=1$ で $c>0$。",
        zh: "取 $x=0,\\ y=1$ 得 $c>0$。"
      } },
      { tex: "\\left(3,\\tfrac12,\\tfrac1{12}\\right)\\in S", correct: false, why: {
        en: "$\\tfrac14-\\tfrac14=0$: not strictly positive.",
        fr: "$\\tfrac14-\\tfrac14=0$ : pas strictement positif.",
        es: "$\\tfrac14-\\tfrac14=0$: no estrictamente positivo.",
        ja: "$\\tfrac14-\\tfrac14=0$ で正でない。",
        zh: "$\\tfrac14-\\tfrac14=0$，不严格为正。"
      } },
      { tex: "(a,b,c)\\in S\\Rightarrow a+c<0\\ \\text{is possible}", correct: false, why: {
        en: "Both $a$ and $c$ are positive.",
        fr: "$a$ et $c$ sont tous deux positifs.",
        es: "$a$ y $c$ son ambos positivos.",
        ja: "$a,c$ はともに正。",
        zh: "$a$、$c$ 都为正。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Test",
          fr: "Critère",
          es: "Criterio",
          ja: "判定",
          zh: "判定"
        },
        lines: ["ax^2+2bxy+cy^2>0\\ \\forall(x,y)\\ne0\\iff a>0,\\ ac-b^2>0"],
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
          en: "The linear systems",
          fr: "Les systèmes linéaires",
          es: "Los sistemas lineales",
          ja: "連立方程式",
          zh: "线性方程组"
        },
        lines: ["\\det\\begin{pmatrix}a&b\\\\b&c\\end{pmatrix}=ac-b^2>0,\\qquad\\det\\begin{pmatrix}a+1&b\\\\b&c+1\\end{pmatrix}=ac-b^2+a+c+1>0"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam the first system ($ax+by=1$, $bx+cy=-1$) also has a unique solution: a third true statement.",
          fr: "Dans l’épreuve, le premier système a aussi une solution unique : une troisième affirmation vraie.",
          es: "En el examen el primer sistema también tiene solución única: una tercera afirmación verdadera.",
          ja: "原題では1つ目の連立方程式も解が一意で、これも正しい選択肢。",
          zh: "原题中第一个方程组也有唯一解，是第三个正确选项。"
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
