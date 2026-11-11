/* algebra · A river’s diversity index
   Gaokao 2024, Beijing paper (北京卷), Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2024-bj-biodiversity-index",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 7",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 7",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 7",
        ja: "2024年 中国・高考 北京卷 第7問",
        zh: "2024年高考数学北京卷 第7题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A river’s diversity index",
      fr: "L’indice de diversité d’une rivière",
      es: "El índice de diversidad de un río",
      ja: "川の多様性指数",
      zh: "河流的生物丰富度指数"
    },
    statement: {
      en: "A biodiversity index is $d=\\dfrac{S-1}{\\ln N}$, where $S$ is the number of species and $N$ the number of individuals. After a river clean-up $S$ is unchanged, $N$ goes from $N_1$ to $N_2$, and $d$ rises from $2.1$ to $3.15$. <b>Which of the following relations hold?</b>",
      fr: "Un indice de biodiversité est $d=\\dfrac{S-1}{\\ln N}$, où $S$ est le nombre d’espèces et $N$ le nombre d’individus. Après dépollution d’une rivière, $S$ est inchangé, $N$ passe de $N_1$ à $N_2$ et $d$ passe de $2{,}1$ à $3{,}15$. <b>Lesquelles des relations suivantes sont vraies ?</b>",
      es: "Un índice de biodiversidad es $d=\\dfrac{S-1}{\\ln N}$, donde $S$ es el número de especies y $N$ el de individuos. Tras limpiar un río, $S$ no cambia, $N$ pasa de $N_1$ a $N_2$ y $d$ sube de $2{,}1$ a $3{,}15$. <b>¿Cuáles de las siguientes relaciones se cumplen?</b>",
      ja: "生物多様性指数 $d=\\dfrac{S-1}{\\ln N}$（$S$ は種の数、$N$ は個体数）。川の浄化後、$S$ は変わらず $N$ は $N_1$ から $N_2$ に、$d$ は $2.1$ から $3.15$ に上がりました。<b>成り立つ関係はどれですか？</b>",
      zh: "生物丰富度指数 $d=\\dfrac{S-1}{\\ln N}$，$S$ 为物种数，$N$ 为生物个体总数。某河流治理后 $S$ 不变，$N$ 由 $N_1$ 变为 $N_2$，$d$ 由 $2.1$ 提高到 $3.15$。<b>下列哪些关系成立？</b>"
    },
    figureText: {
      en: "Two bars for the index before (2.1) and after (3.15) the clean-up.",
      fr: "Deux barres pour l’indice avant (2,1) et après (3,15) la dépollution.",
      es: "Dos barras para el índice antes (2,1) y después (3,15) de la limpieza.",
      ja: "浄化前（2.1）と浄化後（3.15）の指数の棒。",
      zh: "治理前（2.1）与治理后（3.15）指数的两根柱。"
    },
    hint: {
      en: "$S-1$ is the same both times: $2.1\\ln N_1=3.15\\ln N_2$.",
      fr: "$S-1$ est le même : $2{,}1\\ln N_1=3{,}15\\ln N_2$.",
      es: "$S-1$ no cambia: $2{,}1\\ln N_1=3{,}15\\ln N_2$.",
      ja: "$S-1$ は共通：$2.1\\ln N_1=3.15\\ln N_2$。",
      zh: "$S-1$ 不变：$2.1\\ln N_1=3.15\\ln N_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.2, scale: 56, pad: 16 });
      F.seg([0.4, 0.4], [3.8, 0.4], 'axis');
      F.rect(0.8, 0.4, 0.9, 2.1 * 0.75, 'fill-blue', 'fills'); F.text([1.25, 0.4 + 2.1 * 0.75], '2.1', 'len small', 0, -8); F.text([1.25, 0.4], 'N₁', 'pt', 0, 14);
      F.rect(2.3, 0.4, 0.9, 3.15 * 0.75, 'fill-pink', 'fills'); F.text([2.75, 0.4 + 3.15 * 0.75], '3.15', 'len small', 0, -8); F.text([2.75, 0.4], 'N₂', 'pt', 0, 14);
      F.reveal = () => {
      F.text([2.0, 2.4], '× 3/2', 'len small', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "N_2^3=N_1^2", correct: true, why: {
        en: "$\\ln N_2=\\tfrac23\\ln N_1$.",
        fr: "$\\ln N_2=\\tfrac23\\ln N_1$.",
        es: "$\\ln N_2=\\tfrac23\\ln N_1$.",
        ja: "$\\ln N_2=\\tfrac23\\ln N_1$。",
        zh: "$\\ln N_2=\\tfrac23\\ln N_1$。"
      } },
      { tex: "N_2=N_1^{2/3}", correct: true, why: {
        en: "The same relation.",
        fr: "La même relation.",
        es: "La misma relación.",
        ja: "同じ関係。",
        zh: "同一关系。"
      } },
      { tex: "N_2^2=N_1^3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3N_2=2N_1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2N_2=3N_1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "N_2>N_1", correct: false, why: {
        en: "A larger $d$ with the same $S$ means a smaller $\\ln N$, so $N_2<N_1$.",
        fr: "Un $d$ plus grand avec le même $S$ veut dire un $\\ln N$ plus petit : $N_2<N_1$.",
        es: "Un $d$ mayor con el mismo $S$ implica un $\\ln N$ menor: $N_2<N_1$.",
        ja: "$S$ が同じで $d$ が大きいなら $\\ln N$ は小さい：$N_2<N_1$。",
        zh: "$S$ 不变而 $d$ 变大，说明 $\\ln N$ 变小：$N_2<N_1$。"
      } },
      { tex: "N_2=1.5N_1", correct: false, why: {
        en: "The index is not proportional to $N$.",
        fr: "L’indice n’est pas proportionnel à $N$.",
        es: "El índice no es proporcional a $N$.",
        ja: "指数は $N$ に比例しない。",
        zh: "指数与 $N$ 不成正比。"
      } },
      { tex: "\\ln N_2=1.5\\ln N_1", correct: false, why: {
        en: "Reversed: $\\ln N_2=\\tfrac{2.1}{3.15}\\ln N_1$.",
        fr: "Inversé : $\\ln N_2=\\tfrac{2,1}{3,15}\\ln N_1$.",
        es: "Al revés: $\\ln N_2=\\tfrac{2,1}{3,15}\\ln N_1$.",
        ja: "逆：$\\ln N_2=\\tfrac{2.1}{3.15}\\ln N_1$。",
        zh: "反了：$\\ln N_2=\\tfrac{2.1}{3.15}\\ln N_1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Same numerator",
          fr: "Même numérateur",
          es: "Mismo numerador",
          ja: "分子が同じ",
          zh: "分子相同"
        },
        lines: ["S-1=2.1\\ln N_1=3.15\\ln N_2"],
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
          en: "Ratio of logs",
          fr: "Rapport des logarithmes",
          es: "Cociente de logaritmos",
          ja: "対数の比",
          zh: "对数之比"
        },
        lines: ["\\frac{\\ln N_2}{\\ln N_1}=\\frac{2.1}{3.15}=\\frac23\\ \\Rightarrow\\ 3\\ln N_2=2\\ln N_1\\ \\Rightarrow\\ \\boxed{N_2^3=N_1^2}"],
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
          en: "Two options are the same relation.",
          fr: "Deux options sont la même relation.",
          es: "Dos opciones son la misma relación.",
          ja: "2つの選択肢は同じ関係式。",
          zh: "有两个选项是同一个关系。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
