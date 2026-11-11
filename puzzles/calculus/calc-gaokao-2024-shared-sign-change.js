/* calculus · Two factors that change sign together
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-shared-sign-change",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 8",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 8",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 8",
        ja: "2024年 中国・高考 新課程標準II卷 第8問",
        zh: "2024年高考数学新课标II卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "Two factors that change sign together",
      fr: "Deux facteurs qui changent de signe ensemble",
      es: "Dos factores que cambian de signo a la vez",
      ja: "同時に符号が変わる2因数",
      zh: "同时变号的两个因式"
    },
    statement: {
      en: "$f(x)=(x+a)\\ln(x+b)$ satisfies $f(x)\\ge0$ for every $x$ in its domain. <b>Which of the following equal the minimum of $a^2+b^2$?</b>",
      fr: "$f(x)=(x+a)\\ln(x+b)$ vérifie $f(x)\\ge0$ pour tout $x$ de son domaine. <b>Lesquelles des valeurs suivantes sont égales au minimum de $a^2+b^2$ ?</b>",
      es: "$f(x)=(x+a)\\ln(x+b)$ cumple $f(x)\\ge0$ para todo $x$ de su dominio. <b>¿Cuáles de los siguientes valores son iguales al mínimo de $a^2+b^2$?</b>",
      ja: "$f(x)=(x+a)\\ln(x+b)$ が定義域のすべての $x$ で $f(x)\\ge0$ を満たします。<b>$a^2+b^2$ の最小値に等しいものはどれですか？</b>",
      zh: "函数 $f(x)=(x+a)\\ln(x+b)$ 在定义域内恒有 $f(x)\\ge0$。<b>下列哪些等于 $a^2+b^2$ 的最小值？</b>"
    },
    figureText: {
      en: "An example where it fails: the curve y = ln(x + b) changes sign at x = 1 − b and the line y = x + a at x = −a; between the two zeros the product is negative (shaded).",
      fr: "Un exemple où cela échoue : la courbe y = ln(x + b) change de signe en x = 1 − b et la droite y = x + a en x = −a ; entre les deux zéros le produit est négatif (grisé).",
      es: "Un ejemplo donde falla: la curva y = ln(x + b) cambia de signo en x = 1 − b y la recta y = x + a en x = −a; entre los dos ceros el producto es negativo (sombreado).",
      ja: "うまくいかない例：曲線 y = ln(x + b) は x = 1 − b で、直線 y = x + a は x = −a で符号が変わり、その間で積が負（色付け）。",
      zh: "不满足的例子：曲线 y = ln(x + b) 在 x = 1 − b 处变号，直线 y = x + a 在 x = −a 处变号，两零点之间乘积为负（涂色）。"
    },
    hint: {
      en: "$\\ln(x+b)$ changes sign at $x=1-b$. The factor $x+a$ must change sign at the same place.",
      fr: "$\\ln(x+b)$ change de signe en $x=1-b$. Le facteur $x+a$ doit changer de signe au même endroit.",
      es: "$\\ln(x+b)$ cambia de signo en $x=1-b$. El factor $x+a$ debe cambiar de signo en el mismo punto.",
      ja: "$\\ln(x+b)$ は $x=1-b$ で符号が変わる。$x+a$ も同じ点で変わる必要がある。",
      zh: "$\\ln(x+b)$ 在 $x=1-b$ 处变号，$x+a$ 也必须在同一点变号。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 4.2, scale: 52, pad: 16 });
      const T = F.T = axes(F, -1.4, 4.0, -2.0, 2.2);
      const b = 0.5, a = -2.0;
      F.rect(T([1 - b, 0])[0], T([0, -1.9])[1], -a - (1 - b), 3.9, 'fill-pink', 'fills');
      plot(F, T, x => Math.log(x + b), -b + 0.15, 3.9, 'graph', 'base', -2.0, 2.2);
      plot(F, T, x => x + a, 0.2, 3.9, 'hl blue', 'base', -2.0, 2.2);
      F.dot(T([1 - b, 0])); F.dot(T([-a, 0]));
      F.text(T([1 - b, 0]), '1 − b', 'len small', 22, 14); F.text(T([-a, 0]), '−a', 'len small', 10, 14);
      F.reveal = () => {
      F.text(T([2.6, 1.9]), 'need −a = 1 − b', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "need −a = 1 − b": {"fr": "il faut −a = 1 − b", "es": "hace falta −a = 1 − b", "ja": "−a = 1 − b が必要", "zh": "需 −a = 1 − b"},
      "on": {"fr": "sur", "es": "en", "ja": "区間", "zh": "在"},
      "for": {"fr": "pour", "es": "si", "ja": "ただし", "zh": "当"},
      "must switch sign at the same point:": {"fr": "doit changer de signe au même point :", "es": "debe cambiar de signo en el mismo punto:", "ja": "は同じ点で符号が変わる必要：", "zh": "必须在同一点变号："}
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$a=b-1$, and $(b-1)^2+b^2$ is smallest at $b=\\tfrac12$.",
        fr: "$a=b-1$, and $(b-1)^2+b^2$ is smallest at $b=\\tfrac12$.",
        es: "$a=b-1$, and $(b-1)^2+b^2$ is smallest at $b=\\tfrac12$.",
        ja: "$a=b-1$, and $(b-1)^2+b^2$ is smallest at $b=\\tfrac12$.",
        zh: "$a=b-1$, and $(b-1)^2+b^2$ is smallest at $b=\\tfrac12$."
      } },
      { tex: "0.5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "That is $b^2$ at the minimum, not $a^2+b^2$.",
        fr: "C’est $b^2$ au minimum, pas $a^2+b^2$.",
        es: "Es $b^2$ en el mínimo, no $a^2+b^2$.",
        ja: "最小のときの $b^2$ で、$a^2+b^2$ ではない。",
        zh: "那是最小时的 $b^2$，不是 $a^2+b^2$。"
      } },
      { tex: "\\tfrac18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "E.g. $a=0,\\ b=1$ works, but it is not the smallest.",
        fr: "Par ex. $a=0,\\ b=1$ convient, mais ce n’est pas le minimum.",
        es: "P. ej. $a=0,\\ b=1$ sirve, pero no es el mínimo.",
        ja: "例えば $a=0,\\ b=1$ は条件を満たすが最小ではない。",
        zh: "例如 $a=0,\\ b=1$ 满足条件，但不是最小。"
      } },
      { tex: "0", correct: false, why: {
        en: "$a=b=0$ gives $x\\ln x$, which is negative on $(0,1)$.",
        fr: "$a=b=0$ donne $x\\ln x$, négatif sur $(0,1)$.",
        es: "$a=b=0$ da $x\\ln x$, negativa en $(0,1)$.",
        ja: "$a=b=0$ だと $x\\ln x$ で $(0,1)$ で負。",
        zh: "$a=b=0$ 时 $x\\ln x$ 在 $(0,1)$ 上为负。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{\\sqrt2}{2}", correct: false, why: {
        en: "That is the minimum of $\\sqrt{a^2+b^2}$.",
        fr: "C’est le minimum de $\\sqrt{a^2+b^2}$.",
        es: "Es el mínimo de $\\sqrt{a^2+b^2}$.",
        ja: "$\\sqrt{a^2+b^2}$ の最小値。",
        zh: "那是 $\\sqrt{a^2+b^2}$ 的最小值。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where the logarithm changes sign",
          fr: "Où le logarithme change de signe",
          es: "Dónde cambia de signo el logaritmo",
          ja: "対数の符号が変わる点",
          zh: "对数的变号点"
        },
        lines: ["\\ln(x+b)<0\\ \\text{on}\\ (-b,\\,1-b),\\qquad>0\\ \\text{for}\\ x>1-b"],
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
          en: "Match the line",
          fr: "Accorder la droite",
          es: "Ajustar la recta",
          ja: "直線を合わせる",
          zh: "让直线配合"
        },
        lines: ["x+a\\ \\text{must switch sign at the same point:}\\ -a=1-b"],
        note: {
          en: "Otherwise the product is negative between the two zeros, as in the figure.",
          fr: "Sinon le produit est négatif entre les deux zéros, comme sur la figure.",
          es: "Si no, el producto es negativo entre los dos ceros, como en la figura.",
          ja: "そうでないと図のように2つの零点の間で積が負になる。",
          zh: "否则两零点之间乘积为负，如图。"
        }
      },
      {
        title: {
          en: "Minimise",
          fr: "Minimiser",
          es: "Minimizar",
          ja: "最小化",
          zh: "求最小值"
        },
        lines: ["a^2+b^2=(b-1)^2+b^2=2\\bigl(b-\\tfrac12\\bigr)^2+\\tfrac12\\ \\ge\\ \\boxed{\\tfrac12}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Equality at $b=\\tfrac12$, $a=-\\tfrac12$.",
          fr: "Égalité pour $b=\\tfrac12$, $a=-\\tfrac12$.",
          es: "Igualdad con $b=\\tfrac12$, $a=-\\tfrac12$.",
          ja: "等号は $b=\\tfrac12$、$a=-\\tfrac12$。",
          zh: "当 $b=\\tfrac12$，$a=-\\tfrac12$ 时取等。"
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
