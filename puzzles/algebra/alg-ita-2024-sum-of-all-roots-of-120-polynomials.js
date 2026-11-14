/* algebra · The roots of 120 polynomials, all added up
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 41 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-ita-2024-sum-of-all-roots-of-120-polynomials",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2024, 1st phase, Mathematics, Question 41",
        fr: "Concours de l’ITA (Brésil) 2024, 1re phase, mathématiques, question 41",
        es: "Examen de ingreso del ITA (Brasil) 2024, 1.ª fase, matemáticas, pregunta 41",
        ja: "ITA（ブラジル航空技術大学）2024 入試 第1次 数学 第41問",
        zh: "巴西航空技术学院 ITA 2024 入学考试第一阶段数学第 41 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "The roots of 120 polynomials, all added up",
      fr: "Les racines de 120 polynômes, toutes additionnées",
      es: "Las raíces de 120 polinomios, todas sumadas",
      ja: "120 個の多項式の解をすべて足す",
      zh: "120 个多项式的全部根之和"
    },
    statement: {
      en: "For each arrangement $(a_0,a_1,a_2,a_3,a_4)$ of the numbers $1,2,3,4,5$, form $p(x)=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$. Let $T$ be the sum of all the roots (with multiplicity) of all these $120$ polynomials. <b>Which of the following are true?</b>",
      fr: "Pour chaque disposition $(a_0,a_1,a_2,a_3,a_4)$ des nombres $1,2,3,4,5$, on forme $p(x)=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$. Soit $T$ la somme de toutes les racines (avec multiplicité) de ces $120$ polynômes. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Para cada ordenación $(a_0,a_1,a_2,a_3,a_4)$ de $1,2,3,4,5$ se forma $p(x)=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$. Sea $T$ la suma de todas las raíces (con multiplicidad) de esos $120$ polinomios. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$1,2,3,4,5$ の並べ方 $(a_0,a_1,a_2,a_3,a_4)$ ごとに $p(x)=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$ を作ります。これら $120$ 個の多項式のすべての解（重複込み）の和を $T$ とします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "对 $1,2,3,4,5$ 的每个排列 $(a_0,\\dots,a_4)$ 作 $p(x)=a_0+a_1x+\\dots+a_4x^4$。设 $T$ 为这 $120$ 个多项式所有根（计重数）之和。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Only the last two coefficients a₃ and a₄ are highlighted.",
      fr: "Seuls les deux derniers coefficients a₃ et a₄ sont mis en valeur.",
      es: "Solo se resaltan los dos últimos coeficientes a₃ y a₄.",
      ja: "最後の2係数 a₃, a₄ だけを強調。",
      zh: "只突出最后两个系数 a₃、a₄。"
    },
    hint: {
      en: "Each polynomial contributes $-\\tfrac{a_3}{a_4}$. Each ordered pair $(a_3,a_4)$ of distinct values appears $3!=6$ times.",
      fr: "Chaque polynôme apporte $-\\tfrac{a_3}{a_4}$. Chaque couple ordonné $(a_3,a_4)$ de valeurs distinctes apparaît $3!=6$ fois.",
      es: "Cada polinomio aporta $-\\tfrac{a_3}{a_4}$. Cada par ordenado $(a_3,a_4)$ de valores distintos aparece $3!=6$ veces.",
      ja: "各多項式の寄与は $-\\tfrac{a_3}{a_4}$。異なる値の順序対 $(a_3,a_4)$ は $3!=6$ 回ずつ現れる。",
      zh: "每个多项式贡献 $-\\tfrac{a_3}{a_4}$，每个有序对 $(a_3,a_4)$ 出现 $3!=6$ 次。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 1.6, scale: 48, pad: 16 });
      ['a₀', 'a₁', 'a₂', 'a₃', 'a₄'].forEach((t, k) => { F.rect(0.3 + k * 1.1, 0.4, 0.95, 0.75, k >= 3 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([0.78 + k * 1.1, 0.78], t, 'pt', 0, 0); });
      F.reveal = () => {
      F.text([4.6, 1.45], '− a₃ / a₄', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a₀": {"fr": "a₀", "es": "a₀", "ja": "a₀", "zh": "a₀"},
      "a₁": {"fr": "a₁", "es": "a₁", "ja": "a₁", "zh": "a₁"},
      "a₂": {"fr": "a₂", "es": "a₂", "ja": "a₂", "zh": "a₂"},
      "a₃": {"fr": "a₃", "es": "a₃", "ja": "a₃", "zh": "a₃"},
      "a₄": {"fr": "a₄", "es": "a₄", "ja": "a₄", "zh": "a₄"},
      "− a₃ / a₄": {"fr": "− a₃ / a₄", "es": "− a₃ / a₄", "ja": "− a₃ / a₄", "zh": "− a₃ / a₄"},
      "each polynomial’s roots add to": {"fr": "les racines de chaque polynôme ont pour somme", "es": "las raíces de cada polinomio suman", "ja": "各多項式の解の和は", "zh": "每个多项式根之和为"},
      "roots of": {"fr": "les racines de", "es": "las raíces de", "ja": "の解", "zh": "的根"},
      "sum to": {"fr": "ont pour somme", "es": "suman", "ja": "の和は", "zh": "之和为"}
    },
    options: [
      { tex: "T=-\\tfrac{351}{2}", correct: true, why: {
        en: "$-6\\sum_{i\\ne j}\\tfrac{i}{j}=-6\\cdot\\tfrac{117}{4}$",
        fr: "$-6\\sum_{i\\ne j}\\tfrac{i}{j}=-6\\cdot\\tfrac{117}{4}$",
        es: "$-6\\sum_{i\\ne j}\\tfrac{i}{j}=-6\\cdot\\tfrac{117}{4}$",
        ja: "$-6\\sum_{i\\ne j}\\tfrac{i}{j}=-6\\cdot\\tfrac{117}{4}$",
        zh: "$-6\\sum_{i\\ne j}\\tfrac{i}{j}=-6\\cdot\\tfrac{117}{4}$"
      } },
      { tex: "\\sum_{i\\ne j}\\tfrac ij=\\tfrac{117}{4}", correct: true, why: {
        en: "$\\left(\\sum i\\right)\\left(\\sum\\tfrac1j\\right)-5=15\\cdot\\tfrac{137}{60}-5$",
        fr: "$\\left(\\sum i\\right)\\left(\\sum\\tfrac1j\\right)-5=15\\cdot\\tfrac{137}{60}-5$",
        es: "$\\left(\\sum i\\right)\\left(\\sum\\tfrac1j\\right)-5=15\\cdot\\tfrac{137}{60}-5$",
        ja: "$\\left(\\sum i\\right)\\left(\\sum\\tfrac1j\\right)-5=15\\cdot\\tfrac{137}{60}-5$",
        zh: "$\\left(\\sum i\\right)\\left(\\sum\\tfrac1j\\right)-5=15\\cdot\\tfrac{137}{60}-5$"
      } },
      { tex: "T=-1800", correct: false, why: {
        en: "Sums the coefficients instead of the ratios $a_3/a_4$.",
        fr: "Additionne les coefficients au lieu des quotients $a_3/a_4$.",
        es: "Suma los coeficientes en vez de los cocientes $a_3/a_4$.",
        ja: "比 $a_3/a_4$ でなく係数を足した。",
        zh: "加的是系数而非比 $a_3/a_4$。"
      } },
      { tex: "T=-360", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=-\\tfrac{17125}{4}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "T=-\\tfrac{101}{4}", correct: false, why: {
        en: "Forgets the factor $6$ from arranging $a_0,a_1,a_2$.",
        fr: "Oublie le facteur $6$ dû à $a_0,a_1,a_2$.",
        es: "Olvida el factor $6$ por ordenar $a_0,a_1,a_2$.",
        ja: "$a_0,a_1,a_2$ の並べ方の $6$ 倍を忘れる。",
        zh: "漏了 $a_0,a_1,a_2$ 排列的因子 $6$。"
      } },
      { tex: "T=0", correct: false, why: {
        en: "All roots have sum $-a_3/a_4<0$.",
        fr: "Chaque somme vaut $-a_3/a_4<0$.",
        es: "Cada suma es $-a_3/a_4<0$.",
        ja: "各和は $-a_3/a_4<0$。",
        zh: "每个和都为 $-a_3/a_4<0$。"
      } },
      { tex: "\\text{each polynomial’s roots add to}\\ -\\tfrac{a_4}{a_3}", correct: false, why: {
        en: "$-\\tfrac{a_3}{a_4}$",
        fr: "$-\\tfrac{a_3}{a_4}$",
        es: "$-\\tfrac{a_3}{a_4}$",
        ja: "$-\\tfrac{a_3}{a_4}$",
        zh: "$-\\tfrac{a_3}{a_4}$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vieta",
          fr: "Viète",
          es: "Vieta",
          ja: "解と係数",
          zh: "韦达"
        },
        lines: ["\\text{roots of}\\ p\\ \\text{sum to}\\ -\\tfrac{a_3}{a_4}"],
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
          en: "Count",
          fr: "Compter",
          es: "Contar",
          ja: "数える",
          zh: "计数"
        },
        lines: ["T=-3!\\sum_{i\\ne j}\\tfrac ij=-6\\left(15\\cdot\\tfrac{137}{60}-5\\right)=-\\tfrac{351}{2}"],
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
