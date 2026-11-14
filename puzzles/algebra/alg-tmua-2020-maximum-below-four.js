/* algebra · Keep the maximum below 4
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-maximum-below-four",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 8",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 8",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 8",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第8問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 8 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Keep the maximum below 4",
      fr: "Garder le maximum sous 4",
      es: "Mantener el máximo por debajo de 4",
      ja: "最大値を 4 未満に",
      zh: "使最大值小于 4"
    },
    statement: {
      en: "$f(x)=-x^2+(p-2)x+2p$, and the maximum value of $f$ is less than $4$. <b>Which of the following are true?</b>",
      fr: "$f(x)=-x^2+(p-2)x+2p$, et la valeur maximale de $f$ est inférieure à $4$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=-x^2+(p-2)x+2p$, y el valor máximo de $f$ es menor que $4$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=-x^2+(p-2)x+2p$ の最大値は $4$ より小さい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=-x^2+(p-2)x+2p$ 的最大值小于 $4$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A downward parabola under the line y = 4.",
      fr: "Une parabole tournée vers le bas sous la droite y = 4.",
      es: "Una parábola hacia abajo bajo la recta y = 4.",
      ja: "直線 y = 4 の下にある上に凸の放物線。",
      zh: "位于直线 y = 4 下方、开口向下的抛物线。"
    },
    hint: {
      en: "The maximum is $f$ at $x=\\tfrac{p-2}2$, which equals $\\tfrac{(p+2)^2}4$.",
      fr: "Le maximum vaut $f\\bigl(\\tfrac{p-2}2\\bigr)=\\tfrac{(p+2)^2}4$.",
      es: "El máximo es $f\\bigl(\\tfrac{p-2}2\\bigr)=\\tfrac{(p+2)^2}4$.",
      ja: "最大値は $f\\bigl(\\tfrac{p-2}2\\bigr)=\\tfrac{(p+2)^2}4$。",
      zh: "最大值为 $f\\bigl(\\tfrac{p-2}2\\bigr)=\\tfrac{(p+2)^2}4$。"
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
      const S = ([x, y]) => [0.2 + (x - (-4)) * 0.57500, 0.2 + (y - (-4)) * 0.30000];
      F.seg(S([-4, 0]), S([4, 0]), 'axis'); F.seg(S([0, -4]), S([0, 6]), 'axis');
      plot(F, S, x => -x * x + 0 * x + 2, -3.5, 3.5, 'graph', 'base', -4, 6); F.seg(S([-4, 4]), S([4, 4]), 'seg thin dashc'); F.text(S([4, 4]), 'y = 4', 'len small', -20, -10);
      F.reveal = () => {
      F.text(S([0, 5.2]), '(p + 2)² / 4 < 4', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "y = 4": {"fr": "y = 4", "es": "y = 4", "ja": "y = 4", "zh": "y = 4"},
      "(p + 2)² / 4 < 4": {"fr": "(p + 2)² / 4 < 4", "es": "(p + 2)² / 4 < 4", "ja": "(p + 2)² / 4 < 4", "zh": "(p + 2)² / 4 < 4"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "-6<p<2", correct: true, why: {
        en: "$(p+2)^2<16$",
        fr: "$(p+2)^2<16$",
        es: "$(p+2)^2<16$",
        ja: "$(p+2)^2<16$",
        zh: "$(p+2)^2<16$"
      } },
      { tex: "p=0\\ \\text{works}", correct: true, why: {
        en: "$\\max=1$",
        fr: "$\\max=1$",
        es: "$\\max=1$",
        ja: "$\\max=1$",
        zh: "$\\max=1$"
      } },
      { tex: "-2<p<6", correct: false, why: {
        en: "Sign error in $(p+2)$.",
        fr: "Erreur de signe dans $(p+2)$.",
        es: "Error de signo en $(p+2)$.",
        ja: "$(p+2)$ の符号ミス。",
        zh: "$(p+2)$ 符号错误。"
      } },
      { tex: "p<-6\\ \\text{or}\\ p>2", correct: false, why: {
        en: "The complement.",
        fr: "Le complémentaire.",
        es: "El complementario.",
        ja: "補集合。",
        zh: "取了补集。"
      } },
      { tex: "-4<p<4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p<2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p>-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p=2\\ \\text{works}", correct: false, why: {
        en: "$\\max=4$",
        fr: "$\\max=4$",
        es: "$\\max=4$",
        ja: "$\\max=4$",
        zh: "$\\max=4$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vertex value",
          fr: "Valeur au sommet",
          es: "Valor en el vértice",
          ja: "頂点の値",
          zh: "顶点值"
        },
        lines: ["\\max f=\\tfrac{(p-2)^2}4+2p=\\tfrac{(p+2)^2}4"],
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
          en: "Inequality",
          fr: "Inéquation",
          es: "Inecuación",
          ja: "不等式",
          zh: "不等式"
        },
        lines: ["(p+2)^2<16\\iff-6<p<2"],
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
