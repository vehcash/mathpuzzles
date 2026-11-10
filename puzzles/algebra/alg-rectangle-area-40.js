/* algebra · Three metres longer
   Algebra: a rectangle given by its area */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const rect = {
    id: 'alg-rectangle-area-40',
    category: 'algebra',
    title: { en: 'Three metres longer', fr: 'Trois mètres de plus', es: 'Tres metros más largo', ja: '3メートル長い', zh: '长三米' },
    difficulty: 1,
    statement: {
      en: 'The length of a rectangle is $3$ more than its width $w$, and its area is $40$. <b>Which of the following are equal to $w$?</b>',
      fr: 'La longueur d\'un rectangle dépasse de $3$ sa largeur $w$, et son aire vaut $40$. <b>Lesquelles des valeurs suivantes sont égales à $w$ ?</b>',
      es: 'La longitud de un rectángulo es $3$ más que su anchura $w$, y su área es $40$. <b>¿Cuáles de los siguientes son iguales a $w$?</b>',
      ja: '長方形の長さは幅 $w$ より $3$ 長く、面積は $40$ です。<b>次のうち $w$ に等しいものはどれですか？</b>',
      zh: '一个矩形的长比宽 $w$ 多 $3$，面积为 $40$。<b>下列哪些等于 $w$？</b>'
    },
    figureText: {
      en: 'A rectangle with width w (short side) and length w + 3 (long side); the area inside is 40.',
      fr: 'Un rectangle de largeur w (petit côté) et de longueur w + 3 (grand côté) ; l\'aire intérieure vaut 40.',
      es: 'Un rectángulo de anchura w (lado corto) y longitud w + 3 (lado largo); el área interior es 40.',
      ja: '幅 w（短い辺）、長さ w + 3（長い辺）の長方形。内部の面積は 40。',
      zh: '宽为 w（短边）、长为 w + 3（长边）的矩形；内部面积为 40。'
    },
    hint: {
      en: 'Write the area as $w(w+3)$ and solve the quadratic equation.',
      fr: 'Écrivez l\'aire sous la forme $w(w+3)$ et résolvez l\'équation du second degré.',
      es: 'Escribe el área como $w(w+3)$ y resuelve la ecuación de segundo grado.',
      ja: '面積を $w(w+3)$ と表し、2次方程式を解きます。',
      zh: '把面积写成 $w(w+3)$，解这个二次方程。'
    },
    aiHint: {
      en: 'Please solve it in a different way if you can (for example completing the square, or a quick guess-and-check of factor pairs of 40), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple la forme canonique, ou un essai rapide des paires de facteurs de 40), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo completando el cuadrado, o probando rápidamente parejas de factores de 40), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば平方完成、または 40 の約数の組を素早く試す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如配方法，或快速试一试 40 的因数对），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 5, scale: 36, pad: 34 });
      F.path([[0, 0], [8, 0], [8, 5], [0, 5]], 'tri');
      F.right([0, 0], [1, 0], [0, 1], 0.4);
      F.text([0, 2.5], 'w', 'len it', -16, 0); F.text([4, 0], 'w + 3', 'len it', 0, 18);
      F.text([4, 2.5], 'Area = 40', 'len big');
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'Area = 40': { fr: 'Aire = 40', es: 'Área = 40', ja: '面積 = 40', zh: '面积 = 40' },
      'check:': { fr: 'vérification :', es: 'comprobación:', ja: '確認：', zh: '验证：' },
      'or': { fr: 'ou', es: 'o', ja: 'または', zh: '或' }
    },
    options: [
      { tex: 'w = 5', correct: true, why: {
        en: 'The width: $5\\cdot 8 = 40$.',
        fr: 'La largeur : $5\\cdot 8 = 40$.',
        es: 'La anchura: $5\\cdot 8 = 40$.',
        ja: '幅：$5\\cdot 8 = 40$。',
        zh: '宽：$5\\cdot 8 = 40$。'
      } },
      { tex: 'w = \\tfrac{-3 + \\sqrt{169}}{2}', correct: true, why: {
        en: 'The quadratic formula: $\\tfrac{-3+13}{2} = 5$.',
        fr: 'La formule du second degré : $\\tfrac{-3+13}{2} = 5$.',
        es: 'La fórmula cuadrática: $\\tfrac{-3+13}{2} = 5$.',
        ja: '解の公式：$\\tfrac{-3+13}{2} = 5$。',
        zh: '求根公式：$\\tfrac{-3+13}{2} = 5$。'
      } },
      { tex: 'w = 8', correct: false, why: {
        en: 'That is the length $w + 3$.',
        fr: 'C\'est la longueur $w + 3$.',
        es: 'Eso es la longitud $w + 3$.',
        ja: 'それは長さ $w + 3$ です。',
        zh: '那是长 $w + 3$。'
      } },
      { tex: 'w = -8', correct: false, why: {
        en: 'The other root of the equation — a width cannot be negative.',
        fr: 'L\'autre racine de l\'équation — une largeur ne peut pas être négative.',
        es: 'La otra raíz de la ecuación — una anchura no puede ser negativa.',
        ja: '方程式のもう1つの解 — 幅は負になりません。',
        zh: '方程的另一个根 —— 宽不能为负。'
      } },
      { tex: 'w = \\tfrac{-3 - \\sqrt{169}}{2}', correct: false, why: {
        en: 'Also $-8$, the negative root.',
        fr: 'Aussi $-8$, la racine négative.',
        es: 'También $-8$, la raíz negativa.',
        ja: '負の解 $-8$ も含んでいます。',
        zh: '还包含了负根 $-8$。'
      } },
      { tex: 'w = \\sqrt{40}', correct: false, why: {
        en: 'The side of a square with area 40.',
        fr: 'Le côté d\'un carré d\'aire 40.',
        es: 'El lado de un cuadrado de área 40.',
        ja: '面積 40 の正方形の1辺。',
        zh: '面积为 40 的正方形的边长。'
      } },
      { tex: 'w = \\dfrac{40}{3}', correct: false, why: {
        en: 'Divides the area by 3 — mixes up “3 more” with “3 times”.',
        fr: 'Divise l\'aire par 3 — confond « 3 de plus » et « 3 fois ».',
        es: 'Divide el área entre 3 — confunde «3 más» con «3 veces».',
        ja: '面積を 3 で割っています — 「3 長い」と「3 倍」を混同しています。',
        zh: '把面积除以 3 —— 把“多 3”和“3 倍”弄混了。'
      } },
      { tex: 'w = 4', correct: false, why: '$4 \\cdot 7 = 28 \\neq 40$.' }
    ],
    steps: [
      {
        title: {
          en: 'Turn the words into an equation',
          fr: 'Traduire l\'énoncé en équation',
          es: 'Convertir el enunciado en una ecuación',
          ja: '文章を方程式にする',
          zh: '把文字转化为方程'
        },
        lines: ['w\\,(w + 3) = 40', 'w^2 + 3w - 40 = 0'],
        note: {
          en: 'Area of a rectangle = width × length.',
          fr: 'Aire d\'un rectangle = largeur × longueur.',
          es: 'Área de un rectángulo = anchura × longitud.',
          ja: '長方形の面積 = 幅 × 長さ。',
          zh: '矩形面积 = 宽 × 长。'
        },
        fig(F) { F.fadeIn(F.path([[0, 0], [8, 0], [8, 5], [0, 5]], 'fill-yellow', 'fills'), 700); }
      },
      {
        title: { en: 'Factor', fr: 'Factoriser', es: 'Factorizar', ja: '因数分解', zh: '因式分解' },
        lines: ['(w + 8)(w - 5) = 0', 'w = -8 \\quad\\text{or}\\quad w = 5'],
        note: {
          en: 'Look for two numbers that multiply to $-40$ and add to $3$: $8$ and $-5$.',
          fr: 'Cherchez deux nombres dont le produit vaut $-40$ et la somme $3$ : $8$ et $-5$.',
          es: 'Busca dos números cuyo producto sea $-40$ y cuya suma sea $3$: $8$ y $-5$.',
          ja: '積が $-40$、和が $3$ になる2数を探します：$8$ と $-5$。',
          zh: '找两个乘积为 $-40$、和为 $3$ 的数：$8$ 和 $-5$。'
        }
      },
      {
        title: {
          en: 'Keep the root that makes sense',
          fr: 'Garder la racine qui a du sens',
          es: 'Quedarse con la raíz que tiene sentido',
          ja: '意味のある解を残す',
          zh: '保留有意义的根'
        },
        lines: ['w > 0\\ \\Rightarrow\\ \\boxed{w = 5}', '\\text{check: } 5 \\cdot 8 = 40\\ \\checkmark'],
        note: {
          en: 'A length cannot be negative, so $-8$ is rejected.',
          fr: 'Une longueur ne peut pas être négative, donc $-8$ est rejeté.',
          es: 'Una longitud no puede ser negativa, así que se descarta $-8$.',
          ja: '長さは負にならないので $-8$ は不適です。',
          zh: '长度不能为负，所以舍去 $-8$。'
        },
        fig(F) { F.draw(F.seg([0, 0], [0, 5], 'hl blue', 'over'), 700); F.draw(F.seg([0, 0], [8, 0], 'hl pink', 'over'), 900, 300); F.fadeIn(F.text([0, 2.5], '5', 'len', -32, 0), 400, 600); F.fadeIn(F.text([4, 0], '= 8', 'len', 46, 18), 400, 900); }
      },
      {
        title: {
          en: 'Same answer with the quadratic formula',
          fr: 'Même réponse avec la formule du second degré',
          es: 'La misma respuesta con la fórmula cuadrática',
          ja: '解の公式でも同じ答え',
          zh: '用求根公式得到同样的答案'
        },
        lines: ['w = \\frac{-3 \\pm \\sqrt{3^2 + 4\\cdot 40}}{2} = \\frac{-3 \\pm \\sqrt{169}}{2}', '= \\frac{-3 \\pm 13}{2} = 5 \\ \\text{or}\\ -8'],
        note: {
          en: 'So $\\tfrac{-3+\\sqrt{169}}{2}$ is just another way of writing $5$.',
          fr: 'Donc $\\tfrac{-3+\\sqrt{169}}{2}$ n\'est qu\'une autre façon d\'écrire $5$.',
          es: 'Así que $\\tfrac{-3+\\sqrt{169}}{2}$ es solo otra forma de escribir $5$.',
          ja: 'よって $\\tfrac{-3+\\sqrt{169}}{2}$ は $5$ の別の書き方にすぎません。',
          zh: '所以 $\\tfrac{-3+\\sqrt{169}}{2}$ 只是 $5$ 的另一种写法。'
        }
      },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Two options equal $w$; the others are the length, the negative root or slips.',
        fr: 'Deux options sont égales à $w$ ; les autres sont la longueur, la racine négative ou des erreurs.',
        es: 'Dos opciones son iguales a $w$; las demás son la longitud, la raíz negativa o despistes.',
        ja: '2つの選択肢が $w$ に等しく、他は長さ、負の解、または計算ミスです。',
        zh: '有两个选项等于 $w$；其余的是长、负根或计算失误。'
      } }
    ]
  };

  PuzzleBank.define(rect);
})(PuzzleBank.kit);
