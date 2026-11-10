/* complex · Completing a square with i
   Multiplying a side vector by i turns it 90° — the quickest way to build a square. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const A = [1, 1], B = [4, 2], C = [3, 5], D = [0, 4];

  PuzzleBank.define({
    id: "cx-square-vertex",
    category: "complex",
    difficulty: 2,
    title: {
      en: "Completing a square with i",
      fr: "Compléter un carré avec i",
      es: "Completar un cuadrado con i",
      ja: "i で正方形を完成させる",
      zh: "用 i 补全正方形"
    },
    statement: {
      en: "$ABCD$ is a square labelled counter-clockwise, with $A = 1 + i$ and $B = 4 + 2i$. <b>What is $C$?</b>",
      fr: "$ABCD$ est un carré nommé dans le sens direct, avec $A = 1 + i$ et $B = 4 + 2i$. <b>Que vaut $C$ ?</b>",
      es: "$ABCD$ es un cuadrado nombrado en sentido antihorario, con $A = 1 + i$ y $B = 4 + 2i$. <b>¿Cuánto vale $C$?</b>",
      ja: "$ABCD$ は反時計回りに名前をつけた正方形で、$A = 1 + i$、$B = 4 + 2i$ です。<b>$C$ は何ですか？</b>",
      zh: "$ABCD$ 是按逆时针顺序标记的正方形，$A = 1 + i$，$B = 4 + 2i$。<b>$C$ 是多少？</b>"
    },
    figureText: {
      en: "The complex plane with A = 1 + i, B = 4 + 2i and the square ABCD drawn counter-clockwise; C = 3 + 5i and D = 4i.",
      fr: "Le plan complexe avec A = 1 + i, B = 4 + 2i et le carré ABCD tracé dans le sens direct ; C = 3 + 5i et D = 4i.",
      es: "El plano complejo con A = 1 + i, B = 4 + 2i y el cuadrado ABCD en sentido antihorario; C = 3 + 5i y D = 4i.",
      ja: "複素平面上の A = 1 + i、B = 4 + 2i と、反時計回りの正方形 ABCD。C = 3 + 5i、D = 4i。",
      zh: "复平面上的 A = 1 + i、B = 4 + 2i 以及逆时针的正方形 ABCD；C = 3 + 5i，D = 4i。"
    },
    hint: {
      en: "$\\overrightarrow{BC}$ is $\\overrightarrow{AB}$ turned $90^\\circ$ counter-clockwise: multiply $B - A$ by $i$.",
      fr: "$\\overrightarrow{BC}$ est $\\overrightarrow{AB}$ tourné de $90^\\circ$ : multipliez $B - A$ par $i$.",
      es: "$\\overrightarrow{BC}$ es $\\overrightarrow{AB}$ girado $90^\\circ$: multiplica $B - A$ por $i$.",
      ja: "$\\overrightarrow{BC}$ は $\\overrightarrow{AB}$ を反時計回りに $90^\\circ$ 回したもの：$B - A$ に $i$ を掛けます。",
      zh: "$\\overrightarrow{BC}$ 是 $\\overrightarrow{AB}$ 逆时针转 $90^\\circ$：把 $B - A$ 乘以 $i$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example coordinates and the perpendicular vector (−y, x)), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple des coordonnées et le vecteur perpendiculaire (−y, x)), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo coordenadas y el vector perpendicular (−y, x)), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば座標と垂直なベクトル (−y, x) を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如用坐标和垂直向量 (−y, x)），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 6.5, scale: 34, pad: 18 });
      const T = F.T = argand(F, -1, 5, -0.5, 6);
      F.path([T(A), T(B), T(C), T(D)], 'tri');
      [A, B, C, D].forEach(p => F.dot(T(p)));
      F.text(T(A), 'A', 'pt', -10, 12); F.text(T(B), 'B', 'pt', 12, 10); F.text(T(C), 'C', 'pt', 10, -10); F.text(T(D), 'D', 'pt', -12, -6);
      return F;
    },
    options: [
      { tex: "C = 3 + 5i", correct: true, why: {
        en: "$B + i(B - A) = 4 + 2i + i(3 + i) = 3 + 5i$.",
        fr: "$B + i(B - A) = 4 + 2i + i(3 + i) = 3 + 5i$.",
        es: "$B + i(B - A) = 4 + 2i + i(3 + i) = 3 + 5i$.",
        ja: "$B + i(B - A) = 4 + 2i + i(3 + i) = 3 + 5i$.",
        zh: "$B + i(B - A) = 4 + 2i + i(3 + i) = 3 + 5i$."
      } },
      { tex: "C = 5 - i", correct: false, why: {
        en: "Turned clockwise ($-i$): that square is labelled the other way.",
        fr: "Rotation dans le sens horaire ($-i$) : ce carré est orienté dans l’autre sens.",
        es: "Giro horario ($-i$): ese cuadrado va en el otro sentido.",
        ja: "時計回り（$-i$）に回しています：向きが逆の正方形です。",
        zh: "顺时针转（$-i$）：那个正方形方向相反。"
      } },
      { tex: "C = 4i", correct: false, why: {
        en: "That is $D = A + i(B - A)$.",
        fr: "C’est $D = A + i(B - A)$.",
        es: "Eso es $D = A + i(B - A)$.",
        ja: "それは $D = A + i(B - A)$ です。",
        zh: "那是 $D = A + i(B - A)$。"
      } },
      { tex: "C = 7 + 3i", correct: false, why: {
        en: "$B + (B - A)$: continues straight on instead of turning.",
        fr: "$B + (B - A)$ : continue tout droit au lieu de tourner.",
        es: "$B + (B - A)$: sigue recto en lugar de girar.",
        ja: "$B + (B - A)$：曲がらずにまっすぐ進んでいます。",
        zh: "$B + (B - A)$：直走而没有转弯。"
      } },
      { tex: "C = -1 + 3i", correct: false, why: {
        en: "That is the side vector $i(B - A)$, not a vertex.",
        fr: "C’est le vecteur côté $i(B - A)$, pas un sommet.",
        es: "Es el vector lado $i(B - A)$, no un vértice.",
        ja: "それは辺のベクトル $i(B - A)$ で、頂点ではありません。",
        zh: "那是边向量 $i(B - A)$，不是顶点。"
      } },
      { tex: "C = -2 + 4i", correct: false, why: {
        en: "$iB$: rotates $B$ about the origin, not about $B$’s neighbour.",
        fr: "$iB$ : tourne $B$ autour de l’origine.",
        es: "$iB$: gira $B$ alrededor del origen.",
        ja: "$iB$：$B$ を原点の周りに回しています。",
        zh: "$iB$：把 $B$ 绕原点旋转了。"
      } },
      { tex: "C = 4 + 5i", correct: false, why: {
        en: "Then $|BC| = 3 \\ne |AB| = \\sqrt{10}$.",
        fr: "Then $|BC| = 3 \\ne |AB| = \\sqrt{10}$.",
        es: "Then $|BC| = 3 \\ne |AB| = \\sqrt{10}$.",
        ja: "Then $|BC| = 3 \\ne |AB| = \\sqrt{10}$.",
        zh: "Then $|BC| = 3 \\ne |AB| = \\sqrt{10}$."
      } },
      { tex: "C = 3 + 4i", correct: false, why: {
        en: "Then $|BC| = \\sqrt5 \\ne \\sqrt{10}$.",
        fr: "Then $|BC| = \\sqrt5 \\ne \\sqrt{10}$.",
        es: "Then $|BC| = \\sqrt5 \\ne \\sqrt{10}$.",
        ja: "Then $|BC| = \\sqrt5 \\ne \\sqrt{10}$.",
        zh: "Then $|BC| = \\sqrt5 \\ne \\sqrt{10}$."
      } }
    ],
    steps: [
      {
        title: {
          en: "The side vector",
          fr: "Le vecteur côté",
          es: "El vector lado",
          ja: "辺のベクトル",
          zh: "边向量"
        },
        lines: ["B - A = 3 + i"],
        note: {
          en: "This is the arrow from $A$ to $B$.",
          fr: "C’est la flèche de $A$ à $B$.",
          es: "Es la flecha de $A$ a $B$.",
          ja: "$A$ から $B$ への矢印です。",
          zh: "这是从 $A$ 到 $B$ 的箭头。"
        },
        fig(F) { F.draw(F.seg(F.T(A), F.T(B), 'hl yellow', 'over'), 600); }
      },
      {
        title: {
          en: "Turn it by 90°",
          fr: "Le tourner de 90°",
          es: "Girarlo 90°",
          ja: "90° 回す",
          zh: "旋转 90°"
        },
        lines: ["i(3 + i) = -1 + 3i", "C = B + i(B - A) = 4 + 2i - 1 + 3i = \\boxed{3 + 5i}", "D = A + i(B - A) = 4i"],
        note: {
          en: "Multiplying by $i$ rotates counter-clockwise by $90^\\circ$ and keeps the length.",
          fr: "Multiplier par $i$ fait tourner de $90^\\circ$ dans le sens direct sans changer la longueur.",
          es: "Multiplicar por $i$ gira $90^\\circ$ en sentido antihorario y conserva la longitud.",
          ja: "$i$ を掛けると長さを保ったまま反時計回りに $90^\\circ$ 回転します。",
          zh: "乘以 $i$ 使向量逆时针旋转 $90^\\circ$，长度不变。"
        },
        fig(F) { F.draw(F.seg(F.T(B), F.T(C), 'hl pink', 'over'), 600); }
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
