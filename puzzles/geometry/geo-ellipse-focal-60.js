/* geometry · The focal triangle of an ellipse
   4 ── Ellipse: focal triangle with a 60° angle */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const eS = p => [p[0] + 5.8, p[1] + 3.6];
  const eF1 = eS([-4, 0]), eF2 = eS([4, 0]), eP = eS([4.507, 1.299]);
  const ellipse = {
    id: 'geo-ellipse-focal-60', category: 'geometry', title: {
      en: 'The focal triangle of an ellipse',
      fr: 'Le triangle focal d\'une ellipse',
      es: 'El triángulo focal de una elipse',
      ja: '楕円の焦点三角形',
      zh: '椭圆的焦点三角形'
    }, source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 3,
    statement: {
      en: 'For the ellipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ with foci $F_1, F_2$, a point $P$ on the ellipse satisfies $\\angle F_1PF_2 = 60^\\circ$. <b>Which of the following are true?</b>',
      fr: 'Pour l\'ellipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ de foyers $F_1, F_2$, un point $P$ de l\'ellipse vérifie $\\angle F_1PF_2 = 60^\\circ$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'Para la elipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ con focos $F_1, F_2$, un punto $P$ de la elipse cumple $\\angle F_1PF_2 = 60^\\circ$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '楕円 $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ の焦点を $F_1, F_2$ とし、楕円上の点 $P$ が $\\angle F_1PF_2 = 60^\\circ$ を満たします。<b>次のうち正しいものはどれですか？</b>',
      zh: '对于椭圆 $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$，焦点为 $F_1, F_2$，椭圆上一点 $P$ 满足 $\\angle F_1PF_2 = 60^\\circ$。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'The ellipse x²/25 + y²/9 = 1 centred at the origin, foci F1(−4, 0) and F2(4, 0), and a point P on the ellipse in the first quadrant with angle F1PF2 = 60°.',
      fr: 'L\'ellipse x²/25 + y²/9 = 1 centrée à l\'origine, foyers F1(−4, 0) et F2(4, 0), et un point P de l\'ellipse dans le premier quadrant avec l\'angle F1PF2 = 60°.',
      es: 'La elipse x²/25 + y²/9 = 1 centrada en el origen, focos F1(−4, 0) y F2(4, 0), y un punto P de la elipse en el primer cuadrante con el ángulo F1PF2 = 60°.',
      ja: '原点を中心とする楕円 x²/25 + y²/9 = 1、焦点 F1(−4, 0) と F2(4, 0)、楕円上の第1象限の点 P で角 F1PF2 = 60°。',
      zh: '以原点为中心的椭圆 x²/25 + y²/9 = 1，焦点 F1(−4, 0) 和 F2(4, 0)，椭圆上第一象限内一点 P 满足角 F1PF2 = 60°。'
    },
    hint: {
      en: 'Use $|PF_1| + |PF_2| = 2a$ together with the law of cosines in $\\triangle F_1PF_2$.',
      fr: 'Utilisez $|PF_1| + |PF_2| = 2a$ avec la loi des cosinus dans $\\triangle F_1PF_2$.',
      es: 'Usa $|PF_1| + |PF_2| = 2a$ junto con el teorema del coseno en $\\triangle F_1PF_2$.',
      ja: '$|PF_1| + |PF_2| = 2a$ と $\\triangle F_1PF_2$ での余弦定理を組み合わせます。',
      zh: '把 $|PF_1| + |PF_2| = 2a$ 与 $\\triangle F_1PF_2$ 中的余弦定理结合使用。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example the formula S = b²·tan(θ/2) and its proof, or coordinates of P), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple la formule S = b²·tan(θ/2) et sa démonstration, ou les coordonnées de P), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con la fórmula S = b²·tan(θ/2) y su demostración, o las coordenadas de P), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば公式 S = b²·tan(θ/2) とその証明、または P の座標）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如公式 S = b²·tan(θ/2) 及其证明，或求 P 的坐标），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 11.6, h: 7.4, scale: 30, pad: 18 });
      F.seg(eS([-5.8, 0]), eS([5.8, 0]), 'axis'); F.seg(eS([0, -3.6]), eS([0, 3.6]), 'axis');
      const pts = []; for (let k = 0; k <= 72; k++) { const t = k / 72 * 2 * Math.PI; pts.push(eS([5 * Math.cos(t), 3 * Math.sin(t)])); } F.path(pts, 'conic');
      F.seg(eF1, eP); F.seg(eF2, eP);
      [eF1, eF2, eP].forEach(p => F.dot(p));
      F.text(eF1, 'F₁', 'pt', 0, 16); F.text(eF2, 'F₂', 'pt', 0, 16); F.text(eP, 'P', 'pt', 10, -8);
      F.text(eS([0, 0]), 'O', 'pt small', -10, 12);
      const a1 = Math.atan2(eF1[1] - eP[1], eF1[0] - eP[0]) * 180 / Math.PI, a2 = Math.atan2(eF2[1] - eP[1], eF2[0] - eP[0]) * 180 / Math.PI;
      F.arc(eP, 0.8, Math.min(a1, a2), Math.max(a1, a2)); F.text([eP[0] - 1.25, eP[1] - 0.5], '60°', 'len small');
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'is an endpoint of the minor axis': { fr: 'est une extrémité du petit axe', es: 'es un extremo del eje menor', ja: 'は短軸の端点', zh: '是短轴的端点' }
    },
    options: [
      { tex: 'S_{\\triangle F_1PF_2} = 3\\sqrt3', correct: true, why: '$\\tfrac12\\cdot 12\\cdot\\sin 60^\\circ$.' },
      { tex: '|PF_1| + |PF_2| = 10', correct: true, why: {
        en: 'Definition of the ellipse: $2a = 10$.',
        fr: 'Définition de l\'ellipse : $2a = 10$.',
        es: 'Definición de elipse: $2a = 10$.',
        ja: '楕円の定義：$2a = 10$。',
        zh: '椭圆的定义：$2a = 10$。'
      } },
      { tex: '|F_1F_2| = 10', correct: false, why: {
        en: 'That is $2a$; the focal distance is $2c = 8$.',
        fr: 'C\'est $2a$ ; la distance focale est $2c = 8$.',
        es: 'Eso es $2a$; la distancia focal es $2c = 8$.',
        ja: 'それは $2a$ です。焦点間距離は $2c = 8$。',
        zh: '那是 $2a$；焦距是 $2c = 8$。'
      } },
      { tex: 'S_{\\triangle F_1PF_2} = 9\\sqrt3', correct: false, why: {
        en: 'Uses $b^2\\tan 60^\\circ$ instead of $b^2\\tan 30^\\circ$.',
        fr: 'Utilise $b^2\\tan 60^\\circ$ au lieu de $b^2\\tan 30^\\circ$.',
        es: 'Usa $b^2\\tan 60^\\circ$ en lugar de $b^2\\tan 30^\\circ$.',
        ja: '$b^2\\tan 30^\\circ$ ではなく $b^2\\tan 60^\\circ$ を使っています。',
        zh: '用了 $b^2\\tan 60^\\circ$ 而不是 $b^2\\tan 30^\\circ$。'
      } },
      { tex: 'S_{\\triangle F_1PF_2} = \\tfrac{3\\sqrt3}{2}', correct: false, why: {
        en: 'Takes half of the area twice.',
        fr: 'Prend deux fois la moitié de l\'aire.',
        es: 'Toma dos veces la mitad del área.',
        ja: '面積の半分を2回取っています。',
        zh: '把面积的一半算了两次。'
      } },
      { tex: '|PF_1|\\cdot|PF_2| = 16', correct: false, why: {
        en: 'The product is $12$.',
        fr: 'Le produit vaut $12$.',
        es: 'El producto es $12$.',
        ja: '積は $12$。',
        zh: '乘积是 $12$。'
      } },
      { tex: 'e = \\tfrac35', correct: false, why: {
        en: 'That is $b/a$; the eccentricity is $c/a = \\tfrac45$.',
        fr: 'C\'est $b/a$ ; l\'excentricité vaut $c/a = \\tfrac45$.',
        es: 'Eso es $b/a$; la excentricidad es $c/a = \\tfrac45$.',
        ja: 'それは $b/a$ です。離心率は $c/a = \\tfrac45$。',
        zh: '那是 $b/a$；离心率是 $c/a = \\tfrac45$。'
      } },
      { tex: 'P \\text{ is an endpoint of the minor axis}', correct: false, why: {
        en: 'There the angle is $\\approx 106^\\circ$, not $60^\\circ$.',
        fr: 'Là, l\'angle vaut $\\approx 106^\\circ$, et non $60^\\circ$.',
        es: 'Ahí el ángulo es $\\approx 106^\\circ$, no $60^\\circ$.',
        ja: 'そこでの角は $\\approx 106^\\circ$ で、$60^\\circ$ ではありません。',
        zh: '那里的角是 $\\approx 106^\\circ$，而不是 $60^\\circ$。'
      } }
    ],
    steps: [
      { title: {
        en: 'Read off $a$, $b$, $c$',
        fr: 'Lire $a$, $b$, $c$',
        es: 'Leer $a$, $b$, $c$',
        ja: '$a$, $b$, $c$ を読み取る',
        zh: '读出 $a$、$b$、$c$'
      }, lines: ['a = 5,\\quad b = 3,\\quad c = \\sqrt{a^2 - b^2} = 4', '|F_1F_2| = 2c = 8'], note: {
        en: 'The foci are at $(\\pm 4, 0)$.',
        fr: 'Les foyers sont en $(\\pm 4, 0)$.',
        es: 'Los focos están en $(\\pm 4, 0)$.',
        ja: '焦点は $(\\pm 4, 0)$。',
        zh: '焦点在 $(\\pm 4, 0)$。'
      },
        fig(F) { F.draw(F.seg(eF1, eF2, 'hl blue', 'over'), 800); F.fadeIn(F.text(eS([0, 0]), '8', 'len', 18, -10), 300, 600); } },
      { title: {
        en: 'Definition of the ellipse',
        fr: 'Définition de l\'ellipse',
        es: 'Definición de elipse',
        ja: '楕円の定義',
        zh: '椭圆的定义'
      }, lines: ['m = |PF_1|,\\ n = |PF_2|:\\qquad m + n = 2a = 10'], note: {
        en: 'Every point of the ellipse has the same total distance to the foci.',
        fr: 'Chaque point de l\'ellipse a la même distance totale aux foyers.',
        es: 'Cada punto de la elipse tiene la misma distancia total a los focos.',
        ja: '楕円上のどの点も、2つの焦点までの距離の和が一定です。',
        zh: '椭圆上每一点到两焦点的距离之和相同。'
      },
        fig(F) { F.draw(F.seg(eF1, eP, 'hl pink', 'over'), 700); F.draw(F.seg(eF2, eP, 'hl pink', 'over'), 500, 500); } },
      { title: {
        en: 'Law of cosines at $P$',
        fr: 'Loi des cosinus en $P$',
        es: 'Teorema del coseno en $P$',
        ja: '$P$ での余弦定理',
        zh: '在 $P$ 处用余弦定理'
      }, lines: ['(2c)^2 = m^2 + n^2 - 2mn\\cos 60^\\circ = (m+n)^2 - 3mn', '64 = 100 - 3mn\\ \\Rightarrow\\ mn = 12'], note: {
        en: 'We never need $m$ and $n$ separately.',
        fr: 'On n\'a jamais besoin de $m$ et $n$ séparément.',
        es: 'Nunca necesitamos $m$ y $n$ por separado.',
        ja: '$m$ と $n$ を個別に求める必要はありません。',
        zh: '我们从不需要分别求出 $m$ 和 $n$。'
      } },
      { title: { en: 'Area', fr: 'Aire', es: 'Área', ja: '面積', zh: '面积' }, lines: ['S = \\tfrac12\\, mn \\sin 60^\\circ = \\tfrac12\\cdot 12\\cdot\\tfrac{\\sqrt3}{2} = \\boxed{3\\sqrt3}'], note: {
        en: 'Shortcut worth remembering: $S = b^2\\tan\\tfrac{\\theta}{2} = 9\\tan 30^\\circ = 3\\sqrt3$.',
        fr: 'Raccourci à retenir : $S = b^2\\tan\\tfrac{\\theta}{2} = 9\\tan 30^\\circ = 3\\sqrt3$.',
        es: 'Atajo que vale la pena recordar: $S = b^2\\tan\\tfrac{\\theta}{2} = 9\\tan 30^\\circ = 3\\sqrt3$.',
        ja: '覚えておくと便利な公式：$S = b^2\\tan\\tfrac{\\theta}{2} = 9\\tan 30^\\circ = 3\\sqrt3$。',
        zh: '值得记住的捷径：$S = b^2\\tan\\tfrac{\\theta}{2} = 9\\tan 30^\\circ = 3\\sqrt3$。'
      },
        fig(F) { F.fadeIn(F.path([eF1, eP, eF2], 'fill-yellow', 'fills'), 700); } },
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

  PuzzleBank.define(ellipse);
})(PuzzleBank.kit);
