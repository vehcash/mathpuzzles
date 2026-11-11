/* trigonometry · Sine of a sum from two tangents
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2024-sin-of-sum",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 13",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 13",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 13",
        ja: "2024年 中国・高考 新課程標準II卷 第13問",
        zh: "2024年高考数学新课标II卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Sine of a sum from two tangents",
      fr: "Sinus d’une somme à partir de deux tangentes",
      es: "Seno de una suma a partir de dos tangentes",
      ja: "2つのタンジェントから和の正弦",
      zh: "由两正切求和角正弦"
    },
    statement: {
      en: "$\\alpha$ is in the first quadrant and $\\beta$ in the third, with $\\tan\\alpha+\\tan\\beta=4$ and $\\tan\\alpha\\tan\\beta=\\sqrt2+1$. <b>Which of the following equal $\\sin(\\alpha+\\beta)$?</b>",
      fr: "$\\alpha$ est dans le premier quadrant et $\\beta$ dans le troisième, avec $\\tan\\alpha+\\tan\\beta=4$ et $\\tan\\alpha\\tan\\beta=\\sqrt2+1$. <b>Lesquelles des valeurs suivantes sont égales à $\\sin(\\alpha+\\beta)$ ?</b>",
      es: "$\\alpha$ está en el primer cuadrante y $\\beta$ en el tercero, con $\\tan\\alpha+\\tan\\beta=4$ y $\\tan\\alpha\\tan\\beta=\\sqrt2+1$. <b>¿Cuáles de los siguientes valores son iguales a $\\sin(\\alpha+\\beta)$?</b>",
      ja: "$\\alpha$ は第1象限、$\\beta$ は第3象限の角で、$\\tan\\alpha+\\tan\\beta=4$、$\\tan\\alpha\\tan\\beta=\\sqrt2+1$ です。<b>$\\sin(\\alpha+\\beta)$ に等しいものはどれですか？</b>",
      zh: "已知 $\\alpha$ 为第一象限角，$\\beta$ 为第三象限角，$\\tan\\alpha+\\tan\\beta=4$，$\\tan\\alpha\\tan\\beta=\\sqrt2+1$。<b>下列哪些等于 $\\sin(\\alpha+\\beta)$？</b>"
    },
    figureText: {
      en: "A unit circle with the terminal sides of α in the first quadrant and β in the third.",
      fr: "Un cercle unité avec les côtés terminaux de α dans le premier quadrant et de β dans le troisième.",
      es: "Una circunferencia unidad con los lados terminales de α en el primer cuadrante y de β en el tercero.",
      ja: "第1象限の α と第3象限の β の動径を描いた単位円。",
      zh: "单位圆上第一象限角 α 与第三象限角 β 的终边。"
    },
    hint: {
      en: "First $\\tan(\\alpha+\\beta)$. Then use the quadrants to decide the sign of $\\sin(\\alpha+\\beta)$.",
      fr: "D’abord $\\tan(\\alpha+\\beta)$, puis les quadrants pour le signe de $\\sin(\\alpha+\\beta)$.",
      es: "Primero $\\tan(\\alpha+\\beta)$; luego los cuadrantes para el signo de $\\sin(\\alpha+\\beta)$.",
      ja: "まず $\\tan(\\alpha+\\beta)$。象限から $\\sin(\\alpha+\\beta)$ の符号を決める。",
      zh: "先求 $\\tan(\\alpha+\\beta)$，再由象限定 $\\sin(\\alpha+\\beta)$ 的符号。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 16 });
      const T = F.T = axes(F, -1.4, 1.6, -1.4, 1.6);
      const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([Math.cos(t), Math.sin(t)])); } F.path(C, 'seg thin', 'base', true);
      const r = Math.sqrt(3 - Math.SQRT2), a = Math.atan(2 + r), b = Math.PI + Math.atan(2 - r), U = t => [Math.cos(t), Math.sin(t)];
      F.seg(T([0, 0]), T(U(a)), 'hl yellow'); F.text(T(U(a)), 'α', 'pt', 8, -6);
      F.seg(T([0, 0]), T(U(b)), 'hl blue'); F.text(T(U(b)), 'β', 'pt', -10, 8);
      F.reveal = () => {
      F.seg(T([0, 0]), T(U(a + b)), 'hl pink'); F.seg(T(U(a + b)), T([Math.cos(a + b), 0]), 'seg thin dashc');
      F.text(T(U(a + b)), 'α + β', 'len small', 22, 10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "fourth quadrant": {"fr": "quatrième quadrant", "es": "cuarto cuadrante", "ja": "第4象限", "zh": "第四象限"}
    },
    options: [
      { tex: "-\\tfrac{2\\sqrt2}{3}", correct: true, why: {
        en: "$\\tan(\\alpha+\\beta)=-2\\sqrt2$ and $\\alpha+\\beta$ ends in the fourth quadrant.",
        fr: "$\\tan(\\alpha+\\beta)=-2\\sqrt2$ and $\\alpha+\\beta$ ends in the fourth quadrant.",
        es: "$\\tan(\\alpha+\\beta)=-2\\sqrt2$ and $\\alpha+\\beta$ ends in the fourth quadrant.",
        ja: "$\\tan(\\alpha+\\beta)=-2\\sqrt2$ and $\\alpha+\\beta$ ends in the fourth quadrant.",
        zh: "$\\tan(\\alpha+\\beta)=-2\\sqrt2$ and $\\alpha+\\beta$ ends in the fourth quadrant."
      } },
      { tex: "-\\tfrac{\\sqrt8}{3}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{2\\sqrt2}{3}", correct: false, why: {
        en: "Right size, wrong sign: $\\alpha+\\beta$ is between $\\pi$ and $2\\pi$ (mod $2\\pi$).",
        fr: "Bonne taille, mauvais signe : $\\alpha+\\beta$ est entre $\\pi$ et $2\\pi$ (mod $2\\pi$).",
        es: "Tamaño correcto, signo erróneo: $\\alpha+\\beta$ está entre $\\pi$ y $2\\pi$ (mód. $2\\pi$).",
        ja: "大きさは正しいが符号が逆。$\\alpha+\\beta$ は $\\pi$ と $2\\pi$ の間（$2\\pi$ を法として）。",
        zh: "大小对，符号错：$\\alpha+\\beta$ 在 $\\pi$ 与 $2\\pi$ 之间（模 $2\\pi$）。"
      } },
      { tex: "-\\tfrac13", correct: false, why: {
        en: "That is $\\cos(\\alpha+\\beta)$ with the wrong sign.",
        fr: "C’est $\\cos(\\alpha+\\beta)$ avec le mauvais signe.",
        es: "Es $\\cos(\\alpha+\\beta)$ con el signo cambiado.",
        ja: "符号の違う $\\cos(\\alpha+\\beta)$。",
        zh: "那是符号相反的 $\\cos(\\alpha+\\beta)$。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "That is $\\cos(\\alpha+\\beta)$.",
        fr: "C’est $\\cos(\\alpha+\\beta)$.",
        es: "Es $\\cos(\\alpha+\\beta)$.",
        ja: "それは $\\cos(\\alpha+\\beta)$。",
        zh: "那是 $\\cos(\\alpha+\\beta)$。"
      } },
      { tex: "-2\\sqrt2", correct: false, why: {
        en: "That is $\\tan(\\alpha+\\beta)$.",
        fr: "C’est $\\tan(\\alpha+\\beta)$.",
        es: "Es $\\tan(\\alpha+\\beta)$.",
        ja: "それは $\\tan(\\alpha+\\beta)$。",
        zh: "那是 $\\tan(\\alpha+\\beta)$。"
      } },
      { tex: "-\\tfrac{\\sqrt2}{3}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-\\tfrac{2\\sqrt2}{\\sqrt{10}}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Tangent of the sum",
          fr: "Tangente de la somme",
          es: "Tangente de la suma",
          ja: "和のタンジェント",
          zh: "和角正切"
        },
        lines: ["\\tan(\\alpha+\\beta)=\\frac{4}{1-(\\sqrt2+1)}=-\\frac{4}{\\sqrt2}=-2\\sqrt2"],
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
          en: "Which quadrant?",
          fr: "Quel quadrant ?",
          es: "¿Qué cuadrante?",
          ja: "どの象限？",
          zh: "哪个象限？"
        },
        lines: ["\\alpha+\\beta\\in(\\pi,2\\pi)\\pmod{2\\pi},\\ \\tan<0\\ \\Rightarrow\\ \\text{fourth quadrant}"],
        note: {
          en: "Adding a first-quadrant and a third-quadrant angle lands between $\\pi$ and $2\\pi$.",
          fr: "Un angle du premier quadrant plus un du troisième tombe entre $\\pi$ et $2\\pi$.",
          es: "Un ángulo del primer cuadrante más uno del tercero cae entre $\\pi$ y $2\\pi$.",
          ja: "第1象限＋第3象限の角は $\\pi$ と $2\\pi$ の間。",
          zh: "第一象限角加第三象限角落在 $\\pi$ 与 $2\\pi$ 之间。"
        }
      },
      {
        title: {
          en: "Sine",
          fr: "Sinus",
          es: "Seno",
          ja: "正弦",
          zh: "正弦"
        },
        lines: ["\\sin^2=\\frac{\\tan^2}{1+\\tan^2}=\\frac89,\\qquad\\sin(\\alpha+\\beta)=\\boxed{-\\tfrac{2\\sqrt2}{3}}"],
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
