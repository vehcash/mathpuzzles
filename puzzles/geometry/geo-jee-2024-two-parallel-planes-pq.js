/* geometry · Two planes from a difference of squares
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-two-parallel-planes-pq",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.7",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.7",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.7",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Two planes from a difference of squares",
      fr: "Deux plans issus d’une différence de carrés",
      es: "Dos planos a partir de una diferencia de cuadrados",
      ja: "距離の2乗の差がつくる2平面",
      zh: "距离平方差定义的两个平面"
    },
    statement: {
      en: "$P=(1,2,3)$, $Q=(4,2,7)$. $S=\\{X: |XP|^2-|XQ|^2=50\\}$ and $T=\\{Y: |YQ|^2-|YP|^2=50\\}$. <b>Which of the following are true?</b>",
      fr: "$P=(1,2,3)$, $Q=(4,2,7)$. $S=\\{X: |XP|^2-|XQ|^2=50\\}$ et $T=\\{Y: |YQ|^2-|YP|^2=50\\}$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P=(1,2,3)$, $Q=(4,2,7)$. $S=\\{X: |XP|^2-|XQ|^2=50\\}$ y $T=\\{Y: |YQ|^2-|YP|^2=50\\}$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P=(1,2,3)$、$Q=(4,2,7)$、$S=\\{X: |XP|^2-|XQ|^2=50\\}$、$T=\\{Y: |YQ|^2-|YP|^2=50\\}$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$P=(1,2,3)$，$Q=(4,2,7)$，$S=\\{X: |XP|^2-|XQ|^2=50\\}$，$T=\\{Y: |YQ|^2-|YP|^2=50\\}$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The segment PQ of length 5 on a line; S and T are drawn in the solution.",
      fr: "Le segment PQ de longueur 5 ; S et T sont tracés dans la solution.",
      es: "El segmento PQ de longitud 5; S y T se dibujan en la solución.",
      ja: "長さ 5 の線分 PQ。S と T は解答で描く。",
      zh: "长为 5 的线段 PQ；S、T 在解答中画出。"
    },
    hint: {
      en: "$|XP|^2-|XQ|^2$ is linear in $X$: both sets are planes perpendicular to $PQ$. How far apart are they?",
      fr: "$|XP|^2-|XQ|^2$ est affine en $X$ : les deux ensembles sont des plans perpendiculaires à $PQ$. À quelle distance ?",
      es: "$|XP|^2-|XQ|^2$ es lineal en $X$: ambos conjuntos son planos perpendiculares a $PQ$. ¿A qué distancia?",
      ja: "$|XP|^2-|XQ|^2$ は $X$ の1次式。どちらも $PQ$ に垂直な平面。距離は？",
      zh: "$|XP|^2-|XQ|^2$ 关于 $X$ 是一次的：两者都是垂直于 $PQ$ 的平面。相距多远？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.6, scale: 48, pad: 16 });
      F.seg([0.3, 1.3], [5.7, 1.3], 'seg thin dashc'); F.dot([2.5, 1.3]); F.dot([3.5, 1.3]); F.text([2.5, 1.3], 'P', 'pt', 0, 14); F.text([3.5, 1.3], 'Q', 'pt', 0, 14); F.text([3.0, 1.3], '5', 'len small', 0, -10);
      F.reveal = () => {
      [[0.5, 'T'], [5.5, 'S']].forEach(([x, t]) => { F.seg([x, 0.2], [x, 2.4], 'hl pink'); F.text([x, 2.4], t, 'pt', 12, 4); });
      F.text([3.0, 0.4], '10', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there is a triangle of area 1 with all vertices in": {"fr": "il existe un triangle d’aire 1 dont tous les sommets sont dans", "es": "hay un triángulo de área 1 con todos sus vértices en", "ja": "面積 1 で全頂点が次に属する三角形がある：", "zh": "存在面积为 1、顶点都在下列集合中的三角形："},
      "there is a square of perimeter 48 with two vertices in": {"fr": "il existe un carré de périmètre 48 avec deux sommets dans", "es": "hay un cuadrado de perímetro 48 con dos vértices en", "ja": "周 48 の正方形で2頂点が", "zh": "存在周长为 48 的正方形，两顶点在"},
      "there is a square of perimeter 32 with two vertices in": {"fr": "il existe un carré de périmètre 32 avec deux sommets dans", "es": "hay un cuadrado de perímetro 32 con dos vértices en", "ja": "周 32 の正方形で2頂点が", "zh": "存在周长为 32 的正方形，两顶点在"},
      "there is a rectangle of perimeter 16 with two vertices in": {"fr": "il existe un rectangle de périmètre 16 avec deux sommets dans", "es": "hay un rectángulo de perímetro 16 con dos vértices en", "ja": "周 16 の長方形で2頂点が", "zh": "存在周长为 16 的矩形，两顶点在"},
      "and two in": {"fr": "et deux dans", "es": "y dos en", "ja": "、残り2頂点が", "zh": "，另两顶点在"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "are 5 apart": {"fr": "sont à distance 5", "es": "distan 5", "ja": "の距離は 5", "zh": "相距 5"},
      "is a sphere": {"fr": "est une sphère", "es": "es una esfera", "ja": "は球面", "zh": "是球面"},
      "the side joining the planes has length": {"fr": "le côté qui joint les plans mesure", "es": "el lado que une los planos mide", "ja": "平面をつなぐ辺の長さは", "zh": "连接两平面的边长"}
    },
    options: [
      { tex: "\\text{there is a triangle of area 1 with all vertices in}\\ S", correct: true, why: {
        en: "$S$ is a whole plane.",
        fr: "$S$ est un plan entier.",
        es: "$S$ es un plano entero.",
        ja: "$S$ は平面全体。",
        zh: "$S$ 是整个平面。"
      } },
      { tex: "\\text{there is a square of perimeter 48 with two vertices in}\\ S\\ \\text{and two in}\\ T", correct: true, why: {
        en: "Side $12\\ge10$, the distance between the planes, so a tilted square fits.",
        fr: "Côté $12\\ge10$, la distance entre les plans : un carré incliné convient.",
        es: "Lado $12\\ge10$, la distancia entre los planos: cabe un cuadrado inclinado.",
        ja: "1辺 $12\\ge10$（平面間距離）なので傾いた正方形がとれる。",
        zh: "边长 $12\\ge10$（两平面距离），斜放的正方形可行。"
      } },
      { tex: "\\text{there is a square of perimeter 32 with two vertices in}\\ S\\ \\text{and two in}\\ T", correct: false, why: {
        en: "Side $8<10$: too short to reach from one plane to the other.",
        fr: "Côté $8<10$ : trop court pour joindre les plans.",
        es: "Lado $8<10$: demasiado corto para unir los planos.",
        ja: "1辺 $8<10$ で届かない。",
        zh: "边长 $8<10$，够不着另一平面。"
      } },
      { tex: "S\\ \\text{and}\\ T\\ \\text{are 5 apart}", correct: false, why: {
        en: "$S: 3x+4z=52.5$, $T: 3x+4z=2.5$, distance $\\tfrac{50}{5}=10$.",
        fr: "$S : 3x+4z=52{,}5$, $T : 3x+4z=2{,}5$, distance $10$.",
        es: "$S: 3x+4z=52{,}5$, $T: 3x+4z=2{,}5$, distancia $10$.",
        ja: "$S: 3x+4z=52.5$、$T: 3x+4z=2.5$ で距離 $10$。",
        zh: "$S: 3x+4z=52.5$，$T: 3x+4z=2.5$，距离 $10$。"
      } },
      { tex: "S\\cap T\\ne\\varnothing", correct: false, why: {
        en: "They are parallel and distinct.",
        fr: "Ils sont parallèles et distincts.",
        es: "Son paralelos y distintos.",
        ja: "平行で異なる。",
        zh: "两者平行且不重合。"
      } },
      { tex: "P\\in T", correct: false, why: {
        en: "$|PQ|^2-0=25\\ne50$.",
        fr: "$|PQ|^2-0=25\\ne50$.",
        es: "$|PQ|^2-0=25\\ne50$.",
        ja: "$|PQ|^2-0=25\\ne50$。",
        zh: "$|PQ|^2-0=25\\ne50$。"
      } },
      { tex: "\\text{there is a rectangle of perimeter 16 with two vertices in}\\ S\\ \\text{and two in}\\ T", correct: false, why: {
        en: "One side must be at least $10$, so the perimeter is more than $20$.",
        fr: "Un côté mesure au moins $10$ : périmètre $>20$.",
        es: "Un lado mide al menos $10$: perímetro $>20$.",
        ja: "1辺は $10$ 以上なので周は $20$ より大。",
        zh: "一边至少 $10$，周长大于 $20$。"
      } },
      { tex: "S\\ \\text{is a sphere}", correct: false, why: {
        en: "The $|X|^2$ terms cancel: it is a plane.",
        fr: "Les termes $|X|^2$ s’annulent : c’est un plan.",
        es: "Los términos $|X|^2$ se cancelan: es un plano.",
        ja: "$|X|^2$ の項が消えて平面になる。",
        zh: "$|X|^2$ 项抵消，是平面。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["|XP|^2-|XQ|^2=2X\\cdot(Q-P)+|P|^2-|Q|^2=6x+8z-55"],
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
          en: "Two parallel planes",
          fr: "Deux plans parallèles",
          es: "Dos planos paralelos",
          ja: "平行な2平面",
          zh: "两个平行平面"
        },
        lines: ["S:\\ 6x+8z=105,\\quad T:\\ 6x+8z=5,\\quad d=\\frac{100}{10}=10"],
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
          en: "Squares and rectangles",
          fr: "Carrés et rectangles",
          es: "Cuadrados y rectángulos",
          ja: "正方形と長方形",
          zh: "正方形与矩形"
        },
        lines: ["\\text{the side joining the planes has length}\\ \\ge10"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam all four statements were true, including segments in $T$ and infinitely many rectangles of perimeter $48$.",
          fr: "Dans l’épreuve les quatre affirmations étaient vraies.",
          es: "En el examen las cuatro afirmaciones eran verdaderas.",
          ja: "原題では4つとも正しかった。",
          zh: "原题四个选项全部正确。"
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
