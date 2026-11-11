/* calculus · Exactly one meeting point
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-exactly-one-meeting",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 6",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 6",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 6",
        ja: "2024年 中国・高考 新課程標準II卷 第6問",
        zh: "2024年高考数学新课标II卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Exactly one meeting point",
      fr: "Un seul point de rencontre",
      es: "Un único punto de corte",
      ja: "交点がちょうど1つ",
      zh: "恰有一个交点"
    },
    statement: {
      en: "$f(x)=a(x+1)^2-1$ and $g(x)=\\cos x+2ax$. On $(-1,1)$ the graphs of $y=f(x)$ and $y=g(x)$ have exactly one common point. <b>Which of the following equal $a$?</b>",
      fr: "$f(x)=a(x+1)^2-1$ et $g(x)=\\cos x+2ax$. Sur $(-1,1)$, les courbes de $y=f(x)$ et $y=g(x)$ ont exactement un point commun. <b>Lesquelles des valeurs suivantes sont égales à $a$ ?</b>",
      es: "$f(x)=a(x+1)^2-1$ y $g(x)=\\cos x+2ax$. En $(-1,1)$ las gráficas de $y=f(x)$ y $y=g(x)$ tienen exactamente un punto común. <b>¿Cuáles de los siguientes valores son iguales a $a$?</b>",
      ja: "$f(x)=a(x+1)^2-1$、$g(x)=\\cos x+2ax$ のグラフは $(-1,1)$ でちょうど1点を共有します。<b>$a$ に等しいものはどれですか？</b>",
      zh: "$f(x)=a(x+1)^2-1$，$g(x)=\\cos x+2ax$，当 $x\\in(-1,1)$ 时，曲线 $y=f(x)$ 与 $y=g(x)$ 恰有一个交点。<b>下列哪些等于 $a$？</b>"
    },
    figureText: {
      en: "Axes with the strip −1 < x < 1 marked by dashed lines. The two graphs are drawn in the solution.",
      fr: "Des axes avec la bande −1 < x < 1 marquée en pointillés. Les deux courbes sont tracées dans la solution.",
      es: "Ejes con la franja −1 < x < 1 marcada con líneas discontinuas. Las dos gráficas se dibujan en la solución.",
      ja: "−1 < x < 1 の帯を点線で示した座標軸。2つのグラフは解答で描く。",
      zh: "坐标轴，虚线标出 −1 < x < 1 的带状区域。两条曲线在解答中画出。"
    },
    hint: {
      en: "Look at $h=f-g$. Is it even?",
      fr: "Regardez $h=f-g$. Est-elle paire ?",
      es: "Mira $h=f-g$. ¿Es par?",
      ja: "$h=f-g$ を考える。偶関数では？",
      zh: "考虑 $h=f-g$。它是偶函数吗？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.6, scale: 52, pad: 16 });
      const T = F.T = axes(F, -1.8, 1.8, -1.6, 3.0);
      [-1, 1].forEach(x => { F.seg(T([x, -1.5]), T([x, 2.9]), 'seg thin dashc'); F.text(T([x, 0]), x < 0 ? '−1' : '1', 'tick', x < 0 ? -10 : 8, 14); });
      F.reveal = () => {
      plot(F, T, x => 2 * (x + 1) * (x + 1) - 1, -1.6, 0.25, 'graph', 'base', -1.6, 3.0);
      plot(F, T, x => Math.cos(x) + 4 * x, -1.0, 0.5, 'hl pink', 'base', -1.6, 3.0);
      F.dot(T([0, 1])); F.text(T([0, 1]), '(0, 1)', 'len small', 26, 8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a single zero must be": {"fr": "un zéro unique est forcément", "es": "un único cero debe ser", "ja": "ただ1つの零点は", "zh": "唯一零点只能是"}
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$h(x)=2x^2+1-\\cos x>0$ for $x\\ne0$ and $h(0)=0$.",
        fr: "$h(x)=2x^2+1-\\cos x>0$ pour $x\\ne0$ et $h(0)=0$.",
        es: "$h(x)=2x^2+1-\\cos x>0$ si $x\\ne0$ y $h(0)=0$.",
        ja: "$x\\ne0$ で $h(x)=2x^2+1-\\cos x>0$、$h(0)=0$。",
        zh: "$x\\ne0$ 时 $h(x)=2x^2+1-\\cos x>0$，$h(0)=0$。"
      } },
      { tex: "\\sqrt4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "Then $h(0)=a-2=-1\\ne0$; $h$ is even, so its zeros come in pairs $\\pm x$.",
        fr: "Alors $h(0)=-1\\ne0$ ; $h$ est paire, ses zéros vont par paires $\\pm x$.",
        es: "Entonces $h(0)=-1\\ne0$; $h$ es par y sus ceros van en parejas $\\pm x$.",
        ja: "$h(0)=-1\\ne0$。$h$ は偶関数で零点は $\\pm x$ の対になる。",
        zh: "此时 $h(0)=-1\\ne0$；$h$ 为偶函数，零点成对出现。"
      } },
      { tex: "0", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "4", correct: false, why: {
        en: "Then $h(0)=2\\ne0$.",
        fr: "Alors $h(0)=2\\ne0$.",
        es: "Entonces $h(0)=2\\ne0$.",
        ja: "$h(0)=2\\ne0$。",
        zh: "此时 $h(0)=2\\ne0$。"
      } },
      { tex: "-2", correct: false, why: {
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
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "差をとる",
          zh: "作差"
        },
        lines: ["h(x)=f(x)-g(x)=ax^2+a-1-\\cos x"],
        note: {
          en: "The $2ax$ terms cancel, and $h(-x)=h(x)$.",
          fr: "Les termes $2ax$ se simplifient, et $h(-x)=h(x)$.",
          es: "Los términos $2ax$ se cancelan y $h(-x)=h(x)$.",
          ja: "$2ax$ が消え、$h(-x)=h(x)$。",
          zh: "$2ax$ 抵消，且 $h(-x)=h(x)$。"
        }
      },
      {
        title: {
          en: "Use symmetry",
          fr: "Utiliser la symétrie",
          es: "Usar la simetría",
          ja: "対称性を使う",
          zh: "利用对称性"
        },
        lines: ["\\text{a single zero must be}\\ x=0:\\quad h(0)=a-2=0\\ \\Rightarrow\\ a=\\boxed{2}"],
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
          en: "Check",
          fr: "Vérifier",
          es: "Comprobar",
          ja: "確認",
          zh: "检验"
        },
        lines: ["h(x)=2x^2+1-\\cos x>0\\quad(x\\ne0)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Since $1-\\cos x\\ge0$ and $2x^2>0$.",
          fr: "Car $1-\\cos x\\ge0$ et $2x^2>0$.",
          es: "Porque $1-\\cos x\\ge0$ y $2x^2>0$.",
          ja: "$1-\\cos x\\ge0$、$2x^2>0$ より。",
          zh: "因为 $1-\\cos x\\ge0$ 且 $2x^2>0$。"
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
