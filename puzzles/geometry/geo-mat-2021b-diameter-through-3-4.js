/* geometry · A diameter from (3, 4) seen from the origin
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2021b-diameter-through-3-4",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question F",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question F",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta F",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 F",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 F 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A diameter from (3, 4) seen from the origin",
      fr: "Un diamètre issu de (3, 4) vu depuis l’origine",
      es: "Un diámetro desde (3, 4) visto desde el origen",
      ja: "原点から見た (3, 4) を端とする直径",
      zh: "从原点看以 (3, 4) 为端点的直径"
    },
    statement: {
      en: "The points $A=(3,4)$ and $O=(0,0)$ lie on a circle $C$. $AB$ is a diameter of $C$ and $OB=10$. <b>Which of the following are true?</b>",
      fr: "Les points $A=(3,4)$ et $O=(0,0)$ sont sur un cercle $C$. $AB$ est un diamètre de $C$ et $OB=10$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los puntos $A=(3,4)$ y $O=(0,0)$ están en una circunferencia $C$. $AB$ es un diámetro de $C$ y $OB=10$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "点 $A=(3,4)$ と $O=(0,0)$ は円 $C$ 上にあり、$AB$ は $C$ の直径で $OB=10$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "点 $A=(3,4)$ 与 $O=(0,0)$ 在圆 $C$ 上，$AB$ 为直径，$OB=10$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The points O and A = (3, 4), and a circle through them.",
      fr: "Les points O et A = (3, 4), et un cercle qui les contient.",
      es: "Los puntos O y A = (3, 4), y una circunferencia por ellos.",
      ja: "点 O と A = (3, 4)、それらを通る円。",
      zh: "点 O、A = (3, 4) 及过它们的圆。"
    },
    hint: {
      en: "An angle in a semicircle is a right angle: $\\angle AOB=90^\\circ$.",
      fr: "Un angle inscrit dans un demi-cercle est droit : $\\angle AOB=90^\\circ$.",
      es: "Un ángulo inscrito en una semicircunferencia es recto: $\\angle AOB=90^\\circ$.",
      ja: "半円に対する円周角は直角：$\\angle AOB=90^\\circ$。",
      zh: "半圆上的圆周角是直角：$\\angle AOB=90^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 5.0, scale: 40, pad: 16 });
      const S = ([x, y]) => [ (x + 9) * 0.385, (y + 1) * 0.55 ];
      F.seg(S([-9, 0]), S([5, 0]), 'axis'); F.seg(S([0, -1]), S([0, 8]), 'axis'); F.text(S([5, 0]), 'x', 'tick', -8, 12); F.text(S([0, 8]), 'y', 'tick', 12, 8);
      F.dot(S([0, 0])); F.dot(S([3, 4])); F.text(S([3, 4]), 'A', 'pt', 10, -8); F.text(S([0, 0]), 'O', 'pt', 10, 12);
      F.reveal = () => {
      F.seg(S([3, 4]), S([-8, 6]), 'hl pink'); F.seg(S([0, 0]), S([-8, 6]), 'hl'); F.seg(S([0, 0]), S([3, 4]), 'hl'); F.dot(S([-8, 6])); F.text(S([-8, 6]), 'B', 'pt', -10, -8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "the radius of": {"fr": "le rayon de", "es": "el radio de", "ja": "の半径", "zh": "的半径"},
      "is": {"fr": "vaut", "es": "es", "ja": "は", "zh": "为"}
    },
    options: [
      { tex: "B=(-8,6)\\ \\text{or}\\ (8,-6)", correct: true, why: {
        en: "$OB\\perp OA$ and $|OB|=10$.",
        fr: "$OB\\perp OA$ et $|OB|=10$.",
        es: "$OB\\perp OA$ y $|OB|=10$.",
        ja: "$OB\\perp OA$、$|OB|=10$。",
        zh: "$OB\\perp OA$ 且 $|OB|=10$。"
      } },
      { tex: "\\overrightarrow{OA}\\cdot\\overrightarrow{OB}=0", correct: true, why: {
        en: "Thales: the angle at $O$ subtends the diameter.",
        fr: "Thalès : l’angle en $O$ intercepte le diamètre.",
        es: "Tales: el ángulo en $O$ abarca el diámetro.",
        ja: "タレスの定理：$O$ の角は直径を見込む。",
        zh: "泰勒斯定理：$O$ 处的角对着直径。"
      } },
      { tex: "B=(-4,3)\\ \\text{or}\\ (4,-3)", correct: false, why: {
        en: "Right direction but $|OB|=5$.",
        fr: "Bonne direction mais $|OB|=5$.",
        es: "Dirección correcta pero $|OB|=5$.",
        ja: "方向は正しいが $|OB|=5$。",
        zh: "方向对但 $|OB|=5$。"
      } },
      { tex: "B=(-5\\sqrt2,5\\sqrt2)\\ \\text{or}\\ (5\\sqrt2,-5\\sqrt2)", correct: false, why: {
        en: "$(3,4)\\cdot(-5\\sqrt2,5\\sqrt2)=5\\sqrt2\\ne0$",
        fr: "$(3,4)\\cdot(-5\\sqrt2,5\\sqrt2)=5\\sqrt2\\ne0$",
        es: "$(3,4)\\cdot(-5\\sqrt2,5\\sqrt2)=5\\sqrt2\\ne0$",
        ja: "$(3,4)\\cdot(-5\\sqrt2,5\\sqrt2)=5\\sqrt2\\ne0$",
        zh: "$(3,4)\\cdot(-5\\sqrt2,5\\sqrt2)=5\\sqrt2\\ne0$"
      } },
      { tex: "B=(-5,5\\sqrt3)\\ \\text{or}\\ (5,-5\\sqrt3)", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "B=(-5\\sqrt3,5)\\ \\text{or}\\ (5\\sqrt3,-5)", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the radius of}\\ C\\ \\text{is}\\ 5", correct: false, why: {
        en: "$AB=\\sqrt{25+100}=5\\sqrt5,\\ r=\\tfrac{5\\sqrt5}2$",
        fr: "$AB=\\sqrt{25+100}=5\\sqrt5,\\ r=\\tfrac{5\\sqrt5}2$",
        es: "$AB=\\sqrt{25+100}=5\\sqrt5,\\ r=\\tfrac{5\\sqrt5}2$",
        ja: "$AB=\\sqrt{25+100}=5\\sqrt5,\\ r=\\tfrac{5\\sqrt5}2$",
        zh: "$AB=\\sqrt{25+100}=5\\sqrt5,\\ r=\\tfrac{5\\sqrt5}2$"
      } },
      { tex: "B=(6,8)", correct: false, why: {
        en: "That is on line $OA$: then $O$, $A$, $B$ are collinear.",
        fr: "Sur la droite $OA$ : $O$, $A$, $B$ alignés.",
        es: "Está en la recta $OA$: $O$, $A$, $B$ alineados.",
        ja: "直線 $OA$ 上で $O,A,B$ が一直線。",
        zh: "在直线 $OA$ 上，三点共线。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Right angle at O",
          fr: "Angle droit en O",
          es: "Ángulo recto en O",
          ja: "O で直角",
          zh: "O 处为直角"
        },
        lines: ["\\angle AOB=90^\\circ\\Rightarrow B=t(-4,3)"],
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
          en: "Length",
          fr: "Longueur",
          es: "Longitud",
          ja: "長さ",
          zh: "长度"
        },
        lines: ["|OB|=5|t|=10\\Rightarrow t=\\pm2"],
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
