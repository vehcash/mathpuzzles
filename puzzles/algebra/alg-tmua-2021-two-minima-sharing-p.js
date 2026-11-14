/* algebra · Two minima that share p
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2021-two-minima-sharing-p",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 12",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 12",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 12",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第12問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 12 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Two minima that share p",
      fr: "Deux minimums qui partagent p",
      es: "Dos mínimos que comparten p",
      ja: "p を共有する2つの最小値",
      zh: "共享 p 的两个最小值"
    },
    statement: {
      en: "The minimum value of $x^4-p^2x^2$ is $-9$. Let $m$ be the minimum value of $x^2-px+6$. <b>Which of the following are true?</b>",
      fr: "La valeur minimale de $x^4-p^2x^2$ est $-9$. Soit $m$ la valeur minimale de $x^2-px+6$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El valor mínimo de $x^4-p^2x^2$ es $-9$. Sea $m$ el valor mínimo de $x^2-px+6$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x^4-p^2x^2$ の最小値は $-9$。$x^2-px+6$ の最小値を $m$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$x^4-p^2x^2$ 的最小值为 $-9$，设 $x^2-px+6$ 的最小值为 $m$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two parabolas: one in u = x² reaching −9, and the second quadratic whose minimum we want.",
      fr: "Deux paraboles : une en u = x² qui descend à −9, et le second trinôme dont on cherche le minimum.",
      es: "Dos parábolas: una en u = x² que baja hasta −9, y la segunda cuadrática cuyo mínimo buscamos.",
      ja: "2つの放物線：u = x² の式（最小 −9）と、最小値を求める2次式。",
      zh: "两条抛物线：关于 u = x² 的一条（最低 −9）和要求最小值的另一条。"
    },
    hint: {
      en: "Complete the square in $x^2$: $\\bigl(x^2-\\tfrac{p^2}2\\bigr)^2-\\tfrac{p^4}4$.",
      fr: "Complétez le carré en $x^2$ : $\\bigl(x^2-\\tfrac{p^2}2\\bigr)^2-\\tfrac{p^4}4$.",
      es: "Completa el cuadrado en $x^2$: $\\bigl(x^2-\\tfrac{p^2}2\\bigr)^2-\\tfrac{p^4}4$.",
      ja: "$x^2$ で平方完成：$\\bigl(x^2-\\tfrac{p^2}2\\bigr)^2-\\tfrac{p^4}4$。",
      zh: "对 $x^2$ 配方：$\\bigl(x^2-\\tfrac{p^2}2\\bigr)^2-\\tfrac{p^4}4$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.2, scale: 46, pad: 16 });
      const A = ([u, y]) => [0.3 + u * 0.38, 2.3 + y * 0.2];
      F.seg(A([0, 0]), A([6.6, 0]), 'axis'); F.seg(A([0, -10]), A([0, 4]), 'axis'); F.text(A([6.4, 0]), 'u', 'tick', 0, -10);
      plot(F, A, u => u * u - 6 * u, 0, 6.4, 'graph', 'base', -10, 4); F.seg(A([0, -9]), A([6.4, -9]), 'seg thin dashc'); F.text(A([6.4, -9]), '−9', 'len small', 12, 0);
      const B = ([x, y]) => [3.4 + x * 0.55, 0.3 + y * 0.28];
      F.seg(B([-0.6, 0]), B([3.4, 0]), 'axis'); F.seg(B([0, -0.3]), B([0, 9]), 'axis'); F.text(B([3.3, 0]), 'x', 'tick', 0, 12);
      plot(F, B, x => x * x - 2.4 * x + 6, -0.4, 3.3, 'seg', 'base', -0.3, 9);
      F.reveal = () => {
      F.dot(A([3, -9])); F.text(A([3, -9]), 'u = p²/2 = 3', 'len small pink', 0, 16);
      plot(F, B, x => x * x - Math.sqrt(6) * x + 6, -0.4, 3.3, 'hl pink', 'base', -0.3, 9); F.text(B([Math.sqrt(6) / 2, 4.5]), '9/2', 'len small pink', 0, 18);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "−9": {"fr": "−9", "es": "−9", "ja": "−9", "zh": "−9"},
      "u": {"fr": "u", "es": "u", "ja": "u", "zh": "u"},
      "x": {"fr": "x", "es": "x", "ja": "x", "zh": "x"},
      "u = p²/2 = 3": {"fr": "u = p²/2 = 3", "es": "u = p²/2 = 3", "ja": "u = p²/2 = 3", "zh": "u = p²/2 = 3"},
      "9/2": {"fr": "9/2", "es": "9/2", "ja": "9/2", "zh": "9/2"}
    },
    options: [
      { tex: "m=\\tfrac92", correct: true, why: {
        en: "$6-\\tfrac{p^2}4$",
        fr: "$6-\\tfrac{p^2}4$",
        es: "$6-\\tfrac{p^2}4$",
        ja: "$6-\\tfrac{p^2}4$",
        zh: "$6-\\tfrac{p^2}4$"
      } },
      { tex: "p^2=6", correct: true, why: {
        en: "$\\tfrac{p^4}4=9$",
        fr: "$\\tfrac{p^4}4=9$",
        es: "$\\tfrac{p^4}4=9$",
        ja: "$\\tfrac{p^4}4=9$",
        zh: "$\\tfrac{p^4}4=9$"
      } },
      { tex: "m=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=6", correct: false, why: {
        en: "Ignores the $-px$ term.",
        fr: "Ignore le terme $-px$.",
        es: "Ignora el término $-px$.",
        ja: "$-px$ を無視。",
        zh: "忽略了 $-px$ 项。"
      } },
      { tex: "m=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=\\tfrac{15}2", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "m=\\tfrac32", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p^2=3", correct: false, why: {
        en: "$p^4=36$",
        fr: "$p^4=36$",
        es: "$p^4=36$",
        ja: "$p^4=36$",
        zh: "$p^4=36$"
      } }
    ],
    steps: [
      {
        title: {
          en: "First minimum",
          fr: "Premier minimum",
          es: "Primer mínimo",
          ja: "1つ目の最小値",
          zh: "第一个最小值"
        },
        lines: ["-\\tfrac{p^4}4=-9\\Rightarrow p^2=6"],
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
          en: "Second minimum",
          fr: "Second minimum",
          es: "Segundo mínimo",
          ja: "2つ目の最小値",
          zh: "第二个最小值"
        },
        lines: ["\\bigl(x-\\tfrac p2\\bigr)^2+6-\\tfrac{p^2}4\\Rightarrow m=6-\\tfrac64=\\tfrac92"],
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
