/* calculus · One integral from its partner
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2022b-integral-from-a-partner",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question J",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question J",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta J",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 J",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 J 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "One integral from its partner",
      fr: "Une intégrale à partir de sa jumelle",
      es: "Una integral a partir de su compañera",
      ja: "相棒の積分から求める",
      zh: "由“搭档”积分求另一个"
    },
    statement: {
      en: "Let $A=\\displaystyle\\int_1^2\\frac{x^2}{1+x^4}\\,dx$ and $B=\\displaystyle\\int_1^2\\frac{x^{-2}}{1+x^4}\\,dx$. <b>Which of the following are true?</b>",
      fr: "Soit $A=\\displaystyle\\int_1^2\\frac{x^2}{1+x^4}\\,dx$ et $B=\\displaystyle\\int_1^2\\frac{x^{-2}}{1+x^4}\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $A=\\displaystyle\\int_1^2\\frac{x^2}{1+x^4}\\,dx$ y $B=\\displaystyle\\int_1^2\\frac{x^{-2}}{1+x^4}\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A=\\displaystyle\\int_1^2\\frac{x^2}{1+x^4}\\,dx$、$B=\\displaystyle\\int_1^2\\frac{x^{-2}}{1+x^4}\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $A=\\displaystyle\\int_1^2\\frac{x^2}{1+x^4}\\,dx$，$B=\\displaystyle\\int_1^2\\frac{x^{-2}}{1+x^4}\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of x²/(1 + x⁴) and x⁻²/(1 + x⁴) on [1, 2].",
      fr: "Les graphes de x²/(1 + x⁴) et x⁻²/(1 + x⁴) sur [1, 2].",
      es: "Las gráficas de x²/(1 + x⁴) y x⁻²/(1 + x⁴) en [1, 2].",
      ja: "[1, 2] 上の x²/(1 + x⁴) と x⁻²/(1 + x⁴) のグラフ。",
      zh: "[1, 2] 上 x²/(1 + x⁴) 与 x⁻²/(1 + x⁴) 的图像。"
    },
    hint: {
      en: "Add the two integrands: $\\dfrac{x^2+x^{-2}}{1+x^4}$ simplifies a lot.",
      fr: "Additionnez les deux intégrandes : $\\dfrac{x^2+x^{-2}}{1+x^4}$ se simplifie beaucoup.",
      es: "Suma los dos integrandos: $\\dfrac{x^2+x^{-2}}{1+x^4}$ se simplifica mucho.",
      ja: "2つの被積分関数を足すと $\\dfrac{x^2+x^{-2}}{1+x^4}$ が簡単になる。",
      zh: "把两个被积函数相加，$\\dfrac{x^2+x^{-2}}{1+x^4}$ 大为化简。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 50, pad: 16 });
      const S = ([x, y]) => [(x - 0.6) * 3.0, y * 2.6 + 0.3];
      F.seg(S([0.6, 0]), S([2.25, 0]), 'axis'); F.seg(S([1, 0]), S([1, 1.1]), 'seg thin dashc'); F.seg(S([2, 0]), S([2, 1.1]), 'seg thin dashc');
      F.text(S([1, 0]), '1', 'tick', 0, 14); F.text(S([2, 0]), '2', 'tick', 0, 14);
      plot(F, S, x => x * x / (1 + x ** 4), 0.7, 2.2, 'graph'); plot(F, S, x => 1 / (x * x * (1 + x ** 4)), 0.85, 2.2, 'conic');
      F.text(S([1.5, 0.46]), 'A', 'pt', 0, -6); F.text(S([1.3, 0.1]), 'B', 'pt', 0, 0);
      F.reveal = () => {
      plot(F, S, x => 1 / (x * x), 0.92, 2.2, 'hl pink'); F.text(S([1.15, 0.9]), 'A+B', 'len small', 22, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "A+B": {"fr": "A+B", "es": "A+B", "ja": "A+B", "zh": "A+B"},
      "turns": {"fr": "transforme", "es": "convierte", "ja": "は", "zh": "把"},
      "into": {"fr": "en", "es": "en", "ja": "を次に変える：", "zh": "变成"}
    },
    options: [
      { tex: "B=\\tfrac12-A", correct: true, why: {
        en: "$A+B=\\int_1^2x^{-2}\\,dx=\\tfrac12$",
        fr: "$A+B=\\int_1^2x^{-2}\\,dx=\\tfrac12$",
        es: "$A+B=\\int_1^2x^{-2}\\,dx=\\tfrac12$",
        ja: "$A+B=\\int_1^2x^{-2}\\,dx=\\tfrac12$",
        zh: "$A+B=\\int_1^2x^{-2}\\,dx=\\tfrac12$"
      } },
      { tex: "\\dfrac{x^{-2}}{1+x^4}=\\dfrac1{x^2}-\\dfrac{x^2}{1+x^4}", correct: true, why: {
        en: "$\\dfrac{1+x^4-x^4}{x^2(1+x^4)}$",
        fr: "$\\dfrac{1+x^4-x^4}{x^2(1+x^4)}$",
        es: "$\\dfrac{1+x^4-x^4}{x^2(1+x^4)}$",
        ja: "$\\dfrac{1+x^4-x^4}{x^2(1+x^4)}$",
        zh: "$\\dfrac{1+x^4-x^4}{x^2(1+x^4)}$"
      } },
      { tex: "B=1-A", correct: false, why: {
        en: "$\\int_1^2x^{-2}dx=\\tfrac12$, not $1$.",
        fr: "$\\int_1^2x^{-2}dx=\\tfrac12$, pas $1$.",
        es: "$\\int_1^2x^{-2}dx=\\tfrac12$, no $1$.",
        ja: "$\\int_1^2x^{-2}dx=\\tfrac12$ で $1$ ではない。",
        zh: "$\\int_1^2x^{-2}dx=\\tfrac12$，不是 $1$。"
      } },
      { tex: "B=-A", correct: false, why: {
        en: "$A>0,\\ B>0$",
        fr: "$A>0,\\ B>0$",
        es: "$A>0,\\ B>0$",
        ja: "$A>0,\\ B>0$",
        zh: "$A>0,\\ B>0$"
      } },
      { tex: "B=\\tfrac1A", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "B=A-1", correct: false, why: {
        en: "$A<1$, so this would be negative.",
        fr: "$A<1$, ce serait négatif.",
        es: "$A<1$, sería negativo.",
        ja: "$A<1$ なので負になる。",
        zh: "$A<1$，会是负数。"
      } },
      { tex: "B>A", correct: false, why: {
        en: "On $[1,2]$, $x^{-2}\\le x^2$, so $B\\le A$.",
        fr: "Sur $[1,2]$, $x^{-2}\\le x^2$, donc $B\\le A$.",
        es: "En $[1,2]$, $x^{-2}\\le x^2$, luego $B\\le A$.",
        ja: "$[1,2]$ で $x^{-2}\\le x^2$ より $B\\le A$。",
        zh: "在 $[1,2]$ 上 $x^{-2}\\le x^2$，故 $B\\le A$。"
      } },
      { tex: "x=\\tfrac1t\\ \\text{turns}\\ B\\ \\text{into}\\ A", correct: false, why: {
        en: "It turns $B$ into $\\int_{1/2}^1\\frac{t^4}{1+t^4}dt$, a different integral.",
        fr: "Elle transforme $B$ en $\\int_{1/2}^1\\frac{t^4}{1+t^4}dt$, autre intégrale.",
        es: "Convierte $B$ en $\\int_{1/2}^1\\frac{t^4}{1+t^4}dt$, otra integral.",
        ja: "$B$ は $\\int_{1/2}^1\\frac{t^4}{1+t^4}dt$ になり、$A$ ではない。",
        zh: "它把 $B$ 变成 $\\int_{1/2}^1\\frac{t^4}{1+t^4}dt$，并非 $A$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Add the integrands",
          fr: "Additionner les intégrandes",
          es: "Sumar los integrandos",
          ja: "被積分関数を足す",
          zh: "被积函数相加"
        },
        lines: ["\\dfrac{x^2+x^{-2}}{1+x^4}=\\dfrac{x^4+1}{x^2(1+x^4)}=\\dfrac1{x^2}"],
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
          ja: "積分する",
          zh: "积分"
        },
        lines: ["A+B=\\Big[-\\tfrac1x\\Big]_1^2=\\tfrac12"],
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
