/* probability · A dart landing in a ring inside a diamond
   AMC 12B 2024 (Mathematical Association of America), Problem 9 (also AMC 10B Problem 14) */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-amc-2024-dart-in-ring-inside-diamond",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "AMC 12B 2024 (Mathematical Association of America), Problem 9 (also AMC 10B Problem 14)",
        fr: "AMC 12B 2024 (Mathematical Association of America), problème 9 (aussi AMC 10B, problème 14)",
        es: "AMC 12B 2024 (Mathematical Association of America), problema 9 (también AMC 10B, problema 14)",
        ja: "AMC 12B 2024（アメリカ数学協会）第9問（AMC 10B 第14問と共通）",
        zh: "AMC 12B 2024（美国数学协会）第 9 题（亦为 AMC 10B 第 14 题）"
      },
      exams: ["amc"]
    },
    difficulty: 2,
    title: {
      en: "A dart landing in a ring inside a diamond",
      fr: "Une fléchette dans un anneau à l’intérieur d’un losange",
      es: "Un dardo en un anillo dentro de un rombo",
      ja: "ひし形の中のリングに当たるダーツ",
      zh: "飞镖落在菱形内的圆环中"
    },
    statement: {
      en: "A dart lands uniformly at random in the board $|x|+|y|\\le8$. The target is $(x^2+y^2-25)^2\\le49$. <b>Which of the following are true?</b>",
      fr: "Une fléchette tombe uniformément au hasard dans la cible $|x|+|y|\\le8$. La zone visée est $(x^2+y^2-25)^2\\le49$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un dardo cae al azar de forma uniforme en el tablero $|x|+|y|\\le8$. El objetivo es $(x^2+y^2-25)^2\\le49$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "ダーツが盤 $|x|+|y|\\le8$ に一様に当たります。的は $(x^2+y^2-25)^2\\le49$。<b>次のうち正しいものはどれですか？</b>",
      zh: "飞镖均匀随机地落在 $|x|+|y|\\le8$ 的板上，目标区域为 $(x^2+y^2-25)^2\\le49$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The diamond |x| + |y| ≤ 8 with a ring centred at the origin inside it.",
      fr: "Le losange |x| + |y| ≤ 8 avec un anneau centré à l’origine à l’intérieur.",
      es: "El rombo |x| + |y| ≤ 8 con un anillo centrado en el origen dentro.",
      ja: "ひし形 |x| + |y| ≤ 8 と原点中心のリング。",
      zh: "菱形 |x| + |y| ≤ 8 内有以原点为中心的圆环。"
    },
    hint: {
      en: "The target is $18\\le x^2+y^2\\le32$. Check that the outer circle fits in the diamond.",
      fr: "La zone est $18\\le x^2+y^2\\le32$. Vérifiez que le grand cercle tient dans le losange.",
      es: "El objetivo es $18\\le x^2+y^2\\le32$. Comprueba que el círculo exterior cabe en el rombo.",
      ja: "的は $18\\le x^2+y^2\\le32$。外側の円がひし形に収まるか確認。",
      zh: "目标为 $18\\le x^2+y^2\\le32$，检查外圆是否在菱形内。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 60, pad: 16 });
      const c = [1.8, 1.8], s = 0.2;
      F.path([[1.8, 0.2], [3.4, 1.8], [1.8, 3.4], [0.2, 1.8]], 'seg', 'base', true);
      F.circle(c, Math.sqrt(32) * s, 'fill-yellow'); F.circle(c, Math.sqrt(18) * s, 'fill-blue');
      F.reveal = () => {
      F.text(c, '14π / 128', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "14π / 128": {"fr": "14π / 128", "es": "14π / 128", "ja": "14π / 128", "zh": "14π / 128"},
      "the outer circle touches the board’s edges": {"fr": "le grand cercle touche les bords de la cible", "es": "el círculo exterior toca los bordes del tablero", "ja": "外側の円は盤の辺に接する", "zh": "外圆与板边相切"},
      "the target is the disc": {"fr": "la zone est le disque", "es": "el objetivo es el disco", "ja": "的は円板", "zh": "目标是圆盘"},
      "the board has area": {"fr": "la cible a pour aire", "es": "el tablero tiene área", "ja": "盤の面積は", "zh": "板面积为"},
      "part of the ring lies outside the board": {"fr": "une partie de l’anneau sort de la cible", "es": "parte del anillo queda fuera del tablero", "ja": "リングの一部は盤の外", "zh": "圆环有一部分在板外"}
    },
    options: [
      { tex: "P=\\tfrac{7\\pi}{64}", correct: true, why: {
        en: "$\\dfrac{\\pi(32-18)}{\\tfrac12\\cdot16\\cdot16}$",
        fr: "$\\dfrac{\\pi(32-18)}{\\tfrac12\\cdot16\\cdot16}$",
        es: "$\\dfrac{\\pi(32-18)}{\\tfrac12\\cdot16\\cdot16}$",
        ja: "$\\dfrac{\\pi(32-18)}{\\tfrac12\\cdot16\\cdot16}$",
        zh: "$\\dfrac{\\pi(32-18)}{\\tfrac12\\cdot16\\cdot16}$"
      } },
      { tex: "\\text{the outer circle touches the board’s edges}", correct: true, why: {
        en: "$d(O,\\ x+y=8)=\\tfrac8{\\sqrt2}=\\sqrt{32}$",
        fr: "$d(O,\\ x+y=8)=\\tfrac8{\\sqrt2}=\\sqrt{32}$",
        es: "$d(O,\\ x+y=8)=\\tfrac8{\\sqrt2}=\\sqrt{32}$",
        ja: "$d(O,\\ x+y=8)=\\tfrac8{\\sqrt2}=\\sqrt{32}$",
        zh: "$d(O,\\ x+y=8)=\\tfrac8{\\sqrt2}=\\sqrt{32}$"
      } },
      { tex: "P=\\tfrac{7\\pi}{32}", correct: false, why: {
        en: "The board’s area is $128$, not $64$.",
        fr: "L’aire de la cible vaut $128$, pas $64$.",
        es: "El área del tablero es $128$, no $64$.",
        ja: "盤の面積は $128$。",
        zh: "板面积是 $128$。"
      } },
      { tex: "P=\\tfrac{\\pi}{4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "P=\\tfrac{49\\pi}{256}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{the target is the disc}\\ x^2+y^2\\le74", correct: false, why: {
        en: "$|x^2+y^2-25|\\le7$ is a ring, $18\\le r^2\\le32$.",
        fr: "$|x^2+y^2-25|\\le7$ est un anneau, $18\\le r^2\\le32$.",
        es: "$|x^2+y^2-25|\\le7$ es un anillo, $18\\le r^2\\le32$.",
        ja: "$|x^2+y^2-25|\\le7$ はリング $18\\le r^2\\le32$。",
        zh: "$|x^2+y^2-25|\\le7$ 是圆环 $18\\le r^2\\le32$。"
      } },
      { tex: "\\text{the board has area}\\ 256", correct: false, why: {
        en: "$\\tfrac12\\cdot16\\cdot16=128$",
        fr: "$\\tfrac12\\cdot16\\cdot16=128$",
        es: "$\\tfrac12\\cdot16\\cdot16=128$",
        ja: "$\\tfrac12\\cdot16\\cdot16=128$",
        zh: "$\\tfrac12\\cdot16\\cdot16=128$"
      } },
      { tex: "\\text{part of the ring lies outside the board}", correct: false, why: {
        en: "The outer circle is the board’s incircle.",
        fr: "Le grand cercle est le cercle inscrit de la cible.",
        es: "El círculo exterior es el inscrito del tablero.",
        ja: "外側の円は盤の内接円。",
        zh: "外圆是板的内切圆。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Unpack the target",
          fr: "Déchiffrer la zone",
          es: "Interpretar el objetivo",
          ja: "的を読み解く",
          zh: "解读目标"
        },
        lines: ["|x^2+y^2-25|\\le7\\iff18\\le x^2+y^2\\le32"],
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
          en: "Ratio of areas",
          fr: "Rapport d’aires",
          es: "Razón de áreas",
          ja: "面積比",
          zh: "面积比"
        },
        lines: ["\\frac{14\\pi}{128}=\\frac{7\\pi}{64}"],
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
