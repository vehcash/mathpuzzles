/* trigonometry · sin²0° + sin²1° + … + sin²90°
   TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 20 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-tmua-2018-sum-of-sin-squared-degrees",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2018 (Test of Mathematics for University Admission, UK), Paper 1, Question 20",
        fr: "TMUA 2018 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 20",
        es: "TMUA 2018 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 20",
        ja: "イギリス大学入学数学試験 TMUA 2018 Paper 1 第20問",
        zh: "英国大学入学数学测试 TMUA 2018 试卷 1 第 20 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "sin²0° + sin²1° + … + sin²90°",
      fr: "sin²0° + sin²1° + … + sin²90°",
      es: "sen²0° + sen²1° + … + sen²90°",
      ja: "sin²0° + sin²1° + … + sin²90°",
      zh: "sin²0° + sin²1° + … + sin²90°"
    },
    statement: {
      en: "Let $S=\\displaystyle\\sum_{k=0}^{90}\\sin^2(k^\\circ)$. <b>Which of the following are true?</b>",
      fr: "Soit $S=\\displaystyle\\sum_{k=0}^{90}\\sin^2(k^\\circ)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $S=\\displaystyle\\sum_{k=0}^{90}\\sin^2(k^\\circ)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S=\\displaystyle\\sum_{k=0}^{90}\\sin^2(k^\\circ)$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $S=\\displaystyle\\sum_{k=0}^{90}\\sin^2(k^\\circ)$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Bars sin²k° rising from 0 to 1.",
      fr: "Des barres sin²k° qui montent de 0 à 1.",
      es: "Barras sen²k° que suben de 0 a 1.",
      ja: "0 から 1 へ増える棒 sin²k°。",
      zh: "从 0 增到 1 的条形 sin²k°。"
    },
    hint: {
      en: "Pair $k$ with $90-k$: $\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1$.",
      fr: "Associez $k$ et $90-k$ : $\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1$.",
      es: "Empareja $k$ con $90-k$: $\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1$.",
      ja: "$k$ と $90-k$ を組にする：$\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1$。",
      zh: "把 $k$ 与 $90-k$ 配对：$\\sin^2k^\\circ+\\sin^2(90-k)^\\circ=1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 2.0, scale: 46, pad: 16 });
      for (let k = 0; k <= 90; k += 3) F.rect(0.2 + k * 0.052, 0.2, 0.12, 0.01 + 1.5 * Math.sin(k * Math.PI / 180) ** 2, 'fill-blue', 'fills');
      F.reveal = () => {
      for (let k = 0; k <= 90; k += 3) F.rect(0.2 + k * 0.052, 0.2 + 1.5 * Math.sin(k * Math.PI / 180) ** 2, 0.12, 1.5 * Math.cos(k * Math.PI / 180) ** 2, 'fill-yellow', 'fills');
      };
      return F;
    },
    options: [
      { tex: "S=\\tfrac{91}2", correct: true, why: {
        en: "$2S=91$",
        fr: "$2S=91$",
        es: "$2S=91$",
        ja: "$2S=91$",
        zh: "$2S=91$"
      } },
      { tex: "S=45.5", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "S=45", correct: false, why: {
        en: "Counts 90 terms instead of 91.",
        fr: "Compte 90 termes au lieu de 91.",
        es: "Cuenta 90 términos en vez de 91.",
        ja: "91項でなく90項。",
        zh: "把 91 项算成 90 项。"
      } },
      { tex: "S=46", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=90", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=91", correct: false, why: {
        en: "Forgets to halve.",
        fr: "Oublie de diviser par 2.",
        es: "Olvida dividir entre 2.",
        ja: "2 で割り忘れ。",
        zh: "忘了除以 2。"
      } },
      { tex: "S=44.5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S=\\tfrac{89}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Reverse the sum",
          fr: "Renverser la somme",
          es: "Invertir la suma",
          ja: "和を逆順に",
          zh: "倒序相加"
        },
        lines: ["S=\\sum_{k=0}^{90}\\cos^2(k^\\circ)"],
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
          en: "Add",
          fr: "Additionner",
          es: "Sumar",
          ja: "足す",
          zh: "相加"
        },
        lines: ["2S=\\sum_{k=0}^{90}1=91\\Rightarrow S=45.5"],
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
