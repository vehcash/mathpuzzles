/* probability · Exactly two hits
   Binomial distribution: P(X = 2) = C(4, 2) p² (1 − p)². */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const PR = [16, 32, 24, 8, 1];

  PuzzleBank.define({
    id: "prob-binomial-two-of-four",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "bac", "alevel", "ebau"]
    },
    difficulty: 2,
    title: {
      en: "Exactly two hits",
      fr: "Exactement deux réussites",
      es: "Exactamente dos aciertos",
      ja: "ちょうど2回成功",
      zh: "恰好命中两次"
    },
    statement: {
      en: "A player hits the target with probability $\\tfrac13$ on each shot, independently. <b>Which of the following equal the probability of exactly $2$ hits in $4$ shots?</b>",
      fr: "Un joueur touche la cible avec probabilité $\\tfrac13$ à chaque tir, indépendamment. <b>Lesquelles des valeurs suivantes sont égales à la probabilité d’exactement $2$ réussites en $4$ tirs ?</b>",
      es: "Un jugador acierta con probabilidad $\\tfrac13$ en cada tiro, de forma independiente. <b>¿Cuáles de los siguientes son iguales a la probabilidad de exactamente $2$ aciertos en $4$ tiros?</b>",
      ja: "ある選手は各射撃で独立に確率 $\\tfrac13$ で的に当てます。<b>次のうち、$4$ 回中ちょうど $2$ 回当たる確率に等しいものはどれですか？</b>",
      zh: "某选手每次射击命中的概率为 $\\tfrac13$，相互独立。<b>下列哪些等于 $4$ 次射击中恰好命中 $2$ 次的概率？</b>"
    },
    figureText: {
      en: "Bars for 0 to 4 hits out of 4 shots, drawn to scale. Their probabilities are written in the solution.",
      fr: "Barres pour 0 à 4 réussites sur 4 tirs, à l’échelle. Leurs probabilités sont écrites dans la solution.",
      es: "Barras para 0 a 4 aciertos de 4 tiros, a escala. Sus probabilidades se escriben en la solución.",
      ja: "4回中 0〜4 回命中の棒（縮尺どおり）。確率は解答で書き込みます。",
      zh: "4 次射击命中 0 到 4 次的条形（按比例）。概率在解答中写出。"
    },
    hint: {
      en: "$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$.",
      fr: "$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$.",
      es: "$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$.",
      ja: "$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$.",
      zh: "$P(X = k) = \\binom{n}{k} p^k (1 - p)^{n - k}$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example listing the 6 orders such as HHMM, HMHM, … and adding their probabilities), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en listant les 6 ordres comme RRMM, RMRM, … et en additionnant leurs probabilités), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo enumerando los 6 órdenes como AAFF, AFAF, … y sumando sus probabilidades), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば ○○××、○×○× … の6通りを書き出して確率を足す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如列出 6 种顺序如 中中失失、中失中失…… 再把概率相加），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 3.6, scale: 46, pad: 18 });
      F.seg([0, 0], [6, 0], 'axis');
      F.bars = PR.map((v, k) => { const h = v / 32 * 3; const r = F.rect(0.5 + k * 1.1, 0, 0.8, h, 'fill-blue'); F.text([0.9 + k * 1.1, 0], String(k), 'tick', 0, 12); return r; });
      F.reveal = () => {
        PR.forEach((v, k) => F.text([0.9 + k * 1.1, v / 32 * 3], v + '/81', 'len small', 0, -10));
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{8}{27}", correct: true, why: {
        en: "$6\\cdot\\tfrac19\\cdot\\tfrac49 = \\tfrac{24}{81}$.",
        fr: "$6\\cdot\\tfrac19\\cdot\\tfrac49 = \\tfrac{24}{81}$.",
        es: "$6\\cdot\\tfrac19\\cdot\\tfrac49 = \\tfrac{24}{81}$.",
        ja: "$6\\cdot\\tfrac19\\cdot\\tfrac49 = \\tfrac{24}{81}$.",
        zh: "$6\\cdot\\tfrac19\\cdot\\tfrac49 = \\tfrac{24}{81}$."
      } },
      { tex: "\\tfrac{24}{81}", correct: true, why: {
        en: "The same fraction before simplifying.",
        fr: "La même fraction avant simplification.",
        es: "La misma fracción sin simplificar.",
        ja: "約分前の同じ分数。",
        zh: "约分前的同一个分数。"
      } },
      { tex: "\\tfrac{4}{81}", correct: false, why: {
        en: "$p^2(1 - p)^2$ for one order only — there are $\\binom42 = 6$ orders.",
        fr: "$p^2(1 - p)^2$ pour un seul ordre — il y en a $\\binom42 = 6$.",
        es: "$p^2(1 - p)^2$ para un solo orden — hay $\\binom42 = 6$.",
        ja: "1通りの順序だけの $p^2(1 - p)^2$ — 順序は $\\binom42 = 6$ 通りあります。",
        zh: "只算了一种顺序的 $p^2(1 - p)^2$ —— 共有 $\\binom42 = 6$ 种。"
      } },
      { tex: "\\tfrac19", correct: false, why: {
        en: "Only $p^2$: the two misses are forgotten.",
        fr: "Seulement $p^2$ : les deux échecs sont oubliés.",
        es: "Solo $p^2$: se olvidan los dos fallos.",
        ja: "$p^2$ だけ：2回の外れを忘れています。",
        zh: "只有 $p^2$：漏了两次未中。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "“2 out of 4” is not $\\tfrac24$.",
        fr: "« 2 sur 4 » ne vaut pas $\\tfrac24$.",
        es: "«2 de 4» no es $\\tfrac24$.",
        ja: "「4回中2回」は $\\tfrac24$ ではありません。",
        zh: "“4 次中 2 次”不等于 $\\tfrac24$。"
      } },
      { tex: "\\tfrac{16}{81}", correct: false, why: {
        en: "That is $P(X = 0) = \\left(\\tfrac23\\right)^4$.",
        fr: "That is $P(X = 0) = \\left(\\tfrac23\\right)^4$.",
        es: "That is $P(X = 0) = \\left(\\tfrac23\\right)^4$.",
        ja: "That is $P(X = 0) = \\left(\\tfrac23\\right)^4$.",
        zh: "That is $P(X = 0) = \\left(\\tfrac23\\right)^4$."
      } },
      { tex: "\\tfrac{32}{81}", correct: false, why: {
        en: "That is $P(X = 1)$, the most likely outcome.",
        fr: "C’est $P(X = 1)$, le résultat le plus probable.",
        es: "Es $P(X = 1)$, el resultado más probable.",
        ja: "それは最も起こりやすい $P(X = 1)$ です。",
        zh: "那是最可能的 $P(X = 1)$。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "That is the probability of missing one shot.",
        fr: "C’est la probabilité de rater un tir.",
        es: "Es la probabilidad de fallar un tiro.",
        ja: "それは1回外れる確率です。",
        zh: "那是一次未中的概率。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count the orders",
          fr: "Compter les ordres",
          es: "Contar los órdenes",
          ja: "順序を数える",
          zh: "数顺序"
        },
        lines: ["\\binom{4}{2} = 6"],
        note: {
          en: "Choose which two of the four shots hit.",
          fr: "Choisissez lesquels des quatre tirs réussissent.",
          es: "Elige cuáles de los cuatro tiros aciertan.",
          ja: "4回のうちどの2回が当たるかを選びます。",
          zh: "从四次中选出命中的两次。"
        }
      },
      {
        title: {
          en: "Multiply by the probability of one order",
          fr: "Multiplier par la probabilité d’un ordre",
          es: "Multiplicar por la probabilidad de un orden",
          ja: "1通りの確率を掛ける",
          zh: "乘以一种顺序的概率"
        },
        lines: ["P(X = 2) = 6\\cdot\\left(\\tfrac13\\right)^2\\left(\\tfrac23\\right)^2 = \\frac{24}{81} = \\boxed{\\tfrac{8}{27}}"],
        note: {
          en: "All five probabilities add up to $\\tfrac{81}{81} = 1$.",
          fr: "Les cinq probabilités ont pour somme $\\tfrac{81}{81} = 1$.",
          es: "Las cinco probabilidades suman $\\tfrac{81}{81} = 1$.",
          ja: "5つの確率の和は $\\tfrac{81}{81} = 1$。",
          zh: "五个概率之和为 $\\tfrac{81}{81} = 1$。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.bars[2].classList.add('fill-pink'); F.fadeIn(F.bars[2], 500); }
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
