/* probability · Odd cards against even cards
   Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2024-card-game",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 14",
        fr: "Gaokao 2024, épreuve nationale I (新课标Ⅰ卷), question 14",
        es: "Gaokao 2024, examen nacional I (新课标Ⅰ卷), pregunta 14",
        ja: "2024年 中国・高考 新課程標準Ⅰ卷 第14問",
        zh: "2024年高考数学新课标Ⅰ卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Odd cards against even cards",
      fr: "Cartes impaires contre cartes paires",
      es: "Cartas impares contra cartas pares",
      ja: "奇数のカード対偶数のカード",
      zh: "奇数牌对偶数牌"
    },
    statement: {
      en: "Player A holds cards $1,3,5,7$ and player B holds $2,4,6,8$. In each of four rounds both play one of their remaining cards at random; the larger card scores $1$ point for its owner, and used cards are discarded. <b>Which of the following equal the probability that A scores at least $2$ points?</b>",
      fr: "Le joueur A a les cartes $1,3,5,7$ et le joueur B les cartes $2,4,6,8$. À chacune des quatre manches, chacun joue au hasard une de ses cartes restantes ; la plus forte rapporte $1$ point à son propriétaire, et les cartes jouées sont écartées. <b>Lesquelles des valeurs suivantes sont égales à la probabilité que A marque au moins $2$ points ?</b>",
      es: "El jugador A tiene las cartas $1,3,5,7$ y el jugador B las cartas $2,4,6,8$. En cada una de las cuatro rondas ambos juegan al azar una de sus cartas restantes; la carta mayor da $1$ punto a su dueño y las cartas usadas se descartan. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que A consiga al menos $2$ puntos?</b>",
      ja: "A はカード $1,3,5,7$、B はカード $2,4,6,8$ を持っています。4回の各回で両者は残りのカードから無作為に1枚出し、大きい方の持ち主が $1$ 点を得ます。出したカードは捨てます。<b>A の得点が $2$ 点以上となる確率に等しいものはどれですか？</b>",
      zh: "甲有牌 $1,3,5,7$，乙有牌 $2,4,6,8$。四轮比赛中每轮双方各从剩余的牌中随机出一张，点数大者得 $1$ 分，出过的牌弃置。<b>下列哪些等于甲的总得分不小于 $2$ 的概率？</b>"
    },
    figureText: {
      en: "A’s cards 1, 3, 5, 7 in one row and B’s cards 2, 4, 6, 8 below. Lines show one possible pairing: 1–8, 3–2, 5–4, 7–6, in which A wins three rounds.",
      fr: "Les cartes de A (1, 3, 5, 7) sur une ligne et celles de B (2, 4, 6, 8) en dessous. Des traits montrent un appariement possible : 1–8, 3–2, 5–4, 7–6, où A gagne trois manches.",
      es: "Las cartas de A (1, 3, 5, 7) en una fila y las de B (2, 4, 6, 8) debajo. Unas líneas muestran un emparejamiento posible: 1–8, 3–2, 5–4, 7–6, en el que A gana tres rondas.",
      ja: "上段に A のカード 1, 3, 5, 7、下段に B のカード 2, 4, 6, 8。線は組み合わせの一例 1–8, 3–2, 5–4, 7–6（A が3回勝つ）。",
      zh: "上排是甲的牌 1、3、5、7，下排是乙的牌 2、4、6、8。连线表示一种配对：1–8，3–2，5–4，7–6，此时甲赢三轮。"
    },
    hint: {
      en: "Only the pairing matters: there are $4!=24$ equally likely ways to match A’s cards with B’s.",
      fr: "Seul l’appariement compte : il y a $4!=24$ façons équiprobables d’associer les cartes de A à celles de B.",
      es: "Solo importa el emparejamiento: hay $4!=24$ formas equiprobables de emparejar las cartas de A con las de B.",
      ja: "大事なのは組み合わせだけ：A と B のカードの組み方は等確率で $4!=24$ 通り。",
      zh: "只与配对有关：甲、乙的牌共有 $4!=24$ 种等可能的配对方式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 2.6, scale: 60, pad: 12 });
      const A = [1, 3, 5, 7], B = [2, 4, 6, 8], xa = i => 0.5 + i * 1.4, pair = [3, 0, 1, 2];
      A.forEach((v, i) => { F.rect(xa(i) - 0.35, 1.6, 0.7, 0.9, 'tri fill-yellow'); F.text([xa(i), 2.05], String(v), 'nodenum', 0, 0); });
      B.forEach((v, i) => { F.rect(xa(i) - 0.35, 0.1, 0.7, 0.9, 'tri fill-blue'); F.text([xa(i), 0.55], String(v), 'nodenum', 0, 0); });
      pair.forEach((j, i) => F.seg([xa(i), 1.6], [xa(j), 1.0], A[i] > B[j] ? 'hl green' : 'seg thin'));
      F.text([-0.05, 2.05], 'A', 'pt', 0, 0); F.text([-0.05, 0.55], 'B', 'pt', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "outcomes": {"fr": "issues", "es": "resultados", "ja": "結果", "zh": "结果数"},
      "equally likely pairings": {"fr": "appariements équiprobables", "es": "emparejamientos equiprobables", "ja": "通りの等確率な組み合わせ", "zh": "种等可能的配对"},
      "the card": {"fr": "la carte", "es": "la carta", "ja": "カード", "zh": "牌"},
      "never wins": {"fr": "ne gagne jamais", "es": "nunca gana", "ja": "は決して勝たない", "zh": "永远赢不了"}
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "$12$ of the $24$ pairings give A at least $2$ points.",
        fr: "$12$ des $24$ appariements donnent au moins $2$ points à A.",
        es: "$12$ de los $24$ emparejamientos dan a A al menos $2$ puntos.",
        ja: "$24$ 通り中 $12$ 通りで A は $2$ 点以上。",
        zh: "$24$ 种配对中有 $12$ 种使甲至少得 $2$ 分。"
      } },
      { tex: "\\tfrac{11}{24}+\\tfrac{1}{24}", correct: true, why: {
        en: "Exactly $2$ points: $\\tfrac{11}{24}$; $3$ points: $\\tfrac1{24}$.",
        fr: "Exactement $2$ points : $\\tfrac{11}{24}$ ; $3$ points : $\\tfrac1{24}$.",
        es: "Exactamente $2$ puntos: $\\tfrac{11}{24}$; $3$ puntos: $\\tfrac1{24}$.",
        ja: "ちょうど $2$ 点：$\\tfrac{11}{24}$、$3$ 点：$\\tfrac1{24}$。",
        zh: "恰得 $2$ 分：$\\tfrac{11}{24}$；得 $3$ 分：$\\tfrac1{24}$。"
      } },
      { tex: "\\tfrac{11}{24}", correct: false, why: {
        en: "That is only the probability of exactly $2$ points.",
        fr: "C’est seulement la probabilité d’exactement $2$ points.",
        es: "Es solo la probabilidad de exactamente $2$ puntos.",
        ja: "それはちょうど $2$ 点の確率だけ。",
        zh: "那只是恰得 $2$ 分的概率。"
      } },
      { tex: "\\tfrac{1}{24}", correct: false, why: {
        en: "That is the probability of $3$ points (pairing $3$–$2$, $5$–$4$, $7$–$6$).",
        fr: "C’est la probabilité de $3$ points (appariement $3$–$2$, $5$–$4$, $7$–$6$).",
        es: "Es la probabilidad de $3$ puntos (emparejamiento $3$–$2$, $5$–$4$, $7$–$6$).",
        ja: "$3$ 点（$3$–$2$、$5$–$4$、$7$–$6$）の確率。",
        zh: "那是得 $3$ 分的概率（$3$–$2$、$5$–$4$、$7$–$6$）。"
      } },
      { tex: "\\tfrac{11}{12}", correct: false, why: {
        en: "That is $P(\\text{at least }1)$: only the pairing $1$–$2$, $3$–$4$, $5$–$6$, $7$–$8$ gives $0$.",
        fr: "C’est $P(\\text{au moins }1)$ : seul l’appariement $1$–$2$, $3$–$4$, $5$–$6$, $7$–$8$ donne $0$.",
        es: "Es $P(\\text{al menos }1)$: solo el emparejamiento $1$–$2$, $3$–$4$, $5$–$6$, $7$–$8$ da $0$.",
        ja: "それは $P(1\\text{ 点以上})$。$0$ 点は $1$–$2$、$3$–$4$、$5$–$6$、$7$–$8$ だけ。",
        zh: "那是 $P(\\text{至少 }1\\text{ 分})$：只有 $1$–$2$、$3$–$4$、$5$–$6$、$7$–$8$ 得 $0$ 分。"
      } },
      { tex: "\\tfrac{1}{4}", correct: false, why: {
        en: "Too small: half of the pairings work.",
        fr: "Trop petit : la moitié des appariements conviennent.",
        es: "Demasiado pequeño: la mitad de los emparejamientos sirven.",
        ja: "小さすぎ：半分の組み方が条件を満たす。",
        zh: "太小：一半的配对满足条件。"
      } },
      { tex: "\\tfrac{3}{8}", correct: false, why: {
        en: "Would need $9$ good pairings; there are $12$.",
        fr: "Il faudrait $9$ bons appariements ; il y en a $12$.",
        es: "Harían falta $9$ emparejamientos buenos; hay $12$.",
        ja: "$9$ 通りなら成り立つが、実際は $12$ 通り。",
        zh: "需要 $9$ 种，实际有 $12$ 种。"
      } },
      { tex: "\\tfrac{2}{3}", correct: false, why: {
        en: "Would need $16$ good pairings.",
        fr: "Il faudrait $16$ bons appariements.",
        es: "Harían falta $16$ emparejamientos buenos.",
        ja: "$16$ 通り必要になる。",
        zh: "需要 $16$ 种。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Reduce to a random pairing",
          fr: "Se ramener à un appariement aléatoire",
          es: "Reducir a un emparejamiento aleatorio",
          ja: "無作為な組み合わせに直す",
          zh: "化为随机配对"
        },
        lines: ["\\text{outcomes} = 4! = 24 \\text{ equally likely pairings}"],
        note: {
          en: "The order of the rounds does not change the score, only who meets whom.",
          fr: "L’ordre des manches ne change pas le score, seulement qui affronte qui.",
          es: "El orden de las rondas no cambia la puntuación, solo quién se enfrenta a quién.",
          ja: "得点は対戦の順番によらず、誰と誰が当たるかだけで決まる。",
          zh: "得分与轮次顺序无关，只与谁对谁有关。"
        }
      },
      {
        title: {
          en: "Count the scores",
          fr: "Compter les scores",
          es: "Contar las puntuaciones",
          ja: "得点を数える",
          zh: "统计得分"
        },
        lines: ["\\#\\{0\\}=1,\\;\\#\\{1\\}=11,\\;\\#\\{2\\}=11,\\;\\#\\{3\\}=1\\;(\\text{the card }1\\text{ never wins})", "P(\\ge 2)=\\tfrac{11+1}{24}=\\boxed{\\tfrac12}"],
        note: {
          en: "Symmetry check: replacing each card $c$ by $9-c$ swaps the roles, so $P(0)=P(3)$ and $P(1)=P(2)$.",
          fr: "Vérification par symétrie : remplacer chaque carte $c$ par $9-c$ échange les rôles, donc $P(0)=P(3)$ et $P(1)=P(2)$.",
          es: "Comprobación por simetría: cambiar cada carta $c$ por $9-c$ intercambia los papeles, así que $P(0)=P(3)$ y $P(1)=P(2)$.",
          ja: "対称性：各カード $c$ を $9-c$ に替えると役割が入れ替わり、$P(0)=P(3)$、$P(1)=P(2)$。",
          zh: "对称检验：把每张牌 $c$ 换成 $9-c$，角色互换，所以 $P(0)=P(3)$，$P(1)=P(2)$。"
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
          en: "One option is the answer; another is the same sum split into its two cases.",
          fr: "Une option est la réponse ; une autre est la même somme séparée en ses deux cas.",
          es: "Una opción es la respuesta; otra es la misma suma separada en sus dos casos.",
          ja: "1つは答え、もう1つは同じ和を2つの場合に分けたもの。",
          zh: "一个是答案，另一个是同一和式拆成两种情况。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
