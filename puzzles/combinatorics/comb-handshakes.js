/* combinatorics · Everybody shakes hands
   Each handshake is an unordered pair: C(10, 2). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const P = k => [2 + 1.7 * Math.cos(2 * Math.PI * k / 10 + Math.PI / 2), 2 + 1.7 * Math.sin(2 * Math.PI * k / 10 + Math.PI / 2)];

  PuzzleBank.define({
    id: "comb-handshakes",
    category: "combinatorics",
    difficulty: 1,
    title: {
      en: "Everybody shakes hands",
      fr: "Tout le monde se serre la main",
      es: "Todos se dan la mano",
      ja: "全員と握手",
      zh: "人人握手"
    },
    statement: {
      en: "At a party of $10$ people, everyone shakes hands once with everyone else. <b>Which of the following equal the number of handshakes?</b>",
      fr: "À une fête de $10$ personnes, chacun serre une fois la main de tous les autres. <b>Lesquelles des valeurs suivantes sont égales au nombre de poignées de main ?</b>",
      es: "En una fiesta de $10$ personas, cada una da la mano una vez a todas las demás. <b>¿Cuáles de los siguientes son iguales al número de apretones de manos?</b>",
      ja: "$10$ 人のパーティーで、全員がほかの全員と1回ずつ握手します。<b>次のうち握手の回数に等しいものはどれですか？</b>",
      zh: "$10$ 人的聚会上，每人与其他每人各握手一次。<b>下列哪些等于握手的总次数？</b>"
    },
    figureText: {
      en: "Ten dots on a circle, every pair joined by a line: 45 segments.",
      fr: "Dix points sur un cercle, chaque paire reliée par un segment : 45 segments.",
      es: "Diez puntos en una circunferencia, cada par unido por un segmento: 45 segmentos.",
      ja: "円周上の10個の点。すべての2点を線で結ぶと 45 本。",
      zh: "圆上十个点，每两点连一条线：共 45 条。"
    },
    hint: {
      en: "A handshake is a pair of people; order does not matter.",
      fr: "Une poignée de main est une paire de personnes ; l’ordre ne compte pas.",
      es: "Un apretón es un par de personas; el orden no importa.",
      ja: "握手は2人の組で、順序は関係ありません。",
      zh: "一次握手就是两人一组，与顺序无关。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example adding 9 + 8 + … + 1), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en additionnant 9 + 8 + … + 1), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo sumando 9 + 8 + … + 1), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 9 + 8 + … + 1 を足す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如计算 9 + 8 + … + 1），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4, h: 4, scale: 60, pad: 14 });
      for (let i = 0; i < 10; i++) for (let j = i + 1; j < 10; j++) F.seg(P(i), P(j), 'seg thin');
      for (let k = 0; k < 10; k++) F.dot(P(k));
      return F;
    },
    options: [
      { tex: "45", correct: true, why: {
        en: "$\\tfrac{10\\cdot9}{2}$.",
        fr: "$\\tfrac{10\\cdot9}{2}$.",
        es: "$\\tfrac{10\\cdot9}{2}$.",
        ja: "$\\tfrac{10\\cdot9}{2}$.",
        zh: "$\\tfrac{10\\cdot9}{2}$."
      } },
      { tex: "\\binom{10}{2}", correct: true, why: {
        en: "Choose the two people.",
        fr: "Choisir les deux personnes.",
        es: "Elegir las dos personas.",
        ja: "2人を選ぶ。",
        zh: "选出两个人。"
      } },
      { tex: "90", correct: false, why: {
        en: "$10\\cdot9$ counts each handshake twice (A–B and B–A).",
        fr: "$10\\cdot9$ compte chaque poignée deux fois.",
        es: "$10\\cdot9$ cuenta cada apretón dos veces.",
        ja: "$10\\cdot9$ は各握手を2回数えています。",
        zh: "$10\\cdot9$ 把每次握手算了两次。"
      } },
      { tex: "100", correct: false, why: {
        en: "$10^2$ includes shaking your own hand and order.",
        fr: "$10^2$ compte l’ordre et sa propre main.",
        es: "$10^2$ cuenta el orden y la propia mano.",
        ja: "$10^2$ は自分との握手や順序まで数えています。",
        zh: "$10^2$ 包括了与自己握手且考虑顺序。"
      } },
      { tex: "55", correct: false, why: {
        en: "$\\binom{11}{2}$: one person too many.",
        fr: "$\\binom{11}{2}$: one person too many.",
        es: "$\\binom{11}{2}$: one person too many.",
        ja: "$\\binom{11}{2}$: one person too many.",
        zh: "$\\binom{11}{2}$: one person too many."
      } },
      { tex: "36", correct: false, why: {
        en: "$\\binom92$: one person too few.",
        fr: "$\\binom92$: one person too few.",
        es: "$\\binom92$: one person too few.",
        ja: "$\\binom92$: one person too few.",
        zh: "$\\binom92$: one person too few."
      } },
      { tex: "50", correct: false, why: {
        en: "$10\\cdot5$ is not a meaningful count here.",
        fr: "$10\\cdot5$ n’a pas de sens ici.",
        es: "$10\\cdot5$ no tiene sentido aquí.",
        ja: "$10\\cdot5$ はここでは意味がありません。",
        zh: "$10\\cdot5$ 在这里没有意义。"
      } },
      { tex: "10", correct: false, why: {
        en: "One handshake per person is not enough.",
        fr: "Une poignée par personne ne suffit pas.",
        es: "Un apretón por persona no basta.",
        ja: "1人1回では足りません。",
        zh: "每人一次远远不够。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count ordered pairs",
          fr: "Compter les couples ordonnés",
          es: "Contar pares ordenados",
          ja: "順序つきの組を数える",
          zh: "数有序对"
        },
        lines: ["10\\cdot 9 = 90"],
        note: {
          en: "Each person shakes $9$ hands.",
          fr: "Chacun serre $9$ mains.",
          es: "Cada uno da $9$ apretones.",
          ja: "各人が $9$ 回握手します。",
          zh: "每人握 $9$ 次手。"
        }
      },
      {
        title: {
          en: "Each handshake was counted twice",
          fr: "Chaque poignée a été comptée deux fois",
          es: "Cada apretón se contó dos veces",
          ja: "各握手を2回数えた",
          zh: "每次握手被算了两次"
        },
        lines: ["\\frac{90}{2} = \\binom{10}{2} = \\boxed{45}"],
        note: {
          en: "Same as the number of segments joining 10 points.",
          fr: "Autant que de segments joignant 10 points.",
          es: "Igual que los segmentos que unen 10 puntos.",
          ja: "10点を結ぶ線分の数と同じです。",
          zh: "与连接 10 个点的线段数相同。"
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
