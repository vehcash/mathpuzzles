/* geometry · A circle in the right angle
   JEE Advanced 2022 (India), Paper 1, Mathematics Q.8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2022-circle-in-corner",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 1, Mathematics Q.8",
        fr: "JEE Advanced 2022 (Inde), épreuve 1, mathématiques Q.8",
        es: "JEE Advanced 2022 (India), prueba 1, matemáticas Q.8",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 1 数学 Q.8",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷一 数学 Q.8"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A circle in the right angle",
      fr: "Un cercle dans l’angle droit",
      es: "Un círculo en el ángulo recto",
      ja: "直角に入る円",
      zh: "直角里的圆"
    },
    statement: {
      en: "In triangle $ABC$, $AB=1$, $AC=3$ and $\\angle BAC=90^\\circ$. A circle of radius $r>0$ touches the sides $AB$ and $AC$ and also touches the circumcircle of $ABC$ internally. <b>Which of the following equal $r$?</b>",
      fr: "Dans le triangle $ABC$, $AB=1$, $AC=3$ et $\\angle BAC=90^\\circ$. Un cercle de rayon $r>0$ est tangent aux côtés $AB$ et $AC$ et tangent intérieurement au cercle circonscrit à $ABC$. <b>Lesquelles des valeurs suivantes sont égales à $r$ ?</b>",
      es: "En el triángulo $ABC$, $AB=1$, $AC=3$ y $\\angle BAC=90^\\circ$. Una circunferencia de radio $r>0$ es tangente a los lados $AB$ y $AC$ y tangente interiormente a la circunferencia circunscrita de $ABC$. <b>¿Cuáles de los siguientes valores son iguales a $r$?</b>",
      ja: "三角形 $ABC$ で $AB=1$、$AC=3$、$\\angle BAC=90^\\circ$。半径 $r>0$ の円が辺 $AB$, $AC$ に接し、さらに $ABC$ の外接円に内接します。<b>$r$ に等しいものはどれですか？</b>",
      zh: "在 $\\triangle ABC$ 中，$AB=1$，$AC=3$，$\\angle BAC=90^\\circ$。半径为 $r>0$ 的圆与边 $AB$、$AC$ 相切，并与 $\\triangle ABC$ 的外接圆内切。<b>下列哪些等于 $r$？</b>"
    },
    figureText: {
      en: "The right triangle with A at the corner, its circumcircle (centre at the midpoint of BC), and a small circle tucked into the corner at A touching both legs and the big circle.",
      fr: "Le triangle rectangle de sommet A, son cercle circonscrit (centré au milieu de BC), et un petit cercle logé dans l’angle en A, tangent aux deux côtés et au grand cercle.",
      es: "El triángulo rectángulo con vértice A, su circunferencia circunscrita (centro en el punto medio de BC) y una circunferencia pequeña en la esquina A tangente a los dos catetos y a la grande.",
      ja: "A を直角とする三角形、その外接円（中心は BC の中点）、A の角に入って2辺と大円に接する小円。",
      zh: "以 A 为直角顶点的三角形、它的外接圆（圆心为 BC 中点），以及挤在 A 角、与两直角边和大圆都相切的小圆。"
    },
    hint: {
      en: "Put $A$ at the origin. The small circle has centre $(r,r)$; the circumcentre is the midpoint of $BC$. Internal tangency: distance of centres $=R-r$.",
      fr: "Placez $A$ à l’origine. Le petit cercle a pour centre $(r,r)$ ; le centre circonscrit est le milieu de $BC$. Tangence intérieure : distance des centres $=R-r$.",
      es: "Pon $A$ en el origen. La pequeña tiene centro $(r,r)$; el circuncentro es el punto medio de $BC$. Tangencia interior: distancia de centros $=R-r$.",
      ja: "$A$ を原点に。小円の中心は $(r,r)$、外心は $BC$ の中点。内接：中心間距離 $=R-r$。",
      zh: "把 $A$ 放在原点。小圆圆心 $(r,r)$；外心为 $BC$ 中点。内切：圆心距 $=R-r$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.4, scale: 62, pad: 16 });
      const S = p => [1.2 + p[0], 0.65 + p[1]];
      const A = S([0, 0]), B = S([1, 0]), C = S([0, 3]), O = S([0.5, 1.5]), R = Math.sqrt(10) / 2, r = 4 - Math.sqrt(10);
      F.circle(O, R, 'conic'); F.path([A, B, C], 'tri');
      F.circle(S([r, r]), r, 'fill-yellow'); F.dot(S([r, r]));
      F.dot(O); F.text(O, 'O', 'pt', 12, 0);
      F.text(A, 'A', 'pt', -12, 10); F.text(B, 'B', 'pt', 10, 12); F.text(C, 'C', 'pt', -12, -6);
      F.text(mid(A, B), '1', 'len small', 0, 14); F.text(mid(A, C), '3', 'len small', -12, 0);
      return F;
    },
    options: [
      { tex: "4-\\sqrt{10}", correct: true, why: {
        en: "$r^2+(\\sqrt{10}-4)r=0$, $r\\approx0.84$.",
        fr: "$r^2+(\\sqrt{10}-4)r=0$, $r\\approx0.84$.",
        es: "$r^2+(\\sqrt{10}-4)r=0$, $r\\approx0.84$.",
        ja: "$r^2+(\\sqrt{10}-4)r=0$, $r\\approx0.84$.",
        zh: "$r^2+(\\sqrt{10}-4)r=0$, $r\\approx0.84$."
      } },
      { tex: "\\dfrac{6}{4+\\sqrt{10}}", correct: true, why: {
        en: "Rationalise: $\\tfrac{6(4-\\sqrt{10})}{16-10}=4-\\sqrt{10}$.",
        fr: "En rationalisant : $\\tfrac{6(4-\\sqrt{10})}{16-10}=4-\\sqrt{10}$.",
        es: "Racionalizando: $\\tfrac{6(4-\\sqrt{10})}{16-10}=4-\\sqrt{10}$.",
        ja: "有理化：$\\tfrac{6(4-\\sqrt{10})}{16-10}=4-\\sqrt{10}$。",
        zh: "分母有理化：$\\tfrac{6(4-\\sqrt{10})}{16-10}=4-\\sqrt{10}$。"
      } },
      { tex: "\\tfrac{4-\\sqrt{10}}{2}", correct: false, why: {
        en: "That is the inradius, which touches $BC$, not the circumcircle.",
        fr: "C’est le rayon inscrit, tangent à $BC$, pas au cercle circonscrit.",
        es: "Es el inradio, tangente a $BC$, no a la circunscrita.",
        ja: "それは内接円の半径（$BC$ に接する）。",
        zh: "那是内切圆半径（与 $BC$ 相切）。"
      } },
      { tex: "\\tfrac{\\sqrt{10}}{2}", correct: false, why: {
        en: "That is the circumradius $R$.",
        fr: "C’est le rayon circonscrit $R$.",
        es: "Es el circunradio $R$.",
        ja: "外接円の半径 $R$。",
        zh: "那是外接圆半径 $R$。"
      } },
      { tex: "4+\\sqrt{10}", correct: false, why: {
        en: "The other root has the wrong sign choice; too big to fit.",
        fr: "L’autre choix de signe : trop grand.",
        es: "La otra elección de signo: demasiado grande.",
        ja: "符号の選び方が逆で大きすぎ。",
        zh: "符号取反，太大放不下。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "A guess; it does not satisfy the tangency equation.",
        fr: "Une supposition ; elle ne vérifie pas l’équation.",
        es: "Una suposición; no cumple la ecuación.",
        ja: "推測で、接する条件を満たさない。",
        zh: "猜测值，不满足相切方程。"
      } },
      { tex: "1", correct: false, why: {
        en: "Then the circle would touch $B$’s side at $B$ and stick out of the circumcircle.",
        fr: "Le cercle sortirait du cercle circonscrit.",
        es: "La circunferencia saldría de la circunscrita.",
        ja: "外接円からはみ出す。",
        zh: "会超出外接圆。"
      } },
      { tex: "\\sqrt{10}-3", correct: false, why: {
        en: "$\\approx0.16$: too small.",
        fr: "$\\approx0{,}16$ : trop petit.",
        es: "$\\approx0{,}16$: demasiado pequeño.",
        ja: "$\\approx0.16$：小さすぎ。",
        zh: "$\\approx0.16$：太小。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Coordinates",
          fr: "Coordonnées",
          es: "Coordenadas",
          ja: "座標",
          zh: "坐标"
        },
        lines: ["A=(0,0),\\ B=(1,0),\\ C=(0,3),\\quad O=\\left(\\tfrac12,\\tfrac32\\right),\\ R=\\tfrac{\\sqrt{10}}{2}"],
        note: {
          en: "In a right triangle the circumcentre is the midpoint of the hypotenuse.",
          fr: "Dans un triangle rectangle, le centre circonscrit est le milieu de l’hypoténuse.",
          es: "En un triángulo rectángulo el circuncentro es el punto medio de la hipotenusa.",
          ja: "直角三角形の外心は斜辺の中点。",
          zh: "直角三角形的外心是斜边中点。"
        }
      },
      {
        title: {
          en: "Internal tangency",
          fr: "Tangence intérieure",
          es: "Tangencia interior",
          ja: "内接条件",
          zh: "内切条件"
        },
        lines: ["\\left(r-\\tfrac12\\right)^2+\\left(r-\\tfrac32\\right)^2=\\left(\\tfrac{\\sqrt{10}}{2}-r\\right)^2"],
        note: {
          en: "Small centre $(r,r)$; distance between centres is $R-r$.",
          fr: "Petit centre $(r,r)$ ; la distance des centres vaut $R-r$.",
          es: "Centro pequeño $(r,r)$; distancia de centros $R-r$.",
          ja: "小円の中心 $(r,r)$、中心間距離は $R-r$。",
          zh: "小圆圆心 $(r,r)$，圆心距为 $R-r$。"
        }
      },
      {
        title: {
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["2r^2-4r+\\tfrac52=r^2-\\sqrt{10}\\,r+\\tfrac52\\iff r\\left(r-4+\\sqrt{10}\\right)=0\\;\\Rightarrow\\;r=\\boxed{4-\\sqrt{10}}"],
        note: {
          en: "About $0.84$, as in the original answer key.",
          fr: "Environ $0{,}84$, comme dans le corrigé officiel.",
          es: "Unos $0{,}84$, como en la solución oficial.",
          ja: "約 $0.84$（公式解答と一致）。",
          zh: "约 $0.84$，与官方答案一致。"
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
