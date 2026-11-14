/* trigonometry · (1 + 3 cos 3θ)² = 4 on [0°, 180°]
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2023-one-plus-three-cos-three-theta",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 9",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 9",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 9",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第9問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 9 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "(1 + 3 cos 3θ)² = 4 on [0°, 180°]",
      fr: "(1 + 3 cos 3θ)² = 4 sur [0°, 180°]",
      es: "(1 + 3 cos 3θ)² = 4 en [0°, 180°]",
      ja: "[0°, 180°] での (1 + 3 cos 3θ)² = 4",
      zh: "[0°, 180°] 上 (1 + 3 cos 3θ)² = 4"
    },
    statement: {
      en: "Consider $(1+3\\cos3\\theta)^2=4$ for $0^\\circ\\le\\theta\\le180^\\circ$. <b>Which of the following are true?</b>",
      fr: "On considère $(1+3\\cos3\\theta)^2=4$ pour $0^\\circ\\le\\theta\\le180^\\circ$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $(1+3\\cos3\\theta)^2=4$ con $0^\\circ\\le\\theta\\le180^\\circ$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0^\\circ\\le\\theta\\le180^\\circ$ で $(1+3\\cos3\\theta)^2=4$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $0^\\circ\\le\\theta\\le180^\\circ$ 时 $(1+3\\cos3\\theta)^2=4$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of cos 3θ over [0°, 180°] with the levels 1/3 and −1.",
      fr: "Le graphe de cos 3θ sur [0°, 180°] et les niveaux 1/3 et −1.",
      es: "La gráfica de cos 3θ en [0°, 180°] con los niveles 1/3 y −1.",
      ja: "[0°, 180°] での cos 3θ と高さ 1/3, −1。",
      zh: "[0°, 180°] 上 cos 3θ 的图像及水平线 1/3、−1。"
    },
    hint: {
      en: "$1+3\\cos3\\theta=\\pm2$ gives $\\cos3\\theta=\\tfrac13$ or $\\cos3\\theta=-1$. Here $3\\theta$ runs over $[0^\\circ,540^\\circ]$.",
      fr: "$1+3\\cos3\\theta=\\pm2$ donne $\\cos3\\theta=\\tfrac13$ ou $-1$. Ici $3\\theta$ parcourt $[0^\\circ,540^\\circ]$.",
      es: "$1+3\\cos3\\theta=\\pm2$ da $\\cos3\\theta=\\tfrac13$ o $-1$. Aquí $3\\theta$ recorre $[0^\\circ,540^\\circ]$.",
      ja: "$1+3\\cos3\\theta=\\pm2$ より $\\cos3\\theta=\\tfrac13$ か $-1$。$3\\theta\\in[0^\\circ,540^\\circ]$。",
      zh: "$1+3\\cos3\\theta=\\pm2$ 得 $\\cos3\\theta=\\tfrac13$ 或 $-1$，$3\\theta\\in[0^\\circ,540^\\circ]$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.0, scale: 48, pad: 16 });
      const S = ([x, y]) => [0.3 + x / 180 * 5.4, 1.5 + y * 1.2];
      F.seg(S([0, 0]), S([180, 0]), 'axis'); F.seg(S([0, -1.2]), S([0, 1.2]), 'axis'); F.text(S([180, 0]), '180°', 'tick', 0, 14);
      plot(F, S, t => Math.cos(3 * t * Math.PI / 180), 0, 180, 'graph');
      F.seg(S([0, 1 / 3]), S([180, 1 / 3]), 'seg thin dashc'); F.seg(S([0, -1]), S([180, -1]), 'seg thin dashc');
      F.reveal = () => {
      const r = Math.acos(1 / 3) * 180 / Math.PI; [r / 3, (360 - r) / 3, (360 + r) / 3, 60, 180].forEach(t => F.dot(S([t, Math.cos(3 * t * Math.PI / 180)])));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "180°": {"fr": "180°", "es": "180°", "ja": "180°", "zh": "180°"},
      "there are exactly 5 solutions": {"fr": "il y a exactement 5 solutions", "es": "hay exactamente 5 soluciones", "ja": "解はちょうど5個", "zh": "恰有 5 个解"},
      "is a solution": {"fr": "est une solution", "es": "es una solución", "ja": "は解", "zh": "是解"},
      "there are exactly 4 solutions": {"fr": "il y a exactement 4 solutions", "es": "hay exactamente 4 soluciones", "ja": "解はちょうど4個", "zh": "恰有 4 个解"},
      "there are exactly 6 solutions": {"fr": "il y a exactement 6 solutions", "es": "hay exactamente 6 soluciones", "ja": "解はちょうど6個", "zh": "恰有 6 个解"},
      "there are exactly 3 solutions": {"fr": "il y a exactement 3 solutions", "es": "hay exactamente 3 soluciones", "ja": "解はちょうど3個", "zh": "恰有 3 个解"},
      "there are exactly 2 solutions": {"fr": "il y a exactement 2 solutions", "es": "hay exactamente 2 soluciones", "ja": "解はちょうど2個", "zh": "恰有 2 个解"},
      "is one of the cases": {"fr": "est l’un des cas", "es": "es uno de los casos", "ja": "は場合の1つ", "zh": "是其中一种情况"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "total": {"fr": "total", "es": "total", "ja": "合計", "zh": "共"}
    },
    options: [
      { tex: "\\text{there are exactly 5 solutions}", correct: true, why: {
        en: "$\\cos3\\theta=\\tfrac13$ three times and $\\cos3\\theta=-1$ at $\\theta=60^\\circ,180^\\circ$.",
        fr: "$\\cos3\\theta=\\tfrac13$ trois fois et $\\cos3\\theta=-1$ en $\\theta=60^\\circ,180^\\circ$.",
        es: "$\\cos3\\theta=\\tfrac13$ tres veces y $\\cos3\\theta=-1$ en $\\theta=60^\\circ,180^\\circ$.",
        ja: "$\\cos3\\theta=\\tfrac13$ が3回、$\\cos3\\theta=-1$ が $\\theta=60^\\circ,180^\\circ$。",
        zh: "$\\cos3\\theta=\\tfrac13$ 三次，$\\cos3\\theta=-1$ 在 $\\theta=60^\\circ,180^\\circ$。"
      } },
      { tex: "\\theta=180^\\circ\\ \\text{is a solution}", correct: true, why: {
        en: "$(1+3\\cos540^\\circ)^2=(1-3)^2=4$",
        fr: "$(1+3\\cos540^\\circ)^2=(1-3)^2=4$",
        es: "$(1+3\\cos540^\\circ)^2=(1-3)^2=4$",
        ja: "$(1+3\\cos540^\\circ)^2=(1-3)^2=4$",
        zh: "$(1+3\\cos540^\\circ)^2=(1-3)^2=4$"
      } },
      { tex: "\\text{there are exactly 4 solutions}", correct: false, why: {
        en: "Misses the endpoint $\\theta=180^\\circ$.",
        fr: "Oublie l’extrémité $\\theta=180^\\circ$.",
        es: "Olvida el extremo $\\theta=180^\\circ$.",
        ja: "端点 $\\theta=180^\\circ$ を見落とす。",
        zh: "漏了端点 $\\theta=180^\\circ$。"
      } },
      { tex: "\\text{there are exactly 6 solutions}", correct: false, why: {
        en: "$\\cos3\\theta=-1$ has two solutions here, not three.",
        fr: "$\\cos3\\theta=-1$ n’a que deux solutions ici.",
        es: "$\\cos3\\theta=-1$ solo tiene dos soluciones aquí.",
        ja: "$\\cos3\\theta=-1$ の解はここでは2つ。",
        zh: "这里 $\\cos3\\theta=-1$ 只有两解。"
      } },
      { tex: "\\text{there are exactly 3 solutions}", correct: false, why: {
        en: "Only $\\cos3\\theta=\\tfrac13$.",
        fr: "Seulement $\\cos3\\theta=\\tfrac13$.",
        es: "Solo $\\cos3\\theta=\\tfrac13$.",
        ja: "$\\cos3\\theta=\\tfrac13$ だけ。",
        zh: "只算了 $\\cos3\\theta=\\tfrac13$。"
      } },
      { tex: "\\text{there are exactly 2 solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\cos3\\theta=1\\ \\text{is one of the cases}", correct: false, why: {
        en: "$1+3\\cdot1=4\\ne\\pm2$",
        fr: "$1+3\\cdot1=4\\ne\\pm2$",
        es: "$1+3\\cdot1=4\\ne\\pm2$",
        ja: "$1+3\\cdot1=4\\ne\\pm2$",
        zh: "$1+3\\cdot1=4\\ne\\pm2$"
      } },
      { tex: "\\theta=0^\\circ\\ \\text{is a solution}", correct: false, why: {
        en: "$(1+3)^2=16$",
        fr: "$(1+3)^2=16$",
        es: "$(1+3)^2=16$",
        ja: "$(1+3)^2=16$",
        zh: "$(1+3)^2=16$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two cases",
          fr: "Deux cas",
          es: "Dos casos",
          ja: "2つの場合",
          zh: "两种情况"
        },
        lines: ["1+3\\cos3\\theta=\\pm2\\iff\\cos3\\theta=\\tfrac13\\ \\text{or}\\ -1"],
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
          en: "Count on 3θ ∈ [0°, 540°]",
          fr: "Compter sur 3θ ∈ [0°, 540°]",
          es: "Contar en 3θ ∈ [0°, 540°]",
          ja: "3θ ∈ [0°, 540°] で数える",
          zh: "在 3θ ∈ [0°, 540°] 上计数"
        },
        lines: ["\\cos=\\tfrac13:\\ 3;\\quad\\cos=-1:\\ 180^\\circ,540^\\circ\\Rightarrow2;\\quad\\text{total }5"],
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
