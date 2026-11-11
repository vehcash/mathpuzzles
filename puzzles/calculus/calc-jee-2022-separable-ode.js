/* calculus · A separable differential equation
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2022-separable-ode",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.2",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.2",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.2",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.2",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.2"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A separable differential equation",
      fr: "Une équation différentielle à variables séparables",
      es: "Una ecuación diferencial separable",
      ja: "変数分離形の微分方程式",
      zh: "可分离变量的微分方程"
    },
    statement: {
      en: "$y(x)$ solves $x\\,dy-(y^2-4y)\\,dx=0$ for $x>0$ with $y(1)=2$, and the slope of the curve is never zero. <b>Which of the following equal $10\\,y(\\sqrt2)$?</b>",
      fr: "$y(x)$ vérifie $x\\,dy-(y^2-4y)\\,dx=0$ pour $x>0$ avec $y(1)=2$, et la pente de la courbe n’est jamais nulle. <b>Lesquelles des valeurs suivantes sont égales à $10\\,y(\\sqrt2)$ ?</b>",
      es: "$y(x)$ cumple $x\\,dy-(y^2-4y)\\,dx=0$ para $x>0$ con $y(1)=2$, y la pendiente de la curva nunca es cero. <b>¿Cuáles de los siguientes valores son iguales a $10\\,y(\\sqrt2)$?</b>",
      ja: "$y(x)$ は $x>0$ で $x\\,dy-(y^2-4y)\\,dx=0$、$y(1)=2$ を満たし、曲線の傾きは決して 0 になりません。<b>$10\\,y(\\sqrt2)$ に等しいものはどれですか？</b>",
      zh: "$y(x)$ 满足 $x\\,dy-(y^2-4y)\\,dx=0$（$x>0$），$y(1)=2$，且曲线斜率处处不为零。<b>下列哪些等于 $10\\,y(\\sqrt2)$？</b>"
    },
    figureText: {
      en: "The starting point (1, 2) and the vertical line x = √2. The solution curve is drawn in the solution.",
      fr: "Le point de départ (1, 2) et la droite verticale x = √2. La courbe solution est tracée dans la solution.",
      es: "El punto inicial (1, 2) y la recta vertical x = √2. La curva solución se dibuja en la solución.",
      ja: "初期点 (1, 2) と縦線 x = √2。解曲線は解答で描きます。",
      zh: "初始点 (1, 2) 与竖线 x = √2。解曲线在解答中画出。"
    },
    hint: {
      en: "Separate: $\\dfrac{dy}{y(y-4)}=\\dfrac{dx}{x}$, then use partial fractions.",
      fr: "Séparez : $\\dfrac{dy}{y(y-4)}=\\dfrac{dx}{x}$, puis décomposez en éléments simples.",
      es: "Separa: $\\dfrac{dy}{y(y-4)}=\\dfrac{dx}{x}$ y usa fracciones simples.",
      ja: "変数分離して $\\dfrac{dy}{y(y-4)}=\\dfrac{dx}{x}$、部分分数分解。",
      zh: "分离变量：$\\dfrac{dy}{y(y-4)}=\\dfrac{dx}{x}$，再拆成部分分式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.6, scale: 52, pad: 18 });
      const T = F.T = axes(F, -0.3, 4.1, -0.3, 4.3);
      const k = 1.6, y = x => 4 / (1 + (x / k) ** 4);
      F.dot(T([k, 2])); F.text(T([k, 2]), '(1, 2)', 'len small', -30, -6);
      const r = k * Math.SQRT2; F.seg(T([r, 0]), T([r, 3.0]), 'seg thin dashc'); F.text(T([r, 0]), '√2', 'tick', 0, 14);
      F.reveal = () => {
      plot(F, T, y, 0.05, 3.9, 'graph');
      F.seg(T([0, 4]), T([3.9, 4]), 'seg thin dashc'); F.text(T([0, 4]), '4', 'tick', -10, 0);
      F.dot(T([r, 0.8])); F.text(T([r, 0.8]), '4/5', 'len small', 20, -8);
      };
      return F;
    },
    options: [
      { tex: "8", correct: true, why: {
        en: "$y=\\dfrac{4}{1+x^4}$, so $y(\\sqrt2)=\\tfrac45$.",
        fr: "$y=\\dfrac{4}{1+x^4}$, so $y(\\sqrt2)=\\tfrac45$.",
        es: "$y=\\dfrac{4}{1+x^4}$, so $y(\\sqrt2)=\\tfrac45$.",
        ja: "$y=\\dfrac{4}{1+x^4}$, so $y(\\sqrt2)=\\tfrac45$.",
        zh: "$y=\\dfrac{4}{1+x^4}$, so $y(\\sqrt2)=\\tfrac45$."
      } },
      { tex: "10\\cdot\\tfrac{4}{1+4}", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "\\tfrac45", correct: false, why: {
        en: "That is $y(\\sqrt2)$; the question asks for $10\\,y(\\sqrt2)$.",
        fr: "C’est $y(\\sqrt2)$ ; on demande $10\\,y(\\sqrt2)$.",
        es: "Es $y(\\sqrt2)$; se pide $10\\,y(\\sqrt2)$.",
        ja: "それは $y(\\sqrt2)$。問われているのは $10\\,y(\\sqrt2)$。",
        zh: "那是 $y(\\sqrt2)$，题目问 $10\\,y(\\sqrt2)$。"
      } },
      { tex: "20", correct: false, why: {
        en: "Would need $y$ to stay at $2$; but it decreases.",
        fr: "Il faudrait que $y$ reste à $2$ ; or $y$ décroît.",
        es: "Requeriría que $y$ siguiera en $2$; pero decrece.",
        ja: "$y$ が $2$ のままでないといけないが減少する。",
        zh: "需要 $y$ 保持为 $2$，但它在减小。"
      } },
      { tex: "16", correct: false, why: {
        en: "From $y=\\tfrac{4x^4}{1+x^4}$, which solves the equation with the opposite sign.",
        fr: "Vient de $y=\\tfrac{4x^4}{1+x^4}$, solution de l’équation avec le signe opposé.",
        es: "Sale de $y=\\tfrac{4x^4}{1+x^4}$, solución de la ecuación con el signo contrario.",
        ja: "$y=\\tfrac{4x^4}{1+x^4}$ から。これは符号が逆の方程式の解。",
        zh: "来自 $y=\\tfrac{4x^4}{1+x^4}$，那是符号相反的方程的解。"
      } },
      { tex: "40", correct: false, why: {
        en: "$y=4$ is a constant solution, but it misses $y(1)=2$.",
        fr: "$y=4$ est une solution constante, mais pas avec $y(1)=2$.",
        es: "$y=4$ es una solución constante, pero no cumple $y(1)=2$.",
        ja: "$y=4$ は定数解だが $y(1)=2$ を満たさない。",
        zh: "$y=4$ 是常数解，但不满足 $y(1)=2$。"
      } },
      { tex: "\\tfrac{40}{3}", correct: false, why: {
        en: "Uses $x^2$ instead of $x^4$: $\\tfrac{4}{1+2}$.",
        fr: "Utilise $x^2$ au lieu de $x^4$ : $\\tfrac{4}{1+2}$.",
        es: "Usa $x^2$ en vez de $x^4$: $\\tfrac{4}{1+2}$.",
        ja: "$x^4$ でなく $x^2$ を使った：$\\tfrac{4}{1+2}$。",
        zh: "用了 $x^2$ 而不是 $x^4$：$\\tfrac{4}{1+2}$。"
      } },
      { tex: "5", correct: false, why: {
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
          en: "Separate and integrate",
          fr: "Séparer et intégrer",
          es: "Separar e integrar",
          ja: "分離して積分",
          zh: "分离并积分"
        },
        lines: ["\\frac{dy}{y(y-4)}=\\frac{dx}{x}\\;\\Rightarrow\\;\\frac14\\ln\\left|\\frac{y-4}{y}\\right|=\\ln x+C"],
        note: {
          en: "$\\dfrac{1}{y(y-4)}=\\dfrac14\\left(\\dfrac{1}{y-4}-\\dfrac1y\\right)$.",
          fr: "$\\dfrac{1}{y(y-4)}=\\dfrac14\\left(\\dfrac{1}{y-4}-\\dfrac1y\\right)$.",
          es: "$\\dfrac{1}{y(y-4)}=\\dfrac14\\left(\\dfrac{1}{y-4}-\\dfrac1y\\right)$.",
          ja: "$\\dfrac{1}{y(y-4)}=\\dfrac14\\left(\\dfrac{1}{y-4}-\\dfrac1y\\right)$。",
          zh: "$\\dfrac{1}{y(y-4)}=\\dfrac14\\left(\\dfrac{1}{y-4}-\\dfrac1y\\right)$。"
        }
      },
      {
        title: {
          en: "Use y(1) = 2",
          fr: "Utiliser y(1) = 2",
          es: "Usar y(1) = 2",
          ja: "y(1) = 2 を使う",
          zh: "用 y(1) = 2"
        },
        lines: ["\\frac{y-4}{y}=-x^4\\;\\Rightarrow\\;y=\\frac{4}{1+x^4}"],
        note: {
          en: "At $x=1$: $\\tfrac{2-4}{2}=-1$, so the constant is $-1$.",
          fr: "En $x=1$ : $\\tfrac{2-4}{2}=-1$, la constante vaut $-1$.",
          es: "En $x=1$: $\\tfrac{2-4}{2}=-1$, la constante es $-1$.",
          ja: "$x=1$ で $\\tfrac{2-4}{2}=-1$、定数は $-1$。",
          zh: "在 $x=1$ 处 $\\tfrac{2-4}{2}=-1$，常数为 $-1$。"
        }
      },
      {
        title: {
          en: "Evaluate",
          fr: "Évaluer",
          es: "Evaluar",
          ja: "値を求める",
          zh: "求值"
        },
        lines: ["10\\,y(\\sqrt2)=10\\cdot\\frac{4}{1+4}=\\boxed{8}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The slope $y'=-\\tfrac{16x^3}{(1+x^4)^2}$ is never zero for $x>0$, as required.",
          fr: "La pente $y'=-\\tfrac{16x^3}{(1+x^4)^2}$ ne s’annule pas pour $x>0$.",
          es: "La pendiente $y'=-\\tfrac{16x^3}{(1+x^4)^2}$ nunca es cero para $x>0$.",
          ja: "傾き $y'=-\\tfrac{16x^3}{(1+x^4)^2}$ は $x>0$ で 0 にならない。",
          zh: "斜率 $y'=-\\tfrac{16x^3}{(1+x^4)^2}$ 在 $x>0$ 时不为零。"
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
