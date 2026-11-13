/* geometry · An orthocentre far outside the triangle
   AMC 12A 2025 (Mathematical Association of America), Problem 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-amc-2025-orthocenter-far-below",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 11",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 11",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 11",
        ja: "AMC 12A 2025（アメリカ数学協会）第11問",
        zh: "AMC 12A 2025（美国数学协会）第 11 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "An orthocentre far outside the triangle",
      fr: "Un orthocentre loin hors du triangle",
      es: "Un ortocentro muy fuera del triángulo",
      ja: "三角形の外遠くにある垂心",
      zh: "远在三角形外的垂心"
    },
    statement: {
      en: "<b>Which of the following equal the sum of the coordinates of the orthocentre of the triangle with vertices $A(2,31)$, $B(8,27)$, $C(18,27)$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à la somme des coordonnées de l’orthocentre du triangle de sommets $A(2,31)$, $B(8,27)$, $C(18,27)$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a la suma de las coordenadas del ortocentro del triángulo de vértices $A(2,31)$, $B(8,27)$, $C(18,27)$?</b>",
      ja: "<b>頂点 $A(2,31)$、$B(8,27)$、$C(18,27)$ の三角形の垂心の座標の和に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于以 $A(2,31)$、$B(8,27)$、$C(18,27)$ 为顶点的三角形垂心坐标之和？</b>"
    },
    figureText: {
      en: "The obtuse triangle with base BC horizontal and A up and to the left, drawn to scale with room below.",
      fr: "Le triangle obtus, base BC horizontale, A en haut à gauche.",
      es: "El triángulo obtusángulo con base BC horizontal y A arriba a la izquierda.",
      ja: "BC が水平で A が左上にある鈍角三角形。",
      zh: "底边 BC 水平、A 在左上方的钝角三角形。"
    },
    hint: {
      en: "$BC$ is horizontal, so the altitude from $A$ is the vertical line $x=2$. Intersect it with the altitude from $B$.",
      fr: "$BC$ est horizontal : la hauteur issue de $A$ est la verticale $x=2$. Coupez-la avec la hauteur issue de $B$.",
      es: "$BC$ es horizontal: la altura desde $A$ es la vertical $x=2$. Córtala con la altura desde $B$.",
      ja: "$BC$ は水平なので $A$ からの垂線は $x=2$。$B$ からの垂線と交わらせる。",
      zh: "$BC$ 水平，所以过 $A$ 的高为 $x=2$，与过 $B$ 的高求交点。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.3, scale: 64, pad: 16 });
      const P = ([x, y]) => [0.3 + (x - 2) * 0.16, 0.2 + (y - 3) * 0.105];
      F.path([P([2, 31]), P([8, 27]), P([18, 27])], 'graph', 'base', true);
      [[[2, 31], 'A', -10, -6], [[8, 27], 'B', 0, 14], [[18, 27], 'C', 10, 10]].forEach(([p, t, dx, dy]) => F.text(P(p), t, 'pt', dx, dy));
      F.reveal = () => {
      F.seg(P([2, 31]), P([2, 3]), 'hl pink'); F.seg(P([8, 27]), P([2, 3]), 'hl pink'); F.dot(P([2, 3])); F.text(P([2, 3]), 'H(2, 3)', 'len small', 34, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "H(2, 3)": {"fr": "H(2, 3)", "es": "H(2, 3)", "ja": "H(2, 3)", "zh": "H(2, 3)"},
      "slope": {"fr": "pente", "es": "pendiente", "ja": "傾き", "zh": "斜率"}
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "$H=(2,3)$",
        fr: "$H=(2,3)$",
        es: "$H=(2,3)$",
        ja: "$H=(2,3)$",
        zh: "$H=(2,3)$"
      } },
      { tex: "2+3", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "17", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{113}3", correct: false, why: {
        en: "That is the centroid’s coordinate sum $\\tfrac{28}3+\\tfrac{85}3$.",
        fr: "C’est la somme des coordonnées du centre de gravité.",
        es: "Es la suma de coordenadas del baricentro.",
        ja: "重心の座標の和。",
        zh: "那是重心坐标之和。"
      } },
      { tex: "54", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10+4\\sqrt{17}+2\\sqrt{13}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "33", correct: false, why: {
        en: "$(2,31)$ is $A$ itself; the triangle is not right-angled at $A$.",
        fr: "$(2,31)$ est $A$ ; le triangle n’est pas rectangle en $A$.",
        es: "$(2,31)$ es $A$; el triángulo no es rectángulo en $A$.",
        ja: "$(2,31)$ は $A$。$A$ で直角ではない。",
        zh: "$(2,31)$ 是 $A$，三角形在 $A$ 处不是直角。"
      } },
      { tex: "7", correct: false, why: {
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
          en: "Altitude from A",
          fr: "Hauteur issue de A",
          es: "Altura desde A",
          ja: "A からの垂線",
          zh: "过 A 的高"
        },
        lines: ["BC:\\ y=27\\ \\Rightarrow\\ x=2"],
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
          en: "Altitude from B",
          fr: "Hauteur issue de B",
          es: "Altura desde B",
          ja: "B からの垂線",
          zh: "过 B 的高"
        },
        lines: ["\\vec{AC}=(16,-4)\\Rightarrow\\text{slope}\\ 4:\\ y=27+4(x-8)\\Rightarrow H=(2,3)"],
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
