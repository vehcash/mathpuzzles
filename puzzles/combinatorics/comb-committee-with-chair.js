/* combinatorics · A committee with a chair
   Choose a committee of 4 from 10 and a chair among them: C(10, 4)·4 = 10·C(9, 3). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-committee-with-chair",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "amc"]
    },
    difficulty: 2,
    title: {
      en: "A committee with a chair",
      fr: "Un comité avec un président",
      es: "Un comité con presidente",
      ja: "委員長のいる委員会",
      zh: "带主席的委员会"
    },
    statement: {
      en: "From $10$ people we choose a committee of $4$ and then one of the $4$ as chair. <b>Which of the following equal the number of possibilities?</b>",
      fr: "Parmi $10$ personnes on choisit un comité de $4$, puis l’un des $4$ comme président. <b>Lesquelles des valeurs suivantes sont égales au nombre de possibilités ?</b>",
      es: "De $10$ personas elegimos un comité de $4$ y luego a uno de los $4$ como presidente. <b>¿Cuáles de los siguientes son iguales al número de posibilidades?</b>",
      ja: "$10$ 人から $4$ 人の委員会を選び、その中から委員長を1人選びます。<b>次のうち選び方の数に等しいものはどれですか？</b>",
      zh: "从 $10$ 人中选出 $4$ 人的委员会，再从这 $4$ 人中选一人当主席。<b>下列哪些等于可能的方案数？</b>"
    },
    figureText: {
      en: "Ten people; four of them form the committee and one of the four wears a crown as chair.",
      fr: "Dix personnes ; quatre forment le comité et l’une d’elles porte une couronne de président.",
      es: "Diez personas; cuatro forman el comité y una de ellas lleva corona de presidente.",
      ja: "10人のうち4人が委員会で、そのうち1人が委員長の冠をかぶっています。",
      zh: "十个人中四人组成委员会，其中一人戴着主席的王冠。"
    },
    hint: {
      en: "Either committee first, then chair — or chair first, then the other three.",
      fr: "Soit le comité puis le président, soit le président puis les trois autres.",
      es: "O primero el comité y luego el presidente, o primero el presidente y luego los otros tres.",
      ja: "委員会→委員長の順でも、委員長→残り3人の順でも数えられます。",
      zh: "先选委员会再选主席，或者先选主席再选其余三人。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example choosing the chair first and then the other three members), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en choisissant d’abord le président puis les trois autres membres), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo eligiendo primero al presidente y luego a los otros tres), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば先に委員長を選び、次に残りの3人を選ぶ）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如先选主席，再选其余三名成员），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.8, scale: 50, pad: 12 });
      for (let k = 0; k < 10; k++) { const inC = k < 4; F.circle([0.35 + k * 0.63, 0.7], 0.24, inC ? 'fill-yellow' : 'fill-blue'); }
      F.text([0.35, 0.7], '♛', 'pt', 0, -22);
      F.seg([0.05, 0.3], [2.25, 0.3], 'hl pink');
      return F;
    },
    options: [
      { tex: "840", correct: true, why: {
        en: "$210\\cdot4$.",
        fr: "$210\\cdot4$.",
        es: "$210\\cdot4$.",
        ja: "$210\\cdot4$.",
        zh: "$210\\cdot4$."
      } },
      { tex: "10\\binom93", correct: true, why: {
        en: "Chair first ($10$ ways), then $3$ more from the remaining $9$.",
        fr: "D’abord le président ($10$ façons), puis $3$ parmi les $9$ restants.",
        es: "Primero el presidente ($10$ formas), luego $3$ de los $9$ restantes.",
        ja: "先に委員長（$10$ 通り）、残り $9$ 人から $3$ 人。",
        zh: "先选主席（$10$ 种），再从剩下 $9$ 人中选 $3$ 人。"
      } },
      { tex: "210", correct: false, why: {
        en: "$\\binom{10}{4}$: the chair was not chosen.",
        fr: "$\\binom{10}{4}$ : le président n’a pas été choisi.",
        es: "$\\binom{10}{4}$: no se eligió presidente.",
        ja: "$\\binom{10}{4}$：委員長を選んでいません。",
        zh: "$\\binom{10}{4}$：没有选主席。"
      } },
      { tex: "5040", correct: false, why: {
        en: "$10\\cdot9\\cdot8\\cdot7$ gives the four members an order, not just a chair.",
        fr: "$10\\cdot9\\cdot8\\cdot7$ ordonne les quatre membres.",
        es: "$10\\cdot9\\cdot8\\cdot7$ ordena a los cuatro miembros.",
        ja: "$10\\cdot9\\cdot8\\cdot7$ は4人全員に順位をつけています。",
        zh: "$10\\cdot9\\cdot8\\cdot7$ 给四人都排了序。"
      } },
      { tex: "2520", correct: false, why: {
        en: "Gives two of the members special roles.",
        fr: "Donne un rôle particulier à deux membres.",
        es: "Da un papel especial a dos miembros.",
        ja: "2人に特別な役割を与えています。",
        zh: "给了两名成员特殊角色。"
      } },
      { tex: "120", correct: false, why: {
        en: "$\\binom{10}{3}$ chooses only three people.",
        fr: "$\\binom{10}{3}$ ne choisit que trois personnes.",
        es: "$\\binom{10}{3}$ elige solo tres personas.",
        ja: "$\\binom{10}{3}$ は3人しか選んでいません。",
        zh: "$\\binom{10}{3}$ 只选了三人。"
      } },
      { tex: "1260", correct: false, why: {
        en: "$10\\cdot\\binom94$: the chair plus four more makes five people.",
        fr: "$10\\cdot\\binom94$ : président plus quatre, cela fait cinq.",
        es: "$10\\cdot\\binom94$: presidente más cuatro son cinco.",
        ja: "$10\\cdot\\binom94$：委員長＋4人で5人になります。",
        zh: "$10\\cdot\\binom94$：主席加四人共五人。"
      } },
      { tex: "84", correct: false, why: {
        en: "$\\binom93$: forgets the $10$ choices of chair.",
        fr: "$\\binom93$ : oublie les $10$ choix du président.",
        es: "$\\binom93$: olvida las $10$ opciones de presidente.",
        ja: "$\\binom93$：委員長の選び方 $10$ 通りを忘れています。",
        zh: "$\\binom93$：漏了主席的 $10$ 种选法。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Committee, then chair",
          fr: "Comité, puis président",
          es: "Comité, luego presidente",
          ja: "委員会→委員長",
          zh: "先委员会后主席"
        },
        lines: ["\\binom{10}{4}\\cdot 4 = 210\\cdot4 = \\boxed{840}"],
        note: {
          en: "Any of the $4$ members can be chair.",
          fr: "N’importe lequel des $4$ membres peut présider.",
          es: "Cualquiera de los $4$ miembros puede presidir.",
          ja: "$4$ 人の誰でも委員長になれます。",
          zh: "$4$ 名成员都可当主席。"
        }
      },
      {
        title: {
          en: "Chair, then the rest",
          fr: "Président, puis les autres",
          es: "Presidente, luego el resto",
          ja: "委員長→残り",
          zh: "先主席后其余"
        },
        lines: ["10\\cdot\\binom93 = 10\\cdot84 = 840\\ \\checkmark"],
        note: {
          en: "Two ways of counting the same choices give the identity $4\\binom{10}{4} = 10\\binom93$.",
          fr: "Deux façons de compter les mêmes choix donnent $4\\binom{10}{4} = 10\\binom93$.",
          es: "Dos formas de contar lo mismo dan $4\\binom{10}{4} = 10\\binom93$.",
          ja: "同じものを2通りに数えると $4\\binom{10}{4} = 10\\binom93$。",
          zh: "同一事物的两种数法给出 $4\\binom{10}{4} = 10\\binom93$。"
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
