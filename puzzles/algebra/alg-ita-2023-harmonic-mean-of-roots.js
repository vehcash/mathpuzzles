/* algebra · The harmonic mean of three roots
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 40 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2023-harmonic-mean-of-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 40",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 40",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 40",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第40問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 40 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "The harmonic mean of three roots",
      fr: "La moyenne harmonique de trois racines",
      es: "La media armónica de tres raíces",
      ja: "3つの解の調和平均",
      zh: "三个根的调和平均"
    },
    statement: {
      en: "The harmonic mean of positive numbers $a_1,\\dots,a_n$ is $H=\\dfrac{n}{\\sum 1/a_i}$. The polynomial $p(x)=30x^3-113x^2+108x-30$ has three positive real roots. <b>Which of the following equal their harmonic mean?</b>",
      fr: "La moyenne harmonique de réels positifs $a_1,\\dots,a_n$ est $H=\\dfrac{n}{\\sum 1/a_i}$. Le polynôme $p(x)=30x^3-113x^2+108x-30$ a trois racines réelles positives. <b>Lesquelles des valeurs suivantes sont égales à leur moyenne harmonique ?</b>",
      es: "La media armónica de números positivos $a_1,\\dots,a_n$ es $H=\\dfrac{n}{\\sum 1/a_i}$. El polinomio $p(x)=30x^3-113x^2+108x-30$ tiene tres raíces reales positivas. <b>¿Cuáles de los siguientes valores son iguales a su media armónica?</b>",
      ja: "正の数 $a_1,\\dots,a_n$ の調和平均は $H=\\dfrac{n}{\\sum 1/a_i}$。多項式 $p(x)=30x^3-113x^2+108x-30$ は3つの正の実数解をもちます。<b>その調和平均に等しいものはどれですか？</b>",
      zh: "正数 $a_1,\\dots,a_n$ 的调和平均为 $H=\\dfrac{n}{\\sum 1/a_i}$。多项式 $p(x)=30x^3-113x^2+108x-30$ 有三个正实根。<b>下列哪些等于它们的调和平均？</b>"
    },
    figureText: {
      en: "A sketch of p (vertical scale compressed) crossing the x-axis three times to the right of 0.",
      fr: "Une esquisse de p (échelle verticale comprimée) coupant l’axe des abscisses trois fois à droite de 0.",
      es: "Un esbozo de p (escala vertical comprimida) que corta el eje x tres veces a la derecha de 0.",
      ja: "0 より右で x 軸と3回交わる p の略図（縦軸は圧縮）。",
      zh: "p 的示意图（纵轴压缩），在 0 右侧与 x 轴交三次。"
    },
    hint: {
      en: "$\\sum\\tfrac1{a_i}=\\dfrac{a_1a_2+a_1a_3+a_2a_3}{a_1a_2a_3}$, both given by Vieta.",
      fr: "$\\sum\\tfrac1{a_i}=\\dfrac{a_1a_2+a_1a_3+a_2a_3}{a_1a_2a_3}$, tous deux donnés par Viète.",
      es: "$\\sum\\tfrac1{a_i}=\\dfrac{a_1a_2+a_1a_3+a_2a_3}{a_1a_2a_3}$, ambos por Vieta.",
      ja: "$\\sum\\tfrac1{a_i}=\\dfrac{a_1a_2+a_1a_3+a_2a_3}{a_1a_2a_3}$、ともに解と係数の関係から。",
      zh: "$\\sum\\tfrac1{a_i}=\\dfrac{a_1a_2+a_1a_3+a_2a_3}{a_1a_2a_3}$，由韦达定理得。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.9, scale: 70, pad: 16 });
      const T = F.T = axes(F, -0.4, 3.0, -1.8, 2.1);
      const p = x => 30 * x ** 3 - 113 * x ** 2 + 108 * x - 30;
      plot(F, T, x => Math.sign(p(x)) * Math.cbrt(Math.abs(p(x))) / 2, -0.05, 2.9, 'graph', 'base', -1.8, 2.1);
      F.reveal = () => {
      [0.5327, 0.7583, 2.4757].forEach(r => F.dot(T([r, 0])));
      };
      return F;
    },
    options: [
      { tex: "\\tfrac56", correct: true, why: {
        en: "$\\dfrac{3}{(108/30)/(30/30)}=\\dfrac{3}{18/5}$",
        fr: "$\\dfrac{3}{(108/30)/(30/30)}=\\dfrac{3}{18/5}$",
        es: "$\\dfrac{3}{(108/30)/(30/30)}=\\dfrac{3}{18/5}$",
        ja: "$\\dfrac{3}{(108/30)/(30/30)}=\\dfrac{3}{18/5}$",
        zh: "$\\dfrac{3}{(108/30)/(30/30)}=\\dfrac{3}{18/5}$"
      } },
      { tex: "\\dfrac{3\\cdot30}{108}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{113}{90}", correct: false, why: {
        en: "That is the arithmetic mean, $\\tfrac13\\cdot\\tfrac{113}{30}$.",
        fr: "C’est la moyenne arithmétique.",
        es: "Es la media aritmética.",
        ja: "相加平均。",
        zh: "那是算术平均。"
      } },
      { tex: "\\tfrac{18}{5}", correct: false, why: {
        en: "That is $\\sum 1/a_i$; divide $3$ by it.",
        fr: "C’est $\\sum 1/a_i$ ; il faut diviser $3$ par ce nombre.",
        es: "Es $\\sum 1/a_i$; hay que dividir $3$ entre él.",
        ja: "$\\sum 1/a_i$ の値。3 をこれで割る。",
        zh: "那是 $\\sum 1/a_i$，应用 3 除以它。"
      } },
      { tex: "\\tfrac{5}{18}", correct: false, why: {
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
          en: "Vieta",
          fr: "Viète",
          es: "Vieta",
          ja: "解と係数の関係",
          zh: "韦达定理"
        },
        lines: ["\\sum_{i<j}a_ia_j=\\tfrac{108}{30},\\quad a_1a_2a_3=\\tfrac{30}{30}=1"],
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
          en: "Harmonic mean",
          fr: "Moyenne harmonique",
          es: "Media armónica",
          ja: "調和平均",
          zh: "调和平均"
        },
        lines: ["\\sum\\tfrac1{a_i}=\\tfrac{18}5,\\quad H=\\frac{3}{18/5}=\\tfrac56"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam this was a five-choice question; here a second correct form is added.",
          fr: "Dans l’épreuve c’était un QCM à cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "En el examen era de cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。ここでは正しい別表現を追加。",
          zh: "原题为五选一，此处增加了一个等价的正确选项。"
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
