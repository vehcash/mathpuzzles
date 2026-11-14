/* calculus · Integrals over unit steps add up
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2021-sum-of-growing-integrals",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 13",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 13",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 13",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第13問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 13 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Integrals over unit steps add up",
      fr: "Des intégrales sur des pas unités qui s’additionnent",
      es: "Integrales sobre pasos unidad que se suman",
      ja: "単位区間ごとの積分を足し上げる",
      zh: "逐单位区间积分求和"
    },
    statement: {
      en: "A function satisfies $\\displaystyle\\int_{k-1}^{k}f(x)\\,dx=k$ for every positive integer $k$. Let $T=\\displaystyle\\sum_{r=1}^{8}\\int_0^rf(x)\\,dx$. <b>Which of the following are true?</b>",
      fr: "Une fonction vérifie $\\displaystyle\\int_{k-1}^{k}f(x)\\,dx=k$ pour tout entier $k\\ge1$. Soit $T=\\displaystyle\\sum_{r=1}^{8}\\int_0^rf(x)\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una función cumple $\\displaystyle\\int_{k-1}^{k}f(x)\\,dx=k$ para todo entero $k\\ge1$. Sea $T=\\displaystyle\\sum_{r=1}^{8}\\int_0^rf(x)\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "関数はすべての正の整数 $k$ で $\\displaystyle\\int_{k-1}^{k}f(x)\\,dx=k$ を満たします。$T=\\displaystyle\\sum_{r=1}^{8}\\int_0^rf(x)\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "函数对所有正整数 $k$ 满足 $\\displaystyle\\int_{k-1}^{k}f(x)\\,dx=k$，设 $T=\\displaystyle\\sum_{r=1}^{8}\\int_0^rf(x)\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Unit strips with areas 1, 2, 3, …",
      fr: "Des bandes unité d’aires 1, 2, 3, …",
      es: "Franjas unidad de áreas 1, 2, 3, …",
      ja: "面積 1, 2, 3, … の単位帯。",
      zh: "面积为 1、2、3…的单位条。"
    },
    hint: {
      en: "$\\int_0^rf=1+2+\\dots+r$.",
      fr: "$\\int_0^rf=1+2+\\dots+r$.",
      es: "$\\int_0^rf=1+2+\\dots+r$.",
      ja: "$\\int_0^rf=1+2+\\dots+r$。",
      zh: "$\\int_0^rf=1+2+\\dots+r$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 2.6, scale: 46, pad: 16 });
      for (let k = 1; k <= 8; k++) { F.rect(0.2 + (k - 1) * 0.62, 0.2, 0.56, k * 0.26, 'fill-blue', 'fills'); F.text([0.48 + (k - 1) * 0.62, 0.2 + k * 0.26 + 0.15], String(k), 'tick', 0, 0); }
      F.reveal = () => {
      F.text([2.7, 2.45], '1 + 3 + 6 + … + 36 = 120', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "5": {"fr": "5", "es": "5", "ja": "5", "zh": "5"},
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "7": {"fr": "7", "es": "7", "ja": "7", "zh": "7"},
      "8": {"fr": "8", "es": "8", "ja": "8", "zh": "8"},
      "1 + 3 + 6 + … + 36 = 120": {"fr": "1 + 3 + 6 + … + 36 = 120", "es": "1 + 3 + 6 + … + 36 = 120", "ja": "1 + 3 + 6 + … + 36 = 120", "zh": "1 + 3 + 6 + … + 36 = 120"}
    },
    options: [
      { tex: "T=120", correct: true, why: {
        en: "$\\sum\\tfrac{r(r+1)}2$",
        fr: "$\\sum\\tfrac{r(r+1)}2$",
        es: "$\\sum\\tfrac{r(r+1)}2$",
        ja: "$\\sum\\tfrac{r(r+1)}2$",
        zh: "$\\sum\\tfrac{r(r+1)}2$"
      } },
      { tex: "\\int_0^rf(x)\\,dx=\\tfrac{r(r+1)}2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "T=36", correct: false, why: {
        en: "That is only $\\int_0^8f$.",
        fr: "C’est seulement $\\int_0^8f$.",
        es: "Es solo $\\int_0^8f$.",
        ja: "$\\int_0^8f$ だけ。",
        zh: "只是 $\\int_0^8f$。"
      } },
      { tex: "T=204", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=84", correct: false, why: {
        en: "Stops at $r=7$.",
        fr: "S’arrête à $r=7$.",
        es: "Se detiene en $r=7$.",
        ja: "$r=7$ で止めた。",
        zh: "只算到 $r=7$。"
      } },
      { tex: "T=165", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=240", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=64", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Inner integral",
          fr: "Intégrale intérieure",
          es: "Integral interior",
          ja: "内側の積分",
          zh: "内层积分"
        },
        lines: ["\\int_0^rf=\\sum_{k=1}^rk=\\tfrac{r(r+1)}2"],
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
          en: "Sum",
          fr: "Somme",
          es: "Suma",
          ja: "和",
          zh: "求和"
        },
        lines: ["1+3+6+10+15+21+28+36=120"],
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
