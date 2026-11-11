/* algebra · How many real roots?
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2019-one-real-root",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2019 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "How many real roots?",
      fr: "Combien de racines réelles ?",
      es: "¿Cuántas raíces reales?",
      ja: "実数解はいくつ？",
      zh: "有几个实根？"
    },
    statement: {
      en: "Consider the equation $x^3-300x=3000$. <b>Which of the following are true?</b>",
      fr: "On considère l’équation $x^3-300x=3000$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la ecuación $x^3-300x=3000$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "方程式 $x^3-300x=3000$ を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑方程 $x^3-300x=3000$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes for the graph of x³ − 300x − 3000 with x = −10, 10 and 20 marked. The curve is drawn in the solution.",
      fr: "Axes pour la courbe de x³ − 300x − 3000, avec x = −10, 10 et 20 marqués. La courbe est tracée dans la solution.",
      es: "Ejes para la gráfica de x³ − 300x − 3000, con x = −10, 10 y 20 marcados. La curva se dibuja en la solución.",
      ja: "x³ − 300x − 3000 のグラフ用の座標軸（x = −10, 10, 20 に目盛り）。曲線は解答で描きます。",
      zh: "x³ − 300x − 3000 图像的坐标轴，标出 x = −10、10、20。曲线在解答中画出。"
    },
    hint: {
      en: "Find the turning points of $f(x)=x^3-300x-3000$ and the sign of $f$ there.",
      fr: "Trouvez les extremums de $f(x)=x^3-300x-3000$ et le signe de $f$ en ces points.",
      es: "Halla los extremos de $f(x)=x^3-300x-3000$ y el signo de $f$ en ellos.",
      ja: "$f(x)=x^3-300x-3000$ の極値とそこでの符号を調べる。",
      zh: "求 $f(x)=x^3-300x-3000$ 的极值点及该处符号。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 4.0, scale: 50, pad: 18 });
      const T = F.T = axes(F, -3.0, 2.4, -2.6, 1.4);
      const f = x => ((10 * x) ** 3 - 300 * 10 * x - 3000) / 4000;
      [[-1, '−10'], [1, '10'], [2, '20']].forEach(([x, t]) => { F.seg(T([x, -0.06]), T([x, 0.06]), 'seg thin'); F.text(T([x, 0]), t, 'tick', 0, 14); });
      F.reveal = () => {
      plot(F, T, f, -2.0, 2.25, 'graph', 'base', -2.6, 1.4);
      F.dot(T([-1, f(-1)])); F.dot(T([1, f(1)])); F.dot(T([2.104, 0])); F.text(T([2.104, 0]), '≈21', 'len small', -20, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "exactly one real solution": {"fr": "exactement une solution réelle", "es": "exactamente una solución real", "ja": "実数解はちょうど1つ", "zh": "恰有一个实数解"},
      "for the real solution": {"fr": "pour la solution réelle", "es": "para la solución real", "ja": "（実数解について）", "zh": "（对实数解）"},
      "exactly three real solutions": {"fr": "exactement trois solutions réelles", "es": "exactamente tres soluciones reales", "ja": "実数解はちょうど3つ", "zh": "恰有三个实数解"},
      "exactly two real solutions": {"fr": "exactement deux solutions réelles", "es": "exactamente dos soluciones reales", "ja": "実数解はちょうど2つ", "zh": "恰有两个实数解"},
      "no real solution": {"fr": "aucune solution réelle", "es": "ninguna solución real", "ja": "実数解はない", "zh": "没有实数解"},
      "is a solution": {"fr": "est solution", "es": "es solución", "ja": "は解", "zh": "是解"},
      "a negative solution exists": {"fr": "il existe une solution négative", "es": "existe una solución negativa", "ja": "負の解がある", "zh": "存在负解"}
    },
    options: [
      { tex: "\\text{exactly one real solution}", correct: true, why: {
        en: "$f(-10)=-1000<0$: even the local maximum is negative.",
        fr: "$f(-10)=-1000<0$: even the local maximum is negative.",
        es: "$f(-10)=-1000<0$: even the local maximum is negative.",
        ja: "$f(-10)=-1000<0$: even the local maximum is negative.",
        zh: "$f(-10)=-1000<0$: even the local maximum is negative."
      } },
      { tex: "21<x<22\\ \\text{for the real solution}", correct: true, why: {
        en: "$f(21)=-39<0<f(22)=1048$.",
        fr: "$f(21)=-39<0<f(22)=1048$.",
        es: "$f(21)=-39<0<f(22)=1048$.",
        ja: "$f(21)=-39<0<f(22)=1048$.",
        zh: "$f(21)=-39<0<f(22)=1048$."
      } },
      { tex: "\\text{exactly three real solutions}", correct: false, why: {
        en: "Would need the local maximum to be positive.",
        fr: "Il faudrait un maximum local positif.",
        es: "Haría falta un máximo local positivo.",
        ja: "極大値が正である必要がある。",
        zh: "需要极大值为正。"
      } },
      { tex: "\\text{exactly two real solutions}", correct: false, why: {
        en: "Only if the graph touched the axis at a turning point.",
        fr: "Seulement si la courbe touchait l’axe en un extremum.",
        es: "Solo si la gráfica tocara el eje en un extremo.",
        ja: "極値で軸に接する場合だけ。",
        zh: "仅当图像在极值点与轴相切。"
      } },
      { tex: "\\text{no real solution}", correct: false, why: {
        en: "Every real cubic has at least one real root.",
        fr: "Toute cubique réelle a au moins une racine réelle.",
        es: "Toda cúbica real tiene al menos una raíz real.",
        ja: "実係数3次式は必ず実数解をもつ。",
        zh: "实系数三次式至少有一个实根。"
      } },
      { tex: "x=10\\ \\text{is a solution}", correct: false, why: {
        en: "$1000-3000\\ne3000$.",
        fr: "$1000-3000\\ne3000$.",
        es: "$1000-3000\\ne3000$.",
        ja: "$1000-3000\\ne3000$.",
        zh: "$1000-3000\\ne3000$."
      } },
      { tex: "\\text{a negative solution exists}", correct: false, why: {
        en: "For $x<0$, $f(x)\\le f(-10)<0$.",
        fr: "Pour $x<0$, $f(x)\\le f(-10)<0$.",
        es: "Para $x<0$, $f(x)\\le f(-10)<0$.",
        ja: "$x<0$ で $f(x)\\le f(-10)<0$。",
        zh: "$x<0$ 时 $f(x)\\le f(-10)<0$。"
      } },
      { tex: "x=30\\ \\text{is a solution}", correct: false, why: {
        en: "$27000-9000=18000\\ne3000$.",
        fr: "$27000-9000=18000\\ne3000$.",
        es: "$27000-9000=18000\\ne3000$.",
        ja: "$27000-9000=18000\\ne3000$.",
        zh: "$27000-9000=18000\\ne3000$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Turning points",
          fr: "Extremums",
          es: "Extremos",
          ja: "極値",
          zh: "极值点"
        },
        lines: ["f(x)=x^3-300x-3000,\\quad f'(x)=3x^2-300=0\\iff x=\\pm10"],
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
          en: "Check the local maximum",
          fr: "Vérifier le maximum local",
          es: "Comprobar el máximo local",
          ja: "極大値を調べる",
          zh: "检查极大值"
        },
        lines: ["f(-10)=-1000+3000-3000=-1000<0"],
        note: {
          en: "The graph never reaches the axis on the left, so it crosses only once, to the right of $10$.",
          fr: "La courbe n’atteint pas l’axe à gauche : un seul passage, à droite de $10$.",
          es: "La gráfica no llega al eje por la izquierda: un solo corte, a la derecha de $10$.",
          ja: "左側では軸に届かず、10 の右で1回だけ交わる。",
          zh: "左侧到不了轴，只在 $10$ 右边穿过一次。"
        }
      },
      {
        title: {
          en: "Locate it",
          fr: "Localiser",
          es: "Localizarla",
          ja: "位置",
          zh: "定位"
        },
        lines: ["f(21)=9261-6300-3000=-39,\\qquad f(22)=10648-6600-3000=1048"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "So the single root is between $21$ and $22$ (about $21.04$).",
          fr: "La racine unique est entre $21$ et $22$ (environ $21{,}04$).",
          es: "La raíz única está entre $21$ y $22$ (unos $21{,}04$).",
          ja: "唯一の解は 21 と 22 の間（約 21.04）。",
          zh: "唯一的根在 21 与 22 之间（约 21.04）。"
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
