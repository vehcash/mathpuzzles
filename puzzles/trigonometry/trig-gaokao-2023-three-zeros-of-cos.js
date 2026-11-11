/* trigonometry · Exactly three zeros of cos ωx − 1
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2023-three-zeros-of-cos",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 15",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 15",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 15",
        ja: "2023年 中国・高考 新課程標準I卷 第15問",
        zh: "2023年高考数学新课标I卷 第15题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Exactly three zeros of cos ωx − 1",
      fr: "Exactement trois zéros de cos ωx − 1",
      es: "Exactamente tres ceros de cos ωx − 1",
      ja: "cos ωx − 1 の零点がちょうど3つ",
      zh: "cos ωx − 1 恰有三个零点"
    },
    statement: {
      en: "$f(x)=\\cos\\omega x-1$ ($\\omega>0$) has exactly $3$ zeros on $[0,2\\pi]$. <b>Which of the following describe the set of all possible $\\omega$?</b>",
      fr: "$f(x)=\\cos\\omega x-1$ ($\\omega>0$) a exactement $3$ zéros sur $[0,2\\pi]$. <b>Lesquels des ensembles suivants décrivent toutes les valeurs possibles de $\\omega$ ?</b>",
      es: "$f(x)=\\cos\\omega x-1$ ($\\omega>0$) tiene exactamente $3$ ceros en $[0,2\\pi]$. <b>¿Cuáles de los siguientes conjuntos describen todos los valores posibles de $\\omega$?</b>",
      ja: "$f(x)=\\cos\\omega x-1$（$\\omega>0$）は $[0,2\\pi]$ にちょうど $3$ つの零点をもちます。<b>$\\omega$ の範囲を表すものはどれですか？</b>",
      zh: "函数 $f(x)=\\cos\\omega x-1$（$\\omega>0$）在区间 $[0,2\\pi]$ 上恰有 $3$ 个零点。<b>下列哪些表示 $\\omega$ 的取值范围？</b>"
    },
    figureText: {
      en: "Axes over [0, 2π] with the line y = −2 dashed; the graph touches y = 0 exactly at its zeros.",
      fr: "Des axes sur [0, 2π] avec la droite y = −2 en pointillés ; la courbe touche y = 0 exactement en ses zéros.",
      es: "Ejes en [0, 2π] con la recta y = −2 discontinua; la gráfica toca y = 0 justo en sus ceros.",
      ja: "[0, 2π] の座標軸と点線 y = −2。グラフは零点で y = 0 に接する。",
      zh: "[0, 2π] 上的坐标轴，虚线 y = −2；图像只在零点处碰到 y = 0。"
    },
    hint: {
      en: "The zeros are $x=\\dfrac{2k\\pi}{\\omega}$, $k=0,1,2,\\dots$ Which $k$ fit in $[0,2\\pi]$?",
      fr: "Les zéros sont $x=\\dfrac{2k\\pi}{\\omega}$, $k=0,1,2,\\dots$ Lesquels tiennent dans $[0,2\\pi]$ ?",
      es: "Los ceros son $x=\\dfrac{2k\\pi}{\\omega}$, $k=0,1,2,\\dots$ ¿Cuáles caben en $[0,2\\pi]$?",
      ja: "零点は $x=\\dfrac{2k\\pi}{\\omega}$（$k=0,1,2,\\dots$）。$[0,2\\pi]$ に入る $k$ は？",
      zh: "零点为 $x=\\dfrac{2k\\pi}{\\omega}$，$k=0,1,2,\\dots$ 哪些在 $[0,2\\pi]$ 内？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 3.2, scale: 44, pad: 16 });
      const T = F.T = axes(F, -0.3, 6.7, -2.5, 0.7);
      [[Math.PI, 'π'], [2 * Math.PI, '2π']].forEach(([x, t]) => { F.seg(T([x, -0.07]), T([x, 0.07]), 'seg thin'); F.text(T([x, 0]), t, 'tick', 0, -10); });
      F.seg(T([0, -2]), T([2 * Math.PI, -2]), 'seg thin dashc'); F.text(T([0, -2]), '−2', 'tick', -14, 0);
      F.reveal = () => {
      plot(F, T, x => Math.cos(2 * x) - 1, 0, 2 * Math.PI, 'graph', 'base', -2.5, 0.7);
      plot(F, T, x => Math.cos(2.9 * x) - 1, 0, 2 * Math.PI, 'hl pink', 'base', -2.5, 0.7);
      F.text(T([1.6, -2.2]), 'ω = 2', 'len small', 0, 0); F.text(T([4.4, -2.2]), 'ω = 2.9', 'len small', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "[2,3)", correct: true, why: {
        en: "$k=0,1,2$ must fit and $k=3$ must not: $2\\le\\omega<3$.",
        fr: "$k=0,1,2$ doivent tenir, pas $k=3$ : $2\\le\\omega<3$.",
        es: "Deben caber $k=0,1,2$ y no $k=3$: $2\\le\\omega<3$.",
        ja: "$k=0,1,2$ は入り $k=3$ は入らない：$2\\le\\omega<3$。",
        zh: "$k=0,1,2$ 在内，$k=3$ 不在：$2\\le\\omega<3$。"
      } },
      { tex: "\\{\\omega\\mid2\\le\\omega<3\\}", correct: true, why: {
        en: "Two options are the same set.",
        fr: "Deux options sont le même ensemble.",
        es: "Dos opciones son el mismo conjunto.",
        ja: "2つの選択肢は同じ集合です。",
        zh: "有两个选项是同一个集合。"
      } },
      { tex: "(2,3)", correct: false, why: {
        en: "$\\omega=2$ gives zeros $0,\\pi,2\\pi$: exactly three.",
        fr: "$\\omega=2$ donne $0,\\pi,2\\pi$ : exactement trois.",
        es: "$\\omega=2$ da $0,\\pi,2\\pi$: exactamente tres.",
        ja: "$\\omega=2$ で $0,\\pi,2\\pi$ のちょうど3つ。",
        zh: "$\\omega=2$ 时零点为 $0,\\pi,2\\pi$，恰好三个。"
      } },
      { tex: "[2,3]", correct: false, why: {
        en: "$\\omega=3$ adds a fourth zero at $2\\pi$.",
        fr: "$\\omega=3$ ajoute un quatrième zéro en $2\\pi$.",
        es: "$\\omega=3$ añade un cuarto cero en $2\\pi$.",
        ja: "$\\omega=3$ だと $2\\pi$ に4つ目。",
        zh: "$\\omega=3$ 时 $2\\pi$ 处多出第四个零点。"
      } },
      { tex: "[3,4)", correct: false, why: {
        en: "That range gives four zeros.",
        fr: "Cette plage donne quatre zéros.",
        es: "Ese rango da cuatro ceros.",
        ja: "その範囲では零点が4つ。",
        zh: "该范围有四个零点。"
      } },
      { tex: "[1,2)", correct: false, why: {
        en: "That range gives two zeros.",
        fr: "Cette plage donne deux zéros.",
        es: "Ese rango da dos ceros.",
        ja: "その範囲では零点が2つ。",
        zh: "该范围只有两个零点。"
      } },
      { tex: "[\\tfrac32,\\tfrac52)", correct: false, why: {
        en: "This counts half-turns instead of full turns of $\\omega x$.",
        fr: "Cela compte des demi-tours de $\\omega x$ au lieu de tours complets.",
        es: "Cuenta medias vueltas de $\\omega x$ en lugar de vueltas completas.",
        ja: "$\\omega x$ の1周でなく半周で数えている。",
        zh: "按 $\\omega x$ 的半周而不是整周计数。"
      } },
      { tex: "(2,3]", correct: false, why: {
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
          en: "Where cos ωx = 1",
          fr: "Où cos ωx = 1",
          es: "Dónde cos ωx = 1",
          ja: "cos ωx = 1 となる所",
          zh: "cos ωx = 1 的位置"
        },
        lines: ["\\omega x=2k\\pi\\ \\Rightarrow\\ x=\\frac{2k\\pi}{\\omega},\\ k=0,1,2,\\dots"],
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
          en: "Exactly k = 0, 1, 2",
          fr: "Exactement k = 0, 1, 2",
          es: "Exactamente k = 0, 1, 2",
          ja: "ちょうど k = 0, 1, 2",
          zh: "恰为 k = 0, 1, 2"
        },
        lines: ["\\frac{4\\pi}{\\omega}\\le2\\pi<\\frac{6\\pi}{\\omega}\\ \\Rightarrow\\ \\boxed{2\\le\\omega<3}"],
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
          en: "Two options are the same set.",
          fr: "Deux options sont le même ensemble.",
          es: "Dos opciones son el mismo conjunto.",
          ja: "2つの選択肢は同じ集合です。",
          zh: "有两个选项是同一个集合。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
