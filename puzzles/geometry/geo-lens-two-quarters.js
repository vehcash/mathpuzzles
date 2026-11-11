/* geometry · The leaf inside the square
   7 ── The lens between two quarter circles */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const lA = [0, 0], lB = [4, 0], lC = [4, 4], lD = [0, 4];
  const lensPts = () => { const p = []; for (let k = 0; k <= 30; k++) { const t = k / 30 * Math.PI / 2; p.push([4 * Math.cos(t), 4 * Math.sin(t)]); } for (let k = 0; k <= 30; k++) { const t = Math.PI + k / 30 * Math.PI / 2; p.push([4 + 4 * Math.cos(t), 4 + 4 * Math.sin(t)]); } return p; };
  const lens = {
    id: 'geo-lens-two-quarters', category: 'geometry', title: {
      en: 'The leaf inside the square',
      fr: 'La feuille dans le carré',
      es: 'La hoja dentro del cuadrado',
      ja: '正方形の中の葉',
      zh: '正方形中的叶形'
    }, source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["zhongkao", "amc"]
    },
    difficulty: 1,
    statement: {
      en: 'In square $ABCD$ with side $4$, two quarter circles of radius $4$ are drawn: one centred at $A$ and one centred at $C$, both from $B$ to $D$. <b>Which of the following equal the area of the shaded “leaf” between them?</b>',
      fr: 'Dans le carré $ABCD$ de côté $4$, on trace deux quarts de cercle de rayon $4$ : l\'un centré en $A$, l\'autre centré en $C$, tous deux de $B$ à $D$. <b>Lesquelles des valeurs suivantes sont égales à l\'aire de la « feuille » grisée entre eux ?</b>',
      es: 'En el cuadrado $ABCD$ de lado $4$ se dibujan dos cuartos de círculo de radio $4$: uno con centro en $A$ y otro con centro en $C$, ambos de $B$ a $D$. <b>¿Cuáles de los siguientes valores son iguales al área de la «hoja» sombreada entre ellos?</b>',
      ja: '1辺 $4$ の正方形 $ABCD$ に、半径 $4$ の四分円を2つかきます：1つは $A$ が中心、もう1つは $C$ が中心で、どちらも $B$ から $D$ まで。<b>次のうち、その間の影の付いた「葉形」の面積に等しいものはどれですか？</b>',
      zh: '在边长为 $4$ 的正方形 $ABCD$ 中，画两个半径为 $4$ 的四分之一圆：一个以 $A$ 为圆心，一个以 $C$ 为圆心，都从 $B$ 到 $D$。<b>下列哪些等于它们之间阴影“叶形”的面积？</b>'
    },
    figureText: {
      en: 'Square ABCD of side 4 (A bottom-left, C top-right). A quarter circle centred at A goes from B to D, another centred at C also from B to D; the leaf-shaped region between the two arcs is shaded.',
      fr: 'Carré ABCD de côté 4 (A en bas à gauche, C en haut à droite). Un quart de cercle centré en A va de B à D, un autre centré en C va aussi de B à D ; la région en forme de feuille entre les deux arcs est grisée.',
      es: 'Cuadrado ABCD de lado 4 (A abajo a la izquierda, C arriba a la derecha). Un cuarto de círculo con centro en A va de B a D, otro con centro en C también va de B a D; la región en forma de hoja entre los dos arcos está sombreada.',
      ja: '1辺 4 の正方形 ABCD（A は左下、C は右上）。A を中心とする四分円が B から D へ、C を中心とするもう1つの四分円も B から D へ。2つの弧の間の葉の形の部分に影が付いています。',
      zh: '边长为 4 的正方形 ABCD（A 在左下，C 在右上）。以 A 为圆心的四分之一圆从 B 到 D，以 C 为圆心的另一个也从 B 到 D；两段弧之间的叶形区域涂有阴影。'
    },
    hint: {
      en: 'The leaf is two circular segments cut off by the diagonal $BD$.',
      fr: 'La feuille est formée de deux segments circulaires découpés par la diagonale $BD$.',
      es: 'La hoja son dos segmentos circulares separados por la diagonal $BD$.',
      ja: '葉は対角線 $BD$ で切り取られた2つの弓形です。',
      zh: '叶形是被对角线 $BD$ 截出的两个弓形。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example inclusion–exclusion: two quarter circles minus the square), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple par inclusion–exclusion : deux quarts de cercle moins le carré), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo por inclusión–exclusión: dos cuartos de círculo menos el cuadrado), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば包除原理：四分円2つから正方形を引く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如容斥原理：两个四分之一圆减去正方形），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 4, h: 4, scale: 58, pad: 24 });
      F.path(lensPts(), 'fill-leaf', 'fills');
      F.path([lA, lB, lC, lD], 'tri');
      F.arc(lA, 4, 0, 90, 'conic', 'base'); F.arc(lC, 4, 180, 270, 'conic', 'base');
      [[lA, 'A', -10, 12], [lB, 'B', 10, 12], [lC, 'C', 10, -8], [lD, 'D', -10, -8]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.text(mid(lA, lB), '4', 'len', 0, 16);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'leaf': { fr: 'feuille', es: 'hoja', ja: '葉', zh: '叶形' },
      'segment': { fr: 'segment', es: 'segmento', ja: '線分', zh: '线段' }
    },
    options: [
      { tex: '8\\pi - 16', correct: true, why: {
        en: 'Two segments of $4\\pi - 8$ each.',
        fr: 'Deux segments de $4\\pi - 8$ chacun.',
        es: 'Dos segmentos de $4\\pi - 8$ cada uno.',
        ja: 'それぞれ $4\\pi - 8$ の弓形2つ。',
        zh: '两个弓形，各为 $4\\pi - 8$。'
      } },
      { tex: '2(4\\pi - 8)', correct: true, why: {
        en: 'The same number written as two segments.',
        fr: 'Le même nombre écrit comme deux segments.',
        es: 'El mismo número escrito como dos segmentos.',
        ja: '同じ数を2つの弓形として書いたもの。',
        zh: '同一个数写成两个弓形之和。'
      } },
      { tex: '16 - 4\\pi', correct: false, why: {
        en: 'That is the corner outside one quarter circle.',
        fr: 'C\'est le coin en dehors d\'un quart de cercle.',
        es: 'Eso es la esquina fuera de un cuarto de círculo.',
        ja: 'それは四分円の外側の角の部分です。',
        zh: '那是一个四分之一圆外的角落部分。'
      } },
      { tex: '4\\pi - 8', correct: false, why: {
        en: 'Only one of the two segments.',
        fr: 'Un seul des deux segments.',
        es: 'Solo uno de los dos segmentos.',
        ja: '2つの弓形のうち1つだけ。',
        zh: '只是两个弓形中的一个。'
      } },
      { tex: '4\\pi', correct: false, why: {
        en: 'One quarter circle.',
        fr: 'Un quart de cercle.',
        es: 'Un cuarto de círculo.',
        ja: '四分円1つ。',
        zh: '一个四分之一圆。'
      } },
      { tex: '8\\pi', correct: false, why: {
        en: 'Two quarter circles, without removing the square.',
        fr: 'Deux quarts de cercle, sans retirer le carré.',
        es: 'Dos cuartos de círculo, sin quitar el cuadrado.',
        ja: '正方形を引かずに四分円2つ分。',
        zh: '两个四分之一圆，没有减去正方形。'
      } },
      { tex: '16\\pi - 16', correct: false, why: {
        en: 'Uses full circles instead of quarter circles.',
        fr: 'Utilise des cercles entiers au lieu de quarts de cercle.',
        es: 'Usa círculos completos en lugar de cuartos de círculo.',
        ja: '四分円ではなく円全体を使っています。',
        zh: '用了整圆而不是四分之一圆。'
      } },
      { tex: '32 - 8\\pi', correct: false, why: {
        en: 'That is the unshaded part: $16 - (8\\pi - 16)$.',
        fr: 'C\'est la partie non grisée : $16 - (8\\pi - 16)$.',
        es: 'Eso es la parte sin sombrear: $16 - (8\\pi - 16)$.',
        ja: 'それは影のない部分：$16 - (8\\pi - 16)$。',
        zh: '那是未涂阴影的部分：$16 - (8\\pi - 16)$。'
      } }
    ],
    steps: [
      { title: { en: 'One quarter circle', fr: 'Un quart de cercle', es: 'Un cuarto de círculo', ja: '四分円1つ', zh: '一个四分之一圆' }, lines: ['\\tfrac14\\pi\\cdot 4^2 = 4\\pi'], fig(F) { const p = [lA]; for (let k = 0; k <= 30; k++) { const t = k / 30 * Math.PI / 2; p.push([4 * Math.cos(t), 4 * Math.sin(t)]); } F.fadeIn(F.path(p, 'fill-blue', 'over'), 700); } },
      { title: {
        en: 'Remove the triangle $ABD$',
        fr: 'Retirer le triangle $ABD$',
        es: 'Quitar el triángulo $ABD$',
        ja: '三角形 $ABD$ を除く',
        zh: '减去三角形 $ABD$'
      }, lines: ['S_{\\text{segment}} = 4\\pi - \\tfrac12\\cdot 4\\cdot 4 = 4\\pi - 8'], note: {
        en: 'The diagonal $BD$ cuts the leaf into two equal segments.',
        fr: 'La diagonale $BD$ coupe la feuille en deux segments égaux.',
        es: 'La diagonal $BD$ corta la hoja en dos segmentos iguales.',
        ja: '対角線 $BD$ は葉を2つの等しい弓形に分けます。',
        zh: '对角线 $BD$ 把叶形分成两个相等的弓形。'
      },
        fig(F) { F.draw(F.seg(lB, lD, 'hl pink', 'over'), 800); F.fadeIn(F.path([lA, lB, lD], 'fill-white', 'over'), 500, 600); } },
      { title: { en: 'Two segments', fr: 'Deux segments', es: 'Dos segmentos', ja: '2つの弓形', zh: '两个弓形' }, lines: ['S_{\\text{leaf}} = 2(4\\pi - 8) = \\boxed{8\\pi - 16} \\approx 9.13'], fig(F) { F.fadeIn(F.path(lensPts(), 'fill-yellow', 'over'), 700); } },
      { title: {
        en: 'Check with inclusion–exclusion',
        fr: 'Vérifier par inclusion–exclusion',
        es: 'Comprobar por inclusión–exclusión',
        ja: '包除原理で確認',
        zh: '用容斥原理验证'
      }, lines: ['4\\pi + 4\\pi - 16 = 8\\pi - 16 \\ \\checkmark'], note: {
        en: 'Both quarter circles cover the square once and the leaf twice.',
        fr: 'Les deux quarts de cercle couvrent le carré une fois et la feuille deux fois.',
        es: 'Los dos cuartos de círculo cubren el cuadrado una vez y la hoja dos veces.',
        ja: '2つの四分円で正方形は1回、葉の部分は2回覆われます。',
        zh: '两个四分之一圆把正方形覆盖一次，把叶形覆盖两次。'
      } },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Two options are the same area written differently.',
        fr: 'Deux options sont la même aire écrite différemment.',
        es: 'Dos opciones son la misma área escrita de forma distinta.',
        ja: '2つの選択肢は同じ面積を別の形で書いたものです。',
        zh: '有两个选项是同一面积的不同写法。'
      } }
    ]
  };

  PuzzleBank.define(lens);
})(PuzzleBank.kit);
