/* geometry · How far from the line?
   Distance from a point to a line: |ax₀ + by₀ + c| / √(a² + b²). */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const X0 = -2, X1 = 3, Y0 = -1, Y1 = 3;
  const Ln = x => (1 - 3 * x) / 4;

  PuzzleBank.define({
    id: "geo-point-line-distance",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["gaokao"]
    },
    difficulty: 1,
    title: {
      en: "How far from the line?",
      fr: "À quelle distance de la droite ?",
      es: "¿A qué distancia de la recta?",
      ja: "直線までの距離は？",
      zh: "离直线多远？"
    },
    statement: {
      en: "<b>What is the distance from the point $P(1, 2)$ to the line $3x + 4y - 1 = 0$?</b>",
      fr: "<b>Quelle est la distance du point $P(1, 2)$ à la droite $3x + 4y - 1 = 0$ ?</b>",
      es: "<b>¿Cuál es la distancia del punto $P(1, 2)$ a la recta $3x + 4y - 1 = 0$?</b>",
      ja: "<b>点 $P(1, 2)$ から直線 $3x + 4y - 1 = 0$ までの距離はいくらですか？</b>",
      zh: "<b>点 $P(1, 2)$ 到直线 $3x + 4y - 1 = 0$ 的距离是多少？</b>"
    },
    figureText: {
      en: "Coordinate axes with the line 3x + 4y − 1 = 0, the point P(1, 2) above it and the perpendicular from P to the line.",
      fr: "Des axes avec la droite 3x + 4y − 1 = 0, le point P(1, 2) au-dessus et la perpendiculaire menée de P à la droite.",
      es: "Ejes con la recta 3x + 4y − 1 = 0, el punto P(1, 2) por encima y la perpendicular desde P a la recta.",
      ja: "座標軸、直線 3x + 4y − 1 = 0、その上側の点 P(1, 2)、P から直線への垂線。",
      zh: "坐标轴、直线 3x + 4y − 1 = 0、其上方的点 P(1, 2)，以及从 P 到直线的垂线。"
    },
    hint: {
      en: "$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$.",
      fr: "$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$.",
      es: "$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$.",
      ja: "$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$.",
      zh: "$d = \\dfrac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example finding the foot of the perpendicular and measuring PH), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en trouvant le pied H de la perpendiculaire puis en mesurant PH), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo hallando el pie H de la perpendicular y midiendo PH), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば垂線の足 H を求めて PH を測る）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如求出垂足 H 再计算 PH），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: X1 - X0, h: Y1 - Y0, scale: 50, pad: 18 });
      const T = F.T = axes(F, X0, X1, Y0, Y1, { grid: true });
      plot(F, T, Ln, -2, 3, 'graph', 'base', -1, 3);
      F.seg(T([1, 2]), T([-0.2, 0.4]), 'seg thin');
      F.dot(T([1, 2])); F.text(T([1, 2]), 'P(1, 2)', 'len', 30, -8);
      F.dot(T([-0.2, 0.4])); F.text(T([-0.2, 0.4]), 'H', 'pt', -12, -8);
      F.text(T([2.4, Ln(2.4)]), '3x + 4y − 1 = 0', 'len it small', -10, 16);
      return F;
    },
    options: [
      { tex: "2", correct: true, why: {
        en: "$\\dfrac{|3 + 8 - 1|}{\\sqrt{9 + 16}} = \\dfrac{10}{5}$.",
        fr: "$\\dfrac{|3 + 8 - 1|}{\\sqrt{9 + 16}} = \\dfrac{10}{5}$.",
        es: "$\\dfrac{|3 + 8 - 1|}{\\sqrt{9 + 16}} = \\dfrac{10}{5}$.",
        ja: "$\\dfrac{|3 + 8 - 1|}{\\sqrt{9 + 16}} = \\dfrac{10}{5}$.",
        zh: "$\\dfrac{|3 + 8 - 1|}{\\sqrt{9 + 16}} = \\dfrac{10}{5}$."
      } },
      { tex: "10", correct: false, why: {
        en: "Forgot to divide by $\\sqrt{3^2 + 4^2} = 5$.",
        fr: "Oubli de la division par $\\sqrt{3^2 + 4^2} = 5$.",
        es: "Olvidó dividir entre $\\sqrt{3^2 + 4^2} = 5$.",
        ja: "$\\sqrt{3^2 + 4^2} = 5$ で割り忘れています。",
        zh: "忘了除以 $\\sqrt{3^2 + 4^2} = 5$。"
      } },
      { tex: "\\tfrac{10}{7}", correct: false, why: {
        en: "Divided by $3 + 4$ instead of $\\sqrt{3^2 + 4^2}$.",
        fr: "Division par $3 + 4$ au lieu de $\\sqrt{3^2 + 4^2}$.",
        es: "Dividió entre $3 + 4$ en lugar de $\\sqrt{3^2 + 4^2}$.",
        ja: "$\\sqrt{3^2 + 4^2}$ ではなく $3 + 4$ で割っています。",
        zh: "除以了 $3 + 4$，而不是 $\\sqrt{3^2 + 4^2}$。"
      } },
      { tex: "\\tfrac{12}{5}", correct: false, why: {
        en: "Sign slip: used $+1$ instead of $-1$.",
        fr: "Erreur de signe : $+1$ au lieu de $-1$.",
        es: "Error de signo: usó $+1$ en lugar de $-1$.",
        ja: "符号ミス：$-1$ ではなく $+1$ を使っています。",
        zh: "符号错误：用了 $+1$ 而不是 $-1$。"
      } },
      { tex: "\\sqrt5", correct: false, why: {
        en: "That is $|OP|$, the distance to the origin.",
        fr: "C’est $|OP|$, la distance à l’origine.",
        es: "Eso es $|OP|$, la distancia al origen.",
        ja: "それは原点までの距離 $|OP|$ です。",
        zh: "那是 $|OP|$，到原点的距离。"
      } },
      { tex: "\\tfrac25", correct: false, why: {
        en: "Divided by $25$ instead of $\\sqrt{25}$.",
        fr: "Division par $25$ au lieu de $\\sqrt{25}$.",
        es: "Dividió entre $25$ en lugar de $\\sqrt{25}$.",
        ja: "$\\sqrt{25}$ ではなく $25$ で割っています。",
        zh: "除以了 $25$，而不是 $\\sqrt{25}$。"
      } },
      { tex: "\\tfrac{11}{5}", correct: false, why: {
        en: "Forgot the constant $-1$.",
        fr: "Oubli de la constante $-1$.",
        es: "Olvidó la constante $-1$.",
        ja: "定数 $-1$ を忘れています。",
        zh: "漏了常数 $-1$。"
      } },
      { tex: "0", correct: false, why: {
        en: "$P$ is not on the line: $3 + 8 - 1 = 10 \\ne 0$.",
        fr: "$P$ n’est pas sur la droite : $3 + 8 - 1 = 10 \\ne 0$.",
        es: "$P$ no está en la recta: $3 + 8 - 1 = 10 \\ne 0$.",
        ja: "$P$ は直線上にありません：$3 + 8 - 1 = 10 \\ne 0$。",
        zh: "$P$ 不在直线上：$3 + 8 - 1 = 10 \\ne 0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use the distance formula",
          fr: "Utiliser la formule de la distance",
          es: "Usar la fórmula de la distancia",
          ja: "距離の公式を使う",
          zh: "用距离公式"
        },
        lines: ["d = \\frac{|3\\cdot1 + 4\\cdot2 - 1|}{\\sqrt{3^2 + 4^2}} = \\frac{10}{5} = \\boxed{2}"],
        note: {
          en: "The numerator measures how far $P$ is from satisfying the equation; $\\sqrt{a^2+b^2}$ turns it into a length.",
          fr: "Le numérateur mesure l’écart de $P$ à l’équation ; $\\sqrt{a^2+b^2}$ le transforme en longueur.",
          es: "El numerador mide cuánto se aleja $P$ de cumplir la ecuación; $\\sqrt{a^2+b^2}$ lo convierte en longitud.",
          ja: "分子は $P$ が方程式からどれだけずれているかを表し、$\\sqrt{a^2+b^2}$ で割ると長さになります。",
          zh: "分子衡量 $P$偏离方程的程度，除以 $\\sqrt{a^2+b^2}$ 就变成长度。"
        },
        fig(F) { F.draw(F.seg(F.T([1, 2]), F.T([-0.2, 0.4]), 'hl yellow', 'over'), 700); }
      },
      {
        title: {
          en: "Check with the foot of the perpendicular",
          fr: "Vérifier avec le pied de la perpendiculaire",
          es: "Comprobar con el pie de la perpendicular",
          ja: "垂線の足で確認",
          zh: "用垂足验证"
        },
        lines: ["H = (1, 2) - 2\\cdot\\left(\\tfrac35, \\tfrac45\\right) = \\left(-\\tfrac15, \\tfrac25\\right)", "3\\left(-\\tfrac15\\right) + 4\\cdot\\tfrac25 - 1 = 0\\ \\checkmark"],
        note: {
          en: "$H$ is on the line, and $PH$ points along the normal $(3, 4)$ with length $2$.",
          fr: "$H$ est sur la droite et $PH$ suit la normale $(3, 4)$ avec une longueur $2$.",
          es: "$H$ está en la recta y $PH$ sigue la normal $(3, 4)$ con longitud $2$.",
          ja: "$H$ は直線上にあり、$PH$ は法線 $(3, 4)$ の向きで長さ $2$ です。",
          zh: "$H$ 在直线上，$PH$ 沿法向量 $(3, 4)$ 方向，长为 $2$。"
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
          en: "Exactly one option is correct.",
          fr: "Une seule option est correcte.",
          es: "Exactamente una opción es correcta.",
          ja: "正しい選択肢はちょうど1つ。",
          zh: "恰有一个选项正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
