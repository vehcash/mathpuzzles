/* matrix · When is A − λI singular?
   PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 1.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-evau-2025-characteristic-polynomial",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "PAU 2025 (Madrid, Spain), Matemáticas II, ordinary session (June 2025), Question 1.2",
        fr: "PAU 2025 (Madrid, Espagne), Matemáticas II, session ordinaire (juin 2025), question 1.2",
        es: "PAU 2025 (Madrid), Matemáticas II, convocatoria ordinaria (junio de 2025), pregunta 1.2",
        ja: "スペイン PAU 2025（マドリード）数学 II 通常日程（2025年6月）問 1.2",
        zh: "西班牙 PAU 2025（马德里）数学 II 常规考试（2025年6月）第 1.2 题"
      },
      exams: ["ebau"]
    },
    difficulty: 2,
    title: {
      en: "When is A − λI singular?",
      fr: "Quand A − λI est-elle singulière ?",
      es: "¿Cuándo es singular A − λI?",
      ja: "A − λI が正則でないのは？",
      zh: "A − λI 何时奇异？"
    },
    statement: {
      en: "$A=\\begin{pmatrix}4&1&0\\\\2&3&0\\\\3&2&2\\end{pmatrix}$ and $P(\\lambda)=\\det(A-\\lambda I)$. <b>Which of the following are true?</b>",
      fr: "$A=\\begin{pmatrix}4&1&0\\\\2&3&0\\\\3&2&2\\end{pmatrix}$ et $P(\\lambda)=\\det(A-\\lambda I)$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$A=\\begin{pmatrix}4&1&0\\\\2&3&0\\\\3&2&2\\end{pmatrix}$ y $P(\\lambda)=\\det(A-\\lambda I)$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$A=\\begin{pmatrix}4&1&0\\\\2&3&0\\\\3&2&2\\end{pmatrix}$、$P(\\lambda)=\\det(A-\\lambda I)$ とします。<b>次のうち正しいものはどれですか？</b>",
      zh: "$A=\\begin{pmatrix}4&1&0\\\\2&3&0\\\\3&2&2\\end{pmatrix}$，$P(\\lambda)=\\det(A-\\lambda I)$。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The matrix with its last column highlighted: only the bottom entry is non-zero.",
      fr: "La matrice, dernière colonne en surbrillance : seul le coefficient du bas est non nul.",
      es: "La matriz con su última columna resaltada: solo la entrada de abajo es no nula.",
      ja: "最後の列を強調した行列。下の成分だけが非零。",
      zh: "高亮最后一列的矩阵：只有最下面的元素非零。"
    },
    hint: {
      en: "Expand along the third column: $P(\\lambda)=(2-\\lambda)\\bigl[(4-\\lambda)(3-\\lambda)-2\\bigr]$.",
      fr: "Développez selon la troisième colonne : $P(\\lambda)=(2-\\lambda)\\bigl[(4-\\lambda)(3-\\lambda)-2\\bigr]$.",
      es: "Desarrolla por la tercera columna: $P(\\lambda)=(2-\\lambda)\\bigl[(4-\\lambda)(3-\\lambda)-2\\bigr]$.",
      ja: "3列目で展開：$P(\\lambda)=(2-\\lambda)\\bigl[(4-\\lambda)(3-\\lambda)-2\\bigr]$。",
      zh: "按第三列展开：$P(\\lambda)=(2-\\lambda)\\bigl[(4-\\lambda)(3-\\lambda)-2\\bigr]$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 3.6, h: 2.6, scale: 60, pad: 16 });
      const M = [['4', '1', '0'], ['2', '3', '0'], ['3', '2', '2']];
      F.rect(2.45, 0.3, 0.7, 2.0, 'fill-yellow', 'fills');
      M.forEach((r, i) => r.forEach((t, j) => F.text([0.8 + j * 1.0, 2.0 - i * 0.7], t, 'pt', 0, 0)));
      F.seg([0.35, 0.25], [0.35, 2.35], 'seg'); F.seg([3.25, 0.25], [3.25, 2.35], 'seg');
      F.reveal = () => {
      F.text([1.8, 0.05], '(λ − 2)²(λ − 5)', 'len small', 0, 6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "(λ − 2)²(λ − 5)": {"fr": "(λ − 2)²(λ − 5)", "es": "(λ − 2)²(λ − 5)", "ja": "(λ − 2)²(λ − 5)", "zh": "(λ − 2)²(λ − 5)"},
      "the real roots are": {"fr": "les racines réelles sont", "es": "las raíces reales son", "ja": "実数解は", "zh": "实根为"},
      "has three distinct roots": {"fr": "a trois racines distinctes", "es": "tiene tres raíces distintas", "ja": "は異なる3つの解をもつ", "zh": "有三个不同的根"}
    },
    options: [
      { tex: "P(\\lambda)=-(\\lambda-2)^2(\\lambda-5)", correct: true, why: {
        en: "$(2-\\lambda)(\\lambda^2-7\\lambda+10)=(2-\\lambda)(\\lambda-2)(\\lambda-5)$",
        fr: "$(2-\\lambda)(\\lambda^2-7\\lambda+10)=(2-\\lambda)(\\lambda-2)(\\lambda-5)$",
        es: "$(2-\\lambda)(\\lambda^2-7\\lambda+10)=(2-\\lambda)(\\lambda-2)(\\lambda-5)$",
        ja: "$(2-\\lambda)(\\lambda^2-7\\lambda+10)=(2-\\lambda)(\\lambda-2)(\\lambda-5)$",
        zh: "$(2-\\lambda)(\\lambda^2-7\\lambda+10)=(2-\\lambda)(\\lambda-2)(\\lambda-5)$"
      } },
      { tex: "A\\begin{pmatrix}3\\\\3\\\\5\\end{pmatrix}=5\\begin{pmatrix}3\\\\3\\\\5\\end{pmatrix}", correct: true, why: {
        en: "$(12+3,\\ 6+9,\\ 9+6+10)=(15,15,25)$",
        fr: "$(12+3,\\ 6+9,\\ 9+6+10)=(15,15,25)$",
        es: "$(12+3,\\ 6+9,\\ 9+6+10)=(15,15,25)$",
        ja: "$(12+3,\\ 6+9,\\ 9+6+10)=(15,15,25)$",
        zh: "$(12+3,\\ 6+9,\\ 9+6+10)=(15,15,25)$"
      } },
      { tex: "\\text{the real roots are}\\ 2,\\ 3,\\ 4", correct: false, why: {
        en: "Those are diagonal entries; $A$ is not triangular.",
        fr: "Ce sont les coefficients diagonaux ; $A$ n’est pas triangulaire.",
        es: "Son las entradas diagonales; $A$ no es triangular.",
        ja: "対角成分。$A$ は三角行列でない。",
        zh: "那是对角元，$A$ 不是三角矩阵。"
      } },
      { tex: "\\det A=24", correct: false, why: {
        en: "$\\det A=P(0)=2\\cdot(12-2)=20$",
        fr: "$\\det A=P(0)=2\\cdot(12-2)=20$",
        es: "$\\det A=P(0)=2\\cdot(12-2)=20$",
        ja: "$\\det A=P(0)=2\\cdot(12-2)=20$",
        zh: "$\\det A=P(0)=2\\cdot(12-2)=20$"
      } },
      { tex: "A\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}=5\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}", correct: false, why: {
        en: "$A(1,1,1)^T=(5,5,7)$",
        fr: "$A(1,1,1)^T=(5,5,7)$",
        es: "$A(1,1,1)^T=(5,5,7)$",
        ja: "$A(1,1,1)^T=(5,5,7)$",
        zh: "$A(1,1,1)^T=(5,5,7)$"
      } },
      { tex: "P\\ \\text{has three distinct roots}", correct: false, why: {
        en: "$2$ is a double root.",
        fr: "$2$ est racine double.",
        es: "$2$ es raíz doble.",
        ja: "$2$ は重解。",
        zh: "$2$ 是二重根。"
      } },
      { tex: "P(\\lambda)=-(\\lambda-1)(\\lambda-2)(\\lambda-5)", correct: false, why: {
        en: "Arithmetic slip.",
        fr: "Erreur de calcul.",
        es: "Error de cálculo.",
        ja: "計算ミス。",
        zh: "计算错误。"
      } },
      { tex: "\\operatorname{tr}A=10", correct: false, why: {
        en: "$4+3+2=9=2+2+5$",
        fr: "$4+3+2=9=2+2+5$",
        es: "$4+3+2=9=2+2+5$",
        ja: "$4+3+2=9=2+2+5$",
        zh: "$4+3+2=9=2+2+5$"
      } }
    ],
    steps: [
      {
        title: {
          en: "Expand",
          fr: "Développer",
          es: "Desarrollar",
          ja: "展開",
          zh: "展开"
        },
        lines: ["P(\\lambda)=(2-\\lambda)\\bigl(\\lambda^2-7\\lambda+10\\bigr)=-(\\lambda-2)^2(\\lambda-5)"],
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
          en: "Kernel of A − 5I",
          fr: "Noyau de A − 5I",
          es: "Núcleo de A − 5I",
          ja: "A − 5I の核",
          zh: "A − 5I 的核"
        },
        lines: ["\\begin{pmatrix}-1&1&0\\\\2&-2&0\\\\3&2&-3\\end{pmatrix}v=0\\Rightarrow v=(3,3,5)"],
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
