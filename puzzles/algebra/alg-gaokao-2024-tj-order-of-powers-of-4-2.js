/* algebra · Ordering three numbers built from 4.2
   Gaokao 2024, Tianjin paper (天津卷), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2024-tj-order-of-powers-of-4-2",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 5",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 5",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 5",
        ja: "2024年 中国・高考 天津卷 第5問",
        zh: "2024年高考数学天津卷 第5题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Ordering three numbers built from 4.2",
      fr: "Ranger trois nombres construits sur 4,2",
      es: "Ordenar tres números hechos con 4,2",
      ja: "4.2 から作った3つの数の大小",
      zh: "由 4.2 构成的三个数比大小"
    },
    statement: {
      en: "$a=4.2^{-0.2}$, $b=4.2^{0.2}$, $c=\\log_{4.2}0.2$. <b>Which of the following are true?</b>",
      fr: "$a=4{,}2^{-0{,}2}$, $b=4{,}2^{0{,}2}$, $c=\\log_{4{,}2}0{,}2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$a=4{,}2^{-0{,}2}$, $b=4{,}2^{0{,}2}$, $c=\\log_{4{,}2}0{,}2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a=4.2^{-0.2}$、$b=4.2^{0.2}$、$c=\\log_{4.2}0.2$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a=4.2^{-0.2}$，$b=4.2^{0.2}$，$c=\\log_{4.2}0.2$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A number line with 0 and 1 marked, the two landmarks for comparing a, b and c.",
      fr: "Une droite graduée avec 0 et 1, les deux repères pour comparer a, b et c.",
      es: "Una recta numérica con 0 y 1 marcados, las dos referencias para comparar a, b y c.",
      ja: "a, b, c を比べる目印 0 と 1 を記した数直線。",
      zh: "标出 0 和 1 的数轴，用来比较 a、b、c。"
    },
    hint: {
      en: "Compare each number with $0$ and with $1$.",
      fr: "Comparez chaque nombre à $0$ et à $1$.",
      es: "Compara cada número con $0$ y con $1$.",
      ja: "各数を $0$ と $1$ と比べる。",
      zh: "把每个数与 $0$、$1$ 比较。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 1.6, scale: 50, pad: 16 });
      const X = v => 2.2 + 1.6 * v; F.seg([0.2, 0.6], [6.2, 0.6], 'axis');
      [[0, '0'], [1, '1']].forEach(([v, t]) => { F.seg([X(v), 0.5], [X(v), 0.7], 'seg'); F.text([X(v), 0.6], t, 'tick', 0, 14); });
      F.reveal = () => {
      [[Math.log(0.2) / Math.log(4.2), 'c'], [4.2 ** -0.2, 'a'], [4.2 ** 0.2, 'b']].forEach(([v, t]) => { F.dot([X(v), 0.6]); F.text([X(v), 0.6], t, 'pt', 0, -12); });
      };
      return F;
    },
    options: [
      { tex: "c<a<b", correct: true, why: {
        en: "$c<0<a<1<b$.",
        fr: "$c<0<a<1<b$.",
        es: "$c<0<a<1<b$.",
        ja: "$c<0<a<1<b$。",
        zh: "$c<0<a<1<b$。"
      } },
      { tex: "ab=1", correct: true, why: {
        en: "$4.2^{-0.2}\\cdot4.2^{0.2}=4.2^0$.",
        fr: "$4{,}2^{-0{,}2}\\cdot4{,}2^{0{,}2}=4{,}2^0$.",
        es: "$4{,}2^{-0{,}2}\\cdot4{,}2^{0{,}2}=4{,}2^0$.",
        ja: "$4.2^{-0.2}\\cdot4.2^{0.2}=4.2^0$。",
        zh: "$4.2^{-0.2}\\cdot4.2^{0.2}=4.2^0$。"
      } },
      { tex: "a<b<c", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a<c<b", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c<b<a", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "c>0", correct: false, why: {
        en: "$0.2<1$ and the base is $>1$, so the log is negative.",
        fr: "$0{,}2<1$ et la base est $>1$ : le log est négatif.",
        es: "$0{,}2<1$ y la base es $>1$: el logaritmo es negativo.",
        ja: "$0.2<1$ で底 $>1$ なので負。",
        zh: "$0.2<1$ 且底数 $>1$，对数为负。"
      } },
      { tex: "a>1", correct: false, why: {
        en: "A positive base above $1$ to a negative power is below $1$.",
        fr: "Une base $>1$ à une puissance négative donne moins de $1$.",
        es: "Una base $>1$ elevada a un exponente negativo da menos de $1$.",
        ja: "底 $>1$ の負の累乗は $1$ 未満。",
        zh: "底数大于 $1$ 的负次幂小于 $1$。"
      } },
      { tex: "a+b=2", correct: false, why: {
        en: "$a+b>2\\sqrt{ab}=2$ since $a\\ne b$.",
        fr: "$a+b>2\\sqrt{ab}=2$ car $a\\ne b$.",
        es: "$a+b>2\\sqrt{ab}=2$ porque $a\\ne b$.",
        ja: "$a\\ne b$ なので $a+b>2\\sqrt{ab}=2$。",
        zh: "因 $a\\ne b$，$a+b>2\\sqrt{ab}=2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Compare with 1",
          fr: "Comparer à 1",
          es: "Comparar con 1",
          ja: "1 と比べる",
          zh: "与 1 比较"
        },
        lines: ["4.2>1:\\quad a=4.2^{-0.2}<1<4.2^{0.2}=b"],
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
          en: "Compare with 0",
          fr: "Comparer à 0",
          es: "Comparar con 0",
          ja: "0 と比べる",
          zh: "与 0 比较"
        },
        lines: ["c=\\log_{4.2}0.2<\\log_{4.2}1=0<a", "\\boxed{c<a<b}"],
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
