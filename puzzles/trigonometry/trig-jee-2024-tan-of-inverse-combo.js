/* trigonometry · Tangent of an inverse-trig combination
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-jee-2024-tan-of-inverse-combo",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.1",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.1",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.1",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.1",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.1"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Tangent of an inverse-trig combination",
      fr: "Tangente d’une combinaison d’arcs",
      es: "Tangente de una combinación de arcos",
      ja: "逆三角関数の組合せの正接",
      zh: "反三角函数组合的正切"
    },
    statement: {
      en: "Using principal values, <b>which of the following equal $\\tan\\!\\left(\\sin^{-1}\\tfrac35-2\\cos^{-1}\\tfrac{2}{\\sqrt5}\\right)$?</b>",
      fr: "Avec les valeurs principales, <b>lesquelles des valeurs suivantes sont égales à $\\tan\\!\\left(\\sin^{-1}\\tfrac35-2\\cos^{-1}\\tfrac{2}{\\sqrt5}\\right)$ ?</b>",
      es: "Con valores principales, <b>¿cuáles de los siguientes valores son iguales a $\\tan\\!\\left(\\sin^{-1}\\tfrac35-2\\cos^{-1}\\tfrac{2}{\\sqrt5}\\right)$?</b>",
      ja: "主値で考えて、<b>$\\tan\\!\\left(\\sin^{-1}\\tfrac35-2\\cos^{-1}\\tfrac{2}{\\sqrt5}\\right)$ に等しいものはどれですか？</b>",
      zh: "取反三角函数的主值，<b>下列哪些等于 $\\tan\\!\\left(\\sin^{-1}\\tfrac35-2\\cos^{-1}\\tfrac{2}{\\sqrt5}\\right)$？</b>"
    },
    figureText: {
      en: "A 3-4-5 right triangle for α = sin⁻¹(3/5) and a 1-2-√5 right triangle for θ = cos⁻¹(2/√5).",
      fr: "Un triangle 3-4-5 pour α = sin⁻¹(3/5) et un triangle 1-2-√5 pour θ = cos⁻¹(2/√5).",
      es: "Un triángulo 3-4-5 para α = sen⁻¹(3/5) y uno 1-2-√5 para θ = cos⁻¹(2/√5).",
      ja: "α = sin⁻¹(3/5) の 3-4-5 直角三角形と θ = cos⁻¹(2/√5) の 1-2-√5 直角三角形。",
      zh: "α = sin⁻¹(3/5) 对应 3-4-5 直角三角形，θ = cos⁻¹(2/√5) 对应 1-2-√5 直角三角形。"
    },
    hint: {
      en: "$\\tan\\alpha=\\tfrac34$ and $\\tan\\theta=\\tfrac12$. Use the double-angle formula, then the difference formula.",
      fr: "$\\tan\\alpha=\\tfrac34$ et $\\tan\\theta=\\tfrac12$. Formule de l’angle double, puis de la différence.",
      es: "$\\tan\\alpha=\\tfrac34$ y $\\tan\\theta=\\tfrac12$. Ángulo doble y luego diferencia.",
      ja: "$\\tan\\alpha=\\tfrac34$、$\\tan\\theta=\\tfrac12$。2倍角、次に差の公式。",
      zh: "$\\tan\\alpha=\\tfrac34$，$\\tan\\theta=\\tfrac12$，先用二倍角再用差角公式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.6, scale: 52, pad: 16 });
      F.path([[0.3, 0.4], [2.7, 0.4], [2.7, 2.2]], 'seg', 'base', true); F.text([0.3, 0.4], 'α', 'pt', 28, -6);
      F.text([1.5, 0.4], '4', 'len small', 0, 14); F.text([2.7, 1.3], '3', 'len small', 10, 0); F.text([1.5, 1.3], '5', 'len small', -10, -8);
      F.path([[3.3, 0.4], [5.7, 0.4], [5.7, 1.6]], 'seg', 'base', true); F.text([3.3, 0.4], 'θ', 'pt', 30, 14);
      F.text([4.5, 0.4], '2', 'len small', 0, 14); F.text([5.7, 1.0], '1', 'len small', 10, 0); F.text([4.5, 1.0], '√5', 'len small', -10, -10);
      F.reveal = () => {
      F.text([4.5, 2.2], 'tan 2θ = 4/3', 'len small', 0, 0);
      };
      return F;
    },
    options: [
      { tex: "-\\tfrac{7}{24}", correct: true, why: {
        en: "$\\tfrac{3/4-4/3}{1+1}=-\\tfrac{7}{24}$.",
        fr: "$\\tfrac{3/4-4/3}{1+1}=-\\tfrac{7}{24}$.",
        es: "$\\tfrac{3/4-4/3}{1+1}=-\\tfrac{7}{24}$.",
        ja: "$\\tfrac{3/4-4/3}{1+1}=-\\tfrac{7}{24}$。",
        zh: "$\\tfrac{3/4-4/3}{1+1}=-\\tfrac{7}{24}$。"
      } },
      { tex: "\\tfrac{-14}{48}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{7}{24}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\tfrac{5}{24}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{5}{24}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\tfrac{1}{4}", correct: false, why: {
        en: "This uses $2\\cdot\\tfrac12=1$ for $\\tan2\\theta$; the double angle is $\\tfrac{2t}{1-t^2}$.",
        fr: "Cela prend $\\tan2\\theta=1$ ; la formule est $\\tfrac{2t}{1-t^2}$.",
        es: "Toma $\\tan2\\theta=1$; la fórmula es $\\tfrac{2t}{1-t^2}$.",
        ja: "$\\tan2\\theta=1$ としている。正しくは $\\tfrac{2t}{1-t^2}$。",
        zh: "误取 $\\tan2\\theta=1$，应为 $\\tfrac{2t}{1-t^2}$。"
      } },
      { tex: "\\tfrac{25}{0}", correct: false, why: {
        en: "The denominator is $1+\\tfrac34\\cdot\\tfrac43=2$, not $0$.",
        fr: "Le dénominateur vaut $1+\\tfrac34\\cdot\\tfrac43=2$, pas $0$.",
        es: "El denominador es $1+\\tfrac34\\cdot\\tfrac43=2$, no $0$.",
        ja: "分母は $1+\\tfrac34\\cdot\\tfrac43=2$。",
        zh: "分母为 $1+\\tfrac34\\cdot\\tfrac43=2$，不是 $0$。"
      } },
      { tex: "-\\tfrac{24}{7}", correct: false, why: {
        en: "That is the reciprocal.",
        fr: "C’est l’inverse.",
        es: "Es el inverso.",
        ja: "逆数。",
        zh: "那是倒数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two tangents",
          fr: "Deux tangentes",
          es: "Dos tangentes",
          ja: "2つの正接",
          zh: "两个正切"
        },
        lines: ["\\tan\\alpha=\\tfrac34,\\qquad\\tan\\theta=\\tfrac12\\ \\Rightarrow\\ \\tan2\\theta=\\frac{1}{1-\\frac14}=\\frac43"],
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
          en: "Difference",
          fr: "Différence",
          es: "Diferencia",
          ja: "差の公式",
          zh: "差角公式"
        },
        lines: ["\\tan(\\alpha-2\\theta)=\\frac{\\frac34-\\frac43}{1+\\frac34\\cdot\\frac43}=\\frac{-\\frac7{12}}{2}=\\boxed{-\\tfrac7{24}}"],
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
