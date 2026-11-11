/* calculus · Three numbers near 0.11
   Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2022-three-close-numbers",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2022, New Curriculum Paper I (新课标I卷), Question 7",
        fr: "Gaokao 2022, épreuve nationale I (新课标I卷), question 7",
        es: "Gaokao 2022, examen nacional I (新课标I卷), pregunta 7",
        ja: "2022年 中国・高考 新課程標準I卷 第7問",
        zh: "2022年高考数学新课标I卷 第7题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "Three numbers near 0.11",
      fr: "Trois nombres proches de 0,11",
      es: "Tres números cerca de 0,11",
      ja: "0.11 付近の3つの数",
      zh: "接近 0.11 的三个数"
    },
    statement: {
      en: "Let $a=0.1\\,e^{0.1}$, $b=\\dfrac19$, $c=-\\ln0.9$. <b>Which of the following are true?</b>",
      fr: "Soit $a=0{,}1\\,e^{0{,}1}$, $b=\\dfrac19$, $c=-\\ln0{,}9$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $a=0{,}1\\,e^{0{,}1}$, $b=\\dfrac19$, $c=-\\ln0{,}9$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a=0.1\\,e^{0.1}$、$b=\\dfrac19$、$c=-\\ln0.9$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a=0.1\\,e^{0.1}$，$b=\\dfrac19$，$c=-\\ln0.9$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The three numbers on a magnified number line between 0.104 and 0.112: c ≈ 0.1054, then a ≈ 0.1105, then b ≈ 0.1111.",
      fr: "Les trois nombres sur une droite graduée agrandie entre 0,104 et 0,112 : c ≈ 0,1054, puis a ≈ 0,1105, puis b ≈ 0,1111.",
      es: "Los tres números en una recta ampliada entre 0,104 y 0,112: c ≈ 0,1054, luego a ≈ 0,1105 y b ≈ 0,1111.",
      ja: "0.104〜0.112 を拡大した数直線上の3つの数：c ≈ 0.1054、a ≈ 0.1105、b ≈ 0.1111。",
      zh: "放大的数轴 0.104 到 0.112 上的三个数：c ≈ 0.1054，a ≈ 0.1105，b ≈ 0.1111。"
    },
    hint: {
      en: "Write all three as functions of $x=0.1$: $a=xe^x$, $b=\\frac{x}{1-x}$, $c=-\\ln(1-x)$, and compare near $0$.",
      fr: "Écrivez-les comme fonctions de $x=0{,}1$ : $a=xe^x$, $b=\\frac{x}{1-x}$, $c=-\\ln(1-x)$, et comparez près de $0$.",
      es: "Escríbelos como funciones de $x=0{,}1$: $a=xe^x$, $b=\\frac{x}{1-x}$, $c=-\\ln(1-x)$, y compara cerca de $0$.",
      ja: "$x=0.1$ の関数として $a=xe^x$、$b=\\frac{x}{1-x}$、$c=-\\ln(1-x)$ と書き、$0$ 付近で比べる。",
      zh: "写成 $x=0.1$ 的函数：$a=xe^x$，$b=\\frac{x}{1-x}$，$c=-\\ln(1-x)$，在 $0$ 附近比较。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.8, scale: 56, pad: 18 });
      const X = v => 0.2 + (v - 0.104) / 0.008 * 5.6, y = 0.7;
      F.seg([X(0.104), y], [X(0.112), y], 'axis');
      [0.104, 0.108, 0.112].forEach(v => { F.seg([X(v), y - 0.08], [X(v), y + 0.08], 'axis'); F.text([X(v), y], String(v), 'tick', 0, 16); });
      [[-Math.log(0.9), 'c'], [0.1 * Math.exp(0.1), 'a'], [1 / 9, 'b']].forEach(([v, t], k) => { F.dot([X(v), y]); F.text([X(v), y], t, 'len it', k === 2 ? 8 : 0, -16); });
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "near": {"fr": "près de", "es": "cerca de", "ja": "の近くで", "zh": "在附近"}
    },
    options: [
      { tex: "c<a<b", correct: true, why: {
        en: "$c\\approx0.1054$, $a\\approx0.1105$, $b\\approx0.1111$.",
        fr: "$c\\approx0{,}1054$, $a\\approx0{,}1105$, $b\\approx0{,}1111$.",
        es: "$c\\approx0{,}1054$, $a\\approx0{,}1105$, $b\\approx0{,}1111$.",
        ja: "$c\\approx0.1054$、$a\\approx0.1105$、$b\\approx0.1111$。",
        zh: "$c\\approx0.1054$，$a\\approx0.1105$，$b\\approx0.1111$。"
      } },
      { tex: "b>a \\text{ and } a>c", correct: true, why: {
        en: "The same order written the other way.",
        fr: "Le même ordre écrit dans l’autre sens.",
        es: "El mismo orden escrito al revés.",
        ja: "同じ順序を逆向きに書いたもの。",
        zh: "同一顺序反过来写。"
      } },
      { tex: "a<b<c", correct: false, why: {
        en: "$c$ is the smallest of the three.",
        fr: "$c$ est le plus petit des trois.",
        es: "$c$ es el menor de los tres.",
        ja: "$c$ が3つの中で最小。",
        zh: "$c$ 是三者中最小的。"
      } },
      { tex: "c<b<a", correct: false, why: {
        en: "$a<b$: $e^{x}<\\tfrac1{1-x}$ for $0<x<1$.",
        fr: "$a<b$ : $e^{x}<\\tfrac1{1-x}$ pour $0<x<1$.",
        es: "$a<b$: $e^{x}<\\tfrac1{1-x}$ para $0<x<1$.",
        ja: "$a<b$：$0<x<1$ で $e^{x}<\\tfrac1{1-x}$。",
        zh: "$a<b$：$0<x<1$ 时 $e^{x}<\\tfrac1{1-x}$。"
      } },
      { tex: "a<c<b", correct: false, why: {
        en: "$a>c$, though only by about $0.005$.",
        fr: "$a>c$, même si l’écart n’est que d’environ $0{,}005$.",
        es: "$a>c$, aunque solo por unos $0{,}005$.",
        ja: "差は約 $0.005$ だが $a>c$。",
        zh: "虽然只差约 $0.005$，但 $a>c$。"
      } },
      { tex: "b<a<c", correct: false, why: {
        en: "$b$ is the largest.",
        fr: "$b$ est le plus grand.",
        es: "$b$ es el mayor.",
        ja: "$b$ が最大。",
        zh: "$b$ 最大。"
      } },
      { tex: "a=b", correct: false, why: {
        en: "$b-a\\approx0.0006\\ne0$.",
        fr: "$b-a\\approx0{,}0006\\ne0$.",
        es: "$b-a\\approx0{,}0006\\ne0$.",
        ja: "$b-a\\approx0.0006\\ne0$。",
        zh: "$b-a\\approx0.0006\\ne0$。"
      } },
      { tex: "b<c<a", correct: false, why: {
        en: "Reverses the true order.",
        fr: "Inverse l’ordre réel.",
        es: "Invierte el orden real.",
        ja: "本当の順序と逆。",
        zh: "把真实顺序颠倒了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Compare a and b",
          fr: "Comparer a et b",
          es: "Comparar a y b",
          ja: "a と b を比べる",
          zh: "比较 a 与 b"
        },
        lines: ["\\frac ab=e^{0.1}(1-0.1)<1 \\iff e^{-x}>1-x,\\ x=0.1"],
        note: {
          en: "$e^{-x}>1-x$ for every $x\\ne0$ (the tangent line at $0$ lies below $e^{-x}$).",
          fr: "$e^{-x}>1-x$ pour tout $x\\ne0$ (la tangente en $0$ est sous $e^{-x}$).",
          es: "$e^{-x}>1-x$ para todo $x\\ne0$ (la tangente en $0$ queda bajo $e^{-x}$).",
          ja: "すべての $x\\ne0$ で $e^{-x}>1-x$（$0$ での接線は $e^{-x}$ の下）。",
          zh: "对所有 $x\\ne0$，$e^{-x}>1-x$（$0$ 处切线在 $e^{-x}$ 下方）。"
        }
      },
      {
        title: {
          en: "Compare a and c",
          fr: "Comparer a et c",
          es: "Comparar a y c",
          ja: "a と c を比べる",
          zh: "比较 a 与 c"
        },
        lines: ["h(x)=xe^x+\\ln(1-x),\\ h(0)=0,\\ h'(x)=\\frac{(1-x^2)e^x-1}{1-x}>0\\ \\ (0<x\\le0.1)"],
        note: {
          en: "So $h(0.1)>0$, i.e. $a>c$; altogether $\\boxed{c<a<b}$.",
          fr: "Donc $h(0{,}1)>0$, soit $a>c$ ; au total $\\boxed{c<a<b}$.",
          es: "Así $h(0{,}1)>0$, es decir $a>c$; en total $\\boxed{c<a<b}$.",
          ja: "よって $h(0.1)>0$、すなわち $a>c$。まとめて $\\boxed{c<a<b}$。",
          zh: "所以 $h(0.1)>0$，即 $a>c$；综上 $\\boxed{c<a<b}$。"
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
          en: "Two options state the same order.",
          fr: "Deux options énoncent le même ordre.",
          es: "Dos opciones dicen el mismo orden.",
          ja: "2つは同じ順序を表す。",
          zh: "有两个选项是同一顺序。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
