/* geometry · A right angle at the focus
   Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-hyperbola-right-angle-at-focus",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper I (新课标I卷), Question 16",
        fr: "Gaokao 2023, épreuve nationale I (新课标I卷), question 16",
        es: "Gaokao 2023, examen nacional I (新课标I卷), pregunta 16",
        ja: "2023年 中国・高考 新課程標準I卷 第16問",
        zh: "2023年高考数学新课标I卷 第16题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A right angle at the focus",
      fr: "Un angle droit au foyer",
      es: "Un ángulo recto en el foco",
      ja: "焦点での直角",
      zh: "焦点处的直角"
    },
    statement: {
      en: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) has foci $F_1,F_2$. $A$ is on $C$ and $B$ on the $y$-axis, with $\\overrightarrow{F_1A}\\perp\\overrightarrow{F_1B}$ and $\\overrightarrow{F_2A}=-\\tfrac23\\overrightarrow{F_2B}$. <b>Which of the following equal the eccentricity of $C$?</b>",
      fr: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) a pour foyers $F_1,F_2$. $A$ est sur $C$ et $B$ sur l’axe des $y$, avec $\\overrightarrow{F_1A}\\perp\\overrightarrow{F_1B}$ et $\\overrightarrow{F_2A}=-\\tfrac23\\overrightarrow{F_2B}$. <b>Lesquelles des valeurs suivantes sont égales à l’excentricité de $C$ ?</b>",
      es: "$C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$ ($a,b>0$) tiene focos $F_1,F_2$. $A$ está en $C$ y $B$ en el eje $y$, con $\\overrightarrow{F_1A}\\perp\\overrightarrow{F_1B}$ y $\\overrightarrow{F_2A}=-\\tfrac23\\overrightarrow{F_2B}$. <b>¿Cuáles de los siguientes valores son iguales a la excentricidad de $C$?</b>",
      ja: "双曲線 $C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）の焦点を $F_1,F_2$ とします。$A$ は $C$ 上、$B$ は $y$ 軸上の点で、$\\overrightarrow{F_1A}\\perp\\overrightarrow{F_1B}$、$\\overrightarrow{F_2A}=-\\tfrac23\\overrightarrow{F_2B}$ です。<b>$C$ の離心率に等しいものはどれですか？</b>",
      zh: "双曲线 $C:\\ \\dfrac{x^2}{a^2}-\\dfrac{y^2}{b^2}=1$（$a,b>0$）的焦点为 $F_1,F_2$，点 $A$ 在 $C$ 上，点 $B$ 在 $y$ 轴上，$\\overrightarrow{F_1A}\\perp\\overrightarrow{F_1B}$，$\\overrightarrow{F_2A}=-\\tfrac23\\overrightarrow{F_2B}$。<b>下列哪些等于 $C$ 的离心率？</b>"
    },
    figureText: {
      en: "The hyperbola with foci F₁, F₂; B on the y-axis and A on the right branch, with A, F₂, B on one line and a right angle at F₁ between F₁A and F₁B.",
      fr: "L’hyperbole de foyers F₁, F₂ ; B sur l’axe des y et A sur la branche droite, A, F₂, B alignés et un angle droit en F₁ entre F₁A et F₁B.",
      es: "La hipérbola con focos F₁, F₂; B en el eje y y A en la rama derecha, con A, F₂, B alineados y un ángulo recto en F₁ entre F₁A y F₁B.",
      ja: "焦点 F₁, F₂ の双曲線。B は y 軸上、A は右の枝上で A, F₂, B は一直線、F₁ で F₁A と F₁B が直交。",
      zh: "焦点为 F₁、F₂ 的双曲线；B 在 y 轴上，A 在右支上，A、F₂、B 共线，F₁ 处 F₁A ⊥ F₁B。"
    },
    hint: {
      en: "Set $F_{1,2}=(\\mp c,0)$, $B=(0,t)$. The vector condition gives $A$ in terms of $c$ and $t$; the right angle gives $t^2$.",
      fr: "Posez $F_{1,2}=(\\mp c,0)$, $B=(0,t)$. La relation vectorielle donne $A$ en fonction de $c$ et $t$ ; l’angle droit donne $t^2$.",
      es: "Pon $F_{1,2}=(\\mp c,0)$, $B=(0,t)$. La relación vectorial da $A$ en función de $c$ y $t$; el ángulo recto da $t^2$.",
      ja: "$F_{1,2}=(\\mp c,0)$、$B=(0,t)$ とおく。ベクトル条件で $A$ を表し、直角条件で $t^2$ を求める。",
      zh: "设 $F_{1,2}=(\\mp c,0)$，$B=(0,t)$。由向量关系得 $A$，由垂直得 $t^2$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 12.0, h: 13.0, scale: 24, pad: 16 });
      const T = F.T = axes(F, -5.5, 6.5, -6.0, 7.0);
      const a = Math.sqrt(5), b = 2, c = 3;
      [1, -1].forEach(s => { const p = []; for (let k = -40; k <= 40; k++) { const u = 1.6 * k / 40; p.push(T([s * a * Math.cosh(u), b * Math.sinh(u)])); } F.path(p, 'graph', 'base', false); });
      const F1 = [-c, 0], F2 = [c, 0], B = [0, 6], A = [5, -4];
      F.seg(T(B), T(A), 'seg'); F.seg(T(F1), T(A), 'hl pink'); F.seg(T(F1), T(B), 'hl pink');
      [F1, F2, A, B].forEach(P => F.dot(T(P)));
      F.text(T(F1), 'F₁', 'pt', -14, 14); F.text(T(F2), 'F₂', 'pt', 14, -8); F.text(T(A), 'A', 'pt', -8, 14); F.text(T(B), 'B', 'pt', -14, -2);
      F.reveal = () => {
      F.text(T([1.5, 3]), 'BF₂ : F₂A = 3 : 2', 'len small', 64, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "BF₂ : F₂A = 3 : 2": {"fr": "BF₂ : F₂A = 3 : 2", "es": "BF₂ : F₂A = 3 : 2", "ja": "BF₂ : F₂A = 3 : 2", "zh": "BF₂ : F₂A = 3 : 2"}
    },
    options: [
      { tex: "\\tfrac{3\\sqrt5}{5}", correct: true, why: {
        en: "$e^2=\\tfrac95$.",
        fr: "$e^2=\\tfrac95$.",
        es: "$e^2=\\tfrac95$.",
        ja: "$e^2=\\tfrac95$。",
        zh: "$e^2=\\tfrac95$。"
      } },
      { tex: "\\tfrac{3}{\\sqrt5}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac{\\sqrt5}{5}", correct: false, why: {
        en: "That is the root $e^2=\\tfrac15$, impossible for a hyperbola ($e>1$).",
        fr: "C’est la racine $e^2=\\tfrac15$, impossible pour une hyperbole ($e>1$).",
        es: "Es la raíz $e^2=\\tfrac15$, imposible para una hipérbola ($e>1$).",
        ja: "$e^2=\\tfrac15$ の解で、双曲線では不可（$e>1$）。",
        zh: "那是 $e^2=\\tfrac15$ 的根，双曲线 $e>1$，舍去。"
      } },
      { tex: "\\tfrac95", correct: false, why: {
        en: "That is $e^2$.",
        fr: "C’est $e^2$.",
        es: "Es $e^2$.",
        ja: "$e^2$ の値。",
        zh: "那是 $e^2$。"
      } },
      { tex: "\\sqrt5", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac53", correct: false, why: {
        en: "That is the $x$-coordinate of $A$ divided by $c$.",
        fr: "C’est l’abscisse de $A$ divisée par $c$.",
        es: "Es la abscisa de $A$ dividida entre $c$.",
        ja: "$A$ の $x$ 座標を $c$ で割った値。",
        zh: "那是 $A$ 的横坐标除以 $c$。"
      } },
      { tex: "\\tfrac32", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "2", correct: false, why: {
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
          en: "Locate A",
          fr: "Placer A",
          es: "Situar A",
          ja: "A の位置",
          zh: "确定 A"
        },
        lines: ["\\overrightarrow{F_2A}=-\\tfrac23(-c,t)\\ \\Rightarrow\\ A=\\bigl(\\tfrac53c,\\,-\\tfrac23t\\bigr)"],
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
          en: "Right angle at F₁",
          fr: "Angle droit en F₁",
          es: "Ángulo recto en F₁",
          ja: "F₁ での直角",
          zh: "F₁ 处的直角"
        },
        lines: ["\\bigl(\\tfrac83c,-\\tfrac23t\\bigr)\\cdot(c,t)=\\tfrac83c^2-\\tfrac23t^2=0\\ \\Rightarrow\\ t^2=4c^2"],
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
          en: "A is on C",
          fr: "A est sur C",
          es: "A está en C",
          ja: "A は C 上",
          zh: "A 在 C 上"
        },
        lines: ["\\frac{25c^2}{9a^2}-\\frac{16c^2}{9b^2}=1\\ \\Rightarrow\\ 25e^4-50e^2+9=0", "e^2=\\tfrac95\\ \\Rightarrow\\ e=\\boxed{\\tfrac{3\\sqrt5}{5}}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "The other root $e^2=\\tfrac15$ is less than $1$. The figure uses $a=\\sqrt5$, $c=3$: $A=(5,-4)$, $B=(0,6)$.",
          fr: "L’autre racine $e^2=\\tfrac15$ est inférieure à $1$. La figure prend $a=\\sqrt5$, $c=3$ : $A=(5,-4)$, $B=(0,6)$.",
          es: "La otra raíz $e^2=\\tfrac15$ es menor que $1$. La figura usa $a=\\sqrt5$, $c=3$: $A=(5,-4)$, $B=(0,6)$.",
          ja: "もう一方の $e^2=\\tfrac15$ は $1$ 未満。図は $a=\\sqrt5$、$c=3$：$A=(5,-4)$、$B=(0,6)$。",
          zh: "另一根 $e^2=\\tfrac15<1$ 舍去。图中 $a=\\sqrt5$，$c=3$：$A=(5,-4)$，$B=(0,6)$。"
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
