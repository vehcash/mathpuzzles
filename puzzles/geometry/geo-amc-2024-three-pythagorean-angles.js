/* geometry · Three Pythagorean triangles whose small angles add to 90°
   AMC 12B 2024 (Mathematical Association of America), Problem 21 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-amc-2024-three-pythagorean-angles",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 21",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 21",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 21",
        ja: "AMC 12B 2024（アメリカ数学協会）第21問",
        zh: "AMC 12B 2024（美国数学协会）第 21 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "Three Pythagorean triangles whose small angles add to 90°",
      fr: "Trois triangles pythagoriciens dont les petits angles font 90°",
      es: "Tres triángulos pitagóricos cuyos ángulos menores suman 90°",
      ja: "最小角の和が 90° になる3つのピタゴラス三角形",
      zh: "三个最小角之和为 90° 的勾股三角形"
    },
    statement: {
      en: "Three right triangles with primitive Pythagorean side lengths have smallest angles adding up to $90^\\circ$. Two of them are $3$-$4$-$5$ and $5$-$12$-$13$. <b>Which of the following are true about the third?</b>",
      fr: "Trois triangles rectangles à côtés pythagoriciens primitifs ont des plus petits angles de somme $90^\\circ$. Deux sont $3$-$4$-$5$ et $5$-$12$-$13$. <b>Lesquelles des affirmations suivantes sont vraies pour le troisième ?</b>",
      es: "Tres triángulos rectángulos con lados pitagóricos primitivos tienen ángulos menores que suman $90^\\circ$. Dos son $3$-$4$-$5$ y $5$-$12$-$13$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre el tercero?</b>",
      ja: "原始ピタゴラス数を辺とする3つの直角三角形の最小角の和が $90^\\circ$。2つは $3$-$4$-$5$ と $5$-$12$-$13$。<b>3つ目について正しいものはどれですか？</b>",
      zh: "三个边长为本原勾股数的直角三角形，最小角之和为 $90^\\circ$，其中两个为 $3$-$4$-$5$ 与 $5$-$12$-$13$。<b>关于第三个，下列哪些正确？</b>"
    },
    figureText: {
      en: "Three thin wedges with angles α, β, θ fitting together into a right angle.",
      fr: "Trois coins d’angles α, β, θ qui se juxtaposent en un angle droit.",
      es: "Tres cuñas de ángulos α, β, θ que juntas forman un ángulo recto.",
      ja: "角 α, β, θ の3つのくさびが合わさって直角になる。",
      zh: "角 α、β、θ 的三个楔形拼成直角。"
    },
    hint: {
      en: "The third smallest angle is $\\theta=90^\\circ-\\alpha-\\beta$, so $\\sin\\theta=\\cos(\\alpha+\\beta)$.",
      fr: "Le troisième petit angle est $\\theta=90^\\circ-\\alpha-\\beta$, donc $\\sin\\theta=\\cos(\\alpha+\\beta)$.",
      es: "El tercer ángulo menor es $\\theta=90^\\circ-\\alpha-\\beta$, así que $\\sin\\theta=\\cos(\\alpha+\\beta)$.",
      ja: "3つ目の最小角は $\\theta=90^\\circ-\\alpha-\\beta$、$\\sin\\theta=\\cos(\\alpha+\\beta)$。",
      zh: "第三个最小角 $\\theta=90^\\circ-\\alpha-\\beta$，故 $\\sin\\theta=\\cos(\\alpha+\\beta)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 80, pad: 16 });
      const O = [0.2, 0.2], R = 2.8, a = Math.atan(3 / 4), b = Math.atan(5 / 12);
      [0, a, a + b, Math.PI / 2].forEach(t => F.seg(O, [0.2 + R * Math.cos(t), 0.2 + R * Math.sin(t)], 'seg'));
      [[a / 2, 'α'], [a + b / 2, 'β'], [(a + b + Math.PI / 2) / 2, 'θ']].forEach(([t, s]) => F.text([0.2 + 1.9 * Math.cos(t), 0.2 + 1.9 * Math.sin(t)], s, 'pt', 0, 0));
      F.reveal = () => {
      F.text([1.6, 3.0], 'sin θ = 33/65', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "α": {"fr": "α", "es": "α", "ja": "α", "zh": "α"},
      "β": {"fr": "β", "es": "β", "ja": "β", "zh": "β"},
      "θ": {"fr": "θ", "es": "θ", "ja": "θ", "zh": "θ"},
      "sin θ = 33/65": {"fr": "sin θ = 33/65", "es": "sin θ = 33/65", "ja": "sin θ = 33/65", "zh": "sin θ = 33/65"},
      "its sides are": {"fr": "ses côtés sont", "es": "sus lados son", "ja": "辺の長さは", "zh": "其边长为"},
      "its perimeter is": {"fr": "son périmètre est", "es": "su perímetro es", "ja": "周の長さは", "zh": "其周长为"},
      "the three triangles are congruent": {"fr": "les trois triangles sont isométriques", "es": "los tres triángulos son congruentes", "ja": "3つの三角形は合同", "zh": "三个三角形全等"}
    },
    options: [
      { tex: "\\text{its sides are}\\ 33,56,65", correct: true, why: {
        en: "$\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}$",
        fr: "$\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}$",
        es: "$\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}$",
        ja: "$\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}$",
        zh: "$\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}$"
      } },
      { tex: "\\text{its perimeter is}\\ 154", correct: true, why: {
        en: "$33+56+65$",
        fr: "$33+56+65$",
        es: "$33+56+65$",
        ja: "$33+56+65$",
        zh: "$33+56+65$"
      } },
      { tex: "\\text{its perimeter is}\\ 40", correct: false, why: {
        en: "That is the $8$-$15$-$17$ triangle.",
        fr: "C’est le triangle $8$-$15$-$17$.",
        es: "Es el triángulo $8$-$15$-$17$.",
        ja: "$8$-$15$-$17$ の三角形。",
        zh: "那是 $8$-$15$-$17$ 三角形。"
      } },
      { tex: "\\text{its perimeter is}\\ 126", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{its perimeter is}\\ 176", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{its perimeter is}\\ 208", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{its sides are}\\ 16,63,65", correct: false, why: {
        en: "$\\cos(\\alpha-\\beta)$ gives $\\tfrac{63}{65}$; the sum $\\alpha+\\beta$ is needed.",
        fr: "$\\cos(\\alpha-\\beta)$ donne $\\tfrac{63}{65}$ ; il faut $\\alpha+\\beta$.",
        es: "$\\cos(\\alpha-\\beta)$ da $\\tfrac{63}{65}$; hace falta $\\alpha+\\beta$.",
        ja: "$\\cos(\\alpha-\\beta)$ を使っている。必要なのは $\\alpha+\\beta$。",
        zh: "用了 $\\cos(\\alpha-\\beta)$，需要的是 $\\alpha+\\beta$。"
      } },
      { tex: "\\text{the three triangles are congruent}", correct: false, why: {
        en: "They have different hypotenuses $5$, $13$, $65$.",
        fr: "Leurs hypoténuses diffèrent : $5$, $13$, $65$.",
        es: "Sus hipotenusas son distintas: $5$, $13$, $65$.",
        ja: "斜辺が $5$、$13$、$65$ と異なる。",
        zh: "斜边分别为 $5$、$13$、$65$，各不相同。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Angle addition",
          fr: "Addition des angles",
          es: "Suma de ángulos",
          ja: "加法定理",
          zh: "和角公式"
        },
        lines: ["\\sin\\theta=\\cos(\\alpha+\\beta)=\\tfrac45\\cdot\\tfrac{12}{13}-\\tfrac35\\cdot\\tfrac5{13}=\\tfrac{33}{65}"],
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
          en: "Third side",
          fr: "Troisième côté",
          es: "Tercer lado",
          ja: "残りの辺",
          zh: "第三边"
        },
        lines: ["\\sqrt{65^2-33^2}=56,\\quad33+56+65=154"],
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
