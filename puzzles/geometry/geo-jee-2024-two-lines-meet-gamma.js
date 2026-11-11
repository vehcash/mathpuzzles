/* geometry · When do two lines meet?
   JEE Advanced 2024 (India), Paper 1, Mathematics Q.16 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "geo-jee-2024-two-lines-meet-gamma",
    category: "geometry",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 1, Mathematics Q.16",
        fr: "JEE Advanced 2024 (Inde), épreuve 1, mathématiques Q.16",
        es: "JEE Advanced 2024 (India), prueba 1, matemáticas Q.16",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 1 数学 Q.16",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷一 数学 Q.16"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "When do two lines meet?",
      fr: "Quand deux droites se coupent-elles ?",
      es: "¿Cuándo se cortan dos rectas?",
      ja: "2直線が交わる条件",
      zh: "两直线何时相交？"
    },
    statement: {
      en: "$L_1:\\ \\dfrac{x+11}{1}=\\dfrac{y+21}{2}=\\dfrac{z+29}{3}$ and $L_2:\\ \\dfrac{x+16}{3}=\\dfrac{y+11}{2}=\\dfrac{z+4}{\\gamma}$ intersect at $R_1$. $\\hat n$ is a unit normal to the plane containing both lines. <b>Which of the following are true?</b>",
      fr: "$L_1:\\ \\dfrac{x+11}{1}=\\dfrac{y+21}{2}=\\dfrac{z+29}{3}$ et $L_2:\\ \\dfrac{x+16}{3}=\\dfrac{y+11}{2}=\\dfrac{z+4}{\\gamma}$ se coupent en $R_1$. $\\hat n$ est un vecteur normal unitaire au plan contenant les deux droites. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$L_1:\\ \\dfrac{x+11}{1}=\\dfrac{y+21}{2}=\\dfrac{z+29}{3}$ y $L_2:\\ \\dfrac{x+16}{3}=\\dfrac{y+11}{2}=\\dfrac{z+4}{\\gamma}$ se cortan en $R_1$. $\\hat n$ es un vector normal unitario al plano que contiene ambas rectas. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$L_1:\\ \\dfrac{x+11}{1}=\\dfrac{y+21}{2}=\\dfrac{z+29}{3}$ と $L_2:\\ \\dfrac{x+16}{3}=\\dfrac{y+11}{2}=\\dfrac{z+4}{\\gamma}$ は $R_1$ で交わります。$\\hat n$ は両直線を含む平面の単位法線ベクトルです。<b>次のうち正しいものはどれですか？</b>",
      zh: "直线 $L_1:\\ \\dfrac{x+11}{1}=\\dfrac{y+21}{2}=\\dfrac{z+29}{3}$ 与 $L_2:\\ \\dfrac{x+16}{3}=\\dfrac{y+11}{2}=\\dfrac{z+4}{\\gamma}$ 交于 $R_1$，$\\hat n$ 是包含两直线的平面的单位法向量。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "Two lines crossing at a point R₁ inside a plane, with the normal n̂ drawn at R₁.",
      fr: "Deux droites se coupant en R₁ dans un plan, avec la normale n̂ en R₁.",
      es: "Dos rectas que se cortan en R₁ dentro de un plano, con la normal n̂ en R₁.",
      ja: "平面内で R₁ で交わる2直線と、R₁ での法線 n̂。",
      zh: "平面内交于 R₁ 的两直线，以及 R₁ 处的法向量 n̂。"
    },
    hint: {
      en: "Match the $x$ and $y$ coordinates to find the parameters, then use $z$ to find $\\gamma$.",
      fr: "Égalez les $x$ et les $y$ pour trouver les paramètres, puis $z$ donne $\\gamma$.",
      es: "Iguala las $x$ y las $y$ para hallar los parámetros; luego $z$ da $\\gamma$.",
      ja: "$x$, $y$ を等しくしてパラメータを求め、$z$ から $\\gamma$。",
      zh: "令 $x$、$y$ 相等求参数，再由 $z$ 求 $\\gamma$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 3.2, scale: 56, pad: 16 });
      F.path([[0.3, 0.4], [3.7, 0.4], [4.7, 1.8], [1.3, 1.8]], 'fill-blue', 'fills', true);
      F.seg([0.7, 0.6], [4.1, 1.6], 'seg'); F.seg([1.4, 1.6], [3.5, 0.6], 'seg'); F.text([4.1, 1.6], 'L₁', 'pt', 12, 0); F.text([3.5, 0.6], 'L₂', 'pt', 6, 16);
      F.dot([2.5, 1.13]); F.text([2.5, 1.13], 'R₁', 'pt', -4, 14);
      F.reveal = () => {
      arrow(F, [2.5, 1.13], [2.5, 3.0], 'vec two'); F.text([2.5, 3.0], 'n̂', 'pt', 12, 4);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "and": {"fr": "et", "es": "y", "ja": "かつ", "zh": "且"},
      "is possible": {"fr": "est possible", "es": "es posible", "ja": "となりうる", "zh": "是可能的"},
      "the lines are perpendicular": {"fr": "les droites sont perpendiculaires", "es": "las rectas son perpendiculares", "ja": "2直線は垂直", "zh": "两直线垂直"}
    },
    options: [
      { tex: "\\gamma=1\\ \\text{and}\\ R_1=(-1,-1,1)", correct: true, why: {
        en: "$t=10$, $s=5$, and $-29+30=1=-4+5\\gamma$.",
        fr: "$t=10$, $s=5$ et $-29+30=1=-4+5\\gamma$.",
        es: "$t=10$, $s=5$ y $-29+30=1=-4+5\\gamma$.",
        ja: "$t=10$、$s=5$、$-29+30=1=-4+5\\gamma$。",
        zh: "$t=10$，$s=5$，$-29+30=1=-4+5\\gamma$。"
      } },
      { tex: "\\overrightarrow{OR_1}\\cdot\\hat n=\\sqrt{\\tfrac23}\\ \\text{is possible}", correct: true, why: {
        en: "$\\hat n=\\tfrac1{\\sqrt6}(1,-2,1)$ gives $\\tfrac{-1+2+1}{\\sqrt6}$.",
        fr: "$\\hat n=\\tfrac1{\\sqrt6}(1,-2,1)$ donne $\\tfrac{-1+2+1}{\\sqrt6}$.",
        es: "$\\hat n=\\tfrac1{\\sqrt6}(1,-2,1)$ da $\\tfrac{-1+2+1}{\\sqrt6}$.",
        ja: "$\\hat n=\\tfrac1{\\sqrt6}(1,-2,1)$ で $\\tfrac{-1+2+1}{\\sqrt6}$。",
        zh: "$\\hat n=\\tfrac1{\\sqrt6}(1,-2,1)$ 得 $\\tfrac{-1+2+1}{\\sqrt6}$。"
      } },
      { tex: "\\gamma=\\sqrt{\\tfrac23}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\hat n=-\\hat i-\\hat j+\\hat k", correct: false, why: {
        en: "Not a unit vector, and not perpendicular to $(1,2,3)$.",
        fr: "Ni unitaire, ni orthogonal à $(1,2,3)$.",
        es: "Ni unitario ni perpendicular a $(1,2,3)$.",
        ja: "単位ベクトルでも $(1,2,3)$ と垂直でもない。",
        zh: "既非单位向量，也不垂直于 $(1,2,3)$。"
      } },
      { tex: "\\overrightarrow{OR_1}\\cdot\\hat n=\\sqrt{\\tfrac32}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "R_1=(1,2,3)", correct: false, why: {
        en: "That is the direction of $L_1$, not a point on it.",
        fr: "C’est la direction de $L_1$, pas un de ses points.",
        es: "Es la dirección de $L_1$, no un punto.",
        ja: "$L_1$ の方向で、点ではない。",
        zh: "那是 $L_1$ 的方向，不是点。"
      } },
      { tex: "\\gamma=3", correct: false, why: {
        en: "Then $z$ would not match: $-4+15\\ne1$.",
        fr: "Alors $z$ ne correspondrait pas : $-4+15\\ne1$.",
        es: "Entonces $z$ no coincide: $-4+15\\ne1$.",
        ja: "$z$ が合わない：$-4+15\\ne1$。",
        zh: "$z$ 不符：$-4+15\\ne1$。"
      } },
      { tex: "\\text{the lines are perpendicular}", correct: false, why: {
        en: "$(1,2,3)\\cdot(3,2,1)=10\\ne0$.",
        fr: "$(1,2,3)\\cdot(3,2,1)=10\\ne0$.",
        es: "$(1,2,3)\\cdot(3,2,1)=10\\ne0$.",
        ja: "$(1,2,3)\\cdot(3,2,1)=10\\ne0$。",
        zh: "$(1,2,3)\\cdot(3,2,1)=10\\ne0$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Match x and y",
          fr: "Égaler x et y",
          es: "Igualar x e y",
          ja: "x, y を合わせる",
          zh: "令 x、y 相等"
        },
        lines: ["-11+t=-16+3s,\\ -21+2t=-11+2s\\ \\Rightarrow\\ s=5,\\ t=10"],
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
          en: "Use z",
          fr: "Utiliser z",
          es: "Usar z",
          ja: "z を使う",
          zh: "用 z"
        },
        lines: ["-29+30=1=-4+5\\gamma\\ \\Rightarrow\\ \\gamma=1,\\quad R_1=(-1,-1,1)"],
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
          en: "Normal",
          fr: "Normale",
          es: "Normal",
          ja: "法線",
          zh: "法向量"
        },
        lines: ["(1,2,3)\\times(3,2,1)=(-4,8,-4)\\parallel(1,-2,1),\\quad\\hat n=\\pm\\tfrac1{\\sqrt6}(1,-2,1)"],
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
