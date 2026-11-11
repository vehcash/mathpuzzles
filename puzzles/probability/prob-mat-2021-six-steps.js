/* probability · Six random steps
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-mat-2021-six-steps",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1E",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1E",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1E",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1E",
        zh: "牛津大学数学入学考试 MAT 2021 第 1E 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Six random steps",
      fr: "Six pas au hasard",
      es: "Seis pasos al azar",
      ja: "6回のランダムな移動",
      zh: "随机走六步"
    },
    statement: {
      en: "A point starts at $(0,0)$ and makes six moves. Each move independently adds $(1,1)$ or $(3,2)$, each with probability $\\tfrac12$. <b>Which of the following equal the probability that it finishes at $(10,8)$?</b>",
      fr: "Un point part de $(0,0)$ et fait six mouvements. Chaque mouvement ajoute indépendamment $(1,1)$ ou $(3,2)$, chacun avec probabilité $\\tfrac12$. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’il finisse en $(10,8)$ ?</b>",
      es: "Un punto parte de $(0,0)$ y hace seis movimientos. Cada movimiento suma, de forma independiente, $(1,1)$ o $(3,2)$, cada uno con probabilidad $\\tfrac12$. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que termine en $(10,8)$?</b>",
      ja: "点が $(0,0)$ から6回移動します。各回、独立に確率 $\\tfrac12$ ずつで $(1,1)$ または $(3,2)$ を加えます。<b>最後に $(10,8)$ にいる確率に等しいものはどれですか？</b>",
      zh: "一点从 $(0,0)$ 出发走六步，每步独立地以概率 $\\tfrac12$ 加上 $(1,1)$ 或 $(3,2)$。<b>下列哪些等于它最终到达 $(10,8)$ 的概率？</b>"
    },
    figureText: {
      en: "A grid with one possible path of six moves from (0, 0) to (10, 8): four short (1, 1) moves and two long (3, 2) moves.",
      fr: "Une grille avec un chemin possible de six mouvements de (0, 0) à (10, 8) : quatre courts (1, 1) et deux longs (3, 2).",
      es: "Una cuadrícula con un camino posible de seis movimientos de (0, 0) a (10, 8): cuatro cortos (1, 1) y dos largos (3, 2).",
      ja: "(0, 0) から (10, 8) への6回の移動の一例：短い (1, 1) が4回、長い (3, 2) が2回。",
      zh: "网格上从 (0, 0) 到 (10, 8) 的一条六步路径：四步短的 (1, 1)，两步长的 (3, 2)。"
    },
    hint: {
      en: "If $k$ of the moves are $(3,2)$, where does the point end up?",
      fr: "Si $k$ mouvements sont $(3,2)$, où arrive le point ?",
      es: "Si $k$ movimientos son $(3,2)$, ¿dónde acaba el punto?",
      ja: "$(3,2)$ が $k$ 回なら、最後の位置は？",
      zh: "如果有 $k$ 步是 $(3,2)$，终点在哪里？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 10.8, h: 8.8, scale: 22, pad: 18 });
      const T = F.T = axes(F, -0.4, 10.4, -0.4, 8.4, { grid: true });
      const mv = [[1,1],[3,2],[1,1],[1,1],[3,2],[1,1]]; let p = [0, 0];
      mv.forEach(d => { const q = [p[0] + d[0], p[1] + d[1]]; F.seg(T(p), T(q), d[0] === 3 ? 'hl pink' : 'hl yellow'); F.dot(T(q)); p = q; });
      F.dot(T([0, 0])); F.text(T([10, 8]), '(10, 8)', 'len small', -28, -10);
      return F;
    },
    options: [
      { tex: "\\tfrac{15}{64}", correct: true, why: {
        en: "$\\binom62\\big/2^6=\\tfrac{15}{64}$.",
        fr: "$\\binom62\\big/2^6=\\tfrac{15}{64}$.",
        es: "$\\binom62\\big/2^6=\\tfrac{15}{64}$.",
        ja: "$\\binom62\\big/2^6=\\tfrac{15}{64}$.",
        zh: "$\\binom62\\big/2^6=\\tfrac{15}{64}$."
      } },
      { tex: "\\binom62\\left(\\tfrac12\\right)^6", correct: true, why: {
        en: "Choose which 2 of the 6 moves are long.",
        fr: "Choisir lesquels des 6 mouvements sont longs.",
        es: "Elegir cuáles 2 de los 6 movimientos son largos.",
        ja: "6回のうち長い2回を選ぶ。",
        zh: "从 6 步中选出 2 步长步。"
      } },
      { tex: "\\tfrac{1}{64}", correct: false, why: {
        en: "That is one particular sequence of moves.",
        fr: "C’est une suite de mouvements particulière.",
        es: "Es una sucesión concreta de movimientos.",
        ja: "特定の1つの並びの確率。",
        zh: "那只是一种特定的走法。"
      } },
      { tex: "\\tfrac{15}{32}", correct: false, why: {
        en: "Divides by $2^5$ instead of $2^6$.",
        fr: "Divise par $2^5$ au lieu de $2^6$.",
        es: "Divide entre $2^5$ en vez de $2^6$.",
        ja: "$2^6$ でなく $2^5$ で割っている。",
        zh: "除以了 $2^5$ 而不是 $2^6$。"
      } },
      { tex: "\\tfrac{20}{64}", correct: false, why: {
        en: "That is $\\binom63$: three long moves land at $(12,9)$.",
        fr: "C’est $\\binom63$ : trois longs mènent en $(12,9)$.",
        es: "Es $\\binom63$: tres largos llevan a $(12,9)$.",
        ja: "$\\binom63$ で、長い3回だと $(12,9)$。",
        zh: "那是 $\\binom63$：三步长步到 $(12,9)$。"
      } },
      { tex: "\\tfrac{6}{64}", correct: false, why: {
        en: "Only one long move: ends at $(8,7)$.",
        fr: "Un seul long : arrivée en $(8,7)$.",
        es: "Un solo largo: termina en $(8,7)$.",
        ja: "長い1回だと $(8,7)$。",
        zh: "只一步长步：到 $(8,7)$。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "Treats the number of long moves as a fair choice among 4.",
        fr: "Traite le nombre de longs comme un choix équitable parmi 4.",
        es: "Trata el número de largos como una elección equitativa entre 4.",
        ja: "長い回数を4通りから等確率で選ぶとみなしている。",
        zh: "把长步数当成 4 种等可能情况。"
      } },
      { tex: "0", correct: false, why: {
        en: "$(10,8)$ is reachable with 2 long moves.",
        fr: "$(10,8)$ est atteignable avec 2 longs.",
        es: "$(10,8)$ se alcanza con 2 largos.",
        ja: "長い2回で $(10,8)$ に届く。",
        zh: "两步长步即可到达 $(10,8)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where k long moves lead",
          fr: "Où mènent k longs",
          es: "Adónde llevan k largos",
          ja: "長い移動 k 回の行き先",
          zh: "k 步长步的终点"
        },
        lines: ["(6-k)(1,1)+k(3,2)=(6+2k,\\;6+k)"],
        note: {
          en: "Both coordinates depend only on $k$, not on the order.",
          fr: "Les deux coordonnées ne dépendent que de $k$, pas de l’ordre.",
          es: "Las dos coordenadas solo dependen de $k$, no del orden.",
          ja: "座標は $k$ だけで決まり、順番によらない。",
          zh: "两个坐标只与 $k$ 有关，与顺序无关。"
        }
      },
      {
        title: {
          en: "Match (10, 8)",
          fr: "Atteindre (10, 8)",
          es: "Llegar a (10, 8)",
          ja: "(10, 8) に合わせる",
          zh: "对上 (10, 8)"
        },
        lines: ["6+2k=10,\\;6+k=8\\;\\Rightarrow\\;k=2"],
        note: {
          en: "Both equations agree, so the target is reachable.",
          fr: "Les deux équations concordent : la cible est atteignable.",
          es: "Las dos ecuaciones coinciden: el destino es alcanzable.",
          ja: "2式が一致するので到達できる。",
          zh: "两式一致，可以到达。"
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
        lines: ["P=\\binom62\\left(\\tfrac12\\right)^6=\\boxed{\\tfrac{15}{64}}"],
        note: {
          en: "A binomial probability with $n=6$, $p=\\tfrac12$.",
          fr: "Une probabilité binomiale avec $n=6$, $p=\\tfrac12$.",
          es: "Una probabilidad binomial con $n=6$, $p=\\tfrac12$.",
          ja: "$n=6$, $p=\\tfrac12$ の二項分布。",
          zh: "$n=6$、$p=\\tfrac12$ 的二项概率。"
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
