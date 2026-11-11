/* algebra · Tripling five times
   Sum of a geometric sequence: Sₙ = a₁(rⁿ − 1)/(r − 1). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const V = [2, 6, 18, 54, 162];

  PuzzleBank.define({
    id: "alg-geometric-sum",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao", "kyotsu", "ib"]
    },
    difficulty: 1,
    title: {
      en: "Tripling five times",
      fr: "Tripler cinq fois",
      es: "Triplicar cinco veces",
      ja: "5回3倍にする",
      zh: "连乘五次 3"
    },
    statement: {
      en: "A geometric sequence has $a_1 = 2$ and ratio $r = 3$. <b>What is the sum of its first five terms, $S_5$?</b>",
      fr: "Une suite géométrique a $a_1 = 2$ et pour raison $r = 3$. <b>Que vaut la somme de ses cinq premiers termes, $S_5$ ?</b>",
      es: "Una sucesión geométrica tiene $a_1 = 2$ y razón $r = 3$. <b>¿Cuánto vale la suma de sus cinco primeros términos, $S_5$?</b>",
      ja: "初項 $a_1 = 2$、公比 $r = 3$ の等比数列があります。<b>初めの5項の和 $S_5$ はいくらですか？</b>",
      zh: "等比数列 $a_1 = 2$，公比 $r = 3$。<b>前五项和 $S_5$ 是多少？</b>"
    },
    figureText: {
      en: "A bar chart of the first five terms 2, 6, 18, 54, 162, each bar three times taller than the previous one.",
      fr: "Un diagramme en barres des cinq premiers termes 2, 6, 18, 54, 162, chaque barre trois fois plus haute que la précédente.",
      es: "Un diagrama de barras de los cinco primeros términos 2, 6, 18, 54, 162, cada barra tres veces más alta que la anterior.",
      ja: "最初の5項 2、6、18、54、162 の棒グラフ。各棒は前の棒の3倍の高さです。",
      zh: "前五项 2、6、18、54、162 的条形图，每根柱是前一根的三倍高。"
    },
    hint: {
      en: "$S_n = a_1\\dfrac{r^n - 1}{r - 1}$.",
      fr: "$S_n = a_1\\dfrac{r^n - 1}{r - 1}$.",
      es: "$S_n = a_1\\dfrac{r^n - 1}{r - 1}$.",
      ja: "$S_n = a_1\\dfrac{r^n - 1}{r - 1}$.",
      zh: "$S_n = a_1\\dfrac{r^n - 1}{r - 1}$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example simply adding 2 + 6 + 18 + 54 + 162, or using 3S − S), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en additionnant simplement 2 + 6 + 18 + 54 + 162, ou avec 3S − S), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo sumando 2 + 6 + 18 + 54 + 162, o usando 3S − S), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば 2 + 6 + 18 + 54 + 162 をそのまま足す、または 3S − S を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如直接相加 2 + 6 + 18 + 54 + 162，或用 3S − S），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 4, scale: 44, pad: 18 });
      F.seg([0, 0], [6, 0], 'axis');
      F.bars = V.map((v, k) => { const h = v / 162 * 3.4; const r = F.rect(0.4 + k * 1.1, 0, 0.8, h, 'fill-blue', 'base'); F.text([0.8 + k * 1.1, h], String(v), 'len small', 0, -10); return r; });
      return F;
    },
    options: [
      { tex: "242", correct: true, why: {
        en: "$2\\cdot\\dfrac{3^5 - 1}{3 - 1} = 243 - 1$.",
        fr: "$2\\cdot\\dfrac{3^5 - 1}{3 - 1} = 243 - 1$.",
        es: "$2\\cdot\\dfrac{3^5 - 1}{3 - 1} = 243 - 1$.",
        ja: "$2\\cdot\\dfrac{3^5 - 1}{3 - 1} = 243 - 1$.",
        zh: "$2\\cdot\\dfrac{3^5 - 1}{3 - 1} = 243 - 1$."
      } },
      { tex: "162", correct: false, why: {
        en: "That is the fifth term $a_5$, not the sum.",
        fr: "C’est le cinquième terme $a_5$, pas la somme.",
        es: "Es el quinto término $a_5$, no la suma.",
        ja: "それは第5項 $a_5$ で、和ではありません。",
        zh: "那是第五项 $a_5$，不是和。"
      } },
      { tex: "486", correct: false, why: {
        en: "That is $a_6$.",
        fr: "C’est $a_6$.",
        es: "Es $a_6$.",
        ja: "それは $a_6$ です。",
        zh: "那是 $a_6$。"
      } },
      { tex: "243", correct: false, why: {
        en: "$3^5$ — forgot the $-1$ (and the factors cancel by luck).",
        fr: "$3^5$ — oubli du $-1$.",
        es: "$3^5$ — olvida el $-1$.",
        ja: "$3^5$ — $-1$ を忘れています。",
        zh: "$3^5$ —— 漏了 $-1$。"
      } },
      { tex: "80", correct: false, why: {
        en: "That is $S_4$, one term short.",
        fr: "C’est $S_4$, il manque un terme.",
        es: "Es $S_4$, falta un término.",
        ja: "それは $S_4$ で、1項足りません。",
        zh: "那是 $S_4$，少了一项。"
      } },
      { tex: "121", correct: false, why: {
        en: "Forgot the factor $a_1 = 2$.",
        fr: "Oubli du facteur $a_1 = 2$.",
        es: "Olvida el factor $a_1 = 2$.",
        ja: "因数 $a_1 = 2$ を忘れています。",
        zh: "漏了因子 $a_1 = 2$。"
      } },
      { tex: "728", correct: false, why: {
        en: "That is $S_6$.",
        fr: "C’est $S_6$.",
        es: "Es $S_6$.",
        ja: "それは $S_6$ です。",
        zh: "那是 $S_6$。"
      } },
      { tex: "30", correct: false, why: {
        en: "Treats it as arithmetic with difference $3$: $2 + 5 + 8 + \\dots$ is not geometric.",
        fr: "La traite comme arithmétique de raison $3$.",
        es: "La trata como aritmética de diferencia $3$.",
        ja: "公差 $3$ の等差数列として扱っています。",
        zh: "当成了公差为 $3$ 的等差数列。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use the formula",
          fr: "Utiliser la formule",
          es: "Usar la fórmula",
          ja: "公式を使う",
          zh: "用公式"
        },
        lines: ["S_5 = 2\\cdot\\frac{3^5 - 1}{3 - 1} = 2\\cdot\\frac{242}{2} = \\boxed{242}"],
        note: {
          en: "Here $r - 1 = 2$ cancels the first term $2$.",
          fr: "Ici $r - 1 = 2$ se simplifie avec le premier terme $2$.",
          es: "Aquí $r - 1 = 2$ se simplifica con el primer término $2$.",
          ja: "ここでは $r - 1 = 2$ が初項 $2$ と約分されます。",
          zh: "这里 $r - 1 = 2$ 与首项 $2$ 约掉。"
        },
        fig(F) { F.bars.forEach((b, k) => { b.classList.add('fill-yellow'); F.fadeIn(b, 300, 150 * k); }); }
      },
      {
        title: {
          en: "Check by adding",
          fr: "Vérifier en additionnant",
          es: "Comprobar sumando",
          ja: "足して確認",
          zh: "相加验证"
        },
        lines: ["2 + 6 + 18 + 54 + 162 = 242\\ \\checkmark"],
        note: {
          en: "With few terms, direct addition is a quick check.",
          fr: "Avec peu de termes, l’addition directe est une vérification rapide.",
          es: "Con pocos términos, sumar directamente es una comprobación rápida.",
          ja: "項が少なければ直接足すのが手早い確認です。",
          zh: "项数少时直接相加是快速的检验。"
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
