/* trigonometry · cos(2 arctan 4/3) + sin(2 arctan 4/3)
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 39 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-ita-2024-double-arctan",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 39",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 39",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 39",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第39問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 39 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "cos(2 arctan 4/3) + sin(2 arctan 4/3)",
      fr: "cos(2 arctan 4/3) + sin(2 arctan 4/3)",
      es: "cos(2 arctan 4/3) + sin(2 arctan 4/3)",
      ja: "cos(2 arctan 4/3) + sin(2 arctan 4/3)",
      zh: "cos(2 arctan 4/3) + sin(2 arctan 4/3)"
    },
    statement: {
      en: "Let $\\theta=\\arctan\\tfrac43$ and $S=\\cos2\\theta+\\sin2\\theta$. <b>Which of the following are true?</b>",
      fr: "Soit $\\theta=\\arctan\\tfrac43$ et $S=\\cos2\\theta+\\sin2\\theta$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $\\theta=\\arctan\\tfrac43$ y $S=\\cos2\\theta+\\sin2\\theta$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\theta=\\arctan\\tfrac43$、$S=\\cos2\\theta+\\sin2\\theta$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $\\theta=\\arctan\\tfrac43$，$S=\\cos2\\theta+\\sin2\\theta$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A 3-4-5 right triangle with angle θ opposite the side 4.",
      fr: "Un triangle rectangle 3-4-5 avec l’angle θ opposé au côté 4.",
      es: "Un triángulo rectángulo 3-4-5 con el ángulo θ opuesto al lado 4.",
      ja: "3-4-5 の直角三角形、θ は辺 4 の対角。",
      zh: "3-4-5 直角三角形，θ 对边为 4。"
    },
    hint: {
      en: "From the triangle: $\\sin\\theta=\\tfrac45$, $\\cos\\theta=\\tfrac35$. Then use double-angle formulas.",
      fr: "Dans le triangle : $\\sin\\theta=\\tfrac45$, $\\cos\\theta=\\tfrac35$. Puis les formules de duplication.",
      es: "Del triángulo: $\\sin\\theta=\\tfrac45$, $\\cos\\theta=\\tfrac35$. Luego las fórmulas del ángulo doble.",
      ja: "三角形から $\\sin\\theta=\\tfrac45$、$\\cos\\theta=\\tfrac35$。2倍角の公式へ。",
      zh: "由三角形 $\\sin\\theta=\\tfrac45$，$\\cos\\theta=\\tfrac35$，再用二倍角公式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.4, scale: 56, pad: 16 });
      const A = [0.4, 0.4], B = [3.4, 0.4], C = [3.4, 2.9];
      F.path([A, B, C], 'seg'); F.right(B, [-1, 0], [0, 1], 0.22); F.arc(A, 0.5, 0, 39.8); F.text([1.05, 0.62], 'θ', 'pt', 0, 0);
      F.text(mid(A, B), '3', 'len', 0, 14); F.text(mid(B, C), '4', 'len', 12, 0); F.text(mid(A, C), '5', 'len', -10, -10);
      F.reveal = () => {
      F.text([1.9, 2.9], 'cos 2θ = −7/25, sin 2θ = 24/25', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "cos 2θ = −7/25, sin 2θ = 24/25": {"fr": "cos 2θ = −7/25, sin 2θ = 24/25", "es": "cos 2θ = −7/25, sen 2θ = 24/25", "ja": "cos 2θ = −7/25, sin 2θ = 24/25", "zh": "cos 2θ = −7/25，sin 2θ = 24/25"}
    },
    options: [
      { tex: "S=\\tfrac{17}{25}", correct: true, why: {
        en: "$-\\tfrac7{25}+\\tfrac{24}{25}$",
        fr: "$-\\tfrac7{25}+\\tfrac{24}{25}$",
        es: "$-\\tfrac7{25}+\\tfrac{24}{25}$",
        ja: "$-\\tfrac7{25}+\\tfrac{24}{25}$",
        zh: "$-\\tfrac7{25}+\\tfrac{24}{25}$"
      } },
      { tex: "\\cos2\\theta<0", correct: true, why: {
        en: "$\\theta>45^\\circ$ so $2\\theta>90^\\circ$.",
        fr: "$\\theta>45^\\circ$ donc $2\\theta>90^\\circ$.",
        es: "$\\theta>45^\\circ$, así $2\\theta>90^\\circ$.",
        ja: "$\\theta>45^\\circ$ より $2\\theta>90^\\circ$。",
        zh: "$\\theta>45^\\circ$，故 $2\\theta>90^\\circ$。"
      } },
      { tex: "S=\\tfrac{31}{25}", correct: false, why: {
        en: "Uses $\\cos2\\theta=+\\tfrac7{25}$.",
        fr: "Prend $\\cos2\\theta=+\\tfrac7{25}$.",
        es: "Toma $\\cos2\\theta=+\\tfrac7{25}$.",
        ja: "$\\cos2\\theta=+\\tfrac7{25}$ とした。",
        zh: "误取 $\\cos2\\theta=+\\tfrac7{25}$。"
      } },
      { tex: "S=\\tfrac45", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac{24}{25}", correct: false, why: {
        en: "Only $\\sin2\\theta$.",
        fr: "Seulement $\\sin2\\theta$.",
        es: "Solo $\\sin2\\theta$.",
        ja: "$\\sin2\\theta$ だけ。",
        zh: "只有 $\\sin2\\theta$。"
      } },
      { tex: "S=\\tfrac{28}{25}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac75", correct: false, why: {
        en: "That is $\\cos\\theta+\\sin\\theta$, not the double angle.",
        fr: "C’est $\\cos\\theta+\\sin\\theta$, pas l’angle double.",
        es: "Es $\\cos\\theta+\\sin\\theta$, no el ángulo doble.",
        ja: "それは $\\cos\\theta+\\sin\\theta$。",
        zh: "那是 $\\cos\\theta+\\sin\\theta$。"
      } },
      { tex: "\\tan2\\theta=\\tfrac83", correct: false, why: {
        en: "$\\tan2\\theta=\\tfrac{2\\cdot\\frac43}{1-\\frac{16}9}=-\\tfrac{24}{7}$",
        fr: "$\\tan2\\theta=\\tfrac{2\\cdot\\frac43}{1-\\frac{16}9}=-\\tfrac{24}{7}$",
        es: "$\\tan2\\theta=\\tfrac{2\\cdot\\frac43}{1-\\frac{16}9}=-\\tfrac{24}{7}$",
        ja: "$\\tan2\\theta=\\tfrac{2\\cdot\\frac43}{1-\\frac{16}9}=-\\tfrac{24}{7}$",
        zh: "$\\tan2\\theta=\\tfrac{2\\cdot\\frac43}{1-\\frac{16}9}=-\\tfrac{24}{7}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Read the triangle",
          fr: "Lire le triangle",
          es: "Leer el triángulo",
          ja: "三角形から",
          zh: "读三角形"
        },
        lines: ["\\sin\\theta=\\tfrac45,\\ \\cos\\theta=\\tfrac35"],
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
          en: "Double angle",
          fr: "Angle double",
          es: "Ángulo doble",
          ja: "2倍角",
          zh: "二倍角"
        },
        lines: ["\\cos2\\theta=\\tfrac9{25}-\\tfrac{16}{25}=-\\tfrac7{25},\\quad\\sin2\\theta=2\\cdot\\tfrac45\\cdot\\tfrac35=\\tfrac{24}{25}"],
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
