/* geometry · The circle inside the right triangle
   Puzzle 1: incircle of a 6-8-10 right triangle */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const A = [0, 6], B = [8, 0], C = [0, 0], I = [2, 2];
  const T1 = [0, 2], T2 = [2, 0], T3 = [3.2, 3.6];

  const incircle = {
    id: 'geo-incircle-6-8-10',
    category: 'geometry',
    title: {
      en: 'The circle inside the right triangle',
      fr: 'Le cercle dans le triangle rectangle',
      es: 'La circunferencia dentro del triángulo rectángulo',
      ja: '直角三角形の中の円',
      zh: '直角三角形中的圆'
    },
    difficulty: 2,
    statement: {
      en: 'Triangle $ABC$ has a right angle at $C$, with $AC = 6$ and $BC = 8$. A circle with centre $I$ is inscribed in the triangle, touching all three sides. <b>Which of the following equal the radius $r$ of the circle?</b>',
      fr: 'Le triangle $ABC$ est rectangle en $C$, avec $AC = 6$ et $BC = 8$. Un cercle de centre $I$ est inscrit dans le triangle et touche les trois côtés. <b>Lesquelles des valeurs suivantes sont égales au rayon $r$ du cercle ?</b>',
      es: 'El triángulo $ABC$ tiene un ángulo recto en $C$, con $AC = 6$ y $BC = 8$. Una circunferencia de centro $I$ está inscrita en el triángulo y toca los tres lados. <b>¿Cuáles de los siguientes son iguales al radio $r$ de la circunferencia?</b>',
      ja: '三角形 $ABC$ は $C$ で直角で、$AC = 6$, $BC = 8$ です。中心 $I$ の円が三角形に内接し、3辺すべてに接しています。<b>次のうち円の半径 $r$ に等しいものはどれですか？</b>',
      zh: '三角形 $ABC$ 在 $C$ 处为直角，$AC = 6$，$BC = 8$。以 $I$ 为圆心的圆内切于三角形，与三边都相切。<b>下列哪些等于该圆的半径 $r$？</b>'
    },
    figureText: {
      en: 'Right triangle ABC with the right angle at C. Leg AC = 6 is vertical, leg BC = 8 is horizontal, the hypotenuse AB is not given. A circle with centre I is inscribed in the triangle (tangent to all three sides); its radius r is marked from I down to side BC.',
      fr: 'Triangle ABC rectangle en C. Le côté AC = 6 est vertical, le côté BC = 8 est horizontal, l\'hypoténuse AB n\'est pas donnée. Un cercle de centre I est inscrit dans le triangle (tangent aux trois côtés) ; son rayon r est marqué de I jusqu\'au côté BC.',
      es: 'Triángulo ABC rectángulo en C. El cateto AC = 6 es vertical, el cateto BC = 8 es horizontal, la hipotenusa AB no se da. Una circunferencia de centro I está inscrita en el triángulo (tangente a los tres lados); su radio r está marcado desde I hasta el lado BC.',
      ja: 'C で直角の直角三角形 ABC。辺 AC = 6 は垂直、辺 BC = 8 は水平で、斜辺 AB は与えられていません。中心 I の円が三角形に内接し（3辺すべてに接する）、半径 r が I から辺 BC まで示されています。',
      zh: '直角三角形 ABC，直角在 C。直角边 AC = 6 竖直，直角边 BC = 8 水平，斜边 AB 未给出。以 I 为圆心的圆内切于三角形（与三边都相切）；半径 r 从 I 画到边 BC。'
    },
    aiHint: {
      en: 'Please use a different method from "area = r × semiperimeter" if you can (for example coordinates, tangent lengths, or trigonometry), show every step, then check each option and say which ones are correct.',
      fr: 'Utilise une autre méthode que « aire = r × demi-périmètre » si possible (par exemple des coordonnées, les longueurs des tangentes ou la trigonométrie), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Usa un método distinto de «área = r × semiperímetro» si puedes (por ejemplo coordenadas, longitudes de tangentes o trigonometría), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば「面積 = r × 半周長」以外の方法で解いてください（例えば座標、接線の長さ、三角比）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用“面积 = r × 半周长”以外的方法求解（例如坐标法、切线长或三角函数），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    hint: {
      en: 'Join $I$ to the three vertices: the triangle splits into three triangles whose heights are all $r$.',
      fr: 'Relions $I$ aux trois sommets : le triangle se découpe en trois triangles qui ont tous pour hauteur $r$.',
      es: 'Unimos $I$ con los tres vértices: el triángulo se divide en tres triángulos cuyas alturas son todas $r$.',
      ja: '$I$ と3つの頂点を結ぶと、三角形は高さがすべて $r$ の3つの三角形に分かれます。',
      zh: '把 $I$ 与三个顶点相连：三角形被分成三个高都为 $r$ 的三角形。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 6, scale: 36, pad: 34 });
      F.path([A, B, C], 'tri');
      F.right(C, [1, 0], [0, 1], 0.5);
      const ic = F.circle(I, 2, 'incircle');
      F.seg(I, T2, 'radius');
      F.dot(I, 'center');
      F.text(A, 'A', 'pt', -14, -6); F.text(B, 'B', 'pt', 12, 8); F.text(C, 'C', 'pt', -13, 9);
      F.text(I, 'I', 'pt small', -12, -8);
      F.text(mid(A, C), '6', 'len', -16, 0); F.text(mid(B, C), '8', 'len', 0, 18);
      F.text(mid(I, T2), 'r', 'len it', 10, 0);
      F.text(mid(A, B), '?', 'len muted', 14, -12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'Area 24': { fr: 'Aire 24', es: 'Área 24', ja: '面積 24', zh: '面积 24' }
    },
    options: [
      { tex: 'r = 2', correct: true, why: {
        en: 'This is the inradius.',
        fr: 'C\'est le rayon du cercle inscrit.',
        es: 'Este es el radio de la circunferencia inscrita.',
        ja: 'これは内接円の半径です。',
        zh: '这就是内切圆半径。'
      } },
      { tex: 'r = \\dfrac{24}{12}', correct: true, why: {
        en: 'Area ÷ semiperimeter $=\\tfrac{24}{12}=2$.',
        fr: 'Aire ÷ demi-périmètre $=\\tfrac{24}{12}=2$.',
        es: 'Área ÷ semiperímetro $=\\tfrac{24}{12}=2$.',
        ja: '面積 ÷ 半周長 $=\\tfrac{24}{12}=2$。',
        zh: '面积 ÷ 半周长 $=\\tfrac{24}{12}=2$。'
      } },
      { tex: 'r = 2.4', correct: false, why: {
        en: 'Half of the altitude from $C$ ($4.8 \\div 2$).',
        fr: 'La moitié de la hauteur issue de $C$ ($4.8 \\div 2$).',
        es: 'La mitad de la altura desde $C$ ($4.8 \\div 2$).',
        ja: '$C$ からの高さの半分 ($4.8 \\div 2$)。',
        zh: '从 $C$ 出发的高的一半（$4.8 \\div 2$）。'
      } },
      { tex: 'r = 4.8', correct: false, why: {
        en: 'The altitude from $C$ to $AB$: $\\tfrac{6\\cdot 8}{10}$.',
        fr: 'La hauteur issue de $C$ sur $AB$ : $\\tfrac{6\\cdot 8}{10}$.',
        es: 'La altura desde $C$ sobre $AB$: $\\tfrac{6\\cdot 8}{10}$.',
        ja: '$C$ から $AB$ への高さ：$\\tfrac{6\\cdot 8}{10}$。',
        zh: '从 $C$ 到 $AB$ 的高：$\\tfrac{6\\cdot 8}{10}$。'
      } },
      { tex: 'r = 5', correct: false, why: {
        en: 'The circumradius $= \\tfrac{AB}{2}$.',
        fr: 'Le rayon du cercle circonscrit $= \\tfrac{AB}{2}$.',
        es: 'El radio circunscrito $= \\tfrac{AB}{2}$.',
        ja: '外接円の半径 $= \\tfrac{AB}{2}$。',
        zh: '外接圆半径 $= \\tfrac{AB}{2}$。'
      } },
      { tex: 'r = 3', correct: false, why: {
        en: 'Half of $AC$ — not related to the incircle.',
        fr: 'La moitié de $AC$ — sans rapport avec le cercle inscrit.',
        es: 'La mitad de $AC$ — no tiene que ver con la circunferencia inscrita.',
        ja: '$AC$ の半分 — 内接円とは無関係です。',
        zh: '$AC$ 的一半 —— 与内切圆无关。'
      } },
      { tex: 'r = \\dfrac{12}{7}', correct: false, why: {
        en: '$\\tfrac{24}{14}$: divides the area by $AC+BC$ instead of the semiperimeter.',
        fr: '$\\tfrac{24}{14}$ : divise l\'aire par $AC+BC$ au lieu du demi-périmètre.',
        es: '$\\tfrac{24}{14}$: divide el área entre $AC+BC$ en lugar del semiperímetro.',
        ja: '$\\tfrac{24}{14}$：面積を半周長ではなく $AC+BC$ で割っています。',
        zh: '$\\tfrac{24}{14}$：用面积除以 $AC+BC$，而不是半周长。'
      } },
      { tex: 'r = \\sqrt{5}', correct: false, why: {
        en: 'The distance from $I$ to the midpoint of $AB$.',
        fr: 'La distance de $I$ au milieu de $AB$.',
        es: 'La distancia de $I$ al punto medio de $AB$.',
        ja: '$I$ から $AB$ の中点までの距離。',
        zh: '$I$ 到 $AB$ 中点的距离。'
      } }
    ],
    steps: [
      {
        title: { en: 'Find the hypotenuse', fr: 'Trouver l\'hypoténuse', es: 'Hallar la hipotenusa', ja: '斜辺を求める', zh: '求斜边' },
        lines: ['AB = \\sqrt{AC^2 + BC^2}', '= \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10'],
        note: {
          en: 'Pythagoras, because the right angle is at $C$.',
          fr: 'Pythagore, car l\'angle droit est en $C$.',
          es: 'Pitágoras, porque el ángulo recto está en $C$.',
          ja: '直角が $C$ にあるので三平方の定理。',
          zh: '勾股定理，因为直角在 $C$。'
        },
        fig(F) { F.draw(F.seg(A, B, 'hl yellow', 'over'), 900); F.fadeIn(F.text(mid(A, B), '10', 'len yellow', 16, -12, 'labels'), 400, 700); F.layers.labels.querySelector('.muted')?.remove(); }
      },
      {
        title: { en: 'Area of the triangle', fr: 'Aire du triangle', es: 'Área del triángulo', ja: '三角形の面積', zh: '三角形的面积' },
        lines: ['[ABC] = \\tfrac{1}{2}\\cdot AC \\cdot BC', '= \\tfrac{1}{2}\\cdot 6 \\cdot 8 = 24'],
        note: {
          en: 'The two legs are perpendicular, so one is the height of the other.',
          fr: 'Les deux côtés de l\'angle droit sont perpendiculaires, donc l\'un est la hauteur relative à l\'autre.',
          es: 'Los dos catetos son perpendiculares, así que uno es la altura del otro.',
          ja: '直角をはさむ2辺は垂直なので、一方が他方に対する高さになります。',
          zh: '两条直角边互相垂直，所以一条是另一条上的高。'
        },
        fig(F) { F.fadeIn(F.path([A, B, C], 'fill-yellow', 'fills'), 700); F.fadeIn(F.text([5.1, 1.0], 'Area 24', 'len yellow small', 0, 0, 'fills'), 500, 500); }
      },
      {
        title: {
          en: 'Cut the triangle at the centre $I$',
          fr: 'Découper le triangle depuis le centre $I$',
          es: 'Dividir el triángulo desde el centro $I$',
          ja: '中心 $I$ で三角形を分割',
          zh: '从内心 $I$ 分割三角形'
        },
        lines: ['[ABC] = [IBC] + [ICA] + [IAB]', '= \\tfrac12 r\\cdot BC + \\tfrac12 r\\cdot CA + \\tfrac12 r\\cdot AB', '= r \\cdot \\dfrac{BC + CA + AB}{2} = r\\cdot s'],
        note: {
          en: 'Each radius meets its side at a right angle, so all three small triangles have height $r$.',
          fr: 'Chaque rayon rencontre son côté à angle droit, donc les trois petits triangles ont tous pour hauteur $r$.',
          es: 'Cada radio corta su lado en ángulo recto, así que los tres triángulos pequeños tienen altura $r$.',
          ja: '各半径は接点で辺と直交するので、3つの小さな三角形の高さはすべて $r$ です。',
          zh: '每条半径都与对应的边垂直，所以三个小三角形的高都是 $r$。'
        },
        fig(F) {
          F.clear('fills');
          F.fadeIn(F.path([I, B, C], 'fill-blue', 'fills'), 600);
          F.fadeIn(F.path([I, C, A], 'fill-pink', 'fills'), 600, 250);
          F.fadeIn(F.path([I, A, B], 'fill-green', 'fills'), 600, 500);
          [[I, A], [I, B], [I, C]].forEach(([p, q], i) => F.draw(F.seg(p, q, 'thin', 'over'), 700, 200 * i));
          [T1, T2, T3].forEach((t, i) => F.draw(F.seg(I, t, 'radius strong', 'over'), 600, 700 + 150 * i));
          F.fadeIn(F.right(T1, unit(T1, I), [0, 1], 0.35, 'strong'), 400, 1200);
          F.fadeIn(F.right(T2, unit(T2, I), [1, 0], 0.35, 'strong'), 400, 1250);
          F.fadeIn(F.right(T3, unit(T3, I), unit(T3, B), 0.35, 'strong'), 400, 1300);
        }
      },
      {
        title: { en: 'Semiperimeter', fr: 'Demi-périmètre', es: 'Semiperímetro', ja: '半周長', zh: '半周长' },
        lines: ['s = \\dfrac{AC + BC + AB}{2} = \\dfrac{6 + 8 + 10}{2} = 12'],
        note: {
          en: 'Half of the distance all the way around the triangle.',
          fr: 'La moitié du tour complet du triangle.',
          es: 'La mitad de la distancia que da la vuelta completa al triángulo.',
          ja: '三角形の周の長さの半分。',
          zh: '三角形周长的一半。'
        },
        fig(F) { F.draw(F.path([C, B, A], 'hl blue', 'over'), 1300); }
      },
      {
        title: { en: 'Solve for $r$', fr: 'Résoudre en $r$', es: 'Despejar $r$', ja: '$r$ について解く', zh: '求 $r$' },
        lines: ['r\\cdot s = [ABC]', 'r = \\dfrac{[ABC]}{s} = \\dfrac{24}{12} = \\boxed{2}'],
        note: {
          en: 'So the circle has radius 2 and its centre is at distance 2 from both legs.',
          fr: 'Le cercle a donc pour rayon 2 et son centre est à distance 2 des deux côtés de l\'angle droit.',
          es: 'Así que la circunferencia tiene radio 2 y su centro está a distancia 2 de ambos catetos.',
          ja: 'よって円の半径は 2 で、中心は両方の直角をはさむ辺から距離 2 にあります。',
          zh: '所以圆的半径为 2，圆心到两条直角边的距离都是 2。'
        },
        fig(F) {
          F.clear('fills');
          const c = F.circle(I, 2, 'incircle solid', 'over'); F.draw(c, 1200);
          F.fadeIn(F.text([2, 2], 'r = 2', 'len yellow', 0, 22), 500, 900);
        }
      },
      {
        title: {
          en: 'Cross-check with tangent lengths',
          fr: 'Vérification par les longueurs des tangentes',
          es: 'Comprobación con las longitudes de las tangentes',
          ja: '接線の長さで検算',
          zh: '用切线长验证'
        },
        lines: ['CT_1 = CT_2 = r,\\quad AT_1 = AT_3,\\quad BT_2 = BT_3', '(6 - r) + (8 - r) = AB = 10', 'r = \\dfrac{6 + 8 - 10}{2} = 2 \\;\\checkmark'],
        note: {
          en: 'Two tangent segments from the same point are equal.',
          fr: 'Deux segments tangents issus d\'un même point sont égaux.',
          es: 'Los dos segmentos tangentes desde un mismo punto son iguales.',
          ja: '同じ点から引いた2本の接線の長さは等しい。',
          zh: '从同一点引出的两条切线段相等。'
        },
        fig(F) {
          const segs = [[C, T1, 'pink'], [C, T2, 'pink'], [A, T1, 'blue'], [A, T3, 'blue'], [B, T2, 'green'], [B, T3, 'green']];
          segs.forEach(([p, q, col], i) => F.draw(F.seg(p, q, 'hl ' + col, 'over'), 600, i * 160));
          [[mid(C, T1), '2', -14, 0], [mid(C, T2), '2', 0, 16], [mid(A, T1), '4', -14, 0], [mid(A, T3), '4', 14, -10], [mid(B, T2), '6', 0, 16], [mid(B, T3), '6', 14, -6]]
            .forEach(([p, t, dx, dy], i) => F.fadeIn(F.text(p, t, 'len small', dx, dy), 300, 900 + i * 90));
          ['T₁', 'T₂', 'T₃'].forEach((n, i) => F.fadeIn(F.text([T1, T2, T3][i], n, 'pt tiny', [12, 10, -6][i], [0, -10, -14][i]), 300, 1300));
        }
      },
      {
        title: {
          en: 'Check every option',
          fr: 'Vérifier chaque option',
          es: 'Comprobar cada opción',
          ja: '各選択肢を確認',
          zh: '逐项检查选项'
        },
        options: true,
        note: {
          en: 'Exactly two of the eight options equal $r$.',
          fr: 'Exactement deux des huit options sont égales à $r$.',
          es: 'Exactamente dos de las ocho opciones son iguales a $r$.',
          ja: '8つの選択肢のうちちょうど2つが $r$ に等しい。',
          zh: '八个选项中恰有两个等于 $r$。'
        }
      }
    ]
  };

  PuzzleBank.define(incircle);
})(PuzzleBank.kit);
