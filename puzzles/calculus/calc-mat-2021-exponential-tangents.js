/* calculus · Where tangents to eˣ hit the axis
   Oxford MAT 2021 (Mathematics Admissions Test), Question 1C */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-mat-2021-exponential-tangents",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2021 (Mathematics Admissions Test), Question 1C",
        fr: "MAT d’Oxford 2021 (test d’admission en mathématiques), question 1C",
        es: "MAT de Oxford 2021 (prueba de admisión de matemáticas), pregunta 1C",
        ja: "オックスフォード大学 数学入学試験 MAT 2021 問題 1C",
        zh: "牛津大学数学入学考试 MAT 2021 第 1C 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "Where tangents to eˣ hit the axis",
      fr: "Où les tangentes à eˣ coupent l’axe",
      es: "Dónde cortan el eje las tangentes a eˣ",
      ja: "eˣ の接線が軸と交わる点",
      zh: "eˣ 的切线与轴的交点"
    },
    statement: {
      en: "The tangents to $y=e^x$ at $x=p$ and at $x=q$ meet the $x$-axis at $x=a$ and $x=b$. <b>Which of the following are true?</b>",
      fr: "Les tangentes à $y=e^x$ en $x=p$ et en $x=q$ coupent l’axe des $x$ en $x=a$ et $x=b$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Las tangentes a $y=e^x$ en $x=p$ y en $x=q$ cortan el eje $x$ en $x=a$ y $x=b$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$y=e^x$ の $x=p$, $x=q$ における接線が $x$ 軸と $x=a$, $x=b$ で交わります。<b>次のうち正しいものはどれですか？</b>",
      zh: "$y=e^x$ 在 $x=p$ 与 $x=q$ 处的切线分别交 $x$ 轴于 $x=a$、$x=b$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The curve y = eˣ with the points of contact above x = p and x = q. The tangents are drawn in the solution.",
      fr: "La courbe y = eˣ avec les points de contact au-dessus de x = p et x = q. Les tangentes sont tracées dans la solution.",
      es: "La curva y = eˣ con los puntos de contacto sobre x = p y x = q. Las tangentes se dibujan en la solución.",
      ja: "曲線 y = eˣ と、x = p, x = q 上の接点。接線は解答で描きます。",
      zh: "曲线 y = eˣ 与 x = p、x = q 上方的切点。切线在解答中画出。"
    },
    hint: {
      en: "The tangent at $p$ is $y=e^p(x-p+1)$.",
      fr: "La tangente en $p$ est $y=e^p(x-p+1)$.",
      es: "La tangente en $p$ es $y=e^p(x-p+1)$.",
      ja: "$p$ での接線は $y=e^p(x-p+1)$。",
      zh: "$p$ 处切线为 $y=e^p(x-p+1)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.6, scale: 50, pad: 18 });
      const T = F.T = axes(F, -3.0, 2.0, -0.4, 3.2);
      plot(F, T, Math.exp, -3.0, 1.15, 'graph', 'base', -0.4, 3.2);
      [[-0.6, 'p'], [0.8, 'q']].forEach(([p, t]) => { F.dot(T([p, Math.exp(p)])); F.seg(T([p, 0]), T([p, Math.exp(p)]), 'seg thin dashc'); F.text(T([p, 0]), t, 'tick', 0, 14); });
      F.reveal = () => {
      [-0.6, 0.8].forEach(p => { const m = Math.exp(p); F.seg(T([p - 1.3, m * -0.3]), T([Math.min(p + 0.9, 1.9), Math.min(m * 1.9, 3.1)]), 'seg thin'); F.dot(T([p - 1, 0])); });
      F.text(T([-1.6, 0]), 'a', 'tick', 0, 14); F.text(T([-0.2, 0]), 'b', 'tick', 0, 14);
      };
      return F;
    },
    options: [
      { tex: "p-a=q-b", correct: true, why: {
        en: "Both equal $1$.",
        fr: "Les deux valent $1$.",
        es: "Ambos valen $1$.",
        ja: "どちらも $1$。",
        zh: "都等于 $1$。"
      } },
      { tex: "p-a=1", correct: true, why: {
        en: "$e^p(x-p+1)=0\\iff x=p-1$.",
        fr: "$e^p(x-p+1)=0\\iff x=p-1$.",
        es: "$e^p(x-p+1)=0\\iff x=p-1$.",
        ja: "$e^p(x-p+1)=0\\iff x=p-1$.",
        zh: "$e^p(x-p+1)=0\\iff x=p-1$."
      } },
      { tex: "p-a=e^p", correct: false, why: {
        en: "The intercept distance does not depend on $p$.",
        fr: "L’écart ne dépend pas de $p$.",
        es: "La distancia no depende de $p$.",
        ja: "距離は $p$ によらない。",
        zh: "距离与 $p$ 无关。"
      } },
      { tex: "a=b", correct: false, why: {
        en: "Only if $p=q$.",
        fr: "Seulement si $p=q$.",
        es: "Solo si $p=q$.",
        ja: "$p=q$ のときだけ。",
        zh: "仅当 $p=q$。"
      } },
      { tex: "a=-p", correct: false, why: {
        en: "$a=p-1$.",
        fr: "$a=p-1$.",
        es: "$a=p-1$.",
        ja: "$a=p-1$。",
        zh: "$a=p-1$。"
      } },
      { tex: "\\tfrac{p}{a}=\\tfrac{q}{b}", correct: false, why: {
        en: "$\\tfrac{p}{p-1}$ changes with $p$.",
        fr: "$\\tfrac{p}{p-1}$ dépend de $p$.",
        es: "$\\tfrac{p}{p-1}$ depende de $p$.",
        ja: "$\\tfrac{p}{p-1}$ は $p$ で変わる。",
        zh: "$\\tfrac{p}{p-1}$ 随 $p$ 变化。"
      } },
      { tex: "p-a=2", correct: false, why: {
        en: "That is the subtangent of a different curve.",
        fr: "Ce serait une autre courbe.",
        es: "Sería otra curva.",
        ja: "別の曲線の場合。",
        zh: "那是别的曲线。"
      } },
      { tex: "e^p-e^a=1", correct: false, why: {
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
          en: "Tangent line",
          fr: "Tangente",
          es: "Tangente",
          ja: "接線",
          zh: "切线"
        },
        lines: ["y-e^p=e^p(x-p)\\iff y=e^p(x-p+1)"],
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
          en: "x-intercept",
          fr: "Abscisse à l’origine",
          es: "Corte con el eje x",
          ja: "x 切片",
          zh: "x 截距"
        },
        lines: ["y=0\\iff x=p-1\\;\\Rightarrow\\;a=p-1,\\ b=q-1"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "So $p-a=q-b=1$: the subtangent of $e^x$ is always $1$.",
          fr: "Donc $p-a=q-b=1$ : la sous-tangente de $e^x$ vaut toujours $1$.",
          es: "Así $p-a=q-b=1$: la subtangente de $e^x$ siempre es $1$.",
          ja: "よって $p-a=q-b=1$。$e^x$ の接線影は常に 1。",
          zh: "所以 $p-a=q-b=1$：$e^x$ 的次切距恒为 1。"
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
