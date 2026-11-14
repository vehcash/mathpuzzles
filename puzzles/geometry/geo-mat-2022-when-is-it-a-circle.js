/* geometry · For which k is this equation a circle?
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2022-when-is-it-a-circle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2022 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "For which k is this equation a circle?",
      fr: "Pour quels k cette équation est-elle un cercle ?",
      es: "¿Para qué k es esta ecuación una circunferencia?",
      ja: "この方程式が円を表す k は？",
      zh: "k 为何值时该方程表示圆？"
    },
    statement: {
      en: "<b>Which of the following are true</b> about the equation $x^2-4kx+y^2-4y+8=k^3-k$, where $k$ is a real constant?",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies</b> à propos de l’équation $x^2-4kx+y^2-4y+8=k^3-k$, où $k$ est une constante réelle ?",
      es: "<b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre la ecuación $x^2-4kx+y^2-4y+8=k^3-k$, con $k$ una constante real?",
      ja: "実定数 $k$ を含む方程式 $x^2-4kx+y^2-4y+8=k^3-k$ について、<b>正しいものはどれですか？</b>",
      zh: "关于方程 $x^2-4kx+y^2-4y+8=k^3-k$（$k$ 为实常数），<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line for k with the points −4, −1 and 1 marked.",
      fr: "Une droite des k avec les points −4, −1 et 1.",
      es: "Una recta numérica para k con los puntos −4, −1 y 1.",
      ja: "k の数直線に −4, −1, 1 を記す。",
      zh: "k 的数轴，标出 −4、−1、1。"
    },
    hint: {
      en: "Complete the squares: the right side must become the square of a radius, so it must be positive.",
      fr: "Complétez les carrés : le second membre doit être le carré d’un rayon, donc positif.",
      es: "Completa cuadrados: el lado derecho debe ser el cuadrado de un radio, luego positivo.",
      ja: "平方完成すると右辺は半径の2乗なので正。",
      zh: "配方后右边是半径的平方，须为正。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.6, scale: 50, pad: 16 });
      F.seg([0.2, 0.7], [6.4, 0.7], 'axis');
      [[-4, 0.8], [-1, 3.8], [1, 5.0]].forEach(([v, x]) => { F.dot([x, 0.7]); F.text([x, 0.7], String(v).replace('-', '−'), 'tick', 0, 18); });
      F.reveal = () => {
      F.seg([0.8, 0.7], [3.8, 0.7], 'hl'); F.seg([5.0, 0.7], [6.4, 0.7], 'hl');
      F.text([2.3, 0.7], '+', 'pt', 0, -14); F.text([5.7, 0.7], '+', 'pt', 0, -14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "only": {"fr": "seulement", "es": "solamente", "ja": "のみ", "zh": "仅"},
      "for every real": {"fr": "pour tout réel", "es": "para todo real", "ja": "すべての実数", "zh": "对所有实数"},
      "the centre is": {"fr": "le centre est", "es": "el centro es", "ja": "中心は", "zh": "圆心为"},
      "gives radius": {"fr": "donne le rayon", "es": "da radio", "ja": "で半径は", "zh": "时半径为"}
    },
    options: [
      { tex: "-4<k<-1\\ \\text{or}\\ k>1", correct: true, why: {
        en: "Exactly where $(k-1)(k+1)(k+4)>0$.",
        fr: "Exactement là où $(k-1)(k+1)(k+4)>0$.",
        es: "Justo donde $(k-1)(k+1)(k+4)>0$.",
        ja: "まさに $(k-1)(k+1)(k+4)>0$ の範囲。",
        zh: "正是 $(k-1)(k+1)(k+4)>0$ 的范围。"
      } },
      { tex: "r^2=(k-1)(k+1)(k+4)", correct: true, why: {
        en: "After completing the squares.",
        fr: "Après complétion des carrés.",
        es: "Tras completar cuadrados.",
        ja: "平方完成の後。",
        zh: "配方之后。"
      } },
      { tex: "k>1\\ \\text{only}", correct: false, why: {
        en: "Misses $-4<k<-1$, e.g. $k=-2$ gives $r^2=6$.",
        fr: "Oublie $-4<k<-1$ : $k=-2$ donne $r^2=6$.",
        es: "Olvida $-4<k<-1$: $k=-2$ da $r^2=6$.",
        ja: "$-4<k<-1$ を見落とす。$k=-2$ で $r^2=6$。",
        zh: "漏了 $-4<k<-1$，如 $k=-2$ 时 $r^2=6$。"
      } },
      { tex: "\\text{for every real}\\ k", correct: false, why: {
        en: "$k=0$ gives $r^2=-4$.",
        fr: "$k=0$ donne $r^2=-4$.",
        es: "$k=0$ da $r^2=-4$.",
        ja: "$k=0$ で $r^2=-4$。",
        zh: "$k=0$ 时 $r^2=-4$。"
      } },
      { tex: "k<-1\\ \\text{only}", correct: false, why: {
        en: "$k=-5$: $r^2=(-6)(-4)(-1)<0$",
        fr: "$k=-5$: $r^2=(-6)(-4)(-1)<0$",
        es: "$k=-5$: $r^2=(-6)(-4)(-1)<0$",
        ja: "$k=-5$: $r^2=(-6)(-4)(-1)<0$",
        zh: "$k=-5$: $r^2=(-6)(-4)(-1)<0$"
      } },
      { tex: "-1<k<0\\ \\text{or}\\ k>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the centre is}\\ (k,2)", correct: false, why: {
        en: "The centre is $(2k,2)$.",
        fr: "Le centre est $(2k,2)$.",
        es: "El centro es $(2k,2)$.",
        ja: "中心は $(2k,2)$。",
        zh: "圆心为 $(2k,2)$。"
      } },
      { tex: "k=-2\\ \\text{gives radius}\\ 6", correct: false, why: {
        en: "$r^2=6,\\ r=\\sqrt6$",
        fr: "$r^2=6,\\ r=\\sqrt6$",
        es: "$r^2=6,\\ r=\\sqrt6$",
        ja: "$r^2=6,\\ r=\\sqrt6$",
        zh: "$r^2=6,\\ r=\\sqrt6$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Complete the squares",
          fr: "Compléter les carrés",
          es: "Completar cuadrados",
          ja: "平方完成",
          zh: "配方"
        },
        lines: ["(x-2k)^2+(y-2)^2=k^3+4k^2-k-4"],
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
          en: "Factor and sign",
          fr: "Factoriser et étudier le signe",
          es: "Factorizar y signo",
          ja: "因数分解と符号",
          zh: "因式分解与符号"
        },
        lines: ["k^3+4k^2-k-4=(k-1)(k+1)(k+4)>0\\iff -4<k<-1\\ \\text{or}\\ k>1"],
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
