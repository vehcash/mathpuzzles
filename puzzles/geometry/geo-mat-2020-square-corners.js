/* geometry · The other corners of a square
   Oxford MAT 2020 (Mathematics Admissions Test), Question 1A */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2020-square-corners",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 1A",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 1A",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 1A",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 1A",
        zh: "牛津大学数学入学考试 MAT 2020 第 1A 题"
      },
      exams: ["mat"]
    },
    difficulty: 1,
    title: {
      en: "The other corners of a square",
      fr: "Les autres sommets d’un carré",
      es: "Las otras esquinas de un cuadrado",
      ja: "正方形の残りの頂点",
      zh: "正方形的其他顶点"
    },
    statement: {
      en: "A square has centre $(3,4)$ and one corner at $(1,5)$. <b>Which of the following are also corners of the square?</b>",
      fr: "Un carré a pour centre $(3,4)$ et un sommet en $(1,5)$. <b>Lesquels des points suivants sont aussi des sommets du carré ?</b>",
      es: "Un cuadrado tiene centro $(3,4)$ y una esquina en $(1,5)$. <b>¿Cuáles de los siguientes puntos son también esquinas del cuadrado?</b>",
      ja: "中心 $(3,4)$、1つの頂点が $(1,5)$ の正方形があります。<b>次のうち正方形の頂点でもあるものはどれですか？</b>",
      zh: "一个正方形中心为 $(3,4)$，一个顶点为 $(1,5)$。<b>下列哪些点也是该正方形的顶点？</b>"
    },
    figureText: {
      en: "A grid with the centre (3, 4) and the corner (1, 5), joined by an arrow. The square is drawn in the solution.",
      fr: "Une grille avec le centre (3, 4) et le sommet (1, 5), reliés par une flèche. Le carré est tracé dans la solution.",
      es: "Una cuadrícula con el centro (3, 4) y la esquina (1, 5), unidos por una flecha. El cuadrado se dibuja en la solución.",
      ja: "中心 (3, 4) と頂点 (1, 5) を矢印で結んだ方眼。正方形は解答で描きます。",
      zh: "网格上标出中心 (3, 4) 与顶点 (1, 5)，用箭头相连。正方形在解答中画出。"
    },
    hint: {
      en: "Rotate the vector $(-2,1)$ from the centre by $90^\\circ$, $180^\\circ$ and $270^\\circ$.",
      fr: "Faites tourner le vecteur $(-2,1)$ issu du centre de $90^\\circ$, $180^\\circ$ et $270^\\circ$.",
      es: "Gira el vector $(-2,1)$ desde el centro $90^\\circ$, $180^\\circ$ y $270^\\circ$.",
      ja: "中心からのベクトル $(-2,1)$ を $90^\\circ$, $180^\\circ$, $270^\\circ$ 回転。",
      zh: "把中心出发的向量 $(-2,1)$ 旋转 $90^\\circ$、$180^\\circ$、$270^\\circ$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.8, h: 7.2, scale: 36, pad: 16 });
      const T = F.T = axes(F, -0.4, 6.4, -0.4, 6.8, { grid: true });
      const C = [3, 4], P = [[1, 5], [2, 2], [5, 3], [4, 6]];
      F.dot(T(C)); arrow(F, T(C), T([1, 5])); F.dot(T([1, 5]));
      F.text(T([1, 5]), '(1,5)', 'len small', -18, -10); F.text(T(C), '(3,4)', 'len small', 22, 8);
      F.reveal = () => {
      F.path(P.map(T), 'tri fill-yellow'); P.forEach(p => F.dot(T(p)));
      };
      return F;
    },
    options: [
      { tex: "(5,3)", correct: true, why: {
        en: "$(3,4)-(-2,1)$: the opposite corner.",
        fr: "$(3,4)-(-2,1)$: the opposite corner.",
        es: "$(3,4)-(-2,1)$: the opposite corner.",
        ja: "$(3,4)-(-2,1)$: the opposite corner.",
        zh: "$(3,4)-(-2,1)$: the opposite corner."
      } },
      { tex: "(2,2)", correct: true, why: {
        en: "$(3,4)+(-1,-2)$: rotate $(-2,1)$ by $90^\\circ$.",
        fr: "$(3,4)+(-1,-2)$: rotate $(-2,1)$ by $90^\\circ$.",
        es: "$(3,4)+(-1,-2)$: rotate $(-2,1)$ by $90^\\circ$.",
        ja: "$(3,4)+(-1,-2)$: rotate $(-2,1)$ by $90^\\circ$.",
        zh: "$(3,4)+(-1,-2)$: rotate $(-2,1)$ by $90^\\circ$."
      } },
      { tex: "(5,5)", correct: false, why: {
        en: "Reflects in the line $y=5$ instead of rotating.",
        fr: "Réfléchit par rapport à $y=5$ au lieu de tourner.",
        es: "Refleja en $y=5$ en vez de girar.",
        ja: "回転でなく $y=5$ で反転した。",
        zh: "是关于 $y=5$ 的反射而非旋转。"
      } },
      { tex: "(1,3)", correct: false, why: {
        en: "Moves along a side direction that is not perpendicular.",
        fr: "Direction non perpendiculaire.",
        es: "Dirección no perpendicular.",
        ja: "垂直でない向きに動いた。",
        zh: "方向不垂直。"
      } },
      { tex: "(4,2)", correct: false, why: {
        en: "Distance $\\sqrt5$ from the centre, but at the wrong angle.",
        fr: "À distance $\\sqrt5$ du centre, mais au mauvais angle.",
        es: "A distancia $\\sqrt5$ del centro, pero con ángulo erróneo.",
        ja: "中心から距離 $\\sqrt5$ だが角度が違う。",
        zh: "到中心距离 $\\sqrt5$，但角度不对。"
      } },
      { tex: "(6,3)", correct: false, why: {
        en: "$\\sqrt{10}$ from the centre.",
        fr: "À $\\sqrt{10}$ du centre.",
        es: "A $\\sqrt{10}$ del centro.",
        ja: "中心から $\\sqrt{10}$。",
        zh: "距中心 $\\sqrt{10}$。"
      } },
      { tex: "(2,6)", correct: false, why: {
        en: "Distance $\\sqrt5$ again, wrong angle.",
        fr: "Encore $\\sqrt5$, mauvais angle.",
        es: "Otra vez $\\sqrt5$, ángulo erróneo.",
        ja: "距離 $\\sqrt5$ だが角度が違う。",
        zh: "距离 $\\sqrt5$，角度不对。"
      } },
      { tex: "(3,6)", correct: false, why: {
        en: "$2$ from the centre, not $\\sqrt5$.",
        fr: "À $2$ du centre, pas $\\sqrt5$.",
        es: "A $2$ del centro, no $\\sqrt5$.",
        ja: "中心から $2$ で $\\sqrt5$ ではない。",
        zh: "距中心 $2$，不是 $\\sqrt5$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Half-diagonal vector",
          fr: "Vecteur demi-diagonale",
          es: "Vector semidiagonal",
          ja: "半対角線ベクトル",
          zh: "半对角线向量"
        },
        lines: ["(1,5)-(3,4)=(-2,1)"],
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
          en: "Rotate by 90° steps",
          fr: "Tourner par pas de 90°",
          es: "Girar de 90° en 90°",
          ja: "90° ずつ回転",
          zh: "每次转 90°"
        },
        lines: ["(-2,1)\\to(-1,-2)\\to(2,-1)\\to(1,2)"],
        note: {
          en: "$(x,y)\\mapsto(-y,x)$ is a $90^\\circ$ rotation.",
          fr: "$(x,y)\\mapsto(-y,x)$ est une rotation de $90^\\circ$.",
          es: "$(x,y)\\mapsto(-y,x)$ es un giro de $90^\\circ$.",
          ja: "$(x,y)\\mapsto(-y,x)$ は $90^\\circ$ 回転。",
          zh: "$(x,y)\\mapsto(-y,x)$ 为 $90^\\circ$ 旋转。"
        }
      },
      {
        title: {
          en: "Add the centre",
          fr: "Ajouter le centre",
          es: "Sumar el centro",
          ja: "中心を足す",
          zh: "加上中心"
        },
        lines: ["(2,2),\\ (5,3),\\ (4,6)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$(4,6)$ is the third remaining corner.",
          fr: "$(4,6)$ est le troisième sommet restant.",
          es: "$(4,6)$ es la tercera esquina restante.",
          ja: "$(4,6)$ が残りの3つ目の頂点。",
          zh: "$(4,6)$ 是剩下的第三个顶点。"
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
          en: "Two corners are offered; the third, (4, 6), is not in the list.",
          fr: "Deux sommets sont proposés ; le troisième, (4, 6), n’est pas dans la liste.",
          es: "Se ofrecen dos esquinas; la tercera, (4, 6), no está en la lista.",
          ja: "2つの頂点が選択肢にあり、3つ目の (4, 6) はない。",
          zh: "列出了两个顶点，第三个 (4, 6) 不在其中。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
