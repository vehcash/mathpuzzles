/* trigonometry · A series equal to tan x
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2020-tan-series",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2020 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A series equal to tan x",
      fr: "Une série égale à tan x",
      es: "Una serie igual a tan x",
      ja: "tan x に等しい級数",
      zh: "等于 tan x 的级数"
    },
    statement: {
      en: "Consider the equation $\\dfrac{1}{\\tan x}+\\dfrac{1}{\\tan^2 x}+\\dfrac{1}{\\tan^3 x}+\\cdots=\\tan x$ for $-90^\\circ<x<90^\\circ$, where the left side must be a convergent infinite sum. <b>Which of the following are true?</b>",
      fr: "On considère l’équation $\\dfrac{1}{\\tan x}+\\dfrac{1}{\\tan^2 x}+\\dfrac{1}{\\tan^3 x}+\\cdots=\\tan x$ pour $-90^\\circ<x<90^\\circ$, où le membre de gauche doit être une somme infinie convergente. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la ecuación $\\dfrac{1}{\\tan x}+\\dfrac{1}{\\tan^2 x}+\\dfrac{1}{\\tan^3 x}+\\cdots=\\tan x$ para $-90^\\circ<x<90^\\circ$, donde el lado izquierdo debe ser una suma infinita convergente. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$-90^\\circ<x<90^\\circ$ で方程式 $\\dfrac{1}{\\tan x}+\\dfrac{1}{\\tan^2 x}+\\dfrac{1}{\\tan^3 x}+\\cdots=\\tan x$ を考えます（左辺は収束する無限和）。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑方程 $\\dfrac{1}{\\tan x}+\\dfrac{1}{\\tan^2 x}+\\dfrac{1}{\\tan^3 x}+\\cdots=\\tan x$，$-90^\\circ<x<90^\\circ$，左边须是收敛的无穷级数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes in t = tan x with the line y = t (the right-hand side) drawn. The sum of the series is added in the solution.",
      fr: "Axes en t = tan x avec la droite y = t (le second membre). La somme de la série est ajoutée dans la solution.",
      es: "Ejes en t = tan x con la recta y = t (el lado derecho). La suma de la serie se añade en la solución.",
      ja: "t = tan x の座標軸と右辺の直線 y = t。級数の和は解答で加えます。",
      zh: "以 t = tan x 为横轴，画出右边 y = t。级数之和在解答中加上。"
    },
    hint: {
      en: "It is a geometric series with ratio $\\frac{1}{\\tan x}$: when does it converge, and to what?",
      fr: "C’est une série géométrique de raison $\\frac{1}{\\tan x}$ : quand converge-t-elle, et vers quoi ?",
      es: "Es una serie geométrica de razón $\\frac{1}{\\tan x}$: ¿cuándo converge y a qué?",
      ja: "公比 $\\frac{1}{\\tan x}$ の等比級数です。いつ収束し、和はいくらでしょう？",
      zh: "这是公比为 $\\frac{1}{\\tan x}$ 的等比级数：何时收敛，和是多少？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 4.2, scale: 48, pad: 18 });
      const T = F.T = axes(F, -3, 3, -2.2, 2.0, { xl: 't' });
      F.text(T([-1, 0]), '−1', 'tick', -10, -12); F.text(T([1, 0]), '1', 'tick', 8, -12);
      plot(F, T, t => t, -2.2, 2.0, 'seg thin'); F.text(T([1.9, 1.9]), 'y = t', 'len small', -22, 0);
      F.reveal = () => {
      F.rect(T([-1, -2.2])[0], 0, 2, 4.2, 'fill-pink', 'fills');
      plot(F, T, t => 1 / (t - 1), 1.2, 3, 'graph', 'base', -2.2, 2.0);
      plot(F, T, t => 1 / (t - 1), -3, -1.12, 'graph');
      F.circle(T([-1.12, 1 / (-2.12)]), 0.06, 'seg');
      const p = (1 + Math.sqrt(5)) / 2; F.dot(T([p, p])); F.text(T([p, p]), 'φ', 'len', -14, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "exactly one": {"fr": "exactement un", "es": "exactamente un", "ja": "ちょうど1つの", "zh": "恰好一个"},
      "works": {"fr": "convient", "es": "sirve", "ja": "が解", "zh": "满足"},
      "work": {"fr": "conviennent", "es": "sirven", "ja": "が解", "zh": "满足"},
      "at a solution": {"fr": "pour une solution", "es": "en una solución", "ja": "（解において）", "zh": "（在某个解处）"},
      "exactly two": {"fr": "exactement deux", "es": "exactamente dos", "ja": "ちょうど2つの", "zh": "恰好两个"},
      "no solution": {"fr": "aucune solution", "es": "ninguna solución", "ja": "解なし", "zh": "无解"},
      "converges": {"fr": "converge", "es": "converge", "ja": "は収束する", "zh": "收敛"},
      "infinitely many": {"fr": "une infinité de", "es": "infinitos", "ja": "無数の", "zh": "无穷多个"},
      "one": {"fr": "un seul", "es": "un solo", "ja": "1つの", "zh": "一个"}
    },
    options: [
      { tex: "\\text{exactly one } x \\text{ works}", correct: true, why: {
        en: "Only $\\tan x=\\tfrac{1+\\sqrt5}{2}$ survives the convergence condition.",
        fr: "Seul $\\tan x=\\tfrac{1+\\sqrt5}{2}$ respecte la condition de convergence.",
        es: "Solo $\\tan x=\\tfrac{1+\\sqrt5}{2}$ cumple la condición de convergencia.",
        ja: "収束条件を満たすのは $\\tan x=\\tfrac{1+\\sqrt5}{2}$ だけ。",
        zh: "只有 $\\tan x=\\tfrac{1+\\sqrt5}{2}$ 满足收敛条件。"
      } },
      { tex: "\\tan x=\\tfrac{1+\\sqrt5}{2} \\text{ at a solution}", correct: true, why: {
        en: "From $\\tfrac{1}{t-1}=t$, i.e. $t^2-t-1=0$, with $|t|>1$.",
        fr: "De $\\tfrac{1}{t-1}=t$, soit $t^2-t-1=0$, avec $|t|>1$.",
        es: "De $\\tfrac{1}{t-1}=t$, o sea $t^2-t-1=0$, con $|t|>1$.",
        ja: "$\\tfrac{1}{t-1}=t$ すなわち $t^2-t-1=0$ で $|t|>1$。",
        zh: "由 $\\tfrac{1}{t-1}=t$，即 $t^2-t-1=0$，且 $|t|>1$。"
      } },
      { tex: "\\text{exactly two } x \\text{ work}", correct: false, why: {
        en: "The second root $\\tfrac{1-\\sqrt5}{2}\\approx-0.62$ makes the series diverge.",
        fr: "La seconde racine $\\tfrac{1-\\sqrt5}{2}\\approx-0{,}62$ fait diverger la série.",
        es: "La segunda raíz $\\tfrac{1-\\sqrt5}{2}\\approx-0{,}62$ hace divergir la serie.",
        ja: "もう1つの解 $\\tfrac{1-\\sqrt5}{2}\\approx-0.62$ では級数が発散。",
        zh: "另一个根 $\\tfrac{1-\\sqrt5}{2}\\approx-0.62$ 使级数发散。"
      } },
      { tex: "\\text{no solution}", correct: false, why: {
        en: "$t=\\tfrac{1+\\sqrt5}{2}>1$ does work.",
        fr: "$t=\\tfrac{1+\\sqrt5}{2}>1$ convient.",
        es: "$t=\\tfrac{1+\\sqrt5}{2}>1$ sí sirve.",
        ja: "$t=\\tfrac{1+\\sqrt5}{2}>1$ は条件を満たす。",
        zh: "$t=\\tfrac{1+\\sqrt5}{2}>1$ 是可以的。"
      } },
      { tex: "x=45^\\circ \\text{ works}", correct: false, why: {
        en: "$\\tan45^\\circ=1$: the series $1+1+1+\\cdots$ diverges.",
        fr: "$\\tan45^\\circ=1$ : la série $1+1+1+\\cdots$ diverge.",
        es: "$\\tan45^\\circ=1$: la serie $1+1+1+\\cdots$ diverge.",
        ja: "$\\tan45^\\circ=1$ で級数 $1+1+1+\\cdots$ は発散。",
        zh: "$\\tan45^\\circ=1$：级数 $1+1+1+\\cdots$ 发散。"
      } },
      { tex: "\\tan x=\\tfrac{1-\\sqrt5}{2} \\text{ at a solution}", correct: false, why: {
        en: "Here $|1/\\tan x|>1$, so the left side has no sum.",
        fr: "Ici $|1/\\tan x|>1$ : le membre de gauche n’a pas de somme.",
        es: "Aquí $|1/\\tan x|>1$: el lado izquierdo no tiene suma.",
        ja: "ここでは $|1/\\tan x|>1$ で左辺の和がない。",
        zh: "此时 $|1/\\tan x|>1$，左边没有和。"
      } },
      { tex: "\\text{infinitely many } x \\text{ work}", correct: false, why: {
        en: "$\\tan$ is one-to-one on $(-90^\\circ,90^\\circ)$.",
        fr: "$\\tan$ est injective sur $(-90^\\circ,90^\\circ)$.",
        es: "$\\tan$ es inyectiva en $(-90^\\circ,90^\\circ)$.",
        ja: "$(-90^\\circ,90^\\circ)$ で $\\tan$ は1対1。",
        zh: "$\\tan$ 在 $(-90^\\circ,90^\\circ)$ 上一一对应。"
      } },
      { tex: "\\sum_{k\\ge1}\\tan^{-k}30^\\circ \\text{ converges}", correct: false, why: {
        en: "$\\tan30^\\circ\\approx0.58$: the ratio $1/\\tan30^\\circ>1$, so it diverges.",
        fr: "$\\tan30^\\circ\\approx0{,}58$ : la raison $1/\\tan30^\\circ>1$, la série diverge.",
        es: "$\\tan30^\\circ\\approx0{,}58$: la razón $1/\\tan30^\\circ>1$, diverge.",
        ja: "$\\tan30^\\circ\\approx0.58$ で公比 $1/\\tan30^\\circ>1$、発散する。",
        zh: "$\\tan30^\\circ\\approx0.58$，公比 $1/\\tan30^\\circ>1$，发散。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Sum the series",
          fr: "Sommer la série",
          es: "Sumar la serie",
          ja: "級数の和",
          zh: "求级数的和"
        },
        lines: ["t=\\tan x,\\ |t|>1:\\quad \\sum_{k\\ge1}\\frac{1}{t^k}=\\frac{1/t}{1-1/t}=\\frac{1}{t-1}"],
        note: {
          en: "A geometric series converges only when the ratio $\\tfrac1t$ has size below $1$.",
          fr: "Une série géométrique ne converge que si la raison $\\tfrac1t$ est de valeur absolue $<1$.",
          es: "Una serie geométrica solo converge si la razón $\\tfrac1t$ tiene valor absoluto $<1$.",
          ja: "等比級数は公比 $\\tfrac1t$ の絶対値が $1$ 未満のときだけ収束。",
          zh: "等比级数仅当公比 $\\tfrac1t$ 的绝对值小于 $1$ 时收敛。"
        }
      },
      {
        title: {
          en: "Solve and filter",
          fr: "Résoudre et trier",
          es: "Resolver y filtrar",
          ja: "解いて選ぶ",
          zh: "求解并筛选"
        },
        lines: ["\\frac{1}{t-1}=t \\iff t^2-t-1=0 \\iff t=\\tfrac{1\\pm\\sqrt5}{2}", "|t|>1 \\;\\Rightarrow\\; t=\\tfrac{1+\\sqrt5}{2}\\ \\Rightarrow\\ \\boxed{\\text{one } x}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$\\tfrac{1-\\sqrt5}{2}\\approx-0.618$ fails $|t|>1$.",
          fr: "$\\tfrac{1-\\sqrt5}{2}\\approx-0{,}618$ ne vérifie pas $|t|>1$.",
          es: "$\\tfrac{1-\\sqrt5}{2}\\approx-0{,}618$ no cumple $|t|>1$.",
          ja: "$\\tfrac{1-\\sqrt5}{2}\\approx-0.618$ は $|t|>1$ を満たさない。",
          zh: "$\\tfrac{1-\\sqrt5}{2}\\approx-0.618$ 不满足 $|t|>1$。"
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
          en: "The convergence condition removes one root.",
          fr: "La condition de convergence élimine une racine.",
          es: "La condición de convergencia elimina una raíz.",
          ja: "収束条件で解が1つ消えます。",
          zh: "收敛条件排除了一个根。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
