/* combinatorics · Relations whose pairs are far apart
   JEE Advanced 2024 (India), Paper 2, Mathematics Q.14–15 */
(function (K) {
  'use strict';
  const { Figure, unit, mid, lerp, matrix, grid, arrow, argand, axes, plot, S2, S3 } = K;

  PuzzleBank.define({
    id: "comb-jee-2024-relations-far-apart",
    category: "combinatorics",
    source: {   // where the problem comes from (see README: Sources)
      kind: "exam",
      from: {
        en: "JEE Advanced 2024 (India), Paper 2, Mathematics Q.14–15",
        fr: "JEE Advanced 2024 (Inde), épreuve 2, mathématiques Q.14–15",
        es: "JEE Advanced 2024 (India), prueba 2, matemáticas Q.14–15",
        ja: "JEE Advanced 2024（インド工科大学入試）Paper 2 数学 Q.14–15",
        zh: "印度理工学院入学考试 JEE Advanced 2024 卷二 数学 Q.14–15"
      },
      exams: ["jee"]
    },
    difficulty: 2,
    title: {
      en: "Relations whose pairs are far apart",
      fr: "Relations aux couples éloignés",
      es: "Relaciones con pares alejados",
      ja: "離れた組だけの関係",
      zh: "元素对相距较远的关系"
    },
    statement: {
      en: "$S=\\{1,2,3,4,5,6\\}$. $X$ is the set of relations $R\\subseteq S\\times S$ with exactly $6$ elements and $|a-b|\\ge2$ for every $(a,b)\\in R$. $Y\\subseteq X$ are those whose range has exactly one element; $Z\\subseteq X$ are those that are functions $S\\to S$. <b>Which of the following are true?</b>",
      fr: "$S=\\{1,2,3,4,5,6\\}$. $X$ est l’ensemble des relations $R\\subseteq S\\times S$ à exactement $6$ éléments avec $|a-b|\\ge2$ pour tout $(a,b)\\in R$. $Y\\subseteq X$ : celles dont l’image a un seul élément ; $Z\\subseteq X$ : celles qui sont des fonctions $S\\to S$. <b>Lesquelles des affirmations suivantes sont vraies ?</b>",
      es: "$S=\\{1,2,3,4,5,6\\}$. $X$ es el conjunto de relaciones $R\\subseteq S\\times S$ con exactamente $6$ elementos y $|a-b|\\ge2$ para todo $(a,b)\\in R$. $Y\\subseteq X$: las de recorrido con un solo elemento; $Z\\subseteq X$: las que son funciones $S\\to S$. <b>¿Cuáles de las siguientes afirmaciones son verdaderas?</b>",
      ja: "$S=\\{1,2,3,4,5,6\\}$ とし、$X$ はちょうど $6$ 個の元をもち、すべての $(a,b)\\in R$ で $|a-b|\\ge2$ となる関係 $R\\subseteq S\\times S$ の集合です。$Y\\subseteq X$ は値域がただ1つの元のもの、$Z\\subseteq X$ は $S\\to S$ の関数であるものです。<b>次のうち正しいものはどれですか？</b>",
      zh: "$S=\\{1,2,3,4,5,6\\}$。$X$ 为满足恰有 $6$ 个元素且对任意 $(a,b)\\in R$ 有 $|a-b|\\ge2$ 的关系 $R\\subseteq S\\times S$ 的集合。$Y\\subseteq X$ 为值域恰有一个元素者，$Z\\subseteq X$ 为 $S\\to S$ 的函数者。<b>下列哪些正确？</b>"
    },
    figureText: {
      en: "The 6 × 6 grid of pairs (a, b), with the diagonal and its two neighbouring diagonals greyed out.",
      fr: "La grille 6 × 6 des couples (a, b), la diagonale et ses deux voisines grisées.",
      es: "La cuadrícula 6 × 6 de pares (a, b), con la diagonal y sus dos vecinas en gris.",
      ja: "組 (a, b) の 6 × 6 の格子。対角線とその両隣を灰色に。",
      zh: "(a, b) 的 6 × 6 方格，主对角线及相邻两条对角线涂灰。"
    },
    hint: {
      en: "Count the allowed pairs first. A function picks one allowed $b$ for every $a$.",
      fr: "Comptez d’abord les couples autorisés. Une fonction choisit un $b$ autorisé pour chaque $a$.",
      es: "Cuenta primero los pares permitidos. Una función elige un $b$ permitido para cada $a$.",
      ja: "まず許される組を数える。関数は各 $a$ に許される $b$ を1つ選ぶ。",
      zh: "先数出允许的对。函数为每个 $a$ 选一个允许的 $b$。"
    },
    aiHint: {
      en: "Please solve it in your own way, show every step, then check each option and say which ones are correct.",
      fr: "Résous-le à ta façon, montre chaque étape, puis vérifie chaque option et dis lesquelles sont correctes.",
      es: "Resuélvelo a tu manera, muestra cada paso y luego comprueba cada opción y di cuáles son correctas.",
      ja: "自分の方法で解き、すべての手順を示してから、各選択肢を確認してどれが正しいか答えてください。",
      zh: "请用你自己的方法求解，写出每一步，然后逐项检查选项并指出哪些正确。"
    },
    figure(svg) {
      const F = Figure(svg, { w: 4.0, h: 4.0, scale: 56, pad: 16 });
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) { const x = 0.4 + (b - 1) * 0.55, y = 3.6 - a * 0.55; F.rect(x, y, 0.5, 0.5, Math.abs(a - b) <= 1 ? 'fill-pink' : 'fill-blue', 'fills'); }
      for (let k = 1; k <= 6; k++) { F.text([0.4 + (k - 0.5) * 0.55, 3.6], String(k), 'tick', 0, -8); F.text([0.4, 3.6 - (k - 0.5) * 0.55], String(k), 'tick', -10, 0); }
      F.text([2.05, 3.6], 'b', 'pt', 0, -24); F.text([0.4, 1.95], 'a', 'pt', -26, 0);
      F.reveal = () => {
      [4, 3, 3, 3, 3, 4].forEach((n, k) => F.text([3.75, 3.6 - (k + 0.5) * 0.55], String(n), 'len small', 8, 0));
      };
      return F;
    },
    options: [
      { tex: "n(X)=\\binom{20}{6}", correct: true, why: {
        en: "$36-6-10=20$ allowed pairs; choose any $6$.",
        fr: "$36-6-10=20$ couples autorisés ; on en choisit $6$.",
        es: "$36-6-10=20$ pares permitidos; se eligen $6$.",
        ja: "許される組は $36-6-10=20$ 個。そこから $6$ 個。",
        zh: "允许的对有 $36-6-10=20$ 个，任选 $6$ 个。"
      } },
      { tex: "n(Y)+n(Z)=36^2", correct: true, why: {
        en: "$n(Y)=0$ and $n(Z)=4\\cdot3^4\\cdot4=1296$.",
        fr: "$n(Y)=0$ et $n(Z)=4\\cdot3^4\\cdot4=1296$.",
        es: "$n(Y)=0$ y $n(Z)=4\\cdot3^4\\cdot4=1296$.",
        ja: "$n(Y)=0$、$n(Z)=4\\cdot3^4\\cdot4=1296$。",
        zh: "$n(Y)=0$，$n(Z)=4\\cdot3^4\\cdot4=1296$。"
      } },
      { tex: "n(X)=\\binom{36}{6}", correct: false, why: {
        en: "That ignores the condition $|a-b|\\ge2$.",
        fr: "Cela ignore la condition $|a-b|\\ge2$.",
        es: "Ignora la condición $|a-b|\\ge2$.",
        ja: "$|a-b|\\ge2$ を無視している。",
        zh: "忽略了 $|a-b|\\ge2$。"
      } },
      { tex: "n(X)=\\binom{26}{6}", correct: false, why: {
        en: "Only the diagonal was removed; the pairs with $|a-b|=1$ go too.",
        fr: "Seule la diagonale a été retirée ; il faut aussi enlever $|a-b|=1$.",
        es: "Solo se quitó la diagonal; también sobran los de $|a-b|=1$.",
        ja: "対角線だけ除いた。$|a-b|=1$ も除く。",
        zh: "只去掉了对角线，$|a-b|=1$ 的也要去掉。"
      } },
      { tex: "n(Y)=6", correct: false, why: {
        en: "Each column has at most $4$ allowed pairs, fewer than $6$.",
        fr: "Chaque colonne a au plus $4$ couples autorisés, moins de $6$.",
        es: "Cada columna tiene como mucho $4$ pares permitidos, menos de $6$.",
        ja: "各列で許される組は高々 $4$ 個で $6$ 個に足りない。",
        zh: "每列最多 $4$ 个允许的对，不足 $6$ 个。"
      } },
      { tex: "n(Z)=3^6", correct: false, why: {
        en: "$a=1$ and $a=6$ have $4$ choices each, not $3$.",
        fr: "$a=1$ et $a=6$ ont $4$ choix chacun, pas $3$.",
        es: "$a=1$ y $a=6$ tienen $4$ opciones cada uno, no $3$.",
        ja: "$a=1,6$ は $4$ 通りずつ。",
        zh: "$a=1$、$a=6$ 各有 $4$ 种选择。"
      } },
      { tex: "n(Z)=4^6", correct: false, why: {
        en: "Middle values $a=2,\\dots,5$ have only $3$ choices.",
        fr: "Les valeurs du milieu $a=2,\\dots,5$ n’ont que $3$ choix.",
        es: "Los valores centrales $a=2,\\dots,5$ solo tienen $3$ opciones.",
        ja: "中央の $a=2,\\dots,5$ は $3$ 通りだけ。",
        zh: "中间的 $a=2,\\dots,5$ 只有 $3$ 种选择。"
      } },
      { tex: "n(Y)+n(Z)=6^2", correct: false, why: {
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
          en: "Allowed pairs",
          fr: "Couples autorisés",
          es: "Pares permitidos",
          ja: "許される組",
          zh: "允许的对"
        },
        lines: ["36-\\underbrace{6}_{a=b}-\\underbrace{10}_{|a-b|=1}=20\\ \\Rightarrow\\ n(X)=\\binom{20}6"],
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
          en: "One-element range",
          fr: "Image à un élément",
          es: "Recorrido de un elemento",
          ja: "値域が1点",
          zh: "值域仅一个元素"
        },
        lines: ["\\#\\{a:|a-b|\\ge2\\}\\le4<6\\ \\Rightarrow\\ n(Y)=0"],
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
          en: "Functions",
          fr: "Fonctions",
          es: "Funciones",
          ja: "関数",
          zh: "函数"
        },
        lines: ["n(Z)=4\\cdot3\\cdot3\\cdot3\\cdot3\\cdot4=1296=36^2"],
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
