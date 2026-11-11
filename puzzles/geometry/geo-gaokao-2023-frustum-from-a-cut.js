/* geometry · What is left after cutting off the top
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-frustum-from-a-cut",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 14",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 14",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 14",
        ja: "2023年 中国・高考 新課程標準II卷 第14問",
        zh: "2023年高考数学新课标II卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "What is left after cutting off the top",
      fr: "Ce qui reste après avoir coupé le sommet",
      es: "Lo que queda tras cortar la punta",
      ja: "頂上を切り取った残り",
      zh: "截去顶部后剩下的部分"
    },
    statement: {
      en: "A regular square pyramid has base edge $4$. A plane parallel to the base cuts off a small regular square pyramid with base edge $2$ and height $3$. <b>Which of the following equal the volume of the frustum that remains?</b>",
      fr: "Une pyramide régulière à base carrée a une arête de base $4$. Un plan parallèle à la base en détache une petite pyramide régulière d’arête de base $2$ et de hauteur $3$. <b>Lesquelles des valeurs suivantes sont égales au volume du tronc restant ?</b>",
      es: "Una pirámide cuadrangular regular tiene arista de la base $4$. Un plano paralelo a la base corta una pirámide pequeña de arista de la base $2$ y altura $3$. <b>¿Cuáles de los siguientes valores son iguales al volumen del tronco que queda?</b>",
      ja: "底面の1辺が $4$ の正四角錐を底面に平行な平面で切り、底面の1辺 $2$・高さ $3$ の正四角錐を切り取ります。<b>残った錐台の体積に等しいものはどれですか？</b>",
      zh: "底面边长为 $4$ 的正四棱锥被平行于底面的平面所截，截去一个底面边长为 $2$、高为 $3$ 的正四棱锥。<b>下列哪些等于所得棱台的体积？</b>"
    },
    figureText: {
      en: "A square pyramid with base edge 4, cut parallel to the base where the edge is 2; the small top pyramid has height 3.",
      fr: "Une pyramide carrée d’arête de base 4, coupée parallèlement à la base là où l’arête vaut 2 ; la petite pyramide du haut a pour hauteur 3.",
      es: "Una pirámide cuadrada de arista de base 4, cortada paralela a la base donde la arista vale 2; la pequeña pirámide superior tiene altura 3.",
      ja: "底辺 4 の四角錐を辺が 2 となる所で底面に平行に切る。上の小さい四角錐の高さは 3。",
      zh: "底边 4 的正四棱锥，在边长为 2 处平行截开，上方小棱锥高 3。"
    },
    hint: {
      en: "The small pyramid is a half-size copy, so the full pyramid has height $6$.",
      fr: "La petite pyramide est une copie à l’échelle $\\tfrac12$ : la grande a pour hauteur $6$.",
      es: "La pirámide pequeña es una copia a escala $\\tfrac12$: la grande tiene altura $6$.",
      ja: "小さい四角錐は相似比 $\\tfrac12$ なので、元の高さは $6$。",
      zh: "小棱锥与原棱锥相似比为 $\\tfrac12$，原棱锥高为 $6$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.4, scale: 56, pad: 16 });
      const P = ([x, y, z]) => [2.4 + 0.5 * x + 0.22 * y, 0.5 + 0.55 * z + 0.15 * y];
      const B = [[-2, -2, 0], [2, -2, 0], [2, 2, 0], [-2, 2, 0]], M = B.map(([x, y]) => [x / 2, y / 2, 3]), A = [0, 0, 6];
      [[0, 1], [1, 2]].forEach(([i, j]) => { F.seg(P(B[i]), P(B[j]), 'seg'); F.seg(P(M[i]), P(M[j]), 'seg'); });
      [[2, 3], [3, 0]].forEach(([i, j]) => { F.seg(P(B[i]), P(B[j]), 'seg thin dashc'); F.seg(P(M[i]), P(M[j]), 'seg'); });
      [0, 1, 2].forEach(i => F.seg(P(B[i]), P(M[i]), 'seg')); F.seg(P(B[3]), P(M[3]), 'seg thin dashc');
      M.forEach(m => F.seg(P(m), P(A), 'seg thin dashc'));
      F.text(P([0, -2, 0]), '4', 'len small', 0, 14); F.text(P([0, -1, 3]), '2', 'len small', 0, 14);
      F.seg(P([0, 0, 3]), P(A), 'seg thin'); F.text(P([0, 0, 4.5]), '3', 'len small', 34, 0);
      F.reveal = () => {
      F.text(P([2, 2, 0]), 'H = 6', 'len small', 30, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "H = 6": {"fr": "H = 6", "es": "H = 6", "ja": "H = 6", "zh": "H = 6"}
    },
    options: [
      { tex: "28", correct: true, why: {
        en: "$\\tfrac13\\cdot16\\cdot6-\\tfrac13\\cdot4\\cdot3=32-4$.",
        fr: "$\\tfrac13\\cdot16\\cdot6-\\tfrac13\\cdot4\\cdot3=32-4$.",
        es: "$\\tfrac13\\cdot16\\cdot6-\\tfrac13\\cdot4\\cdot3=32-4$.",
        ja: "$\\tfrac13\\cdot16\\cdot6-\\tfrac13\\cdot4\\cdot3=32-4$。",
        zh: "$\\tfrac13\\cdot16\\cdot6-\\tfrac13\\cdot4\\cdot3=32-4$。"
      } },
      { tex: "7\\cdot4", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "32", correct: false, why: {
        en: "That is the whole pyramid.",
        fr: "C’est la pyramide entière.",
        es: "Es la pirámide entera.",
        ja: "元の四角錐全体。",
        zh: "那是整个棱锥。"
      } },
      { tex: "4", correct: false, why: {
        en: "That is the small pyramid that was cut off.",
        fr: "C’est la petite pyramide retirée.",
        es: "Es la pirámide pequeña retirada.",
        ja: "切り取った小さい四角錐。",
        zh: "那是截去的小棱锥。"
      } },
      { tex: "20", correct: false, why: {
        en: "This drops the $\\sqrt{SS'}$ term: $\\tfrac33(16+4)$.",
        fr: "Cela oublie le terme $\\sqrt{SS'}$ : $\\tfrac33(16+4)$.",
        es: "Omite el término $\\sqrt{SS'}$: $\\tfrac33(16+4)$.",
        ja: "$\\sqrt{SS'}$ の項を落としている：$\\tfrac33(16+4)$。",
        zh: "漏了 $\\sqrt{SS'}$ 项：$\\tfrac33(16+4)$。"
      } },
      { tex: "84", correct: false, why: {
        en: "Forgot the $\\tfrac13$.",
        fr: "Le $\\tfrac13$ a été oublié.",
        es: "Se olvidó el $\\tfrac13$.",
        ja: "$\\tfrac13$ を忘れている。",
        zh: "漏了 $\\tfrac13$。"
      } },
      { tex: "24", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "14", correct: false, why: {
        en: "This uses height $3$ for the full pyramid in the big term too.",
        fr: "Cela prend aussi la hauteur $3$ pour la grande pyramide.",
        es: "Usa altura $3$ también para la pirámide grande.",
        ja: "大きい四角錐にも高さ $3$ を使っている。",
        zh: "大棱锥也误用了高 $3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Similar pyramids",
          fr: "Pyramides semblables",
          es: "Pirámides semejantes",
          ja: "相似な四角錐",
          zh: "相似棱锥"
        },
        lines: ["\\frac{2}{4}=\\frac{3}{H}\\ \\Rightarrow\\ H=6"],
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
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "引く",
          zh: "相减"
        },
        lines: ["V=\\tfrac13\\cdot4^2\\cdot6-\\tfrac13\\cdot2^2\\cdot3=32-4=\\boxed{28}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Check: $\\tfrac h3\\bigl(16+4+\\sqrt{64}\\bigr)=\\tfrac33\\cdot28$.",
          fr: "Vérification : $\\tfrac h3\\bigl(16+4+\\sqrt{64}\\bigr)=\\tfrac33\\cdot28$.",
          es: "Comprobación: $\\tfrac h3\\bigl(16+4+\\sqrt{64}\\bigr)=\\tfrac33\\cdot28$.",
          ja: "確認：$\\tfrac h3\\bigl(16+4+\\sqrt{64}\\bigr)=\\tfrac33\\cdot28$。",
          zh: "验证：$\\tfrac h3\\bigl(16+4+\\sqrt{64}\\bigr)=\\tfrac33\\cdot28$。"
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
