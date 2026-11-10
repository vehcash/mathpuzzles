/* probability · Prime time with two dice
   Probability: two dice, prime sum */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, S2, S3 } = K;

  const isPrime = n => [2, 3, 5, 7, 11].includes(n);
  const cellX = i => 1.2 + (i - 1), cellY = j => 5.2 - (j - 1);
  const dice = {
    id: 'prob-two-dice-prime',
    category: 'probability',
    title: {
      en: 'Prime time with two dice',
      fr: 'Des nombres premiers avec deux dés',
      es: 'Números primos con dos dados',
      ja: '2つのさいころで素数',
      zh: '两颗骰子与质数'
    },
    difficulty: 1,
    statement: {
      en: 'Two fair six-sided dice are rolled and the two numbers are added. <b>Which of the following equal the probability that the sum is a prime number?</b>',
      fr: 'On lance deux dés équilibrés à six faces et on additionne les deux nombres. <b>Lesquelles des valeurs suivantes sont égales à la probabilité que la somme soit un nombre premier ?</b>',
      es: 'Se lanzan dos dados equilibrados de seis caras y se suman los dos números. <b>¿Cuáles de los siguientes son iguales a la probabilidad de que la suma sea un número primo?</b>',
      ja: '公平な6面のさいころを2つ振り、出た目を足します。<b>次のうち、和が素数になる確率に等しいものはどれですか？</b>',
      zh: '掷两颗均匀的六面骰子，把两个点数相加。<b>下列哪些等于和为质数的概率？</b>'
    },
    figureText: {
      en: 'A 6 × 6 table: columns are the first die (1–6), rows are the second die (1–6), each cell shows the sum.',
      fr: 'Un tableau 6 × 6 : les colonnes sont le premier dé (1–6), les lignes le deuxième dé (1–6), chaque case indique la somme.',
      es: 'Una tabla de 6 × 6: las columnas son el primer dado (1–6), las filas el segundo dado (1–6), cada casilla muestra la suma.',
      ja: '6 × 6 の表：列は1個目のさいころ (1–6)、行は2個目のさいころ (1–6)、各マスに和を表示。',
      zh: '一个 6 × 6 的表格：列是第一颗骰子（1–6），行是第二颗骰子（1–6），每格显示两数之和。'
    },
    hint: {
      en: 'Make the $6 \\times 6$ table of all sums: every cell is equally likely.',
      fr: 'Dressez le tableau $6 \\times 6$ de toutes les sommes : chaque case est équiprobable.',
      es: 'Haz la tabla $6 \\times 6$ de todas las sumas: cada casilla es igual de probable.',
      ja: '和の $6 \\times 6$ 表を作ります：どのマスも同様に確からしい。',
      zh: '列出所有和的 $6 \\times 6$ 表：每一格的可能性相同。'
    },
    aiHint: {
      en: 'Please solve it in a different way if you can (for example by listing the number of ways for each sum, or a tree diagram), show every step, then check each option and say which ones are correct.',
      fr: 'Résous-le d\'une autre façon si possible (par exemple en listant le nombre de façons d\'obtenir chaque somme, ou un arbre), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.',
      es: 'Resuélvelo de otra forma si puedes (por ejemplo contando las formas de obtener cada suma, o con un diagrama de árbol), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.',
      ja: 'できれば別の方法で解いてください（例えば和ごとの出方を数え上げる、または樹形図）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。',
      zh: '如果可以，请用另一种方法求解（例如列出每个和的出现方式数，或画树状图），写出每一步，然后逐项检查选项并指出哪些正确。'
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 7.4, scale: 38, pad: 18 });
      for (let i = 1; i <= 6; i++) { F.text([cellX(i) + 0.5, 6.7], String(i), 'pt small'); F.text([0.65, cellY(i) + 0.5], String(i), 'pt small'); }
      F.text([4.2, 7.3], 'first die', 'tick'); F.text([0.2, 3.2], '2nd', 'tick');
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) {
        const r = F.rect(cellX(i), cellY(j), 1, 1, 'cell'); r.dataset.sum = i + j; r.dataset.prime = isPrime(i + j) ? 1 : 0;
        F.text([cellX(i) + 0.5, cellY(j) + 0.5], String(i + j), 'cellnum');
      }
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      '2nd': { fr: '2e', es: '2.º', ja: '2個目', zh: '第 2 个' },
      'are not prime': { fr: 'ne sont pas premiers', es: 'no son primas', ja: 'は素数ではない', zh: '不是质数' },
      'equally likely outcomes': { fr: 'issues équiprobables', es: 'resultados equiprobables', ja: '同様に確からしい場合', zh: '等可能结果' },
      'first die': { fr: 'premier dé', es: 'primer dado', ja: '1個目のさいころ', zh: '第一颗骰子' },
      'sums': { fr: 'sommes', es: 'sumas', ja: '和', zh: '和' }
    },
    options: [
      { tex: '\\dfrac{5}{12}', correct: true, why: {
        en: '$\\tfrac{15}{36}$ simplified.',
        fr: '$\\tfrac{15}{36}$ simplifié.',
        es: '$\\tfrac{15}{36}$ simplificado.',
        ja: '$\\tfrac{15}{36}$ を約分したもの。',
        zh: '$\\tfrac{15}{36}$ 约分后的结果。'
      } },
      { tex: '\\dfrac{15}{36}', correct: true, why: {
        en: '15 favourable cells out of 36.',
        fr: '15 cases favorables sur 36.',
        es: '15 casillas favorables de 36.',
        ja: '36マス中、有利なマスは15。',
        zh: '36 格中有 15 格符合。'
      } },
      { tex: '\\dfrac{5}{11}', correct: false, why: {
        en: '5 prime sums out of 11 possible sums — but the sums are not equally likely.',
        fr: '5 sommes premières sur 11 sommes possibles — mais les sommes ne sont pas équiprobables.',
        es: '5 sumas primas de 11 sumas posibles — pero las sumas no son equiprobables.',
        ja: '11通りの和のうち素数は5つ — ただし和は同様に確からしくはありません。',
        zh: '11 种可能的和中有 5 个质数 —— 但各个和出现的可能性并不相同。'
      } },
      { tex: '\\dfrac{1}{2}', correct: false, why: {
        en: 'Prime and not-prime are not equally likely.',
        fr: 'Premier et non premier ne sont pas équiprobables.',
        es: 'Primo y no primo no son igual de probables.',
        ja: '素数と素数でないものは同様に確からしくありません。',
        zh: '质数和非质数的可能性并不相同。'
      } },
      { tex: '\\dfrac{13}{36}', correct: false, why: {
        en: 'Forgets the two ways to make $11$.',
        fr: 'Oublie les deux façons d\'obtenir $11$.',
        es: 'Olvida las dos formas de obtener $11$.',
        ja: '$11$ になる2通りを忘れています。',
        zh: '漏了得到 $11$ 的两种方式。'
      } },
      { tex: '\\dfrac{7}{18}', correct: false, why: {
        en: '$\\tfrac{14}{36}$: forgets the single way to make $2$.',
        fr: '$\\tfrac{14}{36}$ : oublie l\'unique façon d\'obtenir $2$.',
        es: '$\\tfrac{14}{36}$: olvida la única forma de obtener $2$.',
        ja: '$\\tfrac{14}{36}$：$2$ になる唯一の出方を忘れています。',
        zh: '$\\tfrac{14}{36}$：漏掉了得到 $2$ 的唯一方式。'
      } },
      { tex: '\\dfrac{1}{3}', correct: false, why: '$\\tfrac{12}{36}$.' },
      { tex: '\\dfrac{1}{6}', correct: false, why: {
        en: 'Only the sum $7$.',
        fr: 'Seulement la somme $7$.',
        es: 'Solo la suma $7$.',
        ja: '和が $7$ の場合だけ。',
        zh: '只算了和为 $7$ 的情况。'
      } }
    ],
    steps: [
      {
        title: { en: 'All outcomes', fr: 'Toutes les issues', es: 'Todos los resultados', ja: 'すべての場合', zh: '所有结果' },
        lines: ['6 \\times 6 = 36 \\text{ equally likely outcomes}'],
        note: {
          en: 'Each cell of the table is one ordered pair (first die, second die).',
          fr: 'Chaque case du tableau est un couple ordonné (premier dé, deuxième dé).',
          es: 'Cada casilla de la tabla es un par ordenado (primer dado, segundo dado).',
          ja: '表の各マスは順序付きの組（1個目, 2個目）です。',
          zh: '表中每一格是一个有序数对（第一颗骰子，第二颗骰子）。'
        },
        fig(F) { F.svg.querySelectorAll('.cell').forEach((c, k) => { c.style.transition = 'fill .3s ' + (k * 18) + 'ms'; c.classList.add('lit'); }); }
      },
      {
        title: {
          en: 'Which sums are prime?',
          fr: 'Quelles sommes sont premières ?',
          es: '¿Qué sumas son primas?',
          ja: 'どの和が素数？',
          zh: '哪些和是质数？'
        },
        lines: ['\\text{sums } 2 \\dots 12:\\quad 2,\\ 3,\\ 5,\\ 7,\\ 11', '4, 6, 8, 9, 10, 12 \\text{ are not prime}'],
        note: {
          en: '1 is not prime, and it cannot appear anyway.',
          fr: '1 n\'est pas premier, et il ne peut de toute façon pas apparaître.',
          es: '1 no es primo, y de todos modos no puede aparecer.',
          ja: '1 は素数ではなく、そもそも出ません。',
          zh: '1 不是质数，而且它根本不会出现。'
        },
        fig(F) { F.svg.querySelectorAll('.cell').forEach((c, k) => { c.classList.remove('lit'); if (c.dataset.prime === '1') { c.style.transition = 'fill .35s ' + (k * 25) + 'ms'; c.classList.add('hit'); } }); }
      },
      {
        title: {
          en: 'Count the favourable cells',
          fr: 'Compter les cases favorables',
          es: 'Contar las casillas favorables',
          ja: '有利なマスを数える',
          zh: '数出符合条件的格子'
        },
        lines: ['\\underbrace{1}_{2} + \\underbrace{2}_{3} + \\underbrace{4}_{5} + \\underbrace{6}_{7} + \\underbrace{2}_{11} = 15'],
        note: {
          en: 'Each prime sum appears along one diagonal of the table.',
          fr: 'Chaque somme première apparaît le long d\'une diagonale du tableau.',
          es: 'Cada suma prima aparece a lo largo de una diagonal de la tabla.',
          ja: '素数の和はそれぞれ表の斜めの1列に並びます。',
          zh: '每个质数和都沿表格的一条对角线出现。'
        }
      },
      {
        title: { en: 'The probability', fr: 'La probabilité', es: 'La probabilidad', ja: '確率', zh: '概率' },
        lines: ['P = \\frac{15}{36} = \\boxed{\\frac{5}{12}} \\approx 0.417'],
        note: {
          en: 'Favourable outcomes over all outcomes.',
          fr: 'Issues favorables sur toutes les issues.',
          es: 'Casos favorables entre casos posibles.',
          ja: '有利な場合 ÷ すべての場合。',
          zh: '有利结果数除以所有结果数。'
        }
      },
      { title: {
        en: 'Check every option',
        fr: 'Vérifier chaque option',
        es: 'Comprobar cada opción',
        ja: '各選択肢を確認',
        zh: '逐项检查选项'
      }, options: true, note: {
        en: 'Two options are the same probability written in two ways.',
        fr: 'Deux options sont la même probabilité écrite de deux façons.',
        es: 'Dos opciones son la misma probabilidad escrita de dos formas.',
        ja: '2つの選択肢は同じ確率を2通りに書いたものです。',
        zh: '有两个选项是同一概率的两种写法。'
      } }
    ]
  };

  PuzzleBank.define(dice);
})(PuzzleBank.kit);
