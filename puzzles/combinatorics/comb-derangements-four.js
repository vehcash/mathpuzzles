/* combinatorics · Every letter in the wrong envelope
   Derangements of 4 objects: D₄ = 4!(1 − 1 + 1/2 − 1/6 + 1/24) = 9. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-derangements-four",
    category: "combinatorics",
    difficulty: 2,
    title: {
      en: "Every letter in the wrong envelope",
      fr: "Chaque lettre dans la mauvaise enveloppe",
      es: "Cada carta en el sobre equivocado",
      ja: "全部の手紙が違う封筒に",
      zh: "每封信都装错"
    },
    statement: {
      en: "Four letters are put into four addressed envelopes, one per envelope. <b>In how many ways can every letter end up in a wrong envelope?</b>",
      fr: "On met quatre lettres dans quatre enveloppes adressées, une par enveloppe. <b>De combien de façons chaque lettre peut-elle se retrouver dans une mauvaise enveloppe ?</b>",
      es: "Se meten cuatro cartas en cuatro sobres con dirección, una por sobre. <b>¿De cuántas formas puede acabar cada carta en un sobre equivocado?</b>",
      ja: "4通の手紙を宛名つきの4枚の封筒に1通ずつ入れます。<b>すべての手紙が違う封筒に入る入れ方は何通りですか？</b>",
      zh: "把四封信装进四个写好地址的信封，每个信封一封。<b>每封信都装错的方法有多少种？</b>"
    },
    figureText: {
      en: "Four letters 1, 2, 3, 4 above four envelopes 1, 2, 3, 4, with arrows of one arrangement where no letter goes to its own envelope.",
      fr: "Quatre lettres 1, 2, 3, 4 au-dessus de quatre enveloppes 1, 2, 3, 4, avec les flèches d’un arrangement où aucune lettre ne va dans sa propre enveloppe.",
      es: "Cuatro cartas 1, 2, 3, 4 sobre cuatro sobres 1, 2, 3, 4, con las flechas de una disposición en la que ninguna carta va a su sobre.",
      ja: "手紙 1〜4 と封筒 1〜4。どの手紙も自分の封筒に入らない入れ方の1例が矢印で示されています。",
      zh: "信 1、2、3、4 在信封 1、2、3、4 上方，箭头表示一种没有信装进自己信封的方法。"
    },
    hint: {
      en: "Inclusion–exclusion: $4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!$.",
      fr: "Inclusion–exclusion : $4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!$.",
      es: "Inclusión–exclusión: $4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!$.",
      ja: "包除原理：$4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!$。",
      zh: "容斥原理：$4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example listing where letter 1 goes and counting case by case, or the recurrence Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en distinguant où va la lettre 1, ou la récurrence Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo distinguiendo a dónde va la carta 1, o la recurrencia Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば手紙1の行き先で場合分けする、または漸化式 Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如按信 1 的去向分类，或用递推 Dₙ = (n − 1)(Dₙ₋₁ + Dₙ₋₂)），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 2.6, scale: 56, pad: 14 });
      F.arrowDefs();
      const to = [1, 0, 3, 2];
      for (let k = 0; k < 4; k++) { F.rect(0.3 + k * 1.2, 1.7, 0.8, 0.7, 'fill-yellow', 'fills'); F.text([0.7 + k * 1.2, 2.05], String(k + 1), 'nodenum', 0, 1); F.rect(0.3 + k * 1.2, 0.1, 0.8, 0.6, 'tri'); F.text([0.7 + k * 1.2, 0.4], String(k + 1), 'mx', 0, 1); }
      to.forEach((j, k) => { const e = F.seg([0.7 + k * 1.2, 1.65], [0.7 + j * 1.2, 0.8], 'vec'); e.setAttribute('marker-end', 'url(#arrowhead)'); });
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "two swaps:": { fr: "deux échanges :", es: "dos intercambios:", ja: "2組の入れ替え：", zh: "两组互换：" },
      "4-cycles:": { fr: "cycles de 4 :", es: "ciclos de 4:", ja: "4サイクル：", zh: "四元轮换：" }
    },
    options: [
      { tex: "9", correct: true, why: {
        en: "$24 - 24 + 12 - 4 + 1$.",
        fr: "$24 - 24 + 12 - 4 + 1$.",
        es: "$24 - 24 + 12 - 4 + 1$.",
        ja: "$24 - 24 + 12 - 4 + 1$.",
        zh: "$24 - 24 + 12 - 4 + 1$."
      } },
      { tex: "24", correct: false, why: {
        en: "$4!$: all arrangements, including correct letters.",
        fr: "$4!$ : tous les arrangements, y compris les bons.",
        es: "$4!$: todas las disposiciones, incluidas las correctas.",
        ja: "$4!$：正しく入る場合も含めた全部。",
        zh: "$4!$：所有放法，包括装对的。"
      } },
      { tex: "23", correct: false, why: {
        en: "$4! - 1$ removes only the all-correct arrangement.",
        fr: "$4! - 1$ ne retire que l’arrangement tout juste.",
        es: "$4! - 1$ solo quita la disposición toda correcta.",
        ja: "$4! - 1$ は全部正しい場合しか除いていません。",
        zh: "$4! - 1$ 只去掉了全对的情况。"
      } },
      { tex: "8", correct: false, why: {
        en: "Misses the pairs-of-swaps cases such as $(2\\,1\\,4\\,3)$.",
        fr: "Oublie des cas comme $(2\\,1\\,4\\,3)$.",
        es: "Olvida casos como $(2\\,1\\,4\\,3)$.",
        ja: "$(2\\,1\\,4\\,3)$ のような場合を落としています。",
        zh: "漏了像 $(2\\,1\\,4\\,3)$ 这样的情况。"
      } },
      { tex: "6", correct: false, why: {
        en: "Counts only the $4$-cycles; the three double swaps are missing.",
        fr: "Ne compte que les cycles de longueur 4 ; il manque les trois doubles échanges.",
        es: "Solo cuenta los ciclos de 4; faltan los tres dobles intercambios.",
        ja: "4サイクルだけで、2組の入れ替え3通りが抜けています。",
        zh: "只数了四元轮换，漏了三种两两互换。"
      } },
      { tex: "12", correct: false, why: {
        en: "$\\binom42\\cdot2!$ is just one term of the sum.",
        fr: "$\\binom42\\cdot2!$ n’est qu’un terme de la somme.",
        es: "$\\binom42\\cdot2!$ es solo un término de la suma.",
        ja: "$\\binom42\\cdot2!$ は和の1項にすぎません。",
        zh: "$\\binom42\\cdot2!$ 只是求和中的一项。"
      } },
      { tex: "15", correct: false, why: {
        en: "$24 - 9$: arrangements with at least one correct letter.",
        fr: "$24 - 9$ : au moins une lettre bien placée.",
        es: "$24 - 9$: al menos una carta en su sobre.",
        ja: "$24 - 9$：少なくとも1通が正しい場合。",
        zh: "$24 - 9$：至少一封装对的情况。"
      } },
      { tex: "3", correct: false, why: {
        en: "Only the three pairs-of-swaps; the $4$-cycles add $6$ more.",
        fr: "Seulement les trois doubles échanges ; les cycles de longueur 4 en ajoutent $6$.",
        es: "Solo los tres dobles intercambios; los ciclos de 4 añaden $6$.",
        ja: "2組の入れ替え3通りだけ。4サイクルの $6$ 通りもあります。",
        zh: "只算了三种两两互换；四元轮换还有 $6$ 种。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Inclusion–exclusion",
          fr: "Inclusion–exclusion",
          es: "Inclusión–exclusión",
          ja: "包除原理",
          zh: "容斥原理"
        },
        lines: ["D_4 = 4! - \\binom41 3! + \\binom42 2! - \\binom43 1! + \\binom44 0!", "= 24 - 24 + 12 - 4 + 1 = \\boxed{9}"],
        note: {
          en: "Subtract arrangements fixing a letter, add back those fixing two, and so on.",
          fr: "On retire les arrangements fixant une lettre, on rajoute ceux qui en fixent deux, etc.",
          es: "Se restan las disposiciones que fijan una carta, se suman las que fijan dos, etc.",
          ja: "1通が正しい場合を引き、2通が正しい場合を足し戻し…と続けます。",
          zh: "减去固定一封的，加回固定两封的，依此类推。"
        }
      },
      {
        title: {
          en: "Check by types",
          fr: "Vérifier par types",
          es: "Comprobar por tipos",
          ja: "型で確認",
          zh: "按类型验证"
        },
        lines: ["\\text{two swaps: } 3, \\qquad \\text{4-cycles: } 3! = 6, \\qquad 3 + 6 = 9\\ \\checkmark"],
        note: {
          en: "A derangement of 4 is either two swaps or one cycle of length 4.",
          fr: "Un dérangement de 4 est soit deux échanges, soit un cycle de longueur 4.",
          es: "Un desarreglo de 4 es o dos intercambios o un ciclo de longitud 4.",
          ja: "4個の完全順列は「2組の入れ替え」か「長さ4の巡回」です。",
          zh: "4 个元素的错排要么是两组互换，要么是一个四元轮换。"
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
