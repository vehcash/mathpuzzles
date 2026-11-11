/* geometry · A tetrahedron of volume 1
   EBAU / PAU Madrid 2024 (Spain), ordinary session, Mathematics II, Question B.3 (a) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ebau-2024-tetrahedron",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EBAU / PAU Madrid 2024 (Spain), ordinary session, Mathematics II, Question B.3 (a)",
        fr: "EBAU Madrid 2024 (Espagne), session ordinaire, Mathématiques II, exercice B.3 a)",
        es: "EBAU Madrid 2024, convocatoria ordinaria, Matemáticas II, ejercicio B.3 a)",
        ja: "スペイン大学入試 EBAU マドリード 2024 本試験 数学II 問題 B.3 (a)",
        zh: "西班牙高考 EBAU 马德里 2024 常规场 数学 II 第 B.3 (a) 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "A tetrahedron of volume 1",
      fr: "Un tétraèdre de volume 1",
      es: "Un tetraedro de volumen 1",
      ja: "体積 1 の四面体",
      zh: "体积为 1 的四面体"
    },
    statement: {
      en: "A tetrahedron has vertices $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ and $P_4(3,a,3)$. Its volume is $1$ and none of its edges is longer than $10$. <b>Which of the following are true?</b>",
      fr: "Un tétraèdre a pour sommets $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ et $P_4(3,a,3)$. Son volume vaut $1$ et aucune de ses arêtes ne dépasse $10$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un tetraedro tiene vértices $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ y $P_4(3,a,3)$. Su volumen es $1$ y ninguna arista mide más de $10$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "四面体の頂点は $P_1(1,1,1)$、$P_2(2,1,0)$、$P_3(1,3,2)$、$P_4(3,a,3)$。体積は $1$ で、どの辺も長さ $10$ 以下です。<b>次のうち正しいものはどれですか？</b>",
      zh: "四面体的顶点为 $P_1(1,1,1)$，$P_2(2,1,0)$，$P_3(1,3,2)$，$P_4(3,a,3)$。其体积为 $1$，且没有一条棱长超过 $10$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A tetrahedron P1P2P3P4 drawn in perspective, with the three edge vectors from P1 highlighted: P1P2, P1P3 and P1P4.",
      fr: "Un tétraèdre P1P2P3P4 en perspective, avec les trois vecteurs arêtes issus de P1 mis en évidence : P1P2, P1P3 et P1P4.",
      es: "Un tetraedro P1P2P3P4 en perspectiva, con los tres vectores arista desde P1 resaltados: P1P2, P1P3 y P1P4.",
      ja: "透視図の四面体 P1P2P3P4。P1 から出る3つの辺ベクトル P1P2、P1P3、P1P4 を強調。",
      zh: "立体图中的四面体 P1P2P3P4，突出显示从 P1 出发的三条棱向量 P1P2、P1P3、P1P4。"
    },
    hint: {
      en: "$V=\\tfrac16\\left|\\det\\left(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\right)\\right|$.",
      fr: "$V=\\tfrac16\\left|\\det\\left(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\right)\\right|$.",
      es: "$V=\\tfrac16\\left|\\det\\left(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\right)\\right|$.",
      ja: "$V=\\tfrac16\\left|\\det\\left(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\right)\\right|$。",
      zh: "$V=\\tfrac16\\left|\\det\\left(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\right)\\right|$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.4, scale: 62, pad: 16 });
      const P1 = [0.6, 0.6], P2 = [3.3, 0.3], P3 = [1.6, 1.4], P4 = [2.4, 3.1];
      F.path([P1, P2, P4], 'tri'); F.path([P2, P3, P4], 'tri');
      F.seg(P1, P3, 'seg thin');
      arrow(F, P1, P2, 'vec'); arrow(F, P1, P3, 'vec two'); arrow(F, P1, P4, 'vec');
      F.text(P1, 'P₁', 'pt', -14, 8); F.text(P2, 'P₂', 'pt', 14, 6); F.text(P3, 'P₃', 'pt', 14, -4); F.text(P4, 'P₄', 'pt', 0, -12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "edges": {"fr": "arêtes", "es": "aristas", "ja": "辺", "zh": "棱长"}
    },
    options: [
      { tex: "a=3", correct: true, why: {
        en: "$|9-a|=6$ gives $a=3$ or $a=15$, and $a=15$ breaks the edge condition.",
        fr: "$|9-a|=6$ donne $a=3$ ou $a=15$, et $a=15$ viole la condition sur les arêtes.",
        es: "$|9-a|=6$ da $a=3$ o $a=15$, y $a=15$ incumple la condición de las aristas.",
        ja: "$|9-a|=6$ より $a=3$ か $a=15$。$a=15$ は辺の条件に反する。",
        zh: "$|9-a|=6$ 得 $a=3$ 或 $a=15$，而 $a=15$ 违反棱长条件。"
      } },
      { tex: "P_4=(3,3,3)", correct: true, why: {
        en: "The same answer written as a point.",
        fr: "La même réponse écrite comme un point.",
        es: "La misma respuesta escrita como punto.",
        ja: "同じ答えを点で書いたもの。",
        zh: "同一答案写成点的形式。"
      } },
      { tex: "a=15", correct: false, why: {
        en: "Volume $1$, but $|P_1P_4|=\\sqrt{204}\\approx14.3>10$.",
        fr: "Volume $1$, mais $|P_1P_4|=\\sqrt{204}\\approx14{,}3>10$.",
        es: "Volumen $1$, pero $|P_1P_4|=\\sqrt{204}\\approx14{,}3>10$.",
        ja: "体積は $1$ だが $|P_1P_4|=\\sqrt{204}\\approx14.3>10$。",
        zh: "体积为 $1$，但 $|P_1P_4|=\\sqrt{204}\\approx14.3>10$。"
      } },
      { tex: "a=3 \\text{ or } a=15", correct: false, why: {
        en: "Only the volume condition; the edge condition removes $15$.",
        fr: "Seulement la condition de volume ; celle sur les arêtes élimine $15$.",
        es: "Solo la condición de volumen; la de aristas elimina $15$.",
        ja: "体積の条件だけ。辺の条件で $15$ は除かれる。",
        zh: "只满足体积条件；棱长条件排除 $15$。"
      } },
      { tex: "a=9", correct: false, why: {
        en: "Then the determinant is $0$: the four points are coplanar.",
        fr: "Alors le déterminant est nul : les quatre points sont coplanaires.",
        es: "Entonces el determinante es $0$: los cuatro puntos son coplanarios.",
        ja: "行列式が $0$ になり、4点が同一平面上。",
        zh: "此时行列式为 $0$：四点共面。"
      } },
      { tex: "a=6", correct: false, why: {
        en: "Volume $\\tfrac{|9-6|}{6}=\\tfrac12$.",
        fr: "Volume $\\tfrac{|9-6|}{6}=\\tfrac12$.",
        es: "Volumen $\\tfrac{|9-6|}{6}=\\tfrac12$.",
        ja: "体積 $\\tfrac{|9-6|}{6}=\\tfrac12$。",
        zh: "体积 $\\tfrac{|9-6|}{6}=\\tfrac12$。"
      } },
      { tex: "a=-3", correct: false, why: {
        en: "Volume $\\tfrac{12}{6}=2$.",
        fr: "Volume $\\tfrac{12}{6}=2$.",
        es: "Volumen $\\tfrac{12}{6}=2$.",
        ja: "体積 $\\tfrac{12}{6}=2$。",
        zh: "体积 $\\tfrac{12}{6}=2$。"
      } },
      { tex: "a=1", correct: false, why: {
        en: "Volume $\\tfrac{8}{6}=\\tfrac43$.",
        fr: "Volume $\\tfrac{8}{6}=\\tfrac43$.",
        es: "Volumen $\\tfrac{8}{6}=\\tfrac43$.",
        ja: "体積 $\\tfrac{8}{6}=\\tfrac43$。",
        zh: "体积 $\\tfrac{8}{6}=\\tfrac43$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Volume with a determinant",
          fr: "Volume par un déterminant",
          es: "Volumen con un determinante",
          ja: "行列式で体積",
          zh: "用行列式求体积"
        },
        lines: ["\\overrightarrow{P_1P_2}=(1,0,-1),\\; \\overrightarrow{P_1P_3}=(0,2,1),\\; \\overrightarrow{P_1P_4}=(2,a-1,2)", "\\det=\\begin{vmatrix}1&0&-1\\\\0&2&1\\\\2&a-1&2\\end{vmatrix}=9-a,\\qquad V=\\tfrac{|9-a|}{6}=1"],
        note: {
          en: "So $9-a=\\pm6$: $a=3$ or $a=15$.",
          fr: "Donc $9-a=\\pm6$ : $a=3$ ou $a=15$.",
          es: "Así que $9-a=\\pm6$: $a=3$ o $a=15$.",
          ja: "よって $9-a=\\pm6$：$a=3$ または $a=15$。",
          zh: "所以 $9-a=\\pm6$：$a=3$ 或 $a=15$。"
        }
      },
      {
        title: {
          en: "Check the edges",
          fr: "Vérifier les arêtes",
          es: "Comprobar las aristas",
          ja: "辺を確認",
          zh: "检查棱长"
        },
        lines: ["a=15:\\; |P_1P_4|=\\sqrt{4+196+4}=\\sqrt{204}>10", "a=3:\\; \\text{edges } \\sqrt2,\\ \\sqrt5,\\ \\sqrt{12},\\ 3,\\ \\sqrt{14},\\ \\sqrt5 \\le 10 \\Rightarrow \\boxed{a=3}"],
        note: {
          en: "The edge condition is what makes the answer unique.",
          fr: "C’est la condition sur les arêtes qui rend la réponse unique.",
          es: "Es la condición de las aristas la que hace única la respuesta.",
          ja: "答えを1つに決めるのは辺の条件。",
          zh: "正是棱长条件使答案唯一。"
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
          en: "Two options describe the same tetrahedron.",
          fr: "Deux options décrivent le même tétraèdre.",
          es: "Dos opciones describen el mismo tetraedro.",
          ja: "2つの選択肢は同じ四面体を表す。",
          zh: "有两个选项描述的是同一个四面体。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
