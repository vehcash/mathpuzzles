/* calculus · A wall painted in two colours
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-evau-2025-painted-wall",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 2",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 2",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 2",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 2",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "A wall painted in two colours",
      fr: "Un mur peint en deux couleurs",
      es: "Un muro pintado en dos colores",
      ja: "2色に塗り分けた壁",
      zh: "涂成两种颜色的墙"
    },
    statement: {
      en: "A wall $12$ m long and $3$ m high, with its bottom-left corner at the origin, is split by the curve $f(x)=\\cos\\frac{\\pi x}{9}+2$, $0\\le x\\le12$. A spray can covers $3\\ \\mathrm{m}^2$. <b>Which of the following are true?</b>",
      fr: "Un mur de $12$ m de long et $3$ m de haut, coin inférieur gauche à l’origine, est partagé par la courbe $f(x)=\\cos\\frac{\\pi x}{9}+2$, $0\\le x\\le12$. Une bombe de peinture couvre $3\\ \\mathrm{m}^2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un muro de $12$ m de largo y $3$ m de alto, con la esquina inferior izquierda en el origen, se divide con la curva $f(x)=\\cos\\frac{\\pi x}{9}+2$, $0\\le x\\le12$. Un bote de spray pinta $3\\ \\mathrm{m}^2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "長さ $12$ m、高さ $3$ m の壁（左下の角が原点）を曲線 $f(x)=\\cos\\frac{\\pi x}{9}+2$（$0\\le x\\le12$）で分けます。スプレー1本で $3\\ \\mathrm{m}^2$ 塗れます。<b>次のうち正しいものはどれですか？</b>",
      zh: "长 $12$ m、高 $3$ m 的墙（左下角在原点）被曲线 $f(x)=\\cos\\frac{\\pi x}{9}+2$（$0\\le x\\le12$）分开。一罐喷漆可涂 $3\\ \\mathrm{m}^2$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The 12 × 3 wall with the wavy curve across it; the part below the curve is shaded.",
      fr: "Le mur 12 × 3 traversé par la courbe ondulée ; la partie sous la courbe est ombrée.",
      es: "El muro de 12 × 3 cruzado por la curva ondulada; la parte bajo la curva está sombreada.",
      ja: "12 × 3 の壁と波形の曲線。曲線の下に影。",
      zh: "12 × 3 的墙与波浪曲线，曲线下方阴影。"
    },
    hint: {
      en: "$\\displaystyle\\int_0^{12}\\Bigl(\\cos\\tfrac{\\pi x}9+2\\Bigr)dx=\\Bigl[\\tfrac9\\pi\\sin\\tfrac{\\pi x}9+2x\\Bigr]_0^{12}$, and $\\sin\\tfrac{4\\pi}3=-\\tfrac{\\sqrt3}2$.",
      fr: "$\\displaystyle\\int_0^{12}\\Bigl(\\cos\\tfrac{\\pi x}9+2\\Bigr)dx=\\Bigl[\\tfrac9\\pi\\sin\\tfrac{\\pi x}9+2x\\Bigr]_0^{12}$, et $\\sin\\tfrac{4\\pi}3=-\\tfrac{\\sqrt3}2$.",
      es: "$\\displaystyle\\int_0^{12}\\Bigl(\\cos\\tfrac{\\pi x}9+2\\Bigr)dx=\\Bigl[\\tfrac9\\pi\\sin\\tfrac{\\pi x}9+2x\\Bigr]_0^{12}$, y $\\sin\\tfrac{4\\pi}3=-\\tfrac{\\sqrt3}2$.",
      ja: "$\\displaystyle\\int_0^{12}\\Bigl(\\cos\\tfrac{\\pi x}9+2\\Bigr)dx=\\Bigl[\\tfrac9\\pi\\sin\\tfrac{\\pi x}9+2x\\Bigr]_0^{12}$、$\\sin\\tfrac{4\\pi}3=-\\tfrac{\\sqrt3}2$。",
      zh: "$\\displaystyle\\int_0^{12}\\Bigl(\\cos\\tfrac{\\pi x}9+2\\Bigr)dx=\\Bigl[\\tfrac9\\pi\\sin\\tfrac{\\pi x}9+2x\\Bigr]_0^{12}$，$\\sin\\tfrac{4\\pi}3=-\\tfrac{\\sqrt3}2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 13.0, h: 4.0, scale: 30, pad: 16 });
      const T = F.T = axes(F, -0.5, 12.5, -0.5, 3.5);
      const f = x => Math.cos(Math.PI * x / 9) + 2;
      const reg = [T([0, 0])]; for (let k = 0; k <= 60; k++) reg.push(T([12 * k / 60, f(12 * k / 60)])); reg.push(T([12, 0]));
      F.path(reg, 'fill-blue', 'fills', true);
      F.path([T([0, 0]), T([12, 0]), T([12, 3]), T([0, 3])], 'seg', 'base', true);
      plot(F, T, f, 0, 12, 'graph', 'base', -0.5, 3.5);
      F.reveal = () => {
      F.dot(T([9, 1])); F.text(T([9, 1]), 'min 1', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "min 1": {"fr": "min 1", "es": "mín 1", "ja": "最小 1", "zh": "最小 1"},
      "area below": {"fr": "aire en dessous", "es": "área bajo la curva", "ja": "曲線の下の面積", "zh": "曲线下方面积"},
      "cans are needed for the lower part": {"fr": "bombes sont nécessaires pour la partie basse", "es": "botes hacen falta para la parte de abajo", "ja": "本が下側に必要", "zh": "罐用于下方部分"},
      "cans are enough for the lower part": {"fr": "bombes suffisent pour la partie basse", "es": "botes bastan para la parte de abajo", "ja": "本で下側に足りる", "zh": "罐足够涂下方部分"},
      "area above": {"fr": "aire au-dessus", "es": "área sobre la curva", "ja": "曲線の上の面積", "zh": "曲线上方面积"},
      "the curve leaves the wall somewhere": {"fr": "la courbe sort du mur quelque part", "es": "la curva se sale del muro en algún punto", "ja": "曲線は壁からはみ出す", "zh": "曲线在某处超出墙面"},
      "the minimum of": {"fr": "le minimum de", "es": "el mínimo de", "ja": "次の最小値", "zh": "的最小值"},
      "is at": {"fr": "est atteint en", "es": "está en", "ja": "の位置", "zh": "在"}
    },
    options: [
      { tex: "\\text{area below}=24-\\tfrac{9\\sqrt3}{2\\pi}\\approx21.52\\ \\mathrm{m}^2", correct: true, why: {
        en: "$2\\cdot12+\\tfrac9\\pi\\sin\\tfrac{4\\pi}3$",
        fr: "$2\\cdot12+\\tfrac9\\pi\\sin\\tfrac{4\\pi}3$",
        es: "$2\\cdot12+\\tfrac9\\pi\\sin\\tfrac{4\\pi}3$",
        ja: "$2\\cdot12+\\tfrac9\\pi\\sin\\tfrac{4\\pi}3$",
        zh: "$2\\cdot12+\\tfrac9\\pi\\sin\\tfrac{4\\pi}3$"
      } },
      { tex: "8\\ \\text{cans are needed for the lower part}", correct: true, why: {
        en: "$21.52/3\\approx7.17\\Rightarrow8$",
        fr: "$21.52/3\\approx7.17\\Rightarrow8$",
        es: "$21.52/3\\approx7.17\\Rightarrow8$",
        ja: "$21.52/3\\approx7.17\\Rightarrow8$",
        zh: "$21.52/3\\approx7.17\\Rightarrow8$"
      } },
      { tex: "7\\ \\text{cans are enough for the lower part}", correct: false, why: {
        en: "$7\\cdot3=21<21.52$",
        fr: "$7\\cdot3=21<21.52$",
        es: "$7\\cdot3=21<21.52$",
        ja: "$7\\cdot3=21<21.52$",
        zh: "$7\\cdot3=21<21.52$"
      } },
      { tex: "\\text{area below}=24\\ \\mathrm{m}^2", correct: false, why: {
        en: "The cosine part does not cancel over $[0,12]$.",
        fr: "La partie cosinus ne s’annule pas sur $[0,12]$.",
        es: "La parte del coseno no se anula en $[0,12]$.",
        ja: "$[0,12]$ では余弦部分は打ち消されない。",
        zh: "余弦部分在 $[0,12]$ 上不抵消。"
      } },
      { tex: "\\text{area above}\\approx21.52\\ \\mathrm{m}^2", correct: false, why: {
        en: "$36-21.52\\approx14.48$",
        fr: "$36-21.52\\approx14.48$",
        es: "$36-21.52\\approx14.48$",
        ja: "$36-21.52\\approx14.48$",
        zh: "$36-21.52\\approx14.48$"
      } },
      { tex: "\\text{the curve leaves the wall somewhere}", correct: false, why: {
        en: "$1\\le f(x)\\le3$",
        fr: "$1\\le f(x)\\le3$",
        es: "$1\\le f(x)\\le3$",
        ja: "$1\\le f(x)\\le3$",
        zh: "$1\\le f(x)\\le3$"
      } },
      { tex: "\\text{the minimum of}\\ f\\ \\text{is at}\\ x=12", correct: false, why: {
        en: "$\\cos\\tfrac{\\pi x}9=-1\\iff x=9$",
        fr: "$\\cos\\tfrac{\\pi x}9=-1\\iff x=9$",
        es: "$\\cos\\tfrac{\\pi x}9=-1\\iff x=9$",
        ja: "$\\cos\\tfrac{\\pi x}9=-1\\iff x=9$",
        zh: "$\\cos\\tfrac{\\pi x}9=-1\\iff x=9$"
      } },
      { tex: "\\text{area below}=24+\\tfrac{9\\sqrt3}{2\\pi}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Bounds of f",
          fr: "Bornes de f",
          es: "Cotas de f",
          ja: "f の範囲",
          zh: "f 的范围"
        },
        lines: ["\\max f=f(0)=3,\\quad\\min f=f(9)=1"],
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
          en: "Area and cans",
          fr: "Aire et bombes",
          es: "Área y botes",
          ja: "面積と本数",
          zh: "面积与罐数"
        },
        lines: ["\\int_0^{12}f=24-\\frac{9\\sqrt3}{2\\pi}\\approx21.52,\\qquad \\lceil21.52/3\\rceil=8"],
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
