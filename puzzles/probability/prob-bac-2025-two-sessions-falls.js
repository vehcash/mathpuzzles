/* probability · Falling in the first or second session
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-bac-2025-two-sessions-falls",
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
      en: "Falling in the first or second session",
      fr: "Chuter à la première ou à la deuxième séance",
      es: "Caerse en la primera o la segunda sesión",
      ja: "1回目・2回目の練習で転ぶ",
      zh: "第一次或第二次练习时摔倒"
    },
    statement: {
      en: "A beginner takes two sessions. $A$: falls in the first; $B$: falls in the second. $P(A)=0.6$, $P_A(B)=0.3$, $P_{\\bar A}(B)=0.4$. <b>Which of the following are true?</b>",
      fr: "Un débutant suit deux séances. $A$ : il chute à la première ; $B$ : il chute à la deuxième. $P(A)=0{,}6$, $P_A(B)=0{,}3$, $P_{\\bar A}(B)=0{,}4$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un principiante hace dos sesiones. $A$: se cae en la primera; $B$: se cae en la segunda. $P(A)=0{,}6$, $P_A(B)=0{,}3$, $P_{\\bar A}(B)=0{,}4$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "初心者が2回練習します。$A$：1回目に転ぶ、$B$：2回目に転ぶ。$P(A)=0.6$、$P_A(B)=0.3$、$P_{\\bar A}(B)=0.4$。<b>次のうち正しいものはどれですか？</b>",
      zh: "初学者练习两次。$A$：第一次摔倒；$B$：第二次摔倒。$P(A)=0.6$，$P_A(B)=0.3$，$P_{\\bar A}(B)=0.4$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A two-level tree: A or Ā, then B or B̄.",
      fr: "Un arbre à deux niveaux : A ou Ā, puis B ou B̄.",
      es: "Un árbol de dos niveles: A o Ā, y luego B o B̄.",
      ja: "2段の樹形図：A か Ā、次に B か B̄。",
      zh: "两层树：A 或 Ā，然后 B 或 B̄。"
    },
    hint: {
      en: "$P(\\bar A\\cap\\bar B)=0.4\\cdot0.6$ and $P(\\bar B)=1-P(B)$.",
      fr: "$P(\\bar A\\cap\\bar B)=0{,}4\\cdot0{,}6$ et $P(\\bar B)=1-P(B)$.",
      es: "$P(\\bar A\\cap\\bar B)=0{,}4\\cdot0{,}6$ y $P(\\bar B)=1-P(B)$.",
      ja: "$P(\\bar A\\cap\\bar B)=0.4\\cdot0.6$、$P(\\bar B)=1-P(B)$。",
      zh: "$P(\\bar A\\cap\\bar B)=0.4\\cdot0.6$，$P(\\bar B)=1-P(B)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.2, scale: 52, pad: 16 });
      const O = [0.3, 1.6];
      [['A', 2.6, '0.6', '0.3'], ['Ā', 0.6, '0.4', '0.4']].forEach(([t, y, p, q]) => { F.seg(O, [2.0, y], 'seg'); F.text([1.15, (1.6 + y) / 2], p, 'len small', -14, y > 1.6 ? -10 : 16); F.text([2.0, y], t, 'pt', 10, 0); F.seg([2.4, y], [4.3, y + 0.4], 'seg thin'); F.seg([2.4, y], [4.3, y - 0.4], 'seg thin'); F.text([4.3, y + 0.4], 'B', 'pt', 10, 0); F.text([4.3, y - 0.4], 'B̄', 'pt', 10, 0); F.text([3.3, y + 0.2], q, 'len small', -8, -16); });
      F.reveal = () => {
      F.text([3.3, 0.0], '0.24', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Ā": {"fr": "Ā", "es": "Ā", "ja": "Ā", "zh": "Ā"},
      "B̄": {"fr": "B̄", "es": "B̄", "ja": "B̄", "zh": "B̄"},
      "0.6": {"fr": "0,6", "es": "0,6", "ja": "0.6", "zh": "0.6"},
      "0.4": {"fr": "0,4", "es": "0,4", "ja": "0.4", "zh": "0.4"},
      "0.3": {"fr": "0,3", "es": "0,3", "ja": "0.3", "zh": "0.3"},
      "0.24": {"fr": "0,24", "es": "0,24", "ja": "0.24", "zh": "0.24"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "are independent": {"fr": "sont indépendants", "es": "son independientes", "ja": "は独立", "zh": "相互独立"}
    },
    options: [
      { tex: "P(B)=0.34", correct: true, why: {
        en: "$0.6\\cdot0.3+0.4\\cdot0.4$",
        fr: "$0.6\\cdot0.3+0.4\\cdot0.4$",
        es: "$0.6\\cdot0.3+0.4\\cdot0.4$",
        ja: "$0.6\\cdot0.3+0.4\\cdot0.4$",
        zh: "$0.6\\cdot0.3+0.4\\cdot0.4$"
      } },
      { tex: "P_{\\bar B}(\\bar A)=\\tfrac{0.24}{0.66}\\approx0.364", correct: true, why: {
        en: "$P(\\bar A\\cap\\bar B)=0.24$, $P(\\bar B)=0.66$",
        fr: "$P(\\bar A\\cap\\bar B)=0.24$, $P(\\bar B)=0.66$",
        es: "$P(\\bar A\\cap\\bar B)=0.24$, $P(\\bar B)=0.66$",
        ja: "$P(\\bar A\\cap\\bar B)=0.24$, $P(\\bar B)=0.66$",
        zh: "$P(\\bar A\\cap\\bar B)=0.24$, $P(\\bar B)=0.66$"
      } },
      { tex: "P(A\\cap B)=0.24", correct: false, why: {
        en: "$P(A\\cap B)=0.6\\cdot0.3=0.18$, $P(\\bar A\\cap\\bar B)=0.24$",
        fr: "$P(A\\cap B)=0.6\\cdot0.3=0.18$, $P(\\bar A\\cap\\bar B)=0.24$",
        es: "$P(A\\cap B)=0.6\\cdot0.3=0.18$, $P(\\bar A\\cap\\bar B)=0.24$",
        ja: "$P(A\\cap B)=0.6\\cdot0.3=0.18$, $P(\\bar A\\cap\\bar B)=0.24$",
        zh: "$P(A\\cap B)=0.6\\cdot0.3=0.18$, $P(\\bar A\\cap\\bar B)=0.24$"
      } },
      { tex: "P_{\\bar B}(\\bar A)=0.6", correct: false, why: {
        en: "That is $P_{\\bar A}(\\bar B)$, the reverse condition.",
        fr: "C’est $P_{\\bar A}(\\bar B)$.",
        es: "Es $P_{\\bar A}(\\bar B)$.",
        ja: "それは $P_{\\bar A}(\\bar B)$。",
        zh: "那是 $P_{\\bar A}(\\bar B)$。"
      } },
      { tex: "P(B)=0.35", correct: false, why: {
        en: "That averages $0.3$ and $0.4$ without weights.",
        fr: "Moyenne non pondérée de $0{,}3$ et $0{,}4$.",
        es: "Media sin ponderar de $0{,}3$ y $0{,}4$.",
        ja: "重みなしの平均。",
        zh: "不加权平均。"
      } },
      { tex: "A\\ \\text{and}\\ B\\ \\text{are independent}", correct: false, why: {
        en: "$P_A(B)=0.3\\ne P_{\\bar A}(B)=0.4$",
        fr: "$P_A(B)=0.3\\ne P_{\\bar A}(B)=0.4$",
        es: "$P_A(B)=0.3\\ne P_{\\bar A}(B)=0.4$",
        ja: "$P_A(B)=0.3\\ne P_{\\bar A}(B)=0.4$",
        zh: "$P_A(B)=0.3\\ne P_{\\bar A}(B)=0.4$"
      } },
      { tex: "P(\\bar B)=0.34", correct: false, why: {
        en: "$P(\\bar B)=1-0.34=0.66$",
        fr: "$P(\\bar B)=1-0.34=0.66$",
        es: "$P(\\bar B)=1-0.34=0.66$",
        ja: "$P(\\bar B)=1-0.34=0.66$",
        zh: "$P(\\bar B)=1-0.34=0.66$"
      } },
      { tex: "P_{\\bar B}(\\bar A)=0.24", correct: false, why: {
        en: "That is the joint probability, not the conditional one.",
        fr: "C’est la probabilité de l’intersection, pas la conditionnelle.",
        es: "Es la probabilidad conjunta, no la condicionada.",
        ja: "同時確率で条件付きではない。",
        zh: "那是联合概率，不是条件概率。"
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
        lines: ["P(B)=0.18+0.16=0.34"],
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
          en: "Reverse conditioning",
          fr: "Conditionnement inverse",
          es: "Condición inversa",
          ja: "逆の条件付き",
          zh: "逆条件"
        },
        lines: ["P_{\\bar B}(\\bar A)=\\frac{0.4\\cdot0.6}{0.66}=\\frac{0.24}{0.66}\\approx0.364"],
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
