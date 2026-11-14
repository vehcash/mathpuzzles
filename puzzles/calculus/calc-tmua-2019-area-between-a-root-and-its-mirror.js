/* calculus · Area between y = p√x and x = p√y
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2019-area-between-a-root-and-its-mirror",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 9",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 9",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 9",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第9問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 9 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Area between y = p√x and x = p√y",
      fr: "Aire entre y = p√x et x = p√y",
      es: "Área entre y = p√x y x = p√y",
      ja: "y = p√x と x = p√y の間の面積",
      zh: "y = p√x 与 x = p√y 之间的面积"
    },
    statement: {
      en: "For $p>0$, let $A$ be the area of the finite region enclosed by the curves $y=p\\sqrt x$ and $x=p\\sqrt y$. <b>Which of the following are true?</b>",
      fr: "Pour $p>0$, soit $A$ l’aire de la région bornée délimitée par $y=p\\sqrt x$ et $x=p\\sqrt y$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para $p>0$, sea $A$ el área de la región acotada entre $y=p\\sqrt x$ y $x=p\\sqrt y$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$p>0$ とし、$y=p\\sqrt x$ と $x=p\\sqrt y$ で囲まれた有界な領域の面積を $A$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $p>0$，$A$ 为曲线 $y=p\\sqrt x$ 与 $x=p\\sqrt y$ 围成的有界区域面积。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two curves that are mirror images in y = x.",
      fr: "Deux courbes symétriques par rapport à y = x.",
      es: "Dos curvas simétricas respecto a y = x.",
      ja: "y = x に関して対称な2曲線。",
      zh: "关于 y = x 对称的两条曲线。"
    },
    hint: {
      en: "The second curve is $y=\\tfrac{x^2}{p^2}$ for $x\\ge0$; they meet at $x=p^2$.",
      fr: "La seconde courbe est $y=\\tfrac{x^2}{p^2}$ pour $x\\ge0$ ; elles se coupent en $x=p^2$.",
      es: "La segunda curva es $y=\\tfrac{x^2}{p^2}$ para $x\\ge0$; se cortan en $x=p^2$.",
      ja: "2つ目は $x\\ge0$ で $y=\\tfrac{x^2}{p^2}$。交点は $x=p^2$。",
      zh: "第二条曲线为 $y=\\tfrac{x^2}{p^2}$（$x\\ge0$），交于 $x=p^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.8, h: 3.8, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-0.4)) * 0.65385, 0.2 + (y - (-0.4)) * 0.65385];
      const K = 0.65385;
      F.seg(S([-0.4, 0]), S([4.8, 0]), 'axis'); F.seg(S([0, -0.4]), S([0, 4.8]), 'axis');
      plot(F, S, x => 2 * Math.sqrt(x), 0, 4.6, 'graph', 'base', -0.4, 4.8); plot(F, S, x => x * x / 4, 0, 4.4, 'graph', 'base', -0.4, 4.8); F.seg(S([0, 0]), S([4.6, 4.6]), 'seg thin dashc');
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 40; k++) { const x = 4 * k / 40; pts.push(S([x, 2 * Math.sqrt(x)])); } for (let k = 40; k >= 0; k--) { const x = 4 * k / 40; pts.push(S([x, x * x / 4])); } F.path(pts, 'fill-yellow', 'fills');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the curves meet at": {"fr": "les courbes se coupent en", "es": "las curvas se cortan en", "ja": "2曲線の交点は", "zh": "两曲线交于"}
    },
    options: [
      { tex: "A=\\tfrac{p^4}3", correct: true, why: {
        en: "$\\tfrac23p^4-\\tfrac13p^4$",
        fr: "$\\tfrac23p^4-\\tfrac13p^4$",
        es: "$\\tfrac23p^4-\\tfrac13p^4$",
        ja: "$\\tfrac23p^4-\\tfrac13p^4$",
        zh: "$\\tfrac23p^4-\\tfrac13p^4$"
      } },
      { tex: "\\text{the curves meet at}\\ (p^2,p^2)", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "A=\\tfrac{p^4}6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=\\tfrac{2p^4}3", correct: false, why: {
        en: "Area under $y=p\\sqrt x$ only.",
        fr: "Aire sous $y=p\\sqrt x$ seulement.",
        es: "Solo el área bajo $y=p\\sqrt x$.",
        ja: "$y=p\\sqrt x$ の下だけ。",
        zh: "只算了 $y=p\\sqrt x$ 下方的面积。"
      } },
      { tex: "A=\\tfrac{p^2}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=p^4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "A=\\tfrac{p^3}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the curves meet at}\\ (p,p)", correct: false, why: {
        en: "$p\\sqrt p\\ne p$",
        fr: "$p\\sqrt p\\ne p$",
        es: "$p\\sqrt p\\ne p$",
        ja: "$p\\sqrt p\\ne p$",
        zh: "$p\\sqrt p\\ne p$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Rewrite",
          fr: "Réécrire",
          es: "Reescribir",
          ja: "書き直す",
          zh: "改写"
        },
        lines: ["x=p\\sqrt y\\iff y=\\tfrac{x^2}{p^2}\\ (x\\ge0)"],
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
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分",
          zh: "积分"
        },
        lines: ["\\int_0^{p^2}\\Bigl(p\\sqrt x-\\tfrac{x^2}{p^2}\\Bigr)dx=\\tfrac23p^4-\\tfrac13p^4=\\tfrac{p^4}3"],
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
