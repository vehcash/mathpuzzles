/* probability · Did the student know it?
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2024-knew-or-guessed",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.2",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.2",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.2",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.2",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.2"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Did the student know it?",
      fr: "L’élève savait-il ?",
      es: "¿Lo sabía el alumno?",
      ja: "知っていたのか？",
      zh: "学生是真会吗？"
    },
    statement: {
      en: "A student either knows the answer to a multiple-choice question or guesses. A guess is correct with probability $\\tfrac12$. The probability that the student guessed, given that the answer is correct, is $\\tfrac16$. <b>Which of the following equal the probability that the student knows the answer?</b>",
      fr: "Un élève connaît la réponse à une question à choix multiple ou bien devine. Une réponse devinée est juste avec probabilité $\\tfrac12$. La probabilité qu’il ait deviné sachant que la réponse est juste vaut $\\tfrac16$. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’il connaisse la réponse ?</b>",
      es: "Un alumno sabe la respuesta de una pregunta tipo test o adivina. Al adivinar acierta con probabilidad $\\tfrac12$. La probabilidad de que haya adivinado, sabiendo que acertó, es $\\tfrac16$. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que sepa la respuesta?</b>",
      ja: "生徒は多肢選択問題の答えを知っているか、当て推量で答えます。推量で正解する確率は $\\tfrac12$。正解だったときに推量だった確率は $\\tfrac16$ です。<b>生徒が答えを知っている確率に等しいものはどれですか？</b>",
      zh: "学生对一道选择题要么会做，要么猜。猜对的概率为 $\\tfrac12$。已知答对时是猜的概率为 $\\tfrac16$。<b>学生会做的概率等于下列哪些？</b>"
    },
    figureText: {
      en: "A tree: knows (p) → correct; guesses (1 − p) → correct (1/2) or wrong (1/2).",
      fr: "Un arbre : sait (p) → juste ; devine (1 − p) → juste (1/2) ou faux (1/2).",
      es: "Un árbol: sabe (p) → acierta; adivina (1 − p) → acierta (1/2) o falla (1/2).",
      ja: "樹形図：知っている (p) → 正解、推量 (1 − p) → 正解 (1/2) か不正解 (1/2)。",
      zh: "树形图：会 (p) → 对；猜 (1 − p) → 对 (1/2) 或错 (1/2)。"
    },
    hint: {
      en: "Bayes: $P(\\text{guess}\\mid\\text{correct})=\\dfrac{\\frac12(1-p)}{p+\\frac12(1-p)}$.",
      fr: "Bayes : $P(\\text{devine}\\mid\\text{juste})=\\dfrac{\\frac12(1-p)}{p+\\frac12(1-p)}$.",
      es: "Bayes: $P(\\text{adivina}\\mid\\text{acierta})=\\dfrac{\\frac12(1-p)}{p+\\frac12(1-p)}$.",
      ja: "ベイズ：$P(\\text{推量}\\mid\\text{正解})=\\dfrac{\\frac12(1-p)}{p+\\frac12(1-p)}$。",
      zh: "贝叶斯：$P(\\text{猜}\\mid\\text{对})=\\dfrac{\\frac12(1-p)}{p+\\frac12(1-p)}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 3.0, scale: 56, pad: 14 });
      const R = [0.4, 1.5], K = [2.2, 2.4], G = [2.2, 0.6];
      F.seg(R, K); F.seg(R, G); F.seg(K, [4.4, 2.4]); F.seg(G, [4.4, 1.0]); F.seg(G, [4.4, 0.2]);
      [R, K, G].forEach(p => F.dot(p));
      F.text(mid(R, K), 'p', 'len small', -8, -10); F.text(mid(R, G), '1−p', 'len small', -14, 12);
      F.text([4.6, 2.4], '✓', 'pt', 0, 0); F.text([4.6, 1.0], '✓', 'pt', 0, 0); F.text([4.6, 0.2], '✗', 'pt', 0, 0);
      F.text([3.3, 0.95], '½', 'len small', 0, -10); F.text([3.3, 0.25], '½', 'len small', 0, 12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "guess": {"fr": "devine", "es": "adivina", "ja": "推量", "zh": "猜"},
      "correct": {"fr": "juste", "es": "acierta", "ja": "正解", "zh": "对"},
      "knows": {"fr": "sait", "es": "sabe", "ja": "知っている", "zh": "会"}
    },
    options: [
      { tex: "\\tfrac57", correct: true, why: {
        en: "$\\tfrac{(1-p)/2}{(1+p)/2}=\\tfrac16\\Rightarrow6-6p=1+p$.",
        fr: "$\\tfrac{(1-p)/2}{(1+p)/2}=\\tfrac16\\Rightarrow6-6p=1+p$.",
        es: "$\\tfrac{(1-p)/2}{(1+p)/2}=\\tfrac16\\Rightarrow6-6p=1+p$.",
        ja: "$\\tfrac{(1-p)/2}{(1+p)/2}=\\tfrac16\\Rightarrow6-6p=1+p$.",
        zh: "$\\tfrac{(1-p)/2}{(1+p)/2}=\\tfrac16\\Rightarrow6-6p=1+p$."
      } },
      { tex: "1-\\tfrac27", correct: true, why: {
        en: "The complement of guessing, $\\tfrac27$.",
        fr: "Le complémentaire de « deviner », $\\tfrac27$.",
        es: "El complementario de adivinar, $\\tfrac27$.",
        ja: "推量する確率 $\\tfrac27$ の余事象。",
        zh: "猜的概率 $\\tfrac27$ 的补。"
      } },
      { tex: "\\tfrac1{12}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac17", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac5{12}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac56", correct: false, why: {
        en: "That is $P(\\text{knows}\\mid\\text{correct})$, not $P(\\text{knows})$.",
        fr: "C’est $P(\\text{sait}\\mid\\text{juste})$, pas $P(\\text{sait})$.",
        es: "Es $P(\\text{sabe}\\mid\\text{acierta})$, no $P(\\text{sabe})$.",
        ja: "$P(\\text{知っている}\\mid\\text{正解})$ で、$P(\\text{知っている})$ ではない。",
        zh: "那是 $P(\\text{会}\\mid\\text{对})$，不是 $P(\\text{会})$。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "Ignores that a guess is right only half the time.",
        fr: "Oublie qu’une réponse devinée n’est juste qu’une fois sur deux.",
        es: "Olvida que adivinar solo acierta la mitad.",
        ja: "推量の正解率が半分であることを無視。",
        zh: "忽略了猜对只有一半概率。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "No reason for a fair split.",
        fr: "Aucune raison d’un partage égal.",
        es: "No hay razón para un reparto igual.",
        ja: "半々になる理由はない。",
        zh: "没有理由对半。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Total probability of a correct answer",
          fr: "Probabilité totale d’une bonne réponse",
          es: "Probabilidad total de acertar",
          ja: "正解の確率",
          zh: "答对的全概率"
        },
        lines: ["P(\\checkmark)=p+\\tfrac12(1-p)=\\tfrac{1+p}{2}"],
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
          en: "Bayes",
          fr: "Bayes",
          es: "Bayes",
          ja: "ベイズ",
          zh: "贝叶斯"
        },
        lines: ["\\frac{\\frac12(1-p)}{\\frac12(1+p)}=\\frac16\\iff6(1-p)=1+p\\iff p=\\boxed{\\tfrac57}"],
        note: {
          en: "Check: $\\tfrac{1/7}{6/7}=\\tfrac16$. ✓",
          fr: "Vérification : $\\tfrac{1/7}{6/7}=\\tfrac16$. ✓",
          es: "Comprobación: $\\tfrac{1/7}{6/7}=\\tfrac16$. ✓",
          ja: "確認：$\\tfrac{1/7}{6/7}=\\tfrac16$。✓",
          zh: "验证：$\\tfrac{1/7}{6/7}=\\tfrac16$。✓"
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
