/* algebra · Closer than five
   |2x − 3| < 5 means −5 < 2x − 3 < 5. */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;
  const X = x => [x + 2.5, 0.6];

  PuzzleBank.define({
    id: "alg-absolute-inequality",
    category: "algebra",
    source: {   // where the problem comes from (see README: Sources)
      kind: "standard",
      exams: ["alevel", "ib"]
    },
    difficulty: 1,
    title: {
      en: "Closer than five",
      fr: "À moins de cinq",
      es: "A menos de cinco",
      ja: "5 より近い",
      zh: "距离小于五"
    },
    statement: {
      en: "<b>Which of the following describe all real $x$ with $|2x - 3| < 5$?</b>",
      fr: "<b>Lesquels des ensembles suivants décrivent tous les réels $x$ tels que $|2x - 3| < 5$ ?</b>",
      es: "<b>¿Cuáles de los siguientes describen todos los reales $x$ con $|2x - 3| < 5$?</b>",
      ja: "<b>次のうち $|2x - 3| < 5$ を満たす実数 $x$ 全体を表すものはどれですか？</b>",
      zh: "<b>下列哪些表示满足 $|2x - 3| < 5$ 的全体实数 $x$？</b>"
    },
    figureText: {
      en: "A number line from −2 to 5. The solution set is marked in the solution.",
      fr: "Une droite graduée de −2 à 5. L’ensemble des solutions est marqué dans la solution.",
      es: "Una recta numérica de −2 a 5. El conjunto solución se marca en la solución.",
      ja: "−2 から 5 の数直線。解の範囲は解答で示します。",
      zh: "从 −2 到 5 的数轴。解集在解答中标出。"
    },
    hint: {
      en: "$|u| < 5 \\iff -5 < u < 5$.",
      fr: "$|u| < 5 \\iff -5 < u < 5$.",
      es: "$|u| < 5 \\iff -5 < u < 5$.",
      ja: "$|u| < 5 \\iff -5 < u < 5$.",
      zh: "$|u| < 5 \\iff -5 < u < 5$."
    },
    aiHint: {
      en: "Please solve it another way if you can (for example reading |2x − 3| < 5 as “x is less than 5/2 away from 3/2”), show every step, then check each option and say which ones are correct.",
      fr: "Résous-le d’une autre façon si possible (par exemple en lisant |2x − 3| < 5 comme « x est à moins de 5/2 de 3/2 »), montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo de otra forma si puedes (por ejemplo leyendo |2x − 3| < 5 como «x está a menos de 5/2 de 3/2»), muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "できれば別の方法で解いてください（例えば |2x − 3| < 5 を「x と 3/2 の距離が 5/2 未満」と読む）。すべての手順を示し、各選択肢を確認して、どれが正しいか答えてください。",
      zh: "如果可以，请用另一种方法求解（例如把 |2x − 3| < 5 理解为“x 到 3/2 的距离小于 5/2”），写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 8, h: 1.6, scale: 48, pad: 16 });
      F.seg(X(-2.4), X(5.4), 'axis');
      for (let k = -2; k <= 5; k++) { F.seg([X(k)[0], 0.48], [X(k)[0], 0.72], 'axis'); F.text([X(k)[0], 0.6], String(k).replace('-', '−'), 'tick', 0, 18); }
      F.reveal = () => {
        F.seg(X(-1), X(4), 'hl yellow');
        F.circle(X(-1), 0.1, 'halo'); F.circle(X(4), 0.1, 'halo');
        F.dot(X(1.5)); F.text(X(1.5), '3/2', 'len small', 0, -14);
      };
      return F;
    },
    options: [
      { tex: "-1 < x < 4", correct: true, why: {
        en: "$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8$.",
        fr: "$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8$.",
        es: "$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8$.",
        ja: "$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8$.",
        zh: "$-5 < 2x - 3 < 5 \\Rightarrow -2 < 2x < 8$."
      } },
      { tex: "(-1,\\ 4)", correct: true, why: {
        en: "The same set in interval notation.",
        fr: "Le même ensemble en notation d’intervalle.",
        es: "El mismo conjunto en notación de intervalo.",
        ja: "同じ集合を区間で表したもの。",
        zh: "同一个集合的区间写法。"
      } },
      { tex: "(-4,\\ 1)", correct: false, why: {
        en: "Sign slip: solves $|2x + 3| < 5$.",
        fr: "Erreur de signe : résout $|2x + 3| < 5$.",
        es: "Error de signo: resuelve $|2x + 3| < 5$.",
        ja: "符号ミス：$|2x + 3| < 5$ を解いています。",
        zh: "符号错误：解的是 $|2x + 3| < 5$。"
      } },
      { tex: "x < 4", correct: false, why: {
        en: "Only half of the condition: $x = -3$ gives $|{-9}| = 9$.",
        fr: "Seulement la moitié de la condition : $x = -3$ donne $9$.",
        es: "Solo la mitad de la condición: $x = -3$ da $9$.",
        ja: "条件の半分だけです：$x = -3$ では $9$。",
        zh: "只用了一半条件：$x = -3$ 时得 $9$。"
      } },
      { tex: "[-1,\\ 4]", correct: false, why: {
        en: "The endpoints give $|{\\pm5}| = 5$, which is not $< 5$.",
        fr: "Les bornes donnent $5$, qui n’est pas $< 5$.",
        es: "Los extremos dan $5$, que no es $< 5$.",
        ja: "端点では $5$ となり、$< 5$ ではありません。",
        zh: "端点处为 $5$，不满足 $< 5$。"
      } },
      { tex: "(1,\\ 4)", correct: false, why: {
        en: "$x = 0$ also works: $|{-3}| = 3 < 5$.",
        fr: "$x = 0$ convient aussi : $3 < 5$.",
        es: "$x = 0$ también sirve: $3 < 5$.",
        ja: "$x = 0$ も条件を満たします：$3 < 5$。",
        zh: "$x = 0$ 也满足：$3 < 5$。"
      } },
      { tex: "(-\\infty, -1) \\cup (4, \\infty)", correct: false, why: {
        en: "That is $|2x - 3| > 5$, the outside.",
        fr: "C’est $|2x - 3| > 5$, l’extérieur.",
        es: "Eso es $|2x - 3| > 5$, el exterior.",
        ja: "それは外側 $|2x - 3| > 5$ です。",
        zh: "那是 $|2x - 3| > 5$，外侧部分。"
      } },
      { tex: "(-1,\\ 8)", correct: false, why: {
        en: "Forgot to halve $8$ when isolating $x$.",
        fr: "A oublié de diviser $8$ par $2$.",
        es: "Olvidó dividir $8$ entre $2$.",
        ja: "$8$ を $2$ で割り忘れています。",
        zh: "忘了把 $8$ 除以 $2$。"
      } }
    ],
    steps: [
      {
        title: {
          en: "Remove the absolute value",
          fr: "Enlever la valeur absolue",
          es: "Quitar el valor absoluto",
          ja: "絶対値を外す",
          zh: "去掉绝对值"
        },
        lines: ["-5 < 2x - 3 < 5"],
        note: {
          en: "Distance from $0$ less than $5$.",
          fr: "Distance à $0$ inférieure à $5$.",
          es: "Distancia a $0$ menor que $5$.",
          ja: "$0$ からの距離が $5$ 未満。",
          zh: "到 $0$ 的距离小于 $5$。"
        }
      },
      {
        title: {
          en: "Isolate x",
          fr: "Isoler x",
          es: "Despejar x",
          ja: "x を求める",
          zh: "解出 x"
        },
        lines: ["-2 < 2x < 8 \\ \\Rightarrow\\ \\boxed{-1 < x < 4}"],
        note: {
          en: "Adding $3$ and halving keep the direction of the inequalities.",
          fr: "Ajouter $3$ puis diviser par $2$ ne change pas le sens.",
          es: "Sumar $3$ y dividir entre $2$ no cambia el sentido.",
          ja: "$3$ を足して $2$ で割っても不等号の向きは変わりません。",
          zh: "加 $3$ 再除以 $2$ 不改变不等号方向。"
        },
        fig(F) { if (F.reveal) F.reveal(); F.draw(F.seg(X(-1), X(4), 'hl pink', 'over'), 700); }
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
          en: "Two options are the same value written differently.",
          fr: "Deux options sont la même valeur écrite différemment.",
          es: "Dos opciones son el mismo valor escrito de forma distinta.",
          ja: "2つの選択肢は同じ値を別の形で書いたものです。",
          zh: "有两个选项是同一个值的不同写法。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
