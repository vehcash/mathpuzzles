/* matrix · The 2022nd power
   JEE Advanced 2022 (India), Paper 2, Mathematics Q.16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-jee-2022-power-2022",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2022 (India), Paper 2, Mathematics Q.16",
        fr: "JEE Advanced 2022 (Inde), épreuve 2, mathématiques Q.16",
        es: "JEE Advanced 2022 (India), prueba 2, matemáticas Q.16",
        ja: "JEE Advanced 2022（インド工科大学入試）Paper 2 数学 Q.16",
        zh: "印度理工学院入学考试 JEE Advanced 2022 卷二 数学 Q.16"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "The 2022nd power",
      fr: "La puissance 2022",
      es: "La potencia 2022",
      ja: "2022 乗",
      zh: "2022 次幂"
    },
    statement: {
      en: "$M=\\begin{pmatrix}\\tfrac52&\\tfrac32\\\\[2pt]-\\tfrac32&-\\tfrac12\\end{pmatrix}$. <b>Which of the following equal $M^{2022}$?</b>",
      fr: "$M=\\begin{pmatrix}\\tfrac52&\\tfrac32\\\\[2pt]-\\tfrac32&-\\tfrac12\\end{pmatrix}$. <b>Lesquelles des matrices suivantes sont égales à $M^{2022}$ ?</b>",
      es: "$M=\\begin{pmatrix}\\tfrac52&\\tfrac32\\\\[2pt]-\\tfrac32&-\\tfrac12\\end{pmatrix}$. <b>¿Cuáles de las siguientes matrices son iguales a $M^{2022}$?</b>",
      ja: "$M=\\begin{pmatrix}\\tfrac52&\\tfrac32\\\\[2pt]-\\tfrac32&-\\tfrac12\\end{pmatrix}$ のとき、<b>$M^{2022}$ に等しいものはどれですか？</b>",
      zh: "$M=\\begin{pmatrix}\\tfrac52&\\tfrac32\\\\[2pt]-\\tfrac32&-\\tfrac12\\end{pmatrix}$。<b>下列哪些等于 $M^{2022}$？</b>"
    },
    figureText: {
      en: "M written as I + N, where N = (3/2)·[[1, 1], [−1, −1]] and N² = 0.",
      fr: "M écrite comme I + N, où N = (3/2)·[[1, 1], [−1, −1]] et N² = 0.",
      es: "M escrita como I + N, donde N = (3/2)·[[1, 1], [−1, −1]] y N² = 0.",
      ja: "M = I + N、N = (3/2)·[[1, 1], [−1, −1]]、N² = 0。",
      zh: "把 M 写成 I + N，其中 N = (3/2)·[[1, 1], [−1, −1]]，N² = 0。"
    },
    hint: {
      en: "Subtract $I$: is $N=M-I$ nilpotent? Then the binomial theorem stops after two terms.",
      fr: "Retranchez $I$ : $N=M-I$ est-elle nilpotente ? Le binôme s’arrête alors après deux termes.",
      es: "Resta $I$: ¿es $N=M-I$ nilpotente? Entonces el binomio se corta tras dos términos.",
      ja: "$I$ を引くと $N=M-I$ はべき零？それなら二項定理は2項で終わる。",
      zh: "减去 $I$：$N=M-I$ 是否幂零？那么二项式展开只剩两项。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 2.0, scale: 44, pad: 14 });
      F.text([0.4, 1.0], 'M = I +', 'pt', 0, 0);
      F.text([1.75, 1.0], '3/2 ·', 'len', 0, 0);
      matrix(F, [2.35, 1.7], [['1', '1'], ['−1', '−1']], { cw: 0.75, ch: 0.7 });
      F.text([5.6, 1.0], 'N² = 0', 'len', 0, 0);
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "since": {"fr": "car", "es": "pues", "ja": "なぜなら", "zh": "因为"}
    },
    options: [
      { tex: "\\begin{pmatrix}3034&3033\\\\-3033&-3032\\end{pmatrix}", correct: true, why: {
        en: "$I+2022N$ with $N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}$.",
        fr: "$I+2022N$ with $N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}$.",
        es: "$I+2022N$ with $N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}$.",
        ja: "$I+2022N$ with $N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}$.",
        zh: "$I+2022N$ with $N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}$."
      } },
      { tex: "I+3033\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}", correct: true, why: {
        en: "$2022\\cdot\\tfrac32=3033$.",
        fr: "$2022\\cdot\\tfrac32=3033$.",
        es: "$2022\\cdot\\tfrac32=3033$.",
        ja: "$2022\\cdot\\tfrac32=3033$.",
        zh: "$2022\\cdot\\tfrac32=3033$."
      } },
      { tex: "\\begin{pmatrix}3033&3032\\\\-3032&-3031\\end{pmatrix}", correct: false, why: {
        en: "Entries off by one.",
        fr: "Les coefficients sont décalés de 1.",
        es: "Las entradas están desplazadas en 1.",
        ja: "成分が 1 ずつずれている。",
        zh: "各元素差 1。"
      } },
      { tex: "\\begin{pmatrix}3034&-3033\\\\3033&-3032\\end{pmatrix}", correct: false, why: {
        en: "Signs of the off-diagonal entries swapped.",
        fr: "Signes hors diagonale échangés.",
        es: "Signos fuera de la diagonal intercambiados.",
        ja: "非対角成分の符号が逆。",
        zh: "非对角元素符号反了。"
      } },
      { tex: "\\begin{pmatrix}3032&3031\\\\-3031&-3030\\end{pmatrix}", correct: false, why: {
        en: "Off by two.",
        fr: "Décalé de 2.",
        es: "Desfasado en 2.",
        ja: "2 ずれている。",
        zh: "差 2。"
      } },
      { tex: "I", correct: false, why: {
        en: "$M$ is not of finite order: $M^n=I+nN$ grows.",
        fr: "$M$ n’est pas d’ordre fini : $M^n=I+nN$ grandit.",
        es: "$M$ no es de orden finito: $M^n=I+nN$ crece.",
        ja: "$M$ は有限位数ではない。$M^n=I+nN$ は大きくなる。",
        zh: "$M$ 不是有限阶：$M^n=I+nN$ 不断增大。"
      } },
      { tex: "2022\\,M", correct: false, why: {
        en: "$M^n\\ne nM$; the identity part stays $I$.",
        fr: "$M^n\\ne nM$ ; la partie identité reste $I$.",
        es: "$M^n\\ne nM$; la parte identidad sigue siendo $I$.",
        ja: "$M^n\\ne nM$。単位行列の部分は $I$ のまま。",
        zh: "$M^n\\ne nM$；单位矩阵部分仍是 $I$。"
      } },
      { tex: "\\begin{pmatrix}3034&3033\\\\3033&3032\\end{pmatrix}", correct: false, why: {
        en: "The bottom row should be negative.",
        fr: "La ligne du bas doit être négative.",
        es: "La fila de abajo debe ser negativa.",
        ja: "下の行は負のはず。",
        zh: "下面一行应为负。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Split off the identity",
          fr: "Isoler l’identité",
          es: "Separar la identidad",
          ja: "単位行列を分ける",
          zh: "分出单位矩阵"
        },
        lines: ["M=I+N,\\qquad N=\\tfrac32\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix},\\qquad N^2=0"],
        note: {
          en: "$\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}^2=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$.",
          fr: "$\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}^2=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$.",
          es: "$\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}^2=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$.",
          ja: "$\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}^2=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$。",
          zh: "$\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}^2=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$。"
        }
      },
      {
        title: {
          en: "Binomial theorem",
          fr: "Formule du binôme",
          es: "Binomio de Newton",
          ja: "二項定理",
          zh: "二项式定理"
        },
        lines: ["M^{n}=(I+N)^n=I+nN\\quad(\\text{since } N^2=0)"],
        note: {
          en: "$I$ and $N$ commute, so the binomial theorem applies.",
          fr: "$I$ et $N$ commutent : la formule du binôme s’applique.",
          es: "$I$ y $N$ conmutan: se aplica el binomio.",
          ja: "$I$ と $N$ は可換なので二項定理が使える。",
          zh: "$I$ 与 $N$ 可交换，二项式定理适用。"
        }
      },
      {
        title: {
          en: "n = 2022",
          fr: "n = 2022",
          es: "n = 2022",
          ja: "n = 2022",
          zh: "n = 2022"
        },
        lines: ["M^{2022}=I+3033\\begin{pmatrix}1&1\\\\-1&-1\\end{pmatrix}=\\begin{pmatrix}3034&3033\\\\-3033&-3032\\end{pmatrix}"],
        note: {
          en: "Check with $n=1$: $I+\\tfrac32(\\ldots)$ gives back $M$.",
          fr: "Vérification avec $n=1$ : on retrouve $M$.",
          es: "Comprobación con $n=1$: se recupera $M$.",
          ja: "$n=1$ で $M$ に戻ることを確認。",
          zh: "用 $n=1$ 验证：回到 $M$。"
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
