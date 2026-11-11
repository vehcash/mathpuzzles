/* algebra · Three logarithms in a loop
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2019-log-system",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2019 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Three logarithms in a loop",
      fr: "Trois logarithmes en boucle",
      es: "Tres logaritmos en bucle",
      ja: "循環する3つの対数",
      zh: "循环的三个对数"
    },
    statement: {
      en: "Positive reals $a,b,c$ satisfy $\\log_a b=c$, $\\log_b a=c+\\tfrac32$ and $\\log_c a=b$. <b>Which of the following are true?</b>",
      fr: "Des réels positifs $a,b,c$ vérifient $\\log_a b=c$, $\\log_b a=c+\\tfrac32$ et $\\log_c a=b$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los reales positivos $a,b,c$ cumplen $\\log_a b=c$, $\\log_b a=c+\\tfrac32$ y $\\log_c a=b$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "正の実数 $a,b,c$ が $\\log_a b=c$、$\\log_b a=c+\\tfrac32$、$\\log_c a=b$ を満たします。<b>次のうち正しいものはどれですか？</b>",
      zh: "正实数 $a,b,c$ 满足 $\\log_a b=c$，$\\log_b a=c+\\tfrac32$，$\\log_c a=b$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The decreasing curve y = (1/2)^√t for t ≥ 0. Its comparison with y = t is drawn in the solution.",
      fr: "La courbe décroissante y = (1/2)^√t pour t ≥ 0. Sa comparaison avec y = t est tracée dans la solution.",
      es: "La curva decreciente y = (1/2)^√t para t ≥ 0. Su comparación con y = t se dibuja en la solución.",
      ja: "t ≥ 0 の減少する曲線 y = (1/2)^√t。y = t との比較は解答で描きます。",
      zh: "t ≥ 0 时递减的曲线 y = (1/2)^√t。与 y = t 的比较在解答中画出。"
    },
    hint: {
      en: "$\\log_b a=\\dfrac{1}{\\log_a b}$, so the first two equations give a quadratic in $c$.",
      fr: "$\\log_b a=\\dfrac{1}{\\log_a b}$ : les deux premières équations donnent une quadratique en $c$.",
      es: "$\\log_b a=\\dfrac{1}{\\log_a b}$: las dos primeras ecuaciones dan una cuadrática en $c$.",
      ja: "$\\log_b a=\\dfrac{1}{\\log_a b}$ なので最初の2式から $c$ の2次方程式。",
      zh: "$\\log_b a=\\dfrac{1}{\\log_a b}$，前两式给出 $c$ 的二次方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.0, scale: 80, pad: 18 });
      const T = F.T = axes(F, -0.2, 1.4, -0.2, 1.2, { xl: 't' });
      plot(F, T, t => Math.pow(0.5, Math.sqrt(t)), 0, 1.3, 'graph'); F.text(T([1.25, Math.pow(0.5, Math.sqrt(1.25))]), '(½)^√t', 'len small', 0, -12);
      F.reveal = () => {
      plot(F, T, t => t, 0, 1.15, 'seg');
      F.dot(T([0.5878, 0.5878])); F.text(T([0.5878, 0.5878]), 'a', 'pt', 0, 20);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there is exactly one triple": {"fr": "il existe exactement un triplet", "es": "hay exactamente un trío", "ja": "組はちょうど1つ", "zh": "恰有一组"},
      "there is no solution": {"fr": "il n’y a aucune solution", "es": "no hay solución", "ja": "解はない", "zh": "无解"},
      "there are infinitely many solutions": {"fr": "il y a une infinité de solutions", "es": "hay infinitas soluciones", "ja": "解は無限にある", "zh": "有无穷多解"},
      "increasing": {"fr": "croissante", "es": "creciente", "ja": "増加", "zh": "递增"},
      "decreasing": {"fr": "décroissante", "es": "decreciente", "ja": "減少", "zh": "递减"},
      "one": {"fr": "un seul", "es": "un solo", "ja": "ただ1つの", "zh": "唯一的"}
    },
    options: [
      { tex: "c=\\tfrac12", correct: true, why: {
        en: "$\\tfrac1c=c+\\tfrac32\\Rightarrow2c^2+3c-2=0$, $c>0$.",
        fr: "$\\tfrac1c=c+\\tfrac32\\Rightarrow2c^2+3c-2=0$, $c>0$.",
        es: "$\\tfrac1c=c+\\tfrac32\\Rightarrow2c^2+3c-2=0$, $c>0$.",
        ja: "$\\tfrac1c=c+\\tfrac32\\Rightarrow2c^2+3c-2=0$, $c>0$.",
        zh: "$\\tfrac1c=c+\\tfrac32\\Rightarrow2c^2+3c-2=0$, $c>0$."
      } },
      { tex: "\\text{there is exactly one triple } (a,b,c)", correct: true, why: {
        en: "$b=\\sqrt a$ and $a=\\left(\\tfrac12\\right)^{\\sqrt a}$ has one root.",
        fr: "$b=\\sqrt a$ et $a=\\left(\\tfrac12\\right)^{\\sqrt a}$ a une seule racine.",
        es: "$b=\\sqrt a$ y $a=\\left(\\tfrac12\\right)^{\\sqrt a}$ tiene una sola raíz.",
        ja: "$b=\\sqrt a$、$a=\\left(\\tfrac12\\right)^{\\sqrt a}$ の解は1つ。",
        zh: "$b=\\sqrt a$，$a=\\left(\\tfrac12\\right)^{\\sqrt a}$ 只有一个根。"
      } },
      { tex: "c=-2", correct: false, why: {
        en: "The other root of the quadratic, but $c>0$.",
        fr: "L’autre racine, mais $c>0$.",
        es: "La otra raíz, pero $c>0$.",
        ja: "もう1つの解だが $c>0$。",
        zh: "另一根，但 $c>0$。"
      } },
      { tex: "c=2", correct: false, why: {
        en: "$\\tfrac12\\ne2+\\tfrac32$.",
        fr: "$\\tfrac12\\ne2+\\tfrac32$.",
        es: "$\\tfrac12\\ne2+\\tfrac32$.",
        ja: "$\\tfrac12\\ne2+\\tfrac32$.",
        zh: "$\\tfrac12\\ne2+\\tfrac32$."
      } },
      { tex: "\\text{there is no solution}", correct: false, why: {
        en: "$a\\approx0.588$, $b\\approx0.767$, $c=\\tfrac12$ works.",
        fr: "$a\\approx0{,}588$, $b\\approx0{,}767$, $c=\\tfrac12$ convient.",
        es: "$a\\approx0{,}588$, $b\\approx0{,}767$, $c=\\tfrac12$ sirve.",
        ja: "$a\\approx0.588$, $b\\approx0.767$, $c=\\tfrac12$ で成り立つ。",
        zh: "$a\\approx0.588$，$b\\approx0.767$，$c=\\tfrac12$ 成立。"
      } },
      { tex: "\\text{there are infinitely many solutions}", correct: false, why: {
        en: "$c$ is fixed, then $a$ is the unique crossing.",
        fr: "$c$ est fixé, puis $a$ est l’unique intersection.",
        es: "$c$ queda fijo y $a$ es el único corte.",
        ja: "$c$ が決まり、$a$ は唯一の交点。",
        zh: "$c$ 确定后 $a$ 是唯一交点。"
      } },
      { tex: "a=b", correct: false, why: {
        en: "Then $c=1$, contradicting $c=\\tfrac12$.",
        fr: "Alors $c=1$, contradiction avec $c=\\tfrac12$.",
        es: "Entonces $c=1$, contradicción con $c=\\tfrac12$.",
        ja: "$c=1$ となり $c=\\tfrac12$ に矛盾。",
        zh: "则 $c=1$，与 $c=\\tfrac12$ 矛盾。"
      } },
      { tex: "a>1", correct: false, why: {
        en: "$a=\\left(\\tfrac12\\right)^{b}<1$ since $b>0$.",
        fr: "$a=\\left(\\tfrac12\\right)^{b}<1$ car $b>0$.",
        es: "$a=\\left(\\tfrac12\\right)^{b}<1$ pues $b>0$.",
        ja: "$b>0$ より $a=\\left(\\tfrac12\\right)^{b}<1$。",
        zh: "因 $b>0$，$a=\\left(\\tfrac12\\right)^{b}<1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find c",
          fr: "Trouver c",
          es: "Hallar c",
          ja: "c を求める",
          zh: "求 c"
        },
        lines: ["\\frac1c=c+\\frac32\\iff2c^2+3c-2=0\\iff(2c-1)(c+2)=0\\;\\Rightarrow\\;c=\\tfrac12"],
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
          en: "Express b and a",
          fr: "Exprimer b et a",
          es: "Expresar b y a",
          ja: "b と a を表す",
          zh: "表示 b 与 a"
        },
        lines: ["b=a^{c}=\\sqrt a,\\qquad a=c^{\\,b}=\\left(\\tfrac12\\right)^{\\sqrt a}"],
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
          en: "One crossing",
          fr: "Une seule intersection",
          es: "Un solo corte",
          ja: "交点は1つ",
          zh: "唯一交点"
        },
        lines: ["t\\ \\text{increasing},\\ \\left(\\tfrac12\\right)^{\\sqrt t}\\ \\text{decreasing}\\;\\Rightarrow\\;\\text{one } a\\approx0.588"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "So the system specifies exactly one triple.",
          fr: "Le système définit donc un seul triplet.",
          es: "El sistema determina un único trío.",
          ja: "連立方程式はちょうど1組を定める。",
          zh: "方程组恰确定一组解。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
