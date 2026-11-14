/* algebra · Which inequality implies the other?
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2020b-which-inequality-implies-which",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question F",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question F",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta F",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 F",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 F 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Which inequality implies the other?",
      fr: "Quelle inéquation entraîne l’autre ?",
      es: "¿Qué inecuación implica la otra?",
      ja: "どちらの不等式が他方を導くか",
      zh: "哪个不等式蕴含另一个？"
    },
    statement: {
      en: "Let $P$ be the statement $\\dfrac{x^2-1}{x+2}<0$ and $Q$ the statement $\\dfrac{1+x}{1-x}>0$, for real $x$ where both are defined. <b>Which of the following are true?</b>",
      fr: "Soit $P$ l’énoncé $\\dfrac{x^2-1}{x+2}<0$ et $Q$ l’énoncé $\\dfrac{1+x}{1-x}>0$, pour $x$ réel où tout est défini. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $P$ el enunciado $\\dfrac{x^2-1}{x+2}<0$ y $Q$ el enunciado $\\dfrac{1+x}{1-x}>0$, para $x$ real donde estén definidos. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $x$ について、$P$：$\\dfrac{x^2-1}{x+2}<0$、$Q$：$\\dfrac{1+x}{1-x}>0$ とします（定義される範囲で）。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对实数 $x$（在有定义处），设 $P$：$\\dfrac{x^2-1}{x+2}<0$，$Q$：$\\dfrac{1+x}{1-x}>0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two number lines, one for P and one for Q.",
      fr: "Deux droites numériques, l’une pour P, l’autre pour Q.",
      es: "Dos rectas numéricas, una para P y otra para Q.",
      ja: "P 用と Q 用の2本の数直線。",
      zh: "两条数轴，分别对应 P 与 Q。"
    },
    hint: {
      en: "Solve each with a sign table, then compare the two sets.",
      fr: "Résolvez chacune avec un tableau de signes, puis comparez les ensembles.",
      es: "Resuelve cada una con una tabla de signos y compara los conjuntos.",
      ja: "それぞれ符号表で解き、集合を比べる。",
      zh: "分别用符号表求解，再比较两个集合。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.2, scale: 48, pad: 16 });
      const X = v => 3.0 + v * 0.9;
      [[1.6, 'P'], [0.5, 'Q']].forEach(([y, t]) => { F.seg([0.2, y], [5.8, y], 'axis'); F.text([0.2, y], t, 'pt', -12, 0); [-2, -1, 1].forEach(v => { F.seg([X(v), y - 0.08], [X(v), y + 0.08], 'axis'); F.text([X(v), y], String(v).replace('-', '−'), 'tick', 0, 16); }); });
      F.reveal = () => {
      F.seg([0.3, 1.6], [X(-2), 1.6], 'hl'); F.seg([X(-1), 1.6], [X(1), 1.6], 'hl'); F.seg([X(-1), 0.5], [X(1), 0.5], 'hl pink');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "P": {"fr": "P", "es": "P", "ja": "P", "zh": "P"},
      "Q": {"fr": "Q", "es": "Q", "ja": "Q", "zh": "Q"},
      "but not": {"fr": "mais pas", "es": "pero no", "ja": "だが次は不成立：", "zh": "但不"},
      "satisfies": {"fr": "vérifie", "es": "cumple", "ja": "は満たす", "zh": "满足"},
      "true": {"fr": "vraie", "es": "verdadera", "ja": "真", "zh": "真"},
      "false": {"fr": "fausse", "es": "falsa", "ja": "偽", "zh": "假"},
      "holds exactly for": {"fr": "a lieu exactement pour", "es": "se cumple exactamente para", "ja": "が成り立つのはちょうど", "zh": "恰在下列范围成立"},
      "holds for": {"fr": "a lieu pour", "es": "se cumple para", "ja": "は次で成立：", "zh": "在下列范围成立"},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "Q\\Rightarrow P\\ \\text{but not}\\ P\\Rightarrow Q", correct: true, why: {
        en: "$Q$ is $-1<x<1$; $P$ is $x<-2$ or $-1<x<1$.",
        fr: "$Q$ : $-1<x<1$ ; $P$ : $x<-2$ ou $-1<x<1$.",
        es: "$Q$: $-1<x<1$; $P$: $x<-2$ o $-1<x<1$.",
        ja: "$Q$ は $-1<x<1$、$P$ は $x<-2$ または $-1<x<1$。",
        zh: "$Q$：$-1<x<1$；$P$：$x<-2$ 或 $-1<x<1$。"
      } },
      { tex: "x=-3\\ \\text{satisfies}\\ P\\ \\text{but not}\\ Q", correct: true, why: {
        en: "$\\tfrac{8}{-1}<0,\\ \\tfrac{-2}{4}<0$",
        fr: "$\\tfrac{8}{-1}<0,\\ \\tfrac{-2}{4}<0$",
        es: "$\\tfrac{8}{-1}<0,\\ \\tfrac{-2}{4}<0$",
        ja: "$\\tfrac{8}{-1}<0,\\ \\tfrac{-2}{4}<0$",
        zh: "$\\tfrac{8}{-1}<0,\\ \\tfrac{-2}{4}<0$"
      } },
      { tex: "P\\Rightarrow Q\\ \\text{but not}\\ Q\\Rightarrow P", correct: false, why: {
        en: "$x=-3$ satisfies $P$ but not $Q$.",
        fr: "$x=-3$ vérifie $P$ mais pas $Q$.",
        es: "$x=-3$ cumple $P$ pero no $Q$.",
        ja: "$x=-3$ は $P$ を満たすが $Q$ は満たさない。",
        zh: "$x=-3$ 满足 $P$ 不满足 $Q$。"
      } },
      { tex: "P\\iff Q", correct: false, why: {
        en: "$x=-3$",
        fr: "$x=-3$",
        es: "$x=-3$",
        ja: "$x=-3$",
        zh: "$x=-3$"
      } },
      { tex: "P\\ \\text{true}\\Rightarrow Q\\ \\text{false}", correct: false, why: {
        en: "$x=0$",
        fr: "$x=0$",
        es: "$x=0$",
        ja: "$x=0$",
        zh: "$x=0$"
      } },
      { tex: "Q\\ \\text{true}\\Rightarrow P\\ \\text{false}", correct: false, why: {
        en: "$x=0$",
        fr: "$x=0$",
        es: "$x=0$",
        ja: "$x=0$",
        zh: "$x=0$"
      } },
      { tex: "P\\ \\text{holds exactly for}\\ -1<x<1", correct: false, why: {
        en: "It also holds for $x<-2$.",
        fr: "Elle vaut aussi pour $x<-2$.",
        es: "También se cumple para $x<-2$.",
        ja: "$x<-2$ でも成り立つ。",
        zh: "$x<-2$ 时也成立。"
      } },
      { tex: "Q\\ \\text{holds for}\\ x>1", correct: false, why: {
        en: "$x=2:\\ \\tfrac{3}{-1}<0$",
        fr: "$x=2:\\ \\tfrac{3}{-1}<0$",
        es: "$x=2:\\ \\tfrac{3}{-1}<0$",
        ja: "$x=2:\\ \\tfrac{3}{-1}<0$",
        zh: "$x=2:\\ \\tfrac{3}{-1}<0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Solve P",
          fr: "Résoudre P",
          es: "Resolver P",
          ja: "P を解く",
          zh: "解 P"
        },
        lines: ["\\dfrac{(x-1)(x+1)}{x+2}<0\\iff x<-2\\ \\text{or}\\ -1<x<1"],
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
          en: "Solve Q",
          fr: "Résoudre Q",
          es: "Resolver Q",
          ja: "Q を解く",
          zh: "解 Q"
        },
        lines: ["\\dfrac{1+x}{1-x}>0\\iff -1<x<1\\subset P"],
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
