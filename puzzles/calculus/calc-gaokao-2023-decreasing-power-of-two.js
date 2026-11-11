/* calculus · A decreasing power of 2
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2023-decreasing-power-of-two",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 4",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 4",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 4",
        ja: "2023年 中国・高考 新課程標準I卷 第4問",
        zh: "2023年高考数学新课标I卷 第4题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "A decreasing power of 2",
      fr: "Une puissance de 2 décroissante",
      es: "Una potencia de 2 decreciente",
      ja: "減少する2の累乗",
      zh: "递减的 2 的幂"
    },
    statement: {
      en: "$f(x)=2^{x(x-a)}$ is decreasing on $(0,1)$. <b>Which of the following describe the set of all possible $a$?</b>",
      fr: "$f(x)=2^{x(x-a)}$ est décroissante sur $(0,1)$. <b>Lesquels des ensembles suivants décrivent toutes les valeurs possibles de $a$ ?</b>",
      es: "$f(x)=2^{x(x-a)}$ es decreciente en $(0,1)$. <b>¿Cuáles de los siguientes conjuntos describen todos los valores posibles de $a$?</b>",
      ja: "$f(x)=2^{x(x-a)}$ が $(0,1)$ で減少します。<b>$a$ の範囲を表すものはどれですか？</b>",
      zh: "函数 $f(x)=2^{x(x-a)}$ 在区间 $(0,1)$ 上单调递减。<b>下列哪些表示 $a$ 的取值范围？</b>"
    },
    figureText: {
      en: "Axes with the strip 0 < x < 1 shaded, where the exponent x(x − a) has to decrease.",
      fr: "Des axes avec la bande 0 < x < 1 grisée, où l’exposant x(x − a) doit décroître.",
      es: "Ejes con la franja 0 < x < 1 sombreada, donde el exponente x(x − a) debe decrecer.",
      ja: "指数 x(x − a) が減少すべき帯 0 < x < 1 に色付けした座標軸。",
      zh: "坐标轴，涂色带 0 < x < 1，指数 x(x − a) 须在此递减。"
    },
    hint: {
      en: "$2^u$ is increasing in $u$, so the exponent $u=x(x-a)$ must decrease on $(0,1)$. Where is its vertex?",
      fr: "$2^u$ croît avec $u$ : l’exposant $u=x(x-a)$ doit décroître sur $(0,1)$. Où est son sommet ?",
      es: "$2^u$ crece con $u$: el exponente $u=x(x-a)$ debe decrecer en $(0,1)$. ¿Dónde está su vértice?",
      ja: "$2^u$ は増加関数なので $u=x(x-a)$ が $(0,1)$ で減少すればよい。頂点は？",
      zh: "$2^u$ 关于 $u$ 递增，所以 $u=x(x-a)$ 须在 $(0,1)$ 上递减。顶点在哪？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -1.0, 4.0, -1.6, 2.0);
      F.rect(T([0, 0])[0], T([0, -1.5])[1], 1, 3.4, 'fill-yellow', 'fills');
      F.text(T([1, 0]), '1', 'tick', 6, 14);
      F.reveal = () => {
      plot(F, T, x => x * (x - 2), -0.5, 2.9, 'graph', 'base', -1.6, 2.0); F.text(T([2.6, 1.6]), 'a = 2', 'len small', 0, 0);
      plot(F, T, x => x * (x - 3), 0, 3.7, 'hl pink', 'base', -1.6, 2.0); F.text(T([3.6, 1.0]), 'a = 3', 'len small', 0, -8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "must decrease on": {"fr": "doit décroître sur", "es": "debe decrecer en", "ja": "が次で減少：", "zh": "须递减于"}
    },
    options: [
      { tex: "[2,+\\infty)", correct: true, why: {
        en: "The vertex $\\tfrac a2$ must be at or right of $1$.",
        fr: "Le sommet $\\tfrac a2$ doit être en $1$ ou à droite.",
        es: "El vértice $\\tfrac a2$ debe estar en $1$ o a su derecha.",
        ja: "頂点 $\\tfrac a2$ が $1$ 以上。",
        zh: "顶点 $\\tfrac a2$ 须不小于 $1$。"
      } },
      { tex: "\\{a\\mid a\\ge2\\}", correct: true, why: {
        en: "Two options are the same set.",
        fr: "Deux options sont le même ensemble.",
        es: "Dos opciones son el mismo conjunto.",
        ja: "2つの選択肢は同じ集合です。",
        zh: "有两个选项是同一个集合。"
      } },
      { tex: "(-\\infty,-2]", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "[-2,0)", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(0,2]", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "(2,+\\infty)", correct: false, why: {
        en: "$a=2$ works: $x(x-2)$ decreases on $(0,1)$ right up to its vertex at $1$.",
        fr: "$a=2$ convient : $x(x-2)$ décroît sur $(0,1)$ jusqu’au sommet en $1$.",
        es: "$a=2$ sirve: $x(x-2)$ decrece en $(0,1)$ hasta el vértice en $1$.",
        ja: "$a=2$ でよい：$x(x-2)$ は頂点 $1$ まで減少。",
        zh: "$a=2$ 可以：$x(x-2)$ 在 $(0,1)$ 上一直减到顶点 $1$。"
      } },
      { tex: "[1,+\\infty)", correct: false, why: {
        en: "This puts the vertex at $a$ instead of $\\tfrac a2$.",
        fr: "Cela place le sommet en $a$ au lieu de $\\tfrac a2$.",
        es: "Pone el vértice en $a$ en lugar de $\\tfrac a2$.",
        ja: "頂点を $\\tfrac a2$ でなく $a$ としている。",
        zh: "把顶点误作 $a$，应为 $\\tfrac a2$。"
      } },
      { tex: "(-\\infty,2]", correct: false, why: {
        en: "Reversed: small $a$ makes the exponent increase.",
        fr: "Inversé : un petit $a$ fait croître l’exposant.",
        es: "Al revés: con $a$ pequeño el exponente crece.",
        ja: "逆。$a$ が小さいと指数は増加。",
        zh: "反了：$a$ 小时指数递增。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Reduce to the exponent",
          fr: "Se ramener à l’exposant",
          es: "Reducir al exponente",
          ja: "指数に帰着",
          zh: "转化为指数"
        },
        lines: ["2^u\\nearrow\\ \\Rightarrow\\ u(x)=x^2-ax\\ \\text{must decrease on}\\ (0,1)"],
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
          en: "Vertex",
          fr: "Sommet",
          es: "Vértice",
          ja: "頂点",
          zh: "顶点"
        },
        lines: ["x=\\tfrac a2\\ge1\\ \\Rightarrow\\ a\\in\\boxed{[2,+\\infty)}"],
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
          en: "Two options are the same set.",
          fr: "Deux options sont le même ensemble.",
          es: "Dos opciones son el mismo conjunto.",
          ja: "2つの選択肢は同じ集合です。",
          zh: "有两个选项是同一个集合。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
