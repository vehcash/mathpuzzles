/* probability · At least one boy
   Conditional probability: knowing “at least one boy” leaves three equally likely families. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-two-children-boy",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "classic",
      note: {
        en: "Martin Gardner’s “boy or girl” paradox, <i>Scientific American</i> (1959).",
        fr: "Le paradoxe « garçon ou fille » de Martin Gardner, <i>Scientific American</i> (1959).",
        es: "La paradoja «niño o niña» de Martin Gardner, <i>Scientific American</i> (1959).",
        ja: "マーティン・ガードナーの「男の子か女の子か」のパラドックス（『サイエンティフィック・アメリカン』1959年）。",
        zh: "马丁·加德纳的“男孩还是女孩”悖论（《科学美国人》，1959年）。"
      },
      exams: []
    },
    difficulty: 2,
    title: {
      en: "At least one boy",
      fr: "Au moins un garçon",
      es: "Al menos un niño",
      ja: "少なくとも1人は男の子",
      zh: "至少有一个男孩"
    },
    statement: {
      en: "A family has two children; each child is a boy or a girl with probability $\\tfrac12$, independently. You learn that <b>at least one is a boy</b>. <b>What is the probability that both are boys?</b>",
      fr: "Une famille a deux enfants ; chacun est un garçon ou une fille avec probabilité $\\tfrac12$, indépendamment. On apprend qu’<b>au moins un est un garçon</b>. <b>Quelle est la probabilité que les deux soient des garçons ?</b>",
      es: "Una familia tiene dos hijos; cada uno es niño o niña con probabilidad $\\tfrac12$, de forma independiente. Sabes que <b>al menos uno es niño</b>. <b>¿Cuál es la probabilidad de que los dos sean niños?</b>",
      ja: "ある家族に子どもが2人います。それぞれ独立に確率 $\\tfrac12$ で男の子か女の子です。<b>少なくとも1人は男の子</b>だとわかりました。<b>2人とも男の子である確率はいくらですか？</b>",
      zh: "一个家庭有两个孩子，每个孩子是男孩或女孩的概率都是 $\\tfrac12$，相互独立。已知<b>至少有一个是男孩</b>。<b>两个都是男孩的概率是多少？</b>"
    },
    figureText: {
      en: "A 2 × 2 table of the four equally likely families BB, BG, GB, GG; the GG cell is crossed out by the information.",
      fr: "Un tableau 2 × 2 des quatre familles équiprobables GG, GF, FG, FF (G = garçon) ; la case FF est barrée par l’information.",
      es: "Una tabla 2 × 2 de las cuatro familias equiprobables NN, NA, AN, AA (N = niño); la casilla AA queda tachada por la información.",
      ja: "同様に確からしい4通り BB、BG、GB、GG（B = 男の子）の 2 × 2 の表。情報により GG のマスが消されています。",
      zh: "四种等可能情况 BB、BG、GB、GG（B = 男孩）的 2 × 2 表格；已知条件把 GG 一格划掉。"
    },
    hint: {
      en: "List the four equally likely families and remove the one ruled out.",
      fr: "Listez les quatre familles équiprobables et retirez celle qui est exclue.",
      es: "Enumera las cuatro familias equiprobables y quita la que queda descartada.",
      ja: "同様に確からしい4通りを書き出し、除外されるものを消します。",
      zh: "列出四种等可能的情况，去掉被排除的一种。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the formula P(A | B) = P(A ∩ B) / P(B)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple la formule P(A | B) = P(A ∩ B) / P(B)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo la fórmula P(A | B) = P(A ∩ B) / P(B)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば公式 P(A | B) = P(A ∩ B) / P(B) を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如公式 P(A | B) = P(A ∩ B) / P(B)），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.2, scale: 52, pad: 20 });
      const lab = [['B B', 'B G'], ['G B', 'G G']];
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { F.rect(0.8 + j * 1.7, 0.2 + (1 - i) * 1.3, 1.6, 1.2, 'tri'); F.text([1.6 + j * 1.7, 0.8 + (1 - i) * 1.3], lab[i][j], 'mx', 0, 1); }
      F.seg([2.65, 0.35], [3.95, 1.25], 'hl pink'); F.seg([2.65, 1.25], [3.95, 0.35], 'hl pink');
      F.text([1.6, 2.9], '1st: B', 'len small', 0, 0); F.text([3.3, 2.9], '1st: G', 'len small', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "equally likely": { fr: "équiprobables", es: "equiprobables", ja: "同様に確からしい", zh: "等可能" },
      "at least one": { fr: "au moins un", es: "al menos un", ja: "少なくとも1人が", zh: "至少一个" },
      "1st: B": { fr: "1er : G", es: "1.º: N", ja: "上の子：B", zh: "老大：B" },
      "1st: G": { fr: "1er : F", es: "1.º: A", ja: "上の子：G", zh: "老大：G" }
    },
    options: [
      { tex: "\\tfrac13", correct: true, why: {
        en: "Three families remain (BB, BG, GB); one of them is BB.",
        fr: "Il reste trois familles ; une seule a deux garçons.",
        es: "Quedan tres familias; solo una tiene dos niños.",
        ja: "残るのは3通り（BB、BG、GB）で、そのうち1つが BB。",
        zh: "剩下三种（BB、BG、GB），其中一种是 BB。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "That answers “the older child is a boy”, a different piece of information.",
        fr: "Cela répond à « l’aîné est un garçon », une autre information.",
        es: "Eso responde a «el mayor es niño», otra información distinta.",
        ja: "それは「上の子が男の子」という別の情報への答えです。",
        zh: "那是“老大是男孩”这一不同条件下的答案。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "That ignores the information: $P(BB)$ before learning anything.",
        fr: "Ignore l’information : la probabilité avant de savoir quoi que ce soit.",
        es: "Ignora la información: la probabilidad antes de saber nada.",
        ja: "情報を無視した、何も知らない段階の確率です。",
        zh: "忽略了已知条件：这是未知任何信息时的概率。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "That is the probability of one boy and one girl.",
        fr: "C’est la probabilité d’un garçon et d’une fille.",
        es: "Es la probabilidad de un niño y una niña.",
        ja: "それは男の子1人・女の子1人の確率です。",
        zh: "那是一男一女的概率。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "That is $P(\\text{at least one boy})$, the condition itself.",
        fr: "C’est la probabilité de la condition elle-même.",
        es: "Es la probabilidad de la condición misma.",
        ja: "それは条件そのものの確率です。",
        zh: "那是条件本身的概率。"
      } },
      { tex: "1", correct: false, why: {
        en: "A girl is still possible.",
        fr: "Une fille reste possible.",
        es: "Todavía es posible una niña.",
        ja: "女の子の可能性も残っています。",
        zh: "仍可能有女孩。"
      } },
      { tex: "0", correct: false, why: {
        en: "BB is still possible.",
        fr: "GG reste possible.",
        es: "NN sigue siendo posible.",
        ja: "BB の可能性も残っています。",
        zh: "BB 仍然可能。"
      } },
      { tex: "\\tfrac16", correct: false, why: {
        en: "No case gives one sixth here.",
        fr: "Aucun cas ne donne un sixième.",
        es: "Ningún caso da un sexto.",
        ja: "6分の1 になる場合はありません。",
        zh: "这里没有任何情况得到六分之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "List the possibilities",
          fr: "Lister les possibilités",
          es: "Enumerar las posibilidades",
          ja: "場合を書き出す",
          zh: "列出可能情况"
        },
        lines: ["\\{BB,\\ BG,\\ GB,\\ GG\\} \\ \\text{equally likely}"],
        note: {
          en: "Order matters: BG and GB are different families.",
          fr: "L’ordre compte : GF et FG sont des familles différentes.",
          es: "El orden importa: NA y AN son familias distintas.",
          ja: "順序を区別します：BG と GB は別の場合です。",
          zh: "有顺序：BG 和 GB 是不同情况。"
        }
      },
      {
        title: {
          en: "Condition on the information",
          fr: "Conditionner par l’information",
          es: "Condicionar por la información",
          ja: "情報で条件づける",
          zh: "用条件缩小范围"
        },
        lines: ["P(BB \\mid \\text{at least one } B) = \\frac{1/4}{3/4} = \\boxed{\\tfrac13}"],
        note: {
          en: "Only GG is excluded; the other three stay equally likely.",
          fr: "Seule FF est exclue ; les trois autres restent équiprobables.",
          es: "Solo AA queda excluida; las otras tres siguen equiprobables.",
          ja: "除外されるのは GG だけで、残り3通りは同様に確からしいままです。",
          zh: "只排除 GG；其余三种仍等可能。"
        },
        fig(F) { F.fadeIn(F.rect(0.85, 1.55, 1.5, 1.1, 'fill-yellow', 'fills'), 500); }
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
