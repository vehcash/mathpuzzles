/* algebra · From sums of terms and squares to sum of cubes
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2018-sum-of-cubes-of-a-geometric-series",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 8",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 8",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 8",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第8問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 8 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "From sums of terms and squares to sum of cubes",
      fr: "Des sommes des termes et des carrés à celle des cubes",
      es: "De las sumas de términos y cuadrados a la de cubos",
      ja: "項の和と平方和から立方和へ",
      zh: "由项和与平方和求立方和"
    },
    statement: {
      en: "A convergent geometric series has sum to infinity $6$, and the series of the squares of its terms has sum to infinity $12$. Let $C$ be the sum to infinity of the cubes of its terms. <b>Which of the following are true?</b>",
      fr: "Une série géométrique convergente a pour somme $6$, et la série des carrés de ses termes a pour somme $12$. Soit $C$ la somme des cubes de ses termes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una serie geométrica convergente tiene suma $6$, y la serie de los cuadrados de sus términos suma $12$. Sea $C$ la suma de los cubos de sus términos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "収束する等比級数の和は $6$、各項の2乗の級数の和は $12$。各項の3乗の級数の和を $C$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "收敛等比级数的和为 $6$，各项平方组成的级数和为 $12$，设各项立方组成的级数和为 $C$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Three shrinking staircases: terms, squares, cubes.",
      fr: "Trois escaliers décroissants : termes, carrés, cubes.",
      es: "Tres escaleras decrecientes: términos, cuadrados, cubos.",
      ja: "項・2乗・3乗の3つの減少列。",
      zh: "项、平方、立方三列递减条形。"
    },
    hint: {
      en: "Divide: $\\dfrac{a^2/(1-r^2)}{a/(1-r)}=\\dfrac a{1+r}=2$.",
      fr: "Divisez : $\\dfrac{a^2/(1-r^2)}{a/(1-r)}=\\dfrac a{1+r}=2$.",
      es: "Divide: $\\dfrac{a^2/(1-r^2)}{a/(1-r)}=\\dfrac a{1+r}=2$.",
      ja: "割る：$\\dfrac{a^2/(1-r^2)}{a/(1-r)}=\\dfrac a{1+r}=2$。",
      zh: "相除：$\\dfrac{a^2/(1-r^2)}{a/(1-r)}=\\dfrac a{1+r}=2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.0, scale: 46, pad: 16 });
      [[1, 'fill-blue'], [2, 'fill-green'], [3, 'fill-yellow']].forEach(([p, c], j) => { for (let n = 0; n < 6; n++) F.rect(0.2 + j * 1.6 + n * 0.24, 0.2, 0.2, 1.4 * Math.pow(0.5, n * p) + 0.01, c, 'fills'); });
      F.reveal = () => {
      F.text([2.5, 1.85], 'a = 3, r = ½', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a = 3, r = ½": {"fr": "a = 3, r = ½", "es": "a = 3, r = ½", "ja": "a = 3, r = ½", "zh": "a = 3, r = ½"},
      "the first term is": {"fr": "le premier terme vaut", "es": "el primer término es", "ja": "初項は", "zh": "首项为"},
      "the common ratio is": {"fr": "la raison vaut", "es": "la razón es", "ja": "公比は", "zh": "公比为"}
    },
    options: [
      { tex: "C=\\tfrac{216}7", correct: true, why: {
        en: "$\\dfrac{27}{1-1/8}$",
        fr: "$\\dfrac{27}{1-1/8}$",
        es: "$\\dfrac{27}{1-1/8}$",
        ja: "$\\dfrac{27}{1-1/8}$",
        zh: "$\\dfrac{27}{1-1/8}$"
      } },
      { tex: "\\text{the first term is}\\ 3", correct: true, why: {
        en: "$a=6(1-r),\\ a=2(1+r)$",
        fr: "$a=6(1-r),\\ a=2(1+r)$",
        es: "$a=6(1-r),\\ a=2(1+r)$",
        ja: "$a=6(1-r),\\ a=2(1+r)$",
        zh: "$a=6(1-r),\\ a=2(1+r)$"
      } },
      { tex: "C=24", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "C=\\tfrac{27}7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "C=18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "C=54", correct: false, why: {
        en: "Uses $1-r$ instead of $1-r^3$.",
        fr: "Utilise $1-r$ au lieu de $1-r^3$.",
        es: "Usa $1-r$ en vez de $1-r^3$.",
        ja: "$1-r^3$ でなく $1-r$。",
        zh: "用了 $1-r$ 而非 $1-r^3$。"
      } },
      { tex: "C=36", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the common ratio is}\\ \\tfrac13", correct: false, why: {
        en: "$r=\\tfrac12$",
        fr: "$r=\\tfrac12$",
        es: "$r=\\tfrac12$",
        ja: "$r=\\tfrac12$",
        zh: "$r=\\tfrac12$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two equations",
          fr: "Deux équations",
          es: "Dos ecuaciones",
          ja: "2つの式",
          zh: "两个方程"
        },
        lines: ["\\frac a{1-r}=6,\\ \\frac a{1+r}=2\\Rightarrow a=3,\\ r=\\tfrac12"],
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
          en: "Cubes",
          fr: "Cubes",
          es: "Cubos",
          ja: "3乗",
          zh: "立方"
        },
        lines: ["C=\\frac{a^3}{1-r^3}=\\frac{27}{7/8}=\\frac{216}7"],
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
