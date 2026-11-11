/* probability · Blood groups and the universal donor
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-bac-2025-universal-donor",
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
    difficulty: 2,
    title: {
      en: "Blood groups and the universal donor",
      fr: "Groupes sanguins et donneur universel",
      es: "Grupos sanguíneos y donante universal",
      ja: "血液型と万能供血者",
      zh: "血型与万能献血者"
    },
    statement: {
      en: "In France $P(A)=0.45$, $P(B)=0.10$, $P(AB)=0.03$, the rest being group $O$. Rhesus positive ($R$): $P_A(R)=0.85$, $P_B(R)=0.84$, $P_{AB}(R)=0.82$, and overall $P(R)=0.8397$. A universal donor is $O$ and rhesus negative. <b>Which of the following are true?</b>",
      fr: "En France $P(A)=0{,}45$, $P(B)=0{,}10$, $P(AB)=0{,}03$, le reste étant du groupe $O$. Rhésus positif ($R$) : $P_A(R)=0{,}85$, $P_B(R)=0{,}84$, $P_{AB}(R)=0{,}82$, et au total $P(R)=0{,}8397$. Un donneur universel est $O$ et de rhésus négatif. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "En Francia $P(A)=0{,}45$, $P(B)=0{,}10$, $P(AB)=0{,}03$, y el resto es del grupo $O$. Rh positivo ($R$): $P_A(R)=0{,}85$, $P_B(R)=0{,}84$, $P_{AB}(R)=0{,}82$, y en total $P(R)=0{,}8397$. Un donante universal es $O$ y Rh negativo. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "フランスでは $P(A)=0.45$、$P(B)=0.10$、$P(AB)=0.03$、残りは $O$ 型。Rh 陽性 $R$ は $P_A(R)=0.85$、$P_B(R)=0.84$、$P_{AB}(R)=0.82$、全体で $P(R)=0.8397$。万能供血者は $O$ 型かつ Rh 陰性です。<b>次のうち正しいものはどれですか？</b>",
      zh: "在法国 $P(A)=0.45$，$P(B)=0.10$，$P(AB)=0.03$，其余为 $O$ 型。Rh 阳性 $R$：$P_A(R)=0.85$，$P_B(R)=0.84$，$P_{AB}(R)=0.82$，总体 $P(R)=0.8397$。万能献血者是 $O$ 型且 Rh 阴性。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A probability tree with four blood groups, each splitting into R and R̄; the O branches are unknown.",
      fr: "Un arbre à quatre groupes, chacun divisé en R et R̄ ; les branches O sont inconnues.",
      es: "Un árbol con cuatro grupos, cada uno dividido en R y R̄; las ramas de O son desconocidas.",
      ja: "4つの血液型がそれぞれ R と R̄ に分かれる樹形図。O の枝は未知。",
      zh: "四种血型各分 R 与 R̄ 的概率树，O 的分支未知。"
    },
    hint: {
      en: "$P(O)=0.42$. Total probability gives $0.8397=0.3825+0.084+0.0246+0.42\\,P_O(R)$.",
      fr: "$P(O)=0{,}42$. Les probabilités totales donnent $0{,}8397=0{,}3825+0{,}084+0{,}0246+0{,}42\\,P_O(R)$.",
      es: "$P(O)=0{,}42$. La probabilidad total da $0{,}8397=0{,}3825+0{,}084+0{,}0246+0{,}42\\,P_O(R)$.",
      ja: "$P(O)=0.42$。全確率より $0.8397=0.3825+0.084+0.0246+0.42P_O(R)$。",
      zh: "$P(O)=0.42$，全概率：$0.8397=0.3825+0.084+0.0246+0.42P_O(R)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 3.8, scale: 50, pad: 16 });
      const O = [0.3, 1.9];
      [['A', 3.4], ['B', 2.4], ['AB', 1.4], ['O', 0.4]].forEach(([t, y]) => { F.seg(O, [2.2, y], 'seg'); F.text([2.2, y], t, 'pt', 12, 0); F.seg([2.7, y], [4.6, y + 0.22], 'seg thin'); F.seg([2.7, y], [4.6, y - 0.22], 'seg thin'); F.text([4.6, y + 0.22], 'R', 'pt', 10, 0); F.text([4.6, y - 0.22], 'R̄', 'pt', 10, 0); });
      F.text([3.6, 0.6], '?', 'pt', 0, -4);
      F.reveal = () => {
      F.text([3.6, 0.6], '0.83', 'len small', 22, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "R̄": {"fr": "R̄", "es": "R̄", "ja": "R̄", "zh": "R̄"},
      "AB": {"fr": "AB", "es": "AB", "ja": "AB", "zh": "AB"},
      "?": {"fr": "?", "es": "?", "ja": "?", "zh": "?"},
      "0.83": {"fr": "0,83", "es": "0,83", "ja": "0.83", "zh": "0.83"}
    },
    options: [
      { tex: "P_O(R)=0.83", correct: true, why: {
        en: "$\\dfrac{0.8397-0.4911}{0.42}=\\dfrac{0.3486}{0.42}$",
        fr: "$\\dfrac{0.8397-0.4911}{0.42}=\\dfrac{0.3486}{0.42}$",
        es: "$\\dfrac{0.8397-0.4911}{0.42}=\\dfrac{0.3486}{0.42}$",
        ja: "$\\dfrac{0.8397-0.4911}{0.42}=\\dfrac{0.3486}{0.42}$",
        zh: "$\\dfrac{0.8397-0.4911}{0.42}=\\dfrac{0.3486}{0.42}$"
      } },
      { tex: "P(O\\cap\\bar R)=0.0714", correct: true, why: {
        en: "$0.42\\cdot0.17$",
        fr: "$0.42\\cdot0.17$",
        es: "$0.42\\cdot0.17$",
        ja: "$0.42\\cdot0.17$",
        zh: "$0.42\\cdot0.17$"
      } },
      { tex: "P(O\\cap\\bar R)=0.1603", correct: false, why: {
        en: "That is $P(\\bar R)$ for the whole population.",
        fr: "C’est $P(\\bar R)$ pour toute la population.",
        es: "Es $P(\\bar R)$ de toda la población.",
        ja: "全体の $P(\\bar R)$。",
        zh: "那是总体的 $P(\\bar R)$。"
      } },
      { tex: "P_O(R)=0.8397", correct: false, why: {
        en: "That is the overall rate, not the rate within group $O$.",
        fr: "C’est le taux global, pas celui du groupe $O$.",
        es: "Es la tasa global, no la del grupo $O$.",
        ja: "全体の率で $O$ 型内の率ではない。",
        zh: "那是总体比率，不是 $O$ 型内的比率。"
      } },
      { tex: "P(B\\cap R)=0.84", correct: false, why: {
        en: "$P(B\\cap R)=0.10\\cdot0.84=0.084$",
        fr: "$P(B\\cap R)=0.10\\cdot0.84=0.084$",
        es: "$P(B\\cap R)=0.10\\cdot0.84=0.084$",
        ja: "$P(B\\cap R)=0.10\\cdot0.84=0.084$",
        zh: "$P(B\\cap R)=0.10\\cdot0.84=0.084$"
      } },
      { tex: "P(O)=0.52", correct: false, why: {
        en: "$1-0.45-0.10-0.03=0.42$",
        fr: "$1-0.45-0.10-0.03=0.42$",
        es: "$1-0.45-0.10-0.03=0.42$",
        ja: "$1-0.45-0.10-0.03=0.42$",
        zh: "$1-0.45-0.10-0.03=0.42$"
      } },
      { tex: "P_R(O)=0.83", correct: false, why: {
        en: "Order of conditioning swapped.",
        fr: "Ordre du conditionnement inversé.",
        es: "Orden de la condición invertido.",
        ja: "条件の向きが逆。",
        zh: "条件方向反了。"
      } },
      { tex: "P(O\\cap\\bar R)=0.0714\\cdot0.42", correct: false, why: {
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
          en: "Total probability",
          fr: "Probabilités totales",
          es: "Probabilidad total",
          ja: "全確率",
          zh: "全概率"
        },
        lines: ["0.8397=0.45\\cdot0.85+0.10\\cdot0.84+0.03\\cdot0.82+0.42\\,P_O(R)\\Rightarrow P_O(R)=0.83"],
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
          en: "Universal donor",
          fr: "Donneur universel",
          es: "Donante universal",
          ja: "万能供血者",
          zh: "万能献血者"
        },
        lines: ["P(O\\cap\\bar R)=0.42\\cdot(1-0.83)=0.0714"],
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
