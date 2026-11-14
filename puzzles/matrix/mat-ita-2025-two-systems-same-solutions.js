/* matrix · Two linear systems with the same solution set
   ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 7 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "mat-ita-2025-two-systems-same-solutions",
    category: "matrix",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "ITA (Instituto Tecnológico de Aeronáutica, Brazil) entrance exam 2025, 1st phase (13 October 2024), Mathematics, Question 7",
        fr: "Concours de l’ITA (Brésil) 2025, 1re phase (13 octobre 2024), mathématiques, question 7",
        es: "Examen de ingreso del ITA (Brasil) 2025, 1.ª fase (13 de octubre de 2024), matemáticas, pregunta 7",
        ja: "ITA（ブラジル航空技術大学）2025 入試 第1次（2024年10月13日） 数学 第7問",
        zh: "巴西航空技术学院 ITA 2025 入学考试第一阶段（2024年10月13日）数学第 7 题"
      },
      exams: ["ita"]
    },
    difficulty: 3,
    title: {
      en: "Two linear systems with the same solution set",
      fr: "Deux systèmes linéaires de même ensemble solution",
      es: "Dos sistemas lineales con el mismo conjunto solución",
      ja: "解集合が同じ2つの連立1次方程式",
      zh: "解集相同的两个线性方程组"
    },
    statement: {
      en: "System I: $x+y+z=1$, $x+2y-z=2$, $2x+y+4z=1$. System II: $x+y+z=1$, $x+my+nz=5$, $kx+y-z=3m+2n$. The two systems have the same set of solutions. <b>Which of the following are true?</b>",
      fr: "Système I : $x+y+z=1$, $x+2y-z=2$, $2x+y+4z=1$. Système II : $x+y+z=1$, $x+my+nz=5$, $kx+y-z=3m+2n$. Les deux systèmes ont le même ensemble de solutions. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "Sistema I: $x+y+z=1$, $x+2y-z=2$, $2x+y+4z=1$. Sistema II: $x+y+z=1$, $x+my+nz=5$, $kx+y-z=3m+2n$. Ambos sistemas tienen el mismo conjunto de soluciones. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "系 I：$x+y+z=1$, $x+2y-z=2$, $2x+y+4z=1$。系 II：$x+y+z=1$, $x+my+nz=5$, $kx+y-z=3m+2n$。2つの系の解集合は等しい。 <b>次のうち正しいものはどれですか？</b>",
      zh: "方程组 I：$x+y+z=1$，$x+2y-z=2$，$2x+y+4z=1$。方程组 II：$x+y+z=1$，$x+my+nz=5$，$kx+y-z=3m+2n$。两方程组解集相同。 <b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The coefficient matrix of system I with its rows.",
      fr: "La matrice des coefficients du système I.",
      es: "La matriz de coeficientes del sistema I.",
      ja: "系 I の係数行列。",
      zh: "方程组 I 的系数矩阵。"
    },
    hint: {
      en: "System I is not a single point: solve it in terms of $z$, then substitute the whole line into system II.",
      fr: "Le système I n’a pas une seule solution : résolvez en fonction de $z$, puis substituez la droite dans le système II.",
      es: "El sistema I no tiene solución única: resuélvelo en función de $z$ y sustituye la recta en el sistema II.",
      ja: "系 I は1点でない。$z$ で表して、その直線を系 II に代入。",
      zh: "方程组 I 不唯一：用 $z$ 表示解，再把整条直线代入方程组 II。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.4, h: 2.6, scale: 50, pad: 16 });
      [['1', '1', '1', '1'], ['1', '2', '−1', '2'], ['2', '1', '4', '1']].forEach((r, i) => r.forEach((v, j) => F.text([0.6 + j * 0.9 + (j === 3 ? 0.3 : 0), 2.1 - i * 0.75], v, 'pt', 0, 0)));
      F.seg([3.05, 0.45], [3.05, 2.4], 'seg thin');
      F.reveal = () => {
      F.text([2.2, 0.0], 'det = 0', 'len small', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "det = 0": {"fr": "det = 0", "es": "det = 0", "ja": "det = 0", "zh": "det = 0"},
      "system I has infinitely many solutions": {"fr": "le système I a une infinité de solutions", "es": "el sistema I tiene infinitas soluciones", "ja": "系 I の解は無数にある", "zh": "方程组 I 有无穷多解"},
      "system I has exactly one solution": {"fr": "le système I a une seule solution", "es": "el sistema I tiene solución única", "ja": "系 I の解はちょうど1つ", "zh": "方程组 I 有唯一解"}
    },
    options: [
      { tex: "k=\\tfrac13", correct: true, why: {
        en: "$(1-3k)z+1=1\\ \\ \\forall z$",
        fr: "$(1-3k)z+1=1\\ \\ \\forall z$",
        es: "$(1-3k)z+1=1\\ \\ \\forall z$",
        ja: "$(1-3k)z+1=1\\ \\ \\forall z$",
        zh: "$(1-3k)z+1=1\\ \\ \\forall z$"
      } },
      { tex: "\\text{system I has infinitely many solutions}", correct: true, why: {
        en: "Row 3 $=3\\cdot$row 1 $-$ row 2.",
        fr: "Ligne 3 $=3\\cdot$ligne 1 $-$ ligne 2.",
        es: "Fila 3 $=3\\cdot$fila 1 $-$ fila 2.",
        ja: "第3行 $=3\\times$第1行 $-$ 第2行。",
        zh: "第三行 $=3\\times$第一行 $-$ 第二行。"
      } },
      { tex: "k=\\tfrac12", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=1", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "k=3", correct: false, why: {
        en: "Inverts $\\tfrac13$.",
        fr: "Inverse $\\tfrac13$.",
        es: "Invierte $\\tfrac13$.",
        ja: "$\\tfrac13$ の逆数。",
        zh: "把 $\\tfrac13$ 取了倒数。"
      } },
      { tex: "(m,n)=(5,7)", correct: false, why: {
        en: "$n=-7$: the sign matters, $-3+2m+n=0$.",
        fr: "$n=-7$ : attention au signe, $-3+2m+n=0$.",
        es: "$n=-7$: cuidado con el signo, $-3+2m+n=0$.",
        ja: "$n=-7$。符号に注意：$-3+2m+n=0$。",
        zh: "$n=-7$，注意符号：$-3+2m+n=0$。"
      } },
      { tex: "\\text{system I has exactly one solution}", correct: false, why: {
        en: "$\\det=1(8+1)-1(4+2)+1(1-4)=0$",
        fr: "$\\det=1(8+1)-1(4+2)+1(1-4)=0$",
        es: "$\\det=1(8+1)-1(4+2)+1(1-4)=0$",
        ja: "$\\det=1(8+1)-1(4+2)+1(1-4)=0$",
        zh: "$\\det=1(8+1)-1(4+2)+1(1-4)=0$"
      } },
      { tex: "k=2", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Solve system I",
          fr: "Résoudre le système I",
          es: "Resolver el sistema I",
          ja: "系 I を解く",
          zh: "解方程组 I"
        },
        lines: ["(x,y,z)=(-3z,\\ 1+2z,\\ z),\\ z\\in\\mathbb R"],
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
          en: "Force system II",
          fr: "Imposer le système II",
          es: "Imponer el sistema II",
          ja: "系 II に代入",
          zh: "代入方程组 II"
        },
        lines: ["-3z+m(1+2z)+nz=5\\ \\forall z\\Rightarrow m=5,\\ n=-7;\\quad(1-3k)z+1=3m+2n=1\\Rightarrow k=\\tfrac13"],
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
