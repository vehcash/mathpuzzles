/* calculus · The fifth derivative of 2x + 3x² + 5x³ + 7x⁴ + …
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2020b-prime-power-series",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question D",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question D",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta D",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 D",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The fifth derivative of 2x + 3x² + 5x³ + 7x⁴ + …",
      fr: "La dérivée cinquième de 2x + 3x² + 5x³ + 7x⁴ + …",
      es: "La quinta derivada de 2x + 3x² + 5x³ + 7x⁴ + …",
      ja: "2x + 3x² + 5x³ + 7x⁴ + … の5階導関数",
      zh: "2x + 3x² + 5x³ + 7x⁴ + … 的五阶导数"
    },
    statement: {
      en: "Let $y=2x+3x^2+5x^3+7x^4+11x^5+\\cdots$, where the coefficient of $x^n$ is the $n$-th prime. <b>Which of the following are true?</b>",
      fr: "Soit $y=2x+3x^2+5x^3+7x^4+11x^5+\\cdots$, où le coefficient de $x^n$ est le $n$-ième nombre premier. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $y=2x+3x^2+5x^3+7x^4+11x^5+\\cdots$, donde el coeficiente de $x^n$ es el $n$-ésimo primo. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=2x+3x^2+5x^3+7x^4+11x^5+\\cdots$（$x^n$ の係数は $n$ 番目の素数）とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $y=2x+3x^2+5x^3+7x^4+11x^5+\\cdots$，$x^n$ 的系数为第 $n$ 个素数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The coefficients 2, 3, 5, 7, 11, 13 under the powers x, x², …, x⁶.",
      fr: "Les coefficients 2, 3, 5, 7, 11, 13 sous les puissances x, x², …, x⁶.",
      es: "Los coeficientes 2, 3, 5, 7, 11, 13 bajo las potencias x, x², …, x⁶.",
      ja: "x, x², …, x⁶ の係数 2, 3, 5, 7, 11, 13。",
      zh: "x, x², …, x⁶ 的系数 2, 3, 5, 7, 11, 13。"
    },
    hint: {
      en: "At $x=0$, only the $x^5$ term survives five differentiations, and $\\dfrac{d^5}{dx^5}x^5=5!$.",
      fr: "En $x=0$, seul le terme en $x^5$ survit à cinq dérivations, et $\\dfrac{d^5}{dx^5}x^5=5!$.",
      es: "En $x=0$ solo sobrevive el término $x^5$ tras cinco derivadas, y $\\dfrac{d^5}{dx^5}x^5=5!$.",
      ja: "$x=0$ では5回微分して残るのは $x^5$ の項だけで、$\\dfrac{d^5}{dx^5}x^5=5!$。",
      zh: "在 $x=0$ 处五阶导后只剩 $x^5$ 项，且 $\\dfrac{d^5}{dx^5}x^5=5!$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 46, pad: 16 });
      [2, 3, 5, 7, 11, 13].forEach((c, k) => { F.rect(0.2 + k * 1.03, 0.35, 0.9, 0.7, 'fill-blue', 'fills'); F.text([0.65 + k * 1.03, 0.7], String(c), 'pt', 0, 0); F.text([0.65 + k * 1.03, 1.05], 'x' + '¹²³⁴⁵⁶'[k], 'tick', 0, -8); });
      F.reveal = () => {
      F.rect(0.2 + 4 * 1.03, 0.35, 0.9, 0.7, 'fill-yellow', 'fills'); F.text([4.77, 0.7], '11', 'pt', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "y^{(5)}(0)=1320", correct: true, why: {
        en: "$5!\\cdot11=120\\cdot11$",
        fr: "$5!\\cdot11=120\\cdot11$",
        es: "$5!\\cdot11=120\\cdot11$",
        ja: "$5!\\cdot11=120\\cdot11$",
        zh: "$5!\\cdot11=120\\cdot11$"
      } },
      { tex: "y^{(5)}(0)=5!\\times p_5", correct: true, why: {
        en: "$p_5=11$",
        fr: "$p_5=11$",
        es: "$p_5=11$",
        ja: "$p_5=11$",
        zh: "$p_5=11$"
      } },
      { tex: "y^{(5)}(0)=0", correct: false, why: {
        en: "Only lower powers vanish; the $x^5$ term gives a constant.",
        fr: "Seules les puissances inférieures disparaissent ; $x^5$ donne une constante.",
        es: "Solo desaparecen las potencias menores; $x^5$ da una constante.",
        ja: "消えるのは低次の項だけ。$x^5$ は定数を残す。",
        zh: "只有低次项消失，$x^5$ 项留下常数。"
      } },
      { tex: "y^{(5)}(0)=120", correct: false, why: {
        en: "Forgets the coefficient $11$.",
        fr: "Oublie le coefficient $11$.",
        es: "Olvida el coeficiente $11$.",
        ja: "係数 $11$ を忘れる。",
        zh: "漏了系数 $11$。"
      } },
      { tex: "y^{(5)}(0)=840", correct: false, why: {
        en: "Uses $7$, the coefficient of $x^4$.",
        fr: "Utilise $7$, le coefficient de $x^4$.",
        es: "Usa $7$, el coeficiente de $x^4$.",
        ja: "$x^4$ の係数 $7$ を使った。",
        zh: "用了 $x^4$ 的系数 $7$。"
      } },
      { tex: "y^{(5)}(0)=1080", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "y^{(5)}(0)=1560", correct: false, why: {
        en: "Uses $13$, the coefficient of $x^6$.",
        fr: "Utilise $13$, le coefficient de $x^6$.",
        es: "Usa $13$, el coeficiente de $x^6$.",
        ja: "$x^6$ の係数 $13$ を使った。",
        zh: "用了 $x^6$ 的系数 $13$。"
      } },
      { tex: "y^{(5)}(0)=11", correct: false, why: {
        en: "Forgets the factor $5!$.",
        fr: "Oublie le facteur $5!$.",
        es: "Olvida el factor $5!$.",
        ja: "$5!$ を忘れる。",
        zh: "漏了因子 $5!$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Term by term",
          fr: "Terme à terme",
          es: "Término a término",
          ja: "項ごとに",
          zh: "逐项"
        },
        lines: ["\\dfrac{d^5}{dx^5}x^n\\Big|_{x=0}=\\begin{cases}5!&n=5\\\\0&n\\ne5\\end{cases}"],
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
          en: "Answer",
          fr: "Réponse",
          es: "Respuesta",
          ja: "答え",
          zh: "结果"
        },
        lines: ["y^{(5)}(0)=11\\cdot5!=1320"],
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
