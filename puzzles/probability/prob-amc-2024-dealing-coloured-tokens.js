/* probability · Reds to one, whites to another, blue to the third
   AMC 12A 2024 (Mathematical Association of America), Problem 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2024-dealing-coloured-tokens",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 16",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 16",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 16",
        ja: "AMC 12A 2024（アメリカ数学協会）第16問",
        zh: "AMC 12A 2024（美国数学协会）第 16 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Reds to one, whites to another, blue to the third",
      fr: "Les rouges à l’un, les blancs à un autre, le bleu au troisième",
      es: "Rojas a uno, blancas a otro, azul al tercero",
      ja: "赤は1人、白は別の人、青は3人目へ",
      zh: "红给一人、白给另一人、蓝给第三人"
    },
    statement: {
      en: "$12$ tokens ($3$ red, $2$ white, $1$ blue, $6$ black) are dealt at random, $4$ to each of $3$ players. <b>Which of the following equal the probability that one player gets all the reds, another gets both whites, and the third gets the blue?</b>",
      fr: "$12$ jetons ($3$ rouges, $2$ blancs, $1$ bleu, $6$ noirs) sont distribués au hasard, $4$ à chacun de $3$ joueurs. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’un joueur ait tous les rouges, un autre les deux blancs et le troisième le bleu ?</b>",
      es: "$12$ fichas ($3$ rojas, $2$ blancas, $1$ azul, $6$ negras) se reparten al azar, $4$ a cada uno de $3$ jugadores. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que un jugador tenga todas las rojas, otro las dos blancas y el tercero la azul?</b>",
      ja: "$12$ 枚のトークン（赤3、白2、青1、黒6）を3人に4枚ずつ無作為に配ります。<b>1人が赤を全部、別の1人が白2枚、残りの1人が青を受け取る確率に等しいものはどれですか？</b>",
      zh: "$12$ 枚筹码（红 3、白 2、蓝 1、黑 6）随机分给 3 名玩家，每人 4 枚。<b>下列哪些等于一人拿到全部红色、另一人拿到两枚白色、第三人拿到蓝色的概率？</b>"
    },
    figureText: {
      en: "Three hands of four slots each and the twelve coloured tokens above them.",
      fr: "Trois mains de quatre places et les douze jetons colorés au-dessus.",
      es: "Tres manos de cuatro huecos y las doce fichas de colores encima.",
      ja: "4枠ずつの3人の手札と上に12枚のトークン。",
      zh: "三手各四格，上方是十二枚彩色筹码。"
    },
    hint: {
      en: "Count colour patterns: $\\dfrac{12!}{3!\\,2!\\,1!\\,6!}$ in all. For a good deal, choose who gets which role ($3!$), then place the black tokens in each hand.",
      fr: "Comptez les motifs de couleurs : $\\dfrac{12!}{3!\\,2!\\,1!\\,6!}$ en tout. Pour une bonne distribution, choisissez les rôles ($3!$), puis placez les noirs dans chaque main.",
      es: "Cuenta patrones de colores: $\\dfrac{12!}{3!\\,2!\\,1!\\,6!}$ en total. Para un reparto válido, elige los papeles ($3!$) y coloca las negras en cada mano.",
      ja: "色の並びは全部で $\\dfrac{12!}{3!\\,2!\\,1!\\,6!}$。役割の決め方 $3!$、各手で黒の位置を決める。",
      zh: "颜色排列共 $\\dfrac{12!}{3!\\,2!\\,1!\\,6!}$ 种；有利情况先分配角色（$3!$），再放各手的黑色。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.2, scale: 50, pad: 16 });
      const cols = ['fill-pink', 'fill-pink', 'fill-pink', 'fill-blue', 'fill-blue', 'fill-yellow'];
      for (let k = 0; k < 12; k++) F.circle([0.45 + k * 0.46, 1.8], 0.17, k < 6 ? cols[k] : 'fill-blue');
      for (let p = 0; p < 3; p++) for (let s = 0; s < 4; s++) F.rect(0.3 + p * 1.95 + s * 0.42, 0.4, 0.36, 0.6, 'fill-blue', 'fills');
      F.reveal = () => {
      F.text([3.0, 0.15], '576 / 55440', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "576 / 55440": {"fr": "576 / 55440", "es": "576 / 55440", "ja": "576 / 55440", "zh": "576 / 55440"}
    },
    options: [
      { tex: "\\tfrac4{385}", correct: true, why: {
        en: "$\\dfrac{3!\\cdot4\\cdot\\binom42\\cdot4}{55440}=\\dfrac{576}{55440}$",
        fr: "$\\dfrac{3!\\cdot4\\cdot\\binom42\\cdot4}{55440}=\\dfrac{576}{55440}$",
        es: "$\\dfrac{3!\\cdot4\\cdot\\binom42\\cdot4}{55440}=\\dfrac{576}{55440}$",
        ja: "$\\dfrac{3!\\cdot4\\cdot\\binom42\\cdot4}{55440}=\\dfrac{576}{55440}$",
        zh: "$\\dfrac{3!\\cdot4\\cdot\\binom42\\cdot4}{55440}=\\dfrac{576}{55440}$"
      } },
      { tex: "\\tfrac{576}{55440}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac1{385}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{4}{1155}", correct: false, why: {
        en: "That divides by an extra $3$; the role assignment gives $3!=6$, not $2$.",
        fr: "Cela divise par $3$ de trop : les rôles donnent $3!=6$, pas $2$.",
        es: "Divide de más entre $3$: los papeles dan $3!=6$, no $2$.",
        ja: "余分に $3$ で割っている。役割は $3!=6$ 通り。",
        zh: "多除了 $3$：角色分配是 $3!=6$ 种。"
      } },
      { tex: "\\tfrac{2}{385}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{24}{385}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{4}{2310}", correct: false, why: {
        en: "That fixes which player gets the reds; any of the $3!$ role orders is fine.",
        fr: "Cela fixe qui reçoit les rouges ; les $3!$ attributions conviennent.",
        es: "Fija quién recibe las rojas; valen los $3!$ repartos de papeles.",
        ja: "赤を受け取る人を固定している。役割の割り当ては $3!$ 通り。",
        zh: "固定了谁拿红色；角色分配有 $3!$ 种。"
      } },
      { tex: "\\tfrac{389}{55440}", correct: false, why: {
        en: "$389=m+n$ was the contest’s requested output, not the probability.",
        fr: "$389=m+n$ était le nombre demandé, pas la probabilité.",
        es: "$389=m+n$ era lo pedido en el concurso, no la probabilidad.",
        ja: "$389=m+n$ は求める答えの形式で確率ではない。",
        zh: "$389=m+n$ 是题目要求的输出，不是概率。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All colour patterns",
          fr: "Tous les motifs",
          es: "Todos los patrones",
          ja: "全ての色の並び",
          zh: "所有颜色排列"
        },
        lines: ["\\frac{12!}{3!\\,2!\\,1!\\,6!}=55440"],
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
          en: "Good deals",
          fr: "Bonnes distributions",
          es: "Repartos buenos",
          ja: "条件を満たす配り方",
          zh: "有利分法"
        },
        lines: ["3!\\cdot\\underbrace{4}_{RRR+K}\\cdot\\underbrace{6}_{WW+KK}\\cdot\\underbrace{4}_{B+KKK}=576,\\quad\\frac{576}{55440}=\\frac4{385}"],
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
