/* number · The logarithm of 10!
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2020-log-of-factorial",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2020 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The logarithm of 10!",
      fr: "Le logarithme de 10!",
      es: "El logaritmo de 10!",
      ja: "10! の対数",
      zh: "10! 的对数"
    },
    statement: {
      en: "<b>Which of the following equal $\\log_{10}(10!)$?</b> (All logarithms are base $10$.)",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\log_{10}(10!)$ ?</b> (Tous les logarithmes sont en base $10$.)",
      es: "<b>¿Cuáles de las siguientes expresiones son iguales a $\\log_{10}(10!)$?</b> (Todos los logaritmos son en base $10$.)",
      ja: "<b>$\\log_{10}(10!)$ に等しいものはどれですか？</b>（対数はすべて底 $10$）",
      zh: "<b>下列哪些等于 $\\log_{10}(10!)$？</b>（所有对数都以 $10$ 为底）"
    },
    figureText: {
      en: "The prime factorisation 10! = 2⁸ · 3⁴ · 5² · 7 shown as a factor tree.",
      fr: "La décomposition 10! = 2⁸ · 3⁴ · 5² · 7 sous forme d’arbre de facteurs.",
      es: "La factorización 10! = 2⁸ · 3⁴ · 5² · 7 como árbol de factores.",
      ja: "素因数分解 10! = 2⁸ · 3⁴ · 5² · 7 の因数の木。",
      zh: "以因数树表示质因数分解 10! = 2⁸ · 3⁴ · 5² · 7。"
    },
    hint: {
      en: "Factor $10!$ into primes, then use $\\log5=1-\\log2$.",
      fr: "Décomposez $10!$ en facteurs premiers, puis utilisez $\\log5=1-\\log2$.",
      es: "Factoriza $10!$ en primos y usa $\\log5=1-\\log2$.",
      ja: "$10!$ を素因数分解し、$\\log5=1-\\log2$ を使う。",
      zh: "把 $10!$ 分解质因数，再用 $\\log5=1-\\log2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 2.4, scale: 50, pad: 14 });
      F.text([2.8, 2.0], '10! = 3 628 800', 'pt', 0, 0);
      [['2⁸', 0.7], ['3⁴', 2.1], ['5²', 3.5], ['7', 4.9]].forEach(([t, x]) => { F.seg([2.8, 1.75], [x, 0.85]); F.circle([x, 0.6], 0.3, 'fill-yellow'); F.text([x, 0.6], t, 'pt small', 0, 0); });
      return F;
    },
    options: [
      { tex: "2+6\\log2+4\\log3+\\log7", correct: true, why: {
        en: "$8\\log2+4\\log3+2(1-\\log2)+\\log7$.",
        fr: "$8\\log2+4\\log3+2(1-\\log2)+\\log7$.",
        es: "$8\\log2+4\\log3+2(1-\\log2)+\\log7$.",
        ja: "$8\\log2+4\\log3+2(1-\\log2)+\\log7$.",
        zh: "$8\\log2+4\\log3+2(1-\\log2)+\\log7$."
      } },
      { tex: "8\\log2+4\\log3+2\\log5+\\log7", correct: true, why: {
        en: "$10!=2^8\\cdot3^4\\cdot5^2\\cdot7$.",
        fr: "$10!=2^8\\cdot3^4\\cdot5^2\\cdot7$.",
        es: "$10!=2^8\\cdot3^4\\cdot5^2\\cdot7$.",
        ja: "$10!=2^8\\cdot3^4\\cdot5^2\\cdot7$.",
        zh: "$10!=2^8\\cdot3^4\\cdot5^2\\cdot7$."
      } },
      { tex: "1+7\\log2+4\\log3+\\log7", correct: false, why: {
        en: "Uses $\\log5=1-\\log2$ only once.",
        fr: "N’utilise $\\log5=1-\\log2$ qu’une fois.",
        es: "Usa $\\log5=1-\\log2$ solo una vez.",
        ja: "$\\log5=1-\\log2$ を1回しか使っていない。",
        zh: "$\\log5=1-\\log2$ 只用了一次。"
      } },
      { tex: "8\\log2+4\\log3+\\log7", correct: false, why: {
        en: "Drops the factor $5^2$.",
        fr: "Oublie le facteur $5^2$.",
        es: "Olvida el factor $5^2$.",
        ja: "$5^2$ を落とした。",
        zh: "漏了 $5^2$。"
      } },
      { tex: "2+8\\log2+4\\log3+\\log7", correct: false, why: {
        en: "Forgets that $\\log5$ brings $-2\\log2$.",
        fr: "Oublie que $\\log5$ apporte $-2\\log2$.",
        es: "Olvida que $\\log5$ aporta $-2\\log2$.",
        ja: "$\\log5$ による $-2\\log2$ を忘れた。",
        zh: "忘了 $\\log5$ 带来 $-2\\log2$。"
      } },
      { tex: "10", correct: false, why: {
        en: "$\\log(10^{10})$, not $\\log(10!)$; $10!\\approx3.6\\times10^6$.",
        fr: "$\\log(10^{10})$, pas $\\log(10!)$ ; $10!\\approx3{,}6\\times10^6$.",
        es: "$\\log(10^{10})$, no $\\log(10!)$; $10!\\approx3{,}6\\times10^6$.",
        ja: "$\\log(10^{10})$ で $\\log(10!)$ ではない。",
        zh: "那是 $\\log(10^{10})$；$10!\\approx3.6\\times10^6$。"
      } },
      { tex: "9\\log2+4\\log3+2\\log5+\\log7", correct: false, why: {
        en: "Counts nine factors of $2$; there are eight.",
        fr: "Compte neuf facteurs $2$ ; il y en a huit.",
        es: "Cuenta nueve factores $2$; hay ocho.",
        ja: "2 の因数は8個。",
        zh: "2 的因子是 8 个，不是 9 个。"
      } },
      { tex: "8\\log2+3\\log3+2\\log5+\\log7", correct: false, why: {
        en: "$3,6,9$ give $3^{1+1+2}=3^4$.",
        fr: "$3,6,9$ donnent $3^{1+1+2}=3^4$.",
        es: "$3,6,9$ dan $3^{1+1+2}=3^4$.",
        ja: "$3,6,9$ から $3^{1+1+2}=3^4$。",
        zh: "$3,6,9$ 给出 $3^{1+1+2}=3^4$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor 10!",
          fr: "Décomposer 10!",
          es: "Factorizar 10!",
          ja: "10! を分解",
          zh: "分解 10!"
        },
        lines: ["10!=2^{8}\\cdot3^{4}\\cdot5^{2}\\cdot7"],
        note: {
          en: "Powers of 2: $1+2+1+3+1=8$ (from 2, 4, 6, 8, 10).",
          fr: "Puissances de 2 : $1+2+1+3+1=8$ (de 2, 4, 6, 8, 10).",
          es: "Potencias de 2: $1+2+1+3+1=8$ (de 2, 4, 6, 8, 10).",
          ja: "2 の指数：$1+2+1+3+1=8$（2, 4, 6, 8, 10 から）。",
          zh: "2 的次数：$1+2+1+3+1=8$（来自 2、4、6、8、10）。"
        }
      },
      {
        title: {
          en: "Take logs",
          fr: "Prendre le log",
          es: "Tomar logaritmos",
          ja: "対数をとる",
          zh: "取对数"
        },
        lines: ["\\log10!=8\\log2+4\\log3+2\\log5+\\log7"],
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
          en: "Remove log 5",
          fr: "Éliminer log 5",
          es: "Eliminar log 5",
          ja: "log 5 を消す",
          zh: "消去 log 5"
        },
        lines: ["\\log5=1-\\log2\\;\\Rightarrow\\;\\log10!=2+6\\log2+4\\log3+\\log7"],
        note: {
          en: "Numerically both are about $6.56$.",
          fr: "Numériquement, les deux valent environ $6{,}56$.",
          es: "Numéricamente ambas valen unos $6{,}56$.",
          ja: "どちらも約 $6.56$。",
          zh: "数值上都约为 $6.56$。"
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
          en: "Two options are the same number written differently.",
          fr: "Deux options sont le même nombre écrit autrement.",
          es: "Dos opciones son el mismo número escrito distinto.",
          ja: "2つは同じ数の別の書き方。",
          zh: "有两个选项是同一个数的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
