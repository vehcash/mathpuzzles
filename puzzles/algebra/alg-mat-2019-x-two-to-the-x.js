/* algebra · x·2ˣ = y·2ʸ
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2019-x-two-to-the-x",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2019 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "x·2ˣ = y·2ʸ",
      fr: "x·2ˣ = y·2ʸ",
      es: "x·2ˣ = y·2ʸ",
      ja: "x·2ˣ = y·2ʸ",
      zh: "x·2ˣ = y·2ʸ"
    },
    statement: {
      en: "<b>Which of the following equal the number of pairs of real numbers $0<x<y$ with $x\\cdot2^x=y\\cdot2^y$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de couples de réels $0<x<y$ tels que $x\\cdot2^x=y\\cdot2^y$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de pares de reales $0<x<y$ con $x\\cdot2^x=y\\cdot2^y$?</b>",
      ja: "<b>$x\\cdot2^x=y\\cdot2^y$ を満たす実数の組 $0<x<y$ の個数に等しいものはどれですか？</b>",
      zh: "<b>满足 $x\\cdot2^x=y\\cdot2^y$ 的实数对 $0<x<y$ 的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "Axes for the function g(t) = t·2ᵗ with t > 0. Its graph is drawn in the solution.",
      fr: "Axes pour la fonction g(t) = t·2ᵗ avec t > 0. Sa courbe est tracée dans la solution.",
      es: "Ejes para la función g(t) = t·2ᵗ con t > 0. Su gráfica se dibuja en la solución.",
      ja: "t > 0 の関数 g(t) = t·2ᵗ の座標軸。グラフは解答で描きます。",
      zh: "t > 0 时函数 g(t) = t·2ᵗ 的坐标轴。图像在解答中画出。"
    },
    hint: {
      en: "Is $t\\mapsto t\\cdot2^t$ one-to-one for $t>0$?",
      fr: "$t\\mapsto t\\cdot2^t$ est-elle injective pour $t>0$ ?",
      es: "¿Es $t\\mapsto t\\cdot2^t$ inyectiva para $t>0$?",
      ja: "$t>0$ で $t\\mapsto t\\cdot2^t$ は1対1？",
      zh: "$t>0$ 时 $t\\mapsto t\\cdot2^t$ 是一一的吗？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.6, scale: 64, pad: 18 });
      const T = F.T = axes(F, -0.3, 3.1, -0.3, 3.3, { xl: 't' });
      F.text(T([1.5, 2.9]), 'g(t) = t·2ᵗ', 'len small', 0, 0);
      F.reveal = () => {
      plot(F, T, t => t * Math.pow(2, t) / 2, 0, 2.15, 'graph', 'base', -0.3, 3.2);
      F.seg(T([0, 1.5]), T([2.9, 1.5]), 'seg thin dashc');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "pairs": {"fr": "couples", "es": "pares", "ja": "組", "zh": "对"}
    },
    options: [
      { tex: "0", correct: true, why: {
        en: "Both factors increase, so the product is strictly increasing.",
        fr: "Les deux facteurs croissent : le produit est strictement croissant.",
        es: "Ambos factores crecen: el producto es estrictamente creciente.",
        ja: "2つの因子とも増加なので積は狭義増加。",
        zh: "两因子都递增，积严格递增。"
      } },
      { tex: "\\#\\{t>0:\\ (t\\,2^t)'=0\\}", correct: true, why: {
        en: "$(t2^t)'=2^t(1+t\\ln2)>0$: never zero, so also $0$.",
        fr: "$(t2^t)'=2^t(1+t\\ln2)>0$ : jamais nul, donc $0$ aussi.",
        es: "$(t2^t)'=2^t(1+t\\ln2)>0$: nunca cero, así que también $0$.",
        ja: "$(t2^t)'=2^t(1+t\\ln2)>0$ で 0 にならないので $0$ 個。",
        zh: "$(t2^t)'=2^t(1+t\\ln2)>0$，从不为零，也是 $0$。"
      } },
      { tex: "1", correct: false, why: {
        en: "For negative $t$ there would be pairs, but here $x>0$.",
        fr: "Pour $t<0$ il y aurait des couples, mais ici $x>0$.",
        es: "Para $t<0$ habría pares, pero aquí $x>0$.",
        ja: "$t<0$ なら組があるが、ここでは $x>0$。",
        zh: "若 $t<0$ 会有，但这里 $x>0$。"
      } },
      { tex: "2", correct: false, why: {
        en: "No two positive values share a $t2^t$.",
        fr: "Deux valeurs positives n’ont jamais le même $t2^t$.",
        es: "Dos valores positivos nunca comparten $t2^t$.",
        ja: "正の2値で $t2^t$ が等しくなることはない。",
        zh: "两个正数的 $t2^t$ 不会相等。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "That would need values below $0$, near the minimum of $t2^t$.",
        fr: "Cela arrive pour des valeurs négatives, pas ici.",
        es: "Eso ocurre con valores negativos, no aquí.",
        ja: "負の値の場合で、ここではない。",
        zh: "那是负值的情形，不在此。"
      } },
      { tex: "(x,y)=(1,2)", correct: false, why: {
        en: "$2\\ne8$.",
        fr: "$2\\ne8$.",
        es: "$2\\ne8$.",
        ja: "$2\\ne8$.",
        zh: "$2\\ne8$."
      } },
      { tex: "(x,y)=\\left(\\tfrac12,1\\right)", correct: false, why: {
        en: "$\\tfrac{\\sqrt2}{2}\\ne2$.",
        fr: "$\\tfrac{\\sqrt2}{2}\\ne2$.",
        es: "$\\tfrac{\\sqrt2}{2}\\ne2$.",
        ja: "$\\tfrac{\\sqrt2}{2}\\ne2$.",
        zh: "$\\tfrac{\\sqrt2}{2}\\ne2$."
      } },
      { tex: "3", correct: false, why: {
        en: "There are none.",
        fr: "Il n’y en a aucun.",
        es: "No hay ninguno.",
        ja: "1つもない。",
        zh: "一个也没有。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Monotonic",
          fr: "Monotone",
          es: "Monótona",
          ja: "単調",
          zh: "单调"
        },
        lines: ["g(t)=t\\,2^t,\\quad g'(t)=2^t(1+t\\ln2)>0\\ \\ (t>0)"],
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
          en: "So no pairs",
          fr: "Donc aucun couple",
          es: "Así que no hay pares",
          ja: "よって組はない",
          zh: "所以没有"
        },
        lines: ["0<x<y\\Rightarrow g(x)<g(y)\\;\\Rightarrow\\;\\boxed{0}\\ \\text{pairs}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "For negative values $g$ has a minimum at $t=-\\tfrac{1}{\\ln2}$ and pairs would exist.",
          fr: "Pour des valeurs négatives, $g$ a un minimum en $t=-\\tfrac{1}{\\ln2}$ et des couples existeraient.",
          es: "Para valores negativos $g$ tiene un mínimo en $t=-\\tfrac{1}{\\ln2}$ y habría pares.",
          ja: "負の値では $t=-\\tfrac{1}{\\ln2}$ で最小となり組が存在する。",
          zh: "负值时 $g$ 在 $t=-\\tfrac{1}{\\ln2}$ 处取最小，会有解对。"
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
