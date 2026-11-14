/* geometry · For which p is this a circle?
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2022-circle-condition-in-p",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "For which p is this a circle?",
      fr: "Pour quels p est-ce un cercle ?",
      es: "¿Para qué p es una circunferencia?",
      ja: "どんな p で円になるか",
      zh: "p 取何值时它是圆？"
    },
    statement: {
      en: "Consider the equation $x^2-2px+y^2-6y-p^2+8p+9=0$, where $p$ is a real constant. It describes a circle (of positive radius) exactly for certain values of $p$. <b>Which of the following are true?</b>",
      fr: "On considère l’équation $x^2-2px+y^2-6y-p^2+8p+9=0$, où $p$ est une constante réelle. Elle décrit un cercle (de rayon strictement positif) pour certaines valeurs de $p$ seulement. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la ecuación $x^2-2px+y^2-6y-p^2+8p+9=0$, con $p$ constante real. Describe una circunferencia (de radio positivo) solo para ciertos valores de $p$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数の定数 $p$ に対し方程式 $x^2-2px+y^2-6y-p^2+8p+9=0$ を考えます。これはある $p$ に対してだけ（半径が正の）円を表します。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑方程 $x^2-2px+y^2-6y-p^2+8p+9=0$，$p$ 为实常数。它只在某些 $p$ 下表示（半径为正的）圆。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A circle with centre (p, 3) whose radius depends on p.",
      fr: "Un cercle de centre (p, 3) dont le rayon dépend de p.",
      es: "Una circunferencia de centro (p, 3) cuyo radio depende de p.",
      ja: "中心 (p, 3)、半径が p で決まる円。",
      zh: "圆心为 (p, 3)、半径依赖于 p 的圆。"
    },
    hint: {
      en: "Complete the square in $x$ and in $y$; the right-hand side must be positive.",
      fr: "Complétez le carré en $x$ et en $y$ ; le membre de droite doit être positif.",
      es: "Completa el cuadrado en $x$ y en $y$; el lado derecho debe ser positivo.",
      ja: "$x$ と $y$ で平方完成し、右辺が正であること。",
      zh: "对 $x$、$y$ 配方，右边须为正。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 48, pad: 16 });
      F.circle([1.6, 1.5], 1.1, 'graph'); F.dot([1.6, 1.5]); F.text([1.6, 1.5], '(p, 3)', 'pt', 0, 16);
      F.seg([1.6, 1.5], [2.38, 2.28], 'seg thin dashc'); F.text([2.1, 2.1], 'r', 'len', -10, -4);
      F.reveal = () => {
      const S = ([x, y]) => [3.0 + (x + 1) * 0.3, 1.2 + y * 0.09];
      F.seg(S([-1, 0]), S([5.5, 0]), 'axis'); plot(F, S, p => 2 * p * p - 8 * p, -0.9, 5.2, 'hl pink', 'base', -9, 18);
      F.text(S([5.2, 0]), 'p', 'tick', 8, 12); F.text(S([2, 12]), 'r² = 2p² − 8p', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(p, 3)": {"fr": "(p, 3)", "es": "(p, 3)", "ja": "(p, 3)", "zh": "(p, 3)"},
      "r": {"fr": "r", "es": "r", "ja": "r", "zh": "r"},
      "p": {"fr": "p", "es": "p", "ja": "p", "zh": "p"},
      "r² = 2p² − 8p": {"fr": "r² = 2p² − 8p", "es": "r² = 2p² − 8p", "ja": "r² = 2p² − 8p", "zh": "r² = 2p² − 8p"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "the centre is": {"fr": "le centre est", "es": "el centro es", "ja": "中心は", "zh": "圆心为"},
      "every real": {"fr": "tout réel", "es": "todo real", "ja": "すべての実数", "zh": "任意实数"},
      "gives a circle": {"fr": "donne un cercle", "es": "da una circunferencia", "ja": "で円になる", "zh": "时为圆"}
    },
    options: [
      { tex: "p<0\\ \\text{or}\\ p>4", correct: true, why: {
        en: "$(x-p)^2+(y-3)^2=2p^2-8p>0$",
        fr: "$(x-p)^2+(y-3)^2=2p^2-8p>0$",
        es: "$(x-p)^2+(y-3)^2=2p^2-8p>0$",
        ja: "$(x-p)^2+(y-3)^2=2p^2-8p>0$",
        zh: "$(x-p)^2+(y-3)^2=2p^2-8p>0$"
      } },
      { tex: "\\text{the centre is}\\ (p,3)", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "0<p<4", correct: false, why: {
        en: "That is where $2p^2-8p<0$: no circle.",
        fr: "Là $2p^2-8p<0$ : pas de cercle.",
        es: "Ahí $2p^2-8p<0$: no hay circunferencia.",
        ja: "そこでは $2p^2-8p<0$ で円にならない。",
        zh: "此时 $2p^2-8p<0$，不是圆。"
      } },
      { tex: "-1<p<9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p<-1\\ \\text{or}\\ p>9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{every real}\\ p", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p=2\\ \\text{gives a circle}", correct: false, why: {
        en: "$r^2=8-16=-8$",
        fr: "$r^2=8-16=-8$",
        es: "$r^2=8-16=-8$",
        ja: "$r^2=8-16=-8$",
        zh: "$r^2=8-16=-8$"
      } },
      { tex: "r^2=p^2-8p", correct: false, why: {
        en: "Forgets the $p^2$ from completing the square in $x$.",
        fr: "Oublie le $p^2$ venant du carré en $x$.",
        es: "Olvida el $p^2$ del cuadrado en $x$.",
        ja: "$x$ の平方完成の $p^2$ を忘れている。",
        zh: "漏了对 $x$ 配方产生的 $p^2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Complete the squares",
          fr: "Compléter les carrés",
          es: "Completar cuadrados",
          ja: "平方完成",
          zh: "配方"
        },
        lines: ["(x-p)^2+(y-3)^2=p^2+9+p^2-8p-9=2p^2-8p"],
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
          en: "Positive radius",
          fr: "Rayon positif",
          es: "Radio positivo",
          ja: "半径が正",
          zh: "半径为正"
        },
        lines: ["2p(p-4)>0\\iff p<0\\ \\text{or}\\ p>4"],
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
