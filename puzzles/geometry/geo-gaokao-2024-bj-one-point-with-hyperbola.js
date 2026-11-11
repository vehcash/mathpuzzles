/* geometry · A line through (3, 0) with one common point
   Gaokao 2024, Beijing paper (北京卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-bj-one-point-with-hyperbola",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Beijing paper (北京卷), Question 13",
        fr: "Gaokao 2024, épreuve de Pékin (北京卷), question 13",
        es: "Gaokao 2024, examen de Pekín (北京卷), pregunta 13",
        ja: "2024年 中国・高考 北京卷 第13問",
        zh: "2024年高考数学北京卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A line through (3, 0) with one common point",
      fr: "Une droite par (3, 0) avec un seul point commun",
      es: "Una recta por (3, 0) con un único punto común",
      ja: "(3, 0) を通り共有点が1つの直線",
      zh: "过 (3, 0) 且只有一个公共点的直线"
    },
    statement: {
      en: "The line $y=k(x-3)$ and the hyperbola $\\dfrac{x^2}{4}-y^2=1$ have exactly one common point. <b>Which of the following are possible values of $k$?</b>",
      fr: "La droite $y=k(x-3)$ et l’hyperbole $\\dfrac{x^2}{4}-y^2=1$ ont exactement un point commun. <b>Lesquelles des valeurs suivantes sont possibles pour $k$ ?</b>",
      es: "La recta $y=k(x-3)$ y la hipérbola $\\dfrac{x^2}{4}-y^2=1$ tienen exactamente un punto común. <b>¿Cuáles de los siguientes son valores posibles de $k$?</b>",
      ja: "直線 $y=k(x-3)$ と双曲線 $\\dfrac{x^2}{4}-y^2=1$ の共有点がちょうど1つです。<b>$k$ としてありうるものはどれですか？</b>",
      zh: "若直线 $y=k(x-3)$ 与双曲线 $\\dfrac{x^2}{4}-y^2=1$ 只有一个公共点，<b>下列哪些可以是 $k$ 的值？</b>"
    },
    figureText: {
      en: "The hyperbola and the point (3, 0) inside its right branch.",
      fr: "L’hyperbole et le point (3, 0) à l’intérieur de sa branche droite.",
      es: "La hipérbola y el punto (3, 0) dentro de su rama derecha.",
      ja: "双曲線と、右の枝の内側にある点 (3, 0)。",
      zh: "双曲线及其右支内部的点 (3, 0)。"
    },
    hint: {
      en: "$(3,0)$ is inside the right branch, so no line through it is tangent. Which lines through it meet the curve only once?",
      fr: "$(3,0)$ est à l’intérieur de la branche droite : aucune droite passant par lui n’est tangente. Lesquelles ne coupent qu’une fois ?",
      es: "$(3,0)$ está dentro de la rama derecha: ninguna recta por él es tangente. ¿Cuáles cortan una sola vez?",
      ja: "$(3,0)$ は右の枝の内側なので接線は引けない。1回だけ交わる直線は？",
      zh: "$(3,0)$ 在右支内部，过它的直线都不是切线。哪些直线只交一次？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.0, h: 5.0, scale: 36, pad: 16 });
      const T = F.T = axes(F, -4.0, 4.0, -2.5, 2.5);
      [1, -1].forEach(s => { const p = []; for (let k = -40; k <= 40; k++) { const u = 1.15 * k / 40; p.push(T([s * 2 * Math.cosh(u), Math.sinh(u)])); } F.path(p, 'graph', 'base', false); });
      F.dot(T([3, 0])); F.text(T([3, 0]), '(3, 0)', 'len small', 4, 14);
      F.reveal = () => {
      [0.5, -0.5].forEach(k => F.seg(T([-1.8, k * (-4.8)]), T([3.9, k * 0.9]), 'hl pink'));
      [0.5, -0.5].forEach(k => F.seg(T([-4, -4 * k]), T([4, 4 * k]), 'seg thin dashc'));
      };
      return F;
    },
    options: [
      { tex: "\\tfrac12", correct: true, why: {
        en: "Parallel to the asymptote $y=\\tfrac x2$: the quadratic drops to a linear equation with one root.",
        fr: "Parallèle à l’asymptote $y=\\tfrac x2$ : l’équation devient du premier degré, une seule racine.",
        es: "Paralela a la asíntota $y=\\tfrac x2$: la ecuación pasa a ser lineal, con una raíz.",
        ja: "漸近線 $y=\\tfrac x2$ に平行：1次方程式になり解は1つ。",
        zh: "平行于渐近线 $y=\\tfrac x2$：方程变为一次，只有一个根。"
      } },
      { tex: "-\\tfrac12", correct: true, why: {
        en: "Parallel to the other asymptote.",
        fr: "Parallèle à l’autre asymptote.",
        es: "Paralela a la otra asíntota.",
        ja: "もう一方の漸近線に平行。",
        zh: "平行于另一条渐近线。"
      } },
      { tex: "0", correct: false, why: {
        en: "The $x$-axis meets the hyperbola at $(\\pm2,0)$: two points.",
        fr: "L’axe des $x$ coupe l’hyperbole en $(\\pm2,0)$ : deux points.",
        es: "El eje $x$ corta la hipérbola en $(\\pm2,0)$: dos puntos.",
        ja: "$x$ 軸は $(\\pm2,0)$ の2点で交わる。",
        zh: "$x$ 轴与双曲线交于 $(\\pm2,0)$ 两点。"
      } },
      { tex: "1", correct: false, why: {
        en: "Steeper than the asymptotes: it cuts the right branch twice.",
        fr: "Plus raide que les asymptotes : elle coupe deux fois la branche droite.",
        es: "Más inclinada que las asíntotas: corta dos veces la rama derecha.",
        ja: "漸近線より急：右の枝と2回交わる。",
        zh: "比渐近线陡：与右支交两次。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "Flatter than the asymptotes: it meets both branches.",
        fr: "Moins raide que les asymptotes : elle coupe les deux branches.",
        es: "Menos inclinada que las asíntotas: corta ambas ramas.",
        ja: "漸近線より緩い：両方の枝と交わる。",
        zh: "比渐近线平缓：与两支各交一次。"
      } },
      { tex: "\\tfrac{\\sqrt5}{5}", correct: false, why: {
        en: "Not an asymptote slope, and through an inside point no line is tangent.",
        fr: "Ce n’est pas une pente d’asymptote, et par un point intérieur aucune droite n’est tangente.",
        es: "No es pendiente de asíntota, y por un punto interior ninguna recta es tangente.",
        ja: "漸近線の傾きでなく、内部の点を通る接線もない。",
        zh: "不是渐近线斜率，且过内部点的直线不可能相切。"
      } },
      { tex: "2", correct: false, why: {
        en: "Two points on the right branch.",
        fr: "Deux points sur la branche droite.",
        es: "Dos puntos en la rama derecha.",
        ja: "右の枝と2点で交わる。",
        zh: "与右支交于两点。"
      } },
      { tex: "-1", correct: false, why: {
        en: "Two points on the right branch.",
        fr: "Deux points sur la branche droite.",
        es: "Dos puntos en la rama derecha.",
        ja: "右の枝と2点で交わる。",
        zh: "与右支交于两点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "代入",
          zh: "代入"
        },
        lines: ["\\left(\\tfrac14-k^2\\right)x^2+6k^2x-9k^2-1=0"],
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
          en: "Quadratic case",
          fr: "Cas quadratique",
          es: "Caso cuadrático",
          ja: "2次の場合",
          zh: "二次情形"
        },
        lines: ["\\Delta=36k^4+4\\left(\\tfrac14-k^2\\right)(9k^2+1)=5k^2+1>0"],
        note: {
          en: "Always two points when $k^2\\ne\\tfrac14$: no tangent through an inside point.",
          fr: "Toujours deux points si $k^2\\ne\\tfrac14$ : pas de tangente par un point intérieur.",
          es: "Siempre dos puntos si $k^2\\ne\\tfrac14$: no hay tangente por un punto interior.",
          ja: "$k^2\\ne\\tfrac14$ なら常に2点。内部の点を通る接線はない。",
          zh: "$k^2\\ne\\tfrac14$ 时总有两个交点：过内部点无切线。"
        }
      },
      {
        title: {
          en: "Linear case",
          fr: "Cas linéaire",
          es: "Caso lineal",
          ja: "1次の場合",
          zh: "一次情形"
        },
        lines: ["k^2=\\tfrac14\\ \\Rightarrow\\ k=\\boxed{\\pm\\tfrac12}"],
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
