/* geometry · Lines tangent to two unit circles
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1J */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2022-common-tangent-lines",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1J",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1J",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1J",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1J",
        zh: "牛津大学数学入学考试 MAT 2022 第 1J 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Lines tangent to two unit circles",
      fr: "Droites tangentes à deux cercles unité",
      es: "Rectas tangentes a dos circunferencias unidad",
      ja: "2つの単位円に接する直線",
      zh: "与两个单位圆都相切的直线"
    },
    statement: {
      en: "How many lines $y=mx+c$ are there such that $x^2+(mx+c)^2=1$ has a repeated root <i>and</i> $(x-3)^2+(mx+c-1)^2=1$ has a repeated root? <b>Which of the following are true?</b>",
      fr: "Combien y a-t-il de droites $y=mx+c$ telles que $x^2+(mx+c)^2=1$ ait une racine double <i>et</i> $(x-3)^2+(mx+c-1)^2=1$ ait une racine double ? <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "¿Cuántas rectas $y=mx+c$ hay tales que $x^2+(mx+c)^2=1$ tiene una raíz doble <i>y</i> $(x-3)^2+(mx+c-1)^2=1$ tiene una raíz doble? <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$x^2+(mx+c)^2=1$ が重解をもち、<i>かつ</i> $(x-3)^2+(mx+c-1)^2=1$ も重解をもつような直線 $y=mx+c$ はいくつありますか。<b>次のうち正しいものはどれですか？</b>",
      zh: "使 $x^2+(mx+c)^2=1$ 有重根<i>且</i> $(x-3)^2+(mx+c-1)^2=1$ 也有重根的直线 $y=mx+c$ 有几条？<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two unit circles, centred at (0, 0) and (3, 1).",
      fr: "Deux cercles unité, de centres (0, 0) et (3, 1).",
      es: "Dos circunferencias unidad, con centros (0, 0) y (3, 1).",
      ja: "中心 (0, 0) と (3, 1) の2つの単位円。",
      zh: "圆心为 (0, 0) 与 (3, 1) 的两个单位圆。"
    },
    hint: {
      en: "A repeated root means the line touches the circle. So count common tangents of two circles, then remove vertical ones.",
      fr: "Une racine double signifie que la droite touche le cercle. Comptez les tangentes communes, puis retirez les verticales.",
      es: "Una raíz doble significa que la recta toca la circunferencia. Cuenta las tangentes comunes y quita las verticales.",
      ja: "重解とは直線が円に接すること。共通接線を数え、鉛直なものを除く。",
      zh: "重根即直线与圆相切。数两圆公切线，再去掉竖直的。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 4.2, scale: 52, pad: 16 });
      const T = F.T = axes(F, -1.4, 4.6, -1.4, 2.6);
      F.circle(T([0, 0]), 1, 'seg'); F.circle(T([3, 1]), 1, 'seg'); F.dot(T([0, 0])); F.dot(T([3, 1]));
      F.reveal = () => {
      const d = Math.sqrt(10), th = Math.atan2(1, 3);
      const line = (A, B, cls) => { const u = [B[0] - A[0], B[1] - A[1]], L = Math.hypot(u[0], u[1]), e = [u[0] / L * 0.7, u[1] / L * 0.7]; F.seg(T([A[0] - e[0], A[1] - e[1]]), T([B[0] + e[0], B[1] + e[1]]), cls); };
      [1, -1].forEach(sg => { const n = [-Math.sin(th) * sg, Math.cos(th) * sg]; line(n, [3 + n[0], 1 + n[1]], 'hl pink'); });
      const a = Math.asin(2 / d);
      [th + a, th - a].forEach(t => { let n = [Math.sin(t), -Math.cos(t)]; if (1.5 * n[0] + 0.5 * n[1] < 0) n = [-n[0], -n[1]]; line(n, [3 - n[0], 1 - n[1]], 'hl'); });
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a repeated root means the line is tangent": {"fr": "une racine double signifie que la droite est tangente", "es": "una raíz doble significa que la recta es tangente", "ja": "重解とは直線が接すること", "zh": "重根意味着直线相切"},
      "is one of the lines": {"fr": "est l’une des droites", "es": "es una de las rectas", "ja": "はその直線の1つ", "zh": "是其中一条"},
      "the line": {"fr": "la droite", "es": "la recta", "ja": "直線", "zh": "直线"},
      "is one of them": {"fr": "en fait partie", "es": "es una de ellas", "ja": "はその1つ", "zh": "是其中之一"},
      "repeated root": {"fr": "racine double", "es": "raíz doble", "ja": "重解", "zh": "重根"},
      "tangent to the circle": {"fr": "tangente au cercle", "es": "tangente a la circunferencia", "ja": "円に接する", "zh": "与圆相切"},
      "outer": {"fr": "extérieures", "es": "exteriores", "ja": "外側", "zh": "外"},
      "inner": {"fr": "intérieures", "es": "interiores", "ja": "内側", "zh": "内"}
    },
    options: [
      { tex: "4", correct: true, why: {
        en: "The circles are disjoint (centres $\\sqrt{10}>2$ apart), so they have $4$ common tangents, none vertical.",
        fr: "Les cercles sont disjoints (centres à $\\sqrt{10}>2$), donc $4$ tangentes communes, aucune verticale.",
        es: "Las circunferencias son disjuntas (centros a $\\sqrt{10}>2$), luego $4$ tangentes comunes, ninguna vertical.",
        ja: "中心間 $\\sqrt{10}>2$ で離れているので共通接線は4本、鉛直なものはない。",
        zh: "两圆相离（圆心距 $\\sqrt{10}>2$），有 $4$ 条公切线，且都不竖直。"
      } },
      { tex: "\\text{a repeated root means the line is tangent}", correct: true, why: {
        en: "The line meets the circle in exactly one point.",
        fr: "La droite coupe le cercle en un seul point.",
        es: "La recta corta la circunferencia en un solo punto.",
        ja: "直線と円の共有点がちょうど1つ。",
        zh: "直线与圆只有一个交点。"
      } },
      { tex: "2", correct: false, why: {
        en: "Counts only the two outer tangents.",
        fr: "Ne compte que les deux tangentes extérieures.",
        es: "Solo cuenta las dos tangentes exteriores.",
        ja: "外側の接線2本だけ。",
        zh: "只数了两条外公切线。"
      } },
      { tex: "3", correct: false, why: {
        en: "Three common tangents happen only when the circles touch.",
        fr: "Trois tangentes communes seulement si les cercles se touchent.",
        es: "Tres tangentes comunes solo si las circunferencias se tocan.",
        ja: "3本になるのは2円が接するときだけ。",
        zh: "只有两圆外切时才有 3 条。"
      } },
      { tex: "0", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "x=1\\ \\text{is one of the lines}", correct: false, why: {
        en: "It is vertical, so not of the form $y=mx+c$; nor does it touch the second circle.",
        fr: "Elle est verticale, donc pas de la forme $y=mx+c$ ; elle ne touche pas non plus le second cercle.",
        es: "Es vertical, no de la forma $y=mx+c$; tampoco toca la segunda.",
        ja: "鉛直なので $y=mx+c$ の形でなく、2つ目の円にも接しない。",
        zh: "它竖直，不是 $y=mx+c$ 形式，也不与第二个圆相切。"
      } },
      { tex: "\\text{the line}\\ y=\\tfrac13x+1\\ \\text{is one of them}", correct: false, why: {
        en: "Its distance from the origin is $\\tfrac{3}{\\sqrt{10}}\\ne1$; the outer tangents are $y=\\tfrac13x\\pm\\tfrac{\\sqrt{10}}3$.",
        fr: "Sa distance à l’origine est $\\tfrac{3}{\\sqrt{10}}\\ne1$ ; les tangentes extérieures sont $y=\\tfrac13x\\pm\\tfrac{\\sqrt{10}}3$.",
        es: "Su distancia al origen es $\\tfrac{3}{\\sqrt{10}}\\ne1$; las tangentes exteriores son $y=\\tfrac13x\\pm\\tfrac{\\sqrt{10}}3$.",
        ja: "原点からの距離は $\\tfrac{3}{\\sqrt{10}}\\ne1$。外側の接線は $y=\\tfrac13x\\pm\\tfrac{\\sqrt{10}}3$。",
        zh: "它到原点距离为 $\\tfrac{3}{\\sqrt{10}}\\ne1$；外公切线为 $y=\\tfrac13x\\pm\\tfrac{\\sqrt{10}}3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Translate",
          fr: "Traduire",
          es: "Traducir",
          ja: "言い換える",
          zh: "转化"
        },
        lines: ["\\text{repeated root}\\iff \\text{tangent to the circle}"],
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
          en: "Count common tangents",
          fr: "Compter les tangentes communes",
          es: "Contar tangentes comunes",
          ja: "共通接線を数える",
          zh: "数公切线"
        },
        lines: ["d=\\sqrt{10}>1+1\\Rightarrow 2\\ \\text{outer}+2\\ \\text{inner}=4"],
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
