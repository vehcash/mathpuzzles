/* calculus · Zeros, extrema and the centre of a cubic
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-cubic-centre",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 11",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 11",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 11",
        ja: "2024年 中国・高考 新課程標準II卷 第11問",
        zh: "2024年高考数学新课标II卷 第11题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Zeros, extrema and the centre of a cubic",
      fr: "Zéros, extremums et centre d’une cubique",
      es: "Ceros, extremos y centro de una cúbica",
      ja: "3次関数の零点・極値・対称の中心",
      zh: "三次函数的零点、极值与对称中心"
    },
    statement: {
      en: "Let $f(x)=2x^3-3ax^2+1$. <b>Which of the following statements are true?</b>",
      fr: "Soit $f(x)=2x^3-3ax^2+1$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x)=2x^3-3ax^2+1$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=2x^3-3ax^2+1$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x)=2x^3-3ax^2+1$。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "Axes with the point (0, 1), which every graph of this family passes through.",
      fr: "Des axes avec le point (0, 1), par lequel passent toutes les courbes de la famille.",
      es: "Ejes con el punto (0, 1), por el que pasan todas las gráficas de la familia.",
      ja: "このすべてのグラフが通る点 (0, 1) を示した座標軸。",
      zh: "坐标轴，标出这一族曲线都经过的点 (0, 1)。"
    },
    hint: {
      en: "$f'(x)=6x(x-a)$. A cubic is symmetric about its inflection point, where $f''=0$.",
      fr: "$f'(x)=6x(x-a)$. Une cubique est symétrique par rapport à son point d’inflexion ($f''=0$).",
      es: "$f'(x)=6x(x-a)$. Una cúbica es simétrica respecto de su punto de inflexión ($f''=0$).",
      ja: "$f'(x)=6x(x-a)$。3次関数は変曲点（$f''=0$）に関して対称。",
      zh: "$f'(x)=6x(x-a)$。三次函数关于拐点（$f''=0$）中心对称。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 6.0, scale: 44, pad: 16 });
      const T = F.T = axes(F, -1.8, 3.8, -3.6, 2.4);
      F.dot(T([0, 1])); F.text(T([0, 1]), '(0, 1)', 'len small', 26, -8);
      F.reveal = () => {
      plot(F, T, x => 2 * x ** 3 - 6 * x * x + 1, -0.6, 3.15, 'graph', 'base', -3.6, 2.4);
      F.dot(T([1, -3])); F.text(T([1, -3]), '(1, −3)', 'len small', 30, 4); F.text(T([2.6, 1.8]), 'a = 2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "has three zeros": {"fr": "a trois zéros", "es": "tiene tres ceros", "ja": "は零点を3つもつ", "zh": "有三个零点"},
      "for some": {"fr": "pour un certain", "es": "para algún", "ja": "ある", "zh": "存在"},
      "is a centre of symmetry": {"fr": "est un centre de symétrie", "es": "es un centro de simetría", "ja": "が対称の中心", "zh": "是对称中心"},
      "is a local maximum point": {"fr": "est un point de maximum local", "es": "es un punto de máximo local", "ja": "は極大点", "zh": "是极大值点"},
      "is an axis of symmetry": {"fr": "est un axe de symétrie", "es": "es un eje de simetría", "ja": "が対称軸", "zh": "是对称轴"},
      "has two zeros": {"fr": "a deux zéros", "es": "tiene dos ceros", "ja": "は零点を2つもつ", "zh": "有两个零点"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"},
      "has a local extremum": {"fr": "a un extremum local", "es": "tiene un extremo local", "ja": "は極値をもつ", "zh": "有极值"},
      "the centre of symmetry is": {"fr": "le centre de symétrie est", "es": "el centro de simetría es", "ja": "対称の中心は", "zh": "对称中心为"},
      "zeros": {"fr": "zéros", "es": "ceros", "ja": "個の零点", "zh": "个零点"},
      "zero": {"fr": "zéro", "es": "cero", "ja": "個の零点", "zh": "个零点"}
    },
    options: [
      { tex: "a>1\\ \\Rightarrow\\ f\\ \\text{has three zeros}", correct: true, why: {
        en: "Local max $f(0)=1>0$, local min $f(a)=1-a^3<0$.",
        fr: "Maximum local $f(0)=1>0$, minimum local $f(a)=1-a^3<0$.",
        es: "Máximo local $f(0)=1>0$, mínimo local $f(a)=1-a^3<0$.",
        ja: "極大 $f(0)=1>0$、極小 $f(a)=1-a^3<0$。",
        zh: "极大值 $f(0)=1>0$，极小值 $f(a)=1-a^3<0$。"
      } },
      { tex: "\\text{for some}\\ a,\\ (1,f(1))\\ \\text{is a centre of symmetry}", correct: true, why: {
        en: "The centre is at $x=\\tfrac a2$; take $a=2$.",
        fr: "Le centre est en $x=\\tfrac a2$ ; prenez $a=2$.",
        es: "El centro está en $x=\\tfrac a2$; toma $a=2$.",
        ja: "対称の中心は $x=\\tfrac a2$。$a=2$ とすればよい。",
        zh: "对称中心在 $x=\\tfrac a2$，取 $a=2$ 即可。"
      } },
      { tex: "a<0\\ \\Rightarrow\\ x=0\\ \\text{is a local maximum point}", correct: false, why: {
        en: "For $a<0$, $f'$ goes from $-$ to $+$ at $0$: a local minimum.",
        fr: "Pour $a<0$, $f'$ passe de $-$ à $+$ en $0$ : minimum local.",
        es: "Con $a<0$, $f'$ pasa de $-$ a $+$ en $0$: mínimo local.",
        ja: "$a<0$ では $0$ で $f'$ が $-$ から $+$：極小。",
        zh: "$a<0$ 时 $f'$ 在 $0$ 处由负变正：极小值点。"
      } },
      { tex: "\\text{for some}\\ a,b,\\ x=b\\ \\text{is an axis of symmetry}", correct: false, why: {
        en: "A cubic goes to $+\\infty$ on one side and $-\\infty$ on the other, so no vertical mirror line exists.",
        fr: "Une cubique tend vers $+\\infty$ d’un côté et $-\\infty$ de l’autre : pas d’axe vertical.",
        es: "Una cúbica va a $+\\infty$ por un lado y a $-\\infty$ por el otro: no hay eje vertical.",
        ja: "3次関数は片側で $+\\infty$、反対側で $-\\infty$ なので縦の対称軸はない。",
        zh: "三次函数一端趋于 $+\\infty$、另一端趋于 $-\\infty$，没有竖直对称轴。"
      } },
      { tex: "a<0\\ \\Rightarrow\\ f\\ \\text{has three zeros}", correct: false, why: {
        en: "Both extreme values $f(a)=1-a^3$ and $f(0)=1$ are positive: one zero.",
        fr: "Les deux extremums $f(a)=1-a^3$ et $f(0)=1$ sont positifs : un seul zéro.",
        es: "Ambos extremos $f(a)=1-a^3$ y $f(0)=1$ son positivos: un cero.",
        ja: "極値 $f(a)=1-a^3$、$f(0)=1$ がともに正で零点は1つ。",
        zh: "两个极值 $f(a)=1-a^3$、$f(0)=1$ 都为正：只有一个零点。"
      } },
      { tex: "0<a<1\\ \\Rightarrow\\ f\\ \\text{has two zeros}", correct: false, why: {
        en: "$f(a)=1-a^3>0$, so only one zero.",
        fr: "$f(a)=1-a^3>0$ : un seul zéro.",
        es: "$f(a)=1-a^3>0$: un solo cero.",
        ja: "$f(a)=1-a^3>0$ で零点は1つ。",
        zh: "$f(a)=1-a^3>0$，只有一个零点。"
      } },
      { tex: "\\text{for every}\\ a,\\ f\\ \\text{has a local extremum}", correct: false, why: {
        en: "$a=0$ gives $f'=6x^2\\ge0$: no extremum.",
        fr: "$a=0$ donne $f'=6x^2\\ge0$ : pas d’extremum.",
        es: "$a=0$ da $f'=6x^2\\ge0$: sin extremo.",
        ja: "$a=0$ だと $f'=6x^2\\ge0$ で極値なし。",
        zh: "$a=0$ 时 $f'=6x^2\\ge0$，无极值。"
      } },
      { tex: "\\text{the centre of symmetry is}\\ (a,f(a))", correct: false, why: {
        en: "It is at $x=\\tfrac a2$, midway between the critical points $0$ and $a$.",
        fr: "Il est en $x=\\tfrac a2$, au milieu des points critiques $0$ et $a$.",
        es: "Está en $x=\\tfrac a2$, entre los puntos críticos $0$ y $a$.",
        ja: "$x=\\tfrac a2$（臨界点 $0$ と $a$ の中点）。",
        zh: "在 $x=\\tfrac a2$，即临界点 $0$ 与 $a$ 的中点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Critical points",
          fr: "Points critiques",
          es: "Puntos críticos",
          ja: "臨界点",
          zh: "临界点"
        },
        lines: ["f'(x)=6x^2-6ax=6x(x-a),\\qquad f(0)=1,\\quad f(a)=1-a^3"],
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
          en: "Count the zeros",
          fr: "Compter les zéros",
          es: "Contar ceros",
          ja: "零点を数える",
          zh: "数零点"
        },
        lines: ["a>1:\\ f(0)>0>f(a)\\ \\Rightarrow\\ 3\\ \\text{zeros}", "a<0:\\ f(a)>0,\\ f(0)>0\\ \\Rightarrow\\ 1\\ \\text{zero}"],
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
          en: "Centre of symmetry",
          fr: "Centre de symétrie",
          es: "Centro de simetría",
          ja: "対称の中心",
          zh: "对称中心"
        },
        lines: ["f''(x)=12x-6a=0\\ \\Rightarrow\\ x=\\tfrac a2", "\\tfrac a2=1\\ \\Rightarrow\\ a=2:\\ f(1+t)+f(1-t)=2f(1)"],
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
