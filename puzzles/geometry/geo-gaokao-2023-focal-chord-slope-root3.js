/* geometry · A focal chord of slope −√3
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-focal-chord-slope-root3",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 10",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 10",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 10",
        ja: "2023年 中国・高考 新課程標準II卷 第10問",
        zh: "2023年高考数学新课标II卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "A focal chord of slope −√3",
      fr: "Une corde focale de pente −√3",
      es: "Una cuerda focal de pendiente −√3",
      ja: "傾き −√3 の焦点弦",
      zh: "斜率为 −√3 的焦点弦"
    },
    statement: {
      en: "The line $y=-\\sqrt3(x-1)$ passes through the focus of $C:\\ y^2=2px$ ($p>0$) and meets $C$ at $M$ and $N$. $l$ is the directrix and $O$ the origin. <b>Which of the following statements are true?</b>",
      fr: "La droite $y=-\\sqrt3(x-1)$ passe par le foyer de $C:\\ y^2=2px$ ($p>0$) et coupe $C$ en $M$ et $N$. $l$ est la directrice et $O$ l’origine. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "La recta $y=-\\sqrt3(x-1)$ pasa por el foco de $C:\\ y^2=2px$ ($p>0$) y corta $C$ en $M$ y $N$. $l$ es la directriz y $O$ el origen. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "直線 $y=-\\sqrt3(x-1)$ は放物線 $C:\\ y^2=2px$（$p>0$）の焦点を通り、$C$ と $M,N$ で交わります。$l$ は準線、$O$ は原点です。<b>次のうち正しいものはどれですか？</b>",
      zh: "直线 $y=-\\sqrt3(x-1)$ 过抛物线 $C:\\ y^2=2px$（$p>0$）的焦点，且与 $C$ 交于 $M,N$ 两点，$l$ 为 $C$ 的准线，$O$ 为坐标原点。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "The line y = −√3(x − 1) crossing the x-axis at (1, 0), where the focus must be.",
      fr: "La droite y = −√3(x − 1) qui coupe l’axe des x en (1, 0), où doit se trouver le foyer.",
      es: "La recta y = −√3(x − 1) que corta el eje x en (1, 0), donde debe estar el foco.",
      ja: "直線 y = −√3(x − 1) は x 軸と (1, 0) で交わり、そこが焦点。",
      zh: "直线 y = −√3(x − 1) 交 x 轴于 (1, 0)，焦点就在那里。"
    },
    hint: {
      en: "The focus $(\\tfrac p2,0)$ is where the line meets the $x$-axis. For a focal chord, $|MN|=x_M+x_N+p$.",
      fr: "Le foyer $(\\tfrac p2,0)$ est là où la droite coupe l’axe des $x$. Pour une corde focale, $|MN|=x_M+x_N+p$.",
      es: "El foco $(\\tfrac p2,0)$ es donde la recta corta el eje $x$. Para una cuerda focal, $|MN|=x_M+x_N+p$.",
      ja: "焦点 $(\\tfrac p2,0)$ は直線と $x$ 軸の交点。焦点弦は $|MN|=x_M+x_N+p$。",
      zh: "焦点 $(\\tfrac p2,0)$ 是直线与 $x$ 轴交点。焦点弦 $|MN|=x_M+x_N+p$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 6.6, scale: 40, pad: 16 });
      const T = F.T = axes(F, -1.8, 4.2, -3.8, 2.8);
      F.seg(T([-0.6, -Math.sqrt(3) * (-0.6 - 1)]), T([3.2, -Math.sqrt(3) * (3.2 - 1)]), 'seg'); F.dot(T([1, 0])); F.text(T([1, 0]), '(1, 0)', 'len small', 26, -8);
      F.reveal = () => {
      const p = []; for (let k = 0; k <= 80; k++) { const y = -3.7 + 6.4 * k / 80; p.push(T([y * y / 4, y])); } F.path(p, 'graph', 'base', false);
      F.seg(T([-1, -3.7]), T([-1, 2.7]), 'seg thin dashc'); F.text(T([-1, 2.4]), 'l', 'pt', -10, 0);
      const M = [3, -2 * Math.sqrt(3)], Nn = [1 / 3, 2 * Math.sqrt(3) / 3]; F.dot(T(M)); F.dot(T(Nn)); F.text(T(M), 'M', 'pt', 12, 4); F.text(T(Nn), 'N', 'pt', -4, -12);
      { const cx = 5 / 3, cy = -2 / Math.sqrt(3), r = 8 / 3, cls = 'hl pink'; const C = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; C.push(T([cx + r * Math.cos(t), cy + r * Math.sin(t)])); } F.path(C, cls, 'base', true); }
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "the circle on diameter": {"fr": "le cercle de diamètre", "es": "la circunferencia de diámetro", "ja": "直径", "zh": "以"},
      "is tangent to": {"fr": "est tangent à", "es": "es tangente a", "ja": "の円は次に接する：", "zh": "为直径的圆与下列相切："},
      "is isosceles": {"fr": "est isocèle", "es": "es isósceles", "ja": "は二等辺三角形", "zh": "是等腰三角形"},
      "passes through": {"fr": "passe par", "es": "pasa por", "ja": "の円は次を通る：", "zh": "为直径的圆经过"},
      "centre": {"fr": "centre", "es": "centro", "ja": "中心", "zh": "圆心"},
      "radius": {"fr": "rayon", "es": "radio", "ja": "半径", "zh": "半径"}
    },
    options: [
      { tex: "p=2", correct: true, why: {
        en: "The line meets the $x$-axis at $(1,0)=(\\tfrac p2,0)$.",
        fr: "La droite coupe l’axe des $x$ en $(1,0)=(\\tfrac p2,0)$.",
        es: "La recta corta el eje $x$ en $(1,0)=(\\tfrac p2,0)$.",
        ja: "直線と $x$ 軸の交点 $(1,0)=(\\tfrac p2,0)$。",
        zh: "直线交 $x$ 轴于 $(1,0)=(\\tfrac p2,0)$。"
      } },
      { tex: "\\text{the circle on diameter}\\ MN\\ \\text{is tangent to}\\ l", correct: true, why: {
        en: "Its radius $\\tfrac{|MN|}2=\\tfrac83$ equals the distance from its centre $x=\\tfrac53$ to $x=-1$.",
        fr: "Son rayon $\\tfrac{|MN|}2=\\tfrac83$ égale la distance de son centre $x=\\tfrac53$ à $x=-1$.",
        es: "Su radio $\\tfrac{|MN|}2=\\tfrac83$ es la distancia de su centro $x=\\tfrac53$ a $x=-1$.",
        ja: "半径 $\\tfrac{|MN|}2=\\tfrac83$ は中心 $x=\\tfrac53$ から $x=-1$ までの距離に等しい。",
        zh: "半径 $\\tfrac{|MN|}2=\\tfrac83$ 等于圆心 $x=\\tfrac53$ 到 $x=-1$ 的距离。"
      } },
      { tex: "|MN|=\\tfrac83", correct: false, why: {
        en: "That is half of it: $|MN|=3+\\tfrac13+2=\\tfrac{16}3$.",
        fr: "C’est la moitié : $|MN|=3+\\tfrac13+2=\\tfrac{16}3$.",
        es: "Es la mitad: $|MN|=3+\\tfrac13+2=\\tfrac{16}3$.",
        ja: "半分。$|MN|=3+\\tfrac13+2=\\tfrac{16}3$。",
        zh: "那是一半：$|MN|=3+\\tfrac13+2=\\tfrac{16}3$。"
      } },
      { tex: "\\triangle OMN\\ \\text{is isosceles}", correct: false, why: {
        en: "$|OM|=\\sqrt{21}$, $|ON|=\\tfrac{\\sqrt{13}}3$, $|MN|=\\tfrac{16}3$: all different.",
        fr: "$|OM|=\\sqrt{21}$, $|ON|=\\tfrac{\\sqrt{13}}3$, $|MN|=\\tfrac{16}3$ : tous différents.",
        es: "$|OM|=\\sqrt{21}$, $|ON|=\\tfrac{\\sqrt{13}}3$, $|MN|=\\tfrac{16}3$: todos distintos.",
        ja: "$|OM|=\\sqrt{21}$、$|ON|=\\tfrac{\\sqrt{13}}3$、$|MN|=\\tfrac{16}3$ ですべて異なる。",
        zh: "$|OM|=\\sqrt{21}$，$|ON|=\\tfrac{\\sqrt{13}}3$，$|MN|=\\tfrac{16}3$，互不相等。"
      } },
      { tex: "p=1", correct: false, why: {
        en: "That puts the focus at $(\\tfrac12,0)$, not on the line.",
        fr: "Le foyer serait en $(\\tfrac12,0)$, hors de la droite.",
        es: "El foco estaría en $(\\tfrac12,0)$, fuera de la recta.",
        ja: "焦点が $(\\tfrac12,0)$ になり直線上にない。",
        zh: "焦点会在 $(\\tfrac12,0)$，不在直线上。"
      } },
      { tex: "|MN|=\\tfrac{10}3", correct: false, why: {
        en: "That is $x_M+x_N$ without the $+p$.",
        fr: "C’est $x_M+x_N$ sans le $+p$.",
        es: "Es $x_M+x_N$ sin el $+p$.",
        ja: "$+p$ を忘れた $x_M+x_N$。",
        zh: "那是 $x_M+x_N$，漏了 $+p$。"
      } },
      { tex: "\\text{the circle on diameter}\\ MN\\ \\text{passes through}\\ O", correct: false, why: {
        en: "$\\overrightarrow{OM}\\cdot\\overrightarrow{ON}=1-4=-3\\ne0$.",
        fr: "$\\overrightarrow{OM}\\cdot\\overrightarrow{ON}=1-4=-3\\ne0$.",
        es: "$\\overrightarrow{OM}\\cdot\\overrightarrow{ON}=1-4=-3\\ne0$.",
        ja: "$\\overrightarrow{OM}\\cdot\\overrightarrow{ON}=1-4=-3\\ne0$。",
        zh: "$\\overrightarrow{OM}\\cdot\\overrightarrow{ON}=1-4=-3\\ne0$。"
      } },
      { tex: "x_Mx_N=2", correct: false, why: {
        en: "For a focal chord $x_Mx_N=\\tfrac{p^2}4=1$.",
        fr: "Pour une corde focale $x_Mx_N=\\tfrac{p^2}4=1$.",
        es: "En una cuerda focal $x_Mx_N=\\tfrac{p^2}4=1$.",
        ja: "焦点弦では $x_Mx_N=\\tfrac{p^2}4=1$。",
        zh: "焦点弦满足 $x_Mx_N=\\tfrac{p^2}4=1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "The focus",
          fr: "Le foyer",
          es: "El foco",
          ja: "焦点",
          zh: "焦点"
        },
        lines: ["\\tfrac p2=1\\ \\Rightarrow\\ p=2,\\qquad C:\\ y^2=4x,\\quad l:\\ x=-1"],
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
          en: "Intersections",
          fr: "Intersections",
          es: "Intersecciones",
          ja: "交点",
          zh: "交点"
        },
        lines: ["3(x-1)^2=4x\\ \\Rightarrow\\ 3x^2-10x+3=0,\\quad x=3,\\ \\tfrac13", "|MN|=3+\\tfrac13+2=\\tfrac{16}3"],
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
          en: "The circle on MN",
          fr: "Le cercle sur MN",
          es: "La circunferencia sobre MN",
          ja: "MN を直径とする円",
          zh: "以 MN 为直径的圆"
        },
        lines: ["\\text{centre}\\ x=\\tfrac53,\\ \\text{radius}\\ \\tfrac83=\\tfrac53-(-1)"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "True for every focal chord: the midpoint’s distance to $l$ is the average of $|MF|$ and $|NF|$.",
          fr: "Vrai pour toute corde focale : la distance du milieu à $l$ est la moyenne de $|MF|$ et $|NF|$.",
          es: "Cierto para toda cuerda focal: la distancia del punto medio a $l$ es la media de $|MF|$ y $|NF|$.",
          ja: "どの焦点弦でも成り立つ：中点と $l$ の距離は $|MF|$ と $|NF|$ の平均。",
          zh: "对任何焦点弦都成立：中点到 $l$ 的距离是 $|MF|$、$|NF|$ 的平均。"
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
          en: "Exactly two options are true here.",
          fr: "Exactement deux options sont vraies ici.",
          es: "Aquí hay exactamente dos opciones verdaderas.",
          ja: "ここで正しいのはちょうど2つ。",
          zh: "这里恰有两个正确选项。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
