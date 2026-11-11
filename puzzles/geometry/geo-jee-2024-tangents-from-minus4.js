/* geometry · Two tangents from (−4, 0) to y² = 8x
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-tangents-from-minus4",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.7",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.7",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.7",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Two tangents from (−4, 0) to y² = 8x",
      fr: "Deux tangentes depuis (−4, 0) à y² = 8x",
      es: "Dos tangentes desde (−4, 0) a y² = 8x",
      ja: "(−4, 0) から y² = 8x への2本の接線",
      zh: "从 (−4, 0) 到 y² = 8x 的两条切线"
    },
    statement: {
      en: "$C_1=(-4,0)$, and the lines $A_1C_1$, $B_1C_1$ touch $y^2=8x$ at $A_1$ and $B_1$. $O$ is the origin. <b>Which of the following are true?</b>",
      fr: "$C_1=(-4,0)$, et les droites $A_1C_1$, $B_1C_1$ sont tangentes à $y^2=8x$ en $A_1$ et $B_1$. $O$ est l’origine. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$C_1=(-4,0)$, y las rectas $A_1C_1$, $B_1C_1$ son tangentes a $y^2=8x$ en $A_1$ y $B_1$. $O$ es el origen. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$C_1=(-4,0)$ とし、直線 $A_1C_1$、$B_1C_1$ は $y^2=8x$ に $A_1$、$B_1$ で接します。$O$ は原点です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$C_1=(-4,0)$，直线 $A_1C_1$、$B_1C_1$ 分别与 $y^2=8x$ 相切于 $A_1$、$B_1$，$O$ 为原点。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y² = 8x and the point C₁(−4, 0) on the axis, to the left of the vertex.",
      fr: "La parabole y² = 8x et le point C₁(−4, 0) sur l’axe, à gauche du sommet.",
      es: "La parábola y² = 8x y el punto C₁(−4, 0) en el eje, a la izquierda del vértice.",
      ja: "放物線 y² = 8x と、頂点の左の軸上の点 C₁(−4, 0)。",
      zh: "抛物线 y² = 8x 与顶点左侧轴上的点 C₁(−4, 0)。"
    },
    hint: {
      en: "The tangent at $(2t^2,4t)$ is $ty=x+2t^2$. Make it pass through $(-4,0)$.",
      fr: "La tangente en $(2t^2,4t)$ est $ty=x+2t^2$. Faites-la passer par $(-4,0)$.",
      es: "La tangente en $(2t^2,4t)$ es $ty=x+2t^2$. Haz que pase por $(-4,0)$.",
      ja: "$(2t^2,4t)$ での接線は $ty=x+2t^2$。$(-4,0)$ を通らせる。",
      zh: "$(2t^2,4t)$ 处切线为 $ty=x+2t^2$，令其过 $(-4,0)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 10.0, h: 13.0, scale: 26, pad: 16 });
      const T = F.T = axes(F, -5.0, 5.0, -6.5, 6.5);
      const p = []; for (let k = 0; k <= 80; k++) { const y = -6.3 + 12.6 * k / 80; p.push(T([y * y / 8, y])); } F.path(p, 'graph', 'base', false);
      F.dot(T([-4, 0])); F.text(T([-4, 0]), 'C₁', 'pt', -4, -12);
      F.reveal = () => {
      const s = 4 * Math.SQRT2; [[4, s], [4, -s]].forEach(A => { F.seg(T([-4, 0]), T([4.8, A[1] * 8.8 / 8]), 'hl pink'); F.dot(T(A)); });
      F.text(T([4, s]), 'A₁', 'pt', -16, -8); F.text(T([4, -s]), 'B₁', 'pt', -16, 14); F.seg(T([4, s]), T([4, -s]), 'seg thin dashc');
      F.dot(T([0, 0])); F.text(T([0, 0]), 'H = O', 'len small', 22, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the orthocentre of": {"fr": "l’orthocentre de", "es": "el ortocentro de", "ja": "垂心：", "zh": "垂心："},
      "is": {"fr": "est", "es": "es", "ja": "は", "zh": "为"},
      "is the focus": {"fr": "est le foyer", "es": "es el foco", "ja": "は焦点", "zh": "是焦点"}
    },
    options: [
      { tex: "OA_1=4\\sqrt3", correct: true, why: {
        en: "$t=\\sqrt2$: $A_1=(4,4\\sqrt2)$ and $16+32=48$.",
        fr: "$t=\\sqrt2$ : $A_1=(4,4\\sqrt2)$ et $16+32=48$.",
        es: "$t=\\sqrt2$: $A_1=(4,4\\sqrt2)$ y $16+32=48$.",
        ja: "$t=\\sqrt2$ で $A_1=(4,4\\sqrt2)$、$16+32=48$。",
        zh: "$t=\\sqrt2$：$A_1=(4,4\\sqrt2)$，$16+32=48$。"
      } },
      { tex: "\\text{the orthocentre of}\\ \\triangle A_1B_1C_1\\ \\text{is}\\ (0,0)", correct: true, why: {
        en: "The altitude from $A_1$ perpendicular to $B_1C_1$ crosses the axis at $x=0$.",
        fr: "La hauteur issue de $A_1$, perpendiculaire à $B_1C_1$, coupe l’axe en $x=0$.",
        es: "La altura desde $A_1$, perpendicular a $B_1C_1$, corta el eje en $x=0$.",
        ja: "$A_1$ から $B_1C_1$ への垂線は軸と $x=0$ で交わる。",
        zh: "过 $A_1$ 垂直于 $B_1C_1$ 的高线交轴于 $x=0$。"
      } },
      { tex: "A_1B_1=16", correct: false, why: {
        en: "$A_1B_1=8\\sqrt2\\approx11.3$.",
        fr: "$A_1B_1=8\\sqrt2\\approx11{,}3$.",
        es: "$A_1B_1=8\\sqrt2\\approx11{,}3$.",
        ja: "$A_1B_1=8\\sqrt2\\approx11.3$。",
        zh: "$A_1B_1=8\\sqrt2\\approx11.3$。"
      } },
      { tex: "\\text{the orthocentre of}\\ \\triangle A_1B_1C_1\\ \\text{is}\\ (1,0)", correct: false, why: {
        en: "That is not on the altitude from $A_1$.",
        fr: "Ce point n’est pas sur la hauteur issue de $A_1$.",
        es: "Ese punto no está en la altura desde $A_1$.",
        ja: "$A_1$ からの垂線上にない。",
        zh: "不在过 $A_1$ 的高线上。"
      } },
      { tex: "\\text{the orthocentre of}\\ \\triangle A_1B_1C_1\\ \\text{is the focus}\\ (2,0)", correct: false, why: {
        en: "The focus lies on the chord of contact's axis but not on the altitudes.",
        fr: "Le foyer n’est pas sur les hauteurs.",
        es: "El foco no está en las alturas.",
        ja: "焦点は垂線上にない。",
        zh: "焦点不在高线上。"
      } },
      { tex: "\\angle A_1C_1B_1=90^\\circ", correct: false, why: {
        en: "Tangent slopes are $\\pm\\tfrac1{\\sqrt2}$, not $\\pm1$; the right angle happens only from the directrix $x=-2$.",
        fr: "Les pentes sont $\\pm\\tfrac1{\\sqrt2}$ ; l’angle droit n’a lieu que depuis la directrice $x=-2$.",
        es: "Las pendientes son $\\pm\\tfrac1{\\sqrt2}$; el ángulo recto solo ocurre desde la directriz $x=-2$.",
        ja: "傾きは $\\pm\\tfrac1{\\sqrt2}$。直角になるのは準線 $x=-2$ 上の点だけ。",
        zh: "斜率为 $\\pm\\tfrac1{\\sqrt2}$；只有从准线 $x=-2$ 出发才成直角。"
      } },
      { tex: "OA_1=4\\sqrt2", correct: false, why: {
        en: "That is only the $y$-coordinate of $A_1$.",
        fr: "C’est seulement l’ordonnée de $A_1$.",
        es: "Es solo la ordenada de $A_1$.",
        ja: "$A_1$ の $y$ 座標だけ。",
        zh: "那只是 $A_1$ 的纵坐标。"
      } },
      { tex: "A_1=(2,4)", correct: false, why: {
        en: "$(2,4)$ is on the parabola but its tangent passes through $(-2,0)$.",
        fr: "$(2,4)$ est sur la parabole mais sa tangente passe par $(-2,0)$.",
        es: "$(2,4)$ está en la parábola pero su tangente pasa por $(-2,0)$.",
        ja: "$(2,4)$ の接線は $(-2,0)$ を通る。",
        zh: "$(2,4)$ 处切线过 $(-2,0)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Points of contact",
          fr: "Points de contact",
          es: "Puntos de tangencia",
          ja: "接点",
          zh: "切点"
        },
        lines: ["ty=x+2t^2\\ \\ni(-4,0):\\ 2t^2=4,\\ t=\\pm\\sqrt2", "A_1=(4,4\\sqrt2),\\quad B_1=(4,-4\\sqrt2)"],
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
          en: "Orthocentre",
          fr: "Orthocentre",
          es: "Ortocentro",
          ja: "垂心",
          zh: "垂心"
        },
        lines: ["\\overrightarrow{C_1B_1}=(8,-4\\sqrt2):\\quad8(x-4)-4\\sqrt2(y-4\\sqrt2)=0\\ \\xrightarrow{y=0}\\ x=0"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "By symmetry the orthocentre is on the axis, so one altitude is enough.",
          fr: "Par symétrie l’orthocentre est sur l’axe : une hauteur suffit.",
          es: "Por simetría el ortocentro está en el eje: basta una altura.",
          ja: "対称性から垂心は軸上なので垂線1本で十分。",
          zh: "由对称性垂心在轴上，一条高线即可。"
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
