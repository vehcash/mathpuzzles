/* algebra · Additive and multiplicative functions
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2024-cauchy-functional-equations",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.8",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.8",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.8",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.8",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.8"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Additive and multiplicative functions",
      fr: "Fonctions additive et multiplicative",
      es: "Funciones aditiva y multiplicativa",
      ja: "加法的・乗法的な関数",
      zh: "可加与可乘函数"
    },
    statement: {
      en: "$f:\\mathbb R\\to\\mathbb R$ and $g:\\mathbb R\\to(0,\\infty)$ are continuous with $f(x+y)=f(x)+f(y)$ and $g(x+y)=g(x)g(y)$. If $f\\!\\left(-\\tfrac35\\right)=12$ and $g\\!\\left(-\\tfrac13\\right)=2$, <b>which of the following equal $\\left(f\\!\\left(\\tfrac14\\right)+g(-2)-8\\right)g(0)$?</b>",
      fr: "$f:\\mathbb R\\to\\mathbb R$ et $g:\\mathbb R\\to(0,\\infty)$ sont continues avec $f(x+y)=f(x)+f(y)$ et $g(x+y)=g(x)g(y)$. Si $f\\!\\left(-\\tfrac35\\right)=12$ et $g\\!\\left(-\\tfrac13\\right)=2$, <b>lesquelles des valeurs suivantes sont égales à $\\left(f\\!\\left(\\tfrac14\\right)+g(-2)-8\\right)g(0)$ ?</b>",
      es: "$f:\\mathbb R\\to\\mathbb R$ y $g:\\mathbb R\\to(0,\\infty)$ son continuas con $f(x+y)=f(x)+f(y)$ y $g(x+y)=g(x)g(y)$. Si $f\\!\\left(-\\tfrac35\\right)=12$ y $g\\!\\left(-\\tfrac13\\right)=2$, <b>¿cuáles de los siguientes valores son iguales a $\\left(f\\!\\left(\\tfrac14\\right)+g(-2)-8\\right)g(0)$?</b>",
      ja: "連続関数 $f:\\mathbb R\\to\\mathbb R$、$g:\\mathbb R\\to(0,\\infty)$ が $f(x+y)=f(x)+f(y)$、$g(x+y)=g(x)g(y)$ を満たし、$f\\!\\left(-\\tfrac35\\right)=12$、$g\\!\\left(-\\tfrac13\\right)=2$ です。<b>$\\left(f\\!\\left(\\tfrac14\\right)+g(-2)-8\\right)g(0)$ に等しいものはどれですか？</b>",
      zh: "连续函数 $f:\\mathbb R\\to\\mathbb R$，$g:\\mathbb R\\to(0,\\infty)$ 满足 $f(x+y)=f(x)+f(y)$，$g(x+y)=g(x)g(y)$，且 $f\\!\\left(-\\tfrac35\\right)=12$，$g\\!\\left(-\\tfrac13\\right)=2$。<b>下列哪些等于 $\\left(f\\!\\left(\\tfrac14\\right)+g(-2)-8\\right)g(0)$？</b>"
    },
    figureText: {
      en: "Two small graphs: a line through the origin for f and an exponential curve through (0, 1) for g.",
      fr: "Deux petits graphes : une droite passant par l’origine pour f et une exponentielle passant par (0, 1) pour g.",
      es: "Dos gráficas pequeñas: una recta por el origen para f y una exponencial por (0, 1) para g.",
      ja: "2つの小さなグラフ：原点を通る直線 f と (0, 1) を通る指数関数 g。",
      zh: "两个小图：f 是过原点的直线，g 是过 (0, 1) 的指数曲线。"
    },
    hint: {
      en: "Continuous solutions are $f(x)=kx$ and $g(x)=a^x$.",
      fr: "Les solutions continues sont $f(x)=kx$ et $g(x)=a^x$.",
      es: "Las soluciones continuas son $f(x)=kx$ y $g(x)=a^x$.",
      ja: "連続な解は $f(x)=kx$、$g(x)=a^x$。",
      zh: "连续解为 $f(x)=kx$，$g(x)=a^x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.0, scale: 46, pad: 16 });
      const A = ([x, y]) => [1.6 + x * 0.5, 1.5 + y * 0.1], B = ([x, y]) => [4.8 + x * 0.5, 0.3 + y * 0.35];
      F.seg(A([-2.6, 0]), A([2.6, 0]), 'axis'); F.seg(A([0, -13]), A([0, 13]), 'axis'); F.seg(A([-2.6, 13 * 2.6 / 2.6 * 1]), A([2.6, -13]), 'graph'); F.text(A([2.4, 10]), 'f', 'pt', 0, 0);
      F.seg(B([-2.6, 0]), B([2.6, 0]), 'axis'); F.seg(B([0, 0]), B([0, 7.4]), 'axis');
      const q = []; for (let k = 0; k <= 40; k++) { const x = -2.6 + 3.4 * k / 40; q.push(B([x, Math.pow(1 / 8, x / 2.5)])); } F.path(q, 'graph', 'base', false); F.text(B([1.2, 4]), 'g', 'pt', 0, 0);
      F.reveal = () => {
      F.text(A([1.2, -10]), 'f = −20x', 'len small', 24, 0); F.text(B([0, 1]), 'g = 8⁻ˣ', 'len small', 30, -14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "f = −20x": {"fr": "f = −20x", "es": "f = −20x", "ja": "f = −20x", "zh": "f = −20x"},
      "g = 8⁻ˣ": {"fr": "g = 8⁻ˣ", "es": "g = 8⁻ˣ", "ja": "g = 8⁻ˣ", "zh": "g = 8⁻ˣ"}
    },
    options: [
      { tex: "51", correct: true, why: {
        en: "$f(\\tfrac14)=-5$, $g(-2)=64$, $g(0)=1$.",
        fr: "$f(\\tfrac14)=-5$, $g(-2)=64$, $g(0)=1$.",
        es: "$f(\\tfrac14)=-5$, $g(-2)=64$, $g(0)=1$.",
        ja: "$f(\\tfrac14)=-5$、$g(-2)=64$、$g(0)=1$。",
        zh: "$f(\\tfrac14)=-5$，$g(-2)=64$，$g(0)=1$。"
      } },
      { tex: "3\\cdot17", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "61", correct: false, why: {
        en: "Sign slip: $f(\\tfrac14)=-5$, not $+5$.",
        fr: "Erreur de signe : $f(\\tfrac14)=-5$.",
        es: "Error de signo: $f(\\tfrac14)=-5$.",
        ja: "符号ミス：$f(\\tfrac14)=-5$。",
        zh: "符号错：$f(\\tfrac14)=-5$。"
      } },
      { tex: "-12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "0", correct: false, why: {
        en: "$g(0)=1$, not $0$: $g(0)=g(0)^2$ and $g>0$.",
        fr: "$g(0)=1$, pas $0$ : $g(0)=g(0)^2$ et $g>0$.",
        es: "$g(0)=1$, no $0$: $g(0)=g(0)^2$ y $g>0$.",
        ja: "$g(0)=g(0)^2$、$g>0$ より $g(0)=1$。",
        zh: "$g(0)=g(0)^2$ 且 $g>0$，故 $g(0)=1$。"
      } },
      { tex: "49", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "56", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "64", correct: false, why: {
        en: "That is only $g(-2)$.",
        fr: "C’est seulement $g(-2)$.",
        es: "Es solo $g(-2)$.",
        ja: "$g(-2)$ だけ。",
        zh: "那只是 $g(-2)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The additive one",
          fr: "L’additive",
          es: "La aditiva",
          ja: "加法的な関数",
          zh: "可加函数"
        },
        lines: ["f(x)=kx,\\ -\\tfrac35k=12\\ \\Rightarrow\\ k=-20,\\quad f(\\tfrac14)=-5"],
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
          en: "The multiplicative one",
          fr: "La multiplicative",
          es: "La multiplicativa",
          ja: "乗法的な関数",
          zh: "可乘函数"
        },
        lines: ["g(x)=a^x,\\ a^{-1/3}=2\\ \\Rightarrow\\ a=\\tfrac18,\\quad g(-2)=64,\\ g(0)=1"],
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
          en: "Combine",
          fr: "Combiner",
          es: "Combinar",
          ja: "まとめる",
          zh: "合并"
        },
        lines: ["(-5+64-8)\\cdot1=\\boxed{51}"],
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
