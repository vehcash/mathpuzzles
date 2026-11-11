/* complex · How many roots?
   JEE Advanced 2022 (India), Paper 1, Mathematics Q.5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2022-conjugate-roots",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 1, Mathematics Q.5",
        fr: "JEE Advanced 2022 (Inde), épreuve 1, mathématiques Q.5",
        es: "JEE Advanced 2022 (India), prueba 1, matemáticas Q.5",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 1 数学 Q.5",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷一 数学 Q.5"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "How many roots?",
      fr: "Combien de racines ?",
      es: "¿Cuántas raíces?",
      ja: "解はいくつ？",
      zh: "有几个根？"
    },
    statement: {
      en: "<b>Which of the following are true about the complex solutions of $\\bar z-z^2=i\\left(\\bar z+z^2\\right)$?</b>",
      fr: "<b>Lesquelles des affirmations suivantes sont vraies au sujet des solutions complexes de $\\bar z-z^2=i\\left(\\bar z+z^2\\right)$ ?</b>",
      es: "<b>¿Cuáles de las siguientes afirmaciones sobre las soluciones complejas de $\\bar z-z^2=i\\left(\\bar z+z^2\\right)$ son verdaderas?</b>",
      ja: "<b>$\\bar z-z^2=i\\left(\\bar z+z^2\\right)$ の複素数解について、正しいものはどれですか？</b>",
      zh: "<b>关于 $\\bar z-z^2=i\\left(\\bar z+z^2\\right)$ 的复数解，下列哪些正确？</b>"
    },
    figureText: {
      en: "The solutions in the complex plane: 0, and three points on the unit circle at angles 90°, 210° and 330° (i and ±√3/2 − i/2), forming an equilateral triangle.",
      fr: "Les solutions dans le plan complexe : 0, et trois points du cercle unité aux angles 90°, 210° et 330° (i et ±√3/2 − i/2), formant un triangle équilatéral.",
      es: "Las soluciones en el plano complejo: 0 y tres puntos de la circunferencia unidad en los ángulos 90°, 210° y 330° (i y ±√3/2 − i/2), que forman un triángulo equilátero.",
      ja: "複素平面上の解：0 と、単位円上の角 90°、210°、330° の3点（i と ±√3/2 − i/2）で正三角形をなす。",
      zh: "复平面上的解：0，以及单位圆上角为 90°、210°、330° 的三点（i 与 ±√3/2 − i/2），构成正三角形。"
    },
    hint: {
      en: "Collect terms: $\\bar z(1-i)=z^2(1+i)$. Then use polar form for $z\\ne0$.",
      fr: "Regroupez : $\\bar z(1-i)=z^2(1+i)$. Puis forme polaire pour $z\\ne0$.",
      es: "Agrupa: $\\bar z(1-i)=z^2(1+i)$. Luego forma polar para $z\\ne0$.",
      ja: "まとめると $\\bar z(1-i)=z^2(1+i)$。$z\\ne0$ では極形式へ。",
      zh: "整理得 $\\bar z(1-i)=z^2(1+i)$，对 $z\\ne0$ 用极坐标形式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 56, pad: 18 });
      const T = argand(F, -1.8, 1.8, -1.6, 1.8, { grid: false });
      F.circle(T([0, 0]), 1, 'seg thin');
      const P = [90, 210, 330].map(a => [Math.cos(a * Math.PI / 180), Math.sin(a * Math.PI / 180)]);
      F.path(P.map(T), 'tri fill-yellow');
      P.forEach(p => F.dot(T(p))); F.dot(T([0, 0]));
      F.text(T(P[0]), 'i', 'len', 14, -8); F.text(T([0, 0]), '0', 'len small', 12, 12);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "there are exactly": {"fr": "il y a exactement", "es": "hay exactamente", "ja": "ちょうど", "zh": "恰有"},
      "distinct solutions": {"fr": "solutions distinctes", "es": "soluciones distintas", "ja": "個の異なる解がある", "zh": "个不同的解"},
      "is a solution": {"fr": "est solution", "es": "es solución", "ja": "は解", "zh": "是解"},
      "there are infinitely many solutions": {"fr": "il y a une infinité de solutions", "es": "hay infinitas soluciones", "ja": "解は無数にある", "zh": "有无穷多个解"},
      "every solution has": {"fr": "toute solution vérifie", "es": "toda solución cumple", "ja": "すべての解で", "zh": "每个解都满足"}
    },
    options: [
      { tex: "\\text{there are exactly } 4 \\text{ distinct solutions}", correct: true, why: {
        en: "$z=0$ and three roots of $z^3=-i$ on the unit circle.",
        fr: "$z=0$ et trois racines de $z^3=-i$ sur le cercle unité.",
        es: "$z=0$ y tres raíces de $z^3=-i$ en la circunferencia unidad.",
        ja: "$z=0$ と単位円上の $z^3=-i$ の3解。",
        zh: "$z=0$ 及单位圆上 $z^3=-i$ 的三个根。"
      } },
      { tex: "z=i \\text{ is a solution}", correct: true, why: {
        en: "$\\bar z-z^2=-i+1$ and $i(\\bar z+z^2)=i(-i-1)=1-i$.",
        fr: "$\\bar z-z^2=1-i$ et $i(\\bar z+z^2)=i(-i-1)=1-i$.",
        es: "$\\bar z-z^2=1-i$ e $i(\\bar z+z^2)=i(-i-1)=1-i$.",
        ja: "$\\bar z-z^2=1-i$、$i(\\bar z+z^2)=i(-i-1)=1-i$。",
        zh: "$\\bar z-z^2=1-i$，$i(\\bar z+z^2)=i(-i-1)=1-i$。"
      } },
      { tex: "\\text{there are exactly } 3 \\text{ distinct solutions}", correct: false, why: {
        en: "Forgets $z=0$.",
        fr: "Oublie $z=0$.",
        es: "Olvida $z=0$.",
        ja: "$z=0$ を忘れている。",
        zh: "忘了 $z=0$。"
      } },
      { tex: "\\text{there are exactly } 2 \\text{ distinct solutions}", correct: false, why: {
        en: "Treats it like a quadratic; $\\bar z$ changes the count.",
        fr: "Le traite comme une équation du second degré ; $\\bar z$ change le décompte.",
        es: "Lo trata como cuadrática; $\\bar z$ cambia la cuenta.",
        ja: "2次方程式とみなしているが、$\\bar z$ で個数が変わる。",
        zh: "当作二次方程，但 $\\bar z$ 改变了根数。"
      } },
      { tex: "\\text{there are infinitely many solutions}", correct: false, why: {
        en: "Each non-zero solution has $|z|=1$ and $3\\theta\\equiv-\\tfrac{\\pi}{2}$: only three.",
        fr: "Toute solution non nulle a $|z|=1$ et $3\\theta\\equiv-\\tfrac{\\pi}{2}$ : trois seulement.",
        es: "Toda solución no nula tiene $|z|=1$ y $3\\theta\\equiv-\\tfrac{\\pi}{2}$: solo tres.",
        ja: "0 でない解は $|z|=1$、$3\\theta\\equiv-\\tfrac{\\pi}{2}$ で3つだけ。",
        zh: "非零解满足 $|z|=1$、$3\\theta\\equiv-\\tfrac{\\pi}{2}$，只有三个。"
      } },
      { tex: "z=1 \\text{ is a solution}", correct: false, why: {
        en: "$1-1=0$ but $i(1+1)=2i$.",
        fr: "$1-1=0$ mais $i(1+1)=2i$.",
        es: "$1-1=0$ pero $i(1+1)=2i$.",
        ja: "$1-1=0$ だが $i(1+1)=2i$。",
        zh: "$1-1=0$，而 $i(1+1)=2i$。"
      } },
      { tex: "\\text{every solution has } |z|=1", correct: false, why: {
        en: "$z=0$ is a solution too.",
        fr: "$z=0$ est aussi solution.",
        es: "$z=0$ también es solución.",
        ja: "$z=0$ も解。",
        zh: "$z=0$ 也是解。"
      } },
      { tex: "z=-i \\text{ is a solution}", correct: false, why: {
        en: "$(-i)^3=i\\ne-i$.",
        fr: "$(-i)^3=i\\ne-i$.",
        es: "$(-i)^3=i\\ne-i$.",
        ja: "$(-i)^3=i\\ne-i$。",
        zh: "$(-i)^3=i\\ne-i$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Collect terms",
          fr: "Regrouper",
          es: "Agrupar",
          ja: "まとめる",
          zh: "整理"
        },
        lines: ["\\bar z(1-i)=z^2(1+i) \\;\\Rightarrow\\; z^2=-i\\,\\bar z"],
        note: {
          en: "$\\tfrac{1-i}{1+i}=-i$.",
          fr: "$\\tfrac{1-i}{1+i}=-i$.",
          es: "$\\tfrac{1-i}{1+i}=-i$.",
          ja: "$\\tfrac{1-i}{1+i}=-i$。",
          zh: "$\\tfrac{1-i}{1+i}=-i$。"
        }
      },
      {
        title: {
          en: "Polar form",
          fr: "Forme polaire",
          es: "Forma polar",
          ja: "極形式",
          zh: "极坐标形式"
        },
        lines: ["z=re^{i\\theta}\\ne0:\\ r^2e^{2i\\theta}=r\\,e^{-i\\pi/2}e^{-i\\theta} \\;\\Rightarrow\\; r=1,\\ 3\\theta\\equiv-\\tfrac{\\pi}{2}", "z\\in\\{0,\\ i,\\ \\pm\\tfrac{\\sqrt3}{2}-\\tfrac i2\\} \\;\\Rightarrow\\; \\boxed{4}"],
        note: {
          en: "Multiplying $z^2=-i\\bar z$ by $z$ gives $z^3=-i$ when $|z|=1$.",
          fr: "En multipliant $z^2=-i\\bar z$ par $z$ on obtient $z^3=-i$ quand $|z|=1$.",
          es: "Multiplicando $z^2=-i\\bar z$ por $z$ se obtiene $z^3=-i$ si $|z|=1$.",
          ja: "$z^2=-i\\bar z$ に $z$ を掛けると、$|z|=1$ なら $z^3=-i$。",
          zh: "$z^2=-i\\bar z$ 乘以 $z$，当 $|z|=1$ 时得 $z^3=-i$。"
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
          en: "Do not lose z = 0.",
          fr: "Ne perdez pas z = 0.",
          es: "No pierdas z = 0.",
          ja: "z = 0 を落とさないこと。",
          zh: "别漏了 z = 0。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
