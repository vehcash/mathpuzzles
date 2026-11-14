/* geometry · A hundred circles linked by tangent chords
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1B */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2022-hundred-circles",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1B",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1B",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1B",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1B",
        zh: "牛津大学数学入学考试 MAT 2022 第 1B 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "A hundred circles linked by tangent chords",
      fr: "Cent cercles reliés par des cordes tangentes",
      es: "Cien círculos unidos por cuerdas tangentes",
      ja: "接線の弦でつながる100個の円",
      zh: "由切线弦相连的一百个圆"
    },
    statement: {
      en: "Circles $C_1,\\dots,C_{100}$ share a centre and $C_1$ has radius $1$. For each $1\\le n\\le99$, a tangent line to $C_n$ meets $C_{n+1}$ at two points that are distance $2$ apart. <b>Which of the following are true?</b>",
      fr: "Les cercles $C_1,\\dots,C_{100}$ ont le même centre et $C_1$ a pour rayon $1$. Pour chaque $1\\le n\\le99$, une tangente à $C_n$ coupe $C_{n+1}$ en deux points distants de $2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las circunferencias $C_1,\\dots,C_{100}$ tienen el mismo centro y $C_1$ tiene radio $1$. Para cada $1\\le n\\le99$, una tangente a $C_n$ corta a $C_{n+1}$ en dos puntos a distancia $2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "円 $C_1,\\dots,C_{100}$ は中心を共有し、$C_1$ の半径は $1$ です。各 $1\\le n\\le99$ について、$C_n$ の接線が $C_{n+1}$ と交わる2点の距離は $2$ です。<b>次のうち正しいものはどれですか？</b>",
      zh: "圆 $C_1,\\dots,C_{100}$ 同心，$C_1$ 半径为 $1$。对每个 $1\\le n\\le99$，$C_n$ 的一条切线与 $C_{n+1}$ 交于相距 $2$ 的两点。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two concentric circles with a chord of the outer one touching the inner one.",
      fr: "Deux cercles concentriques et une corde du grand qui touche le petit.",
      es: "Dos circunferencias concéntricas y una cuerda de la mayor que toca la menor.",
      ja: "同心円2つと、内側の円に接する外側の円の弦。",
      zh: "两个同心圆，大圆的一条弦与小圆相切。"
    },
    hint: {
      en: "The radius to the tangent point is perpendicular to the chord and bisects it.",
      fr: "Le rayon vers le point de contact est perpendiculaire à la corde et la coupe en son milieu.",
      es: "El radio al punto de tangencia es perpendicular a la cuerda y la biseca.",
      ja: "接点への半径は弦に垂直で、弦を二等分する。",
      zh: "到切点的半径垂直平分这条弦。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.2, h: 4.4, scale: 48, pad: 16 });
      const O = [2.6, 2.0], r1 = 1.2, r2 = Math.sqrt(r1 * r1 + 1.44);
      F.circle(O, r1, 'seg'); F.circle(O, r2, 'seg thin');
      F.seg([O[0] - 1.2, O[1] + r1], [O[0] + 1.2, O[1] + r1], 'hl pink');
      F.seg(O, [O[0], O[1] + r1], 'seg thin dashc'); F.dot(O); F.text([O[0], O[1] + r1], '2', 'len small', 0, -12);
      F.text([O[0] - 0.25, O[1] + 0.5], 'rₙ', 'len small', 0, 0);
      F.reveal = () => {
      F.seg(O, [O[0] + 1.2, O[1] + r1], 'hl'); F.text([O[0] + 0.9, O[1] + 0.35], 'rₙ₊₁', 'len small', 0, 0);
      F.text([O[0] + 0.6, O[1] + r1], '1', 'len small', 0, 14);
      };
      return F;
    },
    options: [
      { tex: "r_{100}=10", correct: true, why: {
        en: "$r_n^2=n$",
        fr: "$r_n^2=n$",
        es: "$r_n^2=n$",
        ja: "$r_n^2=n$",
        zh: "$r_n^2=n$"
      } },
      { tex: "r_{n+1}^2=r_n^2+1", correct: true, why: {
        en: "Pythagoras with half-chord $1$.",
        fr: "Pythagore avec une demi-corde de $1$.",
        es: "Pitágoras con media cuerda $1$.",
        ja: "半弦 $1$ で三平方の定理。",
        zh: "半弦为 $1$ 的勾股定理。"
      } },
      { tex: "r_{100}=100", correct: false, why: {
        en: "Radii do not grow by $1$ each time; their squares do.",
        fr: "Ce ne sont pas les rayons qui augmentent de $1$, ce sont leurs carrés.",
        es: "No crecen los radios de $1$ en $1$, sino sus cuadrados.",
        ja: "$1$ ずつ増えるのは半径でなく半径の2乗。",
        zh: "每次加 $1$ 的是半径的平方而不是半径。"
      } },
      { tex: "r_{100}=\\sqrt{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_{100}=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "r_{n+1}^2=r_n^2+4", correct: false, why: {
        en: "That uses the whole chord $2$ instead of half of it.",
        fr: "Cela utilise la corde entière au lieu de sa moitié.",
        es: "Usa la cuerda entera en vez de su mitad.",
        ja: "半弦でなく弦全体を使っている。",
        zh: "误用了整条弦而非半弦。"
      } },
      { tex: "r_{100}=\\sqrt{99}", correct: false, why: {
        en: "Off by one: $r_1^2=1$, so $r_n^2=n$.",
        fr: "Décalage d’un cran : $r_1^2=1$ donc $r_n^2=n$.",
        es: "Error de uno: $r_1^2=1$, luego $r_n^2=n$.",
        ja: "1つずれ。$r_1^2=1$ より $r_n^2=n$。",
        zh: "差一：$r_1^2=1$，故 $r_n^2=n$。"
      } },
      { tex: "r_{50}=5", correct: false, why: {
        en: "$r_{50}=\\sqrt{50}=5\\sqrt2$",
        fr: "$r_{50}=\\sqrt{50}=5\\sqrt2$",
        es: "$r_{50}=\\sqrt{50}=5\\sqrt2$",
        ja: "$r_{50}=\\sqrt{50}=5\\sqrt2$",
        zh: "$r_{50}=\\sqrt{50}=5\\sqrt2$"
      } }
    ],
    steps: [
      {
        title: {
          en: "One step",
          fr: "Un pas",
          es: "Un paso",
          ja: "1ステップ",
          zh: "一步"
        },
        lines: ["r_{n+1}^2=r_n^2+1^2"],
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
          en: "Ninety-nine steps",
          fr: "Quatre-vingt-dix-neuf pas",
          es: "Noventa y nueve pasos",
          ja: "99ステップ",
          zh: "九十九步"
        },
        lines: ["r_{100}^2=1+99=100\\Rightarrow r_{100}=10"],
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
