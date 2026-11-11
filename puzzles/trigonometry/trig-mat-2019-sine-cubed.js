/* trigonometry · sin³x + cos²x = 0
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2019-sine-cubed",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2019 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "sin³x + cos²x = 0",
      fr: "sin³x + cos²x = 0",
      es: "sen³x + cos²x = 0",
      ja: "sin³x + cos²x = 0",
      zh: "sin³x + cos²x = 0"
    },
    statement: {
      en: "<b>Which of the following equal the number of solutions of $\\sin^3x+\\cos^2x=0$ with $0^\\circ<x<360^\\circ$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales au nombre de solutions de $\\sin^3x+\\cos^2x=0$ avec $0^\\circ<x<360^\\circ$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales al número de soluciones de $\\sin^3x+\\cos^2x=0$ con $0^\\circ<x<360^\\circ$?</b>",
      ja: "<b>$0^\\circ<x<360^\\circ$ における $\\sin^3x+\\cos^2x=0$ の解の個数に等しいものはどれですか？</b>",
      zh: "<b>$\\sin^3x+\\cos^2x=0$ 在 $0^\\circ<x<360^\\circ$ 内解的个数等于下列哪些？</b>"
    },
    figureText: {
      en: "One turn of y = sin x, from 0° to 360°. The level of sin x that solves the equation is added in the solution.",
      fr: "Un tour de y = sin x, de 0° à 360°. Le niveau de sin x qui résout l’équation est ajouté dans la solution.",
      es: "Una vuelta de y = sen x, de 0° a 360°. El nivel de sen x que resuelve la ecuación se añade en la solución.",
      ja: "0° から 360° までの y = sin x。方程式を満たす sin x の値は解答で加えます。",
      zh: "y = sin x 从 0° 到 360° 的一周。满足方程的 sin x 的值在解答中加上。"
    },
    hint: {
      en: "With $s=\\sin x$, the equation is $s^3-s^2+1=0$. How many roots lie in $[-1,1]$?",
      fr: "Avec $s=\\sin x$, l’équation devient $s^3-s^2+1=0$. Combien de racines dans $[-1,1]$ ?",
      es: "Con $s=\\sin x$, queda $s^3-s^2+1=0$. ¿Cuántas raíces hay en $[-1,1]$?",
      ja: "$s=\\sin x$ とすると $s^3-s^2+1=0$。$[-1,1]$ に解はいくつ？",
      zh: "令 $s=\\sin x$，得 $s^3-s^2+1=0$。$[-1,1]$ 内有几个根？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.8, h: 3.0, scale: 44, pad: 18 });
      const T = F.T = axes(F, -0.2, 6.6, -1.3, 1.6);
      plot(F, T, Math.sin, 0, 2 * Math.PI, 'graph');
      F.text(T([2 * Math.PI, 0]), '360°', 'tick', 0, -12);
      F.reveal = () => {
      F.seg(T([0, -0.755]), T([6.3, -0.755]), 'seg thin dashc');
      const x1 = Math.PI + Math.asin(0.755), x2 = 2 * Math.PI - Math.asin(0.755);
      F.dot(T([x1, -0.755])); F.dot(T([x2, -0.755]));
      F.text(T([1.2, -0.755]), '−0.755', 'tick', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "two": {"fr": "deux", "es": "dos", "ja": "2つの", "zh": "两个"},
      "in": {"fr": "dans", "es": "en", "ja": "（区間）", "zh": "在"}
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "One value of $\\sin x$, taken twice per turn.",
        fr: "Une valeur de $\\sin x$, atteinte deux fois par tour.",
        es: "Un valor de $\\sin x$, alcanzado dos veces por vuelta.",
        ja: "$\\sin x$ の1つの値を1周で2回とる。",
        zh: "$\\sin x$ 的一个值，每周取到两次。"
      } },
      { tex: "2\\times\\#\\{s\\in[-1,1]:s^3-s^2+1=0\\}", correct: true, why: {
        en: "The same count: one root $s$, two angles.",
        fr: "Le même compte : une racine $s$, deux angles.",
        es: "La misma cuenta: una raíz $s$, dos ángulos.",
        ja: "同じ数：解 $s$ が1つ、角が2つ。",
        zh: "同一计数：一个根 $s$，两个角。"
      } },
      { tex: "0", correct: false, why: {
        en: "$s^3-s^2+1$ is $-1$ at $s=-1$ and $1$ at $s=0$.",
        fr: "$s^3-s^2+1$ vaut $-1$ en $s=-1$ et $1$ en $s=0$.",
        es: "$s^3-s^2+1$ vale $-1$ en $s=-1$ y $1$ en $s=0$.",
        ja: "$s^3-s^2+1$ は $s=-1$ で $-1$、$s=0$ で $1$。",
        zh: "$s^3-s^2+1$ 在 $s=-1$ 为 $-1$，在 $s=0$ 为 $1$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Counts values of $\\sin x$, not values of $x$.",
        fr: "Compte les valeurs de $\\sin x$, pas de $x$.",
        es: "Cuenta valores de $\\sin x$, no de $x$.",
        ja: "$\\sin x$ の値を数えている。",
        zh: "数的是 $\\sin x$ 的值，不是 $x$。"
      } },
      { tex: "3", correct: false, why: {
        en: "The other two roots of the cubic are complex.",
        fr: "Les deux autres racines de la cubique sont complexes.",
        es: "Las otras dos raíces de la cúbica son complejas.",
        ja: "3次式の残り2つの解は虚数。",
        zh: "三次式另两根为复数。"
      } },
      { tex: "4", correct: false, why: {
        en: "Would need two roots in $[-1,1]$.",
        fr: "Il faudrait deux racines dans $[-1,1]$.",
        es: "Haría falta dos raíces en $[-1,1]$.",
        ja: "$[-1,1]$ に解が2つ必要。",
        zh: "需要 $[-1,1]$ 内有两个根。"
      } },
      { tex: "6", correct: false, why: {
        en: "Three times two, but only one root is real.",
        fr: "Trois fois deux, mais une seule racine est réelle.",
        es: "Tres por dos, pero solo una raíz es real.",
        ja: "3×2 だが実数解は1つ。",
        zh: "三乘二，但只有一个实根。"
      } },
      { tex: "1\\ (x=270^\\circ)", correct: false, why: {
        en: "$\\sin^3270^\\circ+\\cos^2270^\\circ=-1\\ne0$.",
        fr: "$\\sin^3270^\\circ+\\cos^2270^\\circ=-1\\ne0$.",
        es: "$\\sin^3270^\\circ+\\cos^2270^\\circ=-1\\ne0$.",
        ja: "$\\sin^3270^\\circ+\\cos^2270^\\circ=-1\\ne0$.",
        zh: "$\\sin^3270^\\circ+\\cos^2270^\\circ=-1\\ne0$."
      } }
    ],
    steps: [
      {
        title: {
          en: "One variable",
          fr: "Une variable",
          es: "Una variable",
          ja: "1変数に",
          zh: "化为一元"
        },
        lines: ["s^3+(1-s^2)=0\\iff g(s)=s^3-s^2+1=0"],
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
          en: "Roots in [−1, 1]",
          fr: "Racines dans [−1, 1]",
          es: "Raíces en [−1, 1]",
          ja: "[−1, 1] の解",
          zh: "[−1, 1] 内的根"
        },
        lines: ["g(-1)=-1,\\ g(0)=1;\\quad g'(s)=s(3s-2):\\ \\min g=g(\\tfrac23)=\\tfrac{23}{27}>0"],
        note: {
          en: "So exactly one root $s\\approx-0.755$, in $(-1,0)$.",
          fr: "Donc une seule racine $s\\approx-0{,}755$, dans $(-1,0)$.",
          es: "Así una sola raíz $s\\approx-0{,}755$, en $(-1,0)$.",
          ja: "よって解は $(-1,0)$ 内の $s\\approx-0.755$ の1つ。",
          zh: "所以只有一个根 $s\\approx-0.755$，在 $(-1,0)$ 内。"
        }
      },
      {
        title: {
          en: "Back to x",
          fr: "Revenir à x",
          es: "Volver a x",
          ja: "x に戻す",
          zh: "回到 x"
        },
        lines: ["\\sin x=s\\in(-1,0):\\ \\text{two } x\\text{ in }(180^\\circ,360^\\circ)\\;\\Rightarrow\\;\\boxed{2}"],
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
