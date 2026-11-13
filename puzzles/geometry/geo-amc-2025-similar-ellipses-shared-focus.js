/* geometry · Two similar ellipses sharing a focus
   AMC 12A 2025 (Mathematical Association of America), Problem 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-amc-2025-similar-ellipses-shared-focus",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2025 (Mathematical Association of America), Problem 14",
        fr: "AMC 12A 2025 (Mathematical Association of America), problème 14",
        es: "AMC 12A 2025 (Mathematical Association of America), problema 14",
        ja: "AMC 12A 2025（アメリカ数学協会）第14問",
        zh: "AMC 12A 2025（美国数学协会）第 14 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "Two similar ellipses sharing a focus",
      fr: "Deux ellipses semblables qui partagent un foyer",
      es: "Dos elipses semejantes con un foco común",
      ja: "焦点を共有する相似な2つの楕円",
      zh: "共用一个焦点的两个相似椭圆"
    },
    statement: {
      en: "Points $F,G,H$ lie on a line in that order. One ellipse has foci $F,G$; a smaller one has foci $G,H$ and is internally tangent to the first. They have the same eccentricity $e$ and their areas are in ratio $2025$. <b>Which of the following equal $e$?</b>",
      fr: "Les points $F,G,H$ sont alignés dans cet ordre. Une ellipse a pour foyers $F,G$ ; une plus petite a pour foyers $G,H$ et lui est tangente intérieurement. Elles ont la même excentricité $e$ et leurs aires sont dans le rapport $2025$. <b>Lesquelles des valeurs suivantes sont égales à $e$ ?</b>",
      es: "Los puntos $F,G,H$ están alineados en ese orden. Una elipse tiene focos $F,G$; otra menor tiene focos $G,H$ y es tangente interior a la primera. Tienen la misma excentricidad $e$ y sus áreas están en razón $2025$. <b>¿Cuáles de los siguientes valores son iguales a $e$?</b>",
      ja: "点 $F,G,H$ がこの順に一直線上にあります。焦点 $F,G$ の楕円と、焦点 $G,H$ の小さい楕円が内接し、離心率 $e$ は等しく、面積比は $2025$ です。<b>$e$ に等しいものはどれですか？</b>",
      zh: "$F,G,H$ 依次共线。一个椭圆焦点为 $F,G$；另一个较小的椭圆焦点为 $G,H$，与前者内切。两者离心率都为 $e$，面积比为 $2025$。<b>下列哪些等于 $e$？</b>"
    },
    figureText: {
      en: "A sketch (not to scale) of a large ellipse with a small ellipse inside touching it at the right end of the shared axis; G is a focus of both.",
      fr: "Esquisse (pas à l’échelle) : une grande ellipse et une petite à l’intérieur, tangente au bout droit de l’axe commun ; G est foyer des deux.",
      es: "Esbozo (no a escala): una elipse grande y una pequeña dentro, tangente en el extremo derecho del eje común; G es foco de ambas.",
      ja: "略図（縮尺不正確）：大きな楕円と内側の小さな楕円。共通軸の右端で接し、G は両方の焦点。",
      zh: "示意图（非按比例）：大椭圆内有一小椭圆，在公共轴右端相切；G 是两者的焦点。"
    },
    hint: {
      en: "Same eccentricity means similar, so the semi-major axes have ratio $\\sqrt{2025}=45$. Write the distance from the big centre to the tangent point two ways.",
      fr: "Même excentricité : ellipses semblables, rapport des demi-grands axes $\\sqrt{2025}=45$. Exprimez de deux façons la distance du grand centre au point de contact.",
      es: "Igual excentricidad: elipses semejantes, razón de semiejes mayores $\\sqrt{2025}=45$. Escribe de dos maneras la distancia del centro grande al punto de tangencia.",
      ja: "離心率が等しいので相似、長半径の比は $\\sqrt{2025}=45$。大きい中心から接点までを2通りに表す。",
      zh: "离心率相同即相似，长半轴之比 $\\sqrt{2025}=45$。用两种方式写大椭圆中心到切点的距离。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.6, scale: 80, pad: 16 });
      const O = 2.5, Y = 1.8, e = 0.6, a1 = 2.2, a2 = a1 * (1 - e) / (1 + e), c1 = e * a1, c2 = e * a2;
      const ell = (cx, a) => { const b = a * Math.sqrt(1 - e * e), p = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; p.push([cx + a * Math.cos(t), Y + b * Math.sin(t)]); } F.path(p, 'graph', 'base', true); };
      ell(O, a1); ell(O + c1 + c2, a2);
      F.seg([0.1, Y], [4.9, Y], 'seg thin dashc');
      [[O - c1, 'F'], [O + c1, 'G'], [O + c1 + 2 * c2, 'H']].forEach(([x, t]) => { F.dot([x, Y]); F.text([x, Y], t, 'pt', 0, 15); });
      F.reveal = () => {
      F.text([O, 0.1], '(1 + e)/(1 − e) = 45', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "F": {"fr": "F", "es": "F", "ja": "F", "zh": "F"},
      "G": {"fr": "G", "es": "G", "ja": "G", "zh": "G"},
      "H": {"fr": "H", "es": "H", "ja": "H", "zh": "H"},
      "(1 + e)/(1 − e) = 45": {"fr": "(1 + e)/(1 − e) = 45", "es": "(1 + e)/(1 − e) = 45", "ja": "(1 + e)/(1 − e) = 45", "zh": "(1 + e)/(1 − e) = 45"}
    },
    options: [
      { tex: "\\tfrac{22}{23}", correct: true, why: {
        en: "$\\dfrac{1+e}{1-e}=45\\Rightarrow46e=44$",
        fr: "$\\dfrac{1+e}{1-e}=45\\Rightarrow46e=44$",
        es: "$\\dfrac{1+e}{1-e}=45\\Rightarrow46e=44$",
        ja: "$\\dfrac{1+e}{1-e}=45\\Rightarrow46e=44$",
        zh: "$\\dfrac{1+e}{1-e}=45\\Rightarrow46e=44$"
      } },
      { tex: "\\tfrac{44}{46}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac35", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{16}{25}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac45", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{44}{45}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{2024}{2026}", correct: false, why: {
        en: "That uses the area ratio as a length ratio; lengths scale by $\\sqrt{2025}$.",
        fr: "Cela prend le rapport d’aires pour un rapport de longueurs ; les longueurs varient comme $\\sqrt{2025}$.",
        es: "Toma la razón de áreas como razón de longitudes; las longitudes van con $\\sqrt{2025}$.",
        ja: "面積比を長さの比としている。長さは $\\sqrt{2025}$ 倍。",
        zh: "把面积比当成长度比，长度比应为 $\\sqrt{2025}$。"
      } },
      { tex: "\\tfrac{21}{23}", correct: false, why: {
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
          en: "Scale factor",
          fr: "Rapport de similitude",
          es: "Razón de semejanza",
          ja: "相似比",
          zh: "相似比"
        },
        lines: ["a_1=45a_2,\\quad c_i=ea_i"],
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
          en: "Tangent point",
          fr: "Point de contact",
          es: "Punto de tangencia",
          ja: "接点",
          zh: "切点"
        },
        lines: ["a_1=c_1+c_2+a_2\\Rightarrow a_1(1-e)=a_2(1+e)\\Rightarrow\\frac{1+e}{1-e}=45\\Rightarrow e=\\tfrac{22}{23}"],
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
