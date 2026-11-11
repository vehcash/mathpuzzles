/* calculus · Functions on a set with gaps
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2023-functions-on-gaps",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.1",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.1",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas Q.1",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.1",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学 Q.1"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Functions on a set with gaps",
      fr: "Fonctions sur un ensemble troué",
      es: "Funciones sobre un conjunto con huecos",
      ja: "すき間のある集合上の関数",
      zh: "定义在有缺口集合上的函数"
    },
    statement: {
      en: "$S=(0,1)\\cup(1,2)\\cup(3,4)$ and $T=\\{0,1,2,3\\}$. <b>Which of the following statements about functions from $S$ to $T$ are true?</b>",
      fr: "$S=(0,1)\\cup(1,2)\\cup(3,4)$ et $T=\\{0,1,2,3\\}$. <b>Lesquelles des affirmations suivantes sur les fonctions de $S$ dans $T$ sont vraies ?</b>",
      es: "$S=(0,1)\\cup(1,2)\\cup(3,4)$ y $T=\\{0,1,2,3\\}$. <b>¿Cuáles de las siguientes afirmaciones sobre funciones de $S$ en $T$ son verdaderas?</b>",
      ja: "$S=(0,1)\\cup(1,2)\\cup(3,4)$、$T=\\{0,1,2,3\\}$ とします。<b>$S$ から $T$ への関数について正しいものはどれですか？</b>",
      zh: "$S=(0,1)\\cup(1,2)\\cup(3,4)$，$T=\\{0,1,2,3\\}$。<b>关于从 $S$ 到 $T$ 的函数，下列哪些正确？</b>"
    },
    figureText: {
      en: "The number line with the three open intervals of S marked, and a continuous function drawn as one horizontal step on each interval.",
      fr: "La droite réelle avec les trois intervalles ouverts de S, et une fonction continue dessinée comme un palier horizontal sur chaque intervalle.",
      es: "La recta real con los tres intervalos abiertos de S y una función continua dibujada como un escalón horizontal en cada intervalo.",
      ja: "S の3つの開区間を示した数直線と、各区間で水平な段になる連続関数。",
      zh: "数轴上标出 S 的三个开区间，连续函数在每个区间上是一段水平线。"
    },
    hint: {
      en: "A continuous function from an interval to a finite set must be constant on that interval.",
      fr: "Une fonction continue d’un intervalle vers un ensemble fini est constante sur cet intervalle.",
      es: "Una función continua de un intervalo en un conjunto finito es constante en ese intervalo.",
      ja: "区間から有限集合への連続関数はその区間で定数。",
      zh: "从区间到有限集的连续函数在该区间上为常数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.9, scale: 54, pad: 18 });
      const T = F.T = axes(F, -0.3, 4.5, -0.3, 3.4);
      [[0, 1, 2], [1, 2, 0.04], [3, 4, 3]].forEach(([a, b, v]) => { F.seg(T([a, v]), T([b, v]), 'graph'); F.circle(T([a, v]), 0.06, 'seg'); F.circle(T([b, v]), 0.06, 'seg'); });
      [1, 2, 3].forEach(k => F.seg(T([-0.1, k]), T([0.1, k]), 'seg thin'));
      [1, 2, 3, 4].forEach(k => F.text(T([k, 0]), String(k), 'tick', 0, 14));
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there are infinitely many functions": {"fr": "il existe une infinité de fonctions", "es": "hay infinitas funciones", "ja": "関数は無限に多くある：", "zh": "函数有无穷多个："},
      "every continuous function": {"fr": "toute fonction continue", "es": "toda función continua", "ja": "すべての連続関数", "zh": "每个连续函数"},
      "is differentiable": {"fr": "est dérivable", "es": "es derivable", "ja": "は微分可能", "zh": "都可导"},
      "there are infinitely many strictly increasing functions": {"fr": "il existe une infinité de fonctions strictement croissantes", "es": "hay infinitas funciones estrictamente crecientes", "ja": "狭義増加関数は無限に多くある：", "zh": "严格递增函数有无穷多个："},
      "there are exactly 4 continuous functions": {"fr": "il existe exactement 4 fonctions continues", "es": "hay exactamente 4 funciones continuas", "ja": "連続関数はちょうど4個：", "zh": "连续函数恰有 4 个："},
      "there are more than 120 continuous functions": {"fr": "il existe plus de 120 fonctions continues", "es": "hay más de 120 funciones continuas", "ja": "連続関数は120個より多い：", "zh": "连续函数多于 120 个："},
      "some continuous function": {"fr": "une fonction continue", "es": "alguna función continua", "ja": "ある連続関数", "zh": "某个连续函数"},
      "is onto": {"fr": "est surjective", "es": "es sobreyectiva", "ja": "は全射", "zh": "是满射"},
      "every function": {"fr": "toute fonction", "es": "toda función", "ja": "すべての関数", "zh": "每个函数"},
      "is continuous": {"fr": "est continue", "es": "es continua", "ja": "は連続", "zh": "都连续"},
      "there are exactly": {"fr": "il existe exactement", "es": "hay exactamente", "ja": "ちょうど", "zh": "恰有"},
      "functions": {"fr": "fonctions", "es": "funciones", "ja": "個の関数", "zh": "个函数"},
      "continuous": {"fr": "continue", "es": "continua", "ja": "連続", "zh": "连续"},
      "constant on": {"fr": "constante sur", "es": "constante en", "ja": "で定数", "zh": "为常数于"},
      "finite": {"fr": "fini", "es": "finito", "ja": "有限", "zh": "有限"},
      "everywhere on": {"fr": "partout sur", "es": "en todo", "ja": "全体で", "zh": "处处于"}
    },
    options: [
      { tex: "\\text{there are infinitely many functions } S\\to T", correct: true, why: {
        en: "$S$ is infinite, so values can be chosen freely at infinitely many points.",
        fr: "$S$ est infini : on choisit librement les valeurs en une infinité de points.",
        es: "$S$ es infinito: los valores se eligen libremente en infinitos puntos.",
        ja: "$S$ は無限集合なので無限に多くの選び方がある。",
        zh: "$S$ 是无限集，可在无穷多点自由取值。"
      } },
      { tex: "\\text{every continuous function } S\\to T \\text{ is differentiable}", correct: true, why: {
        en: "It is constant on each open interval, so its derivative is $0$.",
        fr: "Elle est constante sur chaque intervalle ouvert : dérivée nulle.",
        es: "Es constante en cada intervalo abierto: derivada $0$.",
        ja: "各開区間で定数なので微分は $0$。",
        zh: "在每个开区间上为常数，导数为 $0$。"
      } },
      { tex: "\\text{there are infinitely many strictly increasing functions } S\\to T", correct: false, why: {
        en: "A strictly increasing function on $(0,1)$ alone needs infinitely many values; $T$ has 4.",
        fr: "Strictement croissante sur $(0,1)$ exige une infinité de valeurs ; $T$ en a 4.",
        es: "Estrictamente creciente en $(0,1)$ exige infinitos valores; $T$ tiene 4.",
        ja: "$(0,1)$ で狭義増加なら無限個の値が必要。$T$ は4個。",
        zh: "在 $(0,1)$ 上严格递增就需要无穷多个值，$T$ 只有 4 个。"
      } },
      { tex: "\\text{there are exactly 4 continuous functions } S\\to T", correct: false, why: {
        en: "There are $4^3=64$: one constant per interval.",
        fr: "Il y en a $4^3=64$ : une constante par intervalle.",
        es: "Hay $4^3=64$: una constante por intervalo.",
        ja: "$4^3=64$ 個（各区間に定数1つ）。",
        zh: "共 $4^3=64$ 个（每个区间一个常数）。"
      } },
      { tex: "\\text{there are more than 120 continuous functions } S\\to T", correct: false, why: {
        en: "Only $64$.",
        fr: "Seulement $64$.",
        es: "Solo $64$.",
        ja: "$64$ 個だけ。",
        zh: "只有 $64$ 个。"
      } },
      { tex: "\\text{some continuous function } S\\to T \\text{ is onto}", correct: false, why: {
        en: "Three intervals give at most three values; $T$ has four.",
        fr: "Trois intervalles donnent au plus trois valeurs ; $T$ en a quatre.",
        es: "Tres intervalos dan a lo sumo tres valores; $T$ tiene cuatro.",
        ja: "3区間なので値は最大3つ。$T$ は4つ。",
        zh: "三个区间最多取三个值，$T$ 有四个。"
      } },
      { tex: "\\text{every function } S\\to T \\text{ is continuous}", correct: false, why: {
        en: "A function that jumps inside $(0,1)$ is not.",
        fr: "Une fonction qui saute dans $(0,1)$ ne l’est pas.",
        es: "Una función que salta dentro de $(0,1)$ no lo es.",
        ja: "$(0,1)$ の中で跳ぶ関数は連続でない。",
        zh: "在 $(0,1)$ 内跳跃的函数不连续。"
      } },
      { tex: "\\text{there are exactly } 4^3 \\text{ functions } S\\to T", correct: false, why: {
        en: "That counts only the continuous ones.",
        fr: "Cela ne compte que les continues.",
        es: "Eso solo cuenta las continuas.",
        ja: "それは連続なものだけの数。",
        zh: "那只是连续函数的个数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Continuous means constant on each piece",
          fr: "Continue = constante sur chaque morceau",
          es: "Continua = constante en cada trozo",
          ja: "連続なら各部分で定数",
          zh: "连续即在每段上为常数"
        },
        lines: ["f\\ \\text{continuous},\\ T\\ \\text{finite}\\;\\Rightarrow\\;f\\ \\text{constant on }(0,1),\\,(1,2),\\,(3,4)"],
        note: {
          en: "By the intermediate value theorem a continuous $f$ cannot jump between values of $T$ inside an interval.",
          fr: "D’après le théorème des valeurs intermédiaires, $f$ continue ne peut sauter entre valeurs de $T$ dans un intervalle.",
          es: "Por el teorema de los valores intermedios, $f$ continua no puede saltar entre valores de $T$ dentro de un intervalo.",
          ja: "中間値の定理より、区間内で $T$ の値の間を跳べない。",
          zh: "由介值定理，连续函数不能在区间内跳跃。"
        }
      },
      {
        title: {
          en: "Count and differentiate",
          fr: "Compter et dériver",
          es: "Contar y derivar",
          ja: "数えて微分",
          zh: "计数与求导"
        },
        lines: ["\\#\\{\\text{continuous}\\}=4^3=64,\\qquad f'(x)=0\\ \\text{everywhere on } S"],
        note: {
          en: "So continuous functions are differentiable, and there are 64 of them.",
          fr: "Les fonctions continues sont donc dérivables, et il y en a 64.",
          es: "Así las continuas son derivables, y hay 64.",
          ja: "連続関数は微分可能で、64個ある。",
          zh: "所以连续函数可导，共 64 个。"
        }
      },
      {
        title: {
          en: "All functions",
          fr: "Toutes les fonctions",
          es: "Todas las funciones",
          ja: "すべての関数",
          zh: "所有函数"
        },
        lines: ["\\#\\{S\\to T\\}=4^{|S|}=\\infty"],
        note: {
          en: "$S$ is uncountable, so there are infinitely many functions.",
          fr: "$S$ est non dénombrable : une infinité de fonctions.",
          es: "$S$ es no numerable: infinitas funciones.",
          ja: "$S$ は非可算なので関数は無限個。",
          zh: "$S$ 不可数，函数有无穷多个。"
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
          en: "In the original paper a third statement, “at most 120 continuous functions”, is also true.",
          fr: "Dans l’épreuve originale, une troisième affirmation (« au plus 120 fonctions continues ») est aussi vraie.",
          es: "En el examen original, una tercera afirmación («a lo sumo 120 continuas») también es verdadera.",
          ja: "原題では3つ目の「連続関数は高々120個」も正しい。",
          zh: "原题中第三个说法“连续函数至多 120 个”也正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
