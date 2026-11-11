/* calculus · Two integrals that fit together
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2022-inverse-integrals",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.3",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.3",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.3",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.3",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.3"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Two integrals that fit together",
      fr: "Deux intégrales qui s’emboîtent",
      es: "Dos integrales que encajan",
      ja: "かみ合う2つの積分",
      zh: "拼在一起的两个积分"
    },
    statement: {
      en: "<b>Which of the following equal the greatest integer $\\le\\displaystyle\\int_1^2\\log_2(x^3+1)\\,dx+\\int_1^{\\log_2 9}\\left(2^x-1\\right)^{1/3}dx$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à la partie entière de $\\displaystyle\\int_1^2\\log_2(x^3+1)\\,dx+\\int_1^{\\log_2 9}\\left(2^x-1\\right)^{1/3}dx$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a la parte entera de $\\displaystyle\\int_1^2\\log_2(x^3+1)\\,dx+\\int_1^{\\log_2 9}\\left(2^x-1\\right)^{1/3}dx$?</b>",
      ja: "<b>$\\displaystyle\\int_1^2\\log_2(x^3+1)\\,dx+\\int_1^{\\log_2 9}\\left(2^x-1\\right)^{1/3}dx$ 以下の最大の整数に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于不超过 $\\displaystyle\\int_1^2\\log_2(x^3+1)\\,dx+\\int_1^{\\log_2 9}\\left(2^x-1\\right)^{1/3}dx$ 的最大整数？</b>"
    },
    figureText: {
      en: "The curve y = log₂(x³ + 1) from x = 1 to 2. The area under it (yellow) and the area to its left between y = 1 and y = log₂9 (blue) fill a 2 × log₂9 rectangle minus a unit square.",
      fr: "La courbe y = log₂(x³ + 1) de x = 1 à 2. L’aire dessous (jaune) et l’aire à gauche entre y = 1 et y = log₂9 (bleu) remplissent un rectangle 2 × log₂9 moins un carré unité.",
      es: "La curva y = log₂(x³ + 1) de x = 1 a 2. El área debajo (amarillo) y el área a su izquierda entre y = 1 e y = log₂9 (azul) llenan un rectángulo 2 × log₂9 menos un cuadrado unidad.",
      ja: "x = 1 から 2 までの曲線 y = log₂(x³ + 1)。下の面積（黄）と y = 1〜log₂9 の左側の面積（青）で、2 × log₂9 の長方形から単位正方形を除いた形になる。",
      zh: "曲线 y = log₂(x³ + 1)，x 从 1 到 2。曲线下方面积（黄）与 y = 1 到 log₂9 之间曲线左侧面积（蓝）拼成 2 × log₂9 的矩形去掉一个单位正方形。"
    },
    hint: {
      en: "$y=(2^x-1)^{1/3}$ is the inverse of $y=\\log_2(x^3+1)$. Draw both areas on the same picture.",
      fr: "$y=(2^x-1)^{1/3}$ est la réciproque de $y=\\log_2(x^3+1)$. Dessinez les deux aires sur la même figure.",
      es: "$y=(2^x-1)^{1/3}$ es la inversa de $y=\\log_2(x^3+1)$. Dibuja las dos áreas en el mismo dibujo.",
      ja: "$y=(2^x-1)^{1/3}$ は $y=\\log_2(x^3+1)$ の逆関数。2つの面積を同じ図に描きます。",
      zh: "$y=(2^x-1)^{1/3}$ 是 $y=\\log_2(x^3+1)$ 的反函数。把两块面积画在同一张图上。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 4.2, scale: 64, pad: 18 });
      const T = F.T = axes(F, -0.3, 3.1, -0.3, 3.9);
      const f = x => Math.log2(x ** 3 + 1), L = Math.log2(9);
      const q = [T([1, 0])]; for (let k = 0; k <= 40; k++) { const x = 1 + k / 40; q.push(T([x, f(x)])); } q.push(T([2, 0]));
      F.path(q, 'fill-yellow', 'fills');
      const r = [T([0, 1])]; for (let k = 0; k <= 40; k++) { const x = 1 + k / 40; r.push(T([x, f(x)])); } r.push(T([0, L]));
      F.path(r, 'fill-blue', 'fills');
      plot(F, T, f, 0, 2.3, 'graph');
      F.seg(T([0, L]), T([2, L]), 'seg thin dashc'); F.seg(T([2, 0]), T([2, L]), 'seg thin dashc'); F.seg(T([1, 0]), T([1, 1]), 'seg thin dashc'); F.seg(T([0, 1]), T([1, 1]), 'seg thin dashc');
      F.text(T([0, L]), 'log₂9', 'tick', -22, 0); F.text(T([0, 1]), '1', 'tick', -10, 0);
      F.text(T([1, 0]), '1', 'tick', 0, 14); F.text(T([2, 0]), '2', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "5", correct: true, why: {
        en: "The sum is $2\\log_2 9-1\\approx5.34$.",
        fr: "The sum is $2\\log_2 9-1\\approx5.34$.",
        es: "The sum is $2\\log_2 9-1\\approx5.34$.",
        ja: "The sum is $2\\log_2 9-1\\approx5.34$.",
        zh: "The sum is $2\\log_2 9-1\\approx5.34$."
      } },
      { tex: "\\lfloor 2\\log_2 9-1\\rfloor", correct: true, why: {
        en: "The same integer, from the rectangle picture.",
        fr: "Le même entier, d’après la figure du rectangle.",
        es: "El mismo entero, según el dibujo del rectángulo.",
        ja: "長方形の図からの同じ整数。",
        zh: "由矩形图得到的同一个整数。"
      } },
      { tex: "2\\log_2 9-1", correct: false, why: {
        en: "That is the sum itself, not an integer.",
        fr: "C’est la somme elle-même, pas un entier.",
        es: "Es la suma misma, no un entero.",
        ja: "それは和そのもので整数ではない。",
        zh: "那是和本身，不是整数。"
      } },
      { tex: "6", correct: false, why: {
        en: "$2\\log_2 9-1<2\\cdot3.17-1<5.4$.",
        fr: "$2\\log_2 9-1<2\\cdot3.17-1<5.4$.",
        es: "$2\\log_2 9-1<2\\cdot3.17-1<5.4$.",
        ja: "$2\\log_2 9-1<2\\cdot3.17-1<5.4$.",
        zh: "$2\\log_2 9-1<2\\cdot3.17-1<5.4$."
      } },
      { tex: "4", correct: false, why: {
        en: "$\\log_2 9>3$, so $2\\log_2 9-1>5$.",
        fr: "$\\log_2 9>3$, so $2\\log_2 9-1>5$.",
        es: "$\\log_2 9>3$, so $2\\log_2 9-1>5$.",
        ja: "$\\log_2 9>3$, so $2\\log_2 9-1>5$.",
        zh: "$\\log_2 9>3$, so $2\\log_2 9-1>5$."
      } },
      { tex: "\\lfloor 2\\log_2 9\\rfloor", correct: false, why: {
        en: "Forgets to remove the unit square.",
        fr: "Oublie d’enlever le carré unité.",
        es: "Olvida quitar el cuadrado unidad.",
        ja: "単位正方形を引き忘れている。",
        zh: "忘了减去单位正方形。"
      } },
      { tex: "3", correct: false, why: {
        en: "Only about one of the two integrals.",
        fr: "À peu près une seule des deux intégrales.",
        es: "Más o menos una sola de las dos integrales.",
        ja: "2つの積分のうち1つ分くらい。",
        zh: "大约只是其中一个积分。"
      } },
      { tex: "\\lfloor\\log_2 9\\rfloor", correct: false, why: {
        en: "The height of the rectangle, not the area.",
        fr: "La hauteur du rectangle, pas l’aire.",
        es: "La altura del rectángulo, no el área.",
        ja: "長方形の高さで面積ではない。",
        zh: "那是矩形的高，不是面积。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Spot the inverse",
          fr: "Repérer la réciproque",
          es: "Ver la inversa",
          ja: "逆関数に気づく",
          zh: "看出反函数"
        },
        lines: ["y=\\log_2(x^3+1)\\iff x=(2^y-1)^{1/3},\\qquad f(1)=1,\\; f(2)=\\log_2 9"],
        note: {
          en: "So the second integral is the area between the same curve and the $y$-axis.",
          fr: "La seconde intégrale est donc l’aire entre la même courbe et l’axe des $y$.",
          es: "La segunda integral es el área entre la misma curva y el eje $y$.",
          ja: "2つ目の積分は同じ曲線と $y$ 軸の間の面積。",
          zh: "第二个积分就是同一曲线与 $y$ 轴之间的面积。"
        }
      },
      {
        title: {
          en: "Fit the areas together",
          fr: "Emboîter les aires",
          es: "Encajar las áreas",
          ja: "面積を合わせる",
          zh: "拼合面积"
        },
        lines: ["\\int_1^2 f+\\int_{f(1)}^{f(2)}f^{-1}=2\\,f(2)-1\\cdot f(1)=2\\log_2 9-1"],
        note: {
          en: "Big rectangle $[0,2]\\times[0,\\log_2 9]$ minus the square $[0,1]\\times[0,1]$.",
          fr: "Grand rectangle $[0,2]\\times[0,\\log_2 9]$ moins le carré $[0,1]\\times[0,1]$.",
          es: "Rectángulo $[0,2]\\times[0,\\log_2 9]$ menos el cuadrado $[0,1]\\times[0,1]$.",
          ja: "長方形 $[0,2]\\times[0,\\log_2 9]$ から正方形 $[0,1]\\times[0,1]$ を除く。",
          zh: "大矩形 $[0,2]\\times[0,\\log_2 9]$ 减去正方形 $[0,1]\\times[0,1]$。"
        }
      },
      {
        title: {
          en: "Estimate",
          fr: "Estimer",
          es: "Estimar",
          ja: "見積もる",
          zh: "估算"
        },
        lines: ["3<\\log_2 9<3.2\\;\\Rightarrow\\;5<2\\log_2 9-1<5.4\\;\\Rightarrow\\;\\boxed{5}"],
        note: {
          en: "$2^3=8<9<2^{3.2}\\approx9.19$.",
          fr: "$2^3=8<9<2^{3{,}2}\\approx9{,}19$.",
          es: "$2^3=8<9<2^{3{,}2}\\approx9{,}19$.",
          ja: "$2^3=8<9<2^{3.2}\\approx9.19$。",
          zh: "$2^3=8<9<2^{3.2}\\approx9.19$。"
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
