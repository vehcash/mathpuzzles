/* trigonometry · Ninety squared sines
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2021-sum-sine-squares",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2021 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Ninety squared sines",
      fr: "Quatre-vingt-dix sinus au carré",
      es: "Noventa senos al cuadrado",
      ja: "90個の sin²",
      zh: "九十个正弦平方"
    },
    statement: {
      en: "<b>Which of the following equal $\\displaystyle\\sum_{k=1}^{90}\\sin^2(k^\\circ)=\\sin^2 1^\\circ+\\sin^2 2^\\circ+\\cdots+\\sin^2 90^\\circ$?</b>",
      fr: "<b>Lesquelles des valeurs suivantes sont égales à $\\displaystyle\\sum_{k=1}^{90}\\sin^2(k^\\circ)=\\sin^2 1^\\circ+\\sin^2 2^\\circ+\\cdots+\\sin^2 90^\\circ$ ?</b>",
      es: "<b>¿Cuáles de los siguientes valores son iguales a $\\displaystyle\\sum_{k=1}^{90}\\sin^2(k^\\circ)=\\sin^2 1^\\circ+\\sin^2 2^\\circ+\\cdots+\\sin^2 90^\\circ$?</b>",
      ja: "<b>$\\displaystyle\\sum_{k=1}^{90}\\sin^2(k^\\circ)=\\sin^2 1^\\circ+\\sin^2 2^\\circ+\\cdots+\\sin^2 90^\\circ$ に等しいものはどれですか？</b>",
      zh: "<b>下列哪些等于 $\\displaystyle\\sum_{k=1}^{90}\\sin^2(k^\\circ)=\\sin^2 1^\\circ+\\sin^2 2^\\circ+\\cdots+\\sin^2 90^\\circ$？</b>"
    },
    figureText: {
      en: "The curve y = sin²x from 0° to 90°. Two bars at k° and (90 − k)° are highlighted: their heights add up to 1.",
      fr: "La courbe y = sin²x de 0° à 90°. Deux barres en k° et (90 − k)° sont surlignées : leurs hauteurs font 1 au total.",
      es: "La curva y = sen²x de 0° a 90°. Se resaltan dos barras en k° y (90 − k)°: sus alturas suman 1.",
      ja: "0° から 90° の曲線 y = sin²x。k° と (90 − k)° の2本の棒を強調：高さの和は 1。",
      zh: "0° 到 90° 的曲线 y = sin²x。突出显示 k° 与 (90 − k)° 处的两根竖条：高度之和为 1。"
    },
    hint: {
      en: "$\\sin(90^\\circ-k^\\circ)=\\cos k^\\circ$. Pair the terms from both ends.",
      fr: "$\\sin(90^\\circ-k^\\circ)=\\cos k^\\circ$. Associez les termes des deux bouts.",
      es: "$\\sin(90^\\circ-k^\\circ)=\\cos k^\\circ$. Empareja los términos de los dos extremos.",
      ja: "$\\sin(90^\\circ-k^\\circ)=\\cos k^\\circ$。両端から項を組にします。",
      zh: "$\\sin(90^\\circ-k^\\circ)=\\cos k^\\circ$。从两端配对。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.1, h: 2.2, scale: 60, pad: 20 });
      const T = F.T = axes(F, -0.3, 5.8, -0.2, 2.0);
      const s = d => 1.6 * Math.sin(d * Math.PI / 180) ** 2, X = d => d / 18;
      plot(F, T, x => s(18 * x), 0, 5, 'graph');
      F.seg(T([X(20), 0]), T([X(20), s(20)]), 'hl yellow'); F.seg(T([X(70), 0]), T([X(70), s(70)]), 'hl pink');
      F.seg(T([0, 1.6]), T([5, 1.6]), 'seg thin dashc'); F.text(T([0, 1.6]), '1', 'tick', -10, 0);
      F.text(T([X(20), 0]), 'k°', 'len small', 0, 14); F.text(T([X(70), 0]), '90−k°', 'len small', 0, 14);
      F.text(T([5, 0]), '90°', 'tick', 0, 14); F.text(T([X(45), 0]), '45°', 'tick', 0, 14);
      return F;
    },
    options: [
      { tex: "45.5", correct: true, why: {
        en: "$44\\cdot1+\\tfrac12+1=45.5$.",
        fr: "$44\\cdot1+\\tfrac12+1=45.5$.",
        es: "$44\\cdot1+\\tfrac12+1=45.5$.",
        ja: "$44\\cdot1+\\tfrac12+1=45.5$.",
        zh: "$44\\cdot1+\\tfrac12+1=45.5$."
      } },
      { tex: "\\tfrac{91}{2}", correct: true, why: {
        en: "The same number as a fraction.",
        fr: "Le même nombre en fraction.",
        es: "El mismo número como fracción.",
        ja: "分数で書いた同じ数。",
        zh: "同一个数的分数形式。"
      } },
      { tex: "45", correct: false, why: {
        en: "Half of 90 terms: forgets that $\\sin^2 90^\\circ=1$ has no partner.",
        fr: "La moitié de 90 termes : oublie que $\\sin^2 90^\\circ=1$ n’a pas de partenaire.",
        es: "La mitad de 90 términos: olvida que $\\sin^2 90^\\circ=1$ no tiene pareja.",
        ja: "90項の半分：$\\sin^2 90^\\circ=1$ に相手がないことを忘れている。",
        zh: "90 项的一半：忘了 $\\sin^2 90^\\circ=1$ 没有配对。"
      } },
      { tex: "44.5", correct: false, why: {
        en: "Misses the last term $\\sin^2 90^\\circ=1$.",
        fr: "Oublie le dernier terme $\\sin^2 90^\\circ=1$.",
        es: "Olvida el último término $\\sin^2 90^\\circ=1$.",
        ja: "最後の項 $\\sin^2 90^\\circ=1$ が抜けている。",
        zh: "漏了最后一项 $\\sin^2 90^\\circ=1$。"
      } },
      { tex: "46", correct: false, why: {
        en: "Counts $\\sin^2 45^\\circ$ as $1$ instead of $\\tfrac12$.",
        fr: "Compte $\\sin^2 45^\\circ$ comme $1$ au lieu de $\\tfrac12$.",
        es: "Cuenta $\\sin^2 45^\\circ$ como $1$ en vez de $\\tfrac12$.",
        ja: "$\\sin^2 45^\\circ$ を $\\tfrac12$ でなく $1$ と数えている。",
        zh: "把 $\\sin^2 45^\\circ$ 当成 $1$ 而不是 $\\tfrac12$。"
      } },
      { tex: "90", correct: false, why: {
        en: "Every term is less than 1 except the last.",
        fr: "Chaque terme est inférieur à 1 sauf le dernier.",
        es: "Todos los términos son menores que 1 salvo el último.",
        ja: "最後以外の項はすべて 1 より小さい。",
        zh: "除最后一项外每项都小于 1。"
      } },
      { tex: "\\tfrac{89}{2}", correct: false, why: {
        en: "Off by one pair.",
        fr: "Décalé d’une paire.",
        es: "Desfasado en una pareja.",
        ja: "1組ずれている。",
        zh: "差了一对。"
      } },
      { tex: "0", correct: false, why: {
        en: "All terms are positive.",
        fr: "Tous les termes sont positifs.",
        es: "Todos los términos son positivos.",
        ja: "すべての項は正。",
        zh: "所有项都是正的。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pair k with 90 − k",
          fr: "Associer k et 90 − k",
          es: "Emparejar k con 90 − k",
          ja: "k と 90 − k を組に",
          zh: "k 与 90 − k 配对"
        },
        lines: ["\\sin^2 k^\\circ+\\sin^2(90-k)^\\circ=\\sin^2 k^\\circ+\\cos^2 k^\\circ=1,\\quad k=1,\\dots,44"],
        note: {
          en: "That uses the terms from $1^\\circ$ to $89^\\circ$ except $45^\\circ$.",
          fr: "Cela utilise les termes de $1^\\circ$ à $89^\\circ$ sauf $45^\\circ$.",
          es: "Eso usa los términos de $1^\\circ$ a $89^\\circ$ salvo $45^\\circ$.",
          ja: "$45^\\circ$ を除く $1^\\circ$〜$89^\\circ$ の項を使う。",
          zh: "用掉了 $1^\\circ$ 到 $89^\\circ$ 中除 $45^\\circ$ 外的项。"
        }
      },
      {
        title: {
          en: "The two leftovers",
          fr: "Les deux restes",
          es: "Los dos sobrantes",
          ja: "残りの2項",
          zh: "剩下的两项"
        },
        lines: ["44+\\sin^2 45^\\circ+\\sin^2 90^\\circ=44+\\tfrac12+1=\\boxed{\\tfrac{91}{2}}"],
        note: {
          en: "Matches the picture: the average height of the bars is about one half.",
          fr: "Cohérent avec la figure : la hauteur moyenne des barres est environ un demi.",
          es: "Coincide con la figura: la altura media de las barras es aproximadamente un medio.",
          ja: "図と一致：棒の平均の高さはおよそ半分。",
          zh: "与图一致：竖条平均高度约为一半。"
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
