/* geometry · The regular tetrahedron and its sphere
   10 ── Regular tetrahedron: volume and circumscribed sphere */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const tB = [0.2, 0.3], tC = [2.6, 0.3], tD = [1.7, 1.1], tO = [(tB[0] + tC[0] + tD[0]) / 3, (tB[1] + tC[1] + tD[1]) / 3], tA = [tO[0], tO[1] + 2.25];
  const tS = lerp(tA, tO, 0.75);
  const tetra = {
    id: 'geo-regular-tetrahedron', category: 'geometry', title: {
      en: 'The regular tetrahedron and its sphere',
      fr: 'Le tétraèdre régulier et sa sphère',
      es: 'El tetraedro regular y su esfera',
      ja: '正四面体とその外接球',
      zh: '正四面体及其外接球'
    }, difficulty: 3,
    statement: {
      en: 'A regular tetrahedron $ABCD$ has all edges equal to $2$. <b>Which of the following are true?</b> ($V$ is its volume and $R$ the radius of its circumscribed sphere.)',
      fr: 'Un tétraèdre régulier $ABCD$ a toutes ses arêtes égales à $2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b> ($V$ est son volume et $R$ le rayon de sa sphère circonscrite.)',
      es: 'Un tetraedro regular $ABCD$ tiene todas sus aristas iguales a $2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b> ($V$ es su volumen y $R$ el radio de su esfera circunscrita.)',
      ja: '正四面体 $ABCD$ のすべての辺の長さは $2$ です。<b>次のうち正しいものはどれですか？</b>（$V$ は体積、$R$ は外接球の半径。）',
      zh: '正四面体 $ABCD$ 的所有棱长都等于 $2$。<b>下列说法中正确的是？</b>（$V$ 为其体积，$R$ 为其外接球半径。）'
    },
    figureText: {
      en: 'A regular tetrahedron with apex A above the triangular base BCD (D is at the back, its edges drawn dashed). O is the centre of the base; the height AO is dashed. The centre of the circumscribed sphere lies on AO.',
      fr: 'Un tétraèdre régulier de sommet A au-dessus de la base triangulaire BCD (D est à l\'arrière, ses arêtes en pointillés). O est le centre de la base ; la hauteur AO est en pointillés. Le centre de la sphère circonscrite est sur AO.',
      es: 'Un tetraedro regular con vértice A sobre la base triangular BCD (D está detrás, con sus aristas discontinuas). O es el centro de la base; la altura AO es discontinua. El centro de la esfera circunscrita está en AO.',
      ja: '三角形の底面 BCD の上に頂点 A がある正四面体（D は奥にあり、その辺は破線）。O は底面の中心で、高さ AO は破線。外接球の中心は AO 上にあります。',
      zh: '顶点 A 位于三角形底面 BCD 上方的正四面体（D 在后方，其棱用虚线画出）。O 是底面中心；高 AO 用虚线画出。外接球球心在 AO 上。'
    },
    hint: {
      en: 'The foot $O$ of the height is the centroid of the base, with $BO = \\tfrac{2\\sqrt3}{3}$.',
      fr: 'Le pied $O$ de la hauteur est le centre de gravité de la base, avec $BO = \\tfrac{2\\sqrt3}{3}$.',
      es: 'El pie $O$ de la altura es el baricentro de la base, con $BO = \\tfrac{2\\sqrt3}{3}$.',
      ja: '高さの足 $O$ は底面の重心で、$BO = \\tfrac{2\\sqrt3}{3}$。',
      zh: '高的垂足 $O$ 是底面的重心，$BO = \\tfrac{2\\sqrt3}{3}$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example by placing the tetrahedron inside a cube of edge √2), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple en plaçant le tétraèdre dans un cube d\'arête √2), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo colocando el tetraedro dentro de un cubo de arista √2), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば正四面体を辺 √2 の立方体に入れる）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如把正四面体放进棱长为 √2 的正方体中），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.8, h: 2.95, scale: 82, pad: 22 });
      F.seg(tA, tB); F.seg(tA, tC); F.seg(tB, tC);
      F.seg(tA, tD, 'hidden-edge'); F.seg(tB, tD, 'hidden-edge'); F.seg(tC, tD, 'hidden-edge');
      [[tA, 'A', 0, -10], [tB, 'B', -10, 10], [tC, 'C', 10, 10], [tD, 'D', 12, -6]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.text(mid(tB, tC), '2', 'len', 0, 14);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'centre': { fr: 'centre', es: 'centro', ja: '中心', zh: '中心' },
      'on': { fr: 'sur', es: 'sobre', ja: '上', zh: '在' },
      'surface area': { fr: 'aire totale', es: 'área total', ja: '表面積', zh: '表面积' }
    },
    options: [
      { tex: 'V = \\tfrac{2\\sqrt2}{3}', correct: true, why: '$\\tfrac13\\cdot\\sqrt3\\cdot\\tfrac{2\\sqrt6}{3}$.' },
      { tex: 'R = \\tfrac{\\sqrt6}{2}', correct: true, why: {
        en: 'From $R^2 = (h - R)^2 + BO^2$.',
        fr: 'D\'après $R^2 = (h - R)^2 + BO^2$.',
        es: 'De $R^2 = (h - R)^2 + BO^2$.',
        ja: '$R^2 = (h - R)^2 + BO^2$ より。',
        zh: '由 $R^2 = (h - R)^2 + BO^2$ 得到。'
      } },
      { tex: 'V = 2\\sqrt2', correct: false, why: {
        en: 'Forgets the $\\tfrac13$ of a pyramid.',
        fr: 'Oublie le $\\tfrac13$ de la pyramide.',
        es: 'Olvida el $\\tfrac13$ de la pirámide.',
        ja: '錐体の $\\tfrac13$ を忘れています。',
        zh: '漏了棱锥的 $\\tfrac13$。'
      } },
      { tex: 'R = \\tfrac{\\sqrt6}{6}', correct: false, why: {
        en: 'That is the inscribed sphere’s radius $r = \\tfrac{R}{3}$.',
        fr: 'C\'est le rayon de la sphère inscrite $r = \\tfrac{R}{3}$.',
        es: 'Eso es el radio de la esfera inscrita $r = \\tfrac{R}{3}$.',
        ja: 'それは内接球の半径 $r = \\tfrac{R}{3}$ です。',
        zh: '那是内切球半径 $r = \\tfrac{R}{3}$。'
      } },
      { tex: 'h = \\sqrt6', correct: false, why: {
        en: 'The height is $\\tfrac{2\\sqrt6}{3}$.',
        fr: 'La hauteur vaut $\\tfrac{2\\sqrt6}{3}$.',
        es: 'La altura es $\\tfrac{2\\sqrt6}{3}$.',
        ja: '高さは $\\tfrac{2\\sqrt6}{3}$。',
        zh: '高是 $\\tfrac{2\\sqrt6}{3}$。'
      } },
      { tex: 'R = \\sqrt3', correct: false, why: {
        en: 'That is half the space diagonal of a cube of edge 2, not this solid.',
        fr: 'C\'est la moitié de la grande diagonale d\'un cube d\'arête 2, pas de ce solide.',
        es: 'Eso es la mitad de la diagonal de un cubo de arista 2, no de este sólido.',
        ja: 'それは辺 2 の立方体の対角線の半分で、この立体のものではありません。',
        zh: '那是棱长为 2 的正方体体对角线的一半，不是这个立体的。'
      } },
      { tex: '\\text{surface area} = 2\\sqrt3', correct: false, why: {
        en: 'Four faces of $\\sqrt3$: $4\\sqrt3$.',
        fr: 'Quatre faces de $\\sqrt3$ : $4\\sqrt3$.',
        es: 'Cuatro caras de $\\sqrt3$: $4\\sqrt3$.',
        ja: '$\\sqrt3$ の面が4つ：$4\\sqrt3$。',
        zh: '四个面积为 $\\sqrt3$ 的面：$4\\sqrt3$。'
      } },
      { tex: 'V = \\tfrac{\\sqrt2}{3}', correct: false, why: {
        en: 'Uses half the height.',
        fr: 'Utilise la moitié de la hauteur.',
        es: 'Usa la mitad de la altura.',
        ja: '高さの半分を使っています。',
        zh: '用了一半的高。'
      } }
    ],
    steps: [
      { title: {
        en: 'Base area and centroid',
        fr: 'Aire de la base et centre de gravité',
        es: 'Área de la base y baricentro',
        ja: '底面積と重心',
        zh: '底面积与重心'
      }, lines: ['S_{BCD} = \\tfrac{\\sqrt3}{4}\\cdot 2^2 = \\sqrt3', 'BO = \\tfrac23\\cdot\\tfrac{\\sqrt3}{2}\\cdot 2 = \\tfrac{2\\sqrt3}{3}'], note: {
        en: 'In a regular tetrahedron the apex is above the centroid of the base.',
        fr: 'Dans un tétraèdre régulier, le sommet est au-dessus du centre de gravité de la base.',
        es: 'En un tetraedro regular el vértice está sobre el baricentro de la base.',
        ja: '正四面体では頂点は底面の重心の真上にあります。',
        zh: '在正四面体中，顶点位于底面重心的正上方。'
      },
        fig(F) { F.fadeIn(F.path([tB, tC, tD], 'fill-blue', 'fills'), 600); F.fadeIn(F.dot(tO, 'center'), 300, 400); F.fadeIn(F.text(tO, 'O', 'pt small', 10, 8), 300, 500); F.draw(F.seg(tB, tO, 'thin', 'over'), 500, 600); } },
      { title: { en: 'Height', fr: 'Hauteur', es: 'Altura', ja: '高さ', zh: '高' }, lines: ['h = AO = \\sqrt{AB^2 - BO^2} = \\sqrt{4 - \\tfrac43} = \\tfrac{2\\sqrt6}{3}'],
        fig(F) { F.draw(F.seg(tA, tO, 'hl pink', 'over'), 800); F.fadeIn(F.right(tO, [-0.6, -0.15], [0, 1], 0.14, 'strong'), 300, 700); } },
      { title: { en: 'Volume', fr: 'Volume', es: 'Volumen', ja: '体積', zh: '体积' }, lines: ['V = \\tfrac13\\cdot S_{BCD}\\cdot h = \\tfrac13\\cdot\\sqrt3\\cdot\\tfrac{2\\sqrt6}{3} = \\boxed{\\tfrac{2\\sqrt2}{3}}'] },
      { title: { en: 'Circumscribed sphere', fr: 'Sphère circonscrite', es: 'Esfera circunscrita', ja: '外接球', zh: '外接球' }, lines: ['\\text{centre } S \\text{ on } AO:\\quad SA = SB = R', 'R^2 = (h - R)^2 + BO^2\\ \\Rightarrow\\ 2hR = h^2 + BO^2 = \\tfrac83 + \\tfrac43 = 4', 'R = \\frac{2}{h} = \\frac{3}{\\sqrt6} = \\boxed{\\tfrac{\\sqrt6}{2}}'], note: {
        en: 'Check: $\\tfrac{\\sqrt6}{2} = \\tfrac34 h$ — the centre divides the height $3 : 1$.',
        fr: 'Vérification : $\\tfrac{\\sqrt6}{2} = \\tfrac34 h$ — le centre partage la hauteur dans le rapport $3 : 1$.',
        es: 'Comprobación: $\\tfrac{\\sqrt6}{2} = \\tfrac34 h$ — el centro divide la altura en razón $3 : 1$.',
        ja: '確認：$\\tfrac{\\sqrt6}{2} = \\tfrac34 h$ — 中心は高さを $3 : 1$ に分けます。',
        zh: '验证：$\\tfrac{\\sqrt6}{2} = \\tfrac34 h$ —— 球心把高分成 $3 : 1$。'
      },
        fig(F) { F.fadeIn(F.dot(tS, 'center'), 300); F.fadeIn(F.text(tS, 'S', 'pt small', 10, -4), 300, 200); F.draw(F.seg(tS, tB, 'radius strong', 'over'), 700, 300); F.fadeIn(F.text(mid(tS, tB), 'R', 'len it', -8, -8), 300, 900); } },
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

  PuzzleBank.define(tetra);
})(PuzzleBank.kit);
