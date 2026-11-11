/* geometry · The centroid’s third
   The centroid divides each median 2 : 1, so it is at one third of the height above every side. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const A = [2, 5], B = [0, 0], C = [7, 0], G = [3, 5 / 3];

  PuzzleBank.define({
    id: "geo-centroid-area",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["zhongkao", "amc"]
    },
    difficulty: 1,
    title: {
      en: "The centroid’s third",
      fr: "Le tiers du centre de gravité",
      es: "El tercio del baricentro",
      ja: "重心がつくる3分の1",
      zh: "重心分出的三分之一"
    },
    statement: {
      en: "Triangle $ABC$ has area $36$ and $G$ is its centroid (where the medians meet). <b>Which of the following equal the area of $\\triangle GBC$?</b>",
      fr: "Le triangle $ABC$ a pour aire $36$ et $G$ est son centre de gravité (intersection des médianes). <b>Lesquelles des valeurs suivantes sont égales à l’aire de $\\triangle GBC$ ?</b>",
      es: "El triángulo $ABC$ tiene área $36$ y $G$ es su baricentro (donde se cortan las medianas). <b>¿Cuáles de los siguientes son iguales al área de $\\triangle GBC$?</b>",
      ja: "三角形 $ABC$ の面積は $36$、$G$ はその重心（中線の交点）です。<b>次のうち $\\triangle GBC$ の面積に等しいものはどれですか？</b>",
      zh: "三角形 $ABC$ 的面积为 $36$，$G$ 是它的重心（三条中线的交点）。<b>下列哪些等于 $\\triangle GBC$ 的面积？</b>"
    },
    figureText: {
      en: "Triangle ABC with its three medians meeting at the centroid G; the triangle GBC on the base BC is shaded.",
      fr: "Le triangle ABC avec ses trois médianes concourantes au centre de gravité G ; le triangle GBC sur la base BC est grisé.",
      es: "El triángulo ABC con sus tres medianas cortándose en el baricentro G; el triángulo GBC sobre la base BC está sombreado.",
      ja: "三角形 ABC と、重心 G で交わる3本の中線。底辺 BC 上の三角形 GBC に色が付いています。",
      zh: "三角形 ABC 及其交于重心 G 的三条中线；以 BC 为底的三角形 GBC 涂有阴影。"
    },
    hint: {
      en: "$G$ lies two thirds of the way down the median from $A$, so its height above $BC$ is one third of the height of $A$.",
      fr: "$G$ est aux deux tiers de la médiane issue de $A$ : sa hauteur au-dessus de $BC$ est le tiers de celle de $A$.",
      es: "$G$ está a dos tercios de la mediana desde $A$, así que su altura sobre $BC$ es un tercio de la de $A$.",
      ja: "$G$ は $A$ からの中線を $2:1$ に分けるので、$BC$ からの高さは $A$ の高さの3分の1です。",
      zh: "$G$ 把从 $A$ 出发的中线分成 $2:1$，所以它到 $BC$ 的高是 $A$ 的高的三分之一。"
    },
    aiHint: {
      en: "Please solve it another way if you can (for example coordinates with B and C on the x-axis, or the fact that the three triangles GAB, GBC, GCA have equal areas), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple des coordonnées avec B et C sur l’axe des abscisses, ou le fait que les trois triangles GAB, GBC, GCA ont la même aire), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo coordenadas con B y C en el eje x, o que los tres triángulos GAB, GBC, GCA tienen la misma área), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば B と C を x 軸上に置いた座標、または三角形 GAB、GBC、GCA の面積が等しいことを使う）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把 B、C 放在 x 轴上用坐标，或利用三角形 GAB、GBC、GCA 面积相等），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7, h: 5, scale: 40, pad: 28 });
      F.path([G, B, C], 'fill-yellow', 'fills');
      F.path([A, B, C], 'tri');
      [[A, mid(B, C)], [B, mid(A, C)], [C, mid(A, B)]].forEach(([p, q]) => F.seg(p, q, 'seg thin'));
      F.dot(G, 'center');
      F.text(A, 'A', 'pt', 0, -14); F.text(B, 'B', 'pt', -12, 10); F.text(C, 'C', 'pt', 12, 10); F.text(G, 'G', 'pt', 2, -16);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "midpoint of": { fr: "milieu de", es: "punto medio de", ja: "の中点：", zh: "中点：" }
    },
    options: [
      { tex: "12", correct: true, why: {
        en: "$\\tfrac13\\cdot 36$.",
        fr: "$\\tfrac13\\cdot 36$.",
        es: "$\\tfrac13\\cdot 36$.",
        ja: "$\\tfrac13\\cdot 36$。",
        zh: "$\\tfrac13\\cdot 36$。"
      } },
      { tex: "\\tfrac{36}{3}", correct: true, why: {
        en: "The same value: one third of the whole triangle.",
        fr: "La même valeur : le tiers du triangle entier.",
        es: "El mismo valor: un tercio del triángulo entero.",
        ja: "同じ値：三角形全体の3分の1。",
        zh: "同一个值：整个三角形的三分之一。"
      } },
      { tex: "18", correct: false, why: {
        en: "Half: that is the triangle cut off by one median.",
        fr: "La moitié : c’est le triangle découpé par une médiane.",
        es: "La mitad: es el triángulo que corta una mediana.",
        ja: "半分 — 1本の中線で切り取られる三角形です。",
        zh: "一半：那是一条中线切出的三角形。"
      } },
      { tex: "9", correct: false, why: {
        en: "A quarter: the triangle formed by joining the midpoints of the sides.",
        fr: "Un quart : le triangle des milieux des côtés.",
        es: "Un cuarto: el triángulo que forman los puntos medios de los lados.",
        ja: "4分の1 — 各辺の中点を結んだ三角形です。",
        zh: "四分之一：连接各边中点得到的三角形。"
      } },
      { tex: "6", correct: false, why: {
        en: "A sixth: one of the six small triangles cut by all three medians.",
        fr: "Un sixième : un des six petits triangles découpés par les trois médianes.",
        es: "Un sexto: uno de los seis triángulos pequeños que cortan las tres medianas.",
        ja: "6分の1 — 3本の中線でできる6つの小三角形の1つです。",
        zh: "六分之一：三条中线分出的六个小三角形之一。"
      } },
      { tex: "24", correct: false, why: {
        en: "Two thirds: confuses the $2:1$ ratio on the median with the area.",
        fr: "Deux tiers : confond le rapport $2:1$ sur la médiane avec l’aire.",
        es: "Dos tercios: confunde la razón $2:1$ de la mediana con el área.",
        ja: "3分の2 — 中線上の比 $2:1$ と面積を混同しています。",
        zh: "三分之二：把中线上的 $2:1$ 和面积混淆了。"
      } },
      { tex: "4", correct: false, why: {
        en: "$\\tfrac19$ of the area — the ratio was squared, but the triangles share the base $BC$.",
        fr: "$\\tfrac19$ de l’aire — le rapport a été élevé au carré, mais les triangles ont la même base $BC$.",
        es: "$\\tfrac19$ del área — se elevó la razón al cuadrado, pero los triángulos comparten la base $BC$.",
        ja: "面積の $\\tfrac19$ — 比を2乗していますが、2つの三角形は底辺 $BC$ を共有しています。",
        zh: "面积的 $\\tfrac19$ —— 把比平方了，但两个三角形共用底边 $BC$。"
      } },
      { tex: "27", correct: false, why: {
        en: "$\\tfrac34$ of the area — no part of the figure has that size.",
        fr: "$\\tfrac34$ de l’aire — aucune partie de la figure n’a cette taille.",
        es: "$\\tfrac34$ del área — ninguna parte de la figura tiene ese tamaño.",
        ja: "面積の $\\tfrac34$ — そのような部分はありません。",
        zh: "面积的 $\\tfrac34$ —— 图中没有这样大小的部分。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The centroid divides medians 2 : 1",
          fr: "Le centre de gravité partage les médianes dans le rapport 2 : 1",
          es: "El baricentro divide las medianas en razón 2 : 1",
          ja: "重心は中線を 2 : 1 に分ける",
          zh: "重心把中线分成 2 : 1"
        },
        lines: ["AG : GM = 2 : 1 \\quad (M \\text{ midpoint of } BC)", "h_G = \\tfrac13\\,h_A"],
        note: {
          en: "Going from $A$ to $M$, the height above $BC$ drops steadily from $h_A$ to $0$.",
          fr: "De $A$ à $M$, la hauteur au-dessus de $BC$ diminue régulièrement de $h_A$ à $0$.",
          es: "De $A$ a $M$, la altura sobre $BC$ baja de forma uniforme de $h_A$ a $0$.",
          ja: "$A$ から $M$ へ進むと、$BC$ からの高さは $h_A$ から $0$ まで一様に下がります。",
          zh: "从 $A$ 到 $M$，到 $BC$ 的高从 $h_A$ 均匀地降到 $0$。"
        },
        fig(F) { F.draw(F.seg(A, mid(B, C), 'hl blue', 'over'), 700); }
      },
      {
        title: {
          en: "Same base, a third of the height",
          fr: "Même base, un tiers de la hauteur",
          es: "Misma base, un tercio de la altura",
          ja: "底辺が同じで高さは3分の1",
          zh: "同底，高为三分之一"
        },
        lines: ["[GBC] = \\tfrac12\\cdot BC\\cdot h_G = \\tfrac13\\cdot\\tfrac12\\cdot BC\\cdot h_A = \\tfrac13\\cdot 36 = \\boxed{12}"],
        note: {
          en: "The three triangles $GAB$, $GBC$, $GCA$ all have area $12$.",
          fr: "Les trois triangles $GAB$, $GBC$, $GCA$ ont tous une aire de $12$.",
          es: "Los tres triángulos $GAB$, $GBC$, $GCA$ tienen área $12$.",
          ja: "3つの三角形 $GAB$、$GBC$、$GCA$ の面積はどれも $12$ です。",
          zh: "三个三角形 $GAB$、$GBC$、$GCA$ 的面积都是 $12$。"
        },
        fig(F) { F.fadeIn(F.path([G, A, B], 'fill-blue', 'fills'), 500); F.fadeIn(F.path([G, C, A], 'fill-pink', 'fills'), 500, 300); }
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
