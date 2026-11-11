/* number · One more than the product
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2021-one-more-than-product",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2021 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "One more than the product",
      fr: "Un de plus que le produit",
      es: "Uno más que el producto",
      ja: "積より1大きい数",
      zh: "比乘积多一"
    },
    statement: {
      en: "Let $a_0=2$ and, for $n\\ge1$, $a_n=1+a_0a_1\\cdots a_{n-1}$ (one more than the product of all earlier terms). <b>Which of the following are true?</b>",
      fr: "Soit $a_0=2$ et, pour $n\\ge1$, $a_n=1+a_0a_1\\cdots a_{n-1}$ (un de plus que le produit de tous les termes précédents). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $a_0=2$ y, para $n\\ge1$, $a_n=1+a_0a_1\\cdots a_{n-1}$ (uno más que el producto de todos los términos anteriores). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a_0=2$、$n\\ge1$ で $a_n=1+a_0a_1\\cdots a_{n-1}$（それまでの全項の積に 1 を足したもの）とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a_0=2$，当 $n\\ge1$ 时 $a_n=1+a_0a_1\\cdots a_{n-1}$（前面所有项之积加一）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The first terms 2, 3, 7, 43, 1807 in boxes, with arrows showing each one as 1 plus the product of the boxes before it.",
      fr: "Les premiers termes 2, 3, 7, 43, 1807 dans des cases, avec des flèches montrant chacun comme 1 plus le produit des cases précédentes.",
      es: "Los primeros términos 2, 3, 7, 43, 1807 en casillas, con flechas que muestran cada uno como 1 más el producto de las anteriores.",
      ja: "最初の項 2, 3, 7, 43, 1807 を箱に入れ、それぞれが前の箱の積 + 1 であることを矢印で示した図。",
      zh: "前几项 2, 3, 7, 43, 1807 放在方框中，箭头表示每一项等于前面各项之积加 1。"
    },
    hint: {
      en: "Let $P_n=a_0\\cdots a_{n-1}$, so $a_n=P_n+1$. How is $P_{n+1}$ related to $P_n$ and $a_n$?",
      fr: "Posez $P_n=a_0\\cdots a_{n-1}$, donc $a_n=P_n+1$. Quel lien entre $P_{n+1}$, $P_n$ et $a_n$ ?",
      es: "Llama $P_n=a_0\\cdots a_{n-1}$, así $a_n=P_n+1$. ¿Qué relación hay entre $P_{n+1}$, $P_n$ y $a_n$?",
      ja: "$P_n=a_0\\cdots a_{n-1}$ とおくと $a_n=P_n+1$。$P_{n+1}$ と $P_n$, $a_n$ の関係は？",
      zh: "令 $P_n=a_0\\cdots a_{n-1}$，则 $a_n=P_n+1$。$P_{n+1}$ 与 $P_n$、$a_n$ 有何关系？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 9.0, h: 2.0, scale: 40, pad: 14 });
      const v = ['2', '3', '7', '43', '1807'];
      v.forEach((t, i) => { const x = 0.2 + i * 1.8; F.rect(x, 0.6, 1.3, 0.8, i ? 'tri' : 'tri fill-yellow'); F.text([x + 0.65, 1.0], t, 'pt', 0, 0);
        if (i) F.text([x - 0.25, 1.0], '→', 'len small', 0, 0); });
      F.text([4.5, 0.25], 'a₀  a₁  a₂  a₃  a₄', 'len small', 0, 0);
      return F;
    },
    options: [
      { tex: "a_n=a_{n-1}^2-a_{n-1}+1", correct: true, why: {
        en: "$a_n-1=P_n=P_{n-1}a_{n-1}=(a_{n-1}-1)a_{n-1}$.",
        fr: "$a_n-1=P_n=P_{n-1}a_{n-1}=(a_{n-1}-1)a_{n-1}$.",
        es: "$a_n-1=P_n=P_{n-1}a_{n-1}=(a_{n-1}-1)a_{n-1}$.",
        ja: "$a_n-1=P_n=P_{n-1}a_{n-1}=(a_{n-1}-1)a_{n-1}$.",
        zh: "$a_n-1=P_n=P_{n-1}a_{n-1}=(a_{n-1}-1)a_{n-1}$."
      } },
      { tex: "a_4=1807", correct: true, why: {
        en: "$2\\cdot3\\cdot7\\cdot43+1=1807=43^2-43+1$.",
        fr: "$2\\cdot3\\cdot7\\cdot43+1=1807=43^2-43+1$.",
        es: "$2\\cdot3\\cdot7\\cdot43+1=1807=43^2-43+1$.",
        ja: "$2\\cdot3\\cdot7\\cdot43+1=1807=43^2-43+1$.",
        zh: "$2\\cdot3\\cdot7\\cdot43+1=1807=43^2-43+1$."
      } },
      { tex: "a_n=2a_{n-1}+1", correct: false, why: {
        en: "$3,7$ fit, but $2\\cdot7+1=15\\ne43$.",
        fr: "$3,7$ fit, but $2\\cdot7+1=15\\ne43$.",
        es: "$3,7$ fit, but $2\\cdot7+1=15\\ne43$.",
        ja: "$3,7$ fit, but $2\\cdot7+1=15\\ne43$.",
        zh: "$3,7$ fit, but $2\\cdot7+1=15\\ne43$."
      } },
      { tex: "a_3=15", correct: false, why: {
        en: "$a_3=2\\cdot3\\cdot7+1=43$.",
        fr: "$a_3=2\\cdot3\\cdot7+1=43$.",
        es: "$a_3=2\\cdot3\\cdot7+1=43$.",
        ja: "$a_3=2\\cdot3\\cdot7+1=43$.",
        zh: "$a_3=2\\cdot3\\cdot7+1=43$."
      } },
      { tex: "a_n=a_{n-1}^2+1", correct: false, why: {
        en: "$3^2+1=10\\ne7$.",
        fr: "$3^2+1=10\\ne7$.",
        es: "$3^2+1=10\\ne7$.",
        ja: "$3^2+1=10\\ne7$.",
        zh: "$3^2+1=10\\ne7$."
      } },
      { tex: "a_n=a_{n-1}^2-1", correct: false, why: {
        en: "$3^2-1=8\\ne7$.",
        fr: "$3^2-1=8\\ne7$.",
        es: "$3^2-1=8\\ne7$.",
        ja: "$3^2-1=8\\ne7$.",
        zh: "$3^2-1=8\\ne7$."
      } },
      { tex: "\\gcd(a_2,a_3)=7", correct: false, why: {
        en: "Each term leaves remainder 1 on division by every earlier term, so they are coprime.",
        fr: "Chaque terme a pour reste 1 modulo chaque terme précédent : ils sont premiers entre eux.",
        es: "Cada término da resto 1 al dividir por cada término anterior: son coprimos.",
        ja: "各項は前のどの項で割っても余り1なので互いに素。",
        zh: "每项除以前面任一项都余 1，故两两互素。"
      } },
      { tex: "a_2=6", correct: false, why: {
        en: "$a_2=a_0a_1+1=7$.",
        fr: "$a_2=a_0a_1+1=7$.",
        es: "$a_2=a_0a_1+1=7$.",
        ja: "$a_2=a_0a_1+1=7$.",
        zh: "$a_2=a_0a_1+1=7$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Name the product",
          fr: "Nommer le produit",
          es: "Nombrar el producto",
          ja: "積に名前をつける",
          zh: "给乘积命名"
        },
        lines: ["P_n=a_0a_1\\cdots a_{n-1},\\qquad a_n=P_n+1,\\qquad P_n=P_{n-1}\\,a_{n-1}"],
        note: {
          en: "Each new product is the old one times the newest term.",
          fr: "Chaque nouveau produit est l’ancien fois le dernier terme.",
          es: "Cada producto nuevo es el anterior por el último término.",
          ja: "新しい積は古い積 × 最新の項。",
          zh: "新的积等于旧的积乘以最新一项。"
        }
      },
      {
        title: {
          en: "Eliminate P",
          fr: "Éliminer P",
          es: "Eliminar P",
          ja: "P を消す",
          zh: "消去 P"
        },
        lines: ["a_n-1=(a_{n-1}-1)\\,a_{n-1}\\;\\Rightarrow\\;\\boxed{a_n=a_{n-1}^2-a_{n-1}+1}"],
        note: {
          en: "Check: $3\\to7\\to43\\to1807$.",
          fr: "Vérification : $3\\to7\\to43\\to1807$.",
          es: "Comprobación: $3\\to7\\to43\\to1807$.",
          ja: "確認：$3\\to7\\to43\\to1807$。",
          zh: "验证：$3\\to7\\to43\\to1807$。"
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
          en: "Test each formula on 3, 7, 43 — a formula has to fit them all.",
          fr: "Testez chaque formule sur 3, 7, 43 — elle doit toutes les vérifier.",
          es: "Prueba cada fórmula con 3, 7, 43: debe cumplirse en todos.",
          ja: "各式を 3, 7, 43 で試す。すべてに合う必要がある。",
          zh: "用 3、7、43 检验每个公式，必须全部符合。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
