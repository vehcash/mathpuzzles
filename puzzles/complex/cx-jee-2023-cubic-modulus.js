/* complex · A modulus, a square and a conjugate
   JEE Advanced 2023 (India), Paper 1, Mathematics Section 4 (List-I / List-II matching) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2023-cubic-modulus",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Section 4 (List-I / List-II matching)",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Section 4 (List-I / List-II matching)",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas Section 4 (List-I / List-II matching)",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Section 4 (List-I / List-II matching)",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学 Section 4 (List-I / List-II matching)"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A modulus, a square and a conjugate",
      fr: "Un module, un carré et un conjugué",
      es: "Un módulo, un cuadrado y un conjugado",
      ja: "絶対値・2乗・共役",
      zh: "模、平方与共轭"
    },
    statement: {
      en: "A complex number $z$ with non-zero imaginary part satisfies $|z|^3+2z^2+4\\bar z-8=0$. <b>Which of the following are true?</b>",
      fr: "Un nombre complexe $z$ de partie imaginaire non nulle vérifie $|z|^3+2z^2+4\\bar z-8=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un número complejo $z$ con parte imaginaria no nula cumple $|z|^3+2z^2+4\\bar z-8=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "虚部が $0$ でない複素数 $z$ が $|z|^3+2z^2+4\\bar z-8=0$ を満たします。<b>次のうち正しいものはどれですか？</b>",
      zh: "虚部不为零的复数 $z$ 满足 $|z|^3+2z^2+4\\bar z-8=0$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The complex plane with the point −1 marked. The roots z are plotted in the solution.",
      fr: "Le plan complexe avec le point −1. Les racines z sont placées dans la solution.",
      es: "El plano complejo con el punto −1. Las raíces z se colocan en la solución.",
      ja: "点 −1 を記した複素平面。解 z は解答で描きます。",
      zh: "标出 −1 的复平面。根 z 在解答中标出。"
    },
    hint: {
      en: "Conjugate the whole equation and subtract it from the original.",
      fr: "Conjuguez toute l’équation et soustrayez-la de l’originale.",
      es: "Conjuga toda la ecuación y réstala de la original.",
      ja: "式全体の共役をとって元の式から引きましょう。",
      zh: "对整个方程取共轭，再与原方程相减。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 4.8, scale: 48, pad: 18 });
      const T = argand(F, -2.6, 2.6, -2.4, 2.4, { grid: false });
      F.dot(T([-1, 0])); F.text(T([-1, 0]), '−1', 'len small', -10, 14);
      F.reveal = () => {
      F.circle(T([0, 0]), 2, 'seg thin');
      const z1 = [1, Math.sqrt(3)], z2 = [1, -Math.sqrt(3)];
      F.seg(T([-1, 0]), T(z1), 'hl yellow');
      [z1, z2].forEach(z => F.dot(T(z)));
      F.text(T(z1), '1 + i√3', 'len small', 30, -6); F.text(T(z2), '1 − i√3', 'len small', 30, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "can be real": {"fr": "peut être réel", "es": "puede ser real", "ja": "は実数になりうる", "zh": "可以是实数"}
    },
    options: [
      { tex: "|z|^2=4", correct: true, why: {
        en: "$z=1\\pm i\\sqrt3$, so $|z|^2=1+3$.",
        fr: "$z=1\\pm i\\sqrt3$, donc $|z|^2=1+3$.",
        es: "$z=1\\pm i\\sqrt3$, así que $|z|^2=1+3$.",
        ja: "$z=1\\pm i\\sqrt3$ なので $|z|^2=1+3$。",
        zh: "$z=1\\pm i\\sqrt3$，故 $|z|^2=1+3$。"
      } },
      { tex: "|z+1|^2=7", correct: true, why: {
        en: "$|2\\pm i\\sqrt3|^2=4+3$.",
        fr: "$|2\\pm i\\sqrt3|^2=4+3$.",
        es: "$|2\\pm i\\sqrt3|^2=4+3$.",
        ja: "$|2\\pm i\\sqrt3|^2=4+3$。",
        zh: "$|2\\pm i\\sqrt3|^2=4+3$。"
      } },
      { tex: "|z-\\bar z|^2=4", correct: false, why: {
        en: "$z-\\bar z=\\pm2i\\sqrt3$, so it is $12$.",
        fr: "$z-\\bar z=\\pm2i\\sqrt3$ : cela vaut $12$.",
        es: "$z-\\bar z=\\pm2i\\sqrt3$: vale $12$.",
        ja: "$z-\\bar z=\\pm2i\\sqrt3$ で $12$。",
        zh: "$z-\\bar z=\\pm2i\\sqrt3$，等于 $12$。"
      } },
      { tex: "|z|^2+|z+\\bar z|^2=12", correct: false, why: {
        en: "$4+2^2=8$.",
        fr: "$4+2^2=8$.",
        es: "$4+2^2=8$.",
        ja: "$4+2^2=8$。",
        zh: "$4+2^2=8$。"
      } },
      { tex: "\\operatorname{Re} z=2", correct: false, why: {
        en: "Subtracting the conjugate equation gives $z+\\bar z=2$, so $\\operatorname{Re}z=1$.",
        fr: "La soustraction donne $z+\\bar z=2$, donc $\\operatorname{Re}z=1$.",
        es: "Restar da $z+\\bar z=2$, luego $\\operatorname{Re}z=1$.",
        ja: "引き算で $z+\\bar z=2$、よって $\\operatorname{Re}z=1$。",
        zh: "相减得 $z+\\bar z=2$，故 $\\operatorname{Re}z=1$。"
      } },
      { tex: "|z+1|^2=10", correct: false, why: {
        en: "Miscalculated: $|2\\pm i\\sqrt3|^2=4+3=7$.",
        fr: "Erreur de calcul : $|2\\pm i\\sqrt3|^2=4+3=7$.",
        es: "Error de cálculo: $|2\\pm i\\sqrt3|^2=4+3=7$.",
        ja: "計算違い：$|2\\pm i\\sqrt3|^2=4+3=7$。",
        zh: "算错了：$|2\\pm i\\sqrt3|^2=4+3=7$。"
      } },
      { tex: "|z|=4", correct: false, why: {
        en: "$|z|=2$; $4$ is $|z|^2$.",
        fr: "$|z|=2$ ; $4$ est $|z|^2$.",
        es: "$|z|=2$; $4$ es $|z|^2$.",
        ja: "$|z|=2$。$4$ は $|z|^2$。",
        zh: "$|z|=2$；$4$ 是 $|z|^2$。"
      } },
      { tex: "z \\text{ can be real}", correct: false, why: {
        en: "The statement says its imaginary part is not zero.",
        fr: "L’énoncé dit que sa partie imaginaire n’est pas nulle.",
        es: "El enunciado dice que su parte imaginaria no es nula.",
        ja: "問題文で虚部は $0$ でないとされている。",
        zh: "题设说明其虚部不为零。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Subtract the conjugate",
          fr: "Soustraire le conjugué",
          es: "Restar el conjugado",
          ja: "共役を引く",
          zh: "减去共轭式"
        },
        lines: ["2(z^2-\\bar z^2)-4(z-\\bar z)=0 \\;\\Rightarrow\\; (z-\\bar z)\\big(2(z+\\bar z)-4\\big)=0", "z\\ne\\bar z \\;\\Rightarrow\\; z+\\bar z=2,\\ z=1+iy"],
        note: {
          en: "$|z|^3$ and $-8$ are real, so they cancel.",
          fr: "$|z|^3$ et $-8$ sont réels : ils s’éliminent.",
          es: "$|z|^3$ y $-8$ son reales: se cancelan.",
          ja: "$|z|^3$ と $-8$ は実数なので消える。",
          zh: "$|z|^3$ 与 $-8$ 为实数，相互抵消。"
        }
      },
      {
        title: {
          en: "Find the imaginary part",
          fr: "Trouver la partie imaginaire",
          es: "Hallar la parte imaginaria",
          ja: "虚部を求める",
          zh: "求虚部"
        },
        lines: ["(1+y^2)^{3/2}-2(1+y^2)=0 \\;\\Rightarrow\\; 1+y^2=4,\\ y=\\pm\\sqrt3"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "So $|z|^2=4$, $|z-\\bar z|^2=12$, $|z|^2+|z+\\bar z|^2=8$, $|z+1|^2=7$.",
          fr: "Donc $|z|^2=4$, $|z-\\bar z|^2=12$, $|z|^2+|z+\\bar z|^2=8$, $|z+1|^2=7$.",
          es: "Así $|z|^2=4$, $|z-\\bar z|^2=12$, $|z|^2+|z+\\bar z|^2=8$, $|z+1|^2=7$.",
          ja: "よって $|z|^2=4$、$|z-\\bar z|^2=12$、$|z|^2+|z+\\bar z|^2=8$、$|z+1|^2=7$。",
          zh: "所以 $|z|^2=4$，$|z-\\bar z|^2=12$，$|z|^2+|z+\\bar z|^2=8$，$|z+1|^2=7$。"
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
          en: "Compute all four quantities once z is known.",
          fr: "Calculez les quatre quantités une fois z connu.",
          es: "Calcula las cuatro cantidades una vez conocido z.",
          ja: "z が分かれば4つの量をすべて計算できます。",
          zh: "求出 z 后四个量都能算。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
