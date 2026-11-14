/* algebra · x³ + 3x² − 6x + k with roots in geometric progression
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 42 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2024-cubic-roots-in-gp",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 42",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 42",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 42",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第42問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 42 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "x³ + 3x² − 6x + k with roots in geometric progression",
      fr: "x³ + 3x² − 6x + k à racines en progression géométrique",
      es: "x³ + 3x² − 6x + k con raíces en progresión geométrica",
      ja: "解が等比数列をなす x³ + 3x² − 6x + k",
      zh: "根成等比数列的 x³ + 3x² − 6x + k"
    },
    statement: {
      en: "The roots of $p(x)=x^3+3x^2-6x+k$, with $k$ real, form a geometric progression. <b>Which of the following are true?</b>",
      fr: "Les racines de $p(x)=x^3+3x^2-6x+k$, $k$ réel, forment une progression géométrique. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las raíces de $p(x)=x^3+3x^2-6x+k$, con $k$ real, forman una progresión geométrica. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "実数 $k$ に対し $p(x)=x^3+3x^2-6x+k$ の解は等比数列をなします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "实数 $k$ 使 $p(x)=x^3+3x^2-6x+k$ 的根成等比数列。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Three roots written as r/q, r, rq.",
      fr: "Trois racines écrites r/q, r, rq.",
      es: "Tres raíces escritas r/q, r, rq.",
      ja: "3つの解を r/q, r, rq とおく。",
      zh: "三根记为 r/q、r、rq。"
    },
    hint: {
      en: "Write the roots as $\\tfrac rq, r, rq$. The sum of products of pairs is $r\\left(\\tfrac rq+r+rq\\right)$.",
      fr: "Écrivez les racines $\\tfrac rq, r, rq$. La somme des produits deux à deux vaut $r\\left(\\tfrac rq+r+rq\\right)$.",
      es: "Escribe las raíces $\\tfrac rq, r, rq$. La suma de productos de pares es $r\\left(\\tfrac rq+r+rq\\right)$.",
      ja: "解を $\\tfrac rq, r, rq$ とおく。2つずつの積の和は $r\\left(\\tfrac rq+r+rq\\right)$。",
      zh: "设根为 $\\tfrac rq, r, rq$，两两之积的和为 $r\\left(\\tfrac rq+r+rq\\right)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 1.6, scale: 50, pad: 16 });
      ['r/q', 'r', 'rq'].forEach((t, k) => { F.circle([0.9 + k * 1.5, 0.8], 0.45, 'fill-blue'); F.text([0.9 + k * 1.5, 0.8], t, 'pt', 0, 0); });
      F.reveal = () => {
      ['−1', '2', '−4'].forEach((t, k) => F.text([0.9 + k * 1.5, 0.8], t, 'len small', 0, -34));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "r/q": {"fr": "r/q", "es": "r/q", "ja": "r/q", "zh": "r/q"},
      "rq": {"fr": "rq", "es": "rq", "ja": "rq", "zh": "rq"},
      "−1": {"fr": "−1", "es": "−1", "ja": "−1", "zh": "−1"},
      "−4": {"fr": "−4", "es": "−4", "ja": "−4", "zh": "−4"},
      "the roots are": {"fr": "les racines sont", "es": "las raíces son", "ja": "解は", "zh": "根为"},
      "the middle root is": {"fr": "la racine du milieu est", "es": "la raíz central es", "ja": "中央の解は", "zh": "中间的根为"},
      "the common ratio is": {"fr": "la raison est", "es": "la razón es", "ja": "公比は", "zh": "公比为"},
      "product": {"fr": "produit", "es": "producto", "ja": "積", "zh": "积"}
    },
    options: [
      { tex: "k=-8", correct: true, why: {
        en: "$-k=r^3=8$",
        fr: "$-k=r^3=8$",
        es: "$-k=r^3=8$",
        ja: "$-k=r^3=8$",
        zh: "$-k=r^3=8$"
      } },
      { tex: "\\text{the roots are}\\ -1,\\ 2,\\ -4", correct: true, why: {
        en: "$(x+1)(x-2)(x+4)=x^3+3x^2-6x-8$",
        fr: "$(x+1)(x-2)(x+4)=x^3+3x^2-6x-8$",
        es: "$(x+1)(x-2)(x+4)=x^3+3x^2-6x-8$",
        ja: "$(x+1)(x-2)(x+4)=x^3+3x^2-6x-8$",
        zh: "$(x+1)(x-2)(x+4)=x^3+3x^2-6x-8$"
      } },
      { tex: "k=8", correct: false, why: {
        en: "Sign: the product of the roots is $-k$.",
        fr: "Signe : le produit des racines vaut $-k$.",
        es: "Signo: el producto de las raíces es $-k$.",
        ja: "符号：解の積は $-k$。",
        zh: "符号：根之积为 $-k$。"
      } },
      { tex: "k=-16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=-18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=-2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the middle root is}\\ -2", correct: false, why: {
        en: "$r\\cdot(-3)=-6\\Rightarrow r=2$",
        fr: "$r\\cdot(-3)=-6\\Rightarrow r=2$",
        es: "$r\\cdot(-3)=-6\\Rightarrow r=2$",
        ja: "$r\\cdot(-3)=-6\\Rightarrow r=2$",
        zh: "$r\\cdot(-3)=-6\\Rightarrow r=2$"
      } },
      { tex: "\\text{the common ratio is}\\ 2", correct: false, why: {
        en: "$-1,\\,2,\\,-4:\\ q=-2$",
        fr: "$-1,\\,2,\\,-4:\\ q=-2$",
        es: "$-1,\\,2,\\,-4:\\ q=-2$",
        ja: "$-1,\\,2,\\,-4:\\ q=-2$",
        zh: "$-1,\\,2,\\,-4:\\ q=-2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vieta",
          fr: "Viète",
          es: "Vieta",
          ja: "解と係数",
          zh: "韦达"
        },
        lines: ["r\\left(\\tfrac rq+r+rq\\right)=r\\cdot(-3)=-6\\Rightarrow r=2"],
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
          en: "k",
          fr: "k",
          es: "k",
          ja: "k",
          zh: "k"
        },
        lines: ["\\text{product}=r^3=8=-k\\Rightarrow k=-8"],
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
