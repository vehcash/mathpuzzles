/* calculus · A limit built from three expansions
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2022-limit-six-beta",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.5",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.5",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.5",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A limit built from three expansions",
      fr: "Une limite faite de trois développements",
      es: "Un límite hecho de tres desarrollos",
      ja: "3つの展開でつくる極限",
      zh: "由三个展开式组成的极限"
    },
    statement: {
      en: "$\\beta=\\displaystyle\\lim_{x\\to0}\\frac{e^{x^3}-\\left(1-x^3\\right)^{1/3}+\\left(\\left(1-x^2\\right)^{1/2}-1\\right)\\sin x}{x\\sin^2x}$. <b>Which of the following equal $6\\beta$?</b>",
      fr: "$\\beta=\\displaystyle\\lim_{x\\to0}\\frac{e^{x^3}-\\left(1-x^3\\right)^{1/3}+\\left(\\left(1-x^2\\right)^{1/2}-1\\right)\\sin x}{x\\sin^2x}$. <b>Lesquelles des valeurs suivantes sont égales à $6\\beta$ ?</b>",
      es: "$\\beta=\\displaystyle\\lim_{x\\to0}\\frac{e^{x^3}-\\left(1-x^3\\right)^{1/3}+\\left(\\left(1-x^2\\right)^{1/2}-1\\right)\\sin x}{x\\sin^2x}$. <b>¿Cuáles de los siguientes valores son iguales a $6\\beta$?</b>",
      ja: "$\\beta=\\displaystyle\\lim_{x\\to0}\\frac{e^{x^3}-\\left(1-x^3\\right)^{1/3}+\\left(\\left(1-x^2\\right)^{1/2}-1\\right)\\sin x}{x\\sin^2x}$ とします。<b>$6\\beta$ に等しいものはどれですか？</b>",
      zh: "$\\beta=\\displaystyle\\lim_{x\\to0}\\frac{e^{x^3}-\\left(1-x^3\\right)^{1/3}+\\left(\\left(1-x^2\\right)^{1/2}-1\\right)\\sin x}{x\\sin^2x}$。<b>下列哪些等于 $6\\beta$？</b>"
    },
    figureText: {
      en: "A bar chart of the x³ coefficients of the three pieces: +1, +1/3 and −1/2, adding to 5/6.",
      fr: "Un diagramme en barres des coefficients de x³ des trois morceaux : +1, +1/3 et −1/2, de somme 5/6.",
      es: "Un diagrama de barras de los coeficientes de x³ de las tres partes: +1, +1/3 y −1/2, que suman 5/6.",
      ja: "3つの部分の x³ の係数 +1、+1/3、−1/2 の棒グラフ。和は 5/6。",
      zh: "三部分 x³ 系数的条形图：+1、+1/3、−1/2，和为 5/6。"
    },
    hint: {
      en: "The denominator behaves like $x^3$. Expand each piece of the numerator up to $x^3$.",
      fr: "Le dénominateur se comporte comme $x^3$. Développez chaque morceau du numérateur jusqu’à $x^3$.",
      es: "El denominador se comporta como $x^3$. Desarrolla cada parte del numerador hasta $x^3$.",
      ja: "分母は $x^3$ のようにふるまう。分子の各部分を $x^3$ まで展開。",
      zh: "分母相当于 $x^3$。把分子各部分展开到 $x^3$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 3.4, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.2, 5.0, -1.4, 2.0);
      [[1, 1, 'eˣ³'], [2, 1 / 3, '−(1−x³)^⅓'], [3, -0.5, '(√(1−x²)−1)sin x'], [4.3, 5 / 6, 'sum']].forEach(([x, v, s], i) => {
        F.rect(T([x - 0.3, 0])[0], Math.min(T([0, 0])[1], T([0, v * 1.5])[1]), 0.6, Math.abs(v * 1.5), i === 3 ? 'fill-yellow' : 'fill-blue', 'fills');
        F.text(T([x, v * 1.5]), (v > 0 ? '+' : '') + (i === 0 ? '1' : i === 1 ? '1/3' : i === 2 ? '−1/2' : '5/6'), 'len small', 0, v > 0 ? -10 : 14);
      });
      return F;
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "$\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56$.",
        fr: "$\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56$.",
        es: "$\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56$.",
        ja: "$\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56$.",
        zh: "$\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56$."
      } },
      { tex: "6\\cdot\\tfrac56", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "6", correct: false, why: {
        en: "Keeps only $e^{x^3}$: $6\\cdot1$.",
        fr: "Ne garde que $e^{x^3}$ : $6\\cdot1$.",
        es: "Solo considera $e^{x^3}$: $6\\cdot1$.",
        ja: "$e^{x^3}$ だけ：$6\\cdot1$。",
        zh: "只算了 $e^{x^3}$：$6\\cdot1$。"
      } },
      { tex: "8", correct: false, why: {
        en: "Drops the $-\\tfrac12$ term: $6\\cdot\\tfrac43$.",
        fr: "Oublie le terme $-\\tfrac12$ : $6\\cdot\\tfrac43$.",
        es: "Olvida el término $-\\tfrac12$: $6\\cdot\\tfrac43$.",
        ja: "$-\\tfrac12$ の項を落とした：$6\\cdot\\tfrac43$。",
        zh: "漏了 $-\\tfrac12$ 项：$6\\cdot\\tfrac43$。"
      } },
      { tex: "3", correct: false, why: {
        en: "Sign slips.",
        fr: "Erreurs de signe.",
        es: "Errores de signo.",
        ja: "符号の誤り。",
        zh: "符号错误。"
      } },
      { tex: "1", correct: false, why: {
        en: "$6\\left(1-\\tfrac13-\\tfrac12\\right)$: wrong sign on the cube-root piece.",
        fr: "$6\\left(1-\\tfrac13-\\tfrac12\\right)$ : mauvais signe pour la racine cubique.",
        es: "$6\\left(1-\\tfrac13-\\tfrac12\\right)$: signo mal en la raíz cúbica.",
        ja: "$6\\left(1-\\tfrac13-\\tfrac12\\right)$：立方根の部分の符号が逆。",
        zh: "$6\\left(1-\\tfrac13-\\tfrac12\\right)$：立方根部分符号错。"
      } },
      { tex: "0", correct: false, why: {
        en: "The $x^3$ terms do not cancel.",
        fr: "Les termes en $x^3$ ne s’annulent pas.",
        es: "Los términos en $x^3$ no se anulan.",
        ja: "$x^3$ の項は打ち消し合わない。",
        zh: "$x^3$ 项不会抵消。"
      } },
      { tex: "\\tfrac56", correct: false, why: {
        en: "That is $\\beta$; the question asks for $6\\beta$.",
        fr: "C’est $\\beta$ ; on demande $6\\beta$.",
        es: "Es $\\beta$; se pide $6\\beta$.",
        ja: "それは $\\beta$。問われているのは $6\\beta$。",
        zh: "那是 $\\beta$，题目问 $6\\beta$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Denominator",
          fr: "Dénominateur",
          es: "Denominador",
          ja: "分母",
          zh: "分母"
        },
        lines: ["x\\sin^2x=x^3+O(x^5)"],
        note: {
          en: "So only the $x^3$ terms of the numerator matter.",
          fr: "Seuls les termes en $x^3$ du numérateur comptent.",
          es: "Solo importan los términos en $x^3$ del numerador.",
          ja: "分子の $x^3$ の項だけが効く。",
          zh: "只需分子的 $x^3$ 项。"
        }
      },
      {
        title: {
          en: "Expand the pieces",
          fr: "Développer les morceaux",
          es: "Desarrollar las partes",
          ja: "各部分を展開",
          zh: "展开各部分"
        },
        lines: ["e^{x^3}=1+x^3+\\cdots,\\quad\\left(1-x^3\\right)^{1/3}=1-\\tfrac13x^3+\\cdots,\\quad\\left(\\sqrt{1-x^2}-1\\right)\\sin x=-\\tfrac12x^3+\\cdots"],
        note: {
          en: "$\\sqrt{1-x^2}-1\\approx-\\tfrac{x^2}{2}$ and $\\sin x\\approx x$.",
          fr: "$\\sqrt{1-x^2}-1\\approx-\\tfrac{x^2}{2}$ et $\\sin x\\approx x$.",
          es: "$\\sqrt{1-x^2}-1\\approx-\\tfrac{x^2}{2}$ y $\\sin x\\approx x$.",
          ja: "$\\sqrt{1-x^2}-1\\approx-\\tfrac{x^2}{2}$、$\\sin x\\approx x$。",
          zh: "$\\sqrt{1-x^2}-1\\approx-\\tfrac{x^2}{2}$，$\\sin x\\approx x$。"
        }
      },
      {
        title: {
          en: "Combine",
          fr: "Combiner",
          es: "Combinar",
          ja: "まとめる",
          zh: "合并"
        },
        lines: ["\\beta=1+\\tfrac13-\\tfrac12=\\tfrac56,\\qquad6\\beta=\\boxed{5}"],
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
