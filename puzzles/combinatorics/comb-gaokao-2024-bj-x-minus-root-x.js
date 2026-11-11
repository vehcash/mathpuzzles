/* combinatorics · The x³ term of (x − √x)⁴
   Gaokao 2024, Beijing paper (北京卷), Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-gaokao-2024-bj-x-minus-root-x",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 4",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 4",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 4",
        ja: "2024年 中国・高考 北京卷 第4問",
        zh: "2024年高考数学北京卷 第4题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "The x³ term of (x − √x)⁴",
      fr: "Le terme en x³ de (x − √x)⁴",
      es: "El término en x³ de (x − √x)⁴",
      ja: "(x − √x)⁴ の x³ の項",
      zh: "(x − √x)⁴ 中的 x³ 项"
    },
    statement: {
      en: "<b>Which of the following equal the coefficient of $x^3$ in the expansion of $\\left(x-\\sqrt x\\right)^4$?</b>",
      fr: "<b>Lesquels des nombres suivants sont égaux au coefficient de $x^3$ dans le développement de $\\left(x-\\sqrt x\\right)^4$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al coeficiente de $x^3$ en el desarrollo de $\\left(x-\\sqrt x\\right)^4$?</b>",
      ja: "<b>$\\left(x-\\sqrt x\\right)^4$ の展開式における $x^3$ の係数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\left(x-\\sqrt x\\right)^4$ 展开式中 $x^3$ 的系数？</b>"
    },
    figureText: {
      en: "The five terms of the expansion as boxes, with the powers of x they carry: x⁴, x^3.5, x³, x^2.5, x².",
      fr: "Les cinq termes du développement en cases, avec leurs puissances de x : x⁴, x^3,5, x³, x^2,5, x².",
      es: "Los cinco términos del desarrollo en cajas, con sus potencias de x: x⁴, x^3,5, x³, x^2,5, x².",
      ja: "展開の5つの項とその x の次数：x⁴, x^3.5, x³, x^2.5, x²。",
      zh: "展开式五项及其 x 的次数：x⁴、x^3.5、x³、x^2.5、x²。"
    },
    hint: {
      en: "The general term is $\\binom4k x^{4-k}(-\\sqrt x)^k$. Which $k$ gives power $3$?",
      fr: "Le terme général est $\\binom4k x^{4-k}(-\\sqrt x)^k$. Quel $k$ donne la puissance $3$ ?",
      es: "El término general es $\\binom4k x^{4-k}(-\\sqrt x)^k$. ¿Qué $k$ da la potencia $3$?",
      ja: "一般項は $\\binom4k x^{4-k}(-\\sqrt x)^k$。次数 $3$ になる $k$ は？",
      zh: "通项为 $\\binom4k x^{4-k}(-\\sqrt x)^k$，哪个 $k$ 使次数为 $3$？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 1.8, scale: 52, pad: 16 });
      ['x⁴', 'x⁷ᐟ²', 'x³', 'x⁵ᐟ²', 'x²'].forEach((t, k) => { F.rect(0.2 + k * 1.35, 0.5, 1.2, 0.8, k === 2 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([0.8 + k * 1.35, 0.9], t, 'pt', 0, 0); F.text([0.8 + k * 1.35, 0.5], 'k = ' + k, 'len small', 0, 14); });
      F.reveal = () => {
      ['1', '−4', '6', '−4', '1'].forEach((t, k) => F.text([0.8 + k * 1.35, 1.3], t, 'len small', 0, -10));
      };
      return F;
    },
    options: [
      { tex: "6", correct: true, why: {
        en: "$k=2$: $\\binom42(-1)^2=6$.",
        fr: "$k=2$ : $\\binom42(-1)^2=6$.",
        es: "$k=2$: $\\binom42(-1)^2=6$.",
        ja: "$k=2$：$\\binom42(-1)^2=6$。",
        zh: "$k=2$：$\\binom42(-1)^2=6$。"
      } },
      { tex: "\\tbinom42", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-6", correct: false, why: {
        en: "$(-1)^2=+1$.",
        fr: "$(-1)^2=+1$.",
        es: "$(-1)^2=+1$.",
        ja: "$(-1)^2=+1$。",
        zh: "$(-1)^2=+1$。"
      } },
      { tex: "12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-4", correct: false, why: {
        en: "That is the coefficient of $x^{3.5}$ ($k=1$).",
        fr: "C’est le coefficient de $x^{3,5}$ ($k=1$).",
        es: "Es el coeficiente de $x^{3,5}$ ($k=1$).",
        ja: "$x^{3.5}$ の係数（$k=1$）。",
        zh: "那是 $x^{3.5}$ 的系数（$k=1$）。"
      } },
      { tex: "4", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "1", correct: false, why: {
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
          en: "General term",
          fr: "Terme général",
          es: "Término general",
          ja: "一般項",
          zh: "通项"
        },
        lines: ["\\binom4k x^{4-k}\\bigl(-x^{1/2}\\bigr)^k=(-1)^k\\binom4k x^{4-k/2}"],
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
          en: "Power 3",
          fr: "Puissance 3",
          es: "Potencia 3",
          ja: "次数 3",
          zh: "次数为 3"
        },
        lines: ["4-\\tfrac k2=3\\ \\Rightarrow\\ k=2:\\quad(-1)^2\\binom42=\\boxed{6}"],
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
