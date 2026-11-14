/* geometry · A hyperbola sharing foci with x²/4 + y² = 1
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2025-hyperbola-confocal-with-ellipse",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 11",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 11",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 11",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第11問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 11 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "A hyperbola sharing foci with x²/4 + y² = 1",
      fr: "Une hyperbole de mêmes foyers que x²/4 + y² = 1",
      es: "Una hipérbola con los focos de x²/4 + y² = 1",
      ja: "x²/4 + y² = 1 と焦点を共有する双曲線",
      zh: "与 x²/4 + y² = 1 共焦点的双曲线"
    },
    statement: {
      en: "The ellipse $E:\\ \\dfrac{x^2}4+y^2=1$ and a hyperbola $H$ have the same foci. $P$ is a point of $E\\cap H$ in the first quadrant, and $OP$ makes an angle $\\theta$ with the $x$-axis where $\\tan\\theta=\\dfrac{\\sqrt3}6$. <b>Which of the following are true?</b>",
      fr: "L’ellipse $E:\\ \\dfrac{x^2}4+y^2=1$ et une hyperbole $H$ ont les mêmes foyers. $P$ est un point de $E\\cap H$ du premier quadrant, et $OP$ fait avec l’axe des $x$ un angle $\\theta$ tel que $\\tan\\theta=\\dfrac{\\sqrt3}6$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La elipse $E:\\ \\dfrac{x^2}4+y^2=1$ y una hipérbola $H$ tienen los mismos focos. $P$ es un punto de $E\\cap H$ en el primer cuadrante y $OP$ forma con el eje $x$ un ángulo $\\theta$ con $\\tan\\theta=\\dfrac{\\sqrt3}6$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "楕円 $E:\\ \\dfrac{x^2}4+y^2=1$ と双曲線 $H$ は焦点を共有します。$P$ は第1象限の $E\\cap H$ の点で、$OP$ と $x$ 軸のなす角 $\\theta$ は $\\tan\\theta=\\dfrac{\\sqrt3}6$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "椭圆 $E:\\ \\dfrac{x^2}4+y^2=1$ 与双曲线 $H$ 共焦点。$P$ 是 $E\\cap H$ 在第一象限的点，$OP$ 与 $x$ 轴夹角 $\\theta$ 满足 $\\tan\\theta=\\dfrac{\\sqrt3}6$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The ellipse with its foci and a ray from the origin at a small angle.",
      fr: "L’ellipse, ses foyers et une demi-droite issue de l’origine.",
      es: "La elipse, sus focos y una semirrecta desde el origen.",
      ja: "楕円とその焦点、原点からの半直線。",
      zh: "椭圆、焦点及从原点出发的射线。"
    },
    hint: {
      en: "Find $P$ on the ellipse first. For the hyperbola, $2a_H=|PF_1-PF_2|$.",
      fr: "Trouvez d’abord $P$ sur l’ellipse. Pour l’hyperbole, $2a_H=|PF_1-PF_2|$.",
      es: "Halla primero $P$ en la elipse. Para la hipérbola, $2a_H=|PF_1-PF_2|$.",
      ja: "まず楕円上の $P$。双曲線では $2a_H=|PF_1-PF_2|$。",
      zh: "先在椭圆上求 $P$，双曲线满足 $2a_H=|PF_1-PF_2|$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.0, scale: 54, pad: 16 });
      const T = F.T = axes(F, -2.7, 2.7, -1.5, 1.5);
      const p = []; for (let k = 0; k <= 80; k++) { const t = 2 * Math.PI * k / 80; p.push(T([2 * Math.cos(t), Math.sin(t)])); } F.path(p, 'conic', 'base', true);
      [-Math.sqrt(3), Math.sqrt(3)].forEach(c => F.dot(T([c, 0]))); F.text(T([Math.sqrt(3), 0]), 'F₂', 'pt', 0, 14); F.text(T([-Math.sqrt(3), 0]), 'F₁', 'pt', 0, 14);
      F.seg(T([0, 0]), T([2.4, 2.4 * Math.sqrt(3) / 6]), 'seg thin dashc');
      F.reveal = () => {
      const P = [Math.sqrt(3), 0.5]; F.dot(T(P)); F.text(T(P), 'P', 'pt', 6, -10);
      F.seg(T([-Math.sqrt(3), 0]), T(P), 'hl pink'); F.seg(T([Math.sqrt(3), 0]), T(P), 'hl');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "F₁": {"fr": "F₁", "es": "F₁", "ja": "F₁", "zh": "F₁"},
      "F₂": {"fr": "F₂", "es": "F₂", "ja": "F₂", "zh": "F₂"},
      "the foci are": {"fr": "les foyers sont", "es": "los focos son", "ja": "焦点は", "zh": "焦点为"}
    },
    options: [
      { tex: "e_H=\\tfrac{2\\sqrt3}{3}", correct: true, why: {
        en: "$\\tfrac{c}{a_H}=\\tfrac{\\sqrt3}{3/2}$",
        fr: "$\\tfrac{c}{a_H}=\\tfrac{\\sqrt3}{3/2}$",
        es: "$\\tfrac{c}{a_H}=\\tfrac{\\sqrt3}{3/2}$",
        ja: "$\\tfrac{c}{a_H}=\\tfrac{\\sqrt3}{3/2}$",
        zh: "$\\tfrac{c}{a_H}=\\tfrac{\\sqrt3}{3/2}$"
      } },
      { tex: "P=\\left(\\sqrt3,\\tfrac12\\right)", correct: true, why: {
        en: "$\\tfrac{3}{4}+\\tfrac14=1$",
        fr: "$\\tfrac{3}{4}+\\tfrac14=1$",
        es: "$\\tfrac{3}{4}+\\tfrac14=1$",
        ja: "$\\tfrac{3}{4}+\\tfrac14=1$",
        zh: "$\\tfrac{3}{4}+\\tfrac14=1$"
      } },
      { tex: "e_H=\\tfrac{\\sqrt6}{2}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "e_H=\\tfrac{3\\sqrt3}{4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "e_H=\\tfrac{2\\sqrt6}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "e_H=\\tfrac{\\sqrt3}{2}", correct: false, why: {
        en: "That is the eccentricity of the ellipse; a hyperbola has $e>1$.",
        fr: "C’est l’excentricité de l’ellipse ; une hyperbole a $e>1$.",
        es: "Es la excentricidad de la elipse; una hipérbola tiene $e>1$.",
        ja: "楕円の離心率。双曲線は $e>1$。",
        zh: "那是椭圆的离心率，双曲线 $e>1$。"
      } },
      { tex: "PF_1+PF_2=3", correct: false, why: {
        en: "$PF_1+PF_2=2a_E=4$",
        fr: "$PF_1+PF_2=2a_E=4$",
        es: "$PF_1+PF_2=2a_E=4$",
        ja: "$PF_1+PF_2=2a_E=4$",
        zh: "$PF_1+PF_2=2a_E=4$"
      } },
      { tex: "\\text{the foci are}\\ (\\pm\\sqrt5,0)", correct: false, why: {
        en: "$c^2=4-1=3$",
        fr: "$c^2=4-1=3$",
        es: "$c^2=4-1=3$",
        ja: "$c^2=4-1=3$",
        zh: "$c^2=4-1=3$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find P",
          fr: "Trouver P",
          es: "Hallar P",
          ja: "P を求める",
          zh: "求 P"
        },
        lines: ["y=\\tfrac{\\sqrt3}{6}x:\\ \\tfrac{x^2}{4}+\\tfrac{x^2}{12}=1\\Rightarrow P=\\left(\\sqrt3,\\tfrac12\\right)"],
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
          en: "Hyperbola",
          fr: "Hyperbole",
          es: "Hipérbola",
          ja: "双曲線",
          zh: "双曲线"
        },
        lines: ["PF_1=\\tfrac72,\\ PF_2=\\tfrac12\\Rightarrow 2a_H=3,\\ e_H=\\tfrac{\\sqrt3}{3/2}=\\tfrac{2\\sqrt3}3"],
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
