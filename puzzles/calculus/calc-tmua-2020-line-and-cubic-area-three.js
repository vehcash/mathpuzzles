/* calculus · Line y = mx and curve y = x³ enclose area 3
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2020-line-and-cubic-area-three",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 14",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 14",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 14",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第14問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 14 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Line y = mx and curve y = x³ enclose area 3",
      fr: "La droite y = mx et la courbe y = x³ délimitent une aire 3",
      es: "La recta y = mx y la curva y = x³ encierran área 3",
      ja: "y = mx と y = x³ が囲む面積が 3",
      zh: "y = mx 与 y = x³ 围成面积为 3"
    },
    statement: {
      en: "For $m>0$, the line $y=mx$ and the curve $y=x^3$ enclose a region in the first quadrant of area $3$. <b>Which of the following are true?</b>",
      fr: "Pour $m>0$, la droite $y=mx$ et la courbe $y=x^3$ délimitent dans le premier quadrant une région d’aire $3$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $m>0$, la recta $y=mx$ y la curva $y=x^3$ encierran en el primer cuadrante una región de área $3$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$m>0$ とし、直線 $y=mx$ と曲線 $y=x^3$ が第1象限で囲む領域の面積が $3$。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $m>0$，直线 $y=mx$ 与曲线 $y=x^3$ 在第一象限围成区域面积为 $3$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The cubic y = x³ and a line through the origin.",
      fr: "La cubique y = x³ et une droite passant par l’origine.",
      es: "La cúbica y = x³ y una recta por el origen.",
      ja: "y = x³ と原点を通る直線。",
      zh: "y = x³ 与过原点的直线。"
    },
    hint: {
      en: "They meet at $x=\\sqrt m$; integrate $mx-x^3$ from $0$ to $\\sqrt m$.",
      fr: "Elles se coupent en $x=\\sqrt m$ ; intégrez $mx-x^3$ de $0$ à $\\sqrt m$.",
      es: "Se cortan en $x=\\sqrt m$; integra $mx-x^3$ de $0$ a $\\sqrt m$.",
      ja: "交点は $x=\\sqrt m$。$mx-x^3$ を $0$ から $\\sqrt m$ まで積分。",
      zh: "交于 $x=\\sqrt m$，对 $mx-x^3$ 从 $0$ 积到 $\\sqrt m$。"
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
      const S = ([x, y]) => [0.2 + (x - (-0.3)) * 1.84000, 0.2 + (y - (-0.5)) * 0.40000];
      F.seg(S([-0.3, 0]), S([2.2, 0]), 'axis'); F.seg(S([0, -0.5]), S([0, 7]), 'axis');
      plot(F, S, x => x ** 3, 0, 1.95, 'graph', 'base', -0.5, 7); plot(F, S, x => 2 * x, 0, 2.1, 'seg');
      F.reveal = () => {
      const m = 2 * Math.sqrt(3), r = Math.sqrt(m); const pts = []; for (let k = 0; k <= 40; k++) { const x = r * k / 40; pts.push(S([x, x ** 3])); } for (let k = 40; k >= 0; k--) { const x = r * k / 40; pts.push(S([x, m * x])); } F.path(pts, 'fill-yellow', 'fills'); plot(F, S, x => m * x, 0, 2.0, 'hl pink', 'base', -0.5, 7);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the region's area is": {"fr": "l’aire de la région vaut", "es": "el área de la región es", "ja": "領域の面積は", "zh": "区域面积为"},
      "for any": {"fr": "pour tout", "es": "para todo", "ja": "任意の", "zh": "对任意"},
      "the line meets the curve at": {"fr": "la droite coupe la courbe en", "es": "la recta corta la curva en", "ja": "直線と曲線の交点は", "zh": "直线与曲线交于"}
    },
    options: [
      { tex: "m=2\\sqrt3", correct: true, why: {
        en: "$\\tfrac{m^2}4=3$",
        fr: "$\\tfrac{m^2}4=3$",
        es: "$\\tfrac{m^2}4=3$",
        ja: "$\\tfrac{m^2}4=3$",
        zh: "$\\tfrac{m^2}4=3$"
      } },
      { tex: "\\text{the region's area is}\\ \\tfrac{m^2}4\\ \\text{for any}\\ m>0", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "m=12", correct: false, why: {
        en: "Solves $\\tfrac m4=3$.",
        fr: "Résout $\\tfrac m4=3$.",
        es: "Resuelve $\\tfrac m4=3$.",
        ja: "$\\tfrac m4=3$ を解いた。",
        zh: "解了 $\\tfrac m4=3$。"
      } },
      { tex: "m=\\sqrt6", correct: false, why: {
        en: "Uses $\\tfrac{m^2}2$.",
        fr: "Utilise $\\tfrac{m^2}2$.",
        es: "Usa $\\tfrac{m^2}2$.",
        ja: "$\\tfrac{m^2}2$ を使った。",
        zh: "用了 $\\tfrac{m^2}2$。"
      } },
      { tex: "m=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the line meets the curve at}\\ x=m", correct: false, why: {
        en: "$x^2=m$",
        fr: "$x^2=m$",
        es: "$x^2=m$",
        ja: "$x^2=m$",
        zh: "$x^2=m$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Intersection",
          fr: "Intersection",
          es: "Intersección",
          ja: "交点",
          zh: "交点"
        },
        lines: ["mx=x^3\\Rightarrow x=\\sqrt m"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["\\int_0^{\\sqrt m}(mx-x^3)dx=\\tfrac{m^2}2-\\tfrac{m^2}4=\\tfrac{m^2}4=3\\Rightarrow m=2\\sqrt3"],
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
