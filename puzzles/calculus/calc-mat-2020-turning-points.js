/* calculus · Two turning points of a cubic
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2020-turning-points",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2020 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Two turning points of a cubic",
      fr: "Deux extremums d’une cubique",
      es: "Dos extremos de una cúbica",
      ja: "3次関数の2つの極値",
      zh: "三次函数的两个极值点"
    },
    statement: {
      en: "The cubic $y=x^3+ax^2+bx+c$ has turning points at $(1,2)$ and $(3,d)$. <b>Which of the following are true?</b>",
      fr: "La cubique $y=x^3+ax^2+bx+c$ a des extremums en $(1,2)$ et $(3,d)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La cúbica $y=x^3+ax^2+bx+c$ tiene extremos en $(1,2)$ y $(3,d)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "3次関数 $y=x^3+ax^2+bx+c$ は $(1,2)$ と $(3,d)$ で極値をとります。<b>次のうち正しいものはどれですか？</b>",
      zh: "三次函数 $y=x^3+ax^2+bx+c$ 在 $(1,2)$ 与 $(3,d)$ 处有极值点。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The turning point (1, 2) and the vertical line x = 3 where the other turning point lies. The cubic is drawn in the solution.",
      fr: "L’extremum (1, 2) et la droite verticale x = 3 où se trouve l’autre extremum. La cubique est tracée dans la solution.",
      es: "El extremo (1, 2) y la recta vertical x = 3 donde está el otro extremo. La cúbica se dibuja en la solución.",
      ja: "極値 (1, 2) と、もう1つの極値がある縦線 x = 3。3次関数は解答で描きます。",
      zh: "极值点 (1, 2) 与另一极值点所在的竖线 x = 3。三次曲线在解答中画出。"
    },
    hint: {
      en: "$y'=3(x-1)(x-3)$. Expand to read off $a$ and $b$, then use $(1,2)$ for $c$.",
      fr: "$y'=3(x-1)(x-3)$. Développez pour lire $a$ et $b$, puis utilisez $(1,2)$ pour $c$.",
      es: "$y'=3(x-1)(x-3)$. Desarrolla para leer $a$ y $b$ y usa $(1,2)$ para $c$.",
      ja: "$y'=3(x-1)(x-3)$。展開して $a$, $b$、$(1,2)$ から $c$。",
      zh: "$y'=3(x-1)(x-3)$。展开读出 $a$、$b$，再用 $(1,2)$ 求 $c$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 5.4, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.6, 4.6, -2.8, 2.6);
      const y = x => x ** 3 - 6 * x * x + 9 * x - 2;
      F.dot(T([1, 2])); F.text(T([1, 2]), '(1, 2)', 'len small', 0, -14);
      F.seg(T([3, -2.7]), T([3, 2.5]), 'seg thin dashc'); F.text(T([3, 2.5]), 'x = 3', 'len small', 22, 4);
      F.reveal = () => {
      plot(F, T, y, -0.05, 4.2, 'graph', 'base', -2.8, 2.6);
      F.dot(T([3, -2])); F.text(T([3, -2]), '(3, d)', 'len small', 26, 10);
      };
      return F;
    },
    options: [
      { tex: "d=-2", correct: true, why: {
        en: "$y(3)=27-54+27-2=-2$.",
        fr: "$y(3)=27-54+27-2=-2$.",
        es: "$y(3)=27-54+27-2=-2$.",
        ja: "$y(3)=27-54+27-2=-2$.",
        zh: "$y(3)=27-54+27-2=-2$."
      } },
      { tex: "c=-2", correct: true, why: {
        en: "$1-6+9+c=2$.",
        fr: "$1-6+9+c=2$.",
        es: "$1-6+9+c=2$.",
        ja: "$1-6+9+c=2$.",
        zh: "$1-6+9+c=2$."
      } },
      { tex: "d=2", correct: false, why: {
        en: "Assumes the graph is symmetric about the $x$-axis.",
        fr: "Suppose la courbe symétrique par rapport à l’axe des $x$.",
        es: "Supone la gráfica simétrica respecto del eje $x$.",
        ja: "$x$ 軸対称と仮定した。",
        zh: "误以为关于 $x$ 轴对称。"
      } },
      { tex: "d=0", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "d=-6", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "a=6", correct: false, why: {
        en: "$a=-6$ from $-12/2$.",
        fr: "$a=-6$ from $-12/2$.",
        es: "$a=-6$ from $-12/2$.",
        ja: "$a=-6$ from $-12/2$.",
        zh: "$a=-6$ from $-12/2$."
      } },
      { tex: "b=-9", correct: false, why: {
        en: "$b=9$.",
        fr: "$b=9$.",
        es: "$b=9$.",
        ja: "$b=9$.",
        zh: "$b=9$."
      } },
      { tex: "d=-4", correct: false, why: {
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
          en: "Derivative from the turning points",
          fr: "Dérivée à partir des extremums",
          es: "Derivada desde los extremos",
          ja: "極値から導関数",
          zh: "由极值点得导数"
        },
        lines: ["y'=3(x-1)(x-3)=3x^2-12x+9\\;\\Rightarrow\\;a=-6,\\ b=9"],
        note: {
          en: "$y'=3x^2+2ax+b$ must have roots $1$ and $3$.",
          fr: "$y'=3x^2+2ax+b$ doit avoir pour racines $1$ et $3$.",
          es: "$y'=3x^2+2ax+b$ debe tener raíces $1$ y $3$.",
          ja: "$y'=3x^2+2ax+b$ の解が $1$ と $3$。",
          zh: "$y'=3x^2+2ax+b$ 的根为 $1$ 与 $3$。"
        }
      },
      {
        title: {
          en: "Use (1, 2)",
          fr: "Utiliser (1, 2)",
          es: "Usar (1, 2)",
          ja: "(1, 2) を使う",
          zh: "用 (1, 2)"
        },
        lines: ["1-6+9+c=2\\;\\Rightarrow\\;c=-2"],
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
          en: "Evaluate at 3",
          fr: "Évaluer en 3",
          es: "Evaluar en 3",
          ja: "3 で値",
          zh: "在 3 处求值"
        },
        lines: ["d=27-54+27-2=\\boxed{-2}"],
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
          en: "Here d and c happen to be equal.",
          fr: "Ici d et c sont égaux par hasard.",
          es: "Aquí d y c coinciden.",
          ja: "ここでは d と c がたまたま等しい。",
          zh: "这里 d 与 c 恰好相等。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
