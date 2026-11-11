/* algebra · Minimising a ratio of areas
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2018-ratio-of-areas",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1H",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1H",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1H",
        zh: "牛津大学数学入学考试 MAT 2018 第 1H 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Minimising a ratio of areas",
      fr: "Minimiser un rapport d’aires",
      es: "Minimizar una razón de áreas",
      ja: "面積の比の最小値",
      zh: "面积比的最小值"
    },
    statement: {
      en: "$s<t$ are the areas of two triangles inscribed in a circle. <b>Which of the following equal the smallest possible value of $\\dfrac{4s^2+t^2}{5st}$?</b>",
      fr: "$s<t$ sont les aires de deux triangles inscrits dans un cercle. <b>Lesquelles des valeurs suivantes sont égales à la plus petite valeur possible de $\\dfrac{4s^2+t^2}{5st}$ ?</b>",
      es: "$s<t$ son las áreas de dos triángulos inscritos en una circunferencia. <b>¿Cuáles de los siguientes valores son iguales al menor valor posible de $\\dfrac{4s^2+t^2}{5st}$?</b>",
      ja: "$s<t$ は円に内接する2つの三角形の面積です。<b>$\\dfrac{4s^2+t^2}{5st}$ のとりうる最小値に等しいものはどれですか？</b>",
      zh: "$s<t$ 是内接于圆的两个三角形的面积。<b>$\\dfrac{4s^2+t^2}{5st}$ 的最小可能值等于下列哪些？</b>"
    },
    figureText: {
      en: "A circle with two inscribed triangles: a small one of area s and a larger one of area t.",
      fr: "Un cercle avec deux triangles inscrits : un petit d’aire s et un plus grand d’aire t.",
      es: "Una circunferencia con dos triángulos inscritos: uno pequeño de área s y otro mayor de área t.",
      ja: "円に内接する2つの三角形：面積 s の小さいものと面積 t の大きいもの。",
      zh: "圆内接两个三角形：面积为 s 的小三角形和面积为 t 的大三角形。"
    },
    hint: {
      en: "Only the ratio $r=\\tfrac ts>1$ matters: $\\dfrac{4+r^2}{5r}=\\tfrac15\\left(\\tfrac4r+r\\right)$. Use AM–GM.",
      fr: "Seul le rapport $r=\\tfrac ts>1$ compte : $\\dfrac{4+r^2}{5r}=\\tfrac15\\left(\\tfrac4r+r\\right)$. Utilisez l’inégalité arithmético-géométrique.",
      es: "Solo importa la razón $r=\\tfrac ts>1$: $\\dfrac{4+r^2}{5r}=\\tfrac15\\left(\\tfrac4r+r\\right)$. Usa la desigualdad de medias.",
      ja: "比 $r=\\tfrac ts>1$ だけが効く。$\\dfrac{4+r^2}{5r}=\\tfrac15\\left(\\tfrac4r+r\\right)$。相加相乗平均。",
      zh: "只与 $r=\\tfrac ts>1$ 有关：$\\dfrac{4+r^2}{5r}=\\tfrac15\\left(\\tfrac4r+r\\right)$。用均值不等式。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 14 });
      const O = [1.5, 1.5], P = t => [O[0] + 1.3 * Math.cos(t), O[1] + 1.3 * Math.sin(t)];
      F.circle(O, 1.3, 'conic');
      F.path([P(2.3), P(2.9), P(3.6)], 'tri fill-yellow'); F.path([P(-0.3), P(1.1), P(4.6)], 'tri fill-blue');
      F.text([0.55, 1.75], 's', 'pt', 0, 0); F.text([2.0, 1.3], 't', 'pt', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "no minimum (only an infimum)": {"fr": "pas de minimum (seulement une borne inférieure)", "es": "no hay mínimo (solo ínfimo)", "ja": "最小値なし（下限のみ）", "zh": "无最小值（只有下确界）"}
    },
    options: [
      { tex: "\\tfrac45", correct: true, why: {
        en: "$\\tfrac4r+r\\ge4$, equality at $r=2$, i.e. $t=2s$.",
        fr: "$\\tfrac4r+r\\ge4$, equality at $r=2$, i.e. $t=2s$.",
        es: "$\\tfrac4r+r\\ge4$, equality at $r=2$, i.e. $t=2s$.",
        ja: "$\\tfrac4r+r\\ge4$, equality at $r=2$, i.e. $t=2s$.",
        zh: "$\\tfrac4r+r\\ge4$, equality at $r=2$, i.e. $t=2s$."
      } },
      { tex: "0.8", correct: true, why: {
        en: "The same number.",
        fr: "Le même nombre.",
        es: "El mismo número.",
        ja: "同じ数。",
        zh: "同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "Value at $r=1$ or $r=4$, not the minimum.",
        fr: "Valeur en $r=1$ ou $r=4$, pas le minimum.",
        es: "Valor en $r=1$ o $r=4$, no el mínimo.",
        ja: "$r=1$ か $r=4$ での値。",
        zh: "$r=1$ 或 $r=4$ 时的值。"
      } },
      { tex: "\\tfrac25", correct: false, why: {
        en: "Forgets the factor $2$ from AM–GM.",
        fr: "Oublie le facteur $2$ de l’inégalité.",
        es: "Olvida el factor $2$ de la desigualdad.",
        ja: "相加相乗の $2$ を忘れた。",
        zh: "漏了均值不等式中的 $2$。"
      } },
      { tex: "0", correct: false, why: {
        en: "The expression is always positive.",
        fr: "L’expression est toujours positive.",
        es: "La expresión es siempre positiva.",
        ja: "式は常に正。",
        zh: "该式恒正。"
      } },
      { tex: "\\tfrac{4}{\\sqrt5}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\text{no minimum (only an infimum)}", correct: false, why: {
        en: "$r=2$ is allowed: take $t=2s$.",
        fr: "$r=2$ est permis : prendre $t=2s$.",
        es: "$r=2$ está permitido: toma $t=2s$.",
        ja: "$r=2$（$t=2s$）は可能。",
        zh: "$r=2$（$t=2s$）可以取到。"
      } },
      { tex: "\\tfrac{8}{5}", correct: false, why: {
        en: "Uses $\\tfrac{4}{r}+r\\ge8$.",
        fr: "Utilise $\\tfrac{4}{r}+r\\ge8$.",
        es: "Usa $\\tfrac{4}{r}+r\\ge8$.",
        ja: "$\\tfrac{4}{r}+r\\ge8$ とした。",
        zh: "用了 $\\tfrac{4}{r}+r\\ge8$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Only the ratio matters",
          fr: "Seul le rapport compte",
          es: "Solo importa la razón",
          ja: "比だけが効く",
          zh: "只与比值有关"
        },
        lines: ["\\frac{4s^2+t^2}{5st}=\\frac15\\left(\\frac4r+r\\right),\\qquad r=\\frac ts>1"],
        note: {
          en: "The circle only fixes a maximum area; any ratio $r>1$ can be achieved.",
          fr: "Le cercle fixe seulement une aire maximale ; tout rapport $r>1$ est possible.",
          es: "La circunferencia solo fija un área máxima; cualquier $r>1$ es posible.",
          ja: "円は最大面積を決めるだけで、任意の $r>1$ が可能。",
          zh: "圆只限定最大面积，任何 $r>1$ 都能实现。"
        }
      },
      {
        title: {
          en: "AM–GM",
          fr: "Moyennes",
          es: "Medias",
          ja: "相加相乗平均",
          zh: "均值不等式"
        },
        lines: ["\\frac4r+r\\ge2\\sqrt{4}=4\\;\\Rightarrow\\;\\min=\\frac45\\ \\ (r=2)"],
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
