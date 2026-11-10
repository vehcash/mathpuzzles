/* geometry · The diagonal of the cube
   3 ── Cube: space diagonal and its angle with the base */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const cO = [0.9, 0.75], cA = [0.3, 0.3], cB = [2.3, 0.3], cC = [2.3 + cO[0], 0.3 + cO[1]], cD = [0.3 + cO[0], 0.3 + cO[1]];
  const up = p => [p[0], p[1] + 2];
  const cA1 = up(cA), cB1 = up(cB), cC1 = up(cC), cD1 = up(cD);
  const cube = {
    id: 'geo-cube-diagonal', category: 'geometry', title: {
      en: 'The diagonal of the cube',
      fr: 'La diagonale du cube',
      es: 'La diagonal del cubo',
      ja: '立方体の対角線',
      zh: '正方体的对角线'
    }, difficulty: 2,
    statement: {
      en: 'Cube $ABCD\\text{-}A_1B_1C_1D_1$ has edge $2$. Let $\\theta$ be the angle between the space diagonal $AC_1$ and the base $ABCD$. <b>Which of the following are true?</b>',
      fr: 'Le cube $ABCD\\text{-}A_1B_1C_1D_1$ a une arête de $2$. Soit $\\theta$ l\'angle entre la grande diagonale $AC_1$ et la base $ABCD$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'El cubo $ABCD\\text{-}A_1B_1C_1D_1$ tiene arista $2$. Sea $\\theta$ el ángulo entre la diagonal del cubo $AC_1$ y la base $ABCD$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '立方体 $ABCD\\text{-}A_1B_1C_1D_1$ の辺の長さは $2$ です。対角線 $AC_1$ と底面 $ABCD$ のなす角を $\\theta$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '正方体 $ABCD\\text{-}A_1B_1C_1D_1$ 的棱长为 $2$。设 $\\theta$ 为体对角线 $AC_1$ 与底面 $ABCD$ 所成的角。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'A cube drawn in oblique view: base ABCD at the bottom (A front-left, B front-right, C back-right, D back-left) and top A1B1C1D1. The space diagonal goes from A to C1. Edge length 2.',
      fr: 'Un cube dessiné en perspective cavalière : base ABCD en bas (A avant gauche, B avant droit, C arrière droit, D arrière gauche) et face supérieure A1B1C1D1. La grande diagonale va de A à C1. Arête de longueur 2.',
      es: 'Un cubo en perspectiva caballera: base ABCD abajo (A delante a la izquierda, B delante a la derecha, C detrás a la derecha, D detrás a la izquierda) y cara superior A1B1C1D1. La diagonal del cubo va de A a C1. Arista de longitud 2.',
      ja: '斜投影図の立方体：底面 ABCD が下（A 左手前、B 右手前、C 右奥、D 左奥）、上面 A1B1C1D1。対角線は A から C1。辺の長さ 2。',
      zh: '斜二测画法的正方体：底面 ABCD 在下（A 左前，B 右前，C 右后，D 左后），顶面 A1B1C1D1。体对角线从 A 到 C1。棱长 2。'
    },
    hint: {
      en: 'The projection of $AC_1$ onto the base is the face diagonal $AC$.',
      fr: 'La projection de $AC_1$ sur la base est la diagonale de face $AC$.',
      es: 'La proyección de $AC_1$ sobre la base es la diagonal de la cara $AC$.',
      ja: '$AC_1$ の底面への正射影は面の対角線 $AC$ です。',
      zh: '$AC_1$ 在底面上的射影是面对角线 $AC$。'
    },
    aiHint: {
      en: 'Please solve it with coordinates / vectors if you can (put A at the origin), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le avec des coordonnées / vecteurs si possible (place A à l\'origine), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo con coordenadas / vectores si puedes (pon A en el origen), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば座標 / ベクトルで解いてください（A を原点に置く）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用坐标 / 向量求解（以 A 为原点），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.2, scale: 72, pad: 24 });
      [[cA, cB], [cB, cC], [cA1, cB1], [cB1, cC1], [cC1, cD1], [cD1, cA1], [cA, cA1], [cB, cB1], [cC, cC1]].forEach(([p, q]) => F.seg(p, q));
      [[cA, cD], [cD, cC], [cD, cD1]].forEach(([p, q]) => F.seg(p, q, 'hidden-edge'));
      F.seg(cA, cC1, 'diag');
      [[cA, 'A', -10, 10], [cB, 'B', 10, 10], [cC, 'C', 12, 6], [cD, 'D', -12, -6], [cA1, 'A₁', -14, -4], [cB1, 'B₁', 12, 8], [cC1, 'C₁', 12, -6], [cD1, 'D₁', -6, -10]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.text(mid(cA, cB), '2', 'len', 0, 14);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'is': { fr: 'est', es: 'es', ja: 'は', zh: '是' },
      'on': { fr: 'sur', es: 'sobre', ja: '上', zh: '在' },
      'plane': { fr: 'plan', es: 'plano', ja: '平面', zh: '平面' },
      'projection of': { fr: 'projection de', es: 'proyección de', ja: '正射影：', zh: '射影：' },
      'surface area': { fr: 'aire totale', es: 'área total', ja: '表面積', zh: '表面积' }
    },
    options: [
      { tex: 'AC_1 = 2\\sqrt3', correct: true, why: '$\\sqrt{2^2+2^2+2^2}$.' },
      { tex: '\\cos\\theta = \\tfrac{\\sqrt6}{3}', correct: true, why: '$\\cos\\theta = \\tfrac{AC}{AC_1} = \\tfrac{2\\sqrt2}{2\\sqrt3}$.' },
      { tex: 'AC_1 = 2\\sqrt2', correct: false, why: {
        en: 'That is the face diagonal $AC$.',
        fr: 'C\'est la diagonale de face $AC$.',
        es: 'Eso es la diagonal de la cara $AC$.',
        ja: 'それは面の対角線 $AC$ です。',
        zh: '那是面对角线 $AC$。'
      } },
      { tex: '\\sin\\theta = \\tfrac{\\sqrt6}{3}', correct: false, why: {
        en: 'Swaps sine and cosine: $\\sin\\theta = \\tfrac{\\sqrt3}{3}$.',
        fr: 'Échange sinus et cosinus : $\\sin\\theta = \\tfrac{\\sqrt3}{3}$.',
        es: 'Intercambia seno y coseno: $\\sin\\theta = \\tfrac{\\sqrt3}{3}$.',
        ja: '正弦と余弦を取り違えています：$\\sin\\theta = \\tfrac{\\sqrt3}{3}$。',
        zh: '把正弦和余弦弄反了：$\\sin\\theta = \\tfrac{\\sqrt3}{3}$。'
      } },
      { tex: '\\theta = 45^\\circ', correct: false, why: {
        en: 'Would need $CC_1 = AC$, but $2 \\ne 2\\sqrt2$.',
        fr: 'Il faudrait $CC_1 = AC$, mais $2 \\ne 2\\sqrt2$.',
        es: 'Haría falta $CC_1 = AC$, pero $2 \\ne 2\\sqrt2$.',
        ja: '$CC_1 = AC$ が必要ですが、$2 \\ne 2\\sqrt2$。',
        zh: '需要 $CC_1 = AC$，但 $2 \\ne 2\\sqrt2$。'
      } },
      { tex: 'AC_1 \\parallel BD', correct: false, why: {
        en: 'They are skew lines (in fact perpendicular).',
        fr: 'Ce sont des droites non coplanaires (en fait orthogonales).',
        es: 'Son rectas que se cruzan (de hecho, perpendiculares).',
        ja: 'ねじれの位置にあります（実は垂直）。',
        zh: '它们是异面直线（实际上互相垂直）。'
      } },
      { tex: '\\text{surface area} = 16', correct: false, why: {
        en: 'Six faces: $6\\cdot 4 = 24$.',
        fr: 'Six faces : $6\\cdot 4 = 24$.',
        es: 'Seis caras: $6\\cdot 4 = 24$.',
        ja: '6つの面：$6\\cdot 4 = 24$。',
        zh: '六个面：$6\\cdot 4 = 24$。'
      } },
      { tex: 'V = 6', correct: false, why: '$V = 2^3 = 8$.' }
    ],
    steps: [
      { title: { en: 'The face diagonal', fr: 'La diagonale de face', es: 'La diagonal de la cara', ja: '面の対角線', zh: '面对角线' }, lines: ['AC = \\sqrt{AB^2 + BC^2} = \\sqrt{4 + 4} = 2\\sqrt2'], note: {
        en: 'Pythagoras in the base square.',
        fr: 'Pythagore dans le carré de base.',
        es: 'Pitágoras en el cuadrado de la base.',
        ja: '底面の正方形で三平方の定理。',
        zh: '在底面正方形中用勾股定理。'
      },
        fig(F) { F.draw(F.seg(cA, cC, 'hl blue', 'over'), 800); } },
      { title: { en: 'The space diagonal', fr: 'La grande diagonale', es: 'La diagonal del cubo', ja: '立方体の対角線', zh: '体对角线' }, lines: ['CC_1 \\perp \\text{plane } ABCD \\Rightarrow CC_1 \\perp AC', 'AC_1 = \\sqrt{AC^2 + CC_1^2} = \\sqrt{8 + 4} = \\boxed{2\\sqrt3}'], note: {
        en: 'Right triangle $ACC_1$, right angle at $C$.',
        fr: 'Triangle rectangle $ACC_1$, angle droit en $C$.',
        es: 'Triángulo rectángulo $ACC_1$, con el ángulo recto en $C$.',
        ja: '直角三角形 $ACC_1$、直角は $C$。',
        zh: '直角三角形 $ACC_1$，直角在 $C$。'
      },
        fig(F) { F.draw(F.seg(cC, cC1, 'hl pink', 'over'), 600); F.draw(F.seg(cA, cC1, 'hl yellow', 'over'), 900, 400); F.fadeIn(F.path([cA, cC, cC1], 'fill-yellow', 'fills'), 600, 300); } },
      { title: {
        en: 'The angle with the base',
        fr: 'L\'angle avec la base',
        es: 'El ángulo con la base',
        ja: '底面とのなす角',
        zh: '与底面所成的角'
      }, lines: ['\\text{projection of } AC_1 \\text{ on } ABCD \\text{ is } AC \\Rightarrow \\theta = \\angle C_1AC', '\\cos\\theta = \\frac{AC}{AC_1} = \\frac{2\\sqrt2}{2\\sqrt3} = \\boxed{\\tfrac{\\sqrt6}{3}},\\qquad \\sin\\theta = \\frac{CC_1}{AC_1} = \\tfrac{\\sqrt3}{3}'], note: {
        en: 'The angle between a line and a plane is the angle with its projection.',
        fr: 'L\'angle entre une droite et un plan est l\'angle avec sa projection.',
        es: 'El ángulo entre una recta y un plano es el ángulo con su proyección.',
        ja: '直線と平面のなす角は、直線とその正射影のなす角です。',
        zh: '直线与平面所成的角是直线与其射影所成的角。'
      },
        fig(F) { const a0 = Math.atan2(cC[1] - cA[1], cC[0] - cA[0]) * 180 / Math.PI, a1 = Math.atan2(cC1[1] - cA[1], cC1[0] - cA[0]) * 180 / Math.PI; F.draw(F.arc(cA, 0.45, a0, a1, 'strong', 'over'), 600); F.fadeIn(F.text([cA[0] + 0.62, cA[1] + 0.42], 'θ', 'len it'), 300, 500); } },
      { title: { en: 'Surface and volume', fr: 'Surface et volume', es: 'Superficie y volumen', ja: '表面積と体積', zh: '表面积与体积' }, lines: ['S = 6\\cdot 2^2 = 24,\\qquad V = 2^3 = 8'] },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Two statements are true.',
        fr: 'Deux affirmations sont vraies.',
        es: 'Dos afirmaciones son verdaderas.',
        ja: '正しい記述は2つです。',
        zh: '有两个说法正确。'
      } }
    ]
  };

  PuzzleBank.define(cube);
})(PuzzleBank.kit);
