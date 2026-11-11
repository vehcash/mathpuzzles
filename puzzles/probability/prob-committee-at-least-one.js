/* probability · At least one woman
   “At least one”: count everything and subtract the committees with none. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-committee-at-least-one",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "amc"]
    },
    difficulty: 2,
    title: {
      en: "At least one woman",
      fr: "Au moins une femme",
      es: "Al menos una mujer",
      ja: "少なくとも1人は女性",
      zh: "至少一名女性"
    },
    statement: {
      en: "A committee of $3$ is chosen from $5$ men and $4$ women. <b>Which of the following equal the number of committees with at least one woman?</b>",
      fr: "On choisit un comité de $3$ personnes parmi $5$ hommes et $4$ femmes. <b>Lesquelles des valeurs suivantes sont égales au nombre de comités comprenant au moins une femme ?</b>",
      es: "Se elige un comité de $3$ personas entre $5$ hombres y $4$ mujeres. <b>¿Cuáles de los siguientes son iguales al número de comités con al menos una mujer?</b>",
      ja: "男性 $5$ 人と女性 $4$ 人から $3$ 人の委員を選びます。<b>次のうち、女性を少なくとも1人含む選び方の数に等しいものはどれですか？</b>",
      zh: "从 $5$ 名男性和 $4$ 名女性中选出 $3$ 人组成委员会。<b>下列哪些等于至少含一名女性的选法数？</b>"
    },
    figureText: {
      en: "Five blue dots for the men and four pink dots for the women, with three of the nine circled.",
      fr: "Cinq points bleus pour les hommes et quatre points roses pour les femmes, trois des neuf étant entourés.",
      es: "Cinco puntos azules para los hombres y cuatro rosas para las mujeres, con tres de los nueve rodeados.",
      ja: "男性を表す青い点5つと女性を表すピンクの点4つ。9人のうち3人が丸で囲まれています。",
      zh: "五个蓝点代表男性，四个粉点代表女性，九人中有三人被圈出。"
    },
    hint: {
      en: "Count all committees, then subtract those made only of men.",
      fr: "Comptez tous les comités, puis retirez ceux formés uniquement d’hommes.",
      es: "Cuenta todos los comités y resta los formados solo por hombres.",
      ja: "すべての選び方から、男性だけの選び方を引きます。",
      zh: "先数所有选法，再减去全是男性的选法。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example adding the cases with exactly 1, 2 and 3 women), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en additionnant les cas avec exactement 1, 2 et 3 femmes), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo sumando los casos con exactamente 1, 2 y 3 mujeres), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば女性がちょうど1人、2人、3人の場合を足す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把恰有 1、2、3 名女性的情况相加），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 2.2, scale: 50, pad: 18 });
      for (let k = 0; k < 5; k++) F.circle([0.5 + k * 0.6, 1.4], 0.2, 'fill-blue');
      for (let k = 0; k < 4; k++) F.circle([3.8 + k * 0.6, 1.4], 0.2, 'fill-pink');
      [1.1, 4.4, 5.0].forEach(x => F.circle([x, 1.4], 0.3, 'halo'));
      F.text([1.7, 0.5], '5', 'len', 0, 0); F.text([4.7, 0.5], '4', 'len', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "check:": { fr: "vérification :", es: "comprobación:", ja: "確認：", zh: "验证：" }
    },
    options: [
      { tex: "74", correct: true, why: {
        en: "$84 - 10$.",
        fr: "$84 - 10$.",
        es: "$84 - 10$.",
        ja: "$84 - 10$.",
        zh: "$84 - 10$."
      } },
      { tex: "\\binom93 - \\binom53", correct: true, why: {
        en: "All committees minus the all-male ones.",
        fr: "Tous les comités moins ceux formés d’hommes.",
        es: "Todos los comités menos los solo de hombres.",
        ja: "すべての選び方 − 男性だけの選び方。",
        zh: "所有选法减去全男性选法。"
      } },
      { tex: "84", correct: false, why: {
        en: "$\\binom93$: all committees, including all-male ones.",
        fr: "$\\binom93$ : tous les comités, y compris ceux sans femme.",
        es: "$\\binom93$: todos los comités, incluidos los solo de hombres.",
        ja: "$\\binom93$：男性だけのものも含む全体です。",
        zh: "$\\binom93$：所有选法，包括全男性的。"
      } },
      { tex: "112", correct: false, why: {
        en: "$4\\cdot\\binom82$: picks “the woman” first, so committees with two or three women are counted several times.",
        fr: "$4\\cdot\\binom82$ : compte plusieurs fois les comités à deux ou trois femmes.",
        es: "$4\\cdot\\binom82$: cuenta varias veces los comités con dos o tres mujeres.",
        ja: "$4\\cdot\\binom82$：女性が2人以上の選び方を重複して数えています。",
        zh: "$4\\cdot\\binom82$：含两三名女性的委员会被重复计数。"
      } },
      { tex: "40", correct: false, why: {
        en: "Exactly one woman: $4\\cdot\\binom52$.",
        fr: "Exactement une femme : $4\\cdot\\binom52$.",
        es: "Exactamente una mujer: $4\\cdot\\binom52$.",
        ja: "女性がちょうど1人：$4\\cdot\\binom52$。",
        zh: "恰有一名女性：$4\\cdot\\binom52$。"
      } },
      { tex: "30", correct: false, why: {
        en: "Exactly two women: $\\binom42\\cdot 5$.",
        fr: "Exactement deux femmes : $\\binom42\\cdot 5$.",
        es: "Exactamente dos mujeres: $\\binom42\\cdot 5$.",
        ja: "女性がちょうど2人：$\\binom42\\cdot 5$。",
        zh: "恰有两名女性：$\\binom42\\cdot 5$。"
      } },
      { tex: "10", correct: false, why: {
        en: "$\\binom53$: the all-male committees — the ones to remove.",
        fr: "$\\binom53$ : les comités sans femme, ceux qu’il faut retirer.",
        es: "$\\binom53$: los comités solo de hombres, los que hay que quitar.",
        ja: "$\\binom53$：引くべき男性だけの選び方です。",
        zh: "$\\binom53$：全男性的选法，正是要减去的。"
      } },
      { tex: "70", correct: false, why: {
        en: "Subtracted $\\binom43 = 4$… no: $84 - 14$ has no meaning here.",
        fr: "Soustraction erronée : $84 - 14$ n’a pas de sens ici.",
        es: "Resta errónea: $84 - 14$ no tiene sentido aquí.",
        ja: "誤った引き算：$84 - 14$ はここでは意味がありません。",
        zh: "减法错误：$84 - 14$ 在此无意义。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All committees",
          fr: "Tous les comités",
          es: "Todos los comités",
          ja: "すべての選び方",
          zh: "所有选法"
        },
        lines: ["\\binom93 = \\frac{9\\cdot8\\cdot7}{6} = 84"],
        note: {
          en: "Choose any $3$ of the $9$ people.",
          fr: "Choisir $3$ personnes parmi $9$.",
          es: "Elegir $3$ de las $9$ personas.",
          ja: "9人から3人を選びます。",
          zh: "从 $9$ 人中任选 $3$ 人。"
        }
      },
      {
        title: {
          en: "Remove the all-male ones",
          fr: "Retirer ceux sans femme",
          es: "Quitar los solo de hombres",
          ja: "男性だけの選び方を引く",
          zh: "去掉全男性的"
        },
        lines: ["\\binom53 = 10", "84 - 10 = \\boxed{74}", "\\text{check: } 40 + 30 + 4 = 74"],
        note: {
          en: "“At least one” is usually easiest through the complement.",
          fr: "« Au moins un » se traite souvent plus facilement par le complémentaire.",
          es: "«Al menos uno» suele ser más fácil por el complemento.",
          ja: "「少なくとも1つ」は余事象で考えると楽なことが多いです。",
          zh: "“至少一个”通常用补集最简单。"
        },
        fig(F) { [3.8, 4.4, 5.0, 5.6].forEach((x, k) => F.fadeIn(F.circle([x, 1.4], 0.26, 'halo', 'over'), 300, 120 * k)); }
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
