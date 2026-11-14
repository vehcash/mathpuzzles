/* number · f(2n) = f(n), f(2n+1) = f(n) + f(n+1): where is f = 3?
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2022b-stern-sequence-equals-three",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question H",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question H",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta H",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 H",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 H 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "f(2n) = f(n), f(2n+1) = f(n) + f(n+1): where is f = 3?",
      fr: "f(2n) = f(n), f(2n+1) = f(n) + f(n+1) : où f vaut-elle 3 ?",
      es: "f(2n) = f(n), f(2n+1) = f(n) + f(n+1): ¿dónde vale f 3?",
      ja: "f(2n) = f(n), f(2n+1) = f(n) + f(n+1)：f = 3 となるのは？",
      zh: "f(2n) = f(n)，f(2n+1) = f(n) + f(n+1)：何处 f = 3？"
    },
    statement: {
      en: "Define $f(1)=1$ and, for $n\\ge1$, $f(2n)=f(n)$ and $f(2n+1)=f(n)+f(n+1)$. Consider the positive integers $n$ that are multiples of $35$ and have $f(n)=3$. <b>Which of the following are true?</b>",
      fr: "On pose $f(1)=1$ et, pour $n\\ge1$, $f(2n)=f(n)$ et $f(2n+1)=f(n)+f(n+1)$. On considère les entiers $n>0$ multiples de $35$ tels que $f(n)=3$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $f(1)=1$ y, para $n\\ge1$, $f(2n)=f(n)$ y $f(2n+1)=f(n)+f(n+1)$. Considera los enteros positivos $n$ múltiplos de $35$ con $f(n)=3$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(1)=1$、$n\\ge1$ で $f(2n)=f(n)$、$f(2n+1)=f(n)+f(n+1)$ と定めます。$35$ の倍数で $f(n)=3$ となる正の整数 $n$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "定义 $f(1)=1$，$n\\ge1$ 时 $f(2n)=f(n)$，$f(2n+1)=f(n)+f(n+1)$。考虑满足 $f(n)=3$ 的 $35$ 的正倍数 $n$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The first values of f: 1, 1, 2, 1, 3, 2, 3, 1, 4, …",
      fr: "Les premières valeurs de f : 1, 1, 2, 1, 3, 2, 3, 1, 4, …",
      es: "Los primeros valores de f: 1, 1, 2, 1, 3, 2, 3, 1, 4, …",
      ja: "f の最初の値：1, 1, 2, 1, 3, 2, 3, 1, 4, …",
      zh: "f 的前几项：1, 1, 2, 1, 3, 2, 3, 1, 4, …"
    },
    hint: {
      en: "Halving does not change $f$. Which odd numbers have $f=3$? Then $f(n)=3$ means $n=(\\text{that odd number})\\cdot2^k$.",
      fr: "Diviser par $2$ ne change pas $f$. Quels impairs ont $f=3$ ? Alors $f(n)=3$ signifie $n=(\\text{cet impair})\\cdot2^k$.",
      es: "Dividir entre $2$ no cambia $f$. ¿Qué impares tienen $f=3$? Entonces $f(n)=3$ significa $n=(\\text{ese impar})\\cdot2^k$.",
      ja: "2で割っても $f$ は不変。$f=3$ の奇数は？ すると $f(n)=3$ は $n=(\\text{その奇数})\\cdot2^k$。",
      zh: "除以 $2$ 不改变 $f$。哪些奇数 $f=3$？则 $f(n)=3$ 即 $n=(\\text{该奇数})\\cdot2^k$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.7, scale: 46, pad: 16 });
      [1, 1, 2, 1, 3, 2, 3, 1, 4, 3, 5, 2].forEach((v, k) => { F.rect(0.15 + k * 0.53, 0.45, 0.46, 0.6, 'fill-blue', 'fills'); F.text([0.38 + k * 0.53, 0.75], String(v), 'len small', 0, 0); F.text([0.38 + k * 0.53, 0.45], String(k + 1), 'tick', 0, 14); });
      F.reveal = () => {
      [4, 6, 9].forEach(k => F.rect(0.15 + k * 0.53, 0.45, 0.46, 0.6, 'fill-yellow', 'fills'));
      F.text([3.3, 1.45], '5·2ᵏ, 7·2ᵏ', 'len small', 0, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "5·2ᵏ, 7·2ᵏ": {"fr": "5·2ᵏ, 7·2ᵏ", "es": "5·2ᵏ, 7·2ᵏ", "ja": "5·2ᵏ, 7·2ᵏ", "zh": "5·2ᵏ, 7·2ᵏ"},
      "that odd number": {"fr": "cet impair", "es": "ese impar", "ja": "その奇数", "zh": "该奇数"},
      "there are none": {"fr": "il n’y en a aucun", "es": "no hay ninguno", "ja": "存在しない", "zh": "一个也没有"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "exactly one": {"fr": "exactement un", "es": "exactamente uno", "ja": "ちょうど1つ", "zh": "恰有一个"},
      "exactly two": {"fr": "exactement deux", "es": "exactamente dos", "ja": "ちょうど2つ", "zh": "恰有两个"},
      "infinitely many": {"fr": "une infinité", "es": "infinitos", "ja": "無限に多い", "zh": "无穷多个"},
      "exactly three": {"fr": "exactement trois", "es": "exactamente tres", "ja": "ちょうど3つ", "zh": "恰有三个"},
      "for": {"fr": "pour", "es": "para", "ja": "で", "zh": "当"}
    },
    options: [
      { tex: "\\text{there are none}", correct: true, why: {
        en: "$f(n)=3$ only for $n=5\\cdot2^k$ or $7\\cdot2^k$, never divisible by $35$.",
        fr: "$f(n)=3$ seulement pour $n=5\\cdot2^k$ ou $7\\cdot2^k$, jamais multiples de $35$.",
        es: "$f(n)=3$ solo para $n=5\\cdot2^k$ o $7\\cdot2^k$, nunca múltiplos de $35$.",
        ja: "$f(n)=3$ は $n=5\\cdot2^k$ か $7\\cdot2^k$ のみで、$35$ の倍数にならない。",
        zh: "$f(n)=3$ 仅当 $n=5\\cdot2^k$ 或 $7\\cdot2^k$，不可能被 $35$ 整除。"
      } },
      { tex: "f(n)=3\\iff n=5\\cdot2^k\\ \\text{or}\\ 7\\cdot2^k", correct: true, why: {
        en: "For odd $n=2m+1>7$, both $f(m),f(m+1)\\ge1$ and one of them is already $\\ge2$.",
        fr: "Pour $n=2m+1>7$ impair, $f(m),f(m+1)\\ge1$ et l’un vaut déjà $\\ge2$.",
        es: "Para $n=2m+1>7$ impar, $f(m),f(m+1)\\ge1$ y uno ya es $\\ge2$.",
        ja: "奇数 $n=2m+1>7$ では $f(m),f(m+1)\\ge1$ で一方は $\\ge2$。",
        zh: "奇数 $n=2m+1>7$ 时 $f(m),f(m+1)\\ge1$ 且其一 $\\ge2$。"
      } },
      { tex: "\\text{exactly one}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{exactly two}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{infinitely many}", correct: false, why: {
        en: "There are infinitely many $n$ with $f(n)=3$, but none is a multiple of $35$.",
        fr: "Une infinité de $n$ ont $f(n)=3$, mais aucun n’est multiple de $35$.",
        es: "Infinitos $n$ tienen $f(n)=3$, pero ninguno es múltiplo de $35$.",
        ja: "$f(n)=3$ の $n$ は無限にあるが $35$ の倍数はない。",
        zh: "有无穷多个 $n$ 使 $f(n)=3$，但都不是 $35$ 的倍数。"
      } },
      { tex: "f(35)=3", correct: false, why: {
        en: "$f(35)=f(17)+f(18)=5+4=9$",
        fr: "$f(35)=f(17)+f(18)=5+4=9$",
        es: "$f(35)=f(17)+f(18)=5+4=9$",
        ja: "$f(35)=f(17)+f(18)=5+4=9$",
        zh: "$f(35)=f(17)+f(18)=5+4=9$"
      } },
      { tex: "f(9)=3", correct: false, why: {
        en: "$f(9)=f(4)+f(5)=1+3=4$",
        fr: "$f(9)=f(4)+f(5)=1+3=4$",
        es: "$f(9)=f(4)+f(5)=1+3=4$",
        ja: "$f(9)=f(4)+f(5)=1+3=4$",
        zh: "$f(9)=f(4)+f(5)=1+3=4$"
      } },
      { tex: "\\text{exactly three}", correct: false, why: {
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
          en: "Strip factors of 2",
          fr: "Retirer les facteurs 2",
          es: "Quitar los factores 2",
          ja: "2の因数を除く",
          zh: "去掉因子 2"
        },
        lines: ["f(2^k m)=f(m)"],
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
          en: "Odd values equal to 3",
          fr: "Valeurs impaires égales à 3",
          es: "Impares con valor 3",
          ja: "値が3の奇数",
          zh: "取值为 3 的奇数"
        },
        lines: ["f(5)=f(7)=3,\\quad f(2m+1)=f(m)+f(m+1)\\ge4\\ \\text{for}\\ m\\ge4"],
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
