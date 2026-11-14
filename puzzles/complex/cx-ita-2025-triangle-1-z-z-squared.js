/* complex · The triangle 1, z, z² with area 200
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-ita-2025-triangle-1-z-z-squared",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 1",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 1",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 1",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第1問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 1 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "The triangle 1, z, z² with area 200",
      fr: "Le triangle 1, z, z² d’aire 200",
      es: "El triángulo 1, z, z² de área 200",
      ja: "面積 200 の三角形 1, z, z²",
      zh: "面积为 200 的三角形 1, z, z²"
    },
    statement: {
      en: "Let $z=a+2i$ with $a>0$ real. The points representing $1$, $z$ and $z^2$ in the complex plane form a triangle of area $200$. <b>Which of the following are true?</b>",
      fr: "Soit $z=a+2i$ avec $a>0$ réel. Les points d’affixes $1$, $z$ et $z^2$ forment un triangle d’aire $200$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sea $z=a+2i$ con $a>0$ real. Los puntos que representan $1$, $z$ y $z^2$ en el plano complejo forman un triángulo de área $200$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$z=a+2i$（$a>0$ は実数）とします。複素平面上の $1$, $z$, $z^2$ を表す点は面積 $200$ の三角形をなします。 <b>次のうち正しいものはどれですか？</b>",
      zh: "设 $z=a+2i$，$a>0$ 为实数。复平面上表示 $1$、$z$、$z^2$ 的点构成面积为 $200$ 的三角形。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The points 1, z and z² for some a, joined into a triangle.",
      fr: "Les points 1, z et z² pour un certain a, reliés en triangle.",
      es: "Los puntos 1, z y z² para cierto a, unidos en un triángulo.",
      ja: "ある a に対する点 1, z, z² を結んだ三角形。",
      zh: "某个 a 下的点 1、z、z² 连成三角形。"
    },
    hint: {
      en: "Area $=\\tfrac12\\left|\\operatorname{Im}\\big(\\overline{(z-1)}\\,(z^2-1)\\big)\\right|$, and $z^2-1=(z-1)(z+1)$.",
      fr: "Aire $=\\tfrac12\\left|\\operatorname{Im}\\big(\\overline{(z-1)}\\,(z^2-1)\\big)\\right|$, et $z^2-1=(z-1)(z+1)$.",
      es: "Área $=\\tfrac12\\left|\\operatorname{Im}\\big(\\overline{(z-1)}\\,(z^2-1)\\big)\\right|$, y $z^2-1=(z-1)(z+1)$.",
      ja: "面積 $=\\tfrac12\\left|\\operatorname{Im}\\big(\\overline{(z-1)}\\,(z^2-1)\\big)\\right|$、$z^2-1=(z-1)(z+1)$。",
      zh: "面积 $=\\tfrac12\\left|\\operatorname{Im}\\big(\\overline{(z-1)}\\,(z^2-1)\\big)\\right|$，且 $z^2-1=(z-1)(z+1)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.2, scale: 46, pad: 16 });
      const S = ([x, y]) => [0.5 + x * 0.42, 0.4 + y * 0.42];
      F.seg(S([-1, 0]), S([10.5, 0]), 'axis'); F.seg(S([0, -0.8]), S([0, 8.8]), 'axis'); F.text(S([10.5, 0]), 'Re', 'tick', -10, 12); F.text(S([0, 8.8]), 'Im', 'tick', 14, 8);
      const a = 2.0, z = [a, 2], z2 = [a * a - 4, 4 * a];
      F.path([S([1, 0]), S(z), S(z2)], 'fill-blue', 'fills'); [[1, 0], z, z2].forEach(p => F.dot(S(p)));
      F.text(S([1, 0]), '1', 'pt', 0, 14); F.text(S(z), 'z', 'pt', 12, 0); F.text(S(z2), 'z²', 'pt', 12, 0);
      F.reveal = () => {
      F.text(S([6.5, 7.0]), '|z−1|²·Im(z+1)/2', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "|z−1|²·Im(z+1)/2": {"fr": "|z−1|²·Im(z+1)/2", "es": "|z−1|²·Im(z+1)/2", "ja": "|z−1|²·Im(z+1)/2", "zh": "|z−1|²·Im(z+1)/2"},
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "also works": {"fr": "convient aussi", "es": "también funciona", "ja": "も条件を満たす", "zh": "也满足"}
    },
    options: [
      { tex: "a=15", correct: true, why: {
        en: "$\\tfrac12\\big((a-1)^2+4\\big)\\cdot2=200\\Rightarrow(a-1)^2=196$",
        fr: "$\\tfrac12\\big((a-1)^2+4\\big)\\cdot2=200\\Rightarrow(a-1)^2=196$",
        es: "$\\tfrac12\\big((a-1)^2+4\\big)\\cdot2=200\\Rightarrow(a-1)^2=196$",
        ja: "$\\tfrac12\\big((a-1)^2+4\\big)\\cdot2=200\\Rightarrow(a-1)^2=196$",
        zh: "$\\tfrac12\\big((a-1)^2+4\\big)\\cdot2=200\\Rightarrow(a-1)^2=196$"
      } },
      { tex: "\\text{area}=(a-1)^2+4", correct: true, why: {
        en: "$\\tfrac12|z-1|^2\\operatorname{Im}(z+1)$ with $\\operatorname{Im}(z+1)=2$.",
        fr: "$\\tfrac12|z-1|^2\\operatorname{Im}(z+1)$ avec $\\operatorname{Im}(z+1)=2$.",
        es: "$\\tfrac12|z-1|^2\\operatorname{Im}(z+1)$ con $\\operatorname{Im}(z+1)=2$.",
        ja: "$\\tfrac12|z-1|^2\\operatorname{Im}(z+1)$、$\\operatorname{Im}(z+1)=2$。",
        zh: "$\\tfrac12|z-1|^2\\operatorname{Im}(z+1)$，$\\operatorname{Im}(z+1)=2$。"
      } },
      { tex: "a=14", correct: false, why: {
        en: "Forgets the $-1$: uses $|z|^2$ instead of $|z-1|^2$.",
        fr: "Oublie le $-1$ : utilise $|z|^2$ au lieu de $|z-1|^2$.",
        es: "Olvida el $-1$: usa $|z|^2$ en vez de $|z-1|^2$.",
        ja: "$-1$ を忘れ $|z-1|^2$ でなく $|z|^2$ を使う。",
        zh: "漏了 $-1$，用了 $|z|^2$。"
      } },
      { tex: "a=16", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=17", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=18", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "a=-13\\ \\text{also works}", correct: false, why: {
        en: "It gives area $200$ too, but $a>0$ is required.",
        fr: "Il donne aussi l’aire $200$, mais on exige $a>0$.",
        es: "También da área $200$, pero se exige $a>0$.",
        ja: "面積は $200$ になるが $a>0$ の条件に反する。",
        zh: "面积也为 $200$，但要求 $a>0$。"
      } },
      { tex: "\\text{area}=\\tfrac12|z|\\,|z^2-1|", correct: false, why: {
        en: "That ignores the angle between the sides.",
        fr: "Cela ignore l’angle entre les côtés.",
        es: "Ignora el ángulo entre los lados.",
        ja: "辺の間の角を無視している。",
        zh: "忽略了两边夹角。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor the side",
          fr: "Factoriser un côté",
          es: "Factorizar un lado",
          ja: "辺を因数分解",
          zh: "分解一边"
        },
        lines: ["z^2-1=(z-1)(z+1)\\Rightarrow\\overline{(z-1)}(z^2-1)=|z-1|^2(z+1)"],
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
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["\\tfrac12|z-1|^2\\cdot\\operatorname{Im}(z+1)=(a-1)^2+4=200\\Rightarrow a=15"],
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
