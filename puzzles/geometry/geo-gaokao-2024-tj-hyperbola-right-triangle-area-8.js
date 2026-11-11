/* geometry · A right triangle on the foci with area 8
   Gaokao 2024, Tianjin paper (天津卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-tj-hyperbola-right-triangle-area-8",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 8",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 8",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 8",
        ja: "2024年 中国・高考 天津卷 第8問",
        zh: "2024年高考数学天津卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A right triangle on the foci with area 8",
      fr: "Un triangle rectangle sur les foyers d’aire 8",
      es: "Un triángulo rectángulo en los focos de área 8",
      ja: "焦点を含む面積 8 の直角三角形",
      zh: "含焦点、面积为 8 的直角三角形"
    },
    statement: {
      en: "$\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) has foci $F_1,F_2$. $P$ is on the right branch, line $PF_2$ has slope $2$, and $\\triangle PF_1F_2$ is a right triangle with area $8$. <b>Which of the following is the hyperbola?</b>",
      fr: "$\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) a pour foyers $F_1,F_2$. $P$ est sur la branche droite, la droite $PF_2$ a pour pente $2$, et $PF_1F_2$ est un triangle rectangle d’aire $8$. <b>Laquelle des équations suivantes est celle de l’hyperbole ?</b>",
      es: "$\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) tiene focos $F_1,F_2$. $P$ está en la rama derecha, la recta $PF_2$ tiene pendiente $2$ y $PF_1F_2$ es un triángulo rectángulo de área $8$. <b>¿Cuál de las siguientes es la hipérbola?</b>",
      ja: "双曲線 $\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）の焦点を $F_1,F_2$ とします。$P$ は右の枝上、直線 $PF_2$ の傾きは $2$、$\\triangle PF_1F_2$ は面積 $8$ の直角三角形です。<b>双曲線の方程式はどれですか？</b>",
      zh: "双曲线 $\\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）的左、右焦点为 $F_1,F_2$，$P$ 是右支上一点，直线 $PF_2$ 的斜率为 $2$，$\\triangle PF_1F_2$ 是面积为 $8$ 的直角三角形。<b>下列哪个是该双曲线的方程？</b>"
    },
    figureText: {
      en: "The foci F₁ and F₂ on the x-axis and a point P below them, with the right angle at P and PF₂ of slope 2.",
      fr: "Les foyers F₁ et F₂ sur l’axe des x et un point P en dessous, avec l’angle droit en P et PF₂ de pente 2.",
      es: "Los focos F₁ y F₂ en el eje x y un punto P debajo, con el ángulo recto en P y PF₂ de pendiente 2.",
      ja: "x 軸上の焦点 F₁, F₂ と下方の点 P。P が直角、PF₂ の傾きは 2。",
      zh: "x 轴上的焦点 F₁、F₂ 与下方一点 P，P 处为直角，PF₂ 斜率为 2。"
    },
    hint: {
      en: "With the right angle at $P$, $\\tan\\angle PF_2F_1=2$ means $|PF_1|=2|PF_2|$.",
      fr: "Avec l’angle droit en $P$, $\\tan\\angle PF_2F_1=2$ donne $|PF_1|=2|PF_2|$.",
      es: "Con el ángulo recto en $P$, $\\tan\\angle PF_2F_1=2$ da $|PF_1|=2|PF_2|$.",
      ja: "$P$ が直角なら $\\tan\\angle PF_2F_1=2$ より $|PF_1|=2|PF_2|$。",
      zh: "$P$ 处为直角，$\\tan\\angle PF_2F_1=2$ 得 $|PF_1|=2|PF_2|$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.0, h: 5.4, scale: 36, pad: 16 });
      const T = F.T = axes(F, -4.0, 4.0, -3.6, 1.8);
      const c = Math.sqrt(10), F1 = [-c, 0], F2 = [c, 0], s = 2 * Math.sqrt(2) / Math.sqrt(5), P = [c - s, -2 * s];
      F.path([T(F1), T(F2), T(P)], 'fill-yellow', 'fills', true);
      F.seg(T(F1), T(P), 'seg'); F.seg(T(F2), T(P), 'seg'); [F1, F2, P].forEach(Q => F.dot(T(Q)));
      F.text(T(F1), 'F₁', 'pt', -4, -10); F.text(T(F2), 'F₂', 'pt', 6, -10); F.text(T(P), 'P', 'pt', 0, 16);
      F.reveal = () => {
      const a = Math.SQRT2, b = 2 * Math.SQRT2; const q = []; for (let k = 0; k <= 60; k++) { const y = -3.5 + 5.2 * k / 60; q.push(T([a * Math.sqrt(1 + y * y / (b * b)), y])); } F.path(q, 'hl pink', 'base', false);
      };
      return F;
    },
    options: [
      { tex: "\\dfrac{x^2}{2}-\\dfrac{y^2}{8}=1", correct: true, why: {
        en: "$|PF_2|=2a=2\\sqrt2$, $|PF_1|=4\\sqrt2$, $4c^2=40$.",
        fr: "$|PF_2|=2a=2\\sqrt2$, $|PF_1|=4\\sqrt2$, $4c^2=40$.",
        es: "$|PF_2|=2a=2\\sqrt2$, $|PF_1|=4\\sqrt2$, $4c^2=40$.",
        ja: "$|PF_2|=2a=2\\sqrt2$、$|PF_1|=4\\sqrt2$、$4c^2=40$。",
        zh: "$|PF_2|=2a=2\\sqrt2$，$|PF_1|=4\\sqrt2$，$4c^2=40$。"
      } },
      { tex: "4x^2-y^2=8", correct: true, why: {
        en: "The same equation, multiplied by $8$.",
        fr: "La même équation multipliée par $8$.",
        es: "La misma ecuación multiplicada por $8$.",
        ja: "同じ式を $8$ 倍したもの。",
        zh: "同一方程乘以 $8$。"
      } },
      { tex: "\\dfrac{x^2}{4}-\\dfrac{y^2}{8}=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\dfrac{x^2}{8}-\\dfrac{y^2}{2}=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\dfrac{x^2}{8}-\\dfrac{y^2}{4}=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\dfrac{x^2}{8}-\\dfrac{y^2}{32}=1", correct: false, why: {
        en: "This takes $a=|PF_2|$ instead of $2a=|PF_2|$.",
        fr: "Cela prend $a=|PF_2|$ au lieu de $2a=|PF_2|$.",
        es: "Toma $a=|PF_2|$ en lugar de $2a=|PF_2|$.",
        ja: "$2a=|PF_2|$ を $a=|PF_2|$ としている。",
        zh: "把 $2a=|PF_2|$ 当成了 $a=|PF_2|$。"
      } },
      { tex: "\\dfrac{x^2}{2}-\\dfrac{y^2}{10}=1", correct: false, why: {
        en: "That uses $b^2=c^2$; subtract $a^2$.",
        fr: "Cela prend $b^2=c^2$ ; il faut retirer $a^2$.",
        es: "Toma $b^2=c^2$; hay que restar $a^2$.",
        ja: "$b^2=c^2$ としている。$a^2$ を引く。",
        zh: "误把 $b^2$ 当成 $c^2$，应减去 $a^2$。"
      } },
      { tex: "x^2-\\dfrac{y^2}{4}=1", correct: false, why: {
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
          en: "Where is the right angle?",
          fr: "Où est l’angle droit ?",
          es: "¿Dónde está el ángulo recto?",
          ja: "直角はどこ？",
          zh: "直角在哪？"
        },
        lines: ["\\angle P=90^\\circ,\\quad\\tan\\angle PF_2F_1=2\\ \\Rightarrow\\ |PF_1|=2|PF_2|"],
        note: {
          en: "A right angle at $F_2$ would make $PF_2$ vertical, not of slope $2$.",
          fr: "Un angle droit en $F_2$ rendrait $PF_2$ verticale.",
          es: "Un ángulo recto en $F_2$ haría $PF_2$ vertical.",
          ja: "$F_2$ が直角だと $PF_2$ は鉛直になる。",
          zh: "若 $F_2$ 为直角，$PF_2$ 应竖直。"
        }
      },
      {
        title: {
          en: "Area and definition",
          fr: "Aire et définition",
          es: "Área y definición",
          ja: "面積と定義",
          zh: "面积与定义"
        },
        lines: ["\\tfrac12|PF_1||PF_2|=|PF_2|^2=8\\ \\Rightarrow\\ |PF_2|=2\\sqrt2", "2a=|PF_1|-|PF_2|=2\\sqrt2\\ \\Rightarrow\\ a^2=2"],
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
          en: "Pythagoras",
          fr: "Pythagore",
          es: "Pitágoras",
          ja: "三平方の定理",
          zh: "勾股定理"
        },
        lines: ["4c^2=8+32=40,\\ c^2=10,\\ b^2=8:\\quad\\boxed{\\tfrac{x^2}2-\\tfrac{y^2}8=1}"],
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
          en: "Two options are the same equation.",
          fr: "Deux options sont la même équation.",
          es: "Dos opciones son la misma ecuación.",
          ja: "2つの選択肢は同じ方程式。",
          zh: "有两个选项是同一个方程。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
