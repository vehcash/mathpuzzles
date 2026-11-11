/* number · Greedy unit fractions
   Oxford MAT 2018 (Mathematics Admissions Test), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2018-greedy-unit-fractions",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 6",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 6",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 6",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 6",
        zh: "牛津大学数学入学考试 MAT 2018 第 6 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Greedy unit fractions",
      fr: "Fractions unitaires gloutonnes",
      es: "Fracciones unitarias voraces",
      ja: "貪欲な単位分数",
      zh: "贪心的单位分数"
    },
    statement: {
      en: "The <i>greedy</i> method writes a fraction $0<q<1$ as a sum of different unit fractions $\\frac1m$: at each step it subtracts the largest unit fraction that is not more than what is left. <b>Applied to $\\frac{4}{13}$, which of the following are true?</b>",
      fr: "La méthode <i>gloutonne</i> écrit une fraction $0<q<1$ comme somme de fractions unitaires $\\frac1m$ distinctes : à chaque étape on retire la plus grande fraction unitaire qui ne dépasse pas le reste. <b>Appliquée à $\\frac{4}{13}$, lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El método <i>voraz</i> escribe una fracción $0<q<1$ como suma de fracciones unitarias $\\frac1m$ distintas: en cada paso resta la mayor fracción unitaria que no supere lo que queda. <b>Aplicado a $\\frac{4}{13}$, ¿cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "<i>貪欲法</i>は分数 $0<q<1$ を異なる単位分数 $\\frac1m$ の和で表します。各段階で、残りを超えない最大の単位分数を引きます。<b>$\\frac{4}{13}$ に適用したとき、次のうち正しいものはどれですか？</b>",
      zh: "<i>贪心法</i>把分数 $0<q<1$ 写成不同单位分数 $\\frac1m$ 之和：每一步减去不超过剩余部分的最大单位分数。<b>对 $\\frac{4}{13}$ 使用此法，下列哪些正确？</b>"
    },
    figureText: {
      en: "A bar of length 4/13 cut into three pieces: 1/4, then 1/18, then a tiny 1/468.",
      fr: "Une barre de longueur 4/13 coupée en trois morceaux : 1/4, puis 1/18, puis un minuscule 1/468.",
      es: "Una barra de longitud 4/13 cortada en tres trozos: 1/4, luego 1/18 y un diminuto 1/468.",
      ja: "長さ 4/13 の帯を3つに分けた図：1/4、1/18、ごく小さい 1/468。",
      zh: "长为 4/13 的条被分成三段：1/4、1/18，以及极小的 1/468。"
    },
    hint: {
      en: "The largest $\\frac1m\\le q$ has $m=\\lceil 1/q\\rceil$.",
      fr: "La plus grande $\\frac1m\\le q$ a $m=\\lceil 1/q\\rceil$.",
      es: "La mayor $\\frac1m\\le q$ tiene $m=\\lceil 1/q\\rceil$.",
      ja: "$q$ 以下の最大の $\\frac1m$ は $m=\\lceil 1/q\\rceil$。",
      zh: "不超过 $q$ 的最大 $\\frac1m$ 满足 $m=\\lceil 1/q\\rceil$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 56, pad: 18 });
      const L = 5.6 / (4 / 13), x0 = 0.2, y = 0.6, h = 0.6;
      let x = x0; [[1 / 4, 'fill-yellow', '1/4'], [1 / 18, 'fill-blue', '1/18'], [1 / 468, 'fill-pink', '']].forEach(([v, c, t]) => { F.rect(x, y, v * L, h, 'tri ' + c); if (t) F.text([x + v * L / 2, y + h / 2], t, 'len small', 0, 0); x += v * L; });
      F.text([x0 + 5.6, y], '1/468', 'len small', -6, 16);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "it uses exactly three unit fractions": {"fr": "elle utilise exactement trois fractions unitaires", "es": "usa exactamente tres fracciones unitarias", "ja": "ちょうど3つの単位分数を使う", "zh": "恰好用三个单位分数"},
      "the first term is": {"fr": "le premier terme est", "es": "el primer término es", "ja": "最初の項は", "zh": "第一项是"},
      "greedy gives": {"fr": "la méthode donne", "es": "el voraz da", "ja": "貪欲法の結果は", "zh": "贪心得到"},
      "the second term is": {"fr": "le deuxième terme est", "es": "el segundo término es", "ja": "2番目の項は", "zh": "第二项是"},
      "it uses four unit fractions": {"fr": "elle utilise quatre fractions unitaires", "es": "usa cuatro fracciones unitarias", "ja": "4つの単位分数を使う", "zh": "用四个单位分数"},
      "the last term is": {"fr": "le dernier terme est", "es": "el último término es", "ja": "最後の項は", "zh": "最后一项是"},
      "is not a sum of different unit fractions": {"fr": "n’est pas une somme de fractions unitaires distinctes", "es": "no es suma de fracciones unitarias distintas", "ja": "は異なる単位分数の和で表せない", "zh": "不能写成不同单位分数之和"}
    },
    options: [
      { tex: "\\tfrac4{13}=\\tfrac14+\\tfrac1{18}+\\tfrac1{468}", correct: true, why: {
        en: "$\\tfrac4{13}-\\tfrac14=\\tfrac3{52}$, then $\\tfrac3{52}-\\tfrac1{18}=\\tfrac1{468}$.",
        fr: "$\\tfrac4{13}-\\tfrac14=\\tfrac3{52}$, puis $\\tfrac3{52}-\\tfrac1{18}=\\tfrac1{468}$.",
        es: "$\\tfrac4{13}-\\tfrac14=\\tfrac3{52}$ y luego $\\tfrac3{52}-\\tfrac1{18}=\\tfrac1{468}$.",
        ja: "$\\tfrac4{13}-\\tfrac14=\\tfrac3{52}$、次に $\\tfrac3{52}-\\tfrac1{18}=\\tfrac1{468}$。",
        zh: "$\\tfrac4{13}-\\tfrac14=\\tfrac3{52}$，再 $\\tfrac3{52}-\\tfrac1{18}=\\tfrac1{468}$。"
      } },
      { tex: "\\text{it uses exactly three unit fractions}", correct: true, why: {
        en: "The numerators go $4\\to3\\to1$, so it stops after three steps.",
        fr: "Les numérateurs vont $4\\to3\\to1$ : arrêt après trois étapes.",
        es: "Los numeradores van $4\\to3\\to1$: se detiene tras tres pasos.",
        ja: "分子は $4\\to3\\to1$ と減り、3段で終わる。",
        zh: "分子依次为 $4\\to3\\to1$，三步后结束。"
      } },
      { tex: "\\text{the first term is } \\tfrac13", correct: false, why: {
        en: "$\\tfrac13>\\tfrac4{13}$; the first term is $\\tfrac14$.",
        fr: "$\\tfrac13>\\tfrac4{13}$ ; le premier terme est $\\tfrac14$.",
        es: "$\\tfrac13>\\tfrac4{13}$; el primer término es $\\tfrac14$.",
        ja: "$\\tfrac13>\\tfrac4{13}$ なので最初は $\\tfrac14$。",
        zh: "$\\tfrac13>\\tfrac4{13}$，第一项是 $\\tfrac14$。"
      } },
      { tex: "\\text{greedy gives } \\tfrac14+\\tfrac1{26}+\\tfrac1{52}", correct: false, why: {
        en: "That sum is $\\tfrac4{13}$, but greedy takes $\\tfrac1{18}$ second, not $\\tfrac1{26}$.",
        fr: "Cette somme vaut $\\tfrac4{13}$, mais la méthode prend ensuite $\\tfrac1{18}$, pas $\\tfrac1{26}$.",
        es: "Esa suma es $\\tfrac4{13}$, pero el voraz toma después $\\tfrac1{18}$, no $\\tfrac1{26}$.",
        ja: "和は $\\tfrac4{13}$ だが、貪欲法の2番目は $\\tfrac1{26}$ でなく $\\tfrac1{18}$。",
        zh: "这个和确是 $\\tfrac4{13}$，但贪心第二步取 $\\tfrac1{18}$ 而非 $\\tfrac1{26}$。"
      } },
      { tex: "\\text{the second term is } \\tfrac1{17}", correct: false, why: {
        en: "$\\tfrac1{17}>\\tfrac3{52}$ would overshoot.",
        fr: "$\\tfrac1{17}>\\tfrac3{52}$ dépasserait.",
        es: "$\\tfrac1{17}>\\tfrac3{52}$ se pasaría.",
        ja: "$\\tfrac1{17}>\\tfrac3{52}$ で超えてしまう。",
        zh: "$\\tfrac1{17}>\\tfrac3{52}$ 会超出。"
      } },
      { tex: "\\text{it uses four unit fractions}", correct: false, why: {
        en: "The remainder after two steps is already a unit fraction.",
        fr: "Le reste après deux étapes est déjà une fraction unitaire.",
        es: "El resto tras dos pasos ya es una fracción unitaria.",
        ja: "2段の後の残りがすでに単位分数。",
        zh: "两步后的余数已是单位分数。"
      } },
      { tex: "\\text{the last term is } \\tfrac1{156}", correct: false, why: {
        en: "$\\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}$.",
        fr: "$\\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}$.",
        es: "$\\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}$.",
        ja: "$\\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}$。",
        zh: "$\\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}$。"
      } },
      { tex: "\\tfrac4{13} \\text{ is not a sum of different unit fractions}", correct: false, why: {
        en: "Every positive fraction is; greedy just found one way.",
        fr: "Toute fraction positive l’est ; la méthode en a trouvé une.",
        es: "Toda fracción positiva lo es; el método encontró una forma.",
        ja: "どの正の分数もそうで、貪欲法が1つ見つけた。",
        zh: "任何正分数都可以，贪心法找到了一种。"
      } }
    ],
    steps: [
      {
        title: {
          en: "First step",
          fr: "Première étape",
          es: "Primer paso",
          ja: "1段目",
          zh: "第一步"
        },
        lines: ["\\lceil 13/4\\rceil=4:\\quad \\tfrac4{13}-\\tfrac14=\\tfrac{16-13}{52}=\\tfrac3{52}"],
        note: {
          en: "$\\tfrac13$ is too big, $\\tfrac14$ fits.",
          fr: "$\\tfrac13$ est trop grand, $\\tfrac14$ convient.",
          es: "$\\tfrac13$ es demasiado, $\\tfrac14$ cabe.",
          ja: "$\\tfrac13$ は大きすぎ、$\\tfrac14$ が入る。",
          zh: "$\\tfrac13$ 太大，$\\tfrac14$ 合适。"
        }
      },
      {
        title: {
          en: "Second step",
          fr: "Deuxième étape",
          es: "Segundo paso",
          ja: "2段目",
          zh: "第二步"
        },
        lines: ["\\lceil 52/3\\rceil=18:\\quad \\tfrac3{52}-\\tfrac1{18}=\\tfrac{54-52}{936}=\\tfrac1{468}"],
        note: {
          en: "The remainder is a unit fraction, so the method stops: $\\boxed{\\tfrac14+\\tfrac1{18}+\\tfrac1{468}}$.",
          fr: "Le reste est une fraction unitaire : la méthode s’arrête, $\\boxed{\\tfrac14+\\tfrac1{18}+\\tfrac1{468}}$.",
          es: "El resto es una fracción unitaria y el método termina: $\\boxed{\\tfrac14+\\tfrac1{18}+\\tfrac1{468}}$.",
          ja: "残りは単位分数なので終了：$\\boxed{\\tfrac14+\\tfrac1{18}+\\tfrac1{468}}$。",
          zh: "余数是单位分数，结束：$\\boxed{\\tfrac14+\\tfrac1{18}+\\tfrac1{468}}$。"
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
          en: "Another valid sum is not necessarily the greedy one.",
          fr: "Une autre somme valable n’est pas forcément la gloutonne.",
          es: "Otra suma válida no es necesariamente la voraz.",
          ja: "別の正しい和が貪欲法のものとは限らない。",
          zh: "另一种正确的和不一定是贪心得到的。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
