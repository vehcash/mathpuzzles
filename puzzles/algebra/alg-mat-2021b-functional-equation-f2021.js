/* algebra · f(x) + f(y) = 1/f(xy): find f(2021)
   Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2021b-functional-equation-f2021",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021, additional multiple-choice test (Mathematics Admissions Test), Question H",
        fr: "MAT d’Oxford 2021, test complémentaire à choix multiples (test d’admission en mathématiques), question H",
        es: "MAT de Oxford 2021, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta H",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 追加選択式テスト 問題 H",
        zh: "牛津大学数学入学考试 MAT 2021 补充选择题测试 第 H 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "f(x) + f(y) = 1/f(xy): find f(2021)",
      fr: "f(x) + f(y) = 1/f(xy) : trouver f(2021)",
      es: "f(x) + f(y) = 1/f(xy): halla f(2021)",
      ja: "f(x) + f(y) = 1/f(xy) から f(2021) を求める",
      zh: "f(x) + f(y) = 1/f(xy)：求 f(2021)"
    },
    statement: {
      en: "A function $f$ satisfies $f(x)>0$ for $x>0$, and $f(x)+f(y)=\\dfrac1{f(xy)}$ for all $x,y>0$. <b>Which of the following are true?</b>",
      fr: "Une fonction $f$ vérifie $f(x)>0$ pour $x>0$, et $f(x)+f(y)=\\dfrac1{f(xy)}$ pour tous $x,y>0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una función $f$ cumple $f(x)>0$ para $x>0$ y $f(x)+f(y)=\\dfrac1{f(xy)}$ para todos $x,y>0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "関数 $f$ は $x>0$ で $f(x)>0$、すべての $x,y>0$ で $f(x)+f(y)=\\dfrac1{f(xy)}$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "函数 $f$ 满足：$x>0$ 时 $f(x)>0$，且对所有 $x,y>0$ 有 $f(x)+f(y)=\\dfrac1{f(xy)}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The constant graph y = c for x > 0.",
      fr: "Le graphe constant y = c pour x > 0.",
      es: "La gráfica constante y = c para x > 0.",
      ja: "x > 0 での定数関数 y = c のグラフ。",
      zh: "x > 0 时的常值图像 y = c。"
    },
    hint: {
      en: "Put $y=1$ first, then $x=y=1$.",
      fr: "Posez d’abord $y=1$, puis $x=y=1$.",
      es: "Pon primero $y=1$, luego $x=y=1$.",
      ja: "まず $y=1$、次に $x=y=1$。",
      zh: "先令 $y=1$，再令 $x=y=1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 2.8, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.4, 4.6, -0.4, 2.4);
      F.seg(T([0.05, 1.4]), T([4.4, 1.4]), 'graph'); F.circle(T([0, 1.4]), 0.06, 'seg'); F.text(T([0, 1.4]), 'c', 'pt', -12, 0);
      F.reveal = () => {
      F.text(T([2.3, 1.85]), 'c = 1/√2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "c = 1/√2": {"fr": "c = 1/√2", "es": "c = 1/√2", "ja": "c = 1/√2", "zh": "c = 1/√2"},
      "is constant": {"fr": "est constante", "es": "es constante", "ja": "は定数", "zh": "是常数"},
      "no such function exists": {"fr": "aucune telle fonction n’existe", "es": "no existe tal función", "ja": "そのような関数はない", "zh": "不存在这样的函数"}
    },
    options: [
      { tex: "f(2021)=\\tfrac1{\\sqrt2}", correct: true, why: {
        en: "$f$ is the constant $\\tfrac1{\\sqrt2}$.",
        fr: "$f$ est la constante $\\tfrac1{\\sqrt2}$.",
        es: "$f$ es la constante $\\tfrac1{\\sqrt2}$.",
        ja: "$f$ は定数 $\\tfrac1{\\sqrt2}$。",
        zh: "$f$ 恒为 $\\tfrac1{\\sqrt2}$。"
      } },
      { tex: "f\\ \\text{is constant}", correct: true, why: {
        en: "With $y=1$, $f(x)$ solves the same quadratic $t^2+f(1)t-1=0$ for every $x$.",
        fr: "Avec $y=1$, $f(x)$ vérifie le même trinôme $t^2+f(1)t-1=0$ pour tout $x$.",
        es: "Con $y=1$, $f(x)$ cumple la misma cuadrática $t^2+f(1)t-1=0$ para todo $x$.",
        ja: "$y=1$ とすると、すべての $x$ で $f(x)$ は同じ $t^2+f(1)t-1=0$ を満たす。",
        zh: "令 $y=1$，对每个 $x$，$f(x)$ 都满足同一方程 $t^2+f(1)t-1=0$。"
      } },
      { tex: "f(2021)=1", correct: false, why: {
        en: "$1+1\\ne1$",
        fr: "$1+1\\ne1$",
        es: "$1+1\\ne1$",
        ja: "$1+1\\ne1$",
        zh: "$1+1\\ne1$"
      } },
      { tex: "f(2021)=2021", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(2021)=\\ln2021", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(2021)=\\tfrac1{\\ln2021}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "f(1)=\\tfrac12", correct: false, why: {
        en: "$2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)^2=\\tfrac12$",
        fr: "$2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)^2=\\tfrac12$",
        es: "$2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)^2=\\tfrac12$",
        ja: "$2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)^2=\\tfrac12$",
        zh: "$2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)^2=\\tfrac12$"
      } },
      { tex: "\\text{no such function exists}", correct: false, why: {
        en: "The constant $\\tfrac1{\\sqrt2}$ works: $\\sqrt2=\\tfrac{1}{1/\\sqrt2}$.",
        fr: "La constante $\\tfrac1{\\sqrt2}$ convient : $\\sqrt2=\\tfrac{1}{1/\\sqrt2}$.",
        es: "La constante $\\tfrac1{\\sqrt2}$ sirve: $\\sqrt2=\\tfrac{1}{1/\\sqrt2}$.",
        ja: "定数 $\\tfrac1{\\sqrt2}$ で成り立つ。",
        zh: "常数 $\\tfrac1{\\sqrt2}$ 满足。"
      } }
    ],
    steps: [
      {
        title: {
          en: "x = y = 1",
          fr: "x = y = 1",
          es: "x = y = 1",
          ja: "x = y = 1",
          zh: "x = y = 1"
        },
        lines: ["2f(1)=\\tfrac1{f(1)}\\Rightarrow f(1)=\\tfrac1{\\sqrt2}"],
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
          en: "y = 1",
          fr: "y = 1",
          es: "y = 1",
          ja: "y = 1",
          zh: "y = 1"
        },
        lines: ["f(x)+\\tfrac1{\\sqrt2}=\\tfrac1{f(x)}\\Rightarrow f(x)^2+\\tfrac{f(x)}{\\sqrt2}-1=0\\Rightarrow f(x)=\\tfrac1{\\sqrt2}"],
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
