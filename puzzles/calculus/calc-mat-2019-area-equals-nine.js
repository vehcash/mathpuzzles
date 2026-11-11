/* calculus · Two parabolas enclosing area 9
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1D */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2019-area-equals-nine",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1D",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1D",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1D",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1D",
        zh: "牛津大学数学入学考试 MAT 2019 第 1D 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Two parabolas enclosing area 9",
      fr: "Deux paraboles enfermant une aire 9",
      es: "Dos parábolas que encierran área 9",
      ja: "面積9を囲む2つの放物線",
      zh: "围成面积 9 的两条抛物线"
    },
    statement: {
      en: "<b>For which of the following values of $a$ is the area between $y=x^2+2ax+a$ and $y=a-x^2$ equal to $9$?</b>",
      fr: "<b>Pour lesquelles des valeurs suivantes de $a$ l’aire entre $y=x^2+2ax+a$ et $y=a-x^2$ vaut-elle $9$ ?</b>",
      es: "<b>¿Para cuáles de los siguientes valores de $a$ el área entre $y=x^2+2ax+a$ e $y=a-x^2$ es igual a $9$?</b>",
      ja: "<b>$y=x^2+2ax+a$ と $y=a-x^2$ の間の面積が $9$ になる $a$ はどれですか？</b>",
      zh: "<b>当 $a$ 取下列哪些值时，$y=x^2+2ax+a$ 与 $y=a-x^2$ 之间的面积为 $9$？</b>"
    },
    figureText: {
      en: "For a = 3: the upward parabola x² + 6x + 3 and the downward parabola 3 − x² meet at x = −3 and x = 0, with the lens between them shaded.",
      fr: "Pour a = 3 : la parabole x² + 6x + 3 et la parabole 3 − x² se coupent en x = −3 et x = 0 ; la lentille entre elles est grisée.",
      es: "Para a = 3: la parábola x² + 6x + 3 y la parábola 3 − x² se cortan en x = −3 y x = 0; la lente entre ellas está sombreada.",
      ja: "a = 3 のとき、x² + 6x + 3 と 3 − x² は x = −3 と x = 0 で交わり、間に色付け。",
      zh: "a = 3 时，x² + 6x + 3 与 3 − x² 交于 x = −3 和 x = 0，二者之间涂色。"
    },
    hint: {
      en: "Subtract: the difference is $-2x^2-2ax$, which vanishes at $x=0$ and $x=-a$.",
      fr: "Soustrayez : la différence vaut $-2x^2-2ax$, nulle en $x=0$ et $x=-a$.",
      es: "Resta: la diferencia es $-2x^2-2ax$, que se anula en $x=0$ y $x=-a$.",
      ja: "差は $-2x^2-2ax$ で、$x=0$ と $x=-a$ で 0。",
      zh: "相减得 $-2x^2-2ax$，在 $x=0$ 与 $x=-a$ 处为零。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 4.4, scale: 40, pad: 18 });
      const T = F.T = axes(F, -4.6, 0.6, -2.0, 2.4);
      const a = 3, g = x => (a - x * x) / 3, h = x => (x * x + 2 * a * x + a) / 3;
      const q = []; for (let k = 0; k <= 40; k++) { const x = -3 + 3 * k / 40; q.push(T([x, g(x)])); } for (let k = 40; k >= 0; k--) { const x = -3 + 3 * k / 40; q.push(T([x, h(x)])); }
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, g, -3.6, 0.55, 'graph', 'base', -2.0, 2.4); plot(F, T, h, -4.4, 0.4, 'graph', 'base', -2.0, 2.4);
      F.text(T([-3, 0]), '−3', 'tick', -10, 14);
      return F;
    },
    options: [
      { tex: "a=3", correct: true, why: {
        en: "Area $=\\tfrac{|a|^3}{3}=9$.",
        fr: "Area $=\\tfrac{|a|^3}{3}=9$.",
        es: "Area $=\\tfrac{|a|^3}{3}=9$.",
        ja: "Area $=\\tfrac{|a|^3}{3}=9$.",
        zh: "Area $=\\tfrac{|a|^3}{3}=9$."
      } },
      { tex: "a=-3", correct: true, why: {
        en: "The area depends only on $|a|$.",
        fr: "L’aire ne dépend que de $|a|$.",
        es: "El área solo depende de $|a|$.",
        ja: "面積は $|a|$ だけで決まる。",
        zh: "面积只与 $|a|$ 有关。"
      } },
      { tex: "a=9", correct: false, why: {
        en: "$\\tfrac{729}{3}=243$.",
        fr: "$\\tfrac{729}{3}=243$.",
        es: "$\\tfrac{729}{3}=243$.",
        ja: "$\\tfrac{729}{3}=243$.",
        zh: "$\\tfrac{729}{3}=243$."
      } },
      { tex: "a=\\sqrt3", correct: false, why: {
        en: "$\\tfrac{3\\sqrt3}{3}=\\sqrt3$.",
        fr: "$\\tfrac{3\\sqrt3}{3}=\\sqrt3$.",
        es: "$\\tfrac{3\\sqrt3}{3}=\\sqrt3$.",
        ja: "$\\tfrac{3\\sqrt3}{3}=\\sqrt3$.",
        zh: "$\\tfrac{3\\sqrt3}{3}=\\sqrt3$."
      } },
      { tex: "a=\\sqrt[3]{9}", correct: false, why: {
        en: "Forgets the $\\tfrac13$: $|a|^3=9$.",
        fr: "Oublie le $\\tfrac13$ : $|a|^3=9$.",
        es: "Olvida el $\\tfrac13$: $|a|^3=9$.",
        ja: "$\\tfrac13$ を忘れた：$|a|^3=9$。",
        zh: "漏了 $\\tfrac13$：$|a|^3=9$。"
      } },
      { tex: "a=\\tfrac32", correct: false, why: {
        en: "$\\tfrac{27/8}{3}=\\tfrac98$.",
        fr: "$\\tfrac{27/8}{3}=\\tfrac98$.",
        es: "$\\tfrac{27/8}{3}=\\tfrac98$.",
        ja: "$\\tfrac{27/8}{3}=\\tfrac98$.",
        zh: "$\\tfrac{27/8}{3}=\\tfrac98$."
      } },
      { tex: "a=0", correct: false, why: {
        en: "The curves then meet only at the origin: area $0$.",
        fr: "Les courbes ne se coupent qu’à l’origine : aire $0$.",
        es: "Las curvas solo se cortan en el origen: área $0$.",
        ja: "曲線は原点だけで交わり面積 0。",
        zh: "两曲线只交于原点，面积 $0$。"
      } },
      { tex: "a=\\sqrt[3]{54}", correct: false, why: {
        en: "Uses $\\tfrac{|a|^3}{6}$, the formula for $y=x^2$ cut by a line.",
        fr: "Utilise $\\tfrac{|a|^3}{6}$, la formule pour une parabole coupée par une droite.",
        es: "Usa $\\tfrac{|a|^3}{6}$, la fórmula de una parábola cortada por una recta.",
        ja: "$\\tfrac{|a|^3}{6}$（放物線と直線の公式）を使った。",
        zh: "用了 $\\tfrac{|a|^3}{6}$（抛物线与直线的公式）。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Difference of the curves",
          fr: "Différence des courbes",
          es: "Diferencia de las curvas",
          ja: "2曲線の差",
          zh: "两曲线之差"
        },
        lines: ["(a-x^2)-(x^2+2ax+a)=-2x(x+a)"],
        note: {
          en: "Zero at $x=0$ and $x=-a$; between them it has one sign.",
          fr: "Nulle en $x=0$ et $x=-a$ ; de signe constant entre les deux.",
          es: "Nula en $x=0$ y $x=-a$; de signo constante entre ellos.",
          ja: "$x=0$, $x=-a$ で 0、その間で符号一定。",
          zh: "在 $x=0$ 与 $x=-a$ 处为零，中间符号不变。"
        }
      },
      {
        title: {
          en: "Integrate",
          fr: "Intégrer",
          es: "Integrar",
          ja: "積分",
          zh: "积分"
        },
        lines: ["\\left|\\int_{-a}^{0}-2x(x+a)\\,dx\\right|=\\frac{|a|^3}{3}"],
        note: {
          en: "The $\\tfrac{|k|^3}{6}$ rule with leading coefficient $2$.",
          fr: "La règle $\\tfrac{|k|^3}{6}$ avec un coefficient dominant $2$.",
          es: "La regla $\\tfrac{|k|^3}{6}$ con coeficiente principal $2$.",
          ja: "最高次係数 2 の $\\tfrac{|k|^3}{6}$ 公式。",
          zh: "首项系数为 2 的 $\\tfrac{|k|^3}{6}$ 公式。"
        }
      },
      {
        title: {
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["\\frac{|a|^3}{3}=9\\iff|a|=3\\iff a=\\pm3"],
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
          en: "Both signs of a work.",
          fr: "Les deux signes de a conviennent.",
          es: "Sirven los dos signos de a.",
          ja: "a は正負どちらでもよい。",
          zh: "a 正负都可以。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
