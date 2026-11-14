/* trigonometry · (x + 1)(3 − x) = 2(1 − cos πx)
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2021-parabola-meets-one-minus-cos",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 14",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 14",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 14",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第14問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 14 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "(x + 1)(3 − x) = 2(1 − cos πx)",
      fr: "(x + 1)(3 − x) = 2(1 − cos πx)",
      es: "(x + 1)(3 − x) = 2(1 − cos πx)",
      ja: "(x + 1)(3 − x) = 2(1 − cos πx)",
      zh: "(x + 1)(3 − x) = 2(1 − cos πx)"
    },
    statement: {
      en: "Let $n$ be the number of real solutions of $(x+1)(3-x)=2(1-\\cos\\pi x)$. <b>Which of the following are true?</b>",
      fr: "Soit $n$ le nombre de solutions réelles de $(x+1)(3-x)=2(1-\\cos\\pi x)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $n$ el número de soluciones reales de $(x+1)(3-x)=2(1-\\cos\\pi x)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$(x+1)(3-x)=2(1-\\cos\\pi x)$ の実数解の個数を $n$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $(x+1)(3-x)=2(1-\\cos\\pi x)$ 的实数解个数为 $n$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A downward parabola and a wave between 0 and 4.",
      fr: "Une parabole vers le bas et une onde entre 0 et 4.",
      es: "Una parábola hacia abajo y una onda entre 0 y 4.",
      ja: "上に凸の放物線と 0〜4 の波。",
      zh: "开口向下的抛物线与 0 到 4 之间的波。"
    },
    hint: {
      en: "The right side lies in $[0,4]$; the left side is at most $4$, reached only at $x=1$.",
      fr: "Le membre de droite est dans $[0,4]$ ; celui de gauche vaut au plus $4$, atteint seulement en $x=1$.",
      es: "El lado derecho está en $[0,4]$; el izquierdo vale como mucho $4$, solo en $x=1$.",
      ja: "右辺は $[0,4]$、左辺の最大 $4$ は $x=1$ のみ。",
      zh: "右边在 $[0,4]$ 内；左边最大为 $4$，仅在 $x=1$ 取到。"
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
      const S = ([x, y]) => [0.2 + (x - (-1.8)) * 0.82143, 0.2 + (y - (-1)) * 0.50000];
      const K = 0.82143;
      F.seg(S([-1.8, 0]), S([3.8, 0]), 'axis'); F.seg(S([0, -1]), S([0, 5]), 'axis');
      plot(F, S, x => (x + 1) * (3 - x), -1.5, 3.5, 'graph', 'base', -1, 5); plot(F, S, x => 2 * (1 - Math.cos(Math.PI * x)), -1.8, 3.8, 'seg', 'base', -1, 5);
      F.reveal = () => {
      [-0.47297, 1, 2.47297].forEach(x => F.dot(S([x, (x + 1) * (3 - x)])));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is a solution": {"fr": "est une solution", "es": "es una solución", "ja": "は解", "zh": "是解"},
      "there is a solution with": {"fr": "il existe une solution avec", "es": "hay una solución con", "ja": "次を満たす解がある：", "zh": "存在解满足"},
      "left side": {"fr": "membre de gauche", "es": "lado izquierdo", "ja": "左辺", "zh": "左边"},
      "right side": {"fr": "membre de droite", "es": "lado derecho", "ja": "右辺", "zh": "右边"},
      "solutions need": {"fr": "les solutions exigent", "es": "las soluciones requieren", "ja": "解には次が必要：", "zh": "解需满足"}
    },
    options: [
      { tex: "n=3", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "x=1\\ \\text{is a solution}", correct: true, why: {
        en: "$4=2(1+1)$",
        fr: "$4=2(1+1)$",
        es: "$4=2(1+1)$",
        ja: "$4=2(1+1)$",
        zh: "$4=2(1+1)$"
      } },
      { tex: "n=2", correct: false, why: {
        en: "Misses the touching point at $x=1$.",
        fr: "Oublie le point de contact en $x=1$.",
        es: "Olvida el punto de contacto en $x=1$.",
        ja: "$x=1$ の接点を見落とし。",
        zh: "漏了 $x=1$ 的切点。"
      } },
      { tex: "n=4", correct: false, why: {
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
      { tex: "n=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there is a solution with}\\ x>3", correct: false, why: {
        en: "$\\text{left side}<0\\le\\text{right side}$",
        fr: "$\\text{left side}<0\\le\\text{right side}$",
        es: "$\\text{left side}<0\\le\\text{right side}$",
        ja: "$\\text{left side}<0\\le\\text{right side}$",
        zh: "$\\text{left side}<0\\le\\text{right side}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Bounds",
          fr: "Bornes",
          es: "Cotas",
          ja: "範囲",
          zh: "范围"
        },
        lines: ["\\text{solutions need}\\ -1\\le x\\le3"],
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
          en: "Count",
          fr: "Compter",
          es: "Contar",
          ja: "数える",
          zh: "计数"
        },
        lines: ["x\\in(-1,0),\\ x=1,\\ x\\in(2,3)\\Rightarrow n=3"],
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
