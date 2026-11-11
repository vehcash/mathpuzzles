/* calculus · The wedge under a tangent
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1E */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2020-tangent-wedge",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1E",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1E",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1E",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1E",
        zh: "牛津大学数学入学考试 MAT 2020 第 1E 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "The wedge under a tangent",
      fr: "Le coin sous une tangente",
      es: "La cuña bajo una tangente",
      ja: "接線の下のくさび",
      zh: "切线下的楔形"
    },
    statement: {
      en: "The tangent to $y=x^2$ at $(a,a^2)$, $a>0$, is drawn. <b>Which of the following equal the area bounded by the parabola, the tangent and the $x$-axis?</b>",
      fr: "On trace la tangente à $y=x^2$ en $(a,a^2)$, $a>0$. <b>Lesquelles des valeurs suivantes sont égales à l’aire délimitée par la parabole, la tangente et l’axe des $x$ ?</b>",
      es: "Se traza la tangente a $y=x^2$ en $(a,a^2)$, $a>0$. <b>¿Cuáles de los siguientes valores son iguales al área limitada por la parábola, la tangente y el eje $x$?</b>",
      ja: "$y=x^2$ の $(a,a^2)$（$a>0$）における接線を引きます。<b>放物線・接線・$x$ 軸で囲まれた面積に等しいものはどれですか？</b>",
      zh: "作 $y=x^2$ 在 $(a,a^2)$（$a>0$）处的切线。<b>由抛物线、切线和 $x$ 轴围成的面积等于下列哪些？</b>"
    },
    figureText: {
      en: "The parabola y = x², the tangent at (a, a²) hitting the x-axis at a/2, and the curved wedge between them shaded.",
      fr: "La parabole y = x², la tangente en (a, a²) qui coupe l’axe des x en a/2, et le coin courbe entre elles grisé.",
      es: "La parábola y = x², la tangente en (a, a²) que corta el eje x en a/2 y la cuña curva entre ellas sombreada.",
      ja: "放物線 y = x²、(a, a²) での接線（x 軸と a/2 で交わる）、間のくさび形に色付け。",
      zh: "抛物线 y = x²，(a, a²) 处切线交 x 轴于 a/2，二者之间的楔形涂色。"
    },
    hint: {
      en: "Area under the parabola from $0$ to $a$, minus the triangle under the tangent.",
      fr: "Aire sous la parabole de $0$ à $a$, moins le triangle sous la tangente.",
      es: "Área bajo la parábola de $0$ a $a$, menos el triángulo bajo la tangente.",
      ja: "0 から a までの放物線の下の面積から、接線の下の三角形を引く。",
      zh: "抛物线从 $0$ 到 $a$ 下方面积减去切线下的三角形。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.8, h: 3.6, scale: 64, pad: 18 });
      const T = F.T = axes(F, -0.4, 3.4, -0.3, 3.3);
      const a = 1.6, f = x => x * x;
      const q = [T([0, 0])]; for (let k = 0; k <= 40; k++) { const x = a * k / 40; q.push(T([x, f(x)])); } q.push(T([a / 2, 0]));
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, f, -0.3, 1.75, 'graph'); F.seg(T([a / 2 - 0.15, -0.3]), T([1.8, 2 * a * 1.8 - a * a]), 'seg');
      F.dot(T([a, a * a])); F.text(T([a, a * a]), '(a, a²)', 'len small', 30, 4); F.text(T([a / 2, 0]), 'a/2', 'tick', 14, 14);
      return F;
    },
    options: [
      { tex: "\\tfrac{a^3}{12}", correct: true, why: {
        en: "$\\tfrac{a^3}{3}-\\tfrac{a^3}{4}$.",
        fr: "$\\tfrac{a^3}{3}-\\tfrac{a^3}{4}$.",
        es: "$\\tfrac{a^3}{3}-\\tfrac{a^3}{4}$.",
        ja: "$\\tfrac{a^3}{3}-\\tfrac{a^3}{4}$.",
        zh: "$\\tfrac{a^3}{3}-\\tfrac{a^3}{4}$."
      } },
      { tex: "\\int_0^a x^2\\,dx-\\tfrac12\\cdot\\tfrac a2\\cdot a^2", correct: true, why: {
        en: "Parabola area minus the triangle.",
        fr: "Aire sous la parabole moins le triangle.",
        es: "Área de la parábola menos el triángulo.",
        ja: "放物線の面積から三角形を引く。",
        zh: "抛物线面积减三角形。"
      } },
      { tex: "\\tfrac{a^3}{3}", correct: false, why: {
        en: "Forgets to remove the triangle.",
        fr: "Oublie de retirer le triangle.",
        es: "Olvida quitar el triángulo.",
        ja: "三角形を引き忘れた。",
        zh: "忘了减三角形。"
      } },
      { tex: "\\tfrac{a^3}{4}", correct: false, why: {
        en: "That is the triangle itself.",
        fr: "C’est le triangle lui-même.",
        es: "Es el triángulo mismo.",
        ja: "三角形そのもの。",
        zh: "那是三角形本身。"
      } },
      { tex: "\\tfrac{a^3}{6}", correct: false, why: {
        en: "Uses the triangle from $0$ to $a$: tangent meets the axis at $\\tfrac a2$, not $0$.",
        fr: "Prend le triangle de $0$ à $a$ : la tangente coupe l’axe en $\\tfrac a2$.",
        es: "Usa el triángulo de $0$ a $a$: la tangente corta en $\\tfrac a2$.",
        ja: "三角形を 0 から a とした。接線は $\\tfrac a2$ で交わる。",
        zh: "把三角形当成从 0 到 a，切线交轴于 $\\tfrac a2$。"
      } },
      { tex: "\\tfrac{a^2}{12}", correct: false, why: {
        en: "Wrong power: area scales like $a^3$.",
        fr: "Mauvaise puissance : l’aire varie comme $a^3$.",
        es: "Potencia errónea: el área va como $a^3$.",
        ja: "べきが違う：面積は $a^3$ に比例。",
        zh: "次数错：面积与 $a^3$ 成正比。"
      } },
      { tex: "\\tfrac{a^3}{24}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{a^4}{12}", correct: false, why: {
        en: "Wrong power.",
        fr: "Mauvaise puissance.",
        es: "Potencia errónea.",
        ja: "べきが違う。",
        zh: "次数错。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The tangent",
          fr: "La tangente",
          es: "La tangente",
          ja: "接線",
          zh: "切线"
        },
        lines: ["y=2ax-a^2,\\qquad y=0\\iff x=\\tfrac a2"],
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
          ja: "引き算",
          zh: "相减"
        },
        lines: ["\\int_0^a x^2dx-\\tfrac12\\cdot\\tfrac a2\\cdot a^2=\\tfrac{a^3}{3}-\\tfrac{a^3}{4}=\\boxed{\\tfrac{a^3}{12}}"],
        note: {
          en: "The triangle has base $a-\\tfrac a2$ and height $a^2$.",
          fr: "Le triangle a pour base $a-\\tfrac a2$ et hauteur $a^2$.",
          es: "El triángulo tiene base $a-\\tfrac a2$ y altura $a^2$.",
          ja: "三角形の底辺 $a-\\tfrac a2$、高さ $a^2$。",
          zh: "三角形底 $a-\\tfrac a2$，高 $a^2$。"
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
