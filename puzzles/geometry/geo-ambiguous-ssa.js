/* geometry · Two triangles, one set of data
   6 ── Law of sines: the ambiguous case */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const aB = [0.15, 0.15], aC = [0.15 + S3, 0.15], aA1 = [0.15 + 1.932 / S2, 0.15 + 1.932 / S2], aA2 = [0.15 + 0.5176 / S2, 0.15 + 0.5176 / S2];
  const ambiguous = {
    id: 'geo-ambiguous-ssa', category: 'geometry', title: {
      en: 'Two triangles, one set of data',
      fr: 'Deux triangles, une seule série de données',
      es: 'Dos triángulos, un mismo conjunto de datos',
      ja: '2つの三角形、1組のデータ',
      zh: '一组条件，两个三角形'
    }, source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "alevel", "ib"]
    },
    difficulty: 2,
    statement: {
      en: 'In triangle $ABC$, $a = \\sqrt3$, $b = \\sqrt2$ and $B = 45^\\circ$ (side $a$ is opposite $A$, side $b$ opposite $B$). <b>Which of the following can be the angle $A$?</b>',
      fr: 'Dans le triangle $ABC$, $a = \\sqrt3$, $b = \\sqrt2$ et $B = 45^\\circ$ (le côté $a$ est opposé à $A$, le côté $b$ à $B$). <b>Lesquelles des valeurs suivantes peuvent être l\'angle $A$ ?</b>',
      es: 'En el triángulo $ABC$, $a = \\sqrt3$, $b = \\sqrt2$ y $B = 45^\\circ$ (el lado $a$ es opuesto a $A$, el lado $b$ opuesto a $B$). <b>¿Cuáles de los siguientes pueden ser el ángulo $A$?</b>',
      ja: '三角形 $ABC$ で $a = \\sqrt3$, $b = \\sqrt2$, $B = 45^\\circ$ です（辺 $a$ は $A$ の対辺、辺 $b$ は $B$ の対辺）。<b>次のうち角 $A$ になりうるものはどれですか？</b>',
      zh: '在三角形 $ABC$ 中，$a = \\sqrt3$，$b = \\sqrt2$，$B = 45^\\circ$（边 $a$ 对角 $A$，边 $b$ 对角 $B$）。<b>角 $A$ 可能是下列哪些？</b>'
    },
    figureText: {
      en: 'Side BC = a = √3 is horizontal with B on the left. A ray from B makes 45° with BC. A circle around C with radius b = √2 cuts the ray in two points, giving two possible positions A1 and A2 of vertex A.',
      fr: 'Le côté BC = a = √3 est horizontal avec B à gauche. Une demi-droite issue de B fait 45° avec BC. Un cercle autour de C de rayon b = √2 coupe la demi-droite en deux points, ce qui donne deux positions possibles A1 et A2 du sommet A.',
      es: 'El lado BC = a = √3 es horizontal con B a la izquierda. Una semirrecta desde B forma 45° con BC. Una circunferencia alrededor de C con radio b = √2 corta la semirrecta en dos puntos, dando dos posiciones posibles A1 y A2 del vértice A.',
      ja: '辺 BC = a = √3 は水平で、B が左。B からの半直線が BC と 45° をなします。C を中心とする半径 b = √2 の円が半直線と2点で交わり、頂点 A の位置 A1 と A2 の2通りが得られます。',
      zh: '边 BC = a = √3 水平，B 在左侧。从 B 出发的射线与 BC 成 45°。以 C 为圆心、b = √2 为半径的圆与射线交于两点，得到顶点 A 的两个可能位置 A1 和 A2。'
    },
    hint: {
      en: 'The law of sines gives $\\sin A$ — and a sine value belongs to two angles.',
      fr: 'La loi des sinus donne $\\sin A$ — et une valeur de sinus correspond à deux angles.',
      es: 'El teorema del seno da $\\sin A$ — y un valor del seno corresponde a dos ángulos.',
      ja: '正弦定理で $\\sin A$ が求まります — そして1つの正弦の値には2つの角が対応します。',
      zh: '正弦定理给出 $\\sin A$ —— 而一个正弦值对应两个角。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example the law of cosines as a quadratic in c), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple la loi des cosinus vue comme une équation du second degré en c), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo el teorema del coseno como ecuación de segundo grado en c), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば余弦定理を c の2次方程式として扱う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如把余弦定理看作关于 c 的二次方程），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.25, h: 1.75, scale: 150, pad: 22 });
      F.seg(aB, [aB[0] + 1.6, aB[1] + 1.6], 'sight');
      F.seg(aB, aC); F.seg(aC, aA1); F.seg(aC, aA2, 'thin');
      F.arc(aC, S2, 82, 192, 'dashc', 'base');
      F.arc(aB, 0.5, 0, 45); F.text([aB[0] + 0.64, aB[1] + 0.12], '45°', 'len small');
      [aB, aC, aA1, aA2].forEach(p => F.dot(p));
      F.text(aB, 'B', 'pt', -10, 12); F.text(aC, 'C', 'pt', 10, 12); F.text(aA1, 'A₁', 'pt', -10, -10); F.text(aA2, 'A₂', 'pt', -14, -6);
      F.text(mid(aB, aC), 'a = √3', 'len small', 0, 16); F.text(mid(aC, aA1), 'b', 'len it', 10, -4); F.text(mid(aC, aA2), 'b', 'len it', 2, -10);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'for both': { fr: 'pour les deux', es: 'para ambos', ja: '両方とも', zh: '两者都' },
      'or': { fr: 'ou', es: 'o', ja: 'または', zh: '或' }
    },
    options: [
      { tex: 'A = 60^\\circ', correct: true, why: {
        en: '$\\sin A = \\tfrac{\\sqrt3}{2}$, triangle $A_1BC$.',
        fr: '$\\sin A = \\tfrac{\\sqrt3}{2}$, triangle $A_1BC$.',
        es: '$\\sin A = \\tfrac{\\sqrt3}{2}$, triángulo $A_1BC$.',
        ja: '$\\sin A = \\tfrac{\\sqrt3}{2}$、三角形 $A_1BC$。',
        zh: '$\\sin A = \\tfrac{\\sqrt3}{2}$，三角形 $A_1BC$。'
      } },
      { tex: 'A = 120^\\circ', correct: true, why: {
        en: 'The other angle with the same sine — triangle $A_2BC$.',
        fr: 'L\'autre angle de même sinus — triangle $A_2BC$.',
        es: 'El otro ángulo con el mismo seno — triángulo $A_2BC$.',
        ja: '同じ正弦をもつもう1つの角 — 三角形 $A_2BC$。',
        zh: '正弦值相同的另一个角 —— 三角形 $A_2BC$。'
      } },
      { tex: 'A = 30^\\circ', correct: false, why: {
        en: '$\\sin 30^\\circ = \\tfrac12$, not $\\tfrac{\\sqrt3}{2}$.',
        fr: '$\\sin 30^\\circ = \\tfrac12$, et non $\\tfrac{\\sqrt3}{2}$.',
        es: '$\\sin 30^\\circ = \\tfrac12$, no $\\tfrac{\\sqrt3}{2}$.',
        ja: '$\\sin 30^\\circ = \\tfrac12$ であり、$\\tfrac{\\sqrt3}{2}$ ではありません。',
        zh: '$\\sin 30^\\circ = \\tfrac12$，而不是 $\\tfrac{\\sqrt3}{2}$。'
      } },
      { tex: 'A = 150^\\circ', correct: false, why: {
        en: '$150^\\circ + 45^\\circ > 180^\\circ$ — and the sine is wrong.',
        fr: '$150^\\circ + 45^\\circ > 180^\\circ$ — et le sinus est faux.',
        es: '$150^\\circ + 45^\\circ > 180^\\circ$ — y el seno está mal.',
        ja: '$150^\\circ + 45^\\circ > 180^\\circ$ — しかも正弦が間違っています。',
        zh: '$150^\\circ + 45^\\circ > 180^\\circ$ —— 而且正弦值也不对。'
      } },
      { tex: 'A = 45^\\circ', correct: false, why: {
        en: 'Then $a = b$, but $\\sqrt3 \\ne \\sqrt2$.',
        fr: 'Alors $a = b$, mais $\\sqrt3 \\ne \\sqrt2$.',
        es: 'Entonces $a = b$, pero $\\sqrt3 \\ne \\sqrt2$.',
        ja: 'それなら $a = b$ ですが、$\\sqrt3 \\ne \\sqrt2$。',
        zh: '那样 $a = b$，但 $\\sqrt3 \\ne \\sqrt2$。'
      } },
      { tex: 'A = 90^\\circ', correct: false, why: {
        en: 'Would need $\\sin A = 1$.',
        fr: 'Il faudrait $\\sin A = 1$.',
        es: 'Haría falta $\\sin A = 1$.',
        ja: '$\\sin A = 1$ が必要になります。',
        zh: '需要 $\\sin A = 1$。'
      } },
      { tex: 'A = 135^\\circ', correct: false, why: '$\\sin 135^\\circ = \\tfrac{\\sqrt2}{2}$.' },
      { tex: 'A = 75^\\circ', correct: false, why: {
        en: 'That is angle $C$ in triangle $A_1BC$.',
        fr: 'C\'est l\'angle $C$ dans le triangle $A_1BC$.',
        es: 'Ese es el ángulo $C$ en el triángulo $A_1BC$.',
        ja: 'それは三角形 $A_1BC$ の角 $C$ です。',
        zh: '那是三角形 $A_1BC$ 中的角 $C$。'
      } }
    ],
    steps: [
      { title: { en: 'Law of sines', fr: 'Loi des sinus', es: 'Teorema del seno', ja: '正弦定理', zh: '正弦定理' }, lines: ['\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\ \\Rightarrow\\ \\sin A = \\frac{a\\sin B}{b} = \\frac{\\sqrt3\\cdot\\tfrac{\\sqrt2}{2}}{\\sqrt2} = \\frac{\\sqrt3}{2}'] },
      { title: {
        en: 'Two candidate angles',
        fr: 'Deux angles candidats',
        es: 'Dos ángulos candidatos',
        ja: '候補となる2つの角',
        zh: '两个可能的角'
      }, lines: ['\\sin A = \\tfrac{\\sqrt3}{2}\\ \\Rightarrow\\ A = 60^\\circ \\ \\text{or}\\ A = 120^\\circ'], note: '$\\sin\\theta = \\sin(180^\\circ - \\theta)$.' },
      { title: {
        en: 'Are both possible?',
        fr: 'Les deux sont-ils possibles ?',
        es: '¿Son posibles los dos?',
        ja: '両方ありえますか？',
        zh: '两种都可能吗？'
      }, lines: ['a > b \\Rightarrow A > B = 45^\\circ \\quad\\checkmark\\ \\text{for both}', '60^\\circ + 45^\\circ < 180^\\circ,\\qquad 120^\\circ + 45^\\circ < 180^\\circ'], note: {
        en: 'Geometrically: the circle of radius $b$ around $C$ cuts the ray from $B$ twice.',
        fr: 'Géométriquement : le cercle de rayon $b$ autour de $C$ coupe deux fois la demi-droite issue de $B$.',
        es: 'Geométricamente: la circunferencia de radio $b$ alrededor de $C$ corta dos veces la semirrecta desde $B$.',
        ja: '図形的には：$C$ を中心とする半径 $b$ の円が $B$ からの半直線と2回交わります。',
        zh: '从几何上看：以 $C$ 为圆心、$b$ 为半径的圆与从 $B$ 出发的射线有两个交点。'
      },
        fig(F) { F.draw(F.arc(aC, S2, 82, 192, 'strong', 'over'), 900); F.fadeIn(F.path([aB, aC, aA1], 'fill-yellow', 'fills'), 600, 500); F.fadeIn(F.path([aB, aC, aA2], 'fill-pink', 'fills'), 600, 900); } },
      { title: { en: 'The two triangles', fr: 'Les deux triangles', es: 'Los dos triángulos', ja: '2つの三角形', zh: '两个三角形' }, lines: ['A_1:\\ A = 60^\\circ,\\ C = 75^\\circ \\qquad A_2:\\ A = 120^\\circ,\\ C = 15^\\circ'] },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'This “SSA” data gives two different triangles, so two answers.',
        fr: 'Ces données « CCA » (côté-côté-angle) donnent deux triangles différents, donc deux réponses.',
        es: 'Estos datos «LLA» dan dos triángulos distintos, así que dos respuestas.',
        ja: 'この「2辺と1つの対角」の条件では2つの異なる三角形ができるので、答えは2つです。',
        zh: '这种“边边角”条件给出两个不同的三角形，所以有两个答案。'
      } }
    ]
  };

  PuzzleBank.define(ambiguous);
})(PuzzleBank.kit);
