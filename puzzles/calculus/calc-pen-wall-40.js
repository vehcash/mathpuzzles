/* calculus · The biggest pen against the wall
   Calculus: the biggest pen against a wall */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const penA = x => x * (40 - 2 * x);
  const gx = x => 6.3 + x * 0.17, gy = a => 0.5 + a * 0.024;
  const pen = {
    id: 'calc-pen-wall-40',
    category: 'calculus',
    title: {
      en: 'The biggest pen against the wall',
      fr: 'Le plus grand enclos contre le mur',
      es: 'El corral más grande junto al muro',
      ja: '壁沿いの最大の囲い',
      zh: '靠墙的最大围栏'
    },
    difficulty: 2,
    statement: {
      en: 'A farmer has $40$ m of fencing to build a rectangular pen against a long straight wall, so only three sides need fencing. <b>What is the largest area the pen can have?</b>',
      fr: 'Un fermier dispose de $40$ m de clôture pour construire un enclos rectangulaire contre un long mur droit, si bien que seuls trois côtés doivent être clôturés. <b>Quelle est la plus grande aire possible de l\'enclos ?</b>',
      es: 'Un granjero tiene $40$ m de valla para construir un corral rectangular junto a un muro largo y recto, así que solo hay que vallar tres lados. <b>¿Cuál es el área máxima que puede tener el corral?</b>',
      ja: '農家が長くまっすぐな壁に沿って長方形の囲いを作るために $40$ m の柵を持っています。柵が必要なのは三辺だけです。<b>囲いの面積の最大値はいくらですか？</b>',
      zh: '一位农民有 $40$ m 篱笆，要靠着一堵又长又直的墙围一个矩形围栏，因此只需围三条边。<b>围栏的面积最大是多少？</b>'
    },
    figureText: {
      en: 'A long wall along the top. A rectangular pen touches the wall; the two sides perpendicular to the wall have length x, the side parallel to the wall has length y, and 2x + y = 40 m of fence is used.',
      fr: 'Un long mur en haut. Un enclos rectangulaire touche le mur ; les deux côtés perpendiculaires au mur mesurent x, le côté parallèle au mur mesure y, et 2x + y = 40 m de clôture sont utilisés.',
      es: 'Un muro largo arriba. Un corral rectangular toca el muro; los dos lados perpendiculares al muro miden x, el lado paralelo al muro mide y, y se usan 2x + y = 40 m de valla.',
      ja: '上側に長い壁。長方形の囲いが壁に接し、壁に垂直な二辺の長さは x、壁に平行な辺の長さは y で、柵の長さは 2x + y = 40 m。',
      zh: '上方是一堵长墙。矩形围栏靠墙；垂直于墙的两条边长为 x，平行于墙的边长为 y，共用篱笆 2x + y = 40 m。'
    },
    hint: {
      en: 'Call the two sides touching the wall $x$; the third side is then $40 - 2x$.',
      fr: 'Appelons $x$ les deux côtés qui touchent le mur ; le troisième côté vaut alors $40 - 2x$.',
      es: 'Llamemos $x$ a los dos lados que tocan el muro; el tercer lado es entonces $40 - 2x$.',
      ja: '壁に接する二辺を $x$ とすると、三辺目は $40 - 2x$ です。',
      zh: '设靠墙的两条边为 $x$，则第三条边为 $40 - 2x$。'
    },
    aiHint: {
      en: 'Please solve it with a method other than the derivative if you can (for example completing the square or the AM–GM inequality), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le avec une autre méthode que la dérivée si possible (par exemple la forme canonique ou l\'inégalité arithmético-géométrique), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo con un método distinto de la derivada si puedes (por ejemplo completando el cuadrado o la desigualdad de las medias), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば微分以外の方法で解いてください（例えば平方完成や相加相乗平均の不等式）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用求导以外的方法求解（例如配方法或均值不等式），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 10, h: 6, scale: 34, pad: 26 });
      F.seg([0, 5.6], [5.8, 5.6], 'wall');
      for (let x = 0.1; x < 5.8; x += 0.35) F.seg([x, 5.6], [x + 0.3, 5.95], 'hatch');
      F.text([2.9, 5.6], 'wall', 'len small muted', 0, -18);
      F.path([[0.8, 5.6], [0.8, 3.0], [5, 3.0], [5, 5.6]], 'fence', 'base', false);
      F.text([0.8, 4.3], 'x', 'len it', -12, 0); F.text([5, 4.3], 'x', 'len it', 12, 0); F.text([2.9, 3.0], 'y', 'len it', 0, 16);
      F.text([2.9, 4.3], 'A = ?', 'len');
      // inset: graph of A(x)
      F.seg([gx(0), gy(0)], [gx(21.5), gy(0)], 'axis'); F.seg([gx(0), gy(0)], [gx(0), gy(225)], 'axis');
      F.text([gx(21.5), gy(0)], 'x', 'len it small', 8, 0); F.text([gx(0), gy(225)], 'A', 'len it small', 0, -8);
      F.text([gx(20), gy(0)], '20', 'tick', 0, 12); F.text([gx(0), gy(0)], '0', 'tick', -8, 10);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'wall': { fr: 'mur', es: 'muro', ja: '壁', zh: '墙' }
    },
    options: [
      { tex: '200\\ \\text{m}^2', correct: true, why: {
        en: 'The maximum, at $x = 10$, $y = 20$.',
        fr: 'Le maximum, en $x = 10$, $y = 20$.',
        es: 'El máximo, en $x = 10$, $y = 20$.',
        ja: '最大値、$x = 10$, $y = 20$ のとき。',
        zh: '最大值，在 $x = 10$、$y = 20$ 时取到。'
      } },
      { tex: '100\\ \\text{m}^2', correct: false, why: {
        en: 'A $10\\times10$ square fenced on all four sides — ignores the wall.',
        fr: 'Un carré $10\\times10$ clôturé sur les quatre côtés — oublie le mur.',
        es: 'Un cuadrado de $10\\times10$ vallado por los cuatro lados — se olvida del muro.',
        ja: '四辺すべてを囲った $10\\times10$ の正方形 — 壁を無視しています。',
        zh: '四边都围上的 $10\\times10$ 正方形 —— 忽略了墙。'
      } },
      { tex: '400\\ \\text{m}^2', correct: false, why: {
        en: '$20\\times 20$ would need $60$ m of fence.',
        fr: '$20\\times 20$ demanderait $60$ m de clôture.',
        es: '$20\\times 20$ necesitaría $60$ m de valla.',
        ja: '$20\\times 20$ だと柵が $60$ m 必要です。',
        zh: '$20\\times 20$ 需要 $60$ m 篱笆。'
      } },
      { tex: '192\\ \\text{m}^2', correct: false, why: {
        en: '$x = 12$, $y = 16$ — close, but not the maximum.',
        fr: '$x = 12$, $y = 16$ — proche, mais pas le maximum.',
        es: '$x = 12$, $y = 16$ — cerca, pero no es el máximo.',
        ja: '$x = 12$, $y = 16$ — 惜しいですが最大ではありません。',
        zh: '$x = 12$, $y = 16$ —— 很接近，但不是最大值。'
      } },
      { tex: '\\tfrac{400}{3}\\ \\text{m}^2', correct: false, why: {
        en: 'Three equal sides of $\\tfrac{40}{3}$ — a square pen is not the best here.',
        fr: 'Trois côtés égaux de $\\tfrac{40}{3}$ — un enclos carré n\'est pas le meilleur ici.',
        es: 'Tres lados iguales de $\\tfrac{40}{3}$ — un corral cuadrado no es el mejor aquí.',
        ja: '$\\tfrac{40}{3}$ の等しい3辺 — ここでは正方形の囲いは最良ではありません。',
        zh: '三条相等的边，各长 $\\tfrac{40}{3}$ —— 这里正方形围栏不是最优的。'
      } },
      { tex: '128\\ \\text{m}^2', correct: false, why: '$x = 4$, $y = 32$.' },
      { tex: '225\\ \\text{m}^2', correct: false, why: {
        en: 'A $15\\times 15$ square would need $45$ m.',
        fr: 'Un carré $15\\times 15$ demanderait $45$ m.',
        es: 'Un cuadrado de $15\\times 15$ necesitaría $45$ m.',
        ja: '$15\\times 15$ の正方形だと $45$ m 必要です。',
        zh: '$15\\times 15$ 的正方形需要 $45$ m。'
      } },
      { tex: '800\\ \\text{m}^2', correct: false, why: {
        en: 'Doubles the real maximum.',
        fr: 'Double le vrai maximum.',
        es: 'Duplica el máximo real.',
        ja: '本当の最大値の2倍です。',
        zh: '是真正最大值的两倍。'
      } }
    ],
    steps: [
      {
        title: { en: 'Build a model', fr: 'Construire un modèle', es: 'Plantear un modelo', ja: 'モデルを立てる', zh: '建立模型' },
        lines: ['2x + y = 40\\ \\Rightarrow\\ y = 40 - 2x', 'A(x) = x\\,(40 - 2x) = 40x - 2x^2,\\quad 0 < x < 20'],
        note: {
          en: 'Only three sides use fence: two of length $x$ and one of length $y$.',
          fr: 'Seuls trois côtés sont clôturés : deux de longueur $x$ et un de longueur $y$.',
          es: 'Solo tres lados llevan valla: dos de longitud $x$ y uno de longitud $y$.',
          ja: '柵を使うのは三辺だけ：長さ $x$ が2辺、長さ $y$ が1辺。',
          zh: '只有三条边用篱笆：两条长为 $x$，一条长为 $y$。'
        },
        fig(F) { const pts = []; for (let x = 0; x <= 20.001; x += 0.5) pts.push([gx(x), gy(penA(x))]); F.draw(F.curve(pts, 'graph', 'over'), 1300); }
      },
      {
        title: {
          en: 'Where the slope is zero',
          fr: 'Là où la pente est nulle',
          es: 'Donde la pendiente es cero',
          ja: '傾きが 0 になるところ',
          zh: '斜率为零的地方'
        },
        lines: ["A'(x) = 40 - 4x = 0", '\\Rightarrow\\ x = 10'],
        note: {
          en: 'At the top of the curve the tangent is horizontal.',
          fr: 'Au sommet de la courbe, la tangente est horizontale.',
          es: 'En lo alto de la curva la tangente es horizontal.',
          ja: '曲線の頂上では接線は水平です。',
          zh: '在曲线最高点，切线是水平的。'
        },
        fig(F) { F.draw(F.seg([gx(6), gy(200)], [gx(14), gy(200)], 'hl yellow', 'over'), 600); F.fadeIn(F.dot([gx(10), gy(200)], 'center'), 300, 500); F.fadeIn(F.text([gx(10), gy(200)], '(10, 200)', 'len small', 0, -12), 400, 700); }
      },
      {
        title: {
          en: 'Check it is a maximum',
          fr: 'Vérifier que c\'est un maximum',
          es: 'Comprobar que es un máximo',
          ja: '最大であることを確認',
          zh: '验证这是最大值'
        },
        lines: ["A''(x) = -4 < 0", 'y = 40 - 2\\cdot 10 = 20'],
        note: {
          en: 'The parabola opens downward, so the critical point is the highest point.',
          fr: 'La parabole est tournée vers le bas, donc le point critique est le point le plus haut.',
          es: 'La parábola se abre hacia abajo, así que el punto crítico es el más alto.',
          ja: '放物線は下に凸なので、臨界点が最高点です。',
          zh: '抛物线开口向下，所以驻点是最高点。'
        }
      },
      {
        title: { en: 'The largest area', fr: 'La plus grande aire', es: 'El área máxima', ja: '最大の面積', zh: '最大面积' },
        lines: ['A(10) = 10 \\cdot 20 = \\boxed{200}\\ \\text{m}^2'],
        note: {
          en: 'The best pen is twice as long as it is deep.',
          fr: 'Le meilleur enclos est deux fois plus long que profond.',
          es: 'El mejor corral es el doble de largo que de profundo.',
          ja: '最良の囲いは、奥行きの2倍の長さです。',
          zh: '最佳围栏的长是宽的两倍。'
        },
        fig(F) { F.fadeIn(F.path([[0.8, 5.6], [0.8, 3.0], [5, 3.0], [5, 5.6]], 'fill-yellow', 'fills'), 600); [...F.layers.labels.querySelectorAll('text')].filter(t => t.textContent === 'A = ?').forEach(t => { t.textContent = 'A = 200'; }); F.fadeIn(F.text([0.8, 3.4], '= 10', 'len', -22, 0), 300, 300); F.fadeIn(F.text([2.9, 3.0], '20', 'len', 18, 16), 300, 500); }
      },
      {
        title: { en: 'Without calculus', fr: 'Sans analyse', es: 'Sin cálculo', ja: '微分を使わずに', zh: '不用微积分' },
        lines: ['A = -2(x^2 - 20x) = -2(x - 10)^2 + 200 \\le 200'],
        note: {
          en: 'Completing the square gives the same maximum, reached at $x = 10$.',
          fr: 'La forme canonique donne le même maximum, atteint en $x = 10$.',
          es: 'Completar el cuadrado da el mismo máximo, alcanzado en $x = 10$.',
          ja: '平方完成でも同じ最大値が $x = 10$ で得られます。',
          zh: '配方法得到同样的最大值，在 $x = 10$ 时取到。'
        }
      },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Only one option is the maximum area.',
        fr: 'Une seule option est l\'aire maximale.',
        es: 'Solo una opción es el área máxima.',
        ja: '最大面積の選択肢は1つだけです。',
        zh: '只有一个选项是最大面积。'
      } }
    ]
  };

  PuzzleBank.define(pen);
})(PuzzleBank.kit);
