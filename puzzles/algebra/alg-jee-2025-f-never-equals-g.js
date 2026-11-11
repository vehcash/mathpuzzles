/* algebra · Two quartics that never meet
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2025-f-never-equals-g",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.1",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.1",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.1",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.1",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.1"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Two quartics that never meet",
      fr: "Deux quartiques qui ne se croisent jamais",
      es: "Dos cuárticas que nunca se cortan",
      ja: "決して一致しない2つの4次式",
      zh: "永不相等的两个四次式"
    },
    statement: {
      en: "$f(x)=a_1+10x+a_2x^2+a_3x^3+x^4$, $g(x)=b_1+3x+b_2x^2+b_3x^3+x^4$ with real coefficients, and $f(x)\\ne g(x)$ for every real $x$. Let $h(x)=f(x+1)-g(x+2)$. <b>Which of the following equal the coefficient of $x^3$ in $h$?</b>",
      fr: "$f(x)=a_1+10x+a_2x^2+a_3x^3+x^4$, $g(x)=b_1+3x+b_2x^2+b_3x^3+x^4$ à coefficients réels, et $f(x)\\ne g(x)$ pour tout réel $x$. Soit $h(x)=f(x+1)-g(x+2)$. <b>Lesquelles des valeurs suivantes sont égales au coefficient de $x^3$ dans $h$ ?</b>",
      es: "$f(x)=a_1+10x+a_2x^2+a_3x^3+x^4$, $g(x)=b_1+3x+b_2x^2+b_3x^3+x^4$ con coeficientes reales, y $f(x)\\ne g(x)$ para todo $x$ real. Sea $h(x)=f(x+1)-g(x+2)$. <b>¿Cuáles de los siguientes valores son iguales al coeficiente de $x^3$ en $h$?</b>",
      ja: "実数係数の $f(x)=a_1+10x+a_2x^2+a_3x^3+x^4$、$g(x)=b_1+3x+b_2x^2+b_3x^3+x^4$ がすべての実数 $x$ で $f(x)\\ne g(x)$ を満たします。$h(x)=f(x+1)-g(x+2)$ とするとき、<b>$h$ の $x^3$ の係数に等しいものはどれですか？</b>",
      zh: "实系数多项式 $f(x)=a_1+10x+a_2x^2+a_3x^3+x^4$，$g(x)=b_1+3x+b_2x^2+b_3x^3+x^4$，对任意实数 $x$ 有 $f(x)\\ne g(x)$。设 $h(x)=f(x+1)-g(x+2)$，<b>下列哪些等于 $h$ 中 $x^3$ 的系数？</b>"
    },
    figureText: {
      en: "A sketch of f − g, a curve that stays above the x-axis and never crosses it.",
      fr: "Une esquisse de f − g, une courbe qui reste au-dessus de l’axe des x sans le croiser.",
      es: "Un esbozo de f − g, una curva que queda sobre el eje x sin cruzarlo.",
      ja: "x 軸と交わらない f − g の概形。",
      zh: "f − g 的草图：始终在 x 轴上方、不与之相交。"
    },
    hint: {
      en: "$f-g$ is a polynomial of degree at most $3$ with no real root. What does that force on $a_3-b_3$?",
      fr: "$f-g$ est un polynôme de degré au plus $3$ sans racine réelle. Que cela impose-t-il à $a_3-b_3$ ?",
      es: "$f-g$ es un polinomio de grado a lo sumo $3$ sin raíces reales. ¿Qué implica para $a_3-b_3$?",
      ja: "$f-g$ は実数解をもたない3次以下の多項式。$a_3-b_3$ はどうなる？",
      zh: "$f-g$ 是次数不超过 $3$ 且无实根的多项式，这对 $a_3-b_3$ 意味着什么？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.0, scale: 56, pad: 16 });
      const T = F.T = axes(F, -2.2, 2.2, -0.4, 2.6);
      plot(F, T, x => 0.4 * x * x + 0.5 * x + 0.6, -2.1, 2.1, 'graph', 'base', -0.4, 2.6); F.text(T([1.8, 1.0]), 'f − g', 'len small', 0, 0);
      F.reveal = () => {
      F.text(T([-1.2, 2.2]), 'a₃ = b₃', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "f − g": {"fr": "f − g", "es": "f − g", "ja": "f − g", "zh": "f − g"},
      "a₃ = b₃": {"fr": "a₃ = b₃", "es": "a₃ = b₃", "ja": "a₃ = b₃", "zh": "a₃ = b₃"}
    },
    options: [
      { tex: "-4", correct: true, why: {
        en: "$4+a_3-(8+b_3)=-4$ because $a_3=b_3$.",
        fr: "$4+a_3-(8+b_3)=-4$ car $a_3=b_3$.",
        es: "$4+a_3-(8+b_3)=-4$ porque $a_3=b_3$.",
        ja: "$a_3=b_3$ より $4+a_3-(8+b_3)=-4$。",
        zh: "因 $a_3=b_3$，$4+a_3-(8+b_3)=-4$。"
      } },
      { tex: "4-8", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "8", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-6", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "4", correct: false, why: {
        en: "This drops the $x^4$ of $g(x+2)$.",
        fr: "Cela oublie le $x^4$ de $g(x+2)$.",
        es: "Olvida el $x^4$ de $g(x+2)$.",
        ja: "$g(x+2)$ の $x^4$ を忘れている。",
        zh: "漏了 $g(x+2)$ 中 $x^4$ 的贡献。"
      } },
      { tex: "0", correct: false, why: {
        en: "The shifts differ, so the $x^4$ terms leave a cubic part.",
        fr: "Les décalages diffèrent : les $x^4$ laissent un terme cubique.",
        es: "Los desplazamientos difieren: los $x^4$ dejan un término cúbico.",
        ja: "平行移動が違うので $x^4$ から3次の項が残る。",
        zh: "平移量不同，$x^4$ 项留下三次项。"
      } },
      { tex: "a_3-b_3-4", correct: false, why: {
        en: "Right formula, but it can be simplified: $a_3=b_3$.",
        fr: "Bonne formule, mais $a_3=b_3$.",
        es: "Fórmula correcta, pero $a_3=b_3$.",
        ja: "式は正しいが $a_3=b_3$。",
        zh: "式子没错，但 $a_3=b_3$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "No real root",
          fr: "Pas de racine réelle",
          es: "Sin raíz real",
          ja: "実数解なし",
          zh: "无实根"
        },
        lines: ["f-g=(a_3-b_3)x^3+(a_2-b_2)x^2+7x+(a_1-b_1)"],
        note: {
          en: "A real cubic always has a real root, so $a_3=b_3$.",
          fr: "Un polynôme réel de degré $3$ a toujours une racine réelle : $a_3=b_3$.",
          es: "Un cúbico real siempre tiene raíz real: $a_3=b_3$.",
          ja: "実数係数の3次式は必ず実数解をもつので $a_3=b_3$。",
          zh: "实系数三次式必有实根，故 $a_3=b_3$。"
        }
      },
      {
        title: {
          en: "Coefficient of x³",
          fr: "Coefficient de x³",
          es: "Coeficiente de x³",
          ja: "x³ の係数",
          zh: "x³ 的系数"
        },
        lines: ["(x+1)^4\\to4x^3,\\quad(x+2)^4\\to8x^3:\\quad4+a_3-8-b_3=\\boxed{-4}"],
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
