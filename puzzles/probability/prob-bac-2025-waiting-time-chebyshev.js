/* probability · Two waiting times over a weekend
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-bac-2025-waiting-time-chebyshev",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 1",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 2 (18 juin 2025), exercice 1",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 2 (18 de junio de 2025), ejercicio 1",
        ja: "フランス・バカロレア 2025 数学専門 本土 2日目（2025年6月18日）第1問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第2天（2025年6月18日）第1题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "Two waiting times over a weekend",
      fr: "Deux temps d’attente sur un week-end",
      es: "Dos tiempos de espera en un fin de semana",
      ja: "週末の2つの待ち時間",
      zh: "周末的两段等待时间"
    },
    statement: {
      en: "Independent waiting times (minutes): $E(T_1)=40$, $\\sigma(T_1)=10$, $E(T_2)=60$, $\\sigma(T_2)=16$, and $T=T_1+T_2$. <b>Which of the following are true?</b>",
      fr: "Temps d’attente indépendants (minutes) : $E(T_1)=40$, $\\sigma(T_1)=10$, $E(T_2)=60$, $\\sigma(T_2)=16$, et $T=T_1+T_2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Tiempos de espera independientes (minutos): $E(T_1)=40$, $\\sigma(T_1)=10$, $E(T_2)=60$, $\\sigma(T_2)=16$, y $T=T_1+T_2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "独立な待ち時間（分）：$E(T_1)=40$、$\\sigma(T_1)=10$、$E(T_2)=60$、$\\sigma(T_2)=16$、$T=T_1+T_2$。<b>次のうち正しいものはどれですか？</b>",
      zh: "独立的等待时间（分钟）：$E(T_1)=40$，$\\sigma(T_1)=10$，$E(T_2)=60$，$\\sigma(T_2)=16$，$T=T_1+T_2$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two bars of length 40 and 60 joined end to end, with spread marks of ±10 and ±16.",
      fr: "Deux barres de longueur 40 et 60 mises bout à bout, avec des marques d’écart ±10 et ±16.",
      es: "Dos barras de 40 y 60 unidas, con marcas de dispersión ±10 y ±16.",
      ja: "長さ 40 と 60 の棒をつなげ、±10、±16 のばらつき。",
      zh: "长 40 与 60 的两条首尾相接，标出 ±10、±16 的离散度。"
    },
    hint: {
      en: "Means add; for independent variables, variances (not standard deviations) add.",
      fr: "Les espérances s’ajoutent ; pour des variables indépendantes, ce sont les variances (pas les écarts-types) qui s’ajoutent.",
      es: "Las esperanzas se suman; con variables independientes se suman las varianzas (no las desviaciones típicas).",
      ja: "平均は足せる。独立なら分散（標準偏差ではない）を足す。",
      zh: "期望相加；独立时方差（不是标准差）相加。"
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
      F.rect(0.3, 0.6, 2.0, 0.5, 'fill-blue', 'fills'); F.rect(2.3, 0.6, 3.0, 0.5, 'fill-yellow', 'fills');
      F.text([1.3, 0.85], 'T₁ ≈ 40 ± 10', 'len small', 0, 0); F.text([3.8, 0.85], 'T₂ ≈ 60 ± 16', 'len small', 0, 0);
      F.reveal = () => {
      F.text([2.8, 0.25], 'V(T) = 100 + 256', 'len small', 0, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "T₁ ≈ 40 ± 10": {"fr": "T₁ ≈ 40 ± 10", "es": "T₁ ≈ 40 ± 10", "ja": "T₁ ≈ 40 ± 10", "zh": "T₁ ≈ 40 ± 10"},
      "T₂ ≈ 60 ± 16": {"fr": "T₂ ≈ 60 ± 16", "es": "T₂ ≈ 60 ± 16", "ja": "T₂ ≈ 60 ± 16", "zh": "T₂ ≈ 60 ± 16"},
      "V(T) = 100 + 256": {"fr": "V(T) = 100 + 256", "es": "V(T) = 100 + 256", "ja": "V(T) = 100 + 256", "zh": "V(T) = 100 + 256"}
    },
    options: [
      { tex: "V(T)=356", correct: true, why: {
        en: "$10^2+16^2$",
        fr: "$10^2+16^2$",
        es: "$10^2+16^2$",
        ja: "$10^2+16^2$",
        zh: "$10^2+16^2$"
      } },
      { tex: "P(60<T<140)\\ge0.7775", correct: true, why: {
        en: "$P(|T-100|\\ge40)\\le\\tfrac{356}{1600}=0.2225$",
        fr: "$P(|T-100|\\ge40)\\le\\tfrac{356}{1600}=0.2225$",
        es: "$P(|T-100|\\ge40)\\le\\tfrac{356}{1600}=0.2225$",
        ja: "$P(|T-100|\\ge40)\\le\\tfrac{356}{1600}=0.2225$",
        zh: "$P(|T-100|\\ge40)\\le\\tfrac{356}{1600}=0.2225$"
      } },
      { tex: "\\sigma(T)=26", correct: false, why: {
        en: "Standard deviations do not add: $\\sigma(T)=\\sqrt{356}\\approx18.9$.",
        fr: "Les écarts-types ne s’ajoutent pas : $\\sigma(T)=\\sqrt{356}\\approx18{,}9$.",
        es: "Las desviaciones típicas no se suman: $\\sigma(T)=\\sqrt{356}\\approx18{,}9$.",
        ja: "標準偏差は足せない。$\\sqrt{356}\\approx18.9$。",
        zh: "标准差不能相加：$\\sqrt{356}\\approx18.9$。"
      } },
      { tex: "V(T)=676", correct: false, why: {
        en: "$(10+16)^2=676\\ne10^2+16^2$",
        fr: "$(10+16)^2=676\\ne10^2+16^2$",
        es: "$(10+16)^2=676\\ne10^2+16^2$",
        ja: "$(10+16)^2=676\\ne10^2+16^2$",
        zh: "$(10+16)^2=676\\ne10^2+16^2$"
      } },
      { tex: "E(T)=50", correct: false, why: {
        en: "$E(T)=40+60=100$",
        fr: "$E(T)=40+60=100$",
        es: "$E(T)=40+60=100$",
        ja: "$E(T)=40+60=100$",
        zh: "$E(T)=40+60=100$"
      } },
      { tex: "P(60<T<140)\\le0.7775", correct: false, why: {
        en: "Chebyshev gives a lower bound for the inside, not an upper one.",
        fr: "Tchebychev minore la probabilité de l’intervalle, il ne la majore pas.",
        es: "Chebyshov acota por abajo la probabilidad del intervalo.",
        ja: "チェビシェフは区間内の確率の下界を与える。",
        zh: "切比雪夫给出区间内概率的下界。"
      } },
      { tex: "P(60<T<140)\\ge0.9", correct: false, why: {
        en: "Chebyshev alone guarantees only $0.7775$.",
        fr: "Tchebychev seul garantit seulement $0{,}7775$.",
        es: "Chebyshov solo garantiza $0{,}7775$.",
        ja: "チェビシェフだけでは $0.7775$ まで。",
        zh: "仅凭切比雪夫只能保证 $0.7775$。"
      } },
      { tex: "V(T)=3.56", correct: false, why: {
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
          en: "Add",
          fr: "Additionner",
          es: "Sumar",
          ja: "足す",
          zh: "相加"
        },
        lines: ["E(T)=100,\\quad V(T)=100+256=356"],
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
          en: "Chebyshev with δ = 40",
          fr: "Tchebychev avec δ = 40",
          es: "Chebyshov con δ = 40",
          ja: "δ = 40 のチェビシェフ",
          zh: "取 δ = 40 的切比雪夫"
        },
        lines: ["P(|T-100|\\ge40)\\le\\frac{356}{40^2}=0.2225\\Rightarrow P(60<T<140)\\ge0.7775"],
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
