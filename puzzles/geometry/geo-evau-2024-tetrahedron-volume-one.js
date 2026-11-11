/* geometry · A tetrahedron of volume 1
   EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-evau-2024-tetrahedron-volume-one",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "EvAU 2024 (Madrid, Spain), Matemáticas II, ordinary session, Question B.3",
        fr: "EvAU 2024 (Madrid, Espagne), Matemáticas II, session ordinaire, question B.3",
        es: "EvAU 2024 (Madrid), Matemáticas II, convocatoria ordinaria, pregunta B.3",
        ja: "スペイン EvAU 2024（マドリード）数学 II 通常日程 問 B.3",
        zh: "西班牙 EvAU 2024（马德里）数学 II 常规考试 第 B.3 题"
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
      en: "A tetrahedron has vertices $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ and $P_4(3,a,3)$. Its volume is $1$ and no edge is longer than $10$. <b>Which of the following equal $a$?</b>",
      fr: "Un tétraèdre a pour sommets $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ et $P_4(3,a,3)$. Son volume vaut $1$ et aucune arête ne dépasse $10$. <b>Lesquelles des valeurs suivantes sont égales à $a$ ?</b>",
      es: "Un tetraedro tiene vértices $P_1(1,1,1)$, $P_2(2,1,0)$, $P_3(1,3,2)$ y $P_4(3,a,3)$. Su volumen es $1$ y ninguna arista mide más de $10$. <b>¿Cuáles de los siguientes valores son iguales a $a$?</b>",
      ja: "四面体の頂点は $P_1(1,1,1)$、$P_2(2,1,0)$、$P_3(1,3,2)$、$P_4(3,a,3)$ で、体積は $1$、どの辺も $10$ を超えません。<b>$a$ に等しいものはどれですか？</b>",
      zh: "四面体顶点为 $P_1(1,1,1)$，$P_2(2,1,0)$，$P_3(1,3,2)$，$P_4(3,a,3)$，体积为 $1$，且没有棱长超过 $10$。<b>下列哪些等于 $a$？</b>"
    },
    figureText: {
      en: "The three edge vectors from P₁ as the rows of a 3 × 3 determinant.",
      fr: "Les trois vecteurs arêtes issus de P₁ comme lignes d’un déterminant 3 × 3.",
      es: "Los tres vectores arista desde P₁ como filas de un determinante 3 × 3.",
      ja: "P₁ からの3辺のベクトルを行とする 3 × 3 行列式。",
      zh: "以从 P₁ 出发的三条棱向量为行的 3 × 3 行列式。"
    },
    hint: {
      en: "$V=\\tfrac16\\left|\\det\\bigl(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\bigr)\\right|$. Two values of $a$ give volume $1$; check the edge lengths.",
      fr: "$V=\\tfrac16\\left|\\det\\bigl(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\bigr)\\right|$. Deux valeurs de $a$ donnent $1$ ; vérifiez les arêtes.",
      es: "$V=\\tfrac16\\left|\\det\\bigl(\\overrightarrow{P_1P_2},\\overrightarrow{P_1P_3},\\overrightarrow{P_1P_4}\\bigr)\\right|$. Dos valores de $a$ dan $1$; comprueba las aristas.",
      ja: "$V=\\tfrac16\\left|\\det(\\cdots)\\right|$。体積 $1$ となる $a$ は2つ。辺の長さを確認。",
      zh: "$V=\\tfrac16\\left|\\det(\\cdots)\\right|$。有两个 $a$ 使体积为 $1$，再检查棱长。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 2.6, scale: 62, pad: 16 });
      matrix(F, [0.4, 2.4], [['1', '0', '−1'], ['0', '2', '1'], ['2', 'a − 1', '2']], { cw: 0.9, ch: 0.7, bar: 'vbar' });
      F.reveal = () => {
      F.text([1.75, 0.1], '= 9 − a', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "= 9 − a": {"fr": "= 9 − a", "es": "= 9 − a", "ja": "= 9 − a", "zh": "= 9 − a"}
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$|9-a|=6$ gives $a=3$ or $15$; $a=15$ makes $P_1P_4=\\sqrt{204}>10$.",
        fr: "$|9-a|=6$ donne $a=3$ ou $15$ ; $a=15$ donne $P_1P_4=\\sqrt{204}>10$.",
        es: "$|9-a|=6$ da $a=3$ o $15$; $a=15$ da $P_1P_4=\\sqrt{204}>10$.",
        ja: "$|9-a|=6$ で $a=3,15$。$a=15$ だと $P_1P_4=\\sqrt{204}>10$。",
        zh: "$|9-a|=6$ 得 $a=3$ 或 $15$；$a=15$ 时 $P_1P_4=\\sqrt{204}>10$。"
      } },
      { tex: "9-6", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "15", correct: false, why: {
        en: "Volume $1$, but an edge is about $14.3$ long.",
        fr: "Volume $1$, mais une arête mesure environ $14{,}3$.",
        es: "Volumen $1$, pero una arista mide unos $14{,}3$.",
        ja: "体積は $1$ だが辺が約 $14.3$。",
        zh: "体积为 $1$，但有棱长约 $14.3$。"
      } },
      { tex: "8", correct: false, why: {
        en: "That gives $|9-a|=1$: volume $\\tfrac16$.",
        fr: "Cela donne $|9-a|=1$ : volume $\\tfrac16$.",
        es: "Da $|9-a|=1$: volumen $\\tfrac16$.",
        ja: "$|9-a|=1$ で体積 $\\tfrac16$。",
        zh: "$|9-a|=1$，体积 $\\tfrac16$。"
      } },
      { tex: "9", correct: false, why: {
        en: "Then the four points are coplanar.",
        fr: "Alors les quatre points sont coplanaires.",
        es: "Entonces los cuatro puntos son coplanarios.",
        ja: "4点が同一平面上になる。",
        zh: "四点共面。"
      } },
      { tex: "-3", correct: false, why: {
        en: "$|9+3|=12$: volume $2$.",
        fr: "$|9+3|=12$ : volume $2$.",
        es: "$|9+3|=12$: volumen $2$.",
        ja: "$|9+3|=12$ で体積 $2$。",
        zh: "$|9+3|=12$，体积 $2$。"
      } },
      { tex: "6", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "1", correct: false, why: {
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
          en: "Edge vectors",
          fr: "Vecteurs arêtes",
          es: "Vectores arista",
          ja: "辺ベクトル",
          zh: "棱向量"
        },
        lines: ["\\overrightarrow{P_1P_2}=(1,0,-1),\\ \\overrightarrow{P_1P_3}=(0,2,1),\\ \\overrightarrow{P_1P_4}=(2,a-1,2)"],
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
          en: "Volume",
          fr: "Volume",
          es: "Volumen",
          ja: "体積",
          zh: "体积"
        },
        lines: ["\\det=1\\cdot(4-(a-1))-1\\cdot(0-4)=9-a,\\quad\\tfrac16|9-a|=1\\ \\Rightarrow\\ a\\in\\{3,15\\}"],
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
          en: "Edge condition",
          fr: "Condition sur les arêtes",
          es: "Condición de aristas",
          ja: "辺の条件",
          zh: "棱长条件"
        },
        lines: ["a=15:\\ |P_1P_4|=\\sqrt{4+196+4}>10\\ \\Rightarrow\\ a=\\boxed{3}"],
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
