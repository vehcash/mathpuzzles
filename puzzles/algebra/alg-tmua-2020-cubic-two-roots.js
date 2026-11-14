/* algebra · A cubic with roots −½ and 2
   TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-tmua-2020-cubic-two-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "TMUA 2020 (Test of Mathematics for University Admission, UK), Paper 1, Question 2",
        fr: "TMUA 2020 (test d’admission en mathématiques, Royaume-Uni), épreuve 1, question 2",
        es: "TMUA 2020 (prueba de admisión de matemáticas, Reino Unido), prueba 1, pregunta 2",
        ja: "イギリス大学入学数学試験 TMUA 2020 Paper 1 第2問",
        zh: "英国大学入学数学测试 TMUA 2020 试卷 1 第 2 题"
      },
      exams: ["tmua"]
    },
    difficulty: 1,
    title: {
      en: "A cubic with roots −½ and 2",
      fr: "Une cubique de racines −½ et 2",
      es: "Una cúbica con raíces −½ y 2",
      ja: "根 −½ と 2 をもつ3次式",
      zh: "以 −½ 和 2 为根的三次式"
    },
    statement: {
      en: "$f(x)=2x^3+px^2+q$ satisfies $f(-\\tfrac12)=0$ and $f(2)=0$. <b>Which of the following are true?</b>",
      fr: "$f(x)=2x^3+px^2+q$ vérifie $f(-\\tfrac12)=0$ et $f(2)=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=2x^3+px^2+q$ cumple $f(-\\tfrac12)=0$ y $f(2)=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$f(x)=2x^3+px^2+q$ は $f(-\\tfrac12)=0$、$f(2)=0$ を満たします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=2x^3+px^2+q$ 满足 $f(-\\tfrac12)=0$，$f(2)=0$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A cubic curve crossing the x-axis at −1/2 and 2.",
      fr: "Une cubique coupant l’axe des x en −1/2 et 2.",
      es: "Una cúbica que corta el eje x en −1/2 y 2.",
      ja: "x 軸と −1/2, 2 で交わる3次曲線。",
      zh: "与 x 轴交于 −1/2 和 2 的三次曲线。"
    },
    hint: {
      en: "Two linear equations: $-\\tfrac14+\\tfrac p4+q=0$ and $16+4p+q=0$.",
      fr: "Deux équations linéaires : $-\\tfrac14+\\tfrac p4+q=0$ et $16+4p+q=0$.",
      es: "Dos ecuaciones lineales: $-\\tfrac14+\\tfrac p4+q=0$ y $16+4p+q=0$.",
      ja: "2つの1次方程式 $-\\tfrac14+\\tfrac p4+q=0$、$16+4p+q=0$。",
      zh: "两个一次方程：$-\\tfrac14+\\tfrac p4+q=0$，$16+4p+q=0$。"
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
      const S = ([x, y]) => [0.2 + (x - (-1.5)) * 1.02222, 0.2 + (y - (-6)) * 0.30000];
      F.seg(S([-1.5, 0]), S([3, 0]), 'axis'); F.seg(S([0, -6]), S([0, 4]), 'axis');
      F.dot(S([-0.5, 0])); F.dot(S([2, 0])); F.text(S([2, 0]), '2', 'tick', 0, 14); F.text(S([-0.5, 0]), '−½', 'tick', 0, 14);
      F.reveal = () => {
      plot(F, S, x => 2 * x ** 3 - 13 / 3 * x * x + 4 / 3, -1.2, 2.8, 'hl pink', 'base', -6, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "2": {"fr": "2", "es": "2", "ja": "2", "zh": "2"},
      "−½": {"fr": "−½", "es": "−½", "ja": "−½", "zh": "−½"},
      "has a third root at": {"fr": "a une troisième racine en", "es": "tiene una tercera raíz en", "ja": "は次の点に3つ目の根をもつ：", "zh": "的第三个根为"}
    },
    options: [
      { tex: "2p+q=-\\tfrac{22}3", correct: true, why: {
        en: "$p=-\\tfrac{13}3,\\ q=\\tfrac43$",
        fr: "$p=-\\tfrac{13}3,\\ q=\\tfrac43$",
        es: "$p=-\\tfrac{13}3,\\ q=\\tfrac43$",
        ja: "$p=-\\tfrac{13}3,\\ q=\\tfrac43$",
        zh: "$p=-\\tfrac{13}3,\\ q=\\tfrac43$"
      } },
      { tex: "q=\\tfrac43", correct: true, why: {
        en: "",
        fr: "",
        es: "",
        ja: "",
        zh: ""
      } },
      { tex: "2p+q=-\\tfrac{26}3", correct: false, why: {
        en: "Uses $2p$ without $q$.",
        fr: "Prend $2p$ sans $q$.",
        es: "Usa $2p$ sin $q$.",
        ja: "$q$ を足し忘れ。",
        zh: "漏加 $q$。"
      } },
      { tex: "2p+q=\\tfrac{22}3", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "2p+q=-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2p+q=-\\tfrac{18}3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "p=\\tfrac{13}3", correct: false, why: {
        en: "Sign error.",
        fr: "Erreur de signe.",
        es: "Error de signo.",
        ja: "符号ミス。",
        zh: "符号错误。"
      } },
      { tex: "f\\ \\text{has a third root at}\\ x=0", correct: false, why: {
        en: "$f(0)=q=\\tfrac43\\ne0$",
        fr: "$f(0)=q=\\tfrac43\\ne0$",
        es: "$f(0)=q=\\tfrac43\\ne0$",
        ja: "$f(0)=q=\\tfrac43\\ne0$",
        zh: "$f(0)=q=\\tfrac43\\ne0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Substitute",
          fr: "Substituer",
          es: "Sustituir",
          ja: "代入",
          zh: "代入"
        },
        lines: ["f(2)=16+4p+q=0,\\quad f(-\\tfrac12)=-\\tfrac14+\\tfrac p4+q=0"],
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
          en: "Subtract",
          fr: "Soustraire",
          es: "Restar",
          ja: "引く",
          zh: "相减"
        },
        lines: ["\\tfrac{15}4p=-\\tfrac{65}4\\Rightarrow p=-\\tfrac{13}3,\\ q=\\tfrac43,\\ 2p+q=-\\tfrac{22}3"],
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
