/* calculus · True facts about (x − 1)²(x − 4)
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-cubic-statements",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 10",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 10",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 10",
        ja: "2024年 中国・高考 新課程標準I卷 第10問",
        zh: "2024年高考数学新课标I卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "True facts about (x − 1)²(x − 4)",
      fr: "Vrai ou faux sur (x − 1)²(x − 4)",
      es: "Verdadero o falso sobre (x − 1)²(x − 4)",
      ja: "(x − 1)²(x − 4) の性質",
      zh: "关于 (x − 1)²(x − 4) 的判断"
    },
    statement: {
      en: "Let $f(x)=(x-1)^2(x-4)$. <b>Which of the following statements are true?</b>",
      fr: "Soit $f(x)=(x-1)^2(x-4)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(x)=(x-1)^2(x-4)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=(x-1)^2(x-4)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $f(x)=(x-1)^2(x-4)$。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "Axes for the graph of f, with x = 1, 3 and 4 marked. The curve is drawn in the solution.",
      fr: "Axes pour la courbe de f, avec x = 1, 3 et 4 marqués. La courbe est tracée dans la solution.",
      es: "Ejes para la gráfica de f, con x = 1, 3 y 4 marcados. La curva se dibuja en la solución.",
      ja: "f のグラフ用の座標軸（x = 1, 3, 4 に目盛り）。曲線は解答で描く。",
      zh: "f 图像的坐标轴，标出 x = 1、3、4。曲线在解答中画出。"
    },
    hint: {
      en: "$f'(x)=3(x-1)(x-3)$. Know where $f$ rises and falls before testing each statement.",
      fr: "$f'(x)=3(x-1)(x-3)$. Repérez où $f$ croît et décroît avant de tester chaque affirmation.",
      es: "$f'(x)=3(x-1)(x-3)$. Mira dónde crece y decrece $f$ antes de probar cada afirmación.",
      ja: "$f'(x)=3(x-1)(x-3)$。増減を確かめてから各命題を調べる。",
      zh: "$f'(x)=3(x-1)(x-3)$。先弄清单调区间，再逐条判断。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 6.4, scale: 42, pad: 16 });
      const T = F.T = axes(F, -1.2, 5.2, -4.8, 1.6);
      [[1, '1'], [3, '3'], [4, '4']].forEach(([x, t]) => { F.seg(T([x, -0.08]), T([x, 0.08]), 'seg thin'); F.text(T([x, 0]), t, 'tick', 0, -12); });
      F.reveal = () => {
      const f = x => (x - 1) * (x - 1) * (x - 4);
      plot(F, T, f, -0.25, 4.6, 'graph', 'base', -4.8, 1.6);
      F.dot(T([1, 0])); F.dot(T([3, -4])); F.text(T([3, -4]), '(3, −4)', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is a local minimum point of": {"fr": "est un point de minimum local de", "es": "es un punto de mínimo local de", "ja": "は次の極小点：", "zh": "是极小值点，函数"},
      "has three distinct zeros": {"fr": "a trois zéros distincts", "es": "tiene tres ceros distintos", "ja": "は相異なる3つの零点をもつ", "zh": "有三个不同零点"},
      "the minimum value of": {"fr": "le minimum de", "es": "el mínimo de", "ja": "最小値：", "zh": "最小值："},
      "on": {"fr": "sur", "es": "en", "ja": "定義域", "zh": "在"},
      "is": {"fr": "vaut", "es": "es", "ja": "は", "zh": "为"},
      "is decreasing on": {"fr": "est décroissante sur", "es": "es decreciente en", "ja": "は次で減少：", "zh": "递减于"}
    },
    options: [
      { tex: "x=3\\ \\text{is a local minimum point of}\\ f", correct: true, why: {
        en: "$f'$ changes from negative to positive at $3$.",
        fr: "$f'$ passe du négatif au positif en $3$.",
        es: "$f'$ pasa de negativa a positiva en $3$.",
        ja: "$f'$ は $3$ で負から正に変わる。",
        zh: "$f'$ 在 $3$ 处由负变正。"
      } },
      { tex: "1<x<2\\ \\Rightarrow\\ -4<f(2x-1)<0", correct: true, why: {
        en: "$2x-1$ runs over $(1,3)$, where $f$ falls from $0$ to $-4$.",
        fr: "$2x-1$ parcourt $(1,3)$, où $f$ descend de $0$ à $-4$.",
        es: "$2x-1$ recorre $(1,3)$, donde $f$ baja de $0$ a $-4$.",
        ja: "$2x-1$ は $(1,3)$ を動き、そこで $f$ は $0$ から $-4$ へ減少。",
        zh: "$2x-1\\in(1,3)$，$f$ 在此由 $0$ 降到 $-4$。"
      } },
      { tex: "x=1\\ \\text{is a local minimum point of}\\ f", correct: false, why: {
        en: "It is a local maximum: $f'$ goes from $+$ to $-$.",
        fr: "C’est un maximum local : $f'$ passe de $+$ à $-$.",
        es: "Es un máximo local: $f'$ pasa de $+$ a $-$.",
        ja: "極大点（$f'$ は $+$ から $-$）。",
        zh: "那是极大值点：$f'$ 由正变负。"
      } },
      { tex: "0<x<1\\ \\Rightarrow\\ f(x)<f(x^2)", correct: false, why: {
        en: "$x^2<x$ and $f$ is increasing there, so $f(x^2)<f(x)$.",
        fr: "$x^2<x$ et $f$ y est croissante, donc $f(x^2)<f(x)$.",
        es: "$x^2<x$ y $f$ es creciente ahí, así que $f(x^2)<f(x)$.",
        ja: "$x^2<x$ でそこで $f$ は増加なので $f(x^2)<f(x)$。",
        zh: "$x^2<x$ 且 $f$ 在此递增，故 $f(x^2)<f(x)$。"
      } },
      { tex: "-1<x<0\\ \\Rightarrow\\ f(2-x)<f(x)", correct: false, why: {
        en: "Reversed: $f(2-x)-f(x)=2(1-x)(x-1)^2>0$.",
        fr: "C’est l’inverse : $f(2-x)-f(x)=2(1-x)(x-1)^2>0$.",
        es: "Al revés: $f(2-x)-f(x)=2(1-x)(x-1)^2>0$.",
        ja: "逆：$f(2-x)-f(x)=2(1-x)(x-1)^2>0$。",
        zh: "反了：$f(2-x)-f(x)=2(1-x)(x-1)^2>0$。"
      } },
      { tex: "f\\ \\text{has three distinct zeros}", correct: false, why: {
        en: "Only two: $1$ is a double zero.",
        fr: "Seulement deux : $1$ est un zéro double.",
        es: "Solo dos: $1$ es un cero doble.",
        ja: "零点は2つ（$1$ は重解）。",
        zh: "只有两个：$1$ 是二重零点。"
      } },
      { tex: "\\text{the minimum value of}\\ f\\ \\text{on}\\ \\mathbb R\\ \\text{is}\\ -4", correct: false, why: {
        en: "$-4$ is only a local minimum; $f\\to-\\infty$ as $x\\to-\\infty$.",
        fr: "$-4$ n’est qu’un minimum local ; $f\\to-\\infty$ en $-\\infty$.",
        es: "$-4$ es solo un mínimo local; $f\\to-\\infty$ cuando $x\\to-\\infty$.",
        ja: "$-4$ は極小値にすぎない。$x\\to-\\infty$ で $f\\to-\\infty$。",
        zh: "$-4$ 只是极小值；$x\\to-\\infty$ 时 $f\\to-\\infty$。"
      } },
      { tex: "f\\ \\text{is decreasing on}\\ (1,4)", correct: false, why: {
        en: "Only on $(1,3)$; it rises again after $3$.",
        fr: "Seulement sur $(1,3)$ ; elle remonte après $3$.",
        es: "Solo en $(1,3)$; vuelve a subir después de $3$.",
        ja: "減少は $(1,3)$ だけで、$3$ 以降は増加。",
        zh: "只在 $(1,3)$ 递减，$3$ 之后又增。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Derivative",
          fr: "Dérivée",
          es: "Derivada",
          ja: "導関数",
          zh: "求导"
        },
        lines: ["f'(x)=2(x-1)(x-4)+(x-1)^2=3(x-1)(x-3)"],
        note: {
          en: "Rising, falling, rising: maximum $f(1)=0$, minimum $f(3)=-4$.",
          fr: "Croissante, décroissante, croissante : maximum $f(1)=0$, minimum $f(3)=-4$.",
          es: "Crece, decrece, crece: máximo $f(1)=0$, mínimo $f(3)=-4$.",
          ja: "増加→減少→増加。極大 $f(1)=0$、極小 $f(3)=-4$。",
          zh: "增→减→增：极大 $f(1)=0$，极小 $f(3)=-4$。"
        }
      },
      {
        title: {
          en: "The composed statement",
          fr: "L’affirmation composée",
          es: "La afirmación compuesta",
          ja: "合成関数の命題",
          zh: "复合函数那一条"
        },
        lines: ["1<x<2\\ \\Rightarrow\\ 1<2x-1<3\\ \\Rightarrow\\ -4<f(2x-1)<0"],
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
          en: "The comparisons",
          fr: "Les comparaisons",
          es: "Las comparaciones",
          ja: "大小比較",
          zh: "比较大小"
        },
        lines: ["0<x<1:\\ x^2<x\\ \\Rightarrow\\ f(x^2)<f(x)", "f(2-x)-f(x)=(x-1)^2\\bigl[(-2-x)-(x-4)\\bigr]=2(1-x)(x-1)^2>0"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam, the second comparison was the third true statement.",
          fr: "Dans l’épreuve, la seconde comparaison était la troisième affirmation vraie.",
          es: "En el examen, la segunda comparación era la tercera afirmación verdadera.",
          ja: "原題では2つ目の比較が3つ目の正しい選択肢だった。",
          zh: "原题中第二个比较是第三个正确选项。"
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
