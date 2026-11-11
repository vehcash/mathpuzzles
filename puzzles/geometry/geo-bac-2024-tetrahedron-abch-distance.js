/* geometry · How far is H from the plane ABC?
   Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 3 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-bac-2024-tetrahedron-abch-distance",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Baccalauréat 2024 (France), mathematics speciality, Métropole, 19 June 2024, Exercise 3",
        fr: "Baccalauréat 2024, spécialité mathématiques, Métropole, 19 juin 2024, exercice 3",
        es: "Bachillerato francés (Bac) 2024, especialidad de matemáticas, Metrópoli, 19 de junio de 2024, ejercicio 3",
        ja: "フランス・バカロレア 2024 数学専門 本土 2024年6月19日 第3問",
        zh: "法国高中会考（Bac）2024 数学专业 本土卷 2024年6月19日 第3题"
      },
      exams: ["bac"]
    },
    difficulty: 3,
    title: {
      en: "How far is H from the plane ABC?",
      fr: "À quelle distance H est-il du plan ABC ?",
      es: "¿A qué distancia está H del plano ABC?",
      ja: "H から平面 ABC までの距離",
      zh: "H 到平面 ABC 的距离"
    },
    statement: {
      en: "$A(5,5,0)$, $B(0,5,0)$, $C(0,0,10)$ and $H\\left(\\tfrac52,\\tfrac52,0\\right)$, the orthogonal projection of $B$ on the plane $x-y=0$. <b>Which of the following are true?</b>",
      fr: "$A(5,5,0)$, $B(0,5,0)$, $C(0,0,10)$ et $H\\left(\\tfrac52,\\tfrac52,0\\right)$, projeté orthogonal de $B$ sur le plan $x-y=0$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A(5,5,0)$, $B(0,5,0)$, $C(0,0,10)$ y $H\\left(\\tfrac52,\\tfrac52,0\\right)$, proyección ortogonal de $B$ sobre el plano $x-y=0$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A(5,5,0)$、$B(0,5,0)$、$C(0,0,10)$ と、$B$ の平面 $x-y=0$ への正射影 $H\\left(\\tfrac52,\\tfrac52,0\\right)$ があります。<b>次のうち正しいものはどれですか？</b>",
      zh: "$A(5,5,0)$，$B(0,5,0)$，$C(0,0,10)$，$H\\left(\\tfrac52,\\tfrac52,0\\right)$ 为 $B$ 在平面 $x-y=0$ 上的正投影。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The tetrahedron ABCH: A, B, H in the plane z = 0 and C high on the z-axis.",
      fr: "Le tétraèdre ABCH : A, B, H dans le plan z = 0 et C en haut sur l’axe des z.",
      es: "El tetraedro ABCH: A, B, H en el plano z = 0 y C arriba en el eje z.",
      ja: "四面体 ABCH：A, B, H は z = 0 の平面上、C は z 軸の上方。",
      zh: "四面体 ABCH：A、B、H 在 z = 0 平面内，C 在 z 轴高处。"
    },
    hint: {
      en: "Compute the volume of $ABCH$ with base $ABH$ (height $CO=10$), then again with base $ABC$, right-angled at $B$.",
      fr: "Calculez le volume de $ABCH$ avec la base $ABH$ (hauteur $CO=10$), puis avec la base $ABC$, rectangle en $B$.",
      es: "Calcula el volumen de $ABCH$ con base $ABH$ (altura $CO=10$) y luego con base $ABC$, rectángulo en $B$.",
      ja: "底面 $ABH$（高さ $CO=10$）で体積を求め、次に $B$ が直角の底面 $ABC$ で考える。",
      zh: "先以 $ABH$ 为底（高 $CO=10$）求体积，再以直角在 $B$ 的 $ABC$ 为底。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.6, h: 4.2, scale: 52, pad: 16 });
      const P = ([x, y, z]) => [0.6 + 0.55 * x - 0.35 * y + 2.0, 0.5 + 0.3 * z + 0.25 * y];
      const A = [5, 5, 0], B = [0, 5, 0], C = [0, 0, 10], H = [2.5, 2.5, 0], O = [0, 0, 0];
      F.seg(P(A), P(B), 'seg'); F.seg(P(B), P(H), 'seg thin dashc'); F.seg(P(H), P(A), 'seg'); [A, B, H].forEach(X => F.seg(P(X), P(C), 'seg'));
      F.seg(P(O), P(C), 'seg thin dashc');
      [[A, 'A', 10, 6], [B, 'B', -10, -2], [C, 'C', 0, -12], [H, 'H', 4, 14], [O, 'O', -8, 12]].forEach(([X, t, dx, dy]) => F.text(P(X), t, 'pt', dx, dy));
      F.reveal = () => {
      F.path([P(A), P(B), P(H)], 'fill-yellow', 'fills', true);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "area": {"fr": "aire", "es": "área", "ja": "面積", "zh": "面积"},
      "is right-angled at": {"fr": "est rectangle en", "es": "es rectángulo en", "ja": "は次で直角：", "zh": "的直角在"}
    },
    options: [
      { tex: "V_{ABCH}=\\tfrac{125}{6}", correct: true, why: {
        en: "$\\tfrac13\\cdot\\tfrac{25}4\\cdot10$.",
        fr: "$\\tfrac13\\cdot\\tfrac{25}4\\cdot10$.",
        es: "$\\tfrac13\\cdot\\tfrac{25}4\\cdot10$.",
        ja: "$\\tfrac13\\cdot\\tfrac{25}4\\cdot10$。",
        zh: "$\\tfrac13\\cdot\\tfrac{25}4\\cdot10$。"
      } },
      { tex: "d\\bigl(H,(ABC)\\bigr)=\\sqrt5", correct: true, why: {
        en: "$\\text{area}(ABC)=\\tfrac12\\cdot5\\cdot5\\sqrt5$, and $d=\\tfrac{3V}{\\text{area}}$.",
        fr: "$\\text{aire}(ABC)=\\tfrac12\\cdot5\\cdot5\\sqrt5$ et $d=\\tfrac{3V}{\\text{aire}}$.",
        es: "$\\text{área}(ABC)=\\tfrac12\\cdot5\\cdot5\\sqrt5$ y $d=\\tfrac{3V}{\\text{área}}$.",
        ja: "$ABC$ の面積 $=\\tfrac12\\cdot5\\cdot5\\sqrt5$、$d=\\tfrac{3V}{\\text{面積}}$。",
        zh: "$ABC$ 面积 $=\\tfrac12\\cdot5\\cdot5\\sqrt5$，$d=\\tfrac{3V}{\\text{面积}}$。"
      } },
      { tex: "\\text{area}(ABH)=\\tfrac{25}{2}", correct: false, why: {
        en: "$AH=BH=\\tfrac{5}{\\sqrt2}$, so the area is $\\tfrac{25}4$.",
        fr: "$AH=BH=\\tfrac{5}{\\sqrt2}$ : aire $\\tfrac{25}4$.",
        es: "$AH=BH=\\tfrac{5}{\\sqrt2}$: área $\\tfrac{25}4$.",
        ja: "$AH=BH=\\tfrac{5}{\\sqrt2}$ で面積 $\\tfrac{25}4$。",
        zh: "$AH=BH=\\tfrac{5}{\\sqrt2}$，面积 $\\tfrac{25}4$。"
      } },
      { tex: "d\\bigl(H,(ABC)\\bigr)=2\\sqrt5", correct: false, why: {
        en: "Missing the factor $\\tfrac13$ in the volume formula, or using the wrong area.",
        fr: "Le facteur $\\tfrac13$ ou l’aire est faux.",
        es: "Falla el factor $\\tfrac13$ o el área.",
        ja: "$\\tfrac13$ か面積の誤り。",
        zh: "$\\tfrac13$ 或面积有误。"
      } },
      { tex: "V_{ABCH}=\\tfrac{125}{2}", correct: false, why: {
        en: "Forgot the $\\tfrac13$.",
        fr: "Oubli du $\\tfrac13$.",
        es: "Se olvidó el $\\tfrac13$.",
        ja: "$\\tfrac13$ を忘れている。",
        zh: "漏了 $\\tfrac13$。"
      } },
      { tex: "BC=10", correct: false, why: {
        en: "$BC=\\sqrt{25+100}=5\\sqrt5$.",
        fr: "$BC=\\sqrt{25+100}=5\\sqrt5$.",
        es: "$BC=\\sqrt{25+100}=5\\sqrt5$.",
        ja: "$BC=\\sqrt{25+100}=5\\sqrt5$。",
        zh: "$BC=\\sqrt{25+100}=5\\sqrt5$。"
      } },
      { tex: "d\\bigl(H,(ABC)\\bigr)=\\tfrac52", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\triangle ABH\\ \\text{is right-angled at}\\ A", correct: false, why: {
        en: "The right angle is at $H$: $\\overrightarrow{HA}\\cdot\\overrightarrow{HB}=0$.",
        fr: "L’angle droit est en $H$.",
        es: "El ángulo recto está en $H$.",
        ja: "直角は $H$。",
        zh: "直角在 $H$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Base ABH",
          fr: "Base ABH",
          es: "Base ABH",
          ja: "底面 ABH",
          zh: "底面 ABH"
        },
        lines: ["\\overrightarrow{HA}=\\left(\\tfrac52,\\tfrac52,0\\right),\\ \\overrightarrow{HB}=\\left(-\\tfrac52,\\tfrac52,0\\right):\\ \\perp,\\ \\text{area}=\\tfrac12\\cdot\\tfrac{25}2=\\tfrac{25}4"],
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
          en: "Volume",
          fr: "Volume",
          es: "Volumen",
          ja: "体積",
          zh: "体积"
        },
        lines: ["V=\\tfrac13\\cdot\\tfrac{25}4\\cdot CO=\\tfrac13\\cdot\\tfrac{25}4\\cdot10=\\tfrac{125}6"],
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
          en: "Distance to (ABC)",
          fr: "Distance à (ABC)",
          es: "Distancia a (ABC)",
          ja: "(ABC) までの距離",
          zh: "到 (ABC) 的距离"
        },
        lines: ["\\text{area}(ABC)=\\tfrac12\\cdot AB\\cdot BC=\\tfrac12\\cdot5\\cdot5\\sqrt5,\\quad d=\\frac{3V}{\\text{area}}=\\frac{125/2}{25\\sqrt5/2}=\\boxed{\\sqrt5}"],
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
