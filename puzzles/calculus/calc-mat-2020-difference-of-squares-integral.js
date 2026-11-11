/* calculus · An integral that is a difference of squares
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2020-difference-of-squares-integral",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1B",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1B",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1B",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1B",
        zh: "牛津大学数学入学考试 MAT 2020 第 1B 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "An integral that is a difference of squares",
      fr: "Une intégrale qui est une différence de carrés",
      es: "Una integral que es diferencia de cuadrados",
      ja: "平方の差になる積分",
      zh: "平方差形式的积分"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\int_0^1\\left(e^x-x\\right)\\left(e^x+x\\right)dx$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à $\\displaystyle\\int_0^1\\left(e^x-x\\right)\\left(e^x+x\\right)dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a $\\displaystyle\\int_0^1\\left(e^x-x\\right)\\left(e^x+x\\right)dx$?</b>",
      ja: "<b>$\\displaystyle\\int_0^1\\left(e^x-x\\right)\\left(e^x+x\\right)dx$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\int_0^1\\left(e^x-x\\right)\\left(e^x+x\\right)dx$？</b>"
    },
    figureText: {
      en: "The curve y = e²ˣ − x² from 0 to 1 with the area under it shaded.",
      fr: "La courbe y = e²ˣ − x² de 0 à 1 avec l’aire dessous grisée.",
      es: "La curva y = e²ˣ − x² de 0 a 1 con el área debajo sombreada.",
      ja: "0 から 1 までの曲線 y = e²ˣ − x² と、その下の面積に色付け。",
      zh: "曲线 y = e²ˣ − x²（0 到 1），曲线下方面积涂色。"
    },
    hint: {
      en: "Multiply out: $(e^x)^2-x^2$.",
      fr: "Développez : $(e^x)^2-x^2$.",
      es: "Desarrolla: $(e^x)^2-x^2$.",
      ja: "展開すると $(e^x)^2-x^2$。",
      zh: "展开：$(e^x)^2-x^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.6, h: 3.6, scale: 80, pad: 18 });
      const T = F.T = axes(F, -0.3, 2.3, -0.3, 3.3);
      const f = x => (Math.exp(2 * x) - x * x) / 2.2;
      const q = [T([0, 0])]; for (let k = 0; k <= 40; k++) { const x = k / 40; q.push(T([x, f(x)])); } q.push(T([1, 0]));
      F.path(q, 'fill-yellow', 'fills'); plot(F, T, f, 0, 1.15, 'graph'); F.text(T([1, 0]), '1', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "\\tfrac{e^2}{2}-\\tfrac56", correct: true, why: {
        en: "$\\int_0^1e^{2x}dx-\\int_0^1x^2dx=\\tfrac{e^2-1}{2}-\\tfrac13$.",
        fr: "$\\int_0^1e^{2x}dx-\\int_0^1x^2dx=\\tfrac{e^2-1}{2}-\\tfrac13$.",
        es: "$\\int_0^1e^{2x}dx-\\int_0^1x^2dx=\\tfrac{e^2-1}{2}-\\tfrac13$.",
        ja: "$\\int_0^1e^{2x}dx-\\int_0^1x^2dx=\\tfrac{e^2-1}{2}-\\tfrac13$.",
        zh: "$\\int_0^1e^{2x}dx-\\int_0^1x^2dx=\\tfrac{e^2-1}{2}-\\tfrac13$."
      } },
      { tex: "\\tfrac{3e^2-5}{6}", correct: true, why: {
        en: "The same number over a common denominator.",
        fr: "Le même nombre au même dénominateur.",
        es: "El mismo número con denominador común.",
        ja: "通分した同じ数。",
        zh: "通分后的同一个数。"
      } },
      { tex: "\\tfrac{e^2}{2}-\\tfrac13", correct: false, why: {
        en: "Forgets the lower limit of $\\tfrac12e^{2x}$.",
        fr: "Oublie la borne inférieure de $\\tfrac12e^{2x}$.",
        es: "Olvida el límite inferior de $\\tfrac12e^{2x}$.",
        ja: "$\\tfrac12e^{2x}$ の下端を忘れた。",
        zh: "漏了 $\\tfrac12e^{2x}$ 的下限。"
      } },
      { tex: "e^2-\\tfrac43", correct: false, why: {
        en: "Integrates $e^{2x}$ to $e^{2x}$.",
        fr: "Primitive $e^{2x}$ au lieu de $\\tfrac12e^{2x}$.",
        es: "Primitiva $e^{2x}$ en vez de $\\tfrac12e^{2x}$.",
        ja: "$e^{2x}$ の原始関数を $e^{2x}$ とした。",
        zh: "把 $e^{2x}$ 的原函数当成 $e^{2x}$。"
      } },
      { tex: "(e-1)^2-\\tfrac13", correct: false, why: {
        en: "Squares the integral of $e^x$ instead of integrating $e^{2x}$.",
        fr: "Élève au carré l’intégrale de $e^x$.",
        es: "Eleva al cuadrado la integral de $e^x$.",
        ja: "$e^x$ の積分を2乗した。",
        zh: "把 $e^x$ 的积分平方了。"
      } },
      { tex: "\\tfrac{e^2}{2}+\\tfrac16", correct: false, why: {
        en: "Sign slip.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "\\tfrac{e^2-1}{2}", correct: false, why: {
        en: "Drops the $-x^2$ term.",
        fr: "Oublie le terme $-x^2$.",
        es: "Olvida el término $-x^2$.",
        ja: "$-x^2$ の項を落とした。",
        zh: "漏了 $-x^2$ 项。"
      } },
      { tex: "e-\\tfrac32", correct: false, why: {
        en: "$\\int(e^x-x)\\,dx$, only one factor.",
        fr: "$\\int(e^x-x)\\,dx$ : un seul facteur.",
        es: "$\\int(e^x-x)\\,dx$: un solo factor.",
        ja: "1つの因子だけを積分。",
        zh: "只积了一个因子。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Multiply out",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["(e^x-x)(e^x+x)=e^{2x}-x^2"],
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
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分",
          zh: "积分"
        },
        lines: ["\\Big[\\tfrac12e^{2x}-\\tfrac13x^3\\Big]_0^1=\\tfrac{e^2}{2}-\\tfrac13-\\tfrac12=\\boxed{\\tfrac{e^2}{2}-\\tfrac56}"],
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
