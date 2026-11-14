/* algebra · How many solutions has log₂x = log₂(x + a) + b?
   Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question I */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2022b-log-equation-sign-of-ab",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022, additional multiple-choice test (Mathematics Admissions Test), Question I",
        fr: "MAT d’Oxford 2022, test complémentaire à choix multiples (test d’admission en mathématiques), question I",
        es: "MAT de Oxford 2022, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta I",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 追加選択式テスト 問題 I",
        zh: "牛津大学数学入学考试 MAT 2022 补充选择题测试 第 I 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "How many solutions has log₂x = log₂(x + a) + b?",
      fr: "Combien de solutions pour log₂x = log₂(x + a) + b ?",
      es: "¿Cuántas soluciones tiene log₂x = log₂(x + a) + b?",
      ja: "log₂x = log₂(x + a) + b の解の個数",
      zh: "log₂x = log₂(x + a) + b 有几个解？"
    },
    statement: {
      en: "Let $a,b$ be nonzero real numbers and consider $\\log_2x=\\log_2(x+a)+b$ for $x>0$. <b>Which of the following are true?</b>",
      fr: "Soient $a,b$ des réels non nuls ; on considère $\\log_2x=\\log_2(x+a)+b$ pour $x>0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $a,b$ reales no nulos; considera $\\log_2x=\\log_2(x+a)+b$ con $x>0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a,b$ を $0$ でない実数とし、$x>0$ で $\\log_2x=\\log_2(x+a)+b$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a,b$ 为非零实数，考虑 $x>0$ 时 $\\log_2x=\\log_2(x+a)+b$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The curves y = log₂x and y = log₂(x + a) + b for some a and b.",
      fr: "Les courbes y = log₂x et y = log₂(x + a) + b pour certains a, b.",
      es: "Las curvas y = log₂x e y = log₂(x + a) + b para ciertos a, b.",
      ja: "ある a, b に対する曲線 y = log₂x と y = log₂(x + a) + b。",
      zh: "某些 a、b 下的曲线 y = log₂x 与 y = log₂(x + a) + b。"
    },
    hint: {
      en: "It forces $\\dfrac{x}{x+a}=2^b$, so $x=\\dfrac{a\\,2^b}{1-2^b}$. When is this positive with $x+a>0$?",
      fr: "On obtient $\\dfrac{x}{x+a}=2^b$, d’où $x=\\dfrac{a\\,2^b}{1-2^b}$. Quand est-ce positif avec $x+a>0$ ?",
      es: "Se obtiene $\\dfrac{x}{x+a}=2^b$, luego $x=\\dfrac{a\\,2^b}{1-2^b}$. ¿Cuándo es positivo con $x+a>0$?",
      ja: "$\\dfrac{x}{x+a}=2^b$ より $x=\\dfrac{a\\,2^b}{1-2^b}$。$x+a>0$ と合わせて正になるのは？",
      zh: "得 $\\dfrac{x}{x+a}=2^b$，$x=\\dfrac{a\\,2^b}{1-2^b}$。何时为正且 $x+a>0$？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.8, scale: 46, pad: 16 });
      const T = F.T = axes(F, -0.4, 4.6, -1.8, 2.0);
      plot(F, T, x => Math.log2(x), 0.3, 4.6, 'graph', 'base', -1.8, 2.0);
      plot(F, T, x => Math.log2(x - 0.3) + 0.4, 0.33, 4.6, 'conic', 'base', -1.8, 2.0);
      F.reveal = () => {
      const x0 = -0.3 * Math.pow(2, 0.4) / (1 - Math.pow(2, 0.4)); F.dot(T([x0, Math.log2(x0)]));
      F.text(T([2.7, -1.3]), 'a = −0.3, b = 0.4', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a = −0.3, b = 0.4": {"fr": "a = −0,3, b = 0,4", "es": "a = −0,3, b = 0,4", "ja": "a = −0.3, b = 0.4", "zh": "a = −0.3，b = 0.4"},
      "one solution if": {"fr": "une solution si", "es": "una solución si", "ja": "1つの解：", "zh": "一个解，当"},
      "none if": {"fr": "aucune si", "es": "ninguna si", "ja": "解なし：", "zh": "无解，当"},
      "gives": {"fr": "donne", "es": "da", "ja": "で", "zh": "给出"},
      "one if": {"fr": "une si", "es": "una si", "ja": "1つ：", "zh": "一个，当"},
      "two if": {"fr": "deux si", "es": "dos si", "ja": "2つ：", "zh": "两个，当"},
      "there can be two solutions": {"fr": "il peut y avoir deux solutions", "es": "puede haber dos soluciones", "ja": "解が2つになりうる", "zh": "可能有两个解"}
    },
    options: [
      { tex: "\\text{one solution if}\\ ab<0,\\ \\text{none if}\\ ab>0", correct: true, why: {
        en: "Both conditions $x>0$ and $x+a>0$ hold exactly when $a$ and $b$ have opposite signs.",
        fr: "$x>0$ et $x+a>0$ ont lieu exactement quand $a$ et $b$ sont de signes contraires.",
        es: "$x>0$ y $x+a>0$ se cumplen justo cuando $a$ y $b$ tienen signos opuestos.",
        ja: "$x>0$ と $x+a>0$ が成り立つのは $a,b$ が異符号のとき。",
        zh: "$x>0$ 与 $x+a>0$ 同时成立当且仅当 $a,b$ 异号。"
      } },
      { tex: "a=-1,\\ b=1\\ \\text{gives}\\ x=2", correct: true, why: {
        en: "$\\log_22=1=\\log_21+1$",
        fr: "$\\log_22=1=\\log_21+1$",
        es: "$\\log_22=1=\\log_21+1$",
        ja: "$\\log_22=1=\\log_21+1$",
        zh: "$\\log_22=1=\\log_21+1$"
      } },
      { tex: "\\text{none if}\\ ab<0,\\ \\text{one if}\\ ab>0", correct: false, why: {
        en: "Reversed: $a=1,b=1$ would need $\\tfrac{x}{x+1}=2$, impossible for $x>0$.",
        fr: "Inversé : $a=1,b=1$ exigerait $\\tfrac{x}{x+1}=2$, impossible.",
        es: "Al revés: $a=1,b=1$ exigiría $\\tfrac{x}{x+1}=2$, imposible.",
        ja: "逆。$a=b=1$ なら $\\tfrac{x}{x+1}=2$ で不可能。",
        zh: "反了：$a=b=1$ 需 $\\tfrac{x}{x+1}=2$，不可能。"
      } },
      { tex: "\\text{one solution if}\\ ab<1,\\ \\text{two if}\\ ab>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{none if}\\ ab<1,\\ \\text{one if}\\ ab>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{one solution if}\\ ab<1,\\ \\text{none if}\\ ab>1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{there can be two solutions}", correct: false, why: {
        en: "The equation is linear after removing logs.",
        fr: "Sans logarithmes l’équation est du premier degré.",
        es: "Sin logaritmos la ecuación es lineal.",
        ja: "対数を外すと1次方程式。",
        zh: "去对数后是一次方程。"
      } },
      { tex: "a=1,\\ b=-1\\ \\text{gives}\\ x=2", correct: false, why: {
        en: "$x=\\tfrac{1\\cdot\\frac12}{1-\\frac12}=1$",
        fr: "$x=\\tfrac{1\\cdot\\frac12}{1-\\frac12}=1$",
        es: "$x=\\tfrac{1\\cdot\\frac12}{1-\\frac12}=1$",
        ja: "$x=\\tfrac{1\\cdot\\frac12}{1-\\frac12}=1$",
        zh: "$x=\\tfrac{1\\cdot\\frac12}{1-\\frac12}=1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Remove logs",
          fr: "Supprimer les logarithmes",
          es: "Quitar logaritmos",
          ja: "対数を外す",
          zh: "去对数"
        },
        lines: ["\\dfrac{x}{x+a}=2^b\\Rightarrow x=\\dfrac{a\\,2^b}{1-2^b},\\quad x+a=\\dfrac{a}{1-2^b}"],
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
          en: "Signs",
          fr: "Signes",
          es: "Signos",
          ja: "符号",
          zh: "符号"
        },
        lines: ["x>0,\\ x+a>0\\iff \\tfrac{a}{1-2^b}>0\\iff ab<0"],
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
