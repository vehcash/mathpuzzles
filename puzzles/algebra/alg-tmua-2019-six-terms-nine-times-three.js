/* algebra · Six terms sum to nine times three terms
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2019-six-terms-nine-times-three",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 5",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 5",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 5",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第5問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 5 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Six terms sum to nine times three terms",
      fr: "Six termes valent neuf fois trois termes",
      es: "Seis términos suman nueve veces tres",
      ja: "6項の和が3項の和の9倍",
      zh: "前六项和是前三项和的九倍"
    },
    statement: {
      en: "A geometric sequence has first term $a$ and common ratio $r\\ne1$. The sum of its first six terms is $9$ times the sum of its first three terms, and its seventh term is $360$. <b>Which of the following are true?</b>",
      fr: "Une suite géométrique a pour premier terme $a$ et raison $r\\ne1$. La somme des six premiers termes vaut $9$ fois celle des trois premiers, et le septième terme vaut $360$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una progresión geométrica tiene primer término $a$ y razón $r\\ne1$. La suma de sus seis primeros términos es $9$ veces la de los tres primeros, y su séptimo término es $360$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "初項 $a$・公比 $r\\ne1$ の等比数列で、初めの6項の和は初めの3項の和の $9$ 倍、第7項は $360$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "等比数列首项 $a$、公比 $r\\ne1$，前六项和是前三项和的 $9$ 倍，第七项为 $360$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two blocks of three terms.",
      fr: "Deux blocs de trois termes.",
      es: "Dos bloques de tres términos.",
      ja: "3項ずつの2ブロック。",
      zh: "两组各三项。"
    },
    hint: {
      en: "$S_6=S_3(1+r^3)$.",
      fr: "$S_6=S_3(1+r^3)$.",
      es: "$S_6=S_3(1+r^3)$.",
      ja: "$S_6=S_3(1+r^3)$。",
      zh: "$S_6=S_3(1+r^3)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.4, scale: 46, pad: 16 });
      for (let i = 0; i < 6; i++) F.rect(0.2 + i * 0.75, 0.4, 0.65, 0.6, i < 3 ? 'fill-blue' : 'fill-green', 'fills');
      F.reveal = () => {
      F.text([3.4, 1.25], '× r³ = 8', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "× r³ = 8": {"fr": "× r³ = 8", "es": "× r³ = 8", "ja": "× r³ = 8", "zh": "× r³ = 8"}
    },
    options: [
      { tex: "a=\\tfrac{45}8", correct: true, why: {
        en: "$\\tfrac{360}{2^6}$",
        fr: "$\\tfrac{360}{2^6}$",
        es: "$\\tfrac{360}{2^6}$",
        ja: "$\\tfrac{360}{2^6}$",
        zh: "$\\tfrac{360}{2^6}$"
      } },
      { tex: "r=2", correct: true, why: {
        en: "$1+r^3=9$",
        fr: "$1+r^3=9$",
        es: "$1+r^3=9$",
        ja: "$1+r^3=9$",
        zh: "$1+r^3=9$"
      } },
      { tex: "a=\\tfrac{45}4", correct: false, why: {
        en: "Uses $r^5$ instead of $r^6$.",
        fr: "Utilise $r^5$ au lieu de $r^6$.",
        es: "Usa $r^5$ en vez de $r^6$.",
        ja: "$r^6$ でなく $r^5$。",
        zh: "用了 $r^5$ 而非 $r^6$。"
      } },
      { tex: "a=\\tfrac{45}{16}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=40", correct: false, why: {
        en: "Takes $r^3=9$.",
        fr: "Prend $r^3=9$.",
        es: "Toma $r^3=9$.",
        ja: "$r^3=9$ とした。",
        zh: "取了 $r^3=9$。"
      } },
      { tex: "a=5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=\\tfrac{40}9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r=3", correct: false, why: {
        en: "$1+27\\ne9$",
        fr: "$1+27\\ne9$",
        es: "$1+27\\ne9$",
        ja: "$1+27\\ne9$",
        zh: "$1+27\\ne9$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Ratio",
          fr: "Raison",
          es: "Razón",
          ja: "公比",
          zh: "公比"
        },
        lines: ["S_6=S_3(1+r^3)=9S_3\\Rightarrow r^3=8,\\ r=2"],
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
          en: "Seventh term",
          fr: "Septième terme",
          es: "Séptimo término",
          ja: "第7項",
          zh: "第七项"
        },
        lines: ["ar^6=64a=360\\Rightarrow a=\\tfrac{45}8"],
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
