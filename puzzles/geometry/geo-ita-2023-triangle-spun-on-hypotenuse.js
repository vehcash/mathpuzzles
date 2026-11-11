/* geometry · Spinning a right triangle about its hypotenuse
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 46 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2023-triangle-spun-on-hypotenuse",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 46",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 46",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 46",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第46問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 46 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Spinning a right triangle about its hypotenuse",
      fr: "Faire tourner un triangle rectangle autour de son hypoténuse",
      es: "Girar un triángulo rectángulo alrededor de su hipotenusa",
      ja: "直角三角形を斜辺のまわりに回す",
      zh: "直角三角形绕斜边旋转"
    },
    statement: {
      en: "A right triangle has hypotenuse $10$ cm. Spinning it about the hypotenuse gives a solid of volume $30\\pi$ cm³. <b>Which of the following equal its perimeter, in cm?</b>",
      fr: "Un triangle rectangle a une hypoténuse de $10$ cm. En le faisant tourner autour de l’hypoténuse, on obtient un solide de volume $30\\pi$ cm³. <b>Lesquelles des valeurs suivantes sont égales à son périmètre, en cm ?</b>",
      es: "Un triángulo rectángulo tiene hipotenusa de $10$ cm. Al girarlo alrededor de la hipotenusa se obtiene un sólido de volumen $30\\pi$ cm³. <b>¿Cuáles de los siguientes valores son iguales a su perímetro, en cm?</b>",
      ja: "斜辺 $10$ cm の直角三角形を斜辺のまわりに回すと体積 $30\\pi$ cm³ の立体ができます。<b>三角形の周の長さ（cm）に等しいものはどれですか？</b>",
      zh: "斜边为 $10$ cm 的直角三角形绕斜边旋转，得到体积为 $30\\pi$ cm³ 的立体。<b>下列哪些等于其周长（cm）？</b>"
    },
    figureText: {
      en: "The triangle on its hypotenuse with its mirror image below: two cones base to base.",
      fr: "Le triangle posé sur l’hypoténuse et son symétrique : deux cônes base contre base.",
      es: "El triángulo sobre la hipotenusa y su simétrico: dos conos unidos por la base.",
      ja: "斜辺上の三角形と鏡像：底面を合わせた2つの円錐。",
      zh: "斜边上的三角形及其镜像：底面相接的两个圆锥。"
    },
    hint: {
      en: "The solid is two cones sharing a base of radius $h$, the height to the hypotenuse, with total height $10$.",
      fr: "Le solide est formé de deux cônes de même base de rayon $h$ (la hauteur relative à l’hypoténuse), de hauteur totale $10$.",
      es: "El sólido son dos conos con base común de radio $h$ (la altura sobre la hipotenusa) y altura total $10$.",
      ja: "立体は共通の底面（半径 $h$＝斜辺への高さ）をもつ2つの円錐で、高さの合計は $10$。",
      zh: "立体是共底的两个圆锥，底半径 $h$ 为斜边上的高，总高 $10$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.0, scale: 52, pad: 16 });
      const A = [0.2, 1.5], B = [5.2, 1.5], C = [1.6, 2.7], D = [1.6, 0.3];
      F.path([A, C, B], 'graph', 'base', true); F.path([A, D, B], 'seg thin dashc', 'base', true);
      F.seg(C, D, 'seg thin'); F.text([2.7, 1.5], '10', 'len small', 0, 14);
      F.reveal = () => {
      F.text([1.6, 2.1], 'h = 3', 'len small', 26, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "10": {"fr": "10", "es": "10", "ja": "10", "zh": "10"},
      "h = 3": {"fr": "h = 3", "es": "h = 3", "ja": "h = 3", "zh": "h = 3"}
    },
    options: [
      { tex: "10+4\\sqrt{10}", correct: true, why: {
        en: "$(a+b)^2=100+2\\cdot30$",
        fr: "$(a+b)^2=100+2\\cdot30$",
        es: "$(a+b)^2=100+2\\cdot30$",
        ja: "$(a+b)^2=100+2\\cdot30$",
        zh: "$(a+b)^2=100+2\\cdot30$"
      } },
      { tex: "10+\\sqrt{160}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "10+4\\sqrt7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10+5\\sqrt7", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10+2\\sqrt{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "10+3\\sqrt{10}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "40", correct: false, why: {
        en: "That treats $a+b$ as $30$, the product $ab$.",
        fr: "Cela prend $a+b=30$, qui est le produit $ab$.",
        es: "Toma $a+b=30$, que es el producto $ab$.",
        ja: "積 $ab=30$ を和と取り違えた。",
        zh: "把乘积 $ab=30$ 当成了和。"
      } },
      { tex: "10+\\sqrt{130}", correct: false, why: {
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
          en: "Volume of two cones",
          fr: "Volume des deux cônes",
          es: "Volumen de dos conos",
          ja: "2つの円錐の体積",
          zh: "两个圆锥的体积"
        },
        lines: ["\\tfrac13\\pi h^2\\cdot10=30\\pi\\Rightarrow h=3"],
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
          en: "Legs",
          fr: "Côtés de l’angle droit",
          es: "Catetos",
          ja: "直角をはさむ辺",
          zh: "直角边"
        },
        lines: ["ab=10h=30,\\ a^2+b^2=100\\Rightarrow a+b=\\sqrt{160}=4\\sqrt{10}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam this was a five-choice question; here a second correct form is added.",
          fr: "Dans l’épreuve c’était un QCM à cinq choix ; une seconde forme correcte est ajoutée ici.",
          es: "En el examen era de cinco opciones; aquí se añade una segunda forma correcta.",
          ja: "原題は5択。ここでは正しい別表現を追加。",
          zh: "原题为五选一，此处增加了一个等价的正确选项。"
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
