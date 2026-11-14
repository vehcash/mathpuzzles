/* algebra · When has x⁴ − (2k+1)x² + 2x + k² − 1 four real roots?
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2021b-quartic-four-real-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question E",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question E",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta E",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 E",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 E 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "When has x⁴ − (2k+1)x² + 2x + k² − 1 four real roots?",
      fr: "Quand x⁴ − (2k+1)x² + 2x + k² − 1 a-t-il quatre racines réelles ?",
      es: "¿Cuándo tiene x⁴ − (2k+1)x² + 2x + k² − 1 cuatro raíces reales?",
      ja: "x⁴ − (2k+1)x² + 2x + k² − 1 が4つの実数解をもつ条件",
      zh: "x⁴ − (2k+1)x² + 2x + k² − 1 何时有四个实根？"
    },
    statement: {
      en: "Consider $x^4-(2k+1)x^2+2x+k^2-1=0$, where $k$ is real. We want exactly four distinct real roots. <b>Which of the following are true?</b>",
      fr: "On considère $x^4-(2k+1)x^2+2x+k^2-1=0$, $k$ réel. On veut exactement quatre racines réelles distinctes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $x^4-(2k+1)x^2+2x+k^2-1=0$, con $k$ real. Se buscan exactamente cuatro raíces reales distintas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $k$ に対し $x^4-(2k+1)x^2+2x+k^2-1=0$ がちょうど4つの異なる実数解をもつ条件を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $x^4-(2k+1)x^2+2x+k^2-1=0$（$k$ 为实数），要求恰有四个不同实根。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line for k with −5/4, 3/4 and 1 marked.",
      fr: "Une droite des k avec −5/4, 3/4 et 1.",
      es: "Una recta para k con −5/4, 3/4 y 1.",
      ja: "k の数直線に −5/4, 3/4, 1。",
      zh: "k 的数轴，标出 −5/4、3/4、1。"
    },
    hint: {
      en: "View it as a quadratic in $k$: $k^2-2x^2k+(x^4-x^2+2x-1)=0$, and factor.",
      fr: "Voyez-la comme un trinôme en $k$ : $k^2-2x^2k+(x^4-x^2+2x-1)=0$, et factorisez.",
      es: "Mírala como cuadrática en $k$: $k^2-2x^2k+(x^4-x^2+2x-1)=0$, y factoriza.",
      ja: "$k$ の2次式 $k^2-2x^2k+(x^4-x^2+2x-1)=0$ とみて因数分解。",
      zh: "视为关于 $k$ 的二次式 $k^2-2x^2k+(x^4-x^2+2x-1)=0$ 并分解。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 16 });
      F.seg([0.2, 0.7], [6.2, 0.7], 'axis');
      [['−5/4', 0.9], ['3/4', 3.6], ['1', 4.4]].forEach(([t, x]) => { F.dot([x, 0.7]); F.text([x, 0.7], t, 'tick', 0, 18); });
      F.reveal = () => {
      F.seg([3.6, 0.7], [4.4, 0.7], 'hl'); F.seg([4.4, 0.7], [6.2, 0.7], 'hl'); F.circle([4.4, 0.7], 0.1, 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "−5/4": {"fr": "−5/4", "es": "−5/4", "ja": "−5/4", "zh": "−5/4"},
      "3/4": {"fr": "3/4", "es": "3/4", "ja": "3/4", "zh": "3/4"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "the quartic is": {"fr": "la quartique vaut", "es": "la cuártica es", "ja": "4次式は", "zh": "该四次式为"},
      "gives a repeated root": {"fr": "donne une racine double", "es": "da una raíz doble", "ja": "で重解", "zh": "给出重根"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "common root": {"fr": "racine commune", "es": "raíz común", "ja": "共通解", "zh": "公共根"},
      "has no real roots": {"fr": "n’a pas de racine réelle", "es": "no tiene raíces reales", "ja": "は実数解をもたない", "zh": "无实根"}
    },
    options: [
      { tex: "\\tfrac34<k<1\\ \\text{or}\\ k>1", correct: true, why: {
        en: "Both factors need two real roots, and at $k=1$ they share the root $x=1$.",
        fr: "Les deux facteurs doivent avoir deux racines, et pour $k=1$ ils partagent $x=1$.",
        es: "Ambos factores deben tener dos raíces, y en $k=1$ comparten $x=1$.",
        ja: "両因数が2実数解をもち、$k=1$ では $x=1$ を共有する。",
        zh: "两个因式都需有两实根，且 $k=1$ 时共享根 $x=1$。"
      } },
      { tex: "\\text{the quartic is}\\ (x^2+x-k-1)(x^2-x-k+1)", correct: true, why: {
        en: "$(x^2-k)^2-(x-1)^2$",
        fr: "$(x^2-k)^2-(x-1)^2$",
        es: "$(x^2-k)^2-(x-1)^2$",
        ja: "$(x^2-k)^2-(x-1)^2$",
        zh: "$(x^2-k)^2-(x-1)^2$"
      } },
      { tex: "k>\\tfrac34", correct: false, why: {
        en: "At $k=1$ there are only three distinct roots.",
        fr: "Pour $k=1$ il n’y a que trois racines distinctes.",
        es: "En $k=1$ solo hay tres raíces distintas.",
        ja: "$k=1$ では異なる解は3つ。",
        zh: "$k=1$ 时只有三个不同根。"
      } },
      { tex: "k>-\\tfrac54", correct: false, why: {
        en: "That only makes the first factor have real roots.",
        fr: "Cela ne concerne que le premier facteur.",
        es: "Eso solo afecta al primer factor.",
        ja: "それは片方の因数だけの条件。",
        zh: "那只保证一个因式有实根。"
      } },
      { tex: "k>1", correct: false, why: {
        en: "Misses $\\tfrac34<k<1$, e.g. $k=0.9$.",
        fr: "Oublie $\\tfrac34<k<1$, par ex. $k=0{,}9$.",
        es: "Olvida $\\tfrac34<k<1$, p. ej. $k=0{,}9$.",
        ja: "$\\tfrac34<k<1$（例 $k=0.9$）を見落とす。",
        zh: "漏了 $\\tfrac34<k<1$，如 $k=0.9$。"
      } },
      { tex: "k<-\\tfrac54\\ \\text{or}\\ k>\\tfrac34", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=-1\\ \\text{works}", correct: false, why: {
        en: "Then $x^2-x+2$ has no real roots.",
        fr: "Alors $x^2-x+2$ n’a pas de racine réelle.",
        es: "Entonces $x^2-x+2$ no tiene raíces reales.",
        ja: "このとき $x^2-x+2$ は実数解をもたない。",
        zh: "此时 $x^2-x+2$ 无实根。"
      } },
      { tex: "k=0\\ \\text{works}", correct: false, why: {
        en: "Then $x^2-x+1$ has no real roots.",
        fr: "Alors $x^2-x+1$ n’a pas de racine réelle.",
        es: "Entonces $x^2-x+1$ no tiene raíces reales.",
        ja: "このとき $x^2-x+1$ は実数解をもたない。",
        zh: "此时 $x^2-x+1$ 无实根。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Difference of squares",
          fr: "Différence de carrés",
          es: "Diferencia de cuadrados",
          ja: "2乗の差",
          zh: "平方差"
        },
        lines: ["x^4-2kx^2+k^2-(x^2-2x+1)=(x^2-k)^2-(x-1)^2"],
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
          en: "Two quadratics",
          fr: "Deux trinômes",
          es: "Dos cuadráticas",
          ja: "2つの2次式",
          zh: "两个二次式"
        },
        lines: ["x^2+x-(k+1):\\ 4k+5>0;\\qquad x^2-x-(k-1):\\ 4k-3>0;\\qquad \\text{common root}\\iff k=1"],
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
