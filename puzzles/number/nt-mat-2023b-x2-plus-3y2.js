/* number · Solutions of x² + 3y² = 4442
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023b-x2-plus-3y2",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question D",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question D",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta D",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 D",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Solutions of x² + 3y² = 4442",
      fr: "Solutions de x² + 3y² = 4442",
      es: "Soluciones de x² + 3y² = 4442",
      ja: "x² + 3y² = 4442 の解",
      zh: "x² + 3y² = 4442 的解"
    },
    statement: {
      en: "<b>Which of the following are true</b> about pairs of positive integers $(x,y)$ with $x^2+3y^2=4442$?",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies</b> sur les couples d’entiers strictement positifs $(x,y)$ tels que $x^2+3y^2=4442$ ?",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre los pares de enteros positivos $(x,y)$ con $x^2+3y^2=4442$?",
      ja: "$x^2+3y^2=4442$ を満たす正の整数の組 $(x,y)$ について<b>正しいものはどれですか？</b>",
      zh: "关于满足 $x^2+3y^2=4442$ 的正整数对 $(x,y)$，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The squares mod 3 in a small table: 0² ≡ 0, 1² ≡ 1, 2² ≡ 1.",
      fr: "Les carrés modulo 3 : 0² ≡ 0, 1² ≡ 1, 2² ≡ 1.",
      es: "Los cuadrados módulo 3: 0² ≡ 0, 1² ≡ 1, 2² ≡ 1.",
      ja: "3 を法とする平方：0² ≡ 0, 1² ≡ 1, 2² ≡ 1。",
      zh: "模 3 的平方：0² ≡ 0，1² ≡ 1，2² ≡ 1。"
    },
    hint: {
      en: "Reduce modulo $3$.",
      fr: "Réduisez modulo $3$.",
      es: "Reduce módulo $3$.",
      ja: "$3$ で割った余りを考える。",
      zh: "模 $3$ 考虑。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 1.8, scale: 48, pad: 16 });
      [['x', 'x² mod 3'], ['0', '0'], ['1', '1'], ['2', '1']].forEach(([a, b], k) => { F.rect(0.2 + k * 1.3, 0.9, 1.15, 0.6, k ? 'fill-blue' : 'fill-yellow', 'fills'); F.rect(0.2 + k * 1.3, 0.25, 1.15, 0.6, k ? 'fill-blue' : 'fill-yellow', 'fills'); F.text([0.78 + k * 1.3, 1.2], a, 'len small', 0, 0); F.text([0.78 + k * 1.3, 0.55], b, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([2.7, 1.65], '4442 ≡ 2 (mod 3)', 'len small', 0, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x² mod 3": {"fr": "x² mod 3", "es": "x² mód 3", "ja": "x² mod 3", "zh": "x² mod 3"},
      "4442 ≡ 2 (mod 3)": {"fr": "4442 ≡ 2 (mod 3)", "es": "4442 ≡ 2 (mód 3)", "ja": "4442 ≡ 2 (mod 3)", "zh": "4442 ≡ 2 (mod 3)"},
      "there are no such pairs": {"fr": "il n’y a aucun tel couple", "es": "no hay tales pares", "ja": "そのような組はない", "zh": "不存在这样的数对"},
      "exactly one pair": {"fr": "exactement un couple", "es": "exactamente un par", "ja": "ちょうど1組", "zh": "恰有一对"},
      "exactly two pairs": {"fr": "exactement deux couples", "es": "exactamente dos pares", "ja": "ちょうど2組", "zh": "恰有两对"},
      "exactly three pairs": {"fr": "exactement trois couples", "es": "exactamente tres pares", "ja": "ちょうど3組", "zh": "恰有三对"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "はありうる", "zh": "是可能的"},
      "there are 4442 pairs": {"fr": "il y a 4442 couples", "es": "hay 4442 pares", "ja": "4442 組ある", "zh": "有 4442 对"},
      "no solutions": {"fr": "aucune solution", "es": "sin soluciones", "ja": "解なし", "zh": "无解"}
    },
    options: [
      { tex: "\\text{there are no such pairs}", correct: true, why: {
        en: "The left side is $x^2\\equiv0$ or $1\\pmod3$, the right side is $2$.",
        fr: "Le membre de gauche vaut $0$ ou $1\\pmod3$, celui de droite $2$.",
        es: "El lado izquierdo es $0$ o $1\\pmod3$, el derecho $2$.",
        ja: "左辺は $3$ で割って $0$ か $1$、右辺は $2$。",
        zh: "左边模 $3$ 为 $0$ 或 $1$，右边为 $2$。"
      } },
      { tex: "4442\\equiv2\\pmod3", correct: true, why: {
        en: "$4+4+4+2=14\\equiv2$",
        fr: "$4+4+4+2=14\\equiv2$",
        es: "$4+4+4+2=14\\equiv2$",
        ja: "$4+4+4+2=14\\equiv2$",
        zh: "$4+4+4+2=14\\equiv2$"
      } },
      { tex: "\\text{exactly one pair}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{exactly two pairs}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{exactly three pairs}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x^2\\equiv2\\pmod3\\ \\text{is possible}", correct: false, why: {
        en: "$0^2,1^2,2^2\\equiv0,1,1$",
        fr: "$0^2,1^2,2^2\\equiv0,1,1$",
        es: "$0^2,1^2,2^2\\equiv0,1,1$",
        ja: "$0^2,1^2,2^2\\equiv0,1,1$",
        zh: "$0^2,1^2,2^2\\equiv0,1,1$"
      } },
      { tex: "(x,y)=(61,19)", correct: false, why: {
        en: "$3721+1083=4804$",
        fr: "$3721+1083=4804$",
        es: "$3721+1083=4804$",
        ja: "$3721+1083=4804$",
        zh: "$3721+1083=4804$"
      } },
      { tex: "\\text{there are 4442 pairs}", correct: false, why: {
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
          en: "Work mod 3",
          fr: "Travailler modulo 3",
          es: "Trabajar módulo 3",
          ja: "3 を法として",
          zh: "模 3"
        },
        lines: ["x^2+3y^2\\equiv x^2\\in\\{0,1\\}\\pmod3"],
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
          en: "Compare",
          fr: "Comparer",
          es: "Comparar",
          ja: "比べる",
          zh: "比较"
        },
        lines: ["4442\\equiv2\\pmod3\\Rightarrow \\text{no solutions}"],
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
