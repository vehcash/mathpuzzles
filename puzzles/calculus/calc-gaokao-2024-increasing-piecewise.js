/* calculus · Increasing on both sides of zero
   Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 6 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "calc-gaokao-2024-increasing-piecewise",
    category: "calculus",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Gaokao 2024, New Curriculum Paper I (新课标I卷), Question 6",
        fr: "Gaokao 2024, épreuve nationale I (新课标I卷), question 6",
        es: "Gaokao 2024, examen nacional I (新课标I卷), pregunta 6",
        ja: "2024年 中国・高考 新課程標準I卷 第6問",
        zh: "2024年高考数学新课标I卷 第6题"
      },
      exams: ["gaokao"]
    },
    difficulty: 2,
    title: {
      en: "Increasing on both sides of zero",
      fr: "Croissante des deux côtés de zéro",
      es: "Creciente a ambos lados de cero",
      ja: "0 の両側で増加",
      zh: "在零点两侧都递增"
    },
    statement: {
      en: "$f(x)=\\begin{cases}-x^2-2ax-a, & x<0\\\\ e^x+\\ln(x+1), & x\\ge0\\end{cases}$ is increasing on $\\mathbb R$. <b>Which of the following describe the set of all possible $a$?</b>",
      fr: "$f(x)=\\begin{cases}-x^2-2ax-a, & x<0\\\\ e^x+\\ln(x+1), & x\\ge0\\end{cases}$ est croissante sur $\\mathbb R$. <b>Lesquels des ensembles suivants décrivent toutes les valeurs possibles de $a$ ?</b>",
      es: "$f(x)=\\begin{cases}-x^2-2ax-a, & x<0\\\\ e^x+\\ln(x+1), & x\\ge0\\end{cases}$ es creciente en $\\mathbb R$. <b>¿Cuáles de los siguientes conjuntos describen todos los valores posibles de $a$?</b>",
      ja: "$f(x)=\\begin{cases}-x^2-2ax-a, & x<0\\\\ e^x+\\ln(x+1), & x\\ge0\\end{cases}$ は $\\mathbb R$ で増加します。<b>$a$ のとりうる値の範囲を表すものはどれですか？</b>",
      zh: "函数 $f(x)=\\begin{cases}-x^2-2ax-a, & x<0\\\\ e^x+\\ln(x+1), & x\\ge0\\end{cases}$ 在 $\\mathbb R$ 上单调递增。<b>下列哪些表示 $a$ 的取值范围？</b>"
    },
    figureText: {
      en: "The right-hand piece eˣ + ln(x + 1) for x ≥ 0, starting at (0, 1). The left-hand piece depends on a and is not drawn.",
      fr: "La partie droite eˣ + ln(x + 1) pour x ≥ 0, qui part de (0, 1). La partie gauche dépend de a et n’est pas tracée.",
      es: "La parte derecha eˣ + ln(x + 1) para x ≥ 0, que empieza en (0, 1). La parte izquierda depende de a y no se dibuja.",
      ja: "x ≥ 0 の部分 eˣ + ln(x + 1)（(0, 1) から始まる）。左側の部分は a によるので描いていない。",
      zh: "x ≥ 0 部分 eˣ + ln(x + 1)，从 (0, 1) 开始。左边部分依赖于 a，未画出。"
    },
    hint: {
      en: "Two conditions: the parabola must rise all the way to $x=0$, and it must not end above the point $(0,1)$.",
      fr: "Deux conditions : la parabole doit monter jusqu’à $x=0$, et ne pas finir au-dessus du point $(0,1)$.",
      es: "Dos condiciones: la parábola debe subir hasta $x=0$ y no terminar por encima de $(0,1)$.",
      ja: "2条件：放物線が $x=0$ まで上がり続け、点 $(0,1)$ より上で終わらないこと。",
      zh: "两个条件：抛物线一直上升到 $x=0$，且不能停在点 $(0,1)$ 上方。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 5.0, h: 4.2, scale: 50, pad: 16 });
      const T = F.T = axes(F, -3.0, 2.0, -1.4, 2.8);
      plot(F, T, x => Math.exp(x) + Math.log(x + 1), 0, 0.66, 'graph', 'base', -1.4, 2.8);
      F.dot(T([0, 1])); F.text(T([0, 1]), '(0, 1)', 'len small', 26, 6);
      F.reveal = () => {
      plot(F, T, x => -x * x + 2 * x + 1, -2.0, 0, 'hl pink', 'base', -1.4, 2.8); F.text(T([-1.6, -1.4]), 'a = −1', 'len small', -6, -6);
      plot(F, T, x => -x * x, -1.15, 0, 'hl blue', 'base', -1.4, 2.8); F.text(T([-1.1, -1.2]), 'a = 0', 'len small', 30, -6);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "has its top at": {"fr": "a son sommet en", "es": "tiene su vértice en", "ja": "の頂点は", "zh": "的顶点在"}
    },
    options: [
      { tex: "[-1,\\,0]", correct: true, why: {
        en: "$a\\le0$ keeps the parabola rising, $a\\ge-1$ stops it jumping above $1$.",
        fr: "$a\\le0$ garde la parabole croissante, $a\\ge-1$ l’empêche de dépasser $1$.",
        es: "$a\\le0$ mantiene la parábola creciente y $a\\ge-1$ evita que pase de $1$.",
        ja: "$a\\le0$ で放物線は増加、$a\\ge-1$ で $1$ を超えない。",
        zh: "$a\\le0$ 保证抛物线递增，$a\\ge-1$ 保证不超过 $1$。"
      } },
      { tex: "\\{a\\mid -1\\le a\\le 0\\}", correct: true, why: {
        en: "The same set in set-builder form.",
        fr: "Le même ensemble en compréhension.",
        es: "El mismo conjunto por comprensión.",
        ja: "同じ集合の内包的表記。",
        zh: "同一个集合的描述法。"
      } },
      { tex: "(-\\infty,\\,0]", correct: false, why: {
        en: "This forgets the jump at $0$: for $a=-2$ the left piece ends at $2>1$.",
        fr: "Cela oublie le saut en $0$ : pour $a=-2$, la partie gauche finit à $2>1$.",
        es: "Olvida el salto en $0$: con $a=-2$ la parte izquierda termina en $2>1$.",
        ja: "0 での段差を忘れている。$a=-2$ だと左側は $2>1$ で終わる。",
        zh: "忽略了 $0$ 处的跳跃：$a=-2$ 时左段终点为 $2>1$。"
      } },
      { tex: "[-1,\\,1]", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "[0,\\,+\\infty)", correct: false, why: {
        en: "One of the original distractors.",
        fr: "Un des leurres de l’épreuve originale.",
        es: "Uno de los distractores del examen original.",
        ja: "原題の誤答の1つ。",
        zh: "原题干扰项之一。"
      } },
      { tex: "[-1,\\,0)", correct: false, why: {
        en: "$a=0$ works: $-x^2$ is increasing on $(-\\infty,0)$.",
        fr: "$a=0$ convient : $-x^2$ croît sur $(-\\infty,0)$.",
        es: "$a=0$ sirve: $-x^2$ crece en $(-\\infty,0)$.",
        ja: "$a=0$ でよい：$-x^2$ は $(-\\infty,0)$ で増加。",
        zh: "$a=0$ 可以：$-x^2$ 在 $(-\\infty,0)$ 上递增。"
      } },
      { tex: "(-1,\\,0]", correct: false, why: {
        en: "$a=-1$ works: the left piece ends exactly at $1$, the value at $0$.",
        fr: "$a=-1$ convient : la partie gauche finit exactement à $1$.",
        es: "$a=-1$ sirve: la parte izquierda termina justo en $1$.",
        ja: "$a=-1$ でよい：左側はちょうど $1$ で終わる。",
        zh: "$a=-1$ 可以：左段恰好止于 $1$。"
      } },
      { tex: "[0,\\,1]", correct: false, why: {
        en: "For $a>0$ the vertex $x=-a$ is left of $0$ and the parabola falls before $0$.",
        fr: "Pour $a>0$, le sommet $x=-a$ est à gauche de $0$ et la parabole redescend.",
        es: "Con $a>0$ el vértice $x=-a$ está a la izquierda de $0$ y la parábola baja.",
        ja: "$a>0$ だと頂点 $x=-a$ が $0$ の左にあり、手前で減少する。",
        zh: "$a>0$ 时顶点 $x=-a$ 在 $0$ 左侧，抛物线先降。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Right piece",
          fr: "Partie droite",
          es: "Parte derecha",
          ja: "右側の部分",
          zh: "右段"
        },
        lines: ["\\bigl(e^x+\\ln(x+1)\\bigr)'=e^x+\\tfrac1{x+1}>0"],
        note: {
          en: "Always increasing; it starts at $f(0)=1$.",
          fr: "Toujours croissante ; elle part de $f(0)=1$.",
          es: "Siempre creciente; empieza en $f(0)=1$.",
          ja: "常に増加し、$f(0)=1$ から始まる。",
          zh: "始终递增，起点 $f(0)=1$。"
        }
      },
      {
        title: {
          en: "Left piece rises up to 0",
          fr: "La partie gauche monte jusqu’à 0",
          es: "La parte izquierda sube hasta 0",
          ja: "左側は 0 まで増加",
          zh: "左段一直升到 0"
        },
        lines: ["-x^2-2ax-a\\ \\text{has its top at}\\ x=-a", "-a\\ge0\\ \\Rightarrow\\ a\\le0"],
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
          en: "No step down at 0",
          fr: "Pas de chute en 0",
          es: "Sin bajada en 0",
          ja: "0 で下がらない",
          zh: "在 0 处不下降"
        },
        lines: ["\\lim_{x\\to0^-}f(x)=-a\\le1\\ \\Rightarrow\\ a\\ge-1", "a\\in\\boxed{[-1,\\,0]}"],
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
          en: "Two options are the same set.",
          fr: "Deux options sont le même ensemble.",
          es: "Dos opciones son el mismo conjunto.",
          ja: "2つの選択肢は同じ集合です。",
          zh: "有两个选项是同一个集合。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
