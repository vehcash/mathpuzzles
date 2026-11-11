/* probability · Three projects out of five
   Gaokao 2024, Tianjin paper (天津卷), Question 13 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-gaokao-2024-tj-choose-three-of-five",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 13",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 13",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 13",
        ja: "2024年 中国・高考 天津卷 第13問",
        zh: "2024年高考数学天津卷 第13题"
      },
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "Three projects out of five",
      fr: "Trois projets sur cinq",
      es: "Tres proyectos de cinco",
      ja: "5つから3つの体験",
      zh: "五选三的劳动项目"
    },
    statement: {
      en: "A farm offers five activities: making plots, dry sowing, transplanting, irrigation and building trellises. Each student picks $3$ of them, all choices equally likely. <b>Which of the following are true?</b>",
      fr: "Une ferme propose cinq activités : faire des parcelles, semis à sec, repiquage, irrigation et pose de treillis. Chaque élève en choisit $3$, tous les choix étant équiprobables. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una granja ofrece cinco actividades: hacer parcelas, siembra en seco, trasplante, riego y montar espalderas. Cada estudiante elige $3$, todas las elecciones igual de probables. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "農場に5つの作業（畝づくり・直まき・移植・灌漑・棚づくり）があり、各生徒は等確率で $3$ つを選びます。<b>次のうち正しいものはどれですか？</b>",
      zh: "某农场有 5 个劳动项目：整地做畦、旱田播种、作物移栽、田间灌溉、搭建棚架，每人等可能地选 $3$ 项。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "Five boxes for the activities, with the first one (making plots) highlighted.",
      fr: "Cinq cases pour les activités, la première (faire des parcelles) en surbrillance.",
      es: "Cinco casillas para las actividades, con la primera (hacer parcelas) resaltada.",
      ja: "5つの作業の箱。最初（畝づくり）を強調。",
      zh: "五个项目的方框，第一个（整地做畦）高亮。"
    },
    hint: {
      en: "There are $\\binom53=10$ equally likely choices. Count those containing a given activity.",
      fr: "Il y a $\\binom53=10$ choix équiprobables. Comptez ceux qui contiennent une activité donnée.",
      es: "Hay $\\binom53=10$ elecciones igual de probables. Cuenta las que contienen una actividad dada.",
      ja: "等確率の選び方は $\\binom53=10$ 通り。ある作業を含むものを数える。",
      zh: "共 $\\binom53=10$ 种等可能选法，数出含某项的选法。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.0, h: 1.6, scale: 50, pad: 16 });
      [0, 1, 2, 3, 4].forEach(k => { F.rect(0.2 + k * 1.35, 0.4, 1.2, 0.8, k === 0 ? 'fill-yellow' : 'fill-blue', 'fills'); F.text([0.8 + k * 1.35, 0.8], String(k + 1), 'pt', 0, 0); });
      F.reveal = () => {
      F.rect(0.2 + 3 * 1.35, 0.4, 1.2, 0.8, 'fill-pink', 'fills');
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "a student picks making plots": {"fr": "un élève choisit les parcelles", "es": "un estudiante elige parcelas", "ja": "畝づくりを選ぶ", "zh": "某人选整地做畦"},
      "irrigation": {"fr": "irrigation", "es": "riego", "ja": "灌漑", "zh": "田间灌溉"},
      "making plots": {"fr": "parcelles", "es": "parcelas", "ja": "畝づくり", "zh": "整地做畦"},
      "with plots": {"fr": "avec parcelles", "es": "con parcelas", "ja": "畝づくりを含む", "zh": "含整地做畦"},
      "irr.": {"fr": "irr.", "es": "riego", "ja": "灌漑", "zh": "灌溉"},
      "plots": {"fr": "parcelles", "es": "parcelas", "ja": "畝づくり", "zh": "整地做畦"},
      "both": {"fr": "les deux", "es": "ambas", "ja": "両方", "zh": "两者都选"}
    },
    options: [
      { tex: "P(\\text{a student picks making plots})=\\tfrac35", correct: true, why: {
        en: "$\\binom42=6$ of the $10$ choices contain it.",
        fr: "$\\binom42=6$ des $10$ choix la contiennent.",
        es: "$\\binom42=6$ de las $10$ elecciones la contienen.",
        ja: "$10$ 通りのうち $\\binom42=6$ 通り。",
        zh: "$10$ 种中有 $\\binom42=6$ 种含它。"
      } },
      { tex: "P(\\text{irrigation}\\mid\\text{making plots})=\\tfrac12", correct: true, why: {
        en: "Given plots, $2$ more from $4$: $\\tfrac{\\binom31}{\\binom42}=\\tfrac36$.",
        fr: "Sachant les parcelles, $2$ de plus parmi $4$ : $\\tfrac{\\binom31}{\\binom42}=\\tfrac36$.",
        es: "Dadas las parcelas, $2$ más de $4$: $\\tfrac{\\binom31}{\\binom42}=\\tfrac36$.",
        ja: "畝づくりを選んだ条件で残り $4$ から $2$：$\\tfrac{\\binom31}{\\binom42}=\\tfrac36$。",
        zh: "已选整地做畦，再从 $4$ 项选 $2$：$\\tfrac{\\binom31}{\\binom42}=\\tfrac36$。"
      } },
      { tex: "P(\\text{a student picks making plots})=\\tfrac15", correct: false, why: {
        en: "That would be choosing just one activity.",
        fr: "Ce serait choisir une seule activité.",
        es: "Sería elegir solo una actividad.",
        ja: "1つだけ選ぶ場合。",
        zh: "那是只选一项的情况。"
      } },
      { tex: "P(\\text{irrigation}\\mid\\text{making plots})=\\tfrac{3}{10}", correct: false, why: {
        en: "That is $P(\\text{both})$, not the conditional probability.",
        fr: "C’est $P(\\text{les deux})$, pas la probabilité conditionnelle.",
        es: "Es $P(\\text{ambas})$, no la condicional.",
        ja: "$P(\\text{両方})$ で条件付きではない。",
        zh: "那是 $P(\\text{两者都选})$，不是条件概率。"
      } },
      { tex: "P(\\text{irrigation}\\mid\\text{making plots})=\\tfrac35", correct: false, why: {
        en: "Knowing one choice changes the odds for the others.",
        fr: "Connaître un choix change les chances des autres.",
        es: "Saber una elección cambia las probabilidades de las demás.",
        ja: "1つ分かると他の確率は変わる。",
        zh: "已知一项会改变其余的概率。"
      } },
      { tex: "P(\\text{a student picks making plots})=\\tfrac25", correct: false, why: {
        en: "That is the chance of <i>not</i> picking it.",
        fr: "C’est la probabilité de ne <i>pas</i> la choisir.",
        es: "Es la probabilidad de <i>no</i> elegirla.",
        ja: "選ば<i>ない</i>確率。",
        zh: "那是<i>不</i>选它的概率。"
      } },
      { tex: "P(\\text{irrigation}\\mid\\text{making plots})=\\tfrac23", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "P(\\text{irrigation}\\mid\\text{making plots})=\\tfrac14", correct: false, why: {
        en: "That picks just one of the remaining four.",
        fr: "Cela n’en choisit qu’une parmi les quatre restantes.",
        es: "Elige solo una de las cuatro restantes.",
        ja: "残り4つから1つだけ選んでいる。",
        zh: "只从剩下 4 项中选了 1 项。"
      } }
    ],
    steps: [
      {
        title: {
          en: "All choices",
          fr: "Tous les choix",
          es: "Todas las elecciones",
          ja: "すべての選び方",
          zh: "全部选法"
        },
        lines: ["\\binom53=10,\\qquad\\#\\{\\text{with plots}\\}=\\binom42=6\\ \\Rightarrow\\ \\tfrac35"],
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
          en: "Conditional",
          fr: "Conditionnelle",
          es: "Condicional",
          ja: "条件付き",
          zh: "条件概率"
        },
        lines: ["P(\\text{irr.}\\mid\\text{plots})=\\frac{\\binom31}{\\binom42}=\\frac36=\\frac12"],
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
