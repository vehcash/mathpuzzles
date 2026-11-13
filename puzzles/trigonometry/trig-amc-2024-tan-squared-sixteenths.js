/* trigonometry · Products of tan² at odd sixteenths of π
   AMC 12A 2024 (Mathematical Association of America), Problem 23 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-amc-2024-tan-squared-sixteenths",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 23",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 23",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 23",
        ja: "AMC 12A 2024（アメリカ数学協会）第23問",
        zh: "AMC 12A 2024（美国数学协会）第 23 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Products of tan² at odd sixteenths of π",
      fr: "Produits de tan² en seizièmes impairs de π",
      es: "Productos de tan² en dieciseisavos impares de π",
      ja: "π/16 の奇数倍での tan² の積",
      zh: "π/16 奇数倍处 tan² 的乘积"
    },
    statement: {
      en: "Let $t_k=\\tan^2\\frac{k\\pi}{16}$. <b>Which of the following equal $t_1t_3+t_1t_5+t_3t_7+t_5t_7$?</b>",
      fr: "Soit $t_k=\\tan^2\\frac{k\\pi}{16}$. <b>Lesquelles des valeurs suivantes sont égales à $t_1t_3+t_1t_5+t_3t_7+t_5t_7$ ?</b>",
      es: "Sea $t_k=\\tan^2\\frac{k\\pi}{16}$. <b>¿Cuáles de los siguientes valores son iguales a $t_1t_3+t_1t_5+t_3t_7+t_5t_7$?</b>",
      ja: "$t_k=\\tan^2\\frac{k\\pi}{16}$ とします。<b>$t_1t_3+t_1t_5+t_3t_7+t_5t_7$ に等しいものはどれですか？</b>",
      zh: "设 $t_k=\\tan^2\\frac{k\\pi}{16}$。<b>下列哪些等于 $t_1t_3+t_1t_5+t_3t_7+t_5t_7$？</b>"
    },
    figureText: {
      en: "Rays at π/16, 3π/16, 5π/16, 7π/16 in the first quadrant, paired symmetrically about π/4.",
      fr: "Des rayons à π/16, 3π/16, 5π/16, 7π/16, appariés symétriquement autour de π/4.",
      es: "Rayos en π/16, 3π/16, 5π/16, 7π/16, emparejados simétricamente respecto de π/4.",
      ja: "第1象限の π/16, 3π/16, 5π/16, 7π/16 の半直線。π/4 に関して対称に組になる。",
      zh: "第一象限内 π/16、3π/16、5π/16、7π/16 的射线，关于 π/4 对称配对。"
    },
    hint: {
      en: "The sum factors as $(t_1+t_7)(t_3+t_5)$. Use $\\tan^2x+\\cot^2x=\\dfrac{4}{\\sin^22x}-2$.",
      fr: "La somme se factorise en $(t_1+t_7)(t_3+t_5)$. Utilisez $\\tan^2x+\\cot^2x=\\dfrac{4}{\\sin^22x}-2$.",
      es: "La suma se factoriza como $(t_1+t_7)(t_3+t_5)$. Usa $\\tan^2x+\\cot^2x=\\dfrac{4}{\\sin^22x}-2$.",
      ja: "和は $(t_1+t_7)(t_3+t_5)$ と因数分解。$\\tan^2x+\\cot^2x=\\dfrac{4}{\\sin^22x}-2$。",
      zh: "和可分解为 $(t_1+t_7)(t_3+t_5)$，利用 $\\tan^2x+\\cot^2x=\\dfrac{4}{\\sin^22x}-2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 16 });
      const O = [0.2, 0.2];
      [1, 3, 5, 7].forEach(k => { const t = k * Math.PI / 16; F.seg(O, [0.2 + 2.6 * Math.cos(t), 0.2 + 2.6 * Math.sin(t)], k === 1 || k === 7 ? 'graph' : 'conic'); });
      F.seg(O, [0.2 + 2.6 * Math.cos(Math.PI / 4), 0.2 + 2.6 * Math.sin(Math.PI / 4)], 'seg thin dashc');
      F.reveal = () => {
      F.text([1.6, 0.3], '(14 + 8√2)(14 − 8√2)', 'len small', 0, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(14 + 8√2)(14 − 8√2)": {"fr": "(14 + 8√2)(14 − 8√2)", "es": "(14 + 8√2)(14 − 8√2)", "ja": "(14 + 8√2)(14 − 8√2)", "zh": "(14 + 8√2)(14 − 8√2)"},
      "sum": {"fr": "somme", "es": "suma", "ja": "和", "zh": "和"}
    },
    options: [
      { tex: "68", correct: true, why: {
        en: "$196-128$",
        fr: "$196-128$",
        es: "$196-128$",
        ja: "$196-128$",
        zh: "$196-128$"
      } },
      { tex: "(14+8\\sqrt2)(14-8\\sqrt2)", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "28", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "70", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "72", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "84", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "196", correct: false, why: {
        en: "That keeps only $14^2$ and drops $(8\\sqrt2)^2=128$.",
        fr: "Seul $14^2$ est gardé ; on oublie $(8\\sqrt2)^2=128$.",
        es: "Solo queda $14^2$; falta restar $(8\\sqrt2)^2=128$.",
        ja: "$14^2$ だけで $(8\\sqrt2)^2=128$ を引き忘れ。",
        zh: "只留了 $14^2$，漏减 $(8\\sqrt2)^2=128$。"
      } },
      { tex: "64", correct: false, why: {
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
          en: "Pair complementary angles",
          fr: "Apparier les angles complémentaires",
          es: "Emparejar ángulos complementarios",
          ja: "余角どうしを組に",
          zh: "配对余角"
        },
        lines: ["t_7=\\cot^2\\tfrac{\\pi}{16},\\ t_5=\\cot^2\\tfrac{3\\pi}{16}\\Rightarrow\\text{sum}=(t_1+t_7)(t_3+t_5)"],
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
          en: "Use the identity",
          fr: "Utiliser l’identité",
          es: "Usar la identidad",
          ja: "恒等式を使う",
          zh: "用恒等式"
        },
        lines: ["t_1+t_7=\\frac{4}{\\sin^2\\frac\\pi8}-2=14+8\\sqrt2,\\quad t_3+t_5=\\frac{4}{\\sin^2\\frac{3\\pi}8}-2=14-8\\sqrt2", "\\Rightarrow196-128=68"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
