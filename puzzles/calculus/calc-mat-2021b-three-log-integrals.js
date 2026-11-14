/* calculus · Three integrals of logs of trig functions
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2021b-three-log-integrals",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question I",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question I",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta I",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 I",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Three integrals of logs of trig functions",
      fr: "Trois intégrales de logarithmes de fonctions trigonométriques",
      es: "Tres integrales de logaritmos de funciones trigonométricas",
      ja: "三角関数の対数の3つの積分",
      zh: "三角函数对数的三个积分"
    },
    statement: {
      en: "For some $a<b$ and base $c>0$: $\\displaystyle\\int_a^b\\log_c(\\sin^4x\\tan^2x)\\,dx=1$ and $\\displaystyle\\int_a^b\\log_c(\\sin^2x\\cos^2x)\\,dx=3$. Let $I=\\displaystyle\\int_a^b\\log_c(\\sin^4x\\cos^2x)\\,dx$. <b>Which of the following are true?</b>",
      fr: "Pour certains $a<b$ et une base $c>0$ : $\\displaystyle\\int_a^b\\log_c(\\sin^4x\\tan^2x)\\,dx=1$ et $\\displaystyle\\int_a^b\\log_c(\\sin^2x\\cos^2x)\\,dx=3$. Soit $I=\\displaystyle\\int_a^b\\log_c(\\sin^4x\\cos^2x)\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para ciertos $a<b$ y base $c>0$: $\\displaystyle\\int_a^b\\log_c(\\sin^4x\\tan^2x)\\,dx=1$ y $\\displaystyle\\int_a^b\\log_c(\\sin^2x\\cos^2x)\\,dx=3$. Sea $I=\\displaystyle\\int_a^b\\log_c(\\sin^4x\\cos^2x)\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "ある $a<b$ と底 $c>0$ で $\\displaystyle\\int_a^b\\log_c(\\sin^4x\\tan^2x)\\,dx=1$、$\\displaystyle\\int_a^b\\log_c(\\sin^2x\\cos^2x)\\,dx=3$ です。$I=\\displaystyle\\int_a^b\\log_c(\\sin^4x\\cos^2x)\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对某些 $a<b$ 及底数 $c>0$，$\\displaystyle\\int_a^b\\log_c(\\sin^4x\\tan^2x)\\,dx=1$，$\\displaystyle\\int_a^b\\log_c(\\sin^2x\\cos^2x)\\,dx=3$。设 $I=\\displaystyle\\int_a^b\\log_c(\\sin^4x\\cos^2x)\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two unknown integrals S and C set up as a small linear system.",
      fr: "Deux intégrales inconnues S et C posées en petit système linéaire.",
      es: "Dos integrales desconocidas S y C planteadas como sistema lineal.",
      ja: "2つの未知の積分 S, C の連立1次方程式。",
      zh: "两个未知积分 S、C 组成的线性方程组。"
    },
    hint: {
      en: "Let $S=\\int\\log_c|\\sin x|$ and $C=\\int\\log_c|\\cos x|$. Every integral is a combination of $S$ and $C$.",
      fr: "Posez $S=\\int\\log_c|\\sin x|$ et $C=\\int\\log_c|\\cos x|$. Chaque intégrale combine $S$ et $C$.",
      es: "Sea $S=\\int\\log_c|\\sin x|$ y $C=\\int\\log_c|\\cos x|$. Cada integral combina $S$ y $C$.",
      ja: "$S=\\int\\log_c|\\sin x|$、$C=\\int\\log_c|\\cos x|$ とおくと、どの積分も $S,C$ の1次結合。",
      zh: "设 $S=\\int\\log_c|\\sin x|$，$C=\\int\\log_c|\\cos x|$，每个积分都是 $S,C$ 的线性组合。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.2, scale: 48, pad: 16 });
      F.text([2.5, 1.7], '6S − 2C = 1', 'pt', 0, 0); F.text([2.5, 1.0], '2S + 2C = 3', 'pt', 0, 0); F.text([2.5, 0.3], '4S + 2C = ?', 'pt', 0, 0);
      F.reveal = () => {
      F.text([4.4, 0.3], '= 4', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "6S − 2C = 1": {"fr": "6S − 2C = 1", "es": "6S − 2C = 1", "ja": "6S − 2C = 1", "zh": "6S − 2C = 1"},
      "2S + 2C = 3": {"fr": "2S + 2C = 3", "es": "2S + 2C = 3", "ja": "2S + 2C = 3", "zh": "2S + 2C = 3"},
      "4S + 2C = ?": {"fr": "4S + 2C = ?", "es": "4S + 2C = ?", "ja": "4S + 2C = ?", "zh": "4S + 2C = ?"},
      "= 4": {"fr": "= 4", "es": "= 4", "ja": "= 4", "zh": "= 4"},
      "depends on": {"fr": "dépend de", "es": "depende de", "ja": "は次に依存：", "zh": "依赖于"}
    },
    options: [
      { tex: "I=4", correct: true, why: {
        en: "$S=\\tfrac12,\\ C=1:\\ 4S+2C=4$",
        fr: "$S=\\tfrac12,\\ C=1:\\ 4S+2C=4$",
        es: "$S=\\tfrac12,\\ C=1:\\ 4S+2C=4$",
        ja: "$S=\\tfrac12,\\ C=1:\\ 4S+2C=4$",
        zh: "$S=\\tfrac12,\\ C=1:\\ 4S+2C=4$"
      } },
      { tex: "I=3", correct: false, why: {
        en: "That is the second integral, with $\\sin^2$ instead of $\\sin^4$.",
        fr: "C’est la deuxième intégrale, avec $\\sin^2$ au lieu de $\\sin^4$.",
        es: "Es la segunda integral, con $\\sin^2$ en lugar de $\\sin^4$.",
        ja: "2つ目の積分（$\\sin^4$ でなく $\\sin^2$）。",
        zh: "那是第二个积分（$\\sin^2$ 而非 $\\sin^4$）。"
      } },
      { tex: "I=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I\\ \\text{depends on}\\ c", correct: false, why: {
        en: "The two given values already fix $S$ and $C$.",
        fr: "Les deux valeurs données fixent déjà $S$ et $C$.",
        es: "Los dos datos ya fijan $S$ y $C$.",
        ja: "与えられた2つの値で $S,C$ は決まる。",
        zh: "两个已知值已确定 $S$ 与 $C$。"
      } },
      { tex: "\\log_c(\\sin^4x\\tan^2x)=6\\log_c|\\sin x|-2\\log_c|\\cos x|", correct: true, why: {
        en: "$\\sin^4x\\cdot\\tfrac{\\sin^2x}{\\cos^2x}$",
        fr: "$\\sin^4x\\cdot\\tfrac{\\sin^2x}{\\cos^2x}$",
        es: "$\\sin^4x\\cdot\\tfrac{\\sin^2x}{\\cos^2x}$",
        ja: "$\\sin^4x\\cdot\\tfrac{\\sin^2x}{\\cos^2x}$",
        zh: "$\\sin^4x\\cdot\\tfrac{\\sin^2x}{\\cos^2x}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Linear system",
          fr: "Système linéaire",
          es: "Sistema lineal",
          ja: "連立1次方程式",
          zh: "线性方程组"
        },
        lines: ["6S-2C=1,\\qquad 2S+2C=3\\Rightarrow S=\\tfrac12,\\ C=1"],
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
          en: "The third integral",
          fr: "La troisième intégrale",
          es: "La tercera integral",
          ja: "3つ目の積分",
          zh: "第三个积分"
        },
        lines: ["I=4S+2C=2+2=4"],
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
