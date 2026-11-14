/* algebra · The largest |xy| in a box
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2018-largest-abs-xy-in-a-box",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 10",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 10",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 10",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第10問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 10 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "The largest |xy| in a box",
      fr: "Le plus grand |xy| dans un rectangle",
      es: "El mayor |xy| en un rectángulo",
      ja: "長方形内での |xy| の最大値",
      zh: "矩形内 |xy| 的最大值"
    },
    statement: {
      en: "Real numbers $x,y$ satisfy $|2-x|\\le6$ and $|y+2|\\le4$. Let $M$ be the largest possible value of $|xy|$. <b>Which of the following are true?</b>",
      fr: "Des réels $x,y$ vérifient $|2-x|\\le6$ et $|y+2|\\le4$. Soit $M$ la plus grande valeur possible de $|xy|$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los reales $x,y$ cumplen $|2-x|\\le6$ y $|y+2|\\le4$. Sea $M$ el mayor valor posible de $|xy|$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x,y$ は $|2-x|\\le6$、$|y+2|\\le4$ を満たします。$|xy|$ の最大値を $M$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "实数 $x,y$ 满足 $|2-x|\\le6$，$|y+2|\\le4$，设 $|xy|$ 的最大可能值为 $M$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A rectangle of allowed points around the origin.",
      fr: "Un rectangle de points permis autour de l’origine.",
      es: "Un rectángulo de puntos permitidos alrededor del origen.",
      ja: "原点付近の許される点の長方形。",
      zh: "原点附近允许取值的矩形。"
    },
    hint: {
      en: "$-4\\le x\\le8$ and $-6\\le y\\le2$; maximise $|x|$ and $|y|$ separately.",
      fr: "$-4\\le x\\le8$ et $-6\\le y\\le2$ ; maximisez $|x|$ et $|y|$ séparément.",
      es: "$-4\\le x\\le8$ y $-6\\le y\\le2$; maximiza $|x|$ y $|y|$ por separado.",
      ja: "$-4\\le x\\le8$、$-6\\le y\\le2$。$|x|,|y|$ を別々に最大化。",
      zh: "$-4\\le x\\le8$，$-6\\le y\\le2$，分别使 $|x|$、$|y|$ 最大。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 3.8, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-5.5)) * 0.29333, 0.2 + (y - (-7.5)) * 0.30909];
      const K = 0.29333;
      F.seg(S([-5.5, 0]), S([9.5, 0]), 'axis'); F.seg(S([0, -7.5]), S([0, 3.5]), 'axis');
      F.path([S([-4, -6]), S([8, -6]), S([8, 2]), S([-4, 2])], 'tri fill-blue');
      F.reveal = () => {
      F.dot(S([8, -6])); F.text(S([8, -6]), '(8, −6)', 'len small pink', -10, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(8, −6)": {"fr": "(8, −6)", "es": "(8, −6)", "ja": "(8, −6)", "zh": "(8, −6)"},
      "is attained at": {"fr": "est atteint en", "es": "se alcanza en", "ja": "は次で達成：", "zh": "在下列点取到："}
    },
    options: [
      { tex: "M=48", correct: true, why: {
        en: "$8\\cdot6$",
        fr: "$8\\cdot6$",
        es: "$8\\cdot6$",
        ja: "$8\\cdot6$",
        zh: "$8\\cdot6$"
      } },
      { tex: "M\\ \\text{is attained at}\\ (8,-6)", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "M=16", correct: false, why: {
        en: "Uses $8\\cdot2$.",
        fr: "Utilise $8\\cdot2$.",
        es: "Usa $8\\cdot2$.",
        ja: "$8\\cdot2$ を使った。",
        zh: "用了 $8\\cdot2$。"
      } },
      { tex: "M=24", correct: false, why: {
        en: "$4\\cdot6$",
        fr: "$4\\cdot6$",
        es: "$4\\cdot6$",
        ja: "$4\\cdot6$",
        zh: "$4\\cdot6$"
      } },
      { tex: "M=32", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=64", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M\\ \\text{is attained at}\\ (-4,-6)", correct: false, why: {
        en: "$24<48$",
        fr: "$24<48$",
        es: "$24<48$",
        ja: "$24<48$",
        zh: "$24<48$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Ranges",
          fr: "Intervalles",
          es: "Intervalos",
          ja: "範囲",
          zh: "范围"
        },
        lines: ["-4\\le x\\le8,\\quad-6\\le y\\le2"],
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
          en: "Maximise",
          fr: "Maximiser",
          es: "Maximizar",
          ja: "最大化",
          zh: "求最大"
        },
        lines: ["|x|\\le8,\\ |y|\\le6\\Rightarrow M=48"],
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
