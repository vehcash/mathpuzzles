/* algebra · Terms 21–30 of a geometric series versus terms 1–10
   TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2022-geometric-block-ratio",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2022 (Test of Mathematics for University Admission, UK), Paper 1, Question 8",
        fr: "TMUA 2022 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 8",
        es: "TMUA 2022 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 8",
        ja: "イギリス大学入学数学試験 TMUA 2022 Paper 1 第8問",
        zh: "英国大学入学数学测试 TMUA 2022 试卷 1 第 8 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Terms 21–30 of a geometric series versus terms 1–10",
      fr: "Termes 21 à 30 d’une suite géométrique contre termes 1 à 10",
      es: "Términos 21–30 de una serie geométrica frente a los términos 1–10",
      ja: "等比数列の第21〜30項と第1〜10項",
      zh: "等比数列第 21–30 项与第 1–10 项"
    },
    statement: {
      en: "A geometric series has first term $a$ and common ratio $r$, where $a$ and $r$ are positive integers and $r>1$. Let $S_n$ be the sum of its first $n$ terms, and suppose $S_{30}-S_{20}=k\\,S_{10}$. <b>Which of the following are true?</b>",
      fr: "Une suite géométrique a pour premier terme $a$ et raison $r$, entiers strictement positifs avec $r>1$. Soit $S_n$ la somme des $n$ premiers termes, et supposons $S_{30}-S_{20}=k\\,S_{10}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una serie geométrica tiene primer término $a$ y razón $r$, enteros positivos con $r>1$. Sea $S_n$ la suma de sus $n$ primeros términos, y supón $S_{30}-S_{20}=k\\,S_{10}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "初項 $a$、公比 $r$（正の整数、$r>1$）の等比数列の初めの $n$ 項の和を $S_n$ とし、$S_{30}-S_{20}=k\\,S_{10}$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "等比数列首项 $a$、公比 $r$ 均为正整数且 $r>1$，前 $n$ 项和为 $S_n$，且 $S_{30}-S_{20}=k\\,S_{10}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Thirty terms in three blocks of ten.",
      fr: "Trente termes en trois blocs de dix.",
      es: "Treinta términos en tres bloques de diez.",
      ja: "10項ずつ3ブロックの30項。",
      zh: "三十项分成三组各十项。"
    },
    hint: {
      en: "Each term of the third block is $r^{20}$ times the matching term of the first block.",
      fr: "Chaque terme du troisième bloc vaut $r^{20}$ fois le terme correspondant du premier.",
      es: "Cada término del tercer bloque es $r^{20}$ veces el correspondiente del primero.",
      ja: "第3ブロックの各項は第1ブロックの対応する項の $r^{20}$ 倍。",
      zh: "第三组每项是第一组对应项的 $r^{20}$ 倍。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 46, pad: 16 });
      const cls = ['fill-blue', 'fill-green', 'fill-yellow'];
      for (let b = 0; b < 3; b++) for (let i = 0; i < 10; i++) F.rect(0.1 + b * 2.1 + i * 0.2, 0.5, 0.17, 0.5, cls[b], 'fills');
      F.text([1.1, 0.25], 'S₁₀', 'len small', 0, 0); F.text([5.3, 0.25], 'S₃₀ − S₂₀', 'len small', 0, 0);
      F.reveal = () => {
      F.text([3.2, 1.35], '× r²⁰', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "S₁₀": {"fr": "S₁₀", "es": "S₁₀", "ja": "S₁₀", "zh": "S₁₀"},
      "S₃₀ − S₂₀": {"fr": "S₃₀ − S₂₀", "es": "S₃₀ − S₂₀", "ja": "S₃₀ − S₂₀", "zh": "S₃₀ − S₂₀"},
      "× r²⁰": {"fr": "× r²⁰", "es": "× r²⁰", "ja": "× r²⁰", "zh": "× r²⁰"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "はあり得る", "zh": "是可能的"},
      "depends on": {"fr": "dépend de", "es": "depende de", "ja": "は次に依存：", "zh": "依赖于"}
    },
    options: [
      { tex: "k=r^{20}", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "k=2^{20}\\ \\text{is possible}", correct: true, why: {
        en: "$r=2$",
        fr: "$r=2$",
        es: "$r=2$",
        ja: "$r=2$",
        zh: "$r=2$"
      } },
      { tex: "k=2^{10}\\ \\text{is possible}", correct: false, why: {
        en: "It would need $r=\\sqrt2$, not an integer.",
        fr: "Il faudrait $r=\\sqrt2$, non entier.",
        es: "Haría falta $r=\\sqrt2$, no entero.",
        ja: "$r=\\sqrt2$ が必要で整数でない。",
        zh: "需要 $r=\\sqrt2$，不是整数。"
      } },
      { tex: "k=2^{30}\\ \\text{is possible}", correct: false, why: {
        en: "$r=2^{3/2}\\notin\\mathbb Z$",
        fr: "$r=2^{3/2}\\notin\\mathbb Z$",
        es: "$r=2^{3/2}\\notin\\mathbb Z$",
        ja: "$r=2^{3/2}\\notin\\mathbb Z$",
        zh: "$r=2^{3/2}\\notin\\mathbb Z$"
      } },
      { tex: "k=r^{10}", correct: false, why: {
        en: "That compares terms 11–20 with 1–10.",
        fr: "Cela compare les termes 11–20 aux termes 1–10.",
        es: "Eso compara los términos 11–20 con 1–10.",
        ja: "それは第11〜20項と第1〜10項の比。",
        zh: "那是第 11–20 项与第 1–10 项之比。"
      } },
      { tex: "k\\ \\text{depends on}\\ a", correct: false, why: {
        en: "The factor $a$ cancels.",
        fr: "Le facteur $a$ se simplifie.",
        es: "El factor $a$ se cancela.",
        ja: "$a$ は約分で消える。",
        zh: "$a$ 被约去。"
      } },
      { tex: "k=\\dfrac{10^{10}}{2^{10}-1}\\ \\text{is possible}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=2^{10}(2^{10}-1)\\ \\text{is possible}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor the third block",
          fr: "Factoriser le troisième bloc",
          es: "Factorizar el tercer bloque",
          ja: "第3ブロックをくくる",
          zh: "提取第三组"
        },
        lines: ["S_{30}-S_{20}=ar^{20}(1+r+\\dots+r^9)=r^{20}S_{10}"],
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
          en: "Integer ratio",
          fr: "Raison entière",
          es: "Razón entera",
          ja: "整数の公比",
          zh: "整数公比"
        },
        lines: ["k=r^{20},\\ r\\in\\{2,3,\\dots\\}\\Rightarrow k=2^{20},3^{20},\\dots"],
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
