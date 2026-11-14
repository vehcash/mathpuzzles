/* combinatorics · Coefficient of x²y⁴ in (1 + x + y²)⁷
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-tmua-2020-coefficient-x2-y4",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 13",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 13",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 13",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第13問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 13 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Coefficient of x²y⁴ in (1 + x + y²)⁷",
      fr: "Coefficient de x²y⁴ dans (1 + x + y²)⁷",
      es: "Coeficiente de x²y⁴ en (1 + x + y²)⁷",
      ja: "(1 + x + y²)⁷ の x²y⁴ の係数",
      zh: "(1 + x + y²)⁷ 中 x²y⁴ 的系数"
    },
    statement: {
      en: "Let $c$ be the coefficient of $x^2y^4$ in the expansion of $(1+x+y^2)^7$. <b>Which of the following are true?</b>",
      fr: "Soit $c$ le coefficient de $x^2y^4$ dans le développement de $(1+x+y^2)^7$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $c$ el coeficiente de $x^2y^4$ en el desarrollo de $(1+x+y^2)^7$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$(1+x+y^2)^7$ の展開における $x^2y^4$ の係数を $c$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $(1+x+y^2)^7$ 展开式中 $x^2y^4$ 的系数为 $c$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Seven brackets, each giving 1, x or y².",
      fr: "Sept parenthèses, chacune donnant 1, x ou y².",
      es: "Siete paréntesis, cada uno da 1, x o y².",
      ja: "7つの括弧からそれぞれ 1, x, y² を選ぶ。",
      zh: "七个括号，每个取 1、x 或 y²。"
    },
    hint: {
      en: "Choose which 2 brackets give $x$ and which 2 give $y^2$.",
      fr: "Choisissez les 2 parenthèses donnant $x$ et les 2 donnant $y^2$.",
      es: "Elige qué 2 paréntesis dan $x$ y qué 2 dan $y^2$.",
      ja: "$x$ を出す2つと $y^2$ を出す2つを選ぶ。",
      zh: "选出给 $x$ 的 2 个与给 $y^2$ 的 2 个括号。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.4, scale: 46, pad: 16 });
      for (let i = 0; i < 7; i++) { F.rect(0.2 + i * 0.82, 0.3, 0.7, 0.7, 'fill-blue', 'fills'); F.text([0.55 + i * 0.82, 0.65], '( )', 'tick', 0, 0); }
      F.reveal = () => {
      ['x', 'x', 'y²', 'y²', '1', '1', '1'].forEach((s, i) => F.text([0.55 + i * 0.82, 1.2], s, 'len small pink', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "( )": {"fr": "( )", "es": "( )", "ja": "( )", "zh": "( )"},
      "x": {"fr": "x", "es": "x", "ja": "x", "zh": "x"},
      "y²": {"fr": "y²", "es": "y²", "ja": "y²", "zh": "y²"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"}
    },
    options: [
      { tex: "c=210", correct: true, why: {
        en: "$\\dfrac{7!}{2!\\,2!\\,3!}$",
        fr: "$\\dfrac{7!}{2!\\,2!\\,3!}$",
        es: "$\\dfrac{7!}{2!\\,2!\\,3!}$",
        ja: "$\\dfrac{7!}{2!\\,2!\\,3!}$",
        zh: "$\\dfrac{7!}{2!\\,2!\\,3!}$"
      } },
      { tex: "c=\\binom72\\binom52", correct: true, why: {
        en: "$21\\cdot10$",
        fr: "$21\\cdot10$",
        es: "$21\\cdot10$",
        ja: "$21\\cdot10$",
        zh: "$21\\cdot10$"
      } },
      { tex: "c=105", correct: false, why: {
        en: "Divides by an extra 2.",
        fr: "Divise par 2 de trop.",
        es: "Divide por 2 de más.",
        ja: "余計に 2 で割った。",
        zh: "多除了 2。"
      } },
      { tex: "c=35", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=420", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=21", correct: false, why: {
        en: "Only chooses the $x$ brackets.",
        fr: "Ne choisit que les $x$.",
        es: "Solo elige los de $x$.",
        ja: "$x$ の括弧だけ選んだ。",
        zh: "只选了 $x$ 的括号。"
      } },
      { tex: "c=630", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=\\binom74", correct: false, why: {
        en: "$35$",
        fr: "$35$",
        es: "$35$",
        ja: "$35$",
        zh: "$35$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Multinomial",
          fr: "Multinôme",
          es: "Multinomio",
          ja: "多項係数",
          zh: "多项式系数"
        },
        lines: ["1^3\\,x^2\\,(y^2)^2:\\ \\dfrac{7!}{3!\\,2!\\,2!}"],
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
          en: "Evaluate",
          fr: "Calculer",
          es: "Calcular",
          ja: "計算",
          zh: "计算"
        },
        lines: ["\\dfrac{5040}{6\\cdot2\\cdot2}=210"],
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
