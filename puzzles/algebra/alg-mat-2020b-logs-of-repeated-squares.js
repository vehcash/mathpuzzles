/* algebra · Logs of a sequence that keeps squaring
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2020b-logs-of-repeated-squares",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question H",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question H",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta H",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 H",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 H 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Logs of a sequence that keeps squaring",
      fr: "Logarithmes d’une suite qu’on élève au carré",
      es: "Logaritmos de una sucesión que se eleva al cuadrado",
      ja: "2乗を繰り返す数列の対数",
      zh: "不断平方的数列的对数"
    },
    statement: {
      en: "Let $a_0=A>1$ and $a_k=a_{k-1}^2$ for $k\\ge1$. Put $b_n=\\log_2a_n$. <b>Which of the following are true?</b>",
      fr: "Soit $a_0=A>1$ et $a_k=a_{k-1}^2$ pour $k\\ge1$. On pose $b_n=\\log_2a_n$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $a_0=A>1$ y $a_k=a_{k-1}^2$ para $k\\ge1$. Sea $b_n=\\log_2a_n$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a_0=A>1$、$k\\ge1$ で $a_k=a_{k-1}^2$ とし、$b_n=\\log_2a_n$ とおきます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a_0=A>1$，$k\\ge1$ 时 $a_k=a_{k-1}^2$，令 $b_n=\\log_2a_n$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The first terms A, A², A⁴, A⁸ and their logs.",
      fr: "Les premiers termes A, A², A⁴, A⁸ et leurs logarithmes.",
      es: "Los primeros términos A, A², A⁴, A⁸ y sus logaritmos.",
      ja: "最初の項 A, A², A⁴, A⁸ とその対数。",
      zh: "前几项 A、A²、A⁴、A⁸ 及其对数。"
    },
    hint: {
      en: "$a_n=A^{2^n}$.",
      fr: "$a_n=A^{2^n}$.",
      es: "$a_n=A^{2^n}$.",
      ja: "$a_n=A^{2^n}$。",
      zh: "$a_n=A^{2^n}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 48, pad: 16 });
      ['A', 'A²', 'A⁴', 'A⁸'].forEach((t, k) => { F.rect(0.3 + k * 1.4, 0.8, 1.2, 0.7, 'fill-blue', 'fills'); F.text([0.9 + k * 1.4, 1.15], t, 'pt', 0, 0); });
      F.reveal = () => {
      ['L', '2L', '4L', '8L'].forEach((t, k) => F.text([0.9 + k * 1.4, 0.4], t, 'len small', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "A": {"fr": "A", "es": "A", "ja": "A", "zh": "A"},
      "A²": {"fr": "A²", "es": "A²", "ja": "A²", "zh": "A²"},
      "A⁴": {"fr": "A⁴", "es": "A⁴", "ja": "A⁴", "zh": "A⁴"},
      "A⁸": {"fr": "A⁸", "es": "A⁸", "ja": "A⁸", "zh": "A⁸"},
      "L": {"fr": "L", "es": "L", "ja": "L", "zh": "L"},
      "2L": {"fr": "2L", "es": "2L", "ja": "2L", "zh": "2L"},
      "4L": {"fr": "4L", "es": "4L", "ja": "4L", "zh": "4L"},
      "8L": {"fr": "8L", "es": "8L", "ja": "8L", "zh": "8L"},
      "is a geometric progression": {"fr": "est une suite géométrique", "es": "es una progresión geométrica", "ja": "は等比数列", "zh": "是等比数列"},
      "is an arithmetic progression": {"fr": "est une suite arithmétique", "es": "es una progresión aritmética", "ja": "は等差数列", "zh": "是等差数列"},
      "is constant": {"fr": "est constante", "es": "es constante", "ja": "は定数", "zh": "是常数"},
      "with ratio": {"fr": "de raison", "es": "de razón", "ja": "公比", "zh": "公比为"},
      "geometric": {"fr": "géométrique", "es": "geométrica", "ja": "等比", "zh": "等比"}
    },
    options: [
      { tex: "(b_n)\\ \\text{is a geometric progression}", correct: true, why: {
        en: "$b_n=2^n\\log_2A$",
        fr: "$b_n=2^n\\log_2A$",
        es: "$b_n=2^n\\log_2A$",
        ja: "$b_n=2^n\\log_2A$",
        zh: "$b_n=2^n\\log_2A$"
      } },
      { tex: "(b_n)\\ \\text{with ratio}\\ 2", correct: true, why: {
        en: "$b_{n+1}=\\log_2a_n^2=2b_n$",
        fr: "$b_{n+1}=\\log_2a_n^2=2b_n$",
        es: "$b_{n+1}=\\log_2a_n^2=2b_n$",
        ja: "$b_{n+1}=\\log_2a_n^2=2b_n$",
        zh: "$b_{n+1}=\\log_2a_n^2=2b_n$"
      } },
      { tex: "(b_n)\\ \\text{is an arithmetic progression}", correct: false, why: {
        en: "$b_1-b_0=L,\\ b_2-b_1=2L$",
        fr: "$b_1-b_0=L,\\ b_2-b_1=2L$",
        es: "$b_1-b_0=L,\\ b_2-b_1=2L$",
        ja: "$b_1-b_0=L,\\ b_2-b_1=2L$",
        zh: "$b_1-b_0=L,\\ b_2-b_1=2L$"
      } },
      { tex: "(b_n)\\ \\text{is constant}", correct: false, why: {
        en: "$A>1$ so $\\log_2A>0$ and $b_n$ doubles.",
        fr: "$A>1$ donc $\\log_2A>0$ et $b_n$ double.",
        es: "$A>1$ luego $\\log_2A>0$ y $b_n$ se duplica.",
        ja: "$A>1$ より $\\log_2A>0$ で $b_n$ は倍々。",
        zh: "$A>1$，$\\log_2A>0$，$b_n$ 每次加倍。"
      } },
      { tex: "b_n=n\\log_2A", correct: false, why: {
        en: "That would be $a_n=A^n$, not repeated squaring.",
        fr: "Ce serait $a_n=A^n$.",
        es: "Sería $a_n=A^n$.",
        ja: "それは $a_n=A^n$ の場合。",
        zh: "那是 $a_n=A^n$ 的情形。"
      } },
      { tex: "b_n=2n\\log_2A", correct: false, why: {
        en: "$b_3=8\\log_2A\\ne6\\log_2A$",
        fr: "$b_3=8\\log_2A\\ne6\\log_2A$",
        es: "$b_3=8\\log_2A\\ne6\\log_2A$",
        ja: "$b_3=8\\log_2A\\ne6\\log_2A$",
        zh: "$b_3=8\\log_2A\\ne6\\log_2A$"
      } },
      { tex: "(\\log_2b_n)\\ \\text{is constant}", correct: false, why: {
        en: "$\\log_2b_n=n+\\log_2\\log_2A$",
        fr: "$\\log_2b_n=n+\\log_2\\log_2A$",
        es: "$\\log_2b_n=n+\\log_2\\log_2A$",
        ja: "$\\log_2b_n=n+\\log_2\\log_2A$",
        zh: "$\\log_2b_n=n+\\log_2\\log_2A$"
      } },
      { tex: "b_n\\to0", correct: false, why: {
        en: "$b_n=2^n\\log_2A\\to\\infty$",
        fr: "$b_n=2^n\\log_2A\\to\\infty$",
        es: "$b_n=2^n\\log_2A\\to\\infty$",
        ja: "$b_n=2^n\\log_2A\\to\\infty$",
        zh: "$b_n=2^n\\log_2A\\to\\infty$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Closed form",
          fr: "Forme explicite",
          es: "Forma cerrada",
          ja: "一般項",
          zh: "通项"
        },
        lines: ["a_n=A^{2^n}\\Rightarrow b_n=2^n\\log_2A"],
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
          en: "Type",
          fr: "Nature",
          es: "Tipo",
          ja: "種類",
          zh: "类型"
        },
        lines: ["b_{n+1}=2b_n:\\ \\text{geometric}"],
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
