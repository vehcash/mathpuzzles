/* algebra · When does 1 + r + r² + … with r = 1 + x − x² converge?
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2022b-geometric-series-in-x",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question F",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question F",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta F",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 F",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 F 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "When does 1 + r + r² + … with r = 1 + x − x² converge?",
      fr: "Quand 1 + r + r² + … avec r = 1 + x − x² converge-t-elle ?",
      es: "¿Cuándo converge 1 + r + r² + … con r = 1 + x − x²?",
      ja: "r = 1 + x − x² のとき 1 + r + r² + … が収束する条件",
      zh: "r = 1 + x − x² 时 1 + r + r² + … 何时收敛？"
    },
    statement: {
      en: "Let $r=1+x-x^2$. Consider when $1+r+r^2+r^3+\\cdots=\\dfrac{1}{x(x-1)}$. <b>Which of the following are true?</b>",
      fr: "Soit $r=1+x-x^2$. On cherche quand $1+r+r^2+r^3+\\cdots=\\dfrac{1}{x(x-1)}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $r=1+x-x^2$. Se estudia cuándo $1+r+r^2+r^3+\\cdots=\\dfrac{1}{x(x-1)}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$r=1+x-x^2$ とし、$1+r+r^2+r^3+\\cdots=\\dfrac{1}{x(x-1)}$ となる条件を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $r=1+x-x^2$，考虑何时 $1+r+r^2+r^3+\\cdots=\\dfrac{1}{x(x-1)}$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola r = 1 + x − x² with the band −1 < r < 1 shaded.",
      fr: "La parabole r = 1 + x − x² et la bande −1 < r < 1.",
      es: "La parábola r = 1 + x − x² y la franja −1 < r < 1.",
      ja: "放物線 r = 1 + x − x² と帯 −1 < r < 1。",
      zh: "抛物线 r = 1 + x − x² 与带状区域 −1 < r < 1。"
    },
    hint: {
      en: "A geometric series converges exactly when $|r|<1$, and then its sum is $\\tfrac1{1-r}$.",
      fr: "Une série géométrique converge exactement quand $|r|<1$, et vaut alors $\\tfrac1{1-r}$.",
      es: "Una serie geométrica converge exactamente si $|r|<1$, y entonces vale $\\tfrac1{1-r}$.",
      ja: "等比級数は $|r|<1$ のときに限り収束し、和は $\\tfrac1{1-r}$。",
      zh: "等比级数当且仅当 $|r|<1$ 时收敛，和为 $\\tfrac1{1-r}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.0, scale: 46, pad: 16 });
      const T = F.T = axes(F, -1.8, 3.2, -2.5, 1.5, { yl: 'r' });
      F.rect(T([-1.8, -1])[0], T([0, -1])[1], 5.0, 2.0, 'fill-blue', 'fills');
      plot(F, T, x => 1 + x - x * x, -1.6, 2.6, 'graph', 'base', -2.5, 1.5);
      F.reveal = () => {
      F.seg(T([-1, 0]), T([0, 0]), 'hl pink'); F.seg(T([1, 0]), T([2, 0]), 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "whenever": {"fr": "dès que", "es": "siempre que", "ja": "のとき常に", "zh": "只要"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "all real": {"fr": "tout réel", "es": "todo real", "ja": "すべての実数", "zh": "所有实数"},
      "gives sum": {"fr": "donne la somme", "es": "da la suma", "ja": "で和は", "zh": "时和为"}
    },
    options: [
      { tex: "-1<x<0\\ \\text{or}\\ 1<x<2", correct: true, why: {
        en: "Exactly where $-1<1+x-x^2<1$.",
        fr: "Exactement là où $-1<1+x-x^2<1$.",
        es: "Justo donde $-1<1+x-x^2<1$.",
        ja: "まさに $-1<1+x-x^2<1$ の範囲。",
        zh: "正是 $-1<1+x-x^2<1$ 的范围。"
      } },
      { tex: "1-r=x(x-1)", correct: true, why: {
        en: "$1-(1+x-x^2)=x^2-x$",
        fr: "$1-(1+x-x^2)=x^2-x$",
        es: "$1-(1+x-x^2)=x^2-x$",
        ja: "$1-(1+x-x^2)=x^2-x$",
        zh: "$1-(1+x-x^2)=x^2-x$"
      } },
      { tex: "x\\ne0\\ \\text{and}\\ x\\ne1", correct: false, why: {
        en: "The formula makes sense there, but the series must also converge.",
        fr: "La formule a un sens, mais la série doit aussi converger.",
        es: "La fórmula tiene sentido, pero la serie también debe converger.",
        ja: "式は意味をもつが、級数が収束する必要がある。",
        zh: "公式有意义，但级数还须收敛。"
      } },
      { tex: "-1<x<1", correct: false, why: {
        en: "$x=\\tfrac12$: $r=\\tfrac54>1$",
        fr: "$x=\\tfrac12$: $r=\\tfrac54>1$",
        es: "$x=\\tfrac12$: $r=\\tfrac54>1$",
        ja: "$x=\\tfrac12$: $r=\\tfrac54>1$",
        zh: "$x=\\tfrac12$: $r=\\tfrac54>1$"
      } },
      { tex: "-2<x<-1\\ \\text{or}\\ 0<x<1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{all real}\\ x", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=\\tfrac32\\ \\text{gives sum}\\ \\tfrac34", correct: false, why: {
        en: "$r=\\tfrac14$, so the sum is $\\tfrac1{1-1/4}=\\tfrac43$.",
        fr: "$r=\\tfrac14$, la somme vaut $\\tfrac1{1-1/4}=\\tfrac43$.",
        es: "$r=\\tfrac14$, la suma es $\\tfrac1{1-1/4}=\\tfrac43$.",
        ja: "$r=\\tfrac14$ より和は $\\tfrac1{1-1/4}=\\tfrac43$。",
        zh: "$r=\\tfrac14$，和为 $\\tfrac1{1-1/4}=\\tfrac43$。"
      } },
      { tex: "0<x<1", correct: false, why: {
        en: "$r=1+x(1-x)>1$",
        fr: "$r=1+x(1-x)>1$",
        es: "$r=1+x(1-x)>1$",
        ja: "$r=1+x(1-x)>1$",
        zh: "$r=1+x(1-x)>1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Convergence",
          fr: "Convergence",
          es: "Convergencia",
          ja: "収束条件",
          zh: "收敛条件"
        },
        lines: ["|1+x-x^2|<1\\iff x^2-x>0\\ \\text{and}\\ x^2-x-2<0"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["(x<0\\ \\text{or}\\ x>1)\\ \\text{and}\\ -1<x<2"],
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
