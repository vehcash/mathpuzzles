/* number · When is n⁴ + 4 prime?
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2022-n4-plus-4-prime",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2022 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "When is n⁴ + 4 prime?",
      fr: "Quand n⁴ + 4 est-il premier ?",
      es: "¿Cuándo es primo n⁴ + 4?",
      ja: "n⁴ + 4 が素数になるのは？",
      zh: "n⁴ + 4 何时为素数？"
    },
    statement: {
      en: "Note that $n^4+1=(n^2+\\sqrt2\\,n+1)(n^2-\\sqrt2\\,n+1)$. <b>Which of the following are true</b> about the numbers $n^4+4$ for positive whole numbers $n$?",
      fr: "On remarque que $n^4+1=(n^2+\\sqrt2\\,n+1)(n^2-\\sqrt2\\,n+1)$. <b>Lesquelles des affirmations suivantes sont vraies</b> sur les nombres $n^4+4$, $n$ entier strictement positif ?",
      es: "Observa que $n^4+1=(n^2+\\sqrt2\\,n+1)(n^2-\\sqrt2\\,n+1)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre los números $n^4+4$ con $n$ entero positivo?",
      ja: "$n^4+1=(n^2+\\sqrt2\\,n+1)(n^2-\\sqrt2\\,n+1)$ に注意します。正の整数 $n$ に対する $n^4+4$ について<b>正しいものはどれですか？</b>",
      zh: "注意 $n^4+1=(n^2+\\sqrt2\\,n+1)(n^2-\\sqrt2\\,n+1)$。关于正整数 $n$ 的 $n^4+4$，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The values n⁴ + 4 for n = 1, 2, 3, 4, 5.",
      fr: "Les valeurs de n⁴ + 4 pour n = 1, 2, 3, 4, 5.",
      es: "Los valores de n⁴ + 4 para n = 1, 2, 3, 4, 5.",
      ja: "n = 1〜5 の n⁴ + 4 の値。",
      zh: "n = 1 到 5 时 n⁴ + 4 的值。"
    },
    hint: {
      en: "Imitate the identity: $n^4+4=(n^2+2)^2-(2n)^2$.",
      fr: "Imitez l’identité : $n^4+4=(n^2+2)^2-(2n)^2$.",
      es: "Imita la identidad: $n^4+4=(n^2+2)^2-(2n)^2$.",
      ja: "同様に $n^4+4=(n^2+2)^2-(2n)^2$。",
      zh: "仿照：$n^4+4=(n^2+2)^2-(2n)^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.8, scale: 48, pad: 16 });
      [5, 20, 85, 260, 629].forEach((v, k) => { F.rect(0.2 + k * 1.3, 0.4, 1.1, 0.8, 'fill-blue', 'fills'); F.text([0.75 + k * 1.3, 0.8], String(v), 'pt', 0, 0); F.text([0.75 + k * 1.3, 0.4], 'n=' + (k + 1), 'tick', 0, 14); });
      F.reveal = () => {
      F.rect(0.2, 0.4, 1.1, 0.8, 'fill-yellow', 'fills'); F.text([3.35, 1.4], '85 = 5·17   629 = 17·37', 'len small', 0, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "85 = 5·17   629 = 17·37": {"fr": "85 = 5·17   629 = 17·37", "es": "85 = 5·17   629 = 17·37", "ja": "85 = 5·17   629 = 17·37", "zh": "85 = 5·17   629 = 17·37"},
      "exactly one": {"fr": "exactement un", "es": "exactamente un", "ja": "ちょうど1つの", "zh": "恰有一个"},
      "gives a prime": {"fr": "donne un nombre premier", "es": "da un primo", "ja": "で素数", "zh": "给出素数"},
      "it is never prime": {"fr": "il n’est jamais premier", "es": "nunca es primo", "ja": "素数になることはない", "zh": "永远不是素数"},
      "exactly two": {"fr": "exactement deux", "es": "exactamente dos", "ja": "ちょうど2つの", "zh": "恰有两个"},
      "give a prime": {"fr": "donnent un nombre premier", "es": "dan un primo", "ja": "で素数", "zh": "给出素数"},
      "is prime for every odd": {"fr": "est premier pour tout impair", "es": "es primo para todo impar", "ja": "はすべての奇数で素数", "zh": "对所有奇数都是素数"},
      "exactly three": {"fr": "exactement trois", "es": "exactamente tres", "ja": "ちょうど3つの", "zh": "恰有三个"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "not divisible by": {"fr": "non divisible par", "es": "no divisible entre", "ja": "で割り切れない", "zh": "不被整除于"},
      "is prime": {"fr": "est premier", "es": "es primo", "ja": "は素数", "zh": "是素数"}
    },
    options: [
      { tex: "\\text{exactly one}\\ n\\ \\text{gives a prime}", correct: true, why: {
        en: "Only $n=1$: $1^4+4=5$.",
        fr: "Seulement $n=1$ : $1^4+4=5$.",
        es: "Solo $n=1$: $1^4+4=5$.",
        ja: "$n=1$ のみ：$1^4+4=5$。",
        zh: "只有 $n=1$：$1^4+4=5$。"
      } },
      { tex: "n^4+4=(n^2+2n+2)(n^2-2n+2)", correct: true, why: {
        en: "Difference of two squares.",
        fr: "Différence de deux carrés.",
        es: "Diferencia de cuadrados.",
        ja: "2乗の差。",
        zh: "平方差。"
      } },
      { tex: "\\text{it is never prime}", correct: false, why: {
        en: "$n=1$ gives $5$.",
        fr: "$n=1$ donne $5$.",
        es: "$n=1$ da $5$.",
        ja: "$n=1$ で $5$。",
        zh: "$n=1$ 得 $5$。"
      } },
      { tex: "\\text{exactly two}\\ n\\ \\text{give a prime}", correct: false, why: {
        en: "For $n\\ge2$ the smaller factor $n^2-2n+2=(n-1)^2+1\\ge2$.",
        fr: "Pour $n\\ge2$ le petit facteur $(n-1)^2+1\\ge2$.",
        es: "Para $n\\ge2$ el factor menor $(n-1)^2+1\\ge2$.",
        ja: "$n\\ge2$ で小さい因数 $(n-1)^2+1\\ge2$。",
        zh: "$n\\ge2$ 时较小因子 $(n-1)^2+1\\ge2$。"
      } },
      { tex: "n^4+4\\ \\text{is prime for every odd}\\ n", correct: false, why: {
        en: "$3^4+4=85=5\\cdot17$",
        fr: "$3^4+4=85=5\\cdot17$",
        es: "$3^4+4=85=5\\cdot17$",
        ja: "$3^4+4=85=5\\cdot17$",
        zh: "$3^4+4=85=5\\cdot17$"
      } },
      { tex: "\\text{exactly three}\\ n\\ \\text{give a prime}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "5\\mid n^4+4\\ \\text{for every}\\ n", correct: false, why: {
        en: "True when $5\\nmid n$, but $n=5$ gives $629=17\\cdot37$.",
        fr: "Vrai si $5\\nmid n$, mais $n=5$ donne $629=17\\cdot37$.",
        es: "Cierto si $5\\nmid n$, pero $n=5$ da $629=17\\cdot37$.",
        ja: "$5\\nmid n$ なら正しいが、$n=5$ で $629=17\\cdot37$。",
        zh: "$5\\nmid n$ 时成立，但 $n=5$ 得 $629=17\\cdot37$。"
      } },
      { tex: "n^4+4=(n^2+2)^2+(2n)^2", correct: false, why: {
        en: "The cross term enters with a minus: $(n^2+2)^2-4n^2$.",
        fr: "Le terme croisé est retranché : $(n^2+2)^2-4n^2$.",
        es: "El término cruzado se resta: $(n^2+2)^2-4n^2$.",
        ja: "交差項は引く：$(n^2+2)^2-4n^2$。",
        zh: "交叉项应减去：$(n^2+2)^2-4n^2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["n^4+4=(n^2+2)^2-(2n)^2=(n^2-2n+2)(n^2+2n+2)"],
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
          en: "When is a factor 1?",
          fr: "Quand un facteur vaut-il 1 ?",
          es: "¿Cuándo vale 1 un factor?",
          ja: "因数が1になるのは",
          zh: "何时有因子为 1"
        },
        lines: ["n^2-2n+2=(n-1)^2+1=1\\iff n=1\\Rightarrow 5\\ \\text{is prime}"],
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
