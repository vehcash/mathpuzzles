/* geometry · A median cutting an altitude
   AMC 12B 2025 (Mathematical Association of America), Problem 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-amc-2025-median-cuts-altitude",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 10",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 10",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 10",
        ja: "AMC 12B 2025（アメリカ数学協会）第10問",
        zh: "AMC 12B 2025（美国数学协会）第 10 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A median cutting an altitude",
      fr: "Une médiane qui coupe une hauteur",
      es: "Una mediana que corta una altura",
      ja: "中線が垂線を分ける",
      zh: "中线截高"
    },
    statement: {
      en: "In a $30$-$60$-$90$ triangle, $AB$ is the shortest side and the right angle is at $B$; $C$ is the $30^\\circ$ vertex. $BD$ is the altitude to $AC$ and $E$ is the midpoint of $AB$. The median $CE$ meets $BD$ at $F$, with $x=DF$ and $y=FB$. <b>Which of the following equal $\\dfrac{x}{x+y}$?</b>",
      fr: "Dans un triangle $30$-$60$-$90$, $AB$ est le plus petit côté et l’angle droit est en $B$ ; $C$ est le sommet de $30^\\circ$. $BD$ est la hauteur sur $AC$ et $E$ le milieu de $AB$. La médiane $CE$ coupe $BD$ en $F$, avec $x=DF$ et $y=FB$. <b>Lesquelles des valeurs suivantes sont égales à $\\dfrac{x}{x+y}$ ?</b>",
      es: "En un triángulo $30$-$60$-$90$, $AB$ es el lado menor y el ángulo recto está en $B$; $C$ es el vértice de $30^\\circ$. $BD$ es la altura sobre $AC$ y $E$ el punto medio de $AB$. La mediana $CE$ corta a $BD$ en $F$, con $x=DF$ e $y=FB$. <b>¿Cuáles de los siguientes valores son iguales a $\\dfrac{x}{x+y}$?</b>",
      ja: "$30$-$60$-$90$ の三角形で $AB$ は最短辺、$B$ が直角、$C$ が $30^\\circ$ の頂点。$BD$ は $AC$ への垂線、$E$ は $AB$ の中点。中線 $CE$ と $BD$ の交点を $F$ とし、$x=DF$、$y=FB$。<b>$\\dfrac{x}{x+y}$ に等しいものはどれですか？</b>",
      zh: "在 $30$-$60$-$90$ 三角形中，$AB$ 为最短边，直角在 $B$，$C$ 为 $30^\\circ$ 顶点。$BD$ 为 $AC$ 上的高，$E$ 为 $AB$ 中点。中线 $CE$ 交 $BD$ 于 $F$，$x=DF$，$y=FB$。<b>下列哪些等于 $\\dfrac{x}{x+y}$？</b>"
    },
    figureText: {
      en: "The right triangle with the altitude from B and the median from C crossing at F.",
      fr: "Le triangle rectangle, la hauteur issue de B et la médiane issue de C se coupant en F.",
      es: "El triángulo rectángulo con la altura desde B y la mediana desde C cortándose en F.",
      ja: "B からの垂線と C からの中線が F で交わる直角三角形。",
      zh: "直角三角形中过 B 的高与过 C 的中线交于 F。"
    },
    hint: {
      en: "Take $AB=2$, $BC=2\\sqrt3$, $AC=4$, so $AD=1$, $DC=3$. Put $B$ at the origin and use coordinates.",
      fr: "Prenez $AB=2$, $BC=2\\sqrt3$, $AC=4$, donc $AD=1$, $DC=3$. Placez $B$ à l’origine et utilisez des coordonnées.",
      es: "Toma $AB=2$, $BC=2\\sqrt3$, $AC=4$, así $AD=1$, $DC=3$. Pon $B$ en el origen y usa coordenadas.",
      ja: "$AB=2$、$BC=2\\sqrt3$、$AC=4$ とすると $AD=1$、$DC=3$。$B$ を原点に座標で。",
      zh: "取 $AB=2$，$BC=2\\sqrt3$，$AC=4$，则 $AD=1$，$DC=3$；以 $B$ 为原点用坐标。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 2.8, scale: 64, pad: 16 });
      const s = 1.15, B = [0.3, 0.3], A = [0.3, 0.3 + 2 * s], C = [0.3 + 2 * Math.sqrt(3) * s, 0.3];
      const D = [A[0] + (C[0] - A[0]) / 4, A[1] + (C[1] - A[1]) / 4], E = [0.3, 0.3 + s];
      F.path([A, B, C], 'seg', 'base', true); F.seg(B, D, 'graph'); F.seg(C, E, 'seg thin');
      [[A, 'A', -10, -4], [B, 'B', -10, 12], [C, 'C', 10, 10], [D, 'D', 6, -10], [E, 'E', -12, 0]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.reveal = () => {
      const Fp = [B[0] + 4 / 7 * (D[0] - B[0]), B[1] + 4 / 7 * (D[1] - B[1])]; F.dot(Fp); F.text(Fp, 'F', 'pt', 4, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "on": {"fr": "sur", "es": "en", "ja": "上", "zh": "在"}
    },
    options: [
      { tex: "\\tfrac37", correct: true, why: {
        en: "$x:y=3:4$",
        fr: "$x:y=3:4$",
        es: "$x:y=3:4$",
        ja: "$x:y=3:4$",
        zh: "$x:y=3:4$"
      } },
      { tex: "1-\\tfrac47", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{\\sqrt3}4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac49", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac5{11}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{4\\sqrt3}{15}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac47", correct: false, why: {
        en: "That is $\\tfrac{y}{x+y}$.",
        fr: "C’est $\\tfrac{y}{x+y}$.",
        es: "Es $\\tfrac{y}{x+y}$.",
        ja: "それは $\\tfrac{y}{x+y}$。",
        zh: "那是 $\\tfrac{y}{x+y}$。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "$F$ is not the midpoint of $BD$.",
        fr: "$F$ n’est pas le milieu de $BD$.",
        es: "$F$ no es el punto medio de $BD$.",
        ja: "$F$ は $BD$ の中点ではない。",
        zh: "$F$ 不是 $BD$ 中点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Coordinates",
          fr: "Coordonnées",
          es: "Coordenadas",
          ja: "座標",
          zh: "坐标"
        },
        lines: ["B(0,0),\\ A(0,2),\\ C(2\\sqrt3,0),\\ E(0,1),\\ D=\\tfrac34A+\\tfrac14C=\\left(\\tfrac{\\sqrt3}2,\\tfrac32\\right)"],
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
          en: "Intersect",
          fr: "Intersection",
          es: "Intersección",
          ja: "交点",
          zh: "求交点"
        },
        lines: ["F=tD\\ \\text{on}\\ CE:\\ \\tfrac{\\sqrt3}2t\\cdot\\tfrac1{2\\sqrt3}+\\tfrac32t=1\\Rightarrow t=\\tfrac47,\\ \\tfrac{x}{x+y}=\\tfrac37"],
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
