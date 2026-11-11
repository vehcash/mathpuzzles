/* geometry · What fits in a 1 m cube?
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-what-fits-in-a-cube",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 12",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 12",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 12",
        ja: "2023年 中国・高考 新課程標準I卷 第12問",
        zh: "2023年高考数学新课标I卷 第12题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "What fits in a 1 m cube?",
      fr: "Qu’est-ce qui tient dans un cube de 1 m ?",
      es: "¿Qué cabe en un cubo de 1 m?",
      ja: "1 m の立方体に入るもの",
      zh: "什么能放进 1 m 的正方体？"
    },
    statement: {
      en: "A cubical box has inner edge $1$ m (ignore the walls). <b>Which of the following objects can be placed entirely inside it?</b>",
      fr: "Une boîte cubique a une arête intérieure de $1$ m (parois négligées). <b>Lesquels des objets suivants peuvent y être placés entièrement ?</b>",
      es: "Una caja cúbica tiene arista interior de $1$ m (sin contar las paredes). <b>¿Cuáles de los siguientes objetos caben enteros dentro?</b>",
      ja: "内側の1辺が $1$ m の立方体の容器があります（厚さは無視）。<b>次のうち容器に完全に入れられるものはどれですか？</b>",
      zh: "棱长为 $1$ m 的正方体容器（壁厚忽略不计）。<b>下列哪些物体能整体放入其中？</b>"
    },
    figureText: {
      en: "The unit cube drawn in perspective.",
      fr: "Le cube unité en perspective.",
      es: "El cubo unidad en perspectiva.",
      ja: "単位立方体の見取り図。",
      zh: "单位正方体的直观图。"
    },
    hint: {
      en: "The longest segment inside is the space diagonal $\\sqrt3$. Four alternate vertices form a regular tetrahedron with edge $\\sqrt2$. The cross-section through the midpoints of six edges is a regular hexagon.",
      fr: "Le plus long segment intérieur est la grande diagonale $\\sqrt3$. Quatre sommets alternés forment un tétraèdre régulier d’arête $\\sqrt2$. La section par les milieux de six arêtes est un hexagone régulier.",
      es: "El segmento más largo dentro es la diagonal $\\sqrt3$. Cuatro vértices alternos forman un tetraedro regular de arista $\\sqrt2$. La sección por los puntos medios de seis aristas es un hexágono regular.",
      ja: "内部の最長の線分は対角線 $\\sqrt3$。1つおきの4頂点は1辺 $\\sqrt2$ の正四面体。6辺の中点を通る断面は正六角形。",
      zh: "内部最长线段是体对角线 $\\sqrt3$。相间的四个顶点构成棱长 $\\sqrt2$ 的正四面体。过六条棱中点的截面是正六边形。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 3.8, scale: 64, pad: 16 });
      const P = ([x, y, z]) => [0.5 + 2.4 * x + 1.0 * y, 0.4 + 2.4 * z + 0.7 * y];
      const V = [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
      [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].forEach(([a, b]) => F.seg(P(V[a]), P(V[b]), (a === 3 || b === 3) ? 'seg thin dashc' : 'seg'));
      F.text([0.5 + 1.2, 0.4], '1 m', 'len small', 0, 14);
      F.reveal = () => {
      const t = [V[0], V[2], V[5], V[7]];
      [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].forEach(([a, b]) => F.seg(P(t[a]), P(t[b]), 'hl pink'));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a regular tetrahedron with all edges 1.4 m": {"fr": "un tétraèdre régulier d’arêtes 1,4 m", "es": "un tetraedro regular de aristas 1,4 m", "ja": "1辺 1.4 m の正四面体", "zh": "棱长均为 1.4 m 的正四面体"},
      "a cylinder of diameter 1.2 m and height 0.01 m": {"fr": "un cylindre de diamètre 1,2 m et de hauteur 0,01 m", "es": "un cilindro de diámetro 1,2 m y altura 0,01 m", "ja": "直径 1.2 m・高さ 0.01 m の円柱", "zh": "底面直径 1.2 m、高 0.01 m 的圆柱"},
      "a cylinder of diameter 0.01 m and height 1.8 m": {"fr": "un cylindre de diamètre 0,01 m et de hauteur 1,8 m", "es": "un cilindro de diámetro 0,01 m y altura 1,8 m", "ja": "直径 0.01 m・高さ 1.8 m の円柱", "zh": "底面直径 0.01 m、高 1.8 m 的圆柱"},
      "a cylinder of diameter 0.01 m and height 1.75 m": {"fr": "un cylindre de diamètre 0,01 m et de hauteur 1,75 m", "es": "un cilindro de diámetro 0,01 m y altura 1,75 m", "ja": "直径 0.01 m・高さ 1.75 m の円柱", "zh": "底面直径 0.01 m、高 1.75 m 的圆柱"},
      "a sphere of diameter 1.01 m": {"fr": "une sphère de diamètre 1,01 m", "es": "una esfera de diámetro 1,01 m", "ja": "直径 1.01 m の球", "zh": "直径 1.01 m 的球"},
      "a regular tetrahedron with all edges 1.5 m": {"fr": "un tétraèdre régulier d’arêtes 1,5 m", "es": "un tetraedro regular de aristas 1,5 m", "ja": "1辺 1.5 m の正四面体", "zh": "棱长均为 1.5 m 的正四面体"},
      "a cylinder of diameter 1.25 m and height 0.01 m": {"fr": "un cylindre de diamètre 1,25 m et de hauteur 0,01 m", "es": "un cilindro de diámetro 1,25 m y altura 0,01 m", "ja": "直径 1.25 m・高さ 0.01 m の円柱", "zh": "底面直径 1.25 m、高 0.01 m 的圆柱"},
      "a square plate 1.45 m wide and 0.01 m thick": {"fr": "une plaque carrée de 1,45 m de côté et 0,01 m d’épaisseur", "es": "una placa cuadrada de 1,45 m de lado y 0,01 m de grosor", "ja": "1辺 1.45 m・厚さ 0.01 m の正方形の板", "zh": "边长 1.45 m、厚 0.01 m 的正方形板"},
      "longest segment": {"fr": "plus long segment", "es": "segmento más largo", "ja": "最長の線分", "zh": "最长线段"},
      "alternate vertices: edge": {"fr": "sommets alternés : arête", "es": "vértices alternos: arista", "ja": "1つおきの頂点：1辺", "zh": "相间顶点：棱长"},
      "face diagonal": {"fr": "diagonale de face", "es": "diagonal de cara", "ja": "面の対角線", "zh": "面对角线"},
      "hexagon side": {"fr": "côté de l’hexagone", "es": "lado del hexágono", "ja": "六角形の1辺", "zh": "六边形边长"},
      "inradius": {"fr": "rayon inscrit", "es": "inradio", "ja": "内接円の半径", "zh": "内切圆半径"},
      "diameter": {"fr": "diamètre", "es": "diámetro", "ja": "直径", "zh": "直径"}
    },
    options: [
      { tex: "\\text{a regular tetrahedron with all edges 1.4 m}", correct: true, why: {
        en: "The tetrahedron on alternate vertices has edge $\\sqrt2\\approx1.414>1.4$.",
        fr: "Le tétraèdre sur des sommets alternés a pour arête $\\sqrt2\\approx1{,}414>1{,}4$.",
        es: "El tetraedro en vértices alternos tiene arista $\\sqrt2\\approx1{,}414>1{,}4$.",
        ja: "1つおきの頂点の正四面体は1辺 $\\sqrt2\\approx1.414>1.4$。",
        zh: "相间顶点构成的正四面体棱长 $\\sqrt2\\approx1.414>1.4$。"
      } },
      { tex: "\\text{a cylinder of diameter 1.2 m and height 0.01 m}", correct: true, why: {
        en: "The hexagonal cross-section has an inscribed circle of diameter $\\tfrac{\\sqrt6}{2}\\approx1.22$.",
        fr: "La section hexagonale a un cercle inscrit de diamètre $\\tfrac{\\sqrt6}{2}\\approx1{,}22$.",
        es: "La sección hexagonal tiene un círculo inscrito de diámetro $\\tfrac{\\sqrt6}{2}\\approx1{,}22$.",
        ja: "六角形断面の内接円の直径は $\\tfrac{\\sqrt6}{2}\\approx1.22$。",
        zh: "正六边形截面的内切圆直径为 $\\tfrac{\\sqrt6}{2}\\approx1.22$。"
      } },
      { tex: "\\text{a cylinder of diameter 0.01 m and height 1.8 m}", correct: false, why: {
        en: "Longer than the space diagonal $\\sqrt3\\approx1.732$.",
        fr: "Plus long que la grande diagonale $\\sqrt3\\approx1{,}732$.",
        es: "Más largo que la diagonal $\\sqrt3\\approx1{,}732$.",
        ja: "対角線 $\\sqrt3\\approx1.732$ より長い。",
        zh: "比体对角线 $\\sqrt3\\approx1.732$ 还长。"
      } },
      { tex: "\\text{a cylinder of diameter 0.01 m and height 1.75 m}", correct: false, why: {
        en: "Still longer than $\\sqrt3\\approx1.732$.",
        fr: "Toujours plus long que $\\sqrt3\\approx1{,}732$.",
        es: "Sigue siendo más largo que $\\sqrt3\\approx1{,}732$.",
        ja: "やはり $\\sqrt3\\approx1.732$ より長い。",
        zh: "仍比 $\\sqrt3\\approx1.732$ 长。"
      } },
      { tex: "\\text{a sphere of diameter 1.01 m}", correct: false, why: {
        en: "A sphere fits only if its diameter is at most $1$.",
        fr: "Une sphère tient seulement si son diamètre est au plus $1$.",
        es: "Una esfera cabe solo si su diámetro es como mucho $1$.",
        ja: "球は直径 $1$ 以下でないと入らない。",
        zh: "球的直径不超过 $1$ 才放得进。"
      } },
      { tex: "\\text{a regular tetrahedron with all edges 1.5 m}", correct: false, why: {
        en: "$\\sqrt2\\approx1.414$ is the largest possible edge.",
        fr: "$\\sqrt2\\approx1{,}414$ est la plus grande arête possible.",
        es: "$\\sqrt2\\approx1{,}414$ es la arista máxima posible.",
        ja: "最大の1辺は $\\sqrt2\\approx1.414$。",
        zh: "最大棱长为 $\\sqrt2\\approx1.414$。"
      } },
      { tex: "\\text{a cylinder of diameter 1.25 m and height 0.01 m}", correct: false, why: {
        en: "Wider than $\\tfrac{\\sqrt6}{2}\\approx1.225$.",
        fr: "Plus large que $\\tfrac{\\sqrt6}{2}\\approx1{,}225$.",
        es: "Más ancho que $\\tfrac{\\sqrt6}{2}\\approx1{,}225$.",
        ja: "$\\tfrac{\\sqrt6}{2}\\approx1.225$ より大きい。",
        zh: "比 $\\tfrac{\\sqrt6}{2}\\approx1.225$ 宽。"
      } },
      { tex: "\\text{a square plate 1.45 m wide and 0.01 m thick}", correct: false, why: {
        en: "Its diagonal $1.45\\sqrt2\\approx2.05$ exceeds the space diagonal.",
        fr: "Sa diagonale $1{,}45\\sqrt2\\approx2{,}05$ dépasse la grande diagonale.",
        es: "Su diagonal $1{,}45\\sqrt2\\approx2{,}05$ supera la diagonal del cubo.",
        ja: "対角線 $1.45\\sqrt2\\approx2.05$ が立体の対角線を超える。",
        zh: "其对角线 $1.45\\sqrt2\\approx2.05$ 超过体对角线。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Long thin objects",
          fr: "Objets longs et fins",
          es: "Objetos largos y finos",
          ja: "細長いもの",
          zh: "细长物体"
        },
        lines: ["\\text{longest segment}=\\sqrt3\\approx1.732<1.75"],
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
          en: "Tetrahedron",
          fr: "Tétraèdre",
          es: "Tetraedro",
          ja: "正四面体",
          zh: "正四面体"
        },
        lines: ["\\text{alternate vertices: edge}=\\text{face diagonal}=\\sqrt2\\approx1.414"],
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
          en: "Flat disc",
          fr: "Disque plat",
          es: "Disco plano",
          ja: "薄い円板",
          zh: "薄圆片"
        },
        lines: ["\\text{hexagon side}\\ \\tfrac{\\sqrt2}2,\\ \\text{inradius}\\ \\tfrac{\\sqrt2}2\\cdot\\tfrac{\\sqrt3}2=\\tfrac{\\sqrt6}4,\\ \\text{diameter}\\ \\tfrac{\\sqrt6}2\\approx1.225"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam a sphere of diameter $0.99$ m was a third object that fits.",
          fr: "Dans l’épreuve, une sphère de diamètre $0{,}99$ m était un troisième objet qui tient.",
          es: "En el examen, una esfera de $0{,}99$ m de diámetro era un tercer objeto que cabe.",
          ja: "原題では直径 $0.99$ m の球も入る選択肢だった。",
          zh: "原题中直径 $0.99$ m 的球也是能放入的选项。"
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
