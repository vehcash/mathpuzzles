/* number · Squares with alternating signs
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2020-alternating-squares",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2020 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "Squares with alternating signs",
      fr: "Carrés à signes alternés",
      es: "Cuadrados con signos alternos",
      ja: "符号が交互の平方和",
      zh: "正负交替的平方和"
    },
    statement: {
      en: "<b>Which of the following equal $1-4+9-16+25-\\cdots+99^2-100^2$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à $1-4+9-16+25-\\cdots+99^2-100^2$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a $1-4+9-16+25-\\cdots+99^2-100^2$?</b>",
      ja: "<b>$1-4+9-16+25-\\cdots+99^2-100^2$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $1-4+9-16+25-\\cdots+99^2-100^2$？</b>"
    },
    figureText: {
      en: "Square 2² drawn over square 1²: the L-shaped difference has area 2 + 1. The same works for every pair.",
      fr: "Le carré 2² dessiné par-dessus le carré 1² : la différence en forme de L a une aire 2 + 1. C’est pareil pour chaque paire.",
      es: "El cuadrado 2² dibujado sobre el 1²: la diferencia en forma de L tiene área 2 + 1. Lo mismo vale para cada par.",
      ja: "1² の正方形に 2² を重ねた図。L 字形の差の面積は 2 + 1。どの組でも同じ。",
      zh: "在 1² 的正方形上叠画 2² 的正方形：L 形差的面积为 2 + 1。每一对都如此。"
    },
    hint: {
      en: "Group the terms in pairs: $(2k-1)^2-(2k)^2$.",
      fr: "Groupez les termes par paires : $(2k-1)^2-(2k)^2$.",
      es: "Agrupa los términos en pares: $(2k-1)^2-(2k)^2$.",
      ja: "2つずつまとめる：$(2k-1)^2-(2k)^2$。",
      zh: "两两分组：$(2k-1)^2-(2k)^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 3.2, scale: 64, pad: 18 });
      const u = 1.2; F.rect(0.4, 0.3, 2 * u, 2 * u, 'tri fill-yellow'); F.rect(0.4, 0.3, u, u, 'tri fill-blue');
      F.text([0.4 + u / 2, 0.3 + u / 2], '1²', 'len', 0, 0); F.text([0.4 + 1.5 * u, 0.3 + 1.5 * u], '2² − 1²', 'len small', 0, 0);
      F.text([3.8, 1.5], '= 1 + 2', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "-5050", correct: true, why: {
        en: "Each pair gives $-(4k-1)$; altogether $-(1+2+\\cdots+100)$.",
        fr: "Chaque paire donne $-(4k-1)$ ; en tout $-(1+2+\\cdots+100)$.",
        es: "Cada par da $-(4k-1)$; en total $-(1+2+\\cdots+100)$.",
        ja: "各組は $-(4k-1)$。合計で $-(1+2+\\cdots+100)$。",
        zh: "每对得 $-(4k-1)$；合计 $-(1+2+\\cdots+100)$。"
      } },
      { tex: "-(1+2+3+\\cdots+100)", correct: true, why: {
        en: "$a^2-b^2=(a-b)(a+b)$ with $a-b=-1$ turns each pair into $-(a+b)$.",
        fr: "$a^2-b^2=(a-b)(a+b)$ avec $a-b=-1$ change chaque paire en $-(a+b)$.",
        es: "$a^2-b^2=(a-b)(a+b)$ con $a-b=-1$ convierte cada par en $-(a+b)$.",
        ja: "$a^2-b^2=(a-b)(a+b)$、$a-b=-1$ で各組は $-(a+b)$。",
        zh: "$a^2-b^2=(a-b)(a+b)$，$a-b=-1$，每对变为 $-(a+b)$。"
      } },
      { tex: "5050", correct: false, why: {
        en: "Sign error: the even squares are the bigger ones and are subtracted.",
        fr: "Erreur de signe : les carrés pairs sont les plus grands et sont retranchés.",
        es: "Error de signo: los cuadrados pares son mayores y se restan.",
        ja: "符号ミス：偶数の平方のほうが大きく、それが引かれる。",
        zh: "符号错：偶数的平方更大且被减去。"
      } },
      { tex: "-10100", correct: false, why: {
        en: "Twice too big.",
        fr: "Deux fois trop grand.",
        es: "El doble de lo correcto.",
        ja: "2倍になっている。",
        zh: "大了一倍。"
      } },
      { tex: "-5000", correct: false, why: {
        en: "Not what the pairing gives.",
        fr: "Ce n’est pas ce que donne le regroupement.",
        es: "No es lo que da el emparejamiento.",
        ja: "組にした結果と合わない。",
        zh: "与分组结果不符。"
      } },
      { tex: "-338350", correct: false, why: {
        en: "That is minus the sum of all the squares.",
        fr: "C’est moins la somme de tous les carrés.",
        es: "Es menos la suma de todos los cuadrados.",
        ja: "すべての平方の和にマイナスをつけたもの。",
        zh: "那是所有平方和的相反数。"
      } },
      { tex: "-2550", correct: false, why: {
        en: "That is $-(2+4+\\cdots+100)$, only the even numbers.",
        fr: "C’est $-(2+4+\\cdots+100)$, seulement les pairs.",
        es: "Es $-(2+4+\\cdots+100)$, solo los pares.",
        ja: "$-(2+4+\\cdots+100)$、偶数だけ。",
        zh: "那是 $-(2+4+\\cdots+100)$，只有偶数。"
      } },
      { tex: "-100", correct: false, why: {
        en: "Each pair is not $-1$: it is $-(4k-1)$.",
        fr: "Chaque paire ne vaut pas $-1$ mais $-(4k-1)$.",
        es: "Cada par no vale $-1$, sino $-(4k-1)$.",
        ja: "各組は $-1$ でなく $-(4k-1)$。",
        zh: "每对不是 $-1$，而是 $-(4k-1)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pair up",
          fr: "Regrouper par paires",
          es: "Emparejar",
          ja: "組にする",
          zh: "两两配对"
        },
        lines: ["(2k-1)^2-(2k)^2=-\\big((2k-1)+2k\\big)=-(4k-1)"],
        note: {
          en: "A difference of two squares of neighbours is minus their sum.",
          fr: "Une différence de carrés de deux voisins vaut moins leur somme.",
          es: "La diferencia de cuadrados de dos vecinos es menos su suma.",
          ja: "隣り合う2数の平方の差は、その和にマイナスをつけたもの。",
          zh: "相邻两数平方差等于它们和的相反数。"
        }
      },
      {
        title: {
          en: "Add the pairs",
          fr: "Ajouter les paires",
          es: "Sumar los pares",
          ja: "組を足す",
          zh: "把各对相加"
        },
        lines: ["\\sum_{k=1}^{50}-(4k-1)=-(1+2+\\cdots+100)=-\\tfrac{100\\cdot101}{2}=\\boxed{-5050}"],
        note: {
          en: "The pairs use up $1,2,\\dots,100$ exactly once each.",
          fr: "Les paires utilisent $1,2,\\dots,100$ chacun exactement une fois.",
          es: "Los pares usan $1,2,\\dots,100$ cada uno exactamente una vez.",
          ja: "組で $1,2,\\dots,100$ をちょうど1回ずつ使う。",
          zh: "各对恰好各用一次 $1,2,\\dots,100$。"
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
