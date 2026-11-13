/* number · When is “2024” in base b a multiple of 16?
   AMC 12A 2024 (Mathematical Association of America), Problem 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2024-2024-in-base-b-div-16",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 11",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 11",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 11",
        ja: "AMC 12A 2024（アメリカ数学協会）第11問",
        zh: "AMC 12A 2024（美国数学协会）第 11 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "When is “2024” in base b a multiple of 16?",
      fr: "Quand « 2024 » en base b est-il multiple de 16 ?",
      es: "¿Cuándo es «2024» en base b múltiplo de 16?",
      ja: "b 進法の「2024」が16の倍数になるとき",
      zh: "b 进制的“2024”何时是 16 的倍数"
    },
    statement: {
      en: "For bases $5\\le b\\le2024$, the numeral $2024_b$ means $2b^3+2b+4$. Let $K$ be the number of such $b$ for which it is divisible by $16$. <b>Which of the following are true?</b>",
      fr: "Pour les bases $5\\le b\\le2024$, l’écriture $2024_b$ vaut $2b^3+2b+4$. Soit $K$ le nombre de tels $b$ pour lesquels ce nombre est divisible par $16$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para bases $5\\le b\\le2024$, el numeral $2024_b$ vale $2b^3+2b+4$. Sea $K$ el número de tales $b$ para los que es divisible entre $16$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$5\\le b\\le2024$ の底 $b$ で、$2024_b$ は $2b^3+2b+4$ を表します。これが $16$ で割り切れる $b$ の個数を $K$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "对底数 $5\\le b\\le2024$，$2024_b$ 表示 $2b^3+2b+4$。设使其被 $16$ 整除的 $b$ 的个数为 $K$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The eight residues of b mod 8 as boxes, some to be marked.",
      fr: "Les huit restes de b modulo 8 en cases, certaines à marquer.",
      es: "Los ocho restos de b módulo 8 como casillas, algunas por marcar.",
      ja: "b を8で割った余り8つの箱。いくつかに印をつける。",
      zh: "b 模 8 的八个余数方框，其中一些待标记。"
    },
    hint: {
      en: "Divide by $2$: you need $b^3+b+2\\equiv0\\pmod8$. Test $b\\equiv0,\\dots,7$.",
      fr: "Divisez par $2$ : il faut $b^3+b+2\\equiv0\\pmod8$. Testez $b\\equiv0,\\dots,7$.",
      es: "Divide entre $2$: hace falta $b^3+b+2\\equiv0\\pmod8$. Prueba $b\\equiv0,\\dots,7$.",
      ja: "2で割ると $b^3+b+2\\equiv0\\pmod8$。$b\\equiv0,\\dots,7$ を調べる。",
      zh: "除以 2：需 $b^3+b+2\\equiv0\\pmod8$，逐一检验 $b\\equiv0,\\dots,7$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.6, h: 1.4, scale: 46, pad: 16 });
      ['0', '1', '2', '3', '4', '5', '6', '7'].forEach((t, k) => { F.rect(0.3 + k * 1.05, 0.35, 0.9, 0.7, 'fill-blue', 'fills'); F.text([0.3 + 0.45 + k * 1.05, 0.7], t, 'len small', 0, 0); });
      F.reveal = () => {
      [3, 6, 7].forEach(k => F.rect(0.3 + k * 1.05, 0.35, 0.9, 0.7, 'fill-yellow', 'fills'));
      [3, 6, 7].forEach(k => F.text([0.75 + k * 1.05, 0.7], String(k), 'len small', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "3": {"fr": "3", "es": "3", "ja": "3", "zh": "3"},
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "5": {"fr": "5", "es": "5", "ja": "5", "zh": "5"},
      "6": {"fr": "6", "es": "6", "ja": "6", "zh": "6"},
      "7": {"fr": "7", "es": "7", "ja": "7", "zh": "7"},
      "every odd": {"fr": "tout", "es": "todo", "ja": "すべての奇数", "zh": "所有奇数"},
      "works": {"fr": "impair convient", "es": "impar funciona", "ja": "で成り立つ", "zh": "都满足"},
      "the digit sum of": {"fr": "la somme des chiffres de", "es": "la suma de cifras de", "ja": "の各桁の和は", "zh": "的数字和"},
      "is": {"fr": "vaut", "es": "es", "ja": "：", "zh": "为"},
      "drop": {"fr": "retirer", "es": "quitar", "ja": "除く", "zh": "去掉"}
    },
    options: [
      { tex: "K=758", correct: true, why: {
        en: "$3\\cdot253-1$",
        fr: "$3\\cdot253-1$",
        es: "$3\\cdot253-1$",
        ja: "$3\\cdot253-1$",
        zh: "$3\\cdot253-1$"
      } },
      { tex: "b\\equiv3,6,7\\pmod8", correct: true, why: {
        en: "Exactly these residues give $b^3+b+2\\equiv0\\pmod8$.",
        fr: "Exactement ces restes donnent $b^3+b+2\\equiv0\\pmod8$.",
        es: "Exactamente estos restos dan $b^3+b+2\\equiv0\\pmod8$.",
        ja: "まさにこの余りで $b^3+b+2\\equiv0\\pmod8$。",
        zh: "恰是这些余数使 $b^3+b+2\\equiv0\\pmod8$。"
      } },
      { tex: "K=759", correct: false, why: {
        en: "That counts $b=3$, which is below $5$.",
        fr: "Cela compte $b=3$, inférieur à $5$.",
        es: "Cuenta $b=3$, que es menor que $5$.",
        ja: "$5$ 未満の $b=3$ を数えている。",
        zh: "算进了小于 $5$ 的 $b=3$。"
      } },
      { tex: "K=506", correct: false, why: {
        en: "There are three good residues, not two.",
        fr: "Il y a trois bons restes, pas deux.",
        es: "Hay tres restos válidos, no dos.",
        ja: "条件を満たす余りは3つ。",
        zh: "满足的余数有三个。"
      } },
      { tex: "b\\equiv1,3,5\\pmod8", correct: false, why: {
        en: "$b=1$: $1+1+2=4\\not\\equiv0$",
        fr: "$b=1$: $1+1+2=4\\not\\equiv0$",
        es: "$b=1$: $1+1+2=4\\not\\equiv0$",
        ja: "$b=1$: $1+1+2=4\\not\\equiv0$",
        zh: "$b=1$: $1+1+2=4\\not\\equiv0$"
      } },
      { tex: "\\text{every odd}\\ b\\ \\text{works}", correct: false, why: {
        en: "$b=5$: $125+5+2=132\\equiv4\\pmod8$",
        fr: "$b=5$: $125+5+2=132\\equiv4\\pmod8$",
        es: "$b=5$: $125+5+2=132\\equiv4\\pmod8$",
        ja: "$b=5$: $125+5+2=132\\equiv4\\pmod8$",
        zh: "$b=5$: $125+5+2=132\\equiv4\\pmod8$"
      } },
      { tex: "\\text{the digit sum of}\\ K\\ \\text{is}\\ 21", correct: false, why: {
        en: "$7+5+8=20$",
        fr: "$7+5+8=20$",
        es: "$7+5+8=20$",
        ja: "$7+5+8=20$",
        zh: "$7+5+8=20$"
      } },
      { tex: "K=757", correct: false, why: {
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
          en: "Reduce mod 8",
          fr: "Réduire modulo 8",
          es: "Reducir módulo 8",
          ja: "8 を法として",
          zh: "模 8 化简"
        },
        lines: ["16\\mid2(b^3+b+2)\\iff b^3+b+2\\equiv0\\pmod8\\iff b\\equiv3,6,7"],
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
          en: "Count",
          fr: "Compter",
          es: "Contar",
          ja: "数える",
          zh: "计数"
        },
        lines: ["1\\le b\\le2024:\\ 3\\cdot253=759;\\ \\text{drop}\\ b=3\\Rightarrow K=758"],
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
