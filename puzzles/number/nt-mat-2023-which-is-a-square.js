/* number · Exactly one of them is a square
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2023-which-is-a-square",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1B",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1B",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1B",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1B",
        zh: "牛津大学数学入学考试 MAT 2023 第 1B 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Exactly one of them is a square",
      fr: "Un seul est un carré",
      es: "Solo uno es un cuadrado",
      ja: "平方数はただ1つ",
      zh: "只有一个是平方数"
    },
    statement: {
      en: "Exactly one of $99{,}999{,}999$, $123{,}333{,}333$, $649{,}485{,}225$, $713{,}291{,}035$, $987{,}654{,}000$ is a perfect square. <b>Which of the following are true?</b>",
      fr: "Un seul des nombres $99\\,999\\,999$, $123\\,333\\,333$, $649\\,485\\,225$, $713\\,291\\,035$, $987\\,654\\,000$ est un carré parfait. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Exactamente uno de $99.999.999$, $123.333.333$, $649.485.225$, $713.291.035$, $987.654.000$ es un cuadrado perfecto. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$99{,}999{,}999$、$123{,}333{,}333$、$649{,}485{,}225$、$713{,}291{,}035$、$987{,}654{,}000$ のうちちょうど1つが平方数です。<b>次のうち正しいものはどれですか？</b>",
      zh: "$99{,}999{,}999$，$123{,}333{,}333$，$649{,}485{,}225$，$713{,}291{,}035$，$987{,}654{,}000$ 中恰有一个是完全平方数。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The five numbers with their last two digits highlighted: 99, 33, 25, 35, 00.",
      fr: "Les cinq nombres avec leurs deux derniers chiffres en surbrillance : 99, 33, 25, 35, 00.",
      es: "Los cinco números con sus dos últimas cifras resaltadas: 99, 33, 25, 35, 00.",
      ja: "5つの数の下2桁：99, 33, 25, 35, 00。",
      zh: "五个数的末两位：99、33、25、35、00。"
    },
    hint: {
      en: "Look at remainders: squares end in $0,1,4,5,6,9$, are $0$ or $1\\bmod 4$, and a square ending in $5$ ends in $25$. Count trailing zeros too.",
      fr: "Regardez les restes : un carré finit par $0,1,4,5,6,9$, vaut $0$ ou $1\\bmod4$, et s’il finit par $5$ il finit par $25$. Comptez aussi les zéros finaux.",
      es: "Mira los restos: un cuadrado acaba en $0,1,4,5,6,9$, es $0$ o $1\\bmod4$, y si acaba en $5$ acaba en $25$. Cuenta también los ceros finales.",
      ja: "余りを見る：平方数の末尾は $0,1,4,5,6,9$、$4$ で割ると $0$ か $1$、末尾 $5$ なら $25$。末尾の $0$ の個数も。",
      zh: "看余数：平方数末位为 $0,1,4,5,6,9$，模 $4$ 余 $0$ 或 $1$，末位为 $5$ 则末两位为 $25$；还要数末尾零的个数。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 2.8, scale: 46, pad: 16 });
      ['99,999,9|99', '123,333,3|33', '649,485,2|25', '713,291,0|35', '987,654,0|00'].forEach((t, k) => { const [a, b] = t.split('|'); F.text([3.0, 2.5 - k * 0.5], a, 'len', -14, 0); F.text([3.0, 2.5 - k * 0.5], b, 'pt', 34, 0); });
      F.reveal = () => {
      F.rect(1.3, 1.25, 3.6, 0.5, 'fill-yellow', 'fills'); F.text([5.6, 1.5], '= 25485²', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "= 25485²": {"fr": "= 25485²", "es": "= 25485²", "ja": "= 25485²", "zh": "= 25485²"},
      "is the square": {"fr": "est le carré", "es": "es el cuadrado", "ja": "が平方数", "zh": "是平方数"},
      "is not a square because it ends in": {"fr": "n’est pas un carré car il finit par", "es": "no es un cuadrado porque acaba en", "ja": "は末尾が次なので平方数でない：", "zh": "不是平方数，因为末两位为"},
      "a square can end in the digit": {"fr": "un carré peut finir par le chiffre", "es": "un cuadrado puede acabar en la cifra", "ja": "平方数の末尾は次になりうる：", "zh": "平方数末位可以是"},
      "none of them is a square": {"fr": "aucun n’est un carré", "es": "ninguno es un cuadrado", "ja": "どれも平方数でない", "zh": "都不是平方数"}
    },
    options: [
      { tex: "649{,}485{,}225\\ \\text{is the square}", correct: true, why: {
        en: "$25485^2=649{,}485{,}225$.",
        fr: "$25485^2=649\\,485\\,225$.",
        es: "$25485^2=649.485.225$.",
        ja: "$25485^2=649{,}485{,}225$。",
        zh: "$25485^2=649{,}485{,}225$。"
      } },
      { tex: "713{,}291{,}035\\ \\text{is not a square because it ends in}\\ 35", correct: true, why: {
        en: "A square ending in $5$ must end in $25$.",
        fr: "Un carré finissant par $5$ finit par $25$.",
        es: "Un cuadrado que acaba en $5$ acaba en $25$.",
        ja: "末尾 $5$ の平方数は $25$ で終わる。",
        zh: "末位为 $5$ 的平方数末两位必为 $25$。"
      } },
      { tex: "99{,}999{,}999\\ \\text{is the square}", correct: false, why: {
        en: "It is $3\\bmod4$; squares are $0$ or $1\\bmod4$.",
        fr: "Il vaut $3\\bmod4$ ; un carré vaut $0$ ou $1\\bmod4$.",
        es: "Es $3\\bmod4$; los cuadrados son $0$ o $1\\bmod4$.",
        ja: "$4$ で割ると $3$ 余る。",
        zh: "模 $4$ 余 $3$，不可能。"
      } },
      { tex: "123{,}333{,}333\\ \\text{is the square}", correct: false, why: {
        en: "It ends in $3$.",
        fr: "Il finit par $3$.",
        es: "Acaba en $3$.",
        ja: "末尾が $3$。",
        zh: "末位为 $3$。"
      } },
      { tex: "987{,}654{,}000\\ \\text{is the square}", correct: false, why: {
        en: "Three trailing zeros: an odd power of $10$ divides it exactly.",
        fr: "Trois zéros finaux : une puissance impaire de $10$ le divise exactement.",
        es: "Tres ceros finales: lo divide exactamente una potencia impar de $10$.",
        ja: "末尾の $0$ が3個（奇数個）。",
        zh: "末尾有 $3$ 个零（奇数个）。"
      } },
      { tex: "\\text{a square can end in the digit}\\ 3", correct: false, why: {
        en: "Last digits of squares: $0,1,4,5,6,9$.",
        fr: "Derniers chiffres des carrés : $0,1,4,5,6,9$.",
        es: "Últimas cifras de los cuadrados: $0,1,4,5,6,9$.",
        ja: "平方数の末尾は $0,1,4,5,6,9$。",
        zh: "平方数末位为 $0,1,4,5,6,9$。"
      } },
      { tex: "649{,}485{,}225=25{,}495^2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{none of them is a square}", correct: false, why: {
        en: "The statement says one is.",
        fr: "L’énoncé dit qu’un l’est.",
        es: "El enunciado dice que uno lo es.",
        ja: "問題文より1つはある。",
        zh: "题设说有一个。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Rule out four",
          fr: "En écarter quatre",
          es: "Descartar cuatro",
          ja: "4つを除外",
          zh: "排除四个"
        },
        lines: ["99{,}999{,}999\\equiv3\\pmod4,\\quad\\ldots3,\\quad\\ldots35,\\quad\\ldots000"],
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Check the survivor",
          fr: "Vérifier le survivant",
          es: "Comprobar el superviviente",
          ja: "残りを確認",
          zh: "检验剩下的"
        },
        lines: ["25485^2=(25000+485)^2=625{,}000{,}000+24{,}250{,}000+235{,}225=649{,}485{,}225"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "",
          fr: "",
          es: "",
          ja: "",
          zh: ""
        }
      },
      {
        title: {
          en: "Check every option",
          fr: "Vérifier chaque option",
          es: "Comprobar cada opción",
          ja: "各選択肢を確認",
          zh: "逐项检查选项"
        },
        options: true,
        note: {
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
