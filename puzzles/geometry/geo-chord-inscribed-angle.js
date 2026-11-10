/* geometry · A chord of length 8
   2 ── Chord, central angle and inscribed angle */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const g2O = [5, 5], g2A = [1, 2], g2B = [9, 2], g2M = [5, 2], g2C = [5 + 5 * Math.cos(110 * Math.PI / 180), 5 + 5 * Math.sin(110 * Math.PI / 180)];
  const chord = {
    id: 'geo-chord-inscribed-angle', category: 'geometry', title: {
      en: 'A chord of length 8',
      fr: 'Une corde de longueur 8',
      es: 'Una cuerda de longitud 8',
      ja: '長さ 8 の弦',
      zh: '长为 8 的弦'
    }, difficulty: 2,
    statement: {
      en: 'Circle $O$ has radius $5$ and chord $AB = 8$. Point $C$ lies on the major arc $AB$. <b>Which of the following are true?</b>',
      fr: 'Le cercle $O$ a pour rayon $5$ et la corde $AB = 8$. Le point $C$ est sur le grand arc $AB$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'La circunferencia $O$ tiene radio $5$ y la cuerda $AB = 8$. El punto $C$ está en el arco mayor $AB$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '円 $O$ の半径は $5$、弦 $AB = 8$ です。点 $C$ は優弧 $AB$ 上にあります。<b>次のうち正しいものはどれですか？</b>',
      zh: '圆 $O$ 的半径为 $5$，弦 $AB = 8$。点 $C$ 在优弧 $AB$ 上。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'A circle with centre O and radius 5. A horizontal chord AB of length 8 lies below the centre. C is a point on the larger arc above, forming the inscribed angle ACB.',
      fr: 'Un cercle de centre O et de rayon 5. Une corde horizontale AB de longueur 8 se trouve sous le centre. C est un point du grand arc au-dessus, formant l\'angle inscrit ACB.',
      es: 'Una circunferencia de centro O y radio 5. Una cuerda horizontal AB de longitud 8 está por debajo del centro. C es un punto del arco mayor de arriba, que forma el ángulo inscrito ACB.',
      ja: '中心 O、半径 5 の円。長さ 8 の水平な弦 AB が中心の下にあります。C は上側の優弧上の点で、円周角 ACB をつくります。',
      zh: '圆心为 O、半径为 5 的圆。一条长为 8 的水平弦 AB 位于圆心下方。C 是上方优弧上的一点，构成圆周角 ACB。'
    },
    hint: {
      en: 'Drop the perpendicular from $O$ to $AB$: it bisects the chord.',
      fr: 'Abaissons la perpendiculaire de $O$ sur $AB$ : elle coupe la corde en son milieu.',
      es: 'Trazamos la perpendicular desde $O$ a $AB$: divide la cuerda en dos mitades.',
      ja: '$O$ から $AB$ に垂線を下ろすと、弦を二等分します。',
      zh: '从 $O$ 向 $AB$ 作垂线：它平分弦。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example the extended law of sines AB = 2R·sin C, or coordinates), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple la loi des sinus étendue AB = 2R·sin C, ou des coordonnées), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con el teorema del seno extendido AB = 2R·sin C, o coordenadas), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば拡張正弦定理 AB = 2R·sin C、または座標）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如扩展正弦定理 AB = 2R·sin C，或坐标法），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 10, h: 10.2, scale: 30, pad: 26 });
      F.circle(g2O, 5, 'conic');
      F.seg(g2A, g2B); F.seg(g2C, g2A); F.seg(g2C, g2B);
      F.dot(g2O, 'center'); [g2A, g2B, g2C].forEach(p => F.dot(p));
      F.text(g2O, 'O', 'pt', 10, -8); F.text(g2A, 'A', 'pt', -12, 8); F.text(g2B, 'B', 'pt', 12, 8); F.text(g2C, 'C', 'pt', -8, -12);
      F.text(g2M, '8', 'len', 0, 16);
      return F;
    },
    options: [
      { tex: 'd(O, AB) = 3', correct: true, why: '$\\sqrt{5^2 - 4^2} = 3$.' },
      { tex: '\\sin\\angle ACB = \\tfrac45', correct: true, why: {
        en: 'Half the central angle: $\\sin\\tfrac{\\angle AOB}{2} = \\tfrac45$.',
        fr: 'La moitié de l\'angle au centre : $\\sin\\tfrac{\\angle AOB}{2} = \\tfrac45$.',
        es: 'La mitad del ángulo central: $\\sin\\tfrac{\\angle AOB}{2} = \\tfrac45$.',
        ja: '中心角の半分：$\\sin\\tfrac{\\angle AOB}{2} = \\tfrac45$。',
        zh: '圆心角的一半：$\\sin\\tfrac{\\angle AOB}{2} = \\tfrac45$。'
      } },
      { tex: 'd(O, AB) = 4', correct: false, why: {
        en: 'That is half the chord.',
        fr: 'C\'est la moitié de la corde.',
        es: 'Eso es la mitad de la cuerda.',
        ja: 'それは弦の半分です。',
        zh: '那是弦长的一半。'
      } },
      { tex: '\\sin\\angle ACB = \\tfrac35', correct: false, why: {
        en: 'That is $\\cos\\angle ACB$.',
        fr: 'C\'est $\\cos\\angle ACB$.',
        es: 'Eso es $\\cos\\angle ACB$.',
        ja: 'それは $\\cos\\angle ACB$ です。',
        zh: '那是 $\\cos\\angle ACB$。'
      } },
      { tex: '\\angle ACB = 2\\angle AOB', correct: false, why: {
        en: 'Backwards: the inscribed angle is half the central angle.',
        fr: 'À l\'envers : l\'angle inscrit est la moitié de l\'angle au centre.',
        es: 'Al revés: el ángulo inscrito es la mitad del ángulo central.',
        ja: '逆です：円周角は中心角の半分です。',
        zh: '弄反了：圆周角是圆心角的一半。'
      } },
      { tex: 'S_{\\triangle AOB} = 24', correct: false, why: {
        en: 'Forgets the $\\tfrac12$: the area is $12$.',
        fr: 'Oublie le $\\tfrac12$ : l\'aire vaut $12$.',
        es: 'Olvida el $\\tfrac12$: el área es $12$.',
        ja: '$\\tfrac12$ を忘れています：面積は $12$ です。',
        zh: '漏了 $\\tfrac12$：面积是 $12$。'
      } },
      { tex: '\\cos\\angle AOB = \\tfrac{7}{25}', correct: false, why: {
        en: 'Sign error: $\\cos\\angle AOB = -\\tfrac{7}{25}$ (the angle is obtuse).',
        fr: 'Erreur de signe : $\\cos\\angle AOB = -\\tfrac{7}{25}$ (l\'angle est obtus).',
        es: 'Error de signo: $\\cos\\angle AOB = -\\tfrac{7}{25}$ (el ángulo es obtuso).',
        ja: '符号の誤り：$\\cos\\angle AOB = -\\tfrac{7}{25}$（角は鈍角）。',
        zh: '符号错误：$\\cos\\angle AOB = -\\tfrac{7}{25}$（该角是钝角）。'
      } },
      { tex: '\\angle AOB = 90^\\circ', correct: false, why: {
        en: 'Then $AB$ would be $5\\sqrt2 \\approx 7.07$.',
        fr: 'Alors $AB$ vaudrait $5\\sqrt2 \\approx 7.07$.',
        es: 'Entonces $AB$ sería $5\\sqrt2 \\approx 7.07$.',
        ja: 'それなら $AB$ は $5\\sqrt2 \\approx 7.07$ になります。',
        zh: '那样 $AB$ 将是 $5\\sqrt2 \\approx 7.07$。'
      } }
    ],
    steps: [
      { title: {
        en: 'The perpendicular from the centre',
        fr: 'La perpendiculaire issue du centre',
        es: 'La perpendicular desde el centro',
        ja: '中心からの垂線',
        zh: '从圆心作垂线'
      }, lines: ['OM \\perp AB\\ \\Rightarrow\\ AM = MB = 4', 'OM = \\sqrt{OA^2 - AM^2} = \\sqrt{25 - 16} = \\boxed{3}'], note: {
        en: 'The perpendicular from the centre bisects any chord.',
        fr: 'La perpendiculaire issue du centre coupe toute corde en son milieu.',
        es: 'La perpendicular desde el centro divide cualquier cuerda en dos mitades.',
        ja: '中心からの垂線はどんな弦も二等分します。',
        zh: '从圆心作的垂线平分任意弦。'
      },
        fig(F) { F.draw(F.seg(g2O, g2M, 'hl blue', 'over'), 700); F.fadeIn(F.right(g2M, [1, 0], [0, 1], 0.45, 'strong'), 300, 600); F.draw(F.seg(g2O, g2A, 'radius strong', 'over'), 600, 300); F.fadeIn(F.text(mid(g2O, g2M), '3', 'len', 12, 0), 300, 800); F.fadeIn(F.text(mid(g2O, g2A), '5', 'len', -6, -10), 300, 900); F.fadeIn(F.dot(g2M), 200, 600); F.fadeIn(F.text(g2M, 'M', 'pt small', 0, 18), 200, 700); } },
      { title: { en: 'Central angle', fr: 'Angle au centre', es: 'Ángulo central', ja: '中心角', zh: '圆心角' }, lines: ['\\sin\\angle AOM = \\frac{AM}{OA} = \\frac45,\\quad \\cos\\angle AOM = \\frac35', '\\cos\\angle AOB = \\cos 2\\angle AOM = 1 - 2\\cdot\\tfrac{16}{25} = -\\tfrac{7}{25}'], note: {
        en: '$\\angle AOB = 2\\angle AOM$ because $OM$ bisects it.',
        fr: '$\\angle AOB = 2\\angle AOM$ car $OM$ en est la bissectrice.',
        es: '$\\angle AOB = 2\\angle AOM$ porque $OM$ es su bisectriz.',
        ja: '$OM$ が二等分するので $\\angle AOB = 2\\angle AOM$。',
        zh: '因为 $OM$ 平分它，所以 $\\angle AOB = 2\\angle AOM$。'
      },
        fig(F) { F.draw(F.seg(g2O, g2B, 'radius strong', 'over'), 600); F.fadeIn(F.path([g2A, g2O, g2B], 'fill-blue', 'fills'), 600); } },
      { title: { en: 'Inscribed angle', fr: 'Angle inscrit', es: 'Ángulo inscrito', ja: '円周角', zh: '圆周角' }, lines: ['\\angle ACB = \\tfrac12\\angle AOB = \\angle AOM', '\\Rightarrow\\ \\sin\\angle ACB = \\boxed{\\tfrac45}'], note: {
        en: 'Same result from the extended law of sines: $AB = 2R\\sin C \\Rightarrow \\sin C = \\tfrac{8}{10}$.',
        fr: 'Même résultat avec la loi des sinus étendue : $AB = 2R\\sin C \\Rightarrow \\sin C = \\tfrac{8}{10}$.',
        es: 'El mismo resultado con el teorema del seno extendido: $AB = 2R\\sin C \\Rightarrow \\sin C = \\tfrac{8}{10}$.',
        ja: '拡張正弦定理でも同じ結果：$AB = 2R\\sin C \\Rightarrow \\sin C = \\tfrac{8}{10}$。',
        zh: '用扩展正弦定理得到同样的结果：$AB = 2R\\sin C \\Rightarrow \\sin C = \\tfrac{8}{10}$。'
      },
        fig(F) { F.fadeIn(F.path([g2A, g2C, g2B], 'fill-yellow', 'fills'), 600); } },
      { title: {
        en: 'Area of $\\triangle AOB$',
        fr: 'Aire de $\\triangle AOB$',
        es: 'Área de $\\triangle AOB$',
        ja: '$\\triangle AOB$ の面積',
        zh: '$\\triangle AOB$ 的面积'
      }, lines: ['S = \\tfrac12\\cdot AB\\cdot OM = \\tfrac12\\cdot 8\\cdot 3 = 12'] },
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

  PuzzleBank.define(chord);
})(PuzzleBank.kit);
