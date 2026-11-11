/* number · The last digit of a giant
   Number theory: last digit of a huge power (none of the options is right!) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const nc = [4, 3], nR = 2.1;
  const node = k => { const a = (90 - k * 90) * Math.PI / 180; return [nc[0] + nR * Math.cos(a), nc[1] + nR * Math.sin(a)]; };
  const lastDigit = {
    id: 'nt-last-digit-7-2026',
    category: 'number',
    title: {
      en: 'The last digit of a giant',
      fr: 'Le dernier chiffre d\'un géant',
      es: 'La última cifra de un gigante',
      ja: '巨大な数の一の位',
      zh: '巨大数的个位'
    },
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["amc"]
    },
    difficulty: 2,
    statement: {
      en: '$7^{2026}$ has more than 1700 digits. <b>Which of the following is its last digit?</b>',
      fr: '$7^{2026}$ a plus de 1700 chiffres. <b>Lequel des chiffres suivants est son dernier chiffre ?</b>',
      es: '$7^{2026}$ tiene más de 1700 cifras. <b>¿Cuál de las siguientes es su última cifra?</b>',
      ja: '$7^{2026}$ は1700桁以上あります。<b>その一の位は次のうちどれですか？</b>',
      zh: '$7^{2026}$ 有 1700 多位数字。<b>它的个位数字是下列哪一个？</b>'
    },
    figureText: {
      en: "A cycle of four nodes for the last digit of 7, 7², 7³, 7⁴, with only the first, 7, filled in. The rest are found in the solution.",
      fr: "Un cycle de quatre nœuds pour le dernier chiffre de 7, 7², 7³, 7⁴, seul le premier (7) est rempli. Les autres sont trouvés dans la solution.",
      es: "Un ciclo de cuatro nodos para la última cifra de 7, 7², 7³, 7⁴, con solo la primera (7). Las demás se hallan en la solución.",
      ja: "7, 7², 7³, 7⁴ の一の位の4つの輪。最初の 7 だけ記入。残りは解答で。",
      zh: "7、7²、7³、7⁴ 个位数的四节点循环，只填出第一个 7。其余在解答中求出。"
    },
    hint: {
      en: 'Write the last digits of $7, 7^2, 7^3, \\dots$ and look for a pattern.',
      fr: 'Écrivez les derniers chiffres de $7, 7^2, 7^3, \\dots$ et cherchez un motif.',
      es: 'Escribe las últimas cifras de $7, 7^2, 7^3, \\dots$ y busca un patrón.',
      ja: '$7, 7^2, 7^3, \\dots$ の一の位を書き出し、規則性を探します。',
      zh: '写出 $7, 7^2, 7^3, \\dots$ 的个位数字，寻找规律。'
    },
    aiHint: {
      en: 'Please solve it with another method if you can (for example modular arithmetic or Euler’s theorem), show every step, then check each option — it is possible that none of them is correct.',
      fr: 'Résous-le avec une autre méthode si possible (par exemple l\'arithmétique modulaire ou le théorème d\'Euler), montre chaque étape, puis vérifie chaque option — il est possible qu\'aucune ne soit correcte.',
      es: 'Resuélvelo con otro método si puedes (por ejemplo aritmética modular o el teorema de Euler), muestra cada paso y luego comprueba cada opción — es posible que ninguna sea correcta.',
      ja: 'できれば別の方法で解いてください（例えば合同式やオイラーの定理）。すべての手順を示し、各選択肢を確認してください — どれも正しくない可能性もあります。',
      zh: '如果可以，请用另一种方法求解（例如模运算或欧拉定理），写出每一步，然后逐项检查选项 —— 有可能没有一个是正确的。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 6, scale: 36, pad: 20 });
      F.arrowDefs();
      F.circle(nc, nR, 'ring');
      const digits = ['7', '9', '3', '1'], pw = ['7¹', '7²', '7³', '7⁴'];
      for (let k = 0; k < 4; k++) {
        const a0 = 90 - k * 90 - 20, a1 = 90 - k * 90 - 70;
        const arc = F.arc(nc, nR, a0, a1, 'cyc', 'base'); arc.setAttribute('marker-end', 'url(#arrowhead)');
        const p = node(k); const c = F.circle(p, 0.52, 'node'); c.dataset.k = k;
        F.text(p, k ? '?' : digits[k], 'nodenum');
        const out = [nc[0] + (nR + 0.95) * Math.cos((90 - k * 90) * Math.PI / 180), nc[1] + (nR + 0.95) * Math.sin((90 - k * 90) * Math.PI / 180)];
        F.text(out, pw[k], 'tick');
      }
      F.text(nc, 'last digit', 'tick');
      F.text([nc[0], nc[1] - 0.45], 'of 7ⁿ', 'tick');
      F.reveal = () => {
        for (let k = 1; k < 4; k++) { F.circle(node(k), 0.46, 'fill-yellow', 'over'); F.text(node(k), digits[k], 'nodenum', 0, 0, 'over'); }
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      'ends like': { fr: 'se termine comme', es: 'termina como', ja: '一の位は', zh: '个位为' },
      'last digit': { fr: 'dernier chiffre', es: 'última cifra', ja: '一の位', zh: '个位数字' },
      'of 7ⁿ': { fr: 'de 7ⁿ', es: 'de 7ⁿ', ja: '7ⁿ の', zh: '7ⁿ 的' }
    },
    options: [
      { tex: '1', correct: false, why: {
        en: 'Ends a full cycle: $7^{2024}$ ends in 1, not $7^{2026}$.',
        fr: 'Termine un cycle complet : $7^{2024}$ se termine par 1, pas $7^{2026}$.',
        es: 'Cierra un ciclo completo: $7^{2024}$ termina en 1, no $7^{2026}$.',
        ja: '周期がちょうど一巡：$7^{2024}$ の一の位が 1 であり、$7^{2026}$ ではありません。',
        zh: '正好一个完整周期：$7^{2024}$ 的个位是 1，而不是 $7^{2026}$。'
      } },
      { tex: '3', correct: false, why: {
        en: 'That is $7^3$, $7^{2027}$, …',
        fr: 'C\'est-à-dire $7^3$, $7^{2027}$, …',
        es: 'Es decir, $7^3$, $7^{2027}$, …',
        ja: 'つまり $7^3$, $7^{2027}$, …',
        zh: '即 $7^3$、$7^{2027}$、…'
      } },
      { tex: '7', correct: false, why: {
        en: 'That is $7^1$, $7^{2025}$, …',
        fr: 'C\'est-à-dire $7^1$, $7^{2025}$, …',
        es: 'Es decir, $7^1$, $7^{2025}$, …',
        ja: 'つまり $7^1$, $7^{2025}$, …',
        zh: '即 $7^1$、$7^{2025}$、…'
      } },
      { tex: '0', correct: false, why: {
        en: 'Powers of 7 are not multiples of 10.',
        fr: 'Les puissances de 7 ne sont pas des multiples de 10.',
        es: 'Las potencias de 7 no son múltiplos de 10.',
        ja: '7 のべき乗は 10 の倍数になりません。',
        zh: '7 的幂不是 10 的倍数。'
      } },
      { tex: '2', correct: false, why: {
        en: 'Powers of 7 are odd.',
        fr: 'Les puissances de 7 sont impaires.',
        es: 'Las potencias de 7 son impares.',
        ja: '7 のべき乗は奇数です。',
        zh: '7 的幂都是奇数。'
      } },
      { tex: '4', correct: false, why: {
        en: 'Powers of 7 are odd.',
        fr: 'Les puissances de 7 sont impaires.',
        es: 'Las potencias de 7 son impares.',
        ja: '7 のべき乗は奇数です。',
        zh: '7 的幂都是奇数。'
      } },
      { tex: '6', correct: false, why: {
        en: 'Powers of 7 are odd.',
        fr: 'Les puissances de 7 sont impaires.',
        es: 'Las potencias de 7 son impares.',
        ja: '7 のべき乗は奇数です。',
        zh: '7 的幂都是奇数。'
      } },
      { tex: '8', correct: false, why: {
        en: 'Powers of 7 are odd.',
        fr: 'Les puissances de 7 sont impaires.',
        es: 'Las potencias de 7 son impares.',
        ja: '7 のべき乗は奇数です。',
        zh: '7 的幂都是奇数。'
      } }
    ],
    steps: [
      {
        title: {
          en: 'Only the last digit matters',
          fr: 'Seul le dernier chiffre compte',
          es: 'Solo importa la última cifra',
          ja: '一の位だけが重要',
          zh: '只有个位数字重要'
        },
        lines: ['7^1 = 7,\\quad 7^2 = 49,\\quad 7^3 = 343,\\quad 7^4 = 2401,\\quad 7^5 = 16807'],
        note: {
          en: 'To get the next last digit, multiply the previous last digit by 7.',
          fr: 'Pour obtenir le dernier chiffre suivant, multipliez le dernier chiffre précédent par 7.',
          es: 'Para obtener la siguiente última cifra, multiplica la última cifra anterior por 7.',
          ja: '次の一の位は、前の一の位に 7 を掛けて求めます。',
          zh: '要得到下一个个位数字，把前一个个位数字乘以 7。'
        },
        fig(F) { F.svg.querySelectorAll('.node').forEach((c, k) => { c.style.transition = 'fill .3s ' + (k * 350) + 'ms'; c.classList.add('lit'); }); }
      },
      {
        title: {
          en: 'The pattern repeats every 4',
          fr: 'Le motif se répète tous les 4',
          es: 'El patrón se repite cada 4',
          ja: '4つごとに繰り返す',
          zh: '每 4 个循环一次'
        },
        lines: ['7,\\ 9,\\ 3,\\ 1,\\ 7,\\ 9,\\ 3,\\ 1,\\ \\dots'],
        note: {
          en: 'After $7^4$ ends in 1, multiplying by 7 starts the cycle again.',
          fr: 'Après $7^4$ qui se termine par 1, multiplier par 7 relance le cycle.',
          es: 'Como $7^4$ termina en 1, multiplicar por 7 vuelve a empezar el ciclo.',
          ja: '$7^4$ の一の位が 1 になった後、7 を掛けるとまた周期が始まります。',
          zh: '$7^4$ 个位为 1 之后，再乘以 7 就重新开始循环。'
        },
        fig(F) { F.svg.querySelectorAll('.cyc').forEach((c, k) => { c.classList.add('strong'); F.draw(c, 500, k * 300); }); }
      },
      {
        title: {
          en: 'Where 2026 lands in the cycle',
          fr: 'Où tombe 2026 dans le cycle',
          es: 'Dónde cae 2026 en el ciclo',
          ja: '2026 は周期のどこに当たるか',
          zh: '2026 落在周期的哪个位置'
        },
        lines: ['2026 = 4 \\cdot 506 + 2', '7^{2026} \\text{ ends like } 7^2 \\Rightarrow \\boxed{9}'],
        note: {
          en: 'Remainder 2 → the second digit of the cycle.',
          fr: 'Reste 2 → le deuxième chiffre du cycle.',
          es: 'Resto 2 → la segunda cifra del ciclo.',
          ja: '余り 2 → 周期の2番目の数字。',
          zh: '余数为 2 → 周期中的第二个数字。'
        },
        fig(F) { if (F.reveal) F.reveal(); const c = F.svg.querySelector('.node[data-k="1"]'); c.classList.add('hit'); F.fadeIn(F.circle(node(1), 0.78, 'halo', 'over'), 500, 200); }
      },
      {
        title: {
          en: 'Check with congruences',
          fr: 'Vérifier avec les congruences',
          es: 'Comprobar con congruencias',
          ja: '合同式で確認',
          zh: '用同余验证'
        },
        lines: ['7^4 = 2401 \\equiv 1 \\pmod{10}', '7^{2026} = (7^4)^{506}\\cdot 7^2 \\equiv 1^{506}\\cdot 49 \\equiv 9 \\pmod{10}'],
        note: {
          en: 'Working modulo 10 keeps only the last digit.',
          fr: 'Travailler modulo 10 ne garde que le dernier chiffre.',
          es: 'Trabajar módulo 10 conserva solo la última cifra.',
          ja: '10 を法として計算すると一の位だけが残ります。',
          zh: '模 10 运算只保留个位数字。'
        }
      },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'The last digit is 9 — it is not among the options, so “None of these is correct” is the right answer.',
        fr: 'Le dernier chiffre est 9 — il ne figure pas parmi les options, donc « Aucune n\'est correcte » est la bonne réponse.',
        es: 'La última cifra es 9 — no está entre las opciones, así que «Ninguna es correcta» es la respuesta correcta.',
        ja: '一の位は 9 — 選択肢にないので「どれも正しくない」が正解です。',
        zh: '个位数字是 9 —— 它不在选项中，所以“以上都不正确”是正确答案。'
      } }
    ]
  };

  PuzzleBank.define(lastDigit);
})(PuzzleBank.kit);
