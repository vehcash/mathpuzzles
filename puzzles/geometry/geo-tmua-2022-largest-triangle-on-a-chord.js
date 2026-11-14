/* geometry · The largest triangle on an obtuse chord
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2022-largest-triangle-on-a-chord",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 14",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 14",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 14",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第14問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 14 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "The largest triangle on an obtuse chord",
      fr: "Le plus grand triangle sur une corde obtuse",
      es: "El mayor triángulo sobre una cuerda obtusa",
      ja: "鈍角の弦の上の最大三角形",
      zh: "钝角弦上的最大三角形"
    },
    statement: {
      en: "$P$ and $Q$ lie on a circle with centre $O$ and radius $6$, with $\\angle POQ$ obtuse and the area of triangle $POQ$ equal to $9\\sqrt3$. A point $R$ moves on the circle. Let $M$ be the largest possible area of triangle $PQR$. <b>Which of the following are true?</b>",
      fr: "$P$ et $Q$ sont sur un cercle de centre $O$ et de rayon $6$, avec $\\angle POQ$ obtus et l’aire du triangle $POQ$ égale à $9\\sqrt3$. Un point $R$ parcourt le cercle. Soit $M$ la plus grande aire possible du triangle $PQR$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P$ y $Q$ están en una circunferencia de centro $O$ y radio $6$, con $\\angle POQ$ obtuso y área del triángulo $POQ$ igual a $9\\sqrt3$. Un punto $R$ recorre la circunferencia. Sea $M$ la mayor área posible del triángulo $PQR$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "中心 $O$・半径 $6$ の円上に $P,Q$ があり、$\\angle POQ$ は鈍角、三角形 $POQ$ の面積は $9\\sqrt3$。点 $R$ は円上を動きます。三角形 $PQR$ の面積の最大値を $M$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$P$、$Q$ 在圆心 $O$、半径 $6$ 的圆上，$\\angle POQ$ 为钝角，三角形 $POQ$ 面积为 $9\\sqrt3$。点 $R$ 在圆上运动，三角形 $PQR$ 的最大面积为 $M$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A circle with a chord PQ, the centre O and a moving point R.",
      fr: "Un cercle, une corde PQ, le centre O et un point mobile R.",
      es: "Una circunferencia, una cuerda PQ, el centro O y un punto móvil R.",
      ja: "円、弦 PQ、中心 O、動点 R。",
      zh: "圆、弦 PQ、圆心 O 与动点 R。"
    },
    hint: {
      en: "$\\tfrac12\\cdot6^2\\sin\\angle POQ=9\\sqrt3$. Then $R$ should be as far from $PQ$ as possible.",
      fr: "$\\tfrac12\\cdot6^2\\sin\\angle POQ=9\\sqrt3$. Puis $R$ doit être le plus loin possible de $PQ$.",
      es: "$\\tfrac12\\cdot6^2\\sin\\angle POQ=9\\sqrt3$. Luego $R$ debe estar lo más lejos posible de $PQ$.",
      ja: "$\\tfrac12\\cdot6^2\\sin\\angle POQ=9\\sqrt3$。次に $R$ を $PQ$ から最も遠くに。",
      zh: "$\\tfrac12\\cdot6^2\\sin\\angle POQ=9\\sqrt3$，再让 $R$ 离 $PQ$ 最远。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 52, pad: 16 });
      const O = [2, 2], r = 1.7, at = t => [O[0] + r * Math.cos(t), O[1] + r * Math.sin(t)];
      const P = at(-Math.PI / 2 - Math.PI / 3), Q = at(-Math.PI / 2 + Math.PI / 3), R = at(2.2);
      F.circle(O, r, 'graph'); F.dot(O); F.text(O, 'O', 'pt', 0, -10);
      F.path([O, P, Q], 'tri fill-blue'); F.seg(P, R, 'seg thin'); F.seg(Q, R, 'seg thin');
      [[P, 'P', -10, 10], [Q, 'Q', 10, 10], [R, 'R', -10, -6]].forEach(([p, s, dx, dy]) => { F.dot(p); F.text(p, s, 'pt', dx, dy); });
      F.reveal = () => {
      const R2 = at(Math.PI / 2); F.path([P, Q, R2], 'tri fill-yellow'); F.dot(R2); F.seg(R2, [2, P[1]], 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "O": {"fr": "O", "es": "O", "ja": "O", "zh": "O"},
      "P": {"fr": "P", "es": "P", "ja": "P", "zh": "P"},
      "Q": {"fr": "Q", "es": "Q", "ja": "Q", "zh": "Q"},
      "R": {"fr": "R", "es": "R", "ja": "R", "zh": "R"},
      "obtuse": {"fr": "obtus", "es": "obtuso", "ja": "鈍角", "zh": "钝角"}
    },
    options: [
      { tex: "M=27\\sqrt3", correct: true, why: {
        en: "$\\tfrac12\\cdot6\\sqrt3\\cdot(6+3)$",
        fr: "$\\tfrac12\\cdot6\\sqrt3\\cdot(6+3)$",
        es: "$\\tfrac12\\cdot6\\sqrt3\\cdot(6+3)$",
        ja: "$\\tfrac12\\cdot6\\sqrt3\\cdot(6+3)$",
        zh: "$\\tfrac12\\cdot6\\sqrt3\\cdot(6+3)$"
      } },
      { tex: "\\angle POQ=120^\\circ", correct: true, why: {
        en: "$\\sin\\angle POQ=\\tfrac{\\sqrt3}2,\\ \\text{obtuse}$",
        fr: "$\\sin\\angle POQ=\\tfrac{\\sqrt3}2,\\ \\text{obtuse}$",
        es: "$\\sin\\angle POQ=\\tfrac{\\sqrt3}2,\\ \\text{obtuse}$",
        ja: "$\\sin\\angle POQ=\\tfrac{\\sqrt3}2,\\ \\text{obtuse}$",
        zh: "$\\sin\\angle POQ=\\tfrac{\\sqrt3}2,\\ \\text{obtuse}$"
      } },
      { tex: "M=18+9\\sqrt3", correct: false, why: {
        en: "That is the answer for the acute angle $60^\\circ$.",
        fr: "C’est la réponse pour l’angle aigu $60^\\circ$.",
        es: "Es la respuesta para el ángulo agudo $60^\\circ$.",
        ja: "鋭角 $60^\\circ$ の場合の答え。",
        zh: "那是锐角 $60^\\circ$ 时的答案。"
      } },
      { tex: "M=36\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=18\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=27+9\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "M=36+9\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "PQ=6", correct: false, why: {
        en: "$PQ=2\\cdot6\\sin60^\\circ=6\\sqrt3$",
        fr: "$PQ=2\\cdot6\\sin60^\\circ=6\\sqrt3$",
        es: "$PQ=2\\cdot6\\sin60^\\circ=6\\sqrt3$",
        ja: "$PQ=2\\cdot6\\sin60^\\circ=6\\sqrt3$",
        zh: "$PQ=2\\cdot6\\sin60^\\circ=6\\sqrt3$"
      } }
    ],
    steps: [
      {
        title: {
          en: "The angle at O",
          fr: "L’angle en O",
          es: "El ángulo en O",
          ja: "O での角",
          zh: "O 处的角"
        },
        lines: ["18\\sin\\angle POQ=9\\sqrt3\\Rightarrow\\angle POQ=120^\\circ"],
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
          en: "Base and height",
          fr: "Base et hauteur",
          es: "Base y altura",
          ja: "底辺と高さ",
          zh: "底与高"
        },
        lines: ["PQ=6\\sqrt3,\\quad d(O,PQ)=3,\\quad h_{\\max}=6+3=9\\Rightarrow M=27\\sqrt3"],
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
