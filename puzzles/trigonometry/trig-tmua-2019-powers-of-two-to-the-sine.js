/* trigonometry · Largest value of 4^sin x − 2^(sin x + 2) + 17/4
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2019-powers-of-two-to-the-sine",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 13",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 13",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 13",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第13問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 13 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Largest value of 4^sin x − 2^(sin x + 2) + 17/4",
      fr: "Plus grande valeur de 4^sin x − 2^(sin x + 2) + 17/4",
      es: "Mayor valor de 4^sen x − 2^(sen x + 2) + 17/4",
      ja: "4^sin x − 2^(sin x + 2) + 17/4 の最大値",
      zh: "4^sin x − 2^(sin x + 2) + 17/4 的最大值"
    },
    statement: {
      en: "Let $M$ be the largest value of $4^{\\sin x}-2^{\\sin x+2}+\\tfrac{17}4$ over real $x$. <b>Which of the following are true?</b>",
      fr: "Soit $M$ la plus grande valeur de $4^{\\sin x}-2^{\\sin x+2}+\\tfrac{17}4$ pour $x$ réel. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $M$ el mayor valor de $4^{\\sin x}-2^{\\sin x+2}+\\tfrac{17}4$ para $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ に対する $4^{\\sin x}-2^{\\sin x+2}+\\tfrac{17}4$ の最大値を $M$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $4^{\\sin x}-2^{\\sin x+2}+\\tfrac{17}4$ 在实数范围内的最大值为 $M$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A parabola in u = 2^sin x, restricted to [1/2, 2].",
      fr: "Une parabole en u = 2^sin x, restreinte à [1/2, 2].",
      es: "Una parábola en u = 2^sen x, restringida a [1/2, 2].",
      ja: "u = 2^sin x の放物線（[1/2, 2] に制限）。",
      zh: "关于 u = 2^sin x 的抛物线，限制在 [1/2, 2]。"
    },
    hint: {
      en: "With $u=2^{\\sin x}\\in[\\tfrac12,2]$ the expression is $(u-2)^2+\\tfrac14$.",
      fr: "Avec $u=2^{\\sin x}\\in[\\tfrac12,2]$, l’expression vaut $(u-2)^2+\\tfrac14$.",
      es: "Con $u=2^{\\sin x}\\in[\\tfrac12,2]$ la expresión es $(u-2)^2+\\tfrac14$.",
      ja: "$u=2^{\\sin x}\\in[\\tfrac12,2]$ とすると $(u-2)^2+\\tfrac14$。",
      zh: "令 $u=2^{\\sin x}\\in[\\tfrac12,2]$，式子为 $(u-2)^2+\\tfrac14$。"
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
      const S = ([x, y]) => [0.2 + (x - (-0.2)) * 1.27778, 0.2 + (y - (-0.3)) * 0.85714];
      const K = 1.27778;
      F.seg(S([-0.2, 0]), S([3.4, 0]), 'axis'); F.seg(S([0, -0.3]), S([0, 3.2]), 'axis');
      plot(F, S, u => (u - 2) ** 2 + 0.25, 0, 3.4, 'seg thin', 'base', -0.3, 3.2); F.seg(S([0.5, -0.1]), S([0.5, 0.1]), 'axis'); F.seg(S([2, -0.1]), S([2, 0.1]), 'axis'); F.text(S([0.5, 0]), '1/2', 'tick', 0, 14); F.text(S([2, 0]), '2', 'tick', 0, 14); F.text(S([3.3, 0]), 'u', 'tick', 0, 14);
      F.reveal = () => {
      plot(F, S, u => (u - 2) ** 2 + 0.25, 0.5, 2, 'hl pink', 'base', -0.3, 3.2); F.dot(S([0.5, 2.5]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1/2": {"fr": "1/2", "es": "1/2", "ja": "1/2", "zh": "1/2"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "u": {"fr": "u", "es": "u", "ja": "u", "zh": "u"},
      "the maximum occurs when": {"fr": "le maximum est atteint quand", "es": "el máximo se alcanza cuando", "ja": "最大となるのは", "zh": "最大值出现在"}
    },
    options: [
      { tex: "M=\\tfrac52", correct: true, why: {
        en: "$\\left(\\tfrac12-2\\right)^2+\\tfrac14$",
        fr: "$\\left(\\tfrac12-2\\right)^2+\\tfrac14$",
        es: "$\\left(\\tfrac12-2\\right)^2+\\tfrac14$",
        ja: "$\\left(\\tfrac12-2\\right)^2+\\tfrac14$",
        zh: "$\\left(\\tfrac12-2\\right)^2+\\tfrac14$"
      } },
      { tex: "\\text{the maximum occurs when}\\ \\sin x=-1", correct: true, why: {
        en: "$u=\\tfrac12$",
        fr: "$u=\\tfrac12$",
        es: "$u=\\tfrac12$",
        ja: "$u=\\tfrac12$",
        zh: "$u=\\tfrac12$"
      } },
      { tex: "M=\\tfrac{17}4", correct: false, why: {
        en: "Value at $u=0$, which is not allowed.",
        fr: "Valeur en $u=0$, interdite.",
        es: "Valor en $u=0$, no permitido.",
        ja: "$u=0$ は取れない。",
        zh: "$u=0$ 取不到。"
      } },
      { tex: "M=\\tfrac14", correct: false, why: {
        en: "That is the minimum.",
        fr: "C’est le minimum.",
        es: "Es el mínimo.",
        ja: "それは最小値。",
        zh: "那是最小值。"
      } },
      { tex: "M=\\tfrac94", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=\\tfrac{13}4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the maximum occurs when}\\ \\sin x=1", correct: false, why: {
        en: "$u=2\\Rightarrow\\tfrac14$",
        fr: "$u=2\\Rightarrow\\tfrac14$",
        es: "$u=2\\Rightarrow\\tfrac14$",
        ja: "$u=2\\Rightarrow\\tfrac14$",
        zh: "$u=2\\Rightarrow\\tfrac14$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "代入",
          zh: "代换"
        },
        lines: ["4^{\\sin x}=u^2,\\ 2^{\\sin x+2}=4u\\Rightarrow u^2-4u+\\tfrac{17}4=(u-2)^2+\\tfrac14"],
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
          en: "Range of u",
          fr: "Domaine de u",
          es: "Rango de u",
          ja: "u の範囲",
          zh: "u 的范围"
        },
        lines: ["u\\in\\left[\\tfrac12,2\\right]\\Rightarrow M=\\tfrac94+\\tfrac14=\\tfrac52"],
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
