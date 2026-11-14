/* algebra · Four transformations of y = 4x²
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-four-transformations",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 10",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 10",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 10",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第10問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 10 题"
      },
      exams: ["tmua"]
    },
    difficulty: 2,
    title: {
      en: "Four transformations of y = 4x²",
      fr: "Quatre transformations de y = 4x²",
      es: "Cuatro transformaciones de y = 4x²",
      ja: "y = 4x² の4つの変換",
      zh: "y = 4x² 的四次变换"
    },
    statement: {
      en: "Starting from $y=4x^2$, apply in order: a translation $3$ units in the $+x$ direction; a translation $5$ units in the $-y$ direction; a reflection in the $x$-axis; a stretch of factor $2$ parallel to the $x$-axis. Call the result $C$. <b>Which of the following are true?</b>",
      fr: "À partir de $y=4x^2$, on applique dans l’ordre : une translation de $3$ selon $+x$ ; une translation de $5$ selon $-y$ ; une symétrie par rapport à l’axe des $x$ ; une dilatation de facteur $2$ parallèle à l’axe des $x$. On obtient $C$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Partiendo de $y=4x^2$, se aplica en orden: traslación de $3$ en $+x$; traslación de $5$ en $-y$; simetría respecto al eje $x$; estiramiento de factor $2$ paralelo al eje $x$. El resultado es $C$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=4x^2$ に順に、$+x$ 方向に $3$ 平行移動、$-y$ 方向に $5$ 平行移動、$x$ 軸に関する対称移動、$x$ 軸方向に $2$ 倍の拡大を行い、$C$ を得ます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "从 $y=4x^2$ 出发，依次：沿 $+x$ 平移 $3$；沿 $-y$ 平移 $5$；关于 $x$ 轴对称；沿 $x$ 轴方向伸长为 $2$ 倍，得到 $C$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola y = 4x² and the axes.",
      fr: "La parabole y = 4x² et les axes.",
      es: "La parábola y = 4x² y los ejes.",
      ja: "放物線 y = 4x² と座標軸。",
      zh: "抛物线 y = 4x² 与坐标轴。"
    },
    hint: {
      en: "A stretch of factor 2 along $x$ replaces $x$ by $\\tfrac x2$.",
      fr: "Une dilatation de facteur 2 selon $x$ remplace $x$ par $\\tfrac x2$.",
      es: "Un estiramiento de factor 2 en $x$ cambia $x$ por $\\tfrac x2$.",
      ja: "$x$ 方向の 2 倍拡大は $x$ を $\\tfrac x2$ に置き換える。",
      zh: "沿 $x$ 方向伸长 2 倍即以 $\\tfrac x2$ 代 $x$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.2 + (x - (-2)) * 0.41818, 0.2 + (y - (-7)) * 0.21429];
      F.seg(S([-2, 0]), S([9, 0]), 'axis'); F.seg(S([0, -7]), S([0, 7]), 'axis');
      plot(F, S, x => 4 * x * x, -1.4, 1.4, 'graph', 'base', -7, 7);
      F.reveal = () => {
      plot(F, S, x => -x * x + 12 * x - 31, 3, 9, 'hl pink', 'base', -7, 7); F.dot(S([6, 5])); F.text(S([6, 5]), '(6, 5)', 'len small', 0, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(6, 5)": {"fr": "(6, 5)", "es": "(6, 5)", "ja": "(6, 5)", "zh": "(6, 5)"},
      "the vertex of": {"fr": "le sommet de", "es": "el vértice de", "ja": "", "zh": ""},
      "is": {"fr": "est", "es": "es", "ja": "の頂点は", "zh": "的顶点为"},
      "opens upwards": {"fr": "est tournée vers le haut", "es": "abre hacia arriba", "ja": "は下に凸", "zh": "开口向上"},
      "no reflection": {"fr": "pas de symétrie", "es": "sin reflexión", "ja": "対称移動なし", "zh": "没有对称"},
      "leading coefficient": {"fr": "coefficient dominant", "es": "coeficiente principal", "ja": "最高次係数", "zh": "首项系数"}
    },
    options: [
      { tex: "C:\\ y=-x^2+12x-31", correct: true, why: {
        en: "$-4\\bigl(\\tfrac x2-3\\bigr)^2+5$",
        fr: "$-4\\bigl(\\tfrac x2-3\\bigr)^2+5$",
        es: "$-4\\bigl(\\tfrac x2-3\\bigr)^2+5$",
        ja: "$-4\\bigl(\\tfrac x2-3\\bigr)^2+5$",
        zh: "$-4\\bigl(\\tfrac x2-3\\bigr)^2+5$"
      } },
      { tex: "\\text{the vertex of}\\ C\\ \\text{is}\\ (6,5)", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "C:\\ y=-16x^2+96x-139", correct: false, why: {
        en: "Uses $2x$ instead of $\\tfrac x2$.",
        fr: "Utilise $2x$ au lieu de $\\tfrac x2$.",
        es: "Usa $2x$ en vez de $\\tfrac x2$.",
        ja: "$\\tfrac x2$ でなく $2x$。",
        zh: "用了 $2x$ 而非 $\\tfrac x2$。"
      } },
      { tex: "C:\\ y=-x^2+12x-41", correct: false, why: {
        en: "Reflects before shifting down.",
        fr: "Symétrise avant de descendre.",
        es: "Refleja antes de bajar.",
        ja: "下へ移す前に対称移動。",
        zh: "先对称后下移。"
      } },
      { tex: "C:\\ y=-x^2+6x-4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "C:\\ y=x^2-12x+31", correct: false, why: {
        en: "$\\text{no reflection}$",
        fr: "$\\text{no reflection}$",
        es: "$\\text{no reflection}$",
        ja: "$\\text{no reflection}$",
        zh: "$\\text{no reflection}$"
      } },
      { tex: "\\text{the vertex of}\\ C\\ \\text{is}\\ (3,5)", correct: false, why: {
        en: "Forgets to stretch the vertex.",
        fr: "Oublie de dilater le sommet.",
        es: "Olvida estirar el vértice.",
        ja: "頂点の拡大を忘れた。",
        zh: "忘了伸长顶点。"
      } },
      { tex: "C\\ \\text{opens upwards}", correct: false, why: {
        en: "$\\text{leading coefficient}\\ -1$",
        fr: "$\\text{leading coefficient}\\ -1$",
        es: "$\\text{leading coefficient}\\ -1$",
        ja: "$\\text{leading coefficient}\\ -1$",
        zh: "$\\text{leading coefficient}\\ -1$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Shift and reflect",
          fr: "Translater et symétriser",
          es: "Trasladar y reflejar",
          ja: "平行移動と対称移動",
          zh: "平移与对称"
        },
        lines: ["4x^2\\to4(x-3)^2-5\\to-4(x-3)^2+5"],
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
          en: "Stretch",
          fr: "Dilater",
          es: "Estirar",
          ja: "拡大",
          zh: "伸长"
        },
        lines: ["-4\\bigl(\\tfrac x2-3\\bigr)^2+5=-(x-6)^2+5=-x^2+12x-31"],
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
