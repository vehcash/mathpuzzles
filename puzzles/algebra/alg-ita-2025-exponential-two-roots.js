/* algebra · When has 9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 two roots?
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2025-exponential-two-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 6",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 6",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 6",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第6問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 6 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "When has 9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 two roots?",
      fr: "Quand 9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 a-t-elle deux solutions ?",
      es: "¿Cuándo tiene 9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 dos soluciones?",
      ja: "9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 が2解をもつ条件",
      zh: "9ˣ − (3a+4)3ˣ + 2a² + 9a − 5 = 0 何时有两个解？"
    },
    statement: {
      en: "Consider $9^x-(3a+4)\\,3^x+2a^2+9a-5=0$, where $a$ is real. We want exactly two distinct real solutions $x$. <b>Which of the following are true?</b>",
      fr: "On considère $9^x-(3a+4)\\,3^x+2a^2+9a-5=0$, $a$ réel. On veut exactement deux solutions réelles distinctes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $9^x-(3a+4)\\,3^x+2a^2+9a-5=0$, con $a$ real. Se quieren exactamente dos soluciones reales distintas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $a$ に対し $9^x-(3a+4)\\,3^x+2a^2+9a-5=0$ がちょうど2つの異なる実数解をもつ条件を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $9^x-(3a+4)\\,3^x+2a^2+9a-5=0$（$a$ 为实数），要求恰有两个不同实根。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The two lines t = 2a − 1 and t = a + 5 against a, with t > 0 shaded.",
      fr: "Les deux droites t = 2a − 1 et t = a + 5 en fonction de a, avec t > 0.",
      es: "Las rectas t = 2a − 1 y t = a + 5 frente a a, con t > 0 sombreado.",
      ja: "a に対する2直線 t = 2a − 1, t = a + 5 と t > 0 の領域。",
      zh: "关于 a 的两条直线 t = 2a − 1 与 t = a + 5，阴影为 t > 0。"
    },
    hint: {
      en: "Put $t=3^x>0$; the quadratic in $t$ factors nicely.",
      fr: "Posez $t=3^x>0$ ; le trinôme en $t$ se factorise bien.",
      es: "Pon $t=3^x>0$; la cuadrática en $t$ factoriza bien.",
      ja: "$t=3^x>0$ とおくと $t$ の2次式はきれいに因数分解できる。",
      zh: "令 $t=3^x>0$，关于 $t$ 的二次式可分解。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 4.0, scale: 44, pad: 16 });
      const S = ([x, y]) => [(x + 1.2) * 0.56, (y + 2) * 0.26];
      F.seg(S([-1.2, 0]), S([8, 0]), 'axis'); F.seg(S([0, -2]), S([0, 13]), 'axis'); F.text(S([8, 0]), 'a', 'tick', -8, 12); F.text(S([0, 13]), 't', 'tick', 12, 8);
      F.seg(S([-0.5, -2]), S([7, 13]), 'graph'); F.seg(S([-1.2, 3.8]), S([8, 13]), 'conic');
      F.reveal = () => {
      F.dot(S([0.5, 0])); F.dot(S([6, 11])); F.text(S([0.5, 0]), '1/2', 'tick', 0, 14); F.text(S([6, 11]), 'a = 6', 'len small', 34, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1/2": {"fr": "1/2", "es": "1/2", "ja": "1/2", "zh": "1/2"},
      "a = 6": {"fr": "a = 6", "es": "a = 6", "ja": "a = 6", "zh": "a = 6"},
      "gives two solutions": {"fr": "donne deux solutions", "es": "da dos soluciones", "ja": "で解は2つ", "zh": "有两个解"}
    },
    options: [
      { tex: "a\\in\\left(\\tfrac12,\\infty\\right)\\setminus\\{6\\}", correct: true, why: {
        en: "Both roots $t=2a-1$, $t=a+5$ must be positive and different.",
        fr: "Les racines $t=2a-1$ et $t=a+5$ doivent être positives et distinctes.",
        es: "Las raíces $t=2a-1$ y $t=a+5$ deben ser positivas y distintas.",
        ja: "解 $t=2a-1$, $t=a+5$ が正で異なる。",
        zh: "根 $t=2a-1$、$t=a+5$ 须为正且不同。"
      } },
      { tex: "t^2-(3a+4)t+2a^2+9a-5=(t-2a+1)(t-a-5)", correct: true, why: {
        en: "$(2a-1)(a+5)=2a^2+9a-5$",
        fr: "$(2a-1)(a+5)=2a^2+9a-5$",
        es: "$(2a-1)(a+5)=2a^2+9a-5$",
        ja: "$(2a-1)(a+5)=2a^2+9a-5$",
        zh: "$(2a-1)(a+5)=2a^2+9a-5$"
      } },
      { tex: "a\\in(6,\\infty)", correct: false, why: {
        en: "$a=1$ already works: $t=1$ and $t=6$.",
        fr: "$a=1$ convient déjà : $t=1$ et $t=6$.",
        es: "$a=1$ ya sirve: $t=1$ y $t=6$.",
        ja: "$a=1$ で $t=1,6$ となり成立。",
        zh: "$a=1$ 时 $t=1,6$ 已满足。"
      } },
      { tex: "a\\in\\left(\\tfrac32,\\infty\\right)\\setminus\\{6\\}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a\\in\\mathbb R\\setminus\\{6\\}", correct: false, why: {
        en: "$a=0$ gives $t=-1$, which is not a value of $3^x$.",
        fr: "$a=0$ donne $t=-1$, impossible pour $3^x$.",
        es: "$a=0$ da $t=-1$, imposible para $3^x$.",
        ja: "$a=0$ で $t=-1$、$3^x$ はとれない。",
        zh: "$a=0$ 得 $t=-1$，$3^x$ 取不到。"
      } },
      { tex: "a\\in\\mathbb R", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=6\\ \\text{gives two solutions}", correct: false, why: {
        en: "Then $t=11$ is a double root: one solution $x=\\log_311$.",
        fr: "Alors $t=11$ est racine double : une seule solution.",
        es: "Entonces $t=11$ es raíz doble: una sola solución.",
        ja: "$t=11$ が重解で、解は1つ。",
        zh: "此时 $t=11$ 为重根，只有一个解。"
      } },
      { tex: "a=\\tfrac12\\ \\text{gives two solutions}", correct: false, why: {
        en: "$t=0\\ \\times,\\ t=\\tfrac{11}{2}$",
        fr: "$t=0\\ \\times,\\ t=\\tfrac{11}{2}$",
        es: "$t=0\\ \\times,\\ t=\\tfrac{11}{2}$",
        ja: "$t=0\\ \\times,\\ t=\\tfrac{11}{2}$",
        zh: "$t=0\\ \\times,\\ t=\\tfrac{11}{2}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "置き換え",
          zh: "换元"
        },
        lines: ["t=3^x>0:\\ (t-(2a-1))(t-(a+5))=0"],
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
          en: "Conditions",
          fr: "Conditions",
          es: "Condiciones",
          ja: "条件",
          zh: "条件"
        },
        lines: ["2a-1>0,\\ a+5>0,\\ 2a-1\\ne a+5\\Rightarrow a>\\tfrac12,\\ a\\ne6"],
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
