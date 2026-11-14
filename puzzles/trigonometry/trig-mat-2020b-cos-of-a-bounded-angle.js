/* trigonometry · cos(240x/(x² + 4))° = ½
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2020b-cos-of-a-bounded-angle",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question C",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question C",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta C",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 C",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 C 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "cos(240x/(x² + 4))° = ½",
      fr: "cos(240x/(x² + 4))° = ½",
      es: "cos(240x/(x² + 4))° = ½",
      ja: "cos(240x/(x² + 4))° = ½",
      zh: "cos(240x/(x² + 4))° = ½"
    },
    statement: {
      en: "Consider $\\cos\\left(\\dfrac{240x}{x^2+4}\\right)=\\dfrac12$ for real $x$, where the angle is in degrees. <b>Which of the following are true?</b>",
      fr: "On considère $\\cos\\left(\\dfrac{240x}{x^2+4}\\right)=\\dfrac12$ pour $x$ réel, l’angle étant en degrés. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $\\cos\\left(\\dfrac{240x}{x^2+4}\\right)=\\dfrac12$ con $x$ real y el ángulo en grados. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ について $\\cos\\left(\\dfrac{240x}{x^2+4}\\right)=\\dfrac12$（角度は度）を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑实数 $x$ 的方程 $\\cos\\left(\\dfrac{240x}{x^2+4}\\right)=\\dfrac12$（角度制）。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of the angle θ = 240x/(x² + 4).",
      fr: "Le graphe de l’angle θ = 240x/(x² + 4).",
      es: "La gráfica del ángulo θ = 240x/(x² + 4).",
      ja: "角 θ = 240x/(x² + 4) のグラフ。",
      zh: "角 θ = 240x/(x² + 4) 的图像。"
    },
    hint: {
      en: "Find the range of $\\theta=\\dfrac{240x}{x^2+4}$ first (AM–GM: $x^2+4\\ge4|x|$).",
      fr: "Trouvez d’abord l’ensemble des valeurs de $\\theta$ (IAG : $x^2+4\\ge4|x|$).",
      es: "Halla primero el recorrido de $\\theta$ (MA–MG: $x^2+4\\ge4|x|$).",
      ja: "まず $\\theta$ の値域（相加相乗：$x^2+4\\ge4|x|$）。",
      zh: "先求 $\\theta$ 的值域（均值不等式 $x^2+4\\ge4|x|$）。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 3.6, scale: 46, pad: 16 });
      const S = ([x, y]) => [(x + 6) * 0.46, (y + 80) * 0.0225];
      F.seg(S([-6, 0]), S([6, 0]), 'axis'); F.seg(S([0, -80]), S([0, 80]), 'axis'); F.text(S([6, 0]), 'x', 'tick', -8, 12); F.text(S([0, 80]), 'θ', 'tick', 12, 8);
      plot(F, S, x => 240 * x / (x * x + 4), -6, 6, 'graph');
      F.reveal = () => {
      [60, -60].forEach(v => { F.seg(S([-6, v]), S([6, v]), 'seg thin dashc'); F.text(S([6, v]), (v > 0 ? '' : '−') + '60°', 'tick', -14, -8); });
      F.dot(S([2, 60])); F.dot(S([-2, -60]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "60°": {"fr": "60°", "es": "60°", "ja": "60°", "zh": "60°"},
      "−60°": {"fr": "−60°", "es": "−60°", "ja": "−60°", "zh": "−60°"},
      "exactly 2 real solutions": {"fr": "exactement 2 solutions réelles", "es": "exactamente 2 soluciones reales", "ja": "実数解はちょうど2個", "zh": "恰有 2 个实数解"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "infinitely many solutions": {"fr": "une infinité de solutions", "es": "infinitas soluciones", "ja": "無限に多くの解", "zh": "无穷多个解"},
      "exactly 4 real solutions": {"fr": "exactement 4 solutions réelles", "es": "exactamente 4 soluciones reales", "ja": "実数解はちょうど4個", "zh": "恰有 4 个实数解"},
      "no real solutions": {"fr": "aucune solution réelle", "es": "ninguna solución real", "ja": "実数解なし", "zh": "没有实数解"},
      "exactly 1 real solution": {"fr": "exactement 1 solution réelle", "es": "exactamente 1 solución real", "ja": "実数解はちょうど1個", "zh": "恰有 1 个实数解"},
      "is reached": {"fr": "est atteint", "es": "se alcanza", "ja": "に達する", "zh": "能取到"},
      "is a solution": {"fr": "est une solution", "es": "es una solución", "ja": "は解", "zh": "是解"},
      "equality iff": {"fr": "égalité ssi", "es": "igualdad sii", "ja": "等号成立は", "zh": "等号当且仅当"}
    },
    options: [
      { tex: "\\text{exactly 2 real solutions}", correct: true, why: {
        en: "$\\theta$ reaches $\\pm60^\\circ$ only at $x=\\pm2$.",
        fr: "$\\theta$ n’atteint $\\pm60^\\circ$ qu’en $x=\\pm2$.",
        es: "$\\theta$ solo alcanza $\\pm60^\\circ$ en $x=\\pm2$.",
        ja: "$\\theta=\\pm60^\\circ$ は $x=\\pm2$ のみ。",
        zh: "$\\theta$ 只在 $x=\\pm2$ 时取 $\\pm60^\\circ$。"
      } },
      { tex: "-60^\\circ\\le\\theta\\le60^\\circ\\ \\text{for all}\\ x", correct: true, why: {
        en: "$|\\theta|\\le\\tfrac{240|x|}{4|x|}=60$",
        fr: "$|\\theta|\\le\\tfrac{240|x|}{4|x|}=60$",
        es: "$|\\theta|\\le\\tfrac{240|x|}{4|x|}=60$",
        ja: "$|\\theta|\\le\\tfrac{240|x|}{4|x|}=60$",
        zh: "$|\\theta|\\le\\tfrac{240|x|}{4|x|}=60$"
      } },
      { tex: "\\text{infinitely many solutions}", correct: false, why: {
        en: "$\\theta$ stays in $[-60^\\circ,60^\\circ]$, so it cannot run through many periods.",
        fr: "$\\theta$ reste dans $[-60^\\circ,60^\\circ]$ : pas de multiples périodes.",
        es: "$\\theta$ queda en $[-60^\\circ,60^\\circ]$: no recorre varios periodos.",
        ja: "$\\theta$ は $[-60^\\circ,60^\\circ]$ に収まる。",
        zh: "$\\theta$ 在 $[-60^\\circ,60^\\circ]$ 内，不会跨多个周期。"
      } },
      { tex: "\\text{exactly 4 real solutions}", correct: false, why: {
        en: "$\\theta=60^\\circ$ is a maximum, touched once, not crossed.",
        fr: "$\\theta=60^\\circ$ est un maximum, atteint une fois.",
        es: "$\\theta=60^\\circ$ es un máximo, alcanzado una vez.",
        ja: "$\\theta=60^\\circ$ は最大値で1回だけ。",
        zh: "$\\theta=60^\\circ$ 为最大值，只取到一次。"
      } },
      { tex: "\\text{no real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{exactly 1 real solution}", correct: false, why: {
        en: "Forgets $x=-2$ where $\\theta=-60^\\circ$.",
        fr: "Oublie $x=-2$ où $\\theta=-60^\\circ$.",
        es: "Olvida $x=-2$, donde $\\theta=-60^\\circ$.",
        ja: "$\\theta=-60^\\circ$ の $x=-2$ を忘れる。",
        zh: "漏了 $x=-2$ 时 $\\theta=-60^\\circ$。"
      } },
      { tex: "\\theta=300^\\circ\\ \\text{is reached}", correct: false, why: {
        en: "$|\\theta|\\le60^\\circ$",
        fr: "$|\\theta|\\le60^\\circ$",
        es: "$|\\theta|\\le60^\\circ$",
        ja: "$|\\theta|\\le60^\\circ$",
        zh: "$|\\theta|\\le60^\\circ$"
      } },
      { tex: "x=0\\ \\text{is a solution}", correct: false, why: {
        en: "$\\cos0^\\circ=1$",
        fr: "$\\cos0^\\circ=1$",
        es: "$\\cos0^\\circ=1$",
        ja: "$\\cos0^\\circ=1$",
        zh: "$\\cos0^\\circ=1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Range of θ",
          fr: "Valeurs de θ",
          es: "Recorrido de θ",
          ja: "θ の値域",
          zh: "θ 的值域"
        },
        lines: ["x^2+4\\ge4|x|\\Rightarrow|\\theta|\\le60^\\circ,\\ \\text{equality iff}\\ x=\\pm2"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["\\cos\\theta=\\tfrac12,\\ |\\theta|\\le60^\\circ\\Rightarrow\\theta=\\pm60^\\circ\\Rightarrow x=\\pm2"],
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
