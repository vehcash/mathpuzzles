/* geometry · A right triangle in geometric progression
   Oxford MAT 2019 (Mathematics Admissions Test), Question 1H */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-mat-2019-geometric-right-triangle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2019 (Mathematics Admissions Test), Question 1H",
        fr: "MAT d’Oxford 2019 (test d’admission en mathématiques), question 1H",
        es: "MAT de Oxford 2019 (prueba de admisión de matemáticas), pregunta 1H",
        ja: "オックスフォード大学 数学入学試験 MAT 2019 問題 1H",
        zh: "牛津大学数学入学考试 MAT 2019 第 1H 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "A right triangle in geometric progression",
      fr: "Un triangle rectangle en progression géométrique",
      es: "Un triángulo rectángulo en progresión geométrica",
      ja: "辺が等比数列の直角三角形",
      zh: "边长成等比的直角三角形"
    },
    statement: {
      en: "Triangle $ABC$ has a right angle at $B$, and its three side lengths form a geometric progression. <b>Which of the following can be $\\tan\\angle BAC$?</b>",
      fr: "Le triangle $ABC$ est rectangle en $B$ et ses trois longueurs de côtés forment une progression géométrique. <b>Lesquelles des valeurs suivantes peuvent être $\\tan\\angle BAC$ ?</b>",
      es: "El triángulo $ABC$ es rectángulo en $B$ y las longitudes de sus tres lados forman una progresión geométrica. <b>¿Cuáles de los siguientes valores puede tomar $\\tan\\angle BAC$?</b>",
      ja: "三角形 $ABC$ は $B$ が直角で、3辺の長さが等比数列をなします。<b>$\\tan\\angle BAC$ としてありうるものはどれですか？</b>",
      zh: "三角形 $ABC$ 中 $\\angle B$ 为直角，三边长成等比数列。<b>下列哪些可能是 $\\tan\\angle BAC$ 的值？</b>"
    },
    figureText: {
      en: "A right triangle with legs 1 and r and hypotenuse r², where r² = (1 + √5)/2.",
      fr: "Un triangle rectangle de côtés de l’angle droit 1 et r et d’hypoténuse r², avec r² = (1 + √5)/2.",
      es: "Un triángulo rectángulo de catetos 1 y r e hipotenusa r², con r² = (1 + √5)/2.",
      ja: "直角をはさむ辺が 1 と r、斜辺が r² の直角三角形（r² = (1 + √5)/2）。",
      zh: "直角边为 1 和 r、斜边为 r² 的直角三角形，其中 r² = (1 + √5)/2。"
    },
    hint: {
      en: "Call the sides $1, r, r^2$ with $r>1$; the hypotenuse is the longest.",
      fr: "Notez les côtés $1, r, r^2$ avec $r>1$ ; l’hypoténuse est la plus longue.",
      es: "Llama a los lados $1, r, r^2$ con $r>1$; la hipotenusa es la mayor.",
      ja: "辺を $1, r, r^2$（$r>1$）とおくと、斜辺は最長の辺です。",
      zh: "设三边为 $1, r, r^2$（$r>1$），斜边最长。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 3.4, scale: 64, pad: 20 });
      const r = Math.sqrt((1 + Math.sqrt(5)) / 2), k = 2.6, B = [0.5, 0.4], A = [0.5 + k * r, 0.4], C = [0.5, 0.4 + k];
      F.path([A, B, C], 'tri');
      F.path([[B[0] + 0.22, B[1]], [B[0] + 0.22, B[1] + 0.22], [B[0], B[1] + 0.22]], 'seg thin', 'base', false);
      F.text(A, 'A', 'pt', 12, 8); F.text(B, 'B', 'pt', -12, 8); F.text(C, 'C', 'pt', -12, -6);
      F.text(mid(B, C), '1', 'len', -14, 0); F.text(mid(A, B), 'r', 'len it', 0, 16); F.text(mid(A, C), 'r²', 'len it', 14, -10);
      return F;
    },
    options: [
      { tex: "\\sqrt{\\tfrac{\\sqrt5-1}{2}}", correct: true, why: {
        en: "$\\tan A=\\tfrac1r$ when the shorter leg is opposite $A$.",
        fr: "$\\tan A=\\tfrac1r$ quand le petit côté est opposé à $A$.",
        es: "$\\tan A=\\tfrac1r$ si el cateto menor es opuesto a $A$.",
        ja: "短い辺が $A$ の対辺なら $\\tan A=\\tfrac1r$。",
        zh: "若较短直角边是 $A$ 的对边，$\\tan A=\\tfrac1r$。"
      } },
      { tex: "\\sqrt{\\tfrac{1+\\sqrt5}{2}}", correct: true, why: {
        en: "$\\tan A=r$ when the longer leg is opposite $A$.",
        fr: "$\\tan A=r$ quand le grand côté de l’angle droit est opposé à $A$.",
        es: "$\\tan A=r$ si el cateto mayor es opuesto a $A$.",
        ja: "長い辺が $A$ の対辺なら $\\tan A=r$。",
        zh: "若较长直角边是 $A$ 的对边，$\\tan A=r$。"
      } },
      { tex: "\\tfrac{1+\\sqrt5}{2}", correct: false, why: {
        en: "That is $r^2$, the ratio hypotenuse : shorter leg.",
        fr: "C’est $r^2$, le rapport hypoténuse : petit côté.",
        es: "Es $r^2$, la razón hipotenusa : cateto menor.",
        ja: "それは $r^2$（斜辺 : 短い辺）。",
        zh: "那是 $r^2$，斜边与较短边之比。"
      } },
      { tex: "\\tfrac{\\sqrt5-1}{2}", correct: false, why: {
        en: "That is $\\tfrac{1}{r^2}=\\cos A$ in one case, not $\\tan A$.",
        fr: "C’est $\\tfrac{1}{r^2}$, un cosinus dans un cas, pas $\\tan A$.",
        es: "Es $\\tfrac{1}{r^2}$, un coseno en un caso, no $\\tan A$.",
        ja: "それは $\\tfrac{1}{r^2}$ で、ある場合の cos。",
        zh: "那是 $\\tfrac{1}{r^2}$，某种情况下是余弦而非正切。"
      } },
      { tex: "1", correct: false, why: {
        en: "An isosceles right triangle has sides $1,1,\\sqrt2$: not geometric.",
        fr: "Un triangle rectangle isocèle a pour côtés $1,1,\\sqrt2$ : pas géométrique.",
        es: "Un rectángulo isósceles tiene lados $1,1,\\sqrt2$: no es geométrica.",
        ja: "直角二等辺三角形は $1,1,\\sqrt2$ で等比でない。",
        zh: "等腰直角三角形三边 $1,1,\\sqrt2$ 不成等比。"
      } },
      { tex: "\\tfrac34", correct: false, why: {
        en: "The $3,4,5$ triangle is arithmetic, not geometric.",
        fr: "Le triangle $3,4,5$ est arithmétique, pas géométrique.",
        es: "El triángulo $3,4,5$ es aritmético, no geométrico.",
        ja: "$3,4,5$ は等差で等比でない。",
        zh: "$3,4,5$ 成等差而非等比。"
      } },
      { tex: "\\sqrt2", correct: false, why: {
        en: "Would need legs $1$ and $\\sqrt2$, hypotenuse $\\sqrt3$: ratios differ.",
        fr: "Côtés $1$, $\\sqrt2$, hypoténuse $\\sqrt3$ : rapports différents.",
        es: "Catetos $1$, $\\sqrt2$ e hipotenusa $\\sqrt3$: razones distintas.",
        ja: "$1$, $\\sqrt2$, $\\sqrt3$ では比が違う。",
        zh: "$1$、$\\sqrt2$、$\\sqrt3$ 的比不同。"
      } },
      { tex: "\\tfrac{\\sqrt3}{3}", correct: false, why: {
        en: "The $30$–$60$–$90$ triangle has sides $1,\\sqrt3,2$: not geometric.",
        fr: "Le triangle $30$–$60$–$90$ a pour côtés $1,\\sqrt3,2$ : pas géométrique.",
        es: "El triángulo $30$–$60$–$90$ tiene lados $1,\\sqrt3,2$: no es geométrica.",
        ja: "$30$–$60$–$90$ は $1,\\sqrt3,2$ で等比でない。",
        zh: "$30$–$60$–$90$ 三角形三边 $1,\\sqrt3,2$ 不成等比。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Pythagoras with a ratio",
          fr: "Pythagore avec une raison",
          es: "Pitágoras con una razón",
          ja: "比を使って三平方",
          zh: "用公比写勾股定理"
        },
        lines: ["1+r^2=r^4 \\;\\Rightarrow\\; r^2=\\tfrac{1+\\sqrt5}{2}"],
        note: {
          en: "The hypotenuse $AC$ is the longest side, $r^2$.",
          fr: "L’hypoténuse $AC$ est le plus long côté, $r^2$.",
          es: "La hipotenusa $AC$ es el lado mayor, $r^2$.",
          ja: "斜辺 $AC$ が最長の辺 $r^2$。",
          zh: "斜边 $AC$ 是最长边 $r^2$。"
        }
      },
      {
        title: {
          en: "Two possible tangents",
          fr: "Deux tangentes possibles",
          es: "Dos tangentes posibles",
          ja: "2通りの tan",
          zh: "两个可能的正切"
        },
        lines: ["\\tan A=\\frac{BC}{AB}\\in\\left\\{r,\\ \\tfrac1r\\right\\}=\\left\\{\\sqrt{\\tfrac{1+\\sqrt5}{2}},\\ \\sqrt{\\tfrac{\\sqrt5-1}{2}}\\right\\}"],
        note: {
          en: "Which leg is opposite $A$ is not fixed, so both values occur.",
          fr: "Le côté opposé à $A$ n’est pas imposé : les deux valeurs sont possibles.",
          es: "No se fija qué cateto es opuesto a $A$: ambos valores ocurren.",
          ja: "どちらの辺が $A$ の対辺かは決まっていないので両方ありうる。",
          zh: "哪条直角边对着 $A$ 未定，所以两个值都可能。"
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
          en: "Both legs can face A.",
          fr: "Les deux côtés peuvent faire face à A.",
          es: "Ambos catetos pueden quedar opuestos a A.",
          ja: "どちらの辺も A の対辺になりえます。",
          zh: "两条直角边都可能对着 A。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
