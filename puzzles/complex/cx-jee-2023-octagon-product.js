/* complex · Eight distances, one product
   JEE Advanced 2023 (India), Paper 2, Mathematics Q.11 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "cx-jee-2023-octagon-product",
    category: "complex",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 2, Mathematics Q.11",
        fr: "JEE Advanced 2023 (Inde), épreuve 2, mathématiques Q.11",
        es: "JEE Advanced 2023 (India), prueba 2, matemáticas Q.11",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 2 数学 Q.11",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷二 数学 Q.11"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "Eight distances, one product",
      fr: "Huit distances, un produit",
      es: "Ocho distancias, un producto",
      ja: "8つの距離の積",
      zh: "八段距离之积"
    },
    statement: {
      en: "$A_1,\\dots,A_8$ are the vertices of a regular octagon on a circle of radius $2$, and $P$ moves on the same circle. <b>Which of the following equal the maximum of $PA_1\\cdot PA_2\\cdots PA_8$?</b>",
      fr: "$A_1,\\dots,A_8$ sont les sommets d’un octogone régulier inscrit dans un cercle de rayon $2$, et $P$ parcourt ce cercle. <b>Lesquelles des valeurs suivantes sont égales au maximum de $PA_1\\cdot PA_2\\cdots PA_8$ ?</b>",
      es: "$A_1,\\dots,A_8$ son los vértices de un octógono regular en una circunferencia de radio $2$, y $P$ recorre esa circunferencia. <b>¿Cuáles de los siguientes valores son iguales al máximo de $PA_1\\cdot PA_2\\cdots PA_8$?</b>",
      ja: "$A_1,\\dots,A_8$ は半径 $2$ の円に内接する正八角形の頂点で、$P$ は同じ円周上を動きます。<b>$PA_1\\cdot PA_2\\cdots PA_8$ の最大値に等しいものはどれですか？</b>",
      zh: "$A_1,\\dots,A_8$ 是半径为 $2$ 的圆的内接正八边形顶点，$P$ 在同一圆上运动。<b>下列哪些等于 $PA_1\\cdot PA_2\\cdots PA_8$ 的最大值？</b>"
    },
    figureText: {
      en: "The octagon on a circle of radius 2 with P on the circle halfway between two vertices, joined to all eight vertices.",
      fr: "L’octogone sur un cercle de rayon 2, avec P sur le cercle à mi-chemin entre deux sommets, relié aux huit sommets.",
      es: "El octógono en una circunferencia de radio 2, con P en ella a medio camino entre dos vértices, unido a los ocho.",
      ja: "半径2の円上の正八角形と、2頂点の中間にある円周上の点 P。P と8頂点を結ぶ。",
      zh: "半径为 2 的圆上的正八边形，P 位于两顶点正中间的圆上，并与八个顶点相连。"
    },
    hint: {
      en: "Put the vertices at the roots of $z^8=2^8$. Then $\\prod(z-A_k)=z^8-2^8$.",
      fr: "Placez les sommets aux racines de $z^8=2^8$. Alors $\\prod(z-A_k)=z^8-2^8$.",
      es: "Pon los vértices en las raíces de $z^8=2^8$. Entonces $\\prod(z-A_k)=z^8-2^8$.",
      ja: "頂点を $z^8=2^8$ の解にとると $\\prod(z-A_k)=z^8-2^8$。",
      zh: "把顶点取为 $z^8=2^8$ 的根，则 $\\prod(z-A_k)=z^8-2^8$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.4, h: 3.4, scale: 62, pad: 18 });
      const O = [1.7, 1.7], V = k => [O[0] + 1.4 * Math.cos(k * Math.PI / 4), O[1] + 1.4 * Math.sin(k * Math.PI / 4)];
      F.circle(O, 1.4, 'conic'); F.path([...Array(8).keys()].map(V), 'tri');
      const P = [O[0] + 1.4 * Math.cos(Math.PI / 8), O[1] + 1.4 * Math.sin(Math.PI / 8)];
      for (let k = 0; k < 8; k++) F.seg(P, V(k), 'seg thin');
      F.dot(P); F.text(P, 'P', 'pt', 12, -4);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "at": {"fr": "en", "es": "en", "ja": "のとき", "zh": "当"}
    },
    options: [
      { tex: "512", correct: true, why: {
        en: "$|z^8-256|\\le|z^8|+256=512$, equal when $z^8=-256$.",
        fr: "$|z^8-256|\\le|z^8|+256=512$, equal when $z^8=-256$.",
        es: "$|z^8-256|\\le|z^8|+256=512$, equal when $z^8=-256$.",
        ja: "$|z^8-256|\\le|z^8|+256=512$, equal when $z^8=-256$.",
        zh: "$|z^8-256|\\le|z^8|+256=512$, equal when $z^8=-256$."
      } },
      { tex: "2^9", correct: true, why: {
        en: "The same number as a power of 2.",
        fr: "Le même nombre en puissance de 2.",
        es: "El mismo número como potencia de 2.",
        ja: "2 の累乗で書いた同じ数。",
        zh: "同一个数的 2 的幂形式。"
      } },
      { tex: "256", correct: false, why: {
        en: "That is $|z^8|=2^8$ alone.",
        fr: "C’est seulement $|z^8|=2^8$.",
        es: "Es solo $|z^8|=2^8$.",
        ja: "$|z^8|=2^8$ だけ。",
        zh: "只是 $|z^8|=2^8$。"
      } },
      { tex: "0", correct: false, why: {
        en: "That is the minimum, when $P$ is a vertex.",
        fr: "C’est le minimum, quand $P$ est un sommet.",
        es: "Es el mínimo, cuando $P$ es un vértice.",
        ja: "最小値（$P$ が頂点）。",
        zh: "那是最小值（$P$ 为顶点时）。"
      } },
      { tex: "1024", correct: false, why: {
        en: "Doubles once too often.",
        fr: "Un doublement de trop.",
        es: "Duplica una vez de más.",
        ja: "2倍しすぎ。",
        zh: "多乘了一次 2。"
      } },
      { tex: "4^8", correct: false, why: {
        en: "Uses the diameter $4$ for every distance.",
        fr: "Prend le diamètre $4$ pour chaque distance.",
        es: "Toma el diámetro $4$ para cada distancia.",
        ja: "すべての距離を直径 $4$ とした。",
        zh: "把每段距离都当作直径 $4$。"
      } },
      { tex: "16", correct: false, why: {
        en: "Far too small.",
        fr: "Bien trop petit.",
        es: "Demasiado pequeño.",
        ja: "小さすぎ。",
        zh: "太小。"
      } },
      { tex: "2^{16}", correct: false, why: {
        en: "Wrong exponent.",
        fr: "Mauvais exposant.",
        es: "Exponente equivocado.",
        ja: "指数の誤り。",
        zh: "指数错了。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Vertices as roots",
          fr: "Sommets comme racines",
          es: "Vértices como raíces",
          ja: "頂点を根に",
          zh: "顶点作为根"
        },
        lines: ["A_k=2e^{2\\pi ik/8}\\;\\Rightarrow\\;\\prod_{k=1}^{8}(z-A_k)=z^8-2^8"],
        note: {
          en: "The vertices are exactly the 8 roots of $z^8=256$.",
          fr: "Les sommets sont les 8 racines de $z^8=256$.",
          es: "Los vértices son las 8 raíces de $z^8=256$.",
          ja: "頂点は $z^8=256$ の8つの解。",
          zh: "顶点正是 $z^8=256$ 的 8 个根。"
        }
      },
      {
        title: {
          en: "Take moduli",
          fr: "Passer aux modules",
          es: "Tomar módulos",
          ja: "絶対値をとる",
          zh: "取模"
        },
        lines: ["PA_1\\cdots PA_8=\\left|z^8-256\\right|,\\qquad |z|=2"],
        note: {
          en: "$z^8$ runs over the circle of radius $256$.",
          fr: "$z^8$ parcourt le cercle de rayon $256$.",
          es: "$z^8$ recorre la circunferencia de radio $256$.",
          ja: "$z^8$ は半径 $256$ の円を動く。",
          zh: "$z^8$ 在半径 $256$ 的圆上运动。"
        }
      },
      {
        title: {
          en: "Maximise",
          fr: "Maximiser",
          es: "Maximizar",
          ja: "最大化",
          zh: "求最大"
        },
        lines: ["\\left|z^8-256\\right|\\le256+256=\\boxed{512},\\quad\\text{at } z^8=-256"],
        note: {
          en: "That is $P$ at the midpoint of an arc between two vertices.",
          fr: "C’est $P$ au milieu d’un arc entre deux sommets.",
          es: "Es $P$ en el punto medio de un arco entre dos vértices.",
          ja: "$P$ が2頂点間の弧の中点のとき。",
          zh: "即 $P$ 位于两顶点间弧的中点。"
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
