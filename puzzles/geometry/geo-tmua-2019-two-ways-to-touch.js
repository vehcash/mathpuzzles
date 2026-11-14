/* geometry · Two radii that make the circles touch
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2019-two-ways-to-touch",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 6",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 6",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 6",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第6問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 6 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Two radii that make the circles touch",
      fr: "Deux rayons qui rendent les cercles tangents",
      es: "Dos radios que hacen tangentes las circunferencias",
      ja: "2円が接する2つの半径",
      zh: "使两圆相切的两个半径"
    },
    statement: {
      en: "$C_1$ has centre $(-4,-1)$ and radius $8$. $C_2$ has centre $(8,4)$ and radius $r$. There are exactly two values $r_1<r_2$ for which $C_1$ and $C_2$ have exactly one point in common. <b>Which of the following are true?</b>",
      fr: "$C_1$ a pour centre $(-4,-1)$ et rayon $8$. $C_2$ a pour centre $(8,4)$ et rayon $r$. Il y a exactement deux valeurs $r_1<r_2$ pour lesquelles $C_1$ et $C_2$ ont un seul point commun. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$C_1$ tiene centro $(-4,-1)$ y radio $8$. $C_2$ tiene centro $(8,4)$ y radio $r$. Hay exactamente dos valores $r_1<r_2$ para los que $C_1$ y $C_2$ tienen un único punto común. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$C_1$ は中心 $(-4,-1)$・半径 $8$、$C_2$ は中心 $(8,4)$・半径 $r$。共有点がちょうど1つになる $r$ はちょうど2つ $r_1<r_2$ あります。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$C_1$ 圆心 $(-4,-1)$、半径 $8$；$C_2$ 圆心 $(8,4)$、半径 $r$。恰有两个值 $r_1<r_2$ 使两圆恰有一个公共点。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Circle C₁ and the centre of C₂.",
      fr: "Le cercle C₁ et le centre de C₂.",
      es: "La circunferencia C₁ y el centro de C₂.",
      ja: "円 C₁ と C₂ の中心。",
      zh: "圆 C₁ 与 C₂ 的圆心。"
    },
    hint: {
      en: "The centres are $13$ apart: touching outside or inside.",
      fr: "Les centres sont à distance $13$ : tangence extérieure ou intérieure.",
      es: "Los centros distan $13$: tangencia exterior o interior.",
      ja: "中心間距離 $13$：外接か内接。",
      zh: "圆心距 $13$：外切或内切。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.8, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-13)) * 0.09091, 0.2 + (y - (-22)) * 0.09167];
      const K = 0.09091;
      F.seg(S([-13, 0]), S([31, 0]), 'axis'); F.seg(S([0, -22]), S([0, 26]), 'axis');
      F.circle(S([-4, -1]), 8 * K, 'graph'); F.dot(S([-4, -1])); F.dot(S([8, 4])); F.seg(S([-4, -1]), S([8, 4]), 'seg thin dashc');
      F.reveal = () => {
      F.circle(S([8, 4]), 5 * K, 'hl pink'); F.circle(S([8, 4]), 21 * K, 'hl blue');
      };
      return F;
    },
    options: [
      { tex: "r_2-r_1=16", correct: true, why: {
        en: "$21-5$",
        fr: "$21-5$",
        es: "$21-5$",
        ja: "$21-5$",
        zh: "$21-5$"
      } },
      { tex: "r_1=5", correct: true, why: {
        en: "$13-8$",
        fr: "$13-8$",
        es: "$13-8$",
        ja: "$13-8$",
        zh: "$13-8$"
      } },
      { tex: "r_2-r_1=13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_2-r_1=10", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_2-r_1=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_2-r_1=26", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_1=13", correct: false, why: {
        en: "The distance between centres, not a radius.",
        fr: "La distance des centres.",
        es: "La distancia entre centros.",
        ja: "中心間距離。",
        zh: "那是圆心距。"
      } },
      { tex: "r_2=29", correct: false, why: {
        en: "$r_2=13+8=21$",
        fr: "$r_2=13+8=21$",
        es: "$r_2=13+8=21$",
        ja: "$r_2=13+8=21$",
        zh: "$r_2=13+8=21$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Distance between centres",
          fr: "Distance des centres",
          es: "Distancia entre centros",
          ja: "中心間距離",
          zh: "圆心距"
        },
        lines: ["\\sqrt{12^2+5^2}=13"],
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
          en: "Touch",
          fr: "Tangence",
          es: "Tangencia",
          ja: "接する",
          zh: "相切"
        },
        lines: ["r+8=13\\Rightarrow r_1=5;\\quad r-8=13\\Rightarrow r_2=21"],
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
