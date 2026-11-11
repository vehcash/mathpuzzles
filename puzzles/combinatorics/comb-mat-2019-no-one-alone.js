/* combinatorics · Nobody works alone
   Oxford MAT 2019 (Mathematics Admissions Test), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-mat-2019-no-one-alone",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 5",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 5",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 5",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 5",
        zh: "牛津大学数学入学考试 MAT 2019 第 5 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Nobody works alone",
      fr: "Personne ne travaille seul",
      es: "Nadie trabaja solo",
      ja: "ひとりぼっちなし",
      zh: "没有人落单"
    },
    statement: {
      en: "Seven people are split into $3$ groups. The groups have no names or order, and every group must have at least $2$ people. <b>Which of the following equal the number of ways to do this?</b>",
      fr: "Sept personnes sont réparties en $3$ groupes. Les groupes n’ont ni nom ni ordre, et chacun doit compter au moins $2$ personnes. <b>Lesquelles des valeurs suivantes sont égales au nombre de façons de le faire ?</b>",
      es: "Siete personas se reparten en $3$ grupos. Los grupos no tienen nombre ni orden, y cada uno debe tener al menos $2$ personas. <b>¿Cuáles de los siguientes valores son iguales al número de formas de hacerlo?</b>",
      ja: "7人を $3$ つのグループに分けます。グループに名前や順序はなく、どのグループも $2$ 人以上です。<b>分け方の数に等しいものはどれですか？</b>",
      zh: "把 $7$ 个人分成 $3$ 组，组没有名称和顺序，每组至少 $2$ 人。<b>下列哪些等于分法的种数？</b>"
    },
    figureText: {
      en: "Seven people as dots split into groups of 3, 2 and 2 — the only possible sizes.",
      fr: "Sept personnes représentées par des points réparties en groupes de 3, 2 et 2 — les seules tailles possibles.",
      es: "Siete personas como puntos repartidas en grupos de 3, 2 y 2: los únicos tamaños posibles.",
      ja: "7人を点で表し、3人・2人・2人に分けた図（ありうるのはこの大きさだけ）。",
      zh: "七个人用点表示，分成 3、2、2 人的三组——唯一可能的规模。"
    },
    hint: {
      en: "First find the possible group sizes. Then remember that the two groups of the same size can swap.",
      fr: "Trouvez d’abord les tailles possibles. Puis souvenez-vous que les deux groupes de même taille peuvent s’échanger.",
      es: "Primero halla los tamaños posibles. Luego recuerda que los dos grupos del mismo tamaño pueden intercambiarse.",
      ja: "まずグループの人数の組を考え、同じ人数の2組は入れ替えられることに注意。",
      zh: "先找出可能的组规模，再注意两个同样大小的组可以互换。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.4, h: 2.4, scale: 58, pad: 16 });
      const groups = [[[0.7, 1.6], [1.4, 1.6], [1.05, 0.9]], [[2.6, 1.6], [3.2, 0.9]], [[4.3, 1.6], [4.8, 0.9]]], cls = ['fill-yellow', 'fill-blue', 'fill-pink'];
      groups.forEach((g, k) => { const cx = g.reduce((a, p) => a + p[0], 0) / g.length, cy = g.reduce((a, p) => a + p[1], 0) / g.length;
        F.circle([cx, cy], g.length === 3 ? 0.78 : 0.68, 'tri ' + cls[k]); g.forEach(p => F.circle(p, 0.14, 'dot')); });
      return F;
    },
    options: [
      { tex: "105", correct: true, why: {
        en: "Sizes must be $3,2,2$: $\\binom73\\cdot\\binom42\\cdot\\binom22/2=105$.",
        fr: "Tailles forcément $3,2,2$ : $\\binom73\\cdot\\binom42\\cdot\\binom22/2=105$.",
        es: "Tamaños $3,2,2$ por fuerza: $\\binom73\\cdot\\binom42\\cdot\\binom22/2=105$.",
        ja: "人数は $3,2,2$ だけ：$\\binom73\\cdot\\binom42\\cdot\\binom22/2=105$。",
        zh: "规模只能是 $3,2,2$：$\\binom73\\cdot\\binom42\\cdot\\binom22/2=105$。"
      } },
      { tex: "\\dfrac{7!}{3!\\,2!\\,2!\\,2!}", correct: true, why: {
        en: "The same count: the last $2!$ undoes swapping the two pairs.",
        fr: "Le même nombre : le dernier $2!$ annule l’échange des deux paires.",
        es: "El mismo número: el último $2!$ deshace el intercambio de las dos parejas.",
        ja: "同じ数。最後の $2!$ は2つのペアの入れ替え分。",
        zh: "同一个数：最后的 $2!$ 消去两对的互换。"
      } },
      { tex: "210", correct: false, why: {
        en: "Treats the two pairs as different groups.",
        fr: "Traite les deux paires comme des groupes distincts.",
        es: "Trata las dos parejas como grupos distintos.",
        ja: "2つのペアを区別している。",
        zh: "把两对当成了不同的组。"
      } },
      { tex: "301", correct: false, why: {
        en: "That counts all splits into $3$ groups, singletons allowed.",
        fr: "C’est le nombre de toutes les partitions en $3$ groupes, singletons compris.",
        es: "Cuenta todos los repartos en $3$ grupos, con grupos de uno.",
        ja: "1人の組も許した3組への分け方の総数。",
        zh: "那是允许单人组时分成 $3$ 组的总数。"
      } },
      { tex: "35", correct: false, why: {
        en: "That is only $\\binom73$, choosing the group of three.",
        fr: "C’est seulement $\\binom73$, le choix du groupe de trois.",
        es: "Es solo $\\binom73$, elegir el grupo de tres.",
        ja: "$\\binom73$（3人組の選び方）だけ。",
        zh: "只是 $\\binom73$，选三人组。"
      } },
      { tex: "630", correct: false, why: {
        en: "Also orders the three groups.",
        fr: "Ordonne aussi les trois groupes.",
        es: "También ordena los tres grupos.",
        ja: "3つの組に順序をつけている。",
        zh: "还给三个组排了顺序。"
      } },
      { tex: "90", correct: false, why: {
        en: "Not a count that arises from the sizes $3,2,2$.",
        fr: "Ne correspond pas aux tailles $3,2,2$.",
        es: "No sale de los tamaños $3,2,2$.",
        ja: "人数 $3,2,2$ からは出ない数。",
        zh: "与规模 $3,2,2$ 不符。"
      } },
      { tex: "120", correct: false, why: {
        en: "That is $5!$; unrelated.",
        fr: "C’est $5!$ ; sans rapport.",
        es: "Es $5!$; no tiene relación.",
        ja: "$5!$ で無関係。",
        zh: "那是 $5!$，无关。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The sizes are forced",
          fr: "Les tailles sont imposées",
          es: "Los tamaños son forzosos",
          ja: "人数は決まる",
          zh: "规模是确定的"
        },
        lines: ["a+b+c=7,\\ a,b,c\\ge2 \\;\\Rightarrow\\; \\{3,2,2\\}"],
        note: {
          en: "$2+2+2=6$ leaves one extra person, who must join one group.",
          fr: "$2+2+2=6$ laisse une personne en plus, qui rejoint un groupe.",
          es: "$2+2+2=6$ deja una persona más, que se une a un grupo.",
          ja: "$2+2+2=6$ で1人余り、どこかの組に入る。",
          zh: "$2+2+2=6$，多出一人，只能加入某组。"
        }
      },
      {
        title: {
          en: "Choose, then undo the swap",
          fr: "Choisir, puis annuler l’échange",
          es: "Elegir y deshacer el intercambio",
          ja: "選んでから入れ替えを割る",
          zh: "选完再消去互换"
        },
        lines: ["\\binom73\\binom42\\binom22\\cdot\\frac12=35\\cdot6\\cdot1\\cdot\\frac12=\\boxed{105}"],
        note: {
          en: "The two groups of two are unlabelled, so each split was counted twice.",
          fr: "Les deux groupes de deux ne sont pas étiquetés : chaque répartition est comptée deux fois.",
          es: "Los dos grupos de dos no tienen etiqueta: cada reparto se contó dos veces.",
          ja: "2人組2つは区別されないので、各分け方を2回数えている。",
          zh: "两个二人组无标签，每种分法被数了两次。"
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
          en: "Two options are the same count.",
          fr: "Deux options sont le même nombre.",
          es: "Dos opciones son el mismo número.",
          ja: "2つの選択肢は同じ数です。",
          zh: "有两个选项是同一个数。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
