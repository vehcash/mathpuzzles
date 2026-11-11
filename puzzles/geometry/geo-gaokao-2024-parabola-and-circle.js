/* geometry · A parabola, its directrix and a circle
   Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 10 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-parabola-and-circle",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper II (新课标II卷), Question 10",
        fr: "Gaokao 2024, épreuve nationale II (新课标II卷), question 10",
        es: "Gaokao 2024, examen nacional II (新课标II卷), pregunta 10",
        ja: "2024年 中国・高考 新課程標準II卷 第10問",
        zh: "2024年高考数学新课标II卷 第10题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A parabola, its directrix and a circle",
      fr: "Une parabole, sa directrice et un cercle",
      es: "Una parábola, su directriz y una circunferencia",
      ja: "放物線・準線・円",
      zh: "抛物线、准线与圆"
    },
    statement: {
      en: "$C:\\ y^2=4x$ has directrix $l$, and $P$ moves on $C$. A tangent from $P$ touches the circle $\\odot A:\\ x^2+(y-4)^2=1$ at $Q$, and $B$ is the foot of the perpendicular from $P$ to $l$. <b>Which of the following statements are true?</b>",
      fr: "$C:\\ y^2=4x$ a pour directrice $l$, et $P$ parcourt $C$. Une tangente issue de $P$ touche le cercle $\\odot A:\\ x^2+(y-4)^2=1$ en $Q$, et $B$ est le pied de la perpendiculaire de $P$ sur $l$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$C:\\ y^2=4x$ tiene directriz $l$, y $P$ recorre $C$. Una tangente desde $P$ toca la circunferencia $\\odot A:\\ x^2+(y-4)^2=1$ en $Q$, y $B$ es el pie de la perpendicular de $P$ a $l$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "放物線 $C:\\ y^2=4x$ の準線を $l$、$C$ 上の動点を $P$ とします。$P$ から円 $\\odot A:\\ x^2+(y-4)^2=1$ に引いた接線の接点を $Q$、$P$ から $l$ に下ろした垂線の足を $B$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "抛物线 $C:\\ y^2=4x$ 的准线为 $l$，$P$ 为 $C$ 上动点。过 $P$ 作 $\\odot A:\\ x^2+(y-4)^2=1$ 的切线，切点为 $Q$；过 $P$ 作 $l$ 的垂线，垂足为 $B$。<b>下列哪些说法正确？</b>"
    },
    figureText: {
      en: "The parabola y² = 4x, its directrix x = −1, and the circle of radius 1 centred at A(0, 4).",
      fr: "La parabole y² = 4x, sa directrice x = −1 et le cercle de rayon 1 de centre A(0, 4).",
      es: "La parábola y² = 4x, su directriz x = −1 y la circunferencia de radio 1 con centro A(0, 4).",
      ja: "放物線 y² = 4x、準線 x = −1、中心 A(0, 4)・半径 1 の円。",
      zh: "抛物线 y² = 4x，准线 x = −1，以 A(0, 4) 为圆心、半径 1 的圆。"
    },
    hint: {
      en: "$l$ is $x=-1$. For $|PQ|$ use the tangent length $\\sqrt{|PA|^2-1}$; for $|PB|$ remember $|PB|=|PF|$ with $F=(1,0)$.",
      fr: "$l$ est $x=-1$. Pour $|PQ|$, longueur de tangente $\\sqrt{|PA|^2-1}$ ; et $|PB|=|PF|$ avec $F=(1,0)$.",
      es: "$l$ es $x=-1$. Para $|PQ|$ usa $\\sqrt{|PA|^2-1}$; y $|PB|=|PF|$ con $F=(1,0)$.",
      ja: "$l$ は $x=-1$。$|PQ|=\\sqrt{|PA|^2-1}$、また $F=(1,0)$ として $|PB|=|PF|$。",
      zh: "$l$ 为 $x=-1$。$|PQ|=\\sqrt{|PA|^2-1}$；且 $|PB|=|PF|$，$F=(1,0)$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8.0, h: 9.0, scale: 34, pad: 16 });
      const T = F.T = axes(F, -1.8, 6.2, -3.4, 5.6);
      const p = []; for (let k = 0; k <= 80; k++) { const y = -3.3 + 8.0 * k / 80; p.push(T([y * y / 4, y])); } F.path(p, 'graph', 'base', false);
      F.seg(T([-1, -3.3]), T([-1, 5.5]), 'seg thin dashc'); F.text(T([-1, -3.0]), 'l', 'pt', -10, 0);
      const c = []; for (let k = 0; k <= 48; k++) { const t = k * Math.PI / 24; c.push(T([Math.cos(t), 4 + Math.sin(t)])); } F.path(c, 'hl blue', 'base', true);
      F.dot(T([0, 4])); F.text(T([0, 4]), 'A', 'pt', 10, 12);
      F.reveal = () => {
      F.dot(T([4, 4])); F.text(T([4, 4]), 'P', 'pt', 10, -6); F.dot(T([-1, 4])); F.text(T([-1, 4]), 'B', 'pt', -10, -8);
      F.seg(T([-1, 4]), T([4, 4]), 'seg thin');
      const qx = 1 / 4, qy = 4 + Math.sqrt(15) / 4; F.seg(T([4, 4]), T([qx, qy]), 'hl pink'); F.dot(T([qx, qy])); F.text(T([qx, qy]), 'Q', 'pt', 0, -10);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "is tangent to": {"fr": "est tangente à", "es": "es tangente a", "ja": "は次に接する：", "zh": "与下列相切："},
      "collinear": {"fr": "alignés", "es": "alineados", "ja": "が一直線上", "zh": "共线"},
      "exactly one": {"fr": "un seul", "es": "exactamente un", "ja": "ただ1つの", "zh": "恰有一个"},
      "has": {"fr": "vérifie", "es": "cumple", "ja": "が", "zh": "满足"},
      "meets": {"fr": "coupe", "es": "corta", "ja": "は次と交わる：", "zh": "与"},
      "at two points": {"fr": "en deux points", "es": "en dos puntos", "ja": "で2点", "zh": "交于两点"},
      "the focus of": {"fr": "le foyer de", "es": "el foco de", "ja": "焦点：", "zh": "焦点："},
      "lies on": {"fr": "est sur", "es": "está en", "ja": "は次の上：", "zh": "在…上："},
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"},
      "two points": {"fr": "deux points", "es": "dos puntos", "ja": "2点", "zh": "两点"}
    },
    options: [
      { tex: "l\\ \\text{is tangent to}\\ \\odot A", correct: true, why: {
        en: "$l$ is $x=-1$, exactly $1$ from the centre $(0,4)$.",
        fr: "$l$ est $x=-1$, à distance $1$ du centre $(0,4)$.",
        es: "$l$ es $x=-1$, a distancia $1$ del centro $(0,4)$.",
        ja: "$l$ は $x=-1$ で中心 $(0,4)$ から距離 $1$。",
        zh: "$l$ 为 $x=-1$，到圆心 $(0,4)$ 距离为 $1$。"
      } },
      { tex: "P,A,B\\ \\text{collinear}\\ \\Rightarrow\\ |PQ|=\\sqrt{15}", correct: true, why: {
        en: "Then $P=(4,4)$, $|PA|=4$, $|PQ|=\\sqrt{16-1}$.",
        fr: "Alors $P=(4,4)$, $|PA|=4$, $|PQ|=\\sqrt{16-1}$.",
        es: "Entonces $P=(4,4)$, $|PA|=4$, $|PQ|=\\sqrt{16-1}$.",
        ja: "$P=(4,4)$、$|PA|=4$、$|PQ|=\\sqrt{16-1}$。",
        zh: "此时 $P=(4,4)$，$|PA|=4$，$|PQ|=\\sqrt{16-1}$。"
      } },
      { tex: "P,A,B\\ \\text{collinear}\\ \\Rightarrow\\ |PQ|=4", correct: false, why: {
        en: "$4$ is $|PA|$; the tangent is shorter.",
        fr: "$4$ est $|PA|$ ; la tangente est plus courte.",
        es: "$4$ es $|PA|$; la tangente es más corta.",
        ja: "$4$ は $|PA|$。接線はそれより短い。",
        zh: "$4$ 是 $|PA|$，切线更短。"
      } },
      { tex: "|PB|=2\\ \\Rightarrow\\ PA\\perp AB", correct: false, why: {
        en: "$P=(1,\\pm2)$, and neither choice gives $\\overrightarrow{AP}\\cdot\\overrightarrow{AB}=0$.",
        fr: "$P=(1,\\pm2)$, et aucun cas ne donne $\\overrightarrow{AP}\\cdot\\overrightarrow{AB}=0$.",
        es: "$P=(1,\\pm2)$ y ninguno da $\\overrightarrow{AP}\\cdot\\overrightarrow{AB}=0$.",
        ja: "$P=(1,\\pm2)$ でどちらも $\\overrightarrow{AP}\\cdot\\overrightarrow{AB}\\ne0$。",
        zh: "$P=(1,\\pm2)$，两种情况 $\\overrightarrow{AP}\\cdot\\overrightarrow{AB}$ 都不为 $0$。"
      } },
      { tex: "\\text{exactly one}\\ P\\ \\text{has}\\ |PA|=|PB|", correct: false, why: {
        en: "There are two: the perpendicular bisector of $AF$ meets $C$ twice.",
        fr: "Il y en a deux : la médiatrice de $AF$ coupe $C$ deux fois.",
        es: "Hay dos: la mediatriz de $AF$ corta $C$ dos veces.",
        ja: "2つある。$AF$ の垂直二等分線は $C$ と2点で交わる。",
        zh: "有两个：$AF$ 的垂直平分线与 $C$ 交于两点。"
      } },
      { tex: "l\\ \\text{meets}\\ \\odot A\\ \\text{at two points}", correct: false, why: {
        en: "It only touches it.",
        fr: "Elle le touche seulement.",
        es: "Solo la toca.",
        ja: "接するだけ。",
        zh: "只是相切。"
      } },
      { tex: "\\text{the focus of}\\ C\\ \\text{lies on}\\ \\odot A", correct: false, why: {
        en: "$F=(1,0)$ is $\\sqrt{17}$ from $A$.",
        fr: "$F=(1,0)$ est à $\\sqrt{17}$ de $A$.",
        es: "$F=(1,0)$ está a $\\sqrt{17}$ de $A$.",
        ja: "$F=(1,0)$ と $A$ の距離は $\\sqrt{17}$。",
        zh: "$F=(1,0)$ 到 $A$ 的距离为 $\\sqrt{17}$。"
      } },
      { tex: "|PB|=2\\ \\Rightarrow\\ P=(2,\\pm2\\sqrt2)", correct: false, why: {
        en: "$|PB|=x_P+1=2$ gives $x_P=1$.",
        fr: "$|PB|=x_P+1=2$ donne $x_P=1$.",
        es: "$|PB|=x_P+1=2$ da $x_P=1$.",
        ja: "$|PB|=x_P+1=2$ より $x_P=1$。",
        zh: "$|PB|=x_P+1=2$ 得 $x_P=1$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Directrix and circle",
          fr: "Directrice et cercle",
          es: "Directriz y circunferencia",
          ja: "準線と円",
          zh: "准线与圆"
        },
        lines: ["l:\\ x=-1,\\qquad d\\bigl(A,l\\bigr)=1=r"],
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
          en: "The collinear case",
          fr: "Le cas aligné",
          es: "El caso alineado",
          ja: "一直線の場合",
          zh: "共线情形"
        },
        lines: ["B=(-1,y_P),\\ A=(0,4)\\ \\Rightarrow\\ y_P=4,\\ P=(4,4)", "|PQ|=\\sqrt{|PA|^2-1}=\\sqrt{15}"],
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
          en: "The other claims",
          fr: "Les autres affirmations",
          es: "Las demás afirmaciones",
          ja: "残りの命題",
          zh: "其余命题"
        },
        lines: ["|PB|=2:\\ P=(1,\\pm2),\\ \\overrightarrow{AP}\\cdot\\overrightarrow{AB}=3\\ \\text{or}\\ -35", "|PA|=|PF|:\\ y^2-16y+30=0\\ \\Rightarrow\\ \\text{two points}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "In the exam the two-points statement was a third true answer.",
          fr: "Dans l’épreuve, l’affirmation « deux points » était une troisième réponse vraie.",
          es: "En el examen, la afirmación de los dos puntos era una tercera respuesta verdadera.",
          ja: "原題では「2点ある」も正しい選択肢だった。",
          zh: "原题中“恰有两个”也是正确选项。"
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
