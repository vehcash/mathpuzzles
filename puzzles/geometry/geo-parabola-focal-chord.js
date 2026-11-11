/* geometry · A chord through the focus
   8 ── Parabola: focal chord (exactly one option is right) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const pS = p => [p[0] + 1.5, p[1] + 3.4];
  const pF = pS([1, 0]), pA = pS([3 + 2 * S2, 2 + 2 * S2]), pB = pS([3 - 2 * S2, 2 - 2 * S2]), pM = pS([3, 2]);
  const parabola = {
    id: 'geo-parabola-focal-chord', category: 'geometry', title: {
      en: 'A chord through the focus',
      fr: 'Une corde passant par le foyer',
      es: 'Una cuerda por el foco',
      ja: '焦点を通る弦',
      zh: '过焦点的弦'
    }, source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 3,
    statement: {
      en: 'A line through the focus $F$ of the parabola $y^2 = 4x$ with slope $1$ meets the parabola at $A$ and $B$. <b>What is $|AB|$?</b>',
      fr: 'Une droite passant par le foyer $F$ de la parabole $y^2 = 4x$, de pente $1$, coupe la parabole en $A$ et $B$. <b>Que vaut $|AB|$ ?</b>',
      es: 'Una recta que pasa por el foco $F$ de la parábola $y^2 = 4x$ con pendiente $1$ corta a la parábola en $A$ y $B$. <b>¿Cuánto vale $|AB|$?</b>',
      ja: '放物線 $y^2 = 4x$ の焦点 $F$ を通る傾き $1$ の直線が放物線と $A$, $B$ で交わります。<b>$|AB|$ はいくらですか？</b>',
      zh: '过抛物线 $y^2 = 4x$ 的焦点 $F$ 且斜率为 $1$ 的直线与抛物线交于 $A$、$B$ 两点。<b>$|AB|$ 等于多少？</b>'
    },
    figureText: {
      en: 'The parabola y² = 4x opening to the right, focus F(1, 0), directrix x = −1. A line of slope 1 through F cuts the parabola at A (upper right) and B (near the vertex).',
      fr: 'La parabole y² = 4x ouverte vers la droite, foyer F(1, 0), directrice x = −1. Une droite de pente 1 passant par F coupe la parabole en A (en haut à droite) et B (près du sommet).',
      es: 'La parábola y² = 4x abierta hacia la derecha, foco F(1, 0), directriz x = −1. Una recta de pendiente 1 por F corta la parábola en A (arriba a la derecha) y B (cerca del vértice).',
      ja: '右に開く放物線 y² = 4x、焦点 F(1, 0)、準線 x = −1。F を通る傾き 1 の直線が放物線と A（右上）と B（頂点付近）で交わります。',
      zh: '开口向右的抛物线 y² = 4x，焦点 F(1, 0)，准线 x = −1。过 F 且斜率为 1 的直线与抛物线交于 A（右上）和 B（靠近顶点）。'
    },
    hint: {
      en: 'For a chord through the focus, $|AB| = x_1 + x_2 + p$ (distance to the directrix).',
      fr: 'Pour une corde passant par le foyer, $|AB| = x_1 + x_2 + p$ (distance à la directrice).',
      es: 'Para una cuerda que pasa por el foco, $|AB| = x_1 + x_2 + p$ (distancia a la directriz).',
      ja: '焦点を通る弦では $|AB| = x_1 + x_2 + p$（準線までの距離）。',
      zh: '对于过焦点的弦，$|AB| = x_1 + x_2 + p$（到准线的距离）。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example the formula |AB| = 2p/sin²θ, or computing A and B directly), show every step, then check each option and say which one is correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple la formule |AB| = 2p/sin²θ, ou en calculant A et B directement), montre chaque étape, puis vérifie chaque option et dis laquelle est correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con la fórmula |AB| = 2p/sin²θ, o calculando A y B directamente), muestra cada paso y luego comprueba cada opción y di cuál es correcta.',
      ja: 'できれば別の方法で解いてください（例えば公式 |AB| = 2p/sin²θ、または A と B を直接求める）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如公式 |AB| = 2p/sin²θ，或直接求出 A 和 B），写出每一步，然后逐项检查选项并指出哪一个正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.3, h: 8.8, scale: 34, pad: 30 });
      F.seg(pS([-1.4, 0]), pS([6.7, 0]), 'axis'); F.seg(pS([0, -3.3]), pS([0, 5.3]), 'axis');
      F.seg(pS([-1, -3.3]), pS([-1, 5.3]), 'hidden-edge'); F.text(pS([-1, 5.1]), 'x = −1', 'tick', -26, 0);
      const pts = []; for (let y = -3.3; y <= 5.3; y += 0.1) pts.push(pS([y * y / 4, y])); F.curve(pts, 'conic');
      F.seg(pS([-1.2, -2.2]), pS([6.6, 5.6]), 'sight');
      [pF, pA, pB].forEach(p => F.dot(p)); F.text(pF, 'F', 'pt', 4, 16); F.text(pA, 'A', 'pt', -12, -6); F.text(pB, 'B', 'pt', -16, 4);
      F.text(pS([0, 0]), 'O', 'pt small', -10, 12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'line:': { fr: 'droite :', es: 'recta:', ja: '直線：', zh: '直线：' },
      'with': { fr: 'avec', es: 'con', ja: 'と', zh: '与' }
    },
    options: [
      { tex: '|AB| = 8', correct: true, why: '$x_1 + x_2 + p = 6 + 2$.' },
      { tex: '|AB| = 6', correct: false, why: {
        en: 'Forgets to add $p = 2$.',
        fr: 'Oublie d\'ajouter $p = 2$.',
        es: 'Olvida sumar $p = 2$.',
        ja: '$p = 2$ を足し忘れています。',
        zh: '忘了加上 $p = 2$。'
      } },
      { tex: '|AB| = 4\\sqrt2', correct: false, why: {
        en: 'A guess from the slope; the chord is longer.',
        fr: 'Une estimation à partir de la pente ; la corde est plus longue.',
        es: 'Una suposición a partir de la pendiente; la cuerda es más larga.',
        ja: '傾きからの推測。弦はもっと長いです。',
        zh: '根据斜率的猜测；弦其实更长。'
      } },
      { tex: '|AB| = 16', correct: false, why: {
        en: 'Uses $\\tfrac{4p}{\\sin^2\\theta}$ instead of $\\tfrac{2p}{\\sin^2\\theta}$.',
        fr: 'Utilise $\\tfrac{4p}{\\sin^2\\theta}$ au lieu de $\\tfrac{2p}{\\sin^2\\theta}$.',
        es: 'Usa $\\tfrac{4p}{\\sin^2\\theta}$ en lugar de $\\tfrac{2p}{\\sin^2\\theta}$.',
        ja: '$\\tfrac{2p}{\\sin^2\\theta}$ ではなく $\\tfrac{4p}{\\sin^2\\theta}$ を使っています。',
        zh: '用了 $\\tfrac{4p}{\\sin^2\\theta}$ 而不是 $\\tfrac{2p}{\\sin^2\\theta}$。'
      } },
      { tex: '|AB| = 4', correct: false, why: {
        en: 'That is the latus rectum $2p$ — the vertical focal chord.',
        fr: 'C\'est le paramètre focal $2p$ — la corde focale verticale.',
        es: 'Eso es el lado recto $2p$ — la cuerda focal vertical.',
        ja: 'それは通径 $2p$ — 焦点を通る垂直な弦です。',
        zh: '那是通径 $2p$ —— 竖直的焦点弦。'
      } },
      { tex: '|AB| = 2\\sqrt{2}', correct: false, why: {
        en: 'Half of $4\\sqrt2$.',
        fr: 'La moitié de $4\\sqrt2$.',
        es: 'La mitad de $4\\sqrt2$.',
        ja: '$4\\sqrt2$ の半分。',
        zh: '$4\\sqrt2$ 的一半。'
      } },
      { tex: '|AB| = 12', correct: false, why: {
        en: 'Adds $p$ twice per point.',
        fr: 'Ajoute $p$ deux fois par point.',
        es: 'Suma $p$ dos veces por punto.',
        ja: '各点で $p$ を二重に足しています。',
        zh: '每个点把 $p$ 加了两次。'
      } },
      { tex: '|AB| = 6\\sqrt2', correct: false, why: {
        en: 'Treats $x_1 + x_2$ as a horizontal length along the line.',
        fr: 'Traite $x_1 + x_2$ comme une longueur horizontale le long de la droite.',
        es: 'Trata $x_1 + x_2$ como una longitud horizontal a lo largo de la recta.',
        ja: '$x_1 + x_2$ を直線に沿った水平の長さとして扱っています。',
        zh: '把 $x_1 + x_2$ 当成沿直线的水平长度。'
      } }
    ],
    steps: [
      { title: { en: 'Focus and the line', fr: 'Le foyer et la droite', es: 'El foco y la recta', ja: '焦点と直線', zh: '焦点与直线' }, lines: ['y^2 = 2px \\text{ with } p = 2\\ \\Rightarrow\\ F(1, 0)', '\\text{line: } y = x - 1'], note: {
        en: 'The directrix is $x = -1$.',
        fr: 'La directrice est $x = -1$.',
        es: 'La directriz es $x = -1$.',
        ja: '準線は $x = -1$。',
        zh: '准线是 $x = -1$。'
      } },
      { title: { en: 'Intersect', fr: 'Intersection', es: 'Intersecar', ja: '交点', zh: '求交点' }, lines: ['(x - 1)^2 = 4x\\ \\Rightarrow\\ x^2 - 6x + 1 = 0', 'x_1 + x_2 = 6,\\qquad x_1x_2 = 1'], note: {
        en: 'Vieta’s formulas — no need to find the points.',
        fr: 'Formules de Viète — pas besoin de trouver les points.',
        es: 'Fórmulas de Vieta — no hace falta hallar los puntos.',
        ja: '解と係数の関係 — 交点を求める必要はありません。',
        zh: '韦达定理 —— 无需求出交点。'
      },
        fig(F) { F.draw(F.seg(pB, pA, 'hl yellow', 'over'), 900); } },
      { title: {
        en: 'Distance to the directrix',
        fr: 'Distance à la directrice',
        es: 'Distancia a la directriz',
        ja: '準線までの距離',
        zh: '到准线的距离'
      }, lines: ['|AF| = x_1 + 1,\\qquad |BF| = x_2 + 1', '|AB| = x_1 + x_2 + 2 = \\boxed{8}'], note: {
        en: 'Every point of a parabola is as far from the focus as from the directrix.',
        fr: 'Chaque point d\'une parabole est aussi loin du foyer que de la directrice.',
        es: 'Cada punto de una parábola está a la misma distancia del foco que de la directriz.',
        ja: '放物線上のどの点も、焦点と準線から等距離にあります。',
        zh: '抛物线上每一点到焦点的距离等于到准线的距离。'
      },
        fig(F) { const dA = pS([-1, 2 + 2 * S2]), dB = pS([-1, 2 - 2 * S2]); F.draw(F.seg(pA, dA, 'hl blue', 'over'), 700); F.draw(F.seg(pB, dB, 'hl blue', 'over'), 500, 400); } },
      { title: {
        en: 'Check with the angle formula',
        fr: 'Vérifier avec la formule de l\'angle',
        es: 'Comprobar con la fórmula del ángulo',
        ja: '角の公式で確認',
        zh: '用角的公式验证'
      }, lines: ['|AB| = \\frac{2p}{\\sin^2 45^\\circ} = \\frac{4}{1/2} = 8\\ \\checkmark'], note: {
        en: 'The midpoint of $AB$ is $M(3, 2)$.',
        fr: 'Le milieu de $AB$ est $M(3, 2)$.',
        es: 'El punto medio de $AB$ es $M(3, 2)$.',
        ja: '$AB$ の中点は $M(3, 2)$。',
        zh: '$AB$ 的中点是 $M(3, 2)$。'
      },
        fig(F) { F.fadeIn(F.dot(pM, 'center'), 300); F.fadeIn(F.text(pM, 'M(3, 2)', 'len small', 30, 12), 300, 200); } },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Exactly one option is correct.',
        fr: 'Une seule option est correcte.',
        es: 'Exactamente una opción es correcta.',
        ja: '正しい選択肢はちょうど1つ。',
        zh: '恰有一个选项正确。'
      } }
    ]
  };

  PuzzleBank.define(parabola);
})(PuzzleBank.kit);
