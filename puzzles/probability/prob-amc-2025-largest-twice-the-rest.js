/* probability · The largest of three is more than double the others
   AMC 12A 2025 (Mathematical Association of America), Problem 22 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2025-largest-twice-the-rest",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 22",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 22",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 22",
        ja: "AMC 12A 2025（アメリカ数学協会）第22問",
        zh: "AMC 12A 2025（美国数学协会）第 22 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "The largest of three is more than double the others",
      fr: "Le plus grand des trois dépasse le double des autres",
      es: "El mayor de tres supera el doble de los otros",
      ja: "3つのうち最大が他の2倍を超える",
      zh: "三个数中最大者超过其余的两倍"
    },
    statement: {
      en: "Three numbers are chosen independently and uniformly from $[0,1]$. <b>Which of the following equal the probability that the largest is more than twice each of the other two?</b>",
      fr: "On choisit trois nombres indépendamment et uniformément dans $[0,1]$. <b>Lesquelles des valeurs suivantes sont égales à la probabilité que le plus grand dépasse le double de chacun des deux autres ?</b>",
      es: "Se eligen tres números de forma independiente y uniforme en $[0,1]$. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que el mayor supere el doble de cada uno de los otros dos?</b>",
      ja: "$[0,1]$ から独立に一様に3つの数を選びます。<b>最大のものが他の2つそれぞれの2倍より大きい確率に等しいものはどれですか？</b>",
      zh: "从 $[0,1]$ 中独立均匀地取三个数。<b>下列哪些等于最大者大于另外两个各自两倍的概率？</b>"
    },
    figureText: {
      en: "The unit cube with the region x > 2y, x > 2z shaded: a pyramid with apex at the origin.",
      fr: "Le cube unité avec la région x > 2y, x > 2z ombrée : une pyramide de sommet l’origine.",
      es: "El cubo unidad con la región x > 2y, x > 2z sombreada: una pirámide con vértice en el origen.",
      ja: "単位立方体で x > 2y, x > 2z の領域：原点を頂点とする角錐。",
      zh: "单位立方体中 x > 2y、x > 2z 的区域：以原点为顶点的棱锥。"
    },
    hint: {
      en: "Fix which number is the largest, say $X$. For a given $X=x$, both others must lie below $x/2$.",
      fr: "Fixez le plus grand, disons $X$. Pour $X=x$ donné, les deux autres doivent être sous $x/2$.",
      es: "Fija cuál es el mayor, digamos $X$. Para $X=x$, los otros dos deben quedar por debajo de $x/2$.",
      ja: "最大を $X$ と固定。$X=x$ なら他の2つは $x/2$ 未満。",
      zh: "固定最大者为 $X$；$X=x$ 时另两个都要小于 $x/2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.2, scale: 64, pad: 16 });
      const P = ([x, y, z]) => [0.4 + 2.4 * x + 0.9 * y, 0.3 + 2.4 * z + 0.6 * y];
      [[[0,0,0],[1,0,0]],[[1,0,0],[1,1,0]],[[1,1,0],[0,1,0]],[[0,1,0],[0,0,0]],[[0,0,1],[1,0,1]],[[1,0,1],[1,1,1]],[[1,1,1],[0,1,1]],[[0,1,1],[0,0,1]],[[0,0,0],[0,0,1]],[[1,0,0],[1,0,1]],[[1,1,0],[1,1,1]],[[0,1,0],[0,1,1]]].forEach(([a, b]) => F.seg(P(a), P(b), 'seg thin'));
      F.text(P([1, 0, 0]), 'x', 'pt', 10, 10);
      F.reveal = () => {
      F.path([P([0, 0, 0]), P([1, 0, 0]), P([1, 0.5, 0]), P([1, 0.5, 0.5]), P([1, 0, 0.5])], 'fill-pink', 'fills', true);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x": {"fr": "x", "es": "x", "ja": "x", "zh": "x"}
    },
    options: [
      { tex: "\\tfrac14", correct: true, why: {
        en: "$3\\displaystyle\\int_0^1\\left(\\tfrac x2\\right)^2dx=3\\cdot\\tfrac1{12}$",
        fr: "$3\\displaystyle\\int_0^1\\left(\\tfrac x2\\right)^2dx=3\\cdot\\tfrac1{12}$",
        es: "$3\\displaystyle\\int_0^1\\left(\\tfrac x2\\right)^2dx=3\\cdot\\tfrac1{12}$",
        ja: "$3\\displaystyle\\int_0^1\\left(\\tfrac x2\\right)^2dx=3\\cdot\\tfrac1{12}$",
        zh: "$3\\displaystyle\\int_0^1\\left(\\tfrac x2\\right)^2dx=3\\cdot\\tfrac1{12}$"
      } },
      { tex: "3\\cdot\\tfrac1{12}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac1{12}", correct: false, why: {
        en: "That fixes which number is largest; there are $3$ choices.",
        fr: "Cela fixe lequel est le plus grand ; il y a $3$ choix.",
        es: "Eso fija cuál es el mayor; hay $3$ opciones.",
        ja: "最大を固定した値。選び方は3通り。",
        zh: "那固定了最大者，共有 $3$ 种。"
      } },
      { tex: "\\tfrac19", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "That is the complement.",
        fr: "C’est l’événement contraire.",
        es: "Es el complementario.",
        ja: "余事象。",
        zh: "那是对立事件。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
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
          en: "One choice of maximum",
          fr: "Un choix du maximum",
          es: "Una elección del máximo",
          ja: "最大を1つ固定",
          zh: "固定一个最大者"
        },
        lines: ["P(X>2Y,\\ X>2Z)=\\int_0^1\\left(\\tfrac x2\\right)^2dx=\\tfrac1{12}"],
        note: {
          en: "The region is a square pyramid of base $\\tfrac12\\times\\tfrac12$ and height $1$.",
          fr: "La région est une pyramide à base carrée $\\tfrac12\\times\\tfrac12$ de hauteur $1$.",
          es: "La región es una pirámide de base $\\tfrac12\\times\\tfrac12$ y altura $1$.",
          ja: "底面 $\\tfrac12\\times\\tfrac12$、高さ $1$ の四角錐。",
          zh: "区域是底 $\\tfrac12\\times\\tfrac12$、高 $1$ 的四棱锥。"
        }
      },
      {
        title: {
          en: "Three choices",
          fr: "Trois choix",
          es: "Tres opciones",
          ja: "3通り",
          zh: "三种选择"
        },
        lines: ["3\\cdot\\tfrac1{12}=\\tfrac14"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
