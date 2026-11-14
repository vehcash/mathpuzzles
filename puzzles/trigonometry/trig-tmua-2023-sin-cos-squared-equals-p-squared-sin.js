/* trigonometry · How many solutions has sin x cos² x = p² sin x?
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2023-sin-cos-squared-equals-p-squared-sin",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 12",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 2, question 12",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 2, pregunta 12",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 2 第12問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 2 第 12 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "How many solutions has sin x cos² x = p² sin x?",
      fr: "Combien de solutions pour sin x cos² x = p² sin x ?",
      es: "¿Cuántas soluciones tiene sen x cos² x = p² sen x?",
      ja: "sin x cos² x = p² sin x の解の個数",
      zh: "sin x cos² x = p² sin x 有几个解？"
    },
    statement: {
      en: "For a real constant $p$, let $n$ be the number of distinct solutions of $\\sin x\\cos^2x=p^2\\sin x$ with $0\\le x\\le2\\pi$. <b>Which of the following are true?</b>",
      fr: "Pour une constante réelle $p$, soit $n$ le nombre de solutions distinctes de $\\sin x\\cos^2x=p^2\\sin x$ avec $0\\le x\\le2\\pi$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para una constante real $p$, sea $n$ el número de soluciones distintas de $\\sin x\\cos^2x=p^2\\sin x$ con $0\\le x\\le2\\pi$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数の定数 $p$ に対し、$0\\le x\\le2\\pi$ での $\\sin x\\cos^2x=p^2\\sin x$ の異なる解の個数を $n$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对实常数 $p$，设 $\\sin x\\cos^2x=p^2\\sin x$ 在 $0\\le x\\le2\\pi$ 内不同解的个数为 $n$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of cos² x on [0, 2π] and a horizontal level p².",
      fr: "Le graphe de cos² x sur [0, 2π] et un niveau horizontal p².",
      es: "La gráfica de cos² x en [0, 2π] y un nivel horizontal p².",
      ja: "[0, 2π] での cos² x と水平線 p²。",
      zh: "[0, 2π] 上 cos² x 的图像与水平线 p²。"
    },
    hint: {
      en: "Factor: $\\sin x\\,(\\cos^2x-p^2)=0$. The zeros of $\\sin x$ always give $3$ solutions.",
      fr: "Factorisez : $\\sin x\\,(\\cos^2x-p^2)=0$. Les zéros de $\\sin x$ donnent toujours $3$ solutions.",
      es: "Factoriza: $\\sin x\\,(\\cos^2x-p^2)=0$. Los ceros de $\\sin x$ siempre dan $3$ soluciones.",
      ja: "$\\sin x\\,(\\cos^2x-p^2)=0$ と因数分解。$\\sin x=0$ から常に3解。",
      zh: "因式分解 $\\sin x\\,(\\cos^2x-p^2)=0$，$\\sin x=0$ 总给出 3 个解。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.8, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.3 + x * 0.86, 0.5 + y * 1.8];
      F.seg(S([0, 0]), S([6.5, 0]), 'axis'); F.seg(S([0, -0.1]), S([0, 1.2]), 'axis'); F.text(S([2 * Math.PI, 0]), '2π', 'tick', 0, 14); F.text(S([0, 1]), '1', 'tick', -10, 0);
      plot(F, S, x => Math.cos(x) ** 2, 0, 2 * Math.PI, 'graph');
      F.seg(S([0, 0.25]), S([2 * Math.PI, 0.25]), 'seg thin dashc'); F.text(S([2 * Math.PI, 0.25]), 'p²', 'len small', 12, 0);
      F.reveal = () => {
      [0, Math.PI, 2 * Math.PI].forEach(x => F.dot(S([x, 0]))); [Math.PI / 3, 2 * Math.PI / 3, 4 * Math.PI / 3, 5 * Math.PI / 3].forEach(x => F.dot(S([x, 0.25])));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2π": {"fr": "2π", "es": "2π", "ja": "2π", "zh": "2π"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "p²": {"fr": "p²", "es": "p²", "ja": "p²", "zh": "p²"},
      "for some": {"fr": "pour un certain", "es": "para algún", "ja": "ある", "zh": "对某个"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"}
    },
    options: [
      { tex: "n=7\\ \\Rightarrow\\ -1<p<1", correct: true, why: {
        en: "$n=7$ needs $0<p^2<1$.",
        fr: "$n=7$ exige $0<p^2<1$.",
        es: "$n=7$ requiere $0<p^2<1$.",
        ja: "$n=7$ には $0<p^2<1$ が必要。",
        zh: "$n=7$ 要求 $0<p^2<1$。"
      } },
      { tex: "p=0\\ \\Rightarrow\\ n=5", correct: true, why: {
        en: "$0,\\tfrac\\pi2,\\pi,\\tfrac{3\\pi}2,2\\pi$",
        fr: "$0,\\tfrac\\pi2,\\pi,\\tfrac{3\\pi}2,2\\pi$",
        es: "$0,\\tfrac\\pi2,\\pi,\\tfrac{3\\pi}2,2\\pi$",
        ja: "$0,\\tfrac\\pi2,\\pi,\\tfrac{3\\pi}2,2\\pi$",
        zh: "$0,\\tfrac\\pi2,\\pi,\\tfrac{3\\pi}2,2\\pi$"
      } },
      { tex: "n=3\\ \\Rightarrow\\ p>1", correct: false, why: {
        en: "$p=-2\\ \\Rightarrow\\ n=3$",
        fr: "$p=-2\\ \\Rightarrow\\ n=3$",
        es: "$p=-2\\ \\Rightarrow\\ n=3$",
        ja: "$p=-2\\ \\Rightarrow\\ n=3$",
        zh: "$p=-2\\ \\Rightarrow\\ n=3$"
      } },
      { tex: "p=1\\ \\Rightarrow\\ n=5", correct: false, why: {
        en: "$\\cos x=\\pm1$ only at $0,\\pi,2\\pi$, already counted: $n=3$.",
        fr: "$\\cos x=\\pm1$ seulement en $0,\\pi,2\\pi$, déjà comptés : $n=3$.",
        es: "$\\cos x=\\pm1$ solo en $0,\\pi,2\\pi$, ya contados: $n=3$.",
        ja: "$\\cos x=\\pm1$ は $0,\\pi,2\\pi$ のみで既出：$n=3$。",
        zh: "$\\cos x=\\pm1$ 只在 $0,\\pi,2\\pi$，已计入：$n=3$。"
      } },
      { tex: "0<|p|<1\\ \\Rightarrow\\ n=6", correct: false, why: {
        en: "Forgets one of the endpoints $0$ or $2\\pi$.",
        fr: "Oublie une des extrémités $0$ ou $2\\pi$.",
        es: "Olvida uno de los extremos $0$ o $2\\pi$.",
        ja: "端点 $0$ か $2\\pi$ を忘れている。",
        zh: "漏了端点 $0$ 或 $2\\pi$。"
      } },
      { tex: "n=4\\ \\text{for some}\\ p", correct: false, why: {
        en: "$n\\in\\{3,5,7\\}$",
        fr: "$n\\in\\{3,5,7\\}$",
        es: "$n\\in\\{3,5,7\\}$",
        ja: "$n\\in\\{3,5,7\\}$",
        zh: "$n\\in\\{3,5,7\\}$"
      } },
      { tex: "n=3\\ \\text{for every}\\ p", correct: false, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "p=\\tfrac12\\ \\Rightarrow\\ n=5", correct: false, why: {
        en: "$n=7$",
        fr: "$n=7$",
        es: "$n=7$",
        ja: "$n=7$",
        zh: "$n=7$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["\\sin x=0:\\ x=0,\\pi,2\\pi;\\qquad\\cos x=\\pm|p|"],
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
          en: "Cases",
          fr: "Cas",
          es: "Casos",
          ja: "場合分け",
          zh: "分类"
        },
        lines: ["|p|\\ge1:\\ n=3;\\quad p=0:\\ n=5;\\quad0<|p|<1:\\ n=7"],
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
