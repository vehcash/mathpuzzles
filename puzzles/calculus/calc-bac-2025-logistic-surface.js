/* calculus · A surface that levels off at 15 hectares
   Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 4 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-bac-2025-logistic-surface",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2025 (France), mathematics speciality, Métropole, day 1 (17 June 2025), Exercise 4",
        fr: "Baccalauréat 2025, spécialité mathématiques, Métropole, jour 1 (17 juin 2025), exercice 4",
        es: "Bachillerato francés (Bac) 2025, especialidad de matemáticas, Metrópoli, día 1 (17 de junio de 2025), ejercicio 4",
        ja: "フランス・バカロレア 2025 数学専門 本土 1日目（2025年6月17日）第4問",
        zh: "法国高中会考（Bac）2025 数学专业 本土卷 第1天（2025年6月17日）第4题"
      },
      exams: ["bac"]
    },
    difficulty: 3,
    title: {
      en: "A surface that levels off at 15 hectares",
      fr: "Une surface qui plafonne à 15 hectares",
      es: "Una superficie que se estabiliza en 15 hectáreas",
      ja: "15 ha で頭打ちになる面積",
      zh: "在 15 公顷趋于稳定的面积"
    },
    statement: {
      en: "A surface (in hectares) is modelled first by $u_0=1$, $u_{n+1}=-0.02u_n^2+1.3u_n$, then continuously by $f(0)=1$, $f'=0.02f(15-f)$. <b>Which of the following are true?</b>",
      fr: "Une surface (en hectares) est modélisée d’abord par $u_0=1$, $u_{n+1}=-0{,}02u_n^2+1{,}3u_n$, puis de façon continue par $f(0)=1$, $f'=0{,}02f(15-f)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Una superficie (en hectáreas) se modeliza primero con $u_0=1$, $u_{n+1}=-0{,}02u_n^2+1{,}3u_n$, y luego de forma continua con $f(0)=1$, $f'=0{,}02f(15-f)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "面積（ha）を、まず $u_0=1$、$u_{n+1}=-0.02u_n^2+1.3u_n$、次に連続モデル $f(0)=1$、$f'=0.02f(15-f)$ で表します。<b>次のうち正しいものはどれですか？</b>",
      zh: "某面积（公顷）先用 $u_0=1$，$u_{n+1}=-0.02u_n^2+1.3u_n$ 建模，再用连续模型 $f(0)=1$，$f'=0.02f(15-f)$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Dots u₀, u₁, u₂, … climbing towards a dashed horizontal line.",
      fr: "Des points u₀, u₁, u₂, … montant vers une droite horizontale pointillée.",
      es: "Puntos u₀, u₁, u₂, … que suben hacia una recta horizontal discontinua.",
      ja: "点 u₀, u₁, u₂, … が破線の水平線へ近づく。",
      zh: "点 u₀、u₁、u₂… 向一条水平虚线上升。"
    },
    hint: {
      en: "A limit $L$ satisfies $L=-0.02L^2+1.3L$. For $f$, set $g=\\tfrac1f$: then $g'=-0.3g+0.02$.",
      fr: "Une limite $L$ vérifie $L=-0{,}02L^2+1{,}3L$. Pour $f$, posez $g=\\tfrac1f$ : alors $g'=-0{,}3g+0{,}02$.",
      es: "Un límite $L$ cumple $L=-0{,}02L^2+1{,}3L$. Para $f$, toma $g=\\tfrac1f$: entonces $g'=-0{,}3g+0{,}02$.",
      ja: "極限 $L$ は $L=-0.02L^2+1.3L$。$f$ には $g=\\tfrac1f$ とおくと $g'=-0.3g+0.02$。",
      zh: "极限 $L$ 满足 $L=-0.02L^2+1.3L$；对 $f$ 令 $g=\\tfrac1f$，则 $g'=-0.3g+0.02$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.5, h: 3.8, scale: 44, pad: 16 });
      const T = F.T = axes(F, -0.5, 6.0, -0.4, 3.4);
      let u = 1; for (let n = 0; n <= 25; n++) { F.dot(T([n * 0.22, u * 0.2])); u = -0.02 * u * u + 1.3 * u; }
      F.text(T([0, 0]), '0', 'tick', -8, 14); F.text(T([5.5, 0]), 'n', 'tick', 0, 14);
      F.reveal = () => {
      F.seg(T([0, 3]), T([5.9, 3]), 'hl pink'); F.text(T([0, 3]), '15', 'tick', -14, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is decreasing": {"fr": "est décroissante", "es": "es decreciente", "ja": "は減少", "zh": "递减"},
      "0": {"fr": "0", "es": "0", "ja": "0", "zh": "0"},
      "n": {"fr": "n", "es": "n", "ja": "n", "zh": "n"},
      "15": {"fr": "15", "es": "15", "ja": "15", "zh": "15"}
    },
    options: [
      { tex: "\\lim u_n=15", correct: true, why: {
        en: "$0.02L^2-0.3L=0\\Rightarrow L=15$ ($L\\ge1$)",
        fr: "$0.02L^2-0.3L=0\\Rightarrow L=15$ ($L\\ge1$)",
        es: "$0.02L^2-0.3L=0\\Rightarrow L=15$ ($L\\ge1$)",
        ja: "$0.02L^2-0.3L=0\\Rightarrow L=15$ ($L\\ge1$)",
        zh: "$0.02L^2-0.3L=0\\Rightarrow L=15$ ($L\\ge1$)"
      } },
      { tex: "f(t)=\\dfrac{15}{14e^{-0.3t}+1}", correct: true, why: {
        en: "$g=Ce^{-0.3t}+\\tfrac1{15}$, $g(0)=1\\Rightarrow C=\\tfrac{14}{15}$",
        fr: "$g=Ce^{-0.3t}+\\tfrac1{15}$, $g(0)=1\\Rightarrow C=\\tfrac{14}{15}$",
        es: "$g=Ce^{-0.3t}+\\tfrac1{15}$, $g(0)=1\\Rightarrow C=\\tfrac{14}{15}$",
        ja: "$g=Ce^{-0.3t}+\\tfrac1{15}$, $g(0)=1\\Rightarrow C=\\tfrac{14}{15}$",
        zh: "$g=Ce^{-0.3t}+\\tfrac1{15}$, $g(0)=1\\Rightarrow C=\\tfrac{14}{15}$"
      } },
      { tex: "\\lim u_n=0", correct: false, why: {
        en: "$0$ is a fixed point, but $(u_n)$ increases from $1$.",
        fr: "$0$ est un point fixe, mais $(u_n)$ croît depuis $1$.",
        es: "$0$ es punto fijo, pero $(u_n)$ crece desde $1$.",
        ja: "$0$ も不動点だが $(u_n)$ は $1$ から増加。",
        zh: "$0$ 是不动点，但 $(u_n)$ 从 $1$ 递增。"
      } },
      { tex: "u_1=1.3", correct: false, why: {
        en: "$u_1=-0.02+1.3=1.28$",
        fr: "$u_1=-0.02+1.3=1.28$",
        es: "$u_1=-0.02+1.3=1.28$",
        ja: "$u_1=-0.02+1.3=1.28$",
        zh: "$u_1=-0.02+1.3=1.28$"
      } },
      { tex: "f(t)=15e^{0.3t}", correct: false, why: {
        en: "Not bounded; $f$ tends to $15$.",
        fr: "Non bornée ; $f$ tend vers $15$.",
        es: "No acotada; $f$ tiende a $15$.",
        ja: "有界でない。$f\\to15$。",
        zh: "无界，而 $f\\to15$。"
      } },
      { tex: "f(t)>14\\iff t>\\tfrac{\\ln14}{0.3}", correct: false, why: {
        en: "$14e^{-0.3t}<\\tfrac1{14}\\iff t>\\tfrac{\\ln196}{0.3}\\approx17.6$",
        fr: "$14e^{-0.3t}<\\tfrac1{14}\\iff t>\\tfrac{\\ln196}{0.3}\\approx17.6$",
        es: "$14e^{-0.3t}<\\tfrac1{14}\\iff t>\\tfrac{\\ln196}{0.3}\\approx17.6$",
        ja: "$14e^{-0.3t}<\\tfrac1{14}\\iff t>\\tfrac{\\ln196}{0.3}\\approx17.6$",
        zh: "$14e^{-0.3t}<\\tfrac1{14}\\iff t>\\tfrac{\\ln196}{0.3}\\approx17.6$"
      } },
      { tex: "(u_n)\\ \\text{is decreasing}", correct: false, why: {
        en: "$u_{n+1}-u_n=u_n(0.3-0.02u_n)\\ge0\\ (u_n\\le15)$",
        fr: "$u_{n+1}-u_n=u_n(0.3-0.02u_n)\\ge0\\ (u_n\\le15)$",
        es: "$u_{n+1}-u_n=u_n(0.3-0.02u_n)\\ge0\\ (u_n\\le15)$",
        ja: "$u_{n+1}-u_n=u_n(0.3-0.02u_n)\\ge0\\ (u_n\\le15)$",
        zh: "$u_{n+1}-u_n=u_n(0.3-0.02u_n)\\ge0\\ (u_n\\le15)$"
      } },
      { tex: "f(t)=\\dfrac{15}{15e^{-0.3t}+1}", correct: false, why: {
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
          en: "Discrete limit",
          fr: "Limite discrète",
          es: "Límite discreto",
          ja: "離散モデルの極限",
          zh: "离散极限"
        },
        lines: ["L=-0.02L^2+1.3L\\iff L(0.3-0.02L)=0\\Rightarrow L=15"],
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
          en: "Continuous model",
          fr: "Modèle continu",
          es: "Modelo continuo",
          ja: "連続モデル",
          zh: "连续模型"
        },
        lines: ["g=\\tfrac1f:\\ g'=-0.3g+0.02,\\ g=\\tfrac{14}{15}e^{-0.3t}+\\tfrac1{15}\\Rightarrow f=\\dfrac{15}{14e^{-0.3t}+1}"],
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
