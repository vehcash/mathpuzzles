/* calculus · Which (α, β) make the limit zero?
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-limit-set-alpha-beta",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.5",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.5",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.5",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Which (α, β) make the limit zero?",
      fr: "Quels (α, β) annulent la limite ?",
      es: "¿Qué (α, β) anulan el límite?",
      ja: "極限が 0 になる (α, β)",
      zh: "哪些 (α, β) 使极限为零？"
    },
    statement: {
      en: "$S$ is the set of $(\\alpha,\\beta)\\in\\mathbb R^2$ with $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(x^2)\\,(\\ln x)^{\\alpha}\\,\\sin\\!\\left(\\frac1{x^2}\\right)}{x^{\\alpha\\beta}\\,\\bigl(\\ln(1+x)\\bigr)^{\\beta}}=0$. <b>Which of the following are true?</b>",
      fr: "$S$ est l’ensemble des $(\\alpha,\\beta)\\in\\mathbb R^2$ tels que $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(x^2)\\,(\\ln x)^{\\alpha}\\,\\sin\\!\\left(\\frac1{x^2}\\right)}{x^{\\alpha\\beta}\\,\\bigl(\\ln(1+x)\\bigr)^{\\beta}}=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S$ es el conjunto de $(\\alpha,\\beta)\\in\\mathbb R^2$ con $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(x^2)\\,(\\ln x)^{\\alpha}\\,\\sin\\!\\left(\\frac1{x^2}\\right)}{x^{\\alpha\\beta}\\,\\bigl(\\ln(1+x)\\bigr)^{\\beta}}=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(x^2)\\,(\\ln x)^{\\alpha}\\,\\sin\\!\\left(\\frac1{x^2}\\right)}{x^{\\alpha\\beta}\\,\\bigl(\\ln(1+x)\\bigr)^{\\beta}}=0$ となる $(\\alpha,\\beta)$ の集合を $S$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S$ 为使 $\\displaystyle\\lim_{x\\to\\infty}\\frac{\\sin(x^2)\\,(\\ln x)^{\\alpha}\\,\\sin\\!\\left(\\frac1{x^2}\\right)}{x^{\\alpha\\beta}\\,\\bigl(\\ln(1+x)\\bigr)^{\\beta}}=0$ 的 $(\\alpha,\\beta)$ 的集合。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The αβ-plane with the four candidate points (−1, 3), (−1, 1), (1, −1) and (1, −2).",
      fr: "Le plan (α, β) avec les quatre points candidats (−1, 3), (−1, 1), (1, −1) et (1, −2).",
      es: "El plano (α, β) con los cuatro puntos candidatos (−1, 3), (−1, 1), (1, −1) y (1, −2).",
      ja: "αβ 平面上の候補 (−1, 3), (−1, 1), (1, −1), (1, −2)。",
      zh: "αβ 平面上四个候选点 (−1, 3)、(−1, 1)、(1, −1)、(1, −2)。"
    },
    hint: {
      en: "$\\sin\\tfrac1{x^2}\\sim\\tfrac1{x^2}$, $\\ln(1+x)\\sim\\ln x$, and $\\sin(x^2)$ stays bounded but does not tend to $0$. Compare powers of $x$ first.",
      fr: "$\\sin\\tfrac1{x^2}\\sim\\tfrac1{x^2}$, $\\ln(1+x)\\sim\\ln x$, et $\\sin(x^2)$ reste borné sans tendre vers $0$. Comparez d’abord les puissances de $x$.",
      es: "$\\sin\\tfrac1{x^2}\\sim\\tfrac1{x^2}$, $\\ln(1+x)\\sim\\ln x$, y $\\sin(x^2)$ está acotado sin tender a $0$. Compara primero las potencias de $x$.",
      ja: "$\\sin\\tfrac1{x^2}\\sim\\tfrac1{x^2}$、$\\ln(1+x)\\sim\\ln x$。$\\sin(x^2)$ は有界だが $0$ に収束しない。まず $x$ の次数を比べる。",
      zh: "$\\sin\\tfrac1{x^2}\\sim\\tfrac1{x^2}$，$\\ln(1+x)\\sim\\ln x$，$\\sin(x^2)$ 有界但不趋于 $0$。先比较 $x$ 的次数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 6.4, scale: 40, pad: 16 });
      const T = F.T = axes(F, -2.3, 2.3, -3.0, 3.4);
      [[-1, 3], [-1, 1], [1, -1], [1, -2]].forEach(([a, b]) => { F.dot(T([a, b])); F.text(T([a, b]), `(${a}, ${b})`.replace(/-/g, '−'), 'len small', a < 0 ? -30 : 30, 0); });
      F.text(T([2.3, 0]), 'α', 'pt', -6, -10); F.text(T([0, 3.4]), 'β', 'pt', -12, 8);
      F.reveal = () => {
      const p = [], q = []; for (let k = 0; k <= 40; k++) { const a = -2.3 + 1.6 * k / 40; p.push(T([a, -2 / a])); const a2 = 0.7 + 1.6 * k / 40; q.push(T([a2, -2 / a2])); }
      F.path(p, 'hl pink', 'base', false); F.path(q, 'hl pink', 'base', false); F.text(T([1.8, -1.1]), 'αβ = −2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"}
    },
    options: [
      { tex: "(-1,1)\\in S", correct: true, why: {
        en: "$\\alpha\\beta=-1$: the size is $(\\ln x)^{-2}x^{-1}\\to0$.",
        fr: "$\\alpha\\beta=-1$ : la taille est $(\\ln x)^{-2}x^{-1}\\to0$.",
        es: "$\\alpha\\beta=-1$: el tamaño es $(\\ln x)^{-2}x^{-1}\\to0$.",
        ja: "$\\alpha\\beta=-1$ で大きさは $(\\ln x)^{-2}x^{-1}\\to0$。",
        zh: "$\\alpha\\beta=-1$：量级为 $(\\ln x)^{-2}x^{-1}\\to0$。"
      } },
      { tex: "(1,-1)\\in S", correct: true, why: {
        en: "$\\alpha\\beta=-1$: the size is $(\\ln x)^{2}x^{-1}\\to0$.",
        fr: "$\\alpha\\beta=-1$ : la taille est $(\\ln x)^{2}x^{-1}\\to0$.",
        es: "$\\alpha\\beta=-1$: el tamaño es $(\\ln x)^{2}x^{-1}\\to0$.",
        ja: "$\\alpha\\beta=-1$ で大きさは $(\\ln x)^{2}x^{-1}\\to0$。",
        zh: "$\\alpha\\beta=-1$：量级为 $(\\ln x)^{2}x^{-1}\\to0$。"
      } },
      { tex: "(-1,3)\\in S", correct: false, why: {
        en: "$\\alpha\\beta=-3$: the factor $x^{3-2}=x$ blows up.",
        fr: "$\\alpha\\beta=-3$ : le facteur $x^{3-2}=x$ explose.",
        es: "$\\alpha\\beta=-3$: el factor $x^{3-2}=x$ diverge.",
        ja: "$\\alpha\\beta=-3$ で $x^{3-2}=x$ が発散。",
        zh: "$\\alpha\\beta=-3$：因子 $x^{3-2}=x$ 发散。"
      } },
      { tex: "(1,-2)\\in S", correct: false, why: {
        en: "$\\alpha\\beta=-2$ kills the power of $x$, but $(\\ln x)^{3}\\sin(x^2)$ does not tend to $0$.",
        fr: "$\\alpha\\beta=-2$ supprime la puissance de $x$, mais $(\\ln x)^{3}\\sin(x^2)$ ne tend pas vers $0$.",
        es: "$\\alpha\\beta=-2$ elimina la potencia de $x$, pero $(\\ln x)^{3}\\sin(x^2)$ no tiende a $0$.",
        ja: "$\\alpha\\beta=-2$ で $x$ の次数は消えるが $(\\ln x)^{3}\\sin(x^2)$ は $0$ に近づかない。",
        zh: "$\\alpha\\beta=-2$ 消去了 $x$ 的幂，但 $(\\ln x)^{3}\\sin(x^2)$ 不趋于 $0$。"
      } },
      { tex: "(2,-1)\\in S", correct: false, why: {
        en: "$\\alpha\\beta=-2$ and $(\\ln x)^{3}$ again.",
        fr: "$\\alpha\\beta=-2$ et encore $(\\ln x)^{3}$.",
        es: "$\\alpha\\beta=-2$ y otra vez $(\\ln x)^{3}$.",
        ja: "$\\alpha\\beta=-2$ で再び $(\\ln x)^{3}$。",
        zh: "$\\alpha\\beta=-2$，又是 $(\\ln x)^{3}$。"
      } },
      { tex: "(-2,2)\\in S", correct: false, why: {
        en: "$\\alpha\\beta=-4$: the power $x^{2}$ blows up.",
        fr: "$\\alpha\\beta=-4$ : la puissance $x^{2}$ explose.",
        es: "$\\alpha\\beta=-4$: la potencia $x^{2}$ diverge.",
        ja: "$\\alpha\\beta=-4$ で $x^{2}$ が発散。",
        zh: "$\\alpha\\beta=-4$：$x^{2}$ 发散。"
      } },
      { tex: "(0,0)\\notin S", correct: false, why: {
        en: "$(0,0)$ gives $\\sin(x^2)\\sin\\tfrac1{x^2}\\to0$, so it is in $S$.",
        fr: "$(0,0)$ donne $\\sin(x^2)\\sin\\tfrac1{x^2}\\to0$ : il est dans $S$.",
        es: "$(0,0)$ da $\\sin(x^2)\\sin\\tfrac1{x^2}\\to0$: está en $S$.",
        ja: "$(0,0)$ で $\\sin(x^2)\\sin\\tfrac1{x^2}\\to0$ なので $S$ に属する。",
        zh: "$(0,0)$ 时 $\\sin(x^2)\\sin\\tfrac1{x^2}\\to0$，属于 $S$。"
      } },
      { tex: "S=\\{(\\alpha,\\beta):\\alpha\\beta>-2\\}", correct: false, why: {
        en: "Also points with $\\alpha\\beta=-2$ and $\\alpha<\\beta$, e.g. $(-1,2)$, are in $S$.",
        fr: "Les points avec $\\alpha\\beta=-2$ et $\\alpha<\\beta$, comme $(-1,2)$, sont aussi dans $S$.",
        es: "También están en $S$ los puntos con $\\alpha\\beta=-2$ y $\\alpha<\\beta$, como $(-1,2)$.",
        ja: "$\\alpha\\beta=-2$ かつ $\\alpha<\\beta$（例 $(-1,2)$）も $S$ に入る。",
        zh: "$\\alpha\\beta=-2$ 且 $\\alpha<\\beta$ 的点（如 $(-1,2)$）也在 $S$ 中。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Size of the expression",
          fr: "Taille de l’expression",
          es: "Tamaño de la expresión",
          ja: "式の大きさ",
          zh: "式子的量级"
        },
        lines: ["\\Bigl|\\cdots\\Bigr|\\approx|\\sin x^2|\\cdot(\\ln x)^{\\alpha-\\beta}\\,x^{-(\\alpha\\beta+2)}"],
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
          en: "Condition",
          fr: "Condition",
          es: "Condición",
          ja: "条件",
          zh: "条件"
        },
        lines: ["\\alpha\\beta>-2,\\quad\\text{or}\\quad\\alpha\\beta=-2\\ \\text{and}\\ \\alpha<\\beta"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "If $\\alpha\\beta<-2$ the power of $x$ grows and $\\sin x^2$ keeps returning to $\\pm1$.",
          fr: "Si $\\alpha\\beta<-2$, la puissance de $x$ croît et $\\sin x^2$ revient sans cesse à $\\pm1$.",
          es: "Si $\\alpha\\beta<-2$, la potencia de $x$ crece y $\\sin x^2$ vuelve una y otra vez a $\\pm1$.",
          ja: "$\\alpha\\beta<-2$ だと $x$ の累乗が増え、$\\sin x^2$ は何度も $\\pm1$ になる。",
          zh: "若 $\\alpha\\beta<-2$，$x$ 的幂增大，而 $\\sin x^2$ 反复取到 $\\pm1$。"
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
