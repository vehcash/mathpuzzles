/* algebra · A quartic whose derivative has root i√3
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2024-quartic-root-moduli",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.9",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.9",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.9",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.9",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.9"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A quartic whose derivative has root i√3",
      fr: "Une quartique dont la dérivée a la racine i√3",
      es: "Una cuártica cuya derivada tiene raíz i√3",
      ja: "導関数が根 i√3 をもつ4次式",
      zh: "导数有根 i√3 的四次多项式"
    },
    statement: {
      en: "$f(x)=x^4+ax^3+bx^2+c$ has real coefficients, $f(1)=-9$, and $i\\sqrt3$ is a root of $4x^3+3ax^2+2bx=0$. If $\\alpha_1,\\dots,\\alpha_4$ are the roots of $f$, <b>which of the following equal $|\\alpha_1|^2+|\\alpha_2|^2+|\\alpha_3|^2+|\\alpha_4|^2$?</b>",
      fr: "$f(x)=x^4+ax^3+bx^2+c$ est à coefficients réels, $f(1)=-9$, et $i\\sqrt3$ est racine de $4x^3+3ax^2+2bx=0$. Si $\\alpha_1,\\dots,\\alpha_4$ sont les racines de $f$, <b>lesquelles des valeurs suivantes sont égales à $|\\alpha_1|^2+|\\alpha_2|^2+|\\alpha_3|^2+|\\alpha_4|^2$ ?</b>",
      es: "$f(x)=x^4+ax^3+bx^2+c$ tiene coeficientes reales, $f(1)=-9$, e $i\\sqrt3$ es raíz de $4x^3+3ax^2+2bx=0$. Si $\\alpha_1,\\dots,\\alpha_4$ son las raíces de $f$, <b>¿cuáles de los siguientes valores son iguales a $|\\alpha_1|^2+|\\alpha_2|^2+|\\alpha_3|^2+|\\alpha_4|^2$?</b>",
      ja: "実数係数の $f(x)=x^4+ax^3+bx^2+c$ で $f(1)=-9$、$i\\sqrt3$ は $4x^3+3ax^2+2bx=0$ の解です。$f$ の4つの解を $\\alpha_1,\\dots,\\alpha_4$ とするとき、<b>$|\\alpha_1|^2+|\\alpha_2|^2+|\\alpha_3|^2+|\\alpha_4|^2$ に等しいものはどれですか？</b>",
      zh: "实系数多项式 $f(x)=x^4+ax^3+bx^2+c$ 满足 $f(1)=-9$，且 $i\\sqrt3$ 是 $4x^3+3ax^2+2bx=0$ 的根。设 $\\alpha_1,\\dots,\\alpha_4$ 为 $f$ 的全部根，<b>下列哪些等于 $|\\alpha_1|^2+|\\alpha_2|^2+|\\alpha_3|^2+|\\alpha_4|^2$？</b>"
    },
    figureText: {
      en: "The complex plane with ±i√3 marked: the conjugate pair of roots of f′.",
      fr: "Le plan complexe avec ±i√3 : la paire conjuguée de racines de f′.",
      es: "El plano complejo con ±i√3: el par conjugado de raíces de f′.",
      ja: "複素平面上の ±i√3（f′ の共役な解）。",
      zh: "复平面上 ±i√3：f′ 的一对共轭根。"
    },
    hint: {
      en: "$f'(x)=x(4x^2+3ax+2b)$, and real coefficients force $-i\\sqrt3$ to be a root too.",
      fr: "$f'(x)=x(4x^2+3ax+2b)$, et les coefficients réels imposent aussi la racine $-i\\sqrt3$.",
      es: "$f'(x)=x(4x^2+3ax+2b)$, y los coeficientes reales obligan a que $-i\\sqrt3$ también sea raíz.",
      ja: "$f'(x)=x(4x^2+3ax+2b)$。実数係数なので $-i\\sqrt3$ も解。",
      zh: "$f'(x)=x(4x^2+3ax+2b)$，实系数使 $-i\\sqrt3$ 也是根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 6.4, scale: 38, pad: 16 });
      const T = F.T = argand(F, -3.0, 3.0, -3.2, 3.2);
      [1, -1].forEach(s => { F.dot(T([0, s * Math.sqrt(3)])); F.text(T([0, s * Math.sqrt(3)]), s > 0 ? 'i√3' : '−i√3', 'len small', 26, 0); });
      F.reveal = () => {
      [[Math.SQRT2, 0], [-Math.SQRT2, 0], [0, 2 * Math.SQRT2], [0, -2 * Math.SQRT2]].forEach(z => { F.dot(T(z));});
      F.text(T([0, 2 * Math.SQRT2]), '2√2 i', 'len small', 26, 0); F.text(T([Math.SQRT2, 0]), '√2', 'len small', 0, 14);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "has roots": {"fr": "a pour racines", "es": "tiene raíces", "ja": "の解は", "zh": "的根为"}
    },
    options: [
      { tex: "20", correct: true, why: {
        en: "$f=(x^2+8)(x^2-2)$: $8+8+2+2$.",
        fr: "$f=(x^2+8)(x^2-2)$ : $8+8+2+2$.",
        es: "$f=(x^2+8)(x^2-2)$: $8+8+2+2$.",
        ja: "$f=(x^2+8)(x^2-2)$ で $8+8+2+2$。",
        zh: "$f=(x^2+8)(x^2-2)$：$8+8+2+2$。"
      } },
      { tex: "4\\cdot5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-12", correct: false, why: {
        en: "That is $\\sum\\alpha_k^2$ without moduli: $-8-8+2+2$.",
        fr: "C’est $\\sum\\alpha_k^2$ sans module : $-8-8+2+2$.",
        es: "Es $\\sum\\alpha_k^2$ sin módulo: $-8-8+2+2$.",
        ja: "絶対値なしの $\\sum\\alpha_k^2=-8-8+2+2$。",
        zh: "那是不取模的 $\\sum\\alpha_k^2=-8-8+2+2$。"
      } },
      { tex: "12", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "16", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "10", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "6", correct: false, why: {
        en: "That is $b$.",
        fr: "C’est $b$.",
        es: "Es $b$.",
        ja: "$b$ の値。",
        zh: "那是 $b$。"
      } },
      { tex: "-16", correct: false, why: {
        en: "That is $c$.",
        fr: "C’est $c$.",
        es: "Es $c$.",
        ja: "$c$ の値。",
        zh: "那是 $c$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Derivative’s roots",
          fr: "Racines de la dérivée",
          es: "Raíces de la derivada",
          ja: "導関数の解",
          zh: "导数的根"
        },
        lines: ["4x^2+3ax+2b\\ \\text{has roots}\\ \\pm i\\sqrt3\\ \\Rightarrow\\ a=0,\\ \\tfrac{2b}{4}=3,\\ b=6"],
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
          en: "Find c",
          fr: "Trouver c",
          es: "Hallar c",
          ja: "c を求める",
          zh: "求 c"
        },
        lines: ["f(1)=1+6+c=-9\\ \\Rightarrow\\ c=-16,\\quad f=x^4+6x^2-16=(x^2+8)(x^2-2)"],
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
          en: "Moduli",
          fr: "Modules",
          es: "Módulos",
          ja: "絶対値",
          zh: "模"
        },
        lines: ["\\pm2\\sqrt2\\,i,\\ \\pm\\sqrt2:\\quad8+8+2+2=\\boxed{20}"],
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
