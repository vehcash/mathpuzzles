/* geometry · A hyperbola traced by meeting lines
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2025-locus-hyperbola-tangent",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.4",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.4",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.4",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A hyperbola traced by meeting lines",
      fr: "Une hyperbole tracée par des droites qui se coupent",
      es: "Una hipérbola trazada por rectas que se cortan",
      ja: "交わる直線が描く双曲線",
      zh: "直线交点描出的双曲线"
    },
    statement: {
      en: "For $\\alpha\\ne0$, $S$ is the locus of the intersection of $4x-3y=12\\alpha$ and $4\\alpha x+3\\alpha y=12$. A tangent $T$ to $S$ passes through $(p,0)$ and $(0,q)$ with $q>0$, and is parallel to $4\\sqrt2\\,x-3y=0$. <b>Which of the following are true?</b>",
      fr: "Pour $\\alpha\\ne0$, $S$ est le lieu de l’intersection de $4x-3y=12\\alpha$ et $4\\alpha x+3\\alpha y=12$. Une tangente $T$ à $S$ passe par $(p,0)$ et $(0,q)$ avec $q>0$, et est parallèle à $4\\sqrt2\\,x-3y=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $\\alpha\\ne0$, $S$ es el lugar geométrico de la intersección de $4x-3y=12\\alpha$ y $4\\alpha x+3\\alpha y=12$. Una tangente $T$ a $S$ pasa por $(p,0)$ y $(0,q)$ con $q>0$, y es paralela a $4\\sqrt2\\,x-3y=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\alpha\\ne0$ に対し、$4x-3y=12\\alpha$ と $4\\alpha x+3\\alpha y=12$ の交点の軌跡を $S$ とします。$S$ の接線 $T$ は $(p,0)$、$(0,q)$（$q>0$）を通り、$4\\sqrt2\\,x-3y=0$ に平行です。<b>次のうち正しいものはどれですか？</b>",
      zh: "对 $\\alpha\\ne0$，$S$ 为直线 $4x-3y=12\\alpha$ 与 $4\\alpha x+3\\alpha y=12$ 交点的轨迹。$S$ 的切线 $T$ 过 $(p,0)$ 与 $(0,q)$（$q>0$），且平行于 $4\\sqrt2\\,x-3y=0$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Meeting points of the two lines for several values of α, scattered on both sides of the y-axis.",
      fr: "Les points d’intersection des deux droites pour plusieurs α, de part et d’autre de l’axe des ordonnées.",
      es: "Los puntos de corte de las dos rectas para varios α, a ambos lados del eje y.",
      ja: "いくつかの α に対する2直線の交点。y 軸の両側に散らばる。",
      zh: "若干 α 对应的两直线交点，分布在 y 轴两侧。"
    },
    hint: {
      en: "The second line is $4x+3y=\\tfrac{12}\\alpha$. Multiply the two equations to remove $\\alpha$. For $\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1$, $y=mx+c$ is tangent iff $c^2=a^2m^2-b^2$.",
      fr: "La seconde droite est $4x+3y=\\tfrac{12}\\alpha$. Multipliez pour éliminer $\\alpha$. Pour $\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1$, $y=mx+c$ est tangente ssi $c^2=a^2m^2-b^2$.",
      es: "La segunda recta es $4x+3y=\\tfrac{12}\\alpha$. Multiplica para eliminar $\\alpha$. Para $\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1$, $y=mx+c$ es tangente si y solo si $c^2=a^2m^2-b^2$.",
      ja: "2本目は $4x+3y=\\tfrac{12}\\alpha$。掛けて $\\alpha$ を消す。$\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1$ に $y=mx+c$ が接する条件は $c^2=a^2m^2-b^2$。",
      zh: "第二条直线为 $4x+3y=\\tfrac{12}\\alpha$，相乘消去 $\\alpha$。对 $\\tfrac{x^2}{a^2}-\\tfrac{y^2}{b^2}=1$，$y=mx+c$ 相切当且仅当 $c^2=a^2m^2-b^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.0, h: 6.0, scale: 40, pad: 16 });
      const T = F.T = axes(F, -4, 4, -3, 3);
      [0.75, 1, 1.25, 1.5, -0.75, -1, -1.25, -1.5].forEach(a => { const x = (12 * a + 12 / a) / 8, y = (12 / a - 12 * a) / 6; if (Math.abs(x) < 3.9 && Math.abs(y) < 2.9) F.dot(T([x, y])); });
      F.reveal = () => {
      for (const s of [1, -1]) { const p = []; for (let k = -14; k <= 14; k++) { const t = k / 21; p.push(T([s * 3 * Math.cosh(t), 4 * Math.sinh(t)])); } F.path(p, 'graph', 'base', false); }
      const m = 4 * Math.SQRT2 / 3; F.seg(T([-7 / m, -3]), T([-1 / m, 3]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is an ellipse": {"fr": "est une ellipse", "es": "es una elipse", "ja": "は楕円", "zh": "是椭圆"},
      "has asymptotes": {"fr": "a pour asymptotes", "es": "tiene asíntotas", "ja": "の漸近線は", "zh": "的渐近线为"}
    },
    options: [
      { tex: "pq=-6\\sqrt2", correct: true, why: {
        en: "$c=q=4$ and $p=-\\tfrac4m=-\\tfrac{3}{\\sqrt2}$.",
        fr: "$c=q=4$ et $p=-\\tfrac4m=-\\tfrac{3}{\\sqrt2}$.",
        es: "$c=q=4$ y $p=-\\tfrac4m=-\\tfrac{3}{\\sqrt2}$.",
        ja: "$c=q=4$、$p=-\\tfrac4m=-\\tfrac3{\\sqrt2}$。",
        zh: "$c=q=4$，$p=-\\tfrac4m=-\\tfrac3{\\sqrt2}$。"
      } },
      { tex: "S:\\ 16x^2-9y^2=144", correct: true, why: {
        en: "$(4x-3y)(4x+3y)=12\\alpha\\cdot\\tfrac{12}\\alpha=144$.",
        fr: "$(4x-3y)(4x+3y)=144$.",
        es: "$(4x-3y)(4x+3y)=144$.",
        ja: "$(4x-3y)(4x+3y)=144$。",
        zh: "$(4x-3y)(4x+3y)=144$。"
      } },
      { tex: "pq=-3\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "pq=-9\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "pq=-12\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "q=3", correct: false, why: {
        en: "$q^2=9\\cdot\\tfrac{32}9-16=16$, so $q=4$.",
        fr: "$q^2=9\\cdot\\tfrac{32}9-16=16$, donc $q=4$.",
        es: "$q^2=9\\cdot\\tfrac{32}9-16=16$, luego $q=4$.",
        ja: "$q^2=16$ より $q=4$。",
        zh: "$q^2=16$，故 $q=4$。"
      } },
      { tex: "S\\ \\text{is an ellipse}", correct: false, why: {
        en: "The equation has a minus sign: it is a hyperbola.",
        fr: "L’équation a un signe moins : c’est une hyperbole.",
        es: "La ecuación tiene un signo menos: es una hipérbola.",
        ja: "マイナス符号があるので双曲線。",
        zh: "方程含负号，是双曲线。"
      } },
      { tex: "S\\ \\text{has asymptotes}\\ y=\\pm\\tfrac34x", correct: false, why: {
        en: "Asymptotes are $y=\\pm\\tfrac43x$, the two given families.",
        fr: "Les asymptotes sont $y=\\pm\\tfrac43x$.",
        es: "Las asíntotas son $y=\\pm\\tfrac43x$.",
        ja: "漸近線は $y=\\pm\\tfrac43x$。",
        zh: "渐近线为 $y=\\pm\\tfrac43x$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Eliminate α",
          fr: "Éliminer α",
          es: "Eliminar α",
          ja: "α を消す",
          zh: "消去 α"
        },
        lines: ["(4x-3y)(4x+3y)=144\\ \\Rightarrow\\ \\frac{x^2}9-\\frac{y^2}{16}=1"],
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
          en: "Tangent of slope 4√2/3",
          fr: "Tangente de pente 4√2/3",
          es: "Tangente de pendiente 4√2/3",
          ja: "傾き 4√2/3 の接線",
          zh: "斜率 4√2/3 的切线"
        },
        lines: ["c^2=9\\cdot\\tfrac{32}9-16=16,\\ c=q=4,\\quad p=-\\frac{4}{m}=-\\frac{3\\sqrt2}{2}", "pq=\\boxed{-6\\sqrt2}"],
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
