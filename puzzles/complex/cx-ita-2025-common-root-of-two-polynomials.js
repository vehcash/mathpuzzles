/* complex · A complex root shared by two polynomials
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-ita-2025-common-root-of-two-polynomials",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 10",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 10",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 10",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第10問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 10 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "A complex root shared by two polynomials",
      fr: "Une racine complexe commune à deux polynômes",
      es: "Una raíz compleja común a dos polinomios",
      ja: "2つの多項式に共通の複素数解",
      zh: "两个多项式的公共复根"
    },
    statement: {
      en: "Let $p(x)=x^5-x^3+12x-18$ and $q(x)=x^4-x^3+5x-3$. <b>Which of the following are true?</b>",
      fr: "Soit $p(x)=x^5-x^3+12x-18$ et $q(x)=x^4-x^3+5x-3$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $p(x)=x^5-x^3+12x-18$ y $q(x)=x^4-x^3+5x-3$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$p(x)=x^5-x^3+12x-18$、$q(x)=x^4-x^3+5x-3$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $p(x)=x^5-x^3+12x-18$，$q(x)=x^4-x^3+5x-3$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The five answer candidates plotted in the complex plane.",
      fr: "Les cinq candidats placés dans le plan complexe.",
      es: "Los cinco candidatos en el plano complejo.",
      ja: "5つの候補を複素平面に描く。",
      zh: "五个候选值画在复平面上。"
    },
    hint: {
      en: "Common roots are the roots of $\\gcd(p,q)$. Use the Euclidean algorithm.",
      fr: "Les racines communes sont celles de $\\operatorname{pgcd}(p,q)$. Utilisez l’algorithme d’Euclide.",
      es: "Las raíces comunes son las de $\\operatorname{mcd}(p,q)$. Usa el algoritmo de Euclides.",
      ja: "共通解は $\\gcd(p,q)$ の解。ユークリッドの互除法を使う。",
      zh: "公共根即 $\\gcd(p,q)$ 的根，用辗转相除法。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.6, scale: 50, pad: 16 });
      const T = F.T = argand(F, -2.0, 2.4, -0.4, 2.6);
      [[-1, 1.41], [1.41, 1.41], [1.41, 1], [1, 1.41], [-1.41, 1]].forEach(p => F.dot(T(p)));
      F.reveal = () => {
      F.circle(T([1, 1.41]), 0.18, 'hl pink'); F.text(T([1, 1.41]), '1 + √2 i', 'len small', 0, -16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "1 + √2 i": {"fr": "1 + √2 i", "es": "1 + √2 i", "ja": "1 + √2 i", "zh": "1 + √2 i"},
      "is also a common root": {"fr": "est aussi une racine commune", "es": "también es raíz común", "ja": "も共通解", "zh": "也是公共根"},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "与"},
      "share a real root": {"fr": "ont une racine réelle commune", "es": "comparten una raíz real", "ja": "は実数の共通解をもつ", "zh": "有公共实根"}
    },
    options: [
      { tex: "1+\\sqrt2\\,i", correct: true, why: {
        en: "$\\gcd(p,q)=x^2-2x+3$",
        fr: "$\\gcd(p,q)=x^2-2x+3$",
        es: "$\\gcd(p,q)=x^2-2x+3$",
        ja: "$\\gcd(p,q)=x^2-2x+3$",
        zh: "$\\gcd(p,q)=x^2-2x+3$"
      } },
      { tex: "1-\\sqrt2\\,i\\ \\text{is also a common root}", correct: true, why: {
        en: "Real coefficients: roots come in conjugate pairs.",
        fr: "Coefficients réels : racines conjuguées par paires.",
        es: "Coeficientes reales: raíces conjugadas por pares.",
        ja: "実係数なので共役解の組。",
        zh: "实系数，根成共轭对。"
      } },
      { tex: "-1+\\sqrt2\\,i", correct: false, why: {
        en: "$q(-1+\\sqrt2 i)\\ne0$",
        fr: "$q(-1+\\sqrt2 i)\\ne0$",
        es: "$q(-1+\\sqrt2 i)\\ne0$",
        ja: "$q(-1+\\sqrt2 i)\\ne0$",
        zh: "$q(-1+\\sqrt2 i)\\ne0$"
      } },
      { tex: "\\sqrt2+\\sqrt2\\,i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt2+i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\sqrt2+i", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\gcd(p,q)=x^2+2x+3", correct: false, why: {
        en: "$x^2-2x+3$",
        fr: "$x^2-2x+3$",
        es: "$x^2-2x+3$",
        ja: "$x^2-2x+3$",
        zh: "$x^2-2x+3$"
      } },
      { tex: "p\\ \\text{and}\\ q\\ \\text{share a real root}", correct: false, why: {
        en: "Their common factor $x^2-2x+3$ has discriminant $-8<0$.",
        fr: "Leur facteur commun $x^2-2x+3$ a un discriminant $-8<0$.",
        es: "Su factor común $x^2-2x+3$ tiene discriminante $-8<0$.",
        ja: "共通因数 $x^2-2x+3$ の判別式は $-8<0$。",
        zh: "公因式 $x^2-2x+3$ 判别式 $-8<0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor q",
          fr: "Factoriser q",
          es: "Factorizar q",
          ja: "q を因数分解",
          zh: "分解 q"
        },
        lines: ["q=x^4-x^3+5x-3=(x^2-2x+3)(x^2+x-1)"],
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
          en: "Check p",
          fr: "Vérifier p",
          es: "Comprobar p",
          ja: "p を確認",
          zh: "检验 p"
        },
        lines: ["p=(x^2-2x+3)(x^3+2x^2-6)\\Rightarrow x=1\\pm\\sqrt2\\,i"],
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
