/* calculus · The region inside four parabolas
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2020b-four-parabolas-region",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question J",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question J",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta J",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 J",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 J 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "The region inside four parabolas",
      fr: "La région intérieure à quatre paraboles",
      es: "La región interior a cuatro parábolas",
      ja: "4本の放物線で囲まれた領域",
      zh: "四条抛物线围成的区域"
    },
    statement: {
      en: "Let $R$ be the set of points $(x,y)$ with $x^2<2+y$, $x^2<2-y$, $y^2<2+x$ and $y^2<2-x$. <b>Which of the following are true?</b>",
      fr: "Soit $R$ l’ensemble des points $(x,y)$ avec $x^2<2+y$, $x^2<2-y$, $y^2<2+x$ et $y^2<2-x$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $R$ el conjunto de puntos $(x,y)$ con $x^2<2+y$, $x^2<2-y$, $y^2<2+x$ e $y^2<2-x$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x^2<2+y$、$x^2<2-y$、$y^2<2+x$、$y^2<2-x$ を満たす点 $(x,y)$ の集合を $R$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $R$ 为满足 $x^2<2+y$，$x^2<2-y$，$y^2<2+x$，$y^2<2-x$ 的点 $(x,y)$ 的集合。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Four parabolas opening up, down, left and right.",
      fr: "Quatre paraboles tournées vers le haut, le bas, la gauche et la droite.",
      es: "Cuatro parábolas abiertas hacia arriba, abajo, izquierda y derecha.",
      ja: "上下左右に開く4本の放物線。",
      zh: "开口向上、下、左、右的四条抛物线。"
    },
    hint: {
      en: "By symmetry, find the area in one eighth: between $y=x$ and $y=2-x^2$, from $x=0$ to $x=1$, plus the part near the axis.",
      fr: "Par symétrie, calculez un huitième : entre $y=x$ et $y=2-x^2$, de $x=0$ à $x=1$.",
      es: "Por simetría, calcula un octavo: entre $y=x$ e $y=2-x^2$, de $x=0$ a $x=1$.",
      ja: "対称性より $\\tfrac18$ を計算：$y=x$ と $y=2-x^2$ の間、$x=0$ から $1$ まで。",
      zh: "利用对称性求八分之一：$y=x$ 与 $y=2-x^2$ 之间，$x$ 从 $0$ 到 $1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -2.3, 2.3, -2.3, 2.3);
      plot(F, T, x => 2 - x * x, -2.2, 2.2, 'graph', 'base', -2.3, 2.3); plot(F, T, x => x * x - 2, -2.2, 2.2, 'graph', 'base', -2.3, 2.3);
      const L = (f) => { const p = []; for (let k = 0; k <= 80; k++) { const y = -2.07 + 4.14 * k / 80; p.push(T([f(y), y])); } F.curve(p, 'conic'); };
      L(y => 2 - y * y); L(y => y * y - 2);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 160; k++) { const t = 2 * Math.PI * k / 160, c = Math.cos(t), s = Math.sin(t); let lo = 0, hi = 2; for (let i = 0; i < 40; i++) { const r = (lo + hi) / 2, x = r * c, y = r * s; (x * x < 2 - Math.abs(y) && y * y < 2 - Math.abs(x)) ? lo = r : hi = r; } pts.push(T([lo * c, lo * s])); } F.path(pts, 'fill-yellow', 'fills');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "is unbounded": {"fr": "n’est pas bornée", "es": "no está acotada", "ja": "は有界でない", "zh": "无界"},
      "meet on": {"fr": "se coupent sur", "es": "se cortan en", "ja": "は次の上で交わる：", "zh": "交于"}
    },
    options: [
      { tex: "\\text{area}(R)=\\tfrac43(8\\sqrt2-7)", correct: true, why: {
        en: "$8\\left(\\tfrac{4\\sqrt2}{3}-\\tfrac76\\right)=\\tfrac{32\\sqrt2-28}{3}$",
        fr: "$8\\left(\\tfrac{4\\sqrt2}{3}-\\tfrac76\\right)=\\tfrac{32\\sqrt2-28}{3}$",
        es: "$8\\left(\\tfrac{4\\sqrt2}{3}-\\tfrac76\\right)=\\tfrac{32\\sqrt2-28}{3}$",
        ja: "$8\\left(\\tfrac{4\\sqrt2}{3}-\\tfrac76\\right)=\\tfrac{32\\sqrt2-28}{3}$",
        zh: "$8\\left(\\tfrac{4\\sqrt2}{3}-\\tfrac76\\right)=\\tfrac{32\\sqrt2-28}{3}$"
      } },
      { tex: "\\text{area}(R)\\approx5.75", correct: true, why: {
        en: "$\\tfrac43(8\\sqrt2-7)\\approx5.752$",
        fr: "$\\tfrac43(8\\sqrt2-7)\\approx5.752$",
        es: "$\\tfrac43(8\\sqrt2-7)\\approx5.752$",
        ja: "$\\tfrac43(8\\sqrt2-7)\\approx5.752$",
        zh: "$\\tfrac43(8\\sqrt2-7)\\approx5.752$"
      } },
      { tex: "\\text{area}(R)=\\tfrac{28}{3}", correct: false, why: {
        en: "That is the region inside just two parabolas $|y|<2-x^2$.",
        fr: "C’est la région entre deux paraboles seulement, $|y|<2-x^2$.",
        es: "Es la región entre solo dos parábolas, $|y|<2-x^2$.",
        ja: "放物線2本 $|y|<2-x^2$ だけの領域。",
        zh: "只是两条抛物线 $|y|<2-x^2$ 围成的面积。"
      } },
      { tex: "\\text{area}(R)=4+2\\pi", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{area}(R)=0", correct: false, why: {
        en: "$(0,0)\\in R$",
        fr: "$(0,0)\\in R$",
        es: "$(0,0)\\in R$",
        ja: "$(0,0)\\in R$",
        zh: "$(0,0)\\in R$"
      } },
      { tex: "R\\ \\text{is unbounded}", correct: false, why: {
        en: "$|x|,|y|<\\sqrt2$",
        fr: "$|x|,|y|<\\sqrt2$",
        es: "$|x|,|y|<\\sqrt2$",
        ja: "$|x|,|y|<\\sqrt2$",
        zh: "$|x|,|y|<\\sqrt2$"
      } },
      { tex: "(1,1)\\in R", correct: false, why: {
        en: "$1<2-1\\ \\ \\times$",
        fr: "$1<2-1\\ \\ \\times$",
        es: "$1<2-1\\ \\ \\times$",
        ja: "$1<2-1\\ \\ \\times$",
        zh: "$1<2-1\\ \\ \\times$"
      } },
      { tex: "\\text{area}(R)=8", correct: false, why: {
        en: "That is the square $|x|+|y|<2$.",
        fr: "C’est le carré $|x|+|y|<2$.",
        es: "Es el cuadrado $|x|+|y|<2$.",
        ja: "それは正方形 $|x|+|y|<2$。",
        zh: "那是正方形 $|x|+|y|<2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Corner of the region",
          fr: "Coin de la région",
          es: "Esquina de la región",
          ja: "領域の角",
          zh: "区域的角"
        },
        lines: ["y=2-x^2,\\ x=2-y^2\\ \\text{meet on}\\ y=x:\\ x^2+x-2=0\\Rightarrow x=1"],
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
          en: "One eighth",
          fr: "Un huitième",
          es: "Un octavo",
          ja: "8分の1",
          zh: "八分之一"
        },
        lines: ["\\tfrac18\\,\\text{area}=\\int_0^{1}(\\sqrt{2-y}-y)\\,dy=\\tfrac{4\\sqrt2}{3}-\\tfrac76"],
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
