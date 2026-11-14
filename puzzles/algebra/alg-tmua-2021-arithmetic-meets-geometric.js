/* algebra · An arithmetic and a geometric sequence both starting at ½
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2021-arithmetic-meets-geometric",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 3",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 3",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 3",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第3問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 3 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "An arithmetic and a geometric sequence both starting at ½",
      fr: "Une suite arithmétique et une géométrique partant de ½",
      es: "Una progresión aritmética y una geométrica que empiezan en ½",
      ja: "½ から始まる等差数列と等比数列",
      zh: "都从 ½ 开始的等差与等比数列"
    },
    statement: {
      en: "An arithmetic sequence has first term $\\tfrac12$ and common difference $d$; a geometric sequence has first term $\\tfrac12$ and ratio $r$. The sum of their second terms is $\\tfrac12$ and the sum of their third terms is $\\tfrac18$. The geometric series converges; let $S$ be its sum to infinity. <b>Which of the following are true?</b>",
      fr: "Une suite arithmétique a pour premier terme $\\tfrac12$ et raison $d$ ; une suite géométrique a pour premier terme $\\tfrac12$ et raison $r$. La somme de leurs deuxièmes termes vaut $\\tfrac12$ et celle de leurs troisièmes termes vaut $\\tfrac18$. La série géométrique converge ; soit $S$ sa somme. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una progresión aritmética tiene primer término $\\tfrac12$ y diferencia $d$; una geométrica tiene primer término $\\tfrac12$ y razón $r$. La suma de sus segundos términos es $\\tfrac12$ y la de sus terceros términos es $\\tfrac18$. La serie geométrica converge; sea $S$ su suma. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "初項 $\\tfrac12$・公差 $d$ の等差数列と、初項 $\\tfrac12$・公比 $r$ の等比数列があります。第2項の和は $\\tfrac12$、第3項の和は $\\tfrac18$。等比級数は収束し、その和を $S$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "等差数列首项 $\\tfrac12$、公差 $d$；等比数列首项 $\\tfrac12$、公比 $r$。两数列第二项之和为 $\\tfrac12$，第三项之和为 $\\tfrac18$。等比级数收敛，其和为 $S$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two rows of three terms.",
      fr: "Deux lignes de trois termes.",
      es: "Dos filas de tres términos.",
      ja: "3項ずつの2列。",
      zh: "两行各三项。"
    },
    hint: {
      en: "First condition: $d=-\\tfrac r2$. Substitute into the second.",
      fr: "Première condition : $d=-\\tfrac r2$. Substituez dans la seconde.",
      es: "Primera condición: $d=-\\tfrac r2$. Sustituye en la segunda.",
      ja: "第1条件から $d=-\\tfrac r2$。第2式に代入。",
      zh: "由第一个条件 $d=-\\tfrac r2$，代入第二个。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.8, scale: 46, pad: 16 });
      ['½', '½ + d', '½ + 2d'].forEach((s, i) => F.text([1 + i * 1.6, 1.4], s, 'len small', 0, 0));
      ['½', '½r', '½r²'].forEach((s, i) => F.text([1 + i * 1.6, 0.5], s, 'len small', 0, 0));
      F.reveal = () => {
      F.text([4.5, 0.95], 'r = ½', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "½": {"fr": "½", "es": "½", "ja": "½", "zh": "½"},
      "½ + d": {"fr": "½ + d", "es": "½ + d", "ja": "½ + d", "zh": "½ + d"},
      "½ + 2d": {"fr": "½ + 2d", "es": "½ + 2d", "ja": "½ + 2d", "zh": "½ + 2d"},
      "½r": {"fr": "½r", "es": "½r", "ja": "½r", "zh": "½r"},
      "½r²": {"fr": "½r²", "es": "½r²", "ja": "½r²", "zh": "½r²"},
      "r = ½": {"fr": "r = ½", "es": "r = ½", "ja": "r = ½", "zh": "r = ½"}
    },
    options: [
      { tex: "S=1", correct: true, why: {
        en: "$\\dfrac{1/2}{1-1/2}$",
        fr: "$\\dfrac{1/2}{1-1/2}$",
        es: "$\\dfrac{1/2}{1-1/2}$",
        ja: "$\\dfrac{1/2}{1-1/2}$",
        zh: "$\\dfrac{1/2}{1-1/2}$"
      } },
      { tex: "r=\\tfrac12", correct: true, why: {
        en: "$4r^2-8r+3=0,\\ |r|<1$",
        fr: "$4r^2-8r+3=0,\\ |r|<1$",
        es: "$4r^2-8r+3=0,\\ |r|<1$",
        ja: "$4r^2-8r+3=0,\\ |r|<1$",
        zh: "$4r^2-8r+3=0,\\ |r|<1$"
      } },
      { tex: "r=\\tfrac32", correct: false, why: {
        en: "The other root, but then the series diverges.",
        fr: "L’autre racine, mais la série diverge.",
        es: "La otra raíz, pero la serie diverge.",
        ja: "もう一方の根だが発散する。",
        zh: "另一根，但级数发散。"
      } },
      { tex: "S=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac43", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "d=\\tfrac14", correct: false, why: {
        en: "$d=-\\tfrac14$",
        fr: "$d=-\\tfrac14$",
        es: "$d=-\\tfrac14$",
        ja: "$d=-\\tfrac14$",
        zh: "$d=-\\tfrac14$"
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
        lines: ["d+\\tfrac r2=0,\\quad\\tfrac12+2d+\\tfrac{r^2}2=\\tfrac18"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["4r^2-8r+3=0\\Rightarrow r=\\tfrac12\\ (|r|<1),\\ S=1"],
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
