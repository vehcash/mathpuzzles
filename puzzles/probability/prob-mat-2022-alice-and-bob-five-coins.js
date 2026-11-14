/* probability · Alice and Bob each toss five coins
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-mat-2022-alice-and-bob-five-coins",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1I",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1I",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1I",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1I",
        zh: "牛津大学数学入学考试 MAT 2022 第 1I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Alice and Bob each toss five coins",
      fr: "Alice et Bob lancent chacun cinq pièces",
      es: "Alicia y Bob lanzan cinco monedas cada uno",
      ja: "アリスとボブがそれぞれ硬貨を5枚投げる",
      zh: "爱丽丝和鲍勃各掷五枚硬币"
    },
    statement: {
      en: "Alice and Bob each toss five fair coins. Whoever gets more heads wins; equal numbers of heads is a draw. Let $p_1$ be the probability that Alice wins and $p_2$ the probability of a draw. <b>Which of the following are true?</b>",
      fr: "Alice et Bob lancent chacun cinq pièces équilibrées. Celui qui obtient le plus de piles gagne ; à égalité c’est un match nul. Soit $p_1$ la probabilité qu’Alice gagne et $p_2$ celle d’un match nul. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Alicia y Bob lanzan cada uno cinco monedas equilibradas. Gana quien saque más caras; con el mismo número hay empate. Sea $p_1$ la probabilidad de que gane Alicia y $p_2$ la de empate. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "アリスとボブはそれぞれ公正な硬貨を5枚投げます。表が多い方が勝ち、同数なら引き分けです。アリスが勝つ確率を $p_1$、引き分けの確率を $p_2$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "爱丽丝和鲍勃各掷五枚均匀硬币，正面多者胜，相同为平局。设爱丽丝获胜的概率为 $p_1$，平局概率为 $p_2$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The binomial counts 1, 5, 10, 10, 5, 1 for 0 to 5 heads.",
      fr: "Les effectifs binomiaux 1, 5, 10, 10, 5, 1 pour 0 à 5 piles.",
      es: "Los recuentos binomiales 1, 5, 10, 10, 5, 1 para 0 a 5 caras.",
      ja: "表の数 0〜5 の場合の数 1, 5, 10, 10, 5, 1。",
      zh: "正面数 0 到 5 的二项计数 1, 5, 10, 10, 5, 1。"
    },
    hint: {
      en: "Find $p_2=\\sum\\binom5k^2/2^{10}$ first; by symmetry $p_1=(1-p_2)/2$.",
      fr: "Calculez d’abord $p_2=\\sum\\binom5k^2/2^{10}$ ; par symétrie $p_1=(1-p_2)/2$.",
      es: "Halla primero $p_2=\\sum\\binom5k^2/2^{10}$; por simetría $p_1=(1-p_2)/2$.",
      ja: "まず $p_2=\\sum\\binom5k^2/2^{10}$。対称性より $p_1=(1-p_2)/2$。",
      zh: "先求 $p_2=\\sum\\binom5k^2/2^{10}$，由对称性 $p_1=(1-p_2)/2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.8, scale: 46, pad: 16 });
      [1, 5, 10, 10, 5, 1].forEach((c, k) => { F.rect(0.4 + k * 1.0, 0.4, 0.7, c * 0.2, 'fill-blue', 'fills'); F.text([0.75 + k * 1.0, 0.4 + c * 0.2], String(c), 'len small', 0, -10); F.text([0.75 + k * 1.0, 0.4], String(k), 'tick', 0, 14); });
      F.reveal = () => {
      F.text([3.2, 2.6], '1+25+100+100+25+1 = 252', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1+25+100+100+25+1 = 252": {"fr": "1+25+100+100+25+1 = 252", "es": "1+25+100+100+25+1 = 252", "ja": "1+25+100+100+25+1 = 252", "zh": "1+25+100+100+25+1 = 252"}
    },
    options: [
      { tex: "p_2=\\tfrac{63}{256}", correct: true, why: {
        en: "$\\tfrac{252}{1024}=\\tfrac{63}{256}$",
        fr: "$\\tfrac{252}{1024}=\\tfrac{63}{256}$",
        es: "$\\tfrac{252}{1024}=\\tfrac{63}{256}$",
        ja: "$\\tfrac{252}{1024}=\\tfrac{63}{256}$",
        zh: "$\\tfrac{252}{1024}=\\tfrac{63}{256}$"
      } },
      { tex: "p_1=\\tfrac{193}{512}", correct: true, why: {
        en: "$p_1=\\tfrac12\\left(1-\\tfrac{63}{256}\\right)=\\tfrac{193}{512}$",
        fr: "$p_1=\\tfrac12\\left(1-\\tfrac{63}{256}\\right)=\\tfrac{193}{512}$",
        es: "$p_1=\\tfrac12\\left(1-\\tfrac{63}{256}\\right)=\\tfrac{193}{512}$",
        ja: "$p_1=\\tfrac12\\left(1-\\tfrac{63}{256}\\right)=\\tfrac{193}{512}$",
        zh: "$p_1=\\tfrac12\\left(1-\\tfrac{63}{256}\\right)=\\tfrac{193}{512}$"
      } },
      { tex: "p_2=\\tfrac{13}{256}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p_1=\\tfrac{243}{512}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "p_1=p_2=\\tfrac13", correct: false, why: {
        en: "The three outcomes are not equally likely.",
        fr: "Les trois issues ne sont pas équiprobables.",
        es: "Los tres resultados no son equiprobables.",
        ja: "3つの結果は同様に確からしくない。",
        zh: "三种结果并不等可能。"
      } },
      { tex: "p_1=\\tfrac12", correct: false, why: {
        en: "Ignores draws.",
        fr: "Oublie les matchs nuls.",
        es: "Olvida los empates.",
        ja: "引き分けを無視。",
        zh: "忽略了平局。"
      } },
      { tex: "p_2=\\tfrac{1}{6}", correct: false, why: {
        en: "Treats the six head counts as equally likely.",
        fr: "Traite les six nombres de piles comme équiprobables.",
        es: "Trata los seis números de caras como equiprobables.",
        ja: "表の数6通りを等確率とみなしている。",
        zh: "把六种正面数当成等可能。"
      } },
      { tex: "p_1+p_2=1", correct: false, why: {
        en: "Bob can win too: $2p_1+p_2=1$.",
        fr: "Bob peut aussi gagner : $2p_1+p_2=1$.",
        es: "Bob también puede ganar: $2p_1+p_2=1$.",
        ja: "ボブも勝ちうる：$2p_1+p_2=1$。",
        zh: "鲍勃也可能赢：$2p_1+p_2=1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Draw",
          fr: "Match nul",
          es: "Empate",
          ja: "引き分け",
          zh: "平局"
        },
        lines: ["p_2=\\dfrac{\\sum_{k=0}^5\\binom5k^2}{2^{10}}=\\dfrac{\\binom{10}5}{1024}=\\dfrac{252}{1024}=\\dfrac{63}{256}"],
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
          en: "Symmetry",
          fr: "Symétrie",
          es: "Simetría",
          ja: "対称性",
          zh: "对称性"
        },
        lines: ["p_1=\\tfrac12(1-p_2)=\\tfrac{193}{512}"],
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
