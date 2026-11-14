/* calculus · From dy/dx = y^¼ to dy/dx = 2y^¼
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2022b-rescaling-a-differential-equation",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question G",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question G",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta G",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 G",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 G 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "From dy/dx = y^¼ to dy/dx = 2y^¼",
      fr: "De dy/dx = y^¼ à dy/dx = 2y^¼",
      es: "De dy/dx = y^¼ a dy/dx = 2y^¼",
      ja: "dy/dx = y^¼ から dy/dx = 2y^¼ へ",
      zh: "从 dy/dx = y^¼ 到 dy/dx = 2y^¼"
    },
    statement: {
      en: "Suppose $y=f(x)$ solves $\\dfrac{dy}{dx}=y^{1/4}$, with $f>0$. We look for a constant $c$ such that $y=c\\,f(x)$ solves $\\dfrac{dy}{dx}=2y^{1/4}$. <b>Which of the following are true?</b>",
      fr: "On suppose que $y=f(x)$, avec $f>0$, est solution de $\\dfrac{dy}{dx}=y^{1/4}$. On cherche une constante $c$ telle que $y=c\\,f(x)$ soit solution de $\\dfrac{dy}{dx}=2y^{1/4}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Supón que $y=f(x)$, con $f>0$, resuelve $\\dfrac{dy}{dx}=y^{1/4}$. Buscamos una constante $c$ tal que $y=c\\,f(x)$ resuelva $\\dfrac{dy}{dx}=2y^{1/4}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=f(x)$（$f>0$）が $\\dfrac{dy}{dx}=y^{1/4}$ の解とします。$y=c\\,f(x)$ が $\\dfrac{dy}{dx}=2y^{1/4}$ の解となる定数 $c$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $y=f(x)$（$f>0$）满足 $\\dfrac{dy}{dx}=y^{1/4}$。求常数 $c$ 使 $y=c\\,f(x)$满足 $\\dfrac{dy}{dx}=2y^{1/4}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A solution curve and a vertically stretched copy of it.",
      fr: "Une courbe solution et une copie étirée verticalement.",
      es: "Una curva solución y una copia estirada verticalmente.",
      ja: "解曲線とそれを縦に伸ばしたもの。",
      zh: "一条解曲线及其竖直拉伸的副本。"
    },
    hint: {
      en: "Substitute: $(cf)'=cf^{1/4}$ must equal $2(cf)^{1/4}=2c^{1/4}f^{1/4}$.",
      fr: "Substituez : $(cf)'=cf^{1/4}$ doit valoir $2(cf)^{1/4}=2c^{1/4}f^{1/4}$.",
      es: "Sustituye: $(cf)'=cf^{1/4}$ debe ser $2(cf)^{1/4}=2c^{1/4}f^{1/4}$.",
      ja: "代入：$(cf)'=cf^{1/4}$ が $2c^{1/4}f^{1/4}$ に等しい。",
      zh: "代入：$(cf)'=cf^{1/4}$ 须等于 $2c^{1/4}f^{1/4}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.0, scale: 46, pad: 16 });
      const T = F.T = axes(F, -0.3, 4.7, -0.3, 3.7);
      const f = x => Math.pow(0.75 * x, 4 / 3) / 2;
      plot(F, T, f, 0, 4.6, 'graph', 'base', -0.3, 3.7);
      F.reveal = () => {
      plot(F, T, x => Math.pow(2, 4 / 3) * f(x), 0, 4.6, 'hl pink', 'base', -0.3, 3.7);
      F.text(T([2.4, 3.3]), '× 2^{4/3}', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "× 2^{4/3}": {"fr": "× 2^{4/3}", "es": "× 2^{4/3}", "ja": "× 2^{4/3}", "zh": "× 2^{4/3}"}
    },
    options: [
      { tex: "c=2^{4/3}", correct: true, why: {
        en: "$c^{3/4}=2$",
        fr: "$c^{3/4}=2$",
        es: "$c^{3/4}=2$",
        ja: "$c^{3/4}=2$",
        zh: "$c^{3/4}=2$"
      } },
      { tex: "c^{3/4}=2", correct: true, why: {
        en: "$c\\,f^{1/4}=2c^{1/4}f^{1/4}$",
        fr: "$c\\,f^{1/4}=2c^{1/4}f^{1/4}$",
        es: "$c\\,f^{1/4}=2c^{1/4}f^{1/4}$",
        ja: "$c\\,f^{1/4}=2c^{1/4}f^{1/4}$",
        zh: "$c\\,f^{1/4}=2c^{1/4}f^{1/4}$"
      } },
      { tex: "c=2^4", correct: false, why: {
        en: "Then $c^{3/4}=8$, not $2$.",
        fr: "Alors $c^{3/4}=8$ et non $2$.",
        es: "Entonces $c^{3/4}=8$, no $2$.",
        ja: "このとき $c^{3/4}=8$ で $2$ でない。",
        zh: "此时 $c^{3/4}=8$ 而非 $2$。"
      } },
      { tex: "c=2", correct: false, why: {
        en: "Ignores that $c$ also appears inside $y^{1/4}$.",
        fr: "Oublie que $c$ apparaît aussi dans $y^{1/4}$.",
        es: "Olvida que $c$ también aparece dentro de $y^{1/4}$.",
        ja: "$y^{1/4}$ の中にも $c$ が入ることを忘れている。",
        zh: "忘了 $c$ 也出现在 $y^{1/4}$ 中。"
      } },
      { tex: "c=2^{-4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=2^{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=2^{-3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c=2^{1/4}", correct: false, why: {
        en: "$c^{3/4}=2^{3/16}\\ne2$",
        fr: "$c^{3/4}=2^{3/16}\\ne2$",
        es: "$c^{3/4}=2^{3/16}\\ne2$",
        ja: "$c^{3/4}=2^{3/16}\\ne2$",
        zh: "$c^{3/4}=2^{3/16}\\ne2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "代入",
          zh: "代入"
        },
        lines: ["(cf)'=cf'=cf^{1/4},\\qquad 2(cf)^{1/4}=2c^{1/4}f^{1/4}"],
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
          en: "Match",
          fr: "Identifier",
          es: "Igualar",
          ja: "比較",
          zh: "比较"
        },
        lines: ["c=2c^{1/4}\\Rightarrow c^{3/4}=2\\Rightarrow c=2^{4/3}"],
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
