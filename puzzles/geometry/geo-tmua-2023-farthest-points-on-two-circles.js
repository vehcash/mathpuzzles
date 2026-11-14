/* geometry · The longest segment between two circles
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-tmua-2023-farthest-points-on-two-circles",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 13",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 13",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 13",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第13問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 13 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "The longest segment between two circles",
      fr: "Le plus long segment entre deux cercles",
      es: "El segmento más largo entre dos circunferencias",
      ja: "2円の点を結ぶ最長の線分",
      zh: "两圆上两点间的最长线段"
    },
    statement: {
      en: "$P$ lies on $(x-2)^2+(y-1)^2=16$ and $Q$ lies on $(x-4)^2+(y+5)^2=16$. Let $L$ be the largest possible length of $PQ$. <b>Which of the following are true?</b>",
      fr: "$P$ est sur $(x-2)^2+(y-1)^2=16$ et $Q$ sur $(x-4)^2+(y+5)^2=16$. Soit $L$ la plus grande longueur possible de $PQ$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P$ está en $(x-2)^2+(y-1)^2=16$ y $Q$ en $(x-4)^2+(y+5)^2=16$. Sea $L$ la mayor longitud posible de $PQ$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P$ は $(x-2)^2+(y-1)^2=16$ 上、$Q$ は $(x-4)^2+(y+5)^2=16$ 上の点。$PQ$ の最大の長さを $L$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$P$ 在 $(x-2)^2+(y-1)^2=16$ 上，$Q$ 在 $(x-4)^2+(y+5)^2=16$ 上，设 $PQ$ 最大长度为 $L$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two overlapping circles of radius 4 and the line through their centres.",
      fr: "Deux cercles de rayon 4 qui se chevauchent et la droite des centres.",
      es: "Dos circunferencias de radio 4 superpuestas y la recta de los centros.",
      ja: "重なる半径4の2円と中心を結ぶ直線。",
      zh: "两个相交的半径 4 的圆及连心线。"
    },
    hint: {
      en: "The farthest pair lies on the line through the centres: $L=d+r_1+r_2$.",
      fr: "Les points les plus éloignés sont sur la droite des centres : $L=d+r_1+r_2$.",
      es: "Los puntos más alejados están en la recta de los centros: $L=d+r_1+r_2$.",
      ja: "最遠の2点は中心を結ぶ直線上：$L=d+r_1+r_2$。",
      zh: "最远两点在连心线上：$L=d+r_1+r_2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 5.4, scale: 38, pad: 16 });
      const S = ([x, y]) => [0.2 + (x + 2.5) * 0.36, (y + 9.5) * 0.36];
      F.circle(S([2, 1]), 4 * 0.36, 'graph'); F.circle(S([4, -5]), 4 * 0.36, 'graph'); F.dot(S([2, 1])); F.dot(S([4, -5]));
      F.seg(S([1.0, 4.0]), S([5.0, -8.0]), 'seg thin dashc');
      F.reveal = () => {
      const u = [2 / Math.sqrt(40), -6 / Math.sqrt(40)]; const P = [2 - 4 * u[0], 1 - 4 * u[1]], Q = [4 + 4 * u[0], -5 + 4 * u[1]];
      F.seg(S(P), S(Q), 'hl pink'); F.dot(S(P)); F.dot(S(Q)); F.text(S(P), 'P', 'pt', -10, -6); F.text(S(Q), 'Q', 'pt', 10, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the centres are": {"fr": "les centres sont à", "es": "los centros están a", "ja": "中心間の距離は", "zh": "圆心相距"},
      "apart": {"fr": "d’écart", "es": "de distancia", "ja": "の距離", "zh": "的距离"},
      "the circles do not meet": {"fr": "les cercles ne se coupent pas", "es": "las circunferencias no se cortan", "ja": "2円は交わらない", "zh": "两圆不相交"}
    },
    options: [
      { tex: "L=8+2\\sqrt{10}", correct: true, why: {
        en: "$\\sqrt{2^2+6^2}+4+4$",
        fr: "$\\sqrt{2^2+6^2}+4+4$",
        es: "$\\sqrt{2^2+6^2}+4+4$",
        ja: "$\\sqrt{2^2+6^2}+4+4$",
        zh: "$\\sqrt{2^2+6^2}+4+4$"
      } },
      { tex: "\\text{the centres are}\\ 2\\sqrt{10}\\ \\text{apart}", correct: true, why: {
        en: "$\\sqrt{4+36}=\\sqrt{40}$",
        fr: "$\\sqrt{4+36}=\\sqrt{40}$",
        es: "$\\sqrt{4+36}=\\sqrt{40}$",
        ja: "$\\sqrt{4+36}=\\sqrt{40}$",
        zh: "$\\sqrt{4+36}=\\sqrt{40}$"
      } },
      { tex: "L=16", correct: false, why: {
        en: "Twice a diameter: ignores the distance between centres.",
        fr: "Deux diamètres : oublie la distance entre centres.",
        es: "Dos diámetros: olvida la distancia entre centros.",
        ja: "直径2つ分で中心間距離を無視。",
        zh: "两倍直径，忽略了圆心距。"
      } },
      { tex: "L=2\\sqrt{34}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "L=10\\sqrt2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "L=14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "L=2\\sqrt{10}", correct: false, why: {
        en: "That is just the distance between the centres.",
        fr: "C’est seulement la distance des centres.",
        es: "Es solo la distancia entre centros.",
        ja: "中心間距離だけ。",
        zh: "那只是圆心距。"
      } },
      { tex: "\\text{the circles do not meet}", correct: false, why: {
        en: "$2\\sqrt{10}\\approx6.3<8$",
        fr: "$2\\sqrt{10}\\approx6.3<8$",
        es: "$2\\sqrt{10}\\approx6.3<8$",
        ja: "$2\\sqrt{10}\\approx6.3<8$",
        zh: "$2\\sqrt{10}\\approx6.3<8$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Centres",
          fr: "Centres",
          es: "Centros",
          ja: "中心",
          zh: "圆心"
        },
        lines: ["(2,1),\\ (4,-5):\\ d=\\sqrt{40}=2\\sqrt{10}"],
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
          en: "Farthest points",
          fr: "Points les plus éloignés",
          es: "Puntos más alejados",
          ja: "最遠の点",
          zh: "最远点"
        },
        lines: ["L=d+4+4=8+2\\sqrt{10}"],
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
