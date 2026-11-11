/* combinatorics · Choosing electives
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-gaokao-2023-electives",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 13",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 13",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 13",
        ja: "2023年 中国・高考 新課程標準I卷 第13問",
        zh: "2023年高考数学新课标I卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Choosing electives",
      fr: "Choisir des options",
      es: "Elegir optativas",
      ja: "選択科目の選び方",
      zh: "选修课方案"
    },
    statement: {
      en: "A school offers 4 sports electives and 4 arts electives. A student takes 2 or 3 of these 8 courses, with at least one from each type. <b>Which of the following equal the number of possible choices?</b>",
      fr: "Un lycée propose 4 options sportives et 4 options artistiques. Un élève en prend 2 ou 3 parmi ces 8, avec au moins une de chaque type. <b>Lesquelles des valeurs suivantes sont égales au nombre de choix possibles ?</b>",
      es: "Un instituto ofrece 4 optativas de deporte y 4 de arte. Un alumno elige 2 o 3 de esas 8, con al menos una de cada tipo. <b>¿Cuáles de los siguientes valores son iguales al número de elecciones posibles?</b>",
      ja: "ある学校には体育系の選択科目が4つ、芸術系が4つあります。生徒はこの8科目から2科目または3科目を選び、各系統から少なくとも1科目を選びます。<b>選び方の総数に等しいものはどれですか？</b>",
      zh: "某学校开设了 4 门体育类选修课和 4 门艺术类选修课，学生需从这 8 门课中选修 2 门或 3 门，并且每类至少选修 1 门。<b>不同的选课方案数等于下列哪些？</b>"
    },
    figureText: {
      en: "Two groups of four course cards, sports and arts, and the three allowed patterns: 1 + 1, 2 + 1 and 1 + 2.",
      fr: "Deux groupes de quatre cartes, sport et arts, et les trois schémas permis : 1 + 1, 2 + 1 et 1 + 2.",
      es: "Dos grupos de cuatro tarjetas, deporte y arte, y los tres patrones permitidos: 1 + 1, 2 + 1 y 1 + 2.",
      ja: "体育と芸術の4枚ずつのカードと、許される3パターン：1 + 1、2 + 1、1 + 2。",
      zh: "体育、艺术各四张课程卡片，以及三种允许的组合：1 + 1、2 + 1、1 + 2。"
    },
    hint: {
      en: "List the patterns (sports, arts): $(1,1)$, $(2,1)$, $(1,2)$.",
      fr: "Listez les schémas (sport, arts) : $(1,1)$, $(2,1)$, $(1,2)$.",
      es: "Enumera los patrones (deporte, arte): $(1,1)$, $(2,1)$, $(1,2)$.",
      ja: "（体育, 芸術）の組合せは $(1,1)$, $(2,1)$, $(1,2)$。",
      zh: "（体育, 艺术）的组合：$(1,1)$、$(2,1)$、$(1,2)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 2.6, scale: 50, pad: 14 });
      for (let i = 0; i < 4; i++) { F.rect(0.3 + i * 0.62, 1.2, 0.5, 0.8, 'tri fill-yellow'); F.rect(3.3 + i * 0.62, 1.2, 0.5, 0.8, 'tri fill-blue'); }
      F.text([1.4, 0.7], '4', 'len', 0, 0); F.text([4.4, 0.7], '4', 'len', 0, 0);
      F.text([3.0, 0.2], '1+1 · 2+1 · 1+2', 'len small', 0, 0);
      return F;
    },
    options: [
      { tex: "64", correct: true, why: {
        en: "$16+24+24$.",
        fr: "$16+24+24$.",
        es: "$16+24+24$.",
        ja: "$16+24+24$.",
        zh: "$16+24+24$."
      } },
      { tex: "\\binom82+\\binom83-2\\left(\\binom42+\\binom43\\right)", correct: true, why: {
        en: "All 2- and 3-course choices minus the single-type ones.",
        fr: "Tous les choix de 2 ou 3 moins ceux d’un seul type.",
        es: "Todas las elecciones de 2 o 3 menos las de un solo tipo.",
        ja: "2・3科目の全選び方から1系統だけのものを引く。",
        zh: "所有选 2 或 3 门的方案减去只选一类的。"
      } },
      { tex: "84", correct: false, why: {
        en: "$\\binom82+\\binom83$: ignores the “one of each” rule.",
        fr: "$\\binom82+\\binom83$ : ignore la règle « un de chaque ».",
        es: "$\\binom82+\\binom83$: ignora la regla de «uno de cada».",
        ja: "$\\binom82+\\binom83$：「各系統1つ以上」を無視。",
        zh: "$\\binom82+\\binom83$：忽略了“每类至少一门”。"
      } },
      { tex: "16", correct: false, why: {
        en: "Only the 2-course choices.",
        fr: "Seulement les choix de 2 cours.",
        es: "Solo las elecciones de 2 cursos.",
        ja: "2科目の場合だけ。",
        zh: "只算了选 2 门的。"
      } },
      { tex: "48", correct: false, why: {
        en: "Only the 3-course choices.",
        fr: "Seulement les choix de 3 cours.",
        es: "Solo las elecciones de 3 cursos.",
        ja: "3科目の場合だけ。",
        zh: "只算了选 3 门的。"
      } },
      { tex: "40", correct: false, why: {
        en: "Counts only one of $(2,1)$ and $(1,2)$.",
        fr: "Ne compte qu’un des schémas $(2,1)$ et $(1,2)$.",
        es: "Solo cuenta uno de $(2,1)$ y $(1,2)$.",
        ja: "$(2,1)$ と $(1,2)$ の片方だけ。",
        zh: "$(2,1)$ 与 $(1,2)$ 只算了一种。"
      } },
      { tex: "112", correct: false, why: {
        en: "Uses $4\\cdot4\\cdot6$ for 3 courses, counting the third pick in order.",
        fr: "Utilise $4\\cdot4\\cdot6$ pour 3 cours : compte l’ordre.",
        es: "Usa $4\\cdot4\\cdot6$ para 3 cursos: cuenta el orden.",
        ja: "3科目で $4\\cdot4\\cdot6$ とし順序を数えた。",
        zh: "3 门时用 $4\\cdot4\\cdot6$，把顺序算进去了。"
      } },
      { tex: "56", correct: false, why: {
        en: "$\\binom83$ alone.",
        fr: "$\\binom83$ seul.",
        es: "Solo $\\binom83$.",
        ja: "$\\binom83$ だけ。",
        zh: "只有 $\\binom83$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Two courses",
          fr: "Deux cours",
          es: "Dos cursos",
          ja: "2科目",
          zh: "选 2 门"
        },
        lines: ["(1,1):\\ 4\\cdot4=16"],
        note: {
          en: "One sports course and one arts course.",
          fr: "Une option sportive et une artistique.",
          es: "Una de deporte y una de arte.",
          ja: "体育1つと芸術1つ。",
          zh: "体育一门、艺术一门。"
        }
      },
      {
        title: {
          en: "Three courses",
          fr: "Trois cours",
          es: "Tres cursos",
          ja: "3科目",
          zh: "选 3 门"
        },
        lines: ["(2,1):\\ \\tbinom42\\cdot4=24,\\qquad(1,2):\\ 4\\cdot\\tbinom42=24"],
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
          en: "Total",
          fr: "Total",
          es: "Total",
          ja: "合計",
          zh: "合计"
        },
        lines: ["16+24+24=\\boxed{64}"],
        note: {
          en: "Official answer: 64.",
          fr: "Réponse officielle : 64.",
          es: "Respuesta oficial: 64.",
          ja: "公式解答：64。",
          zh: "官方答案：64。"
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
