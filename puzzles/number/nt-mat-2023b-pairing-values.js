/* number · Which numbers does ½(x+y)(x+y+1) + y miss?
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023b-pairing-values",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question G",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question G",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta G",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 G",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 G 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Which numbers does ½(x+y)(x+y+1) + y miss?",
      fr: "Quels nombres ½(x+y)(x+y+1) + y évite-t-il ?",
      es: "¿Qué números no toma ½(x+y)(x+y+1) + y?",
      ja: "½(x+y)(x+y+1) + y が取らない数",
      zh: "½(x+y)(x+y+1) + y 取不到哪些数？"
    },
    statement: {
      en: "Let $f(x,y)=\\tfrac12(x+y)(x+y+1)+y$, where $x\\ge0$ and $y>0$ are integers. <b>Which of the following are true</b> about the values $f$ takes?",
      fr: "Soit $f(x,y)=\\tfrac12(x+y)(x+y+1)+y$, avec $x\\ge0$ et $y>0$ entiers. <b>Lesquelles des affirmations suivantes sont vraies</b> sur les valeurs prises par $f$ ?",
      es: "Sea $f(x,y)=\\tfrac12(x+y)(x+y+1)+y$, con $x\\ge0$ e $y>0$ enteros. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre los valores que toma $f$?",
      ja: "整数 $x\\ge0$、$y>0$ に対し $f(x,y)=\\tfrac12(x+y)(x+y+1)+y$ とします。$f$ がとる値について<b>正しいものはどれですか？</b>",
      zh: "设 $f(x,y)=\\tfrac12(x+y)(x+y+1)+y$，其中 $x\\ge0$、$y>0$ 为整数。关于 $f$ 的取值，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A table of f(x, y) for small x and y, diagonal by diagonal.",
      fr: "Un tableau de f(x, y) pour de petits x et y, diagonale par diagonale.",
      es: "Una tabla de f(x, y) para x e y pequeños, diagonal a diagonal.",
      ja: "小さい x, y に対する f(x, y) の表（斜めに並ぶ）。",
      zh: "小 x、y 时 f(x, y) 的表，按对角线排列。"
    },
    hint: {
      en: "Fix $s=x+y$. Then $f=T_s+y$ with $T_s=\\tfrac12s(s+1)$ and $1\\le y\\le s$.",
      fr: "Fixez $s=x+y$. Alors $f=T_s+y$ avec $T_s=\\tfrac12s(s+1)$ et $1\\le y\\le s$.",
      es: "Fija $s=x+y$. Entonces $f=T_s+y$ con $T_s=\\tfrac12s(s+1)$ y $1\\le y\\le s$.",
      ja: "$s=x+y$ を固定すると $f=T_s+y$（$T_s=\\tfrac12s(s+1)$, $1\\le y\\le s$）。",
      zh: "固定 $s=x+y$，则 $f=T_s+y$，$T_s=\\tfrac12s(s+1)$，$1\\le y\\le s$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.0, scale: 50, pad: 16 });
      const v = (x, y) => (x + y) * (x + y + 1) / 2 + y;
      for (let x = 0; x <= 4; x++) for (let y = 1; y <= 4; y++) { F.rect(0.6 + x * 0.85, 0.2 + (y - 1) * 0.8, 0.75, 0.7, 'fill-blue', 'fills'); F.text([0.97 + x * 0.85, 0.55 + (y - 1) * 0.8], String(v(x, y)), 'len small', 0, 0); }
      for (let x = 0; x <= 4; x++) F.text([0.97 + x * 0.85, 3.4], 'x=' + x, 'tick', 0, 0);
      for (let y = 1; y <= 4; y++) F.text([0.25, 0.55 + (y - 1) * 0.8], 'y=' + y, 'tick', 0, 0);
      F.reveal = () => {
      F.text([2.6, 3.8], '1, 3, 6, 10, 15 …', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1, 3, 6, 10, 15 …": {"fr": "1, 3, 6, 10, 15 …", "es": "1, 3, 6, 10, 15 …", "ja": "1, 3, 6, 10, 15 …", "zh": "1, 3, 6, 10, 15 …"},
      "every positive integer except the positive triangular numbers": {"fr": "tout entier strictement positif sauf les nombres triangulaires positifs", "es": "todo entero positivo excepto los números triangulares positivos", "ja": "正の三角数を除くすべての正の整数", "zh": "除正三角形数外的所有正整数"},
      "except": {"fr": "sauf", "es": "excepto", "ja": "を除く", "zh": "除"},
      "every positive integer": {"fr": "tout entier strictement positif", "es": "todo entero positivo", "ja": "すべての正の整数", "zh": "所有正整数"},
      "the positive triangular numbers": {"fr": "les nombres triangulaires positifs", "es": "los números triangulares positivos", "ja": "正の三角数", "zh": "正三角形数"},
      "is taken": {"fr": "est atteint", "es": "se alcanza", "ja": "がとられる", "zh": "能取到"},
      "every even positive integer and nothing else": {"fr": "tous les entiers pairs positifs et rien d’autre", "es": "todos los pares positivos y nada más", "ja": "正の偶数すべてで、それ以外はない", "zh": "恰为全部正偶数"},
      "exactly the triangular numbers": {"fr": "exactement les nombres triangulaires", "es": "exactamente los números triangulares", "ja": "ちょうど三角数", "zh": "恰为三角形数"},
      "every positive integer except odd primes": {"fr": "tout entier positif sauf les premiers impairs", "es": "todo entero positivo salvo los primos impares", "ja": "奇素数以外の正の整数", "zh": "除奇素数外的所有正整数"},
      "is not taken": {"fr": "n’est pas atteint", "es": "no se alcanza", "ja": "はとられない", "zh": "取不到"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "each value is taken once": {"fr": "chaque valeur est atteinte une seule fois", "es": "cada valor se alcanza una sola vez", "ja": "各値はちょうど1回とられる", "zh": "每个值恰取一次"}
    },
    options: [
      { tex: "\\text{every positive integer except the positive triangular numbers}", correct: true, why: {
        en: "For each $s$ the values $T_s+1,\\dots,T_s+s$ fill the gap strictly between $T_s$ and $T_{s+1}$.",
        fr: "Pour chaque $s$, les valeurs $T_s+1,\\dots,T_s+s$ remplissent l’intervalle strict entre $T_s$ et $T_{s+1}$.",
        es: "Para cada $s$, los valores $T_s+1,\\dots,T_s+s$ llenan el hueco estricto entre $T_s$ y $T_{s+1}$.",
        ja: "各 $s$ で $T_s+1,\\dots,T_s+s$ が $T_s$ と $T_{s+1}$ の間を埋める。",
        zh: "每个 $s$ 下，$T_s+1,\\dots,T_s+s$ 恰填满 $T_s$ 与 $T_{s+1}$ 之间。"
      } },
      { tex: "8\\ \\text{is taken}", correct: true, why: {
        en: "$f(1,2)=6+2=8$",
        fr: "$f(1,2)=6+2=8$",
        es: "$f(1,2)=6+2=8$",
        ja: "$f(1,2)=6+2=8$",
        zh: "$f(1,2)=6+2=8$"
      } },
      { tex: "\\text{every positive integer}", correct: false, why: {
        en: "$1=T_1$ is never reached: $f\\ge2$.",
        fr: "$1=T_1$ n’est jamais atteint : $f\\ge2$.",
        es: "$1=T_1$ nunca se alcanza: $f\\ge2$.",
        ja: "$1=T_1$ はとられない（$f\\ge2$）。",
        zh: "$1=T_1$ 取不到：$f\\ge2$。"
      } },
      { tex: "\\text{exactly the triangular numbers}", correct: false, why: {
        en: "It is the opposite: those are the ones missed.",
        fr: "C’est l’inverse : ce sont eux qui manquent.",
        es: "Es al revés: esos son los que faltan.",
        ja: "逆。とられないのが三角数。",
        zh: "恰恰相反，取不到的是它们。"
      } },
      { tex: "\\text{every even positive integer and nothing else}", correct: false, why: {
        en: "$f(0,1)=2,\\ f(1,1)=4,\\ f(0,2)=5$",
        fr: "$f(0,1)=2,\\ f(1,1)=4,\\ f(0,2)=5$",
        es: "$f(0,1)=2,\\ f(1,1)=4,\\ f(0,2)=5$",
        ja: "$f(0,1)=2,\\ f(1,1)=4,\\ f(0,2)=5$",
        zh: "$f(0,1)=2,\\ f(1,1)=4,\\ f(0,2)=5$"
      } },
      { tex: "\\text{every positive integer except odd primes}", correct: false, why: {
        en: "$f(0,2)=5$",
        fr: "$f(0,2)=5$",
        es: "$f(0,2)=5$",
        ja: "$f(0,2)=5$",
        zh: "$f(0,2)=5$"
      } },
      { tex: "10\\ \\text{is taken}", correct: false, why: {
        en: "$10=T_4$ is triangular.",
        fr: "$10=T_4$ est triangulaire.",
        es: "$10=T_4$ es triangular.",
        ja: "$10=T_4$ は三角数。",
        zh: "$10=T_4$ 是三角形数。"
      } },
      { tex: "21\\ \\text{is taken}", correct: false, why: {
        en: "$21=T_6$ is triangular.",
        fr: "$21=T_6$ est triangulaire.",
        es: "$21=T_6$ es triangular.",
        ja: "$21=T_6$ は三角数。",
        zh: "$21=T_6$ 是三角形数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Fix the diagonal",
          fr: "Fixer la diagonale",
          es: "Fijar la diagonal",
          ja: "対角線を固定",
          zh: "固定对角线"
        },
        lines: ["s=x+y\\ge1:\\quad f=T_s+y,\\ \\ 1\\le y\\le s"],
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
          en: "Fill the gaps",
          fr: "Remplir les trous",
          es: "Llenar los huecos",
          ja: "すき間を埋める",
          zh: "填满空隙"
        },
        lines: ["\\{T_s+1,\\dots,T_s+s\\}=\\{T_s+1,\\dots,T_{s+1}-1\\}"],
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
