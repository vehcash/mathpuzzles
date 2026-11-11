/* trigonometry · The highest wave
   a sin x + b cos x = √(a² + b²) sin(x + φ), so its maximum is √(a² + b²). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => 3 * Math.sin(x) + 4 * Math.cos(x);

  PuzzleBank.define({
    id: "trig-max-a-sin-b-cos",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "kyotsu", "alevel"]
    },
    difficulty: 1,
    title: {
      en: "The highest wave",
      fr: "La plus haute vague",
      es: "La ola más alta",
      ja: "一番高い波",
      zh: "最高的波"
    },
    statement: {
      en: "<b>Which of the following equal the maximum value of $f(x) = 3\\sin x + 4\\cos x$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au maximum de $f(x) = 3\\sin x + 4\\cos x$ ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al valor máximo de $f(x) = 3\\sin x + 4\\cos x$?</b>",
      ja: "<b>次のうち $f(x) = 3\\sin x + 4\\cos x$ の最大値に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $f(x) = 3\\sin x + 4\\cos x$ 的最大值？</b>"
    },
    figureText: {
      en: "The graph of f(x) = 3 sin x + 4 cos x over one period. Its highest and lowest levels are marked in the solution.",
      fr: "La courbe de f(x) = 3 sin x + 4 cos x sur une période. Ses niveaux extrêmes sont marqués dans la solution.",
      es: "La gráfica de f(x) = 3 sen x + 4 cos x en un periodo. Sus niveles máximo y mínimo se marcan en la solución.",
      ja: "1周期分の f(x) = 3 sin x + 4 cos x のグラフ。最高・最低の値は解答で示します。",
      zh: "f(x) = 3 sin x + 4 cos x 一个周期的图像。最高与最低值在解答中标出。"
    },
    hint: {
      en: "Write $3\\sin x + 4\\cos x = R\\sin(x + \\varphi)$ with $R = \\sqrt{3^2 + 4^2}$.",
      fr: "Écrivez $3\\sin x + 4\\cos x = R\\sin(x + \\varphi)$ avec $R = \\sqrt{3^2 + 4^2}$.",
      es: "Escribe $3\\sin x + 4\\cos x = R\\sin(x + \\varphi)$ con $R = \\sqrt{3^2 + 4^2}$.",
      ja: "$3\\sin x + 4\\cos x = R\\sin(x + \\varphi)$、$R = \\sqrt{3^2 + 4^2}$ と書きます。",
      zh: "写成 $3\\sin x + 4\\cos x = R\\sin(x + \\varphi)$，其中 $R = \\sqrt{3^2 + 4^2}$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the Cauchy–Schwarz inequality, or setting the derivative to zero), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple l’inégalité de Cauchy–Schwarz, ou en annulant la dérivée), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo la desigualdad de Cauchy–Schwarz, o anulando la derivada), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えばコーシー・シュワルツの不等式、または導関数を 0 とおく）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如柯西–施瓦茨不等式，或令导数为零），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 12, scale: 24, pad: 18 });
      const T = F.T = axes(F, -0.4, 6.6, -5.6, 6.4);
      plot(F, T, f, 0, 6.4);
      F.reveal = () => {
        F.seg(T([0, 5]), T([6.4, 5]), 'seg thin'); F.seg(T([0, -5]), T([6.4, -5]), 'seg thin');
        F.text(T([0, 5]), '5', 'len small', -10, 0); F.text(T([0, -5]), '−5', 'len small', -14, 0);
      };
      return F;
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "$\\sqrt{9 + 16} = 5$, reached when $\\sin(x + \\varphi) = 1$.",
        fr: "$\\sqrt{9 + 16} = 5$, atteint quand $\\sin(x + \\varphi) = 1$.",
        es: "$\\sqrt{9 + 16} = 5$, alcanzado cuando $\\sin(x + \\varphi) = 1$.",
        ja: "$\\sqrt{9 + 16} = 5$。$\\sin(x + \\varphi) = 1$ のとき。",
        zh: "$\\sqrt{9 + 16} = 5$，在 $\\sin(x + \\varphi) = 1$ 时取到。"
      } },
      { tex: "\\sqrt{3^2 + 4^2}", correct: true, why: {
        en: "The same number, written as the amplitude formula.",
        fr: "Le même nombre, écrit comme la formule de l’amplitude.",
        es: "El mismo número, escrito como la fórmula de la amplitud.",
        ja: "同じ数を振幅の公式で書いたもの。",
        zh: "同一个数，写成振幅公式。"
      } },
      { tex: "7", correct: false, why: {
        en: "$3 + 4$: $\\sin x$ and $\\cos x$ cannot both equal $1$ at the same $x$.",
        fr: "$3 + 4$ : $\\sin x$ et $\\cos x$ ne valent pas $1$ en même temps.",
        es: "$3 + 4$: $\\sin x$ y $\\cos x$ no valen $1$ a la vez.",
        ja: "$3 + 4$：$\\sin x$ と $\\cos x$ が同時に $1$ になることはありません。",
        zh: "$3 + 4$：$\\sin x$ 和 $\\cos x$ 不能同时等于 $1$。"
      } },
      { tex: "4", correct: false, why: {
        en: "$f(0) = 4$, but that is not the top of the wave.",
        fr: "$f(0) = 4$, mais ce n’est pas le sommet.",
        es: "$f(0) = 4$, pero no es la cima de la onda.",
        ja: "$f(0) = 4$ ですが、波の頂上ではありません。",
        zh: "$f(0) = 4$，但不是波峰。"
      } },
      { tex: "25", correct: false, why: {
        en: "$3^2 + 4^2$ — the square root is missing.",
        fr: "$3^2 + 4^2$ — il manque la racine.",
        es: "$3^2 + 4^2$ — falta la raíz.",
        ja: "$3^2 + 4^2$ — 平方根を忘れています。",
        zh: "$3^2 + 4^2$ —— 少了开方。"
      } },
      { tex: "1", correct: false, why: {
        en: "The maximum of $\\sin(x + \\varphi)$ alone, without the factor $5$.",
        fr: "Le maximum de $\\sin(x + \\varphi)$ seul, sans le facteur $5$.",
        es: "El máximo de $\\sin(x + \\varphi)$ solo, sin el factor $5$.",
        ja: "係数 $5$ のない $\\sin(x + \\varphi)$ の最大値です。",
        zh: "只是 $\\sin(x + \\varphi)$ 的最大值，少了因子 $5$。"
      } },
      { tex: "12", correct: false, why: {
        en: "$3\\cdot 4$ has nothing to do with the amplitude.",
        fr: "$3\\cdot 4$ n’a rien à voir avec l’amplitude.",
        es: "$3\\cdot 4$ no tiene que ver con la amplitud.",
        ja: "$3\\cdot 4$ は振幅とは関係ありません。",
        zh: "$3\\cdot 4$ 与振幅无关。"
      } },
      { tex: "\\tfrac72\\sqrt2", correct: false, why: {
        en: "The value at $x = 45^\\circ$ — not the maximum.",
        fr: "La valeur en $x = 45^\\circ$ — pas le maximum.",
        es: "El valor en $x = 45^\\circ$ — no el máximo.",
        ja: "$x = 45^\\circ$ での値で、最大値ではありません。",
        zh: "$x = 45^\\circ$ 时的值，不是最大值。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Combine into one sine",
          fr: "Regrouper en un seul sinus",
          es: "Juntar en un solo seno",
          ja: "1つの sin にまとめる",
          zh: "合成为一个正弦"
        },
        lines: ["3\\sin x + 4\\cos x = 5\\left(\\tfrac35\\sin x + \\tfrac45\\cos x\\right) = 5\\sin(x + \\varphi)", "\\cos\\varphi = \\tfrac35,\\ \\sin\\varphi = \\tfrac45"],
        note: {
          en: "$\\left(\\tfrac35\\right)^2 + \\left(\\tfrac45\\right)^2 = 1$, so these are the cosine and sine of an angle.",
          fr: "$\\left(\\tfrac35\\right)^2 + \\left(\\tfrac45\\right)^2 = 1$ : ce sont le cosinus et le sinus d’un angle.",
          es: "$\\left(\\tfrac35\\right)^2 + \\left(\\tfrac45\\right)^2 = 1$: son el coseno y el seno de un ángulo.",
          ja: "$\\left(\\tfrac35\\right)^2 + \\left(\\tfrac45\\right)^2 = 1$ なので、ある角の cos と sin です。",
          zh: "$\\left(\\tfrac35\\right)^2 + \\left(\\tfrac45\\right)^2 = 1$，所以它们是某个角的余弦和正弦。"
        }
      },
      {
        title: {
          en: "Read off the maximum",
          fr: "Lire le maximum",
          es: "Leer el máximo",
          ja: "最大値を読み取る",
          zh: "读出最大值"
        },
        lines: ["-5 \\le 5\\sin(x + \\varphi) \\le 5 \\ \\Rightarrow\\ \\max f = \\boxed{5}"],
        note: {
          en: "The amplitude is $\\sqrt{a^2 + b^2}$.",
          fr: "L’amplitude est $\\sqrt{a^2 + b^2}$.",
          es: "La amplitud es $\\sqrt{a^2 + b^2}$.",
          ja: "振幅は $\\sqrt{a^2 + b^2}$ です。",
          zh: "振幅为 $\\sqrt{a^2 + b^2}$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.draw(F.seg(F.T([0, 5]), F.T([6.4, 5]), 'hl yellow', 'over'), 700); }
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
