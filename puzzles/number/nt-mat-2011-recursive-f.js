/* number · A function built from halves
   Oxford Mathematics Admissions Test (MAT) 2011, Question 1J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2011-recursive-f",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford Mathematics Admissions Test (MAT) 2011, Question 1J",
        fr: "Test d’admission en mathématiques d’Oxford (MAT) 2011, question 1J",
        es: "Prueba de admisión de matemáticas de Oxford (MAT) 2011, pregunta 1J",
        ja: "オックスフォード大学 数学入学試験 (MAT) 2011 第1問 J",
        zh: "牛津大学数学入学考试 (MAT) 2011 第 1 题 J"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A function built from halves",
      fr: "Une fonction construite par moitiés",
      es: "Una función construida a mitades",
      ja: "半分から作る関数",
      zh: "由一半构造的函数"
    },
    statement: {
      en: "A function on the positive integers satisfies $f(1)=1$, $f(2n)=f(n)$ and $f(2n+1)=f(n)^2-2$. <b>Which of the following equal $f(1)+f(2)+\\dots+f(100)$?</b>",
      fr: "Une fonction définie sur les entiers strictement positifs vérifie $f(1)=1$, $f(2n)=f(n)$ et $f(2n+1)=f(n)^2-2$. <b>Lesquelles des valeurs suivantes sont égales à $f(1)+f(2)+\\dots+f(100)$ ?</b>",
      es: "Una función sobre los enteros positivos cumple $f(1)=1$, $f(2n)=f(n)$ y $f(2n+1)=f(n)^2-2$. <b>¿Cuáles de los siguientes valores son iguales a $f(1)+f(2)+\\dots+f(100)$?</b>",
      ja: "正の整数上の関数が $f(1)=1$、$f(2n)=f(n)$、$f(2n+1)=f(n)^2-2$ を満たします。<b>$f(1)+f(2)+\\dots+f(100)$ に等しいものはどれですか？</b>",
      zh: "定义在正整数上的函数满足 $f(1)=1$，$f(2n)=f(n)$，$f(2n+1)=f(n)^2-2$。<b>下列哪些等于 $f(1)+f(2)+\\dots+f(100)$？</b>"
    },
    figureText: {
      en: "A row of empty boxes for n = 1 to 16. The values f(n) are filled in during the solution.",
      fr: "Une rangée de cases vides pour n = 1 à 16. Les valeurs f(n) sont remplies dans la solution.",
      es: "Una fila de casillas vacías para n = 1 a 16. Los valores f(n) se rellenan en la solución.",
      ja: "n = 1〜16 の空の箱。f(n) の値は解答で書き込みます。",
      zh: "n = 1 到 16 的空方框。f(n) 的值在解答中填入。"
    },
    hint: {
      en: "Compute $f(1),\\dots,f(8)$. Which values can appear?",
      fr: "Calculez $f(1),\\dots,f(8)$. Quelles valeurs peuvent apparaître ?",
      es: "Calcula $f(1),\\dots,f(8)$. ¿Qué valores pueden aparecer?",
      ja: "$f(1),\\dots,f(8)$ を計算しましょう。どんな値が現れますか？",
      zh: "算出 $f(1),\\dots,f(8)$。可能出现哪些值？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.2, h: 1.6, scale: 44, pad: 10 });
      const B = []; for (let n = 1; n <= 16; n++) {
        const i = n - 1, x = (i % 8) * 1.02 + 0.05, y = i < 8 ? 0.85 : 0.05; B.push([n, x, y]);
        F.rect(x, y, 0.92, 0.7, 'tri'); F.text([x + 0.2, y + 0.55], String(n), 'tick', 0, 0);
      }
      F.reveal = () => {
      B.forEach(([n, x, y]) => { const pow = (n & (n - 1)) === 0; if (pow) F.rect(x, y, 0.92, 0.7, 'fill-yellow', 'fills'); F.text([x + 0.5, y + 0.28], pow ? '1' : '−1', 'len', 4, 0); });
      };
      return F;
    },
    options: [
      { tex: "-86", correct: true, why: {
        en: "$7$ values equal $1$ and $93$ equal $-1$.",
        fr: "$7$ valeurs valent $1$ et $93$ valent $-1$.",
        es: "$7$ valores son $1$ y $93$ son $-1$.",
        ja: "$1$ が $7$ 個、$-1$ が $93$ 個。",
        zh: "$7$ 个值为 $1$，$93$ 个为 $-1$。"
      } },
      { tex: "7-93", correct: true, why: {
        en: "The same count written as a difference.",
        fr: "Le même décompte écrit comme une différence.",
        es: "El mismo recuento escrito como diferencia.",
        ja: "同じ数え上げを差で書いたもの。",
        zh: "同样的计数写成差的形式。"
      } },
      { tex: "-31", correct: false, why: {
        en: "Not what the counting gives.",
        fr: "Ce n’est pas ce que donne le décompte.",
        es: "No es lo que da el recuento.",
        ja: "数え上げの結果ではありません。",
        zh: "不是计数的结果。"
      } },
      { tex: "23", correct: false, why: {
        en: "The sum must be negative: most values are $-1$.",
        fr: "La somme est négative : la plupart des valeurs valent $-1$.",
        es: "La suma es negativa: casi todos los valores son $-1$.",
        ja: "ほとんどが $-1$ なので和は負。",
        zh: "和必为负：大多数值是 $-1$。"
      } },
      { tex: "58", correct: false, why: {
        en: "Positive — impossible, as most terms are $-1$.",
        fr: "Positif — impossible, la plupart des termes valent $-1$.",
        es: "Positivo: imposible, casi todos son $-1$.",
        ja: "正にはなりません。",
        zh: "不可能为正。"
      } },
      { tex: "-100", correct: false, why: {
        en: "That forgets the powers of $2$, where $f=1$.",
        fr: "Cela oublie les puissances de $2$, où $f=1$.",
        es: "Olvida las potencias de $2$, donde $f=1$.",
        ja: "$f=1$ となる $2$ のべきを忘れています。",
        zh: "忽略了 $f=1$ 的 $2$ 的幂。"
      } },
      { tex: "-79", correct: false, why: {
        en: "$7-86$ mixes up the count: there are $93$ non-powers of $2$.",
        fr: "$7-86$ mélange les comptes : il y a $93$ nombres qui ne sont pas des puissances de $2$.",
        es: "$7-86$ confunde los recuentos: hay $93$ números que no son potencias de $2$.",
        ja: "$7-86$ は数え間違い：$2$ のべきでない数は $93$ 個。",
        zh: "$7-86$ 数错了：不是 $2$ 的幂的数有 $93$ 个。"
      } },
      { tex: "0", correct: false, why: {
        en: "The values do not cancel in pairs.",
        fr: "Les valeurs ne s’annulent pas deux à deux.",
        es: "Los valores no se anulan por parejas.",
        ja: "値はペアで打ち消し合いません。",
        zh: "这些值不会两两抵消。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Only 1 and −1 appear",
          fr: "Seuls 1 et −1 apparaissent",
          es: "Solo aparecen 1 y −1",
          ja: "1 と −1 しか現れない",
          zh: "只出现 1 和 −1"
        },
        lines: ["f(1)=1,\\; f(2)=1,\\; f(3)=1^2-2=-1,\\; f(4)=1,\\; f(5)=-1,\\; f(6)=-1,\\; f(7)=(-1)^2-2=-1"],
        note: {
          en: "If $f(n)=\\pm1$ then $f(2n)=\\pm1$ and $f(2n+1)=1-2=-1$: by induction every value is $1$ or $-1$.",
          fr: "Si $f(n)=\\pm1$ alors $f(2n)=\\pm1$ et $f(2n+1)=1-2=-1$ : par récurrence toutes les valeurs valent $1$ ou $-1$.",
          es: "Si $f(n)=\\pm1$ entonces $f(2n)=\\pm1$ y $f(2n+1)=1-2=-1$: por inducción todos los valores son $1$ o $-1$.",
          ja: "$f(n)=\\pm1$ なら $f(2n)=\\pm1$、$f(2n+1)=1-2=-1$。帰納法ですべて $1$ か $-1$。",
          zh: "若 $f(n)=\\pm1$，则 $f(2n)=\\pm1$，$f(2n+1)=1-2=-1$：由归纳法所有值都是 $1$ 或 $-1$。"
        }
      },
      {
        title: {
          en: "f(n) = 1 exactly for powers of 2",
          fr: "f(n) = 1 exactement pour les puissances de 2",
          es: "f(n) = 1 justo en las potencias de 2",
          ja: "f(n) = 1 となるのは 2 のべきだけ",
          zh: "f(n) = 1 恰好对应 2 的幂"
        },
        lines: ["f(n)=1 \\iff n\\in\\{1,2,4,8,16,32,64\\}\\quad(\\le 100)", "\\sum_{n=1}^{100} f(n) = 7\\cdot1 + 93\\cdot(-1) = \\boxed{-86}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Halving an even number keeps the value; any odd $n>1$ gives $-1$. So $f(n)=1$ only when halving reaches $1$ without passing an odd number.",
          fr: "Diviser un nombre pair par $2$ garde la valeur ; tout impair $n>1$ donne $-1$. Donc $f(n)=1$ seulement si l’on atteint $1$ par divisions par $2$ sans rencontrer d’impair.",
          es: "Dividir un par entre $2$ conserva el valor; todo impar $n>1$ da $-1$. Así que $f(n)=1$ solo si al dividir entre $2$ se llega a $1$ sin pasar por un impar.",
          ja: "偶数を半分にしても値は同じ。$1$ より大きい奇数は $-1$。よって奇数を通らずに $1$ に着くとき（$2$ のべき）だけ $f(n)=1$。",
          zh: "偶数减半值不变；大于 $1$ 的奇数给出 $-1$。所以只有不断减半到 $1$ 而不经过奇数（即 $2$ 的幂）时 $f(n)=1$。"
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
