/* geometry · Two equal lengths and one known
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-vector-b-length-root3",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 13",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 13",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 13",
        ja: "2023年 中国・高考 新課程標準II卷 第13問",
        zh: "2023年高考数学新课标II卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Two equal lengths and one known",
      fr: "Deux longueurs égales et une connue",
      es: "Dos longitudes iguales y una conocida",
      ja: "等しい2つの長さと既知の1つ",
      zh: "两个相等的模与一个已知模"
    },
    statement: {
      en: "Vectors $\\vec a,\\vec b$ satisfy $|\\vec a-\\vec b|=\\sqrt3$ and $|\\vec a+\\vec b|=|2\\vec a-\\vec b|$. <b>Which of the following equal $|\\vec b|$?</b>",
      fr: "Les vecteurs $\\vec a,\\vec b$ vérifient $|\\vec a-\\vec b|=\\sqrt3$ et $|\\vec a+\\vec b|=|2\\vec a-\\vec b|$. <b>Lesquelles des valeurs suivantes sont égales à $|\\vec b|$ ?</b>",
      es: "Los vectores $\\vec a,\\vec b$ cumplen $|\\vec a-\\vec b|=\\sqrt3$ y $|\\vec a+\\vec b|=|2\\vec a-\\vec b|$. <b>¿Cuáles de los siguientes valores son iguales a $|\\vec b|$?</b>",
      ja: "ベクトル $\\vec a,\\vec b$ が $|\\vec a-\\vec b|=\\sqrt3$、$|\\vec a+\\vec b|=|2\\vec a-\\vec b|$ を満たします。<b>$|\\vec b|$ に等しいものはどれですか？</b>",
      zh: "已知向量 $\\vec a,\\vec b$ 满足 $|\\vec a-\\vec b|=\\sqrt3$，$|\\vec a+\\vec b|=|2\\vec a-\\vec b|$。<b>下列哪些等于 $|\\vec b|$？</b>"
    },
    figureText: {
      en: "Vectors a and b from a common point, with a − b joining their tips and labelled √3.",
      fr: "Les vecteurs a et b issus d’un même point, avec a − b joignant leurs extrémités, marqué √3.",
      es: "Los vectores a y b desde un mismo punto, con a − b uniendo sus extremos y marcado √3.",
      ja: "同じ点からのベクトル a, b と、先端を結ぶ a − b（長さ √3）。",
      zh: "从同一点出发的向量 a、b，连接终点的 a − b 标为 √3。"
    },
    hint: {
      en: "Square the equal lengths to get $\\vec a\\cdot\\vec b$ in terms of $|\\vec a|^2$, then expand $|\\vec a-\\vec b|^2$.",
      fr: "Élevez au carré l’égalité des longueurs pour exprimer $\\vec a\\cdot\\vec b$ avec $|\\vec a|^2$, puis développez $|\\vec a-\\vec b|^2$.",
      es: "Eleva al cuadrado la igualdad de longitudes para expresar $\\vec a\\cdot\\vec b$ con $|\\vec a|^2$, luego desarrolla $|\\vec a-\\vec b|^2$.",
      ja: "等しい長さを2乗して $\\vec a\\cdot\\vec b$ を $|\\vec a|^2$ で表し、$|\\vec a-\\vec b|^2$ を展開。",
      zh: "把等长条件平方，用 $|\\vec a|^2$ 表示 $\\vec a\\cdot\\vec b$，再展开 $|\\vec a-\\vec b|^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 2.6, scale: 70, pad: 16 });
      const O = [0.4, 0.4], ang = Math.acos(0.5 / Math.sqrt(3)), A = [O[0] + 1.6, O[1]], B = [O[0] + Math.sqrt(3) * Math.cos(ang) * 0.92, O[1] + Math.sqrt(3) * Math.sin(ang) * 0.92];
      arrow(F, O, A); arrow(F, O, B); F.seg(B, A, 'hl pink');
      F.text(A, 'a', 'pt', 10, 6); F.text(B, 'b', 'pt', -10, -4); F.text([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], '√3', 'len small', 16, -6);
      F.reveal = () => {
      F.text([(O[0] + B[0]) / 2, (O[1] + B[1]) / 2], '√3', 'len small', -16, 0);
      };
      return F;
    },
    options: [
      { tex: "\\sqrt3", correct: true, why: {
        en: "$\\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2$ makes $|\\vec a-\\vec b|^2=|\\vec b|^2$.",
        fr: "$\\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2$ donne $|\\vec a-\\vec b|^2=|\\vec b|^2$.",
        es: "$\\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2$ da $|\\vec a-\\vec b|^2=|\\vec b|^2$.",
        ja: "$\\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2$ より $|\\vec a-\\vec b|^2=|\\vec b|^2$。",
        zh: "由 $\\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2$ 得 $|\\vec a-\\vec b|^2=|\\vec b|^2$。"
      } },
      { tex: "|\\vec a-\\vec b|", correct: true, why: {
        en: "They are equal: triangle $O$, tip of $\\vec a$, tip of $\\vec b$ is isosceles.",
        fr: "Elles sont égales : le triangle formé est isocèle.",
        es: "Son iguales: el triángulo formado es isósceles.",
        ja: "等しい：できる三角形は二等辺。",
        zh: "二者相等：所成三角形为等腰。"
      } },
      { tex: "3", correct: false, why: {
        en: "That is $|\\vec b|^2$.",
        fr: "C’est $|\\vec b|^2$.",
        es: "Es $|\\vec b|^2$.",
        ja: "$|\\vec b|^2$。",
        zh: "那是 $|\\vec b|^2$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{\\sqrt3}{2}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2\\sqrt3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "|\\vec a|", correct: false, why: {
        en: "$|\\vec a|$ is not fixed by the conditions; any length works.",
        fr: "$|\\vec a|$ n’est pas fixé par les conditions.",
        es: "$|\\vec a|$ no queda fijado por las condiciones.",
        ja: "$|\\vec a|$ は条件から決まらない。",
        zh: "$|\\vec a|$ 不由条件确定。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Square the equal lengths",
          fr: "Élever au carré",
          es: "Elevar al cuadrado",
          ja: "2乗する",
          zh: "平方"
        },
        lines: ["|\\vec a|^2+2\\vec a\\cdot\\vec b+|\\vec b|^2=4|\\vec a|^2-4\\vec a\\cdot\\vec b+|\\vec b|^2", "\\Rightarrow\\ \\vec a\\cdot\\vec b=\\tfrac12|\\vec a|^2"],
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
          en: "Use the known length",
          fr: "Utiliser la longueur connue",
          es: "Usar la longitud conocida",
          ja: "既知の長さを使う",
          zh: "利用已知模"
        },
        lines: ["3=|\\vec a-\\vec b|^2=|\\vec a|^2-|\\vec a|^2+|\\vec b|^2=|\\vec b|^2", "|\\vec b|=\\boxed{\\sqrt3}"],
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
          en: "Two options are the same length.",
          fr: "Deux options sont la même longueur.",
          es: "Dos opciones son la misma longitud.",
          ja: "2つの選択肢は同じ長さ。",
          zh: "有两个选项是同一个长度。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
