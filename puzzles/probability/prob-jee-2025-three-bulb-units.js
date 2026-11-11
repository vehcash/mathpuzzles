/* probability · Which unit made the faulty bulb?
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2025-three-bulb-units",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.11",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.11",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.11",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.11",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.11"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Which unit made the faulty bulb?",
      fr: "Quelle unité a fait l’ampoule défectueuse ?",
      es: "¿Qué unidad hizo la bombilla defectuosa?",
      ja: "不良電球はどの工場製？",
      zh: "次品灯泡出自哪个车间？"
    },
    statement: {
      en: "Units $M_1,M_2,M_3$ make bulbs in the ratio $2:2:1$. Overall $20\\%$ of bulbs are defective, $15\\%$ of $M_1$’s bulbs are defective, and a defective bulb comes from $M_2$ with probability $\\tfrac25$. <b>Which of the following equal the probability that a bulb from $M_3$ is defective?</b>",
      fr: "Les unités $M_1,M_2,M_3$ produisent des ampoules dans le rapport $2:2:1$. Au total $20\\,\\%$ des ampoules sont défectueuses, $15\\,\\%$ de celles de $M_1$ le sont, et une ampoule défectueuse vient de $M_2$ avec probabilité $\\tfrac25$. <b>Lesquelles des valeurs suivantes sont égales à la probabilité qu’une ampoule de $M_3$ soit défectueuse ?</b>",
      es: "Las unidades $M_1,M_2,M_3$ fabrican bombillas en la razón $2:2:1$. En total el $20\\,\\%$ son defectuosas, el $15\\,\\%$ de las de $M_1$ lo son, y una bombilla defectuosa procede de $M_2$ con probabilidad $\\tfrac25$. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que una bombilla de $M_3$ sea defectuosa?</b>",
      ja: "工場 $M_1,M_2,M_3$ は電球を $2:2:1$ の比で作ります。全体の不良率は $20\\%$、$M_1$ の不良率は $15\\%$、不良品が $M_2$ 製である確率は $\\tfrac25$ です。<b>$M_3$ 製の電球が不良である確率に等しいものはどれですか？</b>",
      zh: "车间 $M_1,M_2,M_3$ 按 $2:2:1$ 生产灯泡。总次品率 $20\\%$，$M_1$ 的次品率 $15\\%$，次品来自 $M_2$ 的概率为 $\\tfrac25$。<b>下列哪些等于 $M_3$ 所产灯泡为次品的概率？</b>"
    },
    figureText: {
      en: "Three bars for the units, widths 2 : 2 : 1, with the defective part of each shaded.",
      fr: "Trois barres pour les unités, largeurs 2 : 2 : 1, la partie défectueuse ombrée.",
      es: "Tres barras para las unidades, anchos 2 : 2 : 1, con la parte defectuosa sombreada.",
      ja: "各工場の棒（幅 2 : 2 : 1）。不良部分に影。",
      zh: "三个车间的条形（宽 2 : 2 : 1），次品部分阴影。"
    },
    hint: {
      en: "$P(M_2\\cap D)=P(M_2\\mid D)\\,P(D)=\\tfrac25\\cdot0.2$. Then use the total probability formula for $P(D)$.",
      fr: "$P(M_2\\cap D)=P(M_2\\mid D)\\,P(D)=\\tfrac25\\cdot0{,}2$. Puis la formule des probabilités totales pour $P(D)$.",
      es: "$P(M_2\\cap D)=P(M_2\\mid D)\\,P(D)=\\tfrac25\\cdot0{,}2$. Luego la probabilidad total para $P(D)$.",
      ja: "$P(M_2\\cap D)=P(M_2\\mid D)\\,P(D)=\\tfrac25\\cdot0.2$。次に全確率の公式。",
      zh: "$P(M_2\\cap D)=P(M_2\\mid D)\\,P(D)=\\tfrac25\\cdot0.2$，再用全概率公式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 2.6, scale: 52, pad: 16 });
      [[0.3, 2, 'M₁', 0.15], [2.4, 2, 'M₂', null], [4.5, 1, 'M₃', null]].forEach(([x, w, t, d]) => { F.rect(x, 0.3, w * 0.5 * 1.9, 1.8, 'fill-blue', 'fills'); F.text([x + w * 0.475, 2.3], t, 'pt', 0, 0); if (d) { F.rect(x, 0.3, w * 0.95, 1.8 * d, 'fill-pink', 'fills'); F.text([x + w * 0.475, 0.3], '15 %', 'len small', 0, 14); } });
      F.reveal = () => {
      F.rect(2.4, 0.3, 1.9, 0.36, 'fill-pink', 'fills'); F.text([3.35, 0.3], '20 %', 'len small', 0, 14);
      F.rect(4.5, 0.3, 0.95, 0.54, 'fill-pink', 'fills'); F.text([4.97, 0.3], '30 %', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "15 %": {"fr": "15 %", "es": "15 %", "ja": "15 %", "zh": "15 %"},
      "20 %": {"fr": "20 %", "es": "20 %", "ja": "20 %", "zh": "20 %"},
      "30 %": {"fr": "30 %", "es": "30 %", "ja": "30 %", "zh": "30 %"}
    },
    options: [
      { tex: "0.3", correct: true, why: {
        en: "$0.2=0.4(0.15)+0.4(0.2)+0.2\\,p$ gives $p=0.3$.",
        fr: "$0{,}2=0{,}4(0{,}15)+0{,}4(0{,}2)+0{,}2\\,p$ donne $p=0{,}3$.",
        es: "$0{,}2=0{,}4(0{,}15)+0{,}4(0{,}2)+0{,}2\\,p$ da $p=0{,}3$.",
        ja: "$0.2=0.4(0.15)+0.4(0.2)+0.2p$ より $p=0.3$。",
        zh: "$0.2=0.4(0.15)+0.4(0.2)+0.2p$，得 $p=0.3$。"
      } },
      { tex: "\\tfrac{3}{10}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "0.2", correct: false, why: {
        en: "That is $M_2$’s defect rate.",
        fr: "C’est le taux de $M_2$.",
        es: "Es la tasa de $M_2$.",
        ja: "$M_2$ の不良率。",
        zh: "那是 $M_2$ 的次品率。"
      } },
      { tex: "0.25", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0.35", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0.4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0.06", correct: false, why: {
        en: "That is $P(M_3\\cap D)$, not the conditional probability.",
        fr: "C’est $P(M_3\\cap D)$, pas la probabilité conditionnelle.",
        es: "Es $P(M_3\\cap D)$, no la condicional.",
        ja: "$P(M_3\\cap D)$ で条件付きではない。",
        zh: "那是 $P(M_3\\cap D)$，不是条件概率。"
      } },
      { tex: "\\tfrac15", correct: false, why: {
        en: "That is $P(M_3)$.",
        fr: "C’est $P(M_3)$.",
        es: "Es $P(M_3)$.",
        ja: "$P(M_3)$ の値。",
        zh: "那是 $P(M_3)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "M₂’s defect rate",
          fr: "Taux de M₂",
          es: "Tasa de M₂",
          ja: "M₂ の不良率",
          zh: "M₂ 的次品率"
        },
        lines: ["P(D\\mid M_2)=\\frac{P(M_2\\mid D)P(D)}{P(M_2)}=\\frac{\\frac25\\cdot0.2}{0.4}=0.2"],
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
          en: "Total probability",
          fr: "Probabilités totales",
          es: "Probabilidad total",
          ja: "全確率",
          zh: "全概率"
        },
        lines: ["0.2=0.4\\cdot0.15+0.4\\cdot0.2+0.2\\,p\\ \\Rightarrow\\ p=\\boxed{0.3}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam the answer was a number to type in; here it is turned into choices.",
          fr: "Dans l’épreuve la réponse était un nombre à saisir ; il est transformé ici en choix.",
          es: "En el examen la respuesta era un número que escribir; aquí se convierte en opciones.",
          ja: "原題は数値入力式。ここでは選択式にした。",
          zh: "原题为数值填空，此处改为选择题。"
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
