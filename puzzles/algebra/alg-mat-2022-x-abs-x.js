/* algebra · How many solutions has x|x| + 1 = 3|x|?
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2022-x-abs-x",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2022 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "How many solutions has x|x| + 1 = 3|x|?",
      fr: "Combien de solutions pour x|x| + 1 = 3|x| ?",
      es: "¿Cuántas soluciones tiene x|x| + 1 = 3|x|?",
      ja: "x|x| + 1 = 3|x| の解の個数",
      zh: "x|x| + 1 = 3|x| 有几个解？"
    },
    statement: {
      en: "Consider the equation $x|x|+1=3|x|$ for real $x$. <b>Which of the following are true?</b>",
      fr: "On considère l’équation $x|x|+1=3|x|$ pour $x$ réel. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la ecuación $x|x|+1=3|x|$ con $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ についての方程式 $x|x|+1=3|x|$ を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑实数方程 $x|x|+1=3|x|$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of y = x|x| + 1: a parabola opening up for x > 0 and down for x < 0.",
      fr: "Le graphe de y = x|x| + 1 : une parabole tournée vers le haut pour x > 0 et vers le bas pour x < 0.",
      es: "La gráfica de y = x|x| + 1: una parábola hacia arriba para x > 0 y hacia abajo para x < 0.",
      ja: "y = x|x| + 1 のグラフ：x > 0 で上に開き、x < 0 で下に開く放物線。",
      zh: "y = x|x| + 1 的图像：x > 0 时开口向上，x < 0 时开口向下。"
    },
    hint: {
      en: "Split into $x\\ge0$ (where $x^2-3x+1=0$) and $x<0$ (where $-x^2+3x+1=0$), and keep only roots with the right sign.",
      fr: "Séparez $x\\ge0$ (où $x^2-3x+1=0$) et $x<0$ (où $-x^2+3x+1=0$), et gardez les racines du bon signe.",
      es: "Separa $x\\ge0$ (donde $x^2-3x+1=0$) y $x<0$ (donde $-x^2+3x+1=0$), y conserva las raíces con el signo correcto.",
      ja: "$x\\ge0$（$x^2-3x+1=0$）と $x<0$（$-x^2+3x+1=0$）に分け、符号の合う解だけ残す。",
      zh: "分 $x\\ge0$（$x^2-3x+1=0$）与 $x<0$（$-x^2+3x+1=0$），只保留符号相符的根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 9.8, scale: 26, pad: 16 });
      const T = F.T = axes(F, -1.6, 3.4, -1.5, 8.3);
      plot(F, T, x => x * Math.abs(x) + 1, -1.6, 3.4, 'graph', 'base', -1.5, 8.3);
      F.reveal = () => {
      plot(F, T, x => 3 * Math.abs(x), -1.6, 3.4, 'conic', 'base', -1.5, 8.3);
      [(3 - Math.sqrt(13)) / 2, (3 - Math.sqrt(5)) / 2, (3 + Math.sqrt(5)) / 2].forEach(r => F.dot(T([r, 3 * Math.abs(r)])));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is a root": {"fr": "est une racine", "es": "es una raíz", "ja": "は解", "zh": "是一个根"},
      "every root is positive": {"fr": "toutes les racines sont positives", "es": "todas las raíces son positivas", "ja": "解はすべて正", "zh": "所有根都为正"},
      "there are exactly 3 real solutions": {"fr": "il y a exactement 3 solutions réelles", "es": "hay exactamente 3 soluciones reales", "ja": "実数解はちょうど3個", "zh": "恰有 3 个实数解"},
      "there are exactly 4 real solutions": {"fr": "il y a exactement 4 solutions réelles", "es": "hay exactamente 4 soluciones reales", "ja": "実数解はちょうど4個", "zh": "恰有 4 个实数解"},
      "there are exactly 2 real solutions": {"fr": "il y a exactement 2 solutions réelles", "es": "hay exactamente 2 soluciones reales", "ja": "実数解はちょうど2個", "zh": "恰有 2 个实数解"},
      "there is exactly 1 real solution": {"fr": "il y a exactement 1 solution réelle", "es": "hay exactamente 1 solución real", "ja": "実数解はちょうど1個", "zh": "恰有 1 个实数解"},
      "there are no real solutions": {"fr": "il n’y a aucune solution réelle", "es": "no hay soluciones reales", "ja": "実数解はない", "zh": "没有实数解"},
      "roots": {"fr": "racines", "es": "raíces", "ja": "個の解", "zh": "个根"}
    },
    options: [
      { tex: "\\text{there are exactly 3 real solutions}", correct: true, why: {
        en: "Two positive roots and one negative root.",
        fr: "Deux racines positives et une négative.",
        es: "Dos raíces positivas y una negativa.",
        ja: "正の解2つと負の解1つ。",
        zh: "两个正根、一个负根。"
      } },
      { tex: "x=\\tfrac{3-\\sqrt{13}}{2}\\ \\text{is a root}", correct: true, why: {
        en: "It is the negative root of $x^2-3x-1=0$.",
        fr: "C’est la racine négative de $x^2-3x-1=0$.",
        es: "Es la raíz negativa de $x^2-3x-1=0$.",
        ja: "$x^2-3x-1=0$ の負の解。",
        zh: "它是 $x^2-3x-1=0$ 的负根。"
      } },
      { tex: "x=\\tfrac{3+\\sqrt{13}}{2}\\ \\text{is a root}", correct: false, why: {
        en: "It belongs to the $x<0$ equation but is positive.",
        fr: "Elle vient de l’équation pour $x<0$ mais elle est positive.",
        es: "Sale de la ecuación para $x<0$ pero es positiva.",
        ja: "$x<0$ の方程式の解だが正なので不適。",
        zh: "它来自 $x<0$ 的方程却为正，舍去。"
      } },
      { tex: "\\text{every root is positive}", correct: false, why: {
        en: "$\\tfrac{3-\\sqrt{13}}2\\approx-0.30$.",
        fr: "$\\tfrac{3-\\sqrt{13}}2\\approx-0{,}30$.",
        es: "$\\tfrac{3-\\sqrt{13}}2\\approx-0{,}30$.",
        ja: "$\\tfrac{3-\\sqrt{13}}2\\approx-0.30$。",
        zh: "$\\tfrac{3-\\sqrt{13}}2\\approx-0.30$。"
      } },
      { tex: "\\text{there are exactly 4 real solutions}", correct: false, why: {
        en: "That keeps the wrong-sign root as well.",
        fr: "Cela garde aussi la racine de mauvais signe.",
        es: "Eso conserva también la raíz de signo equivocado.",
        ja: "符号の合わない解まで数えている。",
        zh: "把符号不符的根也算进去了。"
      } },
      { tex: "\\text{there are exactly 2 real solutions}", correct: false, why: {
        en: "Only the case $x\\ge0$.",
        fr: "Seulement le cas $x\\ge0$.",
        es: "Solo el caso $x\\ge0$.",
        ja: "$x\\ge0$ の場合だけ。",
        zh: "只考虑了 $x\\ge0$。"
      } },
      { tex: "\\text{there is exactly 1 real solution}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there are no real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Case x ≥ 0",
          fr: "Cas x ≥ 0",
          es: "Caso x ≥ 0",
          ja: "x ≥ 0 の場合",
          zh: "x ≥ 0 的情形"
        },
        lines: ["x^2-3x+1=0\\Rightarrow x=\\tfrac{3\\pm\\sqrt5}{2}>0\\quad(2\\ \\text{roots})"],
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
          en: "Case x < 0",
          fr: "Cas x < 0",
          es: "Caso x < 0",
          ja: "x < 0 の場合",
          zh: "x < 0 的情形"
        },
        lines: ["-x^2+1=-3x\\Rightarrow x^2-3x-1=0\\Rightarrow x=\\tfrac{3-\\sqrt{13}}{2}<0"],
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
