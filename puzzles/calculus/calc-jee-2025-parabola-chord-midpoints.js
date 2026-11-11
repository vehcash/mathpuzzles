/* calculus · Midpoints of chords that cut off the same area
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2025-parabola-chord-midpoints",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.6",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.6",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.6",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Midpoints of chords that cut off the same area",
      fr: "Milieux des cordes qui découpent la même aire",
      es: "Puntos medios de cuerdas que cortan la misma área",
      ja: "同じ面積を切り取る弦の中点",
      zh: "截出相同面积的弦的中点"
    },
    statement: {
      en: "$S$ is the locus of the midpoints of the chords of $y^2=x$ that cut off an area of $\\tfrac43$ with the parabola. $R$ is the first-quadrant region bounded by $y^2=x$, the curve $S$ and the lines $x=1$, $x=4$. <b>Which of the following are true?</b>",
      fr: "$S$ est le lieu des milieux des cordes de $y^2=x$ qui découpent avec la parabole une aire de $\\tfrac43$. $R$ est la région du premier quadrant limitée par $y^2=x$, la courbe $S$ et les droites $x=1$, $x=4$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S$ es el lugar geométrico de los puntos medios de las cuerdas de $y^2=x$ que encierran con la parábola un área de $\\tfrac43$. $R$ es la región del primer cuadrante limitada por $y^2=x$, la curva $S$ y las rectas $x=1$, $x=4$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S$ は放物線 $y^2=x$ との間に面積 $\\tfrac43$ を切り取る弦の中点の軌跡です。$R$ は第1象限で $y^2=x$、曲線 $S$、直線 $x=1$、$x=4$ に囲まれた領域です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$S$ 是与抛物线 $y^2=x$ 围成面积 $\\tfrac43$ 的弦的中点轨迹。$R$ 是第一象限内由 $y^2=x$、曲线 $S$ 及直线 $x=1$、$x=4$ 围成的区域。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y² = x with one chord and the cut-off region shaded, and the chord's midpoint marked.",
      fr: "La parabole y² = x avec une corde, la région découpée ombrée et le milieu marqué.",
      es: "La parábola y² = x con una cuerda, la región cortada sombreada y el punto medio marcado.",
      ja: "放物線 y² = x と1本の弦。切り取られた部分に影、中点に印。",
      zh: "抛物线 y² = x 与一条弦，截出部分阴影，标出中点。"
    },
    hint: {
      en: "A chord between heights $y_1<y_2$ cuts off area $\\tfrac{(y_2-y_1)^3}{6}$. So $y_2-y_1=2$.",
      fr: "Une corde entre les hauteurs $y_1<y_2$ découpe l’aire $\\tfrac{(y_2-y_1)^3}{6}$. Donc $y_2-y_1=2$.",
      es: "Una cuerda entre alturas $y_1<y_2$ corta un área $\\tfrac{(y_2-y_1)^3}{6}$. Así $y_2-y_1=2$.",
      ja: "高さ $y_1<y_2$ を結ぶ弦が切り取る面積は $\\tfrac{(y_2-y_1)^3}{6}$。よって $y_2-y_1=2$。",
      zh: "高度 $y_1<y_2$ 之间的弦截出面积 $\\tfrac{(y_2-y_1)^3}{6}$，故 $y_2-y_1=2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.5, h: 4.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.5, 5.0, -2.3, 2.3);
      const p = []; for (let k = -21; k <= 21; k++) { const y = k / 10; p.push(T([y * y, y])); } F.path(p, 'graph', 'base', false);
      const a = -0.2, b = 1.8, reg = [T([a * a, a])]; for (let k = 0; k <= 20; k++) { const y = a + (b - a) * k / 20; reg.push(T([y * y, y])); }
      F.path(reg, 'fill-blue', 'fills', true); F.seg(T([a * a, a]), T([b * b, b]), 'seg');
      F.dot(T([(a * a + b * b) / 2, (a + b) / 2])); F.text(T([(a * a + b * b) / 2, (a + b) / 2]), '(h, k)', 'pt', 70, 0);
      F.reveal = () => {
      const s = []; for (let k = -15; k <= 15; k++) { const y = k / 10; s.push(T([y * y + 1, y])); } F.path(s, 'hl pink', 'base', false); F.text(T([3.25, 1.5]), 'x = y² + 1', 'len small', 30, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(h, k)": {"fr": "(h, k)", "es": "(h, k)", "ja": "(h, k)", "zh": "(h, k)"},
      "x = y² + 1": {"fr": "x = y² + 1", "es": "x = y² + 1", "ja": "x = y² + 1", "zh": "x = y² + 1"},
      "is the parabola": {"fr": "est la parabole", "es": "es la parábola", "ja": "は次の放物線", "zh": "是抛物线"},
      "every such chord has length": {"fr": "toutes ces cordes ont pour longueur", "es": "todas esas cuerdas miden", "ja": "そのような弦の長さはすべて", "zh": "每条这样的弦长为"}
    },
    options: [
      { tex: "(4,\\sqrt3)\\in S", correct: true, why: {
        en: "$S:\\ x=y^2+1$, and $3+1=4$.",
        fr: "$S:\\ x=y^2+1$, et $3+1=4$.",
        es: "$S:\\ x=y^2+1$, y $3+1=4$.",
        ja: "$S:\\ x=y^2+1$、$3+1=4$。",
        zh: "$S:\\ x=y^2+1$，$3+1=4$。"
      } },
      { tex: "\\operatorname{area}(R)=\\tfrac{14}3-2\\sqrt3", correct: true, why: {
        en: "$\\int_1^4(\\sqrt x-\\sqrt{x-1})\\,dx=\\tfrac{14}3-2\\sqrt3$.",
        fr: "$\\int_1^4(\\sqrt x-\\sqrt{x-1})\\,dx=\\tfrac{14}3-2\\sqrt3$.",
        es: "$\\int_1^4(\\sqrt x-\\sqrt{x-1})\\,dx=\\tfrac{14}3-2\\sqrt3$.",
        ja: "$\\int_1^4(\\sqrt x-\\sqrt{x-1})\\,dx=\\tfrac{14}3-2\\sqrt3$。",
        zh: "$\\int_1^4(\\sqrt x-\\sqrt{x-1})\\,dx=\\tfrac{14}3-2\\sqrt3$。"
      } },
      { tex: "(\\sqrt5,2)\\in S", correct: false, why: {
        en: "$4+1=5\\ne\\sqrt5$.",
        fr: "$4+1=5\\ne\\sqrt5$.",
        es: "$4+1=5\\ne\\sqrt5$.",
        ja: "$4+1=5\\ne\\sqrt5$。",
        zh: "$4+1=5\\ne\\sqrt5$。"
      } },
      { tex: "(2,2)\\in S", correct: false, why: {
        en: "$4+1=5\\ne2$.",
        fr: "$4+1=5\\ne2$.",
        es: "$4+1=5\\ne2$.",
        ja: "$4+1=5\\ne2$。",
        zh: "$4+1=5\\ne2$。"
      } },
      { tex: "\\operatorname{area}(R)=\\tfrac{14}3", correct: false, why: {
        en: "That is only the area under $\\sqrt x$.",
        fr: "Seulement l’aire sous $\\sqrt x$.",
        es: "Solo el área bajo $\\sqrt x$.",
        ja: "$\\sqrt x$ の下の面積だけ。",
        zh: "只是 $\\sqrt x$ 下的面积。"
      } },
      { tex: "\\operatorname{area}(R)=\\tfrac{14}3-\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\ \\text{is the parabola}\\ y^2=x-\\tfrac43", correct: false, why: {
        en: "The shift is $1$, not the area $\\tfrac43$.",
        fr: "Le décalage est $1$, pas l’aire $\\tfrac43$.",
        es: "El desplazamiento es $1$, no el área $\\tfrac43$.",
        ja: "ずれは $1$ で面積 $\\tfrac43$ ではない。",
        zh: "平移量是 $1$，不是面积 $\\tfrac43$。"
      } },
      { tex: "\\text{every such chord has length}\\ 2", correct: false, why: {
        en: "The heights differ by $2$, but the chord also runs sideways.",
        fr: "Les hauteurs diffèrent de $2$, mais la corde s’étend aussi en largeur.",
        es: "Las alturas difieren en $2$, pero la cuerda también avanza en horizontal.",
        ja: "高さの差は $2$ だが横方向にも伸びる。",
        zh: "高度差为 $2$，但弦还有横向长度。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Chord condition",
          fr: "Condition sur la corde",
          es: "Condición de la cuerda",
          ja: "弦の条件",
          zh: "弦的条件"
        },
        lines: ["\\tfrac{(y_2-y_1)^3}{6}=\\tfrac43\\Rightarrow y_{1,2}=k\\mp1"],
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
          en: "Midpoint",
          fr: "Milieu",
          es: "Punto medio",
          ja: "中点",
          zh: "中点"
        },
        lines: ["h=\\frac{(k-1)^2+(k+1)^2}{2}=k^2+1\\ \\Rightarrow\\ S:\\ x=y^2+1"],
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
          en: "Area of R",
          fr: "Aire de R",
          es: "Área de R",
          ja: "R の面積",
          zh: "R 的面积"
        },
        lines: ["\\int_1^4\\sqrt x\\,dx-\\int_1^4\\sqrt{x-1}\\,dx=\\tfrac{14}3-\\tfrac23\\cdot3\\sqrt3=\\boxed{\\tfrac{14}3-2\\sqrt3}"],
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
