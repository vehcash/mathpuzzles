/* calculus · ∫ from −1 to 3 of |x|(1 − x)
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2019-integral-of-abs-x-times-one-minus-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 10",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 10",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 10",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第10問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 10 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "∫ from −1 to 3 of |x|(1 − x)",
      fr: "∫ de −1 à 3 de |x|(1 − x)",
      es: "∫ de −1 a 3 de |x|(1 − x)",
      ja: "−1 から 3 までの |x|(1 − x) の積分",
      zh: "|x|(1 − x) 从 −1 到 3 的积分"
    },
    statement: {
      en: "Let $I=\\displaystyle\\int_{-1}^{3}|x|(1-x)\\,dx$. <b>Which of the following are true?</b>",
      fr: "Soit $I=\\displaystyle\\int_{-1}^{3}|x|(1-x)\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $I=\\displaystyle\\int_{-1}^{3}|x|(1-x)\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$I=\\displaystyle\\int_{-1}^{3}|x|(1-x)\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $I=\\displaystyle\\int_{-1}^{3}|x|(1-x)\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of |x|(1 − x).",
      fr: "Le graphe de |x|(1 − x).",
      es: "La gráfica de |x|(1 − x).",
      ja: "|x|(1 − x) のグラフ。",
      zh: "|x|(1 − x) 的图像。"
    },
    hint: {
      en: "Split at $x=0$: $|x|=-x$ on the left.",
      fr: "Coupez en $x=0$ : $|x|=-x$ à gauche.",
      es: "Separa en $x=0$: $|x|=-x$ a la izquierda.",
      ja: "$x=0$ で分ける。左側で $|x|=-x$。",
      zh: "在 $x=0$ 处拆分，左侧 $|x|=-x$。"
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
      const S = ([x, y]) => [0.2 + (x - (-1.4)) * 0.97872, 0.2 + (y - (-6.5)) * 0.33333];
      const K = 0.97872;
      F.seg(S([-1.4, 0]), S([3.3, 0]), 'axis'); F.seg(S([0, -6.5]), S([0, 2.5]), 'axis');
      plot(F, S, x => Math.abs(x) * (1 - x), -1.2, 3.1, 'graph', 'base', -6.5, 2.5); F.text(S([3, 0]), '3', 'tick', 0, -10); F.text(S([-1, 0]), '−1', 'tick', 0, 14);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 60; k++) { const x = -1 + 4 * k / 60; pts.push(S([x, Math.abs(x) * (1 - x)])); } F.path([S([-1, 0])].concat(pts, [S([3, 0])]), 'fill-yellow', 'fills');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "−1": {"fr": "−1", "es": "−1", "ja": "−1", "zh": "−1"}
    },
    options: [
      { tex: "I=-\\tfrac{11}3", correct: true, why: {
        en: "$\\tfrac56-\\tfrac92$",
        fr: "$\\tfrac56-\\tfrac92$",
        es: "$\\tfrac56-\\tfrac92$",
        ja: "$\\tfrac56-\\tfrac92$",
        zh: "$\\tfrac56-\\tfrac92$"
      } },
      { tex: "\\int_{-1}^0|x|(1-x)\\,dx=\\tfrac56", correct: true, why: {
        en: "$\\int_{-1}^0(x^2-x)\\,dx$",
        fr: "$\\int_{-1}^0(x^2-x)\\,dx$",
        es: "$\\int_{-1}^0(x^2-x)\\,dx$",
        ja: "$\\int_{-1}^0(x^2-x)\\,dx$",
        zh: "$\\int_{-1}^0(x^2-x)\\,dx$"
      } },
      { tex: "I=\\tfrac{11}3", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "I=-\\tfrac{16}3", correct: false, why: {
        en: "Ignores the absolute value.",
        fr: "Ignore la valeur absolue.",
        es: "Ignora el valor absoluto.",
        ja: "絶対値を無視。",
        zh: "忽略了绝对值。"
      } },
      { tex: "I=-\\tfrac92", correct: false, why: {
        en: "Only the part from $0$ to $3$.",
        fr: "Seulement de $0$ à $3$.",
        es: "Solo de $0$ a $3$.",
        ja: "$0$ から $3$ だけ。",
        zh: "只算了 $0$ 到 $3$。"
      } },
      { tex: "I=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=-\\tfrac73", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "I=\\tfrac{19}3", correct: false, why: {
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
          en: "Left part",
          fr: "Partie gauche",
          es: "Parte izquierda",
          ja: "左側",
          zh: "左段"
        },
        lines: ["\\int_{-1}^0(-x)(1-x)\\,dx=\\int_{-1}^0(x^2-x)\\,dx=\\tfrac13+\\tfrac12=\\tfrac56"],
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
          en: "Right part",
          fr: "Partie droite",
          es: "Parte derecha",
          ja: "右側",
          zh: "右段"
        },
        lines: ["\\int_0^3(x-x^2)\\,dx=\\tfrac92-9=-\\tfrac92;\\quad I=\\tfrac56-\\tfrac92=-\\tfrac{11}3"],
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
