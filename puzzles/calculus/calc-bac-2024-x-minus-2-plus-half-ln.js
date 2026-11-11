/* calculus · The root of x − 2 + ½ ln x
   Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 4, question A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-bac-2024-x-minus-2-plus-half-ln",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 4, question A",
        fr: "Baccalauréat 2024, spécialité mathématiques, Métropole, 19 juin 2024, exercice 4, question A",
        es: "Bachillerato francés (Bac) 2024, especialidad de matemáticas, Metrópoli, 19 de junio de 2024, ejercicio 4, pregunta A",
        ja: "フランス・バカロレア 2024 数学専門 本土 2024年6月19日 第4問 (A)",
        zh: "法国高中会考（Bac）2024 数学专业 本土卷 2024年6月19日 第4题（A）"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "The root of x − 2 + ½ ln x",
      fr: "La racine de x − 2 + ½ ln x",
      es: "La raíz de x − 2 + ½ ln x",
      ja: "x − 2 + ½ ln x の零点",
      zh: "x − 2 + ½ ln x 的零点"
    },
    statement: {
      en: "$f(x)=x-2+\\tfrac12\\ln x$ on $]0,+\\infty[$. <b>Which of the following are true?</b>",
      fr: "$f(x)=x-2+\\tfrac12\\ln x$ sur $]0,+\\infty[$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$f(x)=x-2+\\tfrac12\\ln x$ en $]0,+\\infty[$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$]0,+\\infty[$ 上で $f(x)=x-2+\\tfrac12\\ln x$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$f(x)=x-2+\\tfrac12\\ln x$，$x\\in\\,]0,+\\infty[$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Axes with x = 1 and x = 2 marked, the interval where f changes sign.",
      fr: "Des axes avec x = 1 et x = 2 marqués, l’intervalle où f change de signe.",
      es: "Ejes con x = 1 y x = 2 marcados, el intervalo donde f cambia de signo.",
      ja: "x = 1, 2 に目盛り。f が符号を変える区間。",
      zh: "标出 x = 1 与 x = 2，即 f 变号的区间。"
    },
    hint: {
      en: "$f'(x)=\\tfrac{2x+1}{2x}$ and $f''(x)=-\\tfrac{1}{2x^2}$. Compute $f(1)$ and $f(2)$.",
      fr: "$f'(x)=\\tfrac{2x+1}{2x}$ et $f''(x)=-\\tfrac{1}{2x^2}$. Calculez $f(1)$ et $f(2)$.",
      es: "$f'(x)=\\tfrac{2x+1}{2x}$ y $f''(x)=-\\tfrac{1}{2x^2}$. Calcula $f(1)$ y $f(2)$.",
      ja: "$f'(x)=\\tfrac{2x+1}{2x}$、$f''(x)=-\\tfrac{1}{2x^2}$。$f(1)$、$f(2)$ を計算。",
      zh: "$f'(x)=\\tfrac{2x+1}{2x}$，$f''(x)=-\\tfrac{1}{2x^2}$。算 $f(1)$、$f(2)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.6, scale: 56, pad: 16 });
      const T = F.T = axes(F, -0.3, 4.3, -2.2, 1.4);
      [1, 2].forEach(x => { F.seg(T([x, -0.08]), T([x, 0.08]), 'seg thin'); F.text(T([x, 0]), String(x), 'tick', 0, 14); });
      F.reveal = () => {
      plot(F, T, x => x - 2 + 0.5 * Math.log(x), 0.05, 3.3, 'graph', 'base', -2.2, 1.4);
      F.dot(T([1.72, 0])); F.text(T([1.72, 0]), 'α', 'pt', -4, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "has exactly one solution": {"fr": "a exactement une solution", "es": "tiene exactamente una solución", "ja": "の解はちょうど1つ", "zh": "恰有一个解"},
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "is convex on": {"fr": "est convexe sur", "es": "es convexa en", "ja": "は次で下に凸：", "zh": "在下列区间下凸："},
      "has a minimum on": {"fr": "admet un minimum sur", "es": "tiene un mínimo en", "ja": "は次で最小値をもつ：", "zh": "在下列区间有最小值："}
    },
    options: [
      { tex: "f(x)=0\\ \\text{has exactly one solution}\\ \\alpha,\\ \\text{and}\\ 1<\\alpha<2", correct: true, why: {
        en: "$f$ is increasing, $f(1)=-1<0$, $f(2)=\\tfrac12\\ln2>0$.",
        fr: "$f$ est croissante, $f(1)=-1<0$, $f(2)=\\tfrac12\\ln2>0$.",
        es: "$f$ es creciente, $f(1)=-1<0$, $f(2)=\\tfrac12\\ln2>0$.",
        ja: "$f$ は増加、$f(1)=-1<0$、$f(2)=\\tfrac12\\ln2>0$。",
        zh: "$f$ 递增，$f(1)=-1<0$，$f(2)=\\tfrac12\\ln2>0$。"
      } },
      { tex: "\\ln\\alpha=2(2-\\alpha)", correct: true, why: {
        en: "Rearrange $\\alpha-2+\\tfrac12\\ln\\alpha=0$.",
        fr: "Réarrangez $\\alpha-2+\\tfrac12\\ln\\alpha=0$.",
        es: "Reordena $\\alpha-2+\\tfrac12\\ln\\alpha=0$.",
        ja: "$\\alpha-2+\\tfrac12\\ln\\alpha=0$ を変形。",
        zh: "由 $\\alpha-2+\\tfrac12\\ln\\alpha=0$ 变形。"
      } },
      { tex: "f\\ \\text{is convex on}\\ ]0,+\\infty[", correct: false, why: {
        en: "$f''(x)=-\\tfrac1{2x^2}<0$: concave.",
        fr: "$f''(x)=-\\tfrac1{2x^2}<0$ : concave.",
        es: "$f''(x)=-\\tfrac1{2x^2}<0$: cóncava.",
        ja: "$f''<0$ で上に凸（凹）。",
        zh: "$f''<0$，为凹函数。"
      } },
      { tex: "\\lim_{x\\to0^+}f(x)=-2", correct: false, why: {
        en: "$\\ln x\\to-\\infty$, so $f\\to-\\infty$.",
        fr: "$\\ln x\\to-\\infty$, donc $f\\to-\\infty$.",
        es: "$\\ln x\\to-\\infty$, así que $f\\to-\\infty$.",
        ja: "$\\ln x\\to-\\infty$ なので $f\\to-\\infty$。",
        zh: "$\\ln x\\to-\\infty$，故 $f\\to-\\infty$。"
      } },
      { tex: "f'(x)=\\tfrac{2x-1}{2x}", correct: false, why: {
        en: "$f'(x)=1+\\tfrac1{2x}=\\tfrac{2x+1}{2x}$.",
        fr: "$f'(x)=1+\\tfrac1{2x}=\\tfrac{2x+1}{2x}$.",
        es: "$f'(x)=1+\\tfrac1{2x}=\\tfrac{2x+1}{2x}$.",
        ja: "$f'(x)=1+\\tfrac1{2x}=\\tfrac{2x+1}{2x}$。",
        zh: "$f'(x)=1+\\tfrac1{2x}=\\tfrac{2x+1}{2x}$。"
      } },
      { tex: "0<\\alpha<1", correct: false, why: {
        en: "$f(1)=-1<0$, so the root is beyond $1$.",
        fr: "$f(1)=-1<0$ : la racine est au-delà de $1$.",
        es: "$f(1)=-1<0$: la raíz está después de $1$.",
        ja: "$f(1)=-1<0$ なので解は $1$ より大。",
        zh: "$f(1)=-1<0$，根大于 $1$。"
      } },
      { tex: "f\\ \\text{has a minimum on}\\ ]0,+\\infty[", correct: false, why: {
        en: "It is strictly increasing with no lower bound.",
        fr: "Elle est strictement croissante et non minorée.",
        es: "Es estrictamente creciente y no acotada inferiormente.",
        ja: "狭義増加で下に有界でない。",
        zh: "严格递增且无下界。"
      } },
      { tex: "\\alpha=\\tfrac32", correct: false, why: {
        en: "$f(1.5)=-0.5+\\tfrac12\\ln1.5\\approx-0.30\\ne0$.",
        fr: "$f(1{,}5)\\approx-0{,}30\\ne0$.",
        es: "$f(1{,}5)\\approx-0{,}30\\ne0$.",
        ja: "$f(1.5)\\approx-0.30\\ne0$。",
        zh: "$f(1.5)\\approx-0.30\\ne0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Variations",
          fr: "Variations",
          es: "Variaciones",
          ja: "増減",
          zh: "单调性"
        },
        lines: ["f'(x)=1+\\tfrac1{2x}>0,\\qquad f''(x)=-\\tfrac1{2x^2}<0"],
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
          en: "Locate the root",
          fr: "Localiser la racine",
          es: "Localizar la raíz",
          ja: "解の位置",
          zh: "确定根"
        },
        lines: ["f(1)=-1<0,\\quad f(2)=\\tfrac12\\ln2>0\\ \\Rightarrow\\ \\exists!\\,\\alpha\\in]1,2["],
        note: {
          en: "Numerically $\\alpha\\approx1.72$.",
          fr: "Numériquement $\\alpha\\approx1{,}72$.",
          es: "Numéricamente $\\alpha\\approx1{,}72$.",
          ja: "数値的には $\\alpha\\approx1.72$。",
          zh: "数值上 $\\alpha\\approx1.72$。"
        }
      },
      {
        title: {
          en: "A useful identity",
          fr: "Une identité utile",
          es: "Una identidad útil",
          ja: "便利な等式",
          zh: "有用的等式"
        },
        lines: ["\\alpha-2+\\tfrac12\\ln\\alpha=0\\iff\\ln\\alpha=2(2-\\alpha)"],
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
