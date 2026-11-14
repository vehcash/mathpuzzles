/* geometry · A cube whose space diagonal is 2
   Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2020b-cube-from-its-diagonal",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020, additional multiple-choice test (Mathematics Admissions Test), Question A",
        fr: "MAT d’Oxford 2020, test complémentaire à choix multiples (test d’admission en mathématiques), question A",
        es: "MAT de Oxford 2020, prueba adicional de opción múltiple (prueba de admisión de matemáticas), pregunta A",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 追加選択式テスト 問題 A",
        zh: "牛津大学数学入学考试 MAT 2020 补充选择题测试 第 A 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "A cube whose space diagonal is 2",
      fr: "Un cube dont la grande diagonale vaut 2",
      es: "Un cubo cuya diagonal espacial mide 2",
      ja: "空間対角線が 2 の立方体",
      zh: "空间对角线为 2 的正方体"
    },
    statement: {
      en: "A cube has space diagonal (from one corner to the opposite corner) of length $2$. <b>Which of the following are true?</b>",
      fr: "Un cube a une grande diagonale (d’un sommet au sommet opposé) de longueur $2$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Un cubo tiene diagonal espacial (de un vértice al opuesto) de longitud $2$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "立方体の空間対角線（頂点から反対の頂点まで）の長さは $2$ です。 <b>次のうち正しいものはどれですか？</b>",
      zh: "正方体的空间对角线（顶点到相对顶点）长为 $2$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A cube with one space diagonal drawn.",
      fr: "Un cube avec une grande diagonale tracée.",
      es: "Un cubo con una diagonal espacial trazada.",
      ja: "空間対角線を1本引いた立方体。",
      zh: "画出一条空间对角线的正方体。"
    },
    hint: {
      en: "For side $s$, the space diagonal is $s\\sqrt3$.",
      fr: "Pour un côté $s$, la grande diagonale vaut $s\\sqrt3$.",
      es: "Para lado $s$, la diagonal espacial es $s\\sqrt3$.",
      ja: "一辺 $s$ なら空間対角線は $s\\sqrt3$。",
      zh: "棱长 $s$ 时空间对角线为 $s\\sqrt3$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 3.8, scale: 52, pad: 16 });
      const P = ([x, y, z]) => [0.6 + 2.2 * x + 1.0 * y, 0.4 + 2.2 * z + 0.7 * y];
      [[[0,0,0],[1,0,0]],[[1,0,0],[1,1,0]],[[1,1,0],[0,1,0]],[[0,1,0],[0,0,0]],[[0,0,1],[1,0,1]],[[1,0,1],[1,1,1]],[[1,1,1],[0,1,1]],[[0,1,1],[0,0,1]],[[0,0,0],[0,0,1]],[[1,0,0],[1,0,1]],[[1,1,0],[1,1,1]],[[0,1,0],[0,1,1]]].forEach(([a, b]) => F.seg(P(a), P(b), 'seg thin'));
      F.seg(P([0, 0, 0]), P([1, 1, 1]), 'hl pink'); F.text(mid(P([0, 0, 0]), P([1, 1, 1])), '2', 'len small', 10, -8);
      F.reveal = () => {
      F.text(P([0.5, 0, 0]), 's = 2/√3', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "s = 2/√3": {"fr": "s = 2/√3", "es": "s = 2/√3", "ja": "s = 2/√3", "zh": "s = 2/√3"},
      "surface area": {"fr": "aire totale", "es": "área total", "ja": "表面積", "zh": "表面积"},
      "volume": {"fr": "volume", "es": "volumen", "ja": "体積", "zh": "体积"}
    },
    options: [
      { tex: "\\text{surface area}=8", correct: true, why: {
        en: "$6\\cdot\\tfrac43$",
        fr: "$6\\cdot\\tfrac43$",
        es: "$6\\cdot\\tfrac43$",
        ja: "$6\\cdot\\tfrac43$",
        zh: "$6\\cdot\\tfrac43$"
      } },
      { tex: "s^2=\\tfrac43", correct: true, why: {
        en: "$3s^2=4$",
        fr: "$3s^2=4$",
        es: "$3s^2=4$",
        ja: "$3s^2=4$",
        zh: "$3s^2=4$"
      } },
      { tex: "\\text{surface area}=4", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{surface area}=6", correct: false, why: {
        en: "That is for side $1$.",
        fr: "C’est pour un côté $1$.",
        es: "Es para lado $1$.",
        ja: "一辺 $1$ の場合。",
        zh: "那是棱长为 $1$ 的情形。"
      } },
      { tex: "\\text{surface area}=12", correct: false, why: {
        en: "Uses the face diagonal $s\\sqrt2=2$.",
        fr: "Utilise la diagonale d’une face $s\\sqrt2=2$.",
        es: "Usa la diagonal de una cara $s\\sqrt2=2$.",
        ja: "面の対角線 $s\\sqrt2=2$ を使った。",
        zh: "误用面对角线 $s\\sqrt2=2$。"
      } },
      { tex: "\\text{surface area}=24", correct: false, why: {
        en: "Uses side $2$.",
        fr: "Prend un côté $2$.",
        es: "Toma lado $2$.",
        ja: "一辺を $2$ とした。",
        zh: "取了棱长 $2$。"
      } },
      { tex: "\\text{volume}=\\tfrac{8}{3}", correct: false, why: {
        en: "$s^3=\\tfrac{8}{3\\sqrt3}$",
        fr: "$s^3=\\tfrac{8}{3\\sqrt3}$",
        es: "$s^3=\\tfrac{8}{3\\sqrt3}$",
        ja: "$s^3=\\tfrac{8}{3\\sqrt3}$",
        zh: "$s^3=\\tfrac{8}{3\\sqrt3}$"
      } },
      { tex: "s=\\tfrac23", correct: false, why: {
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
          en: "Side",
          fr: "Côté",
          es: "Lado",
          ja: "一辺",
          zh: "棱长"
        },
        lines: ["s\\sqrt3=2\\Rightarrow s^2=\\tfrac43"],
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
          en: "Surface",
          fr: "Surface",
          es: "Superficie",
          ja: "表面積",
          zh: "表面积"
        },
        lines: ["6s^2=8"],
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
