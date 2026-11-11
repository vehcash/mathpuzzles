/* geometry · A point, a vertical plane and a triangle
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 3.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-evau-2025-point-plane-triangle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 3.2",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 3.2",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 3.2",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 3.2",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 3.2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "A point, a vertical plane and a triangle",
      fr: "Un point, un plan vertical et un triangle",
      es: "Un punto, un plano vertical y un triángulo",
      ja: "点と鉛直な平面と三角形",
      zh: "一个点、一个竖直平面与一个三角形"
    },
    statement: {
      en: "$P(0,1,1)$ and the plane $\\pi:\\ x+y=2$. Let $A$, $B$ be the points where $\\pi$ meets the $x$- and $y$-axes. <b>Which of the following are true?</b>",
      fr: "$P(0,1,1)$ et le plan $\\pi:\\ x+y=2$. Soit $A$, $B$ les points où $\\pi$ coupe les axes des $x$ et des $y$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P(0,1,1)$ y el plano $\\pi:\\ x+y=2$. Sean $A$, $B$ los puntos donde $\\pi$ corta a los ejes $x$ e $y$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P(0,1,1)$ と平面 $\\pi:\\ x+y=2$。$\\pi$ と $x$ 軸・$y$ 軸の交点を $A$、$B$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$P(0,1,1)$ 与平面 $\\pi:\\ x+y=2$。设 $\\pi$ 与 $x$ 轴、$y$ 轴交于 $A$、$B$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Top view: the trace of the plane is the line x + y = 2, with P's shadow at (0, 1).",
      fr: "Vue de dessus : la trace du plan est la droite x + y = 2, l’ombre de P en (0, 1).",
      es: "Vista desde arriba: la traza del plano es la recta x + y = 2, con la sombra de P en (0, 1).",
      ja: "上から見た図：平面の跡は直線 x + y = 2、P の影は (0, 1)。",
      zh: "俯视图：平面的迹为直线 x + y = 2，P 的投影在 (0, 1)。"
    },
    hint: {
      en: "Distance: $\\dfrac{|0+1-2|}{\\sqrt2}$. Area: $\\tfrac12|\\vec{AB}\\times\\vec{AP}|$.",
      fr: "Distance : $\\dfrac{|0+1-2|}{\\sqrt2}$. Aire : $\\tfrac12|\\vec{AB}\\times\\vec{AP}|$.",
      es: "Distancia: $\\dfrac{|0+1-2|}{\\sqrt2}$. Área: $\\tfrac12|\\vec{AB}\\times\\vec{AP}|$.",
      ja: "距離 $\\dfrac{|0+1-2|}{\\sqrt2}$。面積 $\\tfrac12|\\vec{AB}\\times\\vec{AP}|$。",
      zh: "距离 $\\dfrac{|0+1-2|}{\\sqrt2}$，面积 $\\tfrac12|\\vec{AB}\\times\\vec{AP}|$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 80, pad: 16 });
      const T = F.T = axes(F, -0.6, 2.8, -0.6, 2.8);
      F.seg(T([2.4, -0.4]), T([-0.4, 2.4]), 'graph'); F.dot(T([2, 0])); F.dot(T([0, 2])); F.dot(T([0, 1]));
      F.text(T([2, 0]), 'A', 'pt', -10, 14); F.text(T([0, 2]), 'B', 'pt', 12, -8); F.text(T([0, 1]), 'P', 'pt', -12, 0);
      F.reveal = () => {
      F.seg(T([0, 1]), T([0.5, 1.5]), 'hl pink'); F.text(T([0.5, 1.5]), 'Q', 'pt', -8, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the foot of the perpendicular is": {"fr": "le pied de la perpendiculaire est", "es": "el pie de la perpendicular es", "ja": "垂線の足は", "zh": "垂足为"},
      "passes through": {"fr": "passe par", "es": "pasa por", "ja": "は次を通る：", "zh": "经过"}
    },
    options: [
      { tex: "d(P,\\pi)=\\tfrac{\\sqrt2}2", correct: true, why: {
        en: "$\\dfrac{|-1|}{\\sqrt2}$",
        fr: "$\\dfrac{|-1|}{\\sqrt2}$",
        es: "$\\dfrac{|-1|}{\\sqrt2}$",
        ja: "$\\dfrac{|-1|}{\\sqrt2}$",
        zh: "$\\dfrac{|-1|}{\\sqrt2}$"
      } },
      { tex: "\\operatorname{area}(PAB)=\\sqrt3", correct: true, why: {
        en: "$\\vec{AB}\\times\\vec{AP}=(2,2,2)$, $\\tfrac12\\sqrt{12}=\\sqrt3$",
        fr: "$\\vec{AB}\\times\\vec{AP}=(2,2,2)$, $\\tfrac12\\sqrt{12}=\\sqrt3$",
        es: "$\\vec{AB}\\times\\vec{AP}=(2,2,2)$, $\\tfrac12\\sqrt{12}=\\sqrt3$",
        ja: "$\\vec{AB}\\times\\vec{AP}=(2,2,2)$, $\\tfrac12\\sqrt{12}=\\sqrt3$",
        zh: "$\\vec{AB}\\times\\vec{AP}=(2,2,2)$, $\\tfrac12\\sqrt{12}=\\sqrt3$"
      } },
      { tex: "\\operatorname{area}(PAB)=3", correct: false, why: {
        en: "That forgets the square root of $|(2,2,2)|^2=12$.",
        fr: "Oubli de la racine de $|(2,2,2)|^2=12$.",
        es: "Se olvida la raíz de $|(2,2,2)|^2=12$.",
        ja: "$|(2,2,2)|^2=12$ の平方根を忘れている。",
        zh: "漏了 $|(2,2,2)|^2=12$ 的开方。"
      } },
      { tex: "d(P,\\pi)=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "d(P,\\pi)=\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the foot of the perpendicular is}\\ \\left(1,1,1\\right)", correct: false, why: {
        en: "$\\vec{PQ}=(1,0,0)\\not\\parallel(1,1,0)$; $Q=\\left(\\tfrac12,\\tfrac32,1\\right)$",
        fr: "$\\vec{PQ}=(1,0,0)\\not\\parallel(1,1,0)$; $Q=\\left(\\tfrac12,\\tfrac32,1\\right)$",
        es: "$\\vec{PQ}=(1,0,0)\\not\\parallel(1,1,0)$; $Q=\\left(\\tfrac12,\\tfrac32,1\\right)$",
        ja: "$\\vec{PQ}=(1,0,0)\\not\\parallel(1,1,0)$; $Q=\\left(\\tfrac12,\\tfrac32,1\\right)$",
        zh: "$\\vec{PQ}=(1,0,0)\\not\\parallel(1,1,0)$; $Q=\\left(\\tfrac12,\\tfrac32,1\\right)$"
      } },
      { tex: "\\pi\\ \\text{passes through}\\ P", correct: false, why: {
        en: "$0+1\\ne2$",
        fr: "$0+1\\ne2$",
        es: "$0+1\\ne2$",
        ja: "$0+1\\ne2$",
        zh: "$0+1\\ne2$"
      } },
      { tex: "A=(0,2,0)", correct: false, why: {
        en: "$A$ is on the $x$-axis: $(2,0,0)$.",
        fr: "$A$ est sur l’axe des $x$ : $(2,0,0)$.",
        es: "$A$ está en el eje $x$: $(2,0,0)$.",
        ja: "$A$ は $x$ 軸上の $(2,0,0)$。",
        zh: "$A$ 在 $x$ 轴上：$(2,0,0)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Distance",
          fr: "Distance",
          es: "Distancia",
          ja: "距離",
          zh: "距离"
        },
        lines: ["d=\\frac{|0+1-2|}{\\sqrt{1^2+1^2}}=\\frac{\\sqrt2}2,\\quad Q=\\left(\\tfrac12,\\tfrac32,1\\right)"],
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
          en: "Triangle",
          fr: "Triangle",
          es: "Triángulo",
          ja: "三角形",
          zh: "三角形"
        },
        lines: ["A(2,0,0),\\ B(0,2,0):\\ \\vec{AB}\\times\\vec{AP}=(2,2,2),\\ S=\\tfrac12\\sqrt{12}=\\sqrt3"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The official worked solution printed $3$; the cross product gives $\\sqrt3$.",
          fr: "Le corrigé publié indiquait $3$ ; le produit vectoriel donne $\\sqrt3$.",
          es: "La solución publicada ponía $3$; el producto vectorial da $\\sqrt3$.",
          ja: "公表解答は $3$ だが外積からは $\\sqrt3$。",
          zh: "公布的解答写 $3$，叉积给出 $\\sqrt3$。"
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
