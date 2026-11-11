/* combinatorics · Counting with a product of binomials
   Oxford MAT 2019 (Mathematics Admissions Test), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2019-distinct-parts",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 2",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 2",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 2",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 2",
        zh: "牛津大学数学入学考试 MAT 2019 第 2 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Counting with a product of binomials",
      fr: "Compter avec un produit de binômes",
      es: "Contar con un producto de binomios",
      ja: "二項式の積で数える",
      zh: "用二项式之积计数"
    },
    statement: {
      en: "Expand $p(x)=(1+x)(1+x^2)(1+x^3)(1+x^4)(1+x^5)(1+x^6)$. <b>Which of the following equal the coefficient of $x^{10}$?</b>",
      fr: "On développe $p(x)=(1+x)(1+x^2)(1+x^3)(1+x^4)(1+x^5)(1+x^6)$. <b>Lesquelles des valeurs suivantes sont égales au coefficient de $x^{10}$ ?</b>",
      es: "Se desarrolla $p(x)=(1+x)(1+x^2)(1+x^3)(1+x^4)(1+x^5)(1+x^6)$. <b>¿Cuáles de los siguientes valores son iguales al coeficiente de $x^{10}$?</b>",
      ja: "$p(x)=(1+x)(1+x^2)(1+x^3)(1+x^4)(1+x^5)(1+x^6)$ を展開します。<b>$x^{10}$ の係数に等しいものはどれですか？</b>",
      zh: "展开 $p(x)=(1+x)(1+x^2)(1+x^3)(1+x^4)(1+x^5)(1+x^6)$。<b>下列哪些等于 $x^{10}$ 的系数？</b>"
    },
    figureText: {
      en: "The product written out above an axis of powers of x from 0 to 21. The coefficients are drawn as bars in the solution.",
      fr: "Le produit écrit au-dessus d’un axe des puissances de x de 0 à 21. Les coefficients sont dessinés en barres dans la solution.",
      es: "El producto escrito sobre un eje de potencias de x de 0 a 21. Los coeficientes se dibujan como barras en la solución.",
      ja: "0 から 21 までの x のべきの軸と積の式。係数は解答で棒グラフにします。",
      zh: "0 到 21 的 x 幂次轴上方写出乘积。系数在解答中画成条形。"
    },
    hint: {
      en: "Each bracket contributes either $1$ or $x^k$: a term $x^{10}$ is a choice of distinct numbers from $1$ to $6$ adding up to $10$.",
      fr: "Chaque parenthèse donne $1$ ou $x^k$ : un terme $x^{10}$ est un choix de nombres distincts de $1$ à $6$ de somme $10$.",
      es: "Cada paréntesis aporta $1$ o $x^k$: un término $x^{10}$ es una elección de números distintos del $1$ al $6$ que suman $10$.",
      ja: "各かっこから $1$ か $x^k$ を選ぶので、$x^{10}$ は $1$〜$6$ の異なる数で和が $10$ になる選び方。",
      zh: "每个括号取 $1$ 或 $x^k$：一个 $x^{10}$ 项就是从 $1$ 到 $6$ 中选出和为 $10$ 的不同数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.8, scale: 54, pad: 18 });
      const co = [1, 1, 1, 2, 2, 3, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 3, 2, 2, 1, 1, 1];
      F.seg([0.1, 0.3], [5.9, 0.3], 'axis');
      F.text([0.3, 0.3], '0', 'tick', 0, 12); F.text([0.3 + 10 * 0.26, 0.3], '10', 'tick', 0, 12); F.text([0.3 + 21 * 0.26, 0.3], '21', 'tick', 0, 12);
      F.text([3.0, 1.6], '(1+x)(1+x²)(1+x³)(1+x⁴)(1+x⁵)(1+x⁶)', 'len small', 0, 0);
      F.reveal = () => {
      co.forEach((c, n) => F.rect(0.2 + n * 0.26, 0.3, 0.2, c * 0.42, n === 10 ? 'tri fill-yellow' : 'tri fill-blue'));
      F.text([0.3 + 10 * 0.26, 0.3 + 5 * 0.42], '5', 'len small', 0, -10);
      };
      return F;
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "$\\{4,6\\},\\{1,3,6\\},\\{1,4,5\\},\\{2,3,5\\},\\{1,2,3,4\\}$.",
        fr: "$\\{4,6\\},\\{1,3,6\\},\\{1,4,5\\},\\{2,3,5\\},\\{1,2,3,4\\}$.",
        es: "$\\{4,6\\},\\{1,3,6\\},\\{1,4,5\\},\\{2,3,5\\},\\{1,2,3,4\\}$.",
        ja: "$\\{4,6\\},\\{1,3,6\\},\\{1,4,5\\},\\{2,3,5\\},\\{1,2,3,4\\}$。",
        zh: "$\\{4,6\\},\\{1,3,6\\},\\{1,4,5\\},\\{2,3,5\\},\\{1,2,3,4\\}$。"
      } },
      { tex: "\\#\\{S\\subseteq\\{1,\\dots,6\\}:\\ \\textstyle\\sum S=11\\}", correct: true, why: {
        en: "$p$ has degree $21$ and $x^{21}p(1/x)=p(x)$, so coefficients of $x^{10}$ and $x^{11}$ match.",
        fr: "$p$ est de degré $21$ et $x^{21}p(1/x)=p(x)$ : les coefficients de $x^{10}$ et $x^{11}$ coïncident.",
        es: "$p$ tiene grado $21$ y $x^{21}p(1/x)=p(x)$: los coeficientes de $x^{10}$ y $x^{11}$ coinciden.",
        ja: "$p$ は $21$ 次で $x^{21}p(1/x)=p(x)$ なので、$x^{10}$ と $x^{11}$ の係数は等しい。",
        zh: "$p$ 为 $21$ 次且 $x^{21}p(1/x)=p(x)$，故 $x^{10}$ 与 $x^{11}$ 系数相同。"
      } },
      { tex: "4", correct: false, why: {
        en: "Misses one choice, often $\\{1,2,3,4\\}$.",
        fr: "Oublie un choix, souvent $\\{1,2,3,4\\}$.",
        es: "Olvida una elección, a menudo $\\{1,2,3,4\\}$.",
        ja: "1つ（よく $\\{1,2,3,4\\}$）を落としている。",
        zh: "漏了一种，常是 $\\{1,2,3,4\\}$。"
      } },
      { tex: "6", correct: false, why: {
        en: "There are only five sets of distinct parts with sum $10$.",
        fr: "Il n’y a que cinq ensembles de parts distinctes de somme $10$.",
        es: "Solo hay cinco conjuntos de partes distintas con suma $10$.",
        ja: "和が $10$ の異なる数の組は5つだけ。",
        zh: "和为 $10$ 的不同数集合只有五个。"
      } },
      { tex: "\\binom{6}{2}", correct: false, why: {
        en: "$15$ counts all pairs, whatever their sum.",
        fr: "$15$ compte toutes les paires, quelle que soit la somme.",
        es: "$15$ cuenta todos los pares, sumen lo que sumen.",
        ja: "$15$ は和に関係なくすべての2つ組の数。",
        zh: "$15$ 是所有二元组，不论和是多少。"
      } },
      { tex: "10", correct: false, why: {
        en: "Counts some choices more than once.",
        fr: "Compte certains choix plusieurs fois.",
        es: "Cuenta algunas elecciones más de una vez.",
        ja: "同じ選び方を重複して数えている。",
        zh: "有的选法重复计算了。"
      } },
      { tex: "3", correct: false, why: {
        en: "Only counts choices of three numbers.",
        fr: "Ne compte que les choix de trois nombres.",
        es: "Solo cuenta elecciones de tres números.",
        ja: "3つ選ぶ場合だけ数えている。",
        zh: "只数了选三个数的情况。"
      } },
      { tex: "2^6", correct: false, why: {
        en: "$64$ is the sum of all the coefficients, $p(1)$.",
        fr: "$64$ est la somme de tous les coefficients, $p(1)$.",
        es: "$64$ es la suma de todos los coeficientes, $p(1)$.",
        ja: "$64$ は係数の総和 $p(1)$。",
        zh: "$64$ 是所有系数之和 $p(1)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Read a term as a choice",
          fr: "Lire un terme comme un choix",
          es: "Leer un término como una elección",
          ja: "項を選び方と読む",
          zh: "把项看成选法"
        },
        lines: ["[x^{n}]\\,p(x)=\\#\\{S\\subseteq\\{1,\\dots,6\\}:\\ \\textstyle\\sum S=n\\}"],
        note: {
          en: "From each bracket $(1+x^k)$ you either take $x^k$ (put $k$ in $S$) or not.",
          fr: "De chaque parenthèse $(1+x^k)$ on prend $x^k$ (on met $k$ dans $S$) ou non.",
          es: "De cada paréntesis $(1+x^k)$ se toma $x^k$ (se pone $k$ en $S$) o no.",
          ja: "各 $(1+x^k)$ から $x^k$ を取る（$k$ を $S$ に入れる）か取らないか。",
          zh: "每个 $(1+x^k)$ 中取 $x^k$（把 $k$ 放入 $S$）或不取。"
        }
      },
      {
        title: {
          en: "List them",
          fr: "Les énumérer",
          es: "Enumerarlos",
          ja: "書き出す",
          zh: "列举"
        },
        lines: ["\\{4,6\\},\\ \\{1,3,6\\},\\ \\{1,4,5\\},\\ \\{2,3,5\\},\\ \\{1,2,3,4\\} \\;\\Rightarrow\\; \\boxed{5}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Taking complements ($1+\\dots+6=21$) pairs sum $10$ with sum $11$.",
          fr: "Le complémentaire ($1+\\dots+6=21$) associe la somme $10$ à la somme $11$.",
          es: "El complemento ($1+\\dots+6=21$) empareja la suma $10$ con la $11$.",
          ja: "補集合（$1+\\dots+6=21$）で和 $10$ と和 $11$ が対応。",
          zh: "取补集（$1+\\dots+6=21$）使和 $10$ 与和 $11$ 一一对应。"
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
          en: "Symmetry gives a second correct option.",
          fr: "La symétrie donne une deuxième option juste.",
          es: "La simetría da una segunda opción correcta.",
          ja: "対称性から2つ目の正解。",
          zh: "对称性给出第二个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
