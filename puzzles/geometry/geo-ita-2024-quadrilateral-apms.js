/* geometry · A quadrilateral cut out of a triangle of area 24
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 45 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-ita-2024-quadrilateral-apms",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 45",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 45",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 45",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第45問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 45 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "A quadrilateral cut out of a triangle of area 24",
      fr: "Un quadrilatère découpé dans un triangle d’aire 24",
      es: "Un cuadrilátero recortado de un triángulo de área 24",
      ja: "面積24の三角形から切り出す四角形",
      zh: "从面积 24 的三角形中截出的四边形"
    },
    statement: {
      en: "Triangle $ABC$ has area $24$ and $M$ is the midpoint of $BC$. $R\\ne A$ is on line $AB$ with $AB=BR$; $Q$ is on line $AC$, outside segment $AC$, with $AC=2\\,CQ$. Line $RM$ meets $AC$ at $S$ and line $QM$ meets $AB$ at $P$. Let $K$ be the area of $APMS$. <b>Which of the following are true?</b>",
      fr: "Le triangle $ABC$ a une aire de $24$ et $M$ est le milieu de $BC$. $R\\ne A$ est sur la droite $AB$ avec $AB=BR$ ; $Q$ est sur la droite $AC$, hors du segment $AC$, avec $AC=2\\,CQ$. La droite $RM$ coupe $AC$ en $S$, la droite $QM$ coupe $AB$ en $P$. Soit $K$ l’aire de $APMS$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El triángulo $ABC$ tiene área $24$ y $M$ es el punto medio de $BC$. $R\\ne A$ está en la recta $AB$ con $AB=BR$; $Q$ está en la recta $AC$, fuera del segmento $AC$, con $AC=2\\,CQ$. La recta $RM$ corta $AC$ en $S$ y la recta $QM$ corta $AB$ en $P$. Sea $K$ el área de $APMS$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "三角形 $ABC$ の面積は $24$、$M$ は $BC$ の中点。$R\\ne A$ は直線 $AB$ 上で $AB=BR$；$Q$ は線分 $AC$ の外の直線 $AC$ 上で $AC=2\\,CQ$。直線 $RM$ と $AC$ の交点を $S$、直線 $QM$ と $AB$ の交点を $P$ とし、$APMS$ の面積を $K$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "三角形 $ABC$ 面积为 $24$，$M$ 为 $BC$ 中点。$R\\ne A$ 在直线 $AB$ 上且 $AB=BR$；$Q$ 在直线 $AC$ 上、线段 $AC$ 外，且 $AC=2\\,CQ$。直线 $RM$ 交 $AC$ 于 $S$，直线 $QM$ 交 $AB$ 于 $P$。设 $APMS$ 面积为 $K$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Triangle ABC with R beyond B, Q beyond C and the midpoint M of BC.",
      fr: "Le triangle ABC, R au-delà de B, Q au-delà de C et le milieu M de BC.",
      es: "El triángulo ABC, R más allá de B, Q más allá de C y el punto medio M de BC.",
      ja: "三角形 ABC、B の先の R、C の先の Q、BC の中点 M。",
      zh: "三角形 ABC，B 外的 R，C 外的 Q，BC 中点 M。"
    },
    hint: {
      en: "Use coordinates $A=(0,0)$, $B=(8,0)$, $C=(0,6)$: area $24$. Area ratios do not depend on the shape.",
      fr: "Prenez $A=(0,0)$, $B=(8,0)$, $C=(0,6)$ : aire $24$. Les rapports d’aires ne dépendent pas de la forme.",
      es: "Usa $A=(0,0)$, $B=(8,0)$, $C=(0,6)$: área $24$. Las razones de áreas no dependen de la forma.",
      ja: "$A=(0,0), B=(8,0), C=(0,6)$（面積24）とおく。面積比は形によらない。",
      zh: "取 $A=(0,0)$，$B=(8,0)$，$C=(0,6)$，面积 $24$；面积比与形状无关。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 3.6, scale: 30, pad: 16 });
      const S0 = ([x, y]) => [0.3 + x * 0.3, 0.3 + y * 0.36];
      const A = [0, 0], B = [8, 0], C = [0, 6], M = [4, 3], R = [16, 0], Q = [0, 9];
      F.path([S0(A), S0(B), S0(C)], 'seg'); F.seg(S0(B), S0(R), 'seg thin dashc'); F.seg(S0(C), S0(Q), 'seg thin dashc');
      [[A, 'A', -10, 10], [B, 'B', 0, 14], [C, 'C', -12, 0], [M, 'M', 10, -6], [R, 'R', 0, 14], [Q, 'Q', -12, 0]].forEach(([p, t, dx, dy]) => { F.dot(S0(p)); F.text(S0(p), t, 'pt', dx, dy); });
      F.reveal = () => {
      F.seg(S0(R), S0([0, 4]), 'seg thin'); F.seg(S0(Q), S0([6, 0]), 'seg thin');
      F.path([S0(A), S0([6, 0]), S0(M), S0([0, 4])], 'fill-yellow', 'fills'); F.text(S0([2.4, 1.6]), '17', 'pt', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "is the midpoint of": {"fr": "est le milieu de", "es": "es el punto medio de", "ja": "は次の中点：", "zh": "是下列线段中点"}
    },
    options: [
      { tex: "K=17", correct: true, why: {
        en: "$[APM]+[AMS]=\\tfrac12\\cdot6\\cdot3+\\tfrac12\\cdot4\\cdot4=9+8$",
        fr: "$[APM]+[AMS]=\\tfrac12\\cdot6\\cdot3+\\tfrac12\\cdot4\\cdot4=9+8$",
        es: "$[APM]+[AMS]=\\tfrac12\\cdot6\\cdot3+\\tfrac12\\cdot4\\cdot4=9+8$",
        ja: "$[APM]+[AMS]=\\tfrac12\\cdot6\\cdot3+\\tfrac12\\cdot4\\cdot4=9+8$",
        zh: "$[APM]+[AMS]=\\tfrac12\\cdot6\\cdot3+\\tfrac12\\cdot4\\cdot4=9+8$"
      } },
      { tex: "AP=\\tfrac34AB\\ \\text{and}\\ AS=\\tfrac23AC", correct: true, why: {
        en: "$P=(6,0),\\ S=(0,4)$",
        fr: "$P=(6,0),\\ S=(0,4)$",
        es: "$P=(6,0),\\ S=(0,4)$",
        ja: "$P=(6,0),\\ S=(0,4)$",
        zh: "$P=(6,0),\\ S=(0,4)$"
      } },
      { tex: "K=16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "K=15", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "K=18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "K=12", correct: false, why: {
        en: "Half the triangle: that would be $ABM$.",
        fr: "La moitié du triangle : ce serait $ABM$.",
        es: "La mitad del triángulo: sería $ABM$.",
        ja: "三角形の半分で、それは $ABM$。",
        zh: "三角形一半，那是 $ABM$。"
      } },
      { tex: "K=19", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "S\\ \\text{is the midpoint of}\\ AC", correct: false, why: {
        en: "$AS=\\tfrac23AC$",
        fr: "$AS=\\tfrac23AC$",
        es: "$AS=\\tfrac23AC$",
        ja: "$AS=\\tfrac23AC$",
        zh: "$AS=\\tfrac23AC$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Coordinates",
          fr: "Coordonnées",
          es: "Coordenadas",
          ja: "座標",
          zh: "坐标"
        },
        lines: ["M=(4,3),\\ R=(16,0),\\ Q=(0,9)\\Rightarrow S=(0,4),\\ P=(6,0)"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["[APMS]=[APM]+[AMS]=9+8=17"],
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
