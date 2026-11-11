/* geometry · Twice the area from one focus
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 5 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-gaokao-2023-ellipse-twice-the-area",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 5",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 5",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 5",
        ja: "2023年 中国・高考 新課程標準II卷 第5問",
        zh: "2023年高考数学新课标II卷 第5题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Twice the area from one focus",
      fr: "Deux fois l’aire depuis un foyer",
      es: "El doble de área desde un foco",
      ja: "一方の焦点から2倍の面積",
      zh: "一个焦点处面积是两倍"
    },
    statement: {
      en: "$C:\\ \\dfrac{x^2}{3}+y^2=1$ has foci $F_1$ (left) and $F_2$ (right). The line $y=x+m$ meets $C$ at $A$ and $B$, and the area of $\\triangle F_1AB$ is twice that of $\\triangle F_2AB$. <b>Which of the following equal $m$?</b>",
      fr: "$C:\\ \\dfrac{x^2}{3}+y^2=1$ a pour foyers $F_1$ (gauche) et $F_2$ (droite). La droite $y=x+m$ coupe $C$ en $A$ et $B$, et l’aire de $F_1AB$ est le double de celle de $F_2AB$. <b>Lesquelles des valeurs suivantes sont égales à $m$ ?</b>",
      es: "$C:\\ \\dfrac{x^2}{3}+y^2=1$ tiene focos $F_1$ (izquierdo) y $F_2$ (derecho). La recta $y=x+m$ corta $C$ en $A$ y $B$, y el área de $F_1AB$ es el doble que la de $F_2AB$. <b>¿Cuáles de los siguientes valores son iguales a $m$?</b>",
      ja: "楕円 $C:\\ \\dfrac{x^2}{3}+y^2=1$ の左右の焦点を $F_1,F_2$ とします。直線 $y=x+m$ が $C$ と $A,B$ で交わり、$\\triangle F_1AB$ の面積が $\\triangle F_2AB$ の2倍です。<b>$m$ に等しいものはどれですか？</b>",
      zh: "椭圆 $C:\\ \\dfrac{x^2}{3}+y^2=1$ 的左、右焦点为 $F_1,F_2$，直线 $y=x+m$ 与 $C$ 交于 $A,B$，若 $\\triangle F_1AB$ 的面积是 $\\triangle F_2AB$ 的 2 倍，<b>下列哪些等于 $m$？</b>"
    },
    figureText: {
      en: "The ellipse with its foci F₁(−√2, 0) and F₂(√2, 0), and a line of slope 1 cutting a chord AB.",
      fr: "L’ellipse et ses foyers F₁(−√2, 0) et F₂(√2, 0), avec une droite de pente 1 qui découpe une corde AB.",
      es: "La elipse con sus focos F₁(−√2, 0) y F₂(√2, 0), y una recta de pendiente 1 que corta una cuerda AB.",
      ja: "楕円と焦点 F₁(−√2, 0)、F₂(√2, 0)、傾き 1 の直線が切り取る弦 AB。",
      zh: "椭圆及焦点 F₁(−√2, 0)、F₂(√2, 0)，斜率为 1 的直线截得弦 AB。"
    },
    hint: {
      en: "Both triangles share the base $AB$, so compare the distances from $F_1$ and $F_2$ to the line. Then check the line still meets $C$.",
      fr: "Les deux triangles ont la même base $AB$ : comparez les distances de $F_1$ et $F_2$ à la droite, puis vérifiez que la droite coupe encore $C$.",
      es: "Ambos triángulos comparten la base $AB$: compara las distancias de $F_1$ y $F_2$ a la recta y comprueba que la recta sigue cortando $C$.",
      ja: "2つの三角形は底辺 $AB$ が共通。$F_1$, $F_2$ から直線への距離を比べ、直線が $C$ と交わるか確かめる。",
      zh: "两三角形同底 $AB$，比较 $F_1$、$F_2$ 到直线的距离，再检验直线与 $C$ 相交。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.6, scale: 60, pad: 16 });
      const T = F.T = axes(F, -2.5, 2.5, -1.8, 1.8);
      const p = []; for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; p.push(T([Math.sqrt(3) * Math.cos(t), Math.sin(t)])); } F.path(p, 'graph', 'base', true);
      const s2 = Math.SQRT2; F.dot(T([-s2, 0])); F.dot(T([s2, 0])); F.text(T([-s2, 0]), 'F₁', 'pt', 14, -10); F.text(T([s2, 0]), 'F₂', 'pt', -14, -10);
      const m0 = 0.6; F.seg(T([-2.3, -2.3 + m0]), T([1.1, 1.1 + m0]), 'seg thin dashc');
      F.reveal = () => {
      const m = -s2 / 3; F.seg(T([-1.3, -1.3 + m]), T([2.3, 2.3 + m]), 'hl pink');
      const r = Math.sqrt(4 - m * m) * Math.sqrt(3) / 2, x1 = (-3 * m / 2 - r) / 2, x2 = (-3 * m / 2 + r) / 2;
      [x1, x2].forEach(x => F.dot(T([x, x + m]))); F.text(T([x1, x1 + m]), 'A', 'pt', -10, -6); F.text(T([x2, x2 + m]), 'B', 'pt', 10, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "or": {"fr": "ou", "es": "o", "ja": "または", "zh": "或"}
    },
    options: [
      { tex: "-\\tfrac{\\sqrt2}{3}", correct: true, why: {
        en: "$|m-\\sqrt2|=2|m+\\sqrt2|$ with $|m|<2$.",
        fr: "$|m-\\sqrt2|=2|m+\\sqrt2|$ avec $|m|<2$.",
        es: "$|m-\\sqrt2|=2|m+\\sqrt2|$ con $|m|<2$.",
        ja: "$|m-\\sqrt2|=2|m+\\sqrt2|$ かつ $|m|<2$。",
        zh: "$|m-\\sqrt2|=2|m+\\sqrt2|$ 且 $|m|<2$。"
      } },
      { tex: "-\\tfrac13\\sqrt2", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "-3\\sqrt2", correct: false, why: {
        en: "Solves the distance equation, but then the line misses the ellipse ($|m|\\ge2$).",
        fr: "Résout l’équation des distances, mais la droite ne coupe plus l’ellipse ($|m|\\ge2$).",
        es: "Resuelve la ecuación de distancias, pero la recta ya no corta la elipse ($|m|\\ge2$).",
        ja: "距離の式は満たすが、直線が楕円と交わらない（$|m|\\ge2$）。",
        zh: "满足距离方程，但此时直线与椭圆不相交（$|m|\\ge2$）。"
      } },
      { tex: "\\tfrac{\\sqrt2}{3}", correct: false, why: {
        en: "Sign slip: this makes $F_2$ the farther focus.",
        fr: "Erreur de signe : $F_2$ deviendrait le foyer le plus loin.",
        es: "Error de signo: $F_2$ sería el foco más lejano.",
        ja: "符号ミス：$F_2$ の方が遠くなる。",
        zh: "符号错：那样 $F_2$ 反而更远。"
      } },
      { tex: "\\tfrac23", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-\\tfrac23", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "0", correct: false, why: {
        en: "Through the centre, both foci are the same distance away.",
        fr: "Par le centre, les deux foyers sont à la même distance.",
        es: "Por el centro, ambos focos están a la misma distancia.",
        ja: "中心を通ると両焦点からの距離は等しい。",
        zh: "过中心时两焦点到直线距离相等。"
      } },
      { tex: "-\\tfrac{2\\sqrt2}{3}", correct: false, why: {
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
          en: "Same base, compare heights",
          fr: "Même base, comparer les hauteurs",
          es: "Misma base, comparar alturas",
          ja: "底辺共通、高さを比べる",
          zh: "同底比高"
        },
        lines: ["d(F_1)=\\frac{|-\\sqrt2+m|}{\\sqrt2},\\quad d(F_2)=\\frac{|\\sqrt2+m|}{\\sqrt2},\\qquad |m-\\sqrt2|=2|m+\\sqrt2|"],
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
          en: "Two candidates",
          fr: "Deux candidats",
          es: "Dos candidatos",
          ja: "2つの候補",
          zh: "两个候选"
        },
        lines: ["m=-3\\sqrt2\\quad\\text{or}\\quad m=-\\tfrac{\\sqrt2}{3}"],
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
          en: "The line must meet C",
          fr: "La droite doit couper C",
          es: "La recta debe cortar C",
          ja: "直線は C と交わる",
          zh: "直线须与 C 相交"
        },
        lines: ["\\tfrac43x^2+2mx+m^2-1=0:\\ \\Delta>0\\iff m^2<4", "m=\\boxed{-\\tfrac{\\sqrt2}{3}}"],
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
