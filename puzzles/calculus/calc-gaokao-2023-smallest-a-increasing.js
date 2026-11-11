/* calculus · The smallest a that keeps it increasing
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2023-smallest-a-increasing",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 6",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 6",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 6",
        ja: "2023年 中国・高考 新課程標準II卷 第6問",
        zh: "2023年高考数学新课标II卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The smallest a that keeps it increasing",
      fr: "Le plus petit a qui la garde croissante",
      es: "El menor a que la mantiene creciente",
      ja: "増加させる最小の a",
      zh: "保持递增的最小 a"
    },
    statement: {
      en: "$f(x)=ae^x-\\ln x$ is increasing on $(1,2)$. <b>Which of the following equal the minimum value of $a$?</b>",
      fr: "$f(x)=ae^x-\\ln x$ est croissante sur $(1,2)$. <b>Lesquelles des valeurs suivantes sont égales à la plus petite valeur de $a$ ?</b>",
      es: "$f(x)=ae^x-\\ln x$ es creciente en $(1,2)$. <b>¿Cuáles de los siguientes valores son iguales al valor mínimo de $a$?</b>",
      ja: "$f(x)=ae^x-\\ln x$ が $(1,2)$ で増加します。<b>$a$ の最小値に等しいものはどれですか？</b>",
      zh: "已知 $f(x)=ae^x-\\ln x$ 在区间 $(1,2)$ 上单调递增。<b>下列哪些等于 $a$ 的最小值？</b>"
    },
    figureText: {
      en: "Axes with the strip 1 < x < 2 shaded.",
      fr: "Des axes avec la bande 1 < x < 2 grisée.",
      es: "Ejes con la franja 1 < x < 2 sombreada.",
      ja: "帯 1 < x < 2 に色付けした座標軸。",
      zh: "坐标轴，涂色带 1 < x < 2。"
    },
    hint: {
      en: "$f'(x)=ae^x-\\tfrac1x\\ge0$ means $a\\ge\\dfrac{1}{xe^x}$ on the whole interval.",
      fr: "$f'(x)=ae^x-\\tfrac1x\\ge0$ signifie $a\\ge\\dfrac{1}{xe^x}$ sur tout l’intervalle.",
      es: "$f'(x)=ae^x-\\tfrac1x\\ge0$ significa $a\\ge\\dfrac{1}{xe^x}$ en todo el intervalo.",
      ja: "$f'(x)=ae^x-\\tfrac1x\\ge0$ は区間全体で $a\\ge\\dfrac{1}{xe^x}$。",
      zh: "$f'(x)=ae^x-\\tfrac1x\\ge0$ 即在整个区间上 $a\\ge\\dfrac{1}{xe^x}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.4, scale: 60, pad: 16 });
      const T = F.T = axes(F, -0.4, 3.0, -0.3, 1.0);
      F.rect(T([1, 0])[0], T([0, 0])[1], 1, 1.25, 'fill-yellow', 'fills');
      F.text(T([1, 0]), '1', 'tick', 0, 14); F.text(T([2, 0]), '2', 'tick', 0, 14);
      F.reveal = () => {
      plot(F, T, x => 1 / (x * Math.exp(x)), 0.45, 2.9, 'graph', 'base', -0.3, 1.0);
      F.seg(T([0, 1 / Math.E]), T([2.9, 1 / Math.E]), 'hl pink'); F.text(T([0, 1 / Math.E]), 'e⁻¹', 'tick', -14, 0);
      F.text(T([2.4, 0.12]), '1/(xeˣ)', 'len small', 0, -10);
      };
      return F;
    },
    options: [
      { tex: "e^{-1}", correct: true, why: {
        en: "$\\dfrac1{xe^x}$ decreases, so its supremum on $(1,2)$ is its value at $1$.",
        fr: "$\\dfrac1{xe^x}$ décroît : son sup sur $(1,2)$ est sa valeur en $1$.",
        es: "$\\dfrac1{xe^x}$ decrece: su supremo en $(1,2)$ es su valor en $1$.",
        ja: "$\\dfrac1{xe^x}$ は減少するので $(1,2)$ での上限は $x=1$ の値。",
        zh: "$\\dfrac1{xe^x}$ 递减，在 $(1,2)$ 上的上确界为 $x=1$ 处的值。"
      } },
      { tex: "\\tfrac1e", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "e^2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "e", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "e^{-2}", correct: false, why: {
        en: "$a=e^{-2}$ makes $f'<0$ near $x=1$.",
        fr: "$a=e^{-2}$ rend $f'<0$ près de $1$.",
        es: "$a=e^{-2}$ hace $f'<0$ cerca de $1$.",
        ja: "$a=e^{-2}$ だと $x=1$ 付近で $f'<0$。",
        zh: "$a=e^{-2}$ 时 $x=1$ 附近 $f'<0$。"
      } },
      { tex: "\\tfrac{1}{2e^2}", correct: false, why: {
        en: "That is the value at $x=2$, the smallest, not the largest.",
        fr: "C’est la valeur en $2$, la plus petite, pas la plus grande.",
        es: "Es el valor en $2$, el menor, no el mayor.",
        ja: "$x=2$ での値で、最大ではなく最小。",
        zh: "那是 $x=2$ 处的值，是最小而非最大。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "0", correct: false, why: {
        en: "$a=0$ gives $f=-\\ln x$, which decreases.",
        fr: "$a=0$ donne $f=-\\ln x$, décroissante.",
        es: "$a=0$ da $f=-\\ln x$, que decrece.",
        ja: "$a=0$ だと $f=-\\ln x$ で減少。",
        zh: "$a=0$ 时 $f=-\\ln x$ 递减。"
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
        lines: ["f'(x)=ae^x-\\frac1x\\ge0\\iff a\\ge\\frac{1}{xe^x}\\quad(1<x<2)"],
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
          en: "Largest value of the bound",
          fr: "Plus grande valeur de la borne",
          es: "Mayor valor de la cota",
          ja: "右辺の最大",
          zh: "右边的最大值"
        },
        lines: ["xe^x\\nearrow\\ \\Rightarrow\\ \\frac{1}{xe^x}<\\frac{1}{1\\cdot e}", "a_{\\min}=\\boxed{e^{-1}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The bound is approached as $x\\to1^+$ but never exceeded, so $a=e^{-1}$ is allowed.",
          fr: "La borne est approchée quand $x\\to1^+$ sans être dépassée : $a=e^{-1}$ convient.",
          es: "La cota se alcanza en el límite $x\\to1^+$ sin superarse: $a=e^{-1}$ vale.",
          ja: "$x\\to1^+$ で近づくが超えないので $a=e^{-1}$ でよい。",
          zh: "$x\\to1^+$ 时趋近但不超过，所以 $a=e^{-1}$ 可取。"
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
