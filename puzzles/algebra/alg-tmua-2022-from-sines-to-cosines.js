/* algebra · From roots ±sin to roots ±cos
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2022-from-sines-to-cosines",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 16",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 16",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 16",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第16問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 16 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "From roots ±sin to roots ±cos",
      fr: "Des racines ±sin aux racines ±cos",
      es: "De raíces ±sen a raíces ±cos",
      ja: "±sin の根から ±cos の根へ",
      zh: "从 ±sin 根到 ±cos 根"
    },
    statement: {
      en: "The four roots of $7x^4-6x^2+1=0$ are $\\pm\\sin\\alpha$ and $\\pm\\sin\\beta$, where $0<\\alpha,\\beta<\\tfrac\\pi2$. We look for the quartic whose roots are $\\pm\\cos\\alpha$ and $\\pm\\cos\\beta$. <b>Which of the following are true?</b>",
      fr: "Les quatre racines de $7x^4-6x^2+1=0$ sont $\\pm\\sin\\alpha$ et $\\pm\\sin\\beta$, avec $0<\\alpha,\\beta<\\tfrac\\pi2$. On cherche l’équation de degré 4 de racines $\\pm\\cos\\alpha$ et $\\pm\\cos\\beta$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las cuatro raíces de $7x^4-6x^2+1=0$ son $\\pm\\sin\\alpha$ y $\\pm\\sin\\beta$, con $0<\\alpha,\\beta<\\tfrac\\pi2$. Buscamos la ecuación de grado 4 con raíces $\\pm\\cos\\alpha$ y $\\pm\\cos\\beta$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$7x^4-6x^2+1=0$ の4つの根は $\\pm\\sin\\alpha$, $\\pm\\sin\\beta$（$0<\\alpha,\\beta<\\tfrac\\pi2$）。根が $\\pm\\cos\\alpha$, $\\pm\\cos\\beta$ の4次方程式を求めます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$7x^4-6x^2+1=0$ 的四个根为 $\\pm\\sin\\alpha$、$\\pm\\sin\\beta$（$0<\\alpha,\\beta<\\tfrac\\pi2$），求以 $\\pm\\cos\\alpha$、$\\pm\\cos\\beta$ 为根的四次方程。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A quarter of the unit circle with two angles α and β and their sines.",
      fr: "Un quart du cercle unité avec deux angles α et β et leurs sinus.",
      es: "Un cuarto de la circunferencia unidad con dos ángulos α y β y sus senos.",
      ja: "単位円の4分の1と角 α, β およびその正弦。",
      zh: "单位圆的四分之一，标出角 α、β 及其正弦。"
    },
    hint: {
      en: "If $x=\\cos\\theta$ then $x^2=1-\\sin^2\\theta$: substitute $x^2\\mapsto1-x^2$.",
      fr: "Si $x=\\cos\\theta$ alors $x^2=1-\\sin^2\\theta$ : substituez $x^2\\mapsto1-x^2$.",
      es: "Si $x=\\cos\\theta$ entonces $x^2=1-\\sin^2\\theta$: sustituye $x^2\\mapsto1-x^2$.",
      ja: "$x=\\cos\\theta$ なら $x^2=1-\\sin^2\\theta$。$x^2\\mapsto1-x^2$ と置換。",
      zh: "若 $x=\\cos\\theta$，则 $x^2=1-\\sin^2\\theta$，作代换 $x^2\\mapsto1-x^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.8, h: 3.8, scale: 50, pad: 16 });
      const O = [0.4, 0.4], R = 3.0, P = t => [O[0] + R * Math.cos(t), O[1] + R * Math.sin(t)];
      F.seg(O, [3.6, 0.4], 'axis'); F.seg(O, [0.4, 3.6], 'axis');
      const C = []; for (let k = 0; k <= 40; k++) C.push(P(Math.PI / 2 * k / 40)); F.path(C, 'graph', 'base', false);
      const a = Math.asin(Math.sqrt((3 - Math.SQRT2) / 7)), b = Math.asin(Math.sqrt((3 + Math.SQRT2) / 7));
      [[a, 'α'], [b, 'β']].forEach(([t, s]) => { const Q = P(t); F.seg(O, Q, 'seg thin'); F.dot(Q); F.seg(Q, [Q[0], O[1]], 'hl blue'); F.text(Q, s, 'pt', 10, -6); });
      F.text([0.4, 0.4], 'O', 'pt', -10, 10);
      F.reveal = () => {
      [a, b].forEach(t => { const Q = P(t); F.seg(Q, [O[0], Q[1]], 'hl pink'); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "−1": {"fr": "−1", "es": "−1", "ja": "−1", "zh": "−1"},
      "sum of roots in": {"fr": "somme des racines en", "es": "suma de raíces en", "ja": "の根の和", "zh": "的根之和"},
      "has roots": {"fr": "a pour racines", "es": "tiene raíces", "ja": "の根は", "zh": "的根为"},
      "α": {"fr": "α", "es": "α", "ja": "α", "zh": "α"},
      "β": {"fr": "β", "es": "β", "ja": "β", "zh": "β"},
      "O": {"fr": "O", "es": "O", "ja": "O", "zh": "O"}
    },
    options: [
      { tex: "7x^4-8x^2+2=0", correct: true, why: {
        en: "$7(1-x^2)^2-6(1-x^2)+1$",
        fr: "$7(1-x^2)^2-6(1-x^2)+1$",
        es: "$7(1-x^2)^2-6(1-x^2)+1$",
        ja: "$7(1-x^2)^2-6(1-x^2)+1$",
        zh: "$7(1-x^2)^2-6(1-x^2)+1$"
      } },
      { tex: "\\sin^2\\alpha+\\sin^2\\beta=\\tfrac67", correct: true, why: {
        en: "$\\text{sum of roots in}\\ x^2$",
        fr: "$\\text{sum of roots in}\\ x^2$",
        es: "$\\text{sum of roots in}\\ x^2$",
        ja: "$\\text{sum of roots in}\\ x^2$",
        zh: "$\\text{sum of roots in}\\ x^2$"
      } },
      { tex: "7x^4-6x^2+1=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "7x^4-8x^2-5=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "7x^4-6x^2-2=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "7x^4+6x^2-1=0", correct: false, why: {
        en: "Substitutes $x^2\\mapsto-x^2$ instead of $1-x^2$.",
        fr: "Substitue $x^2\\mapsto-x^2$ au lieu de $1-x^2$.",
        es: "Sustituye $x^2\\mapsto-x^2$ en vez de $1-x^2$.",
        ja: "$1-x^2$ でなく $-x^2$ を代入。",
        zh: "误代 $x^2\\mapsto-x^2$ 而非 $1-x^2$。"
      } },
      { tex: "7x^4+6x^2+5=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\cos^2\\alpha\\cos^2\\beta=\\tfrac17", correct: false, why: {
        en: "$\\tfrac27$",
        fr: "$\\tfrac27$",
        es: "$\\tfrac27$",
        ja: "$\\tfrac27$",
        zh: "$\\tfrac27$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Work in x²",
          fr: "Travailler en x²",
          es: "Trabajar con x²",
          ja: "x² で考える",
          zh: "以 x² 为变量"
        },
        lines: ["7u^2-6u+1=0\\ \\text{has roots}\\ u=\\sin^2\\alpha,\\sin^2\\beta"],
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
          en: "Replace u by 1 − u",
          fr: "Remplacer u par 1 − u",
          es: "Cambiar u por 1 − u",
          ja: "u を 1 − u に",
          zh: "以 1 − u 代 u"
        },
        lines: ["7(1-u)^2-6(1-u)+1=7u^2-8u+2"],
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
