/* calculus · An integral by parts
   EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-evau-2024-integral-x-plus-2-ln-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.2",
        fr: "EvAU 2024 (Madrid, Espagne), Matemáticas II, session ordinaire, question B.2",
        es: "EvAU 2024 (Madrid), Matemáticas II, convocatoria ordinaria, pregunta B.2",
        ja: "スペイン EvAU 2024（マドリード）数学 II 通常日程 問 B.2",
        zh: "西班牙 EvAU 2024（马德里）数学 II 常规考试 第 B.2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 1,
    title: {
      en: "An integral by parts",
      fr: "Une intégrale par parties",
      es: "Una integral por partes",
      ja: "部分積分",
      zh: "分部积分"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\int_1^e (x+2)\\ln x\\,dx$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à $\\displaystyle\\int_1^e (x+2)\\ln x\\,dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a $\\displaystyle\\int_1^e (x+2)\\ln x\\,dx$?</b>",
      ja: "<b>$\\displaystyle\\int_1^e (x+2)\\ln x\\,dx$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\int_1^e (x+2)\\ln x\\,dx$？</b>"
    },
    figureText: {
      en: "The graph of (x + 2) ln x from x = 1 to x = e, with the area under it shaded.",
      fr: "La courbe de (x + 2) ln x de x = 1 à x = e, avec l’aire sous la courbe grisée.",
      es: "La gráfica de (x + 2) ln x de x = 1 a x = e, con el área bajo ella sombreada.",
      ja: "x = 1 から e までの (x + 2) ln x のグラフと下の面積。",
      zh: "x = 1 到 e 的 (x + 2) ln x 图像及其下方面积。"
    },
    hint: {
      en: "Take $u=\\ln x$ and $dv=(x+2)\\,dx$.",
      fr: "Prenez $u=\\ln x$ et $dv=(x+2)\\,dx$.",
      es: "Toma $u=\\ln x$ y $dv=(x+2)\\,dx$.",
      ja: "$u=\\ln x$、$dv=(x+2)\\,dx$ とおく。",
      zh: "取 $u=\\ln x$，$dv=(x+2)\\,dx$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.0, scale: 60, pad: 16 });
      const T = F.T = axes(F, -0.3, 3.3, -0.3, 2.7);
      const TT = ([x, y]) => T([x, y * 0.5]), f = x => (x + 2) * Math.log(x);
      const q = [TT([1, 0])]; for (let k = 0; k <= 30; k++) { const x = 1 + (Math.E - 1) * k / 30; q.push(TT([x, f(x)])); } q.push(TT([Math.E, 0])); F.path(q, 'fill-yellow', 'fills', true);
      plot(F, TT, f, 0.8, 3.1, 'graph', 'base', -0.6, 5.4); F.text(T([1, 0]), '1', 'tick', 0, 14); F.text(T([Math.E, 0]), 'e', 'tick', 0, 14);
      F.reveal = () => {
      F.text(T([1.4, 2.0]), '≈ 4.10', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "≈ 4.10": {"fr": "≈ 4,10", "es": "≈ 4,10", "ja": "≈ 4.10", "zh": "≈ 4.10"}
    },
    options: [
      { tex: "\\tfrac{e^2+9}{4}", correct: true, why: {
        en: "$\\left(\\tfrac{e^2}2+2e\\right)-\\left(\\tfrac{e^2}4+2e-\\tfrac94\\right)$.",
        fr: "$\\left(\\tfrac{e^2}2+2e\\right)-\\left(\\tfrac{e^2}4+2e-\\tfrac94\\right)$.",
        es: "$\\left(\\tfrac{e^2}2+2e\\right)-\\left(\\tfrac{e^2}4+2e-\\tfrac94\\right)$.",
        ja: "$\\left(\\tfrac{e^2}2+2e\\right)-\\left(\\tfrac{e^2}4+2e-\\tfrac94\\right)$。",
        zh: "$\\left(\\tfrac{e^2}2+2e\\right)-\\left(\\tfrac{e^2}4+2e-\\tfrac94\\right)$。"
      } },
      { tex: "\\tfrac{e^2}4+\\tfrac94", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{e^2+1}{4}", correct: false, why: {
        en: "This drops the $2x$ part of the antiderivative.",
        fr: "Cela oublie la partie $2x$ de la primitive.",
        es: "Olvida la parte $2x$ de la primitiva.",
        ja: "原始関数の $2x$ の部分を忘れている。",
        zh: "漏了原函数中 $2x$ 的部分。"
      } },
      { tex: "\\tfrac{e^2}{2}+2e", correct: false, why: {
        en: "That is only the boundary term.",
        fr: "C’est seulement le terme de bord.",
        es: "Es solo el término de borde.",
        ja: "境界項だけ。",
        zh: "那只是边界项。"
      } },
      { tex: "e^2+9", correct: false, why: {
        en: "Missing the factor $\\tfrac14$.",
        fr: "Il manque le facteur $\\tfrac14$.",
        es: "Falta el factor $\\tfrac14$.",
        ja: "$\\tfrac14$ が抜けている。",
        zh: "漏了 $\\tfrac14$。"
      } },
      { tex: "\\tfrac{3e^2+9}{4}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2e-1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{e^2-7}{4}", correct: false, why: {
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
          en: "By parts",
          fr: "Par parties",
          es: "Por partes",
          ja: "部分積分",
          zh: "分部"
        },
        lines: ["\\int(x+2)\\ln x\\,dx=\\left(\\tfrac{x^2}2+2x\\right)\\ln x-\\int\\left(\\tfrac x2+2\\right)dx"],
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
          en: "Evaluate",
          fr: "Évaluer",
          es: "Evaluar",
          ja: "代入",
          zh: "代入上下限"
        },
        lines: ["\\left[\\left(\\tfrac{x^2}2+2x\\right)\\ln x-\\tfrac{x^2}4-2x\\right]_1^e=\\tfrac{e^2}2+2e-\\tfrac{e^2}4-2e+\\tfrac14+2=\\boxed{\\tfrac{e^2+9}{4}}"],
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
