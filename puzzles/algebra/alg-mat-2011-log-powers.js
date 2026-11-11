/* algebra · Powers hiding in logarithms
   Oxford Mathematics Admissions Test (MAT) 2011, Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2011-log-powers",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford Mathematics Admissions Test (MAT) 2011, Question 1H",
        fr: "Test d’admission en mathématiques d’Oxford (MAT) 2011, question 1H",
        es: "Prueba de admisión de matemáticas de Oxford (MAT) 2011, pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 (MAT) 2011 第1問 H",
        zh: "牛津大学数学入学考试 (MAT) 2011 第 1 题 H"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Powers hiding in logarithms",
      fr: "Des puissances cachées dans des logarithmes",
      es: "Potencias escondidas en logaritmos",
      ja: "対数に隠れたべき",
      zh: "藏在对数里的幂"
    },
    statement: {
      en: "Consider the equation $x = 8^{\\log_2 x} - 9^{\\log_3 x} - 4^{\\log_2 x} + \\log_{0.5} 0.25$. <b>Which of the following are true?</b>",
      fr: "On considère l’équation $x = 8^{\\log_2 x} - 9^{\\log_3 x} - 4^{\\log_2 x} + \\log_{0.5} 0.25$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Considera la ecuación $x = 8^{\\log_2 x} - 9^{\\log_3 x} - 4^{\\log_2 x} + \\log_{0.5} 0.25$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "方程式 $x = 8^{\\log_2 x} - 9^{\\log_3 x} - 4^{\\log_2 x} + \\log_{0.5} 0.25$ を考えます。<b>次のうち正しいものはどれですか？</b>",
      zh: "考虑方程 $x = 8^{\\log_2 x} - 9^{\\log_3 x} - 4^{\\log_2 x} + \\log_{0.5} 0.25$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The cubic y = x³ − 2x² + 2 for x > 0. The line y = x is added in the solution.",
      fr: "La cubique y = x³ − 2x² + 2 pour x > 0. La droite y = x est ajoutée dans la solution.",
      es: "La cúbica y = x³ − 2x² + 2 para x > 0. La recta y = x se añade en la solución.",
      ja: "x > 0 での3次曲線 y = x³ − 2x² + 2。直線 y = x は解答で加えます。",
      zh: "x > 0 时的三次曲线 y = x³ − 2x² + 2。直线 y = x 在解答中加上。"
    },
    hint: {
      en: "$8^{\\log_2 x} = (2^{\\log_2 x})^3$.",
      fr: "$8^{\\log_2 x} = (2^{\\log_2 x})^3$.",
      es: "$8^{\\log_2 x} = (2^{\\log_2 x})^3$.",
      ja: "$8^{\\log_2 x} = (2^{\\log_2 x})^3$。",
      zh: "$8^{\\log_2 x} = (2^{\\log_2 x})^3$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.1, h: 3.5, scale: 62, pad: 18 });
      const T = axes(F, -0.3, 2.8, -0.3, 3.2, { grid: true });
      plot(F, T, x => x * x * x - 2 * x * x + 2, 0.02, 2.7, 'graph', 'base', -0.3, 3.2);
      F.reveal = () => {
      const l = plot(F, T, x => x, 0, 2.8); l.style.stroke = '#3b8fbb';
      F.dot(T([1, 1])); F.dot(T([2, 2]));
      F.text(T([1, 1]), '(1, 1)', 'len small', 22, 30); F.text(T([2, 2]), '(2, 2)', 'len small', 30, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "It has exactly": {"fr": "Elle a exactement", "es": "Tiene exactamente", "ja": "正の解がちょうど", "zh": "恰有"},
      "positive solutions": {"fr": "solutions positives", "es": "soluciones positivas", "ja": "個", "zh": "个正解"},
      "positive solution": {"fr": "solution positive", "es": "solución positiva", "ja": "個", "zh": "个正解"},
      "It has no positive solution": {"fr": "Elle n’a aucune solution positive", "es": "No tiene ninguna solución positiva", "ja": "正の解はない", "zh": "没有正解"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "和"},
      "are solutions": {"fr": "sont solutions", "es": "son soluciones", "ja": "は解", "zh": "是解"},
      "is a solution": {"fr": "est solution", "es": "es solución", "ja": "は解", "zh": "是解"}
    },
    options: [
      { tex: "\\text{It has exactly } 2 \\text{ positive solutions}", correct: true, why: {
        en: "$x=1$ and $x=2$.",
        fr: "$x=1$ et $x=2$.",
        es: "$x=1$ y $x=2$.",
        ja: "$x=1$ と $x=2$。",
        zh: "$x=1$ 和 $x=2$。"
      } },
      { tex: "x=1 \\text{ and } x=2 \\text{ are solutions}", correct: true, why: {
        en: "$1 = 1-1-1+2$ and $2 = 8-4-4+2$.",
        fr: "$1 = 1-1-1+2$ et $2 = 8-4-4+2$.",
        es: "$1 = 1-1-1+2$ y $2 = 8-4-4+2$.",
        ja: "$1 = 1-1-1+2$、$2 = 8-4-4+2$。",
        zh: "$1 = 1-1-1+2$，$2 = 8-4-4+2$。"
      } },
      { tex: "\\text{It has exactly } 3 \\text{ positive solutions}", correct: false, why: {
        en: "The third root of the cubic is $-1$, and $\\log_2(-1)$ is not defined.",
        fr: "La troisième racine de la cubique est $-1$, et $\\log_2(-1)$ n’est pas défini.",
        es: "La tercera raíz de la cúbica es $-1$, y $\\log_2(-1)$ no está definido.",
        ja: "3次方程式の3つ目の解は $-1$ で、$\\log_2(-1)$ は定義されない。",
        zh: "三次方程的第三个根是 $-1$，而 $\\log_2(-1)$ 无定义。"
      } },
      { tex: "\\text{It has exactly } 1 \\text{ positive solution}", correct: false, why: {
        en: "Both $1$ and $2$ work.",
        fr: "$1$ et $2$ conviennent tous les deux.",
        es: "Tanto $1$ como $2$ sirven.",
        ja: "$1$ も $2$ も解です。",
        zh: "$1$ 和 $2$ 都满足。"
      } },
      { tex: "\\text{It has no positive solution}", correct: false, why: {
        en: "Try $x=1$.",
        fr: "Essayez $x=1$.",
        es: "Prueba $x=1$.",
        ja: "$x=1$ を試してみましょう。",
        zh: "试试 $x=1$。"
      } },
      { tex: "x=-1 \\text{ is a solution}", correct: false, why: {
        en: "Not allowed: logarithms need $x>0$.",
        fr: "Interdit : les logarithmes exigent $x>0$.",
        es: "No vale: los logaritmos exigen $x>0$.",
        ja: "対数には $x>0$ が必要です。",
        zh: "不行：对数要求 $x>0$。"
      } },
      { tex: "8^{\\log_2 x} = x^2", correct: false, why: {
        en: "$8^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3$.",
        fr: "$8^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3$.",
        es: "$8^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3$.",
        ja: "$8^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3$。",
        zh: "$8^{\\log_2 x} = (2^{\\log_2 x})^3 = x^3$。"
      } },
      { tex: "\\log_{0.5} 0.25 = -2", correct: false, why: {
        en: "$0.5^2 = 0.25$, so it equals $+2$.",
        fr: "$0{,}5^2 = 0{,}25$, donc il vaut $+2$.",
        es: "$0{,}5^2 = 0{,}25$, así que vale $+2$.",
        ja: "$0.5^2 = 0.25$ なので $+2$。",
        zh: "$0.5^2 = 0.25$，所以等于 $+2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Turn every term into a power of x",
          fr: "Écrire chaque terme comme une puissance de x",
          es: "Escribir cada término como potencia de x",
          ja: "各項を x のべきにする",
          zh: "把每一项化成 x 的幂"
        },
        lines: ["8^{\\log_2 x}=x^3,\\quad 9^{\\log_3 x}=x^2,\\quad 4^{\\log_2 x}=x^2,\\quad \\log_{0.5}0.25=2"],
        note: {
          en: "$a^{\\log_b x} = x^{\\log_b a}$: for example $9 = 3^2$ gives $x^2$. All this needs $x>0$.",
          fr: "$a^{\\log_b x} = x^{\\log_b a}$ : par exemple $9 = 3^2$ donne $x^2$. Tout cela exige $x>0$.",
          es: "$a^{\\log_b x} = x^{\\log_b a}$: por ejemplo $9 = 3^2$ da $x^2$. Todo esto exige $x>0$.",
          ja: "$a^{\\log_b x} = x^{\\log_b a}$。例えば $9 = 3^2$ から $x^2$。どれも $x>0$ が必要。",
          zh: "$a^{\\log_b x} = x^{\\log_b a}$：例如 $9 = 3^2$ 得 $x^2$。这些都要求 $x>0$。"
        }
      },
      {
        title: {
          en: "Solve the cubic",
          fr: "Résoudre la cubique",
          es: "Resolver la cúbica",
          ja: "3次方程式を解く",
          zh: "解三次方程"
        },
        lines: ["x = x^3-2x^2+2 \\iff x^3-2x^2-x+2=0", "(x-2)(x-1)(x+1)=0 \\;\\Rightarrow\\; x=1,\\,2 \\;(x>0)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Group: $x^2(x-2)-(x-2)$. Only the positive roots count.",
          fr: "Regrouper : $x^2(x-2)-(x-2)$. Seules les racines positives comptent.",
          es: "Agrupa: $x^2(x-2)-(x-2)$. Solo cuentan las raíces positivas.",
          ja: "$x^2(x-2)-(x-2)$ とまとめる。正の解だけが有効。",
          zh: "分组：$x^2(x-2)-(x-2)$。只有正根有效。"
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
          en: "Two statements describe the same two solutions.",
          fr: "Deux affirmations décrivent les deux mêmes solutions.",
          es: "Dos afirmaciones describen las mismas dos soluciones.",
          ja: "2つの記述が同じ2つの解を表しています。",
          zh: "有两个说法描述的是同样的两个解。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
