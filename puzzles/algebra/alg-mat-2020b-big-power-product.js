/* algebra · 2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ for large x
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2020b-big-power-product",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question B",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question B",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta B",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 B",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 B 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ for large x",
      fr: "2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ pour x grand",
      es: "2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ para x grande",
      ja: "x が大きいときの 2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ",
      zh: "x 很大时的 2ˣ·3⁻ˣ·4ˣ·5⁻ˣ ⋯ 20ˣ·21⁻ˣ"
    },
    statement: {
      en: "Let $P(x)=2^x\\cdot3^{-x}\\cdot4^x\\cdot5^{-x}\\cdots20^x\\cdot21^{-x}$, and let $x$ be a very large positive number. <b>Which of the following are true?</b>",
      fr: "Soit $P(x)=2^x\\cdot3^{-x}\\cdot4^x\\cdot5^{-x}\\cdots20^x\\cdot21^{-x}$, avec $x$ un très grand nombre positif. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $P(x)=2^x\\cdot3^{-x}\\cdot4^x\\cdot5^{-x}\\cdots20^x\\cdot21^{-x}$, con $x$ un número positivo muy grande. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P(x)=2^x\\cdot3^{-x}\\cdot4^x\\cdot5^{-x}\\cdots20^x\\cdot21^{-x}$ とし、$x$ は非常に大きい正の数とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $P(x)=2^x\\cdot3^{-x}\\cdot4^x\\cdot5^{-x}\\cdots20^x\\cdot21^{-x}$，$x$ 为很大的正数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Ten fractions 2/3, 4/5, …, 20/21, each slightly below 1.",
      fr: "Dix fractions 2/3, 4/5, …, 20/21, chacune un peu inférieure à 1.",
      es: "Diez fracciones 2/3, 4/5, …, 20/21, cada una algo menor que 1.",
      ja: "10個の分数 2/3, 4/5, …, 20/21（どれも1より少し小さい）。",
      zh: "十个分数 2/3、4/5、…、20/21，都略小于 1。"
    },
    hint: {
      en: "Pair them: $P(x)=\\left(\\tfrac23\\cdot\\tfrac45\\cdots\\tfrac{20}{21}\\right)^x$.",
      fr: "Regroupez : $P(x)=\\left(\\tfrac23\\cdot\\tfrac45\\cdots\\tfrac{20}{21}\\right)^x$.",
      es: "Agrúpalos: $P(x)=\\left(\\tfrac23\\cdot\\tfrac45\\cdots\\tfrac{20}{21}\\right)^x$.",
      ja: "組にする：$P(x)=\\left(\\tfrac23\\cdot\\tfrac45\\cdots\\tfrac{20}{21}\\right)^x$。",
      zh: "配对：$P(x)=\\left(\\tfrac23\\cdot\\tfrac45\\cdots\\tfrac{20}{21}\\right)^x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.4, scale: 46, pad: 16 });
      for (let k = 1; k <= 10; k++) { F.rect(0.1 + (k - 1) * 0.65, 0.35, 0.58, 0.7, 'fill-blue', 'fills'); F.text([0.39 + (k - 1) * 0.65, 0.7], (2 * k) + '/' + (2 * k + 1), 'tick', 0, 0); }
      F.reveal = () => {
      F.text([3.3, 1.3], '≈ 0.18ˣ', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "≈ 0.18ˣ": {"fr": "≈ 0,18ˣ", "es": "≈ 0,18ˣ", "ja": "≈ 0.18ˣ", "zh": "≈ 0.18ˣ"},
      "is close to": {"fr": "est proche de", "es": "está cerca de", "ja": "は次に近い：", "zh": "接近"},
      "with": {"fr": "avec", "es": "con", "ja": "ただし", "zh": "其中"},
      "is very large": {"fr": "est très grand", "es": "es muy grande", "ja": "は非常に大きい", "zh": "非常大"},
      "is slightly more than": {"fr": "est un peu plus grand que", "es": "es algo mayor que", "ja": "は次より少し大きい：", "zh": "略大于"},
      "as": {"fr": "quand", "es": "cuando", "ja": "のとき", "zh": "当"}
    },
    options: [
      { tex: "P(x)\\ \\text{is close to}\\ 0", correct: true, why: {
        en: "A fixed number below $1$ raised to a huge power.",
        fr: "Un nombre fixe inférieur à $1$ élevé à une très grande puissance.",
        es: "Un número fijo menor que $1$ elevado a una potencia enorme.",
        ja: "$1$ 未満の定数の非常に大きな累乗。",
        zh: "小于 $1$ 的定数的极大次幂。"
      } },
      { tex: "P(x)=r^x\\ \\text{with}\\ r<\\tfrac15", correct: true, why: {
        en: "$r\\approx0.18$",
        fr: "$r\\approx0.18$",
        es: "$r\\approx0.18$",
        ja: "$r\\approx0.18$",
        zh: "$r\\approx0.18$"
      } },
      { tex: "P(x)\\ \\text{is very large}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P(x)=1", correct: false, why: {
        en: "The factors do not cancel: $2\\cdot4\\cdots20\\ne3\\cdot5\\cdots21$.",
        fr: "Les facteurs ne se simplifient pas : $2\\cdot4\\cdots20\\ne3\\cdot5\\cdots21$.",
        es: "Los factores no se cancelan: $2\\cdot4\\cdots20\\ne3\\cdot5\\cdots21$.",
        ja: "約分されない：$2\\cdot4\\cdots20\\ne3\\cdot5\\cdots21$。",
        zh: "不能约掉：$2\\cdot4\\cdots20\\ne3\\cdot5\\cdots21$。"
      } },
      { tex: "P(x)\\ \\text{is slightly more than}\\ 1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P(x)\\approx2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P(x)=\\left(\\tfrac{2}{21}\\right)^x", correct: false, why: {
        en: "Telescoping does not happen here.",
        fr: "Il n’y a pas de télescopage ici.",
        es: "Aquí no hay telescopaje.",
        ja: "ここでは打ち消し合わない。",
        zh: "这里不能裂项相消。"
      } },
      { tex: "P(x)\\to\\tfrac12\\ \\text{as}\\ x\\to\\infty", correct: false, why: {
        en: "$r^x\\to0$",
        fr: "$r^x\\to0$",
        es: "$r^x\\to0$",
        ja: "$r^x\\to0$",
        zh: "$r^x\\to0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Group",
          fr: "Regrouper",
          es: "Agrupar",
          ja: "まとめる",
          zh: "合并"
        },
        lines: ["P(x)=r^x,\\quad r=\\tfrac{2\\cdot4\\cdots20}{3\\cdot5\\cdots21}=\\tfrac{2^{10}\\cdot10!}{21!/(2^{10}\\cdot10!)}\\approx0.18"],
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
          en: "Limit",
          fr: "Limite",
          es: "Límite",
          ja: "極限",
          zh: "极限"
        },
        lines: ["0<r<1\\Rightarrow r^x\\to0"],
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
