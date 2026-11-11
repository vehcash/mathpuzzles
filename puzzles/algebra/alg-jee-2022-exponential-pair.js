/* algebra · A geometric series in the exponent
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2022-exponential-pair",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.10",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.10",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.10",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.10"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A geometric series in the exponent",
      fr: "Une série géométrique dans l’exposant",
      es: "Una serie geométrica en el exponente",
      ja: "指数に等比級数",
      zh: "指数里的等比级数"
    },
    statement: {
      en: "Let $\\alpha=\\displaystyle\\sum_{k=1}^{\\infty}\\sin^{2k}\\!\\left(\\frac{\\pi}{6}\\right)$ and $g(x)=2^{\\alpha x}+2^{\\alpha(1-x)}$ for $0\\le x\\le1$. <b>Which of the following are true?</b>",
      fr: "Soit $\\alpha=\\displaystyle\\sum_{k=1}^{\\infty}\\sin^{2k}\\!\\left(\\frac{\\pi}{6}\\right)$ et $g(x)=2^{\\alpha x}+2^{\\alpha(1-x)}$ pour $0\\le x\\le1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $\\alpha=\\displaystyle\\sum_{k=1}^{\\infty}\\sin^{2k}\\!\\left(\\frac{\\pi}{6}\\right)$ y $g(x)=2^{\\alpha x}+2^{\\alpha(1-x)}$ para $0\\le x\\le1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\alpha=\\displaystyle\\sum_{k=1}^{\\infty}\\sin^{2k}\\!\\left(\\frac{\\pi}{6}\\right)$、$0\\le x\\le1$ で $g(x)=2^{\\alpha x}+2^{\\alpha(1-x)}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $\\alpha=\\displaystyle\\sum_{k=1}^{\\infty}\\sin^{2k}\\!\\left(\\frac{\\pi}{6}\\right)$，$g(x)=2^{\\alpha x}+2^{\\alpha(1-x)}$，$0\\le x\\le1$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of g on [0, 1]: a shallow U, symmetric about x = 1/2, lowest at the middle and equally high at both ends.",
      fr: "La courbe de g sur [0, 1] : un U très plat, symétrique par rapport à x = 1/2, au plus bas au milieu et aussi haute aux deux bouts.",
      es: "La gráfica de g en [0, 1]: una U muy plana, simétrica respecto de x = 1/2, más baja en el centro e igual de alta en ambos extremos.",
      ja: "[0, 1] での g のグラフ：x = 1/2 に関して対称な浅い U 字で、中央が最低、両端は同じ高さ。",
      zh: "g 在 [0, 1] 上的图像：关于 x = 1/2 对称的浅 U 形，中间最低，两端一样高。"
    },
    hint: {
      en: "$\\sin^2\\frac{\\pi}{6}=\\frac14$, so $\\alpha$ is a geometric series. Then compare $g(x)$ with $g(1-x)$.",
      fr: "$\\sin^2\\frac{\\pi}{6}=\\frac14$ : $\\alpha$ est une série géométrique. Comparez ensuite $g(x)$ et $g(1-x)$.",
      es: "$\\sin^2\\frac{\\pi}{6}=\\frac14$: $\\alpha$ es una serie geométrica. Luego compara $g(x)$ con $g(1-x)$.",
      ja: "$\\sin^2\\frac{\\pi}{6}=\\frac14$ なので $\\alpha$ は等比級数。次に $g(x)$ と $g(1-x)$ を比べる。",
      zh: "$\\sin^2\\frac{\\pi}{6}=\\frac14$，$\\alpha$ 是等比级数。再比较 $g(x)$ 与 $g(1-x)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.0, scale: 62, pad: 20 });
      const X = x => 0.4 + x * 3.8, Y = v => 0.3 + (v - 2.2) * 40;
      const g = x => Math.pow(2, x / 3) + Math.pow(2, (1 - x) / 3);
      F.seg([X(0), Y(2.2)], [X(1.05), Y(2.2)], 'axis'); F.seg([X(0), Y(2.2)], [X(0), Y(2.27)], 'axis');
      const pts = []; for (let k = 0; k <= 60; k++) pts.push([X(k / 60), Y(g(k / 60))]); F.curve(pts, 'graph');
      F.dot([X(0.5), Y(g(0.5))]); F.dot([X(0), Y(g(0))]); F.dot([X(1), Y(g(1))]);
      F.text([X(0.5), Y(2.2)], '1/2', 'tick', 0, 12); F.text([X(1), Y(2.2)], '1', 'tick', 0, 12);
      F.text([X(0.5), Y(g(0.5))], '2⁷ᐟ⁶', 'len small', 0, 16);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the minimum of": {"fr": "le minimum de", "es": "el mínimo de", "ja": "次の最小値", "zh": "下列的最小值"},
      "is": {"fr": "vaut", "es": "es", "ja": "は", "zh": "是"},
      "takes its maximum at more than one point": {"fr": "atteint son maximum en plusieurs points", "es": "alcanza su máximo en más de un punto", "ja": "は2点以上で最大", "zh": "在不止一点取最大值"},
      "the maximum of": {"fr": "le maximum de", "es": "el máximo de", "ja": "次の最大値", "zh": "下列的最大值"},
      "takes its minimum at more than one point": {"fr": "atteint son minimum en plusieurs points", "es": "alcanza su mínimo en más de un punto", "ja": "は2点以上で最小", "zh": "在不止一点取最小值"},
      "is increasing on": {"fr": "est croissante sur", "es": "es creciente en", "ja": "は次で増加", "zh": "在下列区间上递增"},
      "only at": {"fr": "seulement en", "es": "solo en", "ja": "のみ", "zh": "仅当"}
    },
    options: [
      { tex: "\\min_{0\\le x\\le1} g(x)=2^{7/6}", correct: true, why: {
        en: "$\\alpha=\\tfrac13$; at $x=\\tfrac12$, $g=2\\cdot2^{1/6}$.",
        fr: "$\\alpha=\\tfrac13$ ; en $x=\\tfrac12$, $g=2\\cdot2^{1/6}$.",
        es: "$\\alpha=\\tfrac13$; en $x=\\tfrac12$, $g=2\\cdot2^{1/6}$.",
        ja: "$\\alpha=\\tfrac13$。$x=\\tfrac12$ で $g=2\\cdot2^{1/6}$。",
        zh: "$\\alpha=\\tfrac13$；$x=\\tfrac12$ 时 $g=2\\cdot2^{1/6}$。"
      } },
      { tex: "g \\text{ takes its maximum at more than one point}", correct: true, why: {
        en: "$g(0)=g(1)=1+2^{1/3}$, both maximal.",
        fr: "$g(0)=g(1)=1+2^{1/3}$, tous deux maximaux.",
        es: "$g(0)=g(1)=1+2^{1/3}$, ambos máximos.",
        ja: "$g(0)=g(1)=1+2^{1/3}$ がともに最大。",
        zh: "$g(0)=g(1)=1+2^{1/3}$，都是最大值。"
      } },
      { tex: "\\alpha=\\tfrac14", correct: false, why: {
        en: "$\\tfrac14$ is the ratio; the sum is $\\tfrac{1/4}{1-1/4}=\\tfrac13$.",
        fr: "$\\tfrac14$ est la raison ; la somme vaut $\\tfrac{1/4}{1-1/4}=\\tfrac13$.",
        es: "$\\tfrac14$ es la razón; la suma es $\\tfrac{1/4}{1-1/4}=\\tfrac13$.",
        ja: "$\\tfrac14$ は公比で、和は $\\tfrac{1/4}{1-1/4}=\\tfrac13$。",
        zh: "$\\tfrac14$ 是公比，和为 $\\tfrac{1/4}{1-1/4}=\\tfrac13$。"
      } },
      { tex: "\\max_{0\\le x\\le1} g(x)=2^{4/3}", correct: false, why: {
        en: "It is $1+2^{1/3}\\approx2.26$, while $2^{4/3}\\approx2.52$.",
        fr: "Il vaut $1+2^{1/3}\\approx2{,}26$, alors que $2^{4/3}\\approx2{,}52$.",
        es: "Es $1+2^{1/3}\\approx2{,}26$, mientras $2^{4/3}\\approx2{,}52$.",
        ja: "$1+2^{1/3}\\approx2.26$ で $2^{4/3}\\approx2.52$ ではない。",
        zh: "是 $1+2^{1/3}\\approx2.26$，而 $2^{4/3}\\approx2.52$。"
      } },
      { tex: "g \\text{ takes its minimum at more than one point}", correct: false, why: {
        en: "Only at $x=\\tfrac12$, by AM–GM equality.",
        fr: "Seulement en $x=\\tfrac12$, cas d’égalité de l’IAG.",
        es: "Solo en $x=\\tfrac12$, igualdad de la MA–MG.",
        ja: "相加相乗の等号成立は $x=\\tfrac12$ だけ。",
        zh: "由均值不等式取等号仅在 $x=\\tfrac12$。"
      } },
      { tex: "g(0)<g\\!\\left(\\tfrac12\\right)", correct: false, why: {
        en: "$g$ falls then rises.",
        fr: "$g$ décroît puis croît.",
        es: "$g$ baja y luego sube.",
        ja: "$g$ は減少してから増加。",
        zh: "$g$ 先减后增。"
      } },
      { tex: "\\min_{0\\le x\\le1} g(x)=2", correct: false, why: {
        en: "That would need $\\alpha=0$.",
        fr: "Il faudrait $\\alpha=0$.",
        es: "Haría falta $\\alpha=0$.",
        ja: "$\\alpha=0$ が必要になる。",
        zh: "需要 $\\alpha=0$。"
      } },
      { tex: "g(0)\\ne g(1)", correct: false, why: {
        en: "$g(x)=g(1-x)$ for all $x$.",
        fr: "$g(x)=g(1-x)$ pour tout $x$.",
        es: "$g(x)=g(1-x)$ para todo $x$.",
        ja: "すべての $x$ で $g(x)=g(1-x)$。",
        zh: "对所有 $x$ 有 $g(x)=g(1-x)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Sum the series",
          fr: "Sommer la série",
          es: "Sumar la serie",
          ja: "級数の和",
          zh: "求级数和"
        },
        lines: ["\\alpha=\\sum_{k\\ge1}\\left(\\tfrac14\\right)^k=\\frac{1/4}{1-1/4}=\\tfrac13"],
        note: {
          en: "$\\sin\\tfrac{\\pi}{6}=\\tfrac12$.",
          fr: "$\\sin\\tfrac{\\pi}{6}=\\tfrac12$.",
          es: "$\\sin\\tfrac{\\pi}{6}=\\tfrac12$.",
          ja: "$\\sin\\tfrac{\\pi}{6}=\\tfrac12$。",
          zh: "$\\sin\\tfrac{\\pi}{6}=\\tfrac12$。"
        }
      },
      {
        title: {
          en: "Minimum by AM–GM",
          fr: "Minimum par l’IAG",
          es: "Mínimo por MA–MG",
          ja: "相加相乗で最小",
          zh: "用均值不等式求最小"
        },
        lines: ["g(x)=2^{x/3}+2^{(1-x)/3}\\ge2\\sqrt{2^{1/3}}=\\boxed{2^{7/6}}\\quad (x=\\tfrac12)"],
        note: {
          en: "The product $2^{x/3}\\cdot2^{(1-x)/3}=2^{1/3}$ is constant.",
          fr: "Le produit $2^{x/3}\\cdot2^{(1-x)/3}=2^{1/3}$ est constant.",
          es: "El producto $2^{x/3}\\cdot2^{(1-x)/3}=2^{1/3}$ es constante.",
          ja: "積 $2^{x/3}\\cdot2^{(1-x)/3}=2^{1/3}$ は一定。",
          zh: "乘积 $2^{x/3}\\cdot2^{(1-x)/3}=2^{1/3}$ 为常数。"
        }
      },
      {
        title: {
          en: "Maximum at the ends",
          fr: "Maximum aux bornes",
          es: "Máximo en los extremos",
          ja: "最大は両端",
          zh: "最大在端点"
        },
        lines: ["g(0)=g(1)=1+2^{1/3}"],
        note: {
          en: "$g$ is convex and symmetric about $\\tfrac12$, so both ends tie for the maximum.",
          fr: "$g$ est convexe et symétrique autour de $\\tfrac12$ : les deux bornes donnent le maximum.",
          es: "$g$ es convexa y simétrica respecto de $\\tfrac12$: ambos extremos dan el máximo.",
          ja: "$g$ は下に凸で $\\tfrac12$ に関して対称なので、両端が最大。",
          zh: "$g$ 是凸函数且关于 $\\tfrac12$ 对称，两端同为最大。"
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
          en: "One option is about the minimum, one about where the maximum is.",
          fr: "Une option porte sur le minimum, une sur l’endroit du maximum.",
          es: "Una opción trata del mínimo y otra de dónde está el máximo.",
          ja: "1つは最小値、1つは最大の場所。",
          zh: "一个关于最小值，一个关于最大值的位置。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
