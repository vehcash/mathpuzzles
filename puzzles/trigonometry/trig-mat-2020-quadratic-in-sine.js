/* trigonometry · A quadratic hiding in sine
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2020-quadratic-in-sine",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1D",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1D",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1D",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1D",
        zh: "牛津大学数学入学考试 MAT 2020 第 1D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A quadratic hiding in sine",
      fr: "Une quadratique cachée dans un sinus",
      es: "Una cuadrática escondida en el seno",
      ja: "sin に隠れた2次式",
      zh: "藏在正弦里的二次式"
    },
    statement: {
      en: "<b>Which of the following equal the largest value of $3\\cos^2x+2\\sin x+1$ over all real $x$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à la plus grande valeur de $3\\cos^2x+2\\sin x+1$ pour $x$ réel ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al mayor valor de $3\\cos^2x+2\\sin x+1$ para $x$ real?</b>",
      ja: "<b>実数 $x$ に対する $3\\cos^2x+2\\sin x+1$ の最大値に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $3\\cos^2x+2\\sin x+1$（$x$ 为实数）的最大值？</b>"
    },
    figureText: {
      en: "The parabola 4 + 2s − 3s² drawn for s = sin x between −1 and 1, with its top at s = 1/3.",
      fr: "La parabole 4 + 2s − 3s² tracée pour s = sin x entre −1 et 1, avec son sommet en s = 1/3.",
      es: "La parábola 4 + 2s − 3s² dibujada para s = sen x entre −1 y 1, con su vértice en s = 1/3.",
      ja: "s = sin x として −1 から 1 で描いた放物線 4 + 2s − 3s²。頂点は s = 1/3。",
      zh: "令 s = sin x，在 −1 到 1 上画出抛物线 4 + 2s − 3s²，顶点在 s = 1/3。"
    },
    hint: {
      en: "Replace $\\cos^2x$ by $1-\\sin^2x$ and call $\\sin x=s$.",
      fr: "Remplacez $\\cos^2x$ par $1-\\sin^2x$ et posez $\\sin x=s$.",
      es: "Cambia $\\cos^2x$ por $1-\\sin^2x$ y llama $\\sin x=s$.",
      ja: "$\\cos^2x$ を $1-\\sin^2x$ にし、$\\sin x=s$ とおきます。",
      zh: "把 $\\cos^2x$ 换成 $1-\\sin^2x$，并令 $\\sin x=s$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.6, scale: 60, pad: 18 });
      const T = F.T = axes(F, -1.4, 1.6, -0.8, 2.8, { xl: 's' });
      const g = s => (4 + 2 * s - 3 * s * s) / 2;
      plot(F, T, g, -1, 1, 'graph');
      F.seg(T([-1, 0]), T([-1, g(-1)]), 'seg thin'); F.seg(T([1, 0]), T([1, g(1)]), 'seg thin');
      F.text(T([-1, 0]), '−1', 'tick', -12, -10); F.text(T([1, 0]), '1', 'tick', 10, 12);
      F.dot(T([1 / 3, g(1 / 3)])); F.text(T([1 / 3, g(1 / 3)]), '13/3', 'len small', 0, -14);
      return F;
    },
    options: [
      { tex: "\\tfrac{13}{3}", correct: true, why: {
        en: "$4+2s-3s^2$ peaks at $s=\\tfrac13$, which $\\sin x$ can take.",
        fr: "$4+2s-3s^2$ est maximal en $s=\\tfrac13$, valeur atteinte par $\\sin x$.",
        es: "$4+2s-3s^2$ es máxima en $s=\\tfrac13$, valor que toma $\\sin x$.",
        ja: "$4+2s-3s^2$ は $s=\\tfrac13$ で最大で、$\\sin x$ はその値をとれる。",
        zh: "$4+2s-3s^2$ 在 $s=\\tfrac13$ 处最大，$\\sin x$ 可取到该值。"
      } },
      { tex: "4+\\tfrac13", correct: true, why: {
        en: "The same number: $4+\\tfrac23-\\tfrac13$.",
        fr: "Le même nombre : $4+\\tfrac23-\\tfrac13$.",
        es: "El mismo número: $4+\\tfrac23-\\tfrac13$.",
        ja: "同じ数：$4+\\tfrac23-\\tfrac13$。",
        zh: "同一个数：$4+\\tfrac23-\\tfrac13$。"
      } },
      { tex: "6", correct: false, why: {
        en: "Maximising each term separately: they cannot peak at the same $x$.",
        fr: "Maximise chaque terme séparément : ils ne culminent pas au même $x$.",
        es: "Maximiza cada término por separado: no alcanzan el máximo en el mismo $x$.",
        ja: "各項を別々に最大化しても同じ $x$ にはならない。",
        zh: "分别求各项最大值，但它们不在同一个 $x$ 取到。"
      } },
      { tex: "4", correct: false, why: {
        en: "The value at $\\sin x=0$, not the top.",
        fr: "La valeur pour $\\sin x=0$, pas le maximum.",
        es: "El valor para $\\sin x=0$, no el máximo.",
        ja: "$\\sin x=0$ での値で最大ではない。",
        zh: "那是 $\\sin x=0$ 时的值，不是最大值。"
      } },
      { tex: "3", correct: false, why: {
        en: "The value at $\\sin x=1$.",
        fr: "La valeur pour $\\sin x=1$.",
        es: "El valor para $\\sin x=1$.",
        ja: "$\\sin x=1$ での値。",
        zh: "那是 $\\sin x=1$ 时的值。"
      } },
      { tex: "\\tfrac{14}{3}", correct: false, why: {
        en: "Arithmetic slip at the vertex.",
        fr: "Erreur de calcul au sommet.",
        es: "Error de cálculo en el vértice.",
        ja: "頂点での計算ミス。",
        zh: "顶点处计算出错。"
      } },
      { tex: "5", correct: false, why: {
        en: "Too big: $4+2s-3s^2\\le\\tfrac{13}{3}$.",
        fr: "Trop grand : $4+2s-3s^2\\le\\tfrac{13}{3}$.",
        es: "Demasiado grande: $4+2s-3s^2\\le\\tfrac{13}{3}$.",
        ja: "大きすぎ：$4+2s-3s^2\\le\\tfrac{13}{3}$。",
        zh: "太大：$4+2s-3s^2\\le\\tfrac{13}{3}$。"
      } },
      { tex: "-1", correct: false, why: {
        en: "That is the smallest value, at $\\sin x=-1$.",
        fr: "C’est la plus petite valeur, en $\\sin x=-1$.",
        es: "Es el menor valor, en $\\sin x=-1$.",
        ja: "それは最小値（$\\sin x=-1$）。",
        zh: "那是最小值（$\\sin x=-1$）。"
      } }
    ],
    steps: [
      {
        title: {
          en: "One variable",
          fr: "Une seule variable",
          es: "Una sola variable",
          ja: "1変数にする",
          zh: "化为一个变量"
        },
        lines: ["3(1-s^2)+2s+1=4+2s-3s^2,\\qquad s=\\sin x\\in[-1,1]"],
        note: {
          en: "Now it is a downward parabola in $s$.",
          fr: "C’est maintenant une parabole tournée vers le bas en $s$.",
          es: "Ahora es una parábola hacia abajo en $s$.",
          ja: "$s$ の上に凸な放物線になる。",
          zh: "现在是关于 $s$ 的开口向下的抛物线。"
        }
      },
      {
        title: {
          en: "Complete the square",
          fr: "Forme canonique",
          es: "Completar el cuadrado",
          ja: "平方完成",
          zh: "配方"
        },
        lines: ["4+2s-3s^2=\\tfrac{13}{3}-3\\left(s-\\tfrac13\\right)^2\\le\\boxed{\\tfrac{13}{3}}"],
        note: {
          en: "Equality when $\\sin x=\\tfrac13$, which happens for some $x$.",
          fr: "Égalité quand $\\sin x=\\tfrac13$, ce qui arrive pour un certain $x$.",
          es: "Igualdad cuando $\\sin x=\\tfrac13$, lo que ocurre para algún $x$.",
          ja: "$\\sin x=\\tfrac13$ のとき等号で、そのような $x$ はある。",
          zh: "当 $\\sin x=\\tfrac13$ 时取等号，这样的 $x$ 存在。"
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
