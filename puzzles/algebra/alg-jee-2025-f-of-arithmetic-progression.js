/* algebra · An exponential function fed an arithmetic progression
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2025-f-of-arithmetic-progression",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.12",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.12",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.12",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.12",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.12"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "An exponential function fed an arithmetic progression",
      fr: "Une exponentielle nourrie d’une suite arithmétique",
      es: "Una exponencial alimentada con una progresión aritmética",
      ja: "等差数列を入れた指数関数",
      zh: "把等差数列代入指数函数"
    },
    statement: {
      en: "$f:\\mathbb R\\to\\mathbb R$ satisfies $f(x)>0$ and $f(x+y)=f(x)f(y)$. The numbers $a_1,\\dots,a_{50}$ form an arithmetic progression with $f(a_{31})=64f(a_{25})$ and $\\displaystyle\\sum_{i=1}^{50}f(a_i)=3\\left(2^{25}+1\\right)$. <b>Which of the following equal $\\displaystyle\\sum_{i=6}^{30}f(a_i)$?</b>",
      fr: "$f:\\mathbb R\\to\\mathbb R$ vérifie $f(x)>0$ et $f(x+y)=f(x)f(y)$. Les nombres $a_1,\\dots,a_{50}$ sont en progression arithmétique, avec $f(a_{31})=64f(a_{25})$ et $\\displaystyle\\sum_{i=1}^{50}f(a_i)=3\\left(2^{25}+1\\right)$. <b>Lesquelles des valeurs suivantes sont égales à $\\displaystyle\\sum_{i=6}^{30}f(a_i)$ ?</b>",
      es: "$f:\\mathbb R\\to\\mathbb R$ cumple $f(x)>0$ y $f(x+y)=f(x)f(y)$. Los números $a_1,\\dots,a_{50}$ están en progresión aritmética, con $f(a_{31})=64f(a_{25})$ y $\\displaystyle\\sum_{i=1}^{50}f(a_i)=3\\left(2^{25}+1\\right)$. <b>¿Cuáles de los siguientes valores son iguales a $\\displaystyle\\sum_{i=6}^{30}f(a_i)$?</b>",
      ja: "$f:\\mathbb R\\to\\mathbb R$ は $f(x)>0$、$f(x+y)=f(x)f(y)$ を満たします。$a_1,\\dots,a_{50}$ は等差数列で、$f(a_{31})=64f(a_{25})$、$\\displaystyle\\sum_{i=1}^{50}f(a_i)=3\\left(2^{25}+1\\right)$ です。<b>$\\displaystyle\\sum_{i=6}^{30}f(a_i)$ に等しいものはどれですか？</b>",
      zh: "$f:\\mathbb R\\to\\mathbb R$ 满足 $f(x)>0$，$f(x+y)=f(x)f(y)$。$a_1,\\dots,a_{50}$ 成等差数列，$f(a_{31})=64f(a_{25})$，$\\displaystyle\\sum_{i=1}^{50}f(a_i)=3\\left(2^{25}+1\\right)$。<b>下列哪些等于 $\\displaystyle\\sum_{i=6}^{30}f(a_i)$？</b>"
    },
    figureText: {
      en: "Fifty bars f(a₁), …, f(a₅₀) growing geometrically, with bars 6 to 30 highlighted.",
      fr: "Cinquante barres f(a₁), …, f(a₅₀) en croissance géométrique, les barres 6 à 30 en surbrillance.",
      es: "Cincuenta barras f(a₁), …, f(a₅₀) que crecen geométricamente, con las barras 6 a 30 resaltadas.",
      ja: "等比的に伸びる50本の棒 f(a₁)…f(a₅₀)。6〜30本目を強調。",
      zh: "五十根按几何增长的条 f(a₁)…f(a₅₀)，第 6 至 30 根高亮。"
    },
    hint: {
      en: "$f(a_{i+1})=f(a_i)f(d)$, so the $f(a_i)$ are geometric. $f(6d)=64$ gives the ratio; factor $2^{50}-1$.",
      fr: "$f(a_{i+1})=f(a_i)f(d)$ : les $f(a_i)$ sont géométriques. $f(6d)=64$ donne la raison ; factorisez $2^{50}-1$.",
      es: "$f(a_{i+1})=f(a_i)f(d)$: los $f(a_i)$ son geométricos. $f(6d)=64$ da la razón; factoriza $2^{50}-1$.",
      ja: "$f(a_{i+1})=f(a_i)f(d)$ なので等比。$f(6d)=64$ で公比、$2^{50}-1$ を因数分解。",
      zh: "$f(a_{i+1})=f(a_i)f(d)$，故成等比；由 $f(6d)=64$ 得公比，并分解 $2^{50}-1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.6, scale: 50, pad: 16 });
      for (let i = 1; i <= 50; i++) { F.rect(0.2 + (i - 1) * 0.112, 0.2, 0.09, Math.max(0.02, 2.2 * Math.pow(2, (i - 50) / 12)), (i >= 6 && i <= 30) ? 'fill-yellow' : 'fill-blue', 'fills'); }
      F.text([0.25, 0.2], '1', 'tick', 0, 14); F.text([5.7, 0.2], '50', 'tick', 0, 14);
      F.reveal = () => {
      F.text([2.2, 1.6], 'ratio 2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "ratio 2": {"fr": "raison 2", "es": "razón 2", "ja": "公比 2", "zh": "公比 2"}
    },
    options: [
      { tex: "96", correct: true, why: {
        en: "$f(a_1)=\\tfrac{3}{2^{25}-1}$; the $25$ terms from $a_6$ sum to $2^5f(a_1)(2^{25}-1)=96$.",
        fr: "$f(a_1)=\\tfrac{3}{2^{25}-1}$ ; les $25$ termes depuis $a_6$ font $2^5f(a_1)(2^{25}-1)=96$.",
        es: "$f(a_1)=\\tfrac{3}{2^{25}-1}$; los $25$ términos desde $a_6$ suman $2^5f(a_1)(2^{25}-1)=96$.",
        ja: "$f(a_1)=\\tfrac{3}{2^{25}-1}$。$a_6$ からの $25$ 項の和は $96$。",
        zh: "$f(a_1)=\\tfrac{3}{2^{25}-1}$，从 $a_6$ 起 $25$ 项和为 $96$。"
      } },
      { tex: "3\\cdot2^5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is the sum from $a_1$ to $a_{25}$.",
        fr: "C’est la somme de $a_1$ à $a_{25}$.",
        es: "Es la suma de $a_1$ a $a_{25}$.",
        ja: "$a_1$ から $a_{25}$ までの和。",
        zh: "那是 $a_1$ 到 $a_{25}$ 的和。"
      } },
      { tex: "48", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "192", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "64", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3\\cdot2^{25}", correct: false, why: {
        en: "That is the sum from $a_{26}$ to $a_{50}$.",
        fr: "C’est la somme de $a_{26}$ à $a_{50}$.",
        es: "Es la suma de $a_{26}$ a $a_{50}$.",
        ja: "$a_{26}$ から $a_{50}$ までの和。",
        zh: "那是 $a_{26}$ 到 $a_{50}$ 的和。"
      } },
      { tex: "\\tfrac{3(2^{25}+1)}{2}", correct: false, why: {
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
          en: "Geometric, ratio 2",
          fr: "Géométrique de raison 2",
          es: "Geométrica de razón 2",
          ja: "公比 2 の等比",
          zh: "公比为 2 的等比"
        },
        lines: ["f(a_{31})=f(a_{25})f(6d)\\ \\Rightarrow\\ f(d)^6=64,\\ f(d)=2"],
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
          en: "First term",
          fr: "Premier terme",
          es: "Primer término",
          ja: "初項",
          zh: "首项"
        },
        lines: ["f(a_1)(2^{50}-1)=3(2^{25}+1)\\ \\Rightarrow\\ f(a_1)=\\frac{3}{2^{25}-1}"],
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
          en: "The middle 25",
          fr: "Les 25 du milieu",
          es: "Los 25 centrales",
          ja: "中の25項",
          zh: "中间 25 项"
        },
        lines: ["\\sum_{6}^{30}=f(a_6)(2^{25}-1)=2^5\\cdot3=\\boxed{96}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam the answer was a number to type in; here it is turned into choices.",
          fr: "Dans l’épreuve la réponse était un nombre à saisir ; il est transformé ici en choix.",
          es: "En el examen la respuesta era un número que escribir; aquí se convierte en opciones.",
          ja: "原題は数値入力式。ここでは選択式にした。",
          zh: "原题为数值填空，此处改为选择题。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
