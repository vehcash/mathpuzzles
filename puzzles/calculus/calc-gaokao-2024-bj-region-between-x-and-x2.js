/* calculus · A region swept by a parameter
   Gaokao 2024, Beijing paper (北京卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-bj-region-between-x-and-x2",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 10",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 10",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 10",
        ja: "2024年 中国・高考 北京卷 第10問",
        zh: "2024年高考数学北京卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A region swept by a parameter",
      fr: "Une région balayée par un paramètre",
      es: "Una región barrida por un parámetro",
      ja: "パラメータが描く領域",
      zh: "参数扫出的区域"
    },
    statement: {
      en: "$M=\\{(x,y)\\mid y=x+t(x^2-x),\\ 1\\le x\\le2,\\ 0\\le t\\le1\\}$. Let $d$ be the largest distance between two points of $M$ and $S$ the area of $M$. <b>Which of the following are true?</b>",
      fr: "$M=\\{(x,y)\\mid y=x+t(x^2-x),\\ 1\\le x\\le2,\\ 0\\le t\\le1\\}$. Soit $d$ la plus grande distance entre deux points de $M$ et $S$ l’aire de $M$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$M=\\{(x,y)\\mid y=x+t(x^2-x),\\ 1\\le x\\le2,\\ 0\\le t\\le1\\}$. Sea $d$ la mayor distancia entre dos puntos de $M$ y $S$ el área de $M$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$M=\\{(x,y)\\mid y=x+t(x^2-x),\\ 1\\le x\\le2,\\ 0\\le t\\le1\\}$ とし、$M$ の2点間の距離の最大値を $d$、$M$ の面積を $S$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "已知 $M=\\{(x,y)\\mid y=x+t(x^2-x),\\ 1\\le x\\le2,\\ 0\\le t\\le1\\}$，$M$ 中两点间距离的最大值为 $d$，$M$ 表示的图形面积为 $S$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes with the vertical strip 1 ≤ x ≤ 2 marked.",
      fr: "Des axes avec la bande verticale 1 ≤ x ≤ 2.",
      es: "Ejes con la franja vertical 1 ≤ x ≤ 2.",
      ja: "縦の帯 1 ≤ x ≤ 2 を示した座標軸。",
      zh: "坐标轴，标出竖直带 1 ≤ x ≤ 2。"
    },
    hint: {
      en: "For fixed $x$, $t=0$ gives $y=x$ and $t=1$ gives $y=x^2$. So $M$ is the region between two curves.",
      fr: "À $x$ fixé, $t=0$ donne $y=x$ et $t=1$ donne $y=x^2$ : $M$ est la région entre deux courbes.",
      es: "Con $x$ fijo, $t=0$ da $y=x$ y $t=1$ da $y=x^2$: $M$ es la región entre dos curvas.",
      ja: "$x$ を固定すると $t=0$ で $y=x$、$t=1$ で $y=x^2$。$M$ は2曲線の間。",
      zh: "固定 $x$，$t=0$ 得 $y=x$，$t=1$ 得 $y=x^2$，$M$ 是两曲线之间的区域。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 5.0, scale: 56, pad: 16 });
      const T = F.T = axes(F, -0.6, 3.0, -0.4, 4.6);
      [1, 2].forEach(x => { F.seg(T([x, 0]), T([x, 4.4]), 'seg thin dashc'); F.text(T([x, 0]), String(x), 'tick', 0, 14); });
      F.reveal = () => {
      const q = []; for (let k = 0; k <= 30; k++) { const x = 1 + k / 30; q.push(T([x, x * x])); } for (let k = 30; k >= 0; k--) { const x = 1 + k / 30; q.push(T([x, x])); }
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, x => x * x, 0, 2.05, 'graph', 'base', -0.4, 4.6); plot(F, T, x => x, 0, 2.7, 'hl blue', 'base', -0.4, 4.6);
      F.seg(T([1, 1]), T([2, 4]), 'hl pink'); F.text(T([1.5, 2.5]), '√10', 'len small', -18, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "so": {"fr": "donc", "es": "así que", "ja": "よって", "zh": "所以"},
      "runs from": {"fr": "va de", "es": "va de", "ja": "は", "zh": "从"},
      "to": {"fr": "à", "es": "a", "ja": "から", "zh": "到"}
    },
    options: [
      { tex: "d=\\sqrt{10}\\ \\text{and}\\ S<1", correct: true, why: {
        en: "Farthest points $(1,1)$ and $(2,4)$; $S=\\int_1^2(x^2-x)\\,dx=\\tfrac56$.",
        fr: "Points les plus éloignés $(1,1)$ et $(2,4)$ ; $S=\\int_1^2(x^2-x)\\,dx=\\tfrac56$.",
        es: "Puntos más alejados $(1,1)$ y $(2,4)$; $S=\\int_1^2(x^2-x)\\,dx=\\tfrac56$.",
        ja: "最も遠い2点は $(1,1)$ と $(2,4)$、$S=\\int_1^2(x^2-x)\\,dx=\\tfrac56$。",
        zh: "最远两点为 $(1,1)$ 与 $(2,4)$；$S=\\int_1^2(x^2-x)\\,dx=\\tfrac56$。"
      } },
      { tex: "S=\\tfrac56", correct: true, why: {
        en: "$\\left[\\tfrac{x^3}3-\\tfrac{x^2}2\\right]_1^2=\\tfrac23+\\tfrac16$.",
        fr: "$\\left[\\tfrac{x^3}3-\\tfrac{x^2}2\\right]_1^2=\\tfrac23+\\tfrac16$.",
        es: "$\\left[\\tfrac{x^3}3-\\tfrac{x^2}2\\right]_1^2=\\tfrac23+\\tfrac16$.",
        ja: "$\\left[\\tfrac{x^3}3-\\tfrac{x^2}2\\right]_1^2=\\tfrac23+\\tfrac16$。",
        zh: "$\\left[\\tfrac{x^3}3-\\tfrac{x^2}2\\right]_1^2=\\tfrac23+\\tfrac16$。"
      } },
      { tex: "d=3\\ \\text{and}\\ S<1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "d=3\\ \\text{and}\\ S>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "d=\\sqrt{10}\\ \\text{and}\\ S>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac16", correct: false, why: {
        en: "That is the area between $y=x$ and $y=x^2$ on $[0,1]$.",
        fr: "C’est l’aire entre $y=x$ et $y=x^2$ sur $[0,1]$.",
        es: "Es el área entre $y=x$ e $y=x^2$ en $[0,1]$.",
        ja: "$[0,1]$ での $y=x$ と $y=x^2$ の間の面積。",
        zh: "那是 $[0,1]$ 上 $y=x$ 与 $y=x^2$ 之间的面积。"
      } },
      { tex: "d=\\sqrt2", correct: false, why: {
        en: "That is only the bottom edge, from $(1,1)$ to $(2,2)$.",
        fr: "C’est seulement le bord inférieur, de $(1,1)$ à $(2,2)$.",
        es: "Es solo el borde inferior, de $(1,1)$ a $(2,2)$.",
        ja: "下側の辺 $(1,1)$–$(2,2)$ だけ。",
        zh: "那只是下边 $(1,1)$ 到 $(2,2)$。"
      } },
      { tex: "S=\\tfrac76", correct: false, why: {
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
          en: "Describe M",
          fr: "Décrire M",
          es: "Describir M",
          ja: "M を描く",
          zh: "刻画 M"
        },
        lines: ["1\\le x\\le2:\\ x^2-x\\ge0,\\ \\text{so}\\ y\\ \\text{runs from}\\ x\\ (t=0)\\ \\text{to}\\ x^2\\ (t=1)"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["S=\\int_1^2(x^2-x)\\,dx=\\tfrac56<1"],
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
          en: "Diameter",
          fr: "Diamètre",
          es: "Diámetro",
          ja: "最大距離",
          zh: "最大距离"
        },
        lines: ["d=|(1,1)(2,4)|=\\sqrt{1+9}=\\boxed{\\sqrt{10}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The farthest pair is the lowest corner $(1,1)$ and the highest corner $(2,4)$.",
          fr: "La paire la plus éloignée : le coin le plus bas $(1,1)$ et le plus haut $(2,4)$.",
          es: "El par más alejado: la esquina más baja $(1,1)$ y la más alta $(2,4)$.",
          ja: "最も遠いのは最も低い角 $(1,1)$ と最も高い角 $(2,4)$。",
          zh: "最远的一对是最低角 $(1,1)$ 与最高角 $(2,4)$。"
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
