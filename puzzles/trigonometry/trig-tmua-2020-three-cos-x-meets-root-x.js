/* trigonometry · How often does 3 cos x meet √x?
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2020-three-cos-x-meets-root-x",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 12",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 12",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 12",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第12問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 12 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "How often does 3 cos x meet √x?",
      fr: "Combien de fois 3 cos x rencontre-t-il √x ?",
      es: "¿Cuántas veces se cortan 3 cos x y √x?",
      ja: "3 cos x と √x は何回交わるか",
      zh: "3 cos x 与 √x 有几个交点？"
    },
    statement: {
      en: "Let $n$ be the number of real solutions of $3\\cos x=\\sqrt x$. <b>Which of the following are true?</b>",
      fr: "Soit $n$ le nombre de solutions réelles de $3\\cos x=\\sqrt x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $n$ el número de soluciones reales de $3\\cos x=\\sqrt x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$3\\cos x=\\sqrt x$ の実数解の個数を $n$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $3\\cos x=\\sqrt x$ 的实数解个数为 $n$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of 3 cos x and √x for x ≥ 0.",
      fr: "Les graphes de 3 cos x et √x pour x ≥ 0.",
      es: "Las gráficas de 3 cos x y √x para x ≥ 0.",
      ja: "x ≥ 0 での 3 cos x と √x。",
      zh: "x ≥ 0 时 3 cos x 与 √x 的图像。"
    },
    hint: {
      en: "$\\sqrt x>3$ once $x>9$, so only $0\\le x\\le9$ matters.",
      fr: "$\\sqrt x>3$ dès que $x>9$ : seul $0\\le x\\le9$ compte.",
      es: "$\\sqrt x>3$ si $x>9$: solo importa $0\\le x\\le9$.",
      ja: "$x>9$ で $\\sqrt x>3$。$0\\le x\\le9$ だけ見ればよい。",
      zh: "$x>9$ 时 $\\sqrt x>3$，只需看 $0\\le x\\le9$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-0.3)) * 0.40708, 0.2 + (y - (-3.4)) * 0.42857];
      F.seg(S([-0.3, 0]), S([11, 0]), 'axis'); F.seg(S([0, -3.4]), S([0, 3.6]), 'axis');
      plot(F, S, x => 3 * Math.cos(x), 0, 11, 'graph'); plot(F, S, x => Math.sqrt(x), 0, 11, 'seg'); F.text(S([9, 0]), '9', 'tick', 0, 14);
      F.reveal = () => {
      [1.0, 5.2, 7.5].forEach(x0 => { let a = x0 - 1, b = x0 + 1, g = x => 3 * Math.cos(x) - Math.sqrt(x); for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (g(a) * g(m) <= 0) b = m; else a = m; } F.dot(S([a, Math.sqrt(a)])); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "9": {"fr": "9", "es": "9", "ja": "9", "zh": "9"},
      "every solution satisfies": {"fr": "toute solution vérifie", "es": "toda solución cumple", "ja": "すべての解は次を満たす：", "zh": "所有解满足"},
      "is infinite": {"fr": "est infini", "es": "es infinito", "ja": "は無限", "zh": "无穷"},
      "there is a solution with": {"fr": "il existe une solution avec", "es": "hay una solución con", "ja": "次を満たす解がある：", "zh": "存在解满足"},
      "undefined": {"fr": "non défini", "es": "no definido", "ja": "定義されない", "zh": "无定义"}
    },
    options: [
      { tex: "n=3", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "\\text{every solution satisfies}\\ x<9", correct: true, why: {
        en: "$x=9:\\ 3\\cos9<3$",
        fr: "$x=9:\\ 3\\cos9<3$",
        es: "$x=9:\\ 3\\cos9<3$",
        ja: "$x=9:\\ 3\\cos9<3$",
        zh: "$x=9:\\ 3\\cos9<3$"
      } },
      { tex: "n=2", correct: false, why: {
        en: "Misses the crossing near $x\\approx7.5$.",
        fr: "Oublie le point vers $x\\approx7{,}5$.",
        es: "Olvida el corte cerca de $x\\approx7{,}5$.",
        ja: "$x\\approx7.5$ 付近を見落とし。",
        zh: "漏了 $x\\approx7.5$ 附近的交点。"
      } },
      { tex: "n=4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n\\ \\text{is infinite}", correct: false, why: {
        en: "$\\sqrt x\\to\\infty$",
        fr: "$\\sqrt x\\to\\infty$",
        es: "$\\sqrt x\\to\\infty$",
        ja: "$\\sqrt x\\to\\infty$",
        zh: "$\\sqrt x\\to\\infty$"
      } },
      { tex: "\\text{there is a solution with}\\ x<0", correct: false, why: {
        en: "$\\sqrt x\\ \\text{undefined}$",
        fr: "$\\sqrt x\\ \\text{undefined}$",
        es: "$\\sqrt x\\ \\text{undefined}$",
        ja: "$\\sqrt x\\ \\text{undefined}$",
        zh: "$\\sqrt x\\ \\text{undefined}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Restrict",
          fr: "Restreindre",
          es: "Restringir",
          ja: "範囲を絞る",
          zh: "限定范围"
        },
        lines: ["\\sqrt x\\le3\\iff x\\le9"],
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
          en: "Count crossings",
          fr: "Compter",
          es: "Contar",
          ja: "交点を数える",
          zh: "数交点"
        },
        lines: ["x\\approx1.0,\\ 5.2,\\ 7.5\\Rightarrow n=3"],
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
