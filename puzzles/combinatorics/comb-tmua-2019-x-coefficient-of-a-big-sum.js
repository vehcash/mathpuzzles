/* combinatorics · The x-coefficient of (1+x)⁰ + … + (1+x)⁸⁰
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-tmua-2019-x-coefficient-of-a-big-sum",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 3",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 3",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 3",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第3問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 3 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "The x-coefficient of (1+x)⁰ + … + (1+x)⁸⁰",
      fr: "Le coefficient de x dans (1+x)⁰ + … + (1+x)⁸⁰",
      es: "El coeficiente de x en (1+x)⁰ + … + (1+x)⁸⁰",
      ja: "(1+x)⁰ + … + (1+x)⁸⁰ の x の係数",
      zh: "(1+x)⁰ + … + (1+x)⁸⁰ 中 x 的系数"
    },
    statement: {
      en: "Let $c$ be the coefficient of $x$ in $\\displaystyle\\sum_{n=0}^{80}(1+x)^n$. <b>Which of the following are true?</b>",
      fr: "Soit $c$ le coefficient de $x$ dans $\\displaystyle\\sum_{n=0}^{80}(1+x)^n$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $c$ el coeficiente de $x$ en $\\displaystyle\\sum_{n=0}^{80}(1+x)^n$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\displaystyle\\sum_{n=0}^{80}(1+x)^n$ の $x$ の係数を $c$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $\\displaystyle\\sum_{n=0}^{80}(1+x)^n$ 中 $x$ 的系数为 $c$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A staircase of bars 0, 1, 2, … 80.",
      fr: "Un escalier de barres 0, 1, 2, … 80.",
      es: "Una escalera de barras 0, 1, 2, … 80.",
      ja: "0, 1, 2, … 80 の階段状の棒。",
      zh: "0、1、2…80 的阶梯条形。"
    },
    hint: {
      en: "The $x$-coefficient of $(1+x)^n$ is $n$.",
      fr: "Le coefficient de $x$ dans $(1+x)^n$ est $n$.",
      es: "El coeficiente de $x$ en $(1+x)^n$ es $n$.",
      ja: "$(1+x)^n$ の $x$ の係数は $n$。",
      zh: "$(1+x)^n$ 中 $x$ 的系数为 $n$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.4, scale: 46, pad: 16 });
      for (let n = 0; n <= 80; n += 4) F.rect(0.2 + n * 0.057, 0.2, 0.18, 0.02 + n * 0.024, 'fill-blue', 'fills');
      F.reveal = () => {
      F.text([2.5, 2.2], '0 + 1 + … + 80 = 3240', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0 + 1 + … + 80 = 3240": {"fr": "0 + 1 + … + 80 = 3240", "es": "0 + 1 + … + 80 = 3240", "ja": "0 + 1 + … + 80 = 3240", "zh": "0 + 1 + … + 80 = 3240"}
    },
    options: [
      { tex: "c=3240", correct: true, why: {
        en: "$\\tfrac{80\\cdot81}2$",
        fr: "$\\tfrac{80\\cdot81}2$",
        es: "$\\tfrac{80\\cdot81}2$",
        ja: "$\\tfrac{80\\cdot81}2$",
        zh: "$\\tfrac{80\\cdot81}2$"
      } },
      { tex: "c=\\binom{81}2", correct: true, why: {
        en: "$\\sum_{n=0}^{80}\\binom n1=\\binom{81}2$",
        fr: "$\\sum_{n=0}^{80}\\binom n1=\\binom{81}2$",
        es: "$\\sum_{n=0}^{80}\\binom n1=\\binom{81}2$",
        ja: "$\\sum_{n=0}^{80}\\binom n1=\\binom{81}2$",
        zh: "$\\sum_{n=0}^{80}\\binom n1=\\binom{81}2$"
      } },
      { tex: "c=3160", correct: false, why: {
        en: "Uses $\\tfrac{79\\cdot80}2$.",
        fr: "Utilise $\\tfrac{79\\cdot80}2$.",
        es: "Usa $\\tfrac{79\\cdot80}2$.",
        ja: "$\\tfrac{79\\cdot80}2$ を使った。",
        zh: "用了 $\\tfrac{79\\cdot80}2$。"
      } },
      { tex: "c=6480", correct: false, why: {
        en: "Forgets to halve.",
        fr: "Oublie de diviser par 2.",
        es: "Olvida dividir entre 2.",
        ja: "2 で割り忘れ。",
        zh: "忘了除以 2。"
      } },
      { tex: "c=80", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=81", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=3321", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=\\binom{80}2", correct: false, why: {
        en: "$3160$",
        fr: "$3160$",
        es: "$3160$",
        ja: "$3160$",
        zh: "$3160$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Each term",
          fr: "Chaque terme",
          es: "Cada término",
          ja: "各項",
          zh: "每一项"
        },
        lines: ["(1+x)^n=1+nx+\\dots"],
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
          en: "Add",
          fr: "Additionner",
          es: "Sumar",
          ja: "足す",
          zh: "相加"
        },
        lines: ["0+1+\\dots+80=\\tfrac{80\\cdot81}2=3240"],
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
