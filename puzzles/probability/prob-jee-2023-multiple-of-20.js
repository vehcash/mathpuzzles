/* probability · A multiple of 20, given a multiple of 5
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2023-multiple-of-20",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.10",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.10",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.10",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.10"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A multiple of 20, given a multiple of 5",
      fr: "Multiple de 20 sachant multiple de 5",
      es: "Múltiplo de 20 sabiendo que es múltiplo de 5",
      ja: "5の倍数のとき20の倍数である確率",
      zh: "已知是 5 的倍数时是 20 的倍数"
    },
    statement: {
      en: "$X$ is the set of all five-digit numbers formed from five of the seven digits $1,2,2,2,4,4,0$ (no leading $0$). An element of $X$ is chosen at random, and $p$ is the conditional probability that it is a multiple of $20$ given that it is a multiple of $5$. <b>Which of the following equal $38p$?</b>",
      fr: "$X$ est l’ensemble des nombres à cinq chiffres formés avec cinq des sept chiffres $1,2,2,2,4,4,0$ (pas de $0$ en tête). On choisit un élément de $X$ au hasard ; $p$ est la probabilité qu’il soit multiple de $20$ sachant qu’il est multiple de $5$. <b>Lesquelles des valeurs suivantes sont égales à $38p$ ?</b>",
      es: "$X$ es el conjunto de números de cinco cifras formados con cinco de los siete dígitos $1,2,2,2,4,4,0$ (sin $0$ inicial). Se elige un elemento de $X$ al azar y $p$ es la probabilidad de que sea múltiplo de $20$ sabiendo que es múltiplo de $5$. <b>¿Cuáles de los siguientes valores son iguales a $38p$?</b>",
      ja: "7個の数字 $1,2,2,2,4,4,0$ から5個を使ってできる5桁の数（先頭は $0$ でない）全体を $X$ とします。$X$ から無作為に1つ選び、5 の倍数であるとき 20 の倍数である条件付き確率を $p$ とします。<b>$38p$ に等しいものはどれですか？</b>",
      zh: "$X$ 是用七个数字 $1,2,2,2,4,4,0$ 中的五个组成的所有五位数（首位不为 $0$）。从 $X$ 中随机取一个数，已知它是 $5$ 的倍数时它是 $20$ 的倍数的条件概率为 $p$。<b>下列哪些等于 $38p$？</b>"
    },
    figureText: {
      en: "Five slots with the last one fixed as 0. The tens digit decides divisibility by 20: it must be even.",
      fr: "Cinq cases, la dernière fixée à 0. Le chiffre des dizaines décide de la divisibilité par 20 : il doit être pair.",
      es: "Cinco casillas con la última fija en 0. La cifra de las decenas decide la divisibilidad por 20: debe ser par.",
      ja: "5つの枠で最後は 0。20 で割り切れるかは十の位が偶数かどうかで決まる。",
      zh: "五个位置，最后一位固定为 0。能否被 20 整除取决于十位：必须是偶数。"
    },
    hint: {
      en: "With no $5$ available, a multiple of $5$ must end in $0$. Then a multiple of $20$ needs an even tens digit.",
      fr: "Sans $5$ disponible, un multiple de $5$ finit par $0$. Un multiple de $20$ exige alors un chiffre des dizaines pair.",
      es: "Sin $5$ disponible, un múltiplo de $5$ acaba en $0$. Un múltiplo de $20$ necesita entonces decenas pares.",
      ja: "$5$ がないので 5 の倍数は末尾 $0$。20 の倍数には十の位が偶数であることが必要。",
      zh: "没有 $5$，所以 $5$ 的倍数末位必为 $0$；$20$ 的倍数还需十位为偶数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.2, scale: 50, pad: 14 });
      ['', '', '', '', '0'].forEach((t, i) => { const x = 0.4 + i * 1.08; F.rect(x, 0.7, 0.9, 0.9, i === 3 ? 'tri fill-yellow' : (i === 4 ? 'tri fill-blue' : 'tri')); F.text([x + 0.45, 1.15], t, 'pt', 0, 0); });
      F.text([3.87, 0.3], 'even?', 'len small', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "arrange 4 of": {"fr": "arranger 4 parmi", "es": "ordenar 4 de", "ja": "から4個並べる", "zh": "取 4 个排列"},
      "arrange 3 of": {"fr": "arranger 3 parmi", "es": "ordenar 3 de", "ja": "から3個並べる", "zh": "取 3 个排列"}
    },
    options: [
      { tex: "31", correct: true, why: {
        en: "$p=\\tfrac{31}{38}$: 38 numbers end in $0$, 7 of them have tens digit $1$.",
        fr: "$p=\\tfrac{31}{38}$: 38 numbers end in $0$, 7 of them have tens digit $1$.",
        es: "$p=\\tfrac{31}{38}$: 38 numbers end in $0$, 7 of them have tens digit $1$.",
        ja: "$p=\\tfrac{31}{38}$: 38 numbers end in $0$, 7 of them have tens digit $1$.",
        zh: "$p=\\tfrac{31}{38}$: 38 numbers end in $0$, 7 of them have tens digit $1$."
      } },
      { tex: "38\\cdot\\tfrac{31}{38}", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "38", correct: false, why: {
        en: "Would need every multiple of $5$ to be a multiple of $20$; tens digit $1$ fails.",
        fr: "Il faudrait que tout multiple de $5$ soit multiple de $20$ ; un chiffre des dizaines $1$ échoue.",
        es: "Haría falta que todo múltiplo de $5$ lo fuera de $20$; decenas $1$ falla.",
        ja: "5 の倍数がすべて 20 の倍数である必要があるが、十の位 $1$ で失敗。",
        zh: "需要每个 $5$ 的倍数都是 $20$ 的倍数，但十位为 $1$ 时不行。"
      } },
      { tex: "7", correct: false, why: {
        en: "That is the number of bad cases (tens digit 1).",
        fr: "C’est le nombre de mauvais cas (dizaines 1).",
        es: "Es el número de casos malos (decenas 1).",
        ja: "十の位が 1 の悪い場合の数。",
        zh: "那是十位为 1 的反例个数。"
      } },
      { tex: "24", correct: false, why: {
        en: "Treats the three 2’s and two 4’s as distinct in part of the count.",
        fr: "Traite les 2 et les 4 comme distincts dans une partie du calcul.",
        es: "Trata los 2 y los 4 como distintos en parte del conteo.",
        ja: "一部で 2 や 4 を区別してしまった。",
        zh: "部分计数时把相同的 2、4 当成不同。"
      } },
      { tex: "19", correct: false, why: {
        en: "Assumes half the tens digits are even.",
        fr: "Suppose que la moitié des dizaines sont paires.",
        es: "Supone que la mitad de las decenas son pares.",
        ja: "十の位の半分が偶数と仮定。",
        zh: "假设十位一半是偶数。"
      } },
      { tex: "\\tfrac{31}{38}", correct: false, why: {
        en: "That is $p$; the question asks for $38p$.",
        fr: "C’est $p$ ; on demande $38p$.",
        es: "Es $p$; se pide $38p$.",
        ja: "それは $p$。問われているのは $38p$。",
        zh: "那是 $p$，题目问 $38p$。"
      } },
      { tex: "212", correct: false, why: {
        en: "$|X|=212$, the size of the whole set.",
        fr: "$|X|=212$, la taille de tout l’ensemble.",
        es: "$|X|=212$, el tamaño de todo el conjunto.",
        ja: "$|X|=212$、集合全体の大きさ。",
        zh: "$|X|=212$，整个集合的大小。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Multiples of 5",
          fr: "Multiples de 5",
          es: "Múltiplos de 5",
          ja: "5 の倍数",
          zh: "5 的倍数"
        },
        lines: ["\\square\\square\\square\\square\\,0:\\ \\text{arrange 4 of } \\{1,2,2,2,4,4\\}\\ \\Rightarrow\\ 38"],
        note: {
          en: "Count arrangements of 4 digits from that multiset (cases 2,2,2,·; 2,2,4,4; and so on).",
          fr: "On compte les arrangements de 4 chiffres de ce multi-ensemble.",
          es: "Se cuentan las ordenaciones de 4 dígitos de ese multiconjunto.",
          ja: "その多重集合から4個を並べる方法を数える。",
          zh: "数从该多重集中取 4 个排列的方法。"
        }
      },
      {
        title: {
          en: "Bad tens digit",
          fr: "Mauvais chiffre des dizaines",
          es: "Decenas malas",
          ja: "十の位が奇数",
          zh: "十位为奇数"
        },
        lines: ["\\square\\square\\square\\,1\\,0:\\ \\text{arrange 3 of }\\{2,2,2,4,4\\}\\ \\Rightarrow\\ 1+3+3=7"],
        note: {
          en: "$222$, three arrangements of $2,2,4$, three of $2,4,4$.",
          fr: "$222$, trois arrangements de $2,2,4$, trois de $2,4,4$.",
          es: "$222$, tres de $2,2,4$, tres de $2,4,4$.",
          ja: "$222$、$2,2,4$ の並べ方3通り、$2,4,4$ の3通り。",
          zh: "$222$，$2,2,4$ 三种排法，$2,4,4$ 三种。"
        }
      },
      {
        title: {
          en: "Conditional probability",
          fr: "Probabilité conditionnelle",
          es: "Probabilidad condicional",
          ja: "条件付き確率",
          zh: "条件概率"
        },
        lines: ["p=\\frac{38-7}{38}=\\frac{31}{38},\\qquad38p=\\boxed{31}"],
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
