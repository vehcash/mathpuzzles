/* matrix · AX = B, DX + Y = C: when is the solution unique?
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 38 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-ita-2024-matrix-system-ax-b",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 38",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 38",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 38",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第38問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 38 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "AX = B, DX + Y = C: when is the solution unique?",
      fr: "AX = B, DX + Y = C : quand la solution est-elle unique ?",
      es: "AX = B, DX + Y = C: ¿cuándo es única la solución?",
      ja: "AX = B, DX + Y = C：解が一意なのはいつ？",
      zh: "AX = B，DX + Y = C：何时解唯一？"
    },
    statement: {
      en: "$A,B,C,D$ are real $n\\times n$ matrices. Consider the system in the unknown matrices $X,Y$: $AX=B$, $DX+Y=C$. Three claims: (I) if $\\det A=0$ or $\\det D=0$ the system has no solution; (II) if $A=B$ the solution is unique; (III) the solution is unique only if $A$ and $D$ are both invertible. <b>Which of the following are true?</b>",
      fr: "$A,B,C,D$ sont des matrices réelles $n\\times n$. On considère le système d’inconnues $X,Y$ : $AX=B$, $DX+Y=C$. Trois affirmations : (I) si $\\det A=0$ ou $\\det D=0$, le système est impossible ; (II) si $A=B$, la solution est unique ; (III) la solution n’est unique que si $A$ et $D$ sont inversibles. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A,B,C,D$ son matrices reales $n\\times n$. Considera el sistema en las incógnitas $X,Y$: $AX=B$, $DX+Y=C$. Tres afirmaciones: (I) si $\\det A=0$ o $\\det D=0$, no hay solución; (II) si $A=B$, la solución es única; (III) la solución es única solo si $A$ y $D$ son invertibles. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A,B,C,D$ は実 $n\\times n$ 行列。未知行列 $X,Y$ の方程式系 $AX=B$, $DX+Y=C$ について：(I) $\\det A=0$ または $\\det D=0$ なら解はない；(II) $A=B$ なら解は一意；(III) 解が一意なのは $A$ と $D$ がともに正則なときに限る。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$A,B,C,D$ 为 $n\\times n$ 实矩阵。关于未知矩阵 $X,Y$ 的方程组 $AX=B$，$DX+Y=C$：(I) 若 $\\det A=0$ 或 $\\det D=0$ 则无解；(II) 若 $A=B$ 则解唯一；(III) 解唯一仅当 $A$ 与 $D$ 都可逆。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The block system as two stacked equations: first X, then Y.",
      fr: "Le système en deux équations empilées : d’abord X, puis Y.",
      es: "El sistema en dos ecuaciones apiladas: primero X, luego Y.",
      ja: "2本の式：まず X、次に Y。",
      zh: "两层方程：先求 X，再求 Y。"
    },
    hint: {
      en: "$Y$ is always determined by $X$: $Y=C-DX$. So everything depends on $AX=B$.",
      fr: "$Y$ est toujours déterminé par $X$ : $Y=C-DX$. Tout dépend donc de $AX=B$.",
      es: "$Y$ siempre queda determinada por $X$: $Y=C-DX$. Todo depende de $AX=B$.",
      ja: "$Y=C-DX$ で $Y$ は $X$ から決まる。すべては $AX=B$ 次第。",
      zh: "$Y=C-DX$ 总由 $X$ 决定，关键在 $AX=B$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 2.0, scale: 50, pad: 16 });
      F.rect(0.3, 1.05, 4.2, 0.7, 'fill-blue', 'fills'); F.text([2.4, 1.4], 'A X = B', 'pt', 0, 0);
      F.rect(0.3, 0.2, 4.2, 0.7, 'fill-blue', 'fills'); F.text([2.4, 0.55], 'D X + Y = C', 'pt', 0, 0);
      F.reveal = () => {
      F.rect(0.3, 0.2, 4.2, 0.7, 'fill-yellow', 'fills'); F.text([2.4, 0.55], 'Y = C − D X', 'pt', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "A X = B": {"fr": "A X = B", "es": "A X = B", "ja": "A X = B", "zh": "A X = B"},
      "D X + Y = C": {"fr": "D X + Y = C", "es": "D X + Y = C", "ja": "D X + Y = C", "zh": "D X + Y = C"},
      "Y = C − D X": {"fr": "Y = C − D X", "es": "Y = C − D X", "ja": "Y = C − D X", "zh": "Y = C − D X"},
      "none of (I), (II), (III) is true": {"fr": "aucune de (I), (II), (III) n’est vraie", "es": "ninguna de (I), (II), (III) es verdadera", "ja": "(I), (II), (III) はいずれも正しくない", "zh": "(I)、(II)、(III) 都不对"},
      "unique solution": {"fr": "solution unique", "es": "solución única", "ja": "解が一意", "zh": "解唯一"},
      "invertible": {"fr": "inversible", "es": "invertible", "ja": "正則", "zh": "可逆"},
      "(I) is true": {"fr": "(I) est vraie", "es": "(I) es verdadera", "ja": "(I) は正しい", "zh": "(I) 正确"},
      "(II) is true": {"fr": "(II) est vraie", "es": "(II) es verdadera", "ja": "(II) は正しい", "zh": "(II) 正确"},
      "(III) is true": {"fr": "(III) est vraie", "es": "(III) es verdadera", "ja": "(III) は正しい", "zh": "(III) 正确"},
      "(II) and (III) are true": {"fr": "(II) et (III) sont vraies", "es": "(II) y (III) son verdaderas", "ja": "(II) と (III) は正しい", "zh": "(II) 与 (III) 正确"},
      "is needed for a solution": {"fr": "est nécessaire pour qu’il y ait une solution", "es": "es necesario para que haya solución", "ja": "は解の存在に必要", "zh": "是有解的必要条件"},
      "if": {"fr": "si", "es": "si", "ja": "もし", "zh": "若"},
      "there is never a solution": {"fr": "il n’y a jamais de solution", "es": "nunca hay solución", "ja": "解は決してない", "zh": "永远无解"},
      "(I), (II) fail": {"fr": "(I) et (II) échouent", "es": "(I) y (II) fallan", "ja": "(I), (II) は不成立", "zh": "(I)、(II) 不成立"},
      "(III) fails": {"fr": "(III) échoue", "es": "(III) falla", "ja": "(III) は不成立", "zh": "(III) 不成立"}
    },
    options: [
      { tex: "\\text{none of (I), (II), (III) is true}", correct: true, why: {
        en: "Each claim fails for a simple choice of matrices.",
        fr: "Chaque affirmation échoue pour un choix simple de matrices.",
        es: "Cada afirmación falla con matrices sencillas.",
        ja: "どれも簡単な反例がある。",
        zh: "每条都有简单反例。"
      } },
      { tex: "\\text{unique solution}\\iff A\\ \\text{invertible}", correct: true, why: {
        en: "$Y=C-DX$ is forced, so uniqueness is uniqueness of $X$ in $AX=B$.",
        fr: "$Y=C-DX$ est imposé : l’unicité est celle de $X$ dans $AX=B$.",
        es: "$Y=C-DX$ está forzada: la unicidad es la de $X$ en $AX=B$.",
        ja: "$Y=C-DX$ は決まるので、一意性は $AX=B$ の $X$ の一意性。",
        zh: "$Y=C-DX$ 确定，唯一性取决于 $AX=B$。"
      } },
      { tex: "\\text{(I) is true}", correct: false, why: {
        en: "$A=B=0$: every $X$ works, so there are many solutions.",
        fr: "$A=B=0$ : tout $X$ convient, il y a une infinité de solutions.",
        es: "$A=B=0$: cualquier $X$ sirve, hay infinitas soluciones.",
        ja: "$A=B=0$ ならどの $X$ も解。",
        zh: "$A=B=0$ 时任意 $X$ 都是解。"
      } },
      { tex: "\\text{(II) is true}", correct: false, why: {
        en: "$A=B=0$ again: $X$ is arbitrary.",
        fr: "Encore $A=B=0$ : $X$ quelconque.",
        es: "De nuevo $A=B=0$: $X$ arbitraria.",
        ja: "再び $A=B=0$ で $X$ は任意。",
        zh: "仍取 $A=B=0$，$X$ 任意。"
      } },
      { tex: "\\text{(III) is true}", correct: false, why: {
        en: "$A=I$, $D=0$: unique solution $X=B$, $Y=C$ although $D$ is singular.",
        fr: "$A=I$, $D=0$ : solution unique $X=B$, $Y=C$ alors que $D$ est singulière.",
        es: "$A=I$, $D=0$: solución única $X=B$, $Y=C$ aunque $D$ sea singular.",
        ja: "$A=I$, $D=0$ で一意解 $X=B, Y=C$、$D$ は特異。",
        zh: "$A=I$，$D=0$ 时唯一解 $X=B$，$Y=C$，而 $D$ 奇异。"
      } },
      { tex: "\\text{(II) and (III) are true}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\det D\\ne0\\ \\text{is needed for a solution}", correct: false, why: {
        en: "$D=0:\\ Y=C$",
        fr: "$D=0:\\ Y=C$",
        es: "$D=0:\\ Y=C$",
        ja: "$D=0:\\ Y=C$",
        zh: "$D=0:\\ Y=C$"
      } },
      { tex: "\\text{if}\\ \\det A=0\\ \\text{there is never a solution}", correct: false, why: {
        en: "$A=B=0$",
        fr: "$A=B=0$",
        es: "$A=B=0$",
        ja: "$A=B=0$",
        zh: "$A=B=0$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Y is determined",
          fr: "Y est déterminée",
          es: "Y queda determinada",
          ja: "Y は決まる",
          zh: "Y 被确定"
        },
        lines: ["DX+Y=C\\iff Y=C-DX"],
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
          en: "Counterexamples",
          fr: "Contre-exemples",
          es: "Contraejemplos",
          ja: "反例",
          zh: "反例"
        },
        lines: ["A=B=0:\\ \\text{(I), (II) fail};\\qquad A=I,\\ D=0:\\ \\text{(III) fails}"],
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
