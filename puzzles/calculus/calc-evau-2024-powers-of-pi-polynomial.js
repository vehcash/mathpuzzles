/* calculus · A polynomial built from powers of π
   EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question A.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-evau-2024-powers-of-pi-polynomial",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question A.2",
        fr: "EvAU 2024 (Madrid, Espagne), Matemáticas II, session ordinaire, question A.2",
        es: "EvAU 2024 (Madrid), Matemáticas II, convocatoria ordinaria, pregunta A.2",
        ja: "スペイン EvAU 2024（マドリード）数学 II 通常日程 問 A.2",
        zh: "西班牙 EvAU 2024（马德里）数学 II 常规考试 第 A.2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "A polynomial built from powers of π",
      fr: "Un polynôme construit avec des puissances de π",
      es: "Un polinomio hecho con potencias de π",
      ja: "π の累乗でできた多項式",
      zh: "由 π 的幂构成的多项式"
    },
    statement: {
      en: "$f(x)=x^4+\\pi x^3+\\pi^2x^2+\\pi^3x+\\pi^4$ and $g(x)=f(-x)$. <b>Which of the following are true?</b>",
      fr: "$f(x)=x^4+\\pi x^3+\\pi^2x^2+\\pi^3x+\\pi^4$ et $g(x)=f(-x)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=x^4+\\pi x^3+\\pi^2x^2+\\pi^3x+\\pi^4$ y $g(x)=f(-x)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=x^4+\\pi x^3+\\pi^2x^2+\\pi^3x+\\pi^4$、$g(x)=f(-x)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=x^4+\\pi x^3+\\pi^2x^2+\\pi^3x+\\pi^4$，$g(x)=f(-x)$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graphs of f and of its mirror image g(x) = f(−x) on [0, π].",
      fr: "Les courbes de f et de son symétrique g(x) = f(−x) sur [0, π].",
      es: "Las gráficas de f y de su reflejo g(x) = f(−x) en [0, π].",
      ja: "[0, π] での f とその鏡像 g(x) = f(−x) のグラフ。",
      zh: "[0, π] 上 f 及其镜像 g(x) = f(−x) 的图像。"
    },
    hint: {
      en: "$f-g$ keeps only the odd powers, doubled: $2\\pi x^3+2\\pi^3x$.",
      fr: "$f-g$ ne garde que les puissances impaires, doublées : $2\\pi x^3+2\\pi^3x$.",
      es: "$f-g$ conserva solo las potencias impares, duplicadas: $2\\pi x^3+2\\pi^3x$.",
      ja: "$f-g$ は奇数次だけが2倍で残る：$2\\pi x^3+2\\pi^3x$。",
      zh: "$f-g$ 只剩奇次项的两倍：$2\\pi x^3+2\\pi^3x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.0, scale: 56, pad: 16 });
      const T = F.T = axes(F, -0.3, 4.3, -0.3, 3.7);
      const p = Math.PI, f = x => (x ** 4 + p * x ** 3 + p * p * x * x + p ** 3 * x + p ** 4) / 160, g = x => f(-x);
      plot(F, T, f, 0, p, 'graph', 'base', -0.3, 3.7); plot(F, T, g, 0, p, 'hl blue', 'base', -0.3, 3.7);
      F.text(T([p, 0]), 'π', 'tick', 0, 14); F.text(T([p, f(p)]), 'f', 'pt', 10, 0); F.text(T([p, g(p)]), 'g', 'pt', 10, 0);
      F.reveal = () => {
      const q = []; for (let k = 0; k <= 40; k++) { const x = p * k / 40; q.push(T([x, f(x)])); } for (let k = 40; k >= 0; k--) { const x = p * k / 40; q.push(T([x, g(x)])); } F.path(q, 'fill-yellow', 'fills', true);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the tangent at": {"fr": "la tangente en", "es": "la tangente en", "ja": "次での接線", "zh": "在"},
      "is": {"fr": "est", "es": "es", "ja": "は", "zh": "为"},
      "the area between": {"fr": "l’aire entre", "es": "el área entre", "ja": "次の間の面積", "zh": "下列之间的面积"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "on": {"fr": "sur", "es": "en", "ja": "の", "zh": "在"},
      "has no critical point in": {"fr": "n’a pas de point critique dans", "es": "no tiene punto crítico en", "ja": "は次に臨界点をもたない：", "zh": "在下列区间无驻点："},
      "is even": {"fr": "est paire", "es": "es par", "ja": "は偶関数", "zh": "是偶函数"}
    },
    options: [
      { tex: "\\text{the tangent at}\\ x=\\pi\\ \\text{is}\\ y=10\\pi^3x-5\\pi^4", correct: true, why: {
        en: "$f(\\pi)=5\\pi^4$ and $f'(\\pi)=4\\pi^3+3\\pi^3+2\\pi^3+\\pi^3=10\\pi^3$.",
        fr: "$f(\\pi)=5\\pi^4$ et $f'(\\pi)=10\\pi^3$.",
        es: "$f(\\pi)=5\\pi^4$ y $f'(\\pi)=10\\pi^3$.",
        ja: "$f(\\pi)=5\\pi^4$、$f'(\\pi)=10\\pi^3$。",
        zh: "$f(\\pi)=5\\pi^4$，$f'(\\pi)=10\\pi^3$。"
      } },
      { tex: "\\text{the area between}\\ f\\ \\text{and}\\ g\\ \\text{on}\\ [0,\\pi]\\ \\text{is}\\ \\tfrac32\\pi^5", correct: true, why: {
        en: "$\\int_0^\\pi(2\\pi x^3+2\\pi^3x)\\,dx=\\tfrac{\\pi^5}2+\\pi^5$.",
        fr: "$\\int_0^\\pi(2\\pi x^3+2\\pi^3x)\\,dx=\\tfrac{\\pi^5}2+\\pi^5$.",
        es: "$\\int_0^\\pi(2\\pi x^3+2\\pi^3x)\\,dx=\\tfrac{\\pi^5}2+\\pi^5$.",
        ja: "$\\int_0^\\pi(2\\pi x^3+2\\pi^3x)\\,dx=\\tfrac{\\pi^5}2+\\pi^5$。",
        zh: "$\\int_0^\\pi(2\\pi x^3+2\\pi^3x)\\,dx=\\tfrac{\\pi^5}2+\\pi^5$。"
      } },
      { tex: "\\text{the tangent at}\\ x=\\pi\\ \\text{is}\\ y=10\\pi^3x-10\\pi^4", correct: false, why: {
        en: "It must pass through $(\\pi,5\\pi^4)$.",
        fr: "Elle doit passer par $(\\pi,5\\pi^4)$.",
        es: "Debe pasar por $(\\pi,5\\pi^4)$.",
        ja: "$(\\pi,5\\pi^4)$ を通らない。",
        zh: "须过 $(\\pi,5\\pi^4)$。"
      } },
      { tex: "\\text{the area between}\\ f\\ \\text{and}\\ g\\ \\text{on}\\ [0,\\pi]\\ \\text{is}\\ \\tfrac34\\pi^5", correct: false, why: {
        en: "Forgot to double the odd terms.",
        fr: "Oubli de doubler les termes impairs.",
        es: "Olvidó duplicar los términos impares.",
        ja: "奇数次項の2倍を忘れている。",
        zh: "忘了奇次项要加倍。"
      } },
      { tex: "f\\ \\text{has no critical point in}\\ (-\\pi,0)", correct: false, why: {
        en: "$f(-\\pi)=f(0)=\\pi^4$, so Rolle gives one.",
        fr: "$f(-\\pi)=f(0)=\\pi^4$ : Rolle en donne un.",
        es: "$f(-\\pi)=f(0)=\\pi^4$: Rolle da uno.",
        ja: "$f(-\\pi)=f(0)=\\pi^4$ でロルの定理より存在。",
        zh: "$f(-\\pi)=f(0)=\\pi^4$，由罗尔定理存在。"
      } },
      { tex: "f\\ \\text{is even}", correct: false, why: {
        en: "The odd powers have non-zero coefficients.",
        fr: "Les puissances impaires ont des coefficients non nuls.",
        es: "Las potencias impares tienen coeficientes no nulos.",
        ja: "奇数次の係数が $0$ でない。",
        zh: "奇次项系数不为零。"
      } },
      { tex: "f(\\pi)=4\\pi^4", correct: false, why: {
        en: "Five terms of $\\pi^4$: $5\\pi^4$.",
        fr: "Cinq termes $\\pi^4$ : $5\\pi^4$.",
        es: "Cinco términos $\\pi^4$: $5\\pi^4$.",
        ja: "$\\pi^4$ が5つで $5\\pi^4$。",
        zh: "五个 $\\pi^4$：$5\\pi^4$。"
      } },
      { tex: "g\\ge f\\ \\text{on}\\ [0,\\pi]", correct: false, why: {
        en: "$f-g=2\\pi x(x^2+\\pi^2)\\ge0$ there.",
        fr: "$f-g=2\\pi x(x^2+\\pi^2)\\ge0$ sur cet intervalle.",
        es: "$f-g=2\\pi x(x^2+\\pi^2)\\ge0$ ahí.",
        ja: "そこで $f-g=2\\pi x(x^2+\\pi^2)\\ge0$。",
        zh: "在该区间 $f-g=2\\pi x(x^2+\\pi^2)\\ge0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Tangent",
          fr: "Tangente",
          es: "Tangente",
          ja: "接線",
          zh: "切线"
        },
        lines: ["f(\\pi)=5\\pi^4,\\ f'(\\pi)=10\\pi^3:\\quad y=5\\pi^4+10\\pi^3(x-\\pi)=10\\pi^3x-5\\pi^4"],
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
          en: "Rolle",
          fr: "Rolle",
          es: "Rolle",
          ja: "ロルの定理",
          zh: "罗尔定理"
        },
        lines: ["f(-\\pi)=\\pi^4-\\pi^4+\\pi^4-\\pi^4+\\pi^4=\\pi^4=f(0)"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["f-g=2\\pi x^3+2\\pi^3x\\ge0,\\quad\\int_0^\\pi=\\tfrac{\\pi\\cdot\\pi^4}{2}+\\pi^3\\cdot\\pi^2=\\boxed{\\tfrac32\\pi^5}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
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
