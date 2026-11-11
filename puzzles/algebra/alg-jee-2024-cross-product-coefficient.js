/* algebra · The coefficient of p × q
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-jee-2024-cross-product-coefficient",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.11",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.11",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.11",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.11",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.11"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "The coefficient of p × q",
      fr: "Le coefficient de p × q",
      es: "El coeficiente de p × q",
      ja: "p × q の係数",
      zh: "p × q 的系数"
    },
    statement: {
      en: "$\\vec p=2\\hat i+\\hat j+3\\hat k$, $\\vec q=\\hat i-\\hat j+\\hat k$, and $15\\hat i+10\\hat j+6\\hat k=\\alpha(2\\vec p+\\vec q)+\\beta(\\vec p-2\\vec q)+\\gamma(\\vec p\\times\\vec q)$. <b>Which of the following equal $\\gamma$?</b>",
      fr: "$\\vec p=2\\hat i+\\hat j+3\\hat k$, $\\vec q=\\hat i-\\hat j+\\hat k$, et $15\\hat i+10\\hat j+6\\hat k=\\alpha(2\\vec p+\\vec q)+\\beta(\\vec p-2\\vec q)+\\gamma(\\vec p\\times\\vec q)$. <b>Lesquelles des valeurs suivantes sont égales à $\\gamma$ ?</b>",
      es: "$\\vec p=2\\hat i+\\hat j+3\\hat k$, $\\vec q=\\hat i-\\hat j+\\hat k$, y $15\\hat i+10\\hat j+6\\hat k=\\alpha(2\\vec p+\\vec q)+\\beta(\\vec p-2\\vec q)+\\gamma(\\vec p\\times\\vec q)$. <b>¿Cuáles de los siguientes valores son iguales a $\\gamma$?</b>",
      ja: "$\\vec p=2\\hat i+\\hat j+3\\hat k$、$\\vec q=\\hat i-\\hat j+\\hat k$ で $15\\hat i+10\\hat j+6\\hat k=\\alpha(2\\vec p+\\vec q)+\\beta(\\vec p-2\\vec q)+\\gamma(\\vec p\\times\\vec q)$ です。<b>$\\gamma$ に等しいものはどれですか？</b>",
      zh: "$\\vec p=2\\hat i+\\hat j+3\\hat k$，$\\vec q=\\hat i-\\hat j+\\hat k$，且 $15\\hat i+10\\hat j+6\\hat k=\\alpha(2\\vec p+\\vec q)+\\beta(\\vec p-2\\vec q)+\\gamma(\\vec p\\times\\vec q)$。<b>下列哪些等于 $\\gamma$？</b>"
    },
    figureText: {
      en: "The plane spanned by p and q, with p × q sticking out perpendicular to it.",
      fr: "Le plan engendré par p et q, avec p × q perpendiculaire à ce plan.",
      es: "El plano generado por p y q, con p × q perpendicular a él.",
      ja: "p, q が張る平面と、それに垂直な p × q。",
      zh: "p、q 张成的平面与垂直于它的 p × q。"
    },
    hint: {
      en: "Dot both sides with $\\vec p\\times\\vec q$: the first two terms vanish.",
      fr: "Faites le produit scalaire des deux membres avec $\\vec p\\times\\vec q$ : les deux premiers termes s’annulent.",
      es: "Multiplica escalarmente ambos lados por $\\vec p\\times\\vec q$: los dos primeros términos se anulan.",
      ja: "両辺と $\\vec p\\times\\vec q$ の内積をとると最初の2項は消える。",
      zh: "两边与 $\\vec p\\times\\vec q$ 作数量积，前两项为零。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.2, scale: 56, pad: 16 });
      F.path([[0.3, 0.4], [3.4, 0.4], [4.3, 1.4], [1.2, 1.4]], 'fill-blue', 'fills', true);
      arrow(F, [1.6, 0.8], [3.2, 0.7]); F.text([3.2, 0.7], 'p', 'pt', 10, 4); arrow(F, [1.6, 0.8], [2.4, 1.3]); F.text([2.4, 1.3], 'q', 'pt', 6, -16);
      arrow(F, [1.6, 0.8], [1.6, 2.9], 'vec two'); F.text([1.6, 2.9], 'p × q', 'len small', 26, 6);
      F.reveal = () => {
      F.text([2.7, 2.4], '(4, 1, −3)', 'len small', 10, 0);
      };
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$(15,10,6)\\cdot(4,1,-3)=52=26\\gamma$.",
        fr: "$(15,10,6)\\cdot(4,1,-3)=52=26\\gamma$.",
        es: "$(15,10,6)\\cdot(4,1,-3)=52=26\\gamma$.",
        ja: "$(15,10,6)\\cdot(4,1,-3)=52=26\\gamma$。",
        zh: "$(15,10,6)\\cdot(4,1,-3)=52=26\\gamma$。"
      } },
      { tex: "\\tfrac{52}{26}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "52", correct: false, why: {
        en: "Divide by $|\\vec p\\times\\vec q|^2=26$.",
        fr: "Il faut diviser par $|\\vec p\\times\\vec q|^2=26$.",
        es: "Hay que dividir entre $|\\vec p\\times\\vec q|^2=26$.",
        ja: "$|\\vec p\\times\\vec q|^2=26$ で割る。",
        zh: "还要除以 $|\\vec p\\times\\vec q|^2=26$。"
      } },
      { tex: "\\tfrac{52}{\\sqrt{26}}", correct: false, why: {
        en: "Divide by the square of the length, not the length.",
        fr: "Divisez par le carré de la norme, pas par la norme.",
        es: "Divide entre el cuadrado de la norma, no la norma.",
        ja: "長さでなく長さの2乗で割る。",
        zh: "应除以模的平方，而非模。"
      } },
      { tex: "-2", correct: false, why: {
        en: "Sign slip in the cross product.",
        fr: "Erreur de signe dans le produit vectoriel.",
        es: "Error de signo en el producto vectorial.",
        ja: "外積の符号ミス。",
        zh: "叉积符号错。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "0", correct: false, why: {
        en: "$15\\hat i+10\\hat j+6\\hat k$ is not in the plane of $\\vec p,\\vec q$.",
        fr: "$15\\hat i+10\\hat j+6\\hat k$ n’est pas dans le plan de $\\vec p,\\vec q$.",
        es: "$15\\hat i+10\\hat j+6\\hat k$ no está en el plano de $\\vec p,\\vec q$.",
        ja: "$15\\hat i+10\\hat j+6\\hat k$ は $\\vec p,\\vec q$ の平面上にない。",
        zh: "$15\\hat i+10\\hat j+6\\hat k$ 不在 $\\vec p,\\vec q$ 所在平面内。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cross product",
          fr: "Produit vectoriel",
          es: "Producto vectorial",
          ja: "外積",
          zh: "叉积"
        },
        lines: ["\\vec p\\times\\vec q=(1\\cdot1-3\\cdot(-1),\\ 3\\cdot1-2\\cdot1,\\ 2\\cdot(-1)-1\\cdot1)=(4,1,-3)"],
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
          en: "Project",
          fr: "Projeter",
          es: "Proyectar",
          ja: "射影",
          zh: "投影"
        },
        lines: ["(15,10,6)\\cdot(4,1,-3)=60+10-18=52=\\gamma\\cdot26\\ \\Rightarrow\\ \\gamma=\\boxed{2}"],
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
