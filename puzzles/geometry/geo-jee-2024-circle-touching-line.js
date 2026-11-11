/* geometry · A circle on the y-axis touching y = 2x
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-circle-touching-line",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.15",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.15",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.15",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.15",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.15"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A circle on the y-axis touching y = 2x",
      fr: "Un cercle centré sur l’axe des y tangent à y = 2x",
      es: "Una circunferencia en el eje y tangente a y = 2x",
      ja: "y 軸上に中心をもち y = 2x に接する円",
      zh: "圆心在 y 轴上且与 y = 2x 相切的圆"
    },
    statement: {
      en: "The line $y=2x$ touches a circle with centre $(0,\\alpha)$, $\\alpha>0$, and radius $r$ at the point $A_1$. $B_1$ is the point of the circle with $A_1B_1$ a diameter, and $\\alpha+r=5+\\sqrt5$. <b>Which of the following are true?</b>",
      fr: "La droite $y=2x$ est tangente en $A_1$ au cercle de centre $(0,\\alpha)$, $\\alpha>0$, et de rayon $r$. $B_1$ est le point du cercle tel que $A_1B_1$ soit un diamètre, et $\\alpha+r=5+\\sqrt5$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La recta $y=2x$ es tangente en $A_1$ a la circunferencia de centro $(0,\\alpha)$, $\\alpha>0$, y radio $r$. $B_1$ es el punto de la circunferencia con $A_1B_1$ diámetro, y $\\alpha+r=5+\\sqrt5$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "直線 $y=2x$ は中心 $(0,\\alpha)$（$\\alpha>0$）、半径 $r$ の円に点 $A_1$ で接します。$A_1B_1$ が直径となる円上の点を $B_1$ とし、$\\alpha+r=5+\\sqrt5$ です。<b>次のうち正しいものはどれですか？</b>",
      zh: "直线 $y=2x$ 与圆心为 $(0,\\alpha)$（$\\alpha>0$）、半径为 $r$ 的圆相切于 $A_1$。$B_1$ 为圆上使 $A_1B_1$ 为直径的点，且 $\\alpha+r=5+\\sqrt5$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The line y = 2x through the origin, a circle centred on the positive y-axis touching it at A₁, and the opposite end B₁ of the diameter through A₁.",
      fr: "La droite y = 2x passant par l’origine, un cercle centré sur l’axe des y positifs tangent en A₁, et l’extrémité opposée B₁ du diamètre passant par A₁.",
      es: "La recta y = 2x por el origen, una circunferencia con centro en el eje y positivo tangente en A₁ y el extremo opuesto B₁ del diámetro por A₁.",
      ja: "原点を通る直線 y = 2x、正の y 軸上に中心をもち A₁ で接する円、A₁ を通る直径の反対側の端 B₁。",
      zh: "过原点的直线 y = 2x，圆心在 y 轴正半轴、切于 A₁ 的圆，以及过 A₁ 的直径另一端 B₁。"
    },
    hint: {
      en: "The radius equals the distance from $(0,\\alpha)$ to the line $2x-y=0$. $A_1$ is the foot of the perpendicular.",
      fr: "Le rayon est la distance de $(0,\\alpha)$ à la droite $2x-y=0$. $A_1$ est le pied de la perpendiculaire.",
      es: "El radio es la distancia de $(0,\\alpha)$ a la recta $2x-y=0$. $A_1$ es el pie de la perpendicular.",
      ja: "半径は $(0,\\alpha)$ から直線 $2x-y=0$ への距離。$A_1$ は垂線の足。",
      zh: "半径等于 $(0,\\alpha)$ 到直线 $2x-y=0$ 的距离，$A_1$ 是垂足。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 9.0, scale: 30, pad: 18 });
      const T = F.T = axes(F, -3.0, 3.6, -0.6, 8.4);
      const C = [0, 5], r = Math.sqrt(5);
      F.circle(T(C), r, 'conic');
      plot(F, T, x => 2 * x, -0.3, 3.4, 'seg', 'base', -0.6, 8.2);
      F.seg(T([2, 4]), T([-2, 6]), 'seg thin dashc');
      F.dot(T(C)); F.dot(T([2, 4])); F.dot(T([-2, 6]));
      F.text(T([2, 4]), 'A₁', 'pt', 14, 8); F.text(T([-2, 6]), 'B₁', 'pt', -14, -6); F.text(T(C), '(0, α)', 'len small', 26, -6);
      F.text(T([1.2, 7.6]), 'y = 2x', 'len small', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "foot from": {"fr": "pied depuis", "es": "pie desde", "ja": "からの垂線の足", "zh": "的垂足，自"}
    },
    options: [
      { tex: "\\alpha=5", correct: true, why: {
        en: "$r=\\tfrac{\\alpha}{\\sqrt5}$ and $\\alpha+\\tfrac{\\alpha}{\\sqrt5}=5+\\sqrt5$.",
        fr: "$r=\\tfrac{\\alpha}{\\sqrt5}$ and $\\alpha+\\tfrac{\\alpha}{\\sqrt5}=5+\\sqrt5$.",
        es: "$r=\\tfrac{\\alpha}{\\sqrt5}$ and $\\alpha+\\tfrac{\\alpha}{\\sqrt5}=5+\\sqrt5$.",
        ja: "$r=\\tfrac{\\alpha}{\\sqrt5}$ and $\\alpha+\\tfrac{\\alpha}{\\sqrt5}=5+\\sqrt5$.",
        zh: "$r=\\tfrac{\\alpha}{\\sqrt5}$ and $\\alpha+\\tfrac{\\alpha}{\\sqrt5}=5+\\sqrt5$."
      } },
      { tex: "B_1=(-2,6)", correct: true, why: {
        en: "$B_1=2(0,5)-(2,4)$.",
        fr: "$B_1=2(0,5)-(2,4)$.",
        es: "$B_1=2(0,5)-(2,4)$.",
        ja: "$B_1=2(0,5)-(2,4)$.",
        zh: "$B_1=2(0,5)-(2,4)$."
      } },
      { tex: "r=5", correct: false, why: {
        en: "$r=\\sqrt5$; $5$ is $\\alpha$.",
        fr: "$r=\\sqrt5$ ; $5$ est $\\alpha$.",
        es: "$r=\\sqrt5$; $5$ es $\\alpha$.",
        ja: "$r=\\sqrt5$。$5$ は $\\alpha$。",
        zh: "$r=\\sqrt5$；$5$ 是 $\\alpha$。"
      } },
      { tex: "\\alpha=\\sqrt5", correct: false, why: {
        en: "Swaps $\\alpha$ and $r$.",
        fr: "Échange $\\alpha$ et $r$.",
        es: "Intercambia $\\alpha$ y $r$.",
        ja: "$\\alpha$ と $r$ を取り違えた。",
        zh: "把 $\\alpha$ 和 $r$ 弄反了。"
      } },
      { tex: "A_1=(-2,4)", correct: false, why: {
        en: "$(-2,4)$ is not on $y=2x$.",
        fr: "$(-2,4)$ n’est pas sur $y=2x$.",
        es: "$(-2,4)$ no está en $y=2x$.",
        ja: "$(-2,4)$ は $y=2x$ 上にない。",
        zh: "$(-2,4)$ 不在 $y=2x$ 上。"
      } },
      { tex: "B_1=(2,4)", correct: false, why: {
        en: "That is $A_1$.",
        fr: "C’est $A_1$.",
        es: "Es $A_1$.",
        ja: "それは $A_1$。",
        zh: "那是 $A_1$。"
      } },
      { tex: "A_1=(-2,6)", correct: false, why: {
        en: "That is $B_1$.",
        fr: "C’est $B_1$.",
        es: "Es $B_1$.",
        ja: "それは $B_1$。",
        zh: "那是 $B_1$。"
      } },
      { tex: "r=2\\sqrt5", correct: false, why: {
        en: "That is the diameter.",
        fr: "C’est le diamètre.",
        es: "Es el diámetro.",
        ja: "それは直径。",
        zh: "那是直径。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Tangency",
          fr: "Tangence",
          es: "Tangencia",
          ja: "接する条件",
          zh: "相切"
        },
        lines: ["r=\\frac{|2\\cdot0-\\alpha|}{\\sqrt5}=\\frac{\\alpha}{\\sqrt5}"],
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
          en: "Use α + r",
          fr: "Utiliser α + r",
          es: "Usar α + r",
          ja: "α + r を使う",
          zh: "用 α + r"
        },
        lines: ["\\alpha\\left(1+\\tfrac1{\\sqrt5}\\right)=5+\\sqrt5=\\sqrt5(\\sqrt5+1)\\;\\Rightarrow\\;\\alpha=5,\\ r=\\sqrt5"],
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
          en: "The two points",
          fr: "Les deux points",
          es: "Los dos puntos",
          ja: "2点",
          zh: "两点"
        },
        lines: ["A_1=\\text{foot from }(0,5)=(2,4),\\qquad B_1=2(0,5)-A_1=(-2,6)"],
        note: {
          en: "Projection of $(0,5)$ on the direction $(1,2)$: $\\tfrac{10}{5}(1,2)$.",
          fr: "Projection de $(0,5)$ sur la direction $(1,2)$ : $\\tfrac{10}{5}(1,2)$.",
          es: "Proyección de $(0,5)$ sobre $(1,2)$: $\\tfrac{10}{5}(1,2)$.",
          ja: "$(0,5)$ の $(1,2)$ 方向への射影：$\\tfrac{10}{5}(1,2)$。",
          zh: "$(0,5)$ 在方向 $(1,2)$ 上的投影：$\\tfrac{10}{5}(1,2)$。"
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
          en: "The original matching answer is α → 5, r → √5, A₁ → (2, 4), B₁ → (−2, 6).",
          fr: "La correspondance officielle : α → 5, r → √5, A₁ → (2, 4), B₁ → (−2, 6).",
          es: "La correspondencia oficial: α → 5, r → √5, A₁ → (2, 4), B₁ → (−2, 6).",
          ja: "公式の対応：α → 5、r → √5、A₁ → (2, 4)、B₁ → (−2, 6)。",
          zh: "官方匹配：α → 5，r → √5，A₁ → (2, 4)，B₁ → (−2, 6)。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
