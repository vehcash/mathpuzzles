/* number · Coefficients of (2 + 3x)¹² divisible by 12
   TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-tmua-2023-coefficients-divisible-by-12",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2023 (Test of Mathematics for University Admission, UK), Paper 1, Question 6",
        fr: "TMUA 2023 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 6",
        es: "TMUA 2023 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 6",
        ja: "イギリス大学入学数学試験 TMUA 2023 Paper 1 第6問",
        zh: "英国大学入学数学测试 TMUA 2023 试卷 1 第 6 题"
      },
      exams: ["tmua"]
    },
    difficulty: 3,
    title: {
      en: "Coefficients of (2 + 3x)¹² divisible by 12",
      fr: "Coefficients de (2 + 3x)¹² divisibles par 12",
      es: "Coeficientes de (2 + 3x)¹² divisibles entre 12",
      ja: "(2 + 3x)¹² の係数で12で割り切れるもの",
      zh: "(2 + 3x)¹² 中能被 12 整除的系数"
    },
    statement: {
      en: "In the expansion of $(2+3x)^{12}$, consider how many of the $13$ coefficients are divisible by $12$. <b>Which of the following are true?</b>",
      fr: "Dans le développement de $(2+3x)^{12}$, on se demande combien des $13$ coefficients sont divisibles par $12$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "En el desarrollo de $(2+3x)^{12}$, ¿cuántos de los $13$ coeficientes son divisibles entre $12$? <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$(2+3x)^{12}$ の展開の $13$ 個の係数のうち、$12$ で割り切れるものの個数を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "考虑 $(2+3x)^{12}$ 展开式 $13$ 个系数中能被 $12$ 整除的个数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The 13 coefficients C(12, r)·2^(12−r)·3^r in a row.",
      fr: "Les 13 coefficients C(12, r)·2^(12−r)·3^r alignés.",
      es: "Los 13 coeficientes C(12, r)·2^(12−r)·3^r en fila.",
      ja: "13個の係数 C(12, r)·2^(12−r)·3^r。",
      zh: "13 个系数 C(12, r)·2^(12−r)·3^r 排成一行。"
    },
    hint: {
      en: "$12=4\\cdot3$. The power of $3$ is missing only when $r=0$; the power of $4$ only when $12-r\\le1$ — but check whether $\\binom{12}r$ helps.",
      fr: "$12=4\\cdot3$. Le facteur $3$ manque seulement si $r=0$ ; le facteur $4$ seulement si $12-r\\le1$ — vérifiez si $\\binom{12}r$ aide.",
      es: "$12=4\\cdot3$. El factor $3$ falta solo si $r=0$; el $4$ solo si $12-r\\le1$ — mira si $\\binom{12}r$ ayuda.",
      ja: "$12=4\\cdot3$。$3$ が欠けるのは $r=0$ のみ、$4$ が欠けるのは $12-r\\le1$ のみ。$\\binom{12}r$ が補うか確認。",
      zh: "$12=4\\cdot3$。缺因子 $3$ 仅当 $r=0$；缺因子 $4$ 仅当 $12-r\\le1$，再看 $\\binom{12}r$ 是否补足。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.6, h: 1.4, scale: 46, pad: 16 });
      for (let r = 0; r <= 12; r++) { F.rect(0.1 + r * 0.5, 0.35, 0.44, 0.6, 'fill-blue', 'fills'); F.text([0.32 + r * 0.5, 0.65], String(r), 'tick', 0, 0); }
      F.reveal = () => {
      F.rect(0.1, 0.35, 0.44, 0.6, 'fill-yellow', 'fills'); F.rect(0.1 + 12 * 0.5, 0.35, 0.44, 0.6, 'fill-yellow', 'fills'); F.text([3.3, 1.25], '2¹²  and  3¹²', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2¹²  and  3¹²": {"fr": "2¹²  et  3¹²", "es": "2¹²  y  3¹²", "ja": "2¹² と 3¹²", "zh": "2¹² 与 3¹²"},
      "is divisible by 12": {"fr": "est divisible par 12", "es": "es divisible entre 12", "ja": "は12で割り切れる", "zh": "能被 12 整除"},
      "is odd": {"fr": "est impair", "es": "es impar", "ja": "は奇数", "zh": "是奇数"},
      "no": {"fr": "pas de", "es": "sin", "ja": "なし", "zh": "无"},
      "odd": {"fr": "impair", "es": "impar", "ja": "奇数", "zh": "奇数"}
    },
    options: [
      { tex: "11", correct: true, why: {
        en: "All but the first ($2^{12}$) and the last ($3^{12}$).",
        fr: "Tous sauf le premier ($2^{12}$) et le dernier ($3^{12}$).",
        es: "Todos menos el primero ($2^{12}$) y el último ($3^{12}$).",
        ja: "最初の $2^{12}$ と最後の $3^{12}$ 以外すべて。",
        zh: "除第一个 $2^{12}$ 和最后一个 $3^{12}$ 外都可以。"
      } },
      { tex: "r=11:\\ \\binom{12}{11}\\cdot2\\cdot3^{11}\\ \\text{is divisible by 12}", correct: true, why: {
        en: "The binomial $12$ supplies the factor $4$.",
        fr: "Le coefficient binomial $12$ fournit le facteur $4$.",
        es: "El binomial $12$ aporta el factor $4$.",
        ja: "二項係数 $12$ が因数 $4$ を補う。",
        zh: "二项式系数 $12$ 提供了因子 $4$。"
      } },
      { tex: "10", correct: false, why: {
        en: "Excludes $r=11$, forgetting $\\binom{12}{11}=12$.",
        fr: "Exclut $r=11$ en oubliant $\\binom{12}{11}=12$.",
        es: "Excluye $r=11$, olvidando $\\binom{12}{11}=12$.",
        ja: "$\\binom{12}{11}=12$ を忘れ $r=11$ を除外。",
        zh: "漏了 $\\binom{12}{11}=12$，排除了 $r=11$。"
      } },
      { tex: "13", correct: false, why: {
        en: "$2^{12},\\ 3^{12}$",
        fr: "$2^{12},\\ 3^{12}$",
        es: "$2^{12},\\ 3^{12}$",
        ja: "$2^{12},\\ 3^{12}$",
        zh: "$2^{12},\\ 3^{12}$"
      } },
      { tex: "12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "5", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "That counts the ones that are not divisible.",
        fr: "C’est le nombre de ceux qui ne le sont pas.",
        es: "Son los que no lo son.",
        ja: "割り切れない方の個数。",
        zh: "那是不能整除的个数。"
      } },
      { tex: "3^{12}\\ \\text{is divisible by 12}", correct: false, why: {
        en: "$3^{12}\\ \\text{is odd}$",
        fr: "$3^{12}\\ \\text{is odd}$",
        es: "$3^{12}\\ \\text{is odd}$",
        ja: "$3^{12}\\ \\text{is odd}$",
        zh: "$3^{12}\\ \\text{is odd}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "General coefficient",
          fr: "Coefficient général",
          es: "Coeficiente general",
          ja: "一般の係数",
          zh: "一般系数"
        },
        lines: ["c_r=\\binom{12}r2^{12-r}3^r"],
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
          en: "Check 4 and 3",
          fr: "Vérifier 4 et 3",
          es: "Comprobar 4 y 3",
          ja: "4 と 3 を確認",
          zh: "检验 4 与 3"
        },
        lines: ["r=0:\\ 2^{12}\\ (\\text{no }3);\\quad r=12:\\ 3^{12}\\ (\\text{odd});\\quad r=11:\\ 12\\cdot2\\cdot3^{11}\\ \\checkmark"],
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
