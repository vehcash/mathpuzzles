/* number · Counting in factorials
   Oxford MAT 2019 (Mathematics Admissions Test), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2019-factorial-base",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 6",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 6",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 6",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 6",
        zh: "牛津大学数学入学考试 MAT 2019 第 6 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Counting in factorials",
      fr: "Compter en factorielles",
      es: "Contar en factoriales",
      ja: "階乗で数える",
      zh: "用阶乘计数"
    },
    statement: {
      en: "In the <i>flexadecimal</i> system, the $j$-th digit from the right can be $0,1,\\dots,j$ and is worth $j!$. So $\\langle d_4d_3d_2d_1\\rangle=24d_4+6d_3+2d_2+d_1$; for example $\\langle 1221\\rangle=41$. <b>Which of the following represent $255$?</b>",
      fr: "Dans le système <i>flexadécimal</i>, le $j$-ième chiffre en partant de la droite vaut $0,1,\\dots,j$ et pèse $j!$. Ainsi $\\langle d_4d_3d_2d_1\\rangle=24d_4+6d_3+2d_2+d_1$ ; par exemple $\\langle 1221\\rangle=41$. <b>Lesquelles des écritures suivantes représentent $255$ ?</b>",
      es: "En el sistema <i>flexadecimal</i>, la $j$-ésima cifra por la derecha puede ser $0,1,\\dots,j$ y vale $j!$. Así $\\langle d_4d_3d_2d_1\\rangle=24d_4+6d_3+2d_2+d_1$; por ejemplo $\\langle 1221\\rangle=41$. <b>¿Cuáles de las siguientes expresiones representan $255$?</b>",
      ja: "<i>フレキサ十進法</i>では、右から $j$ 番目の桁は $0,1,\\dots,j$ をとり、重みは $j!$ です。つまり $\\langle d_4d_3d_2d_1\\rangle=24d_4+6d_3+2d_2+d_1$ で、例えば $\\langle 1221\\rangle=41$。<b>$255$ を表すものはどれですか？</b>",
      zh: "在<i>灵活进制</i>中，从右数第 $j$ 位可取 $0,1,\\dots,j$，权为 $j!$。于是 $\\langle d_4d_3d_2d_1\\rangle=24d_4+6d_3+2d_2+d_1$，例如 $\\langle 1221\\rangle=41$。<b>下列哪些表示 $255$？</b>"
    },
    figureText: {
      en: "Five empty digit boxes with place values 120, 24, 6, 2, 1 and the largest digit allowed in each. The digits are filled in during the solution.",
      fr: "Cinq cases vides de valeurs 120, 24, 6, 2, 1, avec le chiffre maximal permis. Les chiffres sont remplis dans la solution.",
      es: "Cinco casillas vacías de valores 120, 24, 6, 2, 1 con la cifra máxima permitida. Las cifras se rellenan en la solución.",
      ja: "位の値 120, 24, 6, 2, 1 の空の5桁と各桁の上限。数字は解答で記入。",
      zh: "位值为 120、24、6、2、1 的五个空格及各位上限。数字在解答中填入。"
    },
    hint: {
      en: "Take as many $5!=120$ as you can, then $4!$, $3!$, …",
      fr: "Prenez autant de $5!=120$ que possible, puis de $4!$, $3!$, …",
      es: "Toma tantos $5!=120$ como puedas, luego $4!$, $3!$, …",
      ja: "$5!=120$ をできるだけ取り、次に $4!$、$3!$、…",
      zh: "尽量多取 $5!=120$，再取 $4!$、$3!$……"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 2.2, scale: 56, pad: 16 });
      const W = ['120', '24', '6', '2', '1'], M = ['≤5', '≤4', '≤3', '≤2', '≤1'], D = ['2', '0', '2', '1', '1'];
      W.forEach((w, k) => { const x = 0.25 + k * 1.05; F.rect(x, 0.8, 0.85, 0.8, k % 2 ? 'tri fill-blue' : 'tri fill-yellow'); F.text([x + 0.42, 1.2], '?', 'len', 0, 0);
        F.text([x + 0.42, 1.6], w, 'tick', 0, -10); F.text([x + 0.42, 0.8], M[k], 'tick', 0, 12); });
      F.reveal = () => {
      W.forEach((w, k) => { const x = 0.25 + k * 1.05; F.rect(x + 0.06, 0.86, 0.73, 0.68, k % 2 ? 'fill-blue' : 'fill-yellow', 'over'); F.text([x + 0.42, 1.2], D[k], 'len', 0, 0, 'over'); });
      };
      return F;
    },
    options: [
      { tex: "\\langle 20211\\rangle", correct: true, why: {
        en: "$2\\cdot120+0\\cdot24+2\\cdot6+1\\cdot2+1=255$, all digits allowed.",
        fr: "$2\\cdot120+0\\cdot24+2\\cdot6+1\\cdot2+1=255$, chiffres permis.",
        es: "$2\\cdot120+0\\cdot24+2\\cdot6+1\\cdot2+1=255$, cifras permitidas.",
        ja: "$2\\cdot120+0\\cdot24+2\\cdot6+1\\cdot2+1=255$ で各桁も許される。",
        zh: "$2\\cdot120+0\\cdot24+2\\cdot6+1\\cdot2+1=255$，各位都合法。"
      } },
      { tex: "2\\cdot5!+2\\cdot3!+2!+1!", correct: true, why: {
        en: "The same expansion written with factorials.",
        fr: "Le même développement écrit avec des factorielles.",
        es: "El mismo desarrollo escrito con factoriales.",
        ja: "同じ展開を階乗で書いたもの。",
        zh: "用阶乘写出的同一展开。"
      } },
      { tex: "\\langle 20121\\rangle", correct: false, why: {
        en: "$240+0+6+4+1=251$.",
        fr: "$240+0+6+4+1=251$.",
        es: "$240+0+6+4+1=251$.",
        ja: "$240+0+6+4+1=251$。",
        zh: "$240+0+6+4+1=251$。"
      } },
      { tex: "\\langle 21011\\rangle", correct: false, why: {
        en: "$240+24+0+2+1=267$.",
        fr: "$240+24+0+2+1=267$.",
        es: "$240+24+0+2+1=267$.",
        ja: "$240+24+0+2+1=267$。",
        zh: "$240+24+0+2+1=267$。"
      } },
      { tex: "\\langle 10211\\rangle", correct: false, why: {
        en: "$120+0+12+2+1=135$.",
        fr: "$120+0+12+2+1=135$.",
        es: "$120+0+12+2+1=135$.",
        ja: "$120+0+12+2+1=135$。",
        zh: "$120+0+12+2+1=135$。"
      } },
      { tex: "\\langle 11111111\\rangle", correct: false, why: {
        en: "That is $255$ in binary, not in this system.",
        fr: "C’est $255$ en binaire, pas dans ce système.",
        es: "Es $255$ en binario, no en este sistema.",
        ja: "それは2進法の $255$。",
        zh: "那是二进制的 $255$。"
      } },
      { tex: "\\langle 2211\\rangle", correct: false, why: {
        en: "$48+12+2+1=63$.",
        fr: "$48+12+2+1=63$.",
        es: "$48+12+2+1=63$.",
        ja: "$48+12+2+1=63$。",
        zh: "$48+12+2+1=63$。"
      } },
      { tex: "\\langle 1221\\rangle", correct: false, why: {
        en: "That is $41$, the example.",
        fr: "C’est $41$, l’exemple.",
        es: "Es $41$, el ejemplo.",
        ja: "それは例の $41$。",
        zh: "那是例子中的 $41$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Divide by the largest factorials",
          fr: "Diviser par les plus grandes factorielles",
          es: "Dividir por los mayores factoriales",
          ja: "大きい階乗から割る",
          zh: "从大阶乘开始除"
        },
        lines: ["255=2\\cdot120+15,\\quad 15=0\\cdot24+15,\\quad 15=2\\cdot6+3,\\quad 3=1\\cdot2+1"],
        note: {
          en: "Each remainder is smaller than the next weight, so the digits stay within their limits.",
          fr: "Chaque reste est plus petit que le poids suivant : les chiffres respectent leurs limites.",
          es: "Cada resto es menor que el peso siguiente: las cifras respetan sus límites.",
          ja: "各余りは次の重みより小さいので、各桁は上限内に収まる。",
          zh: "每个余数都小于下一个权，所以各位不超上限。"
        }
      },
      {
        title: {
          en: "Read the digits",
          fr: "Lire les chiffres",
          es: "Leer las cifras",
          ja: "数字を読む",
          zh: "读出数字"
        },
        lines: ["255=\\boxed{\\langle 20211\\rangle}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Like base ten, every number has exactly one such representation.",
          fr: "Comme en base dix, chaque nombre a exactement une telle écriture.",
          es: "Como en base diez, cada número tiene exactamente una tal escritura.",
          ja: "10進法と同じく、表し方はちょうど1つ。",
          zh: "与十进制一样，每个数恰有一种这样的写法。"
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
          en: "Two options are the same number written two ways.",
          fr: "Deux options sont le même nombre écrit de deux façons.",
          es: "Dos opciones son el mismo número escrito de dos formas.",
          ja: "2つは同じ数の2通りの書き方。",
          zh: "有两个选项是同一个数的两种写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
