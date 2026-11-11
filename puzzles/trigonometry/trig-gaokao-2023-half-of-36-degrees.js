/* trigonometry · Half an angle with a golden cosine
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-gaokao-2023-half-of-36-degrees",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 7",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 7",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 7",
        ja: "2023年 中国・高考 新課程標準II卷 第7問",
        zh: "2023年高考数学新课标II卷 第7题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Half an angle with a golden cosine",
      fr: "La moitié d’un angle au cosinus doré",
      es: "La mitad de un ángulo de coseno áureo",
      ja: "黄金比の余弦をもつ角の半分",
      zh: "余弦为黄金比相关值的半角"
    },
    statement: {
      en: "$\\alpha$ is acute and $\\cos\\alpha=\\dfrac{1+\\sqrt5}{4}$. <b>Which of the following equal $\\sin\\dfrac\\alpha2$?</b>",
      fr: "$\\alpha$ est aigu et $\\cos\\alpha=\\dfrac{1+\\sqrt5}{4}$. <b>Lesquelles des valeurs suivantes sont égales à $\\sin\\dfrac\\alpha2$ ?</b>",
      es: "$\\alpha$ es agudo y $\\cos\\alpha=\\dfrac{1+\\sqrt5}{4}$. <b>¿Cuáles de los siguientes valores son iguales a $\\sin\\dfrac\\alpha2$?</b>",
      ja: "$\\alpha$ は鋭角で $\\cos\\alpha=\\dfrac{1+\\sqrt5}{4}$ です。<b>$\\sin\\dfrac\\alpha2$ に等しいものはどれですか？</b>",
      zh: "已知 $\\alpha$ 为锐角，$\\cos\\alpha=\\dfrac{1+\\sqrt5}{4}$。<b>下列哪些等于 $\\sin\\dfrac\\alpha2$？</b>"
    },
    figureText: {
      en: "A unit circle with the acute angle α whose cosine is (1 + √5)/4 ≈ 0.809.",
      fr: "Un cercle unité avec l’angle aigu α de cosinus (1 + √5)/4 ≈ 0,809.",
      es: "Una circunferencia unidad con el ángulo agudo α de coseno (1 + √5)/4 ≈ 0,809.",
      ja: "余弦が (1 + √5)/4 ≈ 0.809 の鋭角 α を描いた単位円。",
      zh: "单位圆上余弦为 (1 + √5)/4 ≈ 0.809 的锐角 α。"
    },
    hint: {
      en: "$\\sin^2\\tfrac\\alpha2=\\dfrac{1-\\cos\\alpha}{2}$. Then look for a perfect square $\\left(\\dfrac{p+q\\sqrt5}{r}\\right)^2$.",
      fr: "$\\sin^2\\tfrac\\alpha2=\\dfrac{1-\\cos\\alpha}{2}$. Cherchez ensuite un carré parfait $\\left(\\dfrac{p+q\\sqrt5}{r}\\right)^2$.",
      es: "$\\sin^2\\tfrac\\alpha2=\\dfrac{1-\\cos\\alpha}{2}$. Luego busca un cuadrado perfecto $\\left(\\dfrac{p+q\\sqrt5}{r}\\right)^2$.",
      ja: "$\\sin^2\\tfrac\\alpha2=\\dfrac{1-\\cos\\alpha}{2}$。次に $\\left(\\dfrac{p+q\\sqrt5}{r}\\right)^2$ の形を探す。",
      zh: "$\\sin^2\\tfrac\\alpha2=\\dfrac{1-\\cos\\alpha}{2}$，再凑成完全平方 $\\left(\\dfrac{p+q\\sqrt5}{r}\\right)^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 16 });
      const T = F.T = axes(F, -1.4, 1.6, -1.4, 1.6);
      { const cx = 0, cy = 0, r = 1, cls = 'seg thin'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      const a = Math.acos((1 + Math.sqrt(5)) / 4), U = t => [Math.cos(t), Math.sin(t)];
      F.seg(T([0, 0]), T(U(a)), 'hl yellow'); F.seg(T(U(a)), T([Math.cos(a), 0]), 'seg thin dashc'); F.text(T(U(a)), 'α', 'pt', 12, -6);
      F.text(T([Math.cos(a), 0]), '0.809', 'len small', -18, 14);
      F.reveal = () => {
      F.seg(T([0, 0]), T(U(a / 2)), 'hl pink'); F.seg(T(U(a / 2)), T([Math.cos(a / 2), 0]), 'seg thin dashc'); F.text(T(U(a / 2)), 'α/2', 'len small', 22, 2);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{-1+\\sqrt5}{4}", correct: true, why: {
        en: "$\\sin^2\\tfrac\\alpha2=\\tfrac{3-\\sqrt5}8=\\left(\\tfrac{\\sqrt5-1}4\\right)^2$, and $\\tfrac\\alpha2$ is acute.",
        fr: "$\\sin^2\\tfrac\\alpha2=\\tfrac{3-\\sqrt5}8=\\left(\\tfrac{\\sqrt5-1}4\\right)^2$, et $\\tfrac\\alpha2$ est aigu.",
        es: "$\\sin^2\\tfrac\\alpha2=\\tfrac{3-\\sqrt5}8=\\left(\\tfrac{\\sqrt5-1}4\\right)^2$ y $\\tfrac\\alpha2$ es agudo.",
        ja: "$\\sin^2\\tfrac\\alpha2=\\tfrac{3-\\sqrt5}8=\\left(\\tfrac{\\sqrt5-1}4\\right)^2$、$\\tfrac\\alpha2$ は鋭角。",
        zh: "$\\sin^2\\tfrac\\alpha2=\\tfrac{3-\\sqrt5}8=\\left(\\tfrac{\\sqrt5-1}4\\right)^2$，且 $\\tfrac\\alpha2$ 为锐角。"
      } },
      { tex: "\\sin18^\\circ", correct: true, why: {
        en: "$\\cos\\alpha=\\cos36^\\circ$, so $\\tfrac\\alpha2=18^\\circ$.",
        fr: "$\\cos\\alpha=\\cos36^\\circ$, donc $\\tfrac\\alpha2=18^\\circ$.",
        es: "$\\cos\\alpha=\\cos36^\\circ$, así que $\\tfrac\\alpha2=18^\\circ$.",
        ja: "$\\cos\\alpha=\\cos36^\\circ$ より $\\tfrac\\alpha2=18^\\circ$。",
        zh: "$\\cos\\alpha=\\cos36^\\circ$，故 $\\tfrac\\alpha2=18^\\circ$。"
      } },
      { tex: "\\tfrac{3-\\sqrt5}{8}", correct: false, why: {
        en: "That is $\\sin^2\\tfrac\\alpha2$.",
        fr: "C’est $\\sin^2\\tfrac\\alpha2$.",
        es: "Es $\\sin^2\\tfrac\\alpha2$.",
        ja: "$\\sin^2\\tfrac\\alpha2$ の値。",
        zh: "那是 $\\sin^2\\tfrac\\alpha2$。"
      } },
      { tex: "\\tfrac{-1+\\sqrt5}{8}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{3-\\sqrt5}{4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{1+\\sqrt5}{4}", correct: false, why: {
        en: "That is $\\cos\\alpha$.",
        fr: "C’est $\\cos\\alpha$.",
        es: "Es $\\cos\\alpha$.",
        ja: "$\\cos\\alpha$ そのもの。",
        zh: "那是 $\\cos\\alpha$。"
      } },
      { tex: "\\sin36^\\circ", correct: false, why: {
        en: "That is $\\sin\\alpha$.",
        fr: "C’est $\\sin\\alpha$.",
        es: "Es $\\sin\\alpha$.",
        ja: "$\\sin\\alpha$。",
        zh: "那是 $\\sin\\alpha$。"
      } },
      { tex: "\\tfrac{1-\\sqrt5}{4}", correct: false, why: {
        en: "Negative, but $\\tfrac\\alpha2$ is acute.",
        fr: "Négatif, alors que $\\tfrac\\alpha2$ est aigu.",
        es: "Negativo, pero $\\tfrac\\alpha2$ es agudo.",
        ja: "負だが $\\tfrac\\alpha2$ は鋭角。",
        zh: "为负，但 $\\tfrac\\alpha2$ 是锐角。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Half-angle formula",
          fr: "Formule de l’angle moitié",
          es: "Fórmula del ángulo mitad",
          ja: "半角の公式",
          zh: "半角公式"
        },
        lines: ["\\sin^2\\tfrac\\alpha2=\\frac{1-\\cos\\alpha}{2}=\\frac{3-\\sqrt5}{8}"],
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
          en: "Recognise a square",
          fr: "Reconnaître un carré",
          es: "Reconocer un cuadrado",
          ja: "平方の形にする",
          zh: "凑完全平方"
        },
        lines: ["\\frac{3-\\sqrt5}{8}=\\frac{6-2\\sqrt5}{16}=\\left(\\frac{\\sqrt5-1}{4}\\right)^2", "\\sin\\tfrac\\alpha2=\\boxed{\\tfrac{\\sqrt5-1}{4}}"],
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
          en: "Two options are the same number; one is written as a sine.",
          fr: "Deux options sont le même nombre ; l’une est écrite comme un sinus.",
          es: "Dos opciones son el mismo número; una escrita como seno.",
          ja: "2つの選択肢は同じ数で、片方は正弦で書かれている。",
          zh: "有两个选项是同一个数，其中一个写成正弦。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
