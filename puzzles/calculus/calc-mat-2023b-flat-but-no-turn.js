/* calculus · A stationary point that is not a turning point
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2023b-flat-but-no-turn",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question A",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question A",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta A",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 A",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 A 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A stationary point that is not a turning point",
      fr: "Un point stationnaire qui n’est pas un extremum",
      es: "Un punto estacionario que no es extremo",
      ja: "極値でない停留点",
      zh: "不是极值点的驻点"
    },
    statement: {
      en: "The curve $y=x^3-3x^2+kx$ has a point where $\\dfrac{dy}{dx}=0$ that is neither a local maximum nor a local minimum. <b>Which of the following are true?</b>",
      fr: "La courbe $y=x^3-3x^2+kx$ a un point où $\\dfrac{dy}{dx}=0$ qui n’est ni un maximum local ni un minimum local. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La curva $y=x^3-3x^2+kx$ tiene un punto donde $\\dfrac{dy}{dx}=0$ que no es ni máximo ni mínimo local. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $y=x^3-3x^2+kx$ には $\\dfrac{dy}{dx}=0$ だが極大でも極小でもない点があります。<b>次のうち正しいものはどれですか？</b>",
      zh: "曲线 $y=x^3-3x^2+kx$ 上有一点满足 $\\dfrac{dy}{dx}=0$，但它既非极大也非极小。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y′ = 3x² − 6x + k for some value of k.",
      fr: "La parabole y′ = 3x² − 6x + k pour une valeur de k.",
      es: "La parábola y′ = 3x² − 6x + k para cierto k.",
      ja: "ある k に対する放物線 y′ = 3x² − 6x + k。",
      zh: "某个 k 对应的抛物线 y′ = 3x² − 6x + k。"
    },
    hint: {
      en: "$y'$ must touch zero without changing sign: a repeated root of $3x^2-6x+k$.",
      fr: "$y'$ doit s’annuler sans changer de signe : racine double de $3x^2-6x+k$.",
      es: "$y'$ debe anularse sin cambiar de signo: raíz doble de $3x^2-6x+k$.",
      ja: "$y'$ が符号を変えずに $0$：$3x^2-6x+k$ の重解。",
      zh: "$y'$ 取零但不变号：$3x^2-6x+k$ 有重根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 6.0, scale: 40, pad: 16 });
      const T = F.T = axes(F, -1.2, 3.4, -1.6, 4.4, { yl: 'y′' });
      plot(F, T, x => 3 * x * x - 6 * x + 1.5, -1.0, 3.0, 'graph', 'base', -1.6, 4.4);
      F.reveal = () => {
      plot(F, T, x => 3 * x * x - 6 * x + 3, -0.2, 2.2, 'hl pink', 'base', -1.6, 4.4); F.dot(T([1, 0])); F.text(T([1, 0]), 'x=1', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x=1": {"fr": "x=1", "es": "x=1", "ja": "x=1", "zh": "x=1"},
      "the point is": {"fr": "le point est", "es": "el punto es", "ja": "その点は", "zh": "该点为"},
      "this happens for every": {"fr": "cela arrive pour tout", "es": "ocurre para todo", "ja": "これはすべての次で起こる：", "zh": "对所有下列成立："},
      "is a stationary inflection": {"fr": "est une inflexion à tangente horizontale", "es": "es una inflexión con tangente horizontal", "ja": "は停留変曲点", "zh": "是驻点拐点"}
    },
    options: [
      { tex: "k=3", correct: true, why: {
        en: "$36-12k=0$",
        fr: "$36-12k=0$",
        es: "$36-12k=0$",
        ja: "$36-12k=0$",
        zh: "$36-12k=0$"
      } },
      { tex: "\\text{the point is}\\ (1,1)", correct: true, why: {
        en: "$y(1)=1-3+3=1$",
        fr: "$y(1)=1-3+3=1$",
        es: "$y(1)=1-3+3=1$",
        ja: "$y(1)=1-3+3=1$",
        zh: "$y(1)=1-3+3=1$"
      } },
      { tex: "k=1", correct: false, why: {
        en: "Then $y'$ has two simple roots: a maximum and a minimum.",
        fr: "Alors $y'$ a deux racines simples : un maximum et un minimum.",
        es: "Entonces $y'$ tiene dos raíces simples: un máximo y un mínimo.",
        ja: "このとき $y'$ は単解2つで極大・極小がある。",
        zh: "此时 $y'$ 有两个单根，对应极大与极小。"
      } },
      { tex: "k=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=4", correct: false, why: {
        en: "Then $y'>0$ everywhere: no stationary point at all.",
        fr: "Alors $y'>0$ partout : aucun point stationnaire.",
        es: "Entonces $y'>0$ siempre: no hay punto estacionario.",
        ja: "このとき $y'>0$ で停留点がない。",
        zh: "此时 $y'>0$，没有驻点。"
      } },
      { tex: "k=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{this happens for every}\\ k<3", correct: false, why: {
        en: "For $k<3$ the two roots of $y'$ are distinct, giving genuine turning points.",
        fr: "Pour $k<3$ les deux racines de $y'$ sont distinctes : vrais extremums.",
        es: "Para $k<3$ las dos raíces de $y'$ son distintas: extremos genuinos.",
        ja: "$k<3$ では $y'$ の2解は異なり、本当の極値。",
        zh: "$k<3$ 时 $y'$ 两根不同，是真正的极值。"
      } },
      { tex: "\\text{the point is}\\ (1,-1)", correct: false, why: {
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
          en: "Repeated root of y′",
          fr: "Racine double de y′",
          es: "Raíz doble de y′",
          ja: "y′ の重解",
          zh: "y′ 的重根"
        },
        lines: ["y'=3x^2-6x+k,\\quad \\Delta=36-12k=0\\Rightarrow k=3"],
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
          en: "No sign change",
          fr: "Pas de changement de signe",
          es: "Sin cambio de signo",
          ja: "符号変化なし",
          zh: "不变号"
        },
        lines: ["y'=3(x-1)^2\\ge0\\Rightarrow (1,1)\\ \\text{is a stationary inflection}"],
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
