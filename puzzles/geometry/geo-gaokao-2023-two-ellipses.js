/* geometry · One ellipse √3 times as eccentric
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-two-ellipses",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 5",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 5",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 5",
        ja: "2023年 中国・高考 新課程標準I卷 第5問",
        zh: "2023年高考数学新课标I卷 第5题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "One ellipse √3 times as eccentric",
      fr: "Une ellipse √3 fois plus excentrique",
      es: "Una elipse √3 veces más excéntrica",
      ja: "離心率が √3 倍の楕円",
      zh: "离心率是 √3 倍的椭圆"
    },
    statement: {
      en: "$C_1:\\ \\dfrac{x^2}{a^2}+y^2=1$ ($a>1$) and $C_2:\\ \\dfrac{x^2}{4}+y^2=1$ have eccentricities $e_1,e_2$, and $e_2=\\sqrt3\\,e_1$. <b>Which of the following equal $a$?</b>",
      fr: "$C_1:\\ \\dfrac{x^2}{a^2}+y^2=1$ ($a>1$) et $C_2:\\ \\dfrac{x^2}{4}+y^2=1$ ont pour excentricités $e_1,e_2$, avec $e_2=\\sqrt3\\,e_1$. <b>Lesquelles des valeurs suivantes sont égales à $a$ ?</b>",
      es: "$C_1:\\ \\dfrac{x^2}{a^2}+y^2=1$ ($a>1$) y $C_2:\\ \\dfrac{x^2}{4}+y^2=1$ tienen excentricidades $e_1,e_2$, con $e_2=\\sqrt3\\,e_1$. <b>¿Cuáles de los siguientes valores son iguales a $a$?</b>",
      ja: "楕円 $C_1:\\ \\dfrac{x^2}{a^2}+y^2=1$（$a>1$）と $C_2:\\ \\dfrac{x^2}{4}+y^2=1$ の離心率を $e_1,e_2$ とし、$e_2=\\sqrt3\\,e_1$ です。<b>$a$ に等しいものはどれですか？</b>",
      zh: "椭圆 $C_1:\\ \\dfrac{x^2}{a^2}+y^2=1$（$a>1$）与 $C_2:\\ \\dfrac{x^2}{4}+y^2=1$ 的离心率为 $e_1,e_2$，且 $e_2=\\sqrt3\\,e_1$。<b>下列哪些等于 $a$？</b>"
    },
    figureText: {
      en: "The ellipse C₂ with semi-axes 2 and 1. C₁ shares the vertical semi-axis 1 and is drawn in the solution.",
      fr: "L’ellipse C₂ de demi-axes 2 et 1. C₁ a le même demi-axe vertical 1 ; elle est tracée dans la solution.",
      es: "La elipse C₂ de semiejes 2 y 1. C₁ comparte el semieje vertical 1 y se dibuja en la solución.",
      ja: "半軸 2 と 1 の楕円 C₂。C₁ は縦の半軸 1 が共通で、解答で描く。",
      zh: "半轴为 2 和 1 的椭圆 C₂。C₁ 竖直半轴同为 1，在解答中画出。"
    },
    hint: {
      en: "With semi-minor axis $1$, $e^2=1-\\dfrac1{a^2}$.",
      fr: "Avec un petit demi-axe $1$, $e^2=1-\\dfrac1{a^2}$.",
      es: "Con semieje menor $1$, $e^2=1-\\dfrac1{a^2}$.",
      ja: "短半軸 $1$ なら $e^2=1-\\dfrac1{a^2}$。",
      zh: "短半轴为 $1$ 时，$e^2=1-\\dfrac1{a^2}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 56, pad: 16 });
      const T = F.T = axes(F, -2.5, 2.5, -1.5, 1.5);
      const E = (A, cls) => { const p = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; p.push(T([A * Math.cos(t), Math.sin(t)])); } F.path(p, cls, 'base', true); };
      E(2, 'graph'); F.text(T([2, 0]), '2', 'tick', 8, 14); F.text(T([0, 1]), '1', 'tick', -8, -8); F.text(T([1.5, 0.66]), 'C₂', 'pt', 14, -10);
      F.reveal = () => {
      E(2 / Math.sqrt(3), 'hl pink'); F.text(T([0.8, 0.72]), 'C₁', 'pt', 4, -8);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{2\\sqrt3}{3}", correct: true, why: {
        en: "$e_1=\\tfrac12$, so $1-\\tfrac1{a^2}=\\tfrac14$ and $a^2=\\tfrac43$.",
        fr: "$e_1=\\tfrac12$, donc $1-\\tfrac1{a^2}=\\tfrac14$ et $a^2=\\tfrac43$.",
        es: "$e_1=\\tfrac12$, así que $1-\\tfrac1{a^2}=\\tfrac14$ y $a^2=\\tfrac43$.",
        ja: "$e_1=\\tfrac12$ より $1-\\tfrac1{a^2}=\\tfrac14$、$a^2=\\tfrac43$。",
        zh: "$e_1=\\tfrac12$，故 $1-\\tfrac1{a^2}=\\tfrac14$，$a^2=\\tfrac43$。"
      } },
      { tex: "\\tfrac{2}{\\sqrt3}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "That is $a^2$.",
        fr: "C’est $a^2$.",
        es: "Es $a^2$.",
        ja: "$a^2$ の値。",
        zh: "那是 $a^2$。"
      } },
      { tex: "\\tfrac{2\\sqrt3}{9}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2\\sqrt3", correct: false, why: {
        en: "This uses $e_1=\\sqrt3\\,e_2$ the wrong way round, which has no solution with $a>1$ anyway.",
        fr: "Cela inverse la relation entre $e_1$ et $e_2$.",
        es: "Invierte la relación entre $e_1$ y $e_2$.",
        ja: "$e_1$ と $e_2$ の関係を逆にしている。",
        zh: "把 $e_1$ 与 $e_2$ 的关系弄反了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Eccentricity of C₂",
          fr: "Excentricité de C₂",
          es: "Excentricidad de C₂",
          ja: "C₂ の離心率",
          zh: "C₂ 的离心率"
        },
        lines: ["e_2=\\frac{\\sqrt{4-1}}{2}=\\frac{\\sqrt3}{2}\\ \\Rightarrow\\ e_1=\\frac12"],
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
          en: "Solve for a",
          fr: "Trouver a",
          es: "Hallar a",
          ja: "a を求める",
          zh: "求 a"
        },
        lines: ["\\frac{a^2-1}{a^2}=\\frac14\\ \\Rightarrow\\ a^2=\\frac43,\\quad a=\\boxed{\\tfrac{2\\sqrt3}{3}}"],
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
