/* calculus · A maximum that wiggles
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2025-wiggly-maximum",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.3",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.3",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.3",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.3",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.3"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A maximum that wiggles",
      fr: "Un maximum qui ondule",
      es: "Un máximo que ondula",
      ja: "揺れる極大",
      zh: "摆动的极大值"
    },
    statement: {
      en: "$f(x)=2-2x^2-x^2\\sin\\frac1x$ for $x\\ne0$ and $f(0)=2$. <b>Which of the following are true?</b>",
      fr: "$f(x)=2-2x^2-x^2\\sin\\frac1x$ pour $x\\ne0$ et $f(0)=2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=2-2x^2-x^2\\sin\\frac1x$ si $x\\ne0$ y $f(0)=2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x\\ne0$ で $f(x)=2-2x^2-x^2\\sin\\frac1x$、$f(0)=2$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $x\\ne0$ 时 $f(x)=2-2x^2-x^2\\sin\\frac1x$，$f(0)=2$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of f near 0, squeezed between 2 − x² and 2 − 3x².",
      fr: "La courbe de f près de 0, coincée entre 2 − x² et 2 − 3x².",
      es: "La gráfica de f cerca de 0, entre 2 − x² y 2 − 3x².",
      ja: "0 付近の f のグラフ。2 − x² と 2 − 3x² の間にある。",
      zh: "f 在 0 附近的图像，夹在 2 − x² 与 2 − 3x² 之间。"
    },
    hint: {
      en: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)$, and $2+\\sin\\tfrac1x\\ge1$. For monotonicity, look at the $\\cos\\tfrac1x$ term in $f'$.",
      fr: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)$ et $2+\\sin\\tfrac1x\\ge1$. Pour la monotonie, regardez le terme $\\cos\\tfrac1x$ de $f'$.",
      es: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)$ y $2+\\sin\\tfrac1x\\ge1$. Para la monotonía, mira el término $\\cos\\tfrac1x$ de $f'$.",
      ja: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)$、$2+\\sin\\tfrac1x\\ge1$。単調性は $f'$ の $\\cos\\tfrac1x$ の項を見る。",
      zh: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)$，且 $2+\\sin\\tfrac1x\\ge1$。单调性看 $f'$ 中的 $\\cos\\tfrac1x$ 项。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.1, scale: 70, pad: 16 });
      const TT = ([x, y]) => [2.0 + x * 10, 0.3 + (y - 1.9) * 25];
      F.seg(TT([0, 1.9]), TT([0, 2.0]), 'axis'); F.seg(TT([-0.18, 2]), TT([0.18, 2]), 'seg thin dashc'); F.text(TT([-0.18, 2]), 'y = 2', 'len small', 8, -10);
      plot(F, TT, x => 2 - x * x, -0.18, 0.18, 'seg thin dashc'); plot(F, TT, x => 2 - 3 * x * x, -0.18, 0.18, 'seg thin dashc');
      const p = []; for (let k = -600; k <= 600; k++) { const x = 0.18 * k / 600; p.push(TT([x, x === 0 ? 2 : 2 - 2 * x * x - x * x * Math.sin(1 / x)])); } F.path(p, 'graph', 'base', false);
      F.reveal = () => {
      F.dot(TT([0, 2])); F.text(TT([0, 2]), 'max', 'len small', 0, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "max": {"fr": "max", "es": "máx", "ja": "極大", "zh": "极大"},
      "y = 2": {"fr": "y = 2", "es": "y = 2", "ja": "y = 2", "zh": "y = 2"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"},
      "is not increasing on": {"fr": "n’est pas croissante sur", "es": "no es creciente en", "ja": "は次で増加しない：", "zh": "在下列区间不递增："},
      "is a local maximum point of": {"fr": "est un point de maximum local de", "es": "es un punto de máximo local de", "ja": "は次の極大点：", "zh": "是极大值点，函数"},
      "is a local minimum point of": {"fr": "est un point de minimum local de", "es": "es un punto de mínimo local de", "ja": "は次の極小点：", "zh": "是极小值点，函数"},
      "is not differentiable at": {"fr": "n’est pas dérivable en", "es": "no es derivable en", "ja": "は次で微分不可能：", "zh": "在下列点不可导："},
      "there is": {"fr": "il existe", "es": "existe", "ja": "ある", "zh": "存在"},
      "with": {"fr": "avec", "es": "con", "ja": "で", "zh": "使"},
      "decreasing on": {"fr": "décroissante sur", "es": "decreciente en", "ja": "が次で減少：", "zh": "在下列区间递减："},
      "is continuous at": {"fr": "est continue en", "es": "es continua en", "ja": "は次で連続：", "zh": "在下列点连续："},
      "for some": {"fr": "pour un certain", "es": "para algún", "ja": "ある", "zh": "对某个"}
    },
    options: [
      { tex: "\\text{for every}\\ \\delta>0,\\ f\\ \\text{is not increasing on}\\ (-\\delta,0)", correct: true, why: {
        en: "$f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x$ keeps taking negative values near $0$.",
        fr: "$f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x$ prend des valeurs négatives près de $0$.",
        es: "$f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x$ toma valores negativos cerca de $0$.",
        ja: "$f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x$ は $0$ の近くで負の値もとる。",
        zh: "$f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x$ 在 $0$ 附近反复取负值。"
      } },
      { tex: "x=0\\ \\text{is a local maximum point of}\\ f", correct: true, why: {
        en: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)\\le-x^2<0$ for $x\\ne0$.",
        fr: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)\\le-x^2<0$ pour $x\\ne0$.",
        es: "$f(x)-2=-x^2\\bigl(2+\\sin\\tfrac1x\\bigr)\\le-x^2<0$ si $x\\ne0$.",
        ja: "$x\\ne0$ で $f(x)-2\\le-x^2<0$。",
        zh: "$x\\ne0$ 时 $f(x)-2\\le-x^2<0$。"
      } },
      { tex: "x=0\\ \\text{is a local minimum point of}\\ f", correct: false, why: {
        en: "It is a maximum.",
        fr: "C’est un maximum.",
        es: "Es un máximo.",
        ja: "極大である。",
        zh: "那是极大值点。"
      } },
      { tex: "f\\ \\text{is not differentiable at}\\ 0", correct: false, why: {
        en: "$\\tfrac{f(x)-2}{x}=-x\\bigl(2+\\sin\\tfrac1x\\bigr)\\to0$.",
        fr: "$\\tfrac{f(x)-2}{x}=-x\\bigl(2+\\sin\\tfrac1x\\bigr)\\to0$.",
        es: "$\\tfrac{f(x)-2}{x}=-x\\bigl(2+\\sin\\tfrac1x\\bigr)\\to0$.",
        ja: "$\\tfrac{f(x)-2}{x}=-x\\bigl(2+\\sin\\tfrac1x\\bigr)\\to0$。",
        zh: "$\\tfrac{f(x)-2}{x}=-x\\bigl(2+\\sin\\tfrac1x\\bigr)\\to0$。"
      } },
      { tex: "\\text{there is}\\ \\delta>0\\ \\text{with}\\ f\\ \\text{decreasing on}\\ (0,\\delta)", correct: false, why: {
        en: "$\\cos\\tfrac1x$ in $f'$ makes it positive at points arbitrarily close to $0$.",
        fr: "Le $\\cos\\tfrac1x$ de $f'$ la rend positive aussi près de $0$ que l’on veut.",
        es: "El $\\cos\\tfrac1x$ de $f'$ la hace positiva arbitrariamente cerca de $0$.",
        ja: "$f'$ の $\\cos\\tfrac1x$ により $0$ のいくらでも近くで正になる。",
        zh: "$f'$ 中的 $\\cos\\tfrac1x$ 使其在任意接近 $0$ 处为正。"
      } },
      { tex: "f'(0)=-2", correct: false, why: {
        en: "$f'(0)=0$.",
        fr: "$f'(0)=0$.",
        es: "$f'(0)=0$.",
        ja: "$f'(0)=0$。",
        zh: "$f'(0)=0$。"
      } },
      { tex: "f'\\ \\text{is continuous at}\\ 0", correct: false, why: {
        en: "$\\cos\\tfrac1x$ has no limit at $0$.",
        fr: "$\\cos\\tfrac1x$ n’a pas de limite en $0$.",
        es: "$\\cos\\tfrac1x$ no tiene límite en $0$.",
        ja: "$\\cos\\tfrac1x$ は $0$ で極限をもたない。",
        zh: "$\\cos\\tfrac1x$ 在 $0$ 处无极限。"
      } },
      { tex: "f(x)>2\\ \\text{for some}\\ x", correct: false, why: {
        en: "$f(x)\\le2-x^2$.",
        fr: "$f(x)\\le2-x^2$.",
        es: "$f(x)\\le2-x^2$.",
        ja: "$f(x)\\le2-x^2$。",
        zh: "$f(x)\\le2-x^2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Compare with 2",
          fr: "Comparer à 2",
          es: "Comparar con 2",
          ja: "2 と比べる",
          zh: "与 2 比较"
        },
        lines: ["f(x)-2=-x^2\\left(2+\\sin\\tfrac1x\\right),\\quad1\\le2+\\sin\\tfrac1x\\le3"],
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
          en: "Derivative",
          fr: "Dérivée",
          es: "Derivada",
          ja: "導関数",
          zh: "导数"
        },
        lines: ["f'(0)=0,\\qquad f'(x)=-4x-2x\\sin\\tfrac1x+\\cos\\tfrac1x\\ (x\\ne0)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Near $0$ the first two terms are tiny and $\\cos\\tfrac1x$ swings between $\\pm1$: $f$ is not monotone on any side interval.",
          fr: "Près de $0$ les deux premiers termes sont minuscules et $\\cos\\tfrac1x$ oscille entre $\\pm1$ : $f$ n’est monotone sur aucun intervalle latéral.",
          es: "Cerca de $0$ los dos primeros términos son mínimos y $\\cos\\tfrac1x$ oscila entre $\\pm1$: $f$ no es monótona a ningún lado.",
          ja: "$0$ 付近で最初の2項は小さく、$\\cos\\tfrac1x$ は $\\pm1$ の間を振れるので片側で単調にならない。",
          zh: "在 $0$ 附近前两项很小，$\\cos\\tfrac1x$ 在 $\\pm1$ 间摆动，任一侧都不单调。"
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
