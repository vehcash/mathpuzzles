/* combinatorics · Same birth month
   Pigeonhole principle: 13 people force two into the same one of 12 months. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-pigeonhole-months",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "classic",
      note: {
        en: "The pigeonhole (drawer) principle, made famous by Dirichlet (1834).",
        fr: "Le principe des tiroirs, rendu célèbre par Dirichlet (1834).",
        es: "El principio del palomar (de los cajones), popularizado por Dirichlet (1834).",
        ja: "鳩の巣原理（引き出し論法）。ディリクレ（1834年）によって有名になった。",
        zh: "抽屉原理（鸽巢原理），因狄利克雷（1834年）而闻名。"
      },
      exams: ["amc"]
    },
    difficulty: 1,
    title: {
      en: "Same birth month",
      fr: "Le même mois de naissance",
      es: "El mismo mes de nacimiento",
      ja: "同じ誕生月",
      zh: "同一个出生月份"
    },
    statement: {
      en: "<b>What is the smallest number of people that guarantees that at least two of them were born in the same month?</b>",
      fr: "<b>Quel est le plus petit nombre de personnes qui garantit qu’au moins deux soient nées le même mois ?</b>",
      es: "<b>¿Cuál es el menor número de personas que garantiza que al menos dos nacieron el mismo mes?</b>",
      ja: "<b>少なくとも2人の誕生月が必ず同じになるのは、最少で何人のときですか？</b>",
      zh: "<b>至少要多少人，才能保证其中至少两人在同一个月出生？</b>"
    },
    figureText: {
      en: "Twelve boxes for the months, each holding one person, and a thirteenth person who must go into a box already used.",
      fr: "Douze cases pour les mois, chacune avec une personne, et une treizième personne qui doit aller dans une case déjà occupée.",
      es: "Doce cajas para los meses, cada una con una persona, y una decimotercera que debe ir a una caja ya ocupada.",
      ja: "12か月の箱にそれぞれ1人ずつ入り、13人目はすでに使われた箱に入るしかありません。",
      zh: "十二个月份的盒子各有一人，第十三个人只能放进已有人的盒子。"
    },
    hint: {
      en: "Months are boxes and people are pigeons.",
      fr: "Les mois sont des tiroirs et les personnes des chaussettes.",
      es: "Los meses son cajones y las personas, palomas.",
      ja: "月が箱、人が鳩です。",
      zh: "月份是抽屉，人是物品。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example showing that 12 people are not enough with an explicit example), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en montrant que 12 personnes ne suffisent pas par un exemple), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo mostrando con un ejemplo que 12 personas no bastan), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば12人では足りない例を具体的に示す）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如举例说明 12 人还不够），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.4, h: 2.4, scale: 50, pad: 12 });
      for (let k = 0; k < 12; k++) { const x = 0.1 + (k % 6) * 1.05, y = k < 6 ? 1.3 : 0.2; F.rect(x, y, 0.95, 0.9, 'tri'); F.dot([x + 0.47, y + 0.45]); }
      F.circle([0.57, 1.75], 0.18, 'halo');
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "people": { fr: "personnes", es: "personas", ja: "人", zh: "人" },
      "different months": { fr: "mois différents", es: "meses distintos", ja: "の異なる月", zh: "个不同月份" }
    },
    options: [
      { tex: "13", correct: true, why: {
        en: "$12$ months, so $12 + 1$ people force a repeat.",
        fr: "$12$ mois, donc $12 + 1$ personnes forcent une répétition.",
        es: "$12$ meses, así que $12 + 1$ personas obligan a repetir.",
        ja: "12か月なので $12 + 1$ 人で必ず重なります。",
        zh: "$12$ 个月，所以 $12 + 1$ 人必定重复。"
      } },
      { tex: "12", correct: false, why: {
        en: "Twelve people can all have different months.",
        fr: "Douze personnes peuvent toutes avoir des mois différents.",
        es: "Doce personas pueden tener todas meses distintos.",
        ja: "12人なら全員違う月にできます。",
        zh: "十二人可以各在不同月份。"
      } },
      { tex: "24", correct: false, why: {
        en: "More than needed: $13$ already forces a repeat.",
        fr: "Plus que nécessaire : $13$ suffit déjà.",
        es: "Más de lo necesario: ya bastan $13$.",
        ja: "必要以上です：$13$ 人で十分です。",
        zh: "超过需要：$13$ 人就已足够。"
      } },
      { tex: "2", correct: false, why: {
        en: "Two people may well be born in different months.",
        fr: "Deux personnes peuvent naître des mois différents.",
        es: "Dos personas pueden nacer en meses distintos.",
        ja: "2人の誕生月は違うかもしれません。",
        zh: "两个人完全可能不同月。"
      } },
      { tex: "7", correct: false, why: {
        en: "Not enough boxes are filled to force a repeat.",
        fr: "Pas assez pour forcer une répétition.",
        es: "No basta para forzar una repetición.",
        ja: "重なりを強制するには足りません。",
        zh: "不足以保证重复。"
      } },
      { tex: "366", correct: false, why: {
        en: "That is the count for the same birthday (day), not month.",
        fr: "C’est le nombre pour le même jour, pas le même mois.",
        es: "Es el número para el mismo día, no el mismo mes.",
        ja: "それは同じ誕生日（日）の場合の数です。",
        zh: "那是同一天生日的人数，不是同月。"
      } },
      { tex: "25", correct: false, why: {
        en: "Guarantees three in the same month — more than needed.",
        fr: "Garantit trois personnes le même mois — plus que nécessaire.",
        es: "Garantiza tres en el mismo mes — más de lo necesario.",
        ja: "同じ月に3人を保証する数で、必要以上です。",
        zh: "保证同月三人 —— 超过需要。"
      } },
      { tex: "11", correct: false, why: {
        en: "Fewer than $12$ cannot even fill every month.",
        fr: "Moins de $12$ ne remplit même pas chaque mois.",
        es: "Menos de $12$ ni siquiera llena todos los meses.",
        ja: "12人未満では全部の月すら埋まりません。",
        zh: "少于 $12$ 人连每个月都填不满。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Twelve is not enough",
          fr: "Douze ne suffisent pas",
          es: "Doce no bastan",
          ja: "12人では足りない",
          zh: "十二人不够"
        },
        lines: ["12 \\text{ people}, 12 \\text{ different months}"],
        note: {
          en: "One person per month is possible, with no repeat.",
          fr: "Une personne par mois est possible, sans répétition.",
          es: "Es posible una persona por mes, sin repetir.",
          ja: "各月に1人ずつなら重なりません。",
          zh: "每月一人是可能的，没有重复。"
        }
      },
      {
        title: {
          en: "The thirteenth person",
          fr: "La treizième personne",
          es: "La decimotercera persona",
          ja: "13人目",
          zh: "第十三人"
        },
        lines: ["13 > 12 \\ \\Rightarrow\\ \\boxed{13}"],
        note: {
          en: "With $13$ people some month must hold two (pigeonhole principle).",
          fr: "Avec $13$ personnes, un mois en contient forcément deux (principe des tiroirs).",
          es: "Con $13$ personas, algún mes tiene dos (principio del palomar).",
          ja: "13人いればどこかの月に必ず2人（鳩の巣原理）。",
          zh: "$13$ 人时必有某个月有两人（抽屉原理）。"
        },
        fig(F) { F.fadeIn(F.dot([0.82, 1.62]), 400); }
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
