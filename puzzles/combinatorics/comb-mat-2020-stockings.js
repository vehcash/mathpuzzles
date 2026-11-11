/* combinatorics · Balls into stockings
   Oxford MAT 2020 (Mathematics Admissions Test), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2020-stockings",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 6",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 6",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 6",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 6",
        zh: "牛津大学数学入学考试 MAT 2020 第 6 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Balls into stockings",
      fr: "Des boules dans des chaussettes",
      es: "Bolas en calcetines",
      ja: "靴下にボールを入れる",
      zh: "把球放进袜子"
    },
    statement: {
      en: "$g(n,k)$ is the number of ways to put $n$ identical balls into $k$ named stockings, and $h(n,k)$ the number of ways when every stocking gets at least one ball. <b>Which of the following are true?</b>",
      fr: "$g(n,k)$ est le nombre de façons de placer $n$ boules identiques dans $k$ chaussettes nommées, et $h(n,k)$ le nombre quand chaque chaussette reçoit au moins une boule. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$g(n,k)$ es el número de formas de poner $n$ bolas iguales en $k$ calcetines con nombre, y $h(n,k)$ el número cuando cada calcetín recibe al menos una bola. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "区別のない $n$ 個のボールを名前つきの $k$ 個の靴下に入れる方法の数を $g(n,k)$、どの靴下にも1個以上入れる方法の数を $h(n,k)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "把 $n$ 个相同的球放进 $k$ 只有名字的袜子，方法数记为 $g(n,k)$；每只袜子至少一个球时的方法数记为 $h(n,k)$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Stars and bars: 7 stars and 4 bars in a row, the bars splitting the stars into 5 stockings.",
      fr: "Étoiles et barres : 7 étoiles et 4 barres en ligne, les barres répartissant les étoiles en 5 chaussettes.",
      es: "Estrellas y barras: 7 estrellas y 4 barras en fila; las barras reparten las estrellas en 5 calcetines.",
      ja: "星と棒：7個の星と4本の棒を並べ、棒で星を5つの靴下に分ける。",
      zh: "星与隔板：7 颗星与 4 块隔板排成一行，隔板把星分成 5 只袜子。"
    },
    hint: {
      en: "Stars and bars: $n$ balls and $k-1$ dividers. For $h$, first put one ball in each stocking.",
      fr: "Étoiles et barres : $n$ boules et $k-1$ séparateurs. Pour $h$, mettez d’abord une boule par chaussette.",
      es: "Estrellas y barras: $n$ bolas y $k-1$ separadores. Para $h$, pon primero una bola en cada calcetín.",
      ja: "星と棒：$n$ 個と仕切り $k-1$ 本。$h$ はまず各靴下に1個ずつ入れる。",
      zh: "星与隔板：$n$ 个球、$k-1$ 块隔板。求 $h$ 时先每只放一个。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 14 });
      const row = ['★', '★', '|', '★', '|', '|', '★', '★', '★', '|', '★']; row.forEach((t, i) => F.text([0.4 + i * 0.55, 0.8], t, t === '|' ? 'pt' : 'len', 0, 0));
      return F;
    },
    options: [
      { tex: "g(7,5)=330", correct: true, why: {
        en: "$\\binom{7+4}{4}=\\binom{11}{4}=330$.",
        fr: "$\\binom{7+4}{4}=\\binom{11}{4}=330$.",
        es: "$\\binom{7+4}{4}=\\binom{11}{4}=330$.",
        ja: "$\\binom{7+4}{4}=\\binom{11}{4}=330$.",
        zh: "$\\binom{7+4}{4}=\\binom{11}{4}=330$."
      } },
      { tex: "h(7,5)=15", correct: true, why: {
        en: "$h(7,5)=g(2,5)=\\binom{6}{4}=15$.",
        fr: "$h(7,5)=g(2,5)=\\binom{6}{4}=15$.",
        es: "$h(7,5)=g(2,5)=\\binom{6}{4}=15$.",
        ja: "$h(7,5)=g(2,5)=\\binom{6}{4}=15$.",
        zh: "$h(7,5)=g(2,5)=\\binom{6}{4}=15$."
      } },
      { tex: "g(7,5)=462", correct: false, why: {
        en: "$\\binom{11}{5}$: uses $k$ bars instead of $k-1$.",
        fr: "$\\binom{11}{5}$: uses $k$ bars instead of $k-1$.",
        es: "$\\binom{11}{5}$: uses $k$ bars instead of $k-1$.",
        ja: "$\\binom{11}{5}$: uses $k$ bars instead of $k-1$.",
        zh: "$\\binom{11}{5}$: uses $k$ bars instead of $k-1$."
      } },
      { tex: "g(7,5)=5^7", correct: false, why: {
        en: "That counts distinguishable balls.",
        fr: "Cela compte des boules distinctes.",
        es: "Eso cuenta bolas distinguibles.",
        ja: "区別のあるボールの場合。",
        zh: "那是球可区分的情形。"
      } },
      { tex: "h(7,5)=21", correct: false, why: {
        en: "$\\binom72$: should be $\\binom64$.",
        fr: "$\\binom72$: should be $\\binom64$.",
        es: "$\\binom72$: should be $\\binom64$.",
        ja: "$\\binom72$: should be $\\binom64$.",
        zh: "$\\binom72$: should be $\\binom64$."
      } },
      { tex: "h(7,5)=35", correct: false, why: {
        en: "$\\binom74$: subtracts one too few.",
        fr: "$\\binom74$: subtracts one too few.",
        es: "$\\binom74$: subtracts one too few.",
        ja: "$\\binom74$: subtracts one too few.",
        zh: "$\\binom74$: subtracts one too few."
      } },
      { tex: "g(7,5)=792", correct: false, why: {
        en: "$\\binom{12}{5}$: one too many objects.",
        fr: "$\\binom{12}{5}$: one too many objects.",
        es: "$\\binom{12}{5}$: one too many objects.",
        ja: "$\\binom{12}{5}$: one too many objects.",
        zh: "$\\binom{12}{5}$: one too many objects."
      } },
      { tex: "h(7,5)=g(7,5)-5", correct: false, why: {
        en: "Removing “empty stocking” cases is not that simple.",
        fr: "Retirer les cas avec chaussette vide n’est pas si simple.",
        es: "Quitar los casos con calcetín vacío no es tan simple.",
        ja: "空の靴下の場合を除くのはそう単純でない。",
        zh: "去掉空袜子的情形没那么简单。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Stars and bars",
          fr: "Étoiles et barres",
          es: "Estrellas y barras",
          ja: "星と棒",
          zh: "星与隔板"
        },
        lines: ["g(n,k)=\\binom{n+k-1}{k-1}\\;\\Rightarrow\\;g(7,5)=\\binom{11}{4}=330"],
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
          en: "At least one each",
          fr: "Au moins une chacune",
          es: "Al menos una cada uno",
          ja: "各1個以上",
          zh: "每只至少一个"
        },
        lines: ["h(n,k)=g(n-k,k)=\\binom{n-1}{k-1}\\;\\Rightarrow\\;h(7,5)=\\binom64=15"],
        note: {
          en: "Put one ball in each stocking first; 2 balls remain to share freely.",
          fr: "Une boule par chaussette d’abord ; il reste 2 boules à répartir librement.",
          es: "Primero una bola por calcetín; quedan 2 para repartir libremente.",
          ja: "まず各靴下に1個、残り2個を自由に。",
          zh: "先每只放一个，剩 2 个自由分配。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
