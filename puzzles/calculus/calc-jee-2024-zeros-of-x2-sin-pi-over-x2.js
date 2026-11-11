/* calculus · Counting zeros of x² sin(π/x²)
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-zeros-of-x2-sin-pi-over-x2",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.4",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.4",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.4",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.4",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.4"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Counting zeros of x² sin(π/x²)",
      fr: "Compter les zéros de x² sin(π/x²)",
      es: "Contar los ceros de x² sen(π/x²)",
      ja: "x² sin(π/x²) の零点を数える",
      zh: "数 x² sin(π/x²) 的零点"
    },
    statement: {
      en: "$f(x)=x^2\\sin\\!\\left(\\dfrac{\\pi}{x^2}\\right)$ for $x\\ne0$ and $f(0)=0$. <b>Which of the following are true?</b>",
      fr: "$f(x)=x^2\\sin\\!\\left(\\dfrac{\\pi}{x^2}\\right)$ pour $x\\ne0$ et $f(0)=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=x^2\\sin\\!\\left(\\dfrac{\\pi}{x^2}\\right)$ si $x\\ne0$ y $f(0)=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x\\ne0$ で $f(x)=x^2\\sin\\!\\left(\\dfrac{\\pi}{x^2}\\right)$、$f(0)=0$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $x\\ne0$ 时 $f(x)=x^2\\sin\\!\\left(\\dfrac{\\pi}{x^2}\\right)$，$f(0)=0$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of f for 0.2 < x < 1.2, oscillating faster and faster as x approaches 0.",
      fr: "La courbe de f pour 0,2 < x < 1,2, qui oscille de plus en plus vite près de 0.",
      es: "La gráfica de f para 0,2 < x < 1,2, que oscila cada vez más rápido cerca de 0.",
      ja: "0.2 < x < 1.2 での f のグラフ。0 に近づくほど速く振動。",
      zh: "0.2 < x < 1.2 上 f 的图像，越接近 0 振荡越快。"
    },
    hint: {
      en: "For $x>0$, $f(x)=0$ exactly when $\\tfrac{\\pi}{x^2}=n\\pi$, i.e. $x=\\tfrac1{\\sqrt n}$.",
      fr: "Pour $x>0$, $f(x)=0$ exactement quand $\\tfrac{\\pi}{x^2}=n\\pi$, soit $x=\\tfrac1{\\sqrt n}$.",
      es: "Para $x>0$, $f(x)=0$ justo cuando $\\tfrac{\\pi}{x^2}=n\\pi$, es decir $x=\\tfrac1{\\sqrt n}$.",
      ja: "$x>0$ では $\\tfrac{\\pi}{x^2}=n\\pi$、つまり $x=\\tfrac1{\\sqrt n}$ のとき零点。",
      zh: "$x>0$ 时 $f(x)=0\\iff\\tfrac{\\pi}{x^2}=n\\pi$，即 $x=\\tfrac1{\\sqrt n}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 1.6, h: 2.5, scale: 170, pad: 16 });
      const T = F.T = axes(F, -0.2, 1.4, -1.0, 1.5);
      const S = 3.6; const TT = ([x, y]) => T([x, y]);
      const g = x => x * x * Math.sin(Math.PI / (x * x));
      const p = []; for (let k = 0; k <= 800; k++) { const x = 0.2 + 1.0 * k / 800; p.push(T([x, g(x)])); } F.path(p, 'graph', 'base', false);
      F.text(T([1, 0]), '1', 'tick', 0, 14);
      F.reveal = () => {
      for (let n = 1; n <= 25; n++) F.dot(T([1 / Math.sqrt(n), 0]));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "has more than 25 solutions in": {"fr": "a plus de 25 solutions dans", "es": "tiene más de 25 soluciones en", "ja": "の解は次の区間に 25 個より多い：", "zh": "在下列区间有多于 25 个解："},
      "has exactly 9 solutions in": {"fr": "a exactement 9 solutions dans", "es": "tiene exactamente 9 soluciones en", "ja": "の解は次の区間にちょうど 9 個：", "zh": "在下列区间恰有 9 个解："},
      "has no solutions in": {"fr": "n’a pas de solution dans", "es": "no tiene soluciones en", "ja": "の解は次の区間にない：", "zh": "在下列区间无解："},
      "has infinitely many solutions in": {"fr": "a une infinité de solutions dans", "es": "tiene infinitas soluciones en", "ja": "の解は次の区間に無限個：", "zh": "在下列区间有无穷多解："},
      "the solutions in": {"fr": "les solutions dans", "es": "las soluciones en", "ja": "次の区間の解", "zh": "下列区间内的解"},
      "form a finite set": {"fr": "forment un ensemble fini", "es": "forman un conjunto finito", "ja": "は有限個", "zh": "构成有限集"},
      "has exactly 25 solutions in": {"fr": "a exactement 25 solutions dans", "es": "tiene exactamente 25 soluciones en", "ja": "の解は次の区間にちょうど 25 個：", "zh": "在下列区间恰有 25 个解："},
      "is not continuous at": {"fr": "n’est pas continue en", "es": "no es continua en", "ja": "は次で連続でない：", "zh": "在下列点不连续："},
      "the largest solution is": {"fr": "la plus grande solution est", "es": "la mayor solución es", "ja": "最大の解は", "zh": "最大解为"},
      "solutions": {"fr": "solutions", "es": "soluciones", "ja": "個の解", "zh": "个解"}
    },
    options: [
      { tex: "f(x)=0\\ \\text{has more than 25 solutions in}\\ \\left(\\tfrac1{\\pi^2},\\tfrac1\\pi\\right)", correct: true, why: {
        en: "$\\tfrac1{\\sqrt n}$ lies there for $n=10,\\dots,97$: $88$ solutions.",
        fr: "$\\tfrac1{\\sqrt n}$ y est pour $n=10,\\dots,97$ : $88$ solutions.",
        es: "$\\tfrac1{\\sqrt n}$ está ahí para $n=10,\\dots,97$: $88$ soluciones.",
        ja: "$n=10,\\dots,97$ の $\\tfrac1{\\sqrt n}$ で $88$ 個。",
        zh: "$n=10,\\dots,97$ 时 $\\tfrac1{\\sqrt n}$ 在其中，共 $88$ 个。"
      } },
      { tex: "f(x)=0\\ \\text{has exactly 9 solutions in}\\ \\left[\\tfrac1\\pi,\\infty\\right)", correct: true, why: {
        en: "$\\tfrac1{\\sqrt n}\\ge\\tfrac1\\pi$ means $n\\le\\pi^2\\approx9.87$.",
        fr: "$\\tfrac1{\\sqrt n}\\ge\\tfrac1\\pi$ signifie $n\\le\\pi^2\\approx9{,}87$.",
        es: "$\\tfrac1{\\sqrt n}\\ge\\tfrac1\\pi$ significa $n\\le\\pi^2\\approx9{,}87$.",
        ja: "$\\tfrac1{\\sqrt n}\\ge\\tfrac1\\pi$ は $n\\le\\pi^2\\approx9.87$。",
        zh: "$\\tfrac1{\\sqrt n}\\ge\\tfrac1\\pi$ 即 $n\\le\\pi^2\\approx9.87$。"
      } },
      { tex: "f(x)=0\\ \\text{has no solutions in}\\ \\left[\\tfrac1\\pi,\\infty\\right)", correct: false, why: {
        en: "$x=1$ is one: $\\sin\\pi=0$.",
        fr: "$x=1$ en est une : $\\sin\\pi=0$.",
        es: "$x=1$ es una: $\\sin\\pi=0$.",
        ja: "$x=1$ が解（$\\sin\\pi=0$）。",
        zh: "$x=1$ 就是一个：$\\sin\\pi=0$。"
      } },
      { tex: "f(x)=0\\ \\text{has infinitely many solutions in}\\ \\left[10^{-10},\\infty\\right)", correct: false, why: {
        en: "Only $n\\le10^{20}$: finitely many.",
        fr: "Seulement $n\\le10^{20}$ : un nombre fini.",
        es: "Solo $n\\le10^{20}$: finitas.",
        ja: "$n\\le10^{20}$ のみで有限個。",
        zh: "只有 $n\\le10^{20}$，有限个。"
      } },
      { tex: "\\text{the solutions in}\\ \\left(0,10^{-10}\\right)\\ \\text{form a finite set}", correct: false, why: {
        en: "Every $n>10^{20}$ gives one: infinitely many.",
        fr: "Chaque $n>10^{20}$ en donne une : une infinité.",
        es: "Cada $n>10^{20}$ da una: infinitas.",
        ja: "$n>10^{20}$ ごとに1つで無限個。",
        zh: "每个 $n>10^{20}$ 都给出一个：无穷多。"
      } },
      { tex: "f(x)=0\\ \\text{has exactly 25 solutions in}\\ \\left(\\tfrac1{\\pi^2},\\tfrac1\\pi\\right)", correct: false, why: {
        en: "There are $88$.",
        fr: "Il y en a $88$.",
        es: "Hay $88$.",
        ja: "$88$ 個ある。",
        zh: "有 $88$ 个。"
      } },
      { tex: "f\\ \\text{is not continuous at}\\ 0", correct: false, why: {
        en: "$|f(x)|\\le x^2\\to0$.",
        fr: "$|f(x)|\\le x^2\\to0$.",
        es: "$|f(x)|\\le x^2\\to0$.",
        ja: "$|f(x)|\\le x^2\\to0$。",
        zh: "$|f(x)|\\le x^2\\to0$。"
      } },
      { tex: "\\text{the largest solution is}\\ x=\\pi", correct: false, why: {
        en: "The largest is $x=1$ ($n=1$).",
        fr: "La plus grande est $x=1$ ($n=1$).",
        es: "La mayor es $x=1$ ($n=1$).",
        ja: "最大の解は $x=1$（$n=1$）。",
        zh: "最大的是 $x=1$（$n=1$）。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where f vanishes",
          fr: "Où f s’annule",
          es: "Dónde se anula f",
          ja: "f の零点",
          zh: "f 的零点"
        },
        lines: ["x>0:\\ \\frac{\\pi}{x^2}=n\\pi\\iff x=\\frac1{\\sqrt n},\\ n=1,2,3,\\dots"],
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
          en: "Count in each interval",
          fr: "Compter dans chaque intervalle",
          es: "Contar en cada intervalo",
          ja: "区間ごとに数える",
          zh: "逐区间计数"
        },
        lines: ["\\tfrac1{\\pi^2}<\\tfrac1{\\sqrt n}<\\tfrac1\\pi\\iff\\pi<\\sqrt n<\\pi^2\\iff 9.87<n<97.4", "n=10,\\dots,97:\\ 88\\ \\text{solutions}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam only the “more than 25” statement was true; the “exactly 9” statement is added here.",
          fr: "Dans l’épreuve seule l’affirmation « plus de 25 » était vraie ; celle « exactement 9 » est ajoutée ici.",
          es: "En el examen solo era verdadera la de «más de 25»; la de «exactamente 9» se añade aquí.",
          ja: "原題で正しいのは「25 個より多い」のみ。「ちょうど 9 個」はここで追加。",
          zh: "原题只有“多于 25 个”正确；“恰有 9 个”是此处新增。"
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
