/* trigonometry · sin 10° + sin 100° + sin 190° + … (91 terms)
   TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 19 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2019-sines-in-steps-of-ninety",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2019 (Test of Mathematics for University Admission, UK), Paper 1, Question 19",
        fr: "TMUA 2019 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 19",
        es: "TMUA 2019 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 19",
        ja: "イギリス大学入学数学試験 TMUA 2019 Paper 1 第19問",
        zh: "英国大学入学数学测试 TMUA 2019 试卷 1 第 19 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "sin 10° + sin 100° + sin 190° + … (91 terms)",
      fr: "sin 10° + sin 100° + sin 190° + … (91 termes)",
      es: "sen 10° + sen 100° + sen 190° + … (91 términos)",
      ja: "sin 10° + sin 100° + sin 190° + …（91項）",
      zh: "sin 10° + sin 100° + sin 190° + …（91 项）"
    },
    statement: {
      en: "Let $S=\\displaystyle\\sum_{k=0}^{90}\\sin\\bigl((10+90k)^\\circ\\bigr)$. <b>Which of the following are true?</b>",
      fr: "Soit $S=\\displaystyle\\sum_{k=0}^{90}\\sin\\bigl((10+90k)^\\circ\\bigr)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $S=\\displaystyle\\sum_{k=0}^{90}\\sin\\bigl((10+90k)^\\circ\\bigr)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S=\\displaystyle\\sum_{k=0}^{90}\\sin\\bigl((10+90k)^\\circ\\bigr)$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S=\\displaystyle\\sum_{k=0}^{90}\\sin\\bigl((10+90k)^\\circ\\bigr)$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Four points on the unit circle, a quarter turn apart.",
      fr: "Quatre points du cercle unité, à un quart de tour d’écart.",
      es: "Cuatro puntos de la circunferencia unidad separados un cuarto de vuelta.",
      ja: "単位円上で4分の1回転ずつ離れた4点。",
      zh: "单位圆上相隔四分之一圈的四个点。"
    },
    hint: {
      en: "The terms repeat with period $4$ and each block of $4$ sums to $0$.",
      fr: "Les termes se répètent avec une période $4$ et chaque bloc de $4$ a pour somme $0$.",
      es: "Los términos se repiten con periodo $4$ y cada bloque de $4$ suma $0$.",
      ja: "項は周期 $4$ で繰り返し、4項ごとの和は $0$。",
      zh: "各项以 $4$ 为周期，每 $4$ 项之和为 $0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 46, pad: 16 });
      F.circle([1.7, 1.7], 1.3, 'graph'); F.seg([0.2, 1.7], [3.2, 1.7], 'axis'); F.seg([1.7, 0.2], [1.7, 3.2], 'axis');
      [10, 100, 190, 280].forEach(a => { const t = a * Math.PI / 180; F.dot([1.7 + 1.3 * Math.cos(t), 1.7 + 1.3 * Math.sin(t)]); });
      F.reveal = () => {
      [10, 100, 190].forEach(a => { const t = a * Math.PI / 180; F.seg([1.7, 1.7], [1.7 + 1.3 * Math.cos(t), 1.7 + 1.3 * Math.sin(t)], 'hl pink'); });
      };
      return F;
    },
    options: [
      { tex: "S=\\sin100^\\circ", correct: true, why: {
        en: "$\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ$",
        fr: "$\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ$",
        es: "$\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ$",
        ja: "$\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ$",
        zh: "$\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ$"
      } },
      { tex: "S=\\cos10^\\circ", correct: true, why: {
        en: "$\\sin100^\\circ=\\cos10^\\circ$",
        fr: "$\\sin100^\\circ=\\cos10^\\circ$",
        es: "$\\sin100^\\circ=\\cos10^\\circ$",
        ja: "$\\sin100^\\circ=\\cos10^\\circ$",
        zh: "$\\sin100^\\circ=\\cos10^\\circ$"
      } },
      { tex: "S=0", correct: false, why: {
        en: "91 is not a multiple of 4.",
        fr: "91 n’est pas multiple de 4.",
        es: "91 no es múltiplo de 4.",
        ja: "91 は 4 の倍数でない。",
        zh: "91 不是 4 的倍数。"
      } },
      { tex: "S=\\sin10^\\circ", correct: false, why: {
        en: "Leaves one term instead of three.",
        fr: "Garde un terme au lieu de trois.",
        es: "Deja un término en vez de tres.",
        ja: "残りを3項でなく1項にした。",
        zh: "只剩一项而非三项。"
      } },
      { tex: "S=-\\sin10^\\circ", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\sin10^\\circ+\\cos10^\\circ", correct: false, why: {
        en: "Leaves two terms.",
        fr: "Garde deux termes.",
        es: "Deja dos términos.",
        ja: "2項残した。",
        zh: "剩两项。"
      } },
      { tex: "S=-\\cos10^\\circ", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Blocks of four",
          fr: "Blocs de quatre",
          es: "Bloques de cuatro",
          ja: "4項ずつ",
          zh: "每四项一组"
        },
        lines: ["\\sin\\theta+\\cos\\theta-\\sin\\theta-\\cos\\theta=0;\\ 91=4\\cdot22+3"],
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
          en: "Leftover",
          fr: "Reste",
          es: "Resto",
          ja: "残り",
          zh: "剩余"
        },
        lines: ["S=\\sin10^\\circ+\\sin100^\\circ+\\sin190^\\circ=\\sin100^\\circ"],
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
