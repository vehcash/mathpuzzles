/* algebra · A geometric series hiding in an arithmetic one
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-geometric-inside-arithmetic",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 4",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 4",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 4",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第4問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 4 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "A geometric series hiding in an arithmetic one",
      fr: "Une suite géométrique cachée dans une arithmétique",
      es: "Una serie geométrica escondida en una aritmética",
      ja: "等差数列に隠れた等比数列",
      zh: "藏在等差数列里的等比数列"
    },
    statement: {
      en: "The first three terms $a,\\ ar,\\ ar^2$ of a convergent geometric series (with $r\\ne1$) are the first, fourth and sixth terms of an arithmetic sequence. The sum to infinity of the geometric series is $12$. <b>Which of the following are true?</b>",
      fr: "Les trois premiers termes $a,\\ ar,\\ ar^2$ d’une série géométrique convergente ($r\\ne1$) sont les premier, quatrième et sixième termes d’une suite arithmétique. La somme infinie de la série géométrique vaut $12$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los tres primeros términos $a,\\ ar,\\ ar^2$ de una serie geométrica convergente ($r\\ne1$) son el primero, cuarto y sexto términos de una progresión aritmética. La suma infinita de la serie geométrica es $12$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "収束する等比級数（$r\\ne1$）の初めの3項 $a,\\ ar,\\ ar^2$ は、ある等差数列の第1項・第4項・第6項です。等比級数の無限和は $12$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "收敛等比级数（$r\\ne1$）的前三项 $a,\\ ar,\\ ar^2$ 恰为某等差数列的第 1、4、6 项，该等比级数的和为 $12$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Six equally spaced dots; three of them are marked.",
      fr: "Six points équidistants ; trois sont marqués.",
      es: "Seis puntos equiespaciados; tres están marcados.",
      ja: "等間隔の6点のうち3点に印。",
      zh: "六个等距点，其中三个被标出。"
    },
    hint: {
      en: "$ar-a=3d$ and $ar^2-a=5d$, so $5(r-1)=3(r^2-1)$.",
      fr: "$ar-a=3d$ et $ar^2-a=5d$, donc $5(r-1)=3(r^2-1)$.",
      es: "$ar-a=3d$ y $ar^2-a=5d$, luego $5(r-1)=3(r^2-1)$.",
      ja: "$ar-a=3d$、$ar^2-a=5d$ より $5(r-1)=3(r^2-1)$。",
      zh: "$ar-a=3d$，$ar^2-a=5d$，故 $5(r-1)=3(r^2-1)$。"
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
      const S = ([x, y]) => [0.2 + (x - (0.5)) * 0.76667, 0.2 + (y - (-1)) * 0.70000];
      F.seg(S([0.5, 0]), S([6.5, 0]), 'axis'); 
      for (let k = 1; k <= 6; k++) { F.dot(S([k, 0])); F.text(S([k, 0]), String(k), 'tick', 0, 16); } [1, 4, 6].forEach(k => F.circle(S([k, 0]), 0.15, 'graph'));
      F.reveal = () => {
      F.text(S([1, 0]), 'a', 'len small', 0, -14); F.text(S([4, 0]), 'ar', 'len small', 0, -14); F.text(S([6, 0]), 'ar²', 'len small', 0, -14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "5": {"fr": "5", "es": "5", "ja": "5", "zh": "5"},
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "a": {"fr": "a", "es": "a", "ja": "a", "zh": "a"},
      "ar": {"fr": "ar", "es": "ar", "ja": "ar", "zh": "ar"},
      "ar²": {"fr": "ar²", "es": "ar²", "ja": "ar²", "zh": "ar²"},
      "the common difference is positive": {"fr": "la raison arithmétique est positive", "es": "la diferencia común es positiva", "ja": "公差は正", "zh": "公差为正"}
    },
    options: [
      { tex: "a=4", correct: true, why: {
        en: "$a=12(1-\\tfrac23)$",
        fr: "$a=12(1-\\tfrac23)$",
        es: "$a=12(1-\\tfrac23)$",
        ja: "$a=12(1-\\tfrac23)$",
        zh: "$a=12(1-\\tfrac23)$"
      } },
      { tex: "r=\\tfrac23", correct: true, why: {
        en: "$3(r+1)=5$",
        fr: "$3(r+1)=5$",
        es: "$3(r+1)=5$",
        ja: "$3(r+1)=5$",
        zh: "$3(r+1)=5$"
      } },
      { tex: "a=12", correct: false, why: {
        en: "That is the sum, not the first term.",
        fr: "C’est la somme, pas le premier terme.",
        es: "Es la suma, no el primer término.",
        ja: "それは和で初項ではない。",
        zh: "那是和，不是首项。"
      } },
      { tex: "a=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r=\\tfrac35", correct: false, why: {
        en: "Swaps the 3 and the 5.",
        fr: "Inverse 3 et 5.",
        es: "Intercambia 3 y 5.",
        ja: "3 と 5 を取り違え。",
        zh: "把 3 和 5 弄反了。"
      } },
      { tex: "\\text{the common difference is positive}", correct: false, why: {
        en: "$d=\\tfrac{a(r-1)}3=-\\tfrac49$",
        fr: "$d=\\tfrac{a(r-1)}3=-\\tfrac49$",
        es: "$d=\\tfrac{a(r-1)}3=-\\tfrac49$",
        ja: "$d=\\tfrac{a(r-1)}3=-\\tfrac49$",
        zh: "$d=\\tfrac{a(r-1)}3=-\\tfrac49$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Eliminate d",
          fr: "Éliminer d",
          es: "Eliminar d",
          ja: "d を消去",
          zh: "消去 d"
        },
        lines: ["5(r-1)=3(r-1)(r+1)\\Rightarrow r=\\tfrac23\\ (r\\ne1)"],
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
          en: "Sum to infinity",
          fr: "Somme infinie",
          es: "Suma infinita",
          ja: "無限和",
          zh: "无穷和"
        },
        lines: ["\\dfrac a{1-\\tfrac23}=12\\Rightarrow a=4"],
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
