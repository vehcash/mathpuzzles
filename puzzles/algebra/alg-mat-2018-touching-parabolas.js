/* algebra · y = x² + c touching y² = x
   Oxford MAT 2018 (Mathematics Admissions Test), Question 1G */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-mat-2018-touching-parabolas",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2018 (Mathematics Admissions Test), Question 1G",
        fr: "MAT d’Oxford 2018 (test d’admission en mathématiques), question 1G",
        es: "MAT de Oxford 2018 (prueba de admisión de matemáticas), pregunta 1G",
        ja: "オックスフォード大学 数学入学試験 MAT 2018 問題 1G",
        zh: "牛津大学数学入学考试 MAT 2018 第 1G 题"
      },
      exams: ["mat"]
    },
    difficulty: 2,
    title: {
      en: "y = x² + c touching y² = x",
      fr: "y = x² + c tangente à y² = x",
      es: "y = x² + c tangente a y² = x",
      ja: "y = x² + c と y² = x が接する",
      zh: "y = x² + c 与 y² = x 相切"
    },
    statement: {
      en: "<b>For which of the following values of $c$ do the curves $y=x^2+c$ and $y^2=x$ meet at exactly one point, where they touch?</b>",
      fr: "<b>Pour lesquelles des valeurs suivantes de $c$ les courbes $y=x^2+c$ et $y^2=x$ ont-elles un seul point commun, où elles sont tangentes ?</b>",
      es: "<b>¿Para cuáles de los siguientes valores de $c$ las curvas $y=x^2+c$ e $y^2=x$ tienen un único punto común, donde son tangentes?</b>",
      ja: "<b>曲線 $y=x^2+c$ と $y^2=x$ がただ1点で接するのは、$c$ が次のどの値のときですか？</b>",
      zh: "<b>$c$ 取下列哪些值时，曲线 $y=x^2+c$ 与 $y^2=x$ 恰有一个公共点且在该点相切？</b>"
    },
    figureText: {
      en: "The sideways parabola y² = x and the dashed mirror line y = x. The parabola y = x² + c is added in the solution.",
      fr: "La parabole couchée y² = x et la droite miroir y = x en pointillés. La parabole y = x² + c est ajoutée dans la solution.",
      es: "La parábola tumbada y² = x y la recta espejo y = x a trazos. La parábola y = x² + c se añade en la solución.",
      ja: "横向きの放物線 y² = x と破線の対称軸 y = x。放物線 y = x² + c は解答で加えます。",
      zh: "横向抛物线 y² = x 与虚线对称轴 y = x。抛物线 y = x² + c 在解答中加上。"
    },
    hint: {
      en: "The two curves are reflections of each other in $y=x$ (once $c$ is fixed). A touching point on $y=x$ needs $x^2+c=x$ to have a double root.",
      fr: "Les deux courbes sont symétriques par rapport à $y=x$. Un point de contact sur $y=x$ exige une racine double de $x^2+c=x$.",
      es: "Las dos curvas son simétricas respecto de $y=x$. Un punto de contacto en $y=x$ exige raíz doble de $x^2+c=x$.",
      ja: "2曲線は $y=x$ について対称。$y=x$ 上で接するには $x^2+c=x$ が重解。",
      zh: "两曲线关于 $y=x$ 对称。在 $y=x$ 上相切需 $x^2+c=x$ 有重根。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.0, h: 3.0, scale: 80, pad: 18 });
      const T = F.T = axes(F, -1.2, 1.8, -1.2, 1.8);
      const q = []; for (let k = -36; k <= 36; k++) { const y = k / 28; q.push(T([y * y, y])); } F.path(q, 'graph', 'base', false);
      F.text(T([1.3, -1.14]), 'y² = x', 'len small', -36, 10);
      F.seg(T([-1.1, -1.1]), T([1.7, 1.7]), 'seg thin dashc');
      F.reveal = () => {
      plot(F, T, x => x * x + 0.25, -1.15, 1.2, 'graph', 'base', -1.2, 1.8);
      F.dot(T([0.5, 0.5])); F.text(T([0.5, 0.5]), '(½, ½)', 'len small', 30, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "point": {"fr": "point", "es": "punto", "ja": "点", "zh": "点"}
    },
    options: [
      { tex: "c=\\tfrac14", correct: true, why: {
        en: "$x^2-x+\\tfrac14=(x-\\tfrac12)^2$.",
        fr: "$x^2-x+\\tfrac14=(x-\\tfrac12)^2$.",
        es: "$x^2-x+\\tfrac14=(x-\\tfrac12)^2$.",
        ja: "$x^2-x+\\tfrac14=(x-\\tfrac12)^2$.",
        zh: "$x^2-x+\\tfrac14=(x-\\tfrac12)^2$."
      } },
      { tex: "c=0.25", correct: true, why: {
        en: "The same number.",
        fr: "Le même nombre.",
        es: "El mismo número.",
        ja: "同じ数。",
        zh: "同一个数。"
      } },
      { tex: "c=0", correct: false, why: {
        en: "They meet at $(0,0)$ and $(1,1)$.",
        fr: "Elles se coupent en $(0,0)$ et $(1,1)$.",
        es: "Se cortan en $(0,0)$ y $(1,1)$.",
        ja: "$(0,0)$ と $(1,1)$ で交わる。",
        zh: "交于 $(0,0)$ 与 $(1,1)$。"
      } },
      { tex: "c=\\tfrac12", correct: false, why: {
        en: "They do not meet at all.",
        fr: "Elles ne se rencontrent pas.",
        es: "No se cortan.",
        ja: "交わらない。",
        zh: "不相交。"
      } },
      { tex: "c=-\\tfrac14", correct: false, why: {
        en: "They cross at two points.",
        fr: "Elles se coupent en deux points.",
        es: "Se cortan en dos puntos.",
        ja: "2点で交わる。",
        zh: "交于两点。"
      } },
      { tex: "c=1", correct: false, why: {
        en: "Too high: no meeting point.",
        fr: "Trop haut : aucun point commun.",
        es: "Demasiado alto: ningún punto común.",
        ja: "高すぎて交わらない。",
        zh: "太高，无交点。"
      } },
      { tex: "c=\\tfrac18", correct: false, why: {
        en: "They cross at two points near the touching position.",
        fr: "Elles se coupent en deux points.",
        es: "Se cortan en dos puntos.",
        ja: "2点で交わる。",
        zh: "交于两点。"
      } },
      { tex: "c=-1", correct: false, why: {
        en: "Two crossings.",
        fr: "Deux intersections.",
        es: "Dos cortes.",
        ja: "2回交わる。",
        zh: "两个交点。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Symmetry",
          fr: "Symétrie",
          es: "Simetría",
          ja: "対称性",
          zh: "对称性"
        },
        lines: ["y=x^2+c\\ \\xleftrightarrow{\\ x\\leftrightarrow y\\ }\\ x=y^2+c"],
        note: {
          en: "For $c$ near $\\tfrac14$ the touching point lies on $y=x$.",
          fr: "Pour $c$ voisin de $\\tfrac14$, le point de contact est sur $y=x$.",
          es: "Para $c$ cerca de $\\tfrac14$ el punto de contacto está en $y=x$.",
          ja: "$c$ が $\\tfrac14$ 付近なら接点は $y=x$ 上。",
          zh: "$c$ 接近 $\\tfrac14$ 时切点在 $y=x$ 上。"
        }
      },
      {
        title: {
          en: "Double root on y = x",
          fr: "Racine double sur y = x",
          es: "Raíz doble en y = x",
          ja: "y = x 上の重解",
          zh: "y = x 上的重根"
        },
        lines: ["x^2-x+c=0,\\ \\ \\Delta=1-4c=0\\;\\Rightarrow\\;c=\\tfrac14,\\ \\text{point}\\ \\left(\\tfrac12,\\tfrac12\\right)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "Check: $\\left(\\tfrac12\\right)^2=\\tfrac14=x$. ✓",
          fr: "Vérification : $\\left(\\tfrac12\\right)^2=\\tfrac14=x$. ✓",
          es: "Comprobación: $\\left(\\tfrac12\\right)^2=\\tfrac14=x$. ✓",
          ja: "確認：$\\left(\\tfrac12\\right)^2=\\tfrac14=x$。✓",
          zh: "验证：$\\left(\\tfrac12\\right)^2=\\tfrac14=x$。✓"
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
