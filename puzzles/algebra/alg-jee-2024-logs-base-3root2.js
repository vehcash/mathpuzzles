/* algebra · Two equations with unusual log bases
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2024-logs-base-3root2",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.8",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.8",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.8",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.8",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.8"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Two equations with unusual log bases",
      fr: "Deux équations aux bases logarithmiques inhabituelles",
      es: "Dos ecuaciones con bases logarítmicas raras",
      ja: "珍しい底の対数の連立方程式",
      zh: "底数特别的对数方程组"
    },
    statement: {
      en: "$a=3\\sqrt2$ and $b=\\dfrac1{5^{1/6}\\sqrt6}$. Real $x,y$ satisfy $3x+2y=\\log_a 18^{5/4}$ and $2x-y=\\log_b\\sqrt{1080}$. <b>Which of the following equal $4x+5y$?</b>",
      fr: "$a=3\\sqrt2$ et $b=\\dfrac1{5^{1/6}\\sqrt6}$. Les réels $x,y$ vérifient $3x+2y=\\log_a 18^{5/4}$ et $2x-y=\\log_b\\sqrt{1080}$. <b>Lesquelles des valeurs suivantes sont égales à $4x+5y$ ?</b>",
      es: "$a=3\\sqrt2$ y $b=\\dfrac1{5^{1/6}\\sqrt6}$. Los reales $x,y$ cumplen $3x+2y=\\log_a 18^{5/4}$ y $2x-y=\\log_b\\sqrt{1080}$. <b>¿Cuáles de los siguientes valores son iguales a $4x+5y$?</b>",
      ja: "$a=3\\sqrt2$、$b=\\dfrac1{5^{1/6}\\sqrt6}$ とし、実数 $x,y$ が $3x+2y=\\log_a 18^{5/4}$、$2x-y=\\log_b\\sqrt{1080}$ を満たします。<b>$4x+5y$ に等しいものはどれですか？</b>",
      zh: "设 $a=3\\sqrt2$，$b=\\dfrac1{5^{1/6}\\sqrt6}$，实数 $x,y$ 满足 $3x+2y=\\log_a 18^{5/4}$，$2x-y=\\log_b\\sqrt{1080}$。<b>下列哪些等于 $4x+5y$？</b>"
    },
    figureText: {
      en: "Two lines in the xy-plane, 3x + 2y = c₁ and 2x − y = c₂, crossing at the solution.",
      fr: "Deux droites 3x + 2y = c₁ et 2x − y = c₂ qui se coupent en la solution.",
      es: "Dos rectas 3x + 2y = c₁ y 2x − y = c₂ que se cortan en la solución.",
      ja: "2直線 3x + 2y = c₁、2x − y = c₂ の交点が解。",
      zh: "两直线 3x + 2y = c₁、2x − y = c₂ 的交点即解。"
    },
    hint: {
      en: "$a^2=18$ and $b^{-6}=5\\cdot216=1080$.",
      fr: "$a^2=18$ et $b^{-6}=5\\cdot216=1080$.",
      es: "$a^2=18$ y $b^{-6}=5\\cdot216=1080$.",
      ja: "$a^2=18$、$b^{-6}=5\\cdot216=1080$。",
      zh: "$a^2=18$，$b^{-6}=5\\cdot216=1080$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 52, pad: 16 });
      const T = F.T = axes(F, -2.4, 2.0, -1.4, 3.0);
      F.seg(T([-1.1, (2.5 + 3.3) / 2]), T([1.7, (2.5 - 5.1) / 2]), 'graph'); F.seg(T([-2.2, -1.4]), T([0.0, 3.0]), 'hl blue');
      F.reveal = () => {
      F.dot(T([-0.5, 2])); F.text(T([-0.5, 2]), '(−½, 2)', 'len small', 36, -4);
      };
      return F;
    },
    options: [
      { tex: "8", correct: true, why: {
        en: "$x=-\\tfrac12$, $y=2$.",
        fr: "$x=-\\tfrac12$, $y=2$.",
        es: "$x=-\\tfrac12$, $y=2$.",
        ja: "$x=-\\tfrac12$、$y=2$。",
        zh: "$x=-\\tfrac12$，$y=2$。"
      } },
      { tex: "2^3", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-8", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "10", correct: false, why: {
        en: "That forgets the $4x=-2$ part.",
        fr: "Cela oublie la partie $4x=-2$.",
        es: "Olvida la parte $4x=-2$.",
        ja: "$4x=-2$ を忘れている。",
        zh: "漏了 $4x=-2$。"
      } },
      { tex: "\\tfrac52", correct: false, why: {
        en: "That is $\\log_a18^{5/4}$, the right side of the first equation.",
        fr: "C’est $\\log_a18^{5/4}$, le second membre de la première équation.",
        es: "Es $\\log_a18^{5/4}$, el lado derecho de la primera ecuación.",
        ja: "1式目の右辺 $\\log_a18^{5/4}$。",
        zh: "那是第一个方程右边 $\\log_a18^{5/4}$。"
      } },
      { tex: "-3", correct: false, why: {
        en: "That is $\\log_b\\sqrt{1080}$.",
        fr: "C’est $\\log_b\\sqrt{1080}$.",
        es: "Es $\\log_b\\sqrt{1080}$.",
        ja: "$\\log_b\\sqrt{1080}$。",
        zh: "那是 $\\log_b\\sqrt{1080}$。"
      } },
      { tex: "6", correct: false, why: {
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
          en: "First log",
          fr: "Premier log",
          es: "Primer log",
          ja: "1つ目の対数",
          zh: "第一个对数"
        },
        lines: ["a^2=18\\ \\Rightarrow\\ \\log_a18^{5/4}=\\tfrac54\\cdot2=\\tfrac52"],
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
          en: "Second log",
          fr: "Second log",
          es: "Segundo log",
          ja: "2つ目の対数",
          zh: "第二个对数"
        },
        lines: ["b^{-6}=5\\cdot6^3=1080\\ \\Rightarrow\\ \\sqrt{1080}=b^{-3},\\ \\log_b\\sqrt{1080}=-3"],
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
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["3x+2y=\\tfrac52,\\ 2x-y=-3\\ \\Rightarrow\\ x=-\\tfrac12,\\ y=2,\\quad4x+5y=\\boxed{8}"],
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
