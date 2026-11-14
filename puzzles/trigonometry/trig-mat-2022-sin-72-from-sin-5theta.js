/* trigonometry · sin 72° from the sin 5θ identity
   Oxford MAT 2022 (Mathematics Admissions Test), Question 1F */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "trig-mat-2022-sin-72-from-sin-5theta",
    category: "trigonometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2022 (Mathematics Admissions Test), Question 1F",
        fr: "MAT d’Oxford 2022 (test d’admission en mathématiques), question 1F",
        es: "MAT de Oxford 2022 (prueba de admisión de matemáticas), pregunta 1F",
        ja: "オックスフォード大学 数学入学試験 MAT 2022 問題 1F",
        zh: "牛津大学数学入学考试 MAT 2022 第 1F 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "sin 72° from the sin 5θ identity",
      fr: "sin 72° grâce à l’identité de sin 5θ",
      es: "sin 72° a partir de la identidad de sin 5θ",
      ja: "sin 5θ の公式から sin 72°",
      zh: "由 sin 5θ 公式求 sin 72°"
    },
    statement: {
      en: "You may use $\\sin5\\theta=5\\sin\\theta-20\\sin^3\\theta+16\\sin^5\\theta$. <b>Which of the following are true?</b>",
      fr: "On admet $\\sin5\\theta=5\\sin\\theta-20\\sin^3\\theta+16\\sin^5\\theta$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Puedes usar $\\sin5\\theta=5\\sin\\theta-20\\sin^3\\theta+16\\sin^5\\theta$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$\\sin5\\theta=5\\sin\\theta-20\\sin^3\\theta+16\\sin^5\\theta$ を用いてよい。<b>次のうち正しいものはどれですか？</b>",
      zh: "可以使用 $\\sin5\\theta=5\\sin\\theta-20\\sin^3\\theta+16\\sin^5\\theta$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The unit circle with the angle 72°.",
      fr: "Le cercle unité avec l’angle 72°.",
      es: "La circunferencia unidad con el ángulo 72°.",
      ja: "単位円と 72° の角。",
      zh: "单位圆与 72° 角。"
    },
    hint: {
      en: "$\\theta=72^\\circ$ makes $\\sin5\\theta=0$. Divide by $\\sin\\theta\\ne0$ and solve the quadratic in $s^2$.",
      fr: "$\\theta=72^\\circ$ donne $\\sin5\\theta=0$. Divisez par $\\sin\\theta\\ne0$ et résolvez l’équation du second degré en $s^2$.",
      es: "$\\theta=72^\\circ$ da $\\sin5\\theta=0$. Divide entre $\\sin\\theta\\ne0$ y resuelve la cuadrática en $s^2$.",
      ja: "$\\theta=72^\\circ$ で $\\sin5\\theta=0$。$\\sin\\theta\\ne0$ で割り $s^2$ の2次方程式に。",
      zh: "$\\theta=72^\\circ$ 时 $\\sin5\\theta=0$。除以 $\\sin\\theta\\ne0$，解关于 $s^2$ 的二次方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 60, pad: 16 });
      const T = F.T = axes(F, -1.3, 1.5, -1.3, 1.5);
      F.circle(T([0, 0]), 1, 'seg thin');
      const a = 72 * Math.PI / 180, P = [Math.cos(a), Math.sin(a)];
      F.seg(T([0, 0]), T(P), 'seg'); F.dot(T(P)); F.arc(T([0, 0]), 0.3, 0, 72); F.text(T([0.62, 0.1]), '72°', 'len small', 0, 0);
      F.reveal = () => {
      F.seg(T(P), T([P[0], 0]), 'hl pink'); F.text(T([P[0], P[1] / 2]), 'sin', 'len small', 22, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "sin": {"fr": "sin", "es": "sen", "ja": "sin", "zh": "sin"},
      "has a root": {"fr": "a une racine", "es": "tiene una raíz", "ja": "は次の解をもつ", "zh": "有根"}
    },
    options: [
      { tex: "\\sin72^\\circ=\\sqrt{\\tfrac{5+\\sqrt5}{8}}", correct: true, why: {
        en: "The larger root of $16s^4-20s^2+5=0$, since $72^\\circ>45^\\circ$.",
        fr: "La plus grande racine de $16s^4-20s^2+5=0$, car $72^\\circ>45^\\circ$.",
        es: "La raíz mayor de $16s^4-20s^2+5=0$, pues $72^\\circ>45^\\circ$.",
        ja: "$72^\\circ>45^\\circ$ より $16s^4-20s^2+5=0$ の大きい方の解。",
        zh: "因 $72^\\circ>45^\\circ$，取 $16s^4-20s^2+5=0$ 的较大根。"
      } },
      { tex: "\\sin^2 36^\\circ=\\tfrac{5-\\sqrt5}{8}", correct: true, why: {
        en: "$36^\\circ$ also has $\\sin5\\theta=0$; it gives the smaller root.",
        fr: "$36^\\circ$ vérifie aussi $\\sin5\\theta=0$ ; c’est la petite racine.",
        es: "$36^\\circ$ también cumple $\\sin5\\theta=0$; da la raíz menor.",
        ja: "$36^\\circ$ も $\\sin5\\theta=0$ で、小さい方の解。",
        zh: "$36^\\circ$ 也满足 $\\sin5\\theta=0$，对应较小根。"
      } },
      { tex: "\\sin72^\\circ=\\sqrt{\\tfrac{5-\\sqrt5}{8}}", correct: false, why: {
        en: "That is about $0.588=\\sin36^\\circ$.",
        fr: "Cela vaut environ $0{,}588=\\sin36^\\circ$.",
        es: "Eso vale unos $0{,}588=\\sin36^\\circ$.",
        ja: "約 $0.588=\\sin36^\\circ$。",
        zh: "约 $0.588=\\sin36^\\circ$。"
      } },
      { tex: "\\sin72^\\circ=-\\sqrt{\\tfrac{5+\\sqrt5}{8}}", correct: false, why: {
        en: "$\\sin72^\\circ>0$.",
        fr: "$\\sin72^\\circ>0$.",
        es: "$\\sin72^\\circ>0$.",
        ja: "$\\sin72^\\circ>0$。",
        zh: "$\\sin72^\\circ>0$。"
      } },
      { tex: "\\sin72^\\circ=0", correct: false, why: {
        en: "$\\sin360^\\circ=0$, not $\\sin72^\\circ$.",
        fr: "C’est $\\sin360^\\circ$ qui est nul.",
        es: "El que vale $0$ es $\\sin360^\\circ$.",
        ja: "$0$ なのは $\\sin360^\\circ$。",
        zh: "等于 $0$ 的是 $\\sin360^\\circ$。"
      } },
      { tex: "\\sin72^\\circ=\\tfrac{1+\\sqrt5}{4}", correct: false, why: {
        en: "That is $\\cos36^\\circ\\approx0.809$.",
        fr: "C’est $\\cos36^\\circ\\approx0{,}809$.",
        es: "Es $\\cos36^\\circ\\approx0{,}809$.",
        ja: "それは $\\cos36^\\circ\\approx0.809$。",
        zh: "那是 $\\cos36^\\circ\\approx0.809$。"
      } },
      { tex: "16s^4-20s^2+5=0\\ \\text{has a root}\\ s^2>1", correct: false, why: {
        en: "$s^2=\\tfrac{5\\pm\\sqrt5}{8}<1$",
        fr: "$s^2=\\tfrac{5\\pm\\sqrt5}{8}<1$",
        es: "$s^2=\\tfrac{5\\pm\\sqrt5}{8}<1$",
        ja: "$s^2=\\tfrac{5\\pm\\sqrt5}{8}<1$",
        zh: "$s^2=\\tfrac{5\\pm\\sqrt5}{8}<1$"
      } },
      { tex: "\\sin^272^\\circ=\\tfrac{5+\\sqrt5}{4}", correct: false, why: {
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
          en: "Use sin 360° = 0",
          fr: "Utiliser sin 360° = 0",
          es: "Usar sin 360° = 0",
          ja: "sin 360° = 0 を使う",
          zh: "利用 sin 360° = 0"
        },
        lines: ["0=s(5-20s^2+16s^4)\\Rightarrow 16s^4-20s^2+5=0"],
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
          en: "Pick the right root",
          fr: "Choisir la bonne racine",
          es: "Elegir la raíz correcta",
          ja: "正しい解を選ぶ",
          zh: "选对根"
        },
        lines: ["s^2=\\tfrac{5\\pm\\sqrt5}{8};\\quad \\sin^272^\\circ>\\tfrac12\\Rightarrow s^2=\\tfrac{5+\\sqrt5}{8}"],
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
