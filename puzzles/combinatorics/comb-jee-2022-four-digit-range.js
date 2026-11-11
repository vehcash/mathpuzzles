/* combinatorics · Four-digit numbers from six digits
   JEE Advanced 2022 (India), Paper 1, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2022-four-digit-range",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 1, Mathematics Q.7",
        fr: "JEE Advanced 2022 (Inde), épreuve 1, mathématiques Q.7",
        es: "JEE Advanced 2022 (India), prueba 1, matemáticas Q.7",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 1 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷一 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Four-digit numbers from six digits",
      fr: "Nombres à quatre chiffres avec six chiffres",
      es: "Números de cuatro cifras con seis dígitos",
      ja: "6種類の数字でつくる4桁の数",
      zh: "用六个数字组成的四位数"
    },
    statement: {
      en: "<b>Which of the following equal the number of 4-digit integers in the closed interval $[2022,\\,4482]$ whose digits all come from $\\{0,2,3,4,6,7\\}$</b> (digits may repeat)?",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre d’entiers à 4 chiffres de l’intervalle $[2022,\\,4482]$ dont tous les chiffres sont dans $\\{0,2,3,4,6,7\\}$</b> (répétitions permises) ?",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de enteros de 4 cifras en el intervalo $[2022,\\,4482]$ cuyas cifras están todas en $\\{0,2,3,4,6,7\\}$</b> (se pueden repetir)?",
      ja: "<b>閉区間 $[2022,\\,4482]$ にある4桁の整数のうち、各桁がすべて $\\{0,2,3,4,6,7\\}$ の数字（重複可）であるものの個数に等しいものはどれですか？</b>",
      zh: "<b>闭区间 $[2022,\\,4482]$ 中各位数字都取自 $\\{0,2,3,4,6,7\\}$（可重复）的四位整数个数等于下列哪些？</b>"
    },
    figureText: {
      en: "A tree on the first digit: 2 (209 numbers, after removing 2000–2021), 3 (216) and 4 (144, cut off at 4482).",
      fr: "Un arbre sur le premier chiffre : 2 (209 nombres, après avoir retiré 2000–2021), 3 (216) et 4 (144, limité à 4482).",
      es: "Un árbol según la primera cifra: 2 (209 números, quitando 2000–2021), 3 (216) y 4 (144, cortado en 4482).",
      ja: "先頭の数字で分けた樹形図：2（2000–2021 を除いて 209 個）、3（216 個）、4（4482 までで 144 個）。",
      zh: "按首位数字分类：2（去掉 2000–2021 后 209 个）、3（216 个）、4（截至 4482，144 个）。"
    },
    hint: {
      en: "Split by the first digit. Only the first digits $2$ and $4$ need care at the ends of the interval.",
      fr: "Séparez selon le premier chiffre. Seuls $2$ et $4$ demandent de l’attention aux bornes.",
      es: "Separa por la primera cifra. Solo el $2$ y el $4$ requieren cuidado en los extremos.",
      ja: "先頭の数字で分ける。両端の注意が必要なのは $2$ と $4$ だけ。",
      zh: "按首位分类。只有首位为 $2$ 和 $4$ 时要注意区间端点。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.8, scale: 50, pad: 14 });
      const R = [3.2, 2.4]; F.dot(R);
      [['2', '209', 1.0], ['3', '216', 3.2], ['4', '144', 5.4]].forEach(([d, n, x]) => { F.seg(R, [x, 1.48]); F.circle([x, 1.2], 0.28, 'fill-yellow'); F.text([x, 1.2], d, 'pt', 0, 0); F.text([x, 0.45], n, 'len', 0, 0); });
      return F;
    },
    options: [
      { tex: "569", correct: true, why: {
        en: "$209+216+144$.",
        fr: "$209+216+144$.",
        es: "$209+216+144$.",
        ja: "$209+216+144$.",
        zh: "$209+216+144$."
      } },
      { tex: "(6^3-7)+6^3+(3\\cdot6^2+6\\cdot6)", correct: true, why: {
        en: "The three cases written out.",
        fr: "Les trois cas écrits en détail.",
        es: "Los tres casos escritos.",
        ja: "3つの場合を書き出したもの。",
        zh: "三种情形的展开式。"
      } },
      { tex: "648", correct: false, why: {
        en: "$3\\cdot6^3$: ignores both ends of the interval.",
        fr: "$3\\cdot6^3$ : ignore les deux bornes.",
        es: "$3\\cdot6^3$: ignora ambos extremos.",
        ja: "$3\\cdot6^3$：区間の両端を無視。",
        zh: "$3\\cdot6^3$：忽略了区间两端。"
      } },
      { tex: "576", correct: false, why: {
        en: "Removes 2000–2021 wrongly or misses 447x.",
        fr: "Retire mal 2000–2021 ou oublie 447x.",
        es: "Quita mal 2000–2021 u olvida 447x.",
        ja: "2000–2021 の除外か 447x を誤った。",
        zh: "2000–2021 去错或漏了 447x。"
      } },
      { tex: "563", correct: false, why: {
        en: "Misses the six numbers $4470$–$4477$.",
        fr: "Oublie les six nombres $4470$–$4477$.",
        es: "Olvida los seis números $4470$–$4477$.",
        ja: "$4470$–$4477$ の6個を落とした。",
        zh: "漏了 $4470$–$4477$ 这六个数。"
      } },
      { tex: "2461", correct: false, why: {
        en: "All integers in the interval, any digits.",
        fr: "Tous les entiers de l’intervalle, chiffres quelconques.",
        es: "Todos los enteros del intervalo, cualquier cifra.",
        ja: "区間内のすべての整数。",
        zh: "区间内所有整数。"
      } },
      { tex: "216", correct: false, why: {
        en: "Only the numbers starting with 3.",
        fr: "Seulement ceux qui commencent par 3.",
        es: "Solo los que empiezan por 3.",
        ja: "3 で始まる数だけ。",
        zh: "只算了首位为 3 的。"
      } },
      { tex: "570", correct: false, why: {
        en: "Off by one at an end of the interval.",
        fr: "Erreur d’une unité à une borne.",
        es: "Error de uno en un extremo.",
        ja: "端で1つずれている。",
        zh: "端点处差一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "First digit 3",
          fr: "Premier chiffre 3",
          es: "Primera cifra 3",
          ja: "先頭が 3",
          zh: "首位为 3"
        },
        lines: ["3\\,\\square\\square\\square:\\quad6^3=216"],
        note: {
          en: "Every such number lies inside the interval.",
          fr: "Tous ces nombres sont dans l’intervalle.",
          es: "Todos esos números están en el intervalo.",
          ja: "これらはすべて区間内。",
          zh: "这些数都在区间内。"
        }
      },
      {
        title: {
          en: "First digit 2",
          fr: "Premier chiffre 2",
          es: "Primera cifra 2",
          ja: "先頭が 2",
          zh: "首位为 2"
        },
        lines: ["216-\\#\\{2000,2002,2003,2004,2006,2007,2020\\}=216-7=209"],
        note: {
          en: "Remove the allowed numbers below 2022.",
          fr: "On retire les nombres permis inférieurs à 2022.",
          es: "Quitamos los números permitidos menores que 2022.",
          ja: "2022 未満の数を除く。",
          zh: "去掉小于 2022 的数。"
        }
      },
      {
        title: {
          en: "First digit 4",
          fr: "Premier chiffre 4",
          es: "Primera cifra 4",
          ja: "先頭が 4",
          zh: "首位为 4"
        },
        lines: ["40\\square\\square,42\\square\\square,43\\square\\square:\\ 3\\cdot36=108;\\qquad44\\square\\square:\\ 6\\cdot6=36"],
        note: {
          en: "$44ab\\le4482$ for every allowed $a\\le7$, $b$. Second digit 6 or 7 is too big.",
          fr: "$44ab\\le4482$ pour tout $a\\le7$, $b$ permis. Un 2e chiffre 6 ou 7 est trop grand.",
          es: "$44ab\\le4482$ para todo $a\\le7$, $b$ permitido. Segunda cifra 6 o 7 es demasiado.",
          ja: "$44ab\\le4482$（$a\\le7$）。2桁目 6, 7 は大きすぎ。",
          zh: "$44ab\\le4482$ 对所有允许的 $a\\le7$、$b$ 成立；第二位为 6 或 7 太大。"
        }
      },
      {
        title: {
          en: "Total",
          fr: "Total",
          es: "Total",
          ja: "合計",
          zh: "合计"
        },
        lines: ["209+216+144=\\boxed{569}"],
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
