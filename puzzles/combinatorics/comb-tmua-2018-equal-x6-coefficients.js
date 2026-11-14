/* combinatorics · Equal x⁶ coefficients
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-tmua-2018-equal-x6-coefficients",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 7",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 7",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 7",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第7問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 7 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Equal x⁶ coefficients",
      fr: "Coefficients de x⁶ égaux",
      es: "Coeficientes de x⁶ iguales",
      ja: "x⁶ の係数が等しい",
      zh: "x⁶ 系数相等"
    },
    statement: {
      en: "For a non-zero constant $k$, the coefficient of $x^6$ in $(1+kx^2)^7$ equals the coefficient of $x^6$ in $(k+x)^{10}$. <b>Which of the following are true?</b>",
      fr: "Pour une constante $k$ non nulle, le coefficient de $x^6$ dans $(1+kx^2)^7$ est égal à celui de $x^6$ dans $(k+x)^{10}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para una constante $k$ no nula, el coeficiente de $x^6$ en $(1+kx^2)^7$ es igual al de $x^6$ en $(k+x)^{10}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0$ でない定数 $k$ について、$(1+kx^2)^7$ と $(k+x)^{10}$ の $x^6$ の係数が等しい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "非零常数 $k$ 使 $(1+kx^2)^7$ 与 $(k+x)^{10}$ 中 $x^6$ 的系数相等。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two expansions side by side.",
      fr: "Deux développements côte à côte.",
      es: "Dos desarrollos lado a lado.",
      ja: "並べた2つの展開。",
      zh: "并列的两个展开式。"
    },
    hint: {
      en: "In the first, $x^6=(x^2)^3$; in the second, $x^6$ comes with $k^4$.",
      fr: "Dans le premier, $x^6=(x^2)^3$ ; dans le second, $x^6$ va avec $k^4$.",
      es: "En el primero, $x^6=(x^2)^3$; en el segundo, $x^6$ va con $k^4$.",
      ja: "1つ目は $x^6=(x^2)^3$、2つ目は $k^4$ を伴う。",
      zh: "第一个中 $x^6=(x^2)^3$；第二个中 $x^6$ 配 $k^4$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.4, scale: 46, pad: 16 });
      F.text([1.2, 0.8], '(1 + kx²)⁷', 'len small', 0, 0); F.text([3.8, 0.8], '(k + x)¹⁰', 'len small', 0, 0);
      F.reveal = () => {
      F.text([1.2, 0.25], '35k³', 'len small pink', 0, 0); F.text([3.8, 0.25], '210k⁴', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(1 + kx²)⁷": {"fr": "(1 + kx²)⁷", "es": "(1 + kx²)⁷", "ja": "(1 + kx²)⁷", "zh": "(1 + kx²)⁷"},
      "(k + x)¹⁰": {"fr": "(k + x)¹⁰", "es": "(k + x)¹⁰", "ja": "(k + x)¹⁰", "zh": "(k + x)¹⁰"},
      "35k³": {"fr": "35k³", "es": "35k³", "ja": "35k³", "zh": "35k³"},
      "210k⁴": {"fr": "210k⁴", "es": "210k⁴", "ja": "210k⁴", "zh": "210k⁴"},
      "the common coefficient is": {"fr": "le coefficient commun vaut", "es": "el coeficiente común es", "ja": "共通の係数は", "zh": "公共系数为"},
      "the coefficient in": {"fr": "le coefficient dans", "es": "el coeficiente en", "ja": "", "zh": ""},
      "is": {"fr": "vaut", "es": "es", "ja": "の係数は", "zh": "中的系数为"}
    },
    options: [
      { tex: "k=\\tfrac16", correct: true, why: {
        en: "$35k^3=210k^4$",
        fr: "$35k^3=210k^4$",
        es: "$35k^3=210k^4$",
        ja: "$35k^3=210k^4$",
        zh: "$35k^3=210k^4$"
      } },
      { tex: "\\text{the common coefficient is}\\ \\tfrac{35}{216}", correct: true, why: {
        en: "$35\\cdot\\tfrac1{216}$",
        fr: "$35\\cdot\\tfrac1{216}$",
        es: "$35\\cdot\\tfrac1{216}$",
        ja: "$35\\cdot\\tfrac1{216}$",
        zh: "$35\\cdot\\tfrac1{216}$"
      } },
      { tex: "k=6", correct: false, why: {
        en: "Inverts the ratio.",
        fr: "Inverse le rapport.",
        es: "Invierte la razón.",
        ja: "比を逆にした。",
        zh: "比值颠倒。"
      } },
      { tex: "k=\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=\\tfrac1{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=\\tfrac{7}{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the coefficient in}\\ (k+x)^{10}\\ \\text{is}\\ \\binom{10}6k^6", correct: false, why: {
        en: "$\\binom{10}6k^4$",
        fr: "$\\binom{10}6k^4$",
        es: "$\\binom{10}6k^4$",
        ja: "$\\binom{10}6k^4$",
        zh: "$\\binom{10}6k^4$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Coefficients",
          fr: "Coefficients",
          es: "Coeficientes",
          ja: "係数",
          zh: "系数"
        },
        lines: ["\\binom73k^3=35k^3,\\quad\\binom{10}6k^4=210k^4"],
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
          en: "Equate",
          fr: "Égaler",
          es: "Igualar",
          ja: "等置",
          zh: "令相等"
        },
        lines: ["35k^3=210k^4\\Rightarrow k=\\tfrac16\\ (k\\ne0)"],
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
