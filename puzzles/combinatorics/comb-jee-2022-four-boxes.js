/* combinatorics · Ten balls from four boxes
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2022-four-boxes",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.15",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.15",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.15",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.15",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.15"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Ten balls from four boxes",
      fr: "Dix boules de quatre boîtes",
      es: "Diez bolas de cuatro cajas",
      ja: "4つの箱から10個",
      zh: "从四个盒子取十个球"
    },
    statement: {
      en: "Each of 4 boxes contains 3 red and 2 blue balls; all 20 balls are distinct. <b>Which of the following equal the number of ways to choose 10 balls so that from each box at least one red and at least one blue ball are chosen?</b>",
      fr: "Chacune de 4 boîtes contient 3 boules rouges et 2 bleues ; les 20 boules sont distinctes. <b>Lesquelles des valeurs suivantes sont égales au nombre de façons de choisir 10 boules de sorte que de chaque boîte on prenne au moins une rouge et au moins une bleue ?</b>",
      es: "Cada una de 4 cajas contiene 3 bolas rojas y 2 azules; las 20 bolas son distintas. <b>¿Cuáles de los siguientes valores son iguales al número de formas de elegir 10 bolas de modo que de cada caja se tome al menos una roja y al menos una azul?</b>",
      ja: "4つの箱にそれぞれ赤玉3個と青玉2個が入っていて、20個はすべて区別できます。<b>各箱から赤も青も少なくとも1個ずつ選ぶように10個選ぶ方法の数に等しいものはどれですか？</b>",
      zh: "4 个盒子中各有 3 个红球和 2 个蓝球，20 个球互不相同。<b>选出 10 个球，使每个盒子至少选出一个红球和一个蓝球，方法数等于下列哪些？</b>"
    },
    figureText: {
      en: "Four boxes, each with three red and two blue balls. Below, the number of ways to take k balls from one box with both colours: k = 2: 6, k = 3: 9, k = 4: 5, k = 5: 1.",
      fr: "Quatre boîtes, chacune avec trois rouges et deux bleues. En dessous, le nombre de façons de prendre k boules d’une boîte avec les deux couleurs : k = 2 : 6, k = 3 : 9, k = 4 : 5, k = 5 : 1.",
      es: "Cuatro cajas, cada una con tres rojas y dos azules. Debajo, el número de formas de tomar k bolas de una caja con los dos colores: k = 2: 6, k = 3: 9, k = 4: 5, k = 5: 1.",
      ja: "赤3個・青2個の箱が4つ。その下に、1つの箱から両方の色を含めて k 個取る方法の数：k = 2: 6、k = 3: 9、k = 4: 5、k = 5: 1。",
      zh: "四个盒子，各有三个红球和两个蓝球。下方为从一个盒子取 k 个且两色都有的方法数：k = 2：6，k = 3：9，k = 4：5，k = 5：1。"
    },
    hint: {
      en: "Each box gives at least 2 balls, so the 10 split as $2+2+2+4$ or $2+2+3+3$ in some order. Count one box at a time.",
      fr: "Chaque boîte donne au moins 2 boules : les 10 se répartissent en $2+2+2+4$ ou $2+2+3+3$, dans un certain ordre. Comptez boîte par boîte.",
      es: "Cada caja da al menos 2 bolas, así que las 10 se reparten como $2+2+2+4$ o $2+2+3+3$ en algún orden. Cuenta caja a caja.",
      ja: "各箱から2個以上なので、10個の分け方は $2+2+2+4$ か $2+2+3+3$（順不同）。箱ごとに数えます。",
      zh: "每个盒子至少取 2 个，所以 10 个的分法是 $2+2+2+4$ 或 $2+2+3+3$（顺序可变）。逐个盒子计数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.4, h: 3.2, scale: 40, pad: 14 });
      for (let b = 0; b < 4; b++) { const x = 0.3 + b * 2.05; F.rect(x, 1.3, 1.7, 1.6, 'tri');
        for (let i = 0; i < 3; i++) F.circle([x + 0.35 + i * 0.5, 2.45], 0.17, 'fill-pink');
        for (let i = 0; i < 2; i++) F.circle([x + 0.6 + i * 0.5, 1.75], 0.17, 'fill-blue'); }
      ['k=2: 6', 'k=3: 9', 'k=4: 5', 'k=5: 1'].forEach((t, i) => F.text([1.15 + i * 2.05, 0.6], t, 'len small', 0, 0));
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "orders": {"fr": "ordres", "es": "órdenes", "ja": "通り", "zh": "种顺序"}
    },
    options: [
      { tex: "21816", correct: true, why: {
        en: "$4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496$.",
        fr: "$4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496$.",
        es: "$4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496$.",
        ja: "$4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496$.",
        zh: "$4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496$."
      } },
      { tex: "4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2", correct: true, why: {
        en: "The two split types, counted box by box.",
        fr: "Les deux types de répartition, comptés boîte par boîte.",
        es: "Los dos tipos de reparto, contados caja a caja.",
        ja: "2種類の分け方を箱ごとに数えたもの。",
        zh: "两种分法逐盒计数。"
      } },
      { tex: "85536", correct: false, why: {
        en: "One of the official distractors; it overcounts.",
        fr: "Un des leurres officiels ; il surcompte.",
        es: "Uno de los distractores oficiales; cuenta de más.",
        ja: "公式の誤答の1つ。数えすぎ。",
        zh: "官方干扰项之一，多算了。"
      } },
      { tex: "12096", correct: false, why: {
        en: "An official distractor; too small.",
        fr: "Un leurre officiel ; trop petit.",
        es: "Un distractor oficial; demasiado pequeño.",
        ja: "公式の誤答。小さすぎ。",
        zh: "官方干扰项，太小。"
      } },
      { tex: "156816", correct: false, why: {
        en: "An official distractor; too large.",
        fr: "Un leurre officiel ; trop grand.",
        es: "Un distractor oficial; demasiado grande.",
        ja: "公式の誤答。大きすぎ。",
        zh: "官方干扰项，太大。"
      } },
      { tex: "17496", correct: false, why: {
        en: "Only the $3+3+2+2$ splits.",
        fr: "Seulement les répartitions $3+3+2+2$.",
        es: "Solo los repartos $3+3+2+2$.",
        ja: "$3+3+2+2$ の場合だけ。",
        zh: "只算了 $3+3+2+2$ 的情形。"
      } },
      { tex: "6^4\\binom{12}{2}", correct: false, why: {
        en: "Picks one red and one blue first, then any 2 more: the same selection is counted several times.",
        fr: "Choisit d’abord une rouge et une bleue, puis 2 autres : une même sélection est comptée plusieurs fois.",
        es: "Elige primero una roja y una azul y luego 2 más: la misma selección se cuenta varias veces.",
        ja: "先に赤青1個ずつ選び、残り2個を選ぶと同じ選び方を重複して数える。",
        zh: "先各取一红一蓝再任取 2 个，同一种选法被重复计数。"
      } },
      { tex: "\\binom{20}{10}", correct: false, why: {
        en: "No restriction at all.",
        fr: "Sans aucune contrainte.",
        es: "Sin ninguna restricción.",
        ja: "制限なしの場合。",
        zh: "完全没有限制。"
      } }
    ],
    steps: [
      {
        title: {
          en: "One box",
          fr: "Une boîte",
          es: "Una caja",
          ja: "1つの箱",
          zh: "一个盒子"
        },
        lines: ["w(2)=3\\cdot2=6,\\quad w(3)=\\tbinom32\\cdot2+3\\cdot1=9,\\quad w(4)=2+3=5,\\quad w(5)=1"],
        note: {
          en: "$w(k)$ = ways to take $k$ balls with both colours from one box.",
          fr: "$w(k)$ = façons de prendre $k$ boules des deux couleurs dans une boîte.",
          es: "$w(k)$ = formas de tomar $k$ bolas con los dos colores de una caja.",
          ja: "$w(k)$ ＝ 1つの箱から両色を含めて $k$ 個取る方法の数。",
          zh: "$w(k)$ = 从一个盒子取 $k$ 个且两色都有的方法数。"
        }
      },
      {
        title: {
          en: "Possible splits",
          fr: "Répartitions possibles",
          es: "Repartos posibles",
          ja: "分け方",
          zh: "可能的分法"
        },
        lines: ["(4,2,2,2):\\ 4\\text{ orders},\\qquad(3,3,2,2):\\ \\tbinom42=6\\text{ orders}"],
        note: {
          en: "Each box needs at least 2 and at most 5, and the total is 10.",
          fr: "Chaque boîte donne entre 2 et 5, pour un total de 10.",
          es: "Cada caja da entre 2 y 5, con total 10.",
          ja: "各箱 2〜5 個で合計 10。",
          zh: "每盒 2 到 5 个，共 10 个。"
        }
      },
      {
        title: {
          en: "Add up",
          fr: "Additionner",
          es: "Sumar",
          ja: "合計",
          zh: "求和"
        },
        lines: ["4\\cdot5\\cdot6^3+6\\cdot9^2\\cdot6^2=4320+17496=\\boxed{21816}"],
        note: {
          en: "This is option (A) in the original paper.",
          fr: "C’est l’option (A) de l’épreuve originale.",
          es: "Es la opción (A) del examen original.",
          ja: "原題の選択肢 (A)。",
          zh: "即原题选项 (A)。"
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
