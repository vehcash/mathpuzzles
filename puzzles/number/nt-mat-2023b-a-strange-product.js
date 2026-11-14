/* number · Squaring with a strange product
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023b-a-strange-product",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question F",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question F",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta F",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 F",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 F 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Squaring with a strange product",
      fr: "Élever au carré avec un produit étrange",
      es: "Elevar al cuadrado con un producto extraño",
      ja: "奇妙な積で2乗する",
      zh: "用奇特乘法求平方"
    },
    statement: {
      en: "For integer vectors define $f\\big((a,b),(c,d)\\big)=(ac+bd,\\ ad+bc+2bd)$. <b>Which of the following are true</b> about the integer vectors $(a,b)$ with $f\\big((a,b),(a,b)\\big)=(2,0)$?",
      fr: "Pour des vecteurs entiers on pose $f\\big((a,b),(c,d)\\big)=(ac+bd,\\ ad+bc+2bd)$. <b>Lesquelles des affirmations suivantes sont vraies</b> sur les vecteurs entiers $(a,b)$ tels que $f\\big((a,b),(a,b)\\big)=(2,0)$ ?",
      es: "Para vectores enteros se define $f\\big((a,b),(c,d)\\big)=(ac+bd,\\ ad+bc+2bd)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas</b> sobre los vectores enteros $(a,b)$ con $f\\big((a,b),(a,b)\\big)=(2,0)$?",
      ja: "整数ベクトルに対し $f\\big((a,b),(c,d)\\big)=(ac+bd,\\ ad+bc+2bd)$ と定めます。$f\\big((a,b),(a,b)\\big)=(2,0)$ を満たす整数ベクトル $(a,b)$ について<b>正しいものはどれですか？</b>",
      zh: "对整数向量定义 $f\\big((a,b),(c,d)\\big)=(ac+bd,\\ ad+bc+2bd)$。关于满足 $f\\big((a,b),(a,b)\\big)=(2,0)$ 的整数向量 $(a,b)$，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Integer points near the origin and the circle a² + b² = 2.",
      fr: "Les points entiers près de l’origine et le cercle a² + b² = 2.",
      es: "Los puntos enteros cerca del origen y la circunferencia a² + b² = 2.",
      ja: "原点付近の格子点と円 a² + b² = 2。",
      zh: "原点附近的整点与圆 a² + b² = 2。"
    },
    hint: {
      en: "Write out the two components: $a^2+b^2=2$ and $2ab+2b^2=0$.",
      fr: "Écrivez les deux composantes : $a^2+b^2=2$ et $2ab+2b^2=0$.",
      es: "Escribe las dos componentes: $a^2+b^2=2$ y $2ab+2b^2=0$.",
      ja: "成分ごとに：$a^2+b^2=2$、$2ab+2b^2=0$。",
      zh: "写出两个分量：$a^2+b^2=2$ 与 $2ab+2b^2=0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 52, pad: 16 });
      const T = F.T = axes(F, -2, 2, -2, 2, { xl: 'a', yl: 'b', grid: true });
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) F.dot(T([a, b]));
      F.circle(T([0, 0]), Math.SQRT2, 'seg thin');
      F.reveal = () => {
      F.circle(T([1, -1]), 0.16, 'hl pink'); F.circle(T([-1, 1]), 0.16, 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there are exactly 2 such vectors": {"fr": "il y a exactement 2 tels vecteurs", "es": "hay exactamente 2 vectores así", "ja": "そのようなベクトルはちょうど2個", "zh": "恰有 2 个这样的向量"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足条件"},
      "there are none": {"fr": "il n’y en a aucun", "es": "no hay ninguno", "ja": "存在しない", "zh": "一个也没有"},
      "there are exactly 4 such vectors": {"fr": "il y a exactement 4 tels vecteurs", "es": "hay exactamente 4 vectores así", "ja": "そのようなベクトルはちょうど4個", "zh": "恰有 4 个这样的向量"},
      "infinitely many": {"fr": "une infinité", "es": "infinitos", "ja": "無限に多い", "zh": "无穷多个"},
      "exactly 1": {"fr": "exactement 1", "es": "exactamente 1", "ja": "ちょうど1個", "zh": "恰有 1 个"},
      "impossible": {"fr": "impossible", "es": "imposible", "ja": "不可能", "zh": "不可能"}
    },
    options: [
      { tex: "\\text{there are exactly 2 such vectors}", correct: true, why: {
        en: "$(1,-1),\\ (-1,1)$",
        fr: "$(1,-1),\\ (-1,1)$",
        es: "$(1,-1),\\ (-1,1)$",
        ja: "$(1,-1),\\ (-1,1)$",
        zh: "$(1,-1),\\ (-1,1)$"
      } },
      { tex: "(1,-1)\\ \\text{works}", correct: true, why: {
        en: "$f=(1+1,\\ -1-1+2)=(2,0)$",
        fr: "$f=(1+1,\\ -1-1+2)=(2,0)$",
        es: "$f=(1+1,\\ -1-1+2)=(2,0)$",
        ja: "$f=(1+1,\\ -1-1+2)=(2,0)$",
        zh: "$f=(1+1,\\ -1-1+2)=(2,0)$"
      } },
      { tex: "(1,1)\\ \\text{works}", correct: false, why: {
        en: "$f\\big((1,1),(1,1)\\big)=(2,4)$",
        fr: "$f\\big((1,1),(1,1)\\big)=(2,4)$",
        es: "$f\\big((1,1),(1,1)\\big)=(2,4)$",
        ja: "$f\\big((1,1),(1,1)\\big)=(2,4)$",
        zh: "$f\\big((1,1),(1,1)\\big)=(2,4)$"
      } },
      { tex: "\\text{there are none}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there are exactly 4 such vectors}", correct: false, why: {
        en: "All four points of $a^2+b^2=2$ satisfy the first equation, but only two satisfy $b(a+b)=0$.",
        fr: "Les quatre points de $a^2+b^2=2$ vérifient la première équation, mais deux seulement vérifient $b(a+b)=0$.",
        es: "Los cuatro puntos de $a^2+b^2=2$ cumplen la primera, pero solo dos cumplen $b(a+b)=0$.",
        ja: "$a^2+b^2=2$ の4点のうち $b(a+b)=0$ を満たすのは2点。",
        zh: "$a^2+b^2=2$ 上四点中只有两点满足 $b(a+b)=0$。"
      } },
      { tex: "\\text{infinitely many}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(\\sqrt2,0)\\ \\text{works}", correct: false, why: {
        en: "It does satisfy the equations, but it is not an integer vector.",
        fr: "Il vérifie les équations mais n’est pas un vecteur entier.",
        es: "Cumple las ecuaciones pero no es un vector entero.",
        ja: "式は満たすが整数ベクトルではない。",
        zh: "满足方程但不是整数向量。"
      } },
      { tex: "\\text{exactly 1}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Components",
          fr: "Composantes",
          es: "Componentes",
          ja: "成分",
          zh: "分量"
        },
        lines: ["a^2+b^2=2,\\qquad 2b(a+b)=0"],
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
          en: "Cases",
          fr: "Cas",
          es: "Casos",
          ja: "場合分け",
          zh: "分情况"
        },
        lines: ["b=0\\Rightarrow a^2=2\\ \\text{impossible};\\quad a=-b\\Rightarrow 2b^2=2\\Rightarrow b=\\pm1"],
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
