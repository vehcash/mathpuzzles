/* geometry · A circle centred at the focus
   Gaokao 2024, Tianjin paper (天津卷), Question 12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-tj-circle-and-parabola",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 12",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 12",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 12",
        ja: "2024年 中国・高考 天津卷 第12問",
        zh: "2024年高考数学天津卷 第12题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A circle centred at the focus",
      fr: "Un cercle centré au foyer",
      es: "Una circunferencia centrada en el foco",
      ja: "焦点を中心とする円",
      zh: "以焦点为圆心的圆"
    },
    statement: {
      en: "The centre of $(x-1)^2+y^2=25$ is the focus $F$ of $y^2=2px$. The two curves meet in the first quadrant at $A$. <b>Which of the following equal the distance from the origin to the line $AF$?</b>",
      fr: "Le centre de $(x-1)^2+y^2=25$ est le foyer $F$ de $y^2=2px$. Les deux courbes se coupent dans le premier quadrant en $A$. <b>Lesquelles des valeurs suivantes sont égales à la distance de l’origine à la droite $AF$ ?</b>",
      es: "El centro de $(x-1)^2+y^2=25$ es el foco $F$ de $y^2=2px$. Las dos curvas se cortan en el primer cuadrante en $A$. <b>¿Cuáles de los siguientes valores son iguales a la distancia del origen a la recta $AF$?</b>",
      ja: "円 $(x-1)^2+y^2=25$ の中心は放物線 $y^2=2px$ の焦点 $F$ で、2曲線は第1象限の点 $A$ で交わります。<b>原点から直線 $AF$ までの距離に等しいものはどれですか？</b>",
      zh: "圆 $(x-1)^2+y^2=25$ 的圆心与抛物线 $y^2=2px$ 的焦点 $F$ 重合，两曲线在第一象限交于点 $A$。<b>下列哪些等于原点到直线 $AF$ 的距离？</b>"
    },
    figureText: {
      en: "The circle of radius 5 centred at F(1, 0).",
      fr: "Le cercle de rayon 5 centré en F(1, 0).",
      es: "La circunferencia de radio 5 con centro F(1, 0).",
      ja: "中心 F(1, 0)・半径 5 の円。",
      zh: "以 F(1, 0) 为圆心、半径 5 的圆。"
    },
    hint: {
      en: "$\\tfrac p2=1$. Substitute $y^2=4x$ into the circle.",
      fr: "$\\tfrac p2=1$. Remplacez $y^2=4x$ dans le cercle.",
      es: "$\\tfrac p2=1$. Sustituye $y^2=4x$ en la circunferencia.",
      ja: "$\\tfrac p2=1$。$y^2=4x$ を円の式に代入。",
      zh: "$\\tfrac p2=1$，把 $y^2=4x$ 代入圆方程。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 11.6, h: 11.6, scale: 24, pad: 16 });
      const T = F.T = axes(F, -4.8, 6.8, -5.8, 5.8);
      { const cx = 1, cy = 0, r = 5, cls = 'graph'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      F.dot(T([1, 0])); F.text(T([1, 0]), 'F', 'pt', 8, 14);
      F.reveal = () => {
      const p = []; for (let k = 0; k <= 60; k++) { const y = -4.8 + 9.6 * k / 60; p.push(T([y * y / 4, y])); } F.path(p, 'hl pink', 'base', false);
      F.dot(T([4, 4])); F.text(T([4, 4]), 'A', 'pt', 10, -8); F.seg(T([-1, -8 / 3]), T([5.5, 6]), 'seg');
      F.seg(T([0, 0]), T([0.64, -0.48]), 'hl yellow'); F.text(T([0.32, -0.24]), '4/5', 'len small', -18, 10);
      };
      return F;
    },
    options: [
      { tex: "\\tfrac45", correct: true, why: {
        en: "$A=(4,4)$, line $4x-3y-4=0$, distance $\\tfrac{4}{5}$.",
        fr: "$A=(4,4)$, droite $4x-3y-4=0$, distance $\\tfrac45$.",
        es: "$A=(4,4)$, recta $4x-3y-4=0$, distancia $\\tfrac45$.",
        ja: "$A=(4,4)$、直線 $4x-3y-4=0$、距離 $\\tfrac45$。",
        zh: "$A=(4,4)$，直线 $4x-3y-4=0$，距离 $\\tfrac45$。"
      } },
      { tex: "0.8", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac35", correct: false, why: {
        en: "That is $|OF|\\cos\\theta$, not $|OF|\\sin\\theta$.",
        fr: "C’est $|OF|\\cos\\theta$, pas $|OF|\\sin\\theta$.",
        es: "Es $|OF|\\cos\\theta$, no $|OF|\\sin\\theta$.",
        ja: "$|OF|\\cos\\theta$ であり $|OF|\\sin\\theta$ ではない。",
        zh: "那是 $|OF|\\cos\\theta$，不是 $|OF|\\sin\\theta$。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $|OF|$, measured along the axis.",
        fr: "C’est $|OF|$, le long de l’axe.",
        es: "Es $|OF|$, a lo largo del eje.",
        ja: "軸に沿った $|OF|$。",
        zh: "那是沿轴的 $|OF|$。"
      } },
      { tex: "\\tfrac43", correct: false, why: {
        en: "That is the slope of $AF$.",
        fr: "C’est la pente de $AF$.",
        es: "Es la pendiente de $AF$.",
        ja: "$AF$ の傾き。",
        zh: "那是 $AF$ 的斜率。"
      } },
      { tex: "\\tfrac{4}{\\sqrt{7}}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{12}{5}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "5", correct: false, why: {
        en: "That is the radius $|AF|$.",
        fr: "C’est le rayon $|AF|$.",
        es: "Es el radio $|AF|$.",
        ja: "半径 $|AF|$。",
        zh: "那是半径 $|AF|$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The parabola",
          fr: "La parabole",
          es: "La parábola",
          ja: "放物線",
          zh: "抛物线"
        },
        lines: ["\\tfrac p2=1\\ \\Rightarrow\\ y^2=4x"],
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
          en: "Intersect",
          fr: "Intersection",
          es: "Intersección",
          ja: "交点",
          zh: "求交点"
        },
        lines: ["(x-1)^2+4x=25\\ \\Rightarrow\\ x^2+2x-24=0\\ \\Rightarrow\\ x=4,\\ A=(4,4)"],
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
          en: "Distance to the line",
          fr: "Distance à la droite",
          es: "Distancia a la recta",
          ja: "直線までの距離",
          zh: "点到直线距离"
        },
        lines: ["AF:\\ y=\\tfrac43(x-1)\\iff4x-3y-4=0,\\qquad d=\\frac{|-4|}{5}=\\boxed{\\tfrac45}"],
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
