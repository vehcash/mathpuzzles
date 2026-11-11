/* complex · Twice as far from one point
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2025-apollonius-circle",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.7",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.7",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.7",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Twice as far from one point",
      fr: "Deux fois plus loin d’un point",
      es: "El doble de lejos de un punto",
      ja: "一方の点から2倍の距離",
      zh: "到一点的距离是另一点的两倍"
    },
    statement: {
      en: "$z_1=1+2i$, $z_2=3i$ and $S=\\{z:\\ |z-z_1|=2|z-z_2|\\}$. <b>Which of the following are true?</b>",
      fr: "$z_1=1+2i$, $z_2=3i$ et $S=\\{z:\\ |z-z_1|=2|z-z_2|\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$z_1=1+2i$, $z_2=3i$ y $S=\\{z:\\ |z-z_1|=2|z-z_2|\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z_1=1+2i$、$z_2=3i$、$S=\\{z:\\ |z-z_1|=2|z-z_2|\\}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $z_1=1+2i$，$z_2=3i$，$S=\\{z:\\ |z-z_1|=2|z-z_2|\\}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane with z₁ = 1 + 2i and z₂ = 3i.",
      fr: "Le plan complexe avec z₁ = 1 + 2i et z₂ = 3i.",
      es: "El plano complejo con z₁ = 1 + 2i y z₂ = 3i.",
      ja: "複素平面上の z₁ = 1 + 2i と z₂ = 3i。",
      zh: "复平面上的 z₁ = 1 + 2i 与 z₂ = 3i。"
    },
    hint: {
      en: "Square both sides with $z=x+iy$ and complete the square.",
      fr: "Élevez au carré avec $z=x+iy$ et complétez le carré.",
      es: "Eleva al cuadrado con $z=x+iy$ y completa el cuadrado.",
      ja: "$z=x+iy$ として両辺を2乗し平方完成。",
      zh: "令 $z=x+iy$，两边平方再配方。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.6, scale: 56, pad: 16 });
      const T = F.T = argand(F, -1.8, 2.2, -0.6, 4.0);
      F.dot(T([1, 2])); F.text(T([1, 2]), 'z₁', 'pt', 12, 6); F.dot(T([0, 3])); F.text(T([0, 3]), 'z₂', 'pt', 12, -6);
      F.reveal = () => {
      { const cx = -1 / 3, cy = 10 / 3, r = 2 * Math.SQRT2 / 3, cls = 'hl pink'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      F.dot(T([-1 / 3, 10 / 3]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "centre": {"fr": "centre", "es": "centro", "ja": "中心", "zh": "圆心"},
      "radius": {"fr": "rayon", "es": "radio", "ja": "半径", "zh": "半径"},
      "is a line": {"fr": "est une droite", "es": "es una recta", "ja": "は直線", "zh": "是直线"}
    },
    options: [
      { tex: "\\text{centre}\\ \\left(-\\tfrac13,\\tfrac{10}3\\right)", correct: true, why: {
        en: "$x^2+y^2+\\tfrac23x-\\tfrac{20}3y+\\tfrac{31}3=0$.",
        fr: "$x^2+y^2+\\tfrac23x-\\tfrac{20}3y+\\tfrac{31}3=0$.",
        es: "$x^2+y^2+\\tfrac23x-\\tfrac{20}3y+\\tfrac{31}3=0$.",
        ja: "$x^2+y^2+\\tfrac23x-\\tfrac{20}3y+\\tfrac{31}3=0$。",
        zh: "$x^2+y^2+\\tfrac23x-\\tfrac{20}3y+\\tfrac{31}3=0$。"
      } },
      { tex: "\\text{radius}\\ \\tfrac{2\\sqrt2}{3}", correct: true, why: {
        en: "$r^2=\\tfrac19+\\tfrac{100}9-\\tfrac{31}3=\\tfrac89$.",
        fr: "$r^2=\\tfrac19+\\tfrac{100}9-\\tfrac{31}3=\\tfrac89$.",
        es: "$r^2=\\tfrac19+\\tfrac{100}9-\\tfrac{31}3=\\tfrac89$.",
        ja: "$r^2=\\tfrac19+\\tfrac{100}9-\\tfrac{31}3=\\tfrac89$。",
        zh: "$r^2=\\tfrac19+\\tfrac{100}9-\\tfrac{31}3=\\tfrac89$。"
      } },
      { tex: "\\text{centre}\\ \\left(\\tfrac13,\\tfrac83\\right)", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{radius}\\ \\tfrac{\\sqrt2}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\ \\text{is a line}", correct: false, why: {
        en: "Ratio $2\\ne1$ gives a circle, not the perpendicular bisector.",
        fr: "Un rapport $2\\ne1$ donne un cercle, pas la médiatrice.",
        es: "Una razón $2\\ne1$ da una circunferencia, no la mediatriz.",
        ja: "比が $2\\ne1$ なので円（垂直二等分線ではない）。",
        zh: "比值 $2\\ne1$，得到圆而非中垂线。"
      } },
      { tex: "z_2\\in S", correct: false, why: {
        en: "$|z_2-z_1|=\\sqrt2\\ne0$.",
        fr: "$|z_2-z_1|=\\sqrt2\\ne0$.",
        es: "$|z_2-z_1|=\\sqrt2\\ne0$.",
        ja: "$|z_2-z_1|=\\sqrt2\\ne0$。",
        zh: "$|z_2-z_1|=\\sqrt2\\ne0$。"
      } },
      { tex: "\\text{radius}\\ \\tfrac89", correct: false, why: {
        en: "That is $r^2$.",
        fr: "C’est $r^2$.",
        es: "Es $r^2$.",
        ja: "$r^2$ の値。",
        zh: "那是 $r^2$。"
      } },
      { tex: "\\text{centre}\\ \\left(\\tfrac12,\\tfrac52\\right)", correct: false, why: {
        en: "That is the midpoint of $z_1z_2$.",
        fr: "C’est le milieu de $z_1z_2$.",
        es: "Es el punto medio de $z_1z_2$.",
        ja: "$z_1z_2$ の中点。",
        zh: "那是 $z_1z_2$ 的中点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Square",
          fr: "Élever au carré",
          es: "Elevar al cuadrado",
          ja: "2乗",
          zh: "平方"
        },
        lines: ["(x-1)^2+(y-2)^2=4\\left(x^2+(y-3)^2\\right)\\ \\Rightarrow\\ 3x^2+3y^2+2x-20y+31=0"],
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
          en: "Complete the square",
          fr: "Compléter le carré",
          es: "Completar el cuadrado",
          ja: "平方完成",
          zh: "配方"
        },
        lines: ["\\left(x+\\tfrac13\\right)^2+\\left(y-\\tfrac{10}3\\right)^2=\\tfrac89"],
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
