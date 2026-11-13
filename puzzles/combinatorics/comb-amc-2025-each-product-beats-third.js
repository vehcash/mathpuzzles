/* combinatorics · Each product beats the third number
   AMC 12A 2025 (Mathematical Association of America), Problem 18 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2025-each-product-beats-third",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 18",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 18",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 18",
        ja: "AMC 12A 2025（アメリカ数学協会）第18問",
        zh: "AMC 12A 2025（美国数学协会）第 18 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Each product beats the third number",
      fr: "Chaque produit dépasse le troisième nombre",
      es: "Cada producto supera al tercer número",
      ja: "どの積も残りの数より大きい",
      zh: "每个积都大于第三个数"
    },
    statement: {
      en: "<b>Which of the following equal the number of ordered triples $(x,y,z)$ of distinct integers from $1$ to $8$ with $xy>z$, $xz>y$ and $yz>x$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de triplets ordonnés $(x,y,z)$ d’entiers distincts de $1$ à $8$ avec $xy>z$, $xz>y$ et $yz>x$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de ternas ordenadas $(x,y,z)$ de enteros distintos de $1$ a $8$ con $xy>z$, $xz>y$ e $yz>x$?</b>",
      ja: "<b>$1$ から $8$ の相異なる整数の順序付き3つ組 $(x,y,z)$ で $xy>z$、$xz>y$、$yz>x$ を満たすものの個数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于由 $1$ 到 $8$ 中互不相同的整数组成、满足 $xy>z$、$xz>y$、$yz>x$ 的有序三元组 $(x,y,z)$ 的个数？</b>"
    },
    figureText: {
      en: "Three boxes x, y, z with arrows showing each pair's product compared with the third.",
      fr: "Trois cases x, y, z avec des flèches comparant chaque produit au troisième nombre.",
      es: "Tres cajas x, y, z con flechas que comparan cada producto con el tercer número.",
      ja: "x, y, z の箱と、各ペアの積と残りを比べる矢印。",
      zh: "x、y、z 三个框，箭头表示每对之积与第三个数比较。"
    },
    hint: {
      en: "The conditions are symmetric, so count sets $a<b<c$ and multiply by $6$. Only $ab>c$ can fail. What happens if $a=1$?",
      fr: "Les conditions sont symétriques : comptez les ensembles $a<b<c$ puis multipliez par $6$. Seule $ab>c$ peut échouer. Que se passe-t-il si $a=1$ ?",
      es: "Las condiciones son simétricas: cuenta conjuntos $a<b<c$ y multiplica por $6$. Solo puede fallar $ab>c$. ¿Qué pasa si $a=1$?",
      ja: "条件は対称なので $a<b<c$ を数えて $6$ 倍。破れうるのは $ab>c$ だけ。$a=1$ なら？",
      zh: "条件对称：数 $a<b<c$ 的集合再乘 $6$。只有 $ab>c$ 可能不成立。$a=1$ 时呢？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.6, scale: 52, pad: 16 });
      ['x', 'y', 'z'].forEach((t, k) => { F.rect(0.5 + k * 1.6, 0.4, 0.8, 0.8, 'fill-blue', 'fills'); F.text([0.9 + k * 1.6, 0.8], t, 'pt', 0, 0); });
      F.reveal = () => {
      F.text([2.5, 1.45], '31 × 6', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "31 × 6": {"fr": "31 × 6", "es": "31 × 6", "ja": "31 × 6", "zh": "31 × 6"},
      "always": {"fr": "toujours", "es": "siempre", "ja": "常に成立", "zh": "恒成立"},
      "need": {"fr": "il faut", "es": "hace falta", "ja": "必要なのは", "zh": "需要"},
      "so": {"fr": "donc", "es": "así que", "ja": "よって", "zh": "故"}
    },
    options: [
      { tex: "186", correct: true, why: {
        en: "$31\\cdot3!$",
        fr: "$31\\cdot3!$",
        es: "$31\\cdot3!$",
        ja: "$31\\cdot3!$",
        zh: "$31\\cdot3!$"
      } },
      { tex: "6\\cdot31", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "36", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "84", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "336", correct: false, why: {
        en: "That is every ordered triple of distinct numbers.",
        fr: "C’est le nombre de tous les triplets de nombres distincts.",
        es: "Es el total de ternas de números distintos.",
        ja: "相異なる3つ組すべての数。",
        zh: "那是所有互异有序三元组的个数。"
      } },
      { tex: "486", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "31", correct: false, why: {
        en: "That counts unordered sets only.",
        fr: "Cela ne compte que les ensembles non ordonnés.",
        es: "Solo cuenta conjuntos sin orden.",
        ja: "順序なしの集合だけ数えている。",
        zh: "只数了无序集合。"
      } },
      { tex: "192", correct: false, why: {
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
          en: "Sorted sets",
          fr: "Ensembles triés",
          es: "Conjuntos ordenados",
          ja: "小さい順の組",
          zh: "排序后的集合"
        },
        lines: ["a<b<c:\\ ac>b,\\ bc>a\\ \\text{always};\\ \\text{need}\\ ab>c,\\ \\text{so}\\ a\\ge2"],
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
        lines: ["\\#\\{a<b<c\\le8:\\ ab>c,\\ a\\ge2\\}=31,\\quad 31\\cdot6=186"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
