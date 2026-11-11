/* algebra · Growing faster than Fibonacci
   Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2024-fibonacci-bound",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 8",
        fr: "Gaokao 2024, épreuve nationale I (新课标Ⅰ卷), question 8",
        es: "Gaokao 2024, examen nacional I (新课标Ⅰ卷), pregunta 8",
        ja: "2024年 中国・高考 新課程標準Ⅰ卷 第8問",
        zh: "2024年高考数学新课标Ⅰ卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "Growing faster than Fibonacci",
      fr: "Plus vite que Fibonacci",
      es: "Más rápido que Fibonacci",
      ja: "フィボナッチより速く",
      zh: "比斐波那契增长更快"
    },
    statement: {
      en: "A function $f$ defined on $\\mathbb{R}$ satisfies $f(x) > f(x-1)+f(x-2)$ for every $x$, and $f(x)=x$ for $x<3$. <b>Which of the following must be true?</b>",
      fr: "Une fonction $f$ définie sur $\\mathbb{R}$ vérifie $f(x) > f(x-1)+f(x-2)$ pour tout $x$, et $f(x)=x$ pour $x<3$. <b>Lesquelles des affirmations suivantes sont forcément vraies ?</b>",
      es: "Una función $f$ definida en $\\mathbb{R}$ cumple $f(x) > f(x-1)+f(x-2)$ para todo $x$, y $f(x)=x$ para $x<3$. <b>¿Cuáles de las siguientes son necesariamente ciertas?</b>",
      ja: "$\\mathbb{R}$ 上の関数 $f$ が、すべての $x$ で $f(x) > f(x-1)+f(x-2)$、$x<3$ で $f(x)=x$ を満たします。<b>次のうち必ず正しいものはどれですか？</b>",
      zh: "定义在 $\\mathbb{R}$ 上的函数 $f$ 对任意 $x$ 满足 $f(x) > f(x-1)+f(x-2)$，且 $x<3$ 时 $f(x)=x$。<b>下列哪些一定成立？</b>"
    },
    figureText: {
      en: "Bars for n = 1 to 10 with only the first two lower bounds, 1 and 2, drawn. The rest are built in the solution.",
      fr: "Barres pour n = 1 à 10, avec seulement les deux premières bornes, 1 et 2. Les autres sont construites dans la solution.",
      es: "Barras para n = 1 a 10 con solo las dos primeras cotas, 1 y 2. El resto se construye en la solución.",
      ja: "n = 1〜10 の棒。最初の2つの下限 1, 2 だけを描く。残りは解答で作ります。",
      zh: "n = 1 到 10 的竖条，只画出前两个下界 1 和 2。其余在解答中构造。"
    },
    hint: {
      en: "Look only at whole numbers: $f(1)=1$, $f(2)=2$, then $f(3)>3$, $f(4)>f(3)+f(2)>5$, …",
      fr: "Regardez seulement les entiers : $f(1)=1$, $f(2)=2$, puis $f(3)>3$, $f(4)>f(3)+f(2)>5$, …",
      es: "Mira solo los enteros: $f(1)=1$, $f(2)=2$, luego $f(3)>3$, $f(4)>f(3)+f(2)>5$, …",
      ja: "整数だけを見ましょう：$f(1)=1$、$f(2)=2$、$f(3)>3$、$f(4)>f(3)+f(2)>5$、…",
      zh: "只看整数：$f(1)=1$，$f(2)=2$，然后 $f(3)>3$，$f(4)>f(3)+f(2)>5$，……"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.4, scale: 52, pad: 16 });
      const b = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
      b.forEach((v, i) => { const x = 0.3 + i * 0.62; F.text([x + 0.23, 0.35], String(i + 1), 'tick', 0, 10); if (i < 2) { const h = v / 30; F.rect(x, 0.35, 0.46, h, 'tri'); F.text([x + 0.23, 0.35 + h], String(v), 'tick', 0, -8); } });
      F.seg([0.1, 0.35], [6.4, 0.35], 'axis');
      F.reveal = () => {
      b.forEach((v, i) => { if (i < 2) return; const x = 0.3 + i * 0.62, h = v / 30; F.rect(x, 0.35, 0.46, h, i === 9 ? 'tri fill-yellow' : 'tri'); F.text([x + 0.23, 0.35 + h], String(v), 'tick', 0, -8); });
      };
      return F;
    },
    options: [
      { tex: "f(10) > 89", correct: true, why: {
        en: "$f(n)$ beats the sequence $1,2,3,5,8,\\dots$ whose 10th term is $89$.",
        fr: "$f(n)$ dépasse la suite $1,2,3,5,8,\\dots$ dont le 10ᵉ terme vaut $89$.",
        es: "$f(n)$ supera la sucesión $1,2,3,5,8,\\dots$ cuyo término 10 es $89$.",
        ja: "$f(n)$ は数列 $1,2,3,5,8,\\dots$ より大きく、その第10項は $89$。",
        zh: "$f(n)$ 大于数列 $1,2,3,5,8,\\dots$，其第 10 项为 $89$。"
      } },
      { tex: "f(20) > 1000", correct: true, why: {
        en: "The bound for $n=20$ is $10946$.",
        fr: "Le minorant pour $n=20$ est $10946$.",
        es: "La cota para $n=20$ es $10946$.",
        ja: "$n=20$ の下界は $10946$。",
        zh: "$n=20$ 的下界是 $10946$。"
      } },
      { tex: "f(10) > 100", correct: false, why: {
        en: "Not forced: $f(10)$ can be just above $89$.",
        fr: "Pas forcé : $f(10)$ peut être juste au-dessus de $89$.",
        es: "No es obligatorio: $f(10)$ puede quedar justo por encima de $89$.",
        ja: "必ずではない：$f(10)$ は $89$ をわずかに超えるだけでもよい。",
        zh: "不一定：$f(10)$ 可以仅略大于 $89$。"
      } },
      { tex: "f(10) < 1000", correct: false, why: {
        en: "Only lower bounds are given; $f$ may grow as fast as it likes.",
        fr: "On n’a que des minorants ; $f$ peut croître aussi vite qu’elle veut.",
        es: "Solo hay cotas inferiores; $f$ puede crecer tan rápido como quiera.",
        ja: "下界しかないので、$f$ はいくらでも速く増えてよい。",
        zh: "只有下界，$f$ 可以增长得任意快。"
      } },
      { tex: "f(20) < 10000", correct: false, why: {
        en: "Impossible: $f(20) > 10946$.",
        fr: "Impossible : $f(20) > 10946$.",
        es: "Imposible: $f(20) > 10946$.",
        ja: "不可能：$f(20) > 10946$。",
        zh: "不可能：$f(20) > 10946$。"
      } },
      { tex: "f(3) = 3", correct: false, why: {
        en: "$f(3) > f(2)+f(1) = 3$; the rule $f(x)=x$ is only for $x<3$.",
        fr: "$f(3) > f(2)+f(1) = 3$ ; la règle $f(x)=x$ ne vaut que pour $x<3$.",
        es: "$f(3) > f(2)+f(1) = 3$; la regla $f(x)=x$ solo vale para $x<3$.",
        ja: "$f(3) > f(2)+f(1) = 3$。$f(x)=x$ は $x<3$ のときだけ。",
        zh: "$f(3) > f(2)+f(1) = 3$；$f(x)=x$ 只对 $x<3$ 成立。"
      } },
      { tex: "f(4) > 6", correct: false, why: {
        en: "Only $f(4) > 5$ is forced ($f(4)=5.5$ is possible).",
        fr: "Seul $f(4) > 5$ est forcé ($f(4)=5{,}5$ est possible).",
        es: "Solo se garantiza $f(4) > 5$ ($f(4)=5{,}5$ es posible).",
        ja: "保証されるのは $f(4) > 5$ だけ（$f(4)=5.5$ もあり得る）。",
        zh: "只能保证 $f(4) > 5$（$f(4)=5.5$ 也可以）。"
      } },
      { tex: "f(20) < f(19)", correct: false, why: {
        en: "$f(20) > f(19)+f(18)$ and $f(18)>0$.",
        fr: "$f(20) > f(19)+f(18)$ et $f(18)>0$.",
        es: "$f(20) > f(19)+f(18)$ y $f(18)>0$.",
        ja: "$f(20) > f(19)+f(18)$、$f(18)>0$。",
        zh: "$f(20) > f(19)+f(18)$ 且 $f(18)>0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "A Fibonacci-like floor",
          fr: "Un plancher à la Fibonacci",
          es: "Un suelo tipo Fibonacci",
          ja: "フィボナッチ型の下界",
          zh: "斐波那契式的下界"
        },
        lines: ["f(1)=1,\\; f(2)=2,\\; f(n)>f(n-1)+f(n-2)", "\\Rightarrow\\; f(n) > b_n:\\quad 1,2,3,5,8,13,21,34,55,89,\\dots"],
        note: {
          en: "By induction, $f(n) > b_n$ where $b_n=b_{n-1}+b_{n-2}$ (from $n=3$ on).",
          fr: "Par récurrence, $f(n) > b_n$ avec $b_n=b_{n-1}+b_{n-2}$ (à partir de $n=3$).",
          es: "Por inducción, $f(n) > b_n$ con $b_n=b_{n-1}+b_{n-2}$ (desde $n=3$).",
          ja: "帰納法で $f(n) > b_n$（$b_n=b_{n-1}+b_{n-2}$、$n\\ge3$）。",
          zh: "由归纳法，$f(n) > b_n$，其中 $b_n=b_{n-1}+b_{n-2}$（$n\\ge3$）。"
        }
      },
      {
        title: {
          en: "Read off the bounds",
          fr: "Lire les minorants",
          es: "Leer las cotas",
          ja: "下界を読む",
          zh: "读出下界"
        },
        lines: ["b_{10}=89,\\qquad b_{20}=10946", "f(10)>89,\\qquad f(20)>10946>1000"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "These are the only guarantees: $f$ can stay as close to $b_n$ as we like, or be much larger.",
          fr: "Ce sont les seules garanties : $f$ peut rester aussi près de $b_n$ qu’on veut, ou être bien plus grande.",
          es: "Son las únicas garantías: $f$ puede quedarse tan cerca de $b_n$ como queramos o ser mucho mayor.",
          ja: "保証はこれだけ：$f$ は $b_n$ にいくらでも近くも、はるかに大きくもなり得る。",
          zh: "这是仅有的保证：$f$ 可以任意接近 $b_n$，也可以大得多。"
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
          en: "Must be true = follows from the lower bounds alone.",
          fr: "Forcément vrai = découle des seuls minorants.",
          es: "Necesariamente cierto = se deduce solo de las cotas inferiores.",
          ja: "「必ず正しい」とは下界だけから従うこと。",
          zh: "“一定成立”= 仅由下界就能推出。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
