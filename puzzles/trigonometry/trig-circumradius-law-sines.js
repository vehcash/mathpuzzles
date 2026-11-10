/* trigonometry · The circle around a triangle
   Extended law of sines: a / sin A = 2R. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const O = [0, 0], R = 6, P = d => [R * Math.cos(d * Math.PI / 180), R * Math.sin(d * Math.PI / 180)];
  const A = P(100), B = P(240), C = P(300);

  PuzzleBank.define({
    id: "trig-circumradius-law-sines",
    category: "trigonometry",
    difficulty: 1,
    title: {
      en: "The circle around a triangle",
      fr: "Le cercle autour d’un triangle",
      es: "La circunferencia alrededor de un triángulo",
      ja: "三角形を囲む円",
      zh: "三角形的外接圆"
    },
    statement: {
      en: "In triangle $ABC$, side $a = BC = 6$ and $\\angle A = 30^\\circ$. <b>Which of the following equal the circumradius $R$?</b>",
      fr: "Dans le triangle $ABC$, le côté $a = BC = 6$ et $\\angle A = 30^\\circ$. <b>Lesquelles des valeurs suivantes sont égales au rayon $R$ du cercle circonscrit ?</b>",
      es: "En el triángulo $ABC$, el lado $a = BC = 6$ y $\\angle A = 30^\\circ$. <b>¿Cuáles de los siguientes son iguales al radio $R$ de la circunferencia circunscrita?</b>",
      ja: "三角形 $ABC$ で辺 $a = BC = 6$、$\\angle A = 30^\\circ$ です。<b>次のうち外接円の半径 $R$ に等しいものはどれですか？</b>",
      zh: "在三角形 $ABC$ 中，边 $a = BC = 6$，$\\angle A = 30^\\circ$。<b>下列哪些等于外接圆半径 $R$？</b>"
    },
    figureText: {
      en: "A triangle ABC inscribed in its circumcircle with centre O; the chord BC has length 6 and the angle at A is 30°.",
      fr: "Un triangle ABC inscrit dans son cercle circonscrit de centre O ; la corde BC mesure 6 et l’angle en A vaut 30°.",
      es: "Un triángulo ABC inscrito en su circunferencia circunscrita de centro O; la cuerda BC mide 6 y el ángulo en A es 30°.",
      ja: "中心 O の外接円に内接する三角形 ABC。弦 BC の長さは 6、A の角は 30°。",
      zh: "内接于以 O 为圆心的外接圆的三角形 ABC；弦 BC 长 6，A 处的角为 30°。"
    },
    hint: {
      en: "$\\dfrac{a}{\\sin A} = 2R$.",
      fr: "$\\dfrac{a}{\\sin A} = 2R$.",
      es: "$\\dfrac{a}{\\sin A} = 2R$.",
      ja: "$\\dfrac{a}{\\sin A} = 2R$.",
      zh: "$\\dfrac{a}{\\sin A} = 2R$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example the central angle BOC = 60°, which makes triangle BOC equilateral), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple l’angle au centre BOC = 60°, qui rend le triangle BOC équilatéral), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo el ángulo central BOC = 60°, que hace equilátero el triángulo BOC), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば中心角 BOC = 60° から三角形 BOC が正三角形になることを使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如圆心角 BOC = 60°，使三角形 BOC 为等边三角形），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 13, h: 13, scale: 20, pad: 18 });
      const S = ([x, y]) => [x + 6.5, y + 6.5];
      F.S = S;
      F.circle(S(O), R, 'seg thin').setAttribute('fill', 'none');
      F.path([S(A), S(B), S(C)], 'tri');
      F.dot(S(O), 'center'); F.text(S(O), 'O', 'pt', 12, -6);
      F.text(S(A), 'A', 'pt', 0, -14); F.text(S(B), 'B', 'pt', -12, 10); F.text(S(C), 'C', 'pt', 12, 10);
      F.text(mid(S(B), S(C)), '6', 'len', 0, 16); F.text(S(A), '30°', 'len small', 4, 26);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "equilateral": { fr: "équilatéral", es: "equilátero", ja: "は正三角形", zh: "是等边三角形" }
    },
    options: [
      { tex: "R = 6", correct: true, why: {
        en: "$2R = \\dfrac{6}{\\sin30^\\circ} = 12$.",
        fr: "$2R = \\dfrac{6}{\\sin30^\\circ} = 12$.",
        es: "$2R = \\dfrac{6}{\\sin30^\\circ} = 12$.",
        ja: "$2R = \\dfrac{6}{\\sin30^\\circ} = 12$.",
        zh: "$2R = \\dfrac{6}{\\sin30^\\circ} = 12$."
      } },
      { tex: "R = \\dfrac{6}{2\\sin30^\\circ}", correct: true, why: {
        en: "The same value from the extended law of sines.",
        fr: "La même valeur, par la loi des sinus étendue.",
        es: "El mismo valor, por el teorema del seno extendido.",
        ja: "拡張正弦定理による同じ値。",
        zh: "由扩展正弦定理得到的同一个值。"
      } },
      { tex: "R = 12", correct: false, why: {
        en: "That is $2R$, the diameter.",
        fr: "C’est $2R$, le diamètre.",
        es: "Eso es $2R$, el diámetro.",
        ja: "それは直径 $2R$ です。",
        zh: "那是直径 $2R$。"
      } },
      { tex: "R = 3", correct: false, why: {
        en: "Half of $a$ — would be right only if $\\angle A = 90^\\circ$.",
        fr: "La moitié de $a$ — juste seulement si $\\angle A = 90^\\circ$.",
        es: "La mitad de $a$ — solo valdría si $\\angle A = 90^\\circ$.",
        ja: "$a$ の半分 — $\\angle A = 90^\\circ$ のときだけ正しい値です。",
        zh: "$a$ 的一半 —— 只有 $\\angle A = 90^\\circ$ 时才对。"
      } },
      { tex: "R = 6\\sqrt3", correct: false, why: {
        en: "Used $\\cos30^\\circ$ or $\\tan$ instead of $\\sin30^\\circ$.",
        fr: "A utilisé $\\cos30^\\circ$ ou $\\tan$ au lieu de $\\sin30^\\circ$.",
        es: "Usó $\\cos30^\\circ$ o $\\tan$ en lugar de $\\sin30^\\circ$.",
        ja: "$\\sin30^\\circ$ ではなく $\\cos30^\\circ$ や $\\tan$ を使っています。",
        zh: "用了 $\\cos30^\\circ$ 或 $\\tan$，而不是 $\\sin30^\\circ$。"
      } },
      { tex: "R = 2\\sqrt3", correct: false, why: {
        en: "$\\dfrac{6}{2\\sin60^\\circ}$: the wrong angle.",
        fr: "$\\dfrac{6}{2\\sin60^\\circ}$ : mauvais angle.",
        es: "$\\dfrac{6}{2\\sin60^\\circ}$: ángulo equivocado.",
        ja: "$\\dfrac{6}{2\\sin60^\\circ}$：角度が違います。",
        zh: "$\\dfrac{6}{2\\sin60^\\circ}$：角用错了。"
      } },
      { tex: "R = 3\\sqrt3", correct: false, why: {
        en: "The height of an equilateral triangle of side $6$, not a radius.",
        fr: "La hauteur d’un triangle équilatéral de côté $6$, pas un rayon.",
        es: "La altura de un triángulo equilátero de lado $6$, no un radio.",
        ja: "1辺 $6$ の正三角形の高さで、半径ではありません。",
        zh: "边长为 $6$ 的等边三角形的高，不是半径。"
      } },
      { tex: "R = 4", correct: false, why: {
        en: "No rule gives $4$ here.",
        fr: "Aucune règle ne donne $4$ ici.",
        es: "Ninguna regla da $4$ aquí.",
        ja: "ここで $4$ を与える関係はありません。",
        zh: "这里没有任何规则给出 $4$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Extended law of sines",
          fr: "Loi des sinus étendue",
          es: "Teorema del seno extendido",
          ja: "拡張正弦定理",
          zh: "扩展正弦定理"
        },
        lines: ["\\frac{a}{\\sin A} = 2R \\ \\Rightarrow\\ 2R = \\frac{6}{1/2} = 12", "R = \\boxed{6}"],
        note: {
          en: "Any side divided by the sine of the opposite angle gives the diameter.",
          fr: "Tout côté divisé par le sinus de l’angle opposé donne le diamètre.",
          es: "Cualquier lado dividido entre el seno del ángulo opuesto da el diámetro.",
          ja: "どの辺も対角の sin で割ると直径になります。",
          zh: "任一边除以对角的正弦都等于直径。"
        }
      },
      {
        title: {
          en: "See it with the central angle",
          fr: "Le voir avec l’angle au centre",
          es: "Verlo con el ángulo central",
          ja: "中心角で確かめる",
          zh: "用圆心角看"
        },
        lines: ["\\angle BOC = 2\\cdot30^\\circ = 60^\\circ \\ \\Rightarrow\\ \\triangle BOC \\text{ equilateral}", "R = OB = BC = 6\\ \\checkmark"],
        note: {
          en: "The central angle is twice the inscribed angle.",
          fr: "L’angle au centre est le double de l’angle inscrit.",
          es: "El ángulo central es el doble del inscrito.",
          ja: "中心角は円周角の2倍です。",
          zh: "圆心角是圆周角的两倍。"
        },
        fig(F) { F.fadeIn(F.path([F.S(O), F.S(B), F.S(C)], 'fill-yellow', 'fills'), 600); }
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
