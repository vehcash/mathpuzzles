/* combinatorics · A coefficient in (x² + xy + y²)ⁿ
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2021b-trinomial-coefficient",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question B",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question B",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta B",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 B",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 B 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A coefficient in (x² + xy + y²)ⁿ",
      fr: "Un coefficient de (x² + xy + y²)ⁿ",
      es: "Un coeficiente de (x² + xy + y²)ⁿ",
      ja: "(x² + xy + y²)ⁿ の係数",
      zh: "(x² + xy + y²)ⁿ 的一个系数"
    },
    statement: {
      en: "Let $c_n$ be the coefficient of $x^3y^{2n-3}$ in the expansion of $(x^2+xy+y^2)^n$, for $n\\ge3$. <b>Which of the following are true?</b>",
      fr: "Soit $c_n$ le coefficient de $x^3y^{2n-3}$ dans le développement de $(x^2+xy+y^2)^n$, pour $n\\ge3$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $c_n$ el coeficiente de $x^3y^{2n-3}$ en el desarrollo de $(x^2+xy+y^2)^n$, para $n\\ge3$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$n\\ge3$ に対し、$(x^2+xy+y^2)^n$ の展開における $x^3y^{2n-3}$ の係数を $c_n$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对 $n\\ge3$，设 $c_n$ 为 $(x^2+xy+y^2)^n$ 展开式中 $x^3y^{2n-3}$ 的系数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "n brackets, each contributing x², xy or y².",
      fr: "n parenthèses, chacune apporte x², xy ou y².",
      es: "n paréntesis, cada uno aporta x², xy o y².",
      ja: "n 個のかっこから x², xy, y² のどれかを選ぶ。",
      zh: "n 个括号，每个贡献 x²、xy 或 y²。"
    },
    hint: {
      en: "Three powers of $x$ come either from three $xy$’s, or from one $x^2$ and one $xy$.",
      fr: "Trois puissances de $x$ viennent soit de trois $xy$, soit d’un $x^2$ et d’un $xy$.",
      es: "Tres potencias de $x$ salen de tres $xy$, o de un $x^2$ y un $xy$.",
      ja: "$x$ の3乗は $xy$ を3つ、または $x^2$ を1つと $xy$ を1つ。",
      zh: "$x^3$ 来自三个 $xy$，或一个 $x^2$ 加一个 $xy$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.8, scale: 46, pad: 16 });
      ['xy', 'xy', 'xy', 'y²', '…', 'y²'].forEach((t, k) => { F.rect(0.2 + k * 1.03, 0.5, 0.9, 0.7, k < 3 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([0.65 + k * 1.03, 0.85], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([3.2, 1.55], 'C(n,3) + n(n−1)', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "xy": {"fr": "xy", "es": "xy", "ja": "xy", "zh": "xy"},
      "C(n,3) + n(n−1)": {"fr": "C(n,3) + n(n−1)", "es": "C(n,3) + n(n−1)", "ja": "C(n,3) + n(n−1)", "zh": "C(n,3) + n(n−1)"}
    },
    options: [
      { tex: "c_n=\\binom n3+2\\binom n2", correct: true, why: {
        en: "$\\binom n3+n(n-1)$",
        fr: "$\\binom n3+n(n-1)$",
        es: "$\\binom n3+n(n-1)$",
        ja: "$\\binom n3+n(n-1)$",
        zh: "$\\binom n3+n(n-1)$"
      } },
      { tex: "c_4=16", correct: true, why: {
        en: "$4+12=16$",
        fr: "$4+12=16$",
        es: "$4+12=16$",
        ja: "$4+12=16$",
        zh: "$4+12=16$"
      } },
      { tex: "c_n=\\binom n3", correct: false, why: {
        en: "Misses the choice of one $x^2$ and one $xy$.",
        fr: "Oublie le choix d’un $x^2$ et d’un $xy$.",
        es: "Olvida elegir un $x^2$ y un $xy$.",
        ja: "$x^2$ 1つと $xy$ 1つの選び方を落としている。",
        zh: "漏了一个 $x^2$ 加一个 $xy$ 的取法。"
      } },
      { tex: "c_n=\\binom n3+\\binom n2", correct: false, why: {
        en: "The $x^2$ and the $xy$ come from different, ordered brackets: $n(n-1)=2\\binom n2$.",
        fr: "Le $x^2$ et le $xy$ viennent de parenthèses distinctes et ordonnées : $n(n-1)=2\\binom n2$.",
        es: "El $x^2$ y el $xy$ salen de paréntesis distintos y ordenados: $n(n-1)=2\\binom n2$.",
        ja: "$x^2$ と $xy$ は別のかっこで区別される：$n(n-1)=2\\binom n2$。",
        zh: "$x^2$ 与 $xy$ 来自不同括号且有区别：$n(n-1)=2\\binom n2$。"
      } },
      { tex: "c_n=\\binom n3\\binom n2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c_n=2\\binom n2", correct: false, why: {
        en: "Misses three $xy$’s.",
        fr: "Oublie trois $xy$.",
        es: "Olvida tres $xy$.",
        ja: "$xy$ 3つの場合を落としている。",
        zh: "漏了三个 $xy$ 的情形。"
      } },
      { tex: "c_3=1", correct: false, why: {
        en: "$c_3=1+6=7$",
        fr: "$c_3=1+6=7$",
        es: "$c_3=1+6=7$",
        ja: "$c_3=1+6=7$",
        zh: "$c_3=1+6=7$"
      } },
      { tex: "c_n=3^n", correct: false, why: {
        en: "That is the sum of all coefficients.",
        fr: "C’est la somme de tous les coefficients.",
        es: "Es la suma de todos los coeficientes.",
        ja: "全係数の和。",
        zh: "那是所有系数之和。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Ways to get x³",
          fr: "Façons d’obtenir x³",
          es: "Formas de obtener x³",
          ja: "x³ の作り方",
          zh: "得到 x³ 的方法"
        },
        lines: ["xy,xy,xy:\\ \\binom n3\\qquad x^2,xy:\\ n(n-1)"],
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
          en: "Total",
          fr: "Total",
          es: "Total",
          ja: "合計",
          zh: "合计"
        },
        lines: ["c_n=\\binom n3+2\\binom n2"],
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
