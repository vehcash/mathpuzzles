/* calculus · Area under the lower curve
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-jee-2022-area-under-minimum",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.8",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.8",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.8",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.8",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.8"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Area under the lower curve",
      fr: "Aire sous la courbe la plus basse",
      es: "Área bajo la curva más baja",
      ja: "低い方の曲線の下の面積",
      zh: "较低曲线下的面积"
    },
    statement: {
      en: "$f(x)=x^2+\\tfrac{5}{12}$ and $g(x)=2\\left(1-\\tfrac{4|x|}{3}\\right)$ for $|x|\\le\\tfrac34$, $g(x)=0$ otherwise. Let $\\alpha$ be the area of $\\{(x,y):|x|\\le\\tfrac34,\\ 0\\le y\\le\\min(f(x),g(x))\\}$. <b>Which of the following equal $9\\alpha$?</b>",
      fr: "$f(x)=x^2+\\tfrac{5}{12}$ et $g(x)=2\\left(1-\\tfrac{4|x|}{3}\\right)$ pour $|x|\\le\\tfrac34$, $g(x)=0$ sinon. Soit $\\alpha$ l’aire de $\\{(x,y):|x|\\le\\tfrac34,\\ 0\\le y\\le\\min(f(x),g(x))\\}$. <b>Lesquelles des valeurs suivantes sont égales à $9\\alpha$ ?</b>",
      es: "$f(x)=x^2+\\tfrac{5}{12}$ y $g(x)=2\\left(1-\\tfrac{4|x|}{3}\\right)$ para $|x|\\le\\tfrac34$, $g(x)=0$ en otro caso. Sea $\\alpha$ el área de $\\{(x,y):|x|\\le\\tfrac34,\\ 0\\le y\\le\\min(f(x),g(x))\\}$. <b>¿Cuáles de los siguientes valores son iguales a $9\\alpha$?</b>",
      ja: "$f(x)=x^2+\\tfrac{5}{12}$、$|x|\\le\\tfrac34$ で $g(x)=2\\left(1-\\tfrac{4|x|}{3}\\right)$、それ以外で $g(x)=0$ とします。$\\{(x,y):|x|\\le\\tfrac34,\\ 0\\le y\\le\\min(f(x),g(x))\\}$ の面積を $\\alpha$ とすると、<b>$9\\alpha$ に等しいものはどれですか？</b>",
      zh: "$f(x)=x^2+\\tfrac{5}{12}$；当 $|x|\\le\\tfrac34$ 时 $g(x)=2\\left(1-\\tfrac{4|x|}{3}\\right)$，否则 $g(x)=0$。设 $\\alpha$ 为 $\\{(x,y):|x|\\le\\tfrac34,\\ 0\\le y\\le\\min(f(x),g(x))\\}$ 的面积。<b>下列哪些等于 $9\\alpha$？</b>"
    },
    figureText: {
      en: "The parabola f and the tent g on |x| ≤ 3/4. They cross at x = ±1/2; the region under the lower of the two is shaded.",
      fr: "La parabole f et la « tente » g sur |x| ≤ 3/4. Elles se coupent en x = ±1/2 ; la région sous la plus basse des deux est grisée.",
      es: "La parábola f y la «tienda» g en |x| ≤ 3/4. Se cortan en x = ±1/2; la región bajo la más baja está sombreada.",
      ja: "|x| ≤ 3/4 上の放物線 f とテント形の g。x = ±1/2 で交わり、低い方の下の部分に色付け。",
      zh: "|x| ≤ 3/4 上的抛物线 f 与帐篷形 g。它们在 x = ±1/2 处相交，较低者下方区域涂色。"
    },
    hint: {
      en: "Find where $f=g$ for $x\\ge0$. Use symmetry and split the area at that point.",
      fr: "Trouvez où $f=g$ pour $x\\ge0$. Utilisez la symétrie et coupez l’aire en ce point.",
      es: "Halla dónde $f=g$ para $x\\ge0$. Usa la simetría y parte el área en ese punto.",
      ja: "$x\\ge0$ で $f=g$ となる点を求め、対称性を使ってそこで面積を分けます。",
      zh: "求 $x\\ge0$ 时 $f=g$ 的点，利用对称性在该点处分割面积。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.2, scale: 80, pad: 18 });
      const T = F.T = axes(F, -1.1, 1.1, -0.2, 2.3);
      const f = x => x * x + 5 / 12, g = x => Math.abs(x) <= 0.75 ? 2 * (1 - 4 * Math.abs(x) / 3) : 0;
      const q = [T([-0.75, 0])]; for (let k = 0; k <= 60; k++) { const x = -0.75 + 1.5 * k / 60; q.push(T([x, Math.min(f(x), g(x))])); } q.push(T([0.75, 0]));
      F.path(q, 'fill-yellow', 'fills');
      plot(F, T, f, -1.0, 1.0, 'graph');
      F.path([T([-0.75, 0]), T([0, 2]), T([0.75, 0])], 'seg', 'base', false);
      F.dot(T([0.5, 2 / 3])); F.dot(T([-0.5, 2 / 3]));
      F.text(T([0.5, 0]), '½', 'tick', 0, 14); F.text(T([0.75, 0]), '¾', 'tick', 6, 14); F.text(T([0, 2]), '2', 'tick', -12, 0);
      return F;
    },
    options: [
      { tex: "6", correct: true, why: {
        en: "$\\alpha=2\\left(\\tfrac14+\\tfrac1{12}\\right)=\\tfrac23$.",
        fr: "$\\alpha=2\\left(\\tfrac14+\\tfrac1{12}\\right)=\\tfrac23$.",
        es: "$\\alpha=2\\left(\\tfrac14+\\tfrac1{12}\\right)=\\tfrac23$.",
        ja: "$\\alpha=2\\left(\\tfrac14+\\tfrac1{12}\\right)=\\tfrac23$.",
        zh: "$\\alpha=2\\left(\\tfrac14+\\tfrac1{12}\\right)=\\tfrac23$."
      } },
      { tex: "9\\cdot\\tfrac23", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "9", correct: false, why: {
        en: "Too large: the area under the minimum is smaller.",
        fr: "Trop grand : l’aire sous le minimum est inférieure.",
        es: "Demasiado grande: el área bajo el mínimo es menor.",
        ja: "大きすぎ。最小の方の下の面積はもっと小さい。",
        zh: "太大：较低曲线下的面积更小。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "That is $\\alpha$; the question asks for $9\\alpha$.",
        fr: "C’est $\\alpha$ ; on demande $9\\alpha$.",
        es: "Es $\\alpha$; se pide $9\\alpha$.",
        ja: "それは $\\alpha$。問われているのは $9\\alpha$。",
        zh: "那是 $\\alpha$，题目问 $9\\alpha$。"
      } },
      { tex: "\\tfrac{27}{2}", correct: false, why: {
        en: "$9\\times\\tfrac32$: the area of the whole tent $g$.",
        fr: "$9\\times\\tfrac32$ : l’aire de toute la tente $g$.",
        es: "$9\\times\\tfrac32$: el área de toda la tienda $g$.",
        ja: "$9\\times\\tfrac32$：テント $g$ 全体の面積。",
        zh: "$9\\times\\tfrac32$：整个帐篷 $g$ 的面积。"
      } },
      { tex: "3", correct: false, why: {
        en: "Counts only one side of the $y$-axis.",
        fr: "Ne compte qu’un côté de l’axe des $y$.",
        es: "Solo cuenta un lado del eje $y$.",
        ja: "$y$ 軸の片側だけ。",
        zh: "只算了 $y$ 轴的一侧。"
      } },
      { tex: "\\tfrac92", correct: false, why: {
        en: "$9\\times2\\cdot\\tfrac14$: forgets the triangle pieces near $x=\\pm\\tfrac34$.",
        fr: "$9\\times2\\cdot\\tfrac14$ : oublie les triangles près de $x=\\pm\\tfrac34$.",
        es: "$9\\times2\\cdot\\tfrac14$: olvida los triángulos cerca de $x=\\pm\\tfrac34$.",
        ja: "$9\\times2\\cdot\\tfrac14$：$x=\\pm\\tfrac34$ 付近の三角形を忘れた。",
        zh: "$9\\times2\\cdot\\tfrac14$：漏了 $x=\\pm\\tfrac34$ 附近的三角形。"
      } },
      { tex: "8", correct: false, why: {
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
          en: "Where they cross",
          fr: "Où elles se coupent",
          es: "Dónde se cortan",
          ja: "交点",
          zh: "交点"
        },
        lines: ["x^2+\\tfrac5{12}=2-\\tfrac{8x}{3}\\iff12x^2+32x-19=0\\iff x=\\tfrac12\\quad(x\\ge0)"],
        note: {
          en: "$(2x-1)(6x+19)=0$. At $x=\\tfrac12$ both equal $\\tfrac23$.",
          fr: "$(2x-1)(6x+19)=0$. En $x=\\tfrac12$ les deux valent $\\tfrac23$.",
          es: "$(2x-1)(6x+19)=0$. En $x=\\tfrac12$ ambas valen $\\tfrac23$.",
          ja: "$(2x-1)(6x+19)=0$。$x=\\tfrac12$ でどちらも $\\tfrac23$。",
          zh: "$(2x-1)(6x+19)=0$。在 $x=\\tfrac12$ 处两者都为 $\\tfrac23$。"
        }
      },
      {
        title: {
          en: "Half the area",
          fr: "La moitié de l’aire",
          es: "La mitad del área",
          ja: "半分の面積",
          zh: "一半面积"
        },
        lines: ["\\int_0^{1/2}\\left(x^2+\\tfrac5{12}\\right)dx+\\tfrac12\\cdot\\tfrac14\\cdot\\tfrac23=\\tfrac14+\\tfrac1{12}=\\tfrac13"],
        note: {
          en: "From $\\tfrac12$ to $\\tfrac34$ the lower curve is the straight side of the tent: a triangle.",
          fr: "De $\\tfrac12$ à $\\tfrac34$ la plus basse est le côté droit de la tente : un triangle.",
          es: "De $\\tfrac12$ a $\\tfrac34$ la más baja es el lado recto de la tienda: un triángulo.",
          ja: "$\\tfrac12$ から $\\tfrac34$ では低い方はテントの直線部分で三角形。",
          zh: "从 $\\tfrac12$ 到 $\\tfrac34$，较低的是帐篷的直边：一个三角形。"
        }
      },
      {
        title: {
          en: "Double it",
          fr: "Doubler",
          es: "Duplicar",
          ja: "2倍する",
          zh: "乘以 2"
        },
        lines: ["\\alpha=\\tfrac23,\\qquad9\\alpha=\\boxed{6}"],
        note: {
          en: "Both $f$ and $g$ are even, so the left half is the same.",
          fr: "$f$ et $g$ sont paires : la moitié gauche est identique.",
          es: "$f$ y $g$ son pares: la mitad izquierda es igual.",
          ja: "$f$, $g$ は偶関数なので左半分も同じ。",
          zh: "$f$、$g$ 都是偶函数，左半部分相同。"
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
