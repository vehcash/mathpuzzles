/* geometry · The shortest chord through the centre
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2019-chord-through-centre",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1J",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1J",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1J",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1J",
        zh: "牛津大学数学入学考试 MAT 2019 第 1J 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The shortest chord through the centre",
      fr: "La plus courte corde par le centre",
      es: "La cuerda más corta por el centro",
      ja: "中心を通る最短の弦",
      zh: "过中心的最短弦"
    },
    statement: {
      en: "An equilateral triangle has side $1$ and centre $O$. A straight line through $O$ meets the triangle's sides at $P$ and $Q$. <b>Which of the following are true?</b>",
      fr: "Un triangle équilatéral a pour côté $1$ et pour centre $O$. Une droite passant par $O$ coupe les côtés du triangle en $P$ et $Q$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un triángulo equilátero tiene lado $1$ y centro $O$. Una recta que pasa por $O$ corta los lados del triángulo en $P$ y $Q$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "1辺 $1$ の正三角形の中心を $O$ とします。$O$ を通る直線が三角形の辺と $P$、$Q$ で交わります。<b>次のうち正しいものはどれですか？</b>",
      zh: "边长为 $1$ 的正三角形中心为 $O$。过 $O$ 的直线与三角形的边交于 $P$、$Q$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "An equilateral triangle with its centre O, two chords through O: one parallel to the base (the shortest, 2/3) and one through a vertex (a median, √3/2).",
      fr: "Un triangle équilatéral de centre O et deux cordes passant par O : l’une parallèle à la base (la plus courte, 2/3), l’autre par un sommet (une médiane, √3/2).",
      es: "Un triángulo equilátero de centro O y dos cuerdas por O: una paralela a la base (la más corta, 2/3) y otra por un vértice (una mediana, √3/2).",
      ja: "中心 O をもつ正三角形と、O を通る2本の弦：底辺に平行なもの（最短 2/3）と頂点を通るもの（中線 √3/2）。",
      zh: "中心为 O 的正三角形，以及过 O 的两条弦：一条平行于底边（最短，2/3），一条过顶点（中线，√3/2）。"
    },
    hint: {
      en: "Compare the chord parallel to a side with the chord through a vertex.",
      fr: "Comparez la corde parallèle à un côté et la corde passant par un sommet.",
      es: "Compara la cuerda paralela a un lado con la que pasa por un vértice.",
      ja: "辺に平行な弦と頂点を通る弦を比べましょう。",
      zh: "比较平行于一边的弦与过顶点的弦。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.7, scale: 70, pad: 18 });
      const s = 3.6, A = [0.3, 0.2], B = [0.3 + s, 0.2], C = [0.3 + s / 2, 0.2 + s * Math.sqrt(3) / 2], O = [0.3 + s / 2, 0.2 + s * Math.sqrt(3) / 6];
      F.path([A, B, C], 'tri');
      const P = lerp(A, C, 1 / 3), Q = lerp(B, C, 1 / 3); F.seg(P, Q, 'hl yellow');
      F.seg(C, [0.3 + s / 2, 0.2], 'seg thin');
      F.dot(O); F.text(O, 'O', 'pt', 12, 12); F.dot(P); F.dot(Q); F.text(P, 'P', 'pt', -12, 0); F.text(Q, 'Q', 'pt', 12, 0);
      F.text(lerp(P, Q, 0.25), '2/3', 'len small', 0, -12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "of the way down from the top": {"fr": "du chemin depuis le sommet", "es": "del camino desde arriba", "ja": "（頂点から下へ）", "zh": "（从顶点往下）"},
      "is": {"fr": "est à", "es": "está a", "ja": "は", "zh": "位于"},
      "is the same for every line": {"fr": "est la même pour toute droite", "es": "es igual para toda recta", "ja": "はどの直線でも同じ", "zh": "对每条直线都相同"},
      "for every such line": {"fr": "pour toute droite de ce type", "es": "para toda recta así", "ja": "（どの直線でも）", "zh": "（对每条这样的直线）"}
    },
    options: [
      { tex: "\\min PQ=\\tfrac23", correct: true, why: {
        en: "The chord parallel to a side is $\\tfrac23$ of that side.",
        fr: "La corde parallèle à un côté vaut $\\tfrac23$ de ce côté.",
        es: "La cuerda paralela a un lado mide $\\tfrac23$ de ese lado.",
        ja: "辺に平行な弦はその辺の $\\tfrac23$。",
        zh: "平行于一边的弦是该边的 $\\tfrac23$。"
      } },
      { tex: "\\max PQ=\\tfrac{\\sqrt3}{2}", correct: true, why: {
        en: "The longest chord through $O$ is a median, through a vertex.",
        fr: "La plus longue corde par $O$ est une médiane, par un sommet.",
        es: "La cuerda más larga por $O$ es una mediana, por un vértice.",
        ja: "$O$ を通る最長の弦は頂点を通る中線。",
        zh: "过 $O$ 的最长弦是过顶点的中线。"
      } },
      { tex: "\\min PQ=\\tfrac{\\sqrt3}{2}", correct: false, why: {
        en: "That is the longest one.",
        fr: "C’est la plus longue.",
        es: "Es la más larga.",
        ja: "それは最長の弦。",
        zh: "那是最长的。"
      } },
      { tex: "\\min PQ=\\tfrac12", correct: false, why: {
        en: "A chord through the centre is never shorter than $\\tfrac23$.",
        fr: "Une corde par le centre n’est jamais plus courte que $\\tfrac23$.",
        es: "Una cuerda por el centro nunca mide menos de $\\tfrac23$.",
        ja: "中心を通る弦は $\\tfrac23$ より短くならない。",
        zh: "过中心的弦不会短于 $\\tfrac23$。"
      } },
      { tex: "\\min PQ=\\tfrac{\\sqrt3}{3}", correct: false, why: {
        en: "$\\tfrac{\\sqrt3}{3}\\approx0.577<\\tfrac23$: not reachable.",
        fr: "$\\tfrac{\\sqrt3}{3}\\approx0{,}577<\\tfrac23$ : impossible.",
        es: "$\\tfrac{\\sqrt3}{3}\\approx0{,}577<\\tfrac23$: imposible.",
        ja: "$\\tfrac{\\sqrt3}{3}\\approx0.577<\\tfrac23$ で到達できない。",
        zh: "$\\tfrac{\\sqrt3}{3}\\approx0.577<\\tfrac23$，达不到。"
      } },
      { tex: "PQ \\text{ is the same for every line}", correct: false, why: {
        en: "Unlike a circle, it varies from $\\tfrac23$ to $\\tfrac{\\sqrt3}{2}$.",
        fr: "Contrairement au cercle, elle varie de $\\tfrac23$ à $\\tfrac{\\sqrt3}{2}$.",
        es: "A diferencia del círculo, varía de $\\tfrac23$ a $\\tfrac{\\sqrt3}{2}$.",
        ja: "円と違い $\\tfrac23$ から $\\tfrac{\\sqrt3}{2}$ まで変わる。",
        zh: "与圆不同，它在 $\\tfrac23$ 到 $\\tfrac{\\sqrt3}{2}$ 之间变化。"
      } },
      { tex: "\\max PQ=1", correct: false, why: {
        en: "A whole side does not pass through $O$.",
        fr: "Un côté entier ne passe pas par $O$.",
        es: "Un lado entero no pasa por $O$.",
        ja: "辺全体は $O$ を通らない。",
        zh: "整条边不经过 $O$。"
      } },
      { tex: "OP=OQ \\text{ for every such line}", correct: false, why: {
        en: "Only for chords parallel to a side; on a median $OP=2\\,OQ$.",
        fr: "Seulement pour les cordes parallèles à un côté ; sur une médiane $OP=2\\,OQ$.",
        es: "Solo en cuerdas paralelas a un lado; en una mediana $OP=2\\,OQ$.",
        ja: "辺に平行な弦のときだけ。中線では $OP=2\\,OQ$。",
        zh: "只对平行于一边的弦成立；在中线上 $OP=2\\,OQ$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The chord parallel to a side",
          fr: "La corde parallèle à un côté",
          es: "La cuerda paralela a un lado",
          ja: "辺に平行な弦",
          zh: "平行于一边的弦"
        },
        lines: ["O \\text{ is } \\tfrac23 \\text{ of the way down from the top } \\Rightarrow PQ=\\tfrac23\\cdot1=\\tfrac23"],
        note: {
          en: "Similar triangles: the small triangle above the chord has scale $\\tfrac23$.",
          fr: "Triangles semblables : le petit triangle au-dessus de la corde est à l’échelle $\\tfrac23$.",
          es: "Triángulos semejantes: el triángulo pequeño sobre la cuerda tiene razón $\\tfrac23$.",
          ja: "相似：弦の上の小三角形の相似比は $\\tfrac23$。",
          zh: "相似三角形：弦上方的小三角形相似比为 $\\tfrac23$。"
        }
      },
      {
        title: {
          en: "All other directions",
          fr: "Toutes les autres directions",
          es: "Las demás direcciones",
          ja: "その他の向き",
          zh: "其他方向"
        },
        lines: ["\\tfrac23 \\le PQ \\le \\tfrac{\\sqrt3}{2}"],
        note: {
          en: "Turning the line from the parallel position to a vertex makes the chord grow steadily; by symmetry this covers all lines.",
          fr: "En tournant la droite de la position parallèle jusqu’à un sommet, la corde grandit ; par symétrie cela couvre toutes les droites.",
          es: "Al girar la recta de la posición paralela hasta un vértice la cuerda crece; por simetría esto cubre todas.",
          ja: "平行な位置から頂点まで回すと弦は増え続け、対称性ですべての直線を尽くす。",
          zh: "把直线从平行位置转到过顶点，弦长不断增大；由对称性这涵盖所有直线。"
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
          en: "One option is the shortest chord, one the longest.",
          fr: "Une option est la plus courte corde, une la plus longue.",
          es: "Una opción es la cuerda más corta y otra la más larga.",
          ja: "1つは最短、1つは最長の弦。",
          zh: "一个是最短弦，一个是最长弦。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
