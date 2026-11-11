/* number · Built from 1 by 2n + 1 and 4n
   Oxford MAT 2020 (Mathematics Admissions Test), Question 2 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "nt-mat-2020-binary-set",
    category: "number",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "Oxford MAT 2020 (Mathematics Admissions Test), Question 2",
        fr: "MAT d’Oxford 2020 (test d’admission en mathématiques), question 2",
        es: "MAT de Oxford 2020 (prueba de admisión de matemáticas), pregunta 2",
        ja: "オックスフォード大学 数学入学試験 MAT 2020 問題 2",
        zh: "牛津大学数学入学考试 MAT 2020 第 2 题"
      },
      exams: ["mat"]
    },
    difficulty: 3,
    title: {
      en: "Built from 1 by 2n + 1 and 4n",
      fr: "Construit à partir de 1 par 2n + 1 et 4n",
      es: "Construido desde 1 con 2n + 1 y 4n",
      ja: "1 から 2n + 1 と 4n で作る",
      zh: "从 1 出发用 2n + 1 和 4n 生成"
    },
    statement: {
      en: "The set $S$ contains $1$, and whenever $n\\in S$, also $2n+1\\in S$ and $4n\\in S$. Nothing else is in $S$. <b>Which of the following are in $S$?</b>",
      fr: "L’ensemble $S$ contient $1$ et, dès que $n\\in S$, aussi $2n+1$ et $4n$. Rien d’autre n’est dans $S$. <b>Lesquels des nombres suivants sont dans $S$ ?</b>",
      es: "El conjunto $S$ contiene $1$ y, siempre que $n\\in S$, también $2n+1$ y $4n$. Nada más está en $S$. <b>¿Cuáles de los siguientes números están en $S$?</b>",
      ja: "集合 $S$ は $1$ を含み、$n\\in S$ ならば $2n+1$ と $4n$ も含みます。それ以外は含みません。<b>次のうち $S$ に属するものはどれですか？</b>",
      zh: "集合 $S$ 含有 $1$，且若 $n\\in S$ 则 $2n+1\\in S$、$4n\\in S$，此外别无他数。<b>下列哪些属于 $S$？</b>"
    },
    figureText: {
      en: "What the two rules do to a binary numeral: 2n + 1 appends the digit 1, and 4n appends 00. An example is worked in the solution.",
      fr: "Ce que font les deux règles en binaire : 2n + 1 ajoute le chiffre 1 et 4n ajoute 00. Un exemple est traité dans la solution.",
      es: "Qué hacen las dos reglas en binario: 2n + 1 añade la cifra 1 y 4n añade 00. Un ejemplo se resuelve en la solución.",
      ja: "2つの規則の2進数での働き：2n + 1 は末尾に 1、4n は 00 を付ける。例は解答で示します。",
      zh: "两条规则在二进制下的作用：2n + 1 在末尾添 1，4n 添 00。例子在解答中给出。"
    },
    hint: {
      en: "Write numbers in binary. What do $2n+1$ and $4n$ do to the binary digits of $n$?",
      fr: "Écrivez en binaire. Que font $2n+1$ et $4n$ aux chiffres binaires de $n$ ?",
      es: "Escribe en binario. ¿Qué hacen $2n+1$ y $4n$ a las cifras binarias de $n$?",
      ja: "2進法で書く。$2n+1$ と $4n$ は $n$ の2進数に何をする？",
      zh: "写成二进制。$2n+1$ 与 $4n$ 对 $n$ 的二进制数字做了什么？"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 7.4, h: 2.6, scale: 46, pad: 14 });
      F.text([1.6, 2.1], 'n → 2n + 1', 'len', 0, 0); F.text([5.4, 2.1], 'n → 4n', 'len', 0, 0);
      F.text([1.6, 1.5], '…b  →  …b1', 'len small', 0, 0); F.text([5.4, 1.5], '…b  →  …b00', 'len small', 0, 0);
      F.reveal = () => {
      const g = ['1', '1', '00', '1', '00']; let x = 0.4;
      g.forEach((t, i) => { const w = 0.5 * t.length + 0.2; F.rect(x, 0.2, w, 0.7, i === 0 ? 'tri fill-blue' : (t === '1' ? 'tri fill-yellow' : 'tri fill-pink')); F.text([x + w / 2, 0.55], t, 'pt', 0, 0); x += w + 0.15; });
      F.text([x + 0.9, 0.55], '= 100', 'len', 0, 0);
      };
      return F;
    },
    words: {  // figure labels and \text{…} words inside formulas
      "append": {"fr": "ajouter", "es": "añadir", "ja": "末尾に", "zh": "末尾添"},
      "made of blocks": {"fr": "formé de blocs", "es": "formado por bloques", "ja": "がブロック", "zh": "由块组成："},
      "and": {"fr": "et", "es": "y", "ja": "と", "zh": "和"}
    },
    options: [
      { tex: "100", correct: true, why: {
        en: "$1100100_2$: after the leading $1$, blocks $1,00,1,00$.",
        fr: "$1100100_2$: after the leading $1$, blocks $1,00,1,00$.",
        es: "$1100100_2$: after the leading $1$, blocks $1,00,1,00$.",
        ja: "$1100100_2$: after the leading $1$, blocks $1,00,1,00$.",
        zh: "$1100100_2$: after the leading $1$, blocks $1,00,1,00$."
      } },
      { tex: "25", correct: true, why: {
        en: "$11001_2$: blocks $1,00,1$.",
        fr: "$11001_2$: blocks $1,00,1$.",
        es: "$11001_2$: blocks $1,00,1$.",
        ja: "$11001_2$: blocks $1,00,1$.",
        zh: "$11001_2$: blocks $1,00,1$."
      } },
      { tex: "200", correct: false, why: {
        en: "$11001000_2$ ends in three $0$s, which cannot be cut into $00$ blocks.",
        fr: "$11001000_2$ ends in three $0$s, which cannot be cut into $00$ blocks.",
        es: "$11001000_2$ ends in three $0$s, which cannot be cut into $00$ blocks.",
        ja: "$11001000_2$ ends in three $0$s, which cannot be cut into $00$ blocks.",
        zh: "$11001000_2$ ends in three $0$s, which cannot be cut into $00$ blocks."
      } },
      { tex: "2", correct: false, why: {
        en: "$10_2$: a single $0$ is not a block.",
        fr: "$10_2$: a single $0$ is not a block.",
        es: "$10_2$: a single $0$ is not a block.",
        ja: "$10_2$: a single $0$ is not a block.",
        zh: "$10_2$: a single $0$ is not a block."
      } },
      { tex: "8", correct: false, why: {
        en: "$1000_2$: three $0$s.",
        fr: "$1000_2$: three $0$s.",
        es: "$1000_2$: three $0$s.",
        ja: "$1000_2$: three $0$s.",
        zh: "$1000_2$: three $0$s."
      } },
      { tex: "50", correct: false, why: {
        en: "$110010_2$ ends in a single $0$.",
        fr: "$110010_2$ ends in a single $0$.",
        es: "$110010_2$ ends in a single $0$.",
        ja: "$110010_2$ ends in a single $0$.",
        zh: "$110010_2$ ends in a single $0$."
      } },
      { tex: "13", correct: false, why: {
        en: "$1101_2$: after $1$, a lone $0$ appears.",
        fr: "$1101_2$: after $1$, a lone $0$ appears.",
        es: "$1101_2$: after $1$, a lone $0$ appears.",
        ja: "$1101_2$: after $1$, a lone $0$ appears.",
        zh: "$1101_2$: after $1$, a lone $0$ appears."
      } },
      { tex: "6", correct: false, why: {
        en: "$110_2$ ends in a single $0$.",
        fr: "$110_2$ ends in a single $0$.",
        es: "$110_2$ ends in a single $0$.",
        ja: "$110_2$ ends in a single $0$.",
        zh: "$110_2$ ends in a single $0$."
      } }
    ],
    steps: [
      {
        title: {
          en: "What the maps do in binary",
          fr: "Ce que font les fonctions en binaire",
          es: "Qué hacen las funciones en binario",
          ja: "2進法での働き",
          zh: "在二进制下的作用"
        },
        lines: ["2n+1:\\ \\text{append }1,\\qquad4n:\\ \\text{append }00"],
        note: {
          en: "Doubling shifts left; adding 1 fills the new last digit.",
          fr: "Doubler décale vers la gauche ; ajouter 1 remplit le dernier chiffre.",
          es: "Duplicar desplaza a la izquierda; sumar 1 rellena la última cifra.",
          ja: "2倍で左にずれ、+1 で最後の桁が 1 に。",
          zh: "乘 2 左移，加 1 填末位。"
        }
      },
      {
        title: {
          en: "Membership test",
          fr: "Test d’appartenance",
          es: "Prueba de pertenencia",
          ja: "所属の判定",
          zh: "判定方法"
        },
        lines: ["n\\in S\\iff n=1\\,w,\\ w\\ \\text{made of blocks } 1 \\text{ and } 00"],
        note: {
          en: "Equivalently: every maximal run of $0$s has even length.",
          fr: "Autrement dit : chaque suite maximale de $0$ est de longueur paire.",
          es: "Es decir: cada racha máxima de $0$ tiene longitud par.",
          ja: "言い換えると、0 の連続はすべて偶数個。",
          zh: "等价地：每段连续的 0 长度都是偶数。"
        }
      },
      {
        title: {
          en: "Apply",
          fr: "Appliquer",
          es: "Aplicar",
          ja: "当てはめる",
          zh: "应用"
        },
        lines: ["100=1100100_2\\ \\checkmark,\\quad25=11001_2\\ \\checkmark,\\quad200=11001000_2\\ \\times"],
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
          en: "Exactly two statements are true.",
          fr: "Exactement deux affirmations sont vraies.",
          es: "Exactamente dos afirmaciones son verdaderas.",
          ja: "正しいのはちょうど2つです。",
          zh: "恰有两个说法正确。"
        }
      }
    ]
  });
})(PuzzleBank.kit);
