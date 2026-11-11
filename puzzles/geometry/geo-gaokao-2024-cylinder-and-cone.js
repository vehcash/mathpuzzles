/* geometry · A cylinder and a cone with equal sides
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-cylinder-and-cone",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 5",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 5",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 5",
        ja: "2024年 中国・高考 新課程標準I卷 第5問",
        zh: "2024年高考数学新课标I卷 第5题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "A cylinder and a cone with equal sides",
      fr: "Un cylindre et un cône aux surfaces latérales égales",
      es: "Un cilindro y un cono con igual área lateral",
      ja: "側面積の等しい円柱と円錐",
      zh: "侧面积相等的圆柱与圆锥"
    },
    statement: {
      en: "A cylinder and a cone have equal base radii and equal lateral surface areas, and both have height $\\sqrt3$. <b>Which of the following equal the volume of the cone?</b>",
      fr: "Un cylindre et un cône ont le même rayon de base et la même aire latérale, et tous deux ont pour hauteur $\\sqrt3$. <b>Lesquelles des valeurs suivantes sont égales au volume du cône ?</b>",
      es: "Un cilindro y un cono tienen el mismo radio de la base y la misma área lateral, y ambos tienen altura $\\sqrt3$. <b>¿Cuáles de los siguientes valores son iguales al volumen del cono?</b>",
      ja: "円柱と円錐の底面の半径が等しく、側面積も等しく、高さはともに $\\sqrt3$ です。<b>円錐の体積に等しいものはどれですか？</b>",
      zh: "圆柱和圆锥的底面半径相等，侧面积相等，且它们的高均为 $\\sqrt3$。<b>下列哪些等于圆锥的体积？</b>"
    },
    figureText: {
      en: "A cylinder and a cone side by side, both of height √3 and base radius r.",
      fr: "Un cylindre et un cône côte à côte, de hauteur √3 et de rayon de base r.",
      es: "Un cilindro y un cono lado a lado, ambos de altura √3 y radio r.",
      ja: "高さ √3、底面の半径 r の円柱と円錐が並んでいる。",
      zh: "并排的圆柱和圆锥，高都是 √3，底面半径都是 r。"
    },
    hint: {
      en: "Cylinder side: $2\\pi rh$. Cone side: $\\pi r\\ell$, with slant height $\\ell=\\sqrt{r^2+h^2}$.",
      fr: "Cylindre : $2\\pi rh$. Cône : $\\pi r\\ell$, avec la génératrice $\\ell=\\sqrt{r^2+h^2}$.",
      es: "Cilindro: $2\\pi rh$. Cono: $\\pi r\\ell$, con generatriz $\\ell=\\sqrt{r^2+h^2}$.",
      ja: "円柱の側面は $2\\pi rh$、円錐は $\\pi r\\ell$（母線 $\\ell=\\sqrt{r^2+h^2}$）。",
      zh: "圆柱侧面积 $2\\pi rh$，圆锥侧面积 $\\pi r\\ell$，母线 $\\ell=\\sqrt{r^2+h^2}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 3.4, scale: 50, pad: 16 });
      const E = (cx, cy, rx, ry, cls, half) => { const p = []; const n = 48; for (let k = 0; k <= n; k++) { const t = (half ? Math.PI : 2 * Math.PI) * k / n; p.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); } F.path(p, cls, 'base', !half); };
      E(1.5, 0.5, 1.1, 0.25, 'seg'); E(1.5, 2.6, 1.1, 0.25, 'seg');
      F.seg([0.4, 0.5], [0.4, 2.6], 'seg'); F.seg([2.6, 0.5], [2.6, 2.6], 'seg');
      E(4.8, 2.6, 1.1, 0.25, 'seg'); F.seg([3.7, 2.6], [4.8, 0.5], 'seg'); F.seg([5.9, 2.6], [4.8, 0.5], 'seg');
      F.seg([4.8, 0.5], [4.8, 2.6], 'seg thin dashc'); F.seg([4.8, 2.6], [5.9, 2.6], 'seg thin');
      F.text([5.35, 2.6], 'r', 'pt', 0, -20); F.text([4.8, 1.55], '√3', 'len small', -14, 0);
      F.seg([1.5, 2.6], [2.6, 2.6], 'seg thin'); F.text([2.05, 2.6], 'r', 'pt', 0, -20); F.text([2.6, 1.55], '√3', 'len small', 16, 0);
      F.reveal = () => {
      F.text([5.35, 1.55], 'ℓ = 2√3', 'len small', 30, 0);
      };
      return F;
    },
    options: [
      { tex: "3\\sqrt3\\,\\pi", correct: true, why: {
        en: "$r=3$, so $V=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=3\\sqrt3\\,\\pi$.",
        fr: "$r=3$, so $V=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=3\\sqrt3\\,\\pi$.",
        es: "$r=3$, so $V=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=3\\sqrt3\\,\\pi$.",
        ja: "$r=3$, so $V=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=3\\sqrt3\\,\\pi$.",
        zh: "$r=3$, so $V=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=3\\sqrt3\\,\\pi$."
      } },
      { tex: "\\sqrt{27}\\,\\pi", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "9\\sqrt3\\,\\pi", correct: false, why: {
        en: "That is the volume of the cylinder: the cone is a third of it.",
        fr: "C’est le volume du cylindre ; le cône en est le tiers.",
        es: "Es el volumen del cilindro; el cono es un tercio.",
        ja: "円柱の体積。円錐はその 1/3。",
        zh: "那是圆柱的体积，圆锥是它的三分之一。"
      } },
      { tex: "2\\sqrt3\\,\\pi", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "6\\sqrt3\\,\\pi", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt3\\,\\pi", correct: false, why: {
        en: "This uses $r=\\sqrt3$, the height, as the radius.",
        fr: "Cela prend $r=\\sqrt3$, la hauteur, comme rayon.",
        es: "Usa $r=\\sqrt3$, la altura, como radio.",
        ja: "高さ $\\sqrt3$ を半径にしている。",
        zh: "把高 $\\sqrt3$ 当成了半径。"
      } },
      { tex: "3\\pi", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "9\\pi", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Equal lateral areas",
          fr: "Aires latérales égales",
          es: "Áreas laterales iguales",
          ja: "側面積が等しい",
          zh: "侧面积相等"
        },
        lines: ["2\\pi r\\sqrt3=\\pi r\\ell\\ \\Rightarrow\\ \\ell=2\\sqrt3"],
        note: {
          en: "The radius cancels.",
          fr: "Le rayon se simplifie.",
          es: "El radio se cancela.",
          ja: "半径は約分される。",
          zh: "半径约去。"
        }
      },
      {
        title: {
          en: "Find the radius",
          fr: "Trouver le rayon",
          es: "Hallar el radio",
          ja: "半径を求める",
          zh: "求半径"
        },
        lines: ["r^2=\\ell^2-h^2=12-3=9,\\qquad r=3"],
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
          en: "Volume of the cone",
          fr: "Volume du cône",
          es: "Volumen del cono",
          ja: "円錐の体積",
          zh: "圆锥体积"
        },
        lines: ["V=\\tfrac13\\pi r^2h=\\tfrac13\\pi\\cdot9\\cdot\\sqrt3=\\boxed{3\\sqrt3\\,\\pi}"],
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
