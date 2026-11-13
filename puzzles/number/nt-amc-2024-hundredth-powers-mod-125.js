/* number · Hundredth powers modulo 125
   AMC 12B 2024 (Mathematical Association of America), Problem 14 (also AMC 10B Problem 18) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-amc-2024-hundredth-powers-mod-125",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 14 (also AMC 10B Problem 18)",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 14 (aussi AMC 10B, problème 18)",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 14 (también AMC 10B, problema 18)",
        ja: "AMC 12B 2024（アメリカ数学協会）第14問（AMC 10B 第18問と共通）",
        zh: "AMC 12B 2024（美国数学协会）第 14 题（亦为 AMC 10B 第 18 题）"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "Hundredth powers modulo 125",
      fr: "Puissances centièmes modulo 125",
      es: "Potencias centésimas módulo 125",
      ja: "125 を法とした100乗",
      zh: "模 125 的 100 次幂"
    },
    statement: {
      en: "<b>Which of the following are true about the remainders of $n^{100}$ on division by $125$, as $n$ runs over the integers?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies sur les restes de $n^{100}$ dans la division par $125$, quand $n$ parcourt les entiers ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas sobre los restos de $n^{100}$ al dividir entre $125$, cuando $n$ recorre los enteros?</b>",
      ja: "<b>$n$ がすべての整数を動くとき、$n^{100}$ を $125$ で割った余りについて正しいものはどれですか？</b>",
      zh: "<b>当 $n$ 取遍所有整数时，关于 $n^{100}$ 除以 $125$ 的余数，下列哪些正确？</b>"
    },
    figureText: {
      en: "Integers sorted into two groups: multiples of 5 and the rest.",
      fr: "Les entiers répartis en deux groupes : multiples de 5 et les autres.",
      es: "Los enteros en dos grupos: múltiplos de 5 y el resto.",
      ja: "整数を5の倍数とそれ以外に分ける。",
      zh: "整数分为两组：5 的倍数与其余。"
    },
    hint: {
      en: "$\\varphi(125)=100$. Treat $5\\mid n$ separately.",
      fr: "$\\varphi(125)=100$. Traitez à part le cas $5\\mid n$.",
      es: "$\\varphi(125)=100$. Trata aparte el caso $5\\mid n$.",
      ja: "$\\varphi(125)=100$。$5\\mid n$ は別に考える。",
      zh: "$\\varphi(125)=100$；单独处理 $5\\mid n$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 1.6, scale: 52, pad: 16 });
      F.rect(0.3, 0.35, 2.0, 0.9, 'fill-blue', 'fills'); F.text([1.3, 0.8], '5 ∤ n', 'pt', 0, 0);
      F.rect(2.7, 0.35, 2.0, 0.9, 'fill-yellow', 'fills'); F.text([3.7, 0.8], '5 | n', 'pt', 0, 0);
      F.reveal = () => {
      F.text([1.3, 0.35], '→ 1', 'len small', 0, 14); F.text([3.7, 0.35], '→ 0', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "5 ∤ n": {"fr": "5 ∤ n", "es": "5 ∤ n", "ja": "5 ∤ n", "zh": "5 ∤ n"},
      "5 | n": {"fr": "5 | n", "es": "5 | n", "ja": "5 | n", "zh": "5 | n"},
      "→ 1": {"fr": "→ 1", "es": "→ 1", "ja": "→ 1", "zh": "→ 1"},
      "→ 0": {"fr": "→ 0", "es": "→ 0", "ja": "→ 0", "zh": "→ 0"},
      "exactly two remainders occur": {"fr": "exactement deux restes apparaissent", "es": "aparecen exactamente dos restos", "ja": "余りはちょうど2種類", "zh": "恰出现两种余数"},
      "exactly five remainders occur": {"fr": "exactement cinq restes apparaissent", "es": "aparecen exactamente cinco restos", "ja": "余りはちょうど5種類", "zh": "恰出现五种余数"},
      "exactly 25 remainders occur": {"fr": "exactement 25 restes apparaissent", "es": "aparecen exactamente 25 restos", "ja": "余りはちょうど25種類", "zh": "恰出现 25 种余数"},
      "for all": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"},
      "every remainder": {"fr": "chaque reste", "es": "cada resto", "ja": "すべての余り", "zh": "每个余数"},
      "occurs": {"fr": "apparaît", "es": "aparece", "ja": "が現れる", "zh": "都出现"}
    },
    options: [
      { tex: "\\text{exactly two remainders occur}", correct: true, why: {
        en: "Only $0$ and $1$.",
        fr: "Seulement $0$ et $1$.",
        es: "Solo $0$ y $1$.",
        ja: "$0$ と $1$ だけ。",
        zh: "只有 $0$ 和 $1$。"
      } },
      { tex: "7^{100}\\equiv1\\pmod{125}", correct: true, why: {
        en: "Euler’s theorem, since $\\gcd(7,125)=1$.",
        fr: "Théorème d’Euler, car $\\gcd(7,125)=1$.",
        es: "Teorema de Euler, pues $\\gcd(7,125)=1$.",
        ja: "$\\gcd(7,125)=1$ なのでオイラーの定理。",
        zh: "欧拉定理，因 $\\gcd(7,125)=1$。"
      } },
      { tex: "\\text{exactly five remainders occur}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{exactly 25 remainders occur}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10^{100}\\equiv1\\pmod{125}", correct: false, why: {
        en: "$125\\mid10^{100}$",
        fr: "$125\\mid10^{100}$",
        es: "$125\\mid10^{100}$",
        ja: "$125\\mid10^{100}$",
        zh: "$125\\mid10^{100}$"
      } },
      { tex: "n^{100}\\equiv n\\pmod{125}\\ \\text{for all}\\ n", correct: false, why: {
        en: "$n=2$: $2^{100}\\equiv1\\ne2$",
        fr: "$n=2$: $2^{100}\\equiv1\\ne2$",
        es: "$n=2$: $2^{100}\\equiv1\\ne2$",
        ja: "$n=2$: $2^{100}\\equiv1\\ne2$",
        zh: "$n=2$: $2^{100}\\equiv1\\ne2$"
      } },
      { tex: "\\text{every remainder}\\ 0,\\dots,124\\ \\text{occurs}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\varphi(125)=124", correct: false, why: {
        en: "$\\varphi(5^3)=5^3-5^2=100$",
        fr: "$\\varphi(5^3)=5^3-5^2=100$",
        es: "$\\varphi(5^3)=5^3-5^2=100$",
        ja: "$\\varphi(5^3)=5^3-5^2=100$",
        zh: "$\\varphi(5^3)=5^3-5^2=100$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Coprime case",
          fr: "Cas premier avec 5",
          es: "Caso coprimo",
          ja: "互いに素な場合",
          zh: "互素情形"
        },
        lines: ["\\gcd(n,5)=1\\Rightarrow n^{100}=n^{\\varphi(125)}\\equiv1"],
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
          en: "Multiples of 5",
          fr: "Multiples de 5",
          es: "Múltiplos de 5",
          ja: "5の倍数",
          zh: "5 的倍数"
        },
        lines: ["n=5m\\Rightarrow n^{100}=5^{100}m^{100}\\equiv0"],
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
