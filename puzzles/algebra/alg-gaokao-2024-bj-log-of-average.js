/* algebra · The log of an average on y = 2ˣ
   Gaokao 2024, Beijing paper (北京卷), Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2024-bj-log-of-average",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 9",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 9",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 9",
        ja: "2024年 中国・高考 北京卷 第9問",
        zh: "2024年高考数学北京卷 第9题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The log of an average on y = 2ˣ",
      fr: "Le log d’une moyenne sur y = 2ˣ",
      es: "El log de una media sobre y = 2ˣ",
      ja: "y = 2ˣ 上の平均の対数",
      zh: "y = 2ˣ 上平均值的对数"
    },
    statement: {
      en: "$(x_1,y_1)$ and $(x_2,y_2)$ are two different points on $y=2^x$. <b>Which of the following are always true?</b>",
      fr: "$(x_1,y_1)$ et $(x_2,y_2)$ sont deux points distincts de $y=2^x$. <b>Lesquelles des affirmations suivantes sont toujours vraies ?</b>",
      es: "$(x_1,y_1)$ y $(x_2,y_2)$ son dos puntos distintos de $y=2^x$. <b>¿Cuáles de las siguientes afirmaciones son siempre verdaderas?</b>",
      ja: "$(x_1,y_1)$、$(x_2,y_2)$ は $y=2^x$ 上の異なる2点です。<b>次のうち常に成り立つものはどれですか？</b>",
      zh: "$(x_1,y_1)$，$(x_2,y_2)$ 是函数 $y=2^x$ 图像上两个不同的点。<b>下列哪些一定成立？</b>"
    },
    figureText: {
      en: "The graph of y = 2ˣ with two points on it and the chord joining them.",
      fr: "La courbe de y = 2ˣ avec deux points et la corde qui les joint.",
      es: "La gráfica de y = 2ˣ con dos puntos y la cuerda que los une.",
      ja: "y = 2ˣ のグラフ上の2点とそれを結ぶ弦。",
      zh: "y = 2ˣ 图像上两点及连接它们的弦。"
    },
    hint: {
      en: "The chord of a convex curve lies above it. Or use AM–GM: $\\tfrac{y_1+y_2}2>\\sqrt{y_1y_2}$.",
      fr: "La corde d’une courbe convexe est au-dessus. Ou l’inégalité arithmético-géométrique : $\\tfrac{y_1+y_2}2>\\sqrt{y_1y_2}$.",
      es: "La cuerda de una curva convexa queda por encima. O usa la desigualdad de medias: $\\tfrac{y_1+y_2}2>\\sqrt{y_1y_2}$.",
      ja: "凸な曲線の弦は曲線より上。または相加相乗：$\\tfrac{y_1+y_2}2>\\sqrt{y_1y_2}$。",
      zh: "凸曲线的弦在曲线上方。或用均值不等式 $\\tfrac{y_1+y_2}2>\\sqrt{y_1y_2}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 4.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -2.4, 2.4, -0.4, 4.2);
      plot(F, T, x => 2 ** x, -2.3, 2.05, 'graph', 'base', -0.4, 4.2);
      const A = [-1, 0.5], B = [2, 4]; F.seg(T(A), T(B), 'seg'); F.dot(T(A)); F.dot(T(B));
      F.text(T(A), '(x₁, y₁)', 'len small', 4, 18); F.text(T(B), '(x₂, y₂)', 'len small', -34, 0);
      F.reveal = () => {
      const m = [0.5, 2.25]; F.dot(T(m)); F.dot(T([0.5, 2 ** 0.5])); F.seg(T(m), T([0.5, 2 ** 0.5]), 'hl pink');
      };
      return F;
    },
    options: [
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}>\\tfrac{x_1+x_2}{2}", correct: true, why: {
        en: "The chord’s midpoint is above the curve at $x=\\tfrac{x_1+x_2}2$.",
        fr: "Le milieu de la corde est au-dessus de la courbe en $x=\\tfrac{x_1+x_2}2$.",
        es: "El punto medio de la cuerda está sobre la curva en $x=\\tfrac{x_1+x_2}2$.",
        ja: "弦の中点は $x=\\tfrac{x_1+x_2}2$ で曲線より上。",
        zh: "弦的中点在 $x=\\tfrac{x_1+x_2}2$ 处位于曲线上方。"
      } },
      { tex: "\\tfrac{y_1+y_2}{2}>2^{\\frac{x_1+x_2}{2}}", correct: true, why: {
        en: "The same inequality after applying $2^{(\\cdot)}$; it is AM–GM.",
        fr: "La même inégalité après $2^{(\\cdot)}$ : c’est l’inégalité des moyennes.",
        es: "La misma desigualdad tras aplicar $2^{(\\cdot)}$: es la de medias.",
        ja: "$2^{(\\cdot)}$ をとった同じ不等式（相加相乗平均）。",
        zh: "两边取 $2^{(\\cdot)}$ 后的同一不等式，即均值不等式。"
      } },
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}<\\tfrac{x_1+x_2}{2}", correct: false, why: {
        en: "Reversed: $2^x$ is convex.",
        fr: "Inversé : $2^x$ est convexe.",
        es: "Al revés: $2^x$ es convexa.",
        ja: "逆：$2^x$ は下に凸。",
        zh: "反了：$2^x$ 是下凸函数。"
      } },
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}<x_1+x_2", correct: false, why: {
        en: "Fails for $x_1=-1,\\ x_2=-2$: $\\log_2\\tfrac38>-3$.",
        fr: "Faux pour $x_1=-1,\\ x_2=-2$ : $\\log_2\\tfrac38>-3$.",
        es: "Falla con $x_1=-1,\\ x_2=-2$: $\\log_2\\tfrac38>-3$.",
        ja: "$x_1=-1,\\ x_2=-2$ で不成立：$\\log_2\\tfrac38>-3$。",
        zh: "$x_1=-1,\\ x_2=-2$ 时不成立：$\\log_2\\tfrac38>-3$。"
      } },
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}>x_1+x_2", correct: false, why: {
        en: "Fails for $x_1=1,\\ x_2=2$: $\\log_23<3$.",
        fr: "Faux pour $x_1=1,\\ x_2=2$ : $\\log_23<3$.",
        es: "Falla con $x_1=1,\\ x_2=2$: $\\log_23<3$.",
        ja: "$x_1=1,\\ x_2=2$ で不成立：$\\log_23<3$。",
        zh: "$x_1=1,\\ x_2=2$ 时不成立：$\\log_23<3$。"
      } },
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}=\\tfrac{x_1+x_2}{2}", correct: false, why: {
        en: "Equality needs $y_1=y_2$, i.e. the same point.",
        fr: "L’égalité exige $y_1=y_2$, donc le même point.",
        es: "La igualdad exige $y_1=y_2$, es decir, el mismo punto.",
        ja: "等号は $y_1=y_2$、つまり同じ点のとき。",
        zh: "取等需 $y_1=y_2$，即同一点。"
      } },
      { tex: "\\log_2\\tfrac{y_1+y_2}{2}>\\max(x_1,x_2)", correct: false, why: {
        en: "The average $\\tfrac{y_1+y_2}2$ is below $\\max(y_1,y_2)$.",
        fr: "La moyenne $\\tfrac{y_1+y_2}2$ est inférieure à $\\max(y_1,y_2)$.",
        es: "La media $\\tfrac{y_1+y_2}2$ es menor que $\\max(y_1,y_2)$.",
        ja: "平均 $\\tfrac{y_1+y_2}2$ は $\\max(y_1,y_2)$ より小さい。",
        zh: "平均值 $\\tfrac{y_1+y_2}2$ 小于 $\\max(y_1,y_2)$。"
      } },
      { tex: "\\tfrac{y_1+y_2}{2}<2^{\\frac{x_1+x_2}{2}}", correct: false, why: {
        en: "Reversed AM–GM.",
        fr: "Inégalité des moyennes inversée.",
        es: "Desigualdad de medias al revés.",
        ja: "相加相乗平均の逆。",
        zh: "均值不等式写反了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "AM–GM",
          fr: "Moyennes",
          es: "Medias",
          ja: "相加相乗平均",
          zh: "均值不等式"
        },
        lines: ["\\frac{y_1+y_2}2>\\sqrt{y_1y_2}=\\sqrt{2^{x_1+x_2}}=2^{\\frac{x_1+x_2}2}"],
        note: {
          en: "Strict because $y_1\\ne y_2$.",
          fr: "Stricte car $y_1\\ne y_2$.",
          es: "Estricta porque $y_1\\ne y_2$.",
          ja: "$y_1\\ne y_2$ なので等号なし。",
          zh: "因 $y_1\\ne y_2$，不等号严格。"
        }
      },
      {
        title: {
          en: "Take log₂",
          fr: "Prendre log₂",
          es: "Tomar log₂",
          ja: "log₂ をとる",
          zh: "取 log₂"
        },
        lines: ["\\log_2\\frac{y_1+y_2}2>\\frac{x_1+x_2}2"],
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
          en: "Two options are the same inequality.",
          fr: "Deux options sont la même inégalité.",
          es: "Dos opciones son la misma desigualdad.",
          ja: "2つの選択肢は同じ不等式。",
          zh: "有两个选项是同一个不等式。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
