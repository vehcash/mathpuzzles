/* algebra · Same sum after 5 and after 8 terms
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2018-five-terms-equal-eight-terms",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "Same sum after 5 and after 8 terms",
      fr: "Même somme après 5 et après 8 termes",
      es: "Misma suma tras 5 y tras 8 términos",
      ja: "5項の和と8項の和が等しい",
      zh: "前 5 项与前 8 项和相等"
    },
    statement: {
      en: "An arithmetic sequence has first term $a$ and common difference $d\\ne0$. The sum of its first $5$ terms equals the sum of its first $8$ terms. <b>Which of the following are true?</b>",
      fr: "Une suite arithmétique a pour premier terme $a$ et raison $d\\ne0$. La somme de ses $5$ premiers termes égale celle de ses $8$ premiers. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una progresión aritmética tiene primer término $a$ y diferencia $d\\ne0$. La suma de sus $5$ primeros términos es igual a la de sus $8$ primeros. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "初項 $a$・公差 $d\\ne0$ の等差数列で、初めの $5$ 項の和と初めの $8$ 項の和が等しい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "等差数列首项 $a$、公差 $d\\ne0$，前 $5$ 项和等于前 $8$ 项和。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Eight bars, the last three summing to zero.",
      fr: "Huit barres, les trois dernières de somme nulle.",
      es: "Ocho barras, las tres últimas suman cero.",
      ja: "8本の棒、最後の3本の和が 0。",
      zh: "八根条形，后三根之和为零。"
    },
    hint: {
      en: "The 6th, 7th and 8th terms add to $0$, so the 7th term is $0$.",
      fr: "Les 6e, 7e et 8e termes ont pour somme $0$, donc le 7e est nul.",
      es: "Los términos 6.º, 7.º y 8.º suman $0$, así que el 7.º es $0$.",
      ja: "第6〜8項の和が $0$、よって第7項が $0$。",
      zh: "第 6、7、8 项之和为 $0$，故第 7 项为 $0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.4, scale: 46, pad: 16 });
      F.seg([0.2, 1.2], [4.8, 1.2], 'axis');
      for (let n = 1; n <= 8; n++) { const v = 7 - n; F.rect(0.1 + n * 0.55, v >= 0 ? 1.2 : 1.2 + v * 0.18, 0.4, Math.abs(v) * 0.18 + 0.001, n <= 5 ? 'fill-blue' : 'fill-yellow', 'fills'); }
      F.reveal = () => {
      F.text([0.3 + 7 * 0.55, 1.45], '0', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "the 7th term is": {"fr": "le 7e terme vaut", "es": "el 7.º término es", "ja": "第7項は", "zh": "第 7 项为"},
      "the 6th term is": {"fr": "le 6e terme vaut", "es": "el 6.º término es", "ja": "第6項は", "zh": "第 6 项为"}
    },
    options: [
      { tex: "a=-6d", correct: true, why: {
        en: "$a+6d=0$",
        fr: "$a+6d=0$",
        es: "$a+6d=0$",
        ja: "$a+6d=0$",
        zh: "$a+6d=0$"
      } },
      { tex: "\\text{the 7th term is}\\ 0", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "a=6d", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "a=-\\tfrac{13}2d", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=-7d", correct: false, why: {
        en: "Takes the 8th term as zero.",
        fr: "Prend le 8e terme nul.",
        es: "Toma el 8.º término como cero.",
        ja: "第8項を 0 とした。",
        zh: "把第 8 项当作零。"
      } },
      { tex: "a=-5d", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=-\\tfrac{11}2d", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the 6th term is}\\ 0", correct: false, why: {
        en: "$a+5d=d\\ne0$",
        fr: "$a+5d=d\\ne0$",
        es: "$a+5d=d\\ne0$",
        ja: "$a+5d=d\\ne0$",
        zh: "$a+5d=d\\ne0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equal sums",
          fr: "Sommes égales",
          es: "Sumas iguales",
          ja: "和が等しい",
          zh: "和相等"
        },
        lines: ["5(2a+4d)=8(2a+7d)\\Rightarrow-6a=36d"],
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
          en: "Conclude",
          fr: "Conclure",
          es: "Concluir",
          ja: "結論",
          zh: "结论"
        },
        lines: ["a=-6d,\\ a+6d=0"],
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
