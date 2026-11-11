/* trigonometry · A sine wave with a centre
   Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2022-symmetric-sine",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 6",
        fr: "Gaokao 2022, épreuve nationale I (新课标I卷), question 6",
        es: "Gaokao 2022, examen nacional I (新课标I卷), pregunta 6",
        ja: "2022年 中国・高考 新課程標準I卷 第6問",
        zh: "2022年高考数学新课标I卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A sine wave with a centre",
      fr: "Une sinusoïde avec un centre",
      es: "Una sinusoide con centro",
      ja: "対称の中心をもつ正弦波",
      zh: "有对称中心的正弦曲线"
    },
    statement: {
      en: "$f(x)=\\sin\\!\\left(\\omega x+\\frac{\\pi}{4}\\right)+b$ with $\\omega>0$ has smallest period $T$, where $\\frac{2\\pi}{3}<T<\\pi$. Its graph is symmetric about the point $\\left(\\frac{3\\pi}{2},\\,2\\right)$. <b>Which of the following equal $f\\!\\left(\\frac{\\pi}{2}\\right)$?</b>",
      fr: "$f(x)=\\sin\\!\\left(\\omega x+\\frac{\\pi}{4}\\right)+b$, avec $\\omega>0$, a pour plus petite période $T$, où $\\frac{2\\pi}{3}<T<\\pi$. Sa courbe est symétrique par rapport au point $\\left(\\frac{3\\pi}{2},\\,2\\right)$. <b>Lesquelles des valeurs suivantes sont égales à $f\\!\\left(\\frac{\\pi}{2}\\right)$ ?</b>",
      es: "$f(x)=\\sin\\!\\left(\\omega x+\\frac{\\pi}{4}\\right)+b$, con $\\omega>0$, tiene periodo mínimo $T$, donde $\\frac{2\\pi}{3}<T<\\pi$. Su gráfica es simétrica respecto del punto $\\left(\\frac{3\\pi}{2},\\,2\\right)$. <b>¿Cuáles de los siguientes valores son iguales a $f\\!\\left(\\frac{\\pi}{2}\\right)$?</b>",
      ja: "$f(x)=\\sin\\!\\left(\\omega x+\\frac{\\pi}{4}\\right)+b$（$\\omega>0$）の最小正周期を $T$ とし、$\\frac{2\\pi}{3}<T<\\pi$ とします。グラフは点 $\\left(\\frac{3\\pi}{2},\\,2\\right)$ に関して対称です。<b>$f\\!\\left(\\frac{\\pi}{2}\\right)$ に等しいものはどれですか？</b>",
      zh: "函数 $f(x)=\\sin\\!\\left(\\omega x+\\frac{\\pi}{4}\\right)+b$（$\\omega>0$）的最小正周期为 $T$，且 $\\frac{2\\pi}{3}<T<\\pi$。其图像关于点 $\\left(\\frac{3\\pi}{2},\\,2\\right)$ 中心对称。<b>下列哪些等于 $f\\!\\left(\\frac{\\pi}{2}\\right)$？</b>"
    },
    figureText: {
      en: "The line y = 2 with the centre of symmetry (3π/2, 2) marked on it. The graph of f is drawn in the solution.",
      fr: "La droite y = 2 avec le centre de symétrie (3π/2, 2). La courbe de f est tracée dans la solution.",
      es: "La recta y = 2 con el centro de simetría (3π/2, 2). La gráfica de f se dibuja en la solución.",
      ja: "直線 y = 2 と対称の中心 (3π/2, 2)。f のグラフは解答で描きます。",
      zh: "直线 y = 2 及其上的对称中心 (3π/2, 2)。f 的图像在解答中画出。"
    },
    hint: {
      en: "A centre of symmetry of a sinusoid lies on its midline and at a zero of the sine part.",
      fr: "Un centre de symétrie d’une sinusoïde est sur sa ligne médiane, là où la partie sinus s’annule.",
      es: "Un centro de simetría de una sinusoide está en su línea media, donde se anula la parte del seno.",
      ja: "正弦曲線の対称の中心は中心線上で、sin の部分が 0 になる点です。",
      zh: "正弦曲线的对称中心在其中线上，且正弦部分为零。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.8, scale: 52, pad: 18 });
      const T = F.T = axes(F, -0.2, 6.0, -0.2, 3.6);
      F.seg(T([0, 2]), T([5.8, 2]), 'seg thin');
      F.dot(T([1.5 * Math.PI, 2])); F.text(T([1.5 * Math.PI, 2]), '(3π/2, 2)', 'len small', -38, -16);
      F.reveal = () => {
      plot(F, T, x => Math.sin(2.5 * x + Math.PI / 4) + 2, 0.25, 5.8, 'graph');
      F.dot(T([Math.PI / 2, 1])); F.text(T([Math.PI / 2, 1]), 'π/2', 'len small', 0, 18);
      };
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$\\omega=\\tfrac52$, $b=2$: $f(\\tfrac{\\pi}{2})=\\sin\\tfrac{3\\pi}{2}+2=1$.",
        fr: "$\\omega=\\tfrac52$, $b=2$ : $f(\\tfrac{\\pi}{2})=\\sin\\tfrac{3\\pi}{2}+2=1$.",
        es: "$\\omega=\\tfrac52$, $b=2$: $f(\\tfrac{\\pi}{2})=\\sin\\tfrac{3\\pi}{2}+2=1$.",
        ja: "$\\omega=\\tfrac52$、$b=2$：$f(\\tfrac{\\pi}{2})=\\sin\\tfrac{3\\pi}{2}+2=1$。",
        zh: "$\\omega=\\tfrac52$，$b=2$：$f(\\tfrac{\\pi}{2})=\\sin\\tfrac{3\\pi}{2}+2=1$。"
      } },
      { tex: "\\sin\\tfrac{3\\pi}{2}+2", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "2", correct: false, why: {
        en: "$2$ is the midline $b$, the value at the centre, not at $\\tfrac{\\pi}{2}$.",
        fr: "$2$ est la ligne médiane $b$, valeur au centre, pas en $\\tfrac{\\pi}{2}$.",
        es: "$2$ es la línea media $b$, el valor en el centro, no en $\\tfrac{\\pi}{2}$.",
        ja: "$2$ は中心線 $b$ で、中心での値。",
        zh: "$2$ 是中线 $b$，是中心处的值。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is the maximum $b+1$; at $\\tfrac{\\pi}{2}$ the sine is $-1$.",
        fr: "C’est le maximum $b+1$ ; en $\\tfrac{\\pi}{2}$ le sinus vaut $-1$.",
        es: "Es el máximo $b+1$; en $\\tfrac{\\pi}{2}$ el seno vale $-1$.",
        ja: "それは最大値 $b+1$。$\\tfrac{\\pi}{2}$ では sin は $-1$。",
        zh: "那是最大值 $b+1$；在 $\\tfrac{\\pi}{2}$ 处正弦为 $-1$。"
      } },
      { tex: "\\tfrac32", correct: false, why: {
        en: "Would need the sine part to be $-\\tfrac12$.",
        fr: "Il faudrait que la partie sinus vaille $-\\tfrac12$.",
        es: "Haría falta que el seno valiera $-\\tfrac12$.",
        ja: "sin の部分が $-\\tfrac12$ でないといけない。",
        zh: "需要正弦部分为 $-\\tfrac12$。"
      } },
      { tex: "\\tfrac52", correct: false, why: {
        en: "Confuses $f(\\tfrac{\\pi}{2})$ with $\\omega$.",
        fr: "Confond $f(\\tfrac{\\pi}{2})$ avec $\\omega$.",
        es: "Confunde $f(\\tfrac{\\pi}{2})$ con $\\omega$.",
        ja: "$f(\\tfrac{\\pi}{2})$ と $\\omega$ を混同。",
        zh: "把 $f(\\tfrac{\\pi}{2})$ 与 $\\omega$ 混淆了。"
      } },
      { tex: "0", correct: false, why: {
        en: "The graph never goes below $b-1=1$.",
        fr: "La courbe ne descend jamais sous $b-1=1$.",
        es: "La gráfica nunca baja de $b-1=1$.",
        ja: "グラフは $b-1=1$ より下に行かない。",
        zh: "图像从不低于 $b-1=1$。"
      } },
      { tex: "2+\\tfrac{\\sqrt2}{2}", correct: false, why: {
        en: "Uses $\\omega=1$, which gives period $2\\pi$ — too long.",
        fr: "Utilise $\\omega=1$, de période $2\\pi$ — trop longue.",
        es: "Usa $\\omega=1$, de periodo $2\\pi$: demasiado largo.",
        ja: "$\\omega=1$ だと周期 $2\\pi$ で長すぎる。",
        zh: "用了 $\\omega=1$，周期 $2\\pi$ 太长。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The centre fixes b and the phase",
          fr: "Le centre fixe b et la phase",
          es: "El centro fija b y la fase",
          ja: "中心から b と位相",
          zh: "中心确定 b 与相位"
        },
        lines: ["b=2,\\qquad \\tfrac{3\\pi}{2}\\,\\omega+\\tfrac{\\pi}{4}=k\\pi \\;\\Rightarrow\\; \\omega=\\tfrac{4k-1}{6}"],
        note: {
          en: "The centre is on the midline $y=b$ and the sine part is $0$ there.",
          fr: "Le centre est sur la ligne médiane $y=b$ et la partie sinus y est nulle.",
          es: "El centro está en la línea media $y=b$ y allí el seno es $0$.",
          ja: "中心は中心線 $y=b$ 上で、そこで sin は $0$。",
          zh: "中心在中线 $y=b$ 上，且该处正弦部分为 $0$。"
        }
      },
      {
        title: {
          en: "The period picks k",
          fr: "La période choisit k",
          es: "El periodo elige k",
          ja: "周期で k を決める",
          zh: "由周期确定 k"
        },
        lines: ["\\tfrac{2\\pi}{3}<\\tfrac{2\\pi}{\\omega}<\\pi \\iff 2<\\omega<3 \\;\\Rightarrow\\; k=4,\\ \\omega=\\tfrac52"],
        note: {
          en: "$k=4$ is the only integer with $2<\\tfrac{4k-1}{6}<3$.",
          fr: "$k=4$ est le seul entier avec $2<\\tfrac{4k-1}{6}<3$.",
          es: "$k=4$ es el único entero con $2<\\tfrac{4k-1}{6}<3$.",
          ja: "$2<\\tfrac{4k-1}{6}<3$ を満たす整数は $k=4$ だけ。",
          zh: "满足 $2<\\tfrac{4k-1}{6}<3$ 的整数只有 $k=4$。"
        }
      },
      {
        title: {
          en: "Evaluate",
          fr: "Évaluer",
          es: "Evaluar",
          ja: "値を求める",
          zh: "求值"
        },
        lines: ["f\\!\\left(\\tfrac{\\pi}{2}\\right)=\\sin\\!\\left(\\tfrac{5\\pi}{4}+\\tfrac{\\pi}{4}\\right)+2=\\sin\\tfrac{3\\pi}{2}+2=\\boxed{1}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$\\tfrac{\\pi}{2}$ is a minimum of the graph.",
          fr: "$\\tfrac{\\pi}{2}$ est un minimum de la courbe.",
          es: "$\\tfrac{\\pi}{2}$ es un mínimo de la gráfica.",
          ja: "$\\tfrac{\\pi}{2}$ はグラフの最小点。",
          zh: "$\\tfrac{\\pi}{2}$ 是图像的最低点。"
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
