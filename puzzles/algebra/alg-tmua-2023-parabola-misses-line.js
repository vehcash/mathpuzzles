/* algebra · When does y = mx − 3 miss y = x² + 5x + 6?
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2023-parabola-misses-line",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "When does y = mx − 3 miss y = x² + 5x + 6?",
      fr: "Quand y = mx − 3 évite-t-elle y = x² + 5x + 6 ?",
      es: "¿Cuándo no corta y = mx − 3 a y = x² + 5x + 6?",
      ja: "y = mx − 3 が y = x² + 5x + 6 と交わらない条件",
      zh: "y = mx − 3 何时与 y = x² + 5x + 6 不相交？"
    },
    statement: {
      en: "The graphs of $y=x^2+5x+6$ and $y=mx-3$ do not meet. <b>Which of the following are true?</b>",
      fr: "Les courbes $y=x^2+5x+6$ et $y=mx-3$ ne se rencontrent pas. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las gráficas de $y=x^2+5x+6$ e $y=mx-3$ no se cortan. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=x^2+5x+6$ と $y=mx-3$ のグラフは交わりません。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$y=x^2+5x+6$ 与 $y=mx-3$ 的图像不相交。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola and a few lines through (0, −3).",
      fr: "La parabole et quelques droites passant par (0, −3).",
      es: "La parábola y varias rectas por (0, −3).",
      ja: "放物線と (0, −3) を通る数本の直線。",
      zh: "抛物线及几条过 (0, −3) 的直线。"
    },
    hint: {
      en: "Set them equal: $x^2+(5-m)x+9=0$ must have negative discriminant.",
      fr: "Égalez : $x^2+(5-m)x+9=0$ doit avoir un discriminant négatif.",
      es: "Iguala: $x^2+(5-m)x+9=0$ debe tener discriminante negativo.",
      ja: "等置して $x^2+(5-m)x+9=0$ の判別式が負。",
      zh: "联立得 $x^2+(5-m)x+9=0$，判别式须为负。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.2, scale: 46, pad: 16 });
      const S = ([x, y]) => [(x + 5.2) * 0.7, (y + 4.2) * 0.5];
      F.seg(S([-5.2, 0]), S([1.4, 0]), 'axis'); F.seg(S([0, -4.2]), S([0, 4.2]), 'axis');
      plot(F, S, x => x * x + 5 * x + 6, -5.2, 1.4, 'graph', 'base', -4.2, 4.2);
      [3, 6].forEach(m => plot(F, S, x => m * x - 3, -5.2, 1.4, 'seg thin dashc', 'base', -4.2, 4.2)); F.dot(S([0, -3]));
      F.reveal = () => {
      [-1, 11].forEach(m => plot(F, S, x => m * x - 3, -5.2, 1.4, 'hl pink', 'base', -4.2, 4.2));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "give tangent lines": {"fr": "donnent des tangentes", "es": "dan rectas tangentes", "ja": "で接線", "zh": "给出切线"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "gives two meeting points": {"fr": "donne deux points communs", "es": "da dos puntos de corte", "ja": "で交点2つ", "zh": "有两个交点"},
      "misses the parabola": {"fr": "ne rencontre pas la parabole", "es": "no corta la parábola", "ja": "は放物線と交わらない", "zh": "与抛物线不相交"}
    },
    options: [
      { tex: "-1<m<11", correct: true, why: {
        en: "$(5-m)^2<36\\iff|5-m|<6$",
        fr: "$(5-m)^2<36\\iff|5-m|<6$",
        es: "$(5-m)^2<36\\iff|5-m|<6$",
        ja: "$(5-m)^2<36\\iff|5-m|<6$",
        zh: "$(5-m)^2<36\\iff|5-m|<6$"
      } },
      { tex: "m=-1\\ \\text{and}\\ m=11\\ \\text{give tangent lines}", correct: true, why: {
        en: "$(5-m)^2=36$",
        fr: "$(5-m)^2=36$",
        es: "$(5-m)^2=36$",
        ja: "$(5-m)^2=36$",
        zh: "$(5-m)^2=36$"
      } },
      { tex: "m<-1\\ \\text{or}\\ m>11", correct: false, why: {
        en: "That is where the line cuts the parabola twice.",
        fr: "C’est là où la droite coupe deux fois.",
        es: "Ahí la recta corta dos veces.",
        ja: "そこは2点で交わる範囲。",
        zh: "那是有两个交点的范围。"
      } },
      { tex: "-11<m<11", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-11<m<1", correct: false, why: {
        en: "Sign error in $5-m$.",
        fr: "Erreur de signe dans $5-m$.",
        es: "Error de signo en $5-m$.",
        ja: "$5-m$ の符号ミス。",
        zh: "$5-m$ 符号错。"
      } },
      { tex: "m<-11\\ \\text{or}\\ m>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=0\\ \\text{gives two meeting points}", correct: false, why: {
        en: "$x^2+5x+9:\\ 25-36<0$",
        fr: "$x^2+5x+9:\\ 25-36<0$",
        es: "$x^2+5x+9:\\ 25-36<0$",
        ja: "$x^2+5x+9:\\ 25-36<0$",
        zh: "$x^2+5x+9:\\ 25-36<0$"
      } },
      { tex: "m=12\\ \\text{misses the parabola}", correct: false, why: {
        en: "$(5-12)^2=49>36$",
        fr: "$(5-12)^2=49>36$",
        es: "$(5-12)^2=49>36$",
        ja: "$(5-12)^2=49>36$",
        zh: "$(5-12)^2=49>36$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equate",
          fr: "Égaler",
          es: "Igualar",
          ja: "等置",
          zh: "联立"
        },
        lines: ["x^2+5x+6=mx-3\\iff x^2+(5-m)x+9=0"],
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
          en: "No real roots",
          fr: "Pas de racine réelle",
          es: "Sin raíces reales",
          ja: "実数解なし",
          zh: "无实根"
        },
        lines: ["(5-m)^2-36<0\\iff-1<m<11"],
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
