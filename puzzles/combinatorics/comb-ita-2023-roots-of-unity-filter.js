/* combinatorics · Only the powers that are multiples of 3
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 48 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-ita-2023-roots-of-unity-filter",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 48",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 48",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 48",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第48問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 48 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "Only the powers that are multiples of 3",
      fr: "Seulement les puissances multiples de 3",
      es: "Solo las potencias múltiplos de 3",
      ja: "3 の倍数乗の係数だけ",
      zh: "只取 3 的倍数次幂"
    },
    statement: {
      en: "<b>Which of the following equal the sum of the coefficients of $x^0,x^3,x^6,\\dots$ in the expansion of $\\left(1+x^2-x^3+x^4\\right)^{10}$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à la somme des coefficients de $x^0,x^3,x^6,\\dots$ dans le développement de $\\left(1+x^2-x^3+x^4\\right)^{10}$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a la suma de los coeficientes de $x^0,x^3,x^6,\\dots$ en el desarrollo de $\\left(1+x^2-x^3+x^4\\right)^{10}$?</b>",
      ja: "<b>$\\left(1+x^2-x^3+x^4\\right)^{10}$ を展開したときの $x^0,x^3,x^6,\\dots$ の係数の和に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\left(1+x^2-x^3+x^4\\right)^{10}$ 展开式中 $x^0,x^3,x^6,\\dots$ 的系数之和？</b>"
    },
    figureText: {
      en: "The three cube roots of unity 1, ω, ω² on the unit circle.",
      fr: "Les trois racines cubiques de l’unité 1, ω, ω² sur le cercle unité.",
      es: "Las tres raíces cúbicas de la unidad 1, ω, ω² en la circunferencia unidad.",
      ja: "単位円上の1の3乗根 1, ω, ω²。",
      zh: "单位圆上的三个三次单位根 1、ω、ω²。"
    },
    hint: {
      en: "With $\\omega^3=1$, $\\omega\\ne1$: $\\dfrac{P(1)+P(\\omega)+P(\\omega^2)}{3}$ keeps exactly the powers that are multiples of $3$.",
      fr: "Avec $\\omega^3=1$, $\\omega\\ne1$ : $\\dfrac{P(1)+P(\\omega)+P(\\omega^2)}{3}$ garde exactement les puissances multiples de $3$.",
      es: "Con $\\omega^3=1$, $\\omega\\ne1$: $\\dfrac{P(1)+P(\\omega)+P(\\omega^2)}{3}$ conserva exactamente las potencias múltiplos de $3$.",
      ja: "$\\omega^3=1$、$\\omega\\ne1$ とすると $\\dfrac{P(1)+P(\\omega)+P(\\omega^2)}{3}$ は3の倍数乗だけを残す。",
      zh: "取 $\\omega^3=1$，$\\omega\\ne1$，则 $\\dfrac{P(1)+P(\\omega)+P(\\omega^2)}{3}$ 恰好保留 3 的倍数次幂。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 70, pad: 16 });
      const T = F.T = axes(F, -1.5, 1.5, -1.5, 1.5);
      const p = []; for (let k = 0; k <= 60; k++) { const t = k * Math.PI / 30; p.push(T([Math.cos(t), Math.sin(t)])); } F.path(p, 'conic', 'base', true);
      [[0, '1'], [2 * Math.PI / 3, 'ω'], [4 * Math.PI / 3, 'ω²']].forEach(([t, s]) => { F.dot(T([Math.cos(t), Math.sin(t)])); F.text(T([Math.cos(t), Math.sin(t)]), s, 'pt', Math.cos(t) > 0 ? 12 : -12, Math.sin(t) > 0 ? -8 : 14); });
      F.reveal = () => {
      F.text(T([0, -0.4]), 'P(ω) = 1', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "ω": {"fr": "ω", "es": "ω", "ja": "ω", "zh": "ω"},
      "ω²": {"fr": "ω²", "es": "ω²", "ja": "ω²", "zh": "ω²"},
      "P(ω) = 1": {"fr": "P(ω) = 1", "es": "P(ω) = 1", "ja": "P(ω) = 1", "zh": "P(ω) = 1"}
    },
    options: [
      { tex: "342", correct: true, why: {
        en: "$\\dfrac{2^{10}+1+1}{3}=\\dfrac{1026}3$",
        fr: "$\\dfrac{2^{10}+1+1}{3}=\\dfrac{1026}3$",
        es: "$\\dfrac{2^{10}+1+1}{3}=\\dfrac{1026}3$",
        ja: "$\\dfrac{2^{10}+1+1}{3}=\\dfrac{1026}3$",
        zh: "$\\dfrac{2^{10}+1+1}{3}=\\dfrac{1026}3$"
      } },
      { tex: "\\tfrac{2^{10}+2}{3}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "114", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "228", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "456", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "570", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{2^{10}}{3}", correct: false, why: {
        en: "Not even an integer: the terms $P(\\omega)=P(\\omega^2)=1$ were dropped.",
        fr: "Pas même entier : on a oublié $P(\\omega)=P(\\omega^2)=1$.",
        es: "Ni siquiera es entero: se olvidaron $P(\\omega)=P(\\omega^2)=1$.",
        ja: "整数ですらない。$P(\\omega)=P(\\omega^2)=1$ を落とした。",
        zh: "甚至不是整数：漏了 $P(\\omega)=P(\\omega^2)=1$。"
      } },
      { tex: "1024", correct: false, why: {
        en: "That is the sum of all coefficients, $P(1)$.",
        fr: "C’est la somme de tous les coefficients, $P(1)$.",
        es: "Es la suma de todos los coeficientes, $P(1)$.",
        ja: "全係数の和 $P(1)$。",
        zh: "那是全部系数之和 $P(1)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Values at the roots",
          fr: "Valeurs aux racines",
          es: "Valores en las raíces",
          ja: "根での値",
          zh: "在根处取值"
        },
        lines: ["P(1)=2^{10},\\quad P(\\omega)=(1+\\omega^2-1+\\omega)^{10}=(-1)^{10}=1=P(\\omega^2)"],
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
          en: "Filter",
          fr: "Filtrer",
          es: "Filtrar",
          ja: "フィルター",
          zh: "过滤"
        },
        lines: ["\\frac{1024+1+1}{3}=342"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam this was a five-choice question; here a second correct form is added.",
          fr: "Dans l’épreuve c’était un QCM à cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "En el examen era de cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。ここでは正しい別表現を追加。",
          zh: "原题为五选一，此处增加了一个等价的正确选项。"
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
