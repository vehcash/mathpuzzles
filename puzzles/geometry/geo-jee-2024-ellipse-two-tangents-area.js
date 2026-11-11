/* geometry · Two tangents to an ellipse from S
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-ellipse-two-tangents-area",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.4",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.4",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.4",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Two tangents to an ellipse from S",
      fr: "Deux tangentes à une ellipse depuis S",
      es: "Dos tangentes a una elipse desde S",
      ja: "S から楕円への2本の接線",
      zh: "从 S 向椭圆作两条切线"
    },
    statement: {
      en: "For $\\dfrac{x^2}9+\\dfrac{y^2}4=1$, $S(p,q)$ is a first-quadrant point outside the ellipse. One tangent from $S$ touches at an end of the minor axis, the other at a point $T$ in the fourth quadrant. $R$ is the vertex with positive $x$, $O$ the centre, and $\\triangle ORT$ has area $\\tfrac32$. <b>Which of the following are true?</b>",
      fr: "Pour $\\dfrac{x^2}9+\\dfrac{y^2}4=1$, $S(p,q)$ est un point du premier quadrant extérieur à l’ellipse. Une tangente issue de $S$ touche en une extrémité du petit axe, l’autre en un point $T$ du quatrième quadrant. $R$ est le sommet d’abscisse positive, $O$ le centre, et l’aire de $ORT$ vaut $\\tfrac32$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $\\dfrac{x^2}9+\\dfrac{y^2}4=1$, $S(p,q)$ es un punto del primer cuadrante exterior a la elipse. Una tangente desde $S$ toca en un extremo del eje menor y la otra en un punto $T$ del cuarto cuadrante. $R$ es el vértice de abscisa positiva, $O$ el centro, y el área de $ORT$ es $\\tfrac32$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "楕円 $\\dfrac{x^2}9+\\dfrac{y^2}4=1$ の外部にある第1象限の点 $S(p,q)$ から2本の接線を引き、一方は短軸の端点で、他方は第4象限の点 $T$ で接します。$x$ 座標が正の頂点を $R$、中心を $O$ とし、$\\triangle ORT$ の面積は $\\tfrac32$ です。<b>次のうち正しいものはどれですか？</b>",
      zh: "椭圆 $\\dfrac{x^2}9+\\dfrac{y^2}4=1$ 外第一象限一点 $S(p,q)$ 作两条切线，一条切于短轴端点，另一条切于第四象限的点 $T$。$R$ 为横坐标为正的顶点，$O$ 为中心，$\\triangle ORT$ 面积为 $\\tfrac32$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The ellipse with semi-axes 3 and 2, its centre O and right vertex R(3, 0).",
      fr: "L’ellipse de demi-axes 3 et 2, son centre O et son sommet droit R(3, 0).",
      es: "La elipse de semiejes 3 y 2, su centro O y su vértice derecho R(3, 0).",
      ja: "半軸 3, 2 の楕円、中心 O、右の頂点 R(3, 0)。",
      zh: "半轴为 3、2 的椭圆，中心 O，右顶点 R(3, 0)。"
    },
    hint: {
      en: "The tangent at $(0,2)$ is $y=2$. The area fixes $|y_T|$ because the base $OR=3$ lies on the axis.",
      fr: "La tangente en $(0,2)$ est $y=2$. L’aire fixe $|y_T|$ car la base $OR=3$ est sur l’axe.",
      es: "La tangente en $(0,2)$ es $y=2$. El área fija $|y_T|$ porque la base $OR=3$ está en el eje.",
      ja: "$(0,2)$ での接線は $y=2$。底辺 $OR=3$ が軸上なので面積から $|y_T|$ が決まる。",
      zh: "$(0,2)$ 处切线为 $y=2$。底边 $OR=3$ 在轴上，面积确定 $|y_T|$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 9.6, h: 5.4, scale: 34, pad: 16 });
      const T = F.T = axes(F, -3.6, 6.0, -2.6, 2.8);
      const p = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; p.push(T([3 * Math.cos(t), 2 * Math.sin(t)])); } F.path(p, 'graph', 'base', true);
      F.dot(T([0, 0])); F.dot(T([3, 0])); F.text(T([0, 0]), 'O', 'pt', -10, 12); F.text(T([3, 0]), 'R', 'pt', 10, 12);
      F.reveal = () => {
      const Tp = [3 * Math.sqrt(3) / 2, -1], S = [3 * Math.sqrt(3), 2];
      F.seg(T([-1, 2]), T([5.9, 2]), 'hl pink'); F.seg(T([Tp[0] - 0.8, Tp[1] - 0.8 * (2 - Tp[1]) / (S[0] - Tp[0])]), T([5.9, Tp[1] + (5.9 - Tp[0]) * (2 - Tp[1]) / (S[0] - Tp[0])]), 'hl pink');
      F.path([T([0, 0]), T([3, 0]), T(Tp)], 'fill-yellow', 'fills', true);
      F.dot(T(S)); F.text(T(S), 'S', 'pt', 0, -12); F.dot(T(Tp)); F.text(T(Tp), 'T', 'pt', -8, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "tangent at": {"fr": "tangente en", "es": "tangente en", "ja": "での接線", "zh": "处切线"}
    },
    options: [
      { tex: "q=2,\\ p=3\\sqrt3", correct: true, why: {
        en: "$T=\\bigl(\\tfrac{3\\sqrt3}2,-1\\bigr)$, and its tangent meets $y=2$ at $x=3\\sqrt3$.",
        fr: "$T=\\bigl(\\tfrac{3\\sqrt3}2,-1\\bigr)$ et sa tangente coupe $y=2$ en $x=3\\sqrt3$.",
        es: "$T=\\bigl(\\tfrac{3\\sqrt3}2,-1\\bigr)$ y su tangente corta $y=2$ en $x=3\\sqrt3$.",
        ja: "$T=\\bigl(\\tfrac{3\\sqrt3}2,-1\\bigr)$ の接線は $y=2$ と $x=3\\sqrt3$ で交わる。",
        zh: "$T=\\bigl(\\tfrac{3\\sqrt3}2,-1\\bigr)$，其切线与 $y=2$ 交于 $x=3\\sqrt3$。"
      } },
      { tex: "T=\\left(\\tfrac{3\\sqrt3}2,\\,-1\\right)", correct: true, why: {
        en: "$\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32$ and $\\tfrac{x_T^2}9=1-\\tfrac14$.",
        fr: "$\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32$ et $\\tfrac{x_T^2}9=1-\\tfrac14$.",
        es: "$\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32$ y $\\tfrac{x_T^2}9=1-\\tfrac14$.",
        ja: "$\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32$、$\\tfrac{x_T^2}9=1-\\tfrac14$。",
        zh: "$\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32$，$\\tfrac{x_T^2}9=1-\\tfrac14$。"
      } },
      { tex: "q=2,\\ p=4\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=1,\\ p=5\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=1,\\ p=6\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=(\\sqrt3,\\,-1)", correct: false, why: {
        en: "Not on the ellipse: $\\tfrac39+\\tfrac14\\ne1$.",
        fr: "Pas sur l’ellipse : $\\tfrac39+\\tfrac14\\ne1$.",
        es: "No está en la elipse: $\\tfrac39+\\tfrac14\\ne1$.",
        ja: "楕円上にない：$\\tfrac39+\\tfrac14\\ne1$。",
        zh: "不在椭圆上：$\\tfrac39+\\tfrac14\\ne1$。"
      } },
      { tex: "q=-2", correct: false, why: {
        en: "$S$ is in the first quadrant, so the minor-axis end is $(0,2)$.",
        fr: "$S$ est dans le premier quadrant : l’extrémité est $(0,2)$.",
        es: "$S$ está en el primer cuadrante: el extremo es $(0,2)$.",
        ja: "$S$ は第1象限なので端点は $(0,2)$。",
        zh: "$S$ 在第一象限，端点为 $(0,2)$。"
      } },
      { tex: "p=\\tfrac{3\\sqrt3}{2}", correct: false, why: {
        en: "That is $x_T$, not $p$.",
        fr: "C’est $x_T$, pas $p$.",
        es: "Es $x_T$, no $p$.",
        ja: "$x_T$ であって $p$ ではない。",
        zh: "那是 $x_T$，不是 $p$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The first tangent",
          fr: "La première tangente",
          es: "La primera tangente",
          ja: "1本目の接線",
          zh: "第一条切线"
        },
        lines: ["\\text{tangent at}\\ (0,2):\\ y=2\\ \\Rightarrow\\ q=2"],
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
          en: "Locate T",
          fr: "Placer T",
          es: "Situar T",
          ja: "T の位置",
          zh: "确定 T"
        },
        lines: ["\\tfrac12\\cdot3\\cdot|y_T|=\\tfrac32\\Rightarrow y_T=-1,\\quad x_T=\\tfrac{3\\sqrt3}2"],
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
          en: "Second tangent meets y = 2",
          fr: "La seconde tangente coupe y = 2",
          es: "La segunda tangente corta y = 2",
          ja: "2本目の接線と y = 2",
          zh: "第二条切线与 y = 2 相交"
        },
        lines: ["\\frac{x\\cdot\\frac{3\\sqrt3}2}{9}-\\frac y4=1\\ \\xrightarrow{y=2}\\ \\frac{\\sqrt3}{6}x=\\frac32,\\ x=3\\sqrt3=p"],
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
