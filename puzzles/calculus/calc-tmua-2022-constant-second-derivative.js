/* calculus · f″ is constant: find it
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2022-constant-second-derivative",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 3",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 3",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 3",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第3問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 3 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "f″ is constant: find it",
      fr: "f″ est constante : trouvez-la",
      es: "f″ es constante: hállala",
      ja: "f″ は定数：その値は",
      zh: "f″ 为常数：求它"
    },
    statement: {
      en: "A function satisfies $f''(x)=a$ for all $x$ (a constant), $f(0)=1$, $f(1)=2$ and $\\displaystyle\\int_0^1f(x)\\,dx=1$. <b>Which of the following are true?</b>",
      fr: "Une fonction vérifie $f''(x)=a$ pour tout $x$ (constante), $f(0)=1$, $f(1)=2$ et $\\displaystyle\\int_0^1f(x)\\,dx=1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una función cumple $f''(x)=a$ para todo $x$ (constante), $f(0)=1$, $f(1)=2$ y $\\displaystyle\\int_0^1f(x)\\,dx=1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "関数は全ての $x$ で $f''(x)=a$（定数）、$f(0)=1$、$f(1)=2$、$\\displaystyle\\int_0^1f(x)\\,dx=1$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "函数满足对所有 $x$ 有 $f''(x)=a$（常数），$f(0)=1$，$f(1)=2$，$\\displaystyle\\int_0^1f(x)\\,dx=1$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A curve from (0, 1) to (1, 2) whose area over [0, 1] is 1.",
      fr: "Une courbe de (0, 1) à (1, 2) d’aire 1 sur [0, 1].",
      es: "Una curva de (0, 1) a (1, 2) con área 1 en [0, 1].",
      ja: "(0, 1) から (1, 2) への曲線、[0, 1] の面積は 1。",
      zh: "从 (0, 1) 到 (1, 2) 的曲线，[0, 1] 上面积为 1。"
    },
    hint: {
      en: "Write $f(x)=\\tfrac a2x^2+bx+1$ and use the other two conditions.",
      fr: "Écrivez $f(x)=\\tfrac a2x^2+bx+1$ et utilisez les deux autres conditions.",
      es: "Escribe $f(x)=\\tfrac a2x^2+bx+1$ y usa las otras dos condiciones.",
      ja: "$f(x)=\\tfrac a2x^2+bx+1$ とおき残りの2条件を使う。",
      zh: "设 $f(x)=\\tfrac a2x^2+bx+1$，用另两个条件。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.2, scale: 52, pad: 16 });
      const S = ([x, y]) => [0.4 + x * 3.0, 0.3 + y * 1.25];
      F.seg(S([-0.1, 0]), S([1.15, 0]), 'axis'); F.seg(S([0, -0.1]), S([0, 2.2]), 'axis');
      F.dot(S([0, 1])); F.dot(S([1, 2])); F.text(S([0, 1]), '1', 'tick', -10, 0); F.text(S([1, 0]), '1', 'tick', 0, 14); F.text(S([1, 2]), '(1, 2)', 'pt', 0, -10);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 40; k++) { const x = k / 40; pts.push(S([x, 3 * x * x - 2 * x + 1])); }
      F.path([S([0, 0])].concat(pts, [S([1, 0])]), 'fill-yellow', 'fills'); F.path(pts, 'hl pink', 'base', false);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "(1, 2)": {"fr": "(1, 2)", "es": "(1, 2)", "ja": "(1, 2)", "zh": "(1, 2)"},
      "has a maximum on": {"fr": "a un maximum sur", "es": "tiene un máximo en", "ja": "は", "zh": "在"},
      "inside the interval": {"fr": "à l’intérieur de l’intervalle", "es": "en el interior del intervalo", "ja": "の内部で最大値をとる", "zh": "内部取得最大值"}
    },
    options: [
      { tex: "a=6", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "f(x)=3x^2-2x+1", correct: true, why: {
        en: "$f(1)=2,\\ \\int_0^1f=1-1+1=1$",
        fr: "$f(1)=2,\\ \\int_0^1f=1-1+1=1$",
        es: "$f(1)=2,\\ \\int_0^1f=1-1+1=1$",
        ja: "$f(1)=2,\\ \\int_0^1f=1-1+1=1$",
        zh: "$f(1)=2,\\ \\int_0^1f=1-1+1=1$"
      } },
      { tex: "a=-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=3", correct: false, why: {
        en: "That is $\\tfrac a2$, the coefficient of $x^2$.",
        fr: "C’est $\\tfrac a2$, le coefficient de $x^2$.",
        es: "Es $\\tfrac a2$, el coeficiente de $x^2$.",
        ja: "それは $x^2$ の係数 $\\tfrac a2$。",
        zh: "那是 $x^2$ 的系数 $\\tfrac a2$。"
      } },
      { tex: "a=-3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=-2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f\\ \\text{has a maximum on}\\ [0,1]\\ \\text{inside the interval}", correct: false, why: {
        en: "$f''=6>0$",
        fr: "$f''=6>0$",
        es: "$f''=6>0$",
        ja: "$f''=6>0$",
        zh: "$f''=6>0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Integrate twice",
          fr: "Intégrer deux fois",
          es: "Integrar dos veces",
          ja: "2回積分",
          zh: "积分两次"
        },
        lines: ["f(x)=\\tfrac a2x^2+bx+1,\\quad f(1)=2\\Rightarrow b=1-\\tfrac a2"],
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
          en: "Use the integral",
          fr: "Utiliser l’intégrale",
          es: "Usar la integral",
          ja: "積分を使う",
          zh: "利用积分"
        },
        lines: ["\\tfrac a6+\\tfrac b2+1=1\\Rightarrow\\tfrac a6+\\tfrac12-\\tfrac a4=0\\Rightarrow a=6"],
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
