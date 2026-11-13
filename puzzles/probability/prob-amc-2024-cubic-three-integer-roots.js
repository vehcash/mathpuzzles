/* probability · A random cubic with three integer roots
   AMC 12B 2024 (Mathematical Association of America), Problem 17 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2024-cubic-three-integer-roots",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 17",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 17",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 17",
        ja: "AMC 12B 2024（アメリカ数学協会）第17問",
        zh: "AMC 12B 2024（美国数学协会）第 17 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A random cubic with three integer roots",
      fr: "Une cubique aléatoire à trois racines entières",
      es: "Una cúbica aleatoria con tres raíces enteras",
      ja: "整数解を3つもつランダムな3次式",
      zh: "有三个整数根的随机三次式"
    },
    statement: {
      en: "Distinct integers $a$ and $b$ are chosen at random (in order, without replacement) from $\\{-10,\\dots,10\\}$. <b>Which of the following are true about $x^3+ax^2+bx+6$?</b>",
      fr: "On choisit au hasard deux entiers distincts $a$ et $b$ (dans l’ordre, sans remise) dans $\\{-10,\\dots,10\\}$. <b>Lesquelles des affirmations suivantes sont vraies pour $x^3+ax^2+bx+6$ ?</b>",
      es: "Se eligen al azar enteros distintos $a$ y $b$ (en orden, sin reemplazo) de $\\{-10,\\dots,10\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre $x^3+ax^2+bx+6$?</b>",
      ja: "$\\{-10,\\dots,10\\}$ から異なる整数 $a,b$ を順に無作為に（非復元で）選びます。<b>$x^3+ax^2+bx+6$ について正しいものはどれですか？</b>",
      zh: "从 $\\{-10,\\dots,10\\}$ 中依次随机不放回地取两个不同整数 $a$、$b$。<b>关于 $x^3+ax^2+bx+6$，下列哪些正确？</b>"
    },
    figureText: {
      en: "A 21 × 21 grid of (a, b) with the diagonal removed and a few cells to be marked.",
      fr: "Une grille 21 × 21 des (a, b), diagonale exclue, quelques cases à marquer.",
      es: "Una cuadrícula 21 × 21 de (a, b) sin la diagonal y unas pocas casillas por marcar.",
      ja: "対角線を除いた 21 × 21 の (a, b) の格子。いくつかに印。",
      zh: "去掉对角线的 21 × 21 (a, b) 网格，少数格待标记。"
    },
    hint: {
      en: "Distinct integer roots $r_1r_2r_3=-6$, $a=-(r_1+r_2+r_3)$, $b=r_1r_2+r_1r_3+r_2r_3$. List the triples.",
      fr: "Racines entières distinctes : $r_1r_2r_3=-6$, $a=-(r_1+r_2+r_3)$, $b=r_1r_2+r_1r_3+r_2r_3$. Listez les triplets.",
      es: "Raíces enteras distintas: $r_1r_2r_3=-6$, $a=-(r_1+r_2+r_3)$, $b=r_1r_2+r_1r_3+r_2r_3$. Enumera las ternas.",
      ja: "相異なる整数解：$r_1r_2r_3=-6$、$a=-(r_1+r_2+r_3)$、$b=r_1r_2+r_1r_3+r_2r_3$。列挙する。",
      zh: "不同整数根：$r_1r_2r_3=-6$，$a=-(r_1+r_2+r_3)$，$b=r_1r_2+r_1r_3+r_2r_3$，列举三元组。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 64, pad: 16 });
      const T = F.T = axes(F, -1.8, 1.8, -1.8, 1.8);
      F.path([T([-1.05, -1.05]), T([1.05, -1.05]), T([1.05, 1.05]), T([-1.05, 1.05])], 'seg thin', 'base', true);
      F.seg(T([-1.05, -1.05]), T([1.05, 1.05]), 'seg thin dashc');
      F.reveal = () => {
      [[-6, -1], [0, -7], [-2, -5], [-4, 1]].forEach(([a, b]) => F.dot(T([a / 10, b / 10])));
      F.circle(T([0.6, 1.1]), 0.06, 'fill-pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is excluded because": {"fr": "est exclu car", "es": "queda excluido porque", "ja": "は次の理由で除外：", "zh": "被排除，因为"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "gives": {"fr": "donne", "es": "da", "ja": "から", "zh": "得"},
      "fails": {"fr": "échoue", "es": "no vale", "ja": "は不可", "zh": "不行"}
    },
    options: [
      { tex: "P=\\tfrac1{105}", correct: true, why: {
        en: "$\\tfrac4{21\\cdot20}$",
        fr: "$\\tfrac4{21\\cdot20}$",
        es: "$\\tfrac4{21\\cdot20}$",
        ja: "$\\tfrac4{21\\cdot20}$",
        zh: "$\\tfrac4{21\\cdot20}$"
      } },
      { tex: "\\{-1,-2,-3\\}\\ \\text{is excluded because}\\ b=11", correct: true, why: {
        en: "It needs $a=6$, $b=11$, and $11$ is out of range.",
        fr: "Il faudrait $a=6$, $b=11$, hors de l’intervalle.",
        es: "Necesitaría $a=6$, $b=11$, fuera de rango.",
        ja: "$a=6$、$b=11$ で範囲外。",
        zh: "需 $a=6$，$b=11$，超出范围。"
      } },
      { tex: "P=\\tfrac1{84}", correct: false, why: {
        en: "That counts $5$ triples, including the out-of-range one.",
        fr: "Cela compte $5$ triplets, dont celui hors intervalle.",
        es: "Cuenta $5$ ternas, incluida la que está fuera de rango.",
        ja: "範囲外を含め5組数えている。",
        zh: "算了 5 组，包括超范围的。"
      } },
      { tex: "P=\\tfrac1{240}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac1{63}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac1{221}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\{1,2,3\\}\\ \\text{works}", correct: false, why: {
        en: "$1\\cdot2\\cdot3=6\\ne-6$",
        fr: "$1\\cdot2\\cdot3=6\\ne-6$",
        es: "$1\\cdot2\\cdot3=6\\ne-6$",
        ja: "$1\\cdot2\\cdot3=6\\ne-6$",
        zh: "$1\\cdot2\\cdot3=6\\ne-6$"
      } },
      { tex: "\\{-1,1,6\\}\\ \\text{gives}\\ a=6", correct: false, why: {
        en: "$a=-(-1+1+6)=-6$",
        fr: "$a=-(-1+1+6)=-6$",
        es: "$a=-(-1+1+6)=-6$",
        ja: "$a=-(-1+1+6)=-6$",
        zh: "$a=-(-1+1+6)=-6$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Triples with product −6",
          fr: "Triplets de produit −6",
          es: "Ternas de producto −6",
          ja: "積が −6 の組",
          zh: "积为 −6 的三元组"
        },
        lines: ["\\{-1,1,6\\},\\{1,2,-3\\},\\{1,-2,3\\},\\{-1,2,3\\},\\{-1,-2,-3\\}"],
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
          en: "Check ranges",
          fr: "Vérifier les bornes",
          es: "Comprobar rangos",
          ja: "範囲を確認",
          zh: "检查范围"
        },
        lines: ["(a,b)=(-6,-1),(0,-7),(-2,-5),(-4,1);\\ (6,11)\\ \\text{fails}", "P=\\tfrac{4}{420}=\\tfrac1{105}"],
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
