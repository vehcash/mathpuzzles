/* combinatorics · Lining up three pairs of shoes
   AMC 10B 2024 (Mathematical Association of America), Problem 20 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2024-three-pairs-of-shoes",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 10B 2024 (Mathematical Association of America), Problem 20",
        fr: "AMC 10B 2024 (Mathematical Association of America), problème 20",
        es: "AMC 10B 2024 (Mathematical Association of America), problema 20",
        ja: "AMC 10B 2024（アメリカ数学協会）第20問",
        zh: "AMC 10B 2024（美国数学协会）第 20 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Lining up three pairs of shoes",
      fr: "Aligner trois paires de chaussures",
      es: "Alinear tres pares de zapatos",
      ja: "3足の靴を1列に並べる",
      zh: "把三双鞋排成一排"
    },
    statement: {
      en: "Three pairs of shoes (each a left and a right) are placed in a row. A left shoe may not stand next to a right shoe of a <i>different</i> pair. <b>Which of the following equal the number of arrangements?</b>",
      fr: "Trois paires de chaussures (une gauche et une droite chacune) sont mises en ligne. Une chaussure gauche ne doit pas être à côté d’une droite d’une <i>autre</i> paire. <b>Lesquelles des valeurs suivantes sont égales au nombre de dispositions ?</b>",
      es: "Tres pares de zapatos (cada uno izquierdo y derecho) se colocan en fila. Un zapato izquierdo no puede quedar junto a un derecho de <i>otro</i> par. <b>¿Cuáles de los siguientes valores son iguales al número de disposiciones?</b>",
      ja: "左右そろった靴3足を1列に並べます。左の靴は<i>別の</i>足の右の靴と隣り合ってはいけません。<b>並べ方の数に等しいものはどれですか？</b>",
      zh: "三双鞋（每双左右各一）排成一排，左鞋不能与<i>另一双</i>的右鞋相邻。<b>下列哪些等于排法数？</b>"
    },
    figureText: {
      en: "Six slots in a row with L and R shoes from three colours.",
      fr: "Six emplacements en ligne avec des chaussures G et D de trois couleurs.",
      es: "Seis huecos en fila con zapatos I y D de tres colores.",
      ja: "6つの枠に3色の左右の靴。",
      zh: "六个位置，三种颜色的左右鞋。"
    },
    hint: {
      en: "Wherever the pattern switches between L and R, the two neighbours must be the same pair. Look at the L/R pattern first.",
      fr: "Là où le motif passe de G à D (ou l’inverse), les deux voisines sont de la même paire. Regardez d’abord le motif G/D.",
      es: "Donde el patrón cambia entre I y D, los dos vecinos deben ser del mismo par. Mira primero el patrón I/D.",
      ja: "L と R が切り替わる所の2足は同じペア。まず L/R の並び方を考える。",
      zh: "左右交替处的两只必须同一双，先看左右模式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.4, scale: 50, pad: 16 });
      for (let k = 0; k < 6; k++) F.rect(0.3 + k * 1.0, 0.35, 0.85, 0.7, 'fill-blue', 'fills');
      F.reveal = () => {
      ['L₁', 'L₂', 'L₃', 'R₃', 'R₁', 'R₂'].forEach((t, k) => F.text([0.72 + k * 1.0, 0.7], t, 'pt', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "L₁": {"fr": "L₁", "es": "L₁", "ja": "L₁", "zh": "L₁"},
      "L₂": {"fr": "L₂", "es": "L₂", "ja": "L₂", "zh": "L₂"},
      "L₃": {"fr": "L₃", "es": "L₃", "ja": "L₃", "zh": "L₃"},
      "R₃": {"fr": "R₃", "es": "R₃", "ja": "R₃", "zh": "R₃"},
      "R₁": {"fr": "R₁", "es": "R₁", "ja": "R₁", "zh": "R₁"},
      "R₂": {"fr": "R₂", "es": "R₂", "ja": "R₂", "zh": "R₂"},
      "the middle": {"fr": "le", "es": "el", "ja": "中央の", "zh": "中间的"},
      "match": {"fr": "central se correspondent", "es": "central coinciden", "ja": "は同じペア", "zh": "同双"},
      "casework over the L/R patterns": {"fr": "étude des motifs G/D", "es": "casos según el patrón I/D", "ja": "L/R パターンで場合分け", "zh": "按左右模式分类"}
    },
    options: [
      { tex: "60", correct: true, why: {
        en: "$6\\cdot10$",
        fr: "$6\\cdot10$",
        es: "$6\\cdot10$",
        ja: "$6\\cdot10$",
        zh: "$6\\cdot10$"
      } },
      { tex: "\\tfrac{6!}{12}", correct: true, why: {
        en: "$720/12=60$",
        fr: "$720/12=60$",
        es: "$720/12=60$",
        ja: "$720/12=60$",
        zh: "$720/12=60$"
      } },
      { tex: "72", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "90", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "108", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "120", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "720", correct: false, why: {
        en: "That ignores the rule.",
        fr: "Cela ignore la règle.",
        es: "Ignora la regla.",
        ja: "条件を無視。",
        zh: "忽略了规则。"
      } },
      { tex: "36", correct: false, why: {
        en: "That counts only patterns $LLLRRR$ and $RRRLLL$.",
        fr: "Cela ne compte que $LLLRRR$ et $RRRLLL$.",
        es: "Solo cuenta $LLLRRR$ y $RRRLLL$.",
        ja: "$LLLRRR$ と $RRRLLL$ だけ。",
        zh: "只算了 $LLLRRR$ 与 $RRRLLL$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Switches force pairs",
          fr: "Les changements imposent les paires",
          es: "Los cambios fuerzan pares",
          ja: "切り替えでペアが決まる",
          zh: "交替处强制同双"
        },
        lines: ["LLLRRR:\\ 3!\\cdot2=12\\ (\\text{the middle}\\ L,R\\ \\text{match})"],
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
          en: "All patterns",
          fr: "Tous les motifs",
          es: "Todos los patrones",
          ja: "全パターン",
          zh: "所有模式"
        },
        lines: ["\\text{casework over the L/R patterns}\\Rightarrow60"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "A quick count: fix the first shoe ($6$ ways); $10$ valid continuations remain.",
          fr: "Comptage rapide : fixer la première ($6$ façons) ; il reste $10$ suites valides.",
          es: "Recuento rápido: fija el primer zapato ($6$ formas); quedan $10$ continuaciones válidas.",
          ja: "最初の靴を固定（6通り）、残りは10通り。",
          zh: "快速计数：定第一只（6 种），剩余 10 种合法延续。"
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
