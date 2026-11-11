/* trigonometry · The tower seen twice
   Trigonometry: height of a tower from two angles of elevation */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const tP = [0, 0], tQ = [20, 0], tF = [30, 0], tT = [30, 10 * Math.sqrt(3)];
  const tower = {
    id: 'trig-tower-30-60',
    category: 'trigonometry',
    title: {
      en: 'The tower seen twice',
      fr: 'La tour vue deux fois',
      es: 'La torre vista dos veces',
      ja: '2回見上げた塔',
      zh: '两次仰望的塔'
    },
    source: {   // where the problem comes from (see README: Sources)
      kind: "classic",
      note: {
        en: "Measuring a height from two sightings is the method of Liu Hui’s <i>Sea Island Mathematical Manual</i> (China, 263).",
        fr: "Mesurer une hauteur à partir de deux visées est la méthode du <i>Manuel mathématique de l’île maritime</i> de Liu Hui (Chine, 263).",
        es: "Medir una altura con dos visuales es el método del <i>Manual matemático de la isla marina</i> de Liu Hui (China, 263).",
        ja: "2か所からの観測で高さを求めるのは、劉徽『海島算経』（中国、263年）の方法。",
        zh: "由两处观测求高，正是刘徽《海岛算经》（263年）“重差术”的方法。"
      },
      exams: ["zhongkao", "gcse"]
    },
    difficulty: 2,
    statement: {
      en: 'From a point $P$ on flat ground, the top $T$ of a vertical tower is seen at an angle of elevation of $30^\\circ$. After walking $20$ m straight towards the tower, to $Q$, the angle of elevation is $60^\\circ$. <b>Which of the following equal the height $h$ of the tower (in metres)?</b>',
      fr: 'D\'un point $P$ sur un sol plat, on voit le sommet $T$ d\'une tour verticale sous un angle d\'élévation de $30^\\circ$. Après avoir marché $20$ m en ligne droite vers la tour, jusqu\'en $Q$, l\'angle d\'élévation est de $60^\\circ$. <b>Lesquelles des valeurs suivantes sont égales à la hauteur $h$ de la tour (en mètres) ?</b>',
      es: 'Desde un punto $P$ en terreno llano se ve la cima $T$ de una torre vertical con un ángulo de elevación de $30^\\circ$. Tras caminar $20$ m en línea recta hacia la torre, hasta $Q$, el ángulo de elevación es de $60^\\circ$. <b>¿Cuáles de los siguientes valores son iguales a la altura $h$ de la torre (en metros)?</b>',
      ja: '平らな地面の点 $P$ から鉛直な塔の頂上 $T$ を見上げると、仰角は $30^\\circ$ です。塔に向かってまっすぐ $20$ m 歩いて $Q$ に着くと、仰角は $60^\\circ$ になります。<b>次のうち塔の高さ $h$（メートル）に等しいものはどれですか？</b>',
      zh: '在平地上的点 $P$ 处，望见一座竖直塔的塔顶 $T$ 的仰角为 $30^\\circ$。朝塔直走 $20$ m 到达 $Q$ 后，仰角变为 $60^\\circ$。<b>下列哪些等于塔高 $h$（单位：米）？</b>'
    },
    figureText: {
      en: 'Flat ground with points P, Q and the foot F of the tower, in that order. PQ = 20 m, QF = x is unknown. The tower FT of height h is vertical. Angle of elevation of T from P is 30°, from Q is 60°.',
      fr: 'Sol plat avec les points P, Q et le pied F de la tour, dans cet ordre. PQ = 20 m, QF = x est inconnu. La tour FT de hauteur h est verticale. L\'angle d\'élévation de T vaut 30° depuis P et 60° depuis Q.',
      es: 'Terreno llano con los puntos P, Q y el pie F de la torre, en ese orden. PQ = 20 m, QF = x es desconocido. La torre FT de altura h es vertical. El ángulo de elevación de T desde P es 30°, desde Q es 60°.',
      ja: '平らな地面に点 P、Q、塔の根元 F がこの順に並ぶ。PQ = 20 m、QF = x は未知。高さ h の塔 FT は鉛直。P からの T の仰角は 30°、Q からは 60°。',
      zh: '平地上依次有点 P、Q 和塔底 F。PQ = 20 m，QF = x 未知。高为 h 的塔 FT 竖直。从 P 看 T 的仰角为 30°，从 Q 看为 60°。'
    },
    hint: {
      en: 'Look at the angles of triangle $PQT$ — two of them are equal.',
      fr: 'Regardez les angles du triangle $PQT$ — deux d\'entre eux sont égaux.',
      es: 'Fíjate en los ángulos del triángulo $PQT$ — dos de ellos son iguales.',
      ja: '三角形 $PQT$ の角を見てください — 2つが等しくなっています。',
      zh: '看看三角形 $PQT$ 的各角 —— 其中两个相等。'
    },
    aiHint: {
      en: 'Please solve it with a different method than the isosceles-triangle shortcut if you can (for example two tangent equations, or the law of sines), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le avec une autre méthode que le raccourci du triangle isocèle si possible (par exemple deux équations avec la tangente, ou la loi des sinus), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo con un método distinto del atajo del triángulo isósceles si puedes (por ejemplo dos ecuaciones con la tangente, o el teorema del seno), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば二等辺三角形の近道以外の方法で解いてください（例えば正接を使った2つの方程式、または正弦定理）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用等腰三角形捷径以外的方法求解（例如列两个正切方程，或用正弦定理），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 30, h: 17.6, scale: 10.6, pad: 30 });
      F.seg([-1.5, 0], [32.5, 0], 'ground');
      for (let x = -1; x < 32; x += 1.6) F.seg([x, 0], [x - 0.9, -0.9], 'hatch');
      F.rect(29.2, 0, 1.6, 10 * Math.sqrt(3), 'towerbody');
      F.seg(tP, tT, 'sight'); F.seg(tQ, tT, 'sight');
      F.arc(tP, 4, 0, 30); F.arc(tQ, 3, 0, 60);
      F.text([5.6, 1.4], '30°', 'len small'); F.text([24.2, 2.3], '60°', 'len small');
      [tP, tQ, tF, tT].forEach(p => F.dot(p));
      F.text(tP, 'P', 'pt', -4, 14); F.text(tQ, 'Q', 'pt', 0, 16); F.text(tF, 'F', 'pt', 8, 16); F.text(tT, 'T', 'pt', -12, -8);
      F.text([10, 0], '20 m', 'len', 0, 16); F.text([25, 0], 'x', 'len it', 0, 16);
      F.text([30, 5 * Math.sqrt(3)], 'h', 'len it', 18, 0);
      return F;
    },
    options: [
      { tex: 'h = 10\\sqrt{3}', correct: true, why: {
        en: 'The height: $\\approx 17.32$ m.',
        fr: 'La hauteur : $\\approx 17.32$ m.',
        es: 'La altura: $\\approx 17.32$ m.',
        ja: '高さ：$\\approx 17.32$ m。',
        zh: '高度：$\\approx 17.32$ m。'
      } },
      { tex: 'h = 20\\sin 60^\\circ', correct: true, why: {
        en: '$QT = 20$, so $h = QT\\sin 60^\\circ = 10\\sqrt3$.',
        fr: '$QT = 20$, donc $h = QT\\sin 60^\\circ = 10\\sqrt3$.',
        es: '$QT = 20$, así que $h = QT\\sin 60^\\circ = 10\\sqrt3$.',
        ja: '$QT = 20$ なので $h = QT\\sin 60^\\circ = 10\\sqrt3$。',
        zh: '$QT = 20$，所以 $h = QT\\sin 60^\\circ = 10\\sqrt3$。'
      } },
      { tex: 'h = 20\\sqrt{3}', correct: false, why: {
        en: 'Uses $\\tan 60^\\circ$ with $x = 20$ instead of $x = 10$.',
        fr: 'Utilise $\\tan 60^\\circ$ avec $x = 20$ au lieu de $x = 10$.',
        es: 'Usa $\\tan 60^\\circ$ con $x = 20$ en lugar de $x = 10$.',
        ja: '$x = 10$ ではなく $x = 20$ で $\\tan 60^\\circ$ を使っています。',
        zh: '用 $\\tan 60^\\circ$ 时取了 $x = 20$ 而不是 $x = 10$。'
      } },
      { tex: 'h = 10', correct: false, why: {
        en: 'That is $x = QF$, the distance to the foot.',
        fr: 'C\'est $x = QF$, la distance jusqu\'au pied.',
        es: 'Eso es $x = QF$, la distancia al pie.',
        ja: 'それは $x = QF$、塔の根元までの距離です。',
        zh: '那是 $x = QF$，到塔底的距离。'
      } },
      { tex: 'h = 20', correct: false, why: {
        en: 'That is $QT$, the slanted line of sight.',
        fr: 'C\'est $QT$, la ligne de visée oblique.',
        es: 'Eso es $QT$, la visual inclinada.',
        ja: 'それは $QT$、斜めの視線です。',
        zh: '那是 $QT$，倾斜的视线。'
      } },
      { tex: 'h = 20\\tan 30^\\circ', correct: false, why: {
        en: '$\\approx 11.55$: treats $PQ$ as if it reached the tower.',
        fr: '$\\approx 11.55$ : traite $PQ$ comme s\'il atteignait la tour.',
        es: '$\\approx 11.55$: trata $PQ$ como si llegara hasta la torre.',
        ja: '$\\approx 11.55$：$PQ$ が塔まで届いているかのように扱っています。',
        zh: '$\\approx 11.55$：把 $PQ$ 当成一直延伸到塔底。'
      } },
      { tex: 'h = 15', correct: false, why: {
        en: 'A guess between 10 and 20.',
        fr: 'Une estimation entre 10 et 20.',
        es: 'Una suposición entre 10 y 20.',
        ja: '10 と 20 の間の当て推量。',
        zh: '在 10 和 20 之间的猜测。'
      } },
      { tex: 'h = 10\\sqrt{2}', correct: false, why: {
        en: '$\\approx 14.14$: would need a $45^\\circ$ angle.',
        fr: '$\\approx 14.14$ : il faudrait un angle de $45^\\circ$.',
        es: '$\\approx 14.14$: haría falta un ángulo de $45^\\circ$.',
        ja: '$\\approx 14.14$：$45^\\circ$ の角が必要になります。',
        zh: '$\\approx 14.14$：需要一个 $45^\\circ$ 的角。'
      } }
    ],
    steps: [
      {
        title: {
          en: 'Angles of triangle $PQT$',
          fr: 'Angles du triangle $PQT$',
          es: 'Ángulos del triángulo $PQT$',
          ja: '三角形 $PQT$ の角',
          zh: '三角形 $PQT$ 的各角'
        },
        lines: ['\\angle PQT = 180^\\circ - 60^\\circ = 120^\\circ', '\\angle PTQ = 180^\\circ - 30^\\circ - 120^\\circ = 30^\\circ'],
        note: {
          en: 'The angle at $Q$ inside the triangle is the supplement of the $60^\\circ$ elevation.',
          fr: 'L\'angle en $Q$ à l\'intérieur du triangle est le supplémentaire de l\'élévation de $60^\\circ$.',
          es: 'El ángulo en $Q$ dentro del triángulo es el suplementario de la elevación de $60^\\circ$.',
          ja: '三角形の内側の $Q$ の角は、仰角 $60^\\circ$ の補角です。',
          zh: '三角形内 $Q$ 处的角是 $60^\\circ$ 仰角的补角。'
        },
        fig(F) { F.fadeIn(F.path([tP, tQ, tT], 'fill-yellow', 'fills'), 600); F.draw(F.arc(tT, 3.2, 210, 240, 'strong', 'over'), 700, 300); F.fadeIn(F.text([29, 11.6], '30°', 'len yellow small', -14, 0), 400, 800); F.fadeIn(F.text(tQ, '120°', 'len yellow small', -4, -20), 400, 500); }
      },
      {
        title: {
          en: 'Two equal angles → two equal sides',
          fr: 'Deux angles égaux → deux côtés égaux',
          es: 'Dos ángulos iguales → dos lados iguales',
          ja: '等しい2角 → 等しい2辺',
          zh: '两角相等 → 两边相等'
        },
        lines: ['\\angle QPT = \\angle PTQ = 30^\\circ', '\\Rightarrow\\ QT = PQ = 20'],
        note: {
          en: 'Triangle $PQT$ is isosceles, so the sides opposite the equal angles are equal.',
          fr: 'Le triangle $PQT$ est isocèle, donc les côtés opposés aux angles égaux sont égaux.',
          es: 'El triángulo $PQT$ es isósceles, así que los lados opuestos a los ángulos iguales son iguales.',
          ja: '三角形 $PQT$ は二等辺三角形なので、等しい角の対辺は等しくなります。',
          zh: '三角形 $PQT$ 是等腰三角形，所以等角所对的边相等。'
        },
        fig(F) { F.draw(F.seg(tP, tQ, 'hl blue', 'over'), 700); F.draw(F.seg(tQ, tT, 'hl blue', 'over'), 800, 300); F.fadeIn(F.text([25, 8.66], '20', 'len', -14, -6), 400, 900); }
      },
      {
        title: {
          en: 'The right triangle $QFT$',
          fr: 'Le triangle rectangle $QFT$',
          es: 'El triángulo rectángulo $QFT$',
          ja: '直角三角形 $QFT$',
          zh: '直角三角形 $QFT$'
        },
        lines: ['h = QT\\cdot\\sin 60^\\circ', '= 20\\cdot\\tfrac{\\sqrt3}{2} = \\boxed{10\\sqrt3} \\approx 17.32'],
        note: {
          en: 'In the right triangle at $F$, the side opposite the $60^\\circ$ angle is $h$.',
          fr: 'Dans le triangle rectangle en $F$, le côté opposé à l\'angle de $60^\\circ$ est $h$.',
          es: 'En el triángulo rectángulo en $F$, el lado opuesto al ángulo de $60^\\circ$ es $h$.',
          ja: '$F$ で直角の三角形では、$60^\\circ$ の角の対辺が $h$ です。',
          zh: '在 $F$ 处为直角的三角形中，$60^\\circ$ 角的对边是 $h$。'
        },
        fig(F) { F.clear('fills'); F.fadeIn(F.path([tQ, tF, tT], 'fill-green', 'fills'), 600); F.fadeIn(F.right(tF, [-1, 0], [0, 1], 1.4, 'strong'), 400, 300); F.draw(F.seg(tF, tT, 'hl green', 'over'), 900, 400); }
      },
      {
        title: {
          en: 'Cross-check with two tangents',
          fr: 'Vérification par deux tangentes',
          es: 'Comprobación con dos tangentes',
          ja: '2本の接線で検算',
          zh: '用两条切线验证'
        },
        lines: ['\\tan 60^\\circ = \\frac{h}{x},\\qquad \\tan 30^\\circ = \\frac{h}{x + 20}', 'x\\sqrt3 = \\frac{x + 20}{\\sqrt3}\\ \\Rightarrow\\ 3x = x + 20\\ \\Rightarrow\\ x = 10', 'h = 10\\tan 60^\\circ = 10\\sqrt3\\ \\checkmark'],
        note: {
          en: 'Two equations, two unknowns — the same height.',
          fr: 'Deux équations, deux inconnues — la même hauteur.',
          es: 'Dos ecuaciones, dos incógnitas — la misma altura.',
          ja: '2つの方程式、2つの未知数 — 同じ高さ。',
          zh: '两个方程，两个未知数 —— 同样的高。'
        },
        fig(F) { F.draw(F.seg(tQ, tF, 'hl pink', 'over'), 700); F.fadeIn(F.text([25, 0], 'x = 10', 'len', 0, -12), 400, 600); }
      },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Exactly two of the eight options equal $h$.',
        fr: 'Exactement deux des huit options sont égales à $h$.',
        es: 'Exactamente dos de las ocho opciones son iguales a $h$.',
        ja: '8つの選択肢のうちちょうど2つが $h$ に等しい。',
        zh: '八个选项中恰有两个等于 $h$。'
      } }
    ]
  };

  PuzzleBank.define(tower);
})(PuzzleBank.kit);
