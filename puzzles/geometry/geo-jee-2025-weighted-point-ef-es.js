/* geometry · A weighted point inside a triangle
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.9 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2025-weighted-point-ef-es",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.9",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.9",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.9",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.9",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.9"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "A weighted point inside a triangle",
      fr: "Un point pondéré dans un triangle",
      es: "Un punto ponderado en un triángulo",
      ja: "三角形内の重み付きの点",
      zh: "三角形内的加权点"
    },
    statement: {
      en: "$S$ is inside $\\triangle PQR$ with $\\overrightarrow{SP}+5\\overrightarrow{SQ}+6\\overrightarrow{SR}=\\vec0$. $E$ and $F$ are the midpoints of $PR$ and $QR$. <b>Which of the following equal $\\dfrac{|EF|}{|ES|}$?</b>",
      fr: "$S$ est à l’intérieur de $PQR$ avec $\\overrightarrow{SP}+5\\overrightarrow{SQ}+6\\overrightarrow{SR}=\\vec0$. $E$ et $F$ sont les milieux de $PR$ et $QR$. <b>Lesquelles des valeurs suivantes sont égales à $\\dfrac{|EF|}{|ES|}$ ?</b>",
      es: "$S$ está dentro de $PQR$ con $\\overrightarrow{SP}+5\\overrightarrow{SQ}+6\\overrightarrow{SR}=\\vec0$. $E$ y $F$ son los puntos medios de $PR$ y $QR$. <b>¿Cuáles de los siguientes valores son iguales a $\\dfrac{|EF|}{|ES|}$?</b>",
      ja: "$S$ は $\\triangle PQR$ の内部の点で $\\overrightarrow{SP}+5\\overrightarrow{SQ}+6\\overrightarrow{SR}=\\vec0$。$E,F$ は $PR,QR$ の中点です。<b>$\\dfrac{|EF|}{|ES|}$ に等しいものはどれですか？</b>",
      zh: "$S$ 在 $\\triangle PQR$ 内，$\\overrightarrow{SP}+5\\overrightarrow{SQ}+6\\overrightarrow{SR}=\\vec0$，$E,F$ 分别为 $PR,QR$ 中点。<b>下列哪些等于 $\\dfrac{|EF|}{|ES|}$？</b>"
    },
    figureText: {
      en: "Triangle PQR with the midpoints E of PR and F of QR, and the midline EF.",
      fr: "Le triangle PQR avec les milieux E de PR et F de QR, et la droite des milieux EF.",
      es: "El triángulo PQR con los puntos medios E de PR y F de QR, y la paralela media EF.",
      ja: "三角形 PQR、PR の中点 E、QR の中点 F と中点連結線 EF。",
      zh: "三角形 PQR，PR 中点 E，QR 中点 F，中位线 EF。"
    },
    hint: {
      en: "$S=\\dfrac{P+5Q+6R}{12}$. Compute $S-E$ and compare it with $Q-P$.",
      fr: "$S=\\dfrac{P+5Q+6R}{12}$. Calculez $S-E$ et comparez à $Q-P$.",
      es: "$S=\\dfrac{P+5Q+6R}{12}$. Calcula $S-E$ y compáralo con $Q-P$.",
      ja: "$S=\\dfrac{P+5Q+6R}{12}$。$S-E$ を $Q-P$ と比べる。",
      zh: "$S=\\dfrac{P+5Q+6R}{12}$，计算 $S-E$ 并与 $Q-P$ 比较。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 3.2, scale: 60, pad: 16 });
      const P = [0.3, 0.3], Q = [4.1, 0.5], R = [1.8, 3.0], E = [(P[0] + R[0]) / 2, (P[1] + R[1]) / 2], Fm = [(Q[0] + R[0]) / 2, (Q[1] + R[1]) / 2];
      F.path([P, Q, R], 'seg', 'base', true); F.seg(E, Fm, 'hl blue');
      [[P, 'P', -10, 8], [Q, 'Q', 10, 8], [R, 'R', 0, -12], [E, 'E', -12, 0], [Fm, 'F', 12, 0]].forEach(([X, t, dx, dy]) => { F.dot(X); F.text(X, t, 'pt', dx, dy); });
      F.reveal = () => {
      const S = [(P[0] + 5 * Q[0] + 6 * R[0]) / 12, (P[1] + 5 * Q[1] + 6 * R[1]) / 12]; F.dot(S); F.text(S, 'S', 'pt', 0, 14); F.seg(E, S, 'hl pink');
      };
      return F;
    },
    options: [
      { tex: "\\tfrac65", correct: true, why: {
        en: "$\\overrightarrow{EF}=\\tfrac12(Q-P)$ and $\\overrightarrow{ES}=\\tfrac5{12}(Q-P)$.",
        fr: "$\\overrightarrow{EF}=\\tfrac12(Q-P)$ et $\\overrightarrow{ES}=\\tfrac5{12}(Q-P)$.",
        es: "$\\overrightarrow{EF}=\\tfrac12(Q-P)$ y $\\overrightarrow{ES}=\\tfrac5{12}(Q-P)$.",
        ja: "$\\overrightarrow{EF}=\\tfrac12(Q-P)$、$\\overrightarrow{ES}=\\tfrac5{12}(Q-P)$。",
        zh: "$\\overrightarrow{EF}=\\tfrac12(Q-P)$，$\\overrightarrow{ES}=\\tfrac5{12}(Q-P)$。"
      } },
      { tex: "1.2", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac56", correct: false, why: {
        en: "That is $\\tfrac{|ES|}{|EF|}$.",
        fr: "C’est $\\tfrac{|ES|}{|EF|}$.",
        es: "Es $\\tfrac{|ES|}{|EF|}$.",
        ja: "$\\tfrac{|ES|}{|EF|}$ の値。",
        zh: "那是 $\\tfrac{|ES|}{|EF|}$。"
      } },
      { tex: "2", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac{12}{5}", correct: false, why: {
        en: "That compares $|PQ|$ with $|ES|$.",
        fr: "Cela compare $|PQ|$ à $|ES|$.",
        es: "Compara $|PQ|$ con $|ES|$.",
        ja: "$|PQ|$ と $|ES|$ を比べている。",
        zh: "那是 $|PQ|$ 与 $|ES|$ 之比。"
      } },
      { tex: "\\tfrac{11}{6}", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "1", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\tfrac32", correct: false, why: {
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
          en: "Locate S",
          fr: "Placer S",
          es: "Situar S",
          ja: "S の位置",
          zh: "确定 S"
        },
        lines: ["(P-S)+5(Q-S)+6(R-S)=0\\ \\Rightarrow\\ S=\\frac{P+5Q+6R}{12}"],
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
          en: "Two parallel vectors",
          fr: "Deux vecteurs parallèles",
          es: "Dos vectores paralelos",
          ja: "平行な2ベクトル",
          zh: "两个平行向量"
        },
        lines: ["S-E=\\frac{P+5Q+6R}{12}-\\frac{6P+6R}{12}=\\frac5{12}(Q-P),\\qquad F-E=\\frac12(Q-P)", "\\frac{|EF|}{|ES|}=\\frac{1/2}{5/12}=\\boxed{\\tfrac65}"],
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
