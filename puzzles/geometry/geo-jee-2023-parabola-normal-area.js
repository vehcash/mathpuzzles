/* geometry · A normal, a focus and area 120
   JEE Advanced 2023 (India), Paper 1, Mathematics Q.7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2023-parabola-normal-area",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2023 (India), Paper 1, Mathematics Q.7",
        fr: "JEE Advanced 2023 (Inde), épreuve 1, mathématiques Q.7",
        es: "JEE Advanced 2023 (India), prueba 1, matemáticas Q.7",
        ja: "JEE Advanced 2023（インド工科大学入試）Paper 1 数学 Q.7",
        zh: "印度理工学院入学考试 JEE Advanced 2023 卷一 数学 Q.7"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A normal, a focus and area 120",
      fr: "Une normale, un foyer et une aire de 120",
      es: "Una normal, un foco y área 120",
      ja: "法線・焦点・面積120",
      zh: "法线、焦点与面积 120"
    },
    statement: {
      en: "$P$ is a point on the parabola $y^2=4ax$ ($a>0$). The normal at $P$ meets the $x$-axis at $Q$, and $F$ is the focus. The area of triangle $PFQ$ is $120$. If $a$ and the slope $m$ of the normal are both positive integers, <b>which of the following are true?</b>",
      fr: "$P$ est un point de la parabole $y^2=4ax$ ($a>0$). La normale en $P$ coupe l’axe des $x$ en $Q$, et $F$ est le foyer. L’aire du triangle $PFQ$ vaut $120$. Si $a$ et la pente $m$ de la normale sont des entiers positifs, <b>lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$P$ es un punto de la parábola $y^2=4ax$ ($a>0$). La normal en $P$ corta al eje $x$ en $Q$, y $F$ es el foco. El área del triángulo $PFQ$ es $120$. Si $a$ y la pendiente $m$ de la normal son enteros positivos, <b>¿cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$P$ は放物線 $y^2=4ax$（$a>0$）上の点。$P$ における法線が $x$ 軸と交わる点を $Q$、焦点を $F$ とし、三角形 $PFQ$ の面積は $120$ です。$a$ と法線の傾き $m$ がともに正の整数のとき、<b>次のうち正しいものはどれですか？</b>",
      zh: "$P$ 是抛物线 $y^2=4ax$（$a>0$）上一点，$P$ 处的法线交 $x$ 轴于 $Q$，$F$ 为焦点，$\\triangle PFQ$ 的面积为 $120$。若 $a$ 与法线斜率 $m$ 都是正整数，<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The parabola with focus F, a point P below the axis, and the normal at P rising to meet the x-axis at Q; triangle PFQ is shaded.",
      fr: "La parabole de foyer F, un point P sous l’axe et la normale en P qui monte couper l’axe des x en Q ; le triangle PFQ est grisé.",
      es: "La parábola con foco F, un punto P bajo el eje y la normal en P que sube hasta cortar el eje x en Q; el triángulo PFQ está sombreado.",
      ja: "焦点 F の放物線、軸の下の点 P、P での法線が上がって x 軸と Q で交わる。三角形 PFQ に色付け。",
      zh: "焦点为 F 的抛物线，轴下方一点 P，P 处法线上升交 x 轴于 Q；△PFQ 涂色。"
    },
    hint: {
      en: "Use $P=(at^2,\\,2at)$. The normal there has slope $-t$, so $m>0$ means $t<0$.",
      fr: "Prenez $P=(at^2,\\,2at)$. La normale y a pour pente $-t$ : $m>0$ signifie $t<0$.",
      es: "Usa $P=(at^2,\\,2at)$. La normal tiene pendiente $-t$: $m>0$ significa $t<0$.",
      ja: "$P=(at^2,\\,2at)$ とおく。法線の傾きは $-t$ なので $m>0$ は $t<0$。",
      zh: "设 $P=(at^2,\\,2at)$。法线斜率为 $-t$，故 $m>0$ 即 $t<0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 27.5, h: 19.5, scale: 11, pad: 18 });
      const T = F.T = axes(F, -1, 26, -13, 6);
      const a = 2, t = -3, P = [a * t * t, 2 * a * t], Q = [2 * a + a * t * t, 0], Fo = [a, 0];
      F.path([T(P), T(Fo), T(Q)], 'fill-yellow', 'fills');
      const pts = []; for (let k = -40; k <= 12; k++) { const y = k / 3; pts.push(T([y * y / (4 * a), y])); } F.path(pts, 'graph', 'base', false);
      F.seg(T(P), T([23.2, 3 * (23.2 - Q[0])]), 'seg');
      F.dot(T(P)); F.dot(T(Q)); F.dot(T(Fo));
      F.text(T(P), 'P', 'pt', -10, 14); F.text(T(Q), 'Q', 'pt', 12, 14); F.text(T(Fo), 'F', 'pt', -4, -12);
      return F;
    },
    options: [
      { tex: "(a,m)=(2,3)", correct: true, why: {
        en: "$a^2m(1+m^2)=4\\cdot3\\cdot10=120$.",
        fr: "$a^2m(1+m^2)=4\\cdot3\\cdot10=120$.",
        es: "$a^2m(1+m^2)=4\\cdot3\\cdot10=120$.",
        ja: "$a^2m(1+m^2)=4\\cdot3\\cdot10=120$.",
        zh: "$a^2m(1+m^2)=4\\cdot3\\cdot10=120$."
      } },
      { tex: "a^2m(1+m^2)=120", correct: true, why: {
        en: "The area formula in terms of $a$ and $m$.",
        fr: "La formule de l’aire en fonction de $a$ et $m$.",
        es: "La fórmula del área en función de $a$ y $m$.",
        ja: "$a$, $m$ で表した面積の式。",
        zh: "用 $a$、$m$ 表示的面积公式。"
      } },
      { tex: "(a,m)=(1,3)", correct: false, why: {
        en: "$1\\cdot3\\cdot10=30\\ne120$.",
        fr: "$1\\cdot3\\cdot10=30\\ne120$.",
        es: "$1\\cdot3\\cdot10=30\\ne120$.",
        ja: "$1\\cdot3\\cdot10=30\\ne120$.",
        zh: "$1\\cdot3\\cdot10=30\\ne120$."
      } },
      { tex: "(a,m)=(2,4)", correct: false, why: {
        en: "$4\\cdot4\\cdot17=272\\ne120$.",
        fr: "$4\\cdot4\\cdot17=272\\ne120$.",
        es: "$4\\cdot4\\cdot17=272\\ne120$.",
        ja: "$4\\cdot4\\cdot17=272\\ne120$.",
        zh: "$4\\cdot4\\cdot17=272\\ne120$."
      } },
      { tex: "(a,m)=(3,4)", correct: false, why: {
        en: "$9\\cdot4\\cdot17=612\\ne120$.",
        fr: "$9\\cdot4\\cdot17=612\\ne120$.",
        es: "$9\\cdot4\\cdot17=612\\ne120$.",
        ja: "$9\\cdot4\\cdot17=612\\ne120$.",
        zh: "$9\\cdot4\\cdot17=612\\ne120$."
      } },
      { tex: "(a,m)=(1,4)", correct: false, why: {
        en: "$4\\cdot17=68\\ne120$.",
        fr: "$4\\cdot17=68\\ne120$.",
        es: "$4\\cdot17=68\\ne120$.",
        ja: "$4\\cdot17=68\\ne120$.",
        zh: "$4\\cdot17=68\\ne120$."
      } },
      { tex: "a^2m=120", correct: false, why: {
        en: "Forgets the factor $1+m^2$ from $QF=a(1+t^2)$.",
        fr: "Oublie le facteur $1+m^2$ venant de $QF=a(1+t^2)$.",
        es: "Olvida el factor $1+m^2$ de $QF=a(1+t^2)$.",
        ja: "$QF=a(1+t^2)$ からの $1+m^2$ を忘れた。",
        zh: "漏了来自 $QF=a(1+t^2)$ 的因子 $1+m^2$。"
      } },
      { tex: "(a,m)=(4,1)", correct: false, why: {
        en: "$16\\cdot1\\cdot2=32\\ne120$.",
        fr: "$16\\cdot1\\cdot2=32\\ne120$.",
        es: "$16\\cdot1\\cdot2=32\\ne120$.",
        ja: "$16\\cdot1\\cdot2=32\\ne120$.",
        zh: "$16\\cdot1\\cdot2=32\\ne120$."
      } }
    ],
    steps: [
      {
        title: {
          en: "Points",
          fr: "Points",
          es: "Puntos",
          ja: "点",
          zh: "各点"
        },
        lines: ["P=(at^2,2at),\\quad F=(a,0),\\quad Q=(2a+at^2,\\,0)"],
        note: {
          en: "The normal $y-2at=-t(x-at^2)$ meets $y=0$ at $x=2a+at^2$.",
          fr: "La normale $y-2at=-t(x-at^2)$ coupe $y=0$ en $x=2a+at^2$.",
          es: "La normal $y-2at=-t(x-at^2)$ corta $y=0$ en $x=2a+at^2$.",
          ja: "法線 $y-2at=-t(x-at^2)$ は $y=0$ と $x=2a+at^2$ で交わる。",
          zh: "法线 $y-2at=-t(x-at^2)$ 与 $y=0$ 交于 $x=2a+at^2$。"
        }
      },
      {
        title: {
          en: "Area",
          fr: "Aire",
          es: "Área",
          ja: "面積",
          zh: "面积"
        },
        lines: ["\\tfrac12\\cdot a(1+t^2)\\cdot2a|t|=a^2m(1+m^2)=120,\\qquad m=-t"],
        note: {
          en: "Base $FQ$ on the axis, height $|y_P|$.",
          fr: "Base $FQ$ sur l’axe, hauteur $|y_P|$.",
          es: "Base $FQ$ en el eje, altura $|y_P|$.",
          ja: "底辺 $FQ$、高さ $|y_P|$。",
          zh: "底 $FQ$ 在轴上，高 $|y_P|$。"
        }
      },
      {
        title: {
          en: "Integer search",
          fr: "Recherche entière",
          es: "Búsqueda entera",
          ja: "整数で探す",
          zh: "整数搜索"
        },
        lines: ["m(1+m^2)\\in\\{2,10,30,68,\\dots\\};\\quad 120=4\\cdot30\\;\\Rightarrow\\;a=2,\\ m=3"],
        note: {
          en: "$120/a^2$ must be of the form $m(1+m^2)$; only $a=2$, $m=3$ works.",
          fr: "$120/a^2$ doit s’écrire $m(1+m^2)$ ; seul $a=2$, $m=3$ convient.",
          es: "$120/a^2$ debe ser $m(1+m^2)$; solo sirve $a=2$, $m=3$.",
          ja: "$120/a^2=m(1+m^2)$ となるのは $a=2$, $m=3$ だけ。",
          zh: "$120/a^2$ 须为 $m(1+m^2)$ 的形式，只有 $a=2$、$m=3$。"
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
          en: "One option is the pair, the other the equation it solves.",
          fr: "Une option est le couple, l’autre l’équation qu’il vérifie.",
          es: "Una opción es el par y otra la ecuación que cumple.",
          ja: "1つは組、もう1つはそれが満たす式。",
          zh: "一个选项是数对，另一个是它满足的方程。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
