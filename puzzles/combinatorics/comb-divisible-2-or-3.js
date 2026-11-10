/* combinatorics · Divisible by 2 or by 3
   Inclusion–exclusion: |A ∪ B| = |A| + |B| − |A ∩ B|. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-divisible-2-or-3",
    category: "combinatorics",
    difficulty: 1,
    title: {
      en: "Divisible by 2 or by 3",
      fr: "Divisible par 2 ou par 3",
      es: "Divisible entre 2 o entre 3",
      ja: "2 または 3 で割り切れる",
      zh: "能被 2 或 3 整除"
    },
    statement: {
      en: "<b>How many of the integers $1, 2, \\dots, 100$ are divisible by $2$ or by $3$?</b>",
      fr: "<b>Combien des entiers $1, 2, \\dots, 100$ sont divisibles par $2$ ou par $3$ ?</b>",
      es: "<b>¿Cuántos de los enteros $1, 2, \\dots, 100$ son divisibles entre $2$ o entre $3$?</b>",
      ja: "<b>$1, 2, \\dots, 100$ のうち、$2$ または $3$ で割り切れる数はいくつありますか？</b>",
      zh: "<b>整数 $1, 2, \\dots, 100$ 中有多少个能被 $2$ 或 $3$ 整除？</b>"
    },
    figureText: {
      en: "A Venn diagram: multiples of 2 (50) and multiples of 3 (33) overlapping in the multiples of 6 (16).",
      fr: "Un diagramme de Venn : multiples de 2 (50) et de 3 (33) qui se recoupent dans les multiples de 6 (16).",
      es: "Un diagrama de Venn: múltiplos de 2 (50) y de 3 (33) que se solapan en los múltiplos de 6 (16).",
      ja: "ベン図：2の倍数（50）と3の倍数（33）が、6の倍数（16）で重なります。",
      zh: "韦恩图：2 的倍数（50）与 3 的倍数（33）在 6 的倍数（16）处重叠。"
    },
    hint: {
      en: "Add the multiples of $2$ and of $3$, then subtract the multiples of $6$ counted twice.",
      fr: "Ajoutez les multiples de $2$ et de $3$, puis retirez ceux de $6$ comptés deux fois.",
      es: "Suma los múltiplos de $2$ y de $3$ y resta los de $6$, contados dos veces.",
      ja: "2の倍数と3の倍数を足し、2回数えた6の倍数を引きます。",
      zh: "把 $2$ 和 $3$ 的倍数相加，再减去被算两次的 $6$ 的倍数。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example counting the numbers divisible by neither 2 nor 3 and subtracting from 100), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en comptant ceux qui ne sont divisibles ni par 2 ni par 3 et en retranchant de 100), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo contando los que no son divisibles ni entre 2 ni entre 3 y restando de 100), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 2 でも 3 でも割り切れない数を数えて 100 から引く）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如数出既不被 2 也不被 3 整除的数，再用 100 减去），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5, h: 3, scale: 56, pad: 12 });
      F.circle([1.9, 1.5], 1.25, 'fill-blue'); F.circle([3.1, 1.5], 1.25, 'fill-pink');
      F.circle([1.9, 1.5], 1.25, 'seg').setAttribute('fill', 'none'); F.circle([3.1, 1.5], 1.25, 'seg').setAttribute('fill', 'none');
      F.text([1.3, 1.5], '34', 'nodenum', 0, 1); F.text([2.5, 1.5], '16', 'nodenum', 0, 1); F.text([3.7, 1.5], '17', 'nodenum', 0, 1);
      F.text([1.2, 2.9], '2 | n', 'len', 0, 0); F.text([3.8, 2.9], '3 | n', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "67", correct: true, why: {
        en: "$50 + 33 - 16$.",
        fr: "$50 + 33 - 16$.",
        es: "$50 + 33 - 16$.",
        ja: "$50 + 33 - 16$.",
        zh: "$50 + 33 - 16$."
      } },
      { tex: "83", correct: false, why: {
        en: "$50 + 33$ counts the multiples of $6$ twice.",
        fr: "$50 + 33$ compte deux fois les multiples de $6$.",
        es: "$50 + 33$ cuenta dos veces los múltiplos de $6$.",
        ja: "$50 + 33$ は6の倍数を2回数えています。",
        zh: "$50 + 33$ 把 $6$ 的倍数算了两次。"
      } },
      { tex: "16", correct: false, why: {
        en: "Only the multiples of $6$ (divisible by both).",
        fr: "Seulement les multiples de $6$.",
        es: "Solo los múltiplos de $6$.",
        ja: "6の倍数（両方で割り切れる）だけ。",
        zh: "只是 $6$ 的倍数（同时被二者整除）。"
      } },
      { tex: "50", correct: false, why: {
        en: "Only the multiples of $2$.",
        fr: "Seulement les multiples de $2$.",
        es: "Solo los múltiplos de $2$.",
        ja: "2の倍数だけ。",
        zh: "只是 $2$ 的倍数。"
      } },
      { tex: "33", correct: false, why: {
        en: "Only the multiples of $3$.",
        fr: "Seulement les multiples de $3$.",
        es: "Solo los múltiplos de $3$.",
        ja: "3の倍数だけ。",
        zh: "只是 $3$ 的倍数。"
      } },
      { tex: "34", correct: false, why: {
        en: "Multiples of $2$ that are not multiples of $3$.",
        fr: "Multiples de $2$ non multiples de $3$.",
        es: "Múltiplos de $2$ que no lo son de $3$.",
        ja: "3の倍数でない2の倍数。",
        zh: "是 $2$ 的倍数但不是 $3$ 的倍数。"
      } },
      { tex: "66", correct: false, why: {
        en: "Off by one: $\\lfloor 100/6\\rfloor = 16$, not $17$.",
        fr: "Décalage de un : $\\lfloor 100/6\\rfloor = 16$, pas $17$.",
        es: "Error de uno: $\\lfloor 100/6\\rfloor = 16$, no $17$.",
        ja: "1つずれています：$\\lfloor 100/6\\rfloor = 16$ で $17$ ではありません。",
        zh: "差一：$\\lfloor 100/6\\rfloor = 16$，不是 $17$。"
      } },
      { tex: "17", correct: false, why: {
        en: "The multiples of $3$ that are odd.",
        fr: "Les multiples de $3$ impairs.",
        es: "Los múltiplos de $3$ impares.",
        ja: "奇数の3の倍数。",
        zh: "是 $3$ 的奇数倍数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Count each set",
          fr: "Compter chaque ensemble",
          es: "Contar cada conjunto",
          ja: "それぞれ数える",
          zh: "分别计数"
        },
        lines: ["\\left\\lfloor\\tfrac{100}{2}\\right\\rfloor = 50, \\quad \\left\\lfloor\\tfrac{100}{3}\\right\\rfloor = 33, \\quad \\left\\lfloor\\tfrac{100}{6}\\right\\rfloor = 16"],
        note: {
          en: "Divisible by both $2$ and $3$ means divisible by $6$.",
          fr: "Divisible par $2$ et par $3$ signifie divisible par $6$.",
          es: "Divisible entre $2$ y $3$ significa divisible entre $6$.",
          ja: "2でも3でも割り切れる ⇔ 6で割り切れる。",
          zh: "同时被 $2$ 和 $3$ 整除即被 $6$ 整除。"
        }
      },
      {
        title: {
          en: "Inclusion–exclusion",
          fr: "Inclusion–exclusion",
          es: "Inclusión–exclusión",
          ja: "包除原理",
          zh: "容斥原理"
        },
        lines: ["50 + 33 - 16 = \\boxed{67}"],
        note: {
          en: "The overlap was counted in both circles, so it is removed once.",
          fr: "L’intersection est comptée dans les deux cercles : on la retire une fois.",
          es: "La intersección se contó en los dos círculos: se quita una vez.",
          ja: "重なりは両方の円で数えたので1回引きます。",
          zh: "重叠部分在两个圆中都算了，所以减去一次。"
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
