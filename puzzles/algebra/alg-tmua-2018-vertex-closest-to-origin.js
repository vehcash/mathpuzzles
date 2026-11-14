/* algebra · Bring the vertex as close to the origin as possible
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2018-vertex-closest-to-origin",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 16",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 16",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 16",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第16問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 16 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Bring the vertex as close to the origin as possible",
      fr: "Rapprocher le sommet de l’origine",
      es: "Acercar el vértice al origen",
      ja: "頂点を原点に最も近づける",
      zh: "使顶点离原点最近"
    },
    statement: {
      en: "For $b>0$, the vertex of $y=x^2+bx+2$ is at distance $d$ from the origin. Let $b_0$ be the value of $b$ that makes $d$ as small as possible. <b>Which of the following are true?</b>",
      fr: "Pour $b>0$, le sommet de $y=x^2+bx+2$ est à distance $d$ de l’origine. Soit $b_0$ la valeur de $b$ qui rend $d$ minimale. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $b>0$, el vértice de $y=x^2+bx+2$ está a distancia $d$ del origen. Sea $b_0$ el valor de $b$ que hace $d$ mínima. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$b>0$ のとき $y=x^2+bx+2$ の頂点と原点の距離を $d$ とします。$d$ を最小にする $b$ を $b_0$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $b>0$，$y=x^2+bx+2$ 的顶点到原点的距离为 $d$，使 $d$ 最小的 $b$ 为 $b_0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A few parabolas with their vertices.",
      fr: "Quelques paraboles et leurs sommets.",
      es: "Algunas parábolas y sus vértices.",
      ja: "いくつかの放物線と頂点。",
      zh: "几条抛物线及其顶点。"
    },
    hint: {
      en: "Vertex $\\bigl(-\\tfrac b2,\\,2-\\tfrac{b^2}4\\bigr)$; minimise $d^2$ as a quadratic in $B=b^2$.",
      fr: "Sommet $\\bigl(-\\tfrac b2,\\,2-\\tfrac{b^2}4\\bigr)$ ; minimisez $d^2$ comme trinôme en $B=b^2$.",
      es: "Vértice $\\bigl(-\\tfrac b2,\\,2-\\tfrac{b^2}4\\bigr)$; minimiza $d^2$ como cuadrática en $B=b^2$.",
      ja: "頂点 $\\bigl(-\\tfrac b2,\\,2-\\tfrac{b^2}4\\bigr)$。$d^2$ を $B=b^2$ の2次式として最小化。",
      zh: "顶点 $\\bigl(-\\tfrac b2,\\,2-\\tfrac{b^2}4\\bigr)$，把 $d^2$ 看作 $B=b^2$ 的二次式求最小。"
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
      const S = ([x, y]) => [0.2 + (x - (-3)) * 1.02222, 0.2 + (y - (-1)) * 0.66667];
      const K = 1.02222;
      F.seg(S([-3, 0]), S([1.5, 0]), 'axis'); F.seg(S([0, -1]), S([0, 3.5]), 'axis');
      [1, 2, 3].forEach(b => { plot(F, S, x => x * x + b * x + 2, -3, 1.5, 'seg thin', 'base', -1, 3.5); F.dot(S([-b / 2, 2 - b * b / 4])); });
      F.reveal = () => {
      const b = Math.sqrt(6); plot(F, S, x => x * x + b * x + 2, -3, 1.5, 'hl pink', 'base', -1, 3.5); F.seg(S([0, 0]), S([-b / 2, 0.5]), 'hl blue');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the smallest distance is": {"fr": "la plus petite distance vaut", "es": "la menor distancia es", "ja": "最小距離は", "zh": "最小距离为"}
    },
    options: [
      { tex: "b_0=\\sqrt6", correct: true, why: {
        en: "$B=6$",
        fr: "$B=6$",
        es: "$B=6$",
        ja: "$B=6$",
        zh: "$B=6$"
      } },
      { tex: "\\text{the smallest distance is}\\ \\tfrac{\\sqrt7}2", correct: true, why: {
        en: "$d^2=\\tfrac{36}{16}-\\tfrac{18}4+4=\\tfrac74$",
        fr: "$d^2=\\tfrac{36}{16}-\\tfrac{18}4+4=\\tfrac74$",
        es: "$d^2=\\tfrac{36}{16}-\\tfrac{18}4+4=\\tfrac74$",
        ja: "$d^2=\\tfrac{36}{16}-\\tfrac{18}4+4=\\tfrac74$",
        zh: "$d^2=\\tfrac{36}{16}-\\tfrac{18}4+4=\\tfrac74$"
      } },
      { tex: "b_0=2\\sqrt2", correct: false, why: {
        en: "Puts the vertex on the $x$-axis.",
        fr: "Place le sommet sur l’axe des $x$.",
        es: "Pone el vértice en el eje $x$.",
        ja: "頂点を $x$ 軸上に置いた。",
        zh: "把顶点放到 $x$ 轴上。"
      } },
      { tex: "b_0=6", correct: false, why: {
        en: "That is $b^2$.",
        fr: "C’est $b^2$.",
        es: "Es $b^2$.",
        ja: "それは $b^2$。",
        zh: "那是 $b^2$。"
      } },
      { tex: "b_0=\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "b_0=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "b_0=\\tfrac{\\sqrt6}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the smallest distance is}\\ 0", correct: false, why: {
        en: "$d^2\\ge\\tfrac74$",
        fr: "$d^2\\ge\\tfrac74$",
        es: "$d^2\\ge\\tfrac74$",
        ja: "$d^2\\ge\\tfrac74$",
        zh: "$d^2\\ge\\tfrac74$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Distance squared",
          fr: "Distance au carré",
          es: "Distancia al cuadrado",
          ja: "距離の2乗",
          zh: "距离平方"
        },
        lines: ["d^2=\\tfrac{B}4+\\bigl(2-\\tfrac B4\\bigr)^2=\\tfrac{B^2}{16}-\\tfrac{3B}4+4"],
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
          en: "Minimise",
          fr: "Minimiser",
          es: "Minimizar",
          ja: "最小化",
          zh: "求最小"
        },
        lines: ["\\tfrac{B}8-\\tfrac34=0\\Rightarrow B=6,\\ b_0=\\sqrt6"],
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
