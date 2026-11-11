/* calculus · A spreading ripple
   Related rates: A = πr², dA/dt = 2πr dr/dt = 20π when r = 5, dr/dt = 2. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-related-rates-circle",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["ap"]
    },
    difficulty: 2,
    title: {
      en: "A spreading ripple",
      fr: "Une onde qui s’étend",
      es: "Una onda que se expande",
      ja: "広がる波紋",
      zh: "扩散的涟漪"
    },
    statement: {
      en: "The radius of a circular ripple grows at $2$ cm/s. <b>How fast is its area growing when the radius is $5$ cm?</b> (in cm²/s)",
      fr: "Le rayon d’une onde circulaire augmente de $2$ cm/s. <b>À quelle vitesse son aire augmente-t-elle quand le rayon vaut $5$ cm ?</b> (en cm²/s)",
      es: "El radio de una onda circular crece a $2$ cm/s. <b>¿A qué ritmo crece su área cuando el radio es $5$ cm?</b> (en cm²/s)",
      ja: "円形の波紋の半径が毎秒 $2$ cm で大きくなります。<b>半径が $5$ cm のとき、面積は毎秒何 cm² で増えていますか？</b>",
      zh: "圆形涟漪的半径以 $2$ cm/s 增大。<b>当半径为 $5$ cm 时，面积增大的速度是多少？</b>（单位 cm²/s）"
    },
    figureText: {
      en: "Concentric circles of a ripple; a thin ring of width dr around the circle of radius 5.",
      fr: "Les cercles concentriques d’une onde ; un anneau fin de largeur dr autour du cercle de rayon 5.",
      es: "Círculos concéntricos de una onda; un anillo fino de anchura dr alrededor del círculo de radio 5.",
      ja: "波紋の同心円。半径 5 の円の周りに幅 dr の細い輪。",
      zh: "涟漪的同心圆；半径 5 的圆外有一圈宽 dr 的细环。"
    },
    hint: {
      en: "Differentiate $A = \\pi r^2$ with respect to time.",
      fr: "Dérivez $A = \\pi r^2$ par rapport au temps.",
      es: "Deriva $A = \\pi r^2$ respecto del tiempo.",
      ja: "$A = \\pi r^2$ を時間で微分します。",
      zh: "把 $A = \\pi r^2$ 对时间求导。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example thinking of the new area as a thin ring of length 2πr), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en voyant l’aire gagnée comme un anneau fin de longueur 2πr), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo viendo el área nueva como un anillo fino de longitud 2πr), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば増える面積を長さ 2πr の細い輪とみる）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把新增面积看成长为 2πr 的细环），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 5.4, scale: 42, pad: 12 });
      const C = [2.7, 2.7];
      F.circle(C, 2.5, 'fill-yellow', 'fills'); F.circle(C, 2.2, 'fill-blue', 'fills');
      [0.8, 1.5, 2.2].forEach(r => F.circle(C, r, 'seg thin').setAttribute('fill', 'none'));
      F.circle(C, 2.5, 'seg').setAttribute('fill', 'none');
      F.seg(C, [C[0] + 2.2, C[1]], 'seg'); F.text([C[0] + 1.1, C[1]], 'r = 5', 'len small', 0, -10);
      return F;
    },
    options: [
      { tex: "20\\pi", correct: true, why: {
        en: "$2\\pi\\cdot5\\cdot2$.",
        fr: "$2\\pi\\cdot5\\cdot2$.",
        es: "$2\\pi\\cdot5\\cdot2$.",
        ja: "$2\\pi\\cdot5\\cdot2$.",
        zh: "$2\\pi\\cdot5\\cdot2$."
      } },
      { tex: "2\\pi\\cdot5\\cdot2", correct: true, why: {
        en: "$\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}$ with the numbers in.",
        fr: "$\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}$ avec les valeurs.",
        es: "$\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}$ con los valores.",
        ja: "$\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}$ に数値を代入。",
        zh: "把数值代入 $\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}$。"
      } },
      { tex: "10\\pi", correct: false, why: {
        en: "Only $2\\pi r$: the rate $\\tfrac{dr}{dt} = 2$ is missing.",
        fr: "Seulement $2\\pi r$ : il manque $\\tfrac{dr}{dt} = 2$.",
        es: "Solo $2\\pi r$: falta $\\tfrac{dr}{dt} = 2$.",
        ja: "$2\\pi r$ だけで、$\\tfrac{dr}{dt} = 2$ が抜けています。",
        zh: "只有 $2\\pi r$，漏了 $\\tfrac{dr}{dt} = 2$。"
      } },
      { tex: "25\\pi", correct: false, why: {
        en: "That is the area itself, not its rate of change.",
        fr: "C’est l’aire elle-même, pas sa vitesse de variation.",
        es: "Es el área misma, no su ritmo de cambio.",
        ja: "それは面積そのもので、変化率ではありません。",
        zh: "那是面积本身，不是变化率。"
      } },
      { tex: "4\\pi", correct: false, why: {
        en: "$\\pi\\left(\\tfrac{dr}{dt}\\right)^2$ — not how the chain rule works.",
        fr: "$\\pi\\left(\\tfrac{dr}{dt}\\right)^2$ — ce n’est pas la règle de dérivation.",
        es: "$\\pi\\left(\\tfrac{dr}{dt}\\right)^2$ — no es la regla de la cadena.",
        ja: "$\\pi\\left(\\tfrac{dr}{dt}\\right)^2$ — 連鎖律の使い方が違います。",
        zh: "$\\pi\\left(\\tfrac{dr}{dt}\\right)^2$ —— 不是链式法则。"
      } },
      { tex: "50\\pi", correct: false, why: {
        en: "$\\pi r^2\\cdot\\tfrac{dr}{dt}$: differentiate first, then substitute.",
        fr: "$\\pi r^2\\cdot\\tfrac{dr}{dt}$ : dérivez d’abord, puis remplacez.",
        es: "$\\pi r^2\\cdot\\tfrac{dr}{dt}$: deriva primero y luego sustituye.",
        ja: "$\\pi r^2\\cdot\\tfrac{dr}{dt}$：先に微分してから代入します。",
        zh: "$\\pi r^2\\cdot\\tfrac{dr}{dt}$：应先求导再代入。"
      } },
      { tex: "40\\pi", correct: false, why: {
        en: "One factor $2$ too many.",
        fr: "Un facteur $2$ de trop.",
        es: "Un factor $2$ de más.",
        ja: "係数 $2$ が1つ多い。",
        zh: "多乘了一个 $2$。"
      } },
      { tex: "20", correct: false, why: {
        en: "The $\\pi$ is missing.",
        fr: "Il manque le $\\pi$.",
        es: "Falta el $\\pi$.",
        ja: "$\\pi$ が抜けています。",
        zh: "漏了 $\\pi$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Differentiate in time",
          fr: "Dériver par rapport au temps",
          es: "Derivar respecto del tiempo",
          ja: "時間で微分",
          zh: "对时间求导"
        },
        lines: ["A = \\pi r^2 \\ \\Rightarrow\\ \\frac{dA}{dt} = 2\\pi r\\,\\frac{dr}{dt}"],
        note: {
          en: "The new area is a thin ring of length $2\\pi r$ and width $dr$.",
          fr: "L’aire gagnée est un anneau de longueur $2\\pi r$ et de largeur $dr$.",
          es: "El área nueva es un anillo de longitud $2\\pi r$ y anchura $dr$.",
          ja: "増える面積は長さ $2\\pi r$、幅 $dr$ の細い輪です。",
          zh: "新增面积是长 $2\\pi r$、宽 $dr$ 的细环。"
        },
        fig(F) { F.draw(F.circle([2.7, 2.7], 2.35, 'hl yellow', 'over'), 700); }
      },
      {
        title: {
          en: "Substitute",
          fr: "Remplacer",
          es: "Sustituir",
          ja: "代入",
          zh: "代入"
        },
        lines: ["\\frac{dA}{dt} = 2\\pi\\cdot5\\cdot2 = \\boxed{20\\pi} \\approx 62.8"],
        note: {
          en: "cm²/s, at the moment when $r = 5$.",
          fr: "cm²/s, à l’instant où $r = 5$.",
          es: "cm²/s, en el instante en que $r = 5$.",
          ja: "$r = 5$ の瞬間の値（cm²/s）。",
          zh: "在 $r = 5$ 时刻，单位 cm²/s。"
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
