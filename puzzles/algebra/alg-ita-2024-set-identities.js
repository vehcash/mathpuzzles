/* algebra · Three set identities when C ⊆ A
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 37 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2024-set-identities",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 37",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 37",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 37",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第37問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 37 题"
      },
      exams: ["ita"]
    },
    difficulty: 2,
    title: {
      en: "Three set identities when C ⊆ A",
      fr: "Trois identités ensemblistes quand C ⊆ A",
      es: "Tres identidades de conjuntos cuando C ⊆ A",
      ja: "C ⊆ A のときの3つの集合等式",
      zh: "C ⊆ A 时的三个集合等式"
    },
    statement: {
      en: "$A,B,C\\subseteq\\mathbb R$ with $C\\subseteq A$. Consider (I) $(A\\cap B)\\cup C=A\\cap(B\\cup C)$; (II) $A\\cap B=C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)$; (III) $A\\cap(B\\setminus C)=(A\\cap B)\\setminus C$. <b>Which of the following are true?</b>",
      fr: "$A,B,C\\subseteq\\mathbb R$ avec $C\\subseteq A$. On considère (I) $(A\\cap B)\\cup C=A\\cap(B\\cup C)$ ; (II) $A\\cap B=C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)$ ; (III) $A\\cap(B\\setminus C)=(A\\cap B)\\setminus C$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A,B,C\\subseteq\\mathbb R$ con $C\\subseteq A$. Considera (I) $(A\\cap B)\\cup C=A\\cap(B\\cup C)$; (II) $A\\cap B=C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)$; (III) $A\\cap(B\\setminus C)=(A\\cap B)\\setminus C$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A,B,C\\subseteq\\mathbb R$、$C\\subseteq A$ とします。(I) $(A\\cap B)\\cup C=A\\cap(B\\cup C)$；(II) $A\\cap B=C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)$；(III) $A\\cap(B\\setminus C)=(A\\cap B)\\setminus C$ を考えます。 <b>次のうち正しいものはどれですか？</b>",
      zh: "$A,B,C\\subseteq\\mathbb R$，$C\\subseteq A$。考虑 (I) $(A\\cap B)\\cup C=A\\cap(B\\cup C)$；(II) $A\\cap B=C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)$；(III) $A\\cap(B\\setminus C)=(A\\cap B)\\setminus C$。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A Venn diagram of A and B with C drawn inside A.",
      fr: "Un diagramme de Venn de A et B, avec C dans A.",
      es: "Un diagrama de Venn de A y B con C dentro de A.",
      ja: "A と B のベン図、C は A の内部。",
      zh: "A、B 的文氏图，C 在 A 内。"
    },
    hint: {
      en: "Simplify each side using $C\\subseteq A$, e.g. $A\\cap C=C$.",
      fr: "Simplifiez chaque membre avec $C\\subseteq A$, par ex. $A\\cap C=C$.",
      es: "Simplifica cada lado con $C\\subseteq A$, p. ej. $A\\cap C=C$.",
      ja: "$C\\subseteq A$（例：$A\\cap C=C$）で各辺を整理。",
      zh: "利用 $C\\subseteq A$ 化简，如 $A\\cap C=C$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.8, h: 3.0, scale: 50, pad: 16 });
      F.circle([1.8, 1.5], 1.25, 'seg'); F.circle([3.1, 1.5], 1.25, 'seg'); F.circle([1.5, 1.2], 0.55, 'seg thin dashc');
      F.text([1.0, 2.5], 'A', 'pt', 0, 0); F.text([3.9, 2.5], 'B', 'pt', 0, 0); F.text([1.4, 1.2], 'C', 'pt', 0, 0);
      F.reveal = () => {
      F.text([2.45, 0.05], 'I ✓  II ✗  III ✓', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "I ✓  II ✗  III ✓": {"fr": "I ✓  II ✗  III ✓", "es": "I ✓  II ✗  III ✓", "ja": "I ✓  II ✗  III ✓", "zh": "I ✓  II ✗  III ✓"},
      "(I) and (III) always hold, (II) does not": {"fr": "(I) et (III) sont toujours vraies, (II) non", "es": "(I) y (III) siempre se cumplen, (II) no", "ja": "(I) と (III) は常に成立、(II) は不成立", "zh": "(I) 与 (III) 恒成立，(II) 不成立"},
      "(I), (II) and (III) always hold": {"fr": "(I), (II) et (III) sont toujours vraies", "es": "(I), (II) y (III) siempre se cumplen", "ja": "(I), (II), (III) は常に成立", "zh": "(I)、(II)、(III) 恒成立"},
      "only (II) always holds": {"fr": "seule (II) est toujours vraie", "es": "solo (II) se cumple siempre", "ja": "常に成立するのは (II) のみ", "zh": "只有 (II) 恒成立"},
      "only (III) always holds": {"fr": "seule (III) est toujours vraie", "es": "solo (III) se cumple siempre", "ja": "常に成立するのは (III) のみ", "zh": "只有 (III) 恒成立"},
      "(I) and (II) always hold": {"fr": "(I) et (II) sont toujours vraies", "es": "(I) y (II) siempre se cumplen", "ja": "(I) と (II) は常に成立", "zh": "(I) 与 (II) 恒成立"},
      "(III) needs": {"fr": "(III) exige", "es": "(III) requiere", "ja": "(III) には次が必要：", "zh": "(III) 需要"},
      "in general": {"fr": "en général", "es": "en general", "ja": "一般には", "zh": "一般地"}
    },
    options: [
      { tex: "\\text{(I) and (III) always hold, (II) does not}", correct: true, why: {
        en: "(II) reduces to $A\\cap B=B\\cup C$, false in general.",
        fr: "(II) se ramène à $A\\cap B=B\\cup C$, faux en général.",
        es: "(II) se reduce a $A\\cap B=B\\cup C$, falso en general.",
        ja: "(II) は $A\\cap B=B\\cup C$ となり一般には偽。",
        zh: "(II) 化为 $A\\cap B=B\\cup C$，一般不成立。"
      } },
      { tex: "A\\cap(B\\cup C)=(A\\cap B)\\cup C", correct: true, why: {
        en: "$(A\\cap B)\\cup(A\\cap C)=(A\\cap B)\\cup C$",
        fr: "$(A\\cap B)\\cup(A\\cap C)=(A\\cap B)\\cup C$",
        es: "$(A\\cap B)\\cup(A\\cap C)=(A\\cap B)\\cup C$",
        ja: "$(A\\cap B)\\cup(A\\cap C)=(A\\cap B)\\cup C$",
        zh: "$(A\\cap B)\\cup(A\\cap C)=(A\\cap B)\\cup C$"
      } },
      { tex: "\\text{(I), (II) and (III) always hold}", correct: false, why: {
        en: "$A=\\{1,2\\},\\ B=\\{3\\},\\ C=\\{1\\}:\\ \\varnothing\\ne\\{1,3\\}$",
        fr: "$A=\\{1,2\\},\\ B=\\{3\\},\\ C=\\{1\\}:\\ \\varnothing\\ne\\{1,3\\}$",
        es: "$A=\\{1,2\\},\\ B=\\{3\\},\\ C=\\{1\\}:\\ \\varnothing\\ne\\{1,3\\}$",
        ja: "$A=\\{1,2\\},\\ B=\\{3\\},\\ C=\\{1\\}:\\ \\varnothing\\ne\\{1,3\\}$",
        zh: "$A=\\{1,2\\},\\ B=\\{3\\},\\ C=\\{1\\}:\\ \\varnothing\\ne\\{1,3\\}$"
      } },
      { tex: "\\text{only (II) always holds}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\text{only (III) always holds}", correct: false, why: {
        en: "(I) holds too.",
        fr: "(I) est vraie aussi.",
        es: "(I) también se cumple.",
        ja: "(I) も成り立つ。",
        zh: "(I) 也成立。"
      } },
      { tex: "\\text{(I) and (II) always hold}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "C\\cup\\big(B\\cap(\\mathbb R\\setminus C)\\big)=B\\cap C", correct: false, why: {
        en: "$=B\\cup C$",
        fr: "$=B\\cup C$",
        es: "$=B\\cup C$",
        ja: "$=B\\cup C$",
        zh: "$=B\\cup C$"
      } },
      { tex: "\\text{(III) needs}\\ C\\subseteq A", correct: false, why: {
        en: "(III) holds for any sets: both sides are $A\\cap B\\cap C^c$.",
        fr: "(III) vaut pour tous ensembles : les deux membres valent $A\\cap B\\cap C^c$.",
        es: "(III) vale para cualquier conjunto: ambos lados son $A\\cap B\\cap C^c$.",
        ja: "(III) は常に成立：両辺とも $A\\cap B\\cap C^c$。",
        zh: "(III) 对任意集合成立：两边都是 $A\\cap B\\cap C^c$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "(I) and (III)",
          fr: "(I) et (III)",
          es: "(I) y (III)",
          ja: "(I) と (III)",
          zh: "(I) 与 (III)"
        },
        lines: ["A\\cap(B\\cup C)=(A\\cap B)\\cup C;\\quad A\\cap B\\cap C^c=(A\\cap B)\\setminus C"],
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
          en: "(II)",
          fr: "(II)",
          es: "(II)",
          ja: "(II)",
          zh: "(II)"
        },
        lines: ["C\\cup(B\\cap C^c)=B\\cup C\\ne A\\cap B\\ \\text{in general}"],
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
