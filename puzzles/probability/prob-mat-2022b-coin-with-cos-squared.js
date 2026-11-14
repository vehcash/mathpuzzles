/* probability · A coin that lands heads with probability cos²α
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-mat-2022b-coin-with-cos-squared",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question A",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question A",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta A",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 A",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 A 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A coin that lands heads with probability cos²α",
      fr: "Une pièce qui donne pile avec probabilité cos²α",
      es: "Una moneda que sale cara con probabilidad cos²α",
      ja: "表の確率が cos²α の硬貨",
      zh: "正面概率为 cos²α 的硬币"
    },
    statement: {
      en: "A biased coin shows heads with probability $\\cos^2\\alpha$. It is tossed three times. Let $P$ be the probability of at least two heads. <b>Which of the following are true?</b>",
      fr: "Une pièce truquée donne pile avec probabilité $\\cos^2\\alpha$. On la lance trois fois. Soit $P$ la probabilité d’obtenir au moins deux piles. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una moneda trucada sale cara con probabilidad $\\cos^2\\alpha$. Se lanza tres veces. Sea $P$ la probabilidad de al menos dos caras. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "表が出る確率 $\\cos^2\\alpha$ の硬貨を3回投げます。表が2回以上出る確率を $P$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "一枚不均匀硬币出现正面的概率为 $\\cos^2\\alpha$，掷三次。设至少两次正面的概率为 $P$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Three tosses, each heads with probability c = cos²α and tails with s = sin²α.",
      fr: "Trois lancers, pile avec c = cos²α et face avec s = sin²α.",
      es: "Tres lanzamientos, cara con c = cos²α y cruz con s = sin²α.",
      ja: "3回の試行、表 c = cos²α、裏 s = sin²α。",
      zh: "三次投掷，正面 c = cos²α，反面 s = sin²α。"
    },
    hint: {
      en: "Use the complement: $P=1-s^3-3cs^2$ with $s=\\sin^2\\alpha$, $c=1-s$.",
      fr: "Passez au contraire : $P=1-s^3-3cs^2$ avec $s=\\sin^2\\alpha$, $c=1-s$.",
      es: "Usa el complementario: $P=1-s^3-3cs^2$ con $s=\\sin^2\\alpha$, $c=1-s$.",
      ja: "余事象：$P=1-s^3-3cs^2$（$s=\\sin^2\\alpha$, $c=1-s$）。",
      zh: "用对立事件：$P=1-s^3-3cs^2$，$s=\\sin^2\\alpha$，$c=1-s$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 1.8, scale: 48, pad: 16 });
      for (let k = 0; k < 3; k++) { F.circle([1.0 + k * 1.8, 0.95], 0.55, 'fill-blue'); F.text([1.0 + k * 1.8, 0.95], 'c | s', 'len small', 0, 0); }
      F.reveal = () => {
      F.text([2.8, 0.05], '1 − s³ − 3(1−s)s²', 'len small', 0, -2);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "c | s": {"fr": "c | s", "es": "c | s", "ja": "c | s", "zh": "c | s"},
      "1 − s³ − 3(1−s)s²": {"fr": "1 − s³ − 3(1−s)s²", "es": "1 − s³ − 3(1−s)s²", "ja": "1 − s³ − 3(1−s)s²", "zh": "1 − s³ − 3(1−s)s²"},
      "H": {"fr": "P", "es": "C", "ja": "表", "zh": "正"}
    },
    options: [
      { tex: "P=1-3\\sin^4\\alpha+2\\sin^6\\alpha", correct: true, why: {
        en: "$1-s^3-3(1-s)s^2=1-3s^2+2s^3$",
        fr: "$1-s^3-3(1-s)s^2=1-3s^2+2s^3$",
        es: "$1-s^3-3(1-s)s^2=1-3s^2+2s^3$",
        ja: "$1-s^3-3(1-s)s^2=1-3s^2+2s^3$",
        zh: "$1-s^3-3(1-s)s^2=1-3s^2+2s^3$"
      } },
      { tex: "\\alpha=\\tfrac\\pi4\\Rightarrow P=\\tfrac12", correct: true, why: {
        en: "A fair coin: by symmetry at least two heads has probability $\\tfrac12$.",
        fr: "Pièce équilibrée : par symétrie, $\\tfrac12$.",
        es: "Moneda equilibrada: por simetría, $\\tfrac12$.",
        ja: "公正な硬貨なので対称性から $\\tfrac12$。",
        zh: "均匀硬币，由对称性为 $\\tfrac12$。"
      } },
      { tex: "P=1+3\\sin^4\\alpha-2\\sin^6\\alpha", correct: false, why: {
        en: "Signs reversed: at $\\alpha=\\tfrac\\pi2$ it gives $2$.",
        fr: "Signes inversés : en $\\alpha=\\tfrac\\pi2$ cela donne $2$.",
        es: "Signos invertidos: en $\\alpha=\\tfrac\\pi2$ da $2$.",
        ja: "符号が逆。$\\alpha=\\tfrac\\pi2$ で $2$ になる。",
        zh: "符号反了：$\\alpha=\\tfrac\\pi2$ 时得 $2$。"
      } },
      { tex: "P=1-3\\sin^4\\alpha-2\\sin^6\\alpha", correct: false, why: {
        en: "At $\\alpha=\\tfrac\\pi2$ it gives $-4$.",
        fr: "En $\\alpha=\\tfrac\\pi2$ cela donne $-4$.",
        es: "En $\\alpha=\\tfrac\\pi2$ da $-4$.",
        ja: "$\\alpha=\\tfrac\\pi2$ で $-4$。",
        zh: "$\\alpha=\\tfrac\\pi2$ 时得 $-4$。"
      } },
      { tex: "P=1+3\\sin^4\\alpha+2\\sin^6\\alpha", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=1+8\\sin^6\\alpha", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=3\\cos^4\\alpha\\sin^2\\alpha", correct: false, why: {
        en: "That is exactly two heads only.",
        fr: "C’est seulement « exactement deux piles ».",
        es: "Es solo «exactamente dos caras».",
        ja: "ちょうど2回表の確率だけ。",
        zh: "那只是恰好两次正面。"
      } },
      { tex: "\\alpha=\\tfrac\\pi2\\Rightarrow P=1", correct: false, why: {
        en: "Then the coin never shows heads, so $P=0$.",
        fr: "La pièce ne donne alors jamais pile : $P=0$.",
        es: "Entonces nunca sale cara: $P=0$.",
        ja: "表が出ないので $P=0$。",
        zh: "此时从不出正面，$P=0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Complement",
          fr: "Événement contraire",
          es: "Complementario",
          ja: "余事象",
          zh: "对立事件"
        },
        lines: ["P=1-P(0\\ \\text{H})-P(1\\ \\text{H})=1-s^3-3(1-s)s^2"],
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
          ja: "整理",
          zh: "化简"
        },
        lines: ["P=1-3s^2+2s^3=1-3\\sin^4\\alpha+2\\sin^6\\alpha"],
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
