/* combinatorics · Three teams with two rules
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2024-three-teams",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.11",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.11",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.11",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.11",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.11"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Three teams with two rules",
      fr: "Trois équipes et deux règles",
      es: "Tres equipos con dos reglas",
      ja: "2つの条件つきの3チーム",
      zh: "两个限制下的三支队"
    },
    statement: {
      en: "Nine students $s_1,\\dots,s_9$ are split into three teams $X$, $Y$, $Z$ of sizes $2$, $3$ and $4$. Student $s_1$ cannot be in $X$ and $s_2$ cannot be in $Y$. <b>Which of the following equal the number of ways to form the teams?</b>",
      fr: "Neuf élèves $s_1,\\dots,s_9$ sont répartis en trois équipes $X$, $Y$, $Z$ de tailles $2$, $3$ et $4$. L’élève $s_1$ ne peut pas être dans $X$ et $s_2$ ne peut pas être dans $Y$. <b>Lesquelles des valeurs suivantes sont égales au nombre de façons de former les équipes ?</b>",
      es: "Nueve alumnos $s_1,\\dots,s_9$ se reparten en tres equipos $X$, $Y$, $Z$ de tamaños $2$, $3$ y $4$. El alumno $s_1$ no puede estar en $X$ y $s_2$ no puede estar en $Y$. <b>¿Cuáles de los siguientes valores son iguales al número de formas de formar los equipos?</b>",
      ja: "9人の生徒 $s_1,\\dots,s_9$ を人数 $2$, $3$, $4$ のチーム $X$, $Y$, $Z$ に分けます。$s_1$ は $X$ に入れず、$s_2$ は $Y$ に入れません。<b>チームの作り方の数に等しいものはどれですか？</b>",
      zh: "把 9 名学生 $s_1,\\dots,s_9$ 分成人数为 $2$、$3$、$4$ 的三队 $X$、$Y$、$Z$。$s_1$ 不能在 $X$，$s_2$ 不能在 $Y$。<b>组队方法数等于下列哪些？</b>"
    },
    figureText: {
      en: "All splits into teams, with the forbidden sets “s₁ in X” and “s₂ in Y” drawn as overlapping circles. The counts are added in the solution.",
      fr: "Toutes les répartitions, avec les ensembles interdits « s₁ dans X » et « s₂ dans Y » en cercles qui se chevauchent. Les effectifs sont ajoutés dans la solution.",
      es: "Todos los repartos, con los conjuntos prohibidos «s₁ en X» y «s₂ en Y» como círculos solapados. Los recuentos se añaden en la solución.",
      ja: "すべての分け方と、禁止される「s₁ が X」「s₂ が Y」の重なる円。個数は解答で加えます。",
      zh: "所有分法，禁止的“s₁ 在 X”与“s₂ 在 Y”画成相交的圆。个数在解答中加上。"
    },
    hint: {
      en: "Count all splits, then remove the bad ones by inclusion–exclusion.",
      fr: "Comptez toutes les répartitions, puis retirez les mauvaises par inclusion–exclusion.",
      es: "Cuenta todos los repartos y quita los malos por inclusión–exclusión.",
      ja: "全体を数え、悪い場合を包除原理で除く。",
      zh: "先数全部分法，再用容斥原理去掉不合要求的。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.0, scale: 54, pad: 14 });
      F.rect(0.2, 0.2, 4.6, 2.6, 'tri');
      F.circle([1.9, 1.5], 0.95, 'fill-pink'); F.circle([3.1, 1.5], 1.05, 'fill-blue');
      F.text([1.2, 2.55], 's₁ ∈ X', 'len small', 0, 0); F.text([3.8, 2.55], 's₂ ∈ Y', 'len small', 0, 0);
      F.reveal = () => {
      F.text([1.4, 1.5], '280', 'pt small', 0, 0); F.text([3.6, 1.5], '420', 'pt small', 0, 0); F.text([2.5, 1.5], '105', 'pt small', 0, 0);
      F.text([0.7, 2.5], '1260', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "both": {"fr": "les deux", "es": "ambos", "ja": "両方", "zh": "两者"}
    },
    options: [
      { tex: "665", correct: true, why: {
        en: "$1260-280-420+105$.",
        fr: "$1260-280-420+105$.",
        es: "$1260-280-420+105$.",
        ja: "$1260-280-420+105$.",
        zh: "$1260-280-420+105$."
      } },
      { tex: "\\tbinom92\\tbinom73-8\\tbinom73-\\tbinom82\\tbinom62+7\\tbinom62", correct: true, why: {
        en: "Inclusion–exclusion written out.",
        fr: "L’inclusion–exclusion écrite en détail.",
        es: "La inclusión–exclusión escrita.",
        ja: "包除原理の式そのもの。",
        zh: "容斥原理的展开式。"
      } },
      { tex: "1260", correct: false, why: {
        en: "No restrictions.",
        fr: "Sans contrainte.",
        es: "Sin restricciones.",
        ja: "制限なし。",
        zh: "没有限制。"
      } },
      { tex: "560", correct: false, why: {
        en: "Subtracts both bad sets but forgets to add back the $105$ in both.",
        fr: "Retire les deux mauvais ensembles sans rajouter les $105$ communs.",
        es: "Resta ambos conjuntos malos sin sumar los $105$ comunes.",
        ja: "共通の $105$ を足し戻していない。",
        zh: "减去两个坏集合后忘了加回公共的 $105$。"
      } },
      { tex: "980", correct: false, why: {
        en: "Only removes $s_1\\in X$.",
        fr: "Retire seulement $s_1\\in X$.",
        es: "Solo quita $s_1\\in X$.",
        ja: "$s_1\\in X$ だけ除いた。",
        zh: "只去掉了 $s_1\\in X$。"
      } },
      { tex: "840", correct: false, why: {
        en: "Only removes $s_2\\in Y$.",
        fr: "Retire seulement $s_2\\in Y$.",
        es: "Solo quita $s_2\\in Y$.",
        ja: "$s_2\\in Y$ だけ除いた。",
        zh: "只去掉了 $s_2\\in Y$。"
      } },
      { tex: "630", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "700", correct: false, why: {
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
          en: "All splits",
          fr: "Toutes les répartitions",
          es: "Todos los repartos",
          ja: "全体",
          zh: "全部分法"
        },
        lines: ["\\tbinom92\\tbinom73=36\\cdot35=1260"],
        note: {
          en: "Choose $X$, then $Y$; $Z$ is what remains.",
          fr: "On choisit $X$, puis $Y$ ; $Z$ est le reste.",
          es: "Elige $X$ y luego $Y$; $Z$ es el resto.",
          ja: "$X$、次に $Y$ を選ぶ。残りが $Z$。",
          zh: "先选 $X$，再选 $Y$，剩下为 $Z$。"
        }
      },
      {
        title: {
          en: "Bad splits",
          fr: "Répartitions interdites",
          es: "Repartos prohibidos",
          ja: "悪い場合",
          zh: "不合要求的"
        },
        lines: ["s_1\\in X:\\ 8\\cdot35=280,\\qquad s_2\\in Y:\\ 28\\cdot15=420,\\qquad\\text{both}:\\ 7\\cdot15=105"],
        note: {
          en: "For $s_2\\in Y$: pick $X$ from the other 8, then 2 more for $Y$ from the 6 left.",
          fr: "Pour $s_2\\in Y$ : $X$ parmi les 8 autres, puis 2 de plus pour $Y$ parmi 6.",
          es: "Para $s_2\\in Y$: $X$ entre los otros 8 y 2 más para $Y$ entre 6.",
          ja: "$s_2\\in Y$：$X$ を他の8人から、$Y$ の残り2人を6人から。",
          zh: "$s_2\\in Y$：从其余 8 人选 $X$，再从剩下 6 人中为 $Y$ 选 2 人。"
        }
      },
      {
        title: {
          en: "Inclusion–exclusion",
          fr: "Inclusion–exclusion",
          es: "Inclusión–exclusión",
          ja: "包除原理",
          zh: "容斥"
        },
        lines: ["1260-280-420+105=\\boxed{665}"],
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
