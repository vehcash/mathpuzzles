/* geometry · A line parallel to the meeting of two planes
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2025-line-of-two-planes-pqr",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.5",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.5",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.5",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A line parallel to the meeting of two planes",
      fr: "Une droite parallèle à l’intersection de deux plans",
      es: "Una recta paralela a la intersección de dos planos",
      ja: "2平面の交線に平行な直線",
      zh: "平行于两平面交线的直线"
    },
    statement: {
      en: "$L_1$ is the line where $2x+3y+z=4$ and $x+2y+z=5$ meet. $L_2$ passes through $P(2,-1,3)$ parallel to $L_1$ and meets $M:\\ 2x+y-2z=6$ at $Q$. $R$ is the foot of the perpendicular from $P$ to $M$. <b>Which of the following are true?</b>",
      fr: "$L_1$ est l’intersection des plans $2x+3y+z=4$ et $x+2y+z=5$. $L_2$ passe par $P(2,-1,3)$, parallèle à $L_1$, et coupe $M:\\ 2x+y-2z=6$ en $Q$. $R$ est le pied de la perpendiculaire de $P$ à $M$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$L_1$ es la intersección de los planos $2x+3y+z=4$ y $x+2y+z=5$. $L_2$ pasa por $P(2,-1,3)$, paralela a $L_1$, y corta $M:\\ 2x+y-2z=6$ en $Q$. $R$ es el pie de la perpendicular de $P$ a $M$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "平面 $2x+3y+z=4$ と $x+2y+z=5$ の交線を $L_1$ とし、$P(2,-1,3)$ を通り $L_1$ に平行な直線 $L_2$ が平面 $M:\\ 2x+y-2z=6$ と $Q$ で交わります。$P$ から $M$ に下ろした垂線の足を $R$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$L_1$ 为平面 $2x+3y+z=4$ 与 $x+2y+z=5$ 的交线，$L_2$ 过 $P(2,-1,3)$ 且平行于 $L_1$，交平面 $M:\\ 2x+y-2z=6$ 于 $Q$，$R$ 为 $P$ 到 $M$ 的垂足。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The plane M with P above it; the slanted line from P to Q on M and the perpendicular from P to R.",
      fr: "Le plan M avec P au-dessus ; la droite oblique de P à Q sur M et la perpendiculaire de P à R.",
      es: "El plano M con P encima; la recta oblicua de P a Q en M y la perpendicular de P a R.",
      ja: "平面 M とその上の P、P から M 上の Q への斜めの直線と、P から R への垂線。",
      zh: "平面 M 与其上方的 P，P 到 M 上 Q 的斜线及 P 到 R 的垂线。"
    },
    hint: {
      en: "The direction of $L_1$ is $(2,3,1)\\times(1,2,1)$. Triangle $PQR$ has its right angle at $R$.",
      fr: "La direction de $L_1$ est $(2,3,1)\\times(1,2,1)$. Le triangle $PQR$ est rectangle en $R$.",
      es: "La dirección de $L_1$ es $(2,3,1)\\times(1,2,1)$. El triángulo $PQR$ es rectángulo en $R$.",
      ja: "$L_1$ の方向は $(2,3,1)\\times(1,2,1)$。$\\triangle PQR$ は $R$ が直角。",
      zh: "$L_1$ 方向为 $(2,3,1)\\times(1,2,1)$。$\\triangle PQR$ 在 $R$ 处为直角。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.4, scale: 56, pad: 16 });
      F.path([[0.3, 0.3], [4.0, 0.3], [5.1, 1.4], [1.4, 1.4]], 'fill-blue', 'fills', true); F.text([4.6, 0.6], 'M', 'pt', 0, 0);
      const P = [3.2, 3.0], R = [3.2, 0.85], Q = [1.0, 0.7]; F.dot(P); F.text(P, 'P', 'pt', 10, -4);
      F.reveal = () => {
      F.seg(P, R, 'hl pink'); F.seg(P, Q, 'seg'); F.seg(Q, R, 'seg thin dashc'); F.dot(Q); F.dot(R); F.text(Q, 'Q', 'pt', -10, 8); F.text(R, 'R', 'pt', 12, 4);
      F.text([3.2, 1.9], '3', 'len small', 10, 0); F.text([2.1, 1.9], '9√3', 'len small', -18, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "area of": {"fr": "aire de", "es": "área de", "ja": "面積：", "zh": "面积："},
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"}
    },
    options: [
      { tex: "|PQ|=9\\sqrt3", correct: true, why: {
        en: "Direction $(1,-1,1)$, $t=-9$: $Q=(-7,8,-6)$.",
        fr: "Direction $(1,-1,1)$, $t=-9$ : $Q=(-7,8,-6)$.",
        es: "Dirección $(1,-1,1)$, $t=-9$: $Q=(-7,8,-6)$.",
        ja: "方向 $(1,-1,1)$、$t=-9$ で $Q=(-7,8,-6)$。",
        zh: "方向 $(1,-1,1)$，$t=-9$：$Q=(-7,8,-6)$。"
      } },
      { tex: "\\text{area of}\\ \\triangle PQR=\\tfrac32\\sqrt{234}", correct: true, why: {
        en: "$R=(4,0,1)$, $PR=3$, $QR=\\sqrt{234}$, right angle at $R$.",
        fr: "$R=(4,0,1)$, $PR=3$, $QR=\\sqrt{234}$, angle droit en $R$.",
        es: "$R=(4,0,1)$, $PR=3$, $QR=\\sqrt{234}$, ángulo recto en $R$.",
        ja: "$R=(4,0,1)$、$PR=3$、$QR=\\sqrt{234}$、$R$ が直角。",
        zh: "$R=(4,0,1)$，$PR=3$，$QR=\\sqrt{234}$，$R$ 处为直角。"
      } },
      { tex: "|QR|=15", correct: false, why: {
        en: "$\\sqrt{234}\\approx15.3$.",
        fr: "$\\sqrt{234}\\approx15{,}3$.",
        es: "$\\sqrt{234}\\approx15{,}3$.",
        ja: "$\\sqrt{234}\\approx15.3$。",
        zh: "$\\sqrt{234}\\approx15.3$。"
      } },
      { tex: "\\angle QPR=\\cos^{-1}\\tfrac{1}{2\\sqrt3}", correct: false, why: {
        en: "$\\cos=\\tfrac{PR}{PQ}=\\tfrac{3}{9\\sqrt3}=\\tfrac1{3\\sqrt3}$.",
        fr: "$\\cos=\\tfrac{PR}{PQ}=\\tfrac1{3\\sqrt3}$.",
        es: "$\\cos=\\tfrac{PR}{PQ}=\\tfrac1{3\\sqrt3}$.",
        ja: "$\\cos=\\tfrac{PR}{PQ}=\\tfrac1{3\\sqrt3}$。",
        zh: "$\\cos=\\tfrac{PR}{PQ}=\\tfrac1{3\\sqrt3}$。"
      } },
      { tex: "|PR|=9", correct: false, why: {
        en: "$|PR|=\\tfrac{|4-1-6-6|}{3}=3$.",
        fr: "$|PR|=\\tfrac{|4-1-6-6|}{3}=3$.",
        es: "$|PR|=\\tfrac{|4-1-6-6|}{3}=3$.",
        ja: "$|PR|=\\tfrac{|4-1-6-6|}{3}=3$。",
        zh: "$|PR|=\\tfrac{|4-1-6-6|}{3}=3$。"
      } },
      { tex: "L_1\\parallel M", correct: false, why: {
        en: "$(1,-1,1)\\cdot(2,1,-2)=-1\\ne0$.",
        fr: "$(1,-1,1)\\cdot(2,1,-2)=-1\\ne0$.",
        es: "$(1,-1,1)\\cdot(2,1,-2)=-1\\ne0$.",
        ja: "$(1,-1,1)\\cdot(2,1,-2)=-1\\ne0$。",
        zh: "$(1,-1,1)\\cdot(2,1,-2)=-1\\ne0$。"
      } },
      { tex: "R=(0,-2,5)", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{area of}\\ \\triangle PQR=3\\sqrt{234}", correct: false, why: {
        en: "Missing the factor $\\tfrac12$.",
        fr: "Il manque le facteur $\\tfrac12$.",
        es: "Falta el factor $\\tfrac12$.",
        ja: "$\\tfrac12$ を忘れている。",
        zh: "漏了 $\\tfrac12$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Direction of L₁",
          fr: "Direction de L₁",
          es: "Dirección de L₁",
          ja: "L₁ の方向",
          zh: "L₁ 的方向"
        },
        lines: ["(2,3,1)\\times(1,2,1)=(1,-1,1)"],
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
          en: "Q and R",
          fr: "Q et R",
          es: "Q y R",
          ja: "Q と R",
          zh: "Q 与 R"
        },
        lines: ["(2+t,-1-t,3+t)\\in M:\\ -3-t=6,\\ t=-9,\\ Q=(-7,8,-6)", "P+s(2,1,-2)\\in M:\\ -3+9s=6,\\ s=1,\\ R=(4,0,1)"],
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
          en: "The right triangle",
          fr: "Le triangle rectangle",
          es: "El triángulo rectángulo",
          ja: "直角三角形",
          zh: "直角三角形"
        },
        lines: ["PQ=9\\sqrt3,\\ PR=3,\\ QR=\\sqrt{243-9}=\\sqrt{234},\\quad\\text{area}=\\tfrac12\\cdot3\\cdot\\sqrt{234}"],
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
