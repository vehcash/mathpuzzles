/* calculus · Making a product even
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2023-even-times-log",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 4",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 4",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 4",
        ja: "2023年 中国・高考 新課程標準II卷 第4問",
        zh: "2023年高考数学新课标II卷 第4题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Making a product even",
      fr: "Rendre un produit pair",
      es: "Hacer par un producto",
      ja: "積を偶関数にする",
      zh: "让乘积成为偶函数"
    },
    statement: {
      en: "$f(x)=(x+a)\\ln\\dfrac{2x-1}{2x+1}$ is an even function. <b>Which of the following equal $a$?</b>",
      fr: "$f(x)=(x+a)\\ln\\dfrac{2x-1}{2x+1}$ est une fonction paire. <b>Lesquelles des valeurs suivantes sont égales à $a$ ?</b>",
      es: "$f(x)=(x+a)\\ln\\dfrac{2x-1}{2x+1}$ es una función par. <b>¿Cuáles de los siguientes valores son iguales a $a$?</b>",
      ja: "$f(x)=(x+a)\\ln\\dfrac{2x-1}{2x+1}$ は偶関数です。<b>$a$ に等しいものはどれですか？</b>",
      zh: "若 $f(x)=(x+a)\\ln\\dfrac{2x-1}{2x+1}$ 为偶函数，<b>下列哪些等于 $a$？</b>"
    },
    figureText: {
      en: "The graph of g(x) = ln((2x − 1)/(2x + 1)), defined for |x| > 1/2.",
      fr: "La courbe de g(x) = ln((2x − 1)/(2x + 1)), définie pour |x| > 1/2.",
      es: "La gráfica de g(x) = ln((2x − 1)/(2x + 1)), definida para |x| > 1/2.",
      ja: "|x| > 1/2 で定義された g(x) = ln((2x − 1)/(2x + 1)) のグラフ。",
      zh: "g(x) = ln((2x − 1)/(2x + 1)) 的图像，定义域 |x| > 1/2。"
    },
    hint: {
      en: "Is the logarithm factor even or odd? Then what must $x+a$ be?",
      fr: "Le facteur logarithme est-il pair ou impair ? Que doit alors être $x+a$ ?",
      es: "¿El factor logaritmo es par o impar? ¿Qué debe ser entonces $x+a$?",
      ja: "対数の因子は偶か奇か。すると $x+a$ はどうあるべき？",
      zh: "对数因子是奇函数还是偶函数？那么 $x+a$ 应该是什么？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 4.4, scale: 46, pad: 16 });
      const T = F.T = axes(F, -3.0, 3.0, -2.2, 2.2);
      const g = x => Math.log((2 * x - 1) / (2 * x + 1));
      plot(F, T, g, 0.53, 2.95, 'graph', 'base', -2.2, 2.2); plot(F, T, g, -2.95, -0.53, 'graph', 'base', -2.2, 2.2);
      [-0.5, 0.5].forEach(x => F.seg(T([x, -2.1]), T([x, 2.1]), 'seg thin dashc'));
      F.text(T([0.5, 0]), '½', 'tick', 8, 14); F.text(T([-0.5, 0]), '−½', 'tick', -12, 14);
      F.reveal = () => {
      const f = x => x * g(x);
      plot(F, T, f, 0.52, 2.95, 'hl pink', 'base', -2.2, 2.2); plot(F, T, f, -2.95, -0.52, 'hl pink', 'base', -2.2, 2.2);
      F.text(T([2.2, -1.3]), 'a = 0', 'len small', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "0", correct: true, why: {
        en: "The log factor is odd, so $x+a$ must be odd too.",
        fr: "Le facteur logarithme est impair, donc $x+a$ aussi.",
        es: "El factor logaritmo es impar, así que $x+a$ también.",
        ja: "対数因子は奇関数なので $x+a$ も奇関数。",
        zh: "对数因子为奇函数，所以 $x+a$ 也须为奇函数。"
      } },
      { tex: "\\ln1", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
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
      { tex: "-\\tfrac12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\pm\\tfrac12", correct: false, why: {
        en: "The domain edges $\\pm\\tfrac12$ do not affect the parity of $x+a$.",
        fr: "Les bords du domaine $\\pm\\tfrac12$ ne changent pas la parité de $x+a$.",
        es: "Los bordes del dominio $\\pm\\tfrac12$ no cambian la paridad de $x+a$.",
        ja: "定義域の端 $\\pm\\tfrac12$ は $x+a$ の偶奇に無関係。",
        zh: "定义域端点 $\\pm\\tfrac12$ 与 $x+a$ 的奇偶无关。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The log factor is odd",
          fr: "Le facteur logarithme est impair",
          es: "El factor logaritmo es impar",
          ja: "対数因子は奇関数",
          zh: "对数因子为奇函数"
        },
        lines: ["g(-x)=\\ln\\frac{-2x-1}{-2x+1}=\\ln\\frac{2x+1}{2x-1}=-g(x)"],
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
          en: "Even × ? = even",
          fr: "Pair = impair × ?",
          es: "Par = impar × ?",
          ja: "偶 = 奇 × ?",
          zh: "偶 = 奇 × ?"
        },
        lines: ["f(-x)=(-x+a)\\bigl(-g(x)\\bigr)=(x-a)g(x)=f(x)=(x+a)g(x)", "\\Rightarrow\\ a=\\boxed{0}"],
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
