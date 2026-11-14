/* algebra · A series weighted by the number of digits
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023b-series-by-digits",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question E",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question E",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta E",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 E",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 E 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A series weighted by the number of digits",
      fr: "Une série pondérée par le nombre de chiffres",
      es: "Una serie ponderada por el número de cifras",
      ja: "桁数で重みをつけた級数",
      zh: "按位数加权的级数"
    },
    statement: {
      en: "For a positive integer $n$ let $d(n)$ be its number of decimal digits, and $s_n=\\left(\\tfrac1{20}\\right)^{d(n)}$. <b>Which of the following are true</b> about $\\displaystyle\\sum_{n=1}^\\infty s_n$?",
      fr: "Pour un entier $n>0$, soit $d(n)$ son nombre de chiffres en base dix et $s_n=\\left(\\tfrac1{20}\\right)^{d(n)}$. <b>Lesquelles des affirmations suivantes sont vraies</b> sur $\\displaystyle\\sum_{n=1}^\\infty s_n$ ?",
      es: "Para un entero positivo $n$ sea $d(n)$ su número de cifras decimales y $s_n=\\left(\\tfrac1{20}\\right)^{d(n)}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre $\\displaystyle\\sum_{n=1}^\\infty s_n$?",
      ja: "正の整数 $n$ の10進法の桁数を $d(n)$、$s_n=\\left(\\tfrac1{20}\\right)^{d(n)}$ とします。$\\displaystyle\\sum_{n=1}^\\infty s_n$ について<b>正しいものはどれですか？</b>",
      zh: "对正整数 $n$，设 $d(n)$ 为其十进制位数，$s_n=\\left(\\tfrac1{20}\\right)^{d(n)}$。关于 $\\displaystyle\\sum_{n=1}^\\infty s_n$，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Blocks of 9, 90, 900 numbers with 1, 2, 3 digits.",
      fr: "Des blocs de 9, 90, 900 nombres à 1, 2, 3 chiffres.",
      es: "Bloques de 9, 90, 900 números con 1, 2, 3 cifras.",
      ja: "1桁9個、2桁90個、3桁900個のブロック。",
      zh: "1 位 9 个、2 位 90 个、3 位 900 个的块。"
    },
    hint: {
      en: "There are $9\\cdot10^{d-1}$ numbers with $d$ digits; group the series by $d$.",
      fr: "Il y a $9\\cdot10^{d-1}$ nombres à $d$ chiffres ; regroupez par $d$.",
      es: "Hay $9\\cdot10^{d-1}$ números de $d$ cifras; agrupa por $d$.",
      ja: "$d$ 桁の数は $9\\cdot10^{d-1}$ 個。$d$ ごとにまとめる。",
      zh: "$d$ 位数有 $9\\cdot10^{d-1}$ 个，按 $d$ 分组。"
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
      [['9 × 1/20', 1.0], ['90 × 1/400', 2.0], ['900 × 1/8000', 3.0]].forEach(([t, w], k) => { const x = [0.2, 1.5, 3.7][k]; F.rect(x, 0.5, w * 0.7 + 0.5, 0.7, 'fill-blue', 'fills'); F.text([x + (w * 0.7 + 0.5) / 2, 0.85], t, 'len small', 0, 0); });
      F.text([6.2, 0.85], '…', 'pt', 0, 0);
      F.reveal = () => {
      F.text([3.2, 1.55], '9/20 · (1 + 1/2 + 1/4 + …)', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "9 × 1/20": {"fr": "9 × 1/20", "es": "9 × 1/20", "ja": "9 × 1/20", "zh": "9 × 1/20"},
      "90 × 1/400": {"fr": "90 × 1/400", "es": "90 × 1/400", "ja": "90 × 1/400", "zh": "90 × 1/400"},
      "900 × 1/8000": {"fr": "900 × 1/8000", "es": "900 × 1/8000", "ja": "900 × 1/8000", "zh": "900 × 1/8000"},
      "9/20 · (1 + 1/2 + 1/4 + …)": {"fr": "9/20 · (1 + 1/2 + 1/4 + …)", "es": "9/20 · (1 + 1/2 + 1/4 + …)", "ja": "9/20 · (1 + 1/2 + 1/4 + …)", "zh": "9/20 · (1 + 1/2 + 1/4 + …)"},
      "the series diverges": {"fr": "la série diverge", "es": "la serie diverge", "ja": "級数は発散する", "zh": "级数发散"}
    },
    options: [
      { tex: "\\tfrac{9}{10}", correct: true, why: {
        en: "$\\tfrac{9/20}{1-1/2}$",
        fr: "$\\tfrac{9/20}{1-1/2}$",
        es: "$\\tfrac{9/20}{1-1/2}$",
        ja: "$\\tfrac{9/20}{1-1/2}$",
        zh: "$\\tfrac{9/20}{1-1/2}$"
      } },
      { tex: "\\sum_{d(n)=d}s_n=\\tfrac{9}{20}\\cdot2^{1-d}", correct: true, why: {
        en: "$\\tfrac{9\\cdot10^{d-1}}{20^d}=\\tfrac{9}{20}\\left(\\tfrac12\\right)^{d-1}$",
        fr: "$\\tfrac{9\\cdot10^{d-1}}{20^d}=\\tfrac{9}{20}\\left(\\tfrac12\\right)^{d-1}$",
        es: "$\\tfrac{9\\cdot10^{d-1}}{20^d}=\\tfrac{9}{20}\\left(\\tfrac12\\right)^{d-1}$",
        ja: "$\\tfrac{9\\cdot10^{d-1}}{20^d}=\\tfrac{9}{20}\\left(\\tfrac12\\right)^{d-1}$",
        zh: "$\\tfrac{9\\cdot10^{d-1}}{20^d}=\\tfrac{9}{20}\\left(\\tfrac12\\right)^{d-1}$"
      } },
      { tex: "1", correct: false, why: {
        en: "Starts the count at $n=0$ or uses $10^d$ numbers per block.",
        fr: "Compte à partir de $n=0$ ou prend $10^d$ nombres par bloc.",
        es: "Cuenta desde $n=0$ o toma $10^d$ números por bloque.",
        ja: "$n=0$ から数えるか、各ブロックを $10^d$ 個とした。",
        zh: "从 $n=0$ 开始数，或每块取 $10^d$ 个。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac45", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac95", correct: false, why: {
        en: "Ratio taken as $\\tfrac34$ instead of $\\tfrac12$.",
        fr: "Raison prise égale à $\\tfrac34$ au lieu de $\\tfrac12$.",
        es: "Razón tomada $\\tfrac34$ en vez de $\\tfrac12$.",
        ja: "公比を $\\tfrac12$ でなく $\\tfrac34$ とした。",
        zh: "公比误取 $\\tfrac34$。"
      } },
      { tex: "\\text{the series diverges}", correct: false, why: {
        en: "The block sums halve each time.",
        fr: "Les sommes par bloc sont divisées par deux à chaque fois.",
        es: "Las sumas por bloque se reducen a la mitad.",
        ja: "ブロックの和は毎回半分になる。",
        zh: "每块之和逐次减半。"
      } },
      { tex: "\\tfrac{9}{19}", correct: false, why: {
        en: "That is $\\sum 9\\cdot(1/20)^d$, ignoring how many numbers share $d$ digits.",
        fr: "C’est $\\sum 9\\cdot(1/20)^d$, en oubliant combien de nombres ont $d$ chiffres.",
        es: "Es $\\sum 9\\cdot(1/20)^d$, olvidando cuántos números tienen $d$ cifras.",
        ja: "$d$ 桁の数の個数を無視した $\\sum9\\cdot(1/20)^d$。",
        zh: "忽略了 $d$ 位数的个数，算成 $\\sum9\\cdot(1/20)^d$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Group by digits",
          fr: "Regrouper par chiffres",
          es: "Agrupar por cifras",
          ja: "桁ごとにまとめる",
          zh: "按位数分组"
        },
        lines: ["\\sum_{n}s_n=\\sum_{d\\ge1}9\\cdot10^{d-1}\\cdot20^{-d}=\\tfrac{9}{20}\\sum_{d\\ge1}\\left(\\tfrac12\\right)^{d-1}"],
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
          en: "Geometric series",
          fr: "Série géométrique",
          es: "Serie geométrica",
          ja: "等比級数",
          zh: "等比级数"
        },
        lines: ["\\tfrac{9}{20}\\cdot2=\\tfrac{9}{10}"],
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
