/* complex · The only whole number on the curve
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2023-one-integer",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.11",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.11",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas P.11",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.11",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学第 11 题"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "The only whole number on the curve",
      fr: "Le seul entier sur la courbe",
      es: "El único entero de la curva",
      ja: "曲線上のただ一つの整数",
      zh: "曲线上唯一的整数"
    },
    statement: {
      en: "Let $A=\\left\\{\\dfrac{1967+1686\\,i\\sin\\theta}{7-3i\\cos\\theta}:\\theta\\in\\mathbb{R}\\right\\}$. $A$ contains exactly one positive integer $n$. <b>Which of the following equal $n$?</b>",
      fr: "Soit $A=\\left\\{\\dfrac{1967+1686\\,i\\sin\\theta}{7-3i\\cos\\theta}:\\theta\\in\\mathbb{R}\\right\\}$. $A$ contient exactement un entier strictement positif $n$. <b>Lesquelles des valeurs suivantes sont égales à $n$ ?</b>",
      es: "Sea $A=\\left\\{\\dfrac{1967+1686\\,i\\sin\\theta}{7-3i\\cos\\theta}:\\theta\\in\\mathbb{R}\\right\\}$. $A$ contiene exactamente un entero positivo $n$. <b>¿Cuáles de los siguientes valores son iguales a $n$?</b>",
      ja: "$A=\\left\\{\\dfrac{1967+1686\\,i\\sin\\theta}{7-3i\\cos\\theta}:\\theta\\in\\mathbb{R}\\right\\}$ とします。$A$ に含まれる正の整数はただ一つ $n$ です。<b>$n$ に等しいものはどれですか？</b>",
      zh: "设 $A=\\left\\{\\dfrac{1967+1686\\,i\\sin\\theta}{7-3i\\cos\\theta}:\\theta\\in\\mathbb{R}\\right\\}$。$A$ 中恰有一个正整数 $n$。<b>下列哪些等于 $n$？</b>"
    },
    figureText: {
      en: "The real axis of the complex plane. The set A is drawn in the solution.",
      fr: "L’axe réel du plan complexe. L’ensemble A est tracé dans la solution.",
      es: "El eje real del plano complejo. El conjunto A se dibuja en la solución.",
      ja: "複素平面の実軸。集合 A は解答で描きます。",
      zh: "复平面的实轴。集合 A 在解答中画出。"
    },
    hint: {
      en: "A number is a positive integer only if its imaginary part is $0$: multiply by the conjugate $7+3i\\cos\\theta$.",
      fr: "Un nombre n’est un entier positif que si sa partie imaginaire est nulle : multipliez par le conjugué $7+3i\\cos\\theta$.",
      es: "Un número solo es entero positivo si su parte imaginaria es $0$: multiplica por el conjugado $7+3i\\cos\\theta$.",
      ja: "正の整数なら虚部は $0$。共役 $7+3i\\cos\\theta$ を掛けましょう。",
      zh: "正整数的虚部必须为 $0$：乘以共轭 $7+3i\\cos\\theta$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.6, scale: 60, pad: 18 });
      const T = ([re, im]) => [(re - 185) / 33, im / 160 + 1.8];
      F.seg(T([185, 0]), T([335, 0]), 'axis'); F.text(T([335, 0]), 'Re', 'tick', -8, 12);
      F.reveal = () => {
      const pts = []; for (let k = 0; k <= 200; k++) { const t = 2 * Math.PI * k / 200, s = Math.sin(t), c = Math.cos(t), d = 49 + 9 * c * c;
        pts.push(T([(13769 - 5058 * s * c) / d, (5901 * c + 11802 * s) / d])); }
      F.path(pts, 'graph', 'base', false);
      F.dot(T([281, 0])); F.text(T([281, 0]), '281', 'len', 0, 26);
      F.text(T([207, 0]), '207', 'tick', -14, 12); F.text(T([311, 0]), '311', 'tick', 14, 12);
      };
      return F;
    },
    options: [
      { tex: "281", correct: true, why: {
        en: "With $\\cos\\theta=-2\\sin\\theta$ the real part is $\\tfrac{78961/5}{281/5}=281$.",
        fr: "Avec $\\cos\\theta=-2\\sin\\theta$ la partie réelle vaut $\\tfrac{78961/5}{281/5}=281$.",
        es: "Con $\\cos\\theta=-2\\sin\\theta$ la parte real es $\\tfrac{78961/5}{281/5}=281$.",
        ja: "$\\cos\\theta=-2\\sin\\theta$ のとき実部は $\\tfrac{78961/5}{281/5}=281$。",
        zh: "当 $\\cos\\theta=-2\\sin\\theta$ 时实部为 $\\tfrac{78961/5}{281/5}=281$。"
      } },
      { tex: "\\tfrac{1967}{7}", correct: true, why: {
        en: "$1967=7\\cdot281$.",
        fr: "$1967=7\\cdot281$.",
        es: "$1967=7\\cdot281$.",
        ja: "$1967=7\\cdot281$。",
        zh: "$1967=7\\cdot281$。"
      } },
      { tex: "1967", correct: false, why: {
        en: "That would need the denominator to be $1$.",
        fr: "Il faudrait que le dénominateur vaille $1$.",
        es: "Haría falta que el denominador fuera $1$.",
        ja: "分母が $1$ でなければならない。",
        zh: "需要分母为 $1$。"
      } },
      { tex: "562", correct: false, why: {
        en: "$2\\cdot281$: not on the curve, whose real parts stay below $312$.",
        fr: "$2\\cdot281$ : pas sur la courbe, dont les parties réelles restent sous $312$.",
        es: "$2\\cdot281$: no está en la curva, cuyas partes reales no pasan de $312$.",
        ja: "$2\\cdot281$：実部は $312$ 未満なので曲線上にない。",
        zh: "$2\\cdot281$：曲线实部都小于 $312$。"
      } },
      { tex: "843", correct: false, why: {
        en: "$3\\cdot281$: far outside the curve.",
        fr: "$3\\cdot281$ : bien en dehors de la courbe.",
        es: "$3\\cdot281$: muy fuera de la curva.",
        ja: "$3\\cdot281$：曲線から遠く外れる。",
        zh: "$3\\cdot281$：远离曲线。"
      } },
      { tex: "1686", correct: false, why: {
        en: "The coefficient of $i\\sin\\theta$, not a value of the set.",
        fr: "Le coefficient de $i\\sin\\theta$, pas une valeur de l’ensemble.",
        es: "El coeficiente de $i\\sin\\theta$, no un valor del conjunto.",
        ja: "$i\\sin\\theta$ の係数で、集合の値ではない。",
        zh: "那是 $i\\sin\\theta$ 的系数，不是集合中的值。"
      } },
      { tex: "241", correct: false, why: {
        en: "$241$ is a real part the curve reaches, but only where the imaginary part is not $0$.",
        fr: "La courbe atteint la partie réelle $241$, mais seulement là où la partie imaginaire n’est pas nulle.",
        es: "La curva alcanza parte real $241$, pero solo donde la parte imaginaria no es $0$.",
        ja: "実部 $241$ はとり得るが、そこでは虚部が $0$ でない。",
        zh: "曲线实部能取到 $241$，但那里虚部不为 $0$。"
      } },
      { tex: "2023", correct: false, why: {
        en: "Not related to this set.",
        fr: "Sans rapport avec cet ensemble.",
        es: "No tiene relación con este conjunto.",
        ja: "この集合とは無関係。",
        zh: "与该集合无关。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Real and imaginary parts",
          fr: "Parties réelle et imaginaire",
          es: "Partes real e imaginaria",
          ja: "実部と虚部",
          zh: "实部与虚部"
        },
        lines: ["z=\\dfrac{(1967+1686\\,i s)(7+3i c)}{49+9c^2},\\quad s=\\sin\\theta,\\; c=\\cos\\theta", "\\operatorname{Im} z=0 \\iff 5901\\,c+11802\\,s=0 \\iff c=-2s"],
        note: {
          en: "$5901=3\\cdot1967$ and $11802=7\\cdot1686=6\\cdot1967$, so the condition is $3c+6s=0$.",
          fr: "$5901=3\\cdot1967$ et $11802=7\\cdot1686=6\\cdot1967$, la condition est donc $3c+6s=0$.",
          es: "$5901=3\\cdot1967$ y $11802=7\\cdot1686=6\\cdot1967$, así que la condición es $3c+6s=0$.",
          ja: "$5901=3\\cdot1967$、$11802=7\\cdot1686=6\\cdot1967$ なので条件は $3c+6s=0$。",
          zh: "$5901=3\\cdot1967$，$11802=7\\cdot1686=6\\cdot1967$，条件即 $3c+6s=0$。"
        }
      },
      {
        title: {
          en: "The real value",
          fr: "La valeur réelle",
          es: "El valor real",
          ja: "実数の値",
          zh: "实数值"
        },
        lines: ["s^2=\\tfrac15,\\quad c^2=\\tfrac45,\\quad sc=-\\tfrac25", "z=\\dfrac{13769-5058\\,sc}{49+9c^2}=\\dfrac{13769+\\tfrac{10116}{5}}{49+\\tfrac{36}{5}}=\\dfrac{78961}{281}=\\boxed{281}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Both solutions of $\\tan\\theta=-\\tfrac12$ give the same value, so $281$ is the only real (and only integer) point.",
          fr: "Les deux solutions de $\\tan\\theta=-\\tfrac12$ donnent la même valeur : $281$ est le seul point réel (et le seul entier).",
          es: "Las dos soluciones de $\\tan\\theta=-\\tfrac12$ dan el mismo valor: $281$ es el único punto real (y el único entero).",
          ja: "$\\tan\\theta=-\\tfrac12$ の2つの解はどちらも同じ値。$281$ が唯一の実数（整数）点。",
          zh: "$\\tan\\theta=-\\tfrac12$ 的两个解给出同一个值，所以 $281$ 是唯一的实数点（也是唯一的整数）。"
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
