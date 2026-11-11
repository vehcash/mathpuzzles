/* matrix · A determinant equation with a single solution
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 37 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-ita-2023-unique-x-determinants",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 37",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 37",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 37",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第37問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 37 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "A determinant equation with a single solution",
      fr: "Une équation de déterminants à solution unique",
      es: "Una ecuación de determinantes con solución única",
      ja: "解がただ1つの行列式の方程式",
      zh: "只有唯一解的行列式方程"
    },
    statement: {
      en: "$A$ is a real $3\\times3$ matrix such that exactly one real $x$ satisfies $\\det\\!\\left(\\sqrt[3]{2}\\,x^2A\\right)+\\det\\!\\left(xA^3\\right)=\\det\\!\\left(A^2\\right)$. <b>Which of the following equal $x+\\det A$?</b>",
      fr: "$A$ est une matrice réelle $3\\times3$ telle qu’un seul réel $x$ vérifie $\\det\\!\\left(\\sqrt[3]{2}\\,x^2A\\right)+\\det\\!\\left(xA^3\\right)=\\det\\!\\left(A^2\\right)$. <b>Lesquelles des valeurs suivantes sont égales à $x+\\det A$ ?</b>",
      es: "$A$ es una matriz real $3\\times3$ tal que un único real $x$ cumple $\\det\\!\\left(\\sqrt[3]{2}\\,x^2A\\right)+\\det\\!\\left(xA^3\\right)=\\det\\!\\left(A^2\\right)$. <b>¿Cuáles de los siguientes valores son iguales a $x+\\det A$?</b>",
      ja: "実 $3\\times3$ 行列 $A$ について、$\\det\\!\\left(\\sqrt[3]{2}\\,x^2A\\right)+\\det\\!\\left(xA^3\\right)=\\det\\!\\left(A^2\\right)$ を満たす実数 $x$ がただ1つです。<b>$x+\\det A$ に等しいものはどれですか？</b>",
      zh: "$A$ 为 $3\\times3$ 实矩阵，恰有一个实数 $x$ 满足 $\\det\\!\\left(\\sqrt[3]{2}\\,x^2A\\right)+\\det\\!\\left(xA^3\\right)=\\det\\!\\left(A^2\\right)$。<b>下列哪些等于 $x+\\det A$？</b>"
    },
    figureText: {
      en: "A parabola in the variable y = x³ just touching the axis: a double root.",
      fr: "Une parabole en la variable y = x³ tangente à l’axe : une racine double.",
      es: "Una parábola en la variable y = x³ tangente al eje: una raíz doble.",
      ja: "変数 y = x³ の放物線が軸に接する：重解。",
      zh: "关于 y = x³ 的抛物线与轴相切：二重根。"
    },
    hint: {
      en: "For a $3\\times3$ matrix $\\det(kA)=k^3\\det A$. With $d=\\det A$ and $y=x^3$ you get $2d\\,y^2+d^3y-d^2=0$.",
      fr: "Pour une matrice $3\\times3$, $\\det(kA)=k^3\\det A$. Avec $d=\\det A$ et $y=x^3$ : $2d\\,y^2+d^3y-d^2=0$.",
      es: "Para una matriz $3\\times3$, $\\det(kA)=k^3\\det A$. Con $d=\\det A$ e $y=x^3$: $2d\\,y^2+d^3y-d^2=0$.",
      ja: "$3\\times3$ では $\\det(kA)=k^3\\det A$。$d=\\det A$、$y=x^3$ とすると $2dy^2+d^3y-d^2=0$。",
      zh: "$3\\times3$ 矩阵 $\\det(kA)=k^3\\det A$；令 $d=\\det A$，$y=x^3$：$2dy^2+d^3y-d^2=0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.0, scale: 64, pad: 16 });
      const T = F.T = axes(F, -3.0, 1.0, -2.5, 0.5);
      plot(F, T, y => -0.6 * (y + 1) ** 2, -2.9, 0.9, 'graph', 'base', -2.5, 0.5);
      F.reveal = () => {
      F.dot(T([-1, 0])); F.text(T([-1, 0]), 'y = x³ = −1', 'len small', 0, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "y = x³ = −1": {"fr": "y = x³ = −1", "es": "y = x³ = −1", "ja": "y = x³ = −1", "zh": "y = x³ = −1"}
    },
    options: [
      { tex: "-3", correct: true, why: {
        en: "$d=-2,\\ x=-1$",
        fr: "$d=-2,\\ x=-1$",
        es: "$d=-2,\\ x=-1$",
        ja: "$d=-2,\\ x=-1$",
        zh: "$d=-2,\\ x=-1$"
      } },
      { tex: "\\det A-1", correct: true, why: {
        en: "$x=-1$",
        fr: "$x=-1$",
        es: "$x=-1$",
        ja: "$x=-1$",
        zh: "$x=-1$"
      } },
      { tex: "-5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-2", correct: false, why: {
        en: "That is $\\det A$ alone.",
        fr: "C’est $\\det A$ seul.",
        es: "Es solo $\\det A$.",
        ja: "$\\det A$ だけ。",
        zh: "只是 $\\det A$。"
      } },
      { tex: "-1", correct: false, why: {
        en: "That is $x$ alone.",
        fr: "C’est $x$ seul.",
        es: "Es solo $x$.",
        ja: "$x$ だけ。",
        zh: "只是 $x$。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "$\\det A=0$ makes every $x$ a solution.",
        fr: "$\\det A=0$ rend tout $x$ solution.",
        es: "$\\det A=0$ hace que todo $x$ sea solución.",
        ja: "$\\det A=0$ ならすべての $x$ が解。",
        zh: "$\\det A=0$ 时任意 $x$ 都是解。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use det(kA) = k³ det A",
          fr: "Utiliser det(kA) = k³ det A",
          es: "Usar det(kA) = k³ det A",
          ja: "det(kA) = k³ det A を使う",
          zh: "用 det(kA) = k³ det A"
        },
        lines: ["2x^6d+x^3d^3=d^2\\ \\Rightarrow\\ 2d\\,y^2+d^3y-d^2=0,\\ y=x^3"],
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
          en: "Double root",
          fr: "Racine double",
          es: "Raíz doble",
          ja: "重解",
          zh: "二重根"
        },
        lines: ["d^6+8d^3=0\\Rightarrow d=-2,\\quad -4(y+1)^2=0\\Rightarrow x=-1"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Since $y=x^3$ is one-to-one, one $y$ means one $x$.",
          fr: "Comme $y=x^3$ est bijective, un seul $y$ donne un seul $x$.",
          es: "Como $y=x^3$ es biyectiva, un único $y$ da un único $x$.",
          ja: "$y=x^3$ は1対1なので $y$ が1つなら $x$ も1つ。",
          zh: "$y=x^3$ 一一对应，故唯一 $y$ 对应唯一 $x$。"
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
