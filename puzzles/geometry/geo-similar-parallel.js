/* geometry · Cut by a parallel line
   9 ── Similar triangles: DE ∥ BC (exactly one option is right) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const sA = [3, 4.5], sB = [0, 0], sC = [6, 0], sD = lerp(sA, sB, 0.4), sE = lerp(sA, sC, 0.4);
  const similar = {
    id: 'geo-similar-parallel', category: 'geometry', title: {
      en: 'Cut by a parallel line',
      fr: 'Coupé par une parallèle',
      es: 'Cortado por una paralela',
      ja: '平行線で切る',
      zh: '被平行线截'
    }, difficulty: 1,
    statement: {
      en: 'In triangle $ABC$, $D$ is on $AB$ and $E$ is on $AC$ with $DE \\parallel BC$ and $AD : DB = 2 : 3$. The area of $\\triangle ADE$ is $8$. <b>What is the area of $\\triangle ABC$?</b>',
      fr: 'Dans le triangle $ABC$, $D$ est sur $AB$ et $E$ sur $AC$ avec $DE \\parallel BC$ et $AD : DB = 2 : 3$. L\'aire de $\\triangle ADE$ vaut $8$. <b>Quelle est l\'aire de $\\triangle ABC$ ?</b>',
      es: 'En el triángulo $ABC$, $D$ está en $AB$ y $E$ en $AC$ con $DE \\parallel BC$ y $AD : DB = 2 : 3$. El área de $\\triangle ADE$ es $8$. <b>¿Cuál es el área de $\\triangle ABC$?</b>',
      ja: '三角形 $ABC$ で、$D$ は $AB$ 上、$E$ は $AC$ 上にあり、$DE \\parallel BC$、$AD : DB = 2 : 3$ です。$\\triangle ADE$ の面積は $8$ です。<b>$\\triangle ABC$ の面積はいくらですか？</b>',
      zh: '在三角形 $ABC$ 中，$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，$DE \\parallel BC$ 且 $AD : DB = 2 : 3$。$\\triangle ADE$ 的面积为 $8$。<b>$\\triangle ABC$ 的面积是多少？</b>'
    },
    figureText: {
      en: 'Triangle ABC with apex A at the top and base BC at the bottom. A segment DE parallel to BC cuts the sides AB and AC, with AD : DB = 2 : 3. The small top triangle ADE has area 8.',
      fr: 'Triangle ABC de sommet A en haut et de base BC en bas. Un segment DE parallèle à BC coupe les côtés AB et AC, avec AD : DB = 2 : 3. Le petit triangle du haut ADE a pour aire 8.',
      es: 'Triángulo ABC con vértice A arriba y base BC abajo. Un segmento DE paralelo a BC corta los lados AB y AC, con AD : DB = 2 : 3. El pequeño triángulo superior ADE tiene área 8.',
      ja: '頂点 A が上、底辺 BC が下の三角形 ABC。BC に平行な線分 DE が辺 AB, AC を切り、AD : DB = 2 : 3。上の小さな三角形 ADE の面積は 8。',
      zh: '三角形 ABC，顶点 A 在上，底边 BC 在下。与 BC 平行的线段 DE 截 AB 和 AC 两边，AD : DB = 2 : 3。上方的小三角形 ADE 面积为 8。'
    },
    hint: {
      en: 'Similar triangles: areas scale with the square of the ratio of sides.',
      fr: 'Triangles semblables : les aires varient comme le carré du rapport des côtés.',
      es: 'Triángulos semejantes: las áreas escalan con el cuadrado de la razón de los lados.',
      ja: '相似な三角形：面積は辺の比の2乗に比例します。',
      zh: '相似三角形：面积之比等于边长之比的平方。'
    },
    aiHint: {
      en: 'Please solve it another way if you can (for example with heights and bases, or coordinates), show every step, then check each option and say which one is correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple avec des hauteurs et des bases, ou des coordonnées), montre chaque étape, puis vérifie chaque option et dis laquelle est correcte.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo con alturas y bases, o coordenadas), muestra cada paso y luego comprueba cada opción y di cuál es correcta.',
      ja: 'できれば別の方法で解いてください（例えば高さと底辺、または座標）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如利用高和底，或坐标法），写出每一步，然后逐项检查选项并指出哪一个正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 4.6, scale: 46, pad: 24 });
      F.path([sA, sB, sC], 'tri'); F.seg(sD, sE);
      F.fadeIn(F.path([sA, sD, sE], 'fill-blue', 'fills'), 1);
      [[sA, 'A', 0, -10], [sB, 'B', -10, 10], [sC, 'C', 10, 10], [sD, 'D', -12, 0], [sE, 'E', 12, 0]].forEach(([p, t, dx, dy]) => F.text(p, t, 'pt', dx, dy));
      F.text([3, 3.3], '8', 'len');
      F.text(mid(sA, sD), '2', 'len small', -12, 0); F.text(mid(sD, sB), '3', 'len small', -12, 0);
      return F;
    },
    options: [
      { tex: '50', correct: true, why: '$8\\cdot\\left(\\tfrac52\\right)^2$.' },
      { tex: '20', correct: false, why: {
        en: 'Scales the area by the side ratio $\\tfrac52$ instead of its square.',
        fr: 'Multiplie l\'aire par le rapport des côtés $\\tfrac52$ au lieu de son carré.',
        es: 'Escala el área por la razón de lados $\\tfrac52$ en lugar de por su cuadrado.',
        ja: '面積を相似比の2乗ではなく相似比 $\\tfrac52$ 倍にしています。',
        zh: '按边长比 $\\tfrac52$ 而不是其平方来缩放面积。'
      } },
      { tex: '18', correct: false, why: {
        en: 'Uses $\\tfrac32$ ($DB : AD$) instead of $\\tfrac52$ ($AB : AD$).',
        fr: 'Utilise $\\tfrac32$ ($DB : AD$) au lieu de $\\tfrac52$ ($AB : AD$).',
        es: 'Usa $\\tfrac32$ ($DB : AD$) en lugar de $\\tfrac52$ ($AB : AD$).',
        ja: '$\\tfrac52$ ($AB : AD$) ではなく $\\tfrac32$ ($DB : AD$) を使っています。',
        zh: '用了 $\\tfrac32$（$DB : AD$）而不是 $\\tfrac52$（$AB : AD$）。'
      } },
      { tex: '42', correct: false, why: {
        en: 'That is the trapezoid $DBCE$ only.',
        fr: 'C\'est seulement le trapèze $DBCE$.',
        es: 'Eso es solo el trapecio $DBCE$.',
        ja: 'それは台形 $DBCE$ だけです。',
        zh: '那只是梯形 $DBCE$。'
      } },
      { tex: '32', correct: false, why: {
        en: 'Multiplies by $2^2$.',
        fr: 'Multiplie par $2^2$.',
        es: 'Multiplica por $2^2$.',
        ja: '$2^2$ を掛けています。',
        zh: '乘了 $2^2$。'
      } },
      { tex: '\\tfrac{50}{3}', correct: false, why: {
        en: 'Mixes up the ratio $2:3$ with $2:5$.',
        fr: 'Confond le rapport $2:3$ avec $2:5$.',
        es: 'Confunde la razón $2:3$ con $2:5$.',
        ja: '比 $2:3$ と $2:5$ を混同しています。',
        zh: '把比 $2:3$ 和 $2:5$ 弄混了。'
      } },
      { tex: '72', correct: false, why: {
        en: 'Uses $\\left(\\tfrac{3}{1}\\right)^2$.',
        fr: 'Utilise $\\left(\\tfrac{3}{1}\\right)^2$.',
        es: 'Usa $\\left(\\tfrac{3}{1}\\right)^2$.',
        ja: '$\\left(\\tfrac{3}{1}\\right)^2$ を使っています。',
        zh: '用了 $\\left(\\tfrac{3}{1}\\right)^2$。'
      } },
      { tex: '40', correct: false, why: {
        en: 'Adds $8\\cdot 4$ to $8$.',
        fr: 'Ajoute $8\\cdot 4$ à $8$.',
        es: 'Suma $8\\cdot 4$ a $8$.',
        ja: '$8$ に $8\\cdot 4$ を足しています。',
        zh: '把 $8\\cdot 4$ 加到 $8$ 上。'
      } }
    ],
    steps: [
      { title: { en: 'Similar triangles', fr: 'Triangles semblables', es: 'Triángulos semejantes', ja: '相似な三角形', zh: '相似三角形' }, lines: ['DE \\parallel BC\\ \\Rightarrow\\ \\triangle ADE \\sim \\triangle ABC', '\\frac{AD}{AB} = \\frac{2}{2 + 3} = \\frac25'], note: {
        en: 'Corresponding angles are equal because of the parallel lines.',
        fr: 'Les angles correspondants sont égaux grâce aux droites parallèles.',
        es: 'Los ángulos correspondientes son iguales por las rectas paralelas.',
        ja: '平行線なので同位角は等しくなります。',
        zh: '由于两直线平行，同位角相等。'
      },
        fig(F) { F.draw(F.seg(sD, sE, 'hl blue', 'over'), 600); F.draw(F.seg(sB, sC, 'hl blue', 'over'), 700, 300); } },
      { title: {
        en: 'Areas scale with the square',
        fr: 'Les aires varient comme le carré',
        es: 'Las áreas escalan con el cuadrado',
        ja: '面積は相似比の2乗に比例',
        zh: '面积按平方缩放'
      }, lines: ['\\frac{S_{ADE}}{S_{ABC}} = \\left(\\frac25\\right)^2 = \\frac{4}{25}', 'S_{ABC} = 8\\cdot\\frac{25}{4} = \\boxed{50}'],
        fig(F) { F.fadeIn(F.path([sA, sB, sC], 'fill-yellow', 'fills'), 700); F.fadeIn(F.text([3, 1.2], '50', 'len yellow'), 400, 500); } },
      { title: { en: 'The trapezoid', fr: 'Le trapèze', es: 'El trapecio', ja: '台形', zh: '梯形' }, lines: ['S_{DBCE} = 50 - 8 = 42'], note: {
        en: 'A common trap: 42 is not the whole triangle.',
        fr: 'Un piège classique : 42 n\'est pas le triangle entier.',
        es: 'Una trampa habitual: 42 no es el triángulo entero.',
        ja: 'よくある落とし穴：42 は三角形全体ではありません。',
        zh: '常见陷阱：42 并不是整个三角形。'
      } },
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

  PuzzleBank.define(similar);
})(PuzzleBank.kit);
