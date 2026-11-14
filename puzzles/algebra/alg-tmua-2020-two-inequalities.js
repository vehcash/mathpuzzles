/* algebra · Two inequalities at once
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-two-inequalities",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 3",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 3",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 3",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第3問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 3 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "Two inequalities at once",
      fr: "Deux inéquations à la fois",
      es: "Dos inecuaciones a la vez",
      ja: "2つの不等式を同時に",
      zh: "同时满足两个不等式"
    },
    statement: {
      en: "Consider the real $x$ with $(x+4)(x+3)(1-x)>0$ and $(x+2)(x-2)<0$. <b>Which of the following are true?</b>",
      fr: "On considère les réels $x$ tels que $(x+4)(x+3)(1-x)>0$ et $(x+2)(x-2)<0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera los $x$ reales con $(x+4)(x+3)(1-x)>0$ y $(x+2)(x-2)<0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$(x+4)(x+3)(1-x)>0$ かつ $(x+2)(x-2)<0$ を満たす実数 $x$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑满足 $(x+4)(x+3)(1-x)>0$ 且 $(x+2)(x-2)<0$ 的实数 $x$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line from −5 to 3.",
      fr: "Une droite numérique de −5 à 3.",
      es: "Una recta numérica de −5 a 3.",
      ja: "−5 から 3 の数直線。",
      zh: "−5 到 3 的数轴。"
    },
    hint: {
      en: "Sign table for the cubic: it is positive for $x<-4$ and for $-3<x<1$.",
      fr: "Tableau de signes de la cubique : positive pour $x<-4$ et pour $-3<x<1$.",
      es: "Tabla de signos de la cúbica: positiva para $x<-4$ y para $-3<x<1$.",
      ja: "3次式の符号表：$x<-4$ と $-3<x<1$ で正。",
      zh: "三次式符号表：$x<-4$ 与 $-3<x<1$ 时为正。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.0, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-5.5)) * 0.51111, 0.2 + (y - (-1)) * 0.80000];
      F.seg(S([-5.5, 0]), S([3.5, 0]), 'axis'); F.seg(S([0, -1]), S([0, 1]), 'axis');
      for (let k = -5; k <= 3; k++) { F.seg(S([k, -0.15]), S([k, 0.15]), 'axis'); F.text(S([k, 0]), String(k).replace('-', '−'), 'tick', 0, 16); }
      F.reveal = () => {
      F.seg(S([-2, 0.4]), S([1, 0.4]), 'hl pink'); F.seg(S([-3, -0.5]), S([1, -0.5]), 'seg'); F.seg(S([-5.5, -0.5]), S([-4, -0.5]), 'seg'); F.seg(S([-2, -0.8]), S([2, -0.8]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "−1": {"fr": "−1", "es": "−1", "ja": "−1", "zh": "−1"},
      "−2": {"fr": "−2", "es": "−2", "ja": "−2", "zh": "−2"},
      "−3": {"fr": "−3", "es": "−3", "ja": "−3", "zh": "−3"},
      "−4": {"fr": "−4", "es": "−4", "ja": "−4", "zh": "−4"},
      "−5": {"fr": "−5", "es": "−5", "ja": "−5", "zh": "−5"},
      "satisfies both": {"fr": "vérifie les deux", "es": "cumple ambas", "ja": "は両方を満たす", "zh": "同时满足"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "-2<x<1", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "x=0\\ \\text{satisfies both}", correct: true, why: {
        en: "$12>0,\\ -4<0$",
        fr: "$12>0,\\ -4<0$",
        es: "$12>0,\\ -4<0$",
        ja: "$12>0,\\ -4<0$",
        zh: "$12>0,\\ -4<0$"
      } },
      { tex: "-3<x<1", correct: false, why: {
        en: "Ignores the second inequality.",
        fr: "Oublie la seconde inéquation.",
        es: "Olvida la segunda inecuación.",
        ja: "2つ目を無視。",
        zh: "忽略了第二个不等式。"
      } },
      { tex: "-2<x<2", correct: false, why: {
        en: "Ignores the first inequality.",
        fr: "Oublie la première.",
        es: "Olvida la primera.",
        ja: "1つ目を無視。",
        zh: "忽略了第一个不等式。"
      } },
      { tex: "x<-4\\ \\text{or}\\ -2<x<1", correct: false, why: {
        en: "$x<-4\\Rightarrow(x+2)(x-2)>0$",
        fr: "$x<-4\\Rightarrow(x+2)(x-2)>0$",
        es: "$x<-4\\Rightarrow(x+2)(x-2)>0$",
        ja: "$x<-4\\Rightarrow(x+2)(x-2)>0$",
        zh: "$x<-4\\Rightarrow(x+2)(x-2)>0$"
      } },
      { tex: "1<x<2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-4<x<-3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=1.5\\ \\text{satisfies both}", correct: false, why: {
        en: "$(1-x)<0$",
        fr: "$(1-x)<0$",
        es: "$(1-x)<0$",
        ja: "$(1-x)<0$",
        zh: "$(1-x)<0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cubic",
          fr: "Cubique",
          es: "Cúbica",
          ja: "3次式",
          zh: "三次式"
        },
        lines: ["(x+4)(x+3)(1-x)>0\\iff x<-4\\ \\text{or}\\ -3<x<1"],
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
          en: "Intersect",
          fr: "Intersection",
          es: "Intersección",
          ja: "共通部分",
          zh: "取交集"
        },
        lines: ["(-2,2)\\cap\\bigl((-\\infty,-4)\\cup(-3,1)\\bigr)=(-2,1)"],
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
