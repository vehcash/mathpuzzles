/* complex · A quadrilateral made of 0, z, z², z³
   AMC 12B 2024 (Mathematical Association of America), Problem 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-amc-2024-quadrilateral-of-powers",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 12",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 12",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 12",
        ja: "AMC 12B 2024（アメリカ数学協会）第12問",
        zh: "AMC 12B 2024（美国数学协会）第 12 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "A quadrilateral made of 0, z, z², z³",
      fr: "Un quadrilatère formé de 0, z, z², z³",
      es: "Un cuadrilátero formado por 0, z, z², z³",
      ja: "0, z, z², z³ でできる四角形",
      zh: "由 0、z、z²、z³ 构成的四边形"
    },
    statement: {
      en: "$|z|=2$, $\\operatorname{Im}z>0$, $\\operatorname{Re}z>1$, and the quadrilateral with vertices $0,z,z^2,z^3$ has area $15$. <b>Which of the following equal $\\operatorname{Im}z$?</b>",
      fr: "$|z|=2$, $\\operatorname{Im}z>0$, $\\operatorname{Re}z>1$, et le quadrilatère de sommets $0,z,z^2,z^3$ a pour aire $15$. <b>Lesquelles des valeurs suivantes sont égales à $\\operatorname{Im}z$ ?</b>",
      es: "$|z|=2$, $\\operatorname{Im}z>0$, $\\operatorname{Re}z>1$, y el cuadrilátero de vértices $0,z,z^2,z^3$ tiene área $15$. <b>¿Cuáles de los siguientes valores son iguales a $\\operatorname{Im}z$?</b>",
      ja: "$|z|=2$、$\\operatorname{Im}z>0$、$\\operatorname{Re}z>1$ で、頂点 $0,z,z^2,z^3$ の四角形の面積は $15$。<b>$\\operatorname{Im}z$ に等しいものはどれですか？</b>",
      zh: "$|z|=2$，$\\operatorname{Im}z>0$，$\\operatorname{Re}z>1$，以 $0,z,z^2,z^3$ 为顶点的四边形面积为 $15$。<b>下列哪些等于 $\\operatorname{Im}z$？</b>"
    },
    figureText: {
      en: "Rays from the origin to z, z², z³ with lengths 2, 4, 8, each turned by the same angle.",
      fr: "Des segments de l’origine vers z, z², z³ de longueurs 2, 4, 8, tournés du même angle.",
      es: "Segmentos desde el origen a z, z², z³ de longitudes 2, 4, 8, girados el mismo ángulo.",
      ja: "原点から z, z², z³ への長さ 2, 4, 8 の線分。同じ角度ずつ回る。",
      zh: "从原点到 z、z²、z³ 的线段长 2、4、8，每次转同一角度。"
    },
    hint: {
      en: "Split into triangles $0,z,z^2$ and $0,z^2,z^3$. Each has angle $\\theta=\\arg z$ at the origin.",
      fr: "Découpez en triangles $0,z,z^2$ et $0,z^2,z^3$. Chacun a l’angle $\\theta=\\arg z$ en l’origine.",
      es: "Divide en triángulos $0,z,z^2$ y $0,z^2,z^3$. Cada uno tiene ángulo $\\theta=\\arg z$ en el origen.",
      ja: "三角形 $0,z,z^2$ と $0,z^2,z^3$ に分ける。原点の角はどちらも $\\theta=\\arg z$。",
      zh: "分成三角形 $0,z,z^2$ 与 $0,z^2,z^3$，原点处角都是 $\\theta=\\arg z$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 5.2, scale: 40, pad: 16 });
      const T = F.T = axes(F, -4.0, 1.0, -0.5, 4.7);
      const th = Math.asin(0.75), P = k => T([0.5 * (2 ** k) * Math.cos(k * th), 0.5 * (2 ** k) * Math.sin(k * th)]);
      F.path([T([0, 0]), P(1), P(2), P(3)], 'graph', 'base', true);
      [[1, 'z', 12, -4], [2, 'z²', 12, -4], [3, 'z³', -14, -10]].forEach(([k, t, dx, dy]) => { F.dot(P(k)); F.text(P(k), t, 'pt', dx, dy); });
      F.reveal = () => {
      F.seg(T([0, 0]), P(2), 'hl pink'); F.text(T([-1.4, 1.2]), '4 sin θ + 16 sin θ', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "z": {"fr": "z", "es": "z", "ja": "z", "zh": "z"},
      "z²": {"fr": "z²", "es": "z²", "ja": "z²", "zh": "z²"},
      "z³": {"fr": "z³", "es": "z³", "ja": "z³", "zh": "z³"},
      "4 sin θ + 16 sin θ": {"fr": "4 sin θ + 16 sin θ", "es": "4 sin θ + 16 sin θ", "ja": "4 sin θ + 16 sin θ", "zh": "4 sin θ + 16 sin θ"},
      "with": {"fr": "avec", "es": "con", "ja": "ただし", "zh": "其中"}
    },
    options: [
      { tex: "\\tfrac32", correct: true, why: {
        en: "$20\\sin\\theta=15\\Rightarrow\\sin\\theta=\\tfrac34,\\ \\operatorname{Im}z=2\\cdot\\tfrac34$",
        fr: "$20\\sin\\theta=15\\Rightarrow\\sin\\theta=\\tfrac34,\\ \\operatorname{Im}z=2\\cdot\\tfrac34$",
        es: "$20\\sin\\theta=15\\Rightarrow\\sin\\theta=\\tfrac34,\\ \\operatorname{Im}z=2\\cdot\\tfrac34$",
        ja: "$20\\sin\\theta=15\\Rightarrow\\sin\\theta=\\tfrac34,\\ \\operatorname{Im}z=2\\cdot\\tfrac34$",
        zh: "$20\\sin\\theta=15\\Rightarrow\\sin\\theta=\\tfrac34,\\ \\operatorname{Im}z=2\\cdot\\tfrac34$"
      } },
      { tex: "2\\sin\\theta\\ \\text{with}\\ \\sin\\theta=\\tfrac34", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "That is $\\sin\\theta$; multiply by $|z|=2$.",
        fr: "C’est $\\sin\\theta$ ; multipliez par $|z|=2$.",
        es: "Es $\\sin\\theta$; multiplica por $|z|=2$.",
        ja: "それは $\\sin\\theta$。$|z|=2$ を掛ける。",
        zh: "那是 $\\sin\\theta$，还要乘 $|z|=2$。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac53", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{15}{8}", correct: false, why: {
        en: "That uses only the larger triangle.",
        fr: "Cela n’utilise que le grand triangle.",
        es: "Usa solo el triángulo mayor.",
        ja: "大きい三角形だけを使っている。",
        zh: "只用了大三角形。"
      } },
      { tex: "\\tfrac{\\sqrt7}2", correct: false, why: {
        en: "That is $\\operatorname{Re}z=2\\cos\\theta$, the real part.",
        fr: "C’est $\\operatorname{Re}z=2\\cos\\theta$, la partie réelle.",
        es: "Es $\\operatorname{Re}z=2\\cos\\theta$, la parte real.",
        ja: "実部 $\\operatorname{Re}z=2\\cos\\theta$。",
        zh: "那是实部 $\\operatorname{Re}z=2\\cos\\theta$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two triangles",
          fr: "Deux triangles",
          es: "Dos triángulos",
          ja: "2つの三角形",
          zh: "两个三角形"
        },
        lines: ["\\tfrac12\\cdot2\\cdot4\\sin\\theta+\\tfrac12\\cdot4\\cdot8\\sin\\theta=20\\sin\\theta=15"],
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
          en: "Imaginary part",
          fr: "Partie imaginaire",
          es: "Parte imaginaria",
          ja: "虚部",
          zh: "虚部"
        },
        lines: ["\\operatorname{Im}z=2\\sin\\theta=\\tfrac32,\\quad\\operatorname{Re}z=2\\cos\\theta=\\tfrac{\\sqrt7}2>1"],
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
