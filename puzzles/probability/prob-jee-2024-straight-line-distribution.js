/* probability · Probabilities on a straight line
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2024-straight-line-distribution",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.13",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.13",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.13",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.13",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.13"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Probabilities on a straight line",
      fr: "Des probabilités alignées",
      es: "Probabilidades en línea recta",
      ja: "一直線上の確率",
      zh: "落在一条直线上的概率"
    },
    statement: {
      en: "A random variable $X$ takes only the values $0,1,2,3,4$, and the five points $\\big(x,\\,P(X=x)\\big)$ lie on one straight line. The mean of $X$ is $\\tfrac52$ and its variance is $\\alpha$. <b>Which of the following equal $24\\alpha$?</b>",
      fr: "Une variable aléatoire $X$ ne prend que les valeurs $0,1,2,3,4$, et les cinq points $\\big(x,\\,P(X=x)\\big)$ sont alignés. L’espérance de $X$ vaut $\\tfrac52$ et sa variance $\\alpha$. <b>Lesquelles des valeurs suivantes sont égales à $24\\alpha$ ?</b>",
      es: "Una variable aleatoria $X$ solo toma los valores $0,1,2,3,4$, y los cinco puntos $\\big(x,\\,P(X=x)\\big)$ están alineados. La media de $X$ es $\\tfrac52$ y su varianza $\\alpha$. <b>¿Cuáles de los siguientes valores son iguales a $24\\alpha$?</b>",
      ja: "確率変数 $X$ は $0,1,2,3,4$ の値だけをとり、5点 $\\big(x,\\,P(X=x)\\big)$ は一直線上にあります。$X$ の平均は $\\tfrac52$、分散は $\\alpha$ です。<b>$24\\alpha$ に等しいものはどれですか？</b>",
      zh: "随机变量 $X$ 只取 $0,1,2,3,4$，且五点 $\\big(x,\\,P(X=x)\\big)$ 共线。$X$ 的均值为 $\\tfrac52$，方差为 $\\alpha$。<b>下列哪些等于 $24\\alpha$？</b>"
    },
    figureText: {
      en: "Five bars of heights 0.10, 0.15, 0.20, 0.25, 0.30 whose tops lie on a straight line.",
      fr: "Cinq barres de hauteurs 0,10, 0,15, 0,20, 0,25, 0,30 dont les sommets sont alignés.",
      es: "Cinco barras de alturas 0,10, 0,15, 0,20, 0,25, 0,30 cuyos extremos están alineados.",
      ja: "高さ 0.10, 0.15, 0.20, 0.25, 0.30 の5本の棒。上端は一直線上。",
      zh: "五根高度为 0.10、0.15、0.20、0.25、0.30 的竖条，顶端共线。"
    },
    hint: {
      en: "Write $P(X=x)=a+bx$. Total probability and the mean give two equations.",
      fr: "Écrivez $P(X=x)=a+bx$. La probabilité totale et l’espérance donnent deux équations.",
      es: "Escribe $P(X=x)=a+bx$. La probabilidad total y la media dan dos ecuaciones.",
      ja: "$P(X=x)=a+bx$ とおく。確率の和と平均から2式。",
      zh: "设 $P(X=x)=a+bx$。概率和与均值给出两个方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.5, h: 2.9, scale: 56, pad: 18 });
      const T = F.T = axes(F, -0.5, 5.0, -0.2, 2.7);
      for (let x = 0; x <= 4; x++) { const h = (2 + x) / 20 * 7; F.rect(T([x - 0.25, 0])[0], T([0, 0])[1], 0.5, h, 'fill-blue', 'fills'); F.text(T([x, 0]), String(x), 'tick', 0, 14); }
      F.seg(T([-0.3, 1.7 / 20 * 7]), T([4.4, 6.4 / 20 * 7]), 'seg thin dashc');
      return F;
    },
    options: [
      { tex: "42", correct: true, why: {
        en: "$\\alpha=8-\\tfrac{25}{4}=\\tfrac74$.",
        fr: "$\\alpha=8-\\tfrac{25}{4}=\\tfrac74$.",
        es: "$\\alpha=8-\\tfrac{25}{4}=\\tfrac74$.",
        ja: "$\\alpha=8-\\tfrac{25}{4}=\\tfrac74$.",
        zh: "$\\alpha=8-\\tfrac{25}{4}=\\tfrac74$."
      } },
      { tex: "24\\left(8-\\tfrac{25}{4}\\right)", correct: true, why: {
        en: "$24\\big(E[X^2]-E[X]^2\\big)$ before simplifying.",
        fr: "$24\\big(E[X^2]-E[X]^2\\big)$ avant simplification.",
        es: "$24\\big(E[X^2]-E[X]^2\\big)$ sin simplificar.",
        ja: "簡単にする前の $24\\big(E[X^2]-E[X]^2\\big)$。",
        zh: "化简前的 $24\\big(E[X^2]-E[X]^2\\big)$。"
      } },
      { tex: "48", correct: false, why: {
        en: "Uses $E[X^2]=8.25$.",
        fr: "Utilise $E[X^2]=8{,}25$.",
        es: "Usa $E[X^2]=8{,}25$.",
        ja: "$E[X^2]=8.25$ とした。",
        zh: "用了 $E[X^2]=8.25$。"
      } },
      { tex: "192", correct: false, why: {
        en: "That is $24\\,E[X^2]$, forgetting to subtract the mean squared.",
        fr: "C’est $24\\,E[X^2]$, sans retrancher le carré de l’espérance.",
        es: "Es $24\\,E[X^2]$, sin restar el cuadrado de la media.",
        ja: "$24\\,E[X^2]$ で平均の2乗を引いていない。",
        zh: "那是 $24\\,E[X^2]$，忘了减去均值平方。"
      } },
      { tex: "56", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac74", correct: false, why: {
        en: "That is $\\alpha$; the question asks for $24\\alpha$.",
        fr: "C’est $\\alpha$ ; on demande $24\\alpha$.",
        es: "Es $\\alpha$; se pide $24\\alpha$.",
        ja: "それは $\\alpha$。",
        zh: "那是 $\\alpha$。"
      } },
      { tex: "48\\cdot1", correct: false, why: {
        en: "$24\\cdot2$: the variance $2$ of the uniform distribution on $0..4$, not this one.",
        fr: "$24\\cdot2$ : variance $2$ de la loi uniforme sur $0..4$, pas celle-ci.",
        es: "$24\\cdot2$: la varianza $2$ de la uniforme en $0..4$, no esta.",
        ja: "$24\\cdot2$：$0..4$ の一様分布の分散 $2$。",
        zh: "$24\\cdot2$：$0..4$ 上均匀分布的方差 $2$。"
      } },
      { tex: "60", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two equations",
          fr: "Deux équations",
          es: "Dos ecuaciones",
          ja: "2つの式",
          zh: "两个方程"
        },
        lines: ["\\sum(a+bx)=5a+10b=1,\\qquad\\sum x(a+bx)=10a+30b=\\tfrac52"],
        note: {
          en: "$\\sum x=10$, $\\sum x^2=30$ over $x=0..4$.",
          fr: "$\\sum x=10$, $\\sum x^2=30$ pour $x=0..4$.",
          es: "$\\sum x=10$, $\\sum x^2=30$ para $x=0..4$.",
          ja: "$x=0..4$ で $\\sum x=10$, $\\sum x^2=30$。",
          zh: "$x=0..4$ 时 $\\sum x=10$，$\\sum x^2=30$。"
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
        lines: ["b=\\tfrac1{20},\\quad a=\\tfrac1{10}\\;\\Rightarrow\\;P(X=x)=\\tfrac{2+x}{20}"],
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
          en: "Variance",
          fr: "Variance",
          es: "Varianza",
          ja: "分散",
          zh: "方差"
        },
        lines: ["E[X^2]=30a+100b=8,\\qquad\\alpha=8-\\tfrac{25}{4}=\\tfrac74,\\qquad24\\alpha=\\boxed{42}"],
        note: {
          en: "$\\sum x^3=100$.",
          fr: "$\\sum x^3=100$.",
          es: "$\\sum x^3=100$.",
          ja: "$\\sum x^3=100$。",
          zh: "$\\sum x^3=100$。"
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
