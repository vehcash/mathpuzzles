/* geometry · A line, a plane and a point in space
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-bac-2025-line-plane-claims",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 3",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 1 (17 juin 2025), exercice 3",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 1 (17 de junio de 2025), ejercicio 3",
        ja: "フランス・バカロレア 2025 数学専門 本土 1日目（2025年6月17日）第3問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第1天（2025年6月17日）第3题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "A line, a plane and a point in space",
      fr: "Une droite, un plan et un point de l’espace",
      es: "Una recta, un plano y un punto del espacio",
      ja: "空間の直線・平面・点",
      zh: "空间中的直线、平面与点"
    },
    statement: {
      en: "$A(-1;0;5)$, $B(3;2;-1)$, $C(2;-1;2)$ and the plane $\\mathcal P:\\ x-y+z+1=0$. <b>Which of the following are true?</b>",
      fr: "$A(-1;0;5)$, $B(3;2;-1)$, $C(2;-1;2)$ et le plan $\\mathcal P:\\ x-y+z+1=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A(-1;0;5)$, $B(3;2;-1)$, $C(2;-1;2)$ y el plano $\\mathcal P:\\ x-y+z+1=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A(-1;0;5)$、$B(3;2;-1)$、$C(2;-1;2)$ と平面 $\\mathcal P:\\ x-y+z+1=0$。<b>次のうち正しいものはどれですか？</b>",
      zh: "$A(-1;0;5)$，$B(3;2;-1)$，$C(2;-1;2)$，平面 $\\mathcal P:\\ x-y+z+1=0$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A sketch of the plane, the line AB crossing it, and the point C above it with a dropped perpendicular.",
      fr: "Esquisse du plan, de la droite (AB) qui le traverse et du point C avec sa perpendiculaire.",
      es: "Esbozo del plano, la recta AB que lo atraviesa y el punto C con su perpendicular.",
      ja: "平面、それを貫く直線 AB、点 C と垂線の略図。",
      zh: "平面、穿过它的直线 AB 及点 C 与垂线的示意图。"
    },
    hint: {
      en: "$\\vec{AB}=(4;2;-6)$. Distance: $\\dfrac{|2+1+2+1|}{\\sqrt3}$.",
      fr: "$\\vec{AB}=(4;2;-6)$. Distance : $\\dfrac{|2+1+2+1|}{\\sqrt3}$.",
      es: "$\\vec{AB}=(4;2;-6)$. Distancia: $\\dfrac{|2+1+2+1|}{\\sqrt3}$.",
      ja: "$\\vec{AB}=(4;2;-6)$。距離 $\\dfrac{|2+1+2+1|}{\\sqrt3}$。",
      zh: "$\\vec{AB}=(4;2;-6)$，距离 $\\dfrac{|2+1+2+1|}{\\sqrt3}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.2, scale: 52, pad: 16 });
      F.path([[0.3, 0.6], [3.6, 0.6], [4.7, 1.8], [1.4, 1.8]], 'fill-blue', 'fills', true);
      F.seg([1.0, 2.9], [3.4, 0.3], 'graph'); F.text([1.0, 2.9], 'A', 'pt', -10, 0); F.text([3.4, 0.3], 'B', 'pt', 10, 0);
      F.dot([3.8, 2.8]); F.text([3.8, 2.8], 'C', 'pt', 10, 0); F.seg([3.8, 2.8], [3.8, 1.3], 'seg thin dashc');
      F.reveal = () => {
      F.dot([3.8, 1.3]); F.text([3.8, 1.3], 'H(0;1;0)', 'len small', 30, 8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "H(0;1;0)": {"fr": "H(0;1;0)", "es": "H(0;1;0)", "ja": "H(0;1;0)", "zh": "H(0;1;0)"},
      "is normal to": {"fr": "est normal à", "es": "es normal a", "ja": "は次に垂直：", "zh": "垂直于"}
    },
    options: [
      { tex: "(AB):\\ x=3-2t,\\ y=2-t,\\ z=-1+3t", correct: true, why: {
        en: "Direction $(-2;-1;3)\\parallel\\vec{AB}$, and $t=0$ gives $B$.",
        fr: "Direction $(-2;-1;3)$ colinéaire à $\\vec{AB}$, et $t=0$ donne $B$.",
        es: "Dirección $(-2;-1;3)\\parallel\\vec{AB}$, y $t=0$ da $B$.",
        ja: "方向 $(-2;-1;3)\\parallel\\vec{AB}$、$t=0$ で $B$。",
        zh: "方向 $(-2;-1;3)\\parallel\\vec{AB}$，$t=0$ 得 $B$。"
      } },
      { tex: "d(C,\\mathcal P)=2\\sqrt3", correct: true, why: {
        en: "$\\dfrac{|2+1+2+1|}{\\sqrt3}=\\dfrac6{\\sqrt3}$",
        fr: "$\\dfrac{|2+1+2+1|}{\\sqrt3}=\\dfrac6{\\sqrt3}$",
        es: "$\\dfrac{|2+1+2+1|}{\\sqrt3}=\\dfrac6{\\sqrt3}$",
        ja: "$\\dfrac{|2+1+2+1|}{\\sqrt3}=\\dfrac6{\\sqrt3}$",
        zh: "$\\dfrac{|2+1+2+1|}{\\sqrt3}=\\dfrac6{\\sqrt3}$"
      } },
      { tex: "\\vec n(5;-2;1)\\ \\text{is normal to}\\ (OAB)", correct: false, why: {
        en: "$\\vec n\\cdot\\vec{OA}=0$, $\\vec n\\cdot\\vec{OB}=15-4-1=10\\ne0$",
        fr: "$\\vec n\\cdot\\vec{OA}=0$, $\\vec n\\cdot\\vec{OB}=15-4-1=10\\ne0$",
        es: "$\\vec n\\cdot\\vec{OA}=0$, $\\vec n\\cdot\\vec{OB}=15-4-1=10\\ne0$",
        ja: "$\\vec n\\cdot\\vec{OA}=0$, $\\vec n\\cdot\\vec{OB}=15-4-1=10\\ne0$",
        zh: "$\\vec n\\cdot\\vec{OA}=0$, $\\vec n\\cdot\\vec{OB}=15-4-1=10\\ne0$"
      } },
      { tex: "d(C,\\mathcal P)=6", correct: false, why: {
        en: "Forgot to divide by $\\|\\vec n\\|=\\sqrt3$.",
        fr: "Oubli de diviser par $\\|\\vec n\\|=\\sqrt3$.",
        es: "Falta dividir entre $\\|\\vec n\\|=\\sqrt3$.",
        ja: "$\\|\\vec n\\|=\\sqrt3$ で割り忘れ。",
        zh: "忘了除以 $\\|\\vec n\\|=\\sqrt3$。"
      } },
      { tex: "d(C,\\mathcal P)=\\tfrac{2\\sqrt3}3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "C\\in\\mathcal P", correct: false, why: {
        en: "$2+1+2+1=6\\ne0$",
        fr: "$2+1+2+1=6\\ne0$",
        es: "$2+1+2+1=6\\ne0$",
        ja: "$2+1+2+1=6\\ne0$",
        zh: "$2+1+2+1=6\\ne0$"
      } },
      { tex: "(AB)\\parallel\\mathcal P", correct: false, why: {
        en: "$(4;2;-6)\\cdot(1;-1;1)=-4\\ne0$",
        fr: "$(4;2;-6)\\cdot(1;-1;1)=-4\\ne0$",
        es: "$(4;2;-6)\\cdot(1;-1;1)=-4\\ne0$",
        ja: "$(4;2;-6)\\cdot(1;-1;1)=-4\\ne0$",
        zh: "$(4;2;-6)\\cdot(1;-1;1)=-4\\ne0$"
      } },
      { tex: "A\\in\\mathcal P", correct: false, why: {
        en: "$-1-0+5+1=5\\ne0$",
        fr: "$-1-0+5+1=5\\ne0$",
        es: "$-1-0+5+1=5\\ne0$",
        ja: "$-1-0+5+1=5\\ne0$",
        zh: "$-1-0+5+1=5\\ne0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "The line",
          fr: "La droite",
          es: "La recta",
          ja: "直線",
          zh: "直线"
        },
        lines: ["\\vec{AB}=(4;2;-6)=-2(-2;-1;3),\\quad t=0\\mapsto B"],
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
          en: "Distance",
          fr: "Distance",
          es: "Distancia",
          ja: "距離",
          zh: "距离"
        },
        lines: ["d(C,\\mathcal P)=\\frac6{\\sqrt3}=2\\sqrt3,\\quad H(0;1;0)"],
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
