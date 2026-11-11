/* geometry · Counting vertices, edges and faces
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 53 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2020-polyhedra",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2020, Mathematics, Question 53",
        fr: "Concours de l’ITA (Institut technologique d’aéronautique, Brésil) 2020, mathématiques, question 53",
        es: "Examen de ingreso del ITA (Instituto Tecnológico de Aeronáutica, Brasil) 2020, matemáticas, pregunta 53",
        ja: "ITA（ブラジル航空技術大学）2020 入試 数学 第53問",
        zh: "巴西航空技术学院 ITA 2020 入学考试 数学第 53 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "Counting vertices, edges and faces",
      fr: "Compter sommets, arêtes et faces",
      es: "Contar vértices, aristas y caras",
      ja: "頂点・辺・面を数える",
      zh: "数顶点、棱和面"
    },
    statement: {
      en: "For polyhedra with $V$ vertices, $E$ edges and $F$ faces (convex polyhedra satisfy $V-E+F=2$). <b>Which of the following statements are true?</b>",
      fr: "Pour des polyèdres à $V$ sommets, $E$ arêtes et $F$ faces (les polyèdres convexes vérifient $V-E+F=2$). <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para poliedros con $V$ vértices, $E$ aristas y $F$ caras (los poliedros convexos cumplen $V-E+F=2$). <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "頂点 $V$、辺 $E$、面 $F$ の多面体について（凸多面体では $V-E+F=2$）。<b>次のうち正しいものはどれですか？</b>",
      zh: "关于有 $V$ 个顶点、$E$ 条棱、$F$ 个面的多面体（凸多面体满足 $V-E+F=2$）。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "A convex polyhedron (a pentagonal prism has F = 7; the one in question has F = 10 and E = 16). Each face is outlined; the angles of one face are marked.",
      fr: "Un polyèdre convexe (un prisme pentagonal a F = 7 ; celui de la question a F = 10 et E = 16). Chaque face est tracée ; les angles d’une face sont marqués.",
      es: "Un poliedro convexo (un prisma pentagonal tiene F = 7; el del enunciado tiene F = 10 y E = 16). Cada cara está dibujada; los ángulos de una cara están marcados.",
      ja: "凸多面体（五角柱は F = 7。問題のものは F = 10、E = 16）。各面の輪郭を描き、1つの面の角に印を付けています。",
      zh: "一个凸多面体（五棱柱 F = 7；题中的是 F = 10、E = 16）。画出各面，并标出一个面的角。"
    },
    hint: {
      en: "Each edge borders exactly two faces and each face has at least $3$ edges, so $2E\\ge3F$. A face with $k$ sides has angle sum $(k-2)\\cdot180^\\circ$.",
      fr: "Chaque arête borde exactement deux faces et chaque face a au moins $3$ arêtes, donc $2E\\ge3F$. Une face à $k$ côtés a une somme d’angles $(k-2)\\cdot180^\\circ$.",
      es: "Cada arista limita exactamente dos caras y cada cara tiene al menos $3$ aristas, así que $2E\\ge3F$. Una cara de $k$ lados suma $(k-2)\\cdot180^\\circ$.",
      ja: "各辺はちょうど2つの面に接し、各面は3辺以上なので $2E\\ge3F$。$k$ 角形の面の内角の和は $(k-2)\\cdot180^\\circ$。",
      zh: "每条棱恰好与两个面相邻，每个面至少 $3$ 条棱，所以 $2E\\ge3F$。$k$ 边形面的内角和为 $(k-2)\\cdot180^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.4, scale: 60, pad: 14 });
      const P = k => [2.2 + 1.7 * Math.cos(2 * Math.PI * k / 5 - 1.2), 0.9 + 0.55 * Math.sin(2 * Math.PI * k / 5 - 1.2)];
      const top = [0, 1, 2, 3, 4].map(k => [P(k)[0], P(k)[1] + 1.7]), bot = [0, 1, 2, 3, 4].map(P);
      F.path(top, 'tri fill-yellow');
      [0, 1, 2, 3, 4].forEach(k => { const back = bot[k][1] > 1.0; F.seg(bot[k], bot[(k + 1) % 5], back ? 'seg thin' : 'seg'); F.seg(bot[k], top[k], back && bot[k][1] > 1.2 ? 'seg thin' : 'seg'); });
      F.text([1.0, 3.3], 'V − E + F = 2', 'len', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(convex)": {"fr": "(convexe)", "es": "(convexo)", "ja": "（凸）", "zh": "（凸）"},
      "face angles sum to": {"fr": "somme des angles des faces =", "es": "los ángulos de las caras suman", "ja": "面の角の和は", "zh": "面角之和为"},
      "face angles of a convex polyhedron with": {"fr": "angles des faces d’un polyèdre convexe avec", "es": "ángulos de las caras de un poliedro convexo con", "ja": "凸多面体（", "zh": "凸多面体（"},
      "sum to": {"fr": ": somme =", "es": "suman", "ja": "）の面の角の和は", "zh": "）的面角之和为"},
      "every polyhedron with 16 quadrilateral faces has 18 vertices": {"fr": "tout polyèdre à 16 faces quadrilatères a 18 sommets", "es": "todo poliedro con 16 caras cuadriláteras tiene 18 vértices", "ja": "16 枚の四角形の面をもつ多面体は必ず頂点 18", "zh": "任何有 16 个四边形面的多面体都有 18 个顶点"},
      "a polyhedron with": {"fr": "un polyèdre avec", "es": "existe un poliedro con", "ja": "多面体（", "zh": "存在多面体，"},
      "exists": {"fr": "existe", "es": "", "ja": "）が存在する", "zh": ""},
      "is enough for a convex polyhedron to exist": {"fr": "suffit pour qu’un polyèdre convexe existe", "es": "basta para que exista un poliedro convexo", "ja": "だけで凸多面体が存在する", "zh": "就足以保证凸多面体存在"},
      "the face-angle sum depends on the shapes of the faces, not only on": {"fr": "la somme des angles des faces dépend de la forme des faces, pas seulement de", "es": "la suma de los ángulos de las caras depende de la forma de las caras, no solo de", "ja": "面の角の和は面の形によって決まり、次だけでは決まらない：", "zh": "面角之和取决于面的形状，而不仅取决于"},
      "faces": {"fr": "faces", "es": "caras", "ja": "面", "zh": "面"}
    },
    options: [
      { tex: "F=10,\\ E=16 \\text{ (convex)} \\Rightarrow V=8", correct: true, why: {
        en: "$V=2+E-F=2+16-10=8$.",
        fr: "$V=2+E-F=2+16-10=8$.",
        es: "$V=2+E-F=2+16-10=8$.",
        ja: "$V=2+E-F=2+16-10=8$。",
        zh: "$V=2+E-F=2+16-10=8$。"
      } },
      { tex: "F=10,\\ E=16 \\text{ (convex)} \\Rightarrow \\text{face angles sum to } 2160^\\circ", correct: true, why: {
        en: "$\\sum(k_i-2)180^\\circ=(2E-2F)180^\\circ=12\\cdot180^\\circ=2160^\\circ$.",
        fr: "$\\sum(k_i-2)180^\\circ=(2E-2F)180^\\circ=12\\cdot180^\\circ=2160^\\circ$.",
        es: "$\\sum(k_i-2)180^\\circ=(2E-2F)180^\\circ=12\\cdot180^\\circ=2160^\\circ$.",
        ja: "$\\sum(k_i-2)180^\\circ=(2E-2F)180^\\circ=12\\cdot180^\\circ=2160^\\circ$。",
        zh: "$\\sum(k_i-2)180^\\circ=(2E-2F)180^\\circ=12\\cdot180^\\circ=2160^\\circ$。"
      } },
      { tex: "F=10,\\ E=16 \\text{ (convex)} \\Rightarrow V=6", correct: false, why: {
        en: "Euler gives $8$.",
        fr: "Euler donne $8$.",
        es: "Euler da $8$.",
        ja: "オイラーの式では $8$。",
        zh: "欧拉公式给出 $8$。"
      } },
      { tex: "\\text{face angles of a convex polyhedron with } V=8 \\text{ sum to } 1440^\\circ", correct: false, why: {
        en: "The sum is $360^\\circ(V-2)=2160^\\circ$.",
        fr: "La somme vaut $360^\\circ(V-2)=2160^\\circ$.",
        es: "La suma es $360^\\circ(V-2)=2160^\\circ$.",
        ja: "和は $360^\\circ(V-2)=2160^\\circ$。",
        zh: "和为 $360^\\circ(V-2)=2160^\\circ$。"
      } },
      { tex: "\\text{every polyhedron with 16 quadrilateral faces has 18 vertices}", correct: false, why: {
        en: "True for convex ones; a non-convex ring of $16$ quadrilaterals (a torus) has $V-E+F=0$, so $16$ vertices.",
        fr: "Vrai pour les convexes ; un anneau non convexe de $16$ quadrilatères (un tore) a $V-E+F=0$, donc $16$ sommets.",
        es: "Cierto para los convexos; un anillo no convexo de $16$ cuadriláteros (un toro) tiene $V-E+F=0$, o sea $16$ vértices.",
        ja: "凸なら正しいが、16 枚の四角形でできた非凸の輪（トーラス）は $V-E+F=0$ で頂点 $16$。",
        zh: "对凸多面体成立；由 $16$ 个四边形组成的非凸环（环面）有 $V-E+F=0$，即 $16$ 个顶点。"
      } },
      { tex: "\\text{a polyhedron with } F=15,\\ E=22,\\ V=9 \\text{ exists}", correct: false, why: {
        en: "$2E\\ge3F$ would need $44\\ge45$.",
        fr: "$2E\\ge3F$ exigerait $44\\ge45$.",
        es: "$2E\\ge3F$ exigiría $44\\ge45$.",
        ja: "$2E\\ge3F$ には $44\\ge45$ が必要。",
        zh: "$2E\\ge3F$ 要求 $44\\ge45$。"
      } },
      { tex: "V-E+F=2 \\text{ is enough for a convex polyhedron to exist}", correct: false, why: {
        en: "$V=9,\\ E=22,\\ F=15$ satisfies it but cannot exist.",
        fr: "$V=9,\\ E=22,\\ F=15$ la vérifie mais ne peut pas exister.",
        es: "$V=9,\\ E=22,\\ F=15$ la cumple pero no puede existir.",
        ja: "$V=9,\\ E=22,\\ F=15$ は満たすが存在しない。",
        zh: "$V=9,\\ E=22,\\ F=15$ 满足它却不存在。"
      } },
      { tex: "\\text{the face-angle sum depends on the shapes of the faces, not only on } V", correct: false, why: {
        en: "For convex polyhedra it is always $360^\\circ(V-2)$.",
        fr: "Pour un polyèdre convexe c’est toujours $360^\\circ(V-2)$.",
        es: "Para un poliedro convexo siempre es $360^\\circ(V-2)$.",
        ja: "凸多面体では常に $360^\\circ(V-2)$。",
        zh: "对凸多面体总是 $360^\\circ(V-2)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Euler for the convex one",
          fr: "Euler pour le convexe",
          es: "Euler para el convexo",
          ja: "凸多面体にオイラーの式",
          zh: "对凸多面体用欧拉公式"
        },
        lines: ["V=2+E-F=2+16-10=8"],
        note: {
          en: "Euler’s formula holds for convex polyhedra (and all polyhedra without holes).",
          fr: "La formule d’Euler vaut pour les polyèdres convexes (et tous ceux sans trou).",
          es: "La fórmula de Euler vale para los poliedros convexos (y todos los que no tienen agujeros).",
          ja: "オイラーの式は凸多面体（穴のない多面体）で成り立つ。",
          zh: "欧拉公式对凸多面体（及所有无洞多面体）成立。"
        }
      },
      {
        title: {
          en: "Sum of all face angles",
          fr: "Somme de tous les angles des faces",
          es: "Suma de todos los ángulos de las caras",
          ja: "すべての面の角の和",
          zh: "所有面角之和"
        },
        lines: ["\\sum_{\\text{faces}}(k_i-2)\\cdot180^\\circ=(2E-2F)\\cdot180^\\circ=360^\\circ(V-2)", "=360^\\circ\\cdot6=\\boxed{2160^\\circ}"],
        note: {
          en: "$\\sum k_i=2E$ because every edge is counted by its two faces.",
          fr: "$\\sum k_i=2E$ car chaque arête est comptée par ses deux faces.",
          es: "$\\sum k_i=2E$ porque cada arista se cuenta en sus dos caras.",
          ja: "各辺は2つの面で数えられるので $\\sum k_i=2E$。",
          zh: "每条棱被它的两个面各计一次，所以 $\\sum k_i=2E$。"
        }
      },
      {
        title: {
          en: "Euler is not enough",
          fr: "Euler ne suffit pas",
          es: "Euler no basta",
          ja: "オイラーの式だけでは足りない",
          zh: "仅有欧拉公式不够"
        },
        lines: ["F=15,\\ E=22:\\quad 2E=44 < 45=3F"],
        note: {
          en: "The numbers satisfy $V-E+F=2$, yet no polyhedron has them.",
          fr: "Ces nombres vérifient $V-E+F=2$, pourtant aucun polyèdre ne les a.",
          es: "Esos números cumplen $V-E+F=2$ y sin embargo ningún poliedro los tiene.",
          ja: "$V-E+F=2$ は満たすが、そのような多面体はない。",
          zh: "这些数满足 $V-E+F=2$，却没有多面体具有它们。"
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
          en: "Only the two consequences for the convex polyhedron with 10 faces and 16 edges are true.",
          fr: "Seules les deux conséquences pour le polyèdre convexe à 10 faces et 16 arêtes sont vraies.",
          es: "Solo son verdaderas las dos consecuencias para el poliedro convexo de 10 caras y 16 aristas.",
          ja: "正しいのは、面 10・辺 16 の凸多面体についての2つの帰結だけ。",
          zh: "只有关于 10 个面、16 条棱的凸多面体的两个结论正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
