/* probability · Where was the television bought?
   Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-bac-2024-tv-customer-satisfaction",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 2",
        fr: "Baccalauréat 2024, spécialité mathématiques, Métropole, 19 juin 2024, exercice 2",
        es: "Bachillerato francés (Bac) 2024, especialidad de matemáticas, Metrópoli, 19 de junio de 2024, ejercicio 2",
        ja: "フランス・バカロレア 2024 数学専門 本土 2024年6月19日 第2問",
        zh: "法国高中会考（Bac）2024 数学专业 本土卷 2024年6月19日 第2题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "Where was the television bought?",
      fr: "Où le téléviseur a-t-il été acheté ?",
      es: "¿Dónde se compró el televisor?",
      ja: "テレビはどこで買った？",
      zh: "电视机在哪里买的？"
    },
    statement: {
      en: "A customer bought a TV online with probability $0.6$, in an appliance store with probability $0.3$, and in a supermarket with probability $0.1$. The probability of being satisfied with customer service is $0.75$, $0.9$ and $0.8$ respectively. <b>Which of the following are true?</b>",
      fr: "Un client a acheté un téléviseur sur internet avec probabilité $0{,}6$, en magasin d’électroménager avec probabilité $0{,}3$ et en grande surface avec probabilité $0{,}1$. La probabilité d’être satisfait du service client vaut respectivement $0{,}75$, $0{,}9$ et $0{,}8$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un cliente compró un televisor por internet con probabilidad $0{,}6$, en una tienda de electrodomésticos con probabilidad $0{,}3$ y en un hipermercado con probabilidad $0{,}1$. La probabilidad de estar satisfecho con la atención al cliente es $0{,}75$, $0{,}9$ y $0{,}8$ respectivamente. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "顧客がテレビをネットで買う確率は $0.6$、家電量販店は $0.3$、スーパーは $0.1$ で、カスタマーサービスに満足する確率はそれぞれ $0.75$、$0.9$、$0.8$ です。<b>次のうち正しいものはどれですか？</b>",
      zh: "顾客在网上买电视的概率为 $0.6$，在家电商店为 $0.3$，在超市为 $0.1$；对客服满意的概率分别为 $0.75$、$0.9$、$0.8$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A probability tree: three branches (internet 0.6, store 0.3, supermarket 0.1), each splitting into satisfied / not satisfied.",
      fr: "Un arbre pondéré : trois branches (internet 0,6, magasin 0,3, grande surface 0,1), chacune séparée en satisfait / non satisfait.",
      es: "Un árbol de probabilidades: tres ramas (internet 0,6, tienda 0,3, hipermercado 0,1), cada una dividida en satisfecho / no satisfecho.",
      ja: "確率の樹形図：3本の枝（ネット 0.6、量販店 0.3、スーパー 0.1）が満足／不満足に分かれる。",
      zh: "概率树：三条分支（网上 0.6、商店 0.3、超市 0.1），各自再分为满意 / 不满意。"
    },
    hint: {
      en: "Total probability gives $P(S)$; Bayes gives $P_S(I)$. For the sample, use $1-0.8^n>0.99$.",
      fr: "Les probabilités totales donnent $P(S)$ ; Bayes donne $P_S(I)$. Pour l’échantillon, $1-0{,}8^n>0{,}99$.",
      es: "La probabilidad total da $P(S)$; Bayes da $P_S(I)$. Para la muestra, $1-0{,}8^n>0{,}99$.",
      ja: "全確率で $P(S)$、ベイズで $P_S(I)$。標本は $1-0.8^n>0.99$。",
      zh: "全概率得 $P(S)$，贝叶斯得 $P_S(I)$；样本用 $1-0.8^n>0.99$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 3.8, scale: 52, pad: 16 });
      const O = [0.3, 1.9], B = [[2.2, 3.3, 'I · 0.6'], [2.2, 1.9, 'M · 0.3'], [2.2, 0.5, 'G · 0.1']];
      F.dot(O); B.forEach(([x, y, t], k) => { F.seg(O, [x, y], 'seg'); F.dot([x, y]); F.text([x, y], t, 'len small', 0, -12);
        [[4.2, y + 0.35, 'S · ' + ['0.75', '0.9', '0.8'][k]], [4.2, y - 0.35, 'S̄']].forEach(([X, Y, q]) => { F.seg([x, y], [X, Y], 'seg thin'); F.text([X, Y], q, 'len small', 30, 0); }); });
      F.reveal = () => {
      F.text([3.0, 0.0], 'P(S) = 0.45 + 0.27 + 0.08 = 0.8', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "I · 0.6": {"fr": "I · 0,6", "es": "I · 0,6", "ja": "I · 0.6", "zh": "I · 0.6"},
      "M · 0.3": {"fr": "M · 0,3", "es": "M · 0,3", "ja": "M · 0.3", "zh": "M · 0.3"},
      "G · 0.1": {"fr": "G · 0,1", "es": "G · 0,1", "ja": "G · 0.1", "zh": "G · 0.1"},
      "P(S) = 0.45 + 0.27 + 0.08 = 0.8": {"fr": "P(S) = 0,45 + 0,27 + 0,08 = 0,8", "es": "P(S) = 0,45 + 0,27 + 0,08 = 0,8", "ja": "P(S) = 0.45 + 0.27 + 0.08 = 0.8", "zh": "P(S) = 0.45 + 0.27 + 0.08 = 0.8"},
      "the smallest": {"fr": "le plus petit", "es": "el menor", "ja": "最小の", "zh": "最小的"},
      "with": {"fr": "tel que", "es": "con", "ja": "で", "zh": "使"},
      "at least one unsatisfied": {"fr": "au moins un non satisfait", "es": "al menos uno insatisfecho", "ja": "少なくとも1人が不満", "zh": "至少一人不满意"},
      "is": {"fr": "est", "es": "es", "ja": "は", "zh": "为"},
      "a sample of 30 has binomial": {"fr": "un échantillon de 30 suit une binomiale", "es": "una muestra de 30 sigue una binomial", "ja": "30 人の標本は二項分布", "zh": "30 人样本服从二项分布"}
    },
    options: [
      { tex: "P_S(I)=0.5625", correct: true, why: {
        en: "$\\tfrac{0.6\\cdot0.75}{0.8}=\\tfrac{0.45}{0.8}$.",
        fr: "$\\tfrac{0{,}6\\cdot0{,}75}{0{,}8}=\\tfrac{0{,}45}{0{,}8}$.",
        es: "$\\tfrac{0{,}6\\cdot0{,}75}{0{,}8}=\\tfrac{0{,}45}{0{,}8}$.",
        ja: "$\\tfrac{0.6\\cdot0.75}{0.8}=\\tfrac{0.45}{0.8}$。",
        zh: "$\\tfrac{0.6\\cdot0.75}{0.8}=\\tfrac{0.45}{0.8}$。"
      } },
      { tex: "\\text{the smallest}\\ n\\ \\text{with}\\ P(\\text{at least one unsatisfied})>0.99\\ \\text{is}\\ 21", correct: true, why: {
        en: "$0.8^n<0.01\\iff n>\\tfrac{\\ln0.01}{\\ln0.8}\\approx20.6$.",
        fr: "$0{,}8^n<0{,}01\\iff n>\\tfrac{\\ln0{,}01}{\\ln0{,}8}\\approx20{,}6$.",
        es: "$0{,}8^n<0{,}01\\iff n>\\tfrac{\\ln0{,}01}{\\ln0{,}8}\\approx20{,}6$.",
        ja: "$0.8^n<0.01\\iff n>\\tfrac{\\ln0.01}{\\ln0.8}\\approx20.6$。",
        zh: "$0.8^n<0.01\\iff n>\\tfrac{\\ln0.01}{\\ln0.8}\\approx20.6$。"
      } },
      { tex: "P(S)=0.82", correct: false, why: {
        en: "$0.45+0.27+0.08=0.8$.",
        fr: "$0{,}45+0{,}27+0{,}08=0{,}8$.",
        es: "$0{,}45+0{,}27+0{,}08=0{,}8$.",
        ja: "$0.45+0.27+0.08=0.8$。",
        zh: "$0.45+0.27+0.08=0.8$。"
      } },
      { tex: "P_S(I)=0.75", correct: false, why: {
        en: "That is $P_I(S)$, the other way round.",
        fr: "C’est $P_I(S)$, dans l’autre sens.",
        es: "Es $P_I(S)$, al revés.",
        ja: "逆向きの $P_I(S)$。",
        zh: "那是反过来的 $P_I(S)$。"
      } },
      { tex: "P(I\\cap S)=0.6", correct: false, why: {
        en: "$0.6\\cdot0.75=0.45$.",
        fr: "$0{,}6\\cdot0{,}75=0{,}45$.",
        es: "$0{,}6\\cdot0{,}75=0{,}45$.",
        ja: "$0.6\\cdot0.75=0.45$。",
        zh: "$0.6\\cdot0.75=0.45$。"
      } },
      { tex: "\\text{the smallest}\\ n\\ \\text{with}\\ P(\\text{at least one unsatisfied})>0.99\\ \\text{is}\\ 20", correct: false, why: {
        en: "$0.8^{20}\\approx0.0115>0.01$.",
        fr: "$0{,}8^{20}\\approx0{,}0115>0{,}01$.",
        es: "$0{,}8^{20}\\approx0{,}0115>0{,}01$.",
        ja: "$0.8^{20}\\approx0.0115>0.01$。",
        zh: "$0.8^{20}\\approx0.0115>0.01$。"
      } },
      { tex: "P_S(M)=0.27", correct: false, why: {
        en: "That is $P(M\\cap S)$; divide by $0.8$.",
        fr: "C’est $P(M\\cap S)$ ; divisez par $0{,}8$.",
        es: "Es $P(M\\cap S)$; divide entre $0{,}8$.",
        ja: "$P(M\\cap S)$ であり $0.8$ で割る。",
        zh: "那是 $P(M\\cap S)$，还需除以 $0.8$。"
      } },
      { tex: "\\text{a sample of 30 has binomial}\\ X\\sim\\mathcal B(30,0.75)", correct: false, why: {
        en: "The success probability is $P(S)=0.8$.",
        fr: "La probabilité de succès est $P(S)=0{,}8$.",
        es: "La probabilidad de éxito es $P(S)=0{,}8$.",
        ja: "成功確率は $P(S)=0.8$。",
        zh: "成功概率为 $P(S)=0.8$。"
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
        lines: ["P(S)=0.6\\cdot0.75+0.3\\cdot0.9+0.1\\cdot0.8=0.45+0.27+0.08=0.8"],
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
        lines: ["P_S(I)=\\frac{0.45}{0.8}=0.5625"],
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
          en: "Sample size",
          fr: "Taille d’échantillon",
          es: "Tamaño de muestra",
          ja: "標本の大きさ",
          zh: "样本容量"
        },
        lines: ["1-0.8^n>0.99\\iff n>\\frac{\\ln0.01}{\\ln0.8}\\approx20.6\\ \\Rightarrow\\ n=21"],
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
