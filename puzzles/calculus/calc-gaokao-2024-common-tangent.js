/* calculus · One line, two curves
   Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-common-tangent",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标Ⅰ卷), Question 13",
        fr: "Gaokao 2024, épreuve nationale I (新课标Ⅰ卷), question 13",
        es: "Gaokao 2024, examen nacional I (新课标Ⅰ卷), pregunta 13",
        ja: "2024年 中国・高考 新課程標準Ⅰ卷 第13問",
        zh: "2024年高考数学新课标Ⅰ卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "One line, two curves",
      fr: "Une droite, deux courbes",
      es: "Una recta, dos curvas",
      ja: "1本の直線と2つの曲線",
      zh: "一条直线，两条曲线"
    },
    statement: {
      en: "The tangent to $y=e^x+x$ at the point $(0,1)$ is also tangent to the curve $y=\\ln(x+1)+a$. <b>Which of the following equal $a$?</b>",
      fr: "La tangente à $y=e^x+x$ au point $(0,1)$ est aussi tangente à la courbe $y=\\ln(x+1)+a$. <b>Lesquelles des valeurs suivantes sont égales à $a$ ?</b>",
      es: "La tangente a $y=e^x+x$ en el punto $(0,1)$ también es tangente a la curva $y=\\ln(x+1)+a$. <b>¿Cuáles de los siguientes valores son iguales a $a$?</b>",
      ja: "曲線 $y=e^x+x$ の点 $(0,1)$ における接線が、曲線 $y=\\ln(x+1)+a$ にも接します。<b>$a$ に等しいものはどれですか？</b>",
      zh: "曲线 $y=e^x+x$ 在点 $(0,1)$ 处的切线也是曲线 $y=\\ln(x+1)+a$ 的切线。<b>下列哪些等于 $a$？</b>"
    },
    figureText: {
      en: "The curve y = eˣ + x, the line y = 2x + 1 touching it at (0, 1), and the curve y = ln(x + 1) + a touching the same line at (−1/2, 0).",
      fr: "La courbe y = eˣ + x, la droite y = 2x + 1 qui la touche en (0, 1), et la courbe y = ln(x + 1) + a qui touche la même droite en (−1/2, 0).",
      es: "La curva y = eˣ + x, la recta y = 2x + 1 que la toca en (0, 1) y la curva y = ln(x + 1) + a que toca la misma recta en (−1/2, 0).",
      ja: "曲線 y = eˣ + x、(0, 1) で接する直線 y = 2x + 1、同じ直線に (−1/2, 0) で接する曲線 y = ln(x + 1) + a。",
      zh: "曲线 y = eˣ + x，在 (0, 1) 处与之相切的直线 y = 2x + 1，以及在 (−1/2, 0) 处与同一直线相切的曲线 y = ln(x + 1) + a。"
    },
    hint: {
      en: "Find the line first, then the point of the second curve where the slope is the same.",
      fr: "Trouvez d’abord la droite, puis le point de la seconde courbe où la pente est la même.",
      es: "Halla primero la recta y luego el punto de la segunda curva con la misma pendiente.",
      ja: "まず直線を求め、次に2つ目の曲線で傾きが同じ点を探します。",
      zh: "先求切线，再找第二条曲线上斜率相同的点。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.9, scale: 60, pad: 16 });
      const T = axes(F, -1.2, 3.0, -1.4, 2.5, { grid: true });
      plot(F, T, x => Math.exp(x) + x, -1.2, 0.68, 'graph', 'base', -1.4, 2.5);
      const l = plot(F, T, x => 2 * x + 1, -1.2, 0.75, 'graph', 'base', -1.4, 2.5); l.style.stroke = '#3b8fbb';
      const g = plot(F, T, x => Math.log(x + 1) + Math.log(2), -0.93, 3.0, 'graph', 'base', -1.4, 2.5); g.style.stroke = '#3e9a5e';
      F.dot(T([0, 1])); F.dot(T([-0.5, 0]));
      F.text(T([0, 1]), '(0, 1)', 'len small', -32, -6); F.text(T([-0.5, 0]), '(−½, 0)', 'len small', 36, 14);
      return F;
    },
    options: [
      { tex: "\\ln 2", correct: true, why: {
        en: "The tangency point is $(-\\tfrac12, 0)$, so $\\ln\\tfrac12 + a = 0$.",
        fr: "Le point de contact est $(-\\tfrac12, 0)$, donc $\\ln\\tfrac12 + a = 0$.",
        es: "El punto de tangencia es $(-\\tfrac12, 0)$, así que $\\ln\\tfrac12 + a = 0$.",
        ja: "接点は $(-\\tfrac12, 0)$ なので $\\ln\\tfrac12 + a = 0$。",
        zh: "切点为 $(-\\tfrac12, 0)$，所以 $\\ln\\tfrac12 + a = 0$。"
      } },
      { tex: "-\\ln\\tfrac12", correct: true, why: {
        en: "Equal to $\\ln 2$.",
        fr: "Égal à $\\ln 2$.",
        es: "Igual a $\\ln 2$.",
        ja: "$\\ln 2$ に等しい。",
        zh: "等于 $\\ln 2$。"
      } },
      { tex: "-\\ln 2", correct: false, why: {
        en: "Sign slip in $a=-\\ln\\tfrac12$.",
        fr: "Erreur de signe dans $a=-\\ln\\tfrac12$.",
        es: "Error de signo en $a=-\\ln\\tfrac12$.",
        ja: "$a=-\\ln\\tfrac12$ の符号ミス。",
        zh: "$a=-\\ln\\tfrac12$ 的符号错误。"
      } },
      { tex: "0", correct: false, why: {
        en: "Then $y=\\ln(x+1)$ has slope $2$ at $(-\\tfrac12,-\\ln2)$, which is below the line.",
        fr: "Alors $y=\\ln(x+1)$ a pour pente $2$ en $(-\\tfrac12,-\\ln2)$, sous la droite.",
        es: "Entonces $y=\\ln(x+1)$ tiene pendiente $2$ en $(-\\tfrac12,-\\ln2)$, por debajo de la recta.",
        ja: "$y=\\ln(x+1)$ の傾き $2$ の点 $(-\\tfrac12,-\\ln2)$ は直線より下。",
        zh: "此时 $y=\\ln(x+1)$ 在斜率为 $2$ 的点 $(-\\tfrac12,-\\ln2)$ 位于直线下方。"
      } },
      { tex: "1", correct: false, why: {
        en: "That would match the point $(0,1)$ of the first curve, but the slopes differ there.",
        fr: "Cela correspond au point $(0,1)$ de la première courbe, mais les pentes y diffèrent.",
        es: "Coincidiría en el punto $(0,1)$ de la primera curva, pero ahí las pendientes son distintas.",
        ja: "1つ目の曲線の点 $(0,1)$ を通るが、そこで傾きが違う。",
        zh: "这会经过第一条曲线的点 $(0,1)$，但那里斜率不同。"
      } },
      { tex: "2", correct: false, why: {
        en: "$2$ is the slope of the line, not the shift $a$.",
        fr: "$2$ est la pente de la droite, pas le décalage $a$.",
        es: "$2$ es la pendiente de la recta, no el desplazamiento $a$.",
        ja: "$2$ は直線の傾きで、$a$ ではない。",
        zh: "$2$ 是直线的斜率，不是平移量 $a$。"
      } },
      { tex: "\\ln 3", correct: false, why: {
        en: "Using $x=2$ (where $\\ln(x+1)$ would be $\\ln 3$) has slope $\\tfrac13$, not $2$.",
        fr: "En $x=2$, la pente de $\\ln(x+1)$ vaut $\\tfrac13$, pas $2$.",
        es: "En $x=2$, la pendiente de $\\ln(x+1)$ es $\\tfrac13$, no $2$.",
        ja: "$x=2$ では $\\ln(x+1)$ の傾きは $\\tfrac13$ で $2$ ではない。",
        zh: "在 $x=2$ 处 $\\ln(x+1)$ 的斜率是 $\\tfrac13$，不是 $2$。"
      } },
      { tex: "e", correct: false, why: {
        en: "No $e$ survives: $e^0 = 1$ is used only for the slope.",
        fr: "Aucun $e$ ne reste : $e^0 = 1$ ne sert que pour la pente.",
        es: "No queda ninguna $e$: $e^0 = 1$ solo sirve para la pendiente.",
        ja: "$e$ は残らない：$e^0 = 1$ は傾きに使うだけ。",
        zh: "不会剩下 $e$：$e^0 = 1$ 只用于斜率。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The tangent line",
          fr: "La tangente",
          es: "La recta tangente",
          ja: "接線",
          zh: "切线"
        },
        lines: ["y'=e^x+1,\\quad y'(0)=2 \\;\\Rightarrow\\; \\ell:\\; y=2x+1"],
        note: {
          en: "Slope $2$ through $(0,1)$.",
          fr: "Pente $2$ passant par $(0,1)$.",
          es: "Pendiente $2$ por $(0,1)$.",
          ja: "$(0,1)$ を通る傾き $2$ の直線。",
          zh: "过 $(0,1)$、斜率为 $2$。"
        }
      },
      {
        title: {
          en: "Match slope and height",
          fr: "Égaler pente et hauteur",
          es: "Igualar pendiente y altura",
          ja: "傾きと高さを合わせる",
          zh: "斜率与函数值都相等"
        },
        lines: ["\\big(\\ln(x+1)+a\\big)'=\\tfrac{1}{x+1}=2 \\;\\Rightarrow\\; x=-\\tfrac12", "\\ln\\tfrac12+a = 2\\cdot\\left(-\\tfrac12\\right)+1 = 0 \\;\\Rightarrow\\; \\boxed{a=\\ln 2}"],
        note: {
          en: "Tangency needs both the same slope and the same point.",
          fr: "Être tangent demande la même pente et le même point.",
          es: "La tangencia exige la misma pendiente y el mismo punto.",
          ja: "接するには傾きも点も一致する必要がある。",
          zh: "相切需要斜率相同且过同一点。"
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
