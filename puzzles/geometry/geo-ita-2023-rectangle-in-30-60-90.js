/* geometry · A rectangle inside a 30-60-90 triangle
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 42 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2023-rectangle-in-30-60-90",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2023, 1st phase (16 October 2022), Mathematics, Question 42",
        fr: "Concours de l’ITA (Brésil) 2023, 1re phase (16 octobre 2022), mathématiques, question 42",
        es: "Examen de ingreso del ITA (Brasil) 2023, 1.ª fase (16 de octubre de 2022), matemáticas, pregunta 42",
        ja: "ITA（ブラジル航空技術大学）2023 入試 第1次（2022年10月16日）数学 第42問",
        zh: "巴西航空技术学院 ITA 2023 入学考试第一阶段（2022年10月16日）数学第 42 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "A rectangle inside a 30-60-90 triangle",
      fr: "Un rectangle dans un triangle 30-60-90",
      es: "Un rectángulo dentro de un triángulo 30-60-90",
      ja: "30-60-90 の三角形の中の長方形",
      zh: "30-60-90 三角形内的矩形"
    },
    statement: {
      en: "$ABC$ is right-angled at $B$ with $\\angle BAC=30^\\circ$ and $BC=1$. $D$ moves on $AC$; the parallel to $AB$ through $D$ meets $BC$ at $E$, and the parallel to $BC$ through $D$ meets $AB$ at $F$. <b>Which of the following equal the least possible length $EF$?</b>",
      fr: "$ABC$ est rectangle en $B$ avec $\\angle BAC=30^\\circ$ et $BC=1$. $D$ parcourt $[AC]$ ; la parallèle à $(AB)$ par $D$ coupe $(BC)$ en $E$, la parallèle à $(BC)$ par $D$ coupe $(AB)$ en $F$. <b>Lesquelles des valeurs suivantes sont égales à la plus petite longueur $EF$ possible ?</b>",
      es: "$ABC$ es rectángulo en $B$ con $\\angle BAC=30^\\circ$ y $BC=1$. $D$ recorre $AC$; la paralela a $AB$ por $D$ corta a $BC$ en $E$, y la paralela a $BC$ por $D$ corta a $AB$ en $F$. <b>¿Cuáles de los siguientes valores son iguales a la menor longitud posible de $EF$?</b>",
      ja: "$ABC$ は $B$ で直角、$\\angle BAC=30^\\circ$、$BC=1$。$D$ は $AC$ 上を動き、$D$ を通り $AB$ に平行な直線が $BC$ と $E$ で、$BC$ に平行な直線が $AB$ と $F$ で交わります。<b>$EF$ の最小値に等しいものはどれですか？</b>",
      zh: "$ABC$ 在 $B$ 处为直角，$\\angle BAC=30^\\circ$，$BC=1$。$D$ 在 $AC$ 上移动；过 $D$ 平行于 $AB$ 的直线交 $BC$ 于 $E$，平行于 $BC$ 的直线交 $AB$ 于 $F$。<b>下列哪些等于 $EF$ 的最小可能值？</b>"
    },
    figureText: {
      en: "The triangle with a point D on the hypotenuse and the rectangle BEDF drawn inside.",
      fr: "Le triangle, un point D sur l’hypoténuse et le rectangle BEDF à l’intérieur.",
      es: "El triángulo con un punto D en la hipotenusa y el rectángulo BEDF dentro.",
      ja: "斜辺上の点 D と内部の長方形 BEDF。",
      zh: "斜边上的点 D 与内部矩形 BEDF。"
    },
    hint: {
      en: "$BEDF$ is a rectangle, so its diagonals are equal: $EF=BD$.",
      fr: "$BEDF$ est un rectangle, ses diagonales sont égales : $EF=BD$.",
      es: "$BEDF$ es un rectángulo, así que sus diagonales son iguales: $EF=BD$.",
      ja: "$BEDF$ は長方形なので対角線は等しい：$EF=BD$。",
      zh: "$BEDF$ 是矩形，对角线相等：$EF=BD$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 2.6, scale: 80, pad: 16 });
      const B = [0.2, 0.3], A = [0.2 + Math.sqrt(3) * 1.3, 0.3], C = [0.2, 0.3 + 1.3];
      F.path([A, B, C], 'seg', 'base', true);
      const t = 0.55, D = [A[0] + t * (C[0] - A[0]), A[1] + t * (C[1] - A[1])];
      F.path([B, [B[0], D[1]], D, [D[0], B[1]]], 'seg thin', 'base', true); F.seg([B[0], D[1]], [D[0], B[1]], 'graph');
      [[A, 'A', 10, 12], [B, 'B', -10, 12], [C, 'C', -10, -6], [D, 'D', 8, -8], [[B[0], D[1]], 'E', -12, 0], [[D[0], B[1]], 'F', 0, 14]].forEach(([p, s, dx, dy]) => F.text(p, s, 'pt', dx, dy));
      F.reveal = () => {
      F.seg(B, D, 'hl pink');
      };
      return F;
    },
    options: [
      { tex: "\\tfrac{\\sqrt3}2", correct: true, why: {
        en: "$BD_{\\min}=\\dfrac{AB\\cdot BC}{AC}=\\dfrac{\\sqrt3\\cdot1}{2}$",
        fr: "$BD_{\\min}=\\dfrac{AB\\cdot BC}{AC}=\\dfrac{\\sqrt3\\cdot1}{2}$",
        es: "$BD_{\\min}=\\dfrac{AB\\cdot BC}{AC}=\\dfrac{\\sqrt3\\cdot1}{2}$",
        ja: "$BD_{\\min}=\\dfrac{AB\\cdot BC}{AC}=\\dfrac{\\sqrt3\\cdot1}{2}$",
        zh: "$BD_{\\min}=\\dfrac{AB\\cdot BC}{AC}=\\dfrac{\\sqrt3\\cdot1}{2}$"
      } },
      { tex: "\\sin60^\\circ", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{\\sqrt3}3", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt2}2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\sqrt3", correct: false, why: {
        en: "That is $AB$.",
        fr: "C’est $AB$.",
        es: "Es $AB$.",
        ja: "$AB$ の長さ。",
        zh: "那是 $AB$。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $BC$, when $D=C$; not the minimum.",
        fr: "C’est $BC$ (cas $D=C$) ; pas le minimum.",
        es: "Es $BC$ (cuando $D=C$); no el mínimo.",
        ja: "$D=C$ のときの $BC$。最小でない。",
        zh: "$D=C$ 时的 $BC$，不是最小值。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt3}4", correct: false, why: {
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
          en: "Rectangle diagonals",
          fr: "Diagonales du rectangle",
          es: "Diagonales del rectángulo",
          ja: "長方形の対角線",
          zh: "矩形的对角线"
        },
        lines: ["EF=BD"],
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
          en: "Shortest BD",
          fr: "BD le plus court",
          es: "BD más corto",
          ja: "BD の最小",
          zh: "最短的 BD"
        },
        lines: ["BD\\perp AC:\\ BD=\\frac{AB\\cdot BC}{AC}=\\frac{\\sqrt3\\cdot1}{2}"],
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
