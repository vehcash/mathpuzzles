/* algebra · A parabola that touches the x-axis
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-parabola-touching-axis",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 5",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 5",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 5",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第5問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 5 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "A parabola that touches the x-axis",
      fr: "Une parabole tangente à l’axe des x",
      es: "Una parábola tangente al eje x",
      ja: "x 軸に接する放物線",
      zh: "与 x 轴相切的抛物线"
    },
    statement: {
      en: "The curve $y=px^2+6x-q$ has line of symmetry $x=-\\tfrac14$ and touches the $x$-axis. <b>Which of the following are true?</b>",
      fr: "La courbe $y=px^2+6x-q$ a pour axe de symétrie $x=-\\tfrac14$ et est tangente à l’axe des $x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La curva $y=px^2+6x-q$ tiene eje de simetría $x=-\\tfrac14$ y es tangente al eje $x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $y=px^2+6x-q$ の対称軸は $x=-\\tfrac14$ で、$x$ 軸に接します。 <b>次のうち正しいものはどれですか？</b>",
      zh: "曲线 $y=px^2+6x-q$ 的对称轴为 $x=-\\tfrac14$，且与 $x$ 轴相切。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A parabola resting on the x-axis with its vertex just left of the origin.",
      fr: "Une parabole posée sur l’axe des x, sommet juste à gauche de l’origine.",
      es: "Una parábola apoyada en el eje x con el vértice a la izquierda del origen.",
      ja: "頂点が原点のすぐ左で x 軸に接する放物線。",
      zh: "顶点在原点左侧、与 x 轴相切的抛物线。"
    },
    hint: {
      en: "Axis: $-\\tfrac{6}{2p}=-\\tfrac14$. Touching: discriminant $36+4pq=0$.",
      fr: "Axe : $-\\tfrac{6}{2p}=-\\tfrac14$. Tangence : discriminant $36+4pq=0$.",
      es: "Eje: $-\\tfrac{6}{2p}=-\\tfrac14$. Tangencia: discriminante $36+4pq=0$.",
      ja: "軸：$-\\tfrac{6}{2p}=-\\tfrac14$。接する：判別式 $36+4pq=0$。",
      zh: "对称轴：$-\\tfrac{6}{2p}=-\\tfrac14$；相切：判别式 $36+4pq=0$。"
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
      const S = ([x, y]) => [0.2 + (x - (-1.2)) * 2.30000, 0.2 + (y - (-0.3)) * 0.90909];
      F.seg(S([-1.2, 0]), S([0.8, 0]), 'axis'); F.seg(S([0, -0.3]), S([0, 3]), 'axis');
      plot(F, S, x => 12 * (x + 0.25) ** 2, -0.75, 0.25, 'graph', 'base', -0.3, 3); F.seg(S([-0.25, -0.3]), S([-0.25, 3]), 'seg thin dashc');
      F.reveal = () => {
      F.dot(S([-0.25, 0])); F.text(S([-0.25, 0]), '(−¼, 0)', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(−¼, 0)": {"fr": "(−¼, 0)", "es": "(−¼, 0)", "ja": "(−¼, 0)", "zh": "(−¼, 0)"}
    },
    options: [
      { tex: "p+8q=6", correct: true, why: {
        en: "$12-6$",
        fr: "$12-6$",
        es: "$12-6$",
        ja: "$12-6$",
        zh: "$12-6$"
      } },
      { tex: "p=12", correct: true, why: {
        en: "$\\tfrac{6}{2p}=\\tfrac14$",
        fr: "$\\tfrac{6}{2p}=\\tfrac14$",
        es: "$\\tfrac{6}{2p}=\\tfrac14$",
        ja: "$\\tfrac{6}{2p}=\\tfrac14$",
        zh: "$\\tfrac{6}{2p}=\\tfrac14$"
      } },
      { tex: "p+8q=18", correct: false, why: {
        en: "Takes $q=+\\tfrac34$.",
        fr: "Prend $q=+\\tfrac34$.",
        es: "Toma $q=+\\tfrac34$.",
        ja: "$q=+\\tfrac34$ としている。",
        zh: "取了 $q=+\\tfrac34$。"
      } },
      { tex: "p+8q=-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p+8q=0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p+8q=12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p=3", correct: false, why: {
        en: "Forgets the factor 2 in $-\\tfrac b{2a}$.",
        fr: "Oublie le 2 dans $-\\tfrac b{2a}$.",
        es: "Olvida el 2 en $-\\tfrac b{2a}$.",
        ja: "$-\\tfrac b{2a}$ の 2 を忘れた。",
        zh: "漏了 $-\\tfrac b{2a}$ 中的 2。"
      } },
      { tex: "q>0", correct: false, why: {
        en: "$q=-\\tfrac34$",
        fr: "$q=-\\tfrac34$",
        es: "$q=-\\tfrac34$",
        ja: "$q=-\\tfrac34$",
        zh: "$q=-\\tfrac34$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Axis of symmetry",
          fr: "Axe de symétrie",
          es: "Eje de simetría",
          ja: "対称軸",
          zh: "对称轴"
        },
        lines: ["-\\tfrac{6}{2p}=-\\tfrac14\\Rightarrow p=12"],
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
          en: "Double root",
          fr: "Racine double",
          es: "Raíz doble",
          ja: "重根",
          zh: "二重根"
        },
        lines: ["36+48q=0\\Rightarrow q=-\\tfrac34,\\quad p+8q=6"],
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
