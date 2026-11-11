/* matrix · Five enormous powers
   IME (Instituto Militar de Engenharia, Brazil) entrance exam 2023/2024, Mathematics (written), Question 1 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-ime-2024-powers",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "IME (Instituto Militar de Engenharia, Brazil) entrance exam 2023/2024, Mathematics (written), Question 1",
        fr: "Concours de l’IME (Institut militaire d’ingénierie, Brésil) 2023/2024, mathématiques (écrit), question 1",
        es: "Examen de ingreso del IME (Instituto Militar de Ingeniería, Brasil) 2023/2024, matemáticas (desarrollo), pregunta 1",
        ja: "IME（ブラジル軍事工科大学）2023/2024 入試 数学（記述）第1問",
        zh: "巴西军事工程学院 IME 2023/2024 入学考试 数学（解答题）第 1 题"
      },
      exams: ["ime"]
    },
    difficulty: 3,
    title: {
      en: "Five enormous powers",
      fr: "Cinq puissances énormes",
      es: "Cinco potencias enormes",
      ja: "5つの巨大なべき",
      zh: "五个巨大的幂"
    },
    statement: {
      en: "Let $M=\\begin{pmatrix}-2&1\\\\-7&3\\end{pmatrix}$ and let $I$ be the identity. <b>Which of the following equal $M^{2020}+M^{2022}+M^{2024}+M^{2025}+M^{2029}$?</b>",
      fr: "Soit $M=\\begin{pmatrix}-2&1\\\\-7&3\\end{pmatrix}$ et $I$ l’identité. <b>Lesquelles des matrices suivantes sont égales à $M^{2020}+M^{2022}+M^{2024}+M^{2025}+M^{2029}$ ?</b>",
      es: "Sea $M=\\begin{pmatrix}-2&1\\\\-7&3\\end{pmatrix}$ e $I$ la identidad. <b>¿Cuáles de las siguientes matrices son iguales a $M^{2020}+M^{2022}+M^{2024}+M^{2025}+M^{2029}$?</b>",
      ja: "$M=\\begin{pmatrix}-2&1\\\\-7&3\\end{pmatrix}$、$I$ を単位行列とします。<b>$M^{2020}+M^{2022}+M^{2024}+M^{2025}+M^{2029}$ に等しいものはどれですか？</b>",
      zh: "设 $M=\\begin{pmatrix}-2&1\\\\-7&3\\end{pmatrix}$，$I$ 为单位矩阵。<b>下列哪些等于 $M^{2020}+M^{2022}+M^{2024}+M^{2025}+M^{2029}$？</b>"
    },
    figureText: {
      en: "A wheel for the powers of M, with M⁰ = I and M¹ = M filled in. The other powers are filled in during the solution.",
      fr: "Une roue des puissances de M, avec M⁰ = I et M¹ = M. Les autres sont remplies dans la solution.",
      es: "Una rueda de las potencias de M, con M⁰ = I y M¹ = M. Las demás se rellenan en la solución.",
      ja: "M の累乗の輪。M⁰ = I と M¹ = M だけ記入。残りは解答で書き込みます。",
      zh: "M 的幂的轮盘，只填出 M⁰ = I 与 M¹ = M。其余在解答中填入。"
    },
    hint: {
      en: "Trace $1$ and determinant $1$: by Cayley–Hamilton $M^2-M+I=0$.",
      fr: "Trace $1$ et déterminant $1$ : par Cayley-Hamilton $M^2-M+I=0$.",
      es: "Traza $1$ y determinante $1$: por Cayley-Hamilton $M^2-M+I=0$.",
      ja: "トレース $1$、行列式 $1$：ケーリー・ハミルトンより $M^2-M+I=0$。",
      zh: "迹为 $1$，行列式为 $1$：由凯莱-哈密顿 $M^2-M+I=0$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 4.0, scale: 58, pad: 14 });
      const C = [2.2, 2.0], R = 1.55, L = ['I', 'M', 'M − I', '−I', '−M', 'I − M'];
      F.arrowDefs();
      const pos = k => { const a = (90 - 60 * k) * Math.PI / 180; return [[C[0] + R * Math.cos(a), C[1] + R * Math.sin(a)], [C[0] + 0.62 * Math.cos(a), C[1] + 0.62 * Math.sin(a)]]; };
      L.forEach((t, k) => { const [p, q] = pos(k); F.circle(p, 0.42, 'tri'); F.text(q, 'M' + ['⁰', '¹', '²', '³', '⁴', '⁵'][k], 'tick', 0, 0); if (k < 2) F.text(p, t, 'len small', 0, 1);
        const arc = F.arc(C, R, 90 - 60 * k - 17, 90 - 60 * k - 43, 'dashc', 'marks'); arc.setAttribute('marker-end', 'url(#arrowhead)'); });
      F.text(C, '×M', 'len', 0, 0);
      F.reveal = () => {
      L.forEach((t, k) => { if (k >= 2) F.text(pos(k)[0], t, 'len small', 0, 1); });
      };
      return F;
    },
    options: [
      { tex: "\\begin{pmatrix}-3&1\\\\-7&2\\end{pmatrix}", correct: true, why: {
        en: "$M-I$ written out.",
        fr: "$M-I$ écrite en entier.",
        es: "$M-I$ escrita completa.",
        ja: "$M-I$ を成分で書いたもの。",
        zh: "$M-I$ 的具体形式。"
      } },
      { tex: "M-I", correct: true, why: {
        en: "$-M+I+(M-I)-I+M=M-I$.",
        fr: "$-M+I+(M-I)-I+M=M-I$.",
        es: "$-M+I+(M-I)-I+M=M-I$.",
        ja: "$-M+I+(M-I)-I+M=M-I$。",
        zh: "$-M+I+(M-I)-I+M=M-I$。"
      } },
      { tex: "M", correct: false, why: {
        en: "One $-I$ is left over.",
        fr: "Il reste un $-I$.",
        es: "Sobra un $-I$.",
        ja: "$-I$ が1つ残る。",
        zh: "还多出一个 $-I$。"
      } },
      { tex: "I-M", correct: false, why: {
        en: "The opposite sign.",
        fr: "Le signe opposé.",
        es: "El signo contrario.",
        ja: "符号が逆。",
        zh: "符号相反。"
      } },
      { tex: "-I", correct: false, why: {
        en: "That is only $M^{2025}=M^3$.",
        fr: "C’est seulement $M^{2025}=M^3$.",
        es: "Es solo $M^{2025}=M^3$.",
        ja: "それは $M^{2025}=M^3$ だけ。",
        zh: "那只是 $M^{2025}=M^3$。"
      } },
      { tex: "I", correct: false, why: {
        en: "That is only $M^{2022}=M^0$.",
        fr: "C’est seulement $M^{2022}=M^0$.",
        es: "Es solo $M^{2022}=M^0$.",
        ja: "それは $M^{2022}=M^0$ だけ。",
        zh: "那只是 $M^{2022}=M^0$。"
      } },
      { tex: "\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}", correct: false, why: {
        en: "The five terms do not cancel.",
        fr: "Les cinq termes ne s’annulent pas.",
        es: "Los cinco términos no se anulan.",
        ja: "5つの項は打ち消し合わない。",
        zh: "五项不会互相抵消。"
      } },
      { tex: "5M", correct: false, why: {
        en: "The powers are not all equal to $M$.",
        fr: "Les puissances ne valent pas toutes $M$.",
        es: "No todas las potencias valen $M$.",
        ja: "べきがすべて $M$ になるわけではない。",
        zh: "这些幂并不都等于 $M$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Cayley–Hamilton",
          fr: "Cayley-Hamilton",
          es: "Cayley-Hamilton",
          ja: "ケーリー・ハミルトン",
          zh: "凯莱-哈密顿"
        },
        lines: ["\\operatorname{tr}M=1,\\;\\det M=-6+7=1 \\;\\Rightarrow\\; M^2-M+I=0", "M^2=M-I,\\quad M^3=M^2-M=-I,\\quad M^6=I"],
        note: {
          en: "So the powers of $M$ repeat with period $6$.",
          fr: "Les puissances de $M$ se répètent donc avec la période $6$.",
          es: "Así que las potencias de $M$ se repiten con periodo $6$.",
          ja: "よって $M$ のべきは周期 $6$ で繰り返す。",
          zh: "所以 $M$ 的幂以 $6$ 为周期重复。"
        }
      },
      {
        title: {
          en: "Reduce the exponents mod 6",
          fr: "Réduire les exposants modulo 6",
          es: "Reducir los exponentes módulo 6",
          ja: "指数を 6 で割った余りにする",
          zh: "指数模 6"
        },
        lines: ["2020\\equiv4,\\; 2022\\equiv0,\\; 2024\\equiv2,\\; 2025\\equiv3,\\; 2029\\equiv1 \\pmod 6", "(-M)+I+(M-I)+(-I)+M=\\boxed{M-I}=\\begin{pmatrix}-3&1\\\\-7&2\\end{pmatrix}"],
        fig(F) {
          if (F.reveal) F.reveal();
        },
        note: {
          en: "$M^4=M^3M=-M$.",
          fr: "$M^4=M^3M=-M$.",
          es: "$M^4=M^3M=-M$.",
          ja: "$M^4=M^3M=-M$。",
          zh: "$M^4=M^3M=-M$。"
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
          en: "Two options are the same matrix.",
          fr: "Deux options sont la même matrice.",
          es: "Dos opciones son la misma matriz.",
          ja: "2つの選択肢は同じ行列です。",
          zh: "有两个选项是同一个矩阵。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
