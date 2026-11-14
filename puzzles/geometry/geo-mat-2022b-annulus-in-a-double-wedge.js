/* geometry · An annulus cut by x² ≥ 3y²
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2022b-annulus-in-a-double-wedge",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question D",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question D",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta D",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 D",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "An annulus cut by x² ≥ 3y²",
      fr: "Une couronne coupée par x² ≥ 3y²",
      es: "Una corona cortada por x² ≥ 3y²",
      ja: "x² ≥ 3y² で切った円環",
      zh: "被 x² ≥ 3y² 截取的圆环"
    },
    statement: {
      en: "Let $R$ be the region where $1\\le x^2+y^2\\le4$ and $x^2\\ge3y^2$. <b>Which of the following are true?</b>",
      fr: "Soit $R$ la région où $1\\le x^2+y^2\\le4$ et $x^2\\ge3y^2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $R$ la región donde $1\\le x^2+y^2\\le4$ y $x^2\\ge3y^2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$1\\le x^2+y^2\\le4$ かつ $x^2\\ge3y^2$ の領域を $R$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $R$ 为满足 $1\\le x^2+y^2\\le4$ 且 $x^2\\ge3y^2$ 的区域。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two concentric circles of radius 1 and 2 and the lines y = ±x/√3.",
      fr: "Deux cercles concentriques de rayons 1 et 2 et les droites y = ±x/√3.",
      es: "Dos circunferencias concéntricas de radios 1 y 2 y las rectas y = ±x/√3.",
      ja: "半径1と2の同心円と直線 y = ±x/√3。",
      zh: "半径 1、2 的同心圆与直线 y = ±x/√3。"
    },
    hint: {
      en: "$x^2\\ge3y^2$ means $|y|\\le|x|/\\sqrt3$: angles within $30^\\circ$ of the $x$-axis.",
      fr: "$x^2\\ge3y^2$ signifie $|y|\\le|x|/\\sqrt3$ : angles à moins de $30^\\circ$ de l’axe des $x$.",
      es: "$x^2\\ge3y^2$ significa $|y|\\le|x|/\\sqrt3$: ángulos a menos de $30^\\circ$ del eje $x$.",
      ja: "$x^2\\ge3y^2$ は $|y|\\le|x|/\\sqrt3$、$x$ 軸から $30^\\circ$ 以内。",
      zh: "$x^2\\ge3y^2$ 即 $|y|\\le|x|/\\sqrt3$，与 $x$ 轴夹角不超过 $30^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 5.0, scale: 44, pad: 16 });
      const T = F.T = axes(F, -2.5, 2.5, -2.5, 2.5);
      F.circle(T([0, 0]), 1, 'seg'); F.circle(T([0, 0]), 2, 'seg');
      F.seg(T([-2.4, -2.4 / Math.sqrt(3)]), T([2.4, 2.4 / Math.sqrt(3)]), 'seg thin dashc'); F.seg(T([-2.4, 2.4 / Math.sqrt(3)]), T([2.4, -2.4 / Math.sqrt(3)]), 'seg thin dashc');
      F.reveal = () => {
      [0, 180].forEach(c => { const pts = []; for (let i = 0; i <= 20; i++) { const t = (c - 30 + 3 * i) * Math.PI / 180; pts.push(T([2 * Math.cos(t), 2 * Math.sin(t)])); } for (let i = 20; i >= 0; i--) { const t = (c - 30 + 3 * i) * Math.PI / 180; pts.push(T([Math.cos(t), Math.sin(t)])); } F.path(pts, 'fill-yellow', 'fills'); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "has two pieces": {"fr": "a deux morceaux", "es": "tiene dos trozos", "ja": "は2つの部分からなる", "zh": "由两块组成"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "\\text{area}(R)=\\pi", correct: true, why: {
        en: "Angles total $120^\\circ$, a third of the annulus of area $3\\pi$.",
        fr: "Les angles font $120^\\circ$, un tiers de la couronne d’aire $3\\pi$.",
        es: "Los ángulos suman $120^\\circ$, un tercio de la corona de área $3\\pi$.",
        ja: "角度の合計 $120^\\circ$、面積 $3\\pi$ の円環の $\\tfrac13$。",
        zh: "角度共 $120^\\circ$，为面积 $3\\pi$ 的圆环的三分之一。"
      } },
      { tex: "R\\ \\text{has two pieces}", correct: true, why: {
        en: "One around the positive $x$-axis, one around the negative.",
        fr: "Une autour de l’axe des $x$ positifs, une autour des négatifs.",
        es: "Una en torno al semieje $x$ positivo y otra en torno al negativo.",
        ja: "$x$ 軸の正の側と負の側に1つずつ。",
        zh: "正负 $x$ 轴附近各一块。"
      } },
      { tex: "\\text{area}(R)=2\\pi", correct: false, why: {
        en: "That would be angles of $240^\\circ$: it uses $x^2\\le3y^2$.",
        fr: "Ce serait $240^\\circ$ : c’est $x^2\\le3y^2$.",
        es: "Serían $240^\\circ$: corresponde a $x^2\\le3y^2$.",
        ja: "$240^\\circ$ 分、つまり $x^2\\le3y^2$ の側。",
        zh: "那对应 $240^\\circ$，即 $x^2\\le3y^2$ 的部分。"
      } },
      { tex: "\\text{area}(R)=\\tfrac\\pi2", correct: false, why: {
        en: "Uses only one of the two wedges.",
        fr: "Ne prend qu’un des deux secteurs.",
        es: "Usa solo una de las dos cuñas.",
        ja: "2つのうち1つだけ。",
        zh: "只算了一块。"
      } },
      { tex: "\\text{area}(R)=\\pi\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{area}(R)=\\tfrac{\\pi^2}6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(1,1)\\in R", correct: false, why: {
        en: "$1\\ge3$",
        fr: "$1\\ge3$",
        es: "$1\\ge3$",
        ja: "$1\\ge3$",
        zh: "$1\\ge3$"
      } },
      { tex: "\\text{area}(R)=\\tfrac{4\\pi}{3}", correct: false, why: {
        en: "Uses the full disc of radius $2$ instead of the annulus.",
        fr: "Prend le disque entier de rayon $2$ au lieu de la couronne.",
        es: "Toma el disco completo de radio $2$ en vez de la corona.",
        ja: "円環でなく半径 $2$ の円板全体。",
        zh: "用了半径 $2$ 的整个圆盘而非圆环。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Angles",
          fr: "Angles",
          es: "Ángulos",
          ja: "角度",
          zh: "角度"
        },
        lines: ["x^2\\ge3y^2\\iff|\\theta|\\le30^\\circ\\ \\text{or}\\ |\\theta-180^\\circ|\\le30^\\circ"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["\\tfrac{120}{360}\\cdot\\pi(2^2-1^2)=\\pi"],
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
