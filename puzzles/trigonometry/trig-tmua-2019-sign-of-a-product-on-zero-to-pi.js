/* trigonometry · Where is (sin 2θ − ½)(sin θ − cos θ) ≥ 0?
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 17 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2019-sign-of-a-product-on-zero-to-pi",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 17",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 17",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 17",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第17問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 17 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Where is (sin 2θ − ½)(sin θ − cos θ) ≥ 0?",
      fr: "Où (sin 2θ − ½)(sin θ − cos θ) ≥ 0 ?",
      es: "¿Dónde (sen 2θ − ½)(sen θ − cos θ) ≥ 0?",
      ja: "(sin 2θ − ½)(sin θ − cos θ) ≥ 0 となる範囲",
      zh: "(sin 2θ − ½)(sin θ − cos θ) ≥ 0 的范围"
    },
    statement: {
      en: "Let $\\lambda$ be the fraction of the interval $0\\le\\theta\\le\\pi$ on which $\\bigl(\\sin2\\theta-\\tfrac12\\bigr)(\\sin\\theta-\\cos\\theta)\\ge0$. <b>Which of the following are true?</b>",
      fr: "Soit $\\lambda$ la proportion de l’intervalle $0\\le\\theta\\le\\pi$ où $\\bigl(\\sin2\\theta-\\tfrac12\\bigr)(\\sin\\theta-\\cos\\theta)\\ge0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $\\lambda$ la fracción del intervalo $0\\le\\theta\\le\\pi$ en la que $\\bigl(\\sin2\\theta-\\tfrac12\\bigr)(\\sin\\theta-\\cos\\theta)\\ge0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "区間 $0\\le\\theta\\le\\pi$ のうち $\\bigl(\\sin2\\theta-\\tfrac12\\bigr)(\\sin\\theta-\\cos\\theta)\\ge0$ となる部分の割合を $\\lambda$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设区间 $0\\le\\theta\\le\\pi$ 中满足 $\\bigl(\\sin2\\theta-\\tfrac12\\bigr)(\\sin\\theta-\\cos\\theta)\\ge0$ 的部分所占比例为 $\\lambda$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The two factors plotted over [0, π].",
      fr: "Les deux facteurs tracés sur [0, π].",
      es: "Los dos factores en [0, π].",
      ja: "[0, π] での2つの因数。",
      zh: "两个因式在 [0, π] 上的图像。"
    },
    hint: {
      en: "Sign changes at $\\tfrac\\pi{12}$, $\\tfrac\\pi4$, $\\tfrac{5\\pi}{12}$.",
      fr: "Changements de signe en $\\tfrac\\pi{12}$, $\\tfrac\\pi4$, $\\tfrac{5\\pi}{12}$.",
      es: "Cambios de signo en $\\tfrac\\pi{12}$, $\\tfrac\\pi4$, $\\tfrac{5\\pi}{12}$.",
      ja: "$\\tfrac\\pi{12}$、$\\tfrac\\pi4$、$\\tfrac{5\\pi}{12}$ で符号が変わる。",
      zh: "在 $\\tfrac\\pi{12}$、$\\tfrac\\pi4$、$\\tfrac{5\\pi}{12}$ 处变号。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-0.15)) * 1.33333, 0.2 + (y - (-1.6)) * 0.81250];
      const K = 1.33333;
      F.seg(S([-0.15, 0]), S([3.3, 0]), 'axis'); F.seg(S([0, -1.6]), S([0, 1.6]), 'axis');
      plot(F, S, t => Math.sin(2 * t) - 0.5, 0, Math.PI, 'graph'); plot(F, S, t => Math.sin(t) - Math.cos(t), 0, Math.PI, 'seg'); F.text(S([Math.PI, 0]), 'π', 'tick', 0, 14);
      F.reveal = () => {
      [[0, Math.PI / 12], [Math.PI / 4, 5 * Math.PI / 12]].forEach(([a, b]) => F.seg(S([a, -1.4]), S([b, -1.4]), 'hl pink'));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "π": {"fr": "π", "es": "π", "ja": "π", "zh": "π"},
      "satisfies the inequality": {"fr": "vérifie l’inégalité", "es": "cumple la desigualdad", "ja": "は不等式を満たす", "zh": "满足不等式"},
      "on": {"fr": "sur", "es": "en", "ja": "：", "zh": "于"}
    },
    options: [
      { tex: "\\lambda=\\tfrac14", correct: true, why: {
        en: "$\\tfrac{\\pi/12+\\pi/6}{\\pi}$",
        fr: "$\\tfrac{\\pi/12+\\pi/6}{\\pi}$",
        es: "$\\tfrac{\\pi/12+\\pi/6}{\\pi}$",
        ja: "$\\tfrac{\\pi/12+\\pi/6}{\\pi}$",
        zh: "$\\tfrac{\\pi/12+\\pi/6}{\\pi}$"
      } },
      { tex: "\\theta=\\tfrac\\pi3\\ \\text{satisfies the inequality}", correct: true, why: {
        en: "$\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)>0$",
        fr: "$\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)>0$",
        es: "$\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)>0$",
        ja: "$\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)>0$",
        zh: "$\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)\\left(\\tfrac{\\sqrt3}2-\\tfrac12\\right)>0$"
      } },
      { tex: "\\lambda=\\tfrac34", correct: false, why: {
        en: "The complement.",
        fr: "Le complémentaire.",
        es: "El complementario.",
        ja: "補集合。",
        zh: "补集。"
      } },
      { tex: "\\lambda=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\lambda=\\tfrac7{12}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\theta=\\tfrac\\pi2\\ \\text{satisfies the inequality}", correct: false, why: {
        en: "$\\left(-\\tfrac12\\right)(1)<0$",
        fr: "$\\left(-\\tfrac12\\right)(1)<0$",
        es: "$\\left(-\\tfrac12\\right)(1)<0$",
        ja: "$\\left(-\\tfrac12\\right)(1)<0$",
        zh: "$\\left(-\\tfrac12\\right)(1)<0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Zeros",
          fr: "Zéros",
          es: "Ceros",
          ja: "零点",
          zh: "零点"
        },
        lines: ["\\sin2\\theta=\\tfrac12:\\ \\tfrac\\pi{12},\\tfrac{5\\pi}{12};\\quad\\sin\\theta=\\cos\\theta:\\ \\tfrac\\pi4"],
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
          en: "Sign table",
          fr: "Tableau de signes",
          es: "Tabla de signos",
          ja: "符号表",
          zh: "符号表"
        },
        lines: ["\\ge0\\ \\text{on}\\ \\left[0,\\tfrac\\pi{12}\\right]\\cup\\left[\\tfrac\\pi4,\\tfrac{5\\pi}{12}\\right]:\\ \\tfrac\\pi{12}+\\tfrac\\pi6=\\tfrac\\pi4"],
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
