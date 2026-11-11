/* algebra · When do the candles run out?
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 45 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2020-candles",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 45",
        fr: "Concours de l’ITA (Institut technologique d’aéronautique, Brésil) 2020, mathématiques, question 45",
        es: "Examen de ingreso del ITA (Instituto Tecnológico de Aeronáutica, Brasil) 2020, matemáticas, pregunta 45",
        ja: "ITA（ブラジル航空技術大学）2020 入試 数学 第45問",
        zh: "巴西航空技术学院 ITA 2020 入学考试 数学第 45 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "When do the candles run out?",
      fr: "Quand manque-t-il des bougies ?",
      es: "¿Cuándo se acaban las velas?",
      ja: "ろうそくが足りなくなるのはいつ？",
      zh: "蜡烛什么时候不够？"
    },
    statement: {
      en: "Every birthday your cake gets as many candles as your new age. Candles come in packs of $12$; you buy exactly one pack each year, starting at your first birthday, and keep the leftovers. <b>Which of the following equal the first age at which there are not enough candles?</b>",
      fr: "À chaque anniversaire, le gâteau reçoit autant de bougies que votre nouvel âge. Les bougies sont vendues par paquets de $12$ ; vous achetez exactement un paquet par an, dès votre premier anniversaire, et gardez les restes. <b>Lesquelles des valeurs suivantes sont égales au premier âge où il manque des bougies ?</b>",
      es: "En cada cumpleaños la tarta lleva tantas velas como tu nueva edad. Las velas vienen en paquetes de $12$; compras exactamente un paquete al año, desde tu primer cumpleaños, y guardas las que sobran. <b>¿Cuáles de los siguientes valores son iguales a la primera edad en que no hay velas suficientes?</b>",
      ja: "誕生日ごとにケーキには新しい年齢と同じ本数のろうそくを立てます。ろうそくは $12$ 本入りで、1歳の誕生日から毎年ちょうど1箱買い、余りは取っておきます。<b>初めてろうそくが足りなくなる年齢に等しいものはどれですか？</b>",
      zh: "每次生日蛋糕上插的蜡烛数等于新的年龄。蜡烛每盒 $12$ 支；从 1 岁生日起每年恰好买一盒，剩下的留着。<b>下列哪些等于第一次蜡烛不够时的年龄？</b>"
    },
    figureText: {
      en: "Candles bought after n days, 12n, as a straight line. The candles used are compared with it in the solution.",
      fr: "Bougies achetées après n jours, 12n, en ligne droite. Les bougies utilisées sont comparées dans la solution.",
      es: "Velas compradas tras n días, 12n, como recta. Las velas usadas se comparan en la solución.",
      ja: "n 日後までに買ったろうそく 12n の直線。使った本数との比較は解答で。",
      zh: "n 天后买的蜡烛数 12n（直线）。用掉的蜡烛数在解答中比较。"
    },
    hint: {
      en: "After $n$ birthdays you have used $\\tfrac{n(n+1)}{2}$ candles and bought $12n$.",
      fr: "Après $n$ anniversaires vous avez utilisé $\\tfrac{n(n+1)}{2}$ bougies et en avez acheté $12n$.",
      es: "Tras $n$ cumpleaños has usado $\\tfrac{n(n+1)}{2}$ velas y comprado $12n$.",
      ja: "$n$ 回目の誕生日までに使ったのは $\\tfrac{n(n+1)}{2}$ 本、買ったのは $12n$ 本。",
      zh: "过了 $n$ 个生日，用了 $\\tfrac{n(n+1)}{2}$ 支，买了 $12n$ 支。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.2, scale: 62, pad: 18 });
      const X = n => 0.2 + n * 0.16, Y = v => 0.15 + v / 110;
      F.seg([X(0), Y(0)], [X(27), Y(0)], 'axis'); F.seg([X(0), Y(0)], [X(0), Y(340)], 'axis');
      const l = []; for (let n = 0; n <= 27; n++) l.push([X(n), Y(12 * n)]); const ln = F.curve(l, 'graph'); ln.style.stroke = '#3b8fbb';
      F.text([X(27), Y(324)], '12n', 'len small', 12, 14);
      F.reveal = () => {
      const c = []; for (let n = 0; n <= 25; n++) c.push([X(n), Y(n * (n + 1) / 2)]); F.curve(c, 'graph');
      for (let n = 1; n <= 25; n++) F.dot([X(n), Y(n * (n + 1) / 2)]);
      F.text([X(23), Y(276)], 'n = 23', 'len small', -30, -12); F.text([X(24), Y(0)], '24', 'tick', 0, 12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "vs": {"fr": "contre", "es": "frente a", "ja": "対", "zh": "对比"}
    },
    options: [
      { tex: "24", correct: true, why: {
        en: "At $24$ you need $300$ candles but have bought only $288$.",
        fr: "À $24$ ans il faut $300$ bougies mais vous n’en avez acheté que $288$.",
        es: "A los $24$ hacen falta $300$ velas pero solo has comprado $288$.",
        ja: "$24$ 歳では $300$ 本必要だが、買ったのは $288$ 本。",
        zh: "$24$ 岁时需要 $300$ 支，但只买了 $288$ 支。"
      } },
      { tex: "2\\cdot12", correct: true, why: {
        en: "$=24$: in general the answer is $2k$ for packs of $k$.",
        fr: "$=24$ : en général la réponse est $2k$ pour des paquets de $k$.",
        es: "$=24$: en general la respuesta es $2k$ con paquetes de $k$.",
        ja: "$=24$。$k$ 本入りなら答えは一般に $2k$。",
        zh: "$=24$：一般地，每盒 $k$ 支时答案是 $2k$。"
      } },
      { tex: "23", correct: false, why: {
        en: "At $23$ you have used exactly $276$ — all you have bought — so there is just enough.",
        fr: "À $23$ ans vous avez utilisé exactement $276$ — tout ce que vous avez acheté — donc juste assez.",
        es: "A los $23$ has usado exactamente $276$, todo lo comprado: justo suficiente.",
        ja: "$23$ 歳でちょうど $276$ 本使い、買った分と同じ。ぎりぎり足りる。",
        zh: "$23$ 岁时恰好用了 $276$ 支，正好等于买的，刚好够。"
      } },
      { tex: "12", correct: false, why: {
        en: "At $12$ you have used $78$ of $144$.",
        fr: "À $12$ ans vous avez utilisé $78$ sur $144$.",
        es: "A los $12$ has usado $78$ de $144$.",
        ja: "$12$ 歳では $144$ 本中 $78$ 本。",
        zh: "$12$ 岁时用了 $144$ 支中的 $78$ 支。"
      } },
      { tex: "13", correct: false, why: {
        en: "$13>12$, but the leftovers still cover it.",
        fr: "$13>12$, mais les restes suffisent encore.",
        es: "$13>12$, pero lo que sobra aún alcanza.",
        ja: "$13>12$ だが余りでまだ足りる。",
        zh: "$13>12$，但剩下的仍然够。"
      } },
      { tex: "25", correct: false, why: {
        en: "Already short at $24$.",
        fr: "Déjà insuffisant à $24$ ans.",
        es: "Ya faltan a los $24$.",
        ja: "$24$ 歳ですでに不足。",
        zh: "$24$ 岁时就已经不够。"
      } },
      { tex: "36", correct: false, why: {
        en: "Much too late.",
        fr: "Bien trop tard.",
        es: "Demasiado tarde.",
        ja: "遅すぎます。",
        zh: "太晚了。"
      } },
      { tex: "38", correct: false, why: {
        en: "Much too late.",
        fr: "Bien trop tard.",
        es: "Demasiado tarde.",
        ja: "遅すぎます。",
        zh: "太晚了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Used against bought",
          fr: "Utilisées contre achetées",
          es: "Usadas frente a compradas",
          ja: "使った本数と買った本数",
          zh: "用掉的与买来的"
        },
        lines: ["1+2+\\dots+n=\\tfrac{n(n+1)}{2}\\quad\\text{vs}\\quad 12n"],
        note: {
          en: "There are not enough candles at age $n$ when the total used exceeds the total bought.",
          fr: "Il manque des bougies à l’âge $n$ quand le total utilisé dépasse le total acheté.",
          es: "Faltan velas a la edad $n$ cuando el total usado supera el total comprado.",
          ja: "使った累計が買った累計を超えると足りなくなる。",
          zh: "当用掉的总数超过买来的总数时就不够了。"
        }
      },
      {
        title: {
          en: "Solve the inequality",
          fr: "Résoudre l’inégalité",
          es: "Resolver la desigualdad",
          ja: "不等式を解く",
          zh: "解不等式"
        },
        lines: ["\\tfrac{n(n+1)}{2}>12n \\iff n+1>24 \\iff n>23 \\;\\Rightarrow\\; \\boxed{24}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "At $n=23$ the two totals are equal ($276$), so the shortage starts at $24$.",
          fr: "En $n=23$ les deux totaux sont égaux ($276$), donc le manque commence à $24$.",
          es: "En $n=23$ los dos totales son iguales ($276$), así que la falta empieza a los $24$.",
          ja: "$n=23$ で両者は等しい（$276$）ので、不足は $24$ 歳から。",
          zh: "$n=23$ 时两者相等（$276$），所以从 $24$ 岁开始不够。"
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
          en: "Two options are the same age.",
          fr: "Deux options sont le même âge.",
          es: "Dos opciones son la misma edad.",
          ja: "2つの選択肢は同じ年齢です。",
          zh: "有两个选项是同一个年龄。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
