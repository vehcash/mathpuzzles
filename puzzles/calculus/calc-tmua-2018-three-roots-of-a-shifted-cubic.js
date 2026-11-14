/* calculus · Three distinct roots of 2x³ − 3x² − 12x + c = 0
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-tmua-2018-three-roots-of-a-shifted-cubic",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 9",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 9",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 9",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第9問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 9 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Three distinct roots of 2x³ − 3x² − 12x + c = 0",
      fr: "Trois racines distinctes de 2x³ − 3x² − 12x + c = 0",
      es: "Tres raíces distintas de 2x³ − 3x² − 12x + c = 0",
      ja: "2x³ − 3x² − 12x + c = 0 が異なる3実根",
      zh: "2x³ − 3x² − 12x + c = 0 有三个不同实根"
    },
    statement: {
      en: "The equation $2x^3-3x^2-12x+c=0$ has three distinct real roots. <b>Which of the following are true?</b>",
      fr: "L’équation $2x^3-3x^2-12x+c=0$ a trois racines réelles distinctes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La ecuación $2x^3-3x^2-12x+c=0$ tiene tres raíces reales distintas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "方程式 $2x^3-3x^2-12x+c=0$ は異なる3つの実数解をもちます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "方程 $2x^3-3x^2-12x+c=0$ 有三个不同实根。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The cubic for c = 0 and the effect of moving it up and down.",
      fr: "La cubique pour c = 0, translatée verticalement.",
      es: "La cúbica para c = 0, desplazada verticalmente.",
      ja: "c = 0 の3次曲線と上下移動。",
      zh: "c = 0 时的三次曲线及其上下平移。"
    },
    hint: {
      en: "Turning points at $x=-1$ and $x=2$; they must be on opposite sides of the axis.",
      fr: "Extremums en $x=-1$ et $x=2$ ; ils doivent être de part et d’autre de l’axe.",
      es: "Puntos de giro en $x=-1$ y $x=2$; deben quedar a ambos lados del eje.",
      ja: "極値点は $x=-1,2$。軸の両側にあること。",
      zh: "驻点 $x=-1,2$，须在轴的两侧。"
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
      const S = ([x, y]) => [0.2 + (x - (-3)) * 0.65714, 0.2 + (y - (-24)) * 0.08333];
      const K = 0.65714;
      F.seg(S([-3, 0]), S([4, 0]), 'axis'); F.seg(S([0, -24]), S([0, 12]), 'axis');
      plot(F, S, x => 2 * x ** 3 - 3 * x * x - 12 * x, -2.6, 3.8, 'graph', 'base', -24, 12); F.dot(S([-1, 7])); F.dot(S([2, -20]));
      F.reveal = () => {
      F.text(S([-1, 7]), '7 + c > 0', 'len small pink', 0, -12); F.text(S([2, -20]), '−20 + c < 0', 'len small pink', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "7 + c > 0": {"fr": "7 + c > 0", "es": "7 + c > 0", "ja": "7 + c > 0", "zh": "7 + c > 0"},
      "−20 + c < 0": {"fr": "−20 + c < 0", "es": "−20 + c < 0", "ja": "−20 + c < 0", "zh": "−20 + c < 0"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "-7<c<20", correct: true, why: {
        en: "$7+c>0>-20+c$",
        fr: "$7+c>0>-20+c$",
        es: "$7+c>0>-20+c$",
        ja: "$7+c>0>-20+c$",
        zh: "$7+c>0>-20+c$"
      } },
      { tex: "c=0\\ \\text{works}", correct: true, why: {
        en: "$x(2x^2-3x-12)$",
        fr: "$x(2x^2-3x-12)$",
        es: "$x(2x^2-3x-12)$",
        ja: "$x(2x^2-3x-12)$",
        zh: "$x(2x^2-3x-12)$"
      } },
      { tex: "-20<c<7", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "c<-7\\ \\text{or}\\ c>20", correct: false, why: {
        en: "The complement.",
        fr: "Le complémentaire.",
        es: "El complementario.",
        ja: "補集合。",
        zh: "补集。"
      } },
      { tex: "-7\\le c\\le20", correct: false, why: {
        en: "Endpoints give a repeated root.",
        fr: "Les bornes donnent une racine double.",
        es: "Los extremos dan raíz doble.",
        ja: "端点で重根。",
        zh: "端点处有重根。"
      } },
      { tex: "0<c<20", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-7<c<0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=20\\ \\text{works}", correct: false, why: {
        en: "$(x-2)^2(2x+5)$",
        fr: "$(x-2)^2(2x+5)$",
        es: "$(x-2)^2(2x+5)$",
        ja: "$(x-2)^2(2x+5)$",
        zh: "$(x-2)^2(2x+5)$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Turning points",
          fr: "Extremums",
          es: "Puntos de giro",
          ja: "極値点",
          zh: "驻点"
        },
        lines: ["6x^2-6x-12=6(x-2)(x+1)\\Rightarrow(-1,\\,7+c),\\ (2,\\,-20+c)"],
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
          en: "Opposite signs",
          fr: "Signes opposés",
          es: "Signos opuestos",
          ja: "異符号",
          zh: "异号"
        },
        lines: ["-20+c<0<7+c\\iff-7<c<20"],
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
