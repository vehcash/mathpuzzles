/* geometry · An obtuse angle of 120°
   1 ── Law of cosines with a 120° angle */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const g1A = [2.7, 0.35], g1B = [5.7, 0.35], g1C = [2.7 - 2.5, 0.35 + 2.5 * S3];
  const lawCos = {
    id: 'geo-law-cosines-120', category: 'geometry', title: {
      en: 'An obtuse angle of 120°',
      fr: 'Un angle obtus de 120°',
      es: 'Un ángulo obtuso de 120°',
      ja: '120° の鈍角',
      zh: '120° 的钝角'
    }, difficulty: 2,
    statement: {
      en: 'In triangle $ABC$, $AB = 3$, $AC = 5$ and $\\angle A = 120^\\circ$. <b>Which of the following statements are true?</b>',
      fr: 'Dans le triangle $ABC$, $AB = 3$, $AC = 5$ et $\\angle A = 120^\\circ$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'En el triángulo $ABC$, $AB = 3$, $AC = 5$ y $\\angle A = 120^\\circ$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>',
      ja: '三角形 $ABC$ で $AB = 3$, $AC = 5$, $\\angle A = 120^\\circ$ です。<b>次のうち正しい記述はどれですか？</b>',
      zh: '在三角形 $ABC$ 中，$AB = 3$，$AC = 5$，$\\angle A = 120^\\circ$。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'Triangle ABC with AB = 3 along the bottom, AC = 5, and the obtuse angle A = 120° between them; side BC is unknown.',
      fr: 'Triangle ABC avec AB = 3 en bas, AC = 5, et l\'angle obtus A = 120° entre eux ; le côté BC est inconnu.',
      es: 'Triángulo ABC con AB = 3 en la parte inferior, AC = 5 y el ángulo obtuso A = 120° entre ellos; el lado BC es desconocido.',
      ja: '下辺 AB = 3、AC = 5、その間の鈍角 A = 120° の三角形 ABC。辺 BC は未知。',
      zh: '三角形 ABC，底边 AB = 3，AC = 5，两者夹钝角 A = 120°；边 BC 未知。'
    },
    hint: {
      en: 'Use the law of cosines for $BC$; remember that $\\cos 120^\\circ = -\\tfrac12$.',
      fr: 'Utilisez la loi des cosinus pour $BC$ ; rappelez-vous que $\\cos 120^\\circ = -\\tfrac12$.',
      es: 'Usa el teorema del coseno para $BC$; recuerda que $\\cos 120^\\circ = -\\tfrac12$.',
      ja: '$BC$ に余弦定理を使います。$\\cos 120^\\circ = -\\tfrac12$ に注意。',
      zh: '对 $BC$ 用余弦定理；记住 $\\cos 120^\\circ = -\\tfrac12$。'
    },
    aiHint: {
      en: 'Please solve it with a different approach if you can (for example coordinates with A at the origin), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le avec une autre approche si possible (par exemple des coordonnées avec A à l\'origine), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo con otro enfoque si puedes (por ejemplo coordenadas con A en el origen), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別のアプローチで解いてください（例えば A を原点とする座標）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请换一种思路求解（例如以 A 为原点建立坐标系），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 4.9, scale: 52, pad: 30 });
      F.path([g1A, g1B, g1C], 'tri');
      F.arc(g1A, 0.55, 0, 120); F.text([g1A[0] + 0.35, g1A[1] + 0.75], '120°', 'len small');
      F.text(g1A, 'A', 'pt', 2, 16); F.text(g1B, 'B', 'pt', 10, 12); F.text(g1C, 'C', 'pt', -10, -8);
      F.text(mid(g1A, g1B), '3', 'len', 0, 16); F.text(mid(g1A, g1C), '5', 'len', 16, 4); F.text(mid(g1B, g1C), '?', 'len muted', 14, -6);
      return F;
    },
    options: [
      { tex: 'BC = 7', correct: true, why: '$BC^2 = 9 + 25 + 15 = 49$.' },
      { tex: 'S_{\\triangle ABC} = \\tfrac{15\\sqrt3}{4}', correct: true, why: '$\\tfrac12\\cdot 3\\cdot 5\\cdot\\sin 120^\\circ$.' },
      { tex: 'BC = \\sqrt{19}', correct: false, why: {
        en: 'Uses $\\cos 120^\\circ = +\\tfrac12$ — the sign is wrong.',
        fr: 'Utilise $\\cos 120^\\circ = +\\tfrac12$ — le signe est faux.',
        es: 'Usa $\\cos 120^\\circ = +\\tfrac12$ — el signo está mal.',
        ja: '$\\cos 120^\\circ = +\\tfrac12$ としています — 符号が逆です。',
        zh: '用了 $\\cos 120^\\circ = +\\tfrac12$ —— 符号错了。'
      } },
      { tex: '\\sin C = \\tfrac{5\\sqrt3}{14}', correct: false, why: {
        en: 'That is $\\sin B$; $\\sin C = \\tfrac{3\\sqrt3}{14}$.',
        fr: 'C\'est $\\sin B$ ; $\\sin C = \\tfrac{3\\sqrt3}{14}$.',
        es: 'Eso es $\\sin B$; $\\sin C = \\tfrac{3\\sqrt3}{14}$.',
        ja: 'それは $\\sin B$ です。$\\sin C = \\tfrac{3\\sqrt3}{14}$。',
        zh: '那是 $\\sin B$；$\\sin C = \\tfrac{3\\sqrt3}{14}$。'
      } },
      { tex: '\\cos B = \\tfrac{13}{14}', correct: false, why: {
        en: 'That is $\\cos C$; $\\cos B = \\tfrac{11}{14}$.',
        fr: 'C\'est $\\cos C$ ; $\\cos B = \\tfrac{11}{14}$.',
        es: 'Eso es $\\cos C$; $\\cos B = \\tfrac{11}{14}$.',
        ja: 'それは $\\cos C$ です。$\\cos B = \\tfrac{11}{14}$。',
        zh: '那是 $\\cos C$；$\\cos B = \\tfrac{11}{14}$。'
      } },
      { tex: 'R = \\tfrac72', correct: false, why: {
        en: 'Forgets the sine: $R = \\tfrac{a}{2\\sin A} = \\tfrac{7\\sqrt3}{3}$.',
        fr: 'Oublie le sinus : $R = \\tfrac{a}{2\\sin A} = \\tfrac{7\\sqrt3}{3}$.',
        es: 'Olvida el seno: $R = \\tfrac{a}{2\\sin A} = \\tfrac{7\\sqrt3}{3}$.',
        ja: '正弦を忘れています：$R = \\tfrac{a}{2\\sin A} = \\tfrac{7\\sqrt3}{3}$。',
        zh: '漏了正弦：$R = \\tfrac{a}{2\\sin A} = \\tfrac{7\\sqrt3}{3}$。'
      } },
      { tex: 'S_{\\triangle ABC} = \\tfrac{15}{2}', correct: false, why: {
        en: 'Forgets the factor $\\sin 120^\\circ$.',
        fr: 'Oublie le facteur $\\sin 120^\\circ$.',
        es: 'Olvida el factor $\\sin 120^\\circ$.',
        ja: '$\\sin 120^\\circ$ の因数を忘れています。',
        zh: '漏了因子 $\\sin 120^\\circ$。'
      } },
      { tex: 'AB + BC + CA = 14', correct: false, why: {
        en: 'The perimeter is $3 + 7 + 5 = 15$.',
        fr: 'Le périmètre vaut $3 + 7 + 5 = 15$.',
        es: 'El perímetro es $3 + 7 + 5 = 15$.',
        ja: '周の長さは $3 + 7 + 5 = 15$。',
        zh: '周长是 $3 + 7 + 5 = 15$。'
      } }
    ],
    steps: [
      { title: { en: 'Law of cosines', fr: 'Loi des cosinus', es: 'Teorema del coseno', ja: '余弦定理', zh: '余弦定理' }, lines: ['BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cos 120^\\circ', '= 9 + 25 - 2\\cdot 3\\cdot 5\\cdot\\left(-\\tfrac12\\right) = 49', 'BC = \\boxed{7}'], note: {
        en: 'An obtuse angle makes the opposite side longer than with a right angle.',
        fr: 'Un angle obtus rend le côté opposé plus long qu\'avec un angle droit.',
        es: 'Un ángulo obtuso hace el lado opuesto más largo que con un ángulo recto.',
        ja: '鈍角だと、直角のときより対辺が長くなります。',
        zh: '钝角使对边比直角时更长。'
      },
        fig(F) { F.draw(F.seg(g1B, g1C, 'hl yellow', 'over'), 900); F.layers.labels.querySelector('.muted')?.remove(); F.fadeIn(F.text(mid(g1B, g1C), '7', 'len yellow', 14, -6), 400, 700); } },
      { title: { en: 'Area', fr: 'Aire', es: 'Área', ja: '面積', zh: '面积' }, lines: ['S = \\tfrac12\\cdot AB\\cdot AC\\cdot\\sin 120^\\circ', '= \\tfrac12\\cdot 3\\cdot 5\\cdot\\tfrac{\\sqrt3}{2} = \\boxed{\\tfrac{15\\sqrt3}{4}}'], note: {
        en: 'The height from $C$ to line $AB$ is $5\\sin 60^\\circ = \\tfrac{5\\sqrt3}{2}$.',
        fr: 'La hauteur issue de $C$ sur la droite $AB$ vaut $5\\sin 60^\\circ = \\tfrac{5\\sqrt3}{2}$.',
        es: 'La altura desde $C$ a la recta $AB$ es $5\\sin 60^\\circ = \\tfrac{5\\sqrt3}{2}$.',
        ja: '$C$ から直線 $AB$ への高さは $5\\sin 60^\\circ = \\tfrac{5\\sqrt3}{2}$。',
        zh: '从 $C$ 到直线 $AB$ 的高是 $5\\sin 60^\\circ = \\tfrac{5\\sqrt3}{2}$。'
      },
        fig(F) { F.fadeIn(F.path([g1A, g1B, g1C], 'fill-yellow', 'fills'), 600); const foot = [g1C[0], g1A[1]]; F.draw(F.seg(g1A, foot, 'thin', 'over'), 500); F.draw(F.seg(g1C, foot, 'hl blue', 'over'), 700, 400); F.fadeIn(F.right(foot, [1, 0], [0, 1], 0.25, 'strong'), 300, 900); F.fadeIn(F.text(mid(g1C, foot), 'h', 'len it', -12, 0), 300, 1000); } },
      { title: {
        en: 'The other angles (law of sines)',
        fr: 'Les autres angles (loi des sinus)',
        es: 'Los otros ángulos (teorema del seno)',
        ja: '残りの角（正弦定理）',
        zh: '其余各角（正弦定理）'
      }, lines: ['\\sin B = \\frac{AC\\sin A}{BC} = \\frac{5\\sqrt3}{14},\\qquad \\sin C = \\frac{AB\\sin A}{BC} = \\frac{3\\sqrt3}{14}', '\\cos B = \\frac{7^2 + 3^2 - 5^2}{2\\cdot 7\\cdot 3} = \\frac{11}{14}'], note: {
        en: 'Several distractors swap $B$ and $C$.',
        fr: 'Plusieurs distracteurs échangent $B$ et $C$.',
        es: 'Varios distractores intercambian $B$ y $C$.',
        ja: 'いくつかの誤答は $B$ と $C$ を入れ替えています。',
        zh: '有几个干扰项把 $B$ 和 $C$ 弄反了。'
      } },
      { title: {
        en: 'Circumradius and perimeter',
        fr: 'Rayon circonscrit et périmètre',
        es: 'Radio circunscrito y perímetro',
        ja: '外接円の半径と周の長さ',
        zh: '外接圆半径与周长'
      }, lines: ['2R = \\frac{BC}{\\sin A} = \\frac{7}{\\sqrt3/2}\\ \\Rightarrow\\ R = \\frac{7\\sqrt3}{3}', 'AB + BC + CA = 3 + 7 + 5 = 15'] },
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

  PuzzleBank.define(lawCos);
})(PuzzleBank.kit);
