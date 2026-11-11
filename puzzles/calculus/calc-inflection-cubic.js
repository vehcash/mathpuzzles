/* calculus · Where the curve changes its bend
   Inflection point of x³ − 3x² + 2: f'' = 6x − 6 = 0 at (1, 0). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const f = x => x ** 3 - 3 * x * x + 2;

  PuzzleBank.define({
    id: "calc-inflection-cubic",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap", "bac", "ebau"]
    },
    difficulty: 2,
    title: {
      en: "Where the curve changes its bend",
      fr: "Là où la courbe change de courbure",
      es: "Donde la curva cambia de curvatura",
      ja: "曲がり方が変わる点",
      zh: "曲线弯曲方向改变之处"
    },
    statement: {
      en: "Let $f(x) = x^3 - 3x^2 + 2$. <b>Which of the following are true?</b>",
      fr: "Soit $f(x) = x^3 - 3x^2 + 2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x) = x^3 - 3x^2 + 2$. <b>¿Cuáles de las siguientes son verdaderas?</b>",
      ja: "$f(x) = x^3 - 3x^2 + 2$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x) = x^3 - 3x^2 + 2$。<b>下列说法中正确的是？</b>"
    },
    figureText: {
      en: "The graph of x³ − 3x² + 2 with a local maximum at (0, 2), a local minimum at (2, −2) and the point (1, 0) between them.",
      fr: "Le graphe de x³ − 3x² + 2 avec un maximum local en (0, 2), un minimum local en (2, −2) et le point (1, 0) entre les deux.",
      es: "La gráfica de x³ − 3x² + 2 con un máximo local en (0, 2), un mínimo local en (2, −2) y el punto (1, 0) entre ellos.",
      ja: "x³ − 3x² + 2 のグラフ。(0, 2) で極大、(2, −2) で極小、その間に点 (1, 0)。",
      zh: "x³ − 3x² + 2 的图像：(0, 2) 处极大，(2, −2) 处极小，二者之间有点 (1, 0)。"
    },
    hint: {
      en: "Concavity is decided by the sign of $f''$.",
      fr: "La convexité est donnée par le signe de $f''$.",
      es: "La concavidad la decide el signo de $f''$.",
      ja: "凹凸は $f''$ の符号で決まります。",
      zh: "凹凸性由 $f''$ 的符号决定。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example using that a cubic is symmetric about its inflection point), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en utilisant qu’une cubique est symétrique par rapport à son point d’inflexion), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo usando que una cúbica es simétrica respecto de su punto de inflexión), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば3次関数は変曲点について点対称であることを使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如利用三次函数关于拐点中心对称），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 5.4, scale: 42, pad: 18 });
      const T = F.T = axes(F, -1.4, 3.6, -2.7, 2.7);
      plot(F, T, f, -1.1, 3.1, 'graph', 'base', -2.7, 2.7);
      F.dot(T([0, 2])); F.dot(T([2, -2])); F.dot(T([1, 0]));
      F.text(T([1, 0]), '(1, 0)', 'len small', 22, -10);
      return F;
    },
    options: [
      { tex: "(1, 0) \\text{ is an inflection point}", correct: true, why: {
        en: "$f''(x) = 6x - 6$ changes sign at $x = 1$, and $f(1) = 0$.",
        fr: "$f''(x) = 6x - 6$ change de signe en $x = 1$, et $f(1) = 0$.",
        es: "$f''(x) = 6x - 6$ cambia de signo en $x = 1$, y $f(1) = 0$.",
        ja: "$f''(x) = 6x - 6$ は $x = 1$ で符号が変わり、$f(1) = 0$。",
        zh: "$f''(x) = 6x - 6$ 在 $x = 1$ 处变号，且 $f(1) = 0$。"
      } },
      { tex: "f \\text{ is concave up for } x > 1", correct: true, why: {
        en: "$f''(x) = 6(x - 1) > 0$.",
        fr: "$f''(x) = 6(x - 1) > 0$.",
        es: "$f''(x) = 6(x - 1) > 0$.",
        ja: "$f''(x) = 6(x - 1) > 0$.",
        zh: "$f''(x) = 6(x - 1) > 0$."
      } },
      { tex: "f \\text{ is concave up for } x < 1", correct: false, why: {
        en: "There $f'' < 0$: concave down.",
        fr: "Là $f'' < 0$ : concave.",
        es: "Ahí $f'' < 0$: cóncava hacia abajo.",
        ja: "そこでは $f'' < 0$ で上に凸です。",
        zh: "那里 $f'' < 0$：上凸。"
      } },
      { tex: "(0, 2) \\text{ is an inflection point}", correct: false, why: {
        en: "$(0, 2)$ is a local maximum: $f'(0) = 0$, $f''(0) = -6$.",
        fr: "$(0, 2)$ est un maximum local : $f'(0) = 0$, $f''(0) = -6$.",
        es: "$(0, 2)$ es un máximo local: $f'(0) = 0$, $f''(0) = -6$.",
        ja: "$(0, 2)$ は極大：$f'(0) = 0$、$f''(0) = -6$。",
        zh: "$(0, 2)$ 是极大值点：$f'(0) = 0$，$f''(0) = -6$。"
      } },
      { tex: "(1, 2) \\text{ is an inflection point}", correct: false, why: {
        en: "$x = 1$ is right but $f(1) = 1 - 3 + 2 = 0$.",
        fr: "$x = 1$ est juste mais $f(1) = 1 - 3 + 2 = 0$.",
        es: "$x = 1$ es correcto pero $f(1) = 1 - 3 + 2 = 0$.",
        ja: "$x = 1$ は正しいが $f(1) = 1 - 3 + 2 = 0$。",
        zh: "$x = 1$ 对，但 $f(1) = 1 - 3 + 2 = 0$。"
      } },
      { tex: "f \\text{ has a local minimum at } x = 1", correct: false, why: {
        en: "$f'(1) = -3 \\ne 0$; the local minimum is at $x = 2$.",
        fr: "$f'(1) = -3 \\ne 0$ ; le minimum local est en $x = 2$.",
        es: "$f'(1) = -3 \\ne 0$; el mínimo local está en $x = 2$.",
        ja: "$f'(1) = -3 \\ne 0$。極小は $x = 2$ です。",
        zh: "$f'(1) = -3 \\ne 0$；极小值在 $x = 2$。"
      } },
      { tex: "f''(x) = 3x^2 - 6x", correct: false, why: {
        en: "That is $f'(x)$; one more derivative gives $6x - 6$.",
        fr: "C’est $f'(x)$ ; une dérivée de plus donne $6x - 6$.",
        es: "Eso es $f'(x)$; una derivada más da $6x - 6$.",
        ja: "それは $f'(x)$ で、もう一度微分すると $6x - 6$。",
        zh: "那是 $f'(x)$；再求一次导得 $6x - 6$。"
      } },
      { tex: "f \\text{ has no inflection point}", correct: false, why: {
        en: "Every cubic has exactly one inflection point.",
        fr: "Toute cubique a exactement un point d’inflexion.",
        es: "Toda cúbica tiene exactamente un punto de inflexión.",
        ja: "3次関数には必ずちょうど1つの変曲点があります。",
        zh: "每个三次函数恰有一个拐点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two derivatives",
          fr: "Deux dérivées",
          es: "Dos derivadas",
          ja: "2回微分",
          zh: "求两次导"
        },
        lines: ["f'(x) = 3x^2 - 6x, \\qquad f''(x) = 6x - 6"],
        note: {
          en: "$f''$ is negative left of $1$ and positive right of $1$.",
          fr: "$f''$ est négative à gauche de $1$ et positive à droite.",
          es: "$f''$ es negativa a la izquierda de $1$ y positiva a la derecha.",
          ja: "$f''$ は $1$ の左で負、右で正。",
          zh: "$f''$ 在 $1$ 左侧为负，右侧为正。"
        }
      },
      {
        title: {
          en: "The inflection point",
          fr: "Le point d’inflexion",
          es: "El punto de inflexión",
          ja: "変曲点",
          zh: "拐点"
        },
        lines: ["f(1) = 1 - 3 + 2 = 0 \\ \\Rightarrow\\ \\boxed{(1, 0)}"],
        note: {
          en: "It is the midpoint of the maximum $(0, 2)$ and the minimum $(2, -2)$: a cubic is symmetric about it.",
          fr: "C’est le milieu du maximum $(0, 2)$ et du minimum $(2, -2)$ : la cubique est symétrique par rapport à lui.",
          es: "Es el punto medio del máximo $(0, 2)$ y el mínimo $(2, -2)$: la cúbica es simétrica respecto de él.",
          ja: "極大 $(0, 2)$ と極小 $(2, -2)$ の中点で、3次関数はこの点について対称です。",
          zh: "它是极大点 $(0, 2)$ 与极小点 $(2, -2)$ 的中点：三次函数关于它对称。"
        },
        fig(F) { F.fadeIn(F.circle(F.T([1, 0]), 0.2, 'halo', 'over'), 500); }
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
          en: "Two statements are true.",
          fr: "Deux affirmations sont vraies.",
          es: "Dos afirmaciones son verdaderas.",
          ja: "正しい記述は2つです。",
          zh: "有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
