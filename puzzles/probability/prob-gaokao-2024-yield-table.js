/* probability · Reading a table of grouped yields
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2024-yield-table",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 4",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 4",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 4",
        ja: "2024年 中国・高考 新課程標準II卷 第4問",
        zh: "2024年高考数学新课标II卷 第4题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Reading a table of grouped yields",
      fr: "Lire un tableau de rendements groupés",
      es: "Leer una tabla de rendimientos agrupados",
      ja: "度数分布表を読む",
      zh: "读频数分布表"
    },
    statement: {
      en: "The yields (kg per mu) of $100$ plots of equal area are grouped: $[900,950)$: $6$; $[950,1000)$: $12$; $[1000,1050)$: $18$; $[1050,1100)$: $30$; $[1100,1150)$: $24$; $[1150,1200)$: $10$. <b>Which of the following statements are true?</b>",
      fr: "Les rendements (kg par mu) de $100$ parcelles de même surface sont groupés : $[900,950)$ : $6$ ; $[950,1000)$ : $12$ ; $[1000,1050)$ : $18$ ; $[1050,1100)$ : $30$ ; $[1100,1150)$ : $24$ ; $[1150,1200)$ : $10$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Los rendimientos (kg por mu) de $100$ parcelas de igual superficie se agrupan: $[900,950)$: $6$; $[950,1000)$: $12$; $[1000,1050)$: $18$; $[1050,1100)$: $30$; $[1100,1150)$: $24$; $[1150,1200)$: $10$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "面積の等しい $100$ 区画の収量（kg/ムー）の度数分布：$[900,950)$ が $6$、$[950,1000)$ が $12$、$[1000,1050)$ が $18$、$[1050,1100)$ が $30$、$[1100,1150)$ が $24$、$[1150,1200)$ が $10$。<b>次のうち正しいものはどれですか？</b>",
      zh: "$100$ 块面积相等的试验田亩产量（kg）分组如下：$[900,950)$：$6$；$[950,1000)$：$12$；$[1000,1050)$：$18$；$[1050,1100)$：$30$；$[1100,1150)$：$24$；$[1150,1200)$：$10$。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "A bar chart of the six groups with heights 6, 12, 18, 30, 24 and 10.",
      fr: "Un diagramme en barres des six classes, de hauteurs 6, 12, 18, 30, 24 et 10.",
      es: "Un diagrama de barras de los seis grupos, de alturas 6, 12, 18, 30, 24 y 10.",
      ja: "6つの階級の棒グラフ（高さ 6, 12, 18, 30, 24, 10）。",
      zh: "六组的条形图，高度为 6、12、18、30、24、10。"
    },
    hint: {
      en: "Accumulate the counts from the left until you pass 50.",
      fr: "Cumulez les effectifs depuis la gauche jusqu’à dépasser 50.",
      es: "Acumula las frecuencias desde la izquierda hasta pasar de 50.",
      ja: "左から度数を累積して 50 を超える所を探す。",
      zh: "从左往右累加频数，直到超过 50。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.2, h: 4.4, scale: 46, pad: 16 });
      const c = [6, 12, 18, 30, 24, 10], x0 = 0.6, bw = 1.0, s = 0.11;
      F.seg([x0, 0.5], [x0 + 6 * bw + 0.2, 0.5], 'axis'); F.seg([x0, 0.5], [x0, 0.5 + 33 * s], 'axis');
      c.forEach((v, i) => { F.rect(x0 + i * bw + 0.06, 0.5, bw - 0.12, v * s, 'fill-blue', 'fills'); F.text([x0 + (i + 0.5) * bw, 0.5 + v * s], String(v), 'len small', 0, -8); });
      [900, 950, 1000, 1050, 1100, 1150, 1200].forEach((t, i) => F.text([x0 + i * bw, 0.5], String(t), 'tick', 0, 14));
      F.reveal = () => {
      F.seg([x0 + 3 * bw + 14 / 30 * bw, 0.5], [x0 + 3 * bw + 14 / 30 * bw, 0.5 + 32 * s], 'seg thin dashc');
      F.text([x0 + 3 * bw + 14 / 30 * bw, 0.5 + 32 * s], 'median ≈ 1073', 'len small', 0, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "median ≈ 1073": {"fr": "médiane ≈ 1073", "es": "mediana ≈ 1073", "ja": "中央値 ≈ 1073", "zh": "中位数 ≈ 1073"},
      "the range is between 200 kg and 300 kg": {"fr": "l’étendue est comprise entre 200 kg et 300 kg", "es": "el rango está entre 200 kg y 300 kg", "ja": "範囲は 200 kg と 300 kg の間", "zh": "极差在 200 kg 与 300 kg 之间"},
      "the median lies in": {"fr": "la médiane est dans", "es": "la mediana está en", "ja": "中央値は次の階級：", "zh": "中位数在"},
      "the median is less than 1050 kg": {"fr": "la médiane est inférieure à 1050 kg", "es": "la mediana es menor que 1050 kg", "ja": "中央値は 1050 kg 未満", "zh": "中位数小于 1050 kg"},
      "more than 80\\% of the plots yield less than 1100 kg": {"fr": "plus de 80\\% des parcelles donnent moins de 1100 kg", "es": "más del 80\\% de las parcelas rinde menos de 1100 kg", "ja": "収量 1100 kg 未満の区画は 80\\% を超える", "zh": "亩产量低于 1100 kg 的超过 80\\%"},
      "the mean is between 900 kg and 1000 kg": {"fr": "la moyenne est entre 900 kg et 1000 kg", "es": "la media está entre 900 kg y 1000 kg", "ja": "平均は 900 kg と 1000 kg の間", "zh": "平均数在 900 kg 与 1000 kg 之间"},
      "the modal group is": {"fr": "la classe modale est", "es": "el grupo modal es", "ja": "最頻の階級は", "zh": "众数所在组为"},
      "at least half the plots yield 1100 kg or more": {"fr": "au moins la moitié des parcelles donnent 1100 kg ou plus", "es": "al menos la mitad de las parcelas rinde 1100 kg o más", "ja": "半数以上の区画が 1100 kg 以上", "zh": "至少一半试验田亩产量不低于 1100 kg"},
      "exactly 12\\% of the plots yield less than 1000 kg": {"fr": "exactement 12\\% des parcelles donnent moins de 1000 kg", "es": "exactamente el 12\\% de las parcelas rinde menos de 1000 kg", "ja": "1000 kg 未満の区画はちょうど 12\\%", "zh": "亩产量低于 1000 kg 的恰为 12\\%"},
      "range": {"fr": "étendue", "es": "rango", "ja": "範囲", "zh": "极差"}
    },
    options: [
      { tex: "\\text{the range is between 200 kg and 300 kg}", correct: true, why: {
        en: "All data are in $[900,1200)$, with some below $950$ and some at least $1150$: the range is more than $200$ and less than $300$.",
        fr: "Toutes les valeurs sont dans $[900,1200)$, certaines sous $950$, d’autres au moins $1150$ : l’étendue est entre $200$ et $300$.",
        es: "Todos los datos están en $[900,1200)$, algunos bajo $950$ y otros de al menos $1150$: el rango está entre $200$ y $300$.",
        ja: "データは $[900,1200)$ にあり、$950$ 未満と $1150$ 以上が存在するので範囲は $200$ と $300$ の間。",
        zh: "数据都在 $[900,1200)$，有低于 $950$ 的，也有不低于 $1150$ 的，所以极差在 $200$ 与 $300$ 之间。"
      } },
      { tex: "\\text{the median lies in}\\ [1050,1100)", correct: true, why: {
        en: "Cumulative counts: $6,18,36,66$, so the 50th and 51st values are in the fourth group.",
        fr: "Effectifs cumulés : $6,18,36,66$ ; les 50e et 51e valeurs sont dans la quatrième classe.",
        es: "Frecuencias acumuladas: $6,18,36,66$; los datos 50 y 51 están en el cuarto grupo.",
        ja: "累積度数 $6,18,36,66$。50・51番目は第4階級。",
        zh: "累计频数 $6,18,36,66$，第 50、51 个数据在第四组。"
      } },
      { tex: "\\text{the median is less than 1050 kg}", correct: false, why: {
        en: "Only $36$ plots are below $1050$.",
        fr: "Seules $36$ parcelles sont sous $1050$.",
        es: "Solo $36$ parcelas están por debajo de $1050$.",
        ja: "$1050$ 未満は $36$ 区画だけ。",
        zh: "低于 $1050$ 的只有 $36$ 块。"
      } },
      { tex: "\\text{more than 80\\% of the plots yield less than 1100 kg}", correct: false, why: {
        en: "$6+12+18+30=66$, so $66\\%$.",
        fr: "$6+12+18+30=66$, soit $66\\%$.",
        es: "$6+12+18+30=66$, es decir $66\\%$.",
        ja: "$6+12+18+30=66$ で $66\\%$。",
        zh: "$6+12+18+30=66$，即 $66\\%$。"
      } },
      { tex: "\\text{the mean is between 900 kg and 1000 kg}", correct: false, why: {
        en: "Using midpoints the mean is about $1067$ kg.",
        fr: "Avec les centres des classes, la moyenne vaut environ $1067$ kg.",
        es: "Con las marcas de clase la media es unos $1067$ kg.",
        ja: "階級値で計算すると平均は約 $1067$ kg。",
        zh: "用组中值估计，平均数约 $1067$ kg。"
      } },
      { tex: "\\text{the modal group is}\\ [1100,1150)", correct: false, why: {
        en: "The tallest bar, $30$, is $[1050,1100)$.",
        fr: "La barre la plus haute, $30$, est $[1050,1100)$.",
        es: "La barra más alta, $30$, es $[1050,1100)$.",
        ja: "最も高い棒（$30$）は $[1050,1100)$。",
        zh: "最高的条（$30$）是 $[1050,1100)$。"
      } },
      { tex: "\\text{at least half the plots yield 1100 kg or more}", correct: false, why: {
        en: "Only $24+10=34$ plots do.",
        fr: "Seules $24+10=34$ parcelles.",
        es: "Solo $24+10=34$ parcelas.",
        ja: "$24+10=34$ 区画だけ。",
        zh: "只有 $24+10=34$ 块。"
      } },
      { tex: "\\text{exactly 12\\% of the plots yield less than 1000 kg}", correct: false, why: {
        en: "It is $6+12=18\\%$.",
        fr: "C’est $6+12=18\\%$.",
        es: "Es $6+12=18\\%$.",
        ja: "$6+12=18\\%$。",
        zh: "是 $6+12=18\\%$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cumulative counts",
          fr: "Effectifs cumulés",
          es: "Frecuencias acumuladas",
          ja: "累積度数",
          zh: "累计频数"
        },
        lines: ["6,\\ 18,\\ 36,\\ 66,\\ 90,\\ 100"],
        note: {
          en: "The median falls in $[1050,1100)$; about $1050+\\tfrac{14}{30}\\cdot50\\approx1073$.",
          fr: "La médiane est dans $[1050,1100)$ ; environ $1050+\\tfrac{14}{30}\\cdot50\\approx1073$.",
          es: "La mediana está en $[1050,1100)$; unos $1050+\\tfrac{14}{30}\\cdot50\\approx1073$.",
          ja: "中央値は $[1050,1100)$ にあり、約 $1050+\\tfrac{14}{30}\\cdot50\\approx1073$。",
          zh: "中位数在 $[1050,1100)$，约 $1050+\\tfrac{14}{30}\\cdot50\\approx1073$。"
        }
      },
      {
        title: {
          en: "Mean from midpoints",
          fr: "Moyenne par les centres",
          es: "Media con marcas de clase",
          ja: "階級値で平均",
          zh: "用组中值求平均"
        },
        lines: ["\\bar x\\approx\\tfrac{925\\cdot6+975\\cdot12+1025\\cdot18+1075\\cdot30+1125\\cdot24+1175\\cdot10}{100}=1067"],
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
          en: "Range",
          fr: "Étendue",
          es: "Rango",
          ja: "範囲",
          zh: "极差"
        },
        lines: ["1150-950<\\text{range}<1200-900"],
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
