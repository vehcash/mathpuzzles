/* geometry · A normal of slope 1/√6
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.12 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-normal-slope-root6",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.12",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.12",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.12",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.12",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.12"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "A normal of slope 1/√6",
      fr: "Une normale de pente 1/√6",
      es: "Una normal de pendiente 1/√6",
      ja: "傾き 1/√6 の法線",
      zh: "斜率为 1/√6 的法线"
    },
    statement: {
      en: "A normal with slope $\\tfrac1{\\sqrt6}$ is drawn from $(0,-\\alpha)$ to $x^2=-4ay$ ($a>0$). The line $L$ through $(0,-\\alpha)$ parallel to the directrix meets the parabola at $A$ and $B$. Let $r$ be the latus rectum length and $s=AB^2$. If $r:s=1:16$, <b>which of the following equal $24a$?</b>",
      fr: "Une normale de pente $\\tfrac1{\\sqrt6}$ est menée de $(0,-\\alpha)$ à $x^2=-4ay$ ($a>0$). La droite $L$ passant par $(0,-\\alpha)$, parallèle à la directrice, coupe la parabole en $A$ et $B$. Soit $r$ la longueur du latus rectum et $s=AB^2$. Si $r:s=1:16$, <b>lesquelles des valeurs suivantes sont égales à $24a$ ?</b>",
      es: "Desde $(0,-\\alpha)$ se traza una normal de pendiente $\\tfrac1{\\sqrt6}$ a $x^2=-4ay$ ($a>0$). La recta $L$ por $(0,-\\alpha)$, paralela a la directriz, corta la parábola en $A$ y $B$. Sea $r$ la longitud del lado recto y $s=AB^2$. Si $r:s=1:16$, <b>¿cuáles de los siguientes valores son iguales a $24a$?</b>",
      ja: "点 $(0,-\\alpha)$ から放物線 $x^2=-4ay$（$a>0$）に傾き $\\tfrac1{\\sqrt6}$ の法線を引きます。$(0,-\\alpha)$ を通り準線に平行な直線 $L$ が放物線と $A,B$ で交わります。通径の長さを $r$、$s=AB^2$ とし、$r:s=1:16$ のとき、<b>$24a$ に等しいものはどれですか？</b>",
      zh: "从 $(0,-\\alpha)$ 向抛物线 $x^2=-4ay$（$a>0$）作斜率为 $\\tfrac1{\\sqrt6}$ 的法线。过 $(0,-\\alpha)$ 且平行于准线的直线 $L$ 与抛物线交于 $A,B$。设通径长为 $r$，$s=AB^2$，若 $r:s=1:16$，<b>下列哪些等于 $24a$？</b>"
    },
    figureText: {
      en: "A downward parabola x² = −4ay with a point (0, −α) on its axis below the vertex and a horizontal line through it.",
      fr: "Une parabole tournée vers le bas x² = −4ay, un point (0, −α) sur l’axe sous le sommet et une droite horizontale passant par lui.",
      es: "Una parábola hacia abajo x² = −4ay, un punto (0, −α) en el eje bajo el vértice y una recta horizontal por él.",
      ja: "下に開く放物線 x² = −4ay、軸上で頂点の下の点 (0, −α) と、そこを通る水平線。",
      zh: "开口向下的抛物线 x² = −4ay，轴上顶点下方的点 (0, −α) 及过它的水平线。"
    },
    hint: {
      en: "Use $(2at,-at^2)$. The tangent slope there is $-t$, so the normal slope is $\\tfrac1t$.",
      fr: "Prenez $(2at,-at^2)$. La tangente y a pour pente $-t$, la normale $\\tfrac1t$.",
      es: "Usa $(2at,-at^2)$. La tangente tiene pendiente $-t$, la normal $\\tfrac1t$.",
      ja: "$(2at,-at^2)$ とおく。接線の傾き $-t$、法線は $\\tfrac1t$。",
      zh: "取 $(2at,-at^2)$，切线斜率 $-t$，法线斜率 $\\tfrac1t$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 6.0, h: 5.0, scale: 44, pad: 16 });
      const T = F.T = axes(F, -3.0, 3.0, -4.6, 0.4);
      const a = 0.5; plot(F, T, x => -x * x / (4 * a), -2.9, 2.9, 'graph', 'base', -4.6, 0.4);
      F.dot(T([0, -4])); F.text(T([0, -4]), '(0, −α)', 'len small', 30, 12); F.seg(T([-2.9, -4]), T([2.9, -4]), 'seg thin dashc');
      F.reveal = () => {
      const t = Math.sqrt(6), P = [2 * a * t, -a * t * t]; F.dot(T(P)); F.seg(T([0, -4]), T([P[0] + 0.4, P[1] + 0.4 / t]), 'hl pink');
      [2 * Math.SQRT2, -2 * Math.SQRT2].forEach(x => F.dot(T([x, -4]))); F.text(T([-2 * Math.SQRT2, -4]), 'A', 'pt', 0, -10); F.text(T([2 * Math.SQRT2, -4]), 'B', 'pt', 0, -10);
      };
      return F;
    },
    options: [
      { tex: "12", correct: true, why: {
        en: "$r=4a$, $s=128a^2$, so $64a=128a^2$ and $a=\\tfrac12$.",
        fr: "$r=4a$, $s=128a^2$, donc $64a=128a^2$ et $a=\\tfrac12$.",
        es: "$r=4a$, $s=128a^2$, así que $64a=128a^2$ y $a=\\tfrac12$.",
        ja: "$r=4a$、$s=128a^2$ より $64a=128a^2$、$a=\\tfrac12$。",
        zh: "$r=4a$，$s=128a^2$，故 $64a=128a^2$，$a=\\tfrac12$。"
      } },
      { tex: "24\\cdot\\tfrac12", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "6", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "24", correct: false, why: {
        en: "That is $24a$ with $a=1$.",
        fr: "C’est $24a$ avec $a=1$.",
        es: "Es $24a$ con $a=1$.",
        ja: "$a=1$ のときの値。",
        zh: "那是 $a=1$ 时的值。"
      } },
      { tex: "3", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "16", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "48", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "4", correct: false, why: {
        en: "That is $\\alpha=8a$.",
        fr: "C’est $\\alpha=8a$.",
        es: "Es $\\alpha=8a$.",
        ja: "$\\alpha=8a$ の値。",
        zh: "那是 $\\alpha=8a$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Foot of the normal",
          fr: "Pied de la normale",
          es: "Pie de la normal",
          ja: "法線の足",
          zh: "法线的垂足"
        },
        lines: ["\\tfrac1t=\\tfrac1{\\sqrt6}\\Rightarrow t=\\sqrt6;\\quad y+6a=\\tfrac1{\\sqrt6}(x-2\\sqrt6a)\\ \\xrightarrow{x=0}\\ y=-8a,\\ \\alpha=8a"],
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
          en: "The chord AB",
          fr: "La corde AB",
          es: "La cuerda AB",
          ja: "弦 AB",
          zh: "弦 AB"
        },
        lines: ["y=-8a:\\ x^2=32a^2,\\quad AB=8\\sqrt2\\,a,\\quad s=128a^2"],
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
          en: "The ratio",
          fr: "Le rapport",
          es: "La razón",
          ja: "比",
          zh: "比值"
        },
        lines: ["\\frac{4a}{128a^2}=\\frac1{16}\\ \\Rightarrow\\ a=\\tfrac12,\\quad24a=\\boxed{12}"],
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
