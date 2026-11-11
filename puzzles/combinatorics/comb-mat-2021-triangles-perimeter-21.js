/* combinatorics · Triangles with perimeter 21
   Oxford MAT 2021 (Mathematics Admissions Test), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2021-triangles-perimeter-21",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 5",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 5",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 5",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 5",
        zh: "牛津大学数学入学考试 MAT 2021 第 5 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Triangles with perimeter 21",
      fr: "Triangles de périmètre 21",
      es: "Triángulos de perímetro 21",
      ja: "周の長さ21の三角形",
      zh: "周长为 21 的三角形"
    },
    statement: {
      en: "Let $f(P)$ be the number of triples of positive integers $a\\le b\\le c$ with $a+b+c=P$ that are the side lengths of a (non-degenerate) triangle. <b>Which of the following equal $f(21)$?</b>",
      fr: "Soit $f(P)$ le nombre de triplets d’entiers positifs $a\\le b\\le c$ avec $a+b+c=P$ qui sont les côtés d’un triangle (non aplati). <b>Lesquelles des valeurs suivantes sont égales à $f(21)$ ?</b>",
      es: "Sea $f(P)$ el número de ternas de enteros positivos $a\\le b\\le c$ con $a+b+c=P$ que son los lados de un triángulo (no degenerado). <b>¿Cuáles de los siguientes valores son iguales a $f(21)$?</b>",
      ja: "$a+b+c=P$ を満たす正の整数 $a\\le b\\le c$ で、（つぶれていない）三角形の3辺になる組の数を $f(P)$ とします。<b>$f(21)$ に等しいものはどれですか？</b>",
      zh: "设 $f(P)$ 为满足 $a+b+c=P$、$a\\le b\\le c$ 且能构成（非退化）三角形三边的正整数三元组个数。<b>下列哪些等于 $f(21)$？</b>"
    },
    figureText: {
      en: "A table of the valid triples for perimeter 21, grouped by the longest side c = 7, 8, 9, 10, with the count of each group.",
      fr: "Un tableau des triplets valides pour le périmètre 21, groupés selon le plus grand côté c = 7, 8, 9, 10, avec l’effectif de chaque groupe.",
      es: "Una tabla de las ternas válidas para perímetro 21, agrupadas por el lado mayor c = 7, 8, 9, 10, con el número de cada grupo.",
      ja: "周 21 の有効な組を最長辺 c = 7, 8, 9, 10 ごとにまとめた表と各組の個数。",
      zh: "周长 21 的有效三元组表，按最长边 c = 7、8、9、10 分组，并给出各组个数。"
    },
    hint: {
      en: "With $a\\le b\\le c$, the only triangle condition left is $a+b>c$, i.e. $c<\\tfrac{P}{2}$. Fix $c$ and count.",
      fr: "Avec $a\\le b\\le c$, il reste seulement $a+b>c$, soit $c<\\tfrac{P}{2}$. Fixez $c$ et comptez.",
      es: "Con $a\\le b\\le c$, solo queda $a+b>c$, es decir $c<\\tfrac{P}{2}$. Fija $c$ y cuenta.",
      ja: "$a\\le b\\le c$ なら条件は $a+b>c$、つまり $c<\\tfrac{P}{2}$ だけ。$c$ を固定して数えます。",
      zh: "在 $a\\le b\\le c$ 下只需 $a+b>c$，即 $c<\\tfrac{P}{2}$。固定 $c$ 来数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.4, h: 3.6, scale: 40, pad: 14 });
      const rows = [['c = 10', '1,10 · 2,9 · 3,8 · 4,7 · 5,6', '5'], ['c = 9', '3,9 · 4,8 · 5,7 · 6,6', '4'], ['c = 8', '5,8 · 6,7', '2'], ['c = 7', '7,7', '1']];
      rows.forEach((r, i) => { const y = 3.1 - i * 0.8; F.text([0.7, y], r[0], 'pt small', 0, 0); F.text([4.2, y], r[1], 'len small', 0, 0); F.text([7.9, y], r[2], 'pt', 0, 0); });
      F.seg([7.4, 0.35], [8.3, 0.35], 'seg thin'); F.text([7.9, 0.05], '12', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "12", correct: true, why: {
        en: "$5+4+2+1=12$.",
        fr: "$5+4+2+1=12$.",
        es: "$5+4+2+1=12$.",
        ja: "$5+4+2+1=12$.",
        zh: "$5+4+2+1=12$."
      } },
      { tex: "f(24)", correct: true, why: {
        en: "MAT’s identity $f(2k-3)=f(2k)$ with $k=12$: both are $12$.",
        fr: "L’identité du MAT $f(2k-3)=f(2k)$ avec $k=12$ : les deux valent $12$.",
        es: "La identidad del MAT $f(2k-3)=f(2k)$ con $k=12$: ambos valen $12$.",
        ja: "MAT の等式 $f(2k-3)=f(2k)$ で $k=12$：どちらも $12$。",
        zh: "MAT 中的恒等式 $f(2k-3)=f(2k)$，取 $k=12$：两者都为 $12$。"
      } },
      { tex: "10", correct: false, why: {
        en: "Misses the isosceles ones such as $(6,6,9)$ and $(7,7,7)$.",
        fr: "Oublie les isocèles comme $(6,6,9)$ et $(7,7,7)$.",
        es: "Olvida los isósceles como $(6,6,9)$ y $(7,7,7)$.",
        ja: "$(6,6,9)$ や $(7,7,7)$ のような二等辺を落としている。",
        zh: "漏了 $(6,6,9)$、$(7,7,7)$ 等等腰的。"
      } },
      { tex: "11", correct: false, why: {
        en: "One triple missed.",
        fr: "Un triplet oublié.",
        es: "Falta una terna.",
        ja: "1組抜けている。",
        zh: "漏了一个。"
      } },
      { tex: "13", correct: false, why: {
        en: "One triple too many: with $P=21$ odd there are no degenerate cases.",
        fr: "Un triplet de trop : avec $P=21$ impair, il n’y a pas de cas aplati.",
        es: "Una terna de más: con $P=21$ impar no hay casos degenerados.",
        ja: "1組多い。$P=21$ は奇数なので退化した組はない。",
        zh: "多数了一个；$P=21$ 为奇数，不存在退化情形。"
      } },
      { tex: "16", correct: false, why: {
        en: "Counts $c=11$ too, but $a+b=10<11$.",
        fr: "Compte aussi $c=11$, mais $a+b=10<11$.",
        es: "Cuenta también $c=11$, pero $a+b=10<11$.",
        ja: "$c=11$ も数えたが $a+b=10<11$。",
        zh: "把 $c=11$ 也算了，但 $a+b=10<11$。"
      } },
      { tex: "21", correct: false, why: {
        en: "The perimeter, not the count.",
        fr: "Le périmètre, pas le nombre.",
        es: "El perímetro, no el número.",
        ja: "周の長さで、個数ではない。",
        zh: "那是周长，不是个数。"
      } },
      { tex: "f(22)", correct: false, why: {
        en: "$f(22)=10$, not $12$.",
        fr: "$f(22)=10$, not $12$.",
        es: "$f(22)=10$, not $12$.",
        ja: "$f(22)=10$, not $12$.",
        zh: "$f(22)=10$, not $12$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Range of the longest side",
          fr: "Plage du plus grand côté",
          es: "Rango del lado mayor",
          ja: "最長辺の範囲",
          zh: "最长边的范围"
        },
        lines: ["c\\ge\\tfrac{21}{3}=7,\\qquad a+b=21-c>c\\iff c\\le10"],
        note: {
          en: "So $c\\in\\{7,8,9,10\\}$.",
          fr: "Donc $c\\in\\{7,8,9,10\\}$.",
          es: "Así $c\\in\\{7,8,9,10\\}$.",
          ja: "よって $c\\in\\{7,8,9,10\\}$。",
          zh: "所以 $c\\in\\{7,8,9,10\\}$。"
        }
      },
      {
        title: {
          en: "Count for each c",
          fr: "Compter pour chaque c",
          es: "Contar para cada c",
          ja: "c ごとに数える",
          zh: "逐个 c 计数"
        },
        lines: ["c=10:5,\\quad c=9:4,\\quad c=8:2,\\quad c=7:1\\;\\Rightarrow\\;\\boxed{12}"],
        note: {
          en: "For each $c$, $a\\le b\\le c$ and $a+b=21-c$.",
          fr: "Pour chaque $c$ : $a\\le b\\le c$ et $a+b=21-c$.",
          es: "Para cada $c$: $a\\le b\\le c$ y $a+b=21-c$.",
          ja: "各 $c$ で $a\\le b\\le c$、$a+b=21-c$。",
          zh: "对每个 $c$：$a\\le b\\le c$，$a+b=21-c$。"
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
