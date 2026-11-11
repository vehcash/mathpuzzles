/* trigonometry · From cos(α+β) to cos(α−β)
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2024-cos-difference",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 4",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 4",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 4",
        ja: "2024年 中国・高考 新課程標準I卷 第4問",
        zh: "2024年高考数学新课标I卷 第4题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "From cos(α+β) to cos(α−β)",
      fr: "De cos(α+β) à cos(α−β)",
      es: "De cos(α+β) a cos(α−β)",
      ja: "cos(α+β) から cos(α−β) へ",
      zh: "由 cos(α+β) 求 cos(α−β)"
    },
    statement: {
      en: "$\\cos(\\alpha+\\beta)=m$ and $\\tan\\alpha\\tan\\beta=2$. <b>Which of the following equal $\\cos(\\alpha-\\beta)$?</b>",
      fr: "$\\cos(\\alpha+\\beta)=m$ et $\\tan\\alpha\\tan\\beta=2$. <b>Lesquelles des expressions suivantes sont égales à $\\cos(\\alpha-\\beta)$ ?</b>",
      es: "$\\cos(\\alpha+\\beta)=m$ y $\\tan\\alpha\\tan\\beta=2$. <b>¿Cuáles de las siguientes expresiones son iguales a $\\cos(\\alpha-\\beta)$?</b>",
      ja: "$\\cos(\\alpha+\\beta)=m$、$\\tan\\alpha\\tan\\beta=2$ のとき、<b>$\\cos(\\alpha-\\beta)$ に等しいものはどれですか？</b>",
      zh: "已知 $\\cos(\\alpha+\\beta)=m$，$\\tan\\alpha\\tan\\beta=2$。<b>下列哪些等于 $\\cos(\\alpha-\\beta)$？</b>"
    },
    figureText: {
      en: "A unit circle with an example: α = 45° (tan α = 1) and β ≈ 63.4° (tan β = 2), so tan α · tan β = 2.",
      fr: "Un cercle unité avec un exemple : α = 45° (tan α = 1) et β ≈ 63,4° (tan β = 2), donc tan α · tan β = 2.",
      es: "Una circunferencia unidad con un ejemplo: α = 45° (tan α = 1) y β ≈ 63,4° (tan β = 2), así que tan α · tan β = 2.",
      ja: "単位円での例：α = 45°（tan α = 1）、β ≈ 63.4°（tan β = 2）で tan α · tan β = 2。",
      zh: "单位圆上的例子：α = 45°（tan α = 1），β ≈ 63.4°（tan β = 2），所以 tan α · tan β = 2。"
    },
    hint: {
      en: "Rewrite $\\tan\\alpha\\tan\\beta=2$ as $\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta$.",
      fr: "Écrivez $\\tan\\alpha\\tan\\beta=2$ sous la forme $\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta$.",
      es: "Escribe $\\tan\\alpha\\tan\\beta=2$ como $\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta$.",
      ja: "$\\tan\\alpha\\tan\\beta=2$ を $\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta$ と書き直す。",
      zh: "把 $\\tan\\alpha\\tan\\beta=2$ 写成 $\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 16 });
      const T = F.T = axes(F, -1.4, 1.6, -1.4, 1.6);
      const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([Math.cos(t), Math.sin(t)])); } F.path(C, 'seg thin', 'base', true);
      const a = Math.PI / 4, b = Math.atan(2), U = t => [Math.cos(t), Math.sin(t)];
      F.seg(T([0, 0]), T(U(a)), 'hl yellow'); F.text(T(U(a)), 'α', 'pt', 12, -8);
      F.seg(T([0, 0]), T(U(b)), 'hl blue'); F.text(T(U(b)), 'β', 'pt', 2, -10);
      F.reveal = () => {
      F.seg(T([0, 0]), T(U(a + b)), 'hl pink'); F.seg(T(U(a + b)), T([Math.cos(a + b), 0]), 'seg thin dashc');
      F.text(T([Math.cos(a + b), 0]), 'm', 'pt', 0, 14);
      F.seg(T([0, 0]), T(U(a - b)), 'hl green'); F.seg(T(U(a - b)), T([Math.cos(a - b), 0]), 'seg thin dashc');
      F.text(T([Math.cos(a - b), 0]), '−3m', 'len small', 4, -10);
      };
      return F;
    },
    options: [
      { tex: "-3m", correct: true, why: {
        en: "$\\cos\\alpha\\cos\\beta=-m$ and $\\sin\\alpha\\sin\\beta=-2m$, so $\\cos(\\alpha-\\beta)=-3m$.",
        fr: "$\\cos\\alpha\\cos\\beta=-m$ and $\\sin\\alpha\\sin\\beta=-2m$, so $\\cos(\\alpha-\\beta)=-3m$.",
        es: "$\\cos\\alpha\\cos\\beta=-m$ and $\\sin\\alpha\\sin\\beta=-2m$, so $\\cos(\\alpha-\\beta)=-3m$.",
        ja: "$\\cos\\alpha\\cos\\beta=-m$ and $\\sin\\alpha\\sin\\beta=-2m$, so $\\cos(\\alpha-\\beta)=-3m$.",
        zh: "$\\cos\\alpha\\cos\\beta=-m$ and $\\sin\\alpha\\sin\\beta=-2m$, so $\\cos(\\alpha-\\beta)=-3m$."
      } },
      { tex: "-3\\cos(\\alpha+\\beta)", correct: true, why: {
        en: "The same expression, written with the given cosine.",
        fr: "La même expression, écrite avec le cosinus donné.",
        es: "La misma expresión, escrita con el coseno dado.",
        ja: "与えられた余弦で書いた同じ式。",
        zh: "用已知余弦表示的同一个式子。"
      } },
      { tex: "3m", correct: false, why: {
        en: "Sign slip: $\\cos\\alpha\\cos\\beta=-m$, not $m$.",
        fr: "Erreur de signe : $\\cos\\alpha\\cos\\beta=-m$, pas $m$.",
        es: "Error de signo: $\\cos\\alpha\\cos\\beta=-m$, no $m$.",
        ja: "符号ミス：$\\cos\\alpha\\cos\\beta=-m$。",
        zh: "符号错：$\\cos\\alpha\\cos\\beta=-m$，不是 $m$。"
      } },
      { tex: "-\\tfrac{m}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{m}{3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-m", correct: false, why: {
        en: "That is $\\cos\\alpha\\cos\\beta$, only one of the two terms.",
        fr: "C’est $\\cos\\alpha\\cos\\beta$, un seul des deux termes.",
        es: "Es $\\cos\\alpha\\cos\\beta$, solo uno de los dos términos.",
        ja: "$\\cos\\alpha\\cos\\beta$ だけで、項が1つ足りない。",
        zh: "那只是 $\\cos\\alpha\\cos\\beta$，少了一项。"
      } },
      { tex: "-2m", correct: false, why: {
        en: "That is $\\sin\\alpha\\sin\\beta$, only one of the two terms.",
        fr: "C’est $\\sin\\alpha\\sin\\beta$, un seul des deux termes.",
        es: "Es $\\sin\\alpha\\sin\\beta$, solo uno de los dos términos.",
        ja: "$\\sin\\alpha\\sin\\beta$ だけ。",
        zh: "那只是 $\\sin\\alpha\\sin\\beta$。"
      } },
      { tex: "2m", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use the tangent product",
          fr: "Utiliser le produit des tangentes",
          es: "Usar el producto de tangentes",
          ja: "タンジェントの積を使う",
          zh: "用正切之积"
        },
        lines: ["\\sin\\alpha\\sin\\beta=2\\cos\\alpha\\cos\\beta"],
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
          en: "Solve for the two products",
          fr: "Trouver les deux produits",
          es: "Hallar los dos productos",
          ja: "2つの積を求める",
          zh: "求出两个积"
        },
        lines: ["m=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta=-\\cos\\alpha\\cos\\beta", "\\cos\\alpha\\cos\\beta=-m,\\qquad\\sin\\alpha\\sin\\beta=-2m"],
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
          en: "Add instead of subtract",
          fr: "Additionner au lieu de soustraire",
          es: "Sumar en lugar de restar",
          ja: "引く代わりに足す",
          zh: "改减为加"
        },
        lines: ["\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta=\\boxed{-3m}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the example, $m=-\\tfrac1{\\sqrt{10}}$ and $\\cos(\\alpha-\\beta)=\\tfrac3{\\sqrt{10}}$.",
          fr: "Dans l’exemple, $m=-\\tfrac1{\\sqrt{10}}$ et $\\cos(\\alpha-\\beta)=\\tfrac3{\\sqrt{10}}$.",
          es: "En el ejemplo, $m=-\\tfrac1{\\sqrt{10}}$ y $\\cos(\\alpha-\\beta)=\\tfrac3{\\sqrt{10}}$.",
          ja: "例では $m=-\\tfrac1{\\sqrt{10}}$、$\\cos(\\alpha-\\beta)=\\tfrac3{\\sqrt{10}}$。",
          zh: "例中 $m=-\\tfrac1{\\sqrt{10}}$，$\\cos(\\alpha-\\beta)=\\tfrac3{\\sqrt{10}}$。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
