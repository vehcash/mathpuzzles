/* algebra · Cycling the coefficients of a quadratic
   Oxford MAT 2023 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2023-cyclic-repeated-roots",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2023 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2023 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2023 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2023 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2023 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Cycling the coefficients of a quadratic",
      fr: "Faire tourner les coefficients d’un trinôme",
      es: "Rotar los coeficientes de una cuadrática",
      ja: "2次式の係数を回す",
      zh: "轮换二次方程的系数"
    },
    statement: {
      en: "$a,b,c$ are non-zero reals, and both $ax^2+bx+c=0$ and $bx^2+cx+a=0$ have a repeated real root. <b>Which of the following equal the number of distinct real roots of $cx^2+ax+b=0$?</b>",
      fr: "$a,b,c$ sont des réels non nuls, et $ax^2+bx+c=0$ et $bx^2+cx+a=0$ ont chacune une racine réelle double. <b>Lesquelles des valeurs suivantes sont égales au nombre de racines réelles distinctes de $cx^2+ax+b=0$ ?</b>",
      es: "$a,b,c$ son reales no nulos, y $ax^2+bx+c=0$ y $bx^2+cx+a=0$ tienen ambas una raíz real doble. <b>¿Cuáles de los siguientes valores son iguales al número de raíces reales distintas de $cx^2+ax+b=0$?</b>",
      ja: "$a,b,c$ は $0$ でない実数で、$ax^2+bx+c=0$ と $bx^2+cx+a=0$ はともに実数の重解をもちます。<b>$cx^2+ax+b=0$ の異なる実数解の個数に等しいものはどれですか？</b>",
      zh: "$a,b,c$ 为非零实数，$ax^2+bx+c=0$ 与 $bx^2+cx+a=0$ 都有实重根。<b>下列哪些等于 $cx^2+ax+b=0$ 不同实根的个数？</b>"
    },
    figureText: {
      en: "A cycle a → b → c → a showing how the coefficients rotate between the three equations.",
      fr: "Un cycle a → b → c → a montrant la rotation des coefficients.",
      es: "Un ciclo a → b → c → a que muestra cómo rotan los coeficientes.",
      ja: "係数の回転 a → b → c → a。",
      zh: "系数轮换 a → b → c → a。"
    },
    hint: {
      en: "Repeated roots give $b^2=4ac$ and $c^2=4ab$. Multiply them.",
      fr: "Les racines doubles donnent $b^2=4ac$ et $c^2=4ab$. Multipliez.",
      es: "Las raíces dobles dan $b^2=4ac$ y $c^2=4ab$. Multiplícalas.",
      ja: "重解より $b^2=4ac$、$c^2=4ab$。掛け合わせる。",
      zh: "重根给出 $b^2=4ac$ 与 $c^2=4ab$，两式相乘。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.2, h: 2.8, scale: 64, pad: 16 });
      const P = [[1.6, 2.4, 'a'], [0.5, 0.6, 'b'], [2.7, 0.6, 'c']];
      P.forEach(([x, y, t]) => { F.text([x, y], t, 'pt', 0, 0); });
      arrow(F, [1.4, 2.2], [0.7, 0.9]); arrow(F, [0.8, 0.6], [2.4, 0.6]); arrow(F, [2.5, 0.9], [1.8, 2.2]);
      F.reveal = () => {
      F.text([1.6, 1.3], 'Δ < 0', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "Δ < 0": {"fr": "Δ < 0", "es": "Δ < 0", "ja": "Δ < 0", "zh": "Δ < 0"},
      "it depends on": {"fr": "cela dépend de", "es": "depende de", "ja": "次による：", "zh": "取决于"},
      "it depends on the sign of": {"fr": "cela dépend du signe de", "es": "depende del signo de", "ja": "次の符号による：", "zh": "取决于下列符号："},
      "real roots": {"fr": "racines réelles", "es": "raíces reales", "ja": "個の実数解", "zh": "个实根"}
    },
    options: [
      { tex: "0", correct: true, why: {
        en: "Its discriminant is $a^2-4bc=a^2-64a^2<0$.",
        fr: "Son discriminant vaut $a^2-4bc=a^2-64a^2<0$.",
        es: "Su discriminante es $a^2-4bc=a^2-64a^2<0$.",
        ja: "判別式 $a^2-4bc=a^2-64a^2<0$。",
        zh: "判别式 $a^2-4bc=a^2-64a^2<0$。"
      } },
      { tex: "\\#\\varnothing", correct: true, why: {
        en: "The number of elements of the empty set: the same answer.",
        fr: "Le cardinal de l’ensemble vide : la même réponse.",
        es: "El cardinal del conjunto vacío: la misma respuesta.",
        ja: "空集合の元の個数。同じ答え。",
        zh: "空集元素个数，同一答案。"
      } },
      { tex: "1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "3", correct: false, why: {
        en: "A quadratic has at most $2$ roots.",
        fr: "Un trinôme a au plus $2$ racines.",
        es: "Una cuadrática tiene a lo sumo $2$ raíces.",
        ja: "2次方程式の解は高々2つ。",
        zh: "二次方程至多 $2$ 个根。"
      } },
      { tex: "\\text{it depends on}\\ a", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{it depends on the sign of}\\ bc", correct: false, why: {
        en: "$bc=16a^2>0$ always.",
        fr: "$bc=16a^2>0$ toujours.",
        es: "$bc=16a^2>0$ siempre.",
        ja: "常に $bc=16a^2>0$。",
        zh: "总有 $bc=16a^2>0$。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
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
          en: "Repeated roots",
          fr: "Racines doubles",
          es: "Raíces dobles",
          ja: "重解",
          zh: "重根"
        },
        lines: ["b^2=4ac,\\qquad c^2=4ab"],
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
          en: "Multiply",
          fr: "Multiplier",
          es: "Multiplicar",
          ja: "掛ける",
          zh: "相乘"
        },
        lines: ["b^2c^2=16a^2bc\\ \\Rightarrow\\ bc=16a^2"],
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
          en: "Third discriminant",
          fr: "Troisième discriminant",
          es: "Tercer discriminante",
          ja: "3つ目の判別式",
          zh: "第三个判别式"
        },
        lines: ["a^2-4bc=a^2-64a^2=-63a^2<0\\ \\Rightarrow\\ \\boxed{0}\\ \\text{real roots}"],
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
