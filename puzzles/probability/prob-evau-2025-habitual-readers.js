/* probability · Who reads regularly?
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 4.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-evau-2025-habitual-readers",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 4.2",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 4.2",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 4.2",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 4.2",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 4.2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 1,
    title: {
      en: "Who reads regularly?",
      fr: "Qui lit régulièrement ?",
      es: "¿Quién es lector habitual?",
      ja: "習慣的に読書する人は？",
      zh: "谁经常阅读？"
    },
    statement: {
      en: "Among people aged $14$ or more, $20\\%$ are $14$–$24$ ($A$), $50\\%$ are $25$–$64$ ($B$) and the rest over $64$ ($C$). Habitual readers make up $74\\%$ of $A$, $65.8\\%$ of $B$ and $53.7\\%$ of $C$. <b>Which of the following are true?</b>",
      fr: "Parmi les personnes de $14$ ans ou plus, $20\\,\\%$ ont $14$–$24$ ans ($A$), $50\\,\\%$ ont $25$–$64$ ans ($B$) et le reste plus de $64$ ans ($C$). Les lecteurs habituels représentent $74\\,\\%$ de $A$, $65{,}8\\,\\%$ de $B$ et $53{,}7\\,\\%$ de $C$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Entre las personas de $14$ años o más, el $20\\,\\%$ tiene $14$–$24$ años ($A$), el $50\\,\\%$ $25$–$64$ ($B$) y el resto más de $64$ ($C$). Son lectores habituales el $74\\,\\%$ de $A$, el $65{,}8\\,\\%$ de $B$ y el $53{,}7\\,\\%$ de $C$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "14歳以上の人のうち $20\\%$ が $14$〜$24$ 歳（$A$）、$50\\%$ が $25$〜$64$ 歳（$B$）、残りが $64$ 歳超（$C$）。習慣的な読書家は $A$ の $74\\%$、$B$ の $65.8\\%$、$C$ の $53.7\\%$。<b>次のうち正しいものはどれですか？</b>",
      zh: "$14$ 岁及以上人群中，$20\\%$ 为 $14$–$24$ 岁（$A$），$50\\%$ 为 $25$–$64$ 岁（$B$），其余超过 $64$ 岁（$C$）。经常阅读者占 $A$ 的 $74\\%$、$B$ 的 $65.8\\%$、$C$ 的 $53.7\\%$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A probability tree: three age branches, each splitting into reader and non-reader.",
      fr: "Un arbre de probabilités : trois branches d’âge, chacune divisée en lecteur et non-lecteur.",
      es: "Un árbol de probabilidad: tres ramas de edad, cada una dividida en lector y no lector.",
      ja: "確率の樹形図：年齢の3枝がそれぞれ読書家・非読書家に分かれる。",
      zh: "概率树：三个年龄分支，各分为阅读者与非阅读者。"
    },
    hint: {
      en: "Total probability for $P(L)$, then Bayes: $P(B\\mid\\bar L)=\\dfrac{P(B)\\,P(\\bar L\\mid B)}{1-P(L)}$.",
      fr: "Probabilités totales pour $P(L)$, puis Bayes : $P(B\\mid\\bar L)=\\dfrac{P(B)\\,P(\\bar L\\mid B)}{1-P(L)}$.",
      es: "Probabilidad total para $P(L)$ y luego Bayes: $P(B\\mid\\bar L)=\\dfrac{P(B)\\,P(\\bar L\\mid B)}{1-P(L)}$.",
      ja: "全確率で $P(L)$、次にベイズ：$P(B\\mid\\bar L)=\\dfrac{P(B)\\,P(\\bar L\\mid B)}{1-P(L)}$。",
      zh: "先用全概率求 $P(L)$，再用贝叶斯：$P(B\\mid\\bar L)=\\dfrac{P(B)\\,P(\\bar L\\mid B)}{1-P(L)}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 3.4, scale: 52, pad: 16 });
      const O = [0.3, 1.7];
      [['A', 0.2, 2.9, '0.74'], ['B', 0.5, 1.7, '0.658'], ['C', 0.3, 0.5, '0.537']].forEach(([t, p, y, q]) => { F.seg(O, [2.2, y], 'seg'); if (y === 1.7) F.text([1.6, 1.7], String(p), 'len small', 0, -10); else F.text([1.0, 1.7 + (y - 1.7) * 0.37], String(p), 'len small', -14, y > 1.8 ? -10 : 16); F.text([2.2, y], t, 'pt', 8, 0); F.seg([2.5, y], [4.6, y + 0.3], 'seg thin'); F.seg([2.5, y], [4.6, y - 0.3], 'seg thin'); F.text([4.6, y + 0.3], 'L', 'pt', 10, 0); F.text([4.6, y - 0.3], 'L̄', 'pt', 10, 0); F.text([3.55, y + 0.15], q, 'len small', -6, -14); });
      F.reveal = () => {
      F.text([2.8, 0.05], 'P(L) = 0.6381', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "0.2": {"fr": "0,2", "es": "0,2", "ja": "0.2", "zh": "0.2"},
      "0.5": {"fr": "0,5", "es": "0,5", "ja": "0.5", "zh": "0.5"},
      "0.3": {"fr": "0,3", "es": "0,3", "ja": "0.3", "zh": "0.3"},
      "0.74": {"fr": "0,74", "es": "0,74", "ja": "0.74", "zh": "0.74"},
      "0.658": {"fr": "0,658", "es": "0,658", "ja": "0.658", "zh": "0.658"},
      "0.537": {"fr": "0,537", "es": "0,537", "ja": "0.537", "zh": "0.537"},
      "L̄": {"fr": "L̄", "es": "L̄", "ja": "L̄", "zh": "L̄"},
      "P(L) = 0.6381": {"fr": "P(L) = 0,6381", "es": "P(L) = 0,6381", "ja": "P(L) = 0.6381", "zh": "P(L) = 0.6381"}
    },
    options: [
      { tex: "P(L)=0.6381", correct: true, why: {
        en: "$0.2\\cdot0.74+0.5\\cdot0.658+0.3\\cdot0.537=0.148+0.329+0.1611$",
        fr: "$0.2\\cdot0.74+0.5\\cdot0.658+0.3\\cdot0.537=0.148+0.329+0.1611$",
        es: "$0.2\\cdot0.74+0.5\\cdot0.658+0.3\\cdot0.537=0.148+0.329+0.1611$",
        ja: "$0.2\\cdot0.74+0.5\\cdot0.658+0.3\\cdot0.537=0.148+0.329+0.1611$",
        zh: "$0.2\\cdot0.74+0.5\\cdot0.658+0.3\\cdot0.537=0.148+0.329+0.1611$"
      } },
      { tex: "P(B\\mid\\bar L)\\approx0.4725", correct: true, why: {
        en: "$\\dfrac{0.5\\cdot0.342}{0.3619}=\\dfrac{0.171}{0.3619}$",
        fr: "$\\dfrac{0.5\\cdot0.342}{0.3619}=\\dfrac{0.171}{0.3619}$",
        es: "$\\dfrac{0.5\\cdot0.342}{0.3619}=\\dfrac{0.171}{0.3619}$",
        ja: "$\\dfrac{0.5\\cdot0.342}{0.3619}=\\dfrac{0.171}{0.3619}$",
        zh: "$\\dfrac{0.5\\cdot0.342}{0.3619}=\\dfrac{0.171}{0.3619}$"
      } },
      { tex: "P(B\\mid\\bar L)=0.342", correct: false, why: {
        en: "That is $P(\\bar L\\mid B)$, the reverse condition.",
        fr: "C’est $P(\\bar L\\mid B)$, la condition inverse.",
        es: "Es $P(\\bar L\\mid B)$, la condición al revés.",
        ja: "逆の条件 $P(\\bar L\\mid B)$。",
        zh: "那是反过来的 $P(\\bar L\\mid B)$。"
      } },
      { tex: "P(B\\mid\\bar L)=0.5", correct: false, why: {
        en: "Being a non-reader changes the age mix.",
        fr: "Ne pas lire change la répartition par âge.",
        es: "No leer cambia la distribución por edades.",
        ja: "非読書家だと年齢構成が変わる。",
        zh: "非阅读者的年龄分布不同。"
      } },
      { tex: "P(L)=0.645", correct: false, why: {
        en: "That averages the three rates without weights.",
        fr: "C’est la moyenne non pondérée des trois taux.",
        es: "Es la media sin ponderar de los tres porcentajes.",
        ja: "3つの率を重みなしで平均している。",
        zh: "这是三个比率的不加权平均。"
      } },
      { tex: "P(\\bar L)=0.6381", correct: false, why: {
        en: "That is $P(L)$; $P(\\bar L)=0.3619$.",
        fr: "C’est $P(L)$ ; $P(\\bar L)=0{,}3619$.",
        es: "Es $P(L)$; $P(\\bar L)=0{,}3619$.",
        ja: "それは $P(L)$。$P(\\bar L)=0.3619$。",
        zh: "那是 $P(L)$，$P(\\bar L)=0.3619$。"
      } },
      { tex: "P(B\\cap\\bar L)=0.329", correct: false, why: {
        en: "That is $P(B\\cap L)$; $P(B\\cap\\bar L)=0.171$.",
        fr: "C’est $P(B\\cap L)$ ; $P(B\\cap\\bar L)=0{,}171$.",
        es: "Es $P(B\\cap L)$; $P(B\\cap\\bar L)=0{,}171$.",
        ja: "それは $P(B\\cap L)$。",
        zh: "那是 $P(B\\cap L)$。"
      } },
      { tex: "P(C\\mid L)=0.537", correct: false, why: {
        en: "That is $P(L\\mid C)$.",
        fr: "C’est $P(L\\mid C)$.",
        es: "Es $P(L\\mid C)$.",
        ja: "それは $P(L\\mid C)$。",
        zh: "那是 $P(L\\mid C)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Total probability",
          fr: "Probabilités totales",
          es: "Probabilidad total",
          ja: "全確率",
          zh: "全概率"
        },
        lines: ["P(L)=0.148+0.329+0.1611=0.6381"],
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
          en: "Bayes",
          fr: "Bayes",
          es: "Bayes",
          ja: "ベイズ",
          zh: "贝叶斯"
        },
        lines: ["P(B\\mid\\bar L)=\\frac{0.5\\cdot0.342}{1-0.6381}=\\frac{0.171}{0.3619}\\approx0.4725"],
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
