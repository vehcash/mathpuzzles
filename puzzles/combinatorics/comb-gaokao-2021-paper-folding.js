/* combinatorics · Folding paper for paper-cuts
   Gaokao 2021, New Curriculum Paper I (新课标I卷), Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-gaokao-2021-paper-folding",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2021, New Curriculum Paper I (新课标I卷), Question 16",
        fr: "Gaokao 2021, épreuve nationale I (新课标I卷), question 16",
        es: "Gaokao 2021, examen nacional I (新课标I卷), pregunta 16",
        ja: "2021年 中国・高考 新課程標準I卷 第16問",
        zh: "2021年高考数学新课标I卷 第16题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Folding paper for paper-cuts",
      fr: "Plier du papier pour le découpage",
      es: "Doblar papel para recortes",
      ja: "切り紙の折りたたみ",
      zh: "剪纸中的对折"
    },
    statement: {
      en: "A $20\\times12$ (dm) sheet is folded in half along a line of symmetry, again and again, each time along either direction. One fold gives $2$ possible shapes, $10\\times12$ and $20\\times6$, with total area $S_1=240$; two folds give $3$ shapes, $5\\times12$, $10\\times6$, $20\\times3$, with total area $S_2=180$. <b>For four folds, which of the following are true?</b>",
      fr: "Une feuille de $20\\times12$ (dm) est pliée en deux selon un axe de symétrie, encore et encore, à chaque fois dans l’un ou l’autre sens. Un pli donne $2$ formes possibles, $10\\times12$ et $20\\times6$, d’aire totale $S_1=240$ ; deux plis donnent $3$ formes, $5\\times12$, $10\\times6$, $20\\times3$, d’aire totale $S_2=180$. <b>Pour quatre plis, lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una hoja de $20\\times12$ (dm) se dobla por la mitad por un eje de simetría, una y otra vez, cada vez en una u otra dirección. Un doblez da $2$ formas posibles, $10\\times12$ y $20\\times6$, de área total $S_1=240$; dos dobleces dan $3$ formas, $5\\times12$, $10\\times6$, $20\\times3$, de área total $S_2=180$. <b>Con cuatro dobleces, ¿cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$20\\times12$（dm）の紙を対称軸で半分に折ることを、毎回どちらかの向きで繰り返します。1回折ると $10\\times12$、$20\\times6$ の $2$ 種類で面積の和は $S_1=240$、2回折ると $5\\times12$、$10\\times6$、$20\\times3$ の $3$ 種類で $S_2=180$。<b>4回折るとき、次のうち正しいものはどれですか？</b>",
      zh: "把 $20\\times12$（dm）的长方形纸沿对称轴对折，反复进行，每次可沿任一方向。对折 $1$ 次可得 $10\\times12$、$20\\times6$ 两种规格，面积之和 $S_1=240$；对折 $2$ 次可得 $5\\times12$、$10\\times6$、$20\\times3$ 三种规格，面积之和 $S_2=180$。<b>对折 $4$ 次时，下列哪些正确？</b>"
    },
    figureText: {
      en: "The five rectangles possible after four folds, drawn to scale: from 1.25 × 12 to 20 × 0.75. Each has area 15.",
      fr: "Les cinq rectangles possibles après quatre plis, à l’échelle : de 1,25 × 12 à 20 × 0,75. Chacun a une aire de 15.",
      es: "Los cinco rectángulos posibles tras cuatro dobleces, a escala: de 1,25 × 12 a 20 × 0,75. Cada uno tiene área 15.",
      ja: "4回折ったときにできる5種類の長方形（縮尺どおり）：1.25 × 12 から 20 × 0.75 まで。面積はどれも 15。",
      zh: "对折 4 次可能得到的五种长方形（按比例）：从 1.25 × 12 到 20 × 0.75，面积都是 15。"
    },
    hint: {
      en: "Only how many folds go each way matters, not their order.",
      fr: "Seul compte le nombre de plis dans chaque sens, pas leur ordre.",
      es: "Solo importa cuántos dobleces van en cada dirección, no su orden.",
      ja: "各向きに何回折ったかだけが重要で、順序は関係ありません。",
      zh: "只与每个方向折了几次有关，与顺序无关。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.2, scale: 52, pad: 16 });
      const s = 0.14; let x = 0.1;
      for (let k = 0; k <= 4; k++) { const w = 20 / Math.pow(2, k) * s, h = 12 / Math.pow(2, 4 - k) * s;
        F.rect(x, 0.2, w, h, k % 2 ? 'tri fill-yellow' : 'tri fill-blue'); x += w + 0.18; }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "different shapes are possible": {"fr": "formes différentes sont possibles", "es": "formas distintas son posibles", "ja": "種類の形がありうる", "zh": "种不同规格"},
      "each shape has area": {"fr": "chaque forme a une aire de", "es": "cada forma tiene área", "ja": "各形の面積は", "zh": "每种面积为"}
    },
    options: [
      { tex: "5 \\text{ different shapes are possible}", correct: true, why: {
        en: "$k$ folds one way and $4-k$ the other, $k=0,\\dots,4$.",
        fr: "$k$ plis dans un sens et $4-k$ dans l’autre, $k=0,\\dots,4$.",
        es: "$k$ dobleces en un sentido y $4-k$ en el otro, $k=0,\\dots,4$.",
        ja: "一方に $k$ 回、他方に $4-k$ 回（$k=0,\\dots,4$）。",
        zh: "一个方向 $k$ 次、另一方向 $4-k$ 次，$k=0,\\dots,4$。"
      } },
      { tex: "S_4=75", correct: true, why: {
        en: "Each shape has area $\\tfrac{240}{16}=15$, and $5\\cdot15=75$.",
        fr: "Chaque forme a une aire de $\\tfrac{240}{16}=15$, et $5\\cdot15=75$.",
        es: "Cada forma tiene área $\\tfrac{240}{16}=15$, y $5\\cdot15=75$.",
        ja: "各形の面積は $\\tfrac{240}{16}=15$ で $5\\cdot15=75$。",
        zh: "每种面积 $\\tfrac{240}{16}=15$，$5\\cdot15=75$。"
      } },
      { tex: "16 \\text{ different shapes are possible}", correct: false, why: {
        en: "$2^4$ fold sequences, but the order of folds does not change the shape.",
        fr: "$2^4$ suites de plis, mais l’ordre ne change pas la forme.",
        es: "$2^4$ secuencias, pero el orden no cambia la forma.",
        ja: "折り方の列は $2^4$ 通りだが、順序で形は変わらない。",
        zh: "有 $2^4$ 种对折顺序，但顺序不改变形状。"
      } },
      { tex: "4 \\text{ different shapes are possible}", correct: false, why: {
        en: "Misses one end case: all four folds in the same direction.",
        fr: "Oublie un cas extrême : les quatre plis dans le même sens.",
        es: "Olvida un caso extremo: los cuatro dobleces en la misma dirección.",
        ja: "4回とも同じ向きという端の場合を落としている。",
        zh: "漏了四次同向的极端情况。"
      } },
      { tex: "S_4=60", correct: false, why: {
        en: "That is $4\\cdot15$: one shape too few.",
        fr: "C’est $4\\cdot15$ : une forme de moins.",
        es: "Es $4\\cdot15$: una forma de menos.",
        ja: "$4\\cdot15$ で形が1つ足りない。",
        zh: "那是 $4\\cdot15$，少了一种。"
      } },
      { tex: "S_4=15", correct: false, why: {
        en: "That is the area of one shape.",
        fr: "C’est l’aire d’une seule forme.",
        es: "Es el área de una sola forma.",
        ja: "1つの形の面積。",
        zh: "那是一种形状的面积。"
      } },
      { tex: "\\text{each shape has area } 30", correct: false, why: {
        en: "Four halvings: $\\tfrac{240}{16}=15$.",
        fr: "Quatre divisions par deux : $\\tfrac{240}{16}=15$.",
        es: "Cuatro mitades: $\\tfrac{240}{16}=15$.",
        ja: "4回半分にする：$\\tfrac{240}{16}=15$。",
        zh: "四次减半：$\\tfrac{240}{16}=15$。"
      } },
      { tex: "S_4=120", correct: false, why: {
        en: "Would be the case if each shape kept area $24$.",
        fr: "Ce serait le cas si chaque forme gardait une aire de $24$.",
        es: "Sería así si cada forma tuviera área $24$.",
        ja: "各形の面積が $24$ ならそうなるが違う。",
        zh: "若每种面积为 $24$ 才会如此。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Only the counts matter",
          fr: "Seuls les nombres comptent",
          es: "Solo importan los números",
          ja: "回数だけが効く",
          zh: "只看次数"
        },
        lines: ["\\frac{20}{2^k}\\times\\frac{12}{2^{4-k}},\\qquad k=0,1,2,3,4 \\;\\Rightarrow\\; \\boxed{5}"],
        note: {
          en: "With $n$ folds there are $n+1$ shapes.",
          fr: "Avec $n$ plis il y a $n+1$ formes.",
          es: "Con $n$ dobleces hay $n+1$ formas.",
          ja: "$n$ 回折ると $n+1$ 種類。",
          zh: "对折 $n$ 次有 $n+1$ 种。"
        }
      },
      {
        title: {
          en: "Total area",
          fr: "Aire totale",
          es: "Área total",
          ja: "面積の和",
          zh: "面积和"
        },
        lines: ["S_n=(n+1)\\cdot\\frac{240}{2^n}\\;\\Rightarrow\\; S_4=5\\cdot15=\\boxed{75}"],
        note: {
          en: "Check: $S_1=240$, $S_2=180$ as given.",
          fr: "Vérification : $S_1=240$, $S_2=180$ comme annoncé.",
          es: "Comprobación: $S_1=240$, $S_2=180$ como se dice.",
          ja: "確認：$S_1=240$、$S_2=180$ で一致。",
          zh: "检验：$S_1=240$，$S_2=180$，与题设一致。"
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
          en: "One option counts shapes, one adds areas.",
          fr: "Une option compte les formes, une additionne les aires.",
          es: "Una opción cuenta formas y otra suma áreas.",
          ja: "1つは形の数、1つは面積の和。",
          zh: "一个数形状，一个加面积。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
