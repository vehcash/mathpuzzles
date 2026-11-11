/* trigonometry · Four ratios, one square
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-jee-2022-four-ratios",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.1",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.1",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.1",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.1",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.1"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Four ratios, one square",
      fr: "Quatre quotients, un carré",
      es: "Cuatro cocientes, un cuadrado",
      ja: "4つの比と1つの平方",
      zh: "四个比值，一个平方"
    },
    statement: {
      en: "$-\\tfrac{\\pi}{4}<\\beta<0<\\alpha<\\tfrac{\\pi}{4}$, $\\sin(\\alpha+\\beta)=\\tfrac13$ and $\\cos(\\alpha-\\beta)=\\tfrac23$. Let $E=\\dfrac{\\sin\\alpha}{\\cos\\beta}+\\dfrac{\\cos\\beta}{\\sin\\alpha}+\\dfrac{\\cos\\alpha}{\\sin\\beta}+\\dfrac{\\sin\\beta}{\\cos\\alpha}$. <b>Which of the following equal the greatest integer $\\le E^2$?</b>",
      fr: "$-\\tfrac{\\pi}{4}<\\beta<0<\\alpha<\\tfrac{\\pi}{4}$, $\\sin(\\alpha+\\beta)=\\tfrac13$ et $\\cos(\\alpha-\\beta)=\\tfrac23$. Soit $E=\\dfrac{\\sin\\alpha}{\\cos\\beta}+\\dfrac{\\cos\\beta}{\\sin\\alpha}+\\dfrac{\\cos\\alpha}{\\sin\\beta}+\\dfrac{\\sin\\beta}{\\cos\\alpha}$. <b>Lesquelles des valeurs suivantes sont égales à la partie entière de $E^2$ ?</b>",
      es: "$-\\tfrac{\\pi}{4}<\\beta<0<\\alpha<\\tfrac{\\pi}{4}$, $\\sin(\\alpha+\\beta)=\\tfrac13$ y $\\cos(\\alpha-\\beta)=\\tfrac23$. Sea $E=\\dfrac{\\sin\\alpha}{\\cos\\beta}+\\dfrac{\\cos\\beta}{\\sin\\alpha}+\\dfrac{\\cos\\alpha}{\\sin\\beta}+\\dfrac{\\sin\\beta}{\\cos\\alpha}$. <b>¿Cuáles de los siguientes valores son iguales a la parte entera de $E^2$?</b>",
      ja: "$-\\tfrac{\\pi}{4}<\\beta<0<\\alpha<\\tfrac{\\pi}{4}$、$\\sin(\\alpha+\\beta)=\\tfrac13$、$\\cos(\\alpha-\\beta)=\\tfrac23$ とし、$E=\\dfrac{\\sin\\alpha}{\\cos\\beta}+\\dfrac{\\cos\\beta}{\\sin\\alpha}+\\dfrac{\\cos\\alpha}{\\sin\\beta}+\\dfrac{\\sin\\beta}{\\cos\\alpha}$ とします。<b>$E^2$ 以下の最大の整数に等しいものはどれですか？</b>",
      zh: "$-\\tfrac{\\pi}{4}<\\beta<0<\\alpha<\\tfrac{\\pi}{4}$，$\\sin(\\alpha+\\beta)=\\tfrac13$，$\\cos(\\alpha-\\beta)=\\tfrac23$。令 $E=\\dfrac{\\sin\\alpha}{\\cos\\beta}+\\dfrac{\\cos\\beta}{\\sin\\alpha}+\\dfrac{\\cos\\alpha}{\\sin\\beta}+\\dfrac{\\sin\\beta}{\\cos\\alpha}$。<b>下列哪些等于不超过 $E^2$ 的最大整数？</b>"
    },
    figureText: {
      en: "The unit circle with the angle α above the x-axis and β below it; α + β and α − β are marked.",
      fr: "Le cercle unité avec l’angle α au-dessus de l’axe des x et β en dessous ; α + β et α − β sont indiqués.",
      es: "La circunferencia unidad con el ángulo α sobre el eje x y β debajo; se marcan α + β y α − β.",
      ja: "単位円上で x 軸の上に角 α、下に角 β。α + β と α − β を表示。",
      zh: "单位圆，x 轴上方为角 α，下方为角 β；标出 α + β 与 α − β。"
    },
    hint: {
      en: "Pair the 1st with the 3rd term and the 2nd with the 4th: each pair has numerator $\\cos(\\alpha-\\beta)$.",
      fr: "Associez le 1er au 3e terme et le 2e au 4e : chaque paire a pour numérateur $\\cos(\\alpha-\\beta)$.",
      es: "Junta el 1.º con el 3.º y el 2.º con el 4.º: cada pareja tiene numerador $\\cos(\\alpha-\\beta)$.",
      ja: "1項目と3項目、2項目と4項目を組にすると、分子はどちらも $\\cos(\\alpha-\\beta)$。",
      zh: "把第 1、3 项和第 2、4 项分别合并：分子都是 $\\cos(\\alpha-\\beta)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.0, scale: 70, pad: 16 });
      const O = [1.3, 1.5], P = t => [O[0] + 1.2 * Math.cos(t), O[1] + 1.2 * Math.sin(t)];
      const a = 0.5905, b = -0.2506;
      F.circle(O, 1.2, 'conic'); F.seg([0.0, 1.5], [3.2, 1.5], 'seg thin');
      F.seg(O, P(a)); F.seg(O, P(b)); F.dot(O);
      F.arc(O, 0.45, 0, a * 180 / Math.PI, 'seg'); F.arc(O, 0.6, b * 180 / Math.PI, 0, 'seg');
      F.text(P(a), 'α', 'pt', 10, -6); F.text(P(b), 'β', 'pt', 10, 8);
      return F;
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "$E=-\\tfrac43$, so $E^2=\\tfrac{16}{9}\\approx1.78$.",
        fr: "$E=-\\tfrac43$, so $E^2=\\tfrac{16}{9}\\approx1.78$.",
        es: "$E=-\\tfrac43$, so $E^2=\\tfrac{16}{9}\\approx1.78$.",
        ja: "$E=-\\tfrac43$, so $E^2=\\tfrac{16}{9}\\approx1.78$.",
        zh: "$E=-\\tfrac43$, so $E^2=\\tfrac{16}{9}\\approx1.78$."
      } },
      { tex: "\\left\\lfloor\\tfrac{16}{9}\\right\\rfloor", correct: true, why: {
        en: "The same integer, written from $E^2$.",
        fr: "Le même entier, écrit à partir de $E^2$.",
        es: "El mismo entero, escrito a partir de $E^2$.",
        ja: "$E^2$ から書いた同じ整数。",
        zh: "由 $E^2$ 写出的同一个整数。"
      } },
      { tex: "\\tfrac{16}{9}", correct: false, why: {
        en: "That is $E^2$ itself, not its integer part.",
        fr: "C’est $E^2$ lui-même, pas sa partie entière.",
        es: "Es $E^2$ mismo, no su parte entera.",
        ja: "それは $E^2$ そのもので整数部分ではない。",
        zh: "那是 $E^2$ 本身，不是它的整数部分。"
      } },
      { tex: "2", correct: false, why: {
        en: "$\\tfrac{16}{9}<2$.",
        fr: "$\\tfrac{16}{9}<2$.",
        es: "$\\tfrac{16}{9}<2$.",
        ja: "$\\tfrac{16}{9}<2$.",
        zh: "$\\tfrac{16}{9}<2$."
      } },
      { tex: "0", correct: false, why: {
        en: "$E^2=\\tfrac{16}{9}\\ge1$.",
        fr: "$E^2=\\tfrac{16}{9}\\ge1$.",
        es: "$E^2=\\tfrac{16}{9}\\ge1$.",
        ja: "$E^2=\\tfrac{16}{9}\\ge1$.",
        zh: "$E^2=\\tfrac{16}{9}\\ge1$."
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "That is $|E|$.",
        fr: "C’est $|E|$.",
        es: "Es $|E|$.",
        ja: "それは $|E|$。",
        zh: "那是 $|E|$。"
      } },
      { tex: "4", correct: false, why: {
        en: "Treats $\\sin2\\alpha\\sin2\\beta$ as positive; $\\beta<0$ makes it negative.",
        fr: "Prend $\\sin2\\alpha\\sin2\\beta$ positif ; or $\\beta<0$ le rend négatif.",
        es: "Toma $\\sin2\\alpha\\sin2\\beta$ positivo; $\\beta<0$ lo hace negativo.",
        ja: "$\\sin2\\alpha\\sin2\\beta$ を正とした。$\\beta<0$ なので負。",
        zh: "把 $\\sin2\\alpha\\sin2\\beta$ 当成正的，而 $\\beta<0$ 使其为负。"
      } },
      { tex: "3", correct: false, why: {
        en: "Too large.",
        fr: "Trop grand.",
        es: "Demasiado grande.",
        ja: "大きすぎ。",
        zh: "太大。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pair the terms",
          fr: "Regrouper",
          es: "Agrupar",
          ja: "組にする",
          zh: "两两合并"
        },
        lines: ["\\frac{\\sin\\alpha}{\\cos\\beta}+\\frac{\\cos\\alpha}{\\sin\\beta}=\\frac{\\cos(\\alpha-\\beta)}{\\sin\\beta\\cos\\beta},\\quad \\frac{\\cos\\beta}{\\sin\\alpha}+\\frac{\\sin\\beta}{\\cos\\alpha}=\\frac{\\cos(\\alpha-\\beta)}{\\sin\\alpha\\cos\\alpha}"],
        note: {
          en: "Common denominators give $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$ on top.",
          fr: "Au même dénominateur, le numérateur est $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$.",
          es: "Con denominador común, arriba queda $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$.",
          ja: "通分すると分子は $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$。",
          zh: "通分后分子为 $\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta$。"
        }
      },
      {
        title: {
          en: "Double angles",
          fr: "Angles doubles",
          es: "Ángulos dobles",
          ja: "2倍角",
          zh: "二倍角"
        },
        lines: ["E=2\\cos(\\alpha-\\beta)\\,\\frac{\\sin2\\alpha+\\sin2\\beta}{\\sin2\\alpha\\,\\sin2\\beta}", "\\sin2\\alpha+\\sin2\\beta=2\\sin(\\alpha+\\beta)\\cos(\\alpha-\\beta)=\\tfrac49"],
        note: {
          en: "Sum-to-product turns the top into the given data.",
          fr: "La formule somme-produit fait apparaître les données.",
          es: "La fórmula de suma a producto usa los datos.",
          ja: "和積公式で与えられた値になる。",
          zh: "和差化积用上已知数据。"
        }
      },
      {
        title: {
          en: "The product of sines",
          fr: "Le produit des sinus",
          es: "El producto de senos",
          ja: "sin の積",
          zh: "正弦之积"
        },
        lines: ["\\sin2\\alpha\\sin2\\beta=\\tfrac12\\big[\\cos2(\\alpha-\\beta)-\\cos2(\\alpha+\\beta)\\big]=\\tfrac12\\left[-\\tfrac19-\\tfrac79\\right]=-\\tfrac49"],
        note: {
          en: "$\\cos2(\\alpha-\\beta)=2\\cdot\\tfrac49-1$ and $\\cos2(\\alpha+\\beta)=1-2\\cdot\\tfrac19$.",
          fr: "$\\cos2(\\alpha-\\beta)=2\\cdot\\tfrac49-1$ et $\\cos2(\\alpha+\\beta)=1-2\\cdot\\tfrac19$.",
          es: "$\\cos2(\\alpha-\\beta)=2\\cdot\\tfrac49-1$ y $\\cos2(\\alpha+\\beta)=1-2\\cdot\\tfrac19$.",
          ja: "$\\cos2(\\alpha-\\beta)=2\\cdot\\tfrac49-1$、$\\cos2(\\alpha+\\beta)=1-2\\cdot\\tfrac19$。",
          zh: "$\\cos2(\\alpha-\\beta)=2\\cdot\\tfrac49-1$，$\\cos2(\\alpha+\\beta)=1-2\\cdot\\tfrac19$。"
        }
      },
      {
        title: {
          en: "Finish",
          fr: "Conclure",
          es: "Terminar",
          ja: "仕上げ",
          zh: "收尾"
        },
        lines: ["E=2\\cdot\\tfrac23\\cdot\\frac{4/9}{-4/9}=-\\tfrac43,\\qquad E^2=\\tfrac{16}{9},\\qquad\\lfloor E^2\\rfloor=\\boxed{1}"],
        note: {
          en: "No need to find $\\alpha$ and $\\beta$ themselves.",
          fr: "Inutile de trouver $\\alpha$ et $\\beta$.",
          es: "No hace falta hallar $\\alpha$ y $\\beta$.",
          ja: "$\\alpha$, $\\beta$ 自体を求める必要はない。",
          zh: "不需要求出 $\\alpha$、$\\beta$ 本身。"
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
          en: "Two options are the same number.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
