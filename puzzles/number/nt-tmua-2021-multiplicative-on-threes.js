/* number · A function that only changes multiples of 3
   TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-tmua-2021-multiplicative-on-threes",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2021 (Test of Mathematics for University Admission, UK), Paper 1, Question 5",
        fr: "TMUA 2021 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 5",
        es: "TMUA 2021 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 5",
        ja: "イギリス大学入学数学試験 TMUA 2021 Paper 1 第5問",
        zh: "英国大学入学数学测试 TMUA 2021 试卷 1 第 5 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "A function that only changes multiples of 3",
      fr: "Une fonction qui ne change que les multiples de 3",
      es: "Una función que solo cambia los múltiplos de 3",
      ja: "3の倍数だけを変える関数",
      zh: "只改变 3 的倍数的函数"
    },
    statement: {
      en: "A function $f$ on the positive integers satisfies $f(3k)=f(3)\\,f(k)$ for all $k$, and $f(n)=n$ whenever $n$ is not a multiple of $3$. Also $f(9)+f(16)=f(24)$. <b>Which of the following are true?</b>",
      fr: "Une fonction $f$ sur les entiers positifs vérifie $f(3k)=f(3)\\,f(k)$ pour tout $k$, et $f(n)=n$ si $n$ n’est pas multiple de $3$. De plus $f(9)+f(16)=f(24)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una función $f$ en los enteros positivos cumple $f(3k)=f(3)\\,f(k)$ para todo $k$, y $f(n)=n$ si $n$ no es múltiplo de $3$. Además $f(9)+f(16)=f(24)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "正の整数上の関数 $f$ はすべての $k$ で $f(3k)=f(3)\\,f(k)$、$3$ の倍数でない $n$ では $f(n)=n$ を満たし、さらに $f(9)+f(16)=f(24)$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "正整数上的函数 $f$ 满足对所有 $k$ 有 $f(3k)=f(3)\\,f(k)$，当 $n$ 不是 $3$ 的倍数时 $f(n)=n$，且 $f(9)+f(16)=f(24)$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The numbers 9, 16 and 24 with their factors of 3.",
      fr: "Les nombres 9, 16 et 24 avec leurs facteurs 3.",
      es: "Los números 9, 16 y 24 con sus factores 3.",
      ja: "9, 16, 24 とその因数 3。",
      zh: "9、16、24 及其因数 3。"
    },
    hint: {
      en: "$f(9)=f(3)^2$, $f(16)=16$, $f(24)=f(3)\\,f(8)=8f(3)$.",
      fr: "$f(9)=f(3)^2$, $f(16)=16$, $f(24)=f(3)\\,f(8)=8f(3)$.",
      es: "$f(9)=f(3)^2$, $f(16)=16$, $f(24)=f(3)\\,f(8)=8f(3)$.",
      ja: "$f(9)=f(3)^2$、$f(16)=16$、$f(24)=f(3)\\,f(8)=8f(3)$。",
      zh: "$f(9)=f(3)^2$，$f(16)=16$，$f(24)=f(3)\\,f(8)=8f(3)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.6, scale: 46, pad: 16 });
      [['9 = 3·3', 0.9], ['16', 2.5], ['24 = 3·8', 4.1]].forEach(([s, x]) => F.text([x, 0.9], s, 'len small', 0, 0));
      F.reveal = () => {
      F.text([2.5, 0.3], 'f(3) = 4', 'len small pink', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "9 = 3·3": {"fr": "9 = 3·3", "es": "9 = 3·3", "ja": "9 = 3·3", "zh": "9 = 3·3"},
      "16": {"fr": "16", "es": "16", "ja": "16", "zh": "16"},
      "24 = 3·8": {"fr": "24 = 3·8", "es": "24 = 3·8", "ja": "24 = 3·8", "zh": "24 = 3·8"},
      "f(3) = 4": {"fr": "f(3) = 4", "es": "f(3) = 4", "ja": "f(3) = 4", "zh": "f(3) = 4"}
    },
    options: [
      { tex: "f(3)=4", correct: true, why: {
        en: "$(f(3)-4)^2=0$",
        fr: "$(f(3)-4)^2=0$",
        es: "$(f(3)-4)^2=0$",
        ja: "$(f(3)-4)^2=0$",
        zh: "$(f(3)-4)^2=0$"
      } },
      { tex: "f(27)=64", correct: true, why: {
        en: "$f(3)^3$",
        fr: "$f(3)^3$",
        es: "$f(3)^3$",
        ja: "$f(3)^3$",
        zh: "$f(3)^3$"
      } },
      { tex: "f(3)=3", correct: false, why: {
        en: "$9+16\\ne24$",
        fr: "$9+16\\ne24$",
        es: "$9+16\\ne24$",
        ja: "$9+16\\ne24$",
        zh: "$9+16\\ne24$"
      } },
      { tex: "f(3)=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(3)=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(3)=16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(9)=9", correct: false, why: {
        en: "$f(9)=16$",
        fr: "$f(9)=16$",
        es: "$f(9)=16$",
        ja: "$f(9)=16$",
        zh: "$f(9)=16$"
      } },
      { tex: "f(24)=24", correct: false, why: {
        en: "$f(24)=32$",
        fr: "$f(24)=32$",
        es: "$f(24)=32$",
        ja: "$f(24)=32$",
        zh: "$f(24)=32$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Express everything in f(3)",
          fr: "Tout exprimer avec f(3)",
          es: "Expresarlo todo con f(3)",
          ja: "f(3) で表す",
          zh: "用 f(3) 表示"
        },
        lines: ["f(3)^2+16=8f(3)"],
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
        lines: ["(f(3)-4)^2=0\\Rightarrow f(3)=4"],
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
