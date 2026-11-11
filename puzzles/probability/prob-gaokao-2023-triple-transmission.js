/* probability · Say it three times
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2023-triple-transmission",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 12",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 12",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 12",
        ja: "2023年 中国・高考 新課程標準II卷 第12問",
        zh: "2023年高考数学新课标II卷 第12题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "Say it three times",
      fr: "Le dire trois fois",
      es: "Decirlo tres veces",
      ja: "3回送る",
      zh: "重复发三次"
    },
    statement: {
      en: "Bits are sent through a noisy channel, independently. A sent $0$ arrives as $1$ with probability $\\alpha$; a sent $1$ arrives as $0$ with probability $\\beta$ ($0<\\alpha,\\beta<1$). <i>Single</i> sending sends each bit once and reads what arrives. <i>Triple</i> sending sends each bit three times and decodes by majority (receiving $1,0,1$ decodes as $1$). <b>Which of the following are true?</b>",
      fr: "Des bits passent par un canal bruité, de façon indépendante. Un $0$ envoyé arrive en $1$ avec probabilité $\\alpha$ ; un $1$ arrive en $0$ avec probabilité $\\beta$ ($0<\\alpha,\\beta<1$). L’envoi <i>simple</i> transmet chaque bit une fois et lit ce qui arrive. L’envoi <i>triple</i> le transmet trois fois et décode à la majorité (recevoir $1,0,1$ donne $1$). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Se envían bits por un canal con ruido, de forma independiente. Un $0$ llega como $1$ con probabilidad $\\alpha$; un $1$ llega como $0$ con probabilidad $\\beta$ ($0<\\alpha,\\beta<1$). El envío <i>simple</i> manda cada bit una vez y lee lo que llega. El <i>triple</i> lo manda tres veces y decodifica por mayoría (recibir $1,0,1$ da $1$). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "雑音のある通信路でビットを独立に送ります。送った $0$ が $1$ になる確率は $\\alpha$、$1$ が $0$ になる確率は $\\beta$（$0<\\alpha,\\beta<1$）。<i>単回</i>送信は1回送って届いたものを読み、<i>3回</i>送信は3回送って多数決で復号します（$1,0,1$ を受信したら $1$）。<b>次のうち正しいものはどれですか？</b>",
      zh: "信号在有噪声的信道中独立传输。发送 $0$ 收到 $1$ 的概率为 $\\alpha$；发送 $1$ 收到 $0$ 的概率为 $\\beta$（$0<\\alpha,\\beta<1$）。<i>单次</i>传输每个信号发一次，收到什么就译成什么；<i>三次</i>传输每个信号发三次，按多数译码（收到 $1,0,1$ 译为 $1$）。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The probability that a sent 0 arrives correctly with single sending, the line 1 − α. Triple sending is compared in the solution.",
      fr: "La probabilité qu’un 0 envoyé une fois arrive correctement, la droite 1 − α. L’envoi triple est comparé dans la solution.",
      es: "La probabilidad de que un 0 enviado una vez llegue bien, la recta 1 − α. El envío triple se compara en la solución.",
      ja: "1回送信で 0 が正しく届く確率、直線 1 − α。3回送信との比較は解答で。",
      zh: "单次发送时 0 被正确接收的概率，直线 1 − α。三次发送在解答中比较。"
    },
    hint: {
      en: "In triple sending, 'decoded correctly' means at most one of the three copies was flipped.",
      fr: "En envoi triple, « bien décodé » signifie qu’au plus une des trois copies a été inversée.",
      es: "En el envío triple, «bien decodificado» significa que como mucho una de las tres copias cambió.",
      ja: "3回送信で「正しく復号」とは、3つのうち反転が高々1つということ。",
      zh: "三次传输中“译码正确”意味着三份中至多一份出错。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.4, scale: 62, pad: 20 });
      const X = a => 0.3 + a * 4.0, Y = p => 0.3 + p * 2.9;
      F.seg([X(0), Y(0)], [X(1.05), Y(0)], 'axis'); F.seg([X(0), Y(0)], [X(0), Y(1.05)], 'axis');
      const l = [], c = []; for (let k = 0; k <= 60; k++) { const a = k / 60; l.push([X(a), Y(1 - a)]); c.push([X(a), Y((1 - a) * (1 - a) * (1 + 2 * a))]); }
      F.curve(l, 'seg'); F.text([X(1.05), Y(0)], 'α', 'tick', 0, 12); F.text([X(0), Y(1)], '1', 'tick', -10, 0);
      F.reveal = () => {
      F.curve(c, 'graph'); F.dot([X(0.5), Y(0.5)]); F.text([X(0.5), Y(0)], '1/2', 'tick', 0, 12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "triple, sent": {"fr": "triple, envoyé", "es": "triple, enviado", "ja": "3回送信・送信", "zh": "三次传输，发送"},
      "receive": {"fr": "recevoir", "es": "recibir", "ja": "受信", "zh": "收到"},
      "if": {"fr": "si", "es": "si", "ja": "もし", "zh": "若"},
      "a sent": {"fr": "un", "es": "un", "ja": "送った", "zh": "发送的"},
      "is decoded correctly more often with triple sending": {"fr": "envoyé est plus souvent bien décodé en envoi triple", "es": "enviado se decodifica bien más a menudo con envío triple", "ja": "は3回送信のほうが正しく復号されやすい", "zh": "用三次传输更常被正确译码"},
      "single, sent": {"fr": "simple, envoyé", "es": "simple, enviado", "ja": "単回送信・送信", "zh": "单次传输，发送"},
      "decoded": {"fr": "décodé", "es": "decodificado", "ja": "復号", "zh": "译码为"},
      "triple sending always beats single sending": {"fr": "l’envoi triple est toujours meilleur que le simple", "es": "el envío triple siempre es mejor que el simple", "ja": "3回送信は常に単回送信より良い", "zh": "三次传输总是优于单次传输"},
      "sent": {"fr": "envoyé", "es": "enviado", "ja": "送信", "zh": "发送"},
      "received": {"fr": "reçu", "es": "recibido", "ja": "受信", "zh": "收到"}
    },
    options: [
      { tex: "\\text{triple, sent } 1:\\ P(\\text{receive } 1,0,1)=\\beta(1-\\beta)^2", correct: true, why: {
        en: "The three copies are independent: $(1-\\beta)\\cdot\\beta\\cdot(1-\\beta)$.",
        fr: "Les trois copies sont indépendantes : $(1-\\beta)\\cdot\\beta\\cdot(1-\\beta)$.",
        es: "Las tres copias son independientes: $(1-\\beta)\\cdot\\beta\\cdot(1-\\beta)$.",
        ja: "3つは独立：$(1-\\beta)\\cdot\\beta\\cdot(1-\\beta)$。",
        zh: "三份独立：$(1-\\beta)\\cdot\\beta\\cdot(1-\\beta)$。"
      } },
      { tex: "\\text{if } 0<\\alpha<\\tfrac12,\\ \\text{a sent } 0 \\text{ is decoded correctly more often with triple sending}", correct: true, why: {
        en: "$(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)>0$.",
        fr: "$(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)>0$.",
        es: "$(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)>0$.",
        ja: "$(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)>0$。",
        zh: "$(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)>0$。"
      } },
      { tex: "\\text{single, sent } 1,0,1:\\ P(\\text{receive } 1,0,1)=(1-\\alpha)^2(1-\\beta)", correct: false, why: {
        en: "Two $1$s and one $0$ are sent: $(1-\\beta)^2(1-\\alpha)$.",
        fr: "On envoie deux $1$ et un $0$ : $(1-\\beta)^2(1-\\alpha)$.",
        es: "Se envían dos $1$ y un $0$: $(1-\\beta)^2(1-\\alpha)$.",
        ja: "$1$ を2回、$0$ を1回送る：$(1-\\beta)^2(1-\\alpha)$。",
        zh: "发送了两个 $1$ 和一个 $0$：$(1-\\beta)^2(1-\\alpha)$。"
      } },
      { tex: "\\text{triple, sent } 1:\\ P(\\text{decoded } 1)=\\beta(1-\\beta)^2+(1-\\beta)^3", correct: false, why: {
        en: "The single flip can be in any of $3$ places: $3\\beta(1-\\beta)^2+(1-\\beta)^3$.",
        fr: "L’inversion unique peut être à $3$ places : $3\\beta(1-\\beta)^2+(1-\\beta)^3$.",
        es: "El único cambio puede estar en $3$ lugares: $3\\beta(1-\\beta)^2+(1-\\beta)^3$.",
        ja: "1回の反転の位置は $3$ 通り：$3\\beta(1-\\beta)^2+(1-\\beta)^3$。",
        zh: "一次出错可在 $3$ 个位置：$3\\beta(1-\\beta)^2+(1-\\beta)^3$。"
      } },
      { tex: "\\text{triple, sent } 1:\\ P(\\text{decoded } 1)=(1-\\beta)^3", correct: false, why: {
        en: "Forgets that one wrong copy is still outvoted.",
        fr: "Oublie qu’une copie fausse est encore mise en minorité.",
        es: "Olvida que una copia errónea sigue en minoría.",
        ja: "誤りが1つなら多数決で正しくなることを忘れている。",
        zh: "忘了一份出错仍会被多数否决。"
      } },
      { tex: "\\text{triple sending always beats single sending}", correct: false, why: {
        en: "For $\\alpha>\\tfrac12$ the majority is usually wrong, so it is worse.",
        fr: "Pour $\\alpha>\\tfrac12$ la majorité est le plus souvent fausse : c’est pire.",
        es: "Para $\\alpha>\\tfrac12$ la mayoría suele equivocarse: es peor.",
        ja: "$\\alpha>\\tfrac12$ では多数決が誤りやすく、かえって悪い。",
        zh: "$\\alpha>\\tfrac12$ 时多数往往是错的，反而更差。"
      } },
      { tex: "\\text{single, sent } 1,0,1:\\ P(\\text{receive } 1,0,1)=(1-\\alpha)(1-\\beta)", correct: false, why: {
        en: "Three bits are sent, so three factors: $(1-\\beta)^2(1-\\alpha)$.",
        fr: "Trois bits sont envoyés, donc trois facteurs : $(1-\\beta)^2(1-\\alpha)$.",
        es: "Se envían tres bits, luego tres factores: $(1-\\beta)^2(1-\\alpha)$.",
        ja: "3ビット送るので因数は3つ：$(1-\\beta)^2(1-\\alpha)$。",
        zh: "发送了三位，应有三个因子：$(1-\\beta)^2(1-\\alpha)$。"
      } },
      { tex: "\\text{triple, sent } 0:\\ P(\\text{decoded } 0)=3\\alpha(1-\\alpha)^2", correct: false, why: {
        en: "Leaves out the case with no flip, $(1-\\alpha)^3$.",
        fr: "Oublie le cas sans inversion, $(1-\\alpha)^3$.",
        es: "Olvida el caso sin cambios, $(1-\\alpha)^3$.",
        ja: "反転なしの場合 $(1-\\alpha)^3$ が抜けている。",
        zh: "漏掉了没有出错的情况 $(1-\\alpha)^3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Independent copies multiply",
          fr: "Les copies indépendantes se multiplient",
          es: "Las copias independientes se multiplican",
          ja: "独立なものは掛ける",
          zh: "独立就相乘"
        },
        lines: ["\\text{sent } 1,1,1,\\ \\text{received } 1,0,1:\\quad (1-\\beta)\\,\\beta\\,(1-\\beta)"],
        note: {
          en: "Each copy is right with probability $1-\\beta$ and flipped with probability $\\beta$.",
          fr: "Chaque copie est juste avec probabilité $1-\\beta$, inversée avec probabilité $\\beta$.",
          es: "Cada copia es correcta con probabilidad $1-\\beta$ y cambia con $\\beta$.",
          ja: "各コピーは確率 $1-\\beta$ で正しく、$\\beta$ で反転。",
          zh: "每份以 $1-\\beta$ 正确，以 $\\beta$ 出错。"
        }
      },
      {
        title: {
          en: "Majority decoding",
          fr: "Décodage à la majorité",
          es: "Decodificación por mayoría",
          ja: "多数決の復号",
          zh: "多数译码"
        },
        lines: ["P(\\text{decoded } 0)=(1-\\alpha)^3+3\\alpha(1-\\alpha)^2=(1-\\alpha)^2(1+2\\alpha)"],
        note: {
          en: "No flip, or exactly one flip in one of three places.",
          fr: "Aucune inversion, ou une seule à l’une des trois places.",
          es: "Ningún cambio, o exactamente uno en uno de tres lugares.",
          ja: "反転なし、または3か所のどこか1つだけ反転。",
          zh: "没有出错，或在三处之一恰好出错一次。"
        }
      },
      {
        title: {
          en: "Compare with single sending",
          fr: "Comparer à l’envoi simple",
          es: "Comparar con el envío simple",
          ja: "単回と比べる",
          zh: "与单次比较"
        },
        lines: ["(1-\\alpha)^2(1+2\\alpha)-(1-\\alpha)=\\alpha(1-\\alpha)(1-2\\alpha)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Positive exactly when $\\alpha<\\tfrac12$: repeating helps only on a mostly reliable channel.",
          fr: "Positif exactement quand $\\alpha<\\tfrac12$ : répéter n’aide que sur un canal plutôt fiable.",
          es: "Positivo justo cuando $\\alpha<\\tfrac12$: repetir solo ayuda si el canal es bastante fiable.",
          ja: "正となるのは $\\alpha<\\tfrac12$ のときだけ。繰り返しは信頼できる通信路でのみ有効。",
          zh: "恰在 $\\alpha<\\tfrac12$ 时为正：只有信道大体可靠时重复才有用。"
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
          en: "Watch the factor 3 and which bits were sent.",
          fr: "Attention au facteur 3 et aux bits envoyés.",
          es: "Cuidado con el factor 3 y con qué bits se envían.",
          ja: "因数 3 と送ったビットに注意。",
          zh: "注意因子 3 和发送的是哪些位。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
