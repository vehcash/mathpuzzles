/* matrix · When is the combination singular?
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2022-singular-power-combo",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.6",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.6",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.6",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.6",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.6"
      },
      exams: ["jee"]
    },
    difficulty: 3,
    title: {
      en: "When is the combination singular?",
      fr: "Quand la combinaison est-elle singulière ?",
      es: "¿Cuándo es singular la combinación?",
      ja: "いつ特異行列になる？",
      zh: "这个组合何时奇异？"
    },
    statement: {
      en: "Let $A=\\begin{pmatrix}\\beta&0&1\\\\2&1&-2\\\\3&1&-2\\end{pmatrix}$. If $A^7-(\\beta-1)A^6-\\beta A^5$ is singular, <b>which of the following equal $9\\beta$?</b>",
      fr: "Soit $A=\\begin{pmatrix}\\beta&0&1\\\\2&1&-2\\\\3&1&-2\\end{pmatrix}$. Si $A^7-(\\beta-1)A^6-\\beta A^5$ est singulière, <b>lesquelles des valeurs suivantes sont égales à $9\\beta$ ?</b>",
      es: "Sea $A=\\begin{pmatrix}\\beta&0&1\\\\2&1&-2\\\\3&1&-2\\end{pmatrix}$. Si $A^7-(\\beta-1)A^6-\\beta A^5$ es singular, <b>¿cuáles de los siguientes valores son iguales a $9\\beta$?</b>",
      ja: "$A=\\begin{pmatrix}\\beta&0&1\\\\2&1&-2\\\\3&1&-2\\end{pmatrix}$ とします。$A^7-(\\beta-1)A^6-\\beta A^5$ が特異（正則でない）とき、<b>$9\\beta$ に等しいものはどれですか？</b>",
      zh: "设 $A=\\begin{pmatrix}\\beta&0&1\\\\2&1&-2\\\\3&1&-2\\end{pmatrix}$。若 $A^7-(\\beta-1)A^6-\\beta A^5$ 为奇异矩阵，<b>下列哪些等于 $9\\beta$？</b>"
    },
    figureText: {
      en: "The matrix A, with the factorisation A⁵(A − βI)(A + I) written underneath.",
      fr: "La matrice A, avec la factorisation A⁵(A − βI)(A + I) en dessous.",
      es: "La matriz A, con la factorización A⁵(A − βI)(A + I) debajo.",
      ja: "行列 A と、その下に因数分解 A⁵(A − βI)(A + I)。",
      zh: "矩阵 A，下方写出因式分解 A⁵(A − βI)(A + I)。"
    },
    hint: {
      en: "Factor out $A^5$, then factor the quadratic $A^2-(\\beta-1)A-\\beta I$. A product is singular when one factor is.",
      fr: "Factorisez $A^5$, puis la quadratique $A^2-(\\beta-1)A-\\beta I$. Un produit est singulier si un facteur l’est.",
      es: "Saca factor común $A^5$ y factoriza $A^2-(\\beta-1)A-\\beta I$. Un producto es singular si lo es algún factor.",
      ja: "$A^5$ でくくり、$A^2-(\\beta-1)A-\\beta I$ を因数分解。積が特異なのはどれかの因子が特異なとき。",
      zh: "提出 $A^5$，再分解 $A^2-(\\beta-1)A-\\beta I$。乘积奇异当且仅当某个因子奇异。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.4, scale: 46, pad: 16 });
      F.text([0.45, 2.15], 'A =', 'pt', 0, 0);
      matrix(F, [1.0, 3.2], [['β', '0', '1'], ['2', '1', '−2'], ['3', '1', '−2']], { cw: 0.8, ch: 0.7 });
      F.text([2.5, 0.35], 'A⁵ (A − βI)(A + I)', 'len', 0, 0);
      return F;
    },
    options: [
      { tex: "3", correct: true, why: {
        en: "$\\det(A-\\beta I)=3\\beta-1=0$ gives $\\beta=\\tfrac13$.",
        fr: "$\\det(A-\\beta I)=3\\beta-1=0$ gives $\\beta=\\tfrac13$.",
        es: "$\\det(A-\\beta I)=3\\beta-1=0$ gives $\\beta=\\tfrac13$.",
        ja: "$\\det(A-\\beta I)=3\\beta-1=0$ gives $\\beta=\\tfrac13$.",
        zh: "$\\det(A-\\beta I)=3\\beta-1=0$ gives $\\beta=\\tfrac13$."
      } },
      { tex: "9\\cdot\\tfrac13", correct: true, why: {
        en: "The same value before simplifying.",
        fr: "La même valeur avant simplification.",
        es: "El mismo valor sin simplificar.",
        ja: "簡単にする前の同じ値。",
        zh: "化简前的同一个值。"
      } },
      { tex: "-9", correct: false, why: {
        en: "$\\beta=-1$ would need $\\det(A+I)=0$, but $\\det(A+I)=-4$.",
        fr: "$\\beta=-1$ exigerait $\\det(A+I)=0$, mais $\\det(A+I)=-4$.",
        es: "$\\beta=-1$ exigiría $\\det(A+I)=0$, pero $\\det(A+I)=-4$.",
        ja: "$\\beta=-1$ なら $\\det(A+I)=0$ が必要だが $\\det(A+I)=-4$。",
        zh: "$\\beta=-1$ 需要 $\\det(A+I)=0$，但 $\\det(A+I)=-4$。"
      } },
      { tex: "0", correct: false, why: {
        en: "$\\det A=-1$ for every $\\beta$, so $A^5$ is never singular.",
        fr: "$\\det A=-1$ pour tout $\\beta$ : $A^5$ n’est jamais singulière.",
        es: "$\\det A=-1$ para todo $\\beta$: $A^5$ nunca es singular.",
        ja: "どの $\\beta$ でも $\\det A=-1$ なので $A^5$ は特異でない。",
        zh: "对任意 $\\beta$ 都有 $\\det A=-1$，所以 $A^5$ 不奇异。"
      } },
      { tex: "9", correct: false, why: {
        en: "$\\beta=1$ gives $\\det(A-I)=2\\ne0$.",
        fr: "$\\beta=1$ donne $\\det(A-I)=2\\ne0$.",
        es: "$\\beta=1$ da $\\det(A-I)=2\\ne0$.",
        ja: "$\\beta=1$ だと $\\det(A-I)=2\\ne0$。",
        zh: "$\\beta=1$ 时 $\\det(A-I)=2\\ne0$。"
      } },
      { tex: "1", correct: false, why: {
        en: "That is $3\\beta$, not $9\\beta$.",
        fr: "C’est $3\\beta$, pas $9\\beta$.",
        es: "Es $3\\beta$, no $9\\beta$.",
        ja: "それは $3\\beta$ で $9\\beta$ ではない。",
        zh: "那是 $3\\beta$，不是 $9\\beta$。"
      } },
      { tex: "6", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "-3", correct: false, why: {
        en: "Sign error in $3\\beta-1$.",
        fr: "Erreur de signe dans $3\\beta-1$.",
        es: "Error de signo en $3\\beta-1$.",
        ja: "$3\\beta-1$ の符号ミス。",
        zh: "$3\\beta-1$ 符号错误。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Factor",
          fr: "Factoriser",
          es: "Factorizar",
          ja: "因数分解",
          zh: "因式分解"
        },
        lines: ["A^7-(\\beta-1)A^6-\\beta A^5=A^5\\,(A-\\beta I)(A+I)"],
        note: {
          en: "$x^2-(\\beta-1)x-\\beta=(x-\\beta)(x+1)$, and powers of $A$ commute.",
          fr: "$x^2-(\\beta-1)x-\\beta=(x-\\beta)(x+1)$, et les puissances de $A$ commutent.",
          es: "$x^2-(\\beta-1)x-\\beta=(x-\\beta)(x+1)$, y las potencias de $A$ conmutan.",
          ja: "$x^2-(\\beta-1)x-\\beta=(x-\\beta)(x+1)$、$A$ の累乗は可換。",
          zh: "$x^2-(\\beta-1)x-\\beta=(x-\\beta)(x+1)$，且 $A$ 的幂可交换。"
        }
      },
      {
        title: {
          en: "Three determinants",
          fr: "Trois déterminants",
          es: "Tres determinantes",
          ja: "3つの行列式",
          zh: "三个行列式"
        },
        lines: ["\\det A=-1,\\qquad \\det(A+I)=-4,\\qquad \\det(A-\\beta I)=3\\beta-1"],
        note: {
          en: "Only the middle factor can vanish.",
          fr: "Seul le facteur $A-\\beta I$ peut être singulier.",
          es: "Solo el factor $A-\\beta I$ puede ser singular.",
          ja: "特異になりうるのは $A-\\beta I$ だけ。",
          zh: "只有 $A-\\beta I$ 可能奇异。"
        }
      },
      {
        title: {
          en: "Solve",
          fr: "Résoudre",
          es: "Resolver",
          ja: "解く",
          zh: "求解"
        },
        lines: ["3\\beta-1=0\\;\\Rightarrow\\;\\beta=\\tfrac13,\\qquad 9\\beta=\\boxed{3}"],
        note: {
          en: "For $A-\\beta I$ the diagonal becomes $0,\\,1-\\beta,\\,-2-\\beta$.",
          fr: "Pour $A-\\beta I$ la diagonale devient $0,\\,1-\\beta,\\,-2-\\beta$.",
          es: "En $A-\\beta I$ la diagonal pasa a $0,\\,1-\\beta,\\,-2-\\beta$.",
          ja: "$A-\\beta I$ の対角成分は $0,\\,1-\\beta,\\,-2-\\beta$。",
          zh: "$A-\\beta I$ 的对角线为 $0,\\,1-\\beta,\\,-2-\\beta$。"
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
