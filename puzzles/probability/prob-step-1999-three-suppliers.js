/* probability · Choosing the mix of suppliers
   STEP Mathematics II 1999 (Cambridge), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-step-1999-three-suppliers",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "STEP Mathematics II 1999 (Cambridge), Question 12",
        fr: "STEP Mathématiques II 1999 (Cambridge), question 12",
        es: "STEP Matemáticas II 1999 (Cambridge), pregunta 12",
        ja: "STEP 数学 II 1999（ケンブリッジ大学）第12問",
        zh: "STEP 数学 II 1999（剑桥大学）第 12 题"
      },
      exams: ["step"]
    },
    difficulty: 3,
    title: {
      en: "Choosing the mix of suppliers",
      fr: "Choisir la proportion des fournisseurs",
      es: "Elegir la mezcla de proveedores",
      ja: "仕入れ先の割合を選ぶ",
      zh: "选择供应商的比例"
    },
    statement: {
      en: "Chips come from suppliers $A$, $B$, $C$ in proportions $2p$, $p$, $1-3p$ ($0\\le p\\le\\tfrac13$); a chip works ($S$) with probability $0.7$, $0.8$, $0.9$ respectively. <b>Which of the following are true?</b>",
      fr: "Des puces proviennent des fournisseurs $A$, $B$, $C$ dans les proportions $2p$, $p$, $1-3p$ ($0\\le p\\le\\tfrac13$) ; une puce fonctionne ($S$) avec probabilité $0{,}7$, $0{,}8$, $0{,}9$ respectivement. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Unos chips proceden de los proveedores $A$, $B$, $C$ en proporciones $2p$, $p$, $1-3p$ ($0\\le p\\le\\tfrac13$); un chip funciona ($S$) con probabilidad $0{,}7$, $0{,}8$, $0{,}9$ respectivamente. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "チップは仕入れ先 $A$、$B$、$C$ から割合 $2p$、$p$、$1-3p$（$0\\le p\\le\\tfrac13$）で届き、正常に動く（$S$）確率はそれぞれ $0.7$、$0.8$、$0.9$。<b>次のうち正しいものはどれですか？</b>",
      zh: "芯片来自供应商 $A$、$B$、$C$，比例为 $2p$、$p$、$1-3p$（$0\\le p\\le\\tfrac13$），正常工作（$S$）的概率分别为 $0.7$、$0.8$、$0.9$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A bar split into three parts 2p, p and 1 − 3p, with success rates written on each.",
      fr: "Une barre coupée en trois parts 2p, p et 1 − 3p, avec les taux de réussite.",
      es: "Una barra dividida en tres partes 2p, p y 1 − 3p, con su tasa de éxito.",
      ja: "2p, p, 1 − 3p に分けた棒と各成功率。",
      zh: "分为 2p、p、1 − 3p 三段的条形及各自成功率。"
    },
    hint: {
      en: "$P(S)=1.4p+0.8p+0.9(1-3p)$. Then $P(A\\mid S)=\\dfrac{1.4p}{P(S)}$.",
      fr: "$P(S)=1{,}4p+0{,}8p+0{,}9(1-3p)$. Puis $P(A\\mid S)=\\dfrac{1{,}4p}{P(S)}$.",
      es: "$P(S)=1{,}4p+0{,}8p+0{,}9(1-3p)$. Luego $P(A\\mid S)=\\dfrac{1{,}4p}{P(S)}$.",
      ja: "$P(S)=1.4p+0.8p+0.9(1-3p)$。$P(A\\mid S)=\\dfrac{1.4p}{P(S)}$。",
      zh: "$P(S)=1.4p+0.8p+0.9(1-3p)$，$P(A\\mid S)=\\dfrac{1.4p}{P(S)}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 50, pad: 16 });
      [[0.3, 2.0, 'A: 2p', '0.7'], [2.3, 1.0, 'B: p', '0.8'], [3.3, 2.4, 'C: 1 − 3p', '0.9']].forEach(([x, w, t, r], k) => { F.rect(x, 0.6, w, 0.7, k === 0 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([x + w / 2, 0.95], t, 'len small', 0, 0); F.text([x + w / 2, 0.6], r, 'len small', 0, 14); });
      F.reveal = () => {
      F.text([3.0, 1.6], 'P(S) = 0.9 − 0.5p', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "A: 2p": {"fr": "A : 2p", "es": "A: 2p", "ja": "A: 2p", "zh": "A：2p"},
      "B: p": {"fr": "B : p", "es": "B: p", "ja": "B: p", "zh": "B：p"},
      "C: 1 − 3p": {"fr": "C : 1 − 3p", "es": "C: 1 − 3p", "ja": "C: 1 − 3p", "zh": "C：1 − 3p"},
      "0.7": {"fr": "0,7", "es": "0,7", "ja": "0.7", "zh": "0.7"},
      "0.8": {"fr": "0,8", "es": "0,8", "ja": "0.8", "zh": "0.8"},
      "0.9": {"fr": "0,9", "es": "0,9", "ja": "0.9", "zh": "0.9"},
      "P(S) = 0.9 − 0.5p": {"fr": "P(S) = 0,9 − 0,5p", "es": "P(S) = 0,9 − 0,5p", "ja": "P(S) = 0.9 − 0.5p", "zh": "P(S) = 0.9 − 0.5p"},
      "increases with": {"fr": "croît avec", "es": "crece con", "ja": "は次とともに増加：", "zh": "随下列增大"}
    },
    options: [
      { tex: "P(A\\mid S)=\\dfrac{14p}{9-5p}", correct: true, why: {
        en: "$\\dfrac{1.4p}{0.9-0.5p}$",
        fr: "$\\dfrac{1.4p}{0.9-0.5p}$",
        es: "$\\dfrac{1.4p}{0.9-0.5p}$",
        ja: "$\\dfrac{1.4p}{0.9-0.5p}$",
        zh: "$\\dfrac{1.4p}{0.9-0.5p}$"
      } },
      { tex: "\\max_p P(A\\mid S)=\\tfrac7{11}", correct: true, why: {
        en: "It increases with $p$; at $p=\\tfrac13$: $\\dfrac{14/3}{22/3}$.",
        fr: "Croissante en $p$ ; en $p=\\tfrac13$ : $\\dfrac{14/3}{22/3}$.",
        es: "Crece con $p$; en $p=\\tfrac13$: $\\dfrac{14/3}{22/3}$.",
        ja: "$p$ について増加。$p=\\tfrac13$ で $\\dfrac{14/3}{22/3}$。",
        zh: "关于 $p$ 递增，$p=\\tfrac13$ 时 $\\dfrac{14/3}{22/3}$。"
      } },
      { tex: "P(S)=0.9+0.5p", correct: false, why: {
        en: "$2.2p-2.7p=-0.5p$",
        fr: "$2.2p-2.7p=-0.5p$",
        es: "$2.2p-2.7p=-0.5p$",
        ja: "$2.2p-2.7p=-0.5p$",
        zh: "$2.2p-2.7p=-0.5p$"
      } },
      { tex: "P(A\\mid S)=1.4p", correct: false, why: {
        en: "That is $P(A\\cap S)$; divide by $P(S)$.",
        fr: "C’est $P(A\\cap S)$ ; il faut diviser par $P(S)$.",
        es: "Es $P(A\\cap S)$; hay que dividir entre $P(S)$.",
        ja: "$P(A\\cap S)$。$P(S)$ で割る。",
        zh: "那是 $P(A\\cap S)$，需除以 $P(S)$。"
      } },
      { tex: "\\max_p P(A\\mid S)=\\tfrac23", correct: false, why: {
        en: "That is the share of $A$ at $p=\\tfrac13$ before conditioning.",
        fr: "C’est la part de $A$ en $p=\\tfrac13$ avant conditionnement.",
        es: "Es la proporción de $A$ en $p=\\tfrac13$ antes de condicionar.",
        ja: "条件付け前の $p=\\tfrac13$ での $A$ の割合。",
        zh: "那是 $p=\\tfrac13$ 时条件化前 $A$ 的比例。"
      } },
      { tex: "P(C\\mid S)\\ \\text{increases with}\\ p", correct: false, why: {
        en: "$\\dfrac{9-27p}{9-5p}$",
        fr: "$\\dfrac{9-27p}{9-5p}$",
        es: "$\\dfrac{9-27p}{9-5p}$",
        ja: "$\\dfrac{9-27p}{9-5p}$",
        zh: "$\\dfrac{9-27p}{9-5p}$"
      } },
      { tex: "\\max_p P(C\\mid S)=0.9", correct: false, why: {
        en: "At $p=0$ every chip is from $C$: the value is $1$.",
        fr: "En $p=0$ toutes les puces viennent de $C$ : la valeur est $1$.",
        es: "En $p=0$ todos los chips son de $C$: vale $1$.",
        ja: "$p=0$ ではすべて $C$ 製で値は $1$。",
        zh: "$p=0$ 时全部来自 $C$，值为 $1$。"
      } },
      { tex: "P(A\\mid S)=\\dfrac{14p}{9+5p}", correct: false, why: {
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
        lines: ["P(S)=1.4p+0.8p+0.9-2.7p=0.9-0.5p"],
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
          en: "Conditional",
          fr: "Conditionnelle",
          es: "Condicionada",
          ja: "条件付き",
          zh: "条件概率"
        },
        lines: ["P(A\\mid S)=\\frac{14p}{9-5p}\\nearrow,\\quad p=\\tfrac13:\\ \\tfrac7{11}"],
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
