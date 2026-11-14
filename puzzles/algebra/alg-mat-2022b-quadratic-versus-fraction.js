/* algebra · Solve x² − 3x + 2 < (x − 1)/x
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2022b-quadratic-versus-fraction",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question C",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question C",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta C",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 C",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 C 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Solve x² − 3x + 2 < (x − 1)/x",
      fr: "Résoudre x² − 3x + 2 < (x − 1)/x",
      es: "Resolver x² − 3x + 2 < (x − 1)/x",
      ja: "x² − 3x + 2 < (x − 1)/x を解く",
      zh: "解 x² − 3x + 2 < (x − 1)/x"
    },
    statement: {
      en: "Consider the inequality $x^2-3x+2<\\dfrac{x-1}{x}$ for real $x\\ne0$. <b>Which of the following are true?</b>",
      fr: "On considère l’inéquation $x^2-3x+2<\\dfrac{x-1}{x}$ pour $x$ réel non nul. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la inecuación $x^2-3x+2<\\dfrac{x-1}{x}$ con $x$ real no nulo. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x\\ne0$ に対する不等式 $x^2-3x+2<\\dfrac{x-1}{x}$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑实数 $x\\ne0$ 的不等式 $x^2-3x+2<\\dfrac{x-1}{x}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y = x² − 3x + 2 and the hyperbola y = (x − 1)/x.",
      fr: "La parabole y = x² − 3x + 2 et l’hyperbole y = (x − 1)/x.",
      es: "La parábola y = x² − 3x + 2 y la hipérbola y = (x − 1)/x.",
      ja: "放物線 y = x² − 3x + 2 と双曲線 y = (x − 1)/x。",
      zh: "抛物线 y = x² − 3x + 2 与双曲线 y = (x − 1)/x。"
    },
    hint: {
      en: "Factor out $(x-1)$: the inequality becomes $(x-1)\\dfrac{x^2-2x-1}{x}<0$.",
      fr: "Mettez $(x-1)$ en facteur : on obtient $(x-1)\\dfrac{x^2-2x-1}{x}<0$.",
      es: "Saca factor común $(x-1)$: queda $(x-1)\\dfrac{x^2-2x-1}{x}<0$.",
      ja: "$(x-1)$ でくくると $(x-1)\\dfrac{x^2-2x-1}{x}<0$。",
      zh: "提出 $(x-1)$：得 $(x-1)\\dfrac{x^2-2x-1}{x}<0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 5.0, scale: 42, pad: 16 });
      const T = F.T = axes(F, -1.5, 3.5, -2.5, 2.5);
      plot(F, T, x => x * x - 3 * x + 2, -1.0, 3.5, 'graph', 'base', -2.5, 2.5);
      plot(F, T, x => (x - 1) / x, -1.5, -0.12, 'conic', 'base', -2.5, 2.5); plot(F, T, x => (x - 1) / x, 0.12, 3.5, 'conic', 'base', -2.5, 2.5);
      F.reveal = () => {
      F.seg(T([1 - Math.SQRT2, 0]), T([0, 0]), 'hl pink'); F.seg(T([1, 0]), T([1 + Math.SQRT2, 0]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "satisfies it": {"fr": "la vérifie", "es": "la cumple", "ja": "は満たす", "zh": "满足"},
      "only": {"fr": "seulement", "es": "solamente", "ja": "のみ", "zh": "仅"},
      "multiplying by": {"fr": "multiplier par", "es": "multiplicar por", "ja": "次を掛けると", "zh": "乘以"},
      "gives": {"fr": "donne", "es": "da", "ja": "で", "zh": "得"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "zeros": {"fr": "zéros", "es": "ceros", "ja": "零点", "zh": "零点"}
    },
    options: [
      { tex: "1-\\sqrt2<x<0\\ \\text{or}\\ 1<x<1+\\sqrt2", correct: true, why: {
        en: "Where the sign of $(x-1)(x^2-2x-1)/x$ is negative.",
        fr: "Là où $(x-1)(x^2-2x-1)/x$ est négatif.",
        es: "Donde $(x-1)(x^2-2x-1)/x$ es negativo.",
        ja: "$(x-1)(x^2-2x-1)/x$ が負の範囲。",
        zh: "$(x-1)(x^2-2x-1)/x$ 为负的范围。"
      } },
      { tex: "x=2\\ \\text{satisfies it}", correct: true, why: {
        en: "$0<\\tfrac12$",
        fr: "$0<\\tfrac12$",
        es: "$0<\\tfrac12$",
        ja: "$0<\\tfrac12$",
        zh: "$0<\\tfrac12$"
      } },
      { tex: "1<x<1+\\sqrt2\\ \\text{only}", correct: false, why: {
        en: "Misses negative $x$, e.g. $x=-0.2$: $2.64<6$.",
        fr: "Oublie les $x$ négatifs, par ex. $x=-0{,}2$ : $2{,}64<6$.",
        es: "Olvida los $x$ negativos, p. ej. $x=-0{,}2$: $2{,}64<6$.",
        ja: "負の $x$ を見落とす。例 $x=-0.2$：$2.64<6$。",
        zh: "漏了负数，如 $x=-0.2$：$2.64<6$。"
      } },
      { tex: "1-\\sqrt2<x<1+\\sqrt2", correct: false, why: {
        en: "$x=\\tfrac12$: $0.75<-1$ is false.",
        fr: "$x=\\tfrac12$ : $0{,}75<-1$ est faux.",
        es: "$x=\\tfrac12$: $0{,}75<-1$ es falso.",
        ja: "$x=\\tfrac12$：$0.75<-1$ は偽。",
        zh: "$x=\\tfrac12$：$0.75<-1$ 不成立。"
      } },
      { tex: "x<1-\\sqrt2\\ \\text{or}\\ x>1+\\sqrt2", correct: false, why: {
        en: "That is where the inequality fails (with $0<x<1$).",
        fr: "C’est là où l’inégalité est fausse (avec $0<x<1$).",
        es: "Ahí es donde falla (junto con $0<x<1$).",
        ja: "そこは不成立（$0<x<1$ も）。",
        zh: "那正是不成立的区域（以及 $0<x<1$）。"
      } },
      { tex: "1-\\sqrt2<x<0\\ \\text{only}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{multiplying by}\\ x\\ \\text{gives}\\ x^3-3x^2+2x<x-1\\ \\text{for all}\\ x\\ne0", correct: false, why: {
        en: "Multiplying by a negative $x$ reverses the inequality.",
        fr: "Multiplier par $x<0$ renverse l’inégalité.",
        es: "Multiplicar por $x<0$ invierte la desigualdad.",
        ja: "$x<0$ を掛けると不等号が逆になる。",
        zh: "乘以负数 $x$ 要变号。"
      } },
      { tex: "x=1\\ \\text{satisfies it}", correct: false, why: {
        en: "$0<0$",
        fr: "$0<0$",
        es: "$0<0$",
        ja: "$0<0$",
        zh: "$0<0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Common factor",
          fr: "Facteur commun",
          es: "Factor común",
          ja: "共通因数",
          zh: "公因式"
        },
        lines: ["(x-1)(x-2)-\\tfrac{x-1}{x}=(x-1)\\,\\dfrac{x^2-2x-1}{x}<0"],
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
        lines: ["\\text{zeros}:\\ 1-\\sqrt2,\\ 0,\\ 1,\\ 1+\\sqrt2\\Rightarrow (1-\\sqrt2,0)\\cup(1,1+\\sqrt2)"],
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
