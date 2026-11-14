/* geometry · Where can (5, k) make a right angle?
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2023-right-triangle-unknown-vertex",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 16",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 16",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 16",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第16問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 16 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Where can (5, k) make a right angle?",
      fr: "Où (5, k) peut-il former un angle droit ?",
      es: "¿Dónde puede (5, k) formar un ángulo recto?",
      ja: "(5, k) が直角をつくる k は？",
      zh: "(5, k) 何时构成直角三角形？"
    },
    statement: {
      en: "The points $(2,3)$, $(9,-1)$ and $(5,k)$ are the vertices of a right-angled triangle. Let $S$ be the sum of all possible values of $k$. <b>Which of the following are true?</b>",
      fr: "Les points $(2,3)$, $(9,-1)$ et $(5,k)$ sont les sommets d’un triangle rectangle. Soit $S$ la somme de toutes les valeurs possibles de $k$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los puntos $(2,3)$, $(9,-1)$ y $(5,k)$ son los vértices de un triángulo rectángulo. Sea $S$ la suma de todos los valores posibles de $k$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "点 $(2,3)$, $(9,-1)$, $(5,k)$ は直角三角形の頂点です。可能な $k$ の値の和を $S$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "点 $(2,3)$、$(9,-1)$、$(5,k)$ 构成直角三角形，设所有可能 $k$ 值之和为 $S$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The two fixed points and the vertical line x = 5.",
      fr: "Les deux points fixes et la droite x = 5.",
      es: "Los dos puntos fijos y la recta x = 5.",
      ja: "2つの定点と直線 x = 5。",
      zh: "两个定点与直线 x = 5。"
    },
    hint: {
      en: "The right angle can be at any of the three vertices. Use dot products.",
      fr: "L’angle droit peut être à chacun des trois sommets. Utilisez le produit scalaire.",
      es: "El ángulo recto puede estar en cualquiera de los tres vértices. Usa el producto escalar.",
      ja: "直角は3頂点のどれでもよい。内積を使う。",
      zh: "直角可在三个顶点中任一处，用数量积。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 5.0, scale: 40, pad: 16 });
      const S = ([x, y]) => [0.5 + (x - 0.5) * 0.37, (y + 3.6) * 0.37];
      F.seg(S([5, -3.5]), S([5, 9.5]), 'seg thin dashc'); F.text(S([5, 9.5]), 'x = 5', 'tick', 22, 6);
      F.dot(S([2, 3])); F.dot(S([9, -1])); F.text(S([2, 3]), 'A', 'pt', -10, -6); F.text(S([9, -1]), 'B', 'pt', 10, -6); F.seg(S([2, 3]), S([9, -1]), 'seg');
      F.reveal = () => {
      [-8, -3, 5, 33 / 4].forEach(k => { if (k >= -3.6) F.dot(S([5, k])); });
      F.text(S([5, -3.3]), 'k = −8 ↓', 'len small', 30, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x = 5": {"fr": "x = 5", "es": "x = 5", "ja": "x = 5", "zh": "x = 5"},
      "k = −8 ↓": {"fr": "k = −8 ↓", "es": "k = −8 ↓", "ja": "k = −8 ↓", "zh": "k = −8 ↓"},
      "there are 4 possible values of": {"fr": "il y a 4 valeurs possibles de", "es": "hay 4 valores posibles de", "ja": "可能な値は4つ：", "zh": "可能的取值有 4 个："},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"}
    },
    options: [
      { tex: "S=\\tfrac94", correct: true, why: {
        en: "$-8-3+5+\\tfrac{33}{4}$",
        fr: "$-8-3+5+\\tfrac{33}{4}$",
        es: "$-8-3+5+\\tfrac{33}{4}$",
        ja: "$-8-3+5+\\tfrac{33}{4}$",
        zh: "$-8-3+5+\\tfrac{33}{4}$"
      } },
      { tex: "\\text{there are 4 possible values of}\\ k", correct: true, why: {
        en: "Right angle at $A$: $k=8.25$; at $B$: $k=-8$; at $(5,k)$: $k=5$ or $-3$.",
        fr: "Angle droit en $A$ : $k=8{,}25$ ; en $B$ : $k=-8$ ; en $(5,k)$ : $k=5$ ou $-3$.",
        es: "Ángulo recto en $A$: $k=8{,}25$; en $B$: $k=-8$; en $(5,k)$: $k=5$ o $-3$.",
        ja: "$A$ で直角：$k=8.25$、$B$：$k=-8$、$(5,k)$：$k=5,-3$。",
        zh: "直角在 $A$：$k=8.25$；在 $B$：$k=-8$；在 $(5,k)$：$k=5$ 或 $-3$。"
      } },
      { tex: "S=2", correct: false, why: {
        en: "Only the right angle at $(5,k)$: $5+(-3)$.",
        fr: "Seulement l’angle droit en $(5,k)$ : $5+(-3)$.",
        es: "Solo el ángulo recto en $(5,k)$: $5+(-3)$.",
        ja: "$(5,k)$ で直角の場合だけ：$5+(-3)$。",
        zh: "只算了直角在 $(5,k)$：$5+(-3)$。"
      } },
      { tex: "S=0.25", correct: false, why: {
        en: "Misses the case with the right angle at $(5,k)$.",
        fr: "Oublie l’angle droit en $(5,k)$.",
        es: "Olvida el ángulo recto en $(5,k)$.",
        ja: "$(5,k)$ で直角の場合を落とす。",
        zh: "漏了直角在 $(5,k)$ 的情形。"
      } },
      { tex: "S=-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=10.25", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=3\\ \\text{works}", correct: false, why: {
        en: "$(3,0)\\cdot(-4,-4)\\ne0$",
        fr: "$(3,0)\\cdot(-4,-4)\\ne0$",
        es: "$(3,0)\\cdot(-4,-4)\\ne0$",
        ja: "$(3,0)\\cdot(-4,-4)\\ne0$",
        zh: "$(3,0)\\cdot(-4,-4)\\ne0$"
      } },
      { tex: "S=8.25", correct: false, why: {
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
          en: "Right angle at A or B",
          fr: "Angle droit en A ou B",
          es: "Ángulo recto en A o B",
          ja: "A か B で直角",
          zh: "直角在 A 或 B"
        },
        lines: ["A:\\ (7,-4)\\cdot(3,k-3)=0\\Rightarrow k=\\tfrac{33}4;\\quad B:\\ (-7,4)\\cdot(-4,k+1)=0\\Rightarrow k=-8"],
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
          en: "Right angle at (5, k)",
          fr: "Angle droit en (5, k)",
          es: "Ángulo recto en (5, k)",
          ja: "(5, k) で直角",
          zh: "直角在 (5, k)"
        },
        lines: ["(-3,3-k)\\cdot(4,-1-k)=0\\Rightarrow k^2-2k-15=0\\Rightarrow k=5,-3"],
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
