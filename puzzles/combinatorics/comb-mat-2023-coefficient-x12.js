/* combinatorics · A product that collapses
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2023-coefficient-x12",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2023 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A product that collapses",
      fr: "Un produit qui se simplifie",
      es: "Un producto que se simplifica",
      ja: "まとまる積",
      zh: "可以合并的乘积"
    },
    statement: {
      en: "<b>Which of the following equal the coefficient of $x^{12}$ in $(1-2x)^5(1+4x^2)^5(1+2x)^5$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au coefficient de $x^{12}$ dans $(1-2x)^5(1+4x^2)^5(1+2x)^5$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al coeficiente de $x^{12}$ en $(1-2x)^5(1+4x^2)^5(1+2x)^5$?</b>",
      ja: "<b>$(1-2x)^5(1+4x^2)^5(1+2x)^5$ の $x^{12}$ の係数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $(1-2x)^5(1+4x^2)^5(1+2x)^5$ 中 $x^{12}$ 的系数？</b>"
    },
    figureText: {
      en: "The three factors as boxes, with the outer two paired up.",
      fr: "Les trois facteurs en cases, les deux extérieurs réunis.",
      es: "Los tres factores en cajas, con los dos exteriores emparejados.",
      ja: "3つの因数の箱。外側の2つを組にする。",
      zh: "三个因式的方框，外侧两个配对。"
    },
    hint: {
      en: "$(1-2x)(1+2x)=1-4x^2$, and then $(1-4x^2)(1+4x^2)=1-16x^4$.",
      fr: "$(1-2x)(1+2x)=1-4x^2$, puis $(1-4x^2)(1+4x^2)=1-16x^4$.",
      es: "$(1-2x)(1+2x)=1-4x^2$ y luego $(1-4x^2)(1+4x^2)=1-16x^4$.",
      ja: "$(1-2x)(1+2x)=1-4x^2$、さらに $(1-4x^2)(1+4x^2)=1-16x^4$。",
      zh: "$(1-2x)(1+2x)=1-4x^2$，再 $(1-4x^2)(1+4x^2)=1-16x^4$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.8, scale: 50, pad: 16 });
      [['(1 − 2x)⁵', 'fill-blue'], ['(1 + 4x²)⁵', 'fill-yellow'], ['(1 + 2x)⁵', 'fill-blue']].forEach(([t, c], k) => { F.rect(0.2 + k * 2.15, 0.6, 2.0, 0.8, c, 'fills'); F.text([1.2 + k * 2.15, 1.0], t, 'len', 0, 0); });
      F.reveal = () => {
      F.text([3.3, 0.2], '= (1 − 16x⁴)⁵', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(1 − 2x)⁵": {"fr": "(1 − 2x)⁵", "es": "(1 − 2x)⁵", "ja": "(1 − 2x)⁵", "zh": "(1 − 2x)⁵"},
      "(1 + 4x²)⁵": {"fr": "(1 + 4x²)⁵", "es": "(1 + 4x²)⁵", "ja": "(1 + 4x²)⁵", "zh": "(1 + 4x²)⁵"},
      "(1 + 2x)⁵": {"fr": "(1 + 2x)⁵", "es": "(1 + 2x)⁵", "ja": "(1 + 2x)⁵", "zh": "(1 + 2x)⁵"},
      "= (1 − 16x⁴)⁵": {"fr": "= (1 − 16x⁴)⁵", "es": "= (1 − 16x⁴)⁵", "ja": "= (1 − 16x⁴)⁵", "zh": "= (1 − 16x⁴)⁵"}
    },
    options: [
      { tex: "-2^{13}\\times5", correct: true, why: {
        en: "$\\binom53(-16)^3=-10\\cdot4096=-40960$.",
        fr: "$\\binom53(-16)^3=-10\\cdot4096=-40960$.",
        es: "$\\binom53(-16)^3=-10\\cdot4096=-40960$.",
        ja: "$\\binom53(-16)^3=-10\\cdot4096=-40960$。",
        zh: "$\\binom53(-16)^3=-10\\cdot4096=-40960$。"
      } },
      { tex: "-40960", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-2^{12}\\times5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2^{12}\\times5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2^{13}\\times5", correct: false, why: {
        en: "Sign: $(-16)^3<0$.",
        fr: "Signe : $(-16)^3<0$.",
        es: "Signo: $(-16)^3<0$.",
        ja: "符号：$(-16)^3<0$。",
        zh: "符号：$(-16)^3<0$。"
      } },
      { tex: "0", correct: false, why: {
        en: "Only odd powers cancel; $x^{12}=(x^4)^3$ survives.",
        fr: "Seules les puissances impaires s’annulent ; $x^{12}=(x^4)^3$ reste.",
        es: "Solo se anulan las potencias impares; $x^{12}=(x^4)^3$ sobrevive.",
        ja: "消えるのは奇数次など。$x^{12}=(x^4)^3$ は残る。",
        zh: "$x^{12}=(x^4)^3$ 保留。"
      } },
      { tex: "-4096", correct: false, why: {
        en: "Forgot $\\binom53=10$.",
        fr: "Oubli de $\\binom53=10$.",
        es: "Olvidó $\\binom53=10$.",
        ja: "$\\binom53=10$ を忘れている。",
        zh: "漏了 $\\binom53=10$。"
      } },
      { tex: "-20480", correct: false, why: {
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
          en: "Pair the factors",
          fr: "Regrouper les facteurs",
          es: "Emparejar factores",
          ja: "因数を組にする",
          zh: "配对因式"
        },
        lines: ["(1-2x)^5(1+2x)^5(1+4x^2)^5=\\bigl((1-4x^2)(1+4x^2)\\bigr)^5=(1-16x^4)^5"],
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
          en: "Pick x¹²",
          fr: "Prendre x¹²",
          es: "Tomar x¹²",
          ja: "x¹² を選ぶ",
          zh: "取 x¹²"
        },
        lines: ["x^{12}=(x^4)^3:\\ \\binom53(-16)^3=-40960=\\boxed{-2^{13}\\cdot5}"],
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
