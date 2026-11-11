/* geometry · From P to one plane, then to another
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-triangle-pqr-two-planes",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.6",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.6",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.6",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "From P to one plane, then to another",
      fr: "De P à un plan, puis à un autre",
      es: "De P a un plano y luego a otro",
      ja: "P から平面へ、さらに別の平面へ",
      zh: "从 P 到一个平面，再到另一个"
    },
    statement: {
      en: "The line through $P(1,3,2)$ parallel to $\\dfrac{x-2}{1}=\\dfrac{y-4}{2}=\\dfrac{z-6}{1}$ meets the plane $L_1:\\ x-y+3z=6$ at $Q$. The line through $Q$ perpendicular to $L_1$ meets $L_2:\\ 2x-y+z=-4$ at $R$. <b>Which of the following are true?</b>",
      fr: "La droite par $P(1,3,2)$ parallèle à $\\dfrac{x-2}{1}=\\dfrac{y-4}{2}=\\dfrac{z-6}{1}$ coupe le plan $L_1:\\ x-y+3z=6$ en $Q$. La droite par $Q$ perpendiculaire à $L_1$ coupe $L_2:\\ 2x-y+z=-4$ en $R$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La recta por $P(1,3,2)$ paralela a $\\dfrac{x-2}{1}=\\dfrac{y-4}{2}=\\dfrac{z-6}{1}$ corta el plano $L_1:\\ x-y+3z=6$ en $Q$. La recta por $Q$ perpendicular a $L_1$ corta $L_2:\\ 2x-y+z=-4$ en $R$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P(1,3,2)$ を通り $\\dfrac{x-2}{1}=\\dfrac{y-4}{2}=\\dfrac{z-6}{1}$ に平行な直線が平面 $L_1:\\ x-y+3z=6$ と $Q$ で交わり、$Q$ を通り $L_1$ に垂直な直線が $L_2:\\ 2x-y+z=-4$ と $R$ で交わります。<b>次のうち正しいものはどれですか？</b>",
      zh: "过 $P(1,3,2)$ 且平行于 $\\dfrac{x-2}{1}=\\dfrac{y-4}{2}=\\dfrac{z-6}{1}$ 的直线交平面 $L_1:\\ x-y+3z=6$ 于 $Q$；过 $Q$ 且垂直于 $L_1$ 的直线交 $L_2:\\ 2x-y+z=-4$ 于 $R$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A schematic: P, the step along direction (1, 2, 1) to Q on L₁, and the step along the normal (1, −1, 3) to R on L₂.",
      fr: "Un schéma : P, le pas selon (1, 2, 1) jusqu’à Q sur L₁, puis le pas selon la normale (1, −1, 3) jusqu’à R sur L₂.",
      es: "Un esquema: P, el paso según (1, 2, 1) hasta Q en L₁ y el paso según la normal (1, −1, 3) hasta R en L₂.",
      ja: "模式図：P から方向 (1, 2, 1) で L₁ 上の Q、法線 (1, −1, 3) で L₂ 上の R へ。",
      zh: "示意图：P 沿 (1, 2, 1) 到 L₁ 上的 Q，再沿法向量 (1, −1, 3) 到 L₂ 上的 R。"
    },
    hint: {
      en: "Write $(1+t,\\,3+2t,\\,2+t)$ and put it in $L_1$; then $Q+s(1,-1,3)$ into $L_2$.",
      fr: "Écrivez $(1+t,\\,3+2t,\\,2+t)$ et reportez dans $L_1$ ; puis $Q+s(1,-1,3)$ dans $L_2$.",
      es: "Escribe $(1+t,\\,3+2t,\\,2+t)$ y sustituye en $L_1$; luego $Q+s(1,-1,3)$ en $L_2$.",
      ja: "$(1+t,\\,3+2t,\\,2+t)$ を $L_1$ に代入し、次に $Q+s(1,-1,3)$ を $L_2$ に代入。",
      zh: "把 $(1+t,\\,3+2t,\\,2+t)$ 代入 $L_1$，再把 $Q+s(1,-1,3)$ 代入 $L_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 56, pad: 16 });
      const P = [0.6, 0.8], Q = [2.6, 2.4], R = [4.4, 0.9];
      F.path([[1.6, 2.9], [3.6, 2.9], [3.2, 1.9], [1.2, 1.9]], 'fill-blue', 'fills', true); F.text([3.6, 2.9], 'L₁', 'pt', 14, -4);
      F.dot(P); F.text(P, 'P', 'pt', -10, 8); arrow(F, P, Q); F.dot(Q); F.text(Q, 'Q', 'pt', 0, -12);
      F.text([1.4, 1.7], '(1, 2, 1)', 'len small', -24, 0);
      F.reveal = () => {
      arrow(F, Q, R, 'vec two'); F.dot(R); F.text(R, 'R', 'pt', 10, 8); F.seg(P, R, 'seg thin dashc');
      F.text([3.6, 1.7], '√11', 'len small', 14, 0); F.text([1.6, 1.6], '√6', 'len small', 10, 8); F.text([2.5, 0.85], '√13', 'len small', 0, 12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "centroid of": {"fr": "centre de gravité de", "es": "baricentro de", "ja": "重心：", "zh": "重心："}
    },
    options: [
      { tex: "PQ=\\sqrt6", correct: true, why: {
        en: "$t=1$, $Q=(2,5,3)$, $\\overrightarrow{PQ}=(1,2,1)$.",
        fr: "$t=1$, $Q=(2,5,3)$, $\\overrightarrow{PQ}=(1,2,1)$.",
        es: "$t=1$, $Q=(2,5,3)$, $\\overrightarrow{PQ}=(1,2,1)$.",
        ja: "$t=1$、$Q=(2,5,3)$、$\\overrightarrow{PQ}=(1,2,1)$。",
        zh: "$t=1$，$Q=(2,5,3)$，$\\overrightarrow{PQ}=(1,2,1)$。"
      } },
      { tex: "\\text{centroid of}\\ \\triangle PQR=\\left(\\tfrac43,\\tfrac{14}3,\\tfrac53\\right)", correct: true, why: {
        en: "$R=(1,6,0)$; average the three points.",
        fr: "$R=(1,6,0)$ ; moyenne des trois points.",
        es: "$R=(1,6,0)$; media de los tres puntos.",
        ja: "$R=(1,6,0)$。3点の平均。",
        zh: "$R=(1,6,0)$，三点取平均。"
      } },
      { tex: "R=(1,6,3)", correct: false, why: {
        en: "$s=-1$ gives $R=(1,6,0)$.",
        fr: "$s=-1$ donne $R=(1,6,0)$.",
        es: "$s=-1$ da $R=(1,6,0)$.",
        ja: "$s=-1$ で $R=(1,6,0)$。",
        zh: "$s=-1$ 得 $R=(1,6,0)$。"
      } },
      { tex: "PQ+QR+RP=\\sqrt2+\\sqrt6+\\sqrt{11}", correct: false, why: {
        en: "$RP=\\sqrt{0+9+4}=\\sqrt{13}$.",
        fr: "$RP=\\sqrt{0+9+4}=\\sqrt{13}$.",
        es: "$RP=\\sqrt{0+9+4}=\\sqrt{13}$.",
        ja: "$RP=\\sqrt{0+9+4}=\\sqrt{13}$。",
        zh: "$RP=\\sqrt{0+9+4}=\\sqrt{13}$。"
      } },
      { tex: "Q=(3,7,4)", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "QR=\\sqrt6", correct: false, why: {
        en: "$QR=|s|\\cdot|(1,-1,3)|=\\sqrt{11}$.",
        fr: "$QR=|s|\\cdot|(1,-1,3)|=\\sqrt{11}$.",
        es: "$QR=|s|\\cdot|(1,-1,3)|=\\sqrt{11}$.",
        ja: "$QR=|s|\\cdot|(1,-1,3)|=\\sqrt{11}$。",
        zh: "$QR=|s|\\cdot|(1,-1,3)|=\\sqrt{11}$。"
      } },
      { tex: "\\angle PQR=90^\\circ", correct: false, why: {
        en: "$(1,2,1)\\cdot(1,-1,3)=2\\ne0$.",
        fr: "$(1,2,1)\\cdot(1,-1,3)=2\\ne0$.",
        es: "$(1,2,1)\\cdot(1,-1,3)=2\\ne0$.",
        ja: "$(1,2,1)\\cdot(1,-1,3)=2\\ne0$。",
        zh: "$(1,2,1)\\cdot(1,-1,3)=2\\ne0$。"
      } },
      { tex: "P\\in L_2", correct: false, why: {
        en: "$2-3+2=1\\ne-4$.",
        fr: "$2-3+2=1\\ne-4$.",
        es: "$2-3+2=1\\ne-4$.",
        ja: "$2-3+2=1\\ne-4$。",
        zh: "$2-3+2=1\\ne-4$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find Q",
          fr: "Trouver Q",
          es: "Hallar Q",
          ja: "Q を求める",
          zh: "求 Q"
        },
        lines: ["(1+t)-(3+2t)+3(2+t)=6\\ \\Rightarrow\\ t=1,\\quad Q=(2,5,3)"],
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
          en: "Find R",
          fr: "Trouver R",
          es: "Hallar R",
          ja: "R を求める",
          zh: "求 R"
        },
        lines: ["2(2+s)-(5-s)+(3+3s)=-4\\ \\Rightarrow\\ s=-1,\\quad R=(1,6,0)"],
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
          en: "The triangle",
          fr: "Le triangle",
          es: "El triángulo",
          ja: "三角形",
          zh: "三角形"
        },
        lines: ["PQ=\\sqrt6,\\ QR=\\sqrt{11},\\ RP=\\sqrt{13},\\quad G=\\left(\\tfrac43,\\tfrac{14}3,\\tfrac53\\right)"],
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
