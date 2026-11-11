/* calculus · How many zeros does this monster have?
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2024-zeros-of-a-big-quotient",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.10",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.10",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.10",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.10",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.10"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "How many zeros does this monster have?",
      fr: "Combien de zéros a ce monstre ?",
      es: "¿Cuántos ceros tiene este monstruo?",
      ja: "この怪物の零点はいくつ？",
      zh: "这个“庞然大物”有几个零点？"
    },
    statement: {
      en: "$f(x)=\\dfrac{\\sin x}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}+\\dfrac{2}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}$. <b>Which of the following equal the number of real solutions of $f(x)=0$?</b>",
      fr: "$f(x)=\\dfrac{\\sin x}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}+\\dfrac{2}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}$. <b>Lesquelles des valeurs suivantes sont égales au nombre de solutions réelles de $f(x)=0$ ?</b>",
      es: "$f(x)=\\dfrac{\\sin x}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}+\\dfrac{2}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}$. <b>¿Cuáles de los siguientes valores son iguales al número de soluciones reales de $f(x)=0$?</b>",
      ja: "$f(x)=\\dfrac{\\sin x}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}+\\dfrac{2}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}$ とします。<b>$f(x)=0$ の実数解の個数に等しいものはどれですか？</b>",
      zh: "$f(x)=\\dfrac{\\sin x}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}+\\dfrac{2}{e^{\\pi x}}\\cdot\\dfrac{x^{2023}+2024x+2025}{x^2-x+3}$。<b>下列哪些等于方程 $f(x)=0$ 的实数解个数？</b>"
    },
    figureText: {
      en: "The factors written as boxes: (sin x + 2), e^(−πx), (x²⁰²³ + 2024x + 2025) and 1/(x² − x + 3).",
      fr: "Les facteurs en cases : (sin x + 2), e^(−πx), (x²⁰²³ + 2024x + 2025) et 1/(x² − x + 3).",
      es: "Los factores en cajas: (sen x + 2), e^(−πx), (x²⁰²³ + 2024x + 2025) y 1/(x² − x + 3).",
      ja: "因数を箱で表示：(sin x + 2)、e^(−πx)、(x²⁰²³ + 2024x + 2025)、1/(x² − x + 3)。",
      zh: "各因式用方框表示：(sin x + 2)、e^(−πx)、(x²⁰²³ + 2024x + 2025)、1/(x² − x + 3)。"
    },
    hint: {
      en: "Factor out the common part. Which factors can never be $0$?",
      fr: "Factorisez la partie commune. Quels facteurs ne s’annulent jamais ?",
      es: "Saca factor común. ¿Qué factores nunca valen $0$?",
      ja: "共通因数でくくる。決して $0$ にならない因数は？",
      zh: "提出公因式。哪些因式永不为 $0$？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.2, h: 2.6, scale: 48, pad: 16 });
      const B = [[0.2, 1.4, 'sin x + 2'], [3.7, 1.4, 'e^(−πx)'], [0.2, 0.3, 'x²⁰²³ + 2024x + 2025'], [3.7, 0.3, '1/(x² − x + 3)']];
      B.forEach(([x, y, t]) => { F.rect(x, y, 3.3, 0.8, 'fill-blue', 'fills'); F.text([x + 1.65, y + 0.4], t, 'len small', 0, 0); });
      F.reveal = () => {
      F.rect(0.2, 0.3, 3.3, 0.8, 'fill-yellow', 'fills'); ['> 0', '> 0', '↗', '> 0'].forEach((t, k) => F.text([B[k][0] + 3.1, B[k][1] + 0.6], t, 'len small', 0, 0));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "sin x + 2": {"fr": "sin x + 2", "es": "sen x + 2", "ja": "sin x + 2", "zh": "sin x + 2"},
      "zero": {"fr": "zéro", "es": "cero", "ja": "個の零点", "zh": "个零点"}
    },
    options: [
      { tex: "1", correct: true, why: {
        en: "Only $x^{2023}+2024x+2025$ can vanish, and it is strictly increasing.",
        fr: "Seul $x^{2023}+2024x+2025$ peut s’annuler, et il est strictement croissant.",
        es: "Solo $x^{2023}+2024x+2025$ puede anularse, y es estrictamente creciente.",
        ja: "零になりうるのは $x^{2023}+2024x+2025$ だけで狭義単調増加。",
        zh: "只有 $x^{2023}+2024x+2025$ 可能为零，且严格递增。"
      } },
      { tex: "2024^0", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "0", correct: false, why: {
        en: "An odd-degree polynomial always has a real root.",
        fr: "Un polynôme de degré impair a toujours une racine réelle.",
        es: "Un polinomio de grado impar siempre tiene una raíz real.",
        ja: "奇数次多項式は必ず実数解をもつ。",
        zh: "奇次多项式总有实根。"
      } },
      { tex: "2023", correct: false, why: {
        en: "Its derivative $2023x^{2022}+2024>0$: only one real root.",
        fr: "Sa dérivée $2023x^{2022}+2024>0$ : une seule racine réelle.",
        es: "Su derivada $2023x^{2022}+2024>0$: una sola raíz real.",
        ja: "導関数 $2023x^{2022}+2024>0$ で実数解は1つ。",
        zh: "其导数 $2023x^{2022}+2024>0$，只有一个实根。"
      } },
      { tex: "\\infty", correct: false, why: {
        en: "$\\sin x+2\\ge1$ never vanishes, so the sine contributes no zeros.",
        fr: "$\\sin x+2\\ge1$ ne s’annule jamais.",
        es: "$\\sin x+2\\ge1$ nunca se anula.",
        ja: "$\\sin x+2\\ge1$ は $0$ にならない。",
        zh: "$\\sin x+2\\ge1$ 永不为零。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2025", correct: false, why: {
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
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "提公因式"
        },
        lines: ["f(x)=\\frac{(\\sin x+2)\\,(x^{2023}+2024x+2025)}{e^{\\pi x}\\,(x^2-x+3)}"],
        note: {
          en: "$x^2-x+3$ has discriminant $1-12<0$, so it is always positive.",
          fr: "$x^2-x+3$ a un discriminant $1-12<0$ : toujours positif.",
          es: "$x^2-x+3$ tiene discriminante $1-12<0$: siempre positivo.",
          ja: "$x^2-x+3$ の判別式 $1-12<0$ で常に正。",
          zh: "$x^2-x+3$ 判别式 $1-12<0$，恒正。"
        }
      },
      {
        title: {
          en: "One factor can vanish",
          fr: "Un seul facteur peut s’annuler",
          es: "Un solo factor puede anularse",
          ja: "零になりうる因数は1つ",
          zh: "只有一个因式可为零"
        },
        lines: ["p(x)=x^{2023}+2024x+2025,\\quad p'(x)=2023x^{2022}+2024>0\\ \\Rightarrow\\ \\boxed{1}\\ \\text{zero}"],
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
