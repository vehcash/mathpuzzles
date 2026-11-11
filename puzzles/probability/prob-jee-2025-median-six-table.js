/* probability · A frequency table with median 6
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2025-median-six-table",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.14",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.14",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.14",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.14",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.14"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A frequency table with median 6",
      fr: "Un tableau d’effectifs de médiane 6",
      es: "Una tabla de frecuencias con mediana 6",
      ja: "中央値 6 の度数分布表",
      zh: "中位数为 6 的频数表"
    },
    statement: {
      en: "The values $4,5,6,8,9,11,12$ have frequencies $5,f_1,1,f_2,2,3,1$. The total frequency is $19$ and the median is $6$. Let $\\alpha$ and $\\beta$ be the mean deviations about the mean and about the median, and $\\sigma^2$ the variance. <b>Which of the following are true?</b>",
      fr: "Les valeurs $4,5,6,8,9,11,12$ ont pour effectifs $5,f_1,1,f_2,2,3,1$. L’effectif total est $19$ et la médiane vaut $6$. Soient $\\alpha$ et $\\beta$ les écarts moyens à la moyenne et à la médiane, et $\\sigma^2$ la variance. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los valores $4,5,6,8,9,11,12$ tienen frecuencias $5,f_1,1,f_2,2,3,1$. La frecuencia total es $19$ y la mediana es $6$. Sean $\\alpha$ y $\\beta$ las desviaciones medias respecto de la media y de la mediana, y $\\sigma^2$ la varianza. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "値 $4,5,6,8,9,11,12$ の度数は $5,f_1,1,f_2,2,3,1$ で、総度数は $19$、中央値は $6$ です。平均・中央値のまわりの平均偏差を $\\alpha,\\beta$、分散を $\\sigma^2$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "数值 $4,5,6,8,9,11,12$ 的频数为 $5,f_1,1,f_2,2,3,1$，总频数 $19$，中位数 $6$。设 $\\alpha$、$\\beta$ 分别为关于平均数和中位数的平均差，$\\sigma^2$ 为方差。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A bar chart of the frequencies, with the bars at 5 and 8 unknown.",
      fr: "Un diagramme en barres des effectifs, les barres en 5 et 8 inconnues.",
      es: "Un diagrama de barras de las frecuencias, con las barras en 5 y 8 desconocidas.",
      ja: "度数の棒グラフ。5 と 8 の棒は未知。",
      zh: "频数条形图，5 和 8 处的条未知。"
    },
    hint: {
      en: "$f_1+f_2=7$. For the median ($10$th value) to be $6$, the $10$th value must be the single $6$.",
      fr: "$f_1+f_2=7$. Pour que la médiane ($10^\\text{e}$ valeur) soit $6$, la $10^\\text{e}$ valeur doit être l’unique $6$.",
      es: "$f_1+f_2=7$. Para que la mediana (el $10.^\\text{º}$ valor) sea $6$, ese valor debe ser el único $6$.",
      ja: "$f_1+f_2=7$。中央値（10番目）が $6$ なら、10番目がただ1つの $6$。",
      zh: "$f_1+f_2=7$。中位数（第 $10$ 个值）为 $6$，第 $10$ 个必须是唯一的 $6$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 3.2, scale: 50, pad: 16 });
      const X = [4, 5, 6, 8, 9, 11, 12], H = [5, null, 1, null, 2, 3, 1];
      F.seg([0.2, 0.4], [5.8, 0.4], 'seg');
      X.forEach((x, k) => { const px = 0.5 + k * 0.78; if (H[k] !== null) F.rect(px - 0.25, 0.4, 0.5, H[k] * 0.5, 'fill-blue', 'fills'); else F.text([px, 0.9], '?', 'pt', 0, 0); F.text([px, 0.4], String(x), 'tick', 0, 14); });
      F.reveal = () => {
      [[1, 4], [3, 3]].forEach(([k, h]) => F.rect(0.5 + k * 0.78 - 0.25, 0.4, 0.5, h * 0.5, 'fill-yellow', 'fills'));
      F.text([3.0, 3.0], 'mean 7', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "?": {"fr": "?", "es": "?", "ja": "?", "zh": "?"},
      "mean 7": {"fr": "moyenne 7", "es": "media 7", "ja": "平均 7", "zh": "平均数 7"},
      "the mean equals the median": {"fr": "la moyenne égale la médiane", "es": "la media es igual a la mediana", "ja": "平均＝中央値", "zh": "平均数等于中位数"},
      "e": {"fr": "e", "es": "e", "ja": "e", "zh": "e"},
      "º": {"fr": "º", "es": "º", "ja": "º", "zh": "º"}
    },
    options: [
      { tex: "19\\sigma^2=146", correct: true, why: {
        en: "$\\sum f x^2=1077$, so $\\sigma^2=\\tfrac{1077}{19}-49=\\tfrac{146}{19}$.",
        fr: "$\\sum f x^2=1077$, donc $\\sigma^2=\\tfrac{1077}{19}-49=\\tfrac{146}{19}$.",
        es: "$\\sum f x^2=1077$, así $\\sigma^2=\\tfrac{1077}{19}-49=\\tfrac{146}{19}$.",
        ja: "$\\sum f x^2=1077$ より $\\sigma^2=\\tfrac{146}{19}$。",
        zh: "$\\sum f x^2=1077$，故 $\\sigma^2=\\tfrac{146}{19}$。"
      } },
      { tex: "19\\alpha=48", correct: true, why: {
        en: "Mean $\\tfrac{133}{19}=7$; $\\sum f|x-7|=15+8+1+3+4+12+5=48$.",
        fr: "Moyenne $\\tfrac{133}{19}=7$ ; $\\sum f|x-7|=48$.",
        es: "Media $\\tfrac{133}{19}=7$; $\\sum f|x-7|=48$.",
        ja: "平均 $7$、$\\sum f|x-7|=48$。",
        zh: "平均数 $7$，$\\sum f|x-7|=48$。"
      } },
      { tex: "19\\beta=48", correct: false, why: {
        en: "$\\sum f|x-6|=10+4+0+6+6+15+6=47$.",
        fr: "$\\sum f|x-6|=47$.",
        es: "$\\sum f|x-6|=47$.",
        ja: "$\\sum f|x-6|=47$。",
        zh: "$\\sum f|x-6|=47$。"
      } },
      { tex: "7f_1+9f_2=47", correct: false, why: {
        en: "$f_1=4,\\ f_2=3$ gives $55$.",
        fr: "$f_1=4,\\ f_2=3$ donne $55$.",
        es: "$f_1=4,\\ f_2=3$ da $55$.",
        ja: "$f_1=4,\\ f_2=3$ で $55$。",
        zh: "$f_1=4,\\ f_2=3$ 得 $55$。"
      } },
      { tex: "19\\sigma^2=145", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "f_1=3,\\ f_2=4", correct: false, why: {
        en: "Then the $10$th value would be $8$.",
        fr: "Alors la $10^\\text{e}$ valeur serait $8$.",
        es: "Entonces el $10.^\\text{º}$ valor sería $8$.",
        ja: "10番目が $8$ になる。",
        zh: "第 $10$ 个值将是 $8$。"
      } },
      { tex: "\\alpha<\\beta", correct: false, why: {
        en: "$48>47$: here the median gives the smaller mean deviation.",
        fr: "$48>47$ : la médiane donne ici le plus petit écart moyen.",
        es: "$48>47$: la mediana da la menor desviación media.",
        ja: "$48>47$。中央値のほうが小さい。",
        zh: "$48>47$，中位数的平均差更小。"
      } },
      { tex: "\\text{the mean equals the median}", correct: false, why: {
        en: "Mean $7$, median $6$.",
        fr: "Moyenne $7$, médiane $6$.",
        es: "Media $7$, mediana $6$.",
        ja: "平均 $7$、中央値 $6$。",
        zh: "平均数 $7$，中位数 $6$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Find f₁ and f₂",
          fr: "Trouver f₁ et f₂",
          es: "Hallar f₁ y f₂",
          ja: "f₁, f₂ を求める",
          zh: "求 f₁、f₂"
        },
        lines: ["12+f_1+f_2=19,\\quad 5+f_1+1=10\\ \\Rightarrow\\ f_1=4,\\ f_2=3"],
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
          en: "Mean and deviations",
          fr: "Moyenne et écarts",
          es: "Media y desviaciones",
          ja: "平均と偏差",
          zh: "平均数与偏差"
        },
        lines: ["\\bar x=\\tfrac{133}{19}=7,\\quad 19\\alpha=48,\\quad 19\\beta=47", "19\\sigma^2=1077-19\\cdot49=146"],
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
