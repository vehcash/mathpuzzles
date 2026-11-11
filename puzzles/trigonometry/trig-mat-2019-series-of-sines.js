/* trigonometry · sin² + sin⁴ + sin⁶ + …
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2019-series-of-sines",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2019 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "sin² + sin⁴ + sin⁶ + …",
      fr: "sin² + sin⁴ + sin⁶ + …",
      es: "sen² + sen⁴ + sen⁶ + …",
      ja: "sin² + sin⁴ + sin⁶ + …",
      zh: "sin² + sin⁴ + sin⁶ + …"
    },
    statement: {
      en: "Let $y=\\sin^2x+\\sin^4x+\\sin^6x+\\cdots$ wherever this infinite sum converges. <b>Which of the following are true?</b>",
      fr: "Soit $y=\\sin^2x+\\sin^4x+\\sin^6x+\\cdots$ là où cette somme infinie converge. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $y=\\sin^2x+\\sin^4x+\\sin^6x+\\cdots$ donde esta suma infinita converge. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "この無限和が収束するところで $y=\\sin^2x+\\sin^4x+\\sin^6x+\\cdots$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "在无穷级数收敛处令 $y=\\sin^2x+\\sin^4x+\\sin^6x+\\cdots$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes from 0° to 360° with 90°, 180° and 270° marked. The graph of the sum is drawn in the solution.",
      fr: "Axes de 0° à 360° avec 90°, 180° et 270° marqués. La courbe de la somme est tracée dans la solution.",
      es: "Ejes de 0° a 360° con 90°, 180° y 270° marcados. La gráfica de la suma se dibuja en la solución.",
      ja: "0° から 360° の座標軸（90°, 180°, 270° に目盛り）。和のグラフは解答で描きます。",
      zh: "0° 到 360° 的坐标轴，标出 90°、180°、270°。和的图像在解答中画出。"
    },
    hint: {
      en: "It is geometric with first term and ratio $\\sin^2x$.",
      fr: "C’est une série géométrique de premier terme et de raison $\\sin^2x$.",
      es: "Es geométrica con primer término y razón $\\sin^2x$.",
      ja: "初項も公比も $\\sin^2x$ の等比級数。",
      zh: "首项与公比都是 $\\sin^2x$ 的等比级数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 3.4, scale: 46, pad: 18 });
      const T = F.T = axes(F, -0.2, 6.4, -0.3, 3.1);
      F.text(T([Math.PI / 2, 0]), '90°', 'tick', 0, 14); F.text(T([Math.PI, 0]), '180°', 'tick', 0, 14); F.text(T([1.5 * Math.PI, 0]), '270°', 'tick', 0, 14);
      F.reveal = () => {
      const t2 = x => Math.tan(x) ** 2;
      plot(F, T, t2, 0, 1.33, 'graph', 'base', -0.3, 3.0); plot(F, T, t2, 1.81, 4.47, 'graph', 'base', -0.3, 3.0); plot(F, T, t2, 4.95, 6.28, 'graph', 'base', -0.3, 3.0);
      [Math.PI / 2, 1.5 * Math.PI].forEach(x => F.seg(T([x, 0]), T([x, 3.0]), 'seg thin dashc'));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "wherever the sum converges": {"fr": "là où la somme converge", "es": "donde la suma converge", "ja": "（和が収束するところで）", "zh": "（在级数收敛处）"},
      "the sum diverges at": {"fr": "la somme diverge en", "es": "la suma diverge en", "ja": "和は次で発散：", "zh": "级数发散于"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "the graph has period": {"fr": "la courbe a pour période", "es": "la gráfica tiene periodo", "ja": "グラフの周期は", "zh": "图像周期为"},
      "but not": {"fr": "mais pas", "es": "pero no", "ja": "で、次ではない：", "zh": "但不是"},
      "undefined where": {"fr": "non défini où", "es": "no definido donde", "ja": "定義されないのは", "zh": "无定义于"}
    },
    options: [
      { tex: "y=\\tan^2x\\ \\text{wherever the sum converges}", correct: true, why: {
        en: "$\\dfrac{\\sin^2x}{1-\\sin^2x}=\\dfrac{\\sin^2x}{\\cos^2x}$.",
        fr: "$\\dfrac{\\sin^2x}{1-\\sin^2x}=\\dfrac{\\sin^2x}{\\cos^2x}$.",
        es: "$\\dfrac{\\sin^2x}{1-\\sin^2x}=\\dfrac{\\sin^2x}{\\cos^2x}$.",
        ja: "$\\dfrac{\\sin^2x}{1-\\sin^2x}=\\dfrac{\\sin^2x}{\\cos^2x}$.",
        zh: "$\\dfrac{\\sin^2x}{1-\\sin^2x}=\\dfrac{\\sin^2x}{\\cos^2x}$."
      } },
      { tex: "\\text{the sum diverges at } x=90^\\circ", correct: true, why: {
        en: "There the ratio is $\\sin^2x=1$.",
        fr: "La raison y vaut $\\sin^2x=1$.",
        es: "Allí la razón es $\\sin^2x=1$.",
        ja: "そこで公比 $\\sin^2x=1$。",
        zh: "此时公比 $\\sin^2x=1$。"
      } },
      { tex: "y=\\dfrac{\\sin^2x}{1+\\sin^2x}", correct: false, why: {
        en: "Sign error in the geometric sum.",
        fr: "Erreur de signe dans la somme géométrique.",
        es: "Error de signo en la suma geométrica.",
        ja: "等比級数の和の符号ミス。",
        zh: "等比和符号错。"
      } },
      { tex: "y\\le1\\ \\text{for all } x", correct: false, why: {
        en: "$\\tan^2 60^\\circ=3$.",
        fr: "$\\tan^2 60^\\circ=3$.",
        es: "$\\tan^2 60^\\circ=3$.",
        ja: "$\\tan^2 60^\\circ=3$。",
        zh: "$\\tan^2 60^\\circ=3$。"
      } },
      { tex: "y(30^\\circ)=\\tfrac12", correct: false, why: {
        en: "$\\tan^230^\\circ=\\tfrac13$.",
        fr: "$\\tan^230^\\circ=\\tfrac13$.",
        es: "$\\tan^230^\\circ=\\tfrac13$.",
        ja: "$\\tan^230^\\circ=\\tfrac13$.",
        zh: "$\\tan^230^\\circ=\\tfrac13$."
      } },
      { tex: "y=\\sec^2x", correct: false, why: {
        en: "$\\sec^2x=1+\\tan^2x$; off by $1$.",
        fr: "$\\sec^2x=1+\\tan^2x$; off by $1$.",
        es: "$\\sec^2x=1+\\tan^2x$; off by $1$.",
        ja: "$\\sec^2x=1+\\tan^2x$; off by $1$.",
        zh: "$\\sec^2x=1+\\tan^2x$; off by $1$."
      } },
      { tex: "y(0)=1", correct: false, why: {
        en: "Every term is $0$ at $x=0$.",
        fr: "Tous les termes sont nuls en $x=0$.",
        es: "Todos los términos son $0$ en $x=0$.",
        ja: "$x=0$ で全項 $0$。",
        zh: "$x=0$ 时每项都为 $0$。"
      } },
      { tex: "\\text{the graph has period } 360^\\circ \\text{ but not } 180^\\circ", correct: false, why: {
        en: "$\\tan^2$ has period $180^\\circ$.",
        fr: "$\\tan^2$ est de période $180^\\circ$.",
        es: "$\\tan^2$ tiene periodo $180^\\circ$.",
        ja: "$\\tan^2$ の周期は $180^\\circ$。",
        zh: "$\\tan^2$ 周期为 $180^\\circ$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Geometric sum",
          fr: "Somme géométrique",
          es: "Suma geométrica",
          ja: "等比級数の和",
          zh: "等比求和"
        },
        lines: ["\\sum_{n\\ge1}(\\sin^2x)^n=\\frac{\\sin^2x}{1-\\sin^2x}\\quad(\\sin^2x<1)"],
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
          en: "Simplify",
          fr: "Simplifier",
          es: "Simplificar",
          ja: "簡単に",
          zh: "化简"
        },
        lines: ["\\frac{\\sin^2x}{\\cos^2x}=\\tan^2x,\\qquad\\text{undefined where }\\cos x=0"],
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
