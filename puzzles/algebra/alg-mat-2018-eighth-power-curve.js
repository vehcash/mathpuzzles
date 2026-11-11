/* algebra · A curve hiding a binomial
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2018-eighth-power-curve",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2018 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A curve hiding a binomial",
      fr: "Une courbe qui cache un binôme",
      es: "Una curva que esconde un binomio",
      ja: "二項展開を隠した曲線",
      zh: "藏着二项式的曲线"
    },
    statement: {
      en: "Consider the curve $\\left(x^8+4yx^6+6y^2x^4+4y^3x^2+y^4\\right)^2=1$. <b>Which of the following are true?</b>",
      fr: "On considère la courbe $\\left(x^8+4yx^6+6y^2x^4+4y^3x^2+y^4\\right)^2=1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la curva $\\left(x^8+4yx^6+6y^2x^4+4y^3x^2+y^4\\right)^2=1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "曲線 $\\left(x^8+4yx^6+6y^2x^4+4y^3x^2+y^4\\right)^2=1$ を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑曲线 $\\left(x^8+4yx^6+6y^2x^4+4y^3x^2+y^4\\right)^2=1$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Empty axes with ±1 marked. The curve is drawn in the solution.",
      fr: "Axes vides avec ±1 marqués. La courbe est tracée dans la solution.",
      es: "Ejes vacíos con ±1 marcados. La curva se dibuja en la solución.",
      ja: "±1 に目盛りをつけた座標軸。曲線は解答で描きます。",
      zh: "标出 ±1 的空坐标轴。曲线在解答中画出。"
    },
    hint: {
      en: "The coefficients $1,4,6,4,1$ are a row of Pascal’s triangle. In terms of $x^2$ and $y$?",
      fr: "Les coefficients $1,4,6,4,1$ forment une ligne du triangle de Pascal. En fonction de $x^2$ et $y$ ?",
      es: "Los coeficientes $1,4,6,4,1$ son una fila del triángulo de Pascal. ¿En función de $x^2$ e $y$?",
      ja: "係数 $1,4,6,4,1$ はパスカルの三角形の1行。$x^2$ と $y$ で書くと？",
      zh: "系数 $1,4,6,4,1$ 是杨辉三角的一行。用 $x^2$ 与 $y$ 表示？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 50, pad: 18 });
      const T = F.T = axes(F, -2.2, 2.2, -3.2, 1.2);
      [[1, '1'], [-1, '−1']].forEach(([v, t]) => { F.seg(T([-0.06, v]), T([0.06, v]), 'seg thin'); F.text(T([0, v]), t, 'tick', -14, 0); F.seg(T([v, -0.06]), T([v, 0.06]), 'seg thin'); });
      F.reveal = () => {
      plot(F, T, x => 1 - x * x, -2.0, 2.0, 'graph', 'base', -3.2, 1.2); plot(F, T, x => -1 - x * x, -1.5, 1.5, 'graph', 'base', -3.2, 1.2);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "it is the pair of parabolas": {"fr": "c’est le couple de paraboles", "es": "es el par de parábolas", "ja": "は2つの放物線", "zh": "是两条抛物线"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "和"},
      "lie on it": {"fr": "sont dessus", "es": "están en ella", "ja": "は曲線上にある", "zh": "在曲线上"},
      "it is a single parabola": {"fr": "c’est une seule parabole", "es": "es una sola parábola", "ja": "は1つの放物線", "zh": "是一条抛物线"},
      "it is the unit circle": {"fr": "c’est le cercle unité", "es": "es la circunferencia unidad", "ja": "は単位円", "zh": "是单位圆"},
      "lies on it": {"fr": "est dessus", "es": "está en ella", "ja": "は曲線上にある", "zh": "在曲线上"},
      "it is the pair": {"fr": "c’est le couple", "es": "es el par", "ja": "は次の2曲線", "zh": "是这一对"},
      "it is bounded": {"fr": "elle est bornée", "es": "está acotada", "ja": "は有界", "zh": "有界"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "\\text{it is the pair of parabolas } y=1-x^2,\\ y=-1-x^2", correct: true, why: {
        en: "$(x^2+y)^8=1\\iff x^2+y=\\pm1$.",
        fr: "$(x^2+y)^8=1\\iff x^2+y=\\pm1$.",
        es: "$(x^2+y)^8=1\\iff x^2+y=\\pm1$.",
        ja: "$(x^2+y)^8=1\\iff x^2+y=\\pm1$.",
        zh: "$(x^2+y)^8=1\\iff x^2+y=\\pm1$."
      } },
      { tex: "(0,1)\\ \\text{and}\\ (0,-1)\\ \\text{lie on it}", correct: true, why: {
        en: "$x^2+y=\\pm1$ at both.",
        fr: "$x^2+y=\\pm1$ aux deux.",
        es: "$x^2+y=\\pm1$ en ambos.",
        ja: "どちらも $x^2+y=\\pm1$。",
        zh: "两点都满足 $x^2+y=\\pm1$。"
      } },
      { tex: "\\text{it is a single parabola}", correct: false, why: {
        en: "Both signs of $\\pm1$ give a branch.",
        fr: "Les deux signes de $\\pm1$ donnent une branche.",
        es: "Los dos signos de $\\pm1$ dan una rama.",
        ja: "$\\pm1$ の両方から曲線が出る。",
        zh: "$\\pm1$ 两个符号各给一支。"
      } },
      { tex: "\\text{it is the unit circle}", correct: false, why: {
        en: "$(1,0)$ is on it but $(0.6,0.8)$ is not.",
        fr: "$(1,0)$ y est mais pas $(0{,}6\\,;0{,}8)$.",
        es: "$(1,0)$ está pero $(0{,}6;0{,}8)$ no.",
        ja: "$(1,0)$ は乗るが $(0.6,0.8)$ は乗らない。",
        zh: "$(1,0)$ 在上面，$(0.6,0.8)$ 不在。"
      } },
      { tex: "(1,1)\\ \\text{lies on it}", correct: false, why: {
        en: "$x^2+y=2$.",
        fr: "$x^2+y=2$.",
        es: "$x^2+y=2$.",
        ja: "$x^2+y=2$.",
        zh: "$x^2+y=2$."
      } },
      { tex: "\\text{it is the pair } y=\\pm(1-x^2)", correct: false, why: {
        en: "$y=x^2-1$ would need $x^2+y=2x^2-1$ to be $\\pm1$.",
        fr: "$y=x^2-1$ demanderait $x^2+y=2x^2-1=\\pm1$.",
        es: "$y=x^2-1$ exigiría $x^2+y=2x^2-1=\\pm1$.",
        ja: "$y=x^2-1$ だと $x^2+y=2x^2-1$。",
        zh: "$y=x^2-1$ 时 $x^2+y=2x^2-1$。"
      } },
      { tex: "\\text{it is bounded}", correct: false, why: {
        en: "Each parabola goes to $-\\infty$.",
        fr: "Chaque parabole descend à $-\\infty$.",
        es: "Cada parábola baja a $-\\infty$.",
        ja: "どちらの放物線も $-\\infty$ へ。",
        zh: "两条抛物线都趋于 $-\\infty$。"
      } },
      { tex: "(0,0)\\ \\text{lies on it}", correct: false, why: {
        en: "$0\\ne1$.",
        fr: "$0\\ne1$.",
        es: "$0\\ne1$.",
        ja: "$0\\ne1$.",
        zh: "$0\\ne1$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Spot the binomial",
          fr: "Repérer le binôme",
          es: "Ver el binomio",
          ja: "二項展開に気づく",
          zh: "认出二项式"
        },
        lines: ["x^8+4yx^6+6y^2x^4+4y^3x^2+y^4=(x^2+y)^4"],
        note: {
          en: "Binomial theorem with $u=x^2$, $v=y$.",
          fr: "Formule du binôme avec $u=x^2$, $v=y$.",
          es: "Binomio de Newton con $u=x^2$, $v=y$.",
          ja: "$u=x^2$, $v=y$ の二項定理。",
          zh: "以 $u=x^2$、$v=y$ 用二项式定理。"
        }
      },
      {
        title: {
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["(x^2+y)^8=1\\iff x^2+y=\\pm1\\iff y=1-x^2\\ \\text{or}\\ y=-1-x^2"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "A real eighth root of $1$ is $\\pm1$.",
          fr: "Une racine huitième réelle de $1$ vaut $\\pm1$.",
          es: "Una raíz octava real de $1$ es $\\pm1$.",
          ja: "1 の実数の8乗根は $\\pm1$。",
          zh: "1 的实八次方根是 $\\pm1$。"
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
