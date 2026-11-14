/* algebra · A log equation that hides a quadratic
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2022-log-of-a-cubic",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1H",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1H",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1H",
        zh: "牛津大学数学入学考试 MAT 2022 第 1H 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A log equation that hides a quadratic",
      fr: "Une équation logarithmique qui cache un trinôme",
      es: "Una ecuación logarítmica que esconde una cuadrática",
      ja: "2次方程式が隠れた対数方程式",
      zh: "藏着二次方程的对数方程"
    },
    statement: {
      en: "Consider $\\log_2(2x^3+7x^2+2x+3)=3\\log_2(x+1)+1$. <b>Which of the following are true?</b>",
      fr: "On considère $\\log_2(2x^3+7x^2+2x+3)=3\\log_2(x+1)+1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $\\log_2(2x^3+7x^2+2x+3)=3\\log_2(x+1)+1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\log_2(2x^3+7x^2+2x+3)=3\\log_2(x+1)+1$ を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $\\log_2(2x^3+7x^2+2x+3)=3\\log_2(x+1)+1$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line showing where x + 1 > 0.",
      fr: "Une droite montrant où x + 1 > 0.",
      es: "Una recta que muestra dónde x + 1 > 0.",
      ja: "x + 1 > 0 の範囲を示す数直線。",
      zh: "表示 x + 1 > 0 的数轴。"
    },
    hint: {
      en: "Remove the logs: $2x^3+7x^2+2x+3=2(x+1)^3$, but remember $x>-1$.",
      fr: "Supprimez les logarithmes : $2x^3+7x^2+2x+3=2(x+1)^3$, avec $x>-1$.",
      es: "Quita los logaritmos: $2x^3+7x^2+2x+3=2(x+1)^3$, con $x>-1$.",
      ja: "対数を外すと $2x^3+7x^2+2x+3=2(x+1)^3$。ただし $x>-1$。",
      zh: "去掉对数：$2x^3+7x^2+2x+3=2(x+1)^3$，且 $x>-1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.5, scale: 50, pad: 16 });
      F.seg([0.2, 0.6], [6.2, 0.6], 'axis');
      [-1, 0, 1, 2, 3, 4].forEach((v, k) => { F.seg([1.0 + k, 0.52], [1.0 + k, 0.68], 'axis'); F.text([1.0 + k, 0.6], String(v).replace('-', '−'), 'tick', 0, 18); });
      F.circle([1.0, 0.6], 0.08, 'seg'); F.seg([1.08, 0.6], [6.2, 0.6], 'hl');
      F.reveal = () => {
      [2 - Math.sqrt(3), 2 + Math.sqrt(3)].forEach(r => F.dot([2.0 + r, 0.6]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "exactly 2 real solutions": {"fr": "exactement 2 solutions réelles", "es": "exactamente 2 soluciones reales", "ja": "実数解はちょうど2個", "zh": "恰有 2 个实数解"},
      "the equation reduces to": {"fr": "l’équation se ramène à", "es": "la ecuación se reduce a", "ja": "方程式は次に帰着する", "zh": "方程化为"},
      "exactly 1 real solution": {"fr": "exactement 1 solution réelle", "es": "exactamente 1 solución real", "ja": "実数解はちょうど1個", "zh": "恰有 1 个实数解"},
      "exactly 3 real solutions": {"fr": "exactement 3 solutions réelles", "es": "exactamente 3 soluciones reales", "ja": "実数解はちょうど3個", "zh": "恰有 3 个实数解"},
      "no real solutions": {"fr": "aucune solution réelle", "es": "ninguna solución real", "ja": "実数解なし", "zh": "没有实数解"},
      "is a solution": {"fr": "est une solution", "es": "es una solución", "ja": "は解", "zh": "是解"},
      "the solutions multiply to": {"fr": "le produit des solutions vaut", "es": "el producto de las soluciones es", "ja": "解の積は", "zh": "解的乘积为"},
      "exactly 4 real solutions": {"fr": "exactement 4 solutions réelles", "es": "exactamente 4 soluciones reales", "ja": "実数解はちょうど4個", "zh": "恰有 4 个实数解"}
    },
    options: [
      { tex: "\\text{exactly 2 real solutions}", correct: true, why: {
        en: "$x=2\\pm\\sqrt3$, both greater than $-1$.",
        fr: "$x=2\\pm\\sqrt3$, tous deux supérieurs à $-1$.",
        es: "$x=2\\pm\\sqrt3$, ambos mayores que $-1$.",
        ja: "$x=2\\pm\\sqrt3$ はどちらも $-1$ より大きい。",
        zh: "$x=2\\pm\\sqrt3$，都大于 $-1$。"
      } },
      { tex: "\\text{the equation reduces to}\\ x^2-4x+1=0", correct: true, why: {
        en: "The cubic terms cancel.",
        fr: "Les termes en $x^3$ s’annulent.",
        es: "Los términos cúbicos se cancelan.",
        ja: "3次の項が消える。",
        zh: "三次项消去。"
      } },
      { tex: "\\text{exactly 1 real solution}", correct: false, why: {
        en: "$2-\\sqrt3\\approx0.27$ is also allowed.",
        fr: "$2-\\sqrt3\\approx0{,}27$ convient aussi.",
        es: "$2-\\sqrt3\\approx0{,}27$ también vale.",
        ja: "$2-\\sqrt3\\approx0.27$ も適する。",
        zh: "$2-\\sqrt3\\approx0.27$ 也满足。"
      } },
      { tex: "\\text{exactly 3 real solutions}", correct: false, why: {
        en: "After cancelling it is only a quadratic.",
        fr: "Après simplification ce n’est qu’un trinôme.",
        es: "Tras simplificar es solo una cuadrática.",
        ja: "整理すると2次方程式。",
        zh: "化简后只是二次方程。"
      } },
      { tex: "\\text{no real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=-1\\ \\text{is a solution}", correct: false, why: {
        en: "$\\log_2 0$ is undefined.",
        fr: "$\\log_2 0$ n’existe pas.",
        es: "$\\log_2 0$ no existe.",
        ja: "$\\log_2 0$ は定義されない。",
        zh: "$\\log_2 0$ 无定义。"
      } },
      { tex: "\\text{the solutions multiply to}\\ -1", correct: false, why: {
        en: "$(2+\\sqrt3)(2-\\sqrt3)=1$",
        fr: "$(2+\\sqrt3)(2-\\sqrt3)=1$",
        es: "$(2+\\sqrt3)(2-\\sqrt3)=1$",
        ja: "$(2+\\sqrt3)(2-\\sqrt3)=1$",
        zh: "$(2+\\sqrt3)(2-\\sqrt3)=1$"
      } },
      { tex: "\\text{exactly 4 real solutions}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Remove the logs",
          fr: "Supprimer les logarithmes",
          es: "Quitar los logaritmos",
          ja: "対数を外す",
          zh: "去对数"
        },
        lines: ["2x^3+7x^2+2x+3=2(x+1)^3=2x^3+6x^2+6x+2"],
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
          en: "Solve and check",
          fr: "Résoudre et vérifier",
          es: "Resolver y comprobar",
          ja: "解いて確認",
          zh: "求解并检验"
        },
        lines: ["x^2-4x+1=0\\Rightarrow x=2\\pm\\sqrt3>-1"],
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
