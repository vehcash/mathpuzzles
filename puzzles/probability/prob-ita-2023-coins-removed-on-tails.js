/* probability · Tossing coins until they are all gone
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 45 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-ita-2023-coins-removed-on-tails",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 45",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 45",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 45",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第45問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 45 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Tossing coins until they are all gone",
      fr: "Lancer des pièces jusqu’à ce qu’il n’en reste plus",
      es: "Lanzar monedas hasta que no quede ninguna",
      ja: "コインがなくなるまで投げる",
      zh: "抛硬币直到全部被拿走"
    },
    statement: {
      en: "Four fair coins are tossed together, again and again. After each round, every coin showing tails is removed. The game ends when no coins are left. <b>Which of the following equal the probability that the game lasts more than three rounds?</b>",
      fr: "On lance ensemble quatre pièces équilibrées, encore et encore. Après chaque tour, on retire toutes les pièces tombées sur pile. Le jeu s’arrête quand il ne reste plus de pièce. <b>Lesquelles des valeurs suivantes sont égales à la probabilité que le jeu dure plus de trois tours ?</b>",
      es: "Se lanzan juntas cuatro monedas equilibradas una y otra vez. Tras cada ronda se retiran las que salen cruz. El juego termina cuando no queda ninguna. <b>¿Cuáles de los siguientes valores son iguales a la probabilidad de que el juego dure más de tres rondas?</b>",
      ja: "公正なコイン4枚を何度も同時に投げ、毎回裏が出たコインを取り除きます。コインがなくなったら終了です。<b>ゲームが3回より長く続く確率に等しいものはどれですか？</b>",
      zh: "把 4 枚均匀硬币一起反复抛掷，每轮后拿走所有反面朝上的硬币，硬币全部拿走时游戏结束。<b>下列哪些等于游戏持续超过三轮的概率？</b>"
    },
    figureText: {
      en: "Four coins in a row over three rounds, some crossed out as they are removed.",
      fr: "Quatre pièces sur trois tours, certaines barrées quand elles sont retirées.",
      es: "Cuatro monedas durante tres rondas, algunas tachadas al retirarse.",
      ja: "3回分の4枚のコイン。取り除いたものに×。",
      zh: "三轮中的四枚硬币，被拿走的划掉。"
    },
    hint: {
      en: "Follow one coin: it survives three rounds with probability $\\left(\\tfrac12\\right)^3$. The game lasts longer iff at least one coin survives.",
      fr: "Suivez une pièce : elle survit à trois tours avec probabilité $\\left(\\tfrac12\\right)^3$. Le jeu dure plus longtemps ssi au moins une pièce survit.",
      es: "Sigue una moneda: sobrevive tres rondas con probabilidad $\\left(\\tfrac12\\right)^3$. El juego dura más si y solo si sobrevive al menos una.",
      ja: "1枚に注目：3回生き残る確率は $\\left(\\tfrac12\\right)^3$。少なくとも1枚生き残れば続く。",
      zh: "看一枚硬币：三轮都留下的概率为 $\\left(\\tfrac12\\right)^3$；至少一枚留下时游戏才继续。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 52, pad: 16 });
      const alive = [[1, 1, 1, 1], [1, 0, 1, 1], [1, 0, 0, 1]];
      alive.forEach((r, i) => r.forEach((a, j) => { const c = [0.9 + j * 1.1, 2.5 - i * 0.9]; F.circle(c, 0.3, a ? 'fill-yellow' : 'fill-blue'); if (!a) F.seg([c[0] - 0.25, c[1] - 0.25], [c[0] + 0.25, c[1] + 0.25], 'hl pink'); }));
      F.reveal = () => {
      F.text([2.5, 0.25], '(7/8)⁴', 'len small', 0, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(7/8)⁴": {"fr": "(7/8)⁴", "es": "(7/8)⁴", "ja": "(7/8)⁴", "zh": "(7/8)⁴"},
      "survives 3 rounds": {"fr": "survit 3 tours", "es": "sobrevive 3 rondas", "ja": "3回生き残る", "zh": "三轮都留下"}
    },
    options: [
      { tex: "\\tfrac{1695}{4096}", correct: true, why: {
        en: "$1-\\left(\\tfrac78\\right)^4=1-\\tfrac{2401}{4096}$",
        fr: "$1-\\left(\\tfrac78\\right)^4=1-\\tfrac{2401}{4096}$",
        es: "$1-\\left(\\tfrac78\\right)^4=1-\\tfrac{2401}{4096}$",
        ja: "$1-\\left(\\tfrac78\\right)^4=1-\\tfrac{2401}{4096}$",
        zh: "$1-\\left(\\tfrac78\\right)^4=1-\\tfrac{2401}{4096}$"
      } },
      { tex: "1-\\left(\\tfrac78\\right)^4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{2401}{4096}", correct: false, why: {
        en: "That is the probability that every coin is gone within three rounds.",
        fr: "C’est la probabilité que toutes les pièces soient parties en trois tours.",
        es: "Es la probabilidad de que todas se hayan ido en tres rondas.",
        ja: "3回以内に全部なくなる確率。",
        zh: "那是三轮内全部拿走的概率。"
      } },
      { tex: "\\tfrac{1341}{4096}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{2049}{4096}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{2755}{4096}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\left(\\tfrac18\\right)^4", correct: false, why: {
        en: "That needs all four coins to survive, not at least one.",
        fr: "Il faudrait que les quatre survivent, pas au moins une.",
        es: "Exige que sobrevivan las cuatro, no al menos una.",
        ja: "4枚全部が生き残る確率。",
        zh: "那要求四枚都留下。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "One coin",
          fr: "Une pièce",
          es: "Una moneda",
          ja: "1枚",
          zh: "一枚"
        },
        lines: ["P(\\text{survives 3 rounds})=\\tfrac18"],
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
          en: "At least one of four",
          fr: "Au moins une sur quatre",
          es: "Al menos una de cuatro",
          ja: "4枚中少なくとも1枚",
          zh: "四枚中至少一枚"
        },
        lines: ["1-\\left(\\tfrac78\\right)^4=\\tfrac{1695}{4096}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam this was a five-choice question; here a second correct form is added.",
          fr: "Dans l’épreuve c’était un QCM à cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "En el examen era de cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。ここでは正しい別表現を追加。",
          zh: "原题为五选一，此处增加了一个等价的正确选项。"
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
