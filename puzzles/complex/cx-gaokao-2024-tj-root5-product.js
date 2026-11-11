/* complex · A product with √5
   Gaokao 2024, Tianjin paper (天津卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-gaokao-2024-tj-root5-product",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 10",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 10",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 10",
        ja: "2024年 中国・高考 天津卷 第10問",
        zh: "2024年高考数学天津卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "A product with √5",
      fr: "Un produit avec √5",
      es: "Un producto con √5",
      ja: "√5 を含む積",
      zh: "含 √5 的乘积"
    },
    statement: {
      en: "<b>Which of the following equal $(\\sqrt5+i)(\\sqrt5-2i)$?</b>",
      fr: "<b>Lesquels des nombres suivants sont égaux à $(\\sqrt5+i)(\\sqrt5-2i)$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $(\\sqrt5+i)(\\sqrt5-2i)$?</b>",
      ja: "<b>$(\\sqrt5+i)(\\sqrt5-2i)$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $(\\sqrt5+i)(\\sqrt5-2i)$？</b>"
    },
    figureText: {
      en: "The complex plane with √5 + i and √5 − 2i marked.",
      fr: "Le plan complexe avec √5 + i et √5 − 2i.",
      es: "El plano complejo con √5 + i y √5 − 2i.",
      ja: "複素平面上の √5 + i と √5 − 2i。",
      zh: "复平面上标出 √5 + i 与 √5 − 2i。"
    },
    hint: {
      en: "Expand like $(a+b)(c+d)$ and use $i^2=-1$.",
      fr: "Développez comme $(a+b)(c+d)$ et utilisez $i^2=-1$.",
      es: "Desarrolla como $(a+b)(c+d)$ y usa $i^2=-1$.",
      ja: "$(a+b)(c+d)$ と展開し $i^2=-1$。",
      zh: "按 $(a+b)(c+d)$ 展开，用 $i^2=-1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.0, h: 5.0, scale: 36, pad: 16 });
      const T = F.T = argand(F, -0.6, 7.4, -3.0, 2.0);
      F.dot(T([Math.sqrt(5), 1])); F.text(T([Math.sqrt(5), 1]), '√5 + i', 'len small', 26, -6);
      F.dot(T([Math.sqrt(5), -2])); F.text(T([Math.sqrt(5), -2]), '√5 − 2i', 'len small', 30, 6);
      F.reveal = () => {
      F.dot(T([7, -Math.sqrt(5)])); F.text(T([7, -Math.sqrt(5)]), 'z', 'pt', -10, -8);
      };
      return F;
    },
    options: [
      { tex: "7-\\sqrt5\\,i", correct: true, why: {
        en: "$5-2\\sqrt5i+\\sqrt5i+2$.",
        fr: "$5-2\\sqrt5i+\\sqrt5i+2$.",
        es: "$5-2\\sqrt5i+\\sqrt5i+2$.",
        ja: "$5-2\\sqrt5i+\\sqrt5i+2$。",
        zh: "$5-2\\sqrt5i+\\sqrt5i+2$。"
      } },
      { tex: "7-i\\sqrt5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "3-\\sqrt5\\,i", correct: false, why: {
        en: "Sign slip: $-2i\\cdot i=+2$.",
        fr: "Erreur de signe : $-2i\\cdot i=+2$.",
        es: "Error de signo: $-2i\\cdot i=+2$.",
        ja: "符号ミス：$-2i\\cdot i=+2$。",
        zh: "符号错：$-2i\\cdot i=+2$。"
      } },
      { tex: "7+\\sqrt5\\,i", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "5-2i", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "7-3\\sqrt5\\,i", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "7", correct: false, why: {
        en: "The imaginary parts do not cancel.",
        fr: "Les parties imaginaires ne s’annulent pas.",
        es: "Las partes imaginarias no se anulan.",
        ja: "虚部は消えない。",
        zh: "虚部不抵消。"
      } },
      { tex: "3+\\sqrt5\\,i", correct: false, why: {
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
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["5-2\\sqrt5\\,i+\\sqrt5\\,i-2i^2=5+2-\\sqrt5\\,i=\\boxed{7-\\sqrt5\\,i}"],
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
