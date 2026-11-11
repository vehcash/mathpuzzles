/* algebra · From two terms to a sum
   Two terms of an arithmetic sequence fix the difference and the first term. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const a = n => 1 + 3 * (n - 1);

  PuzzleBank.define({
    id: "alg-arithmetic-sum",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "kyotsu", "ib"]
    },
    difficulty: 1,
    title: {
      en: "From two terms to a sum",
      fr: "De deux termes à une somme",
      es: "De dos términos a una suma",
      ja: "2つの項から和へ",
      zh: "由两项求和"
    },
    statement: {
      en: "In an arithmetic sequence $a_3 = 7$ and $a_7 = 19$. <b>What is the sum of the first ten terms, $S_{10}$?</b>",
      fr: "Dans une suite arithmétique, $a_3 = 7$ et $a_7 = 19$. <b>Que vaut la somme des dix premiers termes, $S_{10}$ ?</b>",
      es: "En una sucesión aritmética $a_3 = 7$ y $a_7 = 19$. <b>¿Cuánto vale la suma de los diez primeros términos, $S_{10}$?</b>",
      ja: "等差数列で $a_3 = 7$、$a_7 = 19$ です。<b>初めの10項の和 $S_{10}$ はいくらですか？</b>",
      zh: "等差数列中 $a_3 = 7$，$a_7 = 19$。<b>前十项和 $S_{10}$ 是多少？</b>"
    },
    figureText: {
      en: "Dots for the terms a₁ … a₁₀ lying on a straight line; a₃ = 7 and a₇ = 19 are highlighted.",
      fr: "Des points pour les termes a₁ … a₁₀ alignés sur une droite ; a₃ = 7 et a₇ = 19 sont mis en évidence.",
      es: "Puntos de los términos a₁ … a₁₀ sobre una recta; a₃ = 7 y a₇ = 19 están resaltados.",
      ja: "項 a₁ … a₁₀ を表す点が一直線上に並び、a₃ = 7 と a₇ = 19 が強調されています。",
      zh: "表示 a₁ … a₁₀ 的点在一条直线上；a₃ = 7 和 a₇ = 19 被突出显示。"
    },
    hint: {
      en: "$a_7 - a_3 = 4d$.",
      fr: "$a_7 - a_3 = 4d$.",
      es: "$a_7 - a_3 = 4d$.",
      ja: "$a_7 - a_3 = 4d$.",
      zh: "$a_7 - a_3 = 4d$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example using the average of the first and last terms, or pairing terms), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple avec la moyenne du premier et du dernier terme, ou en groupant les termes par paires), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo con la media del primer y el último término, o emparejando términos), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば初項と末項の平均を使う、または項を組にする）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用首末项的平均，或把项两两配对），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 4, scale: 44, pad: 20 });
      F.seg([0, 0], [6.2, 0], 'axis'); F.seg([0, 0], [0, 3.9], 'axis');
      const P = n => [n * 0.6, a(n) / 30 * 3.8];
      F.seg(P(1), P(10), 'seg thin');
      for (let n = 1; n <= 10; n++) F.dot(P(n));
      F.text(P(3), 'a₃ = 7', 'len small', -10, -14); F.text(P(7), 'a₇ = 19', 'len small', -14, -14);
      F.P = P;
      return F;
    },
    options: [
      { tex: "145", correct: true, why: {
        en: "$d = 3$, $a_1 = 1$, $a_{10} = 28$, $S_{10} = \\tfrac{10}{2}(1 + 28)$.",
        fr: "$d = 3$, $a_1 = 1$, $a_{10} = 28$, $S_{10} = \\tfrac{10}{2}(1 + 28)$.",
        es: "$d = 3$, $a_1 = 1$, $a_{10} = 28$, $S_{10} = \\tfrac{10}{2}(1 + 28)$.",
        ja: "$d = 3$, $a_1 = 1$, $a_{10} = 28$, $S_{10} = \\tfrac{10}{2}(1 + 28)$.",
        zh: "$d = 3$, $a_1 = 1$, $a_{10} = 28$, $S_{10} = \\tfrac{10}{2}(1 + 28)$."
      } },
      { tex: "28", correct: false, why: {
        en: "That is $a_{10}$, the last term.",
        fr: "C’est $a_{10}$, le dernier terme.",
        es: "Es $a_{10}$, el último término.",
        ja: "それは末項 $a_{10}$ です。",
        zh: "那是末项 $a_{10}$。"
      } },
      { tex: "130", correct: false, why: {
        en: "Used $a_9 = 25$ as the last term.",
        fr: "A pris $a_9 = 25$ comme dernier terme.",
        es: "Tomó $a_9 = 25$ como último término.",
        ja: "末項に $a_9 = 25$ を使っています。",
        zh: "把 $a_9 = 25$ 当成了末项。"
      } },
      { tex: "155", correct: false, why: {
        en: "Took $a_1 = 3$ (the index of $a_3$) instead of $1$.",
        fr: "A pris $a_1 = 3$ au lieu de $1$.",
        es: "Tomó $a_1 = 3$ en lugar de $1$.",
        ja: "$a_1$ を $1$ ではなく $3$ としています。",
        zh: "把 $a_1$ 当成 $3$ 而不是 $1$。"
      } },
      { tex: "290", correct: false, why: {
        en: "Forgot to halve: $10\\cdot(1 + 28)$.",
        fr: "Oubli de la division par $2$ : $10\\cdot(1 + 28)$.",
        es: "Olvidó dividir entre $2$: $10\\cdot(1 + 28)$.",
        ja: "$2$ で割り忘れ：$10\\cdot(1 + 28)$。",
        zh: "忘了除以 $2$：$10\\cdot(1 + 28)$。"
      } },
      { tex: "100", correct: false, why: {
        en: "Used $d = 2$: $a_7 - a_3$ spans four steps, not six.",
        fr: "A pris $d = 2$ : de $a_3$ à $a_7$ il y a quatre pas.",
        es: "Usó $d = 2$: de $a_3$ a $a_7$ hay cuatro pasos.",
        ja: "$d = 2$ としています：$a_3$ から $a_7$ までは4歩です。",
        zh: "用了 $d = 2$：从 $a_3$ 到 $a_7$ 是四步。"
      } },
      { tex: "160", correct: false, why: {
        en: "$10\\cdot a_6 = 10\\cdot16$: the average term is $\\tfrac{a_1 + a_{10}}{2} = 14.5$, not $a_6$.",
        fr: "$10\\cdot a_6 = 10\\cdot16$ : le terme moyen est $\\tfrac{a_1 + a_{10}}{2} = 14{,}5$, pas $a_6$.",
        es: "$10\\cdot a_6 = 10\\cdot16$: el término medio es $\\tfrac{a_1 + a_{10}}{2} = 14{,}5$, no $a_6$.",
        ja: "$10\\cdot a_6 = 10\\cdot16$：平均の項は $a_6$ ではなく $\\tfrac{a_1 + a_{10}}{2} = 14.5$。",
        zh: "$10\\cdot a_6 = 10\\cdot16$：平均项是 $\\tfrac{a_1 + a_{10}}{2} = 14.5$，不是 $a_6$。"
      } },
      { tex: "135", correct: false, why: {
        en: "Arithmetic slip: $a_{10} = 26$ instead of $1 + 9\\cdot3 = 28$.",
        fr: "Erreur de calcul : $a_{10} = 26$ au lieu de $1 + 9\\cdot3 = 28$.",
        es: "Error de cálculo: $a_{10} = 26$ en lugar de $1 + 9\\cdot3 = 28$.",
        ja: "計算ミス：$a_{10}$ は $26$ ではなく $1 + 9\\cdot3 = 28$。",
        zh: "计算错误：$a_{10}$ 应为 $1 + 9\\cdot3 = 28$，不是 $26$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Difference and first term",
          fr: "Raison et premier terme",
          es: "Diferencia y primer término",
          ja: "公差と初項",
          zh: "公差与首项"
        },
        lines: ["a_7 - a_3 = 4d = 12 \\ \\Rightarrow\\ d = 3", "a_1 = a_3 - 2d = 1"],
        note: {
          en: "From $a_3$ to $a_7$ there are four steps of $d$.",
          fr: "De $a_3$ à $a_7$ il y a quatre pas de $d$.",
          es: "De $a_3$ a $a_7$ hay cuatro pasos de $d$.",
          ja: "$a_3$ から $a_7$ まで $d$ を4回足します。",
          zh: "从 $a_3$ 到 $a_7$ 有四个公差。"
        },
        fig(F) { F.draw(F.seg(F.P(3), F.P(7), 'hl yellow', 'over'), 700); }
      },
      {
        title: {
          en: "Sum = average × number of terms",
          fr: "Somme = moyenne × nombre de termes",
          es: "Suma = media × número de términos",
          ja: "和 = 平均 × 項数",
          zh: "和 = 平均数 × 项数"
        },
        lines: ["a_{10} = 1 + 9\\cdot3 = 28", "S_{10} = \\frac{10\\,(a_1 + a_{10})}{2} = 5\\cdot 29 = \\boxed{145}"],
        note: {
          en: "Pair the first with the last, the second with the second-last: each pair adds to $29$.",
          fr: "Associez le premier et le dernier, le deuxième et l’avant-dernier : chaque paire fait $29$.",
          es: "Empareja el primero con el último, el segundo con el penúltimo: cada par suma $29$.",
          ja: "最初と最後、2番目と最後から2番目…と組にすると、どの組も和は $29$。",
          zh: "首尾配对，第二项与倒数第二项配对……每对之和都是 $29$。"
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
