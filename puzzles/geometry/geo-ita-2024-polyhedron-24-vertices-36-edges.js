/* geometry · A polyhedron with 24 vertices and 36 edges
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 44 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2024-polyhedron-24-vertices-36-edges",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 44",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 44",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 44",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第44問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 44 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "A polyhedron with 24 vertices and 36 edges",
      fr: "Un polyèdre à 24 sommets et 36 arêtes",
      es: "Un poliedro con 24 vértices y 36 aristas",
      ja: "頂点24・辺36の多面体",
      zh: "24 个顶点、36 条棱的多面体"
    },
    statement: {
      en: "A convex polyhedron has $24$ vertices and $36$ edges; each vertex lies on exactly $3$ faces, and every face has either $m$ or $n$ edges (both kinds occur). <b>Which of the following are true?</b>",
      fr: "Un polyèdre convexe a $24$ sommets et $36$ arêtes ; chaque sommet appartient à exactement $3$ faces, et chaque face a $m$ ou $n$ arêtes (les deux types existent). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un poliedro convexo tiene $24$ vértices y $36$ aristas; cada vértice está en exactamente $3$ caras, y cada cara tiene $m$ o $n$ aristas (aparecen ambos tipos). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "凸多面体の頂点は $24$、辺は $36$。各頂点はちょうど $3$ 面に属し、各面の辺数は $m$ か $n$（両方ある）です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "凸多面体有 $24$ 个顶点、$36$ 条棱，每个顶点恰属于 $3$ 个面，每个面有 $m$ 或 $n$ 条棱（两种都有）。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Euler’s relation V − E + F = 2 written with V = 24 and E = 36.",
      fr: "La relation d’Euler V − E + F = 2 avec V = 24 et E = 36.",
      es: "La relación de Euler V − E + F = 2 con V = 24 y E = 36.",
      ja: "オイラーの式 V − E + F = 2（V = 24, E = 36）。",
      zh: "欧拉公式 V − E + F = 2，V = 24，E = 36。"
    },
    hint: {
      en: "$F=2-V+E$. Count edge-sides: $a\\,m+b\\,n=2E$ with $a+b=F$.",
      fr: "$F=2-V+E$. Comptez les côtés : $a\\,m+b\\,n=2E$ avec $a+b=F$.",
      es: "$F=2-V+E$. Cuenta lados: $a\\,m+b\\,n=2E$ con $a+b=F$.",
      ja: "$F=2-V+E$。辺の数え上げ：$a\\,m+b\\,n=2E$、$a+b=F$。",
      zh: "$F=2-V+E$，数边：$a\\,m+b\\,n=2E$，$a+b=F$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 1.8, scale: 48, pad: 16 });
      F.text([2.6, 1.3], '24 − 36 + F = 2', 'pt', 0, 0);
      F.reveal = () => {
      F.text([2.6, 0.5], 'F = 14:  8 triangles + 6 octagons', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "24 − 36 + F = 2": {"fr": "24 − 36 + F = 2", "es": "24 − 36 + F = 2", "ja": "24 − 36 + F = 2", "zh": "24 − 36 + F = 2"},
      "F = 14:  8 triangles + 6 octagons": {"fr": "F = 14 : 8 triangles + 6 octogones", "es": "F = 14: 8 triángulos + 6 octógonos", "ja": "F = 14：三角形 8 + 八角形 6", "zh": "F = 14：8 个三角形 + 6 个八边形"},
      "the polyhedron has 14 faces": {"fr": "le polyèdre a 14 faces", "es": "el poliedro tiene 14 caras", "ja": "面は14個", "zh": "有 14 个面"},
      "not an integer": {"fr": "non entier", "es": "no entero", "ja": "整数でない", "zh": "不是整数"},
      "the polyhedron has 12 faces": {"fr": "le polyèdre a 12 faces", "es": "el poliedro tiene 12 caras", "ja": "面は12個", "zh": "有 12 个面"},
      "fails here": {"fr": "est fausse ici", "es": "falla aquí", "ja": "はここで成り立たない", "zh": "此处不成立"}
    },
    options: [
      { tex: "m=3,\\ n=8", correct: true, why: {
        en: "$3a+8b=72$, $a+b=14$ gives $a=8$, $b=6$: the truncated cube.",
        fr: "$3a+8b=72$, $a+b=14$ donne $a=8$, $b=6$ : le cube tronqué.",
        es: "$3a+8b=72$, $a+b=14$ da $a=8$, $b=6$: el cubo truncado.",
        ja: "$3a+8b=72$, $a+b=14$ から $a=8$, $b=6$：切頂六面体。",
        zh: "$3a+8b=72$，$a+b=14$ 得 $a=8$，$b=6$：截角立方体。"
      } },
      { tex: "\\text{the polyhedron has 14 faces}", correct: true, why: {
        en: "$F=2-24+36$",
        fr: "$F=2-24+36$",
        es: "$F=2-24+36$",
        ja: "$F=2-24+36$",
        zh: "$F=2-24+36$"
      } },
      { tex: "m=3,\\ n=4", correct: false, why: {
        en: "$3a+4b=72,\\ a+b=14\\Rightarrow b=30>14$",
        fr: "$3a+4b=72,\\ a+b=14\\Rightarrow b=30>14$",
        es: "$3a+4b=72,\\ a+b=14\\Rightarrow b=30>14$",
        ja: "$3a+4b=72,\\ a+b=14\\Rightarrow b=30>14$",
        zh: "$3a+4b=72,\\ a+b=14\\Rightarrow b=30>14$"
      } },
      { tex: "m=3,\\ n=5", correct: false, why: {
        en: "$2b=30\\Rightarrow b=15>14$",
        fr: "$2b=30\\Rightarrow b=15>14$",
        es: "$2b=30\\Rightarrow b=15>14$",
        ja: "$2b=30\\Rightarrow b=15>14$",
        zh: "$2b=30\\Rightarrow b=15>14$"
      } },
      { tex: "m=3,\\ n=7", correct: false, why: {
        en: "$4b=30\\ \\text{not an integer}$",
        fr: "$4b=30\\ \\text{not an integer}$",
        es: "$4b=30\\ \\text{not an integer}$",
        ja: "$4b=30\\ \\text{not an integer}$",
        zh: "$4b=30\\ \\text{not an integer}$"
      } },
      { tex: "m=4,\\ n=5", correct: false, why: {
        en: "$b=16>14$",
        fr: "$b=16>14$",
        es: "$b=16>14$",
        ja: "$b=16>14$",
        zh: "$b=16>14$"
      } },
      { tex: "\\text{the polyhedron has 12 faces}", correct: false, why: {
        en: "$F=14$",
        fr: "$F=14$",
        es: "$F=14$",
        ja: "$F=14$",
        zh: "$F=14$"
      } },
      { tex: "3V=2E\\ \\text{fails here}", correct: false, why: {
        en: "$72=72$",
        fr: "$72=72$",
        es: "$72=72$",
        ja: "$72=72$",
        zh: "$72=72$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Faces",
          fr: "Faces",
          es: "Caras",
          ja: "面の数",
          zh: "面数"
        },
        lines: ["F=2-V+E=14,\\qquad 3V=2E=72\\ \\checkmark"],
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
          en: "Edge count",
          fr: "Compter les côtés",
          es: "Contar lados",
          ja: "辺の数え上げ",
          zh: "数边"
        },
        lines: ["am+bn=72,\\ a+b=14\\Rightarrow (m,n)=(3,8):\\ a=8,\\ b=6"],
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
