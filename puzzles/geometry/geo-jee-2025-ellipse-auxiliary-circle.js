/* geometry · An ellipse and its auxiliary circle
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2025-ellipse-auxiliary-circle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.7",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.7",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.7",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "An ellipse and its auxiliary circle",
      fr: "Une ellipse et son cercle principal",
      es: "Una elipse y su circunferencia principal",
      ja: "楕円と補助円",
      zh: "椭圆与辅助圆"
    },
    statement: {
      en: "$P(x_1,y_1)$ and $Q(x_2,y_2)$ lie on $\\tfrac{x^2}9+\\tfrac{y^2}4=1$ with $y_1,y_2>0$. Let $C:x^2+y^2=9$ and $M=(3,0)$. The vertical lines $x=x_1$, $x=x_2$ meet $C$ at $R$, $S$ (with positive $y$), where $\\angle ROM=\\tfrac\\pi6$ and $\\angle SOM=\\tfrac\\pi3$. Let $N_1=(x_1,0)$, $N_2=(x_2,0)$. <b>Which of the following are true?</b>",
      fr: "$P(x_1,y_1)$ et $Q(x_2,y_2)$ sont sur $\\tfrac{x^2}9+\\tfrac{y^2}4=1$ avec $y_1,y_2>0$. Soit $C:x^2+y^2=9$ et $M=(3,0)$. Les droites $x=x_1$, $x=x_2$ coupent $C$ en $R$, $S$ (d’ordonnée positive), avec $\\angle ROM=\\tfrac\\pi6$ et $\\angle SOM=\\tfrac\\pi3$. Soit $N_1=(x_1,0)$, $N_2=(x_2,0)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P(x_1,y_1)$ y $Q(x_2,y_2)$ están en $\\tfrac{x^2}9+\\tfrac{y^2}4=1$ con $y_1,y_2>0$. Sea $C:x^2+y^2=9$ y $M=(3,0)$. Las rectas $x=x_1$, $x=x_2$ cortan a $C$ en $R$, $S$ (con $y$ positiva), con $\\angle ROM=\\tfrac\\pi6$ y $\\angle SOM=\\tfrac\\pi3$. Sean $N_1=(x_1,0)$, $N_2=(x_2,0)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P(x_1,y_1)$、$Q(x_2,y_2)$ は $\\tfrac{x^2}9+\\tfrac{y^2}4=1$ 上（$y_1,y_2>0$）。$C:x^2+y^2=9$、$M=(3,0)$ とし、直線 $x=x_1$、$x=x_2$ と $C$ の交点（$y>0$）を $R$、$S$ とすると $\\angle ROM=\\tfrac\\pi6$、$\\angle SOM=\\tfrac\\pi3$。$N_1=(x_1,0)$、$N_2=(x_2,0)$。<b>次のうち正しいものはどれですか？</b>",
      zh: "$P(x_1,y_1)$、$Q(x_2,y_2)$ 在 $\\tfrac{x^2}9+\\tfrac{y^2}4=1$ 上，$y_1,y_2>0$。设 $C:x^2+y^2=9$，$M=(3,0)$。直线 $x=x_1$、$x=x_2$ 与 $C$ 交于 $R$、$S$（纵坐标为正），$\\angle ROM=\\tfrac\\pi6$，$\\angle SOM=\\tfrac\\pi3$。$N_1=(x_1,0)$，$N_2=(x_2,0)$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The ellipse inside the circle of radius 3; vertical lines through P and Q reach R and S on the circle.",
      fr: "L’ellipse dans le cercle de rayon 3 ; des verticales par P et Q atteignent R et S sur le cercle.",
      es: "La elipse dentro de la circunferencia de radio 3; verticales por P y Q llegan a R y S en la circunferencia.",
      ja: "半径 3 の円の中の楕円。P, Q を通る縦線が円上の R, S に届く。",
      zh: "半径 3 的圆内有椭圆；过 P、Q 的竖线交圆于 R、S。"
    },
    hint: {
      en: "$R=(3\\cos\\tfrac\\pi6,3\\sin\\tfrac\\pi6)$, and the ellipse point below it has $y=2\\sin\\tfrac\\pi6$: vertical heights shrink by $\\tfrac23$.",
      fr: "$R=(3\\cos\\tfrac\\pi6,3\\sin\\tfrac\\pi6)$ ; le point de l’ellipse en dessous a $y=2\\sin\\tfrac\\pi6$ : les hauteurs sont multipliées par $\\tfrac23$.",
      es: "$R=(3\\cos\\tfrac\\pi6,3\\sin\\tfrac\\pi6)$; el punto de la elipse debajo tiene $y=2\\sin\\tfrac\\pi6$: las alturas se multiplican por $\\tfrac23$.",
      ja: "$R=(3\\cos\\tfrac\\pi6,3\\sin\\tfrac\\pi6)$。真下の楕円上の点は $y=2\\sin\\tfrac\\pi6$。高さは $\\tfrac23$ 倍。",
      zh: "$R=(3\\cos\\tfrac\\pi6,3\\sin\\tfrac\\pi6)$，其下方椭圆点 $y=2\\sin\\tfrac\\pi6$，高度缩为 $\\tfrac23$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 3.8, scale: 48, pad: 16 });
      const T = F.T = axes(F, -3.5, 3.5, -0.4, 3.4);
      const cp = [], ep = []; for (let k = 0; k <= 60; k++) { const t = k * Math.PI / 60; cp.push(T([3 * Math.cos(t), 3 * Math.sin(t)])); ep.push(T([3 * Math.cos(t), 2 * Math.sin(t)])); }
      F.path(cp, 'conic', 'base', false); F.path(ep, 'graph', 'base', false);
      [[Math.PI / 6, 'P', 'R'], [Math.PI / 3, 'Q', 'S']].forEach(([t, a, b]) => { const x = 3 * Math.cos(t); F.seg(T([x, 0]), T([x, 3 * Math.sin(t)]), 'seg thin dashc'); F.seg(T([0, 0]), T([x, 3 * Math.sin(t)]), 'seg thin'); F.dot(T([x, 2 * Math.sin(t)])); F.dot(T([x, 3 * Math.sin(t)])); F.text(T([x, 2 * Math.sin(t)]), a, 'pt', -12, 14); F.text(T([x, 3 * Math.sin(t)]), b, 'pt', 8, -8); });
      F.text(T([3, 0]), 'M', 'pt', 8, -10); F.text(T([0, 0]), 'O', 'pt', -10, 14);
      F.reveal = () => {
      F.seg(T([3 * Math.cos(Math.PI / 6), 1]), T([1.5, Math.sqrt(3)]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "P": {"fr": "P", "es": "P", "ja": "P", "zh": "P"},
      "Q": {"fr": "Q", "es": "Q", "ja": "Q", "zh": "Q"},
      "R": {"fr": "R", "es": "R", "ja": "R", "zh": "R"},
      "S": {"fr": "S", "es": "S", "ja": "S", "zh": "S"},
      "M": {"fr": "M", "es": "M", "ja": "M", "zh": "M"},
      "O": {"fr": "O", "es": "O", "ja": "O", "zh": "O"}
    },
    options: [
      { tex: "PQ:\\ 2x+3y=3(1+\\sqrt3)", correct: true, why: {
        en: "$P=(\\tfrac{3\\sqrt3}2,1)$, $Q=(\\tfrac32,\\sqrt3)$: slope $-\\tfrac23$ and both satisfy it.",
        fr: "$P=(\\tfrac{3\\sqrt3}2,1)$, $Q=(\\tfrac32,\\sqrt3)$ : pente $-\\tfrac23$, les deux vérifient.",
        es: "$P=(\\tfrac{3\\sqrt3}2,1)$, $Q=(\\tfrac32,\\sqrt3)$: pendiente $-\\tfrac23$ y ambos la cumplen.",
        ja: "$P=(\\tfrac{3\\sqrt3}2,1)$、$Q=(\\tfrac32,\\sqrt3)$。傾き $-\\tfrac23$ で両方満たす。",
        zh: "$P=(\\tfrac{3\\sqrt3}2,1)$，$Q=(\\tfrac32,\\sqrt3)$，斜率 $-\\tfrac23$，均满足。"
      } },
      { tex: "3|N_2Q|=2|N_2S|", correct: true, why: {
        en: "$|N_2Q|=\\sqrt3$, $|N_2S|=\\tfrac{3\\sqrt3}2$: both sides are $3\\sqrt3$.",
        fr: "$|N_2Q|=\\sqrt3$, $|N_2S|=\\tfrac{3\\sqrt3}2$ : les deux valent $3\\sqrt3$.",
        es: "$|N_2Q|=\\sqrt3$, $|N_2S|=\\tfrac{3\\sqrt3}2$: ambos lados valen $3\\sqrt3$.",
        ja: "$|N_2Q|=\\sqrt3$、$|N_2S|=\\tfrac{3\\sqrt3}2$。両辺 $3\\sqrt3$。",
        zh: "$|N_2Q|=\\sqrt3$，$|N_2S|=\\tfrac{3\\sqrt3}2$，两边都是 $3\\sqrt3$。"
      } },
      { tex: "PQ:\\ 2x+y=3(1+\\sqrt3)", correct: false, why: {
        en: "$P$ gives $3\\sqrt3+1\\ne3+3\\sqrt3$.",
        fr: "$P$ donne $3\\sqrt3+1\\ne3+3\\sqrt3$.",
        es: "$P$ da $3\\sqrt3+1\\ne3+3\\sqrt3$.",
        ja: "$P$ で $3\\sqrt3+1\\ne3+3\\sqrt3$。",
        zh: "代入 $P$：$3\\sqrt3+1\\ne3+3\\sqrt3$。"
      } },
      { tex: "9|N_1P|=4|N_1R|", correct: false, why: {
        en: "$9\\cdot1\\ne4\\cdot\\tfrac32$; the true ratio is $3|N_1P|=2|N_1R|$.",
        fr: "$9\\cdot1\\ne4\\cdot\\tfrac32$ ; le bon rapport est $3|N_1P|=2|N_1R|$.",
        es: "$9\\cdot1\\ne4\\cdot\\tfrac32$; la razón correcta es $3|N_1P|=2|N_1R|$.",
        ja: "$9\\cdot1\\ne4\\cdot\\tfrac32$。正しくは $3|N_1P|=2|N_1R|$。",
        zh: "$9\\cdot1\\ne4\\cdot\\tfrac32$，正确的是 $3|N_1P|=2|N_1R|$。"
      } },
      { tex: "\\angle POM=\\tfrac\\pi6", correct: false, why: {
        en: "$\\tan\\angle POM=\\tfrac{1}{3\\sqrt3/2}=\\tfrac{2}{3\\sqrt3}\\ne\\tfrac1{\\sqrt3}$.",
        fr: "$\\tan\\angle POM=\\tfrac{2}{3\\sqrt3}\\ne\\tfrac1{\\sqrt3}$.",
        es: "$\\tan\\angle POM=\\tfrac{2}{3\\sqrt3}\\ne\\tfrac1{\\sqrt3}$.",
        ja: "$\\tan\\angle POM=\\tfrac{2}{3\\sqrt3}\\ne\\tfrac1{\\sqrt3}$。",
        zh: "$\\tan\\angle POM=\\tfrac{2}{3\\sqrt3}\\ne\\tfrac1{\\sqrt3}$。"
      } },
      { tex: "|PQ|=|RS|", correct: false, why: {
        en: "$|RS|=6\\sin\\tfrac\\pi{12}\\approx1.55$ while $|PQ|\\approx1.32$.",
        fr: "$|RS|=6\\sin\\tfrac\\pi{12}\\approx1{,}55$ alors que $|PQ|\\approx1{,}32$.",
        es: "$|RS|=6\\sin\\tfrac\\pi{12}\\approx1{,}55$ mientras $|PQ|\\approx1{,}32$.",
        ja: "$|RS|=6\\sin\\tfrac\\pi{12}\\approx1.55$、$|PQ|\\approx1.32$。",
        zh: "$|RS|=6\\sin\\tfrac\\pi{12}\\approx1.55$，而 $|PQ|\\approx1.32$。"
      } },
      { tex: "y_2=\\tfrac{3\\sqrt3}2", correct: false, why: {
        en: "That is the height of $S$; $Q$ is at $\\sqrt3$.",
        fr: "C’est la hauteur de $S$ ; $Q$ est à $\\sqrt3$.",
        es: "Es la altura de $S$; $Q$ está a $\\sqrt3$.",
        ja: "$S$ の高さ。$Q$ は $\\sqrt3$。",
        zh: "那是 $S$ 的高度，$Q$ 在 $\\sqrt3$。"
      } },
      { tex: "x_1=\\tfrac32", correct: false, why: {
        en: "$x_1=3\\cos\\tfrac\\pi6=\\tfrac{3\\sqrt3}2$.",
        fr: "$x_1=3\\cos\\tfrac\\pi6=\\tfrac{3\\sqrt3}2$.",
        es: "$x_1=3\\cos\\tfrac\\pi6=\\tfrac{3\\sqrt3}2$.",
        ja: "$x_1=\\tfrac{3\\sqrt3}2$。",
        zh: "$x_1=\\tfrac{3\\sqrt3}2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Eccentric angles",
          fr: "Angles excentriques",
          es: "Ángulos excéntricos",
          ja: "離心角",
          zh: "离心角"
        },
        lines: ["P=\\left(\\tfrac{3\\sqrt3}2,1\\right),\\quad Q=\\left(\\tfrac32,\\sqrt3\\right)"],
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
          en: "Line and ratios",
          fr: "Droite et rapports",
          es: "Recta y razones",
          ja: "直線と比",
          zh: "直线与比"
        },
        lines: ["m=\\frac{\\sqrt3-1}{\\frac32-\\frac{3\\sqrt3}2}=-\\tfrac23,\\quad 2x+3y=3+3\\sqrt3", "\\frac{|N_iP|}{|N_iR|}=\\frac{b}{a}=\\frac23"],
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
