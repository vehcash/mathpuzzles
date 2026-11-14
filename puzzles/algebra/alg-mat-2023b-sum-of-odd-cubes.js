/* algebra · 1³ + 3³ + 5³ + … + 19³
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023b-sum-of-odd-cubes",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question C",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question C",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta C",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 C",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "1³ + 3³ + 5³ + … + 19³",
      fr: "1³ + 3³ + 5³ + … + 19³",
      es: "1³ + 3³ + 5³ + … + 19³",
      ja: "1³ + 3³ + 5³ + … + 19³",
      zh: "1³ + 3³ + 5³ + … + 19³"
    },
    statement: {
      en: "You may use $\\displaystyle\\sum_{k=1}^n k^3=\\tfrac14n^2(n+1)^2$. <b>Which of the following are true</b> about $S=1^3+3^3+5^3+\\dots+19^3$?",
      fr: "On admet $\\displaystyle\\sum_{k=1}^n k^3=\\tfrac14n^2(n+1)^2$. <b>Lesquelles des affirmations suivantes sont vraies</b> sur $S=1^3+3^3+5^3+\\dots+19^3$ ?",
      es: "Puedes usar $\\displaystyle\\sum_{k=1}^n k^3=\\tfrac14n^2(n+1)^2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre $S=1^3+3^3+5^3+\\dots+19^3$?",
      ja: "$\\displaystyle\\sum_{k=1}^n k^3=\\tfrac14n^2(n+1)^2$ を用いてよい。$S=1^3+3^3+5^3+\\dots+19^3$ について<b>正しいものはどれですか？</b>",
      zh: "可用 $\\displaystyle\\sum_{k=1}^n k^3=\\tfrac14n^2(n+1)^2$。关于 $S=1^3+3^3+5^3+\\dots+19^3$，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The cubes from 1 to 20 split into odd and even ones.",
      fr: "Les cubes de 1 à 20 séparés en impairs et pairs.",
      es: "Los cubos de 1 a 20 separados en impares y pares.",
      ja: "1〜20 の立方を奇数と偶数に分ける。",
      zh: "1 到 20 的立方分成奇偶两组。"
    },
    hint: {
      en: "All cubes up to $20^3$ minus the even ones; the even cubes are $8$ times the cubes up to $10^3$.",
      fr: "Tous les cubes jusqu’à $20^3$ moins les pairs ; les cubes pairs valent $8$ fois les cubes jusqu’à $10^3$.",
      es: "Todos los cubos hasta $20^3$ menos los pares; los cubos pares son $8$ veces los cubos hasta $10^3$.",
      ja: "$20^3$ までの全立方和から偶数分を引く。偶数の立方和は $10^3$ までの和の $8$ 倍。",
      zh: "到 $20^3$ 的全部立方和减去偶数部分；偶数立方和是到 $10^3$ 的 $8$ 倍。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.8, scale: 46, pad: 16 });
      for (let k = 1; k <= 20; k++) { const odd = k % 2 === 1; F.rect(0.1 + (k - 1) * 0.32, odd ? 0.9 : 0.3, 0.28, 0.5, odd ? 'fill-yellow' : 'fill-blue', 'fills'); }
      F.text([0.24, 1.15], '1', 'tick', 0, 0); F.text([6.18, 0.55], '20', 'tick', 0, 0);
      F.reveal = () => {
      F.text([3.3, 1.65], '44100 − 8·3025', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "44100 − 8·3025": {"fr": "44100 − 8·3025", "es": "44100 − 8·3025", "ja": "44100 − 8·3025", "zh": "44100 − 8·3025"},
      "with": {"fr": "avec", "es": "con", "ja": "で", "zh": "取"},
      "gives": {"fr": "donne", "es": "da", "ja": "とすると", "zh": "得"}
    },
    options: [
      { tex: "S=19\\,900", correct: true, why: {
        en: "$44\\,100-24\\,200$",
        fr: "$44\\,100-24\\,200$",
        es: "$44\\,100-24\\,200$",
        ja: "$44\\,100-24\\,200$",
        zh: "$44\\,100-24\\,200$"
      } },
      { tex: "S=\\tfrac14\\cdot20^2\\cdot21^2-8\\cdot\\tfrac14\\cdot10^2\\cdot11^2", correct: true, why: {
        en: "$\\sum_{1}^{20}k^3-\\sum_{1}^{10}(2k)^3$",
        fr: "$\\sum_{1}^{20}k^3-\\sum_{1}^{10}(2k)^3$",
        es: "$\\sum_{1}^{20}k^3-\\sum_{1}^{10}(2k)^3$",
        ja: "$\\sum_{1}^{20}k^3-\\sum_{1}^{10}(2k)^3$",
        zh: "$\\sum_{1}^{20}k^3-\\sum_{1}^{10}(2k)^3$"
      } },
      { tex: "S=20\\,000", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=19\\,800", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=20\\,100", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=22\\,050", correct: false, why: {
        en: "Half of $\\sum_1^{20}k^3$: odd and even cubes are not equal.",
        fr: "La moitié de $\\sum_1^{20}k^3$ : cubes pairs et impairs ne sont pas égaux.",
        es: "La mitad de $\\sum_1^{20}k^3$: los cubos pares e impares no son iguales.",
        ja: "$\\sum_1^{20}k^3$ の半分。奇数と偶数の和は等しくない。",
        zh: "$\\sum_1^{20}k^3$ 的一半，奇偶立方和并不相等。"
      } },
      { tex: "S=\\tfrac14\\cdot19^2\\cdot20^2-\\tfrac14\\cdot9^2\\cdot10^2", correct: false, why: {
        en: "Forgets that even cubes are $(2k)^3=8k^3$.",
        fr: "Oublie que les cubes pairs sont $(2k)^3=8k^3$.",
        es: "Olvida que los cubos pares son $(2k)^3=8k^3$.",
        ja: "偶数の立方が $(2k)^3=8k^3$ であることを忘れている。",
        zh: "忘了偶数立方是 $(2k)^3=8k^3$。"
      } },
      { tex: "S=n^2(2n^2-1)\\ \\text{with}\\ n=10\\ \\text{gives}\\ 20\\,000", correct: false, why: {
        en: "$100\\cdot199=19\\,900$",
        fr: "$100\\cdot199=19\\,900$",
        es: "$100\\cdot199=19\\,900$",
        ja: "$100\\cdot199=19\\,900$",
        zh: "$100\\cdot199=19\\,900$"
      } }
    ],
    steps: [
      {
        title: {
          en: "All cubes up to 20",
          fr: "Tous les cubes jusqu’à 20",
          es: "Todos los cubos hasta 20",
          ja: "20 までの全立方",
          zh: "到 20 的全部立方"
        },
        lines: ["\\sum_{k=1}^{20}k^3=\\tfrac14\\cdot400\\cdot441=44\\,100"],
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
          en: "Remove the even ones",
          fr: "Retirer les pairs",
          es: "Quitar los pares",
          ja: "偶数分を引く",
          zh: "减去偶数部分"
        },
        lines: ["\\sum_{k=1}^{10}(2k)^3=8\\cdot3025=24\\,200\\Rightarrow S=19\\,900"],
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
