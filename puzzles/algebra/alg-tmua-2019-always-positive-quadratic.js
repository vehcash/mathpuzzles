/* algebra · Positive for every x
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2019-always-positive-quadratic",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "Positive for every x",
      fr: "Positif pour tout x",
      es: "Positivo para todo x",
      ja: "すべての x で正",
      zh: "对所有 x 为正"
    },
    statement: {
      en: "$x^2+(k+2)x+(1-2k)>0$ for every real $x$. <b>Which of the following are true?</b>",
      fr: "$x^2+(k+2)x+(1-2k)>0$ pour tout réel $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$x^2+(k+2)x+(1-2k)>0$ para todo $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "すべての実数 $x$ で $x^2+(k+2)x+(1-2k)>0$。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对所有实数 $x$ 有 $x^2+(k+2)x+(1-2k)>0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "An upward parabola floating above the x-axis.",
      fr: "Une parabole vers le haut au-dessus de l’axe.",
      es: "Una parábola hacia arriba sobre el eje x.",
      ja: "x 軸より上に浮く放物線。",
      zh: "悬在 x 轴上方的抛物线。"
    },
    hint: {
      en: "No real roots: discriminant negative.",
      fr: "Pas de racine réelle : discriminant négatif.",
      es: "Sin raíces reales: discriminante negativo.",
      ja: "実根なし：判別式が負。",
      zh: "无实根：判别式为负。"
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
      const S = ([x, y]) => [0.2 + (x - (-4)) * 0.76667, 0.2 + (y - (-1)) * 0.42857];
      const K = 0.76667;
      F.seg(S([-4, 0]), S([2, 0]), 'axis'); F.seg(S([0, -1]), S([0, 6]), 'axis');
      plot(F, S, x => x * x + 1 * x + 2, -3.5, 2, 'graph', 'base', -1, 6);
      F.reveal = () => {
      F.text(S([-1, 5]), 'k(k + 12) < 0', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "k(k + 12) < 0": {"fr": "k(k + 12) < 0", "es": "k(k + 12) < 0", "ja": "k(k + 12) < 0", "zh": "k(k + 12) < 0"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "-12<k<0", correct: true, why: {
        en: "$k^2+12k<0$",
        fr: "$k^2+12k<0$",
        es: "$k^2+12k<0$",
        ja: "$k^2+12k<0$",
        zh: "$k^2+12k<0$"
      } },
      { tex: "k=-6\\ \\text{works}", correct: true, why: {
        en: "$16-52<0$",
        fr: "$16-52<0$",
        es: "$16-52<0$",
        ja: "$16-52<0$",
        zh: "$16-52<0$"
      } },
      { tex: "0<k<12", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "k<-12\\ \\text{or}\\ k>0", correct: false, why: {
        en: "The complement.",
        fr: "Le complémentaire.",
        es: "El complementario.",
        ja: "補集合。",
        zh: "补集。"
      } },
      { tex: "-12\\le k\\le0", correct: false, why: {
        en: "$k=0$ gives a double root, so the inequality fails there.",
        fr: "$k=0$ donne une racine double.",
        es: "$k=0$ da una raíz doble.",
        ja: "$k=0$ で重根。",
        zh: "$k=0$ 时有重根。"
      } },
      { tex: "-2<k<\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=0\\ \\text{works}", correct: false, why: {
        en: "$(x+1)^2\\ge0$",
        fr: "$(x+1)^2\\ge0$",
        es: "$(x+1)^2\\ge0$",
        ja: "$(x+1)^2\\ge0$",
        zh: "$(x+1)^2\\ge0$"
      } },
      { tex: "k>-12", correct: false, why: {
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
          en: "Discriminant",
          fr: "Discriminant",
          es: "Discriminante",
          ja: "判別式",
          zh: "判别式"
        },
        lines: ["(k+2)^2-4(1-2k)=k^2+12k<0"],
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
        lines: ["k(k+12)<0\\iff-12<k<0"],
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
