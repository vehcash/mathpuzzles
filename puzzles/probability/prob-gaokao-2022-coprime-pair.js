/* probability · Two numbers with nothing in common
   Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2022-coprime-pair",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 5",
        fr: "Gaokao 2022, épreuve nationale I (新课标I卷), question 5",
        es: "Gaokao 2022, examen nacional I (新课标I卷), pregunta 5",
        ja: "2022年 中国・高考 新課程標準I卷 第5問",
        zh: "2022年高考数学新课标I卷 第5题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Two numbers with nothing in common",
      fr: "Deux nombres sans diviseur commun",
      es: "Dos números sin nada en común",
      ja: "共通の約数がない2数",
      zh: "互质的两个数"
    },
    statement: {
      en: "Two different integers are chosen at random from $2, 3, 4, 5, 6, 7, 8$. <b>Which of the following equal the probability that they are coprime (their only common divisor is $1$)?</b>",
      fr: "On choisit au hasard deux entiers distincts parmi $2, 3, 4, 5, 6, 7, 8$. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’ils soient premiers entre eux (seul diviseur commun : $1$) ?</b>",
      es: "Se eligen al azar dos enteros distintos entre $2, 3, 4, 5, 6, 7, 8$. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que sean coprimos (su único divisor común es $1$)?</b>",
      ja: "$2, 3, 4, 5, 6, 7, 8$ から異なる2つの整数を無作為に選びます。<b>それらが互いに素（共通の約数が $1$ だけ）である確率に等しいものはどれですか？</b>",
      zh: "从 $2, 3, 4, 5, 6, 7, 8$ 中随机取两个不同的整数。<b>下列哪些等于它们互质（公约数只有 $1$）的概率？</b>"
    },
    figureText: {
      en: "The seven numbers as points on a circle, with a line joining every pair that shares a factor: only the 7 pairs among the even numbers and 3–6 are joined.",
      fr: "Les sept nombres placés sur un cercle, avec un trait entre chaque paire ayant un facteur commun : seules les 7 paires de nombres pairs et 3–6 sont reliées.",
      es: "Los siete números sobre un círculo, con una línea entre cada par con un factor común: solo los 7 pares de números pares y 3–6 están unidos.",
      ja: "円周上の7つの数。共通因数をもつ組を線で結ぶ：偶数どうしと 3–6 の7組だけ。",
      zh: "七个数放在圆周上，有公因数的每对之间连线：只有偶数之间和 3–6 共 7 对相连。"
    },
    hint: {
      en: "It is easier to count the pairs that are <i>not</i> coprime.",
      fr: "Il est plus simple de compter les paires qui ne sont <i>pas</i> premières entre elles.",
      es: "Es más fácil contar los pares que <i>no</i> son coprimos.",
      ja: "互いに素で<i>ない</i>組を数えるほうが簡単です。",
      zh: "数出<i>不</i>互质的对更容易。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 66, pad: 20 });
      const N = [2, 3, 4, 5, 6, 7, 8], P = {}; N.forEach((n, k) => { const t = Math.PI / 2 - 2 * Math.PI * k / 7; P[n] = [1.8 + 1.45 * Math.cos(t), 1.8 + 1.45 * Math.sin(t)]; });
      const g = (a, b) => b ? g(b, a % b) : a;
      for (let i = 0; i < 7; i++) for (let j = i + 1; j < 7; j++) if (g(N[i], N[j]) > 1) { const A = P[N[i]], B = P[N[j]], d = Math.hypot(B[0] - A[0], B[1] - A[1]), t = 0.3 / d; F.seg(lerp(A, B, t), lerp(A, B, 1 - t), 'seg'); }
      N.forEach(n => { F.circle(P[n], 0.22, 'tri fill-yellow'); F.text(P[n], String(n), 'len', 0, 1); });
      return F;
    },
    options: [
      { tex: "\\tfrac23", correct: true, why: {
        en: "$21$ pairs, $7$ share a factor, so $\\tfrac{14}{21}$.",
        fr: "$21$ paires, $7$ ont un facteur commun : $\\tfrac{14}{21}$.",
        es: "$21$ pares, $7$ comparten factor: $\\tfrac{14}{21}$.",
        ja: "$21$ 組中 $7$ 組が共通因数をもつので $\\tfrac{14}{21}$。",
        zh: "$21$ 对中 $7$ 对有公因数，故 $\\tfrac{14}{21}$。"
      } },
      { tex: "\\tfrac{14}{21}", correct: true, why: {
        en: "The same fraction before simplifying.",
        fr: "La même fraction non simplifiée.",
        es: "La misma fracción sin simplificar.",
        ja: "約分前の同じ分数。",
        zh: "约分前的同一个分数。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "$14$ of $21$ is more than half.",
        fr: "$14$ sur $21$, c’est plus de la moitié.",
        es: "$14$ de $21$ es más de la mitad.",
        ja: "$21$ 中 $14$ は半分より多い。",
        zh: "$21$ 中的 $14$ 多于一半。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "That is the probability of <i>sharing</i> a factor.",
        fr: "C’est la probabilité d’<i>avoir</i> un facteur commun.",
        es: "Es la probabilidad de <i>compartir</i> un factor.",
        ja: "それは共通因数を<i>もつ</i>確率。",
        zh: "那是<i>有</i>公因数的概率。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "Far too small.",
        fr: "Bien trop petit.",
        es: "Demasiado pequeño.",
        ja: "小さすぎる。",
        zh: "太小了。"
      } },
      { tex: "\\tfrac57", correct: false, why: {
        en: "Would need $15$ coprime pairs.",
        fr: "Il faudrait $15$ paires premières entre elles.",
        es: "Harían falta $15$ pares coprimos.",
        ja: "互いに素な組が $15$ 必要。",
        zh: "需要 $15$ 对互质。"
      } },
      { tex: "\\tfrac{14}{49}", correct: false, why: {
        en: "Counts ordered pairs with repeats in the denominator only.",
        fr: "Compte des couples ordonnés avec répétition au dénominateur seulement.",
        es: "Cuenta pares ordenados con repetición solo en el denominador.",
        ja: "分母だけ順序つき・重複ありで数えている。",
        zh: "只在分母里按有序、可重复计数。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "Too big: $7$ of the $21$ pairs fail.",
        fr: "Trop grand : $7$ des $21$ paires échouent.",
        es: "Demasiado grande: fallan $7$ de los $21$ pares.",
        ja: "大きすぎ：$21$ 組中 $7$ 組がだめ。",
        zh: "太大：$21$ 对中有 $7$ 对不行。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All pairs",
          fr: "Toutes les paires",
          es: "Todos los pares",
          ja: "すべての組",
          zh: "所有的对"
        },
        lines: ["\\binom72=21"],
        note: {
          en: "Unordered pairs of different numbers, all equally likely.",
          fr: "Paires non ordonnées de nombres distincts, équiprobables.",
          es: "Pares no ordenados de números distintos, equiprobables.",
          ja: "異なる2数の順序なしの組で、どれも同様に確からしい。",
          zh: "不同两数的无序对，等可能。"
        }
      },
      {
        title: {
          en: "Pairs sharing a factor",
          fr: "Paires avec un facteur commun",
          es: "Pares con un factor común",
          ja: "共通因数をもつ組",
          zh: "有公因数的对"
        },
        lines: ["\\{2,4\\},\\{2,6\\},\\{2,8\\},\\{4,6\\},\\{4,8\\},\\{6,8\\},\\{3,6\\}:\\ 7", "P=1-\\tfrac{7}{21}=\\boxed{\\tfrac23}"],
        note: {
          en: "Any two of the four even numbers, plus $3$ and $6$.",
          fr: "Deux des quatre nombres pairs, plus $3$ et $6$.",
          es: "Dos cualesquiera de los cuatro pares, más $3$ y $6$.",
          ja: "4つの偶数から2つと、$3$ と $6$。",
          zh: "四个偶数中任取两个，再加上 $3$ 与 $6$。"
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
          en: "Two options are the same fraction.",
          fr: "Deux options sont la même fraction.",
          es: "Dos opciones son la misma fracción.",
          ja: "2つの選択肢は同じ分数です。",
          zh: "有两个选项是同一个分数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
