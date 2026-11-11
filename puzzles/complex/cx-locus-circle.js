/* complex · A circle written with a modulus
   |z − (3 + 4i)| = 5 is the circle with centre 3 + 4i and radius 5; it passes through 0. */
(function (K) {
  'use strict';
  const { Figure, argand } = K;

  PuzzleBank.define({
    id: 'cx-locus-circle',
    category: 'complex',
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["bac", "alevelfm"]
    },
    difficulty: 2,
    title: { en: 'A circle written with a modulus', fr: 'Un cercle écrit avec un module', es: 'Una circunferencia escrita con un módulo', ja: '絶対値で表した円', zh: '用模表示的圆' },
    statement: {
      en: 'Let $S$ be the set of complex numbers $z$ with $|z - 3 - 4i| = 5$. <b>Which of the following are true?</b>',
      fr: 'Soit $S$ l’ensemble des nombres complexes $z$ tels que $|z - 3 - 4i| = 5$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>',
      es: 'Sea $S$ el conjunto de números complejos $z$ con $|z - 3 - 4i| = 5$. <b>¿Cuáles de las siguientes son verdaderas?</b>',
      ja: '$|z - 3 - 4i| = 5$ を満たす複素数 $z$ の集合を $S$ とします。<b>次のうち正しいものはどれですか？</b>',
      zh: '设 $S$ 为满足 $|z - 3 - 4i| = 5$ 的复数 $z$ 的集合。<b>下列说法中正确的是？</b>'
    },
    figureText: {
      en: 'The complex plane with the point C = 3 + 4i and the circle of radius 5 around it; the circle passes through the origin.',
      fr: 'Le plan complexe avec le point C = 3 + 4i et le cercle de rayon 5 qui l’entoure ; le cercle passe par l’origine.',
      es: 'El plano complejo con el punto C = 3 + 4i y la circunferencia de radio 5 a su alrededor; pasa por el origen.',
      ja: '複素平面上の点 C = 3 + 4i と、それを中心とする半径 5 の円。円は原点を通ります。',
      zh: '复平面上的点 C = 3 + 4i 以及以它为圆心、半径为 5 的圆；圆经过原点。'
    },
    hint: {
      en: '$|z - c|$ is the distance from $z$ to $c$.',
      fr: '$|z - c|$ est la distance de $z$ à $c$.',
      es: '$|z - c|$ es la distancia de $z$ a $c$.',
      ja: '$|z - c|$ は $z$ と $c$ の距離です。',
      zh: '$|z - c|$ 表示 $z$ 到 $c$ 的距离。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example writing z = x + iy and getting the Cartesian equation (x − 3)² + (y − 4)² = 25), show every step, then check each statement and say which ones are true.',
      fr: 'Résous-le d’une autre façon si possible (par exemple en écrivant z = x + iy pour obtenir l’équation (x − 3)² + (y − 4)² = 25), montre chaque étape, puis vérifie chaque affirmation et dis lesquelles sont vraies.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo escribiendo z = x + iy y obteniendo la ecuación (x − 3)² + (y − 4)² = 25), muestra cada paso y luego comprueba cada afirmación y di cuáles son verdaderas.',
      ja: 'できれば別の方法で解いてください（例えば z = x + iy とおいて (x − 3)² + (y − 4)² = 25 を導く）。すべての手順を示し、各記述を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如设 z = x + iy，得到直角坐标方程 (x − 3)² + (y − 4)² = 25），写出每一步，然后逐条检查说法并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 13, h: 12, scale: 24, pad: 16 });
      const T = F.T = argand(F, -3, 10, -2, 10);
      F.circle(T([3, 4]), 5, 'seg').setAttribute('fill', 'rgba(160,67,107,.07)');
      F.dot(T([3, 4]), 'center'); F.text(T([3, 4]), 'C', 'pt', 10, -10);
      F.seg(T([3, 4]), T([8, 4]), 'radius'); F.text(T([5.5, 4]), '5', 'len', 0, -10);
      F.dot(T([0, 0])); F.text(T([0, 0]), '0', 'len', -10, 12);
      return F;
    },
    options: [
      { tex: 'S:\\ \\text{circle, centre } 3 + 4i,\\ \\text{radius } 5', correct: true, why: {
        en: 'The points at distance $5$ from $3 + 4i$.',
        fr: 'Les points à distance $5$ de $3 + 4i$.',
        es: 'Los puntos a distancia $5$ de $3 + 4i$.',
        ja: '$3 + 4i$ からの距離が $5$ の点の集まりです。',
        zh: '到 $3 + 4i$ 距离为 $5$ 的点的集合。'
      } },
      { tex: '0 \\in S', correct: true, why: {
        en: '$|0 - 3 - 4i| = \\sqrt{9 + 16} = 5$.',
        fr: '$|0 - 3 - 4i| = \\sqrt{9 + 16} = 5$.',
        es: '$|0 - 3 - 4i| = \\sqrt{9 + 16} = 5$.',
        ja: '$|0 - 3 - 4i| = \\sqrt{9 + 16} = 5$。',
        zh: '$|0 - 3 - 4i| = \\sqrt{9 + 16} = 5$。'
      } },
      { tex: '\\text{the centre is } -3 - 4i', correct: false, why: {
        en: '$|z - c|$ measures from $c$: here $c = 3 + 4i$.',
        fr: '$|z - c|$ se mesure depuis $c$ : ici $c = 3 + 4i$.',
        es: '$|z - c|$ se mide desde $c$: aquí $c = 3 + 4i$.',
        ja: '$|z - c|$ は $c$ からの距離で、ここでは $c = 3 + 4i$。',
        zh: '$|z - c|$ 是从 $c$ 量起的距离：这里 $c = 3 + 4i$。'
      } },
      { tex: '\\text{the radius is } 25', correct: false, why: {
        en: '$25$ is the radius squared, in $(x - 3)^2 + (y - 4)^2 = 25$.',
        fr: '$25$ est le carré du rayon, dans $(x - 3)^2 + (y - 4)^2 = 25$.',
        es: '$25$ es el radio al cuadrado, en $(x - 3)^2 + (y - 4)^2 = 25$.',
        ja: '$25$ は $(x - 3)^2 + (y - 4)^2 = 25$ の半径の2乗です。',
        zh: '$25$ 是半径的平方，见 $(x - 3)^2 + (y - 4)^2 = 25$。'
      } },
      { tex: 'S \\text{ is a straight line}', correct: false, why: {
        en: 'A line comes from $|z - a| = |z - b|$ (equal distances to two points).',
        fr: 'Une droite vient de $|z - a| = |z - b|$ (même distance à deux points).',
        es: 'Una recta sale de $|z - a| = |z - b|$ (igual distancia a dos puntos).',
        ja: '直線になるのは $|z - a| = |z - b|$（2点から等距離）の場合です。',
        zh: '直线来自 $|z - a| = |z - b|$（到两点距离相等）。'
      } },
      { tex: '3 + 4i \\in S', correct: false, why: {
        en: 'That is the centre: its distance to itself is $0$, not $5$.',
        fr: 'C’est le centre : sa distance à lui-même est $0$, pas $5$.',
        es: 'Es el centro: su distancia a sí mismo es $0$, no $5$.',
        ja: 'それは中心で、自分自身との距離は $5$ ではなく $0$ です。',
        zh: '那是圆心：它到自身的距离是 $0$ 而不是 $5$。'
      } },
      { tex: '10i \\in S', correct: false, why: {
        en: '$|10i - 3 - 4i| = |{-3} + 6i| = \\sqrt{45} \\ne 5$.',
        fr: '$|10i - 3 - 4i| = |{-3} + 6i| = \\sqrt{45} \\ne 5$.',
        es: '$|10i - 3 - 4i| = |{-3} + 6i| = \\sqrt{45} \\ne 5$.',
        ja: '$|10i - 3 - 4i| = |{-3} + 6i| = \\sqrt{45} \\ne 5$。',
        zh: '$|10i - 3 - 4i| = |{-3} + 6i| = \\sqrt{45} \\ne 5$。'
      } },
      { tex: '|z| \\le 5 \\text{ for every } z \\in S', correct: false, why: {
        en: 'The point $6 + 8i$ is on the circle and $|6 + 8i| = 10$.',
        fr: 'Le point $6 + 8i$ est sur le cercle et $|6 + 8i| = 10$.',
        es: 'El punto $6 + 8i$ está en la circunferencia y $|6 + 8i| = 10$.',
        ja: '点 $6 + 8i$ は円上にあり、$|6 + 8i| = 10$ です。',
        zh: '点 $6 + 8i$ 在圆上，且 $|6 + 8i| = 10$。'
      } }
    ],
    steps: [
      {
        title: { en: 'Read the modulus as a distance', fr: 'Lire le module comme une distance', es: 'Leer el módulo como una distancia', ja: '絶対値を距離として読む', zh: '把模看成距离' },
        lines: ['|z - (3 + 4i)| = 5', '\\text{distance from } z \\text{ to } 3 + 4i = 5'],
        note: {
          en: 'All points at the same distance from a fixed point form a circle.',
          fr: 'Tous les points à la même distance d’un point fixe forment un cercle.',
          es: 'Todos los puntos a la misma distancia de un punto fijo forman una circunferencia.',
          ja: '定点から等距離にある点全体は円になります。',
          zh: '到定点距离相等的所有点构成一个圆。'
        },
        fig(F) { F.draw(F.circle(F.T([3, 4]), 5, 'hl yellow', 'over'), 1100); }
      },
      {
        title: { en: 'In coordinates', fr: 'En coordonnées', es: 'En coordenadas', ja: '座標で書く', zh: '用坐标表示' },
        lines: ['z = x + iy:\\quad (x - 3)^2 + (y - 4)^2 = 25'],
        note: {
          en: 'Centre $(3, 4)$, radius $\\sqrt{25} = 5$.',
          fr: 'Centre $(3, 4)$, rayon $\\sqrt{25} = 5$.',
          es: 'Centro $(3, 4)$, radio $\\sqrt{25} = 5$.',
          ja: '中心 $(3, 4)$、半径 $\\sqrt{25} = 5$。',
          zh: '圆心 $(3, 4)$，半径 $\\sqrt{25} = 5$。'
        }
      },
      {
        title: { en: 'Test the points', fr: 'Tester les points', es: 'Probar los puntos', ja: '点を調べる', zh: '检验各点' },
        lines: ['|0 - (3 + 4i)| = 5\\ \\checkmark', '|10i - (3 + 4i)| = \\sqrt{45},\\qquad |6 + 8i| = 10'],
        note: {
          en: 'The origin is on the circle; the farthest point from the origin is $6 + 8i$.',
          fr: 'L’origine est sur le cercle ; le point le plus éloigné de l’origine est $6 + 8i$.',
          es: 'El origen está en la circunferencia; el punto más lejano del origen es $6 + 8i$.',
          ja: '原点は円上にあり、原点から最も遠い点は $6 + 8i$ です。',
          zh: '原点在圆上；离原点最远的点是 $6 + 8i$。'
        },
        fig(F) { F.fadeIn(F.circle(F.T([0, 0]), 0.35, 'halo', 'over'), 400); F.draw(F.seg(F.T([0, 0]), F.T([6, 8]), 'hl pink', 'over'), 700, 300); F.fadeIn(F.dot(F.T([6, 8])), 300, 900); F.fadeIn(F.text(F.T([6, 8]), '6 + 8i', 'len', 28, -6), 300, 1000); }
      },
      {
        title: { en: 'Check every option', fr: 'Vérifier chaque option', es: 'Comprobar cada opción', ja: '各選択肢を確認', zh: '逐项检查选项' },
        options: true,
        note: { en: 'Two statements are true.', fr: 'Deux affirmations sont vraies.', es: 'Dos afirmaciones son verdaderas.', ja: '正しい記述は2つです。', zh: '有两个说法正确。' }
      }
    ],
    words: {  // \text{…} words inside formulas
      'circle, centre': { fr: 'cercle de centre', es: 'circunferencia de centro', ja: '円、中心', zh: '圆，圆心' },
      'radius': { fr: 'rayon', es: 'radio', ja: '半径', zh: '半径' },
      'the centre is': { fr: 'le centre est', es: 'el centro es', ja: '中心は', zh: '圆心是' },
      'the radius is': { fr: 'le rayon est', es: 'el radio es', ja: '半径は', zh: '半径是' },
      'is a straight line': { fr: 'est une droite', es: 'es una recta', ja: 'は直線', zh: '是一条直线' },
      'for every': { fr: 'pour tout', es: 'para todo', ja: 'が成り立つ：', zh: '对所有' },
      'distance from': { fr: 'distance de', es: 'distancia de', ja: '距離：', zh: '距离：从' },
      'to': { fr: 'à', es: 'a', ja: 'から', zh: '到' }
    }
  });
})(PuzzleBank.kit);
