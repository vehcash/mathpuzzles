/* number · Swap the digits, change the base
   AMC 12B 2025 (Mathematical Association of America), Problem 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2025-swapped-digits-two-bases",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 4",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 4",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 4",
        ja: "AMC 12B 2025（アメリカ数学協会）第4問",
        zh: "AMC 12B 2025（美国数学协会）第 4 题"
      },
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Swap the digits, change the base",
      fr: "Échanger les chiffres, changer de base",
      es: "Cambiar las cifras y la base",
      ja: "桁を入れ替え、底を変える",
      zh: "交换数字，换个进制"
    },
    statement: {
      en: "A number is written $\\overline{ab}$ in base $7$ and $\\overline{ba}$ in base $9$, where $a,b$ are digits. <b>Which of the following are true?</b>",
      fr: "Un nombre s’écrit $\\overline{ab}$ en base $7$ et $\\overline{ba}$ en base $9$, où $a,b$ sont des chiffres. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un número se escribe $\\overline{ab}$ en base $7$ y $\\overline{ba}$ en base $9$, con $a,b$ cifras. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "ある数は $7$ 進法で $\\overline{ab}$、$9$ 進法で $\\overline{ba}$ と書けます（$a,b$ は数字）。<b>次のうち正しいものはどれですか？</b>",
      zh: "某数在七进制下写作 $\\overline{ab}$，在九进制下写作 $\\overline{ba}$（$a,b$ 为数字）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two two-digit cards, a b in base 7 and b a in base 9, joined by an equals sign.",
      fr: "Deux cartes à deux chiffres, a b en base 7 et b a en base 9, reliées par un signe égal.",
      es: "Dos tarjetas de dos cifras, a b en base 7 y b a en base 9, unidas por un signo igual.",
      ja: "7進法の a b と9進法の b a のカードを等号で結ぶ。",
      zh: "七进制 a b 与九进制 b a 两张卡片用等号相连。"
    },
    hint: {
      en: "$7a+b=9b+a$. Both digits must be valid in base $7$.",
      fr: "$7a+b=9b+a$. Les deux chiffres doivent être valides en base $7$.",
      es: "$7a+b=9b+a$. Ambas cifras deben ser válidas en base $7$.",
      ja: "$7a+b=9b+a$。どちらも7進法の数字。",
      zh: "$7a+b=9b+a$，两个数字都须是七进制数字。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.6, scale: 52, pad: 16 });
      F.rect(0.3, 0.4, 1.6, 0.8, 'fill-blue', 'fills'); F.text([1.1, 0.8], 'a b', 'pt', 0, 0); F.text([1.1, 0.4], '₇', 'len small', 0, 14);
      F.text([2.5, 0.8], '=', 'pt', 0, 0);
      F.rect(3.1, 0.4, 1.6, 0.8, 'fill-yellow', 'fills'); F.text([3.9, 0.8], 'b a', 'pt', 0, 0); F.text([3.9, 0.4], '₉', 'len small', 0, 14);
      F.reveal = () => {
      F.text([2.5, 1.45], '31', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the number is": {"fr": "le nombre est", "es": "el número es", "ja": "その数は", "zh": "该数为"},
      "a b": {"fr": "a b", "es": "a b", "ja": "a b", "zh": "a b"},
      "b a": {"fr": "b a", "es": "b a", "ja": "b a", "zh": "b a"},
      "₇": {"fr": "₇", "es": "₇", "ja": "₇", "zh": "₇"},
      "₉": {"fr": "₉", "es": "₉", "ja": "₉", "zh": "₉"},
      "=": {"fr": "=", "es": "=", "ja": "=", "zh": "="},
      "31": {"fr": "31", "es": "31", "ja": "31", "zh": "31"}
    },
    options: [
      { tex: "a+b=7", correct: true, why: {
        en: "$3a=4b,\\ a,b\\le6\\Rightarrow(a,b)=(4,3)$",
        fr: "$3a=4b,\\ a,b\\le6\\Rightarrow(a,b)=(4,3)$",
        es: "$3a=4b,\\ a,b\\le6\\Rightarrow(a,b)=(4,3)$",
        ja: "$3a=4b,\\ a,b\\le6\\Rightarrow(a,b)=(4,3)$",
        zh: "$3a=4b,\\ a,b\\le6\\Rightarrow(a,b)=(4,3)$"
      } },
      { tex: "\\text{the number is}\\ 31", correct: true, why: {
        en: "$7\\cdot4+3=31=9\\cdot3+4$",
        fr: "$7\\cdot4+3=31=9\\cdot3+4$",
        es: "$7\\cdot4+3=31=9\\cdot3+4$",
        ja: "$7\\cdot4+3=31=9\\cdot3+4$",
        zh: "$7\\cdot4+3=31=9\\cdot3+4$"
      } },
      { tex: "a+b=14", correct: false, why: {
        en: "$(8,6)$ also solves $3a=4b$, but $8$ is not a base-$7$ digit.",
        fr: "$(8,6)$ vérifie aussi $3a=4b$, mais $8$ n’est pas un chiffre en base $7$.",
        es: "$(8,6)$ también cumple $3a=4b$, pero $8$ no es cifra en base $7$.",
        ja: "$(8,6)$ も $3a=4b$ を満たすが $8$ は7進法の数字でない。",
        zh: "$(8,6)$ 也满足 $3a=4b$，但 $8$ 不是七进制数字。"
      } },
      { tex: "a+b=9", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=10", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a+b=11", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the number is}\\ 43", correct: false, why: {
        en: "That reads $43$ in base $10$, not the value of $\\overline{43}_7$.",
        fr: "C’est $43$ en base $10$, pas la valeur de $\\overline{43}_7$.",
        es: "Es $43$ en base $10$, no el valor de $\\overline{43}_7$.",
        ja: "10進法の $43$ で $\\overline{43}_7$ の値ではない。",
        zh: "那是十进制的 $43$，不是 $\\overline{43}_7$ 的值。"
      } },
      { tex: "a=b", correct: false, why: {
        en: "$a=b\\Rightarrow3a=4a\\Rightarrow a=0$",
        fr: "$a=b\\Rightarrow3a=4a\\Rightarrow a=0$",
        es: "$a=b\\Rightarrow3a=4a\\Rightarrow a=0$",
        ja: "$a=b\\Rightarrow3a=4a\\Rightarrow a=0$",
        zh: "$a=b\\Rightarrow3a=4a\\Rightarrow a=0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equate values",
          fr: "Égaler les valeurs",
          es: "Igualar valores",
          ja: "値を等しく",
          zh: "令值相等"
        },
        lines: ["7a+b=9b+a\\iff3a=4b"],
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
          en: "Digit limits",
          fr: "Contraintes sur les chiffres",
          es: "Límites de las cifras",
          ja: "数字の制約",
          zh: "数字限制"
        },
        lines: ["a=4k,\\ b=3k,\\ a\\le6\\Rightarrow k=1:\\ (4,3),\\ 31"],
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
