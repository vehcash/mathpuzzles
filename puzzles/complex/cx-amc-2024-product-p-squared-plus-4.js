/* complex · A product over the roots, using ±2i
   AMC 12A 2024 (Mathematical Association of America), Problem 15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-amc-2024-product-p-squared-plus-4",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12A 2024 (Mathematical Association of America), Problem 15",
        fr: "AMC 12A 2024 (Mathematical Association of America), problème 15",
        es: "AMC 12A 2024 (Mathematical Association of America), problema 15",
        ja: "AMC 12A 2024（アメリカ数学協会）第15問",
        zh: "AMC 12A 2024（美国数学协会）第 15 题"
      },
      exams: ["amc"]
    },
    difficulty: 3,
    title: {
      en: "A product over the roots, using ±2i",
      fr: "Un produit sur les racines, avec ±2i",
      es: "Un producto sobre las raíces, con ±2i",
      ja: "±2i を使う解の積",
      zh: "借助 ±2i 求根的乘积"
    },
    statement: {
      en: "$p,q,r$ are the roots of $f(x)=x^3+2x^2-x+3$. <b>Which of the following equal $(p^2+4)(q^2+4)(r^2+4)$?</b>",
      fr: "$p,q,r$ sont les racines de $f(x)=x^3+2x^2-x+3$. <b>Lesquelles des valeurs suivantes sont égales à $(p^2+4)(q^2+4)(r^2+4)$ ?</b>",
      es: "$p,q,r$ son las raíces de $f(x)=x^3+2x^2-x+3$. <b>¿Cuáles de los siguientes valores son iguales a $(p^2+4)(q^2+4)(r^2+4)$?</b>",
      ja: "$p,q,r$ は $f(x)=x^3+2x^2-x+3$ の解です。<b>$(p^2+4)(q^2+4)(r^2+4)$ に等しいものはどれですか？</b>",
      zh: "$p,q,r$ 为 $f(x)=x^3+2x^2-x+3$ 的根。<b>下列哪些等于 $(p^2+4)(q^2+4)(r^2+4)$？</b>"
    },
    figureText: {
      en: "The points 2i and −2i on the imaginary axis.",
      fr: "Les points 2i et −2i sur l’axe imaginaire.",
      es: "Los puntos 2i y −2i en el eje imaginario.",
      ja: "虚軸上の点 2i と −2i。",
      zh: "虚轴上的点 2i 与 −2i。"
    },
    hint: {
      en: "$p^2+4=(p-2i)(p+2i)$ and $f(x)=(x-p)(x-q)(x-r)$.",
      fr: "$p^2+4=(p-2i)(p+2i)$ et $f(x)=(x-p)(x-q)(x-r)$.",
      es: "$p^2+4=(p-2i)(p+2i)$ y $f(x)=(x-p)(x-q)(x-r)$.",
      ja: "$p^2+4=(p-2i)(p+2i)$、$f(x)=(x-p)(x-q)(x-r)$。",
      zh: "$p^2+4=(p-2i)(p+2i)$，$f(x)=(x-p)(x-q)(x-r)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.2, scale: 64, pad: 16 });
      const T = F.T = axes(F, -1.5, 1.5, -1.6, 1.6);
      F.dot(T([0, 1])); F.dot(T([0, -1])); F.text(T([0, 1]), '2i', 'pt', 14, 0); F.text(T([0, -1]), '−2i', 'pt', 18, 0);
      F.reveal = () => {
      F.text(T([0, 0.4]), '|f(2i)|²', 'len small', 34, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2i": {"fr": "2i", "es": "2i", "ja": "2i", "zh": "2i"},
      "−2i": {"fr": "−2i", "es": "−2i", "ja": "−2i", "zh": "−2i"},
      "|f(2i)|²": {"fr": "|f(2i)|²", "es": "|f(2i)|²", "ja": "|f(2i)|²", "zh": "|f(2i)|²"}
    },
    options: [
      { tex: "125", correct: true, why: {
        en: "$f(2i)=-5-10i,\\ |f(2i)|^2=25+100$",
        fr: "$f(2i)=-5-10i,\\ |f(2i)|^2=25+100$",
        es: "$f(2i)=-5-10i,\\ |f(2i)|^2=25+100$",
        ja: "$f(2i)=-5-10i,\\ |f(2i)|^2=25+100$",
        zh: "$f(2i)=-5-10i,\\ |f(2i)|^2=25+100$"
      } },
      { tex: "|f(2i)|^2", correct: true, why: {
        en: "$f(-2i)=\\overline{f(2i)}$ because $f$ has real coefficients.",
        fr: "$f(-2i)=\\overline{f(2i)}$ car $f$ est à coefficients réels.",
        es: "$f(-2i)=\\overline{f(2i)}$ porque $f$ tiene coeficientes reales.",
        ja: "実係数なので $f(-2i)=\\overline{f(2i)}$。",
        zh: "实系数故 $f(-2i)=\\overline{f(2i)}$。"
      } },
      { tex: "64", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "75", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "100", correct: false, why: {
        en: "That is only $|{-10i}|^2$.",
        fr: "C’est seulement $|{-10i}|^2$.",
        es: "Es solo $|{-10i}|^2$.",
        ja: "$|{-10i}|^2$ だけ。",
        zh: "只是 $|{-10i}|^2$。"
      } },
      { tex: "144", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-125", correct: false, why: {
        en: "A product $z\\bar z$ is never negative.",
        fr: "Un produit $z\\bar z$ n’est jamais négatif.",
        es: "Un producto $z\\bar z$ nunca es negativo.",
        ja: "$z\\bar z$ は負にならない。",
        zh: "$z\\bar z$ 不可能为负。"
      } },
      { tex: "f(2)f(-2)", correct: false, why: {
        en: "$f(2)f(-2)=17\\cdot5=85$",
        fr: "$f(2)f(-2)=17\\cdot5=85$",
        es: "$f(2)f(-2)=17\\cdot5=85$",
        ja: "$f(2)f(-2)=17\\cdot5=85$",
        zh: "$f(2)f(-2)=17\\cdot5=85$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "分解"
        },
        lines: ["\\prod(p^2+4)=\\prod(2i-p)\\prod(-2i-p)=f(2i)\\,f(-2i)"],
        note: {
          en: "Each product has three factors, so the signs $(-1)^3(-1)^3=1$ cancel.",
          fr: "Chaque produit a trois facteurs : les signes $(-1)^3(-1)^3=1$ se compensent.",
          es: "Cada producto tiene tres factores: los signos $(-1)^3(-1)^3=1$ se compensan.",
          ja: "各積は3因数なので符号 $(-1)^3(-1)^3=1$。",
          zh: "每个积三个因子，符号 $(-1)^3(-1)^3=1$ 抵消。"
        }
      },
      {
        title: {
          en: "Evaluate",
          fr: "Évaluer",
          es: "Evaluar",
          ja: "計算",
          zh: "求值"
        },
        lines: ["f(2i)=-8i-8-2i+3=-5-10i,\\quad(-5)^2+10^2=125"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The contest question had five choices; here a second correct form is added.",
          fr: "La question du concours avait cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "La pregunta del concurso tenía cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。正しい別表現を追加した。",
          zh: "原题为五选一，此处增加一个等价的正确选项。"
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
