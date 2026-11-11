/* algebra · Decibels of three cars
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2023-decibels-of-cars",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 10",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 10",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 10",
        ja: "2023年 中国・高考 新課程標準I卷 第10問",
        zh: "2023年高考数学新课标I卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Decibels of three cars",
      fr: "Les décibels de trois voitures",
      es: "Los decibelios de tres coches",
      ja: "3台の車のデシベル",
      zh: "三种汽车的分贝"
    },
    statement: {
      en: "Sound pressure level is $L_p=20\\lg\\dfrac{p}{p_0}$ dB, where $p_0>0$ is the hearing threshold and $p$ the actual pressure. At $10$ m, a petrol car measures $60$–$90$ dB, a hybrid $50$–$60$ dB and an electric car $40$ dB; their pressures are $p_1,p_2,p_3$. <b>Which of the following are true?</b>",
      fr: "Le niveau de pression acoustique est $L_p=20\\lg\\dfrac{p}{p_0}$ dB, où $p_0>0$ est le seuil d’audition et $p$ la pression réelle. À $10$ m, une voiture essence mesure $60$–$90$ dB, une hybride $50$–$60$ dB et une électrique $40$ dB ; leurs pressions sont $p_1,p_2,p_3$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El nivel de presión sonora es $L_p=20\\lg\\dfrac{p}{p_0}$ dB, donde $p_0>0$ es el umbral de audición y $p$ la presión real. A $10$ m, un coche de gasolina da $60$–$90$ dB, un híbrido $50$–$60$ dB y uno eléctrico $40$ dB; sus presiones son $p_1,p_2,p_3$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "音圧レベルは $L_p=20\\lg\\dfrac{p}{p_0}$ dB（$p_0>0$ は聴覚の閾値、$p$ は実際の音圧）。$10$ m の地点でガソリン車は $60$〜$90$ dB、ハイブリッド車は $50$〜$60$ dB、電気自動車は $40$ dB で、音圧をそれぞれ $p_1,p_2,p_3$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "声压级 $L_p=20\\lg\\dfrac{p}{p_0}$（dB），$p_0>0$ 为听觉下限阈值，$p$ 为实际声压。距离 $10$ m 处，燃油车为 $60\\sim90$ dB，混动车为 $50\\sim60$ dB，电动车为 $40$ dB，对应声压为 $p_1,p_2,p_3$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A decibel scale from 30 to 100 with the three ranges: petrol 60–90, hybrid 50–60, electric 40.",
      fr: "Une échelle de décibels de 30 à 100 avec les trois plages : essence 60–90, hybride 50–60, électrique 40.",
      es: "Una escala de decibelios de 30 a 100 con los tres rangos: gasolina 60–90, híbrido 50–60, eléctrico 40.",
      ja: "30〜100 dB の目盛りと3つの範囲：ガソリン 60–90、ハイブリッド 50–60、電気 40。",
      zh: "30 到 100 dB 的刻度及三个范围：燃油 60–90，混动 50–60，电动 40。"
    },
    hint: {
      en: "Invert: $p=p_0\\cdot10^{L_p/20}$. Every $20$ dB is a factor of $10$ in pressure.",
      fr: "Inversez : $p=p_0\\cdot10^{L_p/20}$. Chaque $20$ dB multiplie la pression par $10$.",
      es: "Despeja: $p=p_0\\cdot10^{L_p/20}$. Cada $20$ dB multiplica la presión por $10$.",
      ja: "$p=p_0\\cdot10^{L_p/20}$。$20$ dB ごとに音圧は $10$ 倍。",
      zh: "反解：$p=p_0\\cdot10^{L_p/20}$。每 $20$ dB 声压变为 $10$ 倍。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.6, h: 3.0, scale: 50, pad: 18 });
      const X = L => 0.3 + (L - 30) / 10;
      F.seg([X(30), 0.6], [X(100), 0.6], 'axis');
      for (let L = 30; L <= 100; L += 10) { F.seg([X(L), 0.53], [X(L), 0.67], 'seg thin'); F.text([X(L), 0.6], String(L), 'tick', 0, 14); }
      F.rect(X(60), 2.2, 3, 0.36, 'fill-pink', 'fills'); F.text([X(75), 2.38], 'p₁', 'pt', 0, 0);
      F.rect(X(50), 1.6, 1, 0.36, 'fill-blue', 'fills'); F.text([X(55), 1.78], 'p₂', 'pt', 0, 0);
      F.dot([X(40), 1.18]); F.text([X(40), 1.18], 'p₃', 'pt', 16, 0);
      F.text([X(100), 0.6], 'dB', 'len small', 0, -12);
      F.reveal = () => {
      [[40, '100p₀'], [60, '1000p₀'], [80, '10⁴p₀']].forEach(([L, t]) => F.text([X(L), 0.6], t, 'len small', 0, 30));
      };
      return F;
    },
    options: [
      { tex: "p_1\\ge p_2", correct: true, why: {
        en: "$L_{p_1}\\ge60\\ge L_{p_2}$, and $L_p$ increases with $p$.",
        fr: "$L_{p_1}\\ge60\\ge L_{p_2}$ et $L_p$ croît avec $p$.",
        es: "$L_{p_1}\\ge60\\ge L_{p_2}$ y $L_p$ crece con $p$.",
        ja: "$L_{p_1}\\ge60\\ge L_{p_2}$ で $L_p$ は $p$ について増加。",
        zh: "$L_{p_1}\\ge60\\ge L_{p_2}$，且 $L_p$ 随 $p$ 增大。"
      } },
      { tex: "p_3=100p_0", correct: true, why: {
        en: "$20\\lg\\tfrac{p_3}{p_0}=40$ gives $\\tfrac{p_3}{p_0}=10^2$.",
        fr: "$20\\lg\\tfrac{p_3}{p_0}=40$ donne $\\tfrac{p_3}{p_0}=10^2$.",
        es: "$20\\lg\\tfrac{p_3}{p_0}=40$ da $\\tfrac{p_3}{p_0}=10^2$.",
        ja: "$20\\lg\\tfrac{p_3}{p_0}=40$ より $\\tfrac{p_3}{p_0}=10^2$。",
        zh: "由 $20\\lg\\tfrac{p_3}{p_0}=40$ 得 $\\tfrac{p_3}{p_0}=10^2$。"
      } },
      { tex: "p_2>10p_3", correct: false, why: {
        en: "$p_2\\le10^3p_0=10p_3$: at most equal.",
        fr: "$p_2\\le10^3p_0=10p_3$ : au plus égal.",
        es: "$p_2\\le10^3p_0=10p_3$: como mucho igual.",
        ja: "$p_2\\le10^3p_0=10p_3$ で高々等しい。",
        zh: "$p_2\\le10^3p_0=10p_3$，最多相等。"
      } },
      { tex: "p_1\\le10p_2", correct: false, why: {
        en: "$60$ dB for the hybrid and $90$ dB for the petrol car differ by $30$ dB, a factor $10^{1.5}>10$.",
        fr: "$60$ dB et $90$ dB diffèrent de $30$ dB, soit un facteur $10^{1{,}5}>10$.",
        es: "$60$ dB y $90$ dB difieren en $30$ dB, un factor $10^{1{,}5}>10$.",
        ja: "$60$ dB と $90$ dB の差 $30$ dB は $10^{1.5}>10$ 倍。",
        zh: "$60$ dB 与 $90$ dB 相差 $30$ dB，即 $10^{1.5}>10$ 倍。"
      } },
      { tex: "p_3=40p_0", correct: false, why: {
        en: "Decibels are logarithmic, not proportional.",
        fr: "Les décibels sont logarithmiques, pas proportionnels.",
        es: "Los decibelios son logarítmicos, no proporcionales.",
        ja: "デシベルは対数で比例ではない。",
        zh: "分贝是对数尺度，不是成正比。"
      } },
      { tex: "p_1\\le3p_2", correct: false, why: {
        en: "$90$ dB vs $50$ dB gives a factor up to $100$.",
        fr: "$90$ dB contre $50$ dB donne un facteur jusqu’à $100$.",
        es: "$90$ dB frente a $50$ dB da un factor de hasta $100$.",
        ja: "$90$ dB と $50$ dB で最大 $100$ 倍。",
        zh: "$90$ dB 对 $50$ dB 可达 $100$ 倍。"
      } },
      { tex: "p_2<p_3", correct: false, why: {
        en: "The hybrid is louder: $50>40$ dB.",
        fr: "L’hybride est plus bruyante : $50>40$ dB.",
        es: "El híbrido es más ruidoso: $50>40$ dB.",
        ja: "ハイブリッドの方が大きい：$50>40$ dB。",
        zh: "混动车更响：$50>40$ dB。"
      } },
      { tex: "p_3=10p_0", correct: false, why: {
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
          en: "Undo the logarithm",
          fr: "Défaire le logarithme",
          es: "Deshacer el logaritmo",
          ja: "対数を外す",
          zh: "去掉对数"
        },
        lines: ["p=p_0\\cdot10^{L_p/20}"],
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
          en: "Each car",
          fr: "Chaque voiture",
          es: "Cada coche",
          ja: "各車",
          zh: "每种车"
        },
        lines: ["p_1\\in[10^{3},10^{4.5}]p_0,\\quad p_2\\in[10^{2.5},10^{3}]p_0,\\quad p_3=10^2p_0"],
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
          en: "Compare",
          fr: "Comparer",
          es: "Comparar",
          ja: "比較",
          zh: "比较"
        },
        lines: ["p_1\\ge10^3p_0\\ge p_2,\\qquad p_2\\le10^3p_0=10p_3,\\qquad \\frac{p_1}{p_2}\\le\\frac{10^{4.5}}{10^{2.5}}=100"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam, $p_1\\le100p_2$ was the third true statement.",
          fr: "Dans l’épreuve, $p_1\\le100p_2$ était la troisième affirmation vraie.",
          es: "En el examen, $p_1\\le100p_2$ era la tercera afirmación verdadera.",
          ja: "原題では $p_1\\le100p_2$ も正しい選択肢だった。",
          zh: "原题中 $p_1\\le100p_2$ 也是正确选项。"
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
