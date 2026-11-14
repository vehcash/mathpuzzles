/* algebra · How many crossing points on y = 1 − 10x?
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023b-where-lines-meet",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question I",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question I",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta I",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 I",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "How many crossing points on y = 1 − 10x?",
      fr: "Combien de points d’intersection sur y = 1 − 10x ?",
      es: "¿Cuántos puntos de corte sobre y = 1 − 10x?",
      ja: "y = 1 − 10x 上の交点はいくつ？",
      zh: "y = 1 − 10x 上有几个交点？"
    },
    statement: {
      en: "Consider the lines $y=2x+k$ for $k=1,2,\\dots,9$ and $y=-x+k$ for $k=1,2,\\dots,7$. <b>Which of the following are true</b> about the points where the line $y=1-10x$ meets at least one of these lines?",
      fr: "On considère les droites $y=2x+k$ pour $k=1,2,\\dots,9$ et $y=-x+k$ pour $k=1,2,\\dots,7$. <b>Lesquelles des affirmations suivantes sont vraies</b> sur les points où la droite $y=1-10x$ rencontre au moins l’une d’elles ?",
      es: "Considera las rectas $y=2x+k$ para $k=1,2,\\dots,9$ e $y=-x+k$ para $k=1,2,\\dots,7$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre los puntos donde la recta $y=1-10x$ corta al menos a una de ellas?",
      ja: "直線 $y=2x+k$（$k=1,\\dots,9$）と $y=-x+k$（$k=1,\\dots,7$）を考えます。直線 $y=1-10x$ がこれらの少なくとも1本と交わる点について<b>正しいものはどれですか？</b>",
      zh: "考虑直线 $y=2x+k$（$k=1,\\dots,9$）与 $y=-x+k$（$k=1,\\dots,7$）。关于直线 $y=1-10x$ 与其中至少一条相交的点，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The steep line y = 1 − 10x crossing two fans of parallel lines.",
      fr: "La droite raide y = 1 − 10x qui coupe deux familles de droites parallèles.",
      es: "La recta empinada y = 1 − 10x cortando dos familias de paralelas.",
      ja: "急な直線 y = 1 − 10x が2組の平行線と交わる。",
      zh: "陡峭直线 y = 1 − 10x 穿过两组平行线。"
    },
    hint: {
      en: "The crossings are at $x=\\tfrac{1-k}{12}$ and $x=\\tfrac{1-k}{9}$. When do two of them coincide?",
      fr: "Les intersections sont en $x=\\tfrac{1-k}{12}$ et $x=\\tfrac{1-k}{9}$. Quand deux coïncident-elles ?",
      es: "Los cortes están en $x=\\tfrac{1-k}{12}$ y $x=\\tfrac{1-k}{9}$. ¿Cuándo coinciden dos?",
      ja: "交点は $x=\\tfrac{1-k}{12}$ と $x=\\tfrac{1-k}{9}$。一致するのはいつ？",
      zh: "交点在 $x=\\tfrac{1-k}{12}$ 与 $x=\\tfrac{1-k}{9}$，何时重合？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 4.6, scale: 44, pad: 16 });
      const S = ([x, y]) => [ (x + 0.9) * 4.0, (y + 0.5) * 0.4 ];
      F.seg(S([-0.9, 0]), S([0.3, 0]), 'axis'); F.seg(S([0, -0.5]), S([0, 10]), 'axis'); F.text(S([0.3, 0]), 'x', 'tick', -8, 12); F.text(S([0, 10]), 'y', 'tick', 12, 8);
      for (let k = 1; k <= 9; k++) F.seg(S([-0.9, -1.8 + k]), S([0.3, 0.6 + k]), 'seg thin');
      for (let k = 1; k <= 7; k++) F.seg(S([-0.9, 0.9 + k]), S([0.3, -0.3 + k]), 'seg thin dashc');
      F.seg(S([-0.9, 10.0]), S([0.105, -0.05]), 'graph');
      F.reveal = () => {
      const xs = new Set(); for (let k = 1; k <= 9; k++) xs.add(((1 - k) / 12).toFixed(6)); for (let k = 1; k <= 7; k++) xs.add(((1 - k) / 9).toFixed(6));
      xs.forEach(v => { const x = +v; F.dot(S([x, 1 - 10 * x])); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "are each hit twice": {"fr": "sont chacun atteints deux fois", "es": "se alcanzan dos veces cada uno", "ja": "はそれぞれ2回現れる", "zh": "各出现两次"},
      "is hit twice": {"fr": "est atteint deux fois", "es": "se alcanza dos veces", "ja": "は2回現れる", "zh": "出现两次"},
      "all crossings have": {"fr": "toutes les intersections ont", "es": "todos los cortes tienen", "ja": "すべての交点で", "zh": "所有交点都满足"}
    },
    options: [
      { tex: "13", correct: true, why: {
        en: "$9+7=16$ crossings, minus $3$ coincidences.",
        fr: "$9+7=16$ intersections, moins $3$ coïncidences.",
        es: "$9+7=16$ cortes, menos $3$ coincidencias.",
        ja: "$9+7=16$ 個から重なり3個を引く。",
        zh: "$9+7=16$ 个交点减去 $3$ 个重合。"
      } },
      { tex: "x=0,\\ -\\tfrac13,\\ -\\tfrac23\\ \\text{are each hit twice}", correct: true, why: {
        en: "$\\tfrac{1-k}{12}=\\tfrac{1-k'}{9}$ needs $3(k-1)=4(k'-1)$: $k=1,5,9$.",
        fr: "$\\tfrac{1-k}{12}=\\tfrac{1-k'}{9}$ exige $3(k-1)=4(k'-1)$ : $k=1,5,9$.",
        es: "$\\tfrac{1-k}{12}=\\tfrac{1-k'}{9}$ exige $3(k-1)=4(k'-1)$: $k=1,5,9$.",
        ja: "$3(k-1)=4(k'-1)$ より $k=1,5,9$。",
        zh: "需 $3(k-1)=4(k'-1)$，即 $k=1,5,9$。"
      } },
      { tex: "16", correct: false, why: {
        en: "Counts the shared points twice.",
        fr: "Compte deux fois les points communs.",
        es: "Cuenta dos veces los puntos comunes.",
        ja: "共有点を2回数えている。",
        zh: "重复计算了公共点。"
      } },
      { tex: "12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "14", correct: false, why: {
        en: "Misses one of the three coincidences.",
        fr: "Oublie une des trois coïncidences.",
        es: "Olvida una de las tres coincidencias.",
        ja: "重なりを1つ見落とす。",
        zh: "漏了一个重合点。"
      } },
      { tex: "15", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=-\\tfrac12\\ \\text{is hit twice}", correct: false, why: {
        en: "$-\\tfrac12=\\tfrac{1-k}{12}$ needs $k=7$, but $\\tfrac{1-k'}{9}=-\\tfrac12$ has no integer $k'$.",
        fr: "$k=7$ convient pour $\\tfrac{1-k}{12}$, mais aucun $k'$ entier pour $\\tfrac{1-k'}9$.",
        es: "$k=7$ sirve para $\\tfrac{1-k}{12}$, pero no hay $k'$ entero para $\\tfrac{1-k'}9$.",
        ja: "$\\tfrac{1-k}{12}$ では $k=7$ だが $\\tfrac{1-k'}{9}$ に整数 $k'$ はない。",
        zh: "$\\tfrac{1-k}{12}$ 取 $k=7$，但 $\\tfrac{1-k'}9$ 无整数 $k'$。"
      } },
      { tex: "\\text{all crossings have}\\ x<0", correct: false, why: {
        en: "$k=1$ gives the crossing at $x=0$.",
        fr: "$k=1$ donne l’intersection en $x=0$.",
        es: "$k=1$ da el corte en $x=0$.",
        ja: "$k=1$ で $x=0$ の交点。",
        zh: "$k=1$ 给出 $x=0$ 处的交点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where the crossings are",
          fr: "Où sont les intersections",
          es: "Dónde están los cortes",
          ja: "交点の位置",
          zh: "交点位置"
        },
        lines: ["2x+k=1-10x\\Rightarrow x=\\tfrac{1-k}{12};\\qquad -x+k=1-10x\\Rightarrow x=\\tfrac{1-k}{9}"],
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
          en: "Remove repeats",
          fr: "Retirer les doublons",
          es: "Quitar repetidos",
          ja: "重複を除く",
          zh: "去重"
        },
        lines: ["3(k-1)=4(k'-1):\\ (k,k')=(1,1),(5,4),(9,7)\\Rightarrow 16-3=13"],
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
