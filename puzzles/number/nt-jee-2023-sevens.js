/* number · Sevens around fives
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-jee-2023-sevens",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.10",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.10",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas P.10",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学第 10 题"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Sevens around fives",
      fr: "Des sept autour de cinq",
      es: "Sietes alrededor de cincos",
      ja: "5 を挟む 7",
      zh: "被 7 包围的 5"
    },
    statement: {
      en: "Let $S = 77 + 757 + 7557 + \\dots + 7\\underbrace{5\\cdots5}_{98}7$ (the $k$-th term has $k-1$ fives). It is given that $S = \\dfrac{7\\overbrace{5\\cdots5}^{99}7 + m}{n}$ with natural numbers $m, n < 3000$. <b>Which of the following equal $m+n$?</b>",
      fr: "Soit $S = 77 + 757 + 7557 + \\dots + 7\\underbrace{5\\cdots5}_{98}7$ (le $k$-ième terme a $k-1$ chiffres 5). On sait que $S = \\dfrac{7\\overbrace{5\\cdots5}^{99}7 + m}{n}$ avec des entiers naturels $m, n < 3000$. <b>Lesquelles des valeurs suivantes sont égales à $m+n$ ?</b>",
      es: "Sea $S = 77 + 757 + 7557 + \\dots + 7\\underbrace{5\\cdots5}_{98}7$ (el término $k$-ésimo tiene $k-1$ cincos). Se sabe que $S = \\dfrac{7\\overbrace{5\\cdots5}^{99}7 + m}{n}$ con naturales $m, n < 3000$. <b>¿Cuáles de los siguientes valores son iguales a $m+n$?</b>",
      ja: "$S = 77 + 757 + 7557 + \\dots + 7\\underbrace{5\\cdots5}_{98}7$（第 $k$ 項は 5 が $k-1$ 個）とします。$m, n < 3000$ の自然数で $S = \\dfrac{7\\overbrace{5\\cdots5}^{99}7 + m}{n}$ と表せます。<b>$m+n$ に等しいものはどれですか？</b>",
      zh: "设 $S = 77 + 757 + 7557 + \\dots + 7\\underbrace{5\\cdots5}_{98}7$（第 $k$ 项有 $k-1$ 个 5）。已知 $S = \\dfrac{7\\overbrace{5\\cdots5}^{99}7 + m}{n}$，其中自然数 $m, n < 3000$。<b>下列哪些等于 $m+n$？</b>"
    },
    figureText: {
      en: "The first terms written in a column: 77, 757, 7557, 75557, … ; each new term has one more 5 between two 7s.",
      fr: "Les premiers termes en colonne : 77, 757, 7557, 75557, … ; chaque nouveau terme a un 5 de plus entre deux 7.",
      es: "Los primeros términos en columna: 77, 757, 7557, 75557, …; cada término nuevo tiene un 5 más entre dos 7.",
      ja: "最初の項を縦に並べたもの：77, 757, 7557, 75557, …。次の項ごとに 2 つの 7 の間の 5 が 1 つ増える。",
      zh: "前几项竖排：77、757、7557、75557……；每一项在两个 7 之间多一个 5。"
    },
    hint: {
      en: "Write the term with $k$ fives as $\\dfrac{680\\cdot10^k+13}{9}$ and sum a geometric series.",
      fr: "Écrivez le terme à $k$ chiffres 5 comme $\\dfrac{680\\cdot10^k+13}{9}$ et sommez une série géométrique.",
      es: "Escribe el término con $k$ cincos como $\\dfrac{680\\cdot10^k+13}{9}$ y suma una serie geométrica.",
      ja: "5 が $k$ 個の項を $\\dfrac{680\\cdot10^k+13}{9}$ と書き、等比数列の和を使いましょう。",
      zh: "把含 $k$ 个 5 的项写成 $\\dfrac{680\\cdot10^k+13}{9}$，再求等比数列的和。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 2.6, scale: 60, pad: 12 });
      ['77', '757', '7557', '75557', '755557', '⋮'].forEach((t, i) => F.text([3.2, 2.4 - i * 0.44], t, 'nodenum', 0, 0).setAttribute('text-anchor', 'end'));
      F.seg([0.6, 0.0], [3.4, 0.0], 'seg');
      F.text([0.7, 1.4], '+', 'nodenum', 0, 0);
      return F;
    },
    options: [
      { tex: "1219", correct: true, why: {
        en: "$m=1210$ and $n=9$.",
        fr: "$m=1210$ et $n=9$.",
        es: "$m=1210$ y $n=9$.",
        ja: "$m=1210$、$n=9$。",
        zh: "$m=1210$，$n=9$。"
      } },
      { tex: "1210+9", correct: true, why: {
        en: "The same sum written out.",
        fr: "La même somme écrite en détail.",
        es: "La misma suma escrita.",
        ja: "同じ和を書き出したもの。",
        zh: "同一个和的展开写法。"
      } },
      { tex: "1210", correct: false, why: {
        en: "That is $m$ alone.",
        fr: "C’est $m$ seul.",
        es: "Es solo $m$.",
        ja: "それは $m$ だけ。",
        zh: "那只是 $m$。"
      } },
      { tex: "9", correct: false, why: {
        en: "That is $n$ alone.",
        fr: "C’est $n$ seul.",
        es: "Es solo $n$.",
        ja: "それは $n$ だけ。",
        zh: "那只是 $n$。"
      } },
      { tex: "1228", correct: false, why: {
        en: "Off by $9$: $n$ counted twice.",
        fr: "Décalé de $9$ : $n$ compté deux fois.",
        es: "Se pasa en $9$: $n$ contado dos veces.",
        ja: "$9$ ずれている：$n$ を2回数えた。",
        zh: "多了 $9$：$n$ 算了两次。"
      } },
      { tex: "1309", correct: false, why: {
        en: "Using $13\\cdot100$ instead of $13\\cdot99$ terms in the constant part.",
        fr: "Utilise $13\\cdot100$ au lieu de $13\\cdot99$ dans la partie constante.",
        es: "Usa $13\\cdot100$ en vez de $13\\cdot99$ en la parte constante.",
        ja: "定数部分で $13\\cdot99$ でなく $13\\cdot100$ を使った。",
        zh: "常数部分用了 $13\\cdot100$ 而不是 $13\\cdot99$。"
      } },
      { tex: "2187", correct: false, why: {
        en: "$3^7$, unrelated.",
        fr: "$3^7$, sans rapport.",
        es: "$3^7$, sin relación.",
        ja: "$3^7$ で無関係。",
        zh: "$3^7$，无关。"
      } },
      { tex: "99", correct: false, why: {
        en: "That is the number of terms.",
        fr: "C’est le nombre de termes.",
        es: "Es el número de términos.",
        ja: "それは項の数。",
        zh: "那是项数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "A formula for each term",
          fr: "Une formule pour chaque terme",
          es: "Una fórmula para cada término",
          ja: "各項の式",
          zh: "每一项的公式"
        },
        lines: ["7\\underbrace{5\\cdots5}_{k}7 = 7\\cdot10^{k+1}+50\\cdot\\tfrac{10^k-1}{9}+7=\\dfrac{680\\cdot10^k+13}{9}"],
        note: {
          en: "Check: $k=0$ gives $\\tfrac{693}{9}=77$, $k=1$ gives $\\tfrac{6813}{9}=757$.",
          fr: "Vérification : $k=0$ donne $\\tfrac{693}{9}=77$, $k=1$ donne $\\tfrac{6813}{9}=757$.",
          es: "Comprobación: $k=0$ da $\\tfrac{693}{9}=77$ y $k=1$ da $\\tfrac{6813}{9}=757$.",
          ja: "確認：$k=0$ で $\\tfrac{693}{9}=77$、$k=1$ で $\\tfrac{6813}{9}=757$。",
          zh: "检验：$k=0$ 得 $\\tfrac{693}{9}=77$，$k=1$ 得 $\\tfrac{6813}{9}=757$。"
        }
      },
      {
        title: {
          en: "Sum and compare",
          fr: "Sommer et comparer",
          es: "Sumar y comparar",
          ja: "和をとって比べる",
          zh: "求和并比较"
        },
        lines: ["9S=\\sum_{k=0}^{98}\\left(680\\cdot10^k+13\\right)=\\tfrac{680(10^{99}-1)}{9}+1287", "9S=\\tfrac{680\\cdot10^{99}+13}{9}+1210 = 7\\overbrace{5\\cdots5}^{99}7+1210", "S=\\dfrac{7\\overbrace{5\\cdots5}^{99}7+1210}{9}\\Rightarrow m+n=\\boxed{1219}"],
        note: {
          en: "$1287=13\\cdot99$, and $1287-\\tfrac{680+13}{9}=1287-77=1210$.",
          fr: "$1287=13\\cdot99$, et $1287-\\tfrac{680+13}{9}=1287-77=1210$.",
          es: "$1287=13\\cdot99$, y $1287-\\tfrac{680+13}{9}=1287-77=1210$.",
          ja: "$1287=13\\cdot99$、$1287-\\tfrac{680+13}{9}=1287-77=1210$。",
          zh: "$1287=13\\cdot99$，$1287-\\tfrac{680+13}{9}=1287-77=1210$。"
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
