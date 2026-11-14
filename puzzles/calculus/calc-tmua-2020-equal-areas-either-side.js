/* calculus · Equal areas on both sides of x = 2
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2020-equal-areas-either-side",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 11",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 11",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 11",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第11問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 11 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Equal areas on both sides of x = 2",
      fr: "Aires égales de part et d’autre de x = 2",
      es: "Áreas iguales a ambos lados de x = 2",
      ja: "x = 2 の両側で面積が等しい",
      zh: "x = 2 两侧面积相等"
    },
    statement: {
      en: "For $q>2$, the curve $y=(x-2)(x-q)$ makes a region with the axes for $0\\le x\\le2$ and a region with the $x$-axis for $2\\le x\\le q$. The two regions have equal area. <b>Which of the following are true?</b>",
      fr: "Pour $q>2$, la courbe $y=(x-2)(x-q)$ délimite avec les axes une région pour $0\\le x\\le2$ et, avec l’axe des $x$, une région pour $2\\le x\\le q$. Les deux régions ont la même aire. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $q>2$, la curva $y=(x-2)(x-q)$ forma con los ejes una región para $0\\le x\\le2$ y con el eje $x$ otra para $2\\le x\\le q$. Ambas tienen igual área. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$q>2$ とし、曲線 $y=(x-2)(x-q)$ と座標軸が $0\\le x\\le2$ でつくる領域と、$x$ 軸と $2\\le x\\le q$ でつくる領域の面積が等しい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $q>2$，曲线 $y=(x-2)(x-q)$ 与坐标轴在 $0\\le x\\le2$ 围成的区域，和与 $x$ 轴在 $2\\le x\\le q$ 围成的区域面积相等。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A parabola above the axis on [0, 2] and below it on [2, q].",
      fr: "Une parabole au-dessus de l’axe sur [0, 2] et en dessous sur [2, q].",
      es: "Una parábola sobre el eje en [0, 2] y bajo él en [2, q].",
      ja: "[0, 2] で x 軸より上、[2, q] で下の放物線。",
      zh: "在 [0, 2] 上方、[2, q] 下方的抛物线。"
    },
    hint: {
      en: "Equal areas with opposite signs means $\\int_0^q(x-2)(x-q)\\,dx=0$.",
      fr: "Aires égales de signes opposés : $\\int_0^q(x-2)(x-q)\\,dx=0$.",
      es: "Áreas iguales de signo opuesto: $\\int_0^q(x-2)(x-q)\\,dx=0$.",
      ja: "符号が逆で面積が等しい：$\\int_0^q(x-2)(x-q)\\,dx=0$。",
      zh: "面积相等且符号相反：$\\int_0^q(x-2)(x-q)\\,dx=0$。"
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
      const S = ([x, y]) => [0.2 + (x - (-0.5)) * 0.61333, 0.2 + (y - (-5)) * 0.16667];
      F.seg(S([-0.5, 0]), S([7, 0]), 'axis'); F.seg(S([0, -5]), S([0, 13]), 'axis');
      plot(F, S, x => (x - 2) * (x - 4.5), -0.3, 6.5, 'graph', 'base', -5, 13); F.text(S([2, 0]), '2', 'tick', 0, -10); F.text(S([4.5, 0]), 'q', 'tick', 0, -10);
      F.reveal = () => {
      plot(F, S, x => (x - 2) * (x - 6), -0.3, 6.8, 'hl pink', 'base', -5, 13); F.text(S([6, 0]), '6', 'tick', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "q": {"fr": "q", "es": "q", "ja": "q", "zh": "q"},
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "each region has area": {"fr": "chaque région a pour aire", "es": "cada región tiene área", "ja": "各領域の面積は", "zh": "每个区域面积为"}
    },
    options: [
      { tex: "q=6", correct: true, why: {
        en: "$q^2\\bigl(1-\\tfrac q6\\bigr)=0$",
        fr: "$q^2\\bigl(1-\\tfrac q6\\bigr)=0$",
        es: "$q^2\\bigl(1-\\tfrac q6\\bigr)=0$",
        ja: "$q^2\\bigl(1-\\tfrac q6\\bigr)=0$",
        zh: "$q^2\\bigl(1-\\tfrac q6\\bigr)=0$"
      } },
      { tex: "\\text{each region has area}\\ \\tfrac{32}3", correct: true, why: {
        en: "$\\int_0^2(x-2)(x-6)dx$",
        fr: "$\\int_0^2(x-2)(x-6)dx$",
        es: "$\\int_0^2(x-2)(x-6)dx$",
        ja: "$\\int_0^2(x-2)(x-6)dx$",
        zh: "$\\int_0^2(x-2)(x-6)dx$"
      } },
      { tex: "q=4", correct: false, why: {
        en: "Symmetric about $x=2$ only for the parabola's own roots.",
        fr: "Symétrie autour de $x=2$ à tort.",
        es: "Simetría en $x=2$ equivocada.",
        ja: "$x=2$ に関する対称を誤用。",
        zh: "误用关于 $x=2$ 的对称。"
      } },
      { tex: "q=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=2+2\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{each region has area}\\ 4", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Net integral zero",
          fr: "Intégrale nette nulle",
          es: "Integral neta nula",
          ja: "正味の積分が 0",
          zh: "净积分为零"
        },
        lines: ["\\int_0^q(x^2-(q+2)x+2q)\\,dx=-\\tfrac{q^3}6+q^2=0"],
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
        lines: ["q=6\\ (q>2)"],
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
