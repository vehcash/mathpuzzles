/* geometry · A hyperbola from two lengths
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-hyperbola-13-and-10",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 12",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 12",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 12",
        ja: "2024年 中国・高考 新課程標準I卷 第12問",
        zh: "2024年高考数学新课标I卷 第12题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A hyperbola from two lengths",
      fr: "Une hyperbole à partir de deux longueurs",
      es: "Una hipérbola a partir de dos longitudes",
      ja: "2つの長さから双曲線",
      zh: "由两段长度求双曲线"
    },
    statement: {
      en: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) has foci $F_1$ (left) and $F_2$ (right). The line through $F_2$ parallel to the $y$-axis meets $C$ at $A$ and $B$, with $|F_1A|=13$ and $|AB|=10$. <b>Which of the following equal the eccentricity of $C$?</b>",
      fr: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) a pour foyers $F_1$ (gauche) et $F_2$ (droite). La droite passant par $F_2$ parallèle à l’axe des $y$ coupe $C$ en $A$ et $B$, avec $|F_1A|=13$ et $|AB|=10$. <b>Lesquelles des valeurs suivantes sont égales à l’excentricité de $C$ ?</b>",
      es: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) tiene focos $F_1$ (izquierdo) y $F_2$ (derecho). La recta por $F_2$ paralela al eje $y$ corta a $C$ en $A$ y $B$, con $|F_1A|=13$ y $|AB|=10$. <b>¿Cuáles de los siguientes valores son iguales a la excentricidad de $C$?</b>",
      ja: "双曲線 $C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）の左右の焦点を $F_1,F_2$ とします。$F_2$ を通り $y$ 軸に平行な直線が $C$ と $A,B$ で交わり、$|F_1A|=13$、$|AB|=10$ です。<b>$C$ の離心率に等しいものはどれですか？</b>",
      zh: "双曲线 $C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）的左、右焦点为 $F_1,F_2$。过 $F_2$ 且平行于 $y$ 轴的直线交 $C$ 于 $A,B$，$|F_1A|=13$，$|AB|=10$。<b>下列哪些等于 $C$ 的离心率？</b>"
    },
    figureText: {
      en: "Both branches of the hyperbola, the foci F₁ and F₂, and the vertical chord AB through F₂; F₁A is drawn and labelled 13, AB is labelled 10.",
      fr: "Les deux branches de l’hyperbole, les foyers F₁ et F₂ et la corde verticale AB passant par F₂ ; F₁A est tracé avec 13, AB porte 10.",
      es: "Las dos ramas de la hipérbola, los focos F₁ y F₂ y la cuerda vertical AB por F₂; F₁A está trazado con 13 y AB lleva 10.",
      ja: "双曲線の両枝、焦点 F₁, F₂、F₂ を通る縦の弦 AB。F₁A に 13、AB に 10 と記入。",
      zh: "双曲线两支，焦点 F₁、F₂，过 F₂ 的竖直弦 AB；F₁A 标 13，AB 标 10。"
    },
    hint: {
      en: "Then $|F_2A|=5$, and the hyperbola’s definition gives $|F_1A|-|F_2A|=2a$.",
      fr: "Alors $|F_2A|=5$, et la définition de l’hyperbole donne $|F_1A|-|F_2A|=2a$.",
      es: "Entonces $|F_2A|=5$ y la definición de hipérbola da $|F_1A|-|F_2A|=2a$.",
      ja: "$|F_2A|=5$。定義より $|F_1A|-|F_2A|=2a$。",
      zh: "于是 $|F_2A|=5$，由定义 $|F_1A|-|F_2A|=2a$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 17.8, h: 12.8, scale: 22, pad: 16 });
      const T = F.T = axes(F, -8.6, 9.2, -6.4, 6.4);
      const a = 4, b = Math.sqrt(20), c = 6;
      [1, -1].forEach(s => { const p = []; for (let k = -40; k <= 40; k++) { const t = 1.12 * k / 40; p.push(T([s * a * Math.cosh(t), b * Math.sinh(t)])); } F.path(p, 'graph', 'base', false); });
      const A = [c, 5], B = [c, -5], F1 = [-c, 0], F2 = [c, 0];
      F.seg(T(A), T(B), 'hl yellow'); F.seg(T(F1), T(A), 'hl pink');
      [F1, F2, A, B].forEach(P => F.dot(T(P)));
      F.text(T(F1), 'F₁', 'pt', -4, 16); F.text(T(F2), 'F₂', 'pt', 14, 14); F.text(T(A), 'A', 'pt', 14, 12); F.text(T(B), 'B', 'pt', 14, -10);
      F.text(T([0, 2.5]), '13', 'len', 0, -12); F.text(T([c, -2.5]), '10', 'len', 16, 0);
      F.reveal = () => {
      F.text(T([c, 2.5]), '5', 'len small', -12, 0); F.text(T([0, 0]), '2c = 12', 'len small', -36, 14);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac32", correct: true, why: {
        en: "$a=4$, $c=6$, so $e=\\tfrac64=\\tfrac32$.",
        fr: "$a=4$, $c=6$, so $e=\\tfrac64=\\tfrac32$.",
        es: "$a=4$, $c=6$, so $e=\\tfrac64=\\tfrac32$.",
        ja: "$a=4$, $c=6$, so $e=\\tfrac64=\\tfrac32$.",
        zh: "$a=4$, $c=6$, so $e=\\tfrac64=\\tfrac32$."
      } },
      { tex: "1.5", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{\\sqrt5}{2}", correct: false, why: {
        en: "That is $\\tfrac ba=\\tfrac{\\sqrt{20}}4$, not $\\tfrac ca$.",
        fr: "C’est $\\tfrac ba=\\tfrac{\\sqrt{20}}4$, pas $\\tfrac ca$.",
        es: "Es $\\tfrac ba=\\tfrac{\\sqrt{20}}4$, no $\\tfrac ca$.",
        ja: "$\\tfrac ba=\\tfrac{\\sqrt{20}}4$ であり $\\tfrac ca$ ではない。",
        zh: "那是 $\\tfrac ba=\\tfrac{\\sqrt{20}}4$，不是 $\\tfrac ca$。"
      } },
      { tex: "\\tfrac{13}{12}", correct: false, why: {
        en: "This divides $|F_1A|$ by $|F_1F_2|$.",
        fr: "Cela divise $|F_1A|$ par $|F_1F_2|$.",
        es: "Divide $|F_1A|$ entre $|F_1F_2|$.",
        ja: "$|F_1A|$ を $|F_1F_2|$ で割っている。",
        zh: "这是 $|F_1A|$ 除以 $|F_1F_2|$。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac54", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{13}{5}", correct: false, why: {
        en: "Ratio of the two focal distances of $A$, not $c/a$.",
        fr: "Rapport des deux distances focales de $A$, pas $c/a$.",
        es: "Razón de las dos distancias focales de $A$, no $c/a$.",
        ja: "$A$ の2つの焦点距離の比で、$c/a$ ではない。",
        zh: "$A$ 到两焦点距离之比，不是 $c/a$。"
      } },
      { tex: "3", correct: false, why: {
        en: "This takes $2a=4$ instead of $8$.",
        fr: "Cela prend $2a=4$ au lieu de $8$.",
        es: "Toma $2a=4$ en lugar de $8$.",
        ja: "$2a=8$ を $4$ としている。",
        zh: "把 $2a=8$ 当成了 $4$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Half the chord",
          fr: "La moitié de la corde",
          es: "La mitad de la cuerda",
          ja: "弦の半分",
          zh: "半弦"
        },
        lines: ["|F_2A|=\\tfrac12|AB|=5"],
        note: {
          en: "$AB$ is symmetric about the $x$-axis.",
          fr: "$AB$ est symétrique par rapport à l’axe des $x$.",
          es: "$AB$ es simétrica respecto del eje $x$.",
          ja: "$AB$ は $x$ 軸に関して対称。",
          zh: "$AB$ 关于 $x$ 轴对称。"
        }
      },
      {
        title: {
          en: "Definition of the hyperbola",
          fr: "Définition de l’hyperbole",
          es: "Definición de hipérbola",
          ja: "双曲線の定義",
          zh: "双曲线定义"
        },
        lines: ["2a=|F_1A|-|F_2A|=13-5=8,\\qquad a=4"],
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
          en: "Right triangle",
          fr: "Triangle rectangle",
          es: "Triángulo rectángulo",
          ja: "直角三角形",
          zh: "直角三角形"
        },
        lines: ["(2c)^2=13^2-5^2=144,\\qquad c=6", "e=\\frac ca=\\boxed{\\tfrac32}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The angle at $F_2$ is right because $AB\\perp F_1F_2$.",
          fr: "L’angle en $F_2$ est droit car $AB\\perp F_1F_2$.",
          es: "El ángulo en $F_2$ es recto porque $AB\\perp F_1F_2$.",
          ja: "$AB\\perp F_1F_2$ なので $F_2$ の角は直角。",
          zh: "因为 $AB\\perp F_1F_2$，$F_2$ 处为直角。"
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
