/* complex · Where the line through w and w² meets the real axis
   AMC 12A 2025 (Mathematical Association of America), Problem 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-amc-2025-real-point-on-line",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 9",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 9",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 9",
        ja: "AMC 12A 2025（アメリカ数学協会）第9問",
        zh: "AMC 12A 2025（美国数学协会）第 9 题"
      },
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Where the line through w and w² meets the real axis",
      fr: "Où la droite par w et w² coupe l’axe réel",
      es: "Dónde corta al eje real la recta por w y w²",
      ja: "w と w² を通る直線と実軸の交点",
      zh: "过 w 与 w² 的直线与实轴的交点"
    },
    statement: {
      en: "Let $w=2+i$. <b>Which of the following equal the real number $r$ for which $r$, $w$ and $w^2$ are collinear in the complex plane?</b>",
      fr: "Soit $w=2+i$. <b>Lesquelles des valeurs suivantes sont égales au réel $r$ tel que $r$, $w$ et $w^2$ soient alignés dans le plan complexe ?</b>",
      es: "Sea $w=2+i$. <b>¿Cuáles de los siguientes valores son iguales al número real $r$ tal que $r$, $w$ y $w^2$ están alineados en el plano complejo?</b>",
      ja: "$w=2+i$ とします。<b>複素平面で $r$、$w$、$w^2$ が一直線上にあるような実数 $r$ に等しいものはどれですか？</b>",
      zh: "设 $w=2+i$。<b>下列哪些等于使 $r$、$w$、$w^2$ 在复平面上共线的实数 $r$？</b>"
    },
    figureText: {
      en: "The points w and w² in the complex plane joined by a line that continues to the real axis.",
      fr: "Les points w et w² reliés par une droite prolongée jusqu’à l’axe réel.",
      es: "Los puntos w y w² unidos por una recta que se prolonga hasta el eje real.",
      ja: "w と w² を結び実軸まで延ばした直線。",
      zh: "连接 w 与 w² 并延长到实轴的直线。"
    },
    hint: {
      en: "$w^2=3+4i$. Find the line through $(2,1)$ and $(3,4)$ and set $y=0$.",
      fr: "$w^2=3+4i$. Trouvez la droite par $(2,1)$ et $(3,4)$, puis posez $y=0$.",
      es: "$w^2=3+4i$. Halla la recta por $(2,1)$ y $(3,4)$ y haz $y=0$.",
      ja: "$w^2=3+4i$。$(2,1)$ と $(3,4)$ を通る直線で $y=0$。",
      zh: "$w^2=3+4i$，求过 $(2,1)$、$(3,4)$ 的直线并令 $y=0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.5, h: 5.0, scale: 50, pad: 16 });
      const T = F.T = axes(F, -0.5, 4.0, -0.5, 4.5);
      F.dot(T([2, 1])); F.dot(T([3, 4])); F.text(T([2, 1]), 'w', 'pt', 12, 4); F.text(T([3, 4]), 'w²', 'pt', 14, 4);
      F.seg(T([2, 1]), T([3, 4]), 'graph');
      F.reveal = () => {
      F.seg(T([5 / 3, 0]), T([2, 1]), 'hl pink'); F.dot(T([5 / 3, 0])); F.text(T([5 / 3, 0]), 'r', 'pt', -8, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "w": {"fr": "w", "es": "w", "ja": "w", "zh": "w"},
      "w²": {"fr": "w²", "es": "w²", "ja": "w²", "zh": "w²"},
      "r": {"fr": "r", "es": "r", "ja": "r", "zh": "r"}
    },
    options: [
      { tex: "\\tfrac53", correct: true, why: {
        en: "$y-1=3(x-2),\\ y=0\\Rightarrow x=\\tfrac53$",
        fr: "$y-1=3(x-2),\\ y=0\\Rightarrow x=\\tfrac53$",
        es: "$y-1=3(x-2),\\ y=0\\Rightarrow x=\\tfrac53$",
        ja: "$y-1=3(x-2),\\ y=0\\Rightarrow x=\\tfrac53$",
        zh: "$y-1=3(x-2),\\ y=0\\Rightarrow x=\\tfrac53$"
      } },
      { tex: "2-\\tfrac13", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac75", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac32", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "That is the real part of $w$.",
        fr: "C’est la partie réelle de $w$.",
        es: "Es la parte real de $w$.",
        ja: "$w$ の実部。",
        zh: "那是 $w$ 的实部。"
      } },
      { tex: "\\tfrac73", correct: false, why: {
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
          en: "Square w",
          fr: "Élever w au carré",
          es: "Elevar w al cuadrado",
          ja: "w を2乗",
          zh: "求 w²"
        },
        lines: ["w^2=4+4i+i^2=3+4i"],
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
          en: "Line and intercept",
          fr: "Droite et intersection",
          es: "Recta e intersección",
          ja: "直線と切片",
          zh: "直线与截距"
        },
        lines: ["m=\\frac{4-1}{3-2}=3,\\ y=3x-5,\\ y=0\\Rightarrow r=\\tfrac53"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
