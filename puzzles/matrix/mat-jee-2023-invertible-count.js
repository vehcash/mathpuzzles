/* matrix · How many are invertible?
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2023-invertible-count",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.12",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.12",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.12",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.12",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.12"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "How many are invertible?",
      fr: "Combien sont inversibles ?",
      es: "¿Cuántas son invertibles?",
      ja: "正則なものはいくつ？",
      zh: "有多少个可逆？"
    },
    statement: {
      en: "$R=\\left\\{\\begin{pmatrix}a&3&b\\\\c&2&d\\\\0&5&0\\end{pmatrix}:\\ a,b,c,d\\in\\{0,3,5,7,11,13,17,19\\}\\right\\}$. <b>Which of the following equal the number of invertible matrices in $R$?</b>",
      fr: "$R=\\left\\{\\begin{pmatrix}a&3&b\\\\c&2&d\\\\0&5&0\\end{pmatrix}:\\ a,b,c,d\\in\\{0,3,5,7,11,13,17,19\\}\\right\\}$. <b>Lesquelles des valeurs suivantes sont égales au nombre de matrices inversibles de $R$ ?</b>",
      es: "$R=\\left\\{\\begin{pmatrix}a&3&b\\\\c&2&d\\\\0&5&0\\end{pmatrix}:\\ a,b,c,d\\in\\{0,3,5,7,11,13,17,19\\}\\right\\}$. <b>¿Cuáles de los siguientes valores son iguales al número de matrices invertibles de $R$?</b>",
      ja: "$R=\\left\\{\\begin{pmatrix}a&3&b\\\\c&2&d\\\\0&5&0\\end{pmatrix}:\\ a,b,c,d\\in\\{0,3,5,7,11,13,17,19\\}\\right\\}$ とします。<b>$R$ に含まれる正則行列の個数に等しいものはどれですか？</b>",
      zh: "$R=\\left\\{\\begin{pmatrix}a&3&b\\\\c&2&d\\\\0&5&0\\end{pmatrix}:\\ a,b,c,d\\in\\{0,3,5,7,11,13,17,19\\}\\right\\}$。<b>$R$ 中可逆矩阵的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "The matrix with its bottom row (0, 5, 0) highlighted: expanding along it leaves the 2 × 2 block [[a, b], [c, d]].",
      fr: "La matrice avec sa dernière ligne (0, 5, 0) surlignée : en développant selon elle, il reste le bloc 2 × 2 [[a, b], [c, d]].",
      es: "La matriz con su última fila (0, 5, 0) resaltada: desarrollando por ella queda el bloque 2 × 2 [[a, b], [c, d]].",
      ja: "最下行 (0, 5, 0) を強調した行列。この行で展開すると 2 × 2 ブロック [[a, b], [c, d]] が残る。",
      zh: "突出显示最后一行 (0, 5, 0) 的矩阵：按该行展开剩下 2 × 2 块 [[a, b], [c, d]]。"
    },
    hint: {
      en: "Expand the determinant along the bottom row. When is $ad=bc$ for these numbers, which are $0$ or distinct primes?",
      fr: "Développez le déterminant selon la dernière ligne. Quand a-t-on $ad=bc$ pour ces nombres, qui sont $0$ ou des premiers distincts ?",
      es: "Desarrolla el determinante por la última fila. ¿Cuándo es $ad=bc$ con estos números, que son $0$ o primos distintos?",
      ja: "最下行で展開。$0$ か相異なる素数であるこれらの数で $ad=bc$ となるのはいつ？",
      zh: "按最后一行展开。这些数是 $0$ 或互不相同的素数，何时 $ad=bc$？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 2.8, scale: 56, pad: 14 });
      F.mx = matrix(F, [0.5, 2.5], [['a', '3', 'b'], ['c', '2', 'd'], ['0', '5', '0']], { cw: 0.85, ch: 0.72 });
      F.mx.row(2, 'fill-yellow');
      return F;
    },
    options: [
      { tex: "3780", correct: true, why: {
        en: "$8^4-316=3780$.",
        fr: "$8^4-316=3780$.",
        es: "$8^4-316=3780$.",
        ja: "$8^4-316=3780$.",
        zh: "$8^4-316=3780$."
      } },
      { tex: "8^4-\\big(15^2+7+84\\big)", correct: true, why: {
        en: "All matrices minus those with $ad=bc$.",
        fr: "Toutes les matrices moins celles avec $ad=bc$.",
        es: "Todas las matrices menos las que tienen $ad=bc$.",
        ja: "全体から $ad=bc$ のものを引く。",
        zh: "全部减去 $ad=bc$ 的。"
      } },
      { tex: "4096", correct: false, why: {
        en: "$8^4$: every matrix, including singular ones.",
        fr: "$8^4$ : toutes, y compris les singulières.",
        es: "$8^4$: todas, incluidas las singulares.",
        ja: "$8^4$：特異なものも含む全体。",
        zh: "$8^4$：包括奇异矩阵在内的全部。"
      } },
      { tex: "316", correct: false, why: {
        en: "That is the number of singular ones.",
        fr: "C’est le nombre de singulières.",
        es: "Es el número de singulares.",
        ja: "特異なものの数。",
        zh: "那是奇异矩阵的个数。"
      } },
      { tex: "3871", correct: false, why: {
        en: "Forgets the $ad=bc=0$ cases beyond $a=b=c=d=0$.",
        fr: "Oublie des cas $ad=bc=0$.",
        es: "Olvida casos $ad=bc=0$.",
        ja: "$ad=bc=0$ の場合を落とした。",
        zh: "漏了 $ad=bc=0$ 的情形。"
      } },
      { tex: "3864", correct: false, why: {
        en: "Counts only $\\{a,d\\}=\\{b,c\\}$ with $a\\ne d$ as one order.",
        fr: "Compte un seul ordre pour $\\{a,d\\}=\\{b,c\\}$.",
        es: "Cuenta un solo orden para $\\{a,d\\}=\\{b,c\\}$.",
        ja: "$\\{a,d\\}=\\{b,c\\}$ を1通りとして数えた。",
        zh: "$\\{a,d\\}=\\{b,c\\}$ 只算了一种顺序。"
      } },
      { tex: "2401", correct: false, why: {
        en: "$7^4$: just bans $0$.",
        fr: "$7^4$ : interdit seulement $0$.",
        es: "$7^4$: solo prohíbe el $0$.",
        ja: "$7^4$：$0$ を除いただけ。",
        zh: "$7^4$：只是去掉了 $0$。"
      } },
      { tex: "0", correct: false, why: {
        en: "For example $a=d=3$, $b=c=0$ gives determinant $-45\\ne0$.",
        fr: "Par exemple $a=d=3$, $b=c=0$ donne $-45\\ne0$.",
        es: "Por ejemplo $a=d=3$, $b=c=0$ da $-45\\ne0$.",
        ja: "例えば $a=d=3$, $b=c=0$ で $-45\\ne0$。",
        zh: "例如 $a=d=3$、$b=c=0$ 得 $-45\\ne0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Expand along the bottom row",
          fr: "Développer selon la dernière ligne",
          es: "Desarrollar por la última fila",
          ja: "最下行で展開",
          zh: "按最后一行展开"
        },
        lines: ["\\det=-5\\,(ad-bc)"],
        note: {
          en: "Invertible $\\iff ad\\ne bc$.",
          fr: "Inversible $\\iff ad\\ne bc$.",
          es: "Invertible $\\iff ad\\ne bc$.",
          ja: "正則 $\\iff ad\\ne bc$。",
          zh: "可逆 $\\iff ad\\ne bc$。"
        }
      },
      {
        title: {
          en: "Count ad = bc",
          fr: "Compter ad = bc",
          es: "Contar ad = bc",
          ja: "ad = bc を数える",
          zh: "数 ad = bc"
        },
        lines: ["ad=bc=0:\\ 15\\cdot15=225;\\qquad ad=bc\\ne0:\\ \\{a,d\\}=\\{b,c\\}\\Rightarrow7+42\\cdot2=91"],
        note: {
          en: "$ad=0$ in $8+8-1=15$ ways. Non-zero values are distinct primes, so unique factorisation forces $\\{a,d\\}=\\{b,c\\}$.",
          fr: "$ad=0$ de $8+8-1=15$ façons. Les valeurs non nulles sont des premiers distincts : $\\{a,d\\}=\\{b,c\\}$.",
          es: "$ad=0$ de $8+8-1=15$ formas. Los no nulos son primos distintos: $\\{a,d\\}=\\{b,c\\}$.",
          ja: "$ad=0$ は $8+8-1=15$ 通り。0 以外は相異なる素数なので $\\{a,d\\}=\\{b,c\\}$。",
          zh: "$ad=0$ 有 $8+8-1=15$ 种。非零值是互异素数，故 $\\{a,d\\}=\\{b,c\\}$。"
        }
      },
      {
        title: {
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "引く",
          zh: "相减"
        },
        lines: ["8^4-(225+91)=4096-316=\\boxed{3780}"],
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
