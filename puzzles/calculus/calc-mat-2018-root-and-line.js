/* calculus · Between √x, a line and the axis
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2018-root-and-line",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2018 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "Between √x, a line and the axis",
      fr: "Entre √x, une droite et l’axe",
      es: "Entre √x, una recta y el eje",
      ja: "√x・直線・軸に囲まれた部分",
      zh: "√x、直线与坐标轴之间"
    },
    statement: {
      en: "<b>Which of the following equal the area of the region enclosed by $y=\\sqrt x$, $y=x-2$ and the $x$-axis?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à l’aire de la région délimitée par $y=\\sqrt x$, $y=x-2$ et l’axe des $x$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al área de la región limitada por $y=\\sqrt x$, $y=x-2$ y el eje $x$?</b>",
      ja: "<b>$y=\\sqrt x$、$y=x-2$ と $x$ 軸で囲まれた部分の面積に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于由 $y=\\sqrt x$、$y=x-2$ 与 $x$ 轴围成区域的面积？</b>"
    },
    figureText: {
      en: "The curve y = √x from 0 to 4 and the line y = x − 2 from 2 to 4; the region under the curve and above both the axis and the line is shaded.",
      fr: "La courbe y = √x de 0 à 4 et la droite y = x − 2 de 2 à 4 ; la région sous la courbe, au-dessus de l’axe et de la droite, est grisée.",
      es: "La curva y = √x de 0 a 4 y la recta y = x − 2 de 2 a 4; la región bajo la curva y sobre el eje y la recta está sombreada.",
      ja: "0〜4 の y = √x と 2〜4 の直線 y = x − 2。曲線の下で軸と直線の上の部分に色付け。",
      zh: "曲线 y = √x（0 到 4）与直线 y = x − 2（2 到 4），曲线下方、轴与直线上方的区域涂色。"
    },
    hint: {
      en: "They meet at $x=4$. Take the area under $\\sqrt x$ from $0$ to $4$ and remove the triangle under the line.",
      fr: "Elles se coupent en $x=4$. Prenez l’aire sous $\\sqrt x$ de $0$ à $4$ et retirez le triangle sous la droite.",
      es: "Se cortan en $x=4$. Toma el área bajo $\\sqrt x$ de $0$ a $4$ y quita el triángulo bajo la recta.",
      ja: "$x=4$ で交わる。$\\sqrt x$ の下の面積（0〜4）から直線の下の三角形を引く。",
      zh: "它们交于 $x=4$。用 $\\sqrt x$ 下 0 到 4 的面积减去直线下的三角形。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 2.9, scale: 60, pad: 18 });
      const T = F.T = axes(F, -0.3, 5.1, -0.3, 2.6);
      const q = [T([0, 0])]; for (let k = 0; k <= 40; k++) { const x = 4 * k / 40; q.push(T([x, Math.sqrt(x)])); } q.push(T([2, 0]));
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, Math.sqrt, 0, 4.9, 'graph'); F.seg(T([1.7, -0.3]), T([4.5, 2.5]), 'seg');
      F.dot(T([4, 2])); F.text(T([4, 2]), '(4, 2)', 'len small', 26, 8); F.text(T([2, 0]), '2', 'tick', 6, 14);
      return F;
    },
    options: [
      { tex: "\\tfrac{10}{3}", correct: true, why: {
        en: "$\\tfrac{16}{3}-2$.",
        fr: "$\\tfrac{16}{3}-2$.",
        es: "$\\tfrac{16}{3}-2$.",
        ja: "$\\tfrac{16}{3}-2$.",
        zh: "$\\tfrac{16}{3}-2$."
      } },
      { tex: "\\int_0^4\\sqrt x\\,dx-\\int_2^4(x-2)\\,dx", correct: true, why: {
        en: "The area as a difference, before evaluating.",
        fr: "L’aire comme différence, avant calcul.",
        es: "El área como diferencia, antes de calcular.",
        ja: "計算前の差の形。",
        zh: "求值前的差的形式。"
      } },
      { tex: "\\tfrac{16}{3}", correct: false, why: {
        en: "Forgets the triangle under the line.",
        fr: "Oublie le triangle sous la droite.",
        es: "Olvida el triángulo bajo la recta.",
        ja: "直線の下の三角形を忘れた。",
        zh: "忘了直线下的三角形。"
      } },
      { tex: "2", correct: false, why: {
        en: "That is the triangle.",
        fr: "C’est le triangle.",
        es: "Es el triángulo.",
        ja: "それは三角形。",
        zh: "那是三角形。"
      } },
      { tex: "\\tfrac{22}{3}", correct: false, why: {
        en: "Adds the triangle instead of subtracting.",
        fr: "Ajoute le triangle au lieu de le retirer.",
        es: "Suma el triángulo en vez de restarlo.",
        ja: "三角形を足した。",
        zh: "把三角形加上了。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "Integrates $\\sqrt x-(x-2)$ from $2$ to $4$ only.",
        fr: "Intègre $\\sqrt x-(x-2)$ seulement de $2$ à $4$.",
        es: "Integra $\\sqrt x-(x-2)$ solo de $2$ a $4$.",
        ja: "2〜4 の $\\sqrt x-(x-2)$ だけ。",
        zh: "只积了 2 到 4 的 $\\sqrt x-(x-2)$。"
      } },
      { tex: "\\tfrac{8}{3}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "4", correct: false, why: {
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
          en: "Where they meet",
          fr: "Où elles se coupent",
          es: "Dónde se cortan",
          ja: "交点",
          zh: "交点"
        },
        lines: ["\\sqrt x=x-2\\iff x=4\\quad(x\\ge2)"],
        note: {
          en: "Square: $x=x^2-4x+4$, so $x=1$ or $4$; only $4$ satisfies $x-2\\ge0$.",
          fr: "En élevant au carré : $x=1$ ou $4$ ; seul $4$ vérifie $x-2\\ge0$.",
          es: "Al cuadrado: $x=1$ o $4$; solo $4$ cumple $x-2\\ge0$.",
          ja: "2乗して $x=1,4$、$x-2\\ge0$ は $4$ だけ。",
          zh: "平方得 $x=1$ 或 $4$，只有 $4$ 满足 $x-2\\ge0$。"
        }
      },
      {
        title: {
          en: "Subtract the triangle",
          fr: "Retirer le triangle",
          es: "Quitar el triángulo",
          ja: "三角形を引く",
          zh: "减去三角形"
        },
        lines: ["\\int_0^4\\sqrt x\\,dx-\\tfrac12\\cdot2\\cdot2=\\tfrac{16}{3}-2=\\boxed{\\tfrac{10}{3}}"],
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
