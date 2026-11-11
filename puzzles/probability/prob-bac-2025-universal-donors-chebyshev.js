/* probability · How many towns to pin down the average?
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-bac-2025-universal-donors-chebyshev",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 1",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 1 (17 juin 2025), exercice 1",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 1 (17 de junio de 2025), ejercicio 1",
        ja: "フランス・バカロレア 2025 数学専門 本土 1日目（2025年6月17日）第1問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第1天（2025年6月17日）第1题"
      },
      exams: ["bac"]
    },
    difficulty: 3,
    title: {
      en: "How many towns to pin down the average?",
      fr: "Combien de villes pour cerner la moyenne ?",
      es: "¿Cuántas ciudades para fijar la media?",
      ja: "平均を絞り込むには何都市？",
      zh: "需要多少城市才能锁定均值？"
    },
    statement: {
      en: "In each town, $100$ people are tested; $X\\sim\\mathcal B(100;\\,0.0714)$ counts universal donors. For $N$ towns with independent counts $X_1,\\dots,X_N$ of the same law, $M_N=\\tfrac{X_1+\\dots+X_N}{N}$. <b>Which of the following are true?</b> (Use the Bienaymé–Chebyshev inequality.)",
      fr: "Dans chaque ville on teste $100$ personnes ; $X\\sim\\mathcal B(100\\,;0{,}0714)$ compte les donneurs universels. Pour $N$ villes, de comptages indépendants $X_1,\\dots,X_N$ de même loi, $M_N=\\tfrac{X_1+\\dots+X_N}{N}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b> (Utiliser l’inégalité de Bienaymé–Tchebychev.)",
      es: "En cada ciudad se analizan $100$ personas; $X\\sim\\mathcal B(100;\\,0{,}0714)$ cuenta los donantes universales. Para $N$ ciudades con recuentos independientes $X_1,\\dots,X_N$ de igual ley, $M_N=\\tfrac{X_1+\\dots+X_N}{N}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b> (Usa la desigualdad de Bienaymé–Chebyshov.)",
      ja: "各都市で $100$ 人を調べ、$X\\sim\\mathcal B(100,0.0714)$ は万能供血者の数。$N$ 都市の独立な同分布の数 $X_1,\\dots,X_N$ に対し $M_N=\\tfrac{X_1+\\dots+X_N}{N}$。<b>次のうち正しいものはどれですか？</b>（チェビシェフの不等式を使う）",
      zh: "每个城市检测 $100$ 人，$X\\sim\\mathcal B(100,0.0714)$ 为万能献血者人数。$N$ 个城市的人数 $X_1,\\dots,X_N$ 独立同分布，$M_N=\\tfrac{X_1+\\dots+X_N}{N}$。<b>下列哪些正确？</b>（使用切比雪夫不等式）"
    },
    figureText: {
      en: "A number line centred on 7.14 with the window from 7 to 7.28 marked.",
      fr: "Une droite graduée centrée en 7,14 avec la fenêtre de 7 à 7,28.",
      es: "Una recta numérica centrada en 7,14 con la ventana de 7 a 7,28.",
      ja: "7.14 を中心とした数直線と 7〜7.28 の区間。",
      zh: "以 7.14 为中心的数轴，标出 7 到 7.28 的区间。"
    },
    hint: {
      en: "$V(M_N)=\\tfrac{V(X)}N$ with $V(X)=100\\cdot0.0714\\cdot0.9286\\approx6.63$. Want $P(|M_N-7.14|\\ge0.14)\\le0.05$.",
      fr: "$V(M_N)=\\tfrac{V(X)}N$ avec $V(X)\\approx6{,}63$. On veut $P(|M_N-7{,}14|\\ge0{,}14)\\le0{,}05$.",
      es: "$V(M_N)=\\tfrac{V(X)}N$ con $V(X)\\approx6{,}63$. Queremos $P(|M_N-7{,}14|\\ge0{,}14)\\le0{,}05$.",
      ja: "$V(M_N)=\\tfrac{V(X)}N$、$V(X)\\approx6.63$。$P(|M_N-7.14|\\ge0.14)\\le0.05$ にしたい。",
      zh: "$V(M_N)=\\tfrac{V(X)}N$，$V(X)\\approx6.63$，要 $P(|M_N-7.14|\\ge0.14)\\le0.05$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 50, pad: 16 });
      F.seg([0.3, 0.8], [5.7, 0.8], 'seg');
      [[1.5, '7'], [3.0, '7.14'], [4.5, '7.28']].forEach(([x, t]) => { F.seg([x, 0.7], [x, 0.9], 'seg'); F.text([x, 0.8], t, 'tick', 0, 16); });
      F.rect(1.5, 0.75, 3.0, 0.1, 'fill-yellow', 'fills');
      F.reveal = () => {
      F.text([3.0, 1.35], 'ε = 0.14', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "7": {"fr": "7", "es": "7", "ja": "7", "zh": "7"},
      "7.14": {"fr": "7,14", "es": "7,14", "ja": "7.14", "zh": "7.14"},
      "7.28": {"fr": "7,28", "es": "7,28", "ja": "7.28", "zh": "7.28"},
      "ε = 0.14": {"fr": "ε = 0,14", "es": "ε = 0,14", "ja": "ε = 0.14", "zh": "ε = 0.14"},
      "is the smallest": {"fr": "est le plus petit", "es": "es el menor", "ja": "が最小の", "zh": "是最小的"},
      "the inequality guarantees": {"fr": "que l’inégalité garantit", "es": "que garantiza la desigualdad", "ja": "（不等式が保証する）", "zh": "（不等式所保证的）"}
    },
    options: [
      { tex: "V(M_N)\\approx\\tfrac{6.63}{N}", correct: true, why: {
        en: "$V(M_N)=\\tfrac{1}{N^2}\\cdot N\\cdot V(X)$",
        fr: "$V(M_N)=\\tfrac{1}{N^2}\\cdot N\\cdot V(X)$",
        es: "$V(M_N)=\\tfrac{1}{N^2}\\cdot N\\cdot V(X)$",
        ja: "$V(M_N)=\\tfrac{1}{N^2}\\cdot N\\cdot V(X)$",
        zh: "$V(M_N)=\\tfrac{1}{N^2}\\cdot N\\cdot V(X)$"
      } },
      { tex: "N=6766\\ \\text{is the smallest}\\ N\\ \\text{the inequality guarantees}", correct: true, why: {
        en: "$\\dfrac{6.63}{N\\cdot0.14^2}\\le0.05\\iff N\\ge6765.3$",
        fr: "$\\dfrac{6.63}{N\\cdot0.14^2}\\le0.05\\iff N\\ge6765.3$",
        es: "$\\dfrac{6.63}{N\\cdot0.14^2}\\le0.05\\iff N\\ge6765.3$",
        ja: "$\\dfrac{6.63}{N\\cdot0.14^2}\\le0.05\\iff N\\ge6765.3$",
        zh: "$\\dfrac{6.63}{N\\cdot0.14^2}\\le0.05\\iff N\\ge6765.3$"
      } },
      { tex: "N=6765", correct: false, why: {
        en: "$6765<6765.3$",
        fr: "$6765<6765.3$",
        es: "$6765<6765.3$",
        ja: "$6765<6765.3$",
        zh: "$6765<6765.3$"
      } },
      { tex: "N=339", correct: false, why: {
        en: "That forgets the $0.05$: $6.63/0.14^2\\approx338.3$.",
        fr: "Oubli du $0{,}05$ : $6{,}63/0{,}14^2\\approx338{,}3$.",
        es: "Se olvida el $0{,}05$: $6{,}63/0{,}14^2\\approx338{,}3$.",
        ja: "$0.05$ を忘れている。",
        zh: "漏了 $0.05$。"
      } },
      { tex: "V(M_N)=6.63", correct: false, why: {
        en: "Averaging divides the variance by $N$.",
        fr: "La moyenne divise la variance par $N$.",
        es: "Promediar divide la varianza entre $N$.",
        ja: "平均すると分散は $1/N$。",
        zh: "取平均使方差除以 $N$。"
      } },
      { tex: "E(M_N)=\\tfrac{7.14}{N}", correct: false, why: {
        en: "$E(M_N)=E(X)=7.14$",
        fr: "$E(M_N)=E(X)=7.14$",
        es: "$E(M_N)=E(X)=7.14$",
        ja: "$E(M_N)=E(X)=7.14$",
        zh: "$E(M_N)=E(X)=7.14$"
      } },
      { tex: "V(X)=7.14", correct: false, why: {
        en: "$V(X)=np(1-p)\\approx6.63$, $E(X)=7.14$",
        fr: "$V(X)=np(1-p)\\approx6.63$, $E(X)=7.14$",
        es: "$V(X)=np(1-p)\\approx6.63$, $E(X)=7.14$",
        ja: "$V(X)=np(1-p)\\approx6.63$, $E(X)=7.14$",
        zh: "$V(X)=np(1-p)\\approx6.63$, $E(X)=7.14$"
      } },
      { tex: "V(M_N)=\\tfrac{6.63}{N^2}", correct: false, why: {
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
          en: "Mean and variance",
          fr: "Espérance et variance",
          es: "Esperanza y varianza",
          ja: "平均と分散",
          zh: "期望与方差"
        },
        lines: ["E(M_N)=7.14,\\quad V(M_N)=\\tfrac{6.63}{N}"],
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
          en: "Chebyshev",
          fr: "Tchebychev",
          es: "Chebyshov",
          ja: "チェビシェフ",
          zh: "切比雪夫"
        },
        lines: ["P(|M_N-7.14|\\ge0.14)\\le\\frac{6.63}{0.0196\\,N}\\le0.05\\iff N\\ge6765.3\\Rightarrow N=6766"],
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
