/* calculus · From ∫f and ∫|f| to ∫f(|x|)
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2021-integral-of-f-of-abs-x",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 7",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 7",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 7",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第7問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 7 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "From ∫f and ∫|f| to ∫f(|x|)",
      fr: "De ∫f et ∫|f| à ∫f(|x|)",
      es: "De ∫f y ∫|f| a ∫f(|x|)",
      ja: "∫f と ∫|f| から ∫f(|x|) へ",
      zh: "由 ∫f 和 ∫|f| 求 ∫f(|x|)"
    },
    statement: {
      en: "A function satisfies $x\\,f(x)>0$ for all $x\\ne0$, $\\displaystyle\\int_{-2}^2f(x)\\,dx=4$ and $\\displaystyle\\int_{-2}^2|f(x)|\\,dx=8$. Let $J=\\displaystyle\\int_{-2}^0f(|x|)\\,dx$. <b>Which of the following are true?</b>",
      fr: "Une fonction vérifie $x\\,f(x)>0$ pour tout $x\\ne0$, $\\displaystyle\\int_{-2}^2f(x)\\,dx=4$ et $\\displaystyle\\int_{-2}^2|f(x)|\\,dx=8$. Soit $J=\\displaystyle\\int_{-2}^0f(|x|)\\,dx$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una función cumple $x\\,f(x)>0$ para todo $x\\ne0$, $\\displaystyle\\int_{-2}^2f(x)\\,dx=4$ y $\\displaystyle\\int_{-2}^2|f(x)|\\,dx=8$. Sea $J=\\displaystyle\\int_{-2}^0f(|x|)\\,dx$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "関数は $x\\ne0$ で $x\\,f(x)>0$、$\\displaystyle\\int_{-2}^2f(x)\\,dx=4$、$\\displaystyle\\int_{-2}^2|f(x)|\\,dx=8$ を満たします。$J=\\displaystyle\\int_{-2}^0f(|x|)\\,dx$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "函数满足对 $x\\ne0$ 有 $x\\,f(x)>0$，$\\displaystyle\\int_{-2}^2f(x)\\,dx=4$，$\\displaystyle\\int_{-2}^2|f(x)|\\,dx=8$。设 $J=\\displaystyle\\int_{-2}^0f(|x|)\\,dx$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A curve below the axis for x < 0 and above it for x > 0.",
      fr: "Une courbe sous l’axe pour x < 0 et au-dessus pour x > 0.",
      es: "Una curva bajo el eje para x < 0 y sobre él para x > 0.",
      ja: "x < 0 で軸の下、x > 0 で上にある曲線。",
      zh: "x < 0 时在轴下方、x > 0 时在上方的曲线。"
    },
    hint: {
      en: "Let $P=\\int_0^2f$ and $N=\\int_{-2}^0f<0$: then $P+N=4$ and $P-N=8$.",
      fr: "Posez $P=\\int_0^2f$ et $N=\\int_{-2}^0f<0$ : $P+N=4$ et $P-N=8$.",
      es: "Sea $P=\\int_0^2f$ y $N=\\int_{-2}^0f<0$: $P+N=4$ y $P-N=8$.",
      ja: "$P=\\int_0^2f$、$N=\\int_{-2}^0f<0$ とすると $P+N=4$、$P-N=8$。",
      zh: "设 $P=\\int_0^2f$，$N=\\int_{-2}^0f<0$，则 $P+N=4$，$P-N=8$。"
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
      const S = ([x, y]) => [0.2 + (x - (-2.4)) * 0.95833, 0.2 + (y - (-2.2)) * 0.55556];
      const K = 0.95833;
      F.seg(S([-2.4, 0]), S([2.4, 0]), 'axis'); F.seg(S([0, -2.2]), S([0, 3.2]), 'axis');
      plot(F, S, x => x > 0 ? 2.6 * Math.sin(x * 1.4) : 1.1 * Math.sin(x * 1.4), -2, 2, 'graph', 'base', -2.2, 3.2); F.text(S([2, 0]), '2', 'tick', 0, 14); F.text(S([-2, 0]), '−2', 'tick', 0, -10);
      F.reveal = () => {
      plot(F, S, x => 2.6 * Math.sin(-x * 1.4), -2, 0, 'hl pink', 'base', -2.2, 3.2);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "−2": {"fr": "−2", "es": "−2", "ja": "−2", "zh": "−2"}
    },
    options: [
      { tex: "J=6", correct: true, why: {
        en: "$J=\\int_0^2f=P$",
        fr: "$J=\\int_0^2f=P$",
        es: "$J=\\int_0^2f=P$",
        ja: "$J=\\int_0^2f=P$",
        zh: "$J=\\int_0^2f=P$"
      } },
      { tex: "\\int_{-2}^0f(x)\\,dx=-2", correct: true, why: {
        en: "$N=\\tfrac{4-8}2$",
        fr: "$N=\\tfrac{4-8}2$",
        es: "$N=\\tfrac{4-8}2$",
        ja: "$N=\\tfrac{4-8}2$",
        zh: "$N=\\tfrac{4-8}2$"
      } },
      { tex: "J=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "J=4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "J=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "J=-2", correct: false, why: {
        en: "That is $\\int_{-2}^0f(x)\\,dx$, not $f(|x|)$.",
        fr: "C’est $\\int_{-2}^0f(x)\\,dx$, pas $f(|x|)$.",
        es: "Es $\\int_{-2}^0f(x)\\,dx$, no $f(|x|)$.",
        ja: "それは $f(x)$ の積分。",
        zh: "那是 $f(x)$ 的积分。"
      } },
      { tex: "J=12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "J=-6", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Split",
          fr: "Séparer",
          es: "Separar",
          ja: "分ける",
          zh: "拆分"
        },
        lines: ["P+N=4,\\ P-N=8\\Rightarrow P=6,\\ N=-2"],
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
          en: "Substitute u = −x",
          fr: "Poser u = −x",
          es: "Sustituir u = −x",
          ja: "u = −x と置換",
          zh: "令 u = −x"
        },
        lines: ["\\int_{-2}^0f(-x)\\,dx=\\int_0^2f(u)\\,du=6"],
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
