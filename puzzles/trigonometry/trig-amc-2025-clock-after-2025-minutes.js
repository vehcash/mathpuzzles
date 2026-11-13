/* trigonometry · A clock 2025 minutes after midnight
   AMC 12B 2025 (Mathematical Association of America), Problem 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-amc-2025-clock-after-2025-minutes",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2025 (Mathematical Association of America), Problem 16",
        fr: "AMC 12B 2025 (Mathematical Association of America), problème 16",
        es: "AMC 12B 2025 (Mathematical Association of America), problema 16",
        ja: "AMC 12B 2025（アメリカ数学協会）第16問",
        zh: "AMC 12B 2025（美国数学协会）第 16 题"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "A clock 2025 minutes after midnight",
      fr: "Une horloge 2025 minutes après minuit",
      es: "Un reloj 2025 minutos después de medianoche",
      ja: "真夜中から2025分後の時計",
      zh: "午夜之后 2025 分钟的时钟"
    },
    statement: {
      en: "An analogue clock starts at midnight and runs for $2025$ minutes. <b>Which of the following equal the tangent of the acute angle between the hour and minute hands then?</b>",
      fr: "Une horloge à aiguilles part de minuit et tourne pendant $2025$ minutes. <b>Lesquelles des valeurs suivantes sont égales à la tangente de l’angle aigu entre les aiguilles à ce moment ?</b>",
      es: "Un reloj de agujas parte de medianoche y funciona $2025$ minutos. <b>¿Cuáles de los siguientes valores son iguales a la tangente del ángulo agudo entre las agujas en ese momento?</b>",
      ja: "アナログ時計が真夜中から $2025$ 分動きます。<b>そのときの長針と短針のなす鋭角の正接に等しいものはどれですか？</b>",
      zh: "指针式时钟从午夜开始走了 $2025$ 分钟。<b>下列哪些等于此时时针与分针所夹锐角的正切？</b>"
    },
    figureText: {
      en: "A clock face with twelve hour marks.",
      fr: "Un cadran avec douze repères horaires.",
      es: "Una esfera con doce marcas horarias.",
      ja: "12 の目盛りがある文字盤。",
      zh: "有十二个刻度的表盘。"
    },
    hint: {
      en: "$2025=33\\cdot60+45$, and $33$ hours on a $12$-hour dial is $9$. The hour hand moves $0.5^\\circ$ per minute.",
      fr: "$2025=33\\cdot60+45$, et $33$ heures sur un cadran de $12$ heures donnent $9$. L’aiguille des heures avance de $0{,}5^\\circ$ par minute.",
      es: "$2025=33\\cdot60+45$, y $33$ horas en una esfera de $12$ son las $9$. La aguja horaria avanza $0{,}5^\\circ$ por minuto.",
      ja: "$2025=33\\cdot60+45$、12時間表示で33時間は9時。短針は毎分 $0.5^\\circ$。",
      zh: "$2025=33\\cdot60+45$，12 小时表盘上 33 小时即 9 点；时针每分钟转 $0.5^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 3.2, scale: 70, pad: 16 });
      const c = [1.6, 1.6]; F.circle(c, 1.4, 'fill-yellow');
      for (let k = 0; k < 12; k++) { const t = Math.PI / 2 - k * Math.PI / 6; F.seg([1.6 + 1.2 * Math.cos(t), 1.6 + 1.2 * Math.sin(t)], [1.6 + 1.38 * Math.cos(t), 1.6 + 1.38 * Math.sin(t)], 'seg'); }
      F.reveal = () => {
      F.seg(c, [1.6 - 1.15, 1.6], 'graph'); const h = Math.PI / 2 - (9.75) * Math.PI / 6; F.seg(c, [1.6 + 0.8 * Math.cos(h), 1.6 + 0.8 * Math.sin(h)], 'hl pink'); F.text([0.9, 1.9], '22.5°', 'len small', 0, -4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "22.5°": {"fr": "22,5°", "es": "22,5°", "ja": "22.5°", "zh": "22.5°"},
      "min": {"fr": "min", "es": "min", "ja": "分", "zh": "分"},
      "h": {"fr": "h", "es": "h", "ja": "時間", "zh": "小时"}
    },
    options: [
      { tex: "\\sqrt2-1", correct: true, why: {
        en: "$\\tan22.5^\\circ=\\dfrac{\\sin45^\\circ}{1+\\cos45^\\circ}$",
        fr: "$\\tan22.5^\\circ=\\dfrac{\\sin45^\\circ}{1+\\cos45^\\circ}$",
        es: "$\\tan22.5^\\circ=\\dfrac{\\sin45^\\circ}{1+\\cos45^\\circ}$",
        ja: "$\\tan22.5^\\circ=\\dfrac{\\sin45^\\circ}{1+\\cos45^\\circ}$",
        zh: "$\\tan22.5^\\circ=\\dfrac{\\sin45^\\circ}{1+\\cos45^\\circ}$"
      } },
      { tex: "\\tan\\tfrac{\\pi}{8}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "0", correct: false, why: {
        en: "The hour hand is not on $9$ at $9{:}45$.",
        fr: "À $9\\,\\mathrm h\\,45$ l’aiguille des heures n’est pas sur $9$.",
        es: "A las $9{:}45$ la aguja horaria no está en el $9$.",
        ja: "9時45分の短針は9上にない。",
        zh: "9:45 时时针不在 9 上。"
      } },
      { tex: "2-\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt2}2", correct: false, why: {
        en: "That is $\\sin45^\\circ$; the angle is $22.5^\\circ$.",
        fr: "C’est $\\sin45^\\circ$ ; l’angle vaut $22{,}5^\\circ$.",
        es: "Es $\\sin45^\\circ$; el ángulo es $22{,}5^\\circ$.",
        ja: "$\\sin45^\\circ$。角は $22.5^\\circ$。",
        zh: "那是 $\\sin45^\\circ$，角为 $22.5^\\circ$。"
      } },
      { tex: "3-\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $\\tan45^\\circ$.",
        fr: "C’est $\\tan45^\\circ$.",
        es: "Es $\\tan45^\\circ$.",
        ja: "$\\tan45^\\circ$。",
        zh: "那是 $\\tan45^\\circ$。"
      } },
      { tex: "\\sqrt2+1", correct: false, why: {
        en: "That is $\\tan67.5^\\circ$, for the complementary angle.",
        fr: "C’est $\\tan67{,}5^\\circ$, l’angle complémentaire.",
        es: "Es $\\tan67{,}5^\\circ$, del ángulo complementario.",
        ja: "余角 $67.5^\\circ$ の正接。",
        zh: "那是余角 $67.5^\\circ$ 的正切。"
      } }
    ],
    steps: [
      {
        title: {
          en: "What time is it?",
          fr: "Quelle heure est-il ?",
          es: "¿Qué hora es?",
          ja: "何時か",
          zh: "几点了"
        },
        lines: ["2025\\ \\text{min}=33\\ \\text{h}\\ 45\\ \\text{min}\\Rightarrow 9{:}45"],
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
          en: "Angle and tangent",
          fr: "Angle et tangente",
          es: "Ángulo y tangente",
          ja: "角と正接",
          zh: "角与正切"
        },
        lines: ["\\tfrac34\\cdot30^\\circ=22.5^\\circ,\\quad\\tan22.5^\\circ=\\sqrt2-1"],
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
