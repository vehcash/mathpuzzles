/* number · Remainders that keep their order
   AMC 12B 2025 (Mathematical Association of America), Problem 23 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2025-remainders-in-order",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 23",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 23",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 23",
        ja: "AMC 12B 2025（アメリカ数学協会）第23問",
        zh: "AMC 12B 2025（美国数学协会）第 23 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Remainders that keep their order",
      fr: "Des restes qui gardent l’ordre",
      es: "Restos que conservan el orden",
      ja: "順序を保つ余り",
      zh: "保持顺序的余数"
    },
    statement: {
      en: "Find every integer $z>1$ such that, for all integers $0\\le x<y<z$, the remainder of $2025x$ mod $z$ is less than the remainder of $2025y$ mod $z$. <b>Which of the following are true?</b>",
      fr: "Trouvez tous les entiers $z>1$ tels que, pour tous entiers $0\\le x<y<z$, le reste de $2025x$ modulo $z$ soit inférieur au reste de $2025y$ modulo $z$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Halla todos los enteros $z>1$ tales que, para todos los enteros $0\\le x<y<z$, el resto de $2025x$ módulo $z$ sea menor que el de $2025y$ módulo $z$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "すべての整数 $0\\le x<y<z$ に対し、$2025x$ を $z$ で割った余りが $2025y$ を $z$ で割った余りより小さくなる整数 $z>1$ をすべて求めます。<b>次のうち正しいものはどれですか？</b>",
      zh: "求所有整数 $z>1$，使得对所有整数 $0\\le x<y<z$，$2025x$ 模 $z$ 的余数小于 $2025y$ 模 $z$ 的余数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "z slots for remainders 0 to z − 1, filled in increasing order.",
      fr: "z cases pour les restes 0 à z − 1, remplies dans l’ordre croissant.",
      es: "z casillas para los restos 0 a z − 1, rellenas en orden creciente.",
      ja: "余り 0〜z − 1 の z 個の枠を増加順に埋める。",
      zh: "余数 0 到 z − 1 的 z 个格子按递增顺序填入。"
    },
    hint: {
      en: "The $z$ remainders of $0,2025,\\dots,2025(z-1)$ are strictly increasing and lie in $\\{0,\\dots,z-1\\}$. So the $k$-th one must be $k$.",
      fr: "Les $z$ restes de $0,2025,\\dots,2025(z-1)$ sont strictement croissants dans $\\{0,\\dots,z-1\\}$ : le $k$-ième vaut donc $k$.",
      es: "Los $z$ restos de $0,2025,\\dots,2025(z-1)$ son estrictamente crecientes en $\\{0,\\dots,z-1\\}$: el $k$-ésimo debe ser $k$.",
      ja: "$0,2025,\\dots,2025(z-1)$ の $z$ 個の余りは $\\{0,\\dots,z-1\\}$ 内で狭義増加。$k$ 番目は $k$。",
      zh: "$0,2025,\\dots,2025(z-1)$ 的 $z$ 个余数在 $\\{0,\\dots,z-1\\}$ 中严格递增，故第 $k$ 个必为 $k$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 1.4, scale: 50, pad: 16 });
      ['0', '1', '2', '…', 'z − 1'].forEach((t, k) => { F.rect(0.3 + k * 1.05, 0.35, 0.9, 0.7, 'fill-blue', 'fills'); F.text([0.75 + k * 1.05, 0.7], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.text([2.8, 1.3], 'z | 2024', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "the sum of all such": {"fr": "la somme de tous ces", "es": "la suma de todos esos", "ja": "そのような", "zh": "所有这样的"},
      "is": {"fr": "vaut", "es": "es", "ja": "の和は", "zh": "之和为"},
      "there are infinitely many such": {"fr": "il y a une infinité de tels", "es": "hay infinitos", "ja": "は無数にある：", "zh": "有无穷多个"}
    },
    options: [
      { tex: "z\\ \\text{works}\\iff z\\mid2024,\\ z>1", correct: true, why: {
        en: "$2025k\\equiv k\\pmod z\\iff z\\mid2024k$; $k=1$",
        fr: "$2025k\\equiv k\\pmod z\\iff z\\mid2024k$; $k=1$",
        es: "$2025k\\equiv k\\pmod z\\iff z\\mid2024k$; $k=1$",
        ja: "$2025k\\equiv k\\pmod z\\iff z\\mid2024k$; $k=1$",
        zh: "$2025k\\equiv k\\pmod z\\iff z\\mid2024k$; $k=1$"
      } },
      { tex: "\\text{the sum of all such}\\ z\\ \\text{is}\\ 4319", correct: true, why: {
        en: "$\\sigma(2024)-1=15\\cdot12\\cdot24-1$",
        fr: "$\\sigma(2024)-1=15\\cdot12\\cdot24-1$",
        es: "$\\sigma(2024)-1=15\\cdot12\\cdot24-1$",
        ja: "$\\sigma(2024)-1=15\\cdot12\\cdot24-1$",
        zh: "$\\sigma(2024)-1=15\\cdot12\\cdot24-1$"
      } },
      { tex: "\\text{the sum of all such}\\ z\\ \\text{is}\\ 4320", correct: false, why: {
        en: "That includes $z=1$, which is excluded.",
        fr: "Cela inclut $z=1$, exclu.",
        es: "Incluye $z=1$, que está excluido.",
        ja: "除外の $z=1$ を含む。",
        zh: "包含了被排除的 $z=1$。"
      } },
      { tex: "z\\ \\text{works}\\iff z\\mid2025", correct: false, why: {
        en: "$z=3$: $2025\\equiv0\\pmod3$",
        fr: "$z=3$: $2025\\equiv0\\pmod3$",
        es: "$z=3$: $2025\\equiv0\\pmod3$",
        ja: "$z=3$: $2025\\equiv0\\pmod3$",
        zh: "$z=3$: $2025\\equiv0\\pmod3$"
      } },
      { tex: "z=6\\ \\text{works}", correct: false, why: {
        en: "$6\\nmid2024$: $2025\\equiv3\\pmod6$",
        fr: "$6\\nmid2024$: $2025\\equiv3\\pmod6$",
        es: "$6\\nmid2024$: $2025\\equiv3\\pmod6$",
        ja: "$6\\nmid2024$: $2025\\equiv3\\pmod6$",
        zh: "$6\\nmid2024$: $2025\\equiv3\\pmod6$"
      } },
      { tex: "z=5\\ \\text{works}", correct: false, why: {
        en: "$2025\\equiv0\\pmod5$",
        fr: "$2025\\equiv0\\pmod5$",
        es: "$2025\\equiv0\\pmod5$",
        ja: "$2025\\equiv0\\pmod5$",
        zh: "$2025\\equiv0\\pmod5$"
      } },
      { tex: "\\text{there are infinitely many such}\\ z", correct: false, why: {
        en: "They are the divisors of $2024$.",
        fr: "Ce sont les diviseurs de $2024$.",
        es: "Son los divisores de $2024$.",
        ja: "$2024$ の約数だけ。",
        zh: "只是 $2024$ 的约数。"
      } },
      { tex: "\\text{the sum of all such}\\ z\\ \\text{is}\\ 3750", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Forced remainders",
          fr: "Restes imposés",
          es: "Restos forzados",
          ja: "余りが決まる",
          zh: "余数被确定"
        },
        lines: ["2025k\\equiv k\\pmod z\\ \\ (0\\le k<z)\\iff z\\mid2024"],
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
          en: "Sum of divisors",
          fr: "Somme des diviseurs",
          es: "Suma de divisores",
          ja: "約数の和",
          zh: "约数和"
        },
        lines: ["2024=2^3\\cdot11\\cdot23:\\ \\sigma=15\\cdot12\\cdot24=4320,\\quad 4320-1=4319"],
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
