/* algebra · The largest value of 1/(25x² − 20x + 7)
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-max-of-reciprocal-quadratic",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 6",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 6",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 6",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第6問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 6 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "The largest value of 1/(25x² − 20x + 7)",
      fr: "La plus grande valeur de 1/(25x² − 20x + 7)",
      es: "El mayor valor de 1/(25x² − 20x + 7)",
      ja: "1/(25x² − 20x + 7) の最大値",
      zh: "1/(25x² − 20x + 7) 的最大值"
    },
    statement: {
      en: "Let $M$ be the maximum value of $\\dfrac1{25x^2-20x+7}$ over real $x$. <b>Which of the following are true?</b>",
      fr: "Soit $M$ la valeur maximale de $\\dfrac1{25x^2-20x+7}$ pour $x$ réel. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $M$ el valor máximo de $\\dfrac1{25x^2-20x+7}$ para $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ に対する $\\dfrac1{25x^2-20x+7}$ の最大値を $M$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $\\dfrac1{25x^2-20x+7}$ 在实数范围内的最大值为 $M$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of the denominator, an upward parabola above the x-axis.",
      fr: "Le graphe du dénominateur, parabole tournée vers le haut au-dessus de l’axe.",
      es: "La gráfica del denominador, parábola hacia arriba sobre el eje.",
      ja: "分母のグラフ（x 軸より上の下に凸の放物線）。",
      zh: "分母的图像：位于 x 轴上方、开口向上的抛物线。"
    },
    hint: {
      en: "Complete the square in $u=5x$.",
      fr: "Complétez le carré en $u=5x$.",
      es: "Completa el cuadrado en $u=5x$.",
      ja: "$u=5x$ で平方完成。",
      zh: "对 $u=5x$ 配方。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-0.4)) * 2.87500, 0.2 + (y - (-1)) * 0.23077];
      F.seg(S([-0.4, 0]), S([1.2, 0]), 'axis'); F.seg(S([0, -1]), S([0, 12]), 'axis');
      plot(F, S, x => 25 * x * x - 20 * x + 7, -0.4, 1.2, 'graph', 'base', -1, 12);
      F.reveal = () => {
      F.dot(S([0.4, 3])); F.text(S([0.4, 3]), '(2/5, 3)', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(2/5, 3)": {"fr": "(2/5, 3)", "es": "(2/5, 3)", "ja": "(2/5, 3)", "zh": "(2/5, 3)"},
      "the maximum occurs at": {"fr": "le maximum est atteint en", "es": "el máximo se alcanza en", "ja": "最大値をとるのは", "zh": "最大值在"},
      "there is no maximum": {"fr": "il n’y a pas de maximum", "es": "no hay máximo", "ja": "最大値はない", "zh": "没有最大值"},
      "equality at": {"fr": "égalité en", "es": "igualdad en", "ja": "等号成立は", "zh": "取等于"}
    },
    options: [
      { tex: "M=\\tfrac13", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "\\text{the maximum occurs at}\\ x=\\tfrac25", correct: true, why: {
        en: "$(5x-2)^2+3$",
        fr: "$(5x-2)^2+3$",
        es: "$(5x-2)^2+3$",
        ja: "$(5x-2)^2+3$",
        zh: "$(5x-2)^2+3$"
      } },
      { tex: "M=\\tfrac17", correct: false, why: {
        en: "Value at $x=0$, not the maximum.",
        fr: "Valeur en $x=0$, pas le maximum.",
        es: "Valor en $x=0$, no el máximo.",
        ja: "$x=0$ での値。",
        zh: "那是 $x=0$ 处的值。"
      } },
      { tex: "M=3", correct: false, why: {
        en: "The minimum of the denominator, not of the fraction.",
        fr: "Minimum du dénominateur.",
        es: "Mínimo del denominador.",
        ja: "分母の最小値。",
        zh: "那是分母的最小值。"
      } },
      { tex: "M=\\tfrac1{11}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there is no maximum}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=\\tfrac{25}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the maximum occurs at}\\ x=2", correct: false, why: {
        en: "Forgets $u=5x$.",
        fr: "Oublie $u=5x$.",
        es: "Olvida $u=5x$.",
        ja: "$u=5x$ を忘れた。",
        zh: "忘了 $u=5x$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Complete the square",
          fr: "Compléter le carré",
          es: "Completar el cuadrado",
          ja: "平方完成",
          zh: "配方"
        },
        lines: ["25x^2-20x+7=(5x-2)^2+3\\ge3"],
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
          en: "Invert",
          fr: "Inverser",
          es: "Invertir",
          ja: "逆数",
          zh: "取倒数"
        },
        lines: ["\\dfrac1{(5x-2)^2+3}\\le\\tfrac13,\\ \\text{equality at}\\ x=\\tfrac25"],
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
