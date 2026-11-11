/* calculus · Four statements: true or false?
   Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-bac-2024-true-or-false-four",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 1",
        fr: "Baccalauréat 2024, spécialité mathématiques, Métropole, 19 juin 2024, exercice 1",
        es: "Bachillerato francés (Bac) 2024, especialidad de matemáticas, Metrópoli, 19 de junio de 2024, ejercicio 1",
        ja: "フランス・バカロレア 2024 数学専門 本土 2024年6月19日 第1問",
        zh: "法国高中会考（Bac）2024 数学专业 本土卷 2024年6月19日 第1题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "Four statements: true or false?",
      fr: "Quatre affirmations : vrai ou faux ?",
      es: "Cuatro afirmaciones: ¿verdadero o falso?",
      ja: "4つの命題の真偽",
      zh: "四个命题的真假"
    },
    statement: {
      en: "$f(x)=5xe^{-x}$ on $\\mathbb R$. Sequences $(u_n),(v_n),(w_n)$ satisfy $u_n\\le v_n\\le w_n$ for all $n$, with $u_n\\to-1$ and $w_n\\to1$; moreover $(u_n)$ is increasing and $(w_n)$ is decreasing. <b>Which of the following are true?</b>",
      fr: "$f(x)=5xe^{-x}$ sur $\\mathbb R$. Les suites $(u_n),(v_n),(w_n)$ vérifient $u_n\\le v_n\\le w_n$ pour tout $n$, avec $u_n\\to-1$ et $w_n\\to1$ ; de plus $(u_n)$ est croissante et $(w_n)$ décroissante. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=5xe^{-x}$ en $\\mathbb R$. Las sucesiones $(u_n),(v_n),(w_n)$ cumplen $u_n\\le v_n\\le w_n$ para todo $n$, con $u_n\\to-1$ y $w_n\\to1$; además $(u_n)$ es creciente y $(w_n)$ decreciente. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\mathbb R$ 上で $f(x)=5xe^{-x}$。数列 $(u_n),(v_n),(w_n)$ はすべての $n$ で $u_n\\le v_n\\le w_n$、$u_n\\to-1$、$w_n\\to1$ で、さらに $(u_n)$ は増加、$(w_n)$ は減少です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=5xe^{-x}$，$x\\in\\mathbb R$。数列 $(u_n),(v_n),(w_n)$ 满足对任意 $n$ 有 $u_n\\le v_n\\le w_n$，$u_n\\to-1$，$w_n\\to1$，且 $(u_n)$ 递增、$(w_n)$ 递减。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The graph of 5x e^(−x), rising to a maximum at x = 1 and then decaying towards the x-axis.",
      fr: "La courbe de 5x e^(−x), qui monte jusqu’à un maximum en x = 1 puis redescend vers l’axe des x.",
      es: "La gráfica de 5x e^(−x), que sube hasta un máximo en x = 1 y luego decae hacia el eje x.",
      ja: "5x e^(−x) のグラフ。x = 1 で最大になり、その後 x 軸に近づく。",
      zh: "5x e^(−x) 的图像，在 x = 1 处达到最大后向 x 轴衰减。"
    },
    hint: {
      en: "Differentiate $f$. For the sequences, a squeeze between two different limits proves nothing about convergence.",
      fr: "Dérivez $f$. Pour les suites, un encadrement entre deux limites différentes ne prouve pas la convergence.",
      es: "Deriva $f$. Para las sucesiones, acotar entre dos límites distintos no prueba la convergencia.",
      ja: "$f$ を微分。数列は異なる極限で挟んでも収束は言えない。",
      zh: "对 $f$ 求导。数列夹在两个不同极限之间并不能推出收敛。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.2, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.6, 5.4, -1.2, 2.0);
      plot(F, T, x => 5 * x * Math.exp(-x), -0.2, 5.3, 'graph', 'base', -1.2, 2.0);
      F.reveal = () => {
      F.dot(T([1, 5 / Math.E])); F.text(T([1, 5 / Math.E]), '(1, 5/e)', 'len small', 0, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "solves": {"fr": "est solution de", "es": "es solución de", "ja": "は次の解：", "zh": "是下列方程的解："},
      "on": {"fr": "sur", "es": "en", "ja": "上で", "zh": "在"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"},
      "converges to some": {"fr": "converge vers un", "es": "converge a algún", "ja": "は次に収束：", "zh": "收敛于某个"},
      "the": {"fr": "l’axe des", "es": "el eje", "ja": "", "zh": ""},
      "-axis is an asymptote of": {"fr": " est asymptote à", "es": " es asíntota de", "ja": " 軸は次の漸近線：", "zh": " 轴是下列曲线的渐近线："},
      "at": {"fr": "en", "es": "en", "ja": "での", "zh": "于"},
      "is increasing on": {"fr": "est croissante sur", "es": "es creciente en", "ja": "は次で増加：", "zh": "在下列区间递增："},
      "is monotonic": {"fr": "est monotone", "es": "es monótona", "ja": "は単調", "zh": "单调"},
      "bounded, not convergent": {"fr": "bornée, non convergente", "es": "acotada, no convergente", "ja": "有界だが収束しない", "zh": "有界但不收敛"}
    },
    options: [
      { tex: "f\\ \\text{solves}\\ y'+y=5e^{-x}\\ \\text{on}\\ \\mathbb R", correct: true, why: {
        en: "$f'=5e^{-x}-5xe^{-x}$, so $f'+f=5e^{-x}$.",
        fr: "$f'=5e^{-x}-5xe^{-x}$, donc $f'+f=5e^{-x}$.",
        es: "$f'=5e^{-x}-5xe^{-x}$, así que $f'+f=5e^{-x}$.",
        ja: "$f'=5e^{-x}-5xe^{-x}$ より $f'+f=5e^{-x}$。",
        zh: "$f'=5e^{-x}-5xe^{-x}$，故 $f'+f=5e^{-x}$。"
      } },
      { tex: "u_0\\le v_n\\le w_0\\ \\text{for every}\\ n", correct: true, why: {
        en: "$u_0\\le u_n\\le v_n\\le w_n\\le w_0$.",
        fr: "$u_0\\le u_n\\le v_n\\le w_n\\le w_0$.",
        es: "$u_0\\le u_n\\le v_n\\le w_n\\le w_0$.",
        ja: "$u_0\\le u_n\\le v_n\\le w_n\\le w_0$。",
        zh: "$u_0\\le u_n\\le v_n\\le w_n\\le w_0$。"
      } },
      { tex: "(v_n)\\ \\text{converges to some}\\ \\ell\\in[-1,1]", correct: false, why: {
        en: "$v_n=(-1)^n\\cdot\\tfrac12$ fits between suitable $u_n,w_n$ and diverges.",
        fr: "$v_n=(-1)^n\\cdot\\tfrac12$ convient et diverge.",
        es: "$v_n=(-1)^n\\cdot\\tfrac12$ cabe entre ellas y diverge.",
        ja: "$v_n=(-1)^n\\cdot\\tfrac12$ は挟めるが発散。",
        zh: "$v_n=(-1)^n\\cdot\\tfrac12$ 可夹在其间但发散。"
      } },
      { tex: "\\text{the}\\ x\\text{-axis is an asymptote of}\\ \\mathcal C_f\\ \\text{at}\\ -\\infty", correct: false, why: {
        en: "$f(x)\\to-\\infty$ as $x\\to-\\infty$; the asymptote is at $+\\infty$.",
        fr: "$f(x)\\to-\\infty$ en $-\\infty$ ; l’asymptote est en $+\\infty$.",
        es: "$f(x)\\to-\\infty$ en $-\\infty$; la asíntota está en $+\\infty$.",
        ja: "$x\\to-\\infty$ で $f\\to-\\infty$。漸近線は $+\\infty$ 側。",
        zh: "$x\\to-\\infty$ 时 $f\\to-\\infty$；渐近线在 $+\\infty$ 一侧。"
      } },
      { tex: "f\\ \\text{solves}\\ y'-y=5e^{-x}", correct: false, why: {
        en: "$f'-f=5e^{-x}-10xe^{-x}$.",
        fr: "$f'-f=5e^{-x}-10xe^{-x}$.",
        es: "$f'-f=5e^{-x}-10xe^{-x}$.",
        ja: "$f'-f=5e^{-x}-10xe^{-x}$。",
        zh: "$f'-f=5e^{-x}-10xe^{-x}$。"
      } },
      { tex: "f\\ \\text{is increasing on}\\ \\mathbb R", correct: false, why: {
        en: "$f'(x)=5(1-x)e^{-x}<0$ for $x>1$.",
        fr: "$f'(x)=5(1-x)e^{-x}<0$ pour $x>1$.",
        es: "$f'(x)=5(1-x)e^{-x}<0$ si $x>1$.",
        ja: "$x>1$ で $f'(x)=5(1-x)e^{-x}<0$。",
        zh: "$x>1$ 时 $f'(x)=5(1-x)e^{-x}<0$。"
      } },
      { tex: "(v_n)\\ \\text{is monotonic}", correct: false, why: {
        en: "Nothing forces it; it can oscillate.",
        fr: "Rien ne l’impose ; elle peut osciller.",
        es: "Nada lo obliga; puede oscilar.",
        ja: "そうとは限らず振動しうる。",
        zh: "不一定，可以振荡。"
      } },
      { tex: "\\lim v_n=0", correct: false, why: {
        en: "It need not converge at all.",
        fr: "Elle peut ne pas converger du tout.",
        es: "Puede no converger en absoluto.",
        ja: "収束するとは限らない。",
        zh: "未必收敛。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The function",
          fr: "La fonction",
          es: "La función",
          ja: "関数",
          zh: "函数"
        },
        lines: ["f'(x)=5e^{-x}-5xe^{-x}=5(1-x)e^{-x},\\qquad f'+f=5e^{-x}"],
        note: {
          en: "In the exam, “the $x$-axis is a horizontal asymptote” (at $+\\infty$) was also true.",
          fr: "Dans l’épreuve, « l’axe des abscisses est asymptote horizontale » (en $+\\infty$) était aussi vraie.",
          es: "En el examen también era verdadera «el eje x es asíntota horizontal» (en $+\\infty$).",
          ja: "原題では「x 軸は（$+\\infty$ で）水平漸近線」も正しかった。",
          zh: "原题中“x 轴是水平渐近线”（在 $+\\infty$）也正确。"
        }
      },
      {
        title: {
          en: "The sequences",
          fr: "Les suites",
          es: "Las sucesiones",
          ja: "数列",
          zh: "数列"
        },
        lines: ["u_0\\le u_n\\le v_n\\le w_n\\le w_0", "v_n=\\tfrac{(-1)^n}{2}:\\ \\text{bounded, not convergent}"],
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
