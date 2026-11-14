/* combinatorics · Forcing a pair with product 256
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 40 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-ita-2024-powers-of-two-product-256",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 40",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 40",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 40",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第40問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 40 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Forcing a pair with product 256",
      fr: "Forcer une paire de produit 256",
      es: "Forzar un par de producto 256",
      ja: "積が256の組を必ず含むには",
      zh: "必含乘积为 256 的一对"
    },
    statement: {
      en: "Let $A=\\{1,2,4,8,16,32,64,128,256\\}$. Let $n$ be the smallest number such that every $n$-element subset of $A$ contains two distinct elements whose product is $256$. <b>Which of the following are true?</b>",
      fr: "Soit $A=\\{1,2,4,8,16,32,64,128,256\\}$. Soit $n$ le plus petit entier tel que toute partie de $A$ à $n$ éléments contienne deux éléments distincts de produit $256$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $A=\\{1,2,4,8,16,32,64,128,256\\}$. Sea $n$ el menor número tal que todo subconjunto de $A$ con $n$ elementos contiene dos elementos distintos de producto $256$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A=\\{1,2,4,8,16,32,64,128,256\\}$ とします。$A$ のどの $n$ 元部分集合も積が $256$ の異なる2元を含むような最小の $n$ を求めます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $A=\\{1,2,4,8,16,32,64,128,256\\}$。设 $n$ 为最小的数，使 $A$ 的任意 $n$ 元子集都含两个乘积为 $256$ 的不同元素。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The nine powers of 2 paired up by product 256, with 16 left alone.",
      fr: "Les neuf puissances de 2 appariées par produit 256, 16 restant seul.",
      es: "Las nueve potencias de 2 emparejadas por producto 256, con 16 solo.",
      ja: "積256で組にした9つの2の累乗。16 は単独。",
      zh: "九个 2 的幂按乘积 256 配对，16 单独。"
    },
    hint: {
      en: "Pair $2^k$ with $2^{8-k}$. How many elements can you take without completing a pair?",
      fr: "Associez $2^k$ à $2^{8-k}$. Combien d’éléments peut-on prendre sans compléter de paire ?",
      es: "Empareja $2^k$ con $2^{8-k}$. ¿Cuántos elementos puedes tomar sin completar un par?",
      ja: "$2^k$ と $2^{8-k}$ を組にする。組を完成させずに何個取れるか。",
      zh: "把 $2^k$ 与 $2^{8-k}$ 配对，不凑成一对最多取几个？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.2, scale: 46, pad: 16 });
      [['1', '256'], ['2', '128'], ['4', '64'], ['8', '32']].forEach(([a, b], k) => { F.rect(0.2 + k * 1.3, 0.3, 1.15, 1.6, 'fill-blue', 'fills'); F.text([0.78 + k * 1.3, 1.45], a, 'pt', 0, 0); F.text([0.78 + k * 1.3, 0.75], b, 'pt', 0, 0); });
      F.rect(5.5, 0.75, 0.75, 0.7, 'fill-yellow', 'fills'); F.text([5.88, 1.1], '16', 'pt', 0, 0);
      F.reveal = () => {
      F.text([3.2, 2.1], '4 + 1 = 5 safe', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "4 + 1 = 5 safe": {"fr": "4 + 1 = 5 sans paire", "es": "4 + 1 = 5 sin par", "ja": "4 + 1 = 5 個は安全", "zh": "4 + 1 = 5 个不成对"},
      "has no such pair": {"fr": "n’a pas de telle paire", "es": "no tiene tal par", "ja": "にはそのような組がない", "zh": "没有这样的一对"},
      "can pair with itself": {"fr": "peut s’associer à lui-même", "es": "puede emparejarse consigo mismo", "ja": "は自分自身と組になれる", "zh": "可与自身配对"},
      "there are 5 pairs with product 256": {"fr": "il y a 5 paires de produit 256", "es": "hay 5 pares de producto 256", "ja": "積256の組は5つ", "zh": "乘积为 256 的对有 5 个"},
      "alone": {"fr": "seul", "es": "solo", "ja": "単独", "zh": "单独"},
      "boxes": {"fr": "tiroirs", "es": "cajones", "ja": "個の箱", "zh": "个抽屉"},
      "elements force two in one pair": {"fr": "éléments en mettent deux dans une paire", "es": "elementos ponen dos en un par", "ja": "個で2つが同じ組に入る", "zh": "个元素必有两个同组"}
    },
    options: [
      { tex: "n=6", correct: true, why: {
        en: "Five elements (one from each pair, plus $16$) avoid it; any six must complete a pair.",
        fr: "Cinq éléments (un par paire, plus $16$) l’évitent ; six en complètent forcément une.",
        es: "Cinco elementos (uno por par, más $16$) lo evitan; seis completan un par a la fuerza.",
        ja: "各組から1つと $16$ の5個なら避けられ、6個なら必ず組ができる。",
        zh: "每对取一个再加 $16$ 共 5 个可避免；取 6 个必成对。"
      } },
      { tex: "\\{1,2,4,8,16\\}\\ \\text{has no such pair}", correct: true, why: {
        en: "$2^a2^b=2^8\\iff a+b=8$",
        fr: "$2^a2^b=2^8\\iff a+b=8$",
        es: "$2^a2^b=2^8\\iff a+b=8$",
        ja: "$2^a2^b=2^8\\iff a+b=8$",
        zh: "$2^a2^b=2^8\\iff a+b=8$"
      } },
      { tex: "n=5", correct: false, why: {
        en: "$\\{1,2,4,8,16\\}$",
        fr: "$\\{1,2,4,8,16\\}$",
        es: "$\\{1,2,4,8,16\\}$",
        ja: "$\\{1,2,4,8,16\\}$",
        zh: "$\\{1,2,4,8,16\\}$"
      } },
      { tex: "n=7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "n=9", correct: false, why: {
        en: "That is all of $A$; much smaller already works.",
        fr: "C’est tout $A$ ; bien moins suffit.",
        es: "Es todo $A$; con mucho menos basta.",
        ja: "$A$ 全体。もっと少なくてよい。",
        zh: "那是整个 $A$，远少于此即可。"
      } },
      { tex: "16\\ \\text{can pair with itself}", correct: false, why: {
        en: "The two elements must be distinct.",
        fr: "Les deux éléments doivent être distincts.",
        es: "Los dos elementos deben ser distintos.",
        ja: "2元は異なる必要がある。",
        zh: "两个元素须不同。"
      } },
      { tex: "\\text{there are 5 pairs with product 256}", correct: false, why: {
        en: "$(1,256),(2,128),(4,64),(8,32)$",
        fr: "$(1,256),(2,128),(4,64),(8,32)$",
        es: "$(1,256),(2,128),(4,64),(8,32)$",
        ja: "$(1,256),(2,128),(4,64),(8,32)$",
        zh: "$(1,256),(2,128),(4,64),(8,32)$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pairs",
          fr: "Paires",
          es: "Pares",
          ja: "組",
          zh: "配对"
        },
        lines: ["(1,256),\\ (2,128),\\ (4,64),\\ (8,32),\\quad 16\\ \\text{alone}"],
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
          en: "Pigeonhole",
          fr: "Tiroirs",
          es: "Palomar",
          ja: "鳩の巣原理",
          zh: "抽屉原理"
        },
        lines: ["5\\ \\text{boxes}\\Rightarrow 6\\ \\text{elements force two in one pair}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
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
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
