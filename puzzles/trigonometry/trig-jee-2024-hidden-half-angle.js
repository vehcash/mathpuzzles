/* trigonometry · A half angle in disguise
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-jee-2024-hidden-half-angle",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.3",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.3",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.3",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.3",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.3"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A half angle in disguise",
      fr: "Un demi-angle déguisé",
      es: "Un ángulo mitad disfrazado",
      ja: "隠れた半角",
      zh: "伪装的半角"
    },
    statement: {
      en: "$\\tfrac{\\pi}{2}<x<\\pi$ and $\\cot x=-\\tfrac{5}{\\sqrt{11}}$. <b>Which of the following equal</b> $\\sin\\tfrac{11x}{2}\\,(\\sin6x-\\cos6x)+\\cos\\tfrac{11x}{2}\\,(\\sin6x+\\cos6x)$<b>?</b>",
      fr: "$\\tfrac{\\pi}{2}<x<\\pi$ et $\\cot x=-\\tfrac{5}{\\sqrt{11}}$. <b>Lesquelles des valeurs suivantes sont égales à</b> $\\sin\\tfrac{11x}{2}\\,(\\sin6x-\\cos6x)+\\cos\\tfrac{11x}{2}\\,(\\sin6x+\\cos6x)$ <b>?</b>",
      es: "$\\tfrac{\\pi}{2}<x<\\pi$ y $\\cot x=-\\tfrac{5}{\\sqrt{11}}$. <b>¿Cuáles de los siguientes valores son iguales a</b> $\\sin\\tfrac{11x}{2}\\,(\\sin6x-\\cos6x)+\\cos\\tfrac{11x}{2}\\,(\\sin6x+\\cos6x)$<b>?</b>",
      ja: "$\\tfrac{\\pi}{2}<x<\\pi$、$\\cot x=-\\tfrac{5}{\\sqrt{11}}$ のとき、<b>$\\sin\\tfrac{11x}{2}\\,(\\sin6x-\\cos6x)+\\cos\\tfrac{11x}{2}\\,(\\sin6x+\\cos6x)$ に等しいものはどれですか？</b>",
      zh: "$\\tfrac{\\pi}{2}<x<\\pi$，$\\cot x=-\\tfrac{5}{\\sqrt{11}}$。<b>下列哪些等于</b> $\\sin\\tfrac{11x}{2}\\,(\\sin6x-\\cos6x)+\\cos\\tfrac{11x}{2}\\,(\\sin6x+\\cos6x)$<b>？</b>"
    },
    figureText: {
      en: "A right triangle with legs 5 and √11 and hypotenuse 6, giving sin x = √11/6 for the angle x in the second quadrant.",
      fr: "Un triangle rectangle de côtés 5 et √11, d’hypoténuse 6, qui donne sin x = √11/6 pour x dans le deuxième quadrant.",
      es: "Un triángulo rectángulo de catetos 5 y √11 e hipotenusa 6, que da sen x = √11/6 para x en el segundo cuadrante.",
      ja: "直角をはさむ2辺 5, √11、斜辺 6 の直角三角形。第2象限の x で sin x = √11/6。",
      zh: "直角边为 5 和 √11、斜边为 6 的直角三角形，得第二象限角 x 的 sin x = √11/6。"
    },
    hint: {
      en: "Group by $\\sin6x$ and $\\cos6x$: you get $\\cos(6x-a)+\\sin(6x-a)$ with $a=\\tfrac{11x}{2}$.",
      fr: "Regroupez selon $\\sin6x$ et $\\cos6x$ : on obtient $\\cos(6x-a)+\\sin(6x-a)$ avec $a=\\tfrac{11x}{2}$.",
      es: "Agrupa por $\\sin6x$ y $\\cos6x$: queda $\\cos(6x-a)+\\sin(6x-a)$ con $a=\\tfrac{11x}{2}$.",
      ja: "$\\sin6x$, $\\cos6x$ でまとめると $a=\\tfrac{11x}{2}$ として $\\cos(6x-a)+\\sin(6x-a)$。",
      zh: "按 $\\sin6x$、$\\cos6x$ 整理得 $\\cos(6x-a)+\\sin(6x-a)$，其中 $a=\\tfrac{11x}{2}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 2.4, scale: 54, pad: 18 });
      const A = [0.3, 0.3], B = [3.6, 0.3], C = [3.6, 0.3 + Math.sqrt(11) * 0.6];
      F.path([A, B, C], 'tri'); F.right(B, [-1, 0], [0, 1], 0.2, 'seg thin');
      F.text(mid(A, B), '5', 'len small', 0, 14); F.text(mid(B, C), '√11', 'len small', 18, 0); F.text(mid(A, C), '6', 'len small', -8, -12);
      return F;
    },
    options: [
      { tex: "\\dfrac{\\sqrt{11}+1}{2\\sqrt3}", correct: true, why: {
        en: "$\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x=1+\\tfrac{\\sqrt{11}}{6}$.",
        fr: "$\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x=1+\\tfrac{\\sqrt{11}}{6}$.",
        es: "$\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x=1+\\tfrac{\\sqrt{11}}{6}$.",
        ja: "$\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x=1+\\tfrac{\\sqrt{11}}{6}$.",
        zh: "$\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x=1+\\tfrac{\\sqrt{11}}{6}$."
      } },
      { tex: "\\sqrt{1+\\tfrac{\\sqrt{11}}{6}}", correct: true, why: {
        en: "The same positive number: $\\tfrac{(\\sqrt{11}+1)^2}{12}=1+\\tfrac{\\sqrt{11}}{6}$.",
        fr: "Le même nombre positif : $\\tfrac{(\\sqrt{11}+1)^2}{12}=1+\\tfrac{\\sqrt{11}}{6}$.",
        es: "El mismo número positivo: $\\tfrac{(\\sqrt{11}+1)^2}{12}=1+\\tfrac{\\sqrt{11}}{6}$.",
        ja: "同じ正の数：$\\tfrac{(\\sqrt{11}+1)^2}{12}=1+\\tfrac{\\sqrt{11}}{6}$。",
        zh: "同一个正数：$\\tfrac{(\\sqrt{11}+1)^2}{12}=1+\\tfrac{\\sqrt{11}}{6}$。"
      } },
      { tex: "\\dfrac{\\sqrt{11}-1}{2\\sqrt3}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\dfrac{\\sqrt{11}+1}{2\\sqrt3}", correct: false, why: {
        en: "With $\\tfrac x2$ in $(\\tfrac\\pi4,\\tfrac\\pi2)$, both $\\sin$ and $\\cos$ are positive.",
        fr: "Avec $\\tfrac x2\\in(\\tfrac\\pi4,\\tfrac\\pi2)$, sinus et cosinus sont positifs.",
        es: "Con $\\tfrac x2\\in(\\tfrac\\pi4,\\tfrac\\pi2)$, seno y coseno son positivos.",
        ja: "$\\tfrac x2\\in(\\tfrac\\pi4,\\tfrac\\pi2)$ で sin も cos も正。",
        zh: "$\\tfrac x2\\in(\\tfrac\\pi4,\\tfrac\\pi2)$，正弦、余弦都为正。"
      } },
      { tex: "\\sqrt{1-\\tfrac{\\sqrt{11}}{6}}", correct: false, why: {
        en: "That is $\\left|\\cos\\tfrac x2-\\sin\\tfrac x2\\right|$.",
        fr: "C’est $\\left|\\cos\\tfrac x2-\\sin\\tfrac x2\\right|$.",
        es: "Es $\\left|\\cos\\tfrac x2-\\sin\\tfrac x2\\right|$.",
        ja: "$\\left|\\cos\\tfrac x2-\\sin\\tfrac x2\\right|$ のこと。",
        zh: "那是 $\\left|\\cos\\tfrac x2-\\sin\\tfrac x2\\right|$。"
      } },
      { tex: "\\tfrac{\\sqrt{11}}{6}", correct: false, why: {
        en: "That is $\\sin x$.",
        fr: "C’est $\\sin x$.",
        es: "Es $\\sin x$.",
        ja: "それは $\\sin x$。",
        zh: "那是 $\\sin x$。"
      } },
      { tex: "1", correct: false, why: {
        en: "Would need $\\sin x=0$.",
        fr: "Il faudrait $\\sin x=0$.",
        es: "Haría falta $\\sin x=0$.",
        ja: "$\\sin x=0$ が必要。",
        zh: "需要 $\\sin x=0$。"
      } },
      { tex: "\\dfrac{\\sqrt{11}+5}{6}", correct: false, why: {
        en: "That is $\\sin x-\\cos x$, not the half-angle sum.",
        fr: "C’est $\\sin x-\\cos x$.",
        es: "Es $\\sin x-\\cos x$.",
        ja: "それは $\\sin x-\\cos x$。",
        zh: "那是 $\\sin x-\\cos x$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Regroup",
          fr: "Regrouper",
          es: "Reagrupar",
          ja: "まとめ直す",
          zh: "重新组合"
        },
        lines: ["\\sin6x(\\cos a+\\sin a)+\\cos6x(\\cos a-\\sin a)=\\cos(6x-a)+\\sin(6x-a)"],
        note: {
          en: "With $a=\\tfrac{11x}{2}$, so $6x-a=\\tfrac x2$.",
          fr: "Avec $a=\\tfrac{11x}{2}$, donc $6x-a=\\tfrac x2$.",
          es: "Con $a=\\tfrac{11x}{2}$, así $6x-a=\\tfrac x2$.",
          ja: "$a=\\tfrac{11x}{2}$ なので $6x-a=\\tfrac x2$。",
          zh: "$a=\\tfrac{11x}{2}$，故 $6x-a=\\tfrac x2$。"
        }
      },
      {
        title: {
          en: "Square it",
          fr: "Élever au carré",
          es: "Elevar al cuadrado",
          ja: "2乗する",
          zh: "平方"
        },
        lines: ["\\left(\\cos\\tfrac x2+\\sin\\tfrac x2\\right)^2=1+\\sin x,\\qquad\\sin x=\\tfrac{\\sqrt{11}}{6}"],
        note: {
          en: "From $\\cot x=-\\tfrac{5}{\\sqrt{11}}$: legs $5$, $\\sqrt{11}$, hypotenuse $6$, and $\\sin x>0$ in the second quadrant.",
          fr: "De $\\cot x=-\\tfrac{5}{\\sqrt{11}}$ : côtés $5$, $\\sqrt{11}$, hypoténuse $6$, et $\\sin x>0$ au 2e quadrant.",
          es: "De $\\cot x=-\\tfrac{5}{\\sqrt{11}}$: catetos $5$, $\\sqrt{11}$, hipotenusa $6$, y $\\sin x>0$ en el 2.º cuadrante.",
          ja: "$\\cot x=-\\tfrac{5}{\\sqrt{11}}$ から辺 $5$, $\\sqrt{11}$, 斜辺 $6$、第2象限で $\\sin x>0$。",
          zh: "由 $\\cot x=-\\tfrac{5}{\\sqrt{11}}$：直角边 $5$、$\\sqrt{11}$，斜边 $6$，第二象限 $\\sin x>0$。"
        }
      },
      {
        title: {
          en: "Take the positive root",
          fr: "Racine positive",
          es: "Raíz positiva",
          ja: "正の平方根",
          zh: "取正根"
        },
        lines: ["\\sqrt{1+\\tfrac{\\sqrt{11}}{6}}=\\sqrt{\\tfrac{12+2\\sqrt{11}}{12}}=\\boxed{\\dfrac{\\sqrt{11}+1}{2\\sqrt3}}"],
        note: {
          en: "$12+2\\sqrt{11}=(\\sqrt{11}+1)^2$.",
          fr: "$12+2\\sqrt{11}=(\\sqrt{11}+1)^2$.",
          es: "$12+2\\sqrt{11}=(\\sqrt{11}+1)^2$.",
          ja: "$12+2\\sqrt{11}=(\\sqrt{11}+1)^2$。",
          zh: "$12+2\\sqrt{11}=(\\sqrt{11}+1)^2$。"
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
