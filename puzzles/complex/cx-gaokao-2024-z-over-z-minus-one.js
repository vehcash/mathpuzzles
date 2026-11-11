/* complex · A fraction equal to 1 + i
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2024-z-over-z-minus-one",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 2",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 2",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 2",
        ja: "2024年 中国・高考 新課程標準I卷 第2問",
        zh: "2024年高考数学新课标I卷 第2题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "A fraction equal to 1 + i",
      fr: "Une fraction égale à 1 + i",
      es: "Una fracción igual a 1 + i",
      ja: "1 + i に等しい分数",
      zh: "等于 1 + i 的分式"
    },
    statement: {
      en: "The complex number $z$ satisfies $\\dfrac{z}{z-1}=1+i$. <b>Which of the following equal $z$?</b>",
      fr: "Le nombre complexe $z$ vérifie $\\dfrac{z}{z-1}=1+i$. <b>Lesquels des nombres suivants sont égaux à $z$ ?</b>",
      es: "El número complejo $z$ cumple $\\dfrac{z}{z-1}=1+i$. <b>¿Cuáles de los siguientes son iguales a $z$?</b>",
      ja: "複素数 $z$ が $\\dfrac{z}{z-1}=1+i$ を満たします。<b>$z$ に等しいものはどれですか？</b>",
      zh: "复数 $z$ 满足 $\\dfrac{z}{z-1}=1+i$。<b>下列哪些等于 $z$？</b>"
    },
    figureText: {
      en: "The complex plane with the point 1 + i marked.",
      fr: "Le plan complexe avec le point 1 + i marqué.",
      es: "El plano complejo con el punto 1 + i marcado.",
      ja: "複素平面上の点 1 + i。",
      zh: "复平面上标出点 1 + i。"
    },
    hint: {
      en: "Multiply out: $z=(1+i)(z-1)$, then collect the $z$ terms.",
      fr: "Développez : $z=(1+i)(z-1)$, puis regroupez les termes en $z$.",
      es: "Desarrolla: $z=(1+i)(z-1)$ y agrupa los términos en $z$.",
      ja: "$z=(1+i)(z-1)$ と展開し、$z$ の項をまとめる。",
      zh: "去分母：$z=(1+i)(z-1)$，再合并含 $z$ 的项。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 62, pad: 16 });
      const T = F.T = argand(F, -1.6, 1.8, -1.6, 1.8);
      F.dot(T([1, 1])); F.text(T([1, 1]), '1 + i', 'len small', 22, -10);
      F.reveal = () => {
      F.dot(T([1, -1])); F.text(T([1, -1]), 'z', 'pt', 12, 4);
      F.dot(T([0, -1])); F.text(T([0, -1]), 'z − 1', 'len small', -26, 12);
      arrow(F, T([0.92, -1]), T([0.08, -1]), 'seg thin dashc');
      };
      return F;
    },
    options: [
      { tex: "1-i", correct: true, why: {
        en: "$z-1=-i$ and $\\dfrac{1-i}{-i}=\\dfrac{(1-i)i}{1}=1+i$.",
        fr: "$z-1=-i$ and $\\dfrac{1-i}{-i}=\\dfrac{(1-i)i}{1}=1+i$.",
        es: "$z-1=-i$ and $\\dfrac{1-i}{-i}=\\dfrac{(1-i)i}{1}=1+i$.",
        ja: "$z-1=-i$ and $\\dfrac{1-i}{-i}=\\dfrac{(1-i)i}{1}=1+i$.",
        zh: "$z-1=-i$ and $\\dfrac{1-i}{-i}=\\dfrac{(1-i)i}{1}=1+i$."
      } },
      { tex: "\\overline{1+i}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1+i", correct: false, why: {
        en: "That is the value of the fraction, not $z$.",
        fr: "C’est la valeur de la fraction, pas $z$.",
        es: "Es el valor de la fracción, no $z$.",
        ja: "分数の値で、$z$ ではない。",
        zh: "那是分式的值，不是 $z$。"
      } },
      { tex: "-1-i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-1+i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "i", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{1+i}{2}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2-i", correct: false, why: {
        en: "This would make $z-1=1-i$, and $\\tfrac{2-i}{1-i}\\ne1+i$.",
        fr: "Alors $z-1=1-i$ et $\\tfrac{2-i}{1-i}\\ne1+i$.",
        es: "Entonces $z-1=1-i$ y $\\tfrac{2-i}{1-i}\\ne1+i$.",
        ja: "このとき $z-1=1-i$ で $\\tfrac{2-i}{1-i}\\ne1+i$。",
        zh: "此时 $z-1=1-i$，$\\tfrac{2-i}{1-i}\\ne1+i$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Clear the fraction",
          fr: "Chasser le dénominateur",
          es: "Quitar el denominador",
          ja: "分母を払う",
          zh: "去分母"
        },
        lines: ["z=(1+i)(z-1)=(1+i)z-(1+i)", "z-(1+i)z=-(1+i)\\ \\Rightarrow\\ -iz=-(1+i)"],
        note: {
          en: "Only $z$ terms on the left.",
          fr: "Les termes en $z$ à gauche.",
          es: "Los términos en $z$ a la izquierda.",
          ja: "$z$ の項を左辺に。",
          zh: "含 $z$ 的项移到左边。"
        }
      },
      {
        title: {
          en: "Divide by i",
          fr: "Diviser par i",
          es: "Dividir entre i",
          ja: "i で割る",
          zh: "除以 i"
        },
        lines: ["z=\\frac{1+i}{i}=(1+i)(-i)=\\boxed{1-i}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$\\tfrac1i=-i$.",
          fr: "$\\tfrac1i=-i$.",
          es: "$\\tfrac1i=-i$.",
          ja: "$\\tfrac1i=-i$。",
          zh: "$\\tfrac1i=-i$。"
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
