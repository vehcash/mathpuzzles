/* combinatorics · Rearranging BANANA
   Permutations with repeated letters: 6! / (3! 2!). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-banana-anagrams",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Rearranging BANANA",
      fr: "Réarranger BANANA",
      es: "Reordenar BANANA",
      ja: "BANANA の並べ替え",
      zh: "重排 BANANA"
    },
    statement: {
      en: "<b>Which of the following equal the number of different arrangements of the letters of BANANA?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre d’arrangements différents des lettres de BANANA ?</b>",
      es: "<b>¿Cuáles de los siguientes son iguales al número de ordenaciones distintas de las letras de BANANA?</b>",
      ja: "<b>次のうち BANANA の文字の異なる並べ方の数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 BANANA 各字母不同排列的个数？</b>"
    },
    figureText: {
      en: "Six letter tiles B, A, N, A, N, A; the three A tiles and the two N tiles are coloured alike.",
      fr: "Six tuiles B, A, N, A, N, A ; les trois A et les deux N ont la même couleur.",
      es: "Seis fichas B, A, N, A, N, A; las tres A y las dos N tienen el mismo color.",
      ja: "6枚の文字タイル B、A、N、A、N、A。3枚の A と2枚の N は同じ色です。",
      zh: "六块字母牌 B、A、N、A、N、A；三个 A 同色，两个 N 同色。"
    },
    hint: {
      en: "$6!$ counts the letters as different; divide by the swaps of the identical A’s and N’s.",
      fr: "$6!$ compte les lettres comme distinctes ; divisez par les permutations des A et des N identiques.",
      es: "$6!$ cuenta las letras como distintas; divide por los intercambios de las A y N iguales.",
      ja: "$6!$ は文字を区別しています。同じ A と N の入れ替えの数で割ります。",
      zh: "$6!$ 把字母看成不同；再除以相同的 A、N 的互换数。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example choosing the positions of the A’s, then of the N’s), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en choisissant les places des A, puis celles des N), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo eligiendo las posiciones de las A y luego de las N), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば A の位置を選び、次に N の位置を選ぶ）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如先选 A 的位置，再选 N 的位置），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.6, scale: 50, pad: 14 });
      ['B', 'A', 'N', 'A', 'N', 'A'].forEach((c, k) => { F.rect(0.2 + k * 1.05, 0.2, 0.9, 1.2, c === 'A' ? 'fill-yellow' : c === 'N' ? 'fill-blue' : 'fill-pink', 'fills'); F.rect(0.2 + k * 1.05, 0.2, 0.9, 1.2, 'tri'); F.text([0.65 + k * 1.05, 0.8], c, 'nodenum', 0, 1); });
      return F;
    },
    options: [
      { tex: "60", correct: true, why: {
        en: "$\\tfrac{720}{6\\cdot2}$.",
        fr: "$\\tfrac{720}{6\\cdot2}$.",
        es: "$\\tfrac{720}{6\\cdot2}$.",
        ja: "$\\tfrac{720}{6\\cdot2}$.",
        zh: "$\\tfrac{720}{6\\cdot2}$."
      } },
      { tex: "\\dfrac{6!}{3!\\,2!}", correct: true, why: {
        en: "The formula itself.",
        fr: "La formule elle-même.",
        es: "La fórmula misma.",
        ja: "公式そのもの。",
        zh: "公式本身。"
      } },
      { tex: "720", correct: false, why: {
        en: "$6!$ treats the three A’s as different letters.",
        fr: "$6!$ traite les trois A comme des lettres différentes.",
        es: "$6!$ trata las tres A como letras distintas.",
        ja: "$6!$ は3つの A を区別しています。",
        zh: "$6!$ 把三个 A 当成不同字母。"
      } },
      { tex: "120", correct: false, why: {
        en: "$6!/3!$ — the two N’s are still counted as different.",
        fr: "$6!/3!$ — les deux N restent distincts.",
        es: "$6!/3!$ — las dos N siguen contándose distintas.",
        ja: "$6!/3!$ — 2つの N をまだ区別しています。",
        zh: "$6!/3!$ —— 两个 N 仍被当作不同。"
      } },
      { tex: "360", correct: false, why: {
        en: "$6!/2!$ — forgets the repeated A’s.",
        fr: "$6!/2!$ — oublie les A répétés.",
        es: "$6!/2!$ — olvida las A repetidas.",
        ja: "$6!/2!$ — A の重複を忘れています。",
        zh: "$6!/2!$ —— 漏了 A 的重复。"
      } },
      { tex: "20", correct: false, why: {
        en: "$\\binom63$: places the A’s but not the N’s.",
        fr: "$\\binom63$ : place les A mais pas les N.",
        es: "$\\binom63$: coloca las A pero no las N.",
        ja: "$\\binom63$：A の位置だけで N を考えていません。",
        zh: "$\\binom63$：只安排了 A 的位置。"
      } },
      { tex: "30", correct: false, why: {
        en: "Half of the answer: divided by $2$ once too often.",
        fr: "La moitié de la réponse : une division par $2$ en trop.",
        es: "La mitad: dividió entre $2$ una vez de más.",
        ja: "答えの半分：$2$ で余分に割っています。",
        zh: "答案的一半：多除了一次 $2$。"
      } },
      { tex: "10", correct: false, why: {
        en: "Only $\\binom53$ ways for the A’s among the last five letters.",
        fr: "Seulement $\\binom53$ façons pour les A.",
        es: "Solo $\\binom53$ formas para las A.",
        ja: "A の置き方 $\\binom53$ だけです。",
        zh: "只是 $\\binom53$ 种 A 的放法。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Treat all letters as different",
          fr: "Traiter les lettres comme distinctes",
          es: "Tratar las letras como distintas",
          ja: "全部の文字を区別する",
          zh: "先把字母都看成不同"
        },
        lines: ["6! = 720"],
        note: {
          en: "Then each real arrangement is counted many times.",
          fr: "Chaque arrangement réel est alors compté plusieurs fois.",
          es: "Así cada ordenación real se cuenta varias veces.",
          ja: "すると本当の並べ方を何度も数えています。",
          zh: "这样每种真正的排列被重复计数。"
        }
      },
      {
        title: {
          en: "Divide out the repeats",
          fr: "Diviser par les répétitions",
          es: "Dividir por las repeticiones",
          ja: "重複で割る",
          zh: "除以重复"
        },
        lines: ["\\frac{6!}{3!\\,2!} = \\frac{720}{12} = \\boxed{60}"],
        note: {
          en: "$3!$ ways to shuffle the A’s and $2!$ to shuffle the N’s give the same word.",
          fr: "$3!$ façons de permuter les A et $2!$ les N donnent le même mot.",
          es: "$3!$ formas de mover las A y $2!$ las N dan la misma palabra.",
          ja: "A の入れ替え $3!$ 通りと N の入れ替え $2!$ 通りは同じ語になります。",
          zh: "A 的 $3!$ 种互换与 N 的 $2!$ 种互换得到同一个词。"
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
