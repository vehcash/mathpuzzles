/* number · Which is bigger: 3¹⁷ or 4¹³?
   Oxford MAT 2021 (Mathematics Admissions Test), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2021-three-17-vs-four-13",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 2",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 2",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 2",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 2",
        zh: "牛津大学数学入学考试 MAT 2021 第 2 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Which is bigger: 3¹⁷ or 4¹³?",
      fr: "Lequel est plus grand : 3¹⁷ ou 4¹³ ?",
      es: "¿Cuál es mayor: 3¹⁷ o 4¹³?",
      ja: "3¹⁷ と 4¹³ はどちらが大きい？",
      zh: "3¹⁷ 与 4¹³ 哪个大？"
    },
    statement: {
      en: "Compare $3^{17}$ with $4^{13}$ without a calculator. <b>Which of the following are true?</b>",
      fr: "Comparez $3^{17}$ et $4^{13}$ sans calculatrice. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Compara $3^{17}$ con $4^{13}$ sin calculadora. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "電卓を使わずに $3^{17}$ と $4^{13}$ を比べます。<b>次のうち正しいものはどれですか？</b>",
      zh: "不用计算器比较 $3^{17}$ 与 $4^{13}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A scale of base-2 logarithms from 25 to 27, with 4¹³ at exactly 26. Where 3¹⁷ falls is shown in the solution.",
      fr: "Une échelle de logarithmes en base 2 de 25 à 27, avec 4¹³ exactement en 26. La place de 3¹⁷ est montrée dans la solution.",
      es: "Una escala de logaritmos en base 2 de 25 a 27, con 4¹³ exactamente en 26. Dónde cae 3¹⁷ se muestra en la solución.",
      ja: "25 から 27 までの底2の対数の目盛り。4¹³ はちょうど 26。3¹⁷ の位置は解答で示します。",
      zh: "从 25 到 27 的以 2 为底对数刻度，4¹³ 恰在 26。3¹⁷ 的位置在解答中给出。"
    },
    hint: {
      en: "Take logarithms: compare $17\\ln3$ with $26\\ln2$, i.e. $\\log_2 3$ with $\\tfrac{26}{17}\\approx1.53$. A rational bound like $\\log_23>\\tfrac{19}{12}$ helps.",
      fr: "Prenez les logarithmes : comparez $17\\ln3$ et $26\\ln2$, c’est-à-dire $\\log_23$ et $\\tfrac{26}{17}\\approx1{,}53$.",
      es: "Toma logaritmos: compara $17\\ln3$ con $26\\ln2$, es decir $\\log_23$ con $\\tfrac{26}{17}\\approx1{,}53$.",
      ja: "対数をとり $17\\ln3$ と $26\\ln2$、つまり $\\log_23$ と $\\tfrac{26}{17}\\approx1.53$ を比べる。",
      zh: "取对数：比较 $17\\ln3$ 与 $26\\ln2$，即 $\\log_23$ 与 $\\tfrac{26}{17}\\approx1.53$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 50, pad: 18 });
      F.seg([0.3, 0.9], [5.7, 0.9], 'seg');
      const X = v => 0.3 + (v - 25) * 2.4;
      [[25, '25'], [26, '26'], [27, '27']].forEach(([v, t]) => { F.seg([X(v), 0.8], [X(v), 1.0], 'seg'); F.text([X(v), 0.5], t, 'tick', 0, 0); });
      F.dot([X(26), 0.9]); F.text([X(26), 1.3], '4¹³', 'len small', 0, 0);
      F.text([5.6, 0.45], 'log₂', 'len small', 0, 0);
      F.reveal = () => {
      F.dot([X(26.94), 0.9]); F.text([X(26.94), 1.3], '3¹⁷', 'len small', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "3^{17}>4^{13}", correct: true, why: {
        en: "$3^{17}\\approx1.29\\times10^8$, $4^{13}\\approx6.7\\times10^7$.",
        fr: "$3^{17}\\approx1.29\\times10^8$, $4^{13}\\approx6.7\\times10^7$.",
        es: "$3^{17}\\approx1.29\\times10^8$, $4^{13}\\approx6.7\\times10^7$.",
        ja: "$3^{17}\\approx1.29\\times10^8$, $4^{13}\\approx6.7\\times10^7$.",
        zh: "$3^{17}\\approx1.29\\times10^8$, $4^{13}\\approx6.7\\times10^7$."
      } },
      { tex: "17\\ln3>26\\ln2", correct: true, why: {
        en: "The same comparison after taking logarithms.",
        fr: "La même comparaison après passage au logarithme.",
        es: "La misma comparación tras tomar logaritmos.",
        ja: "対数をとった同じ比較。",
        zh: "取对数后的同一比较。"
      } },
      { tex: "3^{17}<4^{13}", correct: false, why: {
        en: "$\\log_23\\approx1.585>\\tfrac{26}{17}$.",
        fr: "$\\log_23\\approx1{,}585>\\tfrac{26}{17}$.",
        es: "$\\log_23\\approx1{,}585>\\tfrac{26}{17}$.",
        ja: "$\\log_23\\approx1.585>\\tfrac{26}{17}$。",
        zh: "$\\log_23\\approx1.585>\\tfrac{26}{17}$。"
      } },
      { tex: "3^{17}=4^{13}", correct: false, why: {
        en: "An odd number cannot equal a power of 2.",
        fr: "Un nombre impair ne peut égaler une puissance de 2.",
        es: "Un impar no puede ser potencia de 2.",
        ja: "奇数は2の累乗にならない。",
        zh: "奇数不可能等于 2 的幂。"
      } },
      { tex: "\\log_23<\\tfrac{26}{17}", correct: false, why: {
        en: "$\\tfrac{26}{17}\\approx1.529$.",
        fr: "$\\tfrac{26}{17}\\approx1{,}529$.",
        es: "$\\tfrac{26}{17}\\approx1{,}529$.",
        ja: "$\\tfrac{26}{17}\\approx1.529$。",
        zh: "$\\tfrac{26}{17}\\approx1.529$。"
      } },
      { tex: "3^{17}>4^{14}", correct: false, why: {
        en: "$4^{14}\\approx2.7\\times10^8$.",
        fr: "$4^{14}\\approx2.7\\times10^8$.",
        es: "$4^{14}\\approx2.7\\times10^8$.",
        ja: "$4^{14}\\approx2.7\\times10^8$.",
        zh: "$4^{14}\\approx2.7\\times10^8$."
      } },
      { tex: "\\log_23<\\tfrac32", correct: false, why: {
        en: "$3^2=9>8=2^3$, so $\\log_23>\\tfrac32$.",
        fr: "$3^2=9>8=2^3$, so $\\log_23>\\tfrac32$.",
        es: "$3^2=9>8=2^3$, so $\\log_23>\\tfrac32$.",
        ja: "$3^2=9>8=2^3$, so $\\log_23>\\tfrac32$.",
        zh: "$3^2=9>8=2^3$, so $\\log_23>\\tfrac32$."
      } },
      { tex: "3^{17}<2^{26}", correct: false, why: {
        en: "$2^{26}=4^{13}$.",
        fr: "$2^{26}=4^{13}$.",
        es: "$2^{26}=4^{13}$.",
        ja: "$2^{26}=4^{13}$。",
        zh: "$2^{26}=4^{13}$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Reduce to log₂ 3",
          fr: "Se ramener à log₂ 3",
          es: "Reducir a log₂ 3",
          ja: "log₂ 3 に帰着",
          zh: "化为 log₂ 3"
        },
        lines: ["3^{17}\\gtrless2^{26}\\iff\\log_23\\gtrless\\tfrac{26}{17}\\approx1.529"],
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
          en: "A rational bound",
          fr: "Une borne rationnelle",
          es: "Una cota racional",
          ja: "有理数の評価",
          zh: "有理数界"
        },
        lines: ["3^{12}=531441>524288=2^{19}\\;\\Rightarrow\\;\\log_23>\\tfrac{19}{12}\\approx1.583"],
        note: {
          en: "And $\\tfrac{19}{12}>\\tfrac{26}{17}$ since $19\\cdot17=323>312=26\\cdot12$.",
          fr: "Et $\\tfrac{19}{12}>\\tfrac{26}{17}$ car $19\\cdot17=323>312=26\\cdot12$.",
          es: "Y $\\tfrac{19}{12}>\\tfrac{26}{17}$ pues $19\\cdot17=323>312=26\\cdot12$.",
          ja: "$19\\cdot17=323>312=26\\cdot12$ より $\\tfrac{19}{12}>\\tfrac{26}{17}$。",
          zh: "因 $19\\cdot17=323>312=26\\cdot12$，$\\tfrac{19}{12}>\\tfrac{26}{17}$。"
        }
      },
      {
        title: {
          en: "Conclude",
          fr: "Conclure",
          es: "Concluir",
          ja: "結論",
          zh: "结论"
        },
        lines: ["\\boxed{3^{17}>4^{13}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "MAT asked for this using series for $\\ln2$ and $\\ln3$; the bound above is a quicker route.",
          fr: "Le MAT passait par des séries de $\\ln2$ et $\\ln3$ ; la borne ci-dessus est plus rapide.",
          es: "El MAT usaba series de $\\ln2$ y $\\ln3$; la cota de arriba es más rápida.",
          ja: "MAT では $\\ln2$, $\\ln3$ の級数を使うが、上の評価の方が速い。",
          zh: "MAT 用 $\\ln2$、$\\ln3$ 的级数；上面的界更快。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
