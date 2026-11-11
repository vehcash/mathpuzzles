/* combinatorics · Reflexive, symmetric, ten pairs
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2025-reflexive-symmetric-10",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.8",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.8",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.8",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.8",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.8"
      },
      exams: ["jee"]
    },
    difficulty: 1,
    title: {
      en: "Reflexive, symmetric, ten pairs",
      fr: "Réflexive, symétrique, dix couples",
      es: "Reflexiva, simétrica, diez pares",
      ja: "反射的・対称的で10組",
      zh: "自反、对称、十个元素"
    },
    statement: {
      en: "<b>Which of the following equal the number of reflexive and symmetric relations on $\\{a,b,c,d,e,f\\}$ with exactly $10$ elements?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de relations réflexives et symétriques sur $\\{a,b,c,d,e,f\\}$ ayant exactement $10$ éléments ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de relaciones reflexivas y simétricas en $\\{a,b,c,d,e,f\\}$ con exactamente $10$ elementos?</b>",
      ja: "<b>$\\{a,b,c,d,e,f\\}$ 上の反射的かつ対称的で、元がちょうど $10$ 個の関係の個数に等しいものはどれですか？</b>",
      zh: "<b>集合 $\\{a,b,c,d,e,f\\}$ 上恰有 $10$ 个元素的自反且对称关系的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "The 6 × 6 grid of ordered pairs with the 6 diagonal cells already filled.",
      fr: "La grille 6 × 6 des couples, avec les 6 cases diagonales déjà remplies.",
      es: "La cuadrícula 6 × 6 de pares con las 6 casillas diagonales ya llenas.",
      ja: "6 × 6 の組の格子。対角の 6 マスは塗ってある。",
      zh: "6 × 6 有序对方格，对角线 6 格已填。"
    },
    hint: {
      en: "Reflexive uses $6$ diagonal pairs. The remaining $4$ must come in symmetric pairs $\\{(x,y),(y,x)\\}$.",
      fr: "La réflexivité utilise $6$ couples diagonaux. Les $4$ restants vont par paires symétriques $\\{(x,y),(y,x)\\}$.",
      es: "La reflexividad usa $6$ pares diagonales. Los $4$ restantes van en parejas simétricas $\\{(x,y),(y,x)\\}$.",
      ja: "反射律で対角の $6$ 組。残り $4$ 組は対称なペア $\\{(x,y),(y,x)\\}$。",
      zh: "自反用去对角 $6$ 个，剩余 $4$ 个须成对 $\\{(x,y),(y,x)\\}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 60, pad: 16 });
      for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) F.rect(0.3 + j * 0.5, 3.3 - (i + 1) * 0.5, 0.45, 0.45, i === j ? 'fill-yellow' : 'fill-blue', 'fills');
      F.reveal = () => {
      [[0, 2], [2, 0], [3, 5], [5, 3]].forEach(([i, j]) => F.rect(0.3 + j * 0.5, 3.3 - (i + 1) * 0.5, 0.45, 0.45, 'fill-pink', 'fills'));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "reflexive:": {"fr": "réflexive :", "es": "reflexiva:", "ja": "反射的：", "zh": "自反："},
      "pairs": {"fr": "couples", "es": "pares", "ja": "組", "zh": "个"},
      "so": {"fr": "donc", "es": "así que", "ja": "よって", "zh": "还需"},
      "more": {"fr": "de plus", "es": "más", "ja": "組追加", "zh": "个"}
    },
    options: [
      { tex: "105", correct: true, why: {
        en: "Choose $2$ of the $\\binom62=15$ unordered pairs: $\\binom{15}2$.",
        fr: "Choisir $2$ des $\\binom62=15$ paires non ordonnées : $\\binom{15}2$.",
        es: "Elegir $2$ de las $\\binom62=15$ parejas no ordenadas: $\\binom{15}2$.",
        ja: "$\\binom62=15$ 個の非順序対から $2$ つ：$\\binom{15}2$。",
        zh: "从 $\\binom62=15$ 个无序对中选 $2$ 个：$\\binom{15}2$。"
      } },
      { tex: "\\tbinom{15}{2}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tbinom{30}{4}", correct: false, why: {
        en: "That ignores symmetry: pairs must come with their mirror image.",
        fr: "Cela ignore la symétrie.",
        es: "Ignora la simetría.",
        ja: "対称性を無視している。",
        zh: "忽略了对称性。"
      } },
      { tex: "15", correct: false, why: {
        en: "That is one symmetric pair, giving only $8$ elements.",
        fr: "C’est une seule paire symétrique : $8$ éléments.",
        es: "Es una sola pareja simétrica: $8$ elementos.",
        ja: "対称ペア1つで元は $8$ 個。",
        zh: "只有一对，共 $8$ 个元素。"
      } },
      { tex: "210", correct: false, why: {
        en: "Order of choosing the two pairs does not matter.",
        fr: "L’ordre du choix des deux paires n’importe pas.",
        es: "El orden de las dos parejas no importa.",
        ja: "2つのペアの順序は関係ない。",
        zh: "两对的顺序无关。"
      } },
      { tex: "\\tbinom{15}{4}", correct: false, why: {
        en: "$4$ unordered pairs would give $14$ elements.",
        fr: "$4$ paires donneraient $14$ éléments.",
        es: "$4$ parejas darían $14$ elementos.",
        ja: "4ペアだと元は $14$ 個。",
        zh: "4 对会有 $14$ 个元素。"
      } },
      { tex: "120", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "90", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Diagonal",
          fr: "Diagonale",
          es: "Diagonal",
          ja: "対角",
          zh: "对角线"
        },
        lines: ["\\text{reflexive: } 6\\ \\text{pairs}\\ (x,x),\\ \\text{so}\\ 4\\ \\text{more}"],
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
          en: "Symmetric pairs",
          fr: "Paires symétriques",
          es: "Parejas simétricas",
          ja: "対称なペア",
          zh: "对称对"
        },
        lines: ["4=2\\times2:\\ \\binom{\\binom62}{2}=\\binom{15}2=\\boxed{105}"],
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
