/* algebra · From S₄ and S₆ to S₈
   Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 8 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "alg-gaokao-2023-geometric-s8",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2023, New Curriculum Paper II (新课标II卷), Question 8",
        fr: "Gaokao 2023, épreuve nationale II (新课标II卷), question 8",
        es: "Gaokao 2023, examen nacional II (新课标II卷), pregunta 8",
        ja: "2023年 中国・高考 新課程標準II卷 第8問",
        zh: "2023年高考数学新课标II卷 第8题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "From S₄ and S₆ to S₈",
      fr: "De S₄ et S₆ à S₈",
      es: "De S₄ y S₆ a S₈",
      ja: "S₄ と S₆ から S₈ へ",
      zh: "由 S₄、S₆ 求 S₈"
    },
    statement: {
      en: "$S_n$ is the sum of the first $n$ terms of a geometric sequence, with $S_4=-5$ and $S_6=21S_2$. <b>Which of the following equal $S_8$?</b>",
      fr: "$S_n$ est la somme des $n$ premiers termes d’une suite géométrique, avec $S_4=-5$ et $S_6=21S_2$. <b>Lesquelles des valeurs suivantes sont égales à $S_8$ ?</b>",
      es: "$S_n$ es la suma de los $n$ primeros términos de una sucesión geométrica, con $S_4=-5$ y $S_6=21S_2$. <b>¿Cuáles de los siguientes valores son iguales a $S_8$?</b>",
      ja: "等比数列の初項から第 $n$ 項までの和を $S_n$ とし、$S_4=-5$、$S_6=21S_2$ です。<b>$S_8$ に等しいものはどれですか？</b>",
      zh: "记 $S_n$ 为等比数列 $\\{a_n\\}$ 的前 $n$ 项和，若 $S_4=-5$，$S_6=21S_2$，<b>下列哪些等于 $S_8$？</b>"
    },
    figureText: {
      en: "The first eight terms grouped in pairs: each pair is q² times the previous pair.",
      fr: "Les huit premiers termes groupés par deux : chaque paire vaut q² fois la précédente.",
      es: "Los ocho primeros términos en parejas: cada pareja es q² veces la anterior.",
      ja: "最初の8項を2つずつまとめる。各組は前の組の q² 倍。",
      zh: "前八项两两分组：每组是前一组的 q² 倍。"
    },
    hint: {
      en: "Group the terms in pairs. If $S_2=s$, the pairs are $s,\\ q^2s,\\ q^4s,\\ q^6s$.",
      fr: "Groupez les termes par deux. Si $S_2=s$, les paires valent $s,\\ q^2s,\\ q^4s,\\ q^6s$.",
      es: "Agrupa los términos de dos en dos. Si $S_2=s$, las parejas valen $s,\\ q^2s,\\ q^4s,\\ q^6s$.",
      ja: "2項ずつまとめる。$S_2=s$ なら各組は $s,\\ q^2s,\\ q^4s,\\ q^6s$。",
      zh: "两项一组。若 $S_2=s$，各组为 $s,\\ q^2s,\\ q^4s,\\ q^6s$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.2, h: 2.2, scale: 52, pad: 16 });
      const lab = ['S₂', 'q²S₂', 'q⁴S₂', 'q⁶S₂'];
      lab.forEach((t, i) => { F.rect(0.2 + i * 1.75, 1.0, 1.55, 0.7, 'fill-blue', 'fills'); F.text([0.975 + i * 1.75, 1.35], t, 'pt', 0, 0); F.text([0.975 + i * 1.75, 1.0], `a${2 * i + 1} + a${2 * i + 2}`, 'len small', 0, 14); });
      F.reveal = () => {
      ['−1', '−4', '−16', '−64'].forEach((t, i) => F.text([0.975 + i * 1.75, 1.7], t, 'len small', 0, -10));
      };
      return F;
    },
    options: [
      { tex: "-85", correct: true, why: {
        en: "$q^2=4$, $S_2=-1$, so $S_8=-(1+4+16+64)$.",
        fr: "$q^2=4$, $S_2=-1$, donc $S_8=-(1+4+16+64)$.",
        es: "$q^2=4$, $S_2=-1$, así que $S_8=-(1+4+16+64)$.",
        ja: "$q^2=4$、$S_2=-1$ より $S_8=-(1+4+16+64)$。",
        zh: "$q^2=4$，$S_2=-1$，故 $S_8=-(1+4+16+64)$。"
      } },
      { tex: "-5\\cdot17", correct: true, why: {
        en: "Two options are the same number.",
        fr: "Deux options sont le même nombre.",
        es: "Dos opciones son el mismo número.",
        ja: "2つの選択肢は同じ数です。",
        zh: "有两个选项是同一个数。"
      } },
      { tex: "85", correct: false, why: {
        en: "Sign slip: $S_2=-1$, not $1$.",
        fr: "Erreur de signe : $S_2=-1$, pas $1$.",
        es: "Error de signo: $S_2=-1$, no $1$.",
        ja: "符号ミス：$S_2=-1$。",
        zh: "符号错：$S_2=-1$。"
      } },
      { tex: "120", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-120", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "-21", correct: false, why: {
        en: "That is $S_6$.",
        fr: "C’est $S_6$.",
        es: "Es $S_6$.",
        ja: "それは $S_6$。",
        zh: "那是 $S_6$。"
      } },
      { tex: "-64", correct: false, why: {
        en: "That is only the last pair $a_7+a_8$.",
        fr: "C’est seulement la dernière paire $a_7+a_8$.",
        es: "Es solo la última pareja $a_7+a_8$.",
        ja: "最後の組 $a_7+a_8$ だけ。",
        zh: "那只是最后一组 $a_7+a_8$。"
      } },
      { tex: "-80", correct: false, why: {
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
          en: "Pairs",
          fr: "Paires",
          es: "Parejas",
          ja: "組に分ける",
          zh: "分组"
        },
        lines: ["S_6=S_2(1+q^2+q^4)=21S_2\\ \\Rightarrow\\ q^4+q^2-20=0\\ \\Rightarrow\\ q^2=4"],
        note: {
          en: "$S_2\\ne0$ because $S_4\\ne0$.",
          fr: "$S_2\\ne0$ car $S_4\\ne0$.",
          es: "$S_2\\ne0$ porque $S_4\\ne0$.",
          ja: "$S_4\\ne0$ なので $S_2\\ne0$。",
          zh: "因为 $S_4\\ne0$，所以 $S_2\\ne0$。"
        }
      },
      {
        title: {
          en: "Find S₂",
          fr: "Trouver S₂",
          es: "Hallar S₂",
          ja: "S₂ を求める",
          zh: "求 S₂"
        },
        lines: ["S_4=S_2(1+q^2)=5S_2=-5\\ \\Rightarrow\\ S_2=-1"],
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
          en: "Add four pairs",
          fr: "Additionner quatre paires",
          es: "Sumar cuatro parejas",
          ja: "4組を足す",
          zh: "四组相加"
        },
        lines: ["S_8=S_2(1+4+16+64)=\\boxed{-85}"],
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
