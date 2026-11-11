/* calculus · A sequence that runs away and a log that stays low
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-bac-2025-true-false-limits-log",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 3",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 2 (18 juin 2025), exercice 3",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 2 (18 de junio de 2025), ejercicio 3",
        ja: "フランス・バカロレア 2025 数学専門 本土 2日目（2025年6月18日）第3問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第2天（2025年6月18日）第3题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "A sequence that runs away and a log that stays low",
      fr: "Une suite qui s’envole et un log qui reste bas",
      es: "Una sucesión que se dispara y un logaritmo que no sube",
      ja: "発散する数列と低く留まる対数",
      zh: "发散的数列与不超过的对数"
    },
    statement: {
      en: "Let $u_n=\\dfrac{1+5^n}{2+3^n}$ and $g(x)=\\ln x-x+1$ for $x>0$. <b>Which of the following are true?</b>",
      fr: "Soit $u_n=\\dfrac{1+5^n}{2+3^n}$ et $g(x)=\\ln x-x+1$ pour $x>0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $u_n=\\dfrac{1+5^n}{2+3^n}$ y $g(x)=\\ln x-x+1$ para $x>0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$u_n=\\dfrac{1+5^n}{2+3^n}$、$x>0$ で $g(x)=\\ln x-x+1$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $u_n=\\dfrac{1+5^n}{2+3^n}$，$x>0$ 时 $g(x)=\\ln x-x+1$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of ln x and the line y = x − 1, touching at (1, 0).",
      fr: "La courbe de ln x et la droite y = x − 1, tangentes en (1, 0).",
      es: "La gráfica de ln x y la recta y = x − 1, tangentes en (1, 0).",
      ja: "ln x のグラフと直線 y = x − 1。(1, 0) で接する。",
      zh: "ln x 的图像与直线 y = x − 1，在 (1, 0) 相切。"
    },
    hint: {
      en: "Divide top and bottom of $u_n$ by $3^n$. For $g$: $g'(x)=\\tfrac{1-x}{x}$.",
      fr: "Divisez numérateur et dénominateur de $u_n$ par $3^n$. Pour $g$ : $g'(x)=\\tfrac{1-x}{x}$.",
      es: "Divide numerador y denominador de $u_n$ entre $3^n$. Para $g$: $g'(x)=\\tfrac{1-x}{x}$.",
      ja: "$u_n$ の分子分母を $3^n$ で割る。$g'(x)=\\tfrac{1-x}{x}$。",
      zh: "$u_n$ 分子分母同除以 $3^n$；$g'(x)=\\tfrac{1-x}{x}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.5, h: 4.0, scale: 56, pad: 16 });
      const T = F.T = axes(F, -0.5, 4.0, -2.5, 1.5);
      plot(F, T, Math.log, 0.09, 3.9, 'graph', 'base', -2.5, 1.5);
      F.seg(T([-0.4, -1.4]), T([2.5, 1.5]), 'seg thin dashc');
      F.reveal = () => {
      F.dot(T([1, 0])); F.text(T([1, 0]), '(1, 0)', 'len small', 14, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(1, 0)": {"fr": "(1, 0)", "es": "(1, 0)", "ja": "(1, 0)", "zh": "(1, 0)"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "has a minimum at": {"fr": "a un minimum en", "es": "tiene un mínimo en", "ja": "は次で最小：", "zh": "在下列处取最小值"},
      "is bounded": {"fr": "est bornée", "es": "está acotada", "ja": "は有界", "zh": "有界"},
      "on": {"fr": "sur", "es": "en", "ja": "区間", "zh": "在"}
    },
    options: [
      { tex: "\\lim u_n=+\\infty", correct: true, why: {
        en: "$u_n=\\dfrac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty$",
        fr: "$u_n=\\dfrac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty$",
        es: "$u_n=\\dfrac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty$",
        ja: "$u_n=\\dfrac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty$",
        zh: "$u_n=\\dfrac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty$"
      } },
      { tex: "g(x)\\le0\\ \\text{for all}\\ x>0", correct: true, why: {
        en: "$\\max g=g(1)=0$",
        fr: "$\\max g=g(1)=0$",
        es: "$\\max g=g(1)=0$",
        ja: "$\\max g=g(1)=0$",
        zh: "$\\max g=g(1)=0$"
      } },
      { tex: "\\lim u_n=\\tfrac53", correct: false, why: {
        en: "The ratio is raised to the power $n$: $(5/3)^n\\to\\infty$.",
        fr: "Le rapport est à la puissance $n$ : $(5/3)^n\\to\\infty$.",
        es: "La razón va elevada a $n$: $(5/3)^n\\to\\infty$.",
        ja: "比は $n$ 乗される。",
        zh: "比值是 $n$ 次方。"
      } },
      { tex: "\\lim u_n=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "g(x)\\ge0\\ \\text{for all}\\ x>0", correct: false, why: {
        en: "$g(e)=2-e<0$",
        fr: "$g(e)=2-e<0$",
        es: "$g(e)=2-e<0$",
        ja: "$g(e)=2-e<0$",
        zh: "$g(e)=2-e<0$"
      } },
      { tex: "g\\ \\text{has a minimum at}\\ x=1", correct: false, why: {
        en: "$g'$ changes from $+$ to $-$: a maximum.",
        fr: "$g'$ passe de $+$ à $-$ : un maximum.",
        es: "$g'$ pasa de $+$ a $-$: un máximo.",
        ja: "$g'$ は $+$ から $-$。最大。",
        zh: "$g'$ 由正变负：最大值。"
      } },
      { tex: "\\ln x\\ge x-1\\ \\text{for all}\\ x>0", correct: false, why: {
        en: "Reversed: $\\ln x\\le x-1$.",
        fr: "Inversé : $\\ln x\\le x-1$.",
        es: "Al revés: $\\ln x\\le x-1$.",
        ja: "逆。$\\ln x\\le x-1$。",
        zh: "反了：$\\ln x\\le x-1$。"
      } },
      { tex: "(u_n)\\ \\text{is bounded}", correct: false, why: {
        en: "It tends to $+\\infty$.",
        fr: "Elle tend vers $+\\infty$.",
        es: "Tiende a $+\\infty$.",
        ja: "$+\\infty$ に発散。",
        zh: "趋于 $+\\infty$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Divide by 3ⁿ",
          fr: "Diviser par 3ⁿ",
          es: "Dividir entre 3ⁿ",
          ja: "3ⁿ で割る",
          zh: "除以 3ⁿ"
        },
        lines: ["u_n=\\frac{3^{-n}+(5/3)^n}{2\\cdot3^{-n}+1}\\to+\\infty"],
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
          en: "Study g",
          fr: "Étudier g",
          es: "Estudiar g",
          ja: "g を調べる",
          zh: "研究 g"
        },
        lines: ["g'(x)=\\frac{1-x}{x}:\\ +\\ \\text{on}\\ (0,1),\\ -\\ \\text{on}\\ (1,\\infty),\\quad g(1)=0"],
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
