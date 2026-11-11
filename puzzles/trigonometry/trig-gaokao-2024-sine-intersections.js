/* trigonometry · Where sin x meets a faster wave
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2024-sine-intersections",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 7",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 7",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 7",
        ja: "2024年 中国・高考 新課程標準I卷 第7問",
        zh: "2024年高考数学新课标I卷 第7题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Where sin x meets a faster wave",
      fr: "Où sin x rencontre une onde plus rapide",
      es: "Donde sen x corta una onda más rápida",
      ja: "sin x と速い波の交点",
      zh: "sin x 与快波的交点"
    },
    statement: {
      en: "<b>On $[0,2\\pi]$, how many intersection points do the graphs of $y=\\sin x$ and $y=2\\sin\\!\\left(3x-\\frac{\\pi}{6}\\right)$ have?</b> Choose every option equal to that number.",
      fr: "<b>Sur $[0,2\\pi]$, combien de points d’intersection ont les courbes de $y=\\sin x$ et $y=2\\sin\\!\\left(3x-\\frac{\\pi}{6}\\right)$ ?</b> Choisissez toutes les options égales à ce nombre.",
      es: "<b>En $[0,2\\pi]$, ¿cuántos puntos de corte tienen las gráficas de $y=\\sin x$ y $y=2\\sin\\!\\left(3x-\\frac{\\pi}{6}\\right)$?</b> Elige todas las opciones iguales a ese número.",
      ja: "<b>$[0,2\\pi]$ で $y=\\sin x$ と $y=2\\sin\\!\\left(3x-\\frac{\\pi}{6}\\right)$ のグラフの交点はいくつですか？</b>その数に等しい選択肢をすべて選んでください。",
      zh: "<b>在 $[0,2\\pi]$ 上，$y=\\sin x$ 与 $y=2\\sin\\!\\left(3x-\\frac{\\pi}{6}\\right)$ 的图像有几个交点？</b>选出所有等于该数的选项。"
    },
    figureText: {
      en: "The graph of y = sin x on [0, 2π] with ticks at π/2, π, 3π/2 and 2π, and the lines y = ±2. The second graph is drawn in the solution.",
      fr: "La courbe de y = sin x sur [0, 2π] avec des graduations en π/2, π, 3π/2 et 2π, et les droites y = ±2. La seconde courbe est tracée dans la solution.",
      es: "La gráfica de y = sen x en [0, 2π] con marcas en π/2, π, 3π/2 y 2π, y las rectas y = ±2. La segunda gráfica se dibuja en la solución.",
      ja: "[0, 2π] での y = sin x のグラフ（π/2, π, 3π/2, 2π に目盛り）と直線 y = ±2。もう一方のグラフは解答で描く。",
      zh: "[0, 2π] 上 y = sin x 的图像，刻度 π/2、π、3π/2、2π，以及直线 y = ±2。另一条曲线在解答中画出。"
    },
    hint: {
      en: "The second wave has period $\\tfrac{2\\pi}{3}$ and swings between $-2$ and $2$. Count crossings period by period.",
      fr: "La seconde onde a pour période $\\tfrac{2\\pi}{3}$ et oscille entre $-2$ et $2$. Comptez période par période.",
      es: "La segunda onda tiene periodo $\\tfrac{2\\pi}{3}$ y oscila entre $-2$ y $2$. Cuenta periodo a periodo.",
      ja: "2つ目の波は周期 $\\tfrac{2\\pi}{3}$、$-2$ から $2$ まで振れる。周期ごとに数える。",
      zh: "第二条曲线周期为 $\\tfrac{2\\pi}{3}$，在 $-2$ 与 $2$ 之间振荡。逐个周期数交点。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 4.8, scale: 44, pad: 16 });
      const T = F.T = axes(F, -0.3, 6.7, -2.4, 2.4);
      [[Math.PI / 2, 'π/2'], [Math.PI, 'π'], [3 * Math.PI / 2, '3π/2'], [2 * Math.PI, '2π']].forEach(([x, t]) => { F.seg(T([x, -0.07]), T([x, 0.07]), 'seg thin'); F.text(T([x, 0]), t, 'tick', 0, 14); });
      [2, -2].forEach(y => F.seg(T([0, y]), T([2 * Math.PI, y]), 'seg thin dashc'));
      F.text(T([0, 2]), '2', 'tick', -10, 0); F.text(T([0, -2]), '−2', 'tick', -14, 0);
      plot(F, T, Math.sin, 0, 2 * Math.PI, 'graph');
      F.reveal = () => {
      const g = x => 2 * Math.sin(3 * x - Math.PI / 6);
      plot(F, T, g, 0, 2 * Math.PI, 'hl pink', 'base', -2.4, 2.4);
      const h = x => Math.sin(x) - g(x); const N = 2000;
      for (let k = 0; k < N; k++) { const a = 2 * Math.PI * k / N, b = 2 * Math.PI * (k + 1) / N; if (h(a) * h(b) < 0) { const x = (a + b) / 2; F.dot(T([x, Math.sin(x)])); } }
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "three full periods on": {"fr": "trois périodes complètes sur", "es": "tres periodos completos en", "ja": "3周期分：", "zh": "共三个完整周期，区间"},
      "range": {"fr": "valeurs", "es": "recorrido", "ja": "値域", "zh": "值域"},
      "each period goes from": {"fr": "chaque période va de", "es": "cada periodo va de", "ja": "各周期で", "zh": "每个周期从"},
      "to": {"fr": "à", "es": "a", "ja": "から", "zh": "到"},
      "and back, while": {"fr": "et revient, alors que", "es": "y vuelve, mientras", "ja": "まで往復、一方", "zh": "再回来，而"}
    },
    options: [
      { tex: "6", correct: true, why: {
        en: "Two crossings in each of the three periods of the faster wave.",
        fr: "Deux croisements dans chacune des trois périodes de l’onde rapide.",
        es: "Dos cortes en cada uno de los tres periodos de la onda rápida.",
        ja: "速い波の3周期それぞれで2回交わる。",
        zh: "快波的三个周期里各交两次。"
      } },
      { tex: "\\tbinom42", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3", correct: false, why: {
        en: "That counts one crossing per period; each period gives two.",
        fr: "Une seule par période ; chaque période en donne deux.",
        es: "Uno por periodo; cada periodo da dos.",
        ja: "1周期に1回と数えている。実際は2回。",
        zh: "每周期只数了一次，实际是两次。"
      } },
      { tex: "5", correct: false, why: {
        en: "The crossing near $x\\approx0.21$ is easy to miss, but it is there.",
        fr: "Le croisement près de $x\\approx0{,}21$ est facile à manquer, mais il existe.",
        es: "El corte cerca de $x\\approx0{,}21$ se pasa por alto con facilidad, pero existe.",
        ja: "$x\\approx0.21$ 付近の交点を見落としやすい。",
        zh: "$x\\approx0.21$ 附近的交点容易漏掉。"
      } },
      { tex: "7", correct: false, why: {
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
          en: "The faster wave",
          fr: "L’onde rapide",
          es: "La onda rápida",
          ja: "速い波",
          zh: "快波"
        },
        lines: ["T=\\tfrac{2\\pi}{3}:\\ \\text{three full periods on}\\ [0,2\\pi],\\ \\text{range}\\ [-2,2]"],
        note: {
          en: "It starts at $g(0)=2\\sin(-\\tfrac{\\pi}6)=-1$.",
          fr: "Elle part de $g(0)=2\\sin(-\\tfrac{\\pi}6)=-1$.",
          es: "Empieza en $g(0)=2\\sin(-\\tfrac{\\pi}6)=-1$.",
          ja: "$g(0)=2\\sin(-\\tfrac{\\pi}6)=-1$ から始まる。",
          zh: "起点 $g(0)=2\\sin(-\\tfrac{\\pi}6)=-1$。"
        }
      },
      {
        title: {
          en: "Count period by period",
          fr: "Compter période par période",
          es: "Contar periodo a periodo",
          ja: "周期ごとに数える",
          zh: "逐周期计数"
        },
        lines: ["\\text{each period goes from}\\ -2\\ \\text{to}\\ 2\\ \\text{and back, while}\\ |\\sin x|\\le1", "3\\times2=\\boxed{6}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Going up it crosses $\\sin x$ once, coming down once more.",
          fr: "En montant elle croise $\\sin x$ une fois, en redescendant encore une fois.",
          es: "Al subir corta a $\\sin x$ una vez y al bajar otra.",
          ja: "上がるときと下がるときに1回ずつ交わる。",
          zh: "上升时交一次，下降时再交一次。"
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
