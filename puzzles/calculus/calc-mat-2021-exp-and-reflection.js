/* calculus · eˣ and its upside-down copy
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2021-exp-and-reflection",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1D",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1D",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1D",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1D",
        zh: "牛津大学数学入学考试 MAT 2021 第 1D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "eˣ and its upside-down copy",
      fr: "eˣ et sa copie renversée",
      es: "eˣ y su copia invertida",
      ja: "eˣ と逆さまのコピー",
      zh: "eˣ 与它的倒影"
    },
    statement: {
      en: "<b>Which of the following equal the area of the region enclosed by $y=e^x$, $y=1-e^x$ and the $y$-axis?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à l’aire de la région délimitée par $y=e^x$, $y=1-e^x$ et l’axe des $y$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al área de la región encerrada por $y=e^x$, $y=1-e^x$ y el eje $y$?</b>",
      ja: "<b>$y=e^x$、$y=1-e^x$ と $y$ 軸で囲まれた部分の面積に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于由 $y=e^x$、$y=1-e^x$ 与 $y$ 轴围成区域的面积？</b>"
    },
    figureText: {
      en: "The curves y = eˣ and y = 1 − eˣ, with the region between them and the y-axis shaded.",
      fr: "Les courbes y = eˣ et y = 1 − eˣ, avec la région entre elles et l’axe des y grisée.",
      es: "Las curvas y = eˣ e y = 1 − eˣ, con la región entre ellas y el eje y sombreada.",
      ja: "曲線 y = eˣ と y = 1 − eˣ、それらと y 軸の間に色付け。",
      zh: "曲线 y = eˣ 与 y = 1 − eˣ，它们与 y 轴之间的区域涂色。"
    },
    hint: {
      en: "They meet where $e^x=\\tfrac12$. Between there and $x=0$, which curve is on top?",
      fr: "Elles se coupent où $e^x=\\tfrac12$. Entre ce point et $x=0$, laquelle est au-dessus ?",
      es: "Se cortan donde $e^x=\\tfrac12$. Entre ese punto y $x=0$, ¿cuál está arriba?",
      ja: "$e^x=\\tfrac12$ で交わる。そこから $x=0$ まで、上にあるのはどちら？",
      zh: "它们在 $e^x=\\tfrac12$ 处相交。从那里到 $x=0$，哪条在上方？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.4, scale: 70, pad: 18 });
      const T = F.T = axes(F, -2.6, 1.6, -1.0, 2.4);
      const x0 = -Math.log(2), q = [];
      for (let k = 0; k <= 40; k++) { const x = x0 * (1 - k / 40); q.push(T([x, Math.exp(x)])); }
      for (let k = 0; k <= 40; k++) { const x = x0 * k / 40; q.push(T([x, 1 - Math.exp(x)])); }
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, Math.exp, -2.5, 0.75, 'graph');
      plot(F, T, x => 1 - Math.exp(x), -2.5, 0.6, 'graph');
      F.text(T([0.75, Math.exp(0.75)]), 'eˣ', 'len small', 12, 0); F.text(T([0.6, 1 - Math.exp(0.6)]), '1 − eˣ', 'len small', 26, 0);
      F.reveal = () => {
      F.dot(T([x0, 0.5])); F.text(T([x0, 0.5]), '−ln 2', 'len small', 0, 24);
      };
      return F;
    },
    options: [
      { tex: "1-\\ln2", correct: true, why: {
        en: "$\\int_{-\\ln2}^0(2e^x-1)\\,dx=1-\\ln2\\approx0.31$.",
        fr: "$\\int_{-\\ln2}^0(2e^x-1)\\,dx=1-\\ln2\\approx0.31$.",
        es: "$\\int_{-\\ln2}^0(2e^x-1)\\,dx=1-\\ln2\\approx0.31$.",
        ja: "$\\int_{-\\ln2}^0(2e^x-1)\\,dx=1-\\ln2\\approx0.31$.",
        zh: "$\\int_{-\\ln2}^0(2e^x-1)\\,dx=1-\\ln2\\approx0.31$."
      } },
      { tex: "\\ln\\tfrac{e}{2}", correct: true, why: {
        en: "$\\ln e-\\ln2$: the same number.",
        fr: "$\\ln e-\\ln2$ : le même nombre.",
        es: "$\\ln e-\\ln2$: el mismo número.",
        ja: "$\\ln e-\\ln2$：同じ数。",
        zh: "$\\ln e-\\ln2$：同一个数。"
      } },
      { tex: "\\ln2", correct: false, why: {
        en: "That is the width of the region, not its area.",
        fr: "C’est la largeur de la région, pas son aire.",
        es: "Es el ancho de la región, no su área.",
        ja: "領域の幅で面積ではない。",
        zh: "那是区域的宽度，不是面积。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $\\int_{-\\ln2}^0 2e^x\\,dx$: the $-1$ is missing.",
        fr: "C’est $\\int_{-\\ln2}^0 2e^x\\,dx$ : il manque le $-1$.",
        es: "Es $\\int_{-\\ln2}^0 2e^x\\,dx$: falta el $-1$.",
        ja: "$\\int_{-\\ln2}^0 2e^x\\,dx$ で、$-1$ が抜けている。",
        zh: "那是 $\\int_{-\\ln2}^0 2e^x\\,dx$，少了 $-1$。"
      } },
      { tex: "\\ln2-\\tfrac12", correct: false, why: {
        en: "Wrong antiderivative: $\\approx0.19$.",
        fr: "Mauvaise primitive : $\\approx0{,}19$.",
        es: "Primitiva equivocada: $\\approx0{,}19$.",
        ja: "原始関数の誤り：$\\approx0.19$。",
        zh: "原函数求错：$\\approx0.19$。"
      } },
      { tex: "2\\ln2-1", correct: false, why: {
        en: "Sign of the whole answer flipped and doubled.",
        fr: "Signe inversé et doublé.",
        es: "Signo invertido y duplicado.",
        ja: "符号が逆で2倍。",
        zh: "符号反了还翻倍。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "The height where the curves meet.",
        fr: "La hauteur où les courbes se coupent.",
        es: "La altura donde se cortan.",
        ja: "交点の高さ。",
        zh: "交点的高度。"
      } },
      { tex: "1+\\ln2", correct: false, why: {
        en: "Adds the width instead of subtracting.",
        fr: "Ajoute la largeur au lieu de la retrancher.",
        es: "Suma el ancho en vez de restarlo.",
        ja: "幅を引かずに足した。",
        zh: "把宽度加上了而不是减去。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where they meet",
          fr: "Où elles se coupent",
          es: "Dónde se cortan",
          ja: "交点",
          zh: "交点"
        },
        lines: ["e^x=1-e^x\\iff e^x=\\tfrac12\\iff x=-\\ln2"],
        note: {
          en: "For $-\\ln2<x<0$: $e^x>\\tfrac12>1-e^x$, so $e^x$ is on top.",
          fr: "Pour $-\\ln2<x<0$ : $e^x>\\tfrac12>1-e^x$, donc $e^x$ est au-dessus.",
          es: "Para $-\\ln2<x<0$: $e^x>\\tfrac12>1-e^x$, así que $e^x$ está arriba.",
          ja: "$-\\ln2<x<0$ で $e^x>\\tfrac12>1-e^x$、上は $e^x$。",
          zh: "当 $-\\ln2<x<0$ 时 $e^x>\\tfrac12>1-e^x$，$e^x$ 在上。"
        }
      },
      {
        title: {
          en: "Integrate the gap",
          fr: "Intégrer l’écart",
          es: "Integrar la diferencia",
          ja: "差を積分",
          zh: "对差积分"
        },
        lines: ["\\int_{-\\ln2}^{0}\\big(e^x-(1-e^x)\\big)dx=\\Big[2e^x-x\\Big]_{-\\ln2}^{0}=2-\\left(1+\\ln2\\right)=\\boxed{1-\\ln2}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "About $0.31$: a thin sliver, as the picture shows.",
          fr: "Environ $0{,}31$ : une fine bande, comme sur la figure.",
          es: "Unos $0{,}31$: una franja fina, como en el dibujo.",
          ja: "約 $0.31$。図のとおり細い。",
          zh: "约 $0.31$，如图是细长一条。"
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
