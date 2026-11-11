/* geometry · Polygons whose angles form a progression
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 39 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2023-polygon-angle-progressions",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 39",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 39",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 39",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第39問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 39 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Polygons whose angles form a progression",
      fr: "Polygones dont les angles forment une progression",
      es: "Polígonos cuyos ángulos forman una progresión",
      ja: "内角が等差数列になる多角形",
      zh: "内角成等差数列的多边形"
    },
    statement: {
      en: "<b>Which of the following are always true?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont toujours vraies ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones son siempre verdaderas?</b>",
      ja: "<b>次のうち常に正しいものはどれですか？</b>",
      zh: "<b>下列哪些总是正确的？</b>"
    },
    figureText: {
      en: "A rhombus beside a regular hexagon.",
      fr: "Un losange à côté d’un hexagone régulier.",
      es: "Un rombo junto a un hexágono regular.",
      ja: "ひし形と正六角形。",
      zh: "菱形与正六边形。"
    },
    hint: {
      en: "Angle sum of a convex $n$-gon: $(n-2)\\cdot180^\\circ$. In a progression, first + last $=2\\times$ average.",
      fr: "Somme des angles d’un $n$-gone convexe : $(n-2)\\cdot180^\\circ$. Dans une progression, premier + dernier $=2\\times$ moyenne.",
      es: "Suma de ángulos de un $n$-gono convexo: $(n-2)\\cdot180^\\circ$. En una progresión, primero + último $=2\\times$ media.",
      ja: "凸 $n$ 角形の内角の和 $(n-2)\\cdot180^\\circ$。等差数列では 初項＋末項 $=2\\times$ 平均。",
      zh: "凸 $n$ 边形内角和 $(n-2)\\cdot180^\\circ$；等差数列中首项 + 末项 $=2\\times$ 平均。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.4, scale: 56, pad: 16 });
      F.path([[0.3, 1.2], [1.2, 2.1], [2.1, 1.2], [1.2, 0.3]].map(([x, y], k) => k % 2 ? [x, y] : [x + (k ? -0.2 : 0.2), y]), 'graph', 'base', true);
      const h = []; for (let k = 0; k < 6; k++) { const t = k * Math.PI / 3; h.push([3.7 + 0.9 * Math.cos(t), 1.2 + 0.9 * Math.sin(t)]); } F.path(h, 'conic', 'base', true);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "in a convex hexagon whose angles form an AP, smallest + largest": {"fr": "dans un hexagone convexe dont les angles sont en progression arithmétique, plus petit + plus grand", "es": "en un hexágono convexo cuyos ángulos están en progresión aritmética, menor + mayor", "ja": "内角が等差数列の凸六角形で 最小＋最大", "zh": "内角成等差数列的凸六边形中 最小 + 最大"},
      "a convex polygon with all sides equal need not be regular": {"fr": "un polygone convexe à côtés égaux n’est pas forcément régulier", "es": "un polígono convexo de lados iguales no tiene por qué ser regular", "ja": "辺がすべて等しい凸多角形が正多角形とは限らない", "zh": "各边相等的凸多边形不一定是正多边形"},
      "a convex polygon with all sides equal is regular": {"fr": "un polygone convexe à côtés égaux est régulier", "es": "un polígono convexo de lados iguales es regular", "ja": "辺がすべて等しい凸多角形は正多角形", "zh": "各边相等的凸多边形是正多边形"},
      "a convex 100-gon can have angles in AP with difference": {"fr": "un 100-gone convexe peut avoir ses angles en progression arithmétique de raison", "es": "un 100-gono convexo puede tener sus ángulos en progresión aritmética de diferencia", "ja": "凸100角形の内角が公差次の等差数列になりうる：", "zh": "凸 100 边形的内角可以成公差为下列的等差数列"},
      "the angles of a convex hexagon add to": {"fr": "les angles d’un hexagone convexe ont pour somme", "es": "los ángulos de un hexágono convexo suman", "ja": "凸六角形の内角の和は", "zh": "凸六边形内角和为"},
      "a convex polygon with all angles equal is regular": {"fr": "un polygone convexe à angles égaux est régulier", "es": "un polígono convexo de ángulos iguales es regular", "ja": "角がすべて等しい凸多角形は正多角形", "zh": "各角相等的凸多边形是正多边形"},
      "each angle of a convex 100-gon averages": {"fr": "les angles d’un 100-gone convexe valent en moyenne", "es": "los ángulos de un 100-gono convexo promedian", "ja": "凸100角形の内角の平均は", "zh": "凸 100 边形的内角平均为"},
      "sum": {"fr": "somme", "es": "suma", "ja": "和", "zh": "和"}
    },
    options: [
      { tex: "\\text{in a convex hexagon whose angles form an AP, smallest + largest}=240^\\circ", correct: true, why: {
        en: "$6a+15r=720\\Rightarrow a+(a+5r)=240$",
        fr: "$6a+15r=720\\Rightarrow a+(a+5r)=240$",
        es: "$6a+15r=720\\Rightarrow a+(a+5r)=240$",
        ja: "$6a+15r=720\\Rightarrow a+(a+5r)=240$",
        zh: "$6a+15r=720\\Rightarrow a+(a+5r)=240$"
      } },
      { tex: "\\text{a convex polygon with all sides equal need not be regular}", correct: true, why: {
        en: "A non-square rhombus.",
        fr: "Un losange qui n’est pas un carré.",
        es: "Un rombo que no es cuadrado.",
        ja: "正方形でないひし形。",
        zh: "非正方形的菱形。"
      } },
      { tex: "\\text{a convex polygon with all sides equal is regular}", correct: false, why: {
        en: "A rhombus is a counterexample.",
        fr: "Un losange est un contre-exemple.",
        es: "Un rombo es un contraejemplo.",
        ja: "ひし形が反例。",
        zh: "菱形是反例。"
      } },
      { tex: "\\text{a convex 100-gon can have angles in AP with difference}\\ 1^\\circ", correct: false, why: {
        en: "$a_1+a_{100}=352.8^\\circ,\\ a_{100}=a_1+99^\\circ\\Rightarrow a_{100}=225.9^\\circ>180^\\circ$",
        fr: "$a_1+a_{100}=352.8^\\circ,\\ a_{100}=a_1+99^\\circ\\Rightarrow a_{100}=225.9^\\circ>180^\\circ$",
        es: "$a_1+a_{100}=352.8^\\circ,\\ a_{100}=a_1+99^\\circ\\Rightarrow a_{100}=225.9^\\circ>180^\\circ$",
        ja: "$a_1+a_{100}=352.8^\\circ,\\ a_{100}=a_1+99^\\circ\\Rightarrow a_{100}=225.9^\\circ>180^\\circ$",
        zh: "$a_1+a_{100}=352.8^\\circ,\\ a_{100}=a_1+99^\\circ\\Rightarrow a_{100}=225.9^\\circ>180^\\circ$"
      } },
      { tex: "\\text{in a convex hexagon whose angles form an AP, smallest + largest}=180^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the angles of a convex hexagon add to}\\ 1080^\\circ", correct: false, why: {
        en: "$(6-2)\\cdot180^\\circ=720^\\circ$",
        fr: "$(6-2)\\cdot180^\\circ=720^\\circ$",
        es: "$(6-2)\\cdot180^\\circ=720^\\circ$",
        ja: "$(6-2)\\cdot180^\\circ=720^\\circ$",
        zh: "$(6-2)\\cdot180^\\circ=720^\\circ$"
      } },
      { tex: "\\text{a convex polygon with all angles equal is regular}", correct: false, why: {
        en: "A non-square rectangle.",
        fr: "Un rectangle qui n’est pas un carré.",
        es: "Un rectángulo que no es cuadrado.",
        ja: "正方形でない長方形。",
        zh: "非正方形的长方形。"
      } },
      { tex: "\\text{each angle of a convex 100-gon averages}\\ 180^\\circ", correct: false, why: {
        en: "$\\tfrac{98\\cdot180^\\circ}{100}=176.4^\\circ$",
        fr: "$\\tfrac{98\\cdot180^\\circ}{100}=176.4^\\circ$",
        es: "$\\tfrac{98\\cdot180^\\circ}{100}=176.4^\\circ$",
        ja: "$\\tfrac{98\\cdot180^\\circ}{100}=176.4^\\circ$",
        zh: "$\\tfrac{98\\cdot180^\\circ}{100}=176.4^\\circ$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Hexagon",
          fr: "Hexagone",
          es: "Hexágono",
          ja: "六角形",
          zh: "六边形"
        },
        lines: ["6a+15r=720^\\circ\\Rightarrow a+(a+5r)=240^\\circ"],
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
          en: "100-gon",
          fr: "100-gone",
          es: "100-gono",
          ja: "100角形",
          zh: "100 边形"
        },
        lines: ["\\text{sum}=17640^\\circ\\Rightarrow a_1+a_{100}=352.8^\\circ,\\ a_{100}=225.9^\\circ>180^\\circ"],
        note: {
          en: "In the exam: three statements, answer “only II” (the hexagon one).",
          fr: "Dans l’épreuve : trois affirmations, réponse « seulement II » (l’hexagone).",
          es: "En el examen: tres afirmaciones, respuesta «solo II» (la del hexágono).",
          ja: "原題は3つの命題で答えは「II（六角形）のみ」。",
          zh: "原题三个命题，答案“只有 II”（六边形）。"
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
