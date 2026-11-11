/* geometry · A prism with three different edges
   Gaokao 2024, Tianjin paper (天津卷), Question 9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-tj-five-faced-solid",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 9",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 9",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 9",
        ja: "2024年 中国・高考 天津卷 第9問",
        zh: "2024年高考数学天津卷 第9题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A prism with three different edges",
      fr: "Un prisme aux trois arêtes différentes",
      es: "Un prisma con tres aristas distintas",
      ja: "側辺の長さが違う三角柱",
      zh: "三条侧棱不等的“棱柱”"
    },
    statement: {
      en: "A solid with five faces has edges $AD$, $BE$, $CF$ that are parallel, each pair $1$ apart. $AD=1$, $BE=2$, $CF=3$. <b>Which of the following equal its volume?</b>",
      fr: "Un solide à cinq faces a des arêtes $AD$, $BE$, $CF$ parallèles, deux à deux distantes de $1$. $AD=1$, $BE=2$, $CF=3$. <b>Lesquelles des valeurs suivantes sont égales à son volume ?</b>",
      es: "Un sólido de cinco caras tiene aristas $AD$, $BE$, $CF$ paralelas, cada par a distancia $1$. $AD=1$, $BE=2$, $CF=3$. <b>¿Cuáles de los siguientes valores son iguales a su volumen?</b>",
      ja: "五面体の辺 $AD$, $BE$, $CF$ は互いに平行で、どの2本の距離も $1$ です。$AD=1$、$BE=2$、$CF=3$ のとき、<b>体積に等しいものはどれですか？</b>",
      zh: "一个五面体中，$AD$，$BE$，$CF$ 互相平行，且两两之间的距离均为 $1$，$AD=1$，$BE=2$，$CF=3$。<b>下列哪些等于该五面体的体积？</b>"
    },
    figureText: {
      en: "Three parallel vertical edges of lengths 1, 2 and 3 standing on an equilateral triangle of side 1, with their tops joined.",
      fr: "Trois arêtes verticales parallèles de longueurs 1, 2 et 3 sur un triangle équilatéral de côté 1, sommets reliés.",
      es: "Tres aristas verticales paralelas de longitudes 1, 2 y 3 sobre un triángulo equilátero de lado 1, con los extremos unidos.",
      ja: "1辺 1 の正三角形の上に立つ長さ 1, 2, 3 の平行な辺と、その上端を結ぶ面。",
      zh: "立在边长为 1 的正三角形上的三条平行棱，长 1、2、3，上端相连。"
    },
    hint: {
      en: "Two copies of the solid, one turned upside down, fit together into a prism with all edges $4$.",
      fr: "Deux copies du solide, l’une retournée, forment un prisme dont toutes les arêtes valent $4$.",
      es: "Dos copias del sólido, una invertida, forman un prisma con todas las aristas $4$.",
      ja: "2つ合わせると（片方を逆さに）側辺がすべて $4$ の三角柱になる。",
      zh: "两个这样的立体（一个倒置）拼成侧棱都为 $4$ 的三棱柱。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 2.8, h: 3.5, scale: 76, pad: 18 });
      const P = ([x, y, z]) => [0.6 + 1.6 * x + 0.3 * y, 0.4 + 0.7 * z + 0.8 * y];
      const A = [0, 0, 0], B = [1, 0, 0], C = [0.5, Math.sqrt(3) / 2, 0];
      const D = [0, 0, 1], E = [1, 0, 2], Fp = [0.5, Math.sqrt(3) / 2, 3];
      F.seg(P(A), P(B), 'seg'); F.seg(P(B), P(C), 'seg thin dashc'); F.seg(P(C), P(A), 'seg thin dashc');
      F.seg(P(A), P(D), 'seg'); F.seg(P(B), P(E), 'seg'); F.seg(P(C), P(Fp), 'seg thin dashc');
      F.seg(P(D), P(E), 'seg'); F.seg(P(E), P(Fp), 'seg'); F.seg(P(Fp), P(D), 'seg');
      [[A, 'A', -10, 10], [B, 'B', 10, 10], [C, 'C', 12, 6], [D, 'D', -12, 0], [E, 'E', 12, 0], [Fp, 'F', 0, -12]].forEach(([Q, t, dx, dy]) => F.text(P(Q), t, 'pt', dx, dy));
      F.text(P([0, 0, 0.5]), '1', 'len small', -10, 0); F.text(P([1, 0, 1]), '2', 'len small', 10, 0); F.text(P([0.5, 0.866, 1.8]), '3', 'len small', 10, 0);
      F.reveal = () => {
      F.path([P(A), P(B), P(C)], 'fill-yellow', 'fills', true); F.text(P([0.5, 0.3, 0]), '√3/4', 'len small', 0, 16);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "perpendicular section: equilateral, side": {"fr": "section droite : équilatérale, côté", "es": "sección recta: equilátera, lado", "ja": "直交断面：正三角形、1辺", "zh": "直截面：正三角形，边长"},
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "two copies": {"fr": "deux copies", "es": "dos copias", "ja": "2つ合わせる", "zh": "两个拼合"},
      "prism with edges": {"fr": "prisme d’arêtes", "es": "prisma de aristas", "ja": "側辺の三角柱", "zh": "侧棱为"}
    },
    options: [
      { tex: "\\tfrac{\\sqrt3}{2}", correct: true, why: {
        en: "Half of a prism with base $\\tfrac{\\sqrt3}4$ and height $4$.",
        fr: "La moitié d’un prisme de base $\\tfrac{\\sqrt3}4$ et de hauteur $4$.",
        es: "La mitad de un prisma de base $\\tfrac{\\sqrt3}4$ y altura $4$.",
        ja: "底面 $\\tfrac{\\sqrt3}4$・高さ $4$ の三角柱の半分。",
        zh: "底面积 $\\tfrac{\\sqrt3}4$、高 $4$ 的三棱柱的一半。"
      } },
      { tex: "\\tfrac{\\sqrt3}{4}\\cdot\\tfrac{1+2+3}{3}", correct: true, why: {
        en: "Base area times the average edge length.",
        fr: "Aire de base fois la longueur moyenne des arêtes.",
        es: "Área de la base por la longitud media de las aristas.",
        ja: "底面積 × 側辺の平均の長さ。",
        zh: "底面积乘以侧棱的平均长度。"
      } },
      { tex: "\\tfrac{\\sqrt3}{6}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{\\sqrt3}{4}+\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{3\\sqrt3}{4}-\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{3\\sqrt3}{2}", correct: false, why: {
        en: "Base times the sum of the edges: that counts three prisms.",
        fr: "Base fois la somme des arêtes : cela compte trois prismes.",
        es: "Base por la suma de las aristas: cuenta tres prismas.",
        ja: "底面 × 側辺の和では3倍になる。",
        zh: "底面积乘侧棱之和，多算了三倍。"
      } },
      { tex: "\\tfrac{3\\sqrt3}{4}", correct: false, why: {
        en: "Base times the longest edge: the whole prism up to height $3$.",
        fr: "Base fois l’arête la plus longue : tout le prisme jusqu’à $3$.",
        es: "Base por la arista más larga: el prisma entero hasta $3$.",
        ja: "底面 × 最長の辺。高さ $3$ の三角柱全体。",
        zh: "底面积乘最长棱：整个高 $3$ 的棱柱。"
      } },
      { tex: "\\tfrac{\\sqrt3}{4}", correct: false, why: {
        en: "Only the base area.",
        fr: "Seulement l’aire de base.",
        es: "Solo el área de la base.",
        ja: "底面積だけ。",
        zh: "只是底面积。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cross-section",
          fr: "Section droite",
          es: "Sección recta",
          ja: "直交断面",
          zh: "直截面"
        },
        lines: ["\\text{perpendicular section: equilateral, side}\\ 1,\\ \\text{area}\\ \\tfrac{\\sqrt3}4"],
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
          en: "Double it",
          fr: "Doubler",
          es: "Duplicar",
          ja: "2つ合わせる",
          zh: "补成棱柱"
        },
        lines: ["\\text{two copies}\\to\\text{prism with edges}\\ 1+3=2+2=3+1=4", "V=\\tfrac12\\cdot\\tfrac{\\sqrt3}4\\cdot4=\\boxed{\\tfrac{\\sqrt3}{2}}"],
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
