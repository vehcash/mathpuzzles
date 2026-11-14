/* algebra · A system in log₃ x and log₃ y
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2019-log-system-sum-of-x",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 11",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 11",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 11",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第11問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 11 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "A system in log₃ x and log₃ y",
      fr: "Un système en log₃ x et log₃ y",
      es: "Un sistema en log₃ x y log₃ y",
      ja: "log₃ x と log₃ y の連立方程式",
      zh: "关于 log₃ x 与 log₃ y 的方程组"
    },
    statement: {
      en: "$\\log_3x+2\\log_3y=1$ and $(\\log_3x)(\\log_3y)=-3$. Let $\\Sigma$ be the sum of all possible values of $x$. <b>Which of the following are true?</b>",
      fr: "$\\log_3x+2\\log_3y=1$ et $(\\log_3x)(\\log_3y)=-3$. Soit $\\Sigma$ la somme de toutes les valeurs possibles de $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$\\log_3x+2\\log_3y=1$ y $(\\log_3x)(\\log_3y)=-3$. Sea $\\Sigma$ la suma de todos los valores posibles de $x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\log_3x+2\\log_3y=1$、$(\\log_3x)(\\log_3y)=-3$。可能な $x$ の値の和を $\\Sigma$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$\\log_3x+2\\log_3y=1$，$(\\log_3x)(\\log_3y)=-3$，设所有可能 $x$ 值之和为 $\\Sigma$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A line and a hyperbola in the (X, Y) plane.",
      fr: "Une droite et une hyperbole dans le plan (X, Y).",
      es: "Una recta y una hipérbola en el plano (X, Y).",
      ja: "(X, Y) 平面の直線と双曲線。",
      zh: "(X, Y) 平面中的直线与双曲线。"
    },
    hint: {
      en: "Put $X=\\log_3x$, $Y=\\log_3y$: $X+2Y=1$, $XY=-3$.",
      fr: "Posez $X=\\log_3x$, $Y=\\log_3y$ : $X+2Y=1$, $XY=-3$.",
      es: "Pon $X=\\log_3x$, $Y=\\log_3y$: $X+2Y=1$, $XY=-3$.",
      ja: "$X=\\log_3x$、$Y=\\log_3y$ とおく：$X+2Y=1$、$XY=-3$。",
      zh: "令 $X=\\log_3x$，$Y=\\log_3y$：$X+2Y=1$，$XY=-3$。"
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
      const S = ([x, y]) => [0.2 + (x - (-5)) * 0.46000, 0.2 + (y - (-4)) * 0.37500];
      const K = 0.46000;
      F.seg(S([-5, 0]), S([5, 0]), 'axis'); F.seg(S([0, -4]), S([0, 4]), 'axis');
      plot(F, S, X => (1 - X) / 2, -5, 5, 'graph', 'base', -4, 4); plot(F, S, X => -3 / X, 0.7, 5, 'seg', 'base', -4, 4); plot(F, S, X => -3 / X, -5, -0.7, 'seg', 'base', -4, 4); F.text(S([5, 0]), 'X', 'tick', -6, 14); F.text(S([0, 4]), 'Y', 'tick', 10, 6);
      F.reveal = () => {
      F.dot(S([3, -1])); F.dot(S([-2, 1.5]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "X": {"fr": "X", "es": "X", "ja": "X", "zh": "X"},
      "Y": {"fr": "Y", "es": "Y", "ja": "Y", "zh": "Y"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "はあり得る", "zh": "是可能的"}
    },
    options: [
      { tex: "\\Sigma=\\tfrac{244}9", correct: true, why: {
        en: "$27+\\tfrac19$",
        fr: "$27+\\tfrac19$",
        es: "$27+\\tfrac19$",
        ja: "$27+\\tfrac19$",
        zh: "$27+\\tfrac19$"
      } },
      { tex: "x=27\\ \\text{is possible}", correct: true, why: {
        en: "$X=3,\\ Y=-1$",
        fr: "$X=3,\\ Y=-1$",
        es: "$X=3,\\ Y=-1$",
        ja: "$X=3,\\ Y=-1$",
        zh: "$X=3,\\ Y=-1$"
      } },
      { tex: "\\Sigma=1", correct: false, why: {
        en: "Adds the values of $X$.",
        fr: "Additionne les valeurs de $X$.",
        es: "Suma los valores de $X$.",
        ja: "$X$ の値を足した。",
        zh: "加的是 $X$ 的值。"
      } },
      { tex: "\\Sigma=27", correct: false, why: {
        en: "Misses $X=-2$.",
        fr: "Oublie $X=-2$.",
        es: "Olvida $X=-2$.",
        ja: "$X=-2$ を見落とし。",
        zh: "漏了 $X=-2$。"
      } },
      { tex: "\\Sigma=\\tfrac{82}9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\Sigma=36", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\Sigma=\\tfrac{28}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=9\\ \\text{is possible}", correct: false, why: {
        en: "$X=2:\\ Y=-\\tfrac12,\\ XY=-1$",
        fr: "$X=2:\\ Y=-\\tfrac12,\\ XY=-1$",
        es: "$X=2:\\ Y=-\\tfrac12,\\ XY=-1$",
        ja: "$X=2:\\ Y=-\\tfrac12,\\ XY=-1$",
        zh: "$X=2:\\ Y=-\\tfrac12,\\ XY=-1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "代入",
          zh: "代入"
        },
        lines: ["X=1-2Y\\Rightarrow(1-2Y)Y=-3\\Rightarrow2Y^2-Y-3=0"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["Y=-1,\\tfrac32\\Rightarrow X=3,-2\\Rightarrow x=27,\\tfrac19"],
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
