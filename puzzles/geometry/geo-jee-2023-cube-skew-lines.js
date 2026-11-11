/* geometry · Face diagonals versus space diagonals
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2023-cube-skew-lines",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.5",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.5",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas Q.5",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Face diagonals versus space diagonals",
      fr: "Diagonales des faces contre grandes diagonales",
      es: "Diagonales de cara frente a diagonales del cubo",
      ja: "面の対角線と立体の対角線",
      zh: "面对角线与体对角线"
    },
    statement: {
      en: "$Q$ is the cube with vertices $\\{0,1\\}^3$. $F$ is the set of the 12 lines through the diagonals of its faces, and $S$ the set of the 4 lines through its main diagonals. For lines $\\ell_1,\\ell_2$ let $d(\\ell_1,\\ell_2)$ be the shortest distance between them. <b>Which of the following equal the maximum of $d(\\ell_1,\\ell_2)$ over $\\ell_1\\in F$, $\\ell_2\\in S$?</b>",
      fr: "$Q$ est le cube de sommets $\\{0,1\\}^3$. $F$ est l’ensemble des 12 droites portant les diagonales de ses faces, et $S$ celui des 4 droites portant ses grandes diagonales. Pour deux droites, $d(\\ell_1,\\ell_2)$ désigne leur plus courte distance. <b>Lesquelles des valeurs suivantes sont égales au maximum de $d(\\ell_1,\\ell_2)$ pour $\\ell_1\\in F$, $\\ell_2\\in S$ ?</b>",
      es: "$Q$ es el cubo de vértices $\\{0,1\\}^3$. $F$ es el conjunto de las 12 rectas que contienen las diagonales de sus caras, y $S$ el de las 4 rectas de sus diagonales principales. Para dos rectas, $d(\\ell_1,\\ell_2)$ es la distancia mínima entre ellas. <b>¿Cuáles de los siguientes valores son iguales al máximo de $d(\\ell_1,\\ell_2)$ con $\\ell_1\\in F$, $\\ell_2\\in S$?</b>",
      ja: "$Q$ は頂点が $\\{0,1\\}^3$ の立方体。$F$ は面の対角線を含む12本の直線、$S$ は立体の対角線を含む4本の直線の集合です。直線間の最短距離を $d(\\ell_1,\\ell_2)$ とします。<b>$\\ell_1\\in F$, $\\ell_2\\in S$ にわたる $d(\\ell_1,\\ell_2)$ の最大値に等しいものはどれですか？</b>",
      zh: "$Q$ 是顶点为 $\\{0,1\\}^3$ 的正方体。$F$ 是含各面对角线的 12 条直线，$S$ 是含 4 条体对角线的直线。设 $d(\\ell_1,\\ell_2)$ 为两直线间的最短距离。<b>当 $\\ell_1\\in F$、$\\ell_2\\in S$ 时，$d(\\ell_1,\\ell_2)$ 的最大值等于下列哪些？</b>"
    },
    figureText: {
      en: "The unit cube with the space diagonal from (0,0,0) to (1,1,1) and a face diagonal from (1,0,0) to (0,1,0) on the bottom face; the two lines are skew and perpendicular.",
      fr: "Le cube unité avec la grande diagonale de (0,0,0) à (1,1,1) et une diagonale de face de (1,0,0) à (0,1,0) sur la face du bas ; les deux droites sont non coplanaires et orthogonales.",
      es: "El cubo unidad con la diagonal de (0,0,0) a (1,1,1) y una diagonal de cara de (1,0,0) a (0,1,0) en la cara inferior; las dos rectas se cruzan y son perpendiculares.",
      ja: "単位立方体と、(0,0,0) から (1,1,1) への対角線、底面の (1,0,0) から (0,1,0) への面の対角線。2直線はねじれの位置で直交する。",
      zh: "单位正方体，体对角线从 (0,0,0) 到 (1,1,1)，底面对角线从 (1,0,0) 到 (0,1,0)；两直线异面且垂直。"
    },
    hint: {
      en: "A face diagonal either meets a given space diagonal or misses it. For a skew pair, use $d=\\dfrac{|(\\vec b-\\vec a)\\cdot(\\vec u\\times\\vec v)|}{|\\vec u\\times\\vec v|}$.",
      fr: "Une diagonale de face rencontre ou non une grande diagonale. Pour une paire non coplanaire, utilisez $d=\\dfrac{|(\\vec b-\\vec a)\\cdot(\\vec u\\times\\vec v)|}{|\\vec u\\times\\vec v|}$.",
      es: "Una diagonal de cara corta o no a una diagonal principal. Para un par que se cruza, usa $d=\\dfrac{|(\\vec b-\\vec a)\\cdot(\\vec u\\times\\vec v)|}{|\\vec u\\times\\vec v|}$.",
      ja: "面の対角線は与えられた立体の対角線と交わるか、ねじれの位置にある。ねじれなら $d=\\dfrac{|(\\vec b-\\vec a)\\cdot(\\vec u\\times\\vec v)|}{|\\vec u\\times\\vec v|}$。",
      zh: "面对角线与体对角线要么相交，要么异面。异面时用 $d=\\dfrac{|(\\vec b-\\vec a)\\cdot(\\vec u\\times\\vec v)|}{|\\vec u\\times\\vec v|}$。"
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
      [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]].forEach(([a, b]) => F.seg(P(V[a]), P(V[b]), [2,3].includes(a) && [3,7].includes(b) || a === 3 && b === 0 ? 'seg thin dashc' : 'seg'));
      F.seg(P([0,0,0]), P([1,1,1]), 'hl pink'); F.seg(P([1,0,0]), P([0,1,0]), 'hl yellow');
      F.text(P([0,0,0]), 'O', 'pt', -10, 10); F.text(P([1,1,1]), '(1,1,1)', 'len small', 0, -12);
      return F;
    },
    options: [
      { tex: "\\tfrac{1}{\\sqrt6}", correct: true, why: {
        en: "E.g. $(1,0,0)\\to(0,1,0)$ against $(0,0,0)\\to(1,1,1)$: $\\tfrac{|(1,0,0)\\cdot(1,1,-2)|}{\\sqrt6}=\\tfrac{1}{\\sqrt6}$.",
        fr: "E.g. $(1,0,0)\\to(0,1,0)$ against $(0,0,0)\\to(1,1,1)$: $\\tfrac{|(1,0,0)\\cdot(1,1,-2)|}{\\sqrt6}=\\tfrac{1}{\\sqrt6}$.",
        es: "E.g. $(1,0,0)\\to(0,1,0)$ against $(0,0,0)\\to(1,1,1)$: $\\tfrac{|(1,0,0)\\cdot(1,1,-2)|}{\\sqrt6}=\\tfrac{1}{\\sqrt6}$.",
        ja: "E.g. $(1,0,0)\\to(0,1,0)$ against $(0,0,0)\\to(1,1,1)$: $\\tfrac{|(1,0,0)\\cdot(1,1,-2)|}{\\sqrt6}=\\tfrac{1}{\\sqrt6}$.",
        zh: "E.g. $(1,0,0)\\to(0,1,0)$ against $(0,0,0)\\to(1,1,1)$: $\\tfrac{|(1,0,0)\\cdot(1,1,-2)|}{\\sqrt6}=\\tfrac{1}{\\sqrt6}$."
      } },
      { tex: "\\tfrac{\\sqrt6}{6}", correct: true, why: {
        en: "The same number, rationalised.",
        fr: "Le même nombre, rationalisé.",
        es: "El mismo número, racionalizado.",
        ja: "有理化した同じ数。",
        zh: "有理化后的同一个数。"
      } },
      { tex: "\\tfrac{1}{\\sqrt8}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{1}{\\sqrt3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{1}{\\sqrt{12}}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "That is the minimum: many face diagonals meet a space diagonal at a vertex.",
        fr: "C’est le minimum : beaucoup de diagonales de face rencontrent une grande diagonale en un sommet.",
        es: "Es el mínimo: muchas diagonales de cara cortan a una diagonal en un vértice.",
        ja: "最小値。多くの面の対角線は頂点で交わる。",
        zh: "那是最小值：许多面对角线在顶点处与体对角线相交。"
      } },
      { tex: "\\tfrac{1}{\\sqrt2}", correct: false, why: {
        en: "Half a face diagonal; not a distance between these lines.",
        fr: "La moitié d’une diagonale de face ; pas une distance entre ces droites.",
        es: "Media diagonal de cara; no es una distancia entre estas rectas.",
        ja: "面の対角線の半分で、直線間の距離ではない。",
        zh: "面对角线的一半，不是这些直线间的距离。"
      } },
      { tex: "1", correct: false, why: {
        en: "Two parallel edges are $1$ apart, but no face diagonal is that far from a space diagonal.",
        fr: "Deux arêtes parallèles sont à distance $1$, pas ces droites.",
        es: "Dos aristas paralelas distan $1$, pero estas rectas no.",
        ja: "平行な辺どうしは距離 $1$ だが、この組はそうならない。",
        zh: "平行棱相距 $1$，但这些直线不会这么远。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pick a skew pair",
          fr: "Choisir une paire non coplanaire",
          es: "Elegir un par que se cruza",
          ja: "ねじれの組を選ぶ",
          zh: "取一对异面直线"
        },
        lines: ["\\ell_2:\\ t(1,1,1),\\qquad\\ell_1:\\ (1,0,0)+s(-1,1,0)"],
        note: {
          en: "By symmetry every skew pair looks like this one.",
          fr: "Par symétrie, toute paire non coplanaire ressemble à celle-ci.",
          es: "Por simetría, todo par que se cruza es como este.",
          ja: "対称性からねじれの組はすべてこれと同じ。",
          zh: "由对称性，所有异面对都与此相同。"
        }
      },
      {
        title: {
          en: "Common normal",
          fr: "Normale commune",
          es: "Normal común",
          ja: "共通垂線の向き",
          zh: "公垂线方向"
        },
        lines: ["(1,1,1)\\times(-1,1,0)=(-1,-1,2),\\qquad|(-1,-1,2)|=\\sqrt6"],
        note: {
          en: "Notice the two directions are perpendicular: their dot product is $0$.",
          fr: "Les deux directions sont orthogonales : produit scalaire nul.",
          es: "Las dos direcciones son perpendiculares: producto escalar $0$.",
          ja: "2つの方向は直交（内積 $0$）。",
          zh: "两方向垂直：数量积为 $0$。"
        }
      },
      {
        title: {
          en: "Distance",
          fr: "Distance",
          es: "Distancia",
          ja: "距離",
          zh: "距离"
        },
        lines: ["d=\\frac{|(1,0,0)\\cdot(-1,-1,2)|}{\\sqrt6}=\\boxed{\\tfrac{1}{\\sqrt6}}"],
        note: {
          en: "Pairs that meet give $0$, so this is the maximum.",
          fr: "Les paires sécantes donnent $0$ : c’est donc le maximum.",
          es: "Los pares que se cortan dan $0$: este es el máximo.",
          ja: "交わる組は $0$ なのでこれが最大。",
          zh: "相交的给出 $0$，所以这是最大值。"
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
