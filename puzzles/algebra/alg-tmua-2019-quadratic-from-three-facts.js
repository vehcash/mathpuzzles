/* algebra · A quadratic from three facts
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2019-quadratic-from-three-facts",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 1",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 1",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 1",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第1問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 1 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "A quadratic from three facts",
      fr: "Un trinôme à partir de trois faits",
      es: "Una cuadrática a partir de tres datos",
      ja: "3つの条件から2次関数",
      zh: "由三个条件确定二次函数"
    },
    statement: {
      en: "$f(x)=ax^2+bx+c$ satisfies $f(1)=-1$, $f(-1)=3$ and $f'(-1)=0$. <b>Which of the following are true?</b>",
      fr: "$f(x)=ax^2+bx+c$ vérifie $f(1)=-1$, $f(-1)=3$ et $f'(-1)=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=ax^2+bx+c$ cumple $f(1)=-1$, $f(-1)=3$ y $f'(-1)=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=ax^2+bx+c$ は $f(1)=-1$、$f(-1)=3$、$f'(-1)=0$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=ax^2+bx+c$ 满足 $f(1)=-1$，$f(-1)=3$，$f'(-1)=0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two points and a flat tangent at x = −1.",
      fr: "Deux points et une tangente horizontale en x = −1.",
      es: "Dos puntos y una tangente horizontal en x = −1.",
      ja: "2点と x = −1 での水平な接線。",
      zh: "两点及 x = −1 处的水平切线。"
    },
    hint: {
      en: "$f(1)-f(-1)=2b$.",
      fr: "$f(1)-f(-1)=2b$.",
      es: "$f(1)-f(-1)=2b$.",
      ja: "$f(1)-f(-1)=2b$。",
      zh: "$f(1)-f(-1)=2b$。"
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
      const S = ([x, y]) => [0.2 + (x - (-3)) * 0.92000, 0.2 + (y - (-3)) * 0.40000];
      const K = 0.92000;
      F.seg(S([-3, 0]), S([2, 0]), 'axis'); F.seg(S([0, -3]), S([0, 4.5]), 'axis');
      F.dot(S([1, -1])); F.dot(S([-1, 3])); F.seg(S([-1.8, 3]), S([-0.2, 3]), 'seg thin dashc');
      F.reveal = () => {
      plot(F, S, x => -x * x - 2 * x + 2, -3, 1.8, 'hl pink', 'base', -3, 4.5);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the maximum value of": {"fr": "la valeur maximale de", "es": "el valor máximo de", "ja": "", "zh": ""},
      "is": {"fr": "est", "es": "es", "ja": "の最大値は", "zh": "的最大值为"}
    },
    options: [
      { tex: "f(x)=-x^2-2x+2", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "\\text{the maximum value of}\\ f\\ \\text{is}\\ 3", correct: true, why: {
        en: "$a<0,\\ f(-1)=3$",
        fr: "$a<0,\\ f(-1)=3$",
        es: "$a<0,\\ f(-1)=3$",
        ja: "$a<0,\\ f(-1)=3$",
        zh: "$a<0,\\ f(-1)=3$"
      } },
      { tex: "f(x)=x^2+2x-4", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "f(x)=-x^2+2x+2", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "f(x)=-2x^2-2x+3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(x)=x^2-2x", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "b=2", correct: false, why: {
        en: "$2b=-1-3$",
        fr: "$2b=-1-3$",
        es: "$2b=-1-3$",
        ja: "$2b=-1-3$",
        zh: "$2b=-1-3$"
      } },
      { tex: "f(0)=3", correct: false, why: {
        en: "$c=2$",
        fr: "$c=2$",
        es: "$c=2$",
        ja: "$c=2$",
        zh: "$c=2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use f(1) − f(−1)",
          fr: "Utiliser f(1) − f(−1)",
          es: "Usar f(1) − f(−1)",
          ja: "f(1) − f(−1) を使う",
          zh: "利用 f(1) − f(−1)"
        },
        lines: ["2b=-4\\Rightarrow b=-2"],
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
          en: "Flat at −1",
          fr: "Horizontale en −1",
          es: "Horizontal en −1",
          ja: "−1 で水平",
          zh: "−1 处水平"
        },
        lines: ["-2a+b=0\\Rightarrow a=-1,\\ c=-1-a-b=2"],
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
