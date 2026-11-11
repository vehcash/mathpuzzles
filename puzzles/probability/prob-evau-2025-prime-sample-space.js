/* probability · Eight primes, two of them heavier
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 4.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-evau-2025-prime-sample-space",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 4.1",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 4.1",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 4.1",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 4.1",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 4.1 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "Eight primes, two of them heavier",
      fr: "Huit nombres premiers, deux plus probables",
      es: "Ocho primos, dos más probables",
      ja: "8つの素数、2つは重い",
      zh: "八个素数，其中两个概率更大"
    },
    statement: {
      en: "$E=\\{2,3,5,7,11,13,17,19\\}$ with $P(\\{3\\})=P(\\{7\\})=\\tfrac14$ and each other outcome of probability $\\tfrac1{12}$. Let $A=\\{7,11,13,19\\}$, $B=\\{2,5,7,13,17\\}$, $C=\\{3,5,7,11,13\\}$. <b>Which of the following are true?</b>",
      fr: "$E=\\{2,3,5,7,11,13,17,19\\}$ avec $P(\\{3\\})=P(\\{7\\})=\\tfrac14$ et chacune des autres issues de probabilité $\\tfrac1{12}$. Soit $A=\\{7,11,13,19\\}$, $B=\\{2,5,7,13,17\\}$, $C=\\{3,5,7,11,13\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$E=\\{2,3,5,7,11,13,17,19\\}$ con $P(\\{3\\})=P(\\{7\\})=\\tfrac14$ y cada uno de los demás resultados con probabilidad $\\tfrac1{12}$. Sean $A=\\{7,11,13,19\\}$, $B=\\{2,5,7,13,17\\}$, $C=\\{3,5,7,11,13\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$E=\\{2,3,5,7,11,13,17,19\\}$ で $P(\\{3\\})=P(\\{7\\})=\\tfrac14$、他の結果はそれぞれ確率 $\\tfrac1{12}$。$A=\\{7,11,13,19\\}$、$B=\\{2,5,7,13,17\\}$、$C=\\{3,5,7,11,13\\}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$E=\\{2,3,5,7,11,13,17,19\\}$，$P(\\{3\\})=P(\\{7\\})=\\tfrac14$，其余每个结果概率为 $\\tfrac1{12}$。设 $A=\\{7,11,13,19\\}$，$B=\\{2,5,7,13,17\\}$，$C=\\{3,5,7,11,13\\}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The eight primes as tiles; 3 and 7 are three times as wide as the others.",
      fr: "Les huit nombres premiers en tuiles ; 3 et 7 sont trois fois plus larges.",
      es: "Los ocho primos como fichas; 3 y 7 son tres veces más anchos.",
      ja: "8つの素数のタイル。3 と 7 は3倍の幅。",
      zh: "八个素数的方块，3 和 7 宽度是其余的三倍。"
    },
    hint: {
      en: "Work in twelfths: $3$ and $7$ count $3$ each, the rest $1$ each.",
      fr: "Comptez en douzièmes : $3$ et $7$ valent $3$ chacun, les autres $1$.",
      es: "Cuenta en doceavos: $3$ y $7$ valen $3$ cada uno; el resto, $1$.",
      ja: "12分の1単位で：$3$ と $7$ は $3$、他は $1$。",
      zh: "以十二分之一为单位：$3$、$7$ 各 $3$，其余各 $1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 16 });
      let x = 0.2; [[2, 1], [3, 3], [5, 1], [7, 3], [11, 1], [13, 1], [17, 1], [19, 1]].forEach(([p, w]) => { F.rect(x, 0.4, w * 0.4 - 0.05, 0.8, w === 3 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([x + w * 0.2 - 0.025, 0.8], String(p), 'pt', 0, 0); x += w * 0.4; });
      F.reveal = () => {
      F.text([3.2, 0.2], 'B ∩ C = {5, 7, 13}', 'len small', 0, 8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "B ∩ C = {5, 7, 13}": {"fr": "B ∩ C = {5, 7, 13}", "es": "B ∩ C = {5, 7, 13}", "ja": "B ∩ C = {5, 7, 13}", "zh": "B ∩ C = {5, 7, 13}"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "are independent": {"fr": "sont indépendants", "es": "son independientes", "ja": "は独立", "zh": "相互独立"}
    },
    options: [
      { tex: "P(A\\mid B\\cap C)=\\tfrac45", correct: true, why: {
        en: "$\\dfrac{P(\\{7,13\\})}{P(\\{5,7,13\\})}=\\dfrac{4/12}{5/12}=\\dfrac45$",
        fr: "$\\dfrac{P(\\{7,13\\})}{P(\\{5,7,13\\})}=\\dfrac{4/12}{5/12}=\\dfrac45$",
        es: "$\\dfrac{P(\\{7,13\\})}{P(\\{5,7,13\\})}=\\dfrac{4/12}{5/12}=\\dfrac45$",
        ja: "$\\dfrac{P(\\{7,13\\})}{P(\\{5,7,13\\})}=\\dfrac{4/12}{5/12}=\\dfrac45$",
        zh: "$\\dfrac{P(\\{7,13\\})}{P(\\{5,7,13\\})}=\\dfrac{4/12}{5/12}=\\dfrac45$"
      } },
      { tex: "P\\bigl((A\\cup C)\\setminus B\\bigr)=\\tfrac5{12}", correct: true, why: {
        en: "$(A\\cup C)\\setminus B=\\{3,11,19\\}$: $\\tfrac{3+1+1}{12}$",
        fr: "$(A\\cup C)\\setminus B=\\{3,11,19\\}$: $\\tfrac{3+1+1}{12}$",
        es: "$(A\\cup C)\\setminus B=\\{3,11,19\\}$: $\\tfrac{3+1+1}{12}$",
        ja: "$(A\\cup C)\\setminus B=\\{3,11,19\\}$: $\\tfrac{3+1+1}{12}$",
        zh: "$(A\\cup C)\\setminus B=\\{3,11,19\\}$: $\\tfrac{3+1+1}{12}$"
      } },
      { tex: "P(A\\mid B\\cap C)=0", correct: false, why: {
        en: "$A\\cap B\\cap C=\\{7,13\\}$ is not empty.",
        fr: "$A\\cap B\\cap C=\\{7,13\\}$ n’est pas vide.",
        es: "$A\\cap B\\cap C=\\{7,13\\}$ no es vacío.",
        ja: "$A\\cap B\\cap C=\\{7,13\\}$ は空でない。",
        zh: "$A\\cap B\\cap C=\\{7,13\\}$ 非空。"
      } },
      { tex: "P(A\\mid B\\cap C)=\\tfrac23", correct: false, why: {
        en: "That counts outcomes as if equally likely.",
        fr: "Cela compte les issues comme équiprobables.",
        es: "Cuenta los resultados como equiprobables.",
        ja: "同様に確からしいとして数えている。",
        zh: "这是按等可能计数的结果。"
      } },
      { tex: "P(B\\cap C)=\\tfrac38", correct: false, why: {
        en: "Equally-likely count again; the weighted value is $\\tfrac5{12}$.",
        fr: "Encore un comptage équiprobable ; la vraie valeur est $\\tfrac5{12}$.",
        es: "De nuevo un conteo equiprobable; el valor real es $\\tfrac5{12}$.",
        ja: "等確率で数えている。正しくは $\\tfrac5{12}$。",
        zh: "又按等可能计数，实际为 $\\tfrac5{12}$。"
      } },
      { tex: "P\\bigl((A\\cup C)\\setminus B\\bigr)=\\tfrac7{12}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "A\\ \\text{and}\\ B\\ \\text{are independent}", correct: false, why: {
        en: "$P(A\\cap B)=\\tfrac4{12}\\ne P(A)P(B)=\\tfrac12\\cdot\\tfrac7{12}$",
        fr: "$P(A\\cap B)=\\tfrac4{12}\\ne P(A)P(B)=\\tfrac12\\cdot\\tfrac7{12}$",
        es: "$P(A\\cap B)=\\tfrac4{12}\\ne P(A)P(B)=\\tfrac12\\cdot\\tfrac7{12}$",
        ja: "$P(A\\cap B)=\\tfrac4{12}\\ne P(A)P(B)=\\tfrac12\\cdot\\tfrac7{12}$",
        zh: "$P(A\\cap B)=\\tfrac4{12}\\ne P(A)P(B)=\\tfrac12\\cdot\\tfrac7{12}$"
      } },
      { tex: "P(A)=\\tfrac13", correct: false, why: {
        en: "$P(A)=\\tfrac{3+1+1+1}{12}=\\tfrac12$",
        fr: "$P(A)=\\tfrac{3+1+1+1}{12}=\\tfrac12$",
        es: "$P(A)=\\tfrac{3+1+1+1}{12}=\\tfrac12$",
        ja: "$P(A)=\\tfrac{3+1+1+1}{12}=\\tfrac12$",
        zh: "$P(A)=\\tfrac{3+1+1+1}{12}=\\tfrac12$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Weights in twelfths",
          fr: "Poids en douzièmes",
          es: "Pesos en doceavos",
          ja: "12分の1単位の重み",
          zh: "以十二分之一计权"
        },
        lines: ["B\\cap C=\\{5,7,13\\}:\\ 1+3+1=5,\\qquad A\\cap B\\cap C=\\{7,13\\}:\\ 3+1=4"],
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
          en: "Conditional and difference",
          fr: "Conditionnelle et différence",
          es: "Condicionada y diferencia",
          ja: "条件付きと差集合",
          zh: "条件概率与差集"
        },
        lines: ["P(A\\mid B\\cap C)=\\tfrac45,\\qquad (A\\cup C)\\setminus B=\\{3,11,19\\}\\Rightarrow\\tfrac5{12}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The exam’s notation here was ambiguous; the events are written out in plain set notation.",
          fr: "La notation de l’épreuve était ambiguë ; les événements sont écrits ici en notation ensembliste claire.",
          es: "La notación del examen era ambigua; aquí los sucesos se escriben con notación de conjuntos clara.",
          ja: "原題の記法はあいまいなので、集合記法で明確に書いた。",
          zh: "原题记号有歧义，此处用明确的集合记号。"
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
