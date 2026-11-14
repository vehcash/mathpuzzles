/* trigonometry · f − g = 2 sin x and fg = cos² x
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2022-difference-two-sin-product-cos-squared",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 9",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 9",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 9",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第9問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 9 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "f − g = 2 sin x and fg = cos² x",
      fr: "f − g = 2 sin x et fg = cos² x",
      es: "f − g = 2 sen x y fg = cos² x",
      ja: "f − g = 2 sin x、fg = cos² x",
      zh: "f − g = 2 sin x 且 fg = cos² x"
    },
    statement: {
      en: "Real functions $f$ and $g$ satisfy $f(x)-g(x)=2\\sin x$ and $f(x)\\,g(x)=\\cos^2x$ for every real $x$. <b>Which of the following are true?</b>",
      fr: "Des fonctions réelles $f$ et $g$ vérifient $f(x)-g(x)=2\\sin x$ et $f(x)\\,g(x)=\\cos^2x$ pour tout réel $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Funciones reales $f$ y $g$ cumplen $f(x)-g(x)=2\\sin x$ y $f(x)\\,g(x)=\\cos^2x$ para todo $x$ real. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実関数 $f,g$ は全ての実数 $x$ で $f(x)-g(x)=2\\sin x$、$f(x)\\,g(x)=\\cos^2x$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "实函数 $f,g$ 对所有实数 $x$ 满足 $f(x)-g(x)=2\\sin x$，$f(x)\\,g(x)=\\cos^2x$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of 2 sin x and cos² x over one period.",
      fr: "Les graphes de 2 sin x et cos² x sur une période.",
      es: "Las gráficas de 2 sen x y cos² x en un periodo.",
      ja: "1周期での 2 sin x と cos² x のグラフ。",
      zh: "一个周期内 2 sin x 与 cos² x 的图像。"
    },
    hint: {
      en: "$(f+g)^2=(f-g)^2+4fg$.",
      fr: "$(f+g)^2=(f-g)^2+4fg$.",
      es: "$(f+g)^2=(f-g)^2+4fg$.",
      ja: "$(f+g)^2=(f-g)^2+4fg$。",
      zh: "$(f+g)^2=(f-g)^2+4fg$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.3 + x * 0.86, 1.7 + y * 0.7];
      F.seg(S([0, 0]), S([6.5, 0]), 'axis'); F.seg(S([0, -2.3]), S([0, 2.3]), 'axis'); F.text(S([2 * Math.PI, 0]), '2π', 'tick', 0, 14);
      plot(F, S, x => 2 * Math.sin(x), 0, 2 * Math.PI, 'graph'); plot(F, S, x => Math.cos(x) ** 2, 0, 2 * Math.PI, 'seg dashc');
      F.reveal = () => {
      plot(F, S, x => Math.sin(x) - 1, 0, 2 * Math.PI, 'hl pink'); F.dot(S([1.5 * Math.PI, -2]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2π": {"fr": "2π", "es": "2π", "ja": "2π", "zh": "2π"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "the least value": {"fr": "la plus petite valeur que", "es": "el menor valor que", "ja": "最小値：", "zh": "最小值："},
      "can take is": {"fr": "peut prendre est", "es": "puede tomar es", "ja": "がとり得る最小値は", "zh": "能取到的最小值为"},
      "can be negative": {"fr": "peut être négatif", "es": "puede ser negativo", "ja": "は負になり得る", "zh": "可以为负"},
      "for some": {"fr": "pour un certain", "es": "para algún", "ja": "ある", "zh": "对某个"},
      "with": {"fr": "avec", "es": "con", "ja": "で", "zh": "且"}
    },
    options: [
      { tex: "f(x)+g(x)=\\pm2\\ \\text{for every}\\ x", correct: true, why: {
        en: "$(f+g)^2=4\\sin^2x+4\\cos^2x=4$",
        fr: "$(f+g)^2=4\\sin^2x+4\\cos^2x=4$",
        es: "$(f+g)^2=4\\sin^2x+4\\cos^2x=4$",
        ja: "$(f+g)^2=4\\sin^2x+4\\cos^2x=4$",
        zh: "$(f+g)^2=4\\sin^2x+4\\cos^2x=4$"
      } },
      { tex: "\\text{the least value}\\ f(x)\\ \\text{can take is}\\ -2", correct: true, why: {
        en: "$f=\\sin x\\pm1$; take $f=\\sin x-1$ at $x=\\tfrac{3\\pi}2$.",
        fr: "$f=\\sin x\\pm1$ ; prendre $f=\\sin x-1$ en $x=\\tfrac{3\\pi}2$.",
        es: "$f=\\sin x\\pm1$; toma $f=\\sin x-1$ en $x=\\tfrac{3\\pi}2$.",
        ja: "$f=\\sin x\\pm1$。$x=\\tfrac{3\\pi}2$ で $f=\\sin x-1$。",
        zh: "$f=\\sin x\\pm1$，取 $f=\\sin x-1$、$x=\\tfrac{3\\pi}2$。"
      } },
      { tex: "\\text{the least value}\\ f(x)\\ \\text{can take is}\\ -1-\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the least value}\\ f(x)\\ \\text{can take is}\\ -1", correct: false, why: {
        en: "That is $\\min(\\sin x)$, not $\\min(\\sin x-1)$.",
        fr: "C’est $\\min(\\sin x)$, pas $\\min(\\sin x-1)$.",
        es: "Es $\\min(\\sin x)$, no $\\min(\\sin x-1)$.",
        ja: "$\\min(\\sin x)$ であり $\\min(\\sin x-1)$ ではない。",
        zh: "那是 $\\min(\\sin x)$，不是 $\\min(\\sin x-1)$。"
      } },
      { tex: "\\text{the least value}\\ f(x)\\ \\text{can take is}\\ -3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the least value}\\ f(x)\\ \\text{can take is}\\ -4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(x)\\,g(x)\\ \\text{can be negative}", correct: false, why: {
        en: "$\\cos^2x\\ge0$",
        fr: "$\\cos^2x\\ge0$",
        es: "$\\cos^2x\\ge0$",
        ja: "$\\cos^2x\\ge0$",
        zh: "$\\cos^2x\\ge0$"
      } },
      { tex: "f(x)=g(x)\\ \\text{for some}\\ x\\ \\text{with}\\ \\sin x\\ne0", correct: false, why: {
        en: "$f-g=2\\sin x\\ne0$",
        fr: "$f-g=2\\sin x\\ne0$",
        es: "$f-g=2\\sin x\\ne0$",
        ja: "$f-g=2\\sin x\\ne0$",
        zh: "$f-g=2\\sin x\\ne0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find f + g",
          fr: "Trouver f + g",
          es: "Hallar f + g",
          ja: "f + g を求める",
          zh: "求 f + g"
        },
        lines: ["(f+g)^2=(f-g)^2+4fg=4\\Rightarrow f+g=\\pm2"],
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
          en: "Solve for f",
          fr: "Résoudre pour f",
          es: "Despejar f",
          ja: "f を求める",
          zh: "解出 f"
        },
        lines: ["f=\\sin x\\pm1\\ge-2,\\quad f\\!\\left(\\tfrac{3\\pi}2\\right)=-2"],
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
