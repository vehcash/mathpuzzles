/* complex · z minus its conjugate
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2023-z-minus-conjugate",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 2",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 2",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 2",
        ja: "2023年 中国・高考 新課程標準I卷 第2問",
        zh: "2023年高考数学新课标I卷 第2题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "z minus its conjugate",
      fr: "z moins son conjugué",
      es: "z menos su conjugado",
      ja: "z と共役の差",
      zh: "z 减去共轭"
    },
    statement: {
      en: "Let $z=\\dfrac{1-i}{2+2i}$. <b>Which of the following equal $z-\\bar z$?</b>",
      fr: "Soit $z=\\dfrac{1-i}{2+2i}$. <b>Lesquels des nombres suivants sont égaux à $z-\\bar z$ ?</b>",
      es: "Sea $z=\\dfrac{1-i}{2+2i}$. <b>¿Cuáles de los siguientes son iguales a $z-\\bar z$?</b>",
      ja: "$z=\\dfrac{1-i}{2+2i}$ とします。<b>$z-\\bar z$ に等しいものはどれですか？</b>",
      zh: "设 $z=\\dfrac{1-i}{2+2i}$。<b>下列哪些等于 $z-\\bar z$？</b>"
    },
    figureText: {
      en: "The complex plane with 1 − i and 2 + 2i marked; they are perpendicular as vectors from 0.",
      fr: "Le plan complexe avec 1 − i et 2 + 2i ; comme vecteurs issus de 0 ils sont orthogonaux.",
      es: "El plano complejo con 1 − i y 2 + 2i; como vectores desde 0 son perpendiculares.",
      ja: "複素平面上の 1 − i と 2 + 2i。0 からのベクトルとして直交。",
      zh: "复平面上的 1 − i 与 2 + 2i，作为从 0 出发的向量互相垂直。"
    },
    hint: {
      en: "Multiply top and bottom by $2-2i$. For any $z$, $z-\\bar z=2i\\,\\mathrm{Im}\\,z$.",
      fr: "Multipliez haut et bas par $2-2i$. Pour tout $z$, $z-\\bar z=2i\\,\\mathrm{Im}\\,z$.",
      es: "Multiplica arriba y abajo por $2-2i$. Para todo $z$, $z-\\bar z=2i\\,\\mathrm{Im}\\,z$.",
      ja: "分子分母に $2-2i$ を掛ける。一般に $z-\\bar z=2i\\,\\mathrm{Im}\\,z$。",
      zh: "分子分母同乘 $2-2i$。对任意 $z$，$z-\\bar z=2i\\,\\mathrm{Im}\\,z$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 56, pad: 16 });
      const T = F.T = argand(F, -1.4, 2.6, -1.4, 2.6);
      F.dot(T([1, -1])); F.text(T([1, -1]), '1 − i', 'len small', 24, 4);
      F.dot(T([2, 2])); F.text(T([2, 2]), '2 + 2i', 'len small', -24, -10);
      F.reveal = () => {
      F.dot(T([0, -0.5])); F.text(T([0, -0.5]), 'z', 'pt', -12, 4);
      F.dot(T([0, 0.5])); F.text(T([0, 0.5]), 'z̄', 'pt', -12, -2);
      };
      return F;
    },
    options: [
      { tex: "-i", correct: true, why: {
        en: "$z=-\\tfrac i2$ and $\\bar z=\\tfrac i2$.",
        fr: "$z=-\\tfrac i2$ et $\\bar z=\\tfrac i2$.",
        es: "$z=-\\tfrac i2$ y $\\bar z=\\tfrac i2$.",
        ja: "$z=-\\tfrac i2$、$\\bar z=\\tfrac i2$。",
        zh: "$z=-\\tfrac i2$，$\\bar z=\\tfrac i2$。"
      } },
      { tex: "i^3", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "i", correct: false, why: {
        en: "Order slip: that is $\\bar z-z$.",
        fr: "Inversion : c’est $\\bar z-z$.",
        es: "Orden invertido: es $\\bar z-z$.",
        ja: "順序が逆：$\\bar z-z$。",
        zh: "顺序反了：那是 $\\bar z-z$。"
      } },
      { tex: "0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\tfrac i2", correct: false, why: {
        en: "That is $z$ itself.",
        fr: "C’est $z$ lui-même.",
        es: "Es el propio $z$.",
        ja: "$z$ そのもの。",
        zh: "那是 $z$ 本身。"
      } },
      { tex: "-2i", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Simplify z",
          fr: "Simplifier z",
          es: "Simplificar z",
          ja: "z を簡単に",
          zh: "化简 z"
        },
        lines: ["z=\\frac{(1-i)(2-2i)}{(2+2i)(2-2i)}=\\frac{-4i}{8}=-\\frac i2"],
        note: {
          en: "$z$ is purely imaginary because $1-i$ and $2+2i$ are perpendicular.",
          fr: "$z$ est imaginaire pur car $1-i$ et $2+2i$ sont orthogonaux.",
          es: "$z$ es imaginario puro porque $1-i$ y $2+2i$ son perpendiculares.",
          ja: "$1-i$ と $2+2i$ が直交するので $z$ は純虚数。",
          zh: "因为 $1-i$ 与 $2+2i$ 垂直，$z$ 是纯虚数。"
        }
      },
      {
        title: {
          en: "Subtract the conjugate",
          fr: "Soustraire le conjugué",
          es: "Restar el conjugado",
          ja: "共役を引く",
          zh: "减去共轭"
        },
        lines: ["z-\\bar z=-\\tfrac i2-\\tfrac i2=\\boxed{-i}"],
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
