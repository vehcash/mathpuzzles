/* algebra · When does x⁴ + bx² + c = 0 have four distinct real roots?
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 18 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2023-biquadratic-four-distinct-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 2, Question 18",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 2, question 18",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 2, pregunta 18",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 2 第18問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 2 第 18 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "When does x⁴ + bx² + c = 0 have four distinct real roots?",
      fr: "Quand x⁴ + bx² + c = 0 a-t-elle quatre racines réelles distinctes ?",
      es: "¿Cuándo tiene x⁴ + bx² + c = 0 cuatro raíces reales distintas?",
      ja: "x⁴ + bx² + c = 0 が異なる4実根をもつ条件",
      zh: "x⁴ + bx² + c = 0 何时有四个不同实根？"
    },
    statement: {
      en: "Consider $x^4+bx^2+c=0$ with real constants $b,c$, and the condition that it has four distinct real roots. <b>Which of the following are true?</b>",
      fr: "On considère $x^4+bx^2+c=0$, avec $b,c$ réels, et la condition qu’elle ait quatre racines réelles distinctes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera $x^4+bx^2+c=0$, con $b,c$ reales, y la condición de que tenga cuatro raíces reales distintas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数の定数 $b,c$ について $x^4+bx^2+c=0$ が異なる4つの実数解をもつ条件を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑实常数 $b,c$ 下 $x^4+bx^2+c=0$ 有四个不同实根的条件。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The quadratic in t = x²: only its positive roots give values of x.",
      fr: "Le trinôme en t = x² : seules ses racines positives donnent des x.",
      es: "La cuadrática en t = x²: solo sus raíces positivas dan valores de x.",
      ja: "t = x² の2次式：正の根だけが x を与える。",
      zh: "关于 t = x² 的二次式：只有正根才给出 x。"
    },
    hint: {
      en: "Put $y=x^2$: you need two distinct positive roots of $y^2+by+c=0$.",
      fr: "Posez $y=x^2$ : il faut deux racines positives distinctes de $y^2+by+c=0$.",
      es: "Pon $y=x^2$: necesitas dos raíces positivas distintas de $y^2+by+c=0$.",
      ja: "$y=x^2$ とおくと $y^2+by+c=0$ が異なる2つの正の解をもつこと。",
      zh: "令 $y=x^2$，需 $y^2+by+c=0$ 有两个不同正根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 46, pad: 16 });
      const S = ([t, y]) => [1.4 + t * 1.0, 1.0 + y * 0.9];
      F.rect(0.2, 0.2, 1.2, 2.6, 'fill-blue', 'fills'); F.text([0.8, 2.55], 't < 0', 'len small', 0, 0);
      F.seg(S([-1.2, 0]), S([3.5, 0]), 'axis'); F.seg(S([0, -0.9]), S([0, 2]), 'axis'); F.text(S([3.4, 0]), 't = x²', 'tick', -14, 14);
      plot(F, S, t => t * t - 3 * t + 2, -0.4, 3.4, 'graph', 'base', -0.9, 2);
      F.reveal = () => {
      [1, 2].forEach(t => F.dot(S([t, 0]))); F.text(S([1.5, 0]), 't₁, t₂ > 0', 'len small pink', 0, 18);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "has two distinct positive roots": {"fr": "a deux racines positives distinctes", "es": "tiene dos raíces positivas distintas", "ja": "は異なる2つの正の解をもつ", "zh": "有两个不同正根"},
      "one root in": {"fr": "une racine en", "es": "una raíz en", "ja": "の根の1つは", "zh": "的一个根"},
      "is negative": {"fr": "est négative", "es": "es negativa", "ja": "負", "zh": "为负"},
      "works": {"fr": "convient", "es": "funciona", "ja": "は条件を満たす", "zh": "满足"},
      "needs": {"fr": "exige", "es": "requiere", "ja": "には次が必要：", "zh": "需要"},
      "t < 0": {"fr": "t < 0", "es": "t < 0", "ja": "t < 0", "zh": "t < 0"},
      "t = x²": {"fr": "t = x²", "es": "t = x²", "ja": "t = x²", "zh": "t = x²"},
      "t₁, t₂ > 0": {"fr": "t₁, t₂ > 0", "es": "t₁, t₂ > 0", "ja": "t₁, t₂ > 0", "zh": "t₁, t₂ > 0"}
    },
    options: [
      { tex: "c>0\\ \\text{and}\\ b<-2\\sqrt c", correct: true, why: {
        en: "$b^2>4c,\\ -b>0,\\ c>0$",
        fr: "$b^2>4c,\\ -b>0,\\ c>0$",
        es: "$b^2>4c,\\ -b>0,\\ c>0$",
        ja: "$b^2>4c,\\ -b>0,\\ c>0$",
        zh: "$b^2>4c,\\ -b>0,\\ c>0$"
      } },
      { tex: "y^2+by+c=0\\ \\text{has two distinct positive roots}", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "b^2>4c", correct: false, why: {
        en: "Necessary but not enough: $b=1,c=0$ fails.",
        fr: "Nécessaire mais insuffisant : $b=1,c=0$ échoue.",
        es: "Necesario pero no suficiente: $b=1,c=0$ falla.",
        ja: "必要だが十分でない：$b=1,c=0$ は不可。",
        zh: "必要但不充分：$b=1,c=0$ 不行。"
      } },
      { tex: "b^2<4c", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c>0\\ \\text{and}\\ b>2\\sqrt c", correct: false, why: {
        en: "Then both roots in $y$ are negative.",
        fr: "Alors les deux racines en $y$ sont négatives.",
        es: "Entonces ambas raíces en $y$ son negativas.",
        ja: "このとき $y$ の2根はともに負。",
        zh: "此时关于 $y$ 的两根都为负。"
      } },
      { tex: "c<0\\ \\text{and}\\ b<0", correct: false, why: {
        en: "$c<0\\Rightarrow\\text{one root in}\\ y\\ \\text{is negative}$",
        fr: "$c<0\\Rightarrow\\text{one root in}\\ y\\ \\text{is negative}$",
        es: "$c<0\\Rightarrow\\text{one root in}\\ y\\ \\text{is negative}$",
        ja: "$c<0\\Rightarrow\\text{one root in}\\ y\\ \\text{is negative}$",
        zh: "$c<0\\Rightarrow\\text{one root in}\\ y\\ \\text{is negative}$"
      } },
      { tex: "c<0\\ \\text{and}\\ b>0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "b=-2,\\ c=1\\ \\text{works}", correct: false, why: {
        en: "$(x^2-1)^2=0$",
        fr: "$(x^2-1)^2=0$",
        es: "$(x^2-1)^2=0$",
        ja: "$(x^2-1)^2=0$",
        zh: "$(x^2-1)^2=0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute y = x²",
          fr: "Poser y = x²",
          es: "Sustituir y = x²",
          ja: "y = x² と置く",
          zh: "令 y = x²"
        },
        lines: ["y^2+by+c=0\\ \\text{needs}\\ y_1\\ne y_2,\\ y_1,y_2>0"],
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
          en: "Translate",
          fr: "Traduire",
          es: "Traducir",
          ja: "言い換え",
          zh: "转化"
        },
        lines: ["b^2>4c,\\ y_1+y_2=-b>0,\\ y_1y_2=c>0\\iff c>0,\\ b<-2\\sqrt c"],
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
