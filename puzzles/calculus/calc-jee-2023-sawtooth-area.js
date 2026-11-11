/* calculus · Three teeth and a ramp
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2023-sawtooth-area",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.9",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.9",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas P.9",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.9",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学第 9 题"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Three teeth and a ramp",
      fr: "Trois dents et une rampe",
      es: "Tres dientes y una rampa",
      ja: "3つの歯と坂道",
      zh: "三个齿和一段坡"
    },
    statement: {
      en: "For an integer $n\\ge2$, $f$ on $[0,1]$ is $n(1-2nx)$ on $[0,\\tfrac1{2n}]$, $2n(2nx-1)$ on $[\\tfrac1{2n},\\tfrac3{4n}]$, $4n(1-nx)$ on $[\\tfrac3{4n},\\tfrac1n]$ and $\\tfrac{n}{n-1}(nx-1)$ on $[\\tfrac1n,1]$. The region between $y=f(x)$ and the $x$-axis for $0\\le x\\le1$ has area $4$. <b>Which of the following equal the maximum value of $f$?</b>",
      fr: "Pour un entier $n\\ge2$, $f$ sur $[0,1]$ vaut $n(1-2nx)$ sur $[0,\\tfrac1{2n}]$, $2n(2nx-1)$ sur $[\\tfrac1{2n},\\tfrac3{4n}]$, $4n(1-nx)$ sur $[\\tfrac3{4n},\\tfrac1n]$ et $\\tfrac{n}{n-1}(nx-1)$ sur $[\\tfrac1n,1]$. La région entre $y=f(x)$ et l’axe des abscisses pour $0\\le x\\le1$ a une aire de $4$. <b>Lesquelles des valeurs suivantes sont égales au maximum de $f$ ?</b>",
      es: "Para un entero $n\\ge2$, $f$ en $[0,1]$ es $n(1-2nx)$ en $[0,\\tfrac1{2n}]$, $2n(2nx-1)$ en $[\\tfrac1{2n},\\tfrac3{4n}]$, $4n(1-nx)$ en $[\\tfrac3{4n},\\tfrac1n]$ y $\\tfrac{n}{n-1}(nx-1)$ en $[\\tfrac1n,1]$. La región entre $y=f(x)$ y el eje $x$ para $0\\le x\\le1$ tiene área $4$. <b>¿Cuáles de los siguientes valores son iguales al máximo de $f$?</b>",
      ja: "整数 $n\\ge2$ に対し、$[0,1]$ 上の $f$ は $[0,\\tfrac1{2n}]$ で $n(1-2nx)$、$[\\tfrac1{2n},\\tfrac3{4n}]$ で $2n(2nx-1)$、$[\\tfrac3{4n},\\tfrac1n]$ で $4n(1-nx)$、$[\\tfrac1n,1]$ で $\\tfrac{n}{n-1}(nx-1)$ です。$0\\le x\\le1$ で $y=f(x)$ と $x$ 軸の間の面積は $4$。<b>$f$ の最大値に等しいものはどれですか？</b>",
      zh: "对整数 $n\\ge2$，$[0,1]$ 上的 $f$ 在 $[0,\\tfrac1{2n}]$ 上为 $n(1-2nx)$，在 $[\\tfrac1{2n},\\tfrac3{4n}]$ 上为 $2n(2nx-1)$，在 $[\\tfrac3{4n},\\tfrac1n]$ 上为 $4n(1-nx)$，在 $[\\tfrac1n,1]$ 上为 $\\tfrac{n}{n-1}(nx-1)$。$0\\le x\\le1$ 时 $y=f(x)$ 与 $x$ 轴围成的面积为 $4$。<b>下列哪些等于 $f$ 的最大值？</b>"
    },
    figureText: {
      en: "The graph of f for n = 8: three narrow triangles near x = 0 (heights 8, 8, 8 — the first starts at height 8) and then a long straight ramp from (1/8, 0) up to (1, 8). The area under it is shaded.",
      fr: "Le graphe de f pour n = 8 : trois triangles étroits près de x = 0 (hauteurs 8, 8, 8 — le premier part de la hauteur 8) puis une longue rampe droite de (1/8, 0) à (1, 8). L’aire dessous est grisée.",
      es: "La gráfica de f para n = 8: tres triángulos estrechos cerca de x = 0 (alturas 8, 8, 8; el primero empieza a altura 8) y luego una larga rampa recta de (1/8, 0) a (1, 8). El área bajo ella está sombreada.",
      ja: "n = 8 のときの f のグラフ：x = 0 付近の細い三角形 3 つ（高さはどれも 8、最初は高さ 8 から始まる）と、(1/8, 0) から (1, 8) までの長い直線の坂。下側の面積に色が付いています。",
      zh: "n = 8 时 f 的图像：x = 0 附近三个窄三角形（高都是 8，第一个从高度 8 开始），然后是从 (1/8, 0) 到 (1, 8) 的一段长直坡。其下方面积涂色。"
    },
    hint: {
      en: "Every piece is a straight segment: compute $f$ at $0,\\tfrac1{2n},\\tfrac3{4n},\\tfrac1n,1$ and add up triangle areas.",
      fr: "Chaque morceau est un segment : calculez $f$ en $0,\\tfrac1{2n},\\tfrac3{4n},\\tfrac1n,1$ et additionnez des aires de triangles.",
      es: "Cada trozo es un segmento: calcula $f$ en $0,\\tfrac1{2n},\\tfrac3{4n},\\tfrac1n,1$ y suma áreas de triángulos.",
      ja: "どの部分も線分です。$0,\\tfrac1{2n},\\tfrac3{4n},\\tfrac1n,1$ での $f$ を求め、三角形の面積を足しましょう。",
      zh: "每段都是线段：算出 $f$ 在 $0,\\tfrac1{2n},\\tfrac3{4n},\\tfrac1n,1$ 处的值，再把三角形面积相加。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.2, scale: 64, pad: 18 });
      const n = 8, sx = 4.2, sy = 2.9 / 8, X = x => 0.2 + x * sx, Y = y => 0.1 + y * sy;
      const pts = [[0, n], [1 / (2 * n), 0], [3 / (4 * n), n], [1 / n, 0], [1, n]].map(([x, y]) => [X(x), Y(y)]);
      F.path([[X(0), Y(0)]].concat(pts, [[X(1), Y(0)]]), 'fill-yellow', 'fills');
      F.path(pts, 'graph', 'base', false);
      F.seg([X(0), Y(0)], [X(1) + 0.15, Y(0)], 'axis'); F.seg([X(0), Y(0)], [X(0), Y(n) + 0.15], 'axis');
      F.text([X(1), Y(0)], '1', 'tick', 0, 12); F.text([X(1 / n), Y(0)], '1/n', 'tick', 4, 12); F.text([X(0), Y(n)], 'n', 'tick', -10, 0);
      F.seg([X(1), Y(0)], [X(1), Y(n)], 'seg thin');
      return F;
    },
    options: [
      { tex: "8", correct: true, why: {
        en: "The area is $\\tfrac n2=4$, so $n=8$, and the maximum of $f$ is $n$.",
        fr: "L’aire vaut $\\tfrac n2=4$, donc $n=8$, et le maximum de $f$ est $n$.",
        es: "El área es $\\tfrac n2=4$, así que $n=8$, y el máximo de $f$ es $n$.",
        ja: "面積は $\\tfrac n2=4$ なので $n=8$。$f$ の最大値は $n$。",
        zh: "面积为 $\\tfrac n2=4$，所以 $n=8$，$f$ 的最大值是 $n$。"
      } },
      { tex: "2^3", correct: true, why: {
        en: "$=8$.",
        fr: "$=8$.",
        es: "$=8$.",
        ja: "$=8$。",
        zh: "$=8$。"
      } },
      { tex: "4", correct: false, why: {
        en: "$4$ is the area, not the maximum.",
        fr: "$4$ est l’aire, pas le maximum.",
        es: "$4$ es el área, no el máximo.",
        ja: "$4$ は面積で、最大値ではない。",
        zh: "$4$ 是面积，不是最大值。"
      } },
      { tex: "16", correct: false, why: {
        en: "$2n$: the factor $2n$ in the second piece is a slope coefficient, not a height.",
        fr: "$2n$ : le facteur $2n$ du deuxième morceau est un coefficient de pente, pas une hauteur.",
        es: "$2n$: el factor $2n$ del segundo trozo es de pendiente, no una altura.",
        ja: "$2n$：2つ目の式の $2n$ は傾きの係数で高さではない。",
        zh: "$2n$：第二段的系数 $2n$ 与斜率有关，不是高度。"
      } },
      { tex: "32", correct: false, why: {
        en: "$4n$ is a coefficient; the third tooth still only reaches $n$.",
        fr: "$4n$ est un coefficient ; la troisième dent n’atteint que $n$.",
        es: "$4n$ es un coeficiente; el tercer diente solo llega a $n$.",
        ja: "$4n$ は係数。3つ目の歯も高さは $n$。",
        zh: "$4n$ 是系数；第三个齿也只到 $n$。"
      } },
      { tex: "7", correct: false, why: {
        en: "$n-1$ appears in the last piece, but $f(1)=\\tfrac{n}{n-1}(n-1)=n$.",
        fr: "$n-1$ apparaît dans le dernier morceau, mais $f(1)=\\tfrac{n}{n-1}(n-1)=n$.",
        es: "$n-1$ aparece en el último trozo, pero $f(1)=\\tfrac{n}{n-1}(n-1)=n$.",
        ja: "$n-1$ は最後の式に出るが $f(1)=\\tfrac{n}{n-1}(n-1)=n$。",
        zh: "最后一段有 $n-1$，但 $f(1)=\\tfrac{n}{n-1}(n-1)=n$。"
      } },
      { tex: "9", correct: false, why: {
        en: "Would need area $\\tfrac92$.",
        fr: "Il faudrait une aire de $\\tfrac92$.",
        es: "Haría falta área $\\tfrac92$.",
        ja: "面積 $\\tfrac92$ が必要。",
        zh: "需要面积为 $\\tfrac92$。"
      } },
      { tex: "2", correct: false, why: {
        en: "$n=2$ gives area $1$.",
        fr: "$n=2$ donne une aire de $1$.",
        es: "$n=2$ da área $1$.",
        ja: "$n=2$ なら面積は $1$。",
        zh: "$n=2$ 时面积为 $1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Heights at the corners",
          fr: "Hauteurs aux sommets",
          es: "Alturas en los vértices",
          ja: "折れ目での高さ",
          zh: "转折点的高度"
        },
        lines: ["f(0)=n,\\; f\\!\\left(\\tfrac1{2n}\\right)=0,\\; f\\!\\left(\\tfrac3{4n}\\right)=n,\\; f\\!\\left(\\tfrac1n\\right)=0,\\; f(1)=n"],
        note: {
          en: "The graph is a zigzag of triangles, each of height $n$.",
          fr: "Le graphe est un zigzag de triangles, tous de hauteur $n$.",
          es: "La gráfica es un zigzag de triángulos, todos de altura $n$.",
          ja: "グラフは高さ $n$ の三角形のジグザグ。",
          zh: "图像是由高为 $n$ 的三角形组成的锯齿。"
        }
      },
      {
        title: {
          en: "Add the areas",
          fr: "Additionner les aires",
          es: "Sumar las áreas",
          ja: "面積を足す",
          zh: "面积相加"
        },
        lines: ["\\tfrac12\\cdot\\tfrac1{2n}\\cdot n+\\tfrac12\\cdot\\tfrac1{4n}\\cdot n+\\tfrac12\\cdot\\tfrac1{4n}\\cdot n+\\tfrac12\\left(1-\\tfrac1n\\right)n=\\tfrac14+\\tfrac18+\\tfrac18+\\tfrac{n-1}2=\\tfrac n2", "\\tfrac n2=4 \\Rightarrow n=8 \\Rightarrow \\max f=\\boxed{8}"],
        note: {
          en: "The maximum $n$ is reached at $x=0$, $x=\\tfrac3{4n}$ and $x=1$.",
          fr: "Le maximum $n$ est atteint en $x=0$, $x=\\tfrac3{4n}$ et $x=1$.",
          es: "El máximo $n$ se alcanza en $x=0$, $x=\\tfrac3{4n}$ y $x=1$.",
          ja: "最大値 $n$ は $x=0$、$x=\\tfrac3{4n}$、$x=1$ でとる。",
          zh: "最大值 $n$ 在 $x=0$、$x=\\tfrac3{4n}$、$x=1$ 处取得。"
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
