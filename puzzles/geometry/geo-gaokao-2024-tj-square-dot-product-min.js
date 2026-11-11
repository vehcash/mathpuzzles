/* geometry · A moving point on BE
   Gaokao 2024, Tianjin paper (天津卷), Question 14 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2024-tj-square-dot-product-min",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, Tianjin paper (天津卷), Question 14",
        fr: "Gaokao 2024, épreuve de Tianjin (天津卷), question 14",
        es: "Gaokao 2024, examen de Tianjin (天津卷), pregunta 14",
        ja: "2024年 中国・高考 天津卷 第14問",
        zh: "2024年高考数学天津卷 第14题"
      },
      exams: ["gaokao"]
    },
    difficulty: 3,
    title: {
      en: "A moving point on BE",
      fr: "Un point mobile sur BE",
      es: "Un punto móvil en BE",
      ja: "BE 上の動点",
      zh: "BE 上的动点"
    },
    statement: {
      en: "Square $ABCD$ has side $1$, and $\\overrightarrow{DE}=2\\overrightarrow{EC}$. Write $\\overrightarrow{BE}=\\lambda\\overrightarrow{BA}+\\mu\\overrightarrow{BC}$. $F$ moves on segment $BE$ and $G$ is the midpoint of $AF$. <b>Which of the following are true?</b>",
      fr: "Le carré $ABCD$ a pour côté $1$, et $\\overrightarrow{DE}=2\\overrightarrow{EC}$. On écrit $\\overrightarrow{BE}=\\lambda\\overrightarrow{BA}+\\mu\\overrightarrow{BC}$. $F$ parcourt le segment $BE$ et $G$ est le milieu de $AF$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "El cuadrado $ABCD$ tiene lado $1$ y $\\overrightarrow{DE}=2\\overrightarrow{EC}$. Se escribe $\\overrightarrow{BE}=\\lambda\\overrightarrow{BA}+\\mu\\overrightarrow{BC}$. $F$ recorre el segmento $BE$ y $G$ es el punto medio de $AF$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "1辺 $1$ の正方形 $ABCD$ で $\\overrightarrow{DE}=2\\overrightarrow{EC}$、$\\overrightarrow{BE}=\\lambda\\overrightarrow{BA}+\\mu\\overrightarrow{BC}$ とします。$F$ は線分 $BE$ 上を動き、$G$ は $AF$ の中点です。<b>次のうち正しいものはどれですか？</b>",
      zh: "在边长为 $1$ 的正方形 $ABCD$ 中，$\\overrightarrow{DE}=2\\overrightarrow{EC}$，$\\overrightarrow{BE}=\\lambda\\overrightarrow{BA}+\\mu\\overrightarrow{BC}$。$F$ 为线段 $BE$ 上的动点，$G$ 为 $AF$ 的中点。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The unit square ABCD with E on DC two-thirds of the way from D, and the segment BE.",
      fr: "Le carré unité ABCD avec E sur DC aux deux tiers depuis D, et le segment BE.",
      es: "El cuadrado unidad ABCD con E en DC a dos tercios desde D, y el segmento BE.",
      ja: "単位正方形 ABCD、DC 上で D から 2/3 の点 E、線分 BE。",
      zh: "单位正方形 ABCD，E 在 DC 上距 D 三分之二处，以及线段 BE。"
    },
    hint: {
      en: "Put $A=(0,0)$, $B=(1,0)$, $C=(1,1)$, $D=(0,1)$, so $E=(\\tfrac23,1)$, and write $F=B+s(E-B)$ with $0\\le s\\le1$.",
      fr: "Prenez $A=(0,0)$, $B=(1,0)$, $C=(1,1)$, $D=(0,1)$, donc $E=(\\tfrac23,1)$, et $F=B+s(E-B)$ avec $0\\le s\\le1$.",
      es: "Toma $A=(0,0)$, $B=(1,0)$, $C=(1,1)$, $D=(0,1)$, así $E=(\\tfrac23,1)$, y $F=B+s(E-B)$ con $0\\le s\\le1$.",
      ja: "$A=(0,0)$、$B=(1,0)$、$C=(1,1)$、$D=(0,1)$ とすると $E=(\\tfrac23,1)$。$F=B+s(E-B)$（$0\\le s\\le1$）。",
      zh: "设 $A=(0,0)$，$B=(1,0)$，$C=(1,1)$，$D=(0,1)$，则 $E=(\\tfrac23,1)$，$F=B+s(E-B)$，$0\\le s\\le1$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 3.6, scale: 90, pad: 18 });
      const P = ([x, y]) => [0.5 + 2.6 * x, 0.5 + 2.6 * y];
      F.path([P([0, 0]), P([1, 0]), P([1, 1]), P([0, 1])], 'seg', 'base', true);
      F.seg(P([1, 0]), P([2 / 3, 1]), 'hl blue'); F.dot(P([2 / 3, 1]));
      [[[0, 0], 'A', -10, 10], [[1, 0], 'B', 10, 10], [[1, 1], 'C', 10, -6], [[0, 1], 'D', -10, -6], [[2 / 3, 1], 'E', 0, -12]].forEach(([Q, t, dx, dy]) => F.text(P(Q), t, 'pt', dx, dy));
      F.reveal = () => {
      const Fq = [2 / 3, 1]; F.seg(P([0, 0]), P(Fq), 'hl pink'); F.dot(P([1 / 3, 0.5])); F.text(P([1 / 3, 0.5]), 'G', 'pt', -12, 0); F.seg(P([0, 1]), P([1 / 3, 0.5]), 'hl yellow');
      F.text(P(Fq), 'F', 'pt', 12, 12);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "vertex": {"fr": "sommet", "es": "vértice", "ja": "頂点", "zh": "顶点"},
      "at": {"fr": "en", "es": "en", "ja": "で", "zh": "于"}
    },
    options: [
      { tex: "\\lambda+\\mu=\\tfrac43", correct: true, why: {
        en: "$\\overrightarrow{BE}=(-\\tfrac13,1)=\\tfrac13\\overrightarrow{BA}+1\\cdot\\overrightarrow{BC}$.",
        fr: "$\\overrightarrow{BE}=(-\\tfrac13,1)=\\tfrac13\\overrightarrow{BA}+1\\cdot\\overrightarrow{BC}$.",
        es: "$\\overrightarrow{BE}=(-\\tfrac13,1)=\\tfrac13\\overrightarrow{BA}+1\\cdot\\overrightarrow{BC}$.",
        ja: "$\\overrightarrow{BE}=(-\\tfrac13,1)=\\tfrac13\\overrightarrow{BA}+1\\cdot\\overrightarrow{BC}$。",
        zh: "$\\overrightarrow{BE}=(-\\tfrac13,1)=\\tfrac13\\overrightarrow{BA}+1\\cdot\\overrightarrow{BC}$。"
      } },
      { tex: "\\min\\overrightarrow{AF}\\cdot\\overrightarrow{DG}=-\\tfrac5{18}", correct: true, why: {
        en: "The quadratic in $s$ is decreasing on $[0,1]$, so the minimum is at $F=E$.",
        fr: "Le trinôme en $s$ décroît sur $[0,1]$ : minimum en $F=E$.",
        es: "El polinomio en $s$ decrece en $[0,1]$: mínimo en $F=E$.",
        ja: "$s$ の2次式は $[0,1]$ で減少、最小は $F=E$。",
        zh: "关于 $s$ 的二次式在 $[0,1]$ 上递减，最小值在 $F=E$ 处。"
      } },
      { tex: "\\lambda+\\mu=\\tfrac53", correct: false, why: {
        en: "This uses $DE=\\tfrac13$ instead of $\\tfrac23$.",
        fr: "Cela prend $DE=\\tfrac13$ au lieu de $\\tfrac23$.",
        es: "Usa $DE=\\tfrac13$ en lugar de $\\tfrac23$.",
        ja: "$DE=\\tfrac23$ を $\\tfrac13$ としている。",
        zh: "把 $DE=\\tfrac23$ 当成了 $\\tfrac13$。"
      } },
      { tex: "\\lambda+\\mu=\\tfrac23", correct: false, why: {
        en: "Sign slip in $\\lambda$: $\\overrightarrow{BA}$ points left, so $\\lambda=+\\tfrac13$.",
        fr: "Erreur de signe sur $\\lambda$ : $\\overrightarrow{BA}$ va vers la gauche, $\\lambda=+\\tfrac13$.",
        es: "Error de signo en $\\lambda$: $\\overrightarrow{BA}$ apunta a la izquierda, $\\lambda=+\\tfrac13$.",
        ja: "$\\lambda$ の符号ミス：$\\overrightarrow{BA}$ は左向きで $\\lambda=+\\tfrac13$。",
        zh: "$\\lambda$ 符号错：$\\overrightarrow{BA}$ 向左，$\\lambda=+\\tfrac13$。"
      } },
      { tex: "\\min\\overrightarrow{AF}\\cdot\\overrightarrow{DG}=-\\tfrac3{10}", correct: false, why: {
        en: "That is the vertex value at $s=\\tfrac65$, outside the segment.",
        fr: "C’est la valeur au sommet $s=\\tfrac65$, hors du segment.",
        es: "Es el valor en el vértice $s=\\tfrac65$, fuera del segmento.",
        ja: "頂点 $s=\\tfrac65$ での値で、線分の外。",
        zh: "那是顶点 $s=\\tfrac65$ 处的值，不在线段上。"
      } },
      { tex: "\\min\\overrightarrow{AF}\\cdot\\overrightarrow{DG}=0", correct: false, why: {
        en: "The product is $\\tfrac12$ at $F=B$ and $-\\tfrac5{18}$ at $F=E$.",
        fr: "Le produit vaut $\\tfrac12$ en $F=B$ et $-\\tfrac5{18}$ en $F=E$.",
        es: "El producto vale $\\tfrac12$ en $F=B$ y $-\\tfrac5{18}$ en $F=E$.",
        ja: "$F=B$ で $\\tfrac12$、$F=E$ で $-\\tfrac5{18}$。",
        zh: "$F=B$ 时为 $\\tfrac12$，$F=E$ 时为 $-\\tfrac5{18}$。"
      } },
      { tex: "\\min\\overrightarrow{AF}\\cdot\\overrightarrow{DG}=\\tfrac12", correct: false, why: {
        en: "That is the maximum, at $F=B$.",
        fr: "C’est le maximum, en $F=B$.",
        es: "Es el máximo, en $F=B$.",
        ja: "最大値（$F=B$）。",
        zh: "那是最大值（$F=B$）。"
      } },
      { tex: "\\lambda+\\mu=1", correct: false, why: {
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
          en: "Coordinates",
          fr: "Coordonnées",
          es: "Coordenadas",
          ja: "座標",
          zh: "坐标"
        },
        lines: ["E=(\\tfrac23,1),\\quad\\overrightarrow{BE}=(-\\tfrac13,1),\\quad\\overrightarrow{BA}=(-1,0),\\quad\\overrightarrow{BC}=(0,1)", "\\lambda=\\tfrac13,\\ \\mu=1,\\ \\lambda+\\mu=\\tfrac43"],
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
          en: "The moving point",
          fr: "Le point mobile",
          es: "El punto móvil",
          ja: "動点",
          zh: "动点"
        },
        lines: ["F=(1-\\tfrac s3,\\,s),\\ G=\\tfrac12F,\\ \\overrightarrow{DG}=\\bigl(\\tfrac{1-s/3}2,\\ \\tfrac s2-1\\bigr)", "\\overrightarrow{AF}\\cdot\\overrightarrow{DG}=\\tfrac59s^2-\\tfrac43s+\\tfrac12"],
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
          en: "Minimise on [0, 1]",
          fr: "Minimiser sur [0, 1]",
          es: "Minimizar en [0, 1]",
          ja: "[0, 1] で最小化",
          zh: "在 [0, 1] 上求最小"
        },
        lines: ["\\text{vertex}\\ s=\\tfrac65>1\\ \\Rightarrow\\ \\min\\ \\text{at}\\ s=1:\\ \\tfrac59-\\tfrac43+\\tfrac12=\\boxed{-\\tfrac5{18}}"],
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
