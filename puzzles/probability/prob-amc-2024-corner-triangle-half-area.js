/* probability · A random corner triangle with less than half the area
   AMC 12A 2024 (Mathematical Association of America), Problem 20 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2024-corner-triangle-half-area",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 20",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 20",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 20",
        ja: "AMC 12A 2024（アメリカ数学協会）第20問",
        zh: "AMC 12A 2024（美国数学协会）第 20 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A random corner triangle with less than half the area",
      fr: "Un triangle de coin aléatoire de moins de la moitié de l’aire",
      es: "Un triángulo de esquina aleatorio con menos de la mitad del área",
      ja: "面積が半分未満のランダムな角の三角形",
      zh: "面积不到一半的随机角三角形"
    },
    statement: {
      en: "In triangle $ABC$, $P$ is uniform on $AB$ and $Q$ is independently uniform on $AC$. <b>Which of the following are true about the probability $p$ that $[APQ]<\\tfrac12[ABC]$?</b>",
      fr: "Dans le triangle $ABC$, $P$ est uniforme sur $[AB]$ et $Q$, indépendamment, uniforme sur $[AC]$. <b>Lesquelles des affirmations suivantes sont vraies pour la probabilité $p$ que $[APQ]<\\tfrac12[ABC]$ ?</b>",
      es: "En el triángulo $ABC$, $P$ es uniforme en $AB$ y $Q$, de forma independiente, uniforme en $AC$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre la probabilidad $p$ de que $[APQ]<\\tfrac12[ABC]$?</b>",
      ja: "三角形 $ABC$ で、$P$ は $AB$ 上に一様、$Q$ は独立に $AC$ 上に一様。<b>$[APQ]<\\tfrac12[ABC]$ となる確率 $p$ について正しいものはどれですか？</b>",
      zh: "三角形 $ABC$ 中，$P$ 在 $AB$ 上均匀分布，$Q$ 独立地在 $AC$ 上均匀分布。<b>关于 $[APQ]<\\tfrac12[ABC]$ 的概率 $p$，下列哪些正确？</b>"
    },
    figureText: {
      en: "The unit square of (x, y) = (AP/AB, AQ/AC) with the hyperbola xy = 1/2 cutting off a corner.",
      fr: "Le carré unité des (x, y) = (AP/AB, AQ/AC) et l’hyperbole xy = 1/2 qui coupe un coin.",
      es: "El cuadrado unidad de (x, y) = (AP/AB, AQ/AC) con la hipérbola xy = 1/2 cortando una esquina.",
      ja: "(x, y) = (AP/AB, AQ/AC) の単位正方形と、角を切る双曲線 xy = 1/2。",
      zh: "(x, y) = (AP/AB, AQ/AC) 的单位正方形，双曲线 xy = 1/2 切去一角。"
    },
    hint: {
      en: "With $x=\\tfrac{AP}{AB}$, $y=\\tfrac{AQ}{AC}$: $\\dfrac{[APQ]}{[ABC]}=xy$. Compute the area of $\\{xy>\\tfrac12\\}$ in the unit square.",
      fr: "Avec $x=\\tfrac{AP}{AB}$, $y=\\tfrac{AQ}{AC}$ : $\\dfrac{[APQ]}{[ABC]}=xy$. Calculez l’aire de $\\{xy>\\tfrac12\\}$ dans le carré unité.",
      es: "Con $x=\\tfrac{AP}{AB}$, $y=\\tfrac{AQ}{AC}$: $\\dfrac{[APQ]}{[ABC]}=xy$. Calcula el área de $\\{xy>\\tfrac12\\}$ en el cuadrado unidad.",
      ja: "$x=\\tfrac{AP}{AB}$、$y=\\tfrac{AQ}{AC}$ で $\\dfrac{[APQ]}{[ABC]}=xy$。単位正方形で $\\{xy>\\tfrac12\\}$ の面積を求める。",
      zh: "令 $x=\\tfrac{AP}{AB}$，$y=\\tfrac{AQ}{AC}$，则 $\\dfrac{[APQ]}{[ABC]}=xy$；求单位正方形中 $\\{xy>\\tfrac12\\}$ 的面积。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 100, pad: 16 });
      const T = F.T = axes(F, -0.25, 1.25, -0.25, 1.25);
      F.path([T([0, 0]), T([1, 0]), T([1, 1]), T([0, 1])], 'seg', 'base', true);
      F.text(T([1, 0]), '1', 'tick', 0, 14); F.text(T([0, 1]), '1', 'tick', -10, 0);
      F.reveal = () => {
      const reg = [T([1, 1])]; for (let k = 0; k <= 30; k++) { const x = 0.5 + 0.5 * k / 30; reg.push(T([x, 0.5 / x])); } reg.push(T([1, 1]));
      F.path(reg, 'fill-pink', 'fills', true);
      plot(F, T, x => 0.5 / x, 0.5, 1, 'graph', 'base', -0.25, 1.25);
      F.text(T([0.62, 0.62]), 'xy = 1/2', 'len small', -26, 10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "depends on the shape of": {"fr": "dépend de la forme de", "es": "depende de la forma de", "ja": "は次の形による：", "zh": "取决于下列形状："},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "xy = 1/2": {"fr": "xy = 1/2", "es": "xy = 1/2", "ja": "xy = 1/2", "zh": "xy = 1/2"}
    },
    options: [
      { tex: "p=\\dfrac{1+\\ln2}{2}", correct: true, why: {
        en: "$1-\\displaystyle\\int_{1/2}^1\\left(1-\\tfrac1{2x}\\right)dx=1-\\tfrac{1-\\ln2}2$",
        fr: "$1-\\displaystyle\\int_{1/2}^1\\left(1-\\tfrac1{2x}\\right)dx=1-\\tfrac{1-\\ln2}2$",
        es: "$1-\\displaystyle\\int_{1/2}^1\\left(1-\\tfrac1{2x}\\right)dx=1-\\tfrac{1-\\ln2}2$",
        ja: "$1-\\displaystyle\\int_{1/2}^1\\left(1-\\tfrac1{2x}\\right)dx=1-\\tfrac{1-\\ln2}2$",
        zh: "$1-\\displaystyle\\int_{1/2}^1\\left(1-\\tfrac1{2x}\\right)dx=1-\\tfrac{1-\\ln2}2$"
      } },
      { tex: "\\tfrac34<p\\le\\tfrac78", correct: true, why: {
        en: "$p\\approx0.8466$",
        fr: "$p\\approx0.8466$",
        es: "$p\\approx0.8466$",
        ja: "$p\\approx0.8466$",
        zh: "$p\\approx0.8466$"
      } },
      { tex: "p=\\tfrac12", correct: false, why: {
        en: "$xy$ is usually small; it is not symmetric about $\\tfrac12$.",
        fr: "$xy$ est souvent petit ; il n’est pas symétrique autour de $\\tfrac12$.",
        es: "$xy$ suele ser pequeño; no es simétrico respecto de $\\tfrac12$.",
        ja: "$xy$ は小さくなりがちで $\\tfrac12$ について対称でない。",
        zh: "$xy$ 通常较小，不关于 $\\tfrac12$ 对称。"
      } },
      { tex: "p=\\dfrac{1-\\ln2}{2}", correct: false, why: {
        en: "That is the complement, $P(xy>\\tfrac12)$.",
        fr: "C’est le contraire, $P(xy>\\tfrac12)$.",
        es: "Es el complementario, $P(xy>\\tfrac12)$.",
        ja: "余事象 $P(xy>\\tfrac12)$。",
        zh: "那是对立事件 $P(xy>\\tfrac12)$。"
      } },
      { tex: "p=\\tfrac34", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac78<p\\le1", correct: false, why: {
        en: "$p\\approx0.847<0.875$",
        fr: "$p\\approx0.847<0.875$",
        es: "$p\\approx0.847<0.875$",
        ja: "$p\\approx0.847<0.875$",
        zh: "$p\\approx0.847<0.875$"
      } },
      { tex: "p=\\ln2", correct: false, why: {
        en: "$\\ln2\\approx0.693$",
        fr: "$\\ln2\\approx0.693$",
        es: "$\\ln2\\approx0.693$",
        ja: "$\\ln2\\approx0.693$",
        zh: "$\\ln2\\approx0.693$"
      } },
      { tex: "p\\ \\text{depends on the shape of}\\ ABC", correct: false, why: {
        en: "The area ratio is $xy$ for every triangle.",
        fr: "Le rapport d’aires vaut $xy$ pour tout triangle.",
        es: "La razón de áreas es $xy$ en todo triángulo.",
        ja: "どんな三角形でも面積比は $xy$。",
        zh: "任何三角形面积比都是 $xy$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Area ratio",
          fr: "Rapport d’aires",
          es: "Razón de áreas",
          ja: "面積比",
          zh: "面积比"
        },
        lines: ["\\frac{[APQ]}{[ABC]}=\\frac{\\tfrac12\\,AP\\cdot AQ\\sin A}{\\tfrac12\\,AB\\cdot AC\\sin A}=xy"],
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
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分",
          zh: "积分"
        },
        lines: ["P(xy>\\tfrac12)=\\int_{1/2}^1\\left(1-\\frac1{2x}\\right)dx=\\frac{1-\\ln2}2\\Rightarrow p=\\frac{1+\\ln2}2\\approx0.847"],
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
