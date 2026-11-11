/* geometry · A ball inside a cone
   The sphere inscribed in a cone shows up as the incircle of its axial cross-section. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const L0 = [0, 0], R0 = [6, 0], V = [3, 4], I = [3, 1.5];

  PuzzleBank.define({
    id: "geo-cone-inscribed-sphere",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A ball inside a cone",
      fr: "Une boule dans un cône",
      es: "Una bola dentro de un cono",
      ja: "円錐の中の球",
      zh: "圆锥里的球"
    },
    statement: {
      en: "A right circular cone has base radius $3$ and height $4$. A sphere touches its base and its lateral surface. <b>Which of the following equal the radius $r$ of the sphere?</b>",
      fr: "Un cône de révolution a un rayon de base $3$ et une hauteur $4$. Une sphère est tangente à sa base et à sa surface latérale. <b>Lesquelles des valeurs suivantes sont égales au rayon $r$ de la sphère ?</b>",
      es: "Un cono circular recto tiene radio de la base $3$ y altura $4$. Una esfera toca su base y su superficie lateral. <b>¿Cuáles de los siguientes son iguales al radio $r$ de la esfera?</b>",
      ja: "底面の半径 $3$、高さ $4$ の直円錐があります。球が底面と側面に接しています。<b>次のうち球の半径 $r$ に等しいものはどれですか？</b>",
      zh: "一个直圆锥底面半径为 $3$，高为 $4$。一个球与它的底面和侧面都相切。<b>下列哪些等于球的半径 $r$？</b>"
    },
    figureText: {
      en: "The cross-section through the axis: an isosceles triangle with base 6, height 4 and slant sides 5, with the circle of the sphere inscribed in it.",
      fr: "La section par l’axe : un triangle isocèle de base 6, de hauteur 4 et de côtés obliques 5, avec le cercle de la sphère inscrit.",
      es: "La sección por el eje: un triángulo isósceles de base 6, altura 4 y lados oblicuos 5, con la circunferencia de la esfera inscrita.",
      ja: "軸を通る断面：底辺 6、高さ 4、斜辺 5 の二等辺三角形と、それに内接する球の断面の円。",
      zh: "过轴的截面：底边 6、高 4、腰长 5 的等腰三角形，以及内切于其中的球的截面圆。"
    },
    hint: {
      en: "Cut through the axis: the sphere becomes the incircle of a $5$-$5$-$6$ triangle, and $r = \\dfrac{\\text{area}}{\\text{semiperimeter}}$.",
      fr: "Coupez par l’axe : la sphère devient le cercle inscrit d’un triangle $5$-$5$-$6$, et $r = \\dfrac{\\text{aire}}{\\text{demi-périmètre}}$.",
      es: "Corta por el eje: la esfera se convierte en la circunferencia inscrita de un triángulo $5$-$5$-$6$, y $r = \\dfrac{\\text{área}}{\\text{semiperímetro}}$.",
      ja: "軸で切ると、球は $5$-$5$-$6$ の三角形の内接円になり、$r = \\dfrac{\\text{面積}}{\\text{半周長}}$ です。",
      zh: "沿轴切开：球变成 $5$-$5$-$6$ 三角形的内切圆，且 $r = \\dfrac{\\text{面积}}{\\text{半周长}}$。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example similar right triangles between the apex, the centre of the sphere and the point of contact), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple des triangles rectangles semblables entre le sommet, le centre de la sphère et le point de contact), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo triángulos rectángulos semejantes entre el vértice, el centro de la esfera y el punto de contacto), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば頂点・球の中心・接点がつくる相似な直角三角形を使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如利用顶点、球心和切点构成的相似直角三角形），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6, h: 4, scale: 48, pad: 26 });
      F.path([L0, R0, V], 'tri');
      F.circle(I, 1.5, 'incircle');
      F.seg(V, [3, 0], 'seg thin'); F.dot(I, 'center');
      F.text([1.5, 2], '5', 'len', -14, -4); F.text([3, 0], '6', 'len', 0, 16); F.text([3, 2.8], '4', 'len', 10, 0);
      F.seg(I, [3, 0], 'radius'); F.text([3, 0.75], 'r', 'len it', -10, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "slant": { fr: "génératrice", es: "generatriz", ja: "母線", zh: "母线" },
      "triangle": { fr: "triangle", es: "triángulo", ja: "三角形", zh: "三角形" },
      "area": { fr: "aire", es: "área", ja: "面積", zh: "面积" },
      "semiperimeter": { fr: "demi-périmètre", es: "semiperímetro", ja: "半周長", zh: "半周长" }
    },
    options: [
      { tex: "r = \\tfrac32", correct: true, why: {
        en: "$\\dfrac{12}{8}$: area $12$, semiperimeter $8$.",
        fr: "$\\dfrac{12}{8}$ : aire $12$, demi-périmètre $8$.",
        es: "$\\dfrac{12}{8}$: área $12$, semiperímetro $8$.",
        ja: "$\\dfrac{12}{8}$：面積 $12$、半周長 $8$。",
        zh: "$\\dfrac{12}{8}$：面积 $12$，半周长 $8$。"
      } },
      { tex: "r = 1.5", correct: true, why: {
        en: "The same value as a decimal.",
        fr: "La même valeur en écriture décimale.",
        es: "El mismo valor en decimal.",
        ja: "同じ値を小数で書いたもの。",
        zh: "同一个值的小数形式。"
      } },
      { tex: "r = 2", correct: false, why: {
        en: "Half the height — the centre is not halfway up.",
        fr: "La moitié de la hauteur — le centre n’est pas à mi-hauteur.",
        es: "La mitad de la altura — el centro no está a media altura.",
        ja: "高さの半分 — 中心は高さの中央にはありません。",
        zh: "高的一半 —— 球心并不在一半高度处。"
      } },
      { tex: "r = \\tfrac43", correct: false, why: {
        en: "Height divided by the base radius: not a formula for the inradius.",
        fr: "Hauteur divisée par le rayon de base : ce n’est pas une formule du rayon inscrit.",
        es: "Altura dividida entre el radio de la base: no es una fórmula del radio inscrito.",
        ja: "高さ ÷ 底面の半径：内接円の半径の公式ではありません。",
        zh: "高除以底面半径：这不是内切圆半径的公式。"
      } },
      { tex: "r = \\tfrac{12}{5}", correct: false, why: {
        en: "Divides the area by a slant side $5$ instead of the semiperimeter $8$.",
        fr: "Divise l’aire par un côté oblique $5$ au lieu du demi-périmètre $8$.",
        es: "Divide el área entre un lado oblicuo $5$ en lugar del semiperímetro $8$.",
        ja: "面積を半周長 $8$ ではなく斜辺 $5$ で割っています。",
        zh: "用面积除以腰长 $5$，而不是半周长 $8$。"
      } },
      { tex: "r = 1", correct: false, why: {
        en: "Then the distance from the centre to the slant side would be $\\tfrac{12}{5}\\cdot\\tfrac{3}{5}\\ne 1$.",
        fr: "La distance du centre au côté oblique ne vaudrait alors pas $1$.",
        es: "Entonces la distancia del centro al lado oblicuo no sería $1$.",
        ja: "その場合、中心から斜辺までの距離は $1$ になりません。",
        zh: "那样球心到腰的距离就不等于 $1$。"
      } },
      { tex: "r = 3", correct: false, why: {
        en: "The base radius — the sphere would stick out of the cone.",
        fr: "Le rayon de base — la sphère sortirait du cône.",
        es: "El radio de la base — la esfera se saldría del cono.",
        ja: "底面の半径です — 球が円錐からはみ出します。",
        zh: "底面半径 —— 球会伸出圆锥外。"
      } },
      { tex: "r = \\tfrac65", correct: false, why: {
        en: "Divides the area by $10$ (the two slant sides) instead of $8$.",
        fr: "Divise l’aire par $10$ (les deux côtés obliques) au lieu de $8$.",
        es: "Divide el área entre $10$ (los dos lados oblicuos) en lugar de $8$.",
        ja: "面積を $8$ ではなく $10$（2本の斜辺）で割っています。",
        zh: "用面积除以 $10$（两条腰），而不是 $8$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cut through the axis",
          fr: "Couper par l’axe",
          es: "Cortar por el eje",
          ja: "軸で切る",
          zh: "沿轴切开"
        },
        lines: ["\\text{slant} = \\sqrt{3^2 + 4^2} = 5", "\\text{triangle } 5,\\ 5,\\ 6"],
        note: {
          en: "The sphere meets this plane in a circle tangent to all three sides: the incircle.",
          fr: "La sphère coupe ce plan selon un cercle tangent aux trois côtés : le cercle inscrit.",
          es: "La esfera corta este plano en una circunferencia tangente a los tres lados: la inscrita.",
          ja: "球はこの平面と3辺に接する円で交わります：内接円です。",
          zh: "球与这个平面的交线是与三边都相切的圆：内切圆。"
        },
        fig(F) { F.draw(F.path([L0, R0, V], 'hl blue', 'over'), 900); }
      },
      {
        title: {
          en: "Inradius = area ÷ semiperimeter",
          fr: "Rayon inscrit = aire ÷ demi-périmètre",
          es: "Radio inscrito = área ÷ semiperímetro",
          ja: "内接円の半径 = 面積 ÷ 半周長",
          zh: "内切圆半径 = 面积 ÷ 半周长"
        },
        lines: ["S = \\tfrac12\\cdot 6\\cdot 4 = 12, \\qquad s = \\tfrac{5 + 5 + 6}{2} = 8", "r = \\frac{S}{s} = \\frac{12}{8} = \\boxed{\\tfrac32}"],
        note: {
          en: "Split the triangle at the centre into three triangles of height $r$.",
          fr: "Découpez le triangle depuis le centre en trois triangles de hauteur $r$.",
          es: "Divide el triángulo desde el centro en tres triángulos de altura $r$.",
          ja: "中心から三角形を高さ $r$ の3つの三角形に分けます。",
          zh: "从圆心把三角形分成三个高为 $r$ 的三角形。"
        },
        fig(F) { F.fadeIn(F.path([L0, R0, V], 'fill-yellow', 'fills'), 600); }
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
