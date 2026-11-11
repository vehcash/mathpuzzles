/* calculus · A trolley slowing down
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-bac-2025-braking-speed-ode",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 2 (18 June 2025), Exercise 4",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 2 (18 juin 2025), exercice 4",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 2 (18 de junio de 2025), ejercicio 4",
        ja: "フランス・バカロレア 2025 数学専門 本土 2日目（2025年6月18日）第4問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第2天（2025年6月18日）第4题"
      },
      exams: ["bac"]
    },
    difficulty: 2,
    title: {
      en: "A trolley slowing down",
      fr: "Un chariot qui ralentit",
      es: "Un carro que frena",
      ja: "減速する台車",
      zh: "减速的小车"
    },
    statement: {
      en: "The speed $v$ (m/s) of a trolley satisfies $v'+0.6v=e^{-0.6t}$ for $t\\ge0$, with $v(0)=12$. <b>Which of the following are true?</b>",
      fr: "La vitesse $v$ (m/s) d’un chariot vérifie $v'+0{,}6v=e^{-0{,}6t}$ pour $t\\ge0$, avec $v(0)=12$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La velocidad $v$ (m/s) de un carro cumple $v'+0{,}6v=e^{-0{,}6t}$ para $t\\ge0$, con $v(0)=12$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "台車の速さ $v$（m/s）は $t\\ge0$ で $v'+0.6v=e^{-0.6t}$、$v(0)=12$ を満たします。<b>次のうち正しいものはどれですか？</b>",
      zh: "小车速度 $v$（m/s）满足 $v'+0.6v=e^{-0.6t}$（$t\\ge0$），$v(0)=12$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "A speed–time graph starting at 12 and decreasing towards 0, with the level v = 1 drawn.",
      fr: "Un graphique vitesse–temps partant de 12 et décroissant vers 0, avec le niveau v = 1.",
      es: "Una gráfica velocidad–tiempo que parte de 12 y decrece hacia 0, con el nivel v = 1.",
      ja: "12 から 0 へ減る速さ–時間グラフと v = 1 の線。",
      zh: "从 12 递减趋于 0 的速度–时间图，画出 v = 1。"
    },
    hint: {
      en: "Try $y=(A+t)e^{-0.6t}$: the $t$ part is a particular solution, $Ae^{-0.6t}$ solves the homogeneous equation.",
      fr: "Essayez $y=(A+t)e^{-0{,}6t}$ : la partie en $t$ est une solution particulière, $Ae^{-0{,}6t}$ résout l’équation homogène.",
      es: "Prueba $y=(A+t)e^{-0{,}6t}$: la parte en $t$ es solución particular y $Ae^{-0{,}6t}$ resuelve la homogénea.",
      ja: "$y=(A+t)e^{-0.6t}$ を試す。",
      zh: "试 $y=(A+t)e^{-0.6t}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 4.0, scale: 48, pad: 16 });
      const T = F.T = axes(F, -0.5, 5.5, -0.5, 3.5);
      plot(F, T, t => (12 + 2 * t) * Math.exp(-1.2 * t) / 4, 0, 5.4, 'graph', 'base', -0.5, 3.5);
      F.seg(T([0, 0.25]), T([5.4, 0.25]), 'seg thin dashc'); F.text(T([0, 3]), '12', 'tick', -14, 0); F.text(T([0, 0.25]), '1', 'tick', -10, 0);
      F.reveal = () => {
      F.dot(T([2.35, 0.25])); F.text(T([2.35, 0.25]), 'α ≈ 4.7', 'len small', 30, -12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "12": {"fr": "12", "es": "12", "ja": "12", "zh": "12"},
      "1": {"fr": "1", "es": "1", "ja": "1", "zh": "1"},
      "α ≈ 4.7": {"fr": "α ≈ 4,7", "es": "α ≈ 4,7", "ja": "α ≈ 4.7", "zh": "α ≈ 4.7"},
      "has a maximum at": {"fr": "a un maximum en", "es": "tiene un máximo en", "ja": "は次で最大：", "zh": "在下列处取最大值"},
      "has two solutions": {"fr": "a deux solutions", "es": "tiene dos soluciones", "ja": "の解は2つ", "zh": "有两个解"},
      "at": {"fr": "en", "es": "en", "ja": "で", "zh": "于"}
    },
    options: [
      { tex: "v(t)=(12+t)e^{-0.6t}", correct: true, why: {
        en: "$v'=e^{-0.6t}-0.6(12+t)e^{-0.6t},\\ v(0)=12$",
        fr: "$v'=e^{-0.6t}-0.6(12+t)e^{-0.6t},\\ v(0)=12$",
        es: "$v'=e^{-0.6t}-0.6(12+t)e^{-0.6t},\\ v(0)=12$",
        ja: "$v'=e^{-0.6t}-0.6(12+t)e^{-0.6t},\\ v(0)=12$",
        zh: "$v'=e^{-0.6t}-0.6(12+t)e^{-0.6t},\\ v(0)=12$"
      } },
      { tex: "v'(t)=(-6.2-0.6t)e^{-0.6t}<0", correct: true, why: {
        en: "$1-7.2-0.6t=-6.2-0.6t$",
        fr: "$1-7.2-0.6t=-6.2-0.6t$",
        es: "$1-7.2-0.6t=-6.2-0.6t$",
        ja: "$1-7.2-0.6t=-6.2-0.6t$",
        zh: "$1-7.2-0.6t=-6.2-0.6t$"
      } },
      { tex: "v(t)=12e^{-0.6t}", correct: false, why: {
        en: "That solves only the homogeneous equation.",
        fr: "Cela résout seulement l’équation homogène.",
        es: "Solo resuelve la ecuación homogénea.",
        ja: "同次方程式の解にすぎない。",
        zh: "只是齐次方程的解。"
      } },
      { tex: "v(t)=(12-t)e^{-0.6t}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\lim_{t\\to+\\infty}v(t)=12", correct: false, why: {
        en: "$(12+t)e^{-0.6t}\\to0$",
        fr: "$(12+t)e^{-0.6t}\\to0$",
        es: "$(12+t)e^{-0.6t}\\to0$",
        ja: "$(12+t)e^{-0.6t}\\to0$",
        zh: "$(12+t)e^{-0.6t}\\to0$"
      } },
      { tex: "v\\ \\text{has a maximum at}\\ t>0", correct: false, why: {
        en: "$v'<0$ for all $t\\ge0$.",
        fr: "$v'<0$ pour tout $t\\ge0$.",
        es: "$v'<0$ para todo $t\\ge0$.",
        ja: "常に $v'<0$。",
        zh: "总有 $v'<0$。"
      } },
      { tex: "v(t)=1\\ \\text{has two solutions}", correct: false, why: {
        en: "$v$ is strictly decreasing from $12$ to $0$: exactly one.",
        fr: "$v$ décroît strictement de $12$ à $0$ : une seule.",
        es: "$v$ decrece estrictamente de $12$ a $0$: exactamente una.",
        ja: "$v$ は狭義減少なので1つ。",
        zh: "$v$ 严格递减，恰有一个。"
      } },
      { tex: "v(t)=(12+t)e^{0.6t}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "General solution",
          fr: "Solution générale",
          es: "Solución general",
          ja: "一般解",
          zh: "通解"
        },
        lines: ["y=(A+t)e^{-0.6t},\\quad v(0)=12\\Rightarrow v=(12+t)e^{-0.6t}"],
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
          en: "Monotone",
          fr: "Monotone",
          es: "Monótona",
          ja: "単調",
          zh: "单调"
        },
        lines: ["v'(t)=(-6.2-0.6t)e^{-0.6t}<0,\\quad v(\\alpha)=1\\ \\text{at}\\ \\alpha\\approx4.7"],
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
