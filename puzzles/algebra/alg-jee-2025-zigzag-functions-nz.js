/* algebra · Zigzag maps between ℕ and ℤ
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2025-zigzag-functions-nz",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.6",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.6",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.6",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Zigzag maps between ℕ and ℤ",
      fr: "Applications en zigzag entre ℕ et ℤ",
      es: "Funciones en zigzag entre ℕ y ℤ",
      ja: "ℕ と ℤ の間のジグザグ写像",
      zh: "ℕ 与 ℤ 之间的锯齿映射"
    },
    statement: {
      en: "$f:\\mathbb N\\to\\mathbb Z$, $f(n)=\\tfrac{n+1}2$ for odd $n$ and $\\tfrac{4-n}2$ for even $n$. $g:\\mathbb Z\\to\\mathbb N$, $g(n)=3+2n$ for $n\\ge0$ and $-2n$ for $n<0$. <b>Which of the following are true?</b>",
      fr: "$f:\\mathbb N\\to\\mathbb Z$, $f(n)=\\tfrac{n+1}2$ si $n$ est impair et $\\tfrac{4-n}2$ si $n$ est pair. $g:\\mathbb Z\\to\\mathbb N$, $g(n)=3+2n$ si $n\\ge0$ et $-2n$ si $n<0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f:\\mathbb N\\to\\mathbb Z$, $f(n)=\\tfrac{n+1}2$ si $n$ es impar y $\\tfrac{4-n}2$ si $n$ es par. $g:\\mathbb Z\\to\\mathbb N$, $g(n)=3+2n$ si $n\\ge0$ y $-2n$ si $n<0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f:\\mathbb N\\to\\mathbb Z$ は $n$ が奇数なら $\\tfrac{n+1}2$、偶数なら $\\tfrac{4-n}2$。$g:\\mathbb Z\\to\\mathbb N$ は $n\\ge0$ なら $3+2n$、$n<0$ なら $-2n$。<b>次のうち正しいものはどれですか？</b>",
      zh: "$f:\\mathbb N\\to\\mathbb Z$，$n$ 为奇数时 $f(n)=\\tfrac{n+1}2$，为偶数时 $f(n)=\\tfrac{4-n}2$；$g:\\mathbb Z\\to\\mathbb N$，$n\\ge0$ 时 $g(n)=3+2n$，$n<0$ 时 $g(n)=-2n$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A table of the first values: n = 1, 2, 3, 4, 5, 6 go to f(n) = 1, 1, 2, 0, 3, −1.",
      fr: "Un tableau des premières valeurs : n = 1, 2, 3, 4, 5, 6 donnent f(n) = 1, 1, 2, 0, 3, −1.",
      es: "Una tabla de los primeros valores: n = 1, 2, 3, 4, 5, 6 dan f(n) = 1, 1, 2, 0, 3, −1.",
      ja: "最初の値の表：n = 1, 2, 3, 4, 5, 6 で f(n) = 1, 1, 2, 0, 3, −1。",
      zh: "前几个值：n = 1, 2, 3, 4, 5, 6 对应 f(n) = 1, 1, 2, 0, 3, −1。"
    },
    hint: {
      en: "List a few values of each map. Which natural number does $g$ never reach?",
      fr: "Listez quelques valeurs de chaque application. Quel entier naturel $g$ n’atteint-elle jamais ?",
      es: "Haz una lista de valores. ¿Qué natural no alcanza nunca $g$?",
      ja: "いくつか値を並べる。$g$ が決してとらない自然数は？",
      zh: "列出几个值。$g$ 永远取不到哪个自然数？"
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
      const n = [1, 2, 3, 4, 5, 6], f = ['1', '1', '2', '0', '3', '−1'];
      F.text([0.4, 1.3], 'n', 'pt', 0, 0); F.text([0.4, 0.5], 'f(n)', 'len small', 0, 0);
      n.forEach((v, k) => { F.text([1.3 + k * 0.8, 1.3], String(v), 'len small', 0, 0); F.text([1.3 + k * 0.8, 0.5], f[k], 'len small', 0, 0); });
      F.reveal = () => {
      F.text([3.3, 0.0], 'f ∘ g (n) = n + 2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "f(n)": {"fr": "f(n)", "es": "f(n)", "ja": "f(n)", "zh": "f(n)"},
      "f ∘ g (n) = n + 2": {"fr": "f ∘ g (n) = n + 2", "es": "f ∘ g (n) = n + 2", "ja": "f ∘ g (n) = n + 2", "zh": "f ∘ g (n) = n + 2"},
      "is neither one-one nor onto": {"fr": "n’est ni injective ni surjective", "es": "no es ni inyectiva ni sobreyectiva", "ja": "は単射でも全射でもない", "zh": "既非单射也非满射"},
      "is onto but not one-one": {"fr": "est surjective mais pas injective", "es": "es sobreyectiva pero no inyectiva", "ja": "は全射だが単射でない", "zh": "是满射但非单射"},
      "is one-one and onto": {"fr": "est injective et surjective", "es": "es inyectiva y sobreyectiva", "ja": "は単射かつ全射", "zh": "是单射且满射"},
      "is one-one": {"fr": "est injective", "es": "es inyectiva", "ja": "は単射", "zh": "是单射"},
      "is not one-one": {"fr": "n’est pas injective", "es": "no es inyectiva", "ja": "は単射でない", "zh": "不是单射"},
      "is not onto": {"fr": "n’est pas surjective", "es": "no es sobreyectiva", "ja": "は全射でない", "zh": "不是满射"},
      "is onto": {"fr": "est surjective", "es": "es sobreyectiva", "ja": "は全射", "zh": "是满射"},
      "missed": {"fr": "manqué", "es": "no alcanzado", "ja": "をとらない", "zh": "取不到"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对任意"},
      "misses": {"fr": "manque", "es": "no alcanza", "ja": "は次をとらない：", "zh": "取不到"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"}
    },
    options: [
      { tex: "g\\circ f\\ \\text{is neither one-one nor onto}", correct: true, why: {
        en: "$f(1)=f(2)$, and $g$ never takes the value $1$.",
        fr: "$f(1)=f(2)$, et $g$ ne prend jamais la valeur $1$.",
        es: "$f(1)=f(2)$, y $g$ nunca toma el valor $1$.",
        ja: "$f(1)=f(2)$ で、$g$ は値 $1$ をとらない。",
        zh: "$f(1)=f(2)$，且 $g$ 取不到 $1$。"
      } },
      { tex: "f\\ \\text{is onto but not one-one}", correct: true, why: {
        en: "Odd $n$ give $1,2,3,\\dots$; even $n$ give $1,0,-1,\\dots$.",
        fr: "Les impairs donnent $1,2,3,\\dots$ ; les pairs $1,0,-1,\\dots$.",
        es: "Los impares dan $1,2,3,\\dots$; los pares $1,0,-1,\\dots$.",
        ja: "奇数で $1,2,3,\\dots$、偶数で $1,0,-1,\\dots$。",
        zh: "奇数给出 $1,2,3,\\dots$，偶数给出 $1,0,-1,\\dots$。"
      } },
      { tex: "f\\circ g\\ \\text{is onto but not one-one}", correct: false, why: {
        en: "$f(g(n))=n+2$ is a bijection.",
        fr: "$f(g(n))=n+2$ est une bijection.",
        es: "$f(g(n))=n+2$ es una biyección.",
        ja: "$f(g(n))=n+2$ は全単射。",
        zh: "$f(g(n))=n+2$ 是双射。"
      } },
      { tex: "g\\ \\text{is one-one and onto}", correct: false, why: {
        en: "One-one, but $1$ is missed.",
        fr: "Injective, mais $1$ n’est pas atteint.",
        es: "Inyectiva, pero no alcanza $1$.",
        ja: "単射だが $1$ をとらない。",
        zh: "单射，但取不到 $1$。"
      } },
      { tex: "f\\ \\text{is one-one}", correct: false, why: {
        en: "$f(1)=f(2)=1$.",
        fr: "$f(1)=f(2)=1$.",
        es: "$f(1)=f(2)=1$.",
        ja: "$f(1)=f(2)=1$。",
        zh: "$f(1)=f(2)=1$。"
      } },
      { tex: "g\\ \\text{is not one-one}", correct: false, why: {
        en: "Values for $n\\ge0$ are odd $\\ge3$ and for $n<0$ even: no repeats.",
        fr: "Pour $n\\ge0$ des impairs $\\ge3$, pour $n<0$ des pairs : pas de répétition.",
        es: "Para $n\\ge0$ impares $\\ge3$, para $n<0$ pares: sin repeticiones.",
        ja: "$n\\ge0$ で $3$ 以上の奇数、$n<0$ で偶数。重複なし。",
        zh: "$n\\ge0$ 时为不小于 $3$ 的奇数，$n<0$ 时为偶数，不重复。"
      } },
      { tex: "f\\circ g\\ \\text{is not onto}", correct: false, why: {
        en: "Every integer $m$ is $f(g(m-2))$.",
        fr: "Tout entier $m$ vaut $f(g(m-2))$.",
        es: "Todo entero $m$ es $f(g(m-2))$.",
        ja: "任意の整数 $m=f(g(m-2))$。",
        zh: "任意整数 $m=f(g(m-2))$。"
      } },
      { tex: "g\\circ f\\ \\text{is onto}", correct: false, why: {
        en: "It never takes the value $1$.",
        fr: "Elle ne prend jamais la valeur $1$.",
        es: "Nunca toma el valor $1$.",
        ja: "値 $1$ をとらない。",
        zh: "取不到 $1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "f",
          fr: "f",
          es: "f",
          ja: "f",
          zh: "f"
        },
        lines: ["f(1),f(3),f(5),\\ldots=1,2,3,\\ldots;\\quad f(2),f(4),f(6),\\ldots=1,0,-1,\\ldots"],
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
          en: "g",
          fr: "g",
          es: "g",
          ja: "g",
          zh: "g"
        },
        lines: ["g(0),g(1),\\ldots=3,5,7,\\ldots;\\quad g(-1),g(-2),\\ldots=2,4,6,\\ldots\\ (1\\ \\text{missed})"],
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
          en: "Compositions",
          fr: "Composées",
          es: "Composiciones",
          ja: "合成",
          zh: "复合"
        },
        lines: ["f(g(n))=n+2\\ \\text{for all}\\ n;\\qquad g\\circ f\\ \\text{misses}\\ 1\\ \\text{and}\\ f(1)=f(2)"],
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
