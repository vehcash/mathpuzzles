/* probability · Hoping for the biggest ice cream
   STEP Mathematics II 2006 (Cambridge), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-step-2006-biggest-ice-cream",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "STEP Mathematics II 2006 (Cambridge), Question 13",
        fr: "STEP Mathématiques II 2006 (Cambridge), question 13",
        es: "STEP Matemáticas II 2006 (Cambridge), pregunta 13",
        ja: "STEP 数学 II 2006（ケンブリッジ大学）第13問",
        zh: "STEP 数学 II 2006（剑桥大学）第 13 题"
      },
      exams: ["step"]
    },
    difficulty: 3,
    title: {
      en: "Hoping for the biggest ice cream",
      fr: "Espérer la plus grosse glace",
      es: "Esperando el helado más grande",
      ja: "いちばん大きいアイスを狙う",
      zh: "想要最大的冰淇淋"
    },
    statement: {
      en: "$n\\ge2$ ice creams of different sizes are offered one at a time in random order. You must refuse the first, then accept the first one bigger than every one offered before it; if none is, you get the last. $P_n(k)$ is the probability you get the $k$-th largest. <b>Which of the following are true?</b>",
      fr: "On propose $n\\ge2$ glaces de tailles différentes une par une, dans un ordre aléatoire. On doit refuser la première, puis accepter la première plus grosse que toutes celles proposées avant ; s’il n’y en a pas, on reçoit la dernière. $P_n(k)$ est la probabilité d’obtenir la $k$-ième plus grosse. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Se ofrecen $n\\ge2$ helados de tamaños distintos uno a uno en orden aleatorio. Hay que rechazar el primero y aceptar el primero que sea mayor que todos los anteriores; si no hay ninguno, te toca el último. $P_n(k)$ es la probabilidad de obtener el $k$-ésimo más grande. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "大きさの違うアイス $n\\ge2$ 個が無作為な順に1つずつ出されます。最初のものは断り、それまでのどれよりも大きい最初のものを受け取ります。そのようなものがなければ最後のものになります。$k$ 番目に大きいものを得る確率を $P_n(k)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$n\\ge2$ 个大小不同的冰淇淋随机逐个递来。必须拒绝第一个，然后接受第一个比之前所有都大的；若没有，就得到最后一个。$P_n(k)$ 为得到第 $k$ 大的概率。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Four cones of different heights in a row; the first is crossed out.",
      fr: "Quatre cornets de hauteurs différentes ; le premier est barré.",
      es: "Cuatro cucuruchos de alturas distintas; el primero está tachado.",
      ja: "高さの違う4つのコーン。最初のものに×。",
      zh: "四个高度不同的蛋筒，第一个被划掉。"
    },
    hint: {
      en: "You get the biggest iff it is in place $j\\ge2$ and the biggest of the first $j-1$ is the first one: probability $\\tfrac1n\\cdot\\tfrac1{j-1}$ for each $j$.",
      fr: "On obtient la plus grosse ssi elle est à la place $j\\ge2$ et que la plus grosse des $j-1$ premières est la première : probabilité $\\tfrac1n\\cdot\\tfrac1{j-1}$ pour chaque $j$.",
      es: "Obtienes el mayor si y solo si está en el puesto $j\\ge2$ y el mayor de los $j-1$ primeros es el primero: probabilidad $\\tfrac1n\\cdot\\tfrac1{j-1}$ para cada $j$.",
      ja: "最大のものが $j\\ge2$ 番目にあり、最初の $j-1$ 個の最大が1番目なら得られる：各 $j$ で $\\tfrac1n\\cdot\\tfrac1{j-1}$。",
      zh: "最大者在第 $j\\ge2$ 位且前 $j-1$ 个中最大的是第一个：每个 $j$ 概率 $\\tfrac1n\\cdot\\tfrac1{j-1}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.6, scale: 52, pad: 16 });
      [1.1, 1.7, 0.8, 2.0].forEach((h, k) => { const x = 0.8 + k * 1.15; F.path([[x - 0.3, 0.3 + h * 0.7], [x + 0.3, 0.3 + h * 0.7], [x, 0.3]], 'fill-yellow', 'fills', true); F.circle([x, 0.3 + h * 0.7 + 0.12], 0.3, 'fill-pink'); });
      F.seg([0.45, 0.4], [1.15, 1.4], 'hl pink');
      F.reveal = () => {
      F.text([2.5, 0.05], 'P₄(1) = 11/24', 'len small', 0, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "P₄(1) = 11/24": {"fr": "P₄(1) = 11/24", "es": "P₄(1) = 11/24", "ja": "P₄(1) = 11/24", "zh": "P₄(1) = 11/24"},
      "as": {"fr": "quand", "es": "cuando", "ja": "のとき", "zh": "当"},
      "biggest at": {"fr": "la plus grosse en", "es": "el mayor en", "ja": "最大が位置", "zh": "最大者在"},
      "and taken": {"fr": "et prise", "es": "y tomado", "ja": "で受け取る", "zh": "且被取到"}
    },
    options: [
      { tex: "P_4(1)=\\tfrac{11}{24}", correct: true, why: {
        en: "$\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)$",
        fr: "$\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)$",
        es: "$\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)$",
        ja: "$\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)$",
        zh: "$\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)$"
      } },
      { tex: "P_n(1)=\\dfrac1n\\left(1+\\tfrac12+\\dots+\\tfrac1{n-1}\\right)", correct: true, why: {
        en: "$\\sum_{j=2}^{n}\\tfrac1n\\cdot\\tfrac1{j-1}$",
        fr: "$\\sum_{j=2}^{n}\\tfrac1n\\cdot\\tfrac1{j-1}$",
        es: "$\\sum_{j=2}^{n}\\tfrac1n\\cdot\\tfrac1{j-1}$",
        ja: "$\\sum_{j=2}^{n}\\tfrac1n\\cdot\\tfrac1{j-1}$",
        zh: "$\\sum_{j=2}^{n}\\tfrac1n\\cdot\\tfrac1{j-1}$"
      } },
      { tex: "P_4(1)=\\tfrac14", correct: false, why: {
        en: "That is what a random choice gives; the rule does better.",
        fr: "C’est ce que donne un choix au hasard ; la règle fait mieux.",
        es: "Es lo que da elegir al azar; la regla lo mejora.",
        ja: "無作為に選んだ場合。規則のほうがよい。",
        zh: "那是随机选择的结果，此规则更好。"
      } },
      { tex: "P_4(4)=\\tfrac14", correct: false, why: {
        en: "$P_4(4)=\\tfrac2{24}=\\tfrac1{12}$",
        fr: "$P_4(4)=\\tfrac2{24}=\\tfrac1{12}$",
        es: "$P_4(4)=\\tfrac2{24}=\\tfrac1{12}$",
        ja: "$P_4(4)=\\tfrac2{24}=\\tfrac1{12}$",
        zh: "$P_4(4)=\\tfrac2{24}=\\tfrac1{12}$"
      } },
      { tex: "P_4(2)=\\tfrac{11}{24}", correct: false, why: {
        en: "$P_4(2)=\\tfrac7{24}$",
        fr: "$P_4(2)=\\tfrac7{24}$",
        es: "$P_4(2)=\\tfrac7{24}$",
        ja: "$P_4(2)=\\tfrac7{24}$",
        zh: "$P_4(2)=\\tfrac7{24}$"
      } },
      { tex: "P_n(1)\\to1\\ \\text{as}\\ n\\to\\infty", correct: false, why: {
        en: "$\\tfrac{\\ln n}{n}\\to0$ roughly.",
        fr: "Environ $\\tfrac{\\ln n}{n}\\to0$.",
        es: "Aproximadamente $\\tfrac{\\ln n}{n}\\to0$.",
        ja: "およそ $\\tfrac{\\ln n}{n}\\to0$。",
        zh: "约为 $\\tfrac{\\ln n}{n}\\to0$。"
      } },
      { tex: "P_2(1)=1", correct: false, why: {
        en: "For $n=2$ you get the second one, biggest with probability $\\tfrac12$.",
        fr: "Pour $n=2$ on reçoit la seconde, la plus grosse avec probabilité $\\tfrac12$.",
        es: "Con $n=2$ te toca el segundo, que es el mayor con probabilidad $\\tfrac12$.",
        ja: "$n=2$ では2番目を得て、最大の確率は $\\tfrac12$。",
        zh: "$n=2$ 时得到第二个，为最大的概率 $\\tfrac12$。"
      } },
      { tex: "P_n(1)=\\dfrac1n\\left(1+\\tfrac12+\\dots+\\tfrac1n\\right)", correct: false, why: {
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
          en: "Where the biggest is",
          fr: "Où est la plus grosse",
          es: "Dónde está el mayor",
          ja: "最大の位置",
          zh: "最大者的位置"
        },
        lines: ["P(\\text{biggest at}\\ j\\ \\text{and taken})=\\tfrac1n\\cdot\\tfrac1{j-1},\\ j=2,\\dots,n"],
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
          en: "Add up",
          fr: "Additionner",
          es: "Sumar",
          ja: "足し合わせる",
          zh: "求和"
        },
        lines: ["P_4(1)=\\tfrac14\\left(1+\\tfrac12+\\tfrac13\\right)=\\tfrac{11}{24},\\quad P_4=\\left(\\tfrac{11}{24},\\tfrac7{24},\\tfrac4{24},\\tfrac2{24}\\right)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "STEP asks for proofs; here the results of the question are turned into statements to check.",
          fr: "Le STEP demande des démonstrations ; ici les résultats de la question deviennent des affirmations à vérifier.",
          es: "El STEP pide demostraciones; aquí los resultados de la pregunta se convierten en afirmaciones que comprobar.",
          ja: "STEP は証明問題。ここでは結果を判定する命題にした。",
          zh: "STEP 要求证明，此处把结论改为待判断的命题。"
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
