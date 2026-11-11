/* calculus · A region cut by two parabolas and a line
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-region-under-three-curves",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.2",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.2",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.2",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.2",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.2"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A region cut by two parabolas and a line",
      fr: "Une région coupée par deux paraboles et une droite",
      es: "Una región cortada por dos parábolas y una recta",
      ja: "2つの放物線と直線で切られた領域",
      zh: "两条抛物线与一条直线围成的区域"
    },
    statement: {
      en: "$S=\\{(x,y): x\\ge0,\\ y\\ge0,\\ y^2\\le4x,\\ y^2\\le12-2x,\\ 3y+\\sqrt8\\,x\\le5\\sqrt8\\}$. The area of $S$ is $\\alpha\\sqrt2$. <b>Which of the following equal $\\alpha$?</b>",
      fr: "$S=\\{(x,y): x\\ge0,\\ y\\ge0,\\ y^2\\le4x,\\ y^2\\le12-2x,\\ 3y+\\sqrt8\\,x\\le5\\sqrt8\\}$. L’aire de $S$ vaut $\\alpha\\sqrt2$. <b>Lesquelles des valeurs suivantes sont égales à $\\alpha$ ?</b>",
      es: "$S=\\{(x,y): x\\ge0,\\ y\\ge0,\\ y^2\\le4x,\\ y^2\\le12-2x,\\ 3y+\\sqrt8\\,x\\le5\\sqrt8\\}$. El área de $S$ es $\\alpha\\sqrt2$. <b>¿Cuáles de los siguientes valores son iguales a $\\alpha$?</b>",
      ja: "$S=\\{(x,y): x\\ge0,\\ y\\ge0,\\ y^2\\le4x,\\ y^2\\le12-2x,\\ 3y+\\sqrt8\\,x\\le5\\sqrt8\\}$ の面積は $\\alpha\\sqrt2$ です。<b>$\\alpha$ に等しいものはどれですか？</b>",
      zh: "$S=\\{(x,y): x\\ge0,\\ y\\ge0,\\ y^2\\le4x,\\ y^2\\le12-2x,\\ 3y+\\sqrt8\\,x\\le5\\sqrt8\\}$ 的面积为 $\\alpha\\sqrt2$。<b>下列哪些等于 $\\alpha$？</b>"
    },
    figureText: {
      en: "The parabolas y² = 4x and y² = 12 − 2x meeting at (2, 2√2), and the line 3y + √8 x = 5√8.",
      fr: "Les paraboles y² = 4x et y² = 12 − 2x qui se coupent en (2, 2√2), et la droite 3y + √8 x = 5√8.",
      es: "Las parábolas y² = 4x e y² = 12 − 2x que se cortan en (2, 2√2), y la recta 3y + √8 x = 5√8.",
      ja: "(2, 2√2) で交わる放物線 y² = 4x と y² = 12 − 2x、直線 3y + √8 x = 5√8。",
      zh: "交于 (2, 2√2) 的抛物线 y² = 4x、y² = 12 − 2x 与直线 3y + √8 x = 5√8。"
    },
    hint: {
      en: "Integrate in $y$: the left edge is $x=\\tfrac{y^2}4$. Find where the line cuts the second parabola.",
      fr: "Intégrez en $y$ : le bord gauche est $x=\\tfrac{y^2}4$. Où la droite coupe-t-elle la seconde parabole ?",
      es: "Integra en $y$: el borde izquierdo es $x=\\tfrac{y^2}4$. ¿Dónde corta la recta a la segunda parábola?",
      ja: "$y$ で積分。左端は $x=\\tfrac{y^2}4$。直線と2つ目の放物線の交点は？",
      zh: "对 $y$ 积分：左边界 $x=\\tfrac{y^2}4$。直线与第二条抛物线交于何处？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.2, h: 4.2, scale: 46, pad: 16 });
      const T = F.T = axes(F, -0.4, 6.8, -0.4, 3.8);
      const r8 = Math.sqrt(8), pts = (g, y0, y1) => { const p = []; for (let k = 0; k <= 50; k++) { const y = y0 + (y1 - y0) * k / 50; p.push(T([g(y), y])); } return p; };
      F.path(pts(y => y * y / 4, 0, 3.6), 'graph', 'base', false); F.path(pts(y => (12 - y * y) / 2, 0, 3.4), 'hl blue', 'base', false);
      F.seg(T([5, 0]), T([5 - 3.7 * 3 / r8, 3.7]), 'seg');
      F.dot(T([2, r8])); F.text(T([2, r8]), '(2, 2√2)', 'len small', 46, -14);
      F.reveal = () => {
      const q = []; const N = 60; for (let k = 0; k <= N; k++) { const y = r8 * k / N; q.push(T([Math.min((12 - y * y) / 2, (5 * r8 - 3 * y) / r8), y])); } for (let k = N; k >= 0; k--) { const y = r8 * k / N; q.push(T([y * y / 4, y])); }
      F.path(q, 'fill-yellow', 'fills', true);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and the line hits": {"fr": "et la droite coupe", "es": "y la recta corta", "ja": "直線は次と交わる：", "zh": "直线与"},
      "at": {"fr": "en", "es": "en", "ja": "で", "zh": "交于"}
    },
    options: [
      { tex: "\\tfrac{17}{3}", correct: true, why: {
        en: "Area $=\\tfrac{17\\sqrt2}{3}$.",
        fr: "Aire $=\\tfrac{17\\sqrt2}{3}$.",
        es: "Área $=\\tfrac{17\\sqrt2}{3}$.",
        ja: "面積 $=\\tfrac{17\\sqrt2}{3}$。",
        zh: "面积 $=\\tfrac{17\\sqrt2}{3}$。"
      } },
      { tex: "5\\tfrac23", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{17}{2}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{17}{4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{17}{5}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{16}{3}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "6", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{19}{3}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The corners",
          fr: "Les coins",
          es: "Las esquinas",
          ja: "頂点",
          zh: "交点"
        },
        lines: ["y^2=4x=12-2x:\\ (2,2\\sqrt2);\\qquad 12-2x=y^2,\\ 3y=\\sqrt8(5-x):\\ (4,2),\\ \\text{and the line hits}\\ y=0\\ \\text{at}\\ x=5"],
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
          en: "Integrate in y",
          fr: "Intégrer en y",
          es: "Integrar en y",
          ja: "y で積分",
          zh: "对 y 积分"
        },
        lines: ["\\int_0^{2}\\Bigl(5-\\tfrac{3y}{\\sqrt8}-\\tfrac{y^2}4\\Bigr)dy+\\int_2^{2\\sqrt2}\\Bigl(\\tfrac{12-y^2}2-\\tfrac{y^2}4\\Bigr)dy", "=\\boxed{\\tfrac{17\\sqrt2}{3}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Between $y=0$ and $y=2$ the line is the right edge; above $y=2$ the second parabola is.",
          fr: "Entre $y=0$ et $y=2$ la droite est le bord droit ; au-dessus, c’est la seconde parabole.",
          es: "Entre $y=0$ y $y=2$ la recta es el borde derecho; por encima, la segunda parábola.",
          ja: "$0\\le y\\le2$ では直線、$y\\ge2$ では2つ目の放物線が右端。",
          zh: "$0\\le y\\le2$ 时右边界为直线，$y\\ge2$ 时为第二条抛物线。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
