/* geometry · A dot product in the square
   5 ── Vectors in a square (none of the options is right) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const vA = [0, 0], vB = [2, 0], vC = [2, 2], vD = [0, 2], vE = [1, 2];
  const vectors = {
    id: 'geo-vector-dot-square', category: 'geometry', title: {
      en: 'A dot product in the square',
      fr: 'Un produit scalaire dans le carré',
      es: 'Un producto escalar en el cuadrado',
      ja: '正方形の中の内積',
      zh: '正方形中的数量积'
    }, difficulty: 1,
    statement: {
      en: 'Square $ABCD$ has side $2$, and $E$ is the midpoint of $CD$. <b>What is $\\overrightarrow{AE}\\cdot\\overrightarrow{BD}$?</b>',
      fr: 'Le carré $ABCD$ a pour côté $2$, et $E$ est le milieu de $CD$. <b>Que vaut $\\overrightarrow{AE}\\cdot\\overrightarrow{BD}$ ?</b>',
      es: 'El cuadrado $ABCD$ tiene lado $2$, y $E$ es el punto medio de $CD$. <b>¿Cuánto vale $\\overrightarrow{AE}\\cdot\\overrightarrow{BD}$?</b>',
      ja: '正方形 $ABCD$ の1辺は $2$、$E$ は $CD$ の中点です。<b>$\\overrightarrow{AE}\\cdot\\overrightarrow{BD}$ はいくらですか？</b>',
      zh: '正方形 $ABCD$ 的边长为 $2$，$E$ 是 $CD$ 的中点。<b>$\\overrightarrow{AE}\\cdot\\overrightarrow{BD}$ 等于多少？</b>'
    },
    figureText: {
      en: 'Square ABCD with side 2: A bottom-left, B bottom-right, C top-right, D top-left. E is the midpoint of the top side CD. Vectors AE and BD are drawn as arrows.',
      fr: 'Carré ABCD de côté 2 : A en bas à gauche, B en bas à droite, C en haut à droite, D en haut à gauche. E est le milieu du côté supérieur CD. Les vecteurs AE et BD sont dessinés en flèches.',
      es: 'Cuadrado ABCD de lado 2: A abajo a la izquierda, B abajo a la derecha, C arriba a la derecha, D arriba a la izquierda. E es el punto medio del lado superior CD. Los vectores AE y BD están dibujados como flechas.',
      ja: '1辺 2 の正方形 ABCD：A 左下、B 右下、C 右上、D 左上。E は上の辺 CD の中点。ベクトル AE と BD が矢印で描かれています。',
      zh: '边长为 2 的正方形 ABCD：A 左下，B 右下，C 右上，D 左上。E 是上边 CD 的中点。向量 AE 和 BD 用箭头画出。'
    },
    hint: {
      en: 'Put $A$ at the origin, $B = (2,0)$, $D = (0,2)$.',
      fr: 'Plaçons $A$ à l\'origine, $B = (2,0)$, $D = (0,2)$.',
      es: 'Ponemos $A$ en el origen, $B = (2,0)$, $D = (0,2)$.',
      ja: '$A$ を原点、$B = (2,0)$, $D = (0,2)$ とします。',
      zh: '以 $A$ 为原点，$B = (2,0)$，$D = (0,2)$。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example by decomposing AE = AD + ½AB without coordinates), show every step, then check each option — it is possible that none of them is correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple en décomposant AE = AD + ½AB sans coordonnées), montre chaque étape, puis vérifie chaque option — il est possible qu\'aucune ne soit correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo descomponiendo AE = AD + ½AB sin coordenadas), muestra cada paso y luego comprueba cada opción — es posible que ninguna sea correcta.',
      ja: 'できれば別の方法で解いてください（例えば座標を使わずに AE = AD + ½AB と分解する）。すべての手順を示し、各選択肢を確認してください — どれも正しくない可能性もあります。',
      zh: '如果可以，请用另一种方法求解（例如不用坐标，把 AE 分解为 AD + ½AB），写出每一步，然后逐项检查选项 —— 有可能没有一个是正确的。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.4, h: 2.4, scale: 100, pad: 26 }); F.arrowDefs();
      const T = p => [p[0] + 0.2, p[1] + 0.2];
      F.path([vA, vB, vC, vD].map(T), 'tri');
      const a = F.seg(T(vA), T(vE), 'vec'); a.setAttribute('marker-end', 'url(#arrowhead)');
      const b = F.seg(T(vB), T(vD), 'vec two'); b.setAttribute('marker-end', 'url(#arrowhead)');
      [[vA, 'A', -10, 12], [vB, 'B', 10, 12], [vC, 'C', 10, -8], [vD, 'D', -10, -8], [vE, 'E', 0, -12]].forEach(([p, t, dx, dy]) => F.text(T(p), t, 'pt', dx, dy));
      F.dot(T(vE)); F.text(T(mid(vA, vB)), '2', 'len', 0, 16);
      return F;
    },
    options: [
      { tex: '-2', correct: false, why: {
        en: 'Sign error — the dot product is $+2$.',
        fr: 'Erreur de signe — le produit scalaire vaut $+2$.',
        es: 'Error de signo — el producto escalar es $+2$.',
        ja: '符号の誤り — 内積は $+2$ です。',
        zh: '符号错误 —— 数量积是 $+2$。'
      } },
      { tex: '0', correct: false, why: {
        en: '$AE$ and $BD$ are not perpendicular.',
        fr: '$AE$ et $BD$ ne sont pas perpendiculaires.',
        es: '$AE$ y $BD$ no son perpendiculares.',
        ja: '$AE$ と $BD$ は垂直ではありません。',
        zh: '$AE$ 与 $BD$ 不垂直。'
      } },
      { tex: '4', correct: false, why: {
        en: 'Only the $y$-parts: $2\\cdot 2$.',
        fr: 'Seulement les composantes $y$ : $2\\cdot 2$.',
        es: 'Solo las componentes $y$: $2\\cdot 2$.',
        ja: '$y$ 成分だけ：$2\\cdot 2$。',
        zh: '只算了 $y$ 分量：$2\\cdot 2$。'
      } },
      { tex: '1', correct: false, why: {
        en: 'Uses $E$ as the midpoint of $BC$ by mistake… and still slips.',
        fr: 'Prend $E$ comme milieu de $BC$ par erreur… et se trompe encore.',
        es: 'Toma $E$ como punto medio de $BC$ por error… y aun así se equivoca.',
        ja: '誤って $E$ を $BC$ の中点としています…さらに計算ミスも。',
        zh: '误把 $E$ 当成 $BC$ 的中点……而且还算错了。'
      } },
      { tex: '-4', correct: false, why: {
        en: 'Takes $\\overrightarrow{DB}$ and drops a term.',
        fr: 'Prend $\\overrightarrow{DB}$ et oublie un terme.',
        es: 'Toma $\\overrightarrow{DB}$ y pierde un término.',
        ja: '$\\overrightarrow{DB}$ を使い、項を1つ落としています。',
        zh: '用了 $\\overrightarrow{DB}$ 并漏掉一项。'
      } },
      { tex: '6', correct: false, why: {
        en: 'That is $\\overrightarrow{AE}\\cdot\\overrightarrow{AC}$.',
        fr: 'C\'est $\\overrightarrow{AE}\\cdot\\overrightarrow{AC}$.',
        es: 'Eso es $\\overrightarrow{AE}\\cdot\\overrightarrow{AC}$.',
        ja: 'それは $\\overrightarrow{AE}\\cdot\\overrightarrow{AC}$ です。',
        zh: '那是 $\\overrightarrow{AE}\\cdot\\overrightarrow{AC}$。'
      } },
      { tex: '\\sqrt5', correct: false, why: {
        en: 'That is $|\\overrightarrow{AE}|$.',
        fr: 'C\'est $|\\overrightarrow{AE}|$.',
        es: 'Eso es $|\\overrightarrow{AE}|$.',
        ja: 'それは $|\\overrightarrow{AE}|$ です。',
        zh: '那是 $|\\overrightarrow{AE}|$。'
      } },
      { tex: '2\\sqrt2', correct: false, why: {
        en: 'That is $|\\overrightarrow{BD}|$.',
        fr: 'C\'est $|\\overrightarrow{BD}|$.',
        es: 'Eso es $|\\overrightarrow{BD}|$.',
        ja: 'それは $|\\overrightarrow{BD}|$ です。',
        zh: '那是 $|\\overrightarrow{BD}|$。'
      } }
    ],
    steps: [
      { title: { en: 'Coordinates', fr: 'Coordonnées', es: 'Coordenadas', ja: '座標', zh: '坐标' }, lines: ['A(0,0),\\ B(2,0),\\ C(2,2),\\ D(0,2),\\ E(1,2)'], note: {
        en: '$E$ is halfway between $C(2,2)$ and $D(0,2)$.',
        fr: '$E$ est à mi-chemin entre $C(2,2)$ et $D(0,2)$.',
        es: '$E$ está a medio camino entre $C(2,2)$ y $D(0,2)$.',
        ja: '$E$ は $C(2,2)$ と $D(0,2)$ の中点です。',
        zh: '$E$ 是 $C(2,2)$ 与 $D(0,2)$ 的中点。'
      },
        fig(F) { [[vA, '(0,0)', -16, 26], [vB, '(2,0)', 16, 26], [vE, '(1,2)', 0, -28]].forEach(([p, t, dx, dy], i) => F.fadeIn(F.text([p[0] + 0.2, p[1] + 0.2], t, 'len small', dx, dy), 300, i * 200)); } },
      { title: { en: 'The two vectors', fr: 'Les deux vecteurs', es: 'Los dos vectores', ja: '2つのベクトル', zh: '两个向量' }, lines: ['\\overrightarrow{AE} = (1,\\ 2),\\qquad \\overrightarrow{BD} = (0-2,\\ 2-0) = (-2,\\ 2)'], note: {
        en: 'End point minus start point.',
        fr: 'Point d\'arrivée moins point de départ.',
        es: 'Punto final menos punto inicial.',
        ja: '終点 − 始点。',
        zh: '终点减起点。'
      } },
      { title: { en: 'Dot product', fr: 'Produit scalaire', es: 'Producto escalar', ja: '内積', zh: '数量积' }, lines: ['\\overrightarrow{AE}\\cdot\\overrightarrow{BD} = 1\\cdot(-2) + 2\\cdot 2 = \\boxed{2}'], note: {
        en: 'Positive, so the angle between them is acute.',
        fr: 'Positif, donc l\'angle entre eux est aigu.',
        es: 'Positivo, así que el ángulo entre ellos es agudo.',
        ja: '正なので、なす角は鋭角です。',
        zh: '为正，所以它们的夹角是锐角。'
      } },
      { title: { en: 'Without coordinates', fr: 'Sans coordonnées', es: 'Sin coordenadas', ja: '座標を使わずに', zh: '不用坐标' }, lines: ['\\overrightarrow{AE} = \\overrightarrow{AD} + \\tfrac12\\overrightarrow{AB},\\quad \\overrightarrow{BD} = \\overrightarrow{AD} - \\overrightarrow{AB}', '= |AD|^2 - \\tfrac12|AB|^2 + \\left(\\tfrac12 - 1\\right)\\overrightarrow{AB}\\cdot\\overrightarrow{AD} = 4 - 2 + 0 = 2'], note: {
        en: '$\\overrightarrow{AB}\\perp\\overrightarrow{AD}$, so their dot product is $0$.',
        fr: '$\\overrightarrow{AB}\\perp\\overrightarrow{AD}$, donc leur produit scalaire vaut $0$.',
        es: '$\\overrightarrow{AB}\\perp\\overrightarrow{AD}$, así que su producto escalar es $0$.',
        ja: '$\\overrightarrow{AB}\\perp\\overrightarrow{AD}$ なので、内積は $0$ です。',
        zh: '$\\overrightarrow{AB}\\perp\\overrightarrow{AD}$，所以它们的数量积为 $0$。'
      } },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'The answer is $2$ — it is not among the options, so “None of these is correct” is right.',
        fr: 'La réponse est $2$ — elle ne figure pas parmi les options, donc « Aucune n\'est correcte » est juste.',
        es: 'La respuesta es $2$ — no está entre las opciones, así que «Ninguna es correcta» es lo correcto.',
        ja: '答えは $2$ — 選択肢にないので「どれも正しくない」が正解です。',
        zh: '答案是 $2$ —— 它不在选项中，所以“以上都不正确”是对的。'
      } }
    ]
  };

  PuzzleBank.define(vectors);
})(PuzzleBank.kit);
