/* trigonometry · The average of sin² over whole degrees
   AMC 12B 2024 (Mathematical Association of America), Problem 11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-amc-2024-average-sin-squared-degrees",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 11",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 11",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 11",
        ja: "AMC 12B 2024（アメリカ数学協会）第11問",
        zh: "AMC 12B 2024（美国数学协会）第 11 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "The average of sin² over whole degrees",
      fr: "La moyenne de sin² sur les degrés entiers",
      es: "La media de sen² en grados enteros",
      ja: "整数度での sin² の平均",
      zh: "整数度上 sin² 的平均"
    },
    statement: {
      en: "<b>Which of the following equal the average of $\\sin^2(1^\\circ),\\sin^2(2^\\circ),\\dots,\\sin^2(90^\\circ)$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à la moyenne de $\\sin^2(1^\\circ),\\sin^2(2^\\circ),\\dots,\\sin^2(90^\\circ)$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a la media de $\\sin^2(1^\\circ),\\sin^2(2^\\circ),\\dots,\\sin^2(90^\\circ)$?</b>",
      ja: "<b>$\\sin^2(1^\\circ),\\sin^2(2^\\circ),\\dots,\\sin^2(90^\\circ)$ の平均に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\sin^2(1^\\circ),\\sin^2(2^\\circ),\\dots,\\sin^2(90^\\circ)$ 的平均值？</b>"
    },
    figureText: {
      en: "Bars of sin² at whole degrees from 1° to 90°, rising from 0 to 1.",
      fr: "Des barres de sin² aux degrés entiers de 1° à 90°, montant de 0 à 1.",
      es: "Barras de sen² en grados enteros de 1° a 90°, subiendo de 0 a 1.",
      ja: "1°〜90° の sin² の棒。0 から 1 へ増える。",
      zh: "1° 到 90° 整数度的 sin² 条形，从 0 升到 1。"
    },
    hint: {
      en: "$\\sin^2(90^\\circ-k^\\circ)=\\cos^2k^\\circ$, so pair $k$ with $90-k$. Two terms are left over.",
      fr: "$\\sin^2(90^\\circ-k^\\circ)=\\cos^2k^\\circ$ : associez $k$ et $90-k$. Il reste deux termes.",
      es: "$\\sin^2(90^\\circ-k^\\circ)=\\cos^2k^\\circ$: empareja $k$ con $90-k$. Sobran dos términos.",
      ja: "$\\sin^2(90^\\circ-k^\\circ)=\\cos^2k^\\circ$。$k$ と $90-k$ を組に。2項余る。",
      zh: "$\\sin^2(90^\\circ-k^\\circ)=\\cos^2k^\\circ$，把 $k$ 与 $90-k$ 配对，剩两项。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.4, scale: 50, pad: 16 });
      for (let k = 1; k <= 90; k++) F.rect(0.3 + (k - 1) * 0.06, 0.3, 0.045, 1.8 * Math.sin(k * Math.PI / 180) ** 2, 'fill-blue', 'fills');
      F.reveal = () => {
      F.seg([0.3, 0.3 + 0.9], [5.7, 0.3 + 0.9], 'hl pink'); F.text([5.7, 1.2], '½', 'len small', 10, -8);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "½": {"fr": "½", "es": "½", "ja": "½", "zh": "½"}
    },
    options: [
      { tex: "\\tfrac{91}{180}", correct: true, why: {
        en: "$\\dfrac{44+\\tfrac12+1}{90}=\\dfrac{91/2}{90}$",
        fr: "$\\dfrac{44+\\tfrac12+1}{90}=\\dfrac{91/2}{90}$",
        es: "$\\dfrac{44+\\tfrac12+1}{90}=\\dfrac{91/2}{90}$",
        ja: "$\\dfrac{44+\\tfrac12+1}{90}=\\dfrac{91/2}{90}$",
        zh: "$\\dfrac{44+\\tfrac12+1}{90}=\\dfrac{91/2}{90}$"
      } },
      { tex: "\\tfrac12+\\tfrac1{180}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "The extra $\\sin^2 90^\\circ=1$ tips it slightly above $\\tfrac12$.",
        fr: "Le terme $\\sin^290^\\circ=1$ en plus la fait passer un peu au-dessus de $\\tfrac12$.",
        es: "El término extra $\\sin^290^\\circ=1$ la sube algo por encima de $\\tfrac12$.",
        ja: "余分な $\\sin^290^\\circ=1$ で $\\tfrac12$ をわずかに超える。",
        zh: "多出的 $\\sin^290^\\circ=1$ 使其略大于 $\\tfrac12$。"
      } },
      { tex: "\\tfrac{89}{180}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{11}{45}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{22}{45}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{91}{90}", correct: false, why: {
        en: "That forgets to halve: the total is $\\tfrac{91}{2}$.",
        fr: "Oubli de la moitié : le total vaut $\\tfrac{91}{2}$.",
        es: "Olvida dividir entre $2$: el total es $\\tfrac{91}{2}$.",
        ja: "合計は $\\tfrac{91}{2}$。",
        zh: "总和是 $\\tfrac{91}{2}$。"
      } },
      { tex: "\\tfrac{45}{90}", correct: false, why: {
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
          en: "Pair up",
          fr: "Apparier",
          es: "Emparejar",
          ja: "組にする",
          zh: "配对"
        },
        lines: ["\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1,\\ k=1,\\dots,44\\Rightarrow44"],
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
          en: "Leftovers and average",
          fr: "Restes et moyenne",
          es: "Sobrantes y media",
          ja: "残りと平均",
          zh: "剩余与平均"
        },
        lines: ["\\sin^245^\\circ+\\sin^290^\\circ=\\tfrac12+1,\\quad\\frac{91/2}{90}=\\frac{91}{180}"],
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
