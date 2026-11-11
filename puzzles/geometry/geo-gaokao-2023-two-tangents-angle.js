/* geometry · The angle between two tangents
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-two-tangents-angle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 6",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 6",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 6",
        ja: "2023年 中国・高考 新課程標準I卷 第6問",
        zh: "2023年高考数学新课标I卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "The angle between two tangents",
      fr: "L’angle entre deux tangentes",
      es: "El ángulo entre dos tangentes",
      ja: "2本の接線のなす角",
      zh: "两切线的夹角"
    },
    statement: {
      en: "Two tangents are drawn from $(0,-2)$ to the circle $x^2+y^2-4x-1=0$, and $\\alpha$ is the angle between them. <b>Which of the following equal $\\sin\\alpha$?</b>",
      fr: "Depuis $(0,-2)$ on mène deux tangentes au cercle $x^2+y^2-4x-1=0$ ; $\\alpha$ est l’angle qu’elles forment. <b>Lesquelles des valeurs suivantes sont égales à $\\sin\\alpha$ ?</b>",
      es: "Desde $(0,-2)$ se trazan dos tangentes a la circunferencia $x^2+y^2-4x-1=0$, y $\\alpha$ es el ángulo entre ellas. <b>¿Cuáles de los siguientes valores son iguales a $\\sin\\alpha$?</b>",
      ja: "点 $(0,-2)$ から円 $x^2+y^2-4x-1=0$ に2本の接線を引き、そのなす角を $\\alpha$ とします。<b>$\\sin\\alpha$ に等しいものはどれですか？</b>",
      zh: "过点 $(0,-2)$ 作圆 $x^2+y^2-4x-1=0$ 的两条切线，夹角为 $\\alpha$。<b>下列哪些等于 $\\sin\\alpha$？</b>"
    },
    figureText: {
      en: "The circle with centre (2, 0) and the point P(0, −2) outside it.",
      fr: "Le cercle de centre (2, 0) et le point P(0, −2) à l’extérieur.",
      es: "La circunferencia de centro (2, 0) y el punto P(0, −2) exterior.",
      ja: "中心 (2, 0) の円と外部の点 P(0, −2)。",
      zh: "圆心为 (2, 0) 的圆与圆外一点 P(0, −2)。"
    },
    hint: {
      en: "Complete the square to get the centre and radius. Half the angle has $\\sin\\tfrac\\alpha2=\\tfrac rd$.",
      fr: "Complétez le carré pour le centre et le rayon. Le demi-angle vérifie $\\sin\\tfrac\\alpha2=\\tfrac rd$.",
      es: "Completa el cuadrado para centro y radio. El semiángulo cumple $\\sin\\tfrac\\alpha2=\\tfrac rd$.",
      ja: "平方完成で中心と半径。半角は $\\sin\\tfrac\\alpha2=\\tfrac rd$。",
      zh: "配方求圆心与半径。半角满足 $\\sin\\tfrac\\alpha2=\\tfrac rd$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.2, h: 5.8, scale: 42, pad: 16 });
      const T = F.T = axes(F, -1.4, 4.8, -3.0, 2.8);
      { const cx = 2, cy = 0, r = Math.sqrt(5), cls = 'graph'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      F.dot(T([2, 0])); F.dot(T([0, -2])); F.text(T([0, -2]), 'P', 'pt', -10, 8); F.text(T([2, 0]), 'C', 'pt', 8, 12);
      F.reveal = () => {
      const P = [0, -2], C0 = [2, 0], d = Math.sqrt(8), r = Math.sqrt(5), base = Math.atan2(P[1] - C0[1], P[0] - C0[0]), th = Math.acos(r / d);
      [1, -1].forEach(s => { const t = base + s * th, Q = [C0[0] + r * Math.cos(t), C0[1] + r * Math.sin(t)]; F.seg(T(P), T([P[0] + 1.5 * (Q[0] - P[0]), P[1] + 1.5 * (Q[1] - P[1])]), 'hl pink'); F.seg(T(C0), T(Q), 'seg thin dashc'); F.dot(T(Q)); });
      F.seg(T(P), T(C0), 'seg thin'); F.text(T([1, -1]), '2√2', 'len small', 14, 8);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{\\sqrt{15}}{4}", correct: true, why: {
        en: "$\\sin\\tfrac\\alpha2=\\sqrt{\\tfrac58}$, $\\cos\\tfrac\\alpha2=\\sqrt{\\tfrac38}$, and $\\sin\\alpha=2\\cdot\\tfrac{\\sqrt{15}}8$.",
        fr: "$\\sin\\tfrac\\alpha2=\\sqrt{\\tfrac58}$, $\\cos\\tfrac\\alpha2=\\sqrt{\\tfrac38}$, d’où $\\sin\\alpha=2\\cdot\\tfrac{\\sqrt{15}}8$.",
        es: "$\\sin\\tfrac\\alpha2=\\sqrt{\\tfrac58}$, $\\cos\\tfrac\\alpha2=\\sqrt{\\tfrac38}$, y $\\sin\\alpha=2\\cdot\\tfrac{\\sqrt{15}}8$.",
        ja: "$\\sin\\tfrac\\alpha2=\\sqrt{\\tfrac58}$、$\\cos\\tfrac\\alpha2=\\sqrt{\\tfrac38}$ より $\\sin\\alpha=2\\cdot\\tfrac{\\sqrt{15}}8$。",
        zh: "$\\sin\\tfrac\\alpha2=\\sqrt{\\tfrac58}$，$\\cos\\tfrac\\alpha2=\\sqrt{\\tfrac38}$，故 $\\sin\\alpha=2\\cdot\\tfrac{\\sqrt{15}}8$。"
      } },
      { tex: "\\sqrt{\\tfrac{15}{16}}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt{10}}{4}", correct: false, why: {
        en: "That is $\\sin\\tfrac\\alpha2$, half the angle.",
        fr: "C’est $\\sin\\tfrac\\alpha2$, le demi-angle.",
        es: "Es $\\sin\\tfrac\\alpha2$, el semiángulo.",
        ja: "半角の $\\sin\\tfrac\\alpha2$。",
        zh: "那是半角的 $\\sin\\tfrac\\alpha2$。"
      } },
      { tex: "\\tfrac{\\sqrt6}{4}", correct: false, why: {
        en: "That is $\\cos\\tfrac\\alpha2$.",
        fr: "C’est $\\cos\\tfrac\\alpha2$.",
        es: "Es $\\cos\\tfrac\\alpha2$.",
        ja: "$\\cos\\tfrac\\alpha2$。",
        zh: "那是 $\\cos\\tfrac\\alpha2$。"
      } },
      { tex: "-\\tfrac14", correct: false, why: {
        en: "That is $\\cos\\alpha$ for the angle at $P$ facing the circle.",
        fr: "C’est $\\cos\\alpha$ pour l’angle en $P$ face au cercle.",
        es: "Es $\\cos\\alpha$ del ángulo en $P$ que abarca la circunferencia.",
        ja: "円を見込む $P$ の角の $\\cos\\alpha$。",
        zh: "那是 $P$ 处张角的 $\\cos\\alpha$。"
      } },
      { tex: "\\tfrac{\\sqrt5}{4}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{\\sqrt3}{2}", correct: false, why: {
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
          en: "Centre and radius",
          fr: "Centre et rayon",
          es: "Centro y radio",
          ja: "中心と半径",
          zh: "圆心与半径"
        },
        lines: ["(x-2)^2+y^2=5:\\quad C=(2,0),\\ r=\\sqrt5", "d=|PC|=\\sqrt{4+4}=2\\sqrt2"],
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
          en: "Half the angle",
          fr: "Le demi-angle",
          es: "El semiángulo",
          ja: "半角",
          zh: "半角"
        },
        lines: ["\\sin\\tfrac\\alpha2=\\frac{\\sqrt5}{2\\sqrt2},\\qquad\\cos\\tfrac\\alpha2=\\frac{\\sqrt3}{2\\sqrt2}"],
        note: {
          en: "Right triangle $P$, $C$, point of contact.",
          fr: "Triangle rectangle $P$, $C$, point de contact.",
          es: "Triángulo rectángulo $P$, $C$, punto de tangencia.",
          ja: "$P$・$C$・接点の直角三角形。",
          zh: "$P$、$C$、切点构成直角三角形。"
        }
      },
      {
        title: {
          en: "Double it",
          fr: "Doubler",
          es: "Duplicar",
          ja: "2倍角",
          zh: "二倍角"
        },
        lines: ["\\sin\\alpha=2\\cdot\\frac{\\sqrt5}{2\\sqrt2}\\cdot\\frac{\\sqrt3}{2\\sqrt2}=\\boxed{\\tfrac{\\sqrt{15}}4}"],
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
