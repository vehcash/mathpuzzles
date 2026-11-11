/* probability · Three students and one problem
   JEE Advanced 2025 (India), Paper 1, Mathematics Q.2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "prob-jee-2025-three-students-solve",
    category: "probability",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2025 (India), Paper 1, Mathematics Q.2",
        fr: "JEE Advanced 2025 (Inde), épreuve 1, mathématiques Q.2",
        es: "JEE Advanced 2025 (India), prueba 1, matemáticas Q.2",
        ja: "JEE Advanced 2025（インド工科大学入試）Paper 1 数学 Q.2",
        zh: "印度理工学院入学考试 JEE Advanced 2025 卷一 数学 Q.2"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Three students and one problem",
      fr: "Trois élèves et un problème",
      es: "Tres estudiantes y un problema",
      ja: "3人の生徒と1つの問題",
      zh: "三名学生与一道题"
    },
    statement: {
      en: "Students $S_1,S_2,S_3$ work independently on a problem. $U$: at least one solves it; $V$: $S_1$ solves it, given that neither $S_2$ nor $S_3$ does; $W$: $S_2$ solves it and $S_3$ does not; $T$: $S_3$ solves it. If $P(U)=\\tfrac12$, $P(V)=\\tfrac1{10}$ and $P(W)=\\tfrac1{12}$, <b>which of the following equal $P(T)$?</b>",
      fr: "Les élèves $S_1,S_2,S_3$ travaillent indépendamment. $U$ : au moins un résout ; $V$ : $S_1$ résout, sachant que ni $S_2$ ni $S_3$ ne résout ; $W$ : $S_2$ résout et $S_3$ non ; $T$ : $S_3$ résout. Si $P(U)=\\tfrac12$, $P(V)=\\tfrac1{10}$ et $P(W)=\\tfrac1{12}$, <b>lesquelles des valeurs suivantes sont égales à $P(T)$ ?</b>",
      es: "Los estudiantes $S_1,S_2,S_3$ trabajan de forma independiente. $U$: al menos uno lo resuelve; $V$: $S_1$ lo resuelve, sabiendo que ni $S_2$ ni $S_3$ lo hacen; $W$: $S_2$ lo resuelve y $S_3$ no; $T$: $S_3$ lo resuelve. Si $P(U)=\\tfrac12$, $P(V)=\\tfrac1{10}$ y $P(W)=\\tfrac1{12}$, <b>¿cuáles de los siguientes valores son iguales a $P(T)$?</b>",
      ja: "生徒 $S_1,S_2,S_3$ が独立に問題を解きます。$U$：少なくとも1人が解ける、$V$：$S_2$ も $S_3$ も解けないという条件のもとで $S_1$ が解ける、$W$：$S_2$ が解け $S_3$ は解けない、$T$：$S_3$ が解ける。$P(U)=\\tfrac12$、$P(V)=\\tfrac1{10}$、$P(W)=\\tfrac1{12}$ のとき、<b>$P(T)$ に等しいものはどれですか？</b>",
      zh: "学生 $S_1,S_2,S_3$ 独立解一道题。$U$：至少一人解出；$V$：在 $S_2$、$S_3$ 都没解出的条件下 $S_1$ 解出；$W$：$S_2$ 解出而 $S_3$ 没解出；$T$：$S_3$ 解出。若 $P(U)=\\tfrac12$，$P(V)=\\tfrac1{10}$，$P(W)=\\tfrac1{12}$，<b>下列哪些等于 $P(T)$？</b>"
    },
    figureText: {
      en: "Three boxes for the students with their unknown probabilities p₁, p₂, p₃.",
      fr: "Trois cases pour les élèves avec leurs probabilités inconnues p₁, p₂, p₃.",
      es: "Tres casillas para los estudiantes con sus probabilidades p₁, p₂, p₃.",
      ja: "3人の生徒の箱と未知の確率 p₁, p₂, p₃。",
      zh: "三个学生的方框及未知概率 p₁、p₂、p₃。"
    },
    hint: {
      en: "By independence $P(V)=p_1$. Write $q=1-p_3$ and use $P(\\text{nobody})=\\tfrac12$.",
      fr: "Par indépendance $P(V)=p_1$. Posez $q=1-p_3$ et utilisez $P(\\text{personne})=\\tfrac12$.",
      es: "Por independencia $P(V)=p_1$. Pon $q=1-p_3$ y usa $P(\\text{nadie})=\\tfrac12$.",
      ja: "独立なので $P(V)=p_1$。$q=1-p_3$ とおき $P(\\text{誰も解けない})=\\tfrac12$ を使う。",
      zh: "由独立 $P(V)=p_1$。令 $q=1-p_3$，用 $P(\\text{无人解出})=\\tfrac12$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.6, h: 1.8, scale: 52, pad: 16 });
      ['S₁', 'S₂', 'S₃'].forEach((t, k) => { F.rect(0.3 + k * 1.8, 0.4, 1.4, 1.0, 'fill-blue', 'fills'); F.text([1.0 + k * 1.8, 1.0], t, 'pt', 0, 0); F.text([1.0 + k * 1.8, 0.4], 'p' + '₁₂₃'[k], 'len small', 0, 14); });
      F.reveal = () => {
      ['1/10', '3/23', '13/36'].forEach((t, k) => F.text([1.0 + k * 1.8, 1.4], t, 'len small', 0, -10));
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "nobody": {"fr": "personne", "es": "nadie", "ja": "誰も解けない", "zh": "无人解出"}
    },
    options: [
      { tex: "\\tfrac{13}{36}", correct: true, why: {
        en: "$q=\\tfrac1{12}+\\tfrac59=\\tfrac{23}{36}$, so $p_3=\\tfrac{13}{36}$.",
        fr: "$q=\\tfrac1{12}+\\tfrac59=\\tfrac{23}{36}$, donc $p_3=\\tfrac{13}{36}$.",
        es: "$q=\\tfrac1{12}+\\tfrac59=\\tfrac{23}{36}$, así $p_3=\\tfrac{13}{36}$.",
        ja: "$q=\\tfrac1{12}+\\tfrac59=\\tfrac{23}{36}$ より $p_3=\\tfrac{13}{36}$。",
        zh: "$q=\\tfrac1{12}+\\tfrac59=\\tfrac{23}{36}$，故 $p_3=\\tfrac{13}{36}$。"
      } },
      { tex: "1-\\tfrac{23}{36}", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "\\tfrac13", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{19}{60}", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac14", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "\\tfrac{23}{36}", correct: false, why: {
        en: "That is $1-p_3$.",
        fr: "C’est $1-p_3$.",
        es: "Es $1-p_3$.",
        ja: "$1-p_3$ の値。",
        zh: "那是 $1-p_3$。"
      } },
      { tex: "\\tfrac{3}{23}", correct: false, why: {
        en: "That is $p_2$.",
        fr: "C’est $p_2$.",
        es: "Es $p_2$.",
        ja: "$p_2$ の値。",
        zh: "那是 $p_2$。"
      } },
      { tex: "\\tfrac59", correct: false, why: {
        en: "That is $(1-p_2)(1-p_3)$.",
        fr: "C’est $(1-p_2)(1-p_3)$.",
        es: "Es $(1-p_2)(1-p_3)$.",
        ja: "$(1-p_2)(1-p_3)$ の値。",
        zh: "那是 $(1-p_2)(1-p_3)$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Use independence",
          fr: "Utiliser l’indépendance",
          es: "Usar la independencia",
          ja: "独立性を使う",
          zh: "利用独立性"
        },
        lines: ["P(V)=p_1=\\tfrac1{10},\\qquad(1-p_1)(1-p_2)(1-p_3)=\\tfrac12\\ \\Rightarrow\\ (1-p_2)q=\\tfrac59"],
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
          en: "Add the two pieces",
          fr: "Additionner les deux morceaux",
          es: "Sumar las dos piezas",
          ja: "2つを足す",
          zh: "两式相加"
        },
        lines: ["p_2q=\\tfrac1{12},\\ (1-p_2)q=\\tfrac59\\ \\Rightarrow\\ q=\\tfrac{23}{36},\\quad P(T)=\\boxed{\\tfrac{13}{36}}"],
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
