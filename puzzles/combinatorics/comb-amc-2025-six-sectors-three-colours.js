/* combinatorics · Six sectors, three colours, each used twice
   AMC 12B 2025 (Mathematical Association of America), Problem 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-amc-2025-six-sectors-three-colours",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 13",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 13",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 13",
        ja: "AMC 12B 2025（アメリカ数学協会）第13問",
        zh: "AMC 12B 2025（美国数学协会）第 13 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "Six sectors, three colours, each used twice",
      fr: "Six secteurs, trois couleurs, chacune deux fois",
      es: "Seis sectores, tres colores, cada uno dos veces",
      ja: "6つの扇形を3色で2回ずつ",
      zh: "六个扇形三种颜色各用两次"
    },
    statement: {
      en: "A circle is cut into $6$ different sectors. Each of red, green and blue colours exactly $2$ sectors, and neighbouring sectors (including sector $6$ and sector $1$) have different colours. <b>Which of the following equal the number of colourings?</b>",
      fr: "Un cercle est découpé en $6$ secteurs distincts. Le rouge, le vert et le bleu colorient chacun exactement $2$ secteurs, et deux secteurs voisins (y compris le $6$ et le $1$) sont de couleurs différentes. <b>Lesquelles des valeurs suivantes sont égales au nombre de coloriages ?</b>",
      es: "Un círculo se divide en $6$ sectores distintos. Rojo, verde y azul colorean exactamente $2$ sectores cada uno, y sectores vecinos (incluidos el $6$ y el $1$) tienen colores distintos. <b>¿Cuáles de los siguientes valores son iguales al número de coloreados?</b>",
      ja: "円を $6$ つの異なる扇形に分け、赤・緑・青をちょうど $2$ つずつ塗ります。隣り合う扇形（$6$ と $1$ も隣）は異なる色です。<b>塗り方の数に等しいものはどれですか？</b>",
      zh: "圆被分为 $6$ 个不同的扇形，红、绿、蓝各涂恰好 $2$ 个，相邻扇形（包括第 $6$ 与第 $1$）颜色不同。<b>下列哪些等于涂色方法数？</b>"
    },
    figureText: {
      en: "A circle divided into six numbered sectors.",
      fr: "Un cercle divisé en six secteurs numérotés.",
      es: "Un círculo dividido en seis sectores numerados.",
      ja: "番号付きの6つの扇形に分けた円。",
      zh: "分成六个编号扇形的圆。"
    },
    hint: {
      en: "Split by how many colours sit on opposite sectors ($1$&$4$, $2$&$5$, $3$&$6$).",
      fr: "Distinguez selon le nombre de couleurs placées sur des secteurs opposés ($1$&$4$, $2$&$5$, $3$&$6$).",
      es: "Separa según cuántos colores están en sectores opuestos ($1$&$4$, $2$&$5$, $3$&$6$).",
      ja: "向かい合う扇形（$1$&$4$、$2$&$5$、$3$&$6$）に置かれる色の数で場合分け。",
      zh: "按有几种颜色位于对顶扇形（$1$&$4$、$2$&$5$、$3$&$6$）分类。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 70, pad: 16 });
      const c = [1.6, 1.6]; F.circle(c, 1.3, 'fill-yellow');
      for (let k = 0; k < 6; k++) { const t = k * Math.PI / 3; F.seg(c, [1.6 + 1.3 * Math.cos(t), 1.6 + 1.3 * Math.sin(t)], 'seg'); const m = t + Math.PI / 6; F.text([1.6 + 0.8 * Math.cos(m), 1.6 + 0.8 * Math.sin(m)], String(k + 1), 'pt', 0, 0); }
      F.reveal = () => {
      F.text([1.6, 0.05], '6 + 18', 'len small', 0, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "6 + 18": {"fr": "6 + 18", "es": "6 + 18", "ja": "6 + 18", "zh": "6 + 18"},
      "choices": {"fr": "choix", "es": "opciones", "ja": "通り", "zh": "种"},
      "completions": {"fr": "complétions", "es": "formas de completar", "ja": "通りの埋め方", "zh": "种补法"}
    },
    options: [
      { tex: "24", correct: true, why: {
        en: "$3!\\cdot1+18=24$",
        fr: "$3!\\cdot1+18=24$",
        es: "$3!\\cdot1+18=24$",
        ja: "$3!\\cdot1+18=24$",
        zh: "$3!\\cdot1+18=24$"
      } },
      { tex: "3\\cdot2\\cdot4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "18", correct: false, why: {
        en: "That forgets the $6$ colourings with every colour opposite itself.",
        fr: "Oubli des $6$ coloriages où chaque couleur fait face à elle-même.",
        es: "Olvida los $6$ coloreados con cada color enfrente de sí mismo.",
        ja: "各色が向かい合う6通りを忘れている。",
        zh: "漏了每种颜色都对顶的 $6$ 种。"
      } },
      { tex: "28", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "90", correct: false, why: {
        en: "That ignores the neighbour rule: $\\tfrac{6!}{2!^3}$.",
        fr: "Cela ignore la règle des voisins : $\\tfrac{6!}{2!^3}$.",
        es: "Ignora la regla de vecinos: $\\tfrac{6!}{2!^3}$.",
        ja: "隣の条件を無視：$\\tfrac{6!}{2!^3}$。",
        zh: "忽略了相邻条件：$\\tfrac{6!}{2!^3}$。"
      } },
      { tex: "4", correct: false, why: {
        en: "That counts up to rotation, but the sectors are distinct.",
        fr: "Cela compte à rotation près, or les secteurs sont distincts.",
        es: "Cuenta salvo rotación, pero los sectores son distintos.",
        ja: "回転同一視だが扇形は区別される。",
        zh: "按旋转同构计，但扇形各不相同。"
      } }
    ],
    steps: [
      {
        title: {
          en: "First two sectors",
          fr: "Deux premiers secteurs",
          es: "Primeros dos sectores",
          ja: "最初の2つ",
          zh: "前两个扇形"
        },
        lines: ["3\\cdot2\\ \\text{choices}"],
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
          en: "Complete the circle",
          fr: "Compléter le cercle",
          es: "Completar el círculo",
          ja: "残りを埋める",
          zh: "补全圆周"
        },
        lines: ["4\\ \\text{completions}\\Rightarrow3\\cdot2\\cdot4=24"],
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
