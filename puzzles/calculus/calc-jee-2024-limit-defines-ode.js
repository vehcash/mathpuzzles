/* calculus · A limit that hides a differential equation
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-limit-defines-ode",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.1",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.1",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.1",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.1",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.1"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A limit that hides a differential equation",
      fr: "Une limite qui cache une équation différentielle",
      es: "Un límite que esconde una ecuación diferencial",
      ja: "微分方程式を隠した極限",
      zh: "藏着微分方程的极限"
    },
    statement: {
      en: "$f$ is continuously differentiable on $(0,\\infty)$, $f(1)=2$, and $\\displaystyle\\lim_{t\\to x}\\frac{t^{10}f(x)-x^{10}f(t)}{t^9-x^9}=1$ for every $x>0$. <b>Which of the following equal $f(x)$?</b>",
      fr: "$f$ est de classe $C^1$ sur $(0,\\infty)$, $f(1)=2$ et $\\displaystyle\\lim_{t\\to x}\\frac{t^{10}f(x)-x^{10}f(t)}{t^9-x^9}=1$ pour tout $x>0$. <b>Lesquelles des expressions suivantes sont égales à $f(x)$ ?</b>",
      es: "$f$ es de clase $C^1$ en $(0,\\infty)$, $f(1)=2$ y $\\displaystyle\\lim_{t\\to x}\\frac{t^{10}f(x)-x^{10}f(t)}{t^9-x^9}=1$ para todo $x>0$. <b>¿Cuáles de las siguientes expresiones son iguales a $f(x)$?</b>",
      ja: "$f$ は $(0,\\infty)$ で連続微分可能、$f(1)=2$ で、すべての $x>0$ について $\\displaystyle\\lim_{t\\to x}\\frac{t^{10}f(x)-x^{10}f(t)}{t^9-x^9}=1$ です。<b>$f(x)$ に等しいものはどれですか？</b>",
      zh: "$f$ 在 $(0,\\infty)$ 上连续可导，$f(1)=2$，且对任意 $x>0$ 有 $\\displaystyle\\lim_{t\\to x}\\frac{t^{10}f(x)-x^{10}f(t)}{t^9-x^9}=1$。<b>下列哪些等于 $f(x)$？</b>"
    },
    figureText: {
      en: "Axes with the point (1, 2) that the solution curve must pass through.",
      fr: "Des axes avec le point (1, 2) par lequel passe la solution.",
      es: "Ejes con el punto (1, 2) por el que debe pasar la solución.",
      ja: "解曲線が通る点 (1, 2) を示した座標軸。",
      zh: "坐标轴，标出解曲线必经的点 (1, 2)。"
    },
    hint: {
      en: "The limit is $0/0$ in $t$: apply L’Hôpital with respect to $t$, then solve a linear ODE.",
      fr: "La limite est de forme $0/0$ en $t$ : appliquez L’Hôpital en $t$, puis résolvez une équation linéaire.",
      es: "El límite es $0/0$ en $t$: aplica L’Hôpital respecto a $t$ y resuelve una EDO lineal.",
      ja: "$t$ について $0/0$ 型。$t$ でロピタルし、線形微分方程式を解く。",
      zh: "关于 $t$ 为 $0/0$ 型：对 $t$ 用洛必达，再解一阶线性方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 4.4, scale: 56, pad: 16 });
      const T = F.T = axes(F, -0.3, 3.3, -0.4, 4.0);
      F.dot(T([1, 2])); F.text(T([1, 2]), '(1, 2)', 'len small', 26, 10);
      F.reveal = () => {
      plot(F, T, x => 9 / (11 * x) + 13 / 11 * x ** 10, 0.25, 1.12, 'graph', 'base', -0.4, 4.0);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{9}{11x}+\\tfrac{13}{11}x^{10}", correct: true, why: {
        en: "$f=\\tfrac9{11x}+Cx^{10}$ and $f(1)=2$ gives $C=\\tfrac{13}{11}$.",
        fr: "$f=\\tfrac9{11x}+Cx^{10}$ et $f(1)=2$ donne $C=\\tfrac{13}{11}$.",
        es: "$f=\\tfrac9{11x}+Cx^{10}$ y $f(1)=2$ da $C=\\tfrac{13}{11}$.",
        ja: "$f=\\tfrac9{11x}+Cx^{10}$、$f(1)=2$ より $C=\\tfrac{13}{11}$。",
        zh: "$f=\\tfrac9{11x}+Cx^{10}$，由 $f(1)=2$ 得 $C=\\tfrac{13}{11}$。"
      } },
      { tex: "\\tfrac{9+13x^{11}}{11x}", correct: true, why: {
        en: "The same function over a common denominator.",
        fr: "La même fonction sur un dénominateur commun.",
        es: "La misma función con denominador común.",
        ja: "通分した同じ関数。",
        zh: "通分后的同一函数。"
      } },
      { tex: "\\tfrac{31}{11x}-\\tfrac{9}{11}x^{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\tfrac{9}{11x}+\\tfrac{31}{11}x^{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{13}{11x}+\\tfrac{9}{11}x^{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac1x+x^{10}", correct: false, why: {
        en: "$f(1)=2$ holds, but $10xf-x^2f'=9$ fails: it gives $11$.",
        fr: "$f(1)=2$ est vrai, mais $10xf-x^2f'$ vaut $11$, pas $9$.",
        es: "$f(1)=2$ se cumple, pero $10xf-x^2f'$ da $11$, no $9$.",
        ja: "$f(1)=2$ は満たすが $10xf-x^2f'=11$ で $9$ にならない。",
        zh: "满足 $f(1)=2$，但 $10xf-x^2f'=11\\ne9$。"
      } },
      { tex: "2x^{10}", correct: false, why: {
        en: "That solves the homogeneous equation only.",
        fr: "Cela ne résout que l’équation homogène.",
        es: "Solo resuelve la ecuación homogénea.",
        ja: "同次方程式の解にすぎない。",
        zh: "只是齐次方程的解。"
      } },
      { tex: "\\tfrac{2}{x}", correct: false, why: {
        en: "Then $10xf-x^2f'=20+2=22\\ne9$.",
        fr: "Alors $10xf-x^2f'=22\\ne9$.",
        es: "Entonces $10xf-x^2f'=22\\ne9$.",
        ja: "$10xf-x^2f'=22\\ne9$。",
        zh: "此时 $10xf-x^2f'=22\\ne9$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "L’Hôpital in t",
          fr: "L’Hôpital en t",
          es: "L’Hôpital en t",
          ja: "t でロピタル",
          zh: "对 t 用洛必达"
        },
        lines: ["\\lim_{t\\to x}\\frac{10t^9f(x)-x^{10}f'(t)}{9t^8}=\\frac{10x^9f-x^{10}f'}{9x^8}=1\\ \\Rightarrow\\ 10xf-x^2f'=9"],
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
          en: "Solve the linear ODE",
          fr: "Résoudre l’EDO linéaire",
          es: "Resolver la EDO lineal",
          ja: "線形微分方程式を解く",
          zh: "解线性方程"
        },
        lines: ["\\bigl(x^{-10}f\\bigr)'=x^{-10}\\Bigl(f'-\\tfrac{10}xf\\Bigr)=-\\frac{9}{x^{12}}\\ \\Rightarrow\\ x^{-10}f=\\frac{9}{11x^{11}}+C"],
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
          en: "Use f(1) = 2",
          fr: "Utiliser f(1) = 2",
          es: "Usar f(1) = 2",
          ja: "f(1) = 2 を使う",
          zh: "用 f(1) = 2"
        },
        lines: ["\\tfrac9{11}+C=2\\Rightarrow C=\\tfrac{13}{11}:\\quad f(x)=\\boxed{\\tfrac{9}{11x}+\\tfrac{13}{11}x^{10}}"],
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
          en: "Two options are the same function.",
          fr: "Deux options sont la même fonction.",
          es: "Dos opciones son la misma función.",
          ja: "2つの選択肢は同じ関数。",
          zh: "有两个选项是同一个函数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
