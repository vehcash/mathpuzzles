/* combinatorics · Even numbers with distinct digits
   Fill the restricted position first: the last digit must be even. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-even-four-digit",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Even numbers with distinct digits",
      fr: "Nombres pairs à chiffres distincts",
      es: "Números pares con cifras distintas",
      ja: "数字が異なる偶数",
      zh: "各位不同的偶数"
    },
    statement: {
      en: "Using the digits $1, 2, 3, 4, 5, 6$ with no repetition, <b>how many four-digit even numbers can be formed?</b>",
      fr: "Avec les chiffres $1, 2, 3, 4, 5, 6$ sans répétition, <b>combien de nombres pairs à quatre chiffres peut-on former ?</b>",
      es: "Con las cifras $1, 2, 3, 4, 5, 6$ sin repetir, <b>¿cuántos números pares de cuatro cifras se pueden formar?</b>",
      ja: "数字 $1, 2, 3, 4, 5, 6$ を重複なく使って、<b>4桁の偶数はいくつ作れますか？</b>",
      zh: "用数字 $1, 2, 3, 4, 5, 6$ 组成没有重复数字的<b>四位偶数，共有多少个？</b>"
    },
    figureText: {
      en: "Four boxes for the digits; the last box is marked “2, 4 or 6” with 3 choices, the others get 5, 4 and 3 choices.",
      fr: "Quatre cases pour les chiffres ; la dernière porte « 2, 4 ou 6 » avec 3 choix, les autres ont 5, 4 et 3 choix.",
      es: "Cuatro casillas para las cifras; la última dice «2, 4 o 6» con 3 opciones, las otras tienen 5, 4 y 3.",
      ja: "数字を入れる4つの箱。最後の箱は「2、4、6」の3通り、ほかは5、4、3通り。",
      zh: "四个数位格；最后一格标“2、4 或 6”共 3 种，其余依次 5、4、3 种。"
    },
    hint: {
      en: "Choose the last digit first.",
      fr: "Choisissez d’abord le dernier chiffre.",
      es: "Elige primero la última cifra.",
      ja: "最後の桁から先に選びます。",
      zh: "先选个位。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example counting all four-digit numbers and taking the even half by symmetry), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en comptant tous les nombres et en prenant la moitié paire par symétrie), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo contando todos los números y tomando la mitad par por simetría), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば4桁の数全体を数え、対称性で偶数の半分をとる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如先数所有四位数，再由对称性取偶数的一半），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 2, scale: 52, pad: 14 });
      ['5', '4', '3', '3'].forEach((v, k) => { F.rect(0.2 + k * 1.25, 0.5, 1.05, 1.0, k === 3 ? 'fill-yellow' : 'fill-blue', 'fills'); F.rect(0.2 + k * 1.25, 0.5, 1.05, 1.0, 'tri'); F.text([0.72 + k * 1.25, 1.0], v, 'nodenum', 0, 1); });
      F.text([4.47, 0.5], '2, 4, 6', 'len small', 0, 14);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "last digit": { fr: "dernier chiffre", es: "última cifra", ja: "一の位", zh: "个位" },
      "choices": { fr: "choix", es: "opciones", ja: "通り", zh: "种" }
    },
    options: [
      { tex: "180", correct: true, why: {
        en: "$3\\cdot5\\cdot4\\cdot3$.",
        fr: "$3\\cdot5\\cdot4\\cdot3$.",
        es: "$3\\cdot5\\cdot4\\cdot3$.",
        ja: "$3\\cdot5\\cdot4\\cdot3$.",
        zh: "$3\\cdot5\\cdot4\\cdot3$."
      } },
      { tex: "360", correct: false, why: {
        en: "All four-digit numbers $6\\cdot5\\cdot4\\cdot3$, odd ones included.",
        fr: "Tous les nombres $6\\cdot5\\cdot4\\cdot3$, impairs compris.",
        es: "Todos los números $6\\cdot5\\cdot4\\cdot3$, impares incluidos.",
        ja: "奇数も含む全体 $6\\cdot5\\cdot4\\cdot3$。",
        zh: "包括奇数在内的全部 $6\\cdot5\\cdot4\\cdot3$。"
      } },
      { tex: "60", correct: false, why: {
        en: "$5\\cdot4\\cdot3$: forgets the $3$ choices of last digit.",
        fr: "$5\\cdot4\\cdot3$ : oublie les $3$ choix du dernier chiffre.",
        es: "$5\\cdot4\\cdot3$: olvida las $3$ opciones de la última cifra.",
        ja: "$5\\cdot4\\cdot3$：最後の桁の $3$ 通りを忘れています。",
        zh: "$5\\cdot4\\cdot3$：漏了个位的 $3$ 种选择。"
      } },
      { tex: "648", correct: false, why: {
        en: "$6\\cdot6\\cdot6\\cdot3$ allows repeated digits.",
        fr: "$6\\cdot6\\cdot6\\cdot3$ autorise les répétitions.",
        es: "$6\\cdot6\\cdot6\\cdot3$ permite repetir cifras.",
        ja: "$6\\cdot6\\cdot6\\cdot3$ は重複を許しています。",
        zh: "$6\\cdot6\\cdot6\\cdot3$ 允许数字重复。"
      } },
      { tex: "120", correct: false, why: {
        en: "$5\\cdot4\\cdot3\\cdot2$: too few choices left for the first digits.",
        fr: "$5\\cdot4\\cdot3\\cdot2$ : trop peu de choix.",
        es: "$5\\cdot4\\cdot3\\cdot2$: demasiadas pocas opciones.",
        ja: "$5\\cdot4\\cdot3\\cdot2$：選択肢が少なすぎます。",
        zh: "$5\\cdot4\\cdot3\\cdot2$：选择数太少。"
      } },
      { tex: "90", correct: false, why: {
        en: "Half of $180$ — divided by $2$ without reason.",
        fr: "La moitié de $180$, sans raison.",
        es: "La mitad de $180$, sin motivo.",
        ja: "理由なく $180$ を半分にしています。",
        zh: "无故把 $180$ 减半。"
      } },
      { tex: "240", correct: false, why: {
        en: "$4\\cdot5\\cdot4\\cdot3$: four even digits? There are only three.",
        fr: "$4\\cdot5\\cdot4\\cdot3$ : il n’y a que trois chiffres pairs.",
        es: "$4\\cdot5\\cdot4\\cdot3$: solo hay tres cifras pares.",
        ja: "$4\\cdot5\\cdot4\\cdot3$：偶数の数字は3つだけです。",
        zh: "$4\\cdot5\\cdot4\\cdot3$：偶数数字只有三个。"
      } },
      { tex: "15", correct: false, why: {
        en: "$\\binom64$ ignores the order of the digits.",
        fr: "$\\binom64$ ignore l’ordre des chiffres.",
        es: "$\\binom64$ ignora el orden de las cifras.",
        ja: "$\\binom64$ は数字の順序を無視しています。",
        zh: "$\\binom64$ 忽略了数字的顺序。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The last digit first",
          fr: "D’abord le dernier chiffre",
          es: "Primero la última cifra",
          ja: "まず一の位",
          zh: "先选个位"
        },
        lines: ["\\text{last digit} \\in \\{2, 4, 6\\}: \\ 3 \\text{ choices}"],
        note: {
          en: "The restricted position goes first.",
          fr: "La position contrainte passe en premier.",
          es: "La posición restringida va primero.",
          ja: "条件のある位置を先に決めます。",
          zh: "先处理有限制的位置。"
        }
      },
      {
        title: {
          en: "Then the others",
          fr: "Puis les autres",
          es: "Después las demás",
          ja: "次に残り",
          zh: "再选其他"
        },
        lines: ["3\\cdot5\\cdot4\\cdot3 = \\boxed{180}"],
        note: {
          en: "Exactly half of the $360$ arrangements, as $3$ of the $6$ digits are even.",
          fr: "Exactement la moitié des $360$, car $3$ chiffres sur $6$ sont pairs.",
          es: "Exactamente la mitad de los $360$, pues $3$ de las $6$ cifras son pares.",
          ja: "6つの数字のうち3つが偶数なので、$360$ のちょうど半分です。",
          zh: "恰为 $360$ 的一半，因为 $6$ 个数字中有 $3$ 个偶数。"
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
