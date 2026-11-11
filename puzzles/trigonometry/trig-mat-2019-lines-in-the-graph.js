/* trigonometry · Straight lines inside a trig graph
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2019-lines-in-the-graph",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1E",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1E",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1E",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1E",
        zh: "牛津大学数学入学考试 MAT 2019 第 1E 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Straight lines inside a trig graph",
      fr: "Des droites dans une courbe trigonométrique",
      es: "Rectas dentro de una gráfica trigonométrica",
      ja: "三角関数のグラフに含まれる直線",
      zh: "三角图像中的直线"
    },
    statement: {
      en: "Consider the set of points $(x,y)$ with $\\sin y-\\sin x=\\cos^2x-\\cos^2y$. <b>Which of the following are true?</b>",
      fr: "On considère l’ensemble des points $(x,y)$ tels que $\\sin y-\\sin x=\\cos^2x-\\cos^2y$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera el conjunto de puntos $(x,y)$ con $\\sin y-\\sin x=\\cos^2x-\\cos^2y$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\sin y-\\sin x=\\cos^2x-\\cos^2y$ を満たす点 $(x,y)$ の集合を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑满足 $\\sin y-\\sin x=\\cos^2x-\\cos^2y$ 的点 $(x,y)$ 的集合。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes for 0 ≤ x, y ≤ 2π with π and 2π marked. The lines of the set are drawn in the solution.",
      fr: "Axes pour 0 ≤ x, y ≤ 2π avec π et 2π marqués. Les droites de l’ensemble sont tracées dans la solution.",
      es: "Ejes para 0 ≤ x, y ≤ 2π con π y 2π marcados. Las rectas del conjunto se dibujan en la solución.",
      ja: "0 ≤ x, y ≤ 2π の座標軸（π, 2π に目盛り）。集合の直線は解答で描きます。",
      zh: "0 ≤ x, y ≤ 2π 的坐标轴，标出 π、2π。集合中的直线在解答中画出。"
    },
    hint: {
      en: "Rewrite the right side with $\\cos^2=1-\\sin^2$ and factor.",
      fr: "Réécrivez le second membre avec $\\cos^2=1-\\sin^2$ et factorisez.",
      es: "Reescribe el lado derecho con $\\cos^2=1-\\sin^2$ y factoriza.",
      ja: "右辺を $\\cos^2=1-\\sin^2$ で書き換えて因数分解。",
      zh: "用 $\\cos^2=1-\\sin^2$ 改写右边再因式分解。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 7.4, scale: 22, pad: 14 });
      const T = F.T = axes(F, -0.4, 7.0, -0.4, 7.0);
      const s = Math.PI, L = 0, H = 6.3;
      [[s, 'π'], [2 * s, '2π']].forEach(([v, t]) => { F.text(T([v, 0]), t, 'tick', -8, 14); F.text(T([0, v]), t, 'tick', -12, 0); });
      F.reveal = () => {
      [-2, 0, 2].forEach(k => { const c = k * s, x0 = Math.max(L, L - c), x1 = Math.min(H, H - c); if (x1 > x0) F.seg(T([x0, x0 + c]), T([x1, x1 + c]), 'seg'); });
      [-1, 1, 3].forEach(k => { const c = k * s, x0 = Math.max(L, c - H), x1 = Math.min(H, c - L); if (x1 > x0) F.seg(T([x0, c - x0]), T([x1, c - x1]), 'seg'); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "infinitely many straight lines lie in the set": {"fr": "une infinité de droites sont contenues dans l’ensemble", "es": "infinitas rectas están contenidas en el conjunto", "ja": "集合は無限に多くの直線を含む", "zh": "集合中含有无穷多条直线"},
      "lies in the set": {"fr": "est contenue dans l’ensemble", "es": "está contenida en el conjunto", "ja": "は集合に含まれる", "zh": "在集合中"},
      "exactly two straight lines lie in the set": {"fr": "exactement deux droites sont contenues dans l’ensemble", "es": "exactamente dos rectas están en el conjunto", "ja": "集合が含む直線はちょうど2本", "zh": "集合中恰有两条直线"},
      "no straight line lies in the set": {"fr": "aucune droite n’est contenue dans l’ensemble", "es": "ninguna recta está en el conjunto", "ja": "集合は直線を含まない", "zh": "集合中没有直线"},
      "the part": {"fr": "la partie", "es": "la parte", "ja": "部分", "zh": "部分"},
      "contains a line": {"fr": "contient une droite", "es": "contiene una recta", "ja": "は直線を含む", "zh": "含有直线"},
      "exactly four straight lines lie in the set": {"fr": "exactement quatre droites sont contenues dans l’ensemble", "es": "exactamente cuatro rectas están en el conjunto", "ja": "集合が含む直線はちょうど4本", "zh": "集合中恰有四条直线"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "\\text{infinitely many straight lines lie in the set}", correct: true, why: {
        en: "All lines $y=x+2k\\pi$ and $y=\\pi-x+2k\\pi$.",
        fr: "Toutes les droites $y=x+2k\\pi$ et $y=\\pi-x+2k\\pi$.",
        es: "Todas las rectas $y=x+2k\\pi$ e $y=\\pi-x+2k\\pi$.",
        ja: "$y=x+2k\\pi$、$y=\\pi-x+2k\\pi$ のすべて。",
        zh: "所有直线 $y=x+2k\\pi$ 与 $y=\\pi-x+2k\\pi$。"
      } },
      { tex: "y=\\pi-x\\ \\text{lies in the set}", correct: true, why: {
        en: "$\\sin(\\pi-x)=\\sin x$.",
        fr: "$\\sin(\\pi-x)=\\sin x$.",
        es: "$\\sin(\\pi-x)=\\sin x$.",
        ja: "$\\sin(\\pi-x)=\\sin x$.",
        zh: "$\\sin(\\pi-x)=\\sin x$."
      } },
      { tex: "\\text{exactly two straight lines lie in the set}", correct: false, why: {
        en: "The pattern repeats every $2\\pi$.",
        fr: "Le motif se répète tous les $2\\pi$.",
        es: "El patrón se repite cada $2\\pi$.",
        ja: "$2\\pi$ ごとに繰り返す。",
        zh: "每隔 $2\\pi$ 重复。"
      } },
      { tex: "\\text{no straight line lies in the set}", correct: false, why: {
        en: "$y=x$ works.",
        fr: "$y=x$ convient.",
        es: "$y=x$ sirve.",
        ja: "$y=x$ が含まれる。",
        zh: "$y=x$ 就是。"
      } },
      { tex: "y=-x\\ \\text{lies in the set}", correct: false, why: {
        en: "$\\sin(-x)=-\\sin x\\ne\\sin x$ in general.",
        fr: "$\\sin(-x)=-\\sin x\\ne\\sin x$ in general.",
        es: "$\\sin(-x)=-\\sin x\\ne\\sin x$ in general.",
        ja: "$\\sin(-x)=-\\sin x\\ne\\sin x$ in general.",
        zh: "$\\sin(-x)=-\\sin x\\ne\\sin x$ in general."
      } },
      { tex: "y=x+\\pi\\ \\text{lies in the set}", correct: false, why: {
        en: "$\\sin(x+\\pi)=-\\sin x$.",
        fr: "$\\sin(x+\\pi)=-\\sin x$.",
        es: "$\\sin(x+\\pi)=-\\sin x$.",
        ja: "$\\sin(x+\\pi)=-\\sin x$.",
        zh: "$\\sin(x+\\pi)=-\\sin x$."
      } },
      { tex: "\\text{the part } \\sin x+\\sin y=1 \\text{ contains a line}", correct: false, why: {
        en: "Along a line $\\sin x+\\sin y$ cannot stay at $1$; it is a family of closed curves.",
        fr: "Sur une droite, $\\sin x+\\sin y$ ne peut rester égal à $1$ ; ce sont des courbes fermées.",
        es: "Sobre una recta $\\sin x+\\sin y$ no puede valer siempre $1$; son curvas cerradas.",
        ja: "直線上で $\\sin x+\\sin y$ が常に $1$ にはならない。閉曲線の族。",
        zh: "沿直线 $\\sin x+\\sin y$ 不能恒为 $1$，那是一族闭曲线。"
      } },
      { tex: "\\text{exactly four straight lines lie in the set}", correct: false, why: {
        en: "Infinitely many.",
        fr: "Une infinité.",
        es: "Infinitas.",
        ja: "無限にある。",
        zh: "有无穷多条。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Rewrite",
          fr: "Réécrire",
          es: "Reescribir",
          ja: "書き換え",
          zh: "改写"
        },
        lines: ["\\cos^2x-\\cos^2y=\\sin^2y-\\sin^2x=(\\sin y-\\sin x)(\\sin y+\\sin x)"],
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
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["(\\sin y-\\sin x)\\big(1-\\sin x-\\sin y\\big)=0"],
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
          en: "Read off the lines",
          fr: "Lire les droites",
          es: "Leer las rectas",
          ja: "直線を読み取る",
          zh: "读出直线"
        },
        lines: ["\\sin y=\\sin x\\iff y=x+2k\\pi\\ \\text{or}\\ y=\\pi-x+2k\\pi"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Infinitely many lines; the other factor gives closed loops, not lines.",
          fr: "Une infinité de droites ; l’autre facteur donne des boucles, pas des droites.",
          es: "Infinitas rectas; el otro factor da lazos, no rectas.",
          ja: "直線は無限個。もう一方の因子は閉曲線。",
          zh: "直线无穷多条；另一因子给出闭曲线。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
