/* calculus · Infinity minus infinity
   lim (√(n² + n) − n) = 1/2 by multiplying by the conjugate. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const a = n => Math.sqrt(n * n + n) - n;

  PuzzleBank.define({
    id: "calc-limit-sqrt-difference",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ebau", "bac"]
    },
    difficulty: 2,
    title: {
      en: "Infinity minus infinity",
      fr: "L’infini moins l’infini",
      es: "Infinito menos infinito",
      ja: "無限大引く無限大",
      zh: "无穷减无穷"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\lim_{n\\to\\infty}\\left(\\sqrt{n^2 + n} - n\\right)$?</b>",
      fr: "<b>Lesquelles des expressions suivantes sont égales à $\\displaystyle\\lim_{n\\to\\infty}\\left(\\sqrt{n^2 + n} - n\\right)$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales a $\\displaystyle\\lim_{n\\to\\infty}\\left(\\sqrt{n^2 + n} - n\\right)$?</b>",
      ja: "<b>次のうち $\\displaystyle\\lim_{n\\to\\infty}\\left(\\sqrt{n^2 + n} - n\\right)$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\lim_{n\\to\\infty}\\left(\\sqrt{n^2 + n} - n\\right)$？</b>"
    },
    figureText: {
      en: "The first terms of the sequence as dots. The level they approach is marked in the solution.",
      fr: "Les premiers termes de la suite en points. Le niveau dont ils s’approchent est marqué dans la solution.",
      es: "Los primeros términos de la sucesión como puntos. El nivel al que se acercan se marca en la solución.",
      ja: "数列の最初の項を点で表示。近づく値は解答で示します。",
      zh: "数列前几项以点表示。趋近的值在解答中标出。"
    },
    hint: {
      en: "Multiply and divide by $\\sqrt{n^2 + n} + n$.",
      fr: "Multipliez et divisez par $\\sqrt{n^2 + n} + n$.",
      es: "Multiplica y divide por $\\sqrt{n^2 + n} + n$.",
      ja: "$\\sqrt{n^2 + n} + n$ をかけて割ります。",
      zh: "分子分母同乘 $\\sqrt{n^2 + n} + n$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example with the expansion √(1 + h) ≈ 1 + h/2), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec le développement √(1 + h) ≈ 1 + h/2), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con el desarrollo √(1 + h) ≈ 1 + h/2), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば √(1 + h) ≈ 1 + h/2 の近似を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用近似 √(1 + h) ≈ 1 + h/2），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 3, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.4, 6.6, -0.3, 2.7, { xl: 'n' });
      for (let n = 1; n <= 12; n++) F.dot(T([n / 2, 4 * a(n)]));
      F.reveal = () => {
        F.seg(T([0, 2]), T([6.4, 2]), 'seg thin');
        F.text(T([0, 2]), '1/2', 'len small', -16, 0);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$\\frac{n}{\\sqrt{n^2 + n} + n} = \\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac12$.",
        fr: "$\\frac{n}{\\sqrt{n^2 + n} + n} = \\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac12$.",
        es: "$\\frac{n}{\\sqrt{n^2 + n} + n} = \\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac12$.",
        ja: "$\\frac{n}{\\sqrt{n^2 + n} + n} = \\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac12$.",
        zh: "$\\frac{n}{\\sqrt{n^2 + n} + n} = \\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac12$."
      } },
      { tex: "\\lim_{n\\to\\infty}\\frac{n}{\\sqrt{n^2 + n} + n}", correct: true, why: {
        en: "The same limit after multiplying by the conjugate.",
        fr: "La même limite après multiplication par le conjugué.",
        es: "El mismo límite tras multiplicar por el conjugado.",
        ja: "共役をかけた後の同じ極限。",
        zh: "乘以共轭后的同一极限。"
      } },
      { tex: "0", correct: false, why: {
        en: "“$\\sqrt{n^2 + n} \\approx n$” is too rough: the difference does not vanish.",
        fr: "« $\\sqrt{n^2 + n} \\approx n$ » est trop grossier : la différence ne s’annule pas.",
        es: "«$\\sqrt{n^2 + n} \\approx n$» es demasiado burdo: la diferencia no se anula.",
        ja: "「$\\sqrt{n^2 + n} \\approx n$」は粗すぎ、差は 0 になりません。",
        zh: "“$\\sqrt{n^2 + n} \\approx n$”太粗糙：差并不趋于零。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "Both terms grow, but their difference stays below $\\tfrac12$.",
        fr: "Les deux termes croissent, mais leur différence reste sous $\\tfrac12$.",
        es: "Ambos términos crecen, pero su diferencia queda por debajo de $\\tfrac12$.",
        ja: "両方の項は大きくなりますが、差は $\\tfrac12$ 未満です。",
        zh: "两项都增大，但差始终小于 $\\tfrac12$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Forgot that the denominator is about $2n$, not $n$.",
        fr: "Le dénominateur vaut environ $2n$, pas $n$.",
        es: "El denominador es aproximadamente $2n$, no $n$.",
        ja: "分母はおよそ $n$ ではなく $2n$ です。",
        zh: "分母约为 $2n$，不是 $n$。"
      } },
      { tex: "2", correct: false, why: {
        en: "Upside down.",
        fr: "À l’envers.",
        es: "Al revés.",
        ja: "逆数になっています。",
        zh: "倒过来了。"
      } },
      { tex: "\\sqrt2 - 1", correct: false, why: {
        en: "That is the first term $a_1$, not the limit.",
        fr: "C’est le premier terme $a_1$, pas la limite.",
        es: "Es el primer término $a_1$, no el límite.",
        ja: "最初の項 $a_1$ で、極限ではありません。",
        zh: "那是第一项 $a_1$，不是极限。"
      } },
      { tex: "-\\tfrac12", correct: false, why: {
        en: "$\\sqrt{n^2 + n} > n$, so every term is positive.",
        fr: "$\\sqrt{n^2 + n} > n$ : tous les termes sont positifs.",
        es: "$\\sqrt{n^2 + n} > n$: todos los términos son positivos.",
        ja: "$\\sqrt{n^2 + n} > n$ なので各項は正です。",
        zh: "$\\sqrt{n^2 + n} > n$，每一项都为正。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Multiply by the conjugate",
          fr: "Multiplier par le conjugué",
          es: "Multiplicar por el conjugado",
          ja: "共役をかける",
          zh: "乘以共轭"
        },
        lines: ["\\sqrt{n^2 + n} - n = \\frac{(n^2 + n) - n^2}{\\sqrt{n^2 + n} + n} = \\frac{n}{\\sqrt{n^2 + n} + n}"],
        note: {
          en: "$(a - b)(a + b) = a^2 - b^2$ removes the square root from the top.",
          fr: "$(a - b)(a + b) = a^2 - b^2$ fait disparaître la racine du numérateur.",
          es: "$(a - b)(a + b) = a^2 - b^2$ elimina la raíz del numerador.",
          ja: "$(a - b)(a + b) = a^2 - b^2$ で分子の根号が消えます。",
          zh: "$(a - b)(a + b) = a^2 - b^2$ 消去分子的根号。"
        }
      },
      {
        title: {
          en: "Divide by n",
          fr: "Diviser par n",
          es: "Dividir entre n",
          ja: "n で割る",
          zh: "除以 n"
        },
        lines: ["\\frac{1}{\\sqrt{1 + \\frac1n} + 1} \\to \\frac{1}{1 + 1} = \\boxed{\\tfrac12}"],
        note: {
          en: "The dots in the figure creep up to $\\tfrac12$.",
          fr: "Les points de la figure montent vers $\\tfrac12$.",
          es: "Los puntos de la figura suben hacia $\\tfrac12$.",
          ja: "図の点は $\\tfrac12$ に近づいていきます。",
          zh: "图中的点逐渐逼近 $\\tfrac12$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.draw(F.seg(F.T([0, 2]), F.T([6.4, 2]), 'hl yellow', 'over'), 700); }
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
