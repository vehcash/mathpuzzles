/* number · Powers of √2 ± 1
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-jee-2024-powers-of-1-plus-root2",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.5",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.5",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.5",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Powers of √2 ± 1",
      fr: "Puissances de √2 ± 1",
      es: "Potencias de √2 ± 1",
      ja: "√2 ± 1 の累乗",
      zh: "√2 ± 1 的幂"
    },
    statement: {
      en: "$S=\\{a+b\\sqrt2: a,b\\in\\mathbb Z\\}$, $T_1=\\{(-1+\\sqrt2)^n: n\\in\\mathbb N\\}$ and $T_2=\\{(1+\\sqrt2)^n: n\\in\\mathbb N\\}$. <b>Which of the following are true?</b>",
      fr: "$S=\\{a+b\\sqrt2: a,b\\in\\mathbb Z\\}$, $T_1=\\{(-1+\\sqrt2)^n: n\\in\\mathbb N\\}$ et $T_2=\\{(1+\\sqrt2)^n: n\\in\\mathbb N\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S=\\{a+b\\sqrt2: a,b\\in\\mathbb Z\\}$, $T_1=\\{(-1+\\sqrt2)^n: n\\in\\mathbb N\\}$ y $T_2=\\{(1+\\sqrt2)^n: n\\in\\mathbb N\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S=\\{a+b\\sqrt2: a,b\\in\\mathbb Z\\}$、$T_1=\\{(-1+\\sqrt2)^n: n\\in\\mathbb N\\}$、$T_2=\\{(1+\\sqrt2)^n: n\\in\\mathbb N\\}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S=\\{a+b\\sqrt2: a,b\\in\\mathbb Z\\}$，$T_1=\\{(-1+\\sqrt2)^n: n\\in\\mathbb N\\}$，$T_2=\\{(1+\\sqrt2)^n: n\\in\\mathbb N\\}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line with √2 − 1 ≈ 0.414 and √2 + 1 ≈ 2.414 marked; their product is 1.",
      fr: "Une droite graduée avec √2 − 1 ≈ 0,414 et √2 + 1 ≈ 2,414 ; leur produit vaut 1.",
      es: "Una recta numérica con √2 − 1 ≈ 0,414 y √2 + 1 ≈ 2,414; su producto es 1.",
      ja: "数直線上の √2 − 1 ≈ 0.414 と √2 + 1 ≈ 2.414。積は 1。",
      zh: "数轴上 √2 − 1 ≈ 0.414 与 √2 + 1 ≈ 2.414，乘积为 1。"
    },
    hint: {
      en: "$(\\sqrt2-1)^n\\to0$ and $(\\sqrt2+1)^n\\to\\infty$. And $e^{i\\pi\\theta}$ is an integer only when it is $\\pm1$.",
      fr: "$(\\sqrt2-1)^n\\to0$ et $(\\sqrt2+1)^n\\to\\infty$. Et $e^{i\\pi\\theta}$ n’est entier que s’il vaut $\\pm1$.",
      es: "$(\\sqrt2-1)^n\\to0$ y $(\\sqrt2+1)^n\\to\\infty$. Y $e^{i\\pi\\theta}$ solo es entero si vale $\\pm1$.",
      ja: "$(\\sqrt2-1)^n\\to0$、$(\\sqrt2+1)^n\\to\\infty$。$e^{i\\pi\\theta}$ が整数なのは $\\pm1$ のときだけ。",
      zh: "$(\\sqrt2-1)^n\\to0$，$(\\sqrt2+1)^n\\to\\infty$；$e^{i\\pi\\theta}$ 为整数仅当它为 $\\pm1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 16 });
      const X = v => 0.4 + 2.0 * v; F.seg([0.2, 0.6], [6.2, 0.6], 'axis');
      [0, 1, 2].forEach(v => { F.seg([X(v), 0.5], [X(v), 0.7], 'seg'); F.text([X(v), 0.6], String(v), 'tick', 0, 14); });
      [[Math.SQRT2 - 1, '√2 − 1'], [Math.SQRT2 + 1, '√2 + 1']].forEach(([v, t]) => { F.dot([X(v), 0.6]); F.text([X(v), 0.6], t, 'len small', 0, -12); });
      F.reveal = () => {
      [2, 3].forEach(n => { F.dot([X((Math.SQRT2 - 1) ** n), 0.6]); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is finite": {"fr": "est fini", "es": "es finito", "ja": "は有限", "zh": "是有限集"},
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"}
    },
    options: [
      { tex: "T_2\\cap(2024,\\infty)\\ne\\varnothing", correct: true, why: {
        en: "$(1+\\sqrt2)^n$ grows without bound.",
        fr: "$(1+\\sqrt2)^n$ croît sans borne.",
        es: "$(1+\\sqrt2)^n$ crece sin cota.",
        ja: "$(1+\\sqrt2)^n$ は限りなく大きくなる。",
        zh: "$(1+\\sqrt2)^n$ 无界增长。"
      } },
      { tex: "e^{i\\pi(a+b\\sqrt2)}\\in\\mathbb Z\\iff b=0", correct: true, why: {
        en: "It is an integer only if it is $\\pm1$, i.e. $a+b\\sqrt2\\in\\mathbb Z$, i.e. $b=0$.",
        fr: "Il n’est entier que s’il vaut $\\pm1$, soit $a+b\\sqrt2\\in\\mathbb Z$, soit $b=0$.",
        es: "Solo es entero si vale $\\pm1$, es decir $a+b\\sqrt2\\in\\mathbb Z$, es decir $b=0$.",
        ja: "整数なら $\\pm1$、つまり $a+b\\sqrt2\\in\\mathbb Z$、つまり $b=0$。",
        zh: "为整数则为 $\\pm1$，即 $a+b\\sqrt2\\in\\mathbb Z$，即 $b=0$。"
      } },
      { tex: "T_1\\cap\\left(0,\\tfrac1{2024}\\right)=\\varnothing", correct: false, why: {
        en: "$(\\sqrt2-1)^n\\to0^+$, so it enters that interval.",
        fr: "$(\\sqrt2-1)^n\\to0^+$ : il entre dans l’intervalle.",
        es: "$(\\sqrt2-1)^n\\to0^+$: entra en el intervalo.",
        ja: "$(\\sqrt2-1)^n\\to0^+$ なので区間に入る。",
        zh: "$(\\sqrt2-1)^n\\to0^+$，会进入该区间。"
      } },
      { tex: "T_1\\not\\subset S", correct: false, why: {
        en: "Powers of $a+b\\sqrt2$ stay of that form.",
        fr: "Les puissances de $a+b\\sqrt2$ restent de cette forme.",
        es: "Las potencias de $a+b\\sqrt2$ siguen siendo de esa forma.",
        ja: "$a+b\\sqrt2$ の累乗も同じ形。",
        zh: "$a+b\\sqrt2$ 的幂仍是该形式。"
      } },
      { tex: "T_1\\cap T_2\\ne\\varnothing", correct: false, why: {
        en: "Every element of $T_1$ is below $1$, every element of $T_2$ above.",
        fr: "Les éléments de $T_1$ sont $<1$, ceux de $T_2$ sont $>1$.",
        es: "Los de $T_1$ son $<1$ y los de $T_2$, $>1$.",
        ja: "$T_1$ の元は $1$ 未満、$T_2$ の元は $1$ より大。",
        zh: "$T_1$ 的元素都小于 $1$，$T_2$ 的都大于 $1$。"
      } },
      { tex: "T_2\\subset\\mathbb Z", correct: false, why: {
        en: "$1+\\sqrt2$ itself is irrational.",
        fr: "$1+\\sqrt2$ lui-même est irrationnel.",
        es: "El propio $1+\\sqrt2$ es irracional.",
        ja: "$1+\\sqrt2$ 自体が無理数。",
        zh: "$1+\\sqrt2$ 本身是无理数。"
      } },
      { tex: "T_1\\cap\\left(0,\\tfrac1{2024}\\right)\\ \\text{is finite}", correct: false, why: {
        en: "All large $n$ land in it: infinitely many.",
        fr: "Tous les grands $n$ y tombent : une infinité.",
        es: "Todos los $n$ grandes caen ahí: infinitos.",
        ja: "大きい $n$ はすべて入るので無限個。",
        zh: "所有足够大的 $n$ 都落在其中：无穷多。"
      } },
      { tex: "(1+\\sqrt2)^n(\\sqrt2-1)^n=-1\\ \\text{for every}\\ n", correct: false, why: {
        en: "The product is $1^n=1$.",
        fr: "Le produit vaut $1^n=1$.",
        es: "El producto es $1^n=1$.",
        ja: "積は $1^n=1$。",
        zh: "乘积为 $1^n=1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Closure",
          fr: "Stabilité",
          es: "Clausura",
          ja: "積で閉じる",
          zh: "封闭性"
        },
        lines: ["(a+b\\sqrt2)(c+d\\sqrt2)=(ac+2bd)+(ad+bc)\\sqrt2\\ \\Rightarrow\\ \\mathbb Z\\cup T_1\\cup T_2\\subset S"],
        note: {
          en: "In the exam this was a third true statement.",
          fr: "Dans l’épreuve c’était une troisième affirmation vraie.",
          es: "En el examen era una tercera afirmación verdadera.",
          ja: "原題ではこれも正しい選択肢。",
          zh: "原题中这也是正确选项。"
        }
      },
      {
        title: {
          en: "Small and large",
          fr: "Petit et grand",
          es: "Pequeño y grande",
          ja: "小さい・大きい",
          zh: "趋小与趋大"
        },
        lines: ["0<\\sqrt2-1<1<\\sqrt2+1:\\quad(\\sqrt2-1)^n\\to0,\\ (\\sqrt2+1)^n\\to\\infty"],
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
          en: "The complex exponential",
          fr: "L’exponentielle complexe",
          es: "La exponencial compleja",
          ja: "複素指数関数",
          zh: "复指数"
        },
        lines: ["|e^{i\\pi\\theta}|=1:\\ \\in\\mathbb Z\\iff=\\pm1\\iff\\theta\\in\\mathbb Z\\iff b=0"],
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
