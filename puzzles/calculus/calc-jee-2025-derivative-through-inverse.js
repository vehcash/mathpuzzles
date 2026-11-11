/* calculus · Differentiating through an inverse function
   JEE Advanced 2025 (India), Paper 2, Mathematics Q.14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2025-derivative-through-inverse",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 2, Mathematics Q.14",
        fr: "JEE Advanced 2025 (Inde), épreuve 2, mathématiques Q.14",
        es: "JEE Advanced 2025 (India), prueba 2, matemáticas Q.14",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 2 数学 Q.14",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷二 数学 Q.14"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Differentiating through an inverse function",
      fr: "Dériver à travers une réciproque",
      es: "Derivar a través de una inversa",
      ja: "逆関数を通した微分",
      zh: "经过反函数求导"
    },
    statement: {
      en: "$f(x)=\\ln(x^2+2x+4)$ and $g:\\mathbb R\\to(0,4)$, $g(x)=\\dfrac{4}{1+e^{-2x}}$. <b>Which of the following equal $(f\\circ g^{-1})'(2)$?</b>",
      fr: "$f(x)=\\ln(x^2+2x+4)$ et $g:\\mathbb R\\to(0,4)$, $g(x)=\\dfrac{4}{1+e^{-2x}}$. <b>Lesquelles des valeurs suivantes sont égales à $(f\\circ g^{-1})'(2)$ ?</b>",
      es: "$f(x)=\\ln(x^2+2x+4)$ y $g:\\mathbb R\\to(0,4)$, $g(x)=\\dfrac{4}{1+e^{-2x}}$. <b>¿Cuáles de los siguientes valores son iguales a $(f\\circ g^{-1})'(2)$?</b>",
      ja: "$f(x)=\\ln(x^2+2x+4)$、$g:\\mathbb R\\to(0,4)$、$g(x)=\\dfrac{4}{1+e^{-2x}}$ とします。<b>$(f\\circ g^{-1})'(2)$ に等しいものはどれですか？</b>",
      zh: "$f(x)=\\ln(x^2+2x+4)$，$g:\\mathbb R\\to(0,4)$，$g(x)=\\dfrac{4}{1+e^{-2x}}$。<b>下列哪些等于 $(f\\circ g^{-1})'(2)$？</b>"
    },
    figureText: {
      en: "The S-shaped graph of g rising from 0 to 4, with the level y = 2 drawn.",
      fr: "La courbe en S de g montant de 0 à 4, avec le niveau y = 2.",
      es: "La gráfica en S de g que sube de 0 a 4, con el nivel y = 2.",
      ja: "0 から 4 へ上がる S 字形の g のグラフと水平線 y = 2。",
      zh: "从 0 升到 4 的 S 形曲线 g，并画出 y = 2。"
    },
    hint: {
      en: "Chain rule: $(f\\circ g^{-1})'(2)=\\dfrac{f'(g^{-1}(2))}{g'(g^{-1}(2))}$.",
      fr: "Règle de la chaîne : $(f\\circ g^{-1})'(2)=\\dfrac{f'(g^{-1}(2))}{g'(g^{-1}(2))}$.",
      es: "Regla de la cadena: $(f\\circ g^{-1})'(2)=\\dfrac{f'(g^{-1}(2))}{g'(g^{-1}(2))}$.",
      ja: "連鎖律：$(f\\circ g^{-1})'(2)=\\dfrac{f'(g^{-1}(2))}{g'(g^{-1}(2))}$。",
      zh: "链式法则：$(f\\circ g^{-1})'(2)=\\dfrac{f'(g^{-1}(2))}{g'(g^{-1}(2))}$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 4.6, scale: 50, pad: 16 });
      const T = F.T = axes(F, -3, 3, -0.3, 4.3);
      plot(F, T, x => 4 / (1 + Math.exp(-2 * x)), -2.9, 2.9, 'graph', 'base', -0.3, 4.3);
      F.seg(T([-2.9, 4]), T([2.9, 4]), 'seg thin dashc'); F.seg(T([-2.9, 2]), T([2.9, 2]), 'seg thin dashc');
      F.text(T([0, 4]), '4', 'tick', -12, -6); F.text(T([-2.9, 2]), 'y = 2', 'len small', 20, -8);
      F.reveal = () => {
      F.dot(T([0, 2])); F.seg(T([-0.8, 0.4]), T([0.8, 3.6]), 'hl pink'); F.text(T([0.8, 3.6]), 'slope 2', 'len small', 30, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "4": {"fr": "4", "es": "4", "ja": "4", "zh": "4"},
      "y = 2": {"fr": "y = 2", "es": "y = 2", "ja": "y = 2", "zh": "y = 2"},
      "slope 2": {"fr": "pente 2", "es": "pendiente 2", "ja": "傾き 2", "zh": "斜率 2"}
    },
    options: [
      { tex: "\\tfrac14", correct: true, why: {
        en: "$g^{-1}(2)=0$, $f'(0)=\\tfrac12$, $g'(0)=2$.",
        fr: "$g^{-1}(2)=0$, $f'(0)=\\tfrac12$, $g'(0)=2$.",
        es: "$g^{-1}(2)=0$, $f'(0)=\\tfrac12$, $g'(0)=2$.",
        ja: "$g^{-1}(2)=0$、$f'(0)=\\tfrac12$、$g'(0)=2$。",
        zh: "$g^{-1}(2)=0$，$f'(0)=\\tfrac12$，$g'(0)=2$。"
      } },
      { tex: "0.25", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "1", correct: false, why: {
        en: "That multiplies $f'(0)$ by $g'(0)$ instead of dividing.",
        fr: "Cela multiplie $f'(0)$ par $g'(0)$ au lieu de diviser.",
        es: "Multiplica $f'(0)$ por $g'(0)$ en lugar de dividir.",
        ja: "割るべきところを掛けている。",
        zh: "该除却乘了。"
      } },
      { tex: "\\tfrac12", correct: false, why: {
        en: "That is $f'(0)$ alone.",
        fr: "C’est $f'(0)$ seul.",
        es: "Es solo $f'(0)$.",
        ja: "$f'(0)$ だけ。",
        zh: "只是 $f'(0)$。"
      } },
      { tex: "\\tfrac{3}{11}", correct: false, why: {
        en: "That uses $f'(2)$: evaluate $f'$ at $g^{-1}(2)=0$, not at $2$.",
        fr: "Cela utilise $f'(2)$ : il faut $f'$ en $g^{-1}(2)=0$.",
        es: "Usa $f'(2)$: hay que evaluar $f'$ en $g^{-1}(2)=0$.",
        ja: "$f'(2)$ を使っている。$g^{-1}(2)=0$ で評価する。",
        zh: "用了 $f'(2)$，应在 $g^{-1}(2)=0$ 处求值。"
      } },
      { tex: "\\tfrac18", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\ln4", correct: false, why: {
        en: "That is $f(g^{-1}(2))$, a value, not a derivative.",
        fr: "C’est $f(g^{-1}(2))$, une valeur, pas une dérivée.",
        es: "Es $f(g^{-1}(2))$, un valor, no una derivada.",
        ja: "$f(g^{-1}(2))$ の値で微分ではない。",
        zh: "那是函数值 $f(g^{-1}(2))$，不是导数。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Where g equals 2",
          fr: "Où g vaut 2",
          es: "Dónde g vale 2",
          ja: "g = 2 となる点",
          zh: "g 等于 2 的点"
        },
        lines: ["\\frac4{1+e^{-2x}}=2\\iff e^{-2x}=1\\iff x=0"],
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
          en: "Two derivatives",
          fr: "Deux dérivées",
          es: "Dos derivadas",
          ja: "2つの導関数",
          zh: "两个导数"
        },
        lines: ["f'(x)=\\frac{2x+2}{x^2+2x+4}\\Rightarrow f'(0)=\\tfrac12,\\qquad g'(x)=\\frac{8e^{-2x}}{(1+e^{-2x})^2}\\Rightarrow g'(0)=2"],
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
          en: "Combine",
          fr: "Combiner",
          es: "Combinar",
          ja: "まとめる",
          zh: "合并"
        },
        lines: ["(f\\circ g^{-1})'(2)=\\frac{f'(0)}{g'(0)}=\\boxed{\\tfrac14}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam the answer was a number to type in; here it is turned into choices.",
          fr: "Dans l’épreuve la réponse était un nombre à saisir ; il est transformé ici en choix.",
          es: "En el examen la respuesta era un número que escribir; aquí se convierte en opciones.",
          ja: "原題は数値入力式。ここでは選択式にした。",
          zh: "原题为数值填空，此处改为选择题。"
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
