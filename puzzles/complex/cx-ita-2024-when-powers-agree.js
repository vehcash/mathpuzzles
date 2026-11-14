/* complex · When is aᵐ = bᵐ?
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 46 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-ita-2024-when-powers-agree",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 46",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 46",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 46",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第46問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 46 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "When is aᵐ = bᵐ?",
      fr: "Quand aᵐ = bᵐ ?",
      es: "¿Cuándo es aᵐ = bᵐ?",
      ja: "aᵐ = bᵐ となるのは？",
      zh: "何时 aᵐ = bᵐ？"
    },
    statement: {
      en: "Let $a=1+3\\sqrt3\\,i$ and $b=2\\sqrt3+4i$. Let $m$ be the smallest positive integer with $a^m=b^m$. <b>Which of the following are true?</b>",
      fr: "Soit $a=1+3\\sqrt3\\,i$ et $b=2\\sqrt3+4i$. Soit $m$ le plus petit entier strictement positif tel que $a^m=b^m$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sean $a=1+3\\sqrt3\\,i$ y $b=2\\sqrt3+4i$. Sea $m$ el menor entero positivo con $a^m=b^m$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$a=1+3\\sqrt3\\,i$、$b=2\\sqrt3+4i$ とし、$a^m=b^m$ となる最小の正の整数を $m$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $a=1+3\\sqrt3\\,i$，$b=2\\sqrt3+4i$，$m$ 为使 $a^m=b^m$ 的最小正整数。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The points a and b in the complex plane, at the same distance from 0.",
      fr: "Les points a et b dans le plan complexe, à même distance de 0.",
      es: "Los puntos a y b en el plano complejo, a igual distancia de 0.",
      ja: "複素平面上の a と b（0 からの距離が等しい）。",
      zh: "复平面上的 a、b，到 0 的距离相等。"
    },
    hint: {
      en: "$|a|=|b|$, so $a^m=b^m\\iff(a/b)^m=1$. Compute $a/b$.",
      fr: "$|a|=|b|$, donc $a^m=b^m\\iff(a/b)^m=1$. Calculez $a/b$.",
      es: "$|a|=|b|$, así $a^m=b^m\\iff(a/b)^m=1$. Calcula $a/b$.",
      ja: "$|a|=|b|$ より $a^m=b^m\\iff(a/b)^m=1$。$a/b$ を計算。",
      zh: "$|a|=|b|$，故 $a^m=b^m\\iff(a/b)^m=1$，求 $a/b$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.2, h: 4.2, scale: 52, pad: 16 });
      const S = ([x, y]) => [0.6 + x * 0.6, 0.6 + y * 0.6];
      F.seg(S([-0.8, 0]), S([5.8, 0]), 'axis'); F.seg(S([0, -0.8]), S([0, 5.8]), 'axis');
      const a = [1, 3 * Math.sqrt(3)], b = [2 * Math.sqrt(3), 4];
      F.seg(S([0, 0]), S(a), 'seg'); F.seg(S([0, 0]), S(b), 'seg'); F.dot(S(a)); F.dot(S(b)); F.text(S(a), 'a', 'pt', 10, -6); F.text(S(b), 'b', 'pt', 10, -6);
      F.reveal = () => {
      F.arc(S([0, 0]), 1.2, 49.1, 79.1, 'hl pink'); F.text(S([1.3, 1.9]), '30°', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "for every": {"fr": "pour tout", "es": "para todo", "ja": "すべての", "zh": "对所有"}
    },
    options: [
      { tex: "m=12", correct: true, why: {
        en: "$a/b=\\cos30^\\circ+i\\sin30^\\circ$, a primitive $12$th root of unity.",
        fr: "$a/b=\\cos30^\\circ+i\\sin30^\\circ$, racine primitive $12$-ième de l’unité.",
        es: "$a/b=\\cos30^\\circ+i\\sin30^\\circ$, raíz duodécima primitiva de la unidad.",
        ja: "$a/b=\\cos30^\\circ+i\\sin30^\\circ$ は1の原始12乗根。",
        zh: "$a/b=\\cos30^\\circ+i\\sin30^\\circ$ 是 $12$ 次本原单位根。"
      } },
      { tex: "\\tfrac ab=\\tfrac{\\sqrt3}2+\\tfrac12i", correct: true, why: {
        en: "$\\tfrac{(1+3\\sqrt3i)(2\\sqrt3-4i)}{28}=\\tfrac{14\\sqrt3+14i}{28}$",
        fr: "$\\tfrac{(1+3\\sqrt3i)(2\\sqrt3-4i)}{28}=\\tfrac{14\\sqrt3+14i}{28}$",
        es: "$\\tfrac{(1+3\\sqrt3i)(2\\sqrt3-4i)}{28}=\\tfrac{14\\sqrt3+14i}{28}$",
        ja: "$\\tfrac{(1+3\\sqrt3i)(2\\sqrt3-4i)}{28}=\\tfrac{14\\sqrt3+14i}{28}$",
        zh: "$\\tfrac{(1+3\\sqrt3i)(2\\sqrt3-4i)}{28}=\\tfrac{14\\sqrt3+14i}{28}$"
      } },
      { tex: "m=6", correct: false, why: {
        en: "$(a/b)^6=-1\\ne1$.",
        fr: "$(a/b)^6=-1\\ne1$.",
        es: "$(a/b)^6=-1\\ne1$.",
        ja: "$(a/b)^6=-1\\ne1$。",
        zh: "$(a/b)^6=-1\\ne1$。"
      } },
      { tex: "m=8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "m=10", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a^m\\ne b^m\\ \\text{for every}\\ m\\ge1", correct: false, why: {
        en: "That would happen if $|a|\\ne|b|$; here $|a|=|b|=\\sqrt{28}$.",
        fr: "Ce serait le cas si $|a|\\ne|b|$ ; ici $|a|=|b|=\\sqrt{28}$.",
        es: "Ocurriría si $|a|\\ne|b|$; aquí $|a|=|b|=\\sqrt{28}$.",
        ja: "$|a|\\ne|b|$ ならそうだが、ここでは $|a|=|b|=\\sqrt{28}$。",
        zh: "若 $|a|\\ne|b|$ 才如此，这里 $|a|=|b|=\\sqrt{28}$。"
      } },
      { tex: "|a|=\\sqrt{28}\\ne|b|", correct: false, why: {
        en: "$|b|^2=12+16=28$",
        fr: "$|b|^2=12+16=28$",
        es: "$|b|^2=12+16=28$",
        ja: "$|b|^2=12+16=28$",
        zh: "$|b|^2=12+16=28$"
      } },
      { tex: "m=24", correct: false, why: {
        en: "It works, but $12$ is smaller.",
        fr: "Il convient, mais $12$ est plus petit.",
        es: "Funciona, pero $12$ es menor.",
        ja: "成り立つが $12$ の方が小さい。",
        zh: "成立，但 $12$ 更小。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Same modulus",
          fr: "Même module",
          es: "Mismo módulo",
          ja: "絶対値が同じ",
          zh: "模相同"
        },
        lines: ["|a|^2=1+27=28=12+16=|b|^2"],
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
          en: "The ratio",
          fr: "Le quotient",
          es: "El cociente",
          ja: "比",
          zh: "商"
        },
        lines: ["\\tfrac ab=e^{i\\pi/6}\\Rightarrow\\left(\\tfrac ab\\right)^m=1\\iff12\\mid m"],
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
