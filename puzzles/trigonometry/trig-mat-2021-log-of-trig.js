/* trigonometry · A logarithm of a trig quadratic
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2021-log-of-trig",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1H",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1H",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1H",
        zh: "牛津大学数学入学考试 MAT 2021 第 1H 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A logarithm of a trig quadratic",
      fr: "Logarithme d’une quadratique trigonométrique",
      es: "Logaritmo de una cuadrática trigonométrica",
      ja: "三角関数の2次式の対数",
      zh: "三角二次式的对数"
    },
    statement: {
      en: "Let $y=\\log_2\\!\\left(9-8\\sin x-6\\cos^2x\\right)$ for $0^\\circ\\le x\\le360^\\circ$. <b>Which of the following are true?</b>",
      fr: "Soit $y=\\log_2\\!\\left(9-8\\sin x-6\\cos^2x\\right)$ pour $0^\\circ\\le x\\le360^\\circ$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $y=\\log_2\\!\\left(9-8\\sin x-6\\cos^2x\\right)$ para $0^\\circ\\le x\\le360^\\circ$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$0^\\circ\\le x\\le360^\\circ$ で $y=\\log_2\\!\\left(9-8\\sin x-6\\cos^2x\\right)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $y=\\log_2\\!\\left(9-8\\sin x-6\\cos^2x\\right)$，$0^\\circ\\le x\\le360^\\circ$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of y over one turn: it dips below zero twice, near the top of the sine wave, and peaks at x = 270°.",
      fr: "La courbe de y sur un tour : elle passe deux fois sous zéro, près du sommet de la sinusoïde, et culmine en x = 270°.",
      es: "La gráfica de y en una vuelta: baja de cero dos veces, cerca del máximo del seno, y alcanza su máximo en x = 270°.",
      ja: "1周での y のグラフ：sin の山の近くで2回 0 より下がり、x = 270° で最大。",
      zh: "y 在一周内的图像：在正弦峰值附近两次低于零，并在 x = 270° 处取最大值。"
    },
    hint: {
      en: "Write $\\cos^2x=1-\\sin^2x$: the inside becomes a quadratic in $s=\\sin x\\in[-1,1]$.",
      fr: "Écrivez $\\cos^2x=1-\\sin^2x$ : l’intérieur devient une quadratique en $s=\\sin x\\in[-1,1]$.",
      es: "Escribe $\\cos^2x=1-\\sin^2x$: el interior es una cuadrática en $s=\\sin x\\in[-1,1]$.",
      ja: "$\\cos^2x=1-\\sin^2x$ とすると中身は $s=\\sin x\\in[-1,1]$ の2次式。",
      zh: "写成 $\\cos^2x=1-\\sin^2x$，里面变成 $s=\\sin x\\in[-1,1]$ 的二次式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.3, h: 6.7, scale: 44, pad: 20 });
      const T = F.T = axes(F, -0.3, 7.0, -1.9, 4.8);
      const y = x => Math.log2(6 * Math.sin(x) ** 2 - 8 * Math.sin(x) + 3);
      plot(F, T, y, 0, 2 * Math.PI, 'graph');
      F.dot(T([1.5 * Math.PI, Math.log2(17)])); F.text(T([1.5 * Math.PI, Math.log2(17)]), 'log₂17', 'len small', 0, -16);
      const xm = Math.asin(2 / 3); F.dot(T([xm, -Math.log2(3)])); F.text(T([xm, -Math.log2(3)]), '−log₂3', 'len small', 14, 16);
      F.text(T([Math.PI / 2, 0]), '90°', 'tick', 0, -12); F.text(T([1.5 * Math.PI, 0]), '270°', 'tick', 0, 14); F.text(T([2 * Math.PI, 0]), '360°', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "\\max y=\\log_2 17", correct: true, why: {
        en: "$s=-1$: $6+8+3=17$, at $x=270^\\circ$.",
        fr: "$s=-1$: $6+8+3=17$, at $x=270^\\circ$.",
        es: "$s=-1$: $6+8+3=17$, at $x=270^\\circ$.",
        ja: "$s=-1$: $6+8+3=17$, at $x=270^\\circ$.",
        zh: "$s=-1$: $6+8+3=17$, at $x=270^\\circ$."
      } },
      { tex: "\\min y=-\\log_2 3", correct: true, why: {
        en: "$s=\\tfrac23$: $6\\cdot\\tfrac49-\\tfrac{16}{3}+3=\\tfrac13$.",
        fr: "$s=\\tfrac23$: $6\\cdot\\tfrac49-\\tfrac{16}{3}+3=\\tfrac13$.",
        es: "$s=\\tfrac23$: $6\\cdot\\tfrac49-\\tfrac{16}{3}+3=\\tfrac13$.",
        ja: "$s=\\tfrac23$: $6\\cdot\\tfrac49-\\tfrac{16}{3}+3=\\tfrac13$.",
        zh: "$s=\\tfrac23$: $6\\cdot\\tfrac49-\\tfrac{16}{3}+3=\\tfrac13$."
      } },
      { tex: "\\max y=4", correct: false, why: {
        en: "$\\log_2 17>\\log_2 16=4$.",
        fr: "$\\log_2 17>\\log_2 16=4$.",
        es: "$\\log_2 17>\\log_2 16=4$.",
        ja: "$\\log_2 17>\\log_2 16=4$.",
        zh: "$\\log_2 17>\\log_2 16=4$."
      } },
      { tex: "\\min y=0", correct: false, why: {
        en: "At $x=90^\\circ$ the inside is $1$, but it gets down to $\\tfrac13$ nearby.",
        fr: "En $x=90^\\circ$ l’intérieur vaut $1$, mais il descend à $\\tfrac13$ juste à côté.",
        es: "En $x=90^\\circ$ el interior vale $1$, pero baja hasta $\\tfrac13$ cerca.",
        ja: "$x=90^\\circ$ で中身は $1$ だが、近くで $\\tfrac13$ まで下がる。",
        zh: "$x=90^\\circ$ 时里面为 $1$，但附近可降到 $\\tfrac13$。"
      } },
      { tex: "y(90^\\circ)=1", correct: false, why: {
        en: "$9-8-0=1$, so $y=\\log_2 1=0$.",
        fr: "$9-8-0=1$, so $y=\\log_2 1=0$.",
        es: "$9-8-0=1$, so $y=\\log_2 1=0$.",
        ja: "$9-8-0=1$, so $y=\\log_2 1=0$.",
        zh: "$9-8-0=1$, so $y=\\log_2 1=0$."
      } },
      { tex: "\\max y=\\log_2 15", correct: false, why: {
        en: "$\\cos^2 270^\\circ=0$, so the inside is $9+8=17$.",
        fr: "$\\cos^2 270^\\circ=0$, so the inside is $9+8=17$.",
        es: "$\\cos^2 270^\\circ=0$, so the inside is $9+8=17$.",
        ja: "$\\cos^2 270^\\circ=0$, so the inside is $9+8=17$.",
        zh: "$\\cos^2 270^\\circ=0$, so the inside is $9+8=17$."
      } },
      { tex: "y(0^\\circ)=\\log_2 9", correct: false, why: {
        en: "$9-0-6=3$, so $y=\\log_2 3$.",
        fr: "$9-0-6=3$, so $y=\\log_2 3$.",
        es: "$9-0-6=3$, so $y=\\log_2 3$.",
        ja: "$9-0-6=3$, so $y=\\log_2 3$.",
        zh: "$9-0-6=3$, so $y=\\log_2 3$."
      } },
      { tex: "\\min y=\\log_2\\tfrac23", correct: false, why: {
        en: "$\\tfrac23$ is where the minimum happens ($\\sin x=\\tfrac23$), not the value inside.",
        fr: "$\\tfrac23$ est l’endroit du minimum ($\\sin x=\\tfrac23$), pas la valeur à l’intérieur.",
        es: "$\\tfrac23$ es donde ocurre el mínimo ($\\sin x=\\tfrac23$), no el valor interior.",
        ja: "$\\tfrac23$ は最小になる位置（$\\sin x=\\tfrac23$）で中身の値ではない。",
        zh: "$\\tfrac23$ 是取最小值的位置（$\\sin x=\\tfrac23$），不是里面的值。"
      } }
    ],
    steps: [
      {
        title: {
          en: "A quadratic in sin x",
          fr: "Une quadratique en sin x",
          es: "Una cuadrática en sen x",
          ja: "sin x の2次式",
          zh: "关于 sin x 的二次式"
        },
        lines: ["9-8s-6(1-s^2)=6s^2-8s+3=6\\left(s-\\tfrac23\\right)^2+\\tfrac13"],
        note: {
          en: "It is always at least $\\tfrac13>0$, so the log is defined everywhere.",
          fr: "Elle vaut toujours au moins $\\tfrac13>0$ : le log est partout défini.",
          es: "Siempre vale al menos $\\tfrac13>0$: el logaritmo está definido en todo punto.",
          ja: "常に $\\tfrac13>0$ 以上なので対数はどこでも定義される。",
          zh: "它总是至少 $\\tfrac13>0$，所以对数处处有定义。"
        }
      },
      {
        title: {
          en: "Extremes on [−1, 1]",
          fr: "Extrêmes sur [−1, 1]",
          es: "Extremos en [−1, 1]",
          ja: "[−1, 1] での最大最小",
          zh: "在 [−1, 1] 上的最值"
        },
        lines: ["\\min=\\tfrac13\\ (s=\\tfrac23),\\qquad \\max=17\\ (s=-1)"],
        note: {
          en: "The vertex $s=\\tfrac23$ is inside the interval; the far end $s=-1$ gives the maximum.",
          fr: "Le sommet $s=\\tfrac23$ est dans l’intervalle ; l’extrémité $s=-1$ donne le maximum.",
          es: "El vértice $s=\\tfrac23$ está dentro del intervalo; el extremo $s=-1$ da el máximo.",
          ja: "頂点 $s=\\tfrac23$ は区間内、遠い端 $s=-1$ で最大。",
          zh: "顶点 $s=\\tfrac23$ 在区间内，远端 $s=-1$ 给出最大值。"
        }
      },
      {
        title: {
          en: "Take log base 2",
          fr: "Passer au log en base 2",
          es: "Tomar log en base 2",
          ja: "底2の対数をとる",
          zh: "取以 2 为底的对数"
        },
        lines: ["-\\log_2 3\\le y\\le\\log_2 17"],
        note: {
          en: "$\\log_2$ is increasing, so it keeps the order.",
          fr: "$\\log_2$ est croissant : il conserve l’ordre.",
          es: "$\\log_2$ es creciente: conserva el orden.",
          ja: "$\\log_2$ は増加関数なので大小は変わらない。",
          zh: "$\\log_2$ 递增，保持大小关系。"
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
          en: "Look at the values at 0°, 90° and 270° first: they rule out most options.",
          fr: "Regardez d’abord les valeurs en 0°, 90° et 270° : elles éliminent la plupart des options.",
          es: "Mira primero los valores en 0°, 90° y 270°: descartan casi todas las opciones.",
          ja: "まず 0°, 90°, 270° での値を見ると多くの選択肢を除外できる。",
          zh: "先看 0°、90°、270° 处的值，可排除大多数选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
