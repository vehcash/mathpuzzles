/* algebra · A line through the origin cuts a quartic four times
   Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023b-four-crossings-product",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023, additional multiple-choice test (Mathematics Admissions Test), Question H",
        fr: "MAT d’Oxford 2023, test complémentaire à choix multiples (test d’admission en mathématiques), question H",
        es: "MAT de Oxford 2023, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta H",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 追加選択式テスト 問題 H",
        zh: "牛津大学数学入学考试 MAT 2023 补充选择题测试 第 H 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A line through the origin cuts a quartic four times",
      fr: "Une droite par l’origine coupe une quartique quatre fois",
      es: "Una recta por el origen corta una cuártica cuatro veces",
      ja: "原点を通る直線が4次曲線と4回交わる",
      zh: "过原点的直线与四次曲线交于四点"
    },
    statement: {
      en: "Let $p(x)=2x^4-3x^3-5x^2+2x+2$. A line $y=mx$ meets $y=p(x)$ at four distinct points with $x$-coordinates $x_1,x_2,x_3,x_4$. <b>Which of the following are true?</b>",
      fr: "Soit $p(x)=2x^4-3x^3-5x^2+2x+2$. Une droite $y=mx$ coupe $y=p(x)$ en quatre points distincts d’abscisses $x_1,x_2,x_3,x_4$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $p(x)=2x^4-3x^3-5x^2+2x+2$. Una recta $y=mx$ corta a $y=p(x)$ en cuatro puntos distintos de abscisas $x_1,x_2,x_3,x_4$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$p(x)=2x^4-3x^3-5x^2+2x+2$ とします。直線 $y=mx$ が $y=p(x)$ と異なる4点で交わり、その $x$ 座標を $x_1,x_2,x_3,x_4$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $p(x)=2x^4-3x^3-5x^2+2x+2$。直线 $y=mx$ 与 $y=p(x)$ 交于四个不同点，横坐标为 $x_1,x_2,x_3,x_4$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The quartic y = p(x) and a line through the origin crossing it four times.",
      fr: "La quartique y = p(x) et une droite passant par l’origine qui la coupe quatre fois.",
      es: "La cuártica y = p(x) y una recta por el origen que la corta cuatro veces.",
      ja: "4次曲線 y = p(x) と、それと4回交わる原点を通る直線。",
      zh: "四次曲线 y = p(x) 与过原点、交四次的直线。"
    },
    hint: {
      en: "The $x_i$ are the roots of $p(x)-mx=0$. Which coefficients does $m$ change?",
      fr: "Les $x_i$ sont les racines de $p(x)-mx=0$. Quels coefficients $m$ modifie-t-il ?",
      es: "Los $x_i$ son las raíces de $p(x)-mx=0$. ¿Qué coeficientes cambia $m$?",
      ja: "$x_i$ は $p(x)-mx=0$ の解。$m$ が変える係数は？",
      zh: "$x_i$ 是 $p(x)-mx=0$ 的根，$m$ 改变了哪些系数？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 9.0, scale: 30, pad: 16 });
      const T = F.T = axes(F, -1.6, 2.6, -5.0, 4.0);
      plot(F, T, x => (2 * x ** 4 - 3 * x ** 3 - 5 * x * x + 2 * x + 2) / 2, -1.5, 2.55, 'graph', 'base', -5, 4);
      plot(F, T, x => 0.3 * x, -1.6, 2.6, 'conic', 'base', -5, 4);
      F.reveal = () => {
      F.text(T([0.6, -4.5]), 'x₁x₂x₃x₄ = 2/2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "x₁x₂x₃x₄ = 2/2": {"fr": "x₁x₂x₃x₄ = 2/2", "es": "x₁x₂x₃x₄ = 2/2", "ja": "x₁x₂x₃x₄ = 2/2", "zh": "x₁x₂x₃x₄ = 2/2"},
      "it depends on": {"fr": "cela dépend de", "es": "depende de", "ja": "は次に依存：", "zh": "取决于"},
      "whatever the value of": {"fr": "quelle que soit la valeur de", "es": "sea cual sea", "ja": "の値によらず", "zh": "无论取何值"},
      "not enough information": {"fr": "pas assez d’informations", "es": "no hay información suficiente", "ja": "情報が足りない", "zh": "信息不足"},
      "is unchanged": {"fr": "reste inchangé", "es": "no cambia", "ja": "は変わらない", "zh": "不变"}
    },
    options: [
      { tex: "x_1x_2x_3x_4=1", correct: true, why: {
        en: "Vieta: constant term over leading coefficient, $\\tfrac22$.",
        fr: "Viète : terme constant sur coefficient dominant, $\\tfrac22$.",
        es: "Vieta: término independiente entre coeficiente principal, $\\tfrac22$.",
        ja: "解と係数の関係：定数項÷最高次係数 $=\\tfrac22$。",
        zh: "韦达：常数项除以首项系数 $\\tfrac22$。"
      } },
      { tex: "x_1+x_2+x_3+x_4=\\tfrac32\\ \\text{whatever the value of}\\ m", correct: true, why: {
        en: "$m$ only changes the coefficient of $x$.",
        fr: "$m$ ne modifie que le coefficient de $x$.",
        es: "$m$ solo cambia el coeficiente de $x$.",
        ja: "$m$ は $x$ の係数しか変えない。",
        zh: "$m$ 只改变 $x$ 的系数。"
      } },
      { tex: "x_1x_2x_3x_4=2", correct: false, why: {
        en: "Forgets to divide by the leading coefficient $2$.",
        fr: "Oublie de diviser par le coefficient dominant $2$.",
        es: "Olvida dividir entre el coeficiente principal $2$.",
        ja: "最高次係数 $2$ で割り忘れ。",
        zh: "忘了除以首项系数 $2$。"
      } },
      { tex: "x_1x_2x_3x_4=0", correct: false, why: {
        en: "$x=0$ is not a root: $p(0)=2\\ne0$.",
        fr: "$x=0$ n’est pas racine : $p(0)=2\\ne0$.",
        es: "$x=0$ no es raíz: $p(0)=2\\ne0$.",
        ja: "$p(0)=2\\ne0$ より $x=0$ は解でない。",
        zh: "$p(0)=2\\ne0$，$x=0$ 不是根。"
      } },
      { tex: "x_1x_2x_3x_4=3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{not enough information}", correct: false, why: {
        en: "The product does not depend on $m$.",
        fr: "Le produit ne dépend pas de $m$.",
        es: "El producto no depende de $m$.",
        ja: "積は $m$ によらない。",
        zh: "乘积与 $m$ 无关。"
      } },
      { tex: "x_1x_2x_3x_4=-1", correct: false, why: {
        en: "For degree $4$ the sign of the product is $+$.",
        fr: "En degré $4$ le signe du produit est $+$.",
        es: "En grado $4$ el signo del producto es $+$.",
        ja: "4次なので積の符号は $+$。",
        zh: "四次时积的符号为正。"
      } },
      { tex: "x_1+x_2+x_3+x_4=-\\tfrac32", correct: false, why: {
        en: "Sum of roots is $-\\tfrac{(-3)}{2}=\\tfrac32$.",
        fr: "Somme des racines : $-\\tfrac{(-3)}{2}=\\tfrac32$.",
        es: "Suma de raíces: $-\\tfrac{(-3)}{2}=\\tfrac32$.",
        ja: "解の和は $-\\tfrac{(-3)}{2}=\\tfrac32$。",
        zh: "根之和为 $-\\tfrac{(-3)}{2}=\\tfrac32$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The quartic for the meeting points",
          fr: "La quartique des points d’intersection",
          es: "La cuártica de los puntos de corte",
          ja: "交点の4次方程式",
          zh: "交点满足的四次方程"
        },
        lines: ["2x^4-3x^3-5x^2+(2-m)x+2=0"],
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
          en: "Vieta",
          fr: "Viète",
          es: "Vieta",
          ja: "解と係数の関係",
          zh: "韦达定理"
        },
        lines: ["x_1x_2x_3x_4=\\tfrac{2}{2}=1,\\qquad \\textstyle\\sum x_i=\\tfrac32"],
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
